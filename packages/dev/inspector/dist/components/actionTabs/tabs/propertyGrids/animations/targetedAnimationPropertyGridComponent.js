import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { AnimationCurveEditorComponent } from "./curveEditor/animationCurveEditorComponent";
import { Context } from "./curveEditor/context";
export class TargetedAnimationGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this.findAnimationGroup = () => {
            this._animationGroup = this.props.scene.animationGroups.find((ag) => {
                const ta = ag.targetedAnimations.find((ta) => ta === this.props.targetedAnimation);
                return ta !== undefined;
            });
        };
        this.playOrPause = () => {
            if (this._animationGroup) {
                if (this._animationGroup.isPlaying) {
                    this._animationGroup.stop();
                }
                else {
                    this._animationGroup.start();
                }
                this.forceUpdate();
            }
        };
        this.deleteAnimation = () => {
            if (this._animationGroup) {
                const index = this._animationGroup.targetedAnimations.indexOf(this.props.targetedAnimation);
                if (index > -1) {
                    this._animationGroup.targetedAnimations.splice(index, 1);
                    this.props.onSelectionChangedObservable?.notifyObservers(null);
                    if (this._animationGroup.isPlaying) {
                        this._animationGroup.stop();
                        this._animationGroup.start();
                    }
                }
            }
        };
        this.updateContextFromProps = () => {
            if (!this._animationCurveEditorContext) {
                this._animationCurveEditorContext = new Context();
            }
            this._animationCurveEditorContext.title = this.props.targetedAnimation.target.name || "";
            this._animationCurveEditorContext.animations = [this.props.targetedAnimation.animation];
            this._animationCurveEditorContext.target = this.props.targetedAnimation.target;
            this._animationCurveEditorContext.scene = this.props.scene;
            if (this._animationGroup) {
                this._animationCurveEditorContext.rootAnimationGroup = this._animationGroup;
            }
        };
    }
    componentDidMount() {
        this.findAnimationGroup();
        this.updateContextFromProps();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.targetedAnimation !== this.props.targetedAnimation) {
            this.findAnimationGroup();
            this.updateContextFromProps();
        }
    }
    render() {
        const targetedAnimation = this.props.targetedAnimation;
        return (_jsx(_Fragment, { children: _jsxs(LineContainerComponent, { title: "GENERAL", selection: this.props.globalState, children: [_jsx(TextLineComponent, { label: "Class", value: targetedAnimation.getClassName() }), _jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Name", target: targetedAnimation.animation, propertyName: "name", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), targetedAnimation.target.name && (_jsx(TextLineComponent, { label: "Target", value: targetedAnimation.target.name, onLink: () => this.props.globalState.onSelectionChangedObservable.notifyObservers(targetedAnimation) })), this._animationCurveEditorContext && _jsx(AnimationCurveEditorComponent, { globalState: this.props.globalState, context: this._animationCurveEditorContext }), _jsx(ButtonLineComponent, { label: "Dispose", onClick: this.deleteAnimation })] }) }));
    }
}
//# sourceMappingURL=targetedAnimationPropertyGridComponent.js.map