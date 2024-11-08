import { Observable } from "core/Misc/observable";
import { DataStorage } from "core/Misc/dataStorage";
import { Color3 } from "core/Maths/math.color";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import { CoordinateHelper } from "./diagram/coordinateHelper";
import { Container } from "gui/2D/controls/container";
import { KeyboardManager } from "./keyboardManager";
export var DragOverLocation;
(function (DragOverLocation) {
    DragOverLocation[DragOverLocation["ABOVE"] = 0] = "ABOVE";
    DragOverLocation[DragOverLocation["BELOW"] = 1] = "BELOW";
    DragOverLocation[DragOverLocation["CENTER"] = 2] = "CENTER";
    DragOverLocation[DragOverLocation["NONE"] = 3] = "NONE";
})(DragOverLocation || (DragOverLocation = {}));
export var GUIEditorTool;
(function (GUIEditorTool) {
    GUIEditorTool[GUIEditorTool["SELECT"] = 0] = "SELECT";
    GUIEditorTool[GUIEditorTool["PAN"] = 1] = "PAN";
    GUIEditorTool[GUIEditorTool["ZOOM"] = 2] = "ZOOM";
})(GUIEditorTool || (GUIEditorTool = {}));
export class GlobalState {
    get tool() {
        if (this._tool === GUIEditorTool.ZOOM) {
            return GUIEditorTool.ZOOM;
        }
        else if (this._tool === GUIEditorTool.PAN) {
            return GUIEditorTool.PAN;
        }
        else {
            return GUIEditorTool.SELECT;
        }
    }
    set tool(newTool) {
        if (this._tool === newTool)
            return;
        this._prevTool = this._tool;
        this._tool = newTool;
        this.onToolChangeObservable.notifyObservers();
    }
    get usePrevSelected() {
        return this._usePrevSelected;
    }
    set usePrevSelected(val) {
        this._usePrevSelected = val;
    }
    restorePreviousTool() {
        if (this._tool !== this._prevTool) {
            this._tool = this._prevTool;
            this.onToolChangeObservable.notifyObservers();
        }
    }
    constructor() {
        this.selectedControls = [];
        this.onSelectionChangedObservable = new Observable();
        this.onResizeObservable = new Observable();
        this.onBuiltObservable = new Observable();
        this.onResetRequiredObservable = new Observable();
        this.onUpdateRequiredObservable = new Observable();
        this.onLogRequiredObservable = new Observable();
        this.onErrorMessageDialogRequiredObservable = new Observable();
        this.onIsLoadingChanged = new Observable();
        this.onSelectionBoxMoved = new Observable();
        this.onNewSceneObservable = new Observable();
        this.onGuiNodeRemovalObservable = new Observable();
        this.onPopupClosedObservable = new Observable();
        this._outlines = false;
        /** DO NOT USE: in the process of removing */
        this.blockKeyboardEvents = false;
        this.onOutlineChangedObservable = new Observable();
        this.onPropertyChangedObservable = new Observable();
        this._tool = GUIEditorTool.SELECT;
        this._prevTool = this._tool;
        this.onToolChangeObservable = new Observable();
        this.onFitControlsToWindowObservable = new Observable();
        this.onReframeWindowObservable = new Observable();
        this.onLoadObservable = new Observable();
        this.onSaveObservable = new Observable();
        this.onSaveSelectedControl = new Observable();
        this.onSnippetLoadObservable = new Observable();
        this.onSnippetSaveObservable = new Observable();
        this.onControlLoadObservable = new Observable();
        this.onResponsiveChangeObservable = new Observable();
        this.onParentingChangeObservable = new Observable();
        this.onDropObservable = new Observable();
        this.onPropertyGridUpdateRequiredObservable = new Observable();
        this.onDraggingEndObservable = new Observable();
        this.onDraggingStartObservable = new Observable();
        this.onWindowResizeObservable = new Observable();
        this.onGizmoUpdateRequireObservable = new Observable();
        this.onArtBoardUpdateRequiredObservable = new Observable();
        this.onBackgroundColorChangeObservable = new Observable();
        this.onFontsParsedObservable = new Observable();
        this.onPointerMoveObservable = new Observable();
        this.onPointerUpObservable = new Observable();
        this.draggedControl = null;
        this.onCopyObservable = new Observable();
        this.onCutObservable = new Observable();
        this.onPasteObservable = new Observable();
        this.isSaving = false;
        this.lockObject = new LockObject();
        this.shiftKeyPressed = false;
        this.controlCamera = DataStorage.ReadBoolean("ControlCamera", true);
        const defaultBrightness = 204 / 255.0;
        const r = DataStorage.ReadNumber("BackgroundColorR", defaultBrightness);
        const g = DataStorage.ReadNumber("BackgroundColorG", defaultBrightness);
        const b = DataStorage.ReadNumber("BackgroundColorB", defaultBrightness);
        this.backgroundColor = new Color3(r, g, b);
        this.onBackgroundColorChangeObservable.notifyObservers();
        CoordinateHelper.GlobalState = this;
    }
    /** adds copy, cut and paste listeners to the host window */
    registerEventListeners() {
        const isElementEditable = (element) => {
            return element.isContentEditable || element.tagName === "INPUT" || element.tagName === "TEXTAREA";
        };
        this.hostDocument.addEventListener("copy", (event) => {
            if (!isElementEditable(event.target)) {
                this.onCopyObservable.notifyObservers((content) => event.clipboardData?.setData("text/plain", content));
                event.preventDefault();
            }
        });
        this.hostDocument.addEventListener("cut", (event) => {
            if (!isElementEditable(event.target)) {
                this.onCutObservable.notifyObservers((content) => event.clipboardData?.setData("text/plain", content));
                event.preventDefault();
            }
        });
        this.hostDocument.addEventListener("paste", (event) => {
            if (!isElementEditable(event.target)) {
                this.onPasteObservable.notifyObservers(event.clipboardData?.getData("text") || "");
                event.preventDefault();
            }
        });
        this.keys = new KeyboardManager(this.hostDocument);
        this.keys.onKeyPressedObservable.add(() => {
            // trigger a tool update (in case space is now pressed)
            // we should really have a state management system to handle this for us
            this.onToolChangeObservable.notifyObservers();
        });
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    get fromPG() {
        return this._fromPG;
    }
    set fromPG(value) {
        this._fromPG = value;
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
        this.onBackgroundColorChangeObservable.notifyObservers();
        DataStorage.WriteNumber("BackgroundColorR", value.r);
        DataStorage.WriteNumber("BackgroundColorG", value.g);
        DataStorage.WriteNumber("BackgroundColorB", value.b);
    }
    get outlines() {
        return this._outlines;
    }
    set outlines(value) {
        this._outlines = value;
        this.onOutlineChangedObservable.notifyObservers();
    }
    select(control) {
        if (this.keys.isKeyDown("control") && this.isMultiSelectable(control)) {
            const index = this.selectedControls.indexOf(control);
            if (index === -1) {
                this.setSelection([...this.selectedControls, control]);
            }
            else {
                this.setSelection(this.selectedControls.filter((node) => node !== control));
            }
        }
        else {
            this.setSelection([control]);
        }
    }
    setSelection(controls) {
        this.selectedControls = [...controls];
        this.onSelectionChangedObservable.notifyObservers();
    }
    _findParentControlInTexture(texture, searchedControl) {
        const searchList = [texture.rootContainer];
        while (searchList.length > 0) {
            const current = searchList.splice(0, 1)[0];
            const children = current.children;
            if (children.indexOf(searchedControl) !== -1) {
                return current;
            }
            for (const child of children) {
                if (child instanceof Container) {
                    searchList.push(child);
                }
            }
        }
        return null;
    }
    deleteSelectedNodes() {
        for (const control of this.selectedControls) {
            const guiTextureParent = this._findParentControlInTexture(this.guiTexture, control);
            guiTextureParent?.removeControl(control);
            if (this.liveGuiTexture) {
                const allDescendants = control.getDescendants();
                for (const descendant of allDescendants) {
                    const liveGuiTextureDescendantParent = this._findParentControlInTexture(this.liveGuiTexture, descendant);
                    liveGuiTextureDescendantParent?.removeControl(descendant);
                    descendant.dispose();
                }
                const liveGuiTextureParent = this._findParentControlInTexture(this.liveGuiTexture, control);
                liveGuiTextureParent?.removeControl(control);
            }
            control.dispose();
        }
        this.setSelection([]);
    }
    isMultiSelectable(control) {
        if (this.selectedControls.length === 0)
            return true;
        if (this.selectedControls[0].parent === control.parent)
            return true;
        return false;
    }
    dispose() {
        this.keys.dispose();
    }
}
//# sourceMappingURL=globalState.js.map