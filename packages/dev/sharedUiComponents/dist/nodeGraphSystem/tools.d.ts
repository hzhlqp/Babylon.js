import type { GraphCanvasComponent } from "./graphCanvas";
import type { GraphNode } from "./graphNode";
import type { NodeLink } from "./nodeLink";
import type { FramePortData } from "./types/framePortData";
export declare const IsFramePortData: (variableToCheck: any) => variableToCheck is FramePortData;
export declare const RefreshNode: (node: GraphNode, visitedNodes?: Set<GraphNode>, visitedLinks?: Set<NodeLink>, canvas?: GraphCanvasComponent) => void;
