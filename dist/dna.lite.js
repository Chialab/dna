!function(a){function b(a,b,e){return 4===arguments.length?c.apply(this,arguments):void d(a,{declarative:!0,deps:b,declare:e})}function c(a,b,c,e){d(a,{declarative:!1,deps:b,executingRequire:c,execute:e})}function d(a,b){b.name=a,a in n||(n[a]=b),b.normalizedDeps=b.deps}function e(a,b){if(b[a.groupIndex]=b[a.groupIndex]||[],-1==o.call(b[a.groupIndex],a)){b[a.groupIndex].push(a);for(var c=0,d=a.normalizedDeps.length;d>c;c++){var f=a.normalizedDeps[c],g=n[f];if(g&&!g.evaluated){var h=a.groupIndex+(g.declarative!=a.declarative);if(void 0===g.groupIndex||g.groupIndex<h){if(void 0!==g.groupIndex&&(b[g.groupIndex].splice(o.call(b[g.groupIndex],g),1),0==b[g.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");g.groupIndex=h}e(g,b)}}}}function f(a){var b=n[a];b.groupIndex=0;var c=[];e(b,c);for(var d=!!b.declarative==c.length%2,f=c.length-1;f>=0;f--){for(var g=c[f],i=0;i<g.length;i++){var k=g[i];d?h(k):j(k)}d=!d}}function g(a){return s[a]||(s[a]={name:a,dependencies:[],exports:{},importers:[]})}function h(b){if(!b.module){var c=b.module=g(b.name),d=b.module.exports,e=b.declare.call(a,function(a,b){if(c.locked=!0,"object"==typeof a)for(var e in a)d[e]=a[e];else d[a]=b;for(var f=0,g=c.importers.length;g>f;f++){var h=c.importers[f];if(!h.locked)for(var i=0;i<h.dependencies.length;++i)h.dependencies[i]===c&&h.setters[i](d)}return c.locked=!1,b},b.name);c.setters=e.setters,c.execute=e.execute;for(var f=0,i=b.normalizedDeps.length;i>f;f++){var j,k=b.normalizedDeps[f],l=n[k],o=s[k];o?j=o.exports:l&&!l.declarative?j=l.esModule:l?(h(l),o=l.module,j=o.exports):j=m(k),o&&o.importers?(o.importers.push(c),c.dependencies.push(o)):c.dependencies.push(null),c.setters[f]&&c.setters[f](j)}}}function i(a){var b,c=n[a];if(c)c.declarative?l(a,[]):c.evaluated||j(c),b=c.module.exports;else if(b=m(a),!b)throw new Error("Unable to load dependency "+a+".");return(!c||c.declarative)&&b&&b.__useDefault?b["default"]:b}function j(b){if(!b.module){var c={},d=b.module={exports:c,id:b.name};if(!b.executingRequire)for(var e=0,f=b.normalizedDeps.length;f>e;e++){var g=b.normalizedDeps[e],h=n[g];h&&j(h)}b.evaluated=!0;var l=b.execute.call(a,function(a){for(var c=0,d=b.deps.length;d>c;c++)if(b.deps[c]==a)return i(b.normalizedDeps[c]);throw new TypeError("Module "+a+" not declared as a dependency.")},c,d);l&&(d.exports=l),c=d.exports,c&&c.__esModule?b.esModule=c:b.esModule=k(c)}}function k(b){if(b===a)return b;var c={};if("object"==typeof b||"function"==typeof b)if(p){var d;for(var e in b)(d=Object.getOwnPropertyDescriptor(b,e))&&r(c,e,d)}else{var f=b&&b.hasOwnProperty;for(var e in b)(!f||b.hasOwnProperty(e))&&(c[e]=b[e])}return c["default"]=b,r(c,"__useDefault",{value:!0}),c}function l(b,c){var d=n[b];if(d&&!d.evaluated&&d.declarative){c.push(b);for(var e=0,f=d.normalizedDeps.length;f>e;e++){var g=d.normalizedDeps[e];-1==o.call(c,g)&&(n[g]?l(g,c):m(g))}d.evaluated||(d.evaluated=!0,d.module.execute.call(a))}}function m(a){if(u[a])return u[a];if("@node/"==a.substr(0,6))return t(a.substr(6));var b=n[a];if(!b)throw"Module "+a+" not present.";return f(a),l(a,[]),n[a]=void 0,b.declarative&&r(b.module.exports,"__esModule",{value:!0}),u[a]=b.declarative?b.module.exports:b.esModule}var n={},o=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},p=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(q){p=!1}var r;!function(){try{Object.defineProperty({},"a",{})&&(r=Object.defineProperty)}catch(a){r=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(d){}}}}();var s={},t="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,u={"@empty":{}};return function(a,d,e){return function(f){f(function(f){for(var g={_nodeRequire:t,register:b,registerDynamic:c,get:m,set:function(a,b){u[a]=b},newModule:function(a){return a}},h=0;h<d.length;h++)(function(a,b){b&&b.__esModule?u[a]=b:u[a]=k(b)})(d[h],arguments[h]);e(g);var i=m(a[0]);if(a.length>1)for(var h=1;h<a.length;h++)m(a[h]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)(["1","1"],[],function(a){!function(){var b=a;if("undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var c=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");b.set("@@cjs-helpers",b.newModule({getPathVars:function(a){var b,d=a.lastIndexOf("!");b=-1!=d?a.substr(0,d):a;var e=b.split("/");return e.pop(),e=e.join("/"),"file:///"==b.substr(0,8)?(b=b.substr(7),e=e.substr(7),isWindows&&(b=b.substr(1),e=e.substr(1))):c&&b.substr(0,c.length)===c&&(b=b.substr(c.length),e=e.substr(c.length)),{filename:b,dirname:e}}}))}(),a.registerDynamic("2",[],!0,function(a,b,c){"use strict";function d(a){this.listenerMap=[{},{}],a&&this.root(a),this.handle=d.prototype.handle.bind(this)}function e(a,b){return a.toLowerCase()===b.tagName.toLowerCase()}function f(a,b){return this.rootElement===window?b===document:this.rootElement===b}function g(a,b){return a===b.id}c.exports=d,d.prototype.root=function(a){var b,c=this.listenerMap;if(this.rootElement){for(b in c[1])c[1].hasOwnProperty(b)&&this.rootElement.removeEventListener(b,this.handle,!0);for(b in c[0])c[0].hasOwnProperty(b)&&this.rootElement.removeEventListener(b,this.handle,!1)}if(!a||!a.addEventListener)return this.rootElement&&delete this.rootElement,this;this.rootElement=a;for(b in c[1])c[1].hasOwnProperty(b)&&this.rootElement.addEventListener(b,this.handle,!0);for(b in c[0])c[0].hasOwnProperty(b)&&this.rootElement.addEventListener(b,this.handle,!1);return this},d.prototype.captureForType=function(a){return-1!==["blur","error","focus","load","resize","scroll"].indexOf(a)},d.prototype.on=function(a,b,c,d){var i,j,k,l;if(!a)throw new TypeError("Invalid event type: "+a);if("function"==typeof b&&(d=c,c=b,b=null),void 0===d&&(d=this.captureForType(a)),"function"!=typeof c)throw new TypeError("Handler must be a type of Function");return i=this.rootElement,j=this.listenerMap[d?1:0],j[a]||(i&&i.addEventListener(a,this.handle,d),j[a]=[]),b?/^[a-z]+$/i.test(b)?(l=b,k=e):/^#[a-z0-9\-_]+$/i.test(b)?(l=b.slice(1),k=g):(l=b,k=h):(l=null,k=f.bind(this)),j[a].push({selector:b,handler:c,matcher:k,matcherParam:l}),this},d.prototype.off=function(a,b,c,d){var e,f,g,h,i;if("function"==typeof b&&(d=c,c=b,b=null),void 0===d)return this.off(a,b,c,!0),this.off(a,b,c,!1),this;if(g=this.listenerMap[d?1:0],!a){for(i in g)g.hasOwnProperty(i)&&this.off(i,b,c);return this}if(h=g[a],!h||!h.length)return this;for(e=h.length-1;e>=0;e--)f=h[e],b&&b!==f.selector||c&&c!==f.handler||h.splice(e,1);return h.length||(delete g[a],this.rootElement&&this.rootElement.removeEventListener(a,this.handle,d)),this},d.prototype.handle=function(a){var b,c,d,e,f,g,h,i=a.type,j=[],k="ftLabsDelegateIgnore";if(a[k]!==!0){switch(h=a.target,3===h.nodeType&&(h=h.parentNode),d=this.rootElement,e=a.eventPhase||(a.target!==a.currentTarget?3:2)){case 1:j=this.listenerMap[1][i];break;case 2:this.listenerMap[0]&&this.listenerMap[0][i]&&(j=j.concat(this.listenerMap[0][i])),this.listenerMap[1]&&this.listenerMap[1][i]&&(j=j.concat(this.listenerMap[1][i]));break;case 3:j=this.listenerMap[0][i]}for(c=j.length;h&&c;){for(b=0;c>b&&(f=j[b],f);b++)if(f.matcher.call(h,f.matcherParam,h)&&(g=this.fire(a,h,f)),g===!1)return a[k]=!0,void a.preventDefault();if(h===d)break;c=j.length,h=h.parentElement}}},d.prototype.fire=function(a,b,c){return c.handler.call(b,a,b)};var h=function(a){if(a){var b=a.prototype;return b.matches||b.matchesSelector||b.webkitMatchesSelector||b.mozMatchesSelector||b.msMatchesSelector||b.oMatchesSelector}}(Element);return d.prototype.destroy=function(){this.off(),this.root()},c.exports}),a.register("1",["2"],function(a){"use strict";function b(a){return a.replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()}function c(a){return a.replace(/\W+(.)/g,function(a,b){return b.toUpperCase()})}function d(a,b,c){var d=a;"function"!=typeof d&&d.constructor&&(d=d.constructor);var e=f(b),g=d[e]||d.__proto__&&d.__proto__[e];if(g&&Array.isArray(g))for(var h=0,i=g.length;i>h;h++)g[h].apply(a,c)}function e(a,b){if(Array.isArray(b))for(var c=0;c<b.length;c++)e(a,b[c]);else{if(a.__attachedBehaviors=a.__attachedBehaviors||[],-1!==a.__attachedBehaviors.indexOf(b))return;var d=E,g=Object.getOwnPropertyNames(b);for(var h in g){var i=g[h];if(i in z||(a[i]=b[i]),-1!==d.indexOf(i)){var j=f(i);a[j]=a[j]||[],a[j].push(b[i])}else i in z||(a[i]=b[i])}if(b.prototype){g=Object.getOwnPropertyNames(b.prototype);for(var h in g){var i=g[h];if(-1!==d.indexOf(i)){var j=f(i);a[j]=a[j]||[],a[j].push(b.prototype[i])}else i in z.prototype||(a.prototype[i]=b.prototype[i])}}a.__attachedBehaviors.push(b)}}function f(a){return"__"+a+"Callbacks"}function g(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=arguments.length<=2||void 0===arguments[2]?[]:arguments[2];Object.getOwnPropertyNames(b).forEach(function(d){if("function"!=typeof b[d]&&-1==c.indexOf(d)){c.push(d);var e=Object.getOwnPropertyDescriptor(b,d)||{};Object.defineProperty(a,d,{configurable:!0,get:x.wrapDescriptorGet(d,e),set:x.wrapDescriptorSet(d,e,function(){this.updateViewContent()})})}});var d=b.prototype||b.__proto__;d&&d!==HTMLElement.prototype&&g(a,d,c)}function h(a){var b={};return Array.prototype.forEach.call(a.attributes||[],function(a){b[a.name]=a.value}),b}function i(a){return a.nodeType===Node.TEXT_NODE?new G.VText(a.textContent):new G.VNode(a.tagName,{attributes:h(a)},Array.prototype.map.call(a.childNodes||[],i))}function j(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if("string"!=typeof a)throw"Missing or bad typed `tagName` property";var c=b.prototype;if("undefined"==typeof c)throw"Missing prototype";if("function"!=typeof c){var d=function(){};d.prototype=c,c=d}var e=J(c,I);for(var f in c.prototype)-1!==["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"].indexOf(f)&&(e.prototype[f]=n(e.prototype[f],I.prototype[f]));Object.defineProperty(e,"tagName",{configurable:!0,get:function(){return a}}),b.tagName=a;var g=q(e,b);return g.Extend=function(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],b="function"==typeof a?a:function(a){var b=function(){};return b.prototype=a,b}(a);return J(b,c)},g}function k(a){function b(b){if(-1===d.indexOf(b)){var c={key:b};if("function"==typeof a[b])c.value=a[b];else{var e=Object.getOwnPropertyDescriptor(a,b)||{};e.get?(c.get=e.get,c.set=e.set):c.value=a[b]}return d.push(b),c}}var c=[],d=["name","length","prototype"];for(var e in a){var f=b(e);f&&c.push(f)}var g=Object.getOwnPropertyNames(a);for(var h in g){var f=b(g[h]);f&&c.push(f)}return c}function l(a,b){for(var c=["arguments","caller"],d=0;d<b.length;d++){var e=b[d];-1===c.indexOf(e.key)&&(e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(a,e.key,e))}}function m(a,b,c){return b&&l(a.prototype,b),c&&l(a,c),a}function n(a,b){return function(){a.apply(this,arguments),b.apply(this,arguments)}}function o(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function p(a,b,c){null===a&&(a=Function.prototype);var d=Object.getOwnPropertyDescriptor(a,b);if(void 0===d){var e=Object.getPrototypeOf(a);return null===e?void 0:get(e,b,c)}if("value"in d)return d.value;var f=d.get;if(void 0!==f)return f.call(c)}function q(){return x.register.apply(x,arguments)}var r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K;return{setters:[function(a){r=a["default"]}],execute:function(){s=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},t=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),u=function(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b},v=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)},w=function h(){s(this,h)},w.useWebComponents="undefined"!=typeof window&&("undefined"!=typeof window.WebComponents||"undefined"!=typeof window.CustomElements),w.useVirtualDOM="undefined"!=typeof window&&"undefined"!=typeof window.virtualDom,w.autoUpdateView=!0,x=function(){function a(){s(this,a)}return t(a,null,[{key:"register",value:function(b){var c=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],d=void 0,e=void 0;"string"==typeof b&&(d=b,"function"==typeof c?(b=c,c={}):"undefined"!=typeof c.prototype&&(b=c.prototype)),"function"==typeof b?(d=d||c.tagName||b.hasOwnProperty("tagName")&&b.tagName||a.classToElement(b),Object.defineProperty(b,"tagName",{get:function(){return d}}),"function"==typeof b.onRegister&&b.onRegister.call(b),c.prototype=b.prototype,c["extends"]||"string"!=typeof b["extends"]||(c["extends"]=b["extends"])):(c.prototype=b,b=function(){c.prototype.constructor.apply(this,arguments)},b.prototype=c.prototype);try{return b.prototype.is=d,e=w.useWebComponents?document.registerElement(d,c):function(){var a=document.createElement(d);return Object.setPrototypeOf(a,b.prototype),setTimeout(function(){a.createdCallback()},0),a},e.prototype.is=d,"function"==typeof b&&(e.prototype.constructor=b),e}catch(f){return console.error(f),!1}}},{key:"classToElement",value:function(a){var b=a.name||a.toString().match(/^function\s*([^\s(]+)/)[1];if(b)return a.name.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}).replace(/^\-/,"")}},{key:"elementToClass",value:function(a){return a.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,function(a,b){return 0===+a?"":a.toUpperCase()}).replace(/[\-|\_]/g,"")}},{key:"getDescriptor",value:function(b,c){var d=void 0;return b&&(d=Object.getOwnPropertyDescriptor(b,c),!d&&b.__proto__&&(d=a.getDescriptor(b.__proto__,c))),d}},{key:"wrapDescriptorGet",value:function(a,b){return function(){var c=void 0;if("function"==typeof b.get)try{c=b.get.call(this)}catch(d){c=this["__"+a]}else c=this["__"+a];return c}}},{key:"wrapDescriptorSet",value:function(a,b,c){if(b&&b.set&&b.set.wrapped)return b.set;var d=function(d){if(b.set)try{b.set.call(this,d)}catch(e){this["__"+a]=d}else this["__"+a]=d;var f=this[a];return"function"==typeof c&&c.call(this,a,f),f};return d.wrapped=!0,d}}]),a}(),"function"!=typeof HTMLElement&&(y=function(){},y.prototype=HTMLElement.prototype,HTMLElement=y),z=function(a){function b(){return s(this,b),u(this,Object.getPrototypeOf(b).apply(this,arguments))}return v(b,a),t(b,[{key:"createdCallback",value:function(){}},{key:"attachedCallback",value:function(){}},{key:"detachedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(a,b,c){}}],[{key:"onRegister",value:function(){}},{key:"tagName",get:function(){return this._tagName||x.classToElement(this)},set:function(a){"string"==typeof a&&(this._tagName=a)}}]),b}(HTMLElement),A=function l(a,b,c){null===a&&(a=Function.prototype);var d=Object.getOwnPropertyDescriptor(a,b);if(void 0===d){var e=Object.getPrototypeOf(a);return null===e?void 0:l(e,b,c)}if("value"in d)return d.value;var f=d.get;if(void 0!==f)return f.call(c)},B=function(a){function d(){return s(this,d),u(this,Object.getPrototypeOf(d).apply(this,arguments))}return v(d,a),t(d,[{key:"createdCallback",value:function(){var a=this;A(Object.getPrototypeOf(d.prototype),"createdCallback",this).call(this);for(var c=this.attributes||[],e=0,f=c.length;f>e;e++){var g=c[e];""!=g.value?this.attributeChangedCallback(g.name,void 0,g.value):null!==this.getAttribute(g.name)&&this.attributeChangedCallback(g.name,void 0,!0)}var h=this.constructor.normalizedAttributes||[];h.forEach(function(c){null!==a[c]&&void 0!==a[c]&&a[c]!==!1&&a.setAttribute(b(c),a[c])})}},{key:"attributeChangedCallback",value:function(a,b,e){A(Object.getPrototypeOf(d.prototype),"attributeChangedCallback",this).call(this,a,b,e);var f=this.constructor;f&&f.normalizedAttributes&&Array.isArray(f.normalizedAttributes)&&(a=c(a),-1!==f.normalizedAttributes.indexOf(a)&&(this[a]=e))}}],[{key:"onRegister",value:function(){var a=this,d=this.attributes||[];this.normalizedAttributes=d.map(function(d){d=c(d);var e=x.getDescriptor(a.prototype,d)||{};return Object.defineProperty(a.prototype,d,{configurable:!0,get:x.wrapDescriptorGet(d,e),set:x.wrapDescriptorSet(d,e,function(a,c){var d=b(a);null!==c&&void 0!==c&&c!==!1?"string"!=typeof c&&"number"!=typeof c||this.getAttribute(a)===c?"boolean"==typeof c&&this.setAttribute(d,d):this.setAttribute(d,c):this.getAttribute(d)&&this.removeAttribute(d)})}),d})}}]),d}(z),C=function(a){function b(){return s(this,b),u(this,Object.getPrototypeOf(b).apply(this,arguments))}return v(b,a),t(b,[{key:"createdCallback",value:function(){var a=this,c=this.constructor.events||this.constructor.bindEvents;if(c){var d=new r(this);for(var e in c){var f="string"==typeof c[e]?this[c[e]]:c[e];f&&"function"==typeof f&&!function(){var b=e.split(" ").shift(),c=e.split(" ").slice(1).join(" "),g=f.bind(a);c?d.on(b,c,function(a){g(a,this)}):d.on(b,function(a){g(a,this)})}()}}A(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this)}},{key:"addEventListener",value:function(a,b){return"undefined"!=typeof Node.prototype.addEventListener?Node.prototype.addEventListener.call(this,a,b):"undefined"!=typeof Node.prototype.attachEvent?Node.prototype.attachEvent.call(this,"on"+a,b):void 0}},{key:"trigger",value:function(a,c){var d=arguments.length<=2||void 0===arguments[2]?!0:arguments[2],e=arguments.length<=3||void 0===arguments[3]?!0:arguments[3],f=b.createEvent();if(f){if("undefined"!=typeof f.initEvent&&f.initEvent(a,d,e),f.detail=c,"undefined"!=typeof Node.prototype.dispatchEvent)return Node.prototype.dispatchEvent.call(this,f);if("undefined"!=typeof Node.prototype.fireEvent)return Node.prototype.fireEvent.call(this,"on"+a,f)}}}],[{key:"createEvent",value:function(){var a=arguments.length<=0||void 0===arguments[0]?"Event":arguments[0];return"undefined"!=typeof document.createEvent?document.createEvent(a):"undefined"!=typeof document.createEventObject?document.createEventObject():void 0}}]),b}(z),D=function(a){function b(){return s(this,b),u(this,Object.getPrototypeOf(b).apply(this,arguments))}return v(b,a),t(b,[{key:"createdCallback",value:function(){A(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this),d(this,"createdCallback")}},{key:"attachedCallback",value:function(){A(Object.getPrototypeOf(b.prototype),"attachedCallback",this).call(this),d(this,"attachedCallback")}},{key:"detachedCallback",value:function(){A(Object.getPrototypeOf(b.prototype),"detachedCallback",this).call(this),d(this,"detachedCallback")}},{key:"attributeChangedCallback",value:function(a,c,e){A(Object.getPrototypeOf(b.prototype),"attributeChangedCallback",this).call(this,a,c,e),d(this,"attributeChangedCallback",[a,c,e])}}],[{key:"onRegister",value:function(){for(var a,c=this,g=this,h=arguments.length,i=Array(h),j=0;h>j;j++)i[j]=arguments[j];(a=A(Object.getPrototypeOf(b),"onRegister",this)).call.apply(a,[this].concat(i)),E.forEach(function(a){var b=f(a);c[b]=[]});var k=this.behaviors||[];return e(this,k),d(this,"onRegister",i),delete this.__attachedBehaviors,g}}]),b}(z),E=["onRegister","createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"],F=function(a){function b(){return s(this,b),u(this,Object.getPrototypeOf(b).apply(this,arguments))}return v(b,a),t(b,[{key:"createdCallback",value:function(){A(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this),this.is&&this.classList.add(this.is)}}],[{key:"onRegister",value:function(){this.css&&this.addCss(this.css)}},{key:"addCss",value:function(a){"function"==typeof a&&(a=a());var b="style-"+this.tagName,c=document.getElementById(b)||document.createElement("style");if(c.type="text/css",c.setAttribute("id",b),c.styleSheet?c.styleSheet.cssText=a:(c.innerHTML="",c.appendChild(document.createTextNode(a))),!c.parentNode){var d=document.head||document.getElementsByTagName("head")[0];d.firstElementChild?d.insertBefore(c,d.firstElementChild):d.appendChild(c)}return c}}]),b}(z),G=window.virtualDom,H=function(a){function b(){return s(this,b),u(this,Object.getPrototypeOf(b).apply(this,arguments))}return v(b,a),t(b,[{key:"createdCallback",value:function(){this.updateViewContent(),A(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this)}},{key:"updateViewContent",value:function(){if("function"==typeof this.render){var a=this.render(),b=a;if(a instanceof NodeList){b="";for(var c=0,d=a.length;d>c;c++)b+=a[c].outerHTML}else a instanceof Node&&(b=a.outerHTML);if(b=b.replace(/[\n\r\t]/g,"").replace(/\s+/g," "),w.useVirtualDOM){var e=document.createElement("div");e.innerHTML=b;var f=i(e);if(this._vtree){var g=G.diff(this._vtree,f);G.patch(this,g)}else this.innerHTML=b;this._vtree=f}else this.innerHTML=b}}}],[{key:"onRegister",value:function(){var a=this,b=this;if(this.template){b.prototype.render=function(a){return"function"==typeof a?function(){return a.call(this)}:"string"==typeof a?function(){return a}:a instanceof Node&&"TEMPLATE"==a.tagName?function(){return document.importNode(a.content,!0)}:void 0}(b.template);var c=this.properties||[];c.forEach(function(b){var c=x.getDescriptor(a.prototype,b)||{};Object.defineProperty(a.prototype,b,{configurable:!0,get:x.wrapDescriptorGet(b,c),set:x.wrapDescriptorSet(b,c)})}),w.autoUpdateView&&g(this.prototype||this.__proto__,this.prototype||this.__proto__)}}}]),b}(z),I=function(a){function b(){return s(this,b),u(this,Object.getPrototypeOf(b).apply(this,arguments))}return v(b,a),t(b,null,[{key:"behaviors",get:function(){return[F,C,B,H]}}]),b}(D),J=function(a,b){var c=function f(){p(Object.getPrototypeOf(f.prototype),"constructor",a).apply(a,arguments)};o(c,b);for(var d in b.prototype){var e=Object.getOwnPropertyDescriptor(b.prototype,d)||{};e.get&&Object.defineProperty(c.prototype,d,{get:e.get,set:e.set,configurable:!0})}return m(c,k(a.prototype),k(a))},K='0.15.0',a("Version",K),a("Config",w),a("DNAComponent",z),a("DNAAttributesComponent",B),a("DNAEventsComponent",C),a("DNAMixedComponent",D),a("DNAStyleComponent",F),a("DNATemplateComponent",H),a("DNABaseComponent",I),a("Create",j),a("Register",q)}}})})(function(a){"function"==typeof define&&define.amd?define([],a):"object"==typeof module&&module.exports&&"function"==typeof require?module.exports=a():DNA=a()});