import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import clipContentsIcon from "shared-ui-components/imgs/clipContentsIcon.svg";
import clipChildrenIcon from "shared-ui-components/imgs/clipChildrenIcon.svg";
import autoStretchWidthIcon from "shared-ui-components/imgs/autoStretchWidthIcon.svg";
import autoStretchHeightIcon from "shared-ui-components/imgs/autoStretchHeightIcon.svg";
import adtIcon from "../../../../imgs/adtIcon.svg";
import { IconComponent } from "shared-ui-components/lines/iconComponent";
export class ContainerPropertyGridComponent extends React.Component {
    render() {
        const { containers, onPropertyChangedObservable } = this.props;
        const proxy = makeTargetsProxy(containers, onPropertyChangedObservable);
        return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: clipContentsIcon, label: "Clips content outside the bounding box of this control" }), _jsx(CheckBoxLineComponent, { label: "CLIP CONTENT", target: proxy, propertyName: "clipContent" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: clipChildrenIcon, label: "Clips child controls to this control's shape" }), _jsx(CheckBoxLineComponent, { label: "CLIP CHILDREN", target: proxy, propertyName: "clipChildren" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: autoStretchWidthIcon, label: "Makes the container's width automatically adapt to its children" }), _jsx(CheckBoxLineComponent, { label: "ADAPT WIDTH TO CHILDREN", target: proxy, propertyName: "adaptWidthToChildren" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: autoStretchHeightIcon, label: "Makes the container's height automatically adapt to its children" }), _jsx(CheckBoxLineComponent, { label: "ADAPT HEIGHT TO CHILDREN", target: proxy, propertyName: "adaptHeightToChildren" })] }), _jsxs("div", { className: "ge-divider", children: [_jsx(IconComponent, { icon: adtIcon, label: "Delegates picking to children controls" }), _jsx(CheckBoxLineComponent, { label: "DELEGATE PICKING TO CHILDREN", target: proxy, propertyName: "delegatePickingToChildren" })] })] }));
    }
}
//# sourceMappingURL=containerPropertyGridComponent.js.map