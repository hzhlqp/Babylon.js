import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import * as React from "react";
import type { IParticleSystem } from "core/Particles/IParticleSystem";
interface IParticleSystemTreeItemComponentProps {
    system: IParticleSystem;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class ParticleSystemTreeItemComponent extends React.Component<IParticleSystemTreeItemComponentProps> {
    constructor(props: IParticleSystemTreeItemComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
