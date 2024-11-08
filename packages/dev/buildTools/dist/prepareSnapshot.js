"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareSnapshot = void 0;
const fs = require("fs");
const glob_1 = require("glob");
const path = require("path");
const packageMapping_js_1 = require("./packageMapping.js");
const utils_js_1 = require("./utils.js");
const prepareSnapshot = () => {
    const baseDirectory = (0, utils_js_1.findRootDirectory)();
    const snapshotDirectory = path.join(baseDirectory, ".snapshot");
    Object.keys(packageMapping_js_1.umdPackageMapping).forEach((packageName) => {
        const metadata = packageMapping_js_1.umdPackageMapping[packageName];
        const corePath = path.join(baseDirectory, "packages", "public", "umd", packageName);
        const coreUmd = (0, glob_1.globSync)(`${corePath}/*+(.js|.d.ts|.map)`);
        for (const file of coreUmd) {
            (0, utils_js_1.copyFile)(file, path.join(snapshotDirectory, metadata.baseDir, path.basename(file)), true);
        }
    });
    // copy gltf2interface
    {
        const baseLocation = path.join(baseDirectory, "packages", "public");
        const staticFiles = (0, glob_1.globSync)(`${baseLocation}/glTF2Interface/*.*`);
        for (const file of staticFiles) {
            // ignore package.json files
            if (path.basename(file) === "package.json") {
                continue;
            }
            const relative = path.relative(baseLocation, file);
            (0, utils_js_1.copyFile)(file, path.join(snapshotDirectory, relative), false);
        }
    }
    // make sure the .d.ts files are also available, clone the .module.d.ts files
    {
        const baseLocation = path.join(baseDirectory, ".snapshot");
        const staticFiles = (0, glob_1.globSync)(`${baseLocation}/**/*.module.d.ts`);
        for (const file of staticFiles) {
            // check if the file already exists. if it isn't, copy it
            if (!fs.existsSync(file.replace(".module", ""))) {
                (0, utils_js_1.copyFile)(file, file.replace(".module", ""), false);
            }
        }
    }
    // copy all static files
    const baseLocation = path.join(baseDirectory, "packages", "tools", "babylonServer", "public");
    const staticFiles = (0, glob_1.globSync)(`${baseLocation}/**/*.*`);
    for (const file of staticFiles) {
        // ignore package.json files
        if (path.basename(file) === "package.json") {
            continue;
        }
        const relative = path.relative(baseLocation, file);
        (0, utils_js_1.copyFile)(file, path.join(snapshotDirectory, relative), true);
    }
    // copy dist from babylon server
    const baseLocationDist = path.join(baseDirectory, "packages", "tools", "babylonServer", "dist");
    const staticFilesDist = (0, glob_1.globSync)(`${baseLocationDist}/**/*.js`);
    for (const file of staticFilesDist) {
        const relative = path.relative(baseLocationDist, file);
        (0, utils_js_1.copyFile)(file, path.join(snapshotDirectory, relative), true);
    }
    // generate timestamp.js, which contains the current timestamp
    const timestamp = Date.now();
    const timestampFile = path.join(snapshotDirectory, "timestamp.js");
    fs.writeFileSync(timestampFile, `if(typeof globalThis !== "undefined") globalThis.__babylonSnapshotTimestamp__ = ${timestamp};`);
    // if fileSizes.json exists, copy it as well
    const fileSizesPath = path.join(baseDirectory, "packages", "tools", "tests", "dist", "fileSizes.json");
    if (fs.existsSync(fileSizesPath)) {
        (0, utils_js_1.copyFile)(fileSizesPath, path.join(snapshotDirectory, "fileSizes.json"), true);
    }
    // copy the es6 builds
    // removed for now
    // {
    //     const baseLocationDist = path.join(baseDirectory, "packages", "public", "@babylonjs");
    //     const staticFilesDist = glob.sync(`${baseLocationDist}/**/*.*`);
    //     for (const file of staticFilesDist) {
    //         // ignore directories
    //         if (fs.lstatSync(file).isDirectory()) {
    //             continue;
    //         }
    //         const relative = path.relative(baseLocationDist, file);
    //         copyFile(file, path.join(snapshotDirectory, "es6", relative), true);
    //     }
    // }
};
exports.prepareSnapshot = prepareSnapshot;
//# sourceMappingURL=prepareSnapshot.js.map