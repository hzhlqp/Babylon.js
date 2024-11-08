import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
export class OutputPropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this._onUpdateRequiredObserver = this.props.stateManager.onUpdateRequiredObservable.add(() => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        this.props.stateManager.onUpdateRequiredObservable.remove(this._onUpdateRequiredObserver);
    }
    render() {
        const outputBlock = this.props.nodeData.data;
        const vertexData = outputBlock.currentVertexData;
        return (_jsxs("div", { children: [_jsx(GeneralPropertyTabComponent, { stateManager: this.props.stateManager, nodeData: this.props.nodeData }), vertexData && (_jsxs(LineContainerComponent, { title: "INFO", children: [vertexData.positions && _jsx(TextLineComponent, { label: "Vertices", value: (vertexData.positions?.length / 3).toString() }), vertexData.indices && _jsx(TextLineComponent, { label: "Faces", value: (vertexData.indices.length / 3).toString() }), vertexData.positions && (_jsx(TextLineComponent, { label: "Build time", value: this.props.stateManager.data.nodeGeometry.buildExecutionTime.toFixed(2) + " ms" })), _jsx(TextLineComponent, { label: "Sub-meshes", value: vertexData.materialInfos?.length.toString() }), _jsx(TextLineComponent, { label: "Has normals", value: vertexData.normals ? "Yes" : "No" }), _jsx(TextLineComponent, { label: "Has colors", value: vertexData.colors ? "Yes" : "No" }), _jsx(TextLineComponent, { label: "Has UV set 0", value: vertexData.uvs ? "Yes" : "No" }), _jsx(TextLineComponent, { label: "Has UV set 1", value: vertexData.uvs2 ? "Yes" : "No" }), _jsx(TextLineComponent, { label: "Has UV set 2", value: vertexData.uvs3 ? "Yes" : "No" }), _jsx(TextLineComponent, { label: "Has UV set 3", value: vertexData.uvs4 ? "Yes" : "No" }), _jsx(TextLineComponent, { label: "Has UV set 4", value: vertexData.uvs5 ? "Yes" : "No" }), _jsx(TextLineComponent, { label: "Has UV set 5", value: vertexData.uvs6 ? "Yes" : "No" }), _jsx(TextLineComponent, { label: "Has tangents", value: vertexData.tangents ? "Yes" : "No" }), _jsx(TextLineComponent, { label: "Has matrix weights", value: vertexData.matricesWeights ? "Yes" : "No" }), _jsx(TextLineComponent, { label: "Has matrix indices", value: vertexData.matricesIndices ? "Yes" : "No" })] }))] }));
    }
}
//# sourceMappingURL=outputNodePropertyComponent.js.map