import * as React from "react";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
interface ILinkButtonComponentProps {
    label: string;
    buttonLabel: string;
    url?: string;
    onClick: () => void;
    icon?: IconProp;
    onIconClick?: () => void;
}
export declare class LinkButtonComponent extends React.Component<ILinkButtonComponentProps> {
    constructor(props: ILinkButtonComponentProps);
    onLink(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
