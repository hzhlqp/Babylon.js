import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import * as React from "react";
import type { EffectLayer } from "core/Layers/effectLayer";
interface IEffectLayerItemComponenttProps {
    layer: EffectLayer;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
}
export declare class EffectLayerItemComponent extends React.Component<IEffectLayerItemComponenttProps> {
    constructor(props: IEffectLayerItemComponenttProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
