import type { ReactElement } from "react";
import type { HTMLTwinItem } from "./htmlTwinItem";
export interface IHTMLTwinItemComponentProps {
    description: string | undefined;
    children: ReactElement[];
    a11yItem: HTMLTwinItem;
}
export declare function HTMLTwinAccessibilityItem(props: IHTMLTwinItemComponentProps): import("react/jsx-runtime").JSX.Element;
