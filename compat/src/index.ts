import './DOM';
import * as IDOM from './IDOM';

export type {
    Observable,
    TemplateItem,
    TemplateItems,
    Template,
    TemplateFilter,
    Context,
    HyperNode,
    AsyncEvent,
    DelegatedEventCallback,
    ClassFieldDescriptor,
    ClassFieldObserver,
    ClassFieldValidator,
    ClassFieldAttributeConverter,
    ClassFieldPropertyConverter,
    ComponentInterface,
    ComponentConstructorInterface,
} from '@chialab/dna';
export {
    window,
    customElements,
    CustomElementRegistry,
    customElement,
    DOM,
    connect,
    disconnect,
    Fragment,
    h,
    html,
    css,
    defineListeners,
    delegateEventListener,
    undelegateEventListener,
    dispatchEvent,
    dispatchAsyncEvent,
    defineProperty,
    defineProperties,
    getProperty,
    getProperties,
    property,
    extend,
    isComponent,
    isComponentConstructor,
    Component,
    until,
} from '@chialab/dna';
export { IDOM };
export * from './registry';
export * from './mix';
export * from './bootstrap';
export { prop } from './prop';
export * from './trust';
export * from './BaseComponent';
export * from './render';
export * from './namespace';
export * from './mixins';
export { DNA_SYMBOL, COMPONENT_SYMBOL, NODE_SYMBOL, STYLE_SYMBOL, CONNECTED_SYMBOL } from './symbols';
export * from './proxy';
export * from './css';
