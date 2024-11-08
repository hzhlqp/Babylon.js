import { Observable } from "core/Misc/observable";
export class KeyboardManager {
    constructor(hostElement) {
        this._kdListener = (evt) => this._keyEvent(evt, true);
        this._kuListener = (evt) => this._keyEvent(evt, false);
        this._moveListener = (evt) => this._updateModifierKeys(evt);
        this._focusOutListener = () => this._clearKeys();
        this._keys = new Set();
        this._hostElement = hostElement;
        hostElement.addEventListener("keydown", this._kdListener);
        hostElement.addEventListener("keypress", this._kdListener);
        hostElement.addEventListener("keyup", this._kuListener);
        hostElement.addEventListener("mousemove", this._moveListener);
        hostElement.addEventListener("focusout", this._focusOutListener);
        this.onKeyPressedObservable = new Observable();
    }
    _keyEvent(event, isDown) {
        this._updateModifierKeys(event);
        switch (event.key) {
            case " ":
                this._setKeyDown("space", isDown);
                break;
        }
    }
    _updateModifierKeys(event) {
        this._setKeyDown("control", event.ctrlKey);
        this._setKeyDown("alt", event.altKey);
        this._setKeyDown("shift", event.shiftKey);
        this._setKeyDown("meta", event.metaKey);
    }
    _setKeyDown(key, down) {
        const isDown = this._keys.has(key);
        if (isDown !== down) {
            if (!down) {
                this._keys.delete(key);
            }
            else {
                this._keys.add(key);
            }
            this.onKeyPressedObservable.notifyObservers(key);
        }
    }
    _clearKeys() {
        for (const key of this._keys) {
            this._keys.delete(key);
            this.onKeyPressedObservable.notifyObservers(key);
        }
    }
    isKeyDown(key) {
        return this._keys.has(key);
    }
    dispose() {
        this._hostElement.removeEventListener("keydown", this._kdListener);
        this._hostElement.removeEventListener("keypress", this._kdListener);
        this._hostElement.removeEventListener("keyup", this._kuListener);
        this._hostElement.removeEventListener("mousemove", this._moveListener);
        this._hostElement.removeEventListener("focusout", this._focusOutListener);
    }
}
//# sourceMappingURL=keyboardManager.js.map