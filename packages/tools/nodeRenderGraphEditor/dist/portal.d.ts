import * as React from "react";
import type { GlobalState } from "./globalState";
interface IPortalProps {
    globalState: GlobalState;
}
export declare class Portal extends React.Component<IPortalProps> {
    render(): React.ReactPortal;
}
export {};
