import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { HTMLTwinSceneTree } from "./htmlTwinSceneTree";
export class HTMLTwinHostComponent extends React.Component {
    constructor(props) {
        super(props);
        this._options = props.options ?? {
            addAllControls: true,
        };
    }
    render() {
        return (_jsx("div", { id: "accessibility-host", children: _jsx(HTMLTwinSceneTree, { scene: this.props.scene, options: this._options }) }));
    }
}
//# sourceMappingURL=htmlTwinHostComponent.js.map