import type { Scene, AbstractEngine, RenderTargetWrapper, TextureSize, Nullable, FrameGraphTextureCreationOptions, FrameGraphTextureHandle } from "core/index";
import { Texture } from "../Materials/Textures/texture";
type TextureEntry = {
    texture: Nullable<RenderTargetWrapper>;
    name: string;
    creationOptions: FrameGraphTextureCreationOptions;
    namespace: FrameGraphTextureNamespace;
    debug?: Texture;
    parentHandle?: FrameGraphTextureHandle;
    parentTextureIndex?: number;
    refHandle?: FrameGraphTextureHandle;
};
declare enum FrameGraphTextureNamespace {
    Task = 0,
    Graph = 1,
    External = 2
}
/**
 * @experimental
 * @internal
 */
export declare class FrameGraphTextureManager {
    private _engine;
    private _debugTextures;
    private _scene?;
    private static _Counter;
    _textures: Map<FrameGraphTextureHandle, TextureEntry>;
    constructor(_engine: AbstractEngine, _debugTextures?: boolean, _scene?: Scene | undefined);
    isBackbuffer(handle: FrameGraphTextureHandle): boolean;
    isBackbufferColor(handle: FrameGraphTextureHandle): boolean;
    isBackbufferDepthStencil(handle: FrameGraphTextureHandle): boolean;
    getTextureCreationOptions(handle: FrameGraphTextureHandle): FrameGraphTextureCreationOptions;
    getTextureFromHandle(handle: FrameGraphTextureHandle): Nullable<RenderTargetWrapper>;
    importTexture(name: string, texture: RenderTargetWrapper, handle?: FrameGraphTextureHandle): FrameGraphTextureHandle;
    createRenderTargetTexture(name: string, taskNamespace: boolean, creationOptions: FrameGraphTextureCreationOptions, multiTargetMode?: boolean, handle?: FrameGraphTextureHandle): FrameGraphTextureHandle;
    getAbsoluteDimensions(size: TextureSize, screenWidth?: number, screenHeight?: number): {
        width: number;
        height: number;
    };
    dispose(): void;
    allocateTextures(): void;
    createDanglingHandle(): number;
    resolveDanglingHandle(danglingHandle: FrameGraphTextureHandle, handle: FrameGraphTextureHandle): void;
    releaseTextures(releaseAll?: boolean): void;
    private _addSystemTextures;
    private _createDebugTexture;
    private _freeEntry;
    private _createHandleForTexture;
}
export {};
