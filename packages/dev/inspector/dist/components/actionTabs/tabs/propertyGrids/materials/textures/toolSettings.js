import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
export class ToolSettings extends React.Component {
    render() {
        if (!this.props.tool || !this.props.tool.settingsComponent)
            return _jsx(_Fragment, {});
        return _jsx("div", { id: "tool-ui", children: _jsx(this.props.tool.settingsComponent, { instance: this.props.tool.instance }) });
    }
}
//# sourceMappingURL=toolSettings.js.map