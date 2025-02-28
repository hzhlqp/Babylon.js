import { __decorate } from "tslib";
import { Observable } from "core/Misc/observable";
import { Vector2, Vector3, Matrix } from "core/Maths/math.vector";
import { PointerEventTypes } from "core/Events/pointerEvents";
import { Logger } from "core/Misc/logger";
import { Tools } from "core/Misc/tools";
import { ValueAndUnit } from "../valueAndUnit";
import { Measure } from "../measure";
import { Matrix2D, Vector2WithInfo } from "../math2D";
import { GetClass, RegisterClass } from "core/Misc/typeStore";
import { serialize } from "core/Misc/decorators";
import { SerializationHelper } from "core/Misc/decorators.serialization";
import { EngineStore } from "core/Engines/engineStore";
/**
 * Root class used for all 2D controls
 * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#controls
 */
export class Control {
    /**
     * Gets or sets a boolean indicating if the control is readonly (default: false).
     * A readonly control will still raise pointer events but will not react to them
     */
    get isReadOnly() {
        return this._isReadOnly;
    }
    set isReadOnly(value) {
        this._isReadOnly = value;
    }
    /**
     * Gets the transformed measure, that is the bounding box of the control after applying all transformations
     */
    get transformedMeasure() {
        return this._evaluatedMeasure;
    }
    /**
     * Sets/Gets a boolean indicating if the children are clipped to the current control bounds.
     * Please note that not clipping children may generate issues with adt.useInvalidateRectOptimization so it is recommended to turn this optimization off if you want to use unclipped children
     */
    set clipChildren(value) {
        this._clipChildren = value;
    }
    get clipChildren() {
        return this._clipChildren;
    }
    /**
     * Sets/Gets a boolean indicating that control content must be clipped
     * Please note that not clipping content may generate issues with adt.useInvalidateRectOptimization so it is recommended to turn this optimization off if you want to use unclipped children
     */
    set clipContent(value) {
        this._clipContent = value;
    }
    get clipContent() {
        return this._clipContent;
    }
    /** Gets or sets a value indicating the offset to apply on X axis to render the shadow */
    get shadowOffsetX() {
        return this._shadowOffsetX;
    }
    set shadowOffsetX(value) {
        if (this._shadowOffsetX === value) {
            return;
        }
        this._shadowOffsetX = value;
        this._markAsDirty();
    }
    /** Gets or sets a value indicating the offset to apply on Y axis to render the shadow */
    get shadowOffsetY() {
        return this._shadowOffsetY;
    }
    set shadowOffsetY(value) {
        if (this._shadowOffsetY === value) {
            return;
        }
        this._shadowOffsetY = value;
        this._markAsDirty();
    }
    /** Gets or sets a value indicating the amount of blur to use to render the shadow */
    get shadowBlur() {
        return this._shadowBlur;
    }
    set shadowBlur(value) {
        if (this._shadowBlur === value) {
            return;
        }
        this._previousShadowBlur = this._shadowBlur;
        this._shadowBlur = value;
        this._markAsDirty();
    }
    /** Gets or sets a value indicating the color of the shadow (black by default ie. "#000") */
    get shadowColor() {
        return this._shadowColor;
    }
    set shadowColor(value) {
        if (this._shadowColor === value) {
            return;
        }
        this._shadowColor = value;
        this._markAsDirty();
    }
    // Properties
    /** Gets the control type name */
    get typeName() {
        return this._getTypeName();
    }
    /**
     * Get the current class name of the control.
     * @returns current class name
     */
    getClassName() {
        return this._getTypeName();
    }
    /**
     * Gets or sets the accessibility tag to describe the control for accessibility purpose.
     * By default, GUI controls already indicate accessibility info, but one can override the info using this tag.
     */
    set accessibilityTag(value) {
        this._accessibilityTag = value;
        this.onAccessibilityTagChangedObservable.notifyObservers(value);
    }
    get accessibilityTag() {
        return this._accessibilityTag;
    }
    /**
     * Get the hosting AdvancedDynamicTexture
     */
    get host() {
        return this._host;
    }
    /** Gets or set information about font offsets (used to render and align text) */
    get fontOffset() {
        return this._fontOffset;
    }
    set fontOffset(offset) {
        this._fontOffset = offset;
    }
    /** Gets or sets alpha value for the control (1 means opaque and 0 means entirely transparent) */
    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        if (this._alpha === value) {
            return;
        }
        this._alphaSet = true;
        this._alpha = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets a number indicating size of stroke we want to highlight the control with (mostly for debugging purpose)
     */
    get highlightLineWidth() {
        return this._highlightLineWidth;
    }
    set highlightLineWidth(value) {
        if (this._highlightLineWidth === value) {
            return;
        }
        this._highlightLineWidth = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets a boolean indicating that we want to highlight the control (mostly for debugging purpose)
     */
    get isHighlighted() {
        return this._isHighlighted;
    }
    set isHighlighted(value) {
        if (this._isHighlighted === value) {
            return;
        }
        this._isHighlighted = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets a string defining the color to use for highlighting this control
     */
    get highlightColor() {
        return this._highlightColor;
    }
    set highlightColor(value) {
        if (this._highlightColor === value) {
            return;
        }
        this._highlightColor = value;
        this._markAsDirty();
    }
    /** Gets or sets a value indicating the scale factor on X axis (1 by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
     */
    get scaleX() {
        return this._scaleX;
    }
    set scaleX(value) {
        if (this._scaleX === value) {
            return;
        }
        this._scaleX = value;
        this._markAsDirty();
        this._markMatrixAsDirty();
    }
    /** Gets or sets a value indicating the scale factor on Y axis (1 by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
     */
    get scaleY() {
        return this._scaleY;
    }
    set scaleY(value) {
        if (this._scaleY === value) {
            return;
        }
        this._scaleY = value;
        this._markAsDirty();
        this._markMatrixAsDirty();
    }
    /** Gets or sets the rotation angle (0 by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
     */
    get rotation() {
        return this._rotation;
    }
    set rotation(value) {
        if (this._rotation === value) {
            return;
        }
        this._rotation = value;
        this._markAsDirty();
        this._markMatrixAsDirty();
    }
    /** Gets or sets the transformation center on Y axis (0 by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
     */
    get transformCenterY() {
        return this._transformCenterY;
    }
    set transformCenterY(value) {
        if (this._transformCenterY === value) {
            return;
        }
        this._transformCenterY = value;
        this._markAsDirty();
        this._markMatrixAsDirty();
    }
    /** Gets or sets the transformation center on X axis (0 by default)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#rotation-and-scaling
     */
    get transformCenterX() {
        return this._transformCenterX;
    }
    set transformCenterX(value) {
        if (this._transformCenterX === value) {
            return;
        }
        this._transformCenterX = value;
        this._markAsDirty();
        this._markMatrixAsDirty();
    }
    /**
     * Gets or sets the horizontal alignment
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#alignments
     */
    get horizontalAlignment() {
        return this._horizontalAlignment;
    }
    set horizontalAlignment(value) {
        if (this._horizontalAlignment === value) {
            return;
        }
        this._horizontalAlignment = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the vertical alignment
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#alignments
     */
    get verticalAlignment() {
        return this._verticalAlignment;
    }
    set verticalAlignment(value) {
        if (this._verticalAlignment === value) {
            return;
        }
        this._verticalAlignment = value;
        this._markAsDirty();
    }
    set fixedRatio(value) {
        if (this._fixedRatio === value) {
            return;
        }
        this._fixedRatio = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets a fixed ratio for this control.
     * When different from 0, the ratio is used to compute the "second" dimension.
     * The first dimension used in the computation is the last one set (by setting width / widthInPixels or height / heightInPixels), and the
     * second dimension is computed as first dimension * fixedRatio
     */
    get fixedRatio() {
        return this._fixedRatio;
    }
    set fixedRatioMasterIsWidth(value) {
        if (this._fixedRatioMasterIsWidth === value) {
            return;
        }
        this._fixedRatioMasterIsWidth = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets a boolean indicating that the fixed ratio is set on the width instead of the height. True by default.
     * When the height of a control is set, this property is changed to false.
     */
    get fixedRatioMasterIsWidth() {
        return this._fixedRatioMasterIsWidth;
    }
    /**
     * Gets or sets control width
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get width() {
        return this._width.toString(this._host);
    }
    set width(value) {
        this._fixedRatioMasterIsWidth = true;
        if (this._width.toString(this._host) === value) {
            return;
        }
        if (this._width.fromString(value)) {
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets the control width in pixel
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get widthInPixels() {
        return this._width.getValueInPixel(this._host, this._cachedParentMeasure.width);
    }
    set widthInPixels(value) {
        if (isNaN(value)) {
            return;
        }
        this._fixedRatioMasterIsWidth = true;
        this.width = value + "px";
    }
    /**
     * Gets or sets control height
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get height() {
        return this._height.toString(this._host);
    }
    set height(value) {
        this._fixedRatioMasterIsWidth = false;
        if (this._height.toString(this._host) === value) {
            return;
        }
        if (this._height.fromString(value)) {
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets control height in pixel
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get heightInPixels() {
        return this._height.getValueInPixel(this._host, this._cachedParentMeasure.height);
    }
    set heightInPixels(value) {
        if (isNaN(value)) {
            return;
        }
        this._fixedRatioMasterIsWidth = false;
        this.height = value + "px";
    }
    /** Gets or set font family */
    get fontFamily() {
        return this._fontFamily;
    }
    set fontFamily(value) {
        if (this._fontFamily === value) {
            return;
        }
        this._fontFamily = value;
        this._resetFontCache();
    }
    /** Gets or sets font style */
    get fontStyle() {
        return this._fontStyle;
    }
    set fontStyle(value) {
        if (this._fontStyle === value) {
            return;
        }
        this._fontStyle = value;
        this._resetFontCache();
    }
    /** Gets or sets font weight */
    get fontWeight() {
        return this._fontWeight;
    }
    set fontWeight(value) {
        if (this._fontWeight === value) {
            return;
        }
        this._fontWeight = value;
        this._resetFontCache();
    }
    /**
     * Gets or sets style
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#styles
     */
    get style() {
        return this._style;
    }
    set style(value) {
        if (this._style) {
            this._style.onChangedObservable.remove(this._styleObserver);
            this._styleObserver = null;
        }
        this._style = value;
        if (this._style) {
            this._styleObserver = this._style.onChangedObservable.add(() => {
                this._markAsDirty();
                this._resetFontCache();
            });
        }
        this._markAsDirty();
        this._resetFontCache();
    }
    /** @internal */
    get _isFontSizeInPercentage() {
        return this._fontSize.isPercentage;
    }
    /** Gets or sets font size in pixels */
    get fontSizeInPixels() {
        const fontSizeToUse = this._style ? this._style._fontSize : this._fontSize;
        if (fontSizeToUse.isPixel) {
            return fontSizeToUse.getValue(this._host);
        }
        return fontSizeToUse.getValueInPixel(this._host, this._tempParentMeasure.height || this._cachedParentMeasure.height);
    }
    set fontSizeInPixels(value) {
        if (isNaN(value)) {
            return;
        }
        this.fontSize = value + "px";
    }
    /** Gets or sets font size */
    get fontSize() {
        return this._fontSize.toString(this._host);
    }
    set fontSize(value) {
        if (this._fontSize.toString(this._host) === value) {
            return;
        }
        if (this._fontSize.fromString(value)) {
            this._markAsDirty();
            this._resetFontCache();
        }
    }
    /** Gets or sets foreground color */
    get color() {
        return this._color;
    }
    set color(value) {
        if (this._color === value) {
            return;
        }
        this._color = value;
        this._markAsDirty();
    }
    /** Gets or sets gradient. Setting a gradient will override the color */
    get gradient() {
        return this._gradient;
    }
    set gradient(value) {
        if (this._gradient === value) {
            return;
        }
        this._gradient = value;
        this._markAsDirty();
    }
    /** Gets or sets z index which is used to reorder controls on the z axis */
    get zIndex() {
        return this._zIndex;
    }
    set zIndex(value) {
        if (this.zIndex === value) {
            return;
        }
        this._zIndex = value;
        if (this.parent) {
            this.parent._reOrderControl(this);
        }
    }
    /** Gets or sets a boolean indicating if the control can be rendered */
    get notRenderable() {
        return this._doNotRender;
    }
    set notRenderable(value) {
        if (this._doNotRender === value) {
            return;
        }
        this._doNotRender = value;
        this._markAsDirty();
    }
    /** Gets or sets a boolean indicating if the control is visible */
    get isVisible() {
        return this._isVisible;
    }
    set isVisible(value) {
        if (this._isVisible === value) {
            return;
        }
        this._isVisible = value;
        this._markAsDirty(true);
        this.onIsVisibleChangedObservable.notifyObservers(value);
    }
    /** Gets a boolean indicating that the control needs to update its rendering */
    get isDirty() {
        return this._isDirty;
    }
    /**
     * Gets the current linked mesh (or null if none)
     */
    get linkedMesh() {
        return this._linkedMesh;
    }
    /**
     * Gets or sets a value indicating the padding should work like in CSS.
     * Basically, it will add the padding amount on each side of the parent control for its children.
     */
    get descendantsOnlyPadding() {
        return this._descendantsOnlyPadding;
    }
    set descendantsOnlyPadding(value) {
        if (this._descendantsOnlyPadding === value) {
            return;
        }
        this._descendantsOnlyPadding = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets a value indicating the padding to use on the left of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingLeft() {
        return this._paddingLeft.toString(this._host);
    }
    set paddingLeft(value) {
        if (this._paddingLeft.fromString(value)) {
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets a value indicating the padding in pixels to use on the left of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingLeftInPixels() {
        return this._paddingLeft.getValueInPixel(this._host, this._cachedParentMeasure.width);
    }
    set paddingLeftInPixels(value) {
        if (isNaN(value)) {
            return;
        }
        this.paddingLeft = value + "px";
    }
    /** @internal */
    get _paddingLeftInPixels() {
        if (this._descendantsOnlyPadding) {
            return 0;
        }
        return this.paddingLeftInPixels;
    }
    /**
     * Gets or sets a value indicating the padding to use on the right of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingRight() {
        return this._paddingRight.toString(this._host);
    }
    set paddingRight(value) {
        if (this._paddingRight.fromString(value)) {
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets a value indicating the padding in pixels to use on the right of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingRightInPixels() {
        return this._paddingRight.getValueInPixel(this._host, this._cachedParentMeasure.width);
    }
    set paddingRightInPixels(value) {
        if (isNaN(value)) {
            return;
        }
        this.paddingRight = value + "px";
    }
    /** @internal */
    get _paddingRightInPixels() {
        if (this._descendantsOnlyPadding) {
            return 0;
        }
        return this.paddingRightInPixels;
    }
    /**
     * Gets or sets a value indicating the padding to use on the top of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingTop() {
        return this._paddingTop.toString(this._host);
    }
    set paddingTop(value) {
        if (this._paddingTop.fromString(value)) {
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets a value indicating the padding in pixels to use on the top of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingTopInPixels() {
        return this._paddingTop.getValueInPixel(this._host, this._cachedParentMeasure.height);
    }
    set paddingTopInPixels(value) {
        if (isNaN(value)) {
            return;
        }
        this.paddingTop = value + "px";
    }
    /** @internal */
    get _paddingTopInPixels() {
        if (this._descendantsOnlyPadding) {
            return 0;
        }
        return this.paddingTopInPixels;
    }
    /**
     * Gets or sets a value indicating the padding to use on the bottom of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingBottom() {
        return this._paddingBottom.toString(this._host);
    }
    set paddingBottom(value) {
        if (this._paddingBottom.fromString(value)) {
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets a value indicating the padding in pixels to use on the bottom of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get paddingBottomInPixels() {
        return this._paddingBottom.getValueInPixel(this._host, this._cachedParentMeasure.height);
    }
    set paddingBottomInPixels(value) {
        if (isNaN(value)) {
            return;
        }
        this.paddingBottom = value + "px";
    }
    /** @internal */
    get _paddingBottomInPixels() {
        if (this._descendantsOnlyPadding) {
            return 0;
        }
        return this.paddingBottomInPixels;
    }
    /**
     * Gets or sets a value indicating the left coordinate of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get left() {
        return this._left.toString(this._host);
    }
    set left(value) {
        if (this._left.fromString(value)) {
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets a value indicating the left coordinate in pixels of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get leftInPixels() {
        return this._left.getValueInPixel(this._host, this._cachedParentMeasure.width);
    }
    set leftInPixels(value) {
        if (isNaN(value)) {
            return;
        }
        this.left = value + "px";
    }
    /**
     * Gets or sets a value indicating the top coordinate of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get top() {
        return this._top.toString(this._host);
    }
    set top(value) {
        if (this._top.fromString(value)) {
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets a value indicating the top coordinate in pixels of the control
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    get topInPixels() {
        return this._top.getValueInPixel(this._host, this._cachedParentMeasure.height);
    }
    set topInPixels(value) {
        if (isNaN(value)) {
            return;
        }
        this.top = value + "px";
    }
    /**
     * Gets or sets a value indicating the offset on X axis to the linked mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
     */
    get linkOffsetX() {
        return this._linkOffsetX.toString(this._host);
    }
    set linkOffsetX(value) {
        if (this._linkOffsetX.fromString(value)) {
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets a value indicating the offset in pixels on X axis to the linked mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
     */
    get linkOffsetXInPixels() {
        return this._linkOffsetX.getValueInPixel(this._host, this._cachedParentMeasure.width);
    }
    set linkOffsetXInPixels(value) {
        if (isNaN(value)) {
            return;
        }
        this.linkOffsetX = value + "px";
    }
    /**
     * Gets or sets a value indicating the offset on Y axis to the linked mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
     */
    get linkOffsetY() {
        return this._linkOffsetY.toString(this._host);
    }
    set linkOffsetY(value) {
        if (this._linkOffsetY.fromString(value)) {
            this._markAsDirty();
        }
    }
    /**
     * Gets or sets a value indicating the offset in pixels on Y axis to the linked mesh
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
     */
    get linkOffsetYInPixels() {
        return this._linkOffsetY.getValueInPixel(this._host, this._cachedParentMeasure.height);
    }
    set linkOffsetYInPixels(value) {
        if (isNaN(value)) {
            return;
        }
        this.linkOffsetY = value + "px";
    }
    /** Gets the center coordinate on X axis */
    get centerX() {
        return this._currentMeasure.left + this._currentMeasure.width / 2;
    }
    /** Gets the center coordinate on Y axis */
    get centerY() {
        return this._currentMeasure.top + this._currentMeasure.height / 2;
    }
    /** Gets or sets if control is Enabled */
    get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(value) {
        if (this._isEnabled === value) {
            return;
        }
        this._isEnabled = value;
        this._markAsDirty();
        // if this control or any of it's descendants are under a pointer, we need to fire a pointerOut event
        const recursivelyFirePointerOut = (control) => {
            if (!control.host) {
                return;
            }
            for (const pointer in control.host._lastControlOver) {
                if (control === this.host._lastControlOver[pointer]) {
                    control._onPointerOut(control, null, true);
                    delete control.host._lastControlOver[pointer];
                }
            }
            if (control.children !== undefined) {
                control.children.forEach(recursivelyFirePointerOut);
            }
        };
        recursivelyFirePointerOut(this);
        this.onEnabledStateChangedObservable.notifyObservers(value);
    }
    /** Gets or sets background color of control if it's disabled. Only applies to Button class. */
    get disabledColor() {
        return this._disabledColor;
    }
    set disabledColor(value) {
        if (this._disabledColor === value) {
            return;
        }
        this._disabledColor = value;
        this._markAsDirty();
    }
    /** Gets or sets front color of control if it's disabled. Only applies to Checkbox class. */
    get disabledColorItem() {
        return this._disabledColorItem;
    }
    set disabledColorItem(value) {
        if (this._disabledColorItem === value) {
            return;
        }
        this._disabledColorItem = value;
        this._markAsDirty();
    }
    /**
     * Border color when control is focused
     * When not defined the ADT color will be used. If no ADT color is defined, focused state won't have any border
     */
    get focusedColor() {
        return this._focusedColor;
    }
    set focusedColor(value) {
        this._focusedColor = value;
    }
    /** @internal */
    onBlur() {
        if (this._isFocused) {
            this._isFocused = false;
            if (this.focusedColor && this._unfocusedColor != null) {
                // Set color back to saved unfocused color
                this.color = this._unfocusedColor;
            }
            this.onBlurObservable.notifyObservers(this);
        }
    }
    /** @internal */
    onFocus() {
        this._isFocused = true;
        if (this.focusedColor) {
            // Save the unfocused color
            this._unfocusedColor = this.color;
            this.color = this.focusedColor;
        }
        this.onFocusObservable.notifyObservers(this);
    }
    /**
     * Function called to get the list of controls that should not steal the focus from this control
     * @returns an array of controls
     */
    keepsFocusWith() {
        return null;
    }
    /**
     * Function to focus a button programmatically
     */
    focus() {
        this._host.moveFocusToControl(this);
    }
    /**
     * Function to unfocus a button programmatically
     */
    blur() {
        this._host.focusedControl = null;
    }
    /**
     * Handles the keyboard event
     * @param evt Defines the KeyboardEvent
     */
    processKeyboard(evt) {
        // if enter, trigger the new observable
        if (evt.key === "Enter") {
            this.onEnterPressedObservable.notifyObservers(this);
        }
        this.onKeyboardEventProcessedObservable.notifyObservers(evt, -1, this);
    }
    // Functions
    /**
     * Creates a new control
     * @param name defines the name of the control
     */
    constructor(
    /** defines the name of the control */
    name) {
        this.name = name;
        this._alpha = 1;
        this._alphaSet = false;
        this._zIndex = 0;
        /** @internal */
        this._currentMeasure = Measure.Empty();
        /** @internal */
        this._tempPaddingMeasure = Measure.Empty();
        this._fontFamily = "";
        this._fontStyle = "";
        this._fontWeight = "";
        this._fontSize = new ValueAndUnit(18, ValueAndUnit.UNITMODE_PIXEL, false);
        /** @internal */
        this._width = new ValueAndUnit(1, ValueAndUnit.UNITMODE_PERCENTAGE, false);
        /** @internal */
        this._height = new ValueAndUnit(1, ValueAndUnit.UNITMODE_PERCENTAGE, false);
        this._color = "";
        this._style = null;
        /** @internal */
        this._horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        /** @internal */
        this._verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        /** @internal */
        this._isDirty = true;
        /** @internal */
        this._wasDirty = false;
        /** @internal */
        this._tempParentMeasure = Measure.Empty();
        /** @internal */
        this._prevCurrentMeasureTransformedIntoGlobalSpace = Measure.Empty();
        /** @internal */
        this._cachedParentMeasure = Measure.Empty();
        this._descendantsOnlyPadding = false;
        this._paddingLeft = new ValueAndUnit(0);
        this._paddingRight = new ValueAndUnit(0);
        this._paddingTop = new ValueAndUnit(0);
        this._paddingBottom = new ValueAndUnit(0);
        /** @internal */
        this._left = new ValueAndUnit(0);
        /** @internal */
        this._top = new ValueAndUnit(0);
        this._scaleX = 1.0;
        this._scaleY = 1.0;
        this._rotation = 0;
        this._transformCenterX = 0.5;
        this._transformCenterY = 0.5;
        /** @internal */
        this._transformMatrix = Matrix2D.Identity();
        /** @internal */
        this._invertTransformMatrix = Matrix2D.Identity();
        /** @internal */
        this._transformedPosition = Vector2.Zero();
        this._isMatrixDirty = true;
        this._isVisible = true;
        this._isHighlighted = false;
        this._highlightColor = "#4affff";
        this._highlightLineWidth = 2;
        this._fontSet = false;
        this._dummyVector2 = Vector2.Zero();
        this._downCount = 0;
        this._enterCount = -1;
        this._doNotRender = false;
        this._downPointerIds = {};
        this._evaluatedMeasure = new Measure(0, 0, 0, 0);
        this._evaluatedParentMeasure = new Measure(0, 0, 0, 0);
        this._isEnabled = true;
        this._disabledColor = "#9a9a9a";
        this._disabledColorItem = "#6a6a6a";
        this._isReadOnly = false;
        this._gradient = null;
        /** @internal */
        this._rebuildLayout = false;
        /**
         * Observable that fires when the control's enabled state changes
         */
        this.onEnabledStateChangedObservable = new Observable();
        /** @internal */
        this._customData = {};
        /** @internal */
        this._isClipped = false;
        /** @internal */
        this._automaticSize = false;
        /**
         * Gets or sets an object used to store user defined information for the node
         */
        this.metadata = null;
        /** Gets or sets a boolean indicating if the control can be hit with pointer events */
        this.isHitTestVisible = true;
        /** Gets or sets a boolean indicating if the control can block pointer events. False by default except on the following controls:
         * * Button controls (Button, RadioButton, ToggleButton)
         * * Checkbox
         * * ColorPicker
         * * InputText
         * * Slider
         */
        this.isPointerBlocker = false;
        /** Gets or sets a boolean indicating if the control can be focusable */
        this.isFocusInvisible = false;
        this._clipChildren = true;
        this._clipContent = true;
        /**
         * Gets or sets a boolean indicating that the current control should cache its rendering (useful when the control does not change often)
         */
        this.useBitmapCache = false;
        this._shadowOffsetX = 0;
        this._shadowOffsetY = 0;
        this._shadowBlur = 0;
        this._previousShadowBlur = 0;
        this._shadowColor = "black";
        /** Gets or sets the cursor to use when the control is hovered */
        this.hoverCursor = "";
        /** @internal */
        this._linkOffsetX = new ValueAndUnit(0);
        /** @internal */
        this._linkOffsetY = new ValueAndUnit(0);
        this._accessibilityTag = null;
        /**
         * Observable that fires whenever the accessibility event of the control has changed
         */
        this.onAccessibilityTagChangedObservable = new Observable();
        /**
         * An event triggered when pointer wheel is scrolled
         */
        this.onWheelObservable = new Observable();
        /**
         * An event triggered when the pointer moves over the control.
         */
        this.onPointerMoveObservable = new Observable();
        /**
         * An event triggered when the pointer moves out of the control.
         */
        this.onPointerOutObservable = new Observable();
        /**
         * An event triggered when the pointer taps the control
         */
        this.onPointerDownObservable = new Observable();
        /**
         * An event triggered when pointer up
         */
        this.onPointerUpObservable = new Observable();
        /**
         * An event triggered when a control is clicked on
         */
        this.onPointerClickObservable = new Observable();
        /**
         * An event triggered when a control receives an ENTER key down event
         */
        this.onEnterPressedObservable = new Observable();
        /**
         * An event triggered when pointer enters the control
         */
        this.onPointerEnterObservable = new Observable();
        /**
         * An event triggered when the control is marked as dirty
         */
        this.onDirtyObservable = new Observable();
        /**
         * An event triggered before drawing the control
         */
        this.onBeforeDrawObservable = new Observable();
        /**
         * An event triggered after the control was drawn
         */
        this.onAfterDrawObservable = new Observable();
        /**
         * An event triggered when the control has been disposed
         */
        this.onDisposeObservable = new Observable();
        /**
         * An event triggered when the control isVisible is changed
         */
        this.onIsVisibleChangedObservable = new Observable();
        /**
         * Indicates if the control should be serialized. Defaults to true.
         */
        this.isSerializable = true;
        this._fixedRatio = 0;
        this._fixedRatioMasterIsWidth = true;
        /**
         * Array of animations
         */
        this.animations = null;
        // Focus functionality
        this._focusedColor = null;
        /**
         * The tab index of this control. -1 indicates this control is not part of the tab navigation.
         * A positive value indicates the order of the control in the tab navigation.
         * A value of 0 indicated the control will be focused after all controls with a positive index.
         * More than one control can have the same tab index and the navigation would then go through all controls with the same value in an order defined by the layout or the hierarchy.
         * The value can be changed at any time.
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
         */
        this.tabIndex = -1;
        this._isFocused = false;
        this._unfocusedColor = null;
        /** Observable raised when the control gets the focus */
        this.onFocusObservable = new Observable();
        /** Observable raised when the control loses the focus */
        this.onBlurObservable = new Observable();
        /** Observable raised when a key event was processed */
        this.onKeyboardEventProcessedObservable = new Observable();
        this._tmpMeasureA = new Measure(0, 0, 0, 0);
    }
    /** @internal */
    _getTypeName() {
        return "Control";
    }
    /**
     * Gets the first ascendant in the hierarchy of the given type
     * @param className defines the required type
     * @returns the ascendant or null if not found
     */
    getAscendantOfClass(className) {
        if (!this.parent) {
            return null;
        }
        if (this.parent.getClassName() === className) {
            return this.parent;
        }
        return this.parent.getAscendantOfClass(className);
    }
    /**
     * Mark control element as dirty
     * @param force force non visible elements to be marked too
     */
    markAsDirty(force = false) {
        this._markAsDirty(force);
    }
    /**
     * Mark the element and its children as dirty
     */
    markAllAsDirty() {
        this._markAllAsDirty();
    }
    /** @internal */
    _resetFontCache() {
        this._fontSet = true;
        this._markAsDirty();
    }
    /**
     * Determines if a container is an ascendant of the current control
     * @param container defines the container to look for
     * @returns true if the container is one of the ascendant of the control
     */
    isAscendant(container) {
        if (!this.parent) {
            return false;
        }
        if (this.parent === container) {
            return true;
        }
        return this.parent.isAscendant(container);
    }
    /**
     * Gets coordinates in local control space
     * @param globalCoordinates defines the coordinates to transform
     * @returns the new coordinates in local space
     */
    getLocalCoordinates(globalCoordinates) {
        const result = Vector2.Zero();
        this.getLocalCoordinatesToRef(globalCoordinates, result);
        return result;
    }
    /**
     * Gets coordinates in local control space
     * @param globalCoordinates defines the coordinates to transform
     * @param result defines the target vector2 where to store the result
     * @returns the current control
     */
    getLocalCoordinatesToRef(globalCoordinates, result) {
        result.x = globalCoordinates.x - this._currentMeasure.left;
        result.y = globalCoordinates.y - this._currentMeasure.top;
        return this;
    }
    /**
     * Gets coordinates in parent local control space
     * @param globalCoordinates defines the coordinates to transform
     * @returns the new coordinates in parent local space
     */
    getParentLocalCoordinates(globalCoordinates) {
        const result = Vector2.Zero();
        result.x = globalCoordinates.x - this._cachedParentMeasure.left;
        result.y = globalCoordinates.y - this._cachedParentMeasure.top;
        return result;
    }
    /**
     * Move the current control to a vector3 position projected onto the screen.
     * @param position defines the target position
     * @param scene defines the hosting scene
     */
    moveToVector3(position, scene) {
        if (!this._host || this.parent !== this._host._rootContainer) {
            Tools.Error("Cannot move a control to a vector3 if the control is not at root level");
            return;
        }
        this.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        const globalViewport = this._host._getGlobalViewport();
        const projectedPosition = Vector3.Project(position, Matrix.IdentityReadOnly, scene.getTransformMatrix(), globalViewport);
        this._moveToProjectedPosition(projectedPosition);
        if (projectedPosition.z < 0 || projectedPosition.z > 1) {
            this.notRenderable = true;
            return;
        }
        this.notRenderable = false;
    }
    /**
     * Will store all controls that have this control as ascendant in a given array
     * @param results defines the array where to store the descendants
     * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
     * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
     */
    getDescendantsToRef(results, directDescendantsOnly = false, predicate) {
        // Do nothing by default
    }
    /**
     * Will return all controls that have this control as ascendant
     * @param directDescendantsOnly defines if true only direct descendants of 'this' will be considered, if false direct and also indirect (children of children, an so on in a recursive manner) descendants of 'this' will be considered
     * @param predicate defines an optional predicate that will be called on every evaluated child, the predicate must return true for a given child to be part of the result, otherwise it will be ignored
     * @returns all child controls
     */
    getDescendants(directDescendantsOnly, predicate) {
        const results = [];
        this.getDescendantsToRef(results, directDescendantsOnly, predicate);
        return results;
    }
    /**
     * Link current control with a target mesh
     * @param mesh defines the mesh to link with
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#tracking-positions
     */
    linkWithMesh(mesh) {
        if (!this._host || (this.parent && this.parent !== this._host._rootContainer)) {
            if (mesh) {
                Tools.Error("Cannot link a control to a mesh if the control is not at root level");
            }
            return;
        }
        const index = this._host._linkedControls.indexOf(this);
        if (index !== -1) {
            this._linkedMesh = mesh;
            if (!mesh) {
                this._host._linkedControls.splice(index, 1);
            }
            return;
        }
        else if (!mesh) {
            return;
        }
        this.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this._linkedMesh = mesh;
        this._host._linkedControls.push(this);
    }
    /**
     * Shorthand function to set the top, right, bottom, and left padding values on the control.
     * @param { string | number} paddingTop - The value of the top padding.
     * @param { string | number} paddingRight - The value of the right padding. If omitted, top is used.
     * @param { string | number} paddingBottom - The value of the bottom padding. If omitted, top is used.
     * @param { string | number} paddingLeft - The value of the left padding. If omitted, right is used.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    setPadding(paddingTop, paddingRight, paddingBottom, paddingLeft) {
        const top = paddingTop;
        const right = paddingRight ?? top;
        const bottom = paddingBottom ?? top;
        const left = paddingLeft ?? right;
        this.paddingTop = top;
        this.paddingRight = right;
        this.paddingBottom = bottom;
        this.paddingLeft = left;
    }
    /**
     * Shorthand funtion to set the top, right, bottom, and left padding values in pixels on the control.
     * @param { number} paddingTop - The value in pixels of the top padding.
     * @param { number} paddingRight - The value in pixels of the right padding. If omitted, top is used.
     * @param { number} paddingBottom - The value in pixels of the bottom padding. If omitted, top is used.
     * @param { number} paddingLeft - The value in pixels of the left padding. If omitted, right is used.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#position-and-size
     */
    setPaddingInPixels(paddingTop, paddingRight, paddingBottom, paddingLeft) {
        const top = paddingTop;
        const right = paddingRight ?? top;
        const bottom = paddingBottom ?? top;
        const left = paddingLeft ?? right;
        this.paddingTopInPixels = top;
        this.paddingRightInPixels = right;
        this.paddingBottomInPixels = bottom;
        this.paddingLeftInPixels = left;
    }
    /**
     * @internal
     */
    _moveToProjectedPosition(projectedPosition) {
        const oldLeft = this._left.getValue(this._host);
        const oldTop = this._top.getValue(this._host);
        const parentMeasure = this.parent?._currentMeasure;
        if (parentMeasure) {
            this._processMeasures(parentMeasure, this._host.getContext());
        }
        let newLeft = projectedPosition.x + this._linkOffsetX.getValue(this._host) - this._currentMeasure.width / 2;
        let newTop = projectedPosition.y + this._linkOffsetY.getValue(this._host) - this._currentMeasure.height / 2;
        const leftAndTopIgnoreAdaptiveScaling = this._left.ignoreAdaptiveScaling && this._top.ignoreAdaptiveScaling;
        if (leftAndTopIgnoreAdaptiveScaling) {
            if (Math.abs(newLeft - oldLeft) < 0.5) {
                newLeft = oldLeft;
            }
            if (Math.abs(newTop - oldTop) < 0.5) {
                newTop = oldTop;
            }
        }
        if (!leftAndTopIgnoreAdaptiveScaling && oldLeft === newLeft && oldTop === newTop) {
            return;
        }
        this.left = newLeft + "px";
        this.top = newTop + "px";
        this._left.ignoreAdaptiveScaling = true;
        this._top.ignoreAdaptiveScaling = true;
        this._markAsDirty();
    }
    /**
     * @internal
     */
    _offsetLeft(offset) {
        this._isDirty = true;
        this._currentMeasure.left += offset;
    }
    /**
     * @internal
     */
    _offsetTop(offset) {
        this._isDirty = true;
        this._currentMeasure.top += offset;
    }
    /** @internal */
    _markMatrixAsDirty() {
        this._isMatrixDirty = true;
        this._flagDescendantsAsMatrixDirty();
    }
    /** @internal */
    _flagDescendantsAsMatrixDirty() {
        // No child
    }
    /**
     * @internal
     */
    _intersectsRect(rect, context) {
        // make sure we are transformed correctly before checking intersections. no-op if nothing is dirty.
        this._transform(context);
        if (this._evaluatedMeasure.left >= rect.left + rect.width) {
            return false;
        }
        if (this._evaluatedMeasure.top >= rect.top + rect.height) {
            return false;
        }
        if (this._evaluatedMeasure.left + this._evaluatedMeasure.width <= rect.left) {
            return false;
        }
        if (this._evaluatedMeasure.top + this._evaluatedMeasure.height <= rect.top) {
            return false;
        }
        return true;
    }
    /** @internal */
    _computeAdditionalOffsetX() {
        return 0;
    }
    /** @internal */
    _computeAdditionalOffsetY() {
        return 0;
    }
    /** @internal */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    invalidateRect() {
        this._transform();
        if (this.host && this.host.useInvalidateRectOptimization) {
            // Rotate by transform to get the measure transformed to global space
            this._currentMeasure.transformToRef(this._transformMatrix, this._tmpMeasureA);
            // get the boudning box of the current measure and last frames measure in global space and invalidate it
            // the previous measure is used to properly clear a control that is scaled down
            Measure.CombineToRef(this._tmpMeasureA, this._prevCurrentMeasureTransformedIntoGlobalSpace, this._tmpMeasureA);
            // Expand rect based on shadows
            const shadowOffsetX = this.shadowOffsetX;
            const shadowOffsetY = this.shadowOffsetY;
            const shadowBlur = Math.max(this._previousShadowBlur, this.shadowBlur);
            const leftShadowOffset = Math.min(Math.min(shadowOffsetX, 0) - shadowBlur * 2, 0);
            const rightShadowOffset = Math.max(Math.max(shadowOffsetX, 0) + shadowBlur * 2, 0);
            const topShadowOffset = Math.min(Math.min(shadowOffsetY, 0) - shadowBlur * 2, 0);
            const bottomShadowOffset = Math.max(Math.max(shadowOffsetY, 0) + shadowBlur * 2, 0);
            const offsetX = this._computeAdditionalOffsetX();
            const offsetY = this._computeAdditionalOffsetY();
            this.host.invalidateRect(Math.floor(this._tmpMeasureA.left + leftShadowOffset - offsetX), Math.floor(this._tmpMeasureA.top + topShadowOffset - offsetY), Math.ceil(this._tmpMeasureA.left + this._tmpMeasureA.width + rightShadowOffset + offsetX), Math.ceil(this._tmpMeasureA.top + this._tmpMeasureA.height + bottomShadowOffset + offsetY));
        }
    }
    /**
     * @internal
     */
    _markAsDirty(force = false) {
        if (!this._isVisible && !force) {
            return;
        }
        this._isDirty = true;
        this._markMatrixAsDirty();
        // Redraw only this rectangle
        if (this._host) {
            this._host.markAsDirty();
        }
    }
    /** @internal */
    _markAllAsDirty() {
        this._markAsDirty();
        if (this._font) {
            this._prepareFont();
        }
    }
    /**
     * @internal
     */
    _link(host) {
        this._host = host;
        if (this._host) {
            this.uniqueId = this._host.getScene().getUniqueId();
        }
    }
    /**
     * @internal
     */
    _transform(context) {
        if (!this._isMatrixDirty && this._scaleX === 1 && this._scaleY === 1 && this._rotation === 0) {
            return;
        }
        // postTranslate
        const offsetX = this._currentMeasure.width * this._transformCenterX + this._currentMeasure.left;
        const offsetY = this._currentMeasure.height * this._transformCenterY + this._currentMeasure.top;
        if (context) {
            context.translate(offsetX, offsetY);
            // rotate
            context.rotate(this._rotation);
            // scale
            context.scale(this._scaleX, this._scaleY);
            // preTranslate
            context.translate(-offsetX, -offsetY);
        }
        // Need to update matrices?
        if (this._isMatrixDirty || this._cachedOffsetX !== offsetX || this._cachedOffsetY !== offsetY) {
            this._cachedOffsetX = offsetX;
            this._cachedOffsetY = offsetY;
            this._isMatrixDirty = false;
            this._flagDescendantsAsMatrixDirty();
            Matrix2D.ComposeToRef(-offsetX, -offsetY, this._rotation, this._scaleX, this._scaleY, this.parent ? this.parent._transformMatrix : null, this._transformMatrix);
            this._transformMatrix.invertToRef(this._invertTransformMatrix);
            this._currentMeasure.transformToRef(this._transformMatrix, this._evaluatedMeasure);
        }
    }
    /**
     * @internal
     */
    _renderHighlight(context) {
        if (!this.isHighlighted) {
            return;
        }
        context.save();
        context.strokeStyle = this._highlightColor;
        context.lineWidth = this._highlightLineWidth;
        this._renderHighlightSpecific(context);
        context.restore();
    }
    /**
     * @internal
     */
    _renderHighlightSpecific(context) {
        context.strokeRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
    }
    _getColor(context) {
        return this.gradient ? this.gradient.getCanvasGradient(context) : this.color;
    }
    /**
     * @internal
     */
    _applyStates(context) {
        if (this._isFontSizeInPercentage) {
            this._fontSet = true;
        }
        if (this._host && this._host.useSmallestIdeal && !this._font) {
            this._fontSet = true;
        }
        if (this._fontSet) {
            this._prepareFont();
            this._fontSet = false;
        }
        if (this._font) {
            context.font = this._font;
        }
        if (this._color || this.gradient) {
            context.fillStyle = this._getColor(context);
        }
        if (Control.AllowAlphaInheritance) {
            context.globalAlpha *= this._alpha;
        }
        else if (this._alphaSet) {
            context.globalAlpha = this.parent && !this.parent.renderToIntermediateTexture ? this.parent.alpha * this._alpha : this._alpha;
        }
    }
    /**
     * @internal
     */
    _layout(parentMeasure, context) {
        if (!this.isDirty && (!this.isVisible || this.notRenderable)) {
            return false;
        }
        if (this._isDirty || !this._cachedParentMeasure.isEqualsTo(parentMeasure)) {
            this.host._numLayoutCalls++;
            this._currentMeasure.addAndTransformToRef(this._transformMatrix, -this._paddingLeftInPixels | 0, -this._paddingTopInPixels | 0, this._paddingRightInPixels | 0, this._paddingBottomInPixels | 0, this._prevCurrentMeasureTransformedIntoGlobalSpace);
            context.save();
            this._applyStates(context);
            let rebuildCount = 0;
            do {
                this._rebuildLayout = false;
                this._processMeasures(parentMeasure, context);
                rebuildCount++;
            } while (this._rebuildLayout && rebuildCount < 3);
            if (rebuildCount >= 3) {
                Logger.Error(`Layout cycle detected in GUI (Control name=${this.name}, uniqueId=${this.uniqueId})`);
            }
            context.restore();
            this.invalidateRect();
            this._evaluateClippingState(parentMeasure);
        }
        this._wasDirty = this._isDirty;
        this._isDirty = false;
        return true;
    }
    /**
     * @internal
     */
    _processMeasures(parentMeasure, context) {
        this._tempPaddingMeasure.copyFrom(parentMeasure);
        // Apply padding if in correct mode
        if (this.parent && this.parent.descendantsOnlyPadding) {
            this._tempPaddingMeasure.left += this.parent.paddingLeftInPixels;
            this._tempPaddingMeasure.top += this.parent.paddingTopInPixels;
            this._tempPaddingMeasure.width -= this.parent.paddingLeftInPixels + this.parent.paddingRightInPixels;
            this._tempPaddingMeasure.height -= this.parent.paddingTopInPixels + this.parent.paddingBottomInPixels;
        }
        this._currentMeasure.copyFrom(this._tempPaddingMeasure);
        // Let children take some pre-measurement actions
        this._preMeasure(this._tempPaddingMeasure, context);
        this._measure();
        // Let children take some post-measurement actions
        this._postMeasure(this._tempPaddingMeasure, context);
        this._computeAlignment(this._tempPaddingMeasure, context);
        // Convert to int values
        this._currentMeasure.left = this._currentMeasure.left | 0;
        this._currentMeasure.top = this._currentMeasure.top | 0;
        this._currentMeasure.width = this._currentMeasure.width | 0;
        this._currentMeasure.height = this._currentMeasure.height | 0;
        // Let children add more features
        this._additionalProcessing(this._tempPaddingMeasure, context);
        this._cachedParentMeasure.copyFrom(this._tempPaddingMeasure);
        this._currentMeasure.transformToRef(this._transformMatrix, this._evaluatedMeasure);
        if (this.onDirtyObservable.hasObservers()) {
            this.onDirtyObservable.notifyObservers(this);
        }
    }
    _evaluateClippingState(parentMeasure) {
        // Since transformMatrix is used here, we need to have it freshly computed
        this._transform();
        this._currentMeasure.transformToRef(this._transformMatrix, this._evaluatedMeasure);
        if (this.parent && this.parent.clipChildren) {
            parentMeasure.transformToRef(this.parent._transformMatrix, this._evaluatedParentMeasure);
            // Early clip
            if (this._evaluatedMeasure.left > this._evaluatedParentMeasure.left + this._evaluatedParentMeasure.width) {
                this._isClipped = true;
                return;
            }
            if (this._evaluatedMeasure.left + this._evaluatedMeasure.width < this._evaluatedParentMeasure.left) {
                this._isClipped = true;
                return;
            }
            if (this._evaluatedMeasure.top > this._evaluatedParentMeasure.top + this._evaluatedParentMeasure.height) {
                this._isClipped = true;
                return;
            }
            if (this._evaluatedMeasure.top + this._evaluatedMeasure.height < this._evaluatedParentMeasure.top) {
                this._isClipped = true;
                return;
            }
        }
        this._isClipped = false;
    }
    /** @internal */
    _measure() {
        // Width / Height
        if (this._width.isPixel) {
            this._currentMeasure.width = this._width.getValue(this._host);
        }
        else {
            this._currentMeasure.width *= this._width.getValue(this._host);
        }
        if (this._height.isPixel) {
            this._currentMeasure.height = this._height.getValue(this._host);
        }
        else {
            this._currentMeasure.height *= this._height.getValue(this._host);
        }
        if (this._fixedRatio !== 0) {
            if (this._fixedRatioMasterIsWidth) {
                this._currentMeasure.height = this._currentMeasure.width * this._fixedRatio;
            }
            else {
                this._currentMeasure.width = this._currentMeasure.height * this._fixedRatio;
            }
        }
    }
    /**
     * @internal
     */
    _computeAlignment(parentMeasure, context) {
        const width = this._currentMeasure.width;
        const height = this._currentMeasure.height;
        const parentWidth = parentMeasure.width;
        const parentHeight = parentMeasure.height;
        // Left / top
        let x = 0;
        let y = 0;
        switch (this.horizontalAlignment) {
            case Control.HORIZONTAL_ALIGNMENT_LEFT:
                x = 0;
                break;
            case Control.HORIZONTAL_ALIGNMENT_RIGHT:
                x = parentWidth - width;
                break;
            case Control.HORIZONTAL_ALIGNMENT_CENTER:
                x = (parentWidth - width) / 2;
                break;
        }
        switch (this.verticalAlignment) {
            case Control.VERTICAL_ALIGNMENT_TOP:
                y = 0;
                break;
            case Control.VERTICAL_ALIGNMENT_BOTTOM:
                y = parentHeight - height;
                break;
            case Control.VERTICAL_ALIGNMENT_CENTER:
                y = (parentHeight - height) / 2;
                break;
        }
        if (!this.descendantsOnlyPadding) {
            if (this._paddingLeft.isPixel) {
                this._currentMeasure.left += this._paddingLeft.getValue(this._host);
                this._currentMeasure.width -= this._paddingLeft.getValue(this._host);
            }
            else {
                this._currentMeasure.left += parentWidth * this._paddingLeft.getValue(this._host);
                this._currentMeasure.width -= parentWidth * this._paddingLeft.getValue(this._host);
            }
            if (this._paddingRight.isPixel) {
                this._currentMeasure.width -= this._paddingRight.getValue(this._host);
            }
            else {
                this._currentMeasure.width -= parentWidth * this._paddingRight.getValue(this._host);
            }
            if (this._paddingTop.isPixel) {
                this._currentMeasure.top += this._paddingTop.getValue(this._host);
                this._currentMeasure.height -= this._paddingTop.getValue(this._host);
            }
            else {
                this._currentMeasure.top += parentHeight * this._paddingTop.getValue(this._host);
                this._currentMeasure.height -= parentHeight * this._paddingTop.getValue(this._host);
            }
            if (this._paddingBottom.isPixel) {
                this._currentMeasure.height -= this._paddingBottom.getValue(this._host);
            }
            else {
                this._currentMeasure.height -= parentHeight * this._paddingBottom.getValue(this._host);
            }
        }
        if (this._left.isPixel) {
            this._currentMeasure.left += this._left.getValue(this._host);
        }
        else {
            this._currentMeasure.left += parentWidth * this._left.getValue(this._host);
        }
        if (this._top.isPixel) {
            this._currentMeasure.top += this._top.getValue(this._host);
        }
        else {
            this._currentMeasure.top += parentHeight * this._top.getValue(this._host);
        }
        this._currentMeasure.left += x;
        this._currentMeasure.top += y;
    }
    /**
     * @internal
     */
    _preMeasure(parentMeasure, context) {
        // Do nothing
    }
    /**
     * @internal
     */
    _postMeasure(parentMeasure, context) {
        // Do nothing
    }
    /**
     * @internal
     */
    _additionalProcessing(parentMeasure, context) {
        // Do nothing
    }
    /**
     * @internal
     */
    _clipForChildren(context) {
        // DO nothing
    }
    _clip(context, invalidatedRectangle) {
        context.beginPath();
        Control._ClipMeasure.copyFrom(this._currentMeasure);
        if (invalidatedRectangle) {
            // Rotate the invalidated rect into the control's space
            invalidatedRectangle.transformToRef(this._invertTransformMatrix, this._tmpMeasureA);
            // Get the intersection of the rect in context space and the current context
            const intersection = new Measure(0, 0, 0, 0);
            intersection.left = Math.max(this._tmpMeasureA.left, this._currentMeasure.left);
            intersection.top = Math.max(this._tmpMeasureA.top, this._currentMeasure.top);
            intersection.width = Math.min(this._tmpMeasureA.left + this._tmpMeasureA.width, this._currentMeasure.left + this._currentMeasure.width) - intersection.left;
            intersection.height = Math.min(this._tmpMeasureA.top + this._tmpMeasureA.height, this._currentMeasure.top + this._currentMeasure.height) - intersection.top;
            Control._ClipMeasure.copyFrom(intersection);
        }
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            const shadowOffsetX = this.shadowOffsetX;
            const shadowOffsetY = this.shadowOffsetY;
            const shadowBlur = this.shadowBlur;
            const leftShadowOffset = Math.min(Math.min(shadowOffsetX, 0) - shadowBlur * 2, 0);
            const rightShadowOffset = Math.max(Math.max(shadowOffsetX, 0) + shadowBlur * 2, 0);
            const topShadowOffset = Math.min(Math.min(shadowOffsetY, 0) - shadowBlur * 2, 0);
            const bottomShadowOffset = Math.max(Math.max(shadowOffsetY, 0) + shadowBlur * 2, 0);
            context.rect(Control._ClipMeasure.left + leftShadowOffset, Control._ClipMeasure.top + topShadowOffset, Control._ClipMeasure.width + rightShadowOffset - leftShadowOffset, Control._ClipMeasure.height + bottomShadowOffset - topShadowOffset);
        }
        else {
            context.rect(Control._ClipMeasure.left, Control._ClipMeasure.top, Control._ClipMeasure.width, Control._ClipMeasure.height);
        }
        context.clip();
    }
    /**
     * @internal
     */
    _render(context, invalidatedRectangle) {
        if (!this.isVisible || this.notRenderable || this._isClipped) {
            this._isDirty = false;
            return false;
        }
        this.host._numRenderCalls++;
        context.save();
        this._applyStates(context);
        // Transform
        this._transform(context);
        // Clip
        if (this.clipContent) {
            this._clip(context, invalidatedRectangle);
        }
        if (this.onBeforeDrawObservable.hasObservers()) {
            this.onBeforeDrawObservable.notifyObservers(this);
        }
        if (this.useBitmapCache && !this._wasDirty && this._cacheData) {
            context.putImageData(this._cacheData, this._currentMeasure.left, this._currentMeasure.top);
        }
        else {
            this._draw(context, invalidatedRectangle);
        }
        if (this.useBitmapCache && this._wasDirty) {
            this._cacheData = context.getImageData(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
        }
        this._renderHighlight(context);
        if (this.onAfterDrawObservable.hasObservers()) {
            this.onAfterDrawObservable.notifyObservers(this);
        }
        context.restore();
        return true;
    }
    /**
     * @internal
     */
    _draw(context, invalidatedRectangle) {
        // Do nothing
    }
    /**
     * Tests if a given coordinates belong to the current control
     * @param x defines x coordinate to test
     * @param y defines y coordinate to test
     * @returns true if the coordinates are inside the control
     */
    contains(x, y) {
        // Invert transform
        this._invertTransformMatrix.transformCoordinates(x, y, this._transformedPosition);
        x = this._transformedPosition.x;
        y = this._transformedPosition.y;
        // Check
        if (x < this._currentMeasure.left) {
            return false;
        }
        if (x > this._currentMeasure.left + this._currentMeasure.width) {
            return false;
        }
        if (y < this._currentMeasure.top) {
            return false;
        }
        if (y > this._currentMeasure.top + this._currentMeasure.height) {
            return false;
        }
        if (this.isPointerBlocker) {
            this._host._shouldBlockPointer = true;
        }
        return true;
    }
    /**
     * @internal
     */
    _processPicking(x, y, pi, type, pointerId, buttonIndex, deltaX, deltaY) {
        if (!this._isEnabled) {
            return false;
        }
        if (!this.isHitTestVisible || !this.isVisible || this._doNotRender) {
            return false;
        }
        if (!this.contains(x, y)) {
            return false;
        }
        this._processObservables(type, x, y, pi, pointerId, buttonIndex, deltaX, deltaY);
        return true;
    }
    /**
     * @internal
     */
    _onPointerMove(target, coordinates, pointerId, pi) {
        const canNotify = this.onPointerMoveObservable.notifyObservers(coordinates, -1, target, this, pi);
        if (canNotify && this.parent != null && !this.isPointerBlocker) {
            this.parent._onPointerMove(target, coordinates, pointerId, pi);
        }
    }
    /**
     * @internal
     */
    _onPointerEnter(target, pi) {
        if (!this._isEnabled) {
            return false;
        }
        if (this._enterCount > 0) {
            return false;
        }
        if (this._enterCount === -1) {
            // -1 is for touch input, we are now sure we are with a mouse or pencil
            this._enterCount = 0;
        }
        this._enterCount++;
        const canNotify = this.onPointerEnterObservable.notifyObservers(this, -1, target, this, pi);
        if (canNotify && this.parent != null && !this.isPointerBlocker) {
            this.parent._onPointerEnter(target, pi);
        }
        return true;
    }
    /**
     * @internal
     */
    _onPointerOut(target, pi, force = false) {
        if (!force && !this._isEnabled) {
            return;
        }
        this._enterCount = 0;
        let canNotify = true;
        if (!target.isAscendant(this)) {
            canNotify = this.onPointerOutObservable.notifyObservers(this, -1, target, this, pi);
        }
        if (canNotify && this.parent != null && !this.isPointerBlocker) {
            this.parent._onPointerOut(target, pi, force);
        }
    }
    /**
     * @internal
     */
    _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
        // Prevent pointerout to lose control context.
        // Event redundancy is checked inside the function.
        this._onPointerEnter(this, pi);
        if (this.tabIndex !== -1) {
            this.host.focusedControl = this;
        }
        if (this._downCount !== 0) {
            return false;
        }
        this._downCount++;
        this._downPointerIds[pointerId] = true;
        const canNotify = this.onPointerDownObservable.notifyObservers(new Vector2WithInfo(coordinates, buttonIndex), -1, target, this, pi);
        if (canNotify && this.parent != null && !this.isPointerBlocker) {
            this.parent._onPointerDown(target, coordinates, pointerId, buttonIndex, pi);
        }
        if (pi && this.uniqueId !== this._host.rootContainer.uniqueId) {
            this._host._capturedPointerIds.add(pi.event.pointerId);
        }
        return true;
    }
    /**
     * @internal
     */
    _onPointerUp(target, coordinates, pointerId, buttonIndex, notifyClick, pi) {
        if (!this._isEnabled) {
            return;
        }
        this._downCount = 0;
        delete this._downPointerIds[pointerId];
        let canNotifyClick = notifyClick;
        if (notifyClick && (this._enterCount > 0 || this._enterCount === -1)) {
            if (!this._host.usePointerTapForClickEvent) {
                canNotifyClick = this.onPointerClickObservable.notifyObservers(new Vector2WithInfo(coordinates, buttonIndex), -1, target, this, pi);
            }
        }
        const canNotify = this.onPointerUpObservable.notifyObservers(new Vector2WithInfo(coordinates, buttonIndex), -1, target, this, pi);
        if (canNotify && this.parent != null && !this.isPointerBlocker) {
            this.parent._onPointerUp(target, coordinates, pointerId, buttonIndex, canNotifyClick, pi);
        }
        if (pi && this.uniqueId !== this._host.rootContainer.uniqueId) {
            this._host._capturedPointerIds.delete(pi.event.pointerId);
        }
        if (this._host.usePointerTapForClickEvent && this.isPointerBlocker) {
            this._host._shouldBlockPointer = false;
        }
    }
    _onPointerPick(target, coordinates, pointerId, buttonIndex, notifyClick, pi) {
        if (!this._host.usePointerTapForClickEvent) {
            return false;
        }
        let canNotifyClick = notifyClick;
        if (notifyClick && (this._enterCount > 0 || this._enterCount === -1)) {
            canNotifyClick = this.onPointerClickObservable.notifyObservers(new Vector2WithInfo(coordinates, buttonIndex), -1, target, this, pi);
        }
        const canNotify = this.onPointerUpObservable.notifyObservers(new Vector2WithInfo(coordinates, buttonIndex), -1, target, this, pi);
        if (canNotify && this.parent != null && !this.isPointerBlocker) {
            this.parent._onPointerPick(target, coordinates, pointerId, buttonIndex, canNotifyClick, pi);
        }
        if (this._host.usePointerTapForClickEvent && this.isPointerBlocker) {
            this._host._shouldBlockPointer = true;
        }
        return true;
    }
    /**
     * @internal
     */
    _forcePointerUp(pointerId = null) {
        if (pointerId !== null) {
            this._onPointerUp(this, Vector2.Zero(), pointerId, 0, true);
        }
        else {
            for (const key in this._downPointerIds) {
                this._onPointerUp(this, Vector2.Zero(), +key, 0, true);
            }
        }
    }
    /**
     * @internal
     */
    _onWheelScroll(deltaX, deltaY) {
        if (!this._isEnabled) {
            return;
        }
        const canNotify = this.onWheelObservable.notifyObservers(new Vector2(deltaX, deltaY));
        if (canNotify && this.parent != null) {
            this.parent._onWheelScroll(deltaX, deltaY);
        }
    }
    /** @internal */
    _onCanvasBlur() { }
    /**
     * @internal
     */
    _processObservables(type, x, y, pi, pointerId, buttonIndex, deltaX, deltaY) {
        if (!this._isEnabled) {
            return false;
        }
        this._dummyVector2.copyFromFloats(x, y);
        if (type === PointerEventTypes.POINTERMOVE) {
            this._onPointerMove(this, this._dummyVector2, pointerId, pi);
            const previousControlOver = this._host._lastControlOver[pointerId];
            if (previousControlOver && previousControlOver !== this) {
                previousControlOver._onPointerOut(this, pi);
            }
            if (previousControlOver !== this) {
                this._onPointerEnter(this, pi);
            }
            this._host._lastControlOver[pointerId] = this;
            return true;
        }
        else if (type === PointerEventTypes.POINTERDOWN) {
            this._onPointerDown(this, this._dummyVector2, pointerId, buttonIndex, pi);
            this._host._registerLastControlDown(this, pointerId);
            this._host._lastPickedControl = this;
            return true;
        }
        else if (type === PointerEventTypes.POINTERUP) {
            if (this._host._lastControlDown[pointerId]) {
                this._host._lastControlDown[pointerId]._onPointerUp(this, this._dummyVector2, pointerId, buttonIndex, true, pi);
            }
            if (!this._host.usePointerTapForClickEvent) {
                delete this._host._lastControlDown[pointerId];
            }
            return true;
        }
        else if (type === PointerEventTypes.POINTERWHEEL) {
            if (this._host._lastControlOver[pointerId]) {
                this._host._lastControlOver[pointerId]._onWheelScroll(deltaX, deltaY);
                return true;
            }
        }
        else if (type === PointerEventTypes.POINTERTAP) {
            if (this._host._lastControlDown[pointerId]) {
                this._host._lastControlDown[pointerId]._onPointerPick(this, this._dummyVector2, pointerId, buttonIndex, true, pi);
            }
            delete this._host._lastControlDown[pointerId];
            return true;
        }
        return false;
    }
    _getStyleProperty(propName, defaultValue) {
        const prop = (this._style && this._style[propName]) ?? this[propName];
        if (!prop && this.parent) {
            return this.parent._getStyleProperty(propName, defaultValue);
        }
        else if (!this.parent) {
            return defaultValue;
        }
        else {
            return prop;
        }
    }
    _prepareFont() {
        if (!this._font && !this._fontSet) {
            return;
        }
        this._font =
            this._getStyleProperty("fontStyle", "") +
                " " +
                this._getStyleProperty("fontWeight", "") +
                " " +
                this.fontSizeInPixels +
                "px " +
                this._getStyleProperty("fontFamily", "Arial");
        this._fontOffset = Control._GetFontOffset(this._font, this._host?.getScene()?.getEngine());
        //children need to be refreshed
        this.getDescendants().forEach((child) => child._markAllAsDirty());
    }
    /**
     * A control has a dimension fully defined if that dimension doesn't depend on the parent's dimension.
     * As an example, a control that has dimensions in pixels is fully defined, while in percentage is not fully defined.
     * @param dim the dimension to check (width or height)
     * @returns if the dimension is fully defined
     */
    isDimensionFullyDefined(dim) {
        return this.getDimension(dim).isPixel;
    }
    /**
     * Gets the dimension of the control along a specified axis
     * @param dim the dimension to retrieve (width or height)
     * @returns the dimension value along the specified axis
     */
    getDimension(dim) {
        if (dim === "width") {
            return this._width;
        }
        else {
            return this._height;
        }
    }
    /**
     * Clones a control and its descendants
     * @param host the texture where the control will be instantiated. Can be empty, in which case the control will be created on the same texture
     * @returns the cloned control
     */
    clone(host) {
        const serialization = {};
        this.serialize(serialization, true);
        const controlType = Tools.Instantiate("BABYLON.GUI." + serialization.className);
        const cloned = new controlType();
        cloned.parse(serialization, host);
        return cloned;
    }
    /**
     * Parses a serialized object into this control
     * @param serializedObject the object with the serialized properties
     * @param host the texture where the control will be instantiated. Can be empty, in which case the control will be created on the same texture
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @returns this control
     */
    parse(serializedObject, host, urlRewriter) {
        this._urlRewriter = urlRewriter;
        SerializationHelper.Parse(() => this, serializedObject, null);
        this.name = serializedObject.name;
        this._parseFromContent(serializedObject, host ?? this._host);
        return this;
    }
    /**
     * Serializes the current control
     * @param serializationObject defined the JSON serialized object
     * @param force if the control should be serialized even if the isSerializable flag is set to false (default false)
     * @param allowCanvas defines if the control is allowed to use a Canvas2D object to serialize (true by default)
     */
    serialize(serializationObject, force = false, allowCanvas = true) {
        if (!this.isSerializable && !force) {
            return;
        }
        SerializationHelper.Serialize(this, serializationObject);
        serializationObject.name = this.name;
        serializationObject.className = this.getClassName();
        // Call prepareFont to guarantee the font is properly set before serializing
        if (allowCanvas) {
            this._prepareFont();
        }
        if (this._fontFamily) {
            serializationObject.fontFamily = this._fontFamily;
        }
        if (this.fontSize) {
            serializationObject.fontSize = this.fontSize;
        }
        if (this.fontWeight) {
            serializationObject.fontWeight = this.fontWeight;
        }
        if (this.fontStyle) {
            serializationObject.fontStyle = this.fontStyle;
        }
        if (this._gradient) {
            serializationObject.gradient = {};
            this._gradient.serialize(serializationObject.gradient);
        }
        // Animations
        SerializationHelper.AppendSerializedAnimations(this, serializationObject);
    }
    /**
     * @internal
     */
    _parseFromContent(serializedObject, host, urlRewriter) {
        if (serializedObject.fontFamily) {
            this.fontFamily = serializedObject.fontFamily;
        }
        if (serializedObject.fontSize) {
            this.fontSize = serializedObject.fontSize;
        }
        if (serializedObject.fontWeight) {
            this.fontWeight = serializedObject.fontWeight;
        }
        if (serializedObject.fontStyle) {
            this.fontStyle = serializedObject.fontStyle;
        }
        // Gradient
        if (serializedObject.gradient) {
            const className = Tools.Instantiate("BABYLON.GUI." + serializedObject.gradient.className);
            this._gradient = new className();
            this._gradient?.parse(serializedObject.gradient);
        }
        // Animations
        if (serializedObject.animations) {
            this.animations = [];
            for (let animationIndex = 0; animationIndex < serializedObject.animations.length; animationIndex++) {
                const parsedAnimation = serializedObject.animations[animationIndex];
                const internalClass = GetClass("BABYLON.Animation");
                if (internalClass) {
                    this.animations.push(internalClass.Parse(parsedAnimation));
                }
            }
            if (serializedObject.autoAnimate && this._host && this._host.getScene()) {
                this._host
                    .getScene()
                    .beginAnimation(this, serializedObject.autoAnimateFrom, serializedObject.autoAnimateTo, serializedObject.autoAnimateLoop, serializedObject.autoAnimateSpeed || 1.0);
            }
        }
        this.fixedRatioMasterIsWidth = serializedObject.fixedRatioMasterIsWidth ?? this.fixedRatioMasterIsWidth;
    }
    /** Releases associated resources */
    dispose() {
        this.onDirtyObservable.clear();
        this.onBeforeDrawObservable.clear();
        this.onAfterDrawObservable.clear();
        this.onPointerDownObservable.clear();
        this.onPointerEnterObservable.clear();
        this.onPointerMoveObservable.clear();
        this.onPointerOutObservable.clear();
        this.onPointerUpObservable.clear();
        this.onPointerClickObservable.clear();
        this.onWheelObservable.clear();
        // focus
        this.onBlurObservable.clear();
        this.onFocusObservable.clear();
        this.onKeyboardEventProcessedObservable.clear();
        if (this._styleObserver && this._style) {
            this._style.onChangedObservable.remove(this._styleObserver);
            this._styleObserver = null;
        }
        if (this.parent) {
            this.parent.removeControl(this);
            this.parent = null;
        }
        if (this._host) {
            const index = this._host._linkedControls.indexOf(this);
            if (index > -1) {
                this.linkWithMesh(null);
            }
        }
        // Callback
        this.onDisposeObservable.notifyObservers(this);
        this.onDisposeObservable.clear();
    }
    /** HORIZONTAL_ALIGNMENT_LEFT */
    static get HORIZONTAL_ALIGNMENT_LEFT() {
        return Control._HORIZONTAL_ALIGNMENT_LEFT;
    }
    /** HORIZONTAL_ALIGNMENT_RIGHT */
    static get HORIZONTAL_ALIGNMENT_RIGHT() {
        return Control._HORIZONTAL_ALIGNMENT_RIGHT;
    }
    /** HORIZONTAL_ALIGNMENT_CENTER */
    static get HORIZONTAL_ALIGNMENT_CENTER() {
        return Control._HORIZONTAL_ALIGNMENT_CENTER;
    }
    /** VERTICAL_ALIGNMENT_TOP */
    static get VERTICAL_ALIGNMENT_TOP() {
        return Control._VERTICAL_ALIGNMENT_TOP;
    }
    /** VERTICAL_ALIGNMENT_BOTTOM */
    static get VERTICAL_ALIGNMENT_BOTTOM() {
        return Control._VERTICAL_ALIGNMENT_BOTTOM;
    }
    /** VERTICAL_ALIGNMENT_CENTER */
    static get VERTICAL_ALIGNMENT_CENTER() {
        return Control._VERTICAL_ALIGNMENT_CENTER;
    }
    /**
     * @internal
     */
    static _GetFontOffset(font, engineToUse) {
        if (Control._FontHeightSizes[font]) {
            return Control._FontHeightSizes[font];
        }
        const engine = engineToUse || EngineStore.LastCreatedEngine;
        if (!engine) {
            throw new Error("Invalid engine. Unable to create a canvas.");
        }
        const result = engine.getFontOffset(font);
        Control._FontHeightSizes[font] = result;
        return result;
    }
    /**
     * Creates a Control from parsed data
     * @param serializedObject defines parsed data
     * @param host defines the hosting AdvancedDynamicTexture
     * @param urlRewriter defines an url rewriter to update urls before sending them to the controls
     * @returns a new Control
     */
    static Parse(serializedObject, host, urlRewriter) {
        const controlType = Tools.Instantiate("BABYLON.GUI." + serializedObject.className);
        const control = SerializationHelper.Parse(() => {
            const newControl = new controlType();
            newControl._urlRewriter = urlRewriter;
            return newControl;
        }, serializedObject, null);
        control.name = serializedObject.name;
        control._parseFromContent(serializedObject, host, urlRewriter);
        return control;
    }
    /**
     * @internal
     */
    static drawEllipse(x, y, width, height, arc, context) {
        context.translate(x, y);
        context.scale(width, height);
        context.beginPath();
        context.arc(0, 0, 1, 0, 2 * Math.PI * arc, arc < 0);
        if (arc >= 1) {
            context.closePath();
        }
        context.scale(1 / width, 1 / height);
        context.translate(-x, -y);
    }
    /**
     * Returns true if the control is ready to be used
     * @returns
     */
    isReady() {
        // Most controls are ready by default, so the default implementation is to return true
        return true;
    }
}
/**
 * Gets or sets a boolean indicating if alpha must be an inherited value (false by default)
 */
Control.AllowAlphaInheritance = false;
Control._ClipMeasure = new Measure(0, 0, 0, 0);
// Statics
Control._HORIZONTAL_ALIGNMENT_LEFT = 0;
Control._HORIZONTAL_ALIGNMENT_RIGHT = 1;
Control._HORIZONTAL_ALIGNMENT_CENTER = 2;
Control._VERTICAL_ALIGNMENT_TOP = 0;
Control._VERTICAL_ALIGNMENT_BOTTOM = 1;
Control._VERTICAL_ALIGNMENT_CENTER = 2;
Control._FontHeightSizes = {};
Control.AddHeader = () => { };
__decorate([
    serialize()
], Control.prototype, "metadata", void 0);
__decorate([
    serialize()
], Control.prototype, "isHitTestVisible", void 0);
__decorate([
    serialize()
], Control.prototype, "isPointerBlocker", void 0);
__decorate([
    serialize()
], Control.prototype, "isFocusInvisible", void 0);
__decorate([
    serialize()
], Control.prototype, "clipChildren", null);
__decorate([
    serialize()
], Control.prototype, "clipContent", null);
__decorate([
    serialize()
], Control.prototype, "useBitmapCache", void 0);
__decorate([
    serialize()
], Control.prototype, "shadowOffsetX", null);
__decorate([
    serialize()
], Control.prototype, "shadowOffsetY", null);
__decorate([
    serialize()
], Control.prototype, "shadowBlur", null);
__decorate([
    serialize()
], Control.prototype, "shadowColor", null);
__decorate([
    serialize()
], Control.prototype, "hoverCursor", void 0);
__decorate([
    serialize()
], Control.prototype, "fontOffset", null);
__decorate([
    serialize()
], Control.prototype, "alpha", null);
__decorate([
    serialize()
], Control.prototype, "isSerializable", void 0);
__decorate([
    serialize()
], Control.prototype, "scaleX", null);
__decorate([
    serialize()
], Control.prototype, "scaleY", null);
__decorate([
    serialize()
], Control.prototype, "rotation", null);
__decorate([
    serialize()
], Control.prototype, "transformCenterY", null);
__decorate([
    serialize()
], Control.prototype, "transformCenterX", null);
__decorate([
    serialize()
], Control.prototype, "horizontalAlignment", null);
__decorate([
    serialize()
], Control.prototype, "verticalAlignment", null);
__decorate([
    serialize()
], Control.prototype, "fixedRatio", null);
__decorate([
    serialize()
], Control.prototype, "fixedRatioMasterIsWidth", null);
__decorate([
    serialize()
], Control.prototype, "width", null);
__decorate([
    serialize()
], Control.prototype, "height", null);
__decorate([
    serialize()
], Control.prototype, "style", null);
__decorate([
    serialize()
], Control.prototype, "color", null);
__decorate([
    serialize()
], Control.prototype, "gradient", null);
__decorate([
    serialize()
], Control.prototype, "zIndex", null);
__decorate([
    serialize()
], Control.prototype, "notRenderable", null);
__decorate([
    serialize()
], Control.prototype, "isVisible", null);
__decorate([
    serialize()
], Control.prototype, "descendantsOnlyPadding", null);
__decorate([
    serialize()
], Control.prototype, "paddingLeft", null);
__decorate([
    serialize()
], Control.prototype, "paddingRight", null);
__decorate([
    serialize()
], Control.prototype, "paddingTop", null);
__decorate([
    serialize()
], Control.prototype, "paddingBottom", null);
__decorate([
    serialize()
], Control.prototype, "left", null);
__decorate([
    serialize()
], Control.prototype, "top", null);
__decorate([
    serialize()
], Control.prototype, "linkOffsetX", null);
__decorate([
    serialize()
], Control.prototype, "linkOffsetY", null);
__decorate([
    serialize()
], Control.prototype, "isEnabled", null);
__decorate([
    serialize()
], Control.prototype, "disabledColor", null);
__decorate([
    serialize()
], Control.prototype, "disabledColorItem", null);
__decorate([
    serialize()
], Control.prototype, "overlapGroup", void 0);
__decorate([
    serialize()
], Control.prototype, "overlapDeltaMultiplier", void 0);
RegisterClass("BABYLON.GUI.Control", Control);
//# sourceMappingURL=control.js.map