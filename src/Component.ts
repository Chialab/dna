import type { DelegatedEventCallback } from './events';
import type { Template } from './Template';
import type { ClassFieldDescriptor, ClassFieldObserver, ClassFieldAttributeConverter } from './property';
import { createSymbolKey } from './symbols';
import { customElements } from './CustomElementRegistry';
import { HTMLElement, isConnected, emulateLifeCycle, setAttributeImpl, createElementImpl, setPrototypeOf, isElement } from './helpers';
import { DOM } from './DOM';
import { delegateEventListener, undelegateEventListener, dispatchEvent, dispatchAsyncEvent, getListeners } from './events';
import { getOrCreateContext } from './Context';
import { internalRender } from './render';
import { getProperties, getProperty } from './property';
import { cloneChildNodes } from './NodeList';

/**
 * A symbol which identify components.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const COMPONENT_SYMBOL: unique symbol = createSymbolKey() as any;

export type WithComponentFlag<T> = T & {
    [COMPONENT_SYMBOL]?: boolean;
};

/**
 * A symbol which identify constructed components (properties can be assigned).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CONSTRUCTED_SYMBOL: unique symbol = createSymbolKey() as any;

export type WithConstructedFlag<T> = T & {
    [CONSTRUCTED_SYMBOL]?: boolean;
};

/**
 * Check if a node is a component.
 * @param node The node to check.
 */
export const isComponent = (node: WithComponentFlag<Node>): node is ComponentInstance<HTMLElement> => !!node[COMPONENT_SYMBOL];

/**
 * Check if a node is a constructed component.
 * @param node The node to check.
 */
export const isConstructed = (node: WithConstructedFlag<Node>) => !!node[CONSTRUCTED_SYMBOL];

/**
 * Check if a constructor is a component constructor.
 * @param constructor The constructor to check.
 */
export const isComponentConstructor = (constructor: Function): constructor is ComponentConstructor<HTMLElement> => !!constructor.prototype[COMPONENT_SYMBOL];

/**
 * Constructor type helper.
 */
export interface Constructor<T extends HTMLElement = HTMLElement> {
    new(): T;
    prototype: T;
}

/**
 * Extract slotted child nodes for initial child nodes.
 * @param context The compoonent context.
 * @return A list of new slotted children.
 */
function initSlotChildNodes<T extends HTMLElement>(element: ComponentInstance<T>) {
    const context = getOrCreateContext(element);
    const doc = element.ownerDocument;
    /* istanbul ignore next */
    if (!element.childNodes.length && doc.readyState === 'loading') {
        return;
    }
    const slotChildNodes = cloneChildNodes(element.childNodes);
    for (let i = 0, len = slotChildNodes.length; i < len; i++) {
        element.removeChild(slotChildNodes[i]);
    }
    context.slotChildNodes = slotChildNodes;
    return slotChildNodes;
}

/**
 * Create a base Component class which extends a native constructor.
 * @param ctor The base HTMLElement constructor to extend.
 * @return The extend class.
 */
