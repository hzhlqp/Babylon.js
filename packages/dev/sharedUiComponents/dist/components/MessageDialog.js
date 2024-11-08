import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect } from "react";
import { ClassNames } from "./classNames";
import styles from "./MessageDialog.modules.scss";
export const MessageDialog = (props) => {
    const [message, setMessage] = useState(props.message);
    const [isError, setIsError] = useState(props.isError);
    useEffect(() => {
        setMessage(props.message);
        setIsError(props.isError);
    }, [props]);
    const onClick = () => {
        setMessage("");
        if (props.onClose) {
            props.onClose();
        }
    };
    if (!message) {
        return null;
    }
    return (_jsx("div", { className: styles["dialog-container"], children: _jsxs("div", { className: styles["dialog"], children: [_jsx("div", { className: styles["dialog-message"], children: message }), _jsx("div", { className: styles["dialog-buttons"], children: _jsx("div", { className: ClassNames({ "dialog-button-ok": true, error: isError }, styles), onClick: onClick, children: "OK" }) })] }) }));
};
//# sourceMappingURL=MessageDialog.js.map