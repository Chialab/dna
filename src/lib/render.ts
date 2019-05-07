import { DOM } from './dom';
import { Scope, createScope, getScope } from './Scope';
import { Template, TemplateFilter, getTemplateItemsFilter, getSlotted } from './Template';
import { isHyperFunction } from './h';
import { isInterpolateFunction } from './interpolate';
import { scopeCSS } from './style';

export type RenderContext = {
    scope: Scope,
    currentNode: Node,
};

/**
 * Check if a node is a `<style>` element.
 *
 * @param node The node to check.
 * @return The node is a `<style>` element.
 */
function isStyleTag(node: any): node is HTMLStyleElement {
    return node && node.tagName === 'STYLE';
}

/**
 * Render a set of Nodes into another, with some checks for Nodes in order to avoid
 * useless changes in the tree and to mantain or update the state of compatible Nodes.
 *
 * @param node The root Node for the render
 * @param input The child (or the children) to render in Virtual DOM format or already generated
 * @return The resulting child Nodes
 */
export function render(node: HTMLElement, input: Template, context?: RenderContext, previousResult?: Template[], filter?: TemplateFilter): Template | Template[] | void {
    // `result` is private params for recursive render cycles
    const isFirstRender = !previousResult;
    const result = previousResult || [];


    if (input != null && input !== false) {
        context = context || { scope: getScope(node) || createScope(node), currentNode: node.firstChild as Node };
        let inputScope = getScope(input) || context.scope;
        // if the input is an Array
        if (Array.isArray(input)) {
            // call the render function for each child
            for (let i = 0, len = input.length; i < len; i++) {
                render(node, input[i], context, result, getTemplateItemsFilter(input));
            }
        // if it is an InterpolatedFunction or a HyperFunction
        } else if (isInterpolateFunction(input)) {
            render(node, input.call(inputScope), context, result, filter);
        } else if (isHyperFunction(input)) {
            render(node, input.call(inputScope, context.currentNode as HTMLElement), context, result, filter);
        } else {
            // if it is "something" (eg a Node, a Component, a text etc)

            // add the input to the result
            result.push(input);

            let inputElement: Template;
            if (isStyleTag(node) && DOM.hasAttribute(node, 'scoped') && typeof input === 'string') {
                let name: string = DOM.getAttribute(node, 'scoped') as string;
                if (!name) {
                    name = inputScope.is as string;
                }
                scopeCSS(node, name, input);
                inputElement = node.childNodes[0] as Text;
            } else if (DOM.isElement(input) || DOM.isText(input)) {
                inputElement = input;
            } else {
                // convert non-Node input into Text
                inputElement = DOM.createTextNode(input as string);
            }

            if (!filter || filter(inputElement)) {
                // get the current iterator for comparison
                const { currentNode } = context;

                // now, we are confident that if the input is a Node or a Component,
                // check if Nodes are the same instance
                // (patch result should return same Node instances for compatible types)
                if (inputElement !== currentNode) {
                    // they are different, so we need to insert the new Node into the tree
                    if (currentNode) {
                        if (DOM.isText(inputElement) && DOM.isText(currentNode)) {
                            // just update the text content of the text node
                            let content = inputElement.textContent;
                            if (currentNode.textContent !== content) {
                                currentNode.textContent = content;
                            }
                            context.currentNode = currentNode.nextSibling as Node;
                        } else {
                            // if current iterator is defined, insert the Node before it
                            DOM.insertBefore(node, inputElement, currentNode);
                        }
                    } else {
                        // append the new Node at the end of the parent
                        DOM.appendChild(node, inputElement);
                    }
                } else {
                    // move forward the iterator for comparison
                    context.currentNode = currentNode.nextSibling as Node;
                }

                if (DOM.isElement(inputElement)) {
                    const slotted = getSlotted(inputElement);
                    if (slotted && !DOM.isCustomElement(inputElement)) {
                        // the Node has slotted children, trigger a new render context for them
                        render(inputElement, slotted, context);
                    }
                }
            }
        }
    }
    if (isFirstRender && result) {
        // all children of the root have been handled,
        // we can start to cleanup the tree
        let len = result.length;
        let childNodes = node.childNodes;
        // remove all Nodes that are outside the result range
        while (childNodes.length > len) {
            DOM.removeChild(node, childNodes[childNodes.length - 1]);
        }
        if (len === 0) {
            // no results, return void
            return;
        } else if (len === 1) {
            // single result, return the single entry
            return result[0];
        }
    }
    return result;
}
