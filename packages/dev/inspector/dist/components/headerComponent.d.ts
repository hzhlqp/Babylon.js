import * as React from "react";
import type { Observable } from "core/Misc/observable";
export interface IHeaderComponentProps {
    title: string;
    handleBack?: boolean;
    noExpand?: boolean;
    noClose?: boolean;
    noCommands?: boolean;
    onPopup: () => void;
    onClose: () => void;
    onSelectionChangedObservable?: Observable<any>;
}
export declare class HeaderComponent extends React.Component<IHeaderComponentProps, {
    isBackVisible: boolean;
}> {
    private _backStack;
    private _onSelectionChangeObserver;
    constructor(props: IHeaderComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    goBack(): void;
    renderLogo(): import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element;
}
