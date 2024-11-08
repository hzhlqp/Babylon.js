import { NodeMaterialSystemValues } from "core/Materials/Node/Enums/nodeMaterialSystemValues";
import { NodeMaterialBlockConnectionPointTypes } from "core/Materials/Node/Enums/nodeMaterialBlockConnectionPointTypes";
import { AnimatedInputBlockTypes } from "core/Materials/Node/Blocks/Input/animatedInputBlockTypes";
import { BlockTools } from "../../blockTools";
import styles from "./inputDisplayManager.modules.scss";
const inputNameToAttributeValue = {
    position2d: "position",
    particle_uv: "uv",
    particle_color: "color",
    particle_texturemask: "textureMask",
    particle_positionw: "positionW",
};
const inputNameToAttributeName = {
    position2d: "screen",
    particle_uv: "particle",
    particle_color: "particle",
    particle_texturemask: "particle",
    particle_positionw: "particle",
};
export class InputDisplayManager {
    getHeaderClass(nodeData) {
        const inputBlock = nodeData.data;
        if (inputBlock.isConstant) {
            return styles["constant"];
        }
        if (inputBlock.visibleInInspector) {
            return styles["inspector"];
        }
        return "";
    }
    shouldDisplayPortLabels() {
        return false;
    }
    getHeaderText(nodeData) {
        const inputBlock = nodeData.data;
        let name = `${inputBlock.name} (${InputDisplayManager.GetBaseType(inputBlock.output.type)})`;
        if (inputBlock.isAttribute) {
            name = InputDisplayManager.GetBaseType(inputBlock.output.type);
        }
        return name;
    }
    static GetBaseType(type) {
        return NodeMaterialBlockConnectionPointTypes[type];
    }
    getBackgroundColor(nodeData) {
        let color = "";
        const inputBlock = nodeData.data;
        switch (inputBlock.type) {
            case NodeMaterialBlockConnectionPointTypes.Color3:
            case NodeMaterialBlockConnectionPointTypes.Color4: {
                if (inputBlock.value) {
                    color = inputBlock.value.toHexString();
                    break;
                }
            }
            // eslint-disable-next-line no-fallthrough
            default:
                color = BlockTools.GetColorFromConnectionNodeType(inputBlock.type);
                break;
        }
        return color;
    }
    updatePreviewContent(nodeData, contentArea) {
        let value = "";
        const inputBlock = nodeData.data;
        if (inputBlock.isAttribute) {
            const attrVal = inputNameToAttributeValue[inputBlock.name] ?? inputBlock.name;
            const attrName = inputNameToAttributeName[inputBlock.name] ?? "mesh";
            value = attrName + "." + attrVal;
        }
        else if (inputBlock.isSystemValue) {
            switch (inputBlock.systemValue) {
                case NodeMaterialSystemValues.World:
                    value = "World";
                    break;
                case NodeMaterialSystemValues.WorldView:
                    value = "World x View";
                    break;
                case NodeMaterialSystemValues.WorldViewProjection:
                    value = "World x View x Projection";
                    break;
                case NodeMaterialSystemValues.View:
                    value = "View";
                    break;
                case NodeMaterialSystemValues.ViewProjection:
                    value = "View x Projection";
                    break;
                case NodeMaterialSystemValues.Projection:
                    value = "Projection";
                    break;
                case NodeMaterialSystemValues.CameraPosition:
                    value = "Camera position";
                    break;
                case NodeMaterialSystemValues.FogColor:
                    value = "Fog color";
                    break;
                case NodeMaterialSystemValues.DeltaTime:
                    value = "Delta time";
                    break;
                case NodeMaterialSystemValues.CameraParameters:
                    value = "Camera parameters";
                    break;
                case NodeMaterialSystemValues.MaterialAlpha:
                    value = "Material alpha";
                    break;
            }
        }
        else {
            switch (inputBlock.type) {
                case NodeMaterialBlockConnectionPointTypes.Float:
                    if (inputBlock.animationType !== AnimatedInputBlockTypes.None) {
                        value = AnimatedInputBlockTypes[inputBlock.animationType];
                    }
                    else {
                        value = inputBlock.value.toFixed(4);
                    }
                    break;
                case NodeMaterialBlockConnectionPointTypes.Vector2: {
                    const vec2Value = inputBlock.value;
                    value = `(${vec2Value.x.toFixed(2)}, ${vec2Value.y.toFixed(2)})`;
                    break;
                }
                case NodeMaterialBlockConnectionPointTypes.Vector3: {
                    const vec3Value = inputBlock.value;
                    value = `(${vec3Value.x.toFixed(2)}, ${vec3Value.y.toFixed(2)}, ${vec3Value.z.toFixed(2)})`;
                    break;
                }
                case NodeMaterialBlockConnectionPointTypes.Vector4: {
                    if (inputBlock.animationType !== AnimatedInputBlockTypes.None) {
                        value = AnimatedInputBlockTypes[inputBlock.animationType];
                    }
                    else {
                        const vec4Value = inputBlock.value;
                        value = `(${vec4Value.x.toFixed(2)}, ${vec4Value.y.toFixed(2)}, ${vec4Value.z.toFixed(2)}, ${vec4Value.w.toFixed(2)})`;
                    }
                    break;
                }
            }
        }
        contentArea.innerHTML = value;
        contentArea.classList.add(styles["input-block"]);
    }
}
//# sourceMappingURL=inputDisplayManager.js.map