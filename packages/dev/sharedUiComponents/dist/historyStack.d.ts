import type { IDisposable } from "core/scene";
/**
 * Class handling undo / redo operations
 */
export declare class HistoryStack implements IDisposable {
    private _historyStack;
    private _redoStack;
    private _activeData;
    private readonly _maxHistoryLength;
    private _locked;
    private _dataProvider;
    private _applyUpdate;
    /**
     * Gets or sets a boolean indicating if the stack is enabled
     */
    isEnabled: boolean;
    /**
     * Constructor
     * @param dataProvider defines the data provider function
     * @param applyUpdate defines the code to execute when undo/redo operation is required
     */
    constructor(dataProvider: () => any, applyUpdate: (data: any) => void);
    /**
     * Process key event to handle undo / redo
     * @param evt defines the keyboard event to process
     * @returns true if the event was processed
     */
    processKeyEvent(evt: KeyboardEvent): boolean;
    /**
     * Resets the stack
     */
    reset(): void;
    /**
     * Remove the n-1 element of the stack
     */
    collapseLastTwo(): void;
    private _generateJSONDiff;
    private _applyJSONDiff;
    private _copy;
    /**
     * Stores the current state
     */
    store(): void;
    /**
     * Undo the latest operation
     */
    undo(): void;
    /**
     * Redo the latest undo operation
     */
    redo(): void;
    /**
     * Disposes the stack
     */
    dispose(): void;
}
