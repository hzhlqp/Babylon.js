import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { TargetedAnimation } from "core/Animations/animationGroup";
import type { Scene } from "core/scene";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface ITargetedAnimationGridComponentProps {
    globalState: GlobalState;
    targetedAnimation: TargetedAnimation;
    scene: Scene;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class TargetedAnimationGridComponent extends React.Component<ITargetedAnimationGridComponentProps> {
    private _animationGroup;
    private _animationCurveEditorContext;
    constructor(props: ITargetedAnimationGridComponentProps);
    findAnimationGroup: () => void;
    playOrPause: () => void;
    deleteAnimation: () => void;
    updateContextFromProps: () => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<ITargetedAnimationGridComponentProps>, prevState: Readonly<{}>, snapshot?: any): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
