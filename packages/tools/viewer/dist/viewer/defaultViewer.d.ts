import type { Template } from "../templating/templateManager";
import { TemplateManager } from "../templating/templateManager";
import { AbstractViewerWithTemplate } from "./viewerWithTemplate";
import type { ViewerModel } from "../model/viewerModel";
import type { IViewerTemplatePlugin } from "../templating/viewerTemplatePlugin";
import type { ViewerConfiguration } from "../configuration/configuration";
import type { IModelConfiguration } from "../configuration/interfaces/modelConfiguration";
import "core/Lights/Shadows/shadowGeneratorSceneComponent";
/**
 * The Default viewer is the default implementation of the AbstractViewer.
 * It uses the templating system to render a new canvas and controls.
 */
export declare class DefaultViewer extends AbstractViewerWithTemplate {
    containerElement: Element;
    /**
     * The corresponsing template manager of this viewer.
     */
    templateManager: TemplateManager;
    fullscreenElement?: Element;
    /**
     * Create a new default viewer
     * @param containerElement the element in which the templates will be rendered
     * @param initialConfiguration the initial configuration. Defaults to extending the default configuration
     */
    constructor(containerElement: Element, initialConfiguration?: ViewerConfiguration);
    private _registeredPlugins;
    registerTemplatePlugin(plugin: IViewerTemplatePlugin): void;
    /**
     * This will be executed when the templates initialize.
     * @returns a promise that will be resolved when the templates are loaded
     */
    protected _onTemplatesLoaded(): Promise<import("./viewer").AbstractViewer>;
    private _initNavbar;
    private _animationList;
    private _currentAnimation;
    private _isAnimationPaused;
    private _resumePlay;
    private _handlePointerClick;
    /**
     * Plays or Pauses animation
     * @param noUiUpdate
     */
    private _togglePlayPause;
    private _oldIdleRotationValue;
    /**
     * Control progress bar position based on animation current frame
     */
    private _updateProgressBar;
    /**
     * Update Current Animation Speed
     * @param speed
     * @param paramsObject
     */
    private _updateAnimationSpeed;
    /**
     * Update Current Animation Type
     * @param data
     * @param data.label
     * @param data.value
     * @param paramsObject
     */
    private _updateAnimationType;
    protected _initVR(): void;
    /**
     * Toggle fullscreen of the entire viewer
     */
    toggleFullscreen: () => void;
    /**
     * Preparing the container element to present the viewer
     */
    protected _prepareContainerElement(): void;
    /**
     * This function will configure the templates and update them after a model was loaded
     * It is mainly responsible to changing the title and subtitle etc'.
     * @param model the model to be used to configure the templates by
     */
    protected _configureTemplate(model?: ViewerModel): void;
    /**
     * This will load a new model to the default viewer
     * overriding the AbstractViewer's loadModel.
     * The scene will automatically be cleared of the old models, if exist.
     * @param model the configuration object (or URL) to load.
     * @returns a promise that will be resolved when the model is loaded
     */
    loadModel(model?: string | File | IModelConfiguration): Promise<ViewerModel>;
    private _onModelLoaded;
    /**
     * Show the overlay and the defined sub-screen.
     * Mainly used for help and errors
     * @param subScreen the name of the subScreen. Those can be defined in the configuration object
     * @returns a promise that will be resolved when the overlay is shown
     */
    showOverlayScreen(subScreen: string): Promise<string> | Promise<Template>;
    /**
     * Hide the overlay screen.
     * @returns a promise that will be resolved when the overlay is hidden
     */
    hideOverlayScreen(): Promise<string> | Promise<Template>;
    /**
     * show the viewer (in case it was hidden)
     *
     * @param visibilityFunction an optional function to execute in order to show the container
     * @returns a promise that will be resolved when the viewer is shown
     */
    show(visibilityFunction?: (template: Template) => Promise<Template>): Promise<Template>;
    /**
     * hide the viewer (in case it is visible)
     *
     * @param visibilityFunction an optional function to execute in order to hide the container
     * @returns a promise that will be resolved when the viewer is hidden
     */
    hide(visibilityFunction?: (template: Template) => Promise<Template>): Promise<Template>;
    /**
     * Show the loading screen.
     * The loading screen can be configured using the configuration object
     * @returns a promise that will be resolved when the loading screen is shown
     */
    showLoadingScreen(): Promise<string> | Promise<Template>;
    /**
     * Hide the loading screen
     * @returns a promise that will be resolved when the loading screen is hidden
     */
    hideLoadingScreen(): Promise<string> | Promise<Template>;
    dispose(): void;
    protected _onConfigurationLoaded(configuration: ViewerConfiguration): void;
    /**
     * An extension of the light configuration of the abstract viewer.
     */
    private _configureLights;
}
