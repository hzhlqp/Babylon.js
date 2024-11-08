import { NodeMaterialBlockTargets } from "core/Materials/Node/Enums/nodeMaterialBlockTargets";
import { ConnectionPointPortData } from "./connectionPointPortData";
import triangle from "../imgs/triangle.svg";
import square from "../imgs/square.svg";
import styles from "./blockNodeData.modules.scss";
export class BlockNodeData {
    get uniqueId() {
        return this.data.uniqueId;
    }
    get name() {
        return this.data.name;
    }
    getClassName() {
        return this.data.getClassName();
    }
    get isInput() {
        return this.data.isInput;
    }
    get inputs() {
        return this._inputs;
    }
    get outputs() {
        return this._outputs;
    }
    get comments() {
        return this.data.comments;
    }
    set comments(value) {
        this.data.comments = value;
    }
    get executionTime() {
        return -1;
    }
    getPortByName(name) {
        for (const input of this.inputs) {
            if (input.internalName === name) {
                return input;
            }
        }
        for (const output of this.outputs) {
            if (output.internalName === name) {
                return output;
            }
        }
        return null;
    }
    dispose() {
        this.data.dispose();
    }
    prepareHeaderIcon(iconDiv, img) {
        if (this.data.getClassName() === "ElbowBlock") {
            iconDiv.classList.add(styles.hidden);
            return;
        }
        if (this.data.target === NodeMaterialBlockTargets.Fragment) {
            iconDiv.title = "In the fragment shader";
            img.src = square;
            return;
        }
        if (this.data.target === NodeMaterialBlockTargets.Vertex) {
            iconDiv.title = "In the vertex shader";
            img.src = triangle;
            return;
        }
        iconDiv.classList.add(styles.hidden);
    }
    get invisibleEndpoints() {
        if (this.data.isTeleportIn) {
            const teleportIn = this.data;
            return teleportIn.endpoints;
        }
        return null;
    }
    constructor(data, nodeContainer) {
        this.data = data;
        this._inputs = [];
        this._outputs = [];
        if (data.inputs) {
            this.data.inputs.forEach((input) => {
                this._inputs.push(new ConnectionPointPortData(input, nodeContainer));
            });
        }
        if (data.outputs && !this.data.isTeleportIn) {
            this.data.outputs.forEach((output) => {
                this._outputs.push(new ConnectionPointPortData(output, nodeContainer));
            });
        }
    }
}
//# sourceMappingURL=blockNodeData.js.map