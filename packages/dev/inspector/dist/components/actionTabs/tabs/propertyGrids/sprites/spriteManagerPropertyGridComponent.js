import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { LineContainerComponent } from "shared-ui-components/lines/lineContainerComponent";
import { SpriteManager } from "core/Sprites/spriteManager";
import { TextInputLineComponent } from "shared-ui-components/lines/textInputLineComponent";
import { TextLineComponent } from "shared-ui-components/lines/textLineComponent";
import { CheckBoxLineComponent } from "shared-ui-components/lines/checkBoxLineComponent";
import { FloatLineComponent } from "shared-ui-components/lines/floatLineComponent";
import { SliderLineComponent } from "shared-ui-components/lines/sliderLineComponent";
import { RenderingManager } from "core/Rendering/renderingManager";
import { TextureLinkLineComponent } from "../../../lines/textureLinkLineComponent";
import { ButtonLineComponent } from "shared-ui-components/lines/buttonLineComponent";
import { Sprite } from "core/Sprites/sprite";
import { Tools } from "core/Misc/tools";
import { FileButtonLine } from "shared-ui-components/lines/fileButtonLineComponent";
import { Constants } from "core/Engines/constants";
import { OptionsLine } from "shared-ui-components/lines/optionsLineComponent";
export class SpriteManagerPropertyGridComponent extends React.Component {
    constructor(props) {
        super(props);
        this._snippetUrl = Constants.SnippetUrl;
    }
    addNewSprite() {
        const spriteManager = this.props.spriteManager;
        const newSprite = new Sprite("new sprite", spriteManager);
        this.props.onSelectionChangedObservable?.notifyObservers(newSprite);
    }
    disposeManager() {
        const spriteManager = this.props.spriteManager;
        spriteManager.dispose();
        this.props.onSelectionChangedObservable?.notifyObservers(null);
    }
    saveToFile() {
        const spriteManager = this.props.spriteManager;
        const content = JSON.stringify(spriteManager.serialize(true));
        Tools.Download(new Blob([content]), "spriteManager.json");
    }
    loadFromFile(file) {
        const spriteManager = this.props.spriteManager;
        const scene = spriteManager.scene;
        Tools.ReadFile(file, (data) => {
            const decoder = new TextDecoder("utf-8");
            const jsonObject = JSON.parse(decoder.decode(data));
            spriteManager.dispose();
            this.props.globalState.onSelectionChangedObservable.notifyObservers(null);
            const newManager = SpriteManager.Parse(jsonObject, scene, "");
            this.props.globalState.onSelectionChangedObservable.notifyObservers(newManager);
        }, undefined, true);
    }
    loadFromSnippet() {
        const spriteManager = this.props.spriteManager;
        const scene = spriteManager.scene;
        const snippedId = window.prompt("Please enter the snippet ID to use");
        if (!snippedId) {
            return;
        }
        spriteManager.dispose();
        this.props.globalState.onSelectionChangedObservable.notifyObservers(null);
        SpriteManager.ParseFromSnippetAsync(snippedId, scene)
            .then((newManager) => {
            this.props.globalState.onSelectionChangedObservable.notifyObservers(newManager);
        })
            .catch((err) => {
            alert("Unable to load your sprite manager: " + err);
        });
    }
    saveToSnippet() {
        const spriteManager = this.props.spriteManager;
        const content = JSON.stringify(spriteManager.serialize(true));
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    const snippet = JSON.parse(xmlHttp.responseText);
                    const oldId = spriteManager.snippetId || "_BLANK";
                    spriteManager.snippetId = snippet.id;
                    if (snippet.version && snippet.version != "0") {
                        spriteManager.snippetId += "#" + snippet.version;
                    }
                    this.forceUpdate();
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(spriteManager.snippetId);
                    }
                    const windowAsAny = window;
                    if (windowAsAny.Playground && oldId) {
                        windowAsAny.Playground.onRequestCodeChangeObservable.notifyObservers({
                            regex: new RegExp(`SpriteManager.ParseFromSnippetAsync\\("${oldId}`, "g"),
                            replace: `SpriteManager.ParseFromSnippetAsync("${spriteManager.snippetId}`,
                        });
                    }
                    alert("Sprite manager saved with ID: " + spriteManager.snippetId + " (please note that the id was also saved to your clipboard)");
                }
                else {
                    alert("Unable to save your sprite manager");
                }
            }
        };
        xmlHttp.open("POST", this._snippetUrl + (spriteManager.snippetId ? "/" + spriteManager.snippetId : ""), true);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        const dataToSend = {
            payload: JSON.stringify({
                spriteManager: content,
            }),
            name: "",
            description: "",
            tags: "",
        };
        xmlHttp.send(JSON.stringify(dataToSend));
    }
    render() {
        const spriteManager = this.props.spriteManager;
        const alphaModeOptions = [
            { label: "Combine", value: Constants.ALPHA_COMBINE },
            { label: "One one", value: Constants.ALPHA_ONEONE },
            { label: "Add", value: Constants.ALPHA_ADD },
            { label: "Subtract", value: Constants.ALPHA_SUBTRACT },
            { label: "Multiply", value: Constants.ALPHA_MULTIPLY },
            { label: "Maximized", value: Constants.ALPHA_MAXIMIZED },
            { label: "Pre-multiplied", value: Constants.ALPHA_PREMULTIPLIED },
        ];
        return (_jsxs(_Fragment, { children: [_jsxs(LineContainerComponent, { title: "GENERAL", selection: this.props.globalState, children: [_jsx(TextInputLineComponent, { lockObject: this.props.lockObject, label: "Name", target: spriteManager, propertyName: "name", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(TextLineComponent, { label: "Unique ID", value: spriteManager.uniqueId.toString() }), _jsx(TextLineComponent, { label: "Capacity", value: spriteManager.capacity.toString() }), _jsx(TextureLinkLineComponent, { label: "Texture", texture: spriteManager.texture, onSelectionChangedObservable: this.props.onSelectionChangedObservable }), spriteManager.sprites.length < spriteManager.capacity && _jsx(ButtonLineComponent, { label: "Add new sprite", onClick: () => this.addNewSprite() }), _jsx(ButtonLineComponent, { label: "Dispose", onClick: () => this.disposeManager() })] }), _jsxs(LineContainerComponent, { title: "FILE", selection: this.props.globalState, children: [_jsx(FileButtonLine, { label: "Load", onClick: (file) => this.loadFromFile(file), accept: ".json" }), _jsx(ButtonLineComponent, { label: "Save", onClick: () => this.saveToFile() })] }), _jsxs(LineContainerComponent, { title: "SNIPPET", selection: this.props.globalState, children: [spriteManager.snippetId && _jsx(TextLineComponent, { label: "Snippet ID", value: spriteManager.snippetId }), _jsx(ButtonLineComponent, { label: "Load from snippet server", onClick: () => this.loadFromSnippet() }), _jsx(ButtonLineComponent, { label: "Save to snippet server", onClick: () => this.saveToSnippet() })] }), _jsxs(LineContainerComponent, { title: "PROPERTIES", selection: this.props.globalState, children: [_jsx(CheckBoxLineComponent, { label: "Pickable", target: spriteManager, propertyName: "isPickable", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "Fog enabled", target: spriteManager, propertyName: "fogEnabled", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(CheckBoxLineComponent, { label: "No depth write", target: spriteManager, propertyName: "disableDepthWrite", onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(SliderLineComponent, { lockObject: this.props.lockObject, label: "Rendering group ID", decimalCount: 0, target: spriteManager, propertyName: "renderingGroupId", minimum: RenderingManager.MIN_RENDERINGGROUPS, maximum: RenderingManager.MAX_RENDERINGGROUPS - 1, step: 1, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(OptionsLine, { label: "Alpha mode", options: alphaModeOptions, target: spriteManager, propertyName: "blendMode", onPropertyChangedObservable: this.props.onPropertyChangedObservable, onSelect: (value) => this.setState({ blendMode: value }) })] }), _jsxs(LineContainerComponent, { title: "CELLS", selection: this.props.globalState, children: [_jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Cell width", isInteger: true, target: spriteManager, propertyName: "cellWidth", min: 0, onPropertyChangedObservable: this.props.onPropertyChangedObservable }), _jsx(FloatLineComponent, { lockObject: this.props.lockObject, label: "Cell height", isInteger: true, target: spriteManager, propertyName: "cellHeight", min: 0, onPropertyChangedObservable: this.props.onPropertyChangedObservable })] })] }));
    }
}
//# sourceMappingURL=spriteManagerPropertyGridComponent.js.map