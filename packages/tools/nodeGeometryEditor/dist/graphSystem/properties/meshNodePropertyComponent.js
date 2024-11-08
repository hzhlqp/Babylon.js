import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";
import { FileButtonLine } from "shared-ui-components/lines/fileButtonLineComponent";
import { SceneLoader } from "core/Loading/sceneLoader";
import { EngineStore } from "core/Engines/engineStore";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { CheckBoxLineComponent } from "../../sharedComponents/checkBoxLineComponent";
export class MeshPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
    }
    async loadMesh(file) {
        this.setState({ isLoading: true });
        const scene = await SceneLoader.LoadAsync("file:", file, EngineStore.LastCreatedEngine);
        if (!scene) {
            return;
        }
        this.setState({ isLoading: false });
        const nodeData = this.props.nodeData;
        if (nodeData.__scene) {
            nodeData.__scene.dispose();
        }
        nodeData.__scene = scene;
        const meshes = scene.meshes.filter((m) => !!m.name && m.getTotalVertices() > 0);
        if (meshes.length) {
            const block = this.props.nodeData.data;
            block.mesh = meshes[0];
            this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
        }
        this.forceUpdate();
    }
    removeData() {
        const block = this.props.nodeData.data;
        block.cleanData();
        this.forceUpdate();
        this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
    }
    render() {
        const scene = this.props.nodeData.__scene;
        const meshOptions = [{ label: "None", value: -1 }];
        let meshes = [];
        if (scene) {
            meshes = scene.meshes.filter((m) => !!m.name && m.getTotalVertices() > 0);
            meshes.sort((a, b) => a.name.localeCompare(b.name));
            meshes.sort((a, b) => a.name.localeCompare(b.name));
            meshOptions.push(...meshes.map((v, i) => {
                return { label: v.name, value: i };
            }));
        }
        const block = this.props.nodeData.data;
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), _jsxs(LineContainerComponent, { title: "SOURCE", children: [this.state.isLoading && _jsx(TextLineComponent, { ignoreValue: true, label: "Loading..." }), !this.state.isLoading && _jsx(FileButtonLine, { label: "Load", onClick: (file) => this.loadMesh(file), accept: ".glb, .babylon" }), scene && (_jsx(OptionsLine, { label: "Mesh", options: meshOptions, target: block, propertyName: "mesh", noDirectUpdate: true, onSelect: (value) => {
                                switch (value) {
                                    case -1:
                                        block.mesh = null;
                                        break;
                                    default:
                                        block.mesh = meshes[value];
                                }
                                this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                                this.forceUpdate();
                            }, extractValue: () => {
                                if (!block.mesh) {
                                    return -1;
                                }
                                const meshIndex = meshes.indexOf(block.mesh);
                                if (meshIndex > -1) {
                                    return meshIndex;
                                }
                                return -1;
                            } })), !scene && !!block.mesh && _jsx(TextLineComponent, { ignoreValue: true, label: `Mesh ${block.mesh.name} defined by code` }), !scene && !!block.isUsingCachedData && _jsx(TextLineComponent, { ignoreValue: true, label: `Block is using cached data` }), !this.state.isLoading && (!!block.mesh || !!block.isUsingCachedData) && _jsx(ButtonLineComponent, { label: "Remove", onClick: () => this.removeData() })] }), _jsx(LineContainerComponent, { title: "ADVANCED", children: _jsx(CheckBoxLineComponent, { label: "Serialized cached data", target: block, propertyName: "serializedCachedData", onValueChanged: () => {
                            this.props.stateManager.onRebuildRequiredObservable.notifyObservers();
                        } }) })] }));
    }
}
//# sourceMappingURL=meshNodePropertyComponent.js.map