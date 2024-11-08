import * as React from "react";
import type { GlobalState } from "../../../../globalState";
import type { FactorGradient } from "core/Misc/gradients";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { IParticleSystem } from "core/Particles/IParticleSystem";
interface IFactorGradientStepGridComponent {
    globalState: GlobalState;
    gradient: FactorGradient;
    lockObject: LockObject;
    lineIndex: number;
    onDelete: () => void;
    onUpdateGradient: () => void;
    onCheckForReOrder: () => void;
    host: IParticleSystem;
    codeRecorderPropertyName: string;
}
export declare class FactorGradientStepGridComponent extends React.Component<IFactorGradientStepGridComponent, {
    gradient: number;
    factor1: string;
    factor2?: string;
}> {
    constructor(props: IFactorGradientStepGridComponent);
    shouldComponentUpdate(nextProps: IFactorGradientStepGridComponent, nextState: {
        gradient: number;
        factor1: string;
        factor2?: string;
    }): boolean;
    updateFactor1(valueString: string): void;
    updateFactor2(valueString: string): void;
    updateGradient(gradient: number): void;
    onPointerUp(): void;
    lock(): void;
    unlock(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
