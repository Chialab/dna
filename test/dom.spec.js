/* eslint-env mocha */
import { getModule, spyFunction } from './helpers.js';

let DNA;

describe('DOM', function() {
    this.timeout(10 * 1000);

    before(async () => {
        DNA = await getModule();
    });

    let element;
    beforeEach(() => {
        element = DNA.DOM.createElement('div');
        element.ownerDocument.body.appendChild(element);
    });

    afterEach(() => {
        element.ownerDocument.body.removeChild(element);
    });

    describe('#isDocument', () => {
        it('should return `true` to for documents', () => {
            const element = DNA.DOM.createElement('div');
            expect(DNA.DOM.isDocument(element.ownerDocument)).to.be.true;
        });

        it('should return `false` to for nodes', () => {
            const element = DNA.DOM.createElement('div');
            expect(DNA.DOM.isDocument(element)).to.be.false;
        });
    });

    describe('#isText', () => {
        it('should return `true` to for texts', () => {
            const node = DNA.DOM.createTextNode('hello');
            expect(DNA.DOM.isText(node)).to.be.true;
        });

        it('should return `false` to for elements', () => {
            const element = DNA.DOM.createElement('div');
            expect(DNA.DOM.isText(element)).to.be.false;
        });
    });

    describe('#isElement', () => {
        it('should return `true` to for elements', () => {
            const element = DNA.DOM.createElement('div');
            expect(DNA.DOM.isElement(element)).to.be.true;
        });

        it('should return `false` to for texts', () => {
            const node = DNA.DOM.createTextNode('hello');
            expect(DNA.DOM.isElement(node)).to.be.false;
        });
    });

    describe('parse', () => {
        it('should return dom for html', () => {
            const nodes = DNA.DOM.parse('<h1>hello</h1>');
            expect(nodes).to.have.lengthOf(1);
            const element = nodes[0];
            expect(DNA.DOM.isElement(element)).to.be.true;
            expect(element.tagName).to.be.equal('H1');
            expect(element.textContent).to.be.equal('hello');
        });

        it('should return `false` to for texts', () => {
            const node = DNA.DOM.createTextNode('hello');
            expect(DNA.DOM.isElement(node)).to.be.false;
        });
    });

    describe('#createElement', () => {
        it('should create an element', () => {
            const element = DNA.DOM.createElement('div');
            expect(element.tagName).to.be.equal('DIV');
            expect(element.namespaceURI).to.be.equal('http://www.w3.org/1999/xhtml');
        });

        it('should create a defined element', () => {
            const TestElement = class extends DNA.Component { };
            DNA.define('test-domcreate', TestElement);

            const element = DNA.DOM.createElement('test-domcreate');
            expect(element.is).to.be.equal('test-domcreate');
            expect(element.tagName).to.be.equal('TEST-DOMCREATE');
        });

        it('should create and extend a native element', () => {
            const TestElement = class extends DNA.Component { };
            DNA.define('test-domcreate2', TestElement, {
                extends: 'article',
            });

            const element = DNA.DOM.createElement('article', { is: 'test-domcreate2' });
            expect(element.is).to.be.equal('test-domcreate2');
            expect(element.tagName).to.be.equal('ARTICLE');
            expect(element.getAttribute('is')).to.be.equal('test-domcreate2');
        });
    });

    describe('#createElementNS', () => {
        it('should create SVG element', () => {
            const element = DNA.DOM.createElementNS('http://www.w3.org/2000/svg', 'svg');
            expect(element.tagName).to.be.equal('svg');
            expect(element.namespaceURI).to.be.equal('http://www.w3.org/2000/svg');
        });
    });

    describe('#appendChild', () => {
        it('should append a child to a parent', () => {
            const child = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(element, child);
            expect(child.parentNode).to.be.equal(element);
        });

        it('should move a child from a parent to another parent', () => {
            const parent = DNA.DOM.createElement('div');
            const child = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(parent, child);
            expect(child.parentNode).to.be.equal(parent);
            DNA.DOM.appendChild(element, child);
            expect(parent.childNodes).to.have.lengthOf(0);
            expect(child.parentNode).to.be.equal(element);
        });
    });

    describe('#removeChild', () => {
        it('should remove a child from a parent', () => {
            const child = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(element, child);
            expect(child.parentNode).to.be.equal(element);
            DNA.DOM.removeChild(element, child);
            expect(child.parentNode).to.be.null;
            expect(element.childNodes).to.have.lengthOf(0);
        });
    });

    describe('#insertBefore', () => {
        it('should insert a child before another', () => {
            const child1 = DNA.DOM.createElement('div');
            const child2 = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(element, child1);
            DNA.DOM.insertBefore(element, child2, child1);
            expect(child1.parentNode).to.be.equal(element);
            expect(child2.parentNode).to.be.equal(element);
            expect(element.childNodes[0]).to.be.equal(child2);
            expect(element.childNodes[1]).to.be.equal(child1);
        });

        it('should insert a child (and remove it from the previous parent) before another', () => {
            const parent = DNA.DOM.createElement('div');
            const child1 = DNA.DOM.createElement('div');
            const child2 = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(parent, child2);
            expect(child2.parentNode).to.be.equal(parent);
            DNA.DOM.appendChild(element, child1);
            DNA.DOM.insertBefore(element, child2, child1);
            expect(parent.childNodes).to.have.lengthOf(0);
            expect(child1.parentNode).to.be.equal(element);
            expect(child2.parentNode).to.be.equal(element);
            expect(element.childNodes[0]).to.be.equal(child2);
            expect(element.childNodes[1]).to.be.equal(child1);
        });

        it('should do nothing when child is already before another', () => {
            const child1 = DNA.DOM.createElement('div');
            const child2 = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(element, child1);
            DNA.DOM.appendChild(element, child2);
            DNA.DOM.insertBefore(element, child1, child2);
            expect(child1.parentNode).to.be.equal(element);
            expect(child2.parentNode).to.be.equal(element);
            expect(element.childNodes[0]).to.be.equal(child1);
            expect(element.childNodes[1]).to.be.equal(child2);
        });
    });

    describe('#replaceChild', () => {
        it('should reaplce a child in a parent', () => {
            const child1 = DNA.DOM.createElement('div');
            const child2 = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(element, child1);
            expect(child1.parentNode).to.be.equal(element);
            DNA.DOM.replaceChild(element, child2, child1);
            expect(child1.parentNode).to.be.null;
            expect(child2.parentNode).to.be.equal(element);
            expect(element.childNodes).to.have.lengthOf(1);
            expect(element.childNodes[0]).to.be.equal(child2);
        });

        it('should reaplce a child (and remove it from the previous parent) in a parent', () => {
            const parent = DNA.DOM.createElement('div');
            const child1 = DNA.DOM.createElement('div');
            const child2 = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(parent, child2);
            expect(child2.parentNode).to.be.equal(parent);
            DNA.DOM.appendChild(element, child1);
            expect(child1.parentNode).to.be.equal(element);
            DNA.DOM.replaceChild(element, child2, child1);
            expect(parent.childNodes).to.have.lengthOf(0);
            expect(child1.parentNode).to.be.null;
            expect(child2.parentNode).to.be.equal(element);
            expect(element.childNodes).to.have.lengthOf(1);
            expect(element.childNodes[0]).to.be.equal(child2);
        });

        it('should do nothing if the node is the same', () => {
            const child = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(element, child);
            expect(child.parentNode).to.be.equal(element);
            DNA.DOM.replaceChild(element, child, child);
            expect(child.parentNode).to.be.equal(element);
            expect(element.childNodes).to.have.lengthOf(1);
        });
    });

    describe('#getAttribute', () => {
        it('should get an empty node attribute', () => {
            const element = DNA.DOM.createElement('button');
            expect(DNA.DOM.getAttribute(element, 'type')).to.be.null;
        });

        it('should get a node attribute', () => {
            const element = DNA.DOM.createElement('button');
            element.setAttribute('type', '1');
            expect(DNA.DOM.getAttribute(element, 'type')).to.be.equal('1');
        });
    });

    describe('#setAttribute', () => {
        it('should set a node attribute', () => {
            const element = DNA.DOM.createElement('button');
            DNA.DOM.setAttribute(element, 'type', '1');
            expect(element.getAttribute('type')).to.be.equal('1');
        });
    });

    describe('#hasAttribute', () => {
        it('should return `true` if node has an attribute', () => {
            const element = DNA.DOM.createElement('button');
            DNA.DOM.setAttribute(element, 'type', '1');
            expect(DNA.DOM.hasAttribute(element, 'type')).to.be.true;
        });

        it('should return `false` if node has an attribute', () => {
            const element = DNA.DOM.createElement('button');
            expect(DNA.DOM.hasAttribute(element, 'type')).to.be.false;
        });
    });

    describe('#removeAttribute', () => {
        it('should remove a node attribute', () => {
            const element = DNA.DOM.createElement('button');
            DNA.DOM.setAttribute(element, 'type', '1');
            expect(DNA.DOM.getAttribute(element, 'type')).to.be.equal('1');
            DNA.DOM.removeAttribute(element, 'type');
            expect(DNA.DOM.getAttribute(element, 'type')).to.be.null;
        });
    });

    describe('#isConnected', () => {
        it('return `true` if element is connected', () => {
            const child = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(element, child);
            expect(DNA.DOM.isConnected(child)).to.be.true;
        });

        it('return `true` if element is disconnected', () => {
            const child = DNA.DOM.createElement('div');
            expect(DNA.DOM.isConnected(child)).to.be.false;
        });
    });

    describe('#isConnected', () => {
        it('return `true` if element is connected', () => {
            const child = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(element, child);
            expect(DNA.DOM.isConnected(child)).to.be.true;
        });

        it('return `true` if element is disconnected', () => {
            const child = DNA.DOM.createElement('div');
            expect(DNA.DOM.isConnected(child)).to.be.false;
        });
    });

    describe('#define', () => {
        it('should define a native constructor', () => {
            const DNAHTMLElement = class { };
            const DNAHTMLElementShim = DNA.DOM.define('DNAHTMLElement', DNAHTMLElement);
            expect(DNAHTMLElementShim.prototype).to.be.equal(DNAHTMLElement.prototype);
            const Proxy = DNA.DOM.get('DNAHTMLElement');
            expect(Object.create(Proxy.prototype)).to.be.an.instanceof(DNAHTMLElementShim);
        });

        it('should update an already proxied class', () => {
            const DNAHTMLElementShim1 = DNA.DOM.define('DNAHTMLElement', class { });
            const Proxy = DNA.DOM.get('DNAHTMLElement');
            expect(Object.create(Proxy.prototype)).to.be.an.instanceof(DNAHTMLElementShim1);
            const DNAHTMLElementShim2 = DNA.DOM.define('DNAHTMLElement', class { });
            expect(DNAHTMLElementShim1).to.not.equal(DNAHTMLElementShim2);
            expect(Object.create(Proxy.prototype)).to.not.be.an.instanceof(DNAHTMLElementShim1);
            expect(Object.create(Proxy.prototype)).to.be.an.instanceof(DNAHTMLElementShim2);
        });
    });

    describe('#dispatchEvent', () => {
        it('should dispatch custom events', () => {
            const listener = spyFunction(() => { });
            element.addEventListener('click', listener);
            DNA.DOM.dispatchEvent(element, 'click');
            expect(listener.invoked).to.be.true;
        });

        it('should dispatch custom events with details', () => {
            const details = {};
            const listener = spyFunction((event) => event.detail);
            element.addEventListener('click', listener);
            DNA.DOM.dispatchEvent(element, 'click', details);
            expect(listener.invoked).to.be.true;
            expect(listener.response).to.be.equal(details);
        });

        it.skip('should dispatch custom events that does bubble', () => {
            //
        });

        it.skip('should dispatch custom events that is canceleable', () => {
            //
        });

        it('should dispatch custom events that does not bubble', () => {
            const button = DNA.DOM.createElement('button');
            element.appendChild(button);
            const listener = spyFunction((event) => event.detail);
            element.addEventListener('click', listener);
            DNA.DOM.dispatchEvent(button, 'click', null, false);
            expect(listener.invoked).to.be.false;
        });

        it.skip('should dispatch custom events that is not canceleable', () => {
            //
        });

        it('should validate dispatch input', () => {
            expect(() => {
                DNA.DOM.dispatchEvent(null);
            }).to.throw(TypeError, 'The provided element is not a Node');

            expect(() => {
                DNA.DOM.dispatchEvent(element, null);
            }).to.throw(TypeError, 'The provided event is not an Event');

            expect(() => {
                DNA.DOM.dispatchEvent(element, 'click', null, null, null, null);
            }).to.throw(TypeError, 'The provided bubbles option is not a boolean');

            expect(() => {
                DNA.DOM.dispatchEvent(element, 'click', null, true, null, null);
            }).to.throw(TypeError, 'The provided cancelable option is not a boolean');

            expect(() => {
                DNA.DOM.dispatchEvent(element, 'click', null, true, true, null);
            }).to.throw(TypeError, 'The provided composed option is not a boolean');
        });
    });

    describe('#delegateEventListener', () => {
        it('should add delegate a listener', () => {
            const button = DNA.DOM.createElement('button');
            element.appendChild(button);
            const listener = spyFunction(() => { });
            DNA.DOM.delegateEventListener(element, 'click', 'button', listener);
            DNA.DOM.delegateEventListener(element, 'mouseenter', 'button', listener);
            button.click();
            DNA.DOM.dispatchEvent(button, 'mouseenter');

            expect(listener.invoked).to.be.true;
            expect(listener.count).to.be.equal(2);
        });

        it('should validate delegation input', () => {
            expect(() => {
                DNA.DOM.delegateEventListener(null, null, null, null);
            }).to.throw(TypeError, 'The provided element is not a Node');

            expect(() => {
                DNA.DOM.delegateEventListener(element, null, null, null);
            }).to.throw(TypeError, 'The provided event name is not a string');

            expect(() => {
                DNA.DOM.delegateEventListener(element, 'click', null, null);
            }).to.throw(TypeError, 'The provided selector is not a string');

            expect(() => {
                DNA.DOM.delegateEventListener(element, 'click', 'button', null);
            }).to.throw(TypeError, 'The provided callback is not a function');
        });

        it.skip('should stop propagation', () => {
            // ...
        });

        it.skip('should immediately stop propagation', () => {
            // ...
        });
    });

    describe('#undelegateEventListener', () => {
        it('should remove a delegated event listener', () => {
            const button = DNA.DOM.createElement('button');
            element.appendChild(button);
            const listener = spyFunction(() => { });
            const listener2 = spyFunction(() => { });
            DNA.DOM.delegateEventListener(element, 'click', 'button', listener);
            DNA.DOM.delegateEventListener(element, 'click', 'button', listener2);
            button.click();
            DNA.DOM.undelegateEventListener(element, 'click', 'button', listener2);
            button.click();

            expect(listener.count).to.be.equal(2);
            expect(listener2.count).to.be.equal(1);
        });

        it('should validate undelegateEventListener input', () => {
            expect(() => {
                DNA.DOM.undelegateEventListener(null, null, null, null);
            }).to.throw(TypeError, 'The provided element is not a Node');

            expect(() => {
                DNA.DOM.undelegateEventListener(element, null, null, null);
            }).to.throw(TypeError, 'The provided event name is not a string');

            expect(() => {
                DNA.DOM.undelegateEventListener(element, 'click', null, null);
            }).to.throw(TypeError, 'The provided selector is not a string');

            expect(() => {
                DNA.DOM.undelegateEventListener(element, 'click', 'button', 1);
            }).to.throw(TypeError, 'The provided callback is not a function');
        });
    });

    describe('#undelegateAllEventListeners', () => {
        it('should remove all delegated event listeners', () => {
            const button = DNA.DOM.createElement('button');
            element.appendChild(button);
            const listener = spyFunction(() => { });
            DNA.DOM.delegateEventListener(element, 'click', 'button', listener);
            DNA.DOM.delegateEventListener(element, 'mouseenter', 'button', listener);
            button.click();
            DNA.DOM.dispatchEvent(button, 'mouseenter');
            DNA.DOM.undelegateAllEventListeners(element);
            button.click();
            DNA.DOM.dispatchEvent(button, 'mouseenter');

            expect(listener.count).to.be.equal(2);
        });

        it('should validate undelegateAllEventListeners input', () => {
            expect(() => {
                DNA.DOM.undelegateEventListener(null, null, null, null);
            }).to.throw(TypeError, 'The provided element is not a Node');
        });
    });
});
