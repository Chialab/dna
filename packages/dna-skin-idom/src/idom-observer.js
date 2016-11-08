import Template from 'skin-template';
import { DOM } from '@dnajs/core/src/library-helpers.js';

const IDOM = Template.IDOM;
const notifications = IDOM.notifications;
const attributes = IDOM.attributes;
const symbols = IDOM.symbols;
let _created = notifications.nodesCreated;
let _removed = notifications.nodesDeleted;
let _changed = attributes[symbols.default];

IDOM.afterElementOpen((node) => {
    if (DOM.getComponent(node)) {
        IDOM.skip();
    }
});

notifications.nodesCreated = function(nodes) {
    nodes.forEach((node) => {
        if (!DOM.isComponent(node)) {
            if (DOM.create(node)) {
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
    if (DOM.isComponent(node)) {
        let oldValue = node.getAttribute(attrName);
        let attrs = node.constructor.observedAttributes || [];
        if (attrs.indexOf(attrName) !== -1) {
            DOM.update(node, attrName, oldValue, attrValue);
        }
    }
    /* istanbul ignore if */
    if (_changed) {
        _changed(node, attrName, attrValue);
    }
};
