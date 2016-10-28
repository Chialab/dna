import { isFunction } from './typeof.js';
import { registry } from './registry.js';

const CONNECTED = 'connectedCallback';
const DISCONNECTED = 'disconnectedCallback';
const UPDATED = 'attributeChangedCallback';

export function getComponent(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
        let is = node.getAttribute('is') || node.tagName;
        return registry.get(is);
    }
    return registry.get(node);
}

export function connect(node) {
    if (isFunction(node[CONNECTED])) {
        node[CONNECTED].call(node);
    }
}

export function disconnect(node) {
    if (isFunction(node[DISCONNECTED])) {
        node[DISCONNECTED].call(node);
    }
}

export function update(node, name, oldValue, newValue) {
    if (isFunction(node[UPDATED]) && name !== 'is') {
        node[UPDATED].call(node, name, oldValue, newValue);
    }
}

export function bind(node, Ctr) {
    node.__proto__ = Ctr.prototype;
    Object.defineProperty(node, 'constructor', {
        value: Ctr,
        configurable: true,
        writable: true,
    });
    Ctr.call(node);
}

export function create(node, descriptor) {
    descriptor = descriptor || getComponent(node);
    if (descriptor) {
        bind(node, descriptor.Ctr);
        connect(node);
    }
}

export function createElement(is) {
    let descriptor = getComponent(is);
    if (descriptor) {
        return new descriptor.Ctr();
    }
}

export function appendChild(parent, node) {
    if (parent !== node.parentNode || parent.lastElementChild !== node) {
        if (node.parentNode) {
            removeChild(node.parentNode, node);
        }
        parent.appendChild(node);
        connect(node);
    }
}

export function removeChild(parent, node) {
    parent.removeChild(node);
    disconnect(node);
}

export function setAttribute(node, name, value) {
    let oldValue = node.getAttribute(name);
    node.setAttribute(name, value);
    let attrs = node.constructor.observedAttributes || [];
    if (attrs.indexOf(name) !== -1) {
        update(node, name, oldValue, value);
    }
}

export function removeAttribute(node, name) {
    let oldValue = node.getAttribute(name);
    node.removeAttribute(name);
    let attrs = node.constructor.observedAttributes || [];
    if (attrs.indexOf(name) !== -1) {
        update(node, name, oldValue, null);
    }
}