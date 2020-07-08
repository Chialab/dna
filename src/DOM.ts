import { window } from './window';
import { createSymbolKey } from './symbols';
import { ComponentInterface, isComponent, isComponentConstructor } from './Interfaces';
import { customElements } from './CustomElementRegistry';

const { Node, HTMLElement, Event, CustomEvent, document } = window;
const slice = Array.prototype.slice;

if (!Node || !HTMLElement || !Event || !CustomEvent || !document) {
    throw new Error('invalid DOM implementation');
}

export const appendChildImpl = Node.prototype.appendChild;
export const removeChildImpl = Node.prototype.removeChild;
export const insertBeforeImpl = Node.prototype.insertBefore;
export const replaceChildImpl = Node.prototype.replaceChild;
export const getAttributeImpl = HTMLElement.prototype.getAttribute;
export const hasAttributeImpl = HTMLElement.prototype.hasAttribute;
export const setAttributeImpl = HTMLElement.prototype.setAttribute;
export const matchesImpl = HTMLElement.prototype.matches || HTMLElement.prototype.webkitMatchesSelector || (HTMLElement.prototype as any).msMatchesSelector as typeof Element.prototype.matches;

/**
 * Make a readonly copy of the child nodes collection.
 * @param node The parent node.
 * @return A frozen list of child nodes.
 */
export const cloneChildNodes = (node: Node): Node[] => slice.call(node.childNodes || [], 0) as Node[];

/**
 * Check if a node is a Document instance.
 * @param node The node to check.
 * @return The node is a Document instance.
 */
export const isDocument = (node: any): node is Document => node && node.nodeType === Node.DOCUMENT_NODE;

/**
 * Check if a node is a Text instance.
 * @param node The node to check.
 * @return The node is a Text instance.
 */
export const isText = (node: any): node is Text => node && node.nodeType === Node.TEXT_NODE;

/**
 * Check if a node is an Element instance.
 * @param node The node to check.
 * @return The node is an Element instance.
 */
export const isElement = (node: any): node is HTMLElement => node && node.nodeType === Node.ELEMENT_NODE;

/**
 * Check if an object is an Event instance.
 * @param node The node to check.
 * @return The object is an Event instance.
 */
export const isEvent = (event: any): event is Event => event instanceof Event;

/**
 * Check if a Node is connected.
 *
 * @param node The target element to check.
 * @return A truthy value for connected targets.
 */
export const isConnected = (node: Node | null): boolean => {
    if (isElement(node) || isText(node)) {
        return isConnected(node.parentNode);
    }
    if (isDocument(node)) {
        return true;
    }

    return false;
};

/**
 * Invoke `connectedCallback` method of a Node (and its descendents).
 * It does nothing if life cycle is disabled.
 *
 * @param node The connected node.
 */
export const connect = (node: Node, force = false) => {
    if (!isElement(node)) {
        return;
    }
    let children = cloneChildNodes(node);
    if (shouldEmulateLifeCycle(node) || force) {
        (node as ComponentInterface<HTMLElement>).connectedCallback();
        children = cloneChildNodes(node);
    }
    if (children) {
        for (let i = 0, len = children.length; i < len; i++) {
            connect(children[i]);
        }
    }
};

/**
 * Invoke `disconnectedCallback` method of a Node (and its descendents).
 * It does nothing if life cycle is disabled.
 *
 * @param node The disconnected node.
 */
export const disconnect = (node: Node) => {
    if (!isElement(node)) {
        return;
    }
    let children = cloneChildNodes(node);
    if (shouldEmulateLifeCycle(node)) {
        node.disconnectedCallback();
        children = cloneChildNodes(node);
    }
    if (children) {
        for (let i = 0, len = children.length; i < len; i++) {
            disconnect(children[i]);
        }
    }
};

/**
 * A symbol which identify emulated components.
 */
const EMULATE_LIFECYCLE_SYMBOL = createSymbolKey();

/**
 * Check if a node require emulated life cycle.
 * @param node The node to check.
 */
