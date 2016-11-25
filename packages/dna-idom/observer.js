import { symbols, attributes, notifications } from 'incremental-dom/index.js';
import { DOM } from '@dnajs/core/src/core.js';

let _created = notifications.nodesCreated;
let _removed = notifications.nodesDeleted;
let _changed = attributes[symbols.default];

notifications.nodesCreated = function(nodes) {
    nodes.forEach((node) => {
        if (!DOM.isComponent(node)) {
            if (DOM.bind(node)) {
                DOM.connect(node);
            }
        }
    });
    /* istanbul ignore if */
    if (_created) {
        _created(nodes);
    }
};

notifications.nodesDeleted = function(nodes) {
    nodes.forEach((node) => DOM.disconnect(node));
    /* istanbul ignore if */
    if (_removed) {
        _removed(nodes);
    }
};

attributes[symbols.default] = function(node, attrName, attrValue) {
    let oldValue = node.getAttribute(attrName);
    /* istanbul ignore if */
    if (_changed) {
        _changed(node, attrName, attrValue);
    }
    if (DOM.isComponent(node)) {
        let attrs = node.constructor.observedAttributes || [];
        if (attrs.indexOf(attrName) !== -1) {
            attrValue = (attrValue === undefined) ? null : attrValue;
            DOM.update(node, attrName, oldValue, attrValue);
        }
    }
};