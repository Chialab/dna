import { DNAComponent } from '../../src/dna-component.js';
import { DNABaseComponent } from '../../src/dna-base-component.js';

class BehaviorComponent extends DNAComponent {
    createdCallback() {
        this.behaviors = true;
    }
}

export class TestComponent extends DNABaseComponent {
    static get behaviors() {
        return DNABaseComponent.behaviors.concat([BehaviorComponent]);
    }

    static onRegister(is) {
        this.registered = true;
        DNABaseComponent.onRegister.call(this, is);
    }

    createdCallback() {
        this.created = true;
        super.createdCallback();
    }

    attachedCallback() {
        this.attached = true;
        super.attachedCallback();
    }

    detachedCallback() {
        this.attached = false;
        super.detachedCallback();
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        this[attr] = newVal;
        super.attributeChangedCallback(attr, oldVal, newVal);
    }
}