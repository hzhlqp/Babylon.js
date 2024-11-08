import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tools } from "core/Misc/tools";
import * as React from "react";
import { Animation } from "core/Animations/animation";
export class LoadAnimationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._root = React.createRef();
        this._textInput = React.createRef();
    }
    loadFromFile(evt) {
        const files = evt.target.files;
        if (!files || !files.length) {
            return;
        }
        const file = files[0];
        Tools.ReadFile(file, (data) => {
            const context = this.props.context;
            const decoder = new TextDecoder("utf-8");
            const parsedAnimations = JSON.parse(decoder.decode(data)).animations;
            context.animations = [];
            const animations = context.animations;
            for (const parsedAnimation of parsedAnimations) {
                animations.push(Animation.Parse(parsedAnimation));
            }
            context.stop();
            context.target.animations = animations;
            context.activeAnimations = animations.length ? animations : [];
            context.prepare();
            context.onAnimationsLoaded.notifyObservers();
            context.onActiveAnimationChanged.notifyObservers({});
        }, undefined, true);
        evt.target.value = "";
    }
    loadFromSnippetServer() {
        const context = this.props.context;
        const snippetId = this._textInput.current.value;
        Animation.ParseFromSnippetAsync(snippetId)
            .then((animations) => {
            context.snippetId = snippetId;
            if (animations.length !== undefined) {
                context.animations = animations;
            }
            else {
                context.animations = [animations];
            }
            context.stop();
            context.target.animations = context.animations;
            context.activeAnimations = context.animations.length ? context.animations : [];
            context.prepare();
            context.onAnimationsLoaded.notifyObservers();
            context.onActiveAnimationChanged.notifyObservers({});
        })
            .catch((err) => {
            this._root.current?.ownerDocument.defaultView.alert("Unable to load your animations: " + err);
        });
    }
    render() {
        return (_jsxs("div", { id: "load-animation-pane", ref: this._root, children: [_jsx("div", { id: "load-animation-snippet-id-label", children: "Snippet Id" }), _jsx("div", { id: "load-animation-local-file-label", children: "Local File" }), _jsx("input", { type: "text", id: "load-snippet-id", ref: this._textInput }), _jsx("button", { className: "simple-button", id: "load-snippet", type: "button", onClick: () => this.loadFromSnippetServer(), children: "Load" }), _jsx("label", { htmlFor: "upload-snippet", id: "file-snippet-label", className: "simple-button", children: "Browse" }), _jsx("input", { id: "upload-snippet", type: "file", accept: ".json", onChange: (evt) => this.loadFromFile(evt) }), this.props.context.snippetId && _jsxs("div", { id: "load-animation-snippet", children: ["Snippet ID: ", this.props.context.snippetId] })] }));
    }
}
//# sourceMappingURL=loadAnimationComponent.js.map