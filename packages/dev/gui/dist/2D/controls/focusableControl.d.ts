import type { IKeyboardEvent } from "core/Events/deviceInputEvents";
import type { Nullable } from "core/types";
import type { Control } from "./control";
/**
 * Interface used to define a control that can receive focus
 */
export interface IFocusableControl {
    /**
     * Function called when the control receives the focus
     */
    onFocus(): void;
    /**
     * Function called when the control loses the focus
     */
    onBlur(): void;
    /**
     * Function called to let the control handle keyboard events
     * @param evt defines the current keyboard event
     */
    processKeyboard(evt: IKeyboardEvent): void;
    /**
     * Function called to get the list of controls that should not steal the focus from this control
     * @returns an array of controls
     */
    keepsFocusWith(): Nullable<Control[]>;
    /**
     * Function to focus the control programmatically
     */
    focus(): void;
    /**
     * Function to unfocus the control programmatically
     */
    blur(): void;
    /**
     * Gets or sets the tabIndex of the control
     */
    tabIndex?: number;
    /**
     * Gets or sets the color used to draw the focus border
     * Defaults to "white"
     */
    focusBorderColor?: string;
}
