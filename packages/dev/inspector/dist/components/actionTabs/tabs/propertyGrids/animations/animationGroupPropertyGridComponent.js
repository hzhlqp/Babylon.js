import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { Context } from "./curveEditor/context";
import { AnimationCurveEditorComponent } from "./curveEditor/animationCurveEditorComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
export class AnimationGroupGridComponent extends React.Component {
    constructor(props) {
        super(props);
        const animationGroup = this.props.animationGroup;
        this.state = { playButtonText: animationGroup.isPlaying ? "Pause" : "Play", currentFrame: 0 };
        this._timelineRef = React.createRef();
    }
    componentDidMount() {
        this.connect(this.props.animationGroup);
        this._onBeforeRenderObserver = this.props.scene.onBeforeRenderObservable.add(() => {
            this.updateCurrentFrame(this.props.animationGroup);
        });
    }
    disconnect(animationGroup) {
        if (this._onAnimationGroupPlayObserver) {
            animationGroup.onAnimationGroupPlayObservable.remove(this._onAnimationGroupPlayObserver);
            this._onAnimationGroupPlayObserver = null;
        }
        if (this._onAnimationGroupPauseObserver) {
            animationGroup.onAnimationGroupPauseObservable.remove(this._onAnimationGroupPauseObserver);
            this._onAnimationGroupPauseObserver = null;
        }
    }
    connect(animationGroup) {
        this._onAnimationGroupPlayObserver = animationGroup.onAnimationGroupPlayObservable.add(() => {
            this.forceUpdate();
        });
        this._onAnimationGroupPauseObserver = animationGroup.onAnimationGroupPauseObservable.add(() => {
            this.forceUpdate();
        });
        this.updateCurrentFrame(animationGroup);
    }
    updateCurrentFrame(animationGroup) {
        const targetedAnimations = animationGroup.targetedAnimations;
        if (targetedAnimations.length > 0) {
            const runtimeAnimation = targetedAnimations[0].animation.runtimeAnimations.find((rA) => rA.target === targetedAnimations[0].target);
            if (runtimeAnimation) {
                this.setState({ currentFrame: runtimeAnimation.currentFrame });
            }
            else {
                this.setState({ currentFrame: 0 });
            }
        }
    }
    shouldComponentUpdate(nextProps) {
        if (this.props.animationGroup !== nextProps.animationGroup) {
            this.disconnect(this.props.animationGroup);
            this.connect(nextProps.animationGroup);
        }
        return true;
    }
    componentWillUnmount() {
        this.disconnect(this.props.animationGroup);
        if (this._onBeforeRenderObserver) {
            this.props.scene.onBeforeRenderObservable.remove(this._onBeforeRenderObserver);
            this._onBeforeRenderObserver = null;
        }
    }
    playOrPause() {
        const animationGroup = this.props.animationGroup;
        if (animationGroup.isPlaying) {
            this.setState({ playButtonText: "Play" });
            animationGroup.pause();
        }
        else {
            this.setState({ playButtonText: "Pause" });
            animationGroup.play(true);
        }
    }
    onCurrentFrameChange(value) {
        const animationGroup = this.props.animationGroup;
        if (!animationGroup.isPlaying) {
            animationGroup.play(true);
            animationGroup.goToFrame(value);
            animationGroup.pause();
        }
        else {
            animationGroup.goToFrame(value);
        }
        this.setState({ currentFrame: value });
    }
    render() {
        const animationGroup = this.props.animationGroup;
        const playButtonText = animationGroup.isPlaying ? "Pause" : "Play";
        if (!this._animationCurveEditorContext) {
            this._animationCurveEditorContext = new Context();
            this._animationCurveEditorContext.title = animationGroup.name || "";
            this._animationCurveEditorContext.animations = animationGroup.targetedAnimations;
            this._animationCurveEditorContext.scene = this.props.scene;
            this._animationCurveEditorContext.useTargetAnimations = true;
            this._animationCurveEditorContext.rootAnimationGroup = animationGroup;
        }
        return (_jsxs(_Fragment, { children: [_jsxs(LineContainerComponent, { title: "GENERAL", children: [_jsx(TextLineComponent, { label: "Class", value: animationGroup.getClassName() }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Name", target: animationGroup, propertyName: "name", onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), _jsxs(LineContainerComponent, { title: "CONTROLS", children: [_jsx(ButtonLineComponent, { label: playButtonText, onClick: () => this.playOrPause() }), _jsx(ButtonLineComponent, { label: "Stop", onClick: () => this.props.animationGroup.stop() }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Speed ratio", minimum: 0, maximum: 10, step: 0.1, target: animationGroup, propertyName: "speedRatio", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, ref: this._timelineRef, label: "Current frame", minimum: animationGroup.from, maximum: animationGroup.to, step: (animationGroup.to - animationGroup.from) / 1000.0, directValue: this.state.currentFrame, onInput: (value) => this.onCurrentFrameChange(value) }), _jsx(CheckBoxLineComponent, { label: "Blending", target: animationGroup, propertyName: "enableBlending", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Blending speed", minimum: 0, maximum: 1, step: 0.01, target: animationGroup, propertyName: "blendingSpeed", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Is additive", target: animationGroup, propertyName: "isAdditive", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Weight", target: animationGroup, propertyName: "weight", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Play order", target: animationGroup, propertyName: "playOrder", isInteger: true, onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }), _jsxs(LineContainerComponent, { title: "INFOS", children: [_jsx(TextLineComponent, { label: "Animation count", value: animationGroup.targetedAnimations.length.toString() }), _jsx(AnimationCurveEditorComponent, { globalState: this.props.globalState, context: this._animationCurveEditorContext }), _jsx(TextLineComponent, { label: "From", value: animationGroup.from.toFixed(2) }), _jsx(TextLineComponent, { label: "To", value: animationGroup.to.toFixed(2) }), _jsx(TextLineComponent, { label: "Unique ID", value: animationGroup.uniqueId.toString() })] })] }));
    }
}
//# sourceMappingURL=animationGroupPropertyGridComponent.js.map