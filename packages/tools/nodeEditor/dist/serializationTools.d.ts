import type { NodeMaterial } from "core/Materials/Node/nodeMaterial";
import type { GlobalState } from "./globalState";
import type { Nullable } from "core/types";
import type { GraphFrame } from "shared-ui-components/nodeGraphSystem/graphFrame";
export declare class SerializationTools {
    static UpdateLocations(material: NodeMaterial, globalState: GlobalState, frame?: Nullable<GraphFrame>): void;
    static Serialize(material: NodeMaterial, globalState: GlobalState, frame?: Nullable<GraphFrame>): string;
    static Deserialize(serializationObject: any, globalState: GlobalState): void;
    static AddFrameToMaterial(serializationObject: any, globalState: GlobalState, currentMaterial: NodeMaterial): void;
}
