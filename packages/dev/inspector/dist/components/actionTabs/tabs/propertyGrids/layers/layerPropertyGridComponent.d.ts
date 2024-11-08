import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { EffectLayer } from "core/Layers/effectLayer";
interface ILayerPropertyGridComponentProps {
    globalState: GlobalState;
    layer: EffectLayer;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class LayerPropertyGridComponent extends React.Component<ILayerPropertyGridComponentProps> {
    constructor(props: ILayerPropertyGridComponentProps);
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
