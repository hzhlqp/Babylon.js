import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { AnimationEntryComponent } from "./animationEntryComponent";
export class AnimationListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isVisible: true };
        this._onEditAnimationRequiredObserver = this.props.context.onEditAnimationRequired.add(() => {
            this.setState({
                isVisible: false,
            });
        });
        this._onEditAnimationUIClosedObserver = this.props.context.onEditAnimationUIClosed.add(() => {
            this.setState({
                isVisible: true,
            });
        });
        this._onDeleteAnimationObserver = this.props.context.onDeleteAnimation.add(() => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        if (this._onEditAnimationRequiredObserver) {
            this.props.context.onEditAnimationRequired.remove(this._onEditAnimationRequiredObserver);
        }
        if (this._onEditAnimationUIClosedObserver) {
            this.props.context.onEditAnimationUIClosed.remove(this._onEditAnimationUIClosedObserver);
        }
        if (this._onDeleteAnimationObserver) {
            this.props.context.onDeleteAnimation.remove(this._onDeleteAnimationObserver);
        }
    }
    render() {
        if (!this.state.isVisible) {
            return null;
        }
        return (_jsx("div", { id: "animation-list", children: this.props.context.animations?.map((a, i) => {
                return (_jsx(AnimationEntryComponent, { globalState: this.props.globalState, context: this.props.context, animation: this.props.context.useTargetAnimations ? a.animation : a }, i));
            }) }));
    }
}
//# sourceMappingURL=animationListComponent.js.map