import type { Scene } from "core/scene";
/**
 * Options for the HTMLTwinRenderer.
 */
export interface IHTMLTwinRendererOptions {
    /**
     * If this is true, all GUI controls will be added to the twin tree, regardless if they have
     * a defined accessibility tag or not. If it's false, only controls with an accessibility tag
     * will be added. True by default.
     */
    addAllControls: boolean;
}
/**
 * This class is the main entry point for the HTML twin renderer. To render a twin for a scene,
 * simply call HTMLTwinRenderer.Render(scene).
 */
export declare class HTMLTwinRenderer {
    /**
     * Render the HTML twin for the given scene.
     * @param scene the scene to render the twin for
     * @param options options for the renderer
     */
    static Render(scene: Scene, options?: IHTMLTwinRendererOptions): void;
}
