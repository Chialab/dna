/**
 * DNA
 * (c) 2015-2016 Chialab (http://www.chialab.com) <dev@chialab.io>
 * http://dna.chialab.io
 *
 * Just another components pattern with IncrementalDOM templates.
 */
import * as IDOM from './src/lib/idom.js';
import { IDOMTemplateMixin } from './src/mixins/idom.js';
import { mix, prop, shim, DOM, MIXINS } from '@dnajs/core/src/core.js';
import { BaseComponent as OriginalComponent } from '@dnajs/core';

MIXINS.IDOMTemplateMixin = IDOMTemplateMixin;

export { mix, prop, shim, DOM, MIXINS };
export { registry, render, define } from '@dnajs/core';
export { IDOM };
export class BaseComponent extends mix(OriginalComponent).with(IDOMTemplateMixin) {}
