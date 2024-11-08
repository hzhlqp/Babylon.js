"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareES6Build = void 0;
/* eslint-disable no-console */
const path = require("path");
const glob_1 = require("glob");
const fs = require("fs-extra");
const utils_js_1 = require("./utils.js");
const prepareES6Build = async () => {
    const baseDir = path.resolve(".");
    const constFile = (0, utils_js_1.checkArgs)(["--constFile", "-cf"], false, true);
    try {
        if (constFile) {
            const constFilePath = path.resolve(baseDir, constFile);
            const constantsContent = fs.readFileSync(constFilePath, "utf8").replace("export class Constants", "const Constants = ");
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const Constants = eval(constantsContent + "\nConstants;");
            const allSourceFiles = (0, glob_1.globSync)(path.resolve(baseDir, "**", "*.js"), {
                windowsPathsNoEscape: true,
            });
            allSourceFiles.forEach((file) => {
                if (path.resolve(file) === constFilePath) {
                    return;
                }
                const fileContent = fs.readFileSync(file, "utf8");
                const regexImport = /import { Constants } from .*;/g;
                let sourceCode = fileContent.replace(regexImport, "");
                const regexConstant = /(?<![_0-9a-zA-Z])Constants\.([_0-9a-zA-Z]*)/g;
                let match = regexConstant.exec(sourceCode);
                const constantList = [];
                while (match) {
                    const constantName = match[1];
                    if (constantName && constantName.length > 1) {
                        constantList.push(constantName);
                    }
                    match = regexConstant.exec(sourceCode);
                }
                for (const constant of constantList) {
                    const regex = new RegExp(`(?<![_0-9a-zA-Z])Constants\.${constant}(?![_0-9a-zA-Z])`, "g");
                    const value = Constants[constant];
                    if (typeof value === "string") {
                        sourceCode = sourceCode.replace(regex, "`" + value + "`");
                    }
                    else {
                        sourceCode = sourceCode.replace(regex, value);
                    }
                }
                fs.writeFileSync(file, sourceCode);
            });
        }
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
};
exports.prepareES6Build = prepareES6Build;
//# sourceMappingURL=prepareEs6Build.js.map