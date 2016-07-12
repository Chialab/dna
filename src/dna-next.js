/**
 * DNA
 * (c) 2015-2016 Chialab (http://www.chialab.com) <dev@chialab.io>
 * http://dna.chialab.io
 *
 * A component pattern for Web artisans.
 */
export * from './dna-component.js';
export * from './dna-properties-component.js';
export * from './dna-attributes-component.js';
export * from './dna-events-component.js';
export * from './dna-mixed-component.js';
export * from './dna-style-component.js';
export * from './dna-template-component.js';
export * from './dna-base-component.js';
export { DNAProperty } from './helpers/dna-property.js';
export { registry } from './helpers/registry.js';
export { register } from './helpers/register.js';
export const Version = self.__DNA__VERSION__ || 'dev';
