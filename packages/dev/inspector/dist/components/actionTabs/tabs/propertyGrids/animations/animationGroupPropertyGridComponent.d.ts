import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { AnimationGroup } from "core/Animations/animationGroup";
import type { Scene } from "core/scene";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
interface IAnimationGroupGridComponentProps {
    globalState: GlobalState;
    animationGroup: AnimationGroup;
    scene: Scene;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class AnimationGroupGridComponent extends React.Component<IAnimationGroupGridComponentProps, {
    playButtonText: string;
    currentFrame: number;
}> {
    private _onAnimationGroupPlayObserver;
    private _onAnimationGroupPauseObserver;
    private _onBeforeRenderObserver;
    private _timelineRef;
    private _animationCurveEditorContext;
    constructor(props: IAnimationGroupGridComponentProps);
    componentDidMount(): void;
    disconnect(animationGroup: AnimationGroup): void;
    connect(animationGroup: AnimationGroup): void;
    updateCurrentFrame(animationGroup: AnimationGroup): void;
    shouldComponentUpdate(nextProps: IAnimationGroupGridComponentProps): boolean;
    componentWillUnmount(): void;
    playOrPause(): void;
    onCurrentFrameChange(value: number): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
