import type { SceneManager } from "../../managers/sceneManager";
/**
 * A custom upgrade-oriented function configuration for the scene optimizer.
 * @param sceneManager
 * @returns true if the scene is fully upgraded
 */
export declare function extendedUpgrade(sceneManager: SceneManager): boolean;
/**
 * A custom degrade-oriented function configuration for the scene optimizer.
 * @param sceneManager
 * @returns true if the scene is fully degraded
 */
export declare function extendedDegrade(sceneManager: SceneManager): boolean;
