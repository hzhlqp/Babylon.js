import type { FC } from "react";
/**
 * Arguments for the DragHandler component.
 */
export interface IFlexibleDragHandlerProps {
    /**
     * The size of the containing element. Used to calculate the percentage of
     * space occupied by the component
     */
    containerSize: {
        width: number;
        height: number;
    };
}
/**
 * This component receives the drop events and updates the layout accordingly
 * @param props properties
 * @returns DragHandler element
 */
export declare const FlexibleDragHandler: FC<IFlexibleDragHandlerProps>;
