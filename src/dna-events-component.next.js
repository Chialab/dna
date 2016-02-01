'use strict';

import Delegate from './libs/dom-delegate.next.js';
import { DNAComponent }
from './dna-component.next.js';

/**
 * Simple Custom Component with events delegation, `addEventListener` polyfill and a `dispatchEvent` wrapper named `trigger`.
 * @class DNAEventsComponent
 * @extends DNAComponent
 *
 * @example
 * my-component.next.js
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
 * app.next.js
 * ```js
 * import { Register } from 'dna/component';
 * import { MyComponent } from './components/my-component/my-component.next.js';
 * var MyElement = Register(MyComponent);
 * var element = new MyElement();
 * var button = document.createElement('button');
 * button.innerText = 'Click me';
 * element.appendChild(button);
 * button.click(); // logs "button clicked"
 * ```
 */
export class DNAEventsComponent extends DNAComponent {
    /**
     * Fires when an instance of the element is created.
     */
    createdCallback() {
        // bind events
        let events = this.constructor.events || this.constructor.bindEvents;
        if (events) {
            var delegate = new Delegate(this);
            for (let k in events) {
                let callback = (typeof events[k] === 'string') ? this[events[k]] : events[k];
                if (callback && typeof callback === 'function') {
                    let evName = k.split(' ').shift(),
                        selector = k.split(' ').slice(1).join(' ');

                    let clb = callback.bind(this);
                    if (selector) {
                        delegate.on(evName, selector, function(ev) {
                            clb(ev, this);
                        });
                    } else {
                        delegate.on(evName, function(ev) {
                            clb(ev, this);
                        });
                    }
                }
            }
        }
        DNAComponent.prototype.createdCallback.call(this);
    }
    /**
     * `Node.prototype.addEventListener` polyfill.
     * @param {String} evName The name of the event to listen.
     * @param {Function} callback The callback for the event.
     */
    addEventListener(evName, callback) {
        if (typeof Node.prototype.addEventListener !== 'undefined') {
            return Node.prototype.addEventListener.call(this, evName, callback);
        } else if (typeof Node.prototype.attachEvent !== 'undefined') {
            return Node.prototype.attachEvent.call(this, 'on' + evName, callback);
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
        let ev = DNAEventsComponent.createEvent();
        if (ev) {
            if (typeof ev.initEvent !== 'undefined') {
                ev.initEvent(evName, bubbles, cancelable);
            }
            ev.detail = data;
            if (typeof Node.prototype.dispatchEvent !== 'undefined') {
                return Node.prototype.dispatchEvent.call(this, ev);
            } else if (typeof Node.prototype.fireEvent !== 'undefined') {
                return Node.prototype.fireEvent.call(this, 'on' + evName, ev);
            }
        }
    }
    /**
     * Create an Event instance.
     * @param {String} type The event type.
     * @return {Event} The created event.
     */
    static createEvent(type = 'Event') {
        if (typeof document.createEvent !== 'undefined') {
            return document.createEvent(type);
        } else if (typeof document.createEventObject !== 'undefined') {
            return document.createEventObject();
        }
    }
}