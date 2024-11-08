import type { Vector2 } from "core/Maths/math.vector";
import { Button } from "./button";
import type { Control } from "./control";
import type { PointerInfoBase } from "core/Events/pointerEvents";
import type { IFocusableControl } from "./focusableControl";
/**
 * Class used to create a focusable button that can easily handle keyboard events
 * @since 5.0.0
 */
export declare class FocusableButton extends Button implements IFocusableControl {
    name?: string | undefined;
    constructor(name?: string | undefined);
    /**
     * @internal
     */
    _onPointerDown(target: Control, coordinates: Vector2, pointerId: number, buttonIndex: number, pi: PointerInfoBase): boolean;
}
