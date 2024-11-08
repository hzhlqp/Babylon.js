import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { Material } from "core/Materials/material";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface IMaterialPropertyGridComponentProps {
    globalState: GlobalState;
    material: Material;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class MaterialPropertyGridComponent extends React.Component<IMaterialPropertyGridComponentProps> {
    constructor(props: IMaterialPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
