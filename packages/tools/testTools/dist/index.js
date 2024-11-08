"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalConfig = void 0;
const tslib_1 = require("tslib");
const build_tools_1 = require("@dev/build-tools");
const getGlobalConfig = (overrideConfig = {}) => {
    (0, build_tools_1.populateEnvironment)();
    return Object.assign({ snippetUrl: "https://snippet.babylonjs.com", pgRoot: "https://playground.babylonjs.com", baseUrl: process.env.CDN_BASE_URL || ((0, build_tools_1.checkArgs)(["--enable-https"], true) ? "https" : "http") + "://localhost:1337", root: "https://cdn.babylonjs.com" }, overrideConfig);
};
exports.getGlobalConfig = getGlobalConfig;
tslib_1.__exportStar(require("./utils"), exports);
tslib_1.__exportStar(require("./visualizationUtils"), exports);
tslib_1.__exportStar(require("./seleniumTestUtils"), exports);
//# sourceMappingURL=index.js.map