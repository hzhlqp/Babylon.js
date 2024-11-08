import type { Nullable } from "core/types";
import { Observable } from "core/Misc/observable";
import type { Matrix } from "core/Maths/math.vector";
import { Vector2, Vector3 } from "core/Maths/math.vector";
import type { PointerInfoPre } from "core/Events/pointerEvents";
import { ClipboardInfo } from "core/Events/clipboardEvents";
import type { Camera } from "core/Cameras/camera";
import type { IDynamicTextureOptions } from "core/Materials/Textures/dynamicTexture";
import { DynamicTexture } from "core/Materials/Textures/dynamicTexture";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import { Layer } from "core/Layers/layer";
import type { Scene } from "core/scene";
import { Container } from "./controls/container";
import { Control } from "./controls/control";
import { Style } from "./style";
import { Viewport } from "core/Maths/math.viewport";
/**
 * Interface used to define options to create an AdvancedDynamicTexture
 */
export interface IAdvancedDynamicTextureOptions extends IDynamicTextureOptions {
    /**
     * Indicates whether the ADT will be used autonomously. In this mode:
     * - _checkUpdate() is not called
     * - the layer is not rendered (so, the ADT is not visible)
     * It's up to the user to perform the required calls manually to update the ADT.
     */
    useStandalone?: boolean;
}
/**
 * Class used to create texture to support 2D GUI elements
 * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui
 */
