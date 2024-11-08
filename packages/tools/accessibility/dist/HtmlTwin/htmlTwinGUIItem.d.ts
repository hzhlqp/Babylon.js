import type { Scene } from "core/scene";
import type { Control } from "gui/2D/controls/control";
import { HTMLTwinItem } from "./htmlTwinItem";
import type { IHTMLTwinRendererOptions } from "./htmlTwinRenderer";
/**
 * A abstract layer to store the html twin tree structure. It is constructed from the BabylonJS scene entities that need to be accessible. It informs the parent-children relationship of html twin tree, and informs how to render: description, isActionable, onclick/onrightclick/onfocus/onblur.
 */
export declare class HTMLTwinGUIItem extends HTMLTwinItem {
    /**
     * The corresponding BabylonJS entity. Can be a Node or a Control.
     */
    entity: Control;
    constructor(entity: Control, scene: Scene);
    /**
     * The text content displayed in HTML element.
     * @param options - Options to render HTML twin tree where this element is contained.
     * @returns The text content displayed in HTML element.
     */
    getDescription(options: IHTMLTwinRendererOptions): string;
    /**
     * If this entity is actionable (can be clicked).
     */
    get isActionable(): boolean;
    /**
     * If this entity is focusable (can be focused by tab key pressing).
     */
    get isFocusable(): boolean;
    /**
     * Callback when the HTML element is focused. Show visual indication on BabylonJS entity.
     */
    focus(): void;
    /**
     * Callback when the HTML element is blured. Dismiss visual indication on BabylonJS entity.
     */
    blur(): void;
    /**
     * Callback when an event (e.g. click/right click) happens on the HTML element.
     * Implemented by child classes
     * @param eventType - Which event is triggered. E.g. "click", "contextmenu"
     */
    triggerEvent(eventType: string): void;
}
