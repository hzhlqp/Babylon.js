import type { NodeMaterialBlock } from "core/Materials/Node/nodeMaterialBlock";
import type { INodeContainer } from "shared-ui-components/nodeGraphSystem/interfaces/nodeContainer";
import type { INodeData } from "shared-ui-components/nodeGraphSystem/interfaces/nodeData";
import type { IPortData } from "shared-ui-components/nodeGraphSystem/interfaces/portData";
import type { NodeMaterialTeleportOutBlock } from "core/Materials/Node/Blocks/Teleport/teleportOutBlock";
export declare class BlockNodeData implements INodeData {
    data: NodeMaterialBlock;
    private _inputs;
    private _outputs;
    get uniqueId(): number;
    get name(): string;
    getClassName(): string;
    get isInput(): boolean;
    get inputs(): IPortData[];
    get outputs(): IPortData[];
    get comments(): string;
    set comments(value: string);
    get executionTime(): number;
    getPortByName(name: string): IPortData | null;
    dispose(): void;
    prepareHeaderIcon(iconDiv: HTMLDivElement, img: HTMLImageElement): void;
    get invisibleEndpoints(): NodeMaterialTeleportOutBlock[] | null;
    constructor(data: NodeMaterialBlock, nodeContainer: INodeContainer);
}
