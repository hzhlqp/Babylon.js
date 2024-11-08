import type { Observable } from "core/Misc/observable";
import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
import type { Scene } from "core/scene";
import * as React from "react";
import type { GlobalState } from "../../globalState";
import type { Camera } from "core/Cameras/camera";
interface ISceneTreeItemComponentProps {
    scene: Scene;
    gizmoCamera?: Camera;
    onRefresh: () => void;
    selectedEntity?: any;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onSelectionChangedObservable?: Observable<any>;
    globalState: GlobalState;
}
export declare class SceneTreeItemComponent extends React.Component<ISceneTreeItemComponentProps, {
    isSelected: boolean;
    isInPickingMode: boolean;
    gizmoMode: number;
    isInWorldCoodinatesMode: boolean;
}> {
    private _gizmoLayerOnPointerObserver;
    private _onPointerObserver;
    private _onSelectionChangeObserver;
    private _selectedEntity;
    private _posDragEnd;
    private _scaleDragEnd;
    private _rotateDragEnd;
    constructor(props: ISceneTreeItemComponentProps);
    shouldComponentUpdate(nextProps: ISceneTreeItemComponentProps, nextState: {
        isSelected: boolean;
        isInPickingMode: boolean;
    }): boolean;
    updateGizmoAutoPicking(isInPickingMode: boolean): void;
    componentDidMount(): void;
    private _getMeshFromBone;
    componentWillUnmount(): void;
    onSelect(): void;
    onCoordinatesMode(): void;
    onPickingMode(): void;
    setGizmoMode(mode: number): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
