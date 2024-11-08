import * as React from "react";
import type { Control } from "gui/2D/controls/control";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { Observable } from "core/Misc/observable";
interface IParentingPropertyGridComponentProps {
    control: Control;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class ParentingPropertyGridComponent extends React.Component<IParentingPropertyGridComponentProps> {
    constructor(props: IParentingPropertyGridComponentProps);
    private _columnNumber;
    private _rowNumber;
    updateGridPosition(): void;
    getCellInfo(): void;
    private _changeCell;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
