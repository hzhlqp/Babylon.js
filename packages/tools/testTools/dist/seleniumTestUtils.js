"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckTestSuccessStatus = exports.LoadPlayground = exports.macOSSafariCapabilities = void 0;
require("selenium-webdriver/safari");
const visualizationUtils_1 = require("./visualizationUtils");
exports.macOSSafariCapabilities = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "bstack:options": {
        os: "OS X",
        osVersion: "Monterey",
        local: "false",
        seleniumVersion: "4.3.0",
        userName: process.env["BROWSERSTACK_USERNAME"],
        accessKey: process.env["BROWSERSTACK_ACCESS_KEY"],
    },
    browserName: "Safari",
    browserVersion: "latest",
};
// Take Playgorund Id and Selenium webdriver and load snippet info into test page
const LoadPlayground = async (driver, pgId, globalConfig, framesToRender = 500) => {
    await driver.executeScript(`
                var _globalConfig = {
                    'root': '${globalConfig.root}',
                    'baseUrl': '${globalConfig.baseUrl}',
                    'snippetUrl': '${globalConfig.snippetUrl}',
                    'pgRoot': '${globalConfig.pgRoot}}',
                };

                const evaluateInitEngineForVisualization = ${visualizationUtils_1.evaluateInitEngineForVisualization.toString()}
                const evaluatePrepareScene = ${visualizationUtils_1.evaluatePrepareScene.toString()}
                const evaluateRenderSceneForVisualization = ${visualizationUtils_1.evaluateRenderSceneForVisualization.toString()}

                globalThis.testSuccessful = false;

                await evaluateInitEngineForVisualization("webgl1", false, false, "${globalConfig.baseUrl}");
                await evaluatePrepareScene({playgroundId: "${pgId}"}, _globalConfig);
                evaluateRenderSceneForVisualization(${framesToRender});
            `);
};
exports.LoadPlayground = LoadPlayground;
// Given a test page with snippet information, check if globalThis.testSuccessful is true
const CheckTestSuccessStatus = async (driver) => {
    return (await driver.executeScript(`
            const evaluateDisposeSceneForVisualization = ${visualizationUtils_1.evaluateDisposeSceneForVisualization.toString()}
            await evaluateDisposeSceneForVisualization({ forceUseReverseDepthBuffer: false, forceUseNonCompatibilityMode: false })

            return globalThis.testSuccessful;
        `));
};
exports.CheckTestSuccessStatus = CheckTestSuccessStatus;
//# sourceMappingURL=seleniumTestUtils.js.map