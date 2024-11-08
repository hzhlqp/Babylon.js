import { Observable } from "core/Misc/observable";
type Key = "control" | "shift" | "alt" | "space" | "meta";
export declare class KeyboardManager {
    private _hostElement;
    private _kdListener;
    private _kuListener;
    private _moveListener;
    private _focusOutListener;
    private _keys;
    onKeyPressedObservable: Observable<Key>;
    constructor(hostElement: HTMLElement | HTMLDocument);
    private _keyEvent;
    private _updateModifierKeys;
    private _setKeyDown;
    private _clearKeys;
    isKeyDown(key: Key): boolean;
    dispose(): void;
}
export {};
