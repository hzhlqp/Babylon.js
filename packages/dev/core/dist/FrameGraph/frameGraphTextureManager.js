import { getDimensionsFromTextureSize } from "../Materials/Textures/textureCreationOptions";
import { Texture } from "../Materials/Textures/texture";
import { backbufferColorTextureHandle, backbufferDepthStencilTextureHandle } from "./frameGraphTypes";
import { Constants } from "../Engines/constants";
var FrameGraphTextureNamespace;
(function (FrameGraphTextureNamespace) {
    FrameGraphTextureNamespace[FrameGraphTextureNamespace["Task"] = 0] = "Task";
    FrameGraphTextureNamespace[FrameGraphTextureNamespace["Graph"] = 1] = "Graph";
    FrameGraphTextureNamespace[FrameGraphTextureNamespace["External"] = 2] = "External";
})(FrameGraphTextureNamespace || (FrameGraphTextureNamespace = {}));
/**
 * @experimental
 * @internal
 */
export class FrameGraphTextureManager {
    constructor(_engine, _debugTextures = false, _scene) {
        this._engine = _engine;
        this._debugTextures = _debugTextures;
        this._scene = _scene;
        this._textures = new Map();
        this._addSystemTextures();
    }
    isBackbuffer(handle) {
        if (handle === backbufferColorTextureHandle || handle === backbufferDepthStencilTextureHandle) {
            return true;
        }
        const textureEntry = this._textures.get(handle);
        if (!textureEntry) {
            return false;
        }
        return textureEntry.refHandle === backbufferColorTextureHandle || textureEntry.refHandle === backbufferDepthStencilTextureHandle;
    }
    isBackbufferColor(handle) {
        if (handle === backbufferColorTextureHandle) {
            return true;
        }
        const textureEntry = this._textures.get(handle);
        if (!textureEntry) {
            return false;
        }
        return textureEntry.refHandle === backbufferColorTextureHandle;
    }
    isBackbufferDepthStencil(handle) {
        if (handle === backbufferDepthStencilTextureHandle) {
            return true;
        }
        const textureEntry = this._textures.get(handle);
        if (!textureEntry) {
            return false;
        }
        return textureEntry.refHandle === backbufferDepthStencilTextureHandle;
    }
    getTextureCreationOptions(handle) {
        return this._textures.get(handle).creationOptions;
    }
    getTextureFromHandle(handle) {
        return this._textures.get(handle).texture;
    }
    importTexture(name, texture, handle) {
        const internalTexture = texture.texture;
        if (!internalTexture) {
            throw new Error("Texture must have an internal texture to be imported");
        }
        if (handle !== undefined) {
            this._freeEntry(handle);
        }
        const creationOptions = {
            size: { width: texture.width, height: texture.height },
            options: {
                generateMipMaps: internalTexture.generateMipMaps,
                generateDepthBuffer: texture._generateDepthBuffer,
                generateStencilBuffer: texture._generateStencilBuffer,
                samples: internalTexture.samples,
                label: internalTexture.label,
                types: [internalTexture.type],
                samplingModes: [internalTexture.samplingMode],
                formats: [internalTexture.format],
                targetTypes: [
                    internalTexture.isCube
                        ? Constants.TEXTURE_CUBE_MAP
                        : internalTexture.is3D
                            ? Constants.TEXTURE_3D
                            : internalTexture.is2DArray
                                ? Constants.TEXTURE_2D_ARRAY
                                : Constants.TEXTURE_2D,
                ],
                useSRGBBuffers: [internalTexture._useSRGBBuffer],
                labels: internalTexture.label ? [internalTexture.label] : undefined,
            },
            sizeIsPercentage: false,
        };
        return this._createHandleForTexture(name, texture, creationOptions, FrameGraphTextureNamespace.External, false, handle);
    }
    createRenderTargetTexture(name, taskNamespace, creationOptions, multiTargetMode = false, handle) {
        return this._createHandleForTexture(name, null, creationOptions, taskNamespace ? FrameGraphTextureNamespace.Task : FrameGraphTextureNamespace.Graph, multiTargetMode, handle);
    }
    getAbsoluteDimensions(size, screenWidth = this._engine.getRenderWidth(true), screenHeight = this._engine.getRenderHeight(true)) {
        const { width, height } = getDimensionsFromTextureSize(size);
        return {
            width: Math.floor((width * screenWidth) / 100),
            height: Math.floor((height * screenHeight) / 100),
        };
    }
    dispose() {
        this.releaseTextures();
    }
    allocateTextures() {
        this._textures.forEach((entry) => {
            if (!entry.texture) {
                if (entry.refHandle !== undefined) {
                    const refEntry = this._textures.get(entry.refHandle);
                    entry.texture = refEntry.texture;
                    entry.texture?.texture?.incrementReferences();
                    if (refEntry.refHandle === backbufferColorTextureHandle) {
                        entry.refHandle = backbufferColorTextureHandle;
                    }
                    if (refEntry.refHandle === backbufferDepthStencilTextureHandle) {
                        entry.refHandle = backbufferDepthStencilTextureHandle;
                    }
                }
                else if (entry.namespace !== FrameGraphTextureNamespace.External) {
                    if (entry.parentHandle !== undefined) {
                        const creationOptions = entry.creationOptions;
                        const size = creationOptions.sizeIsPercentage ? this.getAbsoluteDimensions(creationOptions.size) : creationOptions.size;
                        const parentEntry = this._textures.get(entry.parentHandle);
                        const parentInternalTexture = parentEntry.texture.textures[entry.parentTextureIndex];
                        const creationOptionsForTexture = {
                            createMipMaps: creationOptions.options.createMipMaps,
                            generateMipMaps: creationOptions.options.generateMipMaps,
                            generateDepthBuffer: creationOptions.options.generateDepthBuffer,
                            generateStencilBuffer: creationOptions.options.generateStencilBuffer,
                            samples: creationOptions.options.samples,
                            type: creationOptions.options.types[0],
                            format: creationOptions.options.formats[0],
                            useSRGBBuffer: creationOptions.options.useSRGBBuffers[0],
                            colorAttachment: parentInternalTexture,
                            label: creationOptions.options.label,
                        };
                        entry.texture = this._engine.createRenderTargetTexture(size, creationOptionsForTexture);
                        parentInternalTexture.incrementReferences();
                    }
                    else {
                        const creationOptions = entry.creationOptions;
                        const size = creationOptions.sizeIsPercentage ? this.getAbsoluteDimensions(creationOptions.size) : creationOptions.size;
                        entry.texture = this._engine.createMultipleRenderTarget(size, creationOptions.options, false);
                    }
                }
            }
            if (entry.texture && entry.refHandle === undefined) {
                entry.debug?.dispose();
                entry.debug = this._createDebugTexture(entry.name, entry.texture);
            }
        });
    }
    createDanglingHandle() {
        return FrameGraphTextureManager._Counter++;
    }
    resolveDanglingHandle(danglingHandle, handle) {
        if (!this._textures.has(handle)) {
            throw new Error(`resolveDanglingHandle: Handle ${handle} does not exist!`);
        }
        const textureEntry = this._textures.get(handle);
        this._textures.set(danglingHandle, {
            texture: textureEntry.texture,
            refHandle: handle,
            name: textureEntry.name,
            creationOptions: {
                size: { ...textureEntry.creationOptions.size },
                options: { ...textureEntry.creationOptions.options, label: textureEntry.name },
                sizeIsPercentage: textureEntry.creationOptions.sizeIsPercentage,
            },
            namespace: textureEntry.namespace,
            parentHandle: textureEntry.parentHandle,
            parentTextureIndex: textureEntry.parentTextureIndex,
        });
    }
    releaseTextures(releaseAll = true) {
        this._textures.forEach((entry, handle) => {
            if (releaseAll || entry.namespace !== FrameGraphTextureNamespace.External) {
                entry.debug?.dispose();
                entry.debug = undefined;
            }
            if (entry.namespace === FrameGraphTextureNamespace.External) {
                return;
            }
            entry.texture?.dispose();
            entry.texture = null;
            if (releaseAll || entry.namespace === FrameGraphTextureNamespace.Task) {
                this._textures.delete(handle);
            }
        });
        if (releaseAll) {
            this._textures.clear();
            this._addSystemTextures();
        }
    }
    _addSystemTextures() {
        const size = { width: this._engine.getRenderWidth(true), height: this._engine.getRenderHeight(true) };
        this._textures.set(backbufferColorTextureHandle, {
            name: "backbuffer color",
            texture: null,
            creationOptions: {
                size,
                options: {},
                sizeIsPercentage: false,
            },
            namespace: FrameGraphTextureNamespace.External,
        });
        this._textures.set(backbufferDepthStencilTextureHandle, {
            name: "backbuffer depth/stencil",
            texture: null,
            creationOptions: {
                size,
                options: {},
                sizeIsPercentage: false,
            },
            namespace: FrameGraphTextureNamespace.External,
        });
    }
    _createDebugTexture(name, texture) {
        if (!this._debugTextures || !this._scene) {
            return;
        }
        const textureDebug = new Texture(null, this._scene);
        textureDebug.name = name;
        textureDebug._texture = texture.texture || texture._depthStencilTexture;
        textureDebug._texture.incrementReferences();
        return textureDebug;
    }
    _freeEntry(handle) {
        const entry = this._textures.get(handle);
        if (entry) {
            entry.debug?.dispose();
            this._textures.delete(handle);
        }
    }
    _createHandleForTexture(name, texture, creationOptions, namespace, multiTargetMode = false, handle, parentHandle, parentTextureIndex) {
        handle = handle ?? FrameGraphTextureManager._Counter++;
        this._textures.set(handle, {
            texture,
            name,
            creationOptions: {
                size: getDimensionsFromTextureSize(creationOptions.size),
                options: { ...creationOptions.options, label: name },
                sizeIsPercentage: creationOptions.sizeIsPercentage,
            },
            namespace,
            parentHandle,
            parentTextureIndex,
        });
        if (namespace === FrameGraphTextureNamespace.External) {
            return handle;
        }
        if (multiTargetMode) {
            const textureCount = creationOptions.options.textureCount ?? 1;
            for (let i = 0; i < textureCount; i++) {
                const label = creationOptions.options.labels?.[i] ?? `${i}`;
                const textureName = `${name} - ${label}`;
                const creationOptionsForTexture = {
                    size: getDimensionsFromTextureSize(creationOptions.size),
                    options: {
                        ...creationOptions.options,
                        formats: [creationOptions.options.formats[i]],
                        types: [creationOptions.options.types[i]],
                        textureCount: 1,
                    },
                    sizeIsPercentage: creationOptions.sizeIsPercentage,
                };
                this._createHandleForTexture(textureName, null, creationOptionsForTexture, namespace, false, handle + i + 1, handle, i);
            }
            FrameGraphTextureManager._Counter += textureCount;
        }
        return handle;
    }
}
FrameGraphTextureManager._Counter = 2; // 0 and 1 are reserved for backbuffer textures
//# sourceMappingURL=frameGraphTextureManager.js.map