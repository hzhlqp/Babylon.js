import { AbstractViewerNavbarButton } from "../viewerTemplatePlugin";
export class HDButtonPlugin extends AbstractViewerNavbarButton {
    constructor(_viewer) {
        super("hd", "hd-button", HDButtonPlugin.HtmlTemplate);
        this._viewer = _viewer;
    }
    onEvent(event) {
        const button = event.template.parent.querySelector(".hd-button");
        if (button) {
            button.classList.contains("hd-toggled") ? button.classList.remove("hd-toggled") : button.classList.add("hd-toggled");
        }
        this._viewer.toggleHD();
    }
}
// eslint-disable-next-line @typescript-eslint/naming-convention
HDButtonPlugin.HtmlTemplate = `
{{#unless hideHd}}
<style>
.hd-icon:after {
    font-size: 16px;
    content: "\\F765";
}

.hd-toggled span.hd-icon:after {
    content: "\\F766";
}
</style>
<button class="hd-button" title="{{text.hdButton}}">
     <span class="icon hd-icon"></span>
 </button>
 {{/unless}}
`;
//# sourceMappingURL=hdButtonPlugin.js.map