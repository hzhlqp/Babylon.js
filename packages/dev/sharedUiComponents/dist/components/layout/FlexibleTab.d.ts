import type { FC } from "react";
import type { TabDrag } from "./types";
/**
 * Arguments for the FlexibleTab component.
 */
export interface IFlexibleTabProps {
    /**
     * The tab's title.
     */
    title: string;
    /**
     * If the tab is currently selected or not
     */
    selected: boolean;
    /**
     * What happens when the user clicks on the tab
     */
    onClick: () => void;
    /**
     * The object that will be sent to the drag event
     */
    item: TabDrag;
    /**
     * What happens when the user drops another tab after this one
     */
    onTabDroppedAction: (item: TabDrag) => void;
}
/**
 * A component that renders a tab that the user can click
 * to activate or drag to reorder. It also listens for
 * drop events if the user wants to drop another tab
 * after it.
 * @param props properties
 * @returns FlexibleTab element
 */
export declare const FlexibleTab: FC<IFlexibleTabProps>;
