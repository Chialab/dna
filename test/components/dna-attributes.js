import { DNAAttributesComponent } from '../../src/dna-attributes-component.js';

export class TestComponent extends DNAAttributesComponent {
    static get observedAttributes() {
        return ['title', 'id', 'alt', 'var', 'mine', 'myVar', 'myVar2', 'myVar3'];
    }

    get myVar3() {
        return this.__var3 || false;
    }

    set myVar3(val) {
        if (val) {
            this.__var3 = 'DNA Test';
        } else {
            this.__var3 = false;
        }
        return this.__var3;
    }
}
