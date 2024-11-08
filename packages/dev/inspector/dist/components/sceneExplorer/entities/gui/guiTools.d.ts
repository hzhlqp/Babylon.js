import type { AdvancedDynamicTexture } from "gui/2D/advancedDynamicTexture";
/**
 * Used to pass in the gui-editor package.
 * @param guiEditorPackage
 */
export declare function InjectGUIEditor(guiEditorPackage: any): void;
/**
 * Change the URL that the GUI editor loads from
 * @param guiEditorURL
 */
export declare function SetGUIEditorURL(guiEditorURL: string): void;
/**
 * Opens an ADT in the GUI editor
 * if you are in an ES6 environment, you must first call InjectGUIEditor to provide the gui-editor package
 * If you are in a UMD environment, it will load the package from a URL
 * @param adt
 * @param embed defines whether editor is being opened from the Playground
 * @returns a promise that resolves when the editor is opened
 */
export declare function EditAdvancedDynamicTexture(adt: AdvancedDynamicTexture, embed?: boolean): Promise<void>;
