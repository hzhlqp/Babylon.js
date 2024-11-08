import * as React from "react";
import { GradientBlockColorStep } from "core/Materials/Node/Blocks/gradientBlock";
import type { IPropertyComponentProps } from "./propertyComponentProps";
export declare class GradientPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    private _gradientBlock;
    constructor(props: IPropertyComponentProps);
    forceRebuild(): void;
    deleteStep(step: GradientBlockColorStep): void;
    copyStep(step: GradientBlockColorStep): void;
    addNewStep(): void;
    checkForReOrder(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
