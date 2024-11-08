import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Control } from "gui/2D/controls/control";
import { Vector2 } from "core/Maths/math.vector";
import * as React from "react";
import { CoordinateHelper, Rect } from "./coordinateHelper";
import { ValueAndUnit } from "gui/2D/valueAndUnit";
import { GizmoScalePoint, ScalePointPosition } from "./gizmoScalePoint";
import { MathTools } from "gui/2D/math2D";
const roundFactor = 100;
const round = (value) => Math.round(value * roundFactor) / roundFactor;
const modulo = (dividend, divisor) => ((dividend % divisor) + divisor) % divisor;
// this defines the lines that link the corners, making up the bounding box
const lines = [
    [0, 2],
    [0, 6],
    [2, 8],
    [6, 8],
];
// used to calculate which cursor icon we should display for the scalepoints
const defaultScalePointRotations = [315, 0, 45, 270, 0, 90, 225, 180, 135];
export class GizmoGeneric extends React.Component {
    constructor(props) {
        super(props);
        this._onUp = (evt) => {
            // if left is still pressed, don't release
            if (evt && evt.buttons & 1) {
                return;
            }
            // cleanup on pointer up
            this.setState({ scalePointDragging: -1, isRotating: false });
        };
        this._onMove = () => {
            const scene = this.props.globalState.workbench._scene;
            if (this.state.scalePointDragging !== -1) {
                const node = this.props.control;
                const inRTT = CoordinateHelper.MousePointerToRTTSpace(node, scene.pointerX, scene.pointerY);
                const inNodeSpace = CoordinateHelper.RttToLocalNodeSpace(node, inRTT.x, inRTT.y, undefined, this._storedValues);
                this._dragLocalBounds(inNodeSpace, this.props.globalState.shiftKeyPressed);
                this._updateNodeFromLocalBounds();
                this.props.globalState.onPropertyGridUpdateRequiredObservable.notifyObservers();
            }
            if (this.state.isRotating) {
                const angle = Math.atan2(scene.pointerY - this._rotation.pivot.y, scene.pointerX - this._rotation.pivot.x);
                for (const control of this.props.globalState.selectedControls) {
                    control.rotation += angle - this._rotation.initialAngleToPivot;
                }
                this._rotation.initialAngleToPivot = angle;
                this.props.globalState.onPropertyGridUpdateRequiredObservable.notifyObservers();
            }
        };
        this._beginDraggingScalePoint = (scalePointIndex) => {
            this.setState({ scalePointDragging: scalePointIndex });
            const node = this.props.control;
            this._localBounds = CoordinateHelper.ComputeLocalBounds(node);
            this._storedValues = new Rect(node.leftInPixels, node.topInPixels, node.leftInPixels + node.widthInPixels, node.topInPixels + node.heightInPixels);
            for (const node of this.props.globalState.selectedControls) {
                node.metadata.localBounds = CoordinateHelper.ComputeLocalBounds(node);
                node.metadata.storedValues = new Rect(node.leftInPixels, node.topInPixels, node.leftInPixels + node.widthInPixels, node.topInPixels + node.heightInPixels);
            }
        };
        this._beginRotate = () => {
            const scene = this.props.globalState.workbench._scene;
            const node = this.props.control;
            const nodeSpace = new Vector2(node.transformCenterX, node.transformCenterY);
            const rtt = CoordinateHelper.NodeToRTTSpace(node, nodeSpace.x, nodeSpace.y, undefined);
            const canvas = CoordinateHelper.RttToCanvasSpace(rtt.x, rtt.y);
            const pivot = new Vector2(canvas.x, canvas.y);
            const initialAngleToPivot = Math.atan2(scene.pointerY - pivot.y, scene.pointerX - pivot.x);
            this._rotation = {
                pivot,
                initialAngleToPivot,
            };
            this.setState({ isRotating: true });
        };
        const scalePoints = [];
        for (let vertical = ScalePointPosition.Top; vertical <= ScalePointPosition.Bottom; vertical++) {
            for (let horizontal = ScalePointPosition.Left; horizontal <= ScalePointPosition.Right; horizontal++) {
                const isPivot = horizontal === ScalePointPosition.Center && vertical === ScalePointPosition.Center;
                scalePoints.push({
                    position: new Vector2(),
                    horizontalPosition: horizontal,
                    verticalPosition: vertical,
                    rotation: 0,
                    isPivot,
                    defaultRotation: defaultScalePointRotations[scalePoints.length],
                });
            }
        }
        this._localBounds = new Rect(0, 0, 0, 0);
        this.state = {
            canvasBounds: new Rect(0, 0, 0, 0),
            scalePoints,
            scalePointDragging: -1,
            isRotating: false,
        };
        this._gizmoUpdateObserver = this.props.globalState.onGizmoUpdateRequireObservable.add(() => {
            this.updateGizmo();
        });
        this._pointerUpObserver = this.props.globalState.onPointerUpObservable.add((evt) => this._onUp(evt));
        this._pointerMoveObserver = this.props.globalState.onPointerMoveObservable.add(() => this._onMove());
    }
    componentDidMount() {
        this.updateGizmo();
    }
    componentWillUnmount() {
        this.props.globalState.onGizmoUpdateRequireObservable.remove(this._gizmoUpdateObserver);
        this.props.globalState.onPointerUpObservable.remove(this._pointerUpObserver);
        this.props.globalState.onPointerMoveObservable.remove(this._pointerMoveObserver);
    }
    /**
     * Update the gizmo's positions
     */
    updateGizmo() {
        const node = this.props.control;
        // Calculating the offsets for each scale point.
        const canvasBounds = new Rect(Number.MAX_VALUE, Number.MAX_VALUE, 0, 0);
        const localBounds = CoordinateHelper.ComputeLocalBounds(node);
        const totalPadding = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        };
        let current = node.parent;
        while (current !== null && current !== undefined) {
            totalPadding.left += current.paddingLeftInPixels;
            totalPadding.right += current.paddingRightInPixels;
            totalPadding.top += current.paddingTopInPixels;
            totalPadding.bottom += current.paddingBottomInPixels;
            current = current.parent;
        }
        const horizontalAdjustment = (totalPadding.left - totalPadding.right) * 0.5;
        localBounds.left += horizontalAdjustment;
        localBounds.right += horizontalAdjustment;
        const verticalAdjustment = (totalPadding.top - totalPadding.bottom) * 0.5;
        localBounds.top += verticalAdjustment;
        localBounds.bottom += verticalAdjustment;
        const updatedPoints = this.state.scalePoints.map((scalePoint) => {
            const nodeSpace = new Vector2();
            switch (scalePoint.horizontalPosition) {
                case ScalePointPosition.Left:
                    nodeSpace.x = localBounds.left;
                    break;
                case ScalePointPosition.Center:
                    nodeSpace.x = localBounds.center.x;
                    break;
                case ScalePointPosition.Right:
                    nodeSpace.x = localBounds.right;
                    break;
            }
            switch (scalePoint.verticalPosition) {
                case ScalePointPosition.Top:
                    nodeSpace.y = localBounds.top;
                    break;
                case ScalePointPosition.Center:
                    nodeSpace.y = localBounds.center.y;
                    break;
                case ScalePointPosition.Bottom:
                    nodeSpace.y = localBounds.bottom;
                    break;
            }
            if (scalePoint.isPivot) {
                // Calculate the pivot point
                const pivotX = node.transformCenterX - 0.5;
                const pivotY = node.transformCenterY - 0.5;
                nodeSpace.x = node.widthInPixels * pivotX;
                nodeSpace.y = node.heightInPixels * pivotY;
            }
            const rtt = CoordinateHelper.NodeToRTTSpace(node, nodeSpace.x, nodeSpace.y, undefined);
            const canvas = CoordinateHelper.RttToCanvasSpace(rtt.x, rtt.y);
            if (canvas.x < canvasBounds.left) {
                canvasBounds.left = canvas.x;
            }
            if (canvas.x > canvasBounds.right) {
                canvasBounds.right = canvas.x;
            }
            if (canvas.y < canvasBounds.top) {
                canvasBounds.top = canvas.y;
            }
            if (canvas.y > canvasBounds.bottom) {
                canvasBounds.bottom = canvas.y;
            }
            // edges, and rotate based on the rotation of the control
            scalePoint.position.x = canvas.x;
            scalePoint.position.y = canvas.y;
            scalePoint.rotation = CoordinateHelper.GetRotation(node) * (180 / Math.PI);
            return scalePoint;
        });
        this.setState({
            canvasBounds,
            scalePoints: [...updatedPoints],
        });
    }
    _rotate(x, y, centerX, centerY, angle) {
        return {
            x: (x - centerX) * Math.cos(angle) - (y - centerY) * Math.sin(angle) + centerX,
            y: (x - centerX) * Math.sin(angle) + (y - centerY) * Math.cos(angle) + centerY,
        };
    }
    _dragLocalBounds(toPosition, preserveAspectRatio = false) {
        const scalePoint = this.state.scalePoints[this.state.scalePointDragging];
        const newBounds = this._localBounds.clone();
        const currentAspectRatio = MathTools.Round(this._localBounds.width / this._localBounds.height);
        if (scalePoint.horizontalPosition === ScalePointPosition.Left) {
            newBounds.left = Math.min(this._localBounds.right - 1, toPosition.x);
        }
        if (scalePoint.verticalPosition === ScalePointPosition.Top) {
            newBounds.top = Math.min(this._localBounds.bottom - 1, toPosition.y);
        }
        if (scalePoint.horizontalPosition === ScalePointPosition.Right) {
            newBounds.right = Math.max(this._localBounds.left + 1, toPosition.x);
        }
        if (scalePoint.verticalPosition === ScalePointPosition.Bottom) {
            newBounds.bottom = Math.max(this._localBounds.top + 1, toPosition.y);
        }
        if (preserveAspectRatio) {
            const deltaWidth = newBounds.width - this._localBounds.width;
            const deltaHeight = newBounds.height - this._localBounds.height;
            const signInverted = scalePoint.horizontalPosition === ScalePointPosition.Center || scalePoint.verticalPosition === ScalePointPosition.Center;
            const comparison = Math.abs(deltaWidth) > Math.abs(deltaHeight);
            if (signInverted ? comparison : !comparison) {
                const aspectRatioDeltaHeight = deltaWidth / currentAspectRatio;
                if (scalePoint.verticalPosition === ScalePointPosition.Top) {
                    newBounds.top = this._localBounds.top - aspectRatioDeltaHeight;
                }
                else if (scalePoint.verticalPosition === ScalePointPosition.Bottom) {
                    newBounds.bottom = this._localBounds.bottom + aspectRatioDeltaHeight;
                }
                else {
                    newBounds.top = this._localBounds.top - aspectRatioDeltaHeight / 2;
                    newBounds.bottom = this._localBounds.bottom + aspectRatioDeltaHeight / 2;
                }
            }
            else {
                const aspectRatioDeltaWidth = deltaHeight * currentAspectRatio;
                if (scalePoint.horizontalPosition === ScalePointPosition.Left) {
                    newBounds.left = this._localBounds.left - aspectRatioDeltaWidth;
                }
                else if (scalePoint.horizontalPosition === ScalePointPosition.Right) {
                    newBounds.right = this._localBounds.right + aspectRatioDeltaWidth;
                }
                else {
                    newBounds.left = this._localBounds.left - aspectRatioDeltaWidth / 2;
                    newBounds.right = this._localBounds.right + aspectRatioDeltaWidth / 2;
                }
            }
        }
        // apply bounds changes to all controls
        const edges = ["left", "top", "right", "bottom"];
        for (const node of this.props.globalState.selectedControls) {
            const initialBounds = node.metadata.localBounds;
            const nb = initialBounds.clone();
            // account for rotation: if other control is rotated 90 degrees
            // relative to primary control, we should modify top instead of left
            const rotationModifier = (modulo(this.props.control.rotation - node.rotation, Math.PI * 2) / Math.PI) * 2;
            edges.forEach((edge, index) => {
                const modifiedIndex = Math.round(index + rotationModifier) % 4;
                const flipSign = index < 2 === modifiedIndex < 2 ? 1 : -1;
                nb[edges[modifiedIndex]] += (newBounds[edge] - this._localBounds[edge]) * flipSign;
            });
            nb.left = Math.min(initialBounds.right - 1, nb.left);
            nb.top = Math.min(initialBounds.bottom - 1, nb.top);
            nb.right = Math.max(initialBounds.left + 1, nb.right);
            nb.bottom = Math.max(initialBounds.top + 1, nb.bottom);
            node.metadata.localBounds = nb;
        }
        this._localBounds = newBounds;
    }
    _updateNodeFromLocalBounds() {
        const scalePoint = this.state.scalePoints[this.state.scalePointDragging];
        const left = scalePoint.horizontalPosition === ScalePointPosition.Left && scalePoint.verticalPosition !== ScalePointPosition.Center;
        const top = scalePoint.verticalPosition === ScalePointPosition.Top && scalePoint.horizontalPosition !== ScalePointPosition.Center;
        for (const selectedControl of this.props.globalState.selectedControls) {
            const width = selectedControl.metadata.localBounds.right - selectedControl.metadata.localBounds.left;
            const height = selectedControl.metadata.localBounds.bottom - selectedControl.metadata.localBounds.top;
            // calculate the center point
            const localRotation = CoordinateHelper.GetRotation(selectedControl, true);
            const localScaling = CoordinateHelper.GetScale(selectedControl, true);
            const absoluteCenter = selectedControl.metadata.localBounds.center;
            const center = absoluteCenter.clone();
            // move to pivot
            center.multiplyInPlace(localScaling);
            const cosRotation = Math.cos(localRotation);
            const sinRotation = Math.sin(localRotation);
            const cosRotation180 = Math.cos(localRotation + Math.PI);
            const sinRotation180 = Math.sin(localRotation + Math.PI);
            const widthDelta = (selectedControl.metadata.storedValues.width - width) * 0.5;
            const heightDelta = (selectedControl.metadata.storedValues.height - height) * 0.5;
            // alignment compensation
            switch (selectedControl.horizontalAlignment) {
                case Control.HORIZONTAL_ALIGNMENT_LEFT:
                    center.x += (left ? widthDelta : -absoluteCenter.x) * cosRotation;
                    center.y += (left ? -widthDelta : absoluteCenter.x) * sinRotation;
                    break;
                case Control.HORIZONTAL_ALIGNMENT_RIGHT:
                    center.x += (left ? -widthDelta : absoluteCenter.x) * cosRotation;
                    center.y += (left ? widthDelta : -absoluteCenter.x) * sinRotation;
                    break;
            }
            switch (selectedControl.verticalAlignment) {
                case Control.VERTICAL_ALIGNMENT_TOP:
                    center.y += (top ? -heightDelta : absoluteCenter.y) * cosRotation180;
                    center.x += (top ? -heightDelta : absoluteCenter.y) * sinRotation180;
                    break;
                case Control.VERTICAL_ALIGNMENT_BOTTOM:
                    center.y += (top ? heightDelta : -absoluteCenter.y) * cosRotation180;
                    center.x += (top ? heightDelta : -absoluteCenter.y) * sinRotation180;
                    break;
            }
            // rotate the center around 0,0
            const rotatedCenter = this._rotate(center.x, center.y, 0, 0, localRotation);
            const properties = ["left", "top", "width", "height"];
            for (const property of properties) {
                let newPixels = 0;
                switch (property) {
                    case "left":
                        newPixels = round(selectedControl.metadata.storedValues.left + rotatedCenter.x);
                        break;
                    case "top":
                        newPixels = round(selectedControl.metadata.storedValues.top + rotatedCenter.y);
                        break;
                    case "width":
                        newPixels = round(width);
                        break;
                    case "height":
                        newPixels = round(height);
                        break;
                }
                // compute real change in property
                const initialUnit = selectedControl[`_${property}`].unit;
                selectedControl[`${property}InPixels`] = newPixels;
                if (initialUnit === ValueAndUnit.UNITMODE_PERCENTAGE) {
                    CoordinateHelper.ConvertToPercentage(selectedControl, [property]);
                }
            }
            if (selectedControl.typeName === "Image") {
                selectedControl.autoScale = false;
            }
            else if (selectedControl.typeName === "TextBlock") {
                selectedControl.resizeToFit = false;
            }
        }
    }
    render() {
        return (_jsxs("div", { className: "gizmo", children: [lines.map((line, index) => {
                    const start = this.state.scalePoints[line[0]];
                    const end = this.state.scalePoints[line[1]];
                    // the vector between start and end
                    const delta = end.position.subtract(start.position);
                    const angle = Math.atan2(delta.y, delta.x);
                    const length = delta.length();
                    return (_jsx("div", { className: "bounding-box-line", style: {
                            left: `${start.position.x + delta.x / 2}px`,
                            top: `${start.position.y + delta.y / 2}px`,
                            width: `${length}px`,
                            transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                        } }, index));
                }), this.state.scalePoints.map((scalePoint, index) => (_jsx(GizmoScalePoint, { clickable: this.state.scalePointDragging === -1 && !scalePoint.isPivot && !this.state.isRotating, scalePoint: scalePoint, onDrag: () => this._beginDraggingScalePoint(index), onRotate: () => this._beginRotate(), onUp: () => this._onUp(), canRotate: true }, index)))] }));
    }
}
//# sourceMappingURL=gizmoGeneric.js.map