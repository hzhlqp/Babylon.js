import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CommonControlPropertyGridComponent } from "../gui/commonControlPropertyGridComponent";
import { Image } from "gui/2D/controls/image";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import stretchFillIcon from "shared-ui-components/imgs/stretchFillIcon.svg";
import imageLinkIcon from "shared-ui-components/imgs/imageLinkIcon.svg";
import cropIcon from "shared-ui-components/imgs/cropIcon.svg";
import cellIDIcon from "shared-ui-components/imgs/cellIDIcon.svg";
import autoResizeIcon from "shared-ui-components/imgs/autoResizeIcon.svg";
import sizeIcon from "shared-ui-components/imgs/sizeIcon.svg";
import animationSheetIcon from "shared-ui-components/imgs/animationSheetIcon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
import { UnitButton } from "shared-ui-components/lines/unitButton";
export class ImagePropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this._observers = new Map();
        this.updateObservers([], props.images);
    }
    shouldComponentUpdate(nextProps) {
        this.updateObservers(this.props.images, nextProps.images);
        return true;
    }
    updateObservers(oldImages, newImages) {
        for (const image of newImages) {
            if (!oldImages.includes(image)) {
                this._observers.set(image, image.onImageLoadedObservable.add(() => this.forceUpdate()));
            }
        }
        for (const image of oldImages) {
            if (!newImages.includes(image)) {
                image.onImageLoadedObservable.remove(this._observers.get(image));
                this._observers.delete(image);
            }
        }
    }
    componentWillUnmount() {
        this.updateObservers(this.props.images, []);
    }
    toggleAnimations(on) {
        for (const image of this.props.images) {
            if (on) {
                image.cellId = 0;
                image.cellWidth = image.imageWidth;
                image.cellHeight = image.imageHeight;
            }
            else {
                image.cellId = -1;
            }
        }
    }
    getMaxCells() {
        let maxCells = Number.MAX_SAFE_INTEGER;
        for (const image of this.props.images) {
            if (image.cellWidth === 0 || image.cellHeight === 0)
                continue;
            const cols = Math.ceil(image.imageWidth / image.cellWidth);
            const rows = Math.ceil(image.imageHeight / image.cellHeight);
            const max = cols * rows - 1;
            if (max < maxCells)
                maxCells = max;
        }
        return maxCells;
    }
    updateCellSize() {
        const maxCells = this.getMaxCells();
        for (const image of this.props.images) {
            if (image.cellId > maxCells) {
                image.cellId = maxCells;
            }
        }
        this.forceUpdate();
    }
    render() {
        const images = this.props.images;
        const image = images[0]; // for nine slice
        const proxy = makeTargetsProxy(images, this.props.onPropertyChangedObservable);
        const stretchOptions = [
            { label: "None", value: Image.STRETCH_NONE },
            { label: "Fill", value: Image.STRETCH_FILL },
            { label: "Uniform", value: Image.STRETCH_UNIFORM },
            { label: "Extend", value: Image.STRETCH_EXTEND },
            { label: "NinePatch", value: Image.STRETCH_NINE_PATCH },
        ];
        const animationSheet = images.every((image) => image.cellId !== -1);
        const maxCells = this.getMaxCells();
        const maxCellWidth = Math.max(...images.map((image) => image.imageWidth));
        const maxCellHeight = Math.max(...images.map((image) => image.imageHeight));
        return (_jsxs("div", { className: "pane", children: [_jsx(CommonControlPropertyGridComponent, { lockObject: this.props.lockObject, controls: images, onPropertyChangedObservable: this.props.onPropertyChangedObservable, onFontsParsedObservable: this.props.onFontsParsedObservable, globalState: this.props.globalState }), _jsx("hr", {}), _jsx(TextLineComponent, { label: "IMAGE", value: " ", color: "grey" }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: imageLinkIcon, label: "Source" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: " ", target: proxy, propertyName: "source" })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: cropIcon, label: "Crop" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "L", target: proxy, propertyName: "sourceLeft", numeric: true, arrows: true, min: 0, placeholder: "0", unit: _jsx(UnitButton, { unit: "PX", locked: true }) }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "T", target: proxy, propertyName: "sourceTop", numeric: true, arrows: true, min: 0, placeholder: "0", unit: _jsx(UnitButton, { unit: "PX", locked: true }) })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: cropIcon, label: "Crop" }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "W", target: proxy, propertyName: "sourceWidth", numeric: true, arrows: true, min: 0, placeholder: Math.max(...images.map((image) => image.imageWidth)).toString(), unit: _jsx(UnitButton, { unit: "PX", locked: true }) }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "H", target: proxy, propertyName: "sourceHeight", numeric: true, arrows: true, min: 0, placeholder: Math.max(...images.map((image) => image.imageHeight)).toString(), unit: _jsx(UnitButton, { unit: "PX", locked: true }) })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: autoResizeIcon, label: "Autoscale" }), _jsx(CheckBoxLineComponent, { label: "AUTOSCALE", target: proxy, propertyName: "autoScale", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: stretchFillIcon, label: "Stretch" }), _jsx(OptionsLine, { label: " ", options: stretchOptions, target: proxy, propertyName: "stretch", onSelect: (value) => this.setState({ mode: value }) })] }), images.length === 1 && image.stretch === Image.STRETCH_NINE_PATCH && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: cropIcon, label: "Slice Horizontal" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "L", target: image, propertyName: "sliceLeft", onChange: () => {
                                        image.populateNinePatchSlicesFromImage = false;
                                        this.forceUpdate();
                                    } }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "R", target: image, propertyName: "sliceRight", onChange: () => {
                                        image.populateNinePatchSlicesFromImage = false;
                                        this.forceUpdate();
                                    } })] }), _jsxs("div", { className: "ge-divider double", children: [_jsx(IconComponent, { icon: cropIcon, label: "Slice Vertical" }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "T", target: image, propertyName: "sliceTop", onChange: () => {
                                        image.populateNinePatchSlicesFromImage = false;
                                        this.forceUpdate();
                                    } }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "B", target: image, propertyName: "sliceBottom", onChange: () => {
                                        image.populateNinePatchSlicesFromImage = false;
                                        this.forceUpdate();
                                    } })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: autoResizeIcon, label: "Populate Nine Patch Slices From Image" }), _jsx(CheckBoxLineComponent, { label: "SLICE FROM IMAGE", target: image, propertyName: "populateNinePatchSlicesFromImage", onValueChanged: () => {
                                        this.forceUpdate();
                                        image._markAsDirty();
                                    } })] })] })), _jsx("hr", {}), _jsx(CheckBoxLineComponent, { iconLabel: "animationSheet", icon: animationSheetIcon, label: "ANIMATION SHEET", target: makeTargetsProxy(images, this.props.onPropertyChangedObservable, (target) => target.cellId !== -1), onValueChanged: () => {
                        this.toggleAnimations(!animationSheet);
                        this.forceUpdate();
                    } }), animationSheet && (_jsxs(_Fragment, { children: [_jsx("div", { className: "ge-divider double", children: _jsx(FloatLineComponent, { iconLabel: "Cell Id", icon: cellIDIcon, lockObject: this.props.lockObject, label: "", isInteger: true, target: proxy, propertyName: "cellId", min: 0, max: maxCells }) }), _jsxs("div", { className: "ge-divider", children: [_jsx(FloatLineComponent, { icon: sizeIcon, lockObject: this.props.lockObject, label: "W", target: proxy, propertyName: "cellWidth", isInteger: true, onChange: () => this.updateCellSize(), min: 1, max: maxCellWidth }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "H", target: proxy, propertyName: "cellHeight", isInteger: true, onChange: () => this.updateCellSize(), min: 1, max: maxCellHeight })] })] }))] }));
    }
}
//# sourceMappingURL=imagePropertyGridComponent.js.map