import * as React from "react";
import type { GlobalState } from "../../../../../../globalState";
import type { Context } from "../context";
interface IMediaPlayerComponentProps {
    globalState: GlobalState;
    context: Context;
}
interface IMediaPlayerComponentState {
}
export declare class MediaPlayerComponent extends React.Component<IMediaPlayerComponentProps, IMediaPlayerComponentState> {
    private _isMounted;
    constructor(props: IMediaPlayerComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private _onFirstKey;
    private _onPrevKey;
    private _onRewind;
    private _onForward;
    private _onPrevFrame;
    private _onNextFrame;
    private _onNextKey;
    private _onEndKey;
    private _onStop;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
