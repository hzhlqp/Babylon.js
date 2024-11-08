import type { NodeGeometry } from "core/Meshes/Node/nodeGeometry";
import type { Observable } from "core/Misc/observable";
import type { Color4 } from "core/Maths/math.color";
import type { Scene } from "core/scene";
import type { Mesh } from "core/Meshes/mesh";
/**
 * Interface used to specify creation options for the node editor
 */
export interface INodeEditorOptions {
    nodeGeometry: NodeGeometry;
    hostScene?: Scene;
    hostMesh?: Mesh;
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
export declare class NodeGeometryEditor {
    private static _CurrentState;
    /**
     * Show the node editor
     * @param options defines the options to use to configure the node editor
     */
    static Show(options: INodeEditorOptions): void;
}
