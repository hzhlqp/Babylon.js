/// <reference types="react" />
/**
 * this context is used to pass callbacks to the graph nodes and connections
 */
export interface IGraphContext {
    onNodesConnected?: (sourceId: string, targetId: string) => void;
    onLineSelected?: (lineId: string) => void;
    onNodeSelected?: (nodeId: string) => void;
}
export declare const GraphContextManager: import("react").Context<IGraphContext>;
