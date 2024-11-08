import type { NodeMaterial } from "core/Materials/Node/nodeMaterial";
import type { Observable } from "core/Misc/observable";
import type { Color4 } from "core/Maths/math.color";
/**
 * Interface used to specify creation options for the node editor
 */
export interface INodeEditorOptions {
    nodeMaterial: NodeMaterial;
    hostElement?: HTMLElement;
    customSave?: {
        label: string;
        action: (data: string) => Promise<void>;
    };
    customLoadObservable?: Observable<any>;
    backgroundColor?: Color4;
}
/**
 * Class used to create a node editor
 */
export declare class NodeEditor {
    private static _CurrentState;
    /**
     * Show the node editor
     * @param options defines the options to use to configure the node editor
     */
    static Show(options: INodeEditorOptions): void;
}
