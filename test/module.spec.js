import { getModule } from './helpers.js';

let DNA;

describe('module', function() {
    this.timeout(10 * 1000);

    before(async () => {
        DNA = await getModule();
    });

    const EXPECTED_EXPORT_MAP = {
        DOM: 'object',
        isCustomElement: 'function',
        mixin: 'function',
        render: 'function',
        get: 'function',
        define: 'function',
        whenDefined: 'function',
        upgrade: 'function',
        Fragment: 'function',
        h: 'function',
        html: 'function',
        template: 'function',
        css: 'function',
        compile: 'function',
        delegateEventListener: 'function',
        undelegateEventListener: 'function',
        dispatchEvent: 'function',
        dispatchAsyncEvent: 'function',
        property: 'function',
        listener: 'function',
        Component: 'function',
        CustomElementRegistry: 'function',
    };

    for (let ref in EXPECTED_EXPORT_MAP) {
        it(`should export "${ref}"`, () => {
            expect(DNA[ref]).to.be.a(EXPECTED_EXPORT_MAP[ref]);
        });
    }

    it('should not export other references', () => {
        const actual = Object.keys(DNA).sort();
        // default export may be added by the bundler, ignore it.
        if (actual.indexOf('default') !== -1) {
            actual.splice(actual.indexOf('default'), 1);
        }
        const expected = Object.keys(EXPECTED_EXPORT_MAP).sort();
        expect(actual).to.deep.equal(expected);
    });
});
