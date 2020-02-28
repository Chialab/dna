import { DOM } from '../../../lib/DOM';
import { dispatchEvent as coreDispatchEvent } from '../../../lib/events';
import { CustomElement } from '../../../lib/CustomElement';

(DOM as any).lifeCycle = function lifeCycle(value: boolean) {
    // DOM.emulate = value;
};

(DOM as any).getNodeComponent = function getNodeComponent(node: Element) {
    if (!(node as CustomElement).is) {
        return null;
    }
    return node;
};

(DOM as any).getComponentNode = function getNodeComponent(node: Element) {
    return node;
};

(DOM as any).dispatchEvent = function dispatchEvent(element: Element, event: Event | string, detail ?: CustomEventInit, bubbles: boolean = true, cancelable: boolean = true, composed: boolean = false): boolean {
    return coreDispatchEvent(element, event, detail, bubbles, cancelable, composed);
};
