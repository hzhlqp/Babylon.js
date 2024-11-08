import { jsx as _jsx } from "react/jsx-runtime";
export function UnitButton(props) {
    return (_jsx("button", { className: "unit", onClick: () => {
            if (props.onClick && !props.locked)
                props.onClick(props.unit || "");
        }, disabled: props.locked, children: props.unit }));
}
//# sourceMappingURL=unitButton.js.map