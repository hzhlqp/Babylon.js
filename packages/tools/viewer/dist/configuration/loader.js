import { RenderOnlyConfigurationLoader } from "./renderOnlyLoader";
// eslint-disable-next-line import/no-internal-modules
import { getConfigurationType } from "./types/index";
export class ConfigurationLoader extends RenderOnlyConfigurationLoader {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    getExtendedConfig(type) {
        return getConfigurationType(type || "extended");
    }
}
//# sourceMappingURL=loader.js.map