/// <reference types="react" />
import type { AccessibilityEntity } from "./htmlTwinItem";
import type { Scene } from "core/scene";
import type { IHTMLTwinRendererOptions } from "./htmlTwinRenderer";
/**
 * An adapter that transforms a Accessible entity in a React element. Contains observables for the events that can
 * change the state of the entity or the accesible tree.
 * @param props the props of the adapter
 * @returns
 */
export declare function HTMLTwinItemAdapter(props: {
    node: AccessibilityEntity;
    scene: Scene;
    options: IHTMLTwinRendererOptions;
}): JSX.Element | null;
