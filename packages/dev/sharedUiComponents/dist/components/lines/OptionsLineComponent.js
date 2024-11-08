import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TextInputWithSubmit } from "../TextInputWithSubmit";
import style from "./OptionsLineComponent.modules.scss";
/**
 * We have two possible states. The user starts in the Default option, and can choose to
 * add a new option.
 */
var OptionStates;
(function (OptionStates) {
    OptionStates[OptionStates["Default"] = 0] = "Default";
    OptionStates[OptionStates["Adding"] = 1] = "Adding";
})(OptionStates || (OptionStates = {}));
const _OptionAddKey = "addCustomOption";
export const OptionsLineComponent = (props) => {
    const [optionState, setOptionState] = useState(OptionStates.Default); // State of the component
    const onOptionChange = (evt) => {
        if (evt.target.value === _OptionAddKey) {
            setOptionState(OptionStates.Adding);
        }
        else {
            props.onOptionSelected(evt.target.value);
        }
    };
    const onOptionAdd = (value) => {
        const newOptionText = value;
        const newOption = { label: newOptionText, value: newOptionText, id: Date.now().toString() };
        props.onOptionAdded?.(newOption);
        props.onOptionSelected(newOption.value);
        setOptionState(OptionStates.Default);
    };
    const onCancelOptionAdd = () => {
        setOptionState(OptionStates.Default);
    };
    return (_jsxs("div", { className: style.optionsLine, children: [optionState === OptionStates.Adding && (_jsx(TextInputWithSubmit, { submitValue: onOptionAdd, placeholder: props.addOptionPlaceholder, validateValue: props.validateNewOptionValue, cancelSubmit: onCancelOptionAdd })), optionState === OptionStates.Default && (_jsxs("select", { className: style.optionsSelect, onChange: onOptionChange, value: props.selectedOptionValue, children: [props.onOptionAdded && (_jsx("option", { value: _OptionAddKey, children: props.addOptionText ?? "Custom" }, _OptionAddKey)), props.options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.id)))] }))] }));
};
//# sourceMappingURL=OptionsLineComponent.js.map