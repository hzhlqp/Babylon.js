"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHashOfContent = exports.getHashOfFile = exports.findRootDirectory = exports.debounce = exports.camelize = exports.kebabize = exports.copyFolder = exports.copyFile = exports.checkArgs = exports.externalArgs = exports.removeDir = exports.checkDirectorySync = exports.populateEnvironment = void 0;
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const crypto = require("crypto");
const glob_1 = require("glob");
function populateEnvironment() {
    dotenv.config({ path: path.resolve(findRootDirectory(), "./.env") });
}
exports.populateEnvironment = populateEnvironment;
populateEnvironment();
function checkDirectorySync(directory) {
    try {
        fs.statSync(directory);
    }
    catch (e) {
        fs.mkdirSync(directory, { recursive: true });
    }
}
exports.checkDirectorySync = checkDirectorySync;
function removeDir(path) {
    if (fs.existsSync(path)) {
        const files = fs.readdirSync(path);
        if (files.length > 0) {
            files.forEach(function (filename) {
                if (fs.statSync(path + "/" + filename).isDirectory()) {
                    removeDir(path + "/" + filename);
                }
                else {
                    fs.unlinkSync(path + "/" + filename);
                }
            });
        }
        else {
            console.log("No files found in the directory.");
        }
    }
    else {
        console.log("Directory path not found.");
    }
}
exports.removeDir = removeDir;
const filterDashes = (str) => {
    let index = 0;
    while (str[index] === "-") {
        index++;
    }
    return str.substring(index);
};
exports.externalArgs = [];
const checkArgs = (testArgument, checkOnly = false, requiredIfSet = false) => {
    const args = exports.externalArgs.length ? exports.externalArgs : process.argv.slice(2);
    const index = typeof testArgument === "string" ? args.indexOf(testArgument) : testArgument.map((arg) => args.indexOf(arg)).find((idx) => idx !== -1);
    const envValue = typeof testArgument === "string"
        ? process.env[filterDashes(testArgument).toUpperCase().replace(/-/g, "_")]
        : testArgument.map((arg) => process.env[filterDashes(arg).toUpperCase().replace(/-/g, "_")]).filter((str) => !!str)[0];
    if (index === -1 || index === undefined) {
        // is it defined in the .env file?
        if (envValue) {
            return envValue;
        }
        return checkOnly ? false : "";
    }
    else {
        if (!checkOnly) {
            const returnValue = args[index + 1] && args[index + 1][0] !== "-" ? args[index + 1] : "";
            if (requiredIfSet && !returnValue) {
                return false;
            }
            else {
                return returnValue || true;
            }
        }
        else {
            return true;
        }
    }
};
exports.checkArgs = checkArgs;
function copyFile(from, to, silent, checkHash) {
    checkDirectorySync(path.dirname(to));
    if (checkHash) {
        // check if file exists
        if (fs.existsSync(to)) {
            const hash = (0, exports.getHashOfFile)(to);
            const newHash = (0, exports.getHashOfFile)(from);
            if (hash === newHash) {
                if (!silent) {
                    console.log(`${from} is up to date.`);
                }
                return;
            }
        }
    }
    fs.copyFileSync(from, to);
    if (!silent) {
        console.log("File copied: " + from);
    }
}
exports.copyFile = copyFile;
/**
 * This function will copy a folder from one location to another, independent of the OS.
 * @param from directory to copy from
 * @param to directory to copy to
 * @param silent if true, will not log anything
 */
function copyFolder(from, to, silent) {
    checkDirectorySync(to);
    // check if from is a folder
    let isDirectory = false;
    try {
        isDirectory = fs.lstatSync(from).isDirectory();
    }
    catch (e) { }
    const files = isDirectory
        ? fs.readdirSync(from)
        : (0, glob_1.globSync)(from, {
            windowsPathsNoEscape: true,
        });
    const baseDir = isDirectory ? from : "";
    for (const file of files) {
        const basename = isDirectory ? file : path.basename(file);
        const current = fs.lstatSync(path.join(baseDir, file));
        if (current.isDirectory()) {
            copyFolder(path.join(baseDir, file), path.join(to, basename), silent);
        }
        else if (current.isSymbolicLink()) {
            const symlink = fs.readlinkSync(path.join(baseDir, file));
            fs.symlinkSync(symlink, path.join(to, basename));
        }
        copyFile(path.join(baseDir, file), path.join(to, basename), silent);
    }
}
exports.copyFolder = copyFolder;
const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());
exports.kebabize = kebabize;
const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());
exports.camelize = camelize;
const debounce = (callback, waitFor) => {
    let timeout;
    return (...args) => {
        let result;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            result = callback(...args);
        }, waitFor);
        return result;
    };
};
exports.debounce = debounce;
function findRootDirectory() {
    let localPackageJSON = { name: "" };
    let basePath = process.cwd();
    let currentRoot = basePath;
    do {
        try {
            localPackageJSON = JSON.parse(fs.readFileSync(path.join(basePath, "./package.json")).toString());
        }
        catch (e) { }
        currentRoot = basePath;
        // console.log(localPackageJSON);
        basePath = path.resolve(basePath, "..");
        // process.chdir("..");
        if (basePath === currentRoot) {
            throw new Error("Could not find the root package.json");
        }
    } while (localPackageJSON.name !== "@babylonjs/root");
    return path.resolve(currentRoot);
}
exports.findRootDirectory = findRootDirectory;
const getHashOfFile = (filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    return (0, exports.getHashOfContent)(content);
};
exports.getHashOfFile = getHashOfFile;
const getHashOfContent = (content) => {
    const md5sum = crypto.createHash("md5");
    md5sum.update(content);
    return md5sum.digest("hex");
};
exports.getHashOfContent = getHashOfContent;
//# sourceMappingURL=utils.js.map