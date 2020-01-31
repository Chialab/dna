import { createSymbolKey } from './symbols';
import { Scope } from './Scope';
import { Template, TemplateItems } from './Template';

/**
 * Symbol for interpolated functions.
 */
const HYPER_SYMBOL = createSymbolKey();

/**
 * A HyperFunction (built by the `h` method with a tag name, a list of properties and children)
 * returns a Template result for a given previous node at the current position in a render context.
 */
export type HyperFunction = (this: Scope, previousElement?: Element) => Template | TemplateItems;

/**
 * Check if the reference is a HyperFunction.
 * @param target The reference to check.
 * @return The reference is a HyperFunction.
 */
export function isHyperFunction(target: any): target is HyperFunction {
    return !!target[HYPER_SYMBOL];
}

/**
 * Flag a function as HyperFunction.
 * @param fn The function to flag.
 * @return The updated function.
 */
export function createHyperFunction(fn: Function): HyperFunction {
    (fn as any)[HYPER_SYMBOL] = true;
    return fn as HyperFunction;
}
