import { Template } from './Template';
import { wrapThenable } from './Thenable';

/**
 * It renders the template when then provided Thenable is in pending status.
 * @param thenable The Promise-like object.
 * @param template The template to render.
 * @return A promise which resolves the template while the Thenable is in pending status.
 */
export const until = (thenable: any, template: Template) => {
    let original = wrapThenable(thenable);
    let wrapper = thenable
        .then(() => false)
        .catch(() => false);
    let state = wrapThenable(wrapper);
    state.result = original.pending && template;
    return wrapper;
};