const shouldEmulateLifeCycle = (node: Element): node is ComponentInterface<HTMLElement> => (node as any)[EMULATE_LIFECYCLE_SYMBOL];

/**
 * Should emulate life cycle.
 */
let lifeCycleEmulation = typeof customElements === 'undefined';

/**
 * Flag the element for life cycle emulation.
 */
export const emulateLifeCycle = (node: HTMLElement) => {
    lifeCycleEmulation = true;
    (node as any)[EMULATE_LIFECYCLE_SYMBOL] = true;
};

/**
 * DOM is a singleton that components uses to access DOM methods.
 * By default, it uses browsers' DOM implementation, but it can be set to use a different one.
 * For example, in a Node context it is possibile to use DNA via the `jsdom` package and updating `this.Text` and `this.Element` references.
 * It also handle element life cycle for custom elements unless otherwise specified.
 */
export const DOM = {
    /**
     * Create a new DOM element node for the specified tag.
     *
     * @param tagName The specified tag.
     * @return The new DOM element instance.
     */
    createElement(tagName: string, options?: ElementCreationOptions): Element {
        const is = options && options.is;
        const name = is || tagName.toLowerCase();
        const node = document.createElement(tagName);
        const constructor = customElements.get(name);
        if (constructor && isComponentConstructor(constructor) && !(node instanceof constructor)) {
            new constructor(node);
        }
        return node;
    },

    /**
     * Create a new DOM element node for the specified tag using a namespace.
     *
     * @param namespaceURI The namespace of the tag.
     * @param tagName The specified tag.
     * @return The new DOM element instance.
     */
    createElementNS(namespaceURI: string, tagName: string): Element {
        return document.createElementNS(namespaceURI, tagName);
    },

    /**
     * Create a new DOM text node from the specified value.
     *
     * @param data The specified value.
     * @return The new DOM text instance.
     */
    createTextNode(data: string): Text {
        return document.createTextNode(data);
    },

    /**
     * Instantiate an Event.
     * @param typeArg The name of the event.
     * @param eventInitDict A set of options for the event, such as detail and bubbling.
     */
    createEvent(typeArg: string, eventInitDict: CustomEventInit<unknown> = {}): CustomEvent<unknown> {
        let event;
        try {
            event = new CustomEvent(typeArg, eventInitDict);
        } catch {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(typeArg, eventInitDict.bubbles || false, eventInitDict.cancelable || false, eventInitDict.detail);
        }
        return event;
    },

    /**
     * Append a child to an element.
     *
     * @param parent The parent element.
     * @param newChild The child to add.
     * @param slot Should add a slot node.
     */
    appendChild<T extends Node>(parent: Element, newChild: T, slot = true): T {
        if (slot && isComponent(parent)) {
            parent.slotChildNodes.push(newChild);
            parent.forceUpdate();
            return newChild;
        }
        if (!lifeCycleEmulation) {
            return appendChildImpl.call(parent, newChild) as T;
        }
        if (newChild.parentNode) {
            DOM.removeChild(newChild.parentNode as Element, newChild, slot);
        }
        appendChildImpl.call(parent, newChild);
        connect(newChild);
        return newChild;
    },

    /**
     * Remove a child from an element.
     *
     * @param parent The parent element.
     * @param oldChild The child to remove.
     * @param slot Should remove a slot node.
     */
    removeChild<T extends Node>(parent: Element, oldChild: T, slot = true): T {
        if (slot && isComponent(parent)) {
            let slotted = parent.slotChildNodes;
            let io = slotted.indexOf(oldChild);
            if (io !== -1) {
                slotted.splice(io, 1);
                parent.forceUpdate();
            }
            return oldChild;
        }
        if (!lifeCycleEmulation) {
            return removeChildImpl.call(parent, oldChild) as T;
        }
        removeChildImpl.call(parent, oldChild);
        disconnect(oldChild);
        return oldChild;
    },

    /**
     * Insert a child before another in an element.
     *
     * @param parent The parent element.
     * @param newChild The child to insert.
     * @param refChild The referred node.
     * @param slot Should insert a slot node.
     */
    insertBefore<T extends Node>(parent: Element, newChild: T, refChild: Node | null, slot = true): T {
        if (slot && isComponent(parent)) {
            let slotted = parent.slotChildNodes;
            if (refChild) {
                let io = slotted.indexOf(refChild);
                if (io !== -1) {
                    slotted.splice(io, 0, newChild);
                }
            } else {
                slotted.push(newChild);
            }
            parent.forceUpdate();
            return newChild;
        }
        if (!lifeCycleEmulation) {
            return insertBeforeImpl.call(parent, newChild, refChild) as T;
        }
        if (newChild.parentNode) {
            DOM.removeChild(newChild.parentNode as Element, newChild, slot);
        }
        insertBeforeImpl.call(parent, newChild, refChild);
        connect(newChild);
        return newChild;
    },

    /**
     * Replace a child with another in an element.
     *
     * @param parent The parent element.
     * @param newChild The child to insert.
     * @param oldChild The node to replace.
     * @param slot Should replace a slot node.
     */
    replaceChild<T extends Node>(parent: Element, newChild: Node, oldChild: T, slot = true): T {
        if (slot && isComponent(parent)) {
            let slotted = parent.slotChildNodes;
            let io = slotted.indexOf(oldChild);
            slotted.splice(io, 1, newChild);
            parent.forceUpdate();
            return oldChild;
        }
        if (!lifeCycleEmulation) {
            return replaceChildImpl.call(parent, newChild, oldChild) as T;
        }
        if (newChild.parentNode && newChild !== oldChild) {
            DOM.removeChild(newChild.parentNode as Element, newChild, slot);
        }
        replaceChildImpl.call(parent, newChild, oldChild);
        disconnect(oldChild);
        connect(newChild);
        return oldChild;
    },

    /**
     * Get a Component attribute.
     *
     * @param element The node element
     * @param qualifiedName The attribute name
     */
    getAttribute(element: Element, qualifiedName: string): string | null {
        return getAttributeImpl.call(element, qualifiedName);
    },

    /**
     * Check if an element has an attribute.
     *
     * @param element The node element to check.
     * @param qualifiedName The attribute name to check.
     */
    hasAttribute(element: Element, qualifiedName: string): boolean {
        return hasAttributeImpl.call(element, qualifiedName);
    },

    /**
     * Add/set an attribute to an element.
     *
     * @param element The element node to update.
     * @param qualifiedName The attribute name to add/set.
     * @param value The value to set.
     */
    setAttribute(element: Element, qualifiedName: string, value: string): void {
        if (shouldEmulateLifeCycle(element)) {
            const constructor = element.constructor;
            const observed = (constructor as any).observedAttributes.indexOf(qualifiedName) !== -1;
            if (!observed) {
                return setAttributeImpl.call(element, qualifiedName, value);
            }

            const oldValue = DOM.getAttribute(element, qualifiedName);
            setAttributeImpl.call(element, qualifiedName, value);
            element.attributeChangedCallback(qualifiedName, oldValue as string, value);
            return;
        }
        return setAttributeImpl.call(element, qualifiedName, value);
    },

    /**
     * Remove an element's attribute.
     *
     * @param element The element node to update.
     * @param qualifiedName The attribute name to remove.
     */
    removeAttribute(element: Element, qualifiedName: string) {
        const removeAttribute = HTMLElement.prototype.removeAttribute;
        if (shouldEmulateLifeCycle(element)) {
            const constructor = element.constructor;
            const observed = (constructor as any).observedAttributes.indexOf(qualifiedName) !== -1;
            if (!observed) {
                return removeAttribute.call(element, qualifiedName);
            }

            const oldValue = DOM.getAttribute(element, qualifiedName);
            removeAttribute.call(element, qualifiedName);
            element.attributeChangedCallback(qualifiedName, oldValue as string, null);
        }
        return removeAttribute.call(element, qualifiedName);
    },

    /**
     * The method checks to see if the Element would be selected by the provided selectorString.
     * @param selectorString The selector to match.
     */
    matches(element: Element, selectorString: string): boolean {
        return matchesImpl.call(element, selectorString);
    },
};