"format global";"exports DNAComponents";!function(a){var b=a.babelHelpers={};b.inherits=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)},b.defaults=function(a,b){for(var c=Object.getOwnPropertyNames(b),d=0;d<c.length;d++){var e=c[d],f=Object.getOwnPropertyDescriptor(b,e);f&&f.configurable&&void 0===a[e]&&Object.defineProperty(a,e,f)}return a},b.createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),b.createDecoratedClass=function(){function a(a,b,c){for(var d=0;d<b.length;d++){var e=b[d],f=e.decorators,g=e.key;if(delete e.key,delete e.decorators,e.enumerable=e.enumerable||!1,e.configurable=!0,("value"in e||e.initializer)&&(e.writable=!0),f){for(var h=0;h<f.length;h++){var i=f[h];if("function"!=typeof i)throw new TypeError("The decorator for method "+e.key+" is of the invalid type "+typeof i);e=i(a,g,e)||e}if(void 0!==e.initializer){c[g]=e;continue}}Object.defineProperty(a,g,e)}}return function(b,c,d,e,f){return c&&a(b.prototype,c,e),d&&a(b,d,f),b}}(),b.createDecoratedObject=function(a){for(var b={},c=0;c<a.length;c++){var d=a[c],e=d.decorators,f=d.key;if(delete d.key,delete d.decorators,d.enumerable=!0,d.configurable=!0,("value"in d||d.initializer)&&(d.writable=!0),e)for(var g=0;g<e.length;g++){var h=e[g];if("function"!=typeof h)throw new TypeError("The decorator for method "+d.key+" is of the invalid type "+typeof h);d=h(b,f,d)||d}d.initializer&&(d.value=d.initializer.call(b)),Object.defineProperty(b,f,d)}return b},b.defineDecoratedPropertyDescriptor=function(a,b,c){var d=c[b];if(d){var e={};for(var f in d)e[f]=d[f];e.value=e.initializer?e.initializer.call(a):void 0,Object.defineProperty(a,b,e)}},b.taggedTemplateLiteral=function(a,b){return Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(b)}}))},b.taggedTemplateLiteralLoose=function(a,b){return a.raw=b,a},b.toArray=function(a){return Array.isArray(a)?a:Array.from(a)},b.toConsumableArray=function(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)},b.slicedToArray=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),b.slicedToArrayLoose=function(a,b){if(Array.isArray(a))return a;if(Symbol.iterator in Object(a)){for(var c,d=[],e=a[Symbol.iterator]();!(c=e.next()).done&&(d.push(c.value),!b||d.length!==b););return d}throw new TypeError("Invalid attempt to destructure non-iterable instance")},b.objectWithoutProperties=function(a,b){var c={};for(var d in a)b.indexOf(d)>=0||Object.prototype.hasOwnProperty.call(a,d)&&(c[d]=a[d]);return c},b.hasOwn=Object.prototype.hasOwnProperty,b.slice=Array.prototype.slice,b.bind=Function.prototype.bind,b.defineProperty=function(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a},b.asyncToGenerator=function(a){return function(){var b=a.apply(this,arguments);return new Promise(function(a,c){function d(d,g){try{var h=b[d](g),i=h.value}catch(j){return void c(j)}h.done?a(i):Promise.resolve(i).then(e,f)}var e=d.bind(null,"next"),f=d.bind(null,"throw");e()})}},b.interopExportWildcard=function(a,b){var c=b({},a);return delete c["default"],c},b.interopRequireWildcard=function(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b},b.interopRequireDefault=function(a){return a&&a.__esModule?a:{"default":a}},b._typeof=function(a){return a&&a.constructor===Symbol?"symbol":typeof a},b._extends=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a},b.get=function c(a,b,d){null===a&&(a=Function.prototype);var e=Object.getOwnPropertyDescriptor(a,b);if(void 0===e){var f=Object.getPrototypeOf(a);return null===f?void 0:c(f,b,d)}if("value"in e)return e.value;var g=e.get;if(void 0!==g)return g.call(d)},b.set=function d(a,b,c,e){var f=Object.getOwnPropertyDescriptor(a,b);if(void 0===f){var g=Object.getPrototypeOf(a);null!==g&&d(g,b,c,e)}else if("value"in f&&f.writable)f.value=c;else{var h=f.set;void 0!==h&&h.call(e,c)}return c},b.newArrowCheck=function(a,b){if(a!==b)throw new TypeError("Cannot instantiate an arrow function")},b.classCallCheck=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},b.objectDestructuringEmpty=function(a){if(null==a)throw new TypeError("Cannot destructure undefined")},b.temporalUndefined={},b.temporalAssertDefined=function(a,b,c){if(a===c)throw new ReferenceError(b+" is not defined - temporal dead zone");return!0},b.selfGlobal="undefined"==typeof a?self:a,b.typeofReactElement="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103,b.defaultProps=function(a,b){if(a)for(var c in a)"undefined"==typeof b[c]&&(b[c]=a[c]);return b},b._instanceof=function(a,b){return null!=b&&b[Symbol.hasInstance]?b[Symbol.hasInstance](a):a instanceof b},b.interopRequire=function(a){return a&&a.__esModule?a["default"]:a}}("undefined"==typeof global?self:global),function(a){function b(a,b,e){return 4===arguments.length?c.apply(this,arguments):void d(a,{declarative:!0,deps:b,declare:e})}function c(a,b,c,e){d(a,{declarative:!1,deps:b,executingRequire:c,execute:e})}function d(a,b){b.name=a,a in m||(m[a]=b),b.normalizedDeps=b.deps}function e(a,b){if(b[a.groupIndex]=b[a.groupIndex]||[],-1==n.call(b[a.groupIndex],a)){b[a.groupIndex].push(a);for(var c=0,d=a.normalizedDeps.length;d>c;c++){var f=a.normalizedDeps[c],g=m[f];if(g&&!g.evaluated){var h=a.groupIndex+(g.declarative!=a.declarative);if(void 0===g.groupIndex||g.groupIndex<h){if(void 0!==g.groupIndex&&(b[g.groupIndex].splice(n.call(b[g.groupIndex],g),1),0==b[g.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");g.groupIndex=h}e(g,b)}}}}function f(a){var b=m[a];b.groupIndex=0;var c=[];e(b,c);for(var d=!!b.declarative==c.length%2,f=c.length-1;f>=0;f--){for(var g=c[f],i=0;i<g.length;i++){var k=g[i];d?h(k):j(k)}d=!d}}function g(a){return r[a]||(r[a]={name:a,dependencies:[],exports:{},importers:[]})}function h(b){if(!b.module){var c=b.module=g(b.name),d=b.module.exports,e=b.declare.call(a,function(a,b){if(c.locked=!0,"object"==typeof a)for(var e in a)d[e]=a[e];else d[a]=b;for(var f=0,g=c.importers.length;g>f;f++){var h=c.importers[f];if(!h.locked)for(var i=0;i<h.dependencies.length;++i)h.dependencies[i]===c&&h.setters[i](d)}return c.locked=!1,b});c.setters=e.setters,c.execute=e.execute;for(var f=0,i=b.normalizedDeps.length;i>f;f++){var j,k=b.normalizedDeps[f],n=m[k],o=r[k];o?j=o.exports:n&&!n.declarative?j=n.esModule:n?(h(n),o=n.module,j=o.exports):j=l(k),o&&o.importers?(o.importers.push(c),c.dependencies.push(o)):c.dependencies.push(null),c.setters[f]&&c.setters[f](j)}}}function i(a){var b,c=m[a];if(c)c.declarative?k(a,[]):c.evaluated||j(c),b=c.module.exports;else if(b=l(a),!b)throw new Error("Unable to load dependency "+a+".");return(!c||c.declarative)&&b&&b.__useDefault?b["default"]:b}function j(b){if(!b.module){var c={},d=b.module={exports:c,id:b.name};if(!b.executingRequire)for(var e=0,f=b.normalizedDeps.length;f>e;e++){var g=b.normalizedDeps[e],h=m[g];h&&j(h)}b.evaluated=!0;var k=b.execute.call(a,function(a){for(var c=0,d=b.deps.length;d>c;c++)if(b.deps[c]==a)return i(b.normalizedDeps[c]);throw new TypeError("Module "+a+" not declared as a dependency.")},c,d);if(k&&(d.exports=k),c=d.exports,c&&c.__esModule)b.esModule=c;else{if(b.esModule={},("object"==typeof c||"function"==typeof c)&&c!==a)if(o){var l;for(var n in c)(l=Object.getOwnPropertyDescriptor(c,n))&&q(b.esModule,n,l)}else{var p=c&&c.hasOwnProperty;for(var n in c)(!p||c.hasOwnProperty(n))&&(b.esModule[n]=c[n])}b.esModule["default"]=c,q(b.esModule,"__useDefault",{value:!0})}}}function k(b,c){var d=m[b];if(d&&!d.evaluated&&d.declarative){c.push(b);for(var e=0,f=d.normalizedDeps.length;f>e;e++){var g=d.normalizedDeps[e];-1==n.call(c,g)&&(m[g]?k(g,c):l(g))}d.evaluated||(d.evaluated=!0,d.module.execute.call(a))}}function l(a){if(s[a])return s[a];if("@node/"==a.substr(0,6))return require(a.substr(6));var b=m[a];if(!b)throw"Module "+a+" not present.";return f(a),k(a,[]),m[a]=void 0,b.declarative&&q(b.module.exports,"__esModule",{value:!0}),s[a]=b.declarative?b.module.exports:b.esModule}var m={},n=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},o=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(p){o=!1}var q;!function(){try{Object.defineProperty({},"a",{})&&(q=Object.defineProperty)}catch(a){q=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(d){}}}}();var r={},s={};return function(a,d,e){return function(f){f(function(f){var g={_nodeRequire:"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,register:b,registerDynamic:c,get:l,set:function(a,b){s[a]=b},newModule:function(a){return a}};g.set("@empty",{});for(var h=0;h<d.length;h++)(function(a,b){b&&b.__esModule?g.register(a,[],function(a){return{setters:[],execute:function(){for(var c in b)"__esModule"==c||"object"==typeof c&&c+""=="Module"||a(c,b[c])}}}):g.registerDynamic(a,[],!1,function(){return b})})(d[h],arguments[h]);e(g);var i=l(a[0]);if(a.length>1)for(var h=1;h<a.length;h++)l(a[h]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)(["1"],[],function(a){!function(b){function c(a,b){for(var c=a.split(".");c.length;)b=b[c.shift()];return b}function d(a){if(Object.keys)Object.keys(b).forEach(a);else for(var c in b)h.call(b,c)&&a(c)}function e(a){d(function(c){if(-1==i.call(j,c)){try{var d=b[c]}catch(e){j.push(c)}a(c,d)}})}var f,g=a,h=Object.prototype.hasOwnProperty,i=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},j=["_g","sessionStorage","localStorage","clipboardData","frames","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB"];g.set("@@global-helpers",g.newModule({prepareGlobal:function(a,d,g){var h=b.define;b.define=void 0,b.exports=void 0,b.module&&b.module.exports&&(b.module=void 0);var i;if(g){i={};for(var j in g)i[j]=g[j],b[j]=g[j]}return d||(f={},e(function(a,b){f[a]=b})),function(){var a;if(d)a=c(d,b);else{var g,j,k={};e(function(a,b){f[a]!==b&&"undefined"!=typeof b&&(k[a]=b,"undefined"!=typeof g?j||g===b||(j=!0):g=b)}),a=j?k:g}if(i)for(var l in i)b[l]=i[l];return b.define=h,a}}}))}("undefined"!=typeof self?self:global),a.register("2",["3","4"],function(a){"use strict";function b(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if("string"!=typeof a)throw"Missing or bad typed `tagName` property";var c=b.prototype;if("undefined"==typeof c)throw"Missing prototype";if("function"!=typeof c){var g=function(){};g.prototype=c,c=g}var i=d(c,h);for(var j in c.prototype)-1!==["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"].indexOf(j)&&(i.prototype[j]=e(i.prototype[j],h.prototype[j]));Object.defineProperty(i,"tagName",{configurable:!0,get:function(){return a}}),b.tagName=a;var k=f(i,b);return k.Extend=function(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],b="function"==typeof a?a:function(a){var b=function(){};return b.prototype=a,b}(a);return d(b,c)},k}function c(a){function b(b){if(-1===d.indexOf(b)){var c={key:b};if("function"==typeof a[b])c.value=a[b];else{var e=Object.getOwnPropertyDescriptor(a,b)||{};e.get?(c.get=e.get,c.set=e.set):c.value=a[b]}return d.push(b),c}}var c=[],d=["name","length","prototype"];for(var e in a){var f=b(e);f&&c.push(f)}var g=Object.getOwnPropertyNames(a);for(var h in g){var f=b(g[h]);f&&c.push(f)}return c}function d(a,b){function d(){babelHelpers.get(Object.getPrototypeOf(d.prototype),"constructor",a).apply(a,arguments)}babelHelpers.inherits(d,b);for(var e in b.prototype){var f=Object.getOwnPropertyDescriptor(b.prototype,e)||{};f.get&&Object.defineProperty(d.prototype,e,{get:f.get,set:f.set,configurable:!0})}return babelHelpers.createClass(d,c(a.prototype),c(a))}function e(a,b){return function(){a.apply(this,arguments),b.apply(this,arguments)}}function f(){return g.register.apply(g,arguments)}var g,h;return a("Create",b),a("Register",f),{setters:[function(a){g=a.DNAHelper},function(a){h=a.DNABaseComponent}],execute:function(){}}}),a.register("4",["5","6","7","8","9"],function(a){"use strict";var b,c,d,e,f,g;return{setters:[function(a){b=a.DNAMixedComponent},function(a){c=a.DNAEventComponent},function(a){d=a.DNATemplateComponent},function(a){e=a.DNAStyleComponent},function(a){f=a.DNAAttributesComponent}],execute:function(){g=function(a){function g(){babelHelpers.classCallCheck(this,g),babelHelpers.get(Object.getPrototypeOf(g.prototype),"constructor",this).apply(this,arguments)}return babelHelpers.inherits(g,a),babelHelpers.createClass(g,[{key:"createdCallback",value:function(){b.prototype.createdCallback.call(this),this.is&&this.classList.add(this.is)}}],[{key:"behaviors",get:function(){return[e,c,f,d]}}]),g}(b),a("DNABaseComponent",g)}}}),a.registerDynamic("a",[],!0,function(a,b,c){var d=this,e=d.define;return d.define=void 0,c.exports=window.virtualDom,d.define=e,c.exports}),a.register("7",["b","c","a"],function(a){"use strict";function b(a){var b={};return Array.prototype.forEach.call(a.attributes||[],function(a){b["class"===a.name?"className":a.name]=a.value}),b}function c(a){return a.nodeType===Node.TEXT_NODE?new f.VText(a.textContent):new f.VNode(a.tagName,b(a),Array.prototype.map.call(a.childNodes||[],c))}var d,e,f,g;return{setters:[function(a){d=a.DNAConfig},function(a){e=a.DNAComponent},function(a){f=a["default"]}],execute:function(){g=function(a){function b(){babelHelpers.classCallCheck(this,b),babelHelpers.get(Object.getPrototypeOf(b.prototype),"constructor",this).apply(this,arguments)}return babelHelpers.inherits(b,a),babelHelpers.createClass(b,[{key:"createdCallback",value:function(){this.updateViewContent(),e.prototype.createdCallback.call(this)}},{key:"updateViewContent",value:function(){if("function"==typeof this.render){var a=this.render(),b=a;if(a instanceof NodeList){b="";for(var e=0,g=a.length;g>e;e++)b+=a[e].outerHTML}else a instanceof Node&&(b=a.outerHTML);if(b=b.replace(/[\n\r\t]/g,"").replace(/\s+/g," "),d.useVirtualDOM){var h=document.createElement("div");h.innerHTML=b;var i=c(h);if(this._vtree){var j=f.diff(this._vtree,i);f.patch(this,j)}else this.innerHTML=b;this._vtree=i}else this.innerHTML=b}}}],[{key:"onRegister",value:function(){var a=this,b=this;this.template&&("function"==typeof b.template?b.prototype.render=function(){return b.template.call(this)}:"string"==typeof b.template?!function(){var c=b.template;b.prototype.render=function(a){return function(){return c}}(a)}():b.template instanceof Node&&"TEMPLATE"==b.template.tagName&&(b.prototype.render=function(){return document.importNode(b.template.content,!0)}),d.autoUpdateView&&!function(){var b=a.prototype;Object.getOwnPropertyNames(b).forEach(function(c){"function"!=typeof b[c]&&!function(){var d=Object.getOwnPropertyDescriptor(b,c)||{};Object.defineProperty(a.prototype,c,{configurable:!0,get:function(){return d.get?d.get.call(this):this["__"+c]},set:function(a){var b=void 0;return b=d.set?d.set.call(this,a):this["__"+c]=a,this.updateViewContent(),b}})}()})}())}}]),b}(e),a("DNATemplateComponent",g)}}}),a.register("8",["c"],function(a){"use strict";var b,c;return{setters:[function(a){b=a.DNAComponent}],execute:function(){c=function(a){function b(){babelHelpers.classCallCheck(this,b),babelHelpers.get(Object.getPrototypeOf(b.prototype),"constructor",this).apply(this,arguments)}return babelHelpers.inherits(b,a),babelHelpers.createClass(b,null,[{key:"onRegister",value:function(){this.css&&this.addCss(this.css)}},{key:"addCss",value:function(a){"function"==typeof a&&(a=a());var b="style-"+this.tagName,c=document.getElementById(b)||document.createElement("style");if(c.type="text/css",c.setAttribute("id",b),c.styleSheet?c.styleSheet.cssText=a:(c.innerHTML="",c.appendChild(document.createTextNode(a))),!c.parentNode){var d=document.head||document.getElementsByTagName("head")[0];d.firstElementChild?d.insertBefore(c,d.firstElementChild):d.appendChild(c)}return c}}]),b}(b),a("DNAStyleComponent",c)}}}),a.register("5",["c"],function(a){"use strict";var b,c;return{setters:[function(a){b=a.DNAComponent}],execute:function(){c=function(a){function c(){babelHelpers.classCallCheck(this,c),babelHelpers.get(Object.getPrototypeOf(c.prototype),"constructor",this).apply(this,arguments)}return babelHelpers.inherits(c,a),babelHelpers.createClass(c,[{key:"createdCallback",value:function(){for(var a=arguments.length,d=Array(a),e=0;a>e;e++)d[e]=arguments[e];b.prototype.createdCallback.apply(this,d),c.__triggerCallbacks(this,"createdCallback",d)}},{key:"attachedCallback",value:function(){for(var a=arguments.length,d=Array(a),e=0;a>e;e++)d[e]=arguments[e];b.prototype.attachedCallback.apply(this,d),c.__triggerCallbacks(this,"attachedCallback",d)}},{key:"detachedCallback",value:function(){for(var a=arguments.length,d=Array(a),e=0;a>e;e++)d[e]=arguments[e];b.prototype.detachedCallback.apply(this,d),c.__triggerCallbacks(this,"detachedCallback",d)}},{key:"attributeChangedCallback",value:function(a,d,e){b.prototype.attributeChangedCallback.apply(this,[a,d,e]),c.__triggerCallbacks(this,"attributeChangedCallback",[a,d,e])}}],[{key:"onRegister",value:function(){for(var a=arguments.length,d=Array(a),e=0;a>e;e++)d[e]=arguments[e];var f=b.onRegister.apply(this,d),g=this.behaviors||[];return c.__iterateBehaviors(this,g),c.__triggerCallbacks(this,"onRegister",d),delete this.__attachedBehaviors,f}},{key:"__triggerCallbacks",value:function(a,b,d){var e=a;"function"!=typeof e&&e.constructor&&(e=e.constructor);var f=c.__getCallbackKey(b),g=e[f]||e.__proto__&&e.__proto__[f];if(g&&Array.isArray(g))for(var h=0,i=g.length;i>h;h++)g[h].apply(a,d)}},{key:"__iterateBehaviors",value:function(a,d){if(Array.isArray(d))for(var e=0;e<d.length;e++)a.__iterateBehaviors(a,d[e]);else{if(a.__attachedBehaviors=a.__attachedBehaviors||[],-1!==a.__attachedBehaviors.indexOf(d))return;var f=c.__componentCallbacks,g=Object.getOwnPropertyNames(d);for(var h in g){var i=g[h];if(i in b||"__componentCallbacks"!==i&&(a[i]=d[i]),-1!==f.indexOf(i)){var j=c.__getCallbackKey(i);a[j]=a[j]||[],a[j].push(d[i])}else i in b||"__componentCallbacks"!==i&&(a[i]=d[i])}if(d.prototype){g=Object.getOwnPropertyNames(d.prototype);for(var h in g){var i=g[h];if(-1!==f.indexOf(i)){var j=c.__getCallbackKey(i);a[j]=a[j]||[],a[j].push(d.prototype[i])}else i in b.prototype||(a.prototype[i]=d.prototype[i])}}a.__attachedBehaviors.push(d)}}},{key:"__getCallbackKey",value:function(a){return"__"+a+"Callbacks"}},{key:"__componentCallbacks",get:function(){return["onRegister","createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"]}}]),c}(b),a("DNAMixedComponent",c)}}}),a.registerDynamic("d",[],!0,function(a,b,c){"use strict";function d(a){this.listenerMap=[{},{}],a&&this.root(a),this.handle=d.prototype.handle.bind(this)}function e(a,b){return a.toLowerCase()===b.tagName.toLowerCase()}function f(a,b){return this.rootElement===window?b===document:this.rootElement===b}function g(a,b){return a===b.id}var h=this,i=h.define;h.define=void 0,c.exports=d,d.prototype.root=function(a){var b,c=this.listenerMap;if(this.rootElement){for(b in c[1])c[1].hasOwnProperty(b)&&this.rootElement.removeEventListener(b,this.handle,!0);for(b in c[0])c[0].hasOwnProperty(b)&&this.rootElement.removeEventListener(b,this.handle,!1)}if(!a||!a.addEventListener)return this.rootElement&&delete this.rootElement,this;this.rootElement=a;for(b in c[1])c[1].hasOwnProperty(b)&&this.rootElement.addEventListener(b,this.handle,!0);for(b in c[0])c[0].hasOwnProperty(b)&&this.rootElement.addEventListener(b,this.handle,!1);return this},d.prototype.captureForType=function(a){return-1!==["blur","error","focus","load","resize","scroll"].indexOf(a)},d.prototype.on=function(a,b,c,d){var h,i,k,l;if(!a)throw new TypeError("Invalid event type: "+a);if("function"==typeof b&&(d=c,c=b,b=null),void 0===d&&(d=this.captureForType(a)),"function"!=typeof c)throw new TypeError("Handler must be a type of Function");return h=this.rootElement,i=this.listenerMap[d?1:0],i[a]||(h&&h.addEventListener(a,this.handle,d),i[a]=[]),b?/^[a-z]+$/i.test(b)?(l=b,k=e):/^#[a-z0-9\-_]+$/i.test(b)?(l=b.slice(1),k=g):(l=b,k=j):(l=null,k=f.bind(this)),i[a].push({selector:b,handler:c,matcher:k,matcherParam:l}),this},d.prototype.off=function(a,b,c,d){var e,f,g,h,i;if("function"==typeof b&&(d=c,c=b,b=null),void 0===d)return this.off(a,b,c,!0),this.off(a,b,c,!1),this;if(g=this.listenerMap[d?1:0],!a){for(i in g)g.hasOwnProperty(i)&&this.off(i,b,c);return this}if(h=g[a],!h||!h.length)return this;for(e=h.length-1;e>=0;e--)f=h[e],b&&b!==f.selector||c&&c!==f.handler||h.splice(e,1);return h.length||(delete g[a],this.rootElement&&this.rootElement.removeEventListener(a,this.handle,d)),this},d.prototype.handle=function(a){var b,c,d,e,f,g,h,i=a.type,j=[],k="ftLabsDelegateIgnore";if(a[k]!==!0){switch(h=a.target,3===h.nodeType&&(h=h.parentNode),d=this.rootElement,e=a.eventPhase||(a.target!==a.currentTarget?3:2)){case 1:j=this.listenerMap[1][i];break;case 2:this.listenerMap[0]&&this.listenerMap[0][i]&&(j=j.concat(this.listenerMap[0][i])),this.listenerMap[1]&&this.listenerMap[1][i]&&(j=j.concat(this.listenerMap[1][i]));break;case 3:j=this.listenerMap[0][i]}for(c=j.length;h&&c;){for(b=0;c>b&&(f=j[b],f);b++)if(f.matcher.call(h,f.matcherParam,h)&&(g=this.fire(a,h,f)),g===!1)return a[k]=!0,void a.preventDefault();if(h===d)break;c=j.length,h=h.parentElement}}},d.prototype.fire=function(a,b,c){return c.handler.call(b,a,b)};var j=function(a){if(a){var b=a.prototype;return b.matches||b.matchesSelector||b.webkitMatchesSelector||b.mozMatchesSelector||b.msMatchesSelector||b.oMatchesSelector}}(Element);return d.prototype.destroy=function(){this.off(),this.root()},h.define=i,c.exports}),a.registerDynamic("e",["d"],!0,function(a,b,c){"use strict";var d=this,e=d.define;d.define=void 0;var f=a("d");return c.exports=function(a){return new f(a)},c.exports.Delegate=f,d.define=e,c.exports}),a.register("6",["e","c"],function(a){"use strict";var b,c,d;return{setters:[function(a){b=a["default"]},function(a){c=a.DNAComponent}],execute:function(){d=function(a){function d(){babelHelpers.classCallCheck(this,d),babelHelpers.get(Object.getPrototypeOf(d.prototype),"constructor",this).apply(this,arguments)}return babelHelpers.inherits(d,a),babelHelpers.createClass(d,[{key:"createdCallback",value:function(){var a=this.constructor.bindEvents;if(a){var d=new b(this);for(var e in a){var f=this[a[e]];if(f&&"function"==typeof f){var g=e.split(" ").shift(),h=e.split(" ").slice(1).join(" ");h?d.on(g,h,f.bind(this)):d.on(g,f.bind(this))}}}c.prototype.createdCallback.call(this)}},{key:"addEventListener",value:function(a,b){return"undefined"!=typeof Node.prototype.addEventListener?Node.prototype.addEventListener.call(this,a,b):"undefined"!=typeof Node.prototype.attachEvent?Node.prototype.attachEvent.call(this,"on"+a,b):void 0}},{key:"trigger",value:function(a,b){var c=arguments.length<=2||void 0===arguments[2]?!0:arguments[2],e=arguments.length<=3||void 0===arguments[3]?!0:arguments[3],f=d.createEvent();if(f){if("undefined"!=typeof f.initEvent&&f.initEvent(a,c,e),f.detail=b,"undefined"!=typeof Node.prototype.dispatchEvent)return Node.prototype.dispatchEvent.call(this,f);if("undefined"!=typeof Node.prototype.fireEvent)return Node.prototype.fireEvent.call(this,"on"+a,f)}}}],[{key:"createEvent",value:function(){var a=arguments.length<=0||void 0===arguments[0]?"Event":arguments[0];return"undefined"!=typeof document.createEvent?document.createEvent(a):"undefined"!=typeof document.createEventObject?document.createEventObject():void 0}}]),d}(c),a("DNAEventComponent",d)}}}),a.register("9",["c"],function(a){"use strict";var b,c;return{setters:[function(a){b=a.DNAComponent}],execute:function(){c=function(a){function c(){babelHelpers.classCallCheck(this,c),babelHelpers.get(Object.getPrototypeOf(c.prototype),"constructor",this).apply(this,arguments)}return babelHelpers.inherits(c,a),babelHelpers.createClass(c,[{key:"createdCallback",value:function(){var a=this;b.prototype.createdCallback.call(this);for(var c=this.attributes||[],d=0,e=c.length;e>d;d++){var f=c[d];this.attributeChangedCallback(f.name,void 0,f.value)}var g=this.constructor.attributes||[];g.forEach(function(b){null!==a[b]&&void 0!==a[b]&&a.setAttribute(b,a[b])})}},{key:"attributeChangedCallback",value:function(a,c,d){b.prototype.attributeChangedCallback.call(this);var e=this.constructor;e&&e.attributes&&Array.isArray(e.attributes)&&-1!==e.attributes.indexOf(a)&&(this[a]=d)}}],[{key:"onRegister",value:function(){var a=this,b=this.attributes||[];b.forEach(function(b){var c=Object.getOwnPropertyDescriptor(a.prototype,b)||{};Object.defineProperty(a.prototype,b,{configurable:!0,get:c.get||function(){return this["__"+b]},set:function(a){return function(c){var d=void 0;return d=a.set?a.set.call(this,c):this["__"+b]=c,null!==c&&void 0!==c?this.setAttribute(b,c):this.removeAttribute(b),d}}(c)})})}}]),c}(b),a("DNAAttributesComponent",c)}}}),a.register("b",[],function(a){"use strict";var b;return{setters:[],execute:function(){b=function c(){babelHelpers.classCallCheck(this,c)},b.useWebComponents="undefined"!=typeof window&&"undefined"!=typeof window.WebComponents,b.useVirtualDOM="undefined"!=typeof window&&"undefined"!=typeof window.virtualDom,b.autoUpdateView=!0,a("DNAConfig",b)}}}),a.register("3",["b"],function(a){"use strict";var b,c;return{setters:[function(a){b=a.DNAConfig}],execute:function(){c=function(){function a(){babelHelpers.classCallCheck(this,a)}return babelHelpers.createClass(a,null,[{key:"register",value:function(c){var d=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],e=void 0,f=void 0;"string"==typeof c&&(e=c,"function"==typeof d?(c=d,d={}):"undefined"!=typeof d.prototype&&(c=d.prototype)),"function"==typeof c?(e=e||d.tagName||c.hasOwnProperty("tagName")&&c.tagName||a.classToElement(c),Object.defineProperty(c,"tagName",{get:function(){return e}}),"function"==typeof c.onRegister&&c.onRegister.call(c),d.prototype=c.prototype,d["extends"]||"string"!=typeof c["extends"]||(d["extends"]=c["extends"])):d.prototype=c;try{return c.prototype.is=e,f=b.useWebComponents?document.registerElement(e,d):function(){var a=document.createElement(e);return Object.setPrototypeOf(a,c.prototype),setTimeout(function(){a.createdCallback()},0),a},f.prototype.is=e,"function"==typeof c&&(f.prototype.constructor=c),f}catch(g){return console.error(g),!1}}},{key:"classToElement",value:function(a){var b=a.name||a.toString().match(/^function\s*([^\s(]+)/)[1];if(b)return a.name.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}).replace(/^\-/,"")}},{key:"elementToClass",value:function(a){return a.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,function(a,b){return 0===+a?"":a.toUpperCase()}).replace(/[\-|\_]/g,"")}}]),a}(),a("DNAHelper",c)}}}),a.register("c",["3"],function(a){"use strict";var b,c,d;return{setters:[function(a){b=a.DNAHelper}],execute:function(){"function"!=typeof HTMLElement&&(c=function(){},c.prototype=HTMLElement.prototype,HTMLElement=c),d=function(a){function c(){babelHelpers.classCallCheck(this,c),babelHelpers.get(Object.getPrototypeOf(c.prototype),"constructor",this).apply(this,arguments)}return babelHelpers.inherits(c,a),babelHelpers.createClass(c,[{key:"createdCallback",value:function(){}},{key:"attachedCallback",value:function(){}},{key:"detachedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(a,b,c){}}],[{key:"onRegister",value:function(){}},{key:"tagName",get:function(){return this._tagName||b.classToElement(this)},set:function(a){"string"==typeof a&&(this._tagName=a)}}]),c}(HTMLElement),a("DNAComponent",d)}}}),a.registerDynamic("f",[],!1,function(b,c,d){var e=a.get("@@global-helpers").prepareGlobal(d.id,null,null);return function(){!function(){"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))?!function(){"use strict";var a=document.createElement("_");if(a.classList.add("c1","c2"),!a.classList.contains("c2")){var b=function(a){var b=DOMTokenList.prototype[a];DOMTokenList.prototype[a]=function(a){var c,d=arguments.length;for(c=0;d>c;c++)a=arguments[c],b.call(this,a)}};b("add"),b("remove")}if(a.classList.toggle("c3",!1),a.classList.contains("c3")){var c=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(a,b){return 1 in arguments&&!this.contains(a)==!b?b:c.call(this,a)}}a=null}():!function(a){"use strict";if("Element"in a){var b="classList",c="prototype",d=a.Element[c],e=Object,f=String[c].trim||function(){return this.replace(/^\s+|\s+$/g,"")},g=Array[c].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1},h=function(a,b){this.name=a,this.code=DOMException[a],this.message=b},i=function(a,b){if(""===b)throw new h("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(b))throw new h("INVALID_CHARACTER_ERR","String contains an invalid character");return g.call(a,b)},j=function(a){for(var b=f.call(a.getAttribute("class")||""),c=b?b.split(/\s+/):[],d=0,e=c.length;e>d;d++)this.push(c[d]);this._updateClassName=function(){a.setAttribute("class",this.toString())}},k=j[c]=[],l=function(){return new j(this)};if(h[c]=Error[c],k.item=function(a){return this[a]||null},k.contains=function(a){return a+="",-1!==i(this,a)},k.add=function(){var a,b=arguments,c=0,d=b.length,e=!1;do a=b[c]+"",-1===i(this,a)&&(this.push(a),e=!0);while(++c<d);e&&this._updateClassName()},k.remove=function(){var a,b,c=arguments,d=0,e=c.length,f=!1;do for(a=c[d]+"",b=i(this,a);-1!==b;)this.splice(b,1),f=!0,b=i(this,a);while(++d<e);f&&this._updateClassName()},k.toggle=function(a,b){a+="";var c=this.contains(a),d=c?b!==!0&&"remove":b!==!1&&"add";return d&&this[d](a),b===!0||b===!1?b:!c},k.toString=function(){return this.join(" ")},e.defineProperty){var m={get:l,enumerable:!0,configurable:!0};try{e.defineProperty(d,b,m)}catch(n){-2146823252===n.number&&(m.enumerable=!1,e.defineProperty(d,b,m))}}else e[c].__defineGetter__&&d.__defineGetter__(b,l)}}(self))}()}(),e()}),a.register("10",["f"],function(a){"use strict";return{setters:[function(a){}],execute:function(){}}}),a.registerDynamic("11",[],!1,function(b,c,d){var e=a.get("@@global-helpers").prepareGlobal(d.id,null,null);return function(){!function(){function a(a,b){return function(){return b.apply(this,arguments)}}function b(a,b,c){if(!c){var d=a.__proto__[b];c={get:function(){return a["__"+b]||d},set:function(c){a["__"+b]=c}}}Object.defineProperty(a,b,{get:c.get?c.get.bind(a):void 0,set:c.set?c.set.bind(a):void 0,configurable:!0})}function c(e,f){var g,h=Object.getOwnPropertyNames(f);e.__proto__=f;for(var i=0,j=h.length;j>i;i++){var k=h[i];if("__proto__"===k)g=f[k];else if(-1===d.indexOf(i)){var l=Object.getOwnPropertyDescriptor(e,k);if(!l){var m=Object.getOwnPropertyDescriptor(f,k);"function"!=typeof m.get&&"function"==typeof f[k]?e[k]=a(e,f[k]):"function"==typeof m.get?b(e,k,m):b(e,k)}}}g&&c(e,g)}if("undefined"==typeof Object.setPrototypeOf&&"function"==typeof Object.getOwnPropertyNames){var d=["length","name","arguments","caller","prototype"];
Object.setPrototypeOf=c}}()}(),e()}),a.register("12",["11"],function(a){"use strict";return{setters:[function(a){}],execute:function(){}}}),a.registerDynamic("13",[],!1,function(b,c,d){var e=a.get("@@global-helpers").prepareGlobal(d.id,null,null);return function(){!function(){"undefined"==typeof Array.isArray&&(Array.isArray=function(a){})}()}(),e()}),a.registerDynamic("14",[],!1,function(b,c,d){var e=a.get("@@global-helpers").prepareGlobal(d.id,null,null);return function(){!function(){"use strict";if("undefined"==typeof Array.from){var a=function(){try{var a={},b=Object.defineProperty,c=b(a,a,a)&&b}catch(d){}return c||function(a,b,c){a[b]=c.value}}(),b=Object.prototype.toString,c=function(a){return"function"==typeof a||"[object Function]"==b.call(a)},d=function(a){var b=Number(a);return isNaN(b)?0:0!=b&&isFinite(b)?(b>0?1:-1)*Math.floor(Math.abs(b)):b},e=Math.pow(2,53)-1,f=function(a){var b=d(a);return Math.min(Math.max(b,0),e)},g=function(b){var d=this;if(null==b)throw new TypeError("`Array.from` requires an array-like object, not `null` or `undefined`");var e,g,h=Object(b);arguments.length>1;if(arguments.length>1){if(e=arguments[1],!c(e))throw new TypeError("When provided, the second argument to `Array.from` must be a function");arguments.length>2&&(g=arguments[2])}for(var i,j,k=f(h.length),l=c(d)?Object(new d(k)):new Array(k),m=0;k>m;)i=h[m],j=e?"undefined"==typeof g?e(i,m):e.call(g,i,m):i,a(l,m,{value:j,configurable:!0,enumerable:!0}),++m;return l.length=k,l};a(Array,"from",{value:g,configurable:!0,writable:!0})}}()}(),e()}),a.registerDynamic("15",[],!1,function(b,c,d){var e=a.get("@@global-helpers").prepareGlobal(d.id,null,null);return function(){!function(){"undefined"==typeof Array.prototype.forEach&&(Array.prototype.forEach=function(a,b){var c,d,e,f,g,h=Object(this),i=h.length,j=i>>>0;if("function"!=typeof a)throw new TypeError;for(c=b?b:void 0,d=0;j>d;)e=d.toString(),f=h.hasOwnProperty(e),f&&(g=h[e],a.call(c,g,d,h)),d+=1})}()}(),e()}),a.register("16",["13","14","15"],function(a){"use strict";return{setters:[function(a){},function(a){},function(a){}],execute:function(){}}}),a.register("17",["10","12","16"],function(a){"use strict";return{setters:[function(a){},function(a){},function(a){}],execute:function(){}}}),a.register("1",["2","4","5","6","7","8","9","17","c","b"],function(a){"use strict";return{setters:[function(b){for(var c in b)"default"!==c&&a(c,b[c])},function(b){for(var c in b)"default"!==c&&a(c,b[c])},function(b){for(var c in b)"default"!==c&&a(c,b[c])},function(b){for(var c in b)"default"!==c&&a(c,b[c])},function(b){for(var c in b)"default"!==c&&a(c,b[c])},function(b){for(var c in b)"default"!==c&&a(c,b[c])},function(b){for(var c in b)"default"!==c&&a(c,b[c])},function(a){},function(b){for(var c in b)"default"!==c&&a(c,b[c])},function(b){a("Config",b.DNAConfig)}],execute:function(){}}})})(function(a){DNAComponents=a()});
//# sourceMappingURL=dna-components.js.map