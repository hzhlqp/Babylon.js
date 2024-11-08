import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { DataStorage } from "core/Misc/dataStorage";
import { NodeMaterialModes } from "core/Materials/Node/Enums/nodeMaterialModes";
import { ParticleSystem } from "core/Particles/particleSystem";
import doubleSided from "./svgs/doubleSided.svg";
import depthPass from "./svgs/depthPass.svg";
import omni from "./svgs/omni.svg";
import directionalRight from "./svgs/directionalRight.svg";
import directionalLeft from "./svgs/directionalLeft.svg";
import background from "./svgs/icon-ibl.svg";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
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
    changeBackFaceCulling(value) {
        this.props.globalState.backFaceCulling = value;
        DataStorage.WriteBoolean("BackFaceCulling", value);
        this.props.globalState.onBackFaceCullingChanged.notifyObservers();
        this.forceUpdate();
    }
    changeDepthPrePass(value) {
        this.props.globalState.depthPrePass = value;
        DataStorage.WriteBoolean("DepthPrePass", value);
        this.props.globalState.onDepthPrePassChanged.notifyObservers();
        this.forceUpdate();
    }
    changeParticleSystemBlendMode(newOne) {
        if (this.props.globalState.particleSystemBlendMode === newOne) {
            return;
        }
        this.props.globalState.particleSystemBlendMode = newOne;
        this.props.globalState.stateManager.onUpdateRequiredObservable.notifyObservers(null);
        DataStorage.WriteNumber("DefaultParticleSystemBlendMode", newOne);
        this.forceUpdate();
    }
    render() {
        const blendModeOptions = [
            { label: "Add", value: ParticleSystem.BLENDMODE_ADD },
            { label: "Multiply", value: ParticleSystem.BLENDMODE_MULTIPLY },
            { label: "Multiply Add", value: ParticleSystem.BLENDMODE_MULTIPLYADD },
            { label: "OneOne", value: ParticleSystem.BLENDMODE_ONEONE },
            { label: "Standard", value: ParticleSystem.BLENDMODE_STANDARD },
        ];
        return (_jsxs(_Fragment, { children: [_jsxs("div", { id: "preview", style: { height: this.props.width + "px" }, children: [_jsx("canvas", { onPointerOver: this._onPointerOverCanvas, onPointerOut: this._onPointerOutCanvas, id: "preview-canvas" }), _jsx("div", { className: "waitPanel" + (this.state.isLoading ? "" : " hidden"), children: "Please wait, loading..." })] }), this.props.globalState.mode === NodeMaterialModes.Particle && (_jsx("div", { id: "preview-config-bar", className: "extended", children: _jsx(OptionsLine, { label: "Blend mode", options: blendModeOptions, target: this.props.globalState, propertyName: "particleSystemBlendMode", noDirectUpdate: true, onSelect: (value) => {
                            this.changeParticleSystemBlendMode(value);
                        } }) })), this.props.globalState.mode === NodeMaterialModes.Material && (_jsx(_Fragment, { children: _jsxs("div", { id: "preview-config-bar", children: [_jsx("div", { title: "Render without back face culling", onClick: () => this.changeBackFaceCulling(!this.props.globalState.backFaceCulling), className: "button back-face" + (!this.props.globalState.backFaceCulling ? " selected" : ""), children: _jsx("img", { src: doubleSided, alt: "" }) }), _jsx("div", { title: "Render with depth pre-pass", onClick: () => this.changeDepthPrePass(!this.props.globalState.depthPrePass), className: "button depth-pass" + (this.props.globalState.depthPrePass ? " selected" : ""), children: _jsx("img", { src: depthPass, alt: "" }) }), _jsx("div", { title: "Turn on/off hemispheric light", onClick: () => {
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
                                }, className: "button direction-light-0" + (this.props.globalState.directionalLight0 ? " selected" : ""), children: _jsx("img", { src: directionalLeft, alt: "" }) }), _jsx("div", { title: "Turn on/off environment", onClick: () => {
                                    this.props.globalState.backgroundHDR = !this.props.globalState.backgroundHDR;
                                    DataStorage.WriteBoolean("backgroundHDR", this.props.globalState.backgroundHDR);
                                    this.props.globalState.onBackgroundHDRUpdated.notifyObservers();
                                    this.forceUpdate();
                                }, className: "button " + (this.props.globalState.backgroundHDR ? " selected" : ""), children: _jsx("img", { src: background, alt: "" }) })] }) }))] }));
    }
}
//# sourceMappingURL=previewAreaComponent.js.map