import type { IEditablePropertyOption } from "core/Decorators/nodeDecorator";
import type { StateManager } from "./stateManager";
/**
 * Function used to force a rebuild of the node system
 * @param source source object
 * @param stateManager defines the state manager to use
 * @param propertyName name of the property that has been changed
 * @param notifiers list of notifiers to use
 */
export declare function ForceRebuild(source: any, stateManager: StateManager, propertyName: string, notifiers?: IEditablePropertyOption["notifiers"]): void;
