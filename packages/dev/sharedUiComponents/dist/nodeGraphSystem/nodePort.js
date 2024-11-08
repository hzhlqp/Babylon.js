import commonStyles from "./common.modules.scss";
import localStyles from "./nodePort.modules.scss";
export class NodePort {
    get element() {
        if (this.delegatedPort) {
            return this.delegatedPort.element;
        }
        return this._element;
    }
    get portName() {
        return this.portData.name;
    }
    set portName(newName) {
        if (this._portLabelElement) {
            this.portData.updateDisplayName(newName);
            this._portLabelElement.innerHTML = newName;
        }
    }
    get disabled() {
        if (!this.portData.isConnected) {
            return false;
        }
        else if (this._isConnectedToNodeOutsideOfFrame()) {
            //connected to outside node
            return true;
        }
        else {
            const link = this.node.getLinksForPortData(this.portData);
            if (link.length) {
                if (link[0].nodeB === this.node) {
                    // check if this node is the receiving
                    return true;
                }
            }
        }
        return false;
    }
    hasLabel() {
        return !!this._portLabelElement;
    }
    get exposedOnFrame() {
        if (!!this.portData.isExposedOnFrame || this._isConnectedToNodeOutsideOfFrame()) {
            return true;
        }
        return false;
    }
    set exposedOnFrame(value) {
        if (this.disabled) {
            return;
        }
        this.portData.isExposedOnFrame = value;
    }
    get exposedPortPosition() {
        return this.portData.exposedPortPosition;
    }
    set exposedPortPosition(value) {
        this.portData.exposedPortPosition = value;
    }
    _isConnectedToNodeOutsideOfFrame() {
        const link = this.node.getLinksForPortData(this.portData);
        if (link.length) {
            for (let i = 0; i < link.length; i++) {
                if (link[i].nodeA.enclosingFrameId !== link[i].nodeB.enclosingFrameId) {
                    return true;
                }
            }
        }
        return false;
    }
    refresh() {
        this._stateManager.applyNodePortDesign(this.portData, this._element, this._img, this._pip);
    }
    constructor(portContainer, portData, node, stateManager) {
        this.portData = portData;
        this.node = node;
        this.delegatedPort = null;
        this._element = portContainer.ownerDocument.createElement("div");
        this._element.classList.add(commonStyles.port);
        portContainer.appendChild(this._element);
        this._stateManager = stateManager;
        this._img = portContainer.ownerDocument.createElement("img");
        this._element.appendChild(this._img);
        this._pip = portContainer.ownerDocument.createElement("div");
        this._pip.classList.add(localStyles["pip"]);
        this._pip.style.display = "none";
        this._element.appendChild(this._pip);
        // determine if node name is editable
        if (portContainer.children[0].className === commonStyles["port-label"]) {
            this._portLabelElement = portContainer.children[0];
        }
        this._element.port = this;
        // Drag support
        this._element.ondragstart = () => false;
        this._onCandidateLinkMovedObserver = stateManager.onCandidateLinkMoved.add((coords) => {
            const rect = this._element.getBoundingClientRect();
            if (!coords || rect.left > coords.x || rect.right < coords.x || rect.top > coords.y || rect.bottom < coords.y) {
                this._element.classList.remove(localStyles["selected"]);
                return;
            }
            this._element.classList.add(localStyles["selected"]);
            this._stateManager.onCandidatePortSelectedObservable.notifyObservers(this);
        });
        this._onSelectionChangedObserver = this._stateManager.onSelectionChangedObservable.add((options) => {
            const { selection } = options || {};
            if (selection === this) {
                this._img.classList.add(localStyles["selected"]);
            }
            else {
                this._img.classList.remove(localStyles["selected"]);
            }
        });
        this.refresh();
    }
    dispose() {
        this._stateManager.onCandidateLinkMoved.remove(this._onCandidateLinkMovedObserver);
        if (this._onSelectionChangedObserver) {
            this._stateManager.onSelectionChangedObservable.remove(this._onSelectionChangedObserver);
        }
    }
    static CreatePortElement(portData, node, root, displayManager, stateManager) {
        const portContainer = root.ownerDocument.createElement("div");
        portContainer.classList.add(commonStyles.portLine);
        root.appendChild(portContainer);
        if (!displayManager || displayManager.shouldDisplayPortLabels(portData)) {
            const portLabel = root.ownerDocument.createElement("div");
            portLabel.classList.add(commonStyles["port-label"]);
            portLabel.innerHTML = portData.name;
            portContainer.appendChild(portLabel);
        }
        return new NodePort(portContainer, portData, node, stateManager);
    }
}
//# sourceMappingURL=nodePort.js.map