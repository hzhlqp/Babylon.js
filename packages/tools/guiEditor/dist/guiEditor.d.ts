import type { Observable } from "core/Misc/observable";
import type { AdvancedDynamicTexture } from "gui/2D/advancedDynamicTexture";
/**
 * Interface used to specify creation options for the gui editor
 */
export interface IGUIEditorOptions {
    liveGuiTexture?: AdvancedDynamicTexture;
    customLoad?: {
        label: string;
        action: (data: string) => Promise<string>;
    } | undefined;
    hostElement?: HTMLElement;
    customSave?: {
        label: string;
        action: (data: string) => Promise<string>;
    };
    currentSnippetToken?: string;
    customLoadObservable?: Observable<any>;
}
/**
 * Class used to create a gui editor
 */
export declare class GUIEditor {
    private static _CurrentState;
    /**
     * Show the gui editor
     * @param options defines the options to use to configure the gui editor
     * @param embed defines whether editor is being opened from the Playground
     */
    static Show(options: IGUIEditorOptions, embed?: boolean): Promise<void>;
}
