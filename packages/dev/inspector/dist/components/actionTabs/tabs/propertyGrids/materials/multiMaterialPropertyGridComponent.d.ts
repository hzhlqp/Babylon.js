import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import type { Material } from "core/Materials/material";
import type { MultiMaterial } from "core/Materials/multiMaterial";
interface IMultiMaterialPropertyGridComponentProps {
    globalState: GlobalState;
    material: MultiMaterial;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class MultiMaterialPropertyGridComponent extends React.Component<IMultiMaterialPropertyGridComponentProps> {
    constructor(props: IMultiMaterialPropertyGridComponentProps);
    onMaterialLink(mat: Material): void;
    renderChildMaterial(): import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
