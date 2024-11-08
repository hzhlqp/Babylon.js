import type { GlobalState } from "./globalState";
import type { Nullable } from "core/types";
import type { GraphFrame } from "shared-ui-components/nodeGraphSystem/graphFrame";
import type { NodeGeometry } from "core/Meshes/Node/nodeGeometry";
export declare class SerializationTools {
    static UpdateLocations(geometry: NodeGeometry, globalState: GlobalState, frame?: Nullable<GraphFrame>): void;
    static Serialize(geometry: NodeGeometry, globalState: GlobalState, frame?: Nullable<GraphFrame>): string;
    static Deserialize(serializationObject: any, globalState: GlobalState): void;
    static AddFrameToGeometry(serializationObject: any, globalState: GlobalState, currentGeometry: NodeGeometry): void;
}
