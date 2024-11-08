import { SerializationTools } from "../serializationTools";
export const RegisterExportData = (stateManager) => {
    stateManager.exportData = (data, frame) => {
        const nodeGeometry = data.nodeGeometry;
        return SerializationTools.Serialize(nodeGeometry, stateManager.data, frame);
    };
    stateManager.getEditorDataMap = () => {
        return stateManager.data.nodeGeometry.editorData.map;
    };
};
//# sourceMappingURL=registerExportData.js.map