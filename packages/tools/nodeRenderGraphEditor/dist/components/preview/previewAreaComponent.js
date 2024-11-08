import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { DataStorage } from "core/Misc/dataStorage";
import omni from "./svgs/omni.svg";
import directionalRight from "./svgs/directionalRight.svg";
import directionalLeft from "./svgs/directionalLeft.svg";
export class PreviewAreaComponent extends React.Component {
    constructor(props) {
        super(props);
        this._onPointerOverCanvas = () => {
            this.props.globalState.pointerOverCanvas = true;
        };
        this._onPointerOutCanvas = () => {
            this.props.globalState.pointerOverCanvas = false;
        };
        this.state = { isLoading: true };
        this._onIsLoadingChangedObserver = this.props.globalState.onIsLoadingChanged.add((state) => this.setState({ isLoading: state }));
        this._onResetRequiredObserver = this.props.globalState.onResetRequiredObservable.add(() => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        this.props.globalState.onIsLoadingChanged.remove(this._onIsLoadingChangedObserver);
        this.props.globalState.onResetRequiredObservable.remove(this._onResetRequiredObserver);
    }
    render() {
        return (_jsxs(_Fragment, { children: [_jsxs("div", { id: "preview", style: { height: this.props.width + "px" }, children: [_jsx("canvas", { onPointerOver: this._onPointerOverCanvas, onPointerOut: this._onPointerOutCanvas, id: "preview-canvas" }), _jsx("div", { className: "waitPanel" + (this.state.isLoading ? "" : " hidden"), children: "Please wait, loading..." })] }), _jsx(_Fragment, { children: _jsx("div", { id: "preview-config-bar", children: _jsx(_Fragment, { children: _jsxs("div", { id: "preview-config-bar", children: [_jsx("div", { title: "Turn on/off hemispheric light", onClick: () => {
                                            this.props.globalState.hemisphericLight = !this.props.globalState.hemisphericLight;
                                            DataStorage.WriteBoolean("HemisphericLight", this.props.globalState.hemisphericLight);
                                            this.props.globalState.onLightUpdated.notifyObservers();
                                            this.forceUpdate();
                                        }, className: "button hemispheric-light" + (this.props.globalState.hemisphericLight ? " selected" : ""), children: _jsx("img", { src: omni, alt: "" }) }), _jsx("div", { title: "Turn on/off direction light #1", onClick: () => {
                                            this.props.globalState.directionalLight1 = !this.props.globalState.directionalLight1;
                                            DataStorage.WriteBoolean("DirectionalLight1", this.props.globalState.directionalLight1);
                                            this.props.globalState.onLightUpdated.notifyObservers();
                                            this.forceUpdate();
                                        }, className: "button direction-light-1" + (this.props.globalState.directionalLight1 ? " selected" : ""), children: _jsx("img", { src: directionalRight, alt: "" }) }), _jsx("div", { title: "Turn on/off direction light #0", onClick: () => {
                                            this.props.globalState.directionalLight0 = !this.props.globalState.directionalLight0;
                                            DataStorage.WriteBoolean("DirectionalLight0", this.props.globalState.directionalLight0);
                                            this.props.globalState.onLightUpdated.notifyObservers();
                                            this.forceUpdate();
                                        }, className: "button direction-light-0" + (this.props.globalState.directionalLight0 ? " selected" : ""), children: _jsx("img", { src: directionalLeft, alt: "" }) })] }) }) }) })] }));
    }
}
//# sourceMappingURL=previewAreaComponent.js.map