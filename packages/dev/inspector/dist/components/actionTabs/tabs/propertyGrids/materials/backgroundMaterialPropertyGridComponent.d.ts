import * as React from "react";
import { Observable } from "core/Misc/observable";
import type { BackgroundMaterial } from "core/Materials/Background/backgroundMaterial";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface IBackgroundMaterialPropertyGridComponentProps {
    globalState: GlobalState;
    material: BackgroundMaterial;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class BackgroundMaterialPropertyGridComponent extends React.Component<IBackgroundMaterialPropertyGridComponentProps> {
    private _onDebugSelectionChangeObservable;
    constructor(props: IBackgroundMaterialPropertyGridComponentProps);
    renderTextures(): import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
