import * as React from "react";
import { Observable } from "core/Misc/observable";
import type { StandardMaterial } from "core/Materials/standardMaterial";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import "core/Materials/material.decalMap";
interface IStandardMaterialPropertyGridComponentProps {
    globalState: GlobalState;
    material: StandardMaterial;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class StandardMaterialPropertyGridComponent extends React.Component<IStandardMaterialPropertyGridComponentProps> {
    private _onDebugSelectionChangeObservable;
    constructor(props: IStandardMaterialPropertyGridComponentProps);
    renderTextures(): import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
