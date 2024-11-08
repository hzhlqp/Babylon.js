import { TelemetryLoaderPlugin } from "./telemetryLoaderPlugin";
import { ILoaderPlugin } from "./loaderPlugin";
import { MSFTLodLoaderPlugin } from "./msftLodLoaderPlugin";
import { ApplyMaterialConfigPlugin } from "./applyMaterialConfig";
import { ExtendedMaterialLoaderPlugin } from "./extendedMaterialLoaderPlugin";
export { TelemetryLoaderPlugin, ILoaderPlugin, MSFTLodLoaderPlugin, ApplyMaterialConfigPlugin, ExtendedMaterialLoaderPlugin };
/**
 * Get a loader plugin according to its name.
 * The plugin will be cached and will be reused if called for again.
 *
 * @param name the name of the plugin
 * @returns the plugin
 */
export declare function getLoaderPluginByName(name: string): ILoaderPlugin;
/**
 * @param name
 * @param plugin
 */
export declare function addLoaderPlugin(name: string, plugin: ILoaderPlugin): void;
