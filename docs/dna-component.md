<a name="DNAComponent"></a>
## DNAComponent ⇐ <code>HTMLElement</code>
**Kind**: global class  
**Extends:** <code>HTMLElement</code>  

* [DNAComponent](#DNAComponent) ⇐ <code>HTMLElement</code>
    * [`new DNAComponent()`](#new_DNAComponent_new)
    * _instance_
        * [`.createdCallback()`](#DNAComponent+createdCallback)
        * [`.attachedCallback()`](#DNAComponent+attachedCallback)
        * [`.detachedCallback()`](#DNAComponent+detachedCallback)
        * [`.attributeChangedCallback(attrName, oldVal, newVal)`](#DNAComponent+attributeChangedCallback)
    * _static_
        * [`.tagName`](#DNAComponent.tagName) : <code>String</code>
        * [`.onRegister()`](#DNAComponent.onRegister)

<a name="new_DNAComponent_new"></a>
### `new DNAComponent()`
This is the model to use to create DNA Custom Components.

**Example**  
my-component.next.js
```js
import { DNAComponent } from 'dna/component';
export class MyComponent extends DNAComponent {
  get createdCallback() {
    console.log('Created a MyComponent instance!!!');
  }
}
```
app.next.js
```js
import { Register } from 'dna/component';
import { MyComponent } from './components/my-component/my-component.next.js';
var MyElement = Register(MyComponent);
var element = new MyElement(); // logs "Created a MyComponent instance!!!"
```
<a name="DNAComponent+createdCallback"></a>
### `dnaComponent.createdCallback()`
Fires when an instance of the element is created.

**Kind**: instance method of <code>[DNAComponent](#DNAComponent)</code>  
<a name="DNAComponent+attachedCallback"></a>
### `dnaComponent.attachedCallback()`
Fires when an instance was inserted into the document.

**Kind**: instance method of <code>[DNAComponent](#DNAComponent)</code>  
<a name="DNAComponent+detachedCallback"></a>
### `dnaComponent.detachedCallback()`
Fires when an instance was detached from the document.

**Kind**: instance method of <code>[DNAComponent](#DNAComponent)</code>  
<a name="DNAComponent+attributeChangedCallback"></a>
### `dnaComponent.attributeChangedCallback(attrName, oldVal, newVal)`
Fires when an attribute was added, removed, or updated.

**Kind**: instance method of <code>[DNAComponent](#DNAComponent)</code>  

| Param | Type | Description |
| --- | --- | --- |
| attrName | <code>String</code> | The changed attribute name. |
| oldVal | <code>\*</code> | The value of the attribute before the change. |
| newVal | <code>\*</code> | The value of the attribute after the change. |

<a name="DNAComponent.tagName"></a>
### `DNAComponent.tagName` : <code>String</code>
The tag name of the custom element.

**Kind**: static property of <code>[DNAComponent](#DNAComponent)</code>  
<a name="DNAComponent.onRegister"></a>
### `DNAComponent.onRegister()`
Fires when an the element is registered.

**Kind**: static method of <code>[DNAComponent](#DNAComponent)</code>  