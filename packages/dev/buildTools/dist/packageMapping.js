"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPublicDevPackageName = exports.isValidBuildType = exports.isValidDevPackageName = exports.getPublicPackageName = exports.getDevPackagesByBuildType = exports.getAllPackageMappingsByDevNames = exports.getPackageMappingByDevName = exports.isValidPackageMap = exports.getAllBuildTypes = exports.getAllDevNames = exports.umdPackageMapping = exports.declarationsOnlyPackages = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const utils_js_1 = require("./utils.js");
const privatePackages = ["shared-ui-components"];
exports.declarationsOnlyPackages = ["babylonjs-gltf2interface"];
exports.umdPackageMapping = {
    babylonjs: {
        baseDir: "",
        baseFilename: "babylon",
    },
    "babylonjs-gui": {
        baseDir: "gui",
        baseFilename: "babylon.gui",
    },
    "babylonjs-serializers": {
        baseDir: "serializers",
        baseFilename: "babylonjs.serializers",
    },
    "babylonjs-loaders": {
        baseDir: "loaders",
        baseFilename: "babylonjs.loaders",
    },
    "babylonjs-materials": {
        baseDir: "materialsLibrary",
        baseFilename: "babylonjs.materials",
    },
    "babylonjs-procedural-textures": {
        baseDir: "proceduralTexturesLibrary",
        baseFilename: "babylonjs.proceduralTextures",
    },
    "babylonjs-inspector": {
        baseDir: "inspector",
        baseFilename: "babylon.inspector",
        isBundle: true,
    },
    "babylonjs-node-editor": {
        baseDir: "nodeEditor",
        baseFilename: "babylon.nodeEditor",
    },
    "babylonjs-node-geometry-editor": {
        baseDir: "nodeGeometryEditor",
        baseFilename: "babylon.nodeGeometryEditor",
    },
    "babylonjs-node-render-graph-editor": {
        baseDir: "nodeRenderGraphEditor",
        baseFilename: "babylon.nodeRenderGraphEditor",
    },
    "babylonjs-gui-editor": {
        baseDir: "guiEditor",
        baseFilename: "babylon.guiEditor",
    },
    "babylonjs-accessibility": {
        baseDir: "accessibility",
        baseFilename: "babylon.accessibility",
    },
    "babylonjs-post-process": {
        baseDir: "postProcessesLibrary",
        baseFilename: "babylonjs.postProcess",
    },
    "babylonjs-ktx2decoder": {
        baseDir: "",
        baseFilename: "babylon.ktx2Decoder",
    },
    "babylonjs-viewer": {
        baseDir: "viewer",
        baseFilename: "babylon.viewer",
    },
    "babylonjs-shared-ui-components": {
        baseDir: "shared-ui-components",
        baseFilename: "",
    },
    "babylonjs-gltf2interface": {
        baseDir: "",
        baseFilename: "",
    },
    "babylonjs-addons": {
        baseDir: "addons",
        baseFilename: "babylonjs.addons",
    },
};
const packageMapping = {
    umd: {
        core: "babylonjs",
        gui: "babylonjs-gui",
        materials: "babylonjs-materials",
        loaders: "babylonjs-loaders",
        serializers: "babylonjs-serializers",
        inspector: "babylonjs-inspector",
        "node-editor": (_filePath) => {
            // if (filePath && filePath.indexOf("sharedUiComponents") !== -1) {
            //     return "babylonjs-shared-ui-components";
            // }
            return "babylonjs-node-editor";
        },
        "node-geometry-editor": (_filePath) => {
            // if (filePath && filePath.indexOf("sharedUiComponents") !== -1) {
            //     return "babylonjs-shared-ui-components";
            // }
            return "babylonjs-node-geometry-editor";
        },
        "node-render-graph-editor": (_filePath) => {
            // if (filePath && filePath.indexOf("sharedUiComponents") !== -1) {
            //     return "babylonjs-shared-ui-components";
            // }
            return "babylonjs-node-render-graph-editor";
        },
        "gui-editor": (_filePath) => {
            // if (filePath && filePath.indexOf("sharedUiComponents") !== -1) {
            //     return "babylonjs-shared-ui-components";
            // }
            return "babylonjs-gui-editor";
        },
        accessibility: "babylonjs-accessibility",
        "post-processes": "babylonjs-post-process",
        "procedural-textures": "babylonjs-procedural-textures",
        ktx2decoder: "babylonjs-ktx2decoder",
        viewer: "babylonjs-viewer",
        "shared-ui-components": "babylonjs-shared-ui-components",
        "babylonjs-gltf2interface": "babylonjs-gltf2interface",
        addons: "babylonjs-addons",
    },
    es6: {
        core: "@babylonjs/core",
        gui: "@babylonjs/gui",
        materials: "@babylonjs/materials",
        loaders: "@babylonjs/loaders",
        serializers: "@babylonjs/serializers",
        inspector: "@babylonjs/inspector",
        "node-editor": "@babylonjs/node-editor",
        "node-geometry-editor": "@babylonjs/node-geometry-editor",
        "node-render-graph-editor": "@babylonjs/node-render-graph-editor",
        "gui-editor": "@babylonjs/gui-editor",
        accessibility: "@babylonjs/accessibility",
        "post-processes": "@babylonjs/post-processes",
        "procedural-textures": "@babylonjs/procedural-textures",
        ktx2decoder: "@babylonjs/ktx2decoder",
        viewer: "@babylonjs/viewer",
        "shared-ui-components": "@babylonjs/shared-ui-components",
        "babylonjs-gltf2interface": "babylonjs-gltf2interface",
        addons: "@babylonjs/addons",
    },
    esm: {
        core: "@babylonjs/esm",
        gui: "@babylonjs/esm",
        materials: "@babylonjs/esm",
        loaders: "@babylonjs/esm",
        serializers: "@babylonjs/esm",
        inspector: "@babylonjs/esm",
        "node-editor": "@babylonjs/esm",
        "node-geometry-editor": "@babylonjs/esm",
        "node-render-graph-editor": "@babylonjs/esm",
        "gui-editor": "@babylonjs/esm",
        accessibility: "@babylonjs/accessibility",
        "post-processes": "@babylonjs/esm",
        "procedural-textures": "@babylonjs/esm",
        ktx2decoder: "@babylonjs/esm",
        viewer: "@babylonjs/esm",
        addons: "@babylonjs/esm",
        "shared-ui-components": "@babylonjs/esm",
        "babylonjs-gltf2interface": "babylonjs-gltf2interface",
    },
    // lts: {
    //     core: "@babylonjs/esm",
    //     gui: "@babylonjs/esm",
    //     materials: "@babylonjs/esm",
    //     loaders: "@babylonjs/esm",
    //     serializers: "@babylonjs/esm",
    // },
    namespace: {
        core: (filePath) => {
            if (filePath &&
                (filePath.includes("/Debug/axesViewer") ||
                    filePath.includes("/Debug/boneAxesViewer") ||
                    filePath.includes("/Debug/physicsViewer") ||
                    filePath.includes("/Debug/skeletonViewer"))) {
                return "BABYLON.Debug";
            }
            return "BABYLON";
        },
        gui: "BABYLON.GUI",
        materials: "BABYLON",
        loaders: (filePath) => {
            if (filePath) {
                if (filePath.includes("/glTF/1.0")) {
                    // was .endsWith
                    return "BABYLON.GLTF1";
                }
                else if (filePath.includes("/glTF/2.0/Extensions")) {
                    return "BABYLON.GLTF2.Loader.Extensions";
                }
                else if (filePath.includes("/glTF/2.0/glTFLoaderInterfaces")) {
                    return "BABYLON.GLTF2.Loader";
                }
                else if (filePath.includes("/glTF/2.0")) {
                    return "BABYLON.GLTF2";
                }
            }
            return "BABYLON";
        },
        serializers: "BABYLON",
        inspector: (filePath) => {
            if (filePath) {
                if (filePath.includes("shared-ui-components/") || filePath.includes("/sharedUiComponents/")) {
                    // was .endsWith
                    return "INSPECTOR.SharedUIComponents";
                }
                else if (filePath.includes("babylonjs-gltf2interface")) {
                    return "BABYLON.GLTF2";
                }
            }
            return "INSPECTOR";
        },
        "node-editor": (filePath) => {
            if (filePath) {
                if (filePath.includes("shared-ui-components/") || filePath.includes("/sharedUiComponents/")) {
                    // was .endsWith
                    return "BABYLON.NodeEditor.SharedUIComponents";
                }
                else if (filePath.includes("babylonjs-gltf2interface")) {
                    return "BABYLON.GLTF2";
                }
            }
            return "BABYLON.NodeEditor";
        },
        "node-geometry-editor": (filePath) => {
            if (filePath) {
                if (filePath.includes("shared-ui-components/") || filePath.includes("/sharedUiComponents/")) {
                    // was .endsWith
                    return "BABYLON.NodeGeometryEditor.SharedUIComponents";
                }
                else if (filePath.includes("babylonjs-gltf2interface")) {
                    return "BABYLON.GLTF2";
                }
            }
            return "BABYLON.NodeGeometryEditor";
        },
        "node-render-graph-editor": (filePath) => {
            if (filePath) {
                if (filePath.includes("shared-ui-components/") || filePath.includes("/sharedUiComponents/")) {
                    // was .endsWith
                    return "BABYLON.NodeRenderGraphEditor.SharedUIComponents";
                }
                else if (filePath.includes("babylonjs-gltf2interface")) {
                    return "BABYLON.GLTF2";
                }
            }
            return "BABYLON.NodeRenderGraphEditor";
        },
        "gui-editor": (filePath) => {
            if (filePath) {
                if (filePath.includes("shared-ui-components/") || filePath.includes("/sharedUiComponents/")) {
                    // was .endsWith
                    return "BABYLON.GuiEditor.SharedUIComponents";
                }
                else if (filePath.includes("babylonjs-gltf2interface")) {
                    return "BABYLON.GLTF2";
                }
            }
            return "BABYLON";
        },
        accessibility: "BABYLON.Accessibility",
        "post-processes": "BABYLON",
        "procedural-textures": "BABYLON",
        addons: "ADDONS",
        ktx2decoder: "KTX2DECODER",
        viewer: "BabylonViewer",
        "shared-ui-components": "BABYLON.SharedUIComponents",
        "babylonjs-gltf2interface": "BABYLON.GLTF2",
    },
};
function getAllDevNames() {
    return Object.keys(packageMapping.umd);
}
exports.getAllDevNames = getAllDevNames;
function getAllBuildTypes() {
    return Object.keys(packageMapping);
}
exports.getAllBuildTypes = getAllBuildTypes;
function isValidPackageMap(packageMap) {
    const packageNames = Object.keys(packageMap);
    const buildTypes = getAllBuildTypes();
    return packageNames.every((packageName) => buildTypes.includes(packageName));
}
exports.isValidPackageMap = isValidPackageMap;
function getPackageMappingByDevName(devName, publicOnly = false) {
    const returnMap = {};
    Object.keys(packageMapping).forEach((buildType) => {
        if (isValidBuildType(buildType) && (!publicOnly || (publicOnly && isPublicDevPackageName(devName)))) {
            returnMap[buildType] = packageMapping[buildType][(0, utils_js_1.kebabize)(devName)];
        }
    });
    if (isValidPackageMap(returnMap)) {
        return returnMap;
    }
    else {
        throw new Error(`Invalid package mapping for ${devName}`);
    }
}
exports.getPackageMappingByDevName = getPackageMappingByDevName;
function getAllPackageMappingsByDevNames() {
    const returnMap = {};
    getAllDevNames().forEach((devName) => {
        returnMap[devName] = getPackageMappingByDevName(devName);
    });
    return returnMap;
}
exports.getAllPackageMappingsByDevNames = getAllPackageMappingsByDevNames;
function getDevPackagesByBuildType(buildType) {
    return packageMapping[buildType];
}
exports.getDevPackagesByBuildType = getDevPackagesByBuildType;
function getPublicPackageName(publicVariable, data /*, sourceFile?: string*/) {
    if (typeof publicVariable === "string") {
        return publicVariable;
    }
    else if (typeof publicVariable === "function") {
        return publicVariable(data);
    }
    else {
        throw new Error(`Invalid public package variable: ${publicVariable}`);
    }
}
exports.getPublicPackageName = getPublicPackageName;
function isValidDevPackageName(devName, publicOnly) {
    if (publicOnly && privatePackages.includes((0, utils_js_1.kebabize)(devName))) {
        return false;
    }
    return Object.keys(packageMapping).some((buildType) => {
        if (isValidBuildType(buildType)) {
            return packageMapping[buildType][(0, utils_js_1.kebabize)(devName)] !== undefined;
        }
        return false;
    });
}
exports.isValidDevPackageName = isValidDevPackageName;
function isValidBuildType(buildType) {
    return Object.keys(packageMapping).some((localBuildType) => {
        return localBuildType === buildType;
    });
}
exports.isValidBuildType = isValidBuildType;
function isPublicDevPackageName(devName) {
    return isValidDevPackageName(devName) && !privatePackages.includes(devName);
}
exports.isPublicDevPackageName = isPublicDevPackageName;
//# sourceMappingURL=packageMapping.js.map