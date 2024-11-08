import * as React from "react";
import { GradientBlockColorStep } from "core/Materials/Node/Blocks/gradientBlock";
import type { IPropertyComponentProps } from "shared-ui-components/nodeGraphSystem/interfaces/propertyComponentProps";
export declare class GradientPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    private _onValueChangedObserver;
    constructor(props: IPropertyComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    forceRebuild(): void;
    deleteStep(step: GradientBlockColorStep): void;
    copyStep(step: GradientBlockColorStep): void;
    addNewStep(): void;
    checkForReOrder(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
