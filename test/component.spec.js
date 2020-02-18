import { getModule, spyFunction } from './helpers.js';

let DNA;

describe('Component', function() {
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

    describe('#new', () => {
        it('should create a node', () => {
            const TestElement = class extends DNA.Component { };
            DNA.define('test-component', TestElement);

            const element = new TestElement();
            expect(element).to.be.an.instanceof(DNA.DOM.get('HTMLElement'));
            expect(element.is).to.be.equal('test-component');
            expect(element.tagName).to.be.equal('TEST-COMPONENT');
        });

        it('should extend a native node', () => {
            const TestElement = class extends DNA.Component { };
            DNA.define('test-component2', TestElement, {
                extends: 'article',
            });

            const element = new TestElement();
            expect(element).to.be.an.instanceof(DNA.DOM.get('HTMLElement'));
            expect(element.is).to.be.equal('test-component2');
            expect(element.tagName).to.be.equal('ARTICLE');
            expect(element.getAttribute('is')).to.be.equal('test-component2');
        });

        it('should throw if element is not defined', () => {
            const TestElement = class extends DNA.Component { };
            expect(() => new TestElement()).to.throw(TypeError);
        });

        it('should setup properties', () => {
            const TestElement = class extends DNA.Component {
                get properties() {
                    return {
                        myCustomProp1: {
                            attribute: 'custom-prop',
                        },
                    };
                }

                @DNA.property() myCustomProp2 = '';
                @DNA.property() myCustomProp3 = '';
            };

            DNA.define('test-component3', TestElement);

            const element = new TestElement();

            expect(element).to.have.property('myCustomProp1');
            expect(element).to.have.property('myCustomProp2');
            expect(element).to.have.property('myCustomProp3');
            expect(element).to.not.have.property('myCustomProp4');
        });

        it('should initialize properties', () => {
            const TestElement = class extends DNA.Component {
                get properties() {
                    return {
                        myCustomProp1: {
                            attribute: 'custom-prop',
                        },
                    };
                }

                @DNA.property() myCustomProp2 = 'test';
                @DNA.property() myCustomProp3 = '';
            };

            DNA.define('test-component4', TestElement);

            const element = new TestElement({
                myCustomProp1: 42,
                myCustomProp2: 'toast',
            });

            expect(element.myCustomProp1, 42);
            expect(element.myCustomProp2, 'toast');
        });

        it('should connect already connected nodes', () => {
            let connected = false;
            const TestElement = class extends DNA.Component {
                connectedCallback() {
                    super.connectedCallback();
                    connected = true;
                }
            };

            wrapper.innerHTML = '<test-component5></test-component5>';
            expect(connected).to.be.false;
            DNA.define('test-component5', TestElement);
            DNA.upgrade(wrapper);
            expect(connected).to.be.true;
        });
    });

    describe('#connectedCallback|disconnectedCallback', () => {
        it('should connect on appendChild and disconnect on removeChild', () => {
            const connectedCallback = spyFunction(() => { });
            const disconnectedCallback = spyFunction(() => { });
            const TestElement = class extends DNA.Component {
                connectedCallback() {
                    super.connectedCallback();
                    connectedCallback();
                }
                disconnectedCallback() {
                    super.disconnectedCallback();
                    disconnectedCallback();
                }
            };

            DNA.define('test-component6', TestElement);

            const element = new TestElement();
            expect(connectedCallback.invoked).to.be.false;
            expect(disconnectedCallback.invoked).to.be.false;
            DNA.DOM.appendChild(wrapper, element);
            expect(connectedCallback.invoked).to.be.true;
            expect(disconnectedCallback.invoked).to.be.false;
            DNA.DOM.removeChild(wrapper, element);
            expect(disconnectedCallback.invoked).to.be.true;
        });

        it('should connect on replaceChild', () => {
            const connectedCallback = spyFunction(() => { });
            const disconnectedCallback = spyFunction(() => { });
            const TestElement = class extends DNA.Component {
                connectedCallback() {
                    super.connectedCallback();
                    connectedCallback();
                }

                disconnectedCallback() {
                    super.disconnectedCallback();
                    disconnectedCallback();
                }
            };

            DNA.define('test-component7', TestElement);

            const element = new TestElement();
            const child = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(wrapper, child);
            expect(disconnectedCallback.invoked).to.be.false;
            expect(connectedCallback.invoked).to.be.false;
            DNA.DOM.replaceChild(wrapper, element, child);
            expect(disconnectedCallback.invoked).to.be.false;
            expect(connectedCallback.invoked).to.be.true;
            DNA.DOM.replaceChild(wrapper, child, element);
            expect(disconnectedCallback.invoked).to.be.true;
            expect(connectedCallback.invoked).to.be.true;
            expect(disconnectedCallback.count).to.be.equal(1);
            expect(connectedCallback.count).to.be.equal(1);
        });

        it('should connect on insertBefore', () => {
            const connectedCallback = spyFunction(() => { });
            const disconnectedCallback = spyFunction(() => { });
            const TestElement = class extends DNA.Component {
                connectedCallback() {
                    super.connectedCallback();
                    connectedCallback();
                }

                disconnectedCallback() {
                    super.disconnectedCallback();
                    disconnectedCallback();
                }
            };

            DNA.define('test-component8', TestElement);

            const element = new TestElement();
            const child = DNA.DOM.createElement('div');
            DNA.DOM.appendChild(wrapper, child);
            expect(connectedCallback.invoked).to.be.false;
            expect(disconnectedCallback.invoked).to.be.false;
            DNA.DOM.insertBefore(wrapper, element, child);
            expect(connectedCallback.invoked).to.be.true;
            expect(disconnectedCallback.invoked).to.be.false;
            DNA.DOM.insertBefore(wrapper, child, element);
            expect(connectedCallback.invoked).to.be.true;
            expect(connectedCallback.count).to.be.equal(1);
            expect(disconnectedCallback.invoked).to.be.false;
        });

        it('should connect if not moved', () => {
            const connectedCallback = spyFunction(() => { });
            const disconnectedCallback = spyFunction(() => { });
            const TestElement = class extends DNA.Component {
                connectedCallback() {
                    super.connectedCallback();
                    connectedCallback();
                }

                disconnectedCallback() {
                    super.disconnectedCallback();
                    disconnectedCallback();
                }
            };

            DNA.define('test-component9', TestElement);

            const element = new TestElement();
            expect(connectedCallback.invoked).to.be.false;
            expect(disconnectedCallback.invoked).to.be.false;
            DNA.DOM.appendChild(wrapper, element);
            expect(connectedCallback.invoked).to.be.true;
            expect(disconnectedCallback.invoked).to.be.false;
            DNA.DOM.appendChild(wrapper, element);
            expect(connectedCallback.count).to.be.equal(2);
            expect(disconnectedCallback.invoked).to.be.true;
        });

        it.skip('should render on connect', () => {
            //
        });
    });

    describe('#attributeChangedCallback', () => {
        it('should handle attribute changes on setAttribute', () => {
            const attributeChangedCallback = spyFunction((name, old, value) => [name, old, value]);
            const TestElement = class extends DNA.Component {
                static get observedAttributes() {
                    return ['title'];
                }

                attributeChangedCallback(...args) {
                    super.attributeChangedCallback(...args);
                    attributeChangedCallback(...args);
                }
            };

            DNA.define('test-component11', TestElement);

            const element = new TestElement();
            expect(attributeChangedCallback.invoked).to.be.false;
            element.setAttribute('title', 'test');
            expect(attributeChangedCallback.invoked).to.be.true;
            expect(attributeChangedCallback.response).to.be.deep.equal(['title', null, 'test']);
            element.setAttribute('title', 'test2');
            expect(attributeChangedCallback.response).to.be.deep.equal(['title', 'test', 'test2']);
        });

        it('should handle attribute changes on removeAttribute', () => {
            const attributeChangedCallback = spyFunction((name, old, value) => [name, old, value]);
            const TestElement = class extends DNA.Component {
                static get observedAttributes() {
                    return ['title'];
                }

                attributeChangedCallback(...args) {
                    super.attributeChangedCallback(...args);
                    attributeChangedCallback(...args);
                }
            };

            DNA.define('test-component12', TestElement);

            const element = new TestElement();
            expect(attributeChangedCallback.invoked).to.be.false;
            element.setAttribute('title', 'test');
            expect(attributeChangedCallback.invoked).to.be.true;
            expect(attributeChangedCallback.response).to.be.deep.equal(['title', null, 'test']);
            element.removeAttribute('title');
            expect(attributeChangedCallback.response).to.be.deep.equal(['title', 'test', null]);
        });

        it('should handle attribute if nothing changed on setAttribute', () => {
            const attributeChangedCallback = spyFunction((name, old, value) => [name, old, value]);
            const TestElement = class extends DNA.Component {
                static get observedAttributes() {
                    return ['title'];
                }

                attributeChangedCallback(...args) {
                    super.attributeChangedCallback(...args);
                    attributeChangedCallback(...args);
                }
            };

            DNA.define('test-component13', TestElement);

            const element = new TestElement();
            expect(attributeChangedCallback.invoked).to.be.false;
            element.setAttribute('title', 'test');
            expect(attributeChangedCallback.invoked).to.be.true;
            expect(attributeChangedCallback.response).to.be.deep.equal(['title', null, 'test']);
            element.setAttribute('title', 'test');
            expect(attributeChangedCallback.count).to.be.equal(2);
        });
    });

    describe.skip('#propertyChangedCallback', () => {
        it('should handle property changes on assignment', () => {
            //
        });

        it('should handle property changes on deletion', () => {
            //
        });

        it('should should re-render on property changes', () => {
            //
        });

        it('should NOT handle property if nothing changed on assignment', () => {
            //
        });
    });

    describe.skip('#appendChild', () => {
        it('should append and connect child', () => {
            //
        });

        it('should move and connect a child from a parent', () => {
            //
        });
    });

    describe.skip('#removeChild', () => {
        it('should remove and disconnect a child', () => {
            //
        });
    });

    describe.skip('#insertBefore', () => {
        it('should insert and connect a child before another', () => {
            //
        });

        it('should insert and connect a child (and remove it from the previous parent) before another', () => {
            //
        });

        it('should do nothing when child is already before another', () => {
            //
        });
    });

    describe.skip('#replaceChild', () => {
        it('should reaplce and connect child in a parent', () => {
            //
        });

        it('should reaplce and connect a child (and remove it from the previous parent) in a parent', () => {
            //
        });

        it('should do nothing if the node is the same', () => {
            //
        });
    });

    describe.skip('#observe', () => {
        it('should observe property changes', () => {
            //
        });
    });

    describe.skip('#unobserve', () => {
        it('should unobserve property changes', () => {
            //
        });
    });

    describe.skip('#dispatchEvent', () => {
        it('should dispatch an event', () => {
            //
        });

        it('should create and dispatch a custom event', () => {
            //
        });
    });

    describe.skip('#delegate', () => {
        it('should delegate an event', () => {
            //
        });
    });

    describe.skip('#undelegate', () => {
        it('should undelegate an event', () => {
            //
        });
    });

    describe('attributes', () => {
        let element, TestElement;

        before(() => {
            TestElement = class extends DNA.Component {
                static get observedAttributes() {
                    return ['title', 'age'];
                }

                get properties() {
                    return {
                        age: {
                            types: [Number],
                        },
                    };
                }

                @DNA.property({ attribute: 'title' }) title = '';
            };

            DNA.define('test-component36', TestElement);
        });

        beforeEach(() => {
            element = new TestElement({
                title: 'DNA',
                age: 42,
            });
        });

        describe('#getAttribute', () => {
            it('should get an empty attribute', () => {
                expect(element.getAttribute('missing')).to.be.null;
            });

            it('should get a string attribute', () => {
                expect(element.getAttribute('title')).to.be.equal('DNA');
            });

            it('should get a numeric attribute', () => {
                expect(element.getAttribute('age')).to.be.equal('42');
            });
        });

        describe('#setAttribute', () => {
            it('should set an attribute', () => {
                element.setAttribute('missing', 'DNA');
                expect(element.getAttribute('missing')).to.be.equal('DNA');
            });

            it('should set a string attribute and update the property', () => {
                element.setAttribute('title', 'WebComponents');
                expect(element.title).to.be.equal('WebComponents');
            });

            it('should set a numeric attribute and update the property', () => {
                element.setAttribute('age', '42');
                expect(element.age).to.be.equal(42);
            });
        });

        describe('#hasAttribute', () => {
            it('should return `true` if element has an attribute', () => {
                expect(element.hasAttribute('title')).to.be.true;
            });

            it('should return `false` if element has an attribute', () => {
                expect(element.hasAttribute('missing')).to.be.false;
            });
        });

        describe('#removeAttribute', () => {
            it('should remove an attribute', () => {
                element.removeAttribute('title');
                expect(element.hasAttribute('title')).to.be.false;
            });

            it('should remove a string attribute and update the property', () => {
                element.removeAttribute('title');
                expect(element.title).to.be.null;
            });

            it('should remove a numeric attribute and update the property', () => {
                element.removeAttribute('age');
                expect(element.age).to.be.null;
            });
        });
    });
});
