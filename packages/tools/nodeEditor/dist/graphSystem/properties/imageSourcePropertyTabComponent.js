import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FileButtonLine } from "shared-ui-components/lines/fileButtonLineComponent";
import { Tools } from "core/Misc/tools";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "../../sharedComponents/checkBoxLineComponent";
import { Texture } from "core/Materials/Textures/texture";
import { GeneralPropertyTabComponent, GenericPropertyTabComponent } from "./genericNodePropertyComponent";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
export class ImageSourcePropertyTabComponent extends React.Component {
    get imageSourceBlock() {
        return this.props.nodeData.data;
    }
    constructor(props) {
        super(props);
        const texture = this.imageSourceBlock.texture;
        this.state = { isEmbedded: !texture || texture.name.substring(0, 4) === "data" };
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (nextProps.nodeData.data !== this.props.nodeData.data) {
            const texture = nextProps.nodeData.data.texture;
            nextState.isEmbedded = !texture || texture.name.substring(0, 4) === "data";
            nextState.loadAsCubeTexture = texture && texture.isCube;
        }
    }
    _generateRandomForCache() {
        return "xxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, () => {
            const r = (Math.random() * 10) | 0;
            return r.toString();
        });
    }
    updateAfterTextureLoad() {
        this.props.stateManager.onUpdateRequiredObservable.notifyObservers(this.props.nodeData.data);
        this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
        this.forceUpdate();
    }
    removeTexture() {
        let texture = this.imageSourceBlock.texture;
        if (texture) {
            texture.dispose();
            texture = null;
            this.imageSourceBlock.texture = null;
        }
        this.updateAfterTextureLoad();
    }
    _prepareTexture() {
        let texture = this.imageSourceBlock.texture;
        if (texture) {
            texture.dispose();
            texture = null;
        }
        if (!texture) {
            this.imageSourceBlock.texture = new Texture(null, this.props.stateManager.data.nodeMaterial.getScene(), false, false);
            texture = this.imageSourceBlock.texture;
            texture.coordinatesMode = Texture.EQUIRECTANGULAR_MODE;
        }
    }
    /**
     * Replaces the texture of the node
     * @param file the file of the texture to use
     */
    replaceTexture(file) {
        this._prepareTexture();
        const texture = this.imageSourceBlock.texture;
        Tools.ReadFile(file, (data) => {
            const blob = new Blob([data], { type: "octet/stream" });
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                let extension = undefined;
                if (file.name.toLowerCase().indexOf(".dds") > 0) {
                    extension = ".dds";
                }
                else if (file.name.toLowerCase().indexOf(".env") > 0) {
                    extension = ".env";
                }
                texture.updateURL(base64data, extension, () => this.updateAfterTextureLoad());
            };
        }, undefined, true);
    }
    replaceTextureWithUrl(url) {
        this._prepareTexture();
        const texture = this.imageSourceBlock.texture;
        texture.updateURL(url, null, () => this.updateAfterTextureLoad());
    }
    render() {
        let url = "";
        const block = this.props.nodeData.data;
        const texture = this.imageSourceBlock.texture;
        if (texture && texture.name && texture.name.substring(0, 4) !== "data") {
            url = texture.name;
        }
        url = url.replace(/\?nocache=\d+/, "");
        const samplingMode = [
            { label: "Nearest", value: Texture.NEAREST_NEAREST },
            { label: "Linear", value: Texture.LINEAR_LINEAR },
            { label: "Linear & linear mip", value: Texture.LINEAR_LINEAR_MIPLINEAR },
            { label: "Linear & nearest mip", value: Texture.LINEAR_LINEAR_MIPNEAREST },
            { label: "Nearest & linear mip", value: Texture.NEAREST_NEAREST_MIPLINEAR },
            { label: "Nearest & nearest mip", value: Texture.NEAREST_NEAREST_MIPNEAREST },
            { label: "Nearest/Linear", value: Texture.NEAREST_LINEAR },
            { label: "Nearest/Linear & linear mip", value: Texture.NEAREST_LINEAR_MIPLINEAR },
            { label: "Nearest/Linear & nearest mip", value: Texture.NEAREST_LINEAR_MIPNEAREST },
            { label: "Linear/Nearest", value: Texture.LINEAR_NEAREST },
            { label: "Linear/Nearest & linear mip", value: Texture.LINEAR_NEAREST_MIPLINEAR },
            { label: "Linear/Nearest & nearest mip", value: Texture.LINEAR_NEAREST_MIPNEAREST }, // 9
        ];
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsxs(LineContainerComponent, { title: "PROPERTIES", children: [texture && texture.updateSamplingMode && (_jsx(OptionsLine, { label: "Sampling", options: samplingMode, target: texture, noDirectUpdate: true, propertyName: "samplingMode", onSelect: (value) => {
                                texture.updateSamplingMode(value);
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && (_jsx(CheckBoxLineComponent, { label: "Clamp U", isSelected: () => texture.wrapU === Texture.CLAMP_ADDRESSMODE, onSelect: (value) => {
                                texture.wrapU = value ? Texture.CLAMP_ADDRESSMODE : Texture.WRAP_ADDRESSMODE;
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && (_jsx(CheckBoxLineComponent, { label: "Clamp V", isSelected: () => texture.wrapV === Texture.CLAMP_ADDRESSMODE, onSelect: (value) => {
                                texture.wrapV = value ? Texture.CLAMP_ADDRESSMODE : Texture.WRAP_ADDRESSMODE;
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && (_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Offset U", target: texture, propertyName: "uOffset", onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && (_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Offset V", target: texture, propertyName: "vOffset", onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && (_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Scale U", target: texture, propertyName: "uScale", onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && (_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Scale V", target: texture, propertyName: "vScale", onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && (_jsx(SliderLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Rotation U", target: texture, propertyName: "uAng", minimum: 0, maximum: Math.PI * 2, useEuler: true, step: 0.1, onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && (_jsx(SliderLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Rotation V", target: texture, propertyName: "vAng", minimum: 0, maximum: Math.PI * 2, useEuler: true, step: 0.1, onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && (_jsx(SliderLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Rotation W", target: texture, propertyName: "wAng", minimum: 0, maximum: Math.PI * 2, useEuler: true, step: 0.1, onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } }))] }), _jsxs(LineContainerComponent, { title: "SOURCE", children: [_jsx(CheckBoxLineComponent, { label: "Embed static texture", isSelected: () => this.state.isEmbedded, onSelect: (value) => {
                                this.setState({ isEmbedded: value });
                                this.imageSourceBlock.texture = null;
                                this.updateAfterTextureLoad();
                            } }), this.state.isEmbedded && _jsx(FileButtonLine, { label: "Upload", onClick: (file) => this.replaceTexture(file), accept: ".jpg, .png, .tga, .dds, .env" }), !this.state.isEmbedded && (_jsx(TextInputLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Link", value: url, onChange: (newUrl) => this.replaceTextureWithUrl(newUrl) })), !this.state.isEmbedded && url && (_jsx(ButtonLineComponent, { label: "Refresh", onClick: () => this.replaceTextureWithUrl(url + "?nocache=" + this._generateRandomForCache()) })), texture && _jsx(ButtonLineComponent, { label: "Remove", onClick: () => this.removeTexture() })] }), _jsx(GenericPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData })] }));
    }
}
//# sourceMappingURL=imageSourcePropertyTabComponent.js.map