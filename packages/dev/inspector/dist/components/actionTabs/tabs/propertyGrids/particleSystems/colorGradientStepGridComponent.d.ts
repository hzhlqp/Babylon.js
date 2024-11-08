import * as React from "react";
import type { GlobalState } from "../../../../globalState";
import { ColorGradient, Color3Gradient } from "core/Misc/gradients";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { IParticleSystem } from "core/Particles/IParticleSystem";
interface IColorGradientStepGridComponent {
    globalState: GlobalState;
    gradient: ColorGradient | Color3Gradient;
    lockObject: LockObject;
    lineIndex: number;
    isColor3: boolean;
    onDelete: () => void;
    onUpdateGradient: () => void;
    onCheckForReOrder: () => void;
    host: IParticleSystem;
    codeRecorderPropertyName: string;
}
export declare class ColorGradientStepGridComponent extends React.Component<IColorGradientStepGridComponent, {
    gradient: number;
}> {
    constructor(props: IColorGradientStepGridComponent);
    updateColor1(color: string): void;
    updateColor2(color: string): void;
    updateGradient(gradient: number): void;
    onPointerUp(): void;
    lock(): void;
    unlock(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
