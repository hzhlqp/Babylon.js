import * as React from "react";
import type { GlobalState } from "../globalState";
import { Rect } from "./coordinateHelper";
interface IArtBoardProps {
    globalState: GlobalState;
}
interface IArtBoardState {
    bounds: Rect;
}
export declare class ArtBoardComponent extends React.Component<IArtBoardProps, IArtBoardState> {
    constructor(props: IArtBoardProps);
    update(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
