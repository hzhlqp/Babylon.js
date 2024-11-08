import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../propertyChangedEvent";
import type { IInspectableOptions } from "core/Misc/iInspectable";
export declare const Null_Value: number;
export interface IOptionsLineProps {
    label: string;
    target: any;
    propertyName: string;
    options: IInspectableOptions[];
    noDirectUpdate?: boolean;
    onSelect?: (value: number | string) => void;
    extractValue?: (target: any) => number | string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    allowNullValue?: boolean;
    icon?: string;
    iconLabel?: string;
    className?: string;
    valuesAreStrings?: boolean;
    defaultIfNull?: number;
}
export declare class OptionsLine extends React.Component<IOptionsLineProps, {
    value: number | string;
}> {
    private _localChange;
    private _remapValueIn;
    private _remapValueOut;
    private _getValue;
    constructor(props: IOptionsLineProps);
    shouldComponentUpdate(nextProps: IOptionsLineProps, nextState: {
        value: number;
    }): boolean;
    raiseOnPropertyChanged(newValue: number, previousValue: number): void;
    setValue(value: string | number): void;
    updateValue(valueString: string): void;
    onCopyClick(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
