import { Observable } from "core/Misc/observable";
export class StateManager {
    constructor() {
        this.onSearchBoxRequiredObservable = new Observable();
        this.onSelectionChangedObservable = new Observable();
        this.onFrameCreatedObservable = new Observable();
        this.onUpdateRequiredObservable = new Observable();
        this.onGraphNodeRemovalObservable = new Observable();
        this.onSelectionBoxMoved = new Observable();
        this.onCandidateLinkMoved = new Observable();
        this.onCandidatePortSelectedObservable = new Observable();
        this.onNewNodeCreatedObservable = new Observable();
        this.onRebuildRequiredObservable = new Observable();
        this.onNodeMovedObservable = new Observable();
        this.onErrorMessageDialogRequiredObservable = new Observable();
        this.onExposePortOnFrameObservable = new Observable();
        this.onGridSizeChanged = new Observable();
        this.onNewBlockRequiredObservable = new Observable();
        this.onHighlightNodeObservable = new Observable();
        this.onPreviewCommandActivated = new Observable();
    }
}
//# sourceMappingURL=stateManager.js.map