'use strict';

import { DNAConfig } from './dna-config.next.js';
import { DNAComponent } from './dna-component.next.js';
import VDOM from './libs/virtual-dom.next.js';

/**
 * Simple Custom Component with template handling using the `template` property.
 * @class DNATemplateComponent
 * @extends DNAComponent
 *
 * @example
 * my-component.next.js
 * ```js
 * import { DNATemplateComponent } from 'dna/component';
 * export class MyComponent extends DNATemplateComponent {
 *   static get template() {
 *     return `<h1>${this.name}</h1>`
 *   }
 *   get name() {
 *     return 'Newton'
 *   }
 * }
 * ```
 * app.next.js
 * ```js
 * import { Register } from 'dna/component';
 * import { MyComponent } from './components/my-component/my-component.next.js';
 * var MyElement = Register(MyComponent);
 * var element = new MyElement();
 * console.log(element.innerHTML); // logs "<h1>Newton</h1>"
 * ```
 */
export class DNATemplateComponent extends DNAComponent {
    /**
     * Fires when an the element is registered.
     */
    static onRegister(...args) {
        // Create render function
        let ctr = this;
        if (this.template) {
            ctr.prototype.render = ((template) => {
                if (typeof template === 'function') {
                    return function() {
                        return template.call(this);
                    }
                } else if (typeof template == 'string') {
                    return () => template;
                } else if (template instanceof Node && template.tagName == 'TEMPLATE') {
                    return () => document.importNode(template.content, true);
                }
            })(ctr.template);
            if (DNAConfig.autoUpdateView) {
                wrapPrototype(this.prototype || this.__proto__, this.prototype || this.__proto__);
            }
        }
    }
    /**
     * Fires when an instance of the element is created.
     */
    createdCallback() {
        this.updateViewContent();
        super.createdCallback();
    }
    /**
     * Update Component child nodes.
     */
    updateViewContent() {
        // Render the template
        if (typeof this.render === 'function') {
            let nodes = this.render();
            let html = nodes;
            if (nodes instanceof NodeList) {
                html = '';
                for (let i = 0, len = nodes.length; i < len; i++) {
                    html += nodes[i].outerHTML;
                }
            } else if (nodes instanceof Node) {
                html = nodes.outerHTML;
            }
            html = html.replace(/[\n\r\t]/g, '').replace(/\s+/g, ' ');
            if (DNAConfig.useVirtualDOM) {
                let tmp = document.createElement('div');
                tmp.innerHTML = html;
                let tree = nodeToVDOM(tmp);
                if (!this._vtree) {
                    this.innerHTML = html;
                } else {
                    let diff = VDOM.diff(this._vtree, tree);
                    VDOM.patch(this, diff);
                }
                this._vtree = tree;
            } else {
                this.innerHTML = html;
            }
        }
    }
}

function wrapPrototype (main, currentProto = {}, handled = []) {
    Object.getOwnPropertyNames(currentProto).forEach((prop) => {
        if (typeof currentProto[prop] !== 'function' && handled.indexOf(prop) == -1) {
            handled.push(prop);
            let descriptor = Object.getOwnPropertyDescriptor(currentProto, prop) || {};
            Object.defineProperty(main, prop, {
                configurable: true,
                get: function() {
                    if (descriptor.get) {
                        return descriptor.get.call(this);
                    } else {
                        return this['__' + prop];
                    }
                },
                set: function(value) {
                    let res;
                    if (descriptor.set) {
                        res = descriptor.set.call(this, value);
                    } else {
                        res = (this['__' + prop] = value);
                    }
                    this.updateViewContent();
                    return res;
                }
            });
        }
    });
    let nextProto = currentProto.prototype || currentProto.__proto__;
    if (nextProto && nextProto !== HTMLElement.prototype) {
        wrapPrototype(main, nextProto, handled);
    }
}

function cssToObj (css) {
    let result = {};
    let attributes = css.split(';');

    for (let i = 0; i < attributes.length; i++) {
        let entry = attributes[i].split(':');
        result[entry.splice(0,1)[0]] = entry.join(':');
    }
    return result;
}

function attributesToProp (node) {
    var res = {};
    Array.prototype.forEach.call(node.attributes || [], function (attr) {
        res[attr.name] = attr.value;
    });
    return res;
}

function nodeToVDOM (node) {
    if (node.nodeType === Node.TEXT_NODE) {
        return new VDOM.VText(node.textContent);
    } else {
        return new VDOM.VNode(node.tagName, {
            attributes: attributesToProp(node)
        }, Array.prototype.map.call(node.childNodes || [], nodeToVDOM));
    }
}
