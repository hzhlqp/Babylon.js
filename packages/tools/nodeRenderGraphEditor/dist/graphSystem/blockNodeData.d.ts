import type { INodeContainer } from "shared-ui-components/nodeGraphSystem/interfaces/nodeContainer";
import type { INodeData } from "shared-ui-components/nodeGraphSystem/interfaces/nodeData";
import type { IPortData } from "shared-ui-components/nodeGraphSystem/interfaces/portData";
import type { NodeRenderGraphBlock } from "core/FrameGraph/Node/nodeRenderGraphBlock";
import type { NodeRenderGraphTeleportOutBlock } from "core/FrameGraph/Node/Blocks/Teleport/teleportOutBlock";
export declare class BlockNodeData implements INodeData {
    data: NodeRenderGraphBlock;
    private _inputs;
    private _outputs;
    private _onBuildObserver;
    /**
     * Gets or sets a callback used to call node visual refresh
     */
    refreshCallback?: () => void;
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
    isConnectedToOutput(): boolean;
    dispose(): void;
    prepareHeaderIcon(iconDiv: HTMLDivElement, img: HTMLImageElement): void;
    get invisibleEndpoints(): NodeRenderGraphTeleportOutBlock[] | null;
    constructor(data: NodeRenderGraphBlock, nodeContainer: INodeContainer);
}
