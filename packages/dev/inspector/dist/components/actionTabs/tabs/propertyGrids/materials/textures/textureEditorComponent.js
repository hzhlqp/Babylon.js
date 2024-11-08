import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { TextureCanvasManager } from "./textureCanvasManager";
import { ToolBar } from "./toolBar";
import { PropertiesBar } from "./propertiesBar";
import { ChannelsBar } from "./channelsBar";
import { BottomBar } from "./bottomBar";
import { TextureCanvasComponent } from "./textureCanvasComponent";
import defaultTools from "./defaultTools/defaultTools";
import { Tools } from "core/Misc/tools";
import { ToolSettings } from "./toolSettings";
import { Constants } from "core/Engines/constants";
import "./textureEditor.scss";
export class TextureEditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this._uiCanvas = React.createRef();
        this._2DCanvas = React.createRef();
        this._3DCanvas = React.createRef();
        this._pickerRef = React.createRef();
        const channels = [
            { name: "Red", visible: true, editable: true, id: "R", icon: require("./assets/channelR.svg") },
            { name: "Green", visible: true, editable: true, id: "G", icon: require("./assets/channelG.svg") },
            { name: "Blue", visible: true, editable: true, id: "B", icon: require("./assets/channelB.svg") },
        ];
        if (this.props.texture.isCube) {
            channels.push({ name: "Display", visible: true, editable: true, id: "A", icon: require("./assets/channelD.svg") });
        }
        else {
            channels.push({ name: "Alpha", visible: true, editable: true, id: "A", icon: require("./assets/channelA.svg") });
        }
        this.state = {
            tools: [],
            activeToolIndex: -1,
            metadata: {
                color: "#ffffff",
                alpha: 1,
                select: {
                    x1: -1,
                    y1: -1,
                    x2: -1,
                    y2: -1,
                },
            },
            channels,
            pixelData: {},
            face: 0,
            mipLevel: 0,
            pickerOpen: false,
        };
        this.loadToolFromURL = this.loadToolFromURL.bind(this);
        this.changeTool = this.changeTool.bind(this);
        this.setMetadata = this.setMetadata.bind(this);
        this.saveTexture = this.saveTexture.bind(this);
        this.resetTexture = this.resetTexture.bind(this);
        this.resizeTexture = this.resizeTexture.bind(this);
        this.uploadTexture = this.uploadTexture.bind(this);
        this.setPickerOpen = this.setPickerOpen.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
    }
    componentDidMount() {
        this._textureCanvasManager = new TextureCanvasManager(this.props.texture, this.props.window.current.getWindow(), this._uiCanvas.current, this._2DCanvas.current, this._3DCanvas.current, (data) => {
            this.setState({ pixelData: data });
        }, this.state.metadata, () => this.textureDidUpdate(), (data) => this.setMetadata(data), (mipLevel) => this.setState({ mipLevel }));
        this.addTools(defaultTools);
    }
    componentDidUpdate() {
        const channelsClone = [];
        this.state.channels.forEach((channel) => channelsClone.push({ ...channel }));
        this._textureCanvasManager.channels = channelsClone;
        this._textureCanvasManager.face = this.state.face;
        this._textureCanvasManager.mipLevel = this.state.mipLevel;
    }
    componentWillUnmount() {
        this._textureCanvasManager.dispose();
    }
    textureDidUpdate() {
        if (this._timer != null) {
            window.clearTimeout(this._timer);
        }
        this._timer = window.setTimeout(() => {
            this.props.onUpdate();
            this._timer = null;
        }, TextureEditorComponent._PREVIEW_UPDATE_DELAY_MS);
    }
    loadToolFromURL(url) {
        Tools.LoadScript(url, () => {
            this.addTools([_TOOL_DATA_]);
        });
    }
    addTools(tools) {
        let newTools = [];
        tools.forEach((toolData) => {
            const tool = {
                ...toolData,
                instance: new toolData.type(() => this.getToolParameters()),
            };
            newTools = newTools.concat(tool);
        });
        newTools = this.state.tools.concat(newTools);
        this.setState({ tools: newTools });
    }
    getToolParameters() {
        return {
            scene: this._textureCanvasManager.scene,
            canvas2D: this._textureCanvasManager.canvas2D,
            scene3D: this._textureCanvasManager.scene3D,
            size: this._textureCanvasManager.size,
            updateTexture: () => this._textureCanvasManager.updateTexture(),
            startPainting: () => this._textureCanvasManager.startPainting(),
            stopPainting: () => this._textureCanvasManager.stopPainting(),
            updatePainting: () => this._textureCanvasManager.updatePainting(),
            metadata: this.state.metadata,
            setMetadata: (data) => this.setMetadata(data),
            getMouseCoordinates: (pointerInfo) => this._textureCanvasManager.getMouseCoordinates(pointerInfo),
            interactionEnabled: () => this._textureCanvasManager.toolInteractionEnabled(),
        };
    }
    changeTool(index) {
        if (index != -1) {
            this._textureCanvasManager.tool = this.state.tools[index];
        }
        else {
            this._textureCanvasManager.tool = null;
        }
        this.setState({ activeToolIndex: index });
    }
    setMetadata(newMetadata) {
        const data = {
            ...this.state.metadata,
            ...newMetadata,
        };
        this.setState({ metadata: data });
        this._textureCanvasManager.metadata = data;
    }
    setPickerOpen(open) {
        this.setState({ pickerOpen: open });
    }
    onPointerDown(evt) {
        if (!this._pickerRef.current?.contains(evt.target)) {
            this.setPickerOpen(false);
        }
    }
    saveTexture() {
        this._textureCanvasManager.saveTexture();
    }
    resetTexture() {
        this._textureCanvasManager.reset();
    }
    resizeTexture(width, height) {
        this._textureCanvasManager.resize({ width, height });
    }
    uploadTexture(file) {
        this._textureCanvasManager.upload(file);
    }
    render() {
        const currentTool = this.state.tools[this.state.activeToolIndex];
        let cursor = `initial`;
        if (!this._textureCanvasManager?.toolInteractionEnabled()) {
            cursor = `pointer`;
        }
        else if (currentTool && currentTool.cursor) {
            cursor = `url(data:image/png;base64,${currentTool.cursor}) 10 10, auto`;
        }
        return (_jsxs("div", { id: "texture-editor", onPointerDown: this.onPointerDown, style: { cursor }, children: [_jsx(PropertiesBar, { texture: this.props.texture, saveTexture: this.saveTexture, pixelData: this.state.pixelData, face: this.state.face, setFace: (face) => this.setState({ face }), resetTexture: this.resetTexture, resizeTexture: this.resizeTexture, uploadTexture: this.uploadTexture, mipLevel: this.state.mipLevel, setMipLevel: (mipLevel) => this.setState({ mipLevel }), size: this._textureCanvasManager?.size || this.props.texture.getSize() }), !this.props.texture.isCube && (_jsx(ToolBar, { tools: this.state.tools, activeToolIndex: this.state.activeToolIndex, addTool: this.loadToolFromURL, changeTool: this.changeTool, metadata: this.state.metadata, setMetadata: this.setMetadata, pickerOpen: this.state.pickerOpen, setPickerOpen: this.setPickerOpen, pickerRef: this._pickerRef, hasAlpha: this.props.texture.textureFormat === -1 || this.props.texture.textureFormat === Constants.TEXTUREFORMAT_RGBA })), _jsx(ChannelsBar, { channels: this.state.channels, setChannels: (channels) => {
                        this.setState({ channels });
                    } }), _jsx(TextureCanvasComponent, { canvas2D: this._2DCanvas, canvas3D: this._3DCanvas, canvasUI: this._uiCanvas, texture: this.props.texture }), _jsx(ToolSettings, { tool: currentTool }), _jsx(BottomBar, { texture: this.props.texture, mipLevel: this.state.mipLevel })] }));
    }
}
TextureEditorComponent._PREVIEW_UPDATE_DELAY_MS = 160;
//# sourceMappingURL=textureEditorComponent.js.map