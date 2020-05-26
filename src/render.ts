import { isComponent } from './Interfaces';
import { Template, TemplateItem, TemplateItems, TemplateFilter } from './Template';
import { isHyperNode } from './HyperNode';
import { DOM, isElement, isText, cloneChildNodes } from './DOM';
import { Context, createContext, getContext, setContext } from './Context';
import { isThenable, getThenableState } from './Thenable';
import { Subscription, isObservable, getObservableState } from './Observable';
import { createSymbolKey } from './symbols';
import { css } from './css';
import { ComponentInterface } from '@chialab/dna';

/**
 * Alias to Array.isArray.
 */
const isArray = Array.isArray;

/**
 * A symbol to store node properties.
 */
const PRIVATE_CONTEXT_SYMBOL = createSymbolKey();

/**
 * Match letters after an hypen.
 */
const HYPHEN_REGEX = /-([a-z])/g;

/**
 * Make the matched group uppercase.
 * @param match The full match string.
 * @param letter The string to capitalize.
 */
const hyphenReplacer = (match: string, letter: string) => letter.toUpperCase();

/**
 * Render a set of Nodes into another, with some checks for Nodes in order to avoid
 * useless changes in the tree and to mantain or update the state of compatible Nodes.
 *
 * @param root The root Node for the render.
 * @param input The child (or the children) to render in Virtual DOM format or already generated.
 * @param context The render context object.
 * @return The resulting child Nodes.
 */
