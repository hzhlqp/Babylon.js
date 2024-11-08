import type { NodeRenderGraph } from "core/FrameGraph/Node/nodeRenderGraph";
import type { Observable } from "core/Misc/observable";
import type { Scene } from "core/scene";
/**
 * Interface used to specify creation options for the node editor
 */
export interface INodeEditorOptions {
    nodeRenderGraph: NodeRenderGraph;
    hostScene?: Scene;
    hostElement?: HTMLElement;
    customSave?: {
        label: string;
        action: (data: string) => Promise<void>;
    };
    customLoadObservable?: Observable<any>;
}
/**
 * Class used to create a node editor
 */
export declare class NodeRenderGraphEditor {
    private static _CurrentState;
    /**
     * Show the node editor
     * @param options defines the options to use to configure the node editor
     */
    static Show(options: INodeEditorOptions): void;
}
