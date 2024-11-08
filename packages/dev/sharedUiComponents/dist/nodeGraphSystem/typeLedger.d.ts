import type { INodeContainer } from "./interfaces/nodeContainer";
import type { INodeData } from "./interfaces/nodeData";
import type { IPortData } from "./interfaces/portData";
import type { NodePort } from "./nodePort";
export declare class TypeLedger {
    static PortDataBuilder: (port: NodePort, nodeContainer: INodeContainer) => IPortData;
    static NodeDataBuilder: (data: any, nodeContainer: INodeContainer) => INodeData;
}
