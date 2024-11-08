import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import type { Skeleton } from "core/Bones/skeleton";
interface ISkeletonPropertyGridComponentProps {
    globalState: GlobalState;
    skeleton: Skeleton;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class SkeletonPropertyGridComponent extends React.Component<ISkeletonPropertyGridComponentProps> {
    private _skeletonViewersEnabled;
    private _skeletonViewerDisplayOptions;
    private _skeletonViewers;
    constructor(props: ISkeletonPropertyGridComponentProps);
    switchSkeletonViewers(): void;
    checkSkeletonViewerState(props: ISkeletonPropertyGridComponentProps): void;
    changeDisplayMode(): void;
    changeDisplayOptions(option: string, value: number): void;
    shouldComponentUpdate(nextProps: ISkeletonPropertyGridComponentProps): boolean;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
