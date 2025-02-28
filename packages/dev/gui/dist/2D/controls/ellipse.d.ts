import { Container } from "./container";
import type { Measure } from "../measure";
import type { ICanvasRenderingContext } from "core/Engines/ICanvas";
/** Class used to create 2D ellipse containers */
export declare class Ellipse extends Container {
    name?: string | undefined;
    private _thickness;
    /** Gets or sets border thickness */
    get thickness(): number;
    set thickness(value: number);
    private _arc;
    /** Gets or sets arcing of the ellipse (ratio of the circumference between 0 and 1) */
    get arc(): number;
    set arc(value: number);
    /**
     * Creates a new Ellipse
     * @param name defines the control name
     */
    constructor(name?: string | undefined);
    protected _getTypeName(): string;
    protected _localDraw(context: ICanvasRenderingContext): void;
    protected _additionalProcessing(parentMeasure: Measure, context: ICanvasRenderingContext): void;
    protected _clipForChildren(context: ICanvasRenderingContext): void;
    _renderHighlightSpecific(context: ICanvasRenderingContext): void;
}
