export function getConfigurationKey(key, configObject) {
    const splits = key.split(".");
    if (splits.length === 0 || !configObject) {
        return;
    }
    else if (splits.length === 1) {
        if (configObject[key] !== undefined) {
            return configObject[key];
        }
    }
    else {
        const firstKey = splits.shift();
        return getConfigurationKey(splits.join("."), configObject[firstKey]);
    }
}
//# sourceMappingURL=configuration.js.map