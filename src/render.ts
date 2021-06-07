import type { TagNameMap, IterableNodeList, Writable, WritableOf } from './types';
import type { CustomElement, CustomElementConstructor } from './CustomElementRegistry';
import type { Observable } from './Observable';
import htm from 'htm';
import { NamespaceURI } from './types';
import { createSymbolKey, isNode, isElement, isArray, isText, indexOf, cloneChildNodes } from './helpers';
import { isComponent } from './Component';
import { customElements, isCustomElementConstructor } from './CustomElementRegistry';
import { DOM } from './DOM';
import { isThenable, getThenableState } from './Thenable';
import { isObservable, getObservableState } from './Observable';
import { css } from './css';

const innerHtml = htm.bind(h);

/**
 * Compile a template string into virtual DOM template.
 *
 * @return The virtual DOM template function.
 */
export const html = (string: string | TemplateStringsArray, ...values: unknown[]): Template => {
    if (typeof string === 'string') {
        const array = [string];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (array as any).raw = [string];
        string = array as unknown as TemplateStringsArray;
    }
    return innerHtml(string, ...values);
};

/**
 * A generic template. Can be a single atomic item or a list of items.
 */
export type Template =
    Element |
    Text |
    Node |
    HyperFragment |
    HyperFunction |
    HyperComponent<CustomElementConstructor<HTMLElement>> |
    HyperNode<Node> |
    HyperSlot |
    HyperTag<keyof TagNameMap> |
    Promise<unknown> |
    Observable<unknown> |
    string |
    number |
    boolean |
    undefined |
    null |
    Template[];

/**
* A filter function signature for template items.
*
* @param item The template item to check.
* @return A truthy value for valid items, a falsy for value for invalid ones.
*/
export type TemplateFilter = (item: Node) => boolean;

/**
* A function that returns a template.
*
* @param props A set of properties with children.
* @param state The render state.
* @param update Update the rendering state.
* @param live A function that checks if the current template path is still attached to the template.
* @param context The current render context.
* @return A template.
*/
export type TemplateFunction<P> = (props: P, state: Map<string, unknown>, update: () => boolean, live: () => boolean, context: Context<Node>) => Template;

/**
 * A constructor alias used for JSX fragments </>.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Fragment: unique symbol = createSymbolKey() as any;

/**
 * Classes dictionary.
 */
export type HyperClasses = string | { [key: string]: boolean };

/**
 * Styles dictionary.
 */
export type HyperStyle = string | { [key: string]: string };

/**
 * Properties used by the render engine.
 * They can be assigned to a node but they are not part of the node prototype.
 */
export type HyperProperties = {
    is?: string;
    slot?: string;
    key?: unknown;
    xmlns?: NamespaceURI;
    children?: Template[];
    class?: HyperClasses;
    style?: HyperStyle;
};

/**
 * The interface of a JSX fragment node.
 */
export type HyperFragment = {
    Function?: undefined;
    Component?: undefined;
    node?: undefined;
    tag?: undefined;
    isFragment: true;
    isSlot?: false;
    key?: unknown;
    properties?: {};
    children: Template[];
};

/**
 * The interface of a functional component.
 */
export type HyperFunction = {
    Function: TemplateFunction<{}>;
    Component?: undefined;
    node?: undefined;
    tag?: undefined;
    isFragment?: false;
    isSlot?: false;
    key?: unknown;
    namespaceURI?: NamespaceURI;
    properties: HyperProperties;
    children: Template[];
};

/**
 * The interface of an HTML node used as JSX tag.
 */
export type HyperNode<T extends Node> = {
    Function?: undefined;
    Component?: undefined;
    node: T;
    tag?: undefined;
    isFragment?: false;
    isSlot?: false;
    key?: unknown;
    namespaceURI?: NamespaceURI;
    properties: Writable<T> & HyperProperties;
    children: Template[];
};

/**
 * The interface of a Component constructor used as JSX tag.
 */
export type HyperComponent<T extends CustomElementConstructor<HTMLElement>> = {
    Function?: undefined;
    Component: T;
    node?: undefined;
    tag?: undefined;
    isFragment?: false;
    isSlot?: false;
    key?: unknown;
    namespaceURI?: NamespaceURI;
    properties: Writable<InstanceType<T>> & HyperProperties;
    children: Template[];
};

