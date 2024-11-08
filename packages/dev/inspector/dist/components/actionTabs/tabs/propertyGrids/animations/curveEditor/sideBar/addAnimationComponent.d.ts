import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface IAddAnimationComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface IAddAnimationComponentState {
    customPropertyMode: boolean;
}
export declare class AddAnimationComponent extends React.Component<IAddAnimationComponentProps, IAddAnimationComponentState> {
    private _root;
    private _displayName;
    private _property;
    private _typeElement;
    private _propertylement;
    private _loopModeElement;
    constructor(props: IAddAnimationComponentProps);
    createNew(): void;
    getInferredType(activeProperty?: string): any;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
