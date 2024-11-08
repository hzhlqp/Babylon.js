import { RenderOnlyConfigurationLoader } from "./renderOnlyLoader";
export declare class ConfigurationLoader extends RenderOnlyConfigurationLoader {
    protected getExtendedConfig(type: string | undefined): import("./configuration").ViewerConfiguration;
}
