import { digest, registry, dashToCamel } from '../dna-helper.js';
import { create as _create } from '../dna-create.js';

export * from '../dna.js';

const module = window.angular.module('dna-components', []);

function bindAttribute(element, $attrs, key) {
    $attrs.$observe(key, (newValue, oldValue) => {
        element.attributeChangedCallback(key, oldValue, newValue);
    });
}

/**
 * Register an Angular directive to the `dna-components` module.
 * `document.registerElement`-like interface.
 * @param {string} tagName The tag to use for the custom element. (required)
 * @param {object} config A configuration object. (`prototype` key is required)
 * @return {function} The Component constructor.
 */
export function register(fn, options = {}) {
    let pre = digest(fn, options);
    let scope = pre.scope;
    let tagName = pre.tagName;

    if (typeof scope.onRegister === 'function') {
        scope.onRegister.call(scope, tagName);
    }
    let ngDescriptor = {
        restrict: 'E',
    };
    ngDescriptor.controller = [
        '$scope', '$element', '$attrs',
        function($scope, $element, $attrs) {
            let element = $element[0];
            Object.setPrototypeOf(element, scope.prototype);
            element.is = tagName;
            element.$scope = $scope;
            element.$element = $element;
            element.$attrs = $attrs;
            element.createdCallback();
            element.attachedCallback();
            $scope.$on('$destroy', () => {
                element.detachedCallback();
            });
            let attributes = scope.observedAttributes || scope.attributes;
            if (typeof attributes !== 'undefined' &&
                Array.isArray(attributes)) {
                attributes.forEach((attrName) => {
                    bindAttribute(element, $attrs, attrName);
                });
            }
        },
    ];
    registry(tagName, scope);
    return module.directive(dashToCamel(tagName), () => ngDescriptor);
}

/**
 * Create and register an Angular directive.
 * @param {string} tagName The tag to use for the custom element. (required)
 * @param {object} config A configuration object. (`prototype` key is required)
 * @return {function} The Component constructor.
 */
export function create(fn, options = {}) {
    return _create(fn, options, {
        register,
    });
}
