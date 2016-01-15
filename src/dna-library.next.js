'use strict';

import { DNAHelper } from './dna-helper.next.js';
import { DNABaseComponent } from './dna-base-component.next.js';

/**
 * Create and register a (Web) Component.
 * `document.registerElement`-like interface.
 * @param {string} tagName The tag to use for the custom element. (required)
 * @param {object} config A configuration object. (`prototype` key is required)
 * @return {function} The Component constructor.
 */
export function Create(tagName, config = {}) {
    if (typeof tagName !== 'string') {
        throw 'Missing or bad typed `tagName` property';
    }
    let scope = config.prototype;
    if (typeof scope === 'undefined') {
        throw 'Missing prototype';
    } else if (typeof scope !== 'function') {
        let newScope = function () {}
        newScope.prototype = scope;
        scope = newScope;
    }
    let newScope = extend(scope, DNABaseComponent);
    for (var k in scope.prototype) {
        if (['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'].indexOf(k) !== -1) {
            newScope.prototype[k] = bindFN(newScope.prototype[k], DNABaseComponent.prototype[k]);
        }
    }
    Object.defineProperty(newScope, 'tagName', {
        configurable: true,
        get: function () {
            return tagName
        }
    });

    config.tagName = tagName;

    var ctr = Register(newScope, config);

    ctr.Extend = function (ctr2 = {}) {
        let scope2 = (typeof ctr2 === 'function') ? ctr2 : (function(proto) { let fn = function() {}; fn.prototype = proto; return fn })(ctr2);
        return extend(scope2, scope);
    }

    return ctr;
}

function getMethods (prototype) {
    let res = [];
    let added = ['name', 'length', 'prototype'];

    function createProp(key) {
        if (added.indexOf(key) === -1) {
            let prop = {
                key: key
            }
            if (typeof prototype[key] === 'function') {
                prop['value'] = prototype[key];
            } else {
                let descriptor = Object.getOwnPropertyDescriptor(prototype, key) || {};
                if (descriptor.get) {
                    prop['get'] = descriptor.get;
                    prop['set'] = descriptor.set;
                } else {
                    prop['value'] = prototype[key];
                }
            }
            added.push(key)
            return prop;
        }
    }

    for (let key in prototype) {
        let prop = createProp(key);
        if (prop) {
            res.push(prop);
        }
    }
    let keys = Object.getOwnPropertyNames(prototype);
    for (let k in keys) {
        let prop = createProp(keys[k]);
        if (prop) {
            res.push(prop);
        }
    }
    return res;
}

function extend (newClass, superClass) {
    function ctr () {
        babelHelpers.get(Object.getPrototypeOf(ctr.prototype), 'constructor', newClass).apply(newClass, arguments)
    }
    babelHelpers.inherits(ctr, superClass);
    for (var k in superClass.prototype) {
        let descriptor = Object.getOwnPropertyDescriptor(superClass.prototype, k) || {};
        if (descriptor.get) {
            Object.defineProperty(ctr.prototype, k, {
                get: descriptor.get,
                set: descriptor.set,
                configurable: true
            });
        }
    }
    return babelHelpers.createClass(ctr, getMethods(newClass.prototype), getMethods(newClass));
}

function bindFN(protoFn, superFn) {
    return function() {
        protoFn.apply(this, arguments);
        superFn.apply(this, arguments);
    }
}

/**
 * Wrap the [`DNAHelper.register`]{@link DNAHelper#register} method.
 */
export function Register(...args) {
    return DNAHelper.register(...args);
}
