import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { Control } from "gui/2D/controls/control";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { CommandButtonComponent } from "../../../commandButtonComponent";
import { Container } from "gui/2D/controls/container";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { ValueAndUnit } from "gui/2D/valueAndUnit";
import { ColorLine } from "shared-ui-components/lines/colorLineComponent";
import { makeTargetsProxy, conflictingValuesPlaceholder } from "shared-ui-components/lines/targetsProxy";
import { CoordinateHelper } from "../../../../diagram/coordinateHelper";
import { Vector2 } from "core/Maths/math";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
import { OptionsLineComponent } from "shared-ui-components/components/lines/OptionsLineComponent";
import sizeIcon from "shared-ui-components/imgs/sizeIcon.svg";
import verticalMarginIcon from "shared-ui-components/imgs/verticalMarginIcon.svg";
import positionIcon from "shared-ui-components/imgs/positionIcon.svg";
import fontFamilyIcon from "shared-ui-components/imgs/fontFamilyIcon.svg";
import alphaIcon from "shared-ui-components/imgs/alphaIcon.svg";
import fontSizeIcon from "shared-ui-components/imgs/fontSizeIcon.svg";
import fontStyleIcon from "shared-ui-components/imgs/fontStyleIcon.svg";
import fontWeightIcon from "shared-ui-components/imgs/fontWeightIcon.svg";
import rotationIcon from "shared-ui-components/imgs/rotationIcon.svg";
import pivotIcon from "shared-ui-components/imgs/pivotIcon.svg";
import scaleIcon from "shared-ui-components/imgs/scaleIcon.svg";
import shadowBlurIcon from "shared-ui-components/imgs/shadowBlurIcon.svg";
import horizontalMarginIcon from "shared-ui-components/imgs/horizontalMarginIcon.svg";
import shadowColorIcon from "shared-ui-components/imgs/shadowColorIcon.svg";
import shadowOffsetXIcon from "shared-ui-components/imgs/shadowOffsetXIcon.svg";
import colorIcon from "shared-ui-components/imgs/colorIcon.svg";
import fillColorIcon from "shared-ui-components/imgs/fillColorIcon.svg";
import linkedMeshOffsetIcon from "shared-ui-components/imgs/linkedMeshOffsetIcon.svg";
import visibleIcon from "../../../../imgs/visibilityActiveIcon.svg";
import addIcon from "shared-ui-components/imgs/addGridElementDark.svg";
import removeIcon from "shared-ui-components/imgs/deleteGridElementDark.svg";
import adtIcon from "../../../../imgs/adtIcon.svg";
import hAlignCenterIcon from "shared-ui-components/imgs/hAlignCenterIcon.svg";
import hAlignLeftIcon from "shared-ui-components/imgs/hAlignLeftIcon.svg";
import hAlignRightIcon from "shared-ui-components/imgs/hAlignRightIcon.svg";
import vAlignCenterIcon from "shared-ui-components/imgs/vAlignCenterIcon.svg";
import vAlignTopIcon from "shared-ui-components/imgs/vAlignTopIcon.svg";
import vAlignBottomIcon from "shared-ui-components/imgs/vAlignBottomIcon.svg";
import descendantsOnlyPaddingIcon from "shared-ui-components/imgs/descendantsOnlyPaddingIcon.svg";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { UnitButton } from "shared-ui-components/lines/unitButton";
import { WorkbenchComponent } from "../../../../diagram/workbench";
import { Popup } from "shared-ui-components/lines/popup";
export class CommonControlPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this._onControlVisibilityChangedObservers = [];
        this.state = {
            fontFamilyOptions: JSON.parse(String(window.sessionStorage.getItem("fonts"))) ?? [
                { label: "Arial", value: 1 },
                { label: "Verdana", value: 2 },
                { label: "Helvetica", value: 3 },
                { label: "Trebuchet MS", value: 4 },
                { label: "Times New Roman", value: 5 },
                { label: "Georgia", value: 6 },
                { label: "Garamond", value: 7 },
                { label: "Courier New", value: 8 },
                { label: "Brush Script MT", value: 9 },
            ],
        };
        const controls = this.props.controls;
        for (const control of controls) {
            const transformed = this._getTransformedReferenceCoordinate(control);
            if (!control.metadata) {
                control.metadata = {};
            }
            control.metadata._previousCenter = transformed;
            const visibilityObserver = control.onIsVisibleChangedObservable.add(() => {
                this.forceUpdate();
            });
            this._onControlVisibilityChangedObservers.push(visibilityObserver);
        }
        this._onFontsParsedObserver = this.props.onFontsParsedObservable?.add(() => {
            this._checkFontsInLayout();
        });
        this._onPropertyChangedObserver = this.props.onPropertyChangedObservable?.add((event) => {
            const isTransformEvent = event.property === "transformCenterX" || event.property === "transformCenterY";
            for (const control of controls) {
                let transformed = this._getTransformedReferenceCoordinate(control);
                if (isTransformEvent && control.metadata._previousCenter) {
                    // Calculate the difference between current center and previous center
                    const diff = transformed.subtract(control.metadata._previousCenter);
                    control.leftInPixels -= diff.x;
                    control.topInPixels -= diff.y;
                    // Update center in reference to left and top positions
                    transformed = this._getTransformedReferenceCoordinate(control);
                }
                control.metadata._previousCenter = transformed;
                if (control.getClassName() === "TextBlock" && (event.property === "width" || event.property === "height")) {
                    control.resizeToFit = false;
                }
            }
        });
    }
    componentWillMount() {
        this._checkFontsInLayout();
    }
    _checkFontsInLayout() {
        const correctFonts = [];
        for (const font of this.state.fontFamilyOptions.values()) {
            if (document.fonts.check(`12px "${font.label}"`) && font.label != "Custom Font") {
                correctFonts.push(font);
            }
        }
        const moreFonts = WorkbenchComponent.addedFonts;
        for (let i = 0; i < moreFonts.length; i++) {
            const fontName = moreFonts[i].trim();
            correctFonts.push({ label: fontName, value: fontName });
        }
        this.setState({
            fontFamilyOptions: correctFonts,
        });
        window.sessionStorage.setItem("fonts", JSON.stringify(correctFonts));
    }
    _addFont(fontValue) {
        const fontName = fontValue.trim();
        if (fontName.length > 0) {
            if (!this.state.fontFamilyOptions.find(({ value }) => value === fontValue)) {
                this.setState((state) => {
                    state.fontFamilyOptions.push({ label: fontName, value: fontName });
                    return state;
                }, this._checkFontsInLayout);
            }
        }
    }
    _getTransformedReferenceCoordinate(control) {
        const nodeMatrix = CoordinateHelper.GetNodeMatrix(control);
        const transformed = new Vector2(1, 1);
        nodeMatrix.transformCoordinates(1, 1, transformed);
        return transformed;
    }
    _updateAlignment(alignment, value) {
        for (const control of this.props.controls) {
            if (control.typeName === "TextBlock" && control.resizeToFit === false) {
                control["text" + alignment.charAt(0).toUpperCase() + alignment.slice(1)] = value;
            }
            else {
                control[alignment] = value;
            }
        }
        this.forceUpdate();
    }
    _checkAndUpdateValues(propertyName, value) {
        for (const control of this.props.controls) {
            // checking the previous value unit to see what it was.
            const vau = control["_" + propertyName];
            let percentage = vau.isPercentage;
            // now checking if the new string contains either a px or a % sign in case we need to change the unit.
            const negative = value.charAt(0) === "-";
            if (value.charAt(value.length - 1) === "%") {
                percentage = true;
            }
            else if (value.charAt(value.length - 1) === "x" && value.charAt(value.length - 2) === "p") {
                percentage = false;
            }
            if (control.parent?.typeName === "StackPanel") {
                percentage = false;
            }
            let newValue = value.match(/([\d.,]+)/g)?.[0];
            if (!newValue) {
                newValue = "0";
            }
            newValue = (negative ? "-" : "") + newValue;
            newValue += percentage ? "%" : "px";
            const initialValue = control[propertyName];
            control[propertyName] = newValue;
            this.props.onPropertyChangedObservable?.notifyObservers({
                object: control,
                property: propertyName,
                initialValue: initialValue,
                value: control[propertyName],
            });
        }
    }
    _addOrUpdateMetadata(options) {
        for (const control of this.props.controls) {
            const initialValue = control.metadata;
            // Convert strings to their proper types
            for (const key in options) {
                const v = options[key];
                if (!isNaN(v) && !isNaN(parseFloat(v))) {
                    options[key] = parseFloat(v);
                }
                else if (v.trim() === "true") {
                    options[key] = true;
                }
                else if (v.trim() === "false") {
                    options[key] = false;
                }
            }
            const newValue = Object.assign({}, control.metadata, options);
            control.metadata = newValue;
            this.props.onPropertyChangedObservable?.notifyObservers({
                object: control,
                property: "metadata",
                initialValue: initialValue,
                value: newValue,
            });
        }
    }
    _removeFromMetadata(key) {
        for (const control of this.props.controls) {
            const initialValue = Object.assign({}, control.metadata);
            delete control.metadata[key];
            this.props.onPropertyChangedObservable?.notifyObservers({
                object: control,
                property: "metadata",
                initialValue: initialValue,
                value: control.metadata,
            });
        }
    }
    _getCommonPropertyKeys(objects) {
        objects = objects.filter((x) => !!x);
        if (objects.length === 0)
            return [];
        if (objects.length === 1) {
            return Object.keys(objects[0]);
        }
        const [firstObject, ...restObjects] = objects;
        return Object.keys(firstObject).filter((property) => {
            return restObjects.every((obj) => property in obj);
        });
    }
    _markChildrenAsDirty() {
        for (const control of this.props.controls) {
            if (control instanceof Container)
                control._children.forEach((child) => {
                    child._markAsDirty();
                });
        }
    }
    componentWillUnmount() {
        if (this._onPropertyChangedObserver) {
            this.props.onPropertyChangedObservable?.remove(this._onPropertyChangedObserver);
        }
        if (this._onFontsParsedObserver) {
            this.props.onFontsParsedObservable?.remove(this._onFontsParsedObserver);
        }
        for (let i = 0; i < this._onControlVisibilityChangedObservers.length; i++) {
            this.props.controls[i].onIsVisibleChangedObservable.remove(this._onControlVisibilityChangedObservers[i]);
        }
    }
    _filterFontDuplicates(array) {
        const seen = new Set();
        return array.filter((item) => {
            const val = item.value;
            const duplicate = seen.has(val);
            seen.add(val);
            return !duplicate;
        });
    }
    render() {
        const controls = this.props.controls;
        const firstControl = controls[0];
        let horizontalAlignment = firstControl.horizontalAlignment;
        let verticalAlignment = firstControl.verticalAlignment;
        for (const control of controls) {
            if (control.horizontalAlignment !== horizontalAlignment) {
                horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
            }
            if (control.verticalAlignment !== verticalAlignment) {
                verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
            }
        }
        if (controls.every((control) => control.typeName === "TextBlock" && control.resizeToFit === false)) {
            horizontalAlignment = firstControl.textHorizontalAlignment;
            verticalAlignment = firstControl.textVerticalAlignment;
        }
        const showTextProperties = firstControl instanceof Container || firstControl.typeName === "TextBlock" || firstControl.typeName === "InputText" || firstControl.typeName === "InputPassword";
        const proxy = makeTargetsProxy(controls, this.props.onPropertyChangedObservable);
        const getValue = (propertyName) => {
            const values = controls.map((control) => control[propertyName]._value);
            const firstValue = values[0];
            if (values.every((value) => value === firstValue)) {
                const units = getUnitString(propertyName);
                if (units === "%") {
                    return (firstValue * 100).toFixed(2);
                }
                else if (units === "PX") {
                    return firstValue.toFixed(2);
                }
                else {
                    return conflictingValuesPlaceholder;
                }
            }
            else {
                return conflictingValuesPlaceholder;
            }
        };
        const getUnitString = (propertyName) => {
            const units = controls.map((control) => control[propertyName]._unit);
            const firstUnit = units[0];
            if (units.every((unit) => unit === firstUnit)) {
                if (firstUnit === ValueAndUnit.UNITMODE_PIXEL) {
                    return "PX";
                }
                else {
                    return "%";
                }
            }
            else {
                return conflictingValuesPlaceholder;
            }
        };
        const increment = (propertyName, amount, minimum, maximum) => {
            for (const control of controls) {
                const initialValue = control[propertyName];
                const initialUnit = control["_" + propertyName]._unit;
                let newValue = control[`${propertyName}InPixels`] + amount;
                if (minimum !== undefined && newValue < minimum)
                    newValue = minimum;
                if (maximum !== undefined && newValue > maximum)
                    newValue = maximum;
                control[`${propertyName}InPixels`] = newValue;
                if (initialUnit === ValueAndUnit.UNITMODE_PERCENTAGE) {
                    CoordinateHelper.ConvertToPercentage(control, [propertyName]);
                }
                this.props.onPropertyChangedObservable?.notifyObservers({
                    object: control,
                    property: propertyName,
                    initialValue: initialValue,
                    value: control[propertyName],
                });
            }
        };
        const convertUnits = (unit, property) => {
            for (const control of controls) {
                if (unit === "PX") {
                    CoordinateHelper.ConvertToPercentage(control, [property], this.props.onPropertyChangedObservable);
                }
                else {
                    CoordinateHelper.ConvertToPixels(control, [property], this.props.onPropertyChangedObservable);
                }
            }
        };
        const fontStyleOptions = [
            { label: "normal", value: "normal", id: "0" },
            { label: "italic", value: "italic", id: "1" },
            { label: "oblique", value: "oblique", id: "2" },
        ];
        let horizontalDisabled = false, verticalDisabled = false, widthUnitsLocked = false, heightUnitsLocked = false;
        const parent = controls[0].parent;
        const fonts = this._filterFontDuplicates(this.state.fontFamilyOptions.filter(({ label }) => label !== "Custom Font").map(({ label, value }) => ({ label, value: label, id: value.toString() })));
        if (parent?.getClassName() === "StackPanel" || parent?.getClassName() === "VirtualKeyboard") {
            if (parent.isVertical) {
                verticalDisabled = true;
                heightUnitsLocked = true;
            }
            else {
                horizontalDisabled = true;
                widthUnitsLocked = true;
            }
        }
        return (_jsxs("div", { children: [!this.props.hideDimensions && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "ge-divider alignment-bar", children: [_jsx(CommandButtonComponent, { tooltip: "Left", icon: hAlignLeftIcon, shortcut: "", isActive: horizontalAlignment === Control.HORIZONTAL_ALIGNMENT_LEFT, onClick: () => {
                                        this._updateAlignment("horizontalAlignment", Control.HORIZONTAL_ALIGNMENT_LEFT);
                                    }, disabled: horizontalDisabled }), _jsx(CommandButtonComponent, { tooltip: "Center", icon: hAlignCenterIcon, shortcut: "", isActive: horizontalAlignment === Control.HORIZONTAL_ALIGNMENT_CENTER, onClick: () => {
                                        this._updateAlignment("horizontalAlignment", Control.HORIZONTAL_ALIGNMENT_CENTER);
                                    }, disabled: horizontalDisabled }), _jsx(CommandButtonComponent, { tooltip: "Right", icon: hAlignRightIcon, shortcut: "", isActive: horizontalAlignment === Control.HORIZONTAL_ALIGNMENT_RIGHT, onClick: () => {
                                        this._updateAlignment("horizontalAlignment", Control.HORIZONTAL_ALIGNMENT_RIGHT);
                                    }, disabled: horizontalDisabled }), _jsx(CommandButtonComponent, { tooltip: "Top", icon: vAlignTopIcon, shortcut: "", isActive: verticalAlignment === Control.VERTICAL_ALIGNMENT_TOP, onClick: () => {
                                        this._updateAlignment("verticalAlignment", Control.VERTICAL_ALIGNMENT_TOP);
                                    }, disabled: verticalDisabled }), _jsx(CommandButtonComponent, { tooltip: "Center", icon: vAlignCenterIcon, shortcut: "", isActive: verticalAlignment === Control.VERTICAL_ALIGNMENT_CENTER, onClick: () => {
                                        this._updateAlignment("verticalAlignment", Control.VERTICAL_ALIGNMENT_CENTER);
                                    }, disabled: verticalDisabled }), _jsx(CommandButtonComponent, { tooltip: "Bottom", icon: vAlignBottomIcon, shortcut: "", isActive: verticalAlignment === Control.VERTICAL_ALIGNMENT_BOTTOM, onClick: () => {
                                        this._updateAlignment("verticalAlignment", Control.VERTICAL_ALIGNMENT_BOTTOM);
                                    }, disabled: verticalDisabled })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: positionIcon, label: "Position" }), _jsx(TextInputLineComponent, { numbersOnly: true, lockObject: this.props.lockObject, label: "X", delayInput: true, value: getValue("_left"), onChange: (newValue) => this._checkAndUpdateValues("left", newValue), unit: _jsx(UnitButton, { unit: getUnitString("_left"), onClick: (unit) => convertUnits(unit, "left") }), arrows: true, arrowsIncrement: (amount) => increment("left", amount) }), _jsx(TextInputLineComponent, { numbersOnly: true, lockObject: this.props.lockObject, label: "Y", delayInput: true, value: getValue("_top"), onChange: (newValue) => this._checkAndUpdateValues("top", newValue), unit: _jsx(UnitButton, { unit: getUnitString("_top"), onClick: (unit) => convertUnits(unit, "top") }), arrows: true, arrowsIncrement: (amount) => increment("top", amount) })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: sizeIcon, label: "Size" }), _jsx(TextInputLineComponent, { numbersOnly: true, lockObject: this.props.lockObject, label: "W", delayInput: true, value: getValue("_width"), onChange: (newValue) => {
                                        for (const control of controls) {
                                            if (control.typeName === "Image") {
                                                control.autoScale = false;
                                            }
                                            else if (control instanceof Container) {
                                                control.adaptWidthToChildren = false;
                                            }
                                            else if (control.typeName === "ColorPicker") {
                                                if (newValue === "0" || newValue === "-") {
                                                    newValue = "1";
                                                }
                                            }
                                        }
                                        this._checkAndUpdateValues("width", newValue);
                                    }, unit: _jsx(UnitButton, { unit: getUnitString("_width"), locked: widthUnitsLocked, onClick: (unit) => convertUnits(unit, "width") }), arrows: true, arrowsIncrement: (amount) => increment("width", amount) }), _jsx(TextInputLineComponent, { numbersOnly: true, lockObject: this.props.lockObject, label: "H", delayInput: true, value: getValue("_height"), onChange: (newValue) => {
                                        for (const control of controls) {
                                            if (control.typeName === "Image") {
                                                control.autoScale = false;
                                            }
                                            else if (control instanceof Container) {
                                                control.adaptHeightToChildren = false;
                                            }
                                            else if (control.typeName === "ColorPicker") {
                                                if (newValue === "0" || newValue === "-") {
                                                    newValue = "1";
                                                }
                                            }
                                        }
                                        this._checkAndUpdateValues("height", newValue);
                                    }, unit: _jsx(UnitButton, { unit: getUnitString("_height"), locked: heightUnitsLocked, onClick: (unit) => convertUnits(unit, "height") }), arrows: true, arrowsIncrement: (amount) => increment("height", amount) })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: verticalMarginIcon, label: "Vertical Padding" }), _jsx(TextInputLineComponent, { numbersOnly: true, lockObject: this.props.lockObject, label: "T", delayInput: true, value: getValue("_paddingTop"), onChange: (newValue) => {
                                        this._checkAndUpdateValues("paddingTop", newValue);
                                        this._markChildrenAsDirty();
                                    }, unit: _jsx(UnitButton, { unit: getUnitString("_paddingTop"), onClick: (unit) => convertUnits(unit, "paddingTop") }), arrows: true, arrowsIncrement: (amount) => increment("paddingTop", amount, 0) }), _jsx(TextInputLineComponent, { numbersOnly: true, lockObject: this.props.lockObject, label: "B", delayInput: true, value: getValue("_paddingBottom"), onChange: (newValue) => {
                                        this._checkAndUpdateValues("paddingBottom", newValue);
                                        this._markChildrenAsDirty();
                                    }, unit: _jsx(UnitButton, { unit: getUnitString("_paddingBottom"), onClick: (unit) => convertUnits(unit, "paddingBottom") }), arrows: true, arrowsIncrement: (amount) => increment("paddingBottom", amount, 0) })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: horizontalMarginIcon, label: "Horizontal Padding" }), _jsx(TextInputLineComponent, { numbersOnly: true, lockObject: this.props.lockObject, label: "L", delayInput: true, value: getValue("_paddingLeft"), onChange: (newValue) => {
                                        this._checkAndUpdateValues("paddingLeft", newValue);
                                        this._markChildrenAsDirty();
                                    }, unit: _jsx(UnitButton, { unit: getUnitString("_paddingLeft"), onClick: (unit) => convertUnits(unit, "paddingLeft") }), arrows: true, arrowsIncrement: (amount) => increment("paddingLeft", amount) }), _jsx(TextInputLineComponent, { numbersOnly: true, lockObject: this.props.lockObject, label: "R", delayInput: true, value: getValue("_paddingRight"), onChange: (newValue) => {
                                        this._checkAndUpdateValues("paddingRight", newValue);
                                        this._markChildrenAsDirty();
                                    }, onPropertyChangedObservable: this.props.onPropertyChangedObservable, unit: _jsx(UnitButton, { unit: getUnitString("_paddingRight"), onClick: (unit) => convertUnits(unit, "paddingRight") }), arrows: true, arrowsIncrement: (amount) => increment("paddingRight", amount) })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: descendantsOnlyPaddingIcon, label: "Makes padding affect only the descendants of this control" }), _jsx(CheckBoxLineComponent, { label: "ONLY PAD DESCENDANTS", target: proxy, propertyName: "descendentsOnlyPadding" })] }), _jsx("hr", { className: "ge" })] })), parent?.name === "root" && (_jsxs(_Fragment, { children: [_jsx(TextLineComponent, { label: "LINK OFFSET", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: linkedMeshOffsetIcon, label: "Link offset" }), _jsx(TextInputLineComponent, { numbersOnly: true, lockObject: this.props.lockObject, label: "X", delayInput: true, value: getValue("_linkOffsetX"), onChange: (newValue) => this._checkAndUpdateValues("linkOffsetX", newValue), unit: _jsx(UnitButton, { unit: getUnitString("_linkOffsetX"), onClick: (unit) => convertUnits(unit, "linkOffsetX") }), arrows: true, arrowsIncrement: (amount) => increment("linkOffsetX", amount) }), _jsx(TextInputLineComponent, { numbersOnly: true, lockObject: this.props.lockObject, label: "Y", delayInput: true, value: getValue("_linkOffsetY"), onChange: (newValue) => this._checkAndUpdateValues("linkOffsetY", newValue), unit: _jsx(UnitButton, { unit: getUnitString("_linkOffsetY"), onClick: (unit) => convertUnits(unit, "linkOffsetY") }), arrows: true, arrowsIncrement: (amount) => increment("linkOffsetY", amount) })] }), _jsx("hr", { className: "ge" })] })), _jsx(TextLineComponent, { tooltip: "", label: "SERIALIZATION", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: adtIcon, label: "Serializable" }), _jsx(CheckBoxLineComponent, { label: "ISSERIALIZABLE", target: proxy, propertyName: "isSerializable" })] }), _jsx(TextLineComponent, { tooltip: "", label: "VISIBILITY", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: visibleIcon, label: "Visible" }), _jsx(CheckBoxLineComponent, { label: "ISVISIBLE", target: proxy, propertyName: "isVisible", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), _jsx(TextLineComponent, { tooltip: "", label: "TRANSFORMATION", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: scaleIcon, label: "Scale" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "X", target: proxy, propertyName: "scaleX", arrows: true, digits: 2, step: "0.0005" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Y", target: proxy, propertyName: "scaleY", arrows: true, digits: 2, step: "0.0005" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: pivotIcon, label: "Transform Center" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "X", target: proxy, propertyName: "transformCenterX", arrows: true, digits: 2, step: "0.0005" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Y", target: proxy, propertyName: "transformCenterY", arrows: true, digits: 2, step: "0.0005" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: rotationIcon, label: "Rotation" }), _jsx(SliderLineComponent, { iconLabel: "Rotation", lockObject: this.props.lockObject, label: "", target: proxy, decimalCount: 2, propertyName: "rotation", minimum: 0, maximum: 2 * Math.PI, step: 0.01, unit: _jsx(UnitButton, { unit: "RAD", locked: true }) })] }), _jsx("hr", { className: "ge" }), _jsx(TextLineComponent, { tooltip: "", label: "APPEARANCE", value: " ", color: "grey" }), controls.every((control) => control.color !== undefined && control.typeName !== "Image" && control.typeName !== "ImageBasedSlider" && control.typeName !== "ColorPicker") && (_jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: colorIcon, label: "Outline Color" }), _jsx(ColorLine, { lockObject: this.props.lockObject, label: "Outline Color", target: proxy, propertyName: "color" })] })), controls.every((control) => control.background !== undefined) && (_jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: fillColorIcon, label: "Background Color" }), _jsx(ColorLine, { lockObject: this.props.lockObject, label: "Background Color", target: proxy, propertyName: "background" })] })), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: alphaIcon, label: "Alpha" }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "alpha", minimum: 0, maximum: 1, step: 0.01 })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: shadowColorIcon, label: "Shadow Color" }), _jsx(ColorLine, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "shadowColor" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: shadowOffsetXIcon, label: "Shadow Offset" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "X", target: proxy, propertyName: "shadowOffsetX", unit: _jsx(UnitButton, { unit: "PX", locked: true }), arrows: true, step: "0.1", digits: 2 }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Y", target: proxy, propertyName: "shadowOffsetY", unit: _jsx(UnitButton, { unit: "PX", locked: true }), arrows: true, step: "0.1", digits: 2 })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: shadowBlurIcon, label: "Shadow Blur" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: " ", target: proxy, propertyName: "shadowBlur", arrows: true, min: 0, digits: 2 })] }), showTextProperties && (_jsxs(_Fragment, { children: [_jsx("hr", { className: "ge" }), _jsx(TextLineComponent, { tooltip: "", label: "FONT STYLE", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: fontFamilyIcon, label: "Font Family" }), _jsx(OptionsLineComponent, { options: fonts, selectedOptionValue: proxy.fontFamily, onOptionSelected: (selectedFontValue) => {
                                        proxy.fontFamily = selectedFontValue;
                                    }, onOptionAdded: ({ value }) => {
                                        this._addFont(value);
                                    }, addOptionPlaceholder: "Add new font...", validateNewOptionValue: (newFontValue) => {
                                        if (newFontValue.length > 0 && !fonts.find((f) => f.label === newFontValue)) {
                                            return document.fonts.check(`12px ${newFontValue}`);
                                        }
                                        return false;
                                    } })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: fontWeightIcon, label: "Font Weight" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "", target: proxy, propertyName: "fontWeight" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: fontStyleIcon, label: "Font Style" }), _jsx(OptionsLineComponent, { options: fontStyleOptions, selectedOptionValue: proxy.fontStyle, onOptionSelected: (value) => {
                                        proxy.fontStyle = value;
                                    } })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: fontSizeIcon, label: "Font Size" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "", numbersOnly: true, value: getValue("_fontSize"), onChange: (newValue) => this._checkAndUpdateValues("fontSize", newValue), unit: _jsx(UnitButton, { unit: getUnitString("_fontSize"), onClick: (unit) => convertUnits(unit, "fontSize") }), arrows: true, arrowsIncrement: (amount) => increment("fontSize", amount, 0) })] })] })), _jsx("hr", { className: "ge" }), _jsxs("div", { className: "ge-divider", children: [_jsx(TextLineComponent, { tooltip: "", label: "METADATA", value: " ", color: "grey" }), _jsx(CommandButtonComponent, { tooltip: "Add", icon: addIcon, isActive: false, onClick: () => {
                                const w = Popup["gui-editor"] ?? window;
                                const input = w.prompt("Enter new key name for metadata value", "newKey");
                                if (input === null || input.trim() === "") {
                                    return;
                                }
                                let keyName = input;
                                let num = 1;
                                while (controls.some((x) => keyName in x.metadata)) {
                                    num++;
                                    keyName = input + num;
                                }
                                this._addOrUpdateMetadata({ [keyName]: "" });
                            } })] }), this._getCommonPropertyKeys(controls.map((x) => x.metadata)).map((metaKey) => {
                    if (metaKey === "guiEditor" || metaKey.startsWith("_") || metaKey === "editorUniqueId") {
                        return;
                    }
                    const firstControl = controls.find((x) => !!x.metadata);
                    if (!firstControl) {
                        return;
                    }
                    let value = firstControl.metadata[metaKey];
                    const isNotEditableValue = typeof value === "object";
                    const allValues = controls.map((x) => x.metadata[metaKey]);
                    if (!allValues.every((x) => x === value)) {
                        value = conflictingValuesPlaceholder;
                    }
                    return (_jsx("div", { children: _jsxs("div", { className: "ge-divider double", children: [_jsx(TextInputLineComponent, { numbersOnly: false, lockObject: this.props.lockObject, label: "", delayInput: true, value: metaKey, disabled: true }), _jsx(TextInputLineComponent, { numbersOnly: false, lockObject: this.props.lockObject, label: ":", delayInput: true, disabled: isNotEditableValue, value: typeof value === "string" ? value : JSON.stringify(value), onChange: (x) => this._addOrUpdateMetadata({ [metaKey]: x }) }), _jsx(CommandButtonComponent, { tooltip: "Remove", icon: removeIcon, isActive: false, onClick: () => this._removeFromMetadata(metaKey) })] }) }, metaKey));
                })] }));
    }
}
//# sourceMappingURL=commonControlPropertyGridComponent.js.map