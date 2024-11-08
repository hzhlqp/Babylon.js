import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { AnimationPropertiesOverride } from "core/Animations/animationPropertiesOverride";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { AnimationCurveEditorComponent } from "./curveEditor/animationCurveEditorComponent";
import { Context } from "./curveEditor/context";
export class AnimationGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this._animations = null;
        this._isPlaying = false;
        this._animationControl = {
            from: 0,
            to: 0,
            loop: false,
            initialized: false,
        };
        this.state = { currentFrame: 0 };
        const animatableAsAny = this.props.animatable;
        this._ranges = animatableAsAny.getAnimationRanges ? animatableAsAny.getAnimationRanges() : [];
        if (animatableAsAny.getAnimatables) {
            const animatables = animatableAsAny.getAnimatables();
            this._animations = new Array();
            animatables.forEach((animatable) => {
                if (animatable.animations) {
                    this._animations.push(...animatable.animations);
                }
            });
            if (animatableAsAny.animations) {
                this._animations.push(...animatableAsAny.animations);
            }
            // Extract from and to
            if (this._animations && this._animations.length) {
                this._animations.forEach((animation) => {
                    const keys = animation.getKeys();
                    if (keys && keys.length > 0) {
                        if (keys[0].frame < this._animationControl.from) {
                            this._animationControl.from = keys[0].frame;
                        }
                        const lastKeyIndex = keys.length - 1;
                        if (keys[lastKeyIndex].frame > this._animationControl.to) {
                            this._animationControl.to = keys[lastKeyIndex].frame;
                        }
                    }
                });
            }
        }
        this._timelineRef = React.createRef();
    }
    playOrPause() {
        const animatable = this.props.animatable;
        this._isPlaying = this.props.scene.getAllAnimatablesByTarget(animatable).length > 0;
        if (this._isPlaying) {
            this.props.scene.stopAnimation(this.props.animatable);
            this._mainAnimatable = null;
        }
        else {
            this._mainAnimatable = this.props.scene.beginAnimation(this.props.animatable, this._animationControl.from, this._animationControl.to, this._animationControl.loop);
        }
        this.forceUpdate();
    }
    componentDidMount() {
        this._onBeforeRenderObserver = this.props.scene.onBeforeRenderObservable.add(() => {
            if (!this._isPlaying || !this._mainAnimatable) {
                return;
            }
            this.setState({ currentFrame: this._mainAnimatable.masterFrame });
        });
    }
    componentWillUnmount() {
        if (this._onBeforeRenderObserver) {
            this.props.scene.onBeforeRenderObservable.remove(this._onBeforeRenderObserver);
            this._onBeforeRenderObserver = null;
        }
    }
    onCurrentFrameChange(value) {
        if (!this._mainAnimatable) {
            return;
        }
        this._mainAnimatable.goToFrame(value);
        this.setState({ currentFrame: value });
    }
    onChangeFromOrTo() {
        this.playOrPause();
        if (this._isPlaying) {
            this.playOrPause();
        }
    }
    componentDidUpdate(prevProps) {
        const prevId = prevProps.animatable.uniqueId;
        const currId = this.props.animatable.uniqueId;
        if (prevId !== currId) {
            this._animationCurveEditorContext = null;
        }
    }
    render() {
        const animatable = this.props.animatable;
        const animatableAsAny = this.props.animatable;
        const animatablesForTarget = this.props.scene.getAllAnimatablesByTarget(animatable);
        this._isPlaying = animatablesForTarget.length > 0;
        if (this._isPlaying) {
            this._mainAnimatable = animatablesForTarget[0];
            if (this._mainAnimatable) {
                this._animationControl.from = this._mainAnimatable.fromFrame;
                this._animationControl.to = this._mainAnimatable.toFrame;
                this._animationControl.loop = this._mainAnimatable.loopAnimation;
                this._animationControl.initialized = true;
            }
        }
        const animations = animatable.animations;
        if (!this._animationCurveEditorContext) {
            this._animationCurveEditorContext = new Context();
            this._animationCurveEditorContext.title = this.props.animatable.name || "";
            this._animationCurveEditorContext.animations = animations;
            this._animationCurveEditorContext.target = this.props.animatable;
            this._animationCurveEditorContext.scene = this.props.scene;
            this._animationCurveEditorContext.fromKey = this._animationControl.from;
            this._animationCurveEditorContext.toKey = this._animationControl.to;
            this._animationCurveEditorContext.useExistingPlayRange = this._animationControl.initialized;
        }
        return (_jsxs(_Fragment, { children: [this._ranges.length > 0 && (_jsx(LineContainerComponent, { title: "ANIMATION RANGES", selection: this.props.globalState, children: this._ranges.map((range, i) => {
                        return (_jsx(ButtonLineComponent, { label: range.name, onClick: () => {
                                this._mainAnimatable = null;
                                this.props.scene.beginAnimation(animatable, range.from, range.to, true);
                            } }, range.name + i));
                    }) })), animations && (_jsxs(_Fragment, { children: [_jsxs(LineContainerComponent, { title: "ANIMATIONS", selection: this.props.globalState, children: [_jsx(TextLineComponent, { label: "Count", value: animations.length.toString() }), animations.map((anim, i) => {
                                    return _jsx(TextLineComponent, { label: "#" + i + " >", value: anim.targetProperty }, anim.targetProperty + i);
                                }), _jsx(AnimationCurveEditorComponent, { globalState: this.props.globalState, context: this._animationCurveEditorContext })] }), animations.length > 0 && (_jsxs(LineContainerComponent, { title: "ANIMATION GENERAL CONTROL", selection: this.props.globalState, children: [_jsx(FloatLineComponent, { lockObject: this.props.lockObject, isInteger: true, label: "From", target: this._animationControl, propertyName: "from", onChange: () => this.onChangeFromOrTo() }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, isInteger: true, label: "To", target: this._animationControl, propertyName: "to", onChange: () => this.onChangeFromOrTo() }), _jsx(CheckBoxLineComponent, { label: "Loop", onSelect: (value) => {
                                        this._animationControl.loop = value;
                                        animatablesForTarget.forEach((at) => {
                                            at.loopAnimation = value;
                                        });
                                    }, isSelected: () => this._animationControl.loop }), this._isPlaying && (_jsx(SliderLineComponent, { lockObject: this.props.lockObject, ref: this._timelineRef, label: "Current frame", minimum: this._animationControl.from, maximum: this._animationControl.to, step: (this._animationControl.to - this._animationControl.from) / 1000.0, directValue: this.state.currentFrame, onInput: (value) => this.onCurrentFrameChange(value) })), _jsx(ButtonLineComponent, { label: this._isPlaying ? "Stop" : "Play", onClick: () => this.playOrPause() }), (this._ranges.length > 0 || (this._animations && this._animations.length > 0)) && (_jsxs(_Fragment, { children: [_jsx(CheckBoxLineComponent, { label: "Enable override", onSelect: (value) => {
                                                if (value) {
                                                    animatableAsAny.animationPropertiesOverride = new AnimationPropertiesOverride();
                                                    animatableAsAny.animationPropertiesOverride.blendingSpeed = 0.05;
                                                }
                                                else {
                                                    animatableAsAny.animationPropertiesOverride = null;
                                                }
                                                this.forceUpdate();
                                            }, isSelected: () => animatableAsAny.animationPropertiesOverride != null, onValueChanged: () => this.forceUpdate() }), animatableAsAny.animationPropertiesOverride != null && (_jsxs("div", { children: [_jsx(CheckBoxLineComponent, { label: "Enable blending", target: animatableAsAny.animationPropertiesOverride, propertyName: "enableBlending", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Blending speed", target: animatableAsAny.animationPropertiesOverride, propertyName: "blendingSpeed", minimum: 0, maximum: 0.1, step: 0.01, onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }))] }))] }))] }))] }));
    }
}
//# sourceMappingURL=animationPropertyGridComponent.js.map