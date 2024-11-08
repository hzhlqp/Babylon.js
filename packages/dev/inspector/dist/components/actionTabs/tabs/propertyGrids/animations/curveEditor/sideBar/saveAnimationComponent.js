import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { StringTools } from "shared-ui-components/stringTools";
import { Animation } from "core/Animations/animation";
export class SaveAnimationComponent extends React.Component {
    constructor(props) {
        super(props);
        this._selectedAnimations = [];
        this.state = {};
        this._root = React.createRef();
        if (this.props.context.animations) {
            if (this.props.context.useTargetAnimations) {
                for (const targetedAnimation of this.props.context.animations) {
                    this._selectedAnimations.push(targetedAnimation.animation);
                }
            }
            else {
                this._selectedAnimations = this.props.context.animations.slice(0);
            }
        }
    }
    _getJson() {
        const json = {
            animations: [],
        };
        for (const animation of this._selectedAnimations) {
            json.animations.push(animation.serialize());
        }
        return JSON.stringify(json);
    }
    saveToSnippetServer() {
        const xmlHttp = new XMLHttpRequest();
        const hostDocument = this._root.current.ownerDocument;
        const json = this._getJson();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    const snippet = JSON.parse(xmlHttp.responseText);
                    const oldId = this.props.context.snippetId;
                    this.props.context.snippetId = snippet.id;
                    if (snippet.version && snippet.version != "0") {
                        this.props.context.snippetId += "#" + snippet.version;
                    }
                    this.forceUpdate();
                    const windowAsAny = window;
                    if (windowAsAny.Playground && oldId) {
                        windowAsAny.Playground.onRequestCodeChangeObservable.notifyObservers({
                            regex: new RegExp(oldId, "g"),
                            replace: this.props.context.snippetId,
                        });
                    }
                    hostDocument.defaultView.alert("Animations saved with ID: " + this.props.context.snippetId);
                }
                else {
                    hostDocument.defaultView.alert(`Unable to save your animations. It may be too large (${(dataToSend.payload.length / 1024).toFixed(2)} KB). Please try reducing the number of animations or the number of keys per animation and try again.`);
                }
            }
        };
        xmlHttp.open("POST", Animation.SnippetUrl + (this.props.context.snippetId ? "/" + this.props.context.snippetId : ""), true);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        const dataToSend = {
            payload: JSON.stringify({
                animations: json,
            }),
            name: "",
            description: "",
            tags: "",
        };
        xmlHttp.send(JSON.stringify(dataToSend));
    }
    saveToFile() {
        StringTools.DownloadAsFile(this._root.current.ownerDocument, this._getJson(), "animations.json");
    }
    render() {
        return (_jsxs("div", { id: "save-animation-pane", ref: this._root, children: [_jsx("div", { id: "save-animation-list", children: this.props.context.animations?.map((a, i) => {
                        const animation = this.props.context.useTargetAnimations ? a.animation : a;
                        return (_jsxs("div", { className: "save-animation-list-entry", children: [_jsx("input", { type: "checkbox", value: animation.name, defaultChecked: true, onClick: (evt) => {
                                        if (evt.currentTarget.checked) {
                                            this._selectedAnimations.push(animation);
                                        }
                                        else {
                                            const index = this._selectedAnimations.indexOf(animation);
                                            if (index > -1) {
                                                this._selectedAnimations.splice(index, 1);
                                            }
                                        }
                                    } }), animation.name] }, i));
                    }) }), _jsxs("div", { id: "save-animation-buttons", children: [_jsx("button", { className: "simple-button", id: "save-snippet", type: "button", onClick: () => {
                                this.saveToSnippetServer();
                            }, children: "Save Snippet" }), _jsx("button", { className: "simple-button", id: "save-file", type: "button", onClick: () => {
                                this.saveToFile();
                            }, children: "Save File" })] }), this.props.context.snippetId && _jsxs("div", { id: "save-animation-snippet", children: ["Snippet ID: ", this.props.context.snippetId] })] }));
    }
}
//# sourceMappingURL=saveAnimationComponent.js.map