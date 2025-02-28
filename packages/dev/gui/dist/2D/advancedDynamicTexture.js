import { Observable } from "core/Misc/observable";
import { Vector2, Vector3, TmpVectors } from "core/Maths/math.vector";
import { Tools } from "core/Misc/tools";
import { PointerEventTypes } from "core/Events/pointerEvents";
import { ClipboardEventTypes, ClipboardInfo } from "core/Events/clipboardEvents";
import { KeyboardEventTypes } from "core/Events/keyboardEvents";
import { Texture } from "core/Materials/Textures/texture";
import { DynamicTexture } from "core/Materials/Textures/dynamicTexture";
import { Layer } from "core/Layers/layer";
import { Container } from "./controls/container";
import { Control } from "./controls/control";
import { Style } from "./style";
import { Measure } from "./measure";
import { Constants } from "core/Engines/constants";
import { Viewport } from "core/Maths/math.viewport";
import { Color3 } from "core/Maths/math.color";
import { WebRequest } from "core/Misc/webRequest";
import { RandomGUID } from "core/Misc/guid";
import { GetClass } from "core/Misc/typeStore";
import { DecodeBase64ToBinary } from "core/Misc/stringTools";
/**
 * Class used to create texture to support 2D GUI elements
 * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui
 */
export class AdvancedDynamicTexture extends DynamicTexture {
    /** Gets the number of layout calls made the last time the ADT has been rendered */
    get numLayoutCalls() {
        return this._numLayoutCalls;
    }
    /** Gets the number of render calls made the last time the ADT has been rendered */
    get numRenderCalls() {
        return this._numRenderCalls;
    }
    /**
     * Gets or sets a number used to scale rendering size (2 means that the texture will be twice bigger).
     * Useful when you want more antialiasing
     */
    get renderScale() {
        return this._renderScale;
    }
    set renderScale(value) {
        if (value === this._renderScale) {
            return;
        }
        this._renderScale = value;
        this._onResize();
    }
    /** Gets or sets the background color */
    get background() {
        return this._background;
    }
    set background(value) {
        if (this._background === value) {
            return;
        }
        this._background = value;
        this.markAsDirty();
    }
    /**
     * Gets or sets the ideal width used to design controls.
     * The GUI will then rescale everything accordingly
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
     */
    get idealWidth() {
        return this._idealWidth;
    }
    set idealWidth(value) {
        if (this._idealWidth === value) {
            return;
        }
        this._idealWidth = value;
        this.markAsDirty();
        this._rootContainer._markAllAsDirty();
    }
    /**
     * Gets or sets the ideal height used to design controls.
     * The GUI will then rescale everything accordingly
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
     */
    get idealHeight() {
        return this._idealHeight;
    }
    set idealHeight(value) {
        if (this._idealHeight === value) {
            return;
        }
        this._idealHeight = value;
        this.markAsDirty();
        this._rootContainer._markAllAsDirty();
    }
    /**
     * Gets or sets a boolean indicating if the smallest ideal value must be used if idealWidth and idealHeight are both set
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
     */
    get useSmallestIdeal() {
        return this._useSmallestIdeal;
    }
    set useSmallestIdeal(value) {
        if (this._useSmallestIdeal === value) {
            return;
        }
        this._useSmallestIdeal = value;
        this.markAsDirty();
        this._rootContainer._markAllAsDirty();
    }
    /**
     * Gets or sets a boolean indicating if adaptive scaling must be used
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
     */
    get renderAtIdealSize() {
        return this._renderAtIdealSize;
    }
    set renderAtIdealSize(value) {
        if (this._renderAtIdealSize === value) {
            return;
        }
        this._renderAtIdealSize = value;
        this._onResize();
    }
    /**
     * Gets the ratio used when in "ideal mode"
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#adaptive-scaling
     * */
    get idealRatio() {
        let rwidth = 0;
        let rheight = 0;
        if (this._idealWidth) {
            rwidth = this.getSize().width / this._idealWidth;
        }
        if (this._idealHeight) {
            rheight = this.getSize().height / this._idealHeight;
        }
        if (this._useSmallestIdeal && this._idealWidth && this._idealHeight) {
            return window.innerWidth < window.innerHeight ? rwidth : rheight;
        }
        if (this._idealWidth) {
            // horizontal
            return rwidth;
        }
        if (this._idealHeight) {
            // vertical
            return rheight;
        }
        return 1;
    }
    /**
     * Gets the underlying layer used to render the texture when in fullscreen mode
     */
    get layer() {
        return this._layerToDispose;
    }
    /**
     * Gets the root container control
     */
    get rootContainer() {
        return this._rootContainer;
    }
    /**
     * Returns an array containing the root container.
     * This is mostly used to let the Inspector introspects the ADT
     * @returns an array containing the rootContainer
     */
    getChildren() {
        return [this._rootContainer];
    }
    /**
     * Will return all controls that are inside this texture
     * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
     * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
     * @returns all child controls
     */
    getDescendants(directDescendantsOnly, predicate) {
        return this._rootContainer.getDescendants(directDescendantsOnly, predicate);
    }
    /**
     * Will return all controls with the given type name
     * @param typeName defines the type name to search for
     * @returns an array of all controls found
     */
    getControlsByType(typeName) {
        return this._rootContainer.getDescendants(false, (control) => control.typeName === typeName);
    }
    /**
     * Will return the first control with the given name
     * @param name defines the name to search for
     * @returns the first control found or null
     */
    getControlByName(name) {
        return this._getControlByKey("name", name);
    }
    _getControlByKey(key, value) {
        return this._rootContainer.getDescendants().find((control) => control[key] === value) || null;
    }
    /**
     * Gets or sets the current focused control
     */
    get focusedControl() {
        return this._focusedControl;
    }
    set focusedControl(control) {
        if (this._focusedControl == control) {
            return;
        }
        if (this._focusedControl) {
            this._focusedControl.onBlur();
        }
        if (control) {
            control.onFocus();
        }
        this._focusedControl = control;
    }
    /**
     * Gets or sets a boolean indicating if the texture must be rendered in background or foreground when in fullscreen mode
     */
    get isForeground() {
        if (!this.layer) {
            return true;
        }
        return !this.layer.isBackground;
    }
    set isForeground(value) {
        if (!this.layer) {
            return;
        }
        if (this.layer.isBackground === !value) {
            return;
        }
        this.layer.isBackground = !value;
    }
    /**
     * Gets or set information about clipboardData
     */
    get clipboardData() {
        return this._clipboardData;
    }
    set clipboardData(value) {
        this._clipboardData = value;
    }
    /** @internal */
    constructor(name, widthOrOptions, _height = 0, scene, generateMipMaps = false, samplingMode = Texture.NEAREST_SAMPLINGMODE, invertY = true) {
        widthOrOptions = widthOrOptions ?? 0;
        const width = typeof widthOrOptions === "object" && widthOrOptions !== undefined ? (widthOrOptions.width ?? 0) : (widthOrOptions ?? 0);
        const height = typeof widthOrOptions === "object" && widthOrOptions !== undefined ? (widthOrOptions.height ?? 0) : _height;
        super(name, { width, height }, typeof widthOrOptions === "object" && widthOrOptions !== undefined ? widthOrOptions : scene, generateMipMaps, samplingMode, Constants.TEXTUREFORMAT_RGBA, invertY);
        /** Indicates whether the ADT is used autonomously */
        this.useStandalone = false;
        /** Observable that fires when the GUI is ready */
        this.onGuiReadyObservable = new Observable();
        this._isDirty = false;
        /** @internal */
        this._rootContainer = new Container("root");
        /** @internal */
        this._lastControlOver = {};
        /** @internal */
        this._lastControlDown = {};
        /** @internal */
        this._capturingControl = {};
        /** @internal */
        this._linkedControls = new Array();
        /** @internal */
        this._isFullscreen = false;
        this._fullscreenViewport = new Viewport(0, 0, 1, 1);
        this._idealWidth = 0;
        this._idealHeight = 0;
        this._useSmallestIdeal = false;
        this._renderAtIdealSize = false;
        this._blockNextFocusCheck = false;
        this._renderScale = 1;
        this._cursorChanged = false;
        this._defaultMousePointerId = 0;
        this._rootChildrenHaveChanged = false;
        /** @internal */
        this._capturedPointerIds = new Set();
        /** @internal */
        this._numLayoutCalls = 0;
        /** @internal */
        this._numRenderCalls = 0;
        /**
         * Define type to string to ensure compatibility across browsers
         * Safari doesn't support DataTransfer constructor
         */
        this._clipboardData = "";
        /**
         * Observable event triggered each time an clipboard event is received from the rendering canvas
         */
        this.onClipboardObservable = new Observable();
        /**
         * Observable event triggered each time a pointer down is intercepted by a control
         */
        this.onControlPickedObservable = new Observable();
        /**
         * Observable event triggered before layout is evaluated
         */
        this.onBeginLayoutObservable = new Observable();
        /**
         * Observable event triggered after the layout was evaluated
         */
        this.onEndLayoutObservable = new Observable();
        /**
         * Observable event triggered before the texture is rendered
         */
        this.onBeginRenderObservable = new Observable();
        /**
         * Observable event triggered after the texture was rendered
         */
        this.onEndRenderObservable = new Observable();
        /**
         * Gets or sets a boolean defining if alpha is stored as premultiplied
         */
        this.premulAlpha = false;
        /**
         * Gets or sets a boolean indicating that the canvas must be reverted on Y when updating the texture
         */
        this.applyYInversionOnUpdate = true;
        /**
         * A boolean indicating whether or not the elements can be navigated to using the tab key.
         * Defaults to false.
         */
        this.disableTabNavigation = false;
        /**
         * A boolean indicating whether controls can be picked/clicked on or not. Defaults to false.
         */
        this.disablePicking = false;
        /**
         * If set to true, the POINTERTAP event type will be used for "click", instead of POINTERUP
         */
        this.usePointerTapForClickEvent = false;
        /**
         * If this is set, even when a control is pointer blocker, some events can still be passed through to the scene.
         * Options from values are PointerEventTypes
         * POINTERDOWN, POINTERUP, POINTERMOVE, POINTERWHEEL, POINTERPICK, POINTERTAP, POINTERDOUBLETAP
         */
        this.skipBlockEvents = 0;
        /**
         * If set to true, every scene render will trigger a pointer event for the GUI
         * if it is linked to a mesh or has controls linked to a mesh. This will allow
         * you to catch the pointer moving around the GUI due to camera or mesh movements,
         * but it has a performance cost.
         */
        this.checkPointerEveryFrame = false;
        this._useInvalidateRectOptimization = true;
        // Invalidated rectangle which is the combination of all invalidated controls after they have been rotated into absolute position
        this._invalidatedRectangle = null;
        this._clearMeasure = new Measure(0, 0, 0, 0);
        this._focusProperties = { index: 0, total: -1 };
        /**
         * @internal
         */
        this._onClipboardCopy = (rawEvt) => {
            const evt = rawEvt;
            const ev = new ClipboardInfo(ClipboardEventTypes.COPY, evt);
            this.onClipboardObservable.notifyObservers(ev);
            evt.preventDefault();
        };
        /**
         * @internal
         */
        this._onClipboardCut = (rawEvt) => {
            const evt = rawEvt;
            const ev = new ClipboardInfo(ClipboardEventTypes.CUT, evt);
            this.onClipboardObservable.notifyObservers(ev);
            evt.preventDefault();
        };
        /**
         * @internal
         */
        this._onClipboardPaste = (rawEvt) => {
            const evt = rawEvt;
            const ev = new ClipboardInfo(ClipboardEventTypes.PASTE, evt);
            this.onClipboardObservable.notifyObservers(ev);
            evt.preventDefault();
        };
        /**
         * Recreate the content of the ADT from a JSON object
         * @param serializedObject define the JSON serialized object to restore from
         * @param scaleToSize defines whether to scale to texture to the saved size
         * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
         * @deprecated Please use parseSerializedObject instead
         */
        this.parseContent = this.parseSerializedObject;
        scene = this.getScene();
        if (!scene || !this._texture) {
            return;
        }
        this.applyYInversionOnUpdate = invertY;
        this._rootElement = scene.getEngine().getInputElement();
        const adtOptions = widthOrOptions;
        this.useStandalone = !!adtOptions?.useStandalone;
        if (!this.useStandalone) {
            this._renderObserver = scene.onBeforeCameraRenderObservable.add((camera) => this._checkUpdate(camera));
        }
        /** Whenever a control is added or removed to the root, we have to recheck the camera projection as it can have changed  */
        this._controlAddedObserver = this._rootContainer.onControlAddedObservable.add((control) => {
            if (control) {
                this._rootChildrenHaveChanged = true;
            }
        });
        this._controlRemovedObserver = this._rootContainer.onControlRemovedObservable.add((control) => {
            if (control) {
                this._rootChildrenHaveChanged = true;
            }
        });
        this._preKeyboardObserver = scene.onPreKeyboardObservable.add((info) => {
            // check if tab is pressed
            if (!this.disableTabNavigation && info.type === KeyboardEventTypes.KEYDOWN && info.event.code === "Tab") {
                const forward = !info.event.shiftKey;
                if ((forward && this._focusProperties.index === this._focusProperties.total - 1) ||
                    (!forward && this._focusProperties.index === 0 && this._focusProperties.total > 0)) {
                    this.focusedControl = null;
                    this._focusProperties.index = 0;
                    this._focusProperties.total = -1;
                    return;
                }
                this._focusNextElement(forward);
                info.event.preventDefault();
                return;
            }
            if (!this._focusedControl) {
                return;
            }
            if (info.type === KeyboardEventTypes.KEYDOWN) {
                this._focusedControl.processKeyboard(info.event);
            }
            info.skipOnPointerObservable = true;
        });
        this._rootContainer._link(this);
        this.hasAlpha = true;
        if (!width || !height) {
            this._resizeObserver = scene.getEngine().onResizeObservable.add(() => this._onResize());
            this._onResize();
        }
        this._texture.isReady = true;
    }
    /**
     * Get the current class name of the texture useful for serialization or dynamic coding.
     * @returns "AdvancedDynamicTexture"
     */
    getClassName() {
        return "AdvancedDynamicTexture";
    }
    /**
     * Function used to execute a function on all controls
     * @param func defines the function to execute
     * @param container defines the container where controls belong. If null the root container will be used
     */
    executeOnAllControls(func, container) {
        if (!container) {
            container = this._rootContainer;
        }
        func(container);
        for (const child of container.children) {
            if (child.children) {
                this.executeOnAllControls(func, child);
                continue;
            }
            func(child);
        }
    }
    /**
     * Gets or sets a boolean indicating if the InvalidateRect optimization should be turned on
     */
    get useInvalidateRectOptimization() {
        return this._useInvalidateRectOptimization;
    }
    set useInvalidateRectOptimization(value) {
        this._useInvalidateRectOptimization = value;
    }
    /**
     * Invalidates a rectangle area on the gui texture
     * @param invalidMinX left most position of the rectangle to invalidate in the texture
     * @param invalidMinY top most position of the rectangle to invalidate in the texture
     * @param invalidMaxX right most position of the rectangle to invalidate in the texture
     * @param invalidMaxY bottom most position of the rectangle to invalidate in the texture
     */
    invalidateRect(invalidMinX, invalidMinY, invalidMaxX, invalidMaxY) {
        if (!this._useInvalidateRectOptimization) {
            return;
        }
        if (!this._invalidatedRectangle) {
            this._invalidatedRectangle = new Measure(invalidMinX, invalidMinY, invalidMaxX - invalidMinX + 1, invalidMaxY - invalidMinY + 1);
        }
        else {
            // Compute intersection
            const maxX = Math.ceil(Math.max(this._invalidatedRectangle.left + this._invalidatedRectangle.width - 1, invalidMaxX));
            const maxY = Math.ceil(Math.max(this._invalidatedRectangle.top + this._invalidatedRectangle.height - 1, invalidMaxY));
            this._invalidatedRectangle.left = Math.floor(Math.min(this._invalidatedRectangle.left, invalidMinX));
            this._invalidatedRectangle.top = Math.floor(Math.min(this._invalidatedRectangle.top, invalidMinY));
            this._invalidatedRectangle.width = maxX - this._invalidatedRectangle.left + 1;
            this._invalidatedRectangle.height = maxY - this._invalidatedRectangle.top + 1;
        }
    }
    /**
     * Marks the texture as dirty forcing a complete update
     */
    markAsDirty() {
        this._isDirty = true;
    }
    /**
     * Helper function used to create a new style
     * @returns a new style
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#styles
     */
    createStyle() {
        return new Style(this);
    }
    /**
     * Adds a new control to the root container
     * @param control defines the control to add
     * @returns the current texture
     */
    addControl(control) {
        this._rootContainer.addControl(control);
        return this;
    }
    /**
     * Removes a control from the root container
     * @param control defines the control to remove
     * @returns the current texture
     */
    removeControl(control) {
        this._rootContainer.removeControl(control);
        return this;
    }
    /**
     * Moves overlapped controls towards a position where it is not overlapping anymore.
     * Please note that this method alters linkOffsetXInPixels and linkOffsetYInPixels.
     * @param overlapGroup the overlap group which will be processed or undefined to process all overlap groups
     * @param deltaStep the step size (speed) to reach the target non overlapping position (default 0.1)
     * @param repelFactor how much is the control repelled by other controls
     */
    moveToNonOverlappedPosition(overlapGroup, deltaStep = 1, repelFactor = 1) {
        let controlsForGroup;
        if (Array.isArray(overlapGroup)) {
            controlsForGroup = overlapGroup;
        }
        else {
            const descendants = this.getDescendants(true);
            // get only the controls with an overlapGroup property set
            // if the overlapGroup parameter is set, filter the controls and get only the controls belonging to that overlapGroup
            controlsForGroup = overlapGroup === undefined ? descendants.filter((c) => c.overlapGroup !== undefined) : descendants.filter((c) => c.overlapGroup === overlapGroup);
        }
        controlsForGroup.forEach((control1) => {
            let velocity = Vector2.Zero();
            const center = new Vector2(control1.centerX, control1.centerY);
            controlsForGroup.forEach((control2) => {
                if (control1 !== control2 && AdvancedDynamicTexture._Overlaps(control1, control2)) {
                    // if the two controls overlaps get a direction vector from one control's center to another control's center
                    const diff = center.subtract(new Vector2(control2.centerX, control2.centerY));
                    const diffLength = diff.length();
                    if (diffLength > 0) {
                        // calculate the velocity
                        velocity = velocity.add(diff.normalize().scale(repelFactor / diffLength));
                    }
                }
            });
            if (velocity.length() > 0) {
                // move the control along the direction vector away from the overlapping control
                velocity = velocity.normalize().scale(deltaStep * (control1.overlapDeltaMultiplier ?? 1));
                control1.linkOffsetXInPixels += velocity.x;
                control1.linkOffsetYInPixels += velocity.y;
            }
        });
    }
    /**
     * Release all resources
     */
    dispose() {
        const scene = this.getScene();
        if (!scene) {
            return;
        }
        this._rootElement = null;
        scene.onBeforeCameraRenderObservable.remove(this._renderObserver);
        if (this._resizeObserver) {
            scene.getEngine().onResizeObservable.remove(this._resizeObserver);
        }
        if (this._prePointerObserver) {
            scene.onPrePointerObservable.remove(this._prePointerObserver);
        }
        if (this._sceneRenderObserver) {
            scene.onBeforeRenderObservable.remove(this._sceneRenderObserver);
        }
        if (this._pointerObserver) {
            scene.onPointerObservable.remove(this._pointerObserver);
        }
        if (this._preKeyboardObserver) {
            scene.onPreKeyboardObservable.remove(this._preKeyboardObserver);
        }
        if (this._canvasPointerOutObserver) {
            scene.getEngine().onCanvasPointerOutObservable.remove(this._canvasPointerOutObserver);
        }
        if (this._canvasBlurObserver) {
            scene.getEngine().onCanvasBlurObservable.remove(this._canvasBlurObserver);
        }
        if (this._controlAddedObserver) {
            this._rootContainer.onControlAddedObservable.remove(this._controlAddedObserver);
        }
        if (this._controlRemovedObserver) {
            this._rootContainer.onControlRemovedObservable.remove(this._controlRemovedObserver);
        }
        if (this._layerToDispose) {
            this._layerToDispose.texture = null;
            this._layerToDispose.dispose();
            this._layerToDispose = null;
        }
        this._rootContainer.dispose();
        this.onClipboardObservable.clear();
        this.onControlPickedObservable.clear();
        this.onBeginRenderObservable.clear();
        this.onEndRenderObservable.clear();
        this.onBeginLayoutObservable.clear();
        this.onEndLayoutObservable.clear();
        this.onGuiReadyObservable.clear();
        super.dispose();
    }
    _onResize() {
        const scene = this.getScene();
        if (!scene) {
            return;
        }
        // Check size
        const engine = scene.getEngine();
        const textureSize = this.getSize();
        let renderWidth = engine.getRenderWidth() * this._renderScale;
        let renderHeight = engine.getRenderHeight() * this._renderScale;
        if (this._renderAtIdealSize) {
            if (this._idealWidth) {
                renderHeight = (renderHeight * this._idealWidth) / renderWidth;
                renderWidth = this._idealWidth;
            }
            else if (this._idealHeight) {
                renderWidth = (renderWidth * this._idealHeight) / renderHeight;
                renderHeight = this._idealHeight;
            }
        }
        if (textureSize.width !== renderWidth || textureSize.height !== renderHeight) {
            this.scaleTo(renderWidth, renderHeight);
            this.markAsDirty();
            if (this._idealWidth || this._idealHeight) {
                this._rootContainer._markAllAsDirty();
            }
        }
        this.invalidateRect(0, 0, textureSize.width - 1, textureSize.height - 1);
    }
    /** @internal */
    _getGlobalViewport() {
        const size = this.getSize();
        const globalViewPort = this._fullscreenViewport.toGlobal(size.width, size.height);
        const targetX = Math.round(globalViewPort.width * (1 / this.rootContainer.scaleX));
        const targetY = Math.round(globalViewPort.height * (1 / this.rootContainer.scaleY));
        globalViewPort.x += (globalViewPort.width - targetX) / 2;
        globalViewPort.y += (globalViewPort.height - targetY) / 2;
        globalViewPort.width = targetX;
        globalViewPort.height = targetY;
        return globalViewPort;
    }
    /**
     * Get screen coordinates for a vector3
     * @param position defines the position to project
     * @param worldMatrix defines the world matrix to use
     * @returns the projected position
     */
    getProjectedPosition(position, worldMatrix) {
        const result = this.getProjectedPositionWithZ(position, worldMatrix);
        return new Vector2(result.x, result.y);
    }
    /**
     * Get screen coordinates for a vector3
     * @param position defines the position to project
     * @param worldMatrix defines the world matrix to use
     * @returns the projected position with Z
     */
    getProjectedPositionWithZ(position, worldMatrix) {
        const scene = this.getScene();
        if (!scene) {
            return Vector3.Zero();
        }
        const globalViewport = this._getGlobalViewport();
        const projectedPosition = Vector3.Project(position, worldMatrix, scene.getTransformMatrix(), globalViewport);
        return new Vector3(projectedPosition.x, projectedPosition.y, projectedPosition.z);
    }
    /** @internal */
    _checkUpdate(camera, skipUpdate) {
        if (this._layerToDispose && camera) {
            if ((camera.layerMask & this._layerToDispose.layerMask) === 0) {
                return;
            }
        }
        if (this._isFullscreen && this._linkedControls.length) {
            const scene = this.getScene();
            if (!scene) {
                return;
            }
            const globalViewport = this._getGlobalViewport();
            for (const control of this._linkedControls) {
                if (!control.isVisible) {
                    continue;
                }
                const mesh = control._linkedMesh;
                if (!mesh || mesh.isDisposed()) {
                    Tools.SetImmediate(() => {
                        control.linkWithMesh(null);
                    });
                    continue;
                }
                const position = mesh.getBoundingInfo ? mesh.getBoundingInfo().boundingSphere.center : Vector3.ZeroReadOnly;
                const projectedPosition = Vector3.Project(position, mesh.getWorldMatrix(), scene.getTransformMatrix(), globalViewport);
                if (projectedPosition.z < 0 || projectedPosition.z > 1) {
                    control.notRenderable = true;
                    continue;
                }
                control.notRenderable = false;
                if (this.useInvalidateRectOptimization) {
                    control.invalidateRect();
                }
                control._moveToProjectedPosition(projectedPosition);
            }
        }
        if (!this._isDirty && !this._rootContainer.isDirty) {
            return;
        }
        this._isDirty = false;
        this._render(skipUpdate);
        if (!skipUpdate) {
            this.update(this.applyYInversionOnUpdate, this.premulAlpha, AdvancedDynamicTexture.AllowGPUOptimizations);
        }
    }
    _render(skipRender) {
        const textureSize = this.getSize();
        const renderWidth = textureSize.width;
        const renderHeight = textureSize.height;
        const context = this.getContext();
        context.font = "18px Arial";
        context.strokeStyle = "white";
        if (this.onGuiReadyObservable.hasObservers()) {
            this._checkGuiIsReady();
        }
        /** We have to recheck the camera projection in the case the root control's children have changed  */
        if (this._rootChildrenHaveChanged) {
            const camera = this.getScene()?.activeCamera;
            if (camera) {
                this._rootChildrenHaveChanged = false;
                this._checkUpdate(camera, true);
            }
        }
        // Layout
        this.onBeginLayoutObservable.notifyObservers(this);
        const measure = new Measure(0, 0, renderWidth, renderHeight);
        this._numLayoutCalls = 0;
        this._rootContainer._layout(measure, context);
        this.onEndLayoutObservable.notifyObservers(this);
        this._isDirty = false; // Restoring the dirty state that could have been set by controls during layout processing
        if (skipRender) {
            return;
        }
        // Clear
        if (this._invalidatedRectangle) {
            this._clearMeasure.copyFrom(this._invalidatedRectangle);
        }
        else {
            this._clearMeasure.copyFromFloats(0, 0, renderWidth, renderHeight);
        }
        context.clearRect(this._clearMeasure.left, this._clearMeasure.top, this._clearMeasure.width, this._clearMeasure.height);
        if (this._background) {
            context.save();
            context.fillStyle = this._background;
            context.fillRect(this._clearMeasure.left, this._clearMeasure.top, this._clearMeasure.width, this._clearMeasure.height);
            context.restore();
        }
        // Render
        this.onBeginRenderObservable.notifyObservers(this);
        this._numRenderCalls = 0;
        this._rootContainer._render(context, this._invalidatedRectangle);
        this.onEndRenderObservable.notifyObservers(this);
        this._invalidatedRectangle = null;
    }
    /**
     * @internal
     */
    _changeCursor(cursor) {
        if (this._rootElement) {
            this._rootElement.style.cursor = cursor;
            this._cursorChanged = true;
        }
    }
    /**
     * @internal
     */
    _registerLastControlDown(control, pointerId) {
        this._lastControlDown[pointerId] = control;
        this.onControlPickedObservable.notifyObservers(control);
    }
    _doPicking(x, y, pi, type, pointerId, buttonIndex, deltaX, deltaY) {
        const scene = this.getScene();
        if (!scene || this.disablePicking) {
            return;
        }
        const engine = scene.getEngine();
        const textureSize = this.getSize();
        if (this._isFullscreen) {
            const camera = scene.cameraToUseForPointers || scene.activeCamera;
            if (!camera) {
                return;
            }
            const viewport = camera.viewport;
            x = x * (textureSize.width / (engine.getRenderWidth() * viewport.width));
            y = y * (textureSize.height / (engine.getRenderHeight() * viewport.height));
        }
        if (this._capturingControl[pointerId]) {
            if (this._capturingControl[pointerId].isPointerBlocker) {
                this._shouldBlockPointer = true;
            }
            this._capturingControl[pointerId]._processObservables(type, x, y, pi, pointerId, buttonIndex);
            return;
        }
        this._cursorChanged = false;
        if (!this._rootContainer._processPicking(x, y, pi, type, pointerId, buttonIndex, deltaX, deltaY)) {
            if (!scene.doNotHandleCursors) {
                this._changeCursor("");
            }
            if (type === PointerEventTypes.POINTERMOVE) {
                if (this._lastControlOver[pointerId]) {
                    this._lastControlOver[pointerId]._onPointerOut(this._lastControlOver[pointerId], pi);
                    delete this._lastControlOver[pointerId];
                }
            }
        }
        if (!this._cursorChanged && !scene.doNotHandleCursors) {
            this._changeCursor("");
        }
        this._manageFocus();
    }
    /**
     * @internal
     */
    _cleanControlAfterRemovalFromList(list, control) {
        for (const pointerId in list) {
            if (!Object.prototype.hasOwnProperty.call(list, pointerId)) {
                continue;
            }
            const lastControlOver = list[pointerId];
            if (lastControlOver === control) {
                delete list[pointerId];
            }
        }
    }
    /**
     * @internal
     */
    _cleanControlAfterRemoval(control) {
        this._cleanControlAfterRemovalFromList(this._lastControlDown, control);
        this._cleanControlAfterRemovalFromList(this._lastControlOver, control);
    }
    /**
     * This function will run a pointer event on this ADT and will trigger any pointer events on any controls
     * This will work on a fullscreen ADT only. For mesh based ADT, simulate pointer events using the scene directly.
     * @param x pointer X on the canvas for the picking
     * @param y pointer Y on the canvas for the picking
     * @param pi optional pointer information
     */
    pick(x, y, pi = null) {
        if (this._isFullscreen && this._scene) {
            this._translateToPicking(this._scene, new Viewport(0, 0, 0, 0), pi, x, y);
        }
    }
    _translateToPicking(scene, tempViewport, pi, x = scene.pointerX, y = scene.pointerY) {
        const camera = scene.cameraToUseForPointers || scene.activeCamera;
        const engine = scene.getEngine();
        const originalCameraToUseForPointers = scene.cameraToUseForPointers;
        if (!camera) {
            tempViewport.x = 0;
            tempViewport.y = 0;
            tempViewport.width = engine.getRenderWidth();
            tempViewport.height = engine.getRenderHeight();
        }
        else {
            if (camera.rigCameras.length) {
                // rig camera - we need to find the camera to use for this event
                const rigViewport = new Viewport(0, 0, 1, 1);
                camera.rigCameras.forEach((rigCamera) => {
                    // generate the viewport of this camera
                    rigCamera.viewport.toGlobalToRef(engine.getRenderWidth(), engine.getRenderHeight(), rigViewport);
                    const transformedX = x / engine.getHardwareScalingLevel() - rigViewport.x;
                    const transformedY = y / engine.getHardwareScalingLevel() - (engine.getRenderHeight() - rigViewport.y - rigViewport.height);
                    // check if the pointer is in the camera's viewport
                    if (transformedX < 0 || transformedY < 0 || x > rigViewport.width || y > rigViewport.height) {
                        // out of viewport - don't use this camera
                        return;
                    }
                    // set the camera to use for pointers until this pointer loop is over
                    scene.cameraToUseForPointers = rigCamera;
                    // set the viewport
                    tempViewport.x = rigViewport.x;
                    tempViewport.y = rigViewport.y;
                    tempViewport.width = rigViewport.width;
                    tempViewport.height = rigViewport.height;
                });
            }
            else {
                camera.viewport.toGlobalToRef(engine.getRenderWidth(), engine.getRenderHeight(), tempViewport);
            }
        }
        const transformedX = x / engine.getHardwareScalingLevel() - tempViewport.x;
        const transformedY = y / engine.getHardwareScalingLevel() - (engine.getRenderHeight() - tempViewport.y - tempViewport.height);
        this._shouldBlockPointer = false;
        // Do picking modifies _shouldBlockPointer
        if (pi) {
            const pointerId = pi.event.pointerId || this._defaultMousePointerId;
            this._doPicking(transformedX, transformedY, pi, pi.type, pointerId, pi.event.button, pi.event.deltaX, pi.event.deltaY);
            // Avoid overwriting a true skipOnPointerObservable to false
            if ((this._shouldBlockPointer && !(pi.type & this.skipBlockEvents)) || this._capturingControl[pointerId]) {
                pi.skipOnPointerObservable = true;
            }
        }
        else {
            this._doPicking(transformedX, transformedY, null, PointerEventTypes.POINTERMOVE, this._defaultMousePointerId, 0);
        }
        // if overridden by a rig camera - reset back to the original value
        scene.cameraToUseForPointers = originalCameraToUseForPointers;
    }
    /** Attach to all scene events required to support pointer events */
    attach() {
        const scene = this.getScene();
        if (!scene) {
            return;
        }
        const tempViewport = new Viewport(0, 0, 0, 0);
        this._prePointerObserver = scene.onPrePointerObservable.add((pi) => {
            if (scene.isPointerCaptured(pi.event.pointerId) &&
                pi.type === PointerEventTypes.POINTERUP &&
                !this._capturedPointerIds.has(pi.event.pointerId)) {
                return;
            }
            if (pi.type !== PointerEventTypes.POINTERMOVE &&
                pi.type !== PointerEventTypes.POINTERUP &&
                pi.type !== PointerEventTypes.POINTERDOWN &&
                pi.type !== PointerEventTypes.POINTERWHEEL &&
                pi.type !== PointerEventTypes.POINTERTAP) {
                return;
            }
            if (pi.type === PointerEventTypes.POINTERMOVE) {
                // Avoid pointerMove events firing while the pointer is captured by the scene
                if (scene.isPointerCaptured(pi.event.pointerId)) {
                    return;
                }
                if (pi.event.pointerId) {
                    this._defaultMousePointerId = pi.event.pointerId; // This is required to make sure we have the correct pointer ID for wheel
                }
            }
            this._translateToPicking(scene, tempViewport, pi);
        });
        this._attachPickingToSceneRender(scene, () => this._translateToPicking(scene, tempViewport, null), false);
        this._attachToOnPointerOut(scene);
        this._attachToOnBlur(scene);
    }
    _focusNextElement(forward = true) {
        // generate the order of tab-able controls
        const sortedTabbableControls = [];
        this.executeOnAllControls((control) => {
            if (control.isFocusInvisible || !control.isVisible || control.tabIndex < 0) {
                return;
            }
            sortedTabbableControls.push(control);
        });
        // if no control is tab-able, return
        if (sortedTabbableControls.length === 0) {
            return;
        }
        sortedTabbableControls.sort((a, b) => {
            // if tabIndex is 0, put it in the end of the list, otherwise sort by tabIndex
            return a.tabIndex === 0 ? 1 : b.tabIndex === 0 ? -1 : a.tabIndex - b.tabIndex;
        });
        this._focusProperties.total = sortedTabbableControls.length;
        // if no control is focused, focus the first one
        let nextIndex = -1;
        if (!this._focusedControl) {
            nextIndex = forward ? 0 : sortedTabbableControls.length - 1;
        }
        else {
            const currentIndex = sortedTabbableControls.indexOf(this._focusedControl);
            nextIndex = currentIndex + (forward ? 1 : -1);
            if (nextIndex < 0) {
                nextIndex = sortedTabbableControls.length - 1;
            }
            else if (nextIndex >= sortedTabbableControls.length) {
                nextIndex = 0;
            }
        }
        sortedTabbableControls[nextIndex].focus();
        this._focusProperties.index = nextIndex;
    }
    /**
     * Register the clipboard Events onto the canvas
     */
    registerClipboardEvents() {
        self.addEventListener("copy", this._onClipboardCopy, false);
        self.addEventListener("cut", this._onClipboardCut, false);
        self.addEventListener("paste", this._onClipboardPaste, false);
    }
    /**
     * Unregister the clipboard Events from the canvas
     */
    unRegisterClipboardEvents() {
        self.removeEventListener("copy", this._onClipboardCopy);
        self.removeEventListener("cut", this._onClipboardCut);
        self.removeEventListener("paste", this._onClipboardPaste);
    }
    /**
     * Transform uvs from mesh space to texture space, taking the texture into account
     * @param uv the uvs in mesh space
     * @returns the uvs in texture space
     */
    _transformUvs(uv) {
        const textureMatrix = this.getTextureMatrix();
        let result;
        if (textureMatrix.isIdentityAs3x2()) {
            result = uv;
        }
        else {
            const homogeneousTextureMatrix = TmpVectors.Matrix[0];
            textureMatrix.getRowToRef(0, TmpVectors.Vector4[0]);
            textureMatrix.getRowToRef(1, TmpVectors.Vector4[1]);
            textureMatrix.getRowToRef(2, TmpVectors.Vector4[2]);
            const r0 = TmpVectors.Vector4[0];
            const r1 = TmpVectors.Vector4[1];
            const r2 = TmpVectors.Vector4[2];
            homogeneousTextureMatrix.setRowFromFloats(0, r0.x, r0.y, 0, 0);
            homogeneousTextureMatrix.setRowFromFloats(1, r1.x, r1.y, 0, 0);
            homogeneousTextureMatrix.setRowFromFloats(2, 0, 0, 1, 0);
            homogeneousTextureMatrix.setRowFromFloats(3, r2.x, r2.y, 0, 1);
            result = TmpVectors.Vector2[0];
            Vector2.TransformToRef(uv, homogeneousTextureMatrix, result);
        }
        // In wrap and mirror mode, the texture coordinate for coordinates more than 1 is the fractional part of the coordinate
        if (this.wrapU === Texture.WRAP_ADDRESSMODE || this.wrapU === Texture.MIRROR_ADDRESSMODE) {
            if (result.x > 1) {
                let fX = result.x - Math.trunc(result.x);
                // In mirror mode, the sign of the texture coordinate depends on the integer part -
                // odd integers means it is mirrored from the original coordinate
                if (this.wrapU === Texture.MIRROR_ADDRESSMODE && Math.trunc(result.x) % 2 === 1) {
                    fX = 1 - fX;
                }
                result.x = fX;
            }
        }
        if (this.wrapV === Texture.WRAP_ADDRESSMODE || this.wrapV === Texture.MIRROR_ADDRESSMODE) {
            if (result.y > 1) {
                let fY = result.y - Math.trunc(result.y);
                if (this.wrapV === Texture.MIRROR_ADDRESSMODE && Math.trunc(result.x) % 2 === 1) {
                    fY = 1 - fY;
                }
                result.y = fY;
            }
        }
        return result;
    }
    /**
     * Connect the texture to a hosting mesh to enable interactions
     * @param mesh defines the mesh to attach to
     * @param supportPointerMove defines a boolean indicating if pointer move events must be catched as well
     */
    attachToMesh(mesh, supportPointerMove = true) {
        const scene = this.getScene();
        if (!scene) {
            return;
        }
        if (this._pointerObserver) {
            scene.onPointerObservable.remove(this._pointerObserver);
        }
        this._pointerObserver = scene.onPointerObservable.add((pi) => {
            if (pi.type !== PointerEventTypes.POINTERMOVE &&
                pi.type !== PointerEventTypes.POINTERUP &&
                pi.type !== PointerEventTypes.POINTERDOWN &&
                pi.type !== PointerEventTypes.POINTERWHEEL) {
                return;
            }
            if (pi.type === PointerEventTypes.POINTERMOVE && pi.event.pointerId) {
                this._defaultMousePointerId = pi.event.pointerId; // This is required to make sure we have the correct pointer ID for wheel
            }
            const pointerId = pi.event.pointerId || this._defaultMousePointerId;
            if (pi.pickInfo && pi.pickInfo.hit && pi.pickInfo.pickedMesh === mesh) {
                let uv = pi.pickInfo.getTextureCoordinates();
                if (uv) {
                    uv = this._transformUvs(uv);
                    const size = this.getSize();
                    this._doPicking(uv.x * size.width, (this.applyYInversionOnUpdate ? 1.0 - uv.y : uv.y) * size.height, pi, pi.type, pointerId, pi.event.button, pi.event.deltaX, pi.event.deltaY);
                }
            }
            else if (pi.type === PointerEventTypes.POINTERUP) {
                if (this._lastControlDown[pointerId]) {
                    this._lastControlDown[pointerId]._forcePointerUp(pointerId);
                }
                delete this._lastControlDown[pointerId];
                if (this.focusedControl) {
                    const friendlyControls = this.focusedControl.keepsFocusWith();
                    let canMoveFocus = true;
                    if (friendlyControls) {
                        for (const control of friendlyControls) {
                            // Same host, no need to keep the focus
                            if (this === control._host) {
                                continue;
                            }
                            // Different hosts
                            const otherHost = control._host;
                            if (otherHost._lastControlOver[pointerId] && otherHost._lastControlOver[pointerId].isAscendant(control)) {
                                canMoveFocus = false;
                                break;
                            }
                        }
                    }
                    if (canMoveFocus) {
                        this.focusedControl = null;
                    }
                }
            }
            else if (pi.type === PointerEventTypes.POINTERMOVE) {
                if (this._lastControlOver[pointerId]) {
                    this._lastControlOver[pointerId]._onPointerOut(this._lastControlOver[pointerId], pi, true);
                }
                delete this._lastControlOver[pointerId];
            }
        });
        mesh.enablePointerMoveEvents = supportPointerMove;
        this._attachPickingToSceneRender(scene, () => {
            const pointerId = this._defaultMousePointerId;
            const pick = scene?.pick(scene.pointerX, scene.pointerY);
            if (pick && pick.hit && pick.pickedMesh === mesh) {
                let uv = pick.getTextureCoordinates();
                if (uv) {
                    uv = this._transformUvs(uv);
                    const size = this.getSize();
                    this._doPicking(uv.x * size.width, (this.applyYInversionOnUpdate ? 1.0 - uv.y : uv.y) * size.height, null, PointerEventTypes.POINTERMOVE, pointerId, 0);
                }
            }
            else {
                if (this._lastControlOver[pointerId]) {
                    this._lastControlOver[pointerId]._onPointerOut(this._lastControlOver[pointerId], null, true);
                }
                delete this._lastControlOver[pointerId];
            }
        }, true);
        this._attachToOnPointerOut(scene);
        this._attachToOnBlur(scene);
    }
    /**
     * Move the focus to a specific control
     * @param control defines the control which will receive the focus
     */
    moveFocusToControl(control) {
        this.focusedControl = control;
        this._lastPickedControl = control;
        this._blockNextFocusCheck = true;
    }
    _manageFocus() {
        if (this._blockNextFocusCheck) {
            this._blockNextFocusCheck = false;
            this._lastPickedControl = this._focusedControl;
            return;
        }
        // Focus management
        if (this._focusedControl) {
            if (this._focusedControl !== this._lastPickedControl) {
                if (this._lastPickedControl.isFocusInvisible) {
                    return;
                }
                this.focusedControl = null;
            }
        }
    }
    _attachPickingToSceneRender(scene, pickFunction, forcePicking) {
        this._sceneRenderObserver = scene.onBeforeRenderObservable.add(() => {
            if (!this.checkPointerEveryFrame) {
                return;
            }
            if (this._linkedControls.length > 0 || forcePicking) {
                pickFunction();
            }
        });
    }
    _attachToOnPointerOut(scene) {
        this._canvasPointerOutObserver = scene.getEngine().onCanvasPointerOutObservable.add((pointerEvent) => {
            if (this._lastControlOver[pointerEvent.pointerId]) {
                this._lastControlOver[pointerEvent.pointerId]._onPointerOut(this._lastControlOver[pointerEvent.pointerId], null);
            }
            delete this._lastControlOver[pointerEvent.pointerId];
            if (this._lastControlDown[pointerEvent.pointerId] && this._lastControlDown[pointerEvent.pointerId] !== this._capturingControl[pointerEvent.pointerId]) {
                this._lastControlDown[pointerEvent.pointerId]._forcePointerUp(pointerEvent.pointerId);
                delete this._lastControlDown[pointerEvent.pointerId];
            }
        });
    }
    _attachToOnBlur(scene) {
        this._canvasBlurObserver = scene.getEngine().onCanvasBlurObservable.add(() => {
            Object.entries(this._lastControlDown).forEach(([, value]) => {
                value._onCanvasBlur();
            });
            this.focusedControl = null;
            this._lastControlDown = {};
        });
    }
    /**
     * Serializes the entire GUI system
     * @returns an object with the JSON serialized data
     */
    serializeContent() {
        const size = this.getSize();
        const serializationObject = {
            root: {},
            width: size.width,
            height: size.height,
        };
        this._rootContainer.serialize(serializationObject.root);
        return serializationObject;
    }
    /**
     * Recreate the content of the ADT from a JSON object
     * @param serializedObject define the JSON serialized object to restore from
     * @param scaleToSize defines whether to scale to texture to the saved size
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     */
    parseSerializedObject(serializedObject, scaleToSize, urlRewriter) {
        this._rootContainer = Control.Parse(serializedObject.root, this, urlRewriter);
        if (scaleToSize) {
            const width = serializedObject.width;
            const height = serializedObject.height;
            if (typeof width === "number" && typeof height === "number" && width >= 0 && height >= 0) {
                this.scaleTo(width, height);
            }
            else {
                // scales the GUI to a default size if none was available in the serialized content
                this.scaleTo(1920, 1080);
            }
        }
    }
    /**
     * Clones the ADT. If no mesh is defined, the GUI will be considered as a fullscreen GUI
     * @param newName defines the name of the new ADT
     * @param attachToMesh defines if the new ADT should be attached to a mesh
     * @returns the clone of the ADT
     */
    clone(newName, attachToMesh) {
        const scene = this.getScene();
        if (!scene) {
            return this;
        }
        const size = this.getSize();
        const data = this.serializeContent();
        let clone;
        if (!this._isFullscreen) {
            if (attachToMesh) {
                clone = AdvancedDynamicTexture.CreateForMesh(attachToMesh, size.width, size.height);
            }
            else {
                clone = new AdvancedDynamicTexture(newName ?? "Clone of " + this.name, size.width, size.height, scene, !this.noMipmap, this.samplingMode);
            }
        }
        else {
            clone = AdvancedDynamicTexture.CreateFullscreenUI(newName ?? "Clone of " + this.name);
        }
        clone.parseSerializedObject(data);
        return clone;
    }
    /**
     * Recreate the content of the ADT from a snippet saved by the GUI editor
     * @param snippetId defines the snippet to load
     * @param scaleToSize defines whether to scale to texture to the saved size
     * @param appendToAdt if provided the snippet will be appended to the adt. Otherwise a fullscreen ADT will be created.
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @returns a promise that will resolve on success
     */
    static async ParseFromSnippetAsync(snippetId, scaleToSize, appendToAdt, urlRewriter) {
        const adt = appendToAdt ?? AdvancedDynamicTexture.CreateFullscreenUI("ADT from snippet");
        if (snippetId === "_BLANK") {
            return adt;
        }
        const serialized = await AdvancedDynamicTexture._LoadURLContentAsync(AdvancedDynamicTexture.SnippetUrl + "/" + snippetId.replace(/#/g, "/"), true);
        adt.parseSerializedObject(serialized, scaleToSize, urlRewriter);
        return adt;
    }
    /**
     * Recreate the content of the ADT from a snippet saved by the GUI editor
     * @param snippetId defines the snippet to load
     * @param scaleToSize defines whether to scale to texture to the saved size
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @returns a promise that will resolve on success
     */
    parseFromSnippetAsync(snippetId, scaleToSize, urlRewriter) {
        return AdvancedDynamicTexture.ParseFromSnippetAsync(snippetId, scaleToSize, this, urlRewriter);
    }
    /**
     * Recreate the content of the ADT from a url json
     * @param url defines the url to load
     * @param scaleToSize defines whether to scale to texture to the saved size
     * @param appendToAdt if provided the snippet will be appended to the adt. Otherwise a fullscreen ADT will be created.
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @returns a promise that will resolve on success
     */
    static async ParseFromFileAsync(url, scaleToSize, appendToAdt, urlRewriter) {
        const adt = appendToAdt ?? AdvancedDynamicTexture.CreateFullscreenUI("ADT from URL");
        const serialized = await AdvancedDynamicTexture._LoadURLContentAsync(url);
        adt.parseSerializedObject(serialized, scaleToSize, urlRewriter);
        return adt;
    }
    /**
     * Recreate the content of the ADT from a url json
     * @param url defines the url to load
     * @param scaleToSize defines whether to scale to texture to the saved size
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @returns a promise that will resolve on success
     */
    parseFromURLAsync(url, scaleToSize, urlRewriter) {
        return AdvancedDynamicTexture.ParseFromFileAsync(url, scaleToSize, this, urlRewriter);
    }
    static _LoadURLContentAsync(url, snippet = false) {
        if (url === "") {
            return Promise.reject("No URL provided");
        }
        return new Promise((resolve, reject) => {
            const request = new WebRequest();
            request.addEventListener("readystatechange", () => {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        let gui;
                        if (snippet) {
                            const payload = JSON.parse(JSON.parse(request.responseText).jsonPayload);
                            gui = payload.encodedGui ? new TextDecoder("utf-8").decode(DecodeBase64ToBinary(payload.encodedGui)) : payload.gui;
                        }
                        else {
                            gui = request.responseText;
                        }
                        const serializationObject = JSON.parse(gui);
                        resolve(serializationObject);
                    }
                    else {
                        reject("Unable to load");
                    }
                }
            });
            request.open("GET", url);
            request.send();
        });
    }
    // Statics
    /**
     * Compares two rectangle based controls for pixel overlap
     * @param control1 The first control to compare
     * @param control2 The second control to compare
     * @returns true if overlaps, otherwise false
     */
    static _Overlaps(control1, control2) {
        return !(control1.centerX > control2.centerX + control2.widthInPixels ||
            control1.centerX + control1.widthInPixels < control2.centerX ||
            control1.centerY + control1.heightInPixels < control2.centerY ||
            control1.centerY > control2.centerY + control2.heightInPixels);
    }
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
    static CreateForMesh(mesh, width = 1024, height = 1024, supportPointerMove = true, onlyAlphaTesting = false, invertY, materialSetupCallback = this._CreateMaterial, sampling = Texture.TRILINEAR_SAMPLINGMODE) {
        // use a unique ID in name so serialization will work even if you create two ADTs for a single mesh
        const uniqueId = RandomGUID();
        const result = new AdvancedDynamicTexture(`AdvancedDynamicTexture for ${mesh.name} [${uniqueId}]`, width, height, mesh.getScene(), true, sampling, invertY);
        materialSetupCallback(mesh, uniqueId, result, onlyAlphaTesting);
        result.attachToMesh(mesh, supportPointerMove);
        return result;
    }
    static _CreateMaterial(mesh, uniqueId, texture, onlyAlphaTesting) {
        const internalClassType = GetClass("BABYLON.StandardMaterial");
        if (!internalClassType) {
            // eslint-disable-next-line no-throw-literal
            throw "StandardMaterial needs to be imported before as it contains a side-effect required by your code.";
        }
        const material = new internalClassType(`AdvancedDynamicTextureMaterial for ${mesh.name} [${uniqueId}]`, mesh.getScene());
        material.backFaceCulling = false;
        material.diffuseColor = Color3.Black();
        material.specularColor = Color3.Black();
        if (onlyAlphaTesting) {
            material.diffuseTexture = texture;
            material.emissiveTexture = texture;
            texture.hasAlpha = true;
        }
        else {
            material.emissiveTexture = texture;
            material.opacityTexture = texture;
        }
        mesh.material = material;
    }
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
    static CreateForMeshTexture(mesh, width = 1024, height = 1024, supportPointerMove = true, invertY, sampling = Texture.TRILINEAR_SAMPLINGMODE) {
        const result = new AdvancedDynamicTexture(mesh.name + " AdvancedDynamicTexture", width, height, mesh.getScene(), true, sampling, invertY);
        result.attachToMesh(mesh, supportPointerMove);
        return result;
    }
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
    static CreateFullscreenUI(name, foreground = true, sceneOrOptions = null, sampling = Texture.BILINEAR_SAMPLINGMODE, adaptiveScaling = false) {
        const isScene = !sceneOrOptions || sceneOrOptions._isScene;
        const result = isScene
            ? new AdvancedDynamicTexture(name, 0, 0, sceneOrOptions, false, sampling)
            : new AdvancedDynamicTexture(name, sceneOrOptions);
        // Display
        const resultScene = result.getScene();
        const layer = new Layer(name + "_layer", null, resultScene, !foreground);
        layer.texture = result;
        result._layerToDispose = layer;
        result._isFullscreen = true;
        if (result.useStandalone) {
            // Make sure the layer is not rendered by the layer component!
            layer.layerMask = 0;
        }
        if (adaptiveScaling && resultScene) {
            const newScale = 1 / resultScene.getEngine().getHardwareScalingLevel();
            result._rootContainer.scaleX = newScale;
            result._rootContainer.scaleY = newScale;
        }
        // Attach
        result.attach();
        return result;
    }
    /**
     * Scales the texture
     * @param ratio the scale factor to apply to both width and height
     */
    scale(ratio) {
        super.scale(ratio);
        this.markAsDirty();
    }
    /**
     * Resizes the texture
     * @param width the new width
     * @param height the new height
     */
    scaleTo(width, height) {
        super.scaleTo(width, height);
        this.markAsDirty();
    }
    _checkGuiIsReady() {
        if (this.guiIsReady()) {
            this.onGuiReadyObservable.notifyObservers(this);
            this.onGuiReadyObservable.clear();
        }
    }
    /**
     * @returns true if all the GUI components are ready to render
     */
    guiIsReady() {
        return this._rootContainer.isReady();
    }
}
/** Define the url to load snippets */
AdvancedDynamicTexture.SnippetUrl = Constants.SnippetUrl;
/** Indicates if some optimizations can be performed in GUI GPU management (the downside is additional memory/GPU texture memory used) */
AdvancedDynamicTexture.AllowGPUOptimizations = true;
//# sourceMappingURL=advancedDynamicTexture.js.map