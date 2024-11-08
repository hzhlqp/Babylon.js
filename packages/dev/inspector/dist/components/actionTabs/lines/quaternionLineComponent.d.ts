import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { Quaternion, Vector3 } from "core/Maths/math.vector";
import type { PropertyChangedEvent } from "../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
interface IQuaternionLineComponentProps {
    label: string;
    target: any;
    useEuler?: boolean;
    propertyName: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    lockObject: LockObject;
}
export declare class QuaternionLineComponent extends React.Component<IQuaternionLineComponentProps, {
    isExpanded: boolean;
    value: Quaternion;
    eulerValue: Vector3;
}> {
    private _localChange;
    constructor(props: IQuaternionLineComponentProps);
    _checkRoundCircle(a: number, b: number): boolean;
    shouldComponentUpdate(nextProps: IQuaternionLineComponentProps, nextState: {
        isExpanded: boolean;
        value: Quaternion;
        eulerValue: Vector3;
    }): boolean;
    switchExpandState(): void;
    raiseOnPropertyChanged(currentValue: Quaternion, previousValue: Quaternion): void;
    updateQuaternion(): void;
    updateStateX(value: number): void;
    updateStateY(value: number): void;
    updateStateZ(value: number): void;
    updateStateW(value: number): void;
    updateQuaternionFromEuler(): void;
    updateStateEulerX(value: number): void;
    updateStateEulerY(value: number): void;
    updateStateEulerZ(value: number): void;
    onCopyClick(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
