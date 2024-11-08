import { PortDataDirection } from "shared-ui-components/nodeGraphSystem/interfaces/portData";
import { TypeLedger } from "shared-ui-components/nodeGraphSystem/typeLedger";
export class ConnectionPointPortData {
    get name() {
        const block = this.data.ownerBlock;
        let portName = this.data.displayName || this.data.name;
        if (this.data.ownerBlock.isInput) {
            portName = block.name;
        }
        return portName;
    }
    get internalName() {
        return this.data.name;
    }
    get isExposedOnFrame() {
        return this.data.isExposedOnFrame;
    }
    set isExposedOnFrame(value) {
        this.data.isExposedOnFrame = value;
    }
    get exposedPortPosition() {
        return this.data.exposedPortPosition;
    }
    set exposedPortPosition(value) {
        this.data.exposedPortPosition = value;
    }
    get isConnected() {
        return this.data.isConnected;
    }
    get connectedPort() {
        if (!this.isConnected) {
            return null;
        }
        if (!this._connectedPort && this.data.connectedPoint) {
            const otherBlock = this.data.connectedPoint.ownerBlock;
            let otherNode = this._nodeContainer.nodes.find((n) => n.content.data === otherBlock);
            if (!otherNode) {
                otherNode = this._nodeContainer.appendNode(TypeLedger.NodeDataBuilder(otherBlock, this._nodeContainer));
                const globalState = this._nodeContainer.stateManager.data;
                if (globalState.nodeRenderGraph.attachedBlocks.indexOf(otherBlock) === -1) {
                    globalState.nodeRenderGraph.attachedBlocks.push(otherBlock);
                }
            }
            this._connectedPort = otherNode.getPortDataForPortDataContent(this.data.connectedPoint);
        }
        return this._connectedPort;
    }
    set connectedPort(value) {
        this._connectedPort = value;
    }
    get direction() {
        switch (this.data.direction) {
            case 0 /* NodeRenderGraphConnectionPointDirection.Input */:
                return PortDataDirection.Input;
            default:
                return PortDataDirection.Output;
        }
    }
    get ownerData() {
        return this.data.ownerBlock;
    }
    get needDualDirectionValidation() {
        return false;
    }
    get hasEndpoints() {
        return this.data.hasEndpoints;
    }
    get endpoints() {
        const endpoints = [];
        this.data.endpoints.forEach((endpoint) => {
            const endpointOwnerBlock = endpoint.ownerBlock;
            const endpointNode = this._nodeContainer.nodes.find((n) => n.content.data === endpointOwnerBlock);
            endpoints.push(endpointNode.getPortDataForPortDataContent(endpoint));
        });
        return endpoints;
    }
    constructor(connectionPoint, nodeContainer) {
        this._connectedPort = null;
        this.data = connectionPoint;
        this._nodeContainer = nodeContainer;
    }
    updateDisplayName(newName) {
        this.data.displayName = newName;
    }
    connectTo(port) {
        this.data.connectTo(port.data);
        this._connectedPort = port;
    }
    canConnectTo(port) {
        return this.data.canConnectTo(port.data);
    }
    disconnectFrom(port) {
        this.data.disconnectFrom(port.data);
        port.connectedPort = null;
    }
    checkCompatibilityState(port) {
        const state = this.data.checkCompatibilityState(port.data);
        switch (state) {
            case 0 /* NodeRenderGraphConnectionPointCompatibilityStates.Compatible */:
                return 0;
            default:
                return state;
        }
    }
    getCompatibilityIssueMessage(issue, targetNode, targetPort) {
        switch (issue) {
            case 1 /* NodeRenderGraphConnectionPointCompatibilityStates.TypeIncompatible */:
                return "Cannot connect two different connection types";
            case 2 /* NodeRenderGraphConnectionPointCompatibilityStates.HierarchyIssue */:
                return "Source block cannot be connected with one of its ancestors";
        }
        return "";
    }
}
//# sourceMappingURL=connectionPointPortData.js.map