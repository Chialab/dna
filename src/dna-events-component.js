import { mix } from 'mixwith';
import { DNAComponent } from './dna-component.js';
import { delegate } from './helpers/delegate.js';

export const DNAEventsMixin = (SuperClass) => class extends SuperClass {
    /**
     * Fires when an instance of the element is created.
     */
    constructor() {
        super();
        // bind events
        let events = this.constructor.events || {};
        for (let k in events) {
            if (events.hasOwnProperty(k)) {
                let callback = (typeof events[k] === 'string') ?
                    this[events[k]] :
                    events[k];
                if (typeof callback === 'function') {
                    let rule = k.match(/([^\s]+)(.*)?/);
                    let evName = rule[1];
                    let selector = (rule[2] || '').trim();
                    if (selector) {
                        delegate(this, evName, selector, (ev, target) => {
                            callback.call(this, ev, target);
                        });
                    } else {
                        this.addEventListener(evName, (ev) => {
                            callback.call(this, ev, this);
                        });
                    }
                }
            }
        }
    }
    /**
     * `Node.prototype.dispatchEvent` wrapper.
     * @param {String} evName The name of the event to fire.
     * @param {Object} data A set of custom data to pass to the event.
     * @param {Boolean} bubbles Should the event bubble throw the DOM tree.
     * @param {Boolean} cancelable Can be the event cancel by a callback.
     */
    trigger(evName, data, bubbles = true, cancelable = true) {
        if (!evName) {
            throw new Error('Event name is undefined');
        }
        let ev = new CustomEvent(evName, {
            detail: data,
            bubbles,
            cancelable,
        });
        return this.dispatchEvent(ev);
    }
};

/**
 * Simple Custom Component with events delegation,
 * It also implement a `dispatchEvent` wrapper named `trigger`.
 * @class DNAEventsComponent
 * @extends DNAComponent
 *
 * @example
 * my-component.js
 * ```js
 * import { DNAEventsComponent } from 'dna/component';
 * export class MyComponent extends DNAEventsComponent {
 *   static get events() {
 *     return {
 *       'click button': 'onButtonClick'
 *     }
 *   }
 *   onButtonClick() {
 *     console.log('button clicked');
 *   }
 * }
 * ```
 * app.js
 * ```js
 * import { register } from 'dna/component';
 * import { MyComponent } from './components/my-component/my-component.js';
 * var MyElement = register('my-component', MyComponent);
 * var element = new MyElement();
 * var button = document.createElement('button');
 * button.innerText = 'Click me';
 * element.appendChild(button);
 * button.click(); // logs "button clicked"
 * ```
 */
export class DNAEventsComponent extends mix(DNAComponent).with(DNAEventsMixin) {}
