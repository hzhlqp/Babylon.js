"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logPageErrors = exports.checkPerformanceOfScene = exports.countObjects = exports.prepareLeakDetection = exports.evaluateDefaultScene = exports.evaluateDisposeEngine = exports.evaluateDisposeScene = exports.evaluateRenderScene = exports.evaluateCreateScene = exports.evaluateEventListenerAugmentation = exports.evaluateInitEngine = exports.countCurrentObjects = void 0;
const classesToCheck = ["BABYLON.Camera", "BABYLON.TransformNode", "BABYLON.Scene", "BABYLON.Vector3", "BABYLON.BaseTexture", "BABYLON.Material"];
const countCurrentObjects = async (initialValues, classes = classesToCheck, checkGlobalObjects, flip) => {
    const current = await (0, exports.countObjects)(page, classes);
    // check that all events are cleared and all objects are gone:
    Object.keys(current.eventsRegistered).forEach((eventName) => {
        const stacks = current.eventsRegistered[eventName].stackTraces;
        const numberOfActiveListeners = current.eventsRegistered[eventName].numberAdded - current.eventsRegistered[eventName].numberRemoved;
        if (flip) {
            expect(numberOfActiveListeners, `event ${eventName} is not removed ${numberOfActiveListeners} time(s). ${(stacks || []).join("\n")}`).toBeGreaterThanOrEqual(0);
        }
        else {
            expect(numberOfActiveListeners, `event ${eventName} is not removed ${numberOfActiveListeners} time(s). ${(stacks || []).join("\n")}`).toBeLessThanOrEqual(0);
        }
    });
    Object.keys(current.specifics).forEach((type) => {
        const delta = current.specifics[type].length - initialValues.specifics[type].length;
        // cross before and after
        current.specifics[type]
            .filter((id) => initialValues.specifics[type].indexOf(id) === -1)
            .forEach((id) => {
            var _a, _b;
            expect(id, `Type ${type} (${(_a = current.stackTraces[id]) === null || _a === void 0 ? void 0 : _a.className}) is not disposed; StackTrace: ${(_b = current.stackTraces[id]) === null || _b === void 0 ? void 0 : _b.stackTrace}`).toBe(null);
        });
        if (flip) {
            expect(delta, `type ${type} is not disposed ${delta} times`).toBeGreaterThanOrEqual(0);
        }
        else {
            expect(delta, `type ${type} is not disposed ${delta} times`).toBeLessThanOrEqual(0);
        }
    });
    // this test is too specific and requires thorough testing
    if (checkGlobalObjects) {
        if (flip) {
            expect(current.numberOfObjects, `number of objects is not disposed ${current.numberOfObjects - initialValues.numberOfObjects} times`).toBeGreaterThanOrEqual(initialValues.numberOfObjects);
        }
        else {
            expect(current.numberOfObjects, `number of objects is not disposed ${current.numberOfObjects - initialValues.numberOfObjects} times`).toBeLessThanOrEqual(initialValues.numberOfObjects);
        }
    }
};
exports.countCurrentObjects = countCurrentObjects;
const evaluateInitEngine = async (engineName, baseUrl, parallelCompilation = true) => {
    // run garbage collection
    window.gc && window.gc();
    engineName = engineName ? engineName.toLowerCase() : "webgl2";
    BABYLON.Tools.ScriptBaseUrl = baseUrl;
    const canvas = document.getElementById("babylon-canvas");
    if (!canvas)
        return;
    window.canvas = canvas;
    if (engineName === "webgpu") {
        const options = {
            antialias: false,
        };
        const engine = new BABYLON.WebGPUEngine(canvas, options);
        engine.enableOfflineSupport = false;
        window.engine = engine;
        await engine.initAsync();
    }
    else {
        const engine = new BABYLON.Engine(canvas, true, {
            disableWebGL2Support: engineName === "webgl1" ? true : false,
        });
        engine.enableOfflineSupport = false;
        window.engine = engine;
    }
    window.engine.renderEvenInBackground = true;
    window.engine.getCaps().parallelShaderCompile = undefined;
    return !!window.engine;
};
exports.evaluateInitEngine = evaluateInitEngine;
const evaluateEventListenerAugmentation = async () => {
    const realAddEventListener = EventTarget.prototype.addEventListener;
    const realRemoveEventListener = EventTarget.prototype.removeEventListener;
    window.eventsRegistered = {};
    EventTarget.prototype.addEventListener = function (a, b, c) {
        realAddEventListener(a, b, c);
        window.eventsRegistered[a] = window.eventsRegistered[a] || {
            numberAdded: 0,
            numberRemoved: 0,
            registeredFunctions: [],
        };
        window.eventsRegistered[a].numberAdded++;
        // find if this function was registered already
        const registered = window.eventsRegistered[a].registeredFunctions.findIndex((f) => f && f.eventListener === b);
        if (registered === -1) {
            window.eventsRegistered[a].registeredFunctions.push({
                eventListener: b,
                timesAdded: 1,
            });
        }
        else {
            window.eventsRegistered[a].registeredFunctions[registered].timesAdded++;
        }
        try {
            throw new Error();
        }
        catch (err) {
            if (window.sourceMappedStackTrace) {
                window.sourcemapPromises = window.sourcemapPromises || [];
                const promise = new Promise((resolve) => {
                    try {
                        window.sourceMappedStackTrace.mapStackTrace(err.stack, (stackArray) => {
                            window.eventsRegistered[a].stackTraces = window.eventsRegistered[a].stackTraces || [];
                            window.eventsRegistered[a].stackTraces.push(stackArray.join("\n").replace(/^Error\n/, "Stacktrace\n") + "\n>>\n");
                            resolve(null);
                        }, {
                            sync: true,
                            cacheGlobally: true,
                            filter: (line) => {
                                return line.indexOf("puppeteer") === -1;
                            },
                        });
                    }
                    catch (err) {
                        window.eventsRegistered[a].stackTraces = window.eventsRegistered[a].stackTraces || [];
                        window.eventsRegistered[a].stackTraces.push(err.stack.replace(/^Error\n/, "Stacktrace\n") + "\n>>\n");
                        resolve(null);
                    }
                });
                window.sourcemapPromises.push(promise);
            }
            else {
                window.eventsRegistered[a].stackTraces = window.eventsRegistered[a].stackTraces || [];
                window.eventsRegistered[a].stackTraces.push(err.stack.replace(/^Error\n/, "Stacktrace\n") + "\n>>\n");
            }
        }
    };
    EventTarget.prototype.removeEventListener = function (a, b, c) {
        realRemoveEventListener(a, b, c);
        window.eventsRegistered[a] = window.eventsRegistered[a] || {
            numberAdded: 0,
            numberRemoved: 0,
            registeredFunctions: [],
        };
        // find the registered
        const registered = window.eventsRegistered[a].registeredFunctions.findIndex((f) => f && f.eventListener === b);
        if (registered !== -1) {
            window.eventsRegistered[a].numberRemoved += window.eventsRegistered[a].registeredFunctions[registered].timesAdded;
            window.eventsRegistered[a].registeredFunctions[registered] = null;
        }
        else {
            // console.error("could not find registered function");
        }
    };
};
exports.evaluateEventListenerAugmentation = evaluateEventListenerAugmentation;
const evaluateCreateScene = async () => {
    if (window.engine && !window.scene) {
        window.scene = new BABYLON.Scene(window.engine);
    }
    return !!window.scene;
};
exports.evaluateCreateScene = evaluateCreateScene;
const evaluateRenderScene = async (renderCount = 1) => {
    if (window.scene && window.engine) {
        const now = performance.now();
        for (let i = 0; i < renderCount; i++) {
            window.scene.render();
        }
        return performance.now() - now;
    }
    else {
        throw new Error("no scene found");
    }
};
exports.evaluateRenderScene = evaluateRenderScene;
const evaluateDisposeScene = async () => {
    if (window.scene) {
        window.scene.dispose();
        window.scene = null;
        window.gc && window.gc();
    }
};
exports.evaluateDisposeScene = evaluateDisposeScene;
const evaluateDisposeEngine = async () => {
    if (window.engine) {
        window.engine.dispose();
        window.engine = null;
        window.gc && window.gc();
    }
};
exports.evaluateDisposeEngine = evaluateDisposeEngine;
const evaluateDefaultScene = async () => {
    if (!window.scene) {
        window.scene = new BABYLON.Scene(window.engine);
    }
    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), window.scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(true);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), window.scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    // Our built-in 'sphere' shape.
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, window.scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;
    // Our built-in 'ground' shape.
    BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, window.scene);
};
exports.evaluateDefaultScene = evaluateDefaultScene;
const prepareLeakDetection = async (classes = classesToCheck) => {
    var _a;
    window.classesConstructed = window.classesConstructed || {};
    const setStackStrace = (target) => {
        const id = Math.random().toString(36).substring(2, 15);
        target.__id = id;
        try {
            throw new Error();
        }
        catch (err) {
            if (window.sourceMappedStackTrace) {
                window.sourcemapPromises = window.sourcemapPromises || [];
                const promise = new Promise((resolve) => {
                    try {
                        window.sourceMappedStackTrace.mapStackTrace(err.stack, (stackArray) => {
                            const stackTrace = "\n" + stackArray.slice(4, stackArray.length - 1).join("\n");
                            target.__stackStrace = stackTrace;
                            window.classesConstructed[id] = { id: id, stackTrace: stackTrace, className: target.getClassName ? target.getClassName() : "unknown" };
                            resolve(window.classesConstructed[id]);
                        }, { cacheGlobally: true, sync: true });
                    }
                    catch (e) {
                        target.__stackStrace = err.stack;
                        window.classesConstructed[id] = { id: id, stackTrace: err.stack, className: target.getClassName ? target.getClassName() : "unknown" };
                        resolve(window.classesConstructed[id]);
                    }
                });
                window.sourcemapPromises.push(promise);
            }
            else {
                const stackArray = err.stack.split("\n");
                const stackTrace = "\n" + stackArray.slice(4, stackArray.length - 1).join("\n");
                target.__stackStrace = stackTrace;
                window.classesConstructed[id] = { id: id, stackTrace: stackTrace, className: target.getClassName ? target.getClassName() : "unknown" };
            }
        }
    };
    // any to allow compilation without building core
    (_a = window.engine) === null || _a === void 0 ? void 0 : _a.onNewSceneAddedObservable.add((scene) => {
        setStackStrace(scene);
        [
            "onNewCameraAddedObservable",
            "onNewLightAddedObservable",
            "onNewTransformNodeAddedObservable",
            "onNewMeshAddedObservable",
            "onNewSkeletonAddedObservable",
            "onNewMaterialAddedObservable",
            "onNewTextureAddedObservable",
        ].forEach((observable) => {
            scene[observable].add((target) => {
                setStackStrace(target);
            });
        });
    });
    classes.forEach((classToCheck) => {
        const references = classToCheck.split(".");
        const objectName = references.pop();
        const parentObject = references.reduce((o, i) => o[i], window);
        // const originalConstructor = parentObject[objectName];
        const originalPrototype = parentObject[objectName].prototype;
        const originalDispose = originalPrototype.dispose;
        originalPrototype.dispose = function () {
            // eslint-disable-next-line prefer-rest-params
            originalDispose.apply(this, arguments);
            this.__disposeCalled = true;
        };
    });
};
exports.prepareLeakDetection = prepareLeakDetection;
const countObjects = async (page, classes = classesToCheck) => {
    await page.waitForNetworkIdle({
        idleTime: 300,
        timeout: 0,
    });
    await page.evaluate(() => window.gc && window.gc());
    const prototypeHandle = await page.evaluateHandle(() => Object.prototype);
    const objectsHandle = await page.queryObjects(prototypeHandle);
    const numberOfObjects = await page.evaluate((instances) => instances.length, objectsHandle);
    const usedJSHeapSize = await page.evaluate(() => {
        return (window.performance.memory && window.performance.memory.usedJSHeapSize) || 0;
    });
    await Promise.all([prototypeHandle.dispose(), objectsHandle.dispose()]);
    const specifics = {};
    await page.evaluate(async () => {
        if (window.sourcemapPromises) {
            await Promise.all(window.sourcemapPromises);
        }
    });
    for (const classToCheck of classes) {
        const prototype = classToCheck + ".prototype";
        // tslint:disable-next-line: no-eval
        const prototypeHandle = await page.evaluateHandle((p) => eval(p), prototype);
        const objectsHandle = await page.queryObjects(prototypeHandle);
        const array = await page.evaluate((objects) => objects.map((object) => {
            if (!object.__id) {
                object.__id = Math.random().toString(36).substring(2, 15);
            }
            return object.__id;
        }), objectsHandle);
        // const count = await page.evaluate((objects) => objects.length, objectsHandle);
        await prototypeHandle.dispose();
        await objectsHandle.dispose();
        specifics[classToCheck] = array;
    }
    const eventsRegistered = await page.evaluate(() => window.eventsRegistered);
    const stackTraces = await page.evaluate(() => window.classesConstructed);
    // TODO - check if we can use performance.memory.usedJSHeapSize
    return { numberOfObjects, usedJSHeapSize, specifics, eventsRegistered, stackTraces };
};
exports.countObjects = countObjects;
const checkPerformanceOfScene = async (page, baseUrl, type, createSceneFunction, numberOfPasses = 5, framesToRender = 10000, metadata, config) => {
    if (numberOfPasses < 5) {
        numberOfPasses = 5;
    }
    const url = type === "dev" ? "/empty.html" : `/empty-${type}.html`;
    await page.goto(baseUrl + url, {
        // waitUntil: "load", // for chrome should be "networkidle0"
        timeout: 0,
    });
    await page.waitForSelector("#babylon-canvas", { timeout: 20000 });
    const time = [];
    for (let i = 0; i < numberOfPasses; i++) {
        await page.evaluate(exports.evaluateInitEngine, "webgl2", baseUrl);
        await page.evaluate(createSceneFunction, metadata || {}, config || {});
        time.push(await page.evaluate(exports.evaluateRenderScene, framesToRender));
        await page.evaluate(exports.evaluateDisposeScene);
        await page.evaluate(exports.evaluateDisposeEngine);
    }
    time.sort();
    // remove edge cases - 2 of each end
    time.pop();
    time.pop();
    time.shift();
    time.shift();
    // return the average rendering time
    return time.reduce((partialSum, a) => partialSum + a, 0) / (numberOfPasses - 2);
};
exports.checkPerformanceOfScene = checkPerformanceOfScene;
const logPageErrors = async (page, debug) => {
    page.on("console", async (msg) => {
        // serialize my args the way I want
        const args = await Promise.all(msg.args().map((arg) => arg.evaluate((argument) => {
            // I'm in a page context now. If my arg is an error - get me its message.
            if (argument instanceof Error)
                return `[ERR] ${argument.message}`;
            //Return the argument if it is just a message
            return `[STR] ${argument}`;
        }, arg)));
        args.filter((arg) => arg !== null).forEach((arg) => console.log(arg));
        // fallback
        if (!debug) {
            if (args.filter((arg) => arg !== null).length === 0 && msg.type().substring(0, 3).toUpperCase() === "ERR") {
                console.log(`${msg.type().substring(0, 3).toUpperCase()} ${msg.text()}`);
            }
        }
        else {
            console.log(`${msg.type().substring(0, 3).toUpperCase()} ${msg.text()}`);
        }
    });
    page.on("pageerror", ({ message }) => console.log(message)).on("requestfailed", (request) => { var _a; return console.log(`${(_a = request.failure()) === null || _a === void 0 ? void 0 : _a.errorText} ${request.url()}`); });
};
exports.logPageErrors = logPageErrors;
//# sourceMappingURL=utils.js.map