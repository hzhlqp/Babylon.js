import * as React from "react";
export interface IPopupComponentProps {
    id: string;
    title: string;
    size: {
        width: number;
        height: number;
    };
    onOpen?: (window: Window) => void;
    onClose: (window: Window) => void;
    onResize?: (window: Window) => void;
    onKeyUp?: (evt: KeyboardEvent) => void;
    onKeyDown?: (evt: KeyboardEvent) => void;
}
export declare class PopupComponent extends React.Component<IPopupComponentProps, {
    isComponentMounted: boolean;
    blockedByBrowser: boolean;
}> {
    private _container;
    private _window;
    private _host;
    constructor(props: IPopupComponentProps);
    componentDidMount(): void;
    onBeforeUnloadListener: () => void;
    openPopup(): void;
    componentWillUnmount(): void;
    getWindow(): Window | null;
    render(): React.ReactPortal | null;
}
