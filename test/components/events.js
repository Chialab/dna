import { ELEMENTS, mix, ComponentMixin, EventsMixin } from '../../index-idom.js';

export class TestComponent extends mix(ELEMENTS.HTMLElement).with(ComponentMixin, EventsMixin) {
    get events() {
        return {
            'customEvent': 'onCustomEvent',
            'click button': 'onClick',
            'click span'(ev, span) {
                this.clickedSpan = span;
                this.clickedSpanEvent = ev;
            },
            'change input': 'onInputChange',
        };
    }

    constructor() {
        super();
        this.innerHTML = `
            <button id="button">Click</button>
            <input type="text" id="input" value="Test" />
            <span>Hold me</span>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.trigger('customEvent', {
            data: 1234,
        });
    }

    onClick(ev, element) {
        this.clicked = ev;
        this.clickedElement = element;
    }

    onInputChange(ev, element) {
        this.changed = ev;
        this.changedElement = element;
    }

    onCustomEvent(ev, element) {
        this.custom = ev;
        this.customElement = element;
    }
}


export class TestInvalidComponent extends mix(ELEMENTS.HTMLElement).with(ComponentMixin, EventsMixin) {
    get events() {
        return {
            customEvent: 'undefined',
        };
    }
}
