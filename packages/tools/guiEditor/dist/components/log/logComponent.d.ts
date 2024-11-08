import * as React from "react";
import type { GlobalState } from "../../globalState";
import "./log.scss";
interface ILogComponentProps {
    globalState: GlobalState;
}
export declare class LogEntry {
    message: string;
    isError: boolean;
    constructor(message: string, isError: boolean);
}
export declare class LogComponent extends React.Component<ILogComponentProps, {
    logs: LogEntry[];
}> {
    constructor(props: ILogComponentProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
