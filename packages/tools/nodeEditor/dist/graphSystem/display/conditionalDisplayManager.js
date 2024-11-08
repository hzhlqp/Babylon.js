import { ConditionalBlockConditions } from "core/Materials/Node/Blocks/conditionalBlock";
export class ConditionalDisplayManager {
    getHeaderClass() {
        return "";
    }
    shouldDisplayPortLabels() {
        return true;
    }
    getHeaderText(nodeData) {
        const conditionBlock = nodeData.data;
        let desc = "";
        switch (conditionBlock.condition) {
            case ConditionalBlockConditions.Equal:
                desc = "=";
                break;
            case ConditionalBlockConditions.NotEqual:
                desc = "!=";
                break;
            case ConditionalBlockConditions.LessThan:
                desc = "<";
                break;
            case ConditionalBlockConditions.LessOrEqual:
                desc = "<=";
                break;
            case ConditionalBlockConditions.GreaterThan:
                desc = ">";
                break;
            case ConditionalBlockConditions.GreaterOrEqual:
                desc = ">=";
                break;
            case ConditionalBlockConditions.Xor:
                desc = "xor";
                break;
            case ConditionalBlockConditions.Or:
                desc = "|";
                break;
            case ConditionalBlockConditions.And:
                desc = "&";
                break;
        }
        return conditionBlock.name + " (" + desc + ")";
    }
    getBackgroundColor() {
        return "#00A080";
    }
    updatePreviewContent() { }
}
//# sourceMappingURL=conditionalDisplayManager.js.map