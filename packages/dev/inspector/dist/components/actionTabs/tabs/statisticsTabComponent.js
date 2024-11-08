import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PaneComponent } from "../paneComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { EngineInstrumentation } from "core/Instrumentation/engineInstrumentation";
import { SceneInstrumentation } from "core/Instrumentation/sceneInstrumentation";
import { Engine } from "core/Engines/engine";
import { ValueLineComponent } from "shared-ui-components/lines/valueLineComponent";
import { BooleanLineComponent } from "shared-ui-components/lines/booleanLineComponent";
import { PerformanceViewerComponent } from "./performanceViewer/performanceViewerComponent";
export class StatisticsTabComponent extends PaneComponent {
    constructor(props) {
        super(props);
        const scene = this.props.scene;
        if (!scene) {
            return;
        }
        this._sceneInstrumentation = new SceneInstrumentation(scene);
        this._sceneInstrumentation.captureActiveMeshesEvaluationTime = true;
        this._sceneInstrumentation.captureRenderTargetsRenderTime = true;
        this._sceneInstrumentation.captureFrameTime = true;
        this._sceneInstrumentation.captureRenderTime = true;
        this._sceneInstrumentation.captureInterFrameTime = true;
        this._sceneInstrumentation.captureParticlesRenderTime = true;
        this._sceneInstrumentation.captureSpritesRenderTime = true;
        this._sceneInstrumentation.capturePhysicsTime = true;
        this._sceneInstrumentation.captureAnimationsTime = true;
        this._engineInstrumentation = new EngineInstrumentation(scene.getEngine());
        this._engineInstrumentation.captureGPUFrameTime = true;
        this._timerIntervalId = window.setInterval(() => this.forceUpdate(), 500);
    }
    componentWillUnmount() {
        if (this._sceneInstrumentation) {
            this._sceneInstrumentation.dispose();
            this._sceneInstrumentation = null;
        }
        if (this._engineInstrumentation) {
            this._engineInstrumentation.dispose();
            this._engineInstrumentation = null;
        }
        window.clearInterval(this._timerIntervalId);
    }
    render() {
        const scene = this.props.scene;
        if (!scene || !this._sceneInstrumentation || !this._engineInstrumentation) {
            return null;
        }
        const engine = scene.getEngine();
        const sceneInstrumentation = this._sceneInstrumentation;
        const engineInstrumentation = this._engineInstrumentation;
        const caps = engine.getCaps();
        return (_jsxs("div", { className: "pane", children: [_jsx(TextLineComponent, { label: "Version", value: Engine.Version, color: "rgb(113, 159, 255)" }), _jsx(ValueLineComponent, { label: "FPS", value: engine.getFps(), fractionDigits: 0 }), _jsx(PerformanceViewerComponent, { scene: scene }), _jsxs(LineContainerComponent, { title: "COUNT", children: [_jsx(TextLineComponent, { label: "Total meshes", value: scene.meshes.length.toString() }), _jsx(TextLineComponent, { label: "Active meshes", value: scene.getActiveMeshes().length.toString() }), _jsx(TextLineComponent, { label: "Active indices", value: scene.getActiveIndices().toString() }), _jsx(TextLineComponent, { label: "Active faces", value: (scene.getActiveIndices() / 3).toString() }), _jsx(TextLineComponent, { label: "Active bones", value: scene.getActiveBones().toString() }), _jsx(TextLineComponent, { label: "Active particles", value: scene.getActiveParticles().toString() }), _jsx(TextLineComponent, { label: "Draw calls", value: sceneInstrumentation.drawCallsCounter.current.toString() }), _jsx(TextLineComponent, { label: "Total lights", value: scene.lights.length.toString() }), _jsx(TextLineComponent, { label: "Total vertices", value: scene.getTotalVertices().toString() }), _jsx(TextLineComponent, { label: "Total materials", value: scene.materials.length.toString() }), _jsx(TextLineComponent, { label: "Total textures", value: scene.textures.length.toString() })] }), _jsxs(LineContainerComponent, { title: "FRAME STEPS DURATION", children: [_jsx(ValueLineComponent, { label: "Absolute FPS", value: 1000.0 / this._sceneInstrumentation.frameTimeCounter.lastSecAverage, fractionDigits: 0 }), _jsx(ValueLineComponent, { label: "Meshes selection", value: sceneInstrumentation.activeMeshesEvaluationTimeCounter.lastSecAverage, units: "ms" }), _jsx(ValueLineComponent, { label: "Render targets", value: sceneInstrumentation.renderTargetsRenderTimeCounter.lastSecAverage, units: "ms" }), _jsx(ValueLineComponent, { label: "Particles", value: sceneInstrumentation.particlesRenderTimeCounter.lastSecAverage, units: "ms" }), _jsx(ValueLineComponent, { label: "Sprites", value: sceneInstrumentation.spritesRenderTimeCounter.lastSecAverage, units: "ms" }), _jsx(ValueLineComponent, { label: "Animations", value: sceneInstrumentation.animationsTimeCounter.lastSecAverage, units: "ms" }), _jsx(ValueLineComponent, { label: "Physics", value: sceneInstrumentation.physicsTimeCounter.lastSecAverage, units: "ms" }), _jsx(ValueLineComponent, { label: "Render", value: sceneInstrumentation.renderTimeCounter.lastSecAverage, units: "ms" }), _jsx(ValueLineComponent, { label: "Frame total", value: sceneInstrumentation.frameTimeCounter.lastSecAverage, units: "ms" }), _jsx(ValueLineComponent, { label: "Inter-frame", value: sceneInstrumentation.interFrameTimeCounter.lastSecAverage, units: "ms" }), _jsx(ValueLineComponent, { label: "GPU Frame time", value: engineInstrumentation.gpuFrameTimeCounter.lastSecAverage * 0.000001, units: "ms" }), _jsx(ValueLineComponent, { label: "GPU Frame time (average)", value: engineInstrumentation.gpuFrameTimeCounter.average * 0.000001, units: "ms" })] }), _jsxs(LineContainerComponent, { title: "SYSTEM INFO", children: [_jsx(TextLineComponent, { label: "Resolution", value: engine.getRenderWidth() + "x" + engine.getRenderHeight() }), _jsx(TextLineComponent, { label: "Hardware scaling level", value: engine.getHardwareScalingLevel().toString() }), _jsx(TextLineComponent, { label: "Engine", value: engine.description }), _jsx(BooleanLineComponent, { label: "Std derivatives", value: caps.standardDerivatives }), _jsx(BooleanLineComponent, { label: "Compressed textures", value: caps.s3tc !== undefined }), _jsx(BooleanLineComponent, { label: "Hardware instances", value: caps.instancedArrays }), _jsx(BooleanLineComponent, { label: "Texture float", value: caps.textureFloat }), _jsx(BooleanLineComponent, { label: "Texture half-float", value: caps.textureHalfFloat }), _jsx(BooleanLineComponent, { label: "Render to texture float", value: caps.textureFloatRender }), _jsx(BooleanLineComponent, { label: "Render to texture half-float", value: caps.textureHalfFloatRender }), _jsx(BooleanLineComponent, { label: "32bits indices", value: caps.uintIndices }), _jsx(BooleanLineComponent, { label: "Fragment depth", value: caps.fragmentDepthSupported }), _jsx(BooleanLineComponent, { label: "High precision shaders", value: caps.highPrecisionShaderSupported }), _jsx(BooleanLineComponent, { label: "Draw buffers", value: caps.drawBuffersExtension }), _jsx(BooleanLineComponent, { label: "Vertex array object", value: caps.vertexArrayObject }), _jsx(BooleanLineComponent, { label: "Timer query", value: caps.timerQuery !== undefined }), _jsx(BooleanLineComponent, { label: "Stencil", value: engine.isStencilEnable }), _jsx(BooleanLineComponent, { label: "Parallel shader compilation", value: caps.parallelShaderCompile != null }), _jsx(ValueLineComponent, { label: "Max textures units", value: caps.maxTexturesImageUnits, fractionDigits: 0 }), _jsx(ValueLineComponent, { label: "Max textures size", value: caps.maxTextureSize, fractionDigits: 0 }), _jsx(ValueLineComponent, { label: "Max anisotropy", value: caps.maxAnisotropy, fractionDigits: 0 }), _jsx(TextLineComponent, { label: "Driver", value: engine.extractDriverInfo() })] })] }));
    }
}
//# sourceMappingURL=statisticsTabComponent.js.map