import { isString } from '@chialab/proteins';
import DOM from '../lib/dom.js';
import { reduceProperty } from '../lib/reduce.js';
import { scopeStyle, HOST_REGEX } from '../lib/scope-style.js';
import { STYLE_SYMBOL } from '../lib/symbols.js';

/**
 * Simple Custom Component with css style handling using the `css` property.
 * @mixin StyleMixin
 * @memberof DNA.MIXINS
 *
 * @param {Function} SuperClass The class to extend.
 * @return {Function} The extended class.
 *
 * @example
 * ```js
 * // my-component.js
 * import { BaseComponent } from '@dnajs/core';
 * export class MyComponent extends BaseComponent {
 *   get css() {
 *     return 'p { color: red; }'
 *   }
 * }
 * ```
 * ```js
 * // app.js
 * import { define } from '@dnajs/core';
 * import { MyComponent } from './my-component.js';
 * define('my-component', MyComponent);
 * var element = new MyComponent();
 * var p = document.createElement('p');
 * p.innerText = 'Paragraph';
 * element.appendChild(p); // text inside `p` gets the red color
 * ```
 */
export const StyleMixin = (SuperClass) => class extends SuperClass {
    /**
     * Inherit all css properties.
     * @method constructor
     * @memberof DNA.MIXINS.StyleMixin
     * @instance
     */
    constructor(...args) {
        super(...args);
        let css = reduceProperty(this, 'css')
            .filter((protoCSS) => isString(protoCSS))
            .join('\n');
        if (css) {
            Object.defineProperty(this, 'css', { value: css });
        }
    }
    /**
     * Create or update a style element for a component.
     * @method connectedCallback
     * @memberof DNA.MIXINS.StyleMixin
     * @instance
     */
    connectedCallback() {
        super.connectedCallback();
        if (isString(this.css)) {
            if (this.shadowRoot) {
                if (!this[STYLE_SYMBOL]) {
                    let style = this[STYLE_SYMBOL] = DOM.createElement('style');
                    style.textContent = this.css;
                    this.shadowRoot.appendChild(style);
                }
            } else if (!this.constructor.hasOwnProperty(STYLE_SYMBOL)) {
                let doc = this.node.ownerDocument || document;
                let style = doc.createElement('style');
                let scope = `.${this.is}`;
                style.textContent = this.css.replace(HOST_REGEX, (fullMatch, mod) => `${scope}${(mod || '').slice(1, -1)}`);
                doc.head.appendChild(style);
                scopeStyle(style, scope);
                style.id = `style-${this.is}`;
                this.constructor[STYLE_SYMBOL] = style;
            }
        }
        this.classList.add(this.is);
    }
};