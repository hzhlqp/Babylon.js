import { __decorate } from "tslib";
import { Container } from "./container";
import { Control } from "./control";
import { RegisterClass } from "core/Misc/typeStore";
import { serialize } from "core/Misc/decorators";
/** Class used to create 2D ellipse containers */
export class Ellipse extends Container {
    /** Gets or sets border thickness */
    get thickness() {
        return this._thickness;
    }
    set thickness(value) {
        if (this._thickness === value) {
            return;
        }
        this._thickness = value;
        this._markAsDirty();
    }
    /** Gets or sets arcing of the ellipse (ratio of the circumference between 0 and 1) */
    get arc() {
        return this._arc;
    }
    set arc(value) {
        if (this._arc === value) {
            return;
        }
        this._arc = value;
        this._markAsDirty();
    }
    /**
     * Creates a new Ellipse
     * @param name defines the control name
     */
    constructor(name) {
        super(name);
        this.name = name;
        this._thickness = 1;
        this._arc = 1;
    }
    _getTypeName() {
        return "Ellipse";
    }
    _localDraw(context) {
        context.save();
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
        }
        Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, this._currentMeasure.width / 2 - this._thickness / 2, this._currentMeasure.height / 2 - this._thickness / 2, this._arc, context);
        if (this._backgroundGradient || this._background) {
            context.fillStyle = this._getBackgroundColor(context);
            context.fill();
        }
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
        }
        if (this._thickness) {
            if (this.color) {
                context.strokeStyle = this.color;
            }
            context.lineWidth = this._thickness;
            context.stroke();
        }
        context.restore();
    }
    _additionalProcessing(parentMeasure, context) {
        super._additionalProcessing(parentMeasure, context);
        this._measureForChildren.width -= 2 * this._thickness;
        this._measureForChildren.height -= 2 * this._thickness;
        this._measureForChildren.left += this._thickness;
        this._measureForChildren.top += this._thickness;
    }
    _clipForChildren(context) {
        Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, this._currentMeasure.width / 2, this._currentMeasure.height / 2, this._arc, context);
        context.clip();
    }
    _renderHighlightSpecific(context) {
        Control.drawEllipse(this._currentMeasure.left + this._currentMeasure.width / 2, this._currentMeasure.top + this._currentMeasure.height / 2, this._currentMeasure.width / 2 - this._highlightLineWidth / 2, this._currentMeasure.height / 2 - this._highlightLineWidth / 2, this._arc, context);
        context.stroke();
    }
}
__decorate([
    serialize()
], Ellipse.prototype, "thickness", null);
__decorate([
    serialize()
], Ellipse.prototype, "arc", null);
RegisterClass("BABYLON.GUI.Ellipse", Ellipse);
//# sourceMappingURL=ellipse.js.map