export declare class AdvancedDynamicTexture extends DynamicTexture {
    /** Define the url to load snippets */
    static SnippetUrl: string;
    /** Indicates if some optimizations can be performed in GUI GPU management (the downside is additional memory/GPU texture memory used) */
    static AllowGPUOptimizations: boolean;
    /** Indicates whether the ADT is used autonomously */
    readonly useStandalone: boolean;
    /** Snippet ID if the content was created from the snippet server */
    snippetId: string;
    /** Observable that fires when the GUI is ready */
    onGuiReadyObservable: Observable<AdvancedDynamicTexture>;
    private _isDirty;
    private _renderObserver;
    private _resizeObserver;
    private _preKeyboardObserver;
    private _prePointerObserver;
    private _sceneRenderObserver;
    private _pointerObserver;
    private _canvasPointerOutObserver;
    private _canvasBlurObserver;
    private _controlAddedObserver;
    private _controlRemovedObserver;
    private _background;
    /** @internal */
    _rootContainer: Container;
    /** @internal */
    _lastPickedControl: Control;
    /** @internal */
    _lastControlOver: {
        [pointerId: number]: Control;
    };
    /** @internal */
    _lastControlDown: {
        [pointerId: number]: Control;
    };
    /** @internal */
    _capturingControl: {
        [pointerId: number]: Control;
    };
    /** @internal */
    _shouldBlockPointer: boolean;
    /** @internal */
    _layerToDispose: Nullable<Layer>;
    /** @internal */
    _linkedControls: Control[];
    /** @internal */
    _isFullscreen: boolean;
    private _fullscreenViewport;
    private _idealWidth;
    private _idealHeight;
    private _useSmallestIdeal;
    private _renderAtIdealSize;
    private _focusedControl;
    private _blockNextFocusCheck;
    private _renderScale;
    private _rootElement;
    private _cursorChanged;
    private _defaultMousePointerId;
    private _rootChildrenHaveChanged;
    /** @internal */
    _capturedPointerIds: Set<number>;
    /** @internal */
    _numLayoutCalls: number;
    /** Gets the number of layout calls made the last time the ADT has been rendered */
    get numLayoutCalls(): number;
    /** @internal */
    _numRenderCalls: number;
    /** Gets the number of render calls made the last time the ADT has been rendered */
    get numRenderCalls(): number;
    /**
     * Define type to string to ensure compatibility across browsers
     * Safari doesn't support DataTransfer constructor
     */
    private _clipboardData;
    /**
     * Observable event triggered each time an clipboard event is received from the rendering canvas
     */
    onClipboardObservable: Observable<ClipboardInfo>;
    /**
     * Observable event triggered each time a pointer down is intercepted by a control
     */
    onControlPickedObservable: Observable<Control>;
    /**
     * Observable event triggered before layout is evaluated
     */
    onBeginLayoutObservable: Observable<AdvancedDynamicTexture>;
    /**
     * Observable event triggered after the layout was evaluated
     */
    onEndLayoutObservable: Observable<AdvancedDynamicTexture>;
    /**
     * Observable event triggered before the texture is rendered
     */
    onBeginRenderObservable: Observable<AdvancedDynamicTexture>;
    /**
     * Observable event triggered after the texture was rendered
     */
    onEndRenderObservable: Observable<AdvancedDynamicTexture>;
    /**
     * Gets or sets a boolean defining if alpha is stored as premultiplied
     */
    premulAlpha: boolean;
    /**
     * Gets or sets a boolean indicating that the canvas must be reverted on Y when updating the texture
     */
    applyYInversionOnUpdate: boolean;
    /**
     * A boolean indicating whether or not the elements can be navigated to using the tab key.
     * Defaults to false.
     */
    disableTabNavigation: boolean;
    /**
     * A boolean indicating whether controls can be picked/clicked on or not. Defaults to false.
     */
    disablePicking: boolean;
    /**
     * If set to true, the POINTERTAP event type will be used for "click", instead of POINTERUP
     */
    usePointerTapForClickEvent: boolean;
    /**
     * Gets or sets a number used to scale rendering size (2 means that the texture will be twice bigger).
     * Useful when you want more antialiasing
     */
    get renderScale(): number;
    set renderScale(value: number);
    /** Gets or sets the background color */
    get background(): string;
    set background(value: string);
    /**
     * Gets or sets the ideal width used to design controls.
     * The GUI will then rescale everything accordingly
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
     */
    get idealWidth(): number;
    set idealWidth(value: number);
    /**
     * Gets or sets the ideal height used to design controls.
     * The GUI will then rescale everything accordingly
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
     */
    get idealHeight(): number;
    set idealHeight(value: number);
    /**
     * Gets or sets a boolean indicating if the smallest ideal value must be used if idealWidth and idealHeight are both set
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
     */
    get useSmallestIdeal(): boolean;
    set useSmallestIdeal(value: boolean);
    /**
     * Gets or sets a boolean indicating if adaptive scaling must be used
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
     */
    get renderAtIdealSize(): boolean;
    set renderAtIdealSize(value: boolean);
    /**
     * Gets the ratio used when in "ideal mode"
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
     * */
    get idealRatio(): number;
    /**
     * Gets the underlying layer used to render the texture when in fullscreen mode
     */
    get layer(): Nullable<Layer>;
    /**
     * Gets the root container control
     */
    get rootContainer(): Container;
    /**
     * Returns an array containing the root container.
     * This is mostly used to let the Inspector introspects the ADT
     * @returns an array containing the rootContainer
     */
    getChildren(): Array<Container>;
    /**
     * Will return all controls that are inside this texture
     * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
     * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
     * @returns all child controls
     */
    getDescendants(directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): Control[];
    /**
     * Will return all controls with the given type name
     * @param typeName defines the type name to search for
     * @returns an array of all controls found
     */
    getControlsByType(typeName: string): Control[];
    /**
     * Will return the first control with the given name
     * @param name defines the name to search for
     * @returns the first control found or null
     */
    getControlByName(name: string): Nullable<Control>;
    private _getControlByKey;
    /**
     * Gets or sets the current focused control
     */
    get focusedControl(): Nullable<Control>;
    set focusedControl(control: Nullable<Control>);
    /**
     * Gets or sets a boolean indicating if the texture must be rendered in background or foreground when in fullscreen mode
     */
    get isForeground(): boolean;
    set isForeground(value: boolean);
    /**
     * Gets or set information about clipboardData
     */
    get clipboardData(): string;
    set clipboardData(value: string);
    /**
     * If this is set, even when a control is pointer blocker, some events can still be passed through to the scene.
     * Options from values are PointerEventTypes
     * POINTERDOWN, POINTERUP, POINTERMOVE, POINTERWHEEL, POINTERPICK, POINTERTAP, POINTERDOUBLETAP
     */
    skipBlockEvents: number;
    /**
     * If set to true, every scene render will trigger a pointer event for the GUI
     * if it is linked to a mesh or has controls linked to a mesh. This will allow
     * you to catch the pointer moving around the GUI due to camera or mesh movements,
     * but it has a performance cost.
     */
    checkPointerEveryFrame: boolean;
    /**
     * Creates a new AdvancedDynamicTexture
     * @param name defines the name of the texture
     * @param options The options to be used when constructing the ADT
     */
    constructor(name: string, options?: IAdvancedDynamicTextureOptions);
    constructor(name: string, width?: number, height?: number, scene?: Nullable<Scene>, generateMipMaps?: boolean, samplingMode?: number, invertY?: boolean);
    /**
     * Get the current class name of the texture useful for serialization or dynamic coding.
     * @returns "AdvancedDynamicTexture"
     */
    getClassName(): string;
    /**
     * Function used to execute a function on all controls
     * @param func defines the function to execute
     * @param container defines the container where controls belong. If null the root container will be used
     */
    executeOnAllControls(func: (control: Control) => void, container?: Container): void;
    private _useInvalidateRectOptimization;
    /**
     * Gets or sets a boolean indicating if the InvalidateRect optimization should be turned on
     */
    get useInvalidateRectOptimization(): boolean;
    set useInvalidateRectOptimization(value: boolean);
    private _invalidatedRectangle;
    /**
     * Invalidates a rectangle area on the gui texture
     * @param invalidMinX left most position of the rectangle to invalidate in the texture
     * @param invalidMinY top most position of the rectangle to invalidate in the texture
     * @param invalidMaxX right most position of the rectangle to invalidate in the texture
     * @param invalidMaxY bottom most position of the rectangle to invalidate in the texture
     */
    invalidateRect(invalidMinX: number, invalidMinY: number, invalidMaxX: number, invalidMaxY: number): void;
    /**
     * Marks the texture as dirty forcing a complete update
     */
    markAsDirty(): void;
    /**
     * Helper function used to create a new style
     * @returns a new style
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#styles
     */
    createStyle(): Style;
    /**
     * Adds a new control to the root container
     * @param control defines the control to add
     * @returns the current texture
     */
    addControl(control: Control): AdvancedDynamicTexture;
    /**
     * Removes a control from the root container
     * @param control defines the control to remove
     * @returns the current texture
     */
    removeControl(control: Control): AdvancedDynamicTexture;
    /**
     * Moves overlapped controls towards a position where it is not overlapping anymore.
     * Please note that this method alters linkOffsetXInPixels and linkOffsetYInPixels.
     * @param overlapGroup the overlap group which will be processed or undefined to process all overlap groups
     * @param deltaStep the step size (speed) to reach the target non overlapping position (default 0.1)
     * @param repelFactor how much is the control repelled by other controls
     */
    moveToNonOverlappedPosition(overlapGroup?: number | Control[], deltaStep?: number, repelFactor?: number): void;
    /**
     * Release all resources
     */
    dispose(): void;
    private _onResize;
    /** @internal */
    _getGlobalViewport(): Viewport;
    /**
     * Get screen coordinates for a vector3
     * @param position defines the position to project
     * @param worldMatrix defines the world matrix to use
     * @returns the projected position
     */
    getProjectedPosition(position: Vector3, worldMatrix: Matrix): Vector2;
    /**
     * Get screen coordinates for a vector3
     * @param position defines the position to project
     * @param worldMatrix defines the world matrix to use
     * @returns the projected position with Z
     */
    getProjectedPositionWithZ(position: Vector3, worldMatrix: Matrix): Vector3;
    /** @internal */
    _checkUpdate(camera: Nullable<Camera>, skipUpdate?: boolean): void;
    private _clearMeasure;
    private _render;
    /**
     * @internal
     */
    _changeCursor(cursor: string): void;
    /**
     * @internal
     */
    _registerLastControlDown(control: Control, pointerId: number): void;
    private _doPicking;
    /**
     * @internal
     */
    _cleanControlAfterRemovalFromList(list: {
        [pointerId: number]: Control;
    }, control: Control): void;
    /**
     * @internal
     */
    _cleanControlAfterRemoval(control: Control): void;
    /**
     * This function will run a pointer event on this ADT and will trigger any pointer events on any controls
     * This will work on a fullscreen ADT only. For mesh based ADT, simulate pointer events using the scene directly.
     * @param x pointer X on the canvas for the picking
     * @param y pointer Y on the canvas for the picking
     * @param pi optional pointer information
     */
    pick(x: number, y: number, pi?: Nullable<PointerInfoPre>): void;
    private _translateToPicking;
    /** Attach to all scene events required to support pointer events */
    attach(): void;
    private _focusProperties;
    private _focusNextElement;
    /**
     * @internal
     */
    private _onClipboardCopy;
    /**
     * @internal
     */
    private _onClipboardCut;
    /**
     * @internal
     */
    private _onClipboardPaste;
    /**
     * Register the clipboard Events onto the canvas
     */
    registerClipboardEvents(): void;
    /**
     * Unregister the clipboard Events from the canvas
     */
    unRegisterClipboardEvents(): void;
    /**
     * Transform uvs from mesh space to texture space, taking the texture into account
     * @param uv the uvs in mesh space
     * @returns the uvs in texture space
     */
    private _transformUvs;
    /**
     * Connect the texture to a hosting mesh to enable interactions
     * @param mesh defines the mesh to attach to
     * @param supportPointerMove defines a boolean indicating if pointer move events must be catched as well
     */
    attachToMesh(mesh: AbstractMesh, supportPointerMove?: boolean): void;
    /**
     * Move the focus to a specific control
     * @param control defines the control which will receive the focus
     */
    moveFocusToControl(control: Control): void;
    private _manageFocus;
    private _attachPickingToSceneRender;
    private _attachToOnPointerOut;
    private _attachToOnBlur;
    /**
     * Serializes the entire GUI system
     * @returns an object with the JSON serialized data
     */
    serializeContent(): any;
    /**
     * Recreate the content of the ADT from a JSON object
     * @param serializedObject define the JSON serialized object to restore from
     * @param scaleToSize defines whether to scale to texture to the saved size
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     */
    parseSerializedObject(serializedObject: any, scaleToSize?: boolean, urlRewriter?: (url: string) => string): void;
    /**
     * Clones the ADT. If no mesh is defined, the GUI will be considered as a fullscreen GUI
     * @param newName defines the name of the new ADT
     * @param attachToMesh defines if the new ADT should be attached to a mesh
     * @returns the clone of the ADT
     */
    clone(newName?: string, attachToMesh?: AbstractMesh): AdvancedDynamicTexture;
    /**
     * Recreate the content of the ADT from a JSON object
     * @param serializedObject define the JSON serialized object to restore from
     * @param scaleToSize defines whether to scale to texture to the saved size
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @deprecated Please use parseSerializedObject instead
     */
    parseContent: (serializedObject: any, scaleToSize?: boolean, urlRewriter?: ((url: string) => string) | undefined) => void;
    /**
     * Recreate the content of the ADT from a snippet saved by the GUI editor
     * @param snippetId defines the snippet to load
     * @param scaleToSize defines whether to scale to texture to the saved size
     * @param appendToAdt if provided the snippet will be appended to the adt. Otherwise a fullscreen ADT will be created.
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @returns a promise that will resolve on success
     */
    static ParseFromSnippetAsync(snippetId: string, scaleToSize?: boolean, appendToAdt?: AdvancedDynamicTexture, urlRewriter?: (url: string) => string): Promise<AdvancedDynamicTexture>;
    /**
     * Recreate the content of the ADT from a snippet saved by the GUI editor
     * @param snippetId defines the snippet to load
     * @param scaleToSize defines whether to scale to texture to the saved size
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @returns a promise that will resolve on success
     */
    parseFromSnippetAsync(snippetId: string, scaleToSize?: boolean, urlRewriter?: (url: string) => string): Promise<AdvancedDynamicTexture>;
    /**
     * Recreate the content of the ADT from a url json
     * @param url defines the url to load
     * @param scaleToSize defines whether to scale to texture to the saved size
     * @param appendToAdt if provided the snippet will be appended to the adt. Otherwise a fullscreen ADT will be created.
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @returns a promise that will resolve on success
     */
    static ParseFromFileAsync(url: string, scaleToSize?: boolean, appendToAdt?: AdvancedDynamicTexture, urlRewriter?: (url: string) => string): Promise<AdvancedDynamicTexture>;
    /**
     * Recreate the content of the ADT from a url json
     * @param url defines the url to load
     * @param scaleToSize defines whether to scale to texture to the saved size
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @returns a promise that will resolve on success
     */
    parseFromURLAsync(url: string, scaleToSize?: boolean, urlRewriter?: (url: string) => string): Promise<AdvancedDynamicTexture>;
    private static _LoadURLContentAsync;
    /**
     * Compares two rectangle based controls for pixel overlap
     * @param control1 The first control to compare
     * @param control2 The second control to compare
     * @returns true if overlaps, otherwise false
     */
    private static _Overlaps;
    /**
     * Creates a new AdvancedDynamicTexture in projected mode (ie. attached to a mesh)
     * @param mesh defines the mesh which will receive the texture
     * @param width defines the texture width (1024 by default)
     * @param height defines the texture height (1024 by default)
     * @param supportPointerMove defines a boolean indicating if the texture must capture move events (true by default)
     * @param onlyAlphaTesting defines a boolean indicating that alpha blending will not be used (only alpha testing) (false by default)
     * @param invertY defines if the texture needs to be inverted on the y axis during loading (true by default)
     * @param materialSetupCallback defines a custom way of creating and setting up the material on the mesh
     * @param sampling defines the texture sampling mode (Texture.TRILINEAR_SAMPLINGMODE by default)
     * @returns a new AdvancedDynamicTexture
     */
    static CreateForMesh(mesh: AbstractMesh, width?: number, height?: number, supportPointerMove?: boolean, onlyAlphaTesting?: boolean, invertY?: boolean, materialSetupCallback?: (mesh: AbstractMesh, uniqueId: string, texture: AdvancedDynamicTexture, onlyAlphaTesting: boolean) => void, sampling?: number): AdvancedDynamicTexture;
    private static _CreateMaterial;
    /**
     * Creates a new AdvancedDynamicTexture in projected mode (ie. attached to a mesh) BUT do not create a new material for the mesh. You will be responsible for connecting the texture
     * @param mesh defines the mesh which will receive the texture
     * @param width defines the texture width (1024 by default)
     * @param height defines the texture height (1024 by default)
     * @param supportPointerMove defines a boolean indicating if the texture must capture move events (true by default)
     * @param invertY defines if the texture needs to be inverted on the y axis during loading (true by default)
     * @param sampling defines the texture sampling mode (Texture.TRILINEAR_SAMPLINGMODE by default)
     * @returns a new AdvancedDynamicTexture
     */
    static CreateForMeshTexture(mesh: AbstractMesh, width?: number, height?: number, supportPointerMove?: boolean, invertY?: boolean, sampling?: number): AdvancedDynamicTexture;
    /**
     * Creates a new AdvancedDynamicTexture in fullscreen mode.
     * In this mode the texture will rely on a layer for its rendering.
     * This allows it to be treated like any other layer.
     * As such, if you have a multi camera setup, you can set the layerMask on the GUI as well.
     * LayerMask is set through advancedTexture.layer.layerMask
     * @param name defines name for the texture
     * @param foreground defines a boolean indicating if the texture must be rendered in foreground (default is true)
     * @param sceneOrOptions defines the hosting scene or options (IAdvancedDynamicTextureOptions)
     * @param sampling defines the texture sampling mode (Texture.BILINEAR_SAMPLINGMODE by default)
     * @param adaptiveScaling defines whether to automatically scale root to match hardwarescaling (false by default)
     * @returns a new AdvancedDynamicTexture
     */
    static CreateFullscreenUI(name: string, foreground?: boolean, sceneOrOptions?: Nullable<Scene> | IAdvancedDynamicTextureOptions, sampling?: number, adaptiveScaling?: boolean): AdvancedDynamicTexture;
    /**
     * Scales the texture
     * @param ratio the scale factor to apply to both width and height
     */
    scale(ratio: number): void;
    /**
     * Resizes the texture
     * @param width the new width
     * @param height the new height
     */
    scaleTo(width: number, height: number): void;
    private _checkGuiIsReady;
    /**
     * @returns true if all the GUI components are ready to render
     */
    guiIsReady(): boolean;
}
