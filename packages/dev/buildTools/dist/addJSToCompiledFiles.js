"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJsExtensionsToCompiledFilesCommand = exports.addJsExtensionsToCompiledFiles = void 0;
/* eslint-disable no-console */
const fs = require("fs");
const glob_1 = require("glob");
const path = require("path");
const utils_js_1 = require("./utils.js");
function processSource(sourceCode, forceMJS) {
    const extension = forceMJS ? ".mjs" : ".js";
    return sourceCode
        .replace(/((import|export).*["'](@babylonjs\/.*\/|\.{1,2}\/)((?!\.scss|\.svg|\.png|\.jpg).)*?)("|');/g, `$1${extension}$5;`)
        .replace(/((import|export)\(["']((@babylonjs\/.*\/|\.{1,2}\/)((?!\.scss|\.svg|\.png|\.jpg).)*?))(["'])\)/g, `$1${extension}$6)`)
        .replace(new RegExp(`(${extension}){2,}`, "g"), extension);
}
function addJsExtensionsToCompiledFiles(files, forceMJS) {
    const isVerbose = (0, utils_js_1.checkArgs)("--verbose", true);
    files.forEach((file) => {
        isVerbose && console.log(`Processing ${file}`);
        const sourceCode = fs.readFileSync(file, "utf-8");
        const processed = processSource(sourceCode, forceMJS);
        const regex = /^import .* from "(\..*)";/g;
        let match;
        while ((match = regex.exec(processed)) !== null) {
            if (!fs.existsSync(path.resolve(path.dirname(file), match[1]))) {
                console.log(file, path.resolve(path.dirname(file), match[1]));
                throw new Error(`File ${match[1]} does not exist. Are you importing from an index/directory?`);
            }
        }
        const dynamicRegex = /import\("(\..*?)"\)/g;
        while ((match = dynamicRegex.exec(processed)) !== null) {
            if (!fs.existsSync(path.resolve(path.dirname(file), match[1]))) {
                console.log(file, path.resolve(path.dirname(file), match[1]));
                throw new Error(`File ${match[1]} does not exist. Are you dynamically importing from an index/directory?`);
            }
        }
        fs.writeFileSync(file, processed);
    });
}
exports.addJsExtensionsToCompiledFiles = addJsExtensionsToCompiledFiles;
const addJsExtensionsToCompiledFilesCommand = () => {
    let pathForFiles = (0, utils_js_1.checkArgs)(["--path-of-sources", "-pos"], false, true);
    const forceMJS = !!(0, utils_js_1.checkArgs)("--mjs", true);
    if (!pathForFiles) {
        pathForFiles = "./**/*.js";
        console.log("No path specified, using default: " + pathForFiles);
    }
    if (typeof pathForFiles === "string") {
        console.log(`Adding .js extensions to files in ${pathForFiles}`);
        addJsExtensionsToCompiledFiles((0, glob_1.globSync)(pathForFiles), forceMJS);
    }
};
exports.addJsExtensionsToCompiledFilesCommand = addJsExtensionsToCompiledFilesCommand;
//# sourceMappingURL=addJSToCompiledFiles.js.map