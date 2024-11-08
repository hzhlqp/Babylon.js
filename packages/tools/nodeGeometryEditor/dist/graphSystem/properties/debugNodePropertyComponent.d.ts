import * as React from "react";
import type { IPropertyComponentProps } from "shared-ui-components/nodeGraphSystem/interfaces/propertyComponentProps";
export declare class DebugPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    private _onUpdateRequiredObserver;
    constructor(props: IPropertyComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