const mixin = <T extends HTMLElement>(ctor: Constructor<T>) => class Component extends (ctor as Constructor) {
    /**
     * An array containing the names of the attributes to observe.
     */
    static readonly observedAttributes: string[] = [];

    /**
     * Identify shimmed constructors.
     * Constructor will skip native constructing when true.
     */
    static shim?: boolean;

    /**
     * Upgrade a plain element prototype.
     * @param node The node to upgrade.
     * @return The new prototyped node.
     */
    static upgrade<T extends HTMLElement>(node: T) {
        return new this(node);
    }

    /**
     * Flag DNA components.
     */
    get [COMPONENT_SYMBOL]() {
        return true;
    }

    /**
     * Flag constructed components.
     */
    [CONSTRUCTED_SYMBOL]?: boolean;

    /**
     * The tag name used for Component definition.
     */
    get is(): string {
        return undefined as unknown as string;
    }

    /**
     * A flag with the connected value of the node.
     */
    get isConnected(): boolean {
        return isConnected.call(this);
    }

    /**
     * A list of slot nodes.
     */
    get slotChildNodes() {
        return getOrCreateContext(this).slotChildNodes;
    }

    /**
     * Create a new Component instance.
     * @param node Instantiate the element using the given node instead of creating a new one.
     * @param properties A set of initial properties for the element.
     */
    constructor(...args: any[]) {
        super();

        const node = isElement(args[0]) && args[0];
        const props = (node ? args[1] : args[0]) as { [key: string]: unknown };

        const element = (node ? (setPrototypeOf(node, this), node) : this) as this;
        const constructor = element.constructor as ComponentConstructor<HTMLElement>;
        const context = getOrCreateContext(element);
        context.is = element.is;
        initSlotChildNodes(element);

        // setup listeners
        const listeners = getListeners(constructor) || [];
        for (let i = 0, len = listeners.length; i < len; i++) {
            let listener = listeners[i];
            element.delegateEventListener(listener.event, listener.selector, listener.callback, listener.options);
        }

        // setup properties
        const propertiesDescriptor = getProperties(constructor);
        for (let propertyKey in propertiesDescriptor) {
            delete (element as any)[propertyKey];
            const descriptor = propertiesDescriptor[propertyKey];
            if (typeof descriptor.initializer === 'function') {
                (element as any)[propertyKey] = descriptor.initializer.call(element);
            } else if ('value' in descriptor) {
                (element as any)[propertyKey] = descriptor.value;
            } else if ('defaultValue' in descriptor) {
                (element as any)[propertyKey] = descriptor.defaultValue;
            }
        }

        element.initialize(props);
        return element;
    }

    /**
     * Initialize component properties.
     * @param properties A set of initial properties for the element.
     */
    initialize(properties?: { [key: string]: unknown }) {
        this[CONSTRUCTED_SYMBOL] = true;
        if (properties) {
            for (let propertyKey in properties) {
                (this as any)[propertyKey] = properties[propertyKey];
            }
        }
    }

    /**
     * Invoked each time the Component is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
     */
    connectedCallback() {
        if (this.is !== this.localName) {
            // force the is attribute
            setAttributeImpl.call(this, 'is', this.is);
        }
        setAttributeImpl.call(this, ':defined', '');
        // trigger a re-render when the Node is connected
        this.forceUpdate();
    }

    /**
     * Invoked each time the Component is disconnected from the document's DOM.
     */
    disconnectedCallback() {}

    /**
     * Invoked each time one of the Component's attributes is added, removed, or changed.
     *
     * @param attributeName The name of the updated attribute.
     * @param oldValue The previous value of the attribute.
     * @param newValue The new value for the attribute (null if removed).
     */
    attributeChangedCallback(attributeName: string, oldValue: null | string, newValue: string | null) {
        const properties = getProperties(this.constructor as typeof Component);
        let property: ClassFieldDescriptor | undefined;
        for (let propertyKey in properties) {
            let prop = properties[propertyKey];
            if (prop.attribute === attributeName) {
                property = prop;
                break;
            }
        }

        if (!property) {
            return;
        }

        // update the Component Property value
        (this as any)[property.name as string] = (property.fromAttribute as ClassFieldAttributeConverter).call(this as any, newValue);
    }

    /**
     * Invoked each time one of the Component's properties is added, removed, or changed.
     *
     * @param propertyName The name of the changed property.
     * @param oldValue The previous value of the property.
     * @param newValue The new value for the property (undefined if removed).
     */
    propertyChangedCallback(propertyName: string, oldValue: any, newValue: any) {
        const property = getProperty(this.constructor as typeof Component, propertyName) as ClassFieldDescriptor;
        const attrName = property.attribute as string;
        if (attrName && property.toAttribute) {
            const value = property.toAttribute.call(this as any, newValue);
            if (value === null) {
                this.removeAttribute(attrName);
            } else if (value !== undefined && value !== this.getAttribute(attrName)) {
                this.setAttribute(attrName, value);
            }
        }

        if (property.event) {
            const eventName = property.event === true ? `${propertyName}change` : property.event;
            this.dispatchEvent(eventName, {
                newValue,
                oldValue,
            });
        }

        if (this.isConnected) {
            this.forceUpdate();
        }
    }

    /**
     * Observe a Component Property.
     *
     * @param propertyName The name of the Property to observe
     * @param callback The callback function
     */
    observe(propertyName: string, callback: ClassFieldObserver) {
        const property = getProperty(this.constructor as typeof Component, propertyName);
        if (!property) {
            throw new Error(`Missing property ${propertyName}`);
        }
        (property.observers as Function[]).push(callback);
    }

    /**
     * Unobserve a Component Property.
     *
     * @param propertyName The name of the Property to unobserve
     * @param callback The callback function to remove
     */
    unobserve(propertyName: string, callback: ClassFieldObserver) {
        const property = getProperty(this.constructor as typeof Component, propertyName);
        if (!property) {
            throw new Error(`Missing property ${propertyName}`);
        }
        const observers = property.observers as Function[];
        const io = observers.indexOf(callback);
        if (io !== -1) {
            observers.splice(io, 1);
        }
    }

    /**
     * Dispatch a custom Event.
     *
     * @param event The event to dispatch or the name of the synthetic event to create.
     * @param detail Detail object of the event.
     * @param bubbles Should the event bubble.
     * @param cancelable Should the event be cancelable.
     * @param composed Is the event composed.
     */
    dispatchEvent(event: Event): boolean;
    dispatchEvent(event: string, detail?: CustomEventInit['detail'], bubbles?: boolean, cancelable?: boolean, composed?: boolean): boolean;
    dispatchEvent(event: Event | string, detail?: CustomEventInit['detail'], bubbles?: boolean, cancelable?: boolean, composed?: boolean) {
        return dispatchEvent(this, event as string, detail, bubbles, cancelable, composed);
    }

    /**
     * Dispatch an async custom Event.
     *
     * @param event The event to dispatch or the name of the synthetic event to create.
     * @param detail Detail object of the event.
     * @param bubbles Should the event bubble.
     * @param cancelable Should the event be cancelable.
     * @param composed Is the event composed.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatchAsyncEvent(event: Event): Promise<any[]>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatchAsyncEvent(event: string, detail?: CustomEventInit['detail'], bubbles?: boolean, cancelable?: boolean, composed?: boolean): Promise<any[]>;
    dispatchAsyncEvent(event: Event | string, detail?: CustomEventInit['detail'], bubbles?: boolean, cancelable?: boolean, composed?: boolean) {
        return dispatchAsyncEvent(this, event as string, detail, bubbles, cancelable, composed);
    }

    /**
     * Delegate an Event listener.
     *
     * @param eventName The event name to listen
     * @param selector The selector to delegate
     * @param callback The callback to trigger when an Event matches the delegation
     */
    delegateEventListener(event: string, selector: string | null, callback: DelegatedEventCallback, options?: AddEventListenerOptions) {
        return delegateEventListener(this, event, selector, callback, options);
    }

    /**
     * Remove an Event delegation.
     *
     * @param eventName The Event name to undelegate
     * @param selector The selector to undelegate
     * @param callback The callback to remove
     */
    undelegateEventListener(event: string, selector: string | null, callback: DelegatedEventCallback) {
        return undelegateEventListener(this, event, selector, callback);
    }

    /**
     * Render method of the Component.
     *
     * @return The instances of the rendered Components and/or Nodes
     */
    render(): Template | undefined {
        return this.slotChildNodes;
    }

    /**
     * Force an element to re-render.
     */
    forceUpdate() {
        const childNodes = this.slotChildNodes || initSlotChildNodes(this);
        if (childNodes) {
            internalRender(this, this.render(), false);
        }
    }

    /**
     * Append a child to the Component.
     *
     * @param newChild The child to add.
     */
    appendChild<T extends Node>(newChild: T): T {
        return DOM.appendChild(this, newChild);
    }

    /**
     * Remove a child from the Component.
     *
     * @param {Node} oldChild The child to remove.
     */
    removeChild<T extends Node>(oldChild: T): T {
        return DOM.removeChild(this, oldChild);
    }

    /**
     * Insert a child before another in the Component.
     *
     * @param newChild The child to insert.
     * @param refChild The referred Node.
     */
    insertBefore<T extends Node>(newChild: T, refChild: Node | null): T {
        return DOM.insertBefore(this, newChild, refChild);
    }

    /**
     * Replace a child with another in the Component.
     *
     * @param newChild The child to insert.
     * @param oldChild The Node to replace.
     */
    replaceChild<T extends Node>(newChild: Node, oldChild: T): T {
        return DOM.replaceChild(this, newChild, oldChild);
    }

    /**
     * Set a Component attribute.
     *
     * @param ualifiedName The attribute name.
     * @param value The value to set.
     */
    setAttribute(qualifiedName: string, value: string) {
        return DOM.setAttribute(this, qualifiedName, value);
    }

    /**
     * Remove a Component attribute.
     *
     * @param qualifiedName The attribute name.
     */
    removeAttribute(qualifiedName: string) {
        return DOM.removeAttribute(this, qualifiedName);
    }

    /**
     * Should emulate life cycle for the node.
     */
    emulateLifeCycle() {
        emulateLifeCycle(this);
    }
};

