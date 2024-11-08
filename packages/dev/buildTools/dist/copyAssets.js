"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAssets = void 0;
/* eslint-disable no-console */
const glob_1 = require("glob");
const path = require("path");
const utils_js_1 = require("./utils.js");
const chokidar = require("chokidar");
const buildShaders_js_1 = require("./buildShaders.js");
const processFile = (file, options = {}) => {
    if (!options.outputDir) {
        options.outputDir = "dist";
    }
    if (path.extname(file) === ".fx") {
        (0, buildShaders_js_1.buildShader)(file, options.basePackageName, options.isCore);
    }
    else {
        if (options.pathPrefix) {
            const regex = new RegExp(`${options.pathPrefix.replace(/\//g, "\\/")}src([/\\\\])`);
            (0, utils_js_1.copyFile)(file, file.replace(regex, `${options.outputDir}$1`), true, true);
        }
        else {
            (0, utils_js_1.copyFile)(file, file.replace(/src([/\\])/, `${options.outputDir}$1`), true, true);
        }
    }
};
const processAssets = (options = { extensions: ["png", "jpg", "jpeg", "gif", "svg", "scss", "css", "html", "json", "fx"] }) => {
    const global = (0, utils_js_1.checkArgs)("--global", true);
    const fileTypes = (0, utils_js_1.checkArgs)(["--file-types", "-ft"], false, true);
    const extensions = fileTypes && typeof fileTypes === "string" ? fileTypes.split(",") : options.extensions;
    const pathPrefix = (0, utils_js_1.checkArgs)("--path-prefix", false, true) || "";
    const globDirectory = global ? `./packages/**/*/src/**/*.+(${extensions.join("|")})` : pathPrefix + `src/**/*.+(${extensions.join("|")})`;
    const isCore = !!(0, utils_js_1.checkArgs)("--isCore", true);
    const outputDir = (0, utils_js_1.checkArgs)(["--output-dir"], false, true);
    const verbose = (0, utils_js_1.checkArgs)("--verbose", true);
    let basePackageName = "core";
    if (!isCore) {
        const cliPackage = (0, utils_js_1.checkArgs)("--package", false, true);
        if (cliPackage) {
            basePackageName = cliPackage;
        }
    }
    const processOptions = { isCore, basePackageName, pathPrefix, outputDir };
    // this script copies all assets (anything other than .ts?x) from the "src" folder to the "dist" folder
    console.log(`Processing assets from ${globDirectory}`);
    if ((0, utils_js_1.checkArgs)("--watch", true)) {
        // support windows path with "\\" instead of "/"
        chokidar
            .watch(globDirectory, {
            ignoreInitial: false,
            awaitWriteFinish: {
                stabilityThreshold: 1000,
                pollInterval: 300,
            },
            alwaysStat: true,
            interval: 300,
            binaryInterval: 600,
        })
            .on("all", (event, file) => {
            // don't track directory changes
            if (event === "addDir" || event === "unlinkDir") {
                return;
            }
            let verb;
            switch (event) {
                case "add":
                    verb = "Initializing";
                    break;
                case "change":
                    verb = "Changing";
                    break;
                case "unlink":
                    verb = "Removing";
                    break;
            }
            verbose && console.log(`${verb} asset: ${file}`);
            processFile(file, processOptions);
        });
        console.log("watching for asset changes...");
    }
    else {
        (0, glob_1.globSync)(globDirectory, {
            windowsPathsNoEscape: true,
        }).forEach((file) => {
            processFile(file.replace(/\\/g, "/"), processOptions);
        });
    }
};
exports.processAssets = processAssets;
//# sourceMappingURL=copyAssets.js.map