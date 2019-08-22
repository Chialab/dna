/* eslint-env mocha */
import { getModule } from './module.js';

let DNA;

describe('shim', () => {
    before(async () => {
        DNA = await getModule();
    });

    it('should create class shim', () => {
        const TestObject = class extends Object { };
        const ShimTestObject = DNA.shim(TestObject);
        expect(ShimTestObject).to.not.equal(TestObject);
        expect(new ShimTestObject).to.be.an.instanceof(TestObject);
    });

    it('should return already shimmed class', () => {
        const TestObject = class extends Object { };
        const ShimTestObject1 = DNA.shim(TestObject);
        const ShimTestObject2 = DNA.shim(TestObject);
        expect(ShimTestObject1).to.equal(ShimTestObject2);
    });
});