/**
 * The basic DNA Component constructor.
 */
export type ComponentConstructor<T extends HTMLElement> = ReturnType<typeof mixin> & Constructor<T>;

/**
 * The basic DNA Component interface.
 * It's a Custom Element, but with some extra useful method.
 * @see [W3C specification]{@link https://w3c.github.io/webcomponents/spec/custom/}.
 */
export type ComponentInstance<T extends HTMLElement> = InstanceType<ComponentConstructor<T>>;

/**
 * Create a shim Constructor for Element constructors, in order to extend and instantiate them programmatically,
 * because using `new HTMLElement()` in browsers throw `Illegal constructor`.
 *
 * @param base The constructor or the class to shim.
 * @return A newable constructor with the same prototype.
 */
export const shim = <T extends typeof HTMLElement>(base: T): T => {
    const shim = function(this: InstanceType<ReturnType<typeof mixin>>, ...args: any[]) {
        const constructor = this.constructor as ReturnType<typeof mixin>;
        const is = this.is;
        if (!is) {
            throw new TypeError('Illegal constructor');
        }

        let tag = customElements.tagNames[is];
        let element: InstanceType<typeof constructor>;
        if (customElements.native && !constructor.shim) {
            element = Reflect.construct(base, args, constructor.prototype.constructor);
            if (tag === element.localName) {
                return element;
            }
        }

        element = createElementImpl(tag) as InstanceType<typeof constructor>;
        setPrototypeOf(element, constructor.prototype);
        emulateLifeCycle(element);
        return element;
    } as unknown as T;
    setPrototypeOf(shim, base);
    (shim as Function).apply = Function.apply;
    (shim as Function).call = Function.call;
    shim.prototype = base.prototype;
    return shim;
};

/**
 * Get a native HTMLElement constructor to extend by its name.
 * @param name The name of the constructor (eg. "HTMLAnchorElement").
 * @return A proxy that extends the native constructor.
 */
export const extend = <T extends HTMLElement>(constructor: Constructor<T>) => mixin(shim(constructor)) as unknown as ComponentConstructor<T>;

/**
 * The DNA base Component constructor, a Custom Element constructor with
 * declarative properties and event delegations, custom template and
 * a complete life cycle implementation.
 * All DNA components **must** extends this class.
 */
export const Component = extend(HTMLElement);
