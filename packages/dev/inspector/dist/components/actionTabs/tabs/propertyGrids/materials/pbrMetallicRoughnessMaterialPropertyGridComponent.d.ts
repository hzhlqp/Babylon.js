import * as React from "react";
import { Observable } from "core/Misc/observable";
import type { PBRMetallicRoughnessMaterial } from "core/Materials/PBR/pbrMetallicRoughnessMaterial";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface IPBRMetallicRoughnessMaterialPropertyGridComponentProps {
    globalState: GlobalState;
    material: PBRMetallicRoughnessMaterial;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class PBRMetallicRoughnessMaterialPropertyGridComponent extends React.Component<IPBRMetallicRoughnessMaterialPropertyGridComponentProps> {
    private _onDebugSelectionChangeObservable;
    constructor(props: IPBRMetallicRoughnessMaterialPropertyGridComponentProps);
    renderTextures(): import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
