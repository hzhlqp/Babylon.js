/// <reference types="react" />
import type { Scene } from "core/scene";
import type { IHTMLTwinRendererOptions } from "./htmlTwinRenderer";
/**
 * The scene tree of the HTML twin. It contain all the top level nodes
 * @param props
 * @returns
 */
export declare function HTMLTwinSceneTree(props: {
    scene: Scene;
    options: IHTMLTwinRendererOptions;
}): JSX.Element;
