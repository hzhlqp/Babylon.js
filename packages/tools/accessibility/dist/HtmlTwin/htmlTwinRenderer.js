import * as React from "react";
import * as ReactDOM from "react-dom";
import { HTMLTwinHostComponent } from "./htmlTwinHostComponent";
/**
 * This class is the main entry point for the HTML twin renderer. To render a twin for a scene,
 * simply call HTMLTwinRenderer.Render(scene).
 */
export class HTMLTwinRenderer {
    /**
     * Render the HTML twin for the given scene.
     * @param scene the scene to render the twin for
     * @param options options for the renderer
     */
    static Render(scene, options) {
        const htmlTwinHost = React.createElement(HTMLTwinHostComponent, {
            scene,
            options,
        });
        ReactDOM.render(htmlTwinHost, scene.getEngine().getRenderingCanvas());
    }
}
//# sourceMappingURL=htmlTwinRenderer.js.map