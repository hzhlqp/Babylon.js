import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
export class VariantsPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    _getVariantsExtension() {
        return this.props.globalState?.glTFLoaderExtensions["KHR_materials_variants"];
    }
    render() {
        const extension = this._getVariantsExtension();
        if (!extension) {
            return null;
        }
        const variants = extension.getAvailableVariants(this.props.host);
        if (!variants || variants.length === 0) {
            return null;
        }
        const options = variants.sort().map((v, i) => {
            return { label: v, value: i + 1 };
        });
        options.splice(0, 0, { label: "Original", value: 0 });
        return (_jsx("div", { children: _jsx(LineContainerComponent, { title: "VARIANTS", selection: this.props.globalState, children: _jsx(OptionsLine, { label: "Active variant", options: options, noDirectUpdate: true, target: this.props.host, propertyName: "", onSelect: (value) => {
                        const valueAsNumber = value;
                        if (valueAsNumber === 0) {
                            extension.reset(this.props.host);
                        }
                        else {
                            extension.selectVariant(this.props.host, variants[valueAsNumber - 1]);
                        }
                        this.forceUpdate();
                    }, extractValue: () => {
                        const lastPickedVariant = extension.getLastSelectedVariant(this.props.host) || 0;
                        let index = 0;
                        if (lastPickedVariant && Object.prototype.toString.call(lastPickedVariant) === "[object String]") {
                            index = variants.indexOf(lastPickedVariant);
                            if (index > -1) {
                                index = index + 1;
                            }
                        }
                        return index;
                    } }) }) }));
    }
}
//# sourceMappingURL=variantsPropertyGridComponent.js.map