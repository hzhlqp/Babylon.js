import * as React from "react";
import type { Observable } from "core/Misc/observable";
import type { Scene } from "core/scene";
import type { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import type { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import type { GlobalState } from "../../../../globalState";
import type { IAnimatable } from "core/Animations/animatable.interface";
interface IAnimationGridComponentProps {
    globalState: GlobalState;
    animatable: IAnimatable;
    scene: Scene;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export declare class AnimationGridComponent extends React.Component<IAnimationGridComponentProps, {
    currentFrame: number;
}> {
    private _animations;
    private _ranges;
    private _mainAnimatable;
    private _onBeforeRenderObserver;
    private _isPlaying;
    private _timelineRef;
    private _animationCurveEditorContext;
    private _animationControl;
    constructor(props: IAnimationGridComponentProps);
    playOrPause(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onCurrentFrameChange(value: number): void;
    onChangeFromOrTo(): void;
    componentDidUpdate(prevProps: IAnimationGridComponentProps): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
