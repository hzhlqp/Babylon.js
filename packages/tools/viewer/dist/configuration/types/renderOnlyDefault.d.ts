/**
 * The render only default configuration of the viewer, including templates (canvas, overly, loading screen)
 * This configuration doesn't hold specific parameters, and only defines objects that are needed for the render only viewer viewer to fully work correctly.
 */
export declare const renderOnlyDefaultConfiguration: {
    version: string;
    camera: {
        behaviors: {
            autoRotate: {
                type: number;
            };
            framing: {
                type: number;
                zoomOnBoundingInfo: boolean;
                zoomStopsAnimation: boolean;
            };
            bouncing: {
                type: number;
            };
        };
    };
    skybox: {};
    ground: {
        receiveShadows: boolean;
    };
    engine: {
        antialiasing: boolean;
    };
    scene: {};
};
