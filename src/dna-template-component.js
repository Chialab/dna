import { Template } from 'skin-template/src/template.js';

/**
 * Simple Custom Component with template handling using the `template` property.
 *
 * @example
 * my-component.js
 * ```js
 * import { Component, TemplateMixin, mix } from 'dna/component';
 * export class MyComponent extends mix(Component).with(TemplateMixin) {
 *   get template() {
 *     return `<h1>${this.name}</h1>`;
 *   }
 *   get name() {
 *     return 'Newton';
 *   }
 * }
 * ```
 * app.js
 * ```js
 * import { define } from 'dna/component';
 * import { MyComponent } from './components/my-component/my-component.js';
 * define('my-component', MyComponent);
 * var element = new MyComponent();
 * console.log(element.innerHTML); // logs "<h1>Newton</h1>"
 * ```
 */
export const TemplateMixin = (SuperClass) => class extends SuperClass {
    constructor() {
        super();
        if (this.template) {
            this.observeProperties(() => {
                this.render();
            });
            this.render();
        }
    }
    /**
     * Update Component child nodes.
     * @return Promise The render promise.
     */
    render() {
        let tpl = this.template;
        if (tpl instanceof Template) {
            tpl.render(this);
        } else {
            throw new Error('Invalid template property.');
        }
    }
};