/**
 * The interface of slot element.
 */
export type HyperSlot = {
    Function?: undefined;
    Component?: undefined;
    node?: undefined;
    tag: 'slot';
    isFragment?: false;
    isSlot: true;
    key?: unknown;
    properties: Writable<HTMLElementTagNameMap['slot']> & HyperProperties;
    children: Template[];
};

/**
 * The interface of a generic JSX tag.
 */
export type HyperTag<T extends keyof TagNameMap> = {
    Function?: undefined;
    Component?: undefined;
    node?: undefined;
    tag: T;
    isFragment?: false;
    isSlot?: false;
    key?: unknown;
    namespaceURI?: NamespaceURI;
    properties: Writable<TagNameMap[T]> & HyperProperties;
    children: Template[];
};

/**
 * Check if the current virtual node is a fragment.
 * @param target The node to check.
 */
export const isHyperFragment = (target: HyperFragment | HyperFunction | HyperComponent<CustomElementConstructor<HTMLElement>> | HyperNode<Node> | HyperSlot | HyperTag<keyof TagNameMap>): target is HyperFragment => !!target.isFragment;

/**
 * Check if the current virtual node is a functional component.
 * @param target The node to check.
 */
export const isHyperFunction = (target: HyperFragment | HyperFunction | HyperComponent<CustomElementConstructor<HTMLElement>> | HyperNode<Node> | HyperSlot | HyperTag<keyof TagNameMap>): target is HyperFunction => !!target.Function;

/**
 * Check if the current virtual node is a Component.
 * @param target The node to check.
 */
export const isHyperComponent = <T extends CustomElementConstructor<HTMLElement>>(target: HyperFragment | HyperFunction | HyperComponent<T> | HyperNode<Node> | HyperSlot | HyperTag<keyof TagNameMap>): target is HyperComponent<T> => !!target.Component;

/**
 * Check if the current virtual node is an HTML node instance.
 * @param target The node to check.
 */
export const isHyperNode = <T extends Node>(target: HyperFragment | HyperFunction | HyperComponent<CustomElementConstructor<HTMLElement>> | HyperNode<T> | HyperSlot | HyperTag<keyof TagNameMap>): target is HyperNode<T> => !!target.node;

/**
 * Check if the current virtual node is a slot element.
 * @param target The node to check.
 */
export const isHyperSlot = (target: HyperFragment | HyperFunction | HyperComponent<CustomElementConstructor<HTMLElement>> | HyperNode<Node> | HyperSlot | HyperTag<keyof TagNameMap>): target is HyperSlot => !!target.isSlot;

/**
 * Check if the current virtual node is a generic tag to render.
 * @param target The node to check.
 */
export const isHyperTag = <T extends keyof TagNameMap>(target: HyperFragment | HyperFunction | HyperComponent<CustomElementConstructor<HTMLElement>> | HyperNode<Node> | HyperSlot | HyperTag<T>): target is HyperTag<T> => !!target.tag;


/**
 * HyperFunction factory to use as JSX pragma.
 *
 * @param tagOrComponent The tag name, the constructor or the instance of the node.
 * @param properties The set of properties of the Node.
 * @param children The children of the Node.
 */
