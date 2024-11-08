import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { IndentedTextLineComponent } from "shared-ui-components/lines/indentedTextLineComponent";
export class CommonPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    renderLevel(jsonObject) {
        const components = [];
        for (const data in jsonObject) {
            const value = jsonObject[data];
            const type = Object.prototype.toString.call(value);
            switch (type) {
                case "[object String]":
                    components.push(_jsx(TextLineComponent, { label: data, ignoreValue: true }, data));
                    components.push(_jsx(IndentedTextLineComponent, { value: value }, data + value));
                    break;
                case "[object Array]":
                    components.push(_jsx(TextLineComponent, { label: data, ignoreValue: true }, data));
                    for (const entry of value) {
                        components.push(_jsx(IndentedTextLineComponent, { value: entry }, data + entry));
                    }
                    break;
                case "[object Object]":
                    components.push(_jsx(TextLineComponent, { label: data, ignoreValue: true }, data));
                    for (const entryKey in value) {
                        components.push(_jsx(TextLineComponent, { label: entryKey, value: value[entryKey], additionalClass: "reduced-opacity" }, data + entryKey));
                    }
                    break;
            }
        }
        return components;
    }
    render() {
        if (!this.props.host.metadata) {
            return null;
        }
        if (!this.props.host.metadata.xmp) {
            return null;
        }
        return (_jsx("div", { children: _jsx(LineContainerComponent, { title: "XMP METADATA", selection: this.props.globalState, children: this.renderLevel(this.props.host.metadata.xmp) }) }));
    }
}
//# sourceMappingURL=commonPropertyGridComponent.js.map