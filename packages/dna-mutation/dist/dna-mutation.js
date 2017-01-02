!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"[object Object]"===Object.prototype.toString.call(t)}function i(t){return"undefined"==typeof t}function o(t){return Array.isArray(t)}function a(t){return i(t)||null===t||t===!1}function u(t){return self.Symbol?self.Symbol(t):"__"+t}function c(t){return t&&t.node}function s(t){return t&&t[et]}function l(t){if(t=s(t)||t,t[tt])return t[it].call(t),!0}function f(t){if(t=s(t)||t,t[tt])return t[ot].call(t),!0}function h(t,e,n,r){if(t=s(t)||t,t[tt]){var i=t.constructor.observedAttributes||[];if(i.indexOf(e)!==-1)return t[at].call(t,e,n,r),!0}}function p(t){if(n(t)&&(t=$.get(t)),e(t))return new t}function d(t,e){return t=c(t)||t,e=c(e)||e,(t!==e.parentNode||t.lastElementChild!==e)&&(e.parentNode&&v(e.parentNode,e),t.appendChild(e),l(e))}function v(t,e){return t=c(t)||t,e=c(e)||e,t.removeChild(e),f(e)}function y(t,e,n){if(t=c(t)||t,e=c(e)||e,n=c(n)||n,e.nextSibling!==n)return e.parentNode&&f(e),t.insertBefore(e,n),l(e)}function b(t,e,n){return e=c(e)||e,n=c(n)||n,e.parentNode&&f(e),t.replaceChild(e,n),f(n),l(e)}function m(t,e,n){t=c(t)||t;var r=t.getAttribute(e);return t.setAttribute(e,n),h(t,e,r,n)}function g(t,e){t=c(t)||t;var n=t.getAttribute(e);return t.removeAttribute(e),h(t,e,n,null)}function C(t,e,n){for(var r=0,i=t.length;r<i;r++)n=e(n,t[r],r,t);return n}function w(t,e,n){for(;t;)n=e(n,t),t=Object.getPrototypeOf(t);return n}function k(t,e){return w(t,function(n,r){if(r.hasOwnProperty(e)){var i=Object.getOwnPropertyDescriptor(r,e),o=void 0;i.hasOwnProperty("value")?o=i.value:i.hasOwnProperty("get")&&(o=i.get.call(t)),n.push(o)}return n},[])}function N(t,e){var n=k(t,e);return C(n,function(t,e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n]);return t},{})}function O(t,e,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var a=new st(e,{detail:r,bubbles:i,cancelable:o});return t.dispatchEvent(a)}function x(t){return new lt(t)}function M(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function A(t,e,n){var r=t.getAttribute(e);r!==n&&(a(n)?null!==r&&t.removeAttribute(e):("boolean"==typeof n&&(n=""),t.setAttribute(e,n)))}function E(t,e){return pt.call(t,e)}function S(t,e,n){if(!n)return e;for(var r=t.target;r&&r!==e;){if(E(r,n))return r;r=r.parentNode}return null}function _(t,e){var n=this;return function(r){var i=S(r,n.node,t);i&&e.call(n,r,i)}}function j(t){return t.ownerDocument||gt}function D(t){var e=j(t.node).createElement("style");return e.id="style-"+t.is,e}function P(t,e){var n="."+e;return t.replace(yt,function(t){return t.replace(bt,function(t){return t.split(mt).map(function(t){return t=t.trim(),0===t.indexOf(":host")?t.replace(vt,function(t,e,r,i){return""+n+(i||"")}):n+" "+t}).join(", ")})})}function T(t,e,n){return $.define(t,e,n)}function L(t){for(var e in $.components)for(var n=$.get(e),r=t.querySelectorAll(e),i=0,o=r.length;i<o;i++){var a=new n(r[i]);l(a)}}function R(){}function I(t,e){this.attrs=At(),this.attrsArr=[],this.newAttrs=At(),this.staticsApplied=!1,this.key=e,this.keyMap=At(),this.keyMapValid=!0,this.focused=!1,this.nodeName=t,this.text=null}function B(){this.created=jt.nodesCreated&&[],this.deleted=jt.nodesDeleted&&[]}function V(t,n){var r=this;if(e(t)){var i=t.call(this,n);V.call(this,i)}else o(t)&&t.forEach(function(t){V.call(r,t)})}function z(t,e,n){return Ht(t,V.bind(this,e,n))}function F(t){var e=function(){return Reflect.construct(t,[],this.constructor)};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function q(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=new e;for(var i in n)r[i]=n[i];return t.appendChild(r),r}function H(t){[].forEach.call(t,function(t){if(s(t))l(t);else{var e=$.get(t.getAttribute("is")||t.tagName);if(e){var n=new e;n.node=t,l(n)}}t.children&&H(t.children)})}var X,G=Object.defineProperty,J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},U=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},Y=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Z=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},K=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},Q=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},W="components",$=(X={},Z(X,W,{}),Z(X,"define",function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t=t.toLowerCase(),G(e.prototype,"is",{get:function(){return t}}),this[W][t]={is:t,Ctr:e,config:n}}),Z(X,"get",function(t,e){var n=this[W][t.toLowerCase()];if(n)return e?n:n.Ctr}),X),tt=u("dna"),et=u("component"),nt=u("node"),rt=u("style"),it="connectedCallback",ot="disconnectedCallback",at="attributeChangedCallback",ut=Object.freeze({getComponentNode:c,getNodeComponent:s,connect:l,disconnect:f,update:h,createElement:p,appendChild:d,removeChild:v,insertBefore:y,replaceChild:b,setAttribute:m,removeAttribute:g}),ct=function(t){var e=function(t){function e(){return U(this,e),Q(this,t.apply(this,arguments))}return K(e,t),e.prototype.connectedCallback=function(){this.node[et]=this},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},Y(e,[{key:tt,get:function(){return!0}},{key:"node",get:function(){return this[nt]},set:function(t){t[et]=this,this[nt]=t}}]),e}(t);return e},st=self.CustomEvent;try{new st("test")}catch(t){st=function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},st.prototype=self.CustomEvent.prototype}var lt=function(){function t(e){var n=this;U(this,t),this._=[],e=e||[],o(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),!(null===t||void 0===t||n.validateType(t)&&n.validator(t)))throw new TypeError("Invalid `"+t+"` value for `"+n.name+"` property for `"+n.scope.is+"`.");var e=n.value;e!==t&&(n.value=t,n.initialized&&n.changed(t,e))}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){this.defaultSet=!1;for(var r=0,i=this._.length;r<i;r++){var o=this._[r];n(o)?this.scope[o].call(this.scope,this,t,e):o.call(this.scope,this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):(this.attrRequested=!!t,this.attrName=this.name),this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}return!1},t.prototype.init=function(t){this.scope=t,G(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),i(this.defaultValue)||(t[this.name]=this.defaultValue,this.defaultSet=!0),this.initialized=!0},t}();G(x,"ANY",{get:function(){return x()}}),G(x,"STRING",{get:function(){return x(String)}}),G(x,"BOOLEAN",{get:function(){return x(Boolean)}}),G(x,"NUMBER",{get:function(){return x(Number)}});var ft=function(t){return function(t){function e(n){U(this,e);var r=Q(this,t.call(this,n)),i=N(r,"properties");for(var o in i)i[o]instanceof lt||(i[o]=x(i[o]));G(r,"properties",{value:i});var a=r.constructor.observedAttributes||[],u=function(t){var e=i[t];e.named(t).observe(function(t,e,n){return r.propertyChangedCallback(t.name,n,e)}).init(r);var n=e.attrName,o=e.eventName;n||a.indexOf(t)===-1||(e.attribute(),n=t),(n||o)&&e.observe(function(){n&&A(r,n,r[e.name]),o&&O(r,o)})};for(var c in i)u(c);return r}return K(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName,a=r.name;(i(this[a])||r.defaultSet)&&(this.hasAttribute(o||a)?this[a]=M(r,this.getAttribute(o||a)):i(this.node[a])||(this[a]=this.node[a])),o&&A(this,o,this[a])}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var a=i[o];if(a.attrName===e)return void(this[a.name]=M(a,r))}},e.prototype.propertyChangedCallback=function(){},e.prototype.observeProperty=function(t,e){return this.properties[t].observe(e)},e.prototype.unobserveProperty=function(t,e){this.properties[t].unobserve(e)},e}(t)},ht=Element.prototype,pt=ht.matches||ht.mozMatchesSelector||ht.msMatchesSelector||ht.oMatchesSelector||ht.webkitMatchesSelector,dt=function(t){return function(t){function r(i){U(this,r);var o=Q(this,t.call(this,i)),a=N(o,"events");for(var u in a){var c=n(a[u])?o[a[u]]:a[u];if(!e(c))throw new TypeError("Invalid callback for event.");var s=u.trim().split(" "),l=s.shift(),f=s.join(" ");a[u]={name:l,selector:f,callback:_.call(o,f,c)}}return G(o,"events",{value:a}),o}return K(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.events;for(var n in e)this.addEventListener(e[n].name,e[n].callback)},r.prototype.disconnectedCallback=function(){var e=this.events;for(var n in e)this.removeEventListener(e[n].name,e[n].callback);t.prototype.disconnectedCallback.call(this)},r.prototype.delegate=function(t,e,n){var r=_.call(this,e,n);return this.addEventListener(t,r)},r.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return O(this,t,e,n,r)},r}(t)},vt=/(\:host)(\(([^(]+(\([^)]*\))?)+\))?/g,yt=/[\n\s\,\}](#|\.|\[|[a-zA-Z]|\:)([^{\;\}\/]*)({({(.|\n)*?}|.|\n)*?})/g,bt=/[^{]*{/,mt=/\,\s*/,gt=document,Ct=function(t){return function(t){function e(r){U(this,e);var i=Q(this,t.call(this,r)),o=k(i,"css").filter(function(t){return n(t)}).join("\n");return o&&G(i,"css",{value:o}),i}return K(e,t),e.prototype.connectedCallback=function(){if(t.prototype.connectedCallback.call(this),n(this.css))if(this.shadowRoot){if(!this[rt]){var e=this[rt]=D(this);this.shadowRoot.appendChild(e),e.textContent=this.css}}else if(!this.constructor[rt]){var r=this.constructor[rt]=D(this);j(this.node).head.appendChild(r),r.textContent=P(this.css,this.is)}this.classList.add(this.is)},e}(t)},wt=function(t){return function(t){function n(){return U(this,n),Q(this,t.apply(this,arguments))}return K(n,t),n.prototype.connectedCallback=function(){a(this.template)||this.render(),t.prototype.connectedCallback.call(this)},n.prototype.propertyChangedCallback=function(e,n,r){t.prototype.propertyChangedCallback.call(this,e,n,r),a(this.template)||this.render()},n.prototype.render=function(t){return t=t||this.template,e(t)?t.call(this):void((this.shadowRoot||this.node).innerHTML=t)},n}(t)},kt=function(){function t(e){U(this,t),e=e||function(){function t(){U(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){var t=[].slice.call(arguments,0);return C(t,function(t,e){return e(t)},this.superclass)},t}(),Nt=function(t){return new kt(t)},Ot={ComponentMixin:ct,PropertiesMixin:ft,EventsMixin:dt,StyleMixin:Ct,TemplateMixin:wt},xt=Object.prototype.hasOwnProperty;R.prototype=Object.create(null);var Mt=function(t,e){return xt.call(t,e)},At=function(){return new R},Et=function(t,e,n){var r=new I(e,n);return t.__incrementalDOMData=r,r},St=function(t){return _t(t),t.__incrementalDOMData},_t=function t(e){if(!e.__incrementalDOMData){var n=e instanceof Element,r=n?e.localName:e.nodeName,i=n?e.getAttribute("key"):null,o=Et(e,r,i);if(i&&(St(e.parentNode).keyMap[i]=e),n)for(var a=e.attributes,u=o.attrs,c=o.newAttrs,s=o.attrsArr,l=0;l<a.length;l+=1){var f=a[l],h=f.name,p=f.value;u[h]=p,c[h]=void 0,s.push(h),s.push(p)}for(var d=e.firstChild;d;d=d.nextSibling)t(d)}},jt={nodesCreated:null,nodesDeleted:null};B.prototype.markCreated=function(t){this.created&&this.created.push(t)},B.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},B.prototype.notifyChanges=function(){this.created&&this.created.length>0&&jt.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&jt.nodesDeleted(this.deleted)};var Dt=function(t){return t instanceof Document||t instanceof DocumentFragment},Pt=function(t,e){for(var n=[],r=t;r!==e;)n.push(r),r=r.parentNode;return n},Tt=function(t){for(var e=t,n=e;e;)n=e,e=e.parentNode;return n},Lt=function(t){var e=Tt(t);return Dt(e)?e.activeElement:null},Rt=function(t,e){var n=Lt(t);return n&&t.contains(n)?Pt(n,e):[]},It=null,Bt=null,Vt=null,zt=null,Ft=function(t,e){for(var n=0;n<t.length;n+=1)St(t[n]).focused=e},qt=function(t){var e=function(e,n,r){var i=It,o=zt,a=Bt,u=Vt;It=new B,zt=e.ownerDocument,Vt=e.parentNode;var c=Rt(e,Vt);Ft(c,!0);var s=t(e,n,r);return Ft(c,!1),It.notifyChanges(),It=i,zt=o,Bt=a,Vt=u,s};return e},Ht=qt(function(t,e,n){return Bt=t,Jt(),e(n),Ut(),t}),Xt=function(t,e,n){t.removeChild(e),It.markDeleted(e);var r=St(e).key;r&&delete n[r]},Gt=function(){var t=Vt,e=St(t),n=e.keyMap,r=e.keyMapValid,i=t.lastChild,o=void 0;if(i!==Bt||!r){for(;i!==Bt;)Xt(t,i,n),i=t.lastChild;if(!r){for(o in n)i=n[o],i.parentNode!==t&&(It.markDeleted(i),delete n[o]);e.keyMapValid=!0}}},Jt=function(){Vt=Bt,Bt=null},Ut=function(){Gt(),Bt=Vt,Vt=Vt.parentNode},Yt={default:"__default"},Zt=function(t){return 0===t.lastIndexOf("xml:",0)?"http://www.w3.org/XML/1998/namespace":0===t.lastIndexOf("xlink:",0)?"http://www.w3.org/1999/xlink":void 0},Kt=function(t,e,n){if(null==n)t.removeAttribute(e);else{var r=Zt(e);r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}},Qt=function(t,e,n){t[e]=n},Wt=function(t,e,n){e.indexOf("-")>=0?t.setProperty(e,n):t[e]=n},$t=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style,i=n;for(var o in i)Mt(i,o)&&Wt(r,o,i[o])}},te=function(t,e,n){var r="undefined"==typeof n?"undefined":J(n);"object"===r||"function"===r?Qt(t,e,n):Kt(t,e,n)},ee=At();ee[Yt.default]=te,ee.style=$t;var ne=[],re=function(t){return function(t){function n(){return U(this,n),Q(this,t.apply(this,arguments))}return K(n,t),n.prototype.render=function(n){var r=this;n=n||this.template,e(n)&&!function(){var t=n.bind(r);n=function(){return z(r.shadowRoot||r.node,t)}}(),t.prototype.render.call(this,n)},n}(t)},ie=function(t){return function(t){function e(){return U(this,e),Q(this,t.apply(this,arguments))}return K(e,t),Y(e,[{key:"is",get:function(){return(this.node.getAttribute("is")||this.node.localName).toLowerCase()}},{key:"node",get:function(){return this}}]),e}(t)};Ot.CustomElementMixin=ie,Ot.IDOMMixin=re;var oe=function(t){function e(){return U(this,e),Q(this,t.apply(this,arguments))}return K(e,t),e}(Nt(F(self.HTMLElement)).with(Ot.ComponentMixin,Ot.PropertiesMixin,Ot.StyleMixin,Ot.EventsMixin,Ot.TemplateMixin,re,ie)),ae=new MutationObserver(function(t){t.forEach(function(t){switch(t.type){case"childList":t.addedNodes&&H(t.addedNodes),t.removedNodes&&t.removedNodes.forEach(function(t){f(t)});break;case"attributes":var e=t.attributeName;if("is"===e)break;var n=t.target;h(n,e,t.oldValue,n.getAttribute(e))}})});ae.observe(document.body,{attributes:!0,childList:!0,subtree:!0}),t.registry=$,t.define=T,t.bootstrap=L,t.shim=F,t.render=q,t.MIXINS=Ot,t.BaseComponent=oe,t.DOM=ut,t.mix=Nt,t.prop=x,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-mutation.js.map
