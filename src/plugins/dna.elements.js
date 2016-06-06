import { digest, registry } from '../dna-helper.js';
import { create as _create } from '../dna-create.js';
import 'dna/polyfills/src/extra/custom-elements.js';

export * from '../dna.js';

/**
 * Register a Custom Element.
 * `document.registerElement`-like interface.
 * @param {string} tagName The tag to use for the custom element. (required)
 * @param {object} config A configuration object. (`prototype` key is required)
 * @return {function} The Component constructor.
 */
export function register(...args) {
    let pre = digest(...args);
    let scope = pre.scope;
    let config = pre.config;
    let tagName = pre.tagName;

    if (typeof scope.onRegister === 'function') {
        scope.onRegister.call(scope, tagName);
    }
    Object.defineProperty(config.prototype, 'is', {
        configurable: false,
        get: () => tagName,
    });
    let res = document.registerElement(tagName, config);
    Object.defineProperty(res.prototype, 'constructor', {
        configurable: false,
        get: () => scope,
    });
    registry(tagName, res);
    return res;
}

/**
 * Create and register a Custom Element.
 * @param {string} tagName The tag to use for the custom element. (required)
 * @param {object} config A configuration object. (`prototype` key is required)
 * @return {function} The Component constructor.
 */
export function create(fn, options = {}) {
    return _create(fn, options, {
        register,
    });
}
