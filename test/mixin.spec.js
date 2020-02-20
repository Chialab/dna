import { getModule } from './helpers.js';

let DNA;

describe('mixin', function() {
    this.timeout(10 * 1000);

    before(async () => {
        DNA = await getModule();
    });

    it('should instantiate an extend class', () => {
        //
    });

    it('should inheritd DNA component prototype', () => {
        //
    });

    it('should create a base class starting from the anchor base class with DNA component prototype', () => {
        const BaseClass = DNA.DOM.get('HTMLAnchorElement');
        const TestClass = class extends DNA.mixin(BaseClass) { };
        DNA.define('test-mixin', TestClass, { extends: 'a' });
        const element = new TestClass();
        element.href = 'https://www.webcomponents.org/introduction';
        expect(TestClass).to.not.equal(BaseClass);
        expect(element).to.be.an.instanceof(BaseClass);
        expect('href' in element).to.be.true;
    });
});