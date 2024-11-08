import * as React from "react";
import type { GlobalState } from "../../globalState";
import type { GradientBlockColorStep } from "core/Materials/Node/Blocks/gradientBlock";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
interface IGradientStepComponentProps {
    globalState: GlobalState;
    step: GradientBlockColorStep;
    lineIndex: number;
    lockObject?: LockObject;
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
