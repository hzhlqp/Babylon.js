import type { SceneManager } from "../../managers/sceneManager";
/**
 *
 * @param name the name of the custom optimizer configuration
 * @param upgrade set to true if you want to upgrade optimizer and false if you want to degrade
 * @returns the optimizer function
 */
export declare function getCustomOptimizerByName(name: string, upgrade?: boolean): (sceneManager: SceneManager) => boolean;
export declare function registerCustomOptimizer(name: string, optimizer: (sceneManager: SceneManager) => boolean): void;
