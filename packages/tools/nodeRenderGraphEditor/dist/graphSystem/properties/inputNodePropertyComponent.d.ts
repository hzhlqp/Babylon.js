import * as React from "react";
import type { GlobalState } from "../../globalState";
import type { IPropertyComponentProps } from "shared-ui-components/nodeGraphSystem/interfaces/propertyComponentProps";
export declare class InputPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    private _onValueChangedObserver;
    constructor(props: IPropertyComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderValue(_globalState: GlobalState): import("react/jsx-runtime").JSX.Element | null;
    setDefaultValue(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
