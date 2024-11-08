import { Observable } from "core/Misc/observable";
import { NodePort } from "./nodePort";
import { IsFramePortData } from "./tools";
import commonStyles from "./common.modules.scss";
export class FrameNodePort extends NodePort {
    get parentFrameId() {
        return this._parentFrameId;
    }
    get onFramePortPositionChangedObservable() {
        return this._onFramePortPositionChangedObservable;
    }
    get isInput() {
        return this._isInput;
    }
    get framePortId() {
        return this._framePortId;
    }
    get framePortPosition() {
        return this._framePortPosition;
    }
    set framePortPosition(position) {
        this._framePortPosition = position;
        this.onFramePortPositionChangedObservable.notifyObservers(this);
    }
    constructor(portContainer, portData, node, stateManager, isInput, framePortId, parentFrameId) {
        super(portContainer, portData, node, stateManager);
        this.portData = portData;
        this.node = node;
        this._onFramePortPositionChangedObservable = new Observable();
        this._parentFrameId = parentFrameId;
        this._isInput = isInput;
        this._framePortId = framePortId;
        this._onSelectionChangedObserver = stateManager.onSelectionChangedObservable.add((options) => {
            const { selection } = options || {};
            if (IsFramePortData(selection) && selection.port === this) {
                this._img.classList.add(commonStyles["selected"]);
            }
            else {
                this._img.classList.remove(commonStyles["selected"]);
            }
        });
        this.refresh();
    }
    static CreateFrameNodePortElement(portData, node, root, displayManager, stateManager, isInput, framePortId, parentFrameId) {
        const portContainer = root.ownerDocument.createElement("div");
        portContainer.classList.add(commonStyles["portLine"]);
        if (framePortId !== null) {
            portContainer.dataset.framePortId = `${framePortId}`;
        }
        root.appendChild(portContainer);
        if (!displayManager || displayManager.shouldDisplayPortLabels(portData)) {
            const portLabel = root.ownerDocument.createElement("div");
            portLabel.classList.add(commonStyles["port-label"]);
            portLabel.innerHTML = portData.name;
            portContainer.appendChild(portLabel);
        }
        return new FrameNodePort(portContainer, portData, node, stateManager, isInput, framePortId, parentFrameId);
    }
}
//# sourceMappingURL=frameNodePort.js.map