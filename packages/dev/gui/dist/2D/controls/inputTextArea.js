import { __decorate } from "tslib";
import { Observable } from "core/Misc/observable";
import { Control } from "./control";
import { ValueAndUnit } from "../valueAndUnit";
import { RegisterClass } from "core/Misc/typeStore";
import { InputText } from "./inputText";
import { serialize } from "core/Misc/decorators";
/**
 * Class used to create input text control
 */
export class InputTextArea extends InputText {
    /** Gets or sets a boolean indicating if the control can auto stretch its height to adapt to the text */
    get autoStretchHeight() {
        return this._autoStretchHeight;
    }
    set autoStretchHeight(value) {
        if (this._autoStretchHeight === value) {
            return;
        }
        this._autoStretchHeight = value;
        this._markAsDirty();
    }
    set height(value) {
        this.fixedRatioMasterIsWidth = false;
        if (this._height.toString(this._host) === value) {
            return;
        }
        if (this._height.fromString(value)) {
            this._markAsDirty();
        }
        this._autoStretchHeight = false;
    }
    get maxHeight() {
        return this._maxHeight.toString(this._host);
    }
    /** Gets the maximum width allowed by the control in pixels */
    get maxHeightInPixels() {
        return this._maxHeight.getValueInPixel(this._host, this._cachedParentMeasure.height);
    }
    set maxHeight(value) {
        if (this._maxHeight.toString(this._host) === value) {
            return;
        }
        if (this._maxHeight.fromString(value)) {
            this._markAsDirty();
        }
    }
    /**
     * Creates a new InputTextArea
     * @param name defines the control name
     * @param text defines the text of the control
     */
    constructor(name, text = "") {
        super(name);
        this.name = name;
        this._textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this._textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this._prevText = this.text;
        this._lineSpacing = new ValueAndUnit(0);
        this._maxHeight = new ValueAndUnit(1, ValueAndUnit.UNITMODE_PERCENTAGE, false);
        /**
         * An event triggered after the text was broken up into lines
         */
        this.onLinesReadyObservable = new Observable();
        this.text = text;
        this.isPointerBlocker = true;
        this.onLinesReadyObservable.add(() => this._updateCursorPosition());
        this._highlightCursorInfo = {
            initialStartIndex: -1,
            initialRelativeStartIndex: -1,
            initialLineIndex: -1,
        };
        this._cursorInfo = {
            globalStartIndex: 0,
            globalEndIndex: 0,
            relativeEndIndex: 0,
            relativeStartIndex: 0,
            currentLineIndex: 0,
        };
    }
    _getTypeName() {
        return "InputTextArea";
    }
    /**
     * Handles the keyboard event
     * @param evt Defines the KeyboardEvent
     */
    processKeyboard(evt) {
        if (this.isReadOnly) {
            return;
        }
        // process pressed key
        this.alternativeProcessKey(evt.code, evt.key, evt);
        this.onKeyboardEventProcessedObservable.notifyObservers(evt);
    }
    /**
     * Process the last keyboard input
     *
     * @param code The ascii input number
     * @param key The key string representation
     * @param evt The keyboard event emits with input
     * @internal
     */
    alternativeProcessKey(code, key, evt) {
        //return if clipboard event keys (i.e -ctr/cmd + c,v,x)
        if (evt && (evt.ctrlKey || evt.metaKey) && (key === "c" || key === "v" || key === "x")) {
            return;
        }
        // Specific cases
        switch (code) {
            case "Period": //SLASH
                if (evt && evt.shiftKey) {
                    evt.preventDefault();
                }
                break;
            case "Backspace": // BACKSPACE
                if (!this._isTextHighlightOn && this._cursorInfo.globalStartIndex > 0) {
                    this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
                    this._cursorInfo.globalStartIndex--;
                }
                this._prevText = this._textWrapper.text;
                this._textWrapper.removePart(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex);
                this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
                if (evt) {
                    evt.preventDefault();
                }
                this._blinkIsEven = false;
                this._isTextHighlightOn = false;
                this._textHasChanged();
                break;
            case "Delete": // DELETE
                if (!this._isTextHighlightOn && this._cursorInfo.globalEndIndex < this.text.length) {
                    this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex + 1;
                }
                this._prevText = this._textWrapper.text;
                this._textWrapper.removePart(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex);
                this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
                if (evt) {
                    evt.preventDefault();
                }
                this._blinkIsEven = false;
                this._isTextHighlightOn = false;
                this._textHasChanged();
                break;
            case "NumpadEnter": // NUMPAD ENTER
            case "Enter": // RETURN
                this._prevText = this._textWrapper.text;
                this._textWrapper.removePart(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex, "\n");
                this._cursorInfo.globalStartIndex++;
                this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
                this._blinkIsEven = false;
                this._isTextHighlightOn = false;
                this._textHasChanged();
                return;
            case "End": // END
                this._cursorInfo.globalStartIndex = this.text.length;
                this._blinkIsEven = false;
                this._isTextHighlightOn = false;
                this._markAsDirty();
                return;
            case "Home": // HOME
                this._cursorInfo.globalStartIndex = 0;
                this._blinkIsEven = false;
                this._isTextHighlightOn = false;
                this._markAsDirty();
                return;
            case "ArrowLeft": // LEFT
                this._markAsDirty();
                if (evt && evt.shiftKey) {
                    // shift + ctrl/cmd + <-
                    if (evt.ctrlKey || evt.metaKey) {
                        // Go to line's start by substract the relativeStartIndex to the globalStartIndex
                        this._cursorInfo.globalStartIndex -= this._cursorInfo.relativeStartIndex;
                        this._cursorInfo.globalEndIndex = this._highlightCursorInfo.initialStartIndex;
                    }
                    // store the starting point
                    if (!this._isTextHighlightOn) {
                        this._highlightCursorInfo.initialLineIndex = this._cursorInfo.currentLineIndex;
                        this._highlightCursorInfo.initialStartIndex = this._cursorInfo.globalStartIndex;
                        this._highlightCursorInfo.initialRelativeStartIndex = this._cursorInfo.relativeStartIndex;
                        this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
                        this._cursorInfo.globalStartIndex--;
                        this._isTextHighlightOn = true;
                    }
                    else {
                        if (this._cursorInfo.globalEndIndex > this._highlightCursorInfo.initialStartIndex) {
                            this._cursorInfo.globalEndIndex--;
                        }
                        else {
                            this._cursorInfo.globalStartIndex--;
                        }
                    }
                    this._blinkIsEven = true;
                    evt.preventDefault();
                    return;
                }
                if (this._isTextHighlightOn) {
                    this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
                }
                else if (evt && (evt.ctrlKey || evt.metaKey)) {
                    // ctr + <-
                    this._cursorInfo.globalStartIndex -= this._cursorInfo.relativeStartIndex;
                    evt.preventDefault();
                }
                else if (this._cursorInfo.globalStartIndex > 0) {
                    this._cursorInfo.globalStartIndex--;
                }
                // update the cursor
                this._blinkIsEven = false;
                this._isTextHighlightOn = false;
                return;
            case "ArrowRight": // RIGHT
                this._markAsDirty();
                if (evt && evt.shiftKey) {
                    // shift + ctrl/cmd + ->
                    if (evt.ctrlKey || evt.metaKey) {
                        const rightDelta = this._lines[this._cursorInfo.currentLineIndex].text.length - this._cursorInfo.relativeEndIndex - 1;
                        this._cursorInfo.globalEndIndex += rightDelta;
                        this._cursorInfo.globalStartIndex = this._highlightCursorInfo.initialStartIndex;
                    }
                    // store the starting point
                    if (!this._isTextHighlightOn) {
                        this._highlightCursorInfo.initialLineIndex = this._cursorInfo.currentLineIndex;
                        this._highlightCursorInfo.initialStartIndex = this._cursorInfo.globalStartIndex;
                        this._highlightCursorInfo.initialRelativeStartIndex = this._cursorInfo.relativeStartIndex;
                        this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
                        this._cursorInfo.globalEndIndex++;
                        this._isTextHighlightOn = true;
                    }
                    else {
                        if (this._cursorInfo.globalStartIndex < this._highlightCursorInfo.initialStartIndex) {
                            this._cursorInfo.globalStartIndex++;
                        }
                        else {
                            this._cursorInfo.globalEndIndex++;
                        }
                    }
                    this._blinkIsEven = true;
                    evt.preventDefault();
                    return;
                }
                if (this._isTextHighlightOn) {
                    this._cursorInfo.globalStartIndex = this._cursorInfo.globalEndIndex;
                }
                else if (evt && (evt.ctrlKey || evt.metaKey)) {
                    //ctr + ->
                    const rightDelta = this._lines[this._cursorInfo.currentLineIndex].text.length - this._cursorInfo.relativeEndIndex;
                    this._cursorInfo.globalStartIndex += rightDelta;
                }
                else if (this._cursorInfo.globalStartIndex < this.text.length) {
                    this._cursorInfo.globalStartIndex++;
                }
                // update the cursor
                this._blinkIsEven = false;
                this._isTextHighlightOn = false;
                return;
            case "ArrowUp": // UP
                // update the cursor
                this._blinkIsEven = false;
                if (evt) {
                    if (evt.shiftKey) {
                        if (!this._isTextHighlightOn) {
                            this._highlightCursorInfo.initialLineIndex = this._cursorInfo.currentLineIndex;
                            this._highlightCursorInfo.initialStartIndex = this._cursorInfo.globalStartIndex;
                            this._highlightCursorInfo.initialRelativeStartIndex = this._cursorInfo.relativeStartIndex;
                        }
                        this._isTextHighlightOn = true;
                        this._blinkIsEven = true;
                    }
                    else {
                        this._isTextHighlightOn = false;
                    }
                    evt.preventDefault();
                }
                if (this._cursorInfo.currentLineIndex === 0) {
                    // First line
                    this._cursorInfo.globalStartIndex = 0;
                }
                else {
                    const currentLine = this._lines[this._cursorInfo.currentLineIndex];
                    const upperLine = this._lines[this._cursorInfo.currentLineIndex - 1];
                    let tmpIndex = 0;
                    let relativeIndex = 0;
                    if (!this._isTextHighlightOn || this._cursorInfo.currentLineIndex < this._highlightCursorInfo.initialLineIndex) {
                        tmpIndex = this._cursorInfo.globalStartIndex;
                        relativeIndex = this._cursorInfo.relativeStartIndex;
                    }
                    else {
                        tmpIndex = this._cursorInfo.globalEndIndex;
                        relativeIndex = this._cursorInfo.relativeEndIndex;
                    }
                    const currentText = currentLine.text.substring(0, relativeIndex);
                    const currentWidth = this._contextForBreakLines.measureText(currentText).width;
                    let upperWidth = 0;
                    let previousWidth = 0;
                    tmpIndex -= relativeIndex; // Start of current line
                    tmpIndex -= upperLine.text.length + upperLine.lineEnding.length; // Start of upper line
                    let upperLineRelativeIndex = 0;
                    while (upperWidth < currentWidth && upperLineRelativeIndex < upperLine.text.length) {
                        tmpIndex++;
                        upperLineRelativeIndex++;
                        previousWidth = Math.abs(currentWidth - upperWidth);
                        upperWidth = this._contextForBreakLines.measureText(upperLine.text.substring(0, upperLineRelativeIndex)).width;
                    }
                    // Find closest move
                    if (Math.abs(currentWidth - upperWidth) > previousWidth && upperLineRelativeIndex > 0) {
                        tmpIndex--;
                    }
                    if (!this._isTextHighlightOn) {
                        this._cursorInfo.globalStartIndex = tmpIndex;
                    }
                    else if (this._cursorInfo.currentLineIndex <= this._highlightCursorInfo.initialLineIndex) {
                        this._cursorInfo.globalStartIndex = tmpIndex;
                        this._cursorInfo.globalEndIndex = this._highlightCursorInfo.initialStartIndex;
                        this._cursorInfo.relativeEndIndex = this._highlightCursorInfo.initialRelativeStartIndex;
                    }
                    else {
                        this._cursorInfo.globalEndIndex = tmpIndex;
                    }
                }
                this._markAsDirty();
                return;
            case "ArrowDown": // DOWN
                // update the cursor
                this._blinkIsEven = false;
                if (evt) {
                    if (evt.shiftKey) {
                        if (!this._isTextHighlightOn) {
                            this._highlightCursorInfo.initialLineIndex = this._cursorInfo.currentLineIndex;
                            this._highlightCursorInfo.initialStartIndex = this._cursorInfo.globalStartIndex;
                            this._highlightCursorInfo.initialRelativeStartIndex = this._cursorInfo.relativeStartIndex;
                        }
                        this._isTextHighlightOn = true;
                        this._blinkIsEven = true;
                    }
                    else {
                        this._isTextHighlightOn = false;
                    }
                    evt.preventDefault();
                }
                if (this._cursorInfo.currentLineIndex === this._lines.length - 1) {
                    // Last line
                    this._cursorInfo.globalStartIndex = this.text.length;
                }
                else {
                    const currentLine = this._lines[this._cursorInfo.currentLineIndex];
                    const underLine = this._lines[this._cursorInfo.currentLineIndex + 1];
                    let tmpIndex = 0;
                    let relativeIndex = 0;
                    if (!this._isTextHighlightOn || this._cursorInfo.currentLineIndex < this._highlightCursorInfo.initialLineIndex) {
                        tmpIndex = this._cursorInfo.globalStartIndex;
                        relativeIndex = this._cursorInfo.relativeStartIndex;
                    }
                    else {
                        tmpIndex = this._cursorInfo.globalEndIndex;
                        relativeIndex = this._cursorInfo.relativeEndIndex;
                    }
                    const currentText = currentLine.text.substring(0, relativeIndex);
                    const currentWidth = this._contextForBreakLines.measureText(currentText).width;
                    let underWidth = 0;
                    let previousWidth = 0;
                    tmpIndex += currentLine.text.length - relativeIndex + currentLine.lineEnding.length; // Start of current line
                    let underLineRelativeIndex = 0;
                    while (underWidth < currentWidth && underLineRelativeIndex < underLine.text.length) {
                        tmpIndex++;
                        underLineRelativeIndex++;
                        previousWidth = Math.abs(currentWidth - underWidth);
                        underWidth = this._contextForBreakLines.measureText(underLine.text.substring(0, underLineRelativeIndex)).width;
                    }
                    // Find closest move
                    if (Math.abs(currentWidth - underWidth) > previousWidth && underLineRelativeIndex > 0) {
                        tmpIndex--;
                    }
                    if (!this._isTextHighlightOn) {
                        this._cursorInfo.globalStartIndex = tmpIndex;
                    }
                    else if (this._cursorInfo.currentLineIndex < this._highlightCursorInfo.initialLineIndex) {
                        this._cursorInfo.globalStartIndex = tmpIndex;
                        if (this._cursorInfo.globalStartIndex > this._cursorInfo.globalEndIndex) {
                            this._cursorInfo.globalEndIndex += this._cursorInfo.globalStartIndex;
                            this._cursorInfo.globalStartIndex = this._cursorInfo.globalEndIndex - this._cursorInfo.globalStartIndex;
                            this._cursorInfo.globalEndIndex -= this._cursorInfo.globalStartIndex;
                        }
                    }
                    else {
                        this._cursorInfo.globalEndIndex = tmpIndex;
                        this._cursorInfo.globalStartIndex = this._highlightCursorInfo.initialStartIndex;
                    }
                }
                this._markAsDirty();
                return;
        }
        // special case - select all. Use key instead of code to support all keyboard layouts
        if (key === "a" && evt && (evt.ctrlKey || evt.metaKey)) {
            this._selectAllText();
            evt.preventDefault();
            return;
        }
        // Printable characters
        if (key?.length === 1) {
            evt?.preventDefault();
            this._currentKey = key;
            this.onBeforeKeyAddObservable.notifyObservers(this);
            key = this._currentKey;
            if (this._addKey) {
                this._isTextHighlightOn = false;
                this._blinkIsEven = false;
                this._prevText = this._textWrapper.text;
                this._textWrapper.removePart(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex, key);
                this._cursorInfo.globalStartIndex += key.length;
                this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
                this._textHasChanged();
            }
        }
    }
    _parseLineWordWrap(line = "", width, context) {
        const lines = [];
        const words = line.split(" ");
        let lineWidth = 0;
        for (let n = 0; n < words.length; n++) {
            const testLine = n > 0 ? line + " " + words[n] : words[0];
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > width) {
                if (n > 0) {
                    // Avoid first word duplication if of too long
                    lineWidth = context.measureText(line).width;
                    lines.push({ text: line, width: lineWidth, lineEnding: " " });
                }
                line = words[n];
                let flushedLine = "";
                line.split("").map((char) => {
                    if (context.measureText(flushedLine + char).width > width) {
                        lines.push({ text: flushedLine, width: context.measureText(flushedLine).width, lineEnding: "" });
                        flushedLine = "";
                    }
                    flushedLine += char;
                });
                line = flushedLine;
                // Measure remaining characters
                lineWidth = context.measureText(line).width;
            }
            else {
                lineWidth = testWidth;
                line = testLine;
            }
        }
        lines.push({ text: line, width: lineWidth, lineEnding: " " });
        return lines;
    }
    _breakLines(refWidth, context) {
        const lines = [];
        const _lines = (this.text || this.placeholderText).split("\n");
        if (this.clipContent) {
            for (const _line of _lines) {
                lines.push(...this._parseLineWordWrap(_line, refWidth, context));
            }
        }
        else {
            for (const _line of _lines) {
                lines.push(this._parseLine(_line, context));
            }
        }
        lines[lines.length - 1].lineEnding = "\n";
        return lines;
    }
    _parseLine(line = "", context) {
        return { text: line, width: context.measureText(line).width, lineEnding: " " };
    }
    /**
     * Processing of child right before the parent measurement update
     *
     * @param parentMeasure The parent measure
     * @param context The rendering canvas
     * @internal
     */
    _preMeasure(parentMeasure, context) {
        if (!this._fontOffset || this._wasDirty) {
            this._fontOffset = Control._GetFontOffset(context.font, this._host.getScene()?.getEngine());
        }
        let text = this._beforeRenderText(this._textWrapper).text;
        // placeholder conditions and color setting
        if (!this.text && this._placeholderText) {
            text = this._placeholderText;
        }
        // measures the textlength -> this.measure.width
        this._textWidth = context.measureText(text).width;
        // we double up the margin width
        const marginWidth = this._margin.getValueInPixel(this._host, parentMeasure.width) * 2;
        if (this._autoStretchWidth) {
            const tmpLines = text.split("\n");
            const longerString = tmpLines.reduce((acc, val) => {
                const valueLength = context.measureText(val).width;
                const accLength = context.measureText(acc).width;
                return valueLength > accLength ? val : acc;
            }, "");
            const longerStringWidth = context.measureText(longerString).width;
            this.width = Math.min(this._maxWidth.getValueInPixel(this._host, parentMeasure.width), longerStringWidth + marginWidth) + "px";
            this.autoStretchWidth = true;
        }
        this._availableWidth = this._width.getValueInPixel(this._host, parentMeasure.width) - marginWidth;
        // Prepare lines
        this._lines = this._breakLines(this._availableWidth, context);
        // can we find a cleaner implementation here?
        this._contextForBreakLines = context;
        if (this._autoStretchHeight) {
            const textHeight = this._lines.length * this._fontOffset.height;
            const totalHeight = textHeight + this._margin.getValueInPixel(this._host, parentMeasure.height) * 2;
            this.height = Math.min(this._maxHeight.getValueInPixel(this._host, parentMeasure.height), totalHeight) + "px";
            this._autoStretchHeight = true;
        }
        this._availableHeight = this._height.getValueInPixel(this._host, parentMeasure.height) - marginWidth;
        if (this._isFocused) {
            this._cursorInfo.currentLineIndex = 0;
            let lineLength = this._lines[this._cursorInfo.currentLineIndex].text.length + this._lines[this._cursorInfo.currentLineIndex].lineEnding.length;
            let tmpLength = 0;
            while (tmpLength + lineLength <= this._cursorInfo.globalStartIndex) {
                tmpLength += lineLength;
                if (this._cursorInfo.currentLineIndex < this._lines.length - 1) {
                    this._cursorInfo.currentLineIndex++;
                    lineLength = this._lines[this._cursorInfo.currentLineIndex].text.length + this._lines[this._cursorInfo.currentLineIndex].lineEnding.length;
                }
            }
        }
    }
    _textHasChanged() {
        if (!this._prevText && this._textWrapper.text && this.placeholderText) {
            this._cursorInfo.currentLineIndex = 0;
            this._cursorInfo.globalStartIndex = 1;
            this._cursorInfo.globalEndIndex = 1;
            this._cursorInfo.relativeStartIndex = 1;
            this._cursorInfo.relativeEndIndex = 1;
        }
        super._textHasChanged();
    }
    _computeScroll() {
        this._clipTextLeft = this._currentMeasure.left + this._margin.getValueInPixel(this._host, this._cachedParentMeasure.width);
        this._clipTextTop = this._currentMeasure.top + this._margin.getValueInPixel(this._host, this._cachedParentMeasure.height);
        if (this._isFocused && this._lines[this._cursorInfo.currentLineIndex].width > this._availableWidth) {
            const textLeft = this._clipTextLeft - this._lines[this._cursorInfo.currentLineIndex].width + this._availableWidth;
            if (!this._scrollLeft) {
                this._scrollLeft = textLeft;
            }
        }
        else {
            this._scrollLeft = this._clipTextLeft;
        }
        if (this._isFocused) {
            const selectedHeight = (this._cursorInfo.currentLineIndex + 1) * this._fontOffset.height;
            const textTop = this._clipTextTop - selectedHeight;
            if (!this._scrollTop) {
                this._scrollTop = textTop;
            }
        }
        else {
            this._scrollTop = this._clipTextTop;
        }
    }
    /**
     * Processing of child after the parent measurement update
     *
     * @internal
     */
    _additionalProcessing() {
        // Flush the highlighted text each frame
        this.highlightedText = "";
        this.onLinesReadyObservable.notifyObservers(this);
    }
    _drawText(text, textWidth, y, context) {
        const width = this._currentMeasure.width;
        let x = this._scrollLeft;
        switch (this._textHorizontalAlignment) {
            case Control.HORIZONTAL_ALIGNMENT_LEFT:
                x += 0;
                break;
            case Control.HORIZONTAL_ALIGNMENT_RIGHT:
                x += width - textWidth;
                break;
            case Control.HORIZONTAL_ALIGNMENT_CENTER:
                x += (width - textWidth) / 2;
                break;
        }
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
        }
        if (this.outlineWidth) {
            context.strokeText(text, this._currentMeasure.left + x, y);
        }
        context.fillText(text, x, y);
    }
    /**
     * Copy the text in the clipboard
     *
     * @param ev The clipboard event
     * @internal
     */
    _onCopyText(ev) {
        this._isTextHighlightOn = false;
        //when write permission to clipbaord data is denied
        try {
            ev.clipboardData && ev.clipboardData.setData("text/plain", this._highlightedText);
        }
        catch { } //pass
        this._host.clipboardData = this._highlightedText;
    }
    /**
     * Cut the text and copy it in the clipboard
     *
     * @param ev The clipboard event
     * @internal
     */
    _onCutText(ev) {
        if (!this._highlightedText) {
            return;
        }
        //when write permission to clipbaord data is denied
        try {
            ev.clipboardData && ev.clipboardData.setData("text/plain", this._highlightedText);
        }
        catch { } //pass
        this._host.clipboardData = this._highlightedText;
        this._prevText = this._textWrapper.text;
        this._textWrapper.removePart(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex);
        this._textHasChanged();
    }
    /**
     * Paste the copied text from the clipboard
     *
     * @param ev The clipboard event
     * @internal
     */
    _onPasteText(ev) {
        let data = "";
        if (ev.clipboardData && ev.clipboardData.types.indexOf("text/plain") !== -1) {
            data = ev.clipboardData.getData("text/plain");
        }
        else {
            //get the cached data; returns blank string by default
            data = this._host.clipboardData;
        }
        this._isTextHighlightOn = false;
        this._prevText = this._textWrapper.text;
        this._textWrapper.removePart(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex, data);
        const deltaIndex = data.length - (this._cursorInfo.globalEndIndex - this._cursorInfo.globalStartIndex);
        this._cursorInfo.globalStartIndex += deltaIndex;
        this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
        this._clickedCoordinateX = null;
        this._clickedCoordinateY = null;
        super._textHasChanged();
    }
    _draw(context) {
        this._computeScroll();
        this._scrollLeft = this._scrollLeft ?? 0;
        this._scrollTop = this._scrollTop ?? 0;
        context.save();
        this._applyStates(context);
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
        }
        // Background
        if (this._isFocused) {
            if (this._focusedBackground) {
                context.fillStyle = this._isEnabled ? this._focusedBackground : this._disabledColor;
                context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
            }
        }
        else if (this._background) {
            context.fillStyle = this._isEnabled ? this._background : this._disabledColor;
            context.fillRect(this._currentMeasure.left, this._currentMeasure.top, this._currentMeasure.width, this._currentMeasure.height);
        }
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
        }
        // sets the color of the rectangle (border if background available)
        if (this.color) {
            context.fillStyle = this.color;
        }
        const height = this._currentMeasure.height;
        const width = this._currentMeasure.width;
        let rootY = 0;
        switch (this._textVerticalAlignment) {
            case Control.VERTICAL_ALIGNMENT_TOP:
                rootY = this._fontOffset.ascent;
                break;
            case Control.VERTICAL_ALIGNMENT_BOTTOM:
                rootY = height - this._fontOffset.height * (this._lines.length - 1) - this._fontOffset.descent;
                break;
            case Control.VERTICAL_ALIGNMENT_CENTER:
                rootY = this._fontOffset.ascent + (height - this._fontOffset.height * this._lines.length) / 2;
                break;
        }
        context.save();
        context.beginPath();
        context.fillStyle = this.fontStyle;
        if (!this._textWrapper.text && this.placeholderText) {
            context.fillStyle = this._placeholderColor;
        }
        // here we define the visible reactangle to clip it in next line
        context.rect(this._clipTextLeft, this._clipTextTop, this._availableWidth + 2, this._availableHeight + 2);
        context.clip();
        // Text
        rootY += this._scrollTop;
        for (let i = 0; i < this._lines.length; i++) {
            const line = this._lines[i];
            if (i !== 0 && this._lineSpacing.internalValue !== 0) {
                if (this._lineSpacing.isPixel) {
                    rootY += this._lineSpacing.getValue(this._host);
                }
                else {
                    rootY = rootY + this._lineSpacing.getValue(this._host) * this._height.getValueInPixel(this._host, this._cachedParentMeasure.height);
                }
            }
            this._drawText(line.text, line.width, rootY, context);
            rootY += this._fontOffset.height;
        }
        context.restore();
        // Cursor
        if (this._isFocused) {
            // Render cursor
            if (!this._blinkIsEven || this._isTextHighlightOn) {
                let cursorLeft = this._scrollLeft + context.measureText(this._lines[this._cursorInfo.currentLineIndex].text.substring(0, this._cursorInfo.relativeStartIndex)).width;
                if (cursorLeft < this._clipTextLeft) {
                    this._scrollLeft += this._clipTextLeft - cursorLeft;
                    cursorLeft = this._clipTextLeft;
                    this._markAsDirty();
                }
                else if (cursorLeft > this._clipTextLeft + this._availableWidth) {
                    this._scrollLeft += this._clipTextLeft + this._availableWidth - cursorLeft;
                    cursorLeft = this._clipTextLeft + this._availableWidth;
                    this._markAsDirty();
                }
                let cursorTop = this._scrollTop + this._cursorInfo.currentLineIndex * this._fontOffset.height; //cursorTop distance from top to cursor start
                if (cursorTop < this._clipTextTop) {
                    this._scrollTop += this._clipTextTop - cursorTop;
                    cursorTop = this._clipTextTop;
                    this._markAsDirty();
                }
                else if (cursorTop + this._fontOffset.height > this._clipTextTop + this._availableHeight && this._availableHeight > this._fontOffset.height) {
                    this._scrollTop += this._clipTextTop + this._availableHeight - cursorTop - this._fontOffset.height;
                    cursorTop = this._clipTextTop + this._availableHeight - this._fontOffset.height;
                    this._markAsDirty();
                }
                if (!this._isTextHighlightOn) {
                    context.fillRect(cursorLeft, cursorTop, 2, this._fontOffset.height);
                }
            }
            this._resetBlinking();
            //show the highlighted text
            if (this._isTextHighlightOn) {
                clearTimeout(this._blinkTimeout);
                this._highlightedText = this.text.substring(this._cursorInfo.globalStartIndex, this._cursorInfo.globalEndIndex);
                context.globalAlpha = this._highligherOpacity;
                context.fillStyle = this._textHighlightColor;
                const startLineIndex = Math.min(this._cursorInfo.currentLineIndex, this._highlightCursorInfo.initialLineIndex);
                const endLineIndex = Math.max(this._cursorInfo.currentLineIndex, this._highlightCursorInfo.initialLineIndex);
                let highlightRootY = this._scrollTop + startLineIndex * this._fontOffset.height;
                for (let i = startLineIndex; i <= endLineIndex; i++) {
                    const line = this._lines[i];
                    let highlightRootX = this._scrollLeft;
                    switch (this._textHorizontalAlignment) {
                        case Control.HORIZONTAL_ALIGNMENT_LEFT:
                            highlightRootX += 0;
                            break;
                        case Control.HORIZONTAL_ALIGNMENT_RIGHT:
                            highlightRootX += width - line.width;
                            break;
                        case Control.HORIZONTAL_ALIGNMENT_CENTER:
                            highlightRootX += (width - line.width) / 2;
                            break;
                    }
                    const begin = i === startLineIndex ? this._cursorInfo.relativeStartIndex : 0;
                    const end = i === endLineIndex ? this._cursorInfo.relativeEndIndex : line.text.length;
                    const leftOffsetWidth = context.measureText(line.text.substring(0, begin)).width;
                    const selectedText = line.text.substring(begin, end);
                    const hightlightWidth = context.measureText(selectedText).width;
                    context.fillRect(highlightRootX + leftOffsetWidth, highlightRootY, hightlightWidth, this._fontOffset.height);
                    highlightRootY += this._fontOffset.height;
                }
                if (this._cursorInfo.globalEndIndex === this._cursorInfo.globalStartIndex) {
                    this._resetBlinking();
                }
            }
        }
        context.restore();
        // Border
        if (this._thickness) {
            if (this._isFocused) {
                if (this.focusedColor) {
                    context.strokeStyle = this.focusedColor;
                }
            }
            else {
                if (this.color) {
                    context.strokeStyle = this.color;
                }
            }
            context.lineWidth = this._thickness;
            context.strokeRect(this._currentMeasure.left + this._thickness / 2, this._currentMeasure.top + this._thickness / 2, this._currentMeasure.width - this._thickness, this._currentMeasure.height - this._thickness);
        }
    }
    _resetBlinking() {
        clearTimeout(this._blinkTimeout);
        this._blinkTimeout = setTimeout(() => {
            this._blinkIsEven = !this._blinkIsEven;
            this._markAsDirty();
        }, 500);
    }
    _onPointerDown(target, coordinates, pointerId, buttonIndex, pi) {
        if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, pi)) {
            return false;
        }
        if (this.isReadOnly) {
            return true;
        }
        this._clickedCoordinateX = coordinates.x;
        this._clickedCoordinateY = coordinates.y;
        this._isTextHighlightOn = false;
        this._highlightedText = "";
        this._isPointerDown = true;
        this._host._capturingControl[pointerId] = this;
        if (this._host.focusedControl === this) {
            // Move cursor
            clearTimeout(this._blinkTimeout);
            this._markAsDirty();
            return true;
        }
        if (!this._isEnabled) {
            return false;
        }
        this._host.focusedControl = this;
        return true;
    }
    // for textselection
    _onPointerMove(target, coordinates, pointerId, pi) {
        // Avoid Chromium-like beahavior when this event is fired right after onPointerDown
        if (pi.event.movementX === 0 && pi.event.movementY === 0) {
            return;
        }
        if (this._host.focusedControl === this && this._isPointerDown && !this.isReadOnly) {
            this._clickedCoordinateX = coordinates.x;
            this._clickedCoordinateY = coordinates.y;
            if (!this._isTextHighlightOn) {
                this._highlightCursorInfo.initialLineIndex = this._cursorInfo.currentLineIndex;
                this._highlightCursorInfo.initialStartIndex = this._cursorInfo.globalStartIndex;
                this._highlightCursorInfo.initialRelativeStartIndex = this._cursorInfo.relativeStartIndex;
                this._isTextHighlightOn = true;
            }
            this._markAsDirty();
        }
        super._onPointerMove(target, coordinates, pointerId, pi);
    }
    /**
     * Apply the correct position of cursor according to current modification
     */
    _updateCursorPosition() {
        if (!this._isFocused) {
            return;
        }
        if (!this._textWrapper.text && this.placeholderText) {
            this._cursorInfo.currentLineIndex = 0;
            this._cursorInfo.globalStartIndex = 0;
            this._cursorInfo.globalEndIndex = 0;
            this._cursorInfo.relativeStartIndex = 0;
            this._cursorInfo.relativeEndIndex = 0;
        }
        else {
            if (this._clickedCoordinateX && this._clickedCoordinateY) {
                if (!this._isTextHighlightOn) {
                    this._cursorInfo = {
                        globalStartIndex: 0,
                        globalEndIndex: 0,
                        relativeStartIndex: 0,
                        relativeEndIndex: 0,
                        currentLineIndex: 0,
                    };
                }
                let globalIndex = 0;
                let relativeIndex = 0;
                const lastClickedCoordinateY = this._clickedCoordinateY - this._scrollTop;
                const relativeCoordinateY = Math.floor(lastClickedCoordinateY / this._fontOffset.height);
                this._cursorInfo.currentLineIndex = Math.min(Math.max(relativeCoordinateY, 0), this._lines.length - 1);
                let currentSize = 0;
                const relativeXPosition = this._clickedCoordinateX - (this._scrollLeft ?? 0);
                let previousDist = 0;
                for (let index = 0; index < this._cursorInfo.currentLineIndex; index++) {
                    const line = this._lines[index];
                    globalIndex += line.text.length + line.lineEnding.length;
                }
                while (currentSize < relativeXPosition && this._lines[this._cursorInfo.currentLineIndex].text.length > relativeIndex) {
                    relativeIndex++;
                    previousDist = Math.abs(relativeXPosition - currentSize);
                    currentSize = this._contextForBreakLines.measureText(this._lines[this._cursorInfo.currentLineIndex].text.substring(0, relativeIndex)).width;
                }
                // Find closest move
                if (Math.abs(relativeXPosition - currentSize) > previousDist && relativeIndex > 0) {
                    relativeIndex--;
                }
                globalIndex += relativeIndex;
                if (!this._isTextHighlightOn) {
                    this._cursorInfo.globalStartIndex = globalIndex;
                    this._cursorInfo.relativeStartIndex = relativeIndex;
                    this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
                    this._cursorInfo.relativeEndIndex = this._cursorInfo.relativeStartIndex;
                }
                else {
                    if (globalIndex < this._highlightCursorInfo.initialStartIndex) {
                        this._cursorInfo.globalStartIndex = globalIndex;
                        this._cursorInfo.relativeStartIndex = relativeIndex;
                        this._cursorInfo.globalEndIndex = this._highlightCursorInfo.initialStartIndex;
                        this._cursorInfo.relativeEndIndex = this._highlightCursorInfo.initialRelativeStartIndex;
                    }
                    else {
                        this._cursorInfo.globalStartIndex = this._highlightCursorInfo.initialStartIndex;
                        this._cursorInfo.relativeStartIndex = this._highlightCursorInfo.initialRelativeStartIndex;
                        this._cursorInfo.globalEndIndex = globalIndex;
                        this._cursorInfo.relativeEndIndex = relativeIndex;
                    }
                }
                // Avoid the caret during highlighting
                this._blinkIsEven = this._isTextHighlightOn;
                this._clickedCoordinateX = null;
                this._clickedCoordinateY = null;
            }
            else {
                // Standard behavior same as Current line is at least above the initial highlight index
                this._cursorInfo.relativeStartIndex = 0;
                this._cursorInfo.currentLineIndex = 0;
                let lineLength = this._lines[this._cursorInfo.currentLineIndex].text.length + this._lines[this._cursorInfo.currentLineIndex].lineEnding.length;
                let tmpLength = 0;
                while (tmpLength + lineLength <= this._cursorInfo.globalStartIndex) {
                    tmpLength += lineLength;
                    if (this._cursorInfo.currentLineIndex < this._lines.length - 1) {
                        this._cursorInfo.currentLineIndex++;
                        lineLength = this._lines[this._cursorInfo.currentLineIndex].text.length + this._lines[this._cursorInfo.currentLineIndex].lineEnding.length;
                    }
                }
                this._cursorInfo.relativeStartIndex = this._cursorInfo.globalStartIndex - tmpLength;
                if (!this._isTextHighlightOn) {
                    this._cursorInfo.relativeEndIndex = this._cursorInfo.relativeStartIndex;
                    this._cursorInfo.globalEndIndex = this._cursorInfo.globalStartIndex;
                }
                else if (this._highlightCursorInfo.initialStartIndex !== -1 && this._cursorInfo.globalStartIndex >= this._highlightCursorInfo.initialStartIndex) {
                    // Current line is at least below the initial highlight index
                    while (tmpLength + lineLength <= this._cursorInfo.globalEndIndex) {
                        tmpLength += lineLength;
                        if (this._cursorInfo.currentLineIndex < this._lines.length - 1) {
                            this._cursorInfo.currentLineIndex++;
                            lineLength = this._lines[this._cursorInfo.currentLineIndex].text.length + this._lines[this._cursorInfo.currentLineIndex].lineEnding.length;
                        }
                    }
                    this._cursorInfo.relativeEndIndex = this._cursorInfo.globalEndIndex - tmpLength;
                }
            }
        }
    }
    /**
     * Update all values of cursor information based on cursorIndex value
     *
     * @param offset The index to take care of
     * @internal
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _updateValueFromCursorIndex(offset) {
        // Override to avoid parent behavior during _onPointerMove
    }
    /**
     * Select the word immediatly under the cursor on double click
     *
     * @param _evt Pointer informations of double click
     * @internal
     */
    _processDblClick(_evt) {
        //pre-find the start and end index of the word under cursor, speeds up the rendering
        let moveLeft, moveRight;
        do {
            moveLeft = this._cursorInfo.globalStartIndex > 0 && this._textWrapper.isWord(this._cursorInfo.globalStartIndex - 1) ? --this._cursorInfo.globalStartIndex : 0;
            moveRight =
                this._cursorInfo.globalEndIndex < this._textWrapper.length && this._textWrapper.isWord(this._cursorInfo.globalEndIndex) ? ++this._cursorInfo.globalEndIndex : 0;
        } while (moveLeft || moveRight);
        this._highlightCursorInfo.initialLineIndex = this._cursorInfo.currentLineIndex;
        this._highlightCursorInfo.initialStartIndex = this._cursorInfo.globalStartIndex;
        this.onTextHighlightObservable.notifyObservers(this);
        this._isTextHighlightOn = true;
        this._blinkIsEven = true;
        this._markAsDirty();
    }
    /** @internal */
    _selectAllText() {
        this._isTextHighlightOn = true;
        this._blinkIsEven = true;
        this._highlightCursorInfo = {
            initialStartIndex: 0,
            initialRelativeStartIndex: 0,
            initialLineIndex: 0,
        };
        this._cursorInfo = {
            globalStartIndex: 0,
            globalEndIndex: this._textWrapper.length,
            relativeEndIndex: this._lines[this._lines.length - 1].text.length,
            relativeStartIndex: 0,
            currentLineIndex: this._lines.length - 1,
        };
        this._markAsDirty();
    }
    dispose() {
        super.dispose();
        this.onLinesReadyObservable.clear();
    }
}
__decorate([
    serialize()
], InputTextArea.prototype, "autoStretchHeight", null);
__decorate([
    serialize()
], InputTextArea.prototype, "maxHeight", null);
RegisterClass("BABYLON.GUI.InputTextArea", InputTextArea);
//# sourceMappingURL=inputTextArea.js.map