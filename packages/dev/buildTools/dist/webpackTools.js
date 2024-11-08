"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonUMDWebpackConfiguration = exports.commonDevWebpackConfiguration = exports.getRules = exports.externalsFunction = void 0;
const pathTransform_js_1 = require("./pathTransform.js");
const packageMapping_js_1 = require("./packageMapping.js");
const path = require("path");
const utils_js_1 = require("./utils.js");
const externalsFunction = (excludePackages = [], type = "umd") => {
    return function ({ context, request }, callback) {
        if (request.includes("babylonjs-gltf2interface")) {
            return callback(null, {
                root: ["BABYLON", "GLTF2"],
                commonjs: "babylonjs-gltf2interface",
                commonjs2: "babylonjs-gltf2interface",
                amd: "babylonjs-gltf2interface",
            });
        }
        // fix for mac
        if (request.includes("webpack")) {
            return callback(null);
        }
        const importParts = request.split("/");
        const devPackageName = importParts[0].replace(/^babylonjs/, "") || "core";
        // check if this request needs to be ignored or transformed
        if (excludePackages.indexOf(devPackageName) === -1 && (0, packageMapping_js_1.isValidDevPackageName)(devPackageName, true)) {
            const packages = (0, packageMapping_js_1.getPackageMappingByDevName)(devPackageName, true);
            const buildTypePackage = (0, packageMapping_js_1.getPublicPackageName)(packages[type], request);
            const namespaceName = (0, packageMapping_js_1.getPublicPackageName)(packages.namespace, request);
            // check if the "external"  is actually a local dependency
            const umdPackageName = (0, packageMapping_js_1.getPublicPackageName)(packages["umd"], request);
            const directoryToExpect = packageMapping_js_1.umdPackageMapping[umdPackageName].baseDir || "core";
            if (directoryToExpect && context.replace(/\\/g, "/").includes("/" + directoryToExpect + "/")) {
                return callback(null);
            }
            if (request.indexOf("ktx2decoderTypes") !== -1) {
                return callback(null);
            }
            if (type === "umd" || type === "es6") {
                return callback(null, {
                    root: namespaceName.indexOf(".") !== -1 ? namespaceName.split(".") : namespaceName,
                    commonjs: buildTypePackage,
                    commonjs2: buildTypePackage,
                    amd: buildTypePackage,
                });
            }
        }
        return callback(null); // was ()
    };
};
exports.externalsFunction = externalsFunction;
const getRules = (options = {
    includeAssets: true,
    includeCSS: true,
    sideEffects: true,
}) => {
    const rules = [
        {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
            sideEffects: options.sideEffects,
            options: Object.assign({ configFile: "tsconfig.build.json" }, options.tsOptions),
        },
        {
            sideEffects: options.sideEffects,
            test: /\.js$/,
            enforce: "pre",
            use: ["source-map-loader"],
        },
    ];
    if (options.includeAssets) {
        rules.push({
            test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i,
            type: options.resourceType || "asset/inline",
        });
    }
    if (options.includeCSS) {
        rules.push({
            sideEffects: options.sideEffects,
            test: /(?<!modules)\.s[ac]ss$/i,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                        modules: "global",
                    },
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        }, {
            sideEffects: options.sideEffects,
            test: /\.modules\.s[ac]ss$/i,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                        modules: {
                            localIdentName: options.mode === "production" ? "[hash:base64]" : "[path][name]__[local]",
                        },
                    },
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        }, {
            test: /\.css$/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        });
    }
    rules.push(...(options.extraRules || []));
    return rules;
};
exports.getRules = getRules;
const commonDevWebpackConfiguration = (env, devServerConfig) => {
    const production = env.mode === "production" || process.env.NODE_ENV === "production";
    return {
        mode: production ? "production" : "development",
        devtool: production ? "source-map" : "inline-cheap-module-source-map",
        devServer: devServerConfig
            ? {
                port: devServerConfig.port,
                static: devServerConfig.static ? devServerConfig.static.map((dir) => path.resolve(dir)) : undefined,
                webSocketServer: production ? false : "ws",
                compress: production,
                server: env.enableHttps !== undefined || process.env.ENABLE_HTTPS === "true" ? "https" : "http",
                hot: (env.enableHotReload !== undefined || process.env.ENABLE_HOT_RELOAD === "true") && !production ? true : false,
                liveReload: (env.enableLiveReload !== undefined || process.env.ENABLE_LIVE_RELOAD === "true") && !production ? true : false,
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    "Access-Control-Allow-Origin": "*",
                },
                client: {
                    overlay: process.env.DISABLE_DEV_OVERLAY
                        ? false
                        : {
                            warnings: false,
                            errors: true,
                        },
                    logging: production ? "error" : "info",
                    progress: devServerConfig.showBuildProgress,
                },
                allowedHosts: process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(",") : undefined,
            }
            : undefined,
        output: env.outputFilename
            ? {
                path: path.resolve(env.dirName, "dist", env.dirSuffix || ""),
                filename: env.outputFilename,
                clean: true,
                devtoolModuleFilenameTemplate: production ? "webpack://[namespace]/[resource-path]?[loaders]" : "file:///[absolute-resource-path]",
            }
            : undefined,
    };
};
exports.commonDevWebpackConfiguration = commonDevWebpackConfiguration;
const commonUMDWebpackConfiguration = (options) => {
    var _a;
    const packageMapping = (0, packageMapping_js_1.getPackageMappingByDevName)(options.devPackageName);
    const packageName = (0, packageMapping_js_1.getPublicPackageName)(options.es6Mode ? packageMapping.es6 : packageMapping.umd);
    const umdPackageName = (0, packageMapping_js_1.getPublicPackageName)(packageMapping.umd);
    const filename = `${options.overrideFilename && typeof options.overrideFilename === "string" ? options.overrideFilename : packageMapping_js_1.umdPackageMapping[umdPackageName].baseFilename}${packageMapping_js_1.umdPackageMapping[umdPackageName].isBundle ? ".bundle" : ""}${options.maxMode ? (options.mode && options.mode === "development" ? ".max" : "") : options.mode && options.mode === "production" ? ".min" : ""}.js`;
    return Object.assign({ entry: (_a = options.entryPoints) !== null && _a !== void 0 ? _a : "./src/index.ts", devtool: options.mode === "production" ? "source-map" : "inline-cheap-module-source-map", mode: options.mode || "development", output: {
            path: options.outputPath || path.resolve("./dist"),
            filename: (typeof options.overrideFilename === "function" && options.overrideFilename) || filename,
            library: {
                name: {
                    root: (options.namespace && options.namespace.split(".")) || [options.devPackageName.toUpperCase()],
                    amd: packageName,
                    commonjs: packageName,
                },
                type: "umd",
            },
            libraryExport: "default",
            umdNamedDefine: true,
            globalObject: '(typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this)',
        }, resolve: {
            extensions: [".ts", ".js"],
            alias: Object.assign({ 
                // default alias - for its own package to the lts version
                [options.devPackageName]: path.resolve(options.devPackageAliasPath || `../../../lts/${(0, utils_js_1.camelize)(options.devPackageName)}/dist`) }, options.alias),
        }, externals: [options.extraExternals || {}, (0, exports.externalsFunction)([options.devPackageName, ...(options.optionalExternalFunctionSkip || [])], options.es6Mode ? "es6" : "umd")], module: {
            rules: (0, exports.getRules)({
                tsOptions: {
                    getCustomTransformers: (_program) => {
                        // webpack program
                        console.log("generating transformers...");
                        return {
                            after: [
                                (0, pathTransform_js_1.default)(_program, {
                                    basePackage: packageName,
                                    buildType: options.es6Mode ? "es6" : "umd",
                                    packageOnly: false,
                                    keepDev: true,
                                }),
                            ],
                            afterDeclarations: [
                                (0, pathTransform_js_1.default)(_program, {
                                    basePackage: packageName,
                                    buildType: options.es6Mode ? "es6" : "umd",
                                    packageOnly: false,
                                    keepDev: true,
                                }),
                            ],
                        };
                    },
                },
                sideEffects: true,
                includeAssets: true,
                includeCSS: true,
                mode: options.mode || "development",
            }),
        } }, options.extendedWebpackConfig);
};
exports.commonUMDWebpackConfiguration = commonUMDWebpackConfiguration;
//# sourceMappingURL=webpackTools.js.map