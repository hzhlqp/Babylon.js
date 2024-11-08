import { NodeMaterialBlockConnectionPointTypes } from "core/Materials/Node/Enums/nodeMaterialBlockConnectionPointTypes";
export const RegisterElbowSupport = (stateManager) => {
    stateManager.isElbowConnectionAllowed = (a, b) => {
        const pointA = a.portData.data;
        const pointB = b.portData.data;
        if (pointA.type === NodeMaterialBlockConnectionPointTypes.Object || pointB.type === NodeMaterialBlockConnectionPointTypes.Object) {
            return false; // We do not support Elbow on complex types
        }
        return true;
    };
};
//# sourceMappingURL=registerElbowSupport.js.map