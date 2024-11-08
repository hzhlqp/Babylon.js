import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Animation } from "core/Animations/animation";
import { Quaternion, Vector2, Vector3 } from "core/Maths/math.vector";
import { Color3, Color4 } from "core/Maths/math.color";
export class AddAnimationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { customPropertyMode: false };
        this._root = React.createRef();
        this._displayName = React.createRef();
        this._property = React.createRef();
        this._typeElement = React.createRef();
        this._loopModeElement = React.createRef();
        this._propertylement = React.createRef();
    }
    createNew() {
        const context = this.props.context;
        const document = this._displayName.current.ownerDocument;
        const displayName = this._displayName.current.value;
        const property = this._property.current ? this._property.current.value : this._propertylement.current.value;
        const type = this._typeElement.current ? this._typeElement.current.value : this.getInferredType();
        const loopModeValue = this._loopModeElement.current.value;
        if (!displayName) {
            document.defaultView.alert("Please define a display name");
            return;
        }
        if (!property) {
            document.defaultView.alert("Please define a property");
            return;
        }
        const fps = this.props.context.animations && this.props.context.animations.length
            ? this.props.context.useTargetAnimations
                ? this.props.context.animations[0].animation.framePerSecond
                : this.props.context.animations[0].framePerSecond
            : 60;
        let minFrame = this.props.context.referenceMinFrame;
        let maxFrame = this.props.context.referenceMaxFrame;
        if (this.props.context.animations) {
            for (const anim of this.props.context.animations) {
                const innerAnim = this.props.context.useTargetAnimations ? anim.animation : anim;
                minFrame = Math.min(minFrame, innerAnim.getKeys()[0].frame);
                maxFrame = Math.max(maxFrame, innerAnim.getKeys()[innerAnim.getKeys().length - 1].frame);
            }
        }
        let dataType = 0;
        let loopMode = 0;
        let defaultValue0;
        let defaultValue1;
        let defaultInTangent0;
        let defaultOutTangent0;
        let defaultInTangent1;
        let defaultOutTangent1;
        switch (type) {
            case "Float": {
                dataType = Animation.ANIMATIONTYPE_FLOAT;
                defaultValue0 = 0;
                defaultValue1 = 1;
                defaultInTangent0 = 0;
                defaultOutTangent0 = 0;
                defaultInTangent1 = 0;
                defaultOutTangent1 = 0;
                break;
            }
            case "Vector2": {
                dataType = Animation.ANIMATIONTYPE_VECTOR2;
                defaultValue0 = Vector2.Zero();
                defaultValue1 = new Vector2(1, 1);
                defaultInTangent0 = new Vector2(0, 0);
                defaultOutTangent0 = new Vector2(0, 0);
                defaultInTangent1 = new Vector2(0, 0);
                defaultOutTangent1 = new Vector2(0, 0);
                break;
            }
            case "Vector3": {
                dataType = Animation.ANIMATIONTYPE_VECTOR3;
                defaultValue0 = Vector3.Zero();
                defaultValue1 = new Vector3(1, 1, 1);
                defaultInTangent0 = new Vector3(0, 0, 0);
                defaultOutTangent0 = new Vector3(0, 0, 0);
                defaultInTangent1 = new Vector3(0, 0, 0);
                defaultOutTangent1 = new Vector3(0, 0, 0);
                break;
            }
            case "Quaternion": {
                dataType = Animation.ANIMATIONTYPE_QUATERNION;
                defaultValue0 = Quaternion.Zero();
                defaultValue1 = new Quaternion(1, 1, 1, 0);
                defaultInTangent0 = new Quaternion(0, 0, 0, 0);
                defaultOutTangent0 = new Quaternion(0, 0, 0, 0);
                defaultInTangent1 = new Quaternion(0, 0, 0, 0);
                defaultOutTangent1 = new Quaternion(0, 0, 0, 0);
                break;
            }
            case "Color3": {
                dataType = Animation.ANIMATIONTYPE_COLOR3;
                defaultValue0 = Color3.Black();
                defaultValue1 = Color3.White();
                defaultInTangent0 = new Color3(0, 0, 0);
                defaultOutTangent0 = new Color3(0, 0, 0);
                defaultInTangent1 = new Color3(0, 0, 0);
                defaultOutTangent1 = new Color3(0, 0, 0);
                break;
            }
            case "Color4": {
                dataType = Animation.ANIMATIONTYPE_COLOR4;
                defaultValue0 = new Color4(0, 0, 0, 0);
                defaultValue1 = new Color4(1, 1, 1, 1);
                defaultInTangent0 = new Color4(0, 0, 0, 0);
                defaultOutTangent0 = new Color4(0, 0, 0, 0);
                defaultInTangent1 = new Color4(0, 0, 0, 0);
                defaultOutTangent1 = new Color4(0, 0, 0, 0);
                break;
            }
        }
        switch (loopModeValue) {
            case "Cycle": {
                loopMode = Animation.ANIMATIONLOOPMODE_CYCLE;
                break;
            }
            case "Relative": {
                loopMode = Animation.ANIMATIONLOOPMODE_RELATIVE;
                break;
            }
            case "Relative from current": {
                loopMode = Animation.ANIMATIONLOOPMODE_RELATIVE_FROM_CURRENT;
                break;
            }
            case "Constant": {
                loopMode = Animation.ANIMATIONLOOPMODE_CONSTANT;
                break;
            }
        }
        const animation = new Animation(displayName, property, fps, dataType, loopMode);
        const keys = [];
        keys.push({
            frame: minFrame,
            value: defaultValue0,
            inTangent: defaultInTangent0,
            outTangent: defaultOutTangent0,
        });
        keys.push({
            frame: maxFrame,
            value: defaultValue1,
            inTangent: defaultInTangent1,
            outTangent: defaultOutTangent1,
        });
        animation.setKeys(keys);
        context.stop();
        if (!context.animations || context.animations.length === 0) {
            context.animations = [];
            if (context.target) {
                context.target.animations = context.animations;
            }
        }
        if (!context.useTargetAnimations) {
            context.animations.push(animation);
        }
        context.activeAnimations.push(animation);
        context.prepare();
        context.onActiveAnimationChanged.notifyObservers({});
        context.onAnimationsLoaded.notifyObservers();
    }
    getInferredType(activeProperty = "") {
        const source = this.props.context.target;
        if (this._propertylement.current) {
            activeProperty = this._propertylement.current.value;
        }
        const value = source[activeProperty];
        if (!isNaN(parseFloat(value))) {
            return "Float";
        }
        return value.getClassName();
    }
    render() {
        const types = ["Float", "Vector2", "Vector3", "Quaternion", "Color3", "Color4"];
        const loopModes = ["Cycle", "Relative", "Relative from current", "Constant"];
        const modes = ["Custom", "List"];
        const properties = [];
        let inferredType = "";
        if (this.props.context.target) {
            let target = this.props.context.target;
            const source = target;
            while (target !== null) {
                const descriptors = Object.getOwnPropertyDescriptors(target);
                for (const property in descriptors) {
                    const descriptor = descriptors[property];
                    if (property[0] === "_" || source[property] === null || source[property] === undefined) {
                        continue;
                    }
                    if (source[property].r === undefined && source[property].x === undefined && isNaN(parseFloat(source[property]))) {
                        continue;
                    }
                    if (properties.indexOf(property) !== -1) {
                        continue;
                    }
                    if (!descriptor.writable && !descriptor.set) {
                        continue;
                    }
                    properties.push(property);
                }
                target = Object.getPrototypeOf(target);
            }
            properties.sort();
            // Extract position, rotation, scaling
            const main = ["scaling", "rotation", "position"];
            for (const mainProperty of main) {
                const index = properties.indexOf(mainProperty);
                if (index === -1) {
                    continue;
                }
                properties.splice(index, 1);
                properties.splice(0, 0, mainProperty);
            }
            if (this._propertylement.current) {
                inferredType = this.getInferredType();
            }
            else {
                inferredType = this.getInferredType(properties[0]);
            }
        }
        const customPropertyMode = this.state.customPropertyMode || properties.length === 0;
        return (_jsxs("div", { id: "add-animation-pane", ref: this._root, children: [_jsx("div", { id: "add-animation-display-name-label", children: "Display Name" }), _jsx("div", { id: "add-animation-mode-label", children: "Mode" }), _jsx("div", { id: "add-animation-property-label", children: "Property" }), _jsx("div", { id: "add-animation-type-label", children: "Type" }), _jsx("div", { id: "add-animation-loop-mode-label", children: "Loop Mode" }), _jsx("input", { type: "text", id: "add-animation-name", ref: this._displayName, className: "input-text", defaultValue: "" }), _jsx("select", { id: "add-animation-mode", className: "option", value: this.state.customPropertyMode ? "Custom" : "List", onChange: (evt) => {
                        this.setState({ customPropertyMode: evt.currentTarget.value === "Custom" });
                    }, children: modes.map((mode, i) => {
                        return (_jsx("option", { value: mode, title: mode, children: mode }, mode + i));
                    }) }), customPropertyMode && (_jsxs(_Fragment, { children: [_jsx("input", { type: "text", id: "add-animation-property", ref: this._property, className: "input-text", defaultValue: "" }), _jsx("select", { id: "add-animation-type", className: "option", ref: this._typeElement, children: types.map((type, i) => {
                                return (_jsx("option", { value: type, title: type, children: type }, type + i));
                            }) })] })), !customPropertyMode && (_jsxs(_Fragment, { children: [_jsx("select", { id: "add-animation-property", className: "option", ref: this._propertylement, onClick: () => {
                                this.forceUpdate();
                            }, children: properties.map((property, i) => {
                                return (_jsx("option", { value: property, title: property, children: property }, property + i));
                            }) }), _jsx("div", { id: "add-animation-type", children: inferredType })] })), _jsx("select", { id: "add-animation-loop-mode", className: "option", ref: this._loopModeElement, children: loopModes.map((loopMode, i) => {
                        return (_jsx("option", { value: loopMode, title: loopMode, children: loopMode }, loopMode + i));
                    }) }), _jsx("button", { className: "simple-button", id: "add-animation", type: "button", onClick: () => this.createNew(), children: "Create" })] }));
    }
}
//# sourceMappingURL=addAnimationComponent.js.map