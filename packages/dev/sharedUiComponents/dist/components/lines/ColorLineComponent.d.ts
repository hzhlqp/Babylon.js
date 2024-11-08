import * as React from "react";
import type { Observable } from "core/Misc/observable";
import { Color4 } from "core/Maths/math.color";
import type { PropertyChangedEvent } from "../../propertyChangedEvent";
import type { LockObject } from "../../tabs/propertyGrids/lockObject";
export interface IColorLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    onPropertyChangedObservable: Observable<PropertyChangedEvent>;
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
export declare class ColorLineComponent extends React.Component<IColorLineComponentProps, IColorLineComponentState> {
    constructor(props: IColorLineComponentProps);
    shouldComponentUpdate(nextProps: IColorLineComponentProps, nextState: IColorLineComponentState): boolean;
    getValue(props?: Readonly<IColorLineComponentProps> & Readonly<{
        children?: React.ReactNode;
    }>): Color4;
    setColorFromString(colorString: string): void;
    setColor(newColor: Color4): void;
    switchExpandState(): void;
    updateStateR(value: number): void;
    updateStateG(value: number): void;
    updateStateB(value: number): void;
    updateStateA(value: number): void;
    copyToClipboard(): void;
    private _convertToColor;
    private _toColor3;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
