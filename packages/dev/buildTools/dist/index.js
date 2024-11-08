#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateEnvironment = exports.umdPackageMapping = exports.checkArgs = exports.webpackTools = exports.transformer = void 0;
/* eslint-disable no-console */
const addJSToCompiledFiles_js_1 = require("./addJSToCompiledFiles.js");
const generateDeclaration_js_1 = require("./generateDeclaration.js");
const ltsTransformer_js_1 = require("./ltsTransformer.js");
const prepareEs6Build_js_1 = require("./prepareEs6Build.js");
const utils_js_1 = require("./utils.js");
Object.defineProperty(exports, "checkArgs", { enumerable: true, get: function () { return utils_js_1.checkArgs; } });
Object.defineProperty(exports, "populateEnvironment", { enumerable: true, get: function () { return utils_js_1.populateEnvironment; } });
const devWatcher_js_1 = require("./devWatcher.js");
const copyAssets_js_1 = require("./copyAssets.js");
const prepareSnapshot_js_1 = require("./prepareSnapshot.js");
const packageMapping_js_1 = require("./packageMapping.js");
Object.defineProperty(exports, "umdPackageMapping", { enumerable: true, get: function () { return packageMapping_js_1.umdPackageMapping; } });
const updateEngineVersion_js_1 = require("./updateEngineVersion.js");
const declarationsEs6_js_1 = require("./declarationsEs6.js");
// public API
const pathTransform_js_1 = require("./pathTransform.js");
exports.transformer = pathTransform_js_1.default;
const webpackTools = require("./webpackTools.js");
exports.webpackTools = webpackTools;
const fs = require("fs");
const path = require("path");
const cliCommand = (0, utils_js_1.checkArgs)(["-c", "--command"], false, true);
runCommand(cliCommand);
function processConfigFile() {
    const baseDir = path.resolve(".");
    const configFile = (0, utils_js_1.checkArgs)(["-f", "--file"], false, true) || "config.tasks.json";
    if (configFile) {
        console.log(`Processing config file: ${configFile}`);
        // read the json file using fs
        const config = JSON.parse(fs.readFileSync(path.resolve(baseDir, configFile), "utf8"));
        if (config) {
            if (config.commands) {
                for (const command of config.commands) {
                    // populate the args
                    utils_js_1.externalArgs.length = 0;
                    if (command.args) {
                        utils_js_1.externalArgs.push(...command.args);
                    }
                    runCommand(command.command);
                }
            }
        }
    }
}
function runCommand(command) {
    if (command) {
        console.log("Babylon.js build tools");
        console.log(`Command: ${command}`);
        switch (command) {
            case "run-tasks":
            case "rt":
                processConfigFile();
                break;
            case "add-js-to-es6":
            case "ajte":
                (0, addJSToCompiledFiles_js_1.addJsExtensionsToCompiledFilesCommand)();
                break;
            case "process-umd-declaration":
            case "pud":
                (0, generateDeclaration_js_1.generateDeclaration)();
                break;
            case "build-shaders":
            case "bs":
                (0, copyAssets_js_1.processAssets)({ extensions: ["fx"] });
                break;
            case "transform-lts":
            case "tlts":
                (0, ltsTransformer_js_1.transformLtsCommand)();
                break;
            case "prepare-es6-build":
            case "peb":
                (0, prepareEs6Build_js_1.prepareES6Build)().catch((e) => {
                    console.error(e);
                    process.exit(1);
                });
                break;
            case "dev-watch":
            case "dw":
                (0, devWatcher_js_1.devWatch)();
                break;
            case "process-assets":
            case "pa":
                (0, copyAssets_js_1.processAssets)();
                break;
            case "prepare-snapshot":
            case "ps":
                (0, prepareSnapshot_js_1.prepareSnapshot)();
                break;
            case "update-engine-version":
            case "uev":
                (0, updateEngineVersion_js_1.updateEngineVersion)();
                break;
            case "declarations-es6":
            case "des6":
                (0, declarationsEs6_js_1.declarationsEs6)();
                break;
            case "copy":
            case "cp":
                (0, utils_js_1.copyFolder)((0, utils_js_1.checkArgs)(["-f", "--from"], false, true), (0, utils_js_1.checkArgs)(["-t", "--to"], false, true));
                break;
            default:
                console.log(`Unknown command: ${command}`);
                break;
        }
    }
}
//# sourceMappingURL=index.js.map