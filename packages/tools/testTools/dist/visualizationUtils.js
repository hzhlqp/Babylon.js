"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateIsGLError = exports.evaluateDisposeSceneForVisualization = exports.evaluateRenderSceneForVisualization = exports.evaluatePrepareScene = exports.evaluateInitEngineForVisualization = void 0;
const evaluateInitEngineForVisualization = async (engineName, useReverseDepthBuffer, useNonCompatibilityMode, baseUrl) => {
    engineName = engineName ? engineName.toLowerCase() : "webgl2";
    if (window.engine) {
        window.engine.dispose();
        window.engine = null;
    }
    if (engineName === "webgl") {
        engineName = "webgl1";
    }
    BABYLON.SceneLoader.ShowLoadingScreen = false;
    BABYLON.SceneLoader.ForceFullSceneLoadingForIncremental = true;
    BABYLON.Tools.ScriptBaseUrl = baseUrl;
    window.forceUseReverseDepthBuffer = useReverseDepthBuffer === 1 || useReverseDepthBuffer === "true";
    window.forceUseNonCompatibilityMode = useNonCompatibilityMode === 1 || useNonCompatibilityMode === "true";
    window.canvas = document.getElementById("babylon-canvas");
    if (engineName === "webgpu") {
        const options = {
            enableAllFeatures: true,
            setMaximumLimits: true,
            antialias: false,
        };
        const engine = new BABYLON.WebGPUEngine(window.canvas, options);
        engine.enableOfflineSupport = false;
        engine.useReverseDepthBuffer = window.forceUseReverseDepthBuffer;
        engine.compatibilityMode = !window.forceUseNonCompatibilityMode;
        window.engine = engine;
        await engine.initAsync();
        await engine.prepareGlslangAndTintAsync();
    }
    else {
        const engine = new BABYLON.Engine(window.canvas, false, {
            useHighPrecisionFloats: true,
            disableWebGL2Support: engineName === "webgl1" ? true : false,
            forceSRGBBufferSupportState: true,
        });
        engine.enableOfflineSupport = false;
        engine.setDitheringState(false);
        engine.useReverseDepthBuffer = window.forceUseReverseDepthBuffer;
        engine.compatibilityMode = !window.forceUseNonCompatibilityMode;
        window.engine = engine;
    }
    window.engine.renderEvenInBackground = true;
    window.engine.getCaps().parallelShaderCompile = undefined;
    return {
        forceUseReverseDepthBuffer: window.forceUseReverseDepthBuffer,
        forceUseNonCompatibilityMode: window.forceUseNonCompatibilityMode,
        engineName,
        renderer: window.engine._glRenderer,
    };
};
exports.evaluateInitEngineForVisualization = evaluateInitEngineForVisualization;
const evaluatePrepareScene = async (sceneMetadata, globalConfig) => {
    window.seed = 1;
    window.Math.random = function () {
        const x = Math.sin(window.seed++) * 10000;
        return x - Math.floor(x);
    };
    BABYLON.SceneLoader.OnPluginActivatedObservable.clear();
    BABYLON.SceneLoader.ShowLoadingScreen = false;
    BABYLON.SceneLoader.ForceFullSceneLoadingForIncremental = true;
    if (sceneMetadata.sceneFolder) {
        window.scene = await BABYLON.SceneLoader.LoadAsync(globalConfig.root + sceneMetadata.sceneFolder, sceneMetadata.sceneFilename, window.engine);
    }
    else if (sceneMetadata.playgroundId) {
        if (sceneMetadata.playgroundId[0] !== "#" || sceneMetadata.playgroundId.indexOf("#", 1) === -1) {
            sceneMetadata.playgroundId += "#0";
        }
        const retryTime = 500;
        const maxRetry = 5;
        let retry = 0;
        const runSnippet = async function () {
            const data = await fetch(globalConfig.snippetUrl + sceneMetadata.playgroundId.replace(/#/g, "/"));
            const snippet = await data.json();
            let code = JSON.parse(snippet.jsonPayload).code.toString();
            code = code
                .replace(/"\/textures\//g, '"' + globalConfig.pgRoot + "/textures/")
                .replace(/"textures\//g, '"' + globalConfig.pgRoot + "/textures/")
                .replace(/\/scenes\//g, globalConfig.pgRoot + "/scenes/")
                .replace(/"scenes\//g, '"' + globalConfig.pgRoot + "/scenes/")
                .replace(/"\.\.\/\.\.https/g, '"' + "https")
                .replace("http://", "https://");
            if (sceneMetadata.replace) {
                const split = sceneMetadata.replace.split(",");
                for (let i = 0; i < split.length; i += 2) {
                    const source = split[i].trim();
                    const destination = split[i + 1].trim();
                    code = code.replace(source, destination);
                }
            }
            const loadedScene = eval(code + "\r\ncreateScene(engine)");
            if (loadedScene.then) {
                // Handle if createScene returns a promise
                window.scene = await loadedScene;
            }
            else {
                window.scene = loadedScene;
            }
        };
        const run = async () => {
            try {
                await runSnippet();
            }
            catch (e) {
                if (retry < maxRetry) {
                    retry++;
                    // wait for retryTime
                    await new Promise((resolve) => setTimeout(resolve, retryTime));
                    await run();
                }
                else {
                    console.error(e);
                    throw e;
                }
            }
        };
        await run();
    }
    else if (sceneMetadata.scriptToRun) {
        if (sceneMetadata.specificRoot) {
            BABYLON.Tools.BaseUrl = globalConfig.root + sceneMetadata.specificRoot;
        }
        const scriptContent = await (await fetch(globalConfig.root + sceneMetadata.scriptToRun)).text();
        let scriptToRun = scriptContent.replace(/..\/..\/assets\//g, globalConfig.root + "/Assets/");
        scriptToRun = scriptToRun.replace(/..\/..\/Assets\//g, globalConfig.root + "/Assets/");
        scriptToRun = scriptToRun.replace(/\/assets\//g, globalConfig.root + "/Assets/");
        if (sceneMetadata.replace) {
            const split = sceneMetadata.replace.split(",");
            for (let i = 0; i < split.length; i += 2) {
                const source = split[i].trim();
                const destination = split[i + 1].trim();
                scriptToRun = scriptToRun.replace(source, destination);
            }
        }
        if (sceneMetadata.replaceUrl) {
            const split = sceneMetadata.replaceUrl.split(",");
            for (let i = 0; i < split.length; i++) {
                const source = split[i].trim();
                const regex = new RegExp(source, "g");
                scriptToRun = scriptToRun.replace(regex, globalConfig.root + sceneMetadata.rootPath + source);
            }
        }
        window.scene = eval(scriptToRun + "\n" + sceneMetadata.functionToCall + "(engine)");
    }
    return true;
};
exports.evaluatePrepareScene = evaluatePrepareScene;
const evaluateRenderSceneForVisualization = async (renderCount) => {
    return new Promise((resolve) => {
        if (!window.scene || !window.engine) {
            return resolve(false);
        }
        BABYLON.SceneLoader.ShowLoadingScreen = false;
        window.scene.useConstantAnimationDeltaTime = true;
        window.scene.executeWhenReady(function () {
            if (!window.scene || !window.engine) {
                return resolve(false);
            }
            if (window.scene.activeCamera && window.scene.activeCamera.useAutoRotationBehavior) {
                window.scene.activeCamera.useAutoRotationBehavior = false;
            }
            const sceneAdts = window.scene.textures.filter((t) => t.getClassName() === "AdvancedDynamicTexture");
            const adtsAreReady = () => {
                return sceneAdts.every((adt) => adt.guiIsReady());
            };
            let renderAfterGuiIsReadyCount = 1;
            window.engine.runRenderLoop(function () {
                try {
                    if (renderCount <= 0 && renderAfterGuiIsReadyCount <= 0) {
                        if (window.scene.isReady()) {
                            window.engine && window.engine.stopRenderLoop();
                            return resolve(true);
                        }
                        else {
                            console.error("Scene is not ready after rendering is done");
                            return resolve(false);
                        }
                    }
                    else {
                        window.scene && window.scene.render();
                        renderCount--;
                        if (adtsAreReady()) {
                            renderAfterGuiIsReadyCount--;
                        }
                    }
                }
                catch (e) {
                    window.engine && window.engine.stopRenderLoop();
                    console.error(e);
                    return resolve(false);
                }
            });
        }, true);
    });
};
exports.evaluateRenderSceneForVisualization = evaluateRenderSceneForVisualization;
const evaluateDisposeSceneForVisualization = async (engineFlags) => {
    window.scene && window.scene.dispose();
    window.scene = null;
    if (window.engine) {
        window.engine.setHardwareScalingLevel(1);
        window.engine.useReverseDepthBuffer = engineFlags.forceUseReverseDepthBuffer;
        window.engine.compatibilityMode = !engineFlags.forceUseNonCompatibilityMode;
        if (engineFlags.forceUseReverseDepthBuffer) {
            window.engine.setDepthFunction(BABYLON.Constants.GEQUAL);
        }
        else {
            window.engine.setDepthFunction(BABYLON.Constants.LEQUAL);
        }
        window.engine.applyStates();
    }
    // engine._deltaTime = 0;
    // engine._fps = 60;
    // engine._performanceMonitor = new BABYLON.PerformanceMonitor();
    BABYLON.UnregisterAllMaterialPlugins();
    return true;
};
exports.evaluateDisposeSceneForVisualization = evaluateDisposeSceneForVisualization;
const evaluateIsGLError = async () => {
    try {
        const gl = window.engine._gl, glError = gl ? gl.getError() : 0;
        if (gl && glError !== 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (e) {
        return true;
    }
};
exports.evaluateIsGLError = evaluateIsGLError;
//# sourceMappingURL=visualizationUtils.js.map