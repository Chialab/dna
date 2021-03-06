# Manipulating the DOM

## Why and how

Since DNA does not require any Custom Elements polyfill, the [life cycle](./life-cycle) is delegated to the render cycle which uses the `DOM` helper under the hood. This helper invokes the life cycle methods for each DOM operation like `appendChild`, `removeChild` etc.
If you want to manipulate the DOM tree outside of a render cycle, always use `DOM` methods instead of the `HTMLElement` prototype:

```ts
import { ChildComponent } from './child-component';

const child = new ChildComponent();

// ✘ DON'T
document.body.appendChild(child);
// ✔︎ DO!
DOM.appendChild(document.body, child);
```

All methods inherit the prototype signature with the context node as first argument:

| `HTMLElement.prototype` | `DOM` helper |
| :------------------- | :------------ |
| `appendChild(newChild)` | `appendChild(parent, newChild)` |
| `removeChild(oldChild)` | `removeChild(parent, oldChild)` |
| `insertBefore(newChild, refChild)` | `insertBefore(parent, newChild, refChild)` |
| `replaceChild(newChild, oldChild)` | `replaceChild(parent, newChild, oldChild)` |
| `insertAdjacentElement(position, instertedElement)` | `insertAdjacentElement(parent, position, instertedElement)` |
| `getAttribute(qualifiedName)` | `getAttribute(element, qualifiedName)` |
| `hasAttribute(qualifiedName)` | `hasAttribute(element, qualifiedName)` |
| `setAttribute(qualifiedName, value)` | `setAttribute(element, qualifiedName, value)` |
| `removeAttribute(qualifiedName)` | `removeAttribute(element, qualifiedName)` |
| `dispatchEvent(event)` | `dispatchEvent(element, event)` |
| `matches(selector)` | `matches(element, selector)` |

</aside>

## Setting `innerHTML`

Since DNA render cycle is responsible for Custom Element's life cycle support in old browser, directly setting the `innerHTML` to an element can lead to unexpected behavior. You should always consider to use the `html` helper coombine with the `render` method, but when it is not possible you can always invoke the `customElements.upgrade` method to the changed root node:

```ts
import { customElements } from '@chialab/dna';
import './video-player.js';

const element = document.querySelector('main');
element.innerHTML = `<article>
    <h1>Title</h1>
    <video-player>
        <source src="/video.mp4" />
    </video-player>
</article>`;

customElements.upgrade(element);
```

## Integration with third party libraries

Sometimes you need to encapsulate in DNA another UI library, like [Mapbox](https://github.com/mapbox/mapbox-gl-js) or [Pickr](https://github.com/Simonwep/pickr). Since DNA components are DOM nodes, the integration is possible using the element context as library param:

```ts
import { Component, customElement } from '@chialab/dna';
import Pickr from '@simonwep/pickr';

@customElement('color-picker')
export class ColorPicker extends Component {
    private pickr: Pickr;

    connectedCallback() {
        super.connectedCallback();
        this.pickr = new Pickr({
            el: this,
        });
    }

    disconnectedCallback() {
        this.pickr.destroyAndRemove();
        super.disconnectedCallback();
    }
}
```
