import { define, render, DOM, BaseComponent } from '../../dist/adapters/compat/dna.js';
import { getComponentName } from '../helpers.js';

function normalizeContent(content) {
    return content.replace(/^("|')/, '').replace(/("|')$/, '');
}

describe('[Compat] StyleComponent', () => {
    let wrapper, TestComponent1, TestComponent2, TestComponent3, TestComponent4;
    before(() => {
        DOM.lifeCycle(true);
        wrapper = DOM.createElement('div');
        wrapper.ownerDocument.body.appendChild(wrapper);

        class TestComponent extends BaseComponent {
            get template() {
                return '<h1>DNA TESTS</h1><h3>test</h3>';
            }
        }

        TestComponent1 = class TestComponent1 extends TestComponent {
            get css() {
                return `
@charset "UTF-8";

/*

CSS Created by Chialab.it

*/

:host {
    color: #5F9EA0;
}

:host > * {
    background-color: #5F9EA0;
}

h3 {
    color: blue;
}

@media (min-width: 0) {
    h1, h2 {
        color: inherit;
    }
}

@keyframes anim {
    0% { top: 0; }
    100% { top: 10px; }
}`;
            }
        };

        TestComponent2 = class TestComponent2 extends TestComponent {
            get css() {
                return `
:host(.active) {
    color: #5F9EA0;
}

:host(.active) > * {
    background-color: #5F9EA0;
}

@media (min-width: 0) {
    h1, h2 {
        color: inherit;
    }
}`;
            }

            constructor(...args) {
                super(...args);
                this.node.classList.add('active');
            }
        };

        TestComponent3 = class TestComponent3 extends TestComponent {
            get css() {
                return `
#before1:before {
    content: "Hello";
}

#before2:before {
    content: attr(id);
}

#before3:before {
    content: "Hello world";
}

#before4:before {
    content: "attr(id)";
}

#before5:before {
    content: "♜";
}

#before6:before {
    content: "hello-world";
}
`;
            }

            get template() {
                return '<span id="before1"></span><span id="before2"></span><span id="before3"></span><span id="before4"></span><span id="before5"></span><span id="before6"></span>';
            }

            constructor(...args) {
                super(...args);
                this.node.classList.add('active');
            }
        };


        TestComponent4 = class TestComponent4 extends TestComponent {
            get css() {
                return `
@charset "UTF-8";

/*
        /* strip */
    /*
        */

:host {
    color: #5F9EA0;
}

:host > * {
    background-color: #5F9EA0;
}

@keyframes anim {
    0% { top: 0; }
    100% { top: 10px; }
}`;
            }
        };

        define(getComponentName(), TestComponent1);
        define(getComponentName(), TestComponent2, { extends: 'div' });
        define(getComponentName(), TestComponent3);
        define(getComponentName(), TestComponent4);
    });

    it('should handle `css` getter property', () => {
        let element = render(wrapper, TestComponent1);
        let h3 = document.createElement('h3');
        wrapper.appendChild(h3);
        let style = DOM.window.getComputedStyle((element.node).querySelector('h1'));
        let styleH3 = DOM.window.getComputedStyle((element.node).querySelector('h3'));
        assert.equal(style.color, 'rgb(95, 158, 160)');
        assert.equal(style.backgroundColor, 'rgb(95, 158, 160)');
        assert.equal(styleH3.color, 'rgb(0, 0, 255)');
        let styleOutside = DOM.window.getComputedStyle(h3);
        assert.equal(styleOutside.color, 'rgb(0, 0, 0)');
    });

    it('should handle `css` getter property with state', () => {
        let element = render(wrapper, TestComponent2);
        let style = DOM.window.getComputedStyle((element.node).querySelector('h1'));
        assert.equal(style.color, 'rgb(95, 158, 160)');
        assert.equal(style.backgroundColor, 'rgb(95, 158, 160)');
    });

    it('should handle `css` with content getter property', () => {
        let element = render(wrapper, TestComponent3);
        let root = element.node;
        let before1 = DOM.window.getComputedStyle(root.querySelector('#before1'), ':before');
        let before2 = DOM.window.getComputedStyle(root.querySelector('#before2'), ':before');
        let before3 = DOM.window.getComputedStyle(root.querySelector('#before3'), ':before');
        let before4 = DOM.window.getComputedStyle(root.querySelector('#before4'), ':before');
        let before5 = DOM.window.getComputedStyle(root.querySelector('#before5'), ':before');
        let before6 = DOM.window.getComputedStyle(root.querySelector('#before6'), ':before');
        assert.equal(normalizeContent(before1.content), 'Hello');
        assert.oneOf(normalizeContent(before2.content), ['before2', 'attr(id)']);
        assert.equal(normalizeContent(before3.content), 'Hello world');
        assert.equal(normalizeContent(before4.content), 'attr(id)');
        assert.equal(normalizeContent(before5.content), '♜');
        assert.equal(normalizeContent(before6.content), 'hello-world');
    });

    it('should handle `css` comments', () => {
        let element = render(wrapper, TestComponent4);
        let style = DOM.window.getComputedStyle((element.node).querySelector('h1'));
        assert.equal(style.color, 'rgb(95, 158, 160)');
        assert.equal(style.backgroundColor, 'rgb(95, 158, 160)');
    });
});