export const render = (root: HTMLElement, input: Template, context?: Context, rootContext?: Context, filter?: TemplateFilter, slot = false): Node | Node[] | void => {
    const renderContext = context || getContext(root) || createContext(root);
    const rootRenderContext = rootContext || renderContext;
    const isStyle = root.localName === 'style';
    const rootNamespaceURI = root.namespaceURI;
    // result list
    const results: Node[] = [];

    let childNodes = (slot && (root as ComponentInterface<any>).slotChildNodes.slice(0)) || cloneChildNodes(root);
    // the current iterating node
    let currentIndex = 0;
    let currentNode = childNodes[currentIndex] as Node;

    // promises list
    let promises: Promise<unknown>[];
    let subscriptions: Subscription[];
    if (rootRenderContext === renderContext) {
        let oldSubscriptions = rootRenderContext.subscriptions;
        if (oldSubscriptions) {
            oldSubscriptions.forEach((subscription) => subscription.unsubscribe());
        }
        promises = rootRenderContext.promises = [];
        subscriptions = rootRenderContext.subscriptions = [];
    } else {
        promises = rootRenderContext.promises as Promise<unknown>[];
        subscriptions = rootRenderContext.subscriptions as Subscription[];
    }

    const handleItems = (template: Template, templateContext: Context, filter?: TemplateFilter) => {
        if (template == null || template === false) {
            return;
        }

        if (isArray(template)) {
            templateContext = getContext(template) || templateContext;
            // call the render function for each child
            for (let i = 0, len = template.length; i < len; i++) {
                handleItems(template[i], templateContext, filter);
            }
            return;
        }

        if (isThenable(template)) {
            let status = getThenableState(template);
            if (status.pending) {
                promises.push(template);
                template
                    .catch(() => 1)
                    .then(() => {
                        let list = rootRenderContext.promises;
                        if (list && list.indexOf(template as Promise<unknown>) !== -1) {
                            render(root, input, templateContext, rootRenderContext, filter, slot);
                        }
                    });
            }
            handleItems(status.result, templateContext, filter);
            return;
        }

        if (isObservable(template)) {
            let status = getObservableState(template);
            if (!status.complete) {
                let subscription = template.subscribe(() => {
                    render(root, input, templateContext, rootRenderContext, filter, slot);
                }, () => {
                    render(root, input, templateContext, rootRenderContext, filter, slot);
                }, () => {
                    subscription.unsubscribe();
                });
                subscriptions.push(subscription);
            }
            handleItems(status.current, templateContext, filter);
            return;
        }

        let newNode: Element | Text | undefined;
        let newChildren: TemplateItems | undefined;
        let isObject = typeof template === 'object';

        if (isObject && isHyperNode(template)) {
            let { Component, Function, tag, properties, children, key, isFragment, isSlot, namespaceURI } = template;

            if (Function) {
                handleItems(Function(properties, templateContext), templateContext, filter);
                return;
            }

            if (isFragment) {
                handleItems(children, templateContext, filter);
                return;
            }

            // if the current patch is a slot,
            if (isSlot) {
                let slottedChildren = ((templateContext as ComponentInterface<any>).slotChildNodes || []).slice(0);
                let childContext = getContext(slottedChildren) || templateContext;
                let filter;
                if (properties.name) {
                    filter = (item: TemplateItem) => {
                        if (isElement(item)) {
                            return DOM.getAttribute(item, 'slot') === properties.name;
                        }
                        return false;
                    };
                } else {
                    filter = (item: TemplateItem) => {
                        if (isElement(item)) {
                            return !DOM.getAttribute(item, 'slot');
                        }
                        return true;
                    };
                }

                setContext(slottedChildren, childContext);
                handleItems(slottedChildren, templateContext, filter);
                return;
            }

            // create the node
            let isNew = true;
            if (isElement(currentNode)) {
                let prevKey = (currentNode as any).key;
                if (prevKey != null && key != null && key !== prevKey) {
                    let prevCurrentNode = currentNode;
                    currentNode = childNodes[++currentIndex] as Node;
                    prevKey = isElement(currentNode) && (currentNode as any).key;
                    DOM.removeChild(root, prevCurrentNode);
                }
                if (key != null || prevKey != null) {
                    if (key === prevKey) {
                        isNew = false;
                        newNode = currentNode as Element;
                    }
                } else if (Component && currentNode instanceof Component) {
                    isNew = false;
                    newNode = currentNode;
                } else if (tag && (currentNode as Element).localName === tag) {
                    isNew = false;
                    newNode = currentNode as Element;
                }
            }

            if (!newNode) {
                if (Component) {
                    newNode = new Component();
                } else {
                    let currentNamespace = namespaceURI || rootNamespaceURI;
                    if (currentNamespace) {
                        newNode = DOM.createElementNS(currentNamespace, tag as string);
                    } else {
                        newNode = DOM.createElement(tag as string);
                    }
                }

                if (key) {
                    (newNode as any).key = key;
                    Object.defineProperty(templateContext, key, {
                        configurable: true,
                        writable: false,
                        value: newNode,
                    });
                }
            }

            // update the Node properties
            const childContext: any = (newNode as any)[PRIVATE_CONTEXT_SYMBOL] = (newNode as any)[PRIVATE_CONTEXT_SYMBOL] || {};
            for (let propertyKey in childContext) {
                if (!(propertyKey in properties)) {
                    properties[propertyKey] = null;
                }
            }
            for (let propertyKey in properties) {
                let value = properties[propertyKey];
                let oldValue = childContext[propertyKey];
                let type = typeof value;
                let isReference = type === 'object' || type === 'function';
                let changed = !(propertyKey in childContext) || value !== oldValue;

                childContext[propertyKey] = value;

                if (isReference && propertyKey === 'style') {
                    let diff = typeof oldValue === 'object';
                    let style = (newNode as HTMLElement).style;
                    for (let i = style.length; i--;) {
                        let hypenName = style[i];
                        let camelName = hypenName.replace(HYPHEN_REGEX, hyphenReplacer);
                        if (!diff || (camelName in oldValue)) {
                            style.removeProperty(hypenName);
                        }
                    }
                    for (let key in value) {
                        (style as any)[key] = value[key];
                    }
                    continue;
                }

                if (!changed) {
                    continue;
                }

                if (Component || isReference) {
                    (newNode as any)[propertyKey] = value;
                }

                if (value == null || value === false) {
                    if (!isNew && DOM.hasAttribute(newNode as Element, propertyKey)) {
                        DOM.removeAttribute(newNode as Element, propertyKey);
                    }
                } else if (!isReference) {
                    let attrValue = value === true ? '' : value;
                    if (isNew || DOM.getAttribute(newNode as Element, propertyKey) !== attrValue) {
                        DOM.setAttribute(newNode as Element, propertyKey, attrValue);
                    }
                }
            }

            // store the Node children in order to reuse them
            // at the next render cycle
            setContext(children, templateContext);
            newChildren = children;
        } else if (isObject && (isElement(template) || isText(template))) {
            newNode = template;
        } else {
            if (isStyle && typeof template === 'string' && templateContext.is) {
                template = css(templateContext.is as string, template);
                root.setAttribute('name', templateContext.is);
            }

            if (isText(currentNode)) {
                newNode = currentNode as Text;
                if (currentNode.textContent != template) {
                    newNode.textContent = template as string;
                }
            } else {
                // convert non-Node template into Text
                newNode = DOM.createTextNode(template as string);
            }
        }

        if (filter && !filter(newNode)) {
            return results;
        }

        // now, we are confident that if the input is a Node or a Component,
        // check if Nodes are the same instance
        // (patch result should return same Node instances for compatible types)
        if (newNode !== currentNode) {
            // they are different, so we need to insert the new Node into the tree
            // if current iterator is defined, insert the Node before it
            // otherwise append the new Node at the end of the parent
            DOM.insertBefore(root, newNode, currentNode, slot);
        } else {
            currentNode = childNodes[++currentIndex]  as Node;
        }

        results.push(newNode);

        if (isElement(newNode) && newChildren) {
            // the Node has slotted children, trigger a new render context for them
            render(newNode as HTMLElement, newChildren, createContext(templateContext), rootRenderContext, undefined, isComponent(newNode));
        }

        return;
    };

    handleItems(input, renderContext, filter);

    // all children of the root have been handled,
    // we can start to cleanup the tree
    // remove all Nodes that are outside the result range
    let length = childNodes.length;
    while (length > currentIndex) {
        DOM.removeChild(root, childNodes[--length] as Node, slot);
    }

    if (results.length < 2) {
        return results[0];
    }
    return results as Node[];
};
