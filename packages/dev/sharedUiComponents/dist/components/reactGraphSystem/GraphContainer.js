import { jsx as _jsx } from "react/jsx-runtime";
import style from "./GraphContainer.modules.scss";
/**
 * This component is just a simple container to keep the nodes and lines containers
 * together
 * @param props
 * @returns
 */
export const GraphContainer = (props) => {
    return _jsx("div", { className: style.container, children: props.children });
};
//# sourceMappingURL=GraphContainer.js.map