function h(tagOrComponent: typeof Fragment, properties: null, ...children: Template[]): HyperFragment;
function h<T extends TemplateFunction<{}>>(tagOrComponent: T, properties: HyperProperties | null, ...children: Template[]): HyperFunction;
function h<T extends CustomElementConstructor<HTMLElement>>(tagOrComponent: T, properties: Writable<InstanceType<T>> & HyperProperties | null, ...children: Template[]): HyperComponent<T>;
function h<T extends Node>(tagOrComponent: T, properties: Writable<T> & HyperProperties | null, ...children: Template[]): HyperNode<T>;
function h(tagOrComponent: 'slot', properties: Writable<HTMLSlotElement> & HyperProperties | null, ...children: Template[]): HyperSlot;
function h<T extends keyof TagNameMap>(tagOrComponent: T, properties: Writable<TagNameMap[T]> & HyperProperties | null, ...children: Template[]): HyperTag<T>;
function h(tagOrComponent: typeof Fragment | TemplateFunction<{}> | CustomElementConstructor<HTMLElement> | Node | keyof TagNameMap, properties: HyperProperties | null = null, ...children: Template[]) {
    const { is, key, xmlns } = (properties || {});

    if (tagOrComponent === Fragment) {
        return {
            isFragment: true,
            children,
        } as HyperFragment;
    }

    if (isNode(tagOrComponent)) {
        return {
            node: tagOrComponent,
            key,
            namespaceURI: xmlns,
            properties: properties || {},
            children,
        } as HyperNode<typeof tagOrComponent>;
    }

    if (typeof tagOrComponent === 'string') {
        if (tagOrComponent === 'svg') {
            return {
                tag: tagOrComponent,
                key,
                namespaceURI: NamespaceURI.svg,
                properties,
                children,
            };
        }

        if (tagOrComponent === 'slot') {
            return {
                tag: tagOrComponent,
                isSlot: true,
                key,
                properties: properties || {},
                children,
            } as HyperSlot;
        }

        const Component = customElements.get(is || tagOrComponent);
        if (Component) {
            return {
                Component,
                key,
                namespaceURI: xmlns,
                properties: properties || {},
                children,
            } as HyperComponent<typeof Component>;
        }

        return {
            tag: tagOrComponent as keyof TagNameMap,
            key,
            namespaceURI: xmlns,
            properties: properties || {},
            children,
        } as HyperTag<typeof tagOrComponent>;
    }

    if (isCustomElementConstructor(tagOrComponent)) {
        return {
            Component: tagOrComponent,
            key,
            namespaceURI: xmlns,
            properties: properties || {},
            children,
        } as HyperComponent<typeof tagOrComponent>;
    }

    return {
        Function: tagOrComponent,
        key,
        namespaceURI: xmlns,
        properties: properties || {},
        children,
    } as HyperFunction;
}

export { h };

/**
 * A symbol for node context.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CONTEXT_SYMBOL: unique symbol = createSymbolKey() as any;

export type WithContext<T extends Node> = T & {
    [CONTEXT_SYMBOL]?: Context<T>;
};

/**
 * The node context interface.
 */
export type Context<T extends Node, WR = Writable<T>> = {
    node: T;
    isElement?: boolean;
    isText?: boolean;
    tagName?: string;
    is?: string;
    key?: unknown;
    props: [
        WeakMap<Context<T>, WR & HyperProperties>,
        WeakMap<Context<T>, WR & HyperProperties>,
    ];
    state: Map<string, unknown>;
    childNodes?: IterableNodeList;
    slotChildNodes?: IterableNodeList;
    first?: Node;
    last?: Node;
    function?: TemplateFunction<{}>;
    fragments: Context<Node>[];
    parent?: Context<Node>;
    root?: Context<Node>;
};

/**
 * Attach a context to an object.
 * @param target The object to context.
 * @param context The context to set.
 */
export const setContext = <T extends Node>(target: WithContext<T>, context: Context<T>): Context<T> => target[CONTEXT_SYMBOL] = context;

/**
 * Create a node context.
 * @param node The node scope of the context.
 * @return A context object for the node.
 */
export const createContext = <T extends Node>(node: T) => {
    const isElementNode = isElement(node);
    const isTextNode = !isElementNode && isText(node);
    const is = (node as unknown as CustomElement<HTMLElement>).is;
    return setContext(node, {
        node,
        isElement: isElementNode,
        isText: isTextNode,
        tagName: isElementNode ? (node as unknown as HTMLElement).tagName.toLowerCase() : undefined,
        childNodes: isElementNode ? node.childNodes as unknown as IterableNodeList : undefined,
        is,
        props: [new WeakMap(), new WeakMap()],
        state: new Map(),
        fragments: [],
    } as Context<T>);
};

/**
 * Get the context attached to an object.
 * @param target The scope of the context.
 * @return The context object (if it exists).
 */
export const getOrCreateContext = <T extends Node>(target: WithContext<T>): Context<T> => target[CONTEXT_SYMBOL] || createContext(target);

/**
 * Cleanup child fragments of a context.
 * @param context The fragment to empty.
 */
export const emptyFragments = <T extends Node>(context: Context<T>) => {
    let fragments = context.fragments;
    let len = fragments.length;
    while (len--) {
        let frag = fragments.pop() as Context<Node>;
        emptyFragments(frag);
    }
    return fragments;
};

/**
 * A cache for converted class values.
 */
const CLASSES_CACHE: { [key: string]: string[] } = {};

/**
 * Convert strings or classes map to a list of classes.
 * @param value The value to convert.
 * @return A list of classes.
 */
const convertClasses = (value: HyperClasses | null | undefined) => {
    let classes: string[] = [];
    if (!value) {
        return classes;
    }
    if (typeof value === 'object') {
        for (let k in value) {
            if (value[k]) {
                classes.push(k);
            }
        }
        return classes;
    }
    return classes = CLASSES_CACHE[value] = CLASSES_CACHE[value] || value.toString().trim().split(' ');
};

/**
 * A cache for converted style values.
 */
const STYLES_CACHE: { [key: string]: { [key: string]: string } } = {};

/**
 * Convert strings or styles map to a list of styles.
 * @param value The value to convert.
 * @return A set of styles.
 */
const convertStyles = (value: HyperStyle| null | undefined) => {
    const styles: { [key: string]: string } = {};
    if (!value) {
        return styles;
    }
    if (typeof value === 'object') {
        for (let propertyKey in value) {
            const camelName = propertyKey.replace(/[A-Z]/g, (match: string) =>
                `-${match.toLowerCase()}`
            );
            styles[camelName] = value[propertyKey];
        }
        return styles;
    }
    return STYLES_CACHE[value] = STYLES_CACHE[value] || value
        .toString()
        .split(';')
        .reduce((ruleMap: { [key: string]: string }, ruleString: string) => {
            let rulePair = ruleString.split(':');
            if (rulePair.length > 1) {
                ruleMap[(rulePair.shift() as string).trim()] = rulePair.join(':').trim();
            }
            return ruleMap;
        }, styles);
};

/**
 * Check if the render engine is handling input values.
 * @param element The current node element.
 * @param propertyKey The changed property key.
 */
const isRenderingInput = (element: HTMLElement, propertyKey: string): element is HTMLInputElement =>
    (propertyKey === 'checked' || propertyKey === 'value') &&
    element.tagName === 'INPUT';

const fillEmptyValues = <T extends {}>(from: T, to: { [key: string]: unknown }) => {
    for (let key in from) {
        if (!(key in to)) {
            to[key] = undefined;
        }
    }

    return to as unknown as T;
};

/**
 * Set a value to an HTML element.
 * @param element The node to update.
 * @param propertyKey The key to update.
 * @param value The value to set.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setValue = <T extends HTMLElement>(element: T, propertyKey: WritableOf<T>, value: any) => {
    element[propertyKey] = value;
};

/**
 * Render a set of Nodes into another, with some checks for Nodes in order to avoid
 * useless changes in the tree and to mantain or update the state of compatible Nodes.
 *
 * @param root The root Node for the render.
 * @param input The child (or the children) to render in Virtual DOM format or already generated.
 * @param slot Should handle slot children.
 * @param context The render context of the root.
 * @param namespace The current namespace uri of the render.
 * @param rootContext The current custom element context of the render.
 * @param refContext The main context of the render.
 * @param fragment The fragment context to update.
 * @return The resulting child nodes list.
 */
export const internalRender = (
    root: Node,
    input: Template,
    slot = isComponent(root),
    context?: Context<Node>,
    namespace: NamespaceURI = (root.namespaceURI as NamespaceURI) || NamespaceURI.xhtml,
    rootContext?: Context<Node>,
    mainContext?: Context<Node>,
    fragment?: Context<Node>
) => {
    let renderContext = context || getOrCreateContext(root);
    const refContext = mainContext || renderContext;

    let childNodes: IterableNodeList;
    if (slot && renderContext.slotChildNodes) {
        childNodes = renderContext.slotChildNodes as IterableNodeList;
    } else {
        childNodes = renderContext.childNodes || (root.childNodes as unknown as IterableNodeList);
        if (renderContext.is) {
            rootContext = renderContext;
        }
    }
    if (!childNodes) {
        return childNodes;
    }

    let currentIndex: number;
    let currentFragment = fragment;
    let lastNode: Node|undefined;
    if (fragment) {
        currentIndex = indexOf.call(childNodes, fragment.first as Node);
        lastNode = fragment.last as Node;
    } else {
        emptyFragments(renderContext);
        currentIndex = 0;
    }
    let currentNode = childNodes.item(currentIndex) as Node;
    let currentContext = currentNode ? getOrCreateContext(currentNode) : null;

    const handleItems = (template: Template, filter?: TemplateFilter) => {
        if (template == null || template === false) {
            return;
        }

        let templateNode;
        let templateContext: Context<Node> | undefined;
        let templateChildren: Template[] | undefined;
        let templateNamespace = namespace;

        if (isArray(template)) {
            // call the render function for each child
            for (let i = 0, len = template.length; i < len; i++) {
                handleItems(template[i], filter);
            }
            return;
        }

        if (isThenable(template)) {
            handleItems(h((props, data, requestUpdate) => {
                const status = getThenableState(template as Promise<unknown>);
                if (status.pending) {
                    (template as Promise<unknown>)
                        .catch(() => 1)
                        .then(() => {
                            requestUpdate();
                        });
                }
                return status.result as Template;
            }, null), filter);
            return;
        }

        if (isObservable(template)) {
            const observable = template;
            handleItems(h((props, context, requestUpdate) => {
                const status = getObservableState(observable);
                if (!status.complete) {
                    const subscription = observable.subscribe(
                        () => {
                            if (!requestUpdate()) {
                                subscription.unsubscribe();
                            }
                        },
                        () => {
                            if (!requestUpdate()) {
                                subscription.unsubscribe();
                            }
                        },
                        () => {
                            subscription.unsubscribe();
                        }
                    );
                }
                return status.current as Template;
            }, null), filter);
            return;
        }

        if (isNode(template)) {
            templateNode = template;
        } else if (typeof template !== 'object') {
            if (typeof template === 'string' && rootContext && renderContext.tagName === 'style') {
                const is = rootContext.is as string;
                template = css(is, template as string, customElements.tagNames[is]);
                (root as HTMLStyleElement).setAttribute('name', is);
            }

            if (currentContext && currentContext.isText && !currentContext.function) {
                templateNode = currentNode as Text;
                if (templateNode.textContent != template) {
                    templateNode.textContent = template as string;
                }
            } else {
                // convert non-Node template into Text
                templateNode = DOM.createTextNode(template as string);
            }
        } else {
            if (isHyperFragment(template)) {
                handleItems(template.children, filter);
                return;
            }

            if (isHyperFunction(template)) {
                const { Function, properties, children } = template;
                const rootFragment = fragment;
                const previousContext = renderContext;
                const previousFragment = currentFragment;
                const fragments = renderContext.fragments;
                let state: Map<string, unknown>;
                let placeholder: Node;
                if (fragment) {
                    state = fragment.state;
                    placeholder = fragment.first as Node;
                } else if (currentContext && currentContext.function === Function) {
                    state = currentContext.state;
                    placeholder = currentContext.first as Node;
                } else {
                    state = new Map();
                    placeholder = DOM.createComment(Function.name);
                }

                const renderFragmentContext = getOrCreateContext(placeholder);
                emptyFragments(renderFragmentContext);
                renderFragmentContext.state = state;
                renderFragmentContext.function = Function;
                renderFragmentContext.first = placeholder;
                const live = () => fragments.indexOf(renderFragmentContext) !== -1;

                renderContext = renderFragmentContext;
                currentFragment = renderFragmentContext;
                fragment = undefined;

                handleItems(
                    [
                        placeholder,
                        Function(
                            {
                                children,
                                ...properties,
                            },
                            state,
                            () => {
                                if (!live()) {
                                    return false;
                                }
                                internalRender(root, template, slot, previousContext, namespace, rootContext, refContext, renderFragmentContext);
                                return true;
                            },
                            live,
                            renderContext
                        ),
                    ],
                    filter
                );

                fragment = rootFragment;
                renderFragmentContext.last = childNodes.item(currentIndex - 1) as Node;
                renderContext = previousContext;
                currentFragment = previousFragment;

                if (!fragment) {
                    fragments.push(renderFragmentContext);
                } else {
                    fragments.splice(fragments.indexOf(fragment), 1, renderFragmentContext);
                    fragment = renderFragmentContext;
                }
                return;
            }

            // if the current patch is a slot,
            if (isHyperSlot(template)) {
                if (rootContext) {
                    const { properties, children } = template;
                    const slotChildNodes = rootContext.slotChildNodes;
                    if (slotChildNodes) {
                        for (let i = 0, len = slotChildNodes.length; i < len; i++) {
                            const node = slotChildNodes.item(i) as Node;
                            const context = getOrCreateContext(node);
                            if (!context.root) {
                                context.root = rootContext;
                            }
                        }
                    }

                    const name = properties.name;
                    const filter = (item: Node) => {
                        if (getOrCreateContext(item).root === rootContext) {
                            if (isElement(item)) {
                                if (!name) {
                                    return !item.getAttribute('slot');
                                }

                                return item.getAttribute('slot') === name;
                            }
                        }

                        return !name;
                    };

                    handleItems(slotChildNodes || [], filter);
                    if (!childNodes.length) {
                        handleItems(children);
                    }
                }
                return;
            }

            const { key, children, namespaceURI } = template;
            if (isHyperNode(template)) {
                templateNode = template.node;
            } else {
                templateNamespace = namespaceURI || namespace;

                checkKey: if (currentContext) {
                    let currentKey = currentContext.key;
                    if (currentKey != null && key != null && key !== currentKey) {
                        DOM.removeChild(root, currentNode, slot);
                        currentNode = childNodes.item(currentIndex) as Node;
                        currentContext = currentNode ? getOrCreateContext(currentNode) : null;
                        if (!currentContext) {
                            break checkKey;
                        }
                        currentKey = currentContext.key;
                    }

                    if (currentFragment && currentNode) {
                        const io = indexOf.call(childNodes, currentNode);
                        const lastIo = indexOf.call(childNodes, currentFragment.last);
                        if (io !== -1 && io > lastIo) {
                            break checkKey;
                        }
                    }

                    if (key != null || currentKey != null) {
                        if (key === currentKey) {
                            templateNode = currentNode;
                            templateContext = currentContext;
                        }
                    } else if (isHyperComponent(template) && currentNode instanceof template.Component) {
                        templateNode = currentNode;
                        templateContext = currentContext;
                    } else if (isHyperTag(template) && currentContext.tagName === template.tag) {
                        templateNode = currentNode;
                        templateContext = currentContext;
                    }
                }

                if (!templateNode) {
                    if (isHyperComponent(template)) {
                        templateNode = new template.Component();
                    } else {
                        templateNode = DOM.createElementNS(templateNamespace, template.tag);
                    }
                }
            }

            // update the Node properties
            const templateElement = templateNode as HTMLElement;

            templateContext = templateContext || getOrCreateContext(templateElement);
            const map = templateContext.props[slot ? 1 : 0];
            const oldProperties = (map.get(refContext) || {}) as Writable<HTMLElement> & HyperProperties;
            const properties = fillEmptyValues(oldProperties, template.properties);
            map.set(refContext, properties);
            if (key != null) {
                templateContext.key = key;
            }

            let propertyKey: keyof typeof properties;
            for (propertyKey in properties) {
                if (propertyKey === 'is' || propertyKey === 'key' || propertyKey === 'children' || propertyKey === 'xmlns') {
                    continue;
                }
                const value = properties[propertyKey];
                const oldValue = oldProperties[propertyKey];
                if (oldValue === value) {
                    if (isRenderingInput(templateElement, propertyKey)) {
                        templateElement[propertyKey as unknown as 'value'] = value as string;
                    }
                    continue;
                }

                if (propertyKey === 'style') {
                    const style = templateElement.style;
                    const oldStyles = convertStyles(oldProperties.style);
                    const newStyles = convertStyles(properties.style);
                    for (let propertyKey in oldStyles) {
                        if (!(propertyKey in newStyles)) {
                            style.removeProperty(propertyKey);
                        }
                    }
                    for (let propertyKey in newStyles) {
                        style.setProperty(propertyKey, newStyles[propertyKey]);
                    }
                    continue;
                } else if (propertyKey === 'class') {
                    const classList = templateElement.classList;
                    const newClasses = convertClasses(properties.class);
                    if (oldValue) {
                        const oldClasses = convertClasses(oldProperties.class);
                        for (let i = 0, len = oldClasses.length; i < len; i++) {
                            const className = oldClasses[i];
                            if (newClasses.indexOf(className) === -1) {
                                classList.remove(className);
                            }
                        }
                    }
                    for (let i = 0, len = newClasses.length; i < len; i++) {
                        const className = newClasses[i];
                        if (!classList.contains(className)) {
                            classList.add(className);
                        }
                    }
                    continue;
                } else if (propertyKey[0] === 'o' && propertyKey[1] === 'n' && !(propertyKey in templateElement.constructor.prototype)) {
                    const eventName = propertyKey.substr(2);
                    if (oldValue) {
                        templateElement.removeEventListener(eventName, oldValue as EventListener);
                    }
                    if (value) {
                        templateElement.addEventListener(eventName, value as EventListener);
                    }
                    continue;
                }

                const type = typeof value;
                const wasType = typeof oldValue;
                const isReference = (value && type === 'object') || type === 'function';
                const wasReference = (oldValue && wasType === 'object') || wasType === 'function';

                if (isReference || wasReference) {
                    setValue(templateElement, propertyKey, value);
                } else if (isHyperComponent(template)) {
                    if (type === 'string') {
                        const observedAttributes = template.Component.observedAttributes;
                        if (!observedAttributes || observedAttributes.indexOf(propertyKey) === -1) {
                            setValue(templateElement, propertyKey, value);
                        }
                    } else {
                        setValue(templateElement, propertyKey, value);
                    }
                }

                if (value == null || value === false) {
                    if (templateElement.hasAttribute(propertyKey)) {
                        templateElement.removeAttribute(propertyKey);
                    }
                } else if (!isReference) {
                    const attrValue = value === true ? '' : (value as string).toString();
                    if (templateElement.getAttribute(propertyKey) !== attrValue) {
                        templateElement.setAttribute(propertyKey, attrValue);
                    }
                }
            }

            templateChildren = children;
        }

        if (filter && !filter(templateNode)) {
            return;
        }

        // now, we are confident that if the input is a Node or a Component,
        // check if Nodes are the same instance
        // (patch result should return same Node instances for compatible types)
        if (templateNode !== currentNode) {
            // they are different, so we need to insert the new Node into the tree
            // if current iterator is defined, insert the Node before it
            // otherwise append the new Node at the end of the parent
            DOM.insertBefore(root, templateNode, currentNode, slot);
            currentIndex++;
        } else {
            currentNode = childNodes.item(++currentIndex) as Node;
            currentContext = currentNode ? getOrCreateContext(currentNode) : null;
        }

        if (isElement(templateNode) &&
            templateChildren &&
            templateContext &&
            ((templateContext.parent && templateContext.parent === refContext) || templateChildren.length)) {
            templateContext.parent = refContext;
            // the Node has slotted children, trigger a new render context for them
            internalRender(
                templateNode as HTMLElement,
                templateChildren,
                isComponent(templateNode),
                templateContext,
                templateNamespace,
                rootContext,
                refContext
            );
        }
    };

    handleItems(input);

    // all children of the root have been handled,
    // we can start to cleanup the tree
    // remove all Nodes that are outside the result range
    let lastIndex: number;
    if (lastNode) {
        lastIndex = indexOf.call(childNodes, lastNode) + 1;
    } else {
        lastIndex = childNodes.length;
    }
    while (currentIndex < lastIndex) {
        const item = childNodes.item(--lastIndex) as Node;
        if (slot) {
            const context = getOrCreateContext(item);
            if (context.root === rootContext) {
                delete context.root;
            }
            if (context.parent === refContext) {
                delete context.parent;
            }
        }
        DOM.removeChild(root, item, slot);
    }

    return childNodes;
};

/**
 * Render a set of Nodes into another, with some checks for Nodes in order to avoid
 * useless changes in the tree and to mantain or update the state of compatible Nodes.
 *
 * @param input The child (or the children) to render in Virtual DOM format or already generated.
 * @param root The root Node for the render.
 * @param slot Should render to slot children.
 * @return The resulting child Nodes.
 */
export const render = (input: Template, root: Node = DOM.createDocumentFragment(), slot: boolean = isComponent(root)): Node | Node[] | void => {
    const childNodes = internalRender(root, input, slot);
    if (!childNodes) {
        return;
    }
    if (childNodes.length < 2) {
        return childNodes[0];
    }
    return cloneChildNodes(childNodes);
};
