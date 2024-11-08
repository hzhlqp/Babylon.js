import { ConnectionPointPortData } from "./connectionPointPortData";
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
    isConnectedToOutput() {
        const block = this.data;
        return block.isDebug || block.isAnAncestorOfType("NodeRenderGraphOutputBlock");
    }
    dispose() {
        this.data.dispose();
        this.data.onBuildObservable.remove(this._onBuildObserver);
    }
    prepareHeaderIcon(iconDiv, img) {
        if (this.data.getClassName() === "NodeRenderGraphElbowBlock") {
            iconDiv.classList.add(styles.hidden);
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
        this._onBuildObserver = null;
        if (data.inputs) {
            this.data.inputs.forEach((input) => {
                this._inputs.push(new ConnectionPointPortData(input, nodeContainer));
            });
        }
        if (data.outputs) {
            this.data.outputs.forEach((output) => {
                this._outputs.push(new ConnectionPointPortData(output, nodeContainer));
            });
        }
        this._onBuildObserver = data.onBuildObservable.add(() => {
            if (this.refreshCallback) {
                this.refreshCallback();
            }
        });
    }
}
//# sourceMappingURL=blockNodeData.js.map