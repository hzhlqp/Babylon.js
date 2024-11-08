import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Tools } from "core/Misc/tools";
import { StringTools } from "shared-ui-components/stringTools";
import { LockObject } from "shared-ui-components/tabs/propertyGrids/lockObject";
import { SliderGenericPropertyGridComponent } from "./propertyGrids/gui/sliderGenericPropertyGridComponent";
import { LinePropertyGridComponent } from "./propertyGrids/gui/linePropertyGridComponent";
import { RadioButtonPropertyGridComponent } from "./propertyGrids/gui/radioButtonPropertyGridComponent";
import { TextBlockPropertyGridComponent } from "./propertyGrids/gui/textBlockPropertyGridComponent";
import { InputTextPropertyGridComponent } from "./propertyGrids/gui/inputTextPropertyGridComponent";
import { ColorPickerPropertyGridComponent } from "./propertyGrids/gui/colorPickerPropertyGridComponent";
import { ImagePropertyGridComponent } from "./propertyGrids/gui/imagePropertyGridComponent";
import { ImageBasedSliderPropertyGridComponent } from "./propertyGrids/gui/imageBasedSliderPropertyGridComponent";
import { RectanglePropertyGridComponent } from "./propertyGrids/gui/rectanglePropertyGridComponent";
import { StackPanelPropertyGridComponent } from "./propertyGrids/gui/stackPanelPropertyGridComponent";
import { GridPropertyGridComponent } from "./propertyGrids/gui/gridPropertyGridComponent";
import { ScrollViewerPropertyGridComponent } from "./propertyGrids/gui/scrollViewerPropertyGridComponent";
import { EllipsePropertyGridComponent } from "./propertyGrids/gui/ellipsePropertyGridComponent";
import { CheckboxPropertyGridComponent } from "./propertyGrids/gui/checkboxPropertyGridComponent";
import { ControlPropertyGridComponent } from "./propertyGrids/gui/controlPropertyGridComponent";
import { AdvancedDynamicTexture } from "gui/2D/advancedDynamicTexture";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { ParentingPropertyGridComponent } from "../parentingPropertyGridComponent";
import { DisplayGridPropertyGridComponent } from "./propertyGrids/gui/displayGridPropertyGridComponent";
import { ButtonPropertyGridComponent } from "./propertyGrids/gui/buttonPropertyGridComponent";
import { GUINodeTools } from "../../guiNodeTools";
import { makeTargetsProxy } from "shared-ui-components/lines/targetsProxy";
import "./propertyTab.scss";
import adtIcon from "../../imgs/adtIcon.svg";
import { ControlTypes } from "../../controlTypes";
import { EncodeArrayBufferToBase64 } from "core/Misc/stringTools";
export class PropertyTabComponent extends React.Component {
    constructor(props) {
        super(props);
        this.saveLocally = () => {
            try {
                const json = JSON.stringify(this.props.globalState.guiTexture.serializeContent());
                StringTools.DownloadAsFile(this.props.globalState.hostDocument, json, "guiTexture.json");
            }
            catch (error) {
                this.props.globalState.hostWindow.alert("Unable to save your GUI");
                Tools.Error("Unable to save your GUI");
            }
        };
        /**
         * Save the selected control as Json with file name of guiControl
         */
        this.saveSelectedControlLocally = () => {
            try {
                const serializationObject = {
                    controls: [],
                };
                for (const control of this.props.globalState.selectedControls) {
                    const controlSerializationObject = {};
                    control.serialize(controlSerializationObject);
                    serializationObject.controls.push(controlSerializationObject);
                }
                const json = JSON.stringify(serializationObject);
                StringTools.DownloadAsFile(this.props.globalState.hostDocument, json, "guiControl.json");
            }
            catch (error) {
                this.props.globalState.hostWindow.alert("Unable to save your selected Control");
                Tools.Error("Unable to save your selected Control");
            }
        };
        this.saveToSnippetServerHelper = (content, adt) => {
            return new Promise((resolve, reject) => {
                const xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = () => {
                    if (xmlHttp.readyState == 4) {
                        if (xmlHttp.status == 200) {
                            const snippet = JSON.parse(xmlHttp.responseText);
                            const oldId = adt.snippetId;
                            adt.snippetId = snippet.id;
                            if (snippet.version && snippet.version != "0") {
                                adt.snippetId += "#" + snippet.version;
                            }
                            const windowAsAny = window;
                            if (windowAsAny.Playground && oldId) {
                                windowAsAny.Playground.onRequestCodeChangeObservable.notifyObservers({
                                    regex: new RegExp(oldId, "g"),
                                    replace: adt.snippetId,
                                });
                            }
                            resolve(adt.snippetId);
                        }
                        else {
                            reject("Unable to save your GUI");
                        }
                    }
                };
                // Check if we need to encode it to store the unicode characters (same approach as PR #12391)
                const encoder = new TextEncoder();
                const buffer = encoder.encode(content);
                let testData = "";
                for (let i = 0; i < buffer.length; i++) {
                    testData += String.fromCharCode(buffer[i]);
                }
                const isUnicode = testData !== content;
                const objToSend = {
                    gui: content,
                    encodedGui: isUnicode ? EncodeArrayBufferToBase64(buffer) : undefined,
                };
                xmlHttp.open("POST", AdvancedDynamicTexture.SnippetUrl + (adt.snippetId ? "/" + adt.snippetId : ""), true);
                xmlHttp.setRequestHeader("Content-Type", "application/json");
                const dataToSend = {
                    payload: JSON.stringify(objToSend),
                    name: "",
                    description: "",
                    tags: "",
                };
                xmlHttp.send(JSON.stringify(dataToSend));
            });
        };
        this.saveToSnippetServer = async () => {
            const adt = this.props.globalState.guiTexture;
            const content = JSON.stringify(adt.serializeContent());
            const savePromise = this.props.globalState.customSave?.action || this.saveToSnippetServerHelper;
            savePromise(content, adt)
                .then((snippetId) => {
                adt.snippetId = snippetId;
                const alertMessage = `GUI saved with ID:  ${adt.snippetId}`;
                if (this.props.globalState.hostWindow.navigator.clipboard) {
                    this.props.globalState.hostWindow.navigator.clipboard
                        .writeText(adt.snippetId)
                        .then(() => {
                        this.props.globalState.hostWindow.alert(`${alertMessage}. The ID was copied to your clipboard.`);
                    })
                        .catch(() => {
                        this.props.globalState.hostWindow.alert(alertMessage);
                    });
                }
                else {
                    this.props.globalState.hostWindow.alert(alertMessage);
                }
                this.props.globalState.onBuiltObservable.notifyObservers();
            })
                .catch((err) => {
                this.props.globalState.hostWindow.alert(err);
            });
            this.forceUpdate();
        };
        this._lockObject = new LockObject();
        this.props.globalState.lockObject = this._lockObject;
        this.props.globalState.onSaveObservable.add(() => {
            this.save(this.saveLocally);
        });
        this.props.globalState.onSaveSelectedControl.add(() => {
            this.save(this.saveSelectedControlLocally);
        });
        this.props.globalState.onSnippetSaveObservable.add(() => {
            this.save(this.saveToSnippetServer);
        });
        this.props.globalState.onSnippetLoadObservable.add(() => {
            this.loadFromSnippet();
        });
        this.props.globalState.onPropertyGridUpdateRequiredObservable.add(() => {
            this.forceUpdate();
        });
        this.props.globalState.onLoadObservable.add((file) => this.load(file));
        this.props.globalState.onControlLoadObservable.add((file) => this.loadControl(file));
    }
    componentDidMount() {
        this.props.globalState.onSelectionChangedObservable.add(() => {
            this.forceUpdate();
        });
        this.props.globalState.onResizeObservable.add(() => {
            this.forceUpdate();
        });
        this._onBuiltObserver = this.props.globalState.onBuiltObservable.add(() => {
            this.forceUpdate();
        });
        this.props.globalState.onPropertyChangedObservable.add(() => this.forceUpdate());
    }
    componentWillUnmount() {
        window.clearInterval(this._timerIntervalId);
        this.props.globalState.onBuiltObservable.remove(this._onBuiltObserver);
    }
    load(file) {
        Tools.ReadFile(file, (data) => {
            const decoder = new TextDecoder("utf-8");
            this.props.globalState.workbench.loadFromJson(JSON.parse(decoder.decode(data)));
            this.props.globalState.setSelection([]);
        }, undefined, true);
    }
    /**
     * Read loaded file
     * @param file
     */
    loadControl(file) {
        Tools.ReadFile(file, (data) => {
            const decoder = new TextDecoder("utf-8");
            this.props.globalState.workbench.loadControlFromJson(JSON.parse(decoder.decode(data)));
        }, undefined, true);
    }
    save(saveCallback) {
        this.props.globalState.workbench.removeEditorTransformation();
        const allControls = this.props.globalState.guiTexture.rootContainer.getDescendants();
        for (const control of allControls) {
            this.props.globalState.workbench.removeEditorBehavior(control);
        }
        const size = this.props.globalState.workbench.guiSize;
        this.props.globalState.guiTexture.scaleTo(size.width, size.height);
        saveCallback();
        for (const control of allControls) {
            this.props.globalState.workbench.addEditorBehavior(control);
        }
    }
    loadFromSnippet() {
        const snippedId = this.props.globalState.hostWindow.prompt("Please enter the snippet ID to use");
        if (!snippedId) {
            return;
        }
        this.props.globalState.workbench.loadFromSnippet(snippedId);
    }
    renderNode(nodes) {
        const node = nodes[0];
        return (_jsxs(_Fragment, { children: [_jsxs("div", { id: "header", children: [_jsx("img", { id: "logo", src: this.renderControlIcon(nodes) }), _jsx("div", { id: "title", children: _jsx(TextInputLineComponent, { noUnderline: true, lockObject: this._lockObject, target: makeTargetsProxy(nodes, this.props.globalState.onPropertyChangedObservable), propertyName: "name", onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable }) })] }), this.renderProperties(nodes), node?.parent?.typeName === "Grid" && (_jsx(ParentingPropertyGridComponent, { control: node, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, lockObject: this._lockObject }))] }));
    }
    /**
     * returns the class name of a list of controls if they share a class, or an empty string if not
     * @param nodes the list of controls to check
     * @returns the class name of a list of controls if they share a class, or an empty string if not
     */
    getControlsCommonClassName(nodes) {
        if (nodes.length === 0)
            return "";
        const firstNode = nodes[0];
        const firstClass = firstNode.getClassName();
        for (const node of nodes) {
            if (node.getClassName() !== firstClass) {
                return "";
            }
        }
        return firstClass;
    }
    renderProperties(nodes) {
        if (nodes.length === 0)
            return;
        const className = this.getControlsCommonClassName(nodes);
        switch (className) {
            case "TextBlock": {
                const textBlocks = nodes;
                return (_jsx(TextBlockPropertyGridComponent, { textBlocks: textBlocks, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "InputText": {
                const inputTexts = nodes;
                return (_jsx(InputTextPropertyGridComponent, { inputTexts: inputTexts, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "ColorPicker": {
                const colorPickers = nodes;
                return (_jsx(ColorPickerPropertyGridComponent, { colorPickers: colorPickers, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "Image": {
                const images = nodes;
                return (_jsx(ImagePropertyGridComponent, { images: images, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "Slider": {
                const sliders = nodes;
                return (_jsx(SliderGenericPropertyGridComponent, { sliders: sliders, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "ImageBasedSlider": {
                const imageBasedSliders = nodes;
                return (_jsx(ImageBasedSliderPropertyGridComponent, { imageBasedSliders: imageBasedSliders, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "Rectangle": {
                return (_jsx(RectanglePropertyGridComponent, { rectangles: nodes, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable }));
            }
            case "StackPanel": {
                const stackPanels = nodes;
                return (_jsx(StackPanelPropertyGridComponent, { stackPanels: stackPanels, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "Grid": {
                const grids = nodes;
                return (_jsx(GridPropertyGridComponent, { grids: grids, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "ScrollViewer": {
                const scrollViewers = nodes;
                return (_jsx(ScrollViewerPropertyGridComponent, { scrollViewers: scrollViewers, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "Ellipse": {
                const ellipses = nodes;
                return (_jsx(EllipsePropertyGridComponent, { ellipses: ellipses, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "Checkbox": {
                const checkboxes = nodes;
                return (_jsx(CheckboxPropertyGridComponent, { checkboxes: checkboxes, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "RadioButton": {
                const radioButtons = nodes;
                return (_jsx(RadioButtonPropertyGridComponent, { radioButtons: radioButtons, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "Line": {
                const lines = nodes;
                return (_jsx(LinePropertyGridComponent, { lines: lines, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "DisplayGrid": {
                const displayGrids = nodes;
                return (_jsx(DisplayGridPropertyGridComponent, { displayGrids: displayGrids, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
            }
            case "Button": {
                const buttons = nodes;
                return (_jsx(ButtonPropertyGridComponent, { rectangles: buttons, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onAddComponent: (value) => {
                        for (const button of buttons) {
                            const guiElement = GUINodeTools.CreateControlFromString(value);
                            this.props.globalState.workbench.addEditorBehavior(guiElement);
                            button.addControl(guiElement);
                            this.props.globalState.select(guiElement);
                        }
                    }, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }, "buttonMenu"));
            }
        }
        const controls = nodes;
        return (_jsx(ControlPropertyGridComponent, { controls: controls, lockObject: this._lockObject, onPropertyChangedObservable: this.props.globalState.onPropertyChangedObservable, onFontsParsedObservable: this.props.globalState.onFontsParsedObservable, globalState: this.props.globalState }));
    }
    renderControlIcon(nodes) {
        const node = nodes[0];
        const className = node.getClassName();
        for (const node of nodes) {
            if (node.getClassName() !== className) {
                return adtIcon;
            }
        }
        const type = ControlTypes.find((control) => control.className === className);
        return type ? type.icon : adtIcon;
    }
    render() {
        if (this.props.globalState.guiTexture == undefined)
            return null;
        const nodesToRender = this.props.globalState.selectedControls.length > 0 ? this.props.globalState.selectedControls : [this.props.globalState.workbench.trueRootContainer];
        return _jsx("div", { id: "ge-propertyTab", children: this.renderNode(nodesToRender) });
    }
}
//# sourceMappingURL=propertyTabComponent.js.map