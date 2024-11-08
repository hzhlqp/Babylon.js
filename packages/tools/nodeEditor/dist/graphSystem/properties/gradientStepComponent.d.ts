import * as React from "react";
import type { GradientBlockColorStep } from "core/Materials/Node/Blocks/gradientBlock";
import type { StateManager } from "shared-ui-components/nodeGraphSystem/stateManager";
interface IGradientStepComponentProps {
    stateManager: StateManager;
    step: GradientBlockColorStep;
    lineIndex: number;
    onDelete: () => void;
    onUpdateStep: () => void;
    onCheckForReOrder: () => void;
    onCopy?: () => void;
}
export declare class GradientStepComponent extends React.Component<IGradientStepComponentProps, {
    gradient: number;
}> {
    constructor(props: IGradientStepComponentProps);
    updateColor(color: string): void;
    updateStep(gradient: number): void;
    onPointerUp(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
