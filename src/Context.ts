import type { TemplateFunction } from './Template';
import type { IterableNodeList } from './NodeList';
import type { ComponentInstance } from './Component';
import { isElement, isText } from './helpers';
import { createSymbolKey } from './symbols';

/**
 * A symbol for node context.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CONTEXT_SYMBOL: unique symbol = createSymbolKey() as any;

export type WithContext<T> = T & {
    [CONTEXT_SYMBOL]?: Context;
};

/**
 * A map of properties for each context.
 */
export type PropertiesMap = WeakMap<Context, { [key: string]: unknown }>;

/**
 * The node context interface.
 */
export type Context = {
    isElement?: boolean;
    isText?: boolean;
    tagName?: string;
    is?: string;
    key?: unknown;
    props: [PropertiesMap, PropertiesMap];
    state: Map<string, unknown>;
    childNodes?: IterableNodeList;
    slotChildNodes?: IterableNodeList;
    first?: Node;
    last?: Node;
    function?: TemplateFunction;
    fragments: Context[];
    parent?: Context;
    root?: Context;
};

/**
 * Attach a context to an object.
 * @param target The object to context.
 * @param context The context to set.
 */
export const setContext = (target: WithContext<Node>, context: Context): Context => target[CONTEXT_SYMBOL] = context;

/**
 * Create a node context.
 * @param node The node scope of the context.
 * @return A context object for the node.
 */
export const createContext = (node: Node) => {
    const isElementNode = isElement(node);
    const isTextNode = !isElementNode && isText(node);
    const is = (node as ComponentInstance<HTMLElement>).is;
    return setContext(node, {
        isElement: isElementNode,
        isText: isTextNode,
        tagName: isElementNode ? (node as HTMLElement).tagName.toLowerCase() : undefined,
        childNodes: isElementNode ? node.childNodes as unknown as IterableNodeList : undefined,
        is,
        props: [new WeakMap(), new WeakMap()],
        state: new Map(),
        fragments: [],
    });
};

/**
 * Get the context attached to an object.
 * @param target The scope of the context.
 * @return The context object (if it exists).
 */
export const getOrCreateContext = (target: WithContext<Node>): Context => target[CONTEXT_SYMBOL] || createContext(target);

/**
 * Cleanup child fragments of a context.
 * @param context The fragment to empty.
 */
export const emptyFragments = (context: Context) => {
    let fragments = context.fragments;
    let len = fragments.length;
    while (len--) {
        let frag = fragments.pop() as Context;
        emptyFragments(frag);
    }
    return fragments;
};
