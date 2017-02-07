/**
 * DNA
 * (c) 2015-2016 Chialab (http://www.chialab.com) <dev@chialab.io>
 * http://dna.chialab.io
 *
 * Just another components pattern.
 * Use with Custom Elements spec.
 */
import { mix, MIXINS } from '@dnajs/core/src/core.js';
import * as IDOM from '@dnajs/idom/src/lib/idom.js';
import { IDOMMixin } from '@dnajs/idom/src/mixins/idom.js';
import { CustomElementMixin } from './src/mixins/custom-element.js';
import { shim } from './src/lib/shim.js';

MIXINS.CustomElementMixin = CustomElementMixin;
MIXINS.IDOMMixin = IDOMMixin;

export { prop } from '@dnajs/core/src/core.js';
export { shim, mix, MIXINS, IDOM };
export { registry } from './src/lib/registry.js';
export { define } from './src/lib/define.js';
export { render } from './src/lib/render.js';

export class BaseComponent extends mix(
    shim(self.HTMLElement)
).with(
    MIXINS.ComponentMixin,
    MIXINS.PropertiesMixin,
    MIXINS.StyleMixin,
    MIXINS.EventsMixin,
    MIXINS.TemplateMixin,
    IDOMMixin,
    CustomElementMixin
) {}
