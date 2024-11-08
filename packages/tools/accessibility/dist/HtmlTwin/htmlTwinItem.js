import { StandardMaterial } from "core/Materials/standardMaterial";
import { AbstractMesh } from "core/Meshes/abstractMesh";
import { Node } from "core/node";
import { AdvancedDynamicTexture } from "gui/2D/advancedDynamicTexture";
import { Button } from "gui/2D/controls/button";
import { Container } from "gui/2D/controls/container";
import { Control } from "gui/2D/controls/control";
/**
 * Retrieve an instance of texture with accessible elements (AdvancedDynamicTexture)
 * @param item the item to retrieve the texture from
 * @returns an accessible texture if found, undefined otherwise
 */
export function getAccessibleTexture(item) {
    if (item instanceof AbstractMesh && item.material instanceof StandardMaterial) {
        const hasTexture = item.material.emissiveTexture || item.material.diffuseTexture;
        if (hasTexture) {
            const texture = item.material.emissiveTexture ?? item.material.diffuseTexture;
            if (texture instanceof AdvancedDynamicTexture) {
                return texture;
            }
        }
    }
    return undefined;
}
/**
 * Get the direct children of an accessible item.
 * @param item an accessible item
 * @returns a list of accessible items
 */
export function getDirectChildrenOf(item) {
    if (item instanceof Node) {
        return item.getDescendants(true);
    }
    else if (item instanceof Container && !(item instanceof Button)) {
        return item.children;
    }
    return [];
}
/**
 * Given an accessible item, return if it's visible or not.
 * @param item an accessible item
 * @returns its visibility status
 */
export function isVisible(item) {
    if (item instanceof Node) {
        return item.isEnabled();
    }
    else if (item instanceof Control) {
        return item.isEnabled && item.isVisible;
    }
    return false;
}
/**
 * A abstract layer to store the html twin tree structure. It is constructed from the BabylonJS scene entities that need to be accessible. It informs the parent-children relationship of html twin tree, and informs how to render: description, isActionable, onclick/onrightclick/onfocus/onblur.
 */
export class HTMLTwinItem {
    /**
     * Constructor of HTMLTwinItem.
     * @param entity - The corresponding BabylonJS entity. Can be a Node or a Control.
     * @param scene - The BabylonJS scene that the corresponding BabylonJS entity is in.
     */
    constructor(entity, scene) {
        this.entity = entity;
        this.scene = scene;
    }
    /**
     * The text content displayed in HTML element.
     * Returns the description in accessibilityTag, if defined (returns "" by default).
     * @param _options - The options to render the HTML twin tree where this item is contained. Not used in this class, but in its children.
     * @returns the text content displayed in HTML element
     */
    getDescription(_options) {
        return this.entity.accessibilityTag?.description ?? "";
    }
    /**
     * If this entity is actionable (can be clicked).
     * Implemented by child classes
     */
    get isActionable() {
        return this._isActionable;
    }
    /**
     * If this entity is focusable (can be focused by tab key pressing).
     * Implemented by child classes
     */
    get isFocusable() {
        return this._isFocusable;
    }
    /**
     * Callback when the HTML element is focused. Show visual indication on BabylonJS entity.
     * Implemented by child classes
     */
    focus() { }
    /**
     * Callback when the HTML element is blured. Dismiss visual indication on BabylonJS entity.
     * Implemented by child classes
     */
    blur() { }
    /**
     * Callback when an event (e.g. click/right click) happens on the HTML element.
     * Implemented by child classes
     * @param _eventType - Which event is triggered. E.g. "click", "contextmenu"
     */
    triggerEvent(_eventType) { }
}
//# sourceMappingURL=htmlTwinItem.js.map