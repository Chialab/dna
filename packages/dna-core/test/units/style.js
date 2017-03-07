/* eslint-env mocha */

import { define, render } from '../../index.js';
import { TestComponent1, TestComponent2 } from '../components/style.js';

const WRAPPER = document.body;

define('test1-style-component', TestComponent1);
define('test2-style-component', TestComponent2, {
    extends: 'div',
});

describe('Unit: StyleComponent', () => {
    const elem1 = render(WRAPPER, TestComponent1);
    const elem2 = render(WRAPPER, TestComponent2);

    it('should handle `css` getter property', () => {
        let style = window.getComputedStyle((elem1.node.shadowRoot || elem1.node).querySelector('h1'));
        assert.equal(style.color, 'rgb(95, 158, 160)');
        assert.equal(style.backgroundColor, 'rgb(95, 158, 160)');
    });

    it('should handle `css` getter property with state', () => {
        let style = window.getComputedStyle((elem2.node.shadowRoot || elem2.node).querySelector('h1'));
        assert.equal(style.color, 'rgb(95, 158, 160)');
        assert.equal(style.backgroundColor, 'rgb(95, 158, 160)');
    });
});