/**
 * Class handling undo / redo operations
 */
export class HistoryStack {
    /**
     * Constructor
     * @param dataProvider defines the data provider function
     * @param applyUpdate defines the code to execute when undo/redo operation is required
     */
    constructor(dataProvider, applyUpdate) {
        this._historyStack = [];
        this._redoStack = [];
        this._maxHistoryLength = 256;
        this._locked = false;
        /**
         * Gets or sets a boolean indicating if the stack is enabled
         */
        this.isEnabled = true;
        this._dataProvider = dataProvider;
        this._applyUpdate = applyUpdate;
    }
    /**
     * Process key event to handle undo / redo
     * @param evt defines the keyboard event to process
     * @returns true if the event was processed
     */
    processKeyEvent(evt) {
        if (!this.isEnabled) {
            return false;
        }
        if (evt.ctrlKey || evt.metaKey) {
            if (evt.key === "z" || evt.key === "Z") {
                if (evt.shiftKey) {
                    this.redo();
                    return true;
                }
                this.undo();
                return true;
            }
            if (evt.key === "y" || evt.key === "Y") {
                this.redo();
                return true;
            }
        }
        return false;
    }
    /**
     * Resets the stack
     */
    reset() {
        this._historyStack = [];
        this._redoStack = [];
        this._activeData = null;
        this.store();
    }
    /**
     * Remove the n-1 element of the stack
     */
    collapseLastTwo() {
        if (this._historyStack.length < 2) {
            return;
        }
        this._locked = true;
        const diff = this._historyStack.pop();
        const diff2 = this._historyStack.pop();
        let newState = this._applyJSONDiff(this._activeData, JSON.parse(diff));
        newState = this._applyJSONDiff(newState, JSON.parse(diff2));
        this._historyStack.push(JSON.stringify(this._generateJSONDiff(this._activeData, newState)));
        this._locked = false;
    }
    _generateJSONDiff(obj1, obj2) {
        if (obj1 === obj2)
            return undefined;
        if (obj1 === null || obj2 === null || typeof obj1 !== "object" || typeof obj2 !== "object") {
            if (obj1 !== obj2 && obj2 === undefined) {
                return "@d@";
            }
            return obj2;
        }
        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            const diff = [];
            const maxLength = Math.max(obj1.length, obj2.length);
            let hasChanges = false;
            for (let i = 0; i < maxLength; i++) {
                const localDiff = this._generateJSONDiff(obj1[i], obj2[i]);
                if (localDiff !== undefined) {
                    diff[i] = localDiff;
                    hasChanges = true;
                }
            }
            return hasChanges ? diff : undefined;
        }
        const diff = {};
        const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
        let hasChanges = false;
        for (const key of keys) {
            if (!(key in obj1)) {
                diff[key] = obj2[key];
                hasChanges = true;
            }
            else if (!(key in obj2)) {
                diff[key] = "@d@"; // Mark for deletion
                hasChanges = true;
            }
            else {
                const nestedDiff = this._generateJSONDiff(obj1[key], obj2[key]);
                if (nestedDiff !== undefined) {
                    diff[key] = nestedDiff;
                    hasChanges = true;
                }
            }
        }
        return hasChanges ? diff : undefined;
    }
    _applyJSONDiff(obj1, diff) {
        if (diff === undefined) {
            return obj1;
        }
        if (typeof diff !== "object" || diff === null || obj1 == null) {
            return diff;
        }
        const result = Array.isArray(obj1) ? [] : {};
        if (Array.isArray(diff)) {
            for (let i = 0; i < Math.max(obj1.length, diff.length); i++) {
                if (diff[i] === null && i < obj1.length) {
                    result[i] = obj1[i];
                }
                else if (diff[i] !== "@d@") {
                    result[i] = this._applyJSONDiff(obj1[i], diff[i]);
                }
            }
        }
        else {
            for (const key in obj1) {
                if (!(key in diff)) {
                    result[key] = obj1[key];
                }
            }
            for (const key in diff) {
                if (diff[key] === "@d@") {
                    // Skip this key (it's been deleted)
                }
                else if (typeof diff[key] === "object" && diff[key] !== null) {
                    result[key] = this._applyJSONDiff(obj1[key], diff[key]);
                }
                else {
                    result[key] = diff[key];
                }
            }
        }
        return result;
    }
    _copy(source) {
        return JSON.parse(JSON.stringify(source));
    }
    /**
     * Stores the current state
     */
    store() {
        if (this._locked || !this.isEnabled) {
            return;
        }
        const data = this._copy(this._dataProvider());
        if (this._activeData) {
            const diff = this._generateJSONDiff(data, this._activeData);
            if (!diff) {
                return;
            }
            this._historyStack.push(JSON.stringify(diff));
        }
        this._activeData = data;
        if (this._historyStack.length > this._maxHistoryLength) {
            this._historyStack.shift();
        }
        this._redoStack.length = 0;
    }
    /**
     * Undo the latest operation
     */
    undo() {
        if (!this._historyStack.length) {
            return;
        }
        this._locked = true;
        const diff = this._historyStack.pop();
        const newState = this._applyJSONDiff(this._activeData, JSON.parse(diff));
        this._redoStack.push(JSON.stringify(this._generateJSONDiff(newState, this._activeData)));
        this._applyUpdate(this._copy(newState));
        this._activeData = newState;
        this._locked = false;
    }
    /**
     * Redo the latest undo operation
     */
    redo() {
        if (!this._redoStack.length) {
            return;
        }
        this._locked = true;
        const diff = this._redoStack.pop();
        const newState = this._applyJSONDiff(this._activeData, JSON.parse(diff));
        this._historyStack.push(JSON.stringify(this._generateJSONDiff(newState, this._activeData)));
        this._applyUpdate(this._copy(newState));
        this._activeData = newState;
        this._locked = false;
    }
    /**
     * Disposes the stack
     */
    dispose() {
        this._historyStack = [];
        this._redoStack = [];
    }
}
//# sourceMappingURL=historyStack.js.map