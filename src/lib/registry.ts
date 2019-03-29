import { CustomElement } from './CustomElement';

export type DefinitionConstructor = typeof HTMLElement & {
    new(nodeOrProperties?: HTMLElement | { [key: string]: any; }, properties?: { [key: string]: any; }): CustomElement;
    prototype: CustomElement;
};

export type DefinitionOptions = {
    extends?: string;
}

export type Definition = DefinitionOptions & {
    name: string;
    constructor: DefinitionConstructor;
}

type Registry = {
    [key: string]: Definition;
}

const REGISTRY: Registry = {};

export function has(name: string): boolean {
    return name in REGISTRY;
}

export function get(name: string): Definition {
    return REGISTRY[name];
}

export function entries(): Definition[] {
    return Object.values(REGISTRY);
}

export function define(name: string, constructor: DefinitionConstructor, options: DefinitionOptions = {}) {
    name = name.toLowerCase();

    Object.defineProperty(constructor.prototype, 'is', {
        writable: false,
        configurable: false,
        value: name,
    });
    REGISTRY[name] = {
        name,
        constructor,
        extends: options.extends,
    };
}