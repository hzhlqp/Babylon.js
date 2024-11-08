import { ValueAndUnit } from "gui/2D/valueAndUnit";
import { Control } from "gui/2D/controls/control";
import { Matrix2D } from "gui/2D/math2D";
import { Vector2 } from "core/Maths/math.vector";
import { Measure } from "gui/2D/measure";
export class Rect {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    clone() {
        return new Rect(this.left, this.top, this.right, this.bottom);
    }
    get center() {
        const topLeft = new Vector2(this.left, this.top);
        return topLeft.addInPlace(new Vector2(this.right, this.bottom).subtractInPlace(topLeft).multiplyByFloats(0.5, 0.5));
    }
    get width() {
        return this.right - this.left;
    }
    get height() {
        return this.bottom - this.top;
    }
}
const roundFactor = 100;
const round = (value) => Math.round(value * roundFactor) / roundFactor;
export class CoordinateHelper {
    /**
     * Get the scaling of a specific GUI control
     * @param node the node for which we are getting the scaling
     * @param relative should we return only the relative scaling (relative to the parent)
     * @returns an X,Y vector of the scaling
     */
    static GetScale(node, relative) {
        let x = node.scaleX;
        let y = node.scaleY;
        if (relative) {
            return new Vector2(x, y);
        }
        let parent = node.parent;
        while (parent) {
            x *= parent.scaleX;
            y *= parent.scaleY;
            parent = parent.parent;
        }
        return new Vector2(x, y);
    }
    static GetRotation(node, relative) {
        // Gets rotate of a control account for all of it's parents rotations
        let rotation = node.rotation;
        if (relative) {
            return rotation;
        }
        let parent = node.parent;
        while (parent) {
            rotation += parent.rotation;
            parent = parent.parent;
        }
        return rotation;
    }
    static GetParentSizes(guiControl) {
        const parentMeasure = new Measure(0, 0, 0, 0);
        if (guiControl.parent) {
            parentMeasure.copyFrom(guiControl.parent._currentMeasure);
            if (guiControl.parent.typeName === "Grid") {
                const cellInfo = guiControl.parent.getChildCellInfo(guiControl);
                const cell = guiControl.parent.cells[cellInfo];
                if (cell) {
                    parentMeasure.width = cell.widthInPixels;
                    parentMeasure.height = cell.heightInPixels;
                }
            }
        }
        return parentMeasure;
    }
    /**
     * This function calculates a local matrix for a node, including it's full transformation and pivot point
     *
     * @param node the node to calculate the matrix for
     * @param storedValues should the stored (cached) values be used to calculate the matrix
     * @returns a new matrix for the control
     */
    static GetNodeMatrix(node, storedValues) {
        const size = this.GlobalState.guiTexture.getSize();
        // parent should always be defined, but stay safe
        let parentWidth, parentHeight;
        if (node.parent) {
            const parentSizes = CoordinateHelper.GetParentSizes(node);
            parentWidth = parentSizes.width;
            parentHeight = parentSizes.height;
        }
        else {
            parentWidth = size.width;
            parentHeight = size.height;
        }
        let x = 0;
        let y = 0;
        const width = storedValues ? storedValues.width : node.widthInPixels;
        const height = storedValues ? storedValues.height : node.heightInPixels;
        const left = storedValues ? storedValues.left : node.leftInPixels;
        const top = storedValues ? storedValues.top : node.topInPixels;
        switch (node.horizontalAlignment) {
            case Control.HORIZONTAL_ALIGNMENT_LEFT:
                x = -(parentWidth - width) / 2;
                break;
            case Control.HORIZONTAL_ALIGNMENT_RIGHT:
                x = (parentWidth - width) / 2;
                break;
            case Control.HORIZONTAL_ALIGNMENT_CENTER:
                x = 0;
                break;
        }
        switch (node.verticalAlignment) {
            case Control.VERTICAL_ALIGNMENT_TOP:
                y = -(parentHeight - height) / 2;
                break;
            case Control.VERTICAL_ALIGNMENT_BOTTOM:
                y = (parentHeight - height) / 2;
                break;
            case Control.VERTICAL_ALIGNMENT_CENTER:
                y = 0;
                break;
        }
        this._ResetMatrixArray();
        const m2d = this._MatrixCache[0];
        const translateTo = this._MatrixCache[1];
        // as this is used later it needs to persist
        const resultMatrix = Matrix2D.Identity();
        // the pivot point around which the object transforms
        let offsetX = width * node.transformCenterX - width / 2;
        let offsetY = height * node.transformCenterY - height / 2;
        // pivot changes this point's position! but only in legacy pivot mode
        if (!node.descendantsOnlyPadding) {
            // TODO - padding needs to also take scaling into account?
            offsetX -= ((node.paddingRightInPixels - node.paddingLeftInPixels) * 1) / 2;
            offsetY -= ((node.paddingBottomInPixels - node.paddingTopInPixels) * 1) / 2;
        }
        // Set the translation
        Matrix2D.TranslationToRef(x + left, y + top, translateTo);
        // without parents scaling and rotation, calculate world matrix for each
        const rotation = this.GetRotation(node, true);
        const scaling = this.GetScale(node, true);
        // COmpose doesn't actually translate, but creates a form of pivot in a specific position
        Matrix2D.ComposeToRef(-offsetX, -offsetY, rotation, scaling.x, scaling.y, null, m2d);
        // actually compose the matrix
        resultMatrix.multiplyToRef(m2d, resultMatrix);
        resultMatrix.multiplyToRef(translateTo, resultMatrix);
        return resultMatrix;
    }
    /**
     * Using the node's tree, calculate its world matrix and return it
     * @param node the node to calculate the matrix for
     * @param storedValues used stored valued (cached when pointer down is clicked)
     * @param stopAt stop looking when this node is found
     * @returns the world matrix for this node
     */
    static NodeToRTTWorldMatrix(node, storedValues, stopAt) {
        const listOfNodes = [node];
        let parent = node.parent;
        let child = node;
        while (parent && child !== stopAt) {
            if (parent.typeName === "Grid") {
                const cellInfo = parent.getChildCellInfo(child);
                const cell = parent.cells[cellInfo];
                listOfNodes.push(cell);
            }
            listOfNodes.push(parent);
            child = parent;
            parent = parent.parent;
        }
        this._ResetMatrixArray();
        const matrices = listOfNodes.map((node, index) => this.GetNodeMatrix(node, index === 0 ? storedValues : undefined));
        return matrices.reduce((acc, cur) => {
            acc.multiplyToRef(cur, acc);
            return acc;
        }, this._MatrixCache[2]);
    }
    static NodeToRTTSpace(node, x, y, reference = new Vector2(), storedValues, stopAt) {
        const worldMatrix = this.NodeToRTTWorldMatrix(node, storedValues, stopAt);
        worldMatrix.transformCoordinates(x, y, reference);
        // round
        reference.x = round(reference.x);
        reference.y = round(reference.y);
        return reference;
    }
    static RttToLocalNodeSpace(node, x, y, reference = new Vector2(), storedValues) {
        const worldMatrix = this.NodeToRTTWorldMatrix(node, storedValues);
        const inv = this._MatrixCache[3];
        worldMatrix.invertToRef(inv);
        inv.transformCoordinates(x, y, reference);
        // round
        reference.x = round(reference.x);
        reference.y = round(reference.y);
        return reference;
    }
    static RttToCanvasSpace(x, y) {
        const engine = this.GlobalState.workbench._scene.getEngine();
        return new Vector2(x + engine.getRenderWidth() / 2, y + engine.getRenderHeight() / 2);
    }
    static MousePointerToRTTSpace(_node, x, y) {
        const scene = this.GlobalState.workbench._scene;
        const engine = scene.getEngine();
        return new Vector2((x || scene.pointerX) - engine.getRenderWidth() / 2, (y || scene.pointerY) - engine.getRenderHeight() / 2);
    }
    static _ResetMatrixArray() {
        this._MatrixCache.forEach((matrix) => {
            Matrix2D.IdentityToRef(matrix);
        });
    }
    static ComputeLocalBounds(node) {
        return new Rect(-node.widthInPixels * 0.5, -node.heightInPixels * 0.5, node.widthInPixels * 0.5, node.heightInPixels * 0.5);
    }
    /**
     * converts a node's dimensions to percentage, properties can be specified as a list, or can convert all
     * @param guiControl
     * @param properties
     * @param onPropertyChangedObservable
     */
    static ConvertToPercentage(guiControl, properties = ["left", "top", "width", "height"], onPropertyChangedObservable) {
        let ratioX = 1;
        let ratioY = 1;
        if (guiControl.parent) {
            if (guiControl.parent.typeName === "Grid") {
                const cellInfo = guiControl.parent.getChildCellInfo(guiControl);
                const cell = guiControl.parent.cells[cellInfo];
                ratioX = cell.widthInPixels;
                ratioY = cell.heightInPixels;
            }
            else if (guiControl.parent.typeName === "Rectangle" || guiControl.parent.typeName === "Button") {
                const thickness = guiControl.parent.thickness * 2;
                ratioX = guiControl.parent._currentMeasure.width - thickness;
                ratioY = guiControl.parent._currentMeasure.height - thickness;
            }
            else {
                ratioX = guiControl.parent._currentMeasure.width;
                ratioY = guiControl.parent._currentMeasure.height;
            }
        }
        for (const property of properties) {
            const initialValue = guiControl[property];
            const ratio = property === "left" || property === "width" || property === "paddingLeft" || property === "paddingRight" ? ratioX : ratioY;
            const newValue = (guiControl[`${property}InPixels`] * 100) / ratio;
            guiControl[property] = `${newValue.toFixed(2)}%`;
            onPropertyChangedObservable?.notifyObservers({
                object: guiControl,
                initialValue,
                value: guiControl[property],
                property,
            });
        }
    }
    static Round(value) {
        return Math.floor(value * 100) / 100;
    }
    static ConvertToPixels(guiControl, properties = ["left", "top", "width", "height"], onPropertyChangedObservable) {
        // make sure we are using the latest measures for the control
        const parentMeasure = CoordinateHelper.GetParentSizes(guiControl);
        guiControl._processMeasures(parentMeasure, guiControl.host.getContext());
        for (const property of properties) {
            const initialValue = guiControl[property];
            guiControl[`_${property}`] = new ValueAndUnit(this.Round(guiControl[`${property}InPixels`]), ValueAndUnit.UNITMODE_PIXEL);
            onPropertyChangedObservable?.notifyObservers({
                object: guiControl,
                initialValue,
                value: guiControl[property],
                property,
            });
        }
    }
}
CoordinateHelper._MatrixCache = [Matrix2D.Identity(), Matrix2D.Identity(), Matrix2D.Identity(), Matrix2D.Identity()];
//# sourceMappingURL=coordinateHelper.js.map