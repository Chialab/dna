!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"[object Object]"===Object.prototype.toString.call(t)}function i(t){return"undefined"==typeof t}function o(t){return Array.isArray(t)}function u(t,e,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var u=new I(e,{detail:r,bubbles:i,cancelable:o});return t.dispatchEvent(u)}function a(t){return t.nodeType===Node.ELEMENT_NODE&&(t=t.getAttribute("is")||t.tagName),L.get(t)}function c(t){var e=a(t);return e&&t instanceof e.Ctr}function s(t){if(c(t))return t[B].call(t),!0}function f(t){if(c(t))return t[R].call(t),!0}function l(t,e,n,r){if(c(t))return t[V].call(t,e,n,r),!0}function p(t,n){if(!e(n)){var r=a(t);r&&(n=r.Ctr)}return!!e(n)&&(t.__proto__=n.prototype,Object.defineProperty(t,"constructor",{value:n,configurable:!0,writable:!0}),n.call(t),!0)}function h(t){var e=a(t);if(e)return new e.Ctr}function d(t,e){return(t!==e.parentNode||t.lastElementChild!==e)&&(e.parentNode&&v(e.parentNode,e),t.appendChild(e),s(e))}function v(t,e){return t.removeChild(e),f(e)}function y(t,e,n){if(e.nextSibling!==n)return e.parentNode&&f(e),t.insertBefore(e,n),s(e)}function b(t,e,n){return e.parentNode&&f(e),t.replaceChild(e,n),f(n),s(e)}function m(t,e,n){var r=t.getAttribute(e);t.setAttribute(e,n);var i=t.constructor.observedAttributes||[];if(i.indexOf(e)!==-1)return l(t,e,r,n)}function g(t,e){var n=t.getAttribute(e);t.removeAttribute(e);var r=t.constructor.observedAttributes||[];if(r.indexOf(e)!==-1)return l(t,e,n,null)}function C(t){return t instanceof Y?t:new Y(t)}function w(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function x(t,e,n){var r=t.getAttribute(e);if(r!==n)if(null!==n&&void 0!==n&&n!==!1)switch("undefined"==typeof n?"undefined":z(n)){case"string":case"number":t.setAttribute(e,n);break;case"boolean":t.setAttribute(e,"")}else null!==r&&t.removeAttribute(e)}function k(t){var e=tt.createElement("style");e.type="text/css",e.setAttribute("id","style-"+t);var n=tt.head;return n.firstElementChild?n.insertBefore(e,n.firstElementChild):n.appendChild(e),e}function E(t){try{return!n(t.outerHTML)}catch(t){return!0}}function A(t){var e=function t(){if(H(this,t),!E(this))return this;var e=L.get(this.constructor),n=e.config,r=document.createElement(n.extends?n.extends:e.is);return r.__proto__=e.Ctr.prototype,n.extends&&r.setAttribute("is",e.is),r};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function N(){}function O(t,e){this.attrs=lt(),this.attrsArr=[],this.newAttrs=lt(),this.staticsApplied=!1,this.key=e,this.keyMap=lt(),this.keyMapValid=!0,this.focused=!1,this.nodeName=t,this.text=null}function M(){this.created=mt.nodesCreated&&[],this.deleted=mt.nodesDeleted&&[]}function _(t){t.forEach(function(t){e(t)?t():o(t)?_(t):t&&ue(t)})}function S(t,n){var r=this;if(e(t)){var i=t.call(this,n);S.call(this,i)}else o(t)&&t.forEach(function(t){S.call(r,t)})}function j(t,e){for(var n=arguments.length,i=Array(n>2?n-2:0),o=2;o<n;o++)i[o-2]=arguments[o];return function(){ne(t),r(e)||(e&&i.unshift(e),e={});for(var n in e)re(n,e[n]);var o=ie(t),u=ut.getComponent(o);return u?qt():_(i),oe(t),o}}function D(t,e,n){return jt(t,S.bind(this,e,n))}function T(t,e,n){return L.define(t,e,n)}function P(t,e,n){var r=new e;for(var i in n)r[i]=n[i];return ut.appendChild(t,r),r}var I=void 0;try{new self.CustomEvent("test");I=self.CustomEvent}catch(t){I=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},I.prototype=self.CustomEvent.prototype}var L={components:{},define:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.components[t.toLowerCase()]={is:t,Ctr:e,config:n}},get:function(t){if(n(t))return this.components[t.toLowerCase()];if(e(t))for(var r in this.components){var i=this.components[r];if(i.Ctr===t)return i}}},B="connectedCallback",R="disconnectedCallback",V="attributeChangedCallback",F=Object.freeze({getComponent:a,isComponent:c,connect:s,disconnect:f,update:l,bind:p,createElement:h,appendChild:d,removeChild:v,insertBefore:y,replaceChild:b,setAttribute:m,removeAttribute:g}),z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},H=(function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,i){var a={key:t,arg:e,resolve:n,reject:i,next:null};u?u=u.next=a:(o=u=a,r(t,e))})}function r(n,o){try{var u=e[n](o),a=u.value;a instanceof t?Promise.resolve(a.value).then(function(t){r("next",t)},function(t){r("throw",t)}):i(u.done?"return":"normal",u.value)}catch(t){i("throw",t)}}function i(t,e){switch(t){case"return":o.resolve({value:e,done:!0});break;case"throw":o.reject(e);break;default:o.resolve({value:e,done:!1})}o=o.next,o?r(o.key,o.arg):u=null}var o,u;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new e(t.apply(this,arguments))}},await:function(e){return new t(e)}}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),q=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),U=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},X=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},G=function(t){return function(t){function e(){return H(this,e),X(this,t.apply(this,arguments))}return U(e,t),e.prototype.connectedCallback=function(){},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},q(e,[{key:"is",get:function(){return this.getAttribute("is")||this.localName}}]),e}(t)},J=Object.defineProperty,Y=function(){function t(e){var n=this;H(this,t),this._=[],e=e||[],o(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),!(null===t||void 0===t||n.validateType(t)&&n.validator(t)))throw new TypeError("Invalid `"+t+"` value for `"+n.name+"` property for `"+n.scope.is+"`.");var e=n.value;e!==t&&(n.value=t,n.changed(t,e))}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){for(var r=0,i=this._.length;r<i;r++){var o=this._[r];n(o)?this.scope[o].call(this.scope,this,t,e):o(this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):(this.attrRequested=!!t,this.attrName=this.name),this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}return!1},t.prototype.init=function(t){this.scope=t,J(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),i(this.defaultValue)||(t[this.name]=this.defaultValue)},t}();J(C,"ANY",{get:function(){return C()}}),J(C,"STRING",{get:function(){return C(String)}}),J(C,"BOOLEAN",{get:function(){return C(Boolean)}}),J(C,"NUMBER",{get:function(){return C(Number)}});var K=function(t){return function(t){function e(){H(this,e);var n=X(this,t.call(this)),r=n.properties;r?(o(r)||(r=[r]),r=r.reduce(function(t,e){for(var n in e)t[n]=C(e[n]);return t},{})):r={},Object.defineProperty(n,"properties",{value:r,writable:!1,configurable:!0});var i=n.constructor.observedAttributes||[],a=function(t){var e=r[t];e.named(t).init(n);var o=e.attrName,a=e.eventName;o||i.indexOf(t)===-1||(e.attribute(),o=t),(o||a)&&e.observe(function(){o&&x(n,o,n[e.name]),a&&u(n,a)})};for(var c in r)a(c);return n}return U(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName;o&&(i(this[r.name])?this.hasAttribute(o)&&(this[r.name]=w(r,this.getAttribute(o))):x(this,o,this[r.name]))}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var u=i[o];if(u.attrName===e)return void(this[u.name]=w(u,r))}},e.prototype.observeProperty=function(t,e){this.properties[t].observe(e)},e.prototype.unobserveProperty=function(t,e){this.properties[t].unobserve(e)},e}(t)},Q=Element.prototype,W=Q.matches||Q.matchesSelector||Q.mozMatchesSelector||Q.msMatchesSelector||Q.oMatchesSelector||Q.webkitMatchesSelector,Z=/([^\s]+)(.*)?/,$=function(t){return function(t){function r(){H(this,r);var i=X(this,t.call(this)),o=i.events||{},u=function(t){var r=n(o[t])?i[o[t]]:o[t];if(!e(r))throw new TypeError("Invalid callback for event.");var u=t.match(Z),a=u[1],c=(u[2]||"").trim();c?i.delegate(a,c,r):i.addEventListener(a,function(t){r.call(i,t,i)})};for(var a in o)u(a);return i}return U(r,t),r.prototype.delegate=function(t,e,n){var r=this;this.addEventListener(t,function(t){for(var i=t.target;i&&i!==r;)W.call(i,e)&&n.call(r,t,i),i=i.parentNode})},r.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return u(this,t,e,n,r)},r}(t)},tt=document,et=function(t){return function(t){function e(){H(this,e);var n=X(this,t.call(this));if(!n.constructor.styleElem){var r=n.constructor;Object.defineProperty(r,"styleElem",{value:k(n.is)})}return n.updateCSS(),n}return U(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.classList.add(this.is)},e.prototype.updateCSS=function(){var t=this.css;n(t)&&(this.constructor.styleElem.textContent=t)},e}(t)},nt=function(t){return function(t){function r(){H(this,r);var e=X(this,t.call(this));if(e.template){var n=e.properties;if(n){var i=function(){e.render()};for(var o in n)n[o].observe(i)}}return e}return U(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.template&&this.render()},r.prototype.render=function(t){if(t=t||this.template,e(t))t();else{if(!n(t))throw new Error("Invalid template property.");this.innerHTML=t}},r}(t)},rt=Array.prototype.reduce||function(t){var e=this,n=e.length,r=0,i=void 0;if(2===arguments.length)i=arguments[1];else{for(;r<n&&!(r in e);)r++;i=e[r++]}for(;r<n;r++)r in e&&(i=t(i,e[r],r,e));return i},it=function(){function t(e){H(this,t),e=e||function(){function t(){H(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){var t=[].slice.call(arguments,0);return rt.call(t,function(t,e){return e(t)},this.superclass)},t}(),ot=function(t){return new it(t)},ut=F,at={ComponentMixin:G,PropertiesMixin:K,EventsMixin:$,StyleMixin:et,TemplateMixin:nt},ct={dispatch:u},st=Object.prototype.hasOwnProperty;N.prototype=Object.create(null);var ft=function(t,e){return st.call(t,e)},lt=function(){return new N},pt=function(t,e,n){var r=new O(e,n);return t.__incrementalDOMData=r,r},ht=function(t){return dt(t),t.__incrementalDOMData},dt=function t(e){if(!e.__incrementalDOMData){var n=e instanceof Element,r=n?e.localName:e.nodeName,i=n?e.getAttribute("key"):null,o=pt(e,r,i);if(i&&(ht(e.parentNode).keyMap[i]=e),n)for(var u=e.attributes,a=o.attrs,c=o.newAttrs,s=o.attrsArr,f=0;f<u.length;f+=1){var l=u[f],p=l.name,h=l.value;a[p]=h,c[p]=void 0,s.push(p),s.push(h)}for(var d=e.firstChild;d;d=d.nextSibling)t(d)}},vt=function(t,e){return"svg"===t?"http://www.w3.org/2000/svg":"foreignObject"===ht(e).nodeName?null:e.namespaceURI},yt=function(t,e,n,r){var i=vt(n,e),o=void 0;return o=i?t.createElementNS(i,n):t.createElement(n),pt(o,n,r),o},bt=function(t){var e=t.createTextNode("");return pt(e,"#text",null),e},mt={nodesCreated:null,nodesDeleted:null};M.prototype.markCreated=function(t){this.created&&this.created.push(t)},M.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},M.prototype.notifyChanges=function(){this.created&&this.created.length>0&&mt.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&mt.nodesDeleted(this.deleted)};var gt=function(t){return t instanceof Document||t instanceof DocumentFragment},Ct=function(t,e){for(var n=[],r=t;r!==e;)n.push(r),r=r.parentNode;return n},wt=function(t){for(var e=t,n=e;e;)n=e,e=e.parentNode;return n},xt=function(t){var e=wt(t);return gt(e)?e.activeElement:null},kt=function(t,e){var n=xt(t);return n&&t.contains(n)?Ct(n,e):[]},Et=function(t,e,n){for(var r=e.nextSibling,i=n;i!==e;){var o=i.nextSibling;t.insertBefore(i,r),i=o}},At=null,Nt=null,Ot=null,Mt=null,_t=function(t,e){for(var n=0;n<t.length;n+=1)ht(t[n]).focused=e},St=function(t){var e=function(e,n,r){var i=At,o=Mt,u=Nt,a=Ot;At=new M,Mt=e.ownerDocument,Ot=e.parentNode;var c=kt(e,Ot);_t(c,!0);var s=t(e,n,r);return _t(c,!1),At.notifyChanges(),At=i,Mt=o,Nt=u,Ot=a,s};return e},jt=St(function(t,e,n){return Nt=t,Lt(),e(n),Vt(),t}),Dt=function(t,e,n){var r=ht(t);return e===r.nodeName&&n==r.key},Tt=function(t,e){if(!Nt||!Dt(Nt,t,e)){var n=ht(Ot),r=Nt&&ht(Nt),i=n.keyMap,o=void 0;if(e){var u=i[e];u&&(Dt(u,t,e)?o=u:u===Nt?At.markDeleted(u):Pt(Ot,u,i))}o||(o="#text"===t?bt(Mt):yt(Mt,Ot,t,e),e&&(i[e]=o),At.markCreated(o)),ht(o).focused?Et(Ot,o,Nt):r&&r.key&&!r.focused?(Ot.replaceChild(o,Nt),n.keyMapValid=!1):Ot.insertBefore(o,Nt),Nt=o}},Pt=function(t,e,n){t.removeChild(e),At.markDeleted(e);var r=ht(e).key;r&&delete n[r]},It=function(){var t=Ot,e=ht(t),n=e.keyMap,r=e.keyMapValid,i=t.lastChild,o=void 0;if(i!==Nt||!r){for(;i!==Nt;)Pt(t,i,n),i=t.lastChild;if(!r){for(o in n)i=n[o],i.parentNode!==t&&(At.markDeleted(i),delete n[o]);e.keyMapValid=!0}}},Lt=function(){Ot=Nt,Nt=null},Bt=function(){return Nt?Nt.nextSibling:Ot.firstChild},Rt=function(){Nt=Bt()},Vt=function(){It(),Nt=Ot,Ot=Ot.parentNode},Ft=function(t,e){return Rt(),Tt(t,e),Lt(),Ot},zt=function(){return Vt(),Nt},Ht=function(){return Rt(),Tt("#text",null),Nt},qt=function(){Nt=Ot.lastChild},Ut={default:"__default"},Xt=function(t){return 0===t.lastIndexOf("xml:",0)?"http://www.w3.org/XML/1998/namespace":0===t.lastIndexOf("xlink:",0)?"http://www.w3.org/1999/xlink":void 0},Gt=function(t,e,n){if(null==n)t.removeAttribute(e);else{var r=Xt(e);r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}},Jt=function(t,e,n){t[e]=n},Yt=function(t,e,n){e.indexOf("-")>=0?t.setProperty(e,n):t[e]=n},Kt=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style,i=n;for(var o in i)ft(i,o)&&Yt(r,o,i[o])}},Qt=function(t,e,n){var r="undefined"==typeof n?"undefined":z(n);"object"===r||"function"===r?Jt(t,e,n):Gt(t,e,n)},Wt=function(t,e,n){var r=ht(t),i=r.attrs;if(i[e]!==n){var o=Zt[e]||Zt[Ut.default];o(t,e,n),i[e]=n}},Zt=lt();Zt[Ut.default]=Qt,Zt.style=Kt;var $t=3,te=[],ee=function(t,e,n,r){var i=Ft(t,e),o=ht(i);if(!o.staticsApplied){if(n)for(var u=0;u<n.length;u+=2){var a=n[u],c=n[u+1];Wt(i,a,c)}o.staticsApplied=!0}for(var s=o.attrsArr,f=o.newAttrs,l=!s.length,p=$t,h=0;p<arguments.length;p+=2,h+=2){var d=arguments[p];if(l)s[h]=d,f[d]=void 0;else if(s[h]!==d)break;var v=arguments[p+1];(l||s[h+1]!==v)&&(s[h+1]=v,Wt(i,d,v))}if(p<arguments.length||h<s.length){for(;p<arguments.length;p+=1,h+=1)s[h]=arguments[p];for(h<s.length&&(s.length=h),p=0;p<s.length;p+=2){var y=s[p],b=s[p+1];f[y]=b}for(var m in f)Wt(i,m,f[m]),f[m]=void 0}return i},ne=function(t,e,n){te[0]=t,te[1]=e,te[2]=n},re=function(t,e){te.push(t),te.push(e)},ie=function(){var t=ee.apply(null,te);return te.length=0,t},oe=function(t){var e=zt();return e},ue=function(t,e){var n=Ht(),r=ht(n);if(r.text!==t){r.text=t;for(var i=t,o=1;o<arguments.length;o+=1){var u=arguments[o];i=u(i)}n.data=i}return n},ae=Object.freeze({h:j,patch:D,text:ue}),ce=function(t){return function(t){function n(){return H(this,n),X(this,t.apply(this,arguments))}return U(n,t),n.prototype.render=function(n){n=n||this.template,e(n)?D(this,n.bind(this)):t.prototype.render.call(this,n)},n}(t)},se=function(t){function e(){return H(this,e),X(this,t.apply(this,arguments))}return U(e,t),e}(ot(A(self.HTMLElement)).with(at.ComponentMixin,at.PropertiesMixin,at.StyleMixin,at.EventsMixin,at.TemplateMixin));at.IDOMTemplateMixin=ce;var fe=function(t){function e(){return H(this,e),X(this,t.apply(this,arguments))}return U(e,t),e}(ot(se).with(ce)),le=mt.nodesCreated,pe=mt.nodesDeleted,he=Zt[Ut.default];mt.nodesCreated=function(t){t.forEach(function(t){ut.isComponent(t)||ut.bind(t)&&ut.connect(t)}),le&&le(t)},mt.nodesDeleted=function(t){t.forEach(function(t){return ut.disconnect(t)}),pe&&pe(t)},Zt[Ut.default]=function(t,e,n){var r=t.getAttribute(e);if(he&&he(t,e,n),ut.isComponent(t)){var i=t.constructor.observedAttributes||[];i.indexOf(e)!==-1&&(n=void 0===n?null:n,ut.update(t,e,r,n))}},t.mix=ot,t.prop=C,t.shim=A,t.HELPERS=ct,t.DOM=ut,t.MIXINS=at,t.IDOM=ae,t.BaseComponent=fe,t.registry=L,t.render=P,t.define=T,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-idom.js.map
