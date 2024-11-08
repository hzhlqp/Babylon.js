import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import { SpriteManager } from "core/Sprites/spriteManager";
interface ISpriteManagerPropertyGridComponentProps {
    globalState: GlobalState;
    spriteManager: SpriteManager;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class SpriteManagerPropertyGridComponent extends React.Component<ISpriteManagerPropertyGridComponentProps> {
    private _snippetUrl;
    constructor(props: ISpriteManagerPropertyGridComponentProps);
    addNewSprite(): void;
    disposeManager(): void;
    saveToFile(): void;
    loadFromFile(file: File): void;
    loadFromSnippet(): void;
    saveToSnippet(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
