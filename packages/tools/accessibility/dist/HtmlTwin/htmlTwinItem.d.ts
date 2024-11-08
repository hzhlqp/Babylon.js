import { Node } from "core/node";
import type { Scene } from "core/scene";
import { AdvancedDynamicTexture } from "gui/2D/advancedDynamicTexture";
import { Control } from "gui/2D/controls/control";
import type { IHTMLTwinRendererOptions } from "./htmlTwinRenderer";
/**
 * The BabylonJS entities that can be accessible. It can be a Node or a Control.
 */
export type AccessibilityEntity = Node | Control;
/**
 * Retrieve an instance of texture with accessible elements (AdvancedDynamicTexture)
 * @param item the item to retrieve the texture from
 * @returns an accessible texture if found, undefined otherwise
 */
export declare function getAccessibleTexture(item: AccessibilityEntity): AdvancedDynamicTexture | undefined;
/**
 * Get the direct children of an accessible item.
 * @param item an accessible item
 * @returns a list of accessible items
 */
export declare function getDirectChildrenOf(item: AccessibilityEntity): AccessibilityEntity[];
/**
 * Given an accessible item, return if it's visible or not.
 * @param item an accessible item
 * @returns its visibility status
 */
export declare function isVisible(item: AccessibilityEntity): boolean;
/**
 * A abstract layer to store the html twin tree structure. It is constructed from the BabylonJS scene entities that need to be accessible. It informs the parent-children relationship of html twin tree, and informs how to render: description, isActionable, onclick/onrightclick/onfocus/onblur.
 */
export declare class HTMLTwinItem {
    /**
     * The corresponding BabylonJS entity. Can be a Node or a Control.
     */
    entity: AccessibilityEntity;
    /**
     * The BabylonJS scene that the corresponding BabylonJS entity is in.
     */
    scene: Scene;
    /**
     * Constructor of HTMLTwinItem.
     * @param entity - The corresponding BabylonJS entity. Can be a Node or a Control.
     * @param scene - The BabylonJS scene that the corresponding BabylonJS entity is in.
     */
    constructor(entity: AccessibilityEntity, scene: Scene);
    /**
     * The text content displayed in HTML element.
     * Returns the description in accessibilityTag, if defined (returns "" by default).
     * @param _options - The options to render the HTML twin tree where this item is contained. Not used in this class, but in its children.
     * @returns the text content displayed in HTML element
     */
    getDescription(_options: IHTMLTwinRendererOptions): string;
    /**
     * If this entity is actionable (can be clicked).
     * Implemented by child classes
     */
    get isActionable(): boolean;
    /**
     * If this entity is focusable (can be focused by tab key pressing).
     * Implemented by child classes
     */
    get isFocusable(): boolean;
    /**
     * Callback when the HTML element is focused. Show visual indication on BabylonJS entity.
     * Implemented by child classes
     */
    focus(): void;
    /**
     * Callback when the HTML element is blured. Dismiss visual indication on BabylonJS entity.
     * Implemented by child classes
     */
    blur(): void;
    /**
     * Callback when an event (e.g. click/right click) happens on the HTML element.
     * Implemented by child classes
     * @param _eventType - Which event is triggered. E.g. "click", "contextmenu"
     */
    triggerEvent(_eventType: string): void;
    protected _isActionable: boolean;
    protected _isFocusable: boolean;
}
