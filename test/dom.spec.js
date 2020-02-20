import { getModule, spyFunction, getComponentName } from './helpers.js';

let DNA;

describe('DOM', function() {
    this.timeout(10 * 1000);

    before(async () => {
        DNA = await getModule();
    });

    let wrapper;
    beforeEach(() => {
        wrapper = DNA.DOM.createElement('div');
        wrapper.ownerDocument.body.appendChild(wrapper);
    });

    afterEach(() => {
        if (wrapper.parentNode) {
            wrapper.ownerDocument.body.removeChild(wrapper);
        }
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

    describe('#createElement', () => {
        it('should create an element', () => {
            const element = DNA.DOM.createElement('div');
            expect(element.tagName).to.be.equal('DIV');
            expect(element.namespaceURI).to.be.equal('http://www.w3.org/1999/xhtml');
        });

        it('should create a defined element', () => {
            const is = getComponentName();
            class TestElement extends DNA.Component { }
            DNA.define(is, TestElement);

            const element = DNA.DOM.createElement(is);
            expect(element.is).to.be.equal(is);
            expect(element.tagName).to.be.equal(is.toUpperCase());
        });

        it('should create and extend a native element', () => {
            const is = getComponentName();
            class TestElement extends DNA.Component { }
            DNA.define(is, TestElement, {
                extends: 'article',
            });

            const element = DNA.DOM.createElement('article', { is });
            expect(element.is).to.be.equal(is);
            expect(element.tagName).to.be.equal('ARTICLE');
            expect(element.getAttribute('is')).to.be.equal(is);
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
            DNA.DOM.appendChild(wrapper, child);
            expect(child.parentNode).to.be.equal(wrapper);
        });

        it('should move a child from a parent to another parent', () => {
            const parent = DNA.DOM.createElement('div');
            const child = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(parent, child);
            expect(child.parentNode).to.be.equal(parent);
            DNA.DOM.appendChild(wrapper, child);
            expect(parent.childNodes).to.have.lengthOf(0);
            expect(child.parentNode).to.be.equal(wrapper);
        });
    });

    describe('#removeChild', () => {
        it('should remove a child from a parent', () => {
            const child = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(wrapper, child);
            expect(child.parentNode).to.be.equal(wrapper);
            DNA.DOM.removeChild(wrapper, child);
            expect(child.parentNode).to.be.null;
            expect(wrapper.childNodes).to.have.lengthOf(0);
        });
    });

    describe('#insertBefore', () => {
        it('should insert a child before another', () => {
            const child1 = DNA.DOM.createElement('div');
            const child2 = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(wrapper, child1);
            DNA.DOM.insertBefore(wrapper, child2, child1);
            expect(child1.parentNode).to.be.equal(wrapper);
            expect(child2.parentNode).to.be.equal(wrapper);
            expect(wrapper.childNodes[0]).to.be.equal(child2);
            expect(wrapper.childNodes[1]).to.be.equal(child1);
        });

        it('should insert a child (and remove it from the previous parent) before another', () => {
            const parent = DNA.DOM.createElement('div');
            const child1 = DNA.DOM.createElement('div');
            const child2 = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(parent, child2);
            expect(child2.parentNode).to.be.equal(parent);
            DNA.DOM.appendChild(wrapper, child1);
            DNA.DOM.insertBefore(wrapper, child2, child1);
            expect(parent.childNodes).to.have.lengthOf(0);
            expect(child1.parentNode).to.be.equal(wrapper);
            expect(child2.parentNode).to.be.equal(wrapper);
            expect(wrapper.childNodes[0]).to.be.equal(child2);
            expect(wrapper.childNodes[1]).to.be.equal(child1);
        });

        it('should do nothing when child is already before another', () => {
            const child1 = DNA.DOM.createElement('div');
            const child2 = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(wrapper, child1);
            DNA.DOM.appendChild(wrapper, child2);
            DNA.DOM.insertBefore(wrapper, child1, child2);
            expect(child1.parentNode).to.be.equal(wrapper);
            expect(child2.parentNode).to.be.equal(wrapper);
            expect(wrapper.childNodes[0]).to.be.equal(child1);
            expect(wrapper.childNodes[1]).to.be.equal(child2);
        });
    });

    describe('#replaceChild', () => {
        it('should reaplce a child in a parent', () => {
            const child1 = DNA.DOM.createElement('div');
            const child2 = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(wrapper, child1);
            expect(child1.parentNode).to.be.equal(wrapper);
            DNA.DOM.replaceChild(wrapper, child2, child1);
            expect(child1.parentNode).to.be.null;
            expect(child2.parentNode).to.be.equal(wrapper);
            expect(wrapper.childNodes).to.have.lengthOf(1);
            expect(wrapper.childNodes[0]).to.be.equal(child2);
        });

        it('should reaplce a child (and remove it from the previous parent) in a parent', () => {
            const parent = DNA.DOM.createElement('div');
            const child1 = DNA.DOM.createElement('div');
            const child2 = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(parent, child2);
            expect(child2.parentNode).to.be.equal(parent);
            DNA.DOM.appendChild(wrapper, child1);
            expect(child1.parentNode).to.be.equal(wrapper);
            DNA.DOM.replaceChild(wrapper, child2, child1);
            expect(parent.childNodes).to.have.lengthOf(0);
            expect(child1.parentNode).to.be.null;
            expect(child2.parentNode).to.be.equal(wrapper);
            expect(wrapper.childNodes).to.have.lengthOf(1);
            expect(wrapper.childNodes[0]).to.be.equal(child2);
        });

        it('should do nothing if the node is the same', () => {
            const child = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(wrapper, child);
            expect(child.parentNode).to.be.equal(wrapper);
            DNA.DOM.replaceChild(wrapper, child, child);
            expect(child.parentNode).to.be.equal(wrapper);
            expect(wrapper.childNodes).to.have.lengthOf(1);
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
            DNA.DOM.appendChild(wrapper, child);
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
            DNA.DOM.appendChild(wrapper, child);
            expect(DNA.DOM.isConnected(child)).to.be.true;
        });

        it('return `true` if element is disconnected', () => {
            const child = DNA.DOM.createElement('div');
            expect(DNA.DOM.isConnected(child)).to.be.false;
        });
    });

    describe.skip('#dispatchAyncEvent', () => {
        it('should trigger an event and return a Promise', () => {
            //
        });
    });
});
