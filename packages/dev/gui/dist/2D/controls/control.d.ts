import type { Nullable } from "core/types";
import { Observable } from "core/Misc/observable";
import { Vector2, Vector3 } from "core/Maths/math.vector";
import type { PointerInfoBase } from "core/Events/pointerEvents";
import type { TransformNode } from "core/Meshes/transformNode";
import type { Scene } from "core/scene";
import type { Container } from "./container";
import type { AdvancedDynamicTexture } from "../advancedDynamicTexture";
import { ValueAndUnit } from "../valueAndUnit";
import { Measure } from "../measure";
import type { Style } from "../style";
import { Matrix2D, Vector2WithInfo } from "../math2D";
import type { ICanvasGradient, ICanvasRenderingContext } from "core/Engines/ICanvas";
import type { IAccessibilityTag } from "core/IAccessibilityTag";
import type { IKeyboardEvent } from "core/Events/deviceInputEvents";
import type { IAnimatable } from "core/Animations/animatable.interface";
import type { Animation } from "core/Animations/animation";
import type { BaseGradient } from "./gradient/BaseGradient";
import type { AbstractEngine } from "core/Engines/abstractEngine";
import type { IFocusableControl } from "./focusableControl";
/**
 * Root class used for all 2D controls
 * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#controls
 */
