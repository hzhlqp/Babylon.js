import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
export class ParentPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    _getNameForSortingAndDisplay(node) {
        return typeof node.name === "string" ? node.name : "no name";
    }
    render() {
        const node = this.props.node;
        const scene = node.getScene();
        const sortedNodes = scene
            .getNodes()
            .filter((n) => n !== node)
            .sort((a, b) => {
            return this._getNameForSortingAndDisplay(a).localeCompare(this._getNameForSortingAndDisplay(b));
        });
        const nodeOptions = sortedNodes.map((m, i) => {
            return {
                label: this._getNameForSortingAndDisplay(m),
                value: i,
            };
        });
        nodeOptions.splice(0, 0, { label: "None", value: -1 });
        return (_jsxs(_Fragment, { children: [node.parent && (_jsx(TextLineComponent, { label: "Link to parent", value: node.parent.name, onLink: () => this.props.globalState.onSelectionChangedObservable.notifyObservers(node.parent) })), _jsx(OptionsLine, { label: "Parent", options: nodeOptions, target: node, propertyName: "parent", noDirectUpdate: true, onSelect: (value) => {
                        const nodeAsTransform = node;
                        if (typeof value !== "number" || value < 0) {
                            if (nodeAsTransform.setParent) {
                                nodeAsTransform.setParent(null);
                            }
                            else {
                                node.parent = null;
                            }
                        }
                        else {
                            const newParent = sortedNodes[value];
                            if (nodeAsTransform.setParent) {
                                nodeAsTransform.setParent(newParent);
                            }
                            else {
                                node.parent = newParent;
                            }
                        }
                        this.props.globalState.onSelectionRenamedObservable.notifyObservers();
                    }, extractValue: () => (node.parent ? sortedNodes.indexOf(node.parent) : -1), onPropertyChangedObservable: this.props.onPropertyChangedObservable })] }));
    }
}
//# sourceMappingURL=parentPropertyGridComponent.js.map