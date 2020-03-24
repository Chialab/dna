import './lib/DOM';
import * as IDOM from './lib/IDOM';

export {
    CustomElementRegistry,
    window,
    customElements,
    get,
    define,
    upgrade,
    whenDefined,
    TemplateItem,
    TemplateItems,
    Template,
    TemplateFilter,
    DOM,
    connect,
    disconnect,
    Fragment,
    HyperNode,
    h,
    html,
    template,
    interpolate,
    css,
    AsyncEvent,
    DelegatedEventCallback,
    delegateEventListener,
    undelegateEventListener,
    dispatchEvent,
    dispatchAsyncEvent,
    ClassFieldDescriptor,
    ClassFieldObserver,
    ClassFieldValidator,
    ClassFieldAttributeConverter,
    ClassFieldPropertyConverter,
    property,
    extend,
    Component,
} from '@chialab/dna';
export { IDOM };
export * from './lib/registry';
export * from './lib/mix';
export * from './lib/bootstrap';
export * from './lib/prop';
export * from './lib/trust';
export * from './lib/BaseComponent';
export * from './lib/render';
export * from './lib/namespace';
export * from './lib/mixins';
export * from './lib/symbols';
export * from './lib/proxy';
export * from './lib/css';