export declare class Control implements IAnimatable, IFocusableControl {
    /** defines the name of the control */
    name?: string | undefined;
    /**
     * Gets or sets a boolean indicating if alpha must be an inherited value (false by default)
     */
    static AllowAlphaInheritance: boolean;
    private _alpha;
    private _alphaSet;
    private _zIndex;
    /** @internal */
    _host: AdvancedDynamicTexture;
    /** Gets or sets the control parent */
    parent: Nullable<Container>;
    /** @internal */
    _currentMeasure: Measure;
    /** @internal */
    _tempPaddingMeasure: Measure;
    private _fontFamily;
    private _fontStyle;
    private _fontWeight;
    private _fontSize;
    private _font;
    /** @internal */
    _width: ValueAndUnit;
    /** @internal */
    _height: ValueAndUnit;
    /** @internal */
    protected _fontOffset: {
        ascent: number;
        height: number;
        descent: number;
    };
    private _color;
    private _style;
    private _styleObserver;
    /** @internal */
    protected _horizontalAlignment: number;
    /** @internal */
    protected _verticalAlignment: number;
    /** @internal */
    protected _isDirty: boolean;
    /** @internal */
    protected _wasDirty: boolean;
    /** @internal */
    _tempParentMeasure: Measure;
    /** @internal */
    _prevCurrentMeasureTransformedIntoGlobalSpace: Measure;
    /** @internal */
    _cachedParentMeasure: Measure;
    private _descendantsOnlyPadding;
    private _paddingLeft;
    private _paddingRight;
    private _paddingTop;
    private _paddingBottom;
    /** @internal */
    _left: ValueAndUnit;
    /** @internal */
    _top: ValueAndUnit;
    private _scaleX;
    private _scaleY;
    private _rotation;
    private _transformCenterX;
    private _transformCenterY;
    /** @internal */
    _transformMatrix: Matrix2D;
    /** @internal */
    protected _invertTransformMatrix: Matrix2D;
    /** @internal */
    protected _transformedPosition: Vector2;
    private _isMatrixDirty;
    private _cachedOffsetX;
    private _cachedOffsetY;
    private _isVisible;
    private _isHighlighted;
    private _highlightColor;
    protected _highlightLineWidth: number;
    /** @internal */
    _linkedMesh: Nullable<TransformNode>;
    private _fontSet;
    private _dummyVector2;
    private _downCount;
    private _enterCount;
    private _doNotRender;
    private _downPointerIds;
    private _evaluatedMeasure;
    private _evaluatedParentMeasure;
    protected _isEnabled: boolean;
    protected _disabledColor: string;
    protected _disabledColorItem: string;
    protected _isReadOnly: boolean;
    private _gradient;
    /** @internal */
    protected _rebuildLayout: boolean;
    /** @internal */
    protected _urlRewriter?: (url: string) => string;
    /**
     * Observable that fires when the control's enabled state changes
     */
    onEnabledStateChangedObservable: Observable<boolean>;
    /** @internal */
    _customData: any;
    /** @internal */
    _isClipped: boolean;
    /** @internal */
    _automaticSize: boolean;
    /** @internal */
    _tag: any;
    /**
     * Gets or sets the unique id of the node. Please note that this number will be updated when the control is added to a container
     */
    uniqueId: number;
    /**
     * Gets or sets a boolean indicating if the control is readonly (default: false).
     * A readonly control will still raise pointer events but will not react to them
     */
    get isReadOnly(): boolean;
    set isReadOnly(value: boolean);
    /**
     * Gets the transformed measure, that is the bounding box of the control after applying all transformations
     */
    get transformedMeasure(): Measure;
    /**
     * Gets or sets an object used to store user defined information for the node
     */
    metadata: any;
    /** Gets or sets a boolean indicating if the control can be hit with pointer events */
    isHitTestVisible: boolean;
    /** Gets or sets a boolean indicating if the control can block pointer events. False by default except on the following controls:
     * * Button controls (Button, RadioButton, ToggleButton)
     * * Checkbox
     * * ColorPicker
     * * InputText
     * * Slider
     */
    isPointerBlocker: boolean;
    /** Gets or sets a boolean indicating if the control can be focusable */
    isFocusInvisible: boolean;
    protected _clipChildren: boolean;
    /**
     * Sets/Gets a boolean indicating if the children are clipped to the current control bounds.
     * Please note that not clipping children may generate issues with adt.useInvalidateRectOptimization so it is recommended to turn this optimization off if you want to use unclipped children
     */
    set clipChildren(value: boolean);
    get clipChildren(): boolean;
    protected _clipContent: boolean;
    /**
     * Sets/Gets a boolean indicating that control content must be clipped
     * Please note that not clipping content may generate issues with adt.useInvalidateRectOptimization so it is recommended to turn this optimization off if you want to use unclipped children
     */
    set clipContent(value: boolean);
    get clipContent(): boolean;
    /**
     * Gets or sets a boolean indicating that the current control should cache its rendering (useful when the control does not change often)
     */
    useBitmapCache: boolean;
    private _cacheData;
    private _shadowOffsetX;
    /** Gets or sets a value indicating the offset to apply on X axis to render the shadow */
    get shadowOffsetX(): number;
    set shadowOffsetX(value: number);
    private _shadowOffsetY;
    /** Gets or sets a value indicating the offset to apply on Y axis to render the shadow */
    get shadowOffsetY(): number;
    set shadowOffsetY(value: number);
    private _shadowBlur;
    private _previousShadowBlur;
    /** Gets or sets a value indicating the amount of blur to use to render the shadow */
    get shadowBlur(): number;
    set shadowBlur(value: number);
    private _shadowColor;
    /** Gets or sets a value indicating the color of the shadow (black by default ie. "#000") */
    get shadowColor(): string;
    set shadowColor(value: string);
    /** Gets or sets the cursor to use when the control is hovered */
    hoverCursor: string;
    /** @internal */
    protected _linkOffsetX: ValueAndUnit;
    /** @internal */
    protected _linkOffsetY: ValueAndUnit;
    /** Gets the control type name */
    get typeName(): string;
    /**
     * Get the current class name of the control.
     * @returns current class name
     */
    getClassName(): string;
    /**
     * Gets or sets the accessibility tag to describe the control for accessibility purpose.
     * By default, GUI controls already indicate accessibility info, but one can override the info using this tag.
     */
    set accessibilityTag(value: Nullable<IAccessibilityTag>);
    get accessibilityTag(): Nullable<IAccessibilityTag>;
    protected _accessibilityTag: Nullable<IAccessibilityTag>;
    /**
     * Observable that fires whenever the accessibility event of the control has changed
     */
    onAccessibilityTagChangedObservable: Observable<Nullable<IAccessibilityTag>>;
    /**
     * An event triggered when pointer wheel is scrolled
     */
    onWheelObservable: Observable<Vector2>;
    /**
     * An event triggered when the pointer moves over the control.
     */
    onPointerMoveObservable: Observable<Vector2>;
    /**
     * An event triggered when the pointer moves out of the control.
     */
    onPointerOutObservable: Observable<Control>;
    /**
     * An event triggered when the pointer taps the control
     */
    onPointerDownObservable: Observable<Vector2WithInfo>;
    /**
     * An event triggered when pointer up
     */
    onPointerUpObservable: Observable<Vector2WithInfo>;
    /**
     * An event triggered when a control is clicked on
     */
    onPointerClickObservable: Observable<Vector2WithInfo>;
    /**
     * An event triggered when a control receives an ENTER key down event
     */
    onEnterPressedObservable: Observable<Control>;
    /**
     * An event triggered when pointer enters the control
     */
    onPointerEnterObservable: Observable<Control>;
    /**
     * An event triggered when the control is marked as dirty
     */
    onDirtyObservable: Observable<Control>;
    /**
     * An event triggered before drawing the control
     */
    onBeforeDrawObservable: Observable<Control>;
    /**
     * An event triggered after the control was drawn
     */
    onAfterDrawObservable: Observable<Control>;
    /**
     * An event triggered when the control has been disposed
     */
    onDisposeObservable: Observable<Control>;
    /**
     * An event triggered when the control isVisible is changed
     */
    onIsVisibleChangedObservable: Observable<boolean>;
    /**
     * Get the hosting AdvancedDynamicTexture
     */
    get host(): AdvancedDynamicTexture;
    /** Gets or set information about font offsets (used to render and align text) */
    get fontOffset(): {
        ascent: number;
        height: number;
        descent: number;
    };
    set fontOffset(offset: {
        ascent: number;
        height: number;
        descent: number;
    });
    /** Gets or sets alpha value for the control (1 means opaque and 0 means entirely transparent) */
    get alpha(): number;
    set alpha(value: number);
    /**
     * Gets or sets a number indicating size of stroke we want to highlight the control with (mostly for debugging purpose)
     */
    get highlightLineWidth(): number;
    set highlightLineWidth(value: number);
    /**
     * Gets or sets a boolean indicating that we want to highlight the control (mostly for debugging purpose)
     */
    get isHighlighted(): boolean;
    set isHighlighted(value: boolean);
    /**
     * Indicates if the control should be serialized. Defaults to true.
     */
    isSerializable: boolean;
    /**
     * Gets or sets a string defining the color to use for highlighting this control
     */
    get highlightColor(): string;
    set highlightColor(value: string);
    /** Gets or sets a value indicating the scale factor on X axis (1 by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
     */
    get scaleX(): number;
    set scaleX(value: number);
    /** Gets or sets a value indicating the scale factor on Y axis (1 by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
     */
    get scaleY(): number;
    set scaleY(value: number);
    /** Gets or sets the rotation angle (0 by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
     */
    get rotation(): number;
    set rotation(value: number);
    /** Gets or sets the transformation center on Y axis (0 by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
     */
    get transformCenterY(): number;
    set transformCenterY(value: number);
    /** Gets or sets the transformation center on X axis (0 by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
     */
    get transformCenterX(): number;
    set transformCenterX(value: number);
    /**
     * Gets or sets the horizontal alignment
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#alignments
     */
    get horizontalAlignment(): number;
    set horizontalAlignment(value: number);
    /**
     * Gets or sets the vertical alignment
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#alignments
     */
    get verticalAlignment(): number;
    set verticalAlignment(value: number);
    private _fixedRatio;
    set fixedRatio(value: number);
    /**
     * Gets or sets a fixed ratio for this control.
     * When different from 0, the ratio is used to compute the "second" dimension.
     * The first dimension used in the computation is the last one set (by setting width / widthInPixels or height / heightInPixels), and the
     * second dimension is computed as first dimension * fixedRatio
     */
    get fixedRatio(): number;
    private _fixedRatioMasterIsWidth;
    set fixedRatioMasterIsWidth(value: boolean);
    /**
     * Gets or sets a boolean indicating that the fixed ratio is set on the width instead of the height. True by default.
     * When the height of a control is set, this property is changed to false.
     */
    get fixedRatioMasterIsWidth(): boolean;
    /**
     * Gets or sets control width
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get width(): string | number;
    set width(value: string | number);
    /**
     * Gets or sets the control width in pixel
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get widthInPixels(): number;
    set widthInPixels(value: number);
    /**
     * Gets or sets control height
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get height(): string | number;
    set height(value: string | number);
    /**
     * Gets or sets control height in pixel
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get heightInPixels(): number;
    set heightInPixels(value: number);
    /** Gets or set font family */
    get fontFamily(): string;
    set fontFamily(value: string);
    /** Gets or sets font style */
    get fontStyle(): string;
    set fontStyle(value: string);
    /** Gets or sets font weight */
    get fontWeight(): string;
    set fontWeight(value: string);
    /**
     * Gets or sets style
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#styles
     */
    get style(): Nullable<Style>;
    set style(value: Nullable<Style>);
    /** @internal */
    get _isFontSizeInPercentage(): boolean;
    /** Gets or sets font size in pixels */
    get fontSizeInPixels(): number;
    set fontSizeInPixels(value: number);
    /** Gets or sets font size */
    get fontSize(): string | number;
    set fontSize(value: string | number);
    /** Gets or sets foreground color */
    get color(): string;
    set color(value: string);
    /** Gets or sets gradient. Setting a gradient will override the color */
    get gradient(): Nullable<BaseGradient>;
    set gradient(value: Nullable<BaseGradient>);
    /** Gets or sets z index which is used to reorder controls on the z axis */
    get zIndex(): number;
    set zIndex(value: number);
    /** Gets or sets a boolean indicating if the control can be rendered */
    get notRenderable(): boolean;
    set notRenderable(value: boolean);
    /** Gets or sets a boolean indicating if the control is visible */
    get isVisible(): boolean;
    set isVisible(value: boolean);
    /** Gets a boolean indicating that the control needs to update its rendering */
    get isDirty(): boolean;
    /**
     * Gets the current linked mesh (or null if none)
     */
    get linkedMesh(): Nullable<TransformNode>;
    /**
     * Gets or sets a value indicating the padding should work like in CSS.
     * Basically, it will add the padding amount on each side of the parent control for its children.
     */
    get descendantsOnlyPadding(): boolean;
    set descendantsOnlyPadding(value: boolean);
    /**
     * Gets or sets a value indicating the padding to use on the left of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingLeft(): string | number;
    set paddingLeft(value: string | number);
    /**
     * Gets or sets a value indicating the padding in pixels to use on the left of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingLeftInPixels(): number;
    set paddingLeftInPixels(value: number);
    /** @internal */
    get _paddingLeftInPixels(): number;
    /**
     * Gets or sets a value indicating the padding to use on the right of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingRight(): string | number;
    set paddingRight(value: string | number);
    /**
     * Gets or sets a value indicating the padding in pixels to use on the right of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingRightInPixels(): number;
    set paddingRightInPixels(value: number);
    /** @internal */
    get _paddingRightInPixels(): number;
    /**
     * Gets or sets a value indicating the padding to use on the top of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingTop(): string | number;
    set paddingTop(value: string | number);
    /**
     * Gets or sets a value indicating the padding in pixels to use on the top of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingTopInPixels(): number;
    set paddingTopInPixels(value: number);
    /** @internal */
    get _paddingTopInPixels(): number;
    /**
     * Gets or sets a value indicating the padding to use on the bottom of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingBottom(): string | number;
    set paddingBottom(value: string | number);
    /**
     * Gets or sets a value indicating the padding in pixels to use on the bottom of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingBottomInPixels(): number;
    set paddingBottomInPixels(value: number);
    /** @internal */
    get _paddingBottomInPixels(): number;
    /**
     * Gets or sets a value indicating the left coordinate of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get left(): string | number;
    set left(value: string | number);
    /**
     * Gets or sets a value indicating the left coordinate in pixels of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get leftInPixels(): number;
    set leftInPixels(value: number);
    /**
     * Gets or sets a value indicating the top coordinate of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get top(): string | number;
    set top(value: string | number);
    /**
     * Gets or sets a value indicating the top coordinate in pixels of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get topInPixels(): number;
    set topInPixels(value: number);
    /**
     * Gets or sets a value indicating the offset on X axis to the linked mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
     */
    get linkOffsetX(): string | number;
    set linkOffsetX(value: string | number);
    /**
     * Gets or sets a value indicating the offset in pixels on X axis to the linked mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
     */
    get linkOffsetXInPixels(): number;
    set linkOffsetXInPixels(value: number);
    /**
     * Gets or sets a value indicating the offset on Y axis to the linked mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
     */
    get linkOffsetY(): string | number;
    set linkOffsetY(value: string | number);
    /**
     * Gets or sets a value indicating the offset in pixels on Y axis to the linked mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
     */
    get linkOffsetYInPixels(): number;
    set linkOffsetYInPixels(value: number);
    /** Gets the center coordinate on X axis */
    get centerX(): number;
    /** Gets the center coordinate on Y axis */
    get centerY(): number;
    /** Gets or sets if control is Enabled */
    get isEnabled(): boolean;
    set isEnabled(value: boolean);
    /** Gets or sets background color of control if it's disabled. Only applies to Button class. */
    get disabledColor(): string;
    set disabledColor(value: string);
    /** Gets or sets front color of control if it's disabled. Only applies to Checkbox class. */
    get disabledColorItem(): string;
    set disabledColorItem(value: string);
    /**
     * Gets/sets the overlap group of the control.
     * Controls with overlapGroup set to a number can be deoverlapped.
     * Controls with overlapGroup set to undefined are not deoverlapped.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#deoverlapping
     */
    overlapGroup?: number;
    /**
     * Gets/sets the deoverlap movement multiplier
     */
    overlapDeltaMultiplier?: number;
    /**
     * Array of animations
     */
    animations: Nullable<Animation[]>;
    protected _focusedColor: Nullable<string>;
    /**
     * Border color when control is focused
     * When not defined the ADT color will be used. If no ADT color is defined, focused state won't have any border
     */
    get focusedColor(): Nullable<string>;
    set focusedColor(value: Nullable<string>);
    /**
     * The tab index of this control. -1 indicates this control is not part of the tab navigation.
     * A positive value indicates the order of the control in the tab navigation.
     * A value of 0 indicated the control will be focused after all controls with a positive index.
     * More than one control can have the same tab index and the navigation would then go through all controls with the same value in an order defined by the layout or the hierarchy.
     * The value can be changed at any time.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
     */
    tabIndex: number;
    protected _isFocused: boolean;
    protected _unfocusedColor: Nullable<string>;
    /** Observable raised when the control gets the focus */
    onFocusObservable: Observable<Control>;
    /** Observable raised when the control loses the focus */
    onBlurObservable: Observable<Control>;
    /** Observable raised when a key event was processed */
    onKeyboardEventProcessedObservable: Observable<IKeyboardEvent>;
    /** @internal */
    onBlur(): void;
    /** @internal */
    onFocus(): void;
    /**
     * Function called to get the list of controls that should not steal the focus from this control
     * @returns an array of controls
     */
    keepsFocusWith(): Nullable<Control[]>;
    /**
     * Function to focus a button programmatically
     */
    focus(): void;
    /**
     * Function to unfocus a button programmatically
     */
    blur(): void;
    /**
     * Handles the keyboard event
     * @param evt Defines the KeyboardEvent
     */
    processKeyboard(evt: IKeyboardEvent): void;
    /**
     * Creates a new control
     * @param name defines the name of the control
     */
    constructor(
    /** defines the name of the control */
    name?: string | undefined);
    /** @internal */
    protected _getTypeName(): string;
    /**
     * Gets the first ascendant in the hierarchy of the given type
     * @param className defines the required type
     * @returns the ascendant or null if not found
     */
    getAscendantOfClass(className: string): Nullable<Control>;
    /**
     * Mark control element as dirty
     * @param force force non visible elements to be marked too
     */
    markAsDirty(force?: boolean): void;
    /**
     * Mark the element and its children as dirty
     */
    markAllAsDirty(): void;
    /** @internal */
    _resetFontCache(): void;
    /**
     * Determines if a container is an ascendant of the current control
     * @param container defines the container to look for
     * @returns true if the container is one of the ascendant of the control
     */
    isAscendant(container: Control): boolean;
    /**
     * Gets coordinates in local control space
     * @param globalCoordinates defines the coordinates to transform
     * @returns the new coordinates in local space
     */
    getLocalCoordinates(globalCoordinates: Vector2): Vector2;
    /**
     * Gets coordinates in local control space
     * @param globalCoordinates defines the coordinates to transform
     * @param result defines the target vector2 where to store the result
     * @returns the current control
     */
    getLocalCoordinatesToRef(globalCoordinates: Vector2, result: Vector2): Control;
    /**
     * Gets coordinates in parent local control space
     * @param globalCoordinates defines the coordinates to transform
     * @returns the new coordinates in parent local space
     */
    getParentLocalCoordinates(globalCoordinates: Vector2): Vector2;
    /**
     * Move the current control to a vector3 position projected onto the screen.
     * @param position defines the target position
     * @param scene defines the hosting scene
     */
    moveToVector3(position: Vector3, scene: Scene): void;
    /**
     * Will store all controls that have this control as ascendant in a given array
     * @param results defines the array where to store the descendants
     * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
     * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
     */
    getDescendantsToRef(results: Control[], directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): void;
    /**
     * Will return all controls that have this control as ascendant
     * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
     * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
     * @returns all child controls
     */
    getDescendants(directDescendantsOnly?: boolean, predicate?: (control: Control) => boolean): Control[];
    /**
     * Link current control with a target mesh
     * @param mesh defines the mesh to link with
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
     */
    linkWithMesh(mesh: Nullable<TransformNode>): void;
    /**
     * Shorthand function to set the top, right, bottom, and left padding values on the control.
     * @param { string | number} paddingTop - The value of the top padding.
     * @param { string | number} paddingRight - The value of the right padding. If omitted, top is used.
     * @param { string | number} paddingBottom - The value of the bottom padding. If omitted, top is used.
     * @param { string | number} paddingLeft - The value of the left padding. If omitted, right is used.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    setPadding(paddingTop: string | number, paddingRight?: string | number, paddingBottom?: string | number, paddingLeft?: string | number): void;
    /**
     * Shorthand funtion to set the top, right, bottom, and left padding values in pixels on the control.
     * @param { number} paddingTop - The value in pixels of the top padding.
     * @param { number} paddingRight - The value in pixels of the right padding. If omitted, top is used.
     * @param { number} paddingBottom - The value in pixels of the bottom padding. If omitted, top is used.
     * @param { number} paddingLeft - The value in pixels of the left padding. If omitted, right is used.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    setPaddingInPixels(paddingTop: number, paddingRight?: number, paddingBottom?: number, paddingLeft?: number): void;
    /**
     * @internal
     */
    _moveToProjectedPosition(projectedPosition: Vector3): void;
    /**
     * @internal
     */
    _offsetLeft(offset: number): void;
    /**
     * @internal
     */
    _offsetTop(offset: number): void;
    /** @internal */
    _markMatrixAsDirty(): void;
    /** @internal */
    _flagDescendantsAsMatrixDirty(): void;
    /**
     * @internal
     */
    _intersectsRect(rect: Measure, context?: ICanvasRenderingContext): boolean;
    /** @internal */
    protected _computeAdditionalOffsetX(): number;
    /** @internal */
    protected _computeAdditionalOffsetY(): number;
    /** @internal */
    invalidateRect(): void;
    /**
     * @internal
     */
    _markAsDirty(force?: boolean): void;
    /** @internal */
    _markAllAsDirty(): void;
    /**
     * @internal
     */
    _link(host: AdvancedDynamicTexture): void;
    /**
     * @internal
     */
    protected _transform(context?: ICanvasRenderingContext): void;
    /**
     * @internal
     */
    _renderHighlight(context: ICanvasRenderingContext): void;
    /**
     * @internal
     */
    _renderHighlightSpecific(context: ICanvasRenderingContext): void;
    protected _getColor(context: ICanvasRenderingContext): string | ICanvasGradient;
    /**
     * @internal
     */
    protected _applyStates(context: ICanvasRenderingContext): void;
    /**
     * @internal
     */
    _layout(parentMeasure: Measure, context: ICanvasRenderingContext): boolean;
    /**
     * @internal
     */
    protected _processMeasures(parentMeasure: Measure, context: ICanvasRenderingContext): void;
    protected _evaluateClippingState(parentMeasure: Measure): void;
    /** @internal */
    _measure(): void;
    /**
     * @internal
     */
    protected _computeAlignment(parentMeasure: Measure, context: ICanvasRenderingContext): void;
    /**
     * @internal
     */
    protected _preMeasure(parentMeasure: Measure, context: ICanvasRenderingContext): void;
    /**
     * @internal
     */
    protected _postMeasure(parentMeasure: Measure, context: ICanvasRenderingContext): void;
    /**
     * @internal
     */
    protected _additionalProcessing(parentMeasure: Measure, context: ICanvasRenderingContext): void;
    /**
     * @internal
     */
    protected _clipForChildren(context: ICanvasRenderingContext): void;
    private static _ClipMeasure;
    private _tmpMeasureA;
    private _clip;
    /**
     * @internal
     */
    _render(context: ICanvasRenderingContext, invalidatedRectangle?: Nullable<Measure>): boolean;
    /**
     * @internal
     */
    _draw(context: ICanvasRenderingContext, invalidatedRectangle?: Nullable<Measure>): void;
    /**
     * Tests if a given coordinates belong to the current control
     * @param x defines x coordinate to test
     * @param y defines y coordinate to test
     * @returns true if the coordinates are inside the control
     */
    contains(x: number, y: number): boolean;
    /**
     * @internal
     */
    _processPicking(x: number, y: number, pi: Nullable<PointerInfoBase>, type: number, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
    /**
     * @internal
     */
    _onPointerMove(target: Control, coordinates: Vector2, pointerId: number, pi: Nullable<PointerInfoBase>): void;
    /**
     * @internal
     */
    _onPointerEnter(target: Control, pi: Nullable<PointerInfoBase>): boolean;
    /**
     * @internal
     */
    _onPointerOut(target: Control, pi: Nullable<PointerInfoBase>, force?: boolean): void;
    /**
     * @internal
     */
    _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: Nullable<PointerInfoBase>): boolean;
    /**
     * @internal
     */
    _onPointerUp(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi?: Nullable<PointerInfoBase>): void;
    _onPointerPick(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, notifyClick: boolean, pi: Nullable<PointerInfoBase>): boolean;
    /**
     * @internal
     */
    _forcePointerUp(pointerId?: Nullable<number>): void;
    /**
     * @internal
     */
    _onWheelScroll(deltaX?: number, deltaY?: number): void;
    /** @internal */
    _onCanvasBlur(): void;
    /**
     * @internal
     */
    _processObservables(type: number, x: number, y: number, pi: Nullable<PointerInfoBase>, pointerId: number, buttonIndex: number, deltaX?: number, deltaY?: number): boolean;
    private _getStyleProperty;
    private _prepareFont;
    /**
     * A control has a dimension fully defined if that dimension doesn't depend on the parent's dimension.
     * As an example, a control that has dimensions in pixels is fully defined, while in percentage is not fully defined.
     * @param dim the dimension to check (width or height)
     * @returns if the dimension is fully defined
     */
    isDimensionFullyDefined(dim: "width" | "height"): boolean;
    /**
     * Gets the dimension of the control along a specified axis
     * @param dim the dimension to retrieve (width or height)
     * @returns the dimension value along the specified axis
     */
    getDimension(dim: "width" | "height"): ValueAndUnit;
    /**
     * Clones a control and its descendants
     * @param host the texture where the control will be instantiated. Can be empty, in which case the control will be created on the same texture
     * @returns the cloned control
     */
    clone(host?: AdvancedDynamicTexture): Control;
    /**
     * Parses a serialized object into this control
     * @param serializedObject the object with the serialized properties
     * @param host the texture where the control will be instantiated. Can be empty, in which case the control will be created on the same texture
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @returns this control
     */
    parse(serializedObject: any, host?: AdvancedDynamicTexture, urlRewriter?: (url: string) => string): Control;
    /**
     * Serializes the current control
     * @param serializationObject defined the JSON serialized object
     * @param force if the control should be serialized even if the isSerializable flag is set to false (default false)
     * @param allowCanvas defines if the control is allowed to use a Canvas2D object to serialize (true by default)
     */
    serialize(serializationObject: any, force?: boolean, allowCanvas?: boolean): void;
    /**
     * @internal
     */
    _parseFromContent(serializedObject: any, host: AdvancedDynamicTexture, urlRewriter?: (url: string) => string): void;
    /** Releases associated resources */
    dispose(): void;
    private static _HORIZONTAL_ALIGNMENT_LEFT;
    private static _HORIZONTAL_ALIGNMENT_RIGHT;
    private static _HORIZONTAL_ALIGNMENT_CENTER;
    private static _VERTICAL_ALIGNMENT_TOP;
    private static _VERTICAL_ALIGNMENT_BOTTOM;
    private static _VERTICAL_ALIGNMENT_CENTER;
    /** HORIZONTAL_ALIGNMENT_LEFT */
    static get HORIZONTAL_ALIGNMENT_LEFT(): number;
    /** HORIZONTAL_ALIGNMENT_RIGHT */
    static get HORIZONTAL_ALIGNMENT_RIGHT(): number;
    /** HORIZONTAL_ALIGNMENT_CENTER */
    static get HORIZONTAL_ALIGNMENT_CENTER(): number;
    /** VERTICAL_ALIGNMENT_TOP */
    static get VERTICAL_ALIGNMENT_TOP(): number;
    /** VERTICAL_ALIGNMENT_BOTTOM */
    static get VERTICAL_ALIGNMENT_BOTTOM(): number;
    /** VERTICAL_ALIGNMENT_CENTER */
    static get VERTICAL_ALIGNMENT_CENTER(): number;
    private static _FontHeightSizes;
    /**
     * @internal
     */
    static _GetFontOffset(font: string, engineToUse?: AbstractEngine): {
        ascent: number;
        height: number;
        descent: number;
    };
    /**
     * Creates a Control from parsed data
     * @param serializedObject defines parsed data
     * @param host defines the hosting AdvancedDynamicTexture
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @returns a new Control
     */
    static Parse(serializedObject: any, host: AdvancedDynamicTexture, urlRewriter?: (url: string) => string): Control;
    static AddHeader: (control: Control, text: string, size: string | number, options: {
        isHorizontal: boolean;
        controlFirst: boolean;
    }) => any;
    /**
     * @internal
     */
    protected static drawEllipse(x: number, y: number, width: number, height: number, arc: number, context: ICanvasRenderingContext): void;
    /**
     * Returns true if the control is ready to be used
     * @returns
     */
    isReady(): boolean;
}
