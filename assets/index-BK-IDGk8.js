var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function E(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function D(e,t){return E(e.type,t,e.props)}function O(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function k(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var A=/\/+/g;function j(e,t){return typeof e==`object`&&e&&e.key!=null?k(``+e.key):t.toString(36)}function M(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function N(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,N(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+j(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(A,`$&/`)+`/`),N(o,r,i,``,function(e){return e})):o!=null&&(O(o)&&(o=D(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(A,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+j(a,u),c+=N(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+j(a,u++),c+=N(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return N(M(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function P(e,t,n){if(e==null)return e;var r=[],i=0;return N(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function F(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var I=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},L={map:P,forEach:function(e,t,n){P(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!O(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=L,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return E(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return E(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=O,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:F}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,I)}catch(e){I(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.8`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&j(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&j(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function j(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,j(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.8`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),E=Symbol.for(`react.suspense_list`),D=Symbol.for(`react.memo`),O=Symbol.for(`react.lazy`),k=Symbol.for(`react.activity`),A=Symbol.for(`react.memo_cache_sentinel`),j=Symbol.iterator;function M(e){return typeof e!=`object`||!e?null:(e=j&&e[j]||e[`@@iterator`],typeof e==`function`?e:null)}var N=Symbol.for(`react.client.reference`);function P(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===N?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case T:return`Suspense`;case E:return`SuspenseList`;case k:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case D:return t=e.displayName||null,t===null?P(e.type)||`Memo`:t;case O:t=e._payload,e=e._init;try{return P(e(t))}catch{}}return null}var F=Array.isArray,I=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,L=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ee={pending:!1,data:null,method:null,action:null},te=[],ne=-1;function re(e){return{current:e}}function ie(e){0>ne||(e.current=te[ne],te[ne]=null,ne--)}function R(e,t){ne++,te[ne]=e.current,e.current=t}var ae=re(null),oe=re(null),z=re(null),se=re(null);function ce(e,t){switch(R(z,t),R(oe,e),R(ae,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}ie(ae),R(ae,e)}function le(){ie(ae),ie(oe),ie(z)}function ue(e){e.memoizedState!==null&&R(se,e);var t=ae.current,n=Hd(t,e.type);t!==n&&(R(oe,e),R(ae,n))}function de(e){oe.current===e&&(ie(ae),ie(oe)),se.current===e&&(ie(se),Qf._currentValue=ee)}var fe,pe;function me(e){if(fe===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);fe=t&&t[1]||``,pe=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+fe+e+pe}var he=!1;function ge(e,t){if(!e||he)return``;he=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{he=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?me(n):``}function _e(e,t){switch(e.tag){case 26:case 27:case 5:return me(e.type);case 16:return me(`Lazy`);case 13:return e.child!==t&&t!==null?me(`Suspense Fallback`):me(`Suspense`);case 19:return me(`SuspenseList`);case 0:case 15:return ge(e.type,!1);case 11:return ge(e.type.render,!1);case 1:return ge(e.type,!0);case 31:return me(`Activity`);default:return``}}function ve(e){try{var t=``,n=null;do t+=_e(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var ye=Object.prototype.hasOwnProperty,be=t.unstable_scheduleCallback,xe=t.unstable_cancelCallback,Se=t.unstable_shouldYield,Ce=t.unstable_requestPaint,we=t.unstable_now,Te=t.unstable_getCurrentPriorityLevel,Ee=t.unstable_ImmediatePriority,De=t.unstable_UserBlockingPriority,Oe=t.unstable_NormalPriority,ke=t.unstable_LowPriority,Ae=t.unstable_IdlePriority,je=t.log,Me=t.unstable_setDisableYieldValue,Ne=null,Pe=null;function Fe(e){if(typeof je==`function`&&Me(e),Pe&&typeof Pe.setStrictMode==`function`)try{Pe.setStrictMode(Ne,e)}catch{}}var Ie=Math.clz32?Math.clz32:Re,Le=Math.log,B=Math.LN2;function Re(e){return e>>>=0,e===0?32:31-(Le(e)/B|0)|0}var ze=256,Be=262144,Ve=4194304;function He(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ue(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=He(n))):i=He(o):i=He(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=He(n))):i=He(o)):i=He(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function We(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Ge(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ke(){var e=Ve;return Ve<<=1,!(Ve&62914560)&&(Ve=4194304),e}function qe(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Je(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ye(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Ie(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&Xe(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function Xe(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ie(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function Ze(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ie(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function Qe(e,t){var n=t&-t;return n=n&42?1:$e(n),(n&(e.suspendedLanes|t))===0?n:0}function $e(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function et(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function tt(){var e=L.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function nt(e,t){var n=L.p;try{return L.p=e,t()}finally{L.p=n}}var rt=Math.random().toString(36).slice(2),it=`__reactFiber$`+rt,at=`__reactProps$`+rt,ot=`__reactContainer$`+rt,st=`__reactEvents$`+rt,ct=`__reactListeners$`+rt,lt=`__reactHandles$`+rt,ut=`__reactResources$`+rt,dt=`__reactMarker$`+rt;function ft(e){delete e[it],delete e[at],delete e[st],delete e[ct],delete e[lt]}function pt(e){var t=e[it];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ot]||n[it]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[it])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function mt(e){if(e=e[it]||e[ot]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function ht(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function gt(e){var t=e[ut];return t||=e[ut]={hoistableStyles:new Map,hoistableScripts:new Map},t}function _t(e){e[dt]=!0}var vt=new Set,yt={};function bt(e,t){xt(e,t),xt(e+`Capture`,t)}function xt(e,t){for(yt[e]=t,e=0;e<t.length;e++)vt.add(t[e])}var St=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Ct={},wt={};function Tt(e){return ye.call(wt,e)?!0:ye.call(Ct,e)?!1:St.test(e)?wt[e]=!0:(Ct[e]=!0,!1)}function Et(e,t,n){if(Tt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}}function Dt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Ot(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function kt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function At(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function jt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Mt(e){if(!e._valueTracker){var t=At(e)?`checked`:`value`;e._valueTracker=jt(e,t,``+e[t])}}function Nt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=At(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}function Pt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Ft=/[\n"\\]/g;function It(e){return e.replace(Ft,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Lt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+kt(t)):e.value!==``+kt(t)&&(e.value=``+kt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):zt(e,o,kt(n)):zt(e,o,kt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+kt(s):e.removeAttribute(`name`)}function Rt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Mt(e);return}n=n==null?``:``+kt(n),t=t==null?n:``+kt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Mt(e)}function zt(e,t,n){t===`number`&&Pt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Bt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+kt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Vt(e,t,n){if(t!=null&&(t=``+kt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+kt(n)}function Ht(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(F(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=kt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Mt(e)}function Ut(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Wt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Gt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Wt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Kt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Gt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Gt(e,o,t[o])}function qt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Jt=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),Yt=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Xt(e){return Yt.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function Zt(){}var Qt=null;function $t(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var en=null,tn=null;function nn(e){var t=mt(e);if(t&&(e=t.stateNode)){var n=e[at]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Lt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+It(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[at]||null;if(!a)throw Error(i(90));Lt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Nt(r)}break a;case`textarea`:Vt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Bt(e,!!n.multiple,t,!1)}}}var rn=!1;function an(e,t,n){if(rn)return e(t,n);rn=!0;try{return e(t)}finally{if(rn=!1,(en!==null||tn!==null)&&(yu(),en&&(t=en,e=tn,tn=en=null,nn(t),e)))for(t=0;t<e.length;t++)nn(e[t])}}function on(e,t){var n=e.stateNode;if(n===null)return null;var r=n[at]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var sn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),cn=!1;if(sn)try{var ln={};Object.defineProperty(ln,"passive",{get:function(){cn=!0}}),window.addEventListener(`test`,ln,ln),window.removeEventListener(`test`,ln,ln)}catch{cn=!1}var un=null,dn=null,fn=null;function pn(){if(fn)return fn;var e,t=dn,n=t.length,r,i=`value`in un?un.value:un.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return fn=i.slice(e,1<r?1-r:void 0)}function mn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function hn(){return!0}function gn(){return!1}function _n(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?hn:gn,this.isPropagationStopped=gn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=hn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=hn)},persist:function(){},isPersistent:hn}),t}var vn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},yn=_n(vn),bn=h({},vn,{view:0,detail:0}),xn=_n(bn),Sn,Cn,wn,Tn=h({},bn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:In,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==wn&&(wn&&e.type===`mousemove`?(Sn=e.screenX-wn.screenX,Cn=e.screenY-wn.screenY):Cn=Sn=0,wn=e),Sn)},movementY:function(e){return`movementY`in e?e.movementY:Cn}}),En=_n(Tn),Dn=_n(h({},Tn,{dataTransfer:0})),On=_n(h({},bn,{relatedTarget:0})),kn=_n(h({},vn,{animationName:0,elapsedTime:0,pseudoElement:0})),An=_n(h({},vn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),jn=_n(h({},vn,{data:0})),Mn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Nn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Pn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Fn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Pn[e])?!!t[e]:!1}function In(){return Fn}var Ln=_n(h({},bn,{key:function(e){if(e.key){var t=Mn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=mn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Nn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:In,charCode:function(e){return e.type===`keypress`?mn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?mn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Rn=_n(h({},Tn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),V=_n(h({},bn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:In})),zn=_n(h({},vn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Bn=_n(h({},Tn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Vn=_n(h({},vn,{newState:0,oldState:0})),Hn=[9,13,27,32],Un=sn&&`CompositionEvent`in window,Wn=null;sn&&`documentMode`in document&&(Wn=document.documentMode);var Gn=sn&&`TextEvent`in window&&!Wn,Kn=sn&&(!Un||Wn&&8<Wn&&11>=Wn),qn=` `,Jn=!1;function Yn(e,t){switch(e){case`keyup`:return Hn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Xn(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var Zn=!1;function Qn(e,t){switch(e){case`compositionend`:return Xn(t);case`keypress`:return t.which===32?(Jn=!0,qn):null;case`textInput`:return e=t.data,e===qn&&Jn?null:e;default:return null}}function $n(e,t){if(Zn)return e===`compositionend`||!Un&&Yn(e,t)?(e=pn(),fn=dn=un=null,Zn=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Kn&&t.locale!==`ko`?null:t.data;default:return null}}var er={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function tr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!er[e.type]:t===`textarea`}function nr(e,t,n,r){en?tn?tn.push(r):tn=[r]:en=r,t=Td(t,`onChange`),0<t.length&&(n=new yn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var rr=null,ir=null;function ar(e){vd(e,0)}function or(e){if(Nt(ht(e)))return e}function sr(e,t){if(e===`change`)return t}var cr=!1;if(sn){var lr;if(sn){var ur=`oninput`in document;if(!ur){var dr=document.createElement(`div`);dr.setAttribute(`oninput`,`return;`),ur=typeof dr.oninput==`function`}lr=ur}else lr=!1;cr=lr&&(!document.documentMode||9<document.documentMode)}function fr(){rr&&(rr.detachEvent(`onpropertychange`,pr),ir=rr=null)}function pr(e){if(e.propertyName===`value`&&or(ir)){var t=[];nr(t,ir,e,$t(e)),an(ar,t)}}function mr(e,t,n){e===`focusin`?(fr(),rr=t,ir=n,rr.attachEvent(`onpropertychange`,pr)):e===`focusout`&&fr()}function hr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return or(ir)}function gr(e,t){if(e===`click`)return or(t)}function _r(e,t){if(e===`input`||e===`change`)return or(t)}function vr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var yr=typeof Object.is==`function`?Object.is:vr;function br(e,t){if(yr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ye.call(t,i)||!yr(e[i],t[i]))return!1}return!0}function xr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Sr(e,t){var n=xr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=xr(n)}}function Cr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Cr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function wr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Pt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Pt(e.document)}return t}function Tr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Er=sn&&`documentMode`in document&&11>=document.documentMode,Dr=null,Or=null,kr=null,Ar=!1;function jr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ar||Dr==null||Dr!==Pt(r)||(r=Dr,`selectionStart`in r&&Tr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),kr&&br(kr,r)||(kr=r,r=Td(Or,`onSelect`),0<r.length&&(t=new yn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Dr)))}function Mr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Nr={animationend:Mr(`Animation`,`AnimationEnd`),animationiteration:Mr(`Animation`,`AnimationIteration`),animationstart:Mr(`Animation`,`AnimationStart`),transitionrun:Mr(`Transition`,`TransitionRun`),transitionstart:Mr(`Transition`,`TransitionStart`),transitioncancel:Mr(`Transition`,`TransitionCancel`),transitionend:Mr(`Transition`,`TransitionEnd`)},Pr={},Fr={};sn&&(Fr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Nr.animationend.animation,delete Nr.animationiteration.animation,delete Nr.animationstart.animation),`TransitionEvent`in window||delete Nr.transitionend.transition);function Ir(e){if(Pr[e])return Pr[e];if(!Nr[e])return e;var t=Nr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Fr)return Pr[e]=t[n];return e}var Lr=Ir(`animationend`),Rr=Ir(`animationiteration`),zr=Ir(`animationstart`),Br=Ir(`transitionrun`),Vr=Ir(`transitionstart`),Hr=Ir(`transitioncancel`),Ur=Ir(`transitionend`),Wr=new Map,Gr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Gr.push(`scrollEnd`);function Kr(e,t){Wr.set(e,t),bt(t,[e])}var qr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Jr=[],Yr=0,Xr=0;function Zr(){for(var e=Yr,t=Xr=Yr=0;t<e;){var n=Jr[t];Jr[t++]=null;var r=Jr[t];Jr[t++]=null;var i=Jr[t];Jr[t++]=null;var a=Jr[t];if(Jr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ti(n,i,a)}}function Qr(e,t,n,r){Jr[Yr++]=e,Jr[Yr++]=t,Jr[Yr++]=n,Jr[Yr++]=r,Xr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function $r(e,t,n,r){return Qr(e,t,n,r),ni(e)}function ei(e,t){return Qr(e,null,null,t),ni(e)}function ti(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Ie(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ni(e){if(50<uu)throw uu=0,du=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ri={};function ii(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ai(e,t,n,r){return new ii(e,t,n,r)}function oi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function si(e,t){var n=e.alternate;return n===null?(n=ai(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function ci(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function li(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)oi(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,ae.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case k:return e=ai(31,n,t,a),e.elementType=k,e.lanes=o,e;case y:return ui(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=ai(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case T:return e=ai(13,n,t,a),e.elementType=T,e.lanes=o,e;case E:return e=ai(19,n,t,a),e.elementType=E,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case D:s=14;break a;case O:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ai(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function ui(e,t,n,r){return e=ai(7,e,r,t),e.lanes=n,e}function di(e,t,n){return e=ai(6,e,null,t),e.lanes=n,e}function fi(e){var t=ai(18,null,null,0);return t.stateNode=e,t}function pi(e,t,n){return t=ai(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var mi=new WeakMap;function hi(e,t){if(typeof e==`object`&&e){var n=mi.get(e);return n===void 0?(t={value:e,source:t,stack:ve(t)},mi.set(e,t),t):n}return{value:e,source:t,stack:ve(t)}}var H=[],U=0,gi=null,_i=0,vi=[],yi=0,bi=null,xi=1,Si=``;function Ci(e,t){H[U++]=_i,H[U++]=gi,gi=e,_i=t}function wi(e,t,n){vi[yi++]=xi,vi[yi++]=Si,vi[yi++]=bi,bi=e;var r=xi;e=Si;var i=32-Ie(r)-1;r&=~(1<<i),n+=1;var a=32-Ie(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,xi=1<<32-Ie(t)+i|n<<i|r,Si=a+e}else xi=1<<a|n<<i|r,Si=e}function Ti(e){e.return!==null&&(Ci(e,1),wi(e,1,0))}function W(e){for(;e===gi;)gi=H[--U],H[U]=null,_i=H[--U],H[U]=null;for(;e===bi;)bi=vi[--yi],vi[yi]=null,Si=vi[--yi],vi[yi]=null,xi=vi[--yi],vi[yi]=null}function Ei(e,t){vi[yi++]=xi,vi[yi++]=Si,vi[yi++]=bi,xi=t.id,Si=t.overflow,bi=e}var Di=null,Oi=null,G=!1,ki=null,Ai=!1,ji=Error(i(519));function Mi(e){throw Ri(hi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ji}function Ni(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[it]=e,t[at]=r,n){case`dialog`:$(`cancel`,t),$(`close`,t);break;case`iframe`:case`object`:case`embed`:$(`load`,t);break;case`video`:case`audio`:for(n=0;n<gd.length;n++)$(gd[n],t);break;case`source`:$(`error`,t);break;case`img`:case`image`:case`link`:$(`error`,t),$(`load`,t);break;case`details`:$(`toggle`,t);break;case`input`:$(`invalid`,t),Rt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:$(`invalid`,t);break;case`textarea`:$(`invalid`,t),Ht(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||jd(t.textContent,n)?(r.popover!=null&&($(`beforetoggle`,t),$(`toggle`,t)),r.onScroll!=null&&$(`scroll`,t),r.onScrollEnd!=null&&$(`scrollend`,t),r.onClick!=null&&(t.onclick=Zt),t=!0):t=!1,t||Mi(e,!0)}function Pi(e){for(Di=e.return;Di;)switch(Di.tag){case 5:case 31:case 13:Ai=!1;return;case 27:case 3:Ai=!0;return;default:Di=Di.return}}function Fi(e){if(e!==Di)return!1;if(!G)return Pi(e),G=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||Ud(e.type,e.memoizedProps)),n=!n),n&&Oi&&Mi(e),Pi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Oi=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Oi=uf(e)}else t===27?(t=Oi,Zd(e.type)?(e=lf,lf=null,Oi=e):Oi=t):Oi=Di?cf(e.stateNode.nextSibling):null;return!0}function Ii(){Oi=Di=null,G=!1}function Li(){var e=ki;return e!==null&&(Xl===null?Xl=e:Xl.push.apply(Xl,e),ki=null),e}function Ri(e){ki===null?ki=[e]:ki.push(e)}var zi=re(null),Bi=null,Vi=null;function Hi(e,t,n){R(zi,t._currentValue),t._currentValue=n}function Ui(e){e._currentValue=zi.current,ie(zi)}function Wi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Gi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Wi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Wi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Ki(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;yr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===se.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&Gi(t,e,n,r),t.flags|=262144}function qi(e){for(e=e.firstContext;e!==null;){if(!yr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ji(e){Bi=e,Vi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Yi(e){return Zi(Bi,e)}function Xi(e,t){return Bi===null&&Ji(e),Zi(e,t)}function Zi(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Vi===null){if(e===null)throw Error(i(308));Vi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Vi=Vi.next=t;return n}var Qi=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},$i=t.unstable_scheduleCallback,ea=t.unstable_NormalPriority,ta={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function na(){return{controller:new Qi,data:new Map,refCount:0}}function ra(e){e.refCount--,e.refCount===0&&$i(ea,function(){e.controller.abort()})}var ia=null,aa=0,oa=0,sa=null;function ca(e,t){if(ia===null){var n=ia=[];aa=0,oa=ud(),sa={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return aa++,t.then(la,la),t}function la(){if(--aa===0&&ia!==null){sa!==null&&(sa.status=`fulfilled`);var e=ia;ia=null,oa=0,sa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ua(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var da=I.S;I.S=function(e,t){$l=we(),typeof t==`object`&&t&&typeof t.then==`function`&&ca(e,t),da!==null&&da(e,t)};var fa=re(null);function pa(){var e=fa.current;return e===null?Ll.pooledCache:e}function ma(e,t){t===null?R(fa,fa.current):R(fa,t.pool)}function ha(){var e=pa();return e===null?null:{parent:ta._currentValue,pool:e}}var ga=Error(i(460)),_a=Error(i(474)),va=Error(i(542)),ya={then:function(){}};function ba(e){return e=e.status,e===`fulfilled`||e===`rejected`}function xa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Zt,Zt),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ta(e),e;default:if(typeof t.status==`string`)t.then(Zt,Zt);else{if(e=Ll,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ta(e),e}throw Ca=t,ga}}function Sa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Ca=e,ga):e}}var Ca=null;function wa(){if(Ca===null)throw Error(i(459));var e=Ca;return Ca=null,e}function Ta(e){if(e===ga||e===va)throw Error(i(483))}var Ea=null,Da=0;function Oa(e){var t=Da;return Da+=1,Ea===null&&(Ea=[]),xa(Ea,e,t)}function ka(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Aa(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function ja(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=si(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=di(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===O&&Sa(i)===t.type)?(t=a(t,n.props),ka(t,n),t.return=e,t):(t=li(n.type,n.key,n.props,null,e.mode,r),ka(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=pi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=ui(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=di(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=li(t.type,t.key,t.props,null,e.mode,n),ka(n,t),n.return=e,n;case v:return t=pi(t,e.mode,n),t.return=e,t;case O:return t=Sa(t),f(e,t,n)}if(F(t)||M(t))return t=ui(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Oa(t),n);if(t.$$typeof===C)return f(e,Xi(e,t),n);Aa(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case O:return n=Sa(n),p(e,t,n,r)}if(F(n)||M(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Oa(n),r);if(n.$$typeof===C)return p(e,t,Xi(e,n),r);Aa(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case O:return r=Sa(r),m(e,t,n,r,i)}if(F(r)||M(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Oa(r),i);if(r.$$typeof===C)return m(e,t,n,Xi(t,r),i);Aa(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),G&&Ci(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return G&&Ci(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),G&&Ci(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),G&&Ci(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return G&&Ci(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),G&&Ci(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===O&&Sa(l)===r.type){n(e,r.sibling),c=a(r,o.props),ka(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===y?(c=ui(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=li(o.type,o.key,o.props,null,e.mode,c),ka(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=pi(o,e.mode,c),c.return=e,e=c}return s(e);case O:return o=Sa(o),b(e,r,o,c)}if(F(o))return h(e,r,o,c);if(M(o)){if(l=M(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Oa(o),c);if(o.$$typeof===C)return b(e,r,Xi(e,o),c);Aa(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=di(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Da=0;var i=b(e,t,n,r);return Ea=null,i}catch(t){if(t===ga||t===va)throw t;var a=ai(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ma=ja(!0),Na=ja(!1),Pa=!1;function Fa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ia(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function La(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ra(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,J&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ni(e),ti(e,null,n),t}return Qr(e,r,t,n),ni(e)}function za(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ze(e,n)}}function Ba(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Va=!1;function Ha(){if(Va){var e=sa;if(e!==null)throw e}}function Ua(e,t,n,r){Va=!1;var i=e.updateQueue;Pa=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(X&f)===f:(r&f)===f){f!==0&&f===oa&&(Va=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Pa=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Wl|=o,e.lanes=o,e.memoizedState=d}}function Wa(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Ga(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Wa(n[e],t)}var Ka=re(null),qa=re(0);function Ja(e,t){e=Hl,R(qa,e),R(Ka,t),Hl=e|t.baseLanes}function Ya(){R(qa,Hl),R(Ka,Ka.current)}function Xa(){Hl=qa.current,ie(Ka),ie(qa)}var Za=re(null),Qa=null;function $a(e){var t=e.alternate;R(io,io.current&1),R(Za,e),Qa===null&&(t===null||Ka.current!==null||t.memoizedState!==null)&&(Qa=e)}function eo(e){R(io,io.current),R(Za,e),Qa===null&&(Qa=e)}function to(e){e.tag===22?(R(io,io.current),R(Za,e),Qa===null&&(Qa=e)):no(e)}function no(){R(io,io.current),R(Za,Za.current)}function ro(e){ie(Za),Qa===e&&(Qa=null),ie(io)}var io=re(0);function ao(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var oo=0,K=null,q=null,so=null,co=!1,lo=!1,uo=!1,fo=0,po=0,mo=null,ho=0;function go(){throw Error(i(321))}function _o(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!yr(e[n],t[n]))return!1;return!0}function vo(e,t,n,r,i,a){return oo=a,K=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,I.H=e===null||e.memoizedState===null?Fs:Is,uo=!1,a=n(r,i),uo=!1,lo&&(a=bo(t,n,r,i)),yo(e),a}function yo(e){I.H=Ps;var t=q!==null&&q.next!==null;if(oo=0,so=q=K=null,co=!1,po=0,mo=null,t)throw Error(i(300));e===null||$s||(e=e.dependencies,e!==null&&qi(e)&&($s=!0))}function bo(e,t,n,r){K=e;var a=0;do{if(lo&&(mo=null),po=0,lo=!1,25<=a)throw Error(i(301));if(a+=1,so=q=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}I.H=Ls,o=t(n,r)}while(lo);return o}function xo(){var e=I.H,t=e.useState()[0];return t=typeof t.then==`function`?Oo(t):t,e=e.useState()[0],(q===null?null:q.memoizedState)!==e&&(K.flags|=1024),t}function So(){var e=fo!==0;return fo=0,e}function Co(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function wo(e){if(co){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}co=!1}oo=0,so=q=K=null,lo=!1,po=fo=0,mo=null}function To(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return so===null?K.memoizedState=so=e:so=so.next=e,so}function Eo(){if(q===null){var e=K.alternate;e=e===null?null:e.memoizedState}else e=q.next;var t=so===null?K.memoizedState:so.next;if(t!==null)so=t,q=e;else{if(e===null)throw K.alternate===null?Error(i(467)):Error(i(310));q=e,e={memoizedState:q.memoizedState,baseState:q.baseState,baseQueue:q.baseQueue,queue:q.queue,next:null},so===null?K.memoizedState=so=e:so=so.next=e}return so}function Do(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Oo(e){var t=po;return po+=1,mo===null&&(mo=[]),e=xa(mo,e,t),t=K,(so===null?t.memoizedState:so.next)===null&&(t=t.alternate,I.H=t===null||t.memoizedState===null?Fs:Is),e}function ko(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Oo(e);if(e.$$typeof===C)return Yi(e)}throw Error(i(438,String(e)))}function Ao(e){var t=null,n=K.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=K.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Do(),K.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=A;return t.index++,n}function jo(e,t){return typeof t==`function`?t(e):t}function Mo(e){return No(Eo(),q,e)}function No(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(oo&f)===f:(X&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===oa&&(d=!0);else if((oo&p)===p){u=u.next,p===oa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,K.lanes|=p,Wl|=p;f=u.action,uo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,K.lanes|=f,Wl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!yr(o,e.memoizedState)&&($s=!0,d&&(n=sa,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Po(e){var t=Eo(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);yr(o,t.memoizedState)||($s=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Fo(e,t,n){var r=K,a=Eo(),o=G;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!yr((q||a).memoizedState,n);if(s&&(a.memoizedState=n,$s=!0),a=a.queue,os(Ro.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||so!==null&&so.memoizedState.tag&1){if(r.flags|=2048,ts(9,{destroy:void 0},Lo.bind(null,r,a,n,t),null),Ll===null)throw Error(i(349));o||oo&127||Io(r,t,n)}return n}function Io(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=K.updateQueue,t===null?(t=Do(),K.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Lo(e,t,n,r){t.value=n,t.getSnapshot=r,zo(t)&&Bo(e)}function Ro(e,t,n){return n(function(){zo(t)&&Bo(e)})}function zo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!yr(e,n)}catch{return!0}}function Bo(e){var t=ei(e,2);t!==null&&mu(t,e,2)}function Vo(e){var t=To();if(typeof e==`function`){var n=e;if(e=n(),uo){Fe(!0);try{n()}finally{Fe(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:jo,lastRenderedState:e},t}function Ho(e,t,n,r){return e.baseState=n,No(e,q,typeof r==`function`?r:jo)}function Uo(e,t,n,r,a){if(js(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};I.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Wo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Wo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=I.T,o={};I.T=o;try{var s=n(i,r),c=I.S;c!==null&&c(o,s),Go(e,t,s)}catch(n){qo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),I.T=a}}else try{a=n(i,r),Go(e,t,a)}catch(n){qo(e,t,n)}}function Go(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Ko(e,t,n)},function(n){return qo(e,t,n)}):Ko(e,t,n)}function Ko(e,t,n){t.status=`fulfilled`,t.value=n,Jo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Wo(e,n)))}function qo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Jo(t),t=t.next;while(t!==r)}e.action=null}function Jo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Yo(e,t){return t}function Xo(e,t){if(G){var n=Ll.formState;if(n!==null){a:{var r=K;if(G){if(Oi){b:{for(var i=Oi,a=Ai;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){Oi=cf(i.nextSibling),r=i.data===`F!`;break a}}Mi(r)}r=!1}r&&(t=n[0])}}return n=To(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yo,lastRenderedState:t},n.queue=r,n=Os.bind(null,K,r),r.dispatch=n,r=Vo(!1),a=As.bind(null,K,!1,r.queue),r=To(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Uo.bind(null,K,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Zo(e){return Qo(Eo(),q,e)}function Qo(e,t,n){if(t=No(e,t,Yo)[0],e=Mo(jo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Oo(t)}catch(e){throw e===ga?va:e}else r=t;t=Eo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(K.flags|=2048,ts(9,{destroy:void 0},$o.bind(null,i,n),null)),[r,a,e]}function $o(e,t){e.action=t}function es(e){var t=Eo(),n=q;if(n!==null)return Qo(t,n,e);Eo(),t=t.memoizedState,n=Eo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function ts(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=K.updateQueue,t===null&&(t=Do(),K.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ns(){return Eo().memoizedState}function rs(e,t,n,r){var i=To();K.flags|=e,i.memoizedState=ts(1|t,{destroy:void 0},n,r===void 0?null:r)}function is(e,t,n,r){var i=Eo();r=r===void 0?null:r;var a=i.memoizedState.inst;q!==null&&r!==null&&_o(r,q.memoizedState.deps)?i.memoizedState=ts(t,a,n,r):(K.flags|=e,i.memoizedState=ts(1|t,a,n,r))}function as(e,t){rs(8390656,8,e,t)}function os(e,t){is(2048,8,e,t)}function ss(e){K.flags|=4;var t=K.updateQueue;if(t===null)t=Do(),K.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function cs(e){var t=Eo().memoizedState;return ss({ref:t,nextImpl:e}),function(){if(J&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ls(e,t){return is(4,2,e,t)}function us(e,t){return is(4,4,e,t)}function ds(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function fs(e,t,n){n=n==null?null:n.concat([e]),is(4,4,ds.bind(null,t,e),n)}function ps(){}function ms(e,t){var n=Eo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&_o(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function hs(e,t){var n=Eo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&_o(t,r[1]))return r[0];if(r=e(),uo){Fe(!0);try{e()}finally{Fe(!1)}}return n.memoizedState=[r,t],r}function gs(e,t,n){return n===void 0||oo&1073741824&&!(X&261930)?e.memoizedState=t:(e.memoizedState=n,e=pu(),K.lanes|=e,Wl|=e,n)}function _s(e,t,n,r){return yr(n,t)?n:Ka.current===null?!(oo&42)||oo&1073741824&&!(X&261930)?($s=!0,e.memoizedState=n):(e=pu(),K.lanes|=e,Wl|=e,t):(e=gs(e,n,r),yr(e,t)||($s=!0),e)}function vs(e,t,n,r,i){var a=L.p;L.p=a!==0&&8>a?a:8;var o=I.T,s={};I.T=s,As(e,!1,t,n);try{var c=i(),l=I.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?ks(e,t,ua(c,r),fu(e)):ks(e,t,r,fu(e))}catch(n){ks(e,t,{then:function(){},status:`rejected`,reason:n},fu())}finally{L.p=a,o!==null&&s.types!==null&&(o.types=s.types),I.T=o}}function ys(){}function bs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=xs(e).queue;vs(e,a,t,ee,n===null?ys:function(){return Ss(e),n(r)})}function xs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ee,baseState:ee,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:jo,lastRenderedState:ee},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:jo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Ss(e){var t=xs(e);t.next===null&&(t=e.alternate.memoizedState),ks(e,t.next.queue,{},fu())}function Cs(){return Yi(Qf)}function ws(){return Eo().memoizedState}function Ts(){return Eo().memoizedState}function Es(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=fu();e=La(n);var r=Ra(t,e,n);r!==null&&(mu(r,t,n),za(r,t,n)),t={cache:na()},e.payload=t;return}t=t.return}}function Ds(e,t,n){var r=fu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},js(e)?Ms(t,n):(n=$r(e,t,n,r),n!==null&&(mu(n,e,r),Ns(n,t,r)))}function Os(e,t,n){ks(e,t,n,fu())}function ks(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(js(e))Ms(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,yr(s,o))return Qr(e,t,i,0),Ll===null&&Zr(),!1}catch{}if(n=$r(e,t,i,r),n!==null)return mu(n,e,r),Ns(n,t,r),!0}return!1}function As(e,t,n,r){if(r={lane:2,revertLane:ud(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},js(e)){if(t)throw Error(i(479))}else t=$r(e,n,r,2),t!==null&&mu(t,e,2)}function js(e){var t=e.alternate;return e===K||t!==null&&t===K}function Ms(e,t){lo=co=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ns(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ze(e,n)}}var Ps={readContext:Yi,use:ko,useCallback:go,useContext:go,useEffect:go,useImperativeHandle:go,useLayoutEffect:go,useInsertionEffect:go,useMemo:go,useReducer:go,useRef:go,useState:go,useDebugValue:go,useDeferredValue:go,useTransition:go,useSyncExternalStore:go,useId:go,useHostTransitionStatus:go,useFormState:go,useActionState:go,useOptimistic:go,useMemoCache:go,useCacheRefresh:go};Ps.useEffectEvent=go;var Fs={readContext:Yi,use:ko,useCallback:function(e,t){return To().memoizedState=[e,t===void 0?null:t],e},useContext:Yi,useEffect:as,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),rs(4194308,4,ds.bind(null,t,e),n)},useLayoutEffect:function(e,t){return rs(4194308,4,e,t)},useInsertionEffect:function(e,t){rs(4,2,e,t)},useMemo:function(e,t){var n=To();t=t===void 0?null:t;var r=e();if(uo){Fe(!0);try{e()}finally{Fe(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=To();if(n!==void 0){var i=n(t);if(uo){Fe(!0);try{n(t)}finally{Fe(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ds.bind(null,K,e),[r.memoizedState,e]},useRef:function(e){var t=To();return e={current:e},t.memoizedState=e},useState:function(e){e=Vo(e);var t=e.queue,n=Os.bind(null,K,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:ps,useDeferredValue:function(e,t){return gs(To(),e,t)},useTransition:function(){var e=Vo(!1);return e=vs.bind(null,K,e.queue,!0,!1),To().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=K,a=To();if(G){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Ll===null)throw Error(i(349));X&127||Io(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,as(Ro.bind(null,r,o,e),[e]),r.flags|=2048,ts(9,{destroy:void 0},Lo.bind(null,r,o,n,t),null),n},useId:function(){var e=To(),t=Ll.identifierPrefix;if(G){var n=Si,r=xi;n=(r&~(1<<32-Ie(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=fo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=ho++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Cs,useFormState:Xo,useActionState:Xo,useOptimistic:function(e){var t=To();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=As.bind(null,K,!0,n),n.dispatch=t,[e,t]},useMemoCache:Ao,useCacheRefresh:function(){return To().memoizedState=Es.bind(null,K)},useEffectEvent:function(e){var t=To(),n={impl:e};return t.memoizedState=n,function(){if(J&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Is={readContext:Yi,use:ko,useCallback:ms,useContext:Yi,useEffect:os,useImperativeHandle:fs,useInsertionEffect:ls,useLayoutEffect:us,useMemo:hs,useReducer:Mo,useRef:ns,useState:function(){return Mo(jo)},useDebugValue:ps,useDeferredValue:function(e,t){return _s(Eo(),q.memoizedState,e,t)},useTransition:function(){var e=Mo(jo)[0],t=Eo().memoizedState;return[typeof e==`boolean`?e:Oo(e),t]},useSyncExternalStore:Fo,useId:ws,useHostTransitionStatus:Cs,useFormState:Zo,useActionState:Zo,useOptimistic:function(e,t){return Ho(Eo(),q,e,t)},useMemoCache:Ao,useCacheRefresh:Ts};Is.useEffectEvent=cs;var Ls={readContext:Yi,use:ko,useCallback:ms,useContext:Yi,useEffect:os,useImperativeHandle:fs,useInsertionEffect:ls,useLayoutEffect:us,useMemo:hs,useReducer:Po,useRef:ns,useState:function(){return Po(jo)},useDebugValue:ps,useDeferredValue:function(e,t){var n=Eo();return q===null?gs(n,e,t):_s(n,q.memoizedState,e,t)},useTransition:function(){var e=Po(jo)[0],t=Eo().memoizedState;return[typeof e==`boolean`?e:Oo(e),t]},useSyncExternalStore:Fo,useId:ws,useHostTransitionStatus:Cs,useFormState:es,useActionState:es,useOptimistic:function(e,t){var n=Eo();return q===null?(n.baseState=e,[e,n.queue.dispatch]):Ho(n,q,e,t)},useMemoCache:Ao,useCacheRefresh:Ts};Ls.useEffectEvent=cs;function Rs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var zs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=fu(),i=La(r);i.payload=t,n!=null&&(i.callback=n),t=Ra(e,i,r),t!==null&&(mu(t,e,r),za(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=fu(),i=La(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ra(e,i,r),t!==null&&(mu(t,e,r),za(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=fu(),r=La(n);r.tag=2,t!=null&&(r.callback=t),t=Ra(e,r,n),t!==null&&(mu(t,e,n),za(t,e,n))}};function Bs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!br(n,r)||!br(i,a):!0}function Vs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&zs.enqueueReplaceState(t,t.state,null)}function Hs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Us(e){qr(e)}function Ws(e){console.error(e)}function Gs(e){qr(e)}function Ks(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function qs(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Js(e,t,n){return n=La(n),n.tag=3,n.payload={element:null},n.callback=function(){Ks(e,t)},n}function Ys(e){return e=La(e),e.tag=3,e}function Xs(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){qs(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){qs(t,n,r),typeof i!=`function`&&(nu===null?nu=new Set([this]):nu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Zs(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Ki(t,n,a,!0),n=Za.current,n!==null){switch(n.tag){case 31:case 13:return Qa===null?Eu():n.alternate===null&&Ul===0&&(Ul=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===ya?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Wu(e,r,a)),!1;case 22:return n.flags|=65536,r===ya?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Wu(e,r,a)),!1}throw Error(i(435,n.tag))}return Wu(e,r,a),Eu(),!1}if(G)return t=Za.current,t===null?(r!==ji&&(t=Error(i(423),{cause:r}),Ri(hi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=hi(r,n),a=Js(e.stateNode,r,a),Ba(e,a),Ul!==4&&(Ul=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ji&&(e=Error(i(422),{cause:r}),Ri(hi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=hi(o,n),Yl===null?Yl=[o]:Yl.push(o),Ul!==4&&(Ul=2),t===null)return!0;r=hi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Js(n.stateNode,r,e),Ba(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(nu===null||!nu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Ys(a),Xs(a,e,n,r),Ba(n,a),!1}n=n.return}while(n!==null);return!1}var Qs=Error(i(461)),$s=!1;function ec(e,t,n,r){t.child=e===null?Na(t,null,n,r):Ma(t,e.child,n,r)}function tc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Ji(t),r=vo(e,t,n,o,a,i),s=So(),e!==null&&!$s?(Co(e,t,i),Tc(e,t,i)):(G&&s&&Ti(t),t.flags|=1,ec(e,t,r,i),t.child)}function nc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!oi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,rc(e,t,a,r,i)):(e=li(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Ec(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?br:n,n(o,r)&&e.ref===t.ref)return Tc(e,t,i)}return t.flags|=1,e=si(a,r),e.ref=t.ref,e.return=t,t.child=e}function rc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(br(a,r)&&e.ref===t.ref){if($s=!1,t.pendingProps=r=a,Ec(e,i))e.flags&131072&&($s=!0);else return t.lanes=e.lanes,Tc(e,t,i)}}return dc(e,t,n,r,i)}function ic(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return oc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&ma(t,a===null?null:a.cachePool),a===null?Ya():Ja(t,a),to(t);else return r=t.lanes=536870912,oc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&ma(t,null),Ya(),no(t)):(ma(t,a.cachePool),Ja(t,a),no(t),t.memoizedState=null);return ec(e,t,i,n),t.child}function ac(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function oc(e,t,n,r,i){var a=pa();return a=a===null?null:{parent:ta._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&ma(t,null),Ya(),to(t),e!==null&&Ki(e,t,r,!0),t.childLanes=i,null}function sc(e,t){return t=bc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function cc(e,t,n){return Ma(t,e.child,null,n),e=sc(t,t.pendingProps),e.flags|=2,ro(t),t.memoizedState=null,e}function lc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(G){if(r.mode===`hidden`)return e=sc(t,r),t.lanes=536870912,ac(null,e);if(eo(t),(e=Oi)?(e=rf(e,Ai),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:bi===null?null:{id:xi,overflow:Si},retryLane:536870912,hydrationErrors:null},n=fi(e),n.return=t,t.child=n,Di=t,Oi=null)):e=null,e===null)throw Mi(t);return t.lanes=536870912,null}return sc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(eo(t),a){if(t.flags&256)t.flags&=-257,t=cc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if($s||Ki(e,t,n,!1),a=(n&e.childLanes)!==0,$s||a){if(r=Ll,r!==null&&(s=Qe(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ei(e,s),mu(r,e,s),Qs;Eu(),t=cc(e,t,n)}else e=o.treeContext,Oi=cf(s.nextSibling),Di=t,G=!0,ki=null,Ai=!1,e!==null&&Ei(t,e),t=sc(t,r),t.flags|=4096;return t}return e=si(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function uc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function dc(e,t,n,r,i){return Ji(t),n=vo(e,t,n,r,void 0,i),r=So(),e!==null&&!$s?(Co(e,t,i),Tc(e,t,i)):(G&&r&&Ti(t),t.flags|=1,ec(e,t,n,i),t.child)}function fc(e,t,n,r,i,a){return Ji(t),t.updateQueue=null,n=bo(t,r,n,i),yo(e),r=So(),e!==null&&!$s?(Co(e,t,a),Tc(e,t,a)):(G&&r&&Ti(t),t.flags|=1,ec(e,t,n,a),t.child)}function pc(e,t,n,r,i){if(Ji(t),t.stateNode===null){var a=ri,o=n.contextType;typeof o==`object`&&o&&(a=Yi(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=zs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Fa(t),o=n.contextType,a.context=typeof o==`object`&&o?Yi(o):ri,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Rs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&zs.enqueueReplaceState(a,a.state,null),Ua(t,r,a,i),Ha(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Hs(n,s);a.props=c;var l=a.context,u=n.contextType;o=ri,typeof u==`object`&&u&&(o=Yi(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Vs(t,a,r,o),Pa=!1;var f=t.memoizedState;a.state=f,Ua(t,r,a,i),Ha(),l=t.memoizedState,s||f!==l||Pa?(typeof d==`function`&&(Rs(t,n,d,r),l=t.memoizedState),(c=Pa||Bs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ia(e,t),o=t.memoizedProps,u=Hs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ri,typeof l==`object`&&l&&(c=Yi(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Vs(t,a,r,c),Pa=!1,f=t.memoizedState,a.state=f,Ua(t,r,a,i),Ha();var p=t.memoizedState;o!==d||f!==p||Pa||e!==null&&e.dependencies!==null&&qi(e.dependencies)?(typeof s==`function`&&(Rs(t,n,s,r),p=t.memoizedState),(u=Pa||Bs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&qi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,uc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ma(t,e.child,null,i),t.child=Ma(t,null,n,i)):ec(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Tc(e,t,i),e}function mc(e,t,n,r){return Ii(),t.flags|=256,ec(e,t,n,r),t.child}var hc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function gc(e){return{baseLanes:e,cachePool:ha()}}function _c(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ql),e}function vc(e,t,n){var r=t.pendingProps,a=!1,o=!!(t.flags&128),s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:!!(io.current&2)),s&&(a=!0,t.flags&=-129),s=!!(t.flags&32),t.flags&=-33,e===null){if(G){if(a?$a(t):no(t),(e=Oi)?(e=rf(e,Ai),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:bi===null?null:{id:xi,overflow:Si},retryLane:536870912,hydrationErrors:null},n=fi(e),n.return=t,t.child=n,Di=t,Oi=null)):e=null,e===null)throw Mi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(no(t),a=t.mode,c=bc({mode:`hidden`,children:c},a),r=ui(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=gc(n),r.childLanes=_c(e,s,n),t.memoizedState=hc,ac(null,r)):($a(t),yc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?($a(t),t.flags&=-257,t=xc(e,t,n)):t.memoizedState===null?(no(t),c=r.fallback,a=t.mode,r=bc({mode:`visible`,children:r.children},a),c=ui(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ma(t,e.child,null,n),r=t.child,r.memoizedState=gc(n),r.childLanes=_c(e,s,n),t.memoizedState=hc,t=ac(null,r)):(no(t),t.child=e.child,t.flags|=128,t=null);else if($a(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Ri({value:r,source:null,stack:null}),t=xc(e,t,n)}else if($s||Ki(e,t,n,!1),s=(n&e.childLanes)!==0,$s||s){if(s=Ll,s!==null&&(r=Qe(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ei(e,r),mu(s,e,r),Qs;af(c)||Eu(),t=xc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,Oi=cf(c.nextSibling),Di=t,G=!0,ki=null,Ai=!1,e!==null&&Ei(t,e),t=yc(t,r.children),t.flags|=4096);return t}return a?(no(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=si(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=ui(c,a,n,null),c.flags|=2):c=si(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,ac(null,r),r=t.child,c=e.child.memoizedState,c===null?c=gc(n):(a=c.cachePool,a===null?a=ha():(l=ta._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=_c(e,s,n),t.memoizedState=hc,ac(e.child,r)):($a(t),n=e.child,e=n.sibling,n=si(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function yc(e,t){return t=bc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function bc(e,t){return e=ai(22,e,null,t),e.lanes=0,e}function xc(e,t,n){return Ma(t,e.child,null,n),e=yc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Sc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Wi(e.return,t,n)}function Cc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function wc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=io.current,s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,R(io,o),ec(e,t,r,n),r=G?_i:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Sc(e,n,t);else if(e.tag===19)Sc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ao(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Cc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ao(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Cc(t,!0,n,null,a,r);break;case`together`:Cc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Tc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Wl|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(Ki(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=si(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=si(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ec(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&qi(e)))}function Dc(e,t,n){switch(t.tag){case 3:ce(t,t.stateNode.containerInfo),Hi(t,ta,e.memoizedState.cache),Ii();break;case 27:case 5:ue(t);break;case 4:ce(t,t.stateNode.containerInfo);break;case 10:Hi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,eo(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?($a(t),e=Tc(e,t,n),e===null?null:e.sibling):vc(e,t,n):($a(t),t.flags|=128,null);$a(t);break;case 19:var i=!!(e.flags&128);if(r=(n&t.childLanes)!==0,r||=(Ki(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return wc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),R(io,io.current),r)break;return null;case 22:return t.lanes=0,ic(e,t,n,t.pendingProps);case 24:Hi(t,ta,e.memoizedState.cache)}return Tc(e,t,n)}function Oc(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)$s=!0;else{if(!Ec(e,n)&&!(t.flags&128))return $s=!1,Dc(e,t,n);$s=!!(e.flags&131072)}}else $s=!1,G&&t.flags&1048576&&wi(t,_i,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Sa(t.elementType),t.type=e,typeof e==`function`)oi(e)?(r=Hs(e,r),t.tag=1,t=pc(null,t,e,r,n)):(t.tag=0,t=dc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=tc(null,t,e,r,n);break a}if(a===D){t.tag=14,t=nc(null,t,e,r,n);break a}}throw t=P(e)||e,Error(i(306,t,``))}}return t;case 0:return dc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Hs(r,t.pendingProps),pc(e,t,r,a,n);case 3:a:{if(ce(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ia(e,t),Ua(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Hi(t,ta,r),r!==o.cache&&Gi(t,[ta],n,!0),Ha(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=mc(e,t,r,n);break a}if(r!==a){a=hi(Error(i(424)),t),Ri(a),t=mc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(Oi=cf(e.firstChild),Di=t,G=!0,ki=null,Ai=!0,n=Na(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ii(),r===a){t=Tc(e,t,n);break a}ec(e,t,r,n)}t=t.child}return t;case 26:return uc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:G||(n=t.type,e=t.pendingProps,r=Bd(z.current).createElement(n),r[it]=t,r[at]=e,Pd(r,n,e),_t(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ue(t),e===null&&G&&(r=t.stateNode=ff(t.type,t.pendingProps,z.current),Di=t,Ai=!0,a=Oi,Zd(t.type)?(lf=a,Oi=cf(r.firstChild)):Oi=a),ec(e,t,t.pendingProps.children,n),uc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&G&&((a=r=Oi)&&(r=tf(r,t.type,t.pendingProps,Ai),r===null?a=!1:(t.stateNode=r,Di=t,Oi=cf(r.firstChild),Ai=!1,a=!0)),a||Mi(t)),ue(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=vo(e,t,xo,null,null,n),Qf._currentValue=a),uc(e,t),ec(e,t,r,n),t.child;case 6:return e===null&&G&&((e=n=Oi)&&(n=nf(n,t.pendingProps,Ai),n===null?e=!1:(t.stateNode=n,Di=t,Oi=null,e=!0)),e||Mi(t)),null;case 13:return vc(e,t,n);case 4:return ce(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ma(t,null,r,n):ec(e,t,r,n),t.child;case 11:return tc(e,t,t.type,t.pendingProps,n);case 7:return ec(e,t,t.pendingProps,n),t.child;case 8:return ec(e,t,t.pendingProps.children,n),t.child;case 12:return ec(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Hi(t,t.type,r.value),ec(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Ji(t),a=Yi(a),r=r(a),t.flags|=1,ec(e,t,r,n),t.child;case 14:return nc(e,t,t.type,t.pendingProps,n);case 15:return rc(e,t,t.type,t.pendingProps,n);case 19:return wc(e,t,n);case 31:return lc(e,t,n);case 22:return ic(e,t,n,t.pendingProps);case 24:return Ji(t),r=Yi(ta),e===null?(a=pa(),a===null&&(a=Ll,o=na(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Fa(t),Hi(t,ta,a)):((e.lanes&n)!==0&&(Ia(e,t),Ua(t,null,null,n),Ha()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Hi(t,ta,r),r!==a.cache&&Gi(t,[ta],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Hi(t,ta,r))),ec(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function kc(e){e.flags|=4}function Ac(e,t,n,r,i){if((t=!!(e.mode&32))&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Cu())e.flags|=8192;else throw Ca=ya,_a}}else e.flags&=-16777217}function jc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t)){if(Cu())e.flags|=8192;else throw Ca=ya,_a}}function Mc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Ke(),e.lanes|=t,Jl|=t)}function Nc(e,t){if(!G)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Pc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Fc(e,t,n){var r=t.pendingProps;switch(W(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pc(t),null;case 1:return Pc(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Ui(ta),le(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Fi(t)?kc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Li())),Pc(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(kc(t),o===null?(Pc(t),Ac(t,a,null,r,n)):(Pc(t),jc(t,o))):o?o===e.memoizedState?(Pc(t),t.flags&=-16777217):(kc(t),Pc(t),jc(t,o)):(e=e.memoizedProps,e!==r&&kc(t),Pc(t),Ac(t,a,e,r,n)),null;case 27:if(de(t),n=z.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&kc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Pc(t),null}e=ae.current,Fi(t)?Ni(t,e):(e=ff(a,r,n),t.stateNode=e,kc(t))}return Pc(t),null;case 5:if(de(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&kc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Pc(t),null}if(o=ae.current,Fi(t))Ni(t,o);else{var s=Bd(z.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[it]=t,o[at]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&kc(t)}}return Pc(t),Ac(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&kc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=z.current,Fi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Di,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[it]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||jd(e.nodeValue,n)),e||Mi(t,!0)}else e=Bd(e).createTextNode(r),e[it]=t,t.stateNode=e}return Pc(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Fi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[it]=t}else Ii(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Pc(t),e=!1}else n=Li(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(ro(t),t):(ro(t),null);if(t.flags&128)throw Error(i(558))}return Pc(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Fi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[it]=t}else Ii(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Pc(t),a=!1}else a=Li(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(ro(t),t):(ro(t),null)}return ro(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Mc(t,t.updateQueue),Pc(t),null);case 4:return le(),e===null&&xd(t.stateNode.containerInfo),Pc(t),null;case 10:return Ui(t.type),Pc(t),null;case 19:if(ie(io),r=t.memoizedState,r===null)return Pc(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)Nc(r,!1);else{if(Ul!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=ao(e),o!==null){for(t.flags|=128,Nc(r,!1),e=o.updateQueue,t.updateQueue=e,Mc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)ci(n,e),n=n.sibling;return R(io,io.current&1|2),G&&Ci(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&we()>eu&&(t.flags|=128,a=!0,Nc(r,!1),t.lanes=4194304)}}else{if(!a){if(e=ao(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Mc(t,e),Nc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!G)return Pc(t),null}else 2*we()-r.renderingStartTime>eu&&n!==536870912&&(t.flags|=128,a=!0,Nc(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Pc(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=we(),e.sibling=null,n=io.current,R(io,a?n&1|2:n&1),G&&Ci(t,r.treeForkCount),e);case 22:case 23:return ro(t),Xa(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Pc(t),t.subtreeFlags&6&&(t.flags|=8192)):Pc(t),n=t.updateQueue,n!==null&&Mc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&ie(fa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ui(ta),Pc(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Ic(e,t){switch(W(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ui(ta),le(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return de(t),null;case 31:if(t.memoizedState!==null){if(ro(t),t.alternate===null)throw Error(i(340));Ii()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ro(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Ii()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ie(io),null;case 4:return le(),null;case 10:return Ui(t.type),null;case 22:case 23:return ro(t),Xa(),e!==null&&ie(fa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ui(ta),null;case 25:return null;default:return null}}function Lc(e,t){switch(W(t),t.tag){case 3:Ui(ta),le();break;case 26:case 27:case 5:de(t);break;case 4:le();break;case 31:t.memoizedState!==null&&ro(t);break;case 13:ro(t);break;case 19:ie(io);break;case 10:Ui(t.type);break;case 22:case 23:ro(t),Xa(),e!==null&&ie(fa);break;case 24:Ui(ta)}}function Rc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Q(t,t.return,e)}}function zc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Q(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Q(t,t.return,e)}}function Bc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ga(t,n)}catch(t){Q(e,e.return,t)}}}function Vc(e,t,n){n.props=Hs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Q(e,t,n)}}function Hc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Q(e,t,n)}}function Uc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Q(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Q(e,t,n)}else n.current=null}}function Wc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Q(e,e.return,t)}}function Gc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[at]=t}catch(t){Q(e,e.return,t)}}function Kc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function qc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Kc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Jc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Zt));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Jc(e,t,n),e=e.sibling;e!==null;)Jc(e,t,n),e=e.sibling}function Yc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Yc(e,t,n),e=e.sibling;e!==null;)Yc(e,t,n),e=e.sibling}function Xc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[it]=e,t[at]=n}catch(t){Q(e,e.return,t)}}var Zc=!1,Qc=!1,$c=!1,el=typeof WeakSet==`function`?WeakSet:Set,tl=null;function nl(e,t){if(e=e.containerInfo,Rd=sp,e=wr(e),Tr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,tl=t;tl!==null;)if(t=tl,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,tl=e;else for(;tl!==null;){switch(t=tl,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Hs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Q(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,tl=e;break}tl=t.return}}function rl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:vl(e,n),r&4&&Rc(5,n);break;case 1:if(vl(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Q(n,n.return,e)}else{var i=Hs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Q(n,n.return,e)}}}r&64&&Bc(n),r&512&&Hc(n,n.return);break;case 3:if(vl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ga(e,t)}catch(e){Q(n,n.return,e)}}break;case 27:t===null&&r&4&&Xc(n);case 26:case 5:vl(e,n),t===null&&r&4&&Wc(n),r&512&&Hc(n,n.return);break;case 12:vl(e,n);break;case 31:vl(e,n),r&4&&ll(e,n);break;case 13:vl(e,n),r&4&&ul(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=qu.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||Zc,!r){t=t!==null&&t.memoizedState!==null||Qc,i=Zc;var a=Qc;Zc=r,(Qc=t)&&!a?bl(e,n,!!(n.subtreeFlags&8772)):vl(e,n),Zc=i,Qc=a}break;case 30:break;default:vl(e,n)}}function il(e){var t=e.alternate;t!==null&&(e.alternate=null,il(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&ft(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var al=null,ol=!1;function sl(e,t,n){for(n=n.child;n!==null;)cl(e,t,n),n=n.sibling}function cl(e,t,n){if(Pe&&typeof Pe.onCommitFiberUnmount==`function`)try{Pe.onCommitFiberUnmount(Ne,n)}catch{}switch(n.tag){case 26:Qc||Uc(n,t),sl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Qc||Uc(n,t);var r=al,i=ol;Zd(n.type)&&(al=n.stateNode,ol=!1),sl(e,t,n),pf(n.stateNode),al=r,ol=i;break;case 5:Qc||Uc(n,t);case 6:if(r=al,i=ol,al=null,sl(e,t,n),al=r,ol=i,al!==null){if(ol)try{(al.nodeType===9?al.body:al.nodeName===`HTML`?al.ownerDocument.body:al).removeChild(n.stateNode)}catch(e){Q(n,t,e)}else try{al.removeChild(n.stateNode)}catch(e){Q(n,t,e)}}break;case 18:al!==null&&(ol?(e=al,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(al,n.stateNode));break;case 4:r=al,i=ol,al=n.stateNode.containerInfo,ol=!0,sl(e,t,n),al=r,ol=i;break;case 0:case 11:case 14:case 15:zc(2,n,t),Qc||zc(4,n,t),sl(e,t,n);break;case 1:Qc||(Uc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Vc(n,t,r)),sl(e,t,n);break;case 21:sl(e,t,n);break;case 22:Qc=(r=Qc)||n.memoizedState!==null,sl(e,t,n),Qc=r;break;default:sl(e,t,n)}}function ll(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Q(t,t.return,e)}}}function ul(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Q(t,t.return,e)}}function dl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new el),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new el),t;default:throw Error(i(435,e.tag))}}function fl(e,t){var n=dl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Ju.bind(null,e,t);t.then(r,r)}})}function pl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){al=c.stateNode,ol=!1;break a}break;case 5:al=c.stateNode,ol=!1;break a;case 3:case 4:al=c.stateNode.containerInfo,ol=!0;break a}c=c.return}if(al===null)throw Error(i(160));cl(o,s,a),al=null,ol=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)hl(t,e),t=t.sibling}var ml=null;function hl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:pl(t,e),gl(e),r&4&&(zc(3,e,e.return),Rc(3,e),zc(5,e,e.return));break;case 1:pl(t,e),gl(e),r&512&&(Qc||n===null||Uc(n,n.return)),r&64&&Zc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=ml;if(pl(t,e),gl(e),r&512&&(Qc||n===null||Uc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null){if(r===null){if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[dt]||o[it]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[it]=e,_t(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[it]=e,_t(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode)}else e.stateNode=If(a,r,e.memoizedProps)}else o===r?r===null&&e.stateNode!==null&&Gc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:pl(t,e),gl(e),r&512&&(Qc||n===null||Uc(n,n.return)),n!==null&&r&4&&Gc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(pl(t,e),gl(e),r&512&&(Qc||n===null||Uc(n,n.return)),e.flags&32){a=e.stateNode;try{Ut(a,``)}catch(t){Q(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Gc(e,a,n===null?a:n.memoizedProps)),r&1024&&($c=!0);break;case 6:if(pl(t,e),gl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Q(e,e.return,t)}}break;case 3:if(Bf=null,a=ml,ml=gf(t.containerInfo),pl(t,e),ml=a,gl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Q(e,e.return,t)}$c&&($c=!1,_l(e));break;case 4:r=ml,ml=gf(e.stateNode.containerInfo),pl(t,e),gl(e),ml=r;break;case 12:pl(t,e),gl(e);break;case 31:pl(t,e),gl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,fl(e,r)));break;case 13:pl(t,e),gl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Ql=we()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,fl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Zc,d=Qc;if(Zc=u||a,Qc=d||l,pl(t,e),Qc=d,Zc=u,gl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Zc||Qc||yl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Q(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Q(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Q(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,fl(e,n))));break;case 19:pl(t,e),gl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,fl(e,r)));break;case 30:break;case 21:break;default:pl(t,e),gl(e)}}function gl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Kc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Yc(e,qc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Ut(o,``),n.flags&=-33),Yc(e,qc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Jc(e,qc(e),s);break;default:throw Error(i(161))}}catch(t){Q(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function _l(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;_l(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function vl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)rl(e,t.alternate,t),t=t.sibling}function yl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:zc(4,t,t.return),yl(t);break;case 1:Uc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Vc(t,t.return,n),yl(t);break;case 27:pf(t.stateNode);case 26:case 5:Uc(t,t.return),yl(t);break;case 22:t.memoizedState===null&&yl(t);break;case 30:yl(t);break;default:yl(t)}e=e.sibling}}function bl(e,t,n){for(n&&=!!(t.subtreeFlags&8772),t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:bl(i,a,n),Rc(4,a);break;case 1:if(bl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Q(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Wa(c[i],s)}catch(e){Q(r,r.return,e)}}n&&o&64&&Bc(a),Hc(a,a.return);break;case 27:Xc(a);case 26:case 5:bl(i,a,n),n&&r===null&&o&4&&Wc(a),Hc(a,a.return);break;case 12:bl(i,a,n);break;case 31:bl(i,a,n),n&&o&4&&ll(i,a);break;case 13:bl(i,a,n),n&&o&4&&ul(i,a);break;case 22:a.memoizedState===null&&bl(i,a,n),Hc(a,a.return);break;case 30:break;default:bl(i,a,n)}t=t.sibling}}function xl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ra(n))}function Sl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ra(e))}function Cl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)wl(e,t,n,r),t=t.sibling}function wl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Cl(e,t,n,r),i&2048&&Rc(9,t);break;case 1:Cl(e,t,n,r);break;case 3:Cl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ra(e)));break;case 12:if(i&2048){Cl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Q(t,t.return,e)}}else Cl(e,t,n,r);break;case 31:Cl(e,t,n,r);break;case 13:Cl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Cl(e,t,n,r):(a._visibility|=2,Tl(e,t,n,r,!!(t.subtreeFlags&10256)||!1)):a._visibility&2?Cl(e,t,n,r):El(e,t),i&2048&&xl(o,t);break;case 24:Cl(e,t,n,r),i&2048&&Sl(t.alternate,t);break;default:Cl(e,t,n,r)}}function Tl(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Tl(a,o,s,c,i),Rc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Tl(a,o,s,c,i)):u._visibility&2?Tl(a,o,s,c,i):El(a,o),i&&l&2048&&xl(o.alternate,o);break;case 24:Tl(a,o,s,c,i),i&&l&2048&&Sl(o.alternate,o);break;default:Tl(a,o,s,c,i)}t=t.sibling}}function El(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:El(n,r),i&2048&&xl(r.alternate,r);break;case 24:El(n,r),i&2048&&Sl(r.alternate,r);break;default:El(n,r)}t=t.sibling}}var Dl=8192;function Ol(e,t,n){if(e.subtreeFlags&Dl)for(e=e.child;e!==null;)kl(e,t,n),e=e.sibling}function kl(e,t,n){switch(e.tag){case 26:Ol(e,t,n),e.flags&Dl&&e.memoizedState!==null&&Gf(n,ml,e.memoizedState,e.memoizedProps);break;case 5:Ol(e,t,n);break;case 3:case 4:var r=ml;ml=gf(e.stateNode.containerInfo),Ol(e,t,n),ml=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Dl,Dl=16777216,Ol(e,t,n),Dl=r):Ol(e,t,n));break;default:Ol(e,t,n)}}function Al(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function jl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];tl=r,Pl(r,e)}Al(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ml(e),e=e.sibling}function Ml(e){switch(e.tag){case 0:case 11:case 15:jl(e),e.flags&2048&&zc(9,e,e.return);break;case 3:jl(e);break;case 12:jl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Nl(e)):jl(e);break;default:jl(e)}}function Nl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];tl=r,Pl(r,e)}Al(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:zc(8,t,t.return),Nl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Nl(t));break;default:Nl(t)}e=e.sibling}}function Pl(e,t){for(;tl!==null;){var n=tl;switch(n.tag){case 0:case 11:case 15:zc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ra(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,tl=r;else a:for(n=e;tl!==null;){r=tl;var i=r.sibling,a=r.return;if(il(r),r===n){tl=null;break a}if(i!==null){i.return=a,tl=i;break a}tl=a}}}var Fl={getCacheForType:function(e){var t=Yi(ta),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Yi(ta).controller.signal}},Il=typeof WeakMap==`function`?WeakMap:Map,J=0,Ll=null,Y=null,X=0,Z=0,Rl=null,zl=!1,Bl=!1,Vl=!1,Hl=0,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=null,Xl=null,Zl=!1,Ql=0,$l=0,eu=1/0,tu=null,nu=null,ru=0,iu=null,au=null,ou=0,su=0,cu=null,lu=null,uu=0,du=null;function fu(){return J&2&&X!==0?X&-X:I.T===null?tt():ud()}function pu(){if(ql===0){if(!(X&536870912)||G){var e=Be;Be<<=1,!(Be&3932160)&&(Be=262144),ql=e}else ql=536870912}return e=Za.current,e!==null&&(e.flags|=32),ql}function mu(e,t,n){(e===Ll&&(Z===2||Z===9)||e.cancelPendingCommit!==null)&&(xu(e,0),vu(e,X,ql,!1)),Je(e,n),(!(J&2)||e!==Ll)&&(e===Ll&&(!(J&2)&&(Gl|=n),Ul===4&&vu(e,X,ql,!1)),nd(e))}function hu(e,t,n){if(J&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||We(e,t),a=r?ku(e,t):Du(e,t,!0),o=r;do{if(a===0){Bl&&!r&&vu(e,t,0,!1);break}if(n=e.current.alternate,o&&!_u(n)){a=Du(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Yl;var l=c.current.memoizedState.isDehydrated;if(l&&(xu(c,s).flags|=256),s=Du(c,s,!1),s!==2){if(Vl&&!l){c.errorRecoveryDisabledLanes|=o,Gl|=o,a=4;break a}o=Xl,Xl=a,o!==null&&(Xl===null?Xl=o:Xl.push.apply(Xl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){xu(e,0),vu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:vu(r,t,ql,!zl);break a;case 2:Xl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=Ql+300-we(),10<a)){if(vu(r,t,ql,!zl),Ue(r,0,!0)!==0)break a;ou=t,r.timeoutHandle=Kd(gu.bind(null,r,n,Xl,tu,Zl,t,ql,Gl,Jl,zl,o,`Throttled`,-0,0),a);break a}gu(r,n,Xl,tu,Zl,t,ql,Gl,Jl,zl,o,null,-0,0)}break}while(1);nd(e)}function gu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Zt},kl(t,a,d);var m=(a&62914560)===a?Ql-we():(a&4194048)===a?$l-we():0;if(m=qf(d,m),m!==null){ou=a,e.cancelPendingCommit=m(Iu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),vu(e,a,o,!l);return}}Iu(e,t,a,n,r,i,o,s,c)}function _u(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!yr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function vu(e,t,n,r){t&=~Kl,t&=~Gl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Ie(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&Xe(e,n,t)}function yu(){return J&6?!0:(rd(0,!1),!1)}function bu(){if(Y!==null){if(Z===0)var e=Y.return;else e=Y,Vi=Bi=null,wo(e),Ea=null,Da=0,e=Y;for(;e!==null;)Lc(e.alternate,e),e=e.return;Y=null}}function xu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),ou=0,bu(),Ll=e,Y=n=si(e.current,null),X=t,Z=0,Rl=null,zl=!1,Bl=We(e,t),Vl=!1,Jl=ql=Kl=Gl=Wl=Ul=0,Xl=Yl=null,Zl=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Ie(r),a=1<<i;t|=e[i],r&=~a}return Hl=t,Zr(),n}function Su(e,t){K=null,I.H=Ps,t===ga||t===va?(t=wa(),Z=3):t===_a?(t=wa(),Z=4):Z=t===Qs?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Rl=t,Y===null&&(Ul=1,Ks(e,hi(t,e.current)))}function Cu(){var e=Za.current;return e===null?!0:(X&4194048)===X?Qa===null:(X&62914560)===X||X&536870912?e===Qa:!1}function wu(){var e=I.H;return I.H=Ps,e===null?Ps:e}function Tu(){var e=I.A;return I.A=Fl,e}function Eu(){Ul=4,zl||(X&4194048)!==X&&Za.current!==null||(Bl=!0),!(Wl&134217727)&&!(Gl&134217727)||Ll===null||vu(Ll,X,ql,!1)}function Du(e,t,n){var r=J;J|=2;var i=wu(),a=Tu();(Ll!==e||X!==t)&&(tu=null,xu(e,t)),t=!1;var o=Ul;a:do try{if(Z!==0&&Y!==null){var s=Y,c=Rl;switch(Z){case 8:bu(),o=6;break a;case 3:case 2:case 9:case 6:Za.current===null&&(t=!0);var l=Z;if(Z=0,Rl=null,Nu(e,s,c,l),n&&Bl){o=0;break a}break;default:l=Z,Z=0,Rl=null,Nu(e,s,c,l)}}Ou(),o=Ul;break}catch(t){Su(e,t)}while(1);return t&&e.shellSuspendCounter++,Vi=Bi=null,J=r,I.H=i,I.A=a,Y===null&&(Ll=null,X=0,Zr()),o}function Ou(){for(;Y!==null;)ju(Y)}function ku(e,t){var n=J;J|=2;var r=wu(),a=Tu();Ll!==e||X!==t?(tu=null,eu=we()+500,xu(e,t)):Bl=We(e,t);a:do try{if(Z!==0&&Y!==null){t=Y;var o=Rl;b:switch(Z){case 1:Z=0,Rl=null,Nu(e,t,o,1);break;case 2:case 9:if(ba(o)){Z=0,Rl=null,Mu(t);break}t=function(){Z!==2&&Z!==9||Ll!==e||(Z=7),nd(e)},o.then(t,t);break a;case 3:Z=7;break a;case 4:Z=5;break a;case 7:ba(o)?(Z=0,Rl=null,Mu(t)):(Z=0,Rl=null,Nu(e,t,o,7));break;case 5:var s=null;switch(Y.tag){case 26:s=Y.memoizedState;case 5:case 27:var c=Y;if(s?Wf(s):c.stateNode.complete){Z=0,Rl=null;var l=c.sibling;if(l!==null)Y=l;else{var u=c.return;u===null?Y=null:(Y=u,Pu(u))}break b}}Z=0,Rl=null,Nu(e,t,o,5);break;case 6:Z=0,Rl=null,Nu(e,t,o,6);break;case 8:bu(),Ul=6;break a;default:throw Error(i(462))}}Au();break}catch(t){Su(e,t)}while(1);return Vi=Bi=null,I.H=r,I.A=a,J=n,Y===null?(Ll=null,X=0,Zr(),Ul):0}function Au(){for(;Y!==null&&!Se();)ju(Y)}function ju(e){var t=Oc(e.alternate,e,Hl);e.memoizedProps=e.pendingProps,t===null?Pu(e):Y=t}function Mu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=fc(n,t,t.pendingProps,t.type,void 0,X);break;case 11:t=fc(n,t,t.pendingProps,t.type.render,t.ref,X);break;case 5:wo(t);default:Lc(n,t),t=Y=ci(t,Hl),t=Oc(n,t,Hl)}e.memoizedProps=e.pendingProps,t===null?Pu(e):Y=t}function Nu(e,t,n,r){Vi=Bi=null,wo(t),Ea=null,Da=0;var i=t.return;try{if(Zs(e,i,t,n,X)){Ul=1,Ks(e,hi(n,e.current)),Y=null;return}}catch(t){if(i!==null)throw Y=i,t;Ul=1,Ks(e,hi(n,e.current)),Y=null;return}t.flags&32768?(G||r===1?e=!0:Bl||X&536870912?e=!1:(zl=e=!0,(r===2||r===9||r===3||r===6)&&(r=Za.current,r!==null&&r.tag===13&&(r.flags|=16384))),Fu(t,e)):Pu(t)}function Pu(e){var t=e;do{if(t.flags&32768){Fu(t,zl);return}e=t.return;var n=Fc(t.alternate,t,Hl);if(n!==null){Y=n;return}if(t=t.sibling,t!==null){Y=t;return}Y=t=e}while(t!==null);Ul===0&&(Ul=5)}function Fu(e,t){do{var n=Ic(e.alternate,e);if(n!==null){n.flags&=32767,Y=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Y=e;return}Y=e=n}while(e!==null);Ul=6,Y=null}function Iu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Vu();while(ru!==0);if(J&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Xr,Ye(e,n,o,s,c,l),e===Ll&&(Y=Ll=null,X=0),au=t,iu=e,ou=n,su=o,cu=a,lu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Yu(Oe,function(){return Hu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=I.T,I.T=null,a=L.p,L.p=2,s=J,J|=4;try{nl(e,t,n)}finally{J=s,L.p=a,I.T=r}}ru=1,Lu(),Ru(),zu()}}function Lu(){if(ru===1){ru=0;var e=iu,t=au,n=!!(t.flags&13878);if(t.subtreeFlags&13878||n){n=I.T,I.T=null;var r=L.p;L.p=2;var i=J;J|=4;try{hl(t,e);var a=zd,o=wr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Cr(s.ownerDocument.documentElement,s)){if(c!==null&&Tr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Sr(s,h),v=Sr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{J=i,L.p=r,I.T=n}}e.current=t,ru=2}}function Ru(){if(ru===2){ru=0;var e=iu,t=au,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=I.T,I.T=null;var r=L.p;L.p=2;var i=J;J|=4;try{rl(e,t.alternate,t)}finally{J=i,L.p=r,I.T=n}}ru=3}}function zu(){if(ru===4||ru===3){ru=0,Ce();var e=iu,t=au,n=ou,r=lu;t.subtreeFlags&10256||t.flags&10256?ru=5:(ru=0,au=iu=null,Bu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(nu=null),et(n),t=t.stateNode,Pe&&typeof Pe.onCommitFiberRoot==`function`)try{Pe.onCommitFiberRoot(Ne,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=I.T,i=L.p,L.p=2,I.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{I.T=t,L.p=i}}ou&3&&Vu(),nd(e),i=e.pendingLanes,n&261930&&i&42?e===du?uu++:(uu=0,du=e):uu=0,rd(0,!1)}}function Bu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ra(t)))}function Vu(){return Lu(),Ru(),zu(),Hu()}function Hu(){if(ru!==5)return!1;var e=iu,t=su;su=0;var n=et(ou),r=I.T,a=L.p;try{L.p=32>n?32:n,I.T=null,n=cu,cu=null;var o=iu,s=ou;if(ru=0,au=iu=null,ou=0,J&6)throw Error(i(331));var c=J;if(J|=4,Ml(o.current),wl(o,o.current,s,n),J=c,rd(0,!1),Pe&&typeof Pe.onPostCommitFiberRoot==`function`)try{Pe.onPostCommitFiberRoot(Ne,o)}catch{}return!0}finally{L.p=a,I.T=r,Bu(e,t)}}function Uu(e,t,n){t=hi(n,t),t=Js(e.stateNode,t,2),e=Ra(e,t,2),e!==null&&(Je(e,2),nd(e))}function Q(e,t,n){if(e.tag===3)Uu(e,e,n);else for(;t!==null;){if(t.tag===3){Uu(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(nu===null||!nu.has(r))){e=hi(n,e),n=Ys(2),r=Ra(t,n,2),r!==null&&(Xs(n,r,t,e),Je(r,2),nd(r));break}}t=t.return}}function Wu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Il;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Vl=!0,i.add(n),e=Gu.bind(null,e,t,n),t.then(e,e))}function Gu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Ll===e&&(X&n)===n&&(Ul===4||Ul===3&&(X&62914560)===X&&300>we()-Ql?!(J&2)&&xu(e,0):Kl|=n,Jl===X&&(Jl=0)),nd(e)}function Ku(e,t){t===0&&(t=Ke()),e=ei(e,t),e!==null&&(Je(e,t),nd(e))}function qu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ku(e,n)}function Ju(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ku(e,n)}function Yu(e,t){return be(e,t)}var Xu=null,Zu=null,Qu=!1,$u=!1,ed=!1,td=0;function nd(e){e!==Zu&&e.next===null&&(Zu===null?Xu=Zu=e:Zu=Zu.next=e),$u=!0,Qu||(Qu=!0,ld())}function rd(e,t){if(!ed&&$u){ed=!0;do for(var n=!1,r=Xu;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Ie(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,cd(r,a))}else a=X,a=Ue(r,r===Ll?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||We(r,a)||(n=!0,cd(r,a))}r=r.next}while(n);ed=!1}}function id(){ad()}function ad(){$u=Qu=!1;var e=0;td!==0&&Gd()&&(e=td);for(var t=we(),n=null,r=Xu;r!==null;){var i=r.next,a=od(r,t);a===0?(r.next=null,n===null?Xu=i:n.next=i,i===null&&(Zu=n)):(n=r,(e!==0||a&3)&&($u=!0)),r=i}ru!==0&&ru!==5||rd(e,!1),td!==0&&(td=0)}function od(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Ie(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Ge(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Ll,n=X,n=Ue(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Z===2||Z===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&xe(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||We(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&xe(r),et(n)){case 2:case 8:n=De;break;case 32:n=Oe;break;case 268435456:n=Ae;break;default:n=Oe}return r=sd.bind(null,e),n=be(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&xe(r),e.callbackPriority=2,e.callbackNode=null,2}function sd(e,t){if(ru!==0&&ru!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Vu()&&e.callbackNode!==n)return null;var r=X;return r=Ue(e,e===Ll?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(hu(e,r,t),od(e,we()),e.callbackNode!=null&&e.callbackNode===n?sd.bind(null,e):null)}function cd(e,t){if(Vu())return null;hu(e,t,!0)}function ld(){Yd(function(){J&6?be(Ee,id):ad()})}function ud(){if(td===0){var e=oa;e===0&&(e=ze,ze<<=1,!(ze&261888)&&(ze=256)),td=e}return td}function dd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:Xt(``+e)}function fd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function pd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=dd((i[at]||null).action),o=r.submitter;o&&(t=(t=o[at]||null)?dd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new yn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(td!==0){var e=o?fd(i,o):new FormData(i);bs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?fd(i,o):new FormData(i),bs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var md=0;md<Gr.length;md++){var hd=Gr[md];Kr(hd.toLowerCase(),`on`+(hd[0].toUpperCase()+hd.slice(1)))}Kr(Lr,`onAnimationEnd`),Kr(Rr,`onAnimationIteration`),Kr(zr,`onAnimationStart`),Kr(`dblclick`,`onDoubleClick`),Kr(`focusin`,`onFocus`),Kr(`focusout`,`onBlur`),Kr(Br,`onTransitionRun`),Kr(Vr,`onTransitionStart`),Kr(Hr,`onTransitionCancel`),Kr(Ur,`onTransitionEnd`),xt(`onMouseEnter`,[`mouseout`,`mouseover`]),xt(`onMouseLeave`,[`mouseout`,`mouseover`]),xt(`onPointerEnter`,[`pointerout`,`pointerover`]),xt(`onPointerLeave`,[`pointerout`,`pointerover`]),bt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),bt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),bt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),bt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),bt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),bt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var gd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),_d=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(gd));function vd(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){qr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){qr(e)}i.currentTarget=null,a=c}}}}function $(e,t){var n=t[st];n===void 0&&(n=t[st]=new Set);var r=e+`__bubble`;n.has(r)||(Sd(t,e,2,!1),n.add(r))}function yd(e,t,n){var r=0;t&&(r|=4),Sd(n,e,r,t)}var bd=`_reactListening`+Math.random().toString(36).slice(2);function xd(e){if(!e[bd]){e[bd]=!0,vt.forEach(function(t){t!==`selectionchange`&&(_d.has(t)||yd(t,!1,e),yd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[bd]||(t[bd]=!0,yd(`selectionchange`,!1,t))}}function Sd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!cn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Cd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=pt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}an(function(){var r=a,i=$t(n),s=[];a:{var c=Wr.get(e);if(c!==void 0){var l=yn,u=e;switch(e){case`keypress`:if(mn(n)===0)break a;case`keydown`:case`keyup`:l=Ln;break;case`focusin`:u=`focus`,l=On;break;case`focusout`:u=`blur`,l=On;break;case`beforeblur`:case`afterblur`:l=On;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=En;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Dn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=V;break;case Lr:case Rr:case zr:l=kn;break;case Ur:l=zn;break;case`scroll`:case`scrollend`:l=xn;break;case`wheel`:l=Bn;break;case`copy`:case`cut`:case`paste`:l=An;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Rn;break;case`toggle`:case`beforetoggle`:l=Vn}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=on(m,p),g!=null&&d.push(wd(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==Qt&&(u=n.relatedTarget||n.fromElement)&&(pt(u)||u[ot]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?pt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=En,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Rn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:ht(l),h=u==null?c:ht(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,pt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Ed,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Dd(s,c,l,d,!1),u!==null&&f!==null&&Dd(s,f,u,d,!0)}}a:{if(c=r?ht(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=sr;else if(tr(c)){if(cr)v=_r;else{v=hr;var y=mr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&qt(r.elementType)&&(v=sr):v=gr;if(v&&=v(e,r)){nr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&zt(c,`number`,c.value)}switch(y=r?ht(r):window,e){case`focusin`:(tr(y)||y.contentEditable===`true`)&&(Dr=y,Or=r,kr=null);break;case`focusout`:kr=Or=Dr=null;break;case`mousedown`:Ar=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Ar=!1,jr(s,n,i);break;case`selectionchange`:if(Er)break;case`keydown`:case`keyup`:jr(s,n,i)}var b;if(Un)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else Zn?Yn(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Kn&&n.locale!==`ko`&&(Zn||x!==`onCompositionStart`?x===`onCompositionEnd`&&Zn&&(b=pn()):(un=i,dn=`value`in un?un.value:un.textContent,Zn=!0)),y=Td(r,x),0<y.length&&(x=new jn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=Xn(n),b!==null&&(x.data=b)))),(b=Gn?Qn(e,n):$n(e,n))&&(x=Td(r,`onBeforeInput`),0<x.length&&(y=new jn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),pd(s,e,r,n,i)}vd(s,t)})}function wd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Td(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=on(e,n),i!=null&&r.unshift(wd(e,i,a)),i=on(e,t),i!=null&&r.push(wd(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Ed(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Dd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=on(n,a),l!=null&&o.unshift(wd(n,l,c))):i||(l=on(n,a),l!=null&&o.push(wd(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Od=/\r\n?/g,kd=/\u0000|\uFFFD/g;function Ad(e){return(typeof e==`string`?e:``+e).replace(Od,`
`).replace(kd,``)}function jd(e,t){return t=Ad(t),Ad(e)===t}function Md(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Ut(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Ut(e,``+r);break;case`className`:Dt(e,`class`,r);break;case`tabIndex`:Dt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Dt(e,n,r);break;case`style`:Kt(e,r,o);break;case`data`:if(t!==`object`){Dt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Xt(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&Md(e,t,`name`,a.name,a,null),Md(e,t,`formEncType`,a.formEncType,a,null),Md(e,t,`formMethod`,a.formMethod,a,null),Md(e,t,`formTarget`,a.formTarget,a,null)):(Md(e,t,`encType`,a.encType,a,null),Md(e,t,`method`,a.method,a,null),Md(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Xt(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=Zt);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=Xt(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:$(`beforetoggle`,e),$(`toggle`,e),Et(e,`popover`,r);break;case`xlinkActuate`:Ot(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Ot(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Ot(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Ot(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Ot(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Ot(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Ot(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Ot(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Ot(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Et(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=Jt.get(n)||n,Et(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Kt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Ut(e,r):(typeof r==`number`||typeof r==`bigint`)&&Ut(e,``+r);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=Zt);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!yt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[at]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Et(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:$(`error`,e),$(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,o,s,n,null)}}a&&Md(e,t,`srcSet`,n.srcSet,n,null),r&&Md(e,t,`src`,n.src,n,null);return;case`input`:$(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:Md(e,t,r,d,n,null)}}Rt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in $(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:Md(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Bt(e,!!r,n,!0):Bt(e,!!r,t,!1);return;case`textarea`:for(s in $(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:Md(e,t,s,c,n,null)}Ht(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:Md(e,t,l,r,n,null)}return;case`dialog`:$(`beforetoggle`,e),$(`toggle`,e),$(`cancel`,e),$(`close`,e);break;case`iframe`:case`object`:$(`load`,e);break;case`video`:case`audio`:for(r=0;r<gd.length;r++)$(gd[r],e);break;case`image`:$(`error`,e),$(`load`,e);break;case`details`:$(`toggle`,e);break;case`embed`:case`source`:case`link`:$(`error`,e),$(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,u,r,n,null)}return;default:if(qt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&Md(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||Md(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&Md(e,t,p,m,r,f)}}Lt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||Md(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&Md(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Bt(e,!!n,n?[]:``,!1):Bt(e,!!n,t,!0)):Bt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:Md(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&Md(e,t,s,a,r,o)}Vt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:Md(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:Md(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&Md(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:Md(e,t,u,p,r,m)}return;default:if(qt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&Md(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||Md(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e!==Wd&&(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[dt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body)}n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),ft(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[dt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);ft(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=L.d;L.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=yu();return e||t}function yf(e){var t=mt(e);t!==null&&t.tag===5&&t.type===`form`?Ss(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=It(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),_t(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+It(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+It(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+It(n.imageSizes)+`"]`)):i+=`[href="`+It(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),_t(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+It(r)+`"][href="`+It(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),_t(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=gt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);_t(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=gt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),_t(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=gt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),_t(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=z.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=gt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=gt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=gt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+It(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),_t(t),e.head.appendChild(t))}function Pf(e){return`[src="`+It(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+It(n.href)+`"]`);if(r)return t.instance=r,_t(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),_t(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,_t(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),_t(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,_t(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),_t(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[dt]||a[it]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,_t(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),_t(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:ee,_currentValue2:ee,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=qe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=qe(0),this.hiddenUpdates=qe(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ai(3,null,null,t),e.current=a,a.stateNode=e,t=na(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Fa(a),e}function tp(e){return e?(e=ri,e):ri}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=La(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ra(e,r,t),n!==null&&(mu(n,e,t),za(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ei(e,67108864);t!==null&&mu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=fu();t=$e(t);var n=ei(e,t);n!==null&&mu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=I.T;I.T=null;var a=L.p;try{L.p=2,up(e,t,n,r)}finally{L.p=a,I.T=i}}function lp(e,t,n,r){var i=I.T;I.T=null;var a=L.p;try{L.p=8,up(e,t,n,r)}finally{L.p=a,I.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)Cd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=mt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=He(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Ie(o);s.entanglements[1]|=c,o&=~c}nd(a),!(J&6)&&(eu=we()+500,rd(0,!1))}}break;case 31:case 13:s=ei(a,2),s!==null&&mu(s,a,2),yu(),ip(a,2)}if(a=dp(r),a===null&&Cd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Cd(e,t,r,null,n)}}function dp(e){return e=$t(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=pt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Te()){case Ee:return 2;case De:return 8;case Oe:case ke:return 32;case Ae:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=mt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=pt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,nt(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,nt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Qt=r,n.target.dispatchEvent(r),Qt=null}else return t=mt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=mt(n);a!==null&&(e.splice(t,3),t-=3,bs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[at]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[at]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,fu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),yu(),t[ot]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=tt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.8`)throw Error(i(527,Lp,`19.2.8`));L.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.8`,rendererPackageName:`react-dom`,currentDispatcherRef:I,reconcilerVersion:`19.2.8`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Ne=zp.inject(Rp),Pe=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Us,s=Ws,c=Gs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[ot]=t.current,xd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=`-ms-`,v=`-moz-`,y=`-webkit-`,b=`comm`,x=`rule`,S=`decl`,C=`@import`,w=`@namespace`,T=`@keyframes`,E=`@layer`,D=Math.abs,O=String.fromCharCode,k=Object.assign;function A(e,t){return F(e,0)^45?(((t<<2^F(e,0))<<2^F(e,1))<<2^F(e,2))<<2^F(e,3):0}function j(e){return e.trim()}function M(e,t){return(e=t.exec(e))?e[0]:e}function N(e,t,n){return e.replace(t,n)}function P(e,t,n){return e.indexOf(t,n)}function F(e,t){return e.charCodeAt(t)|0}function I(e,t,n){return e.slice(t,n)}function L(e){return e.length}function ee(e){return e.length}function te(e,t){return t.push(e),e}function ne(e,t){return e.map(t).join(``)}function re(e,t){return e.filter(function(e){return!M(e,t)})}var ie=1,R=1,ae=0,oe=0,z=0,se=``;function ce(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:ie,column:R,length:o,return:``,siblings:s}}function le(e,t){return k(ce(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function ue(e){for(;e.root;)e=le(e.root,{children:[e]});te(e,e.siblings)}function de(){return z}function fe(){return z=oe>0?F(se,--oe):0,R--,z===10&&(R=1,ie--),z}function pe(){return z=oe<ae?F(se,oe++):0,R++,z===10&&(R=1,ie++),z}function me(){return F(se,oe)}function he(){return oe}function ge(e,t){return I(se,e,t)}function _e(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ve(e){return ie=R=1,ae=L(se=e),oe=0,[]}function ye(e){return se=``,e}function be(e){return j(ge(oe-1,Ce(e===91?e+2:e===40?e+1:e)))}function xe(e){for(;(z=me())&&z<33;)pe();return _e(e)>2||_e(z)>3?``:` `}function Se(e,t){for(;--t&&pe()&&!(z<48||z>102||z>57&&z<65||z>70&&z<97););return ge(e,he()+(t<6&&me()==32&&pe()==32))}function Ce(e){for(;pe();)switch(z){case e:return oe;case 34:case 39:e!==34&&e!==39&&Ce(z);break;case 40:e===41&&Ce(e);break;case 92:pe();break}return oe}function we(e,t){for(;pe()&&e+z!==57&&(e+z!==84||me()!==47););return`/*`+ge(t,oe-1)+`*`+O(e===47?e:pe())}function Te(e){for(;!_e(me());)pe();return ge(e,oe)}function Ee(e){return ye(De(``,null,null,null,[``],e=ve(e),0,[0],e))}function De(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=pe()){case 40:if(m!=108&&F(C,d-1)==58){P(C+=N(be(v),`&`,`&\f`),`&\f`,D(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=be(v);break;case 9:case 10:case 13:case 32:C+=xe(m);break;case 92:C+=Se(he()-1,7);continue;case 47:switch(me()){case 42:case 47:te(ke(we(pe(),he()),t,n,c),c),(_e(m||1)==5||_e(me()||1)==5)&&L(C)&&I(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=L(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=N(C,/\f/g,``)),p>0&&(L(C)-d||h===0&&m===47)&&te(p>32?Ae(C+`;`,r,n,d-1,c):Ae(N(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(te(S=Oe(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)De(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(F(C,3)===110)break;case 108:if(F(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?De(e,S,S,r&&te(Oe(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):De(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+L(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&fe()==125)continue}switch(C+=O(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(L(C)-1)*_,_=1;break;case 64:me()===45&&(C+=be(pe())),f=me(),u=d=L(y=C+=Te(he())),v++;break;case 45:m===45&&L(C)==2&&(h=0)}}return a}function Oe(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=ee(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=I(e,f+1,f=D(g=o[h])),b=e;v<m;++v)(b=j(g>0?p[v]+` `+y:N(y,/&\f/g,p[v])))&&(c[_++]=b);return ce(e,t,n,i===0?x:s,c,l,u,d)}function ke(e,t,n,r){return ce(e,t,n,b,O(de()),I(e,2,-2),0,r)}function Ae(e,t,n,r,i){return ce(e,t,n,S,I(e,0,r),I(e,r+1,-1),r,i)}function je(e,t,n){switch(A(e,t)){case 5103:return y+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return y+e+e;case 4855:return y+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return v+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return y+e+v+e+_+e+e;case 5936:switch(F(e,t+11)){case 114:return y+e+_+N(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return y+e+_+N(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return y+e+_+N(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return y+e+_+e+e;case 6165:return y+e+_+`flex-`+e+e;case 5187:return y+e+N(e,/(\w+).+(:[^]+)/,y+`box-$1$2`+_+`flex-$1$2`)+e;case 5443:return y+e+_+`flex-item-`+N(e,/flex-|-self/g,``)+(M(e,/flex-|baseline/)?``:_+`grid-row-`+N(e,/flex-|-self/g,``))+e;case 4675:return y+e+_+`flex-line-pack`+N(e,/align-content|flex-|-self/g,``)+e;case 5548:return y+e+_+N(e,`shrink`,`negative`)+e;case 5292:return y+e+_+N(e,`basis`,`preferred-size`)+e;case 6060:return y+`box-`+N(e,`-grow`,``)+y+e+_+N(e,`grow`,`positive`)+e;case 4554:return y+N(e,/([^-])(transform)/g,`$1`+y+`$2`)+e;case 6187:return N(N(N(e,/(zoom-|grab)/,y+`$1`),/(image-set)/,y+`$1`),e,``)+e;case 5495:case 3959:return N(e,/(image-set\([^]*)/,y+"$1$`$1");case 4968:return N(N(e,/(.+:)(flex-)?(.*)/,y+`box-pack:$3`+_+`flex-pack:$3`),/space-between/,`justify`)+y+e+e;case 4200:if(!M(e,/flex-|baseline/))return _+`grid-column-align`+I(e,t)+e;break;case 2592:case 3360:return _+N(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,M(e.props,/grid-\w+-end/)})?~P(e+(n=n[t].value),`span`,0)?e:_+N(e,`-start`,``)+e+_+`grid-row-span:`+(~P(n,`span`,0)?M(n,/\d+/):M(n,/\d+/)-+M(e,/\d+/))+`;`:_+N(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return M(e.props,/grid-\w+-start/)})?e:_+N(N(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return N(e,/(.+)-inline(.+)/,y+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(L(e)-1-t>6)switch(F(e,t+1)){case 109:if(F(e,t+4)!==45)break;case 102:return N(e,/(.+:)(.+)-([^]+)/,`$1`+y+`$2-$3$1`+v+(F(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~P(e,`stretch`,0)?je(N(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return N(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return _+n+`:`+r+s+(i?_+n+`-span:`+(a?o:o-+r)+s:``)+e});case 4949:if(F(e,t+6)===121)return N(e,`:`,`:`+y)+e;break;case 6444:switch(F(e,F(e,14)===45?18:11)){case 120:return N(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+y+(F(e,14)===45?`inline-`:``)+`box$3$1`+y+`$2$3$1`+_+`$2box$3`)+e;case 100:return N(e,`:`,`:`+_)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return N(e,`scroll-`,`scroll-snap-`)+e}return e}function Me(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function Ne(e,t,n,r){switch(e.type){case E:if(e.children.length)break;case C:case w:case S:return e.return=e.return||e.value;case b:return``;case T:return e.return=e.value+`{`+Me(e.children,r)+`}`;case x:if(!L(e.value=e.props.join(`,`)))return``}return L(n=Me(e.children,r))?e.return=e.value+`{`+n+`}`:``}function Pe(e){var t=ee(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function Fe(e){return function(t){t.root||(t=t.return)&&e(t)}}function Ie(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case S:e.return=je(e.value,e.length,n);return;case T:return Me([le(e,{value:N(e.value,`@`,`@`+y)})],r);case x:if(e.length)return ne(n=e.props,function(t){switch(M(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:ue(le(e,{props:[N(t,/:(read-\w+)/,`:`+v+`$1`)]})),ue(le(e,{props:[t]})),k(e,{props:re(n,r)});break;case`::placeholder`:ue(le(e,{props:[N(t,/:(plac\w+)/,`:`+y+`input-$1`)]})),ue(le(e,{props:[N(t,/:(plac\w+)/,`:`+v+`$1`)]})),ue(le(e,{props:[N(t,/:(plac\w+)/,_+`input-$1`)]})),ue(le(e,{props:[t]})),k(e,{props:re(n,r)})}return``})}}var Le=g(),B=c(u()),Re=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,ze=`active`,Be=`data-styled-version`,Ve=`6.5.3`,He=`/*!sc*/
`,Ue=typeof window<`u`&&typeof document<`u`;function We(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var Ge=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:We(`REACT_APP_SC_DISABLE_SPEEDY`)??We(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),Ke=`sc-keyframes-`,qe={};function Je(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var Ye=new Map,Xe=new Map,Ze=1,Qe=e=>{if(Ye.has(e))return Ye.get(e);for(;Xe.has(Ze);)Ze++;let t=Ze++;return Ye.set(e,t),Xe.set(t,e),t},$e=e=>Xe.get(e),et=(e,t)=>{Ze=t+1,Ye.set(e,t),Xe.set(t,e)},tt=Object.freeze([]),nt=Object.freeze({});function rt(e,t,n=nt){return e.theme!==n.theme&&e.theme||t||n.theme}var it=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,at=/(^-|-$)/g;function ot(e){return e.replace(it,`-`).replace(at,``)}var st=/(a)(d)/gi,ct=e=>String.fromCharCode(e+(e>25?39:97));function lt(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=ct(t%52)+n;return(ct(t%52)+n).replace(st,`$1-$2`)}var ut=5381,dt=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},ft=e=>dt(ut,e);function pt(e){return lt(ft(e)>>>0)}function mt(e){return e.displayName||e.name||`Component`}function ht(e){return typeof e==`string`&&!0}function gt(e){return ht(e)?`styled.${e}`:`Styled(${mt(e)})`}var _t=Symbol.for(`react.memo`),vt=Symbol.for(`react.forward_ref`),yt={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},bt={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},xt={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},St={[vt]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[_t]:xt};function Ct(e){return(`type`in(t=e)&&t.type.$$typeof)===_t?xt:`$$typeof`in e?St[e.$$typeof]:yt;var t}var wt=Object.defineProperty,Tt=Object.getOwnPropertyNames,Et=Object.getOwnPropertySymbols,Dt=Object.getOwnPropertyDescriptor,Ot=Object.getPrototypeOf,kt=Object.prototype;function At(e,t,n){if(typeof t!=`string`){let r=Ot(t);r&&r!==kt&&At(e,r,n);let i=Tt(t).concat(Et(t)),a=Ct(e),o=Ct(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in bt||n&&n[s]||o&&s in o||a&&s in a)){let n=Dt(t,s);try{wt(e,s,n)}catch{}}}}return e}function jt(e){return typeof e==`function`}var Mt=Symbol.for(`react.forward_ref`);function Nt(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===Mt&&`styledComponentId`in e}function Pt(e,t){return e&&t?e+` `+t:e||t||``}function Ft(e,t){return e.join(t||``)}function It(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function Lt(e,t,n=!1){if(!n&&!It(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=Lt(e[n],t[n]);else if(It(t))for(let n in t)e[n]=Lt(e[n],t[n]);return e}function Rt(e,t){Object.defineProperty(e,"toString",{value:t})}var zt=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw Je(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+He;return t}},Bt=`style[${Re}][${Be}="${Ve}"]`,Vt=RegExp(`^${Re}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Ht=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Ut=e=>{if(!e)return document;if(Ht(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(Ht(t))return t}return document},Wt=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},Gt=(e,t)=>{let n=(t.textContent??``).split(He),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(Vt);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(et(n,t),Wt(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},Kt=e=>{let t=Ut(e.options.target).querySelectorAll(Bt);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(Re)!==ze&&(Gt(e,r),r.parentNode&&r.parentNode.removeChild(r))}},qt=!1;function Jt(){if(!1!==qt)return qt;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return qt=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return qt=t.getAttribute(`content`)||void 0}return qt=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var Yt=(e,t)=>{let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${Re}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(Re,ze),i.setAttribute(Be,Ve);let s=t||Jt();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},Xt=class{constructor(e,t){this.element=Yt(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw Je(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},Zt=class{constructor(e,t){this.element=Yt(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},Qt=Ue,$t={isServer:!Ue,useCSSOMInjection:!Ge},en=class e{static registerId(e){return Qe(e)}constructor(e=nt,t={},n){this.options=Object.assign(Object.assign({},$t),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Ue&&Qt&&(Qt=!1,Kt(this)),Rt(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=$e(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=Re+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&Ue&&Kt(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&Ue&&t.target!==this.options.target&&Ut(this.options.target)!==Ut(t.target)&&Kt(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new Xt(t,n):new Zt(t,n))(this.options),new zt(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){Qe(e),e.startsWith(Ke)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(Qe(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(Qe(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},tn=new WeakSet,nn={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function rn(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in nn||e.startsWith(`--`)?String(t).trim():t+`px`}var an=47;function on(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var sn=Symbol.for(`sc-keyframes`);function cn(e){return typeof e==`object`&&!!e&&sn in e}function ln(e){return jt(e)&&!(e.prototype&&e.prototype.isReactComponent)}var un=e=>e==null||!1===e||e===``,dn=Symbol.for(`react.client.reference`);function fn(e){return e.$$typeof===dn}function pn(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!un(r)&&(Array.isArray(r)&&tn.has(r)||jt(r)?t.push(on(n)+`:`,r,`;`):It(r)?(t.push(n+` {`),pn(r,t),t.push(`}`)):t.push(on(n)+`: `+rn(n,r)+`;`))}}function mn(e,t,n,r,i=[]){if(un(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return fn(e)?i:ln(e)&&t?mn(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)mn(e[a],t,n,r,i);return i}return Nt(e)?(i.push(`.${e.styledComponentId}`),i):cn(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):fn(e)?i:It(e)&&e.toString===Object.prototype.toString?(pn(e,i),i):(i.push(e.toString()),i)}var hn=ft(Ve),gn=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=dt(hn,t),this.baseStyle=n,en.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(ln(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=Ft(mn(r,e,t,n)))}else i+=Ft(mn(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=lt(dt(dt(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=Pt(r,a)}}return r}},_n=/&/g;function vn(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function yn(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==an||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===an&&(o=!1,c++);else if(l!==34&&l!==39||vn(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function bn(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&bn(a.children,t)}return e}function xn({options:e=nt,plugins:t=tt}=nt){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(_n,r).replace(i,a))}),e.prefix&&o.push(Ie),o.push(Ne);let s=[],c=Pe(o.concat(Fe(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return yn(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||vn(e,o)){if(s===0){if(t===an&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==an);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===an)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===an&&o+1<r&&e.charCodeAt(o+1)===an){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:yn(i)):l===0?e:yn(e)}(t),d=Ee(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=bn(d,e.namespace)),s=[],Me(d,c),s},u=e,d=ut;for(let e=0;e<t.length;e++)t[e].name||Je(15),d=dt(d,t[e].name);return u!=null&&u.namespace&&(d=dt(d,u.namespace)),u!=null&&u.prefix&&(d=dt(d,`p`)),l.hash=d===ut?``:d.toString(),l}var Sn=new en,Cn=xn(),wn=B.createContext({shouldForwardProp:void 0,styleSheet:Sn,stylis:Cn,stylisPlugins:void 0});wn.Consumer;function Tn(){return B.useContext(wn)}var En=B.createContext(void 0);En.Consumer;function Dn(){let e=B.useContext(En);if(!e)throw Je(18);return e}function On(e){let t=B.useContext(En),n=B.useMemo(()=>function(e,t){if(!e)throw Je(14);if(jt(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw Je(8);return t?Object.assign(Object.assign({},t),e):e}(e.theme,t),[e.theme,t]);return e.children?B.createElement(En.Provider,{value:n},e.children):null}var kn=Object.prototype.hasOwnProperty,An={};function jn(e,t){let n=typeof e==`string`?ot(e):`sc`;An[n]=(An[n]||0)+1;let r=n+`-`+pt(Ve+n+An[n]);return t?t+`-`+r:r}function Mn(e,t,n){let r=Nt(e),i=e,a=!ht(e),{attrs:o=tt,componentId:s=jn(t.displayName,t.parentComponentId),displayName:c=gt(e)}=t,l=t.displayName&&t.componentId?ot(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new gn(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=B.useContext(En),u=Tn(),d=e.shouldForwardProp||u.shouldForwardProp,f=rt(t,l,a)||nt,p,m;{let e=B.useRef(null),n=e.current;if(n!==null&&n[1]===f&&n[2]===u.styleSheet&&n[3]===u.stylis&&n[7]===i&&function(e,t,n){let r=e,i=t,a=0;for(let e in i)if(kn.call(i,e)&&(a++,r[e]!==i[e]))return!1;return a===n}(n[0],t,n[4]))p=n[5],m=n[6];else{p=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=e.length>1;for(let n=0;n<e.length;n++){let a=e[n],o=jt(a)?a(i?Object.assign({},r):r):a;for(let e in o)e===`className`?r.className=Pt(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):e in t&&t[e]===void 0||(r[e]=o[e])}return`className`in t&&typeof t.className==`string`&&(r.className=Pt(r.className,t.className)),r}(r,t,f),m=i.generateAndInjectStyles(p,u.styleSheet,u.stylis);let n=0;for(let e in t)kn.call(t,e)&&n++;e.current=[t,f,u.styleSheet,u.stylis,n,p,m,i]}}let h=p.as||c,g=function(e,t,n,r){let i={};for(let a in e)e[a]===void 0||a[0]===`$`||a===`as`||a===`theme`&&e.theme===n||(a===`forwardedAs`?i.as=e.forwardedAs:r&&!r(a,t)||(i[a]=e[a]));return i}(p,h,f,d),_=Pt(o,s);return m&&(_+=` `+m),p.className&&(_+=` `+p.className),g[ht(h)&&h.includes(`-`)?`class`:`className`]=_,n&&(g.ref=n),(0,B.createElement)(h,g)}(m,e,t)}p.displayName=c;let m=B.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?Pt(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)Lt(e,n,!0);return e}({},i.defaultProps,e):e}}),Rt(m,()=>`.${m.styledComponentId}`),a&&At(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var Nn=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function Pn(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Fn=e=>(tn.add(e),e);function In(e,...t){if(jt(e)||It(e))return Fn(mn(Pn(tt,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?mn(n):Fn(mn(Pn(n,t)))}function Ln(e,t,n=nt){if(!t)throw Je(1,t);let r=(r,...i)=>e(t,n,In(r,...i));return r.attrs=r=>Ln(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>Ln(e,t,Object.assign(Object.assign({},n),r)),r}var Rn=e=>Ln(Mn,e),V=Rn;Nn.forEach(e=>{V[e]=Rn(e)});var zn=class{constructor(e,t){this.instanceRules=new Map,this.rules=e,this.componentId=t,this.isStatic=function(e){for(let t=0;t<e.length;t+=1){let n=e[t];if(jt(n)&&!Nt(n))return!1}return!0}(e),en.registerId(this.componentId)}removeStyles(e,t){this.instanceRules.delete(e),this.rebuildGroup(t)}renderStyles(e,t,n,r){let i=this.componentId;if(this.isStatic){if(n.hasNameForId(i,i+e))this.instanceRules.has(e)||this.computeRules(e,t,n,r);else{let a=this.computeRules(e,t,n,r);n.insertRules(i,a.name,a.rules)}return}let a=this.instanceRules.get(e);if(this.computeRules(e,t,n,r),!n.server&&a){let t=a.rules,n=this.instanceRules.get(e).rules;if(t.length===n.length){let e=!0;for(let r=0;r<t.length;r++)if(t[r]!==n[r]){e=!1;break}if(e)return}}this.rebuildGroup(n)}computeRules(e,t,n,r){let i=Ft(mn(this.rules,t,n,r)),a={name:this.componentId+e,rules:r(i,``)};return this.instanceRules.set(e,a),a}rebuildGroup(e){let t=this.componentId;e.clearRules(t);for(let n of this.instanceRules.values())e.insertRules(t,n.name,n.rules)}};function Bn(e,...t){let n=In(e,...t),r=`sc-global-${pt(JSON.stringify(n))}`,i=new zn(n,r),a=e=>{let t=Tn(),n=B.useContext(En),a;{let e=B.useRef(null);e.current===null&&(e.current=t.styleSheet.allocateGSInstance(r)),a=e.current}t.styleSheet.server&&o(a,e,t.styleSheet,n,t.stylis);{let s=i.isStatic?[a,t.styleSheet,i]:[a,e,t.styleSheet,n,t.stylis,i],c=B.useRef(i);B.useLayoutEffect(()=>{t.styleSheet.server||(c.current!==i&&(t.styleSheet.clearRules(r),c.current=i),o(a,e,t.styleSheet,n,t.stylis))},s),B.useLayoutEffect(()=>()=>{t.styleSheet.server||i.removeStyles(a,t.styleSheet)},[a,t.styleSheet,i])}return t.styleSheet.server&&i.instanceRules.delete(a),null};function o(e,t,n,r,o){if(i.isStatic)i.renderStyles(e,qe,n,o);else{let s=Object.assign(Object.assign({},t),{theme:rt(t,r,a.defaultProps)});i.renderStyles(e,s,n,o)}}return B.memo(a)}var Vn,Hn=class{constructor(e,t){this[Vn]=!0,this.inject=(e,t=Cn)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=Ke+e,this.rules=t,Qe(this.id),Rt(this,()=>{throw Je(12,String(this.name))})}getName(e=Cn){return e.hash?this.name+lt(e.hash>>>0):this.name}};function Un(e,...t){let n=Ft(In(e,...t));return new Hn(pt(n),n)}Vn=sn,`${Re}`,`${Re}`,`${Re}`;var Wn={action:{accentBg:`var(--ds-action-accent-bg)`,accentBgActive:`var(--ds-action-accent-bg-active)`,accentBgHover:`var(--ds-action-accent-bg-hover)`,accentFocusRing:`var(--ds-action-accent-focus-ring)`,accentText:`var(--ds-action-accent-text)`,dangerBg:`var(--ds-action-danger-bg)`,dangerBgActive:`var(--ds-action-danger-bg-active)`,dangerBgHover:`var(--ds-action-danger-bg-hover)`,dangerFocusRing:`var(--ds-action-danger-focus-ring)`,dangerText:`var(--ds-action-danger-text)`,disabledBg:`var(--ds-action-disabled-bg)`,disabledBorder:`var(--ds-action-disabled-border)`,disabledText:`var(--ds-action-disabled-text)`,ghostBgHover:`var(--ds-action-ghost-bg-hover)`,ghostFocusRing:`var(--ds-action-ghost-focus-ring)`,ghostText:`var(--ds-action-ghost-text)`,inverseBg:`var(--ds-action-inverse-bg)`,inverseBgActive:`var(--ds-action-inverse-bg-active)`,inverseBgHover:`var(--ds-action-inverse-bg-hover)`,inverseText:`var(--ds-action-inverse-text)`,outlineBorder:`var(--ds-action-outline-border)`,primaryBg:`var(--ds-action-primary-bg)`,primaryBgActive:`var(--ds-action-primary-bg-active)`,primaryBgHover:`var(--ds-action-primary-bg-hover)`,primaryFocusRing:`var(--ds-action-primary-focus-ring)`,primaryText:`var(--ds-action-primary-text)`,secondaryBg:`var(--ds-action-secondary-bg)`,secondaryBgActive:`var(--ds-action-secondary-bg-active)`,secondaryBgHover:`var(--ds-action-secondary-bg-hover)`,secondaryBorder:`var(--ds-action-secondary-border)`,secondaryFocusRing:`var(--ds-action-secondary-focus-ring)`,secondaryText:`var(--ds-action-secondary-text)`},border:{accent:`var(--ds-border-accent)`,default:`var(--ds-border-default)`,disabled:`var(--ds-border-disabled)`,editing:`var(--ds-border-editing)`,focus:`var(--ds-border-focus)`,hover:`var(--ds-border-hover)`,inverse:`var(--ds-border-inverse)`,selected:`var(--ds-border-selected)`,subtle:`var(--ds-border-subtle)`,widthDefault:`var(--ds-border-width-default)`,widthEmphasis:`var(--ds-border-width-emphasis)`,widthFocus:`var(--ds-border-width-focus)`,widthIcon:`var(--ds-border-width-icon)`,widthSelected:`var(--ds-border-width-selected)`},brand:{accentOnLight:`var(--ds-brand-accent-on-light)`,primary:`var(--ds-brand-primary)`,primaryActive:`var(--ds-brand-primary-active)`,primaryHover:`var(--ds-brand-primary-hover)`,primaryTint:`var(--ds-brand-primary-tint)`,primaryTintSubtle:`var(--ds-brand-primary-tint-subtle)`,secondary:`var(--ds-brand-secondary)`,secondaryActive:`var(--ds-brand-secondary-active)`,secondaryHover:`var(--ds-brand-secondary-hover)`},control:{circleInlineLg:`var(--ds-control-circle-inline-lg)`,circleInlineMd:`var(--ds-control-circle-inline-md)`,counterMd:`var(--ds-control-counter-md)`,counterSm:`var(--ds-control-counter-sm)`,coverMd:`var(--ds-control-cover-md)`,dotSm:`var(--ds-control-dot-sm)`,height2xs:`var(--ds-control-height-2xs)`,heightLg:`var(--ds-control-height-lg)`,heightMd:`var(--ds-control-height-md)`,heightSm:`var(--ds-control-height-sm)`,heightXl:`var(--ds-control-height-xl)`,heightXs:`var(--ds-control-height-xs)`,textareaMd:`var(--ds-control-textarea-md)`,tileMd:`var(--ds-control-tile-md)`},feedback:{errorDefault:`var(--ds-feedback-error-default)`,errorSurface:`var(--ds-feedback-error-surface)`,infoDefault:`var(--ds-feedback-info-default)`,infoSurface:`var(--ds-feedback-info-surface)`,successDefault:`var(--ds-feedback-success-default)`,successSurface:`var(--ds-feedback-success-surface)`,warningDefault:`var(--ds-feedback-warning-default)`,warningFill:`var(--ds-feedback-warning-fill)`,warningSurface:`var(--ds-feedback-warning-surface)`},icon:{accent:`var(--ds-icon-accent)`,default:`var(--ds-icon-default)`,disabled:`var(--ds-icon-disabled)`,onAccent:`var(--ds-icon-on-accent)`,onBrand:`var(--ds-icon-on-brand)`,secondary:`var(--ds-icon-secondary)`},radius:{card:`var(--ds-radius-card)`,control:`var(--ds-radius-control)`,field:`var(--ds-radius-field)`,none:`var(--ds-radius-none)`,panel:`var(--ds-radius-panel)`,tile:`var(--ds-radius-tile)`},shadow:{card:`var(--ds-shadow-card)`,float:`var(--ds-shadow-float)`,popover:`var(--ds-shadow-popover)`},size:{iconLg:`var(--ds-size-icon-lg)`,iconMd:`var(--ds-size-icon-md)`,iconSm:`var(--ds-size-icon-sm)`},space:{gapLg:`var(--ds-space-gap-lg)`,gapMd:`var(--ds-space-gap-md)`,gapSm:`var(--ds-space-gap-sm)`,gapXs:`var(--ds-space-gap-xs)`,insetLg:`var(--ds-space-inset-lg)`,insetMd:`var(--ds-space-inset-md)`,insetSm:`var(--ds-space-inset-sm)`,insetXl:`var(--ds-space-inset-xl)`,insetXs:`var(--ds-space-inset-xs)`,stackLg:`var(--ds-space-stack-lg)`,stackMd:`var(--ds-space-stack-md)`},surface:{accentStrong:`var(--ds-surface-accent-strong)`,backdrop:`var(--ds-surface-backdrop)`,brand:`var(--ds-surface-brand)`,card:`var(--ds-surface-card)`,disabled:`var(--ds-surface-disabled)`,inverse:`var(--ds-surface-inverse)`,media:`var(--ds-surface-media)`,muted:`var(--ds-surface-muted)`,page:`var(--ds-surface-page)`,raised:`var(--ds-surface-raised)`,sunken:`var(--ds-surface-sunken)`},text:{accent:`var(--ds-text-accent)`,disabled:`var(--ds-text-disabled)`,onBrand:`var(--ds-text-on-brand)`,onInverse:`var(--ds-text-on-inverse)`,placeholder:`var(--ds-text-placeholder)`,primary:`var(--ds-text-primary)`,secondary:`var(--ds-text-secondary)`,tertiary:`var(--ds-text-tertiary)`},tool:{accent:`var(--ds-tool-accent)`,accentHover:`var(--ds-tool-accent-hover)`,border:`var(--ds-tool-border)`,borderSubtle:`var(--ds-tool-border-subtle)`,onAccent:`var(--ds-tool-on-accent)`,surface:`var(--ds-tool-surface)`,surfaceSubtle:`var(--ds-tool-surface-subtle)`},typography:{bodyLgLineHeight:`var(--ds-typography-body-lg-line-height)`,bodyLgSize:`var(--ds-typography-body-lg-size)`,bodyLgWeight:`var(--ds-typography-body-lg-weight)`,bodyLineHeight:`var(--ds-typography-body-line-height)`,bodySize:`var(--ds-typography-body-size)`,bodySmLineHeight:`var(--ds-typography-body-sm-line-height)`,bodySmSize:`var(--ds-typography-body-sm-size)`,bodySmWeight:`var(--ds-typography-body-sm-weight)`,bodyWeight:`var(--ds-typography-body-weight)`,captionLineHeight:`var(--ds-typography-caption-line-height)`,captionSize:`var(--ds-typography-caption-size)`,captionWeight:`var(--ds-typography-caption-weight)`,displayNumberLetterSpacing:`var(--ds-typography-display-number-letter-spacing)`,displayNumberLineHeight:`var(--ds-typography-display-number-line-height)`,displayNumberSize:`var(--ds-typography-display-number-size)`,displayNumberWeight:`var(--ds-typography-display-number-weight)`,fontDisplay:`Lexend, var(--ds-typography-font-sans)`,fontSans:`Lexend, var(--ds-typography-font-sans)`,heading1LetterSpacing:`var(--ds-typography-heading-1-letter-spacing)`,heading1LineHeight:`var(--ds-typography-heading-1-line-height)`,heading1Size:`var(--ds-typography-heading-1-size)`,heading1Weight:`var(--ds-typography-heading-1-weight)`,heading2LetterSpacing:`var(--ds-typography-heading-2-letter-spacing)`,heading2LineHeight:`var(--ds-typography-heading-2-line-height)`,heading2Size:`var(--ds-typography-heading-2-size)`,heading2Weight:`var(--ds-typography-heading-2-weight)`,heading3LetterSpacing:`var(--ds-typography-heading-3-letter-spacing)`,heading3LineHeight:`var(--ds-typography-heading-3-line-height)`,heading3Size:`var(--ds-typography-heading-3-size)`,heading3Weight:`var(--ds-typography-heading-3-weight)`,heading4LineHeight:`var(--ds-typography-heading-4-line-height)`,heading4Size:`var(--ds-typography-heading-4-size)`,heading4Weight:`var(--ds-typography-heading-4-weight)`,labelLetterSpacing:`var(--ds-typography-label-letter-spacing)`,labelLineHeight:`var(--ds-typography-label-line-height)`,labelSize:`var(--ds-typography-label-size)`,labelUpperLetterSpacing:`var(--ds-typography-label-upper-letter-spacing)`,labelUpperLineHeight:`var(--ds-typography-label-upper-line-height)`,labelUpperSize:`var(--ds-typography-label-upper-size)`,labelUpperTransform:`var(--ds-typography-label-upper-transform)`,labelUpperWeight:`var(--ds-typography-label-upper-weight)`,labelWeight:`var(--ds-typography-label-weight)`,leadLineHeight:`var(--ds-typography-lead-line-height)`,leadSize:`var(--ds-typography-lead-size)`,leadWeight:`var(--ds-typography-lead-weight)`,uiLabelLineHeight:`var(--ds-typography-ui-label-line-height)`,uiLabelSize:`var(--ds-typography-ui-label-size)`,uiLabelWeight:`var(--ds-typography-ui-label-weight)`,uiSmallLineHeight:`var(--ds-typography-ui-small-line-height)`,uiSmallSize:`var(--ds-typography-ui-small-size)`,uiSmallWeight:`var(--ds-typography-ui-small-weight)`}},Gn=Bn`
  *, *::before, *::after { box-sizing: border-box; }

  html, body, #root { height: 100%; }

  /*
   * 捲軸全站同一套，安靜的設計：6px 細條、沒有軌道，平常看不見，
   * 滑鼠移進那一塊、或正在捲動時（scrollReveal.ts 掛 data-scrolling）才淡淡出現；
   * 內容沒有多到要捲時就什麼都沒有。
   * 不要在元件裡另寫 scrollbar-width：Chrome 有設它就會忽略這裡的 ::-webkit-scrollbar。
   */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-thumb { background: transparent; border-radius: 3px; }
  *:hover::-webkit-scrollbar-thumb,
  [data-scrolling]::-webkit-scrollbar-thumb { background: ${e=>e.theme.border.default}; }

  body {
    margin: 0;
    /* 畫布外的大面積底色（#F2F2F2），比品牌的 Off-White-2（#F5F5F5）深一點，白紙才浮得出來 */
    background: ${e=>e.theme.surface.backdrop};
    color: ${e=>e.theme.text.primary};
    font-family: ${e=>e.theme.typography.fontSans};
    font-size: ${e=>e.theme.typography.bodyLgSize};
    line-height: ${e=>e.theme.typography.bodyLgLineHeight};
    -webkit-font-smoothing: antialiased;
  }

  /*
   * 表單元素不繼承字體。瀏覽器給它們自己的預設字（Mac 上是 Arial）與
   * 13.33px，中文因此掉回系統字。縮圖、評論卡片、圖片替代文字、徽章
   * 都包在 <button> 裡才能點，少了這行，那些地方的字體和字級就跟
   * 畫布對不起來——同一份內容在縮圖裡和在頁面上長得不一樣。
   */
  button, input, select, textarea { font: inherit; }

  /* 只有鍵盤操作才顯示 focus 環，滑鼠點擊不觸發 */
  :focus-visible {
    outline: ${e=>e.theme.border.widthFocus} solid ${e=>e.theme.action.ghostFocusRing};
    outline-offset: 2px;
  }
  :focus:not(:focus-visible) { outline: none; }

  /*
   * 行內標記的樣式。
   *
   * 放在全域而不是 styled-component，因為量測用的隱形探針、編輯區、
   * 預覽、檢視台都要長得一模一樣——注音會撐高行高，四邊只要有一邊
   * 少了這段 CSS，量到的高度就跟畫出來的不一致，內容會被切掉。
   * 這跟 blockSizing 是同一條原則：量測與渲染共用同一個來源。
   */
  .ds-rich {
    white-space: pre-wrap;
    word-break: break-word;

    /*
     * 段號：段首第一格的方框字（照國文 prototype）。畫成 ::before，不進文字內容，
     * 游標與「第幾個字」的換算都碰不到它。框的大小固定，不隨號碼變——
     * 量測探針只要知道「是段落」就量得準，不必知道第幾段。
     * 兩位數在直排裡用直中橫擠進同一格。
     */
    &[data-pno]::before {
      content: attr(data-pno);
      display: inline-block;
      box-sizing: border-box;
      inline-size: 1.4em;
      block-size: 1.4em;
      /* 框後空一個全形字：這裡的 em 是框自己縮成 0.7 的字級，除回去才是內文的一個字寬 */
      margin-inline-end: calc(1em / 0.7);
      border: 1.5px solid currentColor;
      border-radius: 4px;
      font-size: 0.7em;
      font-weight: 600;
      line-height: calc(1.4em - 3px);
      text-align: center;
      text-indent: 0;
      vertical-align: middle;
      text-combine-upright: all;
      transition: background 0.15s, color 0.15s;
    }
    /* 直排用 middle 會往右偏約 0.2 字（它對齊的是西文的 x 字高）；用 baseline 才落在字欄正中 */
    [data-vertical] &[data-pno]::before,
    &[data-vertical][data-pno]::before { vertical-align: baseline; }
    &[data-horizontal][data-pno]::before { vertical-align: middle; }
    &[data-pno-on]::before {
      background: ${e=>e.theme.text.primary};
      border-color: ${e=>e.theme.text.primary};
      color: ${e=>e.theme.surface.raised};
    }

    /*
     * 注音照課本的排法：每個字的右邊一條直的注音欄，橫排、直排都一樣。
     * 不用瀏覽器內建的 ruby 排版——它把注音當一串字橫著攤在字的上方（直排時攤在旁邊、
     * 拉得跟字一樣長），調號也被當成一般的字排進去。
     * 改成：字與注音欄並排（inline-flex，固定橫向）；注音欄的符號直著疊，
     * 調號掛在欄的右側、對齊最後一個符號；輕聲的點在欄頂（zhuyinRt 已經排到最前面）。
     */
    ruby {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      writing-mode: horizontal-tb;
      vertical-align: top;
      text-indent: 0;
    }

    rt {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /* 字的三成大；內文字小時至少 8px，不然注音糊成一團（注音欄會比字高一點，行距跟著撐開） */
      font-size: max(0.3em, 8px);
      /*
       * 注音固定用黑體，不跟課文換字體：明體、楷體的調號（ˊˇˋ）是全形寬的字、符號偏在字框右邊，
       * 跟著課文換字體時調號會飄到隔壁欄。字體固定，調號的位置才算得準
       */
      font-family: var(--ds-typography-font-sans);
      font-style: normal;
      font-weight: 400;
      line-height: 1;
      margin-inline-start: 0.1em;
      /* 調號掛在右邊，先把位置留出來，不然會疊到下一個字 */
      padding-inline-end: 0.55em;
      /* 跟課文同色：課本的注音是黑的，淡灰會讓字看起來髒、像沒印清楚 */
      color: ${e=>e.theme.text.primary};
      user-select: none;
      text-align: center;
    }

    /*
     * 注音符號的筆畫最高到字身的 92%（Noto Sans TC 的ㄘ；蘋方 86%），所以每個符號最多只能收到 95%，
     * 再收筆畫就會互相壓到（收到 75% 時在 Mac 上ㄓㄨ、ㄎㄜ都疊在一起）。
     * 字間距也加在最後一個符號後面，框會比筆畫短一截：用 padding 補回來，
     * 整欄才置中在字旁邊、調號才對得到最後一個符號
     */
    rt [data-zy] {
      writing-mode: vertical-rl;
      text-orientation: upright;
      letter-spacing: -0.05em;
      padding-inline-end: 0.05em;
    }

    /* 調號對齊最後一個符號（框的下緣跟它切齊），掛在它的右上，不要飄到前一個符號旁邊 */
    /*
     * 調號的規則：上下置中在整串注音的正中間（兩個符號時落在兩個符號之間，例如 ㄈㄢˇ），
     * 左右從注音欄右緣外開始，不壓到符號。
     * 調號的字面在自己的字框裡偏上（字面中心約在框頂下 0.28 字）：框頂放在注音欄正中線，
     * 再往上拉 0.28 字，字面中心才落在正中線。注音固定用黑體（見上面 rt），這個數字才準
     */
    rt [data-tone] {
      position: absolute;
      inset-inline-start: calc(100% - 0.5em);
      top: 50%;
      transform: translateY(-0.28em);
      font-size: 0.9em;
      line-height: 1;
    }
    /*
     * 只有一個符號：調號掛在符號的右上（W3C clreq 5.5.3.3：調號的一半高出符號頂端），
     * 不跟著置中——置中會變成貼在符號正旁邊，看起來像另一個符號
     */
    rt[data-one] [data-tone] {
      top: 0;
    }

    /* 重點詞（data-kw）只留資料不畫樣式：功能已從工具列拿掉，生字表與搜尋日後仍靠這個標記 */

    [data-bold] { font-weight: 700; }
    [data-color='accent'] { color: ${e=>e.theme.text.accent}; }
    [data-color='secondary'] { color: ${e=>e.theme.text.secondary}; }
    /* 任意色值與字體寫在行內 style（spansToHtml 產生），這裡不用列 */

    /*
     * 底線、刪除線、上線走 text-decoration，三條可以同時出現，
     * 所以組合要一一列出——text-decoration-line 是一個屬性，後者會蓋掉前者。
     * 直排時瀏覽器會把底線畫到 line-under（左側）、上線畫到 line-over（右側），
     * 跟數學線段的習慣一致，底下另外釘死 text-underline-position 以免各家不同。
     */
    [data-u] { text-decoration-line: underline; }
    [data-s] { text-decoration-line: line-through; }
    [data-o] { text-decoration-line: overline; }
    [data-u][data-s] { text-decoration-line: underline line-through; }
    [data-u][data-o] { text-decoration-line: underline overline; }
    [data-s][data-o] { text-decoration-line: line-through overline; }
    [data-u][data-s][data-o] { text-decoration-line: underline line-through overline; }
    [data-u], [data-s], [data-o] {
      text-decoration-thickness: 1.5px;
      text-underline-offset: 0.12em;
      text-decoration-skip-ink: none;
    }
    /*
     * 只有底線時畫成設計系統的深綠（border.accent，跟啟用狀態同一個綠）。
     * 跟刪除線、上線疊在一起時，CSS 一個元素只能有一個裝飾線顏色，就維持字色。
     */
    [data-u]:not([data-s]):not([data-o]) { text-decoration-color: ${e=>e.theme.border.accent}; }
    /*
     * 標成生字、語詞、句子的字已經有側邊點點線，不再畫底線（兩條線並排分不出哪條能點）。
     * 刪除線、上線照留。
     */
    /* 標記在外框上（見 inlineDom 的 spansToHtml），底線在裡面的字上 */
    :is([data-note], [data-pop]) [data-u] { text-decoration-line: none; }
    :is([data-note], [data-pop]) [data-u][data-s] { text-decoration-line: line-through; }
    :is([data-note], [data-pop]) [data-u][data-o] { text-decoration-line: overline; }
    :is([data-note], [data-pop]) [data-u][data-s][data-o] { text-decoration-line: line-through overline; }

    ruby rt {
      font-weight: 400;
      text-decoration: none;
    }

    /*
     * 點得開的幾個字（標成生字詞、句子，或掛了補充）：旁邊一條點線，跟國文 prototype 一樣。
     * 不用底色：課文上不鋪色塊，點線就交代了「這裡點得開」。
     * 畫在 block 方向的邊框上——行內元素這個方向的邊框不撐行高，量測與畫面一致。
     * 橫排畫在字下，直排畫在字右（下面的直排規則）。
     */
    [data-note], [data-pop] {
      border-block-end: 2px dotted ${e=>e.theme.text.tertiary};
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      cursor: pointer;
    }
    /* 注音字的點點線也由外框畫（見 inlineDom 的 spansToHtml），跟一般字同一條邊框 */

    /*
     * 注釋號是一個原子，跟注音同一類：看得到、刪得掉，但編不進去。
     * 游標計算會跳過它（見 editor/caret.ts），所以行內標記的範圍
     * 不會因為課文裡有 25 個編號而整段位移。
     */
    /*
     * 目前不顯示：注釋還沒有可以點開的地方（頁底注釋帶、點注釋號彈出都還沒做），
     * 只露一個點了沒反應的數字會讓人以為壞掉。資料照存（spans 的 footnoteRef 與文件層的 footnotes），
     * 做好之後把這行拿掉、改回原本的樣式即可。量測與畫面共用這份 CSS，分頁不會不一致。
     */
    sup[data-fn] {
      display: none;
    }
  }

  /*
   * 直排的注音字：字是一個橫的小盒子，注音欄原本並排在字的右邊、一起佔寬度，
   * 盒子又是靠右對齊，結果字被往左推、離開整欄的中線；行高沿用整段的 1.9 倍，前後也各多空半個字。
   * 直排時改成：盒子只有字本身（行高 1、對齊基線，跟一般字落在同一條中線），
   * 注音欄浮在字的右邊、伸進欄與欄之間的空隙，不佔位置。
   */
  /*
   * 直排字距：一律緊排，有注音的字也不例外——字距一不一樣，整頁的字就對不上同一條橫線。
   * 注音欄收在字的高度裡（見 rt [data-zy] 的字間距），連續的注音字（啾啾、濺濺）才分得開。
   */
  [data-vertical] .ds-rich:not([data-horizontal]) rt,
  .ds-rich[data-vertical] rt {
    letter-spacing: 0;
  }

  [data-vertical] .ds-rich:not([data-horizontal]) ruby,
  .ds-rich[data-vertical] ruby {
    position: relative;
    line-height: 1;
    vertical-align: baseline;
  }
  [data-vertical] .ds-rich:not([data-horizontal]) ruby > rt,
  .ds-rich[data-vertical] ruby > rt {
    position: absolute;
    left: 100%;
    top: 50%;
    /*
     * 對準字的視覺中心，不是字框的中心：中文字的字面在行高 1 的框裡略偏下，
     * 只置中框，注音看起來會往上偏。0.12em 是注音自己的字級，換算約 0.04 字（實測字面與注音的中心對齊）
     */
    transform: translateY(-50%) translateY(0.12em);
  }
  [data-vertical] .ds-rich [data-u],
  .ds-rich[data-vertical] [data-u] {
    text-underline-position: left;
  }
  /*
   * 直排頁裡被單段轉回橫排的段落（.ds-rich[data-horizontal]）：
   * 上面兩條直排規則對它不成立，要退回橫排的畫法。
   */
  [data-vertical] .ds-rich[data-horizontal] [data-u] {
    text-underline-position: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  /*
   * 逐句聚焦（閱讀模式，見 viewer/SentenceFocus.tsx）。
   *
   * 點一句之後整頁的字先退成第三級色，被點的那一句再用 ::highlight
   * 拉回主要文字色——高亮靠 CSS Custom Highlight API 畫在文字範圍上，
   * 不改 DOM。這是刻意的：量測與渲染共用同一份 HTML，若為了高亮把句子
   * 包進 <span>，量到的與畫出來的就可能不一致。
   *
   * 直排時注音與注釋號是 .ds-rich 的子元素，跟著一起變淡；
   * 它們本來就依附在字旁邊，不需要單獨處理。
   */
  .sentence-dimmed .ds-rich {
    color: ${e=>e.theme.text.tertiary};
  }
  ::highlight(sentence-focus) {
    color: ${e=>e.theme.text.primary};
  }
  ::highlight(sentence-mark) {
    background-color: ${e=>e.theme.brand.primaryTint};
  }
`,Kn=`---
id: DEMO-01
title: 星星的世界
publisher: 範例
stage: 國小
grade: 3
term: 下
subject: 自然
direction: 橫排
layout: 自動切頁
unit: 夜空的觀察
page: [40, 47]
---

# 星星的世界

抬頭看看夜空，那些一閃一閃的光點，藏著什麼樣的故事？

@頁[40]

## 夜空裡的星座

晴朗的夜晚抬頭往天空看，可以看到許多一閃一閃的星星。古時候的人把亮度接近、位置相鄰的星星連起來想像成圖案，這些圖案就叫做==星座==。

![夏季夜空中的三顆亮星連成一個大三角形](images/summer-triangle.png "圖 1 夏季大三角")

夏天的夜晚，我們可以找到明亮的「夏季大三角」。它由三顆分別屬於不同星座的亮星組成，是初學觀星的人最容易認出的目標。

### 三顆亮星分別是誰

| 星名 | 所屬星座 | 距離（光年） |
|---|---|---|
| 織女星 | 天琴座 | 25 |
| 牛郎星 | 天鷹座 | 17 |
| 天津四 | 天鵝座 | 約 2600 |

天津四看起來和另外兩顆差不多亮，實際上卻遠得多。這代表我們看到的亮度，同時受到==光度==與==距離==的影響。

@對話[小宇]{為什麼天津四那麼遠，看起來還是很亮？}
@對話[老師]{因為它本身發出的光比另外兩顆強很多。就像遠處的探照燈，還是比近處的手電筒亮。}

#### 觀星小提醒

找一個遠離路燈、視野開闊的地方，眼睛適應黑暗大約需要二十分鐘。這段時間先不要看手機螢幕。

@頁[41]

## 星星為什麼會動

### 一個晚上之內的移動

同一個晚上，星星的位置會慢慢由東往西移動。這不是星星自己在跑，而是==地球自轉==造成的。

![長時間曝光拍下的星星軌跡，形成一圈一圈的同心圓](images/star-trails.png "圖 2 北方天空的星軌")

把相機固定住、長時間曝光，就會拍到星星畫出一圈一圈的圓弧。圓心附近那顆幾乎不動的星，就是==北極星==。

@影片[縮時攝影：一夜的星空](media/star-trails.mp4){字幕=media/star-trails.vtt}

### 一年之內的變化

不同季節看到的星座並不相同。夏天看得到夏季大三角，冬天則換成獵戶座當主角。這是因為地球繞著太陽公轉，晚上背對太陽的方向一年之中會轉一圈。

@頁[42]

## 觀測與記錄

### 用星圖找星座

星圖是把天空畫在紙上的地圖。使用時把星圖舉高過頭頂，讓星圖上的方位和實際的方位對齊。

@音檔[課文朗讀：觀測與記錄](audio/lesson-03.mp3)

觀察時把看到的位置、時間、天氣記下來，累積幾次之後就會發現規律。科學觀察的重點不是看到什麼稀奇的東西，而是==持續記錄==。

@連結[中央氣象署天文站](https://www.cwa.gov.tw/)

@連結[今晚的星空](https://stellarium-web.org/){QR}

@參照[習作]{18〜19}

@頁[43]

## 檢測站

1. @題型[觀察記錄] 下列哪些做法能幫助我們在夜間看清楚星星？
   - (A) 選擇遠離路燈的地方
   - (B) 觀察前先讓眼睛適應黑暗
   - (C) 用手機螢幕照亮星圖
   - (D) 挑選晴朗無雲的夜晚

2. @題型[概念理解] 星星在一個晚上之內由東往西移動，主要原因是什麼？
   - (A) 星星繞著地球轉
   - (B) 地球自轉
   - (C) 地球公轉
   - (D) 月亮的引力

3. 小宇在夏天晚上八點看到夏季大三角在東邊的天空。同一天晚上十一點，這三顆星最可能移動到哪個方向？
   - (A) 更靠近東邊
   - (B) 接近頭頂偏南
   - (C) 回到地平線以下
   - (D) 位置完全不變

@頁[44]

## 補充：{閑|ㄒㄧㄢˊ}話星名

許多星星的名字來自不同文化。織女星在西方叫做 Vega，來自阿拉伯文的「俯衝的鷹」；牛郎星 Altair 也源自同一組古老的星名系統。中文的星名則多半和民間故事有關。

`,qn=`---
id: MULAN
title: 木蘭詩
publisher: 範例
stage: 國中
subject: 國文
direction: 直排
layout: 流式排版
pagebreak: 語文小視窗  # 只在這幾節前換頁；題解、課文接在標題頁後面
---

# 木蘭詩

作者：佚名（北朝民歌）

## 題解

　　本詩選自宋代郭茂倩所編的《樂府詩集》，收在〈橫吹曲辭〉的〈梁鼓角橫吹曲〉，是北朝的民歌，作者已不可考。全詩敘述木蘭代父從軍、征戰多年後辭官返鄉的經過，與〈孔雀東南飛〉並稱「樂府雙璧」。

## 課文

　　唧唧復唧唧，木蘭當戶織。不聞機{杼|ㄓㄨˋ}聲，惟聞女嘆息。問女何所思？問女何所憶？女亦無所思，女亦無所憶。昨夜見軍帖，{可|ㄎㄜˋ}{汗|ㄏㄢˊ}大點兵。軍書十二卷，卷卷有爺名。阿爺無大兒，木蘭無長兄。願為市鞍馬，從此替爺征。

　　東市買駿馬，西市買鞍{韉|ㄐㄧㄢ}。南市買{轡|ㄆㄟˋ}頭，北市買長鞭。朝辭爺孃去，暮宿黃河邊。不聞爺孃喚女聲，但聞黃河流水鳴{濺|ㄐㄧㄢ}{濺|ㄐㄧㄢ}。旦辭黃河去，暮至黑山頭。不聞爺孃喚女聲，但聞燕山胡{騎|ㄐㄧˋ}鳴{啾|ㄐㄧㄡ}{啾|ㄐㄧㄡ}。

　　萬里赴戎機，關山度若飛。朔氣傳金{柝|ㄊㄨㄛˋ}，寒光照鐵衣。將軍百戰死，壯士十年歸。

　　歸來見天子，天子坐明堂。策勳十二轉，賞賜百千強。{可|ㄎㄜˋ}{汗|ㄏㄢˊ}問所欲，木蘭不用尚書郎。願借明駝千里足，送兒還故鄉。

　　爺孃聞女來，出郭相扶將。阿姊聞妹來，當戶理紅妝。小弟聞姊來，磨刀霍霍向豬羊。開我東閣門，坐我西閣牀。脫我戰時袍，著我舊時裳。當窗理雲{鬢|ㄅㄧㄣˋ}，對鏡貼花黃。出門看伙伴，伙伴皆驚惶：同行十二年，不知木蘭是女郎。

　　雄兔腳撲朔，雌兔眼迷離。兩兔{傍|ㄅㄤˋ}地走，安能辨我是雄雌？

## 語文小視窗

　　互文是上下兩句的意思互相補足的寫法。「東市買駿馬，西市買鞍韉，南市買轡頭，北市買長鞭」並不是一個市集只買一樣東西，而是說木蘭跑遍各處市集，把出征的裝備買齊。「將軍百戰死，壯士十年歸」也是互文：將軍和壯士都身經百戰，有的戰死沙場，有的多年後才得以歸來。
`,Jn={"4:3":{width:1024,height:768},"16:9":{width:1280,height:720}};function Yn(e,t){let n=t??Jn[e.aspectRatio];return{width:n.width-96,height:n.height-96}}var Xn={text:{label:`文字`,splittable:!0,canHavePopup:!0,boxLike:!1},image:{label:`圖片`,splittable:!1,canHavePopup:!0,boxLike:!0},video:{label:`影片`,splittable:!1,canHavePopup:!1,boxLike:!0},audio:{label:`聲音`,splittable:!1,canHavePopup:!1,boxLike:!0},shape:{label:`圖形`,splittable:!1,canHavePopup:!0,boxLike:!0},line:{label:`線段`,splittable:!1,canHavePopup:!1,boxLike:!0},table:{label:`表格`,splittable:!1,canHavePopup:!0,boxLike:!0},web:{label:`網頁`,splittable:!1,canHavePopup:!1,boxLike:!0},pdf:{label:`PDF`,splittable:!1,canHavePopup:!0,boxLike:!0},dialogue:{label:`對話框`,splittable:!1,canHavePopup:!1,boxLike:!0},reference:{label:`參照`,splittable:!1,canHavePopup:!1,boxLike:!1},module:{label:`模組`,splittable:!1,canHavePopup:!0,boxLike:!0},question:{label:`題目`,splittable:!1,canHavePopup:!0,boxLike:!0}},Zn=e=>Xn[e].canHavePopup,Qn=e=>Xn[e].splittable,$n=e=>Xn[e].boxLike,er={lessonTitle:`章`,sectionTitle:`節`,itemTitle:`標題`,subItemTitle:`小標`,lead:`導言`,body:`內文`,supplement:`補充`,annotation:`注釋`,caption:`圖說`},tr=[`lessonTitle`,`sectionTitle`,`body`,`supplement`],nr=[`lessonTitle`,`sectionTitle`,`itemTitle`,`subItemTitle`],rr={tight:20,attached:16,continuous:28,module:48,pageBreak:48,section:80},ir={lessonTitle:40,sectionTitle:32,itemTitle:24,subItemTitle:rr.tight},ar=e=>e.columns[0]?.blocks[0]??null,or=e=>{let t=e.columns[e.columns.length-1];return t?.blocks[t.blocks.length-1]??null},sr=e=>e&&e.type===`text`?e.role:null,cr=e=>e.columns.some(e=>e.blocks.some(e=>$n(e.type)));function lr(e,t){if(!e)return 0;let n=sr(ar(t)),r=sr(or(e));return n===`sectionTitle`||n===`itemTitle`?rr.section:n===`caption`||n===`annotation`?rr.attached:cr(t)||cr(e)?rr.module:r&&nr.includes(r)?ir[r]??rr.tight:rr.continuous}var ur=.45;function dr(e){let t=e.crop;return t&&t.w>0&&t.h>0?e.aspectRatio*t.w/t.h:e.aspectRatio}var fr={audio:64,shape:120,line:80,web:112,pdf:480,dialogue:88,reference:40,module:200,question:220};function pr(e){let t=e.colWidths;if(t&&t.length===e.cols&&t.every(e=>e>0)){let e=t.reduce((e,t)=>e+t,0);return t.map(t=>t/e*100)}return Array.from({length:e.cols},()=>100/e.cols)}function mr(e){return Array.from({length:e.rows},(t,n)=>e.rowHeights?.[n]||36)}function hr(e){let t=e.borderWidth??1;return mr(e).reduce((e,t)=>e+t,0)+t*(e.rows+1)}function gr(e,t){if(e.reduce((e,t)=>e+t,0)<=t)return null;let n=t-32,r=0,i=0;for(let t of e){if(r+t>n)break;r+=t,i+=1}return i=Math.max(1,i),{shown:i,hidden:e.length-i}}function _r(e,t,n=!1){let r=t.vertical?t.inlineSize*e:t.inlineSize/e,i=n?t.maxBlockSize:t.maxBlockSize*ur;return Math.min(r,i)}function vr(e,t){if(e.type===`text`)return null;let n=e.widthPct!=null,r=t.inlineSize*(e.widthPct??100)/100;if(e.type===`image`&&e.blockSize!=null)return{inlineSize:r,blockSize:Math.min(e.blockSize,t.maxBlockSize)};if(e.type===`image`||e.type===`video`){let i=e.type===`image`?dr(e):16/9,a=_r(i,{...t,inlineSize:r},n),o=t.vertical?a/i:a*i;return{inlineSize:Math.min(o,r),blockSize:a}}if(e.type===`table`){let n=hr(e);if(t.vertical){let n=e.cols*160;return{inlineSize:r,blockSize:Math.min(n,t.maxBlockSize)}}return{inlineSize:r,blockSize:Math.min(n,t.maxBlockSize)}}if(e.type===`pdf`&&e.blockSize==null){let e=16/9,i=_r(e,{...t,inlineSize:r},n),a=t.vertical?i/e:i*e;return{inlineSize:Math.min(a,r),blockSize:i}}if(e.type===`web`){let n=t.inlineSize*(e.widthPct??50)/100;if(e.chosen===!1){if(e.blockSize!=null)return{inlineSize:n,blockSize:Math.min(e.blockSize,t.maxBlockSize)};let r=16/9,i=_r(r,{...t,inlineSize:n},e.widthPct!=null),a=t.vertical?i/r:i*r;return{inlineSize:Math.min(a,n),blockSize:i}}if(t.vertical&&e.presentation===`bookmark`)return{inlineSize:e.widthPct==null?xr:n,blockSize:Math.min(e.blockSize??br,t.maxBlockSize)};let r=e.presentation===`embed`?t.maxBlockSize:e.presentation===`qr`?88:br;return{inlineSize:n,blockSize:Math.min(e.blockSize??r,t.maxBlockSize)}}if(e.type===`shape`){if(e.shape===`circle`){let n=Math.min(e.blockSize??(e.widthPct==null?fr.shape:r),t.inlineSize,t.maxBlockSize),i=e.widthPct==null?n:r;return{inlineSize:i,blockSize:Math.min(e.blockSize??i,t.maxBlockSize)}}return{inlineSize:t.inlineSize*(e.widthPct??25)/100,blockSize:Math.min(e.blockSize??fr.shape,t.maxBlockSize)}}let i=e.type===`audio`?50:100;return{inlineSize:t.inlineSize*(e.widthPct??i)/100,blockSize:Math.min(e.blockSize??fr[e.type]??120,t.maxBlockSize)}}var yr=112,br=68,xr=300;function Sr(e,t){let n;if(e.type===`image`)n=dr(e);else if(e.type===`video`)n=16/9;else if(e.type===`web`&&e.chosen===!1)n=16/9;else if(e.type===`pdf`&&e.blockSize==null)n=16/9;else return e;if(e.widthPct==null)return e;let r=Yn(t),i=t.writingMode===`vertical`,a=i?r.height:r.width,o=((i?r.width:r.height)-rr.module-yr)/2,s=i?o/n:o*n,c=Math.floor(Math.min(e.widthPct,s/a*100));return c===e.widthPct?e:{...e,widthPct:c}}var Cr={lessonTitle:`heading-1`,sectionTitle:`heading-2`,itemTitle:`heading-3`,subItemTitle:`heading-4`,lead:`lead`,body:`body-lg`,supplement:`body`,annotation:`body-sm`,caption:`body-sm`},wr={sm:.875,md:1,lg:1.125};function Tr(e,t=1,n,r,i=!1){let a=Or(e,t,n,i);return r&&r>0?{...a,lineHeight:String(r)}:a}var Er=e=>Math.round(Ar(Cr[e])*10)/10,Dr=[1,1.2,1.5,1.8,2,2.5];function Or(e,t,n,r=!1){let i=Cr[e],a=e=>t===1?`var(--ds-typography-${i}-${e})`:`calc(var(--ds-typography-${i}-${e}) * ${t})`,o=`var(--ds-typography-${i}-weight)`,s=r&&Mr[e]||jr[e];return!(n&&n>0)&&s?{fontSize:`${s*t}px`,lineHeight:String(Ar(i)),fontWeight:o,fontFamily:`var(--ds-typography-font-sans)`}:n&&n>0?{fontSize:`${n}px`,lineHeight:String(Ar(i)),fontWeight:o,fontFamily:`var(--ds-typography-font-sans)`}:{fontSize:a(`size`),lineHeight:a(`line-height`),fontWeight:o,fontFamily:`var(--ds-typography-font-sans)`}}var kr=new Map;function Ar(e){let t=kr.get(e);if(t!==void 0)return t;let n=1.5;if(typeof document<`u`){let t=getComputedStyle(document.documentElement),r=parseFloat(t.getPropertyValue(`--ds-typography-${e}-size`)),i=parseFloat(t.getPropertyValue(`--ds-typography-${e}-line-height`));if(r>0&&i>0)n=i/r;else return n}return kr.set(e,n),n}var jr={sectionTitle:32,body:20},Mr={body:24},Nr=(e,t=!1)=>t&&Mr[e]||Pr[e],Pr={lessonTitle:48,sectionTitle:32,itemTitle:28,subItemTitle:24,lead:20,body:20,supplement:16,annotation:14,caption:14},Fr=[12,14,16,18,20,24,28,32,36,48,56,64,72,96],Ir=[{label:`思源黑體`,value:null},{label:`思源宋體`,value:`"Noto Serif TC", serif`},{label:`源泉圓體`,value:`"GenSenRounded TW", "Noto Sans TC", sans-serif`},{label:`標楷體`,value:`"BiauKai", "DFKai-SB", "TW-MOE-Std-Kai", "TW-Kai", "Kaiti TC", "Noto Serif TC", serif`},{label:`Lesson One`,value:`"Lesson One", "Noto Sans TC", sans-serif`},{label:`Lexend`,value:`Lexend, "Noto Sans TC", sans-serif`},{label:`Times New Roman`,value:`"Times New Roman", Tinos, "Noto Serif TC", serif`}];function Lr(e,t){let n=e.writingMode?e.writingMode===`vertical`:t.vertical,r=n!==t.vertical;if(!r)return{vertical:n,flipped:r,style:{}};let i=Math.min(e.blockSize??t.maxBlockSize*.45,t.maxBlockSize);return{vertical:n,flipped:r,style:{writingMode:n?`vertical-rl`:`horizontal-tb`,overflow:`hidden`,...t.vertical?{width:`${i}px`,height:`auto`,maxHeight:`${t.inlineSize}px`}:{height:`${i}px`,width:`100%`,maxWidth:`${t.inlineSize}px`}}}}var Rr={ㄅㄚ:`仈八叭峇巴扒捌朳柭疤笆粑芭蚆豝`,ㄅㄚˇ:`把鈀靶`,ㄅㄚˊ:`拔犮癹胈茇菝詙跋軷魃鼥`,ㄅㄚˋ:`壩弝灞爸矲罷耙跁霸`,"ㄅㄚ˙":`吧`,ㄅㄛ:`僠剝哱嶓帗撥播波玻砵碆缽菠蕃袚蹳餑鱍`,ㄅㄛˇ:`簸跛`,ㄅㄛˊ:`亳伯僰勃博嚗帛懪挬搏欂泊浡渤犦猼瓝瓟礡箔簙胉脖膊舶葧蔔袹襏襮豰踣郣鈸鉑鋍鎛鑮餺馞駁駮髆鵓`,ㄅㄛˋ:`擘檗糪蘗譒`,"ㄅㄛ˙":`卜啵`,ㄅㄞ:`挀掰`,ㄅㄞˇ:`佰捭擺柏百粨絔襬`,ㄅㄞˊ:`白`,ㄅㄞˋ:`庍拜敗猈稗粺`,ㄅㄟ:`卑悲揹杯桮椑盃碑藣鵯`,ㄅㄟˇ:`北`,ㄅㄟˋ:`倍偝備孛悖憊梖棓焙牬犕狽珼琲碚糒背蓓被褙誖貝輩邶郥鄁鋇鞁骳`,"ㄅㄟ˙":`唄`,ㄅㄠ:`包孢枹煲笣胞苞蕔褒齙`,ㄅㄠˇ:`保堡媬寶怉葆褓飹飽駂鳵鴇`,ㄅㄠˊ:`窇薄雹`,ㄅㄠˋ:`儤報忁抱暴爆菢虣袌豹趵鉋鑤髱鮑`,ㄅㄢ:`扳搬攽斑斒班瘢般褩頒鳻`,ㄅㄢˇ:`昄板版粄舨蝂鈑闆阪魬`,ㄅㄢˋ:`伴半坢姅怑扮拌柈湴瓣絆辦鉡靽`,"ㄅㄢ˙":`螁`,ㄅㄣ:`奔栟泍錛`,ㄅㄣˇ:`本畚翉苯`,ㄅㄣˋ:`坋坌渀笨`,ㄅㄤ:`垹幫梆縍邦鞤`,ㄅㄤˇ:`榜牓綁膀`,ㄅㄤˋ:`傍塝搒棒玤磅艕蒡蚌謗鎊`,ㄅㄥ:`伻傰崩痭祊絣閍`,ㄅㄥˇ:`埲琣琫繃菶`,ㄅㄥˊ:`甭`,ㄅㄥˋ:`塴泵甏蹦迸`,ㄅㄧ:`偪屄楅豍逼鎞鵖`,ㄅㄧˇ:`俾匕妣彼朼柀比沘疕秕筆箄芘貏鄙`,ㄅㄧˊ:`荸鼻`,ㄅㄧˋ:`佖咇嗶坒堛壁奰妼婢嬖幣庇庳廦弊弼彃必怭愊愎敝斃柲梐毖湢滭潷濞熚狴獘獙珌璧畀畢疪痹痺皕碧笓箅篦篳粊綼縪繴罼腷臂苾萆蓖蓽蔽薜蜌裨襞襣觱詖賁贔蹕躄避邲鄨鄪鉍鏎閉閟陛飶馝駜驆髀髲鮅鷝鷩鼊`,ㄅㄧㄝ:`憋虌蟞鱉`,ㄅㄧㄝˇ:`癟`,ㄅㄧㄝˊ:`別徶癿蛂襒蹩`,ㄅㄧㄝˋ:`彆`,ㄅㄧㄠ:`儦墂彪杓標淲滮瀌熛爂猋瘭穮膘臕藨謤贆鏢鑣颩颮飆驃驫髟`,ㄅㄧㄠˇ:`婊檦表裱褾諘錶`,ㄅㄧㄠˋ:`俵摽鰾`,ㄅㄧㄢ:`揙煸猵甂砭箯籩編萹蝙邊鞭`,ㄅㄧㄢˇ:`匾惼扁碥稨窆褊貶鴘`,ㄅㄧㄢˋ:`便卞弁忭抃汳汴緶艑變辨辮辯遍釆閞`,ㄅㄧㄣ:`儐彬斌椕檳汃濱瀕玢璸砏繽虨豩豳賓邠鑌霦`,ㄅㄧㄣˋ:`擯殯臏髕鬢`,ㄅㄧㄥ:`兵冰掤`,ㄅㄧㄥˇ:`丙怲昺柄炳秉稟窉苪蛃邴鉼陃鞞餅`,ㄅㄧㄥˋ:`並併偋寎并庰摒病誁`,ㄅㄨ:`峬晡誧逋鈽`,ㄅㄨˇ:`哺捕補鵏鸔`,ㄅㄨˊ:`轐醭鳪`,ㄅㄨˋ:`不佈吥咘埔埠布怖抪捗步瓿篰簿蔀踄部餔`,ㄆㄚ:`啪舥葩趴`,ㄆㄚˊ:`掱杷爬琶`,ㄆㄚˋ:`帊帕怕袙`,ㄆㄛ:`坡岥潑鏺頗`,ㄆㄛˇ:`叵笸`,ㄆㄛˊ:`婆櫇皤謈鄱`,ㄆㄛˋ:`岶昢烞珀破粕蒪迫釙魄`,"ㄆㄛ˙":`桲`,ㄆㄞ:`拍`,ㄆㄞˊ:`俳徘排棑牌犤簰`,ㄆㄞˋ:`派湃蒎鎃`,ㄆㄟ:`呸怌柸胚衃醅`,ㄆㄟˇ:`俖`,ㄆㄟˊ:`培毰裴賠陪駍`,ㄆㄟˋ:`伂佩姵帔旆沛浿珮轡配霈`,ㄆㄠ:`拋脬`,ㄆㄠˇ:`跑`,ㄆㄠˊ:`刨匏咆庖炰袍鞄麃`,ㄆㄠˋ:`奅泡炮皰砲麭`,ㄆㄡ:`剖`,ㄆㄡˇ:`婄`,ㄆㄡˊ:`抔捊掊裒`,ㄆㄢ:`攀潘眅`,ㄆㄢˊ:`媻幋搫槃洀瀊爿盤磐磻縏蒰蟠跘蹣鞶`,ㄆㄢˋ:`判叛拚沜泮溿牉畔盼袢襻詊頖`,ㄆㄣ:`噴歕`,ㄆㄣˇ:`呠翸`,ㄆㄣˊ:`湓盆葐`,ㄆㄤ:`乓滂雱`,ㄆㄤˇ:`嗙耪`,ㄆㄤˊ:`彷徬旁舽螃逄龐`,ㄆㄤˋ:`胖`,ㄆㄥ:`匉怦恲抨漰烹砰磞軯閛`,ㄆㄥˇ:`剻捧皏`,ㄆㄥˊ:`倗堋弸彭憉朋棚樥淜澎硼篣篷膨芃蓬蟛輣錋鑝韸髼鬅鵬`,ㄆㄥˋ:`掽椪碰踫`,ㄆㄧ:`丕伓伾劈坯憵批披狉砒礔秠紕翍邳鈚鈹銔錍霹駓髬魾`,ㄆㄧˇ:`仳匹嚭圮庀擗疋痞癖諀銢鴄`,ㄆㄧˊ:`啤埤岯崥枇毗毘毞琵疲皮羆脾膍蚍蚽蚾蜱螷蠯貔郫阰陂陴鵧鼙`,ㄆㄧˋ:`僻媲屁揊淠潎澼甓睥稫譬辟釽闢鷿`,ㄆㄧㄝ:`撇氕瞥`,ㄆㄧㄝˇ:`苤`,ㄆㄧㄝˋ:`嫳`,ㄆㄧㄠ:`剽彯慓旚犥翲螵飄魒`,ㄆㄧㄠˇ:`殍皫瞟篻縹醥顠`,ㄆㄧㄠˊ:`嫖瓢薸`,ㄆㄧㄠˋ:`僄嘌漂票蔈`,ㄆㄧㄢ:`偏媥篇翩鶣`,ㄆㄧㄢˇ:`諞貵`,ㄆㄧㄢˊ:`楄楩胼跰蹁駢骿`,ㄆㄧㄢˋ:`片騙`,ㄆㄧㄣ:`姘拼礗驞`,ㄆㄧㄣˇ:`品`,ㄆㄧㄣˊ:`嚬嬪玭矉蠙貧頻顰`,ㄆㄧㄣˋ:`牝聘`,ㄆㄧㄥ:`乒俜娉涄甹砯竮艵頩`,ㄆㄧㄥˊ:`呯坪屏帡平憑枰泙洴玶瓶缾苹荓萍蓱蘋蛢評軿郱`,ㄆㄨ:`仆噗扑撲潽鯆`,ㄆㄨˇ:`圃普朴樸氆浦溥烳譜蹼鐠`,ㄆㄨˊ:`僕匍墣濮獛璞瞨纀脯莆菩葡蒱蒲酺鏷`,ㄆㄨˋ:`曝瀑舖鋪`,ㄇˊ:`呣`,ㄇㄚ:`媽嬤孖`,ㄇㄚˇ:`溤瑪碼螞鎷馬鷌`,ㄇㄚˊ:`犘痲蟆麻`,ㄇㄚˋ:`傌嘜榪礣禡罵鬕`,"ㄇㄚ˙":`嗎嘛`,ㄇㄛ:`摸`,ㄇㄛˇ:`抹`,ㄇㄛˊ:`劘嫫摩摹模磨糢膜藦蘑謨饃髍魔`,ㄇㄛˋ:`嗼塻墨妺寞暯末枺歾歿沫漠瀎爅瘼眽瞙秣粖纆茉莈莫蛨蟔貊貘銆鏌陌靺驀默`,"ㄇㄜ˙":`么嚜麼`,ㄇㄞˇ:`嘪買鷶`,ㄇㄞˊ:`埋薶霾`,ㄇㄞˋ:`勱脈賣邁霢麥`,ㄇㄟˇ:`媄媺挴每浼渼燘美鎂`,ㄇㄟˊ:`呅堳塺媒嵋徾攗枚梅楣沒湄煤玫瑂眉禖穈脢腜苺莓蘪郿鋂霉黴`,ㄇㄟˋ:`妹媚寐昧沬煝痗眛蝞袂韎魅`,ㄇㄠ:`貓`,ㄇㄠˇ:`冇卯昴泖蓩鉚`,ㄇㄠˊ:`堥旄枆毛氂渵犛矛罞茅茆蝥蟊軞酕錨髦髳鶜`,ㄇㄠˋ:`冒媢帽懋楙毷瑁眊瞀耄芼茂萺蝐袤貌貿鄚鄮`,ㄇㄡ:`哞`,ㄇㄡˇ:`某`,ㄇㄡˊ:`侔洠牟眸瞴繆蛑謀鉾鍪鴾麰`,ㄇㄢ:`嫚`,ㄇㄢˇ:`屘滿睌矕`,ㄇㄢˊ:`僈姏悗慲樠瞞蠻謾鞔顢饅鬗鬘鰻`,ㄇㄢˋ:`墁幔慢曼槾漫熳獌縵蔓鄤鏝`,ㄇㄣˊ:`捫璊菛虋鍆門`,ㄇㄣˋ:`呇悶懣暪燜`,"ㄇㄣ˙":`們`,ㄇㄤˇ:`壾漭硥茻莽蟒`,ㄇㄤˊ:`厖哤娏尨庬忙杗氓汒牻痝盲硭笀芒茫蛖邙鋩駹`,ㄇㄥˇ:`懵猛瓾艋蜢蠓錳`,ㄇㄥˊ:`儚幪懞曚朦檬氋濛甍甿盟瞢矇礞艨莔萌蒙蕄蘉虻鄳鄸霿饛鸏鼆`,ㄇㄥˋ:`夢孟霥`,ㄇㄧ:`咪眯瞇`,ㄇㄧˇ:`弭敉渳濔灖米羋葞蔝銤`,ㄇㄧˊ:`冞彌攠瀰爢獼瓕禰糜縻蘼謎迷醚醾靡鸍麊麋麛`,ㄇㄧˋ:`冪嘧塓宓密峚幎幦榓汨沕泌滵漞熐祕秘糸羃蔤蜜覓覛謐鼏`,ㄇㄧㄝ:`乜咩`,ㄇㄧㄝˋ:`幭懱搣滅篾蔑薎蠛衊覕鱴`,ㄇㄧㄠ:`喵`,ㄇㄧㄠˇ:`杪淼渺眇秒篎緲藐邈`,ㄇㄧㄠˊ:`媌嫹描瞄苗鱙`,ㄇㄧㄠˋ:`妙廟玅`,ㄇㄧㄡˋ:`謬`,ㄇㄧㄢˇ:`丏偭免冕勉喕娩愐沔湎澠絻緬葂鮸黽`,ㄇㄧㄢˊ:`婂媔棉櫋眠矊矏綿蝒`,ㄇㄧㄢˋ:`眄面麵`,ㄇㄧㄣˇ:`僶刡愍憫抿敃敏敯暋泯湣潣皿笢簢蠠閔閩`,ㄇㄧㄣˊ:`岷崏忞怋旻旼民琝痻緡罠苠鈱錉`,ㄇㄧㄥˇ:`姳慏酩`,ㄇㄧㄥˊ:`冥名嫇明暝榠洺溟眳瞑茗蓂螟覭鄍銘鳴`,ㄇㄧㄥˋ:`命詺`,ㄇㄨˇ:`坶姆峔拇母牡牳畝砪踇鉧`,ㄇㄨˊ:`氁`,ㄇㄨˋ:`募墓幕幙慔慕暮木楘毣沐炑牧目睦穆縸艒苜莯蚞鉬霂鞪`,ㄈㄚ:`沷發醱`,ㄈㄚˇ:`法砝髮`,ㄈㄚˊ:`乏伐疺瞂筏罰茷藅閥`,ㄈㄚˋ:`琺`,ㄈㄛˊ:`佛坲`,ㄈㄟ:`啡妃婓扉緋菲蜚裶霏非飛餥馡騑騛`,ㄈㄟˇ:`匪奜悱斐朏棐榧篚翡胐誹`,ㄈㄟˊ:`淝肥腓蜰蟦`,ㄈㄟˋ:`俷剕厞吠屝廢昲曊櫠沸濷狒疿痱癈肺胇芾萉費鐨陫鯡鼣`,ㄈㄡˇ:`否殕缶缹鴀`,ㄈㄡˊ:`紑`,ㄈㄢ:`勫嬏帆幡旛番籓繙翻藩轓颿鱕`,ㄈㄢˇ:`反返釩`,ㄈㄢˊ:`凡墦杋柉樊橎氾渢瀪瀿煩燔璠礬笲籵繁羳膰薠蘩蠜蹯鐇鷭`,ㄈㄢˋ:`奿梵汎泛滼犯畈笵範范販軓軬飯`,ㄈㄣ:`分吩昐棻氛紛翂芬衯酚鈖雰饙`,ㄈㄣˇ:`粉黺`,ㄈㄣˊ:`墳妢幩枌梤棼橨汾濆炃焚羒羵蒶蕡蚡豶轒鐼魵黂鼖鼢`,ㄈㄣˋ:`份僨奮弅忿憤瀵秎糞膹`,ㄈㄤ:`匚坊方枋汸淓芳邡鈁`,ㄈㄤˇ:`仿倣昉瓬紡舫訪髣鶭`,ㄈㄤˊ:`妨房肪防魴`,ㄈㄤˋ:`放`,ㄈㄥ:`丰偑妦封峰崶桻楓檒灃烽犎猦瘋葑蘴蜂豐酆鋒風飌麷`,ㄈㄥˇ:`唪覂諷`,ㄈㄥˊ:`堸夆捀摓艂逢馮`,ㄈㄥˋ:`俸奉焨甮縫賵鳳`,ㄈㄧㄠˋ:`覅`,ㄈㄨ:`伕夫姇孵尃怤敷柎痡砆稃糐紨綒膚荂荴衭趺跗邞鄜鈇鳺麩`,ㄈㄨˇ:`俛俯嘸府弣拊撫斧滏甫簠胕腐腑蜅輔郙釜頫黼`,ㄈㄨˊ:`伏俘冹刜匐咈垘垺孚岪巿幅弗彿怫扶拂服枎柫桴棴榑氟泭洑浮涪澓烰玸琈砩祓福符笰箙紱紼綍罘罦翇艀艴芙芣苻茀茯莩菔葍虙蚨蜉蝠袱襆諨踾輻郛韍鳧鴔鵩鶝黻`,ㄈㄨˋ:`付偩傅副咐复婦嬔富峊復父祔緮縛腹萯蕧蚥蚹蛗蝜蝮複褔覆訃負賦賻赴輹鍑阜附馥駙鮒鰒`,ㄉㄚ:`咑嗒噠搭撘笚耷荅褡鎝`,ㄉㄚˇ:`打`,ㄉㄚˊ:`匒呾妲怛沓炟畣笪答羍薘躂迖達鎉鐽靼韃龘`,ㄉㄚˋ:`大汏`,"ㄉㄚ˙":`瘩繨`,ㄉㄜˊ:`得德淂`,"ㄉㄜ˙":`的`,ㄉㄞ:`呆呔獃`,ㄉㄞˇ:`傣歹逮`,ㄉㄞˋ:`代埭岱帶廗待怠戴柋殆瀻玳紿艜袋襶貸蹛軑軩迨靆黛`,ㄉㄠ:`刀叨忉氘舠魛`,ㄉㄠˇ:`壔導島搗擣禂禱蹈`,ㄉㄠˊ:`捯`,ㄉㄠˋ:`倒到悼檤燾瓙盜稻箌纛翢翿菿道`,ㄉㄡ:`兜唗都`,ㄉㄡˇ:`抖枓蚪鈄陡`,ㄉㄡˋ:`斗梪浢痘竇脰荳豆逗郖酘餖鬥`,ㄉㄢ:`丹儋勯匰單擔殫甔癉眈砃簞耽聃聸襌鄲`,ㄉㄢˇ:`亶伔刐抌撢撣澸玬疸紞膽衴黕黮`,ㄉㄢˋ:`但僤啖啗啿嘾噉嚪帎彈憚憺旦柦氮沊泹淡澹狚癚禫窞繵萏蛋蜑觛誕贉霮髧鴠`,ㄉㄣˋ:`扥扽`,ㄉㄤ:`噹澢璫當簹艡蟷襠鐺`,ㄉㄤˇ:`党擋攩欓讜黨`,ㄉㄤˋ:`儅婸宕嵣愓檔潒璗瓽盪碭礑簜菪蕩逿闣`,ㄉㄥ:`嬁燈璒登簦豋蹬`,ㄉㄥˇ:`戥等`,ㄉㄥˋ:`凳墱嶝瞪磴鄧鐙`,ㄉㄧ:`低堤彽氐滴磾羝袛鍉隄鞮`,ㄉㄧˇ:`厎呧坻底弤抵柢牴砥聜菧觝詆軧邸阺`,ㄉㄧˊ:`嘀嚁嫡敵梑樀滌狄笛篴糴翟苖荻蔋藡覿蹢迪鏑靮馰鬄鸐`,ㄉㄧˋ:`地墑墬娣帝弟旳杕梊棣渧焍玓珶甋眱睇碲禘第締菂蒂蔕蝃螮諦踶遞遰釱`,ㄉㄧㄚˇ:`嗲`,ㄉㄧㄝ:`爹跌`,ㄉㄧㄝˊ:`喋垤堞峌嵽惵挕揲昳楪牒瓞疊眣碟絰耋胅臷艓苵蜨蝶褋詄諜蹀迭镻鰈`,ㄉㄧㄠ:`凋刁叼彫殦琱瞗碉虭蛁貂雕鯛鳭鵰`,ㄉㄧㄠˇ:`屌扚`,ㄉㄧㄠˋ:`伄吊弔掉窵蓧藋調釣雿魡`,ㄉㄧㄡ:`丟銩`,ㄉㄧㄢ:`傎厧巔掂敁槙滇瘨癲蹎顛齻`,ㄉㄧㄢˇ:`典婰碘蒧蕇跕踮點`,ㄉㄧㄢˋ:`佃坫墊壂奠婝店惦扂橝殿淀澱玷甸癜簟阽電靛驔`,ㄉㄧㄥ:`丁仃叮帄玎疔盯耵虰酊釘靪`,ㄉㄧㄥˇ:`嵿濎薡頂鼎`,ㄉㄧㄥˋ:`啶定椗碇碠萣訂鋌錠顁飣`,ㄉㄨ:`剢嘟督醏闍`,ㄉㄨˇ:`堵帾睹篤賭`,ㄉㄨˊ:`櫝殰毒瀆牘犢獨皾蝳裻讀讟贕錖韇韣韥髑黷`,ㄉㄨˋ:`妒度杜渡秺肚芏蠹鍍`,ㄉㄨㄛ:`剟咄哆多掇敪毲裰`,ㄉㄨㄛˇ:`嚲垛埵奲朵椯綞趓躲`,ㄉㄨㄛˊ:`剫喥奪敓踱鐸鮵`,ㄉㄨㄛˋ:`剁墮墯嶞惰柮舵跢跺陊陏鵽`,ㄉㄨㄟ:`堆痽鴭`,ㄉㄨㄟˇ:`頧`,ㄉㄨㄟˋ:`兌對憝懟濧瀩碓祋薱譈鐓隊`,ㄉㄨㄢ:`偳剬媏端耑`,ㄉㄨㄢˇ:`短`,ㄉㄨㄢˋ:`斷椴段毈碫籪緞腶葮躖鍛`,ㄉㄨㄣ:`吨噸墩惇撉敦橔礅蜳蹲驐`,ㄉㄨㄣˇ:`盹躉`,ㄉㄨㄣˋ:`伅囤庉楯沌潡炖燉盾遁遯鈍頓`,ㄉㄨㄥ:`冬咚埬崠東氡涷苳菄蝀鶇鼕`,ㄉㄨㄥˇ:`墥嬞懂董蕫`,ㄉㄨㄥˋ:`侗凍動垌姛峒恫戙挏棟洞湩硐絧胴迵霘駧`,ㄊㄚ:`他嚃塌她它榙牠祂褟趿`,ㄊㄚˇ:`塔獺鰨`,ㄊㄚˋ:`拓搨撻榻毾涾濌禢誻踏蹋遝錔闒闥鞜鞳`,"ㄊㄚ˙":`遢`,ㄊㄜˋ:`忑忒慝特蟘貣鋱`,ㄊㄞ:`胎`,ㄊㄞˊ:`儓台嬯抬旲檯炱箈籉臺苔薹跆邰颱駘鮐`,ㄊㄞˋ:`太態汰泰溙燤鈦`,ㄊㄠ:`嫍幍弢慆掏搯槄滔濤絛縚韜饕`,ㄊㄠˇ:`討`,ㄊㄠˊ:`匋咷啕桃檮洮淘祹綯萄蜪逃醄鋾錭陶鞀駣騊`,ㄊㄠˋ:`套`,ㄊㄡ:`偷媮鋀`,ㄊㄡˇ:`妵敨紏蘣黈`,ㄊㄡˊ:`投緰頭骰`,ㄊㄡˋ:`透`,ㄊㄢ:`坍怹攤灘痑癱舑貪`,ㄊㄢˇ:`嗿坦忐憳暺毯菼袒襢醓鉭`,ㄊㄢˊ:`倓壇婒惔憛曇榃檀潭燂痰磹罈藫覃談譚譠貚郯醰錟顃餤`,ㄊㄢˋ:`傝僋嘆埮探歎湠炭碳舕賧`,ㄊㄤ:`湯羰薚蝪蹚鏜鐋鼞`,ㄊㄤˇ:`倘儻帑戃曭淌爣矘躺鎲钂`,ㄊㄤˊ:`唐堂塘搪棠榶樘橖溏漟煻瑭磄糖膛蓎螗螳赯踼醣鎕闛餳鶶`,ㄊㄤˋ:`摥燙趟`,ㄊㄥ:`熥`,ㄊㄥˊ:`滕疼痋籐縢藤螣謄邆騰`,ㄊㄥˋ:`霯`,ㄊㄧ:`剔擿梯踢鷈`,ㄊㄧˇ:`体體`,ㄊㄧˊ:`偍厗啼崹徲惿提稊綈緹荑蕛蝭褆謕趧蹄醍銻鍗題騠鯷鵜鶗鶙鷤`,ㄊㄧˋ:`倜剃嚏屜悌悐惕揥替楴殢洟涕瓋籊薙裼褅趯逖`,ㄊㄧㄝ:`帖怗聑貼`,ㄊㄧㄝˇ:`僣蛈銕鐵驖鴩`,ㄊㄧㄝˋ:`呫餮`,ㄊㄧㄠ:`佻庣恌挑祧`,ㄊㄧㄠˇ:`嬥宨斢朓窕窱脁誂`,ㄊㄧㄠˊ:`岧條祒笤芀蓨蜩趒迢鎥鞗髫鯈鰷齠`,ㄊㄧㄠˋ:`眺糶絩覜跳`,ㄊㄧㄢ:`天婖添酟`,ㄊㄧㄢˇ:`倎忝悿晪殄淟琠痶腆舔賟錪靦餂`,ㄊㄧㄢˊ:`填屇恬搷沺湉甜田畋盷磌窴緂菾鈿闐鷏`,ㄊㄧㄢˋ:`掭瑱睼`,ㄊㄧㄥ:`听廳桯汀烴綎聽艼`,ㄊㄧㄥˇ:`侹圢娗挺梃烶珽町脡艇頲`,ㄊㄧㄥˊ:`亭停婷嵉庭廷楟榳渟筳聤莛葶蜓蝏閮霆鼮`,ㄊㄨ:`唋嶀怢捸涋湥禿葖鵚鼵`,ㄊㄨˇ:`吐土釷`,ㄊㄨˊ:`凸圖塗屠峹嵞廜徒悇捈梌涂潳瘏稌突筡腯荼蒤跿途酴鍎駼鵌鶟鷋鷵`,ㄊㄨˋ:`兔堍菟鵵`,ㄊㄨㄛ:`乇侂托扡拖挩沰脫莌託飥魠`,ㄊㄨㄛˇ:`妥嫷庹橢鬌`,ㄊㄨㄛˊ:`佗坨堶岮柁橐沱砣碢紽袉跎酡陀馱駝驒鮀鴕鼉`,ㄊㄨㄛˋ:`唾柝毤毻籜蘀跅`,ㄊㄨㄟ:`推蓷藬`,ㄊㄨㄟˇ:`俀僓腿`,ㄊㄨㄟˊ:`弚穨蹪隤頹魋`,ㄊㄨㄟˋ:`侻蛻褪退駾`,ㄊㄨㄢ:`湍煓貒`,ㄊㄨㄢˊ:`剸團慱摶槫漙篿糰鏄鷒鷻`,ㄊㄨㄢˋ:`彖褖`,ㄊㄨㄣ:`吞啍旽暾涒焞`,ㄊㄨㄣˇ:`畽`,ㄊㄨㄣˊ:`坉屯忳臀芚豚軘飩魨`,ㄊㄨㄥ:`炵痌蓪通`,ㄊㄨㄥˇ:`捅桶筒統`,ㄊㄨㄥˊ:`仝佟僮同哃彤曈朣桐橦氃浵潼烔犝狪獞瞳穜童筩粡膧茼詷赨酮鉖銅餇鮦`,ㄊㄨㄥˋ:`慟痛衕`,ㄋˋㄍ:`嗯`,ㄋㄚˇ:`哪`,ㄋㄚˊ:`拏拿挐`,ㄋㄚˋ:`吶妠娜捺笝納肭衲豽貀軜那鈉魶`,ㄋㄜˋ:`眲訥`,"ㄋㄜ˙":`呢`,ㄋㄞˇ:`乃倷奶妳嬭氖艿迺釢`,ㄋㄞˊ:`孻摨`,ㄋㄞˋ:`佴奈柰渿耏耐螚褦錼鼐`,ㄋㄟˇ:`娞腇餒`,ㄋㄟˋ:`內氝`,ㄋㄠ:`孬`,ㄋㄠˇ:`惱獶獿瑙腦`,ㄋㄠˊ:`呶夒峱嶩怓撓猱碙蟯譊鐃`,ㄋㄠˋ:`淖臑鬧`,ㄋㄡˊ:`羺`,ㄋㄡˋ:`檽獳耨鎒`,ㄋㄢ:`囡`,ㄋㄢˇ:`戁揇湳腩蝻赧`,ㄋㄢˊ:`南喃抩暔柟楠男莮萳諵難`,ㄋㄢˋ:`婻`,ㄋㄣˋ:`嫩恁`,ㄋㄤ:`囔`,ㄋㄤˇ:`擃攮曩灢`,ㄋㄤˊ:`囊蠰譨鬞`,ㄋㄤˋ:`齉`,ㄋㄥˊ:`能`,ㄋㄧ:`妮`,ㄋㄧˇ:`你儗抳擬旎晲柅檷狔苨薿鈮隬馜`,ㄋㄧˊ:`倪坭婗尼屔怩泥淣猊秜臡蜺觬跜輗郳霓鯢麑齯`,ㄋㄧˋ:`匿堄嫟惄昵暱溺睨縌膩誽迡逆`,ㄋㄧㄝ:`捏`,ㄋㄧㄝˊ:`苶`,ㄋㄧㄝˋ:`喦嚙囁囓孽嵲嶭巕摰敜槷櫱涅篞糱聶臬臲蠥讘踂踗踙躡鎳鑈鑷钀闑隉顳齧`,ㄋㄧㄠˇ:`嫋嬝嬲蔦裊褭鳥`,ㄋㄧㄠˋ:`尿`,ㄋㄧㄡ:`妞`,ㄋㄧㄡˇ:`忸扭炄狃紐莥鈕`,ㄋㄧㄡˊ:`牛`,ㄋㄧㄢ:`拈蔫`,ㄋㄧㄢˇ:`捻撚攆涊淰碾簐跈蹍躎輦`,ㄋㄧㄢˊ:`哖年鯰黏`,ㄋㄧㄢˋ:`唸姩廿念`,ㄋㄧㄣˇ:`拰`,ㄋㄧㄣˊ:`您`,ㄋㄧㄤˊ:`娘孃`,ㄋㄧㄤˋ:`釀`,ㄋㄧㄥˊ:`儜凝嚀嬣宁寍寧擰檸獰甯聹苧薴鑏鸋`,ㄋㄧㄥˋ:`佞泞濘`,ㄋㄨˇ:`努弩砮`,ㄋㄨˊ:`奴孥笯駑`,ㄋㄨˋ:`怒`,ㄋㄨㄛˇ:`橠`,ㄋㄨㄛˊ:`儺挪梛`,ㄋㄨㄛˋ:`喏懦懧搦糑糯諾逽`,ㄋㄨㄢˇ:`暖渜煖餪`,ㄋㄨㄢˊ:`奻`,ㄋㄨㄥˇ:`繷`,ㄋㄨㄥˊ:`儂噥濃穠膿襛農醲`,ㄋㄨㄥˋ:`弄齈`,ㄋㄩˇ:`女籹釹`,ㄋㄩˋ:`恧朒衄`,ㄋㄩㄝˋ:`瘧虐`,ㄌㄚ:`垃拉搚柆翋菈邋`,ㄌㄚˇ:`喇藞`,ㄌㄚˊ:`旯砬`,ㄌㄚˋ:`剌揧楋瘌腊臘蜡蠟辣鑞鬎`,"ㄌㄚ˙":`啦鞡`,ㄌㄜˋ:`仂叻扐樂氻泐砳竻阞鰳`,"ㄌㄜ˙":`了`,ㄌㄞˊ:`來崍庲徠棶淶箂萊郲錸騋鯠鶆`,ㄌㄞˋ:`唻瀨癩睞籟藾賚賴`,ㄌㄟ:`勒`,ㄌㄟˇ:`儡壘樏櫐灅癗磊磥礨絫耒蕾藟蠝誄讄鑸鸓`,ㄌㄟˊ:`儽壨嫘擂檑櫑欙瓃畾礌礧縲纍罍羸蔂蘲虆轠鐳雷`,ㄌㄟˋ:`淚禷累纇肋蘱酹銇頛類`,ㄌㄠ:`撈`,ㄌㄠˇ:`佬咾姥恅栳狫老荖轑銠`,ㄌㄠˊ:`僗勞嘮嶗浶牢癆簩蟧醪鐒顟`,ㄌㄠˋ:`嫪橯澇烙軂酪`,ㄌㄡ:`瞜`,ㄌㄡˇ:`塿嶁摟簍`,ㄌㄡˊ:`僂嘍婁廔慺樓漊熡耬艛蔞螻謱鞻髏`,ㄌㄡˋ:`漏瘺鏤陋`,ㄌㄢˇ:`壈嬾懶攬欖浨灠爦纜覽醂顲`,ㄌㄢˊ:`婪嵐惏攔斕欄欗瀾灆灡籃籣藍蘭襤襴譋讕躝闌`,ㄌㄢˋ:`嚂濫爁爛糷鑭`,ㄌㄤ:`啷`,ㄌㄤˇ:`塱朗烺誏`,ㄌㄤˊ:`廊桹榔欴狼琅瑯硠稂筤蜋螂郎鋃鎯駺`,ㄌㄤˋ:`埌崀浪莨蒗閬`,ㄌㄥˇ:`冷`,ㄌㄥˊ:`崚棱楞稜薐輘`,ㄌㄥˋ:`倰堎愣睖踜`,ㄌㄧ:`哩`,ㄌㄧˇ:`俚娌李欚浬澧理禮粴裡豊邐醴里鋰鯉鱧`,ㄌㄧˊ:`剺劙厘喱嫠孋孷廲斄杝梨梩樆漓灕犁狸琍璃离筣篱籬縭纚罹菞蔾藜蘺蜊蠡蠫褵謧貍醨鑗離驪鯬鱺鵹鸝黎黧`,ㄌㄧˋ:`例俐儮儷利力勵厤厲吏唎唳嚦塛壢娳屴岦悷慄戾搮攦攭曆曞朸栗櫟櫪欐歷沴溧濿瀝犡猁瑮瓅瓥痢癘皪盭砅磿礪礫禲秝立笠篥粒糲綟苙荔莉蒚蒞藶蚸蜧蝷蠣觻詈讈赲躒轢轣酈鎘隸靂靋鬁鱱鱳鴗鷅麗麜`,ㄌㄧㄚˇ:`倆`,ㄌㄧㄝˇ:`咧`,ㄌㄧㄝˋ:`儠冽列劣哷埒姴峛捩擸栵洌烈犣獵睙脟茢蛚裂趔躐迾颲鬣鮤鴷`,ㄌㄧㄠ:`撩`,ㄌㄧㄠˇ:`憭蓼鄝釕镽`,ㄌㄧㄠˊ:`僚嘹嫽寥寮屪嵺嶚憀敹暸橑漻潦燎獠療簝繚聊膋膫蟟豂遼鐐飉鷯`,ㄌㄧㄠˋ:`尥廖撂料炓瞭窷`,ㄌㄧㄡ:`溜蹓`,ㄌㄧㄡˇ:`嬼柳珋綹罶`,ㄌㄧㄡˊ:`劉媹嵧懰旒榴流瀏琉留瘤硫蓅藰蟉裗鎏鎦鏐飀騮鰡鶹麍`,ㄌㄧㄡˋ:`六塯廇磟翏遛雡霤飂餾鷚`,ㄌㄧㄢˇ:`嬚摙斂璉羷臉蘞襝鄻`,ㄌㄧㄢˊ:`嗹奩帘廉怜憐槤溓漣濂磏簾縺翴聯蓮薕蠊褳覝謰蹥連鎌鐮鬑鰱`,ㄌㄧㄢˋ:`僆堜戀楝殮浰湅澰瀲煉練萰鍊鏈`,ㄌㄧㄣ:`拎`,ㄌㄧㄣˇ:`亃凜廩懍檁菻`,ㄌㄧㄣˊ:`壣嶙暽林淋潾燐琳璘痳瞵碄磷箖粼繗翷臨轔遴鄰鏻霖驎鱗麟`,ㄌㄧㄣˋ:`僯吝橉焛甐疄膦藺賃蹸躪閵`,ㄌㄧㄤˇ:`兩啢緉裲魎`,ㄌㄧㄤˊ:`俍梁椋樑涼粱糧綡良輬`,ㄌㄧㄤˋ:`亮喨悢晾湸諒踉輛量`,ㄌㄧㄥˇ:`岭嶺領`,ㄌㄧㄥˊ:`伶凌囹坽夌姈婈彾昤柃櫺欞泠淩澪爧狑玲琌瓴皊砱笭綾羚翎聆舲苓菱蔆蕶蘦蛉裬詅軨酃醽鈴錂陵零霝靈駖鯪鴒齡`,ㄌㄧㄥˋ:`令另呤炩`,ㄌㄨ:`謢`,ㄌㄨˇ:`嚕擄擼櫓氌滷磠艣蓾虜鏀鐪魯鹵`,ㄌㄨˊ:`嚧壚廬攎櫨瀘爐玈璷盧籚纑罏臚艫蘆蠦轤鑪顱鱸鸕`,ㄌㄨˋ:`僇坴塶廘彔戮摝淕淥漉潞熝琭璐甪盝睩硉碌祿稑穋簏簬籙菉蔍蕗螰賂路踛蹗輅轆逯醁錄錴鏕陸露騄鯥鵱鷺鹿麓`,ㄌㄨㄛ:`囉`,ㄌㄨㄛˇ:`剆瘰臝蓏蠃裸`,ㄌㄨㄛˊ:`儸欏玀籮羅腡蘿螺覶邏鏍鑼騾鸁`,ㄌㄨㄛˋ:`峈摞洛漯濼犖珞絡纙落雒駱鮥鵅`,ㄌㄨㄢˇ:`卵`,ㄌㄨㄢˊ:`圞奱孌孿巒攣曫欒灤癵羉臠鑾鸞`,ㄌㄨㄢˋ:`亂`,ㄌㄨㄣ:`掄`,ㄌㄨㄣˇ:`碖稐`,ㄌㄨㄣˊ:`侖倫圇崙惀棆淪綸菕蜦踚輪錀陯`,ㄌㄨㄣˋ:`溣論`,ㄌㄨㄥˇ:`儱壟攏篢隴`,ㄌㄨㄥˊ:`嚨巃曨朧櫳瀧瓏癃矓礱窿籠聾蘢蠪蠬襱豅躘鏧鑨隆靇鸗龍龒`,ㄌㄨㄥˋ:`哢徿梇`,ㄌㄩˇ:`侶儢呂屢履挔捋旅梠祣穭絽縷膂褸郘鋁`,ㄌㄩˊ:`櫚氀膢藘閭驢鷜`,ㄌㄩˋ:`勴垏嵂律慮氯濾率綠繂膟葎鑢`,ㄌㄩㄝˋ:`掠擽略鋝`,ㄍㄚ:`嘎旮`,ㄍㄚˇ:`尕`,ㄍㄚˊ:`噶釓`,ㄍㄚˋ:`尬`,ㄍㄜ:`仡割咯哥圪戈擱歌滒犵疙肐胳袼鴐鴿`,ㄍㄜˇ:`哿舸`,ㄍㄜˊ:`佮嗝塥愅挌搿格滆獦膈茖葛觡輵轕閣閤隔革鞈鞷韐騔骼鬲鮯`,ㄍㄜˋ:`個各硌箇虼鉻`,ㄍㄞ:`侅垓峐祴絯荄該豥賅賌陔`,ㄍㄞˇ:`改`,ㄍㄞˋ:`丐戤摡杚概溉瓂蓋鈣阣隑`,ㄍㄟˇ:`給`,ㄍㄠ:`槔櫜滜皋睾篙糕羔膏韟高鷎鼛`,ㄍㄠˇ:`搞暠杲槁檺稿縞`,ㄍㄠˋ:`勂告祰筶誥郜鋯`,ㄍㄡ:`佝勾溝篝簼緱袧鉤韝`,ㄍㄡˇ:`岣枸狗笱耇芶苟蚼`,ㄍㄡˋ:`冓垢夠姤媾彀搆构構茩覯詬購遘雊`,ㄍㄢ:`坩尷杆柑泔漧玕甘疳矸竿筸肝酐鳱`,ㄍㄢˇ:`感敢桿橄澉皯稈笴簳赶趕鰔`,ㄍㄢˋ:`凎干幹旰榦淦灨盰紺詌贛骭`,ㄍㄣ:`根跟`,ㄍㄣˇ:`艮`,ㄍㄣˊ:`哏`,ㄍㄣˋ:`亙揯茛`,ㄍㄤ:`剛堈堽岡棡犅疘矼綱缸罡肛釭鋼`,ㄍㄤˇ:`崗港`,ㄍㄤˋ:`杠槓`,ㄍㄥ:`庚浭緪羹耕菮賡鶊`,ㄍㄥˇ:`哽埂挭梗綆耿郠骾鯁`,ㄍㄥˋ:`堩更`,ㄍㄨ:`估呱咕姑嫴孤柧橭沽泒箍箛罛菇菰蓇蛄觚軱辜酤鈲鮕鴣`,ㄍㄨˇ:`古唃啒嘏夃尳愲扢榖榾汩淈濲瀔牯盬瞽穀縎罟羖股臌薣蛌蠱詁谷轂鈷骨鼓`,ㄍㄨˊ:`鶻`,ㄍㄨˋ:`僱凅固堌崮故梏棝牿痼稒錮雇顧`,ㄍㄨㄚ:`刮劀栝瓜緺胍蝸趏颳騧鴰`,ㄍㄨㄚˇ:`剮寡`,ㄍㄨㄚˋ:`卦挂掛絓罣罫褂詿`,ㄍㄨㄛ:`咼嘓堝墎崞彉濄瘑聒蟈郭鍋`,ㄍㄨㄛˇ:`惈果槨淉猓粿蜾裹褁輠錁鐹`,ㄍㄨㄛˊ:`國幗慖漍聝膕蔮虢馘`,ㄍㄨㄛˋ:`過`,ㄍㄨㄞ:`乖摑`,ㄍㄨㄞˇ:`拐枴柺`,ㄍㄨㄞˋ:`夬怪`,ㄍㄨㄟ:`圭媯嫢巂摫槻槼歸珪瑰皈瞡硅窐茥螝規邽閨騩鮭龜`,ㄍㄨㄟˇ:`佹匭厬垝姽宄庋庪晷朹湀癸祪簋蛫蟡觤詭軌鬼`,ㄍㄨㄟˋ:`劊劌匱嶡撌昋柜桂槶檜櫃癐瞶禬筀簂襘貴跪鱖`,ㄍㄨㄢ:`倌冠官棺瘝觀關鰥鱞`,ㄍㄨㄢˇ:`琯痯筦管莞錧館`,ㄍㄨㄢˋ:`丱悹悺慣摜毌涫灌爟瓘盥矔祼罐貫鑵雚鱹鸛`,ㄍㄨㄣˇ:`惃滾緄蔉袞輥鯀`,ㄍㄨㄣˋ:`棍璭睔`,ㄍㄨㄤ:`光垙桄洸炚烡珖胱茪銧`,ㄍㄨㄤˇ:`廣獷臩`,ㄍㄨㄤˋ:`俇撗臦逛`,ㄍㄨㄥ:`供公功匑塨宮工幊弓恭愩攻肱蚣觥躬龔`,ㄍㄨㄥˇ:`廾拱拲栱汞珙輁鞏`,ㄍㄨㄥˋ:`共羾貢`,ㄎㄚ:`咖喀擖`,ㄎㄚˇ:`佧卡鉲`,ㄎㄜ:`匼嗑嵙搕柯棵榼樖牁犐珂瞌砢磕科稞窠苛薖蝌趷軻鈳顆髁`,ㄎㄜˇ:`可坷岢嵑嶱敤渴`,ㄎㄜˊ:`殼翗`,ㄎㄜˋ:`克刻勀堁客恪氪溘緙艐課騍`,"ㄎㄜ˙ㄧ":`剋`,ㄎㄞ:`揩開`,ㄎㄞˇ:`凱剴塏愷慨暟楷輆鍇鎧闓颽`,ㄎㄞˋ:`勓愒愾欬烗鎎`,ㄎㄠ:`尻`,ㄎㄠˇ:`拷攷栲洘烤考`,ㄎㄠˋ:`犒銬靠`,ㄎㄡ:`彄摳芤`,ㄎㄡˇ:`口`,ㄎㄡˋ:`叩寇扣滱瞉筘簆蔻釦鷇`,ㄎㄢ:`刊勘堪嵁戡龕`,ㄎㄢˇ:`侃坎埳檻欿歁砍竷莰轗顑`,ㄎㄢˋ:`墈崁看瞰矙磡衎闞`,ㄎㄣˇ:`啃墾懇肯豤錹齦`,ㄎㄣˋ:`掯裉`,ㄎㄤ:`嫝康慷漮糠鏮`,ㄎㄤˊ:`扛摃`,ㄎㄤˋ:`亢伉匟囥抗炕犺邟鈧閌`,ㄎㄥ:`吭坑挳牼硜硻誙銵鍞鏗阬`,ㄎㄨ:`刳哭堀枯桍矻窟跍骷`,ㄎㄨˇ:`狜苦`,ㄎㄨˋ:`嚳庫瘔褲趶酷`,ㄎㄨㄚ:`夸姱舿誇`,ㄎㄨㄚˇ:`侉垮銙`,ㄎㄨㄚˋ:`挎胯跨骻`,ㄎㄨㄛˋ:`廓懖括擴筈萿葀蛞闊霩鞹韕髺鬠`,ㄎㄨㄞˇ:`蒯`,ㄎㄨㄞˋ:`儈噲塊廥快旝獪筷膾鄶鱠`,ㄎㄨㄟ:`刲巋悝盔窺聧蘬虧闚顝`,ㄎㄨㄟˇ:`傀煃跬蹞頍`,ㄎㄨㄟˊ:`夔奎戣揆暌楏楑櫆犪睽葵藈躨逵鄈鍷頄頯馗騤魁`,ㄎㄨㄟˋ:`喟嘳媿嬇愧憒樻欳潰簣聵腃蕢鐀餽饋`,ㄎㄨㄢ:`寬臗髖`,ㄎㄨㄢˇ:`款窾`,ㄎㄨㄣ:`坤崑昆晜焜猑琨菎褌錕騉髡鯤鶤`,ㄎㄨㄣˇ:`壼悃捆梱硱稛綑裍閫`,ㄎㄨㄣˋ:`困涃睏`,ㄎㄨㄤ:`劻匡恇洭筐誆`,ㄎㄨㄤˇ:`夼懭`,ㄎㄨㄤˊ:`狂狅誑軠鵟`,ㄎㄨㄤˋ:`壙曠框況爌眶矌礦穬絖纊貺軦鄺`,ㄎㄨㄥ:`崆悾涳硿空箜錓`,ㄎㄨㄥˇ:`倥孔恐`,ㄎㄨㄥˋ:`控鞚`,"ㄏㄇ˙":`噷`,ㄏㄚ:`哈`,ㄏㄚˊ:`蛤`,ㄏㄜ:`呵喝欱訶`,ㄏㄜˊ:`何劾合和姀峆敆曷核楁毼河涸渮澕熆盉盍盒礉禾篕籺紇翮荷菏蚵螛覈郃鉌鑉闔鞨頜魺鶡麧齕龢`,ㄏㄜˋ:`佫嗃壑煂熇翯褐謞賀赫鶴`,ㄏㄞ:`咍咳嗨`,ㄏㄞˇ:`海烸胲醢`,ㄏㄞˊ:`孩還頦骸`,ㄏㄞˋ:`亥嗐妎害氦餀駭駴`,ㄏㄟ:`嘿潶黑`,ㄏㄠ:`嚆茠蒿薅薧`,ㄏㄠˇ:`好郝`,ㄏㄠˊ:`嗥嚎壕毫濠籇蚝蠔諕譹豪貉`,ㄏㄠˋ:`哠悎昊昦浩淏滈澔灝皓皜皞秏耗薃號鄗鎬顥鰝`,ㄏㄡ:`齁`,ㄏㄡˇ:`吼`,ㄏㄡˊ:`侯喉猴瘊篌翭翵葔鄇鍭餱鯸`,ㄏㄡˋ:`候厚后垕堠後洉逅郈鱟`,ㄏㄢ:`哻嫨憨歛蚶谽酣頇鼾`,ㄏㄢˇ:`喊罕蔊豃鬫`,ㄏㄢˊ:`函含咁唅寒嵅梒涵焓琀甝肣虷蜬邗邯鋡韓魽`,ㄏㄢˋ:`悍憾扞捍撖撼旱暵汗涆漢瀚焊熯睅翰菡蜭螒譀釬銲鋎閈雗頷顄馯駻鶾`,ㄏㄣˇ:`佷很狠`,ㄏㄣˊ:`拫痕鞎`,ㄏㄣˋ:`恨`,ㄏㄤ:`夯`,ㄏㄤˊ:`斻杭笐絎航苀蚢貥迒頏魧`,ㄏㄤˋ:`沆`,ㄏㄥ:`亨哼啈脝`,ㄏㄥˊ:`姮恆桁橫烆珩胻蘅衡鑅`,ㄏㄨ:`乎匢呼垀寣幠忽惚昒曶歑淴滹膴虍虖謼`,ㄏㄨˇ:`唬汻滸琥虎`,ㄏㄨˊ:`嘝囫壺媩弧抇搰斛楜槲湖瀫焀狐猢瑚糊縠胡葫蝴螜衚觳醐餬鬍魱鰗鵠鶘鶦`,ㄏㄨˋ:`互冱嗀婟嫭嫮岵怙戶戽扈昈枑楛槴沍滬熩瓠祜笏綔芐蔰護鄠鍙雽韄頀`,ㄏㄨㄚ:`嘩砉花蘤錵`,ㄏㄨㄚˊ:`姡搳滑猾華螖譁釪釫鋘鏵驊鷨`,ㄏㄨㄚˋ:`划劃化嫿嬅崋摦杹槬樺澅畫繣觟話諙`,ㄏㄨㄛ:`吙嚄攉豁騞`,ㄏㄨㄛˇ:`伙夥漷火鈥`,ㄏㄨㄛˊ:`佸活秮`,ㄏㄨㄛˋ:`惑或捇掝曤檴沎湱濩瀖獲眓矐禍穫臛藿蠖謋貨鑊霍靃`,ㄏㄨㄞˊ:`徊怀懷槐櫰淮瀤蘹褢褱踝`,ㄏㄨㄞˋ:`咶坏壞蘾`,ㄏㄨㄟ:`噅徽恢拻揮撝暉楎洃灰煇禈翬蘳褘詼豗輝隓隳鰴麾`,ㄏㄨㄟˇ:`悔檓毀毇燬虺譭`,ㄏㄨㄟˊ:`佪回恛洄烠痐茴蚘蛔迴`,ㄏㄨㄟˋ:`匯卉喙嘒噦圚孈彗彙徻恚惠慧憓晦會槥橞檅潓澮濊燴獩璯瘣瞺硊穢篲繢繪翽芔蔧蕙薈薉藱蟪誨諱譓譿賄鏸鐬闠顪餯`,ㄏㄨㄢ:`嚾懽歡犿獾讙酄驩鴅`,ㄏㄨㄢˇ:`攌緩`,ㄏㄨㄢˊ:`圜嬛寰峘桓洹澴狟環瓛綄繯羦荁萑豲貆轘郇鍰鐶闤雈鬟`,ㄏㄨㄢˋ:`喚奐宦幻患換擐浣渙漶澣煥瑍瘓睆肒豢逭鯇`,ㄏㄨㄣ:`婚惛昏棔殙涽睧睯葷閽`,ㄏㄨㄣˊ:`梡渾琿繉轋餛魂鼲`,ㄏㄨㄣˋ:`倱圂慁掍混溷觨諢`,ㄏㄨㄤ:`巟慌肓荒衁`,ㄏㄨㄤˇ:`幌怳恍晃炾熀謊`,ㄏㄨㄤˊ:`偟凰喤堭媓崲徨惶楻湟潢煌熿獚璜皇磺穔篁篊簧艎葟蝗蟥諻趪遑鍠隍韹餭騜鰉鷬黃`,ㄏㄨㄤˋ:`榥滉皝鎤`,ㄏㄨㄥ:`吽哄嚝揈渹灴烘焢薨訇谾輷轟鍧`,ㄏㄨㄥˇ:`嗊`,ㄏㄨㄥˊ:`仜吰妅宏弘彋汯泓洪浤渱玒竑竤紅紘翃耾苰葒蕻虹谹谼鈜鋐閎霐霟鞃魟鴻黌`,ㄏㄨㄥˋ:`澋澒訌闀鬨`,ㄐㄧ:`丌乩刉剞勣咭唧嘰圾基墼姬屐嵇敧机枅機櫅毄激犄璣畸畿癪磯禨稘稽積笄箕簊緝績羇羈肌芨虀觭譏跡蹟躋鄿銈錤鐖鑇隮雞鞿飢饑鸄齎齏`,ㄐㄧˇ:`丮几妀己幾戟掎撠擠泲穖脊虮蟣魕麂`,ㄐㄧˊ:`亟伋佶偮即及吉堲塉姞嫉岌嶯庴彶忣急戢揤擊极棘楫極槉橶殛汲湒潗濈狤疾瘠笈籍級耤膌蒺蕀蕺藉螏襋觙谻趌踖蹐躤輯轚銡鏶集霵鶺鷑`,ㄐㄧˋ:`伎偈冀劑嚌塈妓季寂寄徛忌悸惎懻技旡既暨暩檕洎漃漈濟瀱痵癠祭稷穄穊穧紀紒繼罽臮芰茍茤蔇薊薺蘮蘻裚覬計記誋諅跽際霽驥髻鬾鯚鰶鰿鱀鱭鵋齌`,ㄐㄧㄚ:`伽佳傢加嘉夾家抸枷梜毠泇浹犌猳珈痂笳耞茄葭袈豭貑跏迦鉿鎵麚`,ㄐㄧㄚˇ:`假婽岬徦斝椵榎檟玾甲瘕胛賈鉀`,ㄐㄧㄚˊ:`唊恝戛扴莢蛺裌跲郟鋏頰鴶鵊`,ㄐㄧㄚˋ:`价價嫁幏架稼駕`,ㄐㄧㄝ:`喈嗟接揭椄湝痎癤皆秸菨蝔街謯階鞂鶛`,ㄐㄧㄝˇ:`姐媎檞解`,ㄐㄧㄝˊ:`倢傑劫劼婕孑尐岊崨嵥巀幯截拮捷昅杰桀桔楬楶榤洁滐潔疌睫碣竭節結絜羯蝍蠽衱袺訐詰踕迼鉣鍻鞊鮚`,ㄐㄧㄝˋ:`介借吤屆岕悈戒犗玠界疥砎芥蚧蛶褯誡骱`,ㄐㄧㄠ:`交僬嘄姣嬌嶕憍椒澆焦燋礁穚簥膠膲艽茭蕉蛟蟭跤轇郊鐎驕鮫鵁鷦鷮`,ㄐㄧㄠˇ:`佼僥儌剿劋恔憿捁摷撟攪敿曒湫灚煍狡皎皦矯笅絞繳腳蟜角譑鉸餃鱎`,ㄐㄧㄠˋ:`叫嘂噭嬓嶠徼挍教斠滘潐獥珓皭窌窖譥趭較轎酵醮釂`,ㄐㄧㄡ:`勼啾揂揪揫摎朻樛牞糾萛赳鬮鳩`,ㄐㄧㄡˇ:`久九氿灸玖酒韭`,ㄐㄧㄡˋ:`僦咎就廄慦捄救柩殧疚究臼舅舊鯦鷲麔`,ㄐㄧㄢ:`兼堅奸姦尖幵惤戔搛椷櫼殲湔瀸煎熞熸牋犍猏瑊監礛箋緘縑肩艱菅菺葌蒹蕑虃豜鑯間鞬韉餰鰹鳽鵳鶼麉`,ㄐㄧㄢˇ:`儉剪劗囝堿戩挸揀揃撿暕柬檢減湕瑐瞼筧簡籛繭翦茧藆襉襺謇譾趼蹇鬋鰎鹼`,ㄐㄧㄢˋ:`件俴健僭劍寋建栫楗榗毽洊漸澗濺瀳牮珔瞷箭糋腱艦荐葥蔪薦螹袸見諓諫賤踐轞鋻鍵鐱鑑鑒鑳餞`,ㄐㄧㄣ:`今埐堻嶜巾惍斤津珒矜筋紟衿襟觔金釿`,ㄐㄧㄣˇ:`僅儘堇巹廑槿瑾盡緊菫蓳謹錦饉`,ㄐㄧㄣˋ:`伒僸勁噤嚍墐妗嬧寖搢晉枃殣浸溍濜煡燼璡璶祲禁縉藎覲賮贐近進靳`,ㄐㄧㄤ:`僵姜將橿殭江漿疆礓翞茳薑螿豇韁`,ㄐㄧㄤˇ:`傋槳獎耩膙蔣講顜`,ㄐㄧㄤˋ:`匠嵹弶彊洚糨絳袶謽醬降`,ㄐㄧㄥ:`京兢婛巠惊旌旍晶涇睛粳精經荊莖菁驚鯨鵛鶁鶄麠鼱`,ㄐㄧㄥˇ:`丼井儆剄幜憬憼景暻汫璟璥蟼警阱頸`,ㄐㄧㄥˋ:`俓倞凈境婧弳徑敬桱淨獍痙竟竫競脛逕鏡靖靚靜`,ㄐㄩ:`匊娵居崌拘挶掬梮椐泃涺狙琚疽痀砠罝腒苴蜛裾趄踘鋦陱雎鞠鞫駒鮈鶋`,ㄐㄩˇ:`咀椇櫸沮矩筥舉莒蒟踽齟`,ㄐㄩˊ:`侷僪局椈橘淗湨焗犑狊菊蘜趜跼輂郹閰駶驧鵙鵴鶪鼰鼳`,ㄐㄩˋ:`俱倨具劇句埧壉姖寠屨岠巨怐怚懅懼拒据據洰澽炬犋秬窶粔耟聚苣虡蚷袓詎豦貗跙距踞躆遽醵鉅鋸鐻颶駏`,ㄐㄩㄝ:`噘屩撅蹻`,ㄐㄩㄝˊ:`倔傕劂匷厥嚼孓崛彏憰戄抉捔掘攫桷橛殌決泬爝爵獗玃玦玨瘚矍絕臄芵蕝蕨虳蚗蟨覺觖觼訣譎貜赽趉趹蹶躩鈌鐍钁駃鴃鶌鷢`,ㄐㄩㄢ:`娟捐涓焆脧蠲裐鐫鵑`,ㄐㄩㄢˇ:`卷帣捲臇菤錈`,ㄐㄩㄢˋ:`倦狷獧眷睊睠絭絹縳罥蔨鄄雋`,ㄐㄩㄣ:`君均桾皸碅莙菌蚐袀軍鈞鍕鮶麇`,ㄐㄩㄣˋ:`俊呁寯峻捃晙棞浚濬焌燇珺畯竣箘葰蜠郡餕駿鵔鵘`,ㄐㄩㄥ:`坰扃絅駉`,ㄐㄩㄥˇ:`冏囧泂浻炅炯煚熲燛窘褧迥`,ㄑㄧ:`七倛僛凄嘁妻娸悽慼戚攲柒栖桼棲榿欹欺沏淒漆緀萋蛣諆諿蹊迉郪鏚霋魌鶈`,ㄑㄧˇ:`乞啟婍屺杞棨綺芑豈起邔`,ㄑㄧˊ:`亓俟其圻埼奇岐岓崎忯懠掑旂旗期棋歧淇濝玂琦琪畦疧碕祁祇祈祺綦耆肵臍艩萁藄蘄蚑蚔蚚蜞蠐跂踑軝釮錡頎騎騏騹鬐鬿鯕鰭鵸鶀麒麡齊`,ㄑㄧˋ:`企咠唭器契忔憩栔棄槭气氣汔汽泣湆湇甈盵砌磧磩罊芞葺蟿訖迄鼜`,ㄑㄧㄚ:`掐袷`,ㄑㄧㄚˇ:`酠`,ㄑㄧㄚˋ:`冾帢恰愘殎洽硈髂`,ㄑㄧㄝˇ:`且`,ㄑㄧㄝˋ:`切厒妾怯愜挈朅洯竊篋緁藒蛪踥鍥鐑鯜`,ㄑㄧㄠ:`劁墝墽幧悄敲橇毃燆磽繑趬踍蹺郻鄡鍬鐰頝骹`,ㄑㄧㄠˇ:`巧愀髜`,ㄑㄧㄠˊ:`僑喬嘺嫶憔樵橋犞瞧礄荍菬蕎趫`,ㄑㄧㄠˋ:`俏峭帩撬撽竅翹誚譙躈鞘`,ㄑㄧㄡ:`丘坵媝恘楸秋緧萩蓲蚯蝵蟗蠤趥邱鞦鰍鶖`,ㄑㄧㄡˇ:`糗`,ㄑㄧㄡˊ:`俅唒囚崷巰梂殏毬求泅煪犰球璆盚紌絿莍虯蛷蝤裘觓觩訄賕逑遒酋釚銶鮂鯄鰽鼽`,ㄑㄧㄢ:`仟僉千奷婜岍愆慳扦掔搴攐攓檶櫏汧牽簽籤粁芊褰謙遷鈆鉛阡雃韆顅騫`,ㄑㄧㄢˇ:`凵嗛槏淺繾脥蜸譴遣`,ㄑㄧㄢˊ:`乾仱前墘媊岒忴扲拑掮揵榩潛灊箝羬蕁虔軡鈐鉗錢靬騚騝鰬黔黚`,ㄑㄧㄢˋ:`俔倩傔塹嵌慊棈槧欠歉篟綪縴芡茜蒨輤鰜`,ㄑㄧㄣ:`侵嶔欽綅衾親顉駸`,ㄑㄧㄣˇ:`坅寑寢昑梫笉螼鋟`,ㄑㄧㄣˊ:`勤噙埁嫀庈慬懃擒斳檎溱澿琴瘽禽秦耹芩芹菳蚙螓鈙雂靲鬵鳹`,ㄑㄧㄣˋ:`唚撳沁瀙菣藽`,ㄑㄧㄤ:`嗆嶈戕戧斨椌槍牄瑲羌腔蜣謒蹌蹡錆鎗鏘`,ㄑㄧㄤˇ:`墏搶繈羥襁鏹`,ㄑㄧㄤˊ:`嬙廧強檣漒牆薔蘠`,ㄑㄧㄤˋ:`唴熗羻`,ㄑㄧㄥ:`傾卿圊埥氫清蜻輕郬鑋青`,ㄑㄧㄥˇ:`廎漀請頃`,ㄑㄧㄥˊ:`勍情擎擏晴樈檠殑氰葝黥`,ㄑㄧㄥˋ:`凊慶掅碃磬箐綮罄謦靘`,ㄑㄩ:`佉區屈岨嶇抾敺曲浀祛紶胠蛆蛐袪詘趨軀镼阹驅髷魼鱋麴`,ㄑㄩˇ:`取娶竘蝺齲`,ㄑㄩˊ:`佢劬斪朐欋氍淭渠灈璩瞿磲籧絇翑胊臞菃葋蕖蘧螶蟝蠷蠼衢躣軥鴝鼩`,ㄑㄩˋ:`刞去呿覷趣闃麮鼁`,ㄑㄩㄝ:`炔缺蒛`,ㄑㄩㄝˊ:`瘸`,ㄑㄩㄝˋ:`卻埆塙愨搉榷皵硞确碏確碻礐礭闋闕雀鵲`,ㄑㄩㄢ:`圈弮恮悛棬鐉駩`,ㄑㄩㄢˇ:`汱烇犬畎綣虇`,ㄑㄩㄢˊ:`佺全埢姾婘巏惓拳權泉牷犈瑔痊筌絟縓荃蜷蠸觠詮跧踡輇醛銓顴鬈齤`,ㄑㄩㄢˋ:`券勸牶韏`,ㄑㄩㄣ:`囷峮逡`,ㄑㄩㄣˊ:`宭群裙`,ㄑㄩㄥˊ:`惸憌桏橩煢璚瓊瓗瞏穹窮笻筇舼藑藭蛩蛬赹跫邛銎`,ㄒㄧ:`俙傒僖兮凞吸唏嘻夕奚嬉屖嶲巇希徆徯恓悉悕惁扱晞晰曦析桸榽樨橀欷氥汐浠淅溪潝烯焟熄熙熹燨爔犀犧狶琋瘜皙睎硒磎礂稀穸窸粞緆羲翕肸膝莃菥蒠蜥螅螇蟋蠵西觿譆谿豨豯貕郗鄎酅醯釐釸鑴雟鵗鸂鼷`,ㄒㄧˇ:`喜囍屣徙枲歖洗漇璽禧縰葸蓰蟢諰謑蹝`,ㄒㄧˊ:`媳嶍席息惜昔槢檄習蓆薂襲覡謵郋錫鎴隰霫飁騱騽驨鰼`,ㄒㄧˋ:`係卌呬咥屭忥怬恄慀戲欯滊潟熂盻矽禊系細綌繫舄蕮虩衋覤赩郤釳闟隙餼鬩黖`,ㄒㄧㄚ:`呷煆瞎蝦颬`,ㄒㄧㄚˇ:`閜`,ㄒㄧㄚˊ:`俠匣峽暇柙烚狎狹珨瑕硤碬磍祫縖舝舺蕸赮轄遐鍜陜霞騢魻鶷黠`,ㄒㄧㄚˋ:`下嚇夏罅鏬`,ㄒㄧㄝ:`些揳楔歇猲蝎蠍`,ㄒㄧㄝˇ:`寫`,ㄒㄧㄝˊ:`偕劦勰協嗋垥奊愶拹挾擷攜斜熁燲瑎緳纈脅蝢襭諧邪鞋頡龤`,ㄒㄧㄝˋ:`伳偞偰僁卸媟屑屧嶰廨懈械榍榭泄洩渫澥瀉瀣灺焎燮獬祄紲絏繲薢薤蟹褉褻謝躞邂鞢韰齂齘齛齥`,ㄒㄧㄠ:`呺嘐嘵囂宵庨憢揱枵梟櫹歊毊消瀟灱猇獢痚痟硝穘窙簫綃翛膮萷蕭藃虈虓蟂蠨踃逍銷霄驍髇髐魈鴞鷍`,ㄒㄧㄠˇ:`小曉皛筱篠謏`,ㄒㄧㄠˊ:`崤殽洨淆筊郩`,ㄒㄧㄠˋ:`傚哮嘯孝效校涍熽笑肖詨`,ㄒㄧㄡ:`休修咻庥樇烋羞脙脩臹貅銝鎀饈髹鵂`,ㄒㄧㄡˇ:`朽滫潃糔`,ㄒㄧㄡˊ:`苬`,ㄒㄧㄡˋ:`嗅岫溴珛琇秀繡螑袖褎鏽`,ㄒㄧㄢ:`仙仚佡僊先嘕奾嬐孅屳廯忺憸掀攕暹杴枮氙珗祆秈纖薟褼襳躚銛韱馦鮮鶱`,ㄒㄧㄢˇ:`冼尟嶮幰搟攇毨灦烍燹獫獮玁禒筅蘚譣赻跣銑鍌險韅顯`,ㄒㄧㄢˊ:`伭咸唌啣妶娹嫌嫻弦憪撏涎澖癇礥絃胘舷蚿蛝誸諴賢銜閑閒鷳鷴鹹麙`,ㄒㄧㄢˋ:`僩壏姭娊峴憲撊晛涀瀗獻現睍粯糮線縣羡羨腺莧蜆豏鋧錎限陷霰餡鼸`,ㄒㄧㄣ:`妡廞心忻新昕杺欣歆炘盺芯薪訢辛鈊鋅鑫馨馫`,ㄒㄧㄣˇ:`伈`,ㄒㄧㄣˊ:`枔襑鐔`,ㄒㄧㄣˋ:`信囟焮舋釁阠`,ㄒㄧㄤ:`廂忀欀湘瓖相箱緗膷葙薌襄鄉鑲香驤`,ㄒㄧㄤˇ:`享想晑曏蠁響餉饗饟鯗`,ㄒㄧㄤˊ:`庠瓨祥翔詳`,ㄒㄧㄤˋ:`像向嚮姠巷橡缿萫蟓衖襐象銗鐌項鱌`,ㄒㄧㄥ:`垶惺星煋猩瑆箵腥蛵觲騂`,ㄒㄧㄥˇ:`擤醒`,ㄒㄧㄥˊ:`侀刑型娙形洐滎硎行邢鈃鉶鋞陘`,ㄒㄧㄥˋ:`倖姓婞幸性悻杏涬興荇莕`,ㄒㄩ:`吁噓墟嬃幁戌揟旴晇楈欨欻歔湑盱窢縃繻胥蕦虛蝑訏諝鑐需須頊驉鬚魆魖`,ㄒㄩˇ:`冔呴姁暊栩珝稰糈許詡鄦醑`,ㄒㄩˊ:`徐`,ㄒㄩˋ:`侐勖勗卹喣垿婿序怴恤慉敘旭昫殈沀洫漵烅烼煦獝瞁瞲絮緒續芧蓄藇藚訹酗銊鱮`,"ㄒㄩ˙":`蓿`,ㄒㄩㄝ:`削疶蒆薛靴`,ㄒㄩㄝˇ:`雪鱈`,ㄒㄩㄝˊ:`噱壆學岤嶨澩燢穴袕觷踅鷽`,ㄒㄩㄝˋ:`吷狘血謔趐`,ㄒㄩㄢ:`儇喧媗宣愃愋懁揎昍暄梋瑄矎禤翾萱萲蓒蝖蠉諠諼軒鋗鍹駽`,ㄒㄩㄢˇ:`咺晅烜癬選顈`,ㄒㄩㄢˊ:`嫙懸旋漩玄玹琁璇璿蜁`,ㄒㄩㄢˋ:`昡楥楦泫渲炫琄眩眴絢縼蔙衒袨讂贙鉉鏇鞙`,ㄒㄩㄣ:`勛勳塤壎曛焄熏燻獯矄纁臐蔒薰醺`,ㄒㄩㄣˊ:`噚尋峋巡循恂揗攳旬栒洵潯灥燅燖珣璕紃荀蟳詢鄩馴鱘`,ㄒㄩㄣˋ:`侚噀巽徇愻殉汛潠稄蕈訊訓迅迿遜`,ㄒㄩㄥ:`兄兇凶匈哅忷恟洶胸芎`,ㄒㄩㄥˊ:`熊雄`,ㄒㄩㄥˋ:`敻詗`,ㄓ:`之卮吱戠搘支枝梔椥榰汁汥泜知祗禔秖秪稙織肢胑胝脂臸芝蘵蜘衼隻鳷`,ㄓˇ:`只咫址坁徵恉扺指旨枳止汦沚淽疻祉紙芷藢衹趾軹酯阯黹`,ㄓˊ:`侄值埴執姪嬂慹摭植樴殖淔犆瓡直縶職膱蟙質跖蹠躑馽`,ㄓˋ:`乿偫傂制厔墆寘峙帙幟庢庤廌彘志忮懥懫扻挃摯擲擳晊智柣桎楖櫍櫛治洷滍滯瀄炙狾猘畤疐痔痣礩祑秩秷稚窒紩緻置翐膣至致蛭螲袟製覟觶誌豸贄跱躓輊迣郅銍鋕鑕阤陟雉駤騭騺鴙鷙`,ㄓㄚ:`吒哳喳奓扎抯挓柤楂樝渣皻觰譇齇`,ㄓㄚˇ:`厏眨砟苲鮓`,ㄓㄚˊ:`劄札煠蚻譗鍘閘`,ㄓㄚˋ:`乍搾柞榨溠炸痄蚱詐醡霅`,ㄓㄜ:`嫬蜇遮`,ㄓㄜˇ:`者褶赭鍺`,ㄓㄜˊ:`哲悊折摺晢矺砓磔粍虴蟄謫謺讋輒轍馲鮿`,ㄓㄜˋ:`柘浙淛潪蔗蟅這鷓`,ㄓㄞ:`捚摘齋`,ㄓㄞˇ:`窄`,ㄓㄞˊ:`宅檡`,ㄓㄞˋ:`債寨瘵砦`,ㄓㄠ:`啁妱招昭皽盄釗鉊鍣駋`,ㄓㄠˇ:`找沼爪瑵`,ㄓㄠˋ:`兆召垗旐曌棹櫂炤照狣笊罩肇詔趙鮡`,ㄓㄡ:`侜周喌婤州徟掫洲淍珘盩粥舟謅譸賙輈輖週銂騆鵃`,ㄓㄡˇ:`帚睭肘鯞`,ㄓㄡˊ:`妯碡軸`,ㄓㄡˋ:`僽冑咒咮噣宙晝甃皺籀紂縐胄詶酎駎驟`,ㄓㄢ:`惉旃栴氈沾瞻粘薝蛅詀詹譫邅霑饘驙魙鱣鸇`,ㄓㄢˇ:`嫸展嶄搌斬榐橏琖盞輾醆颭黵`,ㄓㄢˋ:`佔偡占戰棧湛站綻蘸虥譧輚轏驏`,ㄓㄣ:`偵寊斟桭楨榛樼潧獉珍瑧甄真砧碪禎禛箴籈胗臻葴蓁薽貞轃遉針鍼鱵`,ㄓㄣˇ:`抮枕畛疹眕稹紾縥袗裖診軫駗鬒黰`,ㄓㄣˋ:`侲挋振揕敶朕栚甽眹紖絼誫賑酖鎮陣震鴆`,ㄓㄤ:`傽嫜張彰慞暲樟漳獐璋章粻蟑遧鄣騿鱆`,ㄓㄤˇ:`仉掌漲長`,ㄓㄤˋ:`丈仗墇嶂帳幛扙杖瘴瞕粀脹賬障`,ㄓㄥ:`埩姃媜崝崢征怔掙炡烝爭猙癥眐睜箏篜聇蒸鉦錚鯖`,ㄓㄥˇ:`拯掟撜整晸氶糽`,ㄓㄥˋ:`塣幀政正症証諍證鄭`,ㄓㄨ:`侏朱株櫧櫫洙瀦珠硃絑茱蛛蝫蠩袾誅諸豬跦邾銖鮢鴸`,ㄓㄨˇ:`主囑拄斸渚煮矚罜陼麈`,ㄓㄨˊ:`孎欘泏灟燭瘃窋竹竺笁舳茿蠋蠾躅逐钃鱁`,ㄓㄨˋ:`佇住助壴嵀杼柱柷樦殶注炷疰眝砫祝祩筑箸築篫紵紸羜翥莇著蛀註貯跓軴鉒鑄馵駐麆`,ㄓㄨㄚ:`抓檛簻膼髽`,ㄓㄨㄛ:`倬拙捉桌棳涿穛穱蠿`,ㄓㄨㄛˊ:`卓啄啅圴彴擢斀斫斲梲椓櫡汋浞濁濯灂灼禚篧籗罬茁蠗諑謶酌鐲鵫鷟`,ㄓㄨㄞˇ:`跩`,ㄓㄨㄞˋ:`拽`,ㄓㄨㄟ:`椎追錐隹騅鵻`,ㄓㄨㄟˇ:`沝`,ㄓㄨㄟˋ:`墜娷惴甀畷硾綴縋膇諈贅轛醊錣鑆餟`,ㄓㄨㄢ:`塼嫥專瑼磚膞蟤諯鄟顓鱄`,ㄓㄨㄢˇ:`轉`,ㄓㄨㄢˋ:`僎囀撰瑑篆篹腞譔賺饌`,ㄓㄨㄣ:`宒窀肫諄迍`,ㄓㄨㄣˇ:`准埻準綧`,ㄓㄨㄣˋ:`稕訰`,ㄓㄨㄤ:`妝庄梉樁湷莊裝`,ㄓㄨㄤˋ:`壯戇撞焋狀`,ㄓㄨㄥ:`中伀妐彸忠柊炂盅籦終舯蔠螤螽衷鍾鐘鼨`,ㄓㄨㄥˇ:`冢塚尰煄种種腫踵`,ㄓㄨㄥˋ:`仲偅堹狆眾祌衶重`,ㄔ:`吃哧喫嗤媸摛攡瓻痴癡眵瞝笞絺胵蚩螭誺魑鴟黐齝`,ㄔˇ:`侈呎尺恥欼胣蚇袲褫豉鉹齒`,ㄔˊ:`墀弛持歭池漦箎篪茌荎蚳謘貾趍踟遲馳`,ㄔˋ:`傺叱啻彳懘抶敕斥湁熾痸瘈瘛翅翨赤跮遫鉓飭饎鶒鷘`,"ㄔ˙":`麶`,ㄔㄚ:`偛叉嗏扠插杈疀臿艖鍤`,ㄔㄚˇ:`衩蹅`,ㄔㄚˊ:`垞察搽查槎碴秅茬茶`,ㄔㄚˋ:`侘奼岔差汊紁詫`,ㄔㄜ:`硨莗車`,ㄔㄜˇ:`扯撦`,ㄔㄜˋ:`坼屮徹掣撤澈烢硩迠`,ㄔㄞ:`拆釵`,ㄔㄞˊ:`儕喍柴祡豺齜`,ㄔㄞˋ:`囆瘥蠆袃`,ㄔㄠ:`勦弨怊抄焯訬超鈔`,ㄔㄠˇ:`吵炒焣眧`,ㄔㄠˊ:`嘲巢晁朝樔漅潮牊窲罺轈鄛`,ㄔㄠˋ:`耖`,ㄔㄡ:`抽搊犨瘳篘`,ㄔㄡˇ:`丑偢吜杻杽瞅醜`,ㄔㄡˊ:`仇儔嬦幬怞惆愁懤栦椆燽疇稠籌紬絒綢菗薵裯讎躊酬雔`,ㄔㄡˋ:`殠臭`,ㄔㄢ:`幨攙梴裧襜覘辿鉆鋓`,ㄔㄢˇ:`丳剷嘽囅嵼幝旵滻灛燀產簅繟蕆諂譂辴鏟闡`,ㄔㄢˊ:`僝儃儳劖嚵嬋孱巉廛棎欃毚湹潺澶瀍瀺煘獑磛禪纏艬蟬蟾讒躔酁鋋鑱饞`,ㄔㄢˋ:`忏懺摲羼顫`,ㄔㄣ:`嗔抻捵琛瞋綝縝諃謓賝郴`,ㄔㄣˇ:`墋磣贂踸鍖`,ㄔㄣˊ:`塵宸忱愖揨晨梣樄沉煁臣茞莐蔯螴諶辰鈂陳鷐麎`,ㄔㄣˋ:`儭嚫櫬疢襯讖趁齔`,ㄔㄤ:`倀娼昌淐猖琩菖裮錩閶鯧鼚`,ㄔㄤˇ:`厂場廠惝敞昶氅鋹`,ㄔㄤˊ:`仩償嘗嚐嫦常徜腸萇鋿鱨`,ㄔㄤˋ:`倡唱悵暢瑒韔鬯`,ㄔㄥ:`偁撐棦橕檉浾湞琤瞠稱竀蟶赬鏿饓`,ㄔㄥˇ:`庱悜逞騁`,ㄔㄥˊ:`丞乘呈城埕塍宬峸懲成承掁晟朾棖橙溗澂澄珵碀程脀脭荿裎誠郕酲鋮騬`,ㄔㄥˋ:`牚秤`,ㄔㄨ:`出初摴樗貙齣`,ㄔㄨˇ:`儲杵楚楮檚濋礎褚`,ㄔㄨˊ:`媰幮廚櫥滁犓篨耡芻蒢藸蜍趎躇躕鉏鋤除雛鶵`,ㄔㄨˋ:`亍俶儊埱怵搐敊斶歜滀珿琡畜矗絀臅蓫處触觸諔豖踀鄐黜`,ㄔㄨㄛ:`戳踔逴`,ㄔㄨㄛˋ:`嚽娕娖婥惙擉歠磭綽腏趠輟齪`,ㄔㄨㄞ:`揣搋`,ㄔㄨㄞˊ:`膗`,ㄔㄨㄞˋ:`啜踹`,ㄔㄨㄟ:`吹炊`,ㄔㄨㄟˊ:`倕圌垂捶搥棰槌箠腄菙錘鎚陲`,ㄔㄨㄢ:`川氚猭瑏穿`,ㄔㄨㄢˇ:`喘歂舛荈踳`,ㄔㄨㄢˊ:`傳暷椽舡船輲遄`,ㄔㄨㄢˋ:`串汌玔賗釧鶨`,ㄔㄨㄣ:`媋春暙杶椿槆橁輴鰆鶞`,ㄔㄨㄣˇ:`偆惷萶蠢賰`,ㄔㄨㄣˊ:`唇淳漘犉純脣蓴醇錞鯙鶉`,ㄔㄨㄤ:`摐瘡窗`,ㄔㄨㄤˇ:`傸磢闖`,ㄔㄨㄤˊ:`幢床`,ㄔㄨㄤˋ:`凔刱創愴`,ㄔㄨㄥ:`充忡憃憧沖浺珫罿翀舂艟茺衝蹖`,ㄔㄨㄥˇ:`寵`,ㄔㄨㄥˊ:`崇爞緟虫蝩蟲隀`,ㄔㄨㄥˋ:`揰銃`,ㄕ:`失尸屍師施湤溮溼濕獅絁葹蓍虱蝨褷襹詩邿鉈鰤鳲鶳`,ㄕˇ:`使史始屎矢豕駛`,ㄕˊ:`十塒姼寔實拾時榯湜溡石祏蒔蝕鉐食鰣鼫鼭`,ㄕˋ:`世事仕侍勢嗜噬士奭媞室崼市式弒徥忕恀恃戺拭揓是柿栻氏澨烒示筮簭舐螫襫視觢試誓諟諡謚識貰軾适逝適遾釋鈰鉽銴飾`,"ㄕ˙":`匙`,ㄕㄚ:`剎唦樧殺沙煞猀痧砂硰紗莎蔱裟鎩魦鯊`,ㄕㄚˇ:`傻`,ㄕㄚˊ:`啥`,ㄕㄚˋ:`唼啑喢嗄廈歃箑翜翣萐霎`,"ㄕㄚ˙":`繌`,ㄕㄜ:`奢檨猞畬賒輋`,ㄕㄜˇ:`捨舍`,ㄕㄜˊ:`佘舌蛇`,ㄕㄜˋ:`厙射慴懾摵攝歙涉涻灄社蔎蠂設赦韘騇麝`,ㄕㄞ:`篩簁釃`,ㄕㄞˇ:`繺`,ㄕㄞˋ:`晒曬閷`,ㄕㄠ:`弰捎旓梢燒稍筲艄莦蕱蛸輎髾鮹`,ㄕㄠˇ:`少`,ㄕㄠˊ:`勺玿芍苕韶`,ㄕㄠˋ:`劭卲哨潲睄紹袑邵`,ㄕㄡ:`收`,ㄕㄡˇ:`守手艏首`,ㄕㄡˋ:`受售壽授狩獸瘦綬`,ㄕㄢ:`刪剼埏姍山幓挻搧杉柵潸煽狦珊痁笘縿羶膻舢芟苫衫跚`,ㄕㄢˇ:`晱煔睒覢閃陝`,ㄕㄢˋ:`剡善墠墡嬗扇擅樿汕潬灗疝繕膳蟺訕謆贍赸鄯釤騸鱔`,ㄕㄣ:`伸侁兟呻堔妽姺娠屾峷柛棽氠深燊珅甡申眒砷籸紳莘葠蔘詵身駪鯓`,ㄕㄣˇ:`哂嬸審曋沈瀋瞫矧覾諗讅邥`,ㄕㄣˊ:`什神`,ㄕㄣˋ:`侺慎椹滲甚祳罧胂脤腎蜃蜄鋠`,ㄕㄤ:`傷商殤漡熵蔏螪觴謪鬺`,ㄕㄤˇ:`晌賞`,ㄕㄤˋ:`上尚恦鞝`,"ㄕㄤ˙":`裳`,ㄕㄥ:`升呏昇泩湦焺牲狌生甥笙聲鉎陞鵿鼪`,ㄕㄥˇ:`偗渻省眚`,ㄕㄥˊ:`憴繩譝`,ㄕㄥˋ:`剩勝圣嵊盛聖胜貹賸`,ㄕㄨ:`倏儵姝抒攄書杸梳樞橾殊殳毹焂瑹疏紓綀舒菽蔬跾軗輸鄃陎鮛鵨`,ㄕㄨˇ:`屬暑曙潻癙糬署薯藷蜀襡襩鸀黍鼠`,ㄕㄨˊ:`叔塾婌孰淑熟秫贖`,ㄕㄨˋ:`咰墅尌庶怷恕戍數朮束樹沭漱澍腧虪術裋豎述鉥鏣隃鶐`,ㄕㄨㄚ:`刷唰`,ㄕㄨㄚˇ:`耍`,ㄕㄨㄛ:`說`,ㄕㄨㄛˋ:`妁搠朔槊欶爍獡碩箾蒴鎙鑠`,ㄕㄨㄞ:`摔衰`,ㄕㄨㄞˇ:`甩`,ㄕㄨㄞˋ:`帥蟀`,ㄕㄨㄟˇ:`水`,ㄕㄨㄟˊ:`脽誰`,ㄕㄨㄟˋ:`帨涗睡稅裞`,ㄕㄨㄢ:`拴栓閂`,ㄕㄨㄢˋ:`涮`,ㄕㄨㄣˇ:`吮`,ㄕㄨㄣˋ:`瞚瞬舜蕣順鬊`,ㄕㄨㄤ:`孀孇礵艭雙霜驦鷞`,ㄕㄨㄤˇ:`塽慡樉漺爽縔`,ㄕㄨㄤˋ:`灀`,ㄖˋ:`日鈤馹`,ㄖㄜˇ:`惹`,ㄖㄜˋ:`熱`,ㄖㄠˇ:`扰擾隢`,ㄖㄠˊ:`嬈橈蕘襓饒`,ㄖㄠˋ:`繞遶`,ㄖㄡˇ:`楺韖`,ㄖㄡˊ:`厹媃揉柔煣禸粈糅葇蝚蹂輮鍒鞣騥鰇鶔`,ㄖㄡˋ:`肉`,ㄖㄢˇ:`冉姌染橪珃苒`,ㄖㄢˊ:`呥然燃蚺袡髯`,ㄖㄣˇ:`忍栠棯稔荏荵`,ㄖㄣˊ:`人仁壬芢銋鵀`,ㄖㄣˋ:`仞任刃妊屻牣紉紝肕腍葚衽訒認軔韌飪`,ㄖㄤˇ:`嚷壤攘爙纕`,ㄖㄤˊ:`儴勷瀼獽瓤禳穰蘘躟鬤`,ㄖㄤˋ:`懹讓`,ㄖㄥ:`扔`,ㄖㄥˊ:`仍礽陾`,ㄖㄨˇ:`乳擩汝辱鄏`,ㄖㄨˊ:`侞儒嚅如嬬孺帤曘濡燸筎茹蒘蕠薷蝡蠕袽襦醹銣鴽`,ㄖㄨˋ:`入嗕媷洳溽縟蓐褥`,"ㄖㄨ˙ㄚˊ":`挼`,ㄖㄨㄛˊ:`捼`,ㄖㄨㄛˋ:`偌婼弱楉渃爇箬篛若蒻鄀鶸`,ㄖㄨㄟˇ:`橤繠蕊`,ㄖㄨㄟˊ:`婑桵緌蕤`,ㄖㄨㄟˋ:`叡枘汭瑞睿芮蚋銳`,ㄖㄨㄢˇ:`朊瓀礝緛耎軟阮`,ㄖㄨㄢˊ:`堧壖撋`,ㄖㄨㄣˋ:`橍潤閏`,ㄖㄨㄥˇ:`傇冗氄軵`,ㄖㄨㄥˊ:`媶嫆容嶸巆戎榕榮榵毧溶瀜烿熔爃狨瑢絨羢肜茙茸蓉融蠑褣鎔駥髶`,ㄗ:`咨姿孜孳崰嵫栥椔淄滋澬玆璾秶粢紎緇茲觜諮貲資趑輜鄑鈭錙鎡髭鯔鶅鼒齍`,ㄗˇ:`仔吇呰姊子杍梓滓矷秭笫籽紫耔胏訾訿釨`,ㄗˊ:`蓻`,ㄗˋ:`倳剚字恣漬牸眥胔胾自芓`,ㄗㄚ:`匝咂拶紮臢鉔`,ㄗㄚˇ:`咋`,ㄗㄚˊ:`偺喒囋砸磼雜雥`,ㄗㄜˊ:`則唶嘖幘擇樍澤矠笮簀舴蠌襗謮責賾迮鸅齰`,ㄗㄜˋ:`仄崱庂捑昃`,"ㄗㄜ˙":`伬`,ㄗㄞ:`哉栽渽災甾菑賳`,ㄗㄞˇ:`宰崽`,ㄗㄞˋ:`再在縡載酨`,ㄗㄟˊ:`蠈賊鯽`,ㄗㄠ:`傮糟蹧遭`,ㄗㄠˇ:`早棗澡璪繰藻蚤`,ㄗㄠˊ:`鑿`,ㄗㄠˋ:`喿噪慥灶煰燥皁皂簉譟趮躁造`,ㄗㄡ:`棷棸緅菆諏郰鄒鄹陬騶鯫黀齱齺`,ㄗㄡˇ:`走`,ㄗㄡˋ:`奏揍楱`,ㄗㄢ:`簪糌鐕`,ㄗㄢˇ:`儹噆寁揝攢昝趲`,ㄗㄢˊ:`咱`,ㄗㄢˋ:`暫灒瓚禶讚贊蹔酇鏨饡`,ㄗㄣˇ:`怎`,ㄗㄣˋ:`譖`,ㄗㄤ:`牂臧贓髒`,ㄗㄤˇ:`駔`,ㄗㄤˋ:`奘臟葬`,ㄗㄥ:`增憎橧璔矰磳繒罾鄫`,ㄗㄥˋ:`甑贈`,ㄗㄨ:`租菹葅蒩`,ㄗㄨˇ:`俎珇祖組詛阻靻`,ㄗㄨˊ:`傶卒哫崒族箤足踤踿鏃`,ㄗㄨㄛ:`嘬`,ㄗㄨㄛˇ:`佐左繓`,ㄗㄨㄛˊ:`捽昨椊琢稓筰莋`,ㄗㄨㄛˋ:`作侳做唑坐岝座怍祚胙葃葄酢阼`,ㄗㄨㄟ:`厜嗺朘纗`,ㄗㄨㄟˇ:`嘴噿嶊嶵璻`,ㄗㄨㄟˋ:`晬最檇檌祽絊罪蕞醉鋷`,ㄗㄨㄢ:`鑽`,ㄗㄨㄢˇ:`籫纂纘`,ㄗㄨㄢˋ:`攥`,ㄗㄨㄣ:`墫壿尊嶟樽繜遵鐏鱒鷷`,ㄗㄨㄣˇ:`僔噂撙譐`,ㄗㄨㄣˋ:`圳捘銌`,ㄗㄨㄥ:`倧宗嵕惾朡棕熧猣稯綜翪蝬豵蹤鍐騣鬃鬷`,ㄗㄨㄥˇ:`傯摠總蓗`,ㄗㄨㄥˋ:`昮瘲粽縱錝`,ㄘ:`偨呲疵縒蠀趀跐骴髊齹`,ㄘˇ:`佌此泚玼皉鮆`,ㄘˊ:`嬨慈柌濨瓷磁祠茈茨薋詞辭雌飺餈鶿`,ㄘˋ:`伺佽刺庛朿栨次絘茦莿蛓賜`,ㄘㄚ:`嚓擦攃`,ㄘㄚˇ:`礤礸`,ㄘㄚˋ:`囃`,ㄘㄜˋ:`側冊廁惻憡拺測畟策筴簎粣萴蓛`,ㄘㄞ:`偲猜`,ㄘㄞˇ:`啋婇寀彩採睬綵跴踩采`,ㄘㄞˊ:`才材纔裁財`,ㄘㄞˋ:`埰棌縩菜蔡`,ㄘㄠ:`操糙`,ㄘㄠˇ:`懆艸草騲`,ㄘㄠˊ:`嘈嶆曹槽漕艚螬`,ㄘㄠˋ:`肏襙鄵`,ㄘㄡˋ:`湊腠輳`,ㄘㄢ:`參嬠餐驂`,ㄘㄢˇ:`慘憯朁穇篸黲`,ㄘㄢˊ:`慚殘蚕蠶`,ㄘㄢˋ:`摻澯燦璨粲`,ㄘㄣ:`嵾`,ㄘㄣˊ:`岑涔笒`,ㄘㄤ:`倉傖嵢滄獊艙蒼鶬`,ㄘㄤˊ:`藏鑶`,ㄘㄥ:`噌`,ㄘㄥˊ:`層嶒曾驓`,ㄘㄥˋ:`蹭`,ㄘㄨ:`粗觕麤`,ㄘㄨˊ:`徂殂`,ㄘㄨˋ:`促噈憱猝瘯簇蔟踧蹙蹴醋顣鼀`,ㄘㄨㄛ:`搓撮瑳磋蹉遳醝`,ㄘㄨㄛˇ:`脞`,ㄘㄨㄛˊ:`嵯痤矬蒫蔖躦鹺`,ㄘㄨㄛˋ:`剉剒厝夎挫措斮棤莝蓌銼錯`,ㄘㄨㄟ:`催凗墔崔嶉慛摧榱磪縗鏙`,ㄘㄨㄟˇ:`漼璀趡`,ㄘㄨㄟˋ:`倅啐悴毳淬濢焠瘁竁粹綷翠脆脺膬膵萃`,ㄘㄨㄢ:`攛汆躥鋑`,ㄘㄨㄢˊ:`巑欑`,ㄘㄨㄢˋ:`爨竄篡`,ㄘㄨㄣ:`村皴踆`,ㄘㄨㄣˇ:`刌忖`,ㄘㄨㄣˊ:`存拵`,ㄘㄨㄣˋ:`吋寸籿`,ㄘㄨㄥ:`匆囪暰棇樅熜瑽璁瞛聰蓯蔥蟌鏦驄`,ㄘㄨㄥˊ:`叢婃孮徖從悰慒欉淙漎潀琮藂賨`,ㄘㄨㄥˋ:`謥`,ㄙ:`俬凘司嘶廝思撕斯楒榹泀澌磃禗禠私絲緦罳蕬虒蜤螄蟴鉰颸鷥鼶`,ㄙˇ:`死`,ㄙˋ:`似儩兕嗣四姒寺巳柶汜泗洍涘祀笥耜肂肆蕼覗貄鈶飼駟`,ㄙㄚ:`仨挲撒`,ㄙㄚˇ:`洒灑躠靸`,ㄙㄚˋ:`卅摋泧薩鈒隡颯馺`,ㄙㄜˋ:`嗇栜澀濇濏瑟璱穡色譅轖銫鏼飋`,ㄙㄞ:`塞揌毢毸腮鰓`,ㄙㄞˋ:`僿賽`,ㄙㄠ:`慅搔溞繅臊騷鱢`,ㄙㄠˇ:`嫂掃`,ㄙㄠˋ:`埽氉瘙矂`,ㄙㄡ:`嗖廋搜溲獀艘蒐鄋醙鎪颼颾餿騪`,ㄙㄡˇ:`叟嗾擻瞍籔藪`,ㄙㄡˋ:`嗽`,ㄙㄢ:`三毿鬖`,ㄙㄢˇ:`傘糝繖鏒鏾`,ㄙㄢˋ:`帴散閐`,ㄙㄣ:`森槮襂`,ㄙㄤ:`桑`,ㄙㄤˇ:`嗓搡磉褬鎟顙`,ㄙㄤˋ:`喪`,ㄙㄥ:`僧鬙`,ㄙㄨ:`囌櫯甦穌窣蘇酥`,ㄙㄨˊ:`俗`,ㄙㄨˋ:`傃僳嗉塑夙嫊宿愫愬憟梀榡樕橚泝洬涑溯潚玊簌粟素縤肅膆莤蔌藗觫訴謖蹜速鋉餗驌鱐鷫`,ㄙㄨㄛ:`傞唆嗍嗦娑摍桫梭簑縮羧莏蓑趖`,ㄙㄨㄛˇ:`嗩惢所溹瑣璅索鎈鎍鎖`,ㄙㄨㄛˋ:`逤`,ㄙㄨㄟ:`倠哸浽滖濉眭睢綏荽荾雖`,ㄙㄨㄟˇ:`瀡髓`,ㄙㄨㄟˊ:`隋隨`,ㄙㄨㄟˋ:`埣旞檖歲燧璲睟碎祟禭穗穟繀繐繸襚誶賥遂邃鐆鐩隧`,ㄙㄨㄢ:`狻痠酸`,ㄙㄨㄢˇ:`匴`,ㄙㄨㄢˋ:`筭算蒜`,ㄙㄨㄣ:`孫搎槂猻蓀蕵薞飧`,ㄙㄨㄣˇ:`損榫筍簨鎨隼`,ㄙㄨㄥ:`倯娀崧嵩忪松淞濍硹菘蜙鍶鬆`,ㄙㄨㄥˇ:`傱嵷悚愯慫竦聳駷`,ㄙㄨㄥˋ:`宋訟誦送頌`,ㄚ:`錒阿`,"ㄚ˙":`啊`,ㄛ:`喔噢`,ㄛˊ:`哦`,ㄜ:`婀屙痾`,ㄜˇ:`噁枙`,ㄜˊ:`俄吪囮娥峨涐珴皒睋莪蛾訛迗鋨額魤鵝`,ㄜˋ:`匎厄呃咢噩堊堨堮姶岋峉崿廅惡愕扼搤搹櫮歞砐砨萼蚅蝁詻諤豟軛軶遏遻鄂鍔鑩閼阨頞顎餓餩鱷鶚齃齶`,ㄞ:`哀哎唉噯埃娭挨溾`,ㄞˇ:`娾昹欸毐濭矮藹譪靄`,ㄞˊ:`啀捱敳溰癌皚騃`,ㄞˋ:`僾嗌壒嬡愛曖璦礙艾薆譺鑀閡隘靉餲鴱`,ㄟˊ:`誒`,ㄠ:`凹柪爊`,ㄠˇ:`媼芺襖镺`,ㄠˊ:`嗷廒摮敖滶熬獒璈磝翱聱蔜螯謷遨鏖隞鰲鼇`,ㄠˋ:`傲坳墺奡奧岰嶴懊扷拗擙澳薁鏊隩驁`,ㄡ:`櫙歐毆漚熰甌藲謳鏂鷗`,ㄡˇ:`偶吘嘔耦腢蕅藕`,ㄡˊ:`齵`,ㄡˋ:`慪`,ㄢ:`侒垵媕安峖庵桉氨痷盦腤菴萻諳鞍韽馣鵪`,ㄢˇ:`俺唵銨`,ㄢˊ:`儑啽玵雸`,ㄢˋ:`婩岸按晻暗案洝犴胺荌豻錌闇黯`,ㄣ:`奀恩`,ㄣˇ:`峎`,ㄣˋ:`摁`,ㄤ:`肮骯`,ㄤˊ:`卬昂`,ㄤˋ:`盎醠`,ㄥ:`鞥`,ㄦˇ:`尒栮毦洱爾珥耳薾邇餌駬`,ㄦˊ:`侕儿兒唲峏栭洏而聏胹荋輀陑鮞鴯`,ㄦˋ:`二刵咡樲衈貳鉺`,ㄧ:`一伊依咿噫壹嫛揖檹毉洢漪猗瑿禕稦繄蛜衣郼醫銥鷖黟黳`,ㄧˇ:`乙以佁倚偯崺已扆敼旖椅檥矣礒艤苡螘蟻踦轙酏釔鉯顗鳦齮`,ㄧˊ:`侇儀匜咦圯夷姨媐宜宧寲峓嶬嶷彝怡恞拸暆柂栘桋椸沂沶熪狋珆瓵疑痍眙移箷簃羠耛胰萓蛦螔衪袘觺訑詑詒誃謻貤貽跠迆迤迻遺鏔頤顊飴鸃`,ㄧˋ:`乂亄亦伿佚佾俋億刈劓劮勩唈囈圛垼埶埸墿奕嫕寱屹嶧帟帠廙异弈弋役悒意憶懌懿抑挹掜斁易晹曀杙枍枻栺槸檍欥欭殔殪毅泆浂浥溢潩澺瀷焲熠熤熼燚燡燱玴異疫瘞瘱益睪縊繶繹羛義羿翊翌翳翼耴肄肊膉臆艗芅蓺薏藙藝蘙蜴衵裔裛襼詍詣誼譯議豷賹贀跇軼逸邑醳醷釴鎰鐿陭隿霬靾饐驛鮨鶂鷁鷊鷾黓齸`,ㄧㄚ:`丫埡壓孲押枒椏錏鴉鴨`,ㄧㄚˇ:`厊啞庌蕥雅`,ㄧㄚˊ:`伢堐岈涯牙玡琊睚芽蚜衙齖`,ㄧㄚˋ:`亞圔圠婭掗揠氬犽猰砑窫聐襾訝軋迓齾`,"ㄧㄚ˙":`呀`,ㄧㄛ:`唷喲`,ㄧㄝ:`噎掖暍椰蠮`,ㄧㄝˇ:`也冶埜漜野`,ㄧㄝˊ:`揶擨爺耶`,ㄧㄝˋ:`夜嶪抴捙擛擫曄曳業歋殗液澲燁瞱腋葉謁鄴鍱鎑鐷靨頁饁`,ㄧㄞˊ:`崖`,ㄧㄠ:`吆喓夭妖殀祅腰葽訞邀`,ㄧㄠˇ:`偠咬宎岆抭杳柼榚溔眑窅窈舀苭蓔騕鴢鷕`,ㄧㄠˊ:`傜嗂垚堯姚媱嶢徭愮搖摿榣烑爻猺珧瑤窯繇肴謠軺遙銚顤颻餚鰩`,ㄧㄠˋ:`曜燿獟穾窔筄耀艞葯藥袎要覞詏鑰靿鷂`,ㄧㄡ:`优優呦嚘幽怮悠憂攸櫌泑瀀纋耰逌鄾麀`,ㄧㄡˇ:`卣友庮懮有栯槱牖羑聈苃莠酉銪黝`,ㄧㄡˊ:`偤尤斿楢沋油浟游猶猷由疣秞蕕蚰蝣訧輶遊郵鈾魷`,ㄧㄡˋ:`佑侑又右囿姷宥峟幼柚牰狖祐蚴誘貁迶釉鼬`,"ㄧㄡ˙":`蒏`,ㄧㄢ:`偣嫣嬮崦懨淊淹湮漹焉煙珚胭腌臙菸鄢醃閹黫`,ㄧㄢˇ:`偃儼兗匽厴噞奄嵃巘弇愝戭扊抁掩揜曮棪椼沇渰演琰甗眼縯罨萒蝘衍裺褗躽郾酓隒顩魘鰋鶠黤黭黶鼴齞齴龑`,ㄧㄢˊ:`嚴壛壧妍娮孍岩嵒巖延揅楌檐沿炎狿研碞礹筵簷綖芫莚虤蜒言郔閆閻顏鹽`,ㄧㄢˋ:`傿厭咽唁喭嚥堰姲嬿宴彥掞敥晏曣椻溎灩烻焰焱燄燕爓牪猒硯艷觾諺讌讞豔贗酀醼釅雁饜騴驗驠鬳鴈鴳鷃鷰`,ㄧㄣ:`凐喑噾因垔堙姻愔慇歅殷氤洇瘖禋絪茵蒑蔭裀諲銦闉陰霒霠音韾駰`,ㄧㄣˇ:`尹引朄檃濦癮蘟蚓螾讔趛輑鈏隱靷飲`,ㄧㄣˊ:`冘吟嚚圁垠夤婬寅崟檭殥淫烎狺硍苂荶蔩蟫誾鄞銀霪鷣齗`,ㄧㄣˋ:`印垽堷廕憖湚猌窨胤酳`,"ㄧㄣ˙":`粌`,ㄧㄤ:`央姎抰殃泱秧胦鉠雵鞅鴦`,ㄧㄤˇ:`仰佒坱岟懩攁柍氧炴痒癢紻蝆軮養`,ㄧㄤˊ:`佯垟崵崸徉揚昜暘楊洋烊煬珜瘍眻禓羊蛘鍚鐊陽颺鸉`,ㄧㄤˋ:`怏恙樣漾瀁羕`,ㄧㄥ:`偀嚶嫈嬰應攖朠櫻渶煐瑛瓔甇甖碤礯纓罃罌膺英蘡蝧蠳褮譻賏霙韺鶧鶯鷹鸚`,ㄧㄥˇ:`廮影摬梬浧潁癭矨穎郢`,ㄧㄥˊ:`塋嬴攍楹濴瀅瀛瀠瀯瀴熒營瑩盈籯縈藀螢蠅覮謍贏迎鎣`,ㄧㄥˋ:`媵映硬鱦`,ㄨ:`剭嗚圬屋巫杇歍汙污洿烏窏螐誣鄔鎢鴮`,ㄨˇ:`五仵伍侮俉倵午啎嫵廡忤憮捂摀橆武潕牾玝甒碔舞躌迕鵡`,ㄨˊ:`吳吾唔峿梧毋洖浯無珸莁蕪蜈譕郚鯃鷡鼯`,ㄨˋ:`兀務勿卼塢婺寤屼岉嵨悟戊扤晤杌焐物痦矹粅芴蘁誤逜鋈阢雺霧靰騖鶩齀`,ㄨㄚ:`媧挖洼溛漥穵窊窪蛙`,ㄨㄚˇ:`佤瓦`,ㄨㄚˊ:`娃`,ㄨㄚˋ:`嗢膃襪`,"ㄨㄚ˙":`哇`,ㄨㄛ:`倭撾渦猧窩萵踒`,ㄨㄛˇ:`婐我捰`,ㄨㄛˋ:`仴偓幄握擭斡沃涴渥濣焥瓁瞃硪腛臒臥雘齷`,ㄨㄞ:`喎歪`,ㄨㄞˇ:`崴`,ㄨㄞˋ:`外`,ㄨㄟ:`偎威巍愄揋椳渨溦烓煨燰葨葳薇蜲蝛覣詴逶隇隈`,ㄨㄟˇ:`亹偉偽儰壝委娓寪尾崣廆徫撱斖暐椲洧浘濻瀢煒猥瑋痏痿磈緯腲艉芛萎葦蒍薳諉踓鍡隗韙韡頠骫鮪`,ㄨㄟˊ:`危唯喡囗圍圩峗峞嵬帷幃微惟桅欈洈湋溈潿濰犩癓磑維蓶覹違鄬醀鍏闈霺韋鮠`,ㄨㄟˋ:`位味喂媦尉慰未渭為煟犚畏碨罻胃菋蔚藯蘶蜼蝟衛褽謂讆躗鏏霨餧餵饖魏鮇`,ㄨㄢ:`剜婠彎潫灣蜿豌`,ㄨㄢˇ:`倇婉宛惋挽晚晥晼琬畹皖睕碗綩綰脘菀踠輓`,ㄨㄢˊ:`丸刓完岏抏捖汍烷玩紈翫芄頑`,ㄨㄢˋ:`万卍忨捥澫瞣脕腕萬薍蟃輐鋄`,ㄨㄣ:`塭殟溫瘟豱轀`,ㄨㄣˇ:`刎吻呡抆桽穩紊`,ㄨㄣˊ:`文炆玟紋聞芠蚊閺閿闅雯駇魰鳼鼤`,ㄨㄣˋ:`問妏搵汶璺顐`,ㄨㄤ:`尢尪汪`,ㄨㄤˇ:`往惘暀枉瀇網网罔菵輞魍`,ㄨㄤˊ:`亡王莣`,ㄨㄤˋ:`妄忘旺望朢盳迋`,ㄨㄥ:`嗡滃翁螉鶲`,ㄨㄥˇ:`塕暡瞈聬蓊`,ㄨㄥˋ:`瓮甕罋蕹齆`,ㄩ:`唹扜淤瘀盓穻箊紆迂陓`,ㄩˇ:`与予俁偊傴噳圄圉宇寙嶼庾敔斔斞楀瑀瘐祤禹窳羽與萭蘌語貐鄅鋙雨頨麌齬`,ㄩˊ:`于余俞堣堬妤娛崳嵎愉愚揄於旟杅楰榆歈歟歶渝湡漁澞牏狳玗瑜璵盂睮硢禺窬竽籅羭腴臾舁艅萸蕍蘛虞蝓螸衧褕覦諛謣踰輿逾邘隅雓雩餘魚鮽鰅鸆`,ㄩˋ:`儥喻噊域堉嫗寓峪彧御悆愈慾戫昱棜棫欲毓浴淢淯潏澦灪煜燏燠爩獄玉瘉癒矞砡礜禦稢篽籲緎繘罭聿育芋蒮蓹蕷蜮袬裕諭譽豫軉輍轝遇遹郁醧鈺鋊錥閾預飫饇馭驈鬱鬻魊鱊鳿鴥鵒鷸鸒`,ㄩㄝ:`曰矱箹約`,ㄩㄝˋ:`刖岳嶽悅戉抈月樾瀹爚玥礿禴籥粵蘥蚎越躍軏鈅鉞閱鸑鸙黦龠`,ㄩㄢ:`冤嬽悁惌棩淵灁眢葾蒬蜎蜵裷駌鳶鴛鵷鼘`,ㄩㄢˇ:`遠鋺`,ㄩㄢˊ:`元原員園圓垣妧媴嫄援杬榞榬櫞沅湲源溒爰猿獂笎緣羱蒝蚖蝝蝯螈袁謜轅邍邧鎱騵鶢黿`,ㄩㄢˋ:`噮垸夗妴媛怨愿掾瑗禐肙苑裫褑院願`,ㄩㄣ:`奫暈氳蝹贇頵馧`,ㄩㄣˇ:`允抎殞狁荺褞賱鈗阭隕霣馻齫`,ㄩㄣˊ:`云伝勻妘昀沄溳澐熉畇眃筠篔紜縜耘芸蕓鄖鋆雲`,ㄩㄣˋ:`孕惲慍枟熅熨緷縕薀蘊運鄆醞韗韞韻餫`,ㄩㄥ:`佣傭嗈噰墉壅嫞庸廱慵擁槦滽澭灉癰臃邕郺鄘鏞雍雝饔鷛`,ㄩㄥˇ:`俑傛勇埇塎嵱恿悀永泳涌湧甬禜蛹詠踊踴`,ㄩㄥˊ:`喁揘顒鰫`,ㄩㄥˋ:`用醟`},zr={五柳先生傳:`ㄨˇ ㄌㄧㄡˇ ㄒㄧㄢ ㄕㄥ ㄓㄨㄢˋ`,史傳:`ㄕˇ ㄓㄨㄢˋ`,立傳:`ㄌㄧˋ ㄓㄨㄢˋ`,傳記:`ㄓㄨㄢˋ ㄐㄧˋ`,自傳:`ㄗˋ ㄓㄨㄢˋ`,好讀書:`ㄏㄠˋ ㄉㄨˊ ㄕㄨ`,嗜好:`ㄕˋ ㄏㄠˋ`,愛好:`ㄞˋ ㄏㄠˋ`,好奇:`ㄏㄠˋ ㄑㄧˊ`,不求甚解:`ㄅㄨˋ ㄑㄧㄡˊ ㄕㄣˋ ㄐㄧㄝˇ`,曾不吝情:`ㄗㄥ ㄅㄨˋ ㄌㄧㄣˋ ㄑㄧㄥˊ`,帶月荷鋤歸:`ㄉㄞˋ ㄩㄝˋ ㄏㄜˋ ㄔㄨˊ ㄍㄨㄟ`,荷鋤:`ㄏㄜˋ ㄔㄨˊ`,脈脈不得語:`ㄇㄛˋ ㄇㄛˋ ㄅㄨˋ ㄉㄜˊ ㄩˇ`,音樂:`ㄧㄣ ㄩㄝˋ`,樂器:`ㄩㄝˋ ㄑㄧˋ`,樂曲:`ㄩㄝˋ ㄑㄩˇ`,快樂:`ㄎㄨㄞˋ ㄌㄜˋ`,安貧樂道:`ㄢ ㄆㄧㄣˊ ㄌㄜˋ ㄉㄠˋ`,以樂其志:`ㄧˇ ㄌㄜˋ ㄑㄧˊ ㄓˋ`,銀行:`ㄧㄣˊ ㄏㄤˊ`,行業:`ㄏㄤˊ ㄧㄝˋ`,同行:`ㄊㄨㄥˊ ㄏㄤˊ`,行走:`ㄒㄧㄥˊ ㄗㄡˇ`,進行:`ㄐㄧㄣˋ ㄒㄧㄥˊ`,睡覺:`ㄕㄨㄟˋ ㄐㄧㄠˋ`,午覺:`ㄨˇ ㄐㄧㄠˋ`,發覺:`ㄈㄚ ㄐㄩㄝˊ`,感覺:`ㄍㄢˇ ㄐㄩㄝˊ`,視覺:`ㄕˋ ㄐㄩㄝˊ`,聽覺:`ㄊㄧㄥ ㄐㄩㄝˊ`,長大:`ㄓㄤˇ ㄉㄚˋ`,成長:`ㄔㄥˊ ㄓㄤˇ`,生長:`ㄕㄥ ㄓㄤˇ`,師長:`ㄕ ㄓㄤˇ`,校長:`ㄒㄧㄠˋ ㄓㄤˇ`,村長:`ㄘㄨㄣ ㄓㄤˇ`,長度:`ㄔㄤˊ ㄉㄨˋ`,長短:`ㄔㄤˊ ㄉㄨㄢˇ`,漫長:`ㄇㄢˋ ㄔㄤˊ`,長城:`ㄔㄤˊ ㄔㄥˊ`,長江:`ㄔㄤˊ ㄐㄧㄤ`,看著:`ㄎㄢˋ ㄓㄜ˙`,聽著:`ㄊㄧㄥ ㄓㄜ˙`,走著:`ㄗㄡˇ ㄓㄜ˙`,順著:`ㄕㄨㄣˋ ㄓㄜ˙`,沿著:`ㄧㄢˊ ㄓㄜ˙`,隨著:`ㄙㄨㄟˊ ㄓㄜ˙`,代表著:`ㄉㄞˋ ㄅㄧㄠˇ ㄓㄜ˙`,藏著:`ㄘㄤˊ ㄓㄜ˙`,連著:`ㄌㄧㄢˊ ㄓㄜ˙`,過著:`ㄍㄨㄛˋ ㄓㄜ˙`,拿著:`ㄋㄚˊ ㄓㄜ˙`,帶著:`ㄉㄞˋ ㄓㄜ˙`,笑著:`ㄒㄧㄠˋ ㄓㄜ˙`,站著:`ㄓㄢˋ ㄓㄜ˙`,坐著:`ㄗㄨㄛˋ ㄓㄜ˙`,著急:`ㄓㄠˊ ㄐㄧˊ`,睡著:`ㄕㄨㄟˋ ㄓㄠˊ`,著作:`ㄓㄨˋ ㄗㄨㄛˋ`,著名:`ㄓㄨˋ ㄇㄧㄥˊ`,常著文章:`ㄔㄤˊ ㄓㄨˋ ㄨㄣˊ ㄓㄤ`,了解:`ㄌㄧㄠˇ ㄐㄧㄝˇ`,明瞭:`ㄇㄧㄥˊ ㄌㄧㄠˇ`,受不了:`ㄕㄡˋ ㄅㄨˋ ㄌㄧㄠˇ`,還給:`ㄏㄨㄢˊ ㄍㄟˇ`,歸還:`ㄍㄨㄟ ㄏㄨㄢˊ`,返還:`ㄈㄢˇ ㄏㄨㄢˊ`,生還:`ㄕㄥ ㄏㄨㄢˊ`,還有:`ㄏㄞˊ ㄧㄡˇ`,還是:`ㄏㄞˊ ㄕˋ`,數星星:`ㄕㄨˇ ㄒㄧㄥ ㄒㄧㄥ`,數一數:`ㄕㄨˇ ㄧ ㄕㄨˇ`,數不清:`ㄕㄨˇ ㄅㄨˋ ㄑㄧㄥ`,數量:`ㄕㄨˋ ㄌㄧㄤˋ`,數學:`ㄕㄨˋ ㄒㄩㄝˊ`,數字:`ㄕㄨˋ ㄗˋ`,重要:`ㄓㄨㄥˋ ㄧㄠˋ`,重量:`ㄓㄨㄥˋ ㄌㄧㄤˋ`,重點:`ㄓㄨㄥˋ ㄉㄧㄢˇ`,重複:`ㄔㄨㄥˊ ㄈㄨˋ`,重新:`ㄔㄨㄥˊ ㄒㄧㄣ`,重疊:`ㄔㄨㄥˊ ㄉㄧㄝˊ`,重陽:`ㄔㄨㄥˊ ㄧㄤˊ`,方便:`ㄈㄤ ㄅㄧㄢˋ`,便宜:`ㄆㄧㄢˊ ㄧˊ`,大便:`ㄉㄚˋ ㄅㄧㄢˋ`,小便:`ㄒㄧㄠˇ ㄅㄧㄢˋ`,便欣然忘食:`ㄅㄧㄢˋ ㄒㄧㄣ ㄖㄢˊ ㄨㄤˋ ㄕˊ`,垃圾:`ㄌㄜˋ ㄙㄜˋ`},Br=null;function Vr(){if(Br)return Br;Br=new Map;for(let[e,t]of Object.entries(Rr))for(let n of t)Br.set(n,e);return Br}var Hr=Object.keys(zr).sort((e,t)=>t.length-e.length);function Ur(e){return Vr().get(e)}function Wr(e){let t=Array(e.length),n=Vr(),r=0;for(;r<e.length;){let i=!1;for(let a of Hr)if(e.startsWith(a,r)){let e=zr[a].split(/\s+/);for(let i=0;i<a.length;i++)t[r+i]=e[i]??n.get(a[i]);r+=a.length,i=!0;break}i||(t[r]=n.get(e[r]),r+=1)}return t}var Gr=e=>e.map(e=>e.text).join(``),Kr=e=>Gr(e).length,qr=e=>!e.text&&!!e.footnoteRef;function Jr(e,t){return e.ruby||t.ruby?!1:!!e.bold==!!t.bold&&!!e.underline==!!t.underline&&!!e.strike==!!t.strike&&!!e.overline==!!t.overline&&!!e.masked==!!t.masked&&!!e.keyword==!!t.keyword&&Yr(e.color)===Yr(t.color)&&(e.fontFamily??void 0)===(t.fontFamily??void 0)&&(e.popupId??void 0)===(t.popupId??void 0)&&(e.noteId??void 0)===(t.noteId??void 0)&&e.href===t.href&&e.footnoteRef===t.footnoteRef}var Yr=e=>e&&e!=="default"?e:void 0;function Xr(e,t,n,r){return t>=n?e:ti(e,t,n,ei(e,t,n).map(e=>{let t={...e};for(let e of Object.keys(r)){let n=r[e];n===void 0||n===!1||n==="default"||n===``?delete t[e]:t[e]=n}return t}))}function Zr(e){let t=!1;for(let n of e)if(!(qr(n)||!n.text)){if(n.ruby){t=!0;continue}for(let e of n.text)if(Ur(e))return!1}return t}function Qr(e,t,n){if(t>=n)return e;let r=ei(e,t,n);if(Zr(r))return Xr(e,t,n,{ruby:void 0});let i=Wr(Gr(e)),a=[],o=t,s=!1;for(let e of r){if(qr(e)){a.push({...e});continue}if(e.ruby){a.push({...e}),o+=e.text.length;continue}for(let t=0;t<e.text.length;t++){let n=e.text[t],r=i[o+t],c=t===e.text.length-1,l={...e,text:n};!c&&l.footnoteRef&&delete l.footnoteRef,r&&(l.ruby=r,s=!0),a.push(l)}o+=e.text.length}return s?ti(e,t,n,a):e}function $r(e){let t=[];for(let n of e){if(qr(n)){t.push({...n});continue}if(!n.text)continue;let e=t[t.length-1];e&&Jr(e,n)?e.text+=n.text:t.push({...n})}return t}function ei(e,t,n){let r=[],i=0;for(let a of e){let e=i,o=i+a.text.length;if(i=o,qr(a)){e>t&&e<=n&&r.push({...a});continue}if(o<=t)continue;if(e>=n)break;let s=Math.max(t,e)-e,c=Math.min(n,o)-e,l=a.text.slice(s,c);if(!l)continue;if(s===0&&c===a.text.length){r.push({...a,text:l});continue}let u={...a,text:l};a.ruby&&(u.ruby=void 0),a.footnoteRef&&c!==a.text.length&&(u.footnoteRef=void 0),r.push(u)}return $r(r)}function ti(e,t,n,r){let i=Kr(e),a=ei(e,0,t),o=ei(e,n,i),s=$r([...a,...r,...o]);return s.length>0?s:[{text:``}]}var ni=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),ri=e=>`<sup data-fn="${ni(e)}" contenteditable="false">${ni(e)}</sup>`,ii=new Set([`accent`,`secondary`]),ai=e=>/^(#[0-9a-f]{3,8}|[a-z]+|rgba?\([\d\s.,%/]+\)|hsla?\([\d\s.,%/deg]+\))$/i.test(e),oi=e=>/^[^;{}<>\\]+$/.test(e),si=`ˊˇˋ`;function ci(e){let t=e.includes(`˙`),n=e.replace(`˙`,``),r=n.slice(-1),i=si.includes(r)?r:``,a=i?n.slice(0,-1):n,o=(t?`˙`:``)+a;return`<rt${Array.from(a).length===1?` data-one`:``}><span data-zy>${ni(o)}</span>${i?`<span data-tone>${ni(i)}</span>`:``}</rt>`}var li=e=>e.text&&(e.noteId||e.popupId)?`${e.noteId??``}|${e.popupId??``}`:``;function ui(e){let t=``;for(let n=0;n<e.length;){let r=li(e[n]);if(!r){t+=di(e[n]),n+=1;continue}let i=n;for(;i<e.length&&li(e[i])===r;)i+=1;let a=e[n],o=[];a.popupId&&o.push(`data-pop="${ni(a.popupId)}"`),a.noteId&&o.push(`data-note="${ni(a.noteId)}"`),a.fontFamily&&oi(a.fontFamily)&&o.push(`data-font="${ni(a.fontFamily)}"`,`style="${ni(`font-family:${a.fontFamily}`)}"`),t+=`<span ${o.join(` `)}>${e.slice(n,i).map(e=>di(e,!1)).join(``)}</span>`,n=i}return t}function di(e,t=!0){let n=e.footnoteRef?ri(e.footnoteRef):``;if(!e.text)return n;let r=[],i=[];if(e.keyword&&r.push(`data-kw="1"`),e.bold&&r.push(`data-bold="1"`),e.underline&&r.push(`data-u="1"`),e.strike&&r.push(`data-s="1"`),e.overline&&r.push(`data-o="1"`),e.masked&&r.push(`data-mask="1"`),e.color&&e.color!=="default"&&ai(e.color)&&(r.push(`data-color="${ni(e.color)}"`),ii.has(e.color)||i.push(`color:${e.color}`)),e.fontFamily&&oi(e.fontFamily)&&(r.push(`data-font="${ni(e.fontFamily)}"`),i.push(`font-family:${e.fontFamily}`)),t&&e.popupId&&r.push(`data-pop="${ni(e.popupId)}"`),t&&e.noteId&&r.push(`data-note="${ni(e.noteId)}"`),e.href&&r.push(`data-href="${ni(e.href)}"`),i.length>0&&r.push(`style="${ni(i.join(`;`))}"`),e.ruby){let t=r.length>0?` ${r.join(` `)}`:``;return`<ruby data-ruby="${ni(e.ruby)}" contenteditable="false"${t}>${ni(e.text)}${ci(e.ruby)}</ruby>${n}`}let a=ni(e.text);return(r.length>0?`<span ${r.join(` `)}>${a}</span>`:a)+n}function fi(e){let t=[],n=e=>{if(!e.text)return;let n=t[t.length-1];if(n&&Jr(n,e)){n.text+=e.text;return}t.push(e)},r=(e,n)=>{let r=t[t.length-1];r&&r.text&&!r.footnoteRef&&!r.ruby?r.footnoteRef=e:t.push({...n,text:``,footnoteRef:e})},i=(e,t)=>{if(e.nodeType===Node.TEXT_NODE){n({...t,text:e.textContent??``});return}if(e.nodeType!==Node.ELEMENT_NODE)return;let a=e;if(a.dataset.fn){r(a.dataset.fn,t);return}if(a.tagName===`RUBY`){let e=a.dataset.ruby??a.querySelector(`rt`)?.textContent??``,r=Array.from(a.childNodes).filter(e=>e.nodeName!==`RT`).map(e=>e.textContent??``).join(``),i={...t};a.dataset.kw&&(i.keyword=!0),a.dataset.bold&&(i.bold=!0),a.dataset.u&&(i.underline=!0),a.dataset.s&&(i.strike=!0),a.dataset.o&&(i.overline=!0),a.dataset.mask&&(i.masked=!0),a.dataset.color&&(i.color=a.dataset.color),a.dataset.font&&(i.fontFamily=a.dataset.font),a.dataset.pop&&(i.popupId=a.dataset.pop),a.dataset.note&&(i.noteId=a.dataset.note),a.dataset.href&&(i.href=a.dataset.href),n({...i,text:r,ruby:e});return}if(a.tagName===`RT`)return;let o={...t};a.dataset.kw&&(o.keyword=!0),(a.dataset.bold||a.tagName===`B`||a.tagName===`STRONG`)&&(o.bold=!0),(a.dataset.u||a.tagName===`U`)&&(o.underline=!0),(a.dataset.s||a.tagName===`S`||a.tagName===`STRIKE`||a.tagName===`DEL`)&&(o.strike=!0),a.dataset.o&&(o.overline=!0),a.dataset.mask&&(o.masked=!0),a.dataset.color&&(o.color=a.dataset.color),a.dataset.font&&(o.fontFamily=a.dataset.font),a.dataset.pop&&(o.popupId=a.dataset.pop),a.dataset.note&&(o.noteId=a.dataset.note),a.dataset.href&&(o.href=a.dataset.href);for(let e of Array.from(a.childNodes))i(e,o)};for(let t of Array.from(e.childNodes))i(t,{});return t.length>0?t:[{text:``}]}var pi=m(),mi={"alert-circle":`<circle cx="12" cy="12" r="10" /> <line x1="12" x2="12" y1="8" y2="12" /> <line x1="12" x2="12.01" y1="16" y2="16" />`,"align-center":`<path d="M21 6H3" /> <path d="M17 12H7" /> <path d="M19 18H5" />`,"align-justify":`<path d="M3 6h18" /> <path d="M3 12h18" /> <path d="M3 18h18" />`,"align-left":`<path d="M21 6H3" /> <path d="M15 12H3" /> <path d="M17 18H3" />`,"align-right":`<path d="M21 6H3" /> <path d="M21 12H9" /> <path d="M21 18H7" />`,archive:`<rect width="20" height="5" x="2" y="3" rx="1" /> <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /> <path d="M10 12h4" />`,"arrow-down":`<path d="M12 5v14" /> <path d="m19 12-7 7-7-7" />`,"arrow-left":`<path d="m12 19-7-7 7-7" /> <path d="M19 12H5" />`,"arrow-right":`<path d="M5 12h14" /> <path d="m12 5 7 7-7 7" />`,"arrow-up-right":`<path d="M7 7h10v10" /> <path d="M7 17 17 7" />`,"arrow-up":`<path d="m5 12 7-7 7 7" /> <path d="M12 19V5" />`,asterisk:`<path d="M12 6v12" /> <path d="M17.196 9 6.804 15" /> <path d="m6.804 9 10.392 6" />`,blocks:`<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" /> <rect x="14" y="2" width="8" height="8" rx="1" />`,bold:`<path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />`,book:`<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />`,bookmark:`<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />`,bot:`<path d="M12 8V4H8" /> <rect width="16" height="12" x="4" y="8" rx="2" /> <path d="M2 14h2" /> <path d="M20 14h2" /> <path d="M15 13v2" /> <path d="M9 13v2" />`,check:`<path d="M20 6 9 17l-5-5" />`,"chevron-down":`<path d="m6 9 6 6 6-6" />`,"chevron-left":`<path d="m15 18-6-6 6-6" />`,"chevron-right":`<path d="m9 18 6-6-6-6" />`,"chevron-up":`<path d="m18 15-6-6-6 6" />`,"circle-x":`<circle cx="12" cy="12" r="10" /> <path d="m15 9-6 6" /> <path d="m9 9 6 6" />`,compass:`<circle cx="12" cy="12" r="10" /> <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z" />`,copy:`<rect width="14" height="14" x="8" y="8" rx="2" ry="2" /> <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />`,"corner-up-left":`<path d="M9 14 4 9l5-5" /> <path d="M20 20v-7a4 4 0 0 0-4-4H4" />`,"corner-up-right":`<path d="m15 14 5-5-5-5" /> <path d="M4 20v-7a4 4 0 0 1 4-4h12" />`,crop:`<path d="M6 2v14a2 2 0 0 0 2 2h14" /> <path d="M18 22V8a2 2 0 0 0-2-2H2" />`,diff:`<path d="M12 3v14" /> <path d="M5 10h14" /> <path d="M5 21h14" />`,eraser:`<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" /> <path d="M22 21H7" /> <path d="m5 11 9 9" />`,"external-link":`<path d="M15 3h6v6" /> <path d="M10 14 21 3" /> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />`,"eye-off":`<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /> <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /> <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /> <path d="m2 2 20 20" />`,eye:`<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /> <circle cx="12" cy="12" r="3" />`,"file-text":`<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /> <path d="M14 2v5a1 1 0 0 0 1 1h5" /> <path d="M10 9H8" /> <path d="M16 13H8" /> <path d="M16 17H8" />`,ghost:`<path d="M9 10h.01" /> <path d="M15 10h.01" /> <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />`,globe:`<circle cx="12" cy="12" r="10" /> <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /> <path d="M2 12h20" />`,grip:`<circle cx="9" cy="12" r="1" /> <circle cx="9" cy="5" r="1" /> <circle cx="9" cy="19" r="1" /> <circle cx="15" cy="12" r="1" /> <circle cx="15" cy="5" r="1" /> <circle cx="15" cy="19" r="1" />`,highlighter:`<path d="m9 11-6 6v3h9l3-3" /> <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />`,home:`<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /> <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />`,image:`<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /> <circle cx="9" cy="9" r="2" /> <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />`,info:`<circle cx="12" cy="12" r="10" /> <path d="M12 16v-4" /> <path d="M12 8h.01" />`,library:`<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16" /> <path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2" /> <circle cx="13" cy="7" r="1" fill="currentColor" /> <rect x="8" y="2" width="14" height="14" rx="2" />`,"line-height-vertical":`<path d="M6 18h12" /> <path d="m8 16-2 2 2 2" /> <path d="m16 16 2 2-2 2" /> <path d="M7 4v8" /> <path d="M12 4v8" /> <path d="M17 4v8" />`,"line-height":`<path d="M6 6v12" /> <path d="m4 8 2-2 2 2" /> <path d="m4 16 2 2 2-2" /> <path d="M12 7h8" /> <path d="M12 12h8" /> <path d="M12 17h8" />`,link:`<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /> <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />`,"list-checks":`<path d="m3 17 2 2 4-4" /> <path d="m3 7 2 2 4-4" /> <path d="M13 6h8" /> <path d="M13 12h8" /> <path d="M13 18h8" />`,loader:`<path d="M21 12a9 9 0 1 1-6.219-8.56" />`,maximize:`<path d="M8 3H5a2 2 0 0 0-2 2v3" /> <path d="M21 8V5a2 2 0 0 0-2-2h-3" /> <path d="M3 16v3a2 2 0 0 0 2 2h3" /> <path d="M16 21h3a2 2 0 0 0 2-2v-3" />`,menu:`<path d="M4 5h16" /> <path d="M4 12h16" /> <path d="M4 19h16" />`,minus:`<path d="M5 12h14" />`,"more-horizontal":`<circle cx="12" cy="12" r="1" /> <circle cx="19" cy="12" r="1" /> <circle cx="5" cy="12" r="1" />`,"more-vertical":`<circle cx="12" cy="12" r="1" /> <circle cx="12" cy="5" r="1" /> <circle cx="12" cy="19" r="1" />`,music:`<path d="M9 18V5l12-2v13" /> <circle cx="6" cy="18" r="3" /> <circle cx="18" cy="16" r="3" />`,orbit:`<circle cx="12" cy="12" r="3" /> <circle cx="19" cy="5" r="2" /> <circle cx="5" cy="19" r="2" /> <path d="M10.4 21.9a10 10 0 0 0 9.941-15.416" /> <path d="M13.5 2.1a10 10 0 0 0-9.841 15.416" />`,overline:`<line x1="3" x2="21" y1="4" y2="4" /> <path d="M3 20 7 8l4 12" /> <path d="M4.5 16h5" /> <path d="M14 8v12h3.75a3.25 3.25 0 0 0 0-6.5H14" /> <path d="M14 13.5h3a2.75 2.75 0 0 0 0-5.5h-3" />`,"page-break":`<path d="m16 16-4 4-4-4" /> <path d="M3 12h18" /> <path d="m8 8 4-4 4 4" />`,palette:`<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /> <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /> <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /> <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /> <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />`,pause:`<rect x="14" y="4" width="4" height="16" rx="1" /> <rect x="6" y="4" width="4" height="16" rx="1" />`,pencil:`<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /> <path d="m15 5 4 4" />`,play:`<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />`,plus:`<path d="M5 12h14" /> <path d="M12 5v14" />`,popup:`<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />`,presentation:`<path d="M2 3h20" /> <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /> <path d="m7 21 5-5 5 5" />`,puzzle:`<path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z" />`,redo:`<path d="m15 14 5-5-5-5" /> <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />`,save:`<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /> <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" /> <path d="M7 3v4a1 1 0 0 0 1 1h7" />`,search:`<path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" />`,send:`<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /> <path d="m21.854 2.147-10.94 10.939" />`,settings:`<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /> <circle cx="12" cy="12" r="3" />`,shapes:`<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" /> <rect x="3" y="14" width="7" height="7" rx="1" /> <circle cx="17.5" cy="17.5" r="3.5" />`,share:`<circle cx="18" cy="5" r="3" /> <circle cx="6" cy="12" r="3" /> <circle cx="18" cy="19" r="3" /> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />`,sparkles:`<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /> <path d="M20 3v4" /> <path d="M22 5h-4" /> <path d="M4 17v2" /> <path d="M5 18H3" />`,sticker:`<path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" /> <path d="M14 3v4a2 2 0 0 0 2 2h4" /> <path d="M8 13h.01" /> <path d="M16 13h.01" /> <path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1" />`,"sticky-note":`<path d="M16 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V9Z" /> <path d="M15 3v4a2 2 0 0 0 2 2h4" />`,strikethrough:`<path d="M16 4H9a3 3 0 0 0-2.83 4" /> <path d="M14 12a4 4 0 0 1 0 8H6" /> <line x1="4" x2="20" y1="12" y2="12" />`,table:`<path d="M12 3v18" /> <rect width="18" height="18" x="3" y="3" rx="2" /> <path d="M3 9h18" /> <path d="M3 15h18" />`,trash:`<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /> <path d="M3 6h18" /> <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />`,type:`<path d="M12 4v16" /> <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" /> <path d="M9 20h6" />`,underline:`<path d="M6 4v6a6 6 0 0 0 12 0V4" /> <line x1="4" x2="20" y1="20" y2="20" />`,undo:`<path d="M9 14 4 9l5-5" /> <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />`,upload:`<path d="M12 3v12" /> <path d="m17 8-5-5-5 5" /> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />`,user:`<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /> <circle cx="12" cy="7" r="4" />`,users:`<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> <circle cx="9" cy="7" r="4" /> <path d="M22 21v-2a4 4 0 0 0-3-3.87" /> <path d="M16 3.13a4 4 0 0 1 0 7.75" />`,video:`<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /> <rect x="2" y="6" width="14" height="12" rx="2" />`,"volume-x":`<path d="M11 4.7a1 1 0 0 0-1.6-.8L5.9 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.9l3.5 3.1a1 1 0 0 0 1.6-.8Z" /> <line x1="22" x2="16" y1="9" y2="15" /> <line x1="16" x2="22" y1="9" y2="15" />`,volume:`<path d="M11 4.7a1 1 0 0 0-1.6-.8L5.9 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.9l3.5 3.1a1 1 0 0 0 1.6-.8Z" /> <path d="M16 9a5 5 0 0 1 0 6" /> <path d="M19.4 5.5a9 9 0 0 1 0 13" />`,"writing-horizontal":`<path d="M4 6V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /> <path d="M10 4v10" /> <path d="M7 14h6" /> <path d="M4 19h16" /> <path d="m17 16 3 3-3 3" />`,"writing-vertical":`<path d="M3 7V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2" /> <path d="M9 4v16" /> <path d="M6 20h6" /> <path d="M19 4v16" /> <path d="m16 17 3 3 3-3" />`,x:`<path d="M18 6 6 18" /> <path d="m6 6 12 12" />`,"zoom-in":`<circle cx="11" cy="11" r="8" /> <line x1="21" x2="16.65" y1="21" y2="16.65" /> <line x1="11" x2="11" y1="8" y2="14" /> <line x1="8" x2="14" y1="11" y2="11" />`,"zoom-out":`<circle cx="11" cy="11" r="8" /> <line x1="21" x2="16.65" y1="21" y2="16.65" /> <line x1="8" x2="14" y1="11" y2="11" />`};Object.keys(mi);var hi=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),H=o(((e,t)=>{t.exports=hi()}))();function U({name:e,size:t=24,label:n,className:r}){return(0,H.jsx)(`svg`,{className:r,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`var(--ds-border-width-icon)`,strokeLinecap:`round`,strokeLinejoin:`round`,role:n?`img`:void 0,"aria-label":n,"aria-hidden":!n||void 0,focusable:`false`,dangerouslySetInnerHTML:{__html:mi[e]}})}var gi=.3,_i=.01,vi=.15,yi=24,bi=.6,xi=4;function Si(e){let t=e.getBoundingClientRect(),n=e.offsetWidth||t.width,r=e.offsetHeight||t.height,i=t.width/n,a=e.cloneNode(!0);a.removeAttribute(`data-row-id`),a.removeAttribute(`data-row-index`),a.querySelectorAll(`[data-row-id], [data-col-id]`).forEach(e=>{e.removeAttribute(`data-row-id`),e.removeAttribute(`data-col-id`)}),a.querySelectorAll(`[contenteditable]`).forEach(e=>{e.contentEditable=`false`});let o=getComputedStyle(e).writingMode.startsWith(`vertical`);return Object.assign(a.style,{position:`fixed`,left:`0`,top:`0`,width:`${n}px`,...o?{height:`${r}px`}:{},margin:`0`,pointerEvents:`none`,zIndex:`9999`,opacity:`0.92`,background:`var(--ds-surface-raised)`,borderRadius:`8px`,boxShadow:`0 0 0 1.5px var(--ds-border-hover), 0 18px 40px rgba(26, 25, 23, 0.18)`,transformOrigin:`top left`,writingMode:getComputedStyle(e).writingMode}),document.body.appendChild(a),{ghost:a,scale:i}}function Ci(e,t){let n=e.querySelectorAll(`[data-col-id]`);if(n.length!==1)return{};let r=n[0],i=r.querySelectorAll(`[data-block-id]`);if(i.length!==1)return{};let a=r.getBoundingClientRect(),o=i[0].getBoundingClientRect(),s=t?a.height:a.width,c=t?o.top-a.top:o.left-a.left,l=t?o.bottom-a.top:o.right-a.left;return s<=0||Math.abs(c)>2||l/s>.85?{}:{keepPct:l/(s-48*(r.offsetWidth?a.width/r.offsetWidth:1))*100,fitPct:100}}function wi(e,t,n){let r=(0,B.useRef)(null),i=(0,B.useRef)(null);return{startDrag:(0,B.useCallback)((a,o)=>{let s=a.currentTarget,c=o.columnId?a.target.closest(`[data-row-id]`)?.querySelector(`[data-col-id="${o.columnId}"]`)??null:a.target.closest(`[data-row-id]`),l=a.clientX,u=a.clientY,d=c?.closest(`[data-row-id]`)?.getBoundingClientRect()??null,f=o.columnId?1:c?.querySelectorAll(`[data-col-id]`).length||1,p=d?u-d.top:null,m=!1,h=null,g=0,_=0,v=1,y=0,b=0,x=(e,t)=>{let n=[...document.querySelectorAll(`main [data-page-index]`)],r=null,a=1/0;for(let i of n){let n=i.getBoundingClientRect(),o=t<n.top?n.top-t:t>n.bottom?t-n.bottom:0,s=e<n.left?n.left-e:e>n.right?e-n.right:0,c=Math.hypot(s,o);c<a&&(a=c,r=i)}if(r){let t=[...r.querySelectorAll(`[data-flow-panel]`)];if(t.length>0){let n=1/0,i=null;for(let r of t){let t=r.getBoundingClientRect(),a=e<t.left?t.left-e:e>t.right?e-t.right:0;a<n&&(n=a,i=r)}i&&(r=i)}}let o=[...(r??document).querySelectorAll(`[data-row-id]`)],s=o.some(e=>e.dataset.rowId!==i.current?.rowId||i.current?.columnId);if((o.length===0||!s)&&(o=[...document.querySelectorAll(`main [data-row-id]`)]),o.length===0)return null;let c=o[0].closest(`[data-vertical]`)!==null||getComputedStyle(o[0]).writingMode.startsWith(`vertical`),l=((e,t)=>c?-e:t)(e,t),u=e-g+y/2,d=t-_+b/2,m=c?d:u,h=null;for(let n of o){if(n.dataset.rowId===i.current?.rowId&&!i.current?.columnId)continue;let r=n.getBoundingClientRect(),a=c?-r.right:r.top,o=c?-r.left:r.bottom,s=l<a?a-l:l>o?l-o:0,u=c?r.top:r.left,d=c?r.bottom:r.right,f=c?t:e,p=f<u?u-f:f>d?f-d:0,m=Math.hypot(s,p);(!h||m<h.dist)&&(h={frame:n,r,dist:m})}if(!h)return null;let{frame:v,r:x}=h,S=Number(v.dataset.rowIndex),C=v.dataset.rowId,w=C===i.current?.rowId,T=v.querySelectorAll(`[data-col-id]`).length||1;if(c&&!w&&T+f<=3&&p!==null){let n=v.closest(`[data-page-index]`)?.getBoundingClientRect(),r=e>=x.left-yi&&e<=x.right+yi;if(n&&n.height>0&&r){let e=(t-(x.top+p))/n.height,r=vi*n.height,i=t>x.top-r&&t<x.bottom+r,a=(t-x.top)/x.height;if(i&&a<gi&&e<-.01)return{mode:`column`,rowId:C,side:`left`,...Ci(v,!0)};if(i&&a>bi&&e>_i)return{mode:`column`,rowId:C,side:`right`,...Ci(v,!0)}}}let E=h.dist===0,D=c?x.top:x.left,O=c?x.height:x.width,k=(m-D)/O;if(!c&&E&&!w&&T+f<=5){if(k<gi)return{mode:`column`,rowId:C,side:`left`,...Ci(v,!1)};if(k>.7)return{mode:`column`,rowId:C,side:`right`,...Ci(v,!1)}}return{mode:`row`,index:l>(c?-(x.left+x.width/2):x.top+x.height/2)?S+1:S}},S=n=>{if(!m){if(Math.hypot(n.clientX-l,n.clientY-u)<xi)return;if(m=!0,i.current=o,e(o.rowId),c){let e=c.getBoundingClientRect();g=l-e.left,_=u-e.top,y=e.width,b=e.height,{ghost:h,scale:v}=Si(c)}}h&&(h.style.transform=`translate(${n.clientX-g}px, ${n.clientY-_}px) scale(${v})`);let a=x(n.clientX,n.clientY);h&&(h.style.opacity=a?.mode===`column`?`0.4`:`0.92`),r.current=a,t(a)},C=a=>{window.removeEventListener(`pointermove`,S),window.removeEventListener(`pointerup`,C),window.removeEventListener(`pointercancel`,C);try{s?.releasePointerCapture?.(a.pointerId)}catch{}let o=m?x(a.clientX,a.clientY)??r.current:null,c=i.current;h?.remove(),h=null,i.current=null,r.current=null,e(null),t(null),c&&o&&n(c,o)};try{s?.setPointerCapture?.(a.pointerId)}catch{}window.addEventListener(`pointermove`,S),window.addEventListener(`pointerup`,C),window.addEventListener(`pointercancel`,C),a.preventDefault()},[e,t,n])}}var Ti=0;function W(e){Ti+=1;let t=Math.random().toString(36).slice(2,7);return`${e}_${Ti.toString(36)}_${t}`}function Ei(e){let t=structuredClone(e);return t.id=W(`blk`),t.popups=t.popups.map(e=>({...e,id:W(`pop`)})),t}var Di=null,Oi=e=>{Di=structuredClone(e)},G=()=>Di?Ei(Di):null,ki=()=>Di!==null;function Ai(e,t=100){return{id:W(`col`),widthPct:t,blocks:e}}function ji(e,t=!1){return{id:W(`row`),columns:[Ai(e)],breakBefore:t}}function Mi(e,t=`body`){return{id:W(`blk`),type:`text`,role:t,popups:[],spans:[{text:e}]}}function Ni(e){return e.spans.map(e=>e.text).join(``)}function Pi(e=`未命名教材`){return{id:W(`doc`),title:e,settings:{writingMode:`horizontal`,aspectRatio:`4:3`,textScale:`md`},meta:{},rows:[ji([Mi(``,`lessonTitle`)])],footnotes:[],bookId:null,unitId:null}}function*Fi(e){for(let t of e.rows)for(let e of t.columns)for(let n of e.blocks)yield{row:t,column:e,block:n}}function Ii(e,t){for(let n of Fi(e))if(n.block.id===t)return n;return null}function Li(e){let t=new Set,n=!1,r=e.rows.map(e=>{let r=e.id;t.has(r)&&(r=W(`row`),n=!0),t.add(r);let i=!1,a=e.columns.map(e=>{let r=e.id;t.has(r)&&(r=W(`col`),n=!0,i=!0),t.add(r);let a=!1,o=e.blocks.map(e=>{let r=e.id;t.has(r)&&(r=W(`blk`),n=!0,a=!0),t.add(r);let i=!1,o=new Map,s=e.popups.map(e=>{let r=e.id;return t.has(r)&&(r=W(`pop`),o.set(e.id,r),n=!0,i=!0),t.add(r),r===e.id?e:{...e,id:r}}),c=e=>e&&o.get(e)||e,l=o.size?s.map(e=>e.wordGroup?{...e,wordGroup:c(e.wordGroup)}:e):s,u=o.size&&e.type===`text`?{spans:e.spans.map(e=>e.popupId&&o.has(e.popupId)?{...e,popupId:c(e.popupId)}:e)}:{};return r!==e.id||i?{...e,...u,id:r,popups:l}:e});return r!==e.id||a?(i=!0,{...e,id:r,blocks:o}):e});return r!==e.id||i?{...e,id:r,columns:a}:e});return n?{...e,rows:r}:e}function Ri(e){let t=e.rows.map(e=>({...e,columns:e.columns.map(e=>({...e,blocks:e.blocks.filter(e=>e.type!==`module`)})).filter(e=>e.blocks.length>0)})).filter(e=>e.columns.length>0);return{...e,rows:t}}function zi(e){let t=!1,n=e.rows.map(e=>e.columns.every(e=>e.blocks.length<=1)?e:(t=!0,{...e,columns:e.columns.flatMap(e=>e.blocks.length<=1?[e]:e.blocks.map((t,n)=>({id:n===0?e.id:W(`col`),widthPct:e.widthPct/e.blocks.length,blocks:[t]})))}));return t?{...e,rows:n}:e}var Bi={text:{label:`文字`,icon:`file-text`,action:`閱讀`},rich:{label:`大彈窗`,icon:`popup`,action:`開啟`},image:{label:`圖片`,icon:`image`,action:`看大圖`},video:{label:`影片`,icon:`video`,action:`播放`},audio:{label:`聲音`,icon:`music`,action:`播放`},web:{label:`網頁`,icon:`globe`,action:`開啟`},jump:{label:`跳轉`,icon:`arrow-up-right`,action:`前往`}},Vi=[`text`,`rich`,`image`,`video`,`audio`,`web`,`jump`];function Hi(e){let t=W(`pop`);switch(e){case`text`:return{id:t,kind:e,title:``,body:``};case`image`:return{id:t,kind:e,title:``,assetId:null};case`video`:return{id:t,kind:e,title:``,source:`youtube`,ref:``};case`audio`:return{id:t,kind:e,title:``,assetId:null};case`web`:return{id:t,kind:e,title:``,url:``,embeddable:!1};case`jump`:return{id:t,kind:e,title:``,targetRowId:null};case`rich`:return{id:t,kind:e,title:``,blocks:[],pages:[[]]}}}function Ui(e){switch(e.kind){case`text`:return e.body.trim()||e.title.trim()?null:`還沒填標題或內容`;case`image`:case`audio`:return e.assetId?null:`還沒選檔案`;case`video`:return e.ref.trim()?null:`還沒填影片來源`;case`web`:return e.url.trim()?null:`還沒填網址`;case`jump`:return e.targetRowId?null:`還沒選要跳到哪裡`;case`rich`:return Gi(e).some(Wi)?null:`還沒放內容`}}function Wi(e){return e.some(e=>e.type===`text`?e.spans.some(e=>e.text.trim()):e.type===`image`?e.assetId!==null:e.type===`video`?!!e.ref.trim():e.type===`audio`?e.assetId!==null:e.type!==`web`||!!e.url.trim())}function Gi(e){return e.pages&&e.pages.length>0?e.pages:[e.blocks]}function Ki(e,t){let n=t.length>0?t:[[]];return{...e,pages:n,blocks:n[0]}}var qi=e=>e.title.trim()||Bi[e.kind].label;function Ji(e){return e.popups.filter(e=>!Ui(e))}var Yi=e=>e.wordGroup??e.id;function Xi(e){return new Set((e.spans??[]).map(e=>e.popupId).filter(e=>!!e))}var Zi=(e,t)=>e.popups.filter(e=>Yi(e)===t);function Qi(e){let t=Xi(e);return e.popups.filter(e=>!t.has(Yi(e)))}var $i=e=>Qi(e).filter(e=>!Ui(e)),ea=`/textbook-editor/assets/mulan-loom-Beu-FwvS.jpg`,ta=`/textbook-editor/assets/mulan-portrait-DfALosp2.jpg`,na=`/textbook-editor/assets/mulan-silk-painting-Bam35q3R.jpg`,ra=`/textbook-editor/assets/mulan-weaver-BYkZYHJ5.jpg`,ia=`/textbook-editor/assets/mulan-yanshan-BVZnMOjV.jpg`,aa=`/textbook-editor/assets/mulan-yellow-river-nXsO3mqh.jpg`,oa=`/textbook-editor/assets/orion-lines-ZQZf8xXR.jpg`,sa=`/textbook-editor/assets/star-chart-BdKTogOW.jpg`,ca=`/textbook-editor/assets/star-trails-IsCLAFTk.jpg`,la=`/textbook-editor/assets/summer-triangle-aaFPeENU.jpg`,ua={"summer-triangle.jpg":{width:1200,height:938,title:`Summer Triangle2`,author:`Giuseppe Donatiello, Giovanni Vincenzo Donatiello`,license:`CC0`,licenseUrl:`https://creativecommons.org/publicdomain/zero/1.0/`,source:`https://commons.wikimedia.org/wiki/File:Summer_Triangle2.jpg`},"star-trails.jpg":{width:1200,height:901,title:`Star stack Star trail`,author:`Youniverse Multiverse`,license:`CC0`,licenseUrl:`https://creativecommons.org/publicdomain/zero/1.0/`,source:`https://commons.wikimedia.org/wiki/File:Star_stack_Star_trail.jpg`},"orion-lines.jpg":{width:1200,height:800,title:`Orion constellation explained`,author:`Taavi Niittee (Nielander)`,license:`CC0`,licenseUrl:`https://creativecommons.org/publicdomain/zero/1.0/`,source:`https://commons.wikimedia.org/wiki/File:Orion_constellation_explained.jpg`},"star-chart.jpg":{width:1200,height:1725,title:`Sidney Hall - Urania's Mirror - Orion (1824)`,author:`Sidney Hall（雕版，1824）；數位修復 Adam Cuerden`,license:`Public domain`,licenseUrl:null,source:`https://commons.wikimedia.org/wiki/File:Sidney_Hall_-_Urania%27s_Mirror_-_Orion_(best_currently_available_version_-_2014).jpg`},"mulan-portrait.jpg":{width:699,height:1200,title:`Mulan（《歷朝名媛詩詞》木刻版畫，1772）`,author:`陸昶編《歷朝名媛詩詞》；Harvard-Yenching Library 藏`,license:`Public domain`,licenseUrl:null,source:`https://commons.wikimedia.org/wiki/File:Mulan.jpg`},"mulan-silk-painting.jpg":{width:699,height:1200,title:`Mulan, 18th century, ink and colors on silk`,author:`款署「實父仇英製」；大英博物館藏`,license:`Public domain`,licenseUrl:null,source:`https://commons.wikimedia.org/wiki/File:Mulan,_18th_century,_ink_and_colors_on_silk.jpg`},"mulan-loom.jpg":{width:1200,height:800,title:`Jizhu - Chinese Loom & Shuttle, Hangzhou National Archives 38`,author:`CatOnMars`,license:`CC BY 4.0`,licenseUrl:`https://creativecommons.org/licenses/by/4.0`,source:`https://commons.wikimedia.org/wiki/File:Jizhu_-_Chinese_Loom_%26_Shuttle,_Hangzhou_National_Archives_38.jpg`},"mulan-weaver.jpg":{width:1200,height:800,title:`Lijiang Yunnan China-Woman-with-weaving-loom-01`,author:`CEphoto, Uwe Aranas`,license:`CC BY-SA 3.0`,licenseUrl:`https://creativecommons.org/licenses/by-sa/3.0`,source:`https://commons.wikimedia.org/wiki/File:Lijiang_Yunnan_China-Woman-with-weaving-loom-01.jpg`},"mulan-yellow-river.jpg":{width:1200,height:675,title:`Hukou Waterfalls, Shaanxi 3`,author:`H2v5o68z`,license:`CC0`,licenseUrl:`https://creativecommons.org/publicdomain/zero/1.0/`,source:`https://commons.wikimedia.org/wiki/File:Hukou_Waterfalls,_Shaanxi_3.jpg`},"mulan-yanshan.jpg":{width:1200,height:507,title:`Yan Mountain in Qinhuangdao`,author:`PQ77wd`,license:`CC BY-SA 4.0`,licenseUrl:`https://creativecommons.org/licenses/by-sa/4.0`,source:`https://commons.wikimedia.org/wiki/File:Yan_Mountain_in_Qinhuangdao.jpg`}},da=Object.assign({"../../design/media/mulan-loom.jpg":ea,"../../design/media/mulan-portrait.jpg":ta,"../../design/media/mulan-silk-painting.jpg":na,"../../design/media/mulan-weaver.jpg":ra,"../../design/media/mulan-yanshan.jpg":ia,"../../design/media/mulan-yellow-river.jpg":aa,"../../design/media/orion-lines.jpg":oa,"../../design/media/star-chart.jpg":sa,"../../design/media/star-trails.jpg":ca,"../../design/media/summer-triangle.jpg":la}),fa=e=>(e.split(`/`).pop()??e).replace(/\.[^.]+$/,``),pa=new Map(Object.entries(da).map(([e,t])=>[fa(e),t])),ma=new Map(Object.entries(ua).map(([e,t])=>[fa(e),t])),ha=e=>e?ma.get(fa(e)):void 0,ga=e=>pa.get(fa(e));function _a(e){let t=e=>{if(e.type!==`image`||!e.assetId)return e;let t=ma.get(fa(e.assetId));return t?{...e,aspectRatio:t.width/t.height}:e},n=e.rows.map(e=>({...e,columns:e.columns.map(e=>({...e,blocks:e.blocks.map(t)}))}));return{...e,rows:n}}var va=new Map,ya=0,ba=[],xa=new Set,Sa=0,Ca=()=>Sa;function wa(){Sa+=1,xa.forEach(e=>e())}var Ta=e=>ba.filter(t=>!e||t.kind===e).slice().reverse();function Ea(e){return xa.add(e),()=>xa.delete(e)}var Da=e=>{let t=e.type;return t.startsWith(`image/`)?`image`:t.startsWith(`video/`)?`video`:t.startsWith(`audio/`)?`audio`:t===`application/pdf`||/\.pdf$/i.test(e.name)?`pdf`:`file`},Oa=1200,ka=Da,Aa=e=>ba.find(t=>t.assetId===e),ja=e=>e?va.get(e)??ga(e):void 0;function Ma(e){let t=`asset-${ya+=1}`,n=Da(e);return va.set(t,URL.createObjectURL(e)),ba.push({assetId:t,kind:n,name:e.name,addedAt:Date.now(),...n===`video`?{source:`upload`}:{}}),wa(),t}function Na(e){let t=ba.find(t=>t.assetId===e);t&&(t.favorite=!t.favorite,wa())}function Pa(e){let t=ba.findIndex(t=>t.assetId===e);t<0||(ba.splice(t,1),wa())}function Fa(e,t){ba.some(t=>t.assetId===e.assetId)||(t&&va.set(e.assetId,t),ba.push({...e,addedAt:Date.now()}),wa())}function Ia(e){let t=`asset-${ya+=1}`;return va.set(t,URL.createObjectURL(e)),t}function La(e,t){let n={assetId:`asset-${ya+=1}`,kind:`web`,name:t?.trim()||za(e),addedAt:Date.now(),url:e};return ba.push(n),wa(),n}function Ra(e){let t=Ua(e.trim());if(!t)return null;let n={assetId:`asset-${ya+=1}`,kind:`video`,source:`youtube`,name:`YouTube 影片 ${t}`,addedAt:Date.now(),url:e.trim()};return ba.push(n),wa(),n}var za=e=>{try{return new URL(e).hostname||e}catch{return e}};function Ba(e,t){let n=ba.find(t=>t.assetId===e);n&&Object.assign(n,t),wa()}function Va(e){return new Promise((t,n)=>{let r=Ma(e),i=va.get(r),a=new Image;a.onload=()=>{let e=a.naturalHeight>0?a.naturalWidth/a.naturalHeight:1.5;Ba(r,{kind:`image`,aspectRatio:e}),t({assetId:r,aspectRatio:e})},a.onerror=()=>{va.delete(r);let e=ba.findIndex(e=>e.assetId===r);e>=0&&ba.splice(e,1),URL.revokeObjectURL(i),n(Error(`讀不到這張圖`))},a.src=i})}function Ha(e){return new Promise(t=>{let n=document.createElement(`input`);n.type=`file`,n.accept=e,n.oncancel=()=>t(null),n.onchange=()=>t(n.files?.[0]??null),n.click()})}function Ua(e){if(/^[\w-]{11}$/.test(e))return e;let t=e.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);return t?t[1]:null}var Wa=(e,t,n)=>Math.min(Math.max(e,t),Math.max(t,n)),Ga=(e,t)=>e.left<t.left+t.width&&e.left+e.width>t.left&&e.top<t.top+t.height&&e.top+e.height>t.top;function Ka(e,t,n,r){let{width:i,height:a}=n,o=e=>Wa(e-i/2,12,r.width-12-i),s=(e,t)=>Wa(e-t,16,i-16),c=e.left+e.width/2,l=o(c),u=e.top-12-8-a,d={top:u,left:l,width:i,height:a+8};if(u>=12&&!Ga(d,t))return{top:u,left:l,side:`above`,arrow:s(c,l)};let f=e.top+e.height+12+8,p={top:f-8,left:l,width:i,height:a+8};if(f+a<=r.height-12&&!Ga(p,t))return{top:f,left:l,side:`below`,arrow:s(c,l)};let m=t.left+t.width/2,h=o(m);return{top:Wa(t.top+t.height+12+8,12,r.height-12-a),left:h,side:`below`,arrow:s(m,h)}}function qa(e,t,n,r){let{width:i,height:a}=n,o=e.top+e.height/2,s=Wa(o-a/2,12,r.height-12-a),c=Wa(o-s,16,a-16),l=Math.min(e.left,t.left)-12-8-i;if(l>=12)return{top:s,left:l,side:`left`,arrow:c};let u=Math.max(e.left+e.width,t.left+t.width)+12+8;return u+i<=r.width-12?{top:s,left:u,side:`right`,arrow:c}:Ka(e,t,n,r)}function Ja({item:e}){if(e.source===`youtube`){let t=Ua(e.ref);return t?(0,H.jsx)(Xa,{src:`https://www.youtube-nocookie.com/embed/${t}`,title:e.title||`影片`,allow:`accelerometer; clipboard-write; encrypted-media; picture-in-picture`,allowFullScreen:!0}):(0,H.jsx)(Ya,{children:`影片網址無法辨識`})}let t=ja(e.ref||null);return t?(0,H.jsx)($a,{src:t,title:e.title}):(0,H.jsx)(Ya,{children:`影片還沒上傳`})}var Ya=V.span`
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.feedback.warningDefault};
`,Xa=V.iframe`
  display: block;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
`,Za=3e3,Qa=e=>{(!Number.isFinite(e)||e<0)&&(e=0);let t=Math.floor(e/60),n=Math.floor(e%60);return`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}`};function $a({src:e,title:t,style:n,autoPlay:r}){let i=(0,B.useRef)(null),a=(0,B.useRef)(null),o=(0,B.useRef)(null),[s,c]=(0,B.useState)(!1),[l,u]=(0,B.useState)(0),[d,f]=(0,B.useState)(0),[p,m]=(0,B.useState)(1),[h,g]=(0,B.useState)(!1),[_,v]=(0,B.useState)(!0),[y,b]=(0,B.useState)(!0),[x,S]=(0,B.useState)(!1),C=()=>{v(!0),b(!0),o.current&&window.clearTimeout(o.current),o.current=window.setTimeout(()=>{b(!1),a.current&&!a.current.paused&&v(!1)},Za)};(0,B.useEffect)(()=>(o.current=window.setTimeout(()=>{b(!1),a.current&&!a.current.paused&&v(!1)},Za),()=>{o.current&&window.clearTimeout(o.current)}),[]);let w=()=>{let e=a.current;e&&(e.paused?e.play().catch(()=>{}):e.pause())};return(0,H.jsxs)(no,{ref:i,style:n,$idle:!_&&!y,onPointerEnter:C,onPointerMove:C,onPointerLeave:()=>{b(!1),s&&v(!1)},children:[(0,H.jsx)(ro,{ref:a,src:e,title:t,playsInline:!0,autoPlay:r,onClick:w,onPlay:()=>{c(!0),C()},onPause:()=>{c(!1),C()},onTimeUpdate:e=>u(e.currentTarget.currentTime),onDurationChange:e=>f(e.currentTarget.duration),onLoadedMetadata:e=>f(e.currentTarget.duration),onVolumeChange:e=>{m(e.currentTarget.volume),g(e.currentTarget.muted)}}),t&&(0,H.jsx)(io,{$visible:y,children:(0,H.jsx)(ao,{children:t})}),(0,H.jsxs)(oo,{$visible:_,onPointerDown:e=>e.stopPropagation(),children:[(0,H.jsxs)(K,{children:[(0,H.jsx)(q,{type:`button`,onClick:w,"aria-label":s?`暫停`:`播放`,children:(0,H.jsx)(to,{name:s?`pause`:`play`})}),(0,H.jsxs)(so,{children:[Qa(l),` / `,Qa(d)]}),(0,H.jsx)(eo,{"aria-label":`播放進度`,value:d>0?l/d:0,onChange:e=>{let t=a.current;!t||!Number.isFinite(t.duration)||(t.currentTime=Math.max(0,Math.min(1,e))*t.duration,u(t.currentTime))}})]}),(0,H.jsxs)(K,{$compact:!0,onPointerEnter:()=>S(!0),onPointerLeave:()=>S(!1),children:[(0,H.jsx)(q,{type:`button`,onClick:()=>{let e=a.current;e&&(e.muted=!e.muted,g(e.muted))},"aria-label":h?`取消靜音`:`靜音`,children:(0,H.jsx)(to,{name:h||p===0?`volume-x`:`volume`})}),(0,H.jsx)(co,{$open:x,children:(0,H.jsx)(eo,{"aria-label":`音量`,value:h?0:p,onChange:e=>{let t=a.current;if(!t)return;let n=Math.max(0,Math.min(1,e));t.volume=n,t.muted=n===0,m(n),g(t.muted)}})}),(0,H.jsx)(q,{type:`button`,onClick:()=>{let e=i.current;e&&(document.fullscreenElement?document.exitFullscreen():e.requestFullscreen?.())},"aria-label":`全螢幕`,children:(0,H.jsx)(to,{name:`maximize`})})]})]})]})}function eo({value:e,onChange:t,"aria-label":n}){let r=Math.round(Math.max(0,Math.min(1,e))*1e3)/10;return(0,H.jsx)(lo,{type:`range`,min:0,max:1e3,value:Math.round(e*1e3),"aria-label":n,style:{"--fill":`${r}%`},onChange:e=>t(Number(e.target.value)/1e3)})}function to({name:e,size:t=20}){return(0,H.jsx)(U,{name:e,size:t})}var no=V.div`
  position: relative;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.inverse};
  overflow: hidden;
  /* 控制列收起時連游標一起藏，看影片時畫面上不要有東西 */
  cursor: ${e=>e.$idle?`none`:`default`};
  /* 直排教材裡播放器也要正著看 */
  writing-mode: horizontal-tb;

  &:fullscreen {
    border-radius: 0;
  }
`,ro=V.video`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
`,io=V.div`
  position: absolute;
  inset-inline: 12px;
  inset-block-start: 12px;
  display: flex;
  align-items: center;
  opacity: ${e=>+!!e.$visible};
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 2;
`,ao=V.span`
  display: inline-flex;
  align-items: center;
  max-inline-size: min(80%, 480px);
  /* 跟下方控制列同高（36），兩顆膠囊看起來是同一套 */
  block-size: 36px;
  box-sizing: border-box;
  padding: 0 14px;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.primary};
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  line-height: var(--ds-typography-caption-line-height);
  box-shadow: ${e=>e.theme.shadow.card};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,oo=V.div`
  position: absolute;
  inset-inline: 12px;
  inset-block-end: 12px;
  display: flex;
  gap: 8px;
  opacity: ${e=>+!!e.$visible};
  pointer-events: ${e=>e.$visible?`auto`:`none`};
  transition: opacity 0.3s ease;
  z-index: 2;
`,K=V.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: ${e=>e.$compact?`none`:1};
  min-inline-size: 0;
  block-size: 36px;
  padding: 0 6px;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.primary};
  box-shadow: ${e=>e.theme.shadow.card};
`,q=V.button`
  /* 按鈕預設左右各 6px 內距，小按鈕扣掉後會把圖示擠歪 */
  padding: 0;
  display: grid;
  place-items: center;
  flex: none;
  inline-size: 28px;
  block-size: 28px;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: transparent;
  color: ${e=>e.theme.icon.default};
  cursor: pointer;

  &:hover { background: ${e=>e.theme.action.ghostBgHover}; }
`,so=V.span`
  flex: none;
  font-size: var(--ds-typography-caption-size);
  font-variant-numeric: tabular-nums;
  color: ${e=>e.theme.text.secondary};
  white-space: nowrap;
`,co=V.div`
  inline-size: ${e=>e.$open?`96px`:`0`};
  overflow: hidden;
  transition: inline-size 0.16s;
  display: flex;
  align-items: center;
`,lo=V.input`
  flex: 1;
  min-inline-size: 72px;
  block-size: 20px;
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    block-size: 4px;
    border-radius: 999px;
    background: linear-gradient(
      to right,
      ${e=>e.theme.text.secondary} 0 var(--fill),
      ${e=>e.theme.surface.media} var(--fill) 100%
    );
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    inline-size: 14px;
    block-size: 14px;
    margin-block-start: -5px;
    border-radius: 999px;
    border: none;
    background: ${e=>e.theme.surface.raised};
    box-shadow: ${e=>e.theme.shadow.card};
  }
  &::-moz-range-track {
    block-size: 4px;
    border-radius: 999px;
    background: ${e=>e.theme.surface.media};
  }
  &::-moz-range-progress {
    block-size: 4px;
    border-radius: 999px;
    background: ${e=>e.theme.text.secondary};
  }
  &::-moz-range-thumb {
    inline-size: 14px;
    block-size: 14px;
    border-radius: 999px;
    border: none;
    background: ${e=>e.theme.surface.raised};
    box-shadow: ${e=>e.theme.shadow.card};
  }
`,uo=e=>e instanceof Element?e.getBoundingClientRect():e,fo=e=>e instanceof Element&&e.parentElement?e.parentElement.getBoundingClientRect():uo(e),po=(e,t)=>e.top===t.top&&e.left===t.left&&e.side===t.side&&e.arrow===t.arrow,mo=e=>e instanceof Element&&(getComputedStyle(e).writingMode.startsWith(`vertical`)||!e.closest(`[data-horizontal]`)&&!!e.closest(`[data-vertical]`));function ho({block:e,item:t,anchor:n,onClose:r,onJump:i,onEdit:a,items:o,onPick:s,lead:c}){let l=(0,B.useRef)(null),[u,d]=(0,B.useState)(null),f=mo(n);(0,B.useLayoutEffect)(()=>{let e=l.current;if(!e)return;let t=()=>{if(n instanceof Element&&!n.isConnected){r();return}let t=e.getBoundingClientRect(),i=(f?qa:Ka)(uo(n),fo(n),{width:t.width,height:t.height},{width:window.innerWidth,height:window.innerHeight});d(e=>e&&po(e,i)?e:i)};t(),window.addEventListener(`scroll`,t,!0),window.addEventListener(`resize`,t);let i=typeof ResizeObserver>`u`?null:new ResizeObserver(t);return i?.observe(e),()=>{window.removeEventListener(`scroll`,t,!0),window.removeEventListener(`resize`,t),i?.disconnect()}},[n,r,f]),(0,B.useEffect)(()=>{let e=e=>{l.current?.contains(e.target)||r()};return document.addEventListener(`pointerdown`,e,!0),()=>document.removeEventListener(`pointerdown`,e,!0)},[r]);let p=Ui(t),m=u?.side??`above`,h=u?{top:u.top,left:u.left}:{top:0,left:0,visibility:`hidden`};if(!o&&t.kind===`audio`&&!Ui(t))return(0,pi.createPortal)((0,H.jsxs)(yo,{ref:l,role:`dialog`,"aria-label":`補充內容：${qi(t)}`,style:h,$wide:!0,$vertical:f,children:[(0,H.jsx)(bo,{$side:m,$at:u?.arrow??0}),(0,H.jsx)(go,{items:[t],autoPlay:!0})]}),document.body);if(!o&&t.kind===`jump`&&!Ui(t))return(0,pi.createPortal)((0,H.jsxs)(yo,{ref:l,role:`dialog`,"aria-label":`補充內容：${qi(t)}`,style:h,$wide:!0,$vertical:f,children:[(0,H.jsx)(bo,{$side:m,$at:u?.arrow??0}),(0,H.jsx)(Mo,{$bare:!0,children:(0,H.jsxs)(Lo,{type:`button`,$bare:!0,onClick:()=>{r(),t.targetRowId&&i?.(t.targetRowId)},children:[(0,H.jsx)(zo,{children:(0,H.jsx)(Bo,{children:t.title.trim()||`前往`})}),(0,H.jsx)(Ro,{$vertical:f,name:`arrow-up-right`,size:20})]})})]}),document.body);if(o&&s){let e=o.every(e=>e.kind===`text`||e.kind===`jump`||e.kind===`audio`);return(0,pi.createPortal)((0,H.jsxs)(yo,{ref:l,role:`dialog`,"aria-label":`補充內容 ${o.length} 項`,style:h,$wide:!0,$vertical:f&&(e||!!c),children:[(0,H.jsx)(bo,{$side:m,$at:u?.arrow??0}),c&&(0,H.jsxs)(To,{children:[c.title.trim()&&(0,H.jsx)(Eo,{children:c.title}),(0,H.jsx)(Do,{children:c.body})]}),o.every(e=>e.kind===`audio`)?(0,H.jsx)(go,{items:o}):o.every(e=>e.kind===`jump`)?(0,H.jsx)(Mo,{children:o.map(e=>(0,H.jsxs)(Lo,{type:`button`,onClick:()=>s(e),children:[(0,H.jsx)(zo,{children:(0,H.jsx)(Bo,{children:e.title.trim()||`前往`})}),(0,H.jsx)(Ro,{$vertical:f,name:`arrow-up-right`,size:20})]},e.id))}):o.every(e=>e.kind===`text`)?(0,H.jsx)(Mo,{children:o.map(e=>(0,H.jsxs)(Lo,{type:`button`,onClick:()=>s(e),children:[(0,H.jsx)(zo,{children:e.title.trim()?(0,H.jsx)(Bo,{children:e.title}):e.kind===`text`&&(0,H.jsx)(Vo,{$lines:2,children:e.body})}),(0,H.jsx)(U,{name:f?`chevron-down`:`chevron-right`,size:20})]},e.id))}):(0,H.jsx)(Oo,{$vertical:f,children:o.map(e=>(0,H.jsxs)(ko,{type:`button`,onClick:()=>s(e),children:[(0,H.jsx)(_o,{item:e}),e.title.trim()&&(0,H.jsx)(jo,{children:e.title})]},e.id))})]}),document.body)}return(0,pi.createPortal)((0,H.jsxs)(yo,{ref:l,role:`dialog`,"aria-label":`補充內容：${qi(t)}`,style:h,$vertical:f,children:[(0,H.jsx)(bo,{$side:m,$at:u?.arrow??0}),(0,H.jsxs)(xo,{$float:!t.title.trim(),children:[(0,H.jsx)(So,{children:t.title.trim()}),a&&(0,H.jsx)(Co,{onClick:()=>{r(),a(e.id)},"aria-label":`編輯補充內容`,title:`編輯補充內容`,children:(0,H.jsx)(U,{name:`pencil`,size:16})}),!f&&(0,H.jsx)(Co,{onClick:r,"aria-label":`關閉`,children:(0,H.jsx)(U,{name:`x`,size:16,label:`關閉`})})]}),(0,H.jsx)(wo,{$top:!t.title.trim()&&(!f||!!a),$vertical:f,children:p?(0,H.jsx)(Ya,{children:p}):(0,H.jsx)(vo,{item:t})})]}),document.body)}function go({items:e,autoPlay:t=!1}){let n=e.length===1,r=(0,B.useRef)(null),[i,a]=(0,B.useState)(null),[o,s]=(0,B.useState)(0);(0,B.useEffect)(()=>()=>r.current?.pause(),[]),(0,B.useEffect)(()=>{t&&e[0]&&c(e[0])},[]);let c=e=>{if(i===e.id){r.current?.pause(),a(null);return}r.current?.pause();let t=new Audio(ja(e.assetId));t.ontimeupdate=()=>s(t.duration?t.currentTime/t.duration:0),t.onended=()=>{a(null),s(0)},r.current=t,s(0),a(e.id),t.play().catch(()=>{})};return(0,H.jsx)(Mo,{$bare:n,children:e.map(e=>{let t=i===e.id;return(0,H.jsxs)(No,{$bare:n,children:[(0,H.jsxs)(Po,{type:`button`,$on:t,onClick:()=>c(e),"aria-label":t?`暫停 ${qi(e)}`:`播放 ${qi(e)}`,children:[t&&(0,H.jsx)(Fo,{viewBox:`0 0 36 36`,"aria-hidden":!0,children:(0,H.jsx)(`circle`,{cx:`18`,cy:`18`,r:`17`,pathLength:1,strokeDasharray:`${o} 1`})}),(0,H.jsx)(U,{name:t?`pause`:`play`,size:16})]}),(0,H.jsx)(Io,{children:e.title.trim()||e.assetId&&Aa(e.assetId)?.name||``})]},e.id)})})}function _o({item:e}){if(e.kind===`image`&&e.assetId)return(0,H.jsx)(Ao,{children:(0,H.jsx)(`img`,{src:ja(e.assetId),alt:``})});if(e.kind===`video`){let t=e.source===`youtube`?Ua(e.ref):null;if(t)return(0,H.jsx)(Ao,{children:(0,H.jsx)(`img`,{src:`https://img.youtube.com/vi/${t}/hqdefault.jpg`,alt:``})});let n=ja(e.ref);if(n)return(0,H.jsx)(Ao,{children:(0,H.jsx)(`video`,{src:`${n}#t=0.1`,muted:!0,preload:`metadata`,playsInline:!0})})}return(0,H.jsx)(Ao,{$icon:!0,children:(0,H.jsx)(U,{name:Bi[e.kind].icon,size:24})})}function vo({item:e}){switch(e.kind){case`text`:return(0,H.jsx)(Do,{children:e.body});case`image`:case`video`:case`web`:case`rich`:case`audio`:case`jump`:return null}}var yo=V.div`
  position: fixed;
  /* 在浮動膠囊（900）與編輯面板（950）之上、遮罩（1000）之下 */
  z-index: 960;
  /* 直排：由右往左排，行內方向（inline）變成上下，所以上限改看視窗高 */
  ${e=>e.$vertical&&`writing-mode: vertical-rl;`}
  /*
   * 直排的列（文字、聲音、跳轉）高度跟著最長的標題縮，不固定撐到 360——標題常常只有幾個字。
   * 關閉鈕釘在右上角（跟點開後的視窗同一個位置），標題一欄排在它左邊，上下各留 16——標題比內文長時泡泡底也有留白。
   */
  ${e=>e.$vertical&&`& > div { inline-size: auto; min-inline-size: 160px; max-inline-size: min(360px, calc(100vh - 24px)); }
     & > header { padding-top: 16px; padding-bottom: 16px; padding-left: 0; }
     & > header:has(> button) { margin-right: 40px; }
     & > header > button:last-of-type { position: absolute; top: 8px; right: 8px; }`}
  ${e=>{let t=e.$vertical?`100vh`:`100vw`;return e.$wide?`inline-size: max-content; max-inline-size: calc(${t} - 24px);`:e.$vertical?`inline-size: fit-content; max-inline-size: min(360px, calc(${t} - 24px));`:`inline-size: min(360px, calc(${t} - 24px));`}}
  display: flex;
  flex-direction: column;
  background: ${e=>e.theme.surface.raised};
  /* 不畫框線，只靠陰影浮起來（跟其他浮層一樣） */
  /* 圓角要比尖角的內縮（ARROW_INSET）小，尖角才不會畫到弧線上 */
  border-radius: ${e=>e.theme.radius.tile};
  box-shadow: ${e=>e.theme.shadow.float};
`,bo=V.span`
  position: absolute;
  width: 12px;
  height: 12px;
  background: ${e=>e.theme.surface.raised};
  ${e=>{switch(e.$side){case`above`:return`bottom: -6px; left: ${e.$at}px; transform: translateX(-50%) rotate(45deg);`;case`below`:return`top: -6px; left: ${e.$at}px; transform: translateX(-50%) rotate(45deg);`;case`left`:return`right: -6px; top: ${e.$at}px; transform: translateY(-50%) rotate(45deg);`;case`right`:return`left: -6px; top: ${e.$at}px; transform: translateY(-50%) rotate(45deg);`}}}
  pointer-events: none;
`,xo=V.header`
  ${e=>e.$float&&`position: absolute; top: 0; right: 0; z-index: 1;`}
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetXs} ${e=>e.theme.space.insetXs} 0 ${e=>e.theme.space.insetMd};
`,So=V.strong`
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
`,Co=V.button`
  display: grid;
  place-items: center;
  flex: none;
  inline-size: 32px;
  block-size: 32px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${e=>e.theme.icon.secondary};
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.control};

  &:hover { background: ${e=>e.theme.action.ghostBgHover}; color: ${e=>e.theme.icon.default}; }
`,wo=V.div`
  padding: ${e=>e.theme.space.gapXs} ${e=>e.theme.space.insetMd} ${e=>e.theme.space.insetMd};
  /* 內文很長時在泡泡裡捲，不要把泡泡撐到比視窗高 */
  max-block-size: min(60vh, 480px);
  overflow: auto;
  /* 直排的文字泡泡：高度只跟內文與標題走，不吃上面「列」的最小高度（那是給多項清單用的） */
  ${e=>e.$vertical&&`&& { min-inline-size: 0; }`}
  /* 直排：標題欄跟內文之間只留一小段（padding 寫的是實體方向，要換到右邊）；內文頂端跟標題同高（標題列上緣留 16） */
  ${e=>e.$vertical&&`padding-right: ${e.theme.space.gapXs}; padding-top: 16px;`}
  /* 沒標題時：上緣對齊原本標題那一行，右邊讓出按鈕的位置 */
  /* 直排時按鈕仍在右上角，要讓開的是第一行的開頭（上方），不是結尾 */
  ${e=>e.$top&&(e.$vertical?`padding-block-start: ${e.theme.space.insetMd}; padding-inline-start: 48px;`:`padding-block-start: ${e.theme.space.insetMd}; padding-inline-end: 48px;`)}
`,To=V.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapXs};
  padding: ${e=>e.theme.space.insetMd};
  /* 跟下面的清單之間不重複留白；直排時 block-end 是左邊，照樣成立 */
  padding-block-end: 0;
  max-inline-size: 360px;
`,Eo=V.strong`
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
`,Do=V.p`
  margin: 0;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${e=>e.theme.text.primary};
  white-space: pre-wrap;
  /* 一長串沒有空格的英數字（網址、測試字）也要能折行，不然直排時整串衝出泡泡 */
  overflow-wrap: anywhere;
`,Oo=V.div`
  /* 縮圖卡本身維持橫的（圖與標題不轉向）；泡泡直排時它是排在註釋左邊的一欄 */
  writing-mode: horizontal-tb;
  display: flex;
  ${e=>e.$vertical&&`flex-direction: column; max-height: min(70vh, 560px);`}
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetMd};
  overflow: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`,ko=V.button`
  flex: none;
  inline-size: 200px;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  padding: 0;
  border: none;
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
  &:hover img, &:hover video { transform: scale(1.04); }
  &:hover > span:first-child { background: ${e=>e.theme.surface.muted}; }
`,Ao=V.span`
  display: grid;
  place-items: center;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.icon.secondary};
  transition: background 0.15s;
  img, video {
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    transition: transform 0.2s;
    pointer-events: none;
  }
`,jo=V.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,Mo=V.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  inline-size: min(360px, calc(100vw - 24px), calc(100vh - 24px));
  padding: ${e=>e.theme.space.insetMd};
  box-sizing: border-box;
  /* 三段以上在泡泡裡捲，露出下一段的一角，看得出還有 */
  max-block-size: 340px;
  overflow: auto;
  ${e=>e.$bare&&`padding: ${e.theme.space.insetSm} ${e.theme.space.insetMd};`}
`,No=V.div`
  flex: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  min-block-size: 56px;
  /* 用邏輯方向：直排時膠囊是直的，留白在上下兩端 */
  padding-block: 0;
  padding-inline: 12px;
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  border-radius: 999px;
  background: ${e=>e.theme.surface.sunken};
  ${e=>e.$bare&&`min-block-size: 0; padding: 0; border: none; background: transparent;`}
  ${e=>e.$bare&&`button { border: ${e.theme.border.widthDefault} solid ${e.theme.border.subtle}; box-shadow: none; }`}
`,Po=V.button`
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${e=>e.theme.surface.raised};
  box-shadow: ${e=>e.theme.shadow.card};
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
  &:hover { background: ${e=>e.theme.surface.page}; }
`,Fo=V.svg`
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  transform: rotate(-90deg);
  pointer-events: none;
  circle {
    fill: none;
    stroke: ${e=>e.theme.icon.default};
    stroke-width: 2;
  }
`,Io=V.span`
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.primary};
`,Lo=V.button`
  flex: none;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetSm} ${e=>e.theme.space.insetMd};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  border-radius: ${e=>e.theme.radius.tile};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.icon.secondary};
  font: inherit;
  text-align: start;
  cursor: pointer;
  &:hover { background: ${e=>e.theme.surface.sunken}; color: ${e=>e.theme.icon.default}; }
  ${e=>e.$bare&&`border-color: transparent; padding-inline: ${e.theme.space.insetSm};`}
`,Ro=V(U)`
  flex: none;
  ${e=>e.$vertical&&`transform: rotate(180deg);`}
`,zo=V.span`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Bo=V.strong`
  font-size: var(--ds-typography-body-size);
  font-weight: 500;
  color: ${e=>e.theme.text.primary};
`,Vo=V.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${e=>e.$lines};
  overflow: hidden;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${e=>e.theme.text.primary};
`;function Ho(e){try{let t=new URL(e.trim());return t.protocol===`http:`||t.protocol===`https:`?t.href:null}catch{return null}}var Uo=new Set,Wo=new Set,Go=0,Ko=(e,t)=>t?`${e}:${t}`:e;function qo(e){Uo.has(e)||(Uo.add(e),Go+=1,Wo.forEach(e=>e()))}function Jo(){Uo.size!==0&&(Uo.clear(),Go+=1,Wo.forEach(e=>e()))}var Yo=e=>Uo.has(e);function Xo(){return(0,B.useSyncExternalStore)(e=>(Wo.add(e),()=>Wo.delete(e)),()=>Go)}var Zo=[{key:`zhi`,btn:`旨`,name:`段旨`},{key:`xiu`,btn:`修`,name:`修辭`},{key:`ju`,btn:`句`,name:`句型`},{key:`wen`,btn:`問`,name:`提問`}];function Qo(e){let t=new Map,n=0;for(let r of e)for(let e of r.columns)for(let r of e.blocks)r.type!==`text`||!r.paragraph||(n+=1,t.set(r.id,{no:n,startId:r.id}));return t}var $o=`〇一二三四五六七八九`;function es(e){if(e<10)return $o[e];let t=Math.floor(e/10),n=e%10;return(t===1?``:$o[t])+`十`+(n?$o[n]:``)}var ts=(e,t)=>t?es(e):String(e);function ns(e){let t=Zo.filter(t=>e.paraNotes?.[t.key]?.trim());return[...e.readAloud?[{key:`read`,btn:`讀`,name:`朗讀`}]:[],...t,...$i(e).length>0?[{key:`bu`,btn:`補`,name:`補充`}]:[]]}var rs=[{key:`word`,dot:`註`,name:`生字詞`,note:`註釋`},{key:`sentence`,dot:`句`,name:`句子`,note:`句子`}],is=e=>Zo.some(t=>t.key===e),as=e=>is(e.kind)||e.kind===`sentence`?`sentence`:`word`;function os(e){return is(e.kind)?{[e.kind]:e.body}:e.notes??{}}function ss(e){return as(e)===`sentence`?Object.values(os(e)).some(e=>e?.trim()):!!e.body.trim()}function cs(e,t){let n=new Set(e.spans.filter(e=>e.noteId===t&&e.popupId).map(e=>e.popupId));return e.popups.filter(e=>n.has(Yi(e))&&!Ui(e))}var ls=(e,t)=>ss(t)||cs(e,t.id).length>0;function us(e,t){let n=0,r=-1,i=-1;for(let a of e)a.noteId===t&&(r<0&&(r=n),i=n+a.text.length),n+=a.text.length;return r<0?null:{start:r,end:i}}function ds(e){let t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:e=>e.parentElement?.closest(`rt, [data-fn]`)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}),n=[],r=t.nextNode();for(;r;)n.push(r),r=t.nextNode();return n}function fs(e){if(e.nodeType===Node.TEXT_NODE)return e.parentElement?.closest(`rt, [data-fn]`)?0:e.textContent?.length??0;if(e.nodeType===Node.ELEMENT_NODE){let t=e;if(t.closest(`rt, [data-fn]`))return 0;let n=0;for(let e of Array.from(t.childNodes))n+=fs(e);return n}return 0}function ps(e,t,n){let r=0;for(let i of ds(e)){if(i===t)return r+n;r+=i.length}if(t===e){let t=0;for(let r=0;r<n&&r<e.childNodes.length;r+=1)t+=fs(e.childNodes[r]);return t}if(e.contains(t)){let r=0;for(let e=0;e<n&&e<t.childNodes.length;e+=1)r+=fs(t.childNodes[e]);let i=0;for(let n of ds(e)){if(t.contains(n))break;if(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING)i+=n.length;else break}return i+r}return r}function ms(e,t){let n=t,r=ds(e);for(let e of r){if(n<=e.length)return{node:e,offset:n};n-=e.length}let i=r[r.length-1];return i?{node:i,offset:i.length}:{node:e,offset:0}}function hs(e){let t=document.getSelection();if(!t||t.rangeCount===0)return null;let n=t.getRangeAt(0);return e.contains(n.startContainer)?ps(e,n.startContainer,n.startOffset):null}function gs(e,t){let n=document.getSelection();if(!n)return;let{node:r,offset:i}=ms(e,t),a=document.createRange();a.setStart(r,i),a.collapse(!0),n.removeAllRanges(),n.addRange(a)}function _s(e,t,n){let r=document.getSelection();if(!r)return;let i=ms(e,t),a=ms(e,n),o=document.createRange();o.setStart(i.node,i.offset),o.setEnd(a.node,a.offset),r.removeAllRanges(),r.addRange(o)}function vs(e){let t=document.getSelection();if(!t||t.rangeCount===0||t.isCollapsed)return null;let n=t.getRangeAt(0);if(!e.contains(n.startContainer)||!e.contains(n.endContainer))return null;let r=ps(e,n.startContainer,n.startOffset),i=ps(e,n.endContainer,n.endOffset);return r===i?null:{start:Math.min(r,i),end:Math.max(r,i)}}function ys({spans:e,onChange:t,onSelect:n,className:r,style:i,placeholder:a,onFocus:o,...s}){let c=(0,B.useRef)(null),l=(0,B.useRef)(null);(0,B.useEffect)(()=>{let t=c.current;if(!t)return;let n=ui(e);if(n===l.current)return;let r=document.activeElement===t,i=r?vs(t):null,a=r?hs(t):null;t.innerHTML=n,l.current=n,i?_s(t,i.start,i.end):a!==null&&gs(t,a)},[e]);let u=(0,B.useRef)(!1),d=(0,B.useCallback)(()=>{let e=c.current;if(!e||!n)return;let t=document.getSelection();if(t&&t.rangeCount>0&&e.contains(t.getRangeAt(0).startContainer)){let t=vs(e);u.current=t!==null,n(t)}else if(u.current){if(document.activeElement?.closest(`[data-text-popover]`))return;u.current=!1,n(null)}},[n]);return(0,B.useEffect)(()=>{if(n)return document.addEventListener(`selectionchange`,d),()=>document.removeEventListener(`selectionchange`,d)},[n,d]),(0,H.jsx)(`div`,{ref:c,className:r,style:i,contentEditable:!0,suppressContentEditableWarning:!0,role:`textbox`,"aria-multiline":`true`,"data-placeholder":a,...s,onFocus:o,onClick:e=>{let t=c.current,n=e.target.closest(`ruby`);if(!t||!n||!t.contains(n))return;let r=Array.from(n.childNodes).find(e=>e.nodeType===Node.TEXT_NODE);if(!r)return;let i=document.createRange();i.selectNodeContents(r);let a=document.getSelection();a&&(a.removeAllRanges(),a.addRange(i))},onInput:e=>{let n=fi(e.currentTarget);l.current=ui(n),t(n)},onPaste:e=>{e.preventDefault();let t=e.clipboardData.getData(`text/plain`);document.execCommand(`insertText`,!1,t)}})}var bs=In`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.space.gapSm};
  min-block-size: ${e=>e.theme.control.heightSm};
  padding: 0 20px;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.action.primaryBg};
  color: ${e=>e.theme.action.primaryText};
  font: inherit;
  font-size: ${e=>e.theme.typography.bodySmSize};
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;

  svg { flex: none; }
  &:hover:not(:disabled) { background: ${e=>e.theme.action.primaryBgHover}; }
  &:disabled {
    cursor: default;
    background: ${e=>e.theme.action.disabledBg};
    color: ${e=>e.theme.action.disabledText};
  }
`,xs=e=>In`
  container-type: size;
  & > [data-compact] {
    display: none;
  }
  @container ${e} {
    & > [data-full],
    & > [data-alt] {
      display: none;
    }
    & > [data-compact] {
      display: inline-flex;
    }
    & > [data-compact] [data-label],
    & > [data-compact] [data-action] {
      display: none;
    }
    & > [data-compact] [data-kind] {
      display: inline-flex;
    }
    /* 淡灰的小圓鈕：黑色實心的小點看起來像錯誤記號 */
    & > [data-compact] {
      min-block-size: 0;
      padding: 8px;
      border-radius: 999px;
      background: transparent;
      color: ${e=>e.theme.icon.secondary};
    }
    & > [data-compact]:hover:not(:disabled) {
      background: ${e=>e.theme.surface.sunken};
      color: ${e=>e.theme.icon.default};
    }
  }
`,Ss=xs(`(max-width: 200px) or (max-height: 150px)`),Cs=xs(`(max-width: 150px) and (max-height: 150px)`);function ws({label:e,action:t,kind:n,primary:r=!0,...i}){return(0,H.jsxs)(Ts,{"data-compact":!0,type:`button`,title:e,"aria-label":e,$primary:r,...i,children:[(0,H.jsx)(`span`,{"data-label":!0,children:e}),(0,H.jsx)(`span`,{"data-action":!0,children:(0,H.jsx)(U,{name:t,size:16})}),(0,H.jsx)(`span`,{"data-kind":!0,children:(0,H.jsx)(U,{name:n,size:20})})]})}var Ts=V.button`
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  border-radius: 999px;
  background: none;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
  ${e=>e.$primary&&bs}
  /* 直排頁裡也正著看 */
  writing-mode: horizontal-tb;
  white-space: nowrap;
  cursor: pointer;
  & > span { display: inline-flex; }
  & > [data-kind] { display: none; }
  ${e=>!e.$primary&&In`
      &:hover {
        background: ${e.theme.surface.sunken};
        color: ${e.theme.text.primary};
      }
    `}
  &:disabled { cursor: default; }
`,Es=2e3,Ds=new Set;function Os(e){Ds.forEach(t=>t(e))}function ks(){let[e,t]=(0,B.useState)(null),[n,r]=(0,B.useState)(0);return(0,B.useEffect)(()=>{let e=e=>{t(e),r(e=>e+1)};return Ds.add(e),()=>{Ds.delete(e)}},[]),(0,B.useEffect)(()=>{if(e===null)return;let n=setTimeout(()=>t(null),Es);return()=>clearTimeout(n)},[e,n]),e===null?null:(0,pi.createPortal)((0,H.jsx)(js,{role:`status`,"aria-live":`polite`,children:e},n),document.body)}var As=Un`
  from { opacity: 0; transform: translate(-50%, 8px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
`,js=V.div`
  position: fixed;
  inset-block-end: ${e=>e.theme.space.insetLg};
  inset-inline-start: 50%;
  transform: translateX(-50%);
  /* 在對話框（1000）之下、抽屜（950）之上：抽屜開著時提示要看得到 */
  z-index: 980;
  max-inline-size: min(420px, calc(100vw - 32px));
  padding: ${e=>e.theme.space.insetXs} ${e=>e.theme.space.insetMd};
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.inverse};
  color: ${e=>e.theme.text.onInverse};
  font-size: ${e=>e.theme.typography.bodySmSize};
  line-height: ${e=>e.theme.typography.bodySmLineHeight};
  box-shadow: ${e=>e.theme.shadow.card};
  pointer-events: none;
  animation: ${As} 0.18s ease-out;
`,Ms={x:0,y:0,w:1,h:1},Ns=null,Ps=new Set;function Fs(e){Ns=e,Ps.forEach(e=>e())}function Is(){return(0,B.useSyncExternalStore)(e=>(Ps.add(e),()=>Ps.delete(e)),()=>Ns)}var Ls=[`nw`,`n`,`ne`,`e`,`se`,`s`,`sw`,`w`],Rs=.05;function zs({src:e,crop:t,boxW:n,boxH:r,onDone:i,onCancel:a}){let o=t??Ms,s=n/o.w,c=r/o.h,[l,u]=(0,B.useState)(o),d=(0,B.useRef)(null);(0,B.useEffect)(()=>{let e=e=>{e.key===`Escape`?(e.preventDefault(),e.stopPropagation(),a()):e.key===`Enter`&&(e.preventDefault(),f())};return window.addEventListener(`keydown`,e,!0),()=>window.removeEventListener(`keydown`,e,!0)});let f=()=>{i(l.x<=.001&&l.y<=.001&&l.w>=.999&&l.h>=.999?void 0:l)},p=e=>t=>{t.preventDefault(),t.stopPropagation();let n=d.current;if(!n)return;let r=n.getBoundingClientRect().width/(n.offsetWidth||1),i=t.clientX,a=t.clientY,o=l,f=t=>{let n=(t.clientX-i)/r/s,l=(t.clientY-a)/r/c,{x:d,y:f,w:p,h:m}=o;e===`move`?(d=Bs(o.x+n,0,1-o.w),f=Bs(o.y+l,0,1-o.h)):(e.includes(`w`)&&(d=Bs(o.x+n,0,o.x+o.w-Rs),p=o.w+(o.x-d)),e.includes(`e`)&&(p=Bs(o.w+n,Rs,1-o.x)),e.includes(`n`)&&(f=Bs(o.y+l,0,o.y+o.h-Rs),m=o.h+(o.y-f)),e.includes(`s`)&&(m=Bs(o.h+l,Rs,1-o.y))),u({x:d,y:f,w:p,h:m})},p=()=>{window.removeEventListener(`pointermove`,f),window.removeEventListener(`pointerup`,p)};window.addEventListener(`pointermove`,f),window.addEventListener(`pointerup`,p)};return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(Vs,{}),(0,H.jsxs)(Hs,{ref:d,"data-cropper":!0,style:{left:-o.x*s,top:-o.y*c,width:s,height:c},onPointerDown:e=>e.stopPropagation(),children:[(0,H.jsx)(`img`,{src:e,alt:``,draggable:!1}),(0,H.jsx)(Us,{style:{left:l.x*s,top:l.y*c,width:l.w*s,height:l.h*c},onPointerDown:p(`move`),children:Ls.map(e=>(0,H.jsx)(Gs,{$h:e,onPointerDown:p(e)},e))}),(0,H.jsxs)(Ks,{style:{left:l.x*s,top:(l.y+l.h)*c+10,width:l.w*s},children:[(0,H.jsx)(qs,{type:`button`,onClick:a,children:`取消`}),(0,H.jsx)(qs,{type:`button`,onClick:()=>u(Ms),children:`整張`}),(0,H.jsx)(Js,{type:`button`,onClick:f,children:`完成`})]})]})]})}var Bs=(e,t,n)=>Math.max(t,Math.min(n,e)),Vs=Bn`
  body * { pointer-events: none !important; }
  [data-cropper], [data-cropper] * { pointer-events: auto !important; }
  [data-cropper] img { pointer-events: none !important; }
`,Hs=V.div`
  position: absolute;
  z-index: 30;
  overflow: visible;
  img {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    user-select: none;
    pointer-events: none;
  }
`,Us=V.div`
  position: absolute;
  box-sizing: border-box;
  border: 2px solid ${e=>e.theme.surface.raised};
  box-shadow: 0 0 0 9999px rgba(26, 25, 23, 0.5);
  cursor: move;
  touch-action: none;
`,Ws={nw:`left: -7px; top: -7px; cursor: nwse-resize;`,ne:`right: -7px; top: -7px; cursor: nesw-resize;`,se:`right: -7px; bottom: -7px; cursor: nwse-resize;`,sw:`left: -7px; bottom: -7px; cursor: nesw-resize;`,n:`left: calc(50% - 12px); top: -5px; width: 24px; height: 8px; cursor: ns-resize;`,s:`left: calc(50% - 12px); bottom: -5px; width: 24px; height: 8px; cursor: ns-resize;`,e:`right: -5px; top: calc(50% - 12px); width: 8px; height: 24px; cursor: ew-resize;`,w:`left: -5px; top: calc(50% - 12px); width: 8px; height: 24px; cursor: ew-resize;`},Gs=V.span`
  position: absolute;
  inline-size: 14px;
  block-size: 14px;
  border-radius: 999px;
  background: ${e=>e.theme.surface.raised};
  box-shadow: 0 0 0 1px ${e=>e.theme.border.default};
  touch-action: none;
  ${e=>e.$h===`move`?``:Ws[e.$h]}
`,Ks=V.div`
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 6px;
  min-inline-size: 200px;
  writing-mode: horizontal-tb;
`,qs=V.button`
  min-block-size: 32px;
  padding: 0 14px;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  box-shadow: ${e=>e.theme.shadow.card};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
  cursor: pointer;
  &:hover { color: ${e=>e.theme.text.primary}; }
`,Js=V.button`
  ${bs}
  min-block-size: 32px;
  padding: 0 16px;
`;function Ys({block:e,boxStyle:t,onPatch:n,onSelect:r}){let[i,a]=(0,B.useState)(!1),[o,s]=(0,B.useState)(e.aiPrompt??``),c=ja(e.assetId),l=ha(e.assetId),u=Is()===e.id&&!!n,d=async()=>{if(!n||i)return;let t=await Ha(`image/*`);if(t){a(!0);try{let{assetId:r,aspectRatio:i}=await Va(t);n({assetId:r,aspectRatio:i,alt:e.alt||t.name})}finally{a(!1)}}},f=()=>{if(!n)return;let e=o.trim();if(!e){Os(`請先輸入要生成的圖片描述`);return}n({aiPrompt:e}),Os(`原型還沒接上生成模型`)};return(0,H.jsxs)(Xs,{onPointerDown:r,children:[c?(0,H.jsxs)(Zs,{style:t,$cropping:u,children:[(0,H.jsx)(Qs,{src:c,alt:e.alt,style:e.crop?{position:`absolute`,width:`${100/e.crop.w}%`,height:`${100/e.crop.h}%`,left:`${-e.crop.x/e.crop.w*100}%`,top:`${-e.crop.y/e.crop.h*100}%`,maxWidth:`none`,objectFit:`fill`,borderRadius:0}:e.blockSize==null?void 0:{objectFit:`cover`}}),u&&n&&typeof t?.width==`number`&&typeof t?.height==`number`&&(0,H.jsx)(zs,{src:c,crop:e.crop,boxW:t.width,boxH:t.height,onCancel:()=>Fs(null),onDone:e=>{n({crop:e,blockSize:void 0}),Fs(null)}}),l&&(0,H.jsxs)(cc,{href:l.source,target:`_blank`,rel:`noreferrer`,onPointerDown:e=>e.stopPropagation(),title:`${l.author}｜${l.license}`,children:[l.author,` · `,l.license]})]}):(0,H.jsxs)($s,{style:t,children:[n?(0,H.jsxs)(ec,{"data-full":!0,onPointerDown:e=>{r?.(),e.stopPropagation()},children:[(0,H.jsxs)(tc,{children:[(0,H.jsx)(nc,{value:o,placeholder:`描述要生成的圖片`,"aria-label":`描述要生成的圖片`,onChange:e=>s(e.target.value),onBlur:()=>{let t=o.trim();t!==(e.aiPrompt??``)&&n({aiPrompt:t||void 0})},onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),f())}}),(0,H.jsx)(rc,{type:`button`,onClick:f,children:`生成`})]}),(0,H.jsx)(ic,{children:`或`}),(0,H.jsxs)(ac,{type:`button`,onClick:d,disabled:i,children:[i?`讀取中…`:`上傳圖片`,(0,H.jsx)(U,{name:i?`loader`:`upload`,size:16})]})]}):null,n?(0,H.jsx)(ws,{label:i?`讀取中…`:`上傳圖片`,action:i?`loader`:`upload`,kind:`image`,onPointerDown:e=>{r?.(),e.stopPropagation()},onClick:d,disabled:i}):(0,H.jsx)(oc,{"data-alt":!0,children:e.alt||`還沒設定圖片來源`}),n&&e.alt&&!i&&(0,H.jsx)(oc,{"data-alt":!0,children:e.alt})]}),(e.hasCaption??e.caption.trim().length>0)&&(n||e.caption)&&(0,H.jsx)(sc,{contentEditable:!!n,suppressContentEditableWarning:!0,"data-placeholder":`圖說`,onBlur:e=>n?.({caption:e.currentTarget.textContent??``}),children:e.caption})]})}var Xs=V.figure`
  margin: 0;
  display: table;
  inline-size: auto;
`,Zs=V.div`
  position: relative;
  overflow: ${e=>e.$cropping?`visible`:`hidden`};
  border-radius: ${e=>e.theme.radius.field};
`,Qs=V.img`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.media};
`,$s=V.div`
  position: relative;
  display: grid;
  place-items: center;
  ${Ss}
  border-radius: ${e=>e.theme.radius.field};
  border: ${e=>e.theme.border.widthDefault} dashed ${e=>e.theme.border.default};
  background: ${e=>e.theme.surface.page};
  overflow: hidden;
`,ec=V.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
  inline-size: 100%;
  box-sizing: border-box;
  /* 直排時這一組控制項要正著看 */
  writing-mode: horizontal-tb;
`,tc=V.div`
  display: flex;
  align-items: center;
  gap: 6px;
  inline-size: min(280px, 100%);
  min-block-size: 40px;
  padding: 4px 4px 4px 16px;
  box-sizing: border-box;
  border: ${e=>e.theme.border.widthDefault} solid transparent;
  border-radius: ${e=>e.theme.radius.control};
  /* 底色用 muted（#E5E5E5）：放在 #FAFAFA 的空框上，sunken 幾乎看不出來 */
  background: ${e=>e.theme.surface.muted};
  transition: border-color 0.12s, background 0.12s;

  &:hover { border-color: ${e=>e.theme.border.default}; }
  &:focus-within {
    background: ${e=>e.theme.surface.raised};
    border-color: ${e=>e.theme.border.hover};
  }
`,nc=V.input`
  flex: 1;
  min-inline-size: 0;
  font: inherit;
  font-size: var(--ds-typography-body-size);
  border: none;
  background: transparent;
  color: ${e=>e.theme.text.primary};
  outline: none;
  &::placeholder { color: ${e=>e.theme.text.tertiary}; }
`,rc=V.button`
  ${bs}
  flex: none;
  min-block-size: 32px;
  padding: 0 14px;
`,ic=V.span`
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.tertiary};
`,ac=V.button`
  ${bs}
`,oc=V.span`
  position: absolute;
  /* 直排頁裡也橫著寫：檔名、替代文字直排會變成一長條 */
  writing-mode: horizontal-tb;
  inset-block-end: 8px;
  max-inline-size: calc(100% - 16px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.tertiary};
`,sc=V.figcaption`
  display: table-caption;
  caption-side: bottom;
  /* 字級、行高、上方間距都要跟分頁量測（domMeasurer 用 caption 角色 + GAP.attached）一致 */
  margin-block-start: 16px;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${e=>e.theme.text.secondary};
  outline: none;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${e=>e.theme.text.tertiary};
  }
`,cc=V.a`
  position: absolute;
  inset-block-end: 6px;
  inset-inline-end: 6px;
  max-inline-size: calc(100% - 12px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  writing-mode: horizontal-tb;
  padding: 2px 8px;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.inverse};
  color: ${e=>e.theme.text.onInverse};
  font-size: var(--ds-typography-label-size);
  line-height: var(--ds-typography-label-line-height);
  text-decoration: none;
  opacity: 0.6;
  transition: opacity 0.15s;

  &:hover { opacity: 0.9; }
`,lc=null;function uc(e,t){let n=(0,B.useRef)(t);n.current=t;let r=(0,B.useRef)({}).current;(0,B.useEffect)(()=>{if(e)return lc&&lc.id!==r&&lc.close(),lc={id:r,close:()=>n.current()},()=>{lc?.id===r&&(lc=null)}},[e,r])}var dc=V.aside`
  position: fixed;
  top: 8px;
  right: 16px;
  z-index: 1000;
  bottom: 8px;
  inline-size: min(300px, calc(100vw - 32px));
  display: flex;
  flex-direction: column;
  background: ${e=>e.theme.surface.page};
  border-radius: ${e=>e.theme.radius.panel};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  box-sizing: border-box;
`,fc=V.header`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetMd} ${e=>e.theme.space.insetSm} 0 20px;
  flex-shrink: 0;
`,pc=V.strong`
  flex: 1;
  white-space: nowrap;
  font-size: ${e=>e.theme.typography.bodySize};
  line-height: ${e=>e.theme.typography.bodyLineHeight};
  font-weight: 500;
  color: ${e=>e.theme.text.primary};
`,mc=V.button`
  display: inline-flex;
  align-items: center;
  border: none;
  background: transparent;
  color: ${e=>e.theme.action.ghostText};
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.control};
  padding: 8px;
  min-block-size: 40px;

  &:disabled { color: ${e=>e.theme.action.disabledText}; cursor: default; }
  &:not(:disabled):hover { background: ${e=>e.theme.action.ghostBgHover}; }
`,hc=V.div`
  flex: 1;
  overflow-y: auto;
  /* 左右 20：面板只有 300 寬，一列三個下拉（階段、年級、學期）才放得下 */
  /* 上方只留 8：標題列本身已經有 40 高的關閉鈕撐開，再加 16 會讓標題跟第一段離太遠 */
  padding: ${e=>e.theme.space.insetXs} 20px 20px;
  /* 捲軸上下內縮，不要一路畫到底被面板右下角的圓角切掉 */
  &::-webkit-scrollbar-track { margin-top: 4px; margin-bottom: 20px; }
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.stackMd};
`,gc=V.div`
  display: flex;
  justify-content: space-between;
  padding: ${e=>e.theme.space.gapMd} 20px 0;
  flex-shrink: 0;
`,_c=V.button`
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: ${e=>e.$on?700:500};
  position: relative;
  padding: 6px 2px 8px;
  border: none;
  background: transparent;
  /* 底線從中間長出來，換分頁籤時看得出移到哪 */
  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    block-size: 2px;
    border-radius: 2px;
    background: ${e=>e.theme.brand.accentOnLight};
    transform: scaleX(${e=>+!!e.$on});
    transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @media (prefers-reduced-motion: reduce) { &::after { transition: none; } }
  color: ${e=>e.$on?e.theme.brand.accentOnLight:e.theme.text.secondary};
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s;
  &:hover { color: ${e=>e.$on?e.theme.brand.accentOnLight:e.theme.text.primary}; }
  /* 鍵盤選到：不畫框（會把底線框進去），字底下鋪一塊淡灰圓角；跟書櫃的分頁同一款 */
  border-radius: 8px;
  &:focus-visible { outline: none; background: ${e=>e.theme.surface.muted}; }
`,vc=In`
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 400;
  min-block-size: ${e=>e.theme.control.heightSm};
  padding: 0 12px;
  border: ${e=>e.theme.border.widthDefault} solid transparent;
  border-radius: ${e=>e.theme.radius.control};
  /* 底色用 muted（#E5E5E5）：面板是 #FAFAFA，sunken 跟它幾乎同色。輸入時轉白底加框 */
  background: ${e=>e.theme.surface.muted};
  color: ${e=>e.theme.text.primary};
  transition: border-color 0.12s, background 0.12s;

  &::placeholder { color: ${e=>e.theme.text.tertiary}; }
  &:hover { border-color: ${e=>e.theme.border.default}; }
  &:focus {
    outline: none;
    background: ${e=>e.theme.surface.raised};
    border-color: ${e=>e.theme.border.hover};
  }
`,yc=In`
  ${vc}
  padding: 10px 12px;
  border-radius: ${e=>e.theme.radius.card};
  resize: vertical;
`;function bc({block:e,boxStyle:t,onPatch:n,onSelect:r}){let i=e.source===`youtube`?Ua(e.ref):null,a=i?`https://i.ytimg.com/vi/${i}/hqdefault.jpg`:null,o=e.source===`upload`?ja(e.ref):void 0,s=!!a||!!o,c=uh(),[l,u]=(0,B.useState)(!1),d=(0,B.useRef)(null);return(0,B.useEffect)(()=>{if(!l)return;let e=d.current?.closest(`[data-block-id]`)??d.current,t=t=>{e?.contains(t.target)||u(!1)};return window.addEventListener(`pointerdown`,t,!0),()=>window.removeEventListener(`pointerdown`,t,!0)},[l]),!n&&c&&i?(0,H.jsx)(xc,{children:(0,H.jsx)(Tc,{style:t,src:`https://www.youtube-nocookie.com/embed/${i}`,title:e.title||`YouTube 影片`,allow:`encrypted-media; picture-in-picture`,allowFullScreen:!0})}):!n&&o&&c?(0,H.jsx)(xc,{children:(0,H.jsx)($a,{src:o,title:e.title,style:t})}):n&&l&&s?(0,H.jsx)(xc,{ref:d,onPointerDown:r,children:o?(0,H.jsx)($a,{src:o,title:e.title,style:t,autoPlay:!0}):(0,H.jsx)(Tc,{style:t,src:`https://www.youtube-nocookie.com/embed/${i}?autoplay=1`,title:e.title||`YouTube 影片`,allow:`autoplay; encrypted-media; picture-in-picture`,allowFullScreen:!0})}):(0,H.jsx)(xc,{ref:d,onPointerDown:r,children:(0,H.jsxs)(Cc,{style:t,$poster:a,$empty:!s&&!a,children:[s?(0,H.jsx)(wc,{as:n?`button`:`span`,type:n?`button`:void 0,"aria-label":n?`在這裡播放`:void 0,title:n?`在這裡播放`:void 0,$live:!!n,onClick:n?()=>u(!0):void 0,children:(0,H.jsx)(U,{name:`play`,size:24})}):n&&(0,H.jsx)(Sc,{block:e,onPatch:n,onSelect:r}),!s&&!n&&(0,H.jsx)(Ec,{children:`還沒設定影片來源`})]})})}var xc=V.figure`
  margin: 0;
  display: table;
  inline-size: auto;
`;function Sc({block:e,onPatch:t,onSelect:n}){let r=async()=>{let n=await Ha(`video/*`);n&&t({source:`upload`,ref:Ma(n),title:e.title||n.name})},i=e=>{n?.(),e.stopPropagation()};return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(Dc,{"data-full":!0,onPointerDown:i,children:[(0,H.jsx)(Oc,{defaultValue:e.source===`youtube`?e.ref:``,placeholder:`貼上 YouTube 網址`,onBlur:e=>{let n=e.target.value.trim();n&&t({source:`youtube`,ref:n})},onKeyDown:e=>{e.key===`Enter`&&e.currentTarget.blur()}}),(0,H.jsx)(kc,{children:`或`}),(0,H.jsxs)(Ac,{onClick:r,children:[`上傳影片`,(0,H.jsx)(U,{name:`upload`,size:16})]})]}),(0,H.jsx)(ws,{label:`上傳影片`,action:`upload`,kind:`video`,onPointerDown:i,onClick:r})]})}var Cc=V.div`
  position: relative;
  display: grid;
  place-items: center;
  border-radius: ${e=>e.theme.radius.field};
  /* 還沒有來源時跟空的圖片同一種樣子：淡底虛線，不是一塊深灰 */
  border: ${e=>e.theme.border.widthDefault} ${e=>e.$empty?`dashed`:`solid`}
    ${e=>e.$empty?e.theme.border.default:`transparent`};
  background: ${e=>e.$empty?e.theme.surface.page:e.theme.surface.media}
    ${e=>e.$poster?`center / cover url(${e.$poster})`:``};
  overflow: hidden;
  ${e=>e.$empty&&Ss}
`,wc=V.span`
  display: grid;
  place-items: center;
  inline-size: 56px;
  block-size: 56px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.accent};
  box-shadow: 0 6px 18px rgba(26, 25, 23, 0.28);
  cursor: ${e=>e.$live?`pointer`:`default`};
  transition: transform 0.12s;
  ${e=>e.$live&&`&:hover { transform: scale(1.08); }`}
`,Tc=V.iframe`
  display: block;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.inverse};
`,Ec=V.span`
  position: absolute;
  inset-block-end: 8px;
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.secondary};
`,Dc=V.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
  inline-size: 100%;
  /* 直排時這一組控制項要正著看 */
  writing-mode: horizontal-tb;
`,Oc=V.input`
  ${vc}
  font-size: var(--ds-typography-body-size);
  /* 跟圖片的「描述要生成的圖片」同一款灰膠囊：平常無框，打字時白底加灰框，不疊瀏覽器的焦點外圈 */
  inline-size: min(280px, 100%);
  min-block-size: 40px;
  padding: 0 16px;
  box-sizing: border-box;
  &:focus-visible { outline: none; }
`,kc=V.span`
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.tertiary};
`,Ac=V.button`
  ${bs}
`;async function jc(e){try{let t=await fetch(`https://api.microlink.io/?url=${encodeURIComponent(e)}`);if(!t.ok)return null;let n=await t.json();return n.status===`success`&&n.data?.title?.trim()||null}catch{return null}}function Mc(e){return e.trim().replace(/^https?:\/\//i,``).replace(/\/$/,``)}var Nc=null,Pc=new Set,Fc=()=>Pc.forEach(e=>e()),Ic=e=>(Pc.add(e),()=>Pc.delete(e));function Lc(){return(0,B.useSyncExternalStore)(Ic,()=>Nc)}function Rc(e){Nc!==e&&(Nc=e,Fc())}function zc({block:e,boxStyle:t,onPatch:n,onSelect:r}){let i=Lh(),a=Lc(),o=!!(n&&a===e.id),s=(0,B.useRef)(null),[c,l]=(0,B.useState)(``),u=(0,B.useRef)(null),[d,f]=(0,B.useState)(68),p=Bc(e.url),m=Ho(e.url),h=e.chosen!==!1,g=i?.doc.settings.writingMode===`vertical`;(0,B.useEffect)(()=>{let e=u.current;if(!e)return;let t=new ResizeObserver(()=>f((g?e.offsetWidth:e.offsetHeight)||68));return t.observe(e),()=>t.disconnect()}),(0,B.useEffect)(()=>{o&&s.current&&(s.current.focus(),s.current.select())},[o]);let _=t=>{if(!n)return;let r=t.trim();if(r){let t=Mc(r),i=e.title&&e.url&&r===e.url;n({url:r,chosen:!0,...i?{}:{title:t}}),i||jc(r).then(e=>{e&&n({title:e})})}else e.url&&o&&n({url:``});Rc(null)};if(n&&!h){let i=t=>{r?.();let i=c.trim();n({presentation:t,chosen:!0,widthPct:t===`embed`?100:g?void 0:100/3,blockSize:void 0,...i?{url:i,...e.title?{}:{title:Mc(i)}}:{}}),i&&!e.title&&jc(i).then(e=>{e&&n({title:e})})};return(0,H.jsxs)(Vc,{style:t,onPointerDown:r,children:[(0,H.jsx)(ws,{label:`貼上網址`,action:`link`,kind:`globe`,primary:!1,title:`把框拉大就能貼網址`}),(0,H.jsx)(Hc,{"data-full":!0,onPointerDown:e=>{r?.(),e.stopPropagation()},children:(0,H.jsxs)(Uc,{children:[(0,H.jsx)(Kc,{value:c,placeholder:`貼上網址（https://…）`,"aria-label":`貼上網址`,onChange:e=>l(e.target.value)}),(0,H.jsxs)(Wc,{role:`group`,"aria-label":`選擇呈現的方式`,children:[(0,H.jsx)(Gc,{type:`button`,onClick:()=>i(`bookmark`),title:`以小卡片連到網頁`,children:`插入標籤`}),(0,H.jsx)(Gc,{type:`button`,onClick:()=>i(`embed`),title:`把網頁直接放在頁面裡，佔滿一頁`,children:`內嵌網頁`})]})]})})]})}if(e.presentation===`qr`)return(0,H.jsxs)(nl,{style:t,onPointerDown:r,children:[(0,H.jsx)(rl,{children:(0,H.jsx)(U,{name:`zoom-in`,size:24})}),(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`strong`,{children:e.title||`掃描開啟`}),(0,H.jsx)(Xc,{children:p})]})]});if(e.presentation===`embed`){let a=e.title||p||`網頁名稱`,c=!!(n&&(!e.url||o));return(0,H.jsxs)(Qc,{style:t,$empty:c||!m,onPointerDown:r,children:[c?(0,H.jsxs)(el,{onPointerDown:e=>{r?.(),e.stopPropagation()},children:[(0,H.jsx)(U,{name:`globe`,size:24}),(0,H.jsx)(Kc,{ref:s,defaultValue:e.url,placeholder:`貼上網址（https://…）`,"aria-label":`貼上網址`,onPaste:t=>{let n=t.clipboardData.getData(`text`).trim();n&&(!e.url||o)&&(t.preventDefault(),_(n))},onBlur:e=>_(e.currentTarget.value),onKeyDown:e=>{e.key===`Enter`?(e.preventDefault(),_(e.currentTarget.value)):e.key===`Escape`&&(e.preventDefault(),Rc(null))}})]}):m?(0,H.jsx)($c,{src:m,title:a,referrerPolicy:`no-referrer`,$interactive:!n}):(0,H.jsxs)(el,{children:[(0,H.jsx)(U,{name:`globe`,size:24}),(0,H.jsx)(`span`,{children:`尚未設定網址`})]}),n&&i&&(0,H.jsx)(tl,{type:`button`,"aria-label":`刪除內嵌網頁`,title:`刪除`,onPointerDown:e=>e.stopPropagation(),onClick:t=>{t.stopPropagation(),i.dispatch({type:`deleteBlock`,blockId:e.id}),i.select(null)},children:(0,H.jsx)(U,{name:`trash`,size:16,label:`刪除`})}),!c&&!!e.url&&(0,H.jsx)(Zc,{contentEditable:!!n,suppressContentEditableWarning:!0,"data-placeholder":p||`網頁名稱`,onPointerDown:e=>{n&&e.stopPropagation()},onBlur:e=>n?.({title:e.currentTarget.textContent??``}),onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),e.currentTarget.blur())},children:n?e.title:a})]})}if(n&&(!e.url||o))return(0,H.jsx)(Vc,{style:t,onPointerDown:r,children:(0,H.jsx)(Hc,{onPointerDown:e=>{r?.(),e.stopPropagation()},children:(0,H.jsx)(Kc,{ref:s,defaultValue:e.url,placeholder:`貼上網址（https://…）`,"aria-label":`貼上網址`,onPaste:t=>{let n=t.clipboardData.getData(`text`).trim();n&&(!e.url||o)&&(t.preventDefault(),_(n))},onBlur:e=>_(e.currentTarget.value),onKeyDown:e=>{e.key===`Enter`?(e.preventDefault(),_(e.currentTarget.value)):e.key===`Escape`&&(e.preventDefault(),Rc(null))}})})});let v=Math.max(.6,Math.min(2.2,d/68)),y=Math.round(50*v),b=Math.round(y*4/3),x=Math.round(15*v);return(0,H.jsxs)(qc,{ref:u,style:t,$vertical:g,$clickable:!!m,onPointerDown:r,onClick:()=>{!n&&m&&window.open(m,`_blank`,`noopener,noreferrer`)},onDoubleClick:()=>{n&&m&&window.open(m,`_blank`,`noopener,noreferrer`)},title:n&&m?`點兩下圖示開啟連結，點名稱可以改名`:void 0,children:[(0,H.jsx)(Yc,{style:{inlineSize:`${b}px`,blockSize:`${y}px`},children:(0,H.jsx)(U,{name:`globe`,size:24})}),n?(0,H.jsx)(Jc,{style:{fontSize:`${x}px`,cursor:`text`},contentEditable:!0,suppressContentEditableWarning:!0,"data-placeholder":Mc(e.url)||`網頁名稱`,onPointerDown:e=>{r?.(),e.stopPropagation()},onDoubleClick:e=>e.stopPropagation(),onBlur:e=>n({title:(e.currentTarget.textContent??``).trim()}),onKeyDown:e=>{(e.key===`Enter`||e.key===`Escape`)&&(e.preventDefault(),e.currentTarget.blur())},children:e.title}):(0,H.jsx)(Jc,{style:{fontSize:`${x}px`},children:e.title||Mc(e.url)||`連結標題`})]})}function Bc(e){try{return new URL(e).host}catch{return e}}var Vc=V.div`
  position: relative;
  display: grid;
  place-items: center;
  ${Ss}
  border-radius: ${e=>e.theme.radius.field};
  border: ${e=>e.theme.border.widthDefault} dashed ${e=>e.theme.border.default};
  background: ${e=>e.theme.surface.page};
  box-sizing: border-box;
  overflow: hidden;
`,Hc=V.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  inline-size: 100%;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`,Uc=V.div`
  display: grid;
  gap: ${e=>e.theme.space.gapSm};
  inline-size: min(360px, calc(100% - 48px));
`,Wc=V.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space.gapSm};
`,Gc=V.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  min-block-size: 40px;
  padding: 0 12px;
  cursor: pointer;
  white-space: nowrap;
  border-radius: ${e=>e.theme.radius.control};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.secondary};
  transition: border-color 0.12s, color 0.12s;

  /* 滑過是品牌深綠的框與字 */
  &:hover {
    border-color: ${e=>e.theme.border.accent};
    color: ${e=>e.theme.text.accent};
  }
`,Kc=V.input`
  ${vc}
  font-size: var(--ds-typography-body-size);
  /* 跟圖片的「描述要生成的圖片」同一款灰膠囊：平常無框，打字時白底加灰框，不疊瀏覽器的焦點外圈 */
  /* 膠囊幾乎撐滿框寬（左右只留框本身的內距），不要離兩側太遠 */
  inline-size: 100%;
  min-block-size: 40px;
  padding: 0 16px;
  box-sizing: border-box;
  &:focus-visible { outline: none; }
`,qc=V.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${e=>e.$vertical?`12px`:`16px`};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  border-radius: ${e=>e.theme.radius.tile};
  background: ${e=>e.theme.surface.raised};
  padding-block: 8px;
  padding-inline: 8px 16px;
  color: ${e=>e.theme.text.secondary};
  box-sizing: border-box;
  writing-mode: ${e=>e.$vertical?`vertical-rl`:`horizontal-tb`};
  cursor: ${e=>e.$clickable?`pointer`:`default`};
`,Jc=V.div`
  flex: 1;
  min-inline-size: 0;
  color: ${e=>e.theme.text.primary};
  font-size: var(--ds-typography-body-sm-size);
  line-height: 1.4;
  font-weight: 500;
  outline: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${e=>e.theme.text.tertiary};
  }
`,Yc=V.div`
  flex: none;
  display: grid;
  place-items: center;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.icon.secondary};
`,Xc=V.div`
  color: ${e=>e.theme.text.tertiary};
  font-family: ${e=>e.theme.typography.fontDisplay};
  font-size: var(--ds-typography-label-size);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Zc=V.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  max-inline-size: 200px;
  padding: 6px 12px;
  border-radius: ${e=>e.theme.radius.field};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.primary};
  font-size: var(--ds-typography-caption-size);
  line-height: 1.4;
  font-weight: 500;
  box-shadow: none;
  outline: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${e=>e.theme.text.tertiary};
  }
`,Qc=V.div`
  position: relative;
  border: ${e=>e.theme.border.widthDefault} ${e=>e.$empty?`dashed`:`solid`}
    ${e=>e.$empty?e.theme.border.default:e.theme.border.subtle};
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.$empty?e.theme.surface.page:e.theme.surface.sunken};
  box-sizing: border-box;
  writing-mode: horizontal-tb;

  &:hover > ${Zc},
  &:focus-within > ${Zc} {
    opacity: 1;
    visibility: visible;
  }
`,$c=V.iframe`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.raised};
  pointer-events: ${e=>e.$interactive?`auto`:`none`};
`,el=V.div`
  inline-size: 100%;
  block-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  box-sizing: border-box;
  color: ${e=>e.theme.text.secondary};
  font-size: var(--ds-typography-caption-size);
`,tl=V.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 4;
  inline-size: 28px;
  block-size: 28px;
  padding: 0;
  display: grid;
  place-items: center;
  border-radius: ${e=>e.theme.radius.control};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
  transition: background 0.12s, color 0.12s;

  &:hover {
    background: ${e=>e.theme.action.ghostBgHover};
  }
`,nl=V.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${e=>e.theme.text.secondary};
  box-sizing: border-box;
`,rl=V.div`
  display: grid;
  place-items: center;
  inline-size: 72px;
  block-size: 72px;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.sunken};
  flex: none;
`;function il({block:e,boxStyle:t,onPatch:n,onSelect:r}){let[i,a]=(0,B.useState)(!1),o=ja(e.assetId),s=e.page??1,c=async()=>{if(!n||i)return;let t=await Ha(`application/pdf`);if(t){a(!0);try{n({assetId:Ma(t),title:e.title||t.name})}finally{a(!1)}}},l;return l=o?(0,H.jsx)(ll,{style:t,children:(0,H.jsx)(ul,{$editing:!!n,src:`${o}#page=${s}&toolbar=0&navpanes=0&view=FitH`,title:e.title||`PDF`})}):(0,H.jsx)(ol,{style:t,children:n?(0,H.jsxs)(cl,{type:`button`,onClick:c,disabled:i,children:[i?`讀取中…`:`上傳 PDF`,(0,H.jsx)(U,{name:i?`loader`:`upload`,size:16})]}):(0,H.jsx)(sl,{children:`還沒上傳 PDF`})}),(0,H.jsx)(al,{onPointerDown:r,children:l})}var al=V.figure`
  margin: 0;
  display: table;
  inline-size: auto;
`,ol=V.div`
  background: ${e=>e.theme.surface.page};
  border: 2px dashed ${e=>e.theme.border.subtle};
  border-radius: ${e=>e.theme.radius.field};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetMd};
  text-align: center;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`,sl=V.span`
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,cl=V.button`
  ${bs}
`,ll=V.div`
  position: relative;
  overflow: hidden;
  border-radius: ${e=>e.theme.radius.field};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.media};
  box-sizing: border-box;
`,ul=V.iframe`
  display: block;
  pointer-events: ${e=>e.$editing?`none`:`auto`};
  inline-size: 100%;
  block-size: 100%;
  border: none;
`,dl=null;function fl({block:e,boxStyle:t,onPatch:n,onSelect:r}){let i=!!ja(e.assetId),a=!!n&&!e.assetId,[o,s]=(0,B.useState)(!1),c=(0,B.useRef)(()=>s(!1)).current;(0,B.useEffect)(()=>()=>{dl?.stop===c&&(dl.audio.pause(),dl=null)},[c]);let l=t=>{if(t.stopPropagation(),o)return dl?.audio.pause(),dl=null,s(!1);dl&&(dl.audio.pause(),dl.stop());let n=new Audio(ja(e.assetId));n.onended=()=>{dl=null,s(!1)},dl={audio:n,stop:c},s(!0),n.play().catch(()=>{})},u=async t=>{t.stopPropagation();let r=await Ha(`audio/*`);!r||!n||n({assetId:Ma(r),title:e.title||r.name})};return(0,H.jsxs)(pl,{style:t,onPointerDown:r,$empty:a,children:[a&&(0,H.jsx)(ws,{label:`上傳音檔`,action:`upload`,kind:`music`,onPointerDown:e=>{r?.(),e.stopPropagation()},onClick:u}),(0,H.jsx)(ml,{"data-full":!0,$ready:i,disabled:!i,"aria-label":o?`暫停`:`播放`,onPointerDown:e=>i&&e.stopPropagation(),onClick:l,children:(0,H.jsx)(U,{name:o?`pause`:`play`,size:16})}),(0,H.jsx)(hl,{"data-full":!0,children:e.title&&(0,H.jsx)(gl,{children:e.title})}),n&&!e.assetId&&(0,H.jsxs)(_l,{"data-full":!0,onClick:u,children:[`上傳音檔`,(0,H.jsx)(U,{name:`upload`,size:16})]})]})}var pl=V.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  border: ${e=>e.theme.border.widthDefault} ${e=>e.$empty?`dashed`:`solid`}
    ${e=>e.$empty?e.theme.border.default:e.theme.border.subtle};
  border-radius: 999px;
  background: ${e=>e.$empty?e.theme.surface.page:e.theme.surface.sunken};
  ${e=>e.$empty&&Cs}
  /* 只剩一顆（小框）時置中 */
  ${e=>e.$empty&&`@container (max-width: 200px) or (max-height: 150px) { justify-content: center; padding: 0; }`}
  writing-mode: horizontal-tb;
`,ml=V.button`
  display: grid;
  padding: 0;
  border: none;
  cursor: ${e=>e.$ready?`pointer`:`default`};
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  flex: none;
  border-radius: 999px;
  background: ${e=>e.theme.surface.raised};
  box-shadow: ${e=>e.$ready?e.theme.shadow.card:`none`};
  color: ${e=>e.$ready?e.theme.icon.default:e.theme.icon.disabled};
`,hl=V.div`
  flex: 1;
  min-inline-size: 0;
`,gl=V.div`
  font-size: var(--ds-typography-body-sm-size);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,_l=V.button`
  ${bs}
  flex: none;
`;function vl({block:e,boxStyle:t,onSelect:n}){let r=Object.entries(e.params??{});return(0,H.jsxs)(yl,{style:t,onPointerDown:n,children:[(0,H.jsxs)(bl,{children:[(0,H.jsx)(U,{name:`puzzle`,size:20}),(0,H.jsx)(`strong`,{children:e.title||`互動模組`}),e.moduleKind&&(0,H.jsx)(xl,{children:e.moduleKind})]}),r.length>0&&(0,H.jsx)(Sl,{children:r.map(([e,t])=>(0,H.jsxs)(Cl,{children:[e,(0,H.jsx)(`b`,{children:t})]},e))})]})}var yl=V.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border: ${e=>e.theme.border.widthDefault} dashed ${e=>e.theme.border.default};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.sunken};
  writing-mode: horizontal-tb;
`,bl=V.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${e=>e.theme.text.secondary};
  font-size: var(--ds-typography-body-sm-size);
`,xl=V.span`
  font-family: ${e=>e.theme.typography.fontDisplay};
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.text.tertiary};
`,Sl=V.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,Cl=V.span`
  display: inline-flex;
  gap: 6px;
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.text.tertiary};
  background: ${e=>e.theme.surface.raised};
  border-radius: ${e=>e.theme.radius.control};
  padding: 3px 10px;

  b { color: ${e=>e.theme.text.secondary}; }
`,wl={rect:4,roundedRect:20,callout:8},Tl={x:1.12,y:.75};function El(e,t,n){let r=Math.max(0,Math.min(n,e/2,t/2));return[`M ${r},0`,`H ${e-r}`,`A ${r},${r} 0 0 1 ${e},${r}`,`V ${t-r}`,`A ${r},${r} 0 0 1 ${e-r},${t}`,`H ${r}`,`A ${r},${r} 0 0 1 0,${t-r}`,`V ${r}`,`A ${r},${r} 0 0 1 ${r},0`,`Z`].join(` `)}function Dl(e,t,n,r){let i=Math.max(0,Math.min(n,e/2,t/2)),a=r.x*e,o=r.y*t,s=e/2,c=t/2,l=a-s,u=o-c,d=l/(e/2||1),f=u/(t/2||1),p=Math.abs(d)>=Math.abs(f)?d<0?`left`:`right`:f<0?`top`:`bottom`,m=`${a},${o}`;if(p===`left`||p===`right`){let n=t-2*i,r=Math.min(28,Math.max(8,n*.35)),a=l===0?c:c+u*(((p===`left`?0:e)-s)/l),o=Math.min(t-i-r/2,Math.max(i+r/2,a)),d=o-r/2,f=o+r/2;return[`M ${i},0`,`H ${e-i}`,`A ${i},${i} 0 0 1 ${e},${i}`,p===`right`?`V ${d} L ${m} L ${e},${f}`:``,`V ${t-i}`,`A ${i},${i} 0 0 1 ${e-i},${t}`,`H ${i}`,`A ${i},${i} 0 0 1 0,${t-i}`,p===`left`?`V ${f} L ${m} L 0,${d}`:``,`V ${i}`,`A ${i},${i} 0 0 1 ${i},0`,`Z`].filter(Boolean).join(` `)}let h=e-2*i,g=Math.min(28,Math.max(8,h*.35)),_=u===0?s:s+l*(((p===`top`?0:t)-c)/u),v=Math.min(e-i-g/2,Math.max(i+g/2,_)),y=v-g/2,b=v+g/2;return[`M ${i},0`,p===`top`?`H ${y} L ${m} L ${b},0`:``,`H ${e-i}`,`A ${i},${i} 0 0 1 ${e},${i}`,`V ${t-i}`,`A ${i},${i} 0 0 1 ${e-i},${t}`,p===`bottom`?`H ${b} L ${m} L ${y},${t}`:``,`H ${i}`,`A ${i},${i} 0 0 1 0,${t-i}`,`V ${i}`,`A ${i},${i} 0 0 1 ${i},0`,`Z`].filter(Boolean).join(` `)}function Ol(e,t){let n=e/2,r=t/2,i=[];for(let e=0;e<10;e++){let t=e%2==0,a=-Math.PI/2+e*Math.PI/5,o=t?1:.4;i.push(`${n+Math.cos(a)*n*o},${r+Math.sin(a)*r*o}`)}return`M ${i.join(` L `)} Z`}function kl(e,t,n,r=Tl){switch(e){case`circle`:{let e=t/2,r=n/2;return`M ${e},0 A ${e},${r} 0 1 1 ${e},${n} A ${e},${r} 0 1 1 ${e},0 Z`}case`callout`:return Dl(t,n,wl.callout??8,r);case`triangle`:return`M ${t/2},0 L ${t},${n} L 0,${n} Z`;case`star`:return Ol(t,n);default:return El(t,n,wl[e]??4)}}var Al=e=>e.spans??(e.label?[{text:e.label}]:[]);function jl(e){if(!e)return!1;let t=/^#([0-9a-f]{6})$/i.exec(e.trim());if(!t)return!1;let n=parseInt(t[1],16),r=n>>16&255,i=n>>8&255,a=n&255;return(.2126*r+.7152*i+.0722*a)/255<.5}function Ml({block:e,boxStyle:t,onPatch:n,onSelect:r}){let i=Dn(),a=Lh(),o=!!a&&a.selectedBlockId===e.id,s=(0,B.useRef)(null),[c,l]=(0,B.useState)(!1),[u,d]=(0,B.useState)(null),f=typeof t?.width==`number`?t.width:0,p=typeof t?.height==`number`?t.height:0,m=e.strokeWidth??1,h=u??e.tail??Tl,g={w:Math.max(0,f-m),h:Math.max(0,p-m)},_=kl(e.shape,g.w,g.h,h),v=Al(e),y=jl(e.fill)&&(e.opacity??1)>=.5,b={color:e.textColor??(y?i.text.onInverse:i.text.primary),...e.fontFamily?{fontFamily:e.fontFamily}:{},...e.fontSize?{fontSize:e.fontSize,lineHeight:1.5}:{}};return(0,B.useEffect)(()=>{o||l(!1)},[o]),(0,B.useEffect)(()=>{if(!c)return;let e=s.current?.querySelector(`[contenteditable]`);e&&(e.focus(),gs(e,Kr(v)))},[c]),(0,H.jsxs)(Nl,{ref:s,style:t,onPointerDown:r,onDoubleClick:()=>{n&&l(!0)},children:[(0,H.jsx)(Pl,{width:f,height:p,"aria-hidden":`true`,style:{opacity:e.opacity??1},children:(0,H.jsx)(`g`,{transform:`translate(${m/2} ${m/2})`,children:(0,H.jsx)(`path`,{d:_,style:{fill:e.fill??i.surface.raised,stroke:e.stroke??i.text.primary,strokeWidth:m,strokeLinejoin:`round`}})})}),(0,H.jsx)(Fl,{$editing:c,$vertical:!!e.textVertical,style:b,children:n?(0,H.jsx)(Il,{className:`ds-rich`,spans:v,placeholder:c?`輸入文字…`:``,onChange:e=>n({spans:e}),onFocus:()=>{r?.(),l(!0)}}):v.length>0&&(0,H.jsx)(J,{className:`ds-rich`,dangerouslySetInnerHTML:{__html:ui(v)}})}),o&&n&&e.shape===`callout`&&(0,H.jsx)(Ll,{"data-ui":!0,style:{left:h.x*f,top:h.y*p},onPointerDown:e=>{e.preventDefault(),e.stopPropagation();let t=s.current;if(!t||!n)return;let r=t.getBoundingClientRect(),i=t.closest(`[data-layout]`)?.getBoundingClientRect(),a=r.width/(t.offsetWidth||1),o=h,c=e=>{let t=i?Math.max(i.left+8,Math.min(i.right-8,e.clientX)):e.clientX,n=i?Math.max(i.top+8,Math.min(i.bottom-8,e.clientY)):e.clientY,s=(t-r.left)/a/(f||1),c=(n-r.top)/a/(p||1);o={x:Math.max(-1.5,Math.min(2.5,s)),y:Math.max(-1.5,Math.min(2.5,c))},d(o)},l=()=>{window.removeEventListener(`pointermove`,c),window.removeEventListener(`pointerup`,l),window.removeEventListener(`pointercancel`,l),d(null),n({tail:o})};window.addEventListener(`pointermove`,c),window.addEventListener(`pointerup`,l),window.addEventListener(`pointercancel`,l)},"aria-label":`拖曳改變尖角方向`,title:`拖曳改變尖角方向`})]})}var Nl=V.div`
  position: relative;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`,Pl=V.svg`
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  display: block;
`,Fl=V.div`
  position: absolute;
  /* 直排：由右往左排，字還是在圖形正中間 */
  writing-mode: ${e=>e.$vertical?`vertical-rl`:`horizontal-tb`};
  inset: 0;
  display: grid;
  place-items: center;
  padding: 12px;
  overflow: hidden;
  pointer-events: ${e=>e.$editing?`auto`:`none`};
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  text-align: center;
`,Il=V(ys)`
  max-inline-size: 100%;
  max-block-size: 100%;
  overflow: hidden;
  outline: none;
  /* 空的時候也要有一行的高度，插入點才有地方站 */
  min-inline-size: 1em;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${e=>e.theme.text.tertiary};
    pointer-events: none;
  }
`,J=V.div`
  max-inline-size: 100%;
  max-block-size: 100%;
  overflow: hidden;
`,Ll=V.div`
  position: absolute;
  z-index: 7;
  inline-size: 12px;
  block-size: 12px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: ${e=>e.theme.surface.raised};
  border: 2px solid ${e=>e.theme.tool.border};
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.18);
  cursor: move;
  touch-action: none;

  /* 看起來 12、點起來 28——頁面縮小之後 12 在平板上按不到 */
  &::after {
    content: '';
    position: absolute;
    inset: -8px;
  }
  &:hover {
    background: ${e=>e.theme.tool.surface};
  }
`,Y={none:`無`,arrow:`線箭頭`,arrowFilled:`實心箭頭`,dot:`圓點`},X=e=>({x:Math.max(0,Math.min(1,e.x)),y:Math.max(0,Math.min(1,e.y))});function Z({id:e,cap:t,color:n}){if(t===`none`)return null;let r={id:e,markerWidth:10,markerHeight:10,refY:5,markerUnits:`strokeWidth`,orient:`auto-start-reverse`};switch(t){case`arrow`:return(0,H.jsx)(`marker`,{...r,refX:8,children:(0,H.jsx)(`path`,{d:`M1,1 L8,5 L1,9`,style:{fill:`none`,stroke:n,strokeWidth:1.5,strokeLinecap:`round`,strokeLinejoin:`round`}})});case`arrowFilled`:return(0,H.jsx)(`marker`,{...r,refX:9,children:(0,H.jsx)(`path`,{d:`M0,0.5 L9,5 L0,9.5 Z`,style:{fill:n,stroke:`none`}})});case`dot`:return(0,H.jsx)(`marker`,{...r,refX:5,children:(0,H.jsx)(`circle`,{cx:5,cy:5,r:3.5,style:{fill:n,stroke:`none`}})})}}function Rl({block:e,boxStyle:t,onPatch:n,onSelect:r}){let i=Dn(),a=Lh(),o=!!a&&a.selectedBlockId===e.id,s=(0,B.useRef)(null),[c,l]=(0,B.useState)(null),u=typeof t?.width==`number`?t.width:0,d=typeof t?.height==`number`?t.height:0,f=e.strokeWidth??2,p=e.stroke??i.text.primary,m=c?.end===`from`?c.p:e.from,h=c?.end===`to`?c.p:e.to,g=e.startCap??`none`,_=e.endCap??`none`,v=`${e.id}-cap-start`,y=`${e.id}-cap-end`,b=t=>r=>{r.preventDefault(),r.stopPropagation();let i=s.current;if(!i||!n)return;let a=i.getBoundingClientRect(),o=a.width/(i.offsetWidth||1),c=t===`from`?e.from:e.to,f=e=>{c=X({x:(e.clientX-a.left)/o/(u||1),y:(e.clientY-a.top)/o/(d||1)}),l({end:t,p:c})},p=()=>{window.removeEventListener(`pointermove`,f),window.removeEventListener(`pointerup`,p),window.removeEventListener(`pointercancel`,p),l(null),n({[t]:c})};window.addEventListener(`pointermove`,f),window.addEventListener(`pointerup`,p),window.addEventListener(`pointercancel`,p)};return(0,H.jsxs)(zl,{ref:s,style:{...t,opacity:e.opacity??1},onPointerDown:r,children:[(0,H.jsxs)(Bl,{width:u,height:d,"aria-hidden":`true`,children:[(0,H.jsxs)(`defs`,{children:[(0,H.jsx)(Z,{id:v,cap:g,color:p}),(0,H.jsx)(Z,{id:y,cap:_,color:p})]}),(0,H.jsx)(`line`,{x1:m.x*u,y1:m.y*d,x2:h.x*u,y2:h.y*d,markerStart:g===`none`?void 0:`url(#${v})`,markerEnd:_===`none`?void 0:`url(#${y})`,style:{stroke:p,strokeWidth:f,strokeLinecap:`round`,strokeDasharray:e.dashed?`${f*3} ${f*2}`:void 0}})]}),o&&n&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(Vl,{"data-ui":!0,style:{left:m.x*u,top:m.y*d},onPointerDown:b(`from`),"aria-label":`拖曳線段起點`,title:`拖曳線段起點`}),(0,H.jsx)(Vl,{"data-ui":!0,style:{left:h.x*u,top:h.y*d},onPointerDown:b(`to`),"aria-label":`拖曳線段終點`,title:`拖曳線段終點`})]})]})}var zl=V.div`
  position: relative;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`,Bl=V.svg`
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  display: block;
`,Vl=V.div`
  position: absolute;
  z-index: 7;
  inline-size: 12px;
  block-size: 12px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: ${e=>e.theme.surface.raised};
  border: 2px solid ${e=>e.theme.tool.border};
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.18);
  cursor: move;
  touch-action: none;

  /* 看起來 12、點起來 28——頁面縮小之後 12 在平板上按不到 */
  &::after {
    content: '';
    position: absolute;
    inset: -8px;
  }
  &:hover {
    background: ${e=>e.theme.tool.surface};
  }
`;function Hl(e){let t=new Map(e.footnotes.map(e=>[e.id,e]));if(t.size===0)return e;let n=new Set,r=e=>{if(e.type!==`text`||!e.spans.some(e=>e.footnoteRef))return e;let r=e.spans,i=[...e.rangeNotes??[]],a=[],o=0;for(let t of e.spans)o+=t.text.length,t.footnoteRef&&a.push({ref:t.footnoteRef,at:o});let s=Gr(e.spans);for(let{ref:o,at:c}of a){let a=t.get(o);if(!a)continue;let l=a.term,u=s.slice(c-l.length,c)===l?c-l.length:s.lastIndexOf(l,c-l.length);if(u<0)continue;let d=`fn-${e.id}-${o}`;r=Xr(r,u,u+l.length,{noteId:d}),i.push({id:d,kind:`word`,body:a.body}),n.add(o)}return r=r.map(e=>e.footnoteRef&&n.has(e.footnoteRef)?{...e,footnoteRef:void 0}:e).filter(e=>e.text||e.footnoteRef),{...e,spans:r,rangeNotes:i}},i=e.rows.map(e=>({...e,columns:e.columns.map(e=>({...e,blocks:e.blocks.map(r)}))}));return{...e,rows:i,footnotes:e.footnotes.filter(e=>!n.has(e.id))}}function Ul(e){let t=new Map;for(let n of e)for(let e of n.columns)for(let n of e.blocks){if(n.type!==`text`||!n.rangeNotes?.length)continue;let e=new Set(n.rangeNotes.filter(e=>as(e)===`word`).map(e=>e.id));for(let r of n.spans)r.noteId&&e.has(r.noteId)&&!t.has(r.noteId)&&t.set(r.noteId,t.size+1)}return t}function Wl(e){return e>=1&&e<=20?String.fromCodePoint(9312+e-1):e>=21&&e<=35?String.fromCodePoint(12881+e-21):e>=36&&e<=50?String.fromCodePoint(12977+e-36):`(${e})`}var Gl=(0,B.createContext)(new Map);function Kl({rows:e,children:t}){let n=(0,B.useMemo)(()=>Qo(e),[e]),r=(0,B.useMemo)(()=>Ul(e),[e]);return(0,H.jsx)(Gl.Provider,{value:n,children:(0,H.jsx)(Jl.Provider,{value:r,children:t})})}var ql=()=>(0,B.useContext)(Gl),Jl=(0,B.createContext)(new Map);function Yl(){let e=(0,B.useContext)(Jl);return(0,B.useCallback)(t=>{let n=e.get(t);return n?Wl(n):void 0},[e])}var Xl=(0,B.createContext)(null),Zl=()=>(0,B.useContext)(Xl),Ql=class extends B.Component{state={error:null};static getDerivedStateFromError(e){return{error:e}}componentDidUpdate(e){e.children!==this.props.children&&this.state.error&&this.setState({error:null})}render(){return this.state.error?(0,H.jsxs)($l,{role:`alert`,children:[(0,H.jsxs)(`strong`,{children:[this.props.label??`這個元件`,`暫時畫不出來`]}),(0,H.jsx)(`span`,{children:this.state.error.message})]}):this.props.children}},$l=V.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border: ${e=>e.theme.border.widthDefault} dashed ${e=>e.theme.feedback.errorDefault};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.feedback.errorSurface};
  color: ${e=>e.theme.feedback.errorDefault};
  font-size: var(--ds-typography-label-size);
  writing-mode: horizontal-tb;
  word-break: break-word;
`;function eu({open:e,onOpen:t,vertical:n,where:r=`start`,hinted:i=!1}){return(0,H.jsx)(tu,{$open:e||i,$vertical:n,$where:r,children:(0,H.jsxs)(nu,{type:`button`,onClick:t,"aria-label":`新增元件`,$vertical:n,children:[(0,H.jsx)(ru,{$vertical:n}),(0,H.jsx)(iu,{"data-insert-pill":e?`open`:void 0,children:(0,H.jsx)(U,{name:`plus`,size:16})}),(0,H.jsx)(ru,{$vertical:n})]})})}var tu=V.div`
  position: absolute;
  z-index: 5;
  display: flex;
  align-items: center;
  /* 提示本身永遠正著看，不跟著課文轉 */
  writing-mode: horizontal-tb;

  ${e=>e.$vertical?In`
          top: 0;
          bottom: 0;
          width: 20px;
          /* 直排由右往左流：列的開頭在右邊。兩種都離內容 16px */
          ${e.$where===`start`?`right: -26px;`:`left: -26px;`}
        `:In`
          left: 0;
          right: 0;
          height: 20px;
          /* 線離內容 16px，前後一致 */
          ${e.$where===`start`?`top: -26px;`:`bottom: -26px;`}
        `}

  opacity: ${e=>+!!e.$open};
  transition: opacity 0.15s;

  &:hover,
  &:focus-within {
    opacity: 1;
  }
`,nu=V.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapXs};
  inline-size: 100%;
  block-size: 100%;
  flex-direction: ${e=>e.$vertical?`column`:`row`};
`,ru=V.span`
  flex: 1;
  ${e=>e.$vertical?In`
          width: 0;
          border-left: ${e.theme.border.widthSelected} solid ${e.theme.border.hover};
        `:In`
          height: 0;
          border-top: ${e.theme.border.widthSelected} solid ${e.theme.border.hover};
        `}
`,iu=V.span`
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 20px;
  block-size: 20px;
  border-radius: ${e=>e.theme.radius.control};
  /* 照 Figma 自編頁的插入點：白底灰框、深色圖示。藍色只留給選取中的元件外框 */
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.icon.default};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
  box-shadow: 0 0 0 3px ${e=>e.theme.surface.raised};
  transition: transform 0.15s;

  button:hover > & { transform: scale(1.15); }
`,au=In`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  block-size: 72px;
  padding: 0;
  border-radius: ${e=>e.theme.radius.tile};
  border: 2px solid transparent;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  /* 圖示和字同一個顏色、一起轉深：圖示全黑配灰字，看起來像兩個不同的東西疊在一起 */
  color: ${e=>e.theme.text.secondary};
  transition: background 0.12s, border-color 0.12s, color 0.12s;

  /* 字級跟下拉選單、浮動列一樣用 14px，不要獨自小一號 */
  &, span {
    font-size: var(--ds-typography-body-sm-size);
    line-height: 1;
    color: inherit;
  }

  /* 浮層是淡白底（#FAFAFA），滑過要深一階才看得出；字和圖示同時轉深 */
  &:hover {
    background: ${e=>e.theme.surface.muted};
    color: ${e=>e.theme.text.primary};
  }
  &:focus-visible,
  &:active {
    outline: none;
    background: ${e=>e.theme.surface.raised};
    border-color: ${e=>e.theme.border.selected};
    color: ${e=>e.theme.text.primary};
  }
  &:disabled {
    cursor: default;
    background: ${e=>e.theme.surface.sunken};
    color: ${e=>e.theme.action.disabledText};
  }
`,ou={rows:3,cols:4};function su(e=ou.rows,t=ou.cols){return{id:W(`blk`),type:`table`,rows:e,cols:t,cells:Array.from({length:e},()=>Array.from({length:t},()=>``)),hasHeader:!1,preset:`plain`,popups:[]}}var cu=(e,t)=>`${e},${t}`,lu=e=>{let[t,n]=e.split(`,`).map(Number);return[t,n]};function uu(e,t){if(!e)return;let n={};for(let[r,i]of Object.entries(e)){let[e,a]=lu(r),o=t(e,a);o&&(n[cu(o[0],o[1])]=i)}return Object.keys(n).length>0?n:void 0}function du(e){return Array.from({length:e.rows},(t,n)=>Array.from({length:e.cols},(t,r)=>e.cells[n]?.[r]??``))}function fu(e,t,n,r){let i=du(e);return i[t][n]===r?e:(i[t]=i[t].slice(),i[t][n]=r,{...e,cells:i})}function pu(e,t){let n=du(e).map(e=>[...e.slice(0,t),``,...e.slice(t)]),r=pr(e),i=100/(e.cols+1),a=r.map(e=>e*(100-i)/100),o=[...a.slice(0,t),i,...a.slice(t)];return{...e,cols:e.cols+1,cells:n,colWidths:o,cellBg:uu(e.cellBg,(e,n)=>[e,n>=t?n+1:n])}}function mu(e,t){if(e.cols<=1)return e;let n=du(e).map(e=>e.filter((e,n)=>n!==t)),r=pr(e).filter((e,n)=>n!==t);return{...e,cols:e.cols-1,cells:n,colWidths:r,cellBg:uu(e.cellBg,(e,n)=>n===t?null:[e,n>t?n-1:n])}}function hu(e,t,n){if(t===n||t<0||n<0||t>=e.cols||n>=e.cols)return e;let r=Array.from({length:e.cols},(e,t)=>t);r.splice(t,1),r.splice(n,0,t);let i=du(e).map(e=>r.map(t=>e[t])),a=pr(e),o=new Map(r.map((e,t)=>[e,t]));return{...e,cells:i,colWidths:r.map(e=>a[e]),cellBg:uu(e.cellBg,(e,t)=>[e,o.get(t)])}}function gu(e,t){let n=du(e);n.splice(t,0,Array.from({length:e.cols},()=>``));let r=e.rowHeights?yu([...e.rowHeights.slice(0,t),0,...e.rowHeights.slice(t)],e.rows+1):void 0;return{...e,rows:e.rows+1,cells:n,rowHeights:r,cellBg:uu(e.cellBg,(e,n)=>[e>=t?e+1:e,n])}}function _u(e,t){if(e.rows<=1)return e;let n=du(e).filter((e,n)=>n!==t),r=e.rowHeights?.filter((e,n)=>n!==t);return{...e,rows:e.rows-1,cells:n,rowHeights:r,cellBg:uu(e.cellBg,(e,n)=>e===t?null:[e>t?e-1:e,n])}}function vu(e,t,n){if(t===n||t<0||n<0||t>=e.rows||n>=e.rows)return e;let r=Array.from({length:e.rows},(e,t)=>t);r.splice(t,1),r.splice(n,0,t);let i=du(e),a=new Map(r.map((e,t)=>[e,t]));return{...e,cells:r.map(e=>i[e]),rowHeights:e.rowHeights?r.map(t=>e.rowHeights[t]):void 0,cellBg:uu(e.cellBg,(e,t)=>[a.get(e),t])}}function yu(e,t){let n=Array.from({length:t},(t,n)=>e[n]||0);return n.some(e=>e>0)?n:void 0}function bu(e,t,n){let r=Array.from({length:e.rows},(t,n)=>e.rowHeights?.[n]??0);return r[t]=Math.max(0,Math.round(n)),{...e,rowHeights:yu(r,e.rows)}}function xu(e,t){return{...e,colWidths:t}}function Su(e,t,n,r){let i={...e.cellBg};return r?i[cu(t,n)]=r:delete i[cu(t,n)],{...e,cellBg:Object.keys(i).length>0?i:void 0}}function Cu(e,t){return{...e,preset:t,cellBg:void 0,borderColor:void 0,borderWidth:t===`borderless`?0:void 0}}function wu(e,t,n){let r=Math.max(1,t),i=Math.max(1,n),a=e;for(;a.rows<r;)a=gu(a,a.rows);for(;a.rows>r;)a=_u(a,a.rows-1);for(;a.cols<i;)a=pu(a,a.cols);for(;a.cols>i;)a=mu(a,a.cols-1);return a}var Tu=30,Eu=12;function Du({onBack:e,onInsert:t}){let[n,r]=(0,B.useState)(ou),[i,a]=(0,B.useState)(null),o=(e,t)=>Math.max(1,Math.min(t,Math.floor(e)||1)),s=()=>t(n);return(0,H.jsxs)(Ou,{children:[(0,H.jsxs)(ku,{type:`button`,onClick:e,"aria-label":`返回`,children:[(0,H.jsx)(U,{name:`chevron-left`,size:16}),`表格`]}),(0,H.jsxs)(Au,{children:[(0,H.jsx)(ju,{role:`grid`,"aria-label":`表格大小`,onPointerLeave:()=>a(null),children:Array.from({length:64},(e,t)=>{let o=Math.floor(t/8)+1,c=t%8+1,l=o<=n.rows&&c<=n.cols,u=i!==null&&o<=i.rows&&c<=i.cols;return(0,H.jsx)(Mu,{type:`button`,$selected:l,$preview:u,$dimming:i!==null&&l&&!u,"aria-label":`${c} 欄 × ${o} 列`,"aria-pressed":l,onPointerEnter:e=>{a({rows:o,cols:c}),e.buttons===1&&r({rows:o,cols:c})},onPointerDown:()=>r({rows:o,cols:c}),onDoubleClick:s},t)})}),(0,H.jsxs)(Nu,{children:[(0,H.jsxs)(Pu,{children:[(0,H.jsx)(Fu,{type:`number`,min:1,max:Eu,value:n.cols,"aria-label":`欄數`,onChange:e=>r(t=>({...t,cols:o(Number(e.target.value),Eu)}))}),(0,H.jsx)(Iu,{children:`欄`})]}),(0,H.jsxs)(Pu,{children:[(0,H.jsx)(Fu,{type:`number`,min:1,max:Tu,value:n.rows,"aria-label":`列數`,onChange:e=>r(t=>({...t,rows:o(Number(e.target.value),Tu)}))}),(0,H.jsx)(Iu,{children:`列`})]})]})]}),(0,H.jsx)(Lu,{type:`button`,onClick:s,children:`插入表格`})]})}var Ou=V.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
`,ku=V.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  align-self: flex-start;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: ${e=>e.theme.radius.control};
  &:hover { background: ${e=>e.theme.surface.sunken}; color: ${e=>e.theme.text.primary}; }
`,Au=V.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetSm};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.sunken};
`,ju=V.div`
  display: grid;
  grid-template-columns: repeat(${8}, 1fr);
  gap: 4px;
  touch-action: none;
`,Mu=V.button`
  aspect-ratio: 1;
  padding: 0;
  border-radius: 6px;
  cursor: pointer;
  border: 1.5px
    ${e=>e.$preview&&!e.$selected?`dashed`:`solid`}
    ${e=>e.$selected&&!e.$dimming?e.theme.brand.accentOnLight:e.$preview||e.$dimming?e.theme.brand.primaryActive:e.theme.border.subtle};
  background: ${e=>e.$selected&&!e.$dimming?e.theme.brand.primary:e.$preview?e.theme.brand.primaryTintSubtle:e.$dimming?e.theme.brand.primaryTint:e.theme.surface.raised};
  transition: background 0.08s, border-color 0.08s;
`,Nu=V.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space.gapMd};
  align-items: center;
`,Pu=V.label`
  display: flex;
  align-items: center;
  gap: 8px;
  min-inline-size: 0;
`,Fu=V.input`
  flex: 1;
  min-inline-size: 0;
  min-block-size: 40px;
  padding: 0 14px;
  font: inherit;
  font-size: var(--ds-typography-body-size);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  border: ${e=>e.theme.border.widthDefault} solid transparent;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.muted};
  color: ${e=>e.theme.text.primary};
  transition: border-color 0.12s, background 0.12s;

  &:focus {
    outline: none;
    background: ${e=>e.theme.surface.raised};
    border-color: ${e=>e.theme.border.focus};
  }
`,Iu=V.span`
  flex: none;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,Lu=V.button`
  margin-block-start: 2px;
  min-block-size: 44px;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 600;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.action.primaryBg};
  color: ${e=>e.theme.action.primaryText};
  cursor: pointer;
  &:hover { background: ${e=>e.theme.action.primaryBgHover}; }
`,Ru=[{key:`shape`,label:`矩形`,glyph:`rect`},{key:`shape-circle`,label:`圓形`,glyph:`circle`},{key:`shape-rounded`,label:`圓角矩形`,glyph:`rounded`},{key:`shape-callout`,label:`對話框`,glyph:`callout`},{key:`line`,label:`線段`,glyph:`line`}];function zu({glyph:e}){let t={fill:`currentColor`,stroke:`none`};return(0,H.jsxs)(`svg`,{width:20,height:20,viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[e===`rect`&&(0,H.jsx)(`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`2`,...t}),e===`circle`&&(0,H.jsx)(`circle`,{cx:`12`,cy:`12`,r:`9`,...t}),e===`rounded`&&(0,H.jsx)(`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`6`,...t}),e===`callout`&&(0,H.jsx)(`path`,{d:`M5 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-1-1.7V5a2 2 0 0 1 2-2z`,...t}),e===`line`&&(0,H.jsx)(`path`,{d:`M3 12h18`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`})]})}var Bu=[{key:`text`,icon:`type`,label:Xn.text.label},{key:`image`,icon:`image`,label:Xn.image.label},{key:`video`,icon:`video`,label:Xn.video.label},{key:`audio`,icon:`music`,label:Xn.audio.label},{key:`shape`,icon:`shapes`,label:Xn.shape.label},{key:`web`,icon:`globe`,label:Xn.web.label},{key:`table`,icon:`table`,label:Xn.table.label},{key:`pdf`,icon:`file-text`,label:Xn.pdf.label},{key:`library`,icon:`library`,label:`媒體庫`}],Vu=252,Hu=12;function Uu(e,t,n){let r=(document.querySelector(`header`)?.getBoundingClientRect().bottom??0)+Hu,i=(e,t)=>Math.min(Math.max(e,t+Hu),window.innerWidth-t-Hu),a=(e,t)=>Math.min(Math.max(e,t+r),window.innerHeight-t-Hu);if(n){let n=a(e.top+e.height/2,t.height/2),r=e.left>t.width+24;return{top:n,left:r?e.left-Hu:e.right+Hu,transform:r?`translate(-100%, -50%)`:`translate(0, -50%)`}}let o=i(e.left+e.width/2,t.width/2);return e.bottom+t.height+Hu<window.innerHeight?{left:o,top:e.bottom+Hu,transform:`translate(-50%, 0)`}:e.top-Hu-t.height>=r?{left:o,top:e.top-Hu,transform:`translate(-50%, -100%)`}:{left:o,top:window.innerHeight-Hu,transform:`translate(-50%, -100%)`}}function Q({onPick:e,onClose:t,anchorRef:n,vertical:r}){let i=(0,B.useRef)(null),[a,o]=(0,B.useState)(!1),[s,c]=(0,B.useState)(!1),[l,u]=(0,B.useState)({visibility:`hidden`,top:0,left:0});return(0,B.useLayoutEffect)(()=>{let e=()=>{let e=document.querySelector(`[data-insert-pill="open"]`)??n.current,t=i.current;e&&t&&u(Uu(e.getBoundingClientRect(),t.getBoundingClientRect(),r))};return e(),window.addEventListener(`scroll`,e,!0),window.addEventListener(`resize`,e),()=>{window.removeEventListener(`scroll`,e,!0),window.removeEventListener(`resize`,e)}},[n,r,s,a]),(0,pi.createPortal)((0,H.jsx)(Wu,{ref:i,role:`dialog`,"aria-label":`插入元件`,style:l,onKeyDown:e=>e.key===`Escape`&&t(),children:a?(0,H.jsx)(Du,{onBack:()=>o(!1),onInsert:t=>e(`table`,t)}):s?(0,H.jsx)(Gu,{children:Ru.map(t=>(0,H.jsxs)(Ku,{type:`button`,onClick:()=>e(t.key),children:[(0,H.jsx)(zu,{glyph:t.glyph}),(0,H.jsx)(`span`,{children:t.label})]},t.key))},`shapes`):(0,H.jsx)(Gu,{children:Bu.map(t=>(0,H.jsxs)(Ku,{type:`button`,onClick:()=>t.key===`shape`?c(!0):e(t.key),children:[(0,H.jsx)(U,{name:t.icon,size:20}),(0,H.jsx)(`span`,{children:t.label})]},t.key))},`main`)}),document.body)}var Wu=V.div`
  position: fixed;
  z-index: 900;
  inline-size: ${Vu}px;
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${e=>e.theme.surface.page};
  /* 選單共用的浮層陰影：一圈淡灰細線＋貼身與擴散兩層陰影，白紙上才分得出邊界 */
  border-radius: ${e=>e.theme.radius.panel};
  box-shadow: ${e=>e.theme.shadow.popover};
  padding: ${e=>e.theme.space.gapSm};
  writing-mode: horizontal-tb;
`,Gu=V.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${e=>e.theme.space.gapXs};
`,Ku=V.button`
  ${au}
`,qu=[25,100/3,50,200/3,75,100];function Ju(e,t=qu){let n=e,r=3;for(let i of t){let t=Math.abs(e-i);t<r&&(r=t,n=i)}return n}function Yu(e){switch(e.type){case`image`:return`free`;case`video`:return`aspect`;case`audio`:case`table`:return`inline`;case`web`:return e.presentation===`embed`?`free`:`width`;case`shape`:case`line`:case`module`:case`pdf`:return`free`;default:return null}}var Xu=[`ne`,`nw`,`se`,`sw`];function Zu({mode:e,box:t,columnInline:n,vertical:r,onResize:i,omit:a}){let o=e===`width`&&!r?`inline`:e,s=(0,B.useRef)(null),c=r?t.blockSize:t.inlineSize,l=r?t.inlineSize:t.blockSize,u=!r,d=o===`width`?[`e`,`w`,...Xu]:o===`inline`?u?[`e`,`w`,...Xu]:[`n`,`s`,...Xu]:[`n`,`s`,`e`,`w`,...Xu],f=a?d.filter(e=>!a.includes(e)):d,p=e=>t=>{t.preventDefault(),t.stopPropagation();let a=s.current;if(!a)return;let d=a.getBoundingClientRect().width/(a.offsetWidth||1),f=t.clientX,p=t.clientY,m=c/l,h=t=>{let a=(t.clientX-f)/d,s=(t.clientY-p)/d,h=c,g=l;e.includes(`e`)&&(h=c+a),e.includes(`w`)&&(h=c-a),e.includes(`s`)&&(g=l+s),e.includes(`n`)&&(g=l-s);let _=Xu.includes(e),v=u?e===`n`||e===`s`:e===`e`||e===`w`;if(o===`aspect`)e===`n`||e===`s`?h=g*m:g=h/m;else if(_){let e=Math.max(.05,h/c);g=l*e}else if(o===`width`){i({blockSize:Math.max(24,Math.round(h))});return}else o===`inline`&&(u?g=l:h=c);let y=r?g:h,b=r?h:g,x=Math.max(10,Math.min(100,y/n*100)),S=o===`free`&&v?x:Ju(x);if((o===`free`||o===`inline`||o===`width`)&&_){let e=r?l:c,t=r?c:l,i=S/100*n;b=t*Math.max(.05,i/(e||1))}i(o===`free`||(o===`inline`||o===`width`)&&_?{widthPct:S,blockSize:Math.max(24,Math.round(b))}:{widthPct:S})},g=()=>{window.removeEventListener(`pointermove`,h),window.removeEventListener(`pointerup`,g),window.removeEventListener(`pointercancel`,g)};window.addEventListener(`pointermove`,h),window.addEventListener(`pointerup`,g),window.addEventListener(`pointercancel`,g)};return(0,H.jsx)(Qu,{ref:s,style:{width:c,height:l},"data-ui":!0,children:(0,H.jsx)($u,{children:f.map(e=>(0,H.jsx)(ad,{$h:e,onPointerDown:p(e),"aria-label":`調整尺寸`},e))})})}var Qu=V.div`
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  pointer-events: none;
  z-index: 6;
`,$u=V.div`
  position: relative;
  inline-size: 100%;
  block-size: 100%;
  writing-mode: horizontal-tb;
  outline: ${e=>e.theme.border.widthSelected} solid ${e=>e.theme.tool.border};
  outline-offset: -1px;
`,ed=14,td=24,nd=8,rd=e=>Xu.includes(e)?In`width: ${ed}px; height: ${ed}px;`:e===`n`||e===`s`?In`width: ${td}px; height: ${nd}px;`:In`width: ${nd}px; height: ${td}px;`,id=e=>In`
    ${e.includes(`n`)?`top: 0`:e.includes(`s`)?`bottom: 0`:`top: 50%`};
    ${e.includes(`w`)?`left: 0`:e.includes(`e`)?`right: 0`:`left: 50%`};
    transform: translate(${e.includes(`w`)?`-50%`:e.includes(`e`)?`50%`:`-50%`}, ${e.includes(`n`)?`-50%`:e.includes(`s`)?`50%`:`-50%`});
    cursor: ${e===`n`||e===`s`?`ns-resize`:e===`e`||e===`w`?`ew-resize`:e===`ne`||e===`sw`?`nesw-resize`:`nwse-resize`};
  `,ad=V.div`
  position: absolute;
  pointer-events: auto;
  touch-action: none;
  box-sizing: border-box;
  ${e=>rd(e.$h)}
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.18);
  ${e=>id(e.$h)}

  &::after {
    content: '';
    position: absolute;
    inset: -8px;
  }
  &:hover {
    border-color: ${e=>e.theme.border.hover};
  }
`;function od({size:e,max:t,vertical:n,onResize:r}){return(0,H.jsx)(sd,{$vertical:n,onPointerDown:i=>{i.preventDefault(),i.stopPropagation();let a=i.currentTarget.parentElement,o=a?a.getBoundingClientRect().width/(a.offsetWidth||1):1,s=i.clientX,c=i.clientY,l=i=>{let a=n?-(i.clientX-s)/o:(i.clientY-c)/o;r(Math.round(Math.max(24,Math.min(t,e+a))))},u=()=>{window.removeEventListener(`pointermove`,l),window.removeEventListener(`pointerup`,u),window.removeEventListener(`pointercancel`,u)};window.addEventListener(`pointermove`,l),window.addEventListener(`pointerup`,u),window.addEventListener(`pointercancel`,u)},"aria-label":`拖曳調整框的大小`,"data-ui":!0,children:(0,H.jsx)(cd,{$vertical:n})})}var sd=V.div`
  position: absolute;
  z-index: 6;
  touch-action: none;
  ${e=>e.$vertical?In`top: 0; bottom: 0; left: -10px; width: 12px; cursor: ew-resize;`:In`left: 0; right: 0; bottom: -10px; height: 12px; cursor: ns-resize;`}
`,cd=V.span`
  position: absolute;
  box-sizing: border-box;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.18);
  writing-mode: horizontal-tb;
  ${e=>e.$vertical?In`width: ${nd}px; height: ${td}px; top: 50%; left: 2px; transform: translateY(-50%);`:In`width: ${td}px; height: ${nd}px; left: 50%; top: 2px; transform: translateX(-50%);`}
`;function ld(e){let t=30,n=()=>{let r=document.querySelector(`[data-block-id="${e}"]`);r?r.scrollIntoView({block:`nearest`,inline:`nearest`,behavior:`smooth`}):--t>0&&requestAnimationFrame(n)};requestAnimationFrame(n)}function ud({count:e,onClick:t,vertical:n=!1,side:r=`end`}){return t?(0,H.jsxs)(md,{$vertical:n,$side:r,onPointerDown:e=>e.stopPropagation(),onClick:e=>{e.stopPropagation(),t(e.currentTarget)},"aria-label":`補充內容 ${e} 項`,title:`補充內容 ${e} 項`,children:[(0,H.jsx)(U,{name:`blocks`,size:16}),e>1&&(0,H.jsx)(hd,{children:e})]}):(0,H.jsxs)(md,{as:`span`,"aria-hidden":!0,$vertical:n,$side:r,children:[(0,H.jsx)(U,{name:`blocks`,size:16}),e>1&&(0,H.jsx)(hd,{children:e})]})}var dd=`calc(100% + 8px)`,fd=`36px`,pd=(e,t)=>e?t===`end`?`top: ${dd}; right: 0;`:`bottom: ${dd}; right: ${fd};`:t===`end`?`left: ${dd}; top: 0;`:`right: ${dd}; top: ${fd};`,md=V.button`
  position: absolute;
  z-index: 3;
  ${e=>pd(e.$vertical,e.$side)}

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  block-size: 24px;
  min-inline-size: 24px;
  padding: 0 7px;

  border: none;
  border-radius: 999px;
  background: ${e=>e.theme.tool.accent};
  color: ${e=>e.theme.tool.onAccent};
  box-shadow: 0 2px 8px rgba(26, 25, 23, 0.24);
  cursor: pointer;
  /* 直排時整個角標要正著看，不跟著文字轉 */
  writing-mode: horizontal-tb;
  white-space: nowrap;

  &:hover { background: ${e=>e.theme.tool.accentHover}; }

  /*
   * 看起來 24、點起來更大。頁面是整頁縮放的，小螢幕上縮完會點不到，
   * 用看不見的擴張區把觸控目標撐開，視覺尺寸與版面都不受影響。
   */
  &::after {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: inherit;
  }
`,hd=V.span`
  font-size: var(--ds-typography-label-size);
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
`,gd=`遮住：點擊後出現`;function _d({blockId:e,editing:t,live:n}){Xo();let r=Ko(e),[i,a]=(0,B.useState)(!1);return t?(0,H.jsx)($,{"aria-hidden":`true`,title:gd,children:(0,H.jsx)(bd,{children:(0,H.jsx)(U,{name:`eye-off`,size:24})})}):Yo(r)?null:(0,H.jsx)(yd,{as:n?`button`:`div`,type:n?`button`:void 0,"aria-label":n?gd:void 0,$opening:i,onClick:n?e=>{e.stopPropagation(),!i&&(a(!0),window.setTimeout(()=>qo(r),vd+80))}:void 0})}var vd=900,$=V.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  /* 有遮住的感覺：鋪一層半透明的灰白，底下的內容變淡但還認得出來，老師照樣能改 */
  display: grid;
  place-items: center;
  border-radius: 6px;
  background-color: color-mix(in srgb, ${e=>e.theme.surface.muted} 62%, transparent);
  background-image: repeating-linear-gradient(
    135deg,
    color-mix(in srgb, ${e=>e.theme.border.hover} 55%, transparent) 0 1.5px,
    transparent 1.5px 14px
  );
`,yd=V.div`
  position: absolute;
  /* 往外多蓋 4px：圖片自己的圓角比較小，不多蓋一點，四個角會露出底下的顏色 */
  inset: -4px;
  z-index: 2;
  display: grid;
  place-items: center;
  padding: 0;
  border: 1px solid ${e=>e.theme.border.subtle};
  border-radius: 12px;
  background-color: ${e=>e.theme.surface.muted};
  font: inherit;
  cursor: pointer;
  /* 打開時整塊慢慢淡掉，底下的內容慢慢浮現 */
  opacity: ${e=>+!e.$opening};
  transition: opacity ${vd}ms ease, background-color 0.15s;

  &:hover { background-color: ${e=>e.theme.border.default}; }
  &:focus-visible { outline: 2px solid ${e=>e.theme.border.focus}; outline-offset: 4px; }
  @media (prefers-reduced-motion: reduce) { transition: opacity 0.2s; }
`,bd=V.span`
  display: grid;
  place-items: center;
  inline-size: 56px;
  block-size: 56px;
  border-radius: 999px;
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.secondary};
  box-shadow: 0 2px 8px rgba(26, 25, 23, 0.08);
  svg { inline-size: 28px; block-size: 28px; }
`,xd=`rgba(26, 25, 23, 0.45)`;function Sd({title:e,message:t,confirmLabel:n=`確認`,onConfirm:r,onCancel:i}){let a=(0,B.useRef)(null);return(0,B.useEffect)(()=>{a.current?.focus();let e=e=>{e.key===`Escape`&&(e.preventDefault(),i())};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[i]),(0,pi.createPortal)((0,H.jsx)(Cd,{onClick:i,children:(0,H.jsxs)(wd,{role:`dialog`,"aria-modal":`true`,"aria-label":e,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(Td,{children:e}),t&&(0,H.jsx)(Ed,{children:t}),(0,H.jsxs)(Dd,{children:[(0,H.jsx)(Od,{type:`button`,onClick:i,children:`取消`}),(0,H.jsx)(kd,{ref:a,type:`button`,onClick:r,children:n})]})]})}),document.body)}var Cd=V.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: ${xd};
  display: grid;
  place-items: center;
  padding: ${e=>e.theme.space.insetLg};
`,wd=V.div`
  inline-size: min(400px, 100%);
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetLg};
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${e=>e.theme.surface.page};
  border-radius: ${e=>e.theme.radius.panel};
  box-shadow: ${e=>e.theme.shadow.float};
`,Td=V.strong`
  font-size: var(--ds-typography-body-lg-size);
  font-weight: 700;
  color: ${e=>e.theme.text.primary};
`,Ed=V.p`
  margin: 0;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${e=>e.theme.text.secondary};
`,Dd=V.footer`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.space.gapSm};
  margin-block-start: ${e=>e.theme.space.gapMd};
`,Od=V.button`
  border: none;
  background: transparent;
  color: ${e=>e.theme.action.ghostText};
  font-size: var(--ds-typography-label-size);
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.control};
  /* 跟刪除鈕同寬的左右留白：Figma 的 Button 一律是膠囊，兩顆並排形狀要一致 */
  padding: 0 20px;
  min-block-size: ${e=>e.theme.control.heightMd};

  &:hover { background: ${e=>e.theme.action.ghostBgHover}; }
`,kd=V.button`
  border: none;
  background: ${e=>e.theme.action.dangerBg};
  color: ${e=>e.theme.action.dangerText};
  font-size: var(--ds-typography-label-size);
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.control};
  padding: 0 20px;
  min-block-size: ${e=>e.theme.control.heightMd};

  &:hover { background: ${e=>e.theme.action.dangerBgHover}; }
  &:focus-visible { outline-color: ${e=>e.theme.action.dangerFocusRing}; }
`;function Ad(e,t){let n=new Set;for(let r of e.split(/[,，、\s]+/)){let e=r.trim();if(!e)continue;let i=e.match(/^(\d+)\s*[-–—~～－]\s*(\d+)$/);if(i){let e=Number(i[1]),r=Number(i[2]);e>r&&([e,r]=[r,e]);for(let i=Math.max(1,e);i<=Math.min(t,r);i++)n.add(i)}else if(/^\d+$/.test(e)){let r=Number(e);r>=1&&r<=t&&n.add(r)}}return[...n].sort((e,t)=>e-t)}function jd(e){let t=[...new Set(e)].sort((e,t)=>e-t),n=[],r=0;for(;r<t.length;){let e=r;for(;e+1<t.length&&t[e+1]===t[e]+1;)e++;if(e-r>=2)n.push(`${t[r]}-${t[e]}`);else for(let i=r;i<=e;i++)n.push(String(t[i]));r=e+1}return n.join(`, `)}var Md=`modulepreload`,Nd=function(e){return`/textbook-editor/`+e},Pd={},Fd=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=Nd(t,n),t=s(t),t in Pd)return;Pd[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Md,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Id=null;function Ld(){return Id||=Promise.all([Fd(()=>import(`./pdf-B_Pz963Z.js`),[]),Fd(()=>import(`./pdf.worker.min-BiZbdNJm.js`),[])]).then(([e,t])=>(e.GlobalWorkerOptions.workerSrc=t.default,e)),Id}var Rd=new Map;function zd(e){let t=Rd.get(e);return t||(t=Ld().then(t=>t.getDocument(e).promise),Rd.set(e,t)),t}async function Bd(e,t,n,r=`image/png`){let i=await e.getPage(t),a=i.getViewport({scale:1}),o=i.getViewport({scale:n/a.width}),s=document.createElement(`canvas`);s.width=Math.round(o.width),s.height=Math.round(o.height);let c=s.getContext(`2d`);return c.fillStyle=`#fff`,c.fillRect(0,0,s.width,s.height),await i.render({canvasContext:c,viewport:o}).promise,{blob:await new Promise((e,t)=>s.toBlob(n=>n?e(n):t(Error(`畫不出這一頁`)),r,.9)),aspectRatio:a.width/a.height}}var Vd=new Map,Hd=Promise.resolve(),Ud=()=>new Promise(e=>requestAnimationFrame(()=>e()));function Wd(e,t,n=200){let r=`${e}#${t}@${n}`,i=Vd.get(r);if(!i){let a=Hd.then(async()=>{let{blob:r}=await Bd(await zd(e),t,n,`image/jpeg`);return await Ud(),URL.createObjectURL(r)});Hd=a.catch(()=>{}),i=a,Vd.set(r,i)}return i}var Gd=1800;function Kd({asset:e,onBack:t,onClose:n,onImport:r,onEmbed:i}){let a=ja(e.assetId),[o,s]=(0,B.useState)(0),[c,l]=(0,B.useState)([]),[u,d]=(0,B.useState)(``),[f,p]=(0,B.useState)(null);(0,B.useEffect)(()=>{if(!a)return;let e=!0;return zd(a).then(t=>e&&s(t.numPages)).catch(()=>e&&Os(`讀不出這份 PDF`)),()=>{e=!1}},[a]);let m=(0,B.useMemo)(()=>Array.from({length:o},(e,t)=>t+1),[o]),h=o>0&&c.length===o,g=e=>{l(e),d(jd(e))},_=e=>g(c.includes(e)?c.filter(t=>t!==e):[...c,e].sort((e,t)=>e-t));return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(Jd,{children:[(0,H.jsx)(Xd,{onClick:t,"aria-label":`回到 PDF 清單`,children:(0,H.jsx)(U,{name:`chevron-left`,size:24,label:`返回`})}),(0,H.jsx)(Yd,{title:e.name,children:e.name.replace(/\.pdf$/i,``)}),(0,H.jsx)(Xd,{onClick:n,"aria-label":`關閉`,children:(0,H.jsx)(U,{name:`x`,size:24,label:`關閉`})})]}),(0,H.jsxs)(Zd,{children:[(0,H.jsxs)(Qd,{children:[(0,H.jsx)($d,{children:`選取範圍`}),(0,H.jsx)(ef,{children:o>0?`共 ${o} 頁`:`讀取中…`})]}),(0,H.jsxs)(tf,{children:[(0,H.jsxs)(nf,{children:[(0,H.jsx)(rf,{value:u,placeholder:`1, 3, 5-7`,"aria-label":`要匯入的頁碼`,onChange:e=>{d(e.target.value),l(Ad(e.target.value,o))},onBlur:()=>d(jd(c))}),(0,H.jsx)(af,{children:`頁`})]}),(0,H.jsxs)(of,{children:[(0,H.jsx)(`input`,{type:`checkbox`,checked:h,disabled:o===0,onChange:()=>g(h?[]:m)}),`全選`]}),(0,H.jsx)(sf,{children:m.map(e=>(0,H.jsxs)(cf,{type:`button`,$on:c.includes(e),"aria-pressed":c.includes(e),"aria-label":`第 ${e} 頁`,onClick:()=>_(e),children:[(0,H.jsx)(qd,{url:a,page:e}),(0,H.jsx)(uf,{children:e})]},e))})]})]}),(0,H.jsxs)(df,{children:[(0,H.jsx)(pf,{type:`button`,onClick:i,disabled:!!f,title:`不拆頁，整份放進頁面，用翻頁膠囊翻`,children:`嵌入整份`}),(0,H.jsx)(ff,{type:`button`,onClick:async()=>{if(!(!a||c.length===0||f))try{let e=await zd(a),t=[];for(let[n,r]of c.entries()){p(`匯入中 ${n+1} / ${c.length}`);let{blob:i,aspectRatio:a}=await Bd(e,r,Gd);t.push({assetId:Ia(i),aspectRatio:a,page:r})}r(t)}catch{Os(`有一頁畫不出來，請再試一次`)}finally{p(null)}},disabled:c.length===0||!!f,children:f??`匯入圖片`})]})]})}function qd({url:e,page:t}){let[n,r]=(0,B.useState)(null);return(0,B.useEffect)(()=>{let n=!0;return Wd(e,t).then(e=>n&&r(e)).catch(()=>{}),()=>{n=!1}},[e,t]),(0,H.jsx)(lf,{children:n&&(0,H.jsx)(`img`,{src:n,alt:``})})}var Jd=V(fc)`
  padding-inline-start: ${e=>e.theme.space.insetXs};
`,Yd=V(pc)`
  overflow: hidden;
  text-overflow: ellipsis;
`,Xd=mc,Zd=V(hc)`
  gap: ${e=>e.theme.space.gapSm};
`,Qd=V.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`,$d=V.span`
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  color: ${e=>e.theme.text.secondary};
`,ef=V.span`
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.tertiary};
  font-variant-numeric: tabular-nums;
`,tf=V.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetXs};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.sunken};
`,nf=V.label`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
`,rf=V.input`
  flex: 1;
  min-inline-size: 0;
  block-size: ${e=>e.theme.control.heightSm};
  box-sizing: border-box;
  padding: 0 ${e=>e.theme.space.insetSm};
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.primary};
  outline: none;
  &::placeholder { color: ${e=>e.theme.text.placeholder}; }
  &:focus { box-shadow: inset 0 0 0 1px ${e=>e.theme.border.hover}; }
`,af=V.span`
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.secondary};
`,of=V.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding-inline-start: 4px;
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.primary};
  cursor: pointer;
  input {
    inline-size: 16px;
    block-size: 16px;
    margin: 0;
    accent-color: ${e=>e.theme.brand.accentOnLight};
  }
`,sf=V.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space.gapSm};
`,cf=V.button`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2px;
  padding: 4px 4px 2px;
  border: none;
  border-radius: ${e=>e.theme.radius.tile};
  background: ${e=>e.theme.surface.raised};
  outline: 2px solid ${e=>e.$on?e.theme.brand.accentOnLight:`transparent`};
  outline-offset: 0;
  cursor: pointer;
  transition: outline-color 0.1s;
  -webkit-tap-highlight-color: transparent;
  &:hover { outline-color: ${e=>e.$on?e.theme.brand.accentOnLight:e.theme.border.default}; }
  &:focus-visible { outline-color: ${e=>e.theme.brand.accentOnLight}; }
`,lf=V.span`
  display: block;
  aspect-ratio: 2 / 1;
  border-radius: ${e=>e.theme.radius.field};
  overflow: hidden;
  background: ${e=>e.theme.surface.muted};
  img {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    object-position: top;
  }
`,uf=V.span`
  font-size: var(--ds-typography-caption-size);
  line-height: 16px;
  color: ${e=>e.theme.text.secondary};
  font-variant-numeric: tabular-nums;
  text-align: center;
`,df=V.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.gapMd} 20px 20px;
  flex-shrink: 0;
`,ff=V.button`
  ${bs}
  flex: 1 1 0;
  min-inline-size: 0;
  box-sizing: border-box;
`,pf=V.button`
  flex: 1 1 0;
  min-inline-size: 0;
  box-sizing: border-box;
  min-block-size: ${e=>e.theme.control.heightSm};
  padding: 0 16px;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  border-radius: ${e=>e.theme.radius.control};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.secondary};
  cursor: pointer;
  white-space: nowrap;
  &:hover:not(:disabled) { border-color: ${e=>e.theme.border.accent}; color: ${e=>e.theme.text.accent}; }
  &:disabled { color: ${e=>e.theme.text.disabled}; cursor: default; }
`,mf={image:{label:`圖片`,accept:`image/jpeg,image/png,image/gif`,formats:`.jpg .png .gif`,limitMb:10},video:{label:`影片`,accept:`video/mp4,video/webm`,formats:`.mp4 .webm`,limitMb:100},audio:{label:`聲音`,accept:`audio/mpeg,audio/wav,audio/x-wav`,formats:`.mp3 .wav`,limitMb:20},pdf:{label:`PDF`,accept:`application/pdf`,formats:`.pdf`,limitMb:50}},hf=`支援 ${mf.image.formats} 圖片、${mf.video.formats} 影片、${mf.audio.formats} 聲音與 PDF`;async function gf(e){let t=ka(e);if(t===`file`||t===`web`)return{error:`不支援這種檔案。${hf}`};let n=mf[t];if(t!==`pdf`&&!n.accept.split(`,`).includes(e.type))return{error:`不支援這種格式，${n.label}支援 ${n.formats}`};if(e.size>n.limitMb*1024*1024)return{error:`${n.label}請在 ${n.limitMb}MB 以內`};try{let n=Aa(t===`image`?(await Va(e)).assetId:Ma(e));return n?{asset:n}:{error:`讀不到這個檔案`}}catch{return{error:`讀不到這個檔案`}}}var _f=[{kind:`image`,label:`圖片`},{kind:`video`,label:`影片`},{kind:`audio`,label:`聲音`},{kind:`web`,label:`網頁`},{kind:`pdf`,label:`PDF`}],vf=null,yf=new Set;function bf(e){vf=e,yf.forEach(e=>e())}function xf({onChoose:e,onGenerate:t,onImportPdf:n,onUpload:r,onClose:i}){uc(!0,i);let[a,o]=(0,B.useState)(()=>{let e=vf??`image`;return vf=null,e}),[s,c]=(0,B.useState)(null);(0,B.useEffect)(()=>{let e=()=>{vf&&=(o(vf),c(null),null)};return yf.add(e),()=>{yf.delete(e)}},[]),(0,B.useSyncExternalStore)(Ea,Ca);let l=Ta(a),u=kf();(0,B.useEffect)(()=>{let e=e=>{e.key===`Escape`&&i()};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[i]);let d=u.stop;(0,B.useEffect)(()=>()=>d(),[d]);let f=t=>{d(),e(t)};return(0,pi.createPortal)((0,H.jsx)(Af,{role:`dialog`,"aria-label":`媒體庫`,"data-ui":!0,onClick:e=>e.stopPropagation(),onPointerDown:e=>e.stopPropagation(),onPointerMove:e=>e.stopPropagation(),onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation()},children:s?(0,H.jsx)(Kd,{asset:s,onBack:()=>c(null),onClose:i,onImport:e=>{n?.(s,e),c(null)},onEmbed:()=>{f(s),c(null)}}):(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(jf,{children:[(0,H.jsx)(Mf,{children:`媒體庫`}),(0,H.jsx)(Nf,{onClick:i,"aria-label":`關閉`,children:(0,H.jsx)(U,{name:`x`,size:24,label:`關閉`})})]}),(0,H.jsx)(Ff,{role:`tablist`,"aria-label":`素材種類`,children:_f.map(e=>(0,H.jsx)(If,{type:`button`,role:`tab`,"aria-selected":e.kind===a,$on:e.kind===a,onClick:()=>o(e.kind),children:e.label},e.kind))}),(0,H.jsxs)(Pf,{children:[a===`web`?(0,H.jsx)(Ef,{placeholder:`貼上網址`,onAdd:e=>{let t=Ho(e);return t?(La(t),!0):(Os(`請貼完整的網址，要含 https://`),!1)}}):(0,H.jsx)(Tf,{kind:a,onUpload:r,onUploaded:e=>e.kind===`pdf`&&c(e)}),a===`video`&&(0,H.jsx)(Ef,{placeholder:`貼上 YouTube 連結`,onAdd:e=>Ra(e)?!0:(Os(`認不出這個 YouTube 網址`),!1)}),a===`image`&&(0,H.jsx)(Df,{onGenerate:e=>{d(),Os(`原型還沒接上生成模型`),t?.(e)}}),l.length>0&&(()=>{let e=l.filter(e=>e.favorite),t=l.filter(e=>!e.favorite),n=a===`image`?`tile`:`row`,r=e=>{let t=e.map(e=>(0,H.jsx)(wf,{asset:e,layout:n,selected:!1,onActivate:()=>e.kind===`pdf`?c(e):f(e),preview:e.kind===`audio`?u:void 0},e.assetId));return n===`tile`?(0,H.jsx)(Yf,{children:t}):(0,H.jsx)(Xf,{children:t})},i=a===`pdf`?`已上傳 PDF`:e.length>0?`全部`:null;return(0,H.jsxs)(H.Fragment,{children:[e.length>0&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(Lf,{children:`收藏`}),r(e)]}),t.length>0&&(0,H.jsxs)(H.Fragment,{children:[i&&(0,H.jsx)(Lf,{children:i}),r(t)]})]})})()]})]})}),document.body)}function Sf({asset:e}){if(e.kind===`image`)return(0,H.jsx)(Zf,{style:{backgroundImage:`url(${ja(e.assetId)})`}});if(e.kind===`video`){if(e.source===`youtube`){let t=Ua(e.url??``);return(0,H.jsx)(Zf,{style:t?{backgroundImage:`url(https://i.ytimg.com/vi/${t}/mqdefault.jpg)`}:void 0,children:(0,H.jsx)(Qf,{children:(0,H.jsx)(to,{name:`play`,size:16})})})}let t=ja(e.assetId);return(0,H.jsx)(Zf,{children:t&&(0,H.jsx)(`video`,{src:`${t}#t=0.1`,preload:`metadata`,muted:!0,playsInline:!0})})}return e.kind===`pdf`?(0,H.jsx)(Cf,{asset:e}):(0,H.jsx)(Zf,{$icon:!0,children:(0,H.jsx)(U,{name:e.kind===`audio`?`music`:e.kind===`web`?`globe`:`file-text`,size:24})})}function Cf({asset:e}){let[t,n]=(0,B.useState)(null),r=ja(e.assetId);return(0,B.useEffect)(()=>{if(!r)return;let e=!0;return Wd(r,1,160).then(t=>e&&n(t)).catch(()=>{}),()=>{e=!1}},[r]),(0,H.jsx)(Zf,{$icon:!0,children:t?(0,H.jsx)(`img`,{src:t,alt:``}):(0,H.jsx)(U,{name:`file-text`,size:24})})}function wf({asset:e,layout:t,selected:n,onActivate:r,preview:i}){let[a,o]=(0,B.useState)(!1),[s,c]=(0,B.useState)(!1),l=(0,B.useRef)(null);(0,B.useEffect)(()=>{if(!a)return;let e=e=>{l.current?.contains(e.target)||o(!1)};return window.addEventListener(`pointerdown`,e,!0),()=>window.removeEventListener(`pointerdown`,e,!0)},[a]);let u=e.kind===`pdf`?e.name.replace(/\.pdf$/i,``):e.name,d=!!i&&i.current===e.assetId&&i.playing,f=!!i&&i.current===e.assetId;return(0,H.jsxs)(tp,{ref:l,$layout:t,$selected:n,children:[(0,H.jsxs)(np,{type:`button`,$layout:t,onClick:r,title:e.url??e.name,children:[e.kind===`audio`?(0,H.jsx)(lp,{}):(0,H.jsx)(Sf,{asset:e}),(0,H.jsxs)(rp,{children:[(0,H.jsx)(ip,{$layout:t,children:u}),f&&i&&(0,H.jsxs)(up,{children:[Of(i.time),` / `,Of(i.duration)]})]})]}),i&&(0,H.jsxs)(cp,{type:`button`,$layout:t,$on:d,onClick:()=>i.toggle(e.assetId,ja(e.assetId)),"aria-label":d?`暫停試聽`:`試聽`,title:`試聽`,children:[f&&(0,H.jsxs)(dp,{viewBox:`0 0 36 36`,"aria-hidden":`true`,children:[(0,H.jsx)(`circle`,{cx:`18`,cy:`18`,r:`16`,pathLength:`100`}),(0,H.jsx)(`circle`,{cx:`18`,cy:`18`,r:`16`,pathLength:`100`,strokeDasharray:`${i.duration>0?i.time/i.duration*100:0} 100`})]}),(0,H.jsx)(to,{name:d?`pause`:`play`,size:16})]}),(0,H.jsx)(ap,{type:`button`,$layout:t,"aria-label":`更多`,"aria-expanded":a,onClick:()=>o(e=>!e),children:(0,H.jsx)(U,{name:`more-vertical`,size:16})}),a&&(0,H.jsxs)(op,{role:`menu`,$layout:t,children:[(0,H.jsxs)(sp,{type:`button`,role:`menuitem`,onClick:()=>{Na(e.assetId),o(!1)},children:[(0,H.jsx)(U,{name:`bookmark`,size:16}),e.favorite?`移除收藏`:`收藏`]}),(0,H.jsxs)(sp,{type:`button`,role:`menuitem`,$danger:!0,onClick:()=>{o(!1),c(!0)},children:[(0,H.jsx)(U,{name:`trash`,size:16}),`刪除`]})]}),s&&(0,H.jsx)(Sd,{title:`刪除${$f[e.kind]??``}「${ep(e.name)}」？`,confirmLabel:`刪除`,onConfirm:()=>{f&&i?.stop(),Pa(e.assetId),c(!1)},onCancel:()=>c(!1)})]})}function Tf({kind:e,onUpload:t,onUploaded:n}){let r=mf[e],[i,a]=(0,B.useState)(!1),[o,s]=(0,B.useState)(!1),c=async r=>{if(r){a(!0);try{if(t&&ka(r)!==`pdf`){await t(r);return}let i=await gf(r);`error`in i?Os(i.error):n?.(i.asset),!(`error`in i)&&i.asset.kind!==e&&Os(`這是${mf[i.asset.kind]?.label??`別種檔案`}，已放進對應的分頁`)}finally{a(!1)}}};return(0,H.jsxs)(Rf,{type:`button`,$over:o,disabled:i,"aria-busy":i,"aria-label":`上傳${r.label}：拖曳或選取檔案`,onClick:async()=>{i||await c(await Ha(r.accept))},onDragOver:e=>{i||!e.dataTransfer.types.includes(`Files`)||(e.preventDefault(),s(!0))},onDragLeave:()=>s(!1),onDrop:e=>{e.preventDefault(),s(!1),c(e.dataTransfer.files[0]??null)},children:[(0,H.jsxs)(zf,{$over:o,$busy:i,children:[(0,H.jsx)(U,{name:`upload`,size:20}),i&&(0,H.jsxs)(Bf,{viewBox:`0 0 36 36`,"aria-hidden":`true`,children:[(0,H.jsx)(`circle`,{cx:`18`,cy:`18`,r:`16`,pathLength:`100`}),(0,H.jsx)(`circle`,{cx:`18`,cy:`18`,r:`16`,pathLength:`100`})]})]}),(0,H.jsx)(Vf,{$busy:i,children:i?`上傳中…`:o?`放開就上傳`:`拖曳或選取檔案`}),!i&&(0,H.jsxs)(Hf,{children:[r.formats,`，`,r.limitMb,` MB 以內`]})]})}function Ef({placeholder:e,onAdd:t}){let[n,r]=(0,B.useState)(``),i=()=>{let e=n.trim();e&&t(e)&&r(``)};return(0,H.jsxs)(Wf,{children:[(0,H.jsx)(Gf,{value:n,placeholder:e,"aria-label":e,onChange:e=>r(e.target.value),onKeyDown:e=>{e.key===`Enter`&&i()}}),(0,H.jsx)(Uf,{type:`button`,onClick:i,disabled:!n.trim(),children:`加入`})]})}function Df({onGenerate:e}){let[t,n]=(0,B.useState)(``),r=()=>{let r=t.trim();r&&(e(r),n(``))};return(0,H.jsxs)(Kf,{children:[(0,H.jsx)(qf,{value:t,placeholder:`描述要生成的圖片`,"aria-label":`描述要生成的圖片`,rows:3,onChange:e=>n(e.target.value),onKeyDown:e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),r())}}),(0,H.jsx)(Jf,{children:(0,H.jsx)(Uf,{type:`button`,onClick:r,disabled:!t.trim(),children:`生成`})})]})}var Of=e=>((!Number.isFinite(e)||e<0)&&(e=0),`${String(Math.floor(e/60)).padStart(2,`0`)}:${String(Math.floor(e%60)).padStart(2,`0`)}`);function kf(){let e=(0,B.useRef)(null),[t,n]=(0,B.useState)(null),[r,i]=(0,B.useState)(!1),[a,o]=(0,B.useState)(0),[s,c]=(0,B.useState)(0),l=()=>{if(e.current)return e.current;let t=new Audio;return t.addEventListener(`play`,()=>i(!0)),t.addEventListener(`pause`,()=>i(!1)),t.addEventListener(`ended`,()=>i(!1)),t.addEventListener(`timeupdate`,()=>o(t.currentTime)),t.addEventListener(`loadedmetadata`,()=>c(t.duration)),t.addEventListener(`durationchange`,()=>c(t.duration)),e.current=t,t};return{current:t,playing:r,time:a,duration:s,toggle(e,r){if(!r)return;let i=l();if(t===e){i.paused?i.play().catch(()=>{}):i.pause();return}i.src=r,n(e),o(0),c(0),i.play().catch(()=>{})},seek(t){let n=e.current;!n||!Number.isFinite(n.duration)||(n.currentTime=Math.max(0,Math.min(1,t))*n.duration,o(n.currentTime))},stop:(0,B.useRef)(()=>{let t=e.current;t&&(t.pause(),t.removeAttribute(`src`),t.load())}).current}}var Af=dc,jf=fc,Mf=pc,Nf=mc,Pf=hc,Ff=gc,If=_c,Lf=V.span`
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  color: ${e=>e.theme.text.secondary};
`,Rf=V.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* 間距各自定：圖示和標題隔 12，標題和格式只隔 2——標題與格式是同一組說明，要比跟圖示更靠近 */
  gap: 0;
  inline-size: 100%;
  /* 跟下面的「描述要生成的圖片」框同高、同圓角，上下兩塊對齊 */
  block-size: 128px;
  padding: ${e=>e.theme.space.insetMd};
  box-sizing: border-box;
  /* 拖檔進來（放開就上傳）：虛線變粗、變品牌深綠 */
  border: ${e=>e.$over?`2px`:`1.5px`} dashed ${e=>e.$over?e.theme.brand.accentOnLight:e.theme.border.default};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.raised};
  font: inherit;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;

  &:hover:not(:disabled) { border-color: ${e=>e.$over?e.theme.brand.accentOnLight:e.theme.border.hover}; }
  &:disabled { cursor: progress; }
`,zf=V.span`
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 40px;
  block-size: 40px;
  padding: 0;
  margin-block-end: 12px;
  border-radius: ${e=>e.$busy?`999px`:e.theme.radius.tile};
  background: ${e=>e.$over?e.theme.brand.primary:e.theme.surface.sunken};
  color: ${e=>e.theme.text.primary};
  transition: background 0.15s;
  ${Rf}:hover:not(:disabled) & { background: ${e=>e.$over?e.theme.brand.primary:e.theme.surface.muted}; }
`,Bf=V.svg`
  position: absolute;
  inset: -5px;
  inline-size: calc(100% + 10px);
  block-size: calc(100% + 10px);
  transform: rotate(-90deg);
  pointer-events: none;
  circle {
    fill: none;
    stroke-width: 2.5;
    stroke: ${e=>e.theme.surface.muted};
  }
  circle + circle {
    stroke: ${e=>e.theme.brand.accentOnLight};
    stroke-linecap: round;
    stroke-dasharray: 0 100;
    animation: ds-upload-progress ${Oa}ms ease-out forwards;
  }
  @keyframes ds-upload-progress { to { stroke-dasharray: 100 100; } }
`,Vf=V.span`
  font-size: var(--ds-typography-body-sm-size);
  line-height: 1.4;
  font-weight: ${e=>e.$busy?400:500};
  color: ${e=>e.theme.text.primary};
`,Hf=V.span`
  margin-block-start: 2px;
  font-size: var(--ds-typography-caption-size);
  line-height: 1.4;
  color: ${e=>e.theme.text.tertiary};
`,Uf=V.button`
  ${bs}
  flex: none;
  min-block-size: 32px;
  padding: 0 14px;
  font-weight: 400;
`,Wf=V.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 4px 4px 14px;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.muted};
  box-shadow: inset 0 0 0 1px transparent;
  transition: background 0.12s, box-shadow 0.12s;
  &:focus-within {
    background: ${e=>e.theme.surface.raised};
    box-shadow: inset 0 0 0 1px ${e=>e.theme.border.hover};
  }

  ${Uf} { margin: 0; }
`,Gf=V.input`
  flex: 1;
  min-inline-size: 0;
  font: inherit;
  font-size: var(--ds-typography-caption-size);
  border: none;
  background: transparent;
  color: ${e=>e.theme.text.primary};
  min-block-size: 32px;
  padding: 0;
  outline: none;
  &:focus-visible { outline: none; }
  &::placeholder { color: ${e=>e.theme.text.placeholder}; }
`,Kf=V.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: ${e=>e.theme.space.insetSm} ${e=>e.theme.space.insetSm} ${e=>e.theme.space.insetXs} 14px;
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.muted};
  box-shadow: inset 0 0 0 1px transparent;
  transition: background 0.12s, box-shadow 0.12s;
  &:focus-within {
    background: ${e=>e.theme.surface.raised};
    box-shadow: inset 0 0 0 1px ${e=>e.theme.border.hover};
  }
  block-size: 128px;
  box-sizing: border-box;
`,qf=V.textarea`
  flex: 1;
  min-block-size: 0;
  inline-size: 100%;
  resize: none;
  padding: 0;
  font: inherit;
  font-size: var(--ds-typography-caption-size);
  line-height: 1.5;
  border: none;
  background: transparent;
  color: ${e=>e.theme.text.primary};
  outline: none;
  &:focus-visible { outline: none; }
  &::placeholder { color: ${e=>e.theme.text.placeholder}; }
`,Jf=V.div`
  display: flex;
  justify-content: flex-end;
  ${Uf} { margin: 0; }
`,Yf=V.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space.gapSm};
`,Xf=V.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
`,Zf=V.div`
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: ${e=>e.theme.radius.tile};
  background: ${e=>e.theme.surface.media} center / cover no-repeat;
  display: grid;
  place-items: center;
  overflow: hidden;
  color: ${e=>e.theme.icon.secondary};
  ${e=>e.$icon&&`background: ${e.theme.surface.sunken};`}

  video,
  img {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    object-position: top;
    pointer-events: none;
  }
`,Qf=V.span`
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 20px;
  border-radius: 6px;
  background: ${`#FF0033`};
  color: #fff;
  svg path, svg polygon { fill: currentColor; }
`,$f={image:`圖片`,video:`影片`,audio:`聲音`,web:`網頁`,pdf:`PDF`},ep=e=>e.replace(/\.[a-z0-9]{2,5}$/i,``),tp=V.div`
  position: relative;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: ${e=>e.$layout===`row`?e.theme.space.insetXs:`6px`};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.raised};
  /* 平常就留一圈透明框，滑過時框線變灰才不會推動版面 */
  border: ${e=>e.theme.border.widthDefault} solid transparent;
  transition: border-color 0.12s, box-shadow 0.12s;
  ${e=>e.$selected&&`border-color: ${e.theme.brand.accentOnLight}; box-shadow: 0 0 0 1px ${e.theme.brand.accentOnLight};`}

  /* 滑過：維持白底，加灰框與淡陰影浮起來（乙練 2026-10-22 選 B；淡灰底跟面板 #FAFAFA 分不出來） */
  &:hover {
    border-color: ${e=>e.theme.border.default};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }
  /* 按下去：同一圈框線變深綠（1px 框＋1px 內陰影＝2px），不另外疊外框 */
  &:has(> button:first-child:active) {
    border-color: ${e=>e.theme.brand.accentOnLight};
    box-shadow: 0 0 0 1px ${e=>e.theme.brand.accentOnLight};
  }
`,np=V.button`
  display: flex;
  flex-direction: ${e=>e.$layout===`row`?`row`:`column`};
  align-items: ${e=>e.$layout===`row`?`center`:`stretch`};
  gap: ${e=>e.$layout===`row`?e.theme.space.gapMd:`6px`};
  padding: 0;
  border: none;
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
  min-inline-size: 0;
  outline: none;

  /* 一列一張時縮圖固定 64×48，字在右邊 */
  ${e=>e.$layout===`row`&&`> :first-child { flex: none; inline-size: 64px; aspect-ratio: auto; block-size: 48px; border-radius: 10px; }`}
`,rp=V.span`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-inline-end: 24px;
`,ip=V.span`
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  line-height: 18px;
  color: ${e=>e.theme.text.primary};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${e=>e.$layout===`row`?2:1};
  word-break: break-all;
`,ap=V.button`
  position: absolute;
  /* 一列一張時在卡片右側垂直置中；縮圖格時浮在縮圖右上角 */
  inset-block-start: ${e=>e.$layout===`row`?`calc(50% - 14px)`:`10px`};
  inset-inline-end: ${e=>e.$layout===`row`?`6px`:`10px`};
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 28px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${e=>e.$layout===`tile`?e.theme.surface.raised:`transparent`};
  color: ${e=>e.theme.icon.secondary};
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.12s, background 0.12s;

  ${tp}:hover &, &[aria-expanded='true'], &:focus-visible { opacity: 1; outline: none; }
  &:hover { background: ${e=>e.theme.surface.muted}; color: ${e=>e.theme.icon.default}; }
`,op=V.div`
  position: absolute;
  z-index: 5;
  inset-block-start: ${e=>e.$layout===`row`?`calc(50% + 18px)`:`42px`};
  inset-inline-end: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px;
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.page};
  box-shadow: ${e=>e.theme.shadow.popover};
`,sp=V.button`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  min-block-size: 36px;
  padding: 0 14px 0 10px;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: transparent;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  white-space: nowrap;
  color: ${e=>e.$danger?e.theme.feedback.errorDefault:e.theme.text.primary};
  cursor: pointer;
  &:hover { background: ${e=>e.theme.surface.muted}; }
`,cp=V.button`
  position: absolute;
  inset-block-start: calc(50% - 18px);
  inset-inline-start: 8px;
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
  outline: none;
  &:hover { background: ${e=>e.theme.surface.muted}; }
`,lp=V.span`
  flex: none;
  inline-size: 36px;
  block-size: 48px;
`,up=V.span`
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.tertiary};
  font-variant-numeric: tabular-nums;
`,dp=V.svg`
  position: absolute;
  inset: -4px;
  inline-size: calc(100% + 8px);
  block-size: calc(100% + 8px);
  transform: rotate(-90deg);
  pointer-events: none;
  circle {
    fill: none;
    stroke-width: 2.5;
    stroke: ${e=>e.theme.surface.muted};
  }
  circle + circle {
    stroke: ${e=>e.theme.brand.accentOnLight};
    stroke-linecap: round;
    transition: stroke-dasharray 0.25s linear;
  }
`,fp=`data:image/svg+xml,%3csvg%20width='72'%20height='48'%20viewBox='0%200%2072%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='tablePreview'%3e%3cg%20clip-path='url(%23clip0_0_64)'%3e%3crect%20width='72'%20height='48'%20rx='8'%20fill='white'/%3e%3cpath%20id='Vector'%20d='M72%200H0V12H72V0Z'%20fill='%23F0FF62'/%3e%3cg%20id='Vector_2'%3e%3c/g%3e%3cg%20id='Vector_3'%3e%3c/g%3e%3cpath%20id='Vector_4'%20d='M24%200V48'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_5'%20d='M48%200V48'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_6'%20d='M0%2012H72'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_7'%20d='M0%2024H72'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_8'%20d='M0%2036H72'%20stroke='%239D9C9A'/%3e%3c/g%3e%3crect%20x='0.5'%20y='0.5'%20width='71'%20height='47'%20rx='7.5'%20stroke='%239D9C9A'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_0_64'%3e%3crect%20width='72'%20height='48'%20rx='8'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,pp=`data:image/svg+xml,%3csvg%20width='72'%20height='48'%20viewBox='0%200%2072%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='tablePreview'%3e%3cg%20clip-path='url(%23clip0_0_47)'%3e%3crect%20width='72'%20height='48'%20rx='8'%20fill='white'/%3e%3cpath%20id='Vector'%20d='M72%200H0V12H72V0Z'%20fill='%23FBFFD0'/%3e%3cpath%20id='Vector_2'%20d='M72%2024H0V36H72V24Z'%20fill='%23FBFFD0'/%3e%3cpath%20id='Vector_3'%20d='M24%200V48'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_4'%20d='M48%200V48'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_5'%20d='M0%2012H72'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_6'%20d='M0%2024H72'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_7'%20d='M0%2036H72'%20stroke='%239D9C9A'/%3e%3c/g%3e%3crect%20x='0.5'%20y='0.5'%20width='71'%20height='47'%20rx='7.5'%20stroke='%239D9C9A'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_0_47'%3e%3crect%20width='72'%20height='48'%20rx='8'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,mp=`data:image/svg+xml,%3csvg%20width='72'%20height='48'%20viewBox='0%200%2072%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='tablePreview'%3e%3cg%20clip-path='url(%23clip0_0_73)'%3e%3crect%20width='72'%20height='48'%20rx='8'%20fill='white'/%3e%3cpath%20id='Vector'%20d='M72%200H0V12H72V0Z'%20fill='%23F0FF62'/%3e%3cpath%20id='Vector_2'%20d='M72%2012H0V24H72V12Z'%20fill='%23FBFFD0'/%3e%3cpath%20id='Vector_3'%20d='M72%2036H0V48H72V36Z'%20fill='%23FBFFD0'/%3e%3cpath%20id='Vector_4'%20d='M24%200V48'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_5'%20d='M48%200V48'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_6'%20d='M0%2012H72'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_7'%20d='M0%2024H72'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_8'%20d='M0%2036H72'%20stroke='%239D9C9A'/%3e%3c/g%3e%3crect%20x='0.5'%20y='0.5'%20width='71'%20height='47'%20rx='7.5'%20stroke='%239D9C9A'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_0_73'%3e%3crect%20width='72'%20height='48'%20rx='8'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,hp=In`
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 28px;
  padding: 0;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: ${e=>e.$on?`0 0 0 2px ${e.theme.surface.raised}, 0 0 0 4px ${e.theme.brand.accentOnLight}`:`none`};
  transition: box-shadow 0.12s, transform 0.12s;

  &:hover {
    box-shadow: ${e=>e.$on?`0 0 0 2px ${e.theme.surface.raised}, 0 0 0 4px ${e.theme.brand.accentOnLight}`:`0 0 0 2px ${e.theme.surface.raised}, 0 0 0 3px ${e.theme.border.default}`};
  }
  &:active { transform: scale(0.94); }
`,gp=In`
  position: relative;
  line-height: 0;
  color: ${e=>e.theme.icon.default};
  background: ${e=>e.theme.surface.sunken};
  /* 2px 的虛線段落比較長；細於 2px 在小圓上會斷得太碎。也不要一般色票那條內框，會跟虛線疊在一起 */
  border: 2px dashed ${e=>e.theme.border.default};
  box-shadow: ${e=>e.$on?`0 0 0 2px ${e.theme.surface.raised}, 0 0 0 4px ${e.theme.brand.accentOnLight}`:`none`};
  &:hover {
    border-color: ${e=>e.theme.border.hover};
    box-shadow: ${e=>e.$on?`0 0 0 2px ${e.theme.surface.raised}, 0 0 0 4px ${e.theme.brand.accentOnLight}`:`none`};
  }

  svg { display: block; }

  input {
    position: absolute;
    inset: 0;
    opacity: 0;
    inline-size: 100%;
    block-size: 100%;
    cursor: pointer;
  }
`,_p=In`
  display: grid;
  grid-template-columns: repeat(5, 28px);
  gap: 10px;
  padding: 4px;
`,vp={cell:null,panel:!1,insertAt:null},yp=new Set,bp=()=>yp.forEach(e=>e()),xp=e=>(yp.add(e),()=>yp.delete(e));function Sp(){return(0,B.useSyncExternalStore)(xp,()=>vp)}function Cp(e){vp.cell!==e&&(vp={...vp,cell:e},bp())}function wp(e){vp.panel!==e&&(vp={...vp,panel:e},bp())}function Tp(e){vp.insertAt!==e&&(vp={...vp,insertAt:e},bp())}var Ep=[{label:`白`,color:`#FFFFFF`},{label:`淡黃`,color:`#F4FBA2`},{label:`米黃`,color:`#FDF3D1`},{label:`粉紅`,color:`#F8BBD0`},{label:`水藍`,color:`#80DEEA`}],Dp=[{label:`墨黑`,color:`#1A1917`},{label:`深灰`,color:`#4A4947`},{label:`中灰`,color:`#787672`},{label:`淺灰`,color:`#CCCCCC`},{label:`橄欖綠`,color:`#4D581A`}],Op=6,kp=9,Ap=6;function jp({blockId:e}={}){let t=Lh(),n=Sp(),r=n.insertAt!==null,i=n.panel,a=e||(i&&t?.selectedBlockId?t.selectedBlockId:null),o=t&&a?Ii(t.doc,a):null,s=o&&o.block.type===`table`?o.block:null;return(0,B.useEffect)(()=>{let e=e=>{e.key===`Escape`&&(n.insertAt!==null&&Tp(null),n.panel&&wp(!1))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[n.insertAt,n.panel]),!t||!r&&(!i||!s)?null:(0,pi.createPortal)((0,H.jsx)(Mp,{isInsertMode:r,editingBlock:s,insertAt:n.insertAt,onClose:()=>{r&&Tp(null),i&&wp(!1)}}),document.body)}function Mp({isInsertMode:e,editingBlock:t,insertAt:n,onClose:r}){let i=Lh(),a=Sp();uc(!0,r);let o=(0,B.useRef)(null),[s,c]=(0,B.useState)(!1),l=()=>{let e=o.current;e&&c(e.scrollTop+e.clientHeight<e.scrollHeight-2)};(0,B.useEffect)(()=>{let e=o.current;if(!e)return;l();let t=new ResizeObserver(l);return t.observe(e),()=>t.disconnect()},[]);let[u,d]=(0,B.useState)(t?t.rows:ou.rows),[f,p]=(0,B.useState)(t?t.cols:ou.cols),[m,h]=(0,B.useState)(null),[g,_]=(0,B.useState)(t?.preset??`header`),[v,y]=(0,B.useState)(null),[b,x]=(0,B.useState)(t?.borderColor??`#1A1917`),[S,C]=(0,B.useState)(t?.borderWidth??1),w=(0,B.useRef)(null),T=(0,B.useRef)(null);(0,B.useEffect)(()=>{t&&(d(t.rows),p(t.cols),_(t.preset??`plain`),x(t.borderColor??`#1A1917`),C(t.borderWidth??1))},[t?.id,t?.rows,t?.cols,t?.preset,t?.borderColor,t?.borderWidth]);let E=e=>{t&&i.dispatch({type:`patchBlock`,blockId:t.id,blockType:`table`,patch:e})},D=e=>{if(_(e),t){let{id:n,type:r,popups:i,...a}=Cu(t,e);E(a)}},O=(e,n)=>{let r=Math.max(1,Math.min(30,e)),i=Math.max(1,Math.min(12,n));if(d(r),p(i),t){let{id:e,type:n,popups:a,...o}=wu(t,r,i);E(o)}},k=a.cell&&t&&a.cell.blockId===t.id?a.cell:null,A=t&&k?t.cellBg?.[`${k.r},${k.c}`]??null:v,j=e=>{if(y(e),t){if(k){let n=Su(t,k.r,k.c,e);E({cellBg:n.cellBg})}else{let n={};if(e)for(let r=0;r<t.rows;r++)for(let i=0;i<t.cols;i++)n[`${r},${i}`]=e;E({cellBg:e?n:void 0})}}},M=e=>{x(e),t&&E({borderColor:e})},N=e=>{let n=Math.max(0,Math.min(Op,e));C(n),t&&E({borderWidth:n})},P=()=>{if(e&&n!==null){let e=su(u,f);if(e.preset=g,e.borderColor=b,e.borderWidth=S,v){let t={};for(let e=0;e<u;e++)for(let n=0;n<f;n++)t[`${e},${n}`]=v;e.cellBg=t}i.dispatch({type:`insertRow`,index:n,blocks:[e]}),Tp(null),i.select(e.id),ld(e.id)}else r()},F=e=>Bh.test(e)?e:null,I=m?m.r:u,L=m?m.c:f;return(0,H.jsxs)(Np,{role:`dialog`,"aria-label":`表格設定`,"data-ui":!0,onClick:e=>e.stopPropagation(),onPointerDown:e=>e.stopPropagation(),children:[(0,H.jsxs)(Pp,{children:[(0,H.jsx)(Fp,{children:`表格`}),(0,H.jsx)(Ip,{type:`button`,onClick:r,"aria-label":`關閉`,children:(0,H.jsx)(U,{name:`x`,size:24,label:`關閉`})})]}),(0,H.jsxs)(Lp,{ref:o,onScroll:l,$more:s,children:[(0,H.jsxs)(Rp,{children:[(0,H.jsx)(zp,{children:`快速樣式`}),(0,H.jsx)(Bp,{children:(0,H.jsxs)(Vp,{children:[(0,H.jsx)(Hp,{type:`button`,$active:g===`header`,onClick:()=>D(`header`),title:`表頭強調`,children:(0,H.jsx)(Up,{src:fp,alt:``})}),(0,H.jsx)(Hp,{type:`button`,$active:g===`zebra`,onClick:()=>D(`zebra`),title:`斑馬紋`,children:(0,H.jsx)(Up,{src:pp,alt:``})}),(0,H.jsx)(Hp,{type:`button`,$active:g===`plain`||g===`borderless`,onClick:()=>D(`plain`),title:`簡約白底`,children:(0,H.jsx)(Up,{src:mp,alt:``})})]})})]}),(0,H.jsxs)(Rp,{children:[(0,H.jsx)(zp,{children:`尺寸`}),(0,H.jsxs)(Bp,{children:[(0,H.jsx)(Wp,{onPointerLeave:()=>h(null),children:Array.from({length:Ap},(e,t)=>{let n=t+1;return(0,H.jsx)(Gp,{children:Array.from({length:kp},(e,t)=>{let r=t+1;return(0,H.jsx)(Kp,{type:`button`,$highlighted:n<=I&&r<=L,"aria-label":`${n} 行 ${r} 列`,onPointerEnter:e=>{h({r:n,c:r}),e.buttons===1&&O(n,r)},onPointerDown:()=>O(n,r)},r)})},n)})}),(0,H.jsxs)(qp,{children:[(0,H.jsx)(Jp,{children:(0,H.jsx)(Xp,{type:`number`,min:1,max:30,value:u,"aria-label":`行數`,onChange:e=>O(Number(e.target.value),f)})}),(0,H.jsx)(Zp,{children:`行`}),(0,H.jsx)(Jp,{children:(0,H.jsx)(Xp,{type:`number`,min:1,max:12,value:f,"aria-label":`列數`,onChange:e=>O(u,Number(e.target.value))})}),(0,H.jsx)(Zp,{children:`列`})]})]})]}),(0,H.jsxs)(Rp,{children:[(0,H.jsx)(zp,{children:`儲存格背景`}),(0,H.jsx)(Bp,{children:(0,H.jsxs)(em,{children:[Ep.map(e=>{let t=A===e.color||!A&&e.color===`#FFFFFF`;return(0,H.jsx)(tm,{type:`button`,title:e.label,style:{background:e.color},$on:t,onClick:()=>j(e.color)},e.label)}),(0,H.jsxs)(nm,{type:`button`,title:`自訂儲存格背景`,$on:!!A&&!Ep.some(e=>e.color===A),style:A&&!Ep.some(e=>e.color===A)?{background:A}:void 0,onClick:()=>w.current?.click(),children:[(0,H.jsx)(U,{name:`plus`,size:16}),(0,H.jsx)(`input`,{ref:w,type:`color`,value:A??`#ffffff`,onChange:e=>{let t=F(e.target.value);t&&j(t)},tabIndex:-1,"aria-label":`自訂儲存格背景`})]})]})})]}),(0,H.jsxs)(Rp,{children:[(0,H.jsx)(zp,{children:`框線顏色`}),(0,H.jsx)(Bp,{children:(0,H.jsxs)(em,{children:[Dp.map(e=>{let t=b===e.color;return(0,H.jsx)(tm,{type:`button`,title:e.label,style:{background:e.color},$on:t,onClick:()=>M(e.color)},e.label)}),(0,H.jsxs)(nm,{type:`button`,title:`自訂框線顏色`,$on:!Dp.some(e=>e.color===b),style:Dp.some(e=>e.color===b)?void 0:{background:b},onClick:()=>T.current?.click(),children:[(0,H.jsx)(U,{name:`plus`,size:16}),(0,H.jsx)(`input`,{ref:T,type:`color`,value:b,onChange:e=>{let t=F(e.target.value);t&&M(t)},tabIndex:-1,"aria-label":`自訂框線顏色`})]})]})})]}),(0,H.jsxs)(Rp,{children:[(0,H.jsx)(zp,{children:`線條粗細`}),(0,H.jsx)(Bp,{children:(0,H.jsxs)(Qp,{children:[(0,H.jsx)($p,{type:`number`,min:0,max:Op,value:S,"aria-label":`線條粗細`,onChange:e=>N(Number(e.target.value))}),(0,H.jsx)(`span`,{children:`px`})]})})]})]}),(0,H.jsx)(rm,{children:(0,H.jsx)(im,{type:`button`,onClick:P,children:e?`新增表格`:`完成`})})]})}var Np=dc,Pp=fc,Fp=pc,Ip=mc,Lp=V(hc)`
  ${e=>e.$more?`&::-webkit-scrollbar-thumb { background: ${e.theme.border.default}; }`:``}
`,Rp=V.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
`,zp=V.span`
  font-size: var(--ds-typography-label-size);
  font-weight: var(--ds-typography-label-weight);
  color: ${e=>e.theme.text.secondary};
`,Bp=V.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetXs};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.sunken};
`,Vp=V.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${e=>e.theme.space.gapSm};
`,Hp=V.button`
  block-size: 52px;
  border-radius: ${e=>e.theme.radius.tile};
  padding: 6px;
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: ${e=>e.theme.surface.raised};
  outline: 2px solid ${e=>e.$active?e.theme.brand.accentOnLight:`transparent`};
  transition: outline-color 0.12s;

  &:hover { outline-color: ${e=>e.$active?e.theme.brand.accentOnLight:e.theme.border.default}; }
`,Up=V.img`
  display: block;
  inline-size: 60px;
  block-size: 40px;
`,Wp=V.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`,Gp=V.div`
  display: grid;
  grid-template-columns: repeat(${kp}, 1fr);
  gap: 3px;
`,Kp=V.button`
  block-size: 20px;
  padding: 0;
  border-radius: 4px;
  cursor: pointer;
  border: 1.5px solid ${e=>e.$highlighted?e.theme.brand.primaryHover:`transparent`};
  background: ${e=>e.$highlighted?e.theme.brand.primaryTint:e.theme.surface.raised};
  transition: background 0.08s, border-color 0.08s;
`,qp=V.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr auto;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
`,Jp=V.div`
  display: contents;
`,Yp=In`
  min-inline-size: 0;
  inline-size: 100%;
  block-size: ${e=>e.theme.control.heightSm};
  box-sizing: border-box;
  padding: 0 ${e=>e.theme.space.insetSm};
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.muted};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  font-variant-numeric: tabular-nums;
  color: ${e=>e.theme.text.primary};
  outline: none;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
`,Xp=V.input`
  ${Yp}
  &:focus { box-shadow: inset 0 0 0 1px ${e=>e.theme.border.hover}; background: ${e=>e.theme.surface.raised}; }
`,Zp=V.span`
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,Qp=V.label`
  ${Yp}
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  &:focus-within { box-shadow: inset 0 0 0 1px ${e=>e.theme.border.hover}; background: ${e=>e.theme.surface.raised}; }
`,$p=V.input`
  flex: 1;
  min-inline-size: 0;
  border: none;
  background: transparent;
  font: inherit;
  color: inherit;
  outline: none;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
`,em=V.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
`,tm=V.button`
  ${hp}
`,nm=V(tm)`
  ${gp}
`,rm=V.footer`
  position: relative;
  padding: ${e=>e.theme.space.gapMd} 20px 20px;
  flex-shrink: 0;
  /* 不畫陰影或分隔線（看起來像一條硬線）；下面還有內容時，捲動區的捲軸會露出來提示 */
`,im=V.button`
  ${bs}
  inline-size: 100%;
`;function am(e,t){let n=W(`blk`);switch(e){case`text`:return Mi(``,`body`);case`image`:return{id:n,type:`image`,assetId:null,alt:``,caption:``,hasCaption:!1,aspectRatio:16/9,widthPct:50,popups:[]};case`image-ai`:return{id:n,type:`image`,assetId:null,alt:``,caption:``,hasCaption:!1,aspectRatio:16/9,widthPct:50,popups:[],aiPrompt:``};case`video`:return{id:n,type:`video`,source:`upload`,ref:``,title:``,widthPct:50,popups:[]};case`audio`:return{id:n,type:`audio`,assetId:null,title:``,widthPct:200/9,popups:[]};case`shape`:return{id:n,type:`shape`,shape:`rect`,label:``,spans:[],popups:[]};case`shape-circle`:return{id:n,type:`shape`,shape:`circle`,label:``,spans:[],popups:[]};case`shape-rounded`:return{id:n,type:`shape`,shape:`roundedRect`,label:``,spans:[],popups:[]};case`shape-callout`:return{id:n,type:`shape`,shape:`callout`,label:``,spans:[],tail:Tl,popups:[]};case`line`:return{id:n,type:`line`,from:{x:0,y:.5},to:{x:1,y:.5},widthPct:50,popups:[]};case`table`:return{...su(t?.rows,t?.cols),widthPct:50};case`web`:return{id:n,type:`web`,url:``,title:``,presentation:`bookmark`,widthPct:50,popups:[],chosen:!1};case`pdf`:return{id:n,type:`pdf`,assetId:null,title:``,widthPct:50,popups:[]}}}function om(e,t=`bookmark`){let n=W(`blk`);switch(e.kind){case`image`:return{id:n,type:`image`,assetId:e.assetId,alt:e.name,caption:``,hasCaption:!1,aspectRatio:e.aspectRatio??1.5,widthPct:50,popups:[]};case`video`:return e.source===`youtube`?{id:n,type:`video`,source:`youtube`,ref:e.url??``,title:``,widthPct:50,popups:[]}:{id:n,type:`video`,source:`upload`,ref:e.assetId,title:e.name,widthPct:50,popups:[]};case`audio`:return{id:n,type:`audio`,assetId:e.assetId,title:e.name,widthPct:200/9,popups:[]};case`web`:return t===`embed`?{id:n,type:`web`,url:e.url??``,title:e.name,presentation:`embed`,widthPct:100,popups:[]}:{id:n,type:`web`,url:e.url??``,title:e.name,presentation:`bookmark`,widthPct:50,popups:[]};default:return{id:n,type:`pdf`,assetId:e.assetId,title:e.name,widthPct:50,popups:[]}}}function sm({item:e,settings:t,contentInline:n,contentBlock:r,rowIndex:i}){let a=Lh(),o=uh(),s=ql(),c=Zl(),l=t.writingMode===`vertical`,u=(0,B.useRef)(null),d=(0,B.useRef)(null),f=(0,B.useRef)(null),p=(0,B.useRef)(null),m=e=>(n,r)=>{if(a?.openInsert(null),n===`library`){a?.openLibrary(e);return}if(n===`pdf`){bf(`pdf`),a?.openLibrary(e);return}if(n===`table`){Tp(e);return}let i=Sr(am(n,r),t);if(a?.dispatch({type:`insertRow`,index:e,blocks:[i]}),ld(i.id),i.type!==`text`&&a?.select(i.id),i.type===`text`&&a){a.select(i.id);let e=30,t=()=>{let n=document.querySelector(`[data-block-id="${i.id}"] [contenteditable="true"]`);if(n){n.focus();return}--e>0&&requestAnimationFrame(t)};requestAnimationFrame(t)}},h=Gh(),g=e.row,_=a?.selectedBlockId?g.columns.some(e=>e.blocks.some(e=>e.id===a.selectedBlockId)):!1,v=a?.dropTarget?.mode===`column`&&a.dropTarget.rowId===g.id?a.dropTarget.side:null,y=a?.dropTarget?.mode===`column`&&a.dropTarget.rowId===g.id&&a.dropTarget.side===`right`?a.dropTarget.keepPct:void 0,b=!e.continuedFromPrev,x=!e.continuesOnNext,S=b&&a?.dropTarget?.mode===`row`&&a.dropTarget.index===i,C=x&&a?.dropTarget?.mode===`row`&&a.dropTarget.index===i+1,w=a?.draggingRowId===g.id;return(0,H.jsxs)(lm,{ref:u,$dragging:w,children:[S&&(0,H.jsx)(pm,{$where:`start`,$vertical:l}),C&&(0,H.jsx)(pm,{$where:`end`,$vertical:l}),a&&b&&i===0&&!a.draggingRowId&&(0,H.jsx)(eu,{vertical:l,open:a.insertAt===0,hinted:a.hoverGap===0,onOpen:()=>a.openInsert(a.insertAt===0?null:0)}),(0,H.jsx)(um,{ref:f}),a?.insertAt===0&&b&&i===0&&(0,H.jsx)(Q,{anchorRef:f,vertical:l,onClose:()=>a.openInsert(null),onPick:m(0)}),(0,H.jsxs)(dm,{ref:d,"data-row-id":a?g.id:void 0,"data-row-index":a?i:void 0,$selected:_,style:{marginBlockStart:e.gapBefore},children:[a&&g.columns.length<2&&(0,H.jsx)(fm,{"data-ui":!0,$vertical:l,onPointerDown:e=>{e.preventDefault(),a.startDrag(e.nativeEvent,{rowId:g.id})},"aria-label":`拖曳搬移`,title:`拖曳搬移這一列`,children:(0,H.jsx)(U,{name:`grip`,size:16})}),v&&(0,H.jsx)(mm,{$side:v===`left`?`start`:`end`,$vertical:l,$at:y,children:(0,H.jsxs)(`span`,{children:[`併成`,`零一二三四五`[g.columns.length+1],`欄`]})}),(0,H.jsx)(hm,{"data-columns":!0,children:g.columns.map((i,u)=>{let d=(n-48*(g.columns.length-1))*i.widthPct/100;return(0,H.jsxs)(_m,{"data-col-id":a?i.id:void 0,style:{flexBasis:`${i.widthPct}%`},children:[a&&g.columns.length>1&&(0,H.jsx)(gm,{"data-ui":!0,$vertical:l,onPointerDown:e=>{e.preventDefault(),e.stopPropagation(),a.startDrag(e.nativeEvent,{rowId:g.id,columnId:i.id})},"aria-label":`拖曳搬移這一欄`,title:`拖曳搬移這一欄。往上或往下放可以拆回獨立的一列`,children:(0,H.jsx)(U,{name:`grip`,size:16})}),i.blocks.map(n=>{let i={inlineSize:d,maxBlockSize:r,vertical:l},f=a?.selectedBlockId===n.id,p=a&&f?Yu(n):null,m=p?vr(n,i):null,_=m&&n.type===`table`?h.frame(n.id,m,l):m,v=$i(n),y=n.type===`text`?s.get(n.id):void 0,x=!a&&o&&v.length>0&&!y?e=>o.open({...n,popups:v},e):null,S=!!c?.focusId&&y?.startId!==c.focusId,C=y&&b&&(a||c)?e=>{a?(a.select(n.id),a.openPopupPanel(n.id)):c?.toggle(y.startId,e)}:null;return(0,H.jsxs)(ym,{$tap:!!x,role:x?`button`:void 0,tabIndex:x?0:void 0,"aria-label":x?`打開補充內容`:void 0,onPointerDown:C?e=>{let t=e.currentTarget;bm(t,e.clientX,e.clientY)?t.dataset.paraHit=`1`:delete t.dataset.paraHit}:void 0,onPointerMove:C?e=>{let t=e.currentTarget;t.style.cursor=bm(t,e.clientX,e.clientY)?`pointer`:``}:void 0,onClick:C?e=>{bm(e.currentTarget,e.clientX,e.clientY)&&C(e.currentTarget)}:x?e=>{e.target.closest(`button, a, input, video, audio, iframe, sup[data-fn]`)||x(e.currentTarget)}:void 0,onKeyDown:x?e=>{e.target!==e.currentTarget||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),x(e.currentTarget))}:void 0,ref:n.type===`table`&&a?h.ref(n.id):void 0,"data-block-id":a?n.id:void 0,"data-para":!a&&y?y.startId:void 0,$selected:f,$framed:!!p,$fit:n.type!==`text`,$dim:S,children:[y&&b&&(a||c)&&(0,H.jsx)(xm,{type:`button`,onClick:e=>{let t=e.currentTarget.parentElement;a?(a.select(n.id),a.openPopupPanel(n.id)):c?.toggle(y.startId,t)},children:a?`第 ${y.no} 段：編輯段落說明`:`第 ${y.no} 段`}),a&&p&&_&&(0,H.jsx)(Zu,{omit:[...u>0?[l?`n`:`w`]:[],...u<g.columns.length-1?[l?`s`:`e`]:[]],mode:p,box:_,columnInline:d,vertical:l,onResize:e=>a.dispatch({type:`resizeBlock`,blockId:n.id,...e,widthPct:`widthPct`in e?e.widthPct:n.widthPct})}),a&&f&&n.type===`text`&&Lr(n,i).flipped&&(0,H.jsx)(od,{size:Math.min(n.blockSize??r*.45,r),max:r,vertical:l,onResize:e=>a.dispatch({type:`patchBlock`,blockId:n.id,blockType:`text`,patch:{blockSize:e}})}),a&&Ji(n).length>0&&(0,H.jsx)(ud,{count:Ji(n).length,onClick:a?()=>{a.select(n.id),a.openPopupPanel(n.id)}:void 0,vertical:l,side:g.columns.length>1&&u===0?`start`:`end`}),(0,H.jsx)(Ql,{label:Xn[n.type]?.label,children:(0,H.jsx)(Lm,{block:n,settings:t,sizing:i,onEditSpans:a?t=>a.editSpans(n.id,t,e.textSlice):void 0,onPatch:a?e=>a.dispatch({type:`patchBlock`,blockId:n.id,blockType:n.type,patch:e}):void 0,onSelectRange:a?t=>a.setInlineSelection(t?{blockId:n.id,range:t,slice:e.textSlice}:null):void 0,onSelect:a?()=>a.select(n.id):void 0,paraLabel:y&&b?ts(y.no,l):void 0,paraOn:!!y&&c?.focusId===y.startId})}),n.masked&&(0,H.jsx)(_d,{blockId:n.id,editing:!!a,live:!a&&!!o})]},n.id)}),a&&u<g.columns.length-1&&!g.columns[u+1].blocks.some(e=>e.id===a.selectedBlockId)&&(0,H.jsx)(cm,{rowId:g.id,widths:g.columns.map(e=>e.widthPct),index:u,vertical:l,shown:i.blocks.some(e=>e.id===a.selectedBlockId)?`end`:null,onChange:e=>a.dispatch({type:`setColumnWidths`,rowId:g.id,widths:e})}),a&&u>0&&i.blocks.some(e=>e.id===a.selectedBlockId)&&(0,H.jsx)(cm,{rowId:g.id,widths:g.columns.map(e=>e.widthPct),index:u-1,vertical:l,shown:`start`,onChange:e=>a.dispatch({type:`setColumnWidths`,rowId:g.id,widths:e})})]},i.id)})})]}),a&&x&&!a.draggingRowId&&(0,H.jsx)(eu,{vertical:l,where:`end`,open:a.insertAt===i+1,hinted:a.hoverGap===i+1,onOpen:()=>a.openInsert(a.insertAt===i+1?null:i+1)}),(0,H.jsx)(um,{ref:p}),a?.insertAt===i+1&&x&&(0,H.jsx)(Q,{anchorRef:p,vertical:l,onClose:()=>a.openInsert(null),onPick:m(i+1)})]})}function cm({widths:e,index:t,vertical:n,shown:r,onChange:i}){let a=(0,B.useRef)(null),o=e=>n?e.clientY:e.clientX;return(0,H.jsx)(vm,{role:`separator`,"aria-label":`調整欄寬`,"data-ui":!0,$vertical:n,$shown:r,onPointerDown:r=>{let i=r.currentTarget.closest(`[data-columns]`)?.getBoundingClientRect(),s=(n?i?.height:i?.width)??0;if(!(s<=0)){a.current={pos:o(r),a:e[t],b:e[t+1],span:s};try{r.currentTarget.setPointerCapture(r.pointerId)}catch{}}},onPointerMove:n=>{let r=a.current;if(!r)return;let s=(o(n)-r.pos)/r.span*100,c=r.a+r.b,l=Ju(Math.max(10,Math.min(c-10,r.a+s))/c*100)*c/100,u=e.slice();u[t]=l,u[t+1]=r.a+r.b-l,i(u)},onPointerUp:()=>{a.current=null},onPointerCancel:()=>{a.current=null}})}var lm=V.div`
  position: relative;
  flex: none;
  inline-size: 100%;
  opacity: ${e=>e.$dragging?.4:1};
`,um=V.div`
  inline-size: 0;
  block-size: 0;
`,dm=V.div`
  position: relative;
  inline-size: 100%;
  display: flex;
  flex-direction: column;
`,fm=V.div`
  position: absolute;
  ${e=>e.$vertical?`top: -36px; right: 0;`:`left: -36px; top: 0;`}
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: ${e=>e.theme.radius.field};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.icon.secondary};
  cursor: grab;
  writing-mode: horizontal-tb;

  /* 平常很淡但看得見——完全隱形的話沒人知道可以拖 */
  opacity: 0.35;
  transition: opacity 0.12s, border-color 0.12s, color 0.12s;

  ${dm}:hover & {
    opacity: 1;
  }
  &:hover {
    border-color: ${e=>e.theme.border.hover};
    color: ${e=>e.theme.text.primary};
  }
  &:active {
    cursor: grabbing;
  }
`,pm=V.div`
  position: absolute;
  ${e=>e.$vertical?`top: 0; bottom: 0; width: 3px; ${e.$where===`start`?`right: -3px;`:`left: -3px;`}`:`left: 0; right: 0; height: 3px; ${e.$where===`start`?`top: -3px;`:`bottom: -3px;`}`}
  z-index: 12;
  border-radius: 999px;
  background: ${e=>e.theme.text.primary};
  writing-mode: horizontal-tb;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 9px;
    height: 9px;
    border-radius: 999px;
    background: ${e=>e.theme.text.primary};
    ${e=>e.$vertical?`left: -3px;`:`top: -3px;`}
  }
  &::before {
    ${e=>e.$vertical?`top: -4px;`:`left: -4px;`}
  }
  &::after {
    ${e=>e.$vertical?`bottom: -4px;`:`right: -4px;`}
  }
`,mm=V.div`
  position: absolute;
  z-index: 10;
  pointer-events: none;
  writing-mode: horizontal-tb;
  background: ${e=>e.theme.border.hover};
  border-radius: ${e=>e.theme.radius.control};
  ${e=>{let t=e.$at===void 0?null:`calc((100% - 48px) * ${e.$at/100} + 24px - 1.5px)`;return e.$vertical?`left: 0; right: 0; block-size: 3px; ${e.$side===`start`?`top: -14px;`:t?`top: ${t};`:`bottom: -14px;`}`:`top: 0; bottom: 0; inline-size: 3px; ${e.$side===`start`?`left: -14px;`:t?`left: ${t};`:`right: -14px;`}`}}

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    padding: 2px 10px;
    border-radius: ${e=>e.theme.radius.control};
    background: ${e=>e.theme.text.primary};
    color: ${e=>e.theme.surface.raised};
    font-size: var(--ds-typography-label-size);
    line-height: var(--ds-typography-label-line-height);
    box-shadow: 0 2px 8px rgba(26, 25, 23, 0.18);
  }
`,hm=V.div`
  display: flex;
  inline-size: 100%;
  gap: ${48}px;
  align-items: flex-start;
`,gm=V.div`
  position: absolute;
  ${e=>e.$vertical?`top: -36px; right: 0;`:`left: -36px; top: 0;`}
  z-index: 11;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: ${e=>e.theme.radius.field};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.icon.secondary};
  cursor: grab;
  writing-mode: horizontal-tb;
  opacity: 0.35;
  transition: opacity 0.12s, border-color 0.12s, color 0.12s;

  ${dm}:hover & {
    opacity: 1;
  }
  &:hover {
    opacity: 1;
    border-color: ${e=>e.theme.border.hover};
    color: ${e=>e.theme.text.primary};
  }
  &:active { cursor: grabbing; }
`,_m=V.div`
  position: relative;
  min-inline-size: 0;
`,vm=V.div`
  position: absolute;
  ${e=>{let t=e.$shown?-13:-32,n=e.$shown===`start`?e.$vertical?`top`:`left`:e.$vertical?`bottom`:`right`;return e.$vertical?`left: 0; right: 0; ${n}: ${t}px; height: 16px; cursor: row-resize;`:`top: 0; bottom: 0; ${n}: ${t}px; width: 16px; cursor: col-resize;`}}
  z-index: 12;
  writing-mode: horizontal-tb;
  touch-action: none;
  opacity: ${e=>+!!e.$shown};
  transition: opacity 0.12s;

  /* 沒選時滑過才看得到的細線；選了就只有把手，不畫灰線（藍框本身就是那條邊） */
  &::before {
    content: '';
    position: absolute;
    display: ${e=>e.$shown?`none`:`block`};
    background: ${e=>e.theme.border.hover};
    ${e=>e.$vertical?`left: 0; right: 0; top: 7px; height: 2px;`:`top: 0; bottom: 0; left: 7px; width: 2px;`}
  }
  /* 把手：跟圖片外框的把手同一款白膠囊 */
  &::after {
    content: '';
    position: absolute;
    box-sizing: border-box;
    ${e=>e.$vertical?`left: 50%; top: 3px; width: 28px; height: 10px; margin-left: -14px;`:`top: 50%; left: 3px; width: 10px; height: 28px; margin-top: -14px;`}
    border-radius: ${e=>e.theme.radius.control};
    background: ${e=>e.theme.surface.raised};
    border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
    box-shadow: 0 1px 3px rgba(26, 25, 23, 0.18);
    display: ${e=>e.$shown?`block`:`none`};
  }
  &:hover,
  &:active {
    opacity: 1;
  }
`,ym=V.div`
  position: relative;
  border-radius: 4px;
  transition: opacity 0.2s;
  ${e=>e.$dim&&`opacity: 0.28;`}
  /*
   * 閱讀時有補充的元件：不畫框線；滑過時鋪一層淡灰底，往外多鋪 8px（用陰影鋪，不佔版面），
   * 告訴學生這裡點得下去。框線只在用鍵盤移到它時出現（無障礙）
   */
  ${e=>e.$tap&&`cursor: pointer;
     outline: none !important;
     border-radius: 8px;
     transition: background-color 0.15s, box-shadow 0.15s;
     &:hover { background-color: ${e.theme.surface.sunken}; box-shadow: 0 0 0 8px ${e.theme.surface.sunken}; }
     &:focus-visible { outline: 2px solid ${e.theme.border.focus} !important; outline-offset: 8px; }`}
  ${e=>e.$fit&&`inline-size: fit-content; max-inline-size: 100%;`}
  outline: ${e=>e.$selected&&!e.$framed?`${e.theme.border.widthSelected} solid ${e.theme.tool.border}`:`none`};
  outline-offset: 4px;

  /* 外框已經畫在這裡，裡面的文字取得焦點時就不要再畫一圈 */
  ${e=>e.$selected&&`[contenteditable]:focus-visible { outline: none; }`}
`;function bm(e,t,n){let r=e.querySelector(`.ds-rich[data-pno]`);if(!r)return!1;let i=r.getBoundingClientRect(),a=getComputedStyle(r),o=parseFloat(a.fontSize),s=parseFloat(a.lineHeight)||o*1.6,c=a.writingMode.startsWith(`vertical`),l=c?r.offsetHeight?i.height/r.offsetHeight:1:r.offsetWidth?i.width/r.offsetWidth:1,u=o*l;return c?t>=i.right-s*l&&t<=i.right&&n>=i.top&&n<=i.top+u:t>=i.left&&t<=i.left+u&&n>=i.top&&n<=i.top+s*l}var xm=V.button`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
  &:focus-visible {
    width: auto;
    height: auto;
    clip: auto;
    margin: 0;
    padding: 2px 6px;
    top: 0;
    right: 0;
    background: ${e=>e.theme.surface.raised};
    outline: 2px solid ${e=>e.theme.border.focus};
  }
`,Sm=new Set,Cm=new Set,wm=0,Tm=()=>{wm+=1,Cm.forEach(e=>e())},Em=e=>(Cm.add(e),()=>Cm.delete(e));function Dm(e){return(0,B.useSyncExternalStore)(Em,()=>wm),Sm.has(e)}var Om=e=>new Promise(t=>setTimeout(t,e));async function km(e,t,n){let r=ka(t);if(r!==`image`&&r!==`video`&&r!==`audio`&&r!==`pdf`){let e=await gf(t);return`error`in e&&Os(e.error),null}let i=Sr(am(r),e.doc.settings);Sm.add(i.id),Tm(),e.dispatch({type:`insertRow`,index:n,blocks:[i]});let[a]=await Promise.all([gf(t),Om(Oa)]);if(Sm.delete(i.id),Tm(),`error`in a)return e.dispatch({type:`deleteBlock`,blockId:i.id}),Os(a.error),null;let{id:o,...s}=Sr(om(a.asset),e.doc.settings);return e.dispatch({type:`patchBlock`,blockId:i.id,blockType:i.type,patch:s}),{blockId:i.id,asset:a.asset}}var Am={size:null,lineHeight:null,font:`auto`,ruby:!0},jm={kai:Ir.find(e=>e.label===`標楷體`)?.value??`serif`,hei:`var(--ds-typography-font-sans)`},Mm=`ds-reader:prefs`;function Nm(){try{let e=localStorage.getItem(Mm);return e?{...Am,...JSON.parse(e)}:Am}catch{return Am}}function Pm(e){try{localStorage.setItem(Mm,JSON.stringify(e))}catch{}}var Fm=(0,B.createContext)({scale:1}),Im=()=>(0,B.useContext)(Fm);function Lm({block:e,settings:t,sizing:n,onEditSpans:r,onPatch:i,onSelectRange:a,onSelect:o,paraLabel:s,paraOn:c}){let l=wr[t.textScale],u=Im(),d=uh(),f=Yl(),p=e.type===`text`?ui(e.spans):``,m=(0,B.useMemo)(()=>({__html:p}),[p]),h=Xo(),g=(0,B.useRef)(null);(0,B.useLayoutEffect)(()=>{g.current?.querySelectorAll(`[data-mask]`).forEach(t=>{Yo(Ko(e.id,t.textContent??``))&&(t.dataset.shown=`1`)})},[p,h,e.id]);let _=vr(e,n),v=Dm(e.id),y=_?n.vertical?{width:_.blockSize,height:_.inlineSize}:{width:_.inlineSize,height:_.blockSize}:void 0;if(v&&y)return(0,H.jsx)(Km,{style:y,role:`status`,"aria-label":`上傳中`,children:(0,H.jsx)(`span`,{children:`上傳中…`})});switch(e.type){case`text`:{let t=Lr(e,n),i={...Tr(e.role,l*u.scale,e.fontSize?e.fontSize*u.scale:void 0,u.lineHeight??e.lineHeight,t.vertical),textAlign:e.align,...t.style},p={...t.flipped?t.vertical?{"data-vertical":`true`}:{"data-horizontal":`true`}:{},...s?{"data-pno":s}:{},...s&&c?{"data-pno-on":`true`}:{}};return r?(0,H.jsx)(zm,{className:`ds-rich`,style:i,...p,spans:e.spans,onFocus:o,onChange:r,onSelect:a,placeholder:e.role===`lessonTitle`?`輸入標題…`:`輸入內容…`}):(0,H.jsx)(Rm,{ref:g,className:`ds-rich`,style:i,...p,dangerouslySetInnerHTML:m,onClick:d?t=>{let n=t.target.closest(`[data-mask]`);if(n&&!n.dataset.shown){t.stopPropagation(),n.dataset.shown=`1`,qo(Ko(e.id,n.textContent??``));return}let r=t.target.closest(`[data-note]`),i=r&&e.rangeNotes?.find(e=>e.id===r.dataset.note);if(r&&i&&as(i)===`sentence`)return;if(r&&i&&ls(e,i)){t.stopPropagation();let n=e.spans.filter(e=>e.noteId===i.id).map(e=>e.text).join(``),a=[f(i.id),n].filter(Boolean).join(` `),o=cs(e,i.id),s=i.body.trim();o.length===0?d.open({...e,popups:[{id:`note-${i.id}`,kind:`text`,title:a,body:s}]},r):d.open({...e,popups:o},r,s?{title:a,body:s}:void 0);return}let a=t.target.closest(`[data-pop]`),o=a?.dataset.pop?Zi(e,a.dataset.pop).filter(e=>!Ui(e)):[];!a||o.length===0||(t.stopPropagation(),d.open({...e,popups:o},a))}:void 0})}case`image`:return(0,H.jsx)(Ys,{block:e,boxStyle:y,onPatch:i,onSelect:o});case`video`:return(0,H.jsx)(bc,{block:e,boxStyle:y,onPatch:i,onSelect:o});case`web`:return(0,H.jsx)(zc,{block:e,boxStyle:y,onPatch:i,onSelect:o});case`pdf`:return(0,H.jsx)(il,{block:e,boxStyle:y,onPatch:i,onSelect:o});case`dialogue`:return(0,H.jsxs)(Bm,{onPointerDown:o,children:[(0,H.jsx)(Vm,{children:e.speaker}),e.text]});case`question`:return(0,H.jsxs)(Hm,{onPointerDown:o,children:[e.questionType&&(0,H.jsx)(Um,{children:e.questionType}),(0,H.jsxs)(`strong`,{children:[e.number,`. `,e.stem.map(e=>e.text).join(``)]}),(0,H.jsx)(Wm,{children:e.options.map(e=>(0,H.jsxs)(`li`,{children:[`(`,e.key,`) `,e.text.map(e=>e.text).join(``)]},e.key))})]});case`table`:return(0,H.jsx)(qh,{block:e,boxStyle:y,sizing:n,scale:l,onSelect:o});case`audio`:return(0,H.jsx)(fl,{block:e,boxStyle:y,onPatch:i,onSelect:o});case`module`:return(0,H.jsx)(vl,{block:e,boxStyle:y,onSelect:o});case`shape`:return(0,H.jsx)(Ml,{block:e,boxStyle:y,onPatch:i,onSelect:o});case`line`:return(0,H.jsx)(Rl,{block:e,boxStyle:y,onPatch:i,onSelect:o});case`reference`:return(0,H.jsxs)(Gm,{onPointerDown:o,children:[`配合`,e.target,`第 `,e.pages,` 頁`]});default:return e}}var Rm=V.p`
  margin: 0;
  color: ${e=>e.theme.text.primary};

  /* 遮住的幾個字（閱讀）：實心淡灰膠囊蓋住，點了才顯示；字的位置照留，打開後版面不動 */
  [data-mask]:not([data-shown]) {
    background-color: ${e=>e.theme.surface.muted};
    color: transparent;
    border-radius: 6px;
    cursor: pointer;
    text-decoration-color: transparent;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
  [data-mask]:not([data-shown]) rt { color: transparent; }
  [data-mask]:not([data-shown]):hover { background-color: ${e=>e.theme.border.default}; }
  /* 打開時字慢慢浮現、灰底慢慢退掉 */
  [data-mask] { transition: background-color 0.9s ease, color 0.9s ease; }
`,zm=V(ys)`
  margin: 0;
  color: ${e=>e.theme.text.primary};
  outline: none;

  /* 遮住的幾個字（編輯）：淡灰底加虛線底邊標出來，字照樣看得到、改得到 */
  [data-mask] {
    /* 跟整個元件的遮罩（編輯）同一套：灰白底加細斜線 */
    background-color: ${e=>e.theme.surface.muted};
    background-image: repeating-linear-gradient(
      135deg,
      color-mix(in srgb, ${e=>e.theme.border.hover} 55%, transparent) 0 1px,
      transparent 1px 7px
    );
    color: ${e=>e.theme.text.secondary};
    box-shadow: inset 0 -1.5px 0 ${e=>e.theme.border.hover};
    border-radius: 4px;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:empty::before {
    content: attr(data-placeholder);
    color: ${e=>e.theme.text.tertiary};
    pointer-events: none;
  }
`,Bm=V.div`
  background: ${e=>e.theme.surface.sunken};
  border-radius: ${e=>e.theme.radius.card};
  padding: 12px 16px;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
`,Vm=V.span`
  display: block;
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.text.tertiary};
  margin-block-end: 4px;
`,Hm=V.div`
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  border-radius: ${e=>e.theme.radius.card};
  padding: 16px;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Um=V.span`
  align-self: flex-start;
  background: ${e=>e.theme.brand.primaryTint};
  color: ${e=>e.theme.text.primary};
  border-radius: ${e=>e.theme.radius.control};
  padding: 2px 10px;
  font-size: var(--ds-typography-label-size);
`,Wm=V.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${e=>e.theme.text.secondary};
`,Gm=V.div`
  align-self: flex-start;
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.text.tertiary};
`,Km=V.div`
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.text.tertiary};
  font-size: var(--ds-typography-caption-size);
  writing-mode: horizontal-tb;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(100deg, transparent 20%, rgba(255, 255, 255, 0.75) 50%, transparent 80%);
    transform: translateX(-100%);
    animation: ds-upload-sheen 1.2s ease-in-out infinite;
  }
  @keyframes ds-upload-sheen { to { transform: translateX(100%); } }
  @media (prefers-reduced-motion: reduce) {
    &::after { animation-duration: 3s; }
  }
`,qm={writingMode:`horizontal`,aspectRatio:`4:3`,textScale:`md`},Jm={width:1280,height:720},Ym=48,Xm={inlineSize:Jm.width-Ym*2,maxBlockSize:Jm.height-Ym*2,vertical:!1};function Zm(e){let[t,n]=(0,B.useState)(0);return(0,B.useLayoutEffect)(()=>{let t=e.current;if(!t)return;let r=()=>n(Math.min(t.clientWidth/Jm.width,t.clientHeight/Jm.height));r();let i=typeof ResizeObserver>`u`?null:new ResizeObserver(r);return i?.observe(t),()=>i?.disconnect()},[e]),t}function Qm({item:e}){let t=(0,B.useRef)(null),n=Zm(t),r=Gi(e),[i,a]=(0,B.useState)(0),o=r[Math.min(i,r.length-1)]??[];return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(rh,{ref:t,children:n>0&&(0,H.jsxs)(oh,{style:{transform:`scale(${n})`},children:[o.map(e=>(0,H.jsx)(sh,{$fit:e.type!==`text`,$float:e.float,children:(0,H.jsx)(Lm,{block:e,settings:qm,sizing:Xm})},e.id)),o.length===0&&(0,H.jsx)(ch,{children:`這個大彈窗還沒有內容`})]})}),r.length>1&&(0,H.jsxs)($m,{children:[(0,H.jsx)(eh,{type:`button`,onClick:()=>a(e=>Math.max(0,e-1)),disabled:i===0,"aria-label":`上一頁`,children:(0,H.jsx)(U,{name:`chevron-left`,size:20})}),(0,H.jsx)(th,{"aria-label":`第 ${i+1} 頁，共 ${r.length} 頁`,children:r.map((e,t)=>(0,H.jsx)(nh,{type:`button`,$on:t===i,"aria-label":`第 ${t+1} 頁`,onClick:()=>a(t)},t))}),(0,H.jsx)(eh,{type:`button`,onClick:()=>a(e=>Math.min(r.length-1,e+1)),disabled:i===r.length-1,"aria-label":`下一頁`,children:(0,H.jsx)(U,{name:`chevron-right`,size:20})})]})]})}var $m=V.div`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.space.gapMd};
  padding: 0 0 ${e=>e.theme.space.insetMd};
  writing-mode: horizontal-tb;
`,eh=V.button`
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
  &:hover:not(:disabled) { background: ${e=>e.theme.surface.muted}; }
  &:disabled { color: ${e=>e.theme.icon.disabled}; cursor: default; }
`,th=V.div`
  display: flex;
  gap: 6px;
`,nh=V.button`
  inline-size: ${e=>e.$on?`20px`:`8px`};
  block-size: 8px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${e=>e.$on?e.theme.text.primary:e.theme.border.default};
  cursor: pointer;
  transition: inline-size 0.15s;
`,rh=V.div`
  position: relative;
  flex: none;
  /* 一頁 16:9；視窗太矮就讓它矮一點，頁再等比縮小置中 */
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  max-block-size: calc(100vh - 200px);
  overflow: hidden;
  /* 不管教材是直排還是橫排，大彈窗都橫著讀 */
  writing-mode: horizontal-tb;
`,ih=`
  box-sizing: border-box;
  inline-size: ${Jm.width}px;
  block-size: ${Jm.height}px;
  padding: 48px;
  /* 一般區塊排版（不用 flex）：元件可以靠左／靠右，後面的內容排在旁邊 */
  display: flow-root;
  overflow: hidden;
  writing-mode: horizontal-tb;
`,ah=e=>`
  margin-block-end: 16px;
  ${e===`left`?`float: left; margin-inline-end: 16px;`:e===`right`?`float: right; margin-inline-start: 16px;`:``}
`,oh=V.div`
  ${ih}
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -${Jm.width/2}px;
  margin-top: -${Jm.height/2}px;
  transform-origin: center;
  background: ${e=>e.theme.surface.raised};
`,sh=V.div`
  min-inline-size: 0;
  ${e=>ah(e.$float)}
  ${e=>e.$fit&&`inline-size: fit-content; max-inline-size: 100%;`}
`,ch=V.p`
  margin: 0;
  text-align: center;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.tertiary};
`,lh=(0,B.createContext)(null),uh=()=>(0,B.useContext)(lh);function dh({children:e}){return(0,H.jsx)(lh.Provider,{value:null,children:e})}function fh({children:e,onJump:t}){let[n,r]=(0,B.useState)(null),[i,a]=(0,B.useState)(null),[o,s]=(0,B.useState)(null),[c,l]=(0,B.useState)(null),[u,d]=(0,B.useState)(null),[f,p]=(0,B.useState)(null),m=(0,B.useCallback)((e,t,n)=>{let i=e.popups.length===1&&!n?e.popups[0]:null;s(i?.kind===`image`?i:null),l(null),p(null),d(i?.kind===`web`||i?.kind===`video`?i:null),r({block:e,anchor:t??null,lead:n??null})},[]),h=(0,B.useCallback)(()=>{s(null),l(null),d(null),p(null),r(null)},[]),g=(0,B.useCallback)(e=>a(()=>e),[]),_=(0,B.useMemo)(()=>({open:m,registerEdit:g}),[m,g]),v=n?.block??null,y=n&&n.anchor&&!n.lead&&n.block.popups.length===1?n.block.popups[0]:f,b=!f&&!!(n&&n.anchor&&(n.block.popups.length>1||n.lead&&n.block.popups.length>0)),x=n&&!n.lead&&n.block.popups.length===1?n.block.popups[0]:null,S=x?.kind===`rich`?x:null,C=c??S,w=!!(n?.anchor&&mo(n.anchor)&&u?.kind===`text`&&!o&&!C);return(0,B.useEffect)(()=>{if(!v)return;let e=e=>{e.key===`Escape`&&(e.stopPropagation(),h())};return window.addEventListener(`keydown`,e,!0),()=>window.removeEventListener(`keydown`,e,!0)},[v,o,c,u,f,h]),(0,H.jsxs)(lh.Provider,{value:_,children:[e,n&&b&&n.anchor&&!o&&!c&&!u&&(0,H.jsx)(ho,{block:n.block,item:n.block.popups[0],items:n.block.popups,lead:n.lead??void 0,anchor:n.anchor,onClose:h,onPick:e=>{e.kind===`jump`?(h(),e.targetRowId&&t?.(e.targetRowId)):e.kind===`text`?p(e):e.kind===`image`?s(e):e.kind===`rich`?l(e):d(e)}}),n&&y&&!S&&n.anchor&&!o&&!u&&(0,H.jsx)(ho,{block:n.block,item:y,anchor:n.anchor,onClose:h,onJump:t,onEdit:i??void 0}),v&&(o||C||u||!y&&!b)&&(0,pi.createPortal)((0,H.jsx)(mh,{onClick:h,children:(0,H.jsx)(hh,{role:`dialog`,"aria-modal":`true`,"aria-label":C?`補充內容：${qi(C)}`:`補充內容`,$zoom:!1,$vertical:w,$rich:!!C&&!o||!!o||!!u&&(u.kind===`web`||u.kind===`video`),onClick:e=>e.stopPropagation(),children:C&&!o?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(gh,{children:[C.title.trim()&&(0,H.jsx)(`strong`,{children:C.title}),(0,H.jsx)(_h,{}),i&&(0,H.jsxs)(yh,{onClick:()=>{h(),i(v.id)},children:[`編輯`,(0,H.jsx)(U,{name:`pencil`,size:16})]}),(0,H.jsx)(yh,{onClick:h,"aria-label":`關閉`,children:(0,H.jsx)(U,{name:`x`,size:20,label:`關閉`})})]}),(0,H.jsx)(Qm,{item:C})]}):o?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(gh,{$float:!o.title.trim(),children:[o.title.trim()&&(0,H.jsx)(`strong`,{children:o.title}),(0,H.jsx)(_h,{}),(0,H.jsx)(yh,{onClick:h,"aria-label":`關閉`,children:(0,H.jsx)(U,{name:`x`,size:20,label:`關閉`})})]}),(0,H.jsx)(Dh,{$full:!o.title.trim(),children:(0,H.jsx)(Th,{src:ja(o.assetId),alt:o.title})})]}):u?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(gh,{children:[u.title.trim()&&(0,H.jsx)(`strong`,{children:u.title}),(0,H.jsx)(_h,{}),u.kind===`web`&&Ho(u.url)&&(0,H.jsxs)(Mh,{$primary:!u.embeddable,onClick:()=>window.open(Ho(u.url),`_blank`,`noopener,noreferrer`),children:[`以新視窗開啟`,(0,H.jsx)(U,{name:`external-link`,size:16})]}),(0,H.jsx)(yh,{onClick:h,"aria-label":`關閉`,children:(0,H.jsx)(U,{name:`x`,size:20,label:`關閉`})})]}),(0,H.jsxs)(Oh,{$big:u.kind!==`text`,children:[u.kind===`text`&&(0,H.jsx)(Nh,{children:u.body}),u.kind===`video`&&(0,H.jsx)(Ja,{item:u}),u.kind===`audio`&&(0,H.jsx)(`audio`,{controls:!0,autoPlay:!0,src:ja(u.assetId),style:{width:`100%`}}),u.kind===`web`&&(u.embeddable&&Ho(u.url)?(0,H.jsx)(kh,{src:Ho(u.url),title:u.title||u.url,referrerPolicy:`no-referrer`}):(0,H.jsxs)(Ah,{children:[(0,H.jsx)(jh,{children:(0,H.jsx)(U,{name:`eye-off`,size:24})}),(0,H.jsx)(`strong`,{children:Ho(u.url)?`此網頁不支援預覽`:`網址不完整`}),(0,H.jsx)(`span`,{children:Ho(u.url)?`以新視窗開啟網頁吧！`:`要以 http:// 或 https:// 開頭才能開啟`})]}))]})]}):(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(gh,{children:[(0,H.jsx)(`strong`,{children:`補充內容`}),(0,H.jsxs)(vh,{children:[v.popups.length,` 項`]}),(0,H.jsx)(_h,{}),i&&(0,H.jsxs)(yh,{onClick:()=>{h(),i(v.id)},children:[`編輯`,(0,H.jsx)(U,{name:`pencil`,size:16})]}),(0,H.jsx)(yh,{onClick:h,"aria-label":`關閉`,children:(0,H.jsx)(U,{name:`x`,size:20,label:`關閉`})})]}),(0,H.jsx)(bh,{children:v.popups.map(e=>(0,H.jsx)(ph,{item:e,onJump:t,onClose:h,onZoom:s,onRich:l,onDetail:d},e.id))})]})})}),document.body)]})}function ph({item:e,onJump:t,onClose:n,onZoom:r,onRich:i,onDetail:a}){let o=Bi[e.kind],s=Ui(e);return(0,H.jsxs)(xh,{children:[(0,H.jsx)(Sh,{children:(0,H.jsx)(U,{name:o.icon,size:20})}),(0,H.jsxs)(Ch,{children:[(0,H.jsx)(wh,{children:qi(e)}),s&&(0,H.jsx)(Ya,{children:s})]}),!s&&(0,H.jsx)(Ph,{onClick:()=>{if(e.kind===`jump`){n(),e.targetRowId&&t?.(e.targetRowId);return}if(e.kind===`image`)return r(e);if(e.kind===`rich`)return i(e);a(e)},children:o.action})]})}var mh=V.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: ${xd};
  display: grid;
  place-items: center;
  padding: ${e=>e.theme.space.insetLg};
`,hh=V.div`
  position: relative;
  inline-size: ${e=>e.$zoom?`fit-content`:e.$rich?`min(1248px, 92vw)`:`min(560px, 100%)`};
  max-inline-size: 100%;
  max-block-size: ${e=>e.$zoom||e.$rich?`calc(100vh - 48px)`:`min(72vh, 640px)`};
  display: flex;
  flex-direction: column;
  background: ${e=>e.theme.surface.raised};
  border-radius: ${e=>e.theme.radius.panel};
  box-shadow: ${e=>e.theme.shadow.float};
  overflow: hidden;
  /*
   * 直排：標題一欄在最右、內文由右往左。高度固定、寬度跟著字數長，太長就左右捲。
   * 用實體的 width / height 定框，邏輯尺寸在直排時會轉向。
   */
  ${e=>e.$vertical&&`writing-mode: vertical-rl;
     inline-size: auto;
     max-inline-size: none;
     max-block-size: none;
     /* 高度跟著字數：字少就短，最高 520，超過才換到下一欄 */
     height: max-content;
     max-height: min(520px, calc(100vh - 48px));
     width: max-content;
     max-width: min(720px, calc(100vw - 48px));
     /*
      * 關閉鈕在右上角自成一列（跟橫排的視窗同一個位置）；標題一欄從它正下方開始，
      * 右緣跟關閉鈕的右緣切齊，內文各欄跟標題同一條上緣。不再讓標題欄跟關閉鈕並排，空出一條奇怪的直縫
      */
     > header button[aria-label='關閉'] { position: absolute; top: 16px; right: 16px; }
     > header { padding: 72px 0 24px 0; margin-right: 24px; }
     > div { flex: none; padding: 72px 8px 24px 24px; overflow: auto; }`}
`,gh=V.header`
  ${e=>e.$float&&`position: absolute; top: 0; right: 0; z-index: 1;
     button { background: ${e.theme.surface.raised}; border-radius: 999px; }`}
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetMd} ${e=>e.theme.space.insetLg};
`,_h=V.span`
  flex: 1;
`,vh=V.span`
  color: ${e=>e.theme.text.tertiary};
  font-size: var(--ds-typography-label-size);
`,yh=V.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  color: ${e=>e.theme.action.ghostText};
  font: inherit;
  font-size: var(--ds-typography-label-size);
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.control};
  padding: 8px 10px;
  min-block-size: 40px;

  &:hover { background: ${e=>e.theme.action.ghostBgHover}; }
`,bh=V.ul`
  margin: 0;
  padding: ${e=>e.theme.space.insetSm} 0;
  list-style: none;
  overflow-y: auto;
`,xh=V.li`
  display: flex;
  align-items: flex-start;
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetSm} ${e=>e.theme.space.insetLg};
`,Sh=V.span`
  display: grid;
  place-items: center;
  inline-size: 44px;
  block-size: 44px;
  flex: none;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.text.secondary};
`,Ch=V.div`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-block-start: 2px;
`,wh=V.div`
  min-block-size: 44px;
  display: flex;
  align-items: center;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 600;
`;function Th({src:e,alt:t}){let[n,r]=(0,B.useState)(!1);return!e||n?(0,H.jsx)(Eh,{children:`這張圖片讀不到了，請回編輯模式重新上傳`}):(0,H.jsx)(`img`,{src:e,alt:t,onError:()=>r(!0)})}var Eh=V.p`
  margin: 0;
  padding: 48px 24px;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,Dh=V.div`
  flex: 1;
  min-block-size: 0;
  display: grid;
  place-items: center;
  padding: ${e=>e.$full?e.theme.space.insetLg:0} ${e=>e.theme.space.insetLg} ${e=>e.theme.space.insetLg};

  img {
    display: block;
    max-inline-size: 100%;
    max-block-size: ${e=>e.$full?`calc(100vh - 48px - 48px)`:`calc(100vh - 48px - 72px - 24px)`};
    object-fit: contain;
    border-radius: ${e=>e.theme.radius.field};
  }
`,Oh=V.div`
  padding: 0 ${e=>e.theme.space.insetLg} ${e=>e.theme.space.insetLg};
  overflow-y: auto;
  ${e=>e.$big&&`flex: 1; min-block-size: 0; display: flex; flex-direction: column;`}
`,kh=V.iframe`
  inline-size: 100%;
  block-size: calc(100vh - 48px - 72px - 24px);
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.raised};
`,Ah=V.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.space.gapSm};
  /* 跟能預覽時的網頁框一樣高：視窗多高就用多高 */
  block-size: calc(100vh - 48px - 72px - 24px);
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.text.secondary};
  strong { font-size: var(--ds-typography-body-size); font-weight: 500; margin-block-start: 8px; }
  span { font-size: var(--ds-typography-body-sm-size); color: ${e=>e.theme.text.tertiary}; }
`,jh=V.span`
  display: grid;
  place-items: center;
  inline-size: 80px;
  block-size: 80px;
  border-radius: 999px;
  background: ${e=>e.theme.surface.muted};
  color: ${e=>e.theme.icon.secondary};
`,Mh=V.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-block-size: 36px;
  padding: 0 14px;
  border-radius: 999px;
  font: inherit;
  font-size: var(--ds-typography-label-size);
  cursor: pointer;
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.$primary?`transparent`:e.theme.action.secondaryBorder};
  background: ${e=>e.$primary?e.theme.action.primaryBg:e.theme.action.secondaryBg};
  color: ${e=>e.$primary?e.theme.action.primaryText:e.theme.action.secondaryText};
  &:hover { background: ${e=>e.$primary?e.theme.action.primaryBgHover:e.theme.action.secondaryBgHover}; }
`,Nh=V.p`
  margin: 0;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${e=>e.theme.text.secondary};
  white-space: pre-wrap;
`,Ph=V.button`
  flex: none;
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.action.secondaryBorder};
  background: ${e=>e.theme.action.secondaryBg};
  color: ${e=>e.theme.action.secondaryText};
  font: inherit;
  font-size: var(--ds-typography-label-size);
  border-radius: ${e=>e.theme.radius.control};
  /* 上課用平板點的，觸控目標不能小於 44 */
  min-block-size: 44px;
  padding: 0 16px;
  cursor: pointer;

  &:hover { background: ${e=>e.theme.action.secondaryBgHover}; }
`,Fh=(0,B.createContext)(null);function Ih({editor:e,children:t}){let[n,r]=(0,B.useState)(null),[i,a]=(0,B.useState)(null),[o,s]=(0,B.useState)(null),[c,l]=(0,B.useState)(null),[u,d]=(0,B.useState)(null),[f,p]=(0,B.useState)(null),[m,h]=(0,B.useState)(null),[g,_]=(0,B.useState)(null),[v,y]=(0,B.useState)(null),b=uh(),x=(0,B.useCallback)(e=>b?.open(e),[b]),S=(0,B.useCallback)(e=>{a(e),e!==null&&s(t=>t===null?t:e)},[]),C=(0,B.useCallback)(t=>{h(null);let n=document.activeElement;if(n&&n!==document.body&&n.closest(`main`)&&(!t||!n.closest(`[data-block-id="${CSS.escape(t)}"]`))&&n.blur(),r(t),t!==null){let n=Ii(e.doc,t);if(n){let t=e.doc.rows.findIndex(e=>e.id===n.row.id);t>=0&&s(e=>e===null?e:t+1)}}},[e.doc]);(0,B.useEffect)(()=>(b?.registerEdit(_),()=>b?.registerEdit(null)),[b]);let{startDrag:w}=wi(d,p,(0,B.useCallback)((t,n)=>e.dispatch(t.columnId?{type:`moveColumn`,rowId:t.rowId,columnId:t.columnId,target:n}:{type:`moveRow`,rowId:t.rowId,target:n}),[e])),T=(0,B.useCallback)(()=>{let e=document.activeElement;e&&e!==document.body&&e.closest(`main`)&&e.blur(),r(null),h(null)},[]),E=(0,B.useCallback)(()=>{let t=G();if(!t)return null;let i=n?Ii(e.doc,n):null,a=i?e.doc.rows.findIndex(e=>e.id===i.row.id)+1:e.doc.rows.length;return e.dispatch({type:`insertRow`,index:a,blocks:[t]}),r(t.id),t.id},[e,n]);(0,B.useEffect)(()=>{let t=t=>{let i=t.target,a=!!i&&(i.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(i.tagName)),o=t.metaKey||t.ctrlKey;if(t.key===`Escape`){(n||m||a)&&(t.preventDefault(),T());return}if(a)return;if(o&&t.key.toLowerCase()===`z`){t.preventDefault(),t.shiftKey?e.redo():e.undo();return}if(o&&t.key.toLowerCase()===`y`){t.preventDefault(),e.redo();return}if(o&&t.key.toLowerCase()===`v`){if(!ki())return;t.preventDefault(),E();return}if(!n)return;let s=Ii(e.doc,n);s&&(o&&t.key.toLowerCase()===`c`?(t.preventDefault(),Oi(s.block)):o&&t.key.toLowerCase()===`x`?(t.preventDefault(),Oi(s.block),e.dispatch({type:`deleteBlock`,blockId:s.block.id}),r(null)):o&&t.key.toLowerCase()===`d`?(t.preventDefault(),Oi(s.block),E()):(t.key===`Delete`||t.key===`Backspace`)&&(t.preventDefault(),e.dispatch({type:`deleteBlock`,blockId:s.block.id}),r(null)))};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e,n,m,T,E]);let D=(0,B.useMemo)(()=>({...e,selectedBlockId:n,select:C,deselect:T,paste:E,insertAt:i,openInsert:S,libraryAt:o,openLibrary:s,hoverGap:c,setHoverGap:l,draggingRowId:u,setDraggingRowId:d,dropTarget:f,setDropTarget:p,inlineSelection:m,setInlineSelection:h,popupFor:g,openPopupPanel:_,popupPick:v,setPopupPick:y,previewPopups:x,startDrag:w}),[e,n,C,T,E,i,S,o,c,u,f,m,g,v,x,w]);return(0,H.jsx)(Fh.Provider,{value:D,children:t})}function Lh(){return(0,B.useContext)(Fh)}function Rh(e,t,n=1,r){let i=Tr(`supplement`,n),a=e.borderWidth??1,o=Vh(e.borderColor,`var(--ds-text-primary)`),s=a>0?`${a}px solid ${o}`:`none`,c=e.preset??`plain`,l=e.hasHeader||c===`header`,u=r?.colWidths??pr(e),d=r?.rowMins??mr(e),f=(t,n)=>Vh(e.cellBg?.[`${t},${n}`],``)||(l&&t===0||c===`zebra`&&t%2==1?`var(--ds-surface-sunken)`:`transparent`);return{table:{width:`${t}px`,"border-collapse":`collapse`,"table-layout":`fixed`,"font-size":i.fontSize,"line-height":i.lineHeight,"font-weight":i.fontWeight,"font-family":i.fontFamily,color:`var(--ds-text-primary)`,"writing-mode":`horizontal-tb`},colWidths:u,rowMins:d,cell:(e,t)=>({border:s,padding:`6px 10px`,"box-sizing":`border-box`,"vertical-align":`top`,"text-align":`start`,"white-space":`pre-wrap`,"word-break":`break-word`,overflow:`hidden`,"font-weight":l&&e===0?`600`:`inherit`,background:f(e,t)})}}var zh=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),Bh=/^(#[0-9a-f]{3,8}|var\(--[a-z0-9-]+\)|transparent|rgba?\([\d\s.,%]+\))$/i,Vh=(e,t)=>e&&Bh.test(e)?e:t,Hh=(e,t)=>{for(let[n,r]of Object.entries(t))e.style.setProperty(n,r)};function Uh(e,t,n=1){let r=Rh(e,t,n),i=document.createElement(`table`);Hh(i,r.table);let a=document.createElement(`colgroup`);for(let e of r.colWidths){let t=document.createElement(`col`);t.style.width=`${e}%`,a.appendChild(t)}i.appendChild(a);let o=document.createElement(`tbody`);for(let t=0;t<e.rows;t++){let n=document.createElement(`tr`);n.style.height=`${r.rowMins[t]}px`;for(let i=0;i<e.cols;i++){let a=document.createElement(`td`);Hh(a,r.cell(t,i)),a.textContent=e.cells[t]?.[i]||`​`,n.appendChild(a)}o.appendChild(n)}return i.appendChild(o),i}var Wh=e=>{let t={};for(let[n,r]of Object.entries(e))t[n.replace(/-([a-z])/g,(e,t)=>t.toUpperCase())]=r;return t};function Gh(){let[e,t]=(0,B.useState)({}),n=(0,B.useRef)(new Map),r=(0,B.useRef)(new WeakMap),i=(0,B.useRef)(null);return{ref:e=>{let a=n.current.get(e);return a||(a=n=>{if(n)return!i.current&&typeof ResizeObserver<`u`&&(i.current=new ResizeObserver(e=>{t(t=>{let n=t;for(let i of e){let e=r.current.get(i.target),a=i.target.offsetHeight;e&&t[e]!==a&&(n={...n,[e]:a})}return n})})),r.current.set(n,e),i.current?.observe(n),()=>i.current?.unobserve(n)},n.current.set(e,a)),a},frame:(t,n,r=!1)=>e[t]?r?{...n,inlineSize:e[t]}:{...n,blockSize:e[t]}:n}}var Kh=4;function qh({block:e,boxStyle:t,sizing:n,scale:r=1,onSelect:i}){let a=Lh(),o=!!a,s=!!a&&a.selectedBlockId===e.id,c=n.vertical,l=typeof t?.width==`number`?t.width:n.inlineSize,u=c?n.inlineSize:n.maxBlockSize,d=(0,B.useRef)(null),f=(0,B.useRef)(null),[p,m]=(0,B.useState)(null),h=Rh(e,l,r,p??void 0),[g,_]=(0,B.useState)([]);(0,B.useLayoutEffect)(()=>{let e=f.current;if(!e)return;let t=Array.from(e.rows,e=>({top:e.offsetTop,height:e.offsetHeight}));_(e=>e.length===t.length&&e.every((e,n)=>e.top===t[n].top&&e.height===t[n].height)?e:t)});let v=gr(g.map(e=>e.height),u),y=Sp(),b=s&&y.cell?.blockId===e.id?y.cell:null,[x,S]=(0,B.useState)(!1),[C,w]=(0,B.useState)(null),[T,E]=(0,B.useState)(null),[D,O]=(0,B.useState)(null);(0,B.useEffect)(()=>{!o||s||(S(!1),w(null),E(null),y.cell?.blockId===e.id&&Cp(null))},[o,s,y.cell,e.id]),(0,B.useEffect)(()=>{if(!b||x)return;let e=f.current?.rows[b.r]?.cells[b.c];e&&document.activeElement!==e&&e.focus({preventScroll:!0})},[b,x]);let k=t=>{if(!a||t===e)return;let{id:n,type:r,popups:i,...o}=t;a.dispatch({type:`patchBlock`,blockId:e.id,blockType:`table`,patch:o})},A=(e,t)=>{if(e.contentEditable=`true`,t!==void 0&&(e.textContent=t,e.blur()),e.focus({preventScroll:!0}),t!==void 0){let t=document.createRange();t.selectNodeContents(e),t.collapse(!1);let n=window.getSelection();n?.removeAllRanges(),n?.addRange(t)}S(!0)},j=(t,n,r)=>{let i=t.innerText.replace(/\n$/,``);t.contentEditable=`false`,S(!1),k(fu(e,n,r,i))},M=()=>{let e=d.current;return e?e.getBoundingClientRect().width/(e.offsetWidth||1):1},N=t=>n=>{n.preventDefault(),n.stopPropagation();let r=M(),i=n.clientX,a=pr(e),o=a,s=e=>{let n=(e.clientX-i)/r/l*100,s=a[t]+a[t+1],c=Math.max(5,Math.min(s-5,a[t]+n));o=a.slice(),o[t]=c,o[t+1]=s-c,m({colWidths:o})},c=()=>{window.removeEventListener(`pointermove`,s),window.removeEventListener(`pointerup`,c),m(null),o!==a&&k(xu(e,o))};window.addEventListener(`pointermove`,s),window.addEventListener(`pointerup`,c)},P=t=>n=>{n.preventDefault(),n.stopPropagation();let r=M(),i=n.clientY,a=g[t]?.height??h.rowMins[t],o=null,s=n=>{o=Math.max(20,Math.round(a+(n.clientY-i)/r));let s=mr(e).slice();s[t]=o,m({rowMins:s})},c=()=>{window.removeEventListener(`pointermove`,s),window.removeEventListener(`pointerup`,c),m(null),o!==null&&k(bu(e,t,o))};window.addEventListener(`pointermove`,s),window.addEventListener(`pointerup`,c)},F=(t,n)=>r=>{r.preventDefault(),r.stopPropagation();let i=r.currentTarget,a=M(),o=r.clientX,s=r.clientY,c=!1,u=n,f=()=>{if(t===`col`){let e=0;return h.colWidths.map(t=>{let n=(e+t/2)/100*l;return e+=t,n})}return g.map(e=>e.top+e.height/2)},p=e=>{if(!c&&Math.hypot(e.clientX-o,e.clientY-s)<Kh)return;c=!0,E(null);let n=d.current.getBoundingClientRect(),r=t===`col`?(e.clientX-n.left)/a:(e.clientY-n.top)/a;u=f().filter(e=>e<r).length,O({kind:t,index:u})},m=()=>{if(window.removeEventListener(`pointermove`,p),window.removeEventListener(`pointerup`,m),O(null),!c){w({kind:t,index:n}),Cp(null),S(!1),E({kind:t,index:n,rect:i.getBoundingClientRect()});return}let r=u>n?u-1:u;r!==n&&(k(t===`col`?hu(e,n,r):vu(e,n,r)),w({kind:t,index:r}))};window.addEventListener(`pointermove`,p),window.addEventListener(`pointerup`,m)};(0,B.useEffect)(()=>{if(!T)return;let e=e=>{e.target.closest(`[data-table-menu]`)||E(null)},t=e=>e.key===`Escape`&&E(null);return window.addEventListener(`pointerdown`,e,!0),window.addEventListener(`keydown`,t,!0),()=>{window.removeEventListener(`pointerdown`,e,!0),window.removeEventListener(`keydown`,t,!0)}},[T]);let I=t=>{if(!T)return;let{kind:n,index:r}=T;E(null),w(null),k(n===`col`?t===`insert`?pu(e,r+1):mu(e,r):t===`insert`?gu(e,r+1):_u(e,r))},L=(t,n)=>r=>{if(!o||(w(null),!s))return;let i=r.currentTarget;if(b&&b.r===t&&b.c===n){x||A(i);return}r.preventDefault(),Cp({blockId:e.id,r:t,c:n}),S(!1)},ee=(t,n)=>r=>{let i=r.currentTarget;if(!(!b||b.r!==t||b.c!==n)){if(x){if(r.key===`Enter`&&!r.shiftKey)r.preventDefault(),r.stopPropagation(),i.blur();else if(r.key===`Escape`)r.preventDefault(),r.stopPropagation(),i.blur();else if(r.key===`Tab`){r.preventDefault(),r.stopPropagation(),i.blur();let a=r.shiftKey?t*e.cols+n-1:t*e.cols+n+1;a>=0&&a<e.rows*e.cols&&Cp({blockId:e.id,r:Math.floor(a/e.cols),c:a%e.cols})}return}r.key===`Enter`?(r.preventDefault(),r.stopPropagation(),A(i)):r.key===`Escape`?(r.preventDefault(),r.stopPropagation(),Cp(null)):r.key===`Backspace`||r.key===`Delete`?(r.preventDefault(),r.stopPropagation(),k(fu(e,t,n,``))):r.key.length===1&&!r.metaKey&&!r.ctrlKey&&!r.altKey&&(r.preventDefault(),r.stopPropagation(),A(i,r.key))}},te=(0,B.useRef)(new Map),ne=e=>{let t=te.current.get(e);return t||(t={__html:zh(e)||`&#8203;`},te.current.set(e,t)),t},re=e=>h.colWidths.slice(0,e).reduce((e,t)=>e+t,0),ie=s&&!c;return(0,H.jsxs)(Jh,{ref:d,style:c?{width:t?.width}:{width:l},onPointerDown:i,"data-table-block":!0,children:[(0,H.jsxs)(Yh,{style:{maxHeight:u},children:[(0,H.jsxs)(`table`,{ref:f,style:Wh(h.table),children:[(0,H.jsx)(`colgroup`,{children:h.colWidths.map((e,t)=>(0,H.jsx)(`col`,{style:{width:`${e}%`}},t))}),(0,H.jsx)(`tbody`,{children:Array.from({length:e.rows},(t,n)=>(0,H.jsx)(`tr`,{style:{height:h.rowMins[n]},children:Array.from({length:e.cols},(t,r)=>{let i=e.cells[n]?.[r]??``,a=!!b&&b.r===n&&b.c===r;return(0,H.jsx)(Xh,{style:Wh(h.cell(n,r)),$selected:a,$editing:a&&x,tabIndex:o&&s?-1:void 0,contentEditable:a&&x?`true`:void 0,suppressContentEditableWarning:!0,onPointerDown:L(n,r),onKeyDown:o?ee(n,r):void 0,onBlur:a&&x?e=>j(e.currentTarget,n,r):void 0,dangerouslySetInnerHTML:ne(i)},r)})},n))})]}),v&&(0,H.jsxs)(Zh,{"data-ui":!0,children:[`還有 `,v.hidden,` 列放不下這一頁。表格不能跨頁，請拆成兩個表格。`]})]}),ie&&(0,H.jsxs)(H.Fragment,{children:[C&&C.kind===`col`&&(0,H.jsx)(Qh,{style:{left:`${re(C.index)}%`,width:`${h.colWidths[C.index]}%`,top:0,height:Math.min(g.reduce((e,t)=>e+t.height,0),u)}}),C&&C.kind===`row`&&g[C.index]&&(0,H.jsx)(Qh,{style:{left:0,width:`100%`,top:g[C.index].top,height:g[C.index].height}}),D&&D.kind===`col`&&(0,H.jsx)($h,{$vertical:!0,style:{left:`${re(D.index)}%`}}),D&&D.kind===`row`&&(0,H.jsx)($h,{style:{top:D.index<g.length?g[D.index].top:g.reduce((e,t)=>e+t.height,0)}}),h.colWidths.slice(0,-1).map((e,t)=>(0,H.jsx)(eg,{"data-ui":!0,style:{left:`${re(t+1)}%`},onPointerDown:N(t),"aria-label":`調整欄寬`},`c${t}`)),g.map((e,t)=>(0,H.jsx)(tg,{"data-ui":!0,style:{top:e.top+e.height},onPointerDown:P(t),"aria-label":`調整列高`},`r${t}`)),h.colWidths.map((e,t)=>(0,H.jsx)(ng,{"data-ui":!0,$on:C?.kind===`col`&&C.index===t||T?.kind===`col`&&T.index===t,style:{left:`${re(t)+e/2}%`},onPointerDown:F(`col`,t),title:`拖曳調整順序，點一下開選單`,"aria-label":`第 ${t+1} 欄`,children:(0,H.jsx)(ig,{})},`h${t}`)),g.map((e,t)=>(0,H.jsx)(rg,{"data-ui":!0,$on:C?.kind===`row`&&C.index===t||T?.kind===`row`&&T.index===t,style:{top:e.top+e.height/2},onPointerDown:F(`row`,t),title:`拖曳調整順序，點一下開選單`,"aria-label":`第 ${t+1} 列`,children:(0,H.jsx)(ig,{$vertical:!0})},`rh${t}`)),(0,H.jsx)(og,{"data-ui":!0,type:`button`,title:`新增一欄`,"aria-label":`新增一欄`,onPointerDown:e=>e.stopPropagation(),onClick:()=>k(pu(e,e.cols)),children:(0,H.jsx)(U,{name:`plus`,size:16})}),(0,H.jsx)(sg,{"data-ui":!0,type:`button`,title:`新增一列`,"aria-label":`新增一列`,onPointerDown:e=>e.stopPropagation(),onClick:()=>k(gu(e,e.rows)),children:(0,H.jsx)(U,{name:`plus`,size:16})})]}),T&&(0,pi.createPortal)((0,H.jsxs)(cg,{"data-table-menu":!0,"data-ui":!0,role:`menu`,style:T.kind===`col`?{top:T.rect.bottom+6,left:T.rect.left+T.rect.width/2,transform:`translateX(-50%)`}:{top:T.rect.top+T.rect.height/2,left:T.rect.left-6,transform:`translate(-100%, -50%)`},children:[(0,H.jsx)(lg,{type:`button`,role:`menuitem`,onClick:()=>I(`insert`),children:T.kind===`col`?`向右新增一欄`:`向下新增一列`}),(0,H.jsx)(lg,{type:`button`,role:`menuitem`,disabled:T.kind===`col`?e.cols<=1:e.rows<=1,onClick:()=>I(`delete`),children:T.kind===`col`?`刪除此欄`:`刪除此列`})]}),document.body)]})}var Jh=V.div`
  position: relative;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`,Yh=V.div`
  position: relative;
  overflow: hidden;
  overflow: clip;
`,Xh=V.td`
  /*
   * 選取框用內縮的 box-shadow 畫：不改尺寸（量測端看不到它是對的），
   * 也不會被全域的「滑鼠點的焦點不畫框」規則蓋掉——outline 會。
   * 打字中換成淡一點的框，表示現在框裡的是游標不是整格。
   */
  box-shadow: ${e=>e.$editing?`inset 0 0 0 2px ${e.theme.tool.borderSubtle}`:e.$selected?`inset 0 0 0 2px ${e.theme.tool.border}`:`none`};
  cursor: ${e=>e.$editing?`text`:`default`};
  &:focus,
  &:focus-visible { outline: none; }
`,Zh=V.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  block-size: ${32}px;
  padding: 0 ${10}px;
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.feedback.warningDefault};
  background: ${e=>e.theme.feedback.warningSurface};
`,Qh=V.div`
  position: absolute;
  pointer-events: none;
  z-index: 7;
  outline: ${e=>e.theme.border.widthSelected} solid ${e=>e.theme.tool.border};
  outline-offset: -1px;
  background: ${e=>e.theme.tool.surfaceSubtle};
  opacity: 0.6;
`,$h=V.div`
  position: absolute;
  pointer-events: none;
  z-index: 9;
  background: ${e=>e.theme.text.primary};
  ${e=>e.$vertical?`top: 0; bottom: 0; width: 3px; transform: translateX(-50%);`:`left: 0; right: 0; height: 3px; transform: translateY(-50%);`}
`,eg=V.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10px;
  transform: translateX(-50%);
  cursor: col-resize;
  touch-action: none;
  /* 跟橫的格線交會處直的在上——交會處總得有一個贏，往旁邊移一點就抓得到另一條 */
  z-index: 9;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    transform: translateX(-50%);
    background: ${e=>e.theme.text.primary};
    opacity: 0;
    transition: opacity 0.12s;
  }
  &:hover::after,
  &:active::after { opacity: 1; }
`,tg=V.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 10px;
  transform: translateY(-50%);
  cursor: row-resize;
  touch-action: none;
  z-index: 8;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 2px;
    transform: translateY(-50%);
    background: ${e=>e.theme.text.primary};
    opacity: 0;
    transition: opacity 0.12s;
  }
  &:hover::after,
  &:active::after { opacity: 1; }
`,ng=V.div`
  position: absolute;
  top: -10px;
  transform: translate(-50%, -100%);
  z-index: 9;
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 16px;
  border-radius: ${e=>e.theme.radius.control};
  border: ${e=>e.theme.border.widthDefault} solid
    ${e=>e.$on?e.theme.brand.primaryHover:e.theme.border.subtle};
  background: ${e=>e.$on?e.theme.brand.primaryTint:e.theme.surface.raised};
  color: ${e=>e.$on?e.theme.text.primary:e.theme.icon.secondary};
  cursor: grab;
  touch-action: none;
  opacity: ${e=>e.$on?1:.5};
  transition: opacity 0.12s, border-color 0.12s;
  &:hover { opacity: 1; border-color: ${e=>e.theme.border.hover}; color: ${e=>e.theme.text.primary}; }
  &:active { cursor: grabbing; }
`,rg=V(ng)`
  top: auto;
  left: -10px;
  transform: translate(-100%, -50%);
  inline-size: 16px;
  block-size: 28px;
`,ig=V.span`
  display: inline-block;
  inline-size: ${e=>e.$vertical?`3px`:`11px`};
  block-size: ${e=>e.$vertical?`11px`:`3px`};
  background: radial-gradient(circle, currentColor 1.2px, transparent 1.4px) 0 0 / 4px 4px;
`,ag=V.button`
  position: absolute;
  z-index: 9;
  display: grid;
  place-items: center;
  inline-size: 20px;
  block-size: 20px;
  padding: 0;
  border-radius: ${e=>e.theme.radius.control};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.icon.secondary};
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.12s, border-color 0.12s;
  &:hover { opacity: 1; border-color: ${e=>e.theme.border.hover}; color: ${e=>e.theme.text.primary}; }
`,og=V(ag)`
  top: 50%;
  right: -8px;
  transform: translate(100%, -50%);
`,sg=V(ag)`
  left: 50%;
  bottom: -8px;
  transform: translate(-50%, 100%);
`,cg=V.div`
  position: fixed;
  z-index: 960;
  display: flex;
  flex-direction: column;
  padding: 4px;
  min-inline-size: 140px;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.raised};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  box-shadow: ${e=>e.theme.shadow.float};
  writing-mode: horizontal-tb;
`,lg=V.button`
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  text-align: start;
  padding: 8px 12px;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: transparent;
  color: ${e=>e.theme.text.primary};
  cursor: pointer;
  &:hover:not(:disabled) { background: ${e=>e.theme.surface.sunken}; }
  &:disabled { color: ${e=>e.theme.text.disabled}; cursor: default; }
`;function ug(e){let t=e.settings.writingMode===`vertical`,n=wr[e.settings.textScale],r=e.host??document.body,i=document.createElement(`div`);i.setAttribute(`aria-hidden`,`true`),i.style.cssText=[`position:absolute`,`top:0`,`left:-99999px`,`visibility:hidden`,`pointer-events:none`,`contain:strict`].join(`;`),r.appendChild(i);let a=()=>{i.isConnected||r.appendChild(i)},o=document.createElement(`div`);o.className=`ds-rich`,i.appendChild(o);let s=e=>t?e.width:e.height;function c(e,r,i){a();let s=Lr(e,{inlineSize:r,maxBlockSize:i,vertical:t}),c=Tr(e.role,n,e.fontSize,e.lineHeight,s.vertical);return o.style.fontSize=c.fontSize,o.style.lineHeight=c.lineHeight,o.style.fontWeight=c.fontWeight,o.style.fontFamily=c.fontFamily,o.style.textAlign=e.align??``,o.style.writingMode=s.vertical?`vertical-rl`:`horizontal-tb`,s.vertical?o.dataset.vertical=`true`:delete o.dataset.vertical,s.flipped&&!s.vertical?o.dataset.horizontal=`true`:delete o.dataset.horizontal,e.paragraph?o.dataset.pno=`一`:delete o.dataset.pno,o.style.maxWidth=``,o.style.maxHeight=``,o.style.overflow=``,s.flipped?Object.assign(o.style,s.style):t?(o.style.height=`${r}px`,o.style.width=`max-content`):(o.style.width=`${r}px`,o.style.height=`auto`),o.innerHTML=ui(e.spans)||`&#8203;`,o}return{blockSize(e,r,i){if(e.type===`text`){let t=c(e,r,i);return s(t.getBoundingClientRect())}a();let l=vr(e,{inlineSize:r,maxBlockSize:i,vertical:t});if(!l)return 0;if(e.type===`table`&&!t){o.style.width=`${r}px`,o.style.height=`auto`,o.replaceChildren(Uh(e,l.inlineSize,n));let t=o.firstElementChild,a=t?t.getBoundingClientRect().height:l.blockSize;return Math.min(a,i)}let u=e.type===`image`&&(e.hasCaption??e.caption.trim().length>0)?e.caption||`圖說`:e.type===`pdf`?e.title:``;if(u){let t=c({...e,type:`text`,role:`caption`,spans:[{text:u}],blockSize:void 0},r,i),n=s(t.getBoundingClientRect());return l.blockSize+rr.attached+n}return l.blockSize},textLineSizes(e,t){let n=c(e,t,1/0);if(!n.firstChild)return[];let r=document.createRange();r.selectNodeContents(n);let i=Array.from(r.getClientRects()).filter(e=>e.width>0&&e.height>0);return r.detach?.(),i.length===0?[s(n.getBoundingClientRect())]:i.map(s)},dispose(){i.remove()}}}function dg(e){if(e.type===`text`){let t=e;return`${t.role} ${t.fontSize??``} ${t.lineHeight??``} ${t.writingMode??``} ${t.blockSize??``} ${t.paragraph?`p`:``} ${ui(t.spans)}`}let t=`${e.widthPct??``}/${e.blockSize??``}`;switch(e.type){case`image`:let n=e.crop?`${e.crop.x},${e.crop.y},${e.crop.w},${e.crop.h}`:``;return`${e.assetId} ${e.aspectRatio} ${n} ${t} ${e.hasCaption??``} ${e.caption}`;case`table`:return`${e.rows}x${e.cols} ${t} ${e.hasHeader} ${e.preset??``} ${e.borderWidth??``} ${(e.colWidths??[]).join(`,`)}/${(e.rowHeights??[]).join(`,`)} ${JSON.stringify(e.cells)}`;case`question`:return`${e.stem.map(e=>e.text).join(``)} ${e.options.length}`;case`pdf`:return`${e.id} ${t} ${e.title}`;case`video`:return`${e.id} ${t}`;case`web`:return`${e.id} ${e.presentation} ${e.chosen!==!1} ${t}`;case`shape`:return`${e.id} ${e.shape} ${t}`;default:return`${e.id} ${t}`}}var fg=4e3;function pg(e){let t=new Map,n=new Map,r={hits:0,misses:0},i=e=>{if(e.size<=fg)return;let t=e.size-fg,n=0;for(let r of e.keys())if(e.delete(r),++n>=t)break};return{stats:r,blockSize(n,a,o){let s=`${dg(n)}|${a}|${o}`,c=t.get(s);if(c!==void 0)return r.hits+=1,c;r.misses+=1;let l=e.blockSize(n,a,o);return t.set(s,l),i(t),l},textLineSizes(t,a){let o=`${dg(t)}|${a}`,s=n.get(o);if(s!==void 0)return r.hits+=1,s;r.misses+=1;let c=e.textLineSizes(t,a);return n.set(o,c),i(n),c},clear(){t.clear(),n.clear(),r.hits=0,r.misses=0},size(){return t.size+n.size}}}function mg(e,t,n){let r=e.writingMode===`vertical`;return{contentInlineSize:r?t.height:t.width,contentBlockSize:r?t.width:t.height,columnGap:n,...e.layout===`flow`?{layout:`flow`,vertical:r}:{}}}var hg=(e,t)=>{let n=t.columnGap*(e.columns.length-1),r=t.contentInlineSize-n;return e.columns.map(e=>r*e.widthPct/100)};function gg(e,t,n){let r=hg(e,t);return Math.max(0,...e.columns.map((e,i)=>e.blocks.reduce((e,a)=>e+n.blockSize(a,r[i],t.contentBlockSize),0)))}function _g(e){if(e.columns.length!==1)return null;let t=e.columns[0].blocks;if(t.length!==1)return null;let n=t[0];return n.type!==`text`||!Qn(n.type)||n.writingMode?null:n}function vg(e,t,n,r,i){let a=hg(e,r)[0],o=i.textLineSizes(t,a);if(o.length<2)return null;let s=0,c=0;for(let e of o){if(s+e>n)break;s+=e,c+=1}if(c<1||c>=o.length)return null;let l=c/o.length,u=Kr(t.spans),d=Math.max(1,Math.round(u*l)),f={...t,spans:ei(t.spans,0,d)},p={...t,spans:ei(t.spans,d,u)};return{head:{...e,columns:[{...e.columns[0],blocks:[f]}]},headBlockSize:s,tail:{...e,breakBefore:!1,columns:[{...e.columns[0],blocks:[p]}]},cut:d}}function yg(e,t,n){let r=[],i=[],a=0,o=`first`,s=e=>{r.push({index:r.length,items:i,startedBy:o,usedBlockSize:a}),i=[],a=0,o=e};if(t.layout===`flow`&&t.vertical){for(let r of e){r.breakBefore&&i.length>0&&s(`manual`);let e=i.length>0?i[i.length-1].row:null,o=i.length===0?0:lr(e,r),c=gg(r,t,n);i.push({row:r,gapBefore:o,blockSize:c,continuedFromPrev:!1,continuesOnNext:!1}),a+=o+c}return s(`auto`),r}let c=e.map(e=>({row:e,continued:!1,offset:0})),l=(e,t,n)=>{if(t===0&&!n)return;let r=_g(e);if(r)return{start:t,end:t+Kr(r.spans)}};for(;c.length>0;){let{row:e,continued:r,offset:o}=c.shift();e.breakBefore&&i.length>0&&s(`manual`);let u=i.length>0?i[i.length-1].row:null,d=i.length===0?0:lr(u,e),f=gg(e,t,n),p=t.contentBlockSize-a-d;if(f<=p){i.push({row:e,gapBefore:d,blockSize:f,continuedFromPrev:r,continuesOnNext:!1,textSlice:l(e,o,!1)}),a+=d+f;continue}let m=_g(e);if(m&&p>0){let l=vg(e,m,p,t,n);if(l){i.push({row:l.head,gapBefore:d,blockSize:l.headBlockSize,continuedFromPrev:r,continuesOnNext:!0,textSlice:{start:o,end:o+l.cut}}),a+=d+l.headBlockSize,s(`auto`),c.unshift({row:l.tail,continued:!0,offset:o+l.cut});continue}}if(i.length>0){s(`auto`),c.unshift({row:e,continued:r,offset:o});continue}i.push({row:e,gapBefore:0,blockSize:f,continuedFromPrev:r,continuesOnNext:!1,textSlice:l(e,o,!1)}),a+=f}if(s(`auto`),t.layout===`flow`&&!t.vertical){let e=[];for(let t of r)if(e.length===0||t.startedBy===`manual`)e.push({index:e.length,items:[...t.items],startedBy:e.length===0?`first`:`manual`,usedBlockSize:t.usedBlockSize,panels:[t.items]});else{let n=e[e.length-1];n.items.push(...t.items),n.usedBlockSize+=t.usedBlockSize,n.panels.push(t.items)}return e}return r}function bg(e,t){let{writingMode:n,textScale:r,aspectRatio:i,layout:a}=e.settings,[o,s]=(0,B.useState)(()=>!document.fonts||document.fonts.status===`loaded`);(0,B.useEffect)(()=>{if(o||!document.fonts)return;let e=!0;return document.fonts.ready.then(()=>e&&s(!0)),()=>{e=!1}},[o]);let c=(0,B.useMemo)(()=>{let e=ug({settings:{writingMode:n,textScale:r}});return{cached:pg(e),dispose:e.dispose}},[n,r,o]),l=(0,B.useRef)(c);return(0,B.useEffect)(()=>{l.current!==c&&(l.current.dispose(),l.current=c)},[c]),{pages:(0,B.useMemo)(()=>{let r=Yn({aspectRatio:i},t),o=mg({writingMode:n,layout:a},r,48);return yg(e.rows,o,c.cached)},[e.rows,i,n,a,c,t?.width,t?.height]),stats:c.cached.stats}}var xg=[`setMeta`,`setText`,`setSpans`,`setTitle`,`setColumnWidths`,`resizeBlock`],Sg=(e,t)=>e.find(e=>e.id===t)??null,Cg=/(==[^=]+==)|(\{[^}|]+\|[^}]+\})|(\[\^[^\]]+\])/g;function wg(e){let t=[],n=0,r=e=>{if(!e)return;let n=t[t.length-1];n&&Object.keys(n).length===1?n.text+=e:t.push({text:e})};for(let i of e.matchAll(Cg))if(r(e.slice(n,i.index)),n=i.index+i[0].length,i[1])for(let e of wg(i[1].slice(2,-2)))t.push({...e,keyword:!0});else if(i[2]){let[e,n]=i[2].slice(1,-1).split(`|`);t.push({text:e,ruby:n})}else i[3]&&t.push({text:``,footnoteRef:i[3].slice(2,-1)});return r(e.slice(n)),t.length>0?t:[{text:``}]}var Tg={1:`lessonTitle`,2:`sectionTitle`,3:`itemTitle`,4:`subItemTitle`};function Eg(e){let t=/^---\n([\s\S]*?)\n---\n?/.exec(e);if(!t)return{meta:{},settings:{},title:``,rest:e};let n={};for(let e of t[1].split(`
`)){let t=/^([a-zA-Z_]+):\s*(.*)$/.exec(e);t&&(n[t[1]]=t[2].replace(/\s+#.*$/,``).trim())}let r=/\[\s*(\d+)\s*,\s*(\d+)\s*\]/.exec(n.page??``);return{title:n.title??``,settings:{...n.direction===`直排`?{writingMode:`vertical`}:{},...n.direction===`橫排`?{writingMode:`horizontal`}:{},...n.layout===`自動切頁`?{layout:`paged`}:{},...n.layout===`流式排版`?{layout:`flow`}:{}},meta:{sourceId:n.id,publisher:n.publisher,stage:n.stage,grade:n.grade,term:n.term,subject:n.subject,unit:n.unit,printPageRange:r?[Number(r[1]),Number(r[2])]:void 0},rest:e.slice(t[0].length),...n.pagebreak?{breakAt:new Set(n.pagebreak.split(/[,，、]/).map(e=>e.trim()).filter(Boolean))}:{}}}var Dg={heading:/^(#{1,4})\s+(.*)$/,image:/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,dialogue:/@對話\[([^\]]*)\]\{([^}]*)\}/g,printPage:/^@頁\[(\d+)\]$/,reference:/^@參照\[([^\]]*)\]\{([^}]*)\}$/,link:/^@連結\[([^\]]*)\]\(([^)]+)\)(\{QR\})?$/,audio:/^@音檔\[([^\]]*)\]\(([^)]+)\)$/,video:/^@影片\[([^\]]*)\]\(([^)]+)\)(?:\{字幕=([^}]+)\})?$/,label:/^@題型\[([^\]]*)\]$/,module:/^@模組\[([^\]]*)\]\(([^)]+)\)(?:\{([^}]*)\})?$/,questionStem:/^(\d+)\.\s*(?:@題型\[([^\]]*)\]\s*)?(.*)$/,questionOption:/^\s*-\s*[（(]([A-Za-z])[）)]\s*(.*)$/,writingOverride:/^@排版\[([^\]]*)\]$/,footnoteDef:/^\[\^([^\]]+)\]:\s*(\S+)\s+([\s\S]*)$/,tableRow:/^\|(.+)\|$/,tableSep:/^\|[\s:|-]+\|$/},Og=e=>e.replace(/^[　\s]+/,``);function kg(e){if(!e)return;let t={};for(let n of e.split(`,`)){let e=n.indexOf(`=`);e>0&&(t[n.slice(0,e).trim()]=n.slice(e+1).trim())}return Object.keys(t).length>0?t:void 0}var Ag=e=>e.slice(1,-1).split(`|`).map(e=>e.trim());function jg(e,t){let{meta:n,settings:r,title:i,rest:a,breakAt:o}=Eg(e),s=[],c=[],l=[],u=[],d,f,p,m=(e,t=!1)=>{e.length!==0&&(f&&=(e[0]={...e[0],label:f},void 0),s.push({id:W(`row`),breakBefore:t,printPage:d,columns:[{id:W(`col`),widthPct:100,blocks:e}]}),d=void 0)},h=(e,t)=>{let n=p;return p=void 0,{id:W(`blk`),type:`text`,role:t,...n?{writingMode:n}:{},popups:[],spans:wg(e)}},g=a.replace(/\r\n?/g,`
`).split(/\n{2,}/);for(let e of g){let n=e.trim();if(!n)continue;let r=n.split(`
`).map(e=>e.trim()).filter(Boolean);if(r.length>=2&&r.every(e=>Dg.tableRow.test(e))){let e=r.filter(e=>!Dg.tableSep.test(e)).map(Ag);m([{id:W(`blk`),type:`table`,rows:e.length,cols:Math.max(...e.map(e=>e.length)),cells:e,hasHeader:r.some(e=>Dg.tableSep.test(e)),popups:[]}]);continue}if(r.every(e=>Dg.footnoteDef.test(e))){for(let e of r){let t=Dg.footnoteDef.exec(e);c.push({id:t[1],term:t[2],body:t[3].trim()})}continue}if(r.every(e=>e.startsWith(`@對話[`))){let e=[];for(let t of n.matchAll(Dg.dialogue))e.push({id:W(`blk`),type:`dialogue`,speaker:t[1],text:t[2],popups:[]});for(let t of e)m([t]);continue}if(Dg.questionStem.test(r[0])&&r.some(e=>Dg.questionOption.test(e))){let e=Dg.questionStem.exec(r[0]),t=[];for(let e of r.slice(1)){let n=Dg.questionOption.exec(e);n&&t.push({key:n[1].toUpperCase(),text:wg(n[2])})}let n=e[3];m([{id:W(`blk`),type:`question`,number:e[1],questionType:e[2]||f,stem:wg(n),options:t,multiple:/多選/.test(n),popups:[]}]),f=void 0;continue}let i=r.join(``),a;if(a=Dg.heading.exec(i)){let e=Tg[a[1].length],n=e===`lessonTitle`||e===`sectionTitle`&&(!o||o.has(a[2].trim()));m([h(a[2],e)],t.autoPageBreak&&n);continue}if(a=Dg.printPage.exec(i)){d=Number(a[1]);continue}if(a=Dg.label.exec(i)){f=a[1];continue}if(a=Dg.writingOverride.exec(i)){a[1]===`橫排`?p=`horizontal`:a[1]===`直排`?p=`vertical`:u.push(i);continue}if(a=Dg.image.exec(i)){let e=a[3]??``;m([{id:W(`blk`),type:`image`,assetId:a[2],alt:a[1],caption:e,hasCaption:!!e.trim(),aspectRatio:1.5,popups:[]}]);continue}if(a=Dg.reference.exec(i)){m([{id:W(`blk`),type:`reference`,target:a[1],pages:a[2],popups:[]}]);continue}if(a=Dg.link.exec(i)){m([{id:W(`blk`),type:`web`,url:a[2],title:a[1],presentation:a[3]?`qr`:`bookmark`,popups:[]}]);continue}if(a=Dg.audio.exec(i)){m([{id:W(`blk`),type:`audio`,assetId:a[2],title:a[1],popups:[]}]);continue}if(a=Dg.video.exec(i)){m([{id:W(`blk`),type:`video`,source:`upload`,ref:a[2],title:a[1],captionsRef:a[3],popups:[]}]);continue}if(a=Dg.module.exec(i)){m([{id:W(`blk`),type:`module`,moduleKind:a[2],title:a[1],params:kg(a[3]),popups:[]}]);continue}if(i.startsWith(`>`)){m([h(r.map(e=>e.replace(/^>\s?/,``)).join(``),`annotation`)]);continue}if(i.startsWith(`@`)){l.push(i);continue}let g=Og(r.map(Og).join(``)),_=s[s.length-1],v=_?.columns.length===1&&_.columns[0].blocks.length===1?_.columns[0].blocks[0]:null;if(d!==void 0&&!/^[　\s]/.test(e)&&v?.type===`text`&&v.role===`body`){_.columns[0].blocks[0]={...v,spans:$r([...v.spans,...wg(g)])},_.printPage??(s[s.length-1]={..._,printPage:d}),d=void 0;continue}m([h(g,`body`)])}return s.length>0&&(s[0]={...s[0],breakBefore:!1}),{rows:s,meta:n,settings:r,footnotes:c,title:i,unrecognized:l,skipped:u}}function Mg(e,t){return Hl(Ri(Li({...e,title:t.title||e.title,settings:{...e.settings,...t.settings},meta:{...e.meta,...t.meta},rows:t.rows,footnotes:t.footnotes})))}var Ng=e=>Math.max(10,Math.min(100,e));function Pg(e){let t=e.reduce((e,t)=>e+t.widthPct,0)||1;return e.map(e=>({...e,widthPct:e.widthPct/t*100}))}function Fg(e,t,n){let r=!1,i=e.rows.map(e=>({...e,columns:e.columns.map(e=>({...e,blocks:e.blocks.map(e=>{if(e.id!==t)return e;let i=n(e);return i===e?e:(r=!0,i)})}))}));return r?{...e,rows:i}:e}function Ig(e,t){let n=e.find(e=>e.id===t)??null;return{rest:e.filter(e=>e.id!==t),taken:n}}function Lg(e,t,n){if(n.mode===`row`){let r=Math.max(0,Math.min(n.index,e.length)),i=e.slice();return i.splice(r,0,{...t,columns:Pg(t.columns)}),i}return e.map(e=>{if(e.id!==n.rowId)return e;if(t.columns.length>1){let r=n.side===`left`?[...t.columns,...e.columns]:[...e.columns,...t.columns];return{...e,columns:Pg(r.map(e=>({...e,widthPct:100/r.length})))}}let r={id:W(`col`),widthPct:100/(e.columns.length+1),blocks:t.columns.flatMap(e=>e.blocks)};if(e.columns.length===1&&n.keepPct!==void 0){let t=Math.max(10,Math.min(90,n.keepPct)),i=n.fitPct,a=e.columns[0],o={...a,widthPct:t,blocks:i===void 0?a.blocks:a.blocks.map(e=>e.type===`text`?e:{...e,widthPct:Ng(i)})},s={...r,widthPct:100-t};return{...e,columns:Pg(n.side===`left`?[s,o]:[o,s])}}let i=n.side===`left`?[r,...e.columns]:[...e.columns,r],a=i.map(e=>({...e,widthPct:100/i.length}));return{...e,columns:Pg(a)}})}function Rg(e){return e.map(e=>{let t=e.columns.filter(e=>e.blocks.length>0);return t.length===e.columns.length?e:{...e,columns:Pg(t)}}).filter(e=>e.columns.length>0)}function zg(e,t){switch(t.type){case`setTitle`:return{...e,title:t.title};case`setSettings`:return{...e,settings:{...e.settings,...t.patch}};case`setMeta`:return{...e,meta:{...e.meta,...t.patch}};case`insertRow`:{let n=Math.max(0,Math.min(t.index,e.rows.length)),r=e.rows.slice();return r.splice(n,0,{id:W(`row`),breakBefore:t.breakBefore??!1,columns:[{id:W(`col`),widthPct:100,blocks:t.blocks}]}),{...e,rows:r}}case`insertRows`:{if(t.rows.length===0)return e;let n=Math.max(0,Math.min(t.index,e.rows.length)),r=e.rows.slice();return r.splice(n,0,...t.rows.map(e=>({id:W(`row`),breakBefore:!1,columns:[{id:W(`col`),widthPct:100,blocks:e}]}))),{...e,rows:r}}case`deleteRow`:{let n=e.rows.filter(e=>e.id!==t.rowId);return n.length===e.rows.length?e:{...e,rows:n}}case`deleteRows`:{let n=new Set(t.rowIds),r=e.rows.filter(e=>!n.has(e.id));return r.length===e.rows.length?e:{...e,rows:r.length>0?r:[ji([Mi(``,`lessonTitle`)])]}}case`moveRows`:{let n=new Set(t.rowIds),r=e.rows.filter(e=>n.has(e.id));if(r.length===0||t.beforeRowId!==null&&(n.has(t.beforeRowId)||!e.rows.some(e=>e.id===t.beforeRowId)))return e;let i=e.rows.filter(e=>!n.has(e.id)),a=t.beforeRowId===null?i.length:i.findIndex(e=>e.id===t.beforeRowId),o=[...i.slice(0,a),...r,...i.slice(a)];return o.every((t,n)=>t===e.rows[n])?e:{...e,rows:o}}case`deleteBlock`:{let n=!1,r=e.rows.map(e=>({...e,columns:e.columns.map(e=>{let r=e.blocks.filter(e=>e.id!==t.blockId);return r.length===e.blocks.length?e:(n=!0,{...e,blocks:r})})}));return n?{...e,rows:Rg(r)}:e}case`moveColumn`:{let n=e.rows.find(e=>e.id===t.rowId);if(!n||n.columns.length<2)return e;let r=n.columns.find(e=>e.id===t.columnId);if(!r)return e;let i={...n,columns:Pg(n.columns.filter(e=>e.id!==r.id))},a=e.rows.map(e=>e.id===n.id?i:e),o={id:W(`row`),breakBefore:!1,columns:[r]};return{...e,rows:Rg(Lg(a,o,t.target))}}case`moveRow`:{let n=e.rows.findIndex(e=>e.id===t.rowId);if(n<0)return e;let{rest:r,taken:i}=Ig(e.rows,t.rowId);if(!i)return e;let a=Rg(Lg(r,i,t.target.mode===`row`&&t.target.index>n?{...t.target,index:t.target.index-1}:t.target));return a.length===e.rows.length&&a.every((t,n)=>t.id===e.rows[n].id&&t.columns.length===e.rows[n].columns.length)?e:{...e,rows:a}}case`setColumnWidths`:return{...e,rows:e.rows.map(e=>e.id===t.rowId&&t.widths.length===e.columns.length?{...e,columns:Pg(e.columns.map((e,n)=>({...e,widthPct:t.widths[n]})))}:e)};case`setBreakBefore`:{let n=e.rows.find(e=>e.id===t.rowId);return!n||n.breakBefore===t.value?e:{...e,rows:e.rows.map(e=>e.id===t.rowId?{...e,breakBefore:t.value}:e)}}case`setPageBackground`:{let n=e.rows.find(e=>e.id===t.rowId);return!n||(n.pageBackground?.color??null)===(t.background?.color??null)&&(n.pageBackground?.assetId??null)===(t.background?.assetId??null)?e:{...e,rows:e.rows.map(e=>{if(e.id!==t.rowId)return e;if(!t.background){let{pageBackground:t,...n}=e;return n}return{...e,pageBackground:t.background}})}}case`resizeBlock`:return Fg(e,t.blockId,e=>{if(e.type===`text`)return e;let n=t.widthPct===void 0?void 0:Ng(t.widthPct),r=t.blockSize===void 0?void 0:Math.max(24,t.blockSize);if(e.widthPct===n&&e.blockSize===r)return e;let{widthPct:i,blockSize:a,...o}=e;return{...o,...n===void 0?{}:{widthPct:n},...r===void 0?{}:{blockSize:r}}});case`importDoc`:return Mg(e,t.result);case`setText`:return Fg(e,t.blockId,e=>e.type===`text`?{...e,spans:[{text:t.text}]}:e);case`setSpans`:return Fg(e,t.blockId,e=>e.type===`text`?{...e,spans:$r(t.spans)}:e);case`toggleMark`:return Fg(e,t.blockId,e=>{if(e.type!==`text`||t.start>=t.end)return e;let n=ei(e.spans,t.start,t.end).map(e=>({...e,[t.mark]:t.on?!0:void 0}));return{...e,spans:ti(e.spans,t.start,t.end,n)}});case`setTextRole`:return Fg(e,t.blockId,e=>e.type===`text`?{...e,role:t.role,fontSize:void 0}:e);case`patchBlock`:return Fg(e,t.blockId,e=>e.type===t.blockType?{...e,...t.patch}:e);case`addPopup`:return Fg(e,t.blockId,e=>{if(!Zn(e.type))return e;if(t.forWords)return{...e,popups:[...e.popups,t.item]};let n=Qi(e);return n.length===0||n[0].kind===t.item.kind&&t.item.kind!==`rich`?{...e,popups:[...e.popups,t.item]}:e});case`updatePopup`:return Fg(e,t.blockId,e=>({...e,popups:e.popups.map(e=>e.id===t.item.id?t.item:e)}));case`removePopup`:return Fg(e,t.blockId,e=>{let n=e.popups.find(e=>e.id===t.popupId),r={...e,popups:e.popups.filter(e=>e.id!==t.popupId)},i=n?Yi(n):t.popupId;return r.type===`text`&&!r.popups.some(e=>Yi(e)===i)&&r.spans.some(e=>e.popupId===i)&&(r.spans=$r(r.spans.map(e=>e.popupId===i?{...e,popupId:void 0}:e))),r});case`reorderPopups`:return Fg(e,t.blockId,e=>{let n=e.popups.slice(),[r]=n.splice(t.from,1);if(!r)return e;let i=Math.max(0,Math.min(t.to,n.length));return i===t.from?e:(n.splice(i,0,r),{...e,popups:n})});default:return t}}function Bg(e){return{past:[],present:e,future:[],lastMark:null,lastAt:0}}var Vg=e=>{if(!xg.includes(e.type))return null;let t=`blockId`in e?e.blockId:`rowId`in e?e.rowId:`doc`;return`${e.type}:${t}`};function Hg(e,t,n=Date.now()){let r=zg(e.present,t);if(r===e.present)return e;let i=Vg(t);return{past:i!==null&&i===e.lastMark&&n-e.lastAt<800?e.past:[...e.past,e.present].slice(-200),present:r,future:[],lastMark:i,lastAt:n}}var Ug=e=>e.past.length>0,Wg=e=>e.future.length>0;function Gg(e){if(!Ug(e))return e;let t=e.past.slice();return{past:t,present:t.pop(),future:[e.present,...e.future],lastMark:null,lastAt:0}}function Kg(e){if(!Wg(e))return e;let[t,...n]=e.future;return{past:[...e.past,e.present],present:t,future:n,lastMark:null,lastAt:0}}function qg(e){let[t,n]=(0,B.useState)(()=>Bg(e)),r=(0,B.useCallback)(e=>{n(t=>Hg(t,e))},[]),i=(0,B.useCallback)((e,t,r)=>{n(n=>{let i=Ii(n.present,e);if(!i||i.block.type!==`text`)return n;let a=i.block.spans;return Hg(n,{type:`setSpans`,blockId:e,spans:r?ti(a,r.start,r.end,t):t})})},[]),a=(0,B.useCallback)((e,t,n,i,a)=>{let o=a?.start??0;r({type:`toggleMark`,blockId:e,start:t.start+o,end:t.end+o,mark:n,on:i})},[r]),o=(0,B.useCallback)(e=>n(Bg(e)),[]);return(0,B.useMemo)(()=>({doc:t.present,dispatch:r,editSpans:i,toggleMark:a,replaceDoc:o,undo:()=>n(Gg),redo:()=>n(Kg),canUndo:Ug(t),canRedo:Wg(t)}),[t,r,i,a,o])}function Jg(e){let t=e.items[0];if(!(!t||t.continuedFromPrev))return t.row.pageBackground}function Yg(e){if(!e)return{};let t=e.assetId?ja(e.assetId):void 0;return{...e.color?{backgroundColor:e.color}:{},...t?{backgroundImage:`url(${t})`,backgroundSize:`cover`,backgroundPosition:`center`}:{}}}function Xg({page:e,settings:t,scale:n,rowIndexOf:r,rowCount:i=0,thumbnail:a=!1,pageSize:o}){let s=Im(),c=o??Jn[t.aspectRatio],l=t.writingMode===`vertical`,u=t.layout===`flow`,d=Yn(t,o),f=l?d.height:d.width,p=l?d.width:d.height,m=u&&!l&&(e.panels?.length??0)>1,h=!u&&!a&&(s.scale!==1||s.lineHeight!==void 0);return(0,H.jsx)(Zg,{"data-page-index":r?e.index:void 0,style:{width:c.width*n,height:c.height*n},children:(0,H.jsx)(Qg,{$vertical:l,$flow:u,$horizontalPanels:m,$thumbnail:a,$readerScroll:h,"data-vertical":l||void 0,"data-layout":u?`flow`:`paged`,onWheel:e=>{if(!(u||h&&l)||a||Math.abs(e.deltaY)<=Math.abs(e.deltaX))return;let t=e.currentTarget;if(t.scrollWidth<=t.clientWidth+2)return;let n=t.scrollLeft;t.scrollLeft+=l?-e.deltaY:e.deltaY,t.scrollLeft!==n&&e.stopPropagation()},style:{width:c.width,height:c.height,transform:`scale(${n})`,...Yg(Jg(e))},children:m?e.panels.map((e,n)=>(0,H.jsx)($g,{"data-flow-panel":n,style:{width:f,height:p},children:e.map(e=>(0,H.jsx)(sm,{item:e,settings:t,contentInline:f,contentBlock:p,rowIndex:r?r(e.row.id):-1,rowCount:i},`${e.row.id}-${e.textSlice?.start??0}`))},n)):e.items.map(e=>(0,H.jsx)(sm,{item:e,settings:t,contentInline:f,contentBlock:p,rowIndex:r?r(e.row.id):-1,rowCount:i},`${e.row.id}-${e.textSlice?.start??0}`))})})}var Zg=V.div`
  position: relative;
  flex: none;
`,Qg=V.div`
  transform-origin: top left;
  background: ${e=>e.theme.surface.raised};
  /*
   * 白紙直接放在灰底上就分得出邊，不畫框線。框改透明、不拿掉：拿掉會少 2px，量到的跟畫出來的不一樣。
   * 側欄縮圖例外：縮圖放在白色側欄上，沒有框就看不出一頁在哪
   */
  border: ${e=>e.theme.border.widthDefault} solid
    ${e=>e.$thumbnail?e.theme.border.subtle:`transparent`};
  /* 近直角，模擬紙張 */
  border-radius: 2px;
  padding: ${48}px;
  overflow-x: ${e=>e.$flow&&!e.$thumbnail||e.$readerScroll&&e.$vertical?`auto`:`hidden`};
  /* 自動切頁的頁面平常不捲；閱讀設定把字放大時，橫排往下捲、直排往左捲 */
  overflow-y: ${e=>e.$readerScroll&&!e.$vertical?`auto`:`hidden`};
  /* 只有頁面內真的能橫向捲（流式排版）才把橫向捲動留在頁內；分頁模式要放行給外層，
     否則放大後游標停在頁面上就左右滑不動 */
  overscroll-behavior-x: ${e=>e.$flow&&!e.$thumbnail?`contain`:`auto`};
  /*
   * 流式的頁面左右捲：捲軸只在「正在捲」時出現（scrollReveal 掛 data-scrolling，停下 0.8 秒收起），
   * 滑鼠停在上面不算——閱讀時滑鼠幾乎一直在頁面上，照全站「滑過就顯示」的規則捲軸會一直掛著
   */
  ${e=>e.$flow&&!e.$thumbnail&&`
    &:hover::-webkit-scrollbar-thumb { background: transparent; }
    &[data-scrolling]::-webkit-scrollbar-thumb { background: ${e.theme.border.default}; }
  `}
  writing-mode: ${e=>e.$vertical?`vertical-rl`:`horizontal-tb`};
  display: flex;
  flex-direction: ${e=>e.$horizontalPanels?`row`:`column`};
  gap: ${e=>e.$horizontalPanels?`48px`:`0`};

  ${e=>e.$flow&&!e.$thumbnail&&e.$vertical&&`
    &::after {
      content: '';
      flex: none;
      block-size: 48px;
    }
  `}

  ${e=>e.$horizontalPanels&&!e.$thumbnail&&`
    &::after {
      content: '';
      flex: none;
      inline-size: 1px;
    }
  `}
`,$g=V.div`
  flex: none;
  display: flex;
  flex-direction: column;
  position: relative;

  & + & {
    padding-inline-start: ${48}px;
    border-inline-start: 1px dashed ${e=>e.theme.border.subtle};
  }
`;function e_({startedBy:e,onMerge:t}){let n=e===`manual`;return t?(0,H.jsxs)(t_,{children:[(0,H.jsx)(n_,{$dashed:n}),(0,H.jsx)(i_,{type:`button`,onClick:t,title:`把這一頁併回上一頁`,children:`可合併`}),(0,H.jsx)(n_,{$dashed:n})]}):(0,H.jsx)(r_,{$dashed:n})}var t_=V.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapMd};
  width: 100%;
  max-width: 1024px;
  margin-block: ${e=>e.theme.space.gapSm};
`,n_=V.div`
  flex: 1;
  height: 0;
  border-block-start: 1.5px ${e=>e.$dashed?`dashed`:`solid`} ${e=>e.theme.border.default};
`,r_=V(n_)`
  flex: none;
  width: 100%;
  max-width: 1024px;
  margin-block: ${e=>e.theme.space.gapSm};
`,i_=V.button`
  flex: none;
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
  font-family: inherit;
  font-size: var(--ds-typography-label-size);
  line-height: var(--ds-typography-label-line-height);
  letter-spacing: 0.06em;
  padding: 3px 12px;
  border-radius: ${e=>e.theme.radius.control};
  color: ${e=>e.theme.text.secondary};
  background: ${e=>e.theme.surface.raised};
  cursor: pointer;
  transition: background 0.12s, color 0.12s, border-color 0.12s;

  &:hover {
    border-color: ${e=>e.theme.border.hover};
    color: ${e=>e.theme.text.primary};
  }
`;function a_({value:e,options:t,onChange:n,placeholder:r=`請選擇`,"aria-label":i,variant:a=`field`,title:o,icon:s}){let[c,l]=(0,B.useState)(!1),u=(0,B.useRef)(null),d=(0,B.useRef)(null),[f,p]=(0,B.useState)(null),m=t.find(t=>t.value===e);(0,B.useLayoutEffect)(()=>{if(!c)return;let e=()=>{let e=u.current?.getBoundingClientRect();if(!e)return;let n=window.innerHeight-e.bottom,r=Math.min(t.length*38+16,320);p(n>=r+8||n>=e.top?{left:e.left,width:e.width,top:e.bottom+6}:{left:e.left,width:e.width,bottom:window.innerHeight-e.top+6})};return e(),window.addEventListener(`scroll`,e,!0),window.addEventListener(`resize`,e),()=>{window.removeEventListener(`scroll`,e,!0),window.removeEventListener(`resize`,e)}},[c,t.length]),(0,B.useEffect)(()=>{if(!c)return;let e=e=>{let t=e.target;d.current?.contains(t)||u.current?.contains(t)||l(!1)},t=e=>{e.key===`Escape`&&(e.stopPropagation(),l(!1),u.current?.focus())};return window.addEventListener(`pointerdown`,e,!0),window.addEventListener(`keydown`,t,!0),()=>{window.removeEventListener(`pointerdown`,e,!0),window.removeEventListener(`keydown`,t,!0)}},[c]),(0,B.useEffect)(()=>{if(!c||!f)return;let n=d.current?.querySelectorAll(`[role="option"]`);n?.length&&n[Math.max(0,t.findIndex(t=>t.value===e))]?.focus()},[c,f,t,e]);let h=e=>{if(e.key!==`ArrowDown`&&e.key!==`ArrowUp`)return;e.preventDefault();let t=Array.from(d.current?.querySelectorAll(`[role="option"]`)??[]),n=t.indexOf(document.activeElement);t[e.key===`ArrowDown`?Math.min(t.length-1,n+1):Math.max(0,n-1)]?.focus()};return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(o_,{ref:u,type:`button`,"aria-label":i,title:o,"aria-haspopup":`listbox`,"aria-expanded":c,$empty:!m,$tool:a===`tool`,onClick:()=>l(e=>!e),children:[s&&(0,H.jsx)(s_,{name:s,size:20}),(0,H.jsx)(c_,{children:m?.short??m?.label??r}),(0,H.jsx)(U,{name:`chevron-down`,size:16})]}),c&&f&&(0,pi.createPortal)((0,H.jsx)(l_,{ref:d,role:`listbox`,"aria-label":i,style:a===`tool`?{...f,width:void 0,minWidth:f.width,maxWidth:window.innerWidth-f.left-8}:f,onKeyDown:h,"data-ui":!0,onPointerDown:e=>e.preventDefault(),children:t.map(t=>(0,H.jsx)(u_,{type:`button`,role:`option`,"aria-selected":t.value===e,$on:t.value===e,onClick:()=>{n(t.value),l(!1),u.current?.focus()},children:t.label},t.value))}),document.body)]})}var o_=V.button`
  display: flex;
  align-items: center;
  gap: 2px;
  inline-size: ${e=>e.$tool?`auto`:`100%`};
  flex-shrink: ${e=>+!e.$tool};
  min-inline-size: 0;
  min-block-size: 36px;
  /* 欄位款左右收窄：教材設定一列放三個（階段、年級、學期），「上學期」「3 年級」要放得下 */
  padding: 0 8px 0 12px;
  font: inherit;
  font-size: ${e=>e.theme.typography.bodySmSize};
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  /* 欄位款跟輸入框同一套：muted 底，滑過或展開加一圈框 */
  background: ${e=>e.$tool?`transparent`:e.theme.surface.muted};
  /* 工具列款跟膠囊上其他鈕同一個灰字；欄位款是填好的值，用深色 */
  color: ${e=>e.$empty?e.theme.text.tertiary:e.$tool?e.theme.text.secondary:e.theme.text.primary};
  cursor: pointer;

  &:hover,
  &[aria-expanded='true'] {
    ${e=>e.$tool?`color: ${e.theme.text.primary};`:``}
    ${e=>e.$tool?`background: ${e.theme.surface.sunken};`:`box-shadow: inset 0 0 0 1px ${e.theme.border.default};`}
  }
  &:focus-visible { outline: none; box-shadow: inset 0 0 0 1px ${e=>e.theme.border.hover}; }
  svg { flex: none; color: ${e=>e.theme.icon.default}; }
`,s_=V(U)`
  flex: none;
  margin-inline-end: 4px;
`,c_=V.span`
  flex: 1 1 auto;
  min-inline-size: 0;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,l_=V.div`
  position: fixed;
  z-index: 1050;
  box-sizing: border-box;
  min-inline-size: 132px;
  writing-mode: horizontal-tb;
  max-block-size: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${e=>e.theme.surface.page};
  border-radius: ${e=>e.theme.radius.panel};
  box-shadow: ${e=>e.theme.shadow.popover};
`,u_=V.button`
  display: flex;
  align-items: center;
  min-block-size: 36px;
  padding: 0 12px;
  white-space: nowrap;
  font: inherit;
  font-size: ${e=>e.theme.typography.bodySmSize};
  text-align: start;
  border: none;
  border-radius: ${e=>e.theme.radius.card};
  background: transparent;
  color: ${e=>e.$on?e.theme.brand.accentOnLight:e.theme.text.primary};
  font-weight: ${e=>e.$on?700:400};
  cursor: pointer;

  /* 選單是淡白底（#FAFAFA），滑過要深一階才看得出 */
  &:hover,
  &:focus-visible { background: ${e=>e.theme.surface.muted}; outline: none; }
`,d_=[{label:`白`,color:`#FFFFFF`},{label:`墨`,color:`#1A1917`},{label:`橘`,color:`#FF854A`},{label:`藍`,color:`#1A66C2`}],f_=`#FFFFFF`,p_=`#1A1917`,m_=[`none`,`arrow`,`arrowFilled`,`dot`],h_={none:`—`,arrow:`←`,arrowFilled:`◀`,dot:`●`},g_={none:`—`,arrow:`→`,arrowFilled:`▶`,dot:`●`};function __({block:e,blockId:t}){let n=Lh(),[r,i]=(0,B.useState)(null),a=(0,B.useRef)(null),o=(0,B.useRef)(null),s=(0,B.useRef)(null),c=(0,B.useRef)(null),l=e.fill??f_,u=e.stroke??p_,d=e.strokeWidth??1,f=Math.round((e.opacity??1)*100),p=e=>n.dispatch({type:`patchBlock`,blockId:t,blockType:`shape`,patch:e});return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(a_,{variant:`tool`,value:e.shape,"aria-label":`形狀`,title:`形狀`,options:[{value:`rect`,label:`矩形`},{value:`circle`,label:`圓形`},{value:`roundedRect`,label:`圓角矩形`},{value:`callout`,label:`對話框`}],onChange:t=>{let n=t;if(n!==e.shape){if(n===`circle`)p({shape:`circle`,widthPct:void 0,blockSize:void 0});else if(n===`callout`){let t=e.shape===`circle`?{widthPct:void 0,blockSize:void 0}:{};p({shape:`callout`,tail:e.tail??Tl,...t})}else{let t=e.shape===`circle`?{widthPct:void 0,blockSize:void 0}:{};p({shape:n,...t})}}}}),(0,H.jsxs)(T_,{ref:a,$open:r===`fill`,onClick:()=>i(r===`fill`?null:`fill`),title:`填色`,"aria-label":`填色`,children:[`填色`,(0,H.jsx)(N_,{style:{background:l}})]}),r===`fill`&&(0,H.jsx)(y_,{anchor:a.current,label:`填色`,onClose:()=>i(null),children:(0,H.jsx)(b_,{value:l,label:`填色`,onChange:e=>p({fill:e}),onClose:()=>i(null)})}),(0,H.jsxs)(T_,{ref:o,$open:r===`stroke`,onClick:()=>i(r===`stroke`?null:`stroke`),title:`邊框顏色`,"aria-label":`邊框顏色`,children:[`邊框`,(0,H.jsx)(N_,{style:{background:u}})]}),r===`stroke`&&(0,H.jsx)(y_,{anchor:o.current,label:`邊框顏色`,onClose:()=>i(null),children:(0,H.jsx)(b_,{value:u,label:`邊框顏色`,onChange:e=>p({stroke:e}),onClose:()=>i(null)})}),(0,H.jsxs)(P_,{title:`邊框粗細`,children:[(0,H.jsx)(F_,{type:`number`,min:0,max:24,step:1,value:d,onChange:e=>{let t=Number(e.target.value);Number.isFinite(t)&&p({strokeWidth:Math.max(0,Math.min(24,t))})},"aria-label":`邊框粗細`}),(0,H.jsx)(I_,{children:`px`})]}),(0,H.jsxs)(T_,{ref:s,$open:r===`opacity`,onClick:()=>i(r===`opacity`?null:`opacity`),title:`透明度`,"aria-label":`透明度`,children:[f,`%`]}),r===`opacity`&&(0,H.jsx)(y_,{anchor:s.current,label:`透明度`,onClose:()=>i(null),children:(0,H.jsx)(w_,{value:f,onChange:e=>p({opacity:e/100})})}),(0,H.jsxs)(T_,{ref:c,$open:r===`text`,onClick:()=>i(r===`text`?null:`text`),title:`文字樣式`,"aria-label":`文字樣式`,children:[`文字`,(0,H.jsx)(U,{name:`chevron-down`,size:16})]}),r===`text`&&(0,H.jsx)(y_,{anchor:c.current,label:`文字樣式`,onClose:()=>i(null),children:(0,H.jsx)(C_,{block:e,onPatch:p})})]})}function v_({block:e,blockId:t}){let n=Lh(),[r,i]=(0,B.useState)(null),a=(0,B.useRef)(null),o=(0,B.useRef)(null),s=e.stroke??p_,c=e.strokeWidth??2,l=Math.round((e.opacity??1)*100),u=e=>n.dispatch({type:`patchBlock`,blockId:t,blockType:`line`,patch:e});return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(T_,{ref:a,$open:r===`stroke`,onClick:()=>i(r===`stroke`?null:`stroke`),title:`線條顏色`,"aria-label":`線條顏色`,children:(0,H.jsx)(N_,{style:{background:s}})}),r===`stroke`&&(0,H.jsx)(y_,{anchor:a.current,label:`線條顏色`,onClose:()=>i(null),children:(0,H.jsx)(b_,{value:s,label:`線條顏色`,onChange:e=>u({stroke:e}),onClose:()=>i(null)})}),(0,H.jsxs)(P_,{title:`線條粗細`,children:[(0,H.jsx)(F_,{type:`number`,min:.5,max:24,step:.5,value:c,onChange:e=>{let t=Number(e.target.value);Number.isFinite(t)&&u({strokeWidth:Math.max(.5,Math.min(24,t))})},"aria-label":`線條粗細`}),(0,H.jsx)(I_,{children:`px`})]}),(0,H.jsx)(T_,{$on:!!e.dashed,onClick:()=>u({dashed:!e.dashed}),title:e.dashed?`切換為實線`:`切換為虛線`,children:e.dashed?`虛線`:`實線`}),(0,H.jsx)(a_,{variant:`tool`,value:e.startCap??`none`,"aria-label":`起點樣式`,title:`起點`,options:m_.map(e=>({value:e,label:`${h_[e]}  ${Y[e]}`,short:h_[e]})),onChange:e=>u({startCap:e})}),(0,H.jsx)(a_,{variant:`tool`,value:e.endCap??`none`,"aria-label":`終點樣式`,title:`終點`,options:m_.map(e=>({value:e,label:`${g_[e]}  ${Y[e]}`,short:g_[e]})),onChange:e=>u({endCap:e})}),(0,H.jsxs)(T_,{ref:o,$open:r===`opacity`,onClick:()=>i(r===`opacity`?null:`opacity`),title:`透明度`,"aria-label":`透明度`,children:[l,`%`]}),r===`opacity`&&(0,H.jsx)(y_,{anchor:o.current,label:`透明度`,onClose:()=>i(null),children:(0,H.jsx)(w_,{value:l,onChange:e=>u({opacity:e/100})})})]})}function y_({anchor:e,label:t,onClose:n,children:r}){let[i,a]=(0,B.useState)(null);return(0,B.useEffect)(()=>{let t=()=>{let t=e?.getBoundingClientRect();t&&a({top:t.bottom+8,left:Math.max(8,Math.min(t.left,window.innerWidth-220))})};t();let r=t=>{let r=t.target;r.closest(`[data-shape-popover]`)||e&&e.contains(r)||n()},i=e=>{e.key===`Escape`&&(e.stopPropagation(),n())};return window.addEventListener(`pointerdown`,r,!0),window.addEventListener(`keydown`,i,!0),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`pointerdown`,r,!0),window.removeEventListener(`keydown`,i,!0),window.removeEventListener(`scroll`,t,!0)}},[e,n]),i?(0,pi.createPortal)((0,H.jsx)(L_,{"data-shape-popover":!0,"data-ui":!0,role:`dialog`,"aria-label":t,style:i,onPointerDown:e=>{e.target.closest(`input`)?e.stopPropagation():e.preventDefault()},children:r}),document.body):null}function b_({value:e,label:t,onChange:n,onClose:r}){let i=(0,B.useRef)(null),a=e.toUpperCase(),o=d_.some(e=>e.color===a)?null:e;return(0,H.jsxs)(R_,{children:[d_.map(e=>(0,H.jsx)(z_,{type:`button`,title:e.label,$on:a===e.color,style:{background:e.color},onClick:()=>{n(e.color),r()}},e.label)),(0,H.jsxs)(B_,{type:`button`,title:`自訂顏色`,$on:!!o,style:o?{background:o}:void 0,onClick:()=>i.current?.click(),children:[!o&&(0,H.jsx)(U,{name:`plus`,size:16}),(0,H.jsx)(`input`,{ref:i,type:`color`,value:o||`#ffffff`,onChange:e=>{n(e.target.value.toUpperCase())},"aria-label":`自訂${t}`,tabIndex:-1})]})]})}function x_(e){return jl(e.fill)&&(e.opacity??1)>=.5?`#FFFFFF`:p_}var S_=14;function C_({block:e,onPatch:t}){let n=e.fontSize??S_,r=Fr.indexOf(n),i=r>0?Fr[r-1]:[...Fr].reverse().find(e=>e<n),a=r>=0?Fr[r+1]:Fr.find(e=>e>n),o=e=>t({fontSize:e===S_?void 0:e}),[s,c]=(0,B.useState)(!1),l=Ir.find(t=>t.value===(e.fontFamily??null))??Ir.find(e=>e.value===null);return(0,H.jsxs)(E_,{children:[(0,H.jsx)(D_,{children:`字體`}),(0,H.jsxs)(T_,{type:`button`,$open:s,onClick:()=>c(e=>!e),style:{justifySelf:`start`,...l.value?{fontFamily:l.value}:{}},"aria-expanded":s,children:[l.label,(0,H.jsx)(U,{name:s?`chevron-up`:`chevron-down`,size:16})]}),s&&(0,H.jsx)(k_,{role:`listbox`,"aria-label":`字體`,children:Ir.map(e=>(0,H.jsx)(A_,{type:`button`,role:`option`,"aria-selected":l===e,$on:l===e,style:e.value?{fontFamily:e.value}:void 0,onClick:()=>{t({fontFamily:e.value??void 0}),c(!1)},children:e.label},e.label))}),(0,H.jsx)(D_,{children:`字級`}),(0,H.jsxs)(j_,{children:[(0,H.jsx)(T_,{type:`button`,disabled:i===void 0,onClick:()=>i&&o(i),"aria-label":`字級變小`,style:{padding:0,inlineSize:36},children:(0,H.jsx)(U,{name:`minus`,size:16})}),(0,H.jsx)(M_,{children:n}),(0,H.jsx)(T_,{type:`button`,disabled:a===void 0,onClick:()=>a&&o(a),"aria-label":`字級變大`,style:{padding:0,inlineSize:36},children:(0,H.jsx)(U,{name:`plus`,size:16})})]}),(0,H.jsx)(D_,{children:`顏色`}),(0,H.jsx)(b_,{value:e.textColor??x_(e),label:`文字顏色`,onChange:e=>t({textColor:e}),onClose:()=>{}}),(0,H.jsx)(D_,{children:`方向`}),(0,H.jsxs)(O_,{children:[(0,H.jsx)(T_,{type:`button`,$on:!e.textVertical,onClick:()=>t({textVertical:void 0}),title:`橫排`,"aria-label":`橫排`,style:{padding:0,inlineSize:36},children:(0,H.jsx)(U,{name:`writing-horizontal`,size:20})}),(0,H.jsx)(T_,{type:`button`,$on:!!e.textVertical,onClick:()=>t({textVertical:!0}),title:`直排`,"aria-label":`直排`,style:{padding:0,inlineSize:36},children:(0,H.jsx)(U,{name:`writing-vertical`,size:20})})]})]})}function w_({value:e,onChange:t}){return(0,H.jsxs)(V_,{children:[(0,H.jsx)(U_,{children:`透明度`}),(0,H.jsx)(H_,{type:`range`,min:0,max:100,step:5,value:e,style:{"--fill":`${e}%`},"aria-label":`透明度`,onChange:e=>t(Number(e.target.value))}),(0,H.jsxs)(W_,{children:[e,`%`]})]})}var T_=V.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  padding: 6px 12px;
  min-block-size: 36px;
  font: inherit;
  white-space: nowrap;
  flex-shrink: 0;
  /* $on＝開／關切換已開啟（灰，比滑過深一階；不用黃，黃色在畫面上太多）；$open＝這顆打開的選單還開著（淡灰，跟下拉一致） */
  background: ${e=>e.$on?e.theme.surface.muted:e.$open?e.theme.surface.sunken:`transparent`};
  color: ${e=>e.$on||e.$open?e.theme.text.primary:e.theme.text.secondary};

  &:hover {
    background: ${e=>e.$on?e.theme.surface.muted:e.theme.surface.sunken};
  }
`,E_=V.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 12px;
  row-gap: 8px;
  padding: 4px 4px 4px 8px;
`,D_=V.span`
  color: ${e=>e.theme.text.secondary};
  white-space: nowrap;
`,O_=V.div`
  display: flex;
  gap: 2px;
`,k_=V.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  margin-block: -4px 4px;
`,A_=V.button`
  display: flex;
  align-items: center;
  min-block-size: 36px;
  padding: 0 12px;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
  color: ${e=>e.$on?e.theme.brand.accentOnLight:e.theme.text.primary};
  font-weight: ${e=>e.$on?700:400};

  &:hover { background: ${e=>e.theme.surface.muted}; }
`,j_=V.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & > button:disabled { opacity: 0.35; cursor: default; background: transparent; }
`,M_=V.span`
  min-inline-size: 32px;
  text-align: center;
  font-variant-numeric: tabular-nums;
`,N_=V.span`
  display: inline-block;
  inline-size: 18px;
  block-size: 18px;
  border-radius: 999px;
  border: 1.5px solid ${e=>e.theme.border.default};
  box-shadow: inset 0 0 0 1.5px ${e=>e.theme.surface.raised};
  flex-shrink: 0;
`,P_=V.div`
  display: inline-flex;
  align-items: center;
  padding-inline: 4px 8px;
  min-block-size: 36px;
  border-radius: 999px;
  color: ${e=>e.theme.text.secondary};

  &:hover,
  &:focus-within {
    background: ${e=>e.theme.surface.sunken};
  }
`,F_=V.input`
  inline-size: 38px;
  min-block-size: 28px;
  padding: 2px 4px;
  font: inherit;
  font-variant-numeric: tabular-nums;
  /* 跟膠囊上其他字同一個灰 */
  color: ${e=>e.theme.text.secondary};
  background: transparent;
  border: none;
  border-radius: 4px;
  text-align: end;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  &:focus {
    outline: none;
  }
`,I_=V.span`
  color: ${e=>e.theme.text.secondary};
  margin-inline-start: 2px;
  user-select: none;
`,L_=V.div`
  position: fixed;
  z-index: 950;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: ${e=>e.theme.radius.panel};
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${e=>e.theme.surface.page};
  box-shadow: ${e=>e.theme.shadow.popover};
  writing-mode: horizontal-tb;
  /* 跟工具列同字級 */
  font-size: ${e=>e.theme.typography.bodySmSize};
`,R_=V.div`
  ${_p}
`,z_=V.button`
  ${hp}
`,B_=V(z_)`
  ${gp}
`,V_=V.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-inline-size: 220px;
  padding: 4px 4px 4px 8px;
`,H_=V.input`
  flex: 1;
  min-inline-size: 0;
  margin: 0;
  block-size: 28px;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    block-size: 8px;
    border-radius: 100px;
    background: linear-gradient(
      to right,
      ${e=>e.theme.brand.accentOnLight} var(--fill),
      ${e=>e.theme.surface.muted} var(--fill)
    );
  }
  &::-moz-range-progress {
    block-size: 8px;
    border-radius: 100px;
    background: ${e=>e.theme.brand.accentOnLight};
  }
  &::-moz-range-track {
    block-size: 8px;
    border-radius: 100px;
    background: ${e=>e.theme.surface.muted};
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    inline-size: 22px;
    block-size: 22px;
    margin-block-start: -7px;
    border-radius: 100px;
    background: ${e=>e.theme.surface.raised};
    border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
    box-shadow: 0 1px 3px rgba(26, 25, 23, 0.14);
  }
  &::-moz-range-thumb {
    inline-size: 22px;
    block-size: 22px;
    border-radius: 100px;
    background: ${e=>e.theme.surface.raised};
    border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
  }
  &:focus-visible { outline: none; }
  &:focus-visible::-webkit-slider-thumb { border-color: ${e=>e.theme.border.selected}; }
`,U_=V.span`
  flex: none;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,W_=V.span`
  min-inline-size: 3em;
  text-align: end;
  font-size: ${e=>e.theme.typography.bodySmSize};
  font-variant-numeric: tabular-nums;
  color: ${e=>e.theme.text.primary};
`;function G_({block:e,blockId:t,start:n,end:r,afterFont:i}){let a=Lh(),o=ei(e.spans,n,r),[s,c]=(0,B.useState)(null),l=e=>o.length>0&&o.every(t=>t[e]),u=e=>{let t=o[0]?.[e];return o.length>0&&o.every(n=>n[e]===t)?t:void 0},d=i=>{a.dispatch({type:`setSpans`,blockId:t,spans:Xr(e.spans,n,r,i)})},f=e=>d({[e]:!l(e)}),p=u(`color`),m=u(`fontFamily`),h=u(`popupId`),g=u(`noteId`),_=g?e.rangeNotes?.find(e=>e.id===g)??null:null,v=_?rs.find(e=>e.key===as(_)):void 0,y=Zr(o),b=h?Zi(e,h).length>0:!1,x=(0,B.useRef)(null),S=(0,B.useRef)(null),C=n=>{let r=e.rangeNotes??[];if(_)a.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:r.map(e=>e.id===_.id?{...e,kind:n}:e)}});else{let e=W(`note`);a.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:[...r,{id:e,kind:n,body:``}]}}),d({noteId:e})}c(null)};return(0,H.jsxs)(H.Fragment,{children:[e.paragraph&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)($_,{ref:S,$open:s===`kind`,onClick:()=>c(s===`kind`?null:`kind`),title:`標記成生字詞或句子`,children:[v?v.name:`標記`,(0,H.jsx)(U,{name:`chevron-down`,size:16})]}),s===`kind`&&(0,H.jsx)(Q_,{anchor:S.current,label:`標記`,onClose:()=>c(null),children:(0,H.jsxs)(av,{children:[rs.map(e=>(0,H.jsx)(ov,{type:`button`,$on:v?.key===e.key,onClick:()=>C(e.key),children:e.name},e.key)),_&&(0,H.jsxs)(ov,{type:`button`,onClick:()=>{_&&(a.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:(e.rangeNotes??[]).filter(e=>e.id!==_.id)}}),a.dispatch({type:`setSpans`,blockId:t,spans:e.spans.map(e=>e.noteId===_.id?{...e,noteId:void 0}:e)}),c(null))},children:[`取消標記`,(0,H.jsx)(U,{name:`x`,size:16})]})]})})]}),(0,H.jsxs)($_,{ref:x,$open:s===`font`,onClick:()=>c(s===`font`?null:`font`),title:`字體`,children:[Ir.find(e=>e.value===(m??null))?.label??`字體`,(0,H.jsx)(U,{name:`chevron-down`,size:16})]}),s===`font`&&(0,H.jsx)(Q_,{anchor:x.current,label:`字體`,onClose:()=>c(null),children:(0,H.jsx)(av,{children:Ir.map(e=>(0,H.jsx)(ov,{type:`button`,$on:(m??null)===e.value,style:e.value?{fontFamily:e.value}:void 0,onClick:()=>{d({fontFamily:e.value??void 0}),c(null)},children:e.label},e.label))})}),(0,H.jsx)(X_,{color:p,onPick:e=>d({color:e})}),i,(0,H.jsx)($_,{$on:y,onClick:()=>a.dispatch({type:`setSpans`,blockId:t,spans:Qr(e.spans,n,r)}),title:y?`取消注音`:`加上注音`,children:`注`}),(0,H.jsx)($_,{$iconOnly:!0,$on:l(`underline`),onClick:()=>f(`underline`),title:`底線`,children:(0,H.jsx)(U,{name:`underline`,size:20,label:`底線`})}),(0,H.jsx)($_,{$iconOnly:!0,$on:l(`strike`),onClick:()=>f(`strike`),title:`刪除線`,children:(0,H.jsx)(U,{name:`strikethrough`,size:20,label:`刪除線`})}),(0,H.jsx)($_,{$iconOnly:!0,$on:l(`overline`),onClick:()=>f(`overline`),title:`上線（線段 AB）`,children:(0,H.jsx)(U,{name:`overline`,size:20,label:`上線`})}),(0,H.jsx)(cv,{}),(0,H.jsx)($_,{$iconOnly:!0,$on:l(`masked`),onClick:()=>f(`masked`),title:`遮住：點擊後出現`,"aria-pressed":l(`masked`),children:(0,H.jsx)(U,{name:`eye-off`,size:20,label:`遮住：點擊後出現`})}),(0,H.jsx)($_,{$iconOnly:!0,$on:b,onClick:()=>{a.setPopupPick({blockId:t,start:n,end:r}),a.openPopupPanel(t)},title:b?`編輯這幾個字的補充`:`讓這幾個字點了會開補充`,children:(0,H.jsx)(U,{name:`blocks`,size:20,label:`補充`})})]})}var K_=[{label:`預設`,value:null},{label:`強調`,value:`accent`},{label:`次要`,value:`secondary`},{label:`藍`,value:`#1A66C2`},{label:`橘`,value:`#FF854A`},{label:`森林`,value:`#00A36E`},{label:`紫`,value:`#7F6CDF`},{label:`赭`,value:`#93663C`}],q_=e=>e===`accent`?`var(--ds-text-accent)`:e===`secondary`?`var(--ds-text-secondary)`:e,J_=[{value:`start`,horizontal:`靠左`,vertical:`靠上`},{value:`center`,horizontal:`置中`,vertical:`置中`},{value:`end`,horizontal:`靠右`,vertical:`靠下`},{value:`justify`,horizontal:`左右對齊`,vertical:`平均`}],Y_={start:`align-left`,center:`align-center`,end:`align-right`,justify:`align-justify`};function X_({color:e,onPick:t}){let[n,r]=(0,B.useState)(!1),i=(0,B.useRef)(null),a=(0,B.useRef)(null),o=e&&!K_.some(t=>t.value===e)?e:null;return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)($_,{ref:i,$iconOnly:!0,$open:n,onClick:()=>r(e=>!e),title:`文字顏色`,"aria-label":`文字顏色`,children:(0,H.jsx)(ev,{style:{background:e?q_(e):`var(--ds-text-primary)`}})}),n&&(0,H.jsx)(Q_,{anchor:i.current,label:`文字顏色`,onClose:()=>r(!1),children:(0,H.jsxs)(nv,{children:[K_.map(n=>(0,H.jsx)(rv,{type:`button`,title:n.label,$on:(e??null)===n.value,style:{background:n.value?q_(n.value):`var(--ds-surface-raised)`},onClick:()=>t(n.value??void 0),children:!n.value&&(0,H.jsx)(U,{name:`x`,size:16})},n.label)),(0,H.jsxs)(iv,{type:`button`,title:`自訂顏色`,$on:!!o,style:o?{background:o}:void 0,onClick:()=>a.current?.click(),children:[!o&&(0,H.jsx)(U,{name:`plus`,size:16}),(0,H.jsx)(`input`,{ref:a,type:`color`,value:o??`#1a1917`,onChange:e=>t(e.target.value),"aria-label":`自訂顏色`,tabIndex:-1})]})]})})]})}function Z_({block:e,blockId:t,settings:n}){let r=Lh(),i=e=>r.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:e}),a=Zr(e.spans),[o,s]=(0,B.useState)(!1),c=(0,B.useRef)(null),[l,u]=(0,B.useState)(!1),d=(0,B.useRef)(null),f=new Set(e.spans.filter(e=>e.text).map(e=>e.fontFamily??null)),p=f.size<=1?[...f][0]??null:void 0,m=new Set(e.spans.filter(e=>e.text).map(e=>e.color??null)),h=n=>r.dispatch({type:`setSpans`,blockId:t,spans:e.spans.map(({fontFamily:e,...t})=>n?{...t,fontFamily:n}:t)}),g=(e.writingMode??n.writingMode)===`vertical`,_=!!e.writingMode&&e.writingMode!==n.writingMode,v=g?`horizontal`:`vertical`,y=Nr(e.role,g),b=e.fontSize??y,x=Fr.includes(b)?Fr:[...Fr,b].sort((e,t)=>e-t),S=e.align??`start`,C=Er(e.role),w=e.lineHeight??C,T=[...new Set([...Dr,w,C])].sort((e,t)=>e-t);return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)($_,{ref:d,$open:l,onClick:()=>u(e=>!e),title:`字型`,"aria-label":`字型`,children:[p===void 0?`字型`:Ir.find(e=>e.value===p)?.label??`字型`,(0,H.jsx)(U,{name:`chevron-down`,size:16})]}),l&&(0,H.jsx)(Q_,{anchor:d.current,label:`字型`,onClose:()=>u(!1),children:(0,H.jsx)(av,{children:Ir.map(e=>(0,H.jsx)(ov,{type:`button`,$on:p===e.value,style:e.value?{fontFamily:e.value}:void 0,onClick:()=>{h(e.value),u(!1)},children:e.label},e.label))})}),(0,H.jsx)(X_,{color:m.size===1?[...m][0]??void 0:void 0,onPick:n=>r.dispatch({type:`setSpans`,blockId:t,spans:e.spans.map(({color:e,...t})=>n?{...t,color:n}:t)})}),(0,H.jsx)(a_,{variant:`tool`,value:String(b),"aria-label":`字級（px）`,title:`字級`,options:x.map(e=>({value:String(e),label:String(e)})),onChange:e=>{let t=Number(e);i({fontSize:t===y?void 0:t})}}),(0,H.jsx)(a_,{variant:`tool`,icon:g?`line-height-vertical`:`line-height`,value:String(w),"aria-label":`行距（倍）`,title:`行距`,options:T.map(e=>({value:String(e),label:String(e)})),onChange:e=>{let t=Number(e);i({lineHeight:t===C?void 0:t})}}),(0,H.jsxs)($_,{ref:c,$value:!0,$open:o,onClick:()=>s(e=>!e),title:`對齊`,"aria-label":`對齊`,"aria-haspopup":`listbox`,"aria-expanded":o,children:[(0,H.jsx)(sv,{name:Y_[S],size:20,$vertical:g}),(0,H.jsx)(U,{name:`chevron-down`,size:16})]}),o&&(0,H.jsx)(Q_,{anchor:c.current,label:`對齊`,onClose:()=>s(!1),children:(0,H.jsx)(av,{$compact:!0,children:J_.map(e=>(0,H.jsxs)(ov,{type:`button`,$on:S===e.value,onClick:()=>{i({align:e.value===`start`?void 0:e.value}),s(!1)},children:[g?e.vertical:e.horizontal,(0,H.jsx)(sv,{name:Y_[e.value],size:16,$vertical:g})]},e.value))})}),(0,H.jsx)($_,{$on:a,onClick:()=>r.dispatch({type:`setSpans`,blockId:t,spans:Qr(e.spans,0,Kr(e.spans))}),title:a?`取消這一段的注音`:`為這一段加上注音`,children:`注`}),(0,H.jsx)($_,{$iconOnly:!0,$on:_,onClick:()=>i({writingMode:v===n.writingMode?void 0:v}),title:_?`轉回${n.writingMode===`vertical`?`直排`:`橫排`}`:`切換為${v===`vertical`?`直排`:`橫排`}`,"aria-label":_?`轉回${n.writingMode===`vertical`?`直排`:`橫排`}`:`切換為${v===`vertical`?`直排`:`橫排`}`,children:(0,H.jsx)(U,{name:n.writingMode===`vertical`?`writing-horizontal`:`writing-vertical`,size:20})})]})}function Q_({anchor:e,label:t,onClose:n,children:r}){let[i,a]=(0,B.useState)(null);return(0,B.useEffect)(()=>{let t=()=>{let t=e?.getBoundingClientRect();t&&a({top:t.bottom+8,left:Math.max(8,Math.min(t.left,window.innerWidth-248))})};t();let r=t=>{let r=t.target;r.closest(`[data-text-popover]`)||e&&e.contains(r)||n()},i=e=>{e.key===`Escape`&&(e.stopPropagation(),n())};return window.addEventListener(`pointerdown`,r,!0),window.addEventListener(`keydown`,i,!0),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`pointerdown`,r,!0),window.removeEventListener(`keydown`,i,!0),window.removeEventListener(`scroll`,t,!0)}},[e,n]),i?(0,pi.createPortal)((0,H.jsx)(tv,{"data-text-popover":!0,"data-ui":!0,role:`dialog`,"aria-label":t,style:i,onPointerDown:e=>{e.target.closest(`input`)?e.stopPropagation():e.preventDefault()},children:r}),document.body):null}var $_=V.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  padding: ${e=>e.$iconOnly?`6px 8px`:`6px 12px`};
  min-block-size: 36px;
  font: inherit;
  white-space: nowrap;
  flex-shrink: 0;
  /* $on＝開／關切換已開啟（灰，比滑過深一階；不用黃，黃色在畫面上太多）；$open＝這顆打開的選單還開著（淡灰，跟下拉一致） */
  background: ${e=>e.$on?e.theme.surface.muted:e.$open?e.theme.surface.sunken:`transparent`};
  /* $value：按鈕上顯示的是目前的值（對齊），跟「內文」「18」那幾顆下拉一樣用深色 */
  color: ${e=>e.$on||e.$open||e.$value?e.theme.text.primary:e.theme.text.secondary};

  &:hover {
    background: ${e=>e.$on?e.theme.surface.muted:e.theme.surface.sunken};
  }
`,ev=V.span`
  display: inline-block;
  inline-size: 20px;
  block-size: 20px;
  border-radius: 999px;
  border: 1.5px solid ${e=>e.theme.border.default};
  box-shadow: inset 0 0 0 1.5px ${e=>e.theme.surface.raised};
  flex-shrink: 0;
`,tv=V.div`
  position: fixed;
  z-index: 950;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.gapSm};
  border-radius: ${e=>e.theme.radius.panel};
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${e=>e.theme.surface.page};
  /* 跟 Dropdown 的選單同一款：白底圓角、用選單共用的浮層陰影（細線＋兩層陰影） */
  box-shadow: ${e=>e.theme.shadow.popover};
  writing-mode: horizontal-tb;
  /* 跟工具列同字級 */
  font-size: ${e=>e.theme.typography.bodySmSize};
`,nv=V.div`
  ${_p}
`,rv=V.button`
  ${hp}
`,iv=V(rv)`
  ${gp}
`,av=V.div`
  display: flex;
  flex-direction: column;
  min-inline-size: ${e=>e.$compact?`132px`:`200px`};
`,ov=V.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: none;
  cursor: pointer;
  text-align: start;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  padding: 0 12px;
  min-block-size: 36px;
  /* 跟 Dropdown 的選項同一款：選中的是品牌深綠加粗，滑過淡灰底 */
  border-radius: ${e=>e.theme.radius.card};
  background: transparent;
  color: ${e=>e.$on?e.theme.brand.accentOnLight:e.theme.text.primary};
  font-weight: ${e=>e.$on?700:400};

  /* 選單是淡白底（#FAFAFA），滑過要深一階才看得出 */
  &:hover { background: ${e=>e.theme.surface.muted}; }
`;function sv({$vertical:e,...t}){return(0,H.jsx)(`span`,{style:{display:`inline-grid`,lineHeight:0,transform:e?`rotate(90deg)`:void 0},children:(0,H.jsx)(U,{...t})})}var cv=V.span`
  inline-size: 1px;
  block-size: 20px;
  margin-inline: 4px;
  flex-shrink: 0;
  background: ${e=>e.theme.border.subtle};
`;function lv(){let e=Lh(),t=e?.inlineSelection??null,n=e?.selectedBlockId??null;return e?t?(0,H.jsx)(uv,{},`inline`):n?(0,H.jsx)(dv,{},n):null:null}function uv(){let e=Lh(),t=e.inlineSelection,n=fv(),r=Ii(e.doc,t.blockId);if(!r||r.block.type!==`text`||!n)return null;let i=t.slice?.start??0,a=t.range.start+i,o=t.range.end+i,s=ei(r.block.spans,a,o),c=s.length>0&&s.every(e=>e.bold);return(0,H.jsx)(hv,{style:mv(n),onPointerDown:e=>e.preventDefault(),children:(0,H.jsx)(G_,{block:r.block,blockId:t.blockId,start:a,end:o,afterFont:(0,H.jsx)(_v,{$on:c,onClick:()=>e.toggleMark(t.blockId,t.range,`bold`,!c,t.slice),title:`粗體`,children:(0,H.jsx)(U,{name:`bold`,size:20,label:`粗體`})})})})}function dv(){let e=Lh(),t=e.selectedBlockId,n=pv(`[data-block-id="${CSS.escape(t)}"]`,e.doc),r=Sp(),i=Is(),a=Lc(),o=ql(),s=Ii(e.doc,t);if(!s||!n)return null;let{block:c,row:l}=s,u=o.get(t)?.no??null,d=c.type===`video`&&(c.source===`youtube`?!!Ua(c.ref):!!ja(c.ref));return(0,H.jsxs)(hv,{style:mv(n),onPointerDown:e=>{e.target.closest(`select, input`)||e.preventDefault()},children:[c.type===`text`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(a_,{variant:`tool`,value:c.paragraph?`para`:tr.includes(c.role)?c.role:c.role===`itemTitle`||c.role===`subItemTitle`?`sectionTitle`:c.role===`lead`?`body`:`supplement`,"aria-label":`內容層級`,options:[...tr.filter(e=>e!==`supplement`).map(e=>({value:e,label:er[e]})),{value:`para`,label:`段落`,short:u?`第 ${u} 段`:`段落`},...tr.includes(`supplement`)?[{value:`supplement`,label:er.supplement}]:[]],onChange:n=>{let r=n===`para`?`start`:void 0,i=r?`body`:n;i!==c.role&&e.dispatch({type:`setTextRole`,blockId:t,role:i}),r!==c.paragraph&&e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{paragraph:r}})}}),(0,H.jsx)(Z_,{block:c,blockId:t,settings:e.doc.settings}),(0,H.jsx)(vv,{})]}),c.type===`shape`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(__,{block:c,blockId:t}),(0,H.jsx)(vv,{})]}),c.type===`line`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(v_,{block:c,blockId:t}),(0,H.jsx)(vv,{})]}),c.type===`image`&&c.assetId&&(0,H.jsx)(_v,{onClick:async()=>{let n=await Ha(`image/*`);if(!n)return;let{assetId:r,aspectRatio:i}=await Va(n);e.dispatch({type:`patchBlock`,blockId:t,blockType:`image`,patch:{assetId:r,aspectRatio:i,crop:void 0}})},title:`更換圖片`,$icon:!0,children:(0,H.jsx)(U,{name:`upload`,size:20,label:`更換圖片`})}),c.type===`image`&&c.assetId&&(0,H.jsx)(_v,{$on:i===t,onClick:()=>Fs(i===t?null:t),$icon:!0,title:`裁切圖片`,children:(0,H.jsx)(U,{name:`crop`,size:20,label:`裁切`})}),c.type===`image`&&(0,H.jsx)(_v,{$on:c.hasCaption??c.caption.trim().length>0,onClick:()=>{let n=c.hasCaption??c.caption.trim().length>0;if(e.dispatch({type:`patchBlock`,blockId:t,blockType:`image`,patch:{hasCaption:!n}}),!n){let e=0,n=()=>{let r=document.querySelector(`[data-block-id="${t}"] figcaption[contenteditable="true"]`);if(r){r.focus();let e=window.getSelection();e?.selectAllChildren(r),e?.collapseToEnd()}else++e<10&&requestAnimationFrame(n)};requestAnimationFrame(n)}},title:c.hasCaption??c.caption.trim().length>0?`關閉圖說`:`開啟圖說`,$icon:!0,children:(0,H.jsx)(U,{name:`file-text`,size:20,label:`圖說`})}),c.type===`table`&&(0,H.jsxs)(_v,{$open:r.panel,onClick:()=>wp(!r.panel),title:`表格樣式`,children:[`表格`,(0,H.jsx)(U,{name:`table`,size:20})]}),c.type===`pdf`&&c.assetId&&(0,H.jsx)(H.Fragment,{children:(0,H.jsx)(_v,{onClick:async()=>{let n=await Ha(`application/pdf`);n&&e.dispatch({type:`patchBlock`,blockId:t,blockType:`pdf`,patch:{assetId:Ma(n),title:n.name,page:1}})},title:`更換 PDF 檔案`,$icon:!0,children:(0,H.jsx)(U,{name:`upload`,size:20,label:`更換 PDF 檔案`})})}),c.type===`video`&&d&&(0,H.jsx)(_v,{onClick:async()=>{let n=await Ha(`video/*`);n&&e.dispatch({type:`patchBlock`,blockId:t,blockType:`video`,patch:{source:`upload`,ref:Ma(n),title:n.name}})},title:`更換影片`,$icon:!0,children:(0,H.jsx)(U,{name:`upload`,size:20,label:`更換影片`})}),c.type===`audio`&&c.assetId&&(0,H.jsx)(_v,{onClick:async()=>{let n=await Ha(`audio/*`);n&&e.dispatch({type:`patchBlock`,blockId:t,blockType:`audio`,patch:{assetId:Ma(n),title:n.name}})},title:`更換音檔`,$icon:!0,children:(0,H.jsx)(U,{name:`upload`,size:20,label:`更換音檔`})}),c.type===`web`&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(_v,{$on:a===t,onClick:()=>{c.chosen===!1&&e.dispatch({type:`patchBlock`,blockId:t,blockType:`web`,patch:{chosen:!0}}),Rc(a===t?null:t)},title:`更改網址`,$icon:!0,children:(0,H.jsx)(U,{name:`link`,size:20,label:`更改網址`})}),(0,H.jsx)(_v,{$on:c.chosen!==!1&&c.presentation===`bookmark`,onClick:()=>{Rc(null),e.dispatch({type:`patchBlock`,blockId:t,blockType:`web`,patch:{presentation:`bookmark`,chosen:!0,widthPct:e.doc.settings.writingMode===`vertical`?void 0:100/3,blockSize:void 0}})},title:`以插入標籤呈現`,children:`標籤`}),(0,H.jsx)(_v,{$on:c.chosen!==!1&&c.presentation===`embed`,onClick:()=>{Rc(null),e.dispatch({type:`patchBlock`,blockId:t,blockType:`web`,patch:{presentation:`embed`,chosen:!0,widthPct:100,blockSize:void 0}})},title:`以內嵌網頁呈現`,children:`內嵌`})]}),(c.type===`image`||c.type===`table`||c.type===`web`||c.type===`video`&&d||(c.type===`pdf`||c.type===`audio`)&&!!c.assetId)&&(0,H.jsx)(vv,{}),Zn(c.type)&&(0,H.jsx)(_v,{$on:c.popups.length>0,onClick:()=>e.openPopupPanel(t),title:`新增補充資源`,$icon:!0,children:(0,H.jsx)(U,{name:`blocks`,size:20,label:`新增補充資源`})}),(0,H.jsx)(_v,{$on:!!c.masked,onClick:()=>e.dispatch({type:`patchBlock`,blockId:t,blockType:c.type,patch:{masked:!c.masked||void 0}}),title:`遮住：點擊後出現`,"aria-pressed":!!c.masked,$icon:!0,children:(0,H.jsx)(U,{name:`eye-off`,size:20,label:`遮住：點擊後出現`})}),(0,H.jsx)(_v,{$on:l.breakBefore,onClick:()=>e.dispatch({type:`setBreakBefore`,rowId:l.id,value:!l.breakBefore}),title:l.breakBefore?`取消這裡的換頁`:`從這一列開始換到新的一頁`,$icon:!0,children:(0,H.jsx)(U,{name:`page-break`,size:20,label:l.breakBefore?`取消換頁`:`換頁`})}),(0,H.jsx)(_v,{onClick:()=>{e.dispatch({type:`deleteBlock`,blockId:t}),e.select(null)},title:`刪除`,$icon:!0,children:(0,H.jsx)(U,{name:`trash`,size:20,label:`刪除`})})]})}function fv(){let[e,t]=(0,B.useState)(null);return(0,B.useLayoutEffect)(()=>{let e=()=>{if(document.activeElement?.closest(`[data-text-popover]`))return;let e=document.getSelection();!e||e.rangeCount===0||e.isCollapsed||t(e.getRangeAt(0).getBoundingClientRect())};return e(),document.addEventListener(`selectionchange`,e),window.addEventListener(`scroll`,e,!0),window.addEventListener(`resize`,e),()=>{document.removeEventListener(`selectionchange`,e),window.removeEventListener(`scroll`,e,!0),window.removeEventListener(`resize`,e)}},[]),e}function pv(e,t){let[n,r]=(0,B.useState)(null),i=(0,B.useRef)(0);return(0,B.useLayoutEffect)(()=>{let t=()=>{let t=document.querySelector(e);t&&r(t.getBoundingClientRect())};return t(),i.current=requestAnimationFrame(t),window.addEventListener(`scroll`,t,!0),window.addEventListener(`resize`,t),()=>{cancelAnimationFrame(i.current),window.removeEventListener(`scroll`,t,!0),window.removeEventListener(`resize`,t)}},[e,t]),n}function mv(e){let t=Math.min(Math.max(e.left+e.width/2,168),window.innerWidth-160-8),n=e.top>72;return{left:t,top:n?e.top-12:e.bottom+12,transform:n?`translate(-50%, -100%)`:`translate(-50%, 0)`}}function hv({children:e,...t}){let[n]=(0,B.useState)(()=>document.body),r=(0,B.useRef)(null);return(0,B.useLayoutEffect)(()=>{let e=r.current;if(!e)return;e.style.marginLeft=`0px`;let t=e.getBoundingClientRect(),n=t.right>window.innerWidth-8?window.innerWidth-8-t.right:t.left<8?8-t.left:0;e.style.marginLeft=`${n}px`}),(0,pi.createPortal)((0,H.jsx)(gv,{ref:r,...t,children:e}),n)}var gv=V.div`
  position: fixed;
  z-index: 900;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  background: ${e=>e.theme.surface.raised};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  box-shadow: ${e=>e.theme.shadow.card};
  /* 整條工具列一個字級：跟「內文」「18」那幾顆下拉（Dropdown）同為 14px，裡面的按鈕都繼承這裡 */
  font-size: ${e=>e.theme.typography.bodySmSize};
  white-space: nowrap;
  width: max-content;
`,_v=V.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  padding: 6px 12px;
  min-block-size: 36px;
  font: inherit;
  white-space: nowrap;
  flex-shrink: 0;
  /* 只有圖示的鈕是正圓，跟刪除那顆同大 */
  ${e=>e.$icon&&`justify-content: center; inline-size: 36px; padding: 0;`}
  /* $on＝開／關切換已開啟（灰，比滑過深一階；不用黃，黃色在畫面上太多）；$open＝這顆打開的選單還開著（淡灰，跟下拉一致） */
  background: ${e=>e.$on?e.theme.surface.muted:e.$open?e.theme.surface.sunken:`transparent`};
  color: ${e=>e.$on||e.$open?e.theme.text.primary:e.theme.text.secondary};

  &:hover {
    background: ${e=>e.$on?e.theme.surface.muted:e.theme.surface.sunken};
  }
`,vv=V.span`
  inline-size: 1px;
  block-size: 20px;
  margin-inline: 4px;
  flex-shrink: 0;
  background: ${e=>e.theme.border.subtle};
`,yv=[{label:`章`,role:`lessonTitle`,size:17,weight:700,title:`章`},{label:`節`,role:`sectionTitle`,size:15,weight:700,title:`節`},{label:`內文`,role:`body`,size:13,weight:400,title:`內文（一般段落）`}],bv=()=>Mi(``,`body`),xv=16,Sv=32,Cv=96;function wv({pages:e,onSave:t,onClose:n}){let[r,i]=(0,B.useState)(()=>e.map(e=>e.length>0?e:[bv()])),[a,o]=(0,B.useState)(0),[s,c]=(0,B.useState)(null),l=(0,B.useRef)(null),u=(0,B.useRef)(null);(0,B.useEffect)(()=>{u.current?.querySelector(`[data-on]`)?.scrollIntoView({block:`nearest`,inline:`nearest`})},[a,r.length]);let d=(0,B.useRef)(null),f=Zm(d),p=Xm,m=r[a]??[],[h,g]=(0,B.useState)(null),[_,v]=(0,B.useState)(null),[y,b]=(0,B.useState)(!1),x=(0,B.useRef)(null);(0,B.useEffect)(()=>{let e=e=>{e.key===`Escape`&&(e.stopPropagation(),n())};return window.addEventListener(`keydown`,e,!0),()=>window.removeEventListener(`keydown`,e,!0)},[n]);let S=(e,t=!0)=>{let n=20,r=()=>{let i=l.current?.querySelector(`[data-rich-id="${e}"] [contenteditable="true"]`);if(!i){--n>0&&requestAnimationFrame(r);return}i.focus();let a=window.getSelection();a&&(a.selectAllChildren(i),t?a.collapseToEnd():a.collapseToStart())};requestAnimationFrame(r)},C=e=>i(t=>t.map((t,n)=>n===a?e:t)),w=e=>{x.current=m,C(e)};(0,B.useLayoutEffect)(()=>{let e=l.current;if(!e)return;let t=[...e.querySelectorAll(`[data-rich-id]`)];if((t.length?Math.max(...t.map(e=>e.offsetTop+e.offsetHeight)):0)>Jm.height-Ym+1&&x.current){let e=x.current;x.current=null,C(e),b(!0);return}x.current=null}),(0,B.useEffect)(()=>{if(!y)return;let e=setTimeout(()=>b(!1),2400);return()=>clearTimeout(e)},[y]),(0,B.useEffect)(()=>g(null),[a]);let T=(e,t)=>C(m.map(n=>n.id===e?t:n)),E=(e,t)=>{let n=m.findIndex(t=>t.id===e),r=m.slice();r.splice(n+1,0,t),w(r)},D=()=>[...l.current?.querySelectorAll(`[data-rich-id]`)??[]],O=e=>{let t=D(),n=t.findIndex(t=>{let n=t.getBoundingClientRect();return e<n.top+n.height/2});return n<0?t.length:n},k=(e,t)=>{if(e.target.closest(`button, input, textarea, a, iframe, video, audio, [aria-label="調整尺寸"]`)){g(t);return}e.preventDefault(),g(t),document.activeElement?.blur?.();let n=e.clientX,r=e.clientY,i=!1,a=(e,n)=>{let r=D();for(let i=0;i<r.length;i++){let a=r[i];if(a.dataset.richId===t)continue;let o=a.getBoundingClientRect();if(n<o.top||n>o.bottom)continue;let s=(e-o.left)/(o.width||1);return s<.25&&e>=o.left-24?{index:i,side:`left`}:s>.75&&e<=o.right+24?{index:i,side:`right`}:{index:n<o.top+o.height/2?i:i+1}}return{index:O(n)}},o=e=>{let t=D();if(t.length===0)return v(null);if(e.side){let n=t[e.index],r=e.side===`left`?n.offsetLeft-9:n.offsetLeft+n.offsetWidth+7;return v({top:n.offsetTop,left:r,width:2,height:n.offsetHeight})}let n=e.index<t.length?t[e.index].offsetTop-9:t[t.length-1].offsetTop+t[t.length-1].offsetHeight+7;v({top:n,left:Ym,width:Jm.width-Ym*2,height:2})},s=e=>{!i&&Math.hypot(e.clientX-n,e.clientY-r)<5||(i=!0,o(a(e.clientX,e.clientY)))},c=e=>{if(window.removeEventListener(`pointermove`,s),window.removeEventListener(`pointerup`,c),v(null),!i)return;let n=a(e.clientX,e.clientY),r=m.findIndex(e=>e.id===t);if(r<0)return;let o=m.slice(),[l]=o.splice(r,1),u=n.index>r?n.index-1:n.index;o.splice(u,0,{...l,float:n.side}),w(o)};window.addEventListener(`pointermove`,s),window.addEventListener(`pointerup`,c)},A=e=>{let t=m.filter(t=>t.id!==e);C(t.some(e=>e.type===`text`)?t:[...t,bv()])},j=e=>{let t=l.current;if(!t)return 0;let n=[...t.querySelectorAll(`[data-rich-id]`)],r=n.length?Math.max(...n.map(e=>e.offsetTop+e.offsetHeight)):Ym,i=m.find(t=>t.id===e),a=t.querySelector(`[data-rich-id="${e}"]`),o=i&&i.type===`text`&&!i.spans.some(e=>e.text.trim())&&a?a.offsetHeight:-16;return Jm.height-Ym-r+o-xv-Sv},M=(e,t)=>{let n=Math.min(e,Xm.maxBlockSize/2);return n<Cv?null:Math.max(10,Math.min(100,Math.floor(n*t/Xm.inlineSize*100)))},N=async e=>{let t=await Ha(`image/*`);if(!t)return;let{assetId:n,aspectRatio:r}=await Va(t),i=M(j(e),r);if(i===null)return b(!0);let a={id:W(`blk`),type:`image`,assetId:n,alt:t.name,caption:``,hasCaption:!1,aspectRatio:r,widthPct:i,popups:[]},o=m.findIndex(t=>t.id===e),s=m[o],l=m.slice();s&&s.type===`text`&&!s.spans.some(e=>e.text.trim())?l.splice(o,1,a):l.splice(o+1,0,a);let u=l.indexOf(a)+1;if(!l[u]||l[u].type!==`text`){let e=bv();l.splice(u,0,e),c(e.id),S(e.id)}w(l)},P=async(e,t)=>{let n=t===`audio`?j(e)>=64?50:null:M(j(e),16/9);if(n===null)return b(!0);let r={...am(t),widthPct:n};if(t===`audio`){let e=await Ha(`audio/*`);if(!e)return;r={...r,assetId:Ma(e),title:e.name}}let i=m.findIndex(t=>t.id===e),a=m[i],o=m.slice();a&&a.type===`text`&&!a.spans.some(e=>e.text.trim())?o.splice(i,1,r):o.splice(i+1,0,r);let s=o.indexOf(r)+1;(!o[s]||o[s].type!==`text`)&&o.splice(s,0,bv()),w(o);let l=o[s];l&&(c(l.id),S(l.id))},F=(e,t)=>{if(!(t.type!==`text`||e.nativeEvent.isComposing)){if(e.key===`Enter`&&!e.shiftKey){e.preventDefault();let n=bv();E(t.id,n),c(n.id),S(n.id)}else if(e.key===`Backspace`&&!t.spans.some(e=>e.text)){let n=m.findIndex(e=>e.id===t.id);if(n<=0||m.length===1)return;e.preventDefault();let r=m[n-1];A(t.id),r.type===`text`&&(c(r.id),S(r.id))}}};(0,B.useEffect)(()=>{let e=(r[a]??[]).find(e=>e.type===`text`);e&&S(e.id)},[a,r.length]);let I=()=>{i(e=>[...e,[bv()]]),o(r.length)},L=e=>{r.length<=1||(i(t=>t.filter((t,n)=>n!==e)),o(t=>Math.max(0,t>e||t===r.length-1?t-1:t)))};return(0,pi.createPortal)((0,H.jsx)(Tv,{onPointerDown:e=>e.target===e.currentTarget&&n(),children:(0,H.jsxs)(Ev,{role:`dialog`,"aria-label":`編輯大彈窗`,children:[(0,H.jsxs)(Dv,{children:[(0,H.jsx)(kv,{role:`tablist`,"aria-label":`頁面`,ref:u,children:r.map((e,t)=>(0,H.jsxs)(Av,{type:`button`,role:`tab`,"aria-selected":t===a,"data-on":t===a||void 0,$on:t===a,onClick:()=>o(t),children:[`第 `,t+1,` 頁`,t===a&&r.length>1&&(0,H.jsx)(jv,{role:`button`,"aria-label":`刪除第 ${t+1} 頁`,onClick:e=>{e.stopPropagation(),L(t)},children:(0,H.jsx)(U,{name:`x`,size:16})})]},t))}),(0,H.jsxs)(Mv,{type:`button`,onClick:I,children:[`新增頁面`,(0,H.jsx)(U,{name:`plus`,size:16})]}),(0,H.jsxs)(Wv,{children:[(0,H.jsx)(Gv,{type:`button`,onClick:()=>t(r.map(e=>e.filter((t,n)=>!(t.type===`text`&&!t.spans.some(e=>e.text.trim())&&n===e.length-1&&e.length>1))).filter((e,t,n)=>n.length===1||e.some(e=>e.type!==`text`||e.spans.some(e=>e.text.trim())))),children:`儲存`}),(0,H.jsx)(Ov,{type:`button`,onClick:n,"aria-label":`關閉（不儲存）`,children:(0,H.jsx)(U,{name:`x`,size:24})})]})]}),(0,H.jsx)(Nv,{ref:d,children:(0,H.jsxs)(Pv,{ref:l,style:{transform:`scale(${f||1})`,visibility:f>0?void 0:`hidden`},onPointerDown:e=>{if(e.target!==e.currentTarget)return;e.preventDefault(),g(null);let t=m[m.length-1];if(t&&t.type===`text`)return S(t.id);let n=bv();C([...m,n]),S(n.id)},children:[f>0&&m.map(e=>(0,H.jsxs)(Fv,{$hint:m.length===1||s===e.id,$fit:e.type!==`text`,"data-rich-id":e.id,$movable:h===e.id,$float:e.float,onFocusCapture:()=>{c(e.id),e.type===`text`&&g(null)},onKeyDownCapture:t=>F(t,e),onPointerDownCapture:e.type===`text`?void 0:t=>k(t,e.id),children:[h===e.id&&Yu(e)&&vr(e,p)&&(0,H.jsx)(Zu,{mode:Yu(e),box:vr(e,p),columnInline:p.inlineSize,vertical:!1,onResize:t=>{let n=e.type===`audio`?Math.ceil(360/Math.max(1,p.inlineSize)*100):0,r={...t,widthPct:Math.max(n,t.widthPct??e.widthPct??100)};w(m.map(t=>t.id===e.id?{...t,...r}:t))}}),(0,H.jsx)(Lm,{block:e,settings:qm,sizing:p,onEditSpans:e.type===`text`?t=>w(m.map(n=>n.id===e.id?{...e,spans:t}:n)):void 0,onPatch:t=>T(e.id,{...e,...t})}),s===e.id&&e.type===`text`&&(0,H.jsxs)(Vv,{onPointerDown:e=>e.preventDefault(),children:[yv.map(t=>(0,H.jsx)(Uv,{type:`button`,$on:e.role===t.role,title:t.title,"aria-pressed":e.role===t.role,style:{fontSize:t.size,fontWeight:t.weight},onClick:()=>T(e.id,{...e,role:t.role,fontSize:void 0}),children:t.label},t.role)),(0,H.jsx)(Hv,{}),(0,H.jsx)(Uv,{type:`button`,$on:!1,title:`插入圖片`,"aria-label":`插入圖片`,onClick:()=>void N(e.id),children:(0,H.jsx)(U,{name:`image`,size:20})}),(0,H.jsx)(Uv,{type:`button`,$on:!1,title:`插入影片`,"aria-label":`插入影片`,onClick:()=>P(e.id,`video`),children:(0,H.jsx)(U,{name:`video`,size:20})}),(0,H.jsx)(Uv,{type:`button`,$on:!1,title:`插入聲音`,"aria-label":`插入聲音`,onClick:()=>void P(e.id,`audio`),children:(0,H.jsx)(U,{name:`music`,size:20})}),(0,H.jsx)(Uv,{type:`button`,$on:!1,title:`插入網頁`,"aria-label":`插入網頁`,onClick:()=>P(e.id,`web`),children:(0,H.jsx)(U,{name:`globe`,size:20})})]})]},e.id)),_&&(0,H.jsx)(Iv,{style:_}),y&&(0,H.jsx)(Lv,{role:`status`,children:`這一頁放不下了，請新增頁面`})]})}),h&&m.some(e=>e.id===h)&&(0,H.jsx)(Rv,{anchorId:h,areaRef:l,onDelete:()=>{A(h),g(null)}})]})}),document.body)}var Tv=V.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: grid;
  place-items: center;
  padding: 24px;
  background: ${xd};
`,Ev=V.div`
  inline-size: min(1248px, 100%);
  /* 高度跟著頁走：頁是 16:9、寬從頁籤左緣到關閉鈕右緣；視窗太矮才壓縮 */
  max-block-size: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetLg};
  box-sizing: border-box;
  border-radius: ${e=>e.theme.radius.panel};
  background: ${e=>e.theme.surface.page};
  box-shadow: ${e=>e.theme.shadow.float};
  writing-mode: horizontal-tb;
`,Dv=V.header`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
`,Ov=V.button`
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
  &:hover { background: ${e=>e.theme.surface.sunken}; }
`,kv=V.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  min-inline-size: 0;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  > * { flex: none; }
`,Av=V.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-block-size: 32px;
  padding: 0 14px;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.$on?e.theme.surface.muted:`transparent`};
  color: ${e=>e.$on?e.theme.text.primary:e.theme.text.secondary};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: ${e=>e.$on?500:400};
  cursor: pointer;
  &:hover { background: ${e=>e.$on?e.theme.surface.muted:e.theme.surface.sunken}; }
`,jv=V.span`
  display: grid;
  place-items: center;
  margin-inline-end: -6px;
  inline-size: 20px;
  block-size: 20px;
  border-radius: 999px;
  &:hover { background: ${e=>e.theme.border.subtle}; }
`,Mv=V.button`
  flex: none;
  margin-inline-end: auto;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-block-size: 32px;
  padding: 0 12px;
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.secondary};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  cursor: pointer;
  &:hover { border-color: ${e=>e.theme.border.accent}; color: ${e=>e.theme.text.accent}; }
`,Nv=V.div`
  position: relative;
  flex: 0 1 auto;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  min-block-size: 0;
`,Pv=V.div`
  ${ih}
  flex: none;
  /* 把手、浮出的小工具要能超出頁緣一點 */
  overflow: visible;
  /* 絕對定位置中：頁本身不參與版面，Stage 多大由彈窗決定，頁再縮放進去（不然 768 高的頁會把彈窗撐破） */
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -${Jm.width/2}px;
  margin-top: -${Jm.height/2}px;
  transform-origin: center;
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.raised};
  cursor: text;
`,Fv=V.div`
  position: relative;
  ${e=>ah(e.$float)}
  ${e=>e.$movable&&`cursor: grab; &:active { cursor: grabbing; }`}
  /* 非文字元件只佔自己那麼大，刪除鈕才會貼在元件的右上角而不是整行最右邊 */
  ${e=>e.$fit&&`inline-size: fit-content; max-inline-size: 100%;`}
  min-inline-size: 0;
  overflow-wrap: anywhere;
  /* 提示字只在整頁還是空的時候出現；開始打字之後，新的空白段落不再顯示 */
  ${e=>e.$hint?``:`[contenteditable='true']:empty::before { content: none !important; }`}
  [contenteditable='true']:empty::before {
    content: '輸入內容';
    color: ${e=>e.theme.text.placeholder};
    pointer-events: none;
  }
`,Iv=V.div`
  position: absolute;
  border-radius: 999px;
  background: ${e=>e.theme.tool.border};
  pointer-events: none;
  z-index: 7;
`,Lv=V.div`
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  padding: 8px 16px;
  border-radius: 999px;
  background: ${e=>e.theme.text.primary};
  color: ${e=>e.theme.surface.raised};
  font-size: var(--ds-typography-body-sm-size);
  white-space: nowrap;
  pointer-events: none;
  z-index: 8;
`;function Rv({anchorId:e,areaRef:t,onDelete:n}){let[r,i]=(0,B.useState)(null);return(0,B.useLayoutEffect)(()=>{let n=t.current?.querySelector(`[data-rich-id="${e}"]`),r=t.current?.getBoundingClientRect();if(!n||!r)return i(null);let a=n.getBoundingClientRect(),o={top:a.height<80?a.top+(a.height-40)/2:a.top,left:a.right+12};i(e=>e&&e.top===o.top&&e.left===o.left?e:o)}),r?(0,pi.createPortal)((0,H.jsx)(zv,{style:r,onPointerDown:e=>e.stopPropagation(),children:(0,H.jsx)(Bv,{type:`button`,"aria-label":`刪除這個元件`,title:`刪除`,onClick:n,children:(0,H.jsx)(U,{name:`trash`,size:20})})}),document.body):null}var zv=V.div`
  position: fixed;
  z-index: 1200;
  display: flex;
  padding: 2px;
  border-radius: 999px;
  background: ${e=>e.theme.surface.page};
  box-shadow: ${e=>e.theme.shadow.card};
`,Bv=V.button`
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
  &:hover { background: ${e=>e.theme.surface.sunken}; color: ${e=>e.theme.text.primary}; }
`,Vv=V.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  box-shadow: ${e=>e.theme.shadow.card};
  padding: 4px 8px;
  border-radius: ${e=>e.theme.radius.control};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
`,Hv=V.span`
  inline-size: 1px;
  block-size: 18px;
  margin-inline: 2px;
  background: ${e=>e.theme.border.subtle};
`,Uv=V.button`
  display: grid;
  place-items: center;
  min-inline-size: 32px;
  block-size: 28px;
  padding: 0 6px;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.$on?e.theme.surface.muted:`transparent`};
  color: ${e=>e.theme.icon.default};
  font-family: ${e=>e.theme.typography.fontDisplay};
  line-height: 1;
  cursor: pointer;
  &:hover { background: ${e=>e.theme.surface.sunken}; }
`,Wv=V.div`
  flex: none;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
`,Gv=V.button`
  ${bs}
`;function Kv(){let e=Lh(),t=e?.popupFor??null;uc(!!t,()=>e?.openPopupPanel(null));let n=(0,B.useRef)(e);n.current=e,(0,B.useEffect)(()=>{if(t)return()=>{let e=n.current;if(!e)return;let r=Ii(e.doc,t);if(!r)return;for(let n of r.block.popups)Ui(n)&&e.dispatch({type:`removePopup`,blockId:t,popupId:n.id});let i=r.block;if(i.type===`text`&&i.rangeNotes?.some(e=>!ss(e))){let n=new Set(i.rangeNotes.filter(e=>!ss(e)).map(e=>e.id));e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:i.rangeNotes.filter(e=>!n.has(e.id))}}),e.dispatch({type:`setSpans`,blockId:t,spans:i.spans.map(e=>e.noteId&&n.has(e.noteId)?{...e,noteId:void 0}:e)})}}},[t]),(0,B.useEffect)(()=>{e?.popupPick&&e.popupPick.blockId!==t&&e.setPopupPick(null)},[t,e]);let[r,i]=(0,B.useState)(()=>new Set),a=e=>i(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),[o,s]=(0,B.useState)(null),[c,l]=(0,B.useState)(null),[u,d]=(0,B.useState)(null),f=(0,B.useRef)(null),[p,m]=(0,B.useState)(!1),h=ql(),[g,_]=(0,B.useState)(null),v=e?.popupPick?`${e.popupPick.start}-${e.popupPick.end}`:``;if((0,B.useEffect)(()=>_(null),[t,v]),(0,B.useEffect)(()=>{if(!t)return;let n=t=>{t.key===`Escape`&&e?.openPopupPanel(null)};return window.addEventListener(`keydown`,n),()=>window.removeEventListener(`keydown`,n)},[t,e]),!e||!t)return null;let y=Ii(e.doc,t);if(!y||!Zn(y.block.type))return null;let{block:b}=y,x=()=>e.openPopupPanel(null),S=b.type===`text`&&b.paragraph?h.get(b.id)?.no??null:null,C=b.type===`text`&&S!=null?b:null,w=n=>e.dispatch({type:`updatePopup`,blockId:t,item:n}),T=b.type===`text`&&e.popupPick?.blockId===t&&e.popupPick.end<=Kr(b.spans)&&e.popupPick.end>e.popupPick.start?e.popupPick:null,E=T&&b.type===`text`?ei(b.spans,T.start,T.end):[],D=Gr(E),O=e=>{let t=E[0]?.[e];return E.length>0&&E.every(n=>n[e]===t)?t:void 0},k=O(`noteId`),A=k&&b.type===`text`?b.rangeNotes?.find(e=>e.id===k)??null:null,j=new Set(E.map(e=>e.popupId).filter(Boolean)),M=O(`popupId`),N=new Set(Qi(b).map(e=>e.id)),P=T?b.popups.filter(e=>j.has(Yi(e))):b.popups.filter(e=>N.has(e.id)),F=e=>T?j.has(Yi(e)):N.has(e.id),I=n=>{!T||b.type!==`text`||e.dispatch({type:`setSpans`,blockId:t,spans:Xr(b.spans,T.start,T.end,n)})},L=A?as(A):null,ee=!!C&&(!T||L===`sentence`),te=[...Zo.map(e=>e.key),`bu`],ne=e=>(T&&A?os(A)[e]:C?.paraNotes?.[e])??``,re=e=>e===`bu`?P.length>0:!!ne(e).trim(),ie=g??te.find(e=>!re(e))??`zhi`,R=!ee||ie===`bu`,ae=n=>{b.type!==`text`||!A||e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:(b.rangeNotes??[]).map(e=>e.id===A.id?{...e,...n}:e)}})},oe=(e,t)=>A&&ae({kind:`sentence`,body:``,notes:{...os(A),[e]:t}}),z=()=>{for(let n of P)e.dispatch({type:`removePopup`,blockId:t,popupId:n.id});m(!1)},se=n=>{let r=Hi(n),a=T&&M?{...r,wordGroup:M}:r;e.dispatch({type:`addPopup`,blockId:t,item:a,forWords:!!T}),T&&!M&&I({popupId:a.id}),i(e=>new Set(e).add(a.id)),a.kind===`image`||a.kind===`audio`?Yv(a,w):Xv(a.id)};return(0,pi.createPortal)((0,H.jsxs)(dc,{role:`dialog`,"aria-label":`補充內容設定`,children:[(0,H.jsxs)(fc,{children:[(0,H.jsx)(pc,{title:T?D:void 0,style:{minInlineSize:0,overflow:`hidden`,textOverflow:`ellipsis`},children:T?`「${D}」`:C?`第 ${S} 段`:`補充內容`}),(0,H.jsx)(mc,{onClick:x,"aria-label":`關閉`,children:(0,H.jsx)(U,{name:`x`,size:24,label:`關閉`})})]}),(0,H.jsxs)(hc,{children:[C&&(0,H.jsxs)(H.Fragment,{children:[T&&A&&L!==`sentence`&&(0,H.jsx)(oy,{children:(0,H.jsxs)(Ly,{"data-popup-id":`rnote-${A.id}`,$open:!0,children:[(0,H.jsxs)(Wy,{children:[(0,H.jsx)(By,{"aria-hidden":!0,$filled:!!A.body.trim(),children:rs.find(e=>e.key===L).dot}),(0,H.jsx)(Vy,{children:rs.find(e=>e.key===L).note})]}),(0,H.jsx)(Uy,{value:A.body,placeholder:`例：音ㄕˋ，愛好。`,"aria-label":`「${D}」的註釋`,onChange:e=>ae({body:e.target.value})})]})}),!T&&(0,H.jsx)(ny,{assetId:C.readAloud??null,onChange:n=>e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{readAloud:n}})}),ee&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(Ry,{role:`tablist`,"aria-label":T?`「${D}」的說明`:`第 ${S} 段的說明`,children:te.map(e=>{let t=e===`bu`?null:Zo.find(t=>t.key===e),n=t?t.name:`補充`;return(0,H.jsx)(zy,{type:`button`,role:`tab`,"aria-selected":ie===e,"aria-label":`${n}${re(e)?``:`（還沒填）`}`,title:n,$filled:re(e),$on:ie===e,onClick:()=>{_(e),e!==`bu`&&Xv(`note-${e}`)},children:t?t.btn:(0,H.jsx)(U,{name:`blocks`,size:20})},e)})}),ie!==`bu`&&(()=>{let n=Zo.find(e=>e.key===ie);return(0,H.jsx)(oy,{children:(0,H.jsxs)(Ly,{"data-popup-id":`note-${n.key}`,$open:!0,children:[(0,H.jsx)(Wy,{children:(0,H.jsx)(Vy,{children:n.name})}),(0,H.jsx)(Uy,{value:ne(n.key),placeholder:`輸入${n.name}`,"aria-label":T?`「${D}」的${n.name}`:n.name,onChange:r=>T?oe(n.key,r.target.value):e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{paraNotes:{...C.paraNotes,[n.key]:r.target.value}}})})]})},n.key)})()]}),T&&A&&L!==`sentence`&&(0,H.jsxs)(Ky,{children:[(0,H.jsx)(By,{"aria-hidden":!0,$filled:P.length>0,children:(0,H.jsx)(U,{name:`blocks`,size:16})}),(0,H.jsx)(Vy,{children:`補充`})]})]}),R&&(0,H.jsxs)(H.Fragment,{children:[P.length>0&&(0,H.jsxs)(cy,{children:[(0,H.jsx)(U,{name:Bi[P[0].kind].icon,size:20}),(0,H.jsx)(ly,{children:Bi[P[0].kind].label}),(0,H.jsx)(uy,{type:`button`,onClick:()=>{P.some(e=>!Ui(e))?m(!0):z()},children:`更換`})]}),P.length>0&&(0,H.jsx)(oy,{children:b.popups.map((n,i)=>{if(!F(n))return null;let f=n.kind===`rich`,p=f||r.has(n.id),m=Ui(n);return(0,H.jsxs)(sy,{"data-popup-id":n.id,$single:f,draggable:o===n.id,$dragging:c===i,$dropBefore:u===i&&c!==null&&c!==i&&c!==i-1,$dropAfter:u===i+1&&i===b.popups.length-1&&c!==null&&c!==i,onDragStart:e=>{e.dataTransfer.effectAllowed=`move`,l(i)},onDragOver:e=>{if(c===null)return;e.preventDefault();let t=e.currentTarget.getBoundingClientRect();d(e.clientY<t.top+t.height/2?i:i+1)},onDrop:n=>{if(n.preventDefault(),c!==null&&u!==null){let n=u>c?u-1:u;n!==c&&e.dispatch({type:`reorderPopups`,blockId:t,from:c,to:n})}l(null),d(null),s(null)},onDragEnd:()=>{l(null),d(null),s(null)},children:[(0,H.jsxs)(dy,{children:[P.length>1&&(0,H.jsx)(fy,{"data-hover-only":!0,"aria-label":`拖曳排序`,title:`拖曳排序`,onPointerDown:()=>s(n.id),onPointerUp:()=>s(null),children:(0,H.jsx)(U,{name:`grip`,size:16})}),f?(0,H.jsx)(my,{"aria-expanded":!0}):(0,H.jsxs)(hy,{type:`button`,onClick:()=>a(n.id),"aria-expanded":p,"aria-label":p?`收合`:m?`${Bi[n.kind].label}，${m}`:void 0,$compact:p&&n.kind!==`web`,children:[(0,H.jsx)(gy,{children:(0,H.jsx)(U,{name:p?`chevron-down`:`chevron-right`,size:16})}),!(p&&n.kind!==`web`)&&(0,H.jsx)(_y,{$empty:!Qv(n,null),children:Qv(n,null)||`未命名`})]}),p&&n.kind!==`web`&&(0,H.jsx)(py,{value:n.title,placeholder:`標題（選填）`,"aria-label":`標題（選填）`,onChange:e=>w({...n,title:e.target.value})}),m&&!p&&(0,H.jsx)(vy,{title:m,children:`未完成`}),(0,H.jsx)(yy,{"data-faint":!p||void 0,onClick:()=>e.dispatch({type:`removePopup`,blockId:t,popupId:n.id}),"aria-label":`刪除這一項`,children:(0,H.jsx)(U,{name:`trash`,size:16,label:`刪除`})})]}),p&&(0,H.jsx)(H.Fragment,{children:(0,H.jsx)(qv,{item:n,onChange:w})})]},n.id)})}),(0,H.jsx)(Ay,{ref:f,$open:!1,children:P.length>0&&P[0].kind===`rich`?null:P.length>0?(0,H.jsxs)(jy,{type:`button`,$open:!1,onClick:()=>se(P[0].kind),children:[`新增`,Zv[P[0].kind],(0,H.jsx)(U,{name:`plus`,size:16})]}):(0,H.jsx)(My,{role:`menu`,children:Vi.map(e=>(0,H.jsxs)(Ny,{type:`button`,role:`menuitem`,onClick:()=>se(e),children:[(0,H.jsx)(U,{name:Bi[e].icon,size:20}),(0,H.jsx)(`span`,{children:Bi[e].label})]},e))})})]}),C&&!T&&(C.rangeNotes?.length??0)>0&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(Py,{}),(0,H.jsx)(Fy,{children:(0,H.jsx)(Iy,{children:`標記的字詞與句子`})}),(0,H.jsx)(oy,{children:C.rangeNotes.map(n=>{let r=rs.find(e=>e.key===as(n)),i=C.spans.filter(e=>e.noteId===n.id).map(e=>e.text).join(``),a=r.key===`sentence`;return(0,H.jsxs)(Ly,{"data-popup-id":`rnote-${n.id}`,$open:!0,children:[(0,H.jsxs)(Wy,{children:[(0,H.jsx)(By,{"aria-hidden":!0,$filled:ss(n),children:r.dot}),(0,H.jsxs)(Gy,{title:i,children:[`「`,i,`」`]}),(0,H.jsx)(yy,{onClick:()=>{e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:C.rangeNotes.filter(e=>e.id!==n.id)}}),e.dispatch({type:`setSpans`,blockId:t,spans:C.spans.map(e=>e.noteId===n.id?{...e,noteId:void 0}:e)})},"aria-label":`刪除這則${r.note}`,children:(0,H.jsx)(U,{name:`trash`,size:16,label:`刪除`})})]}),a?(0,H.jsx)(Hy,{as:`p`,style:{whiteSpace:`normal`},children:Zo.filter(e=>os(n)[e.key]?.trim()).map(e=>`${e.name}：${os(n)[e.key].trim()}`).join(`　`)||`還沒填`}):(0,H.jsx)(Uy,{value:n.body,"aria-label":`「${i}」的${r.note}`,onChange:r=>e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:C.rangeNotes.map(e=>e.id===n.id?{...e,body:r.target.value}:e)}})})]},n.id)})})]})]}),p&&P.length>0&&(0,H.jsx)(Sd,{title:`要更換類型嗎？`,message:`已加入的${P.length>1?` ${P.length} ${Zv[P[0].kind].slice(1)}`:``}${Bi[P[0].kind].label}會一併刪除。`,confirmLabel:`更換`,onConfirm:z,onCancel:()=>m(!1)})]}),document.body)}function qv({item:e,onChange:t}){let n=Lh();switch(e.kind){case`text`:return(0,H.jsxs)(by,{children:[(0,H.jsxs)(`span`,{children:[`內容`,(0,H.jsx)(Dy,{children:`（選填）`})]}),(0,H.jsx)(Sy,{value:e.body,rows:3,onChange:n=>t({...e,body:n.target.value})})]});case`image`:return(0,H.jsx)(ay,{done:!!e.assetId,label:e.assetId?`更換圖片`:`上傳圖片`,preview:ja(e.assetId),onPick:()=>void Yv(e,t)});case`audio`:return(0,H.jsx)(ay,{done:!!e.assetId,label:e.assetId?`更換音檔`:`上傳音檔`,onPick:()=>void Yv(e,t)});case`video`:{let n=e.source===`upload`&&!!e.ref;return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(ty,{label:`YouTube 網址`,value:e.source===`youtube`?e.ref:``,placeholder:`貼上 YouTube 網址`,onChange:n=>t({...e,ref:n,source:`youtube`})}),(0,H.jsx)(Cy,{children:`或`}),(0,H.jsx)(ay,{done:n,label:n?`更換影片`:`上傳影片`,onPick:async()=>{let n=await Ha(`video/*`);n&&t({...e,source:`upload`,ref:Ma(n)})}})]})}case`web`:return(0,H.jsx)(ty,{label:`網址`,value:e.url,placeholder:`貼上網址（https://…）`,onChange:n=>{let r={...e,url:n,title:Mc(n)};t(r),clearTimeout(Jv),Jv=window.setTimeout(()=>{jc(n).then(e=>{e&&t({...r,title:e})})},600)}});case`rich`:return(0,H.jsx)(ey,{item:e,onChange:t});case`jump`:return(0,H.jsxs)(by,{children:[`目標段落`,(0,H.jsx)(a_,{value:e.targetRowId??``,"aria-label":`跳到哪一段`,placeholder:`還沒選`,options:(n?.doc.rows??[]).map((e,t)=>({value:e.id,label:`第 ${t+1} 段 · ${$v(e)}`})),onChange:n=>t({...e,targetRowId:n||null})})]})}}var Jv=0;async function Yv(e,t){if(e.kind===`image`){let n=await Ha(`image/*`);if(!n)return;let{assetId:r}=await Va(n);t({...e,assetId:r})}else if(e.kind===`audio`){let n=await Ha(`audio/*`);if(!n)return;t({...e,assetId:Ma(n)})}}function Xv(e){let t=20,n=()=>{let r=document.querySelector(`[data-popup-id="${e}"] input:not([type="file"]), [data-popup-id="${e}"] textarea`);r?r.focus():--t>0&&requestAnimationFrame(n)};requestAnimationFrame(n)}var Zv={text:`一則`,rich:`一個`,image:`一張`,video:`一支`,audio:`一段`,web:`一個`,jump:`一個`};function Qv(e,t){if(t)return t;switch(e.kind){case`text`:return e.title||e.body;case`web`:return e.title||e.url;case`video`:return e.title||(e.source===`upload`?Aa(e.ref)?.name??``:e.ref);case`image`:case`audio`:return e.title||(e.assetId?Aa(e.assetId)?.name??``:``);default:return e.title}}function $v(e){let t=e.columns[0]?.blocks[0];return t?t.type===`text`?Ni(t).slice(0,16)||`空白文字`:t.type:`空的`}function ey({item:e,onChange:t}){let[n,r]=(0,B.useState)(!1),i=Gi(e);return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(wy,{children:[(0,H.jsxs)(Ty,{type:`button`,onClick:()=>r(!0),children:[`編輯內容`,(0,H.jsx)(U,{name:`pencil`,size:16})]}),(0,H.jsxs)(Ey,{children:[`共 `,i.length,` 頁`]})]}),n&&(0,H.jsx)(wv,{title:e.title,pages:i,onClose:()=>r(!1),onSave:n=>{t(Ki(e,n)),r(!1)}})]})}function ty({label:e,value:t,placeholder:n,onChange:r}){return(0,H.jsx)(xy,{"aria-label":e,value:t,placeholder:n,onChange:e=>r(e.target.value)})}function ny({assetId:e,onChange:t}){let n=(0,B.useRef)(null),[r,i]=(0,B.useState)(!1),a=()=>{n.current?.pause(),n.current=null,i(!1)};return(0,B.useEffect)(()=>a,[e]),(0,H.jsxs)(ry,{children:[(0,H.jsx)(zy,{type:`button`,$filled:!!e,$on:!1,disabled:!e,"aria-label":e?r?`暫停朗讀`:`試聽朗讀`:`朗讀（還沒上傳）`,title:e?`試聽`:`還沒上傳`,onClick:()=>{if(r||!e)return a();let t=new Audio(ja(e));t.onended=a,n.current=t,i(!0),t.play().catch(()=>{})},children:(0,H.jsx)(U,{name:r?`pause`:`play`,size:20})}),(0,H.jsx)(Vy,{children:`朗讀`}),(0,H.jsxs)(iy,{type:`button`,onClick:async()=>{let e=await Ha(`audio/*`);e&&t(Ma(e))},children:[e?`更換音檔`:`上傳音檔`,!e&&(0,H.jsx)(U,{name:`upload`,size:16})]})]})}var ry=V.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px ${e=>e.theme.space.insetXs} ${e=>e.theme.space.gapSm};
  margin-block-end: ${e=>e.theme.space.gapSm};
  border-block-end: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
`,iy=V.button`
  margin-inline-start: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-block-size: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 999px;
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.text.primary};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  cursor: pointer;
  &:hover { background: ${e=>e.theme.surface.muted}; }
`;function ay({done:e,label:t,onPick:n,preview:r}){return(0,H.jsxs)(H.Fragment,{children:[r&&(0,H.jsx)(ky,{src:r,alt:``}),(0,H.jsxs)(Oy,{$done:e,onClick:n,children:[t,!e&&(0,H.jsx)(U,{name:`upload`,size:16})]})]})}var oy=V.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,sy=V.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  border-radius: ${e=>e.theme.radius.tile};
  opacity: ${e=>e.$dragging?.4:1};

  /*
   * 對齊：收合、展開兩種狀態都用同一組欄——左右各留 8；箭頭佔 24 寬；
   * 箭頭後面隔 4 是文字欄：收合時摘要的字、展開時標題膠囊裡的字，都從同一條線（左起 44）開始，
   * 展開切換時字不會左右跳；展開後下面的欄位跟標題膠囊左緣切齊。
   * 垃圾桶那一欄一直佔著位置（平常淡、滑過才清楚），「未完成」才會固定靠右、不會跳。
   */
  padding: 4px ${e=>e.theme.space.insetXs};
  &:hover:not(:has([aria-expanded='true'])) { background: ${e=>e.theme.surface.sunken}; }
  &:has([aria-expanded='true']) {
    background: ${e=>e.theme.surface.raised};
    /* 上下留白一樣（12），標題列到欄位、欄位到底部也都是 12 */
    padding-block: ${e=>e.theme.space.insetSm};
    gap: ${e=>e.theme.space.gapMd};
    > :not(:first-child) { margin-inline: ${e=>e.$single?`0`:`28px 0`}; }
  }

  /* 握把平常收起來、游標移到這一列才出現；垃圾桶平常淡淡的，滑過才清楚 */
  &:not(:hover) [data-hover-only] { opacity: 0; }
  &:not(:hover) [data-faint] { opacity: 0.35; }

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset-inline: 8px;
    block-size: 2px;
    border-radius: 2px;
    background: ${e=>e.theme.text.primary};
    display: none;
  }
  &::before { inset-block-start: -4px; ${e=>e.$dropBefore&&`display: block;`} }
  &::after { inset-block-end: -4px; ${e=>e.$dropAfter&&`display: block;`} }
`,cy=V.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  padding: 0 4px 0 ${e=>e.theme.space.insetSm};
  min-block-size: 40px;
  border-radius: ${e=>e.theme.radius.tile};
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.icon.default};
`,ly=V.span`
  flex: 1;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  color: ${e=>e.theme.text.primary};
`,uy=V.button`
  min-block-size: 32px;
  padding: 0 12px;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: transparent;
  font: inherit;
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.secondary};
  cursor: pointer;
  &:hover { background: ${e=>e.theme.surface.muted}; color: ${e=>e.theme.text.primary}; }
`,dy=V.div`
  position: relative;
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${e=>e.theme.text.secondary};
`,fy=V.span`
  position: absolute;
  inset-inline-start: -18px;
  inset-block: 0;
  display: grid;
  place-items: center;
  inline-size: 16px;
  color: ${e=>e.theme.icon.secondary};
  cursor: grab;
  touch-action: none;
  transition: opacity 0.12s;
  &:active { cursor: grabbing; }
`,py=V.input`
  ${vc}
  flex: 1;
  min-inline-size: 0;
  min-block-size: 32px;
  font-size: var(--ds-typography-caption-size);
  &::placeholder { color: ${e=>e.theme.text.placeholder}; }
  padding-inline: 8px 12px;
`,my=V.span`
  display: none;
`,hy=V.button`
  flex: ${e=>e.$compact?`none`:1};
  min-inline-size: 0;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  min-block-size: 32px;
  padding: 0;
  border: none;
  background: transparent;
  font: inherit;
  color: ${e=>e.theme.icon.default};
  text-align: start;
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.tile};
  &:focus-visible { outline: none; }
`,gy=V.span`
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 24px;
  block-size: 24px;
  border-radius: 999px;
  button:hover > &, button:focus-visible > & { background: ${e=>e.theme.surface.muted}; }
`,_y=V.span`
  flex: 1;
  padding-inline-start: 8px;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  /* 沒有標題時「未命名」用淡灰——是提示，不是內容 */
  color: ${e=>e.$empty?e.theme.text.tertiary:e.theme.text.primary};
`,vy=V.span`
  flex: none;
  padding: 1px 8px;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.feedback.warningSurface};
  color: ${e=>e.theme.feedback.warningDefault};
  font-size: var(--ds-typography-label-size);
  line-height: 18px;
`,yy=V(mc)`
  flex: none;
  justify-content: center;
  inline-size: 32px;
  block-size: 32px;
  min-block-size: 0;
  padding: 0;
  transition: opacity 0.12s;
`,by=V.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.text.secondary};
`,xy=V.input`
  ${vc}
  min-block-size: 32px;
  font-size: var(--ds-typography-caption-size);
`,Sy=V.textarea`
  ${yc}
  font-size: var(--ds-typography-caption-size);
`,Cy=V.span`
  align-self: center;
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.tertiary};
`,wy=V.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
`,Ty=V.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  min-block-size: 36px;
  padding: 0 12px;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  border-radius: ${e=>e.theme.radius.control};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.secondary};
  cursor: pointer;
  &:hover { border-color: ${e=>e.theme.border.accent}; color: ${e=>e.theme.text.accent}; }
`,Ey=V.span`
  flex: none;
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.tertiary};
`,Dy=V.span`
  color: ${e=>e.theme.text.tertiary};
`,Oy=V.button`
  ${e=>e.$done?`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-block-size: 40px;
    padding: 0 16px;
    border: none;
    border-radius: 999px;
    background: ${e.theme.surface.sunken};
    font: inherit;
    font-size: var(--ds-typography-body-sm-size);
    color: ${e.theme.text.primary};
    cursor: pointer;
    transition: background 0.12s;
    &:hover { background: ${e.theme.surface.muted}; }
  `:bs}
`,ky=V.img`
  display: block;
  align-self: stretch;
  block-size: 140px;
  object-fit: contain;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.sunken};
`,Ay=V.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  border-radius: ${e=>e.theme.radius.panel};
  ${e=>e.$open&&`
    padding: ${e.theme.space.insetXs};
    background: ${e.theme.surface.raised};
  `}
`,jy=V.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  inline-size: 100%;
  min-block-size: 40px;
  padding: 0 12px;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  border-radius: ${e=>e.theme.radius.control};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.secondary};
  cursor: pointer;
  transition: border-color 0.12s, color 0.12s;

  &:hover,
  &:focus-visible {
    outline: none;
    border-color: ${e=>e.theme.border.accent};
    color: ${e=>e.theme.text.accent};
  }
`,My=V.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${e=>e.theme.space.gapSm};
`,Ny=V.button`
  ${au}
  block-size: auto;
  aspect-ratio: 1;
  background: ${e=>e.theme.surface.raised};
  ${Ay}[data-open] & { background: ${e=>e.theme.surface.sunken}; }
  ${Ay}[data-open] &:hover { background: ${e=>e.theme.surface.muted}; }
`,Py=V.hr`
  margin: ${e=>e.theme.space.gapSm} 0 0;
  border: none;
  border-block-start: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
`,Fy=V.div`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.space.gapSm};
  padding-inline: ${e=>e.theme.space.insetXs};
`,Iy=V.span`
  font-size: var(--ds-typography-label-size);
  font-weight: 500;
  color: ${e=>e.theme.text.secondary};
`,Ly=V.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  padding: 4px ${e=>e.theme.space.insetXs};
  border-radius: ${e=>e.theme.radius.tile};
  ${e=>e.$open?`background: ${e.theme.surface.raised}; padding-block-end: ${e.theme.space.insetXs}; box-shadow: ${e.theme.shadow.card};`:`&:hover { background: ${e.theme.surface.sunken}; }`}
`,Ry=V.div`
  display: flex;
  justify-content: space-between;
  padding: 4px ${e=>e.theme.space.insetXs} ${e=>e.theme.space.gapSm};
`,zy=V.button`
  position: relative;
  display: grid;
  place-items: center;
  inline-size: 42px;
  block-size: 42px;
  &::after { content: ''; position: absolute; inset: -3px; border-radius: 999px; }
  padding: 0;
  border-radius: 999px;
  border: 1.5px solid ${e=>e.$filled?e.theme.text.primary:e.theme.border.default};
  background: ${e=>e.$filled?e.theme.text.primary:e.theme.surface.raised};
  color: ${e=>e.$filled?e.theme.surface.raised:e.theme.text.tertiary};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  cursor: pointer;
  box-shadow: ${e=>e.$on?`0 0 0 2px ${e.theme.surface.page}, 0 0 0 4px ${e.theme.brand.accentOnLight}`:`none`};
  transition: background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s, transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
  &:hover { ${e=>e.$filled?`background: ${e.theme.brand.secondaryHover};`:`color: ${e.theme.text.secondary}; border-color: ${e.theme.border.hover};`} }
  &:active { transform: scale(0.94); }
  &:focus-visible { outline: 2px solid ${e=>e.theme.border.focus}; outline-offset: 4px; }
`,By=V.span`
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 28px;
  border-radius: 999px;
  border: ${e=>e.theme.border.widthDefault} solid
    ${e=>e.$filled?e.theme.text.primary:e.theme.border.default};
  background: ${e=>e.$filled?e.theme.text.primary:e.theme.surface.raised};
  color: ${e=>e.$filled?e.theme.surface.raised:e.theme.text.secondary};
  font-size: var(--ds-typography-caption-size);
`,Vy=V.span`
  flex: none;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  color: ${e=>e.theme.text.primary};
`,Hy=V.span`
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,Uy=V.textarea`
  ${yc}
  field-sizing: content;
  min-block-size: 56px;
  font-size: var(--ds-typography-body-sm-size);
  resize: none;
`,Wy=V.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-block-size: 36px;
`,Gy=V.span`
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  color: ${e=>e.theme.text.primary};
`,Ky=V(Wy)`
  padding-inline: ${e=>e.theme.space.insetXs};
`;function qy(e){let t=[];for(let n of e.rows)for(let e of n.columns)for(let r of e.blocks){if(r.type!==`text`)continue;let e=nr.indexOf(r.role);if(e<0)continue;let i=Ni(r).trim();i&&t.push({rowId:n.id,role:r.role,depth:e,text:i})}return t}function Jy(e,t){return e.findIndex(e=>e.items.some(e=>e.row.id===t))}var Yy=new Set([`。`,`！`,`？`,`；`,`…`,`!`,`?`,`;`]),Xy=new Set([`」`,`』`,`）`,`】`,`〕`,`》`,`〉`,`"`,`'`,`)`,`]`]);function Zy(e){let t=[],n=Array.from(e),r=0,i=0,a=0,o=n=>{e.slice(i,n).trim().length>0&&t.push({start:i,end:n})};for(;a<n.length;){let e=n[a],t=e.length;if(e===`
`){o(r),r+=t,i=r,a+=1;continue}if(Yy.has(e)){let e=a+1,s=r+t;for(;e<n.length&&(Yy.has(n[e])||Xy.has(n[e]));)s+=n[e].length,e+=1;o(s),r=s,i=r,a=e;continue}r+=t,a+=1}return o(r),t}function Qy(e,t){if(e.length===0)return-1;for(let n=0;n<e.length;n+=1)if(t<e[n].end)return n;return e.length-1}function $y(e,t,n){let{para:r,index:i}=t;for(i+=n;i<0||i>=(e[r]??0);){if(r+=n,r<0||r>=e.length)return null;i=n>0?0:e[r]-1}return{para:r,index:i}}function eb(e){return ds(e).map(e=>e.data).join(``)}function tb(e,t){let n=ms(e,t.start),r=ms(e,t.end),i=document.createRange();return i.setStart(n.node,n.offset),i.setEnd(r.node,r.offset),i}function nb(e,t){let n=0;for(let r of ds(e)){if(t.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_FOLLOWING)break;n+=r.length}return n}function rb(e){return!!e&&e.classList.contains(`ds-rich`)&&!e.isContentEditable}function ib(e){return Array.from(e.querySelectorAll(`.ds-rich`)).filter(e=>rb(e)&&eb(e).trim().length>0)}function ab(e,t,n){let r=document.elementFromPoint(t,n)?.closest(`.ds-rich`)??null;if(!rb(r)||!e.contains(r))return null;let i=null,a=0;if(typeof document.caretPositionFromPoint==`function`){let e=document.caretPositionFromPoint(t,n);if(!e)return null;i=e.offsetNode,a=e.offset}else if(typeof document.caretRangeFromPoint==`function`){let e=document.caretRangeFromPoint(t,n);if(!e)return null;i=e.startContainer,a=e.startOffset}if(!i||!e.contains(i))return null;let o=i.nodeType===Node.TEXT_NODE?i.parentElement:i,s=o?.closest(`.ds-rich`)??null;if(!rb(s)||s!==r)return null;let c=o?.closest(`rt, [data-fn]`);if(c)return{rich:s,offset:nb(s,c)};if(i.nodeType===Node.ELEMENT_NODE&&i!==s){let e=i.childNodes[a];return e?{rich:s,offset:nb(s,e)}:{rich:s,offset:nb(s,i)+eb(i).length}}return{rich:s,offset:ps(s,i,a)}}var ob=`sentence-focus`,sb=`sentence-mark`,cb=`sentence-dimmed`;function lb(){return typeof CSS<`u`&&`highlights`in CSS&&typeof Highlight==`function`}function ub({active:e,root:t,decide:n,onBlank:r,onMove:i}){let a=(0,B.useRef)({decide:n,onBlank:r,onMove:i});return a.current={decide:n,onBlank:r,onMove:i},(0,B.useEffect)(()=>{let n=t.current;if(!e||!n)return;if(!lb()){console.info(`逐句聚焦需要 CSS Custom Highlight API，這個瀏覽器不支援，功能未啟用。`);return}let r=null,i=!1,o=()=>{if(!r)return;let e=tb(r.rich,r.span);CSS.highlights.set(ob,new Highlight(e)),i?CSS.highlights.set(sb,new Highlight(e)):CSS.highlights.delete(sb),n.classList.add(cb),(e.startContainer.parentElement??r.rich).scrollIntoView({block:`nearest`,inline:`nearest`}),a.current.onMove?.({rich:r.rich,start:r.span.start,end:r.span.end})},s=()=>{let e=!!r;r=null,i=!1,CSS.highlights.delete(ob),CSS.highlights.delete(sb),n.classList.remove(cb),e&&a.current.onMove?.(null)},c=(e,t)=>{let n=Zy(eb(e));t.end<=t.start||((r?.rich!==e||r.span.start!==t.start||r.span.end!==t.end)&&(i=!1),r={rich:e,sentences:n,index:Math.max(0,Qy(n,t.start)),span:t},o())},l=(e,t)=>{let n=Zy(eb(e));t<0||t>=n.length||c(e,n[t])},u=e=>e.defaultPrevented||!!e.target?.closest?.(`button, a, [role="button"]`),d=e=>{if(u(e))return;let t=ab(n,e.clientX,e.clientY);if(!t){s(),a.current.onBlank?.();return}let r=a.current.decide?.(t.rich,t.offset,e.target,e)??{kind:`sentence`};if(r.kind===`stop`)return s();if(r.kind===`range`)return c(t.rich,{start:r.start,end:r.end});let i=Qy(Zy(eb(t.rich)),t.offset);if(i<0)return s();l(t.rich,i)},f=e=>{if(u(e))return;let t=ab(n,e.clientX,e.clientY);!t||!r||t.rich!==r.rich||t.offset<r.span.start||t.offset>r.span.end||(i=!i,o(),document.getSelection()?.removeAllRanges())},p=e=>{if(!r)return;let t=ib(n),i=t.indexOf(r.rich);if(i<0)return s();let a=$y(t.map(e=>Zy(eb(e)).length),{para:i,index:r.index},e);a&&l(t[a.para],a.index)},m=e=>{if(!r)return;if(e.key===`Escape`){s(),a.current.onBlank?.(),e.stopPropagation();return}let t=!!n.querySelector(`[data-vertical]`),i=t?`ArrowDown`:`ArrowRight`,o=t?`ArrowUp`:`ArrowLeft`;(e.key===i||e.key===o)&&(e.preventDefault(),e.stopPropagation(),p(e.key===i?1:-1))},h=new MutationObserver(()=>{r&&!r.rich.isConnected&&s()});return h.observe(n,{childList:!0,subtree:!0}),n.addEventListener(`click`,d),n.addEventListener(`dblclick`,f),document.addEventListener(`keydown`,m,!0),()=>{h.disconnect(),n.removeEventListener(`click`,d),n.removeEventListener(`dblclick`,f),document.removeEventListener(`keydown`,m,!0),s()}},[e,t]),null}var db=(e,t)=>{for(let n of e.columns)for(let e of n.blocks)if(e.type===`text`&&e.role===t){let t=Ni(e).trim();if(t)return t}return null};function fb(e){let t=new Set,n=[];for(let r of e.items)for(let e of r.row.columns)for(let r of e.blocks)Ji(r).length===0||t.has(r.id)||(t.add(r.id),n.push(r));return n}function pb(e,t,n){let r=new Map;t.forEach(e=>e.items.forEach(t=>r.has(t.row.id)||r.set(t.row.id,e.index)));let i=t[n]?.items[0]?.row.id,a=e.rows.findIndex(e=>e.id===i);if(a<0)return{};let o=-1,s=-1;for(let t=a;t>=0;t--)if(s<0&&db(e.rows[t],`sectionTitle`)&&(s=t),db(e.rows[t],`lessonTitle`)){o=t;break}s<o&&(s=-1);let c=(t,n)=>{let i=[];for(let a=t;a<e.rows.length;a++){let o=e.rows[a];if(a>t&&n(o))break;for(let e of o.columns)for(let t of e.blocks)Ji(t).length>0&&i.push({block:t,page:r.get(o.id)??0,rowId:o.id})}return i},l=e=>!!db(e,`lessonTitle`),u={};return o>=0&&(u.chapter={kind:`chapter`,title:db(e.rows[o],`lessonTitle`),entries:c(o,l)}),s>=0&&(u.section={kind:`section`,title:db(e.rows[s],`sectionTitle`),entries:c(s,e=>l(e)||!!db(e,`sectionTitle`))}),u}function mb(e,t){if(e.type===`text`){let n=Ni(e).trim();return n?n.length>t?`${n.slice(0,t)}…`:n:`空白文字`}if(e.type===`image`)return`圖：${e.caption.trim()||e.alt.trim()||`未命名`}`;let n=Xn[e.type].label;return e.label?`${n}：${e.label}`:n}var hb=[`text`,`image`,`video`,`audio`,`web`,`jump`],gb=e=>e===`rich`?`text`:e;function _b({doc:e,pages:t,current:n,open:r,onClose:i,onOpen:a,onGoRow:o}){let[s,c]=(0,B.useState)(`page`),[l,u]=(0,B.useState)(`text`);(0,B.useEffect)(()=>{r&&c(`page`)},[r]);let d=e.settings.writingMode===`vertical`,f=t[n],p=(0,B.useMemo)(()=>pb(e,t,n),[e,t,n]),m=(0,B.useMemo)(()=>f?fb(f):[],[f]),h=(0,B.useMemo)(()=>Qo(e.rows),[e.rows]),g=yb(r),_=s===`page`?null:p[s]??null,v=_?s:`page`,y=(_?.entries??[]).flatMap(e=>Ji(e.block).map(t=>({...e,item:t}))),b=hb.filter(e=>y.some(t=>gb(t.item.kind)===e)),x=b.includes(l)?l:b[0],S=[...p.chapter?[{value:`chapter`,label:`本章：${p.chapter.title}`}]:[],...p.section?[{value:`section`,label:`本節：${p.section.title}`}]:[],{value:`page`,label:`第 ${n+1} 頁`}],C=(e,t,n)=>(0,H.jsx)(bb,{item:t,icon:n,playing:g.playing===t.id,progress:g.playing===t.id?g.progress:0,onOpen:()=>t.kind===`audio`?g.toggle(t):a(e,t)},t.id);return r?(0,pi.createPortal)((0,H.jsxs)(Eb,{id:`supplement-panel`,role:`dialog`,"aria-label":`補充資源`,$side:d?`left`:`right`,children:[(0,H.jsxs)(fc,{children:[(0,H.jsx)(pc,{children:`補充資源`}),(0,H.jsx)(mc,{type:`button`,onClick:i,"aria-label":`關閉`,title:`關閉`,children:(0,H.jsx)(U,{name:`x`,size:24,label:`關閉`})})]}),(0,H.jsx)(Db,{children:S.length>1?(0,H.jsx)(a_,{variant:`tool`,"aria-label":`範圍`,value:v,options:S,onChange:e=>c(e)}):(0,H.jsx)(Ob,{children:S[S.length-1].label})}),v!==`page`&&b.length>0&&(0,H.jsx)(kb,{role:`tablist`,"aria-label":`資源類別`,$few:b.length<4,children:b.map(e=>(0,H.jsx)(_c,{type:`button`,role:`tab`,"aria-selected":e===x,$on:e===x,onClick:()=>u(e),children:Bi[e].label},e))}),(0,H.jsx)(Ab,{children:v===`page`?m.length===0?(0,H.jsx)(Sb,{title:`這一頁沒有補充資源`,action:p.section||p.chapter?{label:p.section?`看本節的資源`:`看本章的資源`,onClick:()=>c(p.section?`section`:`chapter`)}:void 0}):m.map(e=>{let t=h.get(e.id);return(0,H.jsxs)(jb,{children:[(0,H.jsxs)(Mb,{children:[t&&(0,H.jsx)(Nb,{children:ts(t.no,d)}),(0,H.jsx)(`span`,{children:mb(e,t?8:16)})]}),(0,H.jsx)(Pb,{children:Ji(e).map(t=>C(e,t,!0))})]},e.id)}):y.length===0?(0,H.jsx)(Sb,{title:v===`section`?`這一節沒有補充資源`:`這一章沒有補充資源`}):vb(y.filter(e=>gb(e.item.kind)===x)).map(([e,t])=>{let r=e===n;return(0,H.jsxs)(jb,{children:[(0,H.jsxs)(Ub,{type:`button`,$here:r,onClick:()=>o(t[0].rowId),"aria-current":r?`page`:void 0,title:r?`就在這一頁`:`翻到第 ${e+1} 頁`,children:[`第 `,e+1,` 頁`,r?`・目前這頁`:(0,H.jsx)(U,{name:`arrow-right`,size:16})]}),(0,H.jsx)(Pb,{children:t.map(e=>C(e.block,e.item,!1))})]},e)})},`${v}-${v===`page`?n:x}`)]}),document.body):null}function vb(e){let t=new Map;for(let n of e)t.set(n.page,[...t.get(n.page)??[],n]);return[...t.entries()].sort((e,t)=>e[0]-t[0])}function yb(e){let t=(0,B.useRef)(null),[n,r]=(0,B.useState)(null),[i,a]=(0,B.useState)(0),o=()=>{t.current?.pause(),t.current=null,r(null),a(0)};return(0,B.useEffect)(()=>{e||o()},[e]),(0,B.useEffect)(()=>()=>t.current?.pause(),[]),{playing:n,progress:i,toggle:e=>{if(n===e.id)return o();t.current?.pause();let i=new Audio(ja(e.assetId));i.ontimeupdate=()=>a(i.duration?i.currentTime/i.duration:0),i.onended=o,t.current=i,a(0),r(e.id),i.play().catch(()=>{})}}}function bb({item:e,icon:t,playing:n,progress:r,onOpen:i}){let a=qi(e)||e.kind===`audio`&&e.assetId&&Aa(e.assetId)?.name||``,o=e.kind===`image`||e.kind===`video`?(0,H.jsx)(xb,{item:e}):e.kind===`audio`?(0,H.jsxs)(Bb,{$on:n,"aria-hidden":!0,children:[n&&(0,H.jsx)(Vb,{viewBox:`0 0 36 36`,children:(0,H.jsx)(`circle`,{cx:`18`,cy:`18`,r:`17`,pathLength:1,strokeDasharray:`${r} 1`})}),(0,H.jsx)(U,{name:n?`pause`:`play`,size:16})]}):t?(0,H.jsx)(Lb,{children:(0,H.jsx)(U,{name:Bi[e.kind].icon,size:20})}):null;return(0,H.jsxs)(Fb,{type:`button`,onClick:i,$lead:!!o,"aria-label":e.kind===`audio`?`${n?`暫停`:`播放`} ${a}`:void 0,children:[o,(0,H.jsx)(Hb,{children:a})]})}function xb({item:e}){let t=null;if(e.kind===`image`){let n=ja(e.assetId);n&&(t=(0,H.jsx)(`img`,{src:n,alt:``}))}else{let n=e.source===`youtube`?Ua(e.ref):null,r=n?null:ja(e.ref);n?t=(0,H.jsx)(`img`,{src:`https://img.youtube.com/vi/${n}/mqdefault.jpg`,alt:``}):r&&(t=(0,H.jsx)(`video`,{src:`${r}#t=0.1`,muted:!0,preload:`metadata`,playsInline:!0}))}return(0,H.jsxs)(Rb,{children:[t??(0,H.jsx)(U,{name:Bi[e.kind].icon,size:20}),e.kind===`video`&&t&&(0,H.jsx)(zb,{children:(0,H.jsx)(U,{name:`play`,size:16})})]})}function Sb({title:e,action:t}){return(0,H.jsxs)(Wb,{children:[(0,H.jsx)(`strong`,{children:e}),t&&(0,H.jsxs)(Gb,{type:`button`,onClick:t.onClick,children:[t.label,(0,H.jsx)(U,{name:`blocks`,size:16})]})]})}var Cb=e=>Un`
  from { opacity: 0; transform: translateX(${e}px); }
  to { opacity: 1; transform: none; }
`,wb=Un`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
`,Tb=`cubic-bezier(0.2, 0.8, 0.2, 1)`,Eb=V(dc)`
  z-index: 940;
  /* 跟頁面卡片上下切齊（閱讀畫面四周留 12）；靠左時貼著左欄，跟工具箱、目次同一個位置 */
  top: 12px;
  bottom: 12px;
  right: 12px;
  ${e=>e.$side===`left`&&`right: auto; left: var(--reader-rail, 104px);`}
  animation: ${e=>Cb(e.$side===`left`?-16:16)} 0.22s ${Tb};
  @media (prefers-reduced-motion: reduce) { animation: none; }
`,Db=V.div`
  display: flex;
  padding: 2px 20px 0 8px;
  flex-shrink: 0;
`,Ob=V.span`
  padding: 6px 12px;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,kb=V(gc)`
  ${e=>e.$few&&`justify-content: flex-start; gap: 24px;`}
`,Ab=V(hc)`
  padding-top: ${e=>e.theme.space.insetSm};
  gap: ${e=>e.theme.space.stackMd};
  animation: ${wb} 0.18s ${Tb};
  @media (prefers-reduced-motion: reduce) { animation: none; }
`,jb=V.section`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
`,Mb=V.h3`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  min-inline-size: 0;
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  color: ${e=>e.theme.text.tertiary};

  & > span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,Nb=V.span`
  flex: none;
  display: inline-grid;
  place-items: center;
  box-sizing: border-box;
  min-inline-size: 18px;
  block-size: 18px;
  padding: 0 3px;
  border: 1.5px solid currentColor;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  color: ${e=>e.theme.text.secondary};
`,Pb=V.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.raised};
`,Fb=V.button`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapMd};
  /* 上課用平板點的，觸控目標不能小於 44 */
  min-block-size: 44px;
  padding: 4px 12px;
  ${e=>e.$lead&&`padding-inline-start: 4px;`}
  border: none;
  border-radius: 10px;
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
  transition: background 0.12s;
  &:hover { background: ${e=>e.theme.surface.sunken}; }
  &:active { background: ${e=>e.theme.surface.muted}; }
  &:hover img, &:hover video { transform: scale(1.06); }
`,Ib=In`
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  block-size: 36px;
  border-radius: 10px;
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.icon.default};
`,Lb=V.span`
  ${Ib}
  inline-size: 36px;
  transition: background 0.12s;
  /* 滑過時整列變灰，圖示格也是灰的就糊成一塊：圖示格改成白底，跟著那一列浮出來 */
  ${Fb}:hover & { background: ${e=>e.theme.surface.raised}; }
  ${Fb}:active & { background: ${e=>e.theme.surface.raised}; }
`,Rb=V.span`
  ${Ib}
  inline-size: 58px;
  overflow: hidden;
  color: ${e=>e.theme.icon.secondary};
  img,
  video {
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    /* 直式的畫像從上面裁，留住人物的臉（跟媒體庫的縮圖一樣） */
    object-position: top;
    pointer-events: none;
    transition: transform 0.2s ${Tb};
  }
`,zb=V.span`
  position: absolute;
  display: grid;
  place-items: center;
  inline-size: 22px;
  block-size: 22px;
  border-radius: 999px;
  background: ${e=>e.theme.surface.inverse};
  color: ${e=>e.theme.text.onInverse};
  opacity: 0.8;
  svg { inline-size: 12px; block-size: 12px; }
`,Bb=V.span`
  ${Ib}
  inline-size: 36px;
  border-radius: 999px;
  background: ${e=>e.$on?e.theme.surface.raised:e.theme.surface.sunken};
  box-shadow: ${e=>e.$on?e.theme.shadow.card:`none`};
  transition: background 0.15s, box-shadow 0.15s;
`,Vb=V.svg`
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  transform: rotate(-90deg);
  pointer-events: none;
  circle {
    fill: none;
    stroke: ${e=>e.theme.brand.accentOnLight};
    stroke-width: 2;
    transition: stroke-dasharray 0.25s linear;
  }
`,Hb=V.span`
  flex: 1;
  min-inline-size: 0;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  line-height: 20px;
  color: ${e=>e.theme.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Ub=V.button`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-inline-start: -6px;
  padding: 2px 6px;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: transparent;
  font: inherit;
  font-size: var(--ds-typography-caption-size);
  font-weight: ${e=>e.$here?700:500};
  font-variant-numeric: tabular-nums;
  color: ${e=>e.$here?e.theme.brand.accentOnLight:e.theme.text.tertiary};
  cursor: ${e=>e.$here?`default`:`pointer`};
  transition: background 0.12s, color 0.12s;
  svg { transition: transform 0.15s ${Tb}; }
  &:hover {
    ${e=>!e.$here&&`background: ${e.theme.surface.muted}; color: ${e.theme.text.primary};`}
    svg { transform: translateX(2px); }
  }
`,Wb=V.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  padding: 32px ${e=>e.theme.space.insetMd};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.raised};
  text-align: center;

  strong {
    font-size: var(--ds-typography-body-sm-size);
    font-weight: 500;
    color: ${e=>e.theme.text.secondary};
  }
`,Gb=V.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-block-start: 4px;
  padding: 6px 14px;
  border: none;
  border-radius: 999px;
  background: ${e=>e.theme.surface.sunken};
  font: inherit;
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  color: ${e=>e.theme.text.primary};
  cursor: pointer;
  &:hover { background: ${e=>e.theme.surface.muted}; }
`,Kb={pen:2.5,highlighter:16},qb=1.2;function Jb(e,t){return`ds-reader:ink:${e}:${t}`}function Yb(e){try{let t=localStorage.getItem(e);if(!t)return[];let n=JSON.parse(t);return Array.isArray(n)?n:[]}catch{return[]}}function Xb(e,t){try{t.length===0?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}catch{}}function Zb(e,t){let n=e[e.length-1];return n&&Math.hypot(t[0]-n[0],t[1]-n[1])<qb?e:[...e,t]}function Qb(e){if(e.length===0)return``;let[t,n]=e[0];if(e.length===1)return`M${t} ${n} L${t+.01} ${n}`;let r=`M${t} ${n}`;for(let t=1;t<e.length;t+=1)r+=` L${e[t][0]} ${e[t][1]}`;return r}function $b(e,t,n){let r=n[0]-t[0],i=n[1]-t[1],a=r*r+i*i;if(a===0)return Math.hypot(e[0]-t[0],e[1]-t[1]);let o=((e[0]-t[0])*r+(e[1]-t[1])*i)/a;return o=Math.max(0,Math.min(1,o)),Math.hypot(e[0]-(t[0]+o*r),e[1]-(t[1]+o*i))}function ex(e,t,n=8){let r=new Set;for(let i of e){let e=n+Kb[i.tool]/2;if(i.points.length===1){Math.hypot(t[0]-i.points[0][0],t[1]-i.points[0][1])<=e&&r.add(i.id);continue}for(let n=1;n<i.points.length;n+=1)if($b(t,i.points[n-1],i.points[n])<=e){r.add(i.id);break}}return r}var tx=50,nx=()=>({past:[],future:[]});function rx(e,t){let n=[...e.past,t];return n.length>tx&&n.shift(),{past:n,future:[]}}function ix(e,t){let n=e.past[e.past.length-1];return n?{history:{past:e.past.slice(0,-1),future:[...e.future,t]},strokes:n}:null}function ax(e,t){let n=e.future[e.future.length-1];return n?{history:{past:[...e.past,t],future:e.future.slice(0,-1)},strokes:n}:null}function ox({ink:e,tool:t,pageWidth:n,pageHeight:r,scale:i}){let a=(0,B.useRef)(null),o=(0,B.useRef)(null),s=t!==null,c=e=>{let t=a.current.getBoundingClientRect();return[(e.clientX-t.left)/i,(e.clientY-t.top)/i]};return(0,B.useEffect)(()=>{let e=a.current;if(!e||!s)return;let t=e=>e.stopPropagation();return e.addEventListener(`click`,t),e.addEventListener(`dblclick`,t),()=>{e.removeEventListener(`click`,t),e.removeEventListener(`dblclick`,t)}},[s]),(0,H.jsxs)(cx,{ref:a,"data-ink-layer":!0,$active:s,$tool:t,viewBox:`0 0 ${n} ${r}`,preserveAspectRatio:`none`,"aria-hidden":!0,onPointerDown:n=>{if(!t||n.button!==0)return;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}o.current=n.pointerId;let r=c(n);t===`eraser`?e.beginErase(r):e.beginStroke(t,r)},onPointerMove:n=>{if(!t||o.current!==n.pointerId)return;let r=c(n);t===`eraser`?e.eraseAt(r):e.extendStroke(e=>Zb(e,r))},onPointerUp:n=>{!t||o.current!==n.pointerId||(o.current=null,n.currentTarget.hasPointerCapture(n.pointerId)&&n.currentTarget.releasePointerCapture(n.pointerId),t===`eraser`?e.endErase():e.endStroke())},onPointerCancel:()=>{o.current=null,t===`eraser`?e.endErase():e.cancelStroke()},onContextMenu:e=>s&&e.preventDefault(),children:[e.strokes.map(e=>(0,H.jsx)(sx,{stroke:e},e.id)),e.draft&&(0,H.jsx)(sx,{stroke:e.draft})]})}function sx({stroke:e}){return(0,H.jsx)(lx,{$tool:e.tool,d:Qb(e.points),strokeWidth:Kb[e.tool]})}var cx=V.svg`
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  overflow: visible;
  /* 在補充角標（z 3）之上，拿著筆時才接事件 */
  z-index: 4;
  pointer-events: ${e=>e.$active?`auto`:`none`};
  touch-action: ${e=>e.$active?`none`:`auto`};
  cursor: ${e=>e.$tool===`eraser`?`cell`:e.$active?`crosshair`:`default`};
  /* 螢光筆疊在字上要像真的螢光筆：用疊色讓字透出來 */
  mix-blend-mode: multiply;
`,lx=V.path`
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: ${e=>e.$tool===`highlighter`?e.theme.brand.primary:e.theme.text.primary};
  opacity: ${e=>e.$tool===`highlighter`?.85:1};
`;function ux(e){let t=e.replace(/^#\/?/,``).split(`/`).filter(Boolean).map(decodeURIComponent);if(t[0]===`edit`&&t[1])return{page:`edit`,id:t[1]};if(t[0]===`read`&&t[1]===`book`&&t[2])return{page:`readTextbook`,id:t[2]};if(t[0]===`read`&&t[1])return{page:`read`,id:t[1]};let n=t[0]===`shelf`?t[1]:void 0;return!n||![`textbook`,`shared`,`mine`].includes(n)?{page:`shelf`,tab:void 0}:t[2]?{page:`shelf`,tab:n,subject:t[2]}:{page:`shelf`,tab:n}}var dx=e=>(window.addEventListener(`hashchange`,e),()=>window.removeEventListener(`hashchange`,e));function fx(){return ux((0,B.useSyncExternalStore)(dx,()=>window.location.hash))}var px=e=>{window.location.hash=e},mx=(e=`mine`,t)=>px(`#/shelf/${e}${t?`/${encodeURIComponent(t)}`:``}`),hx=e=>px(`#/edit/${encodeURIComponent(e)}`),gx=e=>px(`#/read/${encodeURIComponent(e)}`),_x=e=>px(`#/read/book/${encodeURIComponent(e)}`),vx=`#F0FF62`,yx=`M 11.2 3.0 C 12.66 2.81, 14.21 2.81, 15.72 3.0 C 17.23 3.19, 18.73 3.38, 20.24 4.13 C 21.75 4.88, 23.54 6.2, 24.76 7.52 C 25.99 8.84, 26.98 10.53, 27.59 12.04 C 28.2 13.55, 28.62 15.02, 28.43 16.57 C 28.24 18.12, 27.4 19.82, 26.46 21.37 C 25.52 22.92, 24.15 24.62, 22.78 25.89 C 21.41 27.16, 19.77 28.58, 18.26 29.0 C 16.75 29.42, 15.25 28.85, 13.74 28.43 C 12.23 28.01, 10.73 27.5, 9.22 26.46 C 7.71 25.43, 5.64 23.68, 4.7 22.22 C 3.76 20.76, 3.71 19.21, 3.57 17.7 C 3.43 16.19, 3.71 14.72, 3.85 13.17 C 3.99 11.62, 3.89 9.88, 4.41 8.37 C 4.93 6.86, 5.83 5.02, 6.96 4.13 C 8.09 3.23, 9.74 3.19, 11.2 3.0 Z`,bx={chinese:[`國語`,`國文`,`國語文`],english:[`英語`,`英文`,`英語文`],science:[`自然`,`自然科學`],social:[`社會`,`歷史`,`地理`],math:[`數學`]};function xx(e){return e?Object.keys(bx).find(t=>bx[t].includes(e))??`other`:`other`}var Sx={other:{d:yx,w:32,h:32,light:vx,dark:vx},chinese:{d:`M72.05 77.02C50.63 73.57 26.63 72.79 0 74.69L6.88 0L74.61 0L72.05 77.02Z`,w:74.61,h:77.02,light:`#FFC2A5`,dark:`#FF854A`},english:{d:`M20.02 0.0032267C29.02 0.143227 45.63 9.14323 52.58 16.8832C59.07 23.7732 75.62 30.8532 74.9501 39.9932C74.16 47.4732 56.88 59.5232 46.69 64.0832C37.89 68.5932 27.63 74.5432 22.27 72.5632C14.79 70.7032 5.59005 64.4832 1.55005 53.4332C-0.499952 44.8232 -0.959953 27.0832 2.94005 15.5632C5.13005 8.94323 12.67 -0.196773 20.02 0.0032267Z`,w:74.97,h:72.95,light:`#FCDD9D`,dark:`#F3C11B`},science:{d:`M36.2 0L69.89 12.18L85.32 42.7L67.64 65.74L46.26 80.76L18.93 75.47L0 52.1L9.6 13.77L36.2 0Z`,w:85.32,h:80.76,light:`#66E497`,dark:`#00A36E`},social:{d:`M7.94 60.9C6.13 54.77 3.48 45.25 0 32.37C13.54 19.83 22.73 9.04 27.53 0C38.08 7.32 52.53 10.72 70.89 10.19C71.55 21.14 70.75 34.42 68.5 50.05L42.03 71.5C27.6 67.26 16.24 63.72 7.94 60.9Z`,w:71.11,h:71.5,light:`#CEA8FF`,dark:`#7F6CDF`},math:{d:`M0 29.72L67.64 0L87.9 55.54L41.96 97.11L0 29.72Z`,w:87.9,h:97.11,light:`#82E6F8`,dark:`#03C5E9`}};function Cx(e){if(e.w===32&&e.h===32)return``;let t=26/Math.max(e.w,e.h);return`translate(${(32-e.w*t)/2} ${(32-e.h*t)/2}) scale(${t})`}function wx({shape:e}){let t=Sx[e],n=26/Math.max(t.w,t.h);return(0,H.jsxs)(`g`,{transform:Cx(t)||void 0,children:[(0,H.jsx)(`path`,{className:`halo`,d:t.d,fill:`none`,strokeWidth:Cx(t)?4/n:4,strokeLinejoin:`round`}),(0,H.jsx)(`path`,{d:t.d,fill:t.light})]})}function Tx({subject:e,onClick:t,title:n,large:r}){let i=n??`回首頁`,a=r?56:40;return(0,H.jsx)(Ex,{type:`button`,title:i,"aria-label":i,$large:!!r,onClick:t??(()=>mx(window.location.hash.startsWith(`#/read/book/`)?`textbook`:`mine`)),children:(0,H.jsx)(`svg`,{width:a,height:a,viewBox:`0 0 32 32`,"aria-hidden":`true`,focusable:`false`,children:(0,H.jsx)(wx,{shape:xx(e)})})})}var Ex=V.button`
  flex: none;
  width: ${e=>e.$large?e.theme.control.tileMd:e.theme.control.heightMd};
  height: ${e=>e.$large?e.theme.control.tileMd:e.theme.control.heightMd};
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: transparent;
  cursor: pointer;
  transition: transform 0.15s ease-out, background 0.12s;

  svg { overflow: visible; transition: transform 0.15s ease-out; }
  .halo { stroke: transparent; transition: stroke 0.12s; }

  &:hover,
  &:focus-visible {
    outline: none;
    .halo { stroke: ${e=>e.theme.surface.muted}; }
    svg { transform: scale(1.12) rotate(-10deg); }
  }
  &:active svg { transform: scale(0.96); }
`;function Dx({subject:e,size:t=24}){let n=Sx[xx(e)];return(0,H.jsx)(`svg`,{width:t,height:t,viewBox:`0 0 32 32`,"aria-hidden":`true`,focusable:`false`,children:(0,H.jsx)(`g`,{transform:Cx(n)||void 0,children:(0,H.jsx)(`path`,{d:n.d,fill:n.dark})})})}var Ox=[`pen`,`highlighter`,`eraser`,`clear`],kx=[`exit`,`supplements`],Ax=[...Ox,...kx],jx={pen:{label:`畫筆`,icon:`pencil`},highlighter:{label:`螢光筆`,icon:`highlighter`},eraser:{label:`橡皮擦`,icon:`eraser`},clear:{label:`清除`,icon:`trash`},exit:{label:`返回編輯`,icon:`arrow-left`},supplements:{label:`補充資源`,icon:`blocks`}},Mx=[{title:`系統工具`,items:[{id:`settings`,label:`設定`,icon:`settings`},{id:`exit`,label:`返回編輯`,icon:`arrow-left`,rail:`exit`},{id:`supplements`,label:`補充資源`,icon:`blocks`,rail:`supplements`}]},{title:`編輯工具`,items:[{id:`pen`,label:`畫筆`,icon:`pencil`,rail:`pen`},{id:`highlighter`,label:`螢光筆`,icon:`highlighter`,rail:`highlighter`},{id:`eraser`,label:`橡皮擦`,icon:`eraser`,rail:`eraser`},{id:`clear`,label:`清除`,icon:`trash`,rail:`clear`},{id:`sticky`,label:`便利貼`,icon:`sticky-note`}]},{title:`教學工具`,items:[{id:`board`,label:`白板`,icon:`presentation`},{id:`sticker`,label:`貼紙`,icon:`sticker`}]},{title:`科目工具`,items:[{id:`quiz`,label:`考數院`,icon:`list-checks`},{id:`explore`,label:`探索`,icon:`compass`},{id:`orbit`,label:`星際巡航`,icon:`orbit`},{id:`ruler`,label:`直尺`,icon:`diff`},{id:`compass`,label:`圓規`,icon:`diff`},{id:`protractor`,label:`量角器`,icon:`diff`},{id:`interactive`,label:`互動學習`,icon:`diff`}]}],Nx=`ds-reader:rail`;function Px(){try{let e=localStorage.getItem(Nx);if(!e)return Ax;let t=JSON.parse(e),n=Array.isArray(t)?[...t,...kx]:t&&typeof t==`object`&&Array.isArray(t.list)?t.list:null;return n?Ax.filter(e=>n.includes(e)):Ax}catch{return Ax}}function Fx(e){try{localStorage.setItem(Nx,JSON.stringify({v:2,list:e}))}catch{}}function Ix({subject:e,onExit:t,exitLabel:n=jx.exit.label,supplementCount:r,supplementOpen:i,onSupplements:a,pageNumber:o,pageCount:s,onPrevPage:c,onNextPage:l,onGoPage:u,toolboxOpen:d,onToolbox:f,pinned:p,onUnpin:m,tool:h,onTool:g,onClear:_,canClear:v,undo:y,redo:b,canUndo:x,canRedo:S,settingsOpen:C,onSettings:w}){return(0,H.jsxs)(Rx,{"aria-label":`閱讀工具`,children:[(0,H.jsx)(Tx,{subject:e,large:!0}),(0,H.jsxs)(zx,{title:`第 ${o} 頁，共 ${s} 頁`,children:[c&&(0,H.jsx)(Vx,{type:`button`,onClick:c,disabled:o<=1,"aria-label":`上一頁`,title:`上一頁`,children:(0,H.jsx)(U,{name:`chevron-up`,size:16})}),(0,H.jsx)(Bx,{defaultValue:o,inputMode:`numeric`,"aria-label":`第 ${o} 頁，共 ${s} 頁，輸入頁碼跳頁`,onFocus:e=>e.currentTarget.select(),onKeyDown:e=>{e.key===`Enter`&&e.currentTarget.blur(),e.key===`Escape`&&(e.currentTarget.value=String(o),e.currentTarget.blur())},onBlur:e=>{let t=parseInt(e.currentTarget.value.replace(/[^0-9]/g,``),10);if(!Number.isFinite(t)){e.currentTarget.value=String(o);return}let n=Math.min(Math.max(t,1),s);e.currentTarget.value=String(n),n!==o&&u?.(n)}},o),l&&(0,H.jsx)(Vx,{type:`button`,onClick:l,disabled:o>=s,"aria-label":`下一頁`,title:`下一頁`,children:(0,H.jsx)(U,{name:`chevron-down`,size:16})})]}),p.filter(e=>Ox.includes(e)).map(e=>{let t=jx[e],n=e===`clear`;return(0,H.jsxs)(Gx,{children:[(0,H.jsxs)(Hx,{type:`button`,$active:!n&&h===e,$editing:d,tabIndex:d?-1:void 0,"aria-disabled":d||void 0,"aria-pressed":n?void 0:h===e,disabled:n&&!v,title:n?`清掉這一頁的筆跡`:t.label,onClick:()=>{if(n)return _();g(h===e?null:e)},children:[(0,H.jsx)(U,{name:t.icon,size:20}),(0,H.jsx)(`span`,{children:t.label})]}),d&&(0,H.jsx)(Lx,{tool:e,onUnpin:m})]},e)}),(0,H.jsxs)(Hx,{type:`button`,title:`復原筆跡`,disabled:!x,onClick:y,children:[(0,H.jsx)(U,{name:`corner-up-left`,size:20}),(0,H.jsx)(`span`,{children:`復原`})]}),(0,H.jsxs)(Hx,{type:`button`,title:`取消復原筆跡`,disabled:!S,onClick:b,children:[(0,H.jsx)(U,{name:`corner-up-right`,size:20}),(0,H.jsx)(`span`,{children:`取消復原`})]}),(0,H.jsx)(Ux,{}),t&&p.includes(`exit`)&&(0,H.jsxs)(Gx,{children:[(0,H.jsxs)(Hx,{type:`button`,$editing:d,tabIndex:d?-1:void 0,"aria-disabled":d||void 0,onClick:t,title:n,children:[(0,H.jsx)(U,{name:jx.exit.icon,size:20}),(0,H.jsx)(`span`,{children:n})]}),d&&(0,H.jsx)(Lx,{tool:`exit`,onUnpin:m})]}),(0,H.jsxs)(Hx,{type:`button`,$active:d,"aria-expanded":d,"aria-controls":`reader-toolbox`,onClick:f,children:[(0,H.jsx)(U,{name:`archive`,size:20}),(0,H.jsx)(`span`,{children:`工具箱`})]}),p.includes(`supplements`)&&(0,H.jsxs)(Gx,{children:[(0,H.jsxs)(Hx,{type:`button`,$boxed:r>0&&!d,$editing:d,tabIndex:d?-1:void 0,"aria-disabled":d||void 0,$active:i&&!d,"aria-expanded":i,onClick:a,title:`這一頁的補充資源`,children:[(0,H.jsx)(U,{name:jx.supplements.icon,size:20}),(0,H.jsx)(`span`,{children:jx.supplements.label})]}),d?(0,H.jsx)(Lx,{tool:`supplements`,onUnpin:m}):r>0&&(0,H.jsx)(Kx,{"aria-label":`${r} 項`,children:r})]}),(0,H.jsx)(Wx,{children:(0,H.jsxs)(Hx,{type:`button`,$active:C,"aria-expanded":C,"aria-controls":`reader-settings`,onClick:w,title:`閱讀設定`,children:[(0,H.jsx)(U,{name:`settings`,size:20}),(0,H.jsx)(`span`,{children:`設定`})]})})]})}function Lx({tool:e,onUnpin:t}){let{label:n}=jx[e];return(0,H.jsx)(qx,{type:`button`,title:`把「${n}」收回工具箱`,onClick:()=>t(e),children:(0,H.jsx)(U,{name:`x`,size:16,label:`收回${n}`})})}var Rx=V.nav`
  flex: none;
  inline-size: var(--reader-rail, 104px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.gapXs};
  padding: ${e=>e.theme.space.insetSm} 0;
  /* 透明：工具直接放在閱讀畫面的淡灰底上 */
  background: transparent;
  overflow: hidden auto;
  scrollbar-width: none;
`,zx=V.div`
  inline-size: var(--reader-tile-w, 56px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block: 4px;
  padding: 4px 0;
  /* 膠囊：上下兩端整個圓起來 */
  border-radius: 999px;
  /* 灰底上用白色膠囊，跟「補充資源」一樣是最常按的，要一眼找得到 */
  background: ${e=>e.theme.surface.raised};
`,Bx=V.input`
  box-sizing: border-box;
  inline-size: 40px;
  margin-block: 2px;
  padding: 2px 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  font-family: ${e=>e.theme.typography.fontDisplay};
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  font-variant-numeric: tabular-nums;
  color: ${e=>e.theme.text.primary};
  cursor: text;
  &:hover { background: ${e=>e.theme.surface.sunken}; }
  &:focus { outline: none; background: ${e=>e.theme.surface.sunken}; }
`,Vx=V.button`
  position: relative;
  inline-size: 24px;
  block-size: 24px;
  &::after {
    content: '';
    position: absolute;
    inset-inline: -16px;
  }
  &:first-child::after { top: -12px; bottom: -2px; }
  &:last-child::after { top: -2px; bottom: -12px; }
  display: grid;
  place-items: center;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
  transition: background 0.12s;

  /* 膠囊是白的，滑過的小圓用淡灰 */
  &:hover:not(:disabled) { background: ${e=>e.theme.surface.sunken}; }
  &:disabled {
    color: ${e=>e.theme.icon.disabled};
    cursor: default;
  }
`,Hx=V.button`
  /* 尺寸跟著螢幕走（ReaderMode 的 ReaderVars） */
  inline-size: var(--reader-tile-w, 56px);
  block-size: var(--reader-tile-h, 56px);
  flex: none;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0;
  border-radius: ${e=>e.theme.radius.tile};
  /* 使用中：最淡的 Lime 底加一圈深綠細框，不用整片亮黃 */
  border: ${e=>e.theme.border.widthDefault} ${e=>e.$editing?`dashed`:`solid`}
    ${e=>e.$editing?e.theme.border.editing:e.$active?e.theme.border.accent:e.$boxed?e.theme.border.subtle:`transparent`};
  /*
   * 放在灰底上：平常透明；「補充資源」（$boxed）是白底卡片；
   * $accent 返回編輯與 $active 啟用中的工具：淡 Lime 底、深綠字
   */
  /* 使用中用最淡的 Lime（tint-subtle），整欄才不會一片亮黃；深綠字負責標出「這顆在用」 */
  background: ${e=>e.$active||e.$accent?e.theme.brand.primaryTintSubtle:e.$boxed?e.theme.surface.raised:`transparent`};
  color: ${e=>e.$active||e.$accent?e.theme.brand.accentOnLight:e.theme.text.primary};
  font-size: var(--reader-label, var(--ds-typography-label-size));
  line-height: 14px;
  white-space: nowrap;
  cursor: pointer;
  /*
   * 編輯工具箱時（虛線框）只能收回，不能拿起來用：整格不接點擊、不顯示使用中，
   * 右上角的 × 是另一顆按鈕，照樣按得到
   */
  ${e=>e.$editing&&`pointer-events: none;`}
  transition: background 0.12s, color 0.12s, box-shadow 0.12s, transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);

  svg { color: ${e=>e.$active||e.$accent?e.theme.brand.accentOnLight:e.theme.icon.default}; }

  /* 滑過：灰底上浮出一塊白（跟頁面、補充資源同色），一眼看得出指到哪一顆 */
  &:hover:not(:disabled) {
    background: ${e=>e.$active||e.$accent?e.theme.brand.primaryTintSubtle:e.theme.surface.raised};
    box-shadow: ${e=>e.$active||e.$accent?`none`:e.theme.shadow.card};
  }
  &:active:not(:disabled) { transform: scale(0.96); box-shadow: none; }
  &:focus-visible { outline: 2px solid ${e=>e.theme.border.focus}; outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) { &:active:not(:disabled) { transform: none; } }
  &:disabled {
    cursor: default;
    color: ${e=>e.theme.text.disabled};
    svg { color: ${e=>e.theme.icon.disabled}; }
  }
`,Ux=V.hr`
  inline-size: 40px;
  block-size: 0;
  margin: 4px 0;
  border: none;
  border-block-start: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
`,Wx=V.div``,Gx=V.div`
  position: relative;
`,Kx=V.span`
  position: absolute;
  inset-inline-end: -6px;
  inset-block-start: -6px;
  min-inline-size: 20px;
  block-size: 20px;
  padding: 0 5px;
  display: grid;
  place-items: center;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.inverse};
  color: ${e=>e.theme.text.onInverse};
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  /* 數字要看筆畫置中，不是看行框：英數字型的數字落在行框下半部，不裁的話會比圓心低約 4px。
     text-box 把行框裁到數字的頂（cap）與底（alphabetic），grid 置中的就是筆畫本身 */
  line-height: 1;
  text-box: trim-both cap alphabetic;
  pointer-events: none;
`,qx=V.button`
  position: absolute;
  inset-inline-end: -7px;
  inset-block-start: -7px;
  z-index: 1;
  display: grid;
  place-items: center;
  inline-size: 20px;
  block-size: 20px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${e=>e.theme.brand.accentOnLight};
  box-shadow: 0 0 0 2px ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.surface.raised};
  cursor: pointer;
  transition: background 0.12s, transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
  svg { inline-size: 12px; block-size: 12px; stroke-width: 2.5; }

  &:hover { background: ${e=>e.theme.feedback.errorDefault}; transform: scale(1.1); }
  &:active { transform: scale(0.94); }
`;function Jx({pinned:e,onTogglePin:t,onClose:n,onSettings:r}){return(0,H.jsxs)(Yx,{id:`reader-toolbox`,role:`dialog`,"aria-label":`工具箱`,children:[(0,H.jsxs)(Xx,{children:[(0,H.jsx)(`strong`,{children:`工具箱`}),(0,H.jsx)(Zx,{type:`button`,title:`關閉工具箱`,onClick:n,children:(0,H.jsx)(U,{name:`x`,size:16,label:`關閉`})})]}),Mx.map(n=>(0,H.jsxs)(Qx,{children:[(0,H.jsx)($x,{children:n.title}),(0,H.jsx)(eS,{children:n.items.map(n=>{let i=n.rail?e.includes(n.rail):!1;return(0,H.jsxs)(tS,{type:`button`,"aria-pressed":n.rail?i:void 0,title:n.rail?i?`從左欄收回「${n.label}」`:`把「${n.label}」釘到左欄`:n.id===`settings`?`閱讀設定`:`${n.label}：原型還沒做`,onClick:()=>{if(n.rail)return t(n.rail);if(n.id===`settings`)return r();Os(`${n.label}：原型還沒做`)},children:[(0,H.jsx)(U,{name:n.icon,size:24}),(0,H.jsx)(`span`,{children:n.label})]},n.id)})})]},n.title))]})}var Yx=V.aside`
  position: absolute;
  /* 緊貼左欄右側，上下跟畫布對齊 */
  inset-inline-start: var(--reader-rail, 104px);
  inset-block: ${e=>e.theme.space.insetSm};
  inline-size: 244px;
  box-sizing: border-box;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${e=>e.theme.space.insetLg} ${e=>e.theme.space.insetMd};
  border-radius: ${e=>e.theme.radius.panel};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  box-shadow: ${e=>e.theme.shadow.card};
  overflow-y: auto;
  /*
   * 不顯示捲軸：捲軸會吃掉右側寬度（格子左寬右窄），在圓角處也會被切掉。
   * 最後一組露出半截，看得出還能往下捲
   */
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`,Xx=V.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1.8px;
  color: ${e=>e.theme.text.primary};
`,Zx=V.button`
  display: grid;
  place-items: center;
  inline-size: ${e=>e.theme.control.height2xs};
  block-size: ${e=>e.theme.control.height2xs};
  padding: 0;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: transparent;
  color: ${e=>e.theme.icon.default};
  cursor: pointer;

  &:hover { background: ${e=>e.theme.surface.sunken}; }
`,Qx=V.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,$x=V.h3`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.2px;
  color: ${e=>e.theme.text.secondary};
`,eS=V.div`
  padding: 12px;
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.sunken};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`,tS=V.button`
  position: relative;
  /* 正方形，寬度跟著格線平分 */
  inline-size: 100%;
  aspect-ratio: 1;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0;
  border-radius: ${e=>e.theme.radius.tile};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.primary};
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 1px;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s, transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);

  svg { color: ${e=>e.theme.icon.default}; }

  &:hover {
    box-shadow: ${e=>e.theme.shadow.card};
    transform: translateY(-1px);
  }
  &:active {
    background: ${e=>e.theme.surface.sunken};
    box-shadow: none;
    transform: scale(0.96);
  }
  &:focus-visible {
    outline: 2px solid ${e=>e.theme.border.focus};
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover, &:active { transform: none; }
  }
`;function nS(e,t){let n=Jb(e,t),[,r]=(0,B.useReducer)(e=>e+1,0),i=(0,B.useRef)({key:n,strokes:Yb(n),draft:null});i.current.key!==n&&(i.current={key:n,strokes:Yb(n),draft:null});let a=(0,B.useRef)(new Map),o=e=>a.current.get(e)??nx(),s=e=>{i.current.strokes=e,r()},c=(0,B.useCallback)((e,t)=>{let n=i.current.key;a.current.set(n,rx(o(n),e)),Xb(n,t),s(t)},[]),l=(0,B.useCallback)((e,t)=>{i.current.draft={id:`s_${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`,tool:e,points:[t]},r()},[]),u=(0,B.useCallback)(e=>{let t=i.current.draft;if(!t)return;let n=e(t.points);n!==t.points&&(i.current.draft={...t,points:n},r())},[]),d=(0,B.useCallback)(()=>{let e=i.current.draft;e&&(i.current.draft=null,c(i.current.strokes,[...i.current.strokes,e]))},[c]),f=(0,B.useCallback)(()=>{i.current.draft=null,r()},[]),p=(0,B.useRef)(null),m=(0,B.useCallback)(e=>{if(!p.current)return;let{strokes:t}=i.current,n=ex(t,e);n.size&&s(t.filter(e=>!n.has(e.id)))},[]),h=(0,B.useCallback)(e=>{p.current=i.current.strokes,m(e)},[m]),g=(0,B.useCallback)(()=>{let e=p.current;p.current=null,!(!e||e.length===i.current.strokes.length)&&c(e,i.current.strokes)},[c]),_=(0,B.useCallback)(()=>{i.current.strokes.length!==0&&c(i.current.strokes,[])},[c]),v=(0,B.useCallback)(()=>{let e=i.current.key,t=ix(o(e),i.current.strokes);t&&(a.current.set(e,t.history),Xb(e,t.strokes),s(t.strokes))},[]),y=(0,B.useCallback)(()=>{let e=i.current.key,t=ax(o(e),i.current.strokes);t&&(a.current.set(e,t.history),Xb(e,t.strokes),s(t.strokes))},[]),b=o(n);return{strokes:i.current.strokes,draft:i.current.draft,beginStroke:l,extendStroke:u,endStroke:d,cancelStroke:f,beginErase:h,eraseAt:m,endErase:g,clear:_,undo:v,redo:y,canUndo:b.past.length>0,canRedo:b.future.length>0,hasInk:i.current.strokes.length>0}}var rS={min:16,max:40,step:2},iS={min:1.2,max:3,step:.2},aS=[[`auto`,`預設`],[`kai`,`楷體`],[`hei`,`黑體`]],oS=e=>Math.round(e*10)/10;function sS({prefs:e,onChange:t,baseSize:n,baseLineHeight:r}){let i=e.size??n,a=e.lineHeight??r,o=n=>t({...e,...n});return(0,H.jsxs)(cS,{id:`reader-settings`,role:`dialog`,"aria-label":`閱讀設定`,children:[(0,H.jsxs)(lS,{children:[(0,H.jsx)(`span`,{children:`文字大小`}),(0,H.jsxs)(dS,{children:[(0,H.jsx)(`button`,{type:`button`,"aria-label":`文字小一點`,disabled:i<=rS.min,onClick:()=>o({size:Math.max(rS.min,i-rS.step)}),children:`−`}),(0,H.jsx)(`b`,{children:i}),(0,H.jsx)(`button`,{type:`button`,"aria-label":`文字大一點`,disabled:i>=rS.max,onClick:()=>o({size:Math.min(rS.max,i+rS.step)}),children:`+`})]})]}),(0,H.jsxs)(lS,{children:[(0,H.jsx)(`span`,{children:`行距`}),(0,H.jsxs)(dS,{children:[(0,H.jsx)(`button`,{type:`button`,"aria-label":`行距小一點`,disabled:a<=iS.min+.01,onClick:()=>o({lineHeight:oS(Math.max(iS.min,a-iS.step))}),children:`−`}),(0,H.jsx)(`b`,{children:a.toFixed(1)}),(0,H.jsx)(`button`,{type:`button`,"aria-label":`行距大一點`,disabled:a>=iS.max-.01,onClick:()=>o({lineHeight:oS(Math.min(iS.max,a+iS.step))}),children:`+`})]})]}),(0,H.jsxs)(lS,{children:[(0,H.jsx)(`span`,{children:`字體`}),(0,H.jsx)(fS,{role:`radiogroup`,"aria-label":`字體`,children:aS.map(([t,n])=>(0,H.jsx)(`button`,{type:`button`,role:`radio`,"aria-checked":e.font===t,"data-on":e.font===t||void 0,onClick:()=>o({font:t}),children:n},t))})]}),(0,H.jsxs)(lS,{children:[(0,H.jsx)(`span`,{children:`顯示注音`}),(0,H.jsx)(pS,{type:`button`,role:`switch`,"aria-checked":e.ruby,"aria-label":`顯示注音`,"data-on":e.ruby||void 0,onClick:()=>o({ruby:!e.ruby}),children:(0,H.jsx)(`i`,{})})]})]})}var cS=V.div`
  position: absolute;
  inset-inline-start: var(--reader-rail, 104px);
  inset-block-end: ${e=>e.theme.space.insetSm};
  z-index: 20;
  inline-size: 360px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  padding: 18px 20px;
  border-radius: ${e=>e.theme.radius.panel};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.page};
  box-shadow: ${e=>e.theme.shadow.popover};
`,lS=V.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-block-size: 44px;
  font-size: 15px;
  color: ${e=>e.theme.text.primary};
`,uS=`
  inline-size: 156px;
  block-size: 44px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 999px;
`,dS=V.div`
  ${uS}
  justify-content: space-between;
  background: ${e=>e.theme.surface.muted};
  button {
    inline-size: 36px;
    block-size: 36px;
    border: none;
    border-radius: 999px;
    background: transparent;
    font: inherit;
    font-size: 18px;
    color: ${e=>e.theme.text.primary};
    cursor: pointer;
  }
  button:hover:not(:disabled) { background: ${e=>e.theme.surface.raised}; }
  button:disabled { color: ${e=>e.theme.text.disabled}; cursor: default; }
  b {
    font-family: ${e=>e.theme.typography.fontDisplay};
    font-size: 15px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
`,fS=V.div`
  ${uS}
  gap: 2px;
  background: ${e=>e.theme.surface.muted};
  button {
    flex: 1;
    block-size: 36px;
    padding: 0;
    border: none;
    border-radius: 999px;
    background: transparent;
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    color: ${e=>e.theme.text.secondary};
    cursor: pointer;
  }
  button:hover:not([data-on]) { background: ${e=>e.theme.surface.raised}; color: ${e=>e.theme.text.primary}; }
  button[data-on] { background: ${e=>e.theme.action.primaryBg}; color: ${e=>e.theme.action.primaryText}; }
`,pS=V.button`
  position: relative;
  inline-size: 64px;
  block-size: 36px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${e=>e.theme.surface.muted};
  cursor: pointer;
  transition: background 0.2s;
  i {
    position: absolute;
    inset-block-start: 5px;
    inset-inline-start: 5px;
    inline-size: 26px;
    block-size: 26px;
    border-radius: 999px;
    background: ${e=>e.theme.surface.raised};
    box-shadow: ${e=>e.theme.shadow.card};
    transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  &[data-on] { background: ${e=>e.theme.action.primaryBg}; }
  &[data-on] i { transform: translateX(28px); }
`;function mS(e){let t=uh();return t?(0,H.jsx)(_b,{...e,onOpen:(n,r)=>{if(r.kind===`jump`){r.targetRowId&&e.onGoRow(r.targetRowId);return}t.open({...n,popups:[r]})}}):null}function hS({doc:e,pages:t,current:n,go:r,scale:i,stageRef:a,onExit:o,exitLabel:s,onGoRow:c,pageSize:l}){let u=t[Math.min(n,t.length-1)],d=l??Jn[e.settings.aspectRatio],[f,p]=(0,B.useState)(null),[m,h]=(0,B.useState)(!1),[g,_]=(0,B.useState)(!1),[v,y]=(0,B.useState)(!1),b=(0,B.useMemo)(()=>u?fb(u).reduce((e,t)=>e+Ji(t).length,0):0,[u]),x=(0,B.useMemo)(()=>qy(e).filter(e=>e.depth<=1),[e]),[S,C]=(0,B.useState)(Px),[w,T]=(0,B.useState)(!1),[E,D]=(0,B.useState)(Nm),O=e=>{D(e),Pm(e)},k=Nr(`body`,e.settings.writingMode===`vertical`),A=(0,B.useMemo)(()=>({scale:E.size?E.size/k:1,lineHeight:E.lineHeight??void 0}),[E.size,E.lineHeight,k]),j=nS(e.id,u?.index??0);(0,B.useLayoutEffect)(()=>Jo(),[]);let[M,N]=(0,B.useState)(null),[P,F]=(0,B.useState)(null);(0,B.useEffect)(()=>N(null),[n]),(0,B.useEffect)(()=>F(null),[M?.id]);let I=(t,n,r,i)=>{if(r.closest(`[data-mask]:not([data-shown])`))return{kind:`stop`};let a=t.closest(`[data-para]`);if(!a)return N(null),r.closest(`[data-pop]`)?{kind:`stop`}:{kind:`sentence`};if(a.dataset.paraHit)return{kind:`stop`};let o=a.dataset.para;if(M?.id!==o)return i.stopPropagation(),N({id:o,el:a}),{kind:`stop`};let s=Ii(e,o)?.block;if(s?.type!==`text`)return{kind:`sentence`};let c=r.closest(`[data-note]`),l=c?s.rangeNotes?.find(e=>e.id===c.dataset.note):void 0;if(l&&ls(s,l)){if(as(l)===`word`)return{kind:`stop`};let e=us(s.spans,l.id);if(e&&n>=e.start&&n<=e.end)return{kind:`range`,...e}}return r.closest(`[data-pop]`)?{kind:`stop`}:{kind:`sentence`}},L=t=>{if(!t)return F(null);let n=t.rich.closest(`[data-para]`);if(!n)return N(null),F(null);let r=n.dataset.para;M?.id!==r&&N({id:r,el:n});let i=Ii(e,r)?.block,a=i?.type===`text`?i.rangeNotes?.find(e=>{if(as(e)!==`sentence`||!ls(i,e))return!1;let n=us(i.spans,e.id);return!!n&&n.start<t.end&&n.end>t.start}):void 0;F(a?.id??null)},ee=(0,B.useMemo)(()=>({focusId:M?.id??null,toggle:(e,t)=>N(n=>n?.id===e?null:{id:e,el:t})}),[M]);(0,B.useEffect)(()=>{if(!m)return;let e=e=>{e.target?.closest(`#reader-toolbox, nav[aria-label="閱讀工具"]`)||(e.stopPropagation(),h(!1))};return document.addEventListener(`pointerdown`,e,!0),()=>document.removeEventListener(`pointerdown`,e,!0)},[m]);let te=(0,B.useCallback)(e=>{C(t=>{let n=t.includes(e)?t.filter(t=>t!==e):Ax.filter(n=>n===e||t.includes(n));return Fx(n),n}),f===e&&p(null)},[f]),ne=(0,B.useCallback)(()=>{j.clear(),Os(`已清掉這一頁的筆跡`)},[j]);return(0,B.useEffect)(()=>{let e=e=>{if(e.key===`Escape`){if(m||g||w){h(!1),_(!1),T(!1),e.stopPropagation();return}if(f){p(null),e.stopPropagation();return}M&&N(null);return}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`z`){if(e.shiftKey?!j.canRedo:!j.canUndo)return;e.preventDefault(),e.stopPropagation(),e.shiftKey?j.redo():j.undo()}};return document.addEventListener(`keydown`,e,!0),()=>document.removeEventListener(`keydown`,e,!0)},[f,m,g,w,j,M]),(0,H.jsxs)(SS,{"data-reader-font":E.font===`auto`?void 0:E.font,"data-reader-noruby":E.ruby?void 0:``,style:E.font===`auto`?void 0:{"--reader-font":jm[E.font]},children:[(0,H.jsx)(kS,{}),(0,H.jsx)(Ix,{subject:e.meta.subject,onExit:o,exitLabel:s,outlineOpen:g,onOutline:()=>{_(e=>!e),h(!1)},supplementCount:b,supplementOpen:v,onSupplements:()=>y(e=>!e),pageNumber:n+1,pageCount:t.length,onPrevPage:()=>r(-1),onNextPage:()=>r(1),onGoPage:e=>r(e-1-n),toolboxOpen:m,settingsOpen:w,onSettings:()=>{T(e=>!e),h(!1),_(!1)},onToolbox:()=>{h(e=>!e),_(!1),T(!1),p(null)},pinned:S,onUnpin:te,tool:f,onTool:p,onClear:ne,canClear:j.hasInk,undo:j.undo,redo:j.redo,canUndo:j.canUndo,canRedo:j.canRedo}),(0,H.jsx)(CS,{onPointerDown:()=>w&&T(!1),children:(0,H.jsx)(Fm.Provider,{value:A,children:(0,H.jsx)(Xl.Provider,{value:ee,children:(0,H.jsxs)(wS,{ref:a,children:[(0,H.jsx)(ub,{active:!0,root:a,decide:I,onBlank:()=>N(null),onMove:L}),u&&(0,H.jsxs)(OS,{style:{width:(d.width-64)*i,height:(d.height-64)*i},children:[(0,H.jsxs)(AS,{style:{margin:-32*i},children:[(0,H.jsx)(Xg,{page:u,settings:e.settings,scale:i,pageSize:l}),(0,H.jsx)(ox,{ink:j,tool:f,pageWidth:d.width,pageHeight:d.height,scale:i})]}),M&&(0,H.jsx)(gS,{doc:e,focus:M,sentenceId:P}),e.settings.layout===`flow`&&(0,H.jsx)(TS,{vertical:e.settings.writingMode===`vertical`,pageKey:u.index})]}),u&&(0,H.jsx)(mS,{doc:e,pages:t,current:u.index,open:v,onClose:()=>y(!1),onGoRow:c})]})})})}),g&&(0,H.jsxs)(jS,{id:`reader-outline`,role:`dialog`,"aria-label":`目次`,children:[(0,H.jsx)(MS,{children:`目次`}),x.length===0&&(0,H.jsx)(NS,{children:`這份教材還沒有章節標題`}),x.map(e=>{let r=Jy(t,e.rowId);return(0,H.jsxs)(PS,{type:`button`,$depth:e.depth,$on:r===n,onClick:()=>{c(e.rowId),_(!1)},children:[(0,H.jsx)(`span`,{children:e.text}),r>=0&&(0,H.jsx)(`small`,{children:r+1})]},e.rowId)})]}),m&&(0,H.jsx)(Jx,{pinned:S,onTogglePin:te,onClose:()=>h(!1),onSettings:()=>{h(!1),T(!0)}}),w&&(0,H.jsx)(sS,{prefs:E,onChange:O,baseSize:k,baseLineHeight:Er(`body`)})]})}function gS({doc:e,focus:t,sentenceId:n}){let r=uh(),i=Ii(e,t.id),a=i?.block.type===`text`?i.block:null,o=_S(a?.readAloud&&!n?ja(a.readAloud):void 0);if(!a||!r)return null;let s=n?a.rangeNotes?.find(e=>e.id===n)??null:null,c=s?vS(a,s):ns(a);if(c.length===0)return null;let l=Qo(e.rows).get(a.id)?.no,u=s&&t.el.querySelector(`[data-note="${s.id}"]`)||t.el,d=s?os(s):a.paraNotes,f=s?cs(a,s.id):$i(a);return(0,H.jsx)(yS,{"data-para-hit":!0,"aria-label":s?`這一句的說明`:l?`第 ${l} 段的說明`:`這一段的說明`,children:c.map(e=>(0,H.jsx)(xS,{type:`button`,"aria-label":e.key===`read`?`${o.playing?`暫停`:`播放`}朗讀`:e.name,"aria-pressed":e.key===`read`?o.playing:void 0,onClick:()=>{if(e.key===`read`){o.toggle();return}if(e.key===`bu`){r.open({...a,popups:f},u);return}let t=d?.[e.key]??``;r.open({...a,popups:[{id:`para-${e.key}`,kind:`text`,title:e.name,body:t}]},u)},children:e.key===`read`?(0,H.jsxs)(H.Fragment,{children:[o.playing&&(0,H.jsx)(bS,{viewBox:`0 0 36 36`,children:(0,H.jsx)(`circle`,{cx:`18`,cy:`18`,r:`17`,pathLength:1,strokeDasharray:`${o.progress} 1`})}),(0,H.jsx)(U,{name:o.playing?`pause`:`play`,size:20})]}):e.key===`bu`?(0,H.jsx)(U,{name:`blocks`,size:20}):e.btn},e.key))})}function _S(e){let t=(0,B.useRef)(null),[n,r]=(0,B.useState)(!1),[i,a]=(0,B.useState)(0),o=()=>{t.current?.pause(),t.current=null,r(!1),a(0)};return(0,B.useEffect)(()=>o,[e]),{playing:n,progress:i,toggle:()=>{if(n||!e)return o();let i=new Audio(e);i.ontimeupdate=()=>a(i.duration?i.currentTime/i.duration:0),i.onended=o,t.current=i,r(!0),i.play().catch(()=>{})}}}function vS(e,t){let n=os(t),r=Zo.filter(e=>n[e.key]?.trim());return cs(e,t.id).length>0&&r.push({key:`bu`,btn:`補`,name:`補充`}),r}var yS=V.nav`
  position: absolute;
  right: 12px;
  bottom: 12px;
  flex-direction: column;
  /* 在筆跡層之上，畫筆開著也按得到 */
  z-index: 15;
  display: flex;
  align-items: center;
  gap: 2px;
  /* 四邊同樣留 4：裡面的圓跟膠囊外框同一個圓心，滑過的灰圓不會貼到左右邊 */
  padding: 4px;
  border-radius: 999px;
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  box-shadow: ${e=>e.theme.shadow.card};
`,bS=V.svg`
  position: absolute;
  inset: 2px;
  transform: rotate(-90deg);
  pointer-events: none;
  circle {
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
  }
`,xS=V.button`
  position: relative;
  display: grid;
  place-items: center;
  inline-size: 40px;
  block-size: 40px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: none;
  color: ${e=>e.theme.text.primary};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${e=>e.theme.surface.sunken}; }
  &:active { background: ${e=>e.theme.surface.muted}; }
  &:focus-visible { outline: 2px solid ${e=>e.theme.border.focus}; outline-offset: -2px; }
`,SS=V.div`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  position: relative;
  /* 整個閱讀畫面是淡灰底（畫布底色 #F2F2F2）：白色圓角的頁面浮在上面，左欄的工具直接放在灰底上 */
  background: ${e=>e.theme.surface.backdrop};
`,CS=V.div`
  flex: 1;
  min-inline-size: 0;
  position: relative;
  display: flex;
  padding: ${e=>e.theme.space.insetSm} ${e=>e.theme.space.insetSm}
    ${e=>e.theme.space.insetSm} 0;
`,wS=V.main`
  flex: 1;
  min-inline-size: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 不再多包一層灰色卡片：頁面本身就是那張卡片 */
  overflow: hidden;
`;function TS({vertical:e,pageKey:t}){let n=(0,B.useRef)(null),[r,i]=(0,B.useState)(null),[a,o]=(0,B.useState)(!1);return(0,B.useEffect)(()=>{let e=n.current?.parentElement?.querySelector(`[data-layout="flow"]`);if(!e)return;let t=0,r=()=>{let t=e.scrollWidth-e.clientWidth,n=t<=1?null:{size:e.clientWidth/e.scrollWidth,at:Math.min(1,Math.abs(e.scrollLeft)/t)};i(e=>e===n||e&&n&&e.size===n.size&&e.at===n.at?e:n)},a=()=>{r(),o(!0),window.clearTimeout(t),t=window.setTimeout(()=>o(!1),800)};return r(),e.addEventListener(`scroll`,a,{passive:!0}),()=>{e.removeEventListener(`scroll`,a),window.clearTimeout(t)}},[t]),(0,H.jsx)(ES,{ref:n,"aria-hidden":!0,"data-flow-scrollbar":!0,$shown:a&&!!r,children:r&&(0,H.jsx)(DS,{style:{width:`${r.size*100}%`,[e?`right`:`left`]:`${r.at*(1-r.size)*100}%`}})})}var ES=V.div`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 6px;
  height: 6px;
  pointer-events: none;
  z-index: 14;
  opacity: ${e=>+!!e.$shown};
  transition: opacity 0.2s;
`,DS=V.div`
  position: absolute;
  top: 0;
  bottom: 0;
  border-radius: 3px;
  background: ${e=>e.theme.border.default};
`,OS=V.div`
  position: relative;
  flex: none;
  border-radius: ${e=>e.theme.radius.panel};
  overflow: hidden;
  /*
   * 不畫陰影也不畫框：白色的頁直接放在灰底上就分得出來。
   * 陰影會被畫布區（Stage 會裁掉超出去的東西）切成一條直線；框線看起來髒
   */
`,kS=Bn`
  :root {
    --reader-rail: 104px;
    /* 工具格一律正方形 */
    --reader-tile-w: 56px;
    --reader-tile-h: 56px;
    --reader-label: var(--ds-typography-label-size);
  }
  /* 閱讀設定：字體一律換掉（老師逐字設的也一起換）；注音另外固定黑體，不跟著換。關掉注音就把注音藏起來 */
  [data-reader-font] .ds-rich,
  [data-reader-font] .ds-rich *:not(rt):not(rt *) {
    font-family: var(--reader-font) !important;
  }
  [data-reader-noruby] .ds-rich rt {
    display: none !important;
  }
  @media (max-height: 820px), (max-width: 1100px) {
    :root {
      --reader-rail: 80px;
      --reader-tile-w: 52px;
      --reader-tile-h: 52px;
      --reader-label: 10px;
    }
  }
`,AS=V.div`
  position: relative;
`,jS=V.div`
  position: absolute;
  inset-block: ${e=>e.theme.space.insetSm};
  inset-inline-start: var(--reader-rail, 104px);
  z-index: 20;
  inline-size: 240px;
  overflow-y: auto;
  padding: ${e=>e.theme.space.insetSm};
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: ${e=>e.theme.surface.raised};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  border-radius: ${e=>e.theme.radius.panel};
  box-shadow: ${e=>e.theme.shadow.float};
`,MS=V.strong`
  padding: 8px 10px;
  font-size: ${e=>e.theme.typography.bodySmSize};
`,NS=V.p`
  margin: 0;
  padding: 8px 10px;
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.text.tertiary};
`,PS=V.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px 8px ${e=>10+e.$depth*14}px;
  min-block-size: 40px;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.$on?e.theme.surface.sunken:`transparent`};
  color: ${e=>e.theme.text.primary};
  font-size: ${e=>e.theme.typography.bodySmSize};
  font-weight: ${e=>e.$depth===0?600:400};
  text-align: start;
  cursor: pointer;

  span { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  small { color: ${e=>e.theme.text.tertiary}; font-variant-numeric: tabular-nums; }
  &:hover { background: ${e=>e.theme.surface.sunken}; }
`,FS=4/5,IS=456,LS=570,RS=48;function zS({src:e,onChange:t}){let n=(0,B.useRef)(null),r=(0,B.useRef)(null),[i,a]=(0,B.useState)(null),[o,s]=(0,B.useState)(null);(0,B.useEffect)(()=>{let t=new Image;t.onload=()=>{r.current=t;let e=n.current.getBoundingClientRect(),i=Math.min(e.width/t.naturalWidth,e.height/t.naturalHeight),o={w:t.naturalWidth*i,h:t.naturalHeight*i,x:0,y:0};o.x=(e.width-o.w)/2,o.y=(e.height-o.h)/2,a(o);let c=Math.min(o.w,o.h*FS),l=c/FS;s({x:o.x+(o.w-c)/2,y:o.y+(o.h-l)/2,w:c,h:l})},t.src=e},[e]),(0,B.useEffect)(()=>{if(!o||!i||!r.current)return;let e=setTimeout(()=>{let e=r.current,n=e.naturalWidth/i.w,a=document.createElement(`canvas`);a.width=IS,a.height=LS,a.getContext(`2d`).drawImage(e,(o.x-i.x)*n,(o.y-i.y)*n,o.w*n,o.h*n,0,0,IS,LS),t(a.toDataURL(`image/jpeg`,.85))},120);return()=>clearTimeout(e)},[o,i,t]);let c=(e,t)=>{if(!o||!i)return;e.preventDefault(),e.stopPropagation();let n={x:e.clientX,y:e.clientY,crop:o},r=e=>{let r=e.clientX-n.x,a=e.clientY-n.y,o=n.crop;if(!t){s({...o,x:Math.min(Math.max(o.x+r,i.x),i.x+i.w-o.w),y:Math.min(Math.max(o.y+a,i.y),i.y+i.h-o.h)});return}let c=t.includes(`e`),l=t.includes(`s`),u=c?o.x:o.x+o.w,d=l?o.y:o.y+o.h,f=Math.max(c?o.w+r:o.w-r,(l?o.h+a:o.h-a)*FS),p=c?i.x+i.w-u:u-i.x,m=l?i.y+i.h-d:d-i.y;f=Math.max(RS,Math.min(f,p,m*FS));let h=f/FS;s({x:c?u:u-f,y:l?d:d-h,w:f,h})},a=()=>{window.removeEventListener(`pointermove`,r),window.removeEventListener(`pointerup`,a)};window.addEventListener(`pointermove`,r),window.addEventListener(`pointerup`,a)};return(0,H.jsxs)(BS,{ref:n,children:[i&&(0,H.jsx)(`img`,{src:e,alt:``,style:{left:i.x,top:i.y,width:i.w,height:i.h}}),o&&(0,H.jsx)(VS,{style:{left:o.x,top:o.y,width:o.w,height:o.h},onPointerDown:e=>c(e,null),title:`拖曳調整位置`,children:[`nw`,`ne`,`sw`,`se`].map(e=>(0,H.jsx)(HS,{$c:e,onPointerDown:t=>c(t,e),"aria-label":`拖曳調整大小`},e))})]})}var BS=V.div`
  position: relative;
  inline-size: 100%;
  block-size: 100%;
  overflow: hidden;
  touch-action: none;
  user-select: none;

  & > img {
    position: absolute;
    pointer-events: none;
  }
`,VS=V.div`
  position: absolute;
  cursor: move;
  box-shadow: 0 0 0 9999px rgba(26, 25, 23, 0.45);
  outline: 1px solid rgba(255, 255, 255, 0.9);
`,HS=V.span`
  position: absolute;
  inline-size: 28px;
  block-size: 28px;
  ${e=>e.$c.includes(`n`)?`top: -6px;`:`bottom: -6px;`}
  ${e=>e.$c.includes(`w`)?`left: -6px;`:`right: -6px;`}
  cursor: ${e=>e.$c===`nw`||e.$c===`se`?`nwse-resize`:`nesw-resize`};

  &::before {
    content: '';
    position: absolute;
    inline-size: 16px;
    block-size: 16px;
    ${e=>e.$c.includes(`n`)?`top: 4px;`:`bottom: 4px;`}
    ${e=>e.$c.includes(`w`)?`left: 4px;`:`right: 4px;`}
    border: 0 solid #fff;
    ${e=>e.$c.includes(`n`)?`border-top-width: 3px;`:`border-bottom-width: 3px;`}
    ${e=>e.$c.includes(`w`)?`border-left-width: 3px;`:`border-right-width: 3px;`}
  }
`,US=e=>{let t=t=>{t.key===`Escape`&&e()};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)};function WS({onClose:e,onUpload:t,published:n}){return(0,B.useEffect)(()=>US(e),[e]),(0,pi.createPortal)((0,H.jsx)(JS,{onClick:e,children:(0,H.jsxs)(YS,{role:`dialog`,"aria-modal":`true`,"aria-label":n?`教材已發布`:`自編教材已共享`,$narrow:!0,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(XS,{children:n?`教材已發布`:`自編教材已共享`}),(0,H.jsx)(ZS,{children:n?`老師現在可以在數位教科書看到這本、建立自編。放上一張封面，讓教材變完整吧！`:`放上一張封面，讓教材變完整吧！`}),(0,H.jsxs)(eC,{children:[(0,H.jsx)(tC,{type:`button`,onClick:e,children:`取消`}),(0,H.jsx)(tC,{type:`button`,$primary:!0,onClick:t,children:`前往上傳`})]})]})}),document.body)}var GS=10485760,KS=[`image/jpeg`,`image/png`,`image/gif`];function qS({onCancel:e,onConfirm:t}){let[n,r]=(0,B.useState)(null),[i,a]=(0,B.useState)(null),[o,s]=(0,B.useState)(!1),[c,l]=(0,B.useState)(null);(0,B.useEffect)(()=>US(e),[e]),(0,B.useEffect)(()=>()=>{n&&URL.revokeObjectURL(n)},[n]);let u=e=>{if(e){if(!KS.includes(e.type))return l(`只支援 JPG、PNG、GIF`);if(e.size>GS)return l(`檔案不可超過 10MB`);r(URL.createObjectURL(e)),a(null),l(null)}},d=()=>void Ha(KS.join(`,`)).then(u),f={onDragOver:e=>{e.preventDefault(),s(!0)},onDragLeave:()=>s(!1),onDrop:e=>{e.preventDefault(),s(!1),u(e.dataTransfer.files?.[0]??null)}};return(0,pi.createPortal)((0,H.jsx)(JS,{onClick:e,children:(0,H.jsxs)(YS,{role:`dialog`,"aria-modal":`true`,"aria-label":`課本封面`,onClick:e=>e.stopPropagation(),children:[(0,H.jsxs)(QS,{children:[(0,H.jsx)(`span`,{children:`課本封面`}),(0,H.jsx)($S,{type:`button`,onClick:e,"aria-label":`關閉`,title:`關閉`,children:(0,H.jsx)(U,{name:`x`,size:24,label:`關閉`})})]}),n?(0,H.jsx)(nC,{as:`div`,$dragging:o,$hasCover:!0,...f,children:(0,H.jsx)(zS,{src:n,onChange:a})}):(0,H.jsx)(nC,{type:`button`,$dragging:o,$hasCover:!1,title:`上傳檔案`,onClick:d,...f,children:(0,H.jsxs)(rC,{children:[(0,H.jsx)(U,{name:`upload`,size:24}),(0,H.jsx)(`span`,{children:`上傳檔案`})]})}),n&&!c?(0,H.jsx)(iC,{$bad:!1,children:`拖四個角調整範圍、按住圖片移動位置`}):(0,H.jsx)(iC,{$bad:!!c,children:c??`支援 JPG、PNG、GIF 格式，檔案大小不超過 10MB`}),(0,H.jsxs)(eC,{children:[(0,H.jsx)(tC,{type:`button`,onClick:n?d:e,children:n?`換一張`:`取消`}),(0,H.jsx)(tC,{type:`button`,disabled:!i,onClick:()=>i&&t(i),$primary:!0,children:`確認上傳`})]})]})}),document.body)}var JS=V.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  /* Figma 的 backdrop 是 10% 黑；設計系統沒有遮罩 token，從 inverse 面色調出來 */
  background: color-mix(in srgb, ${e=>e.theme.surface.inverse} 10%, transparent);
  display: grid;
  place-items: center;
  padding: ${e=>e.theme.space.insetLg};
`,YS=V.div`
  inline-size: min(${e=>e.$narrow?`500px`:`400px`}, 100%);
  display: flex;
  flex-direction: column;
  gap: ${e=>e.$narrow?`24px`:`20px`};
  align-items: stretch;
  padding: ${e=>e.theme.space.insetLg};
  background: ${e=>e.theme.surface.page};
  border-radius: ${e=>e.theme.radius.panel};
  box-shadow: ${e=>e.theme.shadow.float};
`,XS=V.p`
  margin: 0;
  font-size: ${e=>e.theme.typography.bodyLgSize};
  line-height: ${e=>e.theme.typography.bodyLgLineHeight};
  font-weight: 600;
`,ZS=V.p`
  margin: 0;
  font-size: ${e=>e.theme.typography.bodySize};
  line-height: ${e=>e.theme.typography.bodyLineHeight};
  color: ${e=>e.theme.text.secondary};
`,QS=V.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${e=>e.theme.typography.bodyLgSize};
  line-height: ${e=>e.theme.typography.bodyLgLineHeight};
`,$S=V.button`
  display: grid;
  place-items: center;
  inline-size: 24px;
  block-size: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
`,eC=V.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`,tC=V.button`
  block-size: ${e=>e.theme.control.heightMd};
  padding: 0 ${e=>e.theme.space.insetLg};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.action.secondaryBorder};
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.action.secondaryBg};
  color: ${e=>e.theme.action.secondaryText};
  font-size: ${e=>e.theme.typography.bodySmSize};
  font-weight: 500;
  cursor: pointer;

  &:hover:not(:disabled) { background: ${e=>e.theme.action.secondaryBgHover}; }
  /* 主要動作（確認上傳、建立）：黑色實心，跟全站的主要按鈕同色 */
  ${e=>e.$primary&&`&:not(:disabled) { border-color: transparent; background: ${e.theme.action.primaryBg}; color: ${e.theme.action.primaryText}; }
     &:hover:not(:disabled) { background: ${e.theme.action.primaryBgHover}; }`}
  &:disabled {
    background: ${e=>e.theme.action.disabledBg};
    border-color: ${e=>e.theme.action.disabledBorder};
    color: ${e=>e.theme.action.disabledText};
    cursor: default;
  }
`,nC=V.button`
  display: grid;
  place-items: center;
  inline-size: 100%;
  block-size: 283px;
  padding: 12px 16px;
  overflow: hidden;
  cursor: pointer;
  border: ${e=>e.theme.border.widthDefault} solid
    ${e=>e.$dragging?e.theme.border.accent:`transparent`};
  border-radius: ${e=>e.theme.radius.tile};
  background: ${e=>e.$hasCover?e.theme.surface.media:e.theme.surface.sunken};
  color: ${e=>e.theme.text.placeholder};
  font-size: ${e=>e.theme.typography.bodySmSize};
`,rC=V.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 17px;
  svg { inline-size: 60px; block-size: 60px; }
`,iC=V.p`
  margin: -8px 0 0;
  text-align: center;
  font-size: ${e=>e.theme.typography.labelSize};
  line-height: ${e=>e.theme.typography.labelLineHeight};
  letter-spacing: 0.5px;
  font-weight: 500;
  color: ${e=>e.$bad?e.theme.feedback.errorDefault:e.theme.text.tertiary};
`,aC={'"Kaiti TC", "BiauKai", "TW-MOE-Std-Kai", "DFKai-SB", "TW-Kai", "Noto Serif TC", serif':`"BiauKai", "DFKai-SB", "TW-MOE-Std-Kai", "TW-Kai", "Kaiti TC", "Noto Serif TC", serif`,'"GenSenRounded TW", "Yuanti TC", "YuanTi TC", "Hiragino Maru Gothic ProN", "jf-openhuninn", "Noto Sans TC", sans-serif':`"GenSenRounded TW", "Noto Sans TC", sans-serif`};function oC(e){let t=!1,n=e=>{if(Array.isArray(e)){let t=e.map(n);return t.some((t,n)=>t!==e[n])?t:e}if(!e||typeof e!=`object`)return e;let r=e,i=null;for(let[e,a]of Object.entries(r)){let o=e===`fontFamily`&&typeof a==`string`&&aC[a]?aC[a]:n(a);o!==a&&(i??={...r},i[e]=o,t=!0)}return i??r},r=n(e);return t?r:e}var sC=`ds-editor:library:v1`,cC=e=>`ds-editor:book:${e}`,lC=`ds-editor:doc:v2`,uC=new Set,dC=()=>uC.forEach(e=>e());function fC(e){return uC.add(e),()=>uC.delete(e)}function pC(){try{let e=localStorage.getItem(sC),t=e?JSON.parse(e):null;if(Array.isArray(t))return t}catch{}return hC()}function mC(e){try{localStorage.setItem(sC,JSON.stringify(e))}catch{}gC=e,dC()}function hC(){try{let e=localStorage.getItem(lC);if(!e)return[];let t=JSON.parse(e);if(!t||!Array.isArray(t.rows))return[];let n=`book-${Date.now().toString(36)}`;localStorage.setItem(cC(n),e);let r=Date.now(),i=[{id:n,sourceId:t.meta?.subject===`自然`?`demo`:`mulan`,title:t.title,cover:null,shared:!1,createdAt:r,updatedAt:r}];return localStorage.setItem(sC,JSON.stringify(i)),localStorage.removeItem(lC),i}catch{return[]}}var gC=null;function _C(){return gC??=pC(),gC}var vC=e=>_C().find(t=>t.id===e)??null;function yC(e){try{let t=localStorage.getItem(cC(e));return t?JSON.parse(t):null}catch{return null}}function bC(e,t){let n=!0;try{localStorage.setItem(cC(e),JSON.stringify(t))}catch{n=!1}let r=_C(),i=r.findIndex(t=>t.id===e);if(i<0)return n;let a=r[i].kind===`original`?t.meta.publisher??``:r[i].publisher;return(r[i].title!==t.title||r[i].publisher!==a||Date.now()-r[i].updatedAt>5e3)&&mC(r.map((e,n)=>n===i?{...e,title:t.title,publisher:a,updatedAt:Date.now()}:e)),n}var xC=e=>e.kind===`original`,SC=(e,t)=>{try{return JSON.parse(localStorage.getItem(e)??``)}catch{return t}},CC=`ds-editor:frame-count:v1`;function wC(e,t=0){let n=SC(CC,{}),r=n[e]??t;try{localStorage.setItem(CC,JSON.stringify({...n,[e]:r+1}))}catch{}return r%10}function TC(e,t,n,r){let i=Date.now(),a={id:`book-${i.toString(36)}${Math.random().toString(36).slice(2,6)}`,kind:n?`original`:`copy`,...n,sourceId:e,...n?{}:{frame:r??wC(e)},title:t.title,cover:null,shared:!1,createdAt:i,updatedAt:i};try{localStorage.setItem(cC(a.id),JSON.stringify(t))}catch{}return mC([a,..._C()]),a}function EC(e,t){mC(_C().map(n=>n.id===e?{...n,...t,updatedAt:Date.now()}:n))}var DC=`ds-editor:hidden-textbooks:v1`,OC=`ds-editor:adopted-textbooks:v1`,kC=()=>SC(DC,[]);function AC(e){try{localStorage.setItem(DC,JSON.stringify([...new Set([...kC(),e])]))}catch{}mC([..._C()])}var jC=e=>SC(OC,{})[e]??null,MC=e=>Object.entries(SC(OC,{})).find(([,t])=>t===e)?.[0]??null;function NC(e,t,n){let r=jC(e),i=r?vC(r):null;if(i)return i;let a=TC(``,t,{subject:n.subject,publisher:n.publisher});EC(a.id,{cover:n.cover,shared:!0});try{localStorage.setItem(OC,JSON.stringify({...SC(OC,{}),[e]:a.id}))}catch{}return AC(e),vC(a.id)}function PC(e){try{localStorage.removeItem(cC(e))}catch{}mC(_C().filter(t=>t.id!==e))}var FC=1e3,IC=null;function LC(e){IC=e}var RC=()=>IC?vC(IC)?.kind===`original`:!1,zC=!1;function BC(e){if(!IC)return;let t=bC(IC,e);!t&&!zC&&Os(`存不進去：這台瀏覽器的空間滿了。刪掉用不到的教材或大圖，下次修改時會再存`),zC=!t}function VC(e){try{let t=yC(e);return!t||typeof t!=`object`||!Array.isArray(t.rows)?null:oC(zi(Hl(Ri(Li({...t,footnotes:t.footnotes??[]})))))}catch{return null}}function HC(e){let t=(0,B.useRef)(e);t.current=e;let[n,r]=(0,B.useState)(!1),i=(0,B.useRef)(!0);(0,B.useEffect)(()=>{if(i.current){i.current=!1;return}r(!0);let e=setTimeout(()=>{BC(t.current),r(!1)},FC);return()=>clearTimeout(e)},[e]);let a=(0,B.useCallback)(()=>{BC(t.current),r(!1)},[]);return(0,B.useEffect)(()=>()=>BC(t.current),[]),{pending:n,flush:a}}function UC(){let e=IC?vC(IC):null;return{shared:e?.shared??!1,cover:e?.cover??null}}function WC(e){IC&&EC(IC,{shared:e.shared,cover:e.cover})}var GC=1200;function KC({doc:e,onTitle:t,undo:n,redo:r,canUndo:i,canRedo:a,importing:o,settingsOpen:s,onSettings:c,reading:l,onReading:u}){let d=HC(e),[f,p]=(0,B.useState)(`none`),[m,h]=(0,B.useState)(UC),[g,_]=(0,B.useState)(!1),v=(0,B.useRef)(0);(0,B.useEffect)(()=>()=>clearTimeout(v.current),[]);let y=()=>{d.flush(),_(!0),clearTimeout(v.current),v.current=window.setTimeout(()=>_(!1),GC)},b=(0,B.useCallback)(e=>{h(e),WC(e)},[]),[x]=(0,B.useState)(RC),S=x?`發布`:`共享`;return(0,H.jsxs)(ew,{children:[(0,H.jsx)(Tx,{subject:e.meta.subject}),(0,H.jsx)(qC,{value:e.title,onChange:t}),(0,H.jsxs)(tw,{children:[(0,H.jsxs)(nw,{children:[(0,H.jsx)(QC,{icon:`undo`,label:`復原`,title:`復原（Cmd+Z）`,disabled:!i,onClick:n}),(0,H.jsx)(QC,{icon:`redo`,label:`重做`,title:`重做（Shift+Cmd+Z）`,disabled:!a,onClick:r})]}),(0,H.jsx)(rw,{}),(0,H.jsxs)(nw,{children:[(0,H.jsx)(QC,{icon:`settings`,label:`設定`,title:`教材設定、匯入`,$focus:s||o,onClick:c}),(0,H.jsx)(QC,{icon:`save`,label:d.pending?`儲存`:`已儲存`,title:d.pending?`有尚未儲存的改動，按一下立刻儲存`:`已自動儲存到這台電腦，按一下再存一次`,$on:g,onClick:y}),(0,H.jsx)(QC,{icon:x?`send`:`share`,label:m.shared?`已${S}`:S,title:m.shared?`再按一次取消${S}`:x?`發布到書櫃的數位教科書，老師就能建立自編`:`共享教材`,$on:m.shared,"aria-pressed":m.shared,onClick:()=>{if(m.shared){b({...m,shared:!1}),Os(x?`已取消發布，老師暫時看不到這本`:`已取消共享`);return}b({...m,shared:!0}),p(`shared`)}}),(0,H.jsx)(QC,{icon:`eye`,label:l?`回到編輯`:`閱讀模式`,title:l?`回到編輯`:`用學生看到的樣子翻閱`,$on:l,"aria-pressed":l,onClick:u})]})]}),f===`shared`&&(0,H.jsx)(WS,{published:x,onClose:()=>p(`none`),onUpload:()=>p(`cover`)}),f===`cover`&&(0,H.jsx)(qS,{onCancel:()=>p(`none`),onConfirm:e=>{b({...m,shared:!0,cover:e}),p(`none`),Os(`封面已更新`)}}),(0,H.jsx)(ks,{})]})}function qC({value:e,onChange:t}){return(0,H.jsxs)(YC,{children:[(0,H.jsx)(XC,{"data-value":e||`未命名教材`,children:(0,H.jsx)(ZC,{size:1,value:e,onChange:e=>t(e.target.value),onKeyDown:e=>{(e.key===`Enter`||e.key===`Escape`)&&e.currentTarget.blur()},placeholder:`未命名教材`,"aria-label":`教材名稱`,title:`教材名稱，點一下就能改`})}),(0,H.jsx)(JC,{"aria-hidden":`true`,children:(0,H.jsx)(U,{name:`pencil`,size:16})})]})}var JC=V.span`
  display: inline-flex;
  color: ${e=>e.theme.text.secondary};
  opacity: 0;
  transition: opacity 0.12s;
  pointer-events: none;
`,YC=V.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: 0 1 auto;
  min-inline-size: 0;
  &:hover ${JC} { opacity: 1; }
  &:focus-within ${JC} { opacity: 0; }
`,XC=V.div`
  display: inline-grid;
  flex: 0 1 auto;
  min-inline-size: 0;

  &::after,
  & > input {
    grid-area: 1 / 1;
    font: inherit;
    /* 教材名稱用系統字（中文 Noto Sans TC、英數 Lexend）；品牌字繁 Think 黑只用在 logo（乙練 2026-10-22） */
    font-family: var(--ds-typography-font-sans);
    font-size: 20px;
    line-height: 34px;
    letter-spacing: 0.4px;
    font-weight: 700;
    padding: 4px 16px;
    border: ${e=>e.theme.border.widthDefault} solid transparent;
  }
  &::after {
    content: attr(data-value);
    visibility: hidden;
    white-space: pre;
    overflow: hidden;
  }
`,ZC=V.input`
  inline-size: 100%;
  min-inline-size: 3ch;
  text-overflow: ellipsis;
  border-radius: ${e=>e.theme.radius.control};
  background: transparent;
  color: ${e=>e.theme.text.primary};
  transition: background 0.12s, border-color 0.12s;

  &:hover { background: ${e=>e.theme.surface.sunken}; }
  &:focus {
    border-color: ${e=>e.theme.border.focus};
    background: ${e=>e.theme.surface.sunken};
    outline: none;
  }
`;function QC({icon:e,label:t,title:n,disabled:r,$focus:i=!1,$on:a=!1,onClick:o,...s}){return(0,H.jsxs)($C,{type:`button`,title:n,disabled:r,$active:a||i,onClick:o,...s,children:[(0,H.jsx)(U,{name:e,size:20}),(0,H.jsx)(`span`,{children:t})]})}var $C=V.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  /* 比 Figma 的 56 方塊收小一階（48 高、字 11；圖示維持設計系統的 20），頂部列比較精緻；四個字的「閱讀模式」靠左右內距撐開 */
  min-inline-size: 48px;
  block-size: 48px;
  padding: 0 6px;
  border: none;
  border-radius: ${e=>e.theme.radius.tile};
  cursor: pointer;
  font-size: var(--ds-typography-label-size);
  font-weight: 500;
  line-height: var(--ds-typography-label-line-height);
  white-space: nowrap;
  background: ${e=>e.$active?e.theme.brand.primaryTint:e.theme.action.inverseBg};
  color: ${e=>e.$active?e.theme.brand.accentOnLight:e.theme.text.secondary};
  transition: background 0.12s, color 0.12s;

  svg { color: ${e=>e.$active?e.theme.brand.accentOnLight:e.theme.icon.default}; }

  &:hover:not(:disabled) {
    background: ${e=>e.$active?e.theme.brand.primaryTint:e.theme.surface.sunken};
  }
  &:disabled {
    cursor: default;
    color: ${e=>e.theme.text.disabled};
    svg { color: ${e=>e.theme.icon.disabled}; }
  }
`,ew=V.header`
  display: flex;
  align-items: center;
  flex: none;
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetXs} ${e=>e.theme.space.insetLg};
  background: ${e=>e.theme.surface.raised};
`,tw=V.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapLg};
  flex: none;
  margin-inline-start: auto;
`,nw=V.div`
  display: flex;
  gap: ${e=>e.theme.space.gapSm};
  align-items: center;
`,rw=V.span`
  inline-size: 1px;
  block-size: 24px;
  background: ${e=>e.theme.border.subtle};
`;function iw({options:e,value:t,onChange:n,compact:r,"aria-label":i}){let a=e.findIndex(e=>e.value===t),o=r?2:4;return(0,H.jsxs)(ow,{role:`tablist`,"aria-label":i,$n:e.length,$gap:o,children:[a>=0&&(0,H.jsx)(sw,{"aria-hidden":!0,$n:e.length,$gap:o,style:{transform:`translateX(calc(${a} * (100% + ${o}px)))`}}),e.map(e=>(0,H.jsx)(cw,{type:`button`,role:`tab`,"aria-selected":e.value===t,$on:e.value===t,$compact:!!r,onClick:()=>n(e.value),children:e.label},e.value))]})}var aw=4,ow=V.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${e=>e.$n}, minmax(0, 1fr));
  gap: ${e=>e.$gap}px;
  padding: ${aw}px;
  border-radius: ${e=>e.theme.radius.control};
  /* 跟畫布底色同一個灰（#F2F2F2），左欄的「頁面／目次」與畫布外的灰才是同一色 */
  background: ${e=>e.theme.surface.backdrop};
  writing-mode: horizontal-tb;
`,sw=V.span`
  position: absolute;
  top: ${aw}px;
  bottom: ${aw}px;
  left: ${aw}px;
  width: calc((100% - ${8}px - ${e=>(e.$n-1)*e.$gap}px) / ${e=>e.$n});
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.14);
  transition: transform 0.28s cubic-bezier(0.3, 0.7, 0.4, 1);
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,cw=V.button`
  position: relative;
  z-index: 1;
  min-inline-size: 0;
  white-space: nowrap;
  font: inherit;
  font-size: ${e=>e.$compact?`var(--ds-typography-label-size)`:`var(--ds-typography-body-sm-size)`};
  min-block-size: ${e=>e.$compact?`30px`:`32px`};
  padding: 0 4px;
  cursor: pointer;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: transparent;
  color: ${e=>e.$on?e.theme.text.primary:e.theme.text.secondary};
  font-weight: ${e=>e.$on?500:400};
  transition: color 0.2s;

  &:hover { color: ${e=>e.theme.text.primary}; }
`,lw=8,uw=4,dw=40,fw=10;function pw(e){return e.items.filter(e=>!e.continuedFromPrev).map(e=>e.row.id)}function mw(e,t){let n=pw(t);return n.length===0?`這一頁是上一段的接續，要刪請刪上一頁的那一段`:n.length>=e.rows.length?`這是教材僅有的內容，不能整頁刪掉`:null}function hw(e,t,n){if(n===t||n===t+1)return null;let r=pw(e[t]);if(r.length===0)return null;let i=null;for(let r=n;r<e.length;r++){if(r===t)continue;let n=pw(e[r]);if(n.length>0){i=n[0];break}}return{type:`moveRows`,rowIds:r,beforeRowId:i}}function gw({doc:e,pages:t,current:n,thumbInline:r,onGoPage:i,dispatch:a}){let o=Jn[e.settings.aspectRatio],s=r/o.width,c=(0,B.useRef)(null),[l,u]=(0,B.useState)(null),[d,f]=(0,B.useState)(null),[p,m]=(0,B.useState)(null),h=(0,B.useRef)(!1),[g,_]=(0,B.useState)(null);(0,B.useEffect)(()=>{g===null||t.length<=g||(i(g),_(null))},[g,t.length,i]);let v=()=>{a&&(a({type:`insertRow`,index:e.rows.length,blocks:[Mi(``,`body`)],breakBefore:!0}),_(t.length))};(0,B.useEffect)(()=>{l===null&&c.current?.querySelector(`[data-thumb="${n}"]`)?.scrollIntoView({block:`nearest`})},[n,l]);let y=n=>{let r=t[n];if(!a||!r||mw(e,r))return;let i=pw(r);m({title:`刪除第 ${n+1} 頁？`,run:()=>a({type:`deleteRows`,rowIds:i})})},b=()=>[...c.current?.querySelectorAll(`[data-thumb]`)??[]].map(e=>({i:Number(e.dataset.thumb),r:e.getBoundingClientRect()})),x=e=>{let t=c.current,n=b();if(!t||n.length===0)return null;let r=t.getBoundingClientRect(),i=e=>e-r.top+t.scrollTop;for(let t of n)if(e<t.r.top+t.r.height/2)return{slot:t.i,top:i(t.r.top)-lw/2};let a=n[n.length-1];return{slot:a.i+1,top:i(a.r.bottom)+lw/2}},S=(e,n)=>{let r=e.target.closest(`[data-thumb]`),i=c.current;if(!r||!i)return;let o=e.clientX,s=e.clientY,l=!1,d=null,p=0,m=0,g=s,_=null,v=0,y=0,b=()=>{let e=x(g);_=e?.slot??null,f(e?.top??null)},S=()=>{v=0,y&&(i.scrollTop+=y,b(),v=requestAnimationFrame(S))},C=e=>{let t=i.getBoundingClientRect();y=e<t.top+dw?-10:e>t.bottom-dw?fw:0,y&&!v&&(v=requestAnimationFrame(S))},w=e=>{if(!l){if(Math.hypot(e.clientX-o,e.clientY-s)<uw)return;l=!0,u(n);let t=r.getBoundingClientRect();p=o-t.left,m=s-t.top,d=r.cloneNode(!0),d.removeAttribute(`data-thumb`),Object.assign(d.style,{position:`fixed`,left:`0`,top:`0`,width:`${t.width}px`,margin:`0`,pointerEvents:`none`,zIndex:`9999`,opacity:`0.9`,background:`var(--ds-surface-raised)`,boxShadow:`var(--ds-shadow-float)`}),document.body.appendChild(d)}g=e.clientY,d&&(d.style.transform=`translate(${e.clientX-p}px, ${e.clientY-m}px)`),b(),C(e.clientY)},T=()=>{if(window.removeEventListener(`pointermove`,w),window.removeEventListener(`pointerup`,T),window.removeEventListener(`pointercancel`,T),y=0,cancelAnimationFrame(v),d?.remove(),!l||(h.current=!0,setTimeout(()=>h.current=!1,0),u(null),f(null),_===null||!a))return;let e=hw(t,n,_);e&&a(e)};window.addEventListener(`pointermove`,w),window.addEventListener(`pointerup`,T),window.addEventListener(`pointercancel`,T),e.preventDefault()},C=(e,t)=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),i(t))};return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(_w,{ref:c,role:`list`,"aria-label":`頁面縮圖`,children:[t.map((t,r)=>{let c=r===n,u=a?mw(e,t):null,d=!!a&&pw(t).length>0;return(0,H.jsxs)(bw,{"data-thumb":r,role:`listitem`,tabIndex:0,"aria-current":c?`page`:void 0,"aria-label":`第 ${r+1} 頁`,$on:c,$dragging:l===r,$draggable:d,onPointerDown:e=>{e.button!==0||!d||e.target.closest(`[data-trash]`)||S(e,r)},onClick:()=>{h.current||i(r)},onKeyDown:e=>C(e,r),children:[(0,H.jsx)(xw,{$on:c,children:r+1}),(0,H.jsxs)(Tw,{children:[(0,H.jsx)(Ew,{$on:c,style:{width:o.width*s,height:o.height*s},children:(0,H.jsx)(dh,{children:(0,H.jsx)(Xg,{page:t,settings:e.settings,scale:s,thumbnail:!0})})}),a&&(0,H.jsx)(Dw,{"data-trash":!0,title:u??`刪除第 ${r+1} 頁`,children:(0,H.jsx)(Ow,{type:`button`,disabled:!!u,"aria-label":`刪除第 ${r+1} 頁`,onClick:e=>{e.stopPropagation(),y(r)},children:(0,H.jsx)(U,{name:`trash`,size:16})})})]})]},t.index)}),a&&(0,H.jsxs)(Sw,{type:`button`,onClick:v,"aria-label":`新增頁面`,title:`在最後新增一頁`,children:[(0,H.jsx)(xw,{$on:!1}),(0,H.jsx)(ww,{style:{width:o.width*s,height:o.height*s},children:(0,H.jsx)(Cw,{children:(0,H.jsx)(U,{name:`plus`,size:16})})})]}),d!==null&&(0,H.jsx)(kw,{style:{top:d}})]}),p&&(0,H.jsx)(Sd,{title:p.title,confirmLabel:`刪除`,onConfirm:()=>{p.run(),m(null)},onCancel:()=>m(null)})]})}var _w=V.div`
  position: relative;
  flex: 1;
  min-block-size: 0;
  overflow-y: auto;
  overflow-x: hidden;
  /* 捲軸樣式在 GlobalStyle（全站同一套）。這裡一直預留它的 6px，
     出現與否都不會把內容擠動、也不會壓到頁碼 */
  scrollbar-gutter: stable;
  /* 左右留白壓到最小：這一欄本來就窄，頁碼貼著邊就好 */
  padding: ${e=>e.theme.space.insetSm} 2px ${e=>e.theme.space.insetSm} 6px;
  display: flex;
  flex-direction: column;
  gap: ${lw}px;
`,vw=4,yw=6,bw=V.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  /* 縮圖上、右、下三邊跟灰底等距，灰底圓角＝縮圖圓角＋這段距離，內外兩層的弧線才是同心的 */
  padding: ${yw}px ${yw}px ${yw}px 2px;
  border-radius: ${10}px;
  cursor: ${e=>e.$draggable?`grab`:`pointer`};
  /* 「目前這一頁」用淡灰底加粗體頁碼：只是告訴老師你在哪，不用顏色——
     藍留給選取中的元件，淡黃留給按下／啟用的按鈕，畫面上的黃才不會太多 */
  background: ${e=>e.$on?e.theme.surface.sunken:`transparent`};
  color: ${e=>e.$on?e.theme.text.primary:e.theme.text.tertiary};
  transition: background 0.12s;

  /* 滑過比目前這一頁再淡一階，兩者分得出來 */
  &:hover { background: ${e=>e.$on?e.theme.surface.sunken:e.theme.surface.page}; }
  opacity: ${e=>e.$dragging?.35:1};
  /* 觸控拖曳時不要讓瀏覽器拿去捲頁 */
  touch-action: none;
  user-select: none;
`,xw=V.span`
  flex: none;
  inline-size: 16px;
  padding-block-start: 2px;
  text-align: end;
  font-size: var(--ds-typography-label-size);
  line-height: var(--ds-typography-label-line-height);
  font-weight: ${e=>e.$on?700:500};
  font-variant-numeric: tabular-nums;
  color: ${e=>e.$on?e.theme.text.primary:e.theme.text.tertiary};
`,Sw=V.button`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  padding: ${yw}px ${yw}px ${yw}px 2px;
  border: none;
  border-radius: ${10}px;
  background: transparent;
  cursor: pointer;
  font: inherit;

  &:focus-visible { outline: 2px solid ${e=>e.theme.border.focus}; outline-offset: -2px; }
`,Cw=V.span`
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 28px;
  border-radius: 999px;
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.icon.default};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
  box-sizing: border-box;
  transition: transform 0.15s, border-color 0.15s;
`,ww=V.span`
  flex: none;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  border-radius: ${vw}px;
  border: ${e=>e.theme.border.widthDefault} dashed ${e=>e.theme.border.default};
  transition: border-color 0.15s;

  ${Sw}:hover & { border-color: ${e=>e.theme.border.hover}; }
  ${Sw}:hover & ${Cw} {
    transform: scale(1.1);
    border-color: ${e=>e.theme.border.hover};
  }
`,Tw=V.span`
  position: relative;
  flex: none;
  display: block;
`,Ew=V.div`
  overflow: hidden;
  border-radius: ${vw}px;
  /* 不畫硬框，用卡片陰影讓白紙在白底上浮出來；目前這一頁的標示由外層的淡黃底負責 */
  box-shadow: ${e=>e.theme.shadow.card};
  /* 縮圖只是給人認位置的，點的是整塊，裡面不該吃到任何事件 */
  pointer-events: none;
  /* 這幾個值要跟 body（GlobalStyle）一致：縮圖要跟頁面一模一樣才有用 */
  text-align: start;
  color: ${e=>e.theme.text.primary};
  font-weight: 400;
  font-size: ${e=>e.theme.typography.bodyLgSize};
  line-height: ${e=>e.theme.typography.bodyLgLineHeight};
  white-space: normal;
`,Dw=V.span`
  position: absolute;
  inset-block-start: 4px;
  inset-inline-end: 4px;
  opacity: 0;
  transition: opacity 0.12s;

  ${bw}:hover &,
  ${bw}:focus-within & { opacity: 1; }
`,Ow=V.button`
  inline-size: 24px;
  block-size: 24px;
  /* 按鈕預設左右各 6px 內距，24px 寬扣掉後裝不下 16px 圖示，會被擠歪 */
  padding: 0;
  display: grid;
  place-items: center;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.icon.default};
  box-shadow: 0 0 0 ${e=>e.theme.border.widthDefault} ${e=>e.theme.border.subtle};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${e=>e.theme.feedback.errorSurface};
    color: ${e=>e.theme.feedback.errorDefault};
  }
  &:disabled {
    color: ${e=>e.theme.icon.disabled};
    cursor: default;
  }
`,kw=V.div`
  position: absolute;
  inset-inline: ${e=>e.theme.space.insetSm} ${e=>e.theme.space.gapXs};
  block-size: 3px;
  margin-block-start: -1.5px;
  border-radius: 2px;
  background: ${e=>e.theme.text.primary};
  pointer-events: none;
`,Aw=e=>e.depth===0?`章`:`節`;function jw(e,t){let n=Sg(e.rows,t.rowId);if(!n)return null;let r=n.columns.flatMap(e=>e.blocks).filter(e=>e.type===`text`);return r.find(e=>e.role===t.role)??r[0]??null}function Mw(e,t,n){let r=t.findIndex(e=>e.rowId===n.rowId&&e.role===n.role),i=t.slice(r+1).find(e=>e.depth<=n.depth),a=e.rows.map(e=>e.id),o=a.indexOf(n.rowId),s=i?a.indexOf(i.rowId):a.length;return o<0?[]:a.slice(o,s)}function Nw({doc:e,pages:t,current:n,onGoRow:r,dispatch:i}){let[a,o]=(0,B.useState)(null),[s,c]=(0,B.useState)(``),[l,u]=(0,B.useState)(null),d=qy(e),f=d.filter(e=>e.depth<=1),p=f.map(e=>Jy(t,e.rowId)),m=p.reduce((e,t,r)=>t>=0&&t<=n?r:e,-1),h=(0,B.useRef)(null);(0,B.useEffect)(()=>{h.current?.scrollIntoView({block:`nearest`})},[n]);let g=e=>{i&&(o(e.rowId),c(e.text))},_=t=>{o(null);let n=s.trim();if(!i||!n||n===t.text)return;let r=jw(e,t);r&&i({type:`setText`,blockId:r.id,text:n})},v=t=>Mw(e,d,t).length===0?`找不到這一段的範圍`:null,y=t=>{if(!i||v(t))return;let n=Mw(e,d,t);u({title:`刪除「${t.text}」整${Aw(t)}？`,run:()=>i({type:`deleteRows`,rowIds:n})})};return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(Pw,{children:[f.length===0&&(0,H.jsx)(Hw,{children:`尚無標題`}),f.map((e,t)=>{let n=p[t],l=t===m,u=i?v(e):null;return(0,H.jsxs)(Fw,{ref:l?h:void 0,$on:l,$depth:e.depth,children:[a===e.rowId?(0,H.jsx)(zw,{autoFocus:!0,value:s,"aria-label":`重新命名`,onChange:e=>c(e.target.value),onFocus:e=>e.target.select(),onBlur:()=>_(e),onKeyDown:t=>{t.key===`Enter`?(t.preventDefault(),_(e)):t.key===`Escape`&&(t.preventDefault(),o(null))}}):(0,H.jsxs)(Iw,{type:`button`,$on:l,$depth:e.depth,"aria-current":l?`location`:void 0,onClick:()=>r(e.rowId),onDoubleClick:()=>g(e),title:i?`點一下跳過去，點兩下改名`:void 0,children:[(0,H.jsx)(Lw,{children:e.text}),n>=0&&(0,H.jsx)(Rw,{$on:l,children:n+1})]}),i&&a!==e.rowId&&(0,H.jsx)(Bw,{title:u??`刪除整${Aw(e)}`,children:(0,H.jsx)(Vw,{type:`button`,disabled:!!u,"aria-label":`刪除「${e.text}」整${Aw(e)}`,onClick:()=>y(e),children:(0,H.jsx)(U,{name:`trash`,size:16})})})]},e.rowId)})]}),l&&(0,H.jsx)(Sd,{title:l.title,confirmLabel:`刪除`,onConfirm:()=>{l.run(),u(null)},onCancel:()=>u(null)})]})}var Pw=V.div`
  flex: 1;
  min-block-size: 0;
  overflow-y: auto;
  overflow-x: hidden;
  /* 捲軸樣式在 GlobalStyle（全站同一套）。這裡一直預留它的 6px，出現與否都不會把內容擠動 */
  scrollbar-gutter: stable;
  padding: ${e=>e.theme.space.insetSm} ${e=>e.theme.space.gapXs} ${e=>e.theme.space.insetSm} ${e=>e.theme.space.gapXs};
  display: flex;
  flex-direction: column;
  gap: 2px;
`,Fw=V.div`
  position: relative;
  display: flex;
  align-items: center;
  /* 縮排就是標題層級，不必再標「章／節」。縮在整列上，灰底才會跟著縮進去 */
  margin-inline-start: ${e=>e.$depth*12}px;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.$on?e.theme.surface.sunken:`transparent`};
  transition: background 0.12s;

  &:hover { background: ${e=>e.theme.surface.sunken}; }
`,Iw=V.button`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  text-align: start;
  font-size: var(--ds-typography-body-sm-size);
  line-height: 1.4;
  padding: 8px;
  /* 滑過時右端讓給垃圾桶，長標題在它前面就截斷，不會被壓住 */
  ${Fw}:hover & { padding-inline-end: 36px; }
  min-block-size: 36px;
  cursor: pointer;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: transparent;
  color: ${e=>e.$depth===0||e.$on?e.theme.text.primary:e.theme.text.secondary};
  font-weight: ${e=>e.$depth===0?600:e.$on?500:400};
`,Lw=V.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Rw=V.span`
  flex: none;
  color: ${e=>e.$on?e.theme.text.primary:e.theme.text.tertiary};
  font-size: var(--ds-typography-label-size);
  font-variant-numeric: tabular-nums;
  /* 滑過時讓位給垃圾桶 */
  ${Fw}:hover & { visibility: hidden; }
`,zw=V.input`
  flex: 1;
  min-inline-size: 0;
  margin: 2px;
  padding: 0 6px;
  min-block-size: 32px;
  font-size: var(--ds-typography-body-sm-size);
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.focus};
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.primary};
  outline: none;
`,Bw=V.span`
  position: absolute;
  inset-inline-end: 4px;
  inset-block-start: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.12s;

  ${Fw}:hover &,
  ${Fw}:focus-within & { opacity: 1; }
`,Vw=V.button`
  inline-size: 28px;
  block-size: 28px;
  /* 按鈕預設左右各 6px 內距，24px 寬扣掉後裝不下 16px 圖示，會被擠歪 */
  padding: 0;
  display: grid;
  place-items: center;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: transparent;
  color: ${e=>e.theme.icon.default};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${e=>e.theme.feedback.errorSurface};
    color: ${e=>e.theme.feedback.errorDefault};
  }
  &:disabled {
    color: ${e=>e.theme.icon.disabled};
    cursor: default;
  }
`,Hw=V.p`
  margin: 0;
  padding: ${e=>e.theme.space.insetSm};
  font-size: var(--ds-typography-label-size);
  line-height: 1.6;
  color: ${e=>e.theme.text.tertiary};
`,Uw=.25,Ww=10,Gw=e=>Math.max(Uw,Math.min(3,e)),Kw=e=>Math.round(e*100);function qw(e,{pageWidth:t,pageHeight:n,reserveX:r,reserveY:i,watch:a}){let[o,s]=(0,B.useState)(1),[c,l]=(0,B.useState)(1);(0,B.useEffect)(()=>{let a=e.current;if(!a)return;let o=0,c=()=>{let e=a.clientWidth-r,l=a.clientHeight-i;if(e<=0||l<=0){o=requestAnimationFrame(c);return}s(Math.min(e/t,l/n))};c(),window.addEventListener(`resize`,c),document.addEventListener(`visibilitychange`,c);let l=typeof ResizeObserver>`u`?null:new ResizeObserver(c);return l?.observe(a),()=>{cancelAnimationFrame(o),window.removeEventListener(`resize`,c),document.removeEventListener(`visibilitychange`,c),l?.disconnect()}},[e,t,n,r,i,a]);let u=(0,B.useCallback)(e=>l(Gw(Math.round(e*100)/100)),[]),d=(0,B.useCallback)(()=>l(e=>Gw((Math.floor(Kw(e)/Ww)*Ww+Ww)/100)),[]),f=(0,B.useCallback)(()=>l(e=>Gw((Math.ceil(Kw(e)/Ww)*Ww-Ww)/100)),[]),p=(0,B.useCallback)(()=>l(1),[]);return{scale:o*c,zoom:c,percent:Kw(c),setZoom:u,zoomIn:d,zoomOut:f,resetZoom:p}}var Jw=100,Yw=e=>e<=Jw?(e-Uw*100)/(Jw-Uw*100)*50:50+(e-Jw)/(300-Jw)*50,Xw=e=>e<=50?Uw*100+e/50*(Jw-Uw*100):Jw+(e-50)/50*(300-Jw);function Zw({percent:e,onZoom:t}){return(0,H.jsxs)(Qw,{"aria-label":`縮放`,"data-ui":!0,children:[(0,H.jsx)($w,{type:`range`,min:0,max:100,step:.5,value:Yw(e),style:{"--fill":`${Yw(e)}%`},onChange:e=>t(Math.round(Xw(Number(e.target.value)))/100),"aria-label":`縮放倍率`,"aria-valuetext":`${e}%`}),(0,H.jsxs)(eT,{type:`button`,onClick:()=>t(1),title:`回到 100%`,children:[e,`%`]})]})}var Qw=V.div`
  flex: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: ${e=>e.theme.surface.raised};
  writing-mode: horizontal-tb;
`,$w=V.input`
  flex: 1;
  min-inline-size: 0;
  margin: 0;
  /* 看起來細，但可以點的高度有 24px，好抓 */
  block-size: 24px;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;

  /* 滑塊左邊填一階淺灰，看得出目前拉到哪，但不搶眼 */
  &::-webkit-slider-runnable-track {
    block-size: 6px;
    border-radius: 100px;
    background: linear-gradient(
      to right,
      ${e=>e.theme.border.default} var(--fill),
      ${e=>e.theme.surface.sunken} var(--fill)
    );
  }
  &::-moz-range-progress {
    block-size: 6px;
    border-radius: 100px;
    background: ${e=>e.theme.border.default};
  }
  &::-moz-range-track {
    block-size: 6px;
    border-radius: 100px;
    background: ${e=>e.theme.surface.sunken};
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    inline-size: 14px;
    block-size: 14px;
    margin-block-start: -4px;
    border-radius: 100px;
    background: ${e=>e.theme.surface.raised};
    border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
  }
  &::-moz-range-thumb {
    inline-size: 14px;
    block-size: 14px;
    border-radius: 100px;
    background: ${e=>e.theme.surface.raised};
    border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
  }
  &:focus-visible { outline: none; }
  &:focus-visible::-webkit-slider-thumb { border-color: ${e=>e.theme.border.hover}; }
`,eT=V.button`
  min-inline-size: 34px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  text-align: end;
  font-weight: 500;
  font-size: ${e=>e.theme.typography.captionSize};
  font-variant-numeric: tabular-nums;
  color: ${e=>e.theme.text.primary};
`,tT=50,nT=120,rT=320,iT=28,aT=8;function oT({doc:e,pages:t,current:n,onGoPage:r,onGoRow:i,dispatch:a,zoom:o}){let[s,c]=(0,B.useState)(`pages`),[l,u]=(0,B.useState)(!0),[d,f]=(0,B.useState)(152),p=(0,B.useRef)(null),m=e=>{p.current={x:e.clientX,w:l?d:iT};let t=e.currentTarget;try{t.setPointerCapture(e.pointerId)}catch{}let n=e=>{let t=p.current;if(!t)return;let n=t.w+(e.clientX-t.x);if(n<96){u(!1);return}u(!0),f(Math.max(nT,Math.min(rT,n)))},r=()=>{p.current=null,window.removeEventListener(`pointermove`,n),window.removeEventListener(`pointerup`,r),window.removeEventListener(`pointercancel`,r)};window.addEventListener(`pointermove`,n),window.addEventListener(`pointerup`,r),window.addEventListener(`pointercancel`,r),e.preventDefault()},h=qy(e).filter(e=>e.depth<=1).length;return l?(0,H.jsxs)(sT,{"data-page-rail":!0,$inline:d,style:{paddingInlineEnd:aT},children:[(0,H.jsx)(cT,{children:(0,H.jsx)(iw,{compact:!0,"aria-label":`側欄內容`,value:s,options:[{value:`pages`,label:`頁面 ${t.length}`},{value:`outline`,label:`目次 ${h}`}],onChange:c})}),s===`pages`?(0,H.jsx)(gw,{doc:e,pages:t,current:n,thumbInline:d-tT,onGoPage:r,dispatch:a}):(0,H.jsx)(Nw,{doc:e,pages:t,current:n,onGoRow:i,dispatch:a}),o&&(0,H.jsx)(Zw,{...o}),(0,H.jsx)(lT,{role:`separator`,"aria-label":`調整側欄寬度`,title:`拖曳調整寬度，拖到底收合`,onPointerDown:m})]}):(0,H.jsx)(sT,{"data-page-rail":!0,$inline:iT,children:(0,H.jsx)(lT,{role:`separator`,"aria-label":`展開側欄`,title:`往右拖或點一下展開`,$vertical:!0,onPointerDown:m,onClick:()=>u(!0),children:(0,H.jsx)(U,{name:`chevron-right`,size:16})})})}var sT=V.nav`
  position: relative;
  inline-size: ${e=>e.$inline}px;
  flex: none;
  display: flex;
  flex-direction: column;
  background: ${e=>e.theme.surface.raised};
  /* 縮圖列永遠橫排，即使教材是直排——它是介面不是內容 */
  writing-mode: horizontal-tb;
`,cT=V.div`
  /* 切換鈕撐滿整欄寬 */
  display: grid;
  /* 上緣不留白：切換鈕的頂端跟右邊編輯區的灰卡切齊 */
  padding: 0 6px;
`,lT=V.div`
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  inline-size: ${e=>e.$vertical?`100%`:`${aT}px`};
  display: grid;
  place-items: center;
  cursor: col-resize;
  touch-action: none;
  color: ${e=>e.theme.icon.secondary};
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    inset-block: 0;
    inset-inline-end: 0;
    inline-size: 1px;
    background: transparent;
    transition: inline-size 0.12s, background 0.12s;
  }
  &:hover::before,
  &:active::before {
    inline-size: 3px;
    background: ${e=>e.theme.border.hover};
  }
`;function uT({samples:e,onApply:t,onClose:n}){let[r,i]=(0,B.useState)(null),[a,o]=(0,B.useState)(null),[s,c]=(0,B.useState)(null),[l,u]=(0,B.useState)(!1);(0,B.useEffect)(()=>{let e=e=>e.key===`Escape`&&n();return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[n]);let d=(e,t)=>{try{o(jg(t,{autoPageBreak:!0})),i(e),c(null)}catch{c(`這個檔案讀不進來，請確認是教材的 md 格式`),o(null),i(null)}},f=()=>{i(null),o(null),c(null)},p=async e=>{e&&d(e.name,await e.text())},m=()=>{let e=document.createElement(`input`);e.type=`file`,e.accept=`.md,text/markdown,text/plain`,e.onchange=()=>void p(e.files?.[0]),e.click()},h=a?.unrecognized.length??0,g=s??(h>0?`有 ${h} 行沒辨識出來，會當成內文`:null),_=!!r&&r in e;return(0,pi.createPortal)((0,H.jsx)(dT,{onClick:n,children:(0,H.jsxs)(fT,{role:`dialog`,"aria-modal":`true`,"aria-label":`匯入 .md 檔`,onClick:e=>e.stopPropagation(),children:[(0,H.jsxs)(pT,{children:[(0,H.jsx)(`span`,{children:`匯入 .md 檔`}),(0,H.jsx)(mT,{type:`button`,onClick:n,"aria-label":`關閉`,title:`關閉`,children:(0,H.jsx)(U,{name:`x`,size:24,label:`關閉`})})]}),(0,H.jsxs)(hT,{$over:l,onDragOver:e=>{e.dataTransfer.types.includes(`Files`)&&(e.preventDefault(),u(!0))},onDragLeave:()=>u(!1),onDrop:e=>{e.preventDefault(),u(!1),p(e.dataTransfer.files[0])},children:[(0,H.jsxs)(gT,{type:`button`,onClick:m,children:[`上傳 md 檔`,(0,H.jsx)(U,{name:`upload`,size:16})]}),r&&!_&&(0,H.jsx)(_T,{children:r})]}),(0,H.jsx)(vT,{role:`group`,"aria-label":`內建範例`,children:Object.keys(e).map(t=>(0,H.jsx)(yT,{type:`button`,$on:r===t,"aria-pressed":r===t,onClick:()=>r===t?f():d(t,e[t]),children:t},t))}),g&&(0,H.jsx)(bT,{role:`alert`,children:g}),(0,H.jsxs)(xT,{children:[(0,H.jsx)(ST,{type:`button`,onClick:n,children:`取消`}),(0,H.jsx)(CT,{type:`button`,disabled:!a,onClick:()=>a&&t(a),children:`匯入`})]})]})}),document.body)}var dT=V.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: ${xd};
  display: grid;
  place-items: center;
  padding: ${e=>e.theme.space.insetLg};
`,fT=V.div`
  inline-size: min(480px, 100%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${e=>e.theme.space.insetLg};
  background: ${e=>e.theme.surface.page};
  border-radius: ${e=>e.theme.radius.panel};
  box-shadow: ${e=>e.theme.shadow.float};
`,pT=V.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${e=>e.theme.typography.bodyLgSize};
  line-height: ${e=>e.theme.typography.bodyLgLineHeight};
`,mT=V.button`
  display: grid;
  place-items: center;
  inline-size: 24px;
  block-size: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
`,hT=V.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.space.gapSm};
  block-size: 128px;
  padding: ${e=>e.theme.space.insetMd};
  box-sizing: border-box;
  border: ${e=>e.theme.border.widthDefault} dashed
    ${e=>e.$over?e.theme.border.hover:e.theme.border.default};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.$over?e.theme.surface.sunken:e.theme.surface.raised};
  text-align: center;
`,gT=V.button`
  ${bs}
  flex: none;
`,_T=V.span`
  max-inline-size: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.tertiary};
`,vT=V.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space.gapSm};
`,yT=V.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  min-block-size: 40px;
  padding: 0 12px;
  cursor: pointer;
  white-space: nowrap;
  border-radius: ${e=>e.theme.radius.control};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.$on?e.theme.border.accent:e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.$on?e.theme.text.accent:e.theme.text.secondary};
  transition: border-color 0.12s, color 0.12s;
  &:hover {
    border-color: ${e=>e.theme.border.accent};
    color: ${e=>e.theme.text.accent};
  }
  /* 滑鼠點了不畫焦點外框（有些瀏覽器會，跟選取的深綠框疊成兩圈）；鍵盤切過來才畫 */
  &:focus:not(:focus-visible) { outline: none; }
`,bT=V.p`
  margin: -8px 0 0;
  text-align: center;
  font-size: ${e=>e.theme.typography.labelSize};
  line-height: ${e=>e.theme.typography.labelLineHeight};
  font-weight: 500;
  color: ${e=>e.theme.feedback.errorDefault};
`,xT=V.footer`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.space.gapSm};
`,ST=V.button`
  border: none;
  background: transparent;
  color: ${e=>e.theme.action.ghostText};
  font-size: var(--ds-typography-label-size);
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.control};
  padding: 0 20px;
  min-block-size: ${e=>e.theme.control.heightMd};
  &:hover { background: ${e=>e.theme.action.ghostBgHover}; }
`,CT=V.button`
  ${bs}
  min-block-size: ${e=>e.theme.control.heightMd};
  font-size: var(--ds-typography-label-size);
`;function wT({doc:e,onPatch:t,onMeta:n,onClose:r,onImport:i,publisherLocked:a}){uc(!0,r),(0,B.useEffect)(()=>{let e=e=>{e.key===`Escape`&&r()};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[r]);let o=e.settings,s=e.meta,c=s.stage===`國中`?[`1`,`2`,`3`]:[`1`,`2`,`3`,`4`,`5`,`6`],l=TT[s.stage===`國中`?`國中`:`國小`],u=s.subject&&!l.includes(s.subject)?[s.subject,...l]:l;return(0,pi.createPortal)((0,H.jsxs)(dc,{role:`dialog`,"aria-label":`教材設定`,children:[(0,H.jsxs)(fc,{children:[(0,H.jsx)(pc,{children:`設定`}),(0,H.jsx)(mc,{onClick:r,"aria-label":`關閉`,children:(0,H.jsx)(U,{name:`x`,size:24,label:`關閉`})})]}),(0,H.jsxs)(hc,{children:[(0,H.jsxs)(OT,{children:[(0,H.jsx)(kT,{children:`版型`}),(0,H.jsx)(iw,{"aria-label":`版型`,value:o.layout??`paged`,options:[{value:`paged`,label:`自動切頁`},{value:`flow`,label:`流式排版`}],onChange:e=>t({layout:e})})]}),(0,H.jsxs)(OT,{children:[(0,H.jsx)(kT,{children:`排版`}),(0,H.jsx)(iw,{"aria-label":`排版`,value:o.writingMode,options:[{value:`horizontal`,label:`橫排`},{value:`vertical`,label:`直排`}],onChange:e=>t({writingMode:e})})]}),(0,H.jsxs)(OT,{children:[(0,H.jsxs)(kT,{children:[`頁面比例`,(0,H.jsxs)(AT,{type:`button`,"aria-label":`頁面比例怎麼選`,"aria-describedby":`ratio-hint`,children:[(0,H.jsx)(U,{name:`info`,size:16}),(0,H.jsx)(jT,{id:`ratio-hint`,role:`tooltip`,children:`學生使用 iPad 選 4:3，Chromebook 選 16:9。`})]})]}),(0,H.jsx)(iw,{"aria-label":`頁面比例`,value:o.aspectRatio,options:[`4:3`,`16:9`].map(e=>({value:e,label:e})),onChange:e=>t({aspectRatio:e})})]}),(0,H.jsxs)(OT,{children:[(0,H.jsxs)(DT,{children:[`出版社`,(0,H.jsx)(ET,{value:s.publisher??``,disabled:a,onChange:e=>n({publisher:e.target.value}),placeholder:`出版社名稱`})]}),(0,H.jsxs)(DT,{as:`div`,children:[`適用年級`,(0,H.jsxs)(MT,{children:[(0,H.jsx)(a_,{"aria-label":`教育階段`,placeholder:`階段`,value:s.stage??``,options:[`國小`,`國中`].map(e=>({value:e,label:e})),onChange:e=>n({stage:e||void 0,grade:void 0,subject:s.subject&&TT[e===`國中`?`國中`:`國小`].includes(s.subject)?s.subject:void 0})}),(0,H.jsx)(a_,{"aria-label":`年級`,placeholder:`年級`,value:s.grade??``,options:c.map(e=>({value:e,label:`${e} 年級`})),onChange:e=>n({grade:e||void 0})}),(0,H.jsx)(a_,{"aria-label":`學期`,placeholder:`學期`,value:s.term??``,options:[{value:`上`,label:`上學期`},{value:`下`,label:`下學期`}],onChange:e=>n({term:e||void 0})})]})]}),(0,H.jsxs)(DT,{as:`div`,children:[`科目`,(0,H.jsx)(a_,{"aria-label":`科目`,placeholder:`選擇科目`,value:s.subject??``,options:u.map(e=>({value:e,label:e})),onChange:e=>n({subject:e||void 0})})]})]}),i&&(0,H.jsxs)(OT,{children:[(0,H.jsx)(kT,{children:`匯入教材`}),(0,H.jsxs)(NT,{type:`button`,onClick:i,children:[`匯入 .md 檔`,(0,H.jsx)(U,{name:`upload`,size:16})]})]})]})]}),document.body)}var TT={國小:[`國語`,`英語`,`數學`,`自然`,`社會`],國中:[`國文`,`英文`,`數學`,`歷史`,`地理`]},ET=V.input`
  ${vc}
  &:disabled {
    background: ${e=>e.theme.surface.disabled};
    color: ${e=>e.theme.text.disabled};
    border-color: transparent;
    cursor: not-allowed;
  }
`,DT=V.label`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  font-size: var(--ds-typography-label-size);
  font-weight: var(--ds-typography-label-weight);
  color: ${e=>e.theme.text.secondary};
`,OT=V.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
`,kT=V.span`
  display: inline-flex;
  align-items: center;
  font-size: var(--ds-typography-label-size);
  font-weight: var(--ds-typography-label-weight);
  color: ${e=>e.theme.text.secondary};
`,AT=V.button`
  position: relative;
  /* 圖示的圓只佔外框 20/24，放大到 1.1em，圓才跟中文字一樣高 */
  inline-size: 1.1em;
  block-size: 1.1em;
  margin-inline-start: 4px;
  display: grid;
  place-items: center;
  font-size: inherit;
  padding: 0;
  border: none;
  background: transparent;
  color: ${e=>e.theme.icon.secondary};
  cursor: help;

  svg { inline-size: 100%; block-size: 100%; }
  &:hover, &:focus-visible { color: ${e=>e.theme.icon.default}; }
`,jT=V.span`
  position: absolute;
  inset-block-start: calc(100% + 6px);
  inset-inline-start: -8px;
  z-index: 10;
  padding: 8px 12px;
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.page};
  box-shadow: ${e=>e.theme.shadow.float};
  color: ${e=>e.theme.text.primary};
  font-size: var(--ds-typography-label-size);
  font-weight: 400;
  line-height: 1.5;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.12s;

  ${AT}:hover &,
  ${AT}:focus & { opacity: 1; }
`,MT=V.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${e=>e.theme.space.gapXs};
`,NT=V.button`
  ${bs}
`,PT=4,FT=(0,B.forwardRef)(function({children:e},t){let n=Lh(),r=(0,B.useRef)(null),[i,a]=(0,B.useState)(!1),o=(0,B.useRef)(null),s=e=>{o.current!==e&&(o.current=e,n?.setHoverGap(e))},c=async(e,t,r)=>{if(!n)return;let i=IT(t,r),a=(await Promise.all(e.map((e,t)=>km(n,e,i+t)))).filter(Boolean).pop()?.blockId??null;a&&n.select(a)};return(0,H.jsx)(LT,{ref:t,$dragOver:i,onDragOver:e=>{e.dataTransfer.types.includes(`Files`)&&(e.preventDefault(),e.dataTransfer.dropEffect=`copy`,i||a(!0))},onDragLeave:e=>{e.currentTarget.contains(e.relatedTarget)||a(!1)},onDrop:e=>{e.dataTransfer.types.includes(`Files`)&&(e.preventDefault(),a(!1),c([...e.dataTransfer.files],e.clientX,e.clientY))},style:n?.hoverGap!==null&&n?.hoverGap!==void 0?{cursor:`pointer`}:void 0,onPointerMove:e=>{if(!(!n||e.pointerType===`touch`)){if(n.insertAt!==null||n.draggingRowId||e.target.closest(`[data-block-id], button, input, select, textarea, [contenteditable], [data-ui], a`))return s(null);s(IT(e.clientX,e.clientY))}},onPointerLeave:()=>s(null),onPointerDown:e=>{if(!n)return;let t=document.activeElement?.isContentEditable??!1;r.current={x:e.clientX,y:e.clientY,wasOpen:n.insertAt!==null,wasSelected:!!n.selectedBlockId||!!n.inlineSelection||t}},onClick:e=>{let t=r.current;if(r.current=null,!n||!t||Math.hypot(e.clientX-t.x,e.clientY-t.y)>PT)return;let i=e.target;if(!i.closest(`button, input, select, textarea, [contenteditable], [data-ui], a`)){if(i.closest(`[data-block-id]`)){t.wasOpen&&n.openInsert(null);return}if(t.wasOpen){n.openInsert(null);return}if(t.wasSelected){n.deselect();return}s(null),n.openInsert(IT(e.clientX,e.clientY))}},children:e})});function IT(e,t){let n=[...document.querySelectorAll(`main [data-page-index]`)],r=null,i=1/0;for(let a of n){let n=a.getBoundingClientRect(),o=t<n.top?n.top-t:t>n.bottom?t-n.bottom:0,s=e<n.left?n.left-e:e>n.right?e-n.right:0,c=Math.hypot(s,o);c<i&&(i=c,r=a)}if(r){let t=[...r.querySelectorAll(`[data-flow-panel]`)];if(t.length>0){let n=1/0,i=null;for(let r of t){let t=r.getBoundingClientRect(),a=e<t.left?t.left-e:e>t.right?e-t.right:0;a<n&&(n=a,i=r)}i&&(r=i)}}let a=[...(r??document).querySelectorAll(`[data-row-id]`)];if(a.length===0)return 0;let o=getComputedStyle(a[0]).writingMode.startsWith(`vertical`),s=o?-e:t,c=null;for(let e of a){let t=e.getBoundingClientRect(),n=o?-t.right:t.top,r=o?-t.left:t.bottom,i=s<n?n-s:s>r?s-r:0,a=Number(e.dataset.rowIndex);(!c||i<c.dist)&&(c={r:t,index:a,dist:i})}if(!c)return 0;let l=s>(o?-(c.r.left+c.r.width/2):c.r.top+c.r.height/2)?c.index+1:c.index,u=Number(a[0].dataset.rowIndex);return r?.closest(`[data-page-index]`)?.getAttribute(`data-page-index`)===`0`?l:Math.max(u+1,l)}var LT=V.main`
  flex: 1;
  min-block-size: 0;
  overflow: auto;
  /* 左右的 56px 留白不放這裡，放在 App 的 PageSlot 上：可捲動的 flex 容器捲到最右時
     不算自己右側的 padding，放大後頁面右緣會直接貼到編輯區邊界、看起來捲不過去 */
  padding: ${e=>e.theme.space.insetXl} 0;
  background: ${e=>e.$dragOver?e.theme.surface.muted:e.theme.surface.backdrop};
  /* 編輯區是一塊灰卡，右邊留白；下緣貼齊視窗底，左右兩邊筆直到底，只有上方兩角是圓的 */
  border-start-start-radius: ${e=>e.theme.radius.panel};
  border-start-end-radius: ${e=>e.theme.radius.panel};
  margin-inline-end: ${e=>e.theme.space.insetLg};
  /* 拖檔案進來時在內緣畫一圈，用 inset 的 box-shadow 不佔版面 */
  box-shadow: ${e=>e.$dragOver?`inset 0 0 0 ${e.theme.border.widthEmphasis} ${e.theme.border.hover}`:`none`};
  display: flex;
  flex-direction: column;
  /* 放大到比編輯區還寬時，一般的 center 會把左緣推到捲不到的地方；
     safe 讓它改成靠左起算，整頁都捲得到 */
  align-items: safe center;
  gap: 32px;
`,RT=[{label:`白`,color:null},{label:`灰`,color:`#F5F5F5`},{label:`米`,color:`#FBF7EE`},{label:`萊姆`,color:`#F9FFCF`},{label:`琥珀`,color:`#FDF3D1`},{label:`橘`,color:`#FFE7DA`},{label:`森林`,color:`#D9F3E8`},{label:`天藍`,color:`#D6F5FB`},{label:`紫`,color:`#E6E2F8`}];function zT({value:e,disabled:t,onChange:n}){let[r,i]=(0,B.useState)(!1),a=(0,B.useRef)(null),[o,s]=(0,B.useState)(null);(0,B.useEffect)(()=>{if(!r)return;let e=()=>{let e=a.current?.getBoundingClientRect();e&&s({top:e.bottom+8,left:e.left})};e();let t=e=>{let t=e.target;t.closest(`[data-bg-popover]`)||t===a.current||i(!1)},n=e=>e.key===`Escape`&&i(!1);return window.addEventListener(`pointerdown`,t,!0),window.addEventListener(`keydown`,n),window.addEventListener(`scroll`,e,!0),()=>{window.removeEventListener(`pointerdown`,t,!0),window.removeEventListener(`keydown`,n),window.removeEventListener(`scroll`,e,!0)}},[r]);let c=!!(e?.color||e?.assetId),l=e?.color&&!RT.some(t=>t.color===e.color)?e.color:null,u=(0,B.useRef)(null);return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(BT,{ref:a,type:`button`,"data-ui":!0,disabled:t,$open:r,$has:c,onClick:()=>i(e=>!e),title:t?`這一頁接續上一段，背景跟著上一頁`:`當頁背景`,"aria-label":`當頁背景`,children:[(0,H.jsx)(U,{name:`palette`,size:16}),c&&(0,H.jsx)(VT,{style:{background:e?.assetId?`center / cover url(${ja(e.assetId)})`:e?.color}})]}),r&&o&&(0,pi.createPortal)((0,H.jsxs)(HT,{"data-bg-popover":!0,"data-ui":!0,style:o,role:`dialog`,"aria-label":`當頁背景`,children:[(0,H.jsxs)(UT,{children:[RT.map(t=>(0,H.jsx)(WT,{type:`button`,title:t.label,$on:(e?.color??null)===t.color&&!e?.assetId,style:{background:t.color??`#fff`},onClick:()=>n(t.color?{color:t.color}:null)},t.label)),(0,H.jsxs)(GT,{type:`button`,title:`自訂顏色`,$on:!!l&&!e?.assetId,style:l?{background:l}:void 0,onClick:()=>u.current?.click(),children:[!l&&(0,H.jsx)(U,{name:`plus`,size:16}),(0,H.jsx)(`input`,{ref:u,type:`color`,value:l??`#ffffff`,onChange:e=>n({color:e.target.value}),"aria-label":`自訂顏色`,tabIndex:-1})]})]}),(0,H.jsxs)(JT,{children:[c&&(0,H.jsxs)(YT,{type:`button`,onClick:()=>n(null),children:[`清除`,(0,H.jsx)(U,{name:`x`,size:16})]}),(0,H.jsxs)(qT,{type:`button`,onClick:async()=>{let t=await Ha(`image/*`);if(!t)return;let{assetId:r}=await Va(t);n({...e?.color?{color:e.color}:{},assetId:r})},children:[`上傳圖片`,(0,H.jsx)(U,{name:`upload`,size:16})]})]})]}),document.body)]})}var BT=V.button`
  position: absolute;
  inset-inline-start: -40px;
  inset-block-start: 0;
  inline-size: 28px;
  block-size: 28px;
  /* 按鈕預設左右各 6px 內距，28px 扣掉後裝不下 20px 圖示，會被擠歪 */
  padding: 0;
  display: grid;
  place-items: center;
  border-radius: ${e=>e.theme.radius.field};
  border: ${e=>e.theme.border.widthFocus} solid
    ${e=>e.$open?e.theme.border.selected:e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
  opacity: ${e=>e.$open||e.$has?1:.35};
  transition: opacity 0.12s, border-color 0.12s;

  &:hover:not(:disabled) {
    opacity: 1;
    border-color: ${e=>e.$open?e.theme.border.selected:e.theme.border.hover};
  }
  &:focus-visible {
    outline: none;
    opacity: 1;
    border-color: ${e=>e.theme.border.selected};
  }
  &:disabled {
    cursor: default;
    opacity: 0.35;
    color: ${e=>e.theme.icon.disabled};
    border-color: ${e=>e.theme.border.subtle};
  }
`,VT=V.span`
  position: absolute;
  inset-inline-end: -4px;
  inset-block-end: -4px;
  inline-size: 12px;
  block-size: 12px;
  border-radius: 999px;
  border: 2px solid ${e=>e.theme.surface.raised};
  box-shadow: 0 0 0 1px ${e=>e.theme.border.subtle};
`,HT=V.div`
  position: fixed;
  z-index: 900;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetSm};
  border-radius: ${e=>e.theme.radius.panel};
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${e=>e.theme.surface.page};
  /* 跟其他選單（Dropdown、文字工具的彈窗）同一款：白底圓角、用選單共用的浮層陰影（細線＋兩層陰影） */
  box-shadow: ${e=>e.theme.shadow.popover};
  writing-mode: horizontal-tb;
`,UT=V.div`
  ${_p}
`,WT=V.button`
  ${hp}
`,GT=V(WT)`
  ${gp}
`,KT=In`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: inherit;
  font-size: var(--ds-typography-label-size);
  min-block-size: ${e=>e.theme.control.heightSm};
  padding: 0 10px;
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.control};
`,qT=V.button`
  ${KT}
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.action.primaryBg};
  background: ${e=>e.theme.action.primaryBg};
  color: ${e=>e.theme.action.primaryText};
  &:hover {
    background: ${e=>e.theme.action.primaryBgHover};
    border-color: ${e=>e.theme.action.primaryBgHover};
  }
`,JT=V.div`
  display: flex;
  gap: 6px;

  & > * { flex: 1; justify-content: center; }
`,YT=V.button`
  ${KT}
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.secondary};
  /* 次要按鈕的滑過：品牌深綠的框與字（跟「新增補充」「插入標籤」同一款） */
  &:hover { border-color: ${e=>e.theme.border.accent}; color: ${e=>e.theme.text.accent}; }
`;function XT(e){let t=e=>e.type===`text`&&e.spans.some(e=>e.keyword&&e.text.includes(`星座`)),n=e.rows.find(e=>e.columns.some(e=>e.blocks.some(e=>e.type===`text`&&Ni(e).includes(`用星圖找星座`))))?.id??null,r=[{id:`star-pop-1`,kind:`text`,title:`什麼是星座？`,body:`國際天文聯合會把整片天空劃分成 88 個星座，天上的每一顆星都屬於其中一個。同一個星座裡的星星看起來靠在一起，其實離我們的距離可能差很多。`},{id:`star-pop-1b`,kind:`text`,title:`星座和星等不一樣`,body:`星座是天空的分區，星等是星星有多亮。數字越小越亮，最亮的星甚至是負的星等。`}],i=[{id:`star-pop-2`,kind:`image`,title:`把星星連起來：獵戶座`,assetId:`images/orion-lines.jpg`},{id:`star-pop-3`,kind:`image`,title:`古人畫的星座圖（1824 年）`,assetId:`images/star-chart.jpg`}],a=[{id:`star-pop-4`,kind:`web`,title:`臺北市立天文科學教育館`,url:`https://www.tam.gov.taipei/`,embeddable:!1},{id:`star-pop-4b`,kind:`web`,title:`維基百科：夏季大三角`,url:`https://zh.wikipedia.org/zh-tw/夏季大三角`,embeddable:!0}],o=n?[{id:`star-pop-5`,kind:`jump`,title:`怎麼用星圖找星座`,targetRowId:n}]:[],s=[{id:`star-pop-6`,kind:`video`,title:`星軌縮時`,source:`upload`,ref:`sample-video-star-trails`},{id:`star-pop-6b`,kind:`video`,title:`星軌縮時（再看一次）`,source:`upload`,ref:`sample-video-star-trails`}],c=[{id:`star-pop-10`,kind:`audio`,title:`三顆主角星`,assetId:`sample-audio-vega`}],l=[{id:`star-pop-7`,kind:`audio`,title:`夏季大三角旁白`,assetId:`sample-audio-narration`},{id:`star-pop-8`,kind:`audio`,title:`三顆主角星`,assetId:`sample-audio-vega`}],u=(e,t,n=`body`)=>({...Mi(t,n),id:e}),d=[[u(`rich-1-h`,`夏季大三角怎麼找`,`sectionTitle`),{id:`rich-1-img`,type:`image`,assetId:`images/orion-lines.jpg`,alt:`把星星連成圖案`,caption:``,hasCaption:!1,aspectRatio:3/2,widthPct:40,float:`left`,popups:[]},u(`rich-1-p`,`夏天晚上八、九點往東方天空看，先找最亮的織女星，再往下找牛郎星，最後在兩顆星的左邊找到天津四。把三顆星連起來，就是一個大大的三角形。這三顆星分別屬於天琴座、天鷹座和天鵝座。`)],[u(`rich-2-h`,`看看星星怎麼移動`,`sectionTitle`),{id:`rich-2-v`,type:`video`,source:`upload`,ref:`sample-video-star-trails`,title:`星軌縮時`,widthPct:55,float:`right`,popups:[]},u(`rich-2-p`,`把相機對著天空連續拍一整晚，星星會畫出一圈一圈的弧線。這是因為地球在自轉，星星看起來就繞著北極星轉。`),{id:`rich-2-a`,type:`audio`,assetId:`sample-audio-narration`,title:`夏季大三角旁白`,widthPct:40,popups:[]}],[u(`rich-3-h`,`想知道更多`,`sectionTitle`),u(`rich-3-p`,`到天文館看看星象儀，或上網查夏季大三角的資料。`),{id:`rich-3-w`,type:`web`,url:`https://www.tam.gov.taipei/`,title:`臺北市立天文科學教育館`,presentation:`bookmark`,chosen:!0,widthPct:60,popups:[]}]],f=[{id:`star-pop-9`,kind:`rich`,title:`夏季大三角小百科`,blocks:d[0],pages:d}],p=e=>e.slice(0,1),m=[{id:`star-pop-11`,kind:`text`,title:``,body:`沒寫標題的文字補充：泡泡裡直接是內文，不補「文字」兩個字。`}],h=[{id:`star-pop-12`,kind:`image`,title:`夏季大三角`,assetId:`images/summer-triangle.jpg`}],g=[...i,{id:`star-pop-13`,kind:`image`,title:``,assetId:`images/star-trails.jpg`}],_=n?[...o,{id:`star-pop-14`,kind:`jump`,title:`回到課文開頭`,targetRowId:e.rows[0]?.id??null}]:[],v=[r,g,a,o,s,l,f,c,m,h,p(s).map(e=>({...e,id:`star-pop-15`})),p(a).map(e=>({...e,id:`star-pop-16`})),_].filter(e=>e.length>0),y=e.rows.flatMap(e=>e.columns.flatMap(e=>e.blocks)),b=y.findIndex(t);if(b<0)return ZT(e);let x=new Map,S=y.slice(b).filter(e=>e.type===`text`||e.type===`image`);v.forEach((e,t)=>{S[t]&&x.set(S[t].id,e)});let C=e.rows.map(e=>({...e,columns:e.columns.map(e=>({...e,blocks:e.blocks.map(e=>x.has(e.id)?{...e,popups:x.get(e.id)}:e)}))}));return{...e,rows:C}}function ZT(e){let t=e.rows.flatMap(e=>e.columns.flatMap(e=>e.blocks)),n=e=>t.find(t=>t.type===`text`&&Ni(t).replace(/^\s+/,``).startsWith(e)),r=t=>e.rows.find(e=>e.columns.some(e=>e.blocks.some(e=>e===n(t))))?.id??null,i=new Map,a=(e,t)=>{let r=n(e);r&&t.length>0&&i.set(r.id,t)},o=(e,t,n=`body`)=>({...Mi(t,n),id:e}),s=(e,t,n,r)=>({id:e,type:`image`,assetId:t,alt:n,caption:``,hasCaption:!1,aspectRatio:r,widthPct:45,float:`right`,popups:[]}),c=[[o(`ml-rich-1-h`,`換回女裝的木蘭`,`sectionTitle`),s(`ml-rich-1-img`,`images/mulan-silk-painting.jpg`,`清代絹本設色的木蘭像`,699/1200),o(`ml-rich-1-p`,`「脫我戰時袍，著我舊時裳。當窗理雲鬢，對鏡貼花黃。」這幅清代的絹畫裡，木蘭穿著女裝，身上仍背著弓箭。`)],[o(`ml-rich-2-h`,`木蘭當戶織`,`sectionTitle`),s(`ml-rich-2-img`,`images/mulan-loom.jpg`,`明清時期的木織機`,1200/800),o(`ml-rich-2-p`,`詩一開頭的「唧唧」是織布機的聲音。照片是杭州國家版本館展出的木織機。`)]];a(`題解`,[{id:`ml-pop-img-1`,kind:`image`,title:`木蘭像（1772 年木刻版畫）`,assetId:`images/mulan-portrait.jpg`}]),a(`本詩選自`,[{id:`ml-pop-text-1`,kind:`text`,title:`什麼是樂府`,body:`樂府原本是漢代掌管音樂的官署，負責採集各地民歌配樂演唱。後來把這些可以入樂的詩歌也稱為「樂府」。`},{id:`ml-pop-text-2`,kind:`text`,title:`樂府雙璧`,body:`〈木蘭詩〉與〈孔雀東南飛〉都是長篇的樂府敘事詩，一北一南，後人合稱「樂府雙璧」。`}]),a(`萬里赴戎機`,[{id:`ml-pop-video-1`,kind:`video`,title:`敦煌的漢代長城`,source:`upload`,ref:`sample-video-mulan-wall`},{id:`ml-pop-video-2`,kind:`video`,title:`草原上的馬群`,source:`upload`,ref:`sample-video-mulan-horses`}]),a(`爺孃聞女來`,[{id:`ml-pop-rich-1`,kind:`rich`,title:`木蘭的樣子`,blocks:c[0],pages:c}]);let l=r(`唧唧復唧唧`);l&&a(`雄兔腳撲朔`,[{id:`ml-pop-jump-1`,kind:`jump`,title:`回到課文開頭`,targetRowId:l}]),a(`語文小視窗`,[{id:`ml-pop-web-1`,kind:`web`,title:`維基百科：木蘭辭`,url:`https://zh.wikipedia.org/zh-tw/木蘭辭`,embeddable:!0},{id:`ml-pop-web-2`,kind:`web`,title:`維基文庫：木蘭詩全文`,url:`https://zh.wikisource.org/zh-hant/木蘭詩`,embeddable:!1}]);let u=r(`東市買駿馬`),d=r(`萬里赴戎機`),f=[];u&&f.push({id:`ml-pop-jump-2`,kind:`jump`,title:`回到「東市買駿馬」`,targetRowId:u}),d&&f.push({id:`ml-pop-jump-3`,kind:`jump`,title:`回到「將軍百戰死」`,targetRowId:d}),a(`互文是`,f);let p=new Map,m={唧唧復唧唧:`sample-audio-mulan-recite-1`,東市買駿馬:`sample-audio-mulan-recite-2`,萬里赴戎機:`sample-audio-mulan-recite-3`,歸來見天子:`sample-audio-mulan-recite-4`,爺孃聞女來:`sample-audio-mulan-recite-5`,雄兔腳撲朔:`sample-audio-mulan-recite-6`},h=(e,t)=>{let r=n(e);r&&p.set(r.id,{paragraph:`start`,paraNotes:t,...m[e]?{readAloud:m[e]}:{}})};h(`唧唧復唧唧`,{zhi:`木蘭停下織布嘆息，因為父親被徵召，決定代父從軍。`,xiu:`設問：「問女何所思？問女何所憶？」先提出疑問，再由木蘭自己回答。`,wen:`一、木蘭為什麼停下織布嘆息？
二、她最後做了什麼決定？`}),h(`東市買駿馬`,{zhi:`木蘭備齊鞍馬出征，一路上思念爹娘。`,xiu:`互文：東、西、南、北四市各買一樣，意思是跑遍各處市集把裝備買齊。`,ju:`「不聞……，但聞……」：聽不到爹娘的呼喚，只聽得到水聲、馬鳴，寫出離家越來越遠的思念。`}),h(`萬里赴戎機`,{zhi:`木蘭在邊塞征戰多年。`,xiu:`誇飾：「萬里赴戎機，關山度若飛」，寫行軍又遠又快。
對偶：「朔氣傳金柝，寒光照鐵衣」。`}),h(`歸來見天子`,{zhi:`木蘭立功歸來，不要官位，只想回到故鄉。`,wen:`木蘭為什麼不接受尚書郎的官位？從這裡可以看出她是怎樣的人？`}),h(`爺孃聞女來`,{zhi:`家人歡迎木蘭回家，木蘭換回女裝，同袍大為驚訝。`,xiu:`排比：「爺孃聞女來」「阿姊聞妹來」「小弟聞姊來」，依序寫家人的歡迎。`,ju:`「開我……，坐我……」「脫我……，著我……」：一連串的「我」，寫木蘭回到自己家的熟悉與歡喜。`,wen:`同袍為什麼「皆驚惶」？`}),h(`雄兔腳撲朔`,{zhi:`用雙兔並跑難辨雄雌作比，收束全詩。`,xiu:`譬喻：以雙兔並跑比喻男女在戰場上難以分辨。
設問：「安能辨我是雄雌？」答案在問題的反面。`});let g=[{id:`ml-note-loom`,phrase:`唧唧復唧唧，木蘭當戶織`,note:{kind:`sentence`,body:``,notes:{xiu:`摹寫：「唧唧」摹寫織布機的聲音。`}},popups:[{id:`ml-pop-audio-1`,kind:`audio`,title:`織布機的聲音`,assetId:`sample-audio-mulan-loom`}]},{id:`ml-note-zhu`,phrase:`機杼`,note:{kind:`word`,body:`織布機。杼，織布的梭子。`},popups:[{id:`ml-pop-img-loom`,kind:`image`,title:`明清時期的木織機`,assetId:`images/mulan-loom.jpg`},{id:`ml-pop-img-weaver`,kind:`image`,title:`雲南麗江，在織機前織布的婦女`,assetId:`images/mulan-weaver.jpg`}]},{id:`ml-note-jian`,phrase:`鞍韉`,note:{kind:`word`,body:`馬鞍和馬鞍下的墊子。`}},{id:`ml-word-river`,phrase:`黃河`,popups:[{id:`ml-pop-img-2`,kind:`image`,title:`黃河（壺口瀑布）`,assetId:`images/mulan-yellow-river.jpg`}]},{id:`ml-note-neigh`,phrase:`但聞燕山胡騎鳴啾啾`,note:{kind:`sentence`,body:``,notes:{}},popups:[{id:`ml-pop-audio-2`,kind:`audio`,title:`馬的嘶鳴`,assetId:`sample-audio-mulan-neigh`}]},{id:`ml-note-dan`,phrase:`旦辭黃河去，暮至黑山頭`,note:{kind:`sentence`,body:``,notes:{ju:`「旦……，暮……」：早晚兩個時間對舉，寫出行軍的迅速。`}}},{id:`ml-note-yuan`,phrase:`願為市鞍馬，從此替爺征`,note:{kind:`sentence`,body:``,notes:{wen:`木蘭可以不去，為什麼還是決定替父親從軍？`}}},{id:`ml-note-1`,phrase:`將軍百戰死，壯士十年歸`,note:{kind:`sentence`,body:``,notes:{xiu:`互文：將軍和壯士都身經百戰，有的戰死，有的多年後才歸來。`}}},{id:`ml-note-xun`,phrase:`策勳十二轉`,note:{kind:`word`,body:`記功時勳位連升了很多級。「十二」和詩中的「軍書十二卷」「同行十二年」一樣，是表示多的虛數，不是實際的數目。`}}],_=e=>{let t=e;for(let e of g){let n=Gr(t.spans).indexOf(e.phrase);if(n<0)continue;let r=n+e.phrase.length,i=t.spans;e.note&&(i=Xr(i,n,r,{noteId:e.id}));let a=e.popups?.[0]?.id;a&&(i=Xr(i,n,r,{popupId:a}));let o=(e.popups??[]).map((e,t)=>t===0?e:{...e,wordGroup:a});t={...t,spans:i,rangeNotes:e.note?[...t.rangeNotes??[],{id:e.id,...e.note}]:t.rangeNotes,popups:[...t.popups,...o]}}return t};if(i.size===0&&p.size===0)return e;let v=e.rows.map(e=>({...e,columns:e.columns.map(e=>({...e,blocks:e.blocks.map(e=>{let t=i.has(e.id)?{...e,popups:i.get(e.id)}:e;return t.type===`text`&&p.has(e.id)&&(t={...t,...p.get(e.id)}),t.type===`text`&&t.paragraph&&(t=_(t)),t})}))})),y=v.findIndex(e=>e.columns.some(e=>e.blocks.some(e=>e.type===`text`&&Ni(e).trim()===`題解`))),b=v[y+1],x=b?.columns.length===1?b.columns[0].blocks[0]:void 0;if(y>=0&&b&&x?.type===`text`&&Ni(x).trim().startsWith(`本詩選自`)){let e=v[y],t={...e,columns:[{...e.columns[0],widthPct:12},{...b.columns[0],widthPct:88}]};v.splice(y,2,t)}return{...e,rows:v}}var QT=Object.assign({"../design/sample-demo.md":Kn,"../design/sample-mulan.md":qn}),$T=Object.fromEntries([[`sample-mulan`,`國文（範例・直排）`],[`sample-demo`,`自然（範例・橫排）`]].flatMap(([e,t])=>{let n=QT[`../design/${e}.md`];return n?[[t,n]]:[]}));function eE({bookId:e,initialDoc:t,startReading:n=!1,readOnly:r=!1,onEnterEdit:i}){let[a,o]=(0,B.useState)(n||r),[s,c]=(0,B.useState)(0),[l,u]=(0,B.useState)(!1),[d,f]=(0,B.useState)(!1),[p]=(0,B.useState)(()=>(LC(r?null:e),t)),m=qg(p),{doc:h,dispatch:g,undo:_,redo:v,canUndo:y,canRedo:b}=m,x=(0,B.useCallback)(e=>h.rows.findIndex(t=>t.id===e),[h.rows]),S=(0,B.useRef)(null),C=oE(S,a&&h.settings.layout===`flow`),{pages:w}=bg(h,C?.size),T=!!e&&vC(e)?.kind===`original`,E=e=>g({type:`setSettings`,patch:e}),D=Jn[h.settings.aspectRatio],{scale:O,percent:k,setZoom:A,zoomIn:j,zoomOut:M,resetZoom:N}=qw(S,{pageWidth:a?D.width-64:D.width,pageHeight:a?D.height-64:D.height,reserveX:a?0:112,reserveY:a?0:64,watch:a});(0,B.useEffect)(()=>{N()},[a,N]);let P=h.settings.writingMode===`vertical`,F=(0,B.useCallback)(e=>c(t=>Math.max(0,Math.min(w.length-1,t+e))),[w.length]);(0,B.useEffect)(()=>{if(!a)return;let e=e=>{if(e.key===`Escape`)return r||o(!1);e.key===`ArrowRight`&&F(P?-1:1),e.key===`ArrowLeft`&&F(P?1:-1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[a,P,F]),(0,B.useEffect)(()=>{s>w.length-1&&c(Math.max(0,w.length-1))},[w.length,s]);let I=(0,B.useCallback)(e=>{let t=w.findIndex(t=>t.items.some(t=>t.row.id===e));if(!(t<0)){if(a){c(t);return}document.querySelector(`[data-page-index="${t}"]`)?.scrollIntoView({block:`start`,behavior:`smooth`})}},[w,a]),L=(e,t)=>{let n=e.items[0];if(!(!n||!t||e.startedBy!==`manual`)){if(h.settings.layout!==`flow`){let e=t.items[t.items.length-1]?.row??null,r=Yn(h.settings),i=P?r.width:r.height;if(t.usedBlockSize+lr(e,n.row)+n.blockSize>i)return}return()=>g({type:`setBreakBefore`,rowId:n.row.id,value:!1})}},[ee,te]=(0,B.useState)(0);(0,B.useEffect)(()=>{let e=S.current;if(a||!e)return;let t=0,n=()=>{t=0;let n=e.getBoundingClientRect().top+e.clientHeight/3,r=0;e.querySelectorAll(`[data-page-index]`).forEach(e=>{e.getBoundingClientRect().top<=n&&(r=Number(e.dataset.pageIndex))}),te(r)},r=()=>{t||=requestAnimationFrame(n)};return n(),e.addEventListener(`scroll`,r,{passive:!0}),()=>{cancelAnimationFrame(t),e.removeEventListener(`scroll`,r)}},[a,w.length]);let ne=(0,B.useCallback)(e=>{document.querySelector(`[data-page-index="${e}"]`)?.scrollIntoView({block:`start`,behavior:`smooth`})},[]);return(0,H.jsxs)(nE,{children:[!a&&(0,H.jsx)(KC,{doc:h,onTitle:e=>g({type:`setTitle`,title:e}),undo:_,redo:v,canUndo:y,canRedo:b,importing:l,settingsOpen:d,onSettings:()=>f(e=>!e),reading:a,onReading:()=>o(e=>!e)}),(0,H.jsx)(fh,{onJump:I,children:(0,H.jsx)(Kl,{rows:h.rows,children:(0,H.jsxs)(rE,{children:[!a&&(0,H.jsx)(oT,{doc:h,pages:w,current:a?s:ee,onGoPage:e=>a?c(e):ne(e),onGoRow:I,dispatch:a?void 0:g,zoom:a?void 0:{percent:k,onZoom:A,onZoomIn:j,onZoomOut:M}}),a?(0,H.jsx)(hS,{doc:h,pages:w,current:s,go:F,scale:C?C.zoom:O,pageSize:C?.size,stageRef:S,onExit:r?i:()=>o(!1),exitLabel:r?`進入自編`:void 0,onGoRow:I}):(0,H.jsxs)(Ih,{editor:m,children:[(0,H.jsx)(FT,{ref:S,children:w.map((e,t)=>{let n=e.items[0],r=n&&!n.continuedFromPrev?n.row:null;return(0,H.jsxs)(aE,{children:[t>0&&(0,H.jsx)(e_,{startedBy:e.startedBy,onMerge:L(e,w[t-1])}),(0,H.jsxs)(iE,{children:[(0,H.jsx)(zT,{value:r?.pageBackground,disabled:!r,onChange:e=>r&&g({type:`setPageBackground`,rowId:r.id,background:e})}),(0,H.jsx)(Xg,{page:e,settings:h.settings,scale:O,rowIndexOf:x,rowCount:h.rows.length})]})]},e.index)})}),(0,H.jsx)(lv,{}),(0,H.jsx)(Kv,{}),(0,H.jsx)(tE,{pages:w,editPage:ee,rowIndexOf:x,stageRef:S}),(0,H.jsx)(jp,{})]})]})})}),l&&(0,H.jsx)(uT,{samples:$T,onClose:()=>u(!1),onApply:e=>{g({type:`importDoc`,result:XT(_a(e))}),c(0),u(!1)}}),d&&(0,H.jsx)(wT,{doc:h,onPatch:E,onMeta:e=>g({type:`setMeta`,patch:e}),onTitle:e=>g({type:`setTitle`,title:e}),onClose:()=>f(!1),publisherLocked:!T,onImport:T?()=>{f(!1),u(!0)}:void 0})]})}function tE({pages:e,editPage:t,rowIndexOf:n,stageRef:r}){let i=Lh(),a=i?.libraryAt??null,o=(0,B.useCallback)(t=>{if(!i||t<=0||i.doc.rows.length===0)return 0;let n=i.doc.rows[Math.min(t-1,i.doc.rows.length-1)];if(!n)return 0;for(let t of e)if(t.items.some(e=>e.row.id===n.id&&!e.continuesOnNext))return t.index;for(let t of e)if(t.items.some(e=>e.row.id===n.id))return t.index;return 0},[i,e]),s=(0,B.useCallback)(t=>{if(!i)return 0;let r=e[t];if(!r||r.items.length===0)return i.doc.rows.length;let a=r.items[r.items.length-1],o=n(a.row.id);return o>=0?o+1:i.doc.rows.length},[i,e,n]),c=(0,B.useRef)(t);if((0,B.useEffect)(()=>{c.current!==t&&(c.current=t,!(!i||i.libraryAt===null)&&o(i.libraryAt)!==t&&i.openLibrary(s(t)))},[t,i,o,s]),!i||a===null)return null;let l=()=>{let e=o(a),n=r.current;if(n){let r=n.querySelector(`[data-page-index="${e}"]`);if(r){let i=r.getBoundingClientRect(),a=n.getBoundingClientRect();if(!(i.bottom>a.top+30&&i.top<a.bottom-30)&&e!==t)return s(t)}}return a};return(0,H.jsx)(xf,{onClose:()=>i.openLibrary(null),onChoose:e=>{let t=l();i.openInsert(null);let n=Sr(om(e),i.doc.settings);i.dispatch({type:`insertRow`,index:t,blocks:[n]}),ld(n.id),i.openLibrary(t+1)},onImportPdf:(e,t)=>{let n=l();i.openInsert(null);let r=e.name.replace(/\.pdf$/i,``),a=t.map(()=>W(`blk`));i.dispatch({type:`insertRows`,index:n,rows:t.map((e,t)=>[{id:a[t],type:`image`,assetId:e.assetId,alt:`${r} 第 ${e.page} 頁`,caption:``,hasCaption:!1,aspectRatio:e.aspectRatio,widthPct:100,popups:[]}])}),a[0]&&ld(a[0]),i.openLibrary(n+t.length)},onGenerate:e=>{let t=l(),n=am(`image-ai`);n.type===`image`&&e&&(n.aiPrompt=e),i.openInsert(null),i.dispatch({type:`insertRow`,index:t,blocks:[n]}),i.openLibrary(t+1)},onUpload:async e=>{let t=l();i.openInsert(null);let n=await km(i,e,t);n&&ld(n.blockId),i.openLibrary(t+1)}})}var nE=V.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`,rE=V.div`
  flex: 1;
  min-block-size: 0;
  display: flex;
  /* 白底襯著，編輯區的圓角灰卡才浮得出來（body 是灰底） */
  background: ${e=>e.theme.surface.raised};
`,iE=V.div`
  position: relative;
`,aE=V.div`
  display: flex;
  flex-direction: column;
  /* 放大到比編輯區寬時改靠左起算，整頁才捲得到（同 EditStage） */
  align-items: safe center;
  gap: 24px;
  /* 左右多留一條給頁面外的工具（背景按鈕在頁左 40px、段落把手在 36px），改這裡要一起改 reserveX。
     寬度至少撐滿編輯區、頁面放大時跟著變寬：留白算在自己的寬度裡，捲到最右邊也留得住 */
  box-sizing: border-box;
  padding-inline: 56px;
  min-inline-size: 100%;
  inline-size: max-content;
`;function oE(e,t){let[n,r]=(0,B.useState)(null);if((0,B.useEffect)(()=>{if(!t){r(null);return}let n=e.current;if(!n)return;let i=()=>{let e=n.clientWidth,t=n.clientHeight;e>0&&t>0&&r(n=>n&&n.w===e&&n.h===t?n:{w:e,h:t})};i();let a=new ResizeObserver(i);return a.observe(n),()=>a.disconnect()},[e,t]),!t||!n)return null;let i=n.w>=1700?1.5:1;return{zoom:i,size:{width:Math.round((n.w-48)/i+64),height:Math.round((n.h-48)/i+64)}}}var sE=240,cE=300,lE=cE/320,uE={chinese:[[60,260.9,322,1.2,1,1],[180,232.7,191,1,-1,5],[120,234.9,49,.8,1,2],[195,258.7,292,1,1,3],[75,277,346,1,1,1],[135,276.1,189,1.1,1,2],[165,234.8,297,1,-1,5],[50,234.8,109,.9,-1,3],[110,231.1,124,.8,1,2],[150,235.2,142,1.1,1,1]],social:[[60,237.3,315,.7,-1,4],[180,235.7,52,.8,-1,0],[120,236.3,120,.8,1,1],[70,215,313,.9,1,2],[75,236.8,81,1.2,1,4],[135,230.8,281,.7,1,1],[130,215,53,.9,-1,0],[50,240.6,124,1,1,2],[110,269.6,246,1.1,-1,4],[150,236.8,199,1,-1,1]],english:[[60,245.2,211,1.1,-1,1],[180,241,99,1.1,1,5],[120,205,145,.85,1,1],[195,233.7,30,.9,1,3],[190,205,286,.85,-1,2],[135,244,322,1.1,-1,3],[165,222,324,1.1,1,5],[50,232.8,96,1.2,-1,2],[110,215,283,.85,1,1],[70,215,325,.85,1,3]],science:[[60,232.4,109,.9,1,4],[180,231.1,29,1.1,-1,0],[120,243.3,71,1.2,1,1],[190,220,266,.9,-1,4],[75,241.9,286,1.1,1,0],[120,225,190,.95,-1,1],[165,215,150,.85,-1,4],[50,235.4,53,1.2,-1,0],[110,235.4,349,1.2,-1,1],[150,215,175,.85,-1,4]],math:[[60,251.8,328,1.2,1,6],[180,232.4,75,1.1,-1,3],[120,231.3,16,1.2,1,1],[195,231.4,170,1,1,5],[75,232.9,18,.9,-1,3],[135,277.5,29,1.1,-1,6],[165,243.3,75,.9,-1,5],[50,230.5,3,.8,1,1],[110,230.4,188,1.2,-1,6],[150,236.2,193,1.2,1,3]]},dE={chinese:`#1A1A1A`,english:`#1A1A1A`,math:`#1A1A1A`,social:`#FFFFFF`,science:`#FFFFFF`,other:`#1A1A1A`};function fE(e,t){let n=e=>[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)),r=n(Sx[e].dark),i=n(Sx[e].light);return`rgb(${[r.map(e=>e*.84),r,r.map((e,t)=>e+(i[t]-e)*.28),r.map((e,t)=>e+(i[t]-e)*.5),r.map(e=>e*.7),r.map((e,t)=>e+(i[t]-e)*.75),r.map(e=>e*.95)][t].map(e=>Math.round(e)).join(`,`)})`}function pE(e){let t=2166136261;for(let n of e)t^=n.codePointAt(0),t=Math.imul(t,16777619);return(t>>>0)%10}function mE({subject:e,art:t,edition:n,title:r,seed:i,frame:a}){let o=xx(e),s=Sx[o],c=a??pE(i),[l,u,d,f,p,m]=uE[o===`other`?`chinese`:o][c],h=u*lE,g=(0,B.useRef)(null),_=(0,B.useRef)(null),v=(0,B.useRef)(null),y=`frame-${i.replace(/[^a-zA-Z0-9]/g,``)}-${c}`;return(0,B.useEffect)(()=>{let e=v.current,t=g.current;if(!e||!t)return;let n=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,r=206/Math.max(s.w,s.h),i={x:l,y:h,r:d,s:f},a={...i,tx:l,ty:h,tr:d,ts:f,hover:!1,lastX:null},o=0,c=e=>{let i=n?1:a.hover?.1:.08,l=a.hover&&!n?Math.sin(e/520)*1.5:0;a.x+=(a.tx-a.x)*i,a.y+=(a.ty-a.y)*i,a.r+=(a.tr+l-a.r)*i,a.s+=(a.ts-a.s)*i;let u=r*a.s;t.setAttribute(`transform`,`translate(${a.x.toFixed(2)} ${a.y.toFixed(2)}) rotate(${a.r.toFixed(2)}) scale(${(u*p).toFixed(4)} ${u.toFixed(4)}) translate(${-s.w/2} ${-s.h/2})`),_.current&&(_.current.style.opacity=a.hover&&a.y<112?`0`:`1`),o=!a.hover&&Math.abs(a.x-a.tx)<.1&&Math.abs(a.y-a.ty)<.1&&Math.abs(a.r-a.tr)<.1&&Math.abs(a.s-a.ts)<.001?0:requestAnimationFrame(c)},u=()=>{o||=requestAnimationFrame(c)},m=t=>{let n=e.getBoundingClientRect(),r=Math.max(sE/n.width,cE/n.height);return[(t.clientX-n.left)*r-(n.width*r-sE)/2,(t.clientY-n.top)*r-(n.height*r-cE)/2]},y=()=>{a.hover=!0,u()},b=e=>{let[t,n]=m(e);a.tx=t,a.ty=n,a.ts=1.14,a.lastX!=null&&(a.tr+=(t-a.lastX)*.3),a.lastX=t,u()},x=()=>{a.hover=!1,a.tx=i.x,a.ty=i.y,a.tr=i.r,a.ts=i.s,a.lastX=null,u()};return c(performance.now()),e.addEventListener(`pointerenter`,y),e.addEventListener(`pointermove`,b),e.addEventListener(`pointerleave`,x),()=>{cancelAnimationFrame(o),e.removeEventListener(`pointerenter`,y),e.removeEventListener(`pointermove`,b),e.removeEventListener(`pointerleave`,x)}},[l,h,d,f,p,s]),(0,H.jsxs)(_E,{ref:v,style:{background:fE(o,m)},children:[(0,H.jsx)(`svg`,{viewBox:`0 0 ${sE} ${cE}`,preserveAspectRatio:`xMidYMid slice`,"aria-hidden":`true`,focusable:`false`,children:t?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`defs`,{children:(0,H.jsx)(`clipPath`,{id:y,children:(0,H.jsx)(`path`,{ref:g,d:s.d})})}),(0,H.jsx)(`image`,{href:t,x:`0`,y:`0`,width:sE,height:cE,preserveAspectRatio:`xMidYMid slice`,clipPath:`url(#${y})`})]}):(0,H.jsx)(`path`,{ref:g,d:s.d,fill:`#FFFFFF`})}),(0,H.jsxs)(yE,{ref:_,style:{color:dE[o]},children:[(0,H.jsx)(`small`,{children:n}),(0,H.jsx)(`b`,{children:r})]})]})}function hE({subject:e,edition:t,title:n}){let r=xx(e);return(0,H.jsx)(_E,{style:{background:fE(r,1)},children:(0,H.jsxs)(yE,{style:{color:dE[r]},children:[(0,H.jsx)(`small`,{children:t}),(0,H.jsx)(`b`,{children:n})]})})}function gE({art:e,edition:t,title:n}){return(0,H.jsxs)(_E,{$publisher:!0,children:[(0,H.jsx)(`img`,{src:e,alt:``,draggable:!1}),(0,H.jsx)(vE,{}),(0,H.jsxs)(yE,{style:{color:`#FFFFFF`,textShadow:`0 1px 2px rgba(0,0,0,.25)`},children:[(0,H.jsx)(`small`,{children:t}),(0,H.jsx)(`b`,{children:n})]})]})}var _E=V.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;

  svg, img {
    position: absolute;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
    display: block;
    object-fit: cover;
  }

  /* 紙紋：一層很淡的雜訊，平塗色才不會像塑膠；出版社封面不加 */
  ${e=>!e.$publisher&&`&::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.22;
      mix-blend-mode: multiply;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .5  0 0 0 0 .45  0 0 0 0 .4  0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
    }`}
`,vE=V.div`
  position: absolute;
  inset: 0 0 auto;
  block-size: 52%;
  background: linear-gradient(rgba(20, 20, 20, 0.55), rgba(20, 20, 20, 0));
  pointer-events: none;
`,yE=V.div`
  position: absolute;
  inset-inline: 9%;
  inset-block-start: 7%;
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.25s;

  small {
    display: block;
    font-size: 12px;
    font-weight: 500;
    opacity: 0.88;
  }
  b {
    display: block;
    margin-block-start: 2px;
    font-size: 26px;
    line-height: 1.25;
    font-weight: 700;
    /* 課名最多兩行，再長才「⋯」 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
`,bE=[{id:`mulan`,subject:`國語文`,edition:`115 南一 國中`,publisher:`南一`,title:`國文 2下`,cover:`/textbook-editor/assets/guowen-2b-CK4g701h.jpg`,art:`/textbook-editor/assets/guowen-2b-art-asrUE_lg.jpg`,md:qn},{id:`social-5b`,subject:`社會`,edition:`115 翰林 國小`,publisher:`翰林`,title:`社會 5下`,cover:`/textbook-editor/assets/social-5b-Brm092D9.jpg`,art:`/textbook-editor/assets/social-5b-art-QATM3ZmX.jpg`},{id:`english-6`,subject:`英語文`,edition:`114 康軒 國小`,publisher:`康軒`,title:`Wonder World 6`,cover:`/textbook-editor/assets/english-6-DPI7y1D2.jpg`,art:`/textbook-editor/assets/english-6-art-fsOXjYc1.jpg`},{id:`demo`,subject:`自然科學`,edition:`114 南一 國小`,publisher:`南一`,title:`自然科學 5下`,cover:`/textbook-editor/assets/science-5b-BgdM49CU.jpg`,art:`/textbook-editor/assets/science-5b-art-DgSDe1IS.jpg`,md:Kn},{id:`math-2b`,subject:`數學`,edition:`114 翰林 國中`,publisher:`翰林`,title:`數學 2下`,cover:`/textbook-editor/assets/math-2b-DTabVJlA.jpg`,art:`/textbook-editor/assets/math-2b-art-CyXYnpFD.jpg`}],xE=e=>bE.find(t=>t.id===e)??null,SE={國語文:`國語`,英語文:`英語`,自然科學:`自然`},CE={國語文:[[`第一課`,`第二課`,`第三課`],[`課文`,`語文天地`]],社會:[[`第 1 課`,`第 2 課`,`第 3 課`],[`學習重點`,`活動`]],英語文:[[`Unit 1`,`Unit 2`,`Unit 3`],[`Dialogue`,`Practice`]],自然科學:[[`單元一`,`單元二`,`單元三`],[`活動一`,`活動二`]],數學:[[`第 1 單元`,`第 2 單元`,`第 3 單元`],[`例題`,`練習`]]};function wE(e){if(!e.md){let[t,n]=CE[e.subject]??CE.國語文,r=[`---\ntitle: ${e.title}\npublisher: ${e.publisher}\nsubject: ${SE[e.subject]??e.subject}\n---`,...t.map(e=>[`# ${e}`,...n.map(t=>`## ${t}\n\n（${e}${t}的內容）`)].join(`

`))].join(`

`),i=Mg(Pi(),jg(r,{autoPageBreak:!0}));return{...i,title:e.title,meta:{...i.meta,publisher:e.publisher}}}let t=Mg(Pi(),XT(_a(jg(e.md,{autoPageBreak:!0}))));return{...t,meta:{...t.meta,publisher:e.publisher}}}function TE(e){let t=[];for(let n of qy(e))n.depth===0?t.push({lesson:n,sections:[]}):n.depth===1&&(t.length===0&&t.push({lesson:null,sections:[]}),t[t.length-1].sections.push(n));return t}function EE(e,t){let n=qy(e).filter(e=>e.depth<=1),r=new Map(n.map(e=>[e.rowId,e])),i=new Map,a=``;for(let e of n)e.depth===0?a=e.rowId:t.has(e.rowId)&&i.set(a,!0);let o=``,s=null,c=e.rows.filter(e=>{let n=r.get(e.id);return n?.depth===0?(o=e.id,s=null):n?.depth===1&&(s=e.id),s?t.has(s):i.get(o)===!0});return c[0]?.breakBefore&&(c[0]={...c[0],breakBefore:!1}),{...e,rows:c}}var DE={英語:`英語文`};function OE(e){let t=xE(e);if(t)return{id:t.id,subject:t.subject,edition:t.edition,publisher:t.publisher,title:t.title,cover:t.cover,art:t.art,builtIn:!0};let n=vC(e);return n&&xC(n)?{id:n.id,subject:DE[n.subject??``]??n.subject??`其他`,edition:`${new Date(n.createdAt).getFullYear()-1911} ${n.publisher??``}`.trim(),publisher:n.publisher??``,title:n.title,cover:n.cover,builtIn:!1}:null}function kE(e){let t=xE(e);if(t)return wE(t);let n=yC(e);if(!n)return null;let r=MC(e)??vC(e)?.sourceId,i=r?xE(r):null;return i&&!i.md&&TE(n).every(e=>e.sections.length===0)?{...wE(i),title:n.title}:{...n,rows:n.rows}}var AE=[`陳小明`,`林怡君`,`王建宏`,`黃淑芬`,`張志偉`],jE=[[`mulan`,[`國文 2下`,`國文 2上`,`國文 1下`,`國文 1上`,`國文 3上`]],[`social-5b`,[`社會 5下`,`社會 5上`,`社會 6上`,`社會 6下`,`社會 4下`,`社會 4上`,`社會 3下`,`社會 3上`,`社會 1上`,`社會 2下`]],[`english-6`,[`英語 6`,`英語 5`,`英語 7`,`英語 8`,`英語 4`,`英語 3`,`英語 2`,`英語 1`,`英語 9`,`英語 10`]],[`demo`,[`自然 5下`,`自然 5上`,`自然 6上`,`自然 6下`,`自然 4下`,`自然 4上`,`自然 3下`,`自然 3上`,`自然 2上`,`自然 1下`]],[`math-2b`,[`數學 2下`,`數學 2上`,`數學 1下`,`數學 1上`,`數學 3上`,`數學 3下`,`數學 6上`,`數學 6下`,`數學 5上`,`數學 5下`]]],ME=Date.UTC(2026,9,1),NE=jE.flatMap(([e,t])=>t.map((t,n)=>({id:`sample-${e}-${n}`,kind:`copy`,sourceId:e,frame:n%10,title:t,cover:null,shared:n%2==0,createdAt:ME-n*864e5,updatedAt:ME-n*864e5,sample:!0,teacher:AE[n%AE.length]}))),PE=e=>e.sample===!0,FE=`ds-editor:opened-samples:v1`,IE=()=>{try{return JSON.parse(localStorage.getItem(FE)??`{}`)}catch{return{}}},LE=e=>{let t=IE()[e];return t&&vC(t)?t:null},RE=[`sample-guoyu-6b-`];(function(){let e=IE(),t=Object.keys(e).filter(e=>RE.some(t=>e.startsWith(t)));if(t.length!==0){for(let n of t)vC(e[n])&&PC(e[n]),delete e[n];try{localStorage.setItem(FE,JSON.stringify(e))}catch{}}})();function zE(e){let t=LE(e.id);if(t)return t;let n=kE(e.sourceId);if(!n)return null;let r=TC(e.sourceId,{...n,title:e.title,meta:{...n.meta,publisher:OE(e.sourceId)?.publisher??n.meta.publisher}},void 0,e.frame);EC(r.id,{shared:e.shared});try{localStorage.setItem(FE,JSON.stringify({...IE(),[e.id]:r.id}))}catch{}return r.id}function BE({source:e,defaultName:t,onCancel:n,onCreate:r}){let i=(0,B.useMemo)(()=>TE(e),[e]),a=(0,B.useMemo)(()=>i.flatMap(e=>e.sections.map(e=>e.rowId)),[i]),[o,s]=(0,B.useState)(t),[c,l]=(0,B.useState)(()=>new Set(a)),[u,d]=(0,B.useState)(()=>new Set(i.map((e,t)=>t))),f=(0,B.useRef)(null);(0,B.useEffect)(()=>US(n),[n]),(0,B.useEffect)(()=>{f.current?.focus(),f.current?.select()},[]);let p=(e,t)=>l(n=>{let r=new Set(n);return e.forEach(e=>t?r.add(e):r.delete(e)),r}),m=a.length===0,h=o.trim().length>0&&(m||c.size>0),g=()=>{if(!h)return;let t=m?e:EE(e,c);r(o.trim(),{...t,title:o.trim()})};return(0,pi.createPortal)((0,H.jsx)(JS,{onClick:n,children:(0,H.jsxs)(YS,{role:`dialog`,"aria-modal":`true`,"aria-label":`建立自編`,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(HE,{children:`建立自編`}),(0,H.jsxs)(UE,{children:[(0,H.jsx)(`span`,{children:`自編名稱`}),(0,H.jsx)(WE,{ref:f,value:o,placeholder:`請輸入自編名稱`,onChange:e=>s(e.target.value),onKeyDown:e=>e.key===`Enter`&&g()})]}),!m&&(0,H.jsx)(GE,{role:`group`,"aria-label":`要放進自編的章節`,children:i.map((e,t)=>{let n=e.sections.map(e=>e.rowId),r=n.filter(e=>c.has(e)).length,i=u.has(t);return(0,H.jsxs)(`div`,{children:[(0,H.jsxs)(KE,{$head:!0,children:[(0,H.jsxs)(qE,{type:`button`,"aria-expanded":i,onClick:()=>d(e=>{let n=new Set(e);return n.has(t)?n.delete(t):n.add(t),n}),children:[(0,H.jsx)(U,{name:i?`chevron-down`:`chevron-right`,size:16}),(0,H.jsx)(`span`,{children:e.lesson?.text??`未命名的課`})]}),(0,H.jsx)(VE,{checked:r===n.length&&n.length>0,mixed:r>0&&r<n.length,label:`整課：${e.lesson?.text??``}`,onChange:e=>p(n,e)})]}),i&&e.sections.map(e=>(0,H.jsxs)(KE,{children:[(0,H.jsx)(`span`,{children:e.text}),(0,H.jsx)(VE,{checked:c.has(e.rowId),label:e.text,onChange:t=>p([e.rowId],t)})]},e.rowId))]},t)})}),(0,H.jsxs)(eC,{children:[(0,H.jsx)(tC,{type:`button`,onClick:n,children:`取消`}),(0,H.jsx)(tC,{type:`button`,$primary:!0,disabled:!h,onClick:g,children:`建立`})]})]})}),document.body)}function VE({checked:e,mixed:t,label:n,onChange:r}){return(0,H.jsxs)(JE,{type:`button`,role:`checkbox`,"aria-checked":t?`mixed`:e,"aria-label":n,$on:e||!!t,onClick:()=>r(!(e||t)),children:[e&&(0,H.jsx)(U,{name:`check`,size:16}),t&&!e&&(0,H.jsx)(U,{name:`minus`,size:16})]})}var HE=V.p`
  margin: 0;
  font-size: ${e=>e.theme.typography.bodyLgSize};
  line-height: ${e=>e.theme.typography.bodyLgLineHeight};
  font-weight: 600;
`,UE=V.label`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  font-size: ${e=>e.theme.typography.labelSize};
  color: ${e=>e.theme.text.secondary};
`,WE=V.input`
  block-size: ${e=>e.theme.control.heightMd};
  padding: 0 16px;
  border: ${e=>e.theme.border.widthDefault} solid transparent;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.sunken};
  font: inherit;
  font-size: ${e=>e.theme.typography.bodySmSize};
  color: ${e=>e.theme.text.primary};
  outline: none;

  &::placeholder { color: ${e=>e.theme.text.placeholder}; }
  &:focus {
    background: ${e=>e.theme.surface.raised};
    border-color: ${e=>e.theme.border.default};
  }
`,GE=V.div`
  max-block-size: 240px;
  overflow-y: auto;
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.raised};
`,KE=V.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-block-size: 40px;
  padding: 0 12px 0 ${e=>e.$head?`8px`:`32px`};
  font-size: ${e=>e.theme.typography.bodySmSize};
  background: ${e=>e.$head?e.theme.surface.sunken:`transparent`};
  font-weight: ${e=>e.$head?500:400};
  & + & { border-block-start: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle}; }
`,qE=V.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
`,JE=V.button`
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 20px;
  block-size: 20px;
  padding: 0;
  border-radius: 5px;
  border: 1.5px solid ${e=>e.$on?e.theme.brand.accentOnLight:e.theme.border.default};
  background: ${e=>e.$on?e.theme.brand.accentOnLight:e.theme.surface.raised};
  color: ${e=>e.theme.text.onInverse};
  cursor: pointer;
`,YE=`ds-editor:role`,XE=new Set,ZE=()=>{try{return localStorage.getItem(YE)===`admin`?`admin`:`teacher`}catch{return`teacher`}};function QE(e){try{localStorage.setItem(YE,e)}catch{}$E=e,XE.forEach(e=>e())}var $E=null,eD=()=>$E??=ZE();function tD(){return(0,B.useSyncExternalStore)(e=>(XE.add(e),()=>XE.delete(e)),eD)}var nD={teacher:`方小明`,admin:`系統管理員`},rD=[`國語文`,`社會`,`英語文`,`自然科學`,`數學`];function iD({subject:e,onCancel:t,onCreate:n}){let[r,i]=(0,B.useState)(``),[a,o]=(0,B.useState)(e&&rD.includes(e)?e:rD[0]),[s,c]=(0,B.useState)(``),l=(0,B.useRef)(null);(0,B.useEffect)(()=>US(t),[t]),(0,B.useEffect)(()=>l.current?.focus(),[]);let u=r.trim().length>0&&s.trim().length>0,d=()=>u&&n({name:r.trim(),subject:a,publisher:s.trim()});return(0,pi.createPortal)((0,H.jsx)(JS,{onClick:t,children:(0,H.jsxs)(YS,{role:`dialog`,"aria-modal":`true`,"aria-label":`建立教材`,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(aD,{children:`建立教材`}),(0,H.jsxs)(oD,{children:[(0,H.jsx)(`span`,{children:`教材名稱`}),(0,H.jsx)(sD,{ref:l,value:r,placeholder:`請輸入教材名稱`,onChange:e=>i(e.target.value),onKeyDown:e=>e.key===`Enter`&&d()})]}),(0,H.jsxs)(oD,{as:`div`,children:[(0,H.jsx)(`span`,{children:`科目`}),(0,H.jsx)(cD,{role:`radiogroup`,"aria-label":`科目`,children:rD.map(e=>(0,H.jsxs)(lD,{type:`button`,role:`radio`,"aria-checked":a===e,$on:a===e,onClick:()=>o(e),children:[(0,H.jsx)(Dx,{subject:e,size:16}),e]},e))})]}),(0,H.jsxs)(oD,{children:[(0,H.jsx)(`span`,{children:`出版社`}),(0,H.jsx)(sD,{value:s,placeholder:`請輸入出版社名稱`,onChange:e=>c(e.target.value),onKeyDown:e=>e.key===`Enter`&&d()})]}),(0,H.jsxs)(eC,{children:[(0,H.jsx)(tC,{type:`button`,onClick:t,children:`取消`}),(0,H.jsx)(tC,{type:`button`,$primary:!0,disabled:!u,onClick:d,children:`建立`})]})]})}),document.body)}var aD=V.p`
  margin: 0;
  font-size: ${e=>e.theme.typography.bodyLgSize};
  line-height: ${e=>e.theme.typography.bodyLgLineHeight};
  font-weight: 600;
`,oD=V.label`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  font-size: ${e=>e.theme.typography.labelSize};
  color: ${e=>e.theme.text.secondary};
`,sD=V.input`
  block-size: ${e=>e.theme.control.heightMd};
  padding: 0 16px;
  border: ${e=>e.theme.border.widthDefault} solid transparent;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.sunken};
  font: inherit;
  font-size: ${e=>e.theme.typography.bodySmSize};
  color: ${e=>e.theme.text.primary};
  outline: none;

  &::placeholder { color: ${e=>e.theme.text.placeholder}; }
  &:focus {
    background: ${e=>e.theme.surface.raised};
    border-color: ${e=>e.theme.border.default};
  }
`,cD=V.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`,lD=V.button`
  justify-content: center;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  block-size: 36px;
  padding: 0 14px 0 10px;
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.$on?e.theme.border.hover:e.theme.border.subtle};
  border-radius: 999px;
  background: ${e=>e.$on?e.theme.surface.muted:e.theme.surface.raised};
  font: inherit;
  font-size: ${e=>e.theme.typography.bodySmSize};
  font-weight: ${e=>e.$on?500:400};
  color: ${e=>e.theme.text.primary};
  cursor: pointer;
`,uD=`ds-editor:signed-in`,dD=new Set,fD=()=>{try{return localStorage.getItem(uD)===`1`}catch{return!1}},pD=null,mD=()=>pD??=fD();function hD(e){try{e?localStorage.setItem(uD,`1`):localStorage.removeItem(uD)}catch{}pD=e,dD.forEach(e=>e())}var gD=()=>hD(!0),_D=()=>hD(!1);function vD(){return(0,B.useSyncExternalStore)(e=>(dD.add(e),()=>dD.delete(e)),mD)}var yD=[{key:`textbook`,label:`數位教科書`},{key:`shared`,label:`共享教材`},{key:`mine`,label:`自編教材`}];function bD({tab:e=`textbook`,subject:t}){let n=(0,B.useSyncExternalStore)(fC,_C),r=tD(),i=r===`admin`,[a,o]=(0,B.useState)(null),[s,c]=(0,B.useState)(null),[l,u]=(0,B.useState)(null),[d,f]=(0,B.useState)(null),[p,m]=(0,B.useState)(null),[h,g]=(0,B.useState)(null),_=e=>NC(e.id,kE(e.id),{subject:e.subject,publisher:e.publisher,cover:e.art??e.cover}),v=[...bE.filter(e=>!kC().includes(e.id)).map(e=>OE(e.id)),...n.filter(e=>xC(e)&&(i||e.shared)).map(e=>OE(e.id))],y=[...n.filter(e=>!xC(e)),...NE.filter(t=>e===`shared`||!LE(t.id))].sort((e,t)=>Number(e.shared)-Number(t.shared)||t.updatedAt-e.updatedAt),[b,x]=$D(),S=e===`textbook`?null:e===`shared`?y.filter(e=>e.shared):y,C=e=>e.builtIn||!!vC(e.id)?.shared,w=e=>(rD.indexOf(e)+rD.length+1)%(rD.length+1),T=v.map(e=>e.subject).filter((e,t,n)=>n.indexOf(e)===t).sort((e,t)=>w(e)-w(t)).map(e=>({subject:e,sources:v.filter(t=>t.subject===e).sort((e,t)=>Number(!C(e))-Number(!C(t))),books:(S??[]).filter(t=>OE(t.sourceId)?.subject===e)})).filter(e=>S?e.books.length>0:e.sources.length>0).filter(e=>!t||e.subject===t),E=t?1/0:x,D=kD();return(0,H.jsxs)(AD,{style:{"--z":D},children:[(0,H.jsxs)(jD,{children:[(0,H.jsxs)(MD,{children:[(0,H.jsx)(`svg`,{width:52,height:54,viewBox:`0 0 32 32`,"aria-hidden":`true`,children:(0,H.jsx)(`path`,{d:yx,fill:vx})}),(0,H.jsxs)(`span`,{children:[(0,H.jsx)(ND,{children:`數位教科書`}),(0,H.jsx)(PD,{children:`Digital Textbook`})]})]}),(0,H.jsx)(SD,{role:r})]}),(0,H.jsxs)(HD,{children:[(0,H.jsxs)(UD,{$on:!0,"aria-current":`page`,children:[(0,H.jsx)(U,{name:`book`,size:20}),`地球大廳`]}),(0,H.jsxs)(UD,{as:`span`,title:`還沒開放`,children:[(0,H.jsx)(U,{name:`users`,size:20}),`班級星艦`]})]}),(0,H.jsxs)(WD,{children:[!t&&(0,H.jsxs)(zD,{children:[(0,H.jsx)(GD,{role:`tablist`,"aria-label":`教材種類`,children:yD.map(t=>(0,H.jsx)(KD,{role:`tab`,"aria-selected":e===t.key,$on:e===t.key,onClick:()=>mx(t.key),children:t.label},t.key))}),i&&e===`textbook`&&(0,H.jsxs)(BD,{type:`button`,onClick:()=>u(``),children:[`建立教材`,(0,H.jsx)(U,{name:`plus`,size:16})]})]}),T.length===0&&(0,H.jsxs)(qD,{children:[(0,H.jsx)(JD,{children:(0,H.jsx)(U,{name:`ghost`,size:24})}),(0,H.jsxs)(YD,{children:[`這裡還沒有`,e===`shared`?`共享教材`:`自編教材`]}),(0,H.jsx)(XD,{children:e===`shared`?`在自編教材按「共享」，就會出現在這裡`:`到數位教科書，按課本右下角的鉛筆就能建立一份`})]}),(0,H.jsx)(nO,{ref:b,"aria-hidden":`true`,style:{blockSize:0,overflow:`hidden`}}),t&&(0,H.jsx)(tO,{type:`button`,"aria-label":`回書櫃`,title:`回書櫃`,onClick:()=>mx(e),children:(0,H.jsx)(U,{name:`arrow-left`,size:24})}),T.map(n=>(0,H.jsxs)(ZD,{children:[(0,H.jsxs)(QD,{children:[(0,H.jsx)(Dx,{subject:n.subject}),(0,H.jsx)(`h2`,{children:n.subject}),!t&&(S?n.books.length:n.sources.length)>E&&(S?n.books.length:n.sources.length)>E&&(0,H.jsxs)(eO,{type:`button`,onClick:()=>mx(e,n.subject),children:[`查看全部`,(0,H.jsx)(U,{name:`chevron-right`,size:24})]})]}),(0,H.jsx)(nO,{style:{gridTemplateColumns:`repeat(${x}, minmax(0, 1fr))`},children:S?n.books.slice(0,E).map(t=>(0,H.jsx)(TD,{book:t,source:OE(t.sourceId),inSharedTab:e===`shared`,onCover:()=>f(t),onCopy:(e===`shared`||PE(t))&&OE(t.sourceId)?()=>(c(PE(t)?null:t.id),o(OE(t.sourceId))):void 0,onDelete:()=>m(t)},t.id)):n.sources.slice(0,E).map(e=>!e.builtIn&&i?(0,H.jsx)(TD,{book:vC(e.id),source:e,onCover:()=>f(vC(e.id)),onCopy:vC(e.id)?.shared?()=>o(e):void 0,onDelete:()=>m(vC(e.id))},e.id):(0,H.jsx)(wD,{source:e,published:i,onCreate:()=>o(e),admin:i?{edit:()=>hx(_(e).id),cover:()=>f(_(e)),remove:()=>g(e)}:void 0},e.id))})]},n.subject))]}),a&&(0,H.jsx)(BE,{source:kE(s??a.id),defaultName:s&&vC(s)?.title||a.title,onCancel:()=>(o(null),c(null)),onCreate:(e,t)=>{let n=NE.filter(e=>e.sourceId===a.id).length,r=TC(a.id,{...t,meta:{...t.meta,publisher:a.publisher}},void 0,wC(a.id,n));o(null),c(null),hx(r.id)}}),l!==null&&(0,H.jsx)(iD,{subject:l||void 0,onCancel:()=>u(null),onCreate:({name:e,subject:t,publisher:n})=>{let r=Pi(e),i=r.rows[0].columns[0].blocks[0];i.type===`text`&&(i.spans=[{text:e}]);let a=TC(``,{...r,meta:{publisher:n,subject:xD(t)}},{subject:t,publisher:n});u(null),hx(a.id)}}),d&&(0,H.jsx)(qS,{onCancel:()=>f(null),onConfirm:e=>{EC(d.id,{cover:e}),f(null),Os(`封面已更新`)}}),h&&(0,H.jsx)(Sd,{title:`刪除「${h.title}」？`,message:`這本已經發布，老師可能正在用；老師建好的自編會留著。刪除後無法復原。`,confirmLabel:`刪除`,onCancel:()=>g(null),onConfirm:()=>{AC(h.id),g(null),Os(`已刪除`)}}),p&&(0,H.jsx)(Sd,{title:`刪除「${p.title}」？`,message:xC(p)?p.shared?`這本已經發布，老師可能正在用；老師建好的自編會留著。刪除後無法復原。`:`這本還沒發布，老師看不到。刪除後無法復原。`:`刪除後無法復原。`,confirmLabel:`刪除`,onCancel:()=>m(null),onConfirm:()=>{PC(p.id),m(null),Os(`已刪除`)}}),(0,H.jsx)(ks,{})]})}var xD=e=>({國語文:`國語`,英語文:`英語`,自然科學:`自然`})[e]??e;function SD({role:e}){let[t,n]=(0,B.useState)(!1),r=(0,B.useRef)(null);(0,B.useEffect)(()=>{if(!t)return;let e=e=>{r.current?.contains(e.target)||n(!1)};return window.addEventListener(`pointerdown`,e,!0),()=>window.removeEventListener(`pointerdown`,e,!0)},[t]);let i=nD[e];return(0,H.jsxs)(FD,{ref:r,children:[(0,H.jsxs)(ID,{type:`button`,"aria-haspopup":`menu`,"aria-expanded":t,onClick:()=>n(e=>!e),title:`切換身分、登出`,children:[i,(0,H.jsx)(VD,{"aria-hidden":`true`,children:e===`admin`?`管`:i.slice(0,1)})]}),t&&(0,H.jsxs)(rO,{role:`menu`,style:{insetBlockStart:52},children:[(0,H.jsx)(RD,{children:`切換身分（原型用）`}),[`teacher`,`admin`].map(t=>(0,H.jsxs)(iO,{role:`menuitemradio`,"aria-checked":e===t,type:`button`,onClick:()=>{QE(t),n(!1)},children:[t===`teacher`?`老師`:`系統管理員`,e===t&&(0,H.jsx)(U,{name:`check`,size:16})]},t)),(0,H.jsx)(LD,{}),(0,H.jsx)(iO,{role:`menuitem`,type:`button`,onClick:()=>{n(!1),_D(),window.location.hash=`#/`},children:`登出`})]})]})}function CD({items:e}){let[t,n]=(0,B.useState)(!1),r=(0,B.useRef)(null);return(0,B.useEffect)(()=>{if(!t)return;let e=e=>{r.current?.contains(e.target)||n(!1)};return window.addEventListener(`pointerdown`,e,!0),()=>window.removeEventListener(`pointerdown`,e,!0)},[t]),e.length?(0,H.jsxs)(oO,{ref:r,$open:t,onClick:e=>e.stopPropagation(),children:[(0,H.jsx)(sO,{type:`button`,"aria-label":`更多`,"aria-haspopup":`menu`,"aria-expanded":t,onClick:()=>n(e=>!e),children:(0,H.jsx)(`span`,{children:(0,H.jsx)(U,{name:`more-horizontal`,size:20})})}),t&&(0,H.jsx)(rO,{role:`menu`,children:e.map(e=>(0,H.jsxs)(iO,{role:`menuitem`,type:`button`,$danger:e.danger,onClick:()=>(n(!1),e.run()),children:[(0,H.jsx)(U,{name:e.icon,size:16}),e.label]},e.label))})]}):null}function wD({source:e,published:t,onCreate:n,admin:r}){let i=e.art??e.cover;return(0,H.jsxs)(aO,{children:[(0,H.jsxs)(cO,{role:`button`,tabIndex:0,"aria-label":`閱讀「${e.title}」`,onClick:()=>e.builtIn?_x(e.id):gx(e.id),children:[i?(0,H.jsx)(gE,{art:i,edition:e.edition,title:e.title}):(0,H.jsx)(hE,{subject:e.subject,edition:e.edition,title:e.title}),(0,H.jsx)(CD,{items:r?[{label:`進入編輯`,icon:`pencil`,run:r.edit},{label:`更換封面`,icon:`image`,run:r.cover},{label:`建立自編`,icon:`copy`,run:n},{label:`刪除`,icon:`trash`,danger:!0,run:r.remove}]:[{label:`建立自編`,icon:`copy`,run:n}]})]}),(0,H.jsx)(lO,{children:t&&(0,H.jsx)(uO,{children:`已發布`})})]})}function TD({book:e,source:t,inSharedTab:n=!1,onCover:r,onCopy:i,onDelete:a}){let o=xC(e),s=e.cover??t?.art??t?.cover,c=o?MC(e.id):null,l=c&&OE(c)?.edition||(t?.edition??``),u=o?[{label:`進入編輯`,icon:`pencil`,run:()=>hx(e.id)},{label:`更換封面`,icon:`image`,run:r},...i?[{label:`建立自編`,icon:`copy`,run:i}]:[],...a?[{label:`刪除`,icon:`trash`,danger:!0,run:a}]:[]]:n?i?[{label:`建立自編`,icon:`copy`,run:i}]:[]:[{label:`進入編輯`,icon:`pencil`,run:()=>{let t=PE(e)?zE(e):e.id;t&&hx(t)}},{label:`更換封面`,icon:`image`,run:PE(e)?()=>Os(`示範教材不能更換封面`):r},...a?[{label:`刪除`,icon:`trash`,danger:!0,run:PE(e)?()=>Os(`示範教材不能刪除`):a}]:[]];return(0,H.jsxs)(aO,{children:[(0,H.jsxs)(cO,{role:`button`,tabIndex:0,"aria-label":`閱讀「${e.title}」`,onClick:()=>PE(e)?_x(e.sourceId):gx(e.id),children:[o||e.cover?s?(0,H.jsx)(gE,{art:s,edition:l,title:e.title}):(0,H.jsx)(hE,{subject:t?.subject??``,edition:l,title:e.title}):(0,H.jsx)(mE,{subject:t?.subject??``,art:s,edition:l,title:e.title,seed:e.id,frame:e.frame}),(0,H.jsx)(CD,{items:u})]}),(0,H.jsx)(lO,{children:n?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(dO,{"aria-hidden":`true`,children:(PE(e)?e.teacher:nD.teacher).slice(0,1)}),(0,H.jsxs)(`span`,{children:[PE(e)?e.teacher:nD.teacher,`老師`]})]}):e.shared&&(0,H.jsx)(uO,{children:o?`已發布`:`已共享`})})]})}var ED=1440,DD=790,OD=1700;function kD(){let e=()=>{let e=document.documentElement.clientWidth;return window.matchMedia(`(pointer: coarse)`).matches?Math.min(e/ED,window.innerHeight/DD):e>=OD?1:.9},[t,n]=(0,B.useState)(e);return(0,B.useEffect)(()=>{let t=()=>n(e());return window.addEventListener(`resize`,t),()=>window.removeEventListener(`resize`,t)},[]),t}var AD=V.div`
  zoom: var(--z, 1);
  min-block-size: calc(100vh / var(--z, 1));
  background: ${e=>e.theme.surface.backdrop};
  padding: 24px 32px 48px;
  /* 一排最少要放得下的書寬：筆電視窗沒開滿（約 1200）也能一排 6 本（2026-10-27 乙練） */
  --card-w: 176px;
  box-sizing: border-box;
`,jD=V.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,MD=V.div`
  display: flex;
  align-items: center;
  gap: 14px;
`,ND=V.span`
  display: block;
  font-family: 'FanThinkGrotesk', var(--ds-typography-font-sans);
  font-weight: 700;
  font-size: 26px;
  letter-spacing: 0.2em;
  line-height: 1.2;
`,PD=V.span`
  display: block;
  font-family: ${e=>e.theme.typography.fontDisplay};
  font-size: 18px;
  line-height: 1.3;
`,FD=V.div`
  position: relative;
  z-index: 10;
`,ID=V.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 0 0 12px;
  border: none;
  border-radius: 999px;
  background: none;
  font: inherit;
  font-size: ${e=>e.theme.typography.bodySmSize};
  color: ${e=>e.theme.text.primary};
  cursor: pointer;
`,LD=V.hr`
  margin: 4px 6px;
  border: none;
  border-block-start: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
`,RD=V.span`
  padding: 4px 10px 2px;
  font-size: ${e=>e.theme.typography.captionSize};
  color: ${e=>e.theme.text.tertiary};
  white-space: nowrap;
`,zD=V.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block-end: 24px;
`,BD=V.button`
  position: absolute;
  inset-inline-end: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  block-size: 40px;
  padding: 0 18px 0 20px;
  border: none;
  border-radius: 999px;
  background: ${e=>e.theme.action.primaryBg};
  color: ${e=>e.theme.action.primaryText};
  font: inherit;
  font-size: ${e=>e.theme.typography.bodySmSize};
  font-weight: 500;
  cursor: pointer;

  &:hover { background: ${e=>e.theme.action.primaryBgHover}; }
`,VD=V.span`
  display: grid;
  place-items: center;
  inline-size: 44px;
  block-size: 44px;
  border-radius: 999px;
  background: ${e=>e.theme.surface.inverse};
  color: ${e=>e.theme.text.onInverse};
  font-size: ${e=>e.theme.typography.bodySize};
`,HD=V.nav`
  display: flex;
  gap: 8px;
  margin: 28px 0 16px;
`,UD=V.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  block-size: 44px;
  padding: 0 16px;
  border: none;
  border-radius: 999px;
  background: ${e=>e.$on?e.theme.surface.raised:`transparent`};
  color: ${e=>e.$on?e.theme.text.primary:e.theme.text.secondary};
  font: inherit;
  font-size: ${e=>e.theme.typography.bodySmSize};
  font-weight: ${e=>e.$on?500:400};
  cursor: ${e=>e.$on?`default`:`not-allowed`};
`,WD=V.main`
  background: ${e=>e.theme.surface.raised};
  border-radius: 24px;
  padding: 20px 64px 48px;
`,GD=V.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`,KD=V.button`
  position: relative;
  padding: 6px 8px 10px;
  border: none;
  border-radius: 8px;
  background: none;
  font: inherit;
  font-size: ${e=>e.theme.typography.bodySize};
  font-weight: ${e=>e.$on?600:400};
  color: ${e=>e.$on?e.theme.text.accent:e.theme.text.secondary};
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    inset: auto 8px 0;
    block-size: 2px;
    border-radius: 2px;
    background: ${e=>e.theme.brand.accentOnLight};
    transform: scaleX(${e=>+!!e.$on});
    transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  &:hover { color: ${e=>e.$on?e.theme.text.accent:e.theme.text.primary}; }
  /* 鍵盤選到：不畫框，字底下鋪一塊淡灰圓角 */
  &:focus-visible { outline: none; background: ${e=>e.theme.surface.sunken}; }
`,qD=V.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin: 80px 0;
  text-align: center;
`,JD=V.span`
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  margin-block-end: 8px;
  border-radius: 50%;
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.text.tertiary};
  svg { width: 40px; height: 40px; }
`,YD=V.p`
  margin: 0;
  color: ${e=>e.theme.text.secondary};
  font-size: ${e=>e.theme.typography.bodySize};
  font-weight: 500;
`,XD=V.p`
  margin: 0;
  color: ${e=>e.theme.text.tertiary};
  font-size: ${e=>e.theme.typography.bodySmSize};
`,ZD=V.section`
  & + & { margin-block-start: 40px; }
`,QD=V.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-block-end: 16px;

  h2 {
    margin: 0;
    font-size: 24px;
    line-height: 35px;
    font-weight: 700;
  }
`;function $D(){let e=(0,B.useRef)(null),[t,n]=(0,B.useState)(5);return(0,B.useEffect)(()=>{let t=e.current;if(!t)return;let r=()=>n(Math.min(document.documentElement.clientWidth>=OD?7:6,Math.max(1,getComputedStyle(t).gridTemplateColumns.split(` `).filter(Boolean).length)));r();let i=new ResizeObserver(r);return i.observe(t),window.addEventListener(`resize`,r),()=>{i.disconnect(),window.removeEventListener(`resize`,r)}},[]),[e,t]}var eO=V.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-inline-start: auto;
  block-size: 44px;
  padding: 0 12px 0 16px;
  border: none;
  border-radius: 999px;
  background: none;
  color: ${e=>e.theme.text.primary};
  font: inherit;
  font-size: ${e=>e.theme.typography.bodySize};
  cursor: pointer;
  &:hover { background: ${e=>e.theme.action.ghostBgHover}; }
`,tO=V.button`
  display: grid;
  place-items: center;
  inline-size: 44px;
  block-size: 44px;
  margin-block-end: 24px;
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
  border-radius: 50%;
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.primary};
  cursor: pointer;
  &:hover { background: ${e=>e.theme.action.ghostBgHover}; }
`,nO=V.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--card-w));
  gap: 24px;
`,rO=V.div`
  position: absolute;
  inset-block-start: 49px;
  inset-inline-end: 9px;
  transform-origin: top right;
  animation: shelf-menu-in 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
  @keyframes shelf-menu-in {
    from { opacity: 0; transform: translateY(-4px) scale(0.92); }
    to { opacity: 1; transform: none; }
  }
  @media (prefers-reduced-motion: reduce) { animation: none; }
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-inline-size: 132px;
  padding: 6px;
  border-radius: 16px;
  background: ${e=>e.theme.surface.page};
  box-shadow: ${e=>e.theme.shadow.popover};
`,iO=V.button`
  display: flex;
  align-items: center;
  gap: 8px;
  min-block-size: 36px;
  padding: 0 10px;
  border: none;
  border-radius: 10px;
  background: transparent;
  font: inherit;
  font-size: ${e=>e.theme.typography.bodySmSize};
  color: ${e=>e.$danger?e.theme.feedback.errorDefault:e.theme.text.primary};
  cursor: pointer;

  &:hover { background: ${e=>e.theme.surface.muted}; }
`,aO=V.article`
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
  transition: transform 0.35s cubic-bezier(0.34, 1.8, 0.64, 1);

  &:hover,
  &:focus-within {
    transform: translateY(-14px) scale(1.03);
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover, &:focus-within { transform: none; }
  }
`,oO=V.div`
  position: absolute;
  /* 可點範圍比圓鈕大一圈（52px），點偏一點也不會落到封面變成閱讀 */
  inset-block-start: -1px;
  inset-inline-end: -1px;
  z-index: 2;
  opacity: ${e=>+!!e.$open};
  transition: opacity 0.15s;
  @media (hover: none) { opacity: 1; }
`,sO=V.button`
  display: grid;
  place-items: center;
  inline-size: 52px;
  block-size: 52px;
  padding: 0;
  border: none;
  background: none;
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
  & > span {
    display: grid;
    place-items: center;
    inline-size: 34px;
    block-size: 34px;
    border-radius: 999px;
    background: ${e=>e.theme.surface.raised};
    box-shadow: 0 2px 8px rgba(26, 25, 23, 0.14);
  }
`,cO=V.div`
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(26, 25, 23, 0.08);
  transition: box-shadow 0.35s ease;

  ${aO}:hover &, ${aO}:focus-within & { box-shadow: 0 22px 40px rgba(26, 25, 23, 0.22); }
  &:hover ${oO}, &:focus-within ${oO} { opacity: 1; }
`,lO=V.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-block-size: 24px;
  margin-block-start: 10px;
  font-size: 15px;
  color: ${e=>e.theme.text.primary};
  min-inline-size: 0;

  span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`,uO=V.span`
  display: inline-flex;
  align-items: center;
  block-size: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: ${e=>e.theme.brand.primary};
  color: ${e=>e.theme.text.primary};
  font-size: 13px;
  font-weight: 500;
`,dO=V.span`
  display: grid;
  place-items: center;
  flex: none;
  inline-size: 24px;
  block-size: 24px;
  border-radius: 999px;
  background: #1A1A1A;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 500;
  /* 行高收成 1，中文字才會在圓的正中間（沿用外層行高會往下掉） */
  line-height: 1;
`,fO=c(o(((e,t)=>{(function(n,r){typeof e==`object`&&typeof t==`object`?t.exports=r():typeof define==`function`&&define.amd?define(`Matter`,[],r):typeof e==`object`?e.Matter=r():n.Matter=r()})(e,function(){return(function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){typeof Symbol<`u`&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:`Module`}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(t&1&&(e=n(e)),t&8||t&4&&typeof e==`object`&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),t&2&&typeof e!=`string`)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,`a`,t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p=``,n(n.s=20)})([(function(e,t){var n={};e.exports=n,(function(){n._baseDelta=1e3/60,n._nextId=0,n._seed=0,n._nowStartTime=+new Date,n._warnedOnce={},n._decomp=null,n.extend=function(e,t){var r,i;typeof t==`boolean`?(r=2,i=t):(r=1,i=!0);for(var a=r;a<arguments.length;a++){var o=arguments[a];if(o)for(var s in o)i&&o[s]&&o[s].constructor===Object&&(!e[s]||e[s].constructor===Object)?(e[s]=e[s]||{},n.extend(e[s],i,o[s])):e[s]=o[s]}return e},n.clone=function(e,t){return n.extend({},t,e)},n.keys=function(e){if(Object.keys)return Object.keys(e);var t=[];for(var n in e)t.push(n);return t},n.values=function(e){var t=[];if(Object.keys){for(var n=Object.keys(e),r=0;r<n.length;r++)t.push(e[n[r]]);return t}for(var i in e)t.push(e[i]);return t},n.get=function(e,t,n,r){t=t.split(`.`).slice(n,r);for(var i=0;i<t.length;i+=1)e=e[t[i]];return e},n.set=function(e,t,r,i,a){var o=t.split(`.`).slice(i,a);return n.get(e,t,0,-1)[o[o.length-1]]=r,r},n.shuffle=function(e){for(var t=e.length-1;t>0;t--){var r=Math.floor(n.random()*(t+1)),i=e[t];e[t]=e[r],e[r]=i}return e},n.choose=function(e){return e[Math.floor(n.random()*e.length)]},n.isElement=function(e){return typeof HTMLElement<`u`?e instanceof HTMLElement:!!(e&&e.nodeType&&e.nodeName)},n.isArray=function(e){return Object.prototype.toString.call(e)===`[object Array]`},n.isFunction=function(e){return typeof e==`function`},n.isPlainObject=function(e){return typeof e==`object`&&e.constructor===Object},n.isString=function(e){return toString.call(e)===`[object String]`},n.clamp=function(e,t,n){return e<t?t:e>n?n:e},n.sign=function(e){return e<0?-1:1},n.now=function(){if(typeof window<`u`&&window.performance){if(window.performance.now)return window.performance.now();if(window.performance.webkitNow)return window.performance.webkitNow()}return Date.now?Date.now():new Date-n._nowStartTime},n.random=function(t,n){return t=t===void 0?0:t,n=n===void 0?1:n,t+e()*(n-t)};var e=function(){return n._seed=(n._seed*9301+49297)%233280,n._seed/233280};n.colorToNumber=function(e){return e=e.replace(`#`,``),e.length==3&&(e=e.charAt(0)+e.charAt(0)+e.charAt(1)+e.charAt(1)+e.charAt(2)+e.charAt(2)),parseInt(e,16)},n.logLevel=1,n.log=function(){console&&n.logLevel>0&&n.logLevel<=3&&console.log.apply(console,[`matter-js:`].concat(Array.prototype.slice.call(arguments)))},n.info=function(){console&&n.logLevel>0&&n.logLevel<=2&&console.info.apply(console,[`matter-js:`].concat(Array.prototype.slice.call(arguments)))},n.warn=function(){console&&n.logLevel>0&&n.logLevel<=3&&console.warn.apply(console,[`matter-js:`].concat(Array.prototype.slice.call(arguments)))},n.warnOnce=function(){var e=Array.prototype.slice.call(arguments).join(` `);n._warnedOnce[e]||(n.warn(e),n._warnedOnce[e]=!0)},n.deprecated=function(e,t,r){e[t]=n.chain(function(){n.warnOnce(`🔅 deprecated 🔅`,r)},e[t])},n.nextId=function(){return n._nextId++},n.indexOf=function(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0;n<e.length;n++)if(e[n]===t)return n;return-1},n.map=function(e,t){if(e.map)return e.map(t);for(var n=[],r=0;r<e.length;r+=1)n.push(t(e[r]));return n},n.topologicalSort=function(e){var t=[],r=[],i=[];for(var a in e)!r[a]&&!i[a]&&n._topologicalSort(a,r,i,e,t);return t},n._topologicalSort=function(e,t,r,i,a){var o=i[e]||[];r[e]=!0;for(var s=0;s<o.length;s+=1){var c=o[s];r[c]||t[c]||n._topologicalSort(c,t,r,i,a)}r[e]=!1,t[e]=!0,a.push(e)},n.chain=function(){for(var e=[],t=0;t<arguments.length;t+=1){var n=arguments[t];n._chained?e.push.apply(e,n._chained):e.push(n)}var r=function(){for(var t,n=Array(arguments.length),r=0,i=arguments.length;r<i;r++)n[r]=arguments[r];for(r=0;r<e.length;r+=1){var a=e[r].apply(t,n);a!==void 0&&(t=a)}return t};return r._chained=e,r},n.chainPathBefore=function(e,t,r){return n.set(e,t,n.chain(r,n.get(e,t)))},n.chainPathAfter=function(e,t,r){return n.set(e,t,n.chain(n.get(e,t),r))},n.setDecomp=function(e){n._decomp=e},n.getDecomp=function(){var e=n._decomp;try{!e&&typeof window<`u`&&(e=window.decomp),!e&&typeof global<`u`&&(e=global.decomp)}catch{e=null}return e}})()}),(function(e,t){var n={};e.exports=n,(function(){n.create=function(e){var t={min:{x:0,y:0},max:{x:0,y:0}};return e&&n.update(t,e),t},n.update=function(e,t,n){e.min.x=1/0,e.max.x=-1/0,e.min.y=1/0,e.max.y=-1/0;for(var r=0;r<t.length;r++){var i=t[r];i.x>e.max.x&&(e.max.x=i.x),i.x<e.min.x&&(e.min.x=i.x),i.y>e.max.y&&(e.max.y=i.y),i.y<e.min.y&&(e.min.y=i.y)}n&&(n.x>0?e.max.x+=n.x:e.min.x+=n.x,n.y>0?e.max.y+=n.y:e.min.y+=n.y)},n.contains=function(e,t){return t.x>=e.min.x&&t.x<=e.max.x&&t.y>=e.min.y&&t.y<=e.max.y},n.overlaps=function(e,t){return e.min.x<=t.max.x&&e.max.x>=t.min.x&&e.max.y>=t.min.y&&e.min.y<=t.max.y},n.translate=function(e,t){e.min.x+=t.x,e.max.x+=t.x,e.min.y+=t.y,e.max.y+=t.y},n.shift=function(e,t){var n=e.max.x-e.min.x,r=e.max.y-e.min.y;e.min.x=t.x,e.max.x=t.x+n,e.min.y=t.y,e.max.y=t.y+r}})()}),(function(e,t){var n={};e.exports=n,(function(){n.create=function(e,t){return{x:e||0,y:t||0}},n.clone=function(e){return{x:e.x,y:e.y}},n.magnitude=function(e){return Math.sqrt(e.x*e.x+e.y*e.y)},n.magnitudeSquared=function(e){return e.x*e.x+e.y*e.y},n.rotate=function(e,t,n){var r=Math.cos(t),i=Math.sin(t);n||={};var a=e.x*r-e.y*i;return n.y=e.x*i+e.y*r,n.x=a,n},n.rotateAbout=function(e,t,n,r){var i=Math.cos(t),a=Math.sin(t);r||={};var o=n.x+((e.x-n.x)*i-(e.y-n.y)*a);return r.y=n.y+((e.x-n.x)*a+(e.y-n.y)*i),r.x=o,r},n.normalise=function(e){var t=n.magnitude(e);return t===0?{x:0,y:0}:{x:e.x/t,y:e.y/t}},n.dot=function(e,t){return e.x*t.x+e.y*t.y},n.cross=function(e,t){return e.x*t.y-e.y*t.x},n.cross3=function(e,t,n){return(t.x-e.x)*(n.y-e.y)-(t.y-e.y)*(n.x-e.x)},n.add=function(e,t,n){return n||={},n.x=e.x+t.x,n.y=e.y+t.y,n},n.sub=function(e,t,n){return n||={},n.x=e.x-t.x,n.y=e.y-t.y,n},n.mult=function(e,t){return{x:e.x*t,y:e.y*t}},n.div=function(e,t){return{x:e.x/t,y:e.y/t}},n.perp=function(e,t){return t=t===!0?-1:1,{x:t*-e.y,y:t*e.x}},n.neg=function(e){return{x:-e.x,y:-e.y}},n.angle=function(e,t){return Math.atan2(t.y-e.y,t.x-e.x)},n._temp=[n.create(),n.create(),n.create(),n.create(),n.create(),n.create()]})()}),(function(e,t,n){var r={};e.exports=r;var i=n(2),a=n(0);(function(){r.create=function(e,t){for(var n=[],r=0;r<e.length;r++){var i=e[r],a={x:i.x,y:i.y,index:r,body:t,isInternal:!1};n.push(a)}return n},r.fromPath=function(e,t){var n=/L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/gi,i=[];return e.replace(n,function(e,t,n){i.push({x:parseFloat(t),y:parseFloat(n)})}),r.create(i,t)},r.centre=function(e){for(var t=r.area(e,!0),n={x:0,y:0},a,o,s,c=0;c<e.length;c++)s=(c+1)%e.length,a=i.cross(e[c],e[s]),o=i.mult(i.add(e[c],e[s]),a),n=i.add(n,o);return i.div(n,6*t)},r.mean=function(e){for(var t={x:0,y:0},n=0;n<e.length;n++)t.x+=e[n].x,t.y+=e[n].y;return i.div(t,e.length)},r.area=function(e,t){for(var n=0,r=e.length-1,i=0;i<e.length;i++)n+=(e[r].x-e[i].x)*(e[r].y+e[i].y),r=i;return t?n/2:Math.abs(n)/2},r.inertia=function(e,t){for(var n=0,r=0,a=e,o,s,c=0;c<a.length;c++)s=(c+1)%a.length,o=Math.abs(i.cross(a[s],a[c])),n+=o*(i.dot(a[s],a[s])+i.dot(a[s],a[c])+i.dot(a[c],a[c])),r+=o;return t/6*(n/r)},r.translate=function(e,t,n){n=n===void 0?1:n;var r=e.length,i=t.x*n,a=t.y*n,o;for(o=0;o<r;o++)e[o].x+=i,e[o].y+=a;return e},r.rotate=function(e,t,n){if(t!==0){var r=Math.cos(t),i=Math.sin(t),a=n.x,o=n.y,s=e.length,c,l,u,d;for(d=0;d<s;d++)c=e[d],l=c.x-a,u=c.y-o,c.x=a+(l*r-u*i),c.y=o+(l*i+u*r);return e}},r.contains=function(e,t){for(var n=t.x,r=t.y,i=e.length,a=e[i-1],o,s=0;s<i;s++){if(o=e[s],(n-a.x)*(o.y-a.y)+(r-a.y)*(a.x-o.x)>0)return!1;a=o}return!0},r.scale=function(e,t,n,a){if(t===1&&n===1)return e;a||=r.centre(e);for(var o,s,c=0;c<e.length;c++)o=e[c],s=i.sub(o,a),e[c].x=a.x+s.x*t,e[c].y=a.y+s.y*n;return e},r.chamfer=function(e,t,n,r,o){typeof t==`number`?t=[t]:t||=[8],n=n===void 0?-1:n,r||=2,o||=14;for(var s=[],c=0;c<e.length;c++){var l=e[c-1>=0?c-1:e.length-1],u=e[c],d=e[(c+1)%e.length],f=t[c<t.length?c:t.length-1];if(f===0){s.push(u);continue}var p=i.normalise({x:u.y-l.y,y:l.x-u.x}),m=i.normalise({x:d.y-u.y,y:u.x-d.x}),h=Math.sqrt(2*f**2),g=i.mult(a.clone(p),f),_=i.normalise(i.mult(i.add(p,m),.5)),v=i.sub(u,i.mult(_,h)),y=n;n===-1&&(y=f**.32*1.75),y=a.clamp(y,r,o),y%2==1&&(y+=1);for(var b=Math.acos(i.dot(p,m))/y,x=0;x<y;x++)s.push(i.add(i.rotate(g,b*x),v))}return s},r.clockwiseSort=function(e){var t=r.mean(e);return e.sort(function(e,n){return i.angle(t,e)-i.angle(t,n)}),e},r.isConvex=function(e){var t=0,n=e.length,r,i,a,o;if(n<3)return null;for(r=0;r<n;r++)if(i=(r+1)%n,a=(r+2)%n,o=(e[i].x-e[r].x)*(e[a].y-e[i].y),o-=(e[i].y-e[r].y)*(e[a].x-e[i].x),o<0?t|=1:o>0&&(t|=2),t===3)return!1;return t!==0||null},r.hull=function(e){var t=[],n=[],r,a;for(e=e.slice(0),e.sort(function(e,t){var n=e.x-t.x;return n===0?e.y-t.y:n}),a=0;a<e.length;a+=1){for(r=e[a];n.length>=2&&i.cross3(n[n.length-2],n[n.length-1],r)<=0;)n.pop();n.push(r)}for(a=e.length-1;a>=0;--a){for(r=e[a];t.length>=2&&i.cross3(t[t.length-2],t[t.length-1],r)<=0;)t.pop();t.push(r)}return t.pop(),n.pop(),t.concat(n)}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(3),a=n(2),o=n(7),s=n(0),c=n(1),l=n(11);(function(){r._timeCorrection=!0,r._inertiaScale=4,r._nextCollidingGroupId=1,r._nextNonCollidingGroupId=-1,r._nextCategory=1,r._baseDelta=1e3/60,r.create=function(t){var n={id:s.nextId(),type:`body`,label:`Body`,parts:[],plugin:{},angle:0,vertices:i.fromPath(`L 0 0 L 40 0 L 40 40 L 0 40`),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isSensor:!1,isStatic:!1,isSleeping:!1,motion:0,sleepThreshold:60,density:.001,restitution:0,friction:.1,frictionStatic:.5,frictionAir:.01,collisionFilter:{category:1,mask:4294967295,group:0},slop:.05,timeScale:1,render:{visible:!0,opacity:1,strokeStyle:null,fillStyle:null,lineWidth:null,sprite:{xScale:1,yScale:1,xOffset:0,yOffset:0}},events:null,bounds:null,chamfer:null,circleRadius:0,positionPrev:null,anglePrev:0,parent:null,axes:null,area:0,mass:0,inertia:0,deltaTime:1e3/60,_original:null},r=s.extend(n,t);return e(r,t),r},r.nextGroup=function(e){return e?r._nextNonCollidingGroupId--:r._nextCollidingGroupId++},r.nextCategory=function(){return r._nextCategory<<=1,r._nextCategory};var e=function(e,t){t||={},r.set(e,{bounds:e.bounds||c.create(e.vertices),positionPrev:e.positionPrev||a.clone(e.position),anglePrev:e.anglePrev||e.angle,vertices:e.vertices,parts:e.parts||[e],isStatic:e.isStatic,isSleeping:e.isSleeping,parent:e.parent||e}),i.rotate(e.vertices,e.angle,e.position),l.rotate(e.axes,e.angle),c.update(e.bounds,e.vertices,e.velocity),r.set(e,{axes:t.axes||e.axes,area:t.area||e.area,mass:t.mass||e.mass,inertia:t.inertia||e.inertia});var n=e.isStatic?`#14151f`:s.choose([`#f19648`,`#f5d259`,`#f55a3c`,`#063e7b`,`#ececd1`]),o=e.isStatic?`#555`:`#ccc`,u=e.isStatic&&e.render.fillStyle===null?1:0;e.render.fillStyle=e.render.fillStyle||n,e.render.strokeStyle=e.render.strokeStyle||o,e.render.lineWidth=e.render.lineWidth||u,e.render.sprite.xOffset+=-(e.bounds.min.x-e.position.x)/(e.bounds.max.x-e.bounds.min.x),e.render.sprite.yOffset+=-(e.bounds.min.y-e.position.y)/(e.bounds.max.y-e.bounds.min.y)};r.set=function(e,t,n){for(var i in typeof t==`string`&&(i=t,t={},t[i]=n),t)if(Object.prototype.hasOwnProperty.call(t,i))switch(n=t[i],i){case`isStatic`:r.setStatic(e,n);break;case`isSleeping`:o.set(e,n);break;case`mass`:r.setMass(e,n);break;case`density`:r.setDensity(e,n);break;case`inertia`:r.setInertia(e,n);break;case`vertices`:r.setVertices(e,n);break;case`position`:r.setPosition(e,n);break;case`angle`:r.setAngle(e,n);break;case`velocity`:r.setVelocity(e,n);break;case`angularVelocity`:r.setAngularVelocity(e,n);break;case`speed`:r.setSpeed(e,n);break;case`angularSpeed`:r.setAngularSpeed(e,n);break;case`parts`:r.setParts(e,n);break;case`centre`:r.setCentre(e,n);break;default:e[i]=n}},r.setStatic=function(e,t){for(var n=0;n<e.parts.length;n++){var r=e.parts[n];t?(r.isStatic||(r._original={restitution:r.restitution,friction:r.friction,mass:r.mass,inertia:r.inertia,density:r.density,inverseMass:r.inverseMass,inverseInertia:r.inverseInertia}),r.restitution=0,r.friction=1,r.mass=r.inertia=r.density=1/0,r.inverseMass=r.inverseInertia=0,r.positionPrev.x=r.position.x,r.positionPrev.y=r.position.y,r.anglePrev=r.angle,r.angularVelocity=0,r.speed=0,r.angularSpeed=0,r.motion=0):r._original&&=(r.restitution=r._original.restitution,r.friction=r._original.friction,r.mass=r._original.mass,r.inertia=r._original.inertia,r.density=r._original.density,r.inverseMass=r._original.inverseMass,r.inverseInertia=r._original.inverseInertia,null),r.isStatic=t}},r.setMass=function(e,t){e.inertia=e.inertia/(e.mass/6)*(t/6),e.inverseInertia=1/e.inertia,e.mass=t,e.inverseMass=1/e.mass,e.density=e.mass/e.area},r.setDensity=function(e,t){r.setMass(e,t*e.area),e.density=t},r.setInertia=function(e,t){e.inertia=t,e.inverseInertia=1/e.inertia},r.setVertices=function(e,t){e.vertices=t[0].body===e?t:i.create(t,e),e.axes=l.fromVertices(e.vertices),e.area=i.area(e.vertices),r.setMass(e,e.density*e.area);var n=i.centre(e.vertices);i.translate(e.vertices,n,-1),r.setInertia(e,r._inertiaScale*i.inertia(e.vertices,e.mass)),i.translate(e.vertices,e.position),c.update(e.bounds,e.vertices,e.velocity)},r.setParts=function(e,t,n){var a;for(t=t.slice(0),e.parts.length=0,e.parts.push(e),e.parent=e,a=0;a<t.length;a++){var o=t[a];o!==e&&(o.parent=e,e.parts.push(o))}if(e.parts.length!==1){if(n=n===void 0||n,n){var s=[];for(a=0;a<t.length;a++)s=s.concat(t[a].vertices);i.clockwiseSort(s);var c=i.hull(s),l=i.centre(c);r.setVertices(e,c),i.translate(e.vertices,l)}var u=r._totalProperties(e);e.area=u.area,e.parent=e,e.position.x=u.centre.x,e.position.y=u.centre.y,e.positionPrev.x=u.centre.x,e.positionPrev.y=u.centre.y,r.setMass(e,u.mass),r.setInertia(e,u.inertia),r.setPosition(e,u.centre)}},r.setCentre=function(e,t,n){n?(e.positionPrev.x+=t.x,e.positionPrev.y+=t.y,e.position.x+=t.x,e.position.y+=t.y):(e.positionPrev.x=t.x-(e.position.x-e.positionPrev.x),e.positionPrev.y=t.y-(e.position.y-e.positionPrev.y),e.position.x=t.x,e.position.y=t.y)},r.setPosition=function(e,t,n){var r=a.sub(t,e.position);n?(e.positionPrev.x=e.position.x,e.positionPrev.y=e.position.y,e.velocity.x=r.x,e.velocity.y=r.y,e.speed=a.magnitude(r)):(e.positionPrev.x+=r.x,e.positionPrev.y+=r.y);for(var o=0;o<e.parts.length;o++){var s=e.parts[o];s.position.x+=r.x,s.position.y+=r.y,i.translate(s.vertices,r),c.update(s.bounds,s.vertices,e.velocity)}},r.setAngle=function(e,t,n){var r=t-e.angle;n?(e.anglePrev=e.angle,e.angularVelocity=r,e.angularSpeed=Math.abs(r)):e.anglePrev+=r;for(var o=0;o<e.parts.length;o++){var s=e.parts[o];s.angle+=r,i.rotate(s.vertices,r,e.position),l.rotate(s.axes,r),c.update(s.bounds,s.vertices,e.velocity),o>0&&a.rotateAbout(s.position,r,e.position,s.position)}},r.setVelocity=function(e,t){var n=e.deltaTime/r._baseDelta;e.positionPrev.x=e.position.x-t.x*n,e.positionPrev.y=e.position.y-t.y*n,e.velocity.x=(e.position.x-e.positionPrev.x)/n,e.velocity.y=(e.position.y-e.positionPrev.y)/n,e.speed=a.magnitude(e.velocity)},r.getVelocity=function(e){var t=r._baseDelta/e.deltaTime;return{x:(e.position.x-e.positionPrev.x)*t,y:(e.position.y-e.positionPrev.y)*t}},r.getSpeed=function(e){return a.magnitude(r.getVelocity(e))},r.setSpeed=function(e,t){r.setVelocity(e,a.mult(a.normalise(r.getVelocity(e)),t))},r.setAngularVelocity=function(e,t){var n=e.deltaTime/r._baseDelta;e.anglePrev=e.angle-t*n,e.angularVelocity=(e.angle-e.anglePrev)/n,e.angularSpeed=Math.abs(e.angularVelocity)},r.getAngularVelocity=function(e){return(e.angle-e.anglePrev)*r._baseDelta/e.deltaTime},r.getAngularSpeed=function(e){return Math.abs(r.getAngularVelocity(e))},r.setAngularSpeed=function(e,t){r.setAngularVelocity(e,s.sign(r.getAngularVelocity(e))*t)},r.translate=function(e,t,n){r.setPosition(e,a.add(e.position,t),n)},r.rotate=function(e,t,n,i){if(!n)r.setAngle(e,e.angle+t,i);else{var a=Math.cos(t),o=Math.sin(t),s=e.position.x-n.x,c=e.position.y-n.y;r.setPosition(e,{x:n.x+(s*a-c*o),y:n.y+(s*o+c*a)},i),r.setAngle(e,e.angle+t,i)}},r.scale=function(e,t,n,a){var o=0,s=0;a||=e.position;for(var u=0;u<e.parts.length;u++){var d=e.parts[u];i.scale(d.vertices,t,n,a),d.axes=l.fromVertices(d.vertices),d.area=i.area(d.vertices),r.setMass(d,e.density*d.area),i.translate(d.vertices,{x:-d.position.x,y:-d.position.y}),r.setInertia(d,r._inertiaScale*i.inertia(d.vertices,d.mass)),i.translate(d.vertices,{x:d.position.x,y:d.position.y}),u>0&&(o+=d.area,s+=d.inertia),d.position.x=a.x+(d.position.x-a.x)*t,d.position.y=a.y+(d.position.y-a.y)*n,c.update(d.bounds,d.vertices,e.velocity)}e.parts.length>1&&(e.area=o,e.isStatic||(r.setMass(e,e.density*o),r.setInertia(e,s))),e.circleRadius&&(t===n?e.circleRadius*=t:e.circleRadius=null)},r.update=function(e,t){t=(t===void 0?1e3/60:t)*e.timeScale;var n=t*t,o=r._timeCorrection?t/(e.deltaTime||t):1,u=1-e.frictionAir*(t/s._baseDelta),d=(e.position.x-e.positionPrev.x)*o,f=(e.position.y-e.positionPrev.y)*o;e.velocity.x=d*u+e.force.x/e.mass*n,e.velocity.y=f*u+e.force.y/e.mass*n,e.positionPrev.x=e.position.x,e.positionPrev.y=e.position.y,e.position.x+=e.velocity.x,e.position.y+=e.velocity.y,e.deltaTime=t,e.angularVelocity=(e.angle-e.anglePrev)*u*o+e.torque/e.inertia*n,e.anglePrev=e.angle,e.angle+=e.angularVelocity;for(var p=0;p<e.parts.length;p++){var m=e.parts[p];i.translate(m.vertices,e.velocity),p>0&&(m.position.x+=e.velocity.x,m.position.y+=e.velocity.y),e.angularVelocity!==0&&(i.rotate(m.vertices,e.angularVelocity,e.position),l.rotate(m.axes,e.angularVelocity),p>0&&a.rotateAbout(m.position,e.angularVelocity,e.position,m.position)),c.update(m.bounds,m.vertices,e.velocity)}},r.updateVelocities=function(e){var t=r._baseDelta/e.deltaTime,n=e.velocity;n.x=(e.position.x-e.positionPrev.x)*t,n.y=(e.position.y-e.positionPrev.y)*t,e.speed=Math.sqrt(n.x*n.x+n.y*n.y),e.angularVelocity=(e.angle-e.anglePrev)*t,e.angularSpeed=Math.abs(e.angularVelocity)},r.applyForce=function(e,t,n){var r={x:t.x-e.position.x,y:t.y-e.position.y};e.force.x+=n.x,e.force.y+=n.y,e.torque+=r.x*n.y-r.y*n.x},r._totalProperties=function(e){for(var t={mass:0,area:0,inertia:0,centre:{x:0,y:0}},n=e.parts.length===1?0:1;n<e.parts.length;n++){var r=e.parts[n],i=r.mass===1/0?1:r.mass;t.mass+=i,t.area+=r.area,t.inertia+=r.inertia,t.centre=a.add(t.centre,a.mult(r.position,i))}return t.centre=a.div(t.centre,t.mass),t}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(0);(function(){r.on=function(e,t,n){for(var r=t.split(` `),i,a=0;a<r.length;a++)i=r[a],e.events=e.events||{},e.events[i]=e.events[i]||[],e.events[i].push(n);return n},r.off=function(e,t,n){if(!t){e.events={};return}typeof t==`function`&&(n=t,t=i.keys(e.events).join(` `));for(var r=t.split(` `),a=0;a<r.length;a++){var o=e.events[r[a]],s=[];if(n&&o)for(var c=0;c<o.length;c++)o[c]!==n&&s.push(o[c]);e.events[r[a]]=s}},r.trigger=function(e,t,n){var r,a,o,s,c=e.events;if(c&&i.keys(c).length>0){n||={},r=t.split(` `);for(var l=0;l<r.length;l++)if(a=r[l],o=c[a],o){s=i.clone(n,!1),s.name=a,s.source=e;for(var u=0;u<o.length;u++)o[u].apply(e,[s])}}}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(5),a=n(0),o=n(1),s=n(4);(function(){r.create=function(e){return a.extend({id:a.nextId(),type:`composite`,parent:null,isModified:!1,bodies:[],constraints:[],composites:[],label:`Composite`,plugin:{},cache:{allBodies:null,allConstraints:null,allComposites:null}},e)},r.setModified=function(e,t,n,i){if(e.isModified=t,t&&e.cache&&(e.cache.allBodies=null,e.cache.allConstraints=null,e.cache.allComposites=null),n&&e.parent&&r.setModified(e.parent,t,n,i),i)for(var a=0;a<e.composites.length;a++){var o=e.composites[a];r.setModified(o,t,n,i)}},r.add=function(e,t){var n=[].concat(t);i.trigger(e,`beforeAdd`,{object:t});for(var o=0;o<n.length;o++){var s=n[o];switch(s.type){case`body`:if(s.parent!==s){a.warn(`Composite.add: skipped adding a compound body part (you must add its parent instead)`);break}r.addBody(e,s);break;case`constraint`:r.addConstraint(e,s);break;case`composite`:r.addComposite(e,s);break;case`mouseConstraint`:r.addConstraint(e,s.constraint)}}return i.trigger(e,`afterAdd`,{object:t}),e},r.remove=function(e,t,n){var a=[].concat(t);i.trigger(e,`beforeRemove`,{object:t});for(var o=0;o<a.length;o++){var s=a[o];switch(s.type){case`body`:r.removeBody(e,s,n);break;case`constraint`:r.removeConstraint(e,s,n);break;case`composite`:r.removeComposite(e,s,n);break;case`mouseConstraint`:r.removeConstraint(e,s.constraint)}}return i.trigger(e,`afterRemove`,{object:t}),e},r.addComposite=function(e,t){return e.composites.push(t),t.parent=e,r.setModified(e,!0,!0,!1),e},r.removeComposite=function(e,t,n){var i=a.indexOf(e.composites,t);if(i!==-1){var o=r.allBodies(t);r.removeCompositeAt(e,i);for(var s=0;s<o.length;s++)o[s].sleepCounter=0}if(n)for(var s=0;s<e.composites.length;s++)r.removeComposite(e.composites[s],t,!0);return e},r.removeCompositeAt=function(e,t){return e.composites.splice(t,1),r.setModified(e,!0,!0,!1),e},r.addBody=function(e,t){return e.bodies.push(t),r.setModified(e,!0,!0,!1),e},r.removeBody=function(e,t,n){var i=a.indexOf(e.bodies,t);if(i!==-1&&(r.removeBodyAt(e,i),t.sleepCounter=0),n)for(var o=0;o<e.composites.length;o++)r.removeBody(e.composites[o],t,!0);return e},r.removeBodyAt=function(e,t){return e.bodies.splice(t,1),r.setModified(e,!0,!0,!1),e},r.addConstraint=function(e,t){return e.constraints.push(t),r.setModified(e,!0,!0,!1),e},r.removeConstraint=function(e,t,n){var i=a.indexOf(e.constraints,t);if(i!==-1&&r.removeConstraintAt(e,i),n)for(var o=0;o<e.composites.length;o++)r.removeConstraint(e.composites[o],t,!0);return e},r.removeConstraintAt=function(e,t){return e.constraints.splice(t,1),r.setModified(e,!0,!0,!1),e},r.clear=function(e,t,n){if(n)for(var i=0;i<e.composites.length;i++)r.clear(e.composites[i],t,!0);return t?e.bodies=e.bodies.filter(function(e){return e.isStatic}):e.bodies.length=0,e.constraints.length=0,e.composites.length=0,r.setModified(e,!0,!0,!1),e},r.allBodies=function(e){if(e.cache&&e.cache.allBodies)return e.cache.allBodies;for(var t=[].concat(e.bodies),n=0;n<e.composites.length;n++)t=t.concat(r.allBodies(e.composites[n]));return e.cache&&(e.cache.allBodies=t),t},r.allConstraints=function(e){if(e.cache&&e.cache.allConstraints)return e.cache.allConstraints;for(var t=[].concat(e.constraints),n=0;n<e.composites.length;n++)t=t.concat(r.allConstraints(e.composites[n]));return e.cache&&(e.cache.allConstraints=t),t},r.allComposites=function(e){if(e.cache&&e.cache.allComposites)return e.cache.allComposites;for(var t=[].concat(e.composites),n=0;n<e.composites.length;n++)t=t.concat(r.allComposites(e.composites[n]));return e.cache&&(e.cache.allComposites=t),t},r.get=function(e,t,n){var i,a;switch(n){case`body`:i=r.allBodies(e);break;case`constraint`:i=r.allConstraints(e);break;case`composite`:i=r.allComposites(e).concat(e)}return i?(a=i.filter(function(e){return e.id.toString()===t.toString()}),a.length===0?null:a[0]):null},r.move=function(e,t,n){return r.remove(e,t),r.add(n,t),e},r.rebase=function(e){for(var t=r.allBodies(e).concat(r.allConstraints(e)).concat(r.allComposites(e)),n=0;n<t.length;n++)t[n].id=a.nextId();return e},r.translate=function(e,t,n){for(var i=n?r.allBodies(e):e.bodies,a=0;a<i.length;a++)s.translate(i[a],t);return e},r.rotate=function(e,t,n,i){for(var a=Math.cos(t),o=Math.sin(t),c=i?r.allBodies(e):e.bodies,l=0;l<c.length;l++){var u=c[l],d=u.position.x-n.x,f=u.position.y-n.y;s.setPosition(u,{x:n.x+(d*a-f*o),y:n.y+(d*o+f*a)}),s.rotate(u,t)}return e},r.scale=function(e,t,n,i,a){for(var o=a?r.allBodies(e):e.bodies,c=0;c<o.length;c++){var l=o[c],u=l.position.x-i.x,d=l.position.y-i.y;s.setPosition(l,{x:i.x+u*t,y:i.y+d*n}),s.scale(l,t,n)}return e},r.bounds=function(e){for(var t=r.allBodies(e),n=[],i=0;i<t.length;i+=1){var a=t[i];n.push(a.bounds.min,a.bounds.max)}return o.create(n)}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(4),a=n(5),o=n(0);(function(){r._motionWakeThreshold=.18,r._motionSleepThreshold=.08,r._minBias=.9,r.update=function(e,t){for(var n=t/o._baseDelta,a=r._motionSleepThreshold,s=0;s<e.length;s++){var c=e[s],l=i.getSpeed(c),u=i.getAngularSpeed(c),d=l*l+u*u;if(c.force.x!==0||c.force.y!==0){r.set(c,!1);continue}var f=Math.min(c.motion,d),p=Math.max(c.motion,d);c.motion=r._minBias*f+(1-r._minBias)*p,c.sleepThreshold>0&&c.motion<a?(c.sleepCounter+=1,c.sleepCounter>=c.sleepThreshold/n&&r.set(c,!0)):c.sleepCounter>0&&--c.sleepCounter}},r.afterCollisions=function(e){for(var t=r._motionSleepThreshold,n=0;n<e.length;n++){var i=e[n];if(i.isActive){var a=i.collision,o=a.bodyA.parent,s=a.bodyB.parent;if(!(o.isSleeping&&s.isSleeping||o.isStatic||s.isStatic)&&(o.isSleeping||s.isSleeping)){var c=o.isSleeping&&!o.isStatic?o:s,l=c===o?s:o;!c.isStatic&&l.motion>t&&r.set(c,!1)}}}},r.set=function(e,t){var n=e.isSleeping;t?(e.isSleeping=!0,e.sleepCounter=e.sleepThreshold,e.positionImpulse.x=0,e.positionImpulse.y=0,e.positionPrev.x=e.position.x,e.positionPrev.y=e.position.y,e.anglePrev=e.angle,e.speed=0,e.angularSpeed=0,e.motion=0,n||a.trigger(e,`sleepStart`)):(e.isSleeping=!1,e.sleepCounter=0,n&&a.trigger(e,`sleepEnd`))}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(3),a=n(9);(function(){var e=[],t={overlap:0,axis:null},n={overlap:0,axis:null};r.create=function(e,t){return{pair:null,collided:!1,bodyA:e,bodyB:t,parentA:e.parent,parentB:t.parent,depth:0,normal:{x:0,y:0},tangent:{x:0,y:0},penetration:{x:0,y:0},supports:[null,null],supportCount:0}},r.collides=function(e,o,s){if(r._overlapAxes(t,e.vertices,o.vertices,e.axes),t.overlap<=0||(r._overlapAxes(n,o.vertices,e.vertices,o.axes),n.overlap<=0))return null;var c=s&&s.table[a.id(e,o)],l;c?l=c.collision:(l=r.create(e,o),l.collided=!0,l.bodyA=e.id<o.id?e:o,l.bodyB=e.id<o.id?o:e,l.parentA=l.bodyA.parent,l.parentB=l.bodyB.parent),e=l.bodyA,o=l.bodyB;var u=t.overlap<n.overlap?t:n,d=l.normal,f=l.tangent,p=l.penetration,m=l.supports,h=u.overlap,g=u.axis,_=g.x,v=g.y,y=o.position.x-e.position.x,b=o.position.y-e.position.y;_*y+v*b>=0&&(_=-_,v=-v),d.x=_,d.y=v,f.x=-v,f.y=_,p.x=_*h,p.y=v*h,l.depth=h;var x=r._findSupports(e,o,d,1),S=0;if(i.contains(e.vertices,x[0])&&(m[S++]=x[0]),i.contains(e.vertices,x[1])&&(m[S++]=x[1]),S<2){var C=r._findSupports(o,e,d,-1);i.contains(o.vertices,C[0])&&(m[S++]=C[0]),S<2&&i.contains(o.vertices,C[1])&&(m[S++]=C[1])}return S===0&&(m[S++]=x[0]),l.supportCount=S,l},r._overlapAxes=function(e,t,n,r){var i=t.length,a=n.length,o=t[0].x,s=t[0].y,c=n[0].x,l=n[0].y,u=r.length,d=Number.MAX_VALUE,f=0,p,m,h,g,_,v;for(_=0;_<u;_++){var y=r[_],b=y.x,x=y.y,S=o*b+s*x,C=c*b+l*x,w=S,T=C;for(v=1;v<i;v+=1)g=t[v].x*b+t[v].y*x,g>w?w=g:g<S&&(S=g);for(v=1;v<a;v+=1)g=n[v].x*b+n[v].y*x,g>T?T=g:g<C&&(C=g);if(m=w-C,h=T-S,p=m<h?m:h,p<d&&(d=p,f=_,p<=0))break}e.axis=r[f],e.overlap=d},r._findSupports=function(t,n,r,i){var a=n.vertices,o=a.length,s=t.position.x,c=t.position.y,l=r.x*i,u=r.y*i,d=a[0],f=d,p=l*(s-f.x)+u*(c-f.y),m,h,g;for(g=1;g<o;g+=1)f=a[g],h=l*(s-f.x)+u*(c-f.y),h<p&&(p=h,d=f);return m=a[(o+d.index-1)%o],p=l*(s-m.x)+u*(c-m.y),f=a[(d.index+1)%o],l*(s-f.x)+u*(c-f.y)<p?(e[0]=d,e[1]=f,e):(e[0]=d,e[1]=m,e)}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(16);(function(){r.create=function(e,t){var n=e.bodyA,a=e.bodyB,o={id:r.id(n,a),bodyA:n,bodyB:a,collision:e,contacts:[i.create(),i.create()],contactCount:0,separation:0,isActive:!0,isSensor:n.isSensor||a.isSensor,timeCreated:t,timeUpdated:t,inverseMass:0,friction:0,frictionStatic:0,restitution:0,slop:0};return r.update(o,e,t),o},r.update=function(e,t,n){var r=t.supports,i=t.supportCount,a=e.contacts,o=t.parentA,s=t.parentB;e.isActive=!0,e.timeUpdated=n,e.collision=t,e.separation=t.depth,e.inverseMass=o.inverseMass+s.inverseMass,e.friction=o.friction<s.friction?o.friction:s.friction,e.frictionStatic=o.frictionStatic>s.frictionStatic?o.frictionStatic:s.frictionStatic,e.restitution=o.restitution>s.restitution?o.restitution:s.restitution,e.slop=o.slop>s.slop?o.slop:s.slop,e.contactCount=i,t.pair=e;var c=r[0],l=a[0],u=r[1],d=a[1];(d.vertex===c||l.vertex===u)&&(a[1]=l,a[0]=l=d,d=a[1]),l.vertex=c,d.vertex=u},r.setActive=function(e,t,n){t?(e.isActive=!0,e.timeUpdated=n):(e.isActive=!1,e.contactCount=0)},r.id=function(e,t){return e.id<t.id?e.id.toString(36)+`:`+t.id.toString(36):t.id.toString(36)+`:`+e.id.toString(36)}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(3),a=n(2),o=n(7),s=n(1),c=n(11),l=n(0);(function(){r._warming=.4,r._torqueDampen=1,r._minLength=1e-6,r.create=function(e){var t=e;t.bodyA&&!t.pointA&&(t.pointA={x:0,y:0}),t.bodyB&&!t.pointB&&(t.pointB={x:0,y:0});var n=t.bodyA?a.add(t.bodyA.position,t.pointA):t.pointA,r=t.bodyB?a.add(t.bodyB.position,t.pointB):t.pointB,i=a.magnitude(a.sub(n,r));t.length=t.length===void 0?i:t.length,t.id=t.id||l.nextId(),t.label=t.label||`Constraint`,t.type=`constraint`,t.stiffness=t.stiffness||(t.length>0?1:.7),t.damping=t.damping||0,t.angularStiffness=t.angularStiffness||0,t.angleA=t.bodyA?t.bodyA.angle:t.angleA,t.angleB=t.bodyB?t.bodyB.angle:t.angleB,t.plugin={};var o={visible:!0,lineWidth:2,strokeStyle:`#ffffff`,type:`line`,anchors:!0};return t.length===0&&t.stiffness>.1?(o.type=`pin`,o.anchors=!1):t.stiffness<.9&&(o.type=`spring`),t.render=l.extend(o,t.render),t},r.preSolveAll=function(e){for(var t=0;t<e.length;t+=1){var n=e[t],r=n.constraintImpulse;n.isStatic||r.x===0&&r.y===0&&r.angle===0||(n.position.x+=r.x,n.position.y+=r.y,n.angle+=r.angle)}},r.solveAll=function(e,t){for(var n=l.clamp(t/l._baseDelta,0,1),i=0;i<e.length;i+=1){var a=e[i],o=!a.bodyA||a.bodyA&&a.bodyA.isStatic,s=!a.bodyB||a.bodyB&&a.bodyB.isStatic;(o||s)&&r.solve(e[i],n)}for(i=0;i<e.length;i+=1)a=e[i],o=!a.bodyA||a.bodyA&&a.bodyA.isStatic,s=!a.bodyB||a.bodyB&&a.bodyB.isStatic,!o&&!s&&r.solve(e[i],n)},r.solve=function(e,t){var n=e.bodyA,i=e.bodyB,o=e.pointA,s=e.pointB;if(!(!n&&!i)){n&&!n.isStatic&&(a.rotate(o,n.angle-e.angleA,o),e.angleA=n.angle),i&&!i.isStatic&&(a.rotate(s,i.angle-e.angleB,s),e.angleB=i.angle);var c=o,l=s;if(n&&(c=a.add(n.position,o)),i&&(l=a.add(i.position,s)),!(!c||!l)){var u=a.sub(c,l),d=a.magnitude(u);d<r._minLength&&(d=r._minLength);var f=(d-e.length)/d,p=e.stiffness>=1||e.length===0?e.stiffness*t:e.stiffness*t*t,m=e.damping*t,h=a.mult(u,f*p),g=(n?n.inverseMass:0)+(i?i.inverseMass:0),_=g+((n?n.inverseInertia:0)+(i?i.inverseInertia:0)),v,y,b,x,S;if(m>0){var C=a.create();b=a.div(u,d),S=a.sub(i&&a.sub(i.position,i.positionPrev)||C,n&&a.sub(n.position,n.positionPrev)||C),x=a.dot(b,S)}n&&!n.isStatic&&(y=n.inverseMass/g,n.constraintImpulse.x-=h.x*y,n.constraintImpulse.y-=h.y*y,n.position.x-=h.x*y,n.position.y-=h.y*y,m>0&&(n.positionPrev.x-=m*b.x*x*y,n.positionPrev.y-=m*b.y*x*y),v=a.cross(o,h)/_*r._torqueDampen*n.inverseInertia*(1-e.angularStiffness),n.constraintImpulse.angle-=v,n.angle-=v),i&&!i.isStatic&&(y=i.inverseMass/g,i.constraintImpulse.x+=h.x*y,i.constraintImpulse.y+=h.y*y,i.position.x+=h.x*y,i.position.y+=h.y*y,m>0&&(i.positionPrev.x+=m*b.x*x*y,i.positionPrev.y+=m*b.y*x*y),v=a.cross(s,h)/_*r._torqueDampen*i.inverseInertia*(1-e.angularStiffness),i.constraintImpulse.angle+=v,i.angle+=v)}}},r.postSolveAll=function(e){for(var t=0;t<e.length;t++){var n=e[t],l=n.constraintImpulse;if(!(n.isStatic||l.x===0&&l.y===0&&l.angle===0)){o.set(n,!1);for(var u=0;u<n.parts.length;u++){var d=n.parts[u];i.translate(d.vertices,l),u>0&&(d.position.x+=l.x,d.position.y+=l.y),l.angle!==0&&(i.rotate(d.vertices,l.angle,n.position),c.rotate(d.axes,l.angle),u>0&&a.rotateAbout(d.position,l.angle,n.position,d.position)),s.update(d.bounds,d.vertices,n.velocity)}l.angle*=r._warming,l.x*=r._warming,l.y*=r._warming}}},r.pointAWorld=function(e){return{x:(e.bodyA?e.bodyA.position.x:0)+(e.pointA?e.pointA.x:0),y:(e.bodyA?e.bodyA.position.y:0)+(e.pointA?e.pointA.y:0)}},r.pointBWorld=function(e){return{x:(e.bodyB?e.bodyB.position.x:0)+(e.pointB?e.pointB.x:0),y:(e.bodyB?e.bodyB.position.y:0)+(e.pointB?e.pointB.y:0)}},r.currentLength=function(e){var t=(e.bodyA?e.bodyA.position.x:0)+(e.pointA?e.pointA.x:0),n=(e.bodyA?e.bodyA.position.y:0)+(e.pointA?e.pointA.y:0),r=(e.bodyB?e.bodyB.position.x:0)+(e.pointB?e.pointB.x:0),i=(e.bodyB?e.bodyB.position.y:0)+(e.pointB?e.pointB.y:0),a=t-r,o=n-i;return Math.sqrt(a*a+o*o)}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(2),a=n(0);(function(){r.fromVertices=function(e){for(var t={},n=0;n<e.length;n++){var r=(n+1)%e.length,o=i.normalise({x:e[r].y-e[n].y,y:e[n].x-e[r].x}),s=o.y===0?1/0:o.x/o.y;s=s.toFixed(3).toString(),t[s]=o}return a.values(t)},r.rotate=function(e,t){if(t!==0)for(var n=Math.cos(t),r=Math.sin(t),i=0;i<e.length;i++){var a=e[i],o=a.x*n-a.y*r;a.y=a.x*r+a.y*n,a.x=o}}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(3),a=n(0),o=n(4),s=n(1),c=n(2);(function(){r.rectangle=function(e,t,n,r,s){s||={};var c={label:`Rectangle Body`,position:{x:e,y:t},vertices:i.fromPath(`L 0 0 L `+n+` 0 L `+n+` `+r+` L 0 `+r)};if(s.chamfer){var l=s.chamfer;c.vertices=i.chamfer(c.vertices,l.radius,l.quality,l.qualityMin,l.qualityMax),delete s.chamfer}return o.create(a.extend({},c,s))},r.trapezoid=function(e,t,n,r,s,c){c||={},s>=1&&a.warn(`Bodies.trapezoid: slope parameter must be < 1.`),s*=.5;var l=(1-s*2)*n,u=n*s,d=u+l,f=d+u,p=s<.5?`L 0 0 L `+u+` `+-r+` L `+d+` `+-r+` L `+f+` 0`:`L 0 0 L `+d+` `+-r+` L `+f+` 0`,m={label:`Trapezoid Body`,position:{x:e,y:t},vertices:i.fromPath(p)};if(c.chamfer){var h=c.chamfer;m.vertices=i.chamfer(m.vertices,h.radius,h.quality,h.qualityMin,h.qualityMax),delete c.chamfer}return o.create(a.extend({},m,c))},r.circle=function(e,t,n,i,o){i||={};var s={label:`Circle Body`,circleRadius:n};o||=25;var c=Math.ceil(Math.max(10,Math.min(o,n)));return c%2==1&&(c+=1),r.polygon(e,t,c,n,a.extend({},s,i))},r.polygon=function(e,t,n,s,c){if(c||={},n<3)return r.circle(e,t,s,c);for(var l=2*Math.PI/n,u=``,d=l*.5,f=0;f<n;f+=1){var p=d+f*l,m=Math.cos(p)*s,h=Math.sin(p)*s;u+=`L `+m.toFixed(3)+` `+h.toFixed(3)+` `}var g={label:`Polygon Body`,position:{x:e,y:t},vertices:i.fromPath(u)};if(c.chamfer){var _=c.chamfer;g.vertices=i.chamfer(g.vertices,_.radius,_.quality,_.qualityMin,_.qualityMax),delete c.chamfer}return o.create(a.extend({},g,c))},r.fromVertices=function(e,t,n,r,l,u,d,f){var p=a.getDecomp(),m=!!(p&&p.quickDecomp),h,g,_,v,y,b,x,S,C,w;for(r||={},g=[],l=l!==void 0&&l,u=u===void 0?.01:u,d=d===void 0?10:d,f=f===void 0?.01:f,a.isArray(n[0])||(n=[n]),C=0;C<n.length;C+=1)if(y=n[C],_=i.isConvex(y),v=!_,v&&!m&&a.warnOnce(`Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices.`),_||!m)y=_?i.clockwiseSort(y):i.hull(y),g.push({position:{x:e,y:t},vertices:y});else{var T=y.map(function(e){return[e.x,e.y]});p.makeCCW(T),u!==!1&&p.removeCollinearPoints(T,u),f!==!1&&p.removeDuplicatePoints&&p.removeDuplicatePoints(T,f);var E=p.quickDecomp(T);for(b=0;b<E.length;b++){var D=E[b].map(function(e){return{x:e[0],y:e[1]}});d>0&&i.area(D)<d||g.push({position:i.centre(D),vertices:D})}}for(b=0;b<g.length;b++)g[b]=o.create(a.extend(g[b],r));if(l){var O=5;for(b=0;b<g.length;b++){var k=g[b];for(x=b+1;x<g.length;x++){var A=g[x];if(s.overlaps(k.bounds,A.bounds)){var j=k.vertices,M=A.vertices;for(S=0;S<k.vertices.length;S++)for(w=0;w<A.vertices.length;w++){var N=c.magnitudeSquared(c.sub(j[(S+1)%j.length],M[w])),P=c.magnitudeSquared(c.sub(j[S],M[(w+1)%M.length]));N<O&&P<O&&(j[S].isInternal=!0,M[w].isInternal=!0)}}}}}return g.length>1?(h=o.create(a.extend({parts:g.slice(0)},r)),o.setPosition(h,{x:e,y:t}),h):g[0]}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(0),a=n(8);(function(){r.create=function(e){return i.extend({bodies:[],collisions:[],pairs:null},e)},r.setBodies=function(e,t){e.bodies=t.slice(0)},r.clear=function(e){e.bodies=[],e.collisions=[]},r.collisions=function(e){var t=e.pairs,n=e.bodies,i=n.length,o=r.canCollide,s=a.collides,c=e.collisions,l=0,u,d;for(n.sort(r._compareBoundsX),u=0;u<i;u++){var f=n[u],p=f.bounds,m=f.bounds.max.x,h=f.bounds.max.y,g=f.bounds.min.y,_=f.isStatic||f.isSleeping,v=f.parts.length,y=v===1;for(d=u+1;d<i;d++){var b=n[d],x=b.bounds;if(x.min.x>m)break;if(!(h<x.min.y||g>x.max.y)&&!(_&&(b.isStatic||b.isSleeping))&&o(f.collisionFilter,b.collisionFilter)){var S=b.parts.length;if(y&&S===1){var C=s(f,b,t);C&&(c[l++]=C)}else for(var w=+(v>1),T=+(S>1),E=w;E<v;E++)for(var D=f.parts[E],p=D.bounds,O=T;O<S;O++){var k=b.parts[O],x=k.bounds;if(!(p.min.x>x.max.x||p.max.x<x.min.x||p.max.y<x.min.y||p.min.y>x.max.y)){var C=s(D,k,t);C&&(c[l++]=C)}}}}}return c.length!==l&&(c.length=l),c},r.canCollide=function(e,t){return e.group===t.group&&e.group!==0?e.group>0:(e.mask&t.category)!==0&&(t.mask&e.category)!==0},r._compareBoundsX=function(e,t){return e.bounds.min.x-t.bounds.min.x}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(0);(function(){r.create=function(e){var t={};return e||i.log(`Mouse.create: element was undefined, defaulting to document.body`,`warn`),t.element=e||document.body,t.absolute={x:0,y:0},t.position={x:0,y:0},t.mousedownPosition={x:0,y:0},t.mouseupPosition={x:0,y:0},t.offset={x:0,y:0},t.scale={x:1,y:1},t.wheelDelta=0,t.button=-1,t.pixelRatio=parseInt(t.element.getAttribute(`data-pixel-ratio`),10)||1,t.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null},t.mousemove=function(e){var n=r._getRelativeMousePosition(e,t.element,t.pixelRatio);e.changedTouches&&(t.button=0,e.preventDefault()),t.absolute.x=n.x,t.absolute.y=n.y,t.position.x=t.absolute.x*t.scale.x+t.offset.x,t.position.y=t.absolute.y*t.scale.y+t.offset.y,t.sourceEvents.mousemove=e},t.mousedown=function(e){var n=r._getRelativeMousePosition(e,t.element,t.pixelRatio);e.changedTouches?(t.button=0,e.preventDefault()):t.button=e.button,t.absolute.x=n.x,t.absolute.y=n.y,t.position.x=t.absolute.x*t.scale.x+t.offset.x,t.position.y=t.absolute.y*t.scale.y+t.offset.y,t.mousedownPosition.x=t.position.x,t.mousedownPosition.y=t.position.y,t.sourceEvents.mousedown=e},t.mouseup=function(e){var n=r._getRelativeMousePosition(e,t.element,t.pixelRatio);e.changedTouches&&e.preventDefault(),t.button=-1,t.absolute.x=n.x,t.absolute.y=n.y,t.position.x=t.absolute.x*t.scale.x+t.offset.x,t.position.y=t.absolute.y*t.scale.y+t.offset.y,t.mouseupPosition.x=t.position.x,t.mouseupPosition.y=t.position.y,t.sourceEvents.mouseup=e},t.mousewheel=function(e){t.wheelDelta=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail)),e.preventDefault(),t.sourceEvents.mousewheel=e},r.setElement(t,t.element),t},r.setElement=function(e,t){e.element=t,t.addEventListener(`mousemove`,e.mousemove,{passive:!0}),t.addEventListener(`mousedown`,e.mousedown,{passive:!0}),t.addEventListener(`mouseup`,e.mouseup,{passive:!0}),t.addEventListener(`wheel`,e.mousewheel,{passive:!1}),t.addEventListener(`touchmove`,e.mousemove,{passive:!1}),t.addEventListener(`touchstart`,e.mousedown,{passive:!1}),t.addEventListener(`touchend`,e.mouseup,{passive:!1})},r.clearSourceEvents=function(e){e.sourceEvents.mousemove=null,e.sourceEvents.mousedown=null,e.sourceEvents.mouseup=null,e.sourceEvents.mousewheel=null,e.wheelDelta=0},r.setOffset=function(e,t){e.offset.x=t.x,e.offset.y=t.y,e.position.x=e.absolute.x*e.scale.x+e.offset.x,e.position.y=e.absolute.y*e.scale.y+e.offset.y},r.setScale=function(e,t){e.scale.x=t.x,e.scale.y=t.y,e.position.x=e.absolute.x*e.scale.x+e.offset.x,e.position.y=e.absolute.y*e.scale.y+e.offset.y},r._getRelativeMousePosition=function(e,t,n){var r=t.getBoundingClientRect(),i=document.documentElement||document.body.parentNode||document.body,a=window.pageXOffset===void 0?i.scrollLeft:window.pageXOffset,o=window.pageYOffset===void 0?i.scrollTop:window.pageYOffset,s=e.changedTouches,c,l;return s?(c=s[0].pageX-r.left-a,l=s[0].pageY-r.top-o):(c=e.pageX-r.left-a,l=e.pageY-r.top-o),{x:c/(t.clientWidth/(t.width||t.clientWidth)*n),y:l/(t.clientHeight/(t.height||t.clientHeight)*n)}}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(0);(function(){r._registry={},r.register=function(e){if(r.isPlugin(e)||i.warn(`Plugin.register:`,r.toString(e),`does not implement all required fields.`),e.name in r._registry){var t=r._registry[e.name],n=r.versionParse(e.version).number,a=r.versionParse(t.version).number;n>a?(i.warn(`Plugin.register:`,r.toString(t),`was upgraded to`,r.toString(e)),r._registry[e.name]=e):n<a?i.warn(`Plugin.register:`,r.toString(t),`can not be downgraded to`,r.toString(e)):e!==t&&i.warn(`Plugin.register:`,r.toString(e),`is already registered to different plugin object`)}else r._registry[e.name]=e;return e},r.resolve=function(e){return r._registry[r.dependencyParse(e).name]},r.toString=function(e){return typeof e==`string`?e:(e.name||`anonymous`)+`@`+(e.version||e.range||`0.0.0`)},r.isPlugin=function(e){return e&&e.name&&e.version&&e.install},r.isUsed=function(e,t){return e.used.indexOf(t)>-1},r.isFor=function(e,t){var n=e.for&&r.dependencyParse(e.for);return!e.for||t.name===n.name&&r.versionSatisfies(t.version,n.range)},r.use=function(e,t){if(e.uses=(e.uses||[]).concat(t||[]),e.uses.length===0){i.warn(`Plugin.use:`,r.toString(e),`does not specify any dependencies to install.`);return}for(var n=r.dependencies(e),a=i.topologicalSort(n),o=[],s=0;s<a.length;s+=1)if(a[s]!==e.name){var c=r.resolve(a[s]);if(!c){o.push(`❌ `+a[s]);continue}r.isUsed(e,c.name)||(r.isFor(c,e)||(i.warn(`Plugin.use:`,r.toString(c),`is for`,c.for,`but installed on`,r.toString(e)+`.`),c._warned=!0),c.install?c.install(e):(i.warn(`Plugin.use:`,r.toString(c),`does not specify an install function.`),c._warned=!0),c._warned?(o.push(`🔶 `+r.toString(c)),delete c._warned):o.push(`✅ `+r.toString(c)),e.used.push(c.name))}o.length>0&&i.info(o.join(`  `))},r.dependencies=function(e,t){var n=r.dependencyParse(e),a=n.name;if(t||={},!(a in t)){e=r.resolve(e)||e,t[a]=i.map(e.uses||[],function(t){r.isPlugin(t)&&r.register(t);var a=r.dependencyParse(t),o=r.resolve(t);return o&&!r.versionSatisfies(o.version,a.range)?(i.warn(`Plugin.dependencies:`,r.toString(o),`does not satisfy`,r.toString(a),`used by`,r.toString(n)+`.`),o._warned=!0,e._warned=!0):o||(i.warn(`Plugin.dependencies:`,r.toString(t),`used by`,r.toString(n),`could not be resolved.`),e._warned=!0),a.name});for(var o=0;o<t[a].length;o+=1)r.dependencies(t[a][o],t);return t}},r.dependencyParse=function(e){return i.isString(e)?(/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/.test(e)||i.warn(`Plugin.dependencyParse:`,e,`is not a valid dependency string.`),{name:e.split(`@`)[0],range:e.split(`@`)[1]||`*`}):{name:e.name,range:e.range||e.version}},r.versionParse=function(e){var t=/^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-+]+)?$/;t.test(e)||i.warn(`Plugin.versionParse:`,e,`is not a valid version or range.`);var n=t.exec(e),r=Number(n[4]),a=Number(n[5]),o=Number(n[6]);return{isRange:!!(n[1]||n[2]),version:n[3],range:e,operator:n[1]||n[2]||``,major:r,minor:a,patch:o,parts:[r,a,o],prerelease:n[7],number:r*1e8+a*1e4+o}},r.versionSatisfies=function(e,t){t||=`*`;var n=r.versionParse(t),i=r.versionParse(e);if(n.isRange){if(n.operator===`*`||e===`*`)return!0;if(n.operator===`>`)return i.number>n.number;if(n.operator===`>=`)return i.number>=n.number;if(n.operator===`~`)return i.major===n.major&&i.minor===n.minor&&i.patch>=n.patch;if(n.operator===`^`)return n.major>0?i.major===n.major&&i.number>=n.number:n.minor>0?i.minor===n.minor&&i.patch>=n.patch:i.patch===n.patch}return e===t||e===`*`}})()}),(function(e,t){var n={};e.exports=n,(function(){n.create=function(e){return{vertex:e,normalImpulse:0,tangentImpulse:0}}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(7),a=n(18),o=n(13),s=n(19),c=n(5),l=n(6),u=n(10),d=n(0),f=n(4);(function(){r._deltaMax=1e3/60,r.create=function(e){e||={};var t=d.extend({positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:!1,events:[],plugin:{},gravity:{x:0,y:1,scale:.001},timing:{timestamp:0,timeScale:1,lastDelta:0,lastElapsed:0,lastUpdatesPerFrame:0}},e);return t.world=e.world||l.create({label:`World`}),t.pairs=e.pairs||s.create(),t.detector=e.detector||o.create(),t.detector.pairs=t.pairs,t.grid={buckets:[]},t.world.gravity=t.gravity,t.broadphase=t.grid,t.metrics={},t},r.update=function(e,t){var n=d.now(),f=e.world,p=e.detector,m=e.pairs,h=e.timing,g=h.timestamp,_;t>r._deltaMax&&d.warnOnce(`Matter.Engine.update: delta argument is recommended to be less than or equal to`,r._deltaMax.toFixed(3),`ms.`),t=t===void 0?d._baseDelta:t,t*=h.timeScale,h.timestamp+=t,h.lastDelta=t;var v={timestamp:h.timestamp,delta:t};c.trigger(e,`beforeUpdate`,v);var y=l.allBodies(f),b=l.allConstraints(f);for(f.isModified&&(o.setBodies(p,y),l.setModified(f,!1,!1,!0)),e.enableSleeping&&i.update(y,t),r._bodiesApplyGravity(y,e.gravity),t>0&&r._bodiesUpdate(y,t),c.trigger(e,`beforeSolve`,v),u.preSolveAll(y),_=0;_<e.constraintIterations;_++)u.solveAll(b,t);u.postSolveAll(y);var x=o.collisions(p);s.update(m,x,g),e.enableSleeping&&i.afterCollisions(m.list),m.collisionStart.length>0&&c.trigger(e,`collisionStart`,{pairs:m.collisionStart,timestamp:h.timestamp,delta:t});var S=d.clamp(20/e.positionIterations,0,1);for(a.preSolvePosition(m.list),_=0;_<e.positionIterations;_++)a.solvePosition(m.list,t,S);for(a.postSolvePosition(y),u.preSolveAll(y),_=0;_<e.constraintIterations;_++)u.solveAll(b,t);for(u.postSolveAll(y),a.preSolveVelocity(m.list),_=0;_<e.velocityIterations;_++)a.solveVelocity(m.list,t);return r._bodiesUpdateVelocities(y),m.collisionActive.length>0&&c.trigger(e,`collisionActive`,{pairs:m.collisionActive,timestamp:h.timestamp,delta:t}),m.collisionEnd.length>0&&c.trigger(e,`collisionEnd`,{pairs:m.collisionEnd,timestamp:h.timestamp,delta:t}),r._bodiesClearForces(y),c.trigger(e,`afterUpdate`,v),e.timing.lastElapsed=d.now()-n,e},r.merge=function(e,t){if(d.extend(e,t),t.world){e.world=t.world,r.clear(e);for(var n=l.allBodies(e.world),a=0;a<n.length;a++){var o=n[a];i.set(o,!1),o.id=d.nextId()}}},r.clear=function(e){s.clear(e.pairs),o.clear(e.detector)},r._bodiesClearForces=function(e){for(var t=e.length,n=0;n<t;n++){var r=e[n];r.force.x=0,r.force.y=0,r.torque=0}},r._bodiesApplyGravity=function(e,t){var n=t.scale===void 0?.001:t.scale,r=e.length;if(!(t.x===0&&t.y===0||n===0))for(var i=0;i<r;i++){var a=e[i];a.isStatic||a.isSleeping||(a.force.y+=a.mass*t.y*n,a.force.x+=a.mass*t.x*n)}},r._bodiesUpdate=function(e,t){for(var n=e.length,r=0;r<n;r++){var i=e[r];i.isStatic||i.isSleeping||f.update(i,t)}},r._bodiesUpdateVelocities=function(e){for(var t=e.length,n=0;n<t;n++)f.updateVelocities(e[n])}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(3),a=n(0),o=n(1);(function(){r._restingThresh=2,r._restingThreshTangent=Math.sqrt(6),r._positionDampen=.9,r._positionWarming=.8,r._frictionNormalMultiplier=5,r._frictionMaxStatic=Number.MAX_VALUE,r.preSolvePosition=function(e){var t,n,r,i=e.length;for(t=0;t<i;t++)n=e[t],n.isActive&&(r=n.contactCount,n.collision.parentA.totalContacts+=r,n.collision.parentB.totalContacts+=r)},r.solvePosition=function(e,t,n){var i,o,s,c,l,u,d,f,p=r._positionDampen*(n||1),m=a.clamp(t/a._baseDelta,0,1),h=e.length;for(i=0;i<h;i++)o=e[i],!(!o.isActive||o.isSensor)&&(s=o.collision,c=s.parentA,l=s.parentB,u=s.normal,o.separation=s.depth+u.x*(l.positionImpulse.x-c.positionImpulse.x)+u.y*(l.positionImpulse.y-c.positionImpulse.y));for(i=0;i<h;i++)o=e[i],!(!o.isActive||o.isSensor)&&(s=o.collision,c=s.parentA,l=s.parentB,u=s.normal,f=o.separation-o.slop*m,(c.isStatic||l.isStatic)&&(f*=2),c.isStatic||c.isSleeping||(d=p/c.totalContacts,c.positionImpulse.x+=u.x*f*d,c.positionImpulse.y+=u.y*f*d),l.isStatic||l.isSleeping||(d=p/l.totalContacts,l.positionImpulse.x-=u.x*f*d,l.positionImpulse.y-=u.y*f*d))},r.postSolvePosition=function(e){for(var t=r._positionWarming,n=e.length,a=i.translate,s=o.update,c=0;c<n;c++){var l=e[c],u=l.positionImpulse,d=u.x,f=u.y,p=l.velocity;if(l.totalContacts=0,d!==0||f!==0){for(var m=0;m<l.parts.length;m++){var h=l.parts[m];a(h.vertices,u),s(h.bounds,h.vertices,p),h.position.x+=d,h.position.y+=f}l.positionPrev.x+=d,l.positionPrev.y+=f,d*p.x+f*p.y<0?(u.x=0,u.y=0):(u.x*=t,u.y*=t)}}},r.preSolveVelocity=function(e){var t=e.length,n,r;for(n=0;n<t;n++){var i=e[n];if(!(!i.isActive||i.isSensor)){var a=i.contacts,o=i.contactCount,s=i.collision,c=s.parentA,l=s.parentB,u=s.normal,d=s.tangent;for(r=0;r<o;r++){var f=a[r],p=f.vertex,m=f.normalImpulse,h=f.tangentImpulse;if(m!==0||h!==0){var g=u.x*m+d.x*h,_=u.y*m+d.y*h;c.isStatic||c.isSleeping||(c.positionPrev.x+=g*c.inverseMass,c.positionPrev.y+=_*c.inverseMass,c.anglePrev+=c.inverseInertia*((p.x-c.position.x)*_-(p.y-c.position.y)*g)),l.isStatic||l.isSleeping||(l.positionPrev.x-=g*l.inverseMass,l.positionPrev.y-=_*l.inverseMass,l.anglePrev-=l.inverseInertia*((p.x-l.position.x)*_-(p.y-l.position.y)*g))}}}}},r.solveVelocity=function(e,t){var n=t/a._baseDelta,i=n*n*n,o=-r._restingThresh*n,s=r._restingThreshTangent,c=r._frictionNormalMultiplier*n,l=r._frictionMaxStatic,u=e.length,d,f,p,m;for(p=0;p<u;p++){var h=e[p];if(!(!h.isActive||h.isSensor)){var g=h.collision,_=g.parentA,v=g.parentB,y=g.normal.x,b=g.normal.y,x=g.tangent.x,S=g.tangent.y,C=h.inverseMass,w=h.friction*h.frictionStatic*c,T=h.contacts,E=h.contactCount,D=1/E,O=_.position.x-_.positionPrev.x,k=_.position.y-_.positionPrev.y,A=_.angle-_.anglePrev,j=v.position.x-v.positionPrev.x,M=v.position.y-v.positionPrev.y,N=v.angle-v.anglePrev;for(m=0;m<E;m++){var P=T[m],F=P.vertex,I=F.x-_.position.x,L=F.y-_.position.y,ee=F.x-v.position.x,te=F.y-v.position.y,ne=O-L*A,re=k+I*A,ie=j-te*N,R=M+ee*N,ae=ne-ie,oe=re-R,z=y*ae+b*oe,se=x*ae+S*oe,ce=h.separation+z,le=Math.min(ce,1);le=ce<0?0:le;var ue=le*w;se<-ue||se>ue?(f=se>0?se:-se,d=h.friction*(se>0?1:-1)*i,d<-f?d=-f:d>f&&(d=f)):(d=se,f=l);var de=I*b-L*y,fe=ee*b-te*y,pe=D/(C+_.inverseInertia*de*de+v.inverseInertia*fe*fe),me=(1+h.restitution)*z*pe;if(d*=pe,z<o)P.normalImpulse=0;else{var he=P.normalImpulse;P.normalImpulse+=me,P.normalImpulse>0&&(P.normalImpulse=0),me=P.normalImpulse-he}if(se<-s||se>s)P.tangentImpulse=0;else{var ge=P.tangentImpulse;P.tangentImpulse+=d,P.tangentImpulse<-f&&(P.tangentImpulse=-f),P.tangentImpulse>f&&(P.tangentImpulse=f),d=P.tangentImpulse-ge}var _e=y*me+x*d,ve=b*me+S*d;_.isStatic||_.isSleeping||(_.positionPrev.x+=_e*_.inverseMass,_.positionPrev.y+=ve*_.inverseMass,_.anglePrev+=(I*ve-L*_e)*_.inverseInertia),v.isStatic||v.isSleeping||(v.positionPrev.x-=_e*v.inverseMass,v.positionPrev.y-=ve*v.inverseMass,v.anglePrev-=(ee*ve-te*_e)*v.inverseInertia)}}}}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(9),a=n(0);(function(){r.create=function(e){return a.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},e)},r.update=function(e,t,n){var r=i.update,a=i.create,o=i.setActive,s=e.table,c=e.list,l=c.length,u=l,d=e.collisionStart,f=e.collisionEnd,p=e.collisionActive,m=t.length,h=0,g=0,_=0,v,y,b;for(b=0;b<m;b++)v=t[b],y=v.pair,y?(y.isActive&&(p[_++]=y),r(y,v,n)):(y=a(v,n),s[y.id]=y,d[h++]=y,c[u++]=y);for(u=0,l=c.length,b=0;b<l;b++)y=c[b],y.timeUpdated>=n?c[u++]=y:(o(y,!1,n),y.collision.bodyA.sleepCounter>0&&y.collision.bodyB.sleepCounter>0?c[u++]=y:(f[g++]=y,delete s[y.id]));c.length!==u&&(c.length=u),d.length!==h&&(d.length=h),f.length!==g&&(f.length=g),p.length!==_&&(p.length=_)},r.clear=function(e){return e.table={},e.list.length=0,e.collisionStart.length=0,e.collisionActive.length=0,e.collisionEnd.length=0,e}})()}),(function(e,t,n){var r=e.exports=n(21);r.Axes=n(11),r.Bodies=n(12),r.Body=n(4),r.Bounds=n(1),r.Collision=n(8),r.Common=n(0),r.Composite=n(6),r.Composites=n(22),r.Constraint=n(10),r.Contact=n(16),r.Detector=n(13),r.Engine=n(17),r.Events=n(5),r.Grid=n(23),r.Mouse=n(14),r.MouseConstraint=n(24),r.Pair=n(9),r.Pairs=n(19),r.Plugin=n(15),r.Query=n(25),r.Render=n(26),r.Resolver=n(18),r.Runner=n(27),r.SAT=n(28),r.Sleeping=n(7),r.Svg=n(29),r.Vector=n(2),r.Vertices=n(3),r.World=n(30),r.Engine.run=r.Runner.run,r.Common.deprecated(r.Engine,`run`,`Engine.run ➤ use Matter.Runner.run(engine) instead`)}),(function(e,t,n){var r={};e.exports=r;var i=n(15),a=n(0);(function(){r.name=`matter-js`,r.version=`0.20.0`,r.uses=[],r.used=[],r.use=function(){i.use(r,Array.prototype.slice.call(arguments))},r.before=function(e,t){return e=e.replace(/^Matter./,``),a.chainPathBefore(r,e,t)},r.after=function(e,t){return e=e.replace(/^Matter./,``),a.chainPathAfter(r,e,t)}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(6),a=n(10),o=n(0),s=n(4),c=n(12),l=o.deprecated;(function(){r.stack=function(e,t,n,r,a,o,c){for(var l=i.create({label:`Stack`}),u=e,d=t,f,p=0,m=0;m<r;m++){for(var h=0,g=0;g<n;g++){var _=c(u,d,g,m,f,p);if(_){var v=_.bounds.max.y-_.bounds.min.y,y=_.bounds.max.x-_.bounds.min.x;v>h&&(h=v),s.translate(_,{x:y*.5,y:v*.5}),u=_.bounds.max.x+a,i.addBody(l,_),f=_,p+=1}else u+=a}d+=h+o,u=e}return l},r.chain=function(e,t,n,r,s,c){for(var l=e.bodies,u=1;u<l.length;u++){var d=l[u-1],f=l[u],p=d.bounds.max.y-d.bounds.min.y,m=d.bounds.max.x-d.bounds.min.x,h=f.bounds.max.y-f.bounds.min.y,g=f.bounds.max.x-f.bounds.min.x,_={bodyA:d,pointA:{x:m*t,y:p*n},bodyB:f,pointB:{x:g*r,y:h*s}},v=o.extend(_,c);i.addConstraint(e,a.create(v))}return e.label+=` Chain`,e},r.mesh=function(e,t,n,r,s){var c=e.bodies,l,u,d,f,p;for(l=0;l<n;l++){for(u=1;u<t;u++)d=c[u-1+l*t],f=c[u+l*t],i.addConstraint(e,a.create(o.extend({bodyA:d,bodyB:f},s)));if(l>0)for(u=0;u<t;u++)d=c[u+(l-1)*t],f=c[u+l*t],i.addConstraint(e,a.create(o.extend({bodyA:d,bodyB:f},s))),r&&u>0&&(p=c[u-1+(l-1)*t],i.addConstraint(e,a.create(o.extend({bodyA:p,bodyB:f},s)))),r&&u<t-1&&(p=c[u+1+(l-1)*t],i.addConstraint(e,a.create(o.extend({bodyA:p,bodyB:f},s))))}return e.label+=` Mesh`,e},r.pyramid=function(e,t,n,i,a,o,c){return r.stack(e,t,n,i,a,o,function(t,r,o,l,u,d){var f=Math.min(i,Math.ceil(n/2)),p=u?u.bounds.max.x-u.bounds.min.x:0;if(!(l>f)){l=f-l;var m=l,h=n-1-l;if(!(o<m||o>h))return d===1&&s.translate(u,{x:(o+(n%2==1?1:-1))*p,y:0}),c(e+(u?o*p:0)+o*a,r,o,l,u,d)}})},r.newtonsCradle=function(e,t,n,r,o){for(var s=i.create({label:`Newtons Cradle`}),l=0;l<n;l++){var u=1.9,d=c.circle(e+r*u*l,t+o,r,{inertia:1/0,restitution:1,friction:0,frictionAir:1e-4,slop:1}),f=a.create({pointA:{x:e+r*u*l,y:t},bodyB:d});i.addBody(s,d),i.addConstraint(s,f)}return s},l(r,`newtonsCradle`,`Composites.newtonsCradle ➤ moved to newtonsCradle example`),r.car=function(e,t,n,r,o){var l=s.nextGroup(!0),u=20,d=-n*.5+u,f=n*.5-u,p=0,m=i.create({label:`Car`}),h=c.rectangle(e,t,n,r,{collisionFilter:{group:l},chamfer:{radius:r*.5},density:2e-4}),g=c.circle(e+d,t+p,o,{collisionFilter:{group:l},friction:.8}),_=c.circle(e+f,t+p,o,{collisionFilter:{group:l},friction:.8}),v=a.create({bodyB:h,pointB:{x:d,y:p},bodyA:g,stiffness:1,length:0}),y=a.create({bodyB:h,pointB:{x:f,y:p},bodyA:_,stiffness:1,length:0});return i.addBody(m,h),i.addBody(m,g),i.addBody(m,_),i.addConstraint(m,v),i.addConstraint(m,y),m},l(r,`car`,`Composites.car ➤ moved to car example`),r.softBody=function(e,t,n,i,a,s,l,u,d,f){d=o.extend({inertia:1/0},d),f=o.extend({stiffness:.2,render:{type:`line`,anchors:!1}},f);var p=r.stack(e,t,n,i,a,s,function(e,t){return c.circle(e,t,u,d)});return r.mesh(p,n,i,l,f),p.label=`Soft Body`,p},l(r,`softBody`,`Composites.softBody ➤ moved to softBody and cloth examples`)})()}),(function(e,t,n){var r={};e.exports=r;var i=n(9),a=n(0),o=a.deprecated;(function(){r.create=function(e){return a.extend({buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48},e)},r.update=function(e,t,n,i){var a,o,s,c=n.world,l=e.buckets,u,d,f=!1;for(a=0;a<t.length;a++){var p=t[a];if(!(p.isSleeping&&!i)&&!(c.bounds&&(p.bounds.max.x<c.bounds.min.x||p.bounds.min.x>c.bounds.max.x||p.bounds.max.y<c.bounds.min.y||p.bounds.min.y>c.bounds.max.y))){var m=r._getRegion(e,p);if(!p.region||m.id!==p.region.id||i){(!p.region||i)&&(p.region=m);var h=r._regionUnion(m,p.region);for(o=h.startCol;o<=h.endCol;o++)for(s=h.startRow;s<=h.endRow;s++){d=r._getBucketId(o,s),u=l[d];var g=o>=m.startCol&&o<=m.endCol&&s>=m.startRow&&s<=m.endRow,_=o>=p.region.startCol&&o<=p.region.endCol&&s>=p.region.startRow&&s<=p.region.endRow;!g&&_&&_&&u&&r._bucketRemoveBody(e,u,p),(p.region===m||g&&!_||i)&&(u||=r._createBucket(l,d),r._bucketAddBody(e,u,p))}p.region=m,f=!0}}}f&&(e.pairsList=r._createActivePairsList(e))},o(r,`update`,`Grid.update ➤ replaced by Matter.Detector`),r.clear=function(e){e.buckets={},e.pairs={},e.pairsList=[]},o(r,`clear`,`Grid.clear ➤ replaced by Matter.Detector`),r._regionUnion=function(e,t){var n=Math.min(e.startCol,t.startCol),i=Math.max(e.endCol,t.endCol),a=Math.min(e.startRow,t.startRow),o=Math.max(e.endRow,t.endRow);return r._createRegion(n,i,a,o)},r._getRegion=function(e,t){var n=t.bounds,i=Math.floor(n.min.x/e.bucketWidth),a=Math.floor(n.max.x/e.bucketWidth),o=Math.floor(n.min.y/e.bucketHeight),s=Math.floor(n.max.y/e.bucketHeight);return r._createRegion(i,a,o,s)},r._createRegion=function(e,t,n,r){return{id:e+`,`+t+`,`+n+`,`+r,startCol:e,endCol:t,startRow:n,endRow:r}},r._getBucketId=function(e,t){return`C`+e+`R`+t},r._createBucket=function(e,t){return e[t]=[]},r._bucketAddBody=function(e,t,n){var r=e.pairs,a=i.id,o=t.length,s;for(s=0;s<o;s++){var c=t[s];if(!(n.id===c.id||n.isStatic&&c.isStatic)){var l=a(n,c),u=r[l];u?u[2]+=1:r[l]=[n,c,1]}}t.push(n)},r._bucketRemoveBody=function(e,t,n){var r=e.pairs,o=i.id,s;t.splice(a.indexOf(t,n),1);var c=t.length;for(s=0;s<c;s++){var l=r[o(n,t[s])];l&&--l[2]}},r._createActivePairsList=function(e){var t,n=e.pairs,r=a.keys(n),i=r.length,o=[],s;for(s=0;s<i;s++)t=n[r[s]],t[2]>0?o.push(t):delete n[r[s]];return o}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(3),a=n(7),o=n(14),s=n(5),c=n(13),l=n(10),u=n(6),d=n(0),f=n(1);(function(){r.create=function(e,t){var n=(e?e.mouse:null)||(t?t.mouse:null);n||(e&&e.render&&e.render.canvas?n=o.create(e.render.canvas):t&&t.element?n=o.create(t.element):(n=o.create(),d.warn(`MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected`)));var i=l.create({label:`Mouse Constraint`,pointA:n.position,pointB:{x:0,y:0},length:.01,stiffness:.1,angularStiffness:1,render:{strokeStyle:`#90EE90`,lineWidth:3}}),a={type:`mouseConstraint`,mouse:n,element:null,body:null,constraint:i,collisionFilter:{category:1,mask:4294967295,group:0}},c=d.extend(a,t);return s.on(e,`beforeUpdate`,function(){var t=u.allBodies(e.world);r.update(c,t),r._triggerEvents(c)}),c},r.update=function(e,t){var n=e.mouse,r=e.constraint,o=e.body;if(n.button===0){if(r.bodyB)a.set(r.bodyB,!1),r.pointA=n.position;else for(var l=0;l<t.length;l++)if(o=t[l],f.contains(o.bounds,n.position)&&c.canCollide(o.collisionFilter,e.collisionFilter))for(var u=+(o.parts.length>1);u<o.parts.length;u++){var d=o.parts[u];if(i.contains(d.vertices,n.position)){r.pointA=n.position,r.bodyB=e.body=o,r.pointB={x:n.position.x-o.position.x,y:n.position.y-o.position.y},r.angleB=o.angle,a.set(o,!1),s.trigger(e,`startdrag`,{mouse:n,body:o});break}}}else r.bodyB=e.body=null,r.pointB=null,o&&s.trigger(e,`enddrag`,{mouse:n,body:o})},r._triggerEvents=function(e){var t=e.mouse,n=t.sourceEvents;n.mousemove&&s.trigger(e,`mousemove`,{mouse:t}),n.mousedown&&s.trigger(e,`mousedown`,{mouse:t}),n.mouseup&&s.trigger(e,`mouseup`,{mouse:t}),o.clearSourceEvents(t)}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(2),a=n(8),o=n(1),s=n(12),c=n(3);(function(){r.collides=function(e,t){for(var n=[],r=t.length,i=e.bounds,s=a.collides,c=o.overlaps,l=0;l<r;l++){var u=t[l],d=u.parts.length,f=d===1?0:1;if(c(u.bounds,i))for(var p=f;p<d;p++){var m=u.parts[p];if(c(m.bounds,i)){var h=s(m,e);if(h){n.push(h);break}}}}return n},r.ray=function(e,t,n,a){a||=1e-100;for(var o=i.angle(t,n),c=i.magnitude(i.sub(t,n)),l=(n.x+t.x)*.5,u=(n.y+t.y)*.5,d=s.rectangle(l,u,c,a,{angle:o}),f=r.collides(d,e),p=0;p<f.length;p+=1){var m=f[p];m.body=m.bodyB=m.bodyA}return f},r.region=function(e,t,n){for(var r=[],i=0;i<e.length;i++){var a=e[i],s=o.overlaps(a.bounds,t);(s&&!n||!s&&n)&&r.push(a)}return r},r.point=function(e,t){for(var n=[],r=0;r<e.length;r++){var i=e[r];if(o.contains(i.bounds,t))for(var a=i.parts.length===1?0:1;a<i.parts.length;a++){var s=i.parts[a];if(o.contains(s.bounds,t)&&c.contains(s.vertices,t)){n.push(i);break}}}return n}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(4),a=n(0),o=n(6),s=n(1),c=n(5),l=n(2),u=n(14);(function(){var e,t;typeof window<`u`&&(e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(function(){e(a.now())},1e3/60)},t=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),r._goodFps=30,r._goodDelta=1e3/60,r.create=function(e){var t={engine:null,element:null,canvas:null,mouse:null,frameRequestId:null,timing:{historySize:60,delta:0,deltaHistory:[],lastTime:0,lastTimestamp:0,lastElapsed:0,timestampElapsed:0,timestampElapsedHistory:[],engineDeltaHistory:[],engineElapsedHistory:[],engineUpdatesHistory:[],elapsedHistory:[]},options:{width:800,height:600,pixelRatio:1,background:`#14151f`,wireframeBackground:`#14151f`,wireframeStrokeStyle:`#bbb`,hasBounds:!!e.bounds,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showStats:!1,showPerformance:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1,showMousePosition:!1}},n=a.extend(t,e);return n.canvas&&(n.canvas.width=n.options.width||n.canvas.width,n.canvas.height=n.options.height||n.canvas.height),n.mouse=e.mouse,n.engine=e.engine,n.canvas=n.canvas||f(n.options.width,n.options.height),n.context=n.canvas.getContext(`2d`),n.textures={},n.bounds=n.bounds||{min:{x:0,y:0},max:{x:n.canvas.width,y:n.canvas.height}},n.controller=r,n.options.showBroadphase=!1,n.options.pixelRatio!==1&&r.setPixelRatio(n,n.options.pixelRatio),a.isElement(n.element)&&n.element.appendChild(n.canvas),n},r.run=function(t){(function i(a){t.frameRequestId=e(i),n(t,a),r.world(t,a),t.context.setTransform(t.options.pixelRatio,0,0,t.options.pixelRatio,0,0),(t.options.showStats||t.options.showDebug)&&r.stats(t,t.context,a),(t.options.showPerformance||t.options.showDebug)&&r.performance(t,t.context,a),t.context.setTransform(1,0,0,1,0,0)})()},r.stop=function(e){t(e.frameRequestId)},r.setPixelRatio=function(e,t){var n=e.options,r=e.canvas;t===`auto`&&(t=p(r)),n.pixelRatio=t,r.setAttribute(`data-pixel-ratio`,t),r.width=n.width*t,r.height=n.height*t,r.style.width=n.width+`px`,r.style.height=n.height+`px`},r.setSize=function(e,t,n){e.options.width=t,e.options.height=n,e.bounds.max.x=e.bounds.min.x+t,e.bounds.max.y=e.bounds.min.y+n,e.options.pixelRatio===1?(e.canvas.width=t,e.canvas.height=n):r.setPixelRatio(e,e.options.pixelRatio)},r.lookAt=function(e,t,n,r){r=r===void 0||r,t=a.isArray(t)?t:[t],n||={x:0,y:0};for(var i={min:{x:1/0,y:1/0},max:{x:-1/0,y:-1/0}},o=0;o<t.length;o+=1){var s=t[o],c=s.bounds?s.bounds.min:s.min||s.position||s,l=s.bounds?s.bounds.max:s.max||s.position||s;c&&l&&(c.x<i.min.x&&(i.min.x=c.x),l.x>i.max.x&&(i.max.x=l.x),c.y<i.min.y&&(i.min.y=c.y),l.y>i.max.y&&(i.max.y=l.y))}var d=i.max.x-i.min.x+2*n.x,f=i.max.y-i.min.y+2*n.y,p=e.canvas.height,m=e.canvas.width/p,h=d/f,g=1,_=1;h>m?_=h/m:g=m/h,e.options.hasBounds=!0,e.bounds.min.x=i.min.x,e.bounds.max.x=i.min.x+d*g,e.bounds.min.y=i.min.y,e.bounds.max.y=i.min.y+f*_,r&&(e.bounds.min.x+=d*.5-d*g*.5,e.bounds.max.x+=d*.5-d*g*.5,e.bounds.min.y+=f*.5-f*_*.5,e.bounds.max.y+=f*.5-f*_*.5),e.bounds.min.x-=n.x,e.bounds.max.x-=n.x,e.bounds.min.y-=n.y,e.bounds.max.y-=n.y,e.mouse&&(u.setScale(e.mouse,{x:(e.bounds.max.x-e.bounds.min.x)/e.canvas.width,y:(e.bounds.max.y-e.bounds.min.y)/e.canvas.height}),u.setOffset(e.mouse,e.bounds.min))},r.startViewTransform=function(e){var t=e.bounds.max.x-e.bounds.min.x,n=e.bounds.max.y-e.bounds.min.y,r=t/e.options.width,i=n/e.options.height;e.context.setTransform(e.options.pixelRatio/r,0,0,e.options.pixelRatio/i,0,0),e.context.translate(-e.bounds.min.x,-e.bounds.min.y)},r.endViewTransform=function(e){e.context.setTransform(e.options.pixelRatio,0,0,e.options.pixelRatio,0,0)},r.world=function(e,t){var n=a.now(),i=e.engine,d=i.world,f=e.canvas,p=e.context,m=e.options,g=e.timing,_=o.allBodies(d),v=o.allConstraints(d),y=m.wireframes?m.wireframeBackground:m.background,b=[],x=[],S,C={timestamp:i.timing.timestamp};if(c.trigger(e,`beforeRender`,C),e.currentBackground!==y&&h(e,y),p.globalCompositeOperation=`source-in`,p.fillStyle=`transparent`,p.fillRect(0,0,f.width,f.height),p.globalCompositeOperation=`source-over`,m.hasBounds){for(S=0;S<_.length;S++){var w=_[S];s.overlaps(w.bounds,e.bounds)&&b.push(w)}for(S=0;S<v.length;S++){var T=v[S],E=T.bodyA,D=T.bodyB,O=T.pointA,k=T.pointB;E&&(O=l.add(E.position,T.pointA)),D&&(k=l.add(D.position,T.pointB)),!(!O||!k)&&(s.contains(e.bounds,O)||s.contains(e.bounds,k))&&x.push(T)}r.startViewTransform(e),e.mouse&&(u.setScale(e.mouse,{x:(e.bounds.max.x-e.bounds.min.x)/e.options.width,y:(e.bounds.max.y-e.bounds.min.y)/e.options.height}),u.setOffset(e.mouse,e.bounds.min))}else x=v,b=_,e.options.pixelRatio!==1&&e.context.setTransform(e.options.pixelRatio,0,0,e.options.pixelRatio,0,0);!m.wireframes||i.enableSleeping&&m.showSleeping?r.bodies(e,b,p):(m.showConvexHulls&&r.bodyConvexHulls(e,b,p),r.bodyWireframes(e,b,p)),m.showBounds&&r.bodyBounds(e,b,p),(m.showAxes||m.showAngleIndicator)&&r.bodyAxes(e,b,p),m.showPositions&&r.bodyPositions(e,b,p),m.showVelocity&&r.bodyVelocity(e,b,p),m.showIds&&r.bodyIds(e,b,p),m.showSeparations&&r.separations(e,i.pairs.list,p),m.showCollisions&&r.collisions(e,i.pairs.list,p),m.showVertexNumbers&&r.vertexNumbers(e,b,p),m.showMousePosition&&r.mousePosition(e,e.mouse,p),r.constraints(x,p),m.hasBounds&&r.endViewTransform(e),c.trigger(e,`afterRender`,C),g.lastElapsed=a.now()-n},r.stats=function(e,t,n){for(var r=e.engine,i=r.world,a=o.allBodies(i),s=0,c=55,l=44,u=0,d=0,f=0;f<a.length;f+=1)s+=a[f].parts.length;var p={Part:s,Body:a.length,Cons:o.allConstraints(i).length,Comp:o.allComposites(i).length,Pair:r.pairs.list.length};for(var m in t.fillStyle=`#0e0f19`,t.fillRect(u,d,c*5.5,l),t.font=`12px Arial`,t.textBaseline=`top`,t.textAlign=`right`,p){var h=p[m];t.fillStyle=`#aaa`,t.fillText(m,u+c,d+8),t.fillStyle=`#eee`,t.fillText(h,u+c,d+26),u+=c}},r.performance=function(e,t){var n=e.engine,i=e.timing,o=i.deltaHistory,s=i.elapsedHistory,c=i.timestampElapsedHistory,l=i.engineDeltaHistory,u=i.engineUpdatesHistory,f=i.engineElapsedHistory,p=n.timing.lastUpdatesPerFrame,m=n.timing.lastDelta,h=d(o),g=d(s),_=d(l),v=d(u),y=d(f),b=d(c)/h||0,x=Math.round(h/m),S=1e3/h||0,C=4,w=12,T=60,E=34,D=10,O=69;t.fillStyle=`#0e0f19`,t.fillRect(0,50,w*5+T*6+22,E),r.status(t,D,O,T,C,o.length,Math.round(S)+` fps`,S/r._goodFps,function(e){return o[e]/h-1}),r.status(t,D+w+T,O,T,C,l.length,m.toFixed(2)+` dt`,r._goodDelta/m,function(e){return l[e]/_-1}),r.status(t,D+(w+T)*2,O,T,C,u.length,p+` upf`,a.clamp(v/x||1,0,1)**4,function(e){return u[e]/v-1}),r.status(t,D+(w+T)*3,O,T,C,f.length,y.toFixed(2)+` ut`,1-p*y/r._goodFps,function(e){return f[e]/y-1}),r.status(t,D+(w+T)*4,O,T,C,s.length,g.toFixed(2)+` rt`,1-g/r._goodFps,function(e){return s[e]/g-1}),r.status(t,D+(w+T)*5,O,T,C,c.length,b.toFixed(2)+` x`,b*b*b,function(e){return(c[e]/o[e]/b||0)-1})},r.status=function(e,t,n,r,i,o,s,c,l){e.strokeStyle=`#888`,e.fillStyle=`#444`,e.lineWidth=1,e.fillRect(t,n+7,r,1),e.beginPath(),e.moveTo(t,n+7-i*a.clamp(.4*l(0),-2,2));for(var u=0;u<r;u+=1)e.lineTo(t+u,n+7-(u<o?i*a.clamp(.4*l(u),-2,2):0));e.stroke(),e.fillStyle=`hsl(`+a.clamp(25+95*c,0,120)+`,100%,60%)`,e.fillRect(t,n-7,4,4),e.font=`12px Arial`,e.textBaseline=`middle`,e.textAlign=`right`,e.fillStyle=`#eee`,e.fillText(s,t+r,n-5)},r.constraints=function(e,t){for(var n=t,r=0;r<e.length;r++){var i=e[r];if(!(!i.render.visible||!i.pointA||!i.pointB)){var o=i.bodyA,s=i.bodyB,c=o?l.add(o.position,i.pointA):i.pointA,u;if(i.render.type===`pin`)n.beginPath(),n.arc(c.x,c.y,3,0,2*Math.PI),n.closePath();else{if(u=s?l.add(s.position,i.pointB):i.pointB,n.beginPath(),n.moveTo(c.x,c.y),i.render.type===`spring`)for(var d=l.sub(u,c),f=l.perp(l.normalise(d)),p=Math.ceil(a.clamp(i.length/5,12,20)),m,h=1;h<p;h+=1)m=h%2==0?1:-1,n.lineTo(c.x+d.x*(h/p)+f.x*m*4,c.y+d.y*(h/p)+f.y*m*4);n.lineTo(u.x,u.y)}i.render.lineWidth&&(n.lineWidth=i.render.lineWidth,n.strokeStyle=i.render.strokeStyle,n.stroke()),i.render.anchors&&(n.fillStyle=i.render.strokeStyle,n.beginPath(),n.arc(c.x,c.y,3,0,2*Math.PI),n.arc(u.x,u.y,3,0,2*Math.PI),n.closePath(),n.fill())}}},r.bodies=function(e,t,n){var r=n;e.engine;var i=e.options,a=i.showInternalEdges||!i.wireframes,o,s,c,l;for(c=0;c<t.length;c++)if(o=t[c],o.render.visible){for(l=+(o.parts.length>1);l<o.parts.length;l++)if(s=o.parts[l],s.render.visible){if(i.showSleeping&&o.isSleeping?r.globalAlpha=.5*s.render.opacity:s.render.opacity!==1&&(r.globalAlpha=s.render.opacity),s.render.sprite&&s.render.sprite.texture&&!i.wireframes){var u=s.render.sprite,d=m(e,u.texture);r.translate(s.position.x,s.position.y),r.rotate(s.angle),r.drawImage(d,d.width*-u.xOffset*u.xScale,d.height*-u.yOffset*u.yScale,d.width*u.xScale,d.height*u.yScale),r.rotate(-s.angle),r.translate(-s.position.x,-s.position.y)}else{if(s.circleRadius)r.beginPath(),r.arc(s.position.x,s.position.y,s.circleRadius,0,2*Math.PI);else{r.beginPath(),r.moveTo(s.vertices[0].x,s.vertices[0].y);for(var f=1;f<s.vertices.length;f++)!s.vertices[f-1].isInternal||a?r.lineTo(s.vertices[f].x,s.vertices[f].y):r.moveTo(s.vertices[f].x,s.vertices[f].y),s.vertices[f].isInternal&&!a&&r.moveTo(s.vertices[(f+1)%s.vertices.length].x,s.vertices[(f+1)%s.vertices.length].y);r.lineTo(s.vertices[0].x,s.vertices[0].y),r.closePath()}i.wireframes?(r.lineWidth=1,r.strokeStyle=e.options.wireframeStrokeStyle,r.stroke()):(r.fillStyle=s.render.fillStyle,s.render.lineWidth&&(r.lineWidth=s.render.lineWidth,r.strokeStyle=s.render.strokeStyle,r.stroke()),r.fill())}r.globalAlpha=1}}},r.bodyWireframes=function(e,t,n){var r=n,i=e.options.showInternalEdges,a,o,s,c,l;for(r.beginPath(),s=0;s<t.length;s++)if(a=t[s],a.render.visible)for(l=+(a.parts.length>1);l<a.parts.length;l++){for(o=a.parts[l],r.moveTo(o.vertices[0].x,o.vertices[0].y),c=1;c<o.vertices.length;c++)!o.vertices[c-1].isInternal||i?r.lineTo(o.vertices[c].x,o.vertices[c].y):r.moveTo(o.vertices[c].x,o.vertices[c].y),o.vertices[c].isInternal&&!i&&r.moveTo(o.vertices[(c+1)%o.vertices.length].x,o.vertices[(c+1)%o.vertices.length].y);r.lineTo(o.vertices[0].x,o.vertices[0].y)}r.lineWidth=1,r.strokeStyle=e.options.wireframeStrokeStyle,r.stroke()},r.bodyConvexHulls=function(e,t,n){var r=n,i,a,o;for(r.beginPath(),a=0;a<t.length;a++)if(i=t[a],!(!i.render.visible||i.parts.length===1)){for(r.moveTo(i.vertices[0].x,i.vertices[0].y),o=1;o<i.vertices.length;o++)r.lineTo(i.vertices[o].x,i.vertices[o].y);r.lineTo(i.vertices[0].x,i.vertices[0].y)}r.lineWidth=1,r.strokeStyle=`rgba(255,255,255,0.2)`,r.stroke()},r.vertexNumbers=function(e,t,n){var r=n,i,a,o;for(i=0;i<t.length;i++){var s=t[i].parts;for(o=+(s.length>1);o<s.length;o++){var c=s[o];for(a=0;a<c.vertices.length;a++)r.fillStyle=`rgba(255,255,255,0.2)`,r.fillText(i+`_`+a,c.position.x+(c.vertices[a].x-c.position.x)*.8,c.position.y+(c.vertices[a].y-c.position.y)*.8)}}},r.mousePosition=function(e,t,n){var r=n;r.fillStyle=`rgba(255,255,255,0.8)`,r.fillText(t.position.x+`  `+t.position.y,t.position.x+5,t.position.y-5)},r.bodyBounds=function(e,t,n){var r=n;e.engine;var i=e.options;r.beginPath();for(var a=0;a<t.length;a++)if(t[a].render.visible)for(var o=t[a].parts,s=+(o.length>1);s<o.length;s++){var c=o[s];r.rect(c.bounds.min.x,c.bounds.min.y,c.bounds.max.x-c.bounds.min.x,c.bounds.max.y-c.bounds.min.y)}r.strokeStyle=i.wireframes?`rgba(255,255,255,0.08)`:`rgba(0,0,0,0.1)`,r.lineWidth=1,r.stroke()},r.bodyAxes=function(e,t,n){var r=n;e.engine;var i=e.options,a,o,s,c;for(r.beginPath(),o=0;o<t.length;o++){var l=t[o],u=l.parts;if(l.render.visible){if(i.showAxes)for(s=+(u.length>1);s<u.length;s++)for(a=u[s],c=0;c<a.axes.length;c++){var d=a.axes[c];r.moveTo(a.position.x,a.position.y),r.lineTo(a.position.x+d.x*20,a.position.y+d.y*20)}else for(s=+(u.length>1);s<u.length;s++)for(a=u[s],c=0;c<a.axes.length;c++)r.moveTo(a.position.x,a.position.y),r.lineTo((a.vertices[0].x+a.vertices[a.vertices.length-1].x)/2,(a.vertices[0].y+a.vertices[a.vertices.length-1].y)/2)}}i.wireframes?(r.strokeStyle=`indianred`,r.lineWidth=1):(r.strokeStyle=`rgba(255, 255, 255, 0.4)`,r.globalCompositeOperation=`overlay`,r.lineWidth=2),r.stroke(),r.globalCompositeOperation=`source-over`},r.bodyPositions=function(e,t,n){var r=n;e.engine;var i=e.options,a,o,s,c;for(r.beginPath(),s=0;s<t.length;s++)if(a=t[s],a.render.visible)for(c=0;c<a.parts.length;c++)o=a.parts[c],r.arc(o.position.x,o.position.y,3,0,2*Math.PI,!1),r.closePath();for(r.fillStyle=i.wireframes?`indianred`:`rgba(0,0,0,0.5)`,r.fill(),r.beginPath(),s=0;s<t.length;s++)a=t[s],a.render.visible&&(r.arc(a.positionPrev.x,a.positionPrev.y,2,0,2*Math.PI,!1),r.closePath());r.fillStyle=`rgba(255,165,0,0.8)`,r.fill()},r.bodyVelocity=function(e,t,n){var r=n;r.beginPath();for(var a=0;a<t.length;a++){var o=t[a];if(o.render.visible){var s=i.getVelocity(o);r.moveTo(o.position.x,o.position.y),r.lineTo(o.position.x+s.x,o.position.y+s.y)}}r.lineWidth=3,r.strokeStyle=`cornflowerblue`,r.stroke()},r.bodyIds=function(e,t,n){var r=n,i,a;for(i=0;i<t.length;i++)if(t[i].render.visible){var o=t[i].parts;for(a=+(o.length>1);a<o.length;a++){var s=o[a];r.font=`12px Arial`,r.fillStyle=`rgba(255,255,255,0.5)`,r.fillText(s.id,s.position.x+10,s.position.y-10)}}},r.collisions=function(e,t,n){var r=n,i=e.options,a,o,s,c;for(r.beginPath(),s=0;s<t.length;s++)if(a=t[s],a.isActive)for(o=a.collision,c=0;c<a.contactCount;c++){var l=a.contacts[c].vertex;r.rect(l.x-1.5,l.y-1.5,3.5,3.5)}for(r.fillStyle=i.wireframes?`rgba(255,255,255,0.7)`:`orange`,r.fill(),r.beginPath(),s=0;s<t.length;s++)if(a=t[s],a.isActive&&(o=a.collision,a.contactCount>0)){var u=a.contacts[0].vertex.x,d=a.contacts[0].vertex.y;a.contactCount===2&&(u=(a.contacts[0].vertex.x+a.contacts[1].vertex.x)/2,d=(a.contacts[0].vertex.y+a.contacts[1].vertex.y)/2),o.bodyB===o.supports[0].body||o.bodyA.isStatic===!0?r.moveTo(u-o.normal.x*8,d-o.normal.y*8):r.moveTo(u+o.normal.x*8,d+o.normal.y*8),r.lineTo(u,d)}r.strokeStyle=i.wireframes?`rgba(255,165,0,0.7)`:`orange`,r.lineWidth=1,r.stroke()},r.separations=function(e,t,n){var r=n,i=e.options,a,o,s,c,l;for(r.beginPath(),l=0;l<t.length;l++)if(a=t[l],a.isActive){o=a.collision,s=o.bodyA,c=o.bodyB;var u=1;!c.isStatic&&!s.isStatic&&(u=.5),c.isStatic&&(u=0),r.moveTo(c.position.x,c.position.y),r.lineTo(c.position.x-o.penetration.x*u,c.position.y-o.penetration.y*u),u=1,!c.isStatic&&!s.isStatic&&(u=.5),s.isStatic&&(u=0),r.moveTo(s.position.x,s.position.y),r.lineTo(s.position.x+o.penetration.x*u,s.position.y+o.penetration.y*u)}r.strokeStyle=i.wireframes?`rgba(255,165,0,0.5)`:`orange`,r.stroke()},r.inspector=function(e,t){e.engine;var n=e.selected,r=e.render,i=r.options,a;if(i.hasBounds){var o=r.bounds.max.x-r.bounds.min.x,s=r.bounds.max.y-r.bounds.min.y,c=o/r.options.width,l=s/r.options.height;t.scale(1/c,1/l),t.translate(-r.bounds.min.x,-r.bounds.min.y)}for(var u=0;u<n.length;u++){var d=n[u].data;switch(t.translate(.5,.5),t.lineWidth=1,t.strokeStyle=`rgba(255,165,0,0.9)`,t.setLineDash([1,2]),d.type){case`body`:a=d.bounds,t.beginPath(),t.rect(Math.floor(a.min.x-3),Math.floor(a.min.y-3),Math.floor(a.max.x-a.min.x+6),Math.floor(a.max.y-a.min.y+6)),t.closePath(),t.stroke();break;case`constraint`:var f=d.pointA;d.bodyA&&(f=d.pointB),t.beginPath(),t.arc(f.x,f.y,10,0,2*Math.PI),t.closePath(),t.stroke()}t.setLineDash([]),t.translate(-.5,-.5)}e.selectStart!==null&&(t.translate(.5,.5),t.lineWidth=1,t.strokeStyle=`rgba(255,165,0,0.6)`,t.fillStyle=`rgba(255,165,0,0.1)`,a=e.selectBounds,t.beginPath(),t.rect(Math.floor(a.min.x),Math.floor(a.min.y),Math.floor(a.max.x-a.min.x),Math.floor(a.max.y-a.min.y)),t.closePath(),t.stroke(),t.fill(),t.translate(-.5,-.5)),i.hasBounds&&t.setTransform(1,0,0,1,0,0)};var n=function(e,t){var n=e.engine,i=e.timing,a=i.historySize,o=n.timing.timestamp;i.delta=t-i.lastTime||r._goodDelta,i.lastTime=t,i.timestampElapsed=o-i.lastTimestamp||0,i.lastTimestamp=o,i.deltaHistory.unshift(i.delta),i.deltaHistory.length=Math.min(i.deltaHistory.length,a),i.engineDeltaHistory.unshift(n.timing.lastDelta),i.engineDeltaHistory.length=Math.min(i.engineDeltaHistory.length,a),i.timestampElapsedHistory.unshift(i.timestampElapsed),i.timestampElapsedHistory.length=Math.min(i.timestampElapsedHistory.length,a),i.engineUpdatesHistory.unshift(n.timing.lastUpdatesPerFrame),i.engineUpdatesHistory.length=Math.min(i.engineUpdatesHistory.length,a),i.engineElapsedHistory.unshift(n.timing.lastElapsed),i.engineElapsedHistory.length=Math.min(i.engineElapsedHistory.length,a),i.elapsedHistory.unshift(i.lastElapsed),i.elapsedHistory.length=Math.min(i.elapsedHistory.length,a)},d=function(e){for(var t=0,n=0;n<e.length;n+=1)t+=e[n];return t/e.length||0},f=function(e,t){var n=document.createElement(`canvas`);return n.width=e,n.height=t,n.oncontextmenu=function(){return!1},n.onselectstart=function(){return!1},n},p=function(e){var t=e.getContext(`2d`);return(window.devicePixelRatio||1)/(t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1)},m=function(e,t){var n=e.textures[t];return n||(n=e.textures[t]=new Image,n.src=t,n)},h=function(e,t){var n=t;/(jpg|gif|png)$/.test(t)&&(n=`url(`+t+`)`),e.canvas.style.background=n,e.canvas.style.backgroundSize=`contain`,e.currentBackground=t}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(5),a=n(17),o=n(0);(function(){r._maxFrameDelta=1e3/15,r._frameDeltaFallback=1e3/60,r._timeBufferMargin=1.5,r._elapsedNextEstimate=1,r._smoothingLowerBound=.1,r._smoothingUpperBound=.9,r.create=function(e){var t=o.extend({delta:1e3/60,frameDelta:null,frameDeltaSmoothing:!0,frameDeltaSnapping:!0,frameDeltaHistory:[],frameDeltaHistorySize:100,frameRequestId:null,timeBuffer:0,timeLastTick:null,maxUpdates:null,maxFrameTime:1e3/30,lastUpdatesDeferred:0,enabled:!0},e);return t.fps=0,t},r.run=function(e,t){return e.timeBuffer=r._frameDeltaFallback,(function n(i){e.frameRequestId=r._onNextFrame(e,n),i&&e.enabled&&r.tick(e,t,i)})(),e},r.tick=function(t,n,s){var c=o.now(),l=t.delta,u=0,d=s-t.timeLastTick;if((!d||!t.timeLastTick||d>Math.max(r._maxFrameDelta,t.maxFrameTime))&&(d=t.frameDelta||r._frameDeltaFallback),t.frameDeltaSmoothing){t.frameDeltaHistory.push(d),t.frameDeltaHistory=t.frameDeltaHistory.slice(-t.frameDeltaHistorySize);var f=t.frameDeltaHistory.slice(0).sort();d=e(t.frameDeltaHistory.slice(f.length*r._smoothingLowerBound,f.length*r._smoothingUpperBound))||d}t.frameDeltaSnapping&&(d=1e3/Math.round(1e3/d)),t.frameDelta=d,t.timeLastTick=s,t.timeBuffer+=t.frameDelta,t.timeBuffer=o.clamp(t.timeBuffer,0,t.frameDelta+l*r._timeBufferMargin),t.lastUpdatesDeferred=0;var p=t.maxUpdates||Math.ceil(t.maxFrameTime/l),m={timestamp:n.timing.timestamp};i.trigger(t,`beforeTick`,m),i.trigger(t,`tick`,m);for(var h=o.now();l>0&&t.timeBuffer>=l*r._timeBufferMargin;){i.trigger(t,`beforeUpdate`,m),a.update(n,l),i.trigger(t,`afterUpdate`,m),t.timeBuffer-=l,u+=1;var g=o.now()-c,_=o.now()-h,v=g+r._elapsedNextEstimate*_/u;if(u>=p||v>t.maxFrameTime){t.lastUpdatesDeferred=Math.round(Math.max(0,t.timeBuffer/l-r._timeBufferMargin));break}}n.timing.lastUpdatesPerFrame=u,i.trigger(t,`afterTick`,m),t.frameDeltaHistory.length>=100&&(t.lastUpdatesDeferred&&Math.round(t.frameDelta/l)>p?o.warnOnce(`Matter.Runner: runner reached runner.maxUpdates, see docs.`):t.lastUpdatesDeferred&&o.warnOnce(`Matter.Runner: runner reached runner.maxFrameTime, see docs.`),t.isFixed!==void 0&&o.warnOnce(`Matter.Runner: runner.isFixed is now redundant, see docs.`),(t.deltaMin||t.deltaMax)&&o.warnOnce(`Matter.Runner: runner.deltaMin and runner.deltaMax were removed, see docs.`),t.fps!==0&&o.warnOnce(`Matter.Runner: runner.fps was replaced by runner.delta, see docs.`))},r.stop=function(e){r._cancelNextFrame(e)},r._onNextFrame=function(e,t){if(typeof window<`u`&&window.requestAnimationFrame)e.frameRequestId=window.requestAnimationFrame(t);else throw Error(`Matter.Runner: missing required global window.requestAnimationFrame.`);return e.frameRequestId},r._cancelNextFrame=function(e){if(typeof window<`u`&&window.cancelAnimationFrame)window.cancelAnimationFrame(e.frameRequestId);else throw Error(`Matter.Runner: missing required global window.cancelAnimationFrame.`)};var e=function(e){for(var t=0,n=e.length,r=0;r<n;r+=1)t+=e[r];return t/n||0}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(8),a=n(0).deprecated;(function(){r.collides=function(e,t){return i.collides(e,t)},a(r,`collides`,`SAT.collides ➤ replaced by Collision.collides`)})()}),(function(e,t,n){var r={};e.exports=r,n(1);var i=n(0);(function(){r.pathToVertices=function(e,t){typeof window<`u`&&!(`SVGPathSeg`in window)&&i.warn(`Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.`);var n,a,o,s,c,l,u,d,f,p,m=[],h,g,_=0,v=0,y=0;t||=15;var b=function(e,t,n){var r=n%2==1&&n>1;if(!f||e!=f.x||t!=f.y){f&&r?(h=f.x,g=f.y):(h=0,g=0);var i={x:h+e,y:g+t};(r||!f)&&(f=i),m.push(i),v=h+e,y=g+t}},x=function(e){var t=e.pathSegTypeAsLetter.toUpperCase();if(t!==`Z`){switch(t){case`M`:case`L`:case`T`:case`C`:case`S`:case`Q`:v=e.x,y=e.y;break;case`H`:v=e.x;break;case`V`:y=e.y}b(v,y,e.pathSegType)}};for(r._svgPathToAbsolute(e),o=e.getTotalLength(),l=[],n=0;n<e.pathSegList.numberOfItems;n+=1)l.push(e.pathSegList.getItem(n));for(u=l.concat();_<o;){if(p=e.getPathSegAtLength(_),c=l[p],c!=d){for(;u.length&&u[0]!=c;)x(u.shift());d=c}switch(c.pathSegTypeAsLetter.toUpperCase()){case`C`:case`T`:case`S`:case`Q`:case`A`:s=e.getPointAtLength(_),b(s.x,s.y,0)}_+=t}for(n=0,a=u.length;n<a;++n)x(u[n]);return m},r._svgPathToAbsolute=function(e){for(var t,n,r,i,a,o,s=e.pathSegList,c=0,l=0,u=s.numberOfItems,d=0;d<u;++d){var f=s.getItem(d),p=f.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(p))`x`in f&&(c=f.x),`y`in f&&(l=f.y);else switch(`x1`in f&&(r=c+f.x1),`x2`in f&&(a=c+f.x2),`y1`in f&&(i=l+f.y1),`y2`in f&&(o=l+f.y2),`x`in f&&(c+=f.x),`y`in f&&(l+=f.y),p){case`m`:s.replaceItem(e.createSVGPathSegMovetoAbs(c,l),d);break;case`l`:s.replaceItem(e.createSVGPathSegLinetoAbs(c,l),d);break;case`h`:s.replaceItem(e.createSVGPathSegLinetoHorizontalAbs(c),d);break;case`v`:s.replaceItem(e.createSVGPathSegLinetoVerticalAbs(l),d);break;case`c`:s.replaceItem(e.createSVGPathSegCurvetoCubicAbs(c,l,r,i,a,o),d);break;case`s`:s.replaceItem(e.createSVGPathSegCurvetoCubicSmoothAbs(c,l,a,o),d);break;case`q`:s.replaceItem(e.createSVGPathSegCurvetoQuadraticAbs(c,l,r,i),d);break;case`t`:s.replaceItem(e.createSVGPathSegCurvetoQuadraticSmoothAbs(c,l),d);break;case`a`:s.replaceItem(e.createSVGPathSegArcAbs(c,l,f.r1,f.r2,f.angle,f.largeArcFlag,f.sweepFlag),d);break;case`z`:case`Z`:c=t,l=n}(p==`M`||p==`m`)&&(t=c,n=l)}}})()}),(function(e,t,n){var r={};e.exports=r;var i=n(6);n(0),(function(){r.create=i.create,r.add=i.add,r.remove=i.remove,r.clear=i.clear,r.addComposite=i.addComposite,r.addBody=i.addBody,r.addConstraint=i.addConstraint})()})])})}))(),1),pO=1440,mO=900,hO=[{key:`orange`,color:`#FF854A`,w:212,h:218,d:`M42 34 C60 4 90 -4 120 4 C150 12 176 24 188 36 C210 54 214 82 210 104 C200 140 150 190 112 214 C80 222 56 200 40 184 C20 164 2 140 0 112 C-2 80 26 60 42 34Z`},{key:`cyan`,color:`#03C5E9`,w:180,h:176,d:`M28 20 C46 6 90 0 112 2 C130 4 142 18 152 28 C172 48 182 90 178 120 C176 150 160 166 132 174 C96 182 50 176 20 158 C0 146 -2 126 4 106 C12 80 14 40 28 20Z`},{key:`amber`,color:`#F3C11B`,w:183,h:160,d:`M10 30 C30 4 90 -2 128 2 C160 6 172 28 182 70 C190 104 176 126 140 146 C110 162 60 160 36 146 C14 134 6 104 2 80 C-2 56 0 42 10 30Z`},{key:`purple`,color:`#7F6CDF`,w:165,h:140,d:`M18 22 C40 6 70 -2 96 2 C124 8 156 12 162 26 C166 38 158 60 150 88 C140 106 126 118 108 124 C90 130 70 140 50 138 C36 136 24 120 14 102 C2 80 -2 40 18 22Z`},{key:`brown`,color:`#93663C`,w:125,h:130,d:`M30 30 C42 10 52 0 68 2 C92 6 120 18 124 36 C128 60 120 84 106 104 C92 120 70 128 46 130 C28 130 20 118 14 100 C6 80 -2 64 4 52 C10 42 22 40 30 30Z`},{key:`pink`,color:`#FF87C7`,w:144,h:138,d:`M35 1 L98 0 L144 41 L130 90 L105 128 L55 138 L9 112 L0 42Z`},{key:`green`,color:`#00A36E`,w:104,h:116,d:`M8 22 C20 4 46 -2 66 6 C88 14 102 32 104 56 C106 80 98 100 78 110 C56 120 30 116 20 98 C8 80 -2 60 0 42 C2 32 4 28 8 22Z`},{key:`lime`,color:vx,w:165,h:112,d:`M10 8 C40 0 140 -4 160 6 C166 30 166 52 160 66 C148 90 132 108 112 108 C92 108 76 92 56 86 C36 80 14 62 6 44 C0 30 2 14 10 8Z`}];function gO(e,t){let n=`http://www.w3.org/2000/svg`,r=document.createElementNS(n,`svg`);r.setAttribute(`style`,`position:absolute;width:0;height:0;visibility:hidden`);let i=document.createElementNS(n,`path`);i.setAttribute(`d`,e),r.appendChild(i),document.body.appendChild(r);let a=i.getTotalLength(),o=Array.from({length:t},(e,n)=>{let r=i.getPointAtLength(a*n/t);return{x:r.x,y:r.y}});return r.remove(),o}var _O=()=>{let e=Math.min(window.innerWidth/pO,window.innerHeight/mO);return{scale:e,height:window.innerHeight/e}};function vO(){let[e,t]=(0,B.useState)(_O);return(0,B.useEffect)(()=>{let e=()=>t(_O());return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),e}function yO({floor:e}){let t=(0,B.useRef)([]),n=(0,B.useRef)(null),r=(0,B.useRef)(null),i=(0,B.useRef)(e);return(0,B.useLayoutEffect)(()=>{let{Engine:e,Bodies:a,Body:o,Composite:s,Vertices:c}=fO.default,l=e.create();l.gravity.y=1.15;let u={isStatic:!0,friction:.8},d=a.rectangle(1080,i.current+50,900,100,u);s.add(l.world,[d,a.rectangle(706,1e3,24,4e3,u),a.rectangle(1452,1e3,24,4e3,u)]);let f=hO.map(e=>{let t=c.hull(gO(e.d,40)),n=c.centre(t),r=730+e.w/2,i=1430-e.w/2,s=a.fromVertices(r+Math.random()*(i-r),-160,[t],{restitution:.25,friction:.55,frictionAir:.012,density:.002});return o.setAngle(s,(Math.random()-.5)*.8),{body:s,centre:n}}),p=()=>f.forEach(({body:e,centre:n},r)=>{let i=t.current[r];i&&(i.style.transform=`translate(${e.position.x}px,${e.position.y}px) rotate(${e.angle}rad) translate(${-n.x}px,${-n.y}px)`)}),m=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,h=[];if(m){f.forEach(({body:e},t)=>{o.setPosition(e,{x:e.position.x,y:-160-t*260}),s.add(l.world,e)});for(let t=0;t<900;t++)e.update(l,1e3/60);p()}else f.forEach(({body:e},t)=>h.push(window.setTimeout(()=>s.add(l.world,e),200+t*230)));let g=0,_=()=>{e.update(l,1e3/60),p(),g=requestAnimationFrame(_)};return m||_(),r.current=t=>{if(o.setPosition(d,{x:1080,y:t+50}),m){for(let t=0;t<240;t++)e.update(l,1e3/60);p()}},n.current=t=>{let{body:n}=f[t];if(o.setVelocity(n,{x:(Math.random()-.5)*6,y:-13}),o.setAngularVelocity(n,(Math.random()-.5)*.15),m){for(let t=0;t<240;t++)e.update(l,1e3/60);p()}},()=>{cancelAnimationFrame(g),h.forEach(clearTimeout),e.clear(l)}},[]),(0,B.useEffect)(()=>{i.current!==e&&(i.current=e,r.current?.(e))},[e]),(0,H.jsx)(H.Fragment,{children:hO.map((e,r)=>(0,H.jsx)(NO,{ref:e=>void(t.current[r]=e),onClick:()=>n.current?.(r),children:(0,H.jsx)(`svg`,{width:e.w,height:e.h,viewBox:`0 0 ${e.w} ${e.h}`,"aria-hidden":`true`,children:(0,H.jsx)(`path`,{d:e.d,fill:e.color})})},e.key))})}function bO(){let{scale:e,height:t}=vO(),[n,r]=(0,B.useState)(``);return(0,H.jsx)(xO,{children:(0,H.jsxs)(SO,{style:{height:t,transform:`translateX(-50%) scale(${e})`,"--dy":`${(t-mO)/2}px`},children:[(0,H.jsxs)(CO,{children:[(0,H.jsx)(`svg`,{width:52,height:54,viewBox:`0 0 32 32`,"aria-hidden":`true`,children:(0,H.jsx)(`path`,{d:yx,fill:vx})}),(0,H.jsxs)(`span`,{children:[(0,H.jsx)(wO,{children:`數位教科書`}),(0,H.jsx)(TO,{children:`Digital Textbook`})]})]}),(0,H.jsxs)(EO,{onSubmit:e=>{e.preventDefault(),gD()},children:[(0,H.jsx)(DO,{children:`WELCOME !`}),(0,H.jsxs)(OO,{children:[`電子信箱`,(0,H.jsx)(kO,{type:`email`,autoComplete:`username`,placeholder:`請輸入電子郵件`,value:n,onChange:e=>r(e.target.value)})]}),(0,H.jsxs)(OO,{children:[`密碼`,(0,H.jsx)(kO,{type:`password`,autoComplete:`current-password`,placeholder:`請輸入密碼`})]}),(0,H.jsxs)(AO,{type:`submit`,children:[`進入數位教科書`,(0,H.jsx)(jO,{"aria-hidden":`true`,children:`→`})]})]}),(0,H.jsx)(MO,{}),(0,H.jsx)(yO,{floor:t})]})})}var xO=V.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: ${e=>e.theme.surface.raised};
`,SO=V.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: ${pO}px;
  transform-origin: 50% 100%;
  overflow: hidden;
  color: ${e=>e.theme.text.primary};
`,CO=V.div`
  position: absolute;
  left: 133px;
  top: calc(122px + var(--dy));
  display: flex;
  align-items: center;
  gap: 14px;
`,wO=V.span`
  display: block;
  font-family: 'FanThinkGrotesk', var(--ds-typography-font-sans);
  font-weight: 700;
  font-size: 26px;
  letter-spacing: 0.2em;
  line-height: 1.2;
`,TO=V.span`
  display: block;
  font-family: ${e=>e.theme.typography.fontDisplay};
  font-size: 18px;
  line-height: 1.3;
`,EO=V.form`
  position: absolute;
  left: 200px;
  top: calc(268px + var(--dy));
  width: 342px;
  display: flex;
  flex-direction: column;
`,DO=V.h1`
  margin: 0 0 26px;
  font-family: ${e=>e.theme.typography.fontDisplay};
  font-size: 64px;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 1.1;
  white-space: nowrap;
`,OO=V.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-block-end: 20px;
  font-size: 14px;
  color: ${e=>e.theme.text.secondary};

  &:last-of-type { margin-block-end: 32px; }
`,kO=V.input`
  block-size: 48px;
  padding: 0 24px;
  border: ${e=>e.theme.border.widthDefault} solid transparent;
  border-radius: 999px;
  background: ${e=>e.theme.surface.sunken};
  font: inherit;
  font-size: 16px;
  color: ${e=>e.theme.text.primary};
  outline: none;

  &::placeholder { color: ${e=>e.theme.text.placeholder}; }
  &:focus {
    background: ${e=>e.theme.surface.raised};
    border-color: ${e=>e.theme.border.default};
  }
`,AO=V.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  block-size: 56px;
  padding: 0 8px 0 24px;
  border: none;
  border-radius: 999px;
  background: ${e=>e.theme.surface.inverse};
  color: ${e=>e.theme.text.onInverse};
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:focus-visible { outline: 2px solid ${e=>e.theme.border.default}; outline-offset: 2px; }
`,jO=V.span`
  display: grid;
  place-items: center;
  inline-size: 40px;
  block-size: 40px;
  border-radius: 999px;
  background: ${e=>e.theme.brand.primary};
  color: ${e=>e.theme.text.primary};
  font-size: 18px;
  transition: transform 0.2s;

  ${AO}:hover & { transform: translateX(3px); }
`,MO=V.div`
  position: absolute;
  left: 720px;
  top: calc(250px + var(--dy));
  width: 1px;
  height: 400px;
  background: ${e=>e.theme.border.subtle};
`,NO=V.div`
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-9999px, 0);
  transform-origin: 0 0;
  will-change: transform;
  cursor: pointer;

  svg { display: block; }
`;function PO(){let e=fx(),t=vD(),n=tD()===`admin`,r=e.page===`edit`||e.page===`read`?vC(e.id):null,i=e.page===`readTextbook`?xE(e.id):null,a=(e.page===`edit`||e.page===`read`)&&!r,o=e.page===`readTextbook`&&!i;if((0,B.useEffect)(()=>{t&&(a||o)&&mx(a?`mine`:`textbook`)},[t,a,o]),!t)return(0,H.jsx)(bO,{});if(r){let t=VC(r.id)??kE(r.sourceId);return t?(0,H.jsx)(eE,{bookId:r.id,initialDoc:t,startReading:e.page===`read`},`${e.page}-${r.id}`):null}if(i){let e=wE(i);return(0,H.jsx)(eE,{bookId:null,initialDoc:e,readOnly:!0,onEnterEdit:n?()=>hx(NC(i.id,e,{subject:i.subject,publisher:i.publisher,cover:i.art??i.cover}).id):void 0},`book-${i.id}`)}return e.page===`shelf`?(0,H.jsx)(bD,{tab:e.tab,subject:e.subject}):null}var FO=800;function IO(){let e=new WeakMap;window.addEventListener(`scroll`,t=>{let n=t.target instanceof Element?t.target:document.scrollingElement;if(!n)return;n.setAttribute(`data-scrolling`,``);let r=e.get(n);r&&window.clearTimeout(r),e.set(n,window.setTimeout(()=>n.removeAttribute(`data-scrolling`),FO))},{capture:!0,passive:!0})}IO(),Fd(()=>import(`./sampleLibrary-BVbGNKBi.js`).then(e=>e.seedSampleLibrary()),[]),(0,Le.createRoot)(document.getElementById(`root`)).render((0,H.jsx)(B.StrictMode,{children:(0,H.jsxs)(On,{theme:Wn,children:[(0,H.jsx)(Gn,{}),(0,H.jsx)(PO,{})]})}));export{Fa as n,ha as r,Fd as t};