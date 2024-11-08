"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declarationsEs6 = void 0;
const utils_js_1 = require("./utils.js");
const fs = require("fs");
const path = require("path");
const glob_1 = require("glob");
const declarationsEs6 = () => {
    const root = (0, utils_js_1.checkArgs)(["--root", "-r"]);
    const appendToFile = (0, utils_js_1.checkArgs)(["--append-to-file", "-atf"]);
    const constEnumToEnum = (0, utils_js_1.checkArgs)(["--const-enum-to-enum", "-cete"]);
    // eslint-disable-next-line no-console
    console.log(`Declarations ES6: root: ${root}`, appendToFile ? `append to file: ${appendToFile}` : "");
    const fileContent = fs.readFileSync(path.join(".", appendToFile), "utf8");
    const mixins = (0, glob_1.globSync)(path.join(root, "**/*.d.ts"), {
        windowsPathsNoEscape: true,
    })
        .map((file) => {
        return fs.readFileSync(file, "utf8");
    })
        .join("\n")
        .replace(/declare /g, "");
    const newContent = `
${fileContent}
// Mixins
declare global{
${mixins}
}`;
    fs.writeFileSync(path.join(".", appendToFile), newContent);
    if (constEnumToEnum) {
        // iterate over all files in the current directory and change const enum to enum
        // This can be done since we are exporting the enums to js as well
        const files = (0, glob_1.globSync)(path.join("./**/*.d.ts"), {
            windowsPathsNoEscape: true,
        });
        files.forEach((file) => {
            let content = fs.readFileSync(file, "utf8");
            content = content.replace(/const enum/g, "enum");
            fs.writeFileSync(file, content);
        });
    }
};
exports.declarationsEs6 = declarationsEs6;
//# sourceMappingURL=declarationsEs6.js.map