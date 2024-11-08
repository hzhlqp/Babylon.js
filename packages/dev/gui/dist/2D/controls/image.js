import { __decorate } from "tslib";
import { Observable } from "core/Misc/observable";
import { Tools } from "core/Misc/tools";
import { Control } from "./control";
import { RegisterClass } from "core/Misc/typeStore";
import { serialize } from "core/Misc/decorators";
import { EngineStore } from "core/Engines/engineStore";
/**
 * Class used to create 2D images
 */
export class Image extends Control {
    /**
     * Gets a boolean indicating that the content is loaded
     */
    get isLoaded() {
        return this._loaded;
    }
    isReady() {
        return this.isLoaded;
    }
    /**
     * Gets or sets a boolean indicating if pointers should only be validated on pixels with alpha > 0.
     * Beware using this as this will consume more memory as the image has to be stored twice
     */
    get detectPointerOnOpaqueOnly() {
        return this._detectPointerOnOpaqueOnly;
    }
    set detectPointerOnOpaqueOnly(value) {
        if (this._detectPointerOnOpaqueOnly === value) {
            return;
        }
        this._detectPointerOnOpaqueOnly = value;
    }
    /**
     * Gets or sets the left value for slicing (9-patch)
     */
    get sliceLeft() {
        return this._sliceLeft;
    }
    set sliceLeft(value) {
        if (this._sliceLeft === value) {
            return;
        }
        this._sliceLeft = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the right value for slicing (9-patch)
     */
    get sliceRight() {
        return this._sliceRight;
    }
    set sliceRight(value) {
        if (this._sliceRight === value) {
            return;
        }
        this._sliceRight = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the top value for slicing (9-patch)
     */
    get sliceTop() {
        return this._sliceTop;
    }
    set sliceTop(value) {
        if (this._sliceTop === value) {
            return;
        }
        this._sliceTop = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the bottom value for slicing (9-patch)
     */
    get sliceBottom() {
        return this._sliceBottom;
    }
    set sliceBottom(value) {
        if (this._sliceBottom === value) {
            return;
        }
        this._sliceBottom = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the left coordinate in the source image
     */
    get sourceLeft() {
        return this._sourceLeft;
    }
    set sourceLeft(value) {
        if (this._sourceLeft === value) {
            return;
        }
        this._sourceLeft = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the top coordinate in the source image
     */
    get sourceTop() {
        return this._sourceTop;
    }
    set sourceTop(value) {
        if (this._sourceTop === value) {
            return;
        }
        this._sourceTop = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the width to capture in the source image
     */
    get sourceWidth() {
        return this._sourceWidth;
    }
    set sourceWidth(value) {
        if (this._sourceWidth === value) {
            return;
        }
        this._sourceWidth = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the height to capture in the source image
     */
    get sourceHeight() {
        return this._sourceHeight;
    }
    set sourceHeight(value) {
        if (this._sourceHeight === value) {
            return;
        }
        this._sourceHeight = value;
        this._markAsDirty();
    }
    /**
     * Gets the image width
     */
    get imageWidth() {
        return this._imageWidth;
    }
    /**
     * Gets the image height
     */
    get imageHeight() {
        return this._imageHeight;
    }
    /**
     * Gets or sets a boolean indicating if nine patch slices (left, top, right, bottom) should be read from image data
     */
    get populateNinePatchSlicesFromImage() {
        return this._populateNinePatchSlicesFromImage;
    }
    set populateNinePatchSlicesFromImage(value) {
        if (this._populateNinePatchSlicesFromImage === value) {
            return;
        }
        this._populateNinePatchSlicesFromImage = value;
        if (this._populateNinePatchSlicesFromImage && this._loaded) {
            this._extractNinePatchSliceDataFromImage();
        }
    }
    /** Indicates if the format of the image is SVG */
    get isSVG() {
        return this._isSVG;
    }
    /** Gets the status of the SVG attributes computation (sourceLeft, sourceTop, sourceWidth, sourceHeight) */
    get svgAttributesComputationCompleted() {
        return this._svgAttributesComputationCompleted;
    }
    /**
     * Gets or sets a boolean indicating if the image can force its container to adapt its size
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#image
     */
    get autoScale() {
        return this._autoScale;
    }
    set autoScale(value) {
        if (this._autoScale === value) {
            return;
        }
        this._autoScale = value;
        if (value && this._loaded) {
            this.synchronizeSizeWithContent();
        }
    }
    /** Gets or sets the stretching mode used by the image */
    get stretch() {
        return this._stretch;
    }
    set stretch(value) {
        if (this._stretch === value) {
            return;
        }
        this._stretch = value;
        this._markAsDirty();
    }
    /**
     * @internal
     */
    _rotate90(n, preserveProperties = false) {
        const width = this._domImage.width;
        const height = this._domImage.height;
        // Should abstract platform instead of using LastCreatedEngine
        const engine = this._host?.getScene()?.getEngine() || EngineStore.LastCreatedEngine;
        if (!engine) {
            throw new Error("Invalid engine. Unable to create a canvas.");
        }
        const canvas = engine.createCanvas(height, width);
        const context = canvas.getContext("2d");
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate((n * Math.PI) / 2);
        context.drawImage(this._domImage, 0, 0, width, height, -width / 2, -height / 2, width, height);
        const dataUrl = canvas.toDataURL("image/jpg");
        const rotatedImage = new Image(this.name + "rotated", dataUrl);
        if (preserveProperties) {
            rotatedImage._stretch = this._stretch;
            rotatedImage._autoScale = this._autoScale;
            rotatedImage._cellId = this._cellId;
            rotatedImage._cellWidth = n % 1 ? this._cellHeight : this._cellWidth;
            rotatedImage._cellHeight = n % 1 ? this._cellWidth : this._cellHeight;
        }
        this._handleRotationForSVGImage(this, rotatedImage, n);
        this._imageDataCache.data = null;
        return rotatedImage;
    }
    _handleRotationForSVGImage(srcImage, dstImage, n) {
        if (!srcImage._isSVG) {
            return;
        }
        if (srcImage._svgAttributesComputationCompleted) {
            this._rotate90SourceProperties(srcImage, dstImage, n);
            this._markAsDirty();
        }
        else {
            srcImage.onSVGAttributesComputedObservable.addOnce(() => {
                this._rotate90SourceProperties(srcImage, dstImage, n);
                this._markAsDirty();
            });
        }
    }
    _rotate90SourceProperties(srcImage, dstImage, n) {
        let srcLeft = srcImage.sourceLeft, srcTop = srcImage.sourceTop, srcWidth = srcImage.domImage.width, srcHeight = srcImage.domImage.height;
        let dstLeft = srcLeft, dstTop = srcTop, dstWidth = srcImage.sourceWidth, dstHeight = srcImage.sourceHeight;
        if (n != 0) {
            const mult = n < 0 ? -1 : 1;
            n = n % 4;
            for (let i = 0; i < Math.abs(n); ++i) {
                dstLeft = -(srcTop - srcHeight / 2) * mult + srcHeight / 2;
                dstTop = (srcLeft - srcWidth / 2) * mult + srcWidth / 2;
                [dstWidth, dstHeight] = [dstHeight, dstWidth];
                if (n < 0) {
                    dstTop -= dstHeight;
                }
                else {
                    dstLeft -= dstWidth;
                }
                srcLeft = dstLeft;
                srcTop = dstTop;
                [srcWidth, srcHeight] = [srcHeight, srcWidth];
            }
        }
        dstImage.sourceLeft = dstLeft;
        dstImage.sourceTop = dstTop;
        dstImage.sourceWidth = dstWidth;
        dstImage.sourceHeight = dstHeight;
    }
    _extractNinePatchSliceDataFromImage() {
        const width = this._domImage.width;
        const height = this._domImage.height;
        if (!this._workingCanvas) {
            const engine = this._host?.getScene()?.getEngine() || EngineStore.LastCreatedEngine;
            if (!engine) {
                throw new Error("Invalid engine. Unable to create a canvas.");
            }
            this._workingCanvas = engine.createCanvas(width, height);
        }
        const canvas = this._workingCanvas;
        const context = canvas.getContext("2d");
        context.drawImage(this._domImage, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, width, height);
        // Left and right
        this._sliceLeft = -1;
        this._sliceRight = -1;
        for (let x = 0; x < width; x++) {
            const alpha = imageData.data[x * 4 + 3];
            if (alpha > 127 && this._sliceLeft === -1) {
                this._sliceLeft = x;
                continue;
            }
            if (alpha < 127 && this._sliceLeft > -1) {
                this._sliceRight = x;
                break;
            }
        }
        // top and bottom
        this._sliceTop = -1;
        this._sliceBottom = -1;
        for (let y = 0; y < height; y++) {
            const alpha = imageData.data[y * width * 4 + 3];
            if (alpha > 127 && this._sliceTop === -1) {
                this._sliceTop = y;
                continue;
            }
            if (alpha < 127 && this._sliceTop > -1) {
                this._sliceBottom = y;
                break;
            }
        }
    }
    /**
     * Gets or sets the internal DOM image used to render the control
     */
    set domImage(value) {
        this._domImage = value;
        this._loaded = false;
        this._imageDataCache.data = null;
        if (this._domImage.width) {
            this._onImageLoaded();
        }
        else {
            this._domImage.onload = () => {
                this._onImageLoaded();
            };
        }
    }
    get domImage() {
        return this._domImage;
    }
    _onImageLoaded() {
        this._imageDataCache.data = null;
        this._imageWidth = this._domImage.width;
        this._imageHeight = this._domImage.height;
        this._loaded = true;
        if (this._populateNinePatchSlicesFromImage) {
            this._extractNinePatchSliceDataFromImage();
        }
        if (this._autoScale) {
            this.synchronizeSizeWithContent();
        }
        this.onImageLoadedObservable.notifyObservers(this);
        this._markAsDirty();
    }
    /**
     * Gets the image source url
     */
    get source() {
        return this._source;
    }
    /**
     * Resets the internal Image Element cache. Can reduce memory usage.
     */
    static ResetImageCache() {
        Image.SourceImgCache.clear();
    }
    _removeCacheUsage(source) {
        const value = source && Image.SourceImgCache.get(source);
        if (value) {
            value.timesUsed -= 1;
            // Remove from DOM
            const htmlElement = value.img;
            if (htmlElement.parentNode) {
                htmlElement.parentNode.removeChild(htmlElement);
            }
            // Since the image isn't being used anymore, we can clean it from the cache
            if (value.timesUsed === 0) {
                Image.SourceImgCache.delete(source);
            }
        }
    }
    /**
     * Gets or sets image source url
     */
    set source(value) {
        if (this._urlRewriter && value) {
            value = this._urlRewriter(value);
        }
        if (this._source === value) {
            return;
        }
        this._removeCacheUsage(this._source);
        this._loaded = false;
        this._source = value;
        this._imageDataCache.data = null;
        if (value) {
            value = this._svgCheck(value);
        }
        // Should abstract platform instead of using LastCreatedEngine
        const engine = this._host?.getScene()?.getEngine() || EngineStore.LastCreatedEngine;
        if (!engine) {
            throw new Error("Invalid engine. Unable to create a canvas.");
        }
        if (value && Image.SourceImgCache.has(value)) {
            const cachedData = Image.SourceImgCache.get(value);
            this._domImage = cachedData.img;
            cachedData.timesUsed += 1;
            if (cachedData.loaded) {
                this._onImageLoaded();
            }
            else {
                cachedData.waitingForLoadCallback.push(this._onImageLoaded.bind(this));
            }
            return;
        }
        this._domImage = engine.createCanvasImage();
        // need to add to enforce rendering
        const imgElement = this._domImage;
        let addedToDom = false;
        if (imgElement.style && this._source?.endsWith(".svg")) {
            imgElement.style.visibility = "hidden";
            imgElement.style.position = "absolute";
            imgElement.style.top = "0";
            engine.getRenderingCanvas()?.parentNode?.appendChild(imgElement);
            addedToDom = true;
        }
        if (value) {
            Image.SourceImgCache.set(value, { img: this._domImage, timesUsed: 1, loaded: false, waitingForLoadCallback: [this._onImageLoaded.bind(this)] });
        }
        this._domImage.onload = () => {
            if (value) {
                const cachedData = Image.SourceImgCache.get(value);
                if (cachedData) {
                    cachedData.loaded = true;
                    for (const waitingCallback of cachedData.waitingForLoadCallback) {
                        waitingCallback();
                    }
                    cachedData.waitingForLoadCallback.length = 0;
                    addedToDom && imgElement.remove();
                    return;
                }
            }
            this._onImageLoaded();
            addedToDom && imgElement.remove();
        };
        if (value) {
            Tools.SetCorsBehavior(value, this._domImage);
            Tools.SetReferrerPolicyBehavior(this.referrerPolicy, this._domImage);
            this._domImage.src = value;
        }
    }
    /**
     * Checks for svg document with icon id present
     * @param value the source svg
     * @returns the svg
     */
    _svgCheck(value) {
        if (window.SVGSVGElement && value.search(/(\.svg|\.svg?[?|#].*)$/gi) !== -1 && value.indexOf("#") === value.lastIndexOf("#")) {
            this._isSVG = true;
            const svgsrc = value.split("#")[0];
            const elemid = value.split("#")[1];
            // check if object alr exist in document
            const svgExist = document.body.querySelector('object[data="' + svgsrc + '"]');
            if (svgExist) {
                const svgDoc = svgExist.contentDocument;
                // get viewbox width and height, get svg document width and height in px
                if (svgDoc && svgDoc.documentElement) {
                    const vb = svgDoc.documentElement.getAttribute("viewBox");
                    const docwidth = Number(svgDoc.documentElement.getAttribute("width"));
                    const docheight = Number(svgDoc.documentElement.getAttribute("height"));
                    const elem = svgDoc.getElementById(elemid);
                    if (elem && vb && docwidth && docheight) {
                        this._getSVGAttribs(svgExist, elemid);
                        return value;
                    }
                }
                // wait for object to load
                svgExist.addEventListener("load", () => {
                    this._getSVGAttribs(svgExist, elemid);
                });
            }
            else {
                // create document object
                const svgImage = document.createElement("object");
                svgImage.data = svgsrc;
                svgImage.type = "image/svg+xml";
                svgImage.width = "0%";
                svgImage.height = "0%";
                document.body.appendChild(svgImage);
                // when the object has loaded, get the element attribs
                svgImage.onload = () => {
                    const svgobj = document.body.querySelector('object[data="' + svgsrc + '"]');
                    if (svgobj) {
                        this._getSVGAttribs(svgobj, elemid);
                    }
                };
            }
            return svgsrc;
        }
        else {
            return value;
        }
    }
    /**
     * Sets sourceLeft, sourceTop, sourceWidth, sourceHeight automatically
     * given external svg file and icon id
     * @param svgsrc
     * @param elemid
     */
    _getSVGAttribs(svgsrc, elemid) {
        const svgDoc = svgsrc.contentDocument;
        // get viewbox width and height, get svg document width and height in px
        if (svgDoc && svgDoc.documentElement) {
            const vb = svgDoc.documentElement.getAttribute("viewBox");
            const docwidth = Number(svgDoc.documentElement.getAttribute("width"));
            const docheight = Number(svgDoc.documentElement.getAttribute("height"));
            // get element bbox and matrix transform
            const elem = svgDoc.getElementById(elemid);
            if (vb && docwidth && docheight && elem) {
                const vb_width = Number(vb.split(" ")[2]);
                const vb_height = Number(vb.split(" ")[3]);
                const elem_bbox = elem.getBBox();
                let elem_matrix_a = 1;
                let elem_matrix_d = 1;
                let elem_matrix_e = 0;
                let elem_matrix_f = 0;
                const mainMatrix = elem.transform.baseVal.consolidate().matrix;
                if (elem.transform && elem.transform.baseVal.consolidate()) {
                    elem_matrix_a = mainMatrix.a;
                    elem_matrix_d = mainMatrix.d;
                    elem_matrix_e = mainMatrix.e;
                    elem_matrix_f = mainMatrix.f;
                }
                // compute source coordinates and dimensions
                this.sourceLeft = ((elem_matrix_a * elem_bbox.x + elem_matrix_e) * docwidth) / vb_width;
                this.sourceTop = ((elem_matrix_d * elem_bbox.y + elem_matrix_f) * docheight) / vb_height;
                this.sourceWidth = elem_bbox.width * elem_matrix_a * (docwidth / vb_width);
                this.sourceHeight = elem_bbox.height * elem_matrix_d * (docheight / vb_height);
                this._svgAttributesComputationCompleted = true;
                this.onSVGAttributesComputedObservable.notifyObservers(this);
            }
        }
    }
    /**
     * Gets or sets the cell width to use when animation sheet is enabled
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#image
     */
    get cellWidth() {
        return this._cellWidth;
    }
    set cellWidth(value) {
        if (this._cellWidth === value) {
            return;
        }
        this._cellWidth = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the cell height to use when animation sheet is enabled
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#image
     */
    get cellHeight() {
        return this._cellHeight;
    }
    set cellHeight(value) {
        if (this._cellHeight === value) {
            return;
        }
        this._cellHeight = value;
        this._markAsDirty();
    }
    /**
     * Gets or sets the cell id to use (this will turn on the animation sheet mode)
     * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/gui#image
     */
    get cellId() {
        return this._cellId;
    }
    set cellId(value) {
        if (this._cellId === value) {
            return;
        }
        this._cellId = value;
        this._markAsDirty();
    }
    /**
     * Creates a new Image
     * @param name defines the control name
     * @param url defines the image url
     */
    constructor(name, url = null) {
        super(name);
        this.name = name;
        this._workingCanvas = null;
        this._loaded = false;
        this._stretch = Image.STRETCH_FILL;
        this._source = null;
        this._autoScale = false;
        this._sourceLeft = 0;
        this._sourceTop = 0;
        this._sourceWidth = 0;
        this._sourceHeight = 0;
        this._svgAttributesComputationCompleted = false;
        this._isSVG = false;
        this._cellWidth = 0;
        this._cellHeight = 0;
        this._cellId = -1;
        this._populateNinePatchSlicesFromImage = false;
        this._imageDataCache = { data: null, key: "" };
        /**
         * Observable notified when the content is loaded
         */
        this.onImageLoadedObservable = new Observable();
        /**
         * Observable notified when _sourceLeft, _sourceTop, _sourceWidth and _sourceHeight are computed
         */
        this.onSVGAttributesComputedObservable = new Observable();
        this.source = url;
    }
    /**
     * Tests if a given coordinates belong to the current control
     * @param x defines x coordinate to test
     * @param y defines y coordinate to test
     * @returns true if the coordinates are inside the control
     */
    contains(x, y) {
        if (!super.contains(x, y)) {
            return false;
        }
        if (!this._detectPointerOnOpaqueOnly || !this._workingCanvas) {
            return true;
        }
        const width = this._currentMeasure.width | 0;
        const height = this._currentMeasure.height | 0;
        const key = width + "_" + height;
        let imageData = this._imageDataCache.data;
        if (!imageData || this._imageDataCache.key !== key) {
            const canvas = this._workingCanvas;
            const context = canvas.getContext("2d");
            this._imageDataCache.data = imageData = context.getImageData(0, 0, width, height).data;
            this._imageDataCache.key = key;
        }
        x = (x - this._currentMeasure.left) | 0;
        y = (y - this._currentMeasure.top) | 0;
        const pickedPixel = imageData[(x + y * width) * 4 + 3];
        return pickedPixel > 0;
    }
    _getTypeName() {
        return "Image";
    }
    /** Force the control to synchronize with its content */
    synchronizeSizeWithContent() {
        if (!this._loaded) {
            return;
        }
        this.width = this._domImage.width + "px";
        this.height = this._domImage.height + "px";
    }
    _processMeasures(parentMeasure, context) {
        if (this._loaded) {
            switch (this._stretch) {
                case Image.STRETCH_NONE:
                    break;
                case Image.STRETCH_FILL:
                    break;
                case Image.STRETCH_UNIFORM:
                    break;
                case Image.STRETCH_NINE_PATCH:
                    break;
                case Image.STRETCH_EXTEND:
                    if (this._autoScale) {
                        this.synchronizeSizeWithContent();
                    }
                    if (this.parent && this.parent.parent) {
                        // Will update root size if root is not the top root
                        this.parent.adaptWidthToChildren = true;
                        this.parent.adaptHeightToChildren = true;
                    }
                    break;
            }
        }
        super._processMeasures(parentMeasure, context);
    }
    _prepareWorkingCanvasForOpaqueDetection() {
        if (!this._detectPointerOnOpaqueOnly) {
            return;
        }
        const width = this._currentMeasure.width;
        const height = this._currentMeasure.height;
        if (!this._workingCanvas) {
            const engine = this._host?.getScene()?.getEngine() || EngineStore.LastCreatedEngine;
            if (!engine) {
                throw new Error("Invalid engine. Unable to create a canvas.");
            }
            this._workingCanvas = engine.createCanvas(width, height);
        }
        const canvas = this._workingCanvas;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, width, height);
    }
    _drawImage(context, sx, sy, sw, sh, tx, ty, tw, th) {
        context.drawImage(this._domImage, sx, sy, sw, sh, tx, ty, tw, th);
        if (!this._detectPointerOnOpaqueOnly) {
            return;
        }
        const transform = context.getTransform();
        const canvas = this._workingCanvas;
        const workingCanvasContext = canvas.getContext("2d");
        workingCanvasContext.save();
        const ttx = tx - this._currentMeasure.left;
        const tty = ty - this._currentMeasure.top;
        workingCanvasContext.setTransform(transform.a, transform.b, transform.c, transform.d, (ttx + tw) / 2, (tty + th) / 2);
        workingCanvasContext.translate(-(ttx + tw) / 2, -(tty + th) / 2);
        workingCanvasContext.drawImage(this._domImage, sx, sy, sw, sh, ttx, tty, tw, th);
        workingCanvasContext.restore();
    }
    _draw(context) {
        context.save();
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
        }
        let x, y, width, height;
        if (this.cellId == -1) {
            x = this._sourceLeft;
            y = this._sourceTop;
            width = this._sourceWidth ? this._sourceWidth : this._imageWidth;
            height = this._sourceHeight ? this._sourceHeight : this._imageHeight;
        }
        else {
            const rowCount = this._domImage.naturalWidth / this.cellWidth;
            const column = (this.cellId / rowCount) >> 0;
            const row = this.cellId % rowCount;
            x = this.cellWidth * row;
            y = this.cellHeight * column;
            width = this.cellWidth;
            height = this.cellHeight;
        }
        this._prepareWorkingCanvasForOpaqueDetection();
        this._applyStates(context);
        if (this._loaded) {
            switch (this._stretch) {
                case Image.STRETCH_NONE:
                    this._drawImage(context, x, y, width, height, this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
                    break;
                case Image.STRETCH_FILL:
                    this._drawImage(context, x, y, width, height, this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
                    break;
                case Image.STRETCH_UNIFORM: {
                    const hRatio = this._currentMeasure.width / width;
                    const vRatio = this._currentMeasure.height / height;
                    const ratio = Math.min(hRatio, vRatio);
                    const centerX = (this._currentMeasure.width - width * ratio) / 2;
                    const centerY = (this._currentMeasure.height - height * ratio) / 2;
                    this._drawImage(context, x, y, width, height, this._currentMeasure.left + centerX, this._currentMeasure.top + centerY, width * ratio, height * ratio);
                    break;
                }
                case Image.STRETCH_EXTEND:
                    this._drawImage(context, x, y, width, height, this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
                    break;
                case Image.STRETCH_NINE_PATCH:
                    this._renderNinePatch(context, x, y, width, height);
                    break;
            }
        }
        context.restore();
    }
    _renderNinePatch(context, sx, sy, sw, sh) {
        const idealRatio = this.host.idealWidth
            ? this._width.getValue(this.host) / this.host.idealWidth
            : this.host.idealHeight
                ? this._height.getValue(this.host) / this.host.idealHeight
                : 1;
        const leftWidth = this._sliceLeft;
        const topHeight = this._sliceTop;
        const bottomHeight = sh - this._sliceBottom;
        const rightWidth = sw - this._sliceRight;
        const centerWidth = this._sliceRight - this._sliceLeft;
        const centerHeight = this._sliceBottom - this._sliceTop;
        const leftWidthAdjusted = Math.round(leftWidth * idealRatio);
        const topHeightAdjusted = Math.round(topHeight * idealRatio);
        const bottomHeightAdjusted = Math.round(bottomHeight * idealRatio);
        const rightWidthAdjusted = Math.round(rightWidth * idealRatio);
        const targetCenterWidth = Math.round(this._currentMeasure.width) - rightWidthAdjusted - leftWidthAdjusted + 2;
        const targetCenterHeight = Math.round(this._currentMeasure.height) - bottomHeightAdjusted - topHeightAdjusted + 2;
        const centerLeftOffset = Math.round(this._currentMeasure.left) + leftWidthAdjusted - 1;
        const centerTopOffset = Math.round(this._currentMeasure.top) + topHeightAdjusted - 1;
        const rightOffset = Math.round(this._currentMeasure.left + this._currentMeasure.width) - rightWidthAdjusted;
        const bottomOffset = Math.round(this._currentMeasure.top + this._currentMeasure.height) - bottomHeightAdjusted;
        //Top Left
        this._drawImage(context, sx, sy, leftWidth, topHeight, this._currentMeasure.left, this._currentMeasure.top, leftWidthAdjusted, topHeightAdjusted);
        //Top
        this._drawImage(context, sx + this._sliceLeft, sy, centerWidth, topHeight, centerLeftOffset + 1, this._currentMeasure.top, targetCenterWidth - 2, topHeightAdjusted);
        //Top Right
        this._drawImage(context, sx + this._sliceRight, sy, rightWidth, topHeight, rightOffset, this._currentMeasure.top, rightWidthAdjusted, topHeightAdjusted);
        //Left
        this._drawImage(context, sx, sy + this._sliceTop, leftWidth, centerHeight, this._currentMeasure.left, centerTopOffset + 1, leftWidthAdjusted, targetCenterHeight - 2);
        // Center
        this._drawImage(context, sx + this._sliceLeft, sy + this._sliceTop, centerWidth, centerHeight, centerLeftOffset + 1, centerTopOffset + 1, targetCenterWidth - 2, targetCenterHeight - 2);
        //Right
        this._drawImage(context, sx + this._sliceRight, sy + this._sliceTop, rightWidth, centerHeight, rightOffset, centerTopOffset + 1, rightWidthAdjusted, targetCenterHeight - 2);
        //Bottom Left
        this._drawImage(context, sx, sy + this._sliceBottom, leftWidth, bottomHeight, this._currentMeasure.left, bottomOffset, leftWidthAdjusted, bottomHeightAdjusted);
        //Bottom
        this._drawImage(context, sx + this.sliceLeft, sy + this._sliceBottom, centerWidth, bottomHeight, centerLeftOffset + 1, bottomOffset, targetCenterWidth - 2, bottomHeightAdjusted);
        //Bottom Right
        this._drawImage(context, sx + this._sliceRight, sy + this._sliceBottom, rightWidth, bottomHeight, rightOffset, bottomOffset, rightWidthAdjusted, bottomHeightAdjusted);
    }
    dispose() {
        super.dispose();
        this.onImageLoadedObservable.clear();
        this.onSVGAttributesComputedObservable.clear();
        this._removeCacheUsage(this._source);
    }
}
/**
 * Cache of images to avoid loading the same image multiple times
 */
Image.SourceImgCache = new Map();
// Static
/** STRETCH_NONE */
Image.STRETCH_NONE = 0;
/** STRETCH_FILL */
Image.STRETCH_FILL = 1;
/** STRETCH_UNIFORM */
Image.STRETCH_UNIFORM = 2;
/** STRETCH_EXTEND */
Image.STRETCH_EXTEND = 3;
/** NINE_PATCH */
Image.STRETCH_NINE_PATCH = 4;
__decorate([
    serialize()
], Image.prototype, "detectPointerOnOpaqueOnly", null);
__decorate([
    serialize()
], Image.prototype, "sliceLeft", null);
__decorate([
    serialize()
], Image.prototype, "sliceRight", null);
__decorate([
    serialize()
], Image.prototype, "sliceTop", null);
__decorate([
    serialize()
], Image.prototype, "sliceBottom", null);
__decorate([
    serialize()
], Image.prototype, "sourceLeft", null);
__decorate([
    serialize()
], Image.prototype, "sourceTop", null);
__decorate([
    serialize()
], Image.prototype, "sourceWidth", null);
__decorate([
    serialize()
], Image.prototype, "sourceHeight", null);
__decorate([
    serialize()
], Image.prototype, "populateNinePatchSlicesFromImage", null);
__decorate([
    serialize()
], Image.prototype, "autoScale", null);
__decorate([
    serialize()
], Image.prototype, "stretch", null);
__decorate([
    serialize()
], Image.prototype, "source", null);
__decorate([
    serialize()
], Image.prototype, "cellWidth", null);
__decorate([
    serialize()
], Image.prototype, "cellHeight", null);
__decorate([
    serialize()
], Image.prototype, "cellId", null);
RegisterClass("BABYLON.GUI.Image", Image);
//# sourceMappingURL=image.js.map