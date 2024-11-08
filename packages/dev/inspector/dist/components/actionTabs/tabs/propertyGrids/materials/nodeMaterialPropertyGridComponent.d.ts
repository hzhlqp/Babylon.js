import * as React from "react";
import { Observable } from "core/Misc/observable";
import type { NodeMaterial } from "core/Materials/Node/nodeMaterial";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import type { InputBlock } from "core/Materials/Node/Blocks/Input/inputBlock";
interface INodeMaterialPropertyGridComponentProps {
    globalState: GlobalState;
    material: NodeMaterial;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class NodeMaterialPropertyGridComponent extends React.Component<INodeMaterialPropertyGridComponentProps> {
    private _onDebugSelectionChangeObservable;
    constructor(props: INodeMaterialPropertyGridComponentProps);
    edit(): void;
    renderTextures(): import("react/jsx-runtime").JSX.Element | null;
    renderInputBlock(block: InputBlock): import("react/jsx-runtime").JSX.Element | null;
    renderInputValues(): import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
