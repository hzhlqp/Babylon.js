import * as React from "react";
import type { Observable } from "core/Misc/observable";
import { Color4 } from "core/Maths/math.color";
import type { PropertyChangedEvent } from "../propertyChangedEvent";
import type { LockObject } from "../tabs/propertyGrids/lockObject";
export interface IColorLineProps {
    label: string;
    target?: any;
    propertyName: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onChange?: () => void;
    isLinear?: boolean;
    icon?: string;
    iconLabel?: string;
    disableAlpha?: boolean;
    lockObject: LockObject;
}
interface IColorLineComponentState {
    isExpanded: boolean;
    color: Color4;
}
export declare class ColorLine extends React.Component<IColorLineProps, IColorLineComponentState> {
    constructor(props: IColorLineProps);
    shouldComponentUpdate(nextProps: IColorLineProps, nextState: IColorLineComponentState): boolean;
    getValue(props?: Readonly<IColorLineProps> & Readonly<{
        children?: React.ReactNode;
    }>): Color4;
    setColorFromString(colorString: string): void;
    setColor(newColor: Color4): void;
    switchExpandState(): void;
    updateStateR(value: number): void;
    updateStateG(value: number): void;
    updateStateB(value: number): void;
    updateStateA(value: number): void;
    private _convertToColor;
    private _toColor3;
    onCopyClick(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
