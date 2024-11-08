import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/naming-convention */
import * as React from "react";
import { LineContainerComponent } from "../../sharedComponents/lineContainerComponent";
import { DraggableLineComponent } from "../../sharedComponents/draggableLineComponent";
import { DraggableLineWithButtonComponent } from "../../sharedComponents/draggableLineWithButtonComponent";
import { LineWithFileButtonComponent } from "../../sharedComponents/lineWithFileButtonComponent";
import { Tools } from "core/Misc/tools";
import addButton from "../../imgs/add.svg";
import deleteButton from "../../imgs/delete.svg";
import { NodeLedger } from "shared-ui-components/nodeGraphSystem/nodeLedger";
import "./nodeList.scss";
export class NodeListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filter: "" };
        const frameJson = localStorage.getItem("Custom-Frame-List");
        if (frameJson) {
            this._customFrameList = JSON.parse(frameJson);
        }
        this._onResetRequiredObserver = this.props.globalState.onResetRequiredObservable.add(() => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        this.props.globalState.onResetRequiredObservable.remove(this._onResetRequiredObserver);
    }
    filterContent(filter) {
        this.setState({ filter: filter });
    }
    loadCustomFrame(file) {
        Tools.ReadFile(file, async (data) => {
            // get Frame Data from file
            const decoder = new TextDecoder("utf-8");
            const frameData = JSON.parse(decoder.decode(data));
            const frameName = frameData.editorData.frames[0].name + "Custom";
            const frameToolTip = frameData.editorData.frames[0].comments || "";
            try {
                localStorage.setItem(frameName, JSON.stringify(frameData));
            }
            catch (error) {
                this.props.globalState.stateManager.onErrorMessageDialogRequiredObservable.notifyObservers("Error Saving Frame");
                return;
            }
            const frameJson = localStorage.getItem("Custom-Frame-List");
            let frameList = {};
            if (frameJson) {
                frameList = JSON.parse(frameJson);
            }
            frameList[frameName] = frameToolTip;
            localStorage.setItem("Custom-Frame-List", JSON.stringify(frameList));
            this._customFrameList = frameList;
            this.forceUpdate();
        }, undefined, true);
    }
    removeItem(value) {
        const frameJson = localStorage.getItem("Custom-Frame-List");
        if (frameJson) {
            const registeredIdx = NodeLedger.RegisteredNodeNames.indexOf(value);
            if (registeredIdx !== -1) {
                NodeLedger.RegisteredNodeNames.splice(registeredIdx, 1);
            }
            const frameList = JSON.parse(frameJson);
            delete frameList[value];
            localStorage.removeItem(value);
            localStorage.setItem("Custom-Frame-List", JSON.stringify(frameList));
            this._customFrameList = frameList;
            this.forceUpdate();
        }
    }
    render() {
        const customFrameNames = [];
        for (const frame in this._customFrameList) {
            customFrameNames.push(frame);
        }
        // Block types used to create the menu from
        const allBlocks = {
            Custom_Frames: customFrameNames,
            Inputs: ["TextureBlock", "TextureBackBufferBlock", "TextureBackBufferDepthStencilBlock", "TextureDepthStencilBlock", "ObjectListBlock", "CameraBlock"],
            Post_Processes: ["BlackAndWhiteBlock", "BloomBlock", "BlurBlock", "CircleOfConfusionBlock", "DepthOfFieldBlock", "ExtractHighlightsBlock"],
            Misc: ["ElbowBlock", "TeleportInBlock", "TeleportOutBlock", "GUIBlock"],
            Textures: ["ClearBlock", "CopyTextureBlock", "GenerateMipmapsBlock"],
            Output_Nodes: ["OutputBlock"],
            Rendering: ["ObjectRendererBlock", "GeometryRendererBlock", "CullBlock"],
        };
        // Create node menu
        const blockMenu = [];
        for (const key in allBlocks) {
            const blockList = allBlocks[key]
                .filter((b) => !this.state.filter || b.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
                .sort((a, b) => a.localeCompare(b))
                .map((block) => {
                if (key === "Custom_Frames") {
                    return (_jsx(DraggableLineWithButtonComponent, { data: block, tooltip: this._customFrameList[block] || "", iconImage: deleteButton, iconTitle: "Delete", onIconClick: (value) => this.removeItem(value) }, block));
                }
                return _jsx(DraggableLineComponent, { data: block, tooltip: NodeListComponent._Tooltips[block] || "" }, block);
            });
            if (key === "Custom_Frames") {
                const line = (_jsx(LineWithFileButtonComponent, { title: "Add Custom Frame", closed: false, label: "Add...", uploadName: "custom-frame-upload", iconImage: addButton, accept: ".json", onIconClick: (file) => {
                        this.loadCustomFrame(file);
                    } }, "add..."));
                blockList.push(line);
            }
            if (blockList.length) {
                blockMenu.push(_jsx(LineContainerComponent, { title: key.replace("__", ": ").replace("_", " "), closed: false, children: blockList }, key + " blocks"));
            }
            // Register blocks
            const ledger = NodeLedger.RegisteredNodeNames;
            for (const key in allBlocks) {
                const blocks = allBlocks[key];
                if (blocks.length) {
                    for (const block of blocks) {
                        if (!ledger.includes(block)) {
                            ledger.push(block);
                        }
                    }
                }
            }
            NodeLedger.NameFormatter = (name) => {
                let finalName = name;
                // custom frame
                if (name.endsWith("Custom")) {
                    const nameIndex = name.lastIndexOf("Custom");
                    finalName = name.substring(0, nameIndex);
                    finalName += " [custom]";
                }
                else {
                    finalName = name.replace("Block", "");
                }
                return finalName;
            };
        }
        return (_jsx("div", { id: "nrgeNodeList", children: _jsx("div", { className: "panes", children: _jsxs("div", { className: "pane", children: [_jsx("div", { className: "filter", children: _jsx("input", { type: "text", placeholder: "Filter", onFocus: () => (this.props.globalState.lockObject.lock = true), onBlur: () => {
                                    this.props.globalState.lockObject.lock = false;
                                }, onChange: (evt) => this.filterContent(evt.target.value) }) }), _jsx("div", { className: "list-container", children: blockMenu })] }) }) }));
    }
}
NodeListComponent._Tooltips = {
    TextureBlock: "Input block set to a texture value",
    TextureBackBufferBlock: "Input block corresponding to the back buffer color texture",
    TextureBackBufferDepthStencilBlock: "Input block corresponding to the back buffer depth/stencil texture",
    TextureDepthStencilBlock: "Input block corresponding to a depth/stencil texture",
    ElbowBlock: "Passthrough block mostly used to organize your graph",
    TeleportInBlock: "Passthrough block mostly used to organize your graph (but without visible lines). It works like a teleportation point for the graph.",
    TeleportOutBlock: "Endpoint for a TeleportInBlock.",
    OutputBlock: "Output block used to gather the final render graph",
    ClearBlock: "Clears a texture",
    CopyTextureBlock: "Copies a texture to another texture",
    GenerateMipmapsBlock: "Generates mipmaps for a texture",
    BlackAndWhiteBlock: "Applies a black and white post process",
    BloomBlock: "Applies a bloom post process",
    BlurBlock: "Applies a blur post process",
    CircleOfConfusionBlock: "Applies a circle of confusion post process",
    DepthOfFieldBlock: "Applies a depth of field post process",
    ExtractHighlightsBlock: "Applies an extract highlights post process",
    GUIBlock: "Used to render a GUI",
    ObjectRendererBlock: "Renders objects to a render target",
    GeometryRendererBlock: "Generates geometry buffers for a list of objects",
    ObjectListBlock: "List of objects (meshes, particle systems, sprites)",
    CullBlock: "Culls a list of objects",
    CameraBlock: "Camera",
};
//# sourceMappingURL=nodeListComponent.js.map