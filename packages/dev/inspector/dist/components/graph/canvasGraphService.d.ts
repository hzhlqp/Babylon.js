import type { ICanvasGraphServiceSettings, IPerfLayoutSize } from "./graphSupportingTypes";
import type { IPerfDatasets, IPerfMetadata } from "core/Misc/interfaces/iPerfViewer";
export declare class CanvasGraphService {
    private _ctx;
    private _width;
    private _height;
    private _sizeOfWindow;
    private _ticks;
    private _panPosition;
    private _position;
    private _datasetBounds;
    private _globalTimeMinMax;
    private _hoverPosition;
    private _drawableArea;
    private _axisHeight;
    private _tooltipItems;
    private _tooltipTextCache;
    private _tickerTextCache;
    private _tickerItems;
    private _preprocessedTooltipInfo;
    private _numberOfTickers;
    private _onVisibleRangeChangedObservable?;
    private readonly _addonFontLineHeight;
    private readonly _defaultLineHeight;
    readonly datasets: IPerfDatasets;
    metadata: Map<string, IPerfMetadata>;
    /**
     * Creates an instance of CanvasGraphService.
     *
     * @param canvas a pointer to the canvas dom element we would like to write to.
     * @param settings settings for our service.
     */
    constructor(canvas: HTMLCanvasElement, settings: ICanvasGraphServiceSettings);
    /**
     * This method lets the service know it should get ready to update what it is displaying.
     */
    update: (...args: any[]) => void;
    /**
     * Update the canvas graph service with the new height and width of the canvas.
     * @param size The new size of the canvas.
     */
    resize(size: IPerfLayoutSize): void;
    /**
     * Force resets the position in the data, effectively returning to the most current data.
     */
    resetDataPosition(): void;
    private _prevPointById;
    private _prevValueById;
    /**
     * This method draws the data and sets up the appropriate scales.
     */
    private _draw;
    private _drawTickers;
    /**
     * Returns the index of the closest time for the datasets.
     * Uses a modified binary search to get value.
     *
     * @param targetTime the time we want to get close to.
     * @returns index of the item with the closest time to the targetTime
     */
    private _getClosestPointToTimestamp;
    /**
     * This is a convenience method to get the number of collected slices.
     * @returns the total number of collected slices.
     */
    private _getNumberOfSlices;
    /**
     * Draws the time axis, adjusts the drawable area for the graph.
     *
     * @param timeMinMax the minimum and maximum for the time axis.
     * @param drawableArea the current allocated drawable area.
     */
    private _drawTimeAxis;
    /**
     * Given a timestamp (should be the maximum timestamp in view), this function returns the maximum unit the timestamp contains.
     * This information can be used for formatting purposes.
     * @param timestamp the maximum timestamp to find the maximum timestamp unit for.
     * @returns The maximum unit the timestamp has.
     */
    private _getTimestampUnit;
    /**
     * Given a timestamp and the interval unit, this function will parse the timestamp to the appropriate format.
     * @param timestamp The timestamp to parse
     * @param intervalUnit The maximum unit of the maximum timestamp in an interval.
     * @returns a string representing the parsed timestamp.
     */
    private _parseTimestamp;
    /**
     * Generates a list of ticks given the min and max of the axis, and the space available in the axis.
     *
     * @param minMax the minimum and maximum values of the axis
     * @param spaceAvailable the total amount of space we have allocated to our axis
     */
    private _generateTicks;
    /**
     * Nice number algorithm based on psueudo code defined in "Graphics Gems" by Andrew S. Glassner.
     * This will find a "nice" number approximately equal to num.
     *
     * @param num The number we want to get close to.
     * @param shouldRound if true we will round the number, otherwise we will get the ceiling.
     * @returns a "nice" number approximately equal to num.
     */
    private _niceNumber;
    /**
     * Gets the min and max as a single object from an array of numbers.
     * @param bounds
     * @param offset
     * @returns the min and max of the array.
     */
    private _getMinMax;
    /**
     * Converts a single number to a pixel coordinate in a single axis by normalizing the data to a [0, 1] scale using the minimum and maximum values.
     *
     * @param num the number we want to get the pixel coordinate for
     * @param minMax the min and max of the dataset in the axis we want the pixel coordinate for.
     * @param startingPixel the starting pixel coordinate (this means it takes account for any offset).
     * @param spaceAvailable the total space available in this axis.
     * @param shouldFlipValue if we should use a [1, 0] scale instead of a [0, 1] scale.
     * @returns the pixel coordinate of the value in a single axis.
     */
    private _getPixelForNumber;
    /**
     * Add in any necessary event listeners.
     *
     * @param canvas The canvas we want to attach listeners to.
     */
    private _attachEventListeners;
    /**
     * We remove all event listeners we added.
     *
     * @param canvas The canvas we want to remove listeners from.
     */
    private _removeEventListeners;
    /**
     * Handles what to do when we are hovering over the canvas and not panning.
     *
     * @param event A reference to the event to be handled.
     */
    private _handleDataHover;
    /**
     * Debounced processing and drawing of tooltip.
     */
    private _debouncedTooltip;
    /**
     * Handles what to do when we stop hovering over the canvas.
     */
    private _handleStopHover;
    /**
     * Given a line defined by P1: (x1, y1) and P2: (x2, y2) get the distance of P0 (x0, y0) from the line.
     * https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points
     * @param x1 x position of point P1
     * @param y1 y position of point P1
     * @param x2 x position of point P2
     * @param y2 y position of point P2
     * @param x0 x position of point P0
     * @param y0 y position of point P0
     * @returns distance of P0 from the line defined by P1 and P2
     */
    private _getDistanceFromLine;
    /**
     * This method does preprocessing calculations for the tooltip.
     * @param pos the position of our mouse.
     * @param drawableArea the remaining drawable area.
     */
    private _preprocessTooltip;
    /**
     * Draws the tooltip given the area it is allowed to draw in and the current pixel position.
     *
     * @param pos the position of the mouse cursor in pixels (x, y).
     * @param drawableArea  the available area we can draw in.
     */
    private _drawTooltip;
    /**
     * Gets the number from a pixel position given the minimum and maximum value in range, and the starting pixel and the ending pixel.
     *
     * @param pixel current pixel position we want to get the number for.
     * @param minMax the minimum and maximum number in the range.
     * @param startingPixel position of the starting pixel in range.
     * @param endingPixel position of ending pixel in range.
     * @param shouldFlip if we should use a [1, 0] scale instead of a [0, 1] scale.
     * @returns number corresponding to pixel position
     */
    private _getNumberFromPixel;
    /**
     * The handler for when we want to zoom in and out of the graph.
     *
     * @param event a mouse wheel event.
     */
    private _handleZoom;
    /**
     * Initializes the panning object and attaches appropriate listener.
     *
     * @param event the mouse event containing positional information.
     */
    private _handlePanStart;
    /**
     * While panning this event will keep track of the delta and update the "positions".
     *
     * @param event The mouse event that contains positional information.
     */
    private _handlePan;
    /**
     * Clears the panning object and removes the appropriate listener.
     */
    private _handlePanStop;
    /**
     * Method which returns true if the data should become realtime, false otherwise.
     *
     * @returns if the data should become realtime or not.
     */
    private _shouldBecomeRealtime;
    /**
     * Will generate a playhead with a futurebox that takes up (1-scalefactor)*100% of the canvas.
     *
     * @param drawableArea The remaining drawable area.
     * @param scaleFactor The Percentage between 0.0 and 1.0 of the canvas the data gets drawn on.
     */
    private _drawPlayheadRegion;
    /**
     *  Method to do cleanup when the object is done being used.
     *
     */
    destroy(): void;
    /**
     * This method clears the canvas
     */
    clear(): void;
}
