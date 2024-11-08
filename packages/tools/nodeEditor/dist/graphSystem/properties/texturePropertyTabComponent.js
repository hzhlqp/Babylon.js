import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { FileButtonLine } from "shared-ui-components/lines/fileButtonLineComponent";
import { Tools } from "core/Misc/tools";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { CheckBoxLineComponent } from "../../sharedComponents/checkBoxLineComponent";
import { Texture } from "core/Materials/Textures/texture";
import { CubeTexture } from "core/Materials/Textures/cubeTexture";
import { ReflectionTextureBlock } from "core/Materials/Node/Blocks/Dual/reflectionTextureBlock";
import { ReflectionBlock } from "core/Materials/Node/Blocks/PBR/reflectionBlock";
import { RefractionBlock } from "core/Materials/Node/Blocks/PBR/refractionBlock";
import { CurrentScreenBlock } from "core/Materials/Node/Blocks/Dual/currentScreenBlock";
import { ParticleTextureBlock } from "core/Materials/Node/Blocks/Particle/particleTextureBlock";
import { GeneralPropertyTabComponent, GenericPropertyTabComponent } from "./genericNodePropertyComponent";
import { NodeMaterialModes } from "core/Materials/Node/Enums/nodeMaterialModes";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
export class TexturePropertyTabComponent extends React.Component {
    get textureBlock() {
        return this.props.nodeData.data;
    }
    constructor(props) {
        super(props);
        const texture = this.textureBlock.texture;
        this.state = { isEmbedded: !texture || texture.name.substring(0, 4) === "data", loadAsCubeTexture: texture && texture.isCube, textureIsPrefiltered: true };
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
        let texture = this.textureBlock.texture;
        if (texture) {
            texture.dispose();
            texture = null;
            this.textureBlock.texture = null;
        }
        this.updateAfterTextureLoad();
    }
    _prepareTexture() {
        let texture = this.textureBlock.texture;
        if (texture && texture.isCube !== this.state.loadAsCubeTexture) {
            texture.dispose();
            texture = null;
        }
        if (!texture) {
            const globalState = this.props.stateManager.data;
            if (!this.state.loadAsCubeTexture) {
                this.textureBlock.texture = new Texture(null, globalState.nodeMaterial.getScene(), false, this.textureBlock instanceof ReflectionTextureBlock ||
                    this.textureBlock instanceof ReflectionBlock ||
                    this.textureBlock instanceof RefractionBlock ||
                    globalState.mode === NodeMaterialModes.PostProcess);
                texture = this.textureBlock.texture;
                texture.coordinatesMode = Texture.EQUIRECTANGULAR_MODE;
            }
            else {
                this.textureBlock.texture = new CubeTexture("", globalState.nodeMaterial.getScene());
                texture = this.textureBlock.texture;
                texture.coordinatesMode = Texture.CUBIC_MODE;
            }
        }
    }
    /**
     * Replaces the texture of the node
     * @param file the file of the texture to use
     */
    replaceTexture(file) {
        this._prepareTexture();
        const texture = this.textureBlock.texture;
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
                if (texture.isCube) {
                    texture.updateURL(base64data, extension, () => this.updateAfterTextureLoad(), this.state.textureIsPrefiltered);
                }
                else {
                    texture.updateURL(base64data, extension, () => this.updateAfterTextureLoad());
                }
            };
        }, undefined, true);
    }
    replaceTextureWithUrl(url) {
        this._prepareTexture();
        const texture = this.textureBlock.texture;
        // We need to update the texture name with the url so later on the render
        // doesn't overwrite the url texture with the name of the texture.
        texture.name = url;
        if (texture.isCube || this.textureBlock instanceof ReflectionTextureBlock || this.textureBlock instanceof ReflectionBlock || this.textureBlock instanceof RefractionBlock) {
            let extension = undefined;
            if (url.toLowerCase().indexOf(".dds") > 0) {
                extension = ".dds";
            }
            else if (url.toLowerCase().indexOf(".env") > 0) {
                extension = ".env";
            }
            texture.updateURL(url, extension, () => this.updateAfterTextureLoad(), this.state.textureIsPrefiltered);
        }
        else {
            texture.updateURL(url, null, () => this.updateAfterTextureLoad());
        }
    }
    render() {
        let url = "";
        const block = this.props.nodeData.data;
        const texture = this.textureBlock.hasImageSource ? null : this.textureBlock.texture;
        if (texture && texture.name && texture.name.substring(0, 4) !== "data") {
            url = texture.name;
        }
        url = url.replace(/\?nocache=\d+/, "");
        const isInReflectionMode = this.textureBlock instanceof ReflectionTextureBlock || this.textureBlock instanceof ReflectionBlock || this.textureBlock instanceof RefractionBlock;
        const isFrozenTexture = this.textureBlock instanceof CurrentScreenBlock || this.textureBlock instanceof ParticleTextureBlock;
        const showIsInGammaSpace = this.textureBlock instanceof ReflectionBlock;
        const reflectionModeOptions = [
            {
                label: "Cubic",
                value: Texture.CUBIC_MODE,
            },
            {
                label: "Equirectangular",
                value: Texture.EQUIRECTANGULAR_MODE,
            },
            {
                label: "Explicit",
                value: Texture.EXPLICIT_MODE,
            },
            {
                label: "Fixed equirectangular",
                value: Texture.FIXED_EQUIRECTANGULAR_MODE,
            },
            {
                label: "Fixed mirrored equirectangular",
                value: Texture.FIXED_EQUIRECTANGULAR_MIRRORED_MODE,
            },
            {
                label: "Planar",
                value: Texture.PLANAR_MODE,
            },
            {
                label: "Projection",
                value: Texture.PROJECTION_MODE,
            },
            {
                label: "Skybox",
                value: Texture.SKYBOX_MODE,
            },
            {
                label: "Spherical",
                value: Texture.SPHERICAL_MODE,
            },
        ];
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
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsxs(LineContainerComponent, { title: "PROPERTIES", children: [_jsx(CheckBoxLineComponent, { label: "Auto select UV", propertyName: "autoSelectUV", target: block, onValueChanged: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } }), !isInReflectionMode && (_jsx(CheckBoxLineComponent, { label: "Convert to gamma space", propertyName: "convertToGammaSpace", target: block, onValueChanged: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), !isInReflectionMode && (_jsx(CheckBoxLineComponent, { label: "Convert to linear space", propertyName: "convertToLinearSpace", target: block, onValueChanged: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && showIsInGammaSpace && (_jsx(CheckBoxLineComponent, { label: "Is in gamma space", propertyName: "gammaSpace", target: texture, onValueChanged: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), _jsx(CheckBoxLineComponent, { label: "Disable multiplying by level", propertyName: "disableLevelMultiplication", target: block, onValueChanged: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                            } }), texture && texture.updateSamplingMode && (_jsx(OptionsLine, { label: "Sampling", options: samplingMode, target: texture, noDirectUpdate: true, propertyName: "samplingMode", onSelect: (value) => {
                                texture.updateSamplingMode(value);
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && isInReflectionMode && (_jsx(OptionsLine, { label: "Reflection mode", options: reflectionModeOptions, target: texture, propertyName: "coordinatesMode", onSelect: (value) => {
                                texture.coordinatesMode = value;
                                this.forceUpdate();
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && !isInReflectionMode && !isFrozenTexture && (_jsx(CheckBoxLineComponent, { label: "Clamp U", isSelected: () => texture.wrapU === Texture.CLAMP_ADDRESSMODE, onSelect: (value) => {
                                texture.wrapU = value ? Texture.CLAMP_ADDRESSMODE : Texture.WRAP_ADDRESSMODE;
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                            } })), texture && !isInReflectionMode && !isFrozenTexture && (_jsx(CheckBoxLineComponent, { label: "Clamp V", isSelected: () => texture.wrapV === Texture.CLAMP_ADDRESSMODE, onSelect: (value) => {
                                texture.wrapV = value ? Texture.CLAMP_ADDRESSMODE : Texture.WRAP_ADDRESSMODE;
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                            } })), texture && !isInReflectionMode && !isFrozenTexture && (_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Offset U", target: texture, propertyName: "uOffset", onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && !isInReflectionMode && !isFrozenTexture && (_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Offset V", target: texture, propertyName: "vOffset", onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && !isInReflectionMode && !isFrozenTexture && (_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Scale U", target: texture, propertyName: "uScale", onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && !isInReflectionMode && !isFrozenTexture && (_jsx(FloatLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Scale V", target: texture, propertyName: "vScale", onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && !isInReflectionMode && !isFrozenTexture && (_jsx(SliderLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Rotation U", target: texture, propertyName: "uAng", minimum: 0, maximum: Math.PI * 2, useEuler: true, step: 0.1, onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && !isInReflectionMode && !isFrozenTexture && (_jsx(SliderLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Rotation V", target: texture, propertyName: "vAng", minimum: 0, maximum: Math.PI * 2, useEuler: true, step: 0.1, onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } })), texture && !isInReflectionMode && !isFrozenTexture && (_jsx(SliderLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Rotation W", target: texture, propertyName: "wAng", minimum: 0, maximum: Math.PI * 2, useEuler: true, step: 0.1, onChange: () => {
                                this.props.stateManager.onUpdateRequiredObservable.notifyObservers(block);
                            } }))] }), !this.textureBlock.hasImageSource && (_jsxs(LineContainerComponent, { title: "SOURCE", children: [_jsx(CheckBoxLineComponent, { label: "Embed static texture", isSelected: () => this.state.isEmbedded, onSelect: (value) => {
                                this.setState({ isEmbedded: value });
                                this.textureBlock.texture = null;
                                this.updateAfterTextureLoad();
                            } }), isInReflectionMode && (_jsx(CheckBoxLineComponent, { label: "Load as cube texture", isSelected: () => this.state.loadAsCubeTexture, onSelect: (value) => this.setState({ loadAsCubeTexture: value }) })), isInReflectionMode && this.state.loadAsCubeTexture && (_jsx(CheckBoxLineComponent, { label: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Texture is prefiltered", isSelected: () => this.state.textureIsPrefiltered, onSelect: (value) => this.setState({ textureIsPrefiltered: value }) })), this.state.isEmbedded && _jsx(FileButtonLine, { label: "Upload", onClick: (file) => this.replaceTexture(file), accept: ".jpg, .png, .tga, .dds, .env, .exr" }), !this.state.isEmbedded && (_jsx(TextInputLineComponent, { lockObject: this.props.stateManager.lockObject, label: "Link", value: url, onChange: (newUrl) => this.replaceTextureWithUrl(newUrl) })), !this.state.isEmbedded && url && (_jsx(ButtonLineComponent, { label: "Refresh", onClick: () => this.replaceTextureWithUrl(url + "?nocache=" + this._generateRandomForCache()) })), texture && _jsx(ButtonLineComponent, { label: "Remove", onClick: () => this.removeTexture() })] })), _jsx(GenericPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData })] }));
    }
}
//# sourceMappingURL=texturePropertyTabComponent.js.map