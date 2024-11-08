import * as React from "react";
import type { PaneComponent } from "./paneComponent";
interface ITabsComponentProps {
    children: any[];
    selectedIndex: number;
    onSelectedIndexChange: (value: number) => void;
}
export declare class TabsComponent extends React.Component<ITabsComponentProps> {
    constructor(props: ITabsComponentProps);
    onSelect(index: number): void;
    renderLabel(child: PaneComponent, index: number): import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
