import { BlockTools } from "../../blockTools";
import styles from "./inputDisplayManager.modules.scss";
import { NodeGeometryBlockConnectionPointTypes } from "core/Meshes/Node/Enums/nodeGeometryConnectionPointTypes";
import { NodeGeometryContextualSources } from "core/Meshes/Node/Enums/nodeGeometryContextualSources";
const predicate = (b) => !!b.getExecutionIndex;
export class InputDisplayManager {
    constructor() {
        this._hasHighlights = false;
    }
    getHeaderClass(nodeData) {
        const inputBlock = nodeData.data;
        if (inputBlock.isContextual) {
            return styles["contextual"];
        }
        return "";
    }
    getHeaderText(nodeData) {
        return nodeData.data.name;
    }
    shouldDisplayPortLabels() {
        return false;
    }
    static GetBaseType(type) {
        return NodeGeometryBlockConnectionPointTypes[type];
    }
    getBackgroundColor(nodeData) {
        let color = "";
        const inputBlock = nodeData.data;
        switch (inputBlock.type) {
            default:
                color = BlockTools.GetColorFromConnectionNodeType(inputBlock.type);
                break;
        }
        return color;
    }
    updatePreviewContent(nodeData, contentArea) {
        let value = "";
        const inputBlock = nodeData.data;
        if (inputBlock.isContextual) {
            switch (inputBlock.contextualValue) {
                case NodeGeometryContextualSources.Positions:
                    value = "Positions";
                    break;
                case NodeGeometryContextualSources.Normals:
                    value = "Normals";
                    break;
                case NodeGeometryContextualSources.VertexID:
                    value = "VertexID";
                    break;
                case NodeGeometryContextualSources.GeometryID:
                    value = "GeometryID";
                    break;
                case NodeGeometryContextualSources.LoopID:
                    value = "LoopID";
                    break;
                case NodeGeometryContextualSources.InstanceID:
                    value = "InstanceID";
                    break;
                case NodeGeometryContextualSources.CollectionID:
                    value = "CollectionID";
                    break;
                case NodeGeometryContextualSources.FaceID:
                    value = "FaceID";
                    break;
                case NodeGeometryContextualSources.Tangents:
                    value = "Tangents";
                    break;
                case NodeGeometryContextualSources.UV:
                    value = "UV";
                    break;
                case NodeGeometryContextualSources.UV2:
                    value = "UV2";
                    break;
                case NodeGeometryContextualSources.UV3:
                    value = "UV3";
                    break;
                case NodeGeometryContextualSources.UV4:
                    value = "UV4";
                    break;
                case NodeGeometryContextualSources.UV5:
                    value = "UV5";
                    break;
                case NodeGeometryContextualSources.UV6:
                    value = "UV6";
                    break;
                case NodeGeometryContextualSources.Colors:
                    value = "Colors";
                    break;
                case NodeGeometryContextualSources.LatticeID:
                    value = "LatticeID";
                    break;
                case NodeGeometryContextualSources.LatticeControl:
                    value = "LatticeControl";
                    break;
            }
        }
        else {
            switch (inputBlock.type) {
                case NodeGeometryBlockConnectionPointTypes.Int:
                    value = inputBlock.value.toFixed(0);
                    break;
                case NodeGeometryBlockConnectionPointTypes.Float:
                    value = inputBlock.value.toFixed(4);
                    break;
                case NodeGeometryBlockConnectionPointTypes.Vector2: {
                    const vec2Value = inputBlock.value;
                    value = `(${vec2Value.x.toFixed(2)}, ${vec2Value.y.toFixed(2)})`;
                    break;
                }
                case NodeGeometryBlockConnectionPointTypes.Vector3: {
                    const vec3Value = inputBlock.value;
                    value = `(${vec3Value.x.toFixed(2)}, ${vec3Value.y.toFixed(2)}, ${vec3Value.z.toFixed(2)})`;
                    break;
                }
                case NodeGeometryBlockConnectionPointTypes.Vector4: {
                    const vec4Value = inputBlock.value;
                    value = `(${vec4Value.x.toFixed(2)}, ${vec4Value.y.toFixed(2)}, ${vec4Value.z.toFixed(2)}, ${vec4Value.w.toFixed(2)})`;
                    break;
                }
            }
        }
        contentArea.innerHTML = value;
        contentArea.classList.add(styles["input-block"]);
    }
    onSelectionChanged(nodeData, selectedData, manager) {
        const block = nodeData.data;
        if (!block.isContextual) {
            return;
        }
        const contextGenerationBlock = block.getDescendantOfPredicate(predicate);
        if (selectedData !== nodeData) {
            if (this._hasHighlights) {
                let removeHighlight;
                if (selectedData && selectedData.data.getClassName() === "GeometryInputBlock") {
                    const otherSelection = selectedData.data;
                    const otherContextGenerationBlock = otherSelection.getDescendantOfPredicate(predicate);
                    removeHighlight = contextGenerationBlock !== otherContextGenerationBlock;
                }
                else {
                    removeHighlight = true;
                }
                if (removeHighlight) {
                    manager.onHighlightNodeObservable.notifyObservers({ data: contextGenerationBlock, active: false });
                }
                this._hasHighlights = false;
            }
            return;
        }
        if (contextGenerationBlock) {
            manager.onHighlightNodeObservable.notifyObservers({ data: contextGenerationBlock, active: true });
            this._hasHighlights = true;
        }
    }
    onDispose(nodeData, manager) {
        const block = nodeData.data;
        if (!block.isContextual) {
            return;
        }
        const contextGenerationBlock = block.getDescendantOfPredicate(predicate);
        if (contextGenerationBlock) {
            manager.onHighlightNodeObservable.notifyObservers({ data: contextGenerationBlock, active: false });
        }
    }
}
//# sourceMappingURL=inputDisplayManager.js.map