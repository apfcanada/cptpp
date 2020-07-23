'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var accessibleAutocomplete_min = createCommonjsModule(function (module, exports) {
(function webpackUniversalModuleDefinition(e,t){module.exports=t();})(window,function(){return function(n){var r={};function o(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}return o.m=n,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n});},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=37)}([function(e,t,n){var m=n(1),v=n(6),y=n(7),g=n(16),_=n(18),b="prototype",w=function(e,t,n){var r,o,i,u,a=e&w.F,s=e&w.G,l=e&w.S,c=e&w.P,p=e&w.B,f=s?m:l?m[t]||(m[t]={}):(m[t]||{})[b],d=s?v:v[t]||(v[t]={}),h=d[b]||(d[b]={});for(r in s&&(n=t),n)i=((o=!a&&f&&f[r]!==undefined)?f:n)[r],u=p&&o?_(i,m):c&&"function"==typeof i?_(Function.call,i):i,f&&g(f,r,i,e&w.U),d[r]!=i&&y(d,r,u),c&&h[r]!=i&&(h[r]=i);};m.core=v,w.F=1,w.G=2,w.S=4,w.P=8,w.B=16,w.W=32,w.U=64,w.R=128,e.exports=w;},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n);},function(e,t){e.exports=function(e){return "object"==typeof e?null!==e:"function"==typeof e};},function(e,t,n){e.exports=!n(4)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a});},function(e,t){e.exports=function(e){try{return !!e()}catch(t){return !0}};},function(e,t,n){n.r(t),n.d(t,"h",function(){return r}),n.d(t,"createElement",function(){return r}),n.d(t,"cloneElement",function(){return i}),n.d(t,"Component",function(){return g}),n.d(t,"render",function(){return _}),n.d(t,"rerender",function(){return f}),n.d(t,"options",function(){return E});var s=function s(){},E={},l=[],c=[];function r(e,t){var n,r,o,i,u=c;for(i=arguments.length;2<i--;)l.push(arguments[i]);for(t&&null!=t.children&&(l.length||l.push(t.children),delete t.children);l.length;)if((r=l.pop())&&r.pop!==undefined)for(i=r.length;i--;)l.push(r[i]);else "boolean"==typeof r&&(r=null),(o="function"!=typeof e)&&(null==r?r="":"number"==typeof r?r=String(r):"string"!=typeof r&&(o=!1)),o&&n?u[u.length-1]+=r:u===c?u=[r]:u.push(r),n=o;var a=new s;return a.nodeName=e,a.children=u,a.attributes=null==t?undefined:t,a.key=null==t?undefined:t.key,E.vnode!==undefined&&E.vnode(a),a}function M(e,t){for(var n in t)e[n]=t[n];return e}var o="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;function i(e,t){return r(e.nodeName,M(M({},e.attributes),t),2<arguments.length?[].slice.call(arguments,2):e.children)}var p=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,u=[];function a(e){!e._dirty&&(e._dirty=!0)&&1==u.push(e)&&(E.debounceRendering||o)(f);}function f(){var e,t=u;for(u=[];e=t.pop();)e._dirty&&V(e);}function N(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function I(e){var t=M({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(n!==undefined)for(var r in n)t[r]===undefined&&(t[r]=n[r]);return t}function k(e){var t=e.parentNode;t&&t.removeChild(e);}function v(e,t,n,r,o){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)n&&n(null),r&&r(e);else if("class"!==t||o)if("style"===t){if(r&&"string"!=typeof r&&"string"!=typeof n||(e.style.cssText=r||""),r&&"object"==typeof r){if("string"!=typeof n)for(var i in n)i in r||(e.style[i]="");for(var i in r)e.style[i]="number"==typeof r[i]&&!1===p.test(i)?r[i]+"px":r[i];}}else if("dangerouslySetInnerHTML"===t)r&&(e.innerHTML=r.__html||"");else if("o"==t[0]&&"n"==t[1]){var u=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),r?n||e.addEventListener(t,d,u):e.removeEventListener(t,d,u),(e._listeners||(e._listeners={}))[t]=r;}else if("list"!==t&&"type"!==t&&!o&&t in e){try{e[t]=null==r?"":r;}catch(s){}null!=r&&!1!==r||"spellcheck"==t||e.removeAttribute(t);}else {var a=o&&t!==(t=t.replace(/^xlink:?/,""));null==r||!1===r?a?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof r&&(a?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),r):e.setAttribute(t,r));}else e.className=r||"";}function d(e){return this._listeners[e.type](E.event&&E.event(e)||e)}var A=[],P=0,j=!1,L=!1;function T(){for(var e;e=A.pop();)E.afterMount&&E.afterMount(e),e.componentDidMount&&e.componentDidMount();}function B(e,t,n,r,o,i){P++||(j=null!=o&&o.ownerSVGElement!==undefined,L=null!=e&&!("__preactattr_"in e));var u=D(e,t,n,r,i);return o&&u.parentNode!==o&&o.appendChild(u),--P||(L=!1,i||T()),u}function D(e,t,n,r,o){var i=e,u=j;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&e.splitText!==undefined&&e.parentNode&&(!e._component||o)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),F(e,!0))),i["__preactattr_"]=!0,i;var a=t.nodeName;if("function"==typeof a)return function d(e,t,n,r){var o=e&&e._component,i=o,u=e,a=o&&e._componentConstructor===t.nodeName,s=a,l=I(t);for(;o&&!s&&(o=o._parentComponent);)s=o.constructor===t.nodeName;o&&s&&(!r||o._component)?(U(o,l,3,n,r),e=o.base):(i&&!a&&(q(i),e=u=null),o=R(t.nodeName,l,n),e&&!o.nextBase&&(o.nextBase=e,u=null),U(o,l,1,n,r),e=o.base,u&&e!==u&&(u._component=null,F(u,!1)));return e}(e,t,n,r);if(j="svg"===a||"foreignObject"!==a&&j,a=String(a),(!e||!N(e,a))&&(i=function h(e,t){var n=t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e);return n.normalizedNodeName=e,n}(a,j),e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),F(e,!0);}var s=i.firstChild,l=i["__preactattr_"],c=t.children;if(null==l){l=i["__preactattr_"]={};for(var p=i.attributes,f=p.length;f--;)l[p[f].name]=p[f].value;}return !L&&c&&1===c.length&&"string"==typeof c[0]&&null!=s&&s.splitText!==undefined&&null==s.nextSibling?s.nodeValue!=c[0]&&(s.nodeValue=c[0]):(c&&c.length||null!=s)&&function S(e,t,n,r,o){var i,u,a,s,l,c=e.childNodes,p=[],f={},d=0,h=0,m=c.length,v=0,y=t?t.length:0;if(0!==m)for(var g=0;g<m;g++){var _=c[g],b=_["__preactattr_"],w=y&&b?_._component?_._component.__key:b.key:null;null!=w?(d++,f[w]=_):(b||(_.splitText!==undefined?!o||_.nodeValue.trim():o))&&(p[v++]=_);}if(0!==y)for(var g=0;g<y;g++){s=t[g],l=null;var w=s.key;if(null!=w)d&&f[w]!==undefined&&(l=f[w],f[w]=undefined,d--);else if(h<v)for(i=h;i<v;i++)if(p[i]!==undefined&&(x=u=p[i],C=o,"string"==typeof(O=s)||"number"==typeof O?x.splitText!==undefined:"string"==typeof O.nodeName?!x._componentConstructor&&N(x,O.nodeName):C||x._componentConstructor===O.nodeName)){l=u,p[i]=undefined,i===v-1&&v--,i===h&&h++;break}l=D(l,s,n,r),a=c[g],l&&l!==e&&l!==a&&(null==a?e.appendChild(l):l===a.nextSibling?k(a):e.insertBefore(l,a));}var x,O,C;if(d)for(var g in f)f[g]!==undefined&&F(f[g],!1);for(;h<=v;)(l=p[v--])!==undefined&&F(l,!1);}(i,c,n,r,L||null!=l.dangerouslySetInnerHTML),function m(e,t,n){var r;for(r in n)t&&null!=t[r]||null==n[r]||v(e,r,n[r],n[r]=undefined,j);for(r in t)"children"===r||"innerHTML"===r||r in n&&t[r]===("value"===r||"checked"===r?e[r]:n[r])||v(e,r,n[r],n[r]=t[r],j);}(i,t.attributes,l),j=u,i}function F(e,t){var n=e._component;n?q(n):(null!=e["__preactattr_"]&&e["__preactattr_"].ref&&e["__preactattr_"].ref(null),!1!==t&&null!=e["__preactattr_"]||k(e),h(e));}function h(e){for(e=e.lastChild;e;){var t=e.previousSibling;F(e,!0),e=t;}}var m=[];function R(e,t,n){var r,o=m.length;for(e.prototype&&e.prototype.render?(r=new e(t,n),g.call(r,t,n)):((r=new g(t,n)).constructor=e,r.render=y);o--;)if(m[o].constructor===e)return r.nextBase=m[o].nextBase,m.splice(o,1),r;return r}function y(e,t,n){return this.constructor(e,n)}function U(e,t,n,r,o){e._disable||(e._disable=!0,e.__ref=t.ref,e.__key=t.key,delete t.ref,delete t.key,"undefined"==typeof e.constructor.getDerivedStateFromProps&&(!e.base||o?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,r)),r&&r!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=r),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&!1===E.syncComponentUpdates&&e.base?a(e):V(e,1,o)),e.__ref&&e.__ref(e));}function V(e,t,n,r){if(!e._disable){var o,i,u,a=e.props,s=e.state,l=e.context,c=e.prevProps||a,p=e.prevState||s,f=e.prevContext||l,d=e.base,h=e.nextBase,m=d||h,v=e._component,y=!1,g=f;if(e.constructor.getDerivedStateFromProps&&(s=M(M({},s),e.constructor.getDerivedStateFromProps(a,s)),e.state=s),d&&(e.props=c,e.state=p,e.context=f,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(a,s,l)?y=!0:e.componentWillUpdate&&e.componentWillUpdate(a,s,l),e.props=a,e.state=s,e.context=l),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!y){o=e.render(a,s,l),e.getChildContext&&(l=M(M({},l),e.getChildContext())),d&&e.getSnapshotBeforeUpdate&&(g=e.getSnapshotBeforeUpdate(c,p));var _,b,w=o&&o.nodeName;if("function"==typeof w){var x=I(o);(i=v)&&i.constructor===w&&x.key==i.__key?U(i,x,1,l,!1):(_=i,e._component=i=R(w,x,l),i.nextBase=i.nextBase||h,i._parentComponent=e,U(i,x,0,l,!1),V(i,1,n,!0)),b=i.base;}else u=m,(_=v)&&(u=e._component=null),(m||1===t)&&(u&&(u._component=null),b=function B(t,n,r,o,i,u){P++||(j=null!=i&&i.ownerSVGElement!==undefined,L=null!=t&&!("__preactattr_"in t));var a=D(t,n,r,o,u);return i&&a.parentNode!==i&&i.appendChild(a),--P||(L=!1,u||T()),a}(u,o,l,n||!d,m&&m.parentNode,!0));if(m&&b!==m&&i!==v){var O=m.parentNode;O&&b!==O&&(O.replaceChild(b,m),_||(m._component=null,F(m,!1)));}if(_&&q(_),(e.base=b)&&!r){for(var C=e,S=e;S=S._parentComponent;)(C=S).base=b;b._component=C,b._componentConstructor=C.constructor;}}for(!d||n?A.unshift(e):y||(e.componentDidUpdate&&e.componentDidUpdate(c,p,g),E.afterUpdate&&E.afterUpdate(e));e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);P||r||T();}}function q(e){E.beforeUnmount&&E.beforeUnmount(e);var t=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?q(n):t&&(t["__preactattr_"]&&t["__preactattr_"].ref&&t["__preactattr_"].ref(null),k(e.nextBase=t),m.push(e),h(t)),e.__ref&&e.__ref(null);}function g(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{},this._renderCallbacks=[];}function _(e,t,n){return B(n,e,{},!1,t,!1)}M(g.prototype,{setState:function(e,t){this.prevState||(this.prevState=this.state),this.state=M(M({},this.state),"function"==typeof e?e(this.state,this.props):e),t&&this._renderCallbacks.push(t),a(this);},forceUpdate:function(e){e&&this._renderCallbacks.push(e),V(this,2);},render:function _(){}});var b={h:r,createElement:r,cloneElement:i,Component:g,render:_,rerender:f,options:E};t["default"]=b;},function(e,t){var n=e.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n);},function(e,t,n){var r=n(8),o=n(40);e.exports=n(3)?function(e,t,n){return r.f(e,t,o(1,n))}:function(e,t,n){return e[t]=n,e};},function(e,t,n){var o=n(9),i=n(38),u=n(39),a=Object.defineProperty;t.f=n(3)?Object.defineProperty:function(e,t,n){if(o(e),t=u(t,!0),o(n),i)try{return a(e,t,n)}catch(r){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return "value"in n&&(e[t]=n.value),e};},function(e,t,n){var r=n(2);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e};},function(e,t){var n=0,r=Math.random();e.exports=function(e){return "Symbol(".concat(e===undefined?"":e,")_",(++n+r).toString(36))};},function(e,t,n){var r=n(22);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return "String"==r(e)?e.split(""):Object(e)};},function(e,t){e.exports=function(e){if(e==undefined)throw TypeError("Can't call method on  "+e);return e};},function(e,t,n){var r=n(4);e.exports=function(e,t){return !!e&&r(function(){t?e.call(null,function(){},1):e.call(null);})};},function(e,t,n){var r=n(0);r(r.S+r.F,"Object",{assign:n(41)});},function(e,t,n){var r=n(2),o=n(1).document,i=r(o)&&r(o.createElement);e.exports=function(e){return i?o.createElement(e):{}};},function(e,t,n){var i=n(1),u=n(7),a=n(17),s=n(10)("src"),r="toString",o=Function[r],l=(""+o).split(r);n(6).inspectSource=function(e){return o.call(e)},(e.exports=function(e,t,n,r){var o="function"==typeof n;o&&(a(n,"name")||u(n,"name",t)),e[t]!==n&&(o&&(a(n,s)||u(n,s,e[t]?""+e[t]:l.join(String(t)))),e===i?e[t]=n:r?e[t]?e[t]=n:u(e,t,n):(delete e[t],u(e,t,n)));})(Function.prototype,r,function(){return "function"==typeof this&&this[s]||o.call(this)});},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)};},function(e,t,n){var i=n(19);e.exports=function(r,o,e){if(i(r),o===undefined)return r;switch(e){case 1:return function(e){return r.call(o,e)};case 2:return function(e,t){return r.call(o,e,t)};case 3:return function(e,t,n){return r.call(o,e,t,n)}}return function(){return r.apply(o,arguments)}};},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e};},function(e,t,n){var r=n(42),o=n(28);e.exports=Object.keys||function(e){return r(e,o)};},function(e,t,n){var r=n(11),o=n(12);e.exports=function(e){return r(o(e))};},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)};},function(e,t,n){var s=n(21),l=n(24),c=n(43);e.exports=function(a){return function(e,t,n){var r,o=s(e),i=l(o.length),u=c(n,i);if(a&&t!=t){for(;u<i;)if((r=o[u++])!=r)return !0}else for(;u<i;u++)if((a||u in o)&&o[u]===t)return a||u||0;return !a&&-1}};},function(e,t,n){var r=n(25),o=Math.min;e.exports=function(e){return 0<e?o(r(e),9007199254740991):0};},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(0<e?r:n)(e)};},function(e,t,n){var r=n(27)("keys"),o=n(10);e.exports=function(e){return r[e]||(r[e]=o(e))};},function(e,t,n){var r=n(6),o=n(1),i="__core-js_shared__",u=o[i]||(o[i]={});(e.exports=function(e,t){return u[e]||(u[e]=t!==undefined?t:{})})("versions",[]).push({version:r.version,mode:n(44)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"});},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");},function(e,t,n){var r=n(12);e.exports=function(e){return Object(r(e))};},function(e,t,n){var r=n(8).f,o=Function.prototype,i=/^\s*function ([^ (]*)/;"name"in o||n(3)&&r(o,"name",{configurable:!0,get:function(){try{return (""+this).match(i)[1]}catch(e){return ""}}});},function(e,t,n){var r=n(0),o=n(32)(1);r(r.P+r.F*!n(13)([].map,!0),"Array",{map:function(e){return o(this,e,arguments[1])}});},function(e,t,n){var _=n(18),b=n(11),w=n(29),x=n(24),r=n(47);e.exports=function(p,e){var f=1==p,d=2==p,h=3==p,m=4==p,v=6==p,y=5==p||v,g=e||r;return function(e,t,n){for(var r,o,i=w(e),u=b(i),a=_(t,n,3),s=x(u.length),l=0,c=f?g(e,s):d?g(e,0):undefined;l<s;l++)if((y||l in u)&&(o=a(r=u[l],l,i),p))if(f)c[l]=o;else if(o)switch(p){case 3:return !0;case 5:return r;case 6:return l;case 2:c.push(r);}else if(m)return !1;return v?-1:h||m?m:c}};},function(e,t,n){var r=n(22);e.exports=Array.isArray||function(e){return "Array"==r(e)};},function(e,t,n){var r=n(27)("wks"),o=n(10),i=n(1).Symbol,u="function"==typeof i;(e.exports=function(e){return r[e]||(r[e]=u&&i[e]||(u?i:o)("Symbol."+e))}).store=r;},function(e,t,n){var r=n(0),o=n(23)(!1),i=[].indexOf,u=!!i&&1/[1].indexOf(1,-0)<0;r(r.P+r.F*(u||!n(13)(i)),"Array",{indexOf:function(e){return u?i.apply(this,arguments)||0:o(this,e,arguments[1])}});},function(e,t,n){var r=n(0);r(r.S,"Object",{create:n(52)});},function(e,t,n){t.__esModule=!0,t["default"]=void 0,n(14),n(30),n(31),n(35),n(49),n(50);var r=n(5),o=function s(e){return e&&e.__esModule?e:{"default":e}}(n(51));function i(e){if(!e.element)throw new Error("element is not defined");if(!e.id)throw new Error("id is not defined");if(!e.source)throw new Error("source is not defined");Array.isArray(e.source)&&(e.source=u(e.source)),(0, r.render)((0, r.createElement)(o["default"],e),e.element);}var u=function u(n){return function(t,e){e(n.filter(function(e){return -1!==e.toLowerCase().indexOf(t.toLowerCase())}));}};i.enhanceSelectElement=function(n){if(!n.selectElement)throw new Error("selectElement is not defined");if(!n.source){var e=[].filter.call(n.selectElement.options,function(e){return e.value||n.preserveNullOptions});n.source=e.map(function(e){return e.textContent||e.innerText});}if(n.onConfirm=n.onConfirm||function(t){var e=[].filter.call(n.selectElement.options,function(e){return (e.textContent||e.innerText)===t})[0];e&&(e.selected=!0);},n.selectElement.value||n.defaultValue===undefined){var t=n.selectElement.options[n.selectElement.options.selectedIndex];n.defaultValue=t.textContent||t.innerText;}n.name===undefined&&(n.name=""),n.id===undefined&&(n.selectElement.id===undefined?n.id="":n.id=n.selectElement.id),n.autoselect===undefined&&(n.autoselect=!0);var r=document.createElement("div");n.selectElement.parentNode.insertBefore(r,n.selectElement),i(Object.assign({},n,{element:r})),n.selectElement.style.display="none",n.selectElement.id=n.selectElement.id+"-select";};var a=i;t["default"]=a;},function(e,t,n){e.exports=!n(3)&&!n(4)(function(){return 7!=Object.defineProperty(n(15)("div"),"a",{get:function(){return 7}}).a});},function(e,t,n){var o=n(2);e.exports=function(e,t){if(!o(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!o(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!o(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!o(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")};},function(e,t){e.exports=function(e,t){return {enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}};},function(e,t,n){var f=n(20),d=n(45),h=n(46),m=n(29),v=n(11),o=Object.assign;e.exports=!o||n(4)(function(){var e={},t={},n=Symbol(),r="abcdefghijklmnopqrst";return e[n]=7,r.split("").forEach(function(e){t[e]=e;}),7!=o({},e)[n]||Object.keys(o({},t)).join("")!=r})?function(e,t){for(var n=m(e),r=arguments.length,o=1,i=d.f,u=h.f;o<r;)for(var a,s=v(arguments[o++]),l=i?f(s).concat(i(s)):f(s),c=l.length,p=0;p<c;)u.call(s,a=l[p++])&&(n[a]=s[a]);return n}:o;},function(e,t,n){var u=n(17),a=n(21),s=n(23)(!1),l=n(26)("IE_PROTO");e.exports=function(e,t){var n,r=a(e),o=0,i=[];for(n in r)n!=l&&u(r,n)&&i.push(n);for(;t.length>o;)u(r,n=t[o++])&&(~s(i,n)||i.push(n));return i};},function(e,t,n){var r=n(25),o=Math.max,i=Math.min;e.exports=function(e,t){return (e=r(e))<0?o(e+t,0):i(e,t)};},function(e,t){e.exports=!1;},function(e,t){t.f=Object.getOwnPropertySymbols;},function(e,t){t.f={}.propertyIsEnumerable;},function(e,t,n){var r=n(48);e.exports=function(e,t){return new(r(e))(t)};},function(e,t,n){var r=n(2),o=n(33),i=n(34)("species");e.exports=function(e){var t;return o(e)&&("function"!=typeof(t=e.constructor)||t!==Array&&!o(t.prototype)||(t=undefined),r(t)&&null===(t=t[i])&&(t=undefined)),t===undefined?Array:t};},function(e,t,n){var r=n(0),o=n(32)(2);r(r.P+r.F*!n(13)([].filter,!0),"Array",{filter:function(e){return o(this,e,arguments[1])}});},function(e,t,n){var r=n(0);r(r.S,"Array",{isArray:n(33)});},function(e,t,n){t.__esModule=!0,t["default"]=void 0,n(14),n(36),n(30),n(31),n(35),n(55),n(58);var $=n(5),J=o(n(60)),r=o(n(61));function o(e){return e&&e.__esModule?e:{"default":e}}function X(){return (X=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);}return e}).apply(this,arguments)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var u={13:"enter",27:"escape",32:"space",38:"up",40:"down"};function Y(){return "undefined"!=typeof navigator&&!(!navigator.userAgent.match(/(iPod|iPhone|iPad)/g)||!navigator.userAgent.match(/AppleWebKit/g))}var a=function(n){function e(e){var t;return (t=n.call(this,e)||this).elementReferences={},t.state={focused:null,hovered:null,menuOpen:!1,options:e.defaultValue?[e.defaultValue]:[],query:e.defaultValue,validChoiceMade:!1,selected:null,ariaHint:!0},t.handleComponentBlur=t.handleComponentBlur.bind(i(i(t))),t.handleKeyDown=t.handleKeyDown.bind(i(i(t))),t.handleUpArrow=t.handleUpArrow.bind(i(i(t))),t.handleDownArrow=t.handleDownArrow.bind(i(i(t))),t.handleEnter=t.handleEnter.bind(i(i(t))),t.handlePrintableKey=t.handlePrintableKey.bind(i(i(t))),t.handleListMouseLeave=t.handleListMouseLeave.bind(i(i(t))),t.handleOptionBlur=t.handleOptionBlur.bind(i(i(t))),t.handleOptionClick=t.handleOptionClick.bind(i(i(t))),t.handleOptionFocus=t.handleOptionFocus.bind(i(i(t))),t.handleOptionMouseDown=t.handleOptionMouseDown.bind(i(i(t))),t.handleOptionMouseEnter=t.handleOptionMouseEnter.bind(i(i(t))),t.handleInputBlur=t.handleInputBlur.bind(i(i(t))),t.handleInputChange=t.handleInputChange.bind(i(i(t))),t.handleInputFocus=t.handleInputFocus.bind(i(i(t))),t.pollInputElement=t.pollInputElement.bind(i(i(t))),t.getDirectInputChanges=t.getDirectInputChanges.bind(i(i(t))),t}(function r(e,t){e.prototype=Object.create(t.prototype),(e.prototype.constructor=e).__proto__=t;})(e,n);var t=e.prototype;return t.isQueryAnOption=function(e,t){var n=this;return -1!==t.map(function(e){return n.templateInputValue(e).toLowerCase()}).indexOf(e.toLowerCase())},t.componentDidMount=function(){this.pollInputElement();},t.componentWillUnmount=function(){clearTimeout(this.$pollInput);},t.pollInputElement=function(){var e=this;this.getDirectInputChanges(),this.$pollInput=setTimeout(function(){e.pollInputElement();},100);},t.getDirectInputChanges=function(){var e=this.elementReferences[-1];e&&e.value!==this.state.query&&this.handleInputChange({target:{value:e.value}});},t.componentDidUpdate=function(e,t){var n=this.state.focused,r=null===n,o=t.focused!==n;o&&!r&&this.elementReferences[n].focus();var i=-1===n,u=o&&null===t.focused;if(i&&u){var a=this.elementReferences[n];a.setSelectionRange(0,a.value.length);}},t.hasAutoselect=function(){return !Y()&&this.props.autoselect},t.templateInputValue=function(e){var t=this.props.templates&&this.props.templates.inputValue;return t?t(e):e},t.templateSuggestion=function(e){var t=this.props.templates&&this.props.templates.suggestion;return t?t(e):e},t.handleComponentBlur=function(e){var t,n=this.state,r=n.options,o=n.query,i=n.selected;this.props.confirmOnBlur?(t=e.query||o,this.props.onConfirm(r[i])):t=o,this.setState({focused:null,menuOpen:e.menuOpen||!1,query:t,selected:null,validChoiceMade:this.isQueryAnOption(t,r)});},t.handleListMouseLeave=function(e){this.setState({hovered:null});},t.handleOptionBlur=function(e,t){var n=this.state,r=n.focused,o=n.menuOpen,i=n.options,u=n.selected,a=null===e.relatedTarget,s=e.relatedTarget===this.elementReferences[-1],l=r!==t&&-1!==r;if(!l&&a||!(l||s)){var c=o&&Y();this.handleComponentBlur({menuOpen:c,query:this.templateInputValue(i[u])});}},t.handleInputBlur=function(e){var t=this.state,n=t.focused,r=t.menuOpen,o=t.options,i=t.query,u=t.selected;if(!(-1!==n)){var a=r&&Y(),s=Y()?i:this.templateInputValue(o[u]);this.handleComponentBlur({menuOpen:a,query:s});}},t.handleInputChange=function(e){var n=this,t=this.props,r=t.minLength,o=t.source,i=t.showAllValues,u=this.hasAutoselect(),a=e.target.value,s=0===a.length,l=this.state.query.length!==a.length,c=a.length>=r;this.setState({query:a,ariaHint:s}),i||!s&&l&&c?o(a,function(e){var t=0<e.length;n.setState({menuOpen:t,options:e,selected:u&&t?0:-1,validChoiceMade:!1});}):!s&&c||this.setState({menuOpen:!1,options:[]});},t.handleInputClick=function(e){this.handleInputChange(e);},t.handleInputFocus=function(e){var t=this.state,n=t.query,r=t.validChoiceMade,o=t.options,i=this.props.minLength,u=!r&&n.length>=i&&0<o.length;u?this.setState(function(e){var t=e.menuOpen;return {focused:-1,menuOpen:u||t,selected:-1}}):this.setState({focused:-1});},t.handleOptionFocus=function(e){this.setState({focused:e,hovered:null,selected:e});},t.handleOptionMouseEnter=function(e,t){Y()||this.setState({hovered:t});},t.handleOptionClick=function(e,t){var n=this.state.options[t],r=this.templateInputValue(n);this.props.onConfirm(n),this.setState({focused:-1,hovered:null,menuOpen:!1,query:r,selected:-1,validChoiceMade:!0}),this.forceUpdate();},t.handleOptionMouseDown=function(e){e.preventDefault();},t.handleUpArrow=function(e){e.preventDefault();var t=this.state,n=t.menuOpen,r=t.selected;-1!==r&&n&&this.handleOptionFocus(r-1);},t.handleDownArrow=function(e){var t=this;if(e.preventDefault(),this.props.showAllValues&&!1===this.state.menuOpen)e.preventDefault(),this.props.source("",function(e){t.setState({menuOpen:!0,options:e,selected:0,focused:0,hovered:null});});else if(!0===this.state.menuOpen){var n=this.state,r=n.menuOpen,o=n.options,i=n.selected;i!==o.length-1&&r&&this.handleOptionFocus(i+1);}},t.handleSpace=function(e){var t=this;this.props.showAllValues&&!1===this.state.menuOpen&&""===this.state.query&&(e.preventDefault(),this.props.source("",function(e){t.setState({menuOpen:!0,options:e});})),-1!==this.state.focused&&(e.preventDefault(),this.handleOptionClick(e,this.state.focused));},t.handleEnter=function(e){this.state.menuOpen&&(e.preventDefault(),0<=this.state.selected&&this.handleOptionClick(e,this.state.selected));},t.handlePrintableKey=function(e){var t=this.elementReferences[-1];e.target===t||t.focus();},t.handleKeyDown=function(e){switch(u[e.keyCode]){case"up":this.handleUpArrow(e);break;case"down":this.handleDownArrow(e);break;case"space":this.handleSpace(e);break;case"enter":this.handleEnter(e);break;case"escape":this.handleComponentBlur({query:this.state.query});break;default:(function t(e){return 47<e&&e<58||32===e||8===e||64<e&&e<91||95<e&&e<112||185<e&&e<193||218<e&&e<223})(e.keyCode)&&this.handlePrintableKey(e);}},t.render=function(){var e,i=this,t=this.props,n=t.cssNamespace,r=t.displayMenu,u=t.id,o=t.minLength,a=t.name,s=t.placeholder,l=t.required,c=t.showAllValues,p=t.tNoResults,f=t.tStatusQueryTooShort,d=t.tStatusNoResults,h=t.tStatusSelectedOption,m=t.tStatusResults,v=t.tAssistiveHint,y=t.dropdownArrow,g=this.state,_=g.focused,b=g.hovered,w=g.menuOpen,x=g.options,O=g.query,C=g.selected,S=g.ariaHint,E=g.validChoiceMade,M=this.hasAutoselect(),N=-1===_,I=0===x.length,k=0!==O.length,A=O.length>=o,P=this.props.showNoOptionsFound&&N&&I&&k&&A,j=n+"__wrapper",L=n+"__input",T=null!==_?" "+L+"--focused":"",B=this.props.showAllValues?" "+L+"--show-all-values":" "+L+"--default",D=n+"__dropdown-arrow-down",F=-1!==_&&null!==_,R=n+"__menu",U=R+"--"+r,V=R+"--"+(w||P?"visible":"hidden"),q=n+"__option",W=n+"__hint",H=this.templateInputValue(x[C]),K=H&&0===H.toLowerCase().indexOf(O.toLowerCase())&&M?O+H.substr(O.length):"",Q=u+"__assistiveHint",z=S?{"aria-describedby":Q}:null;return c&&"string"==typeof(e=y({className:D}))&&(e=(0, $.createElement)("div",{className:n+"__dropdown-arrow-down-wrapper",dangerouslySetInnerHTML:{__html:e}})),(0, $.createElement)("div",{className:j,onKeyDown:this.handleKeyDown},(0, $.createElement)(J["default"],{id:u,length:x.length,queryLength:O.length,minQueryLength:o,selectedOption:this.templateInputValue(x[C]),selectedOptionIndex:C,validChoiceMade:E,isInFocus:null!==this.state.focused,tQueryTooShort:f,tNoResults:d,tSelectedOption:h,tResults:m}),K&&(0, $.createElement)("span",null,(0, $.createElement)("input",{className:W,readonly:!0,tabIndex:"-1",value:K})),(0, $.createElement)("input",X({"aria-expanded":w?"true":"false","aria-activedescendant":!!F&&u+"__option--"+_,"aria-owns":u+"__listbox","aria-autocomplete":this.hasAutoselect()?"both":"list"},z,{autoComplete:"off",className:""+L+T+B,id:u,onClick:function(e){return i.handleInputClick(e)},onBlur:this.handleInputBlur},function G(e){return {onInput:e}}(this.handleInputChange),{onFocus:this.handleInputFocus,name:a,placeholder:s,ref:function(e){i.elementReferences[-1]=e;},type:"text",role:"combobox",required:l,value:O})),e,(0, $.createElement)("ul",{className:R+" "+U+" "+V,onMouseLeave:function(e){return i.handleListMouseLeave(e)},id:u+"__listbox",role:"listbox"},x.map(function(e,t){var n=(-1===_?C===t:_===t)&&null===b?" "+q+"--focused":"",r=t%2?" "+q+"--odd":"",o=Y()?"<span id="+u+"__option-suffix--"+t+' style="border:0;clip:rect(0 0 0 0);height:1px;marginBottom:-1px;marginRight:-1px;overflow:hidden;padding:0;position:absolute;whiteSpace:nowrap;width:1px"> '+(t+1)+" of "+x.length+"</span>":"";return (0, $.createElement)("li",{"aria-selected":_===t?"true":"false",className:""+q+n+r,dangerouslySetInnerHTML:{__html:i.templateSuggestion(e)+o},id:u+"__option--"+t,key:t,onBlur:function(e){return i.handleOptionBlur(e,t)},onClick:function(e){return i.handleOptionClick(e,t)},onMouseDown:i.handleOptionMouseDown,onMouseEnter:function(e){return i.handleOptionMouseEnter(e,t)},ref:function(e){i.elementReferences[t]=e;},role:"option",tabIndex:"-1","aria-posinset":t+1,"aria-setsize":x.length})}),P&&(0, $.createElement)("li",{className:q+" "+q+"--no-results"},p())),(0, $.createElement)("span",{id:Q,style:{display:"none"}},v()))},e}($.Component);(t["default"]=a).defaultProps={autoselect:!1,cssNamespace:"autocomplete",defaultValue:"",displayMenu:"inline",minLength:0,name:"input-autocomplete",placeholder:"",onConfirm:function(){},confirmOnBlur:!0,showNoOptionsFound:!0,showAllValues:!1,required:!1,tNoResults:function(){return "No results found"},tAssistiveHint:function(){return "When autocomplete results are available use up and down arrows to review and enter to select.  Touch device users, explore by touch or with swipe gestures."},dropdownArrow:r["default"]};},function(e,t,r){var o=r(9),i=r(53),u=r(28),a=r(26)("IE_PROTO"),s=function(){},l="prototype",c=function(){var e,t=r(15)("iframe"),n=u.length;for(t.style.display="none",r(54).appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),c=e.F;n--;)delete c[l][u[n]];return c()};e.exports=Object.create||function(e,t){var n;return null!==e?(s[l]=o(e),n=new s,s[l]=null,n[a]=e):n=c(),t===undefined?n:i(n,t)};},function(e,t,n){var u=n(8),a=n(9),s=n(20);e.exports=n(3)?Object.defineProperties:function(e,t){a(e);for(var n,r=s(t),o=r.length,i=0;i<o;)u.f(e,n=r[i++],t[n]);return e};},function(e,t,n){var r=n(1).document;e.exports=r&&r.documentElement;},function(e,t,n){var r=n(0);r(r.P,"Function",{bind:n(56)});},function(e,t,n){var i=n(19),u=n(2),a=n(57),s=[].slice,l={};e.exports=Function.bind||function(t){var n=i(this),r=s.call(arguments,1),o=function(){var e=r.concat(s.call(arguments));return this instanceof o?function(e,t,n){if(!(t in l)){for(var r=[],o=0;o<t;o++)r[o]="a["+o+"]";l[t]=Function("F,a","return new F("+r.join(",")+")");}return l[t](e,n)}(n,e.length,e):a(n,e,t)};return u(n.prototype)&&(o.prototype=n.prototype),o};},function(e,t){e.exports=function(e,t,n){var r=n===undefined;switch(t.length){case 0:return r?e():e.call(n);case 1:return r?e(t[0]):e.call(n,t[0]);case 2:return r?e(t[0],t[1]):e.call(n,t[0],t[1]);case 3:return r?e(t[0],t[1],t[2]):e.call(n,t[0],t[1],t[2]);case 4:return r?e(t[0],t[1],t[2],t[3]):e.call(n,t[0],t[1],t[2],t[3])}return e.apply(n,t)};},function(e,t,n){n(59)("match",1,function(r,o,e){return [function(e){var t=r(this),n=e==undefined?undefined:e[o];return n!==undefined?n.call(e,t):new RegExp(e)[o](String(t))},e]});},function(e,t,n){var a=n(7),s=n(16),l=n(4),c=n(12),p=n(34);e.exports=function(t,e,n){var r=p(t),o=n(c,r,""[t]),i=o[0],u=o[1];l(function(){var e={};return e[r]=function(){return 7},7!=""[t](e)})&&(s(String.prototype,t,i),a(RegExp.prototype,r,2==e?function(e,t){return u.call(e,this,t)}:function(e){return u.call(e,this)}));};},function(e,t,n){t.__esModule=!0,t["default"]=void 0,n(36);var _=n(5);var r=function r(o,i,u){var a;return function(){var e=this,t=arguments,n=function n(){a=null,u||o.apply(e,t);},r=u&&!a;clearTimeout(a),a=setTimeout(n,i),r&&o.apply(e,t);}},o=function(o){function e(){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return (e=o.call.apply(o,[this].concat(n))||this).state={bump:!1,debounced:!1},e}(function n(e,t){e.prototype=Object.create(t.prototype),(e.prototype.constructor=e).__proto__=t;})(e,o);var t=e.prototype;return t.componentWillMount=function(){var e=this;this.debounceStatusUpdate=r(function(){if(!e.state.debounced){var t=!e.props.isInFocus||e.props.validChoiceMade;e.setState(function(e){return {bump:!e.bump,debounced:!0,silenced:t}});}},1400);},t.componentWillReceiveProps=function(e){e.queryLength;this.setState({debounced:!1});},t.render=function(){var e=this.props,t=e.id,n=e.length,r=e.queryLength,o=e.minQueryLength,i=e.selectedOption,u=e.selectedOptionIndex,a=e.tQueryTooShort,s=e.tNoResults,l=e.tSelectedOption,c=e.tResults,p=this.state,f=p.bump,d=p.debounced,h=p.silenced,m=r<o,v=0===n,y=i?l(i,n,u):"",g=null;return g=m?a(o):v?s():c(n,y),this.debounceStatusUpdate(),(0, _.createElement)("div",{style:{border:"0",clip:"rect(0 0 0 0)",height:"1px",marginBottom:"-1px",marginRight:"-1px",overflow:"hidden",padding:"0",position:"absolute",whiteSpace:"nowrap",width:"1px"}},(0, _.createElement)("div",{id:t+"__status--A",role:"status","aria-atomic":"true","aria-live":"polite"},!h&&d&&f?g:""),(0, _.createElement)("div",{id:t+"__status--B",role:"status","aria-atomic":"true","aria-live":"polite"},h||!d||f?"":g))},e}(_.Component);(t["default"]=o).defaultProps={tQueryTooShort:function(e){return "Type in "+e+" or more characters for results"},tNoResults:function(){return "No search results"},tSelectedOption:function(e,t,n){return e+" "+(n+1)+" of "+t+" is highlighted"},tResults:function(e,t){return e+" "+(1===e?"result":"results")+" "+(1===e?"is":"are")+" available. "+t}};},function(e,t,n){t.__esModule=!0,t["default"]=void 0;var r=n(5),o=function i(e){var t=e.className;return (0, r.createElement)("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",className:t,focusable:"false"},(0, r.createElement)("g",{stroke:"none",fill:"none","fill-rule":"evenodd"},(0, r.createElement)("polygon",{fill:"#000000",points:"0 0 22 0 11 17"})))};t["default"]=o;}])["default"]});

});

var accessibleAutocomplete = /*@__PURE__*/unwrapExports(accessibleAutocomplete_min);

var EOL = {},
    EOF = {},
    QUOTE = 34,
    NEWLINE = 10,
    RETURN = 13;

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "] || \"\"";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

function pad(value, width) {
  var s = value + "", length = s.length;
  return length < width ? new Array(width - length + 1).join(0) + s : s;
}

function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6)
    : year > 9999 ? "+" + pad(year, 6)
    : pad(year, 4);
}

function formatDate(date) {
  var hours = date.getUTCHours(),
      minutes = date.getUTCMinutes(),
      seconds = date.getUTCSeconds(),
      milliseconds = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date"
      : formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
      + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
      : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
      : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
      : "");
}

function dsvFormat(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // current line number
        t, // current token
        eof = N <= 0, // current token followed by EOF?
        eol = false; // current token followed by EOL?

    // Strip the trailing newline.
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;

      // Unescape quotes.
      var i, j = I, c;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
        if ((i = I) >= N) eof = true;
        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
      }

      // Find next delimiter or newline.
      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }

      // Return last token before EOF.
      return eof = true, text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), t = token();
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }

    return rows;
  }

  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }

  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(value) {
    return value == null ? ""
        : value instanceof Date ? formatDate(value)
        : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
        : value;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatBody: formatBody,
    formatRows: formatRows,
    formatRow: formatRow,
    formatValue: formatValue
  };
}

var csv = dsvFormat(",");

var csvParse = csv.parse;

function responseText(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.text();
}

function text(input, init) {
  return fetch(input, init).then(responseText);
}

function dsvParse(parse) {
  return function(input, init, row) {
    if (arguments.length === 2 && typeof init === "function") row = init, init = undefined;
    return text(input, init).then(function(response) {
      return parse(response, row);
    });
  };
}

var csv$1 = dsvParse(csvParse);

function responseJson(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  if (response.status === 204 || response.status === 205) return;
  return response.json();
}

function json(input, init) {
  return fetch(input, init).then(responseJson);
}

var xhtml = "http://www.w3.org/1999/xhtml";

var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
}

function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function creator(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}

function none() {}

function selector(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

function empty() {
  return [];
}

function selectorAll(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

function selection_selectAll(select) {
  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
}

function matcher(selector) {
  return function() {
    return this.matches(selector);
  };
}

function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

function sparse(update) {
  return new Array(update.length);
}

function selection_enter() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

function constant(x) {
  return function() {
    return x;
  };
}

var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

function selection_data(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) { data[++j] = d; });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

function selection_exit() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
}

function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

function selection_merge(selection) {

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection(merges, this._parents);
}

function selection_order() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

function selection_sort(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

function selection_nodes() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() { nodes[++i] = this; });
  return nodes;
}

function selection_node() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

function selection_size() {
  var size = 0;
  this.each(function() { ++size; });
  return size;
}

function selection_empty() {
  return !this.node();
}

function selection_each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function selection_attr(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}

function defaultView(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

function selection_style(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}

function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

function selection_property(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function selection_classed(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}

function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function selection_text(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
}

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function selection_html(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function selection_raise() {
  return this.each(raise);
}

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function selection_lower() {
  return this.each(lower);
}

function selection_append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

function constantNull() {
  return null;
}

function selection_insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function selection_remove() {
  return this.each(remove);
}

function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

function selection_datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

var filterEvents = {};

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!("onmouseenter" in element)) {
    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event) {
    var related = event.relatedTarget;
    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function(event1) {
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
    }
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

function selection_on(typename, value, capture) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
}

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function selection_dispatch(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: selection_select,
  selectAll: selection_selectAll,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch
};

function select(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
}

var USD = new Intl.NumberFormat('en-CA',{style:'currency',currency:'USD'});

const provinces = [
	{abbr:'BC',full:'British Columbia'},
	{abbr:'AB',full:'Alberta'},
	{abbr:'SK',full:'Saskatchewan'},
	{abbr:'MB',full:'Manitoba'}
];

// create the search box, populated with data
csv$1('./data/HScodes.csv').then( HScodes => {
	if( ! (
		HScodes.columns.includes('HS6') & 
		HScodes.columns.includes('description')
	) ){ return }
	// add options to the existing dropdown
	let selectEl = select('select#hs6');
	let options = selectEl.selectAll('option').data( HScodes );
	options.enter().append('option')
		.property('value', d => d.HS6.substring(1) )
		.text( d => `${d.HS6.substring(1)} - ${d.description}` );
	options.exit().remove();
	// enable easier, accessible selections
	accessibleAutocomplete.enhanceSelectElement({
		autoselect: true,
		confirmOnBlur: true,
		defaultValue: "",
		minLength: 1,
		selectElement: document.querySelector('select#hs6')
	});
});

// if previosuly submitted, show us some data!
var params = new URLSearchParams( window.location.search );
if ( params.get('hs6') ) {
	let HSval = params.get('hs6');
	csv$1('./data/the-data.csv').then( tariffData => {
		let record = tariffData.find( r => r.HS6 == `'${HSval}` );
		let infoBox = select('#category-info');
		// variable name mapping, etc
		let description = record['Description'];
		let tariffRate = record['Japan Rate for Canada TPP'];
		let canadaGain = record['Total Canada Gain - no export promotion'];
		let canadaGainPercent = record['Total Canada Gain %'];
		// only show provincial gains > $1,000
		let provincialGains = provinces.map( province => {
			let dollars = record[`${province.abbr} Gain - no export promotion`];
			let percent = record[`${province.abbr}%`];
			let text = `${province.full} - ${USD.format(dollars)} (+${percent}%)`;
			return dollars >= 500 ? text : null
		}).filter( val => val );
		// append data to DOM
		infoBox.append('h2').text( `${HSval} - ${description}` );
		infoBox.append('h3').text('Tariff Rate');
		infoBox.append('p').text(tariffRate);
		infoBox.append('h3').text('Market Opportunity');
		infoBox.append('p')
			.text(`${USD.format(canadaGain)} (+${canadaGainPercent}%)`);
		if( provincialGains.length > 0 ){
			infoBox.append('h3').text('Provincial Gains');
			provincialGains.forEach( content => {
				infoBox.append('p').text(content);
			});
		}
		// get external top-5 data
		infoBox.append('h3').text('Top 5 Global Exporters to Japan');
		infoBox.append('p').attr('id','loading').text('loading...');
		// https://comtrade.un.org/Data/Doc/API
		let API = `https://comtrade.un.org/api/get?max=500&freq=A&px=HS&r=all&p=392&rg=all&cc=${HSval}`;
		json(API).then( response => {
			let data = response.dataset.sort((a,b)=>b.TradeValue-a.TradeValue);
			// get Canada's position
			let ci = data.findIndex( d => d.rtTitle == 'Canada' );
			let topN = data.slice(0, ci+1 > 5 ? ci+1 : 5 );
			console.log(topN);
			infoBox.select('p#loading').remove();
			let topNList = infoBox.append('ol').selectAll('li').data(topN);
			topNList.enter().append('li')
				.text( d => {
					let country = d.rtTitle;
					let dollars = USD.format(d.TradeValue);
					return `${country}: ${dollars}` 
				});
		});
	});
}
