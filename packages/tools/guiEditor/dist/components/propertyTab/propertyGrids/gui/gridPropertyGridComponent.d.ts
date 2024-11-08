import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "shared-ui-components/propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { Grid } from "gui/2D/controls/grid";
import type { GlobalState } from "../../../../globalState";
interface IGridPropertyGridComponentProps {
    grids: Grid[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
    onUpdateRequiredObservable?: Observable<void>;
}
interface IGridPropertyComponentState {
    removingColumn: boolean;
    removingRow: boolean;
}
export declare class GridPropertyGridComponent extends React.Component<IGridPropertyGridComponentProps, IGridPropertyComponentState> {
    constructor(props: IGridPropertyGridComponentProps);
    private _previousGrid;
    private _rowDefinitions;
    private _rowEditFlags;
    private _columnEditFlags;
    private _columnDefinitions;
    private _editedRow;
    private _editedColumn;
    private _rowChild;
    private _columnChild;
    renderRows(): import("react/jsx-runtime").JSX.Element[];
    setRowValues(): void;
    setColumnValues(): void;
    renderColumns(): import("react/jsx-runtime").JSX.Element[];
    parsePercentage(value: string): number;
    isCloseTo(value: number, expected: number, epsilon?: number): boolean;
    adjustPercentages(definitions: string[], editFlags: boolean[]): string[];
    resizeRow(): void;
    resizeColumn(): void;
    checkValue(value: string, percent: boolean): string;
    checkPercentage(value: string): boolean;
    resetValues(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
