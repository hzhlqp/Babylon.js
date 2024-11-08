import { SerializationTools } from "../serializationTools";
export const RegisterExportData = (stateManager) => {
    stateManager.exportData = (data, frame) => {
        const nodeRenderGraph = data.nodeRenderGraph;
        return SerializationTools.Serialize(nodeRenderGraph, stateManager.data, frame);
    };
    stateManager.getEditorDataMap = () => {
        return stateManager.data.nodeRenderGraph.editorData.map;
    };
};
//# sourceMappingURL=registerExportData.js.map