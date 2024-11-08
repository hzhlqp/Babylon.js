import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { StandardMaterial } from "core/Materials/standardMaterial";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Texture } from "core/Materials/Textures/texture";
import { FileButtonLine } from "shared-ui-components/lines/fileButtonLineComponent";
import { Tools } from "core/Misc/tools";
import { CubeTexture } from "core/Materials/Textures/cubeTexture";
export class TextureLinkLineComponent extends React.Component {
    constructor(props) {
        super(props);
        const material = this.props.material;
        const texture = this.props.texture;
        this.state = { isDebugSelected: material && material.reservedDataStore && material.reservedDataStore.debugTexture === texture };
    }
    componentDidMount() {
        if (!this.props.onDebugSelectionChangeObservable) {
            return;
        }
        this._onDebugSelectionChangeObserver = this.props.onDebugSelectionChangeObservable.add((line) => {
            if (line !== this) {
                this.setState({ isDebugSelected: false });
            }
        });
    }
    componentWillUnmount() {
        if (this.props.onDebugSelectionChangeObservable && this._onDebugSelectionChangeObserver) {
            this.props.onDebugSelectionChangeObservable.remove(this._onDebugSelectionChangeObserver);
        }
    }
    debugTexture() {
        if (this.props.customDebugAction) {
            const newState = !this.state.isDebugSelected;
            this.props.customDebugAction(newState);
            this.setState({ isDebugSelected: newState });
            if (this.props.onDebugSelectionChangeObservable) {
                this.props.onDebugSelectionChangeObservable.notifyObservers(this);
            }
            return;
        }
        const texture = this.props.texture;
        const material = this.props.material;
        if (!material || !texture) {
            return;
        }
        const scene = material.getScene();
        if (material.reservedDataStore && material.reservedDataStore.debugTexture === texture) {
            const debugMaterial = material.reservedDataStore.debugMaterial;
            texture.level = material.reservedDataStore.level;
            for (const mesh of scene.meshes) {
                if (mesh.material === debugMaterial) {
                    mesh.material = material;
                }
            }
            debugMaterial.dispose();
            material.reservedDataStore.debugTexture = null;
            material.reservedDataStore.debugMaterial = null;
            this.setState({ isDebugSelected: false });
            return;
        }
        let checkMaterial = material;
        let needToDisposeCheckMaterial = false;
        if (material.reservedDataStore && material.reservedDataStore.debugTexture) {
            checkMaterial = material.reservedDataStore.debugMaterial;
            needToDisposeCheckMaterial = true;
        }
        const debugMaterial = new StandardMaterial("debugMaterial", scene);
        debugMaterial.disableLighting = true;
        debugMaterial.sideOrientation = material.sideOrientation;
        debugMaterial.emissiveTexture = texture;
        debugMaterial.forceDepthWrite = true;
        debugMaterial.reservedDataStore = { hidden: true };
        for (const mesh of scene.meshes) {
            if (mesh.material === checkMaterial) {
                mesh.material = debugMaterial;
            }
        }
        if (!material.reservedDataStore) {
            material.reservedDataStore = {};
        }
        material.reservedDataStore.debugTexture = texture;
        material.reservedDataStore.debugMaterial = debugMaterial;
        material.reservedDataStore.level = texture.level;
        texture.level = 1.0;
        if (this.props.onDebugSelectionChangeObservable) {
            this.props.onDebugSelectionChangeObservable.notifyObservers(this);
        }
        if (needToDisposeCheckMaterial) {
            checkMaterial.dispose();
        }
        this.setState({ isDebugSelected: true });
    }
    onLink() {
        if (!this.props.onSelectionChangedObservable) {
            return;
        }
        const texture = this.props.texture;
        this.props.onSelectionChangedObservable.notifyObservers(texture);
    }
    updateTexture(file) {
        const material = this.props.material ?? this.props.texturedObject;
        if (!material) {
            return;
        }
        Tools.ReadFile(file, (data) => {
            const blob = new Blob([data], { type: "octet/stream" });
            const url = URL.createObjectURL(blob);
            const extension = file.name.split(".").pop()?.toLowerCase();
            const texture = this.props.cubeOnly
                ? new CubeTexture(url, material.getScene(), [], false, undefined, undefined, undefined, undefined, false, extension ? "." + extension : undefined)
                : new Texture(url, material.getScene(), false, false);
            if (this.props.propertyName) {
                material[this.props.propertyName] = texture;
            }
            else if (this.props.onTextureCreated) {
                this.props.onTextureCreated(texture);
            }
            this.forceUpdate();
        }, undefined, true);
    }
    removeTexture() {
        const material = this.props.material ?? this.props.texturedObject;
        if (!material) {
            return;
        }
        if (this.props.propertyName) {
            material[this.props.propertyName] = null;
        }
        else if (this.props.onTextureRemoved) {
            this.props.onTextureRemoved();
        }
        this.forceUpdate();
    }
    render() {
        const texture = this.props.texture;
        if (!texture) {
            if (this.props.propertyName || this.props.onTextureCreated) {
                return (_jsx(FileButtonLine, { label: `Add ${this.props.label} texture`, onClick: (file) => this.updateTexture(file), accept: this.props.fileFormats ?? ".jpg, .png, .tga, .dds, .env, .exr" }));
            }
            return null;
        }
        return (_jsxs("div", { className: "textureLinkLine", children: [(!texture.isCube || this.props.cubeOnly) && (this.props.material || this.props.texturedObject) && (_jsx(_Fragment, { children: _jsxs("div", { className: this.state.isDebugSelected ? "debug selected" : "debug", children: [this.props.material && (_jsx("span", { className: "actionIcon", onClick: () => this.debugTexture(), title: "Render as main texture", children: _jsx(FontAwesomeIcon, { icon: faWrench }) })), _jsx("span", { className: "actionIcon", onClick: () => this.removeTexture(), title: "Remove texture", children: _jsx(FontAwesomeIcon, { icon: faTrash }) })] }) })), _jsx(TextLineComponent, { label: this.props.label, value: texture.name, onLink: () => this.onLink() })] }));
    }
}
//# sourceMappingURL=textureLinkLineComponent.js.map