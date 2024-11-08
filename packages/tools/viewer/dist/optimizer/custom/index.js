import { extendedUpgrade, extendedDegrade } from "./extended";
const cache = {};
/**
 *
 * @param name the name of the custom optimizer configuration
 * @param upgrade set to true if you want to upgrade optimizer and false if you want to degrade
 * @returns the optimizer function
 */
export function getCustomOptimizerByName(name, upgrade) {
    if (!cache[name]) {
        switch (name) {
            case "extended":
                if (upgrade) {
                    return extendedUpgrade;
                }
                else {
                    return extendedDegrade;
                }
        }
    }
    return cache[name];
}
export function registerCustomOptimizer(name, optimizer) {
    cache[name] = optimizer;
}
//# sourceMappingURL=index.js.map