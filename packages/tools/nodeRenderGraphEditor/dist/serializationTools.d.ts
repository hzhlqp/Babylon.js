import type { GlobalState } from "./globalState";
import type { Nullable } from "core/types";
import type { GraphFrame } from "shared-ui-components/nodeGraphSystem/graphFrame";
import type { NodeRenderGraph } from "core/FrameGraph/Node/nodeRenderGraph";
export declare class SerializationTools {
    static UpdateLocations(renderGraph: NodeRenderGraph, globalState: GlobalState, frame?: Nullable<GraphFrame>): void;
    static Serialize(renderGraph: NodeRenderGraph, globalState: GlobalState, frame?: Nullable<GraphFrame>): string;
    static Deserialize(serializationObject: any, globalState: GlobalState): void;
    static AddFrameToRenderGraph(serializationObject: any, globalState: GlobalState, currentRenderGraph: NodeRenderGraph): void;
}
