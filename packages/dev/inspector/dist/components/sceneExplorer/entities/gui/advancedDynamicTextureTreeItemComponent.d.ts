import type { Observable } from "core/Misc/observable";
import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { AdvancedDynamicTexture } from "gui/2D/advancedDynamicTexture";
import * as React from "react";
interface IAdvancedDynamicTextureTreeItemComponentProps {
    texture: AdvancedDynamicTexture;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onSelectionChangedObservable?: Observable<any>;
    onClick: () => void;
}
export declare class AdvancedDynamicTextureTreeItemComponent extends React.Component<IAdvancedDynamicTextureTreeItemComponentProps, {
    isInPickingMode: boolean;
}> {
    private _onControlPickedObserver;
    constructor(props: IAdvancedDynamicTextureTreeItemComponentProps);
    componentWillUnmount(): void;
    onPickingMode(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
