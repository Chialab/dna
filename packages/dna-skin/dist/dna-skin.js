!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(){}function n(t,e){this.attrs=V(),this.attrsArr=[],this.newAttrs=V(),this.staticsApplied=!1,this.key=e,this.keyMap=V(),this.keyMapValid=!0,this.focused=!1,this.nodeName=t,this.text=null}function r(){this.created=G.nodesCreated&&[],this.deleted=G.nodesDeleted&&[]}function i(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];for(var i=0,o=Xt[t].length;i<o;i++){var u,a=(u=Xt[t][i]).call.apply(u,[Gt].concat(n));if(a===!1)return!1}return!0}function o(t,e){if(t)for(var n in t)e(n,t[n])}function u(t){return t===!0&&(t=""),"string"==typeof t&&(t="'"+t+"'"),t}function a(t){return t.replace(/\$/g,"\\$")}function s(t){var e=new RegExp("^("+t.map(function(t){return a(t)}).join("|")+")");return e}function c(t){return"function"==typeof t}function f(t){return"string"==typeof t}function l(t){return"object"===("undefined"==typeof t?"undefined":wt(t))}function p(t){return"undefined"==typeof t}function h(t){return Array.isArray(t)}function d(t,e,n){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!f(e))throw new TypeError("Event name is undefined");var o=new de(e,{detail:n,bubbles:r,cancelable:i});return t.dispatchEvent(o)}function v(t){if(t.nodeType===Node.ELEMENT_NODE){var e=t.getAttribute("is")||t.tagName;return ve.get(e)}return ve.get(t)}function y(t){var e=v(t);return e&&t instanceof e.Ctr}function m(t){if(y(t))return t[ye].call(t),!0}function g(t){if(y(t))return t[me].call(t),!0}function b(t,e,n,r){if(y(t))return t[ge].call(t,e,n,r),!0}function E(t,e){e=e||v(t).Ctr,t.__proto__=e.prototype,Object.defineProperty(t,"constructor",{value:e,configurable:!0,writable:!0}),e.call(t)}function C(t,e){return e=e||v(t),!!e&&(E(t,e.Ctr),!0)}function O(t){var e=v(t);if(e)return new e.Ctr}function k(t,e){return(t!==e.parentNode||t.lastElementChild!==e)&&(e.parentNode&&w(e.parentNode,e),t.appendChild(e),m(e))}function w(t,e){return t.removeChild(e),g(e)}function A(t,e,n){return t.insertBefore(e,n),m(e)}function N(t,e,n){return t.replaceChild(e,n),g(n),m(e)}function x(t,e,n){var r=t.getAttribute(e);t.setAttribute(e,n);var i=t.constructor.observedAttributes||[];return i.indexOf(e)!==-1&&(b(t,e,r,n),!0)}function M(t,e){var n=t.getAttribute(e);t.removeAttribute(e);var r=t.constructor.observedAttributes||[];return r.indexOf(e)!==-1&&(b(t,e,n,null),!0)}function S(t){return t instanceof Oe?t:new Oe(t)}function _(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function T(t,e,n){var r=t.getAttribute(e);if(r!==n)if(null!==n&&void 0!==n&&n!==!1)switch("undefined"==typeof n?"undefined":wt(n)){case"string":case"number":t.setAttribute(e,n);break;case"boolean":t.setAttribute(e,"")}else null!==r&&t.removeAttribute(e)}function L(t){var e=Me.createElement("style");e.type="text/css",e.setAttribute("id","style-"+t);var n=Me.head;return n.firstElementChild?n.insertBefore(e,n.firstElementChild):n.appendChild(e),e}function P(t,e){return e!==t.textContent&&(t.textContent=e,!0)}function D(t){try{return!f(t.outerHTML)}catch(t){return!0}}function j(t){var e=function t(){if(At(this,t),!D(this))return this;var e=ve.get(this.constructor),n=e.config,r=document.createElement(n.extends?n.extends:e.is);return r.__proto__=e.Ctr.prototype,n.extends&&r.setAttribute("is",e.is),r};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function $(t,e,n){return ve.define(t,e,n)}function I(t,e,n){var r=new e;for(var i in n)r[i]=n[i];return De.appendChild(t,r),r}var B=Object.prototype.hasOwnProperty;e.prototype=Object.create(null);var R=function(t,e){return B.call(t,e)},V=function(){return new e},F=function(t,e,r){var i=new n(e,r);return t.__incrementalDOMData=i,i},q=function(t){return z(t),t.__incrementalDOMData},z=function t(e){if(!e.__incrementalDOMData){var n=e instanceof Element,r=n?e.localName:e.nodeName,i=n?e.getAttribute("key"):null,o=F(e,r,i);if(i&&(q(e.parentNode).keyMap[i]=e),n)for(var u=e.attributes,a=o.attrs,s=o.newAttrs,c=o.attrsArr,f=0;f<u.length;f+=1){var l=u[f],p=l.name,h=l.value;a[p]=h,s[p]=void 0,c.push(p),c.push(h)}for(var d=e.firstChild;d;d=d.nextSibling)t(d)}},H=function(t,e){return"svg"===t?"http://www.w3.org/2000/svg":"foreignObject"===q(e).nodeName?null:e.namespaceURI},U=function(t,e,n,r){var i=H(n,e),o=void 0;return o=i?t.createElementNS(i,n):t.createElement(n),F(o,n,r),o},X=function(t){var e=t.createTextNode("");return F(e,"#text",null),e},G={nodesCreated:null,nodesDeleted:null};r.prototype.markCreated=function(t){this.created&&this.created.push(t)},r.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},r.prototype.notifyChanges=function(){this.created&&this.created.length>0&&G.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&G.nodesDeleted(this.deleted)};var J=function(t){return t instanceof Document||t instanceof DocumentFragment},Y=function(t,e){for(var n=[],r=t;r!==e;)n.push(r),r=r.parentNode;return n},Z=function(t){for(var e=t,n=e;e;)n=e,e=e.parentNode;return n},K=function(t){var e=Z(t);return J(e)?e.activeElement:null},Q=function(t,e){var n=K(t);return n&&t.contains(n)?Y(n,e):[]},W=function(t,e,n){for(var r=e.nextSibling,i=n;i!==e;){var o=i.nextSibling;t.insertBefore(i,r),i=o}},tt=null,et=null,nt=null,rt=null,it=function(t,e){for(var n=0;n<t.length;n+=1)q(t[n]).focused=e},ot=function(t){var e=function(e,n,i){var o=tt,u=rt,a=et,s=nt;tt=new r,rt=e.ownerDocument,nt=e.parentNode;var c=Q(e,nt);it(c,!0);var f=t(e,n,i);return it(c,!1),tt.notifyChanges(),tt=o,rt=u,et=a,nt=s,f};return e},ut=ot(function(t,e,n){return et=t,pt(),e(n),vt(),t}),at=ot(function(t,e,n){var r={nextSibling:t};return et=r,e(n),t!==et&&t.parentNode&&ft(nt,t,q(nt).keyMap),r===et?null:et}),st=function(t,e,n){var r=q(t);return e===r.nodeName&&n==r.key},ct=function(t,e){if(!et||!st(et,t,e)){var n=q(nt),r=et&&q(et),i=n.keyMap,o=void 0;if(e){var u=i[e];u&&(st(u,t,e)?o=u:u===et?tt.markDeleted(u):ft(nt,u,i))}o||(o="#text"===t?X(rt):U(rt,nt,t,e),e&&(i[e]=o),tt.markCreated(o)),q(o).focused?W(nt,o,et):r&&r.key&&!r.focused?(nt.replaceChild(o,et),n.keyMapValid=!1):nt.insertBefore(o,et),et=o}},ft=function(t,e,n){t.removeChild(e),tt.markDeleted(e);var r=q(e).key;r&&delete n[r]},lt=function(){var t=nt,e=q(t),n=e.keyMap,r=e.keyMapValid,i=t.lastChild,o=void 0;if(i!==et||!r){for(;i!==et;)ft(t,i,n),i=t.lastChild;if(!r){for(o in n)i=n[o],i.parentNode!==t&&(tt.markDeleted(i),delete n[o]);e.keyMapValid=!0}}},pt=function(){nt=et,et=null},ht=function(){return et?et.nextSibling:nt.firstChild},dt=function(){et=ht()},vt=function(){lt(),et=nt,nt=nt.parentNode},yt=function(t,e){return dt(),ct(t,e),pt(),nt},mt=function(){return vt(),et},gt=function(){return dt(),ct("#text",null),et},bt=function(){return nt},Et=function(){return ht()},Ct=function(){et=nt.lastChild},Ot=dt,kt={default:"__default"},wt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},At=(function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,i){var a={key:t,arg:e,resolve:n,reject:i,next:null};u?u=u.next=a:(o=u=a,r(t,e))})}function r(n,o){try{var u=e[n](o),a=u.value;a instanceof t?Promise.resolve(a.value).then(function(t){r("next",t)},function(t){r("throw",t)}):i(u.done?"return":"normal",u.value)}catch(t){i("throw",t)}}function i(t,e){switch(t){case"return":o.resolve({value:e,done:!0});break;case"throw":o.reject(e);break;default:o.resolve({value:e,done:!1})}o=o.next,o?r(o.key,o.arg):u=null}var o,u;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new e(t.apply(this,arguments))}},await:function(e){return new t(e)}}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),Nt=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),xt=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},Mt=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},St=function(t){return 0===t.lastIndexOf("xml:",0)?"http://www.w3.org/XML/1998/namespace":0===t.lastIndexOf("xlink:",0)?"http://www.w3.org/1999/xlink":void 0},_t=function(t,e,n){if(null==n)t.removeAttribute(e);else{var r=St(e);r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}},Tt=function(t,e,n){t[e]=n},Lt=function(t,e,n){e.indexOf("-")>=0?t.setProperty(e,n):t[e]=n},Pt=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style,i=n;for(var o in i)R(i,o)&&Lt(r,o,i[o])}},Dt=function(t,e,n){var r="undefined"==typeof n?"undefined":wt(n);"object"===r||"function"===r?Tt(t,e,n):_t(t,e,n)},jt=function(t,e,n){var r=q(t),i=r.attrs;if(i[e]!==n){var o=$t[e]||$t[kt.default];o(t,e,n),i[e]=n}},$t=V();$t[kt.default]=Dt,$t.style=Pt;var It=3,Bt=[],Rt=function(t,e,n,r){var i=yt(t,e),o=q(i);if(!o.staticsApplied){if(n)for(var u=0;u<n.length;u+=2){var a=n[u],s=n[u+1];jt(i,a,s)}o.staticsApplied=!0}for(var c=o.attrsArr,f=o.newAttrs,l=!c.length,p=It,h=0;p<arguments.length;p+=2,h+=2){var d=arguments[p];if(l)c[h]=d,f[d]=void 0;else if(c[h]!==d)break;var v=arguments[p+1];(l||c[h+1]!==v)&&(c[h+1]=v,jt(i,d,v))}if(p<arguments.length||h<c.length){for(;p<arguments.length;p+=1,h+=1)c[h]=arguments[p];for(h<c.length&&(c.length=h),p=0;p<c.length;p+=2){var y=c[p],m=c[p+1];f[y]=m}for(var g in f)jt(i,g,f[g]),f[g]=void 0}return i},Vt=function(t,e,n){Bt[0]=t,Bt[1]=e,Bt[2]=n},Ft=function(t,e){Bt.push(t),Bt.push(e)},qt=function(){var t=Rt.apply(null,Bt);return Bt.length=0,t},zt=function(t){var e=mt();return e},Ht=function(t,e,n,r){return Rt.apply(null,arguments),zt(t)},Ut=function(t,e){var n=gt(),r=q(n);if(r.text!==t){r.text=t;for(var i=t,o=1;o<arguments.length;o+=1){var u=arguments[o];i=u(i)}n.data=i}return n},Xt={beforeOpen:[],afterOpen:[],beforeClose:[],afterClose:[],beforeText:[],afterText:[],beforeAttr:[],afterAttr:[]},Gt=function(){function t(){At(this,t)}return t.close=function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){return close.apply(void 0,arguments)}),t.skip=function(){return Ct.apply(void 0,arguments)},t.skipNode=function(){return Ot.apply(void 0,arguments)},t.importNode=function(){return z.apply(void 0,arguments)},t.currentElement=function(){return bt.apply(void 0,arguments)},t.currentPointer=function(){return Et.apply(void 0,arguments)},t.elementOpen=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];if(i.apply(void 0,["beforeOpen"].concat(e))){var r=Rt.apply(void 0,e),o=i("afterOpen",r);return o===!1?(this.elementClose(e[0]),!1):r}},t.elementOpenStart=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];if(i.apply(void 0,["beforeOpen"].concat(e))){var r=Vt.apply(void 0,e);return r||!0}},t.elementOpenEnd=function(){var t=qt.apply(void 0,arguments),e=i("afterOpen",t);return e===!1?(this.elementClose(arguments.length<=0?void 0:arguments[0]),!1):t},t.elementClose=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];if(i.apply(void 0,["beforeClose"].concat(e))){var r=zt.apply(void 0,e);return i("afterClose",r)||r}},t.elementVoid=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];if(i.apply(void 0,["beforeOpen"].concat(e))){var r=Ht.apply(void 0,e);return i("afterOpen",r)||r}},t.attr=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];if(i.apply(void 0,["beforeAttr"].concat(e))){var r=Ft.apply(void 0,e);return i("afterAttr",r)||r}},t.text=function(t){if(i("beforeText",t)){"undefined"==typeof t&&(t="");var e=Ut(t);return i("afterText",e)||e}},t.applyAttr=function(){return _t.apply(void 0,arguments)},t.applyProp=function(){return Tt.apply(void 0,arguments)},t.patch=function(){return ut.apply(void 0,arguments)},t.patchOuter=function(){return at.apply(void 0,arguments)},t.beforeElementOpen=function(t){Xt.beforeOpen.push(t)},t.afterElementOpen=function(t){Xt.afterOpen.push(t)},t.beforeElementClose=function(t){Xt.beforeClose.push(t)},t.afterElementClose=function(t){Xt.afterClose.push(t)},t.beforeText=function(t){Xt.beforeText.push(t)},t.afterText=function(t){Xt.afterText.push(t)},t.beforeAttr=function(t){Xt.beforeAttr.push(t)},t.afterAttr=function(t){Xt.afterAttr.push(t)},Nt(t,null,[{key:"symbols",get:function(){return kt}},{key:"attributes",get:function(){return $t}},{key:"notifications",get:function(){return G}}]),t}(),Jt=/^\s{2,}/g,Yt=/\>\s+\</g,Zt=/(<\/?([a-zA-Z1-9\-]*)([^>]*)>?)/m,Kt=/((?:.|\n)*?)(?:\/?>|<|$)/,Qt=/[\'\"\/\s]/,Wt=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],te=/\/>$/,ee=function(){function t(e){At(this,t),this.data=e.replace(/\n/g,"").replace(Yt,"><"),this.restart()}return t.prototype.restart=function(){this.setCurrent(this.data)},t.prototype.setCurrent=function(t){"string"==typeof t&&(this.current=t.replace(Jt," "))},t.prototype.ended=function(){return!this.current},t.prototype.next=function(){var e=!1;if(!this.ended()){var n=void 0,r=this.current;if("<"!==r[0])if(">"===r[0]||"/"===r[0]&&">"===r[1]){var i=!1;"/"===r[0]?(n=[r,"/>"],i=!0):n=[r,">"],e={chunk:r,selfClosing:i,type:t.OPEN_ELEMENT_END}}else n=r.match(Kt),e={chunk:r,type:t.CONTENT,content:n[1]};else if(n=r.match(Zt),"/"===r[1])e={chunk:r,type:t.CLOSE_ELEMENT,tag:n[2]};else{var o=n[1];e=">"===o[o.length-1]?{chunk:r,type:t.OPEN_ELEMENT,continue:!1,tag:n[2],selfClosing:t.isSelfClosing(n[2])||t.isSelfClosing(o),props:t.convertProps(n[3],!0)}:{chunk:r,type:t.OPEN_ELEMENT,continue:!0,tag:n[2],selfClosing:t.isSelfClosing(n[2]),props:t.convertProps(n[3])}}n&&n[1]!==r?this.setCurrent(r.substring(n[1].length)):this.setCurrent("")}return e},t.isSelfClosing=function(t){return Wt.indexOf(t.toLowerCase())!==-1||!!t.match(te)},t.convertProps=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n={};if(t){for(var r=!1,i=!1,o=!1,u=null,a=0,s=t.length;a<s;a++){var c=t[a];"="===c?(r||(u=void 0),n[u]=!1,r=!1,o=!0):c.match(/[\s|\n]/)?i?(n[u]=n[u]||"",n[u]+=c):r?u&&(n[u]=!0,u=null,r=!1):o&&(u=null,o=!1):'"'!==c&&"'"!==c||null===u?o?(n[u]=n[u]||"",n[u]+=c):(r=!0,u=u||"",""===u&&c.match(Qt)||(u+=c)):o&&n[u]!==!1?(u=null,r=!1,i=!1):(i=!0,n[u]=n[u]||"")}r&&u?n[u]=e:i&&(n[u]=!1)}return n},Nt(t,null,[{key:"OPEN_ELEMENT",get:function(){return"OPEN_ELEMENT"}},{key:"OPEN_ELEMENT_END",get:function(){return"OPEN_ELEMENT_END"}},{key:"CLOSE_ELEMENT",get:function(){return"CLOSE_ELEMENT"}},{key:"CONTENT",get:function(){return"CONTENT"}}]),t}(),ne=function(){function t(e){At(this,t),this.invocations=[],this.$=e}return t.prototype.addChunk=function(t){for(var e=this,n="",r=new ee(t),i=r.next();i;){switch(i.type){case ee.OPEN_ELEMENT:i.continue?(n+=this.genElementOpenStart(i),this.setElementOpen(i.tag)):n+=this.genElementOpen(i);break;case ee.OPEN_ELEMENT_END:n+=this.genElementOpenEnd(i),this.clearElementOpen();break;case ee.CLOSE_ELEMENT:n+=this.genElementClose(i);break;case ee.CONTENT:if(this.isElementOpen()){var a=ee.convertProps(i.content);a&&o(a,function(t,r){"undefined"===t&&r===!1||("undefined"===t?e.hasLastAttr()&&(n+=e.fillLastAttr(u(r))):n+=r===!1?e.setLastAttr("'"+t+"'"):e.addProperty("'"+t+"'",u(r)),n+="\n")})}else n+=this.addText(i.content),n+=";\n"}i=r.next()}return n},t.prototype.invokeDOM=function(){var t=this;this.invocations.forEach(function(e,n){t.invocations[n]=!0})},t.prototype.queueInvocation=function(){return this.invocations.push(!1)-1},t.prototype.checkInvocation=function(t){return this.invocations[t]},t.prototype.interpolate=function(t,e){this.invokeDOM();var n=this.queueInvocation(),r="("+t.generate(e)+").apply("+this.$.scope+", "+this.$.args+")\n";return this.checkInvocation(n)?r:this.isElementOpen()?this.hasLastAttr()?this.fillLastAttr(r):(this.setLastAttr(r),""):this.$.helper+".text("+r+")\n"},t.prototype.genElementOpen=function(t){this.invokeDOM();var e="";return e+=this.genElementOpenStart(t),e+=this.genElementOpenEnd(t)},t.prototype.genElementOpenStart=function(t){var e=this;this.invokeDOM();var n="if ("+this.$.helper+".elementOpenStart('"+t.tag+"') && (function("+this.$.helper+"){";return t.props&&o(t.props,function(r,i){i===!1?(n+=e.setLastAttr("'"+r+"'"),delete t.props[r]):n+=e.addProperty("'"+r+"'",u(i))+";"}),n},t.prototype.genElementOpenEnd=function(t){this.invokeDOM();var e="\nreturn true;}).apply("+this.$.scope+", "+this.$.args+") && "+this.$.helper+".elementOpenEnd()) {",n=this.getElementOpen();return(t.selfClosing||n&&ee.isSelfClosing(n))&&(t.tag||(t.tag=n),e+=this.genElementClose(t)),e},t.prototype.genElementClose=function(t){return this.invokeDOM(),this.clearLastAttr(),this.$.helper+".elementClose('"+t.tag+"'); }\n"},t.prototype.addText=function(t){return this.invokeDOM(),this.$.helper+".text('"+t+"')"},t.prototype.addProperty=function(t,e){return this.invokeDOM(),this.$.helper+".attr("+t+", "+e+")"},t.prototype.setLastAttr=function(t){var e="";return this.lastAttr=t,e},t.prototype.fillLastAttr=function(t){var e=this.getLastAttr();return this.clearLastAttr(),this.addProperty(e,t)},t.prototype.getLastAttr=function(){return this.lastAttr},t.prototype.hasLastAttr=function(){return!!this.lastAttr},t.prototype.clearLastAttr=function(){this.lastAttr=null},t.prototype.setElementOpen=function(t){this.lastElement=t},t.prototype.getElementOpen=function(){return this.lastElement},t.prototype.isElementOpen=function(){return!!this.lastElement},t.prototype.clearElementOpen=function(){this.lastElement=null},t}(),re=function(){function t(e){At(this,t),this.start=s(e.start),this.end=s(e.end||e.start),this.contextStart=s(["{"]),this.contextEnd=s(["}"])}return t.prototype.interpolate=function(t,e){for(var n=this.start,r=this.end,i=this.contextStart,o=this.contextEnd,u=t.length,a=0,s="",c=0;a<u;){var f=t[a],l=t.slice(a);0===c&&l.match(n)?(c=1,s&&(e({interpolate:!1,chunk:s}),s=""),a+=l.match(n)[0].length):1===c&&l.match(r)?(a+=l.match(r)[0].length,e({interpolate:!0,chunk:s}),s="",c=0):(l.match(o)?(c>1&&c--,1===c&&a===u-1&&(e({interpolate:!0,chunk:s}),s="")):l.match(i)&&c>0&&c++,s+=f,a++)}s&&e({interpolate:c>=1,chunk:s})},t}(),ie="$$$skin",oe="$$$this",ue="$$$arguments",ae=new re({start:["`"]}),se=new re({start:["${"],end:["}"]}),ce=function(){function t(e,n){At(this,t),this.parent=n,this.render=n instanceof t?n.render:new ne({helper:ie,scope:oe,args:ue}),this.body=e}return t.prototype.generate=function(t,e){return e=e||this.body,"function("+ie+(t.length?", "+t.join(", "):"")+") { "+e+" }"},t.prototype.compile=function(){for(var t=this,e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var i=this.generate(n);try{var o=function(){var t=new Function("var "+oe+" = this;\nvar "+ue+" = arguments;\n("+i+").apply("+oe+", "+ue+");"),e=function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return t.call.apply(t,[this,Gt].concat(n))};return e.render=t,{v:e}}();if("object"===("undefined"==typeof o?"undefined":wt(o)))return o.v}catch(e){var u=function(){var n=t.body;return{v:function(){var t=new Error("Malformed template. "+n+" => "+i);throw t.original=e,t}}}();if("object"===("undefined"==typeof u?"undefined":wt(u)))return u.v}},t}(),fe=function(t){function e(){return At(this,e),Mt(this,t.apply(this,arguments))}return xt(e,t),e.prototype.chunk=function(){var t=this,e=[];return ae.interpolate(this.body,function(n){n.interpolate?e.push(new le(n.chunk,t)):e.push(n.chunk)}),e},e.prototype.generate=function(e){var n=this,r="return ",i=this.chunk();return i.forEach(function(t,i){t instanceof le?r+=n.render.interpolate(t,e):(0===i&&(t=t.replace(/^\s*/,"")),r+=""+t)}),r+="\n",t.prototype.generate.call(this,e,r)},e}(ce),le=function(t){function e(){return At(this,e),Mt(this,t.apply(this,arguments))}return xt(e,t),e.prototype.chunk=function(){var t=this,e=[];return se.interpolate(this.body,function(n){n.interpolate?e.push(new fe(n.chunk,t)):e.push(n.chunk)}),e},e.prototype.generate=function(e){var n=this,r="",i=this.chunk();return i.forEach(function(t){t instanceof fe?(r+=n.render.interpolate(t,e),r+=";"):r+=n.render.addChunk(t)}),t.prototype.generate.call(this,e,r)},e}(ce),pe=function(){function t(){At(this,t);for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var i=n.pop();if(i instanceof t)this.factory=i.factory,this.scope=i.scope;else if("function"==typeof i)this.factory=i;else{var o;this.factory=(o=new le(i)).compile.apply(o,n)}}return Nt(t,null,[{key:"IDOM",get:function(){return Gt}}]),t.prototype.setScope=function(t){return this.scope=t,this},t.prototype.render=function(t){for(var e=this,n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return Gt.patch(t,function(){return e.factory.apply(e.scope||null,r)}),this},t}(),he=function(t){return function(t){function e(){At(this,e);var n=Mt(this,t.call(this)),r=n.template;return r&&!function(){var t=n.constructor;"string"==typeof r&&(r=new pe(r),Object.defineProperty(t.prototype,"template",{value:r}));var e=new pe(r).setScope(n);Object.defineProperty(n,"template",{value:function(){return e.render(n)}})}(),n}return xt(e,t),e}(t)},de=void 0;try{new self.CustomEvent("test");de=self.CustomEvent}catch(t){de=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},de.prototype=self.CustomEvent.prototype}var ve={components:{},define:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.components[t.toLowerCase()]={is:t,Ctr:e,config:n}},get:function(t){if(f(t))return this.components[t.toLowerCase()];if(c(t))for(var e in this.components){var n=this.components[e];if(n.Ctr===t)return n}}},ye="connectedCallback",me="disconnectedCallback",ge="attributeChangedCallback",be=Object.freeze({getComponent:v,isComponent:y,connect:m,disconnect:g,update:b,bind:E,create:C,createElement:O,appendChild:k,removeChild:w,insertBefore:A,replaceChild:N,setAttribute:x,removeAttribute:M}),Ee=function(t){return function(t){function e(){return At(this,e),Mt(this,t.apply(this,arguments))}return xt(e,t),e.prototype.connectedCallback=function(){},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},Nt(e,[{key:"is",get:function(){return this.getAttribute("is")||this.localName}}]),e}(t)},Ce=Object.defineProperty,Oe=function(){function t(e){var n=this;At(this,t),this._=[],e=e||[],h(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),n.validateType(t)&&n.validator(t)){var e=n.value;return e!==t&&(n.value=t,n.changed(t,e)),!0}return!1}}return t.prototype.observe=function(t){return(c(t)||f(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){for(var n=0,r=this._.length;n<r;n++){var i=this._[n];f(i)?this.scope[i].call(this.scope,this,t,e):i(this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=l(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return f(t)?(this.attrRequested=!1,this.attrName=t):this.attrRequested=!!t,this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var e=this;return c(t)&&(this.getterFn=function(){return t(e.value)}),this},t.prototype.setter=function(t){return c(t)&&(this._setter=t),this},t.prototype.validate=function(t){return c(t)&&(this.validator=t),this},t.prototype.validateType=function(t){if(null===t||void 0===t)return!0;var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}throw new TypeError("Invalid `"+t+'` value for "'+this.name+'" property'+(this.scope?" for "+this.scope.is:"")+".")},t.prototype.init=function(t){this.scope=t,Ce(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),p(this.defaultValue)||(t[this.name]=this.defaultValue)},t}();Ce(S,"ANY",{get:function(){return S()}}),Ce(S,"STRING",{get:function(){return S(String)}}),Ce(S,"BOOLEAN",{get:function(){return S(Boolean)}}),Ce(S,"NUMBER",{get:function(){return S(Number)}});var ke=function(t){return function(t){function e(){At(this,e);var n=Mt(this,t.call(this)),r=n.properties;r?(h(r)||(r=[r]),r=r.reduce(function(t,e){for(var n in e)t[n]=S(e[n]);return t},{})):r={},Object.defineProperty(n,"properties",{value:r,writable:!1,configurable:!0});var i=function(t){var e=r[t];e.named(t).init(n);var i=e.attrName,o=e.eventName;(i||o)&&e.observe(function(){i&&T(n,i,n[e.name]),o&&d(n,o)})};for(var o in r)i(o);return n}return xt(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],i=r.attrName;i&&(p(this[r.name])?this.hasAttribute(i)&&(this[r.name]=_(r,this.getAttribute(i))):T(this,i,this[r.name]))}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var u=i[o];if(u.attrName===e)return void(this[u.name]=_(u,r))}},e.prototype.observeProperty=function(t,e){this.properties[t].observe(e)},e}(t)},we=Element.prototype,Ae=we.matches||we.matchesSelector||we.mozMatchesSelector||we.msMatchesSelector||we.oMatchesSelector||we.webkitMatchesSelector,Ne=/([^\s]+)(.*)?/,xe=function(t){return function(t){function e(){At(this,e);var n=Mt(this,t.call(this)),r=n.events||{},i=function(t){var e=f(r[t])?n[r[t]]:r[t];if(!c(e))throw new TypeError("Invalid callback for event.");var i=t.match(Ne),o=i[1],u=(i[2]||"").trim();u?n.delegate(o,u,e):n.addEventListener(o,function(t){e.call(n,t,n)})};for(var o in r)i(o);return n}return xt(e,t),e.prototype.delegate=function(t,e,n){var r=this;this.addEventListener(t,function(t){for(var i=t.target;i&&i!==r;)Ae.call(i,e)&&n.call(r,t,i),i=i.parentNode})},e.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return d(this,t,e,n,r)},e}(t)},Me=document,Se=function(t){return function(t){function e(){At(this,e);var n=Mt(this,t.call(this));if(!n.styleElem){var r=n.constructor;Object.defineProperty(r.prototype,"styleElem",{value:L(n.is)})}return n.updateCSS(),n}return xt(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.classList.add(this.is)},e.prototype.updateCSS=function(){var t=this.css;t&&P(this.styleElem,t)},e}(t)},_e=function(t){return function(t){function e(){At(this,e);var n=Mt(this,t.call(this));if(n.template){var r=n.properties;if(r){var i=function(){n.render()};for(var o in r)r[o].observe(i)}}return n}return xt(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.template&&this.render()},e.prototype.render=function(t){if(t=t||this.template,c(t))t();else{if(!f(t))throw new Error("Invalid template property.");this.innerHTML=t}},e}(t)},Te=Array.prototype.reduce||function(t){var e=this,n=e.length,r=0,i=void 0;if(2===arguments.length)i=arguments[1];else{for(;r<n&&!(r in e);)r++;i=e[r++]}for(;r<n;r++)r in e&&(i=t(i,e[r],r,e));return i},Le=function(){function t(e){At(this,t),e=e||function(){function t(){At(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){var t=[].slice.call(arguments,0);return Te.call(t,function(t,e){return e(t)},this.superclass)},t}(),Pe=function(t){return new Le(t)},De=be,je={ComponentMixin:Ee,PropertiesMixin:ke,EventsMixin:xe,StyleMixin:Se,TemplateMixin:_e},$e={dispatch:d},Ie=function(t){function e(){return At(this,e),Mt(this,t.apply(this,arguments))}return xt(e,t),e}(Pe(j(self.HTMLElement)).with(je.ComponentMixin,je.PropertiesMixin,je.StyleMixin,je.EventsMixin,je.TemplateMixin));je.SkinTemplateMixin=he;var Be=pe.IDOM,Re=function(t){function e(){return At(this,e),Mt(this,t.apply(this,arguments))}return xt(e,t),e}(Pe(Ie).with(he));t.mix=Pe,t.MIXINS=je,t.Template=pe,t.IDOM=Be,t.BaseComponent=Re,t.registry=ve,t.render=I,t.define=$,t.prop=S,t.shim=j,t.HELPERS=$e,t.DOM=De,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-skin.js.map
