import { createSymbolKey } from './symbols';
import { ClassElement } from './ClassElement';
import { DOM, assertNode, assertEventName, assertEventSelector, assertEventCallback } from './DOM';
import { CustomElement } from './CustomElement';

/**
 * A Symbol which contains all Node delegation.
 */
const EVENT_CALLBACKS_SYMBOL: unique symbol = createSymbolKey() as any;

/**
 * Describe the signature of a delegated event callback.
 * @param event The original DOM event.
 * @param target The matched delegated element.
 */
export type DelegatedEventCallback = (event: Event, target?: Node) => any;

/**
 * A descriptor for an event delegation.
 */
type DelegatedEventDescriptor = {
    /**
     * The name of the delegated event.
     */
    event: string;
    /**
     * The selector for the delegated event.
     */
    selector: string | null;
    /**
     * The callback for the delegated event.
     */
    callback?: DelegatedEventCallback;
};

/**
 * A collector for event delegations.
 */
type DelegationList = {
    /**
     * A list of delegation descriptors.
     */
    descriptors: DelegatedEventDescriptor[],
    /**
     * The real event listener.
     */
    listener: EventListenerOrEventListenerObject;
}

/**
 * An object with event delegations.
 */
type WithEventDelegations = {
    [EVENT_CALLBACKS_SYMBOL]?: {
        [key: string]: DelegationList;
    };
}

/**
 * Delegate an Event listener.
 *
 * @param element The root element for the delegation
 * @param eventName The event name to listen
 * @param selector The selector to delegate
 * @param callback The callback to trigger when an Event matches the delegation
 * @param options An options object that specifies characteristics about the event listener. @see [MDN]{@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
 */
export const delegateEventListener = (element: Node, eventName: string, selector: string|null, callback: DelegatedEventCallback, options?: AddEventListenerOptions) => {
    const delegatedElement: Node & WithEventDelegations = element;

    assertNode(element);
    assertEventName(eventName);
    assertEventSelector(selector);
    assertEventCallback(callback);

    // get all delegations
    const delegations = delegatedElement[EVENT_CALLBACKS_SYMBOL] = delegatedElement[EVENT_CALLBACKS_SYMBOL] || {};
    // initialize the delegation list
    const callbacks: DelegationList = delegations[eventName] = delegations[eventName] || {
        descriptors: [],
    };
    const descriptors = callbacks.descriptors;
    // check if the event has already been delegated
    if (!callbacks.listener) {
        // setup the listener
        callbacks.listener = (event) => {
            if (!event.target) {
                return;
            }
            const eventTarget = event.target as Node;
            // wrap the Event's stopPropagation in order to prevent other delegations from the same root
            let stopped = false;
            let stoppedImmediated = false;
            const originalStopPropagation = event.stopPropagation;
            const originalImmediatePropagation = event.stopImmediatePropagation;
            event.stopPropagation = () => {
                stopped = true;
                // exec the real stopPropagation method
                return originalStopPropagation.call(event);
            };
            event.stopImmediatePropagation = () => {
                stopped = true;
                stoppedImmediated = true;
                // exec the real stopPropagation method
                return originalImmediatePropagation.call(event);
            };

            // filter matched selector for the event
            const filtered: { target: Node; callback: DelegatedEventCallback; }[] = [];
            for (let i = 0; i < descriptors.length; i++) {
                let { selector, callback } = descriptors[i];
                let selectorTarget;
                if (selector) {
                    let target = eventTarget;
                    while (target && target !== element) {
                        if (DOM.isElement(target) && DOM.matches(target, selector)) {
                            selectorTarget = target;
                            break;
                        }
                        target = target.parentNode as Node;
                    }
                } else {
                    selectorTarget = element;
                }
                if (selectorTarget) {
                    filtered.push({
                        target: selectorTarget,
                        callback: callback as DelegatedEventCallback,
                    });
                }
            }

            let lastTarget: Node;
            filtered
                // clone the array in order to correctly sort callbacks in old browsers
                .slice(0)
                // reorder targets by position in the dom tree.
                .sort((match1, match2) => {
                    if (match1.target === match2.target) {
                        return filtered.indexOf(match1) - filtered.indexOf(match2);
                    }
                    return match1.target.contains(match2.target) ? filtered.length : -filtered.length;
                })
                // trigger the callback
                .some(({ callback, target }) => {
                    if (stoppedImmediated) {
                        return true;
                    }
                    if (stopped && target !== lastTarget) {
                        return true;
                    }
                    lastTarget = target;
                    return callback.call(element, event, target) === false;
                });
        };

        element.addEventListener(eventName, callbacks.listener, options);
    }

    // add the delegation to the list
    descriptors.push({ event: eventName, callback, selector });
};

/**
 * Remove an Event delegation.
 *
 * @param element The root element of the delegation
 * @param eventName The Event name to undelegate
 * @param selector The selector to undelegate
 * @param callback The callback to remove
 */
export const undelegateEventListener = (element: Node, eventName: string, selector: string | null, callback: DelegatedEventCallback) => {
    assertNode(element);
    assertEventName(eventName);
    assertEventSelector(selector);
    assertEventCallback(callback);

    const delegatedElement: Node & WithEventDelegations = element;
    // get all delegations
    const delegations = delegatedElement[EVENT_CALLBACKS_SYMBOL];
    if (!delegations) {
        return;
    }
    if (!(eventName in delegations)) {
        return;
    }
    const { descriptors, listener } = delegations[eventName];
    // get the list of delegations
    // find the index of the callback to remove in the list
    for (let i = 0; i < descriptors.length; i++) {
        let descriptor = descriptors[i];
        if (descriptor.selector === selector && descriptor.callback === callback) {
            descriptors.splice(i, 1);
            if (descriptors.length === 0) {
                element.removeEventListener(eventName, listener);
            }
        }
    }
};

/**
 * Bind a method to an event listener.
 *
 * @param descriptor The listener description.
 * @return The decorator initializer.
 */
export const listener = (descriptor: DelegatedEventDescriptor) =>
    (targetOrClassElement: CustomElement | ClassElement, methodKey: string, originalDescriptor: PropertyDescriptor) => {
        let element: ClassElement;
        if (methodKey !== undefined) {
            (targetOrClassElement as CustomElement).delegateEventListener(
                descriptor.event,
                descriptor.selector,
                (targetOrClassElement as any)[methodKey] as DelegatedEventCallback
            );
            return;
        }

        element = targetOrClassElement as ClassElement;

        if (element.kind !== 'method' || element.placement !== 'prototype') {
            return element;
        }

        return {
            kind: 'method',
            key: element.key,
            placement: 'prototype',
            descriptor: element.descriptor,
            finisher(constructor: Function) {
                const prototype = constructor.prototype;
                const listeners = prototype.listeners || {};
                listeners[`${descriptor.event} ${descriptor.selector || ''}`] = prototype[element.key];
                Object.defineProperty(prototype, 'listeners', {
                    value: listeners,
                    configurable: true,
                    writable: false,
                });
            },
        } as ClassElement;
    };
