import { NodeGeometryBlockConnectionPointTypes } from "core/Meshes/Node/Enums/nodeGeometryConnectionPointTypes";
export const RegisterDebugSupport = (stateManager) => {
    stateManager.isDebugConnectionAllowed = (a, b) => {
        const pointA = a.portData.data;
        const pointB = b.portData.data;
        if (pointA.type === NodeGeometryBlockConnectionPointTypes.Geometry || pointB.type === NodeGeometryBlockConnectionPointTypes.Geometry) {
            return false; // We do not support debug on geometries
        }
        if (pointA.type === NodeGeometryBlockConnectionPointTypes.Texture || pointB.type === NodeGeometryBlockConnectionPointTypes.Texture) {
            return false; // We do not support debug on texture data
        }
        return true;
    };
};
//# sourceMappingURL=registerDebugSupport.js.map