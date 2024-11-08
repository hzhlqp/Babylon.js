/**
 *
 */
export class MeshAttributeExistsDisplayManager {
    getHeaderClass(nodeData) {
        return "";
    }
    shouldDisplayPortLabels() {
        return true;
    }
    getHeaderText(nodeData) {
        const block = nodeData.data;
        let name = block.name;
        let attributeName;
        switch (block.attributeType) {
            case 3 /* MeshAttributeExistsBlockTypes.VertexColor */:
                attributeName = "Color";
                break;
            case 1 /* MeshAttributeExistsBlockTypes.Normal */:
                attributeName = "Normal";
                break;
            case 2 /* MeshAttributeExistsBlockTypes.Tangent */:
                attributeName = "Tangent";
                break;
            case 4 /* MeshAttributeExistsBlockTypes.UV1 */:
                attributeName = "UV";
                break;
            case 5 /* MeshAttributeExistsBlockTypes.UV2 */:
                attributeName = "UV2";
                break;
            case 6 /* MeshAttributeExistsBlockTypes.UV3 */:
                attributeName = "UV3";
                break;
            case 7 /* MeshAttributeExistsBlockTypes.UV4 */:
                attributeName = "UV4";
                break;
            case 8 /* MeshAttributeExistsBlockTypes.UV5 */:
                attributeName = "UV5";
                break;
            case 9 /* MeshAttributeExistsBlockTypes.UV6 */:
                attributeName = "UV6";
                break;
        }
        if (attributeName) {
            name += ` (${attributeName})`;
        }
        return name;
    }
    getBackgroundColor(nodeData) {
        return "";
    }
    updatePreviewContent() { }
}
//# sourceMappingURL=meshAttributeExistsDisplayManager.js.map