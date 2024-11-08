import { SerializationTools } from "../serializationTools";
export const RegisterExportData = (stateManager) => {
    stateManager.exportData = (data, frame) => {
        const nodeMaterial = data.nodeMaterial;
        return SerializationTools.Serialize(nodeMaterial, stateManager.data, frame);
    };
    stateManager.getEditorDataMap = () => {
        return stateManager.data.nodeMaterial.editorData.map;
    };
};
//# sourceMappingURL=registerExportData.js.map