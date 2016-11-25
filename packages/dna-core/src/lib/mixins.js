/**
 * @author Justin Fagnani
 * @see https://github.com/justinfagnani/mixwith.js
 */
import { reduce } from '../polyfills/reduce.js';

/**
 * Mix a class with a mixin.
 * @method mix(...).with(...)
 * @memberof! DNA.
 * @static
 *
 * @param {Function} superClass The class to extend.
 * @return {Function} A mixed class.
 *
 * @example
 * ```js
 * // my-super.js
 * export class MySuperClass {
 *     constructor() {
 *         // do something
 *     }
 * }
 * ```
 * ```js
 * // mixin.js
 * export const Mixin = (superClass) => class extend superClass {
 *     constructor() {
 *         super();
 *         // do something else
 *     }
 * };
 * ```
 * ```js
 * import { mix } from '@dnajs/core';
 * import { MySuperClass } from './my-super.js';
 * import { Mixin } from './mixin.js';
 *
 * export class MixedClass extends mix(MySuperClass).with(Mixin) {
 *     ...
 * }
 * ```
 */

/**
 * A Mixin helper class.
 * @ignore
 */
class Mixin {
    /**
     * Create a mixable class.
     * @param {Function} superClass The class to extend.
     */
    constructor(superclass) {
        superclass = superclass || class {};
        this.superclass = superclass;
    }
    /**
     * Mix the super class with a list of mixins.
     * @param {...Function} mixins *N* mixin functions.
     * @return {Function} The extended class.
     */
    with() {
        // eslint-disable-next-line
        let args = [].slice.call(arguments, 0);
        return reduce.call(args, (c, mixin) => mixin(c), this.superclass);
    }
}

/**
 * Create a Mixin instance.
 * @ignore
 */
export const mix = (superClass) => new Mixin(superClass);
