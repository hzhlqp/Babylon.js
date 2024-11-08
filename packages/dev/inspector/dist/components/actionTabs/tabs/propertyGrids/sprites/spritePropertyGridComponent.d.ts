import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import type { Sprite } from "core/Sprites/sprite";
interface ISpritePropertyGridComponentProps {
    globalState: GlobalState;
    sprite: Sprite;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onSelectionChangedObservable?: Observable<any>;
}
export declare class SpritePropertyGridComponent extends React.Component<ISpritePropertyGridComponentProps> {
    private _canvasRef;
    private _imageData;
    private _cachedCellIndex;
    constructor(props: ISpritePropertyGridComponentProps);
    onManagerLink(): void;
    switchPlayStopState(): void;
    disposeSprite(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    shouldComponentUpdate(nextProps: ISpritePropertyGridComponentProps): boolean;
    updatePreview(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
