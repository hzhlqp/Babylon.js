import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { JoinClassNames } from "../classNames";
import { CommandButtonComponent } from "./CommandButtonComponent";
import { CommandDropdownComponent } from "./CommandDropdownComponent";
import hamburgerIcon from "../../imgs/hamburgerIcon.svg";
import pointerIcon from "../../imgs/pointerIcon.svg";
import handIcon from "../../imgs/handIcon.svg";
import zoomIcon from "../../imgs/zoomIcon.svg";
import logoIcon from "../../imgs/babylonLogo.svg";
import canvasFitIcon from "../../imgs/canvasFitIcon.svg";
import betaFlag from "../../imgs/betaFlag.svg";
import style from "./CommandBar.modules.scss";
import { Color3 } from "core/Maths/math.color";
import { ColorPickerLineComponent } from "../lines/ColorPickerLineComponent";
export const CommandBarComponent = (props) => {
    return (_jsxs("div", { className: style.commandBar, children: [_jsxs("div", { className: style.commandsLeft, children: [_jsxs("div", { className: style.divider, children: [_jsx("img", { src: logoIcon, color: "white", className: "active", draggable: false }), _jsx(CommandDropdownComponent
                            //globalState={this.props.globalState}
                            , { 
                                //globalState={this.props.globalState}
                                toRight: true, icon: hamburgerIcon, tooltip: "Options", items: [
                                    {
                                        label: "Save",
                                        onClick: () => {
                                            props.onSaveButtonClicked && props.onSaveButtonClicked();
                                        },
                                    },
                                    {
                                        label: "Load",
                                        fileButton: true,
                                    },
                                    {
                                        label: "Save to snippet",
                                        onClick: () => {
                                            props.onSaveToSnippetButtonClicked && props.onSaveToSnippetButtonClicked();
                                        },
                                    },
                                    {
                                        label: "Load from snippet",
                                        onClick: () => {
                                            props.onLoadFromSnippetButtonClicked && props.onLoadFromSnippetButtonClicked();
                                        },
                                    },
                                    {
                                        label: "Help",
                                        onClick: () => {
                                            props.onHelpButtonClicked && props.onHelpButtonClicked();
                                        },
                                    },
                                    {
                                        label: "Give feedback",
                                        onClick: () => {
                                            props.onGiveFeedbackButtonClicked && props.onGiveFeedbackButtonClicked();
                                        },
                                    },
                                ] }), _jsx(CommandButtonComponent, { tooltip: "Select", icon: pointerIcon, shortcut: "S", isActive: false, onClick: () => {
                                    props.onSelectButtonClicked && props.onSelectButtonClicked();
                                } }), _jsx(CommandButtonComponent, { tooltip: "Pan", icon: handIcon, shortcut: "P", isActive: false, onClick: () => {
                                    props.onPanButtonClicked && props.onPanButtonClicked();
                                } }), _jsx(CommandButtonComponent, { tooltip: "Zoom", shortcut: "Z", icon: zoomIcon, isActive: false, onClick: () => {
                                    props.onZoomButtonClicked && props.onZoomButtonClicked();
                                } })] }), _jsx("div", { className: style.divider, children: _jsx(CommandButtonComponent, { tooltip: "Fit to Window", shortcut: "F", icon: canvasFitIcon, isActive: false, onClick: () => {
                                props.onFitButtonClicked && props.onFitButtonClicked();
                            } }) }), _jsxs("div", { className: JoinClassNames(style, "divider", "padded"), children: [_jsx("div", { style: { paddingRight: "5px" }, children: "Artboard:" }), props.onArtboardColorChanged && (_jsx(ColorPickerLineComponent, { backgroundColor: props.artboardColorPickerColor || "#888888", value: props.artboardColor ? Color3.FromHexString(props.artboardColor) : new Color3(0, 0, 0), onColorChanged: (newColor) => {
                                    if (props.onArtboardColorChanged) {
                                        props.onArtboardColorChanged(newColor);
                                    }
                                } }))] }), _jsx("div", { className: style.divider, children: props.children })] }), _jsx("div", { className: style.commandsRight, children: _jsx("img", { src: betaFlag, className: style.betaFlag, draggable: false }) })] }));
};
//# sourceMappingURL=CommandBarComponent.js.map