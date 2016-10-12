/* eslint-env mocha */

import { Template, define } from '../src/dna.js';
import { TestComponent1, TestComponent2, TestComponent3 } from './components/dna-style.js';
import { Wrapper } from './utils/wrapper.js';

const WRAPPER = new Wrapper();

define('test1-style-component', TestComponent1);
define('test2-style-component', TestComponent2);
define('test3-style-component', TestComponent3, {
    extends: 'div',
});

let template = new Template(' \
    <test1-style-component></test1-style-component> \
    <test2-style-component></test2-style-component> \
    <div is="test3-style-component"></div> \
');
template.render(WRAPPER);

describe('Unit: DNAStyleComponent', () => {
    let elem1 = WRAPPER.querySelector('.test1-style-component');
    let elem2 = WRAPPER.querySelector('.test2-style-component');
    let elem3 = WRAPPER.querySelector('.test3-style-component');

    it('should handle `css` getter property as function', () => {
        let style = window.getComputedStyle(elem1.querySelector('h1'));
        assert.equal(style.color, 'rgb(95, 158, 160)');
    });

    it('should handle `css` getter property as string', () => {
        let style = window.getComputedStyle(elem2.querySelector('h1'));
        assert.equal(style.color, 'rgb(95, 158, 160)');
    });

    it('should handle `css` property as string', () => {
        let style = window.getComputedStyle(elem3.querySelector('h1'));
        assert.equal(style.color, 'rgb(95, 158, 160)');
    });
});
