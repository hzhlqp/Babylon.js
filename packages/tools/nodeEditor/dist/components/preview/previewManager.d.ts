import type { GlobalState } from "../../globalState";
import "core/Helpers/sceneHelpers";
import "core/Rendering/depthRendererSceneComponent";
/**
 *
 */
export declare class PreviewManager {
    private _nodeMaterial;
    private _onBuildObserver;
    private _onPreviewCommandActivatedObserver;
    private _onAnimationCommandActivatedObserver;
    private _onUpdateRequiredObserver;
    private _onPreviewBackgroundChangedObserver;
    private _onBackFaceCullingChangedObserver;
    private _onDepthPrePassChangedObserver;
    private _onLightUpdatedObserver;
    private _onBackgroundHDRUpdatedObserver;
    private _engine;
    private _scene;
    private _meshes;
    private _camera;
    private _material;
    private _globalState;
    private _currentType;
    private _lightParent;
    private _postprocess;
    private _proceduralTexture;
    private _particleSystem;
    private _layer;
    private _hdrSkyBox;
    private _hdrTexture;
    private _serializeMaterial;
    /**
     * Create a new Preview Manager
     * @param targetCanvas defines the canvas to render to
     * @param globalState defines the global state
     */
    constructor(targetCanvas: HTMLCanvasElement, globalState: GlobalState);
    _initAsync(targetCanvas: HTMLCanvasElement): Promise<void>;
    private _reset;
    private _handleAnimations;
    private _prepareLights;
    private _prepareBackgroundHDR;
    private _prepareScene;
    /**
     * Default Environment URL
     */
    static DefaultEnvironmentURL: string;
    private _refreshPreviewMesh;
    private _loadParticleSystem;
    private _forceCompilationAsync;
    private _updatePreview;
    dispose(): void;
}
