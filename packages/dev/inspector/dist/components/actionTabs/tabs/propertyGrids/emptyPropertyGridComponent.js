import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { CustomPropertyGridComponent } from "./customPropertyGridComponent";
export class EmptyPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (_jsx(CustomPropertyGridComponent, { globalState: this.props.globalState, lockObject: this.props.lockObject, target: this.props.item, onPropertyChangedObservable: this.props.onPropertyChangedObservable }));
    }
}
//# sourceMappingURL=emptyPropertyGridComponent.js.map