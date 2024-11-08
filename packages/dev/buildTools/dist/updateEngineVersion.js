"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEngineVersion = void 0;
const path = require("path");
const fs = require("fs");
const utils_js_1 = require("./utils.js");
const updateEngineVersion = async () => {
    const baseDirectory = (0, utils_js_1.findRootDirectory)();
    // get @dev/core package.json
    const rawdata = fs.readFileSync(path.join(baseDirectory, "packages", "dev", "core", "package.json"), "utf-8");
    const packageJson = JSON.parse(rawdata);
    const version = packageJson.version;
    // get abstractEngine.ts
    const abstractEngineFile = path.join(baseDirectory, "packages", "dev", "core", "src", "Engines", "abstractEngine.ts");
    const abstractEngineData = fs.readFileSync(abstractEngineFile, "utf-8");
    const array = /"babylonjs@(.*)"/.exec(abstractEngineData);
    if (!array) {
        throw new Error("Could not find babylonjs version in abstractEngine.ts");
    }
    const regexp = new RegExp(array[1], "g");
    const newAbstractEngineData = abstractEngineData.replace(regexp, version);
    fs.writeFileSync(abstractEngineFile, newAbstractEngineData);
};
exports.updateEngineVersion = updateEngineVersion;
//# sourceMappingURL=updateEngineVersion.js.map