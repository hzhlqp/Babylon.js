export declare const evaluateInitEngineForVisualization: (engineName: string, useReverseDepthBuffer: string | number, useNonCompatibilityMode: string | number, baseUrl: string) => Promise<{
    forceUseReverseDepthBuffer: boolean;
    forceUseNonCompatibilityMode: boolean;
    engineName: string;
    renderer: any;
}>;
export declare const evaluatePrepareScene: (sceneMetadata: {
    sceneFolder?: string;
    sceneFilename?: string;
    scriptToRun?: string;
    specificRoot?: string;
    replaceUrl?: string;
    rootPath?: string;
    functionToCall?: string;
    replace?: string;
    playgroundId?: string;
}, globalConfig: {
    root: string;
    snippetUrl: any;
    pgRoot: string;
}) => Promise<boolean>;
export declare const evaluateRenderSceneForVisualization: (renderCount: number) => Promise<unknown>;
export declare const evaluateDisposeSceneForVisualization: (engineFlags: {
    forceUseReverseDepthBuffer: boolean;
    forceUseNonCompatibilityMode: any;
}) => Promise<boolean>;
export declare const evaluateIsGLError: () => Promise<boolean>;
