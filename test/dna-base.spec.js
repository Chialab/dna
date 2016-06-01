import { register } from '../src/plugins/dna.elements.js';
import { TestComponent } from './components/dna-base.js';

const Test = register('test-base-component', {
    prototype: TestComponent,
});

/* globals describe, before, beforeEach, it, assert */
describe('Unit: DNABaseComponent', () => {
    let elem = new Test();

    describe('Unit: DNABaseComponent > registration', () => {
        it('check if element is correctly registered', () => {
            assert.equal(TestComponent.registered, true);
        });
    });

    describe('Unit: DNABaseComponent > created', () => {
        it('check if element is correctly instantiated', () => {
            assert.equal(elem.created, true);
        });
    });

    describe('Unit: DNABaseComponent > attached', () => {
        before((done) => {
            document.body.appendChild(elem);
            setTimeout(() => {
                done();
            }, 250);
        });
        it('check if element is correctly attached to the tree', () => {
            assert.equal(elem.attached, true);
        });
    });

    describe('Unit: DNABaseComponent > detached', () => {
        before((done) => {
            document.body.removeChild(elem);
            setTimeout(() => {
                done();
            }, 250);
        });
        it('check if element is correctly detached from the tree', () => {
            assert.equal(elem.attached, false);
        });
    });

    describe('Unit: DNABaseComponent > attributeChanged', () => {
        it('check if element is correctly trigger attributeChangedCallback', () => {
            elem.setAttribute('name', 'Alan');
            assert.equal(elem.name, 'Alan');
        });
    });
});