!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"[object Object]"===Object.prototype.toString.call(t)}function i(t){return"undefined"==typeof t}function o(t){return Array.isArray(t)}function s(t){return i(t)||null===t||t===!1}function u(t,e,n){for(var r=0,i=t.length;r<i;r++)n=e(n,t[r],r,t);return n}function a(t,e,n){for(;t;)n=e(n,t),t=t.__proto__;return n}function c(t,e){return a(t,function(t,n){return n.hasOwnProperty(e)&&t.push(n[e]),t},[])}function l(t,e){var n=c(t,e);return u(n,function(t,e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n]);return t},{})}function f(t,e,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var s=new I(e,{detail:r,bubbles:i,cancelable:o});return t.dispatchEvent(s)}function p(t){return new B(t)}function h(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function d(t,e,n){var r=t.getAttribute(e);r!==n&&(s(n)?null!==r&&t.removeAttribute(e):("boolean"==typeof n&&(n=""),t.setAttribute(e,n)))}function v(t,e){return z.call(t,e)}function y(t,e,n){if(!n)return e;for(var r=t.target;r&&r!==e;){if(v(r,n))return r;r=r.parentNode}return null}function b(t,e){var n=this;return function(r){var i=y(r,n.node,t);i&&e.call(n,r,i)}}function m(t){return t.ownerDocument||J}function g(t){var e=m(t).createElement("style");return e.id="style-"+t.is,e}function C(t,e){var n="."+e;return t.replace(H,function(t){var e=t.slice(0,-1).split(G).map(function(t){return 0===t.indexOf(":host")?t.replace(V,function(t,e,r){return r=r?r.slice(1,-1):"",""+n+r}):n+" "+t}).join(", ");return e+"{"})}function w(t){var e=function(){return Reflect.construct(t,[],this.constructor)};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function E(){return W.define.apply(W,arguments)}function _(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=new e;for(var i in n)r[i]=n[i];return t.appendChild(r),r}var k,x=Object.defineProperty,O=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},M=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),N=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},j=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},A=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},S="components",T=(k={},N(k,S,{}),N(k,"define",function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t=t.toLowerCase(),x(e.prototype,"is",{get:function(){return t}}),this[S][t]={is:t,Ctr:e,config:n}}),N(k,"get",function(t,e){var n=this[S][t.toLowerCase()];if(n)return e?n:n.Ctr}),k,"__component"),P="__node",L="__style",R=function(t){return function(t){function e(){return O(this,e),A(this,t.apply(this,arguments))}return j(e,t),e.prototype.connectedCallback=function(){this.node[T]=this},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},M(e,[{key:"node",get:function(){return this[P]},set:function(t){t[T]=this,this[P]=t}}]),e}(t)},I=self.CustomEvent;try{new I("test")}catch(t){I=function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},I.prototype=self.CustomEvent.prototype}var B=function(){function t(e){var n=this;O(this,t),this._=[],e=e||[],o(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),!(null===t||void 0===t||n.validateType(t)&&n.validator(t)))throw new TypeError("Invalid `"+t+"` value for `"+n.name+"` property for `"+n.scope.is+"`.");var e=n.value;e!==t&&(n.value=t,n.changed(t,e))}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){for(var r=0,i=this._.length;r<i;r++){var o=this._[r];n(o)?this.scope[o].call(this.scope,this,t,e):o(this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):(this.attrRequested=!!t,this.attrName=this.name),this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}return!1},t.prototype.init=function(t){this.scope=t,x(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),i(this.defaultValue)||(t[this.name]=this.defaultValue)},t}();x(p,"ANY",{get:function(){return p()}}),x(p,"STRING",{get:function(){return p(String)}}),x(p,"BOOLEAN",{get:function(){return p(Boolean)}}),x(p,"NUMBER",{get:function(){return p(Number)}});var F=function(t){return function(t){function e(){O(this,e);var n=A(this,t.call(this)),r=l(n,"properties");for(var i in r)r[i]instanceof B||(r[i]=p(r[i]));x(n,"properties",{value:r,writable:!1,configurable:!0});var o=n.constructor.observedAttributes||[],s=function(t){var e=r[t];e.named(t).observe(function(t,e,r){return n.propertyChangedCallback(t.name,r,e)}).init(n);var i=e.attrName,s=e.eventName;i||o.indexOf(t)===-1||(e.attribute(),i=t),(i||s)&&e.observe(function(){i&&d(n.node,i,n[e.name]),s&&f(n.node,s)})};for(var u in r)s(u);return n}return j(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName,s=r.name;i(this[s])?this.node.hasAttribute(o||s)&&(this[s]=h(r,this.node.getAttribute(o||s))):o&&d(this.node,o,this[s])}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var s=i[o];if(s.attrName===e)return void(this[s.name]=h(s,r))}},e.prototype.propertyChangedCallback=function(){},e.prototype.observeProperty=function(t,e){return this.properties[t].observe(e)},e.prototype.unobserveProperty=function(t,e){this.properties[t].unobserve(e)},e}(t)},q=Element.prototype,z=q.matches||q.mozMatchesSelector||q.msMatchesSelector||q.oMatchesSelector||q.webkitMatchesSelector,D=function(t){return function(t){function r(){O(this,r);var i=A(this,t.call(this)),o=l(i,"events");for(var s in o){var u=n(o[s])?i[o[s]]:o[s];if(!e(u))throw new TypeError("Invalid callback for event.");var a=s.split(" ").slice(1).join(" ").trim();o[s]=b.call(i,a,u)}return x(i,"events",{value:o}),i}return j(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.events;for(var n in e){var r=n.split(" ").shift();this.node.addEventListener(r,e[n])}},r.prototype.disconnectedCallback=function(){var e=this.events||{};for(var n in e){var r=n.split(" ").shift();this.node.removeEventListener(r,e[n])}t.prototype.disconnectedCallback.call(this)},r.prototype.delegate=function(t,e,n){var r=b.call(this,e,n);this.node.addEventListener(t,r)},r.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return f(this.node,t,e,n,r)},r}(t)},V=/(\:host)(\([^)]*\))?/g,H=/(#|\.|\@|\[|[a-zA-Z]|\:)([^{\;\}]*){/g,G=/\,\s*/,J=document,U=function(t){return function(t){function e(){O(this,e);var r=A(this,t.call(this)),i=c(r,"css").filter(function(t){return n(t)}).join("\n");return x(r,"css",{value:i}),r}return j(e,t),e.prototype.connectedCallback=function(){if(t.prototype.connectedCallback.call(this),n(this.css))if(this.node.shadowRoot){if(!this[L]){var e=this[L]=g(this.node);this.node.shadowRoot.appendChild(e),e.textContent=this.css}}else if(!this.constructor[L]){var r=this.constructor[L]=g(this.node);m(this.node).head.appendChild(r),r.textContent=C(this.css,this.is)}this.node.classList.add(this.is)},e}(t)},X=function(t){return function(t){function r(){return O(this,r),A(this,t.apply(this,arguments))}return j(r,t),r.prototype.connectedCallback=function(){s(this.template)||this.render(),t.prototype.connectedCallback.call(this)},r.prototype.propertyChangedCallback=function(e,n,r){t.prototype.propertyChangedCallback.call(this,e,n,r),s(this.template)||this.render()},r.prototype.render=function(t){if(t=t||this.template,e(t))t.call(this);else if(n(t))(this.node.shadowRoot||this.node).innerHTML=t;else if(!s(t))throw new TypeError("Invalid template property.")},r}(t)},Y=function(){function t(e){O(this,t),e=e||function(){function t(){O(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){var t=[].slice.call(arguments,0);return u(t,function(t,e){return e(t)},this.superclass)},t}(),Z=function(t){return new Y(t)},K={ComponentMixin:R,PropertiesMixin:F,EventsMixin:D,StyleMixin:U,TemplateMixin:X},Q=function(t){return function(t){function e(){O(this,e);var n=A(this,t.call(this));return n[T]=n,n}return j(e,t),M(e,[{key:"is",get:function(){return(this.node.getAttribute("is")||this.node.localName).toLowerCase()}}]),e}(t)};K.CustomElementMixin=Q;var W=self.customElements,$=function(t){function e(){return O(this,e),A(this,t.apply(this,arguments))}return j(e,t),e}(Z(w(self.HTMLElement)).with(K.ComponentMixin,K.PropertiesMixin,K.StyleMixin,K.EventsMixin,K.TemplateMixin,Q));t.shim=w,t.mix=Z,t.MIXINS=K,t.registry=W,t.define=E,t.render=_,t.BaseComponent=$,t.prop=p,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-custom-elements-v1.js.map
