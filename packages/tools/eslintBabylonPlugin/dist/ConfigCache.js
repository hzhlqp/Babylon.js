"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigCache = void 0;
var tsdoc_config_1 = require("@microsoft/tsdoc-config");
var path = require("path");
var fs = require("fs");
var Debug_1 = require("./Debug");
// How often to check for modified input files.  If a file's modification timestamp has changed, then we will
// evict the cache entry immediately.
var cacheCheckIntervalMs = 3 * 1000;
// Evict old entries from the cache after this much time, regardless of whether the file was detected as being
// modified or not.
var cacheExpireMs = 20 * 1000;
// If this many objects accumulate in the cache, then it is cleared to avoid a memory leak.
var cacheMaxSize = 100;
var ConfigCache = exports.ConfigCache = /** @class */ (function () {
    function ConfigCache() {
    }
    /**
     * Node.js equivalent of performance.now().
     * @returns A high-resolution timestamp in milliseconds.
     */
    ConfigCache._GetTimeInMs = function () {
        var _a;
        var seconds = (_a = process.hrtime(), _a[0]), nanoseconds = _a[1];
        return seconds * 1000 + nanoseconds / 1000000;
    };
    ConfigCache.GetForSourceFile = function (sourceFilePath) {
        var sourceFileFolder = path.dirname(path.resolve(sourceFilePath));
        // First, determine the file to be loaded. If not found, the configFilePath will be an empty string.
        // const configFilePath: string = TSDocConfigFile.findConfigPathForFolder(sourceFileFolder);
        var configFilePath = path.resolve(sourceFileFolder, "tsdoc.json");
        while (configFilePath.length > 11 && !fs.existsSync(configFilePath)) {
            configFilePath = path.resolve(path.dirname(configFilePath), "..", "tsdoc.json");
        }
        // If configFilePath is an empty string, then we'll use the folder of sourceFilePath as our cache key
        // (instead of an empty string)
        var cacheKey = configFilePath || sourceFileFolder + "/";
        Debug_1.Debug.Log("Cache key: \"".concat(cacheKey, "\""));
        var nowMs = ConfigCache._GetTimeInMs();
        var cachedConfig = undefined;
        // Do we have a cached object?
        cachedConfig = ConfigCache._CachedConfigs.get(cacheKey);
        if (cachedConfig) {
            Debug_1.Debug.Log("Cache hit");
            // Is the cached object still valid?
            var loadAgeMs = nowMs - cachedConfig.loadTimeMs;
            var lastCheckAgeMs = nowMs - cachedConfig.lastCheckTimeMs;
            if (loadAgeMs > cacheExpireMs || loadAgeMs < 0) {
                Debug_1.Debug.Log("Evicting because item is expired");
                cachedConfig = undefined;
                ConfigCache._CachedConfigs.delete(cacheKey);
            }
            else if (lastCheckAgeMs > cacheCheckIntervalMs || lastCheckAgeMs < 0) {
                Debug_1.Debug.Log("Checking for modifications");
                cachedConfig.lastCheckTimeMs = nowMs;
                if (cachedConfig.configFile.checkForModifiedFiles()) {
                    // Invalidate the cache because it failed to load completely
                    Debug_1.Debug.Log("Evicting because item was modified");
                    cachedConfig = undefined;
                    ConfigCache._CachedConfigs.delete(cacheKey);
                }
            }
        }
        // Load the object
        if (!cachedConfig) {
            if (ConfigCache._CachedConfigs.size > cacheMaxSize) {
                Debug_1.Debug.Log("Clearing cache");
                ConfigCache._CachedConfigs.clear(); // avoid a memory leak
            }
            var configFile = tsdoc_config_1.TSDocConfigFile.loadFile(configFilePath);
            if (configFile.fileNotFound) {
                Debug_1.Debug.Log("File not found: \"".concat(configFilePath, "\""));
            }
            else {
                Debug_1.Debug.Log("Loaded: \"".concat(configFilePath, "\""));
            }
            cachedConfig = {
                configFile: configFile,
                lastCheckTimeMs: nowMs,
                loadTimeMs: nowMs,
            };
            ConfigCache._CachedConfigs.set(cacheKey, cachedConfig);
        }
        return cachedConfig.configFile;
    };
    // findConfigPathForFolder() result --> loaded tsdoc.json configuration
    ConfigCache._CachedConfigs = new Map();
    return ConfigCache;
}());
//# sourceMappingURL=ConfigCache.js.map