import * as React from "react";
import type { GlobalState } from "../../../../globalState";
import type { IValueGradient } from "core/Misc/gradients";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { Nullable } from "core/types";
import type { IParticleSystem } from "core/Particles/IParticleSystem";
export declare enum GradientGridMode {
    Factor = 0,
    Color3 = 1,
    Color4 = 2
}
interface IValueGradientGridComponent {
    globalState: GlobalState;
    label: string;
    gradients: Nullable<Array<IValueGradient>>;
    lockObject: LockObject;
    docLink?: string;
    mode: GradientGridMode;
    host: IParticleSystem;
    codeRecorderPropertyName: string;
    onCreateRequired: () => void;
}
export declare class ValueGradientGridComponent extends React.Component<IValueGradientGridComponent> {
    constructor(props: IValueGradientGridComponent);
    deleteStep(step: IValueGradient): void;
    addNewStep(): void;
    checkForReOrder(): void;
    updateAndSync(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
