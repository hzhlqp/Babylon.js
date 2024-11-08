import * as Handlebars from "handlebars";
export class AbstractViewerNavbarButton {
    constructor(buttonName, buttonClass, htmlTemplate) {
        this.templateName = "navBar";
        this.eventsToAttach = ["pointerdown"];
        this._prepend = true;
        this._buttonName = buttonName;
        if (buttonClass) {
            this._buttonClass = buttonClass;
        }
        else {
            this._buttonClass = buttonName + "-button";
        }
        if (htmlTemplate) {
            this._htmlTemplate = htmlTemplate;
        }
        else {
            this._htmlTemplate = `
<button class="${this._buttonClass}">
    <span class="icon ${this._buttonName}-icon"></span>
</button>
`;
        }
    }
    interactionPredicate(event) {
        const pointerDown = event.event;
        if (pointerDown.button !== 0) {
            return false;
        }
        const element = event.event.target;
        if (!element) {
            return false;
        }
        const elementClasses = element.classList;
        for (let i = 0; i < elementClasses.length; ++i) {
            const className = elementClasses[i];
            if (className.indexOf(this._buttonClass) !== -1) {
                return true;
            }
        }
        return false;
    }
    addHTMLTemplate(template) {
        const element = this._generateHTMLElement(template);
        const container = template.parent.querySelector("div.default-control");
        if (container) {
            if (this._prepend) {
                container.insertBefore(element, container.firstChild);
            }
            else {
                container.appendChild(element);
            }
        }
    }
    _generateHTMLElement(template) {
        const compiledTemplate = Handlebars.compile(this._htmlTemplate, { noEscape: template.configuration.params && !!template.configuration.params.noEscape });
        const config = template.configuration.params || {};
        const rawHtml = compiledTemplate(config);
        let fragment;
        try {
            fragment = document.createRange().createContextualFragment(rawHtml);
        }
        catch (e) {
            const test = document.createElement(this._buttonClass);
            test.innerHTML = rawHtml;
            fragment = test;
        }
        return fragment;
    }
}
//# sourceMappingURL=viewerTemplatePlugin.js.map