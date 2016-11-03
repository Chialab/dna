!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(){}function n(t,e){this.attrs=R(),this.attrsArr=[],this.newAttrs=R(),this.staticsApplied=!1,this.key=e,this.keyMap=R(),this.keyMapValid=!0,this.focused=!1,this.nodeName=t,this.text=null}function r(){this.created=U.nodesCreated&&[],this.deleted=U.nodesDeleted&&[]}function i(t,e){if(t)for(var n in t)e(n,t[n])}function o(t){return t===!0&&(t=""),"string"==typeof t&&(t="'"+t+"'"),t}function u(t){var e=[];return i(t,function(t,n){e.push("'"+t+"'",o(n))}),e}function a(t){return t.replace(/\$/g,"\\$")}function s(t){var e=new RegExp("^("+t.map(function(t){return a(t)}).join("|")+")");return e}function c(t,e){for(var n=0,r=e.length;n<r;n++)t.outer.appendChild(e[n])}function l(t){return"function"==typeof t}function f(t){return"string"==typeof t}function p(t){return"object"===("undefined"==typeof t?"undefined":kt(t))}function h(t){return"undefined"==typeof t}function d(t){return Array.isArray(t)}function v(t,e,n){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!f(e))throw new TypeError("Event name is undefined");var o=new ve(e,{detail:n,bubbles:r,cancelable:i});return t.dispatchEvent(o)}function y(t){if(t.nodeType===Node.ELEMENT_NODE){var e=t.getAttribute("is")||t.tagName;return ye.get(e)}return ye.get(t)}function m(t){return!!l(t[me])&&(t[me].call(t),!0)}function g(t){return!!l(t[ge])&&(t[ge].call(t),!0)}function b(t,e,n,r){return!(!l(t[be])||"is"===e)&&(t[be].call(t,e,n,r),!0)}function E(t,e){e=e||y(t).Ctr,t.__proto__=e.prototype,Object.defineProperty(t,"constructor",{value:e,configurable:!0,writable:!0}),e.call(t)}function C(t,e){return e=e||y(t),!!e&&(E(t,e.Ctr),!0)}function k(t){var e=y(t);if(e)return new e.Ctr}function O(t,e){return(t!==e.parentNode||t.lastElementChild!==e)&&(e.parentNode&&w(e.parentNode,e),t.appendChild(e),m(e))}function w(t,e){return t.removeChild(e),g(e)}function N(t,e,n){var r=t.getAttribute(e);t.setAttribute(e,n);var i=t.constructor.observedAttributes||[];return i.indexOf(e)!==-1&&(b(t,e,r,n),!0)}function x(t,e){var n=t.getAttribute(e);t.removeAttribute(e);var r=t.constructor.observedAttributes||[];return r.indexOf(e)!==-1&&(b(t,e,n,null),!0)}function M(t){return t instanceof Oe?t:new Oe(t)}function A(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function _(t,e,n){var r=t.getAttribute(e);if(r!==n)if(null!==n&&void 0!==n&&n!==!1)switch("undefined"==typeof n?"undefined":kt(n)){case"string":case"number":t.setAttribute(e,n);break;case"boolean":t.setAttribute(e,"")}else null!==r&&t.removeAttribute(e)}function S(t){var e=_e.createElement("style");e.type="text/css",e.setAttribute("id","style-"+t);var n=_e.head;return n.firstElementChild?n.insertBefore(e,n.firstElementChild):n.appendChild(e),e}function L(t,e){return e!==t.textContent&&(t.textContent=e,!0)}function T(t){try{return!f(t.outerHTML)}catch(t){return!0}}function P(t){var e=function t(){if(Ot(this,t),!T(this))return this;var e=ye.get(this.constructor),n=e.config,r=document.createElement(n.extends?n.extends:e.is);return r.__proto__=e.Ctr.prototype,n.extends&&r.setAttribute("is",e.is),r};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function D(t,e,n){return ye.define(t,e,n)}function j(t,e,n){var r=new e;for(var i in n)r[i]=n[i];return je.appendChild(t,r),r}var $=Object.prototype.hasOwnProperty;e.prototype=Object.create(null);var I=function(t,e){return $.call(t,e)},R=function(){return new e},V=function(t,e,r){var i=new n(e,r);return t.__incrementalDOMData=i,i},B=function(t){return F(t),t.__incrementalDOMData},F=function t(e){if(!e.__incrementalDOMData){var n=e instanceof Element,r=n?e.localName:e.nodeName,i=n?e.getAttribute("key"):null,o=V(e,r,i);if(i&&(B(e.parentNode).keyMap[i]=e),n)for(var u=e.attributes,a=o.attrs,s=o.newAttrs,c=o.attrsArr,l=0;l<u.length;l+=1){var f=u[l],p=f.name,h=f.value;a[p]=h,s[p]=void 0,c.push(p),c.push(h)}for(var d=e.firstChild;d;d=d.nextSibling)t(d)}},q=function(t,e){return"svg"===t?"http://www.w3.org/2000/svg":"foreignObject"===B(e).nodeName?null:e.namespaceURI},z=function(t,e,n,r){var i=q(n,e),o=void 0;return o=i?t.createElementNS(i,n):t.createElement(n),V(o,n,r),o},H=function(t){var e=t.createTextNode("");return V(e,"#text",null),e},U={nodesCreated:null,nodesDeleted:null};r.prototype.markCreated=function(t){this.created&&this.created.push(t)},r.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},r.prototype.notifyChanges=function(){this.created&&this.created.length>0&&U.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&U.nodesDeleted(this.deleted)};var X=function(t){return t instanceof Document||t instanceof DocumentFragment},G=function(t,e){for(var n=[],r=t;r!==e;)n.push(r),r=r.parentNode;return n},J=function(t){for(var e=t,n=e;e;)n=e,e=e.parentNode;return n},Y=function(t){var e=J(t);return X(e)?e.activeElement:null},Z=function(t,e){var n=Y(t);return n&&t.contains(n)?G(n,e):[]},K=function(t,e,n){for(var r=e.nextSibling,i=n;i!==e;){var o=i.nextSibling;t.insertBefore(i,r),i=o}},Q=null,W=null,tt=null,et=null,nt=function(t,e){for(var n=0;n<t.length;n+=1)B(t[n]).focused=e},rt=function(t){var e=function(e,n,i){var o=Q,u=et,a=W,s=tt;Q=new r,et=e.ownerDocument,tt=e.parentNode;var c=Z(e,tt);nt(c,!0);var l=t(e,n,i);return nt(c,!1),Q.notifyChanges(),Q=o,et=u,W=a,tt=s,l};return e},it=rt(function(t,e,n){return W=t,lt(),e(n),ht(),t}),ot=rt(function(t,e,n){var r={nextSibling:t};return W=r,e(n),t!==W&&t.parentNode&&st(tt,t,B(tt).keyMap),r===W?null:W}),ut=function(t,e,n){var r=B(t);return e===r.nodeName&&n==r.key},at=function(t,e){if(!W||!ut(W,t,e)){var n=B(tt),r=W&&B(W),i=n.keyMap,o=void 0;if(e){var u=i[e];u&&(ut(u,t,e)?o=u:u===W?Q.markDeleted(u):st(tt,u,i))}o||(o="#text"===t?H(et):z(et,tt,t,e),e&&(i[e]=o),Q.markCreated(o)),B(o).focused?K(tt,o,W):r&&r.key&&!r.focused?(tt.replaceChild(o,W),n.keyMapValid=!1):tt.insertBefore(o,W),W=o}},st=function(t,e,n){t.removeChild(e),Q.markDeleted(e);var r=B(e).key;r&&delete n[r]},ct=function(){var t=tt,e=B(t),n=e.keyMap,r=e.keyMapValid,i=t.lastChild,o=void 0;if(i!==W||!r){for(;i!==W;)st(t,i,n),i=t.lastChild;if(!r){for(o in n)i=n[o],i.parentNode!==t&&(Q.markDeleted(i),delete n[o]);e.keyMapValid=!0}}},lt=function(){tt=W,W=null},ft=function(){return W?W.nextSibling:tt.firstChild},pt=function(){W=ft()},ht=function(){ct(),W=tt,tt=tt.parentNode},dt=function(t,e){return pt(),at(t,e),lt(),tt},vt=function(){return ht(),W},yt=function(){return pt(),at("#text",null),W},mt=function(){return tt},gt=function(){return ft()},bt=function(){W=tt.lastChild},Et=pt,Ct={default:"__default"},kt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ot=(function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,i){var a={key:t,arg:e,resolve:n,reject:i,next:null};u?u=u.next=a:(o=u=a,r(t,e))})}function r(n,o){try{var u=e[n](o),a=u.value;a instanceof t?Promise.resolve(a.value).then(function(t){r("next",t)},function(t){r("throw",t)}):i(u.done?"return":"normal",u.value)}catch(t){i("throw",t)}}function i(t,e){switch(t){case"return":o.resolve({value:e,done:!0});break;case"throw":o.reject(e);break;default:o.resolve({value:e,done:!1})}o=o.next,o?r(o.key,o.arg):u=null}var o,u;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new e(t.apply(this,arguments))}},await:function(e){return new t(e)}}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),wt=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Nt=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},xt=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},Mt=function(t){return 0===t.lastIndexOf("xml:",0)?"http://www.w3.org/XML/1998/namespace":0===t.lastIndexOf("xlink:",0)?"http://www.w3.org/1999/xlink":void 0},At=function(t,e,n){if(null==n)t.removeAttribute(e);else{var r=Mt(e);r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}},_t=function(t,e,n){t[e]=n},St=function(t,e,n){e.indexOf("-")>=0?t.setProperty(e,n):t[e]=n},Lt=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style,i=n;for(var o in i)I(i,o)&&St(r,o,i[o])}},Tt=function(t,e,n){var r="undefined"==typeof n?"undefined":kt(n);"object"===r||"function"===r?_t(t,e,n):At(t,e,n)},Pt=function(t,e,n){var r=B(t),i=r.attrs;if(i[e]!==n){var o=Dt[e]||Dt[Ct.default];o(t,e,n),i[e]=n}},Dt=R();Dt[Ct.default]=Tt,Dt.style=Lt;var jt=3,$t=[],It=function(t,e,n,r){var i=dt(t,e),o=B(i);if(!o.staticsApplied){if(n)for(var u=0;u<n.length;u+=2){var a=n[u],s=n[u+1];Pt(i,a,s)}o.staticsApplied=!0}for(var c=o.attrsArr,l=o.newAttrs,f=!c.length,p=jt,h=0;p<arguments.length;p+=2,h+=2){var d=arguments[p];if(f)c[h]=d,l[d]=void 0;else if(c[h]!==d)break;var v=arguments[p+1];(f||c[h+1]!==v)&&(c[h+1]=v,Pt(i,d,v))}if(p<arguments.length||h<c.length){for(;p<arguments.length;p+=1,h+=1)c[h]=arguments[p];for(h<c.length&&(c.length=h),p=0;p<c.length;p+=2){var y=c[p],m=c[p+1];l[y]=m}for(var g in l)Pt(i,g,l[g]),l[g]=void 0}return i},Rt=function(t,e,n){$t[0]=t,$t[1]=e,$t[2]=n},Vt=function(t,e){$t.push(t),$t.push(e)},Bt=function(){var t=It.apply(null,$t);return $t.length=0,t},Ft=function(t){var e=vt();return e},qt=function(t,e,n,r){return It.apply(null,arguments),Ft(t)},zt=function(t,e){var n=yt(),r=B(n);if(r.text!==t){r.text=t;for(var i=t,o=1;o<arguments.length;o+=1){var u=arguments[o];i=u(i)}n.data=i}return n},Ht=function(){function t(){Ot(this,t)}return t.close=function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){return close.apply(void 0,arguments)}),t.skip=function(){return bt.apply(void 0,arguments)},t.skipNode=function(){return Et.apply(void 0,arguments)},t.importNode=function(){return F.apply(void 0,arguments)},t.currentElement=function(){return mt.apply(void 0,arguments)},t.currentPointer=function(){return gt.apply(void 0,arguments)},t.elementOpen=function(){return It.apply(void 0,arguments)},t.elementOpenStart=function(){return Rt.apply(void 0,arguments)},t.elementOpenEnd=function(){return Bt.apply(void 0,arguments)},t.elementClose=function(){return Ft.apply(void 0,arguments)},t.elementVoid=function(){return qt.apply(void 0,arguments)},t.attr=function(){return Vt.apply(void 0,arguments)},t.text=function(t){"undefined"==typeof t&&(t=""),zt(t)},t.applyAttr=function(){return At.apply(void 0,arguments)},t.applyProp=function(){return _t.apply(void 0,arguments)},t.patch=function(){return it.apply(void 0,arguments)},t.patchOuter=function(){return ot.apply(void 0,arguments)},wt(t,null,[{key:"symbols",get:function(){return Ct}},{key:"attributes",get:function(){return Dt}},{key:"notifications",get:function(){return U}}]),t}(),Ut=/^\s{2,}/g,Xt=/\>\s+\</g,Gt=/(<\/?([a-zA-Z1-9\-]*)([^>]*)>?)/m,Jt=/((?:.|\n)*?)(?:\/?>|<|$)/,Yt=/[\'\"\/\s]/,Zt=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],Kt=/\/>$/,Qt=function(){function t(e){Ot(this,t),this.data=e.replace(/\n/g,"").replace(Xt,"><"),this.restart()}return t.prototype.restart=function(){this.setCurrent(this.data)},t.prototype.setCurrent=function(t){"string"==typeof t&&(this.current=t.replace(Ut," "))},t.prototype.ended=function(){return!this.current},t.prototype.next=function(){var e=!1;if(!this.ended()){var n=void 0,r=this.current;if("<"!==r[0])if(">"===r[0]||"/"===r[0]&&">"===r[1]){var i=!1;"/"===r[0]?(n=[r,"/>"],i=!0):n=[r,">"],e={chunk:r,selfClosing:i,type:t.OPEN_ELEMENT_END}}else n=r.match(Jt),e={chunk:r,type:t.CONTENT,content:n[1]};else if(n=r.match(Gt),"/"===r[1])e={chunk:r,type:t.CLOSE_ELEMENT,tag:n[2]};else{var o=n[1];e=">"===o[o.length-1]?{chunk:r,type:t.OPEN_ELEMENT,continue:!1,tag:n[2],selfClosing:t.isSelfClosing(n[2])||t.isSelfClosing(o),props:t.convertProps(n[3],!0)}:{chunk:r,type:t.OPEN_ELEMENT,continue:!0,tag:n[2],selfClosing:t.isSelfClosing(n[2]),props:t.convertProps(n[3])}}n&&n[1]!==r?this.setCurrent(r.substring(n[1].length)):this.setCurrent("")}return e},t.isSelfClosing=function(t){return Zt.indexOf(t.toLowerCase())!==-1||!!t.match(Kt)},t.convertProps=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n={};if(t){for(var r=!1,i=!1,o=!1,u=null,a=0,s=t.length;a<s;a++){var c=t[a];"="===c?(r||(u=void 0),n[u]=!1,r=!1,o=!0):c.match(/[\s|\n]/)?i?(n[u]=n[u]||"",n[u]+=c):r?u&&(n[u]=!0,u=null,r=!1):o&&(u=null,o=!1):'"'!==c&&"'"!==c||null===u?o?(n[u]=n[u]||"",n[u]+=c):(r=!0,u=u||"",""===u&&c.match(Yt)||(u+=c)):o&&n[u]!==!1?(u=null,r=!1,i=!1):(i=!0,n[u]=n[u]||"")}r&&u?n[u]=e:i&&(n[u]=!1)}return n},wt(t,null,[{key:"OPEN_ELEMENT",get:function(){return"OPEN_ELEMENT"}},{key:"OPEN_ELEMENT_END",get:function(){return"OPEN_ELEMENT_END"}},{key:"CLOSE_ELEMENT",get:function(){return"CLOSE_ELEMENT"}},{key:"CONTENT",get:function(){return"CONTENT"}}]),t}(),Wt=function(){function t(e){Ot(this,t),this.invocations=[],this.$=e}return t.prototype.addChunk=function(t){for(var e=this,n="",r=new Qt(t),u=r.next();u;){switch(u.type){case Qt.OPEN_ELEMENT:u.continue?(n+=this.genElementOpenStart(u),this.setElementOpen(u.tag)):n+=this.genElementOpen(u);break;case Qt.OPEN_ELEMENT_END:n+=this.genElementOpenEnd(u),this.clearElementOpen();break;case Qt.CLOSE_ELEMENT:n+=this.genElementClose(u);break;case Qt.CONTENT:if(this.isElementOpen()){var a=Qt.convertProps(u.content);a&&i(a,function(t,r){"undefined"===t&&r===!1||("undefined"===t?e.hasLastAttr()&&(n+=e.fillLastAttr(o(r))):n+=r===!1?e.setLastAttr("'"+t+"'"):e.addProperty("'"+t+"'",o(r)))})}else n+=this.addText(u.content)}u=r.next()}return n},t.prototype.invokeDOM=function(){var t=this;this.invocations.forEach(function(e,n){t.invocations[n]=!0})},t.prototype.queueInvocation=function(){return this.invocations.push(!1)-1},t.prototype.checkInvocation=function(t){return this.invocations[t]},t.prototype.interpolate=function(t,e){this.invokeDOM();var n=this.queueInvocation(),r="("+t.generate(e)+").apply("+this.$.scope+", "+this.$.args+")\n";return this.checkInvocation(n)?r:this.isElementOpen()?this.hasLastAttr()?this.fillLastAttr(r):(this.setLastAttr(r),""):this.$.helper+".text("+r+");"},t.prototype.genElementOpen=function(t){this.invokeDOM();var e="",n=u(t.props);return e+=t.selfClosing?this.$.helper+".elementVoid('"+t.tag+"'"+(n.length?", null, null, "+n.join(", "):"")+");":this.$.helper+".elementOpen('"+t.tag+"'"+(n.length?", null, null, "+n.join(", "):"")+");",t.props.outer&&(e+=this.$.helper+".skip();"),e},t.prototype.genElementOpenStart=function(t){var e=this;this.invokeDOM();var n=this.$.helper+".elementOpenStart('"+t.tag+"');";return t.props&&(i(t.props,function(r,i){i===!1?(n+=e.setLastAttr("'"+r+"'"),delete t.props[r]):n+=e.$.helper+".attr('"+r+"', "+o(i)+");"}),t.props.outer&&(n+=this.$.helper+".skip();")),n},t.prototype.genElementOpenEnd=function(t){this.invokeDOM();var e=this.$.helper+".elementOpenEnd();",n=this.getElementOpen();return(t.selfClosing||Qt.isSelfClosing(n))&&(t.tag||(t.tag=n),e+=this.genElementClose(t)),e},t.prototype.genElementClose=function(t){return this.invokeDOM(),this.clearLastAttr(),this.$.helper+".elementClose('"+t.tag+"');"},t.prototype.addText=function(t){return this.invokeDOM(),this.$.helper+".text('"+t+"');"},t.prototype.addProperty=function(t,e){return this.invokeDOM(),this.$.helper+".attr("+t+", "+e+");"},t.prototype.setLastAttr=function(t){var e="";return this.lastAttr=t,e},t.prototype.fillLastAttr=function(t){var e=this.getLastAttr();return this.clearLastAttr(),this.addProperty(e,t)},t.prototype.getLastAttr=function(){return this.lastAttr},t.prototype.hasLastAttr=function(){return!!this.lastAttr},t.prototype.clearLastAttr=function(){this.lastAttr=null},t.prototype.setElementOpen=function(t){this.lastElement=t},t.prototype.getElementOpen=function(){return this.lastElement},t.prototype.isElementOpen=function(){return!!this.lastElement},t.prototype.clearElementOpen=function(){this.lastElement=null},t}(),te=function(){function t(e){Ot(this,t),this.start=s(e.start),this.end=s(e.end||e.start),this.contextStart=s(["{"]),this.contextEnd=s(["}"])}return t.prototype.interpolate=function(t,e){for(var n=this.start,r=this.end,i=this.contextStart,o=this.contextEnd,u=t.length,a=0,s="",c=0;a<u;){var l=t[a],f=t.slice(a);0===c&&f.match(n)?(c=1,s&&(e({interpolate:!1,chunk:s}),s=""),a+=f.match(n)[0].length):1===c&&f.match(r)?(a+=f.match(r)[0].length,e({interpolate:!0,chunk:s}),s="",c=0):(f.match(o)?(c>1&&c--,1===c&&a===u-1&&(e({interpolate:!0,chunk:s}),s="")):f.match(i)&&c>0&&c++,s+=l,a++)}s&&e({interpolate:c>=1,chunk:s})},t}(),ee="$$$skin",ne="$$$this",re="$$$arguments",ie=new te({start:["`"]}),oe=new te({start:["${"],end:["}"]}),ue=function(){function t(e,n){Ot(this,t),this.parent=n,this.render=n instanceof t?n.render:new Wt({helper:ee,scope:ne,args:re}),this.body=e}return t.prototype.generate=function(t,e){return e=e||this.body,"function("+ee+(t.length?", "+t.join(", "):"")+") { "+e+" }"},t.prototype.compile=function(){for(var t=this,e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var i=this.generate(n);try{var o=function(){var t=new Function("var "+ne+" = this;\nvar "+re+" = arguments;\n("+i+").apply("+ne+", "+re+");"),e=function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return t.call.apply(t,[this,Ht].concat(n))};return e.render=t,{v:e}}();if("object"===("undefined"==typeof o?"undefined":kt(o)))return o.v}catch(e){var u=function(){var n=t.body;return{v:function(){var t=new Error("Malformed template. "+n+" => "+i);throw t.original=e,t}}}();if("object"===("undefined"==typeof u?"undefined":kt(u)))return u.v}},t}(),ae=function(t){function e(){return Ot(this,e),xt(this,t.apply(this,arguments))}return Nt(e,t),e.prototype.chunk=function(){var t=this,e=[];return ie.interpolate(this.body,function(n){n.interpolate?e.push(new se(n.chunk,t)):e.push(n.chunk)}),e},e.prototype.generate=function(e){var n=this,r="return ",i=this.chunk();return i.forEach(function(t,i){t instanceof se?r+=n.render.interpolate(t,e):(0===i&&(t=t.replace(/^\s*/,"")),r+=""+t)}),r+=";",t.prototype.generate.call(this,e,r)},e}(ue),se=function(t){function e(){return Ot(this,e),xt(this,t.apply(this,arguments))}return Nt(e,t),e.prototype.chunk=function(){var t=this,e=[];return oe.interpolate(this.body,function(n){n.interpolate?e.push(new ae(n.chunk,t)):e.push(n.chunk)}),e},e.prototype.generate=function(e){var n=this,r="",i=this.chunk();return i.forEach(function(t){r+=t instanceof ae?n.render.interpolate(t,e):n.render.addChunk(t)}),t.prototype.generate.call(this,e,r)},e}(ue),ce=function(){function t(){Ot(this,t);for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var i=n.pop();if(i instanceof t)this.factory=i.factory,this.scope=i.scope;else if("function"==typeof i)this.factory=i;else{var o;this.factory=(o=new se(i)).compile.apply(o,n)}}return wt(t,null,[{key:"IDOM",get:function(){return Ht}}]),t.prototype.setScope=function(t){return this.scope=t,this},t.prototype.render=function(t){for(var e=this,n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return Ht.patch(t,function(){return e.factory.apply(e.scope||null,r)}),this},t}(),le=function(t){return function(t){function e(){Ot(this,e);var n=xt(this,t.call(this)),r=n.template;return r&&!n.hasOwnProperty("template")&&!function(){var t=n.constructor;"string"==typeof r&&(r=new ce(r),Object.defineProperty(t.prototype,"template",{value:r}));var e=new ce(r).setScope(n);Object.defineProperty(n,"template",{value:function(){return e.render(n)}})}(),n}return Nt(e,t),e}(t)},fe=ce.IDOM,pe=fe.notifications.nodesCreated;fe.notifications.nodesCreated=function(t){he&&t.forEach(function(t){t.nodeType===Node.ELEMENT_NODE&&t.hasAttribute("outer")&&(he.outer=t)}),pe&&pe(t)};var he=void 0,de=function(t){return function(t){function e(){Ot(this,e);var n=xt(this,t.call(this));return n.hasOwnProperty("template")&&(n.__initialChildren=[].slice.call(n.childNodes).map(function(t){return n.removeChild(t),t}),n.childrenObserver=new MutationObserver(function(t){t.forEach(function(t){t.addedNodes.length&&he!==n&&n.outer&&c(n,t.addedNodes)})})),n}return Nt(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.childrenObserver&&this.childrenObserver.observe(this,{childList:!0})},e.prototype.disconnectedCallback=function(){t.prototype.disconnectedCallback.call(this),this.childrenObserver&&this.childrenObserver.disconnect()},e.prototype.render=function(){he=this,t.prototype.render.call(this),he=null,this.childrenObserver&&this.__initialChildren&&this.outer&&(c(this,this.__initialChildren),delete this.__initialChildren)},e}(t)},ve=void 0;try{new self.CustomEvent("test");ve=self.CustomEvent}catch(t){ve=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},ve.prototype=self.CustomEvent.prototype}var ye={components:{},define:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.components[t.toLowerCase()]={is:t,Ctr:e,config:n}},get:function(t){if(f(t))return this.components[t.toLowerCase()];if(l(t))for(var e in this.components){var n=this.components[e];if(n.Ctr===t)return n}}},me="connectedCallback",ge="disconnectedCallback",be="attributeChangedCallback",Ee=Object.freeze({getComponent:y,connect:m,disconnect:g,update:b,bind:E,create:C,createElement:k,appendChild:O,removeChild:w,setAttribute:N,removeAttribute:x}),Ce=function(t){return function(t){function e(){return Ot(this,e),xt(this,t.apply(this,arguments))}return Nt(e,t),e.prototype.connectedCallback=function(){},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},wt(e,[{key:"is",get:function(){return this.getAttribute("is")||this.localName}}]),e}(t)},ke=Object.defineProperty,Oe=function(){function t(e){var n=this;Ot(this,t),this._=[],e=e||[],d(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),n.validateType(t)&&n.validator(t)){var e=n.value;return e!==t&&(n.value=t,n.changed(t,e)),!0}return!1}}return t.prototype.observe=function(t){return(l(t)||f(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){for(var n=0,r=this._.length;n<r;n++){var i=this._[n];f(i)?this.scope[i].call(this.scope,this,t,e):i(this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=p(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return f(t)?(this.attrRequested=!1,this.attrName=t):this.attrRequested=!!t,this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var e=this;return l(t)&&(this.getterFn=function(){return t(e.value)}),this},t.prototype.setter=function(t){return l(t)&&(this._setter=t),this},t.prototype.validate=function(t){return l(t)&&(this.validator=t),this},t.prototype.validateType=function(t){if(null===t||void 0===t)return!0;var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}throw new TypeError("Invalid `"+t+'` value for "'+this.name+'" property'+(this.scope?" for "+this.scope.is:"")+".")},t.prototype.init=function(t){this.scope=t,ke(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),h(this.defaultValue)||this.setter(this.defaultValue)},t}();ke(M,"ANY",{get:function(){return M()}}),ke(M,"STRING",{get:function(){return M(String)}}),ke(M,"BOOLEAN",{get:function(){return M(Boolean)}}),ke(M,"NUMBER",{get:function(){return M(Number)}});var we=function(t){return function(t){function e(){Ot(this,e);var n=xt(this,t.call(this)),r=n.properties;r?(d(r)||(r=[r]),r=r.reduce(function(t,e){for(var n in e)t[n]=M(e[n]);return t},{})):r={},Object.defineProperty(n,"properties",{value:r,writable:!1,configurable:!0});var i=function(t){var e=r[t];e.named(t).init(n);var i=e.attrName,o=e.eventName;(i||o)&&e.observe(function(){i&&_(n,i,n[e.name]),o&&v(n,o)})};for(var o in r)i(o);return n}return Nt(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],i=r.attrName;i&&(h(this[r.name])?this.hasAttribute(i)&&(this[r.name]=A(r,this.getAttribute(i))):_(this,i,this[r.name]))}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var u=i[o];if(u.attrName===e)return void(this[u.name]=A(u,r))}},e.prototype.observeProperty=function(t,e){this.properties[t].observe(e)},e}(t)},Ne=Element.prototype,xe=Ne.matches||Ne.matchesSelector||Ne.mozMatchesSelector||Ne.msMatchesSelector||Ne.oMatchesSelector||Ne.webkitMatchesSelector,Me=/([^\s]+)(.*)?/,Ae=function(t){return function(t){function e(){Ot(this,e);var n=xt(this,t.call(this)),r=n.events||{},i=function(t){var e=f(r[t])?n[r[t]]:r[t];if(!l(e))throw new TypeError("Invalid callback for event.");var i=t.match(Me),o=i[1],u=(i[2]||"").trim();u?n.delegate(o,u,e):n.addEventListener(o,function(t){e.call(n,t,n)})};for(var o in r)i(o);return n}return Nt(e,t),e.prototype.delegate=function(t,e,n){var r=this;this.addEventListener(t,function(t){for(var i=t.target;i&&i!==r;)xe.call(i,e)&&n.call(r,t,i),i=i.parentNode})},e.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return v(this,t,e,n,r)},e}(t)},_e=document,Se=function(t){return function(t){function e(){Ot(this,e);var n=xt(this,t.call(this));if(!n.styleElem){var r=n.constructor;Object.defineProperty(r.prototype,"styleElem",{value:S(n.is)})}return n.updateCSS(),n}return Nt(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.classList.add(this.is)},e.prototype.updateCSS=function(){var t=this.css;t&&L(this.styleElem,t)},e}(t)},Le=function(t){return function(t){function e(){Ot(this,e);var n=xt(this,t.call(this));if(n.template){var r=n.properties;if(r){var i=function(){n.render()};for(var o in r)r[o].observe(i)}}return n}return Nt(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.template&&this.render()},e.prototype.render=function(){var t=this.template;if(l(t))t();else{if(!f(t))throw new Error("Invalid template property.");this.innerHTML=t}},e}(t)},Te=Array.prototype.reduce||function(t){var e=this,n=e.length,r=0,i=void 0;if(2===arguments.length)i=arguments[1];else{for(;r<n&&!(r in e);)r++;i=e[r++]}for(;r<n;r++)r in e&&(i=t(i,e[r],r,e));return i},Pe=function(){function t(e){Ot(this,t),e=e||function(){function t(){Ot(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){var t=[].slice.call(arguments,0);return Te.call(t,function(t,e){return e(t)},this.superclass)},t}(),De=function(t){return new Pe(t)},je=Ee,$e={ComponentMixin:Ce,PropertiesMixin:we,EventsMixin:Ae,StyleMixin:Se,TemplateMixin:Le},Ie={dispatch:v},Re=function(t){function e(){return Ot(this,e),xt(this,t.apply(this,arguments))}return Nt(e,t),e}(De(P(self.HTMLElement)).with($e.ComponentMixin,$e.PropertiesMixin,$e.StyleMixin,$e.EventsMixin,$e.TemplateMixin));$e.SkinTemplateMixin=le,$e.OuterMixin=de;var Ve=ce.IDOM,Be=function(t){function e(){return Ot(this,e),xt(this,t.apply(this,arguments))}return Nt(e,t),e}(De(Re).with(le,de));t.mix=De,t.MIXINS=$e,t.Template=ce,t.IDOM=Ve,t.BaseComponent=Be,t.registry=ye,t.render=j,t.define=D,t.prop=M,t.shim=P,t.HELPERS=Ie,t.DOM=je,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-skin.js.map
