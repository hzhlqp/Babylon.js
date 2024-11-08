import { Scene } from "core/scene";
import { Vector2 } from "core/Maths/math.vector";
import type { Nullable } from "core/types";
import type { BaseTexture } from "core/Materials/Textures/baseTexture";
import type { ISize } from "core/Maths/math.size";
import type { PointerInfo } from "core/Events/pointerEvents";
import type { ITool } from "./toolBar";
import type { IChannel } from "./channelsBar";
import type { IMetadata } from "./textureEditorComponent";
export interface IPixelData {
    x?: number;
    y?: number;
    r?: number;
    g?: number;
    b?: number;
    a?: number;
}
export declare class TextureCanvasManager {
    private _engine;
    private _scene;
    private _camera;
    private _cameraPos;
    private _scale;
    private _isPanning;
    private _mouseX;
    private _mouseY;
    private _uiCanvas;
    private _size;
    /** The canvas we paint onto using the canvas API */
    private _2DCanvas;
    /** The canvas we apply post processes to */
    private _3DCanvas;
    /** The canvas which handles channel filtering */
    private _channelsTexture;
    private _3DEngine;
    private _3DPlane;
    private _3DCanvasTexture;
    private _3DScene;
    private _channels;
    private _face;
    private _mipLevel;
    /** The texture from the original engine that we invoked the editor on */
    private _originalTexture;
    /** This is a hidden texture which is only responsible for holding the actual texture memory in the original engine */
    private _target;
    private _originalTextureProperties;
    /** Keeps track of whether we have modified the texture */
    private _didEdit;
    private _plane;
    private _planeMaterial;
    /** Tracks which keys are currently pressed */
    private _keyMap;
    /** Tracks which mouse buttons are currently pressed */
    private _buttonsPressed;
    private readonly ZOOM_MOUSE_SPEED;
    private readonly ZOOM_KEYBOARD_SPEED;
    private readonly ZOOM_IN_KEY;
    private readonly ZOOM_OUT_KEY;
    private readonly PAN_SPEED;
    private readonly PAN_KEY;
    private readonly MIN_SCALE;
    private readonly GRID_SCALE;
    private readonly MAX_SCALE;
    private readonly SELECT_ALL_KEY;
    private readonly SAVE_KEY;
    private readonly RESET_KEY;
    private readonly DESELECT_KEY;
    /** The number of milliseconds between texture updates */
    private readonly PUSH_FREQUENCY;
    private _tool;
    private _setPixelData;
    private _setMipLevel;
    private _window;
    private _metadata;
    private _editing3D;
    private _onUpdate;
    private _setMetadata;
    private _imageData;
    private _canPush;
    private _shouldPush;
    private _paintCanvas;
    constructor(texture: BaseTexture, window: Window, canvasUI: HTMLCanvasElement, canvas2D: HTMLCanvasElement, canvas3D: HTMLCanvasElement, setPixelData: (pixelData: IPixelData) => void, metadata: IMetadata, onUpdate: () => void, setMetadata: (metadata: any) => void, setMipLevel: (level: number) => void);
    updateTexture(): Promise<void>;
    private pushTexture;
    startPainting(): Promise<CanvasRenderingContext2D>;
    updatePainting(): void;
    stopPainting(): void;
    private updateDisplay;
    set channels(channels: IChannel[]);
    paintPixelsOnCanvas(pixelData: Uint8Array, canvas: HTMLCanvasElement): void;
    grabOriginalTexture(): Promise<Uint8Array>;
    getMouseCoordinates(pointerInfo: PointerInfo): Vector2;
    get scene(): Scene;
    get canvas2D(): HTMLCanvasElement;
    get size(): ISize;
    set tool(tool: Nullable<ITool>);
    get tool(): Nullable<ITool>;
    set face(face: number);
    set mipLevel(mipLevel: number);
    /** Returns the 3D scene used for postprocesses */
    get scene3D(): Scene;
    set metadata(metadata: IMetadata);
    private makePlane;
    reset(): void;
    resize(newSize: ISize): Promise<void>;
    setSize(size: ISize): void;
    upload(file: File): void;
    saveTexture(): void;
    toolInteractionEnabled(): boolean;
    dispose(): void;
}
