import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import style from "./TextInputWithSubmit.modules.scss";
import submitIcon from "../imgs/confirmGridElementDark.svg";
import cancelIcon from "../imgs/deleteGridElementDark.svg";
import { ClassNames } from "./classNames";
/**
 * This component represents a text input that can be submitted or cancelled on buttons
 * @param props properties
 * @returns TextInputWithSubmit element
 */
export const TextInputWithSubmit = (props) => {
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(props.validateValue ? props.validateValue(value) : true);
    useEffect(() => {
        setValid(props.validateValue ? props.validateValue(value) : true);
    }, [value]);
    const onChange = (event) => {
        setValue(event.target.value);
    };
    const onClickSubmit = () => {
        props.submitValue(value);
    };
    const onClickCancel = () => {
        props.cancelSubmit?.();
        setValue("");
    };
    return (_jsxs("div", { className: ClassNames({ line: true, valid, invalid: !valid }, style), children: [props.label && _jsx("label", { children: props.label }), _jsx("input", { className: style.input, type: "text", placeholder: props.placeholder, value: value, onChange: onChange }), _jsxs("div", { children: [_jsx(Button, { color: "light", size: "smaller", backgroundColor: "inherit", onClick: onClickSubmit, disabled: !valid, children: _jsx(Icon, { icon: submitIcon, color: "dark" }) }), _jsx(Button, { color: "light", size: "smaller", backgroundColor: "inherit", onClick: onClickCancel, children: _jsx(Icon, { icon: cancelIcon, color: "dark" }) })] })] }));
};
//# sourceMappingURL=TextInputWithSubmit.js.map