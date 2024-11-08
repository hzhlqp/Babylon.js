import * as React from "react";
import type { IExplorerExtensibilityGroup } from "core/Debug/debugLayer";
interface IExtensionsComponentProps {
    target: any;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
}
export declare class ExtensionsComponent extends React.Component<IExtensionsComponentProps, {
    popupVisible: boolean;
}> {
    private _popup;
    private _extensionRef;
    constructor(props: IExtensionsComponentProps);
    showPopup(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
export {};
