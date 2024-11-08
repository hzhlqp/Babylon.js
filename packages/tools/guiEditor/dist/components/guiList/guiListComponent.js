import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/naming-convention */
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { DraggableLineComponent } from "shared-ui-components/lines/draggableLineComponent";
import "./guiList.scss";
export class GuiListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filter: "" };
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
    render() {
        // Block types used to create the menu from
        const allBlocks = {
            Buttons: ["TextButton", "ImageButton"],
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Controls: ["Slider", "Checkbox", "ColorPicker", "VirtualKeyboard"],
            Containers: ["DisplayGrid", "Grid", "StackPanel"],
            Shapes: ["Ellipse", "Image", "Line", "Rectangle"],
            Inputs: ["Text", "InputText", "InputPassword"],
        };
        // Create node menu
        const blockMenu = [];
        for (const key in allBlocks) {
            const blockList = allBlocks[key]
                .filter((b) => !this.state.filter || b.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
                .sort((a, b) => a.localeCompare(b))
                .map((block) => {
                return _jsx(DraggableLineComponent, { format: "babylonjs-gui-node", data: block, tooltip: GuiListComponent._Tooltips[block] || "" }, block);
            });
            if (blockList.length) {
                blockMenu.push(_jsx(LineContainerComponent, { title: key.replace("__", ": ").replace("_", " "), closed: false, children: blockList }, key + " blocks"));
            }
        }
        return (_jsx("div", { id: "guiList", children: _jsx("div", { className: "panes", children: _jsxs("div", { className: "pane", children: [_jsx("div", { className: "filter", children: _jsx("input", { type: "text", placeholder: "Filter", onChange: (evt) => this.filterContent(evt.target.value) }) }), _jsx("div", { className: "list-container", children: blockMenu })] }) }) }));
    }
}
GuiListComponent._Tooltips = {
    Button: "A simple button",
};
//# sourceMappingURL=guiListComponent.js.map