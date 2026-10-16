var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function E(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function D(e,t){return E(e.type,t,e.props)}function O(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function k(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var A=/\/+/g;function ee(e,t){return typeof e==`object`&&e&&e.key!=null?k(``+e.key):t.toString(36)}function te(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function j(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,j(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ee(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(A,`$&/`)+`/`),j(o,r,i,``,function(e){return e})):o!=null&&(O(o)&&(o=D(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(A,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ee(a,u),c+=j(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ee(a,u++),c+=j(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return j(te(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function M(e,t,n){if(e==null)return e;var r=[],i=0;return j(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function N(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var P=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},F={map:M,forEach:function(e,t,n){M(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return M(e,function(){t++}),t},toArray:function(e){return M(e,function(e){return e})||[]},only:function(e){if(!O(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=F,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return E(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return E(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=O,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:N}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,P)}catch(e){P(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.8`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&ee(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ee(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function ee(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ee(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.8`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),E=Symbol.for(`react.suspense_list`),D=Symbol.for(`react.memo`),O=Symbol.for(`react.lazy`),k=Symbol.for(`react.activity`),A=Symbol.for(`react.memo_cache_sentinel`),ee=Symbol.iterator;function te(e){return typeof e!=`object`||!e?null:(e=ee&&e[ee]||e[`@@iterator`],typeof e==`function`?e:null)}var j=Symbol.for(`react.client.reference`);function M(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===j?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case T:return`Suspense`;case E:return`SuspenseList`;case k:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case D:return t=e.displayName||null,t===null?M(e.type)||`Memo`:t;case O:t=e._payload,e=e._init;try{return M(e(t))}catch{}}return null}var N=Array.isArray,P=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ne={pending:!1,data:null,method:null,action:null},re=[],ie=-1;function ae(e){return{current:e}}function oe(e){0>ie||(e.current=re[ie],re[ie]=null,ie--)}function I(e,t){ie++,re[ie]=e.current,e.current=t}var se=ae(null),ce=ae(null),L=ae(null),le=ae(null);function ue(e,t){switch(I(L,t),I(ce,e),I(se,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}oe(se),I(se,e)}function de(){oe(se),oe(ce),oe(L)}function fe(e){e.memoizedState!==null&&I(le,e);var t=se.current,n=Hd(t,e.type);t!==n&&(I(ce,e),I(se,n))}function pe(e){ce.current===e&&(oe(se),oe(ce)),le.current===e&&(oe(le),Qf._currentValue=ne)}var me,he;function ge(e){if(me===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);me=t&&t[1]||``,he=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+me+e+he}var _e=!1;function ve(e,t){if(!e||_e)return``;_e=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{_e=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?ge(n):``}function ye(e,t){switch(e.tag){case 26:case 27:case 5:return ge(e.type);case 16:return ge(`Lazy`);case 13:return e.child!==t&&t!==null?ge(`Suspense Fallback`):ge(`Suspense`);case 19:return ge(`SuspenseList`);case 0:case 15:return ve(e.type,!1);case 11:return ve(e.type.render,!1);case 1:return ve(e.type,!0);case 31:return ge(`Activity`);default:return``}}function be(e){try{var t=``,n=null;do t+=ye(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var xe=Object.prototype.hasOwnProperty,Se=t.unstable_scheduleCallback,Ce=t.unstable_cancelCallback,we=t.unstable_shouldYield,Te=t.unstable_requestPaint,Ee=t.unstable_now,De=t.unstable_getCurrentPriorityLevel,Oe=t.unstable_ImmediatePriority,ke=t.unstable_UserBlockingPriority,Ae=t.unstable_NormalPriority,je=t.unstable_LowPriority,Me=t.unstable_IdlePriority,Ne=t.log,Pe=t.unstable_setDisableYieldValue,Fe=null,Ie=null;function Le(e){if(typeof Ne==`function`&&Pe(e),Ie&&typeof Ie.setStrictMode==`function`)try{Ie.setStrictMode(Fe,e)}catch{}}var Re=Math.clz32?Math.clz32:Be,ze=Math.log,R=Math.LN2;function Be(e){return e>>>=0,e===0?32:31-(ze(e)/R|0)|0}var Ve=256,He=262144,Ue=4194304;function We(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ge(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=We(n))):i=We(o):i=We(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=We(n))):i=We(o)):i=We(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Ke(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function qe(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Je(){var e=Ue;return Ue<<=1,!(Ue&62914560)&&(Ue=4194304),e}function Ye(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Xe(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ze(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Re(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&Qe(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function Qe(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Re(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function $e(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Re(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function et(e,t){var n=t&-t;return n=n&42?1:tt(n),(n&(e.suspendedLanes|t))===0?n:0}function tt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function nt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function rt(){var e=F.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function it(e,t){var n=F.p;try{return F.p=e,t()}finally{F.p=n}}var at=Math.random().toString(36).slice(2),ot=`__reactFiber$`+at,st=`__reactProps$`+at,ct=`__reactContainer$`+at,lt=`__reactEvents$`+at,ut=`__reactListeners$`+at,dt=`__reactHandles$`+at,ft=`__reactResources$`+at,pt=`__reactMarker$`+at;function mt(e){delete e[ot],delete e[st],delete e[lt],delete e[ut],delete e[dt]}function ht(e){var t=e[ot];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ct]||n[ot]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[ot])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function gt(e){if(e=e[ot]||e[ct]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function _t(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function vt(e){var t=e[ft];return t||=e[ft]={hoistableStyles:new Map,hoistableScripts:new Map},t}function yt(e){e[pt]=!0}var bt=new Set,xt={};function St(e,t){Ct(e,t),Ct(e+`Capture`,t)}function Ct(e,t){for(xt[e]=t,e=0;e<t.length;e++)bt.add(t[e])}var wt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Tt={},Et={};function Dt(e){return xe.call(Et,e)?!0:xe.call(Tt,e)?!1:wt.test(e)?Et[e]=!0:(Tt[e]=!0,!1)}function Ot(e,t,n){if(Dt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}}function kt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function At(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function jt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Mt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Nt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Pt(e){if(!e._valueTracker){var t=Mt(e)?`checked`:`value`;e._valueTracker=Nt(e,t,``+e[t])}}function Ft(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Mt(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}function It(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Lt=/[\n"\\]/g;function Rt(e){return e.replace(Lt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function zt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+jt(t)):e.value!==``+jt(t)&&(e.value=``+jt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Vt(e,o,jt(n)):Vt(e,o,jt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+jt(s):e.removeAttribute(`name`)}function Bt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Pt(e);return}n=n==null?``:``+jt(n),t=t==null?n:``+jt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Pt(e)}function Vt(e,t,n){t===`number`&&It(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Ht(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+jt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Ut(e,t,n){if(t!=null&&(t=``+jt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+jt(n)}function Wt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(N(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=jt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Pt(e)}function Gt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Kt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function qt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Kt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Jt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&qt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&qt(e,o,t[o])}function Yt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Xt=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),Zt=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Qt(e){return Zt.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function $t(){}var en=null;function tn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var nn=null,rn=null;function an(e){var t=gt(e);if(t&&(e=t.stateNode)){var n=e[st]||null;a:switch(e=t.stateNode,t.type){case`input`:if(zt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Rt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[st]||null;if(!a)throw Error(i(90));zt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Ft(r)}break a;case`textarea`:Ut(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Ht(e,!!n.multiple,t,!1)}}}var on=!1;function sn(e,t,n){if(on)return e(t,n);on=!0;try{return e(t)}finally{if(on=!1,(nn!==null||rn!==null)&&(yu(),nn&&(t=nn,e=rn,rn=nn=null,an(t),e)))for(t=0;t<e.length;t++)an(e[t])}}function cn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[st]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var ln=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),un=!1;if(ln)try{var dn={};Object.defineProperty(dn,"passive",{get:function(){un=!0}}),window.addEventListener(`test`,dn,dn),window.removeEventListener(`test`,dn,dn)}catch{un=!1}var fn=null,pn=null,mn=null;function hn(){if(mn)return mn;var e,t=pn,n=t.length,r,i=`value`in fn?fn.value:fn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return mn=i.slice(e,1<r?1-r:void 0)}function gn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function _n(){return!0}function vn(){return!1}function yn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?_n:vn,this.isPropagationStopped=vn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=_n)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=_n)},persist:function(){},isPersistent:_n}),t}var bn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},xn=yn(bn),Sn=h({},bn,{view:0,detail:0}),Cn=yn(Sn),wn,Tn,En,Dn=h({},Sn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:z,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==En&&(En&&e.type===`mousemove`?(wn=e.screenX-En.screenX,Tn=e.screenY-En.screenY):Tn=wn=0,En=e),wn)},movementY:function(e){return`movementY`in e?e.movementY:Tn}}),On=yn(Dn),kn=yn(h({},Dn,{dataTransfer:0})),An=yn(h({},Sn,{relatedTarget:0})),jn=yn(h({},bn,{animationName:0,elapsedTime:0,pseudoElement:0})),Mn=yn(h({},bn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Nn=yn(h({},bn,{data:0})),Pn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Fn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},In={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Ln(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=In[e])?!!t[e]:!1}function z(){return Ln}var Rn=yn(h({},Sn,{key:function(e){if(e.key){var t=Pn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=gn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Fn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:z,charCode:function(e){return e.type===`keypress`?gn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?gn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),zn=yn(h({},Dn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),B=yn(h({},Sn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:z})),Bn=yn(h({},bn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Vn=yn(h({},Dn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Hn=yn(h({},bn,{newState:0,oldState:0})),Un=[9,13,27,32],Wn=ln&&`CompositionEvent`in window,Gn=null;ln&&`documentMode`in document&&(Gn=document.documentMode);var Kn=ln&&`TextEvent`in window&&!Gn,qn=ln&&(!Wn||Gn&&8<Gn&&11>=Gn),Jn=` `,Yn=!1;function V(e,t){switch(e){case`keyup`:return Un.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Xn(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var Zn=!1;function Qn(e,t){switch(e){case`compositionend`:return Xn(t);case`keypress`:return t.which===32?(Yn=!0,Jn):null;case`textInput`:return e=t.data,e===Jn&&Yn?null:e;default:return null}}function $n(e,t){if(Zn)return e===`compositionend`||!Wn&&V(e,t)?(e=hn(),mn=pn=fn=null,Zn=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return qn&&t.locale!==`ko`?null:t.data;default:return null}}var er={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function tr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!er[e.type]:t===`textarea`}function nr(e,t,n,r){nn?rn?rn.push(r):rn=[r]:nn=r,t=Ed(t,`onChange`),0<t.length&&(n=new xn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var rr=null,ir=null;function ar(e){yd(e,0)}function or(e){if(Ft(_t(e)))return e}function sr(e,t){if(e===`change`)return t}var cr=!1;if(ln){var lr;if(ln){var ur=`oninput`in document;if(!ur){var dr=document.createElement(`div`);dr.setAttribute(`oninput`,`return;`),ur=typeof dr.oninput==`function`}lr=ur}else lr=!1;cr=lr&&(!document.documentMode||9<document.documentMode)}function fr(){rr&&(rr.detachEvent(`onpropertychange`,pr),ir=rr=null)}function pr(e){if(e.propertyName===`value`&&or(ir)){var t=[];nr(t,ir,e,tn(e)),sn(ar,t)}}function mr(e,t,n){e===`focusin`?(fr(),rr=t,ir=n,rr.attachEvent(`onpropertychange`,pr)):e===`focusout`&&fr()}function hr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return or(ir)}function gr(e,t){if(e===`click`)return or(t)}function _r(e,t){if(e===`input`||e===`change`)return or(t)}function vr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var yr=typeof Object.is==`function`?Object.is:vr;function br(e,t){if(yr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!xe.call(t,i)||!yr(e[i],t[i]))return!1}return!0}function xr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Sr(e,t){var n=xr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=xr(n)}}function Cr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Cr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function wr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=It(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=It(e.document)}return t}function Tr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Er=ln&&`documentMode`in document&&11>=document.documentMode,Dr=null,Or=null,kr=null,Ar=!1;function jr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ar||Dr==null||Dr!==It(r)||(r=Dr,`selectionStart`in r&&Tr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),kr&&br(kr,r)||(kr=r,r=Ed(Or,`onSelect`),0<r.length&&(t=new xn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Dr)))}function Mr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Nr={animationend:Mr(`Animation`,`AnimationEnd`),animationiteration:Mr(`Animation`,`AnimationIteration`),animationstart:Mr(`Animation`,`AnimationStart`),transitionrun:Mr(`Transition`,`TransitionRun`),transitionstart:Mr(`Transition`,`TransitionStart`),transitioncancel:Mr(`Transition`,`TransitionCancel`),transitionend:Mr(`Transition`,`TransitionEnd`)},Pr={},Fr={};ln&&(Fr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Nr.animationend.animation,delete Nr.animationiteration.animation,delete Nr.animationstart.animation),`TransitionEvent`in window||delete Nr.transitionend.transition);function Ir(e){if(Pr[e])return Pr[e];if(!Nr[e])return e;var t=Nr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Fr)return Pr[e]=t[n];return e}var Lr=Ir(`animationend`),Rr=Ir(`animationiteration`),zr=Ir(`animationstart`),Br=Ir(`transitionrun`),Vr=Ir(`transitionstart`),Hr=Ir(`transitioncancel`),Ur=Ir(`transitionend`),Wr=new Map,Gr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Gr.push(`scrollEnd`);function Kr(e,t){Wr.set(e,t),St(t,[e])}var qr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Jr=[],Yr=0,Xr=0;function Zr(){for(var e=Yr,t=Xr=Yr=0;t<e;){var n=Jr[t];Jr[t++]=null;var r=Jr[t];Jr[t++]=null;var i=Jr[t];Jr[t++]=null;var a=Jr[t];if(Jr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ti(n,i,a)}}function Qr(e,t,n,r){Jr[Yr++]=e,Jr[Yr++]=t,Jr[Yr++]=n,Jr[Yr++]=r,Xr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function $r(e,t,n,r){return Qr(e,t,n,r),ni(e)}function ei(e,t){return Qr(e,null,null,t),ni(e)}function ti(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Re(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ni(e){if(50<uu)throw uu=0,du=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ri={};function ii(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function H(e,t,n,r){return new ii(e,t,n,r)}function ai(e){return e=e.prototype,!(!e||!e.isReactComponent)}function oi(e,t){var n=e.alternate;return n===null?(n=H(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function si(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ci(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)ai(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,se.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case k:return e=H(31,n,t,a),e.elementType=k,e.lanes=o,e;case y:return li(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=H(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case T:return e=H(13,n,t,a),e.elementType=T,e.lanes=o,e;case E:return e=H(19,n,t,a),e.elementType=E,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case D:s=14;break a;case O:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=H(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function li(e,t,n,r){return e=H(7,e,r,t),e.lanes=n,e}function ui(e,t,n){return e=H(6,e,null,t),e.lanes=n,e}function di(e){var t=H(18,null,null,0);return t.stateNode=e,t}function fi(e,t,n){return t=H(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var pi=new WeakMap;function mi(e,t){if(typeof e==`object`&&e){var n=pi.get(e);return n===void 0?(t={value:e,source:t,stack:be(t)},pi.set(e,t),t):n}return{value:e,source:t,stack:be(t)}}var hi=[],gi=0,_i=null,vi=0,yi=[],bi=0,xi=null,Si=1,Ci=``;function wi(e,t){hi[gi++]=vi,hi[gi++]=_i,_i=e,vi=t}function Ti(e,t,n){yi[bi++]=Si,yi[bi++]=Ci,yi[bi++]=xi,xi=e;var r=Si;e=Ci;var i=32-Re(r)-1;r&=~(1<<i),n+=1;var a=32-Re(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Si=1<<32-Re(t)+i|n<<i|r,Ci=a+e}else Si=1<<a|n<<i|r,Ci=e}function Ei(e){e.return!==null&&(wi(e,1),Ti(e,1,0))}function Di(e){for(;e===_i;)_i=hi[--gi],hi[gi]=null,vi=hi[--gi],hi[gi]=null;for(;e===xi;)xi=yi[--bi],yi[bi]=null,Ci=yi[--bi],yi[bi]=null,Si=yi[--bi],yi[bi]=null}function Oi(e,t){yi[bi++]=Si,yi[bi++]=Ci,yi[bi++]=xi,Si=t.id,Ci=t.overflow,xi=e}var ki=null,Ai=null,U=!1,ji=null,Mi=!1,Ni=Error(i(519));function Pi(e){throw Bi(mi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Ni}function Fi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[ot]=e,t[st]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Bt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Wt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=$t),t=!0):t=!1,t||Pi(e,!0)}function Ii(e){for(ki=e.return;ki;)switch(ki.tag){case 5:case 31:case 13:Mi=!1;return;case 27:case 3:Mi=!0;return;default:ki=ki.return}}function Li(e){if(e!==ki)return!1;if(!U)return Ii(e),U=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||Ud(e.type,e.memoizedProps)),n=!n),n&&Ai&&Pi(e),Ii(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Ai=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Ai=uf(e)}else t===27?(t=Ai,Zd(e.type)?(e=lf,lf=null,Ai=e):Ai=t):Ai=ki?cf(e.stateNode.nextSibling):null;return!0}function Ri(){Ai=ki=null,U=!1}function zi(){var e=ji;return e!==null&&(Xl===null?Xl=e:Xl.push.apply(Xl,e),ji=null),e}function Bi(e){ji===null?ji=[e]:ji.push(e)}var Vi=ae(null),Hi=null,Ui=null;function Wi(e,t,n){I(Vi,t._currentValue),t._currentValue=n}function Gi(e){e._currentValue=Vi.current,oe(Vi)}function Ki(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function qi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Ki(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Ki(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Ji(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;yr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===le.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&qi(t,e,n,r),t.flags|=262144}function Yi(e){for(e=e.firstContext;e!==null;){if(!yr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Xi(e){Hi=e,Ui=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function W(e){return Qi(Hi,e)}function Zi(e,t){return Hi===null&&Xi(e),Qi(e,t)}function Qi(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Ui===null){if(e===null)throw Error(i(308));Ui=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ui=Ui.next=t;return n}var $i=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ea=t.unstable_scheduleCallback,ta=t.unstable_NormalPriority,na={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ra(){return{controller:new $i,data:new Map,refCount:0}}function ia(e){e.refCount--,e.refCount===0&&ea(ta,function(){e.controller.abort()})}var aa=null,oa=0,G=0,sa=null;function ca(e,t){if(aa===null){var n=aa=[];oa=0,G=dd(),sa={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return oa++,t.then(K,K),t}function K(){if(--oa===0&&aa!==null){sa!==null&&(sa.status=`fulfilled`);var e=aa;aa=null,G=0,sa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function q(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var la=P.S;P.S=function(e,t){$l=Ee(),typeof t==`object`&&t&&typeof t.then==`function`&&ca(e,t),la!==null&&la(e,t)};var ua=ae(null);function da(){var e=ua.current;return e===null?Il.pooledCache:e}function fa(e,t){t===null?I(ua,ua.current):I(ua,t.pool)}function pa(){var e=da();return e===null?null:{parent:na._currentValue,pool:e}}var ma=Error(i(460)),ha=Error(i(474)),ga=Error(i(542)),_a={then:function(){}};function va(e){return e=e.status,e===`fulfilled`||e===`rejected`}function ya(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then($t,$t),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ca(e),e;default:if(typeof t.status==`string`)t.then($t,$t);else{if(e=Il,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ca(e),e}throw xa=t,ma}}function ba(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(xa=e,ma):e}}var xa=null;function Sa(){if(xa===null)throw Error(i(459));var e=xa;return xa=null,e}function Ca(e){if(e===ma||e===ga)throw Error(i(483))}var wa=null,Ta=0;function Ea(e){var t=Ta;return Ta+=1,wa===null&&(wa=[]),ya(wa,e,t)}function Da(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Oa(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function ka(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=oi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=ui(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===O&&ba(i)===t.type)?(t=a(t,n.props),Da(t,n),t.return=e,t):(t=ci(n.type,n.key,n.props,null,e.mode,r),Da(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=fi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=li(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=ui(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=ci(t.type,t.key,t.props,null,e.mode,n),Da(n,t),n.return=e,n;case v:return t=fi(t,e.mode,n),t.return=e,t;case O:return t=ba(t),f(e,t,n)}if(N(t)||te(t))return t=li(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ea(t),n);if(t.$$typeof===C)return f(e,Zi(e,t),n);Oa(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case O:return n=ba(n),p(e,t,n,r)}if(N(n)||te(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ea(n),r);if(n.$$typeof===C)return p(e,t,Zi(e,n),r);Oa(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case O:return r=ba(r),m(e,t,n,r,i)}if(N(r)||te(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ea(r),i);if(r.$$typeof===C)return m(e,t,n,Zi(t,r),i);Oa(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),U&&wi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return U&&wi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),U&&wi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),U&&wi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return U&&wi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),U&&wi(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===O&&ba(l)===r.type){n(e,r.sibling),c=a(r,o.props),Da(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===y?(c=li(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=ci(o.type,o.key,o.props,null,e.mode,c),Da(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=fi(o,e.mode,c),c.return=e,e=c}return s(e);case O:return o=ba(o),b(e,r,o,c)}if(N(o))return h(e,r,o,c);if(te(o)){if(l=te(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Ea(o),c);if(o.$$typeof===C)return b(e,r,Zi(e,o),c);Oa(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=ui(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Ta=0;var i=b(e,t,n,r);return wa=null,i}catch(t){if(t===ma||t===ga)throw t;var a=H(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Aa=ka(!0),ja=ka(!1),Ma=!1;function Na(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Pa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Fa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ia(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Y&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ni(e),ti(e,null,n),t}return Qr(e,r,t,n),ni(e)}function La(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,$e(e,n)}}function Ra(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var za=!1;function Ba(){if(za){var e=sa;if(e!==null)throw e}}function Va(e,t,n,r){za=!1;var i=e.updateQueue;Ma=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Z&f)===f:(r&f)===f){f!==0&&f===G&&(za=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ma=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Wl|=o,e.lanes=o,e.memoizedState=d}}function Ha(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Ua(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ha(n[e],t)}var Wa=ae(null),Ga=ae(0);function Ka(e,t){e=Hl,I(Ga,e),I(Wa,t),Hl=e|t.baseLanes}function qa(){I(Ga,Hl),I(Wa,Wa.current)}function Ja(){Hl=Ga.current,oe(Wa),oe(Ga)}var Ya=ae(null),Xa=null;function Za(e){var t=e.alternate;I(no,no.current&1),I(Ya,e),Xa===null&&(t===null||Wa.current!==null||t.memoizedState!==null)&&(Xa=e)}function Qa(e){I(no,no.current),I(Ya,e),Xa===null&&(Xa=e)}function $a(e){e.tag===22?(I(no,no.current),I(Ya,e),Xa===null&&(Xa=e)):eo(e)}function eo(){I(no,no.current),I(Ya,Ya.current)}function to(e){oe(Ya),Xa===e&&(Xa=null),oe(no)}var no=ae(0);function ro(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var io=0,J=null,ao=null,oo=null,so=!1,co=!1,lo=!1,uo=0,fo=0,po=null,mo=0;function ho(){throw Error(i(321))}function go(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!yr(e[n],t[n]))return!1;return!0}function _o(e,t,n,r,i,a){return io=a,J=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,P.H=e===null||e.memoizedState===null?Ps:Fs,lo=!1,a=n(r,i),lo=!1,co&&(a=yo(t,n,r,i)),vo(e),a}function vo(e){P.H=Ns;var t=ao!==null&&ao.next!==null;if(io=0,oo=ao=J=null,so=!1,fo=0,po=null,t)throw Error(i(300));e===null||Qs||(e=e.dependencies,e!==null&&Yi(e)&&(Qs=!0))}function yo(e,t,n,r){J=e;var a=0;do{if(co&&(po=null),fo=0,co=!1,25<=a)throw Error(i(301));if(a+=1,oo=ao=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}P.H=Is,o=t(n,r)}while(co);return o}function bo(){var e=P.H,t=e.useState()[0];return t=typeof t.then==`function`?Do(t):t,e=e.useState()[0],(ao===null?null:ao.memoizedState)!==e&&(J.flags|=1024),t}function xo(){var e=uo!==0;return uo=0,e}function So(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Co(e){if(so){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}so=!1}io=0,oo=ao=J=null,co=!1,fo=uo=0,po=null}function wo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return oo===null?J.memoizedState=oo=e:oo=oo.next=e,oo}function To(){if(ao===null){var e=J.alternate;e=e===null?null:e.memoizedState}else e=ao.next;var t=oo===null?J.memoizedState:oo.next;if(t!==null)oo=t,ao=e;else{if(e===null)throw J.alternate===null?Error(i(467)):Error(i(310));ao=e,e={memoizedState:ao.memoizedState,baseState:ao.baseState,baseQueue:ao.baseQueue,queue:ao.queue,next:null},oo===null?J.memoizedState=oo=e:oo=oo.next=e}return oo}function Eo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Do(e){var t=fo;return fo+=1,po===null&&(po=[]),e=ya(po,e,t),t=J,(oo===null?t.memoizedState:oo.next)===null&&(t=t.alternate,P.H=t===null||t.memoizedState===null?Ps:Fs),e}function Oo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Do(e);if(e.$$typeof===C)return W(e)}throw Error(i(438,String(e)))}function ko(e){var t=null,n=J.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=J.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Eo(),J.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=A;return t.index++,n}function Ao(e,t){return typeof t==`function`?t(e):t}function jo(e){return Mo(To(),ao,e)}function Mo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(io&f)===f:(Z&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===G&&(d=!0);else if((io&p)===p){u=u.next,p===G&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,J.lanes|=p,Wl|=p;f=u.action,lo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,J.lanes|=f,Wl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!yr(o,e.memoizedState)&&(Qs=!0,d&&(n=sa,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function No(e){var t=To(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);yr(o,t.memoizedState)||(Qs=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Po(e,t,n){var r=J,a=To(),o=U;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!yr((ao||a).memoizedState,n);if(s&&(a.memoizedState=n,Qs=!0),a=a.queue,as(Lo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||oo!==null&&oo.memoizedState.tag&1){if(r.flags|=2048,es(9,{destroy:void 0},Io.bind(null,r,a,n,t),null),Il===null)throw Error(i(349));o||io&127||Fo(r,t,n)}return n}function Fo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=J.updateQueue,t===null?(t=Eo(),J.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Io(e,t,n,r){t.value=n,t.getSnapshot=r,Ro(t)&&zo(e)}function Lo(e,t,n){return n(function(){Ro(t)&&zo(e)})}function Ro(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!yr(e,n)}catch{return!0}}function zo(e){var t=ei(e,2);t!==null&&mu(t,e,2)}function Bo(e){var t=wo();if(typeof e==`function`){var n=e;if(e=n(),lo){Le(!0);try{n()}finally{Le(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ao,lastRenderedState:e},t}function Vo(e,t,n,r){return e.baseState=n,Mo(e,ao,typeof r==`function`?r:Ao)}function Ho(e,t,n,r,a){if(As(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};P.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Uo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Uo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=P.T,o={};P.T=o;try{var s=n(i,r),c=P.S;c!==null&&c(o,s),Wo(e,t,s)}catch(n){Ko(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),P.T=a}}else try{a=n(i,r),Wo(e,t,a)}catch(n){Ko(e,t,n)}}function Wo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Go(e,t,n)},function(n){return Ko(e,t,n)}):Go(e,t,n)}function Go(e,t,n){t.status=`fulfilled`,t.value=n,qo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Uo(e,n)))}function Ko(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,qo(t),t=t.next;while(t!==r)}e.action=null}function qo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Jo(e,t){return t}function Yo(e,t){if(U){var n=Il.formState;if(n!==null){a:{var r=J;if(U){if(Ai){b:{for(var i=Ai,a=Mi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){Ai=cf(i.nextSibling),r=i.data===`F!`;break a}}Pi(r)}r=!1}r&&(t=n[0])}}return n=wo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Jo,lastRenderedState:t},n.queue=r,n=Ds.bind(null,J,r),r.dispatch=n,r=Bo(!1),a=ks.bind(null,J,!1,r.queue),r=wo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Ho.bind(null,J,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Xo(e){return Zo(To(),ao,e)}function Zo(e,t,n){if(t=Mo(e,t,Jo)[0],e=jo(Ao)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Do(t)}catch(e){throw e===ma?ga:e}else r=t;t=To();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(J.flags|=2048,es(9,{destroy:void 0},Qo.bind(null,i,n),null)),[r,a,e]}function Qo(e,t){e.action=t}function $o(e){var t=To(),n=ao;if(n!==null)return Zo(t,n,e);To(),t=t.memoizedState,n=To();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function es(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=J.updateQueue,t===null&&(t=Eo(),J.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ts(){return To().memoizedState}function ns(e,t,n,r){var i=wo();J.flags|=e,i.memoizedState=es(1|t,{destroy:void 0},n,r===void 0?null:r)}function rs(e,t,n,r){var i=To();r=r===void 0?null:r;var a=i.memoizedState.inst;ao!==null&&r!==null&&go(r,ao.memoizedState.deps)?i.memoizedState=es(t,a,n,r):(J.flags|=e,i.memoizedState=es(1|t,a,n,r))}function is(e,t){ns(8390656,8,e,t)}function as(e,t){rs(2048,8,e,t)}function os(e){J.flags|=4;var t=J.updateQueue;if(t===null)t=Eo(),J.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function ss(e){var t=To().memoizedState;return os({ref:t,nextImpl:e}),function(){if(Y&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function cs(e,t){return rs(4,2,e,t)}function ls(e,t){return rs(4,4,e,t)}function us(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ds(e,t,n){n=n==null?null:n.concat([e]),rs(4,4,us.bind(null,t,e),n)}function fs(){}function ps(e,t){var n=To();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&go(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ms(e,t){var n=To();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&go(t,r[1]))return r[0];if(r=e(),lo){Le(!0);try{e()}finally{Le(!1)}}return n.memoizedState=[r,t],r}function hs(e,t,n){return n===void 0||io&1073741824&&!(Z&261930)?e.memoizedState=t:(e.memoizedState=n,e=pu(),J.lanes|=e,Wl|=e,n)}function gs(e,t,n,r){return yr(n,t)?n:Wa.current===null?!(io&42)||io&1073741824&&!(Z&261930)?(Qs=!0,e.memoizedState=n):(e=pu(),J.lanes|=e,Wl|=e,t):(e=hs(e,n,r),yr(e,t)||(Qs=!0),e)}function _s(e,t,n,r,i){var a=F.p;F.p=a!==0&&8>a?a:8;var o=P.T,s={};P.T=s,ks(e,!1,t,n);try{var c=i(),l=P.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Os(e,t,q(c,r),fu(e)):Os(e,t,r,fu(e))}catch(n){Os(e,t,{then:function(){},status:`rejected`,reason:n},fu())}finally{F.p=a,o!==null&&s.types!==null&&(o.types=s.types),P.T=o}}function vs(){}function ys(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=bs(e).queue;_s(e,a,t,ne,n===null?vs:function(){return xs(e),n(r)})}function bs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ne,baseState:ne,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ao,lastRenderedState:ne},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ao,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function xs(e){var t=bs(e);t.next===null&&(t=e.alternate.memoizedState),Os(e,t.next.queue,{},fu())}function Ss(){return W(Qf)}function Cs(){return To().memoizedState}function ws(){return To().memoizedState}function Ts(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=fu();e=Fa(n);var r=Ia(t,e,n);r!==null&&(mu(r,t,n),La(r,t,n)),t={cache:ra()},e.payload=t;return}t=t.return}}function Es(e,t,n){var r=fu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},As(e)?js(t,n):(n=$r(e,t,n,r),n!==null&&(mu(n,e,r),Ms(n,t,r)))}function Ds(e,t,n){Os(e,t,n,fu())}function Os(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(As(e))js(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,yr(s,o))return Qr(e,t,i,0),Il===null&&Zr(),!1}catch{}if(n=$r(e,t,i,r),n!==null)return mu(n,e,r),Ms(n,t,r),!0}return!1}function ks(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},As(e)){if(t)throw Error(i(479))}else t=$r(e,n,r,2),t!==null&&mu(t,e,2)}function As(e){var t=e.alternate;return e===J||t!==null&&t===J}function js(e,t){co=so=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ms(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,$e(e,n)}}var Ns={readContext:W,use:Oo,useCallback:ho,useContext:ho,useEffect:ho,useImperativeHandle:ho,useLayoutEffect:ho,useInsertionEffect:ho,useMemo:ho,useReducer:ho,useRef:ho,useState:ho,useDebugValue:ho,useDeferredValue:ho,useTransition:ho,useSyncExternalStore:ho,useId:ho,useHostTransitionStatus:ho,useFormState:ho,useActionState:ho,useOptimistic:ho,useMemoCache:ho,useCacheRefresh:ho};Ns.useEffectEvent=ho;var Ps={readContext:W,use:Oo,useCallback:function(e,t){return wo().memoizedState=[e,t===void 0?null:t],e},useContext:W,useEffect:is,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),ns(4194308,4,us.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ns(4194308,4,e,t)},useInsertionEffect:function(e,t){ns(4,2,e,t)},useMemo:function(e,t){var n=wo();t=t===void 0?null:t;var r=e();if(lo){Le(!0);try{e()}finally{Le(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=wo();if(n!==void 0){var i=n(t);if(lo){Le(!0);try{n(t)}finally{Le(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Es.bind(null,J,e),[r.memoizedState,e]},useRef:function(e){var t=wo();return e={current:e},t.memoizedState=e},useState:function(e){e=Bo(e);var t=e.queue,n=Ds.bind(null,J,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:fs,useDeferredValue:function(e,t){return hs(wo(),e,t)},useTransition:function(){var e=Bo(!1);return e=_s.bind(null,J,e.queue,!0,!1),wo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=J,a=wo();if(U){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Il===null)throw Error(i(349));Z&127||Fo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,is(Lo.bind(null,r,o,e),[e]),r.flags|=2048,es(9,{destroy:void 0},Io.bind(null,r,o,n,t),null),n},useId:function(){var e=wo(),t=Il.identifierPrefix;if(U){var n=Ci,r=Si;n=(r&~(1<<32-Re(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=uo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=mo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ss,useFormState:Yo,useActionState:Yo,useOptimistic:function(e){var t=wo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=ks.bind(null,J,!0,n),n.dispatch=t,[e,t]},useMemoCache:ko,useCacheRefresh:function(){return wo().memoizedState=Ts.bind(null,J)},useEffectEvent:function(e){var t=wo(),n={impl:e};return t.memoizedState=n,function(){if(Y&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Fs={readContext:W,use:Oo,useCallback:ps,useContext:W,useEffect:as,useImperativeHandle:ds,useInsertionEffect:cs,useLayoutEffect:ls,useMemo:ms,useReducer:jo,useRef:ts,useState:function(){return jo(Ao)},useDebugValue:fs,useDeferredValue:function(e,t){return gs(To(),ao.memoizedState,e,t)},useTransition:function(){var e=jo(Ao)[0],t=To().memoizedState;return[typeof e==`boolean`?e:Do(e),t]},useSyncExternalStore:Po,useId:Cs,useHostTransitionStatus:Ss,useFormState:Xo,useActionState:Xo,useOptimistic:function(e,t){return Vo(To(),ao,e,t)},useMemoCache:ko,useCacheRefresh:ws};Fs.useEffectEvent=ss;var Is={readContext:W,use:Oo,useCallback:ps,useContext:W,useEffect:as,useImperativeHandle:ds,useInsertionEffect:cs,useLayoutEffect:ls,useMemo:ms,useReducer:No,useRef:ts,useState:function(){return No(Ao)},useDebugValue:fs,useDeferredValue:function(e,t){var n=To();return ao===null?hs(n,e,t):gs(n,ao.memoizedState,e,t)},useTransition:function(){var e=No(Ao)[0],t=To().memoizedState;return[typeof e==`boolean`?e:Do(e),t]},useSyncExternalStore:Po,useId:Cs,useHostTransitionStatus:Ss,useFormState:$o,useActionState:$o,useOptimistic:function(e,t){var n=To();return ao===null?(n.baseState=e,[e,n.queue.dispatch]):Vo(n,ao,e,t)},useMemoCache:ko,useCacheRefresh:ws};Is.useEffectEvent=ss;function Ls(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Rs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=fu(),i=Fa(r);i.payload=t,n!=null&&(i.callback=n),t=Ia(e,i,r),t!==null&&(mu(t,e,r),La(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=fu(),i=Fa(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ia(e,i,r),t!==null&&(mu(t,e,r),La(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=fu(),r=Fa(n);r.tag=2,t!=null&&(r.callback=t),t=Ia(e,r,n),t!==null&&(mu(t,e,n),La(t,e,n))}};function zs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!br(n,r)||!br(i,a):!0}function Bs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Rs.enqueueReplaceState(t,t.state,null)}function Vs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Hs(e){qr(e)}function Us(e){console.error(e)}function Ws(e){qr(e)}function Gs(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ks(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function qs(e,t,n){return n=Fa(n),n.tag=3,n.payload={element:null},n.callback=function(){Gs(e,t)},n}function Js(e){return e=Fa(e),e.tag=3,e}function Ys(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ks(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ks(t,n,r),typeof i!=`function`&&(nu===null?nu=new Set([this]):nu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Xs(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Ji(t,n,a,!0),n=Ya.current,n!==null){switch(n.tag){case 31:case 13:return Xa===null?Eu():n.alternate===null&&Ul===0&&(Ul=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===_a?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===_a?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Eu(),!1}if(U)return t=Ya.current,t===null?(r!==Ni&&(t=Error(i(423),{cause:r}),Bi(mi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=mi(r,n),a=qs(e.stateNode,r,a),Ra(e,a),Ul!==4&&(Ul=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Ni&&(e=Error(i(422),{cause:r}),Bi(mi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=mi(o,n),Yl===null?Yl=[o]:Yl.push(o),Ul!==4&&(Ul=2),t===null)return!0;r=mi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=qs(n.stateNode,r,e),Ra(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(nu===null||!nu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Js(a),Ys(a,e,n,r),Ra(n,a),!1}n=n.return}while(n!==null);return!1}var Zs=Error(i(461)),Qs=!1;function $s(e,t,n,r){t.child=e===null?ja(t,null,n,r):Aa(t,e.child,n,r)}function ec(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Xi(t),r=_o(e,t,n,o,a,i),s=xo(),e!==null&&!Qs?(So(e,t,i),wc(e,t,i)):(U&&s&&Ei(t),t.flags|=1,$s(e,t,r,i),t.child)}function tc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ai(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,nc(e,t,a,r,i)):(e=ci(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Tc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?br:n,n(o,r)&&e.ref===t.ref)return wc(e,t,i)}return t.flags|=1,e=oi(a,r),e.ref=t.ref,e.return=t,t.child=e}function nc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(br(a,r)&&e.ref===t.ref){if(Qs=!1,t.pendingProps=r=a,Tc(e,i))e.flags&131072&&(Qs=!0);else return t.lanes=e.lanes,wc(e,t,i)}}return uc(e,t,n,r,i)}function rc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return ac(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&fa(t,a===null?null:a.cachePool),a===null?qa():Ka(t,a),$a(t);else return r=t.lanes=536870912,ac(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&fa(t,null),qa(),eo(t)):(fa(t,a.cachePool),Ka(t,a),eo(t),t.memoizedState=null);return $s(e,t,i,n),t.child}function ic(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function ac(e,t,n,r,i){var a=da();return a=a===null?null:{parent:na._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&fa(t,null),qa(),$a(t),e!==null&&Ji(e,t,r,!0),t.childLanes=i,null}function oc(e,t){return t=yc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function sc(e,t,n){return Aa(t,e.child,null,n),e=oc(t,t.pendingProps),e.flags|=2,to(t),t.memoizedState=null,e}function cc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(U){if(r.mode===`hidden`)return e=oc(t,r),t.lanes=536870912,ic(null,e);if(Qa(t),(e=Ai)?(e=rf(e,Mi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:xi===null?null:{id:Si,overflow:Ci},retryLane:536870912,hydrationErrors:null},n=di(e),n.return=t,t.child=n,ki=t,Ai=null)):e=null,e===null)throw Pi(t);return t.lanes=536870912,null}return oc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Qa(t),a){if(t.flags&256)t.flags&=-257,t=sc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Qs||Ji(e,t,n,!1),a=(n&e.childLanes)!==0,Qs||a){if(r=Il,r!==null&&(s=et(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ei(e,s),mu(r,e,s),Zs;Eu(),t=sc(e,t,n)}else e=o.treeContext,Ai=cf(s.nextSibling),ki=t,U=!0,ji=null,Mi=!1,e!==null&&Oi(t,e),t=oc(t,r),t.flags|=4096;return t}return e=oi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function lc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function uc(e,t,n,r,i){return Xi(t),n=_o(e,t,n,r,void 0,i),r=xo(),e!==null&&!Qs?(So(e,t,i),wc(e,t,i)):(U&&r&&Ei(t),t.flags|=1,$s(e,t,n,i),t.child)}function dc(e,t,n,r,i,a){return Xi(t),t.updateQueue=null,n=yo(t,r,n,i),vo(e),r=xo(),e!==null&&!Qs?(So(e,t,a),wc(e,t,a)):(U&&r&&Ei(t),t.flags|=1,$s(e,t,n,a),t.child)}function fc(e,t,n,r,i){if(Xi(t),t.stateNode===null){var a=ri,o=n.contextType;typeof o==`object`&&o&&(a=W(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Rs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Na(t),o=n.contextType,a.context=typeof o==`object`&&o?W(o):ri,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Ls(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Rs.enqueueReplaceState(a,a.state,null),Va(t,r,a,i),Ba(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Vs(n,s);a.props=c;var l=a.context,u=n.contextType;o=ri,typeof u==`object`&&u&&(o=W(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Bs(t,a,r,o),Ma=!1;var f=t.memoizedState;a.state=f,Va(t,r,a,i),Ba(),l=t.memoizedState,s||f!==l||Ma?(typeof d==`function`&&(Ls(t,n,d,r),l=t.memoizedState),(c=Ma||zs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Pa(e,t),o=t.memoizedProps,u=Vs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ri,typeof l==`object`&&l&&(c=W(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Bs(t,a,r,c),Ma=!1,f=t.memoizedState,a.state=f,Va(t,r,a,i),Ba();var p=t.memoizedState;o!==d||f!==p||Ma||e!==null&&e.dependencies!==null&&Yi(e.dependencies)?(typeof s==`function`&&(Ls(t,n,s,r),p=t.memoizedState),(u=Ma||zs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Yi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,lc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Aa(t,e.child,null,i),t.child=Aa(t,null,n,i)):$s(e,t,n,i),t.memoizedState=a.state,e=t.child):e=wc(e,t,i),e}function pc(e,t,n,r){return Ri(),t.flags|=256,$s(e,t,n,r),t.child}var mc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function hc(e){return{baseLanes:e,cachePool:pa()}}function gc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ql),e}function _c(e,t,n){var r=t.pendingProps,a=!1,o=!!(t.flags&128),s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:!!(no.current&2)),s&&(a=!0,t.flags&=-129),s=!!(t.flags&32),t.flags&=-33,e===null){if(U){if(a?Za(t):eo(t),(e=Ai)?(e=rf(e,Mi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:xi===null?null:{id:Si,overflow:Ci},retryLane:536870912,hydrationErrors:null},n=di(e),n.return=t,t.child=n,ki=t,Ai=null)):e=null,e===null)throw Pi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(eo(t),a=t.mode,c=yc({mode:`hidden`,children:c},a),r=li(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=hc(n),r.childLanes=gc(e,s,n),t.memoizedState=mc,ic(null,r)):(Za(t),vc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(Za(t),t.flags&=-257,t=bc(e,t,n)):t.memoizedState===null?(eo(t),c=r.fallback,a=t.mode,r=yc({mode:`visible`,children:r.children},a),c=li(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Aa(t,e.child,null,n),r=t.child,r.memoizedState=hc(n),r.childLanes=gc(e,s,n),t.memoizedState=mc,t=ic(null,r)):(eo(t),t.child=e.child,t.flags|=128,t=null);else if(Za(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Bi({value:r,source:null,stack:null}),t=bc(e,t,n)}else if(Qs||Ji(e,t,n,!1),s=(n&e.childLanes)!==0,Qs||s){if(s=Il,s!==null&&(r=et(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ei(e,r),mu(s,e,r),Zs;af(c)||Eu(),t=bc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,Ai=cf(c.nextSibling),ki=t,U=!0,ji=null,Mi=!1,e!==null&&Oi(t,e),t=vc(t,r.children),t.flags|=4096);return t}return a?(eo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=oi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=li(c,a,n,null),c.flags|=2):c=oi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,ic(null,r),r=t.child,c=e.child.memoizedState,c===null?c=hc(n):(a=c.cachePool,a===null?a=pa():(l=na._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=gc(e,s,n),t.memoizedState=mc,ic(e.child,r)):(Za(t),n=e.child,e=n.sibling,n=oi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function vc(e,t){return t=yc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function yc(e,t){return e=H(22,e,null,t),e.lanes=0,e}function bc(e,t,n){return Aa(t,e.child,null,n),e=vc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function xc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ki(e.return,t,n)}function Sc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Cc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=no.current,s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,I(no,o),$s(e,t,r,n),r=U?vi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&xc(e,n,t);else if(e.tag===19)xc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ro(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Sc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ro(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Sc(t,!0,n,null,a,r);break;case`together`:Sc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function wc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Wl|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(Ji(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=oi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=oi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Tc(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Yi(e)))}function Ec(e,t,n){switch(t.tag){case 3:ue(t,t.stateNode.containerInfo),Wi(t,na,e.memoizedState.cache),Ri();break;case 27:case 5:fe(t);break;case 4:ue(t,t.stateNode.containerInfo);break;case 10:Wi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Qa(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(Za(t),e=wc(e,t,n),e===null?null:e.sibling):_c(e,t,n):(Za(t),t.flags|=128,null);Za(t);break;case 19:var i=!!(e.flags&128);if(r=(n&t.childLanes)!==0,r||=(Ji(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Cc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),I(no,no.current),r)break;return null;case 22:return t.lanes=0,rc(e,t,n,t.pendingProps);case 24:Wi(t,na,e.memoizedState.cache)}return wc(e,t,n)}function Dc(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Qs=!0;else{if(!Tc(e,n)&&!(t.flags&128))return Qs=!1,Ec(e,t,n);Qs=!!(e.flags&131072)}}else Qs=!1,U&&t.flags&1048576&&Ti(t,vi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=ba(t.elementType),t.type=e,typeof e==`function`)ai(e)?(r=Vs(e,r),t.tag=1,t=fc(null,t,e,r,n)):(t.tag=0,t=uc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=ec(null,t,e,r,n);break a}if(a===D){t.tag=14,t=tc(null,t,e,r,n);break a}}throw t=M(e)||e,Error(i(306,t,``))}}return t;case 0:return uc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Vs(r,t.pendingProps),fc(e,t,r,a,n);case 3:a:{if(ue(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Pa(e,t),Va(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Wi(t,na,r),r!==o.cache&&qi(t,[na],n,!0),Ba(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=pc(e,t,r,n);break a}if(r!==a){a=mi(Error(i(424)),t),Bi(a),t=pc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(Ai=cf(e.firstChild),ki=t,U=!0,ji=null,Mi=!0,n=ja(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ri(),r===a){t=wc(e,t,n);break a}$s(e,t,r,n)}t=t.child}return t;case 26:return lc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:U||(n=t.type,e=t.pendingProps,r=Bd(L.current).createElement(n),r[ot]=t,r[st]=e,Pd(r,n,e),yt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return fe(t),e===null&&U&&(r=t.stateNode=ff(t.type,t.pendingProps,L.current),ki=t,Mi=!0,a=Ai,Zd(t.type)?(lf=a,Ai=cf(r.firstChild)):Ai=a),$s(e,t,t.pendingProps.children,n),lc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&U&&((a=r=Ai)&&(r=tf(r,t.type,t.pendingProps,Mi),r===null?a=!1:(t.stateNode=r,ki=t,Ai=cf(r.firstChild),Mi=!1,a=!0)),a||Pi(t)),fe(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=_o(e,t,bo,null,null,n),Qf._currentValue=a),lc(e,t),$s(e,t,r,n),t.child;case 6:return e===null&&U&&((e=n=Ai)&&(n=nf(n,t.pendingProps,Mi),n===null?e=!1:(t.stateNode=n,ki=t,Ai=null,e=!0)),e||Pi(t)),null;case 13:return _c(e,t,n);case 4:return ue(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Aa(t,null,r,n):$s(e,t,r,n),t.child;case 11:return ec(e,t,t.type,t.pendingProps,n);case 7:return $s(e,t,t.pendingProps,n),t.child;case 8:return $s(e,t,t.pendingProps.children,n),t.child;case 12:return $s(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Wi(t,t.type,r.value),$s(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Xi(t),a=W(a),r=r(a),t.flags|=1,$s(e,t,r,n),t.child;case 14:return tc(e,t,t.type,t.pendingProps,n);case 15:return nc(e,t,t.type,t.pendingProps,n);case 19:return Cc(e,t,n);case 31:return cc(e,t,n);case 22:return rc(e,t,n,t.pendingProps);case 24:return Xi(t),r=W(na),e===null?(a=da(),a===null&&(a=Il,o=ra(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Na(t),Wi(t,na,a)):((e.lanes&n)!==0&&(Pa(e,t),Va(t,null,null,n),Ba()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Wi(t,na,r),r!==a.cache&&qi(t,[na],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Wi(t,na,r))),$s(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Oc(e){e.flags|=4}function kc(e,t,n,r,i){if((t=!!(e.mode&32))&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Cu())e.flags|=8192;else throw xa=_a,ha}}else e.flags&=-16777217}function Ac(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t)){if(Cu())e.flags|=8192;else throw xa=_a,ha}}function jc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Je(),e.lanes|=t,Jl|=t)}function Mc(e,t){if(!U)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Nc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Pc(e,t,n){var r=t.pendingProps;switch(Di(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Nc(t),null;case 1:return Nc(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Gi(na),de(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Li(t)?Oc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,zi())),Nc(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Oc(t),o===null?(Nc(t),kc(t,a,null,r,n)):(Nc(t),Ac(t,o))):o?o===e.memoizedState?(Nc(t),t.flags&=-16777217):(Oc(t),Nc(t),Ac(t,o)):(e=e.memoizedProps,e!==r&&Oc(t),Nc(t),kc(t,a,e,r,n)),null;case 27:if(pe(t),n=L.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Oc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Nc(t),null}e=se.current,Li(t)?Fi(t,e):(e=ff(a,r,n),t.stateNode=e,Oc(t))}return Nc(t),null;case 5:if(pe(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Oc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Nc(t),null}if(o=se.current,Li(t))Fi(t,o);else{var s=Bd(L.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[ot]=t,o[st]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Oc(t)}}return Nc(t),kc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Oc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=L.current,Li(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ki,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[ot]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Pi(t,!0)}else e=Bd(e).createTextNode(r),e[ot]=t,t.stateNode=e}return Nc(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Li(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[ot]=t}else Ri(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Nc(t),e=!1}else n=zi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(to(t),t):(to(t),null);if(t.flags&128)throw Error(i(558))}return Nc(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Li(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[ot]=t}else Ri(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Nc(t),a=!1}else a=zi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(to(t),t):(to(t),null)}return to(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),jc(t,t.updateQueue),Nc(t),null);case 4:return de(),e===null&&Sd(t.stateNode.containerInfo),Nc(t),null;case 10:return Gi(t.type),Nc(t),null;case 19:if(oe(no),r=t.memoizedState,r===null)return Nc(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)Mc(r,!1);else{if(Ul!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=ro(e),o!==null){for(t.flags|=128,Mc(r,!1),e=o.updateQueue,t.updateQueue=e,jc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)si(n,e),n=n.sibling;return I(no,no.current&1|2),U&&wi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ee()>eu&&(t.flags|=128,a=!0,Mc(r,!1),t.lanes=4194304)}}else{if(!a){if(e=ro(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,jc(t,e),Mc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!U)return Nc(t),null}else 2*Ee()-r.renderingStartTime>eu&&n!==536870912&&(t.flags|=128,a=!0,Mc(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Nc(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ee(),e.sibling=null,n=no.current,I(no,a?n&1|2:n&1),U&&wi(t,r.treeForkCount),e);case 22:case 23:return to(t),Ja(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Nc(t),t.subtreeFlags&6&&(t.flags|=8192)):Nc(t),n=t.updateQueue,n!==null&&jc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&oe(ua),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Gi(na),Nc(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Fc(e,t){switch(Di(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Gi(na),de(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return pe(t),null;case 31:if(t.memoizedState!==null){if(to(t),t.alternate===null)throw Error(i(340));Ri()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(to(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Ri()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return oe(no),null;case 4:return de(),null;case 10:return Gi(t.type),null;case 22:case 23:return to(t),Ja(),e!==null&&oe(ua),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Gi(na),null;case 25:return null;default:return null}}function Ic(e,t){switch(Di(t),t.tag){case 3:Gi(na),de();break;case 26:case 27:case 5:pe(t);break;case 4:de();break;case 31:t.memoizedState!==null&&to(t);break;case 13:to(t);break;case 19:oe(no);break;case 10:Gi(t.type);break;case 22:case 23:to(t),Ja(),e!==null&&oe(ua);break;case 24:Gi(na)}}function Lc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Wu(t,t.return,e)}}function Rc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Wu(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Wu(t,t.return,e)}}function zc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ua(t,n)}catch(t){Wu(e,e.return,t)}}}function Bc(e,t,n){n.props=Vs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Wu(e,t,n)}}function Vc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Wu(e,t,n)}}function Hc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Wu(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Wu(e,t,n)}else n.current=null}}function Uc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Wu(e,e.return,t)}}function Wc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[st]=t}catch(t){Wu(e,e.return,t)}}function Gc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Kc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Gc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function qc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=$t));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(qc(e,t,n),e=e.sibling;e!==null;)qc(e,t,n),e=e.sibling}function Jc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Jc(e,t,n),e=e.sibling;e!==null;)Jc(e,t,n),e=e.sibling}function Yc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[ot]=e,t[st]=n}catch(t){Wu(e,e.return,t)}}var Xc=!1,Zc=!1,Qc=!1,$c=typeof WeakSet==`function`?WeakSet:Set,el=null;function tl(e,t){if(e=e.containerInfo,Rd=sp,e=wr(e),Tr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,el=t;el!==null;)if(t=el,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,el=e;else for(;el!==null;){switch(t=el,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Vs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Wu(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,el=e;break}el=t.return}}function nl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:_l(e,n),r&4&&Lc(5,n);break;case 1:if(_l(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Wu(n,n.return,e)}else{var i=Vs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Wu(n,n.return,e)}}}r&64&&zc(n),r&512&&Vc(n,n.return);break;case 3:if(_l(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ua(e,t)}catch(e){Wu(n,n.return,e)}}break;case 27:t===null&&r&4&&Yc(n);case 26:case 5:_l(e,n),t===null&&r&4&&Uc(n),r&512&&Vc(n,n.return);break;case 12:_l(e,n);break;case 31:_l(e,n),r&4&&cl(e,n);break;case 13:_l(e,n),r&4&&ll(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||Xc,!r){t=t!==null&&t.memoizedState!==null||Zc,i=Xc;var a=Zc;Xc=r,(Zc=t)&&!a?yl(e,n,!!(n.subtreeFlags&8772)):_l(e,n),Xc=i,Zc=a}break;case 30:break;default:_l(e,n)}}function rl(e){var t=e.alternate;t!==null&&(e.alternate=null,rl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&mt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var il=null,al=!1;function ol(e,t,n){for(n=n.child;n!==null;)sl(e,t,n),n=n.sibling}function sl(e,t,n){if(Ie&&typeof Ie.onCommitFiberUnmount==`function`)try{Ie.onCommitFiberUnmount(Fe,n)}catch{}switch(n.tag){case 26:Zc||Hc(n,t),ol(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Zc||Hc(n,t);var r=il,i=al;Zd(n.type)&&(il=n.stateNode,al=!1),ol(e,t,n),pf(n.stateNode),il=r,al=i;break;case 5:Zc||Hc(n,t);case 6:if(r=il,i=al,il=null,ol(e,t,n),il=r,al=i,il!==null){if(al)try{(il.nodeType===9?il.body:il.nodeName===`HTML`?il.ownerDocument.body:il).removeChild(n.stateNode)}catch(e){Wu(n,t,e)}else try{il.removeChild(n.stateNode)}catch(e){Wu(n,t,e)}}break;case 18:il!==null&&(al?(e=il,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(il,n.stateNode));break;case 4:r=il,i=al,il=n.stateNode.containerInfo,al=!0,ol(e,t,n),il=r,al=i;break;case 0:case 11:case 14:case 15:Rc(2,n,t),Zc||Rc(4,n,t),ol(e,t,n);break;case 1:Zc||(Hc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Bc(n,t,r)),ol(e,t,n);break;case 21:ol(e,t,n);break;case 22:Zc=(r=Zc)||n.memoizedState!==null,ol(e,t,n),Zc=r;break;default:ol(e,t,n)}}function cl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Wu(t,t.return,e)}}}function ll(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Wu(t,t.return,e)}}function ul(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new $c),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new $c),t;default:throw Error(i(435,e.tag))}}function dl(e,t){var n=ul(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function fl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){il=c.stateNode,al=!1;break a}break;case 5:il=c.stateNode,al=!1;break a;case 3:case 4:il=c.stateNode.containerInfo,al=!0;break a}c=c.return}if(il===null)throw Error(i(160));sl(o,s,a),il=null,al=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ml(t,e),t=t.sibling}var pl=null;function ml(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:fl(t,e),hl(e),r&4&&(Rc(3,e,e.return),Lc(3,e),Rc(5,e,e.return));break;case 1:fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),r&64&&Xc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=pl;if(fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null){if(r===null){if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[pt]||o[ot]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[ot]=e,yt(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[ot]=e,yt(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode)}else e.stateNode=If(a,r,e.memoizedProps)}else o===r?r===null&&e.stateNode!==null&&Wc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),n!==null&&r&4&&Wc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),e.flags&32){a=e.stateNode;try{Gt(a,``)}catch(t){Wu(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Wc(e,a,n===null?a:n.memoizedProps)),r&1024&&(Qc=!0);break;case 6:if(fl(t,e),hl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Wu(e,e.return,t)}}break;case 3:if(Bf=null,a=pl,pl=gf(t.containerInfo),fl(t,e),pl=a,hl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Wu(e,e.return,t)}Qc&&(Qc=!1,gl(e));break;case 4:r=pl,pl=gf(e.stateNode.containerInfo),fl(t,e),hl(e),pl=r;break;case 12:fl(t,e),hl(e);break;case 31:fl(t,e),hl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 13:fl(t,e),hl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Ql=Ee()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Xc,d=Zc;if(Xc=u||a,Zc=d||l,fl(t,e),Zc=d,Xc=u,hl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Xc||Zc||vl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Wu(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Wu(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Wu(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,dl(e,n))));break;case 19:fl(t,e),hl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 30:break;case 21:break;default:fl(t,e),hl(e)}}function hl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Gc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Jc(e,Kc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Gt(o,``),n.flags&=-33),Jc(e,Kc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;qc(e,Kc(e),s);break;default:throw Error(i(161))}}catch(t){Wu(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;gl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function _l(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)nl(e,t.alternate,t),t=t.sibling}function vl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Rc(4,t,t.return),vl(t);break;case 1:Hc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Bc(t,t.return,n),vl(t);break;case 27:pf(t.stateNode);case 26:case 5:Hc(t,t.return),vl(t);break;case 22:t.memoizedState===null&&vl(t);break;case 30:vl(t);break;default:vl(t)}e=e.sibling}}function yl(e,t,n){for(n&&=!!(t.subtreeFlags&8772),t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:yl(i,a,n),Lc(4,a);break;case 1:if(yl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Wu(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Ha(c[i],s)}catch(e){Wu(r,r.return,e)}}n&&o&64&&zc(a),Vc(a,a.return);break;case 27:Yc(a);case 26:case 5:yl(i,a,n),n&&r===null&&o&4&&Uc(a),Vc(a,a.return);break;case 12:yl(i,a,n);break;case 31:yl(i,a,n),n&&o&4&&cl(i,a);break;case 13:yl(i,a,n),n&&o&4&&ll(i,a);break;case 22:a.memoizedState===null&&yl(i,a,n),Vc(a,a.return);break;case 30:break;default:yl(i,a,n)}t=t.sibling}}function bl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ia(n))}function xl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ia(e))}function Sl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Cl(e,t,n,r),t=t.sibling}function Cl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Sl(e,t,n,r),i&2048&&Lc(9,t);break;case 1:Sl(e,t,n,r);break;case 3:Sl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ia(e)));break;case 12:if(i&2048){Sl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Wu(t,t.return,e)}}else Sl(e,t,n,r);break;case 31:Sl(e,t,n,r);break;case 13:Sl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Sl(e,t,n,r):(a._visibility|=2,wl(e,t,n,r,!!(t.subtreeFlags&10256)||!1)):a._visibility&2?Sl(e,t,n,r):Tl(e,t),i&2048&&bl(o,t);break;case 24:Sl(e,t,n,r),i&2048&&xl(t.alternate,t);break;default:Sl(e,t,n,r)}}function wl(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:wl(a,o,s,c,i),Lc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,wl(a,o,s,c,i)):u._visibility&2?wl(a,o,s,c,i):Tl(a,o),i&&l&2048&&bl(o.alternate,o);break;case 24:wl(a,o,s,c,i),i&&l&2048&&xl(o.alternate,o);break;default:wl(a,o,s,c,i)}t=t.sibling}}function Tl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Tl(n,r),i&2048&&bl(r.alternate,r);break;case 24:Tl(n,r),i&2048&&xl(r.alternate,r);break;default:Tl(n,r)}t=t.sibling}}var El=8192;function Dl(e,t,n){if(e.subtreeFlags&El)for(e=e.child;e!==null;)Ol(e,t,n),e=e.sibling}function Ol(e,t,n){switch(e.tag){case 26:Dl(e,t,n),e.flags&El&&e.memoizedState!==null&&Gf(n,pl,e.memoizedState,e.memoizedProps);break;case 5:Dl(e,t,n);break;case 3:case 4:var r=pl;pl=gf(e.stateNode.containerInfo),Dl(e,t,n),pl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=El,El=16777216,Dl(e,t,n),El=r):Dl(e,t,n));break;default:Dl(e,t,n)}}function kl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Al(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];el=r,Nl(r,e)}kl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)jl(e),e=e.sibling}function jl(e){switch(e.tag){case 0:case 11:case 15:Al(e),e.flags&2048&&Rc(9,e,e.return);break;case 3:Al(e);break;case 12:Al(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ml(e)):Al(e);break;default:Al(e)}}function Ml(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];el=r,Nl(r,e)}kl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Rc(8,t,t.return),Ml(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ml(t));break;default:Ml(t)}e=e.sibling}}function Nl(e,t){for(;el!==null;){var n=el;switch(n.tag){case 0:case 11:case 15:Rc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ia(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,el=r;else a:for(n=e;el!==null;){r=el;var i=r.sibling,a=r.return;if(rl(r),r===n){el=null;break a}if(i!==null){i.return=a,el=i;break a}el=a}}}var Pl={getCacheForType:function(e){var t=W(na),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return W(na).controller.signal}},Fl=typeof WeakMap==`function`?WeakMap:Map,Y=0,Il=null,X=null,Z=0,Ll=0,Rl=null,zl=!1,Bl=!1,Vl=!1,Hl=0,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=null,Xl=null,Zl=!1,Ql=0,$l=0,eu=1/0,tu=null,nu=null,ru=0,iu=null,au=null,ou=0,su=0,cu=null,lu=null,uu=0,du=null;function fu(){return Y&2&&Z!==0?Z&-Z:P.T===null?rt():dd()}function pu(){if(ql===0){if(!(Z&536870912)||U){var e=He;He<<=1,!(He&3932160)&&(He=262144),ql=e}else ql=536870912}return e=Ya.current,e!==null&&(e.flags|=32),ql}function mu(e,t,n){(e===Il&&(Ll===2||Ll===9)||e.cancelPendingCommit!==null)&&(xu(e,0),vu(e,Z,ql,!1)),Xe(e,n),(!(Y&2)||e!==Il)&&(e===Il&&(!(Y&2)&&(Gl|=n),Ul===4&&vu(e,Z,ql,!1)),rd(e))}function hu(e,t,n){if(Y&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||Ke(e,t),a=r?ku(e,t):Du(e,t,!0),o=r;do{if(a===0){Bl&&!r&&vu(e,t,0,!1);break}if(n=e.current.alternate,o&&!_u(n)){a=Du(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Yl;var l=c.current.memoizedState.isDehydrated;if(l&&(xu(c,s).flags|=256),s=Du(c,s,!1),s!==2){if(Vl&&!l){c.errorRecoveryDisabledLanes|=o,Gl|=o,a=4;break a}o=Xl,Xl=a,o!==null&&(Xl===null?Xl=o:Xl.push.apply(Xl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){xu(e,0),vu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:vu(r,t,ql,!zl);break a;case 2:Xl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=Ql+300-Ee(),10<a)){if(vu(r,t,ql,!zl),Ge(r,0,!0)!==0)break a;ou=t,r.timeoutHandle=Kd(gu.bind(null,r,n,Xl,tu,Zl,t,ql,Gl,Jl,zl,o,`Throttled`,-0,0),a);break a}gu(r,n,Xl,tu,Zl,t,ql,Gl,Jl,zl,o,null,-0,0)}break}while(1);rd(e)}function gu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:$t},Ol(t,a,d);var m=(a&62914560)===a?Ql-Ee():(a&4194048)===a?$l-Ee():0;if(m=qf(d,m),m!==null){ou=a,e.cancelPendingCommit=m(Iu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),vu(e,a,o,!l);return}}Iu(e,t,a,n,r,i,o,s,c)}function _u(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!yr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function vu(e,t,n,r){t&=~Kl,t&=~Gl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Re(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&Qe(e,n,t)}function yu(){return Y&6?!0:(id(0,!1),!1)}function bu(){if(X!==null){if(Ll===0)var e=X.return;else e=X,Ui=Hi=null,Co(e),wa=null,Ta=0,e=X;for(;e!==null;)Ic(e.alternate,e),e=e.return;X=null}}function xu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),ou=0,bu(),Il=e,X=n=oi(e.current,null),Z=t,Ll=0,Rl=null,zl=!1,Bl=Ke(e,t),Vl=!1,Jl=ql=Kl=Gl=Wl=Ul=0,Xl=Yl=null,Zl=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Re(r),a=1<<i;t|=e[i],r&=~a}return Hl=t,Zr(),n}function Su(e,t){J=null,P.H=Ns,t===ma||t===ga?(t=Sa(),Ll=3):t===ha?(t=Sa(),Ll=4):Ll=t===Zs?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Rl=t,X===null&&(Ul=1,Gs(e,mi(t,e.current)))}function Cu(){var e=Ya.current;return e===null?!0:(Z&4194048)===Z?Xa===null:(Z&62914560)===Z||Z&536870912?e===Xa:!1}function wu(){var e=P.H;return P.H=Ns,e===null?Ns:e}function Tu(){var e=P.A;return P.A=Pl,e}function Eu(){Ul=4,zl||(Z&4194048)!==Z&&Ya.current!==null||(Bl=!0),!(Wl&134217727)&&!(Gl&134217727)||Il===null||vu(Il,Z,ql,!1)}function Du(e,t,n){var r=Y;Y|=2;var i=wu(),a=Tu();(Il!==e||Z!==t)&&(tu=null,xu(e,t)),t=!1;var o=Ul;a:do try{if(Ll!==0&&X!==null){var s=X,c=Rl;switch(Ll){case 8:bu(),o=6;break a;case 3:case 2:case 9:case 6:Ya.current===null&&(t=!0);var l=Ll;if(Ll=0,Rl=null,Nu(e,s,c,l),n&&Bl){o=0;break a}break;default:l=Ll,Ll=0,Rl=null,Nu(e,s,c,l)}}Ou(),o=Ul;break}catch(t){Su(e,t)}while(1);return t&&e.shellSuspendCounter++,Ui=Hi=null,Y=r,P.H=i,P.A=a,X===null&&(Il=null,Z=0,Zr()),o}function Ou(){for(;X!==null;)ju(X)}function ku(e,t){var n=Y;Y|=2;var r=wu(),a=Tu();Il!==e||Z!==t?(tu=null,eu=Ee()+500,xu(e,t)):Bl=Ke(e,t);a:do try{if(Ll!==0&&X!==null){t=X;var o=Rl;b:switch(Ll){case 1:Ll=0,Rl=null,Nu(e,t,o,1);break;case 2:case 9:if(va(o)){Ll=0,Rl=null,Mu(t);break}t=function(){Ll!==2&&Ll!==9||Il!==e||(Ll=7),rd(e)},o.then(t,t);break a;case 3:Ll=7;break a;case 4:Ll=5;break a;case 7:va(o)?(Ll=0,Rl=null,Mu(t)):(Ll=0,Rl=null,Nu(e,t,o,7));break;case 5:var s=null;switch(X.tag){case 26:s=X.memoizedState;case 5:case 27:var c=X;if(s?Wf(s):c.stateNode.complete){Ll=0,Rl=null;var l=c.sibling;if(l!==null)X=l;else{var u=c.return;u===null?X=null:(X=u,Pu(u))}break b}}Ll=0,Rl=null,Nu(e,t,o,5);break;case 6:Ll=0,Rl=null,Nu(e,t,o,6);break;case 8:bu(),Ul=6;break a;default:throw Error(i(462))}}Au();break}catch(t){Su(e,t)}while(1);return Ui=Hi=null,P.H=r,P.A=a,Y=n,X===null?(Il=null,Z=0,Zr(),Ul):0}function Au(){for(;X!==null&&!we();)ju(X)}function ju(e){var t=Dc(e.alternate,e,Hl);e.memoizedProps=e.pendingProps,t===null?Pu(e):X=t}function Mu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=dc(n,t,t.pendingProps,t.type,void 0,Z);break;case 11:t=dc(n,t,t.pendingProps,t.type.render,t.ref,Z);break;case 5:Co(t);default:Ic(n,t),t=X=si(t,Hl),t=Dc(n,t,Hl)}e.memoizedProps=e.pendingProps,t===null?Pu(e):X=t}function Nu(e,t,n,r){Ui=Hi=null,Co(t),wa=null,Ta=0;var i=t.return;try{if(Xs(e,i,t,n,Z)){Ul=1,Gs(e,mi(n,e.current)),X=null;return}}catch(t){if(i!==null)throw X=i,t;Ul=1,Gs(e,mi(n,e.current)),X=null;return}t.flags&32768?(U||r===1?e=!0:Bl||Z&536870912?e=!1:(zl=e=!0,(r===2||r===9||r===3||r===6)&&(r=Ya.current,r!==null&&r.tag===13&&(r.flags|=16384))),Fu(t,e)):Pu(t)}function Pu(e){var t=e;do{if(t.flags&32768){Fu(t,zl);return}e=t.return;var n=Pc(t.alternate,t,Hl);if(n!==null){X=n;return}if(t=t.sibling,t!==null){X=t;return}X=t=e}while(t!==null);Ul===0&&(Ul=5)}function Fu(e,t){do{var n=Fc(e.alternate,e);if(n!==null){n.flags&=32767,X=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){X=e;return}X=e=n}while(e!==null);Ul=6,X=null}function Iu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Vu();while(ru!==0);if(Y&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Xr,Ze(e,n,o,s,c,l),e===Il&&(X=Il=null,Z=0),au=t,iu=e,ou=n,su=o,cu=a,lu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Ae,function(){return Hu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=P.T,P.T=null,a=F.p,F.p=2,s=Y,Y|=4;try{tl(e,t,n)}finally{Y=s,F.p=a,P.T=r}}ru=1,Lu(),Ru(),zu()}}function Lu(){if(ru===1){ru=0;var e=iu,t=au,n=!!(t.flags&13878);if(t.subtreeFlags&13878||n){n=P.T,P.T=null;var r=F.p;F.p=2;var i=Y;Y|=4;try{ml(t,e);var a=zd,o=wr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Cr(s.ownerDocument.documentElement,s)){if(c!==null&&Tr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Sr(s,h),v=Sr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{Y=i,F.p=r,P.T=n}}e.current=t,ru=2}}function Ru(){if(ru===2){ru=0;var e=iu,t=au,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=P.T,P.T=null;var r=F.p;F.p=2;var i=Y;Y|=4;try{nl(e,t.alternate,t)}finally{Y=i,F.p=r,P.T=n}}ru=3}}function zu(){if(ru===4||ru===3){ru=0,Te();var e=iu,t=au,n=ou,r=lu;t.subtreeFlags&10256||t.flags&10256?ru=5:(ru=0,au=iu=null,Bu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(nu=null),nt(n),t=t.stateNode,Ie&&typeof Ie.onCommitFiberRoot==`function`)try{Ie.onCommitFiberRoot(Fe,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=P.T,i=F.p,F.p=2,P.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{P.T=t,F.p=i}}ou&3&&Vu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===du?uu++:(uu=0,du=e):uu=0,id(0,!1)}}function Bu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ia(t)))}function Vu(){return Lu(),Ru(),zu(),Hu()}function Hu(){if(ru!==5)return!1;var e=iu,t=su;su=0;var n=nt(ou),r=P.T,a=F.p;try{F.p=32>n?32:n,P.T=null,n=cu,cu=null;var o=iu,s=ou;if(ru=0,au=iu=null,ou=0,Y&6)throw Error(i(331));var c=Y;if(Y|=4,jl(o.current),Cl(o,o.current,s,n),Y=c,id(0,!1),Ie&&typeof Ie.onPostCommitFiberRoot==`function`)try{Ie.onPostCommitFiberRoot(Fe,o)}catch{}return!0}finally{F.p=a,P.T=r,Bu(e,t)}}function Uu(e,t,n){t=mi(n,t),t=qs(e.stateNode,t,2),e=Ia(e,t,2),e!==null&&(Xe(e,2),rd(e))}function Wu(e,t,n){if(e.tag===3)Uu(e,e,n);else for(;t!==null;){if(t.tag===3){Uu(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(nu===null||!nu.has(r))){e=mi(n,e),n=Js(2),r=Ia(t,n,2),r!==null&&(Ys(n,r,t,e),Xe(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Fl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Vl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Il===e&&(Z&n)===n&&(Ul===4||Ul===3&&(Z&62914560)===Z&&300>Ee()-Ql?!(Y&2)&&xu(e,0):Kl|=n,Jl===Z&&(Jl=0)),rd(e)}function qu(e,t){t===0&&(t=Je()),e=ei(e,t),e!==null&&(Xe(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return Se(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Re(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=Z,a=Ge(r,r===Il?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Ke(r,a)||(n=!0,ld(r,a))}r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Ee(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}ru!==0&&ru!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Re(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=qe(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Il,n=Z,n=Ge(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Ll===2||Ll===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Ce(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Ke(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Ce(r),nt(n)){case 2:case 8:n=ke;break;case 32:n=Ae;break;case 268435456:n=Me;break;default:n=Ae}return r=cd.bind(null,e),n=Se(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Ce(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(ru!==0&&ru!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Vu()&&e.callbackNode!==n)return null;var r=Z;return r=Ge(e,e===Il?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(hu(e,r,t),sd(e,Ee()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Vu())return null;hu(e,t,!0)}function ud(){Yd(function(){Y&6?Se(Oe,ad):od()})}function dd(){if(nd===0){var e=G;e===0&&(e=Ve,Ve<<=1,!(Ve&261888)&&(Ve=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:Qt(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[st]||null).action),o=r.submitter;o&&(t=(t=o[st]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new xn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);ys(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),ys(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<Gr.length;hd++){var gd=Gr[hd];Kr(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}Kr(Lr,`onAnimationEnd`),Kr(Rr,`onAnimationIteration`),Kr(zr,`onAnimationStart`),Kr(`dblclick`,`onDoubleClick`),Kr(`focusin`,`onFocus`),Kr(`focusout`,`onBlur`),Kr(Br,`onTransitionRun`),Kr(Vr,`onTransitionStart`),Kr(Hr,`onTransitionCancel`),Kr(Ur,`onTransitionEnd`),Ct(`onMouseEnter`,[`mouseout`,`mouseover`]),Ct(`onMouseLeave`,[`mouseout`,`mouseover`]),Ct(`onPointerEnter`,[`pointerout`,`pointerover`]),Ct(`onPointerLeave`,[`pointerout`,`pointerover`]),St(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),St(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),St(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),St(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),St(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),St(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){qr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){qr(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[lt];n===void 0&&(n=t[lt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,bt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!un||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=ht(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}sn(function(){var r=a,i=tn(n),s=[];a:{var c=Wr.get(e);if(c!==void 0){var l=xn,u=e;switch(e){case`keypress`:if(gn(n)===0)break a;case`keydown`:case`keyup`:l=Rn;break;case`focusin`:u=`focus`,l=An;break;case`focusout`:u=`blur`,l=An;break;case`beforeblur`:case`afterblur`:l=An;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=On;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=kn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=B;break;case Lr:case Rr:case zr:l=jn;break;case Ur:l=Bn;break;case`scroll`:case`scrollend`:l=Cn;break;case`wheel`:l=Vn;break;case`copy`:case`cut`:case`paste`:l=Mn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=zn;break;case`toggle`:case`beforetoggle`:l=Hn}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=cn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==en&&(u=n.relatedTarget||n.fromElement)&&(ht(u)||u[ct]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?ht(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=On,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=zn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:_t(l),h=u==null?c:_t(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,ht(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?_t(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=sr;else if(tr(c)){if(cr)v=_r;else{v=hr;var y=mr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Yt(r.elementType)&&(v=sr):v=gr;if(v&&=v(e,r)){nr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Vt(c,`number`,c.value)}switch(y=r?_t(r):window,e){case`focusin`:(tr(y)||y.contentEditable===`true`)&&(Dr=y,Or=r,kr=null);break;case`focusout`:kr=Or=Dr=null;break;case`mousedown`:Ar=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Ar=!1,jr(s,n,i);break;case`selectionchange`:if(Er)break;case`keydown`:case`keyup`:jr(s,n,i)}var b;if(Wn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else Zn?V(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(qn&&n.locale!==`ko`&&(Zn||x!==`onCompositionStart`?x===`onCompositionEnd`&&Zn&&(b=hn()):(fn=i,pn=`value`in fn?fn.value:fn.textContent,Zn=!0)),y=Ed(r,x),0<y.length&&(x=new Nn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=Xn(n),b!==null&&(x.data=b)))),(b=Kn?Qn(e,n):$n(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Nn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=cn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=cn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=cn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=cn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Gt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Gt(e,``+r);break;case`className`:kt(e,`class`,r);break;case`tabIndex`:kt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:kt(e,n,r);break;case`style`:Jt(e,r,o);break;case`data`:if(t!==`object`){kt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Qt(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Qt(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=$t);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=Qt(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Ot(e,`popover`,r);break;case`xlinkActuate`:At(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:At(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:At(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:At(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:At(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:At(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:At(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:At(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:At(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Ot(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=Xt.get(n)||n,Ot(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Jt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Gt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Gt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=$t);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!xt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[st]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Ot(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Bt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Ht(e,!!r,n,!0):Ht(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}Wt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(Yt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}zt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Ht(e,!!n,n?[]:``,!1):Ht(e,!!n,t,!0)):Ht(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Ut(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(Yt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e!==Wd&&(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[pt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body)}n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),mt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[pt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);mt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=F.d;F.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=yu();return e||t}function yf(e){var t=gt(e);t!==null&&t.tag===5&&t.type===`form`?xs(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Rt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),yt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Rt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Rt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Rt(n.imageSizes)+`"]`)):i+=`[href="`+Rt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),yt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Rt(r)+`"][href="`+Rt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),yt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=vt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);yt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=vt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),yt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=vt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),yt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=L.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=vt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=vt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=vt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Rt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),yt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Rt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Rt(n.href)+`"]`);if(r)return t.instance=r,yt(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),yt(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,yt(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),yt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,yt(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),yt(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[pt]||a[ot]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,yt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),yt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:ne,_currentValue2:ne,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ye(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ye(0),this.hiddenUpdates=Ye(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=H(3,null,null,t),e.current=a,a.stateNode=e,t=ra(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Na(a),e}function tp(e){return e?(e=ri,e):ri}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Fa(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ia(e,r,t),n!==null&&(mu(n,e,t),La(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ei(e,67108864);t!==null&&mu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=fu();t=tt(t);var n=ei(e,t);n!==null&&mu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=P.T;P.T=null;var a=F.p;try{F.p=2,up(e,t,n,r)}finally{F.p=a,P.T=i}}function lp(e,t,n,r){var i=P.T;P.T=null;var a=F.p;try{F.p=8,up(e,t,n,r)}finally{F.p=a,P.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=gt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=We(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Re(o);s.entanglements[1]|=c,o&=~c}rd(a),!(Y&6)&&(eu=Ee()+500,id(0,!1))}}break;case 31:case 13:s=ei(a,2),s!==null&&mu(s,a,2),yu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=tn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=ht(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(De()){case Oe:return 2;case ke:return 8;case Ae:case je:return 32;case Me:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=gt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=ht(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,it(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,it(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);en=r,n.target.dispatchEvent(r),en=null}else return t=gt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=gt(n);a!==null&&(e.splice(t,3),t-=3,ys(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[st]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[st]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,fu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),yu(),t[ct]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=rt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.8`)throw Error(i(527,Lp,`19.2.8`));F.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.8`,rendererPackageName:`react-dom`,currentDispatcherRef:P,reconcilerVersion:`19.2.8`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Fe=zp.inject(Rp),Ie=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Hs,s=Us,c=Ws;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[ct]=t.current,Sd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=`-ms-`,v=`-moz-`,y=`-webkit-`,b=`comm`,x=`rule`,S=`decl`,C=`@import`,w=`@namespace`,T=`@keyframes`,E=`@layer`,D=Math.abs,O=String.fromCharCode,k=Object.assign;function A(e,t){return N(e,0)^45?(((t<<2^N(e,0))<<2^N(e,1))<<2^N(e,2))<<2^N(e,3):0}function ee(e){return e.trim()}function te(e,t){return(e=t.exec(e))?e[0]:e}function j(e,t,n){return e.replace(t,n)}function M(e,t,n){return e.indexOf(t,n)}function N(e,t){return e.charCodeAt(t)|0}function P(e,t,n){return e.slice(t,n)}function F(e){return e.length}function ne(e){return e.length}function re(e,t){return t.push(e),e}function ie(e,t){return e.map(t).join(``)}function ae(e,t){return e.filter(function(e){return!te(e,t)})}var oe=1,I=1,se=0,ce=0,L=0,le=``;function ue(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:oe,column:I,length:o,return:``,siblings:s}}function de(e,t){return k(ue(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function fe(e){for(;e.root;)e=de(e.root,{children:[e]});re(e,e.siblings)}function pe(){return L}function me(){return L=ce>0?N(le,--ce):0,I--,L===10&&(I=1,oe--),L}function he(){return L=ce<se?N(le,ce++):0,I++,L===10&&(I=1,oe++),L}function ge(){return N(le,ce)}function _e(){return ce}function ve(e,t){return P(le,e,t)}function ye(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function be(e){return oe=I=1,se=F(le=e),ce=0,[]}function xe(e){return le=``,e}function Se(e){return ee(ve(ce-1,Te(e===91?e+2:e===40?e+1:e)))}function Ce(e){for(;(L=ge())&&L<33;)he();return ye(e)>2||ye(L)>3?``:` `}function we(e,t){for(;--t&&he()&&!(L<48||L>102||L>57&&L<65||L>70&&L<97););return ve(e,_e()+(t<6&&ge()==32&&he()==32))}function Te(e){for(;he();)switch(L){case e:return ce;case 34:case 39:e!==34&&e!==39&&Te(L);break;case 40:e===41&&Te(e);break;case 92:he();break}return ce}function Ee(e,t){for(;he()&&e+L!==57&&(e+L!==84||ge()!==47););return`/*`+ve(t,ce-1)+`*`+O(e===47?e:he())}function De(e){for(;!ye(ge());)he();return ve(e,ce)}function Oe(e){return xe(ke(``,null,null,null,[``],e=be(e),0,[0],e))}function ke(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=he()){case 40:if(m!=108&&N(C,d-1)==58){M(C+=j(Se(v),`&`,`&\f`),`&\f`,D(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=Se(v);break;case 9:case 10:case 13:case 32:C+=Ce(m);break;case 92:C+=we(_e()-1,7);continue;case 47:switch(ge()){case 42:case 47:re(je(Ee(he(),_e()),t,n,c),c),(ye(m||1)==5||ye(ge()||1)==5)&&F(C)&&P(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=F(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=j(C,/\f/g,``)),p>0&&(F(C)-d||h===0&&m===47)&&re(p>32?Me(C+`;`,r,n,d-1,c):Me(j(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(re(S=Ae(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)ke(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(N(C,3)===110)break;case 108:if(N(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?ke(e,S,S,r&&re(Ae(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):ke(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+F(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&me()==125)continue}switch(C+=O(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(F(C)-1)*_,_=1;break;case 64:ge()===45&&(C+=Se(he())),f=ge(),u=d=F(y=C+=De(_e())),v++;break;case 45:m===45&&F(C)==2&&(h=0)}}return a}function Ae(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=ne(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=P(e,f+1,f=D(g=o[h])),b=e;v<m;++v)(b=ee(g>0?p[v]+` `+y:j(y,/&\f/g,p[v])))&&(c[_++]=b);return ue(e,t,n,i===0?x:s,c,l,u,d)}function je(e,t,n,r){return ue(e,t,n,b,O(pe()),P(e,2,-2),0,r)}function Me(e,t,n,r,i){return ue(e,t,n,S,P(e,0,r),P(e,r+1,-1),r,i)}function Ne(e,t,n){switch(A(e,t)){case 5103:return y+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return y+e+e;case 4855:return y+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return v+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return y+e+v+e+_+e+e;case 5936:switch(N(e,t+11)){case 114:return y+e+_+j(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return y+e+_+j(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return y+e+_+j(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return y+e+_+e+e;case 6165:return y+e+_+`flex-`+e+e;case 5187:return y+e+j(e,/(\w+).+(:[^]+)/,y+`box-$1$2`+_+`flex-$1$2`)+e;case 5443:return y+e+_+`flex-item-`+j(e,/flex-|-self/g,``)+(te(e,/flex-|baseline/)?``:_+`grid-row-`+j(e,/flex-|-self/g,``))+e;case 4675:return y+e+_+`flex-line-pack`+j(e,/align-content|flex-|-self/g,``)+e;case 5548:return y+e+_+j(e,`shrink`,`negative`)+e;case 5292:return y+e+_+j(e,`basis`,`preferred-size`)+e;case 6060:return y+`box-`+j(e,`-grow`,``)+y+e+_+j(e,`grow`,`positive`)+e;case 4554:return y+j(e,/([^-])(transform)/g,`$1`+y+`$2`)+e;case 6187:return j(j(j(e,/(zoom-|grab)/,y+`$1`),/(image-set)/,y+`$1`),e,``)+e;case 5495:case 3959:return j(e,/(image-set\([^]*)/,y+"$1$`$1");case 4968:return j(j(e,/(.+:)(flex-)?(.*)/,y+`box-pack:$3`+_+`flex-pack:$3`),/space-between/,`justify`)+y+e+e;case 4200:if(!te(e,/flex-|baseline/))return _+`grid-column-align`+P(e,t)+e;break;case 2592:case 3360:return _+j(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,te(e.props,/grid-\w+-end/)})?~M(e+(n=n[t].value),`span`,0)?e:_+j(e,`-start`,``)+e+_+`grid-row-span:`+(~M(n,`span`,0)?te(n,/\d+/):te(n,/\d+/)-+te(e,/\d+/))+`;`:_+j(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return te(e.props,/grid-\w+-start/)})?e:_+j(j(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return j(e,/(.+)-inline(.+)/,y+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(F(e)-1-t>6)switch(N(e,t+1)){case 109:if(N(e,t+4)!==45)break;case 102:return j(e,/(.+:)(.+)-([^]+)/,`$1`+y+`$2-$3$1`+v+(N(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~M(e,`stretch`,0)?Ne(j(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return j(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return _+n+`:`+r+s+(i?_+n+`-span:`+(a?o:o-+r)+s:``)+e});case 4949:if(N(e,t+6)===121)return j(e,`:`,`:`+y)+e;break;case 6444:switch(N(e,N(e,14)===45?18:11)){case 120:return j(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+y+(N(e,14)===45?`inline-`:``)+`box$3$1`+y+`$2$3$1`+_+`$2box$3`)+e;case 100:return j(e,`:`,`:`+_)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return j(e,`scroll-`,`scroll-snap-`)+e}return e}function Pe(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function Fe(e,t,n,r){switch(e.type){case E:if(e.children.length)break;case C:case w:case S:return e.return=e.return||e.value;case b:return``;case T:return e.return=e.value+`{`+Pe(e.children,r)+`}`;case x:if(!F(e.value=e.props.join(`,`)))return``}return F(n=Pe(e.children,r))?e.return=e.value+`{`+n+`}`:``}function Ie(e){var t=ne(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function Le(e){return function(t){t.root||(t=t.return)&&e(t)}}function Re(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case S:e.return=Ne(e.value,e.length,n);return;case T:return Pe([de(e,{value:j(e.value,`@`,`@`+y)})],r);case x:if(e.length)return ie(n=e.props,function(t){switch(te(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:fe(de(e,{props:[j(t,/:(read-\w+)/,`:`+v+`$1`)]})),fe(de(e,{props:[t]})),k(e,{props:ae(n,r)});break;case`::placeholder`:fe(de(e,{props:[j(t,/:(plac\w+)/,`:`+y+`input-$1`)]})),fe(de(e,{props:[j(t,/:(plac\w+)/,`:`+v+`$1`)]})),fe(de(e,{props:[j(t,/:(plac\w+)/,_+`input-$1`)]})),fe(de(e,{props:[t]})),k(e,{props:ae(n,r)})}return``})}}var ze=g(),R=c(u()),Be=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,Ve=`active`,He=`data-styled-version`,Ue=`6.5.3`,We=`/*!sc*/
`,Ge=typeof window<`u`&&typeof document<`u`;function Ke(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var qe=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:Ke(`REACT_APP_SC_DISABLE_SPEEDY`)??Ke(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),Je=`sc-keyframes-`,Ye={};function Xe(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var Ze=new Map,Qe=new Map,$e=1,et=e=>{if(Ze.has(e))return Ze.get(e);for(;Qe.has($e);)$e++;let t=$e++;return Ze.set(e,t),Qe.set(t,e),t},tt=e=>Qe.get(e),nt=(e,t)=>{$e=t+1,Ze.set(e,t),Qe.set(t,e)},rt=Object.freeze([]),it=Object.freeze({});function at(e,t,n=it){return e.theme!==n.theme&&e.theme||t||n.theme}var ot=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,st=/(^-|-$)/g;function ct(e){return e.replace(ot,`-`).replace(st,``)}var lt=/(a)(d)/gi,ut=e=>String.fromCharCode(e+(e>25?39:97));function dt(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=ut(t%52)+n;return(ut(t%52)+n).replace(lt,`$1-$2`)}var ft=5381,pt=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},mt=e=>pt(ft,e);function ht(e){return dt(mt(e)>>>0)}function gt(e){return e.displayName||e.name||`Component`}function _t(e){return typeof e==`string`&&!0}function vt(e){return _t(e)?`styled.${e}`:`Styled(${gt(e)})`}var yt=Symbol.for(`react.memo`),bt=Symbol.for(`react.forward_ref`),xt={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},St={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Ct={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},wt={[bt]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[yt]:Ct};function Tt(e){return(`type`in(t=e)&&t.type.$$typeof)===yt?Ct:`$$typeof`in e?wt[e.$$typeof]:xt;var t}var Et=Object.defineProperty,Dt=Object.getOwnPropertyNames,Ot=Object.getOwnPropertySymbols,kt=Object.getOwnPropertyDescriptor,At=Object.getPrototypeOf,jt=Object.prototype;function Mt(e,t,n){if(typeof t!=`string`){let r=At(t);r&&r!==jt&&Mt(e,r,n);let i=Dt(t).concat(Ot(t)),a=Tt(e),o=Tt(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in St||n&&n[s]||o&&s in o||a&&s in a)){let n=kt(t,s);try{Et(e,s,n)}catch{}}}}return e}function Nt(e){return typeof e==`function`}var Pt=Symbol.for(`react.forward_ref`);function Ft(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===Pt&&`styledComponentId`in e}function It(e,t){return e&&t?e+` `+t:e||t||``}function Lt(e,t){return e.join(t||``)}function Rt(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function zt(e,t,n=!1){if(!n&&!Rt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=zt(e[n],t[n]);else if(Rt(t))for(let n in t)e[n]=zt(e[n],t[n]);return e}function Bt(e,t){Object.defineProperty(e,"toString",{value:t})}var Vt=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw Xe(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+We;return t}},Ht=`style[${Be}][${He}="${Ue}"]`,Ut=RegExp(`^${Be}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Wt=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Gt=e=>{if(!e)return document;if(Wt(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(Wt(t))return t}return document},Kt=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},qt=(e,t)=>{let n=(t.textContent??``).split(We),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(Ut);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(nt(n,t),Kt(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},Jt=e=>{let t=Gt(e.options.target).querySelectorAll(Ht);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(Be)!==Ve&&(qt(e,r),r.parentNode&&r.parentNode.removeChild(r))}},Yt=!1;function Xt(){if(!1!==Yt)return Yt;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return Yt=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return Yt=t.getAttribute(`content`)||void 0}return Yt=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var Zt=(e,t)=>{let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${Be}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(Be,Ve),i.setAttribute(He,Ue);let s=t||Xt();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},Qt=class{constructor(e,t){this.element=Zt(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw Xe(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},$t=class{constructor(e,t){this.element=Zt(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},en=Ge,tn={isServer:!Ge,useCSSOMInjection:!qe},nn=class e{static registerId(e){return et(e)}constructor(e=it,t={},n){this.options=Object.assign(Object.assign({},tn),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Ge&&en&&(en=!1,Jt(this)),Bt(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=tt(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=Be+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&Ge&&Jt(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&Ge&&t.target!==this.options.target&&Gt(this.options.target)!==Gt(t.target)&&Jt(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new Qt(t,n):new $t(t,n))(this.options),new Vt(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){et(e),e.startsWith(Je)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(et(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(et(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},rn=new WeakSet,an={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function on(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in an||e.startsWith(`--`)?String(t).trim():t+`px`}var sn=47;function cn(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var ln=Symbol.for(`sc-keyframes`);function un(e){return typeof e==`object`&&!!e&&ln in e}function dn(e){return Nt(e)&&!(e.prototype&&e.prototype.isReactComponent)}var fn=e=>e==null||!1===e||e===``,pn=Symbol.for(`react.client.reference`);function mn(e){return e.$$typeof===pn}function hn(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!fn(r)&&(Array.isArray(r)&&rn.has(r)||Nt(r)?t.push(cn(n)+`:`,r,`;`):Rt(r)?(t.push(n+` {`),hn(r,t),t.push(`}`)):t.push(cn(n)+`: `+on(n,r)+`;`))}}function gn(e,t,n,r,i=[]){if(fn(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return mn(e)?i:dn(e)&&t?gn(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)gn(e[a],t,n,r,i);return i}return Ft(e)?(i.push(`.${e.styledComponentId}`),i):un(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):mn(e)?i:Rt(e)&&e.toString===Object.prototype.toString?(hn(e,i),i):(i.push(e.toString()),i)}var _n=mt(Ue),vn=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=pt(_n,t),this.baseStyle=n,nn.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(dn(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=Lt(gn(r,e,t,n)))}else i+=Lt(gn(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=dt(pt(pt(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=It(r,a)}}return r}},yn=/&/g;function bn(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function xn(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==sn||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===sn&&(o=!1,c++);else if(l!==34&&l!==39||bn(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function Sn(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&Sn(a.children,t)}return e}function Cn({options:e=it,plugins:t=rt}=it){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(yn,r).replace(i,a))}),e.prefix&&o.push(Re),o.push(Fe);let s=[],c=Ie(o.concat(Le(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return xn(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||bn(e,o)){if(s===0){if(t===sn&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==sn);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===sn)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===sn&&o+1<r&&e.charCodeAt(o+1)===sn){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:xn(i)):l===0?e:xn(e)}(t),d=Oe(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=Sn(d,e.namespace)),s=[],Pe(d,c),s},u=e,d=ft;for(let e=0;e<t.length;e++)t[e].name||Xe(15),d=pt(d,t[e].name);return u!=null&&u.namespace&&(d=pt(d,u.namespace)),u!=null&&u.prefix&&(d=pt(d,`p`)),l.hash=d===ft?``:d.toString(),l}var wn=new nn,Tn=Cn(),En=R.createContext({shouldForwardProp:void 0,styleSheet:wn,stylis:Tn,stylisPlugins:void 0});En.Consumer;function Dn(){return R.useContext(En)}var On=R.createContext(void 0);On.Consumer;function kn(){let e=R.useContext(On);if(!e)throw Xe(18);return e}function An(e){let t=R.useContext(On),n=R.useMemo(()=>function(e,t){if(!e)throw Xe(14);if(Nt(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw Xe(8);return t?Object.assign(Object.assign({},t),e):e}(e.theme,t),[e.theme,t]);return e.children?R.createElement(On.Provider,{value:n},e.children):null}var jn=Object.prototype.hasOwnProperty,Mn={};function Nn(e,t){let n=typeof e==`string`?ct(e):`sc`;Mn[n]=(Mn[n]||0)+1;let r=n+`-`+ht(Ue+n+Mn[n]);return t?t+`-`+r:r}function Pn(e,t,n){let r=Ft(e),i=e,a=!_t(e),{attrs:o=rt,componentId:s=Nn(t.displayName,t.parentComponentId),displayName:c=vt(e)}=t,l=t.displayName&&t.componentId?ct(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new vn(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=R.useContext(On),u=Dn(),d=e.shouldForwardProp||u.shouldForwardProp,f=at(t,l,a)||it,p,m;{let e=R.useRef(null),n=e.current;if(n!==null&&n[1]===f&&n[2]===u.styleSheet&&n[3]===u.stylis&&n[7]===i&&function(e,t,n){let r=e,i=t,a=0;for(let e in i)if(jn.call(i,e)&&(a++,r[e]!==i[e]))return!1;return a===n}(n[0],t,n[4]))p=n[5],m=n[6];else{p=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=e.length>1;for(let n=0;n<e.length;n++){let a=e[n],o=Nt(a)?a(i?Object.assign({},r):r):a;for(let e in o)e===`className`?r.className=It(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):e in t&&t[e]===void 0||(r[e]=o[e])}return`className`in t&&typeof t.className==`string`&&(r.className=It(r.className,t.className)),r}(r,t,f),m=i.generateAndInjectStyles(p,u.styleSheet,u.stylis);let n=0;for(let e in t)jn.call(t,e)&&n++;e.current=[t,f,u.styleSheet,u.stylis,n,p,m,i]}}let h=p.as||c,g=function(e,t,n,r){let i={};for(let a in e)e[a]===void 0||a[0]===`$`||a===`as`||a===`theme`&&e.theme===n||(a===`forwardedAs`?i.as=e.forwardedAs:r&&!r(a,t)||(i[a]=e[a]));return i}(p,h,f,d),_=It(o,s);return m&&(_+=` `+m),p.className&&(_+=` `+p.className),g[_t(h)&&h.includes(`-`)?`class`:`className`]=_,n&&(g.ref=n),(0,R.createElement)(h,g)}(m,e,t)}p.displayName=c;let m=R.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?It(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)zt(e,n,!0);return e}({},i.defaultProps,e):e}}),Bt(m,()=>`.${m.styledComponentId}`),a&&Mt(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var Fn=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function In(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Ln=e=>(rn.add(e),e);function z(e,...t){if(Nt(e)||Rt(e))return Ln(gn(In(rt,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?gn(n):Ln(gn(In(n,t)))}function Rn(e,t,n=it){if(!t)throw Xe(1,t);let r=(r,...i)=>e(t,n,z(r,...i));return r.attrs=r=>Rn(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>Rn(e,t,Object.assign(Object.assign({},n),r)),r}var zn=e=>Rn(Pn,e),B=zn;Fn.forEach(e=>{B[e]=zn(e)});var Bn=class{constructor(e,t){this.instanceRules=new Map,this.rules=e,this.componentId=t,this.isStatic=function(e){for(let t=0;t<e.length;t+=1){let n=e[t];if(Nt(n)&&!Ft(n))return!1}return!0}(e),nn.registerId(this.componentId)}removeStyles(e,t){this.instanceRules.delete(e),this.rebuildGroup(t)}renderStyles(e,t,n,r){let i=this.componentId;if(this.isStatic){if(n.hasNameForId(i,i+e))this.instanceRules.has(e)||this.computeRules(e,t,n,r);else{let a=this.computeRules(e,t,n,r);n.insertRules(i,a.name,a.rules)}return}let a=this.instanceRules.get(e);if(this.computeRules(e,t,n,r),!n.server&&a){let t=a.rules,n=this.instanceRules.get(e).rules;if(t.length===n.length){let e=!0;for(let r=0;r<t.length;r++)if(t[r]!==n[r]){e=!1;break}if(e)return}}this.rebuildGroup(n)}computeRules(e,t,n,r){let i=Lt(gn(this.rules,t,n,r)),a={name:this.componentId+e,rules:r(i,``)};return this.instanceRules.set(e,a),a}rebuildGroup(e){let t=this.componentId;e.clearRules(t);for(let n of this.instanceRules.values())e.insertRules(t,n.name,n.rules)}};function Vn(e,...t){let n=z(e,...t),r=`sc-global-${ht(JSON.stringify(n))}`,i=new Bn(n,r),a=e=>{let t=Dn(),n=R.useContext(On),a;{let e=R.useRef(null);e.current===null&&(e.current=t.styleSheet.allocateGSInstance(r)),a=e.current}t.styleSheet.server&&o(a,e,t.styleSheet,n,t.stylis);{let s=i.isStatic?[a,t.styleSheet,i]:[a,e,t.styleSheet,n,t.stylis,i],c=R.useRef(i);R.useLayoutEffect(()=>{t.styleSheet.server||(c.current!==i&&(t.styleSheet.clearRules(r),c.current=i),o(a,e,t.styleSheet,n,t.stylis))},s),R.useLayoutEffect(()=>()=>{t.styleSheet.server||i.removeStyles(a,t.styleSheet)},[a,t.styleSheet,i])}return t.styleSheet.server&&i.instanceRules.delete(a),null};function o(e,t,n,r,o){if(i.isStatic)i.renderStyles(e,Ye,n,o);else{let s=Object.assign(Object.assign({},t),{theme:at(t,r,a.defaultProps)});i.renderStyles(e,s,n,o)}}return R.memo(a)}var Hn,Un=class{constructor(e,t){this[Hn]=!0,this.inject=(e,t=Tn)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=Je+e,this.rules=t,et(this.id),Bt(this,()=>{throw Xe(12,String(this.name))})}getName(e=Tn){return e.hash?this.name+dt(e.hash>>>0):this.name}};function Wn(e,...t){let n=Lt(z(e,...t));return new Un(ht(n),n)}Hn=ln,`${Be}`,`${Be}`,`${Be}`;var Gn={action:{accentBg:`var(--ds-action-accent-bg)`,accentBgActive:`var(--ds-action-accent-bg-active)`,accentBgHover:`var(--ds-action-accent-bg-hover)`,accentFocusRing:`var(--ds-action-accent-focus-ring)`,accentText:`var(--ds-action-accent-text)`,dangerBg:`var(--ds-action-danger-bg)`,dangerBgActive:`var(--ds-action-danger-bg-active)`,dangerBgHover:`var(--ds-action-danger-bg-hover)`,dangerFocusRing:`var(--ds-action-danger-focus-ring)`,dangerText:`var(--ds-action-danger-text)`,disabledBg:`var(--ds-action-disabled-bg)`,disabledBorder:`var(--ds-action-disabled-border)`,disabledText:`var(--ds-action-disabled-text)`,ghostBgHover:`var(--ds-action-ghost-bg-hover)`,ghostFocusRing:`var(--ds-action-ghost-focus-ring)`,ghostText:`var(--ds-action-ghost-text)`,inverseBg:`var(--ds-action-inverse-bg)`,inverseBgActive:`var(--ds-action-inverse-bg-active)`,inverseBgHover:`var(--ds-action-inverse-bg-hover)`,inverseText:`var(--ds-action-inverse-text)`,outlineBorder:`var(--ds-action-outline-border)`,primaryBg:`var(--ds-action-primary-bg)`,primaryBgActive:`var(--ds-action-primary-bg-active)`,primaryBgHover:`var(--ds-action-primary-bg-hover)`,primaryFocusRing:`var(--ds-action-primary-focus-ring)`,primaryText:`var(--ds-action-primary-text)`,secondaryBg:`var(--ds-action-secondary-bg)`,secondaryBgActive:`var(--ds-action-secondary-bg-active)`,secondaryBgHover:`var(--ds-action-secondary-bg-hover)`,secondaryBorder:`var(--ds-action-secondary-border)`,secondaryFocusRing:`var(--ds-action-secondary-focus-ring)`,secondaryText:`var(--ds-action-secondary-text)`},border:{accent:`var(--ds-border-accent)`,default:`var(--ds-border-default)`,disabled:`var(--ds-border-disabled)`,editing:`var(--ds-border-editing)`,focus:`var(--ds-border-focus)`,hover:`var(--ds-border-hover)`,inverse:`var(--ds-border-inverse)`,selected:`var(--ds-border-selected)`,subtle:`var(--ds-border-subtle)`,widthDefault:`var(--ds-border-width-default)`,widthEmphasis:`var(--ds-border-width-emphasis)`,widthFocus:`var(--ds-border-width-focus)`,widthIcon:`var(--ds-border-width-icon)`,widthSelected:`var(--ds-border-width-selected)`},brand:{accentOnLight:`var(--ds-brand-accent-on-light)`,primary:`var(--ds-brand-primary)`,primaryActive:`var(--ds-brand-primary-active)`,primaryHover:`var(--ds-brand-primary-hover)`,primaryTint:`var(--ds-brand-primary-tint)`,primaryTintSubtle:`var(--ds-brand-primary-tint-subtle)`,secondary:`var(--ds-brand-secondary)`,secondaryActive:`var(--ds-brand-secondary-active)`,secondaryHover:`var(--ds-brand-secondary-hover)`},control:{circleInlineLg:`var(--ds-control-circle-inline-lg)`,circleInlineMd:`var(--ds-control-circle-inline-md)`,counterMd:`var(--ds-control-counter-md)`,counterSm:`var(--ds-control-counter-sm)`,coverMd:`var(--ds-control-cover-md)`,dotSm:`var(--ds-control-dot-sm)`,height2xs:`var(--ds-control-height-2xs)`,heightLg:`var(--ds-control-height-lg)`,heightMd:`var(--ds-control-height-md)`,heightSm:`var(--ds-control-height-sm)`,heightXl:`var(--ds-control-height-xl)`,heightXs:`var(--ds-control-height-xs)`,textareaMd:`var(--ds-control-textarea-md)`,tileMd:`var(--ds-control-tile-md)`},feedback:{errorDefault:`var(--ds-feedback-error-default)`,errorSurface:`var(--ds-feedback-error-surface)`,infoDefault:`var(--ds-feedback-info-default)`,infoSurface:`var(--ds-feedback-info-surface)`,successDefault:`var(--ds-feedback-success-default)`,successSurface:`var(--ds-feedback-success-surface)`,warningDefault:`var(--ds-feedback-warning-default)`,warningFill:`var(--ds-feedback-warning-fill)`,warningSurface:`var(--ds-feedback-warning-surface)`},icon:{accent:`var(--ds-icon-accent)`,default:`var(--ds-icon-default)`,disabled:`var(--ds-icon-disabled)`,onAccent:`var(--ds-icon-on-accent)`,onBrand:`var(--ds-icon-on-brand)`,secondary:`var(--ds-icon-secondary)`},radius:{card:`var(--ds-radius-card)`,control:`var(--ds-radius-control)`,field:`var(--ds-radius-field)`,none:`var(--ds-radius-none)`,panel:`var(--ds-radius-panel)`,tile:`var(--ds-radius-tile)`},shadow:{card:`var(--ds-shadow-card)`,float:`var(--ds-shadow-float)`},size:{iconLg:`var(--ds-size-icon-lg)`,iconMd:`var(--ds-size-icon-md)`,iconSm:`var(--ds-size-icon-sm)`},space:{gapLg:`var(--ds-space-gap-lg)`,gapMd:`var(--ds-space-gap-md)`,gapSm:`var(--ds-space-gap-sm)`,gapXs:`var(--ds-space-gap-xs)`,insetLg:`var(--ds-space-inset-lg)`,insetMd:`var(--ds-space-inset-md)`,insetSm:`var(--ds-space-inset-sm)`,insetXl:`var(--ds-space-inset-xl)`,insetXs:`var(--ds-space-inset-xs)`,stackLg:`var(--ds-space-stack-lg)`,stackMd:`var(--ds-space-stack-md)`},surface:{accentStrong:`var(--ds-surface-accent-strong)`,brand:`var(--ds-surface-brand)`,card:`var(--ds-surface-card)`,disabled:`var(--ds-surface-disabled)`,inverse:`var(--ds-surface-inverse)`,media:`var(--ds-surface-media)`,muted:`var(--ds-surface-muted)`,page:`var(--ds-surface-page)`,raised:`var(--ds-surface-raised)`,sunken:`var(--ds-surface-sunken)`},text:{accent:`var(--ds-text-accent)`,disabled:`var(--ds-text-disabled)`,onBrand:`var(--ds-text-on-brand)`,onInverse:`var(--ds-text-on-inverse)`,placeholder:`var(--ds-text-placeholder)`,primary:`var(--ds-text-primary)`,secondary:`var(--ds-text-secondary)`,tertiary:`var(--ds-text-tertiary)`},tool:{accent:`var(--ds-tool-accent)`,accentHover:`var(--ds-tool-accent-hover)`,border:`var(--ds-tool-border)`,borderSubtle:`var(--ds-tool-border-subtle)`,onAccent:`var(--ds-tool-on-accent)`,surface:`var(--ds-tool-surface)`,surfaceSubtle:`var(--ds-tool-surface-subtle)`},typography:{bodyLgLineHeight:`var(--ds-typography-body-lg-line-height)`,bodyLgSize:`var(--ds-typography-body-lg-size)`,bodyLgWeight:`var(--ds-typography-body-lg-weight)`,bodyLineHeight:`var(--ds-typography-body-line-height)`,bodySize:`var(--ds-typography-body-size)`,bodySmLineHeight:`var(--ds-typography-body-sm-line-height)`,bodySmSize:`var(--ds-typography-body-sm-size)`,bodySmWeight:`var(--ds-typography-body-sm-weight)`,bodyWeight:`var(--ds-typography-body-weight)`,captionLineHeight:`var(--ds-typography-caption-line-height)`,captionSize:`var(--ds-typography-caption-size)`,captionWeight:`var(--ds-typography-caption-weight)`,displayNumberLetterSpacing:`var(--ds-typography-display-number-letter-spacing)`,displayNumberLineHeight:`var(--ds-typography-display-number-line-height)`,displayNumberSize:`var(--ds-typography-display-number-size)`,displayNumberWeight:`var(--ds-typography-display-number-weight)`,fontDisplay:`"Outfit", var(--ds-typography-font-sans)`,fontSans:`"Outfit", var(--ds-typography-font-sans)`,heading1LetterSpacing:`var(--ds-typography-heading-1-letter-spacing)`,heading1LineHeight:`var(--ds-typography-heading-1-line-height)`,heading1Size:`var(--ds-typography-heading-1-size)`,heading1Weight:`var(--ds-typography-heading-1-weight)`,heading2LetterSpacing:`var(--ds-typography-heading-2-letter-spacing)`,heading2LineHeight:`var(--ds-typography-heading-2-line-height)`,heading2Size:`var(--ds-typography-heading-2-size)`,heading2Weight:`var(--ds-typography-heading-2-weight)`,heading3LetterSpacing:`var(--ds-typography-heading-3-letter-spacing)`,heading3LineHeight:`var(--ds-typography-heading-3-line-height)`,heading3Size:`var(--ds-typography-heading-3-size)`,heading3Weight:`var(--ds-typography-heading-3-weight)`,heading4LineHeight:`var(--ds-typography-heading-4-line-height)`,heading4Size:`var(--ds-typography-heading-4-size)`,heading4Weight:`var(--ds-typography-heading-4-weight)`,labelLetterSpacing:`var(--ds-typography-label-letter-spacing)`,labelLineHeight:`var(--ds-typography-label-line-height)`,labelSize:`var(--ds-typography-label-size)`,labelUpperLetterSpacing:`var(--ds-typography-label-upper-letter-spacing)`,labelUpperLineHeight:`var(--ds-typography-label-upper-line-height)`,labelUpperSize:`var(--ds-typography-label-upper-size)`,labelUpperTransform:`var(--ds-typography-label-upper-transform)`,labelUpperWeight:`var(--ds-typography-label-upper-weight)`,labelWeight:`var(--ds-typography-label-weight)`,leadLineHeight:`var(--ds-typography-lead-line-height)`,leadSize:`var(--ds-typography-lead-size)`,leadWeight:`var(--ds-typography-lead-weight)`,uiLabelLineHeight:`var(--ds-typography-ui-label-line-height)`,uiLabelSize:`var(--ds-typography-ui-label-size)`,uiLabelWeight:`var(--ds-typography-ui-label-weight)`,uiSmallLineHeight:`var(--ds-typography-ui-small-line-height)`,uiSmallSize:`var(--ds-typography-ui-small-size)`,uiSmallWeight:`var(--ds-typography-ui-small-weight)`}},Kn=Vn`
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
    background: ${e=>e.theme.surface.sunken};
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
`,qn=`---
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

`,Jn=`---
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
`,Yn=0;function V(e){Yn+=1;let t=Math.random().toString(36).slice(2,7);return`${e}_${Yn.toString(36)}_${t}`}var Xn=/(==[^=]+==)|(\{[^}|]+\|[^}]+\})|(\[\^[^\]]+\])/g;function Zn(e){let t=[],n=0,r=e=>{if(!e)return;let n=t[t.length-1];n&&Object.keys(n).length===1?n.text+=e:t.push({text:e})};for(let i of e.matchAll(Xn))if(r(e.slice(n,i.index)),n=i.index+i[0].length,i[1])for(let e of Zn(i[1].slice(2,-2)))t.push({...e,keyword:!0});else if(i[2]){let[e,n]=i[2].slice(1,-1).split(`|`);t.push({text:e,ruby:n})}else i[3]&&t.push({text:``,footnoteRef:i[3].slice(2,-1)});return r(e.slice(n)),t.length>0?t:[{text:``}]}var Qn={ㄅㄚ:`仈八叭峇巴扒捌朳柭疤笆粑芭蚆豝`,ㄅㄚˇ:`把鈀靶`,ㄅㄚˊ:`拔犮癹胈茇菝詙跋軷魃鼥`,ㄅㄚˋ:`壩弝灞爸矲罷耙跁霸`,"ㄅㄚ˙":`吧`,ㄅㄛ:`僠剝哱嶓帗撥播波玻砵碆缽菠蕃袚蹳餑鱍`,ㄅㄛˇ:`簸跛`,ㄅㄛˊ:`亳伯僰勃博嚗帛懪挬搏欂泊浡渤犦猼瓝瓟礡箔簙胉脖膊舶葧蔔袹襏襮豰踣郣鈸鉑鋍鎛鑮餺馞駁駮髆鵓`,ㄅㄛˋ:`擘檗糪蘗譒`,"ㄅㄛ˙":`卜啵`,ㄅㄞ:`挀掰`,ㄅㄞˇ:`佰捭擺柏百粨絔襬`,ㄅㄞˊ:`白`,ㄅㄞˋ:`庍拜敗猈稗粺`,ㄅㄟ:`卑悲揹杯桮椑盃碑藣鵯`,ㄅㄟˇ:`北`,ㄅㄟˋ:`倍偝備孛悖憊梖棓焙牬犕狽珼琲碚糒背蓓被褙誖貝輩邶郥鄁鋇鞁骳`,"ㄅㄟ˙":`唄`,ㄅㄠ:`包孢枹煲笣胞苞蕔褒齙`,ㄅㄠˇ:`保堡媬寶怉葆褓飹飽駂鳵鴇`,ㄅㄠˊ:`窇薄雹`,ㄅㄠˋ:`儤報忁抱暴爆菢虣袌豹趵鉋鑤髱鮑`,ㄅㄢ:`扳搬攽斑斒班瘢般褩頒鳻`,ㄅㄢˇ:`昄板版粄舨蝂鈑闆阪魬`,ㄅㄢˋ:`伴半坢姅怑扮拌柈湴瓣絆辦鉡靽`,"ㄅㄢ˙":`螁`,ㄅㄣ:`奔栟泍錛`,ㄅㄣˇ:`本畚翉苯`,ㄅㄣˋ:`坋坌渀笨`,ㄅㄤ:`垹幫梆縍邦鞤`,ㄅㄤˇ:`榜牓綁膀`,ㄅㄤˋ:`傍塝搒棒玤磅艕蒡蚌謗鎊`,ㄅㄥ:`伻傰崩痭祊絣閍`,ㄅㄥˇ:`埲琣琫繃菶`,ㄅㄥˊ:`甭`,ㄅㄥˋ:`塴泵甏蹦迸`,ㄅㄧ:`偪屄楅豍逼鎞鵖`,ㄅㄧˇ:`俾匕妣彼朼柀比沘疕秕筆箄芘貏鄙`,ㄅㄧˊ:`荸鼻`,ㄅㄧˋ:`佖咇嗶坒堛壁奰妼婢嬖幣庇庳廦弊弼彃必怭愊愎敝斃柲梐毖湢滭潷濞熚狴獘獙珌璧畀畢疪痹痺皕碧笓箅篦篳粊綼縪繴罼腷臂苾萆蓖蓽蔽薜蜌裨襞襣觱詖賁贔蹕躄避邲鄨鄪鉍鏎閉閟陛飶馝駜驆髀髲鮅鷝鷩鼊`,ㄅㄧㄝ:`憋虌蟞鱉`,ㄅㄧㄝˇ:`癟`,ㄅㄧㄝˊ:`別徶癿蛂襒蹩`,ㄅㄧㄝˋ:`彆`,ㄅㄧㄠ:`儦墂彪杓標淲滮瀌熛爂猋瘭穮膘臕藨謤贆鏢鑣颩颮飆驃驫髟`,ㄅㄧㄠˇ:`婊檦表裱褾諘錶`,ㄅㄧㄠˋ:`俵摽鰾`,ㄅㄧㄢ:`揙煸猵甂砭箯籩編萹蝙邊鞭`,ㄅㄧㄢˇ:`匾惼扁碥稨窆褊貶鴘`,ㄅㄧㄢˋ:`便卞弁忭抃汳汴緶艑變辨辮辯遍釆閞`,ㄅㄧㄣ:`儐彬斌椕檳汃濱瀕玢璸砏繽虨豩豳賓邠鑌霦`,ㄅㄧㄣˋ:`擯殯臏髕鬢`,ㄅㄧㄥ:`兵冰掤`,ㄅㄧㄥˇ:`丙怲昺柄炳秉稟窉苪蛃邴鉼陃鞞餅`,ㄅㄧㄥˋ:`並併偋寎并庰摒病誁`,ㄅㄨ:`峬晡誧逋鈽`,ㄅㄨˇ:`哺捕補鵏鸔`,ㄅㄨˊ:`轐醭鳪`,ㄅㄨˋ:`不佈吥咘埔埠布怖抪捗步瓿篰簿蔀踄部餔`,ㄆㄚ:`啪舥葩趴`,ㄆㄚˊ:`掱杷爬琶`,ㄆㄚˋ:`帊帕怕袙`,ㄆㄛ:`坡岥潑鏺頗`,ㄆㄛˇ:`叵笸`,ㄆㄛˊ:`婆櫇皤謈鄱`,ㄆㄛˋ:`岶昢烞珀破粕蒪迫釙魄`,"ㄆㄛ˙":`桲`,ㄆㄞ:`拍`,ㄆㄞˊ:`俳徘排棑牌犤簰`,ㄆㄞˋ:`派湃蒎鎃`,ㄆㄟ:`呸怌柸胚衃醅`,ㄆㄟˇ:`俖`,ㄆㄟˊ:`培毰裴賠陪駍`,ㄆㄟˋ:`伂佩姵帔旆沛浿珮轡配霈`,ㄆㄠ:`拋脬`,ㄆㄠˇ:`跑`,ㄆㄠˊ:`刨匏咆庖炰袍鞄麃`,ㄆㄠˋ:`奅泡炮皰砲麭`,ㄆㄡ:`剖`,ㄆㄡˇ:`婄`,ㄆㄡˊ:`抔捊掊裒`,ㄆㄢ:`攀潘眅`,ㄆㄢˊ:`媻幋搫槃洀瀊爿盤磐磻縏蒰蟠跘蹣鞶`,ㄆㄢˋ:`判叛拚沜泮溿牉畔盼袢襻詊頖`,ㄆㄣ:`噴歕`,ㄆㄣˇ:`呠翸`,ㄆㄣˊ:`湓盆葐`,ㄆㄤ:`乓滂雱`,ㄆㄤˇ:`嗙耪`,ㄆㄤˊ:`彷徬旁舽螃逄龐`,ㄆㄤˋ:`胖`,ㄆㄥ:`匉怦恲抨漰烹砰磞軯閛`,ㄆㄥˇ:`剻捧皏`,ㄆㄥˊ:`倗堋弸彭憉朋棚樥淜澎硼篣篷膨芃蓬蟛輣錋鑝韸髼鬅鵬`,ㄆㄥˋ:`掽椪碰踫`,ㄆㄧ:`丕伓伾劈坯憵批披狉砒礔秠紕翍邳鈚鈹銔錍霹駓髬魾`,ㄆㄧˇ:`仳匹嚭圮庀擗疋痞癖諀銢鴄`,ㄆㄧˊ:`啤埤岯崥枇毗毘毞琵疲皮羆脾膍蚍蚽蚾蜱螷蠯貔郫阰陂陴鵧鼙`,ㄆㄧˋ:`僻媲屁揊淠潎澼甓睥稫譬辟釽闢鷿`,ㄆㄧㄝ:`撇氕瞥`,ㄆㄧㄝˇ:`苤`,ㄆㄧㄝˋ:`嫳`,ㄆㄧㄠ:`剽彯慓旚犥翲螵飄魒`,ㄆㄧㄠˇ:`殍皫瞟篻縹醥顠`,ㄆㄧㄠˊ:`嫖瓢薸`,ㄆㄧㄠˋ:`僄嘌漂票蔈`,ㄆㄧㄢ:`偏媥篇翩鶣`,ㄆㄧㄢˇ:`諞貵`,ㄆㄧㄢˊ:`楄楩胼跰蹁駢骿`,ㄆㄧㄢˋ:`片騙`,ㄆㄧㄣ:`姘拼礗驞`,ㄆㄧㄣˇ:`品`,ㄆㄧㄣˊ:`嚬嬪玭矉蠙貧頻顰`,ㄆㄧㄣˋ:`牝聘`,ㄆㄧㄥ:`乒俜娉涄甹砯竮艵頩`,ㄆㄧㄥˊ:`呯坪屏帡平憑枰泙洴玶瓶缾苹荓萍蓱蘋蛢評軿郱`,ㄆㄨ:`仆噗扑撲潽鯆`,ㄆㄨˇ:`圃普朴樸氆浦溥烳譜蹼鐠`,ㄆㄨˊ:`僕匍墣濮獛璞瞨纀脯莆菩葡蒱蒲酺鏷`,ㄆㄨˋ:`曝瀑舖鋪`,ㄇˊ:`呣`,ㄇㄚ:`媽嬤孖`,ㄇㄚˇ:`溤瑪碼螞鎷馬鷌`,ㄇㄚˊ:`犘痲蟆麻`,ㄇㄚˋ:`傌嘜榪礣禡罵鬕`,"ㄇㄚ˙":`嗎嘛`,ㄇㄛ:`摸`,ㄇㄛˇ:`抹`,ㄇㄛˊ:`劘嫫摩摹模磨糢膜藦蘑謨饃髍魔`,ㄇㄛˋ:`嗼塻墨妺寞暯末枺歾歿沫漠瀎爅瘼眽瞙秣粖纆茉莈莫蛨蟔貊貘銆鏌陌靺驀默`,"ㄇㄜ˙":`么嚜麼`,ㄇㄞˇ:`嘪買鷶`,ㄇㄞˊ:`埋薶霾`,ㄇㄞˋ:`勱脈賣邁霢麥`,ㄇㄟˇ:`媄媺挴每浼渼燘美鎂`,ㄇㄟˊ:`呅堳塺媒嵋徾攗枚梅楣沒湄煤玫瑂眉禖穈脢腜苺莓蘪郿鋂霉黴`,ㄇㄟˋ:`妹媚寐昧沬煝痗眛蝞袂韎魅`,ㄇㄠ:`貓`,ㄇㄠˇ:`冇卯昴泖蓩鉚`,ㄇㄠˊ:`堥旄枆毛氂渵犛矛罞茅茆蝥蟊軞酕錨髦髳鶜`,ㄇㄠˋ:`冒媢帽懋楙毷瑁眊瞀耄芼茂萺蝐袤貌貿鄚鄮`,ㄇㄡ:`哞`,ㄇㄡˇ:`某`,ㄇㄡˊ:`侔洠牟眸瞴繆蛑謀鉾鍪鴾麰`,ㄇㄢ:`嫚`,ㄇㄢˇ:`屘滿睌矕`,ㄇㄢˊ:`僈姏悗慲樠瞞蠻謾鞔顢饅鬗鬘鰻`,ㄇㄢˋ:`墁幔慢曼槾漫熳獌縵蔓鄤鏝`,ㄇㄣˊ:`捫璊菛虋鍆門`,ㄇㄣˋ:`呇悶懣暪燜`,"ㄇㄣ˙":`們`,ㄇㄤˇ:`壾漭硥茻莽蟒`,ㄇㄤˊ:`厖哤娏尨庬忙杗氓汒牻痝盲硭笀芒茫蛖邙鋩駹`,ㄇㄥˇ:`懵猛瓾艋蜢蠓錳`,ㄇㄥˊ:`儚幪懞曚朦檬氋濛甍甿盟瞢矇礞艨莔萌蒙蕄蘉虻鄳鄸霿饛鸏鼆`,ㄇㄥˋ:`夢孟霥`,ㄇㄧ:`咪眯瞇`,ㄇㄧˇ:`弭敉渳濔灖米羋葞蔝銤`,ㄇㄧˊ:`冞彌攠瀰爢獼瓕禰糜縻蘼謎迷醚醾靡鸍麊麋麛`,ㄇㄧˋ:`冪嘧塓宓密峚幎幦榓汨沕泌滵漞熐祕秘糸羃蔤蜜覓覛謐鼏`,ㄇㄧㄝ:`乜咩`,ㄇㄧㄝˋ:`幭懱搣滅篾蔑薎蠛衊覕鱴`,ㄇㄧㄠ:`喵`,ㄇㄧㄠˇ:`杪淼渺眇秒篎緲藐邈`,ㄇㄧㄠˊ:`媌嫹描瞄苗鱙`,ㄇㄧㄠˋ:`妙廟玅`,ㄇㄧㄡˋ:`謬`,ㄇㄧㄢˇ:`丏偭免冕勉喕娩愐沔湎澠絻緬葂鮸黽`,ㄇㄧㄢˊ:`婂媔棉櫋眠矊矏綿蝒`,ㄇㄧㄢˋ:`眄面麵`,ㄇㄧㄣˇ:`僶刡愍憫抿敃敏敯暋泯湣潣皿笢簢蠠閔閩`,ㄇㄧㄣˊ:`岷崏忞怋旻旼民琝痻緡罠苠鈱錉`,ㄇㄧㄥˇ:`姳慏酩`,ㄇㄧㄥˊ:`冥名嫇明暝榠洺溟眳瞑茗蓂螟覭鄍銘鳴`,ㄇㄧㄥˋ:`命詺`,ㄇㄨˇ:`坶姆峔拇母牡牳畝砪踇鉧`,ㄇㄨˊ:`氁`,ㄇㄨˋ:`募墓幕幙慔慕暮木楘毣沐炑牧目睦穆縸艒苜莯蚞鉬霂鞪`,ㄈㄚ:`沷發醱`,ㄈㄚˇ:`法砝髮`,ㄈㄚˊ:`乏伐疺瞂筏罰茷藅閥`,ㄈㄚˋ:`琺`,ㄈㄛˊ:`佛坲`,ㄈㄟ:`啡妃婓扉緋菲蜚裶霏非飛餥馡騑騛`,ㄈㄟˇ:`匪奜悱斐朏棐榧篚翡胐誹`,ㄈㄟˊ:`淝肥腓蜰蟦`,ㄈㄟˋ:`俷剕厞吠屝廢昲曊櫠沸濷狒疿痱癈肺胇芾萉費鐨陫鯡鼣`,ㄈㄡˇ:`否殕缶缹鴀`,ㄈㄡˊ:`紑`,ㄈㄢ:`勫嬏帆幡旛番籓繙翻藩轓颿鱕`,ㄈㄢˇ:`反返釩`,ㄈㄢˊ:`凡墦杋柉樊橎氾渢瀪瀿煩燔璠礬笲籵繁羳膰薠蘩蠜蹯鐇鷭`,ㄈㄢˋ:`奿梵汎泛滼犯畈笵範范販軓軬飯`,ㄈㄣ:`分吩昐棻氛紛翂芬衯酚鈖雰饙`,ㄈㄣˇ:`粉黺`,ㄈㄣˊ:`墳妢幩枌梤棼橨汾濆炃焚羒羵蒶蕡蚡豶轒鐼魵黂鼖鼢`,ㄈㄣˋ:`份僨奮弅忿憤瀵秎糞膹`,ㄈㄤ:`匚坊方枋汸淓芳邡鈁`,ㄈㄤˇ:`仿倣昉瓬紡舫訪髣鶭`,ㄈㄤˊ:`妨房肪防魴`,ㄈㄤˋ:`放`,ㄈㄥ:`丰偑妦封峰崶桻楓檒灃烽犎猦瘋葑蘴蜂豐酆鋒風飌麷`,ㄈㄥˇ:`唪覂諷`,ㄈㄥˊ:`堸夆捀摓艂逢馮`,ㄈㄥˋ:`俸奉焨甮縫賵鳳`,ㄈㄧㄠˋ:`覅`,ㄈㄨ:`伕夫姇孵尃怤敷柎痡砆稃糐紨綒膚荂荴衭趺跗邞鄜鈇鳺麩`,ㄈㄨˇ:`俛俯嘸府弣拊撫斧滏甫簠胕腐腑蜅輔郙釜頫黼`,ㄈㄨˊ:`伏俘冹刜匐咈垘垺孚岪巿幅弗彿怫扶拂服枎柫桴棴榑氟泭洑浮涪澓烰玸琈砩祓福符笰箙紱紼綍罘罦翇艀艴芙芣苻茀茯莩菔葍虙蚨蜉蝠袱襆諨踾輻郛韍鳧鴔鵩鶝黻`,ㄈㄨˋ:`付偩傅副咐复婦嬔富峊復父祔緮縛腹萯蕧蚥蚹蛗蝜蝮複褔覆訃負賦賻赴輹鍑阜附馥駙鮒鰒`,ㄉㄚ:`咑嗒噠搭撘笚耷荅褡鎝`,ㄉㄚˇ:`打`,ㄉㄚˊ:`匒呾妲怛沓炟畣笪答羍薘躂迖達鎉鐽靼韃龘`,ㄉㄚˋ:`大汏`,"ㄉㄚ˙":`瘩繨`,ㄉㄜˊ:`得德淂`,"ㄉㄜ˙":`的`,ㄉㄞ:`呆呔獃`,ㄉㄞˇ:`傣歹逮`,ㄉㄞˋ:`代埭岱帶廗待怠戴柋殆瀻玳紿艜袋襶貸蹛軑軩迨靆黛`,ㄉㄠ:`刀叨忉氘舠魛`,ㄉㄠˇ:`壔導島搗擣禂禱蹈`,ㄉㄠˊ:`捯`,ㄉㄠˋ:`倒到悼檤燾瓙盜稻箌纛翢翿菿道`,ㄉㄡ:`兜唗都`,ㄉㄡˇ:`抖枓蚪鈄陡`,ㄉㄡˋ:`斗梪浢痘竇脰荳豆逗郖酘餖鬥`,ㄉㄢ:`丹儋勯匰單擔殫甔癉眈砃簞耽聃聸襌鄲`,ㄉㄢˇ:`亶伔刐抌撢撣澸玬疸紞膽衴黕黮`,ㄉㄢˋ:`但僤啖啗啿嘾噉嚪帎彈憚憺旦柦氮沊泹淡澹狚癚禫窞繵萏蛋蜑觛誕贉霮髧鴠`,ㄉㄣˋ:`扥扽`,ㄉㄤ:`噹澢璫當簹艡蟷襠鐺`,ㄉㄤˇ:`党擋攩欓讜黨`,ㄉㄤˋ:`儅婸宕嵣愓檔潒璗瓽盪碭礑簜菪蕩逿闣`,ㄉㄥ:`嬁燈璒登簦豋蹬`,ㄉㄥˇ:`戥等`,ㄉㄥˋ:`凳墱嶝瞪磴鄧鐙`,ㄉㄧ:`低堤彽氐滴磾羝袛鍉隄鞮`,ㄉㄧˇ:`厎呧坻底弤抵柢牴砥聜菧觝詆軧邸阺`,ㄉㄧˊ:`嘀嚁嫡敵梑樀滌狄笛篴糴翟苖荻蔋藡覿蹢迪鏑靮馰鬄鸐`,ㄉㄧˋ:`地墑墬娣帝弟旳杕梊棣渧焍玓珶甋眱睇碲禘第締菂蒂蔕蝃螮諦踶遞遰釱`,ㄉㄧㄚˇ:`嗲`,ㄉㄧㄝ:`爹跌`,ㄉㄧㄝˊ:`喋垤堞峌嵽惵挕揲昳楪牒瓞疊眣碟絰耋胅臷艓苵蜨蝶褋詄諜蹀迭镻鰈`,ㄉㄧㄠ:`凋刁叼彫殦琱瞗碉虭蛁貂雕鯛鳭鵰`,ㄉㄧㄠˇ:`屌扚`,ㄉㄧㄠˋ:`伄吊弔掉窵蓧藋調釣雿魡`,ㄉㄧㄡ:`丟銩`,ㄉㄧㄢ:`傎厧巔掂敁槙滇瘨癲蹎顛齻`,ㄉㄧㄢˇ:`典婰碘蒧蕇跕踮點`,ㄉㄧㄢˋ:`佃坫墊壂奠婝店惦扂橝殿淀澱玷甸癜簟阽電靛驔`,ㄉㄧㄥ:`丁仃叮帄玎疔盯耵虰酊釘靪`,ㄉㄧㄥˇ:`嵿濎薡頂鼎`,ㄉㄧㄥˋ:`啶定椗碇碠萣訂鋌錠顁飣`,ㄉㄨ:`剢嘟督醏闍`,ㄉㄨˇ:`堵帾睹篤賭`,ㄉㄨˊ:`櫝殰毒瀆牘犢獨皾蝳裻讀讟贕錖韇韣韥髑黷`,ㄉㄨˋ:`妒度杜渡秺肚芏蠹鍍`,ㄉㄨㄛ:`剟咄哆多掇敪毲裰`,ㄉㄨㄛˇ:`嚲垛埵奲朵椯綞趓躲`,ㄉㄨㄛˊ:`剫喥奪敓踱鐸鮵`,ㄉㄨㄛˋ:`剁墮墯嶞惰柮舵跢跺陊陏鵽`,ㄉㄨㄟ:`堆痽鴭`,ㄉㄨㄟˇ:`頧`,ㄉㄨㄟˋ:`兌對憝懟濧瀩碓祋薱譈鐓隊`,ㄉㄨㄢ:`偳剬媏端耑`,ㄉㄨㄢˇ:`短`,ㄉㄨㄢˋ:`斷椴段毈碫籪緞腶葮躖鍛`,ㄉㄨㄣ:`吨噸墩惇撉敦橔礅蜳蹲驐`,ㄉㄨㄣˇ:`盹躉`,ㄉㄨㄣˋ:`伅囤庉楯沌潡炖燉盾遁遯鈍頓`,ㄉㄨㄥ:`冬咚埬崠東氡涷苳菄蝀鶇鼕`,ㄉㄨㄥˇ:`墥嬞懂董蕫`,ㄉㄨㄥˋ:`侗凍動垌姛峒恫戙挏棟洞湩硐絧胴迵霘駧`,ㄊㄚ:`他嚃塌她它榙牠祂褟趿`,ㄊㄚˇ:`塔獺鰨`,ㄊㄚˋ:`拓搨撻榻毾涾濌禢誻踏蹋遝錔闒闥鞜鞳`,"ㄊㄚ˙":`遢`,ㄊㄜˋ:`忑忒慝特蟘貣鋱`,ㄊㄞ:`胎`,ㄊㄞˊ:`儓台嬯抬旲檯炱箈籉臺苔薹跆邰颱駘鮐`,ㄊㄞˋ:`太態汰泰溙燤鈦`,ㄊㄠ:`嫍幍弢慆掏搯槄滔濤絛縚韜饕`,ㄊㄠˇ:`討`,ㄊㄠˊ:`匋咷啕桃檮洮淘祹綯萄蜪逃醄鋾錭陶鞀駣騊`,ㄊㄠˋ:`套`,ㄊㄡ:`偷媮鋀`,ㄊㄡˇ:`妵敨紏蘣黈`,ㄊㄡˊ:`投緰頭骰`,ㄊㄡˋ:`透`,ㄊㄢ:`坍怹攤灘痑癱舑貪`,ㄊㄢˇ:`嗿坦忐憳暺毯菼袒襢醓鉭`,ㄊㄢˊ:`倓壇婒惔憛曇榃檀潭燂痰磹罈藫覃談譚譠貚郯醰錟顃餤`,ㄊㄢˋ:`傝僋嘆埮探歎湠炭碳舕賧`,ㄊㄤ:`湯羰薚蝪蹚鏜鐋鼞`,ㄊㄤˇ:`倘儻帑戃曭淌爣矘躺鎲钂`,ㄊㄤˊ:`唐堂塘搪棠榶樘橖溏漟煻瑭磄糖膛蓎螗螳赯踼醣鎕闛餳鶶`,ㄊㄤˋ:`摥燙趟`,ㄊㄥ:`熥`,ㄊㄥˊ:`滕疼痋籐縢藤螣謄邆騰`,ㄊㄥˋ:`霯`,ㄊㄧ:`剔擿梯踢鷈`,ㄊㄧˇ:`体體`,ㄊㄧˊ:`偍厗啼崹徲惿提稊綈緹荑蕛蝭褆謕趧蹄醍銻鍗題騠鯷鵜鶗鶙鷤`,ㄊㄧˋ:`倜剃嚏屜悌悐惕揥替楴殢洟涕瓋籊薙裼褅趯逖`,ㄊㄧㄝ:`帖怗聑貼`,ㄊㄧㄝˇ:`僣蛈銕鐵驖鴩`,ㄊㄧㄝˋ:`呫餮`,ㄊㄧㄠ:`佻庣恌挑祧`,ㄊㄧㄠˇ:`嬥宨斢朓窕窱脁誂`,ㄊㄧㄠˊ:`岧條祒笤芀蓨蜩趒迢鎥鞗髫鯈鰷齠`,ㄊㄧㄠˋ:`眺糶絩覜跳`,ㄊㄧㄢ:`天婖添酟`,ㄊㄧㄢˇ:`倎忝悿晪殄淟琠痶腆舔賟錪靦餂`,ㄊㄧㄢˊ:`填屇恬搷沺湉甜田畋盷磌窴緂菾鈿闐鷏`,ㄊㄧㄢˋ:`掭瑱睼`,ㄊㄧㄥ:`听廳桯汀烴綎聽艼`,ㄊㄧㄥˇ:`侹圢娗挺梃烶珽町脡艇頲`,ㄊㄧㄥˊ:`亭停婷嵉庭廷楟榳渟筳聤莛葶蜓蝏閮霆鼮`,ㄊㄨ:`唋嶀怢捸涋湥禿葖鵚鼵`,ㄊㄨˇ:`吐土釷`,ㄊㄨˊ:`凸圖塗屠峹嵞廜徒悇捈梌涂潳瘏稌突筡腯荼蒤跿途酴鍎駼鵌鶟鷋鷵`,ㄊㄨˋ:`兔堍菟鵵`,ㄊㄨㄛ:`乇侂托扡拖挩沰脫莌託飥魠`,ㄊㄨㄛˇ:`妥嫷庹橢鬌`,ㄊㄨㄛˊ:`佗坨堶岮柁橐沱砣碢紽袉跎酡陀馱駝驒鮀鴕鼉`,ㄊㄨㄛˋ:`唾柝毤毻籜蘀跅`,ㄊㄨㄟ:`推蓷藬`,ㄊㄨㄟˇ:`俀僓腿`,ㄊㄨㄟˊ:`弚穨蹪隤頹魋`,ㄊㄨㄟˋ:`侻蛻褪退駾`,ㄊㄨㄢ:`湍煓貒`,ㄊㄨㄢˊ:`剸團慱摶槫漙篿糰鏄鷒鷻`,ㄊㄨㄢˋ:`彖褖`,ㄊㄨㄣ:`吞啍旽暾涒焞`,ㄊㄨㄣˇ:`畽`,ㄊㄨㄣˊ:`坉屯忳臀芚豚軘飩魨`,ㄊㄨㄥ:`炵痌蓪通`,ㄊㄨㄥˇ:`捅桶筒統`,ㄊㄨㄥˊ:`仝佟僮同哃彤曈朣桐橦氃浵潼烔犝狪獞瞳穜童筩粡膧茼詷赨酮鉖銅餇鮦`,ㄊㄨㄥˋ:`慟痛衕`,ㄋˋㄍ:`嗯`,ㄋㄚˇ:`哪`,ㄋㄚˊ:`拏拿挐`,ㄋㄚˋ:`吶妠娜捺笝納肭衲豽貀軜那鈉魶`,ㄋㄜˋ:`眲訥`,"ㄋㄜ˙":`呢`,ㄋㄞˇ:`乃倷奶妳嬭氖艿迺釢`,ㄋㄞˊ:`孻摨`,ㄋㄞˋ:`佴奈柰渿耏耐螚褦錼鼐`,ㄋㄟˇ:`娞腇餒`,ㄋㄟˋ:`內氝`,ㄋㄠ:`孬`,ㄋㄠˇ:`惱獶獿瑙腦`,ㄋㄠˊ:`呶夒峱嶩怓撓猱碙蟯譊鐃`,ㄋㄠˋ:`淖臑鬧`,ㄋㄡˊ:`羺`,ㄋㄡˋ:`檽獳耨鎒`,ㄋㄢ:`囡`,ㄋㄢˇ:`戁揇湳腩蝻赧`,ㄋㄢˊ:`南喃抩暔柟楠男莮萳諵難`,ㄋㄢˋ:`婻`,ㄋㄣˋ:`嫩恁`,ㄋㄤ:`囔`,ㄋㄤˇ:`擃攮曩灢`,ㄋㄤˊ:`囊蠰譨鬞`,ㄋㄤˋ:`齉`,ㄋㄥˊ:`能`,ㄋㄧ:`妮`,ㄋㄧˇ:`你儗抳擬旎晲柅檷狔苨薿鈮隬馜`,ㄋㄧˊ:`倪坭婗尼屔怩泥淣猊秜臡蜺觬跜輗郳霓鯢麑齯`,ㄋㄧˋ:`匿堄嫟惄昵暱溺睨縌膩誽迡逆`,ㄋㄧㄝ:`捏`,ㄋㄧㄝˊ:`苶`,ㄋㄧㄝˋ:`喦嚙囁囓孽嵲嶭巕摰敜槷櫱涅篞糱聶臬臲蠥讘踂踗踙躡鎳鑈鑷钀闑隉顳齧`,ㄋㄧㄠˇ:`嫋嬝嬲蔦裊褭鳥`,ㄋㄧㄠˋ:`尿`,ㄋㄧㄡ:`妞`,ㄋㄧㄡˇ:`忸扭炄狃紐莥鈕`,ㄋㄧㄡˊ:`牛`,ㄋㄧㄢ:`拈蔫`,ㄋㄧㄢˇ:`捻撚攆涊淰碾簐跈蹍躎輦`,ㄋㄧㄢˊ:`哖年鯰黏`,ㄋㄧㄢˋ:`唸姩廿念`,ㄋㄧㄣˇ:`拰`,ㄋㄧㄣˊ:`您`,ㄋㄧㄤˊ:`娘孃`,ㄋㄧㄤˋ:`釀`,ㄋㄧㄥˊ:`儜凝嚀嬣宁寍寧擰檸獰甯聹苧薴鑏鸋`,ㄋㄧㄥˋ:`佞泞濘`,ㄋㄨˇ:`努弩砮`,ㄋㄨˊ:`奴孥笯駑`,ㄋㄨˋ:`怒`,ㄋㄨㄛˇ:`橠`,ㄋㄨㄛˊ:`儺挪梛`,ㄋㄨㄛˋ:`喏懦懧搦糑糯諾逽`,ㄋㄨㄢˇ:`暖渜煖餪`,ㄋㄨㄢˊ:`奻`,ㄋㄨㄥˇ:`繷`,ㄋㄨㄥˊ:`儂噥濃穠膿襛農醲`,ㄋㄨㄥˋ:`弄齈`,ㄋㄩˇ:`女籹釹`,ㄋㄩˋ:`恧朒衄`,ㄋㄩㄝˋ:`瘧虐`,ㄌㄚ:`垃拉搚柆翋菈邋`,ㄌㄚˇ:`喇藞`,ㄌㄚˊ:`旯砬`,ㄌㄚˋ:`剌揧楋瘌腊臘蜡蠟辣鑞鬎`,"ㄌㄚ˙":`啦鞡`,ㄌㄜˋ:`仂叻扐樂氻泐砳竻阞鰳`,"ㄌㄜ˙":`了`,ㄌㄞˊ:`來崍庲徠棶淶箂萊郲錸騋鯠鶆`,ㄌㄞˋ:`唻瀨癩睞籟藾賚賴`,ㄌㄟ:`勒`,ㄌㄟˇ:`儡壘樏櫐灅癗磊磥礨絫耒蕾藟蠝誄讄鑸鸓`,ㄌㄟˊ:`儽壨嫘擂檑櫑欙瓃畾礌礧縲纍罍羸蔂蘲虆轠鐳雷`,ㄌㄟˋ:`淚禷累纇肋蘱酹銇頛類`,ㄌㄠ:`撈`,ㄌㄠˇ:`佬咾姥恅栳狫老荖轑銠`,ㄌㄠˊ:`僗勞嘮嶗浶牢癆簩蟧醪鐒顟`,ㄌㄠˋ:`嫪橯澇烙軂酪`,ㄌㄡ:`瞜`,ㄌㄡˇ:`塿嶁摟簍`,ㄌㄡˊ:`僂嘍婁廔慺樓漊熡耬艛蔞螻謱鞻髏`,ㄌㄡˋ:`漏瘺鏤陋`,ㄌㄢˇ:`壈嬾懶攬欖浨灠爦纜覽醂顲`,ㄌㄢˊ:`婪嵐惏攔斕欄欗瀾灆灡籃籣藍蘭襤襴譋讕躝闌`,ㄌㄢˋ:`嚂濫爁爛糷鑭`,ㄌㄤ:`啷`,ㄌㄤˇ:`塱朗烺誏`,ㄌㄤˊ:`廊桹榔欴狼琅瑯硠稂筤蜋螂郎鋃鎯駺`,ㄌㄤˋ:`埌崀浪莨蒗閬`,ㄌㄥˇ:`冷`,ㄌㄥˊ:`崚棱楞稜薐輘`,ㄌㄥˋ:`倰堎愣睖踜`,ㄌㄧ:`哩`,ㄌㄧˇ:`俚娌李欚浬澧理禮粴裡豊邐醴里鋰鯉鱧`,ㄌㄧˊ:`剺劙厘喱嫠孋孷廲斄杝梨梩樆漓灕犁狸琍璃离筣篱籬縭纚罹菞蔾藜蘺蜊蠡蠫褵謧貍醨鑗離驪鯬鱺鵹鸝黎黧`,ㄌㄧˋ:`例俐儮儷利力勵厤厲吏唎唳嚦塛壢娳屴岦悷慄戾搮攦攭曆曞朸栗櫟櫪欐歷沴溧濿瀝犡猁瑮瓅瓥痢癘皪盭砅磿礪礫禲秝立笠篥粒糲綟苙荔莉蒚蒞藶蚸蜧蝷蠣觻詈讈赲躒轢轣酈鎘隸靂靋鬁鱱鱳鴗鷅麗麜`,ㄌㄧㄚˇ:`倆`,ㄌㄧㄝˇ:`咧`,ㄌㄧㄝˋ:`儠冽列劣哷埒姴峛捩擸栵洌烈犣獵睙脟茢蛚裂趔躐迾颲鬣鮤鴷`,ㄌㄧㄠ:`撩`,ㄌㄧㄠˇ:`憭蓼鄝釕镽`,ㄌㄧㄠˊ:`僚嘹嫽寥寮屪嵺嶚憀敹暸橑漻潦燎獠療簝繚聊膋膫蟟豂遼鐐飉鷯`,ㄌㄧㄠˋ:`尥廖撂料炓瞭窷`,ㄌㄧㄡ:`溜蹓`,ㄌㄧㄡˇ:`嬼柳珋綹罶`,ㄌㄧㄡˊ:`劉媹嵧懰旒榴流瀏琉留瘤硫蓅藰蟉裗鎏鎦鏐飀騮鰡鶹麍`,ㄌㄧㄡˋ:`六塯廇磟翏遛雡霤飂餾鷚`,ㄌㄧㄢˇ:`嬚摙斂璉羷臉蘞襝鄻`,ㄌㄧㄢˊ:`嗹奩帘廉怜憐槤溓漣濂磏簾縺翴聯蓮薕蠊褳覝謰蹥連鎌鐮鬑鰱`,ㄌㄧㄢˋ:`僆堜戀楝殮浰湅澰瀲煉練萰鍊鏈`,ㄌㄧㄣ:`拎`,ㄌㄧㄣˇ:`亃凜廩懍檁菻`,ㄌㄧㄣˊ:`壣嶙暽林淋潾燐琳璘痳瞵碄磷箖粼繗翷臨轔遴鄰鏻霖驎鱗麟`,ㄌㄧㄣˋ:`僯吝橉焛甐疄膦藺賃蹸躪閵`,ㄌㄧㄤˇ:`兩啢緉裲魎`,ㄌㄧㄤˊ:`俍梁椋樑涼粱糧綡良輬`,ㄌㄧㄤˋ:`亮喨悢晾湸諒踉輛量`,ㄌㄧㄥˇ:`岭嶺領`,ㄌㄧㄥˊ:`伶凌囹坽夌姈婈彾昤柃櫺欞泠淩澪爧狑玲琌瓴皊砱笭綾羚翎聆舲苓菱蔆蕶蘦蛉裬詅軨酃醽鈴錂陵零霝靈駖鯪鴒齡`,ㄌㄧㄥˋ:`令另呤炩`,ㄌㄨ:`謢`,ㄌㄨˇ:`嚕擄擼櫓氌滷磠艣蓾虜鏀鐪魯鹵`,ㄌㄨˊ:`嚧壚廬攎櫨瀘爐玈璷盧籚纑罏臚艫蘆蠦轤鑪顱鱸鸕`,ㄌㄨˋ:`僇坴塶廘彔戮摝淕淥漉潞熝琭璐甪盝睩硉碌祿稑穋簏簬籙菉蔍蕗螰賂路踛蹗輅轆逯醁錄錴鏕陸露騄鯥鵱鷺鹿麓`,ㄌㄨㄛ:`囉`,ㄌㄨㄛˇ:`剆瘰臝蓏蠃裸`,ㄌㄨㄛˊ:`儸欏玀籮羅腡蘿螺覶邏鏍鑼騾鸁`,ㄌㄨㄛˋ:`峈摞洛漯濼犖珞絡纙落雒駱鮥鵅`,ㄌㄨㄢˇ:`卵`,ㄌㄨㄢˊ:`圞奱孌孿巒攣曫欒灤癵羉臠鑾鸞`,ㄌㄨㄢˋ:`亂`,ㄌㄨㄣ:`掄`,ㄌㄨㄣˇ:`碖稐`,ㄌㄨㄣˊ:`侖倫圇崙惀棆淪綸菕蜦踚輪錀陯`,ㄌㄨㄣˋ:`溣論`,ㄌㄨㄥˇ:`儱壟攏篢隴`,ㄌㄨㄥˊ:`嚨巃曨朧櫳瀧瓏癃矓礱窿籠聾蘢蠪蠬襱豅躘鏧鑨隆靇鸗龍龒`,ㄌㄨㄥˋ:`哢徿梇`,ㄌㄩˇ:`侶儢呂屢履挔捋旅梠祣穭絽縷膂褸郘鋁`,ㄌㄩˊ:`櫚氀膢藘閭驢鷜`,ㄌㄩˋ:`勴垏嵂律慮氯濾率綠繂膟葎鑢`,ㄌㄩㄝˋ:`掠擽略鋝`,ㄍㄚ:`嘎旮`,ㄍㄚˇ:`尕`,ㄍㄚˊ:`噶釓`,ㄍㄚˋ:`尬`,ㄍㄜ:`仡割咯哥圪戈擱歌滒犵疙肐胳袼鴐鴿`,ㄍㄜˇ:`哿舸`,ㄍㄜˊ:`佮嗝塥愅挌搿格滆獦膈茖葛觡輵轕閣閤隔革鞈鞷韐騔骼鬲鮯`,ㄍㄜˋ:`個各硌箇虼鉻`,ㄍㄞ:`侅垓峐祴絯荄該豥賅賌陔`,ㄍㄞˇ:`改`,ㄍㄞˋ:`丐戤摡杚概溉瓂蓋鈣阣隑`,ㄍㄟˇ:`給`,ㄍㄠ:`槔櫜滜皋睾篙糕羔膏韟高鷎鼛`,ㄍㄠˇ:`搞暠杲槁檺稿縞`,ㄍㄠˋ:`勂告祰筶誥郜鋯`,ㄍㄡ:`佝勾溝篝簼緱袧鉤韝`,ㄍㄡˇ:`岣枸狗笱耇芶苟蚼`,ㄍㄡˋ:`冓垢夠姤媾彀搆构構茩覯詬購遘雊`,ㄍㄢ:`坩尷杆柑泔漧玕甘疳矸竿筸肝酐鳱`,ㄍㄢˇ:`感敢桿橄澉皯稈笴簳赶趕鰔`,ㄍㄢˋ:`凎干幹旰榦淦灨盰紺詌贛骭`,ㄍㄣ:`根跟`,ㄍㄣˇ:`艮`,ㄍㄣˊ:`哏`,ㄍㄣˋ:`亙揯茛`,ㄍㄤ:`剛堈堽岡棡犅疘矼綱缸罡肛釭鋼`,ㄍㄤˇ:`崗港`,ㄍㄤˋ:`杠槓`,ㄍㄥ:`庚浭緪羹耕菮賡鶊`,ㄍㄥˇ:`哽埂挭梗綆耿郠骾鯁`,ㄍㄥˋ:`堩更`,ㄍㄨ:`估呱咕姑嫴孤柧橭沽泒箍箛罛菇菰蓇蛄觚軱辜酤鈲鮕鴣`,ㄍㄨˇ:`古唃啒嘏夃尳愲扢榖榾汩淈濲瀔牯盬瞽穀縎罟羖股臌薣蛌蠱詁谷轂鈷骨鼓`,ㄍㄨˊ:`鶻`,ㄍㄨˋ:`僱凅固堌崮故梏棝牿痼稒錮雇顧`,ㄍㄨㄚ:`刮劀栝瓜緺胍蝸趏颳騧鴰`,ㄍㄨㄚˇ:`剮寡`,ㄍㄨㄚˋ:`卦挂掛絓罣罫褂詿`,ㄍㄨㄛ:`咼嘓堝墎崞彉濄瘑聒蟈郭鍋`,ㄍㄨㄛˇ:`惈果槨淉猓粿蜾裹褁輠錁鐹`,ㄍㄨㄛˊ:`國幗慖漍聝膕蔮虢馘`,ㄍㄨㄛˋ:`過`,ㄍㄨㄞ:`乖摑`,ㄍㄨㄞˇ:`拐枴柺`,ㄍㄨㄞˋ:`夬怪`,ㄍㄨㄟ:`圭媯嫢巂摫槻槼歸珪瑰皈瞡硅窐茥螝規邽閨騩鮭龜`,ㄍㄨㄟˇ:`佹匭厬垝姽宄庋庪晷朹湀癸祪簋蛫蟡觤詭軌鬼`,ㄍㄨㄟˋ:`劊劌匱嶡撌昋柜桂槶檜櫃癐瞶禬筀簂襘貴跪鱖`,ㄍㄨㄢ:`倌冠官棺瘝觀關鰥鱞`,ㄍㄨㄢˇ:`琯痯筦管莞錧館`,ㄍㄨㄢˋ:`丱悹悺慣摜毌涫灌爟瓘盥矔祼罐貫鑵雚鱹鸛`,ㄍㄨㄣˇ:`惃滾緄蔉袞輥鯀`,ㄍㄨㄣˋ:`棍璭睔`,ㄍㄨㄤ:`光垙桄洸炚烡珖胱茪銧`,ㄍㄨㄤˇ:`廣獷臩`,ㄍㄨㄤˋ:`俇撗臦逛`,ㄍㄨㄥ:`供公功匑塨宮工幊弓恭愩攻肱蚣觥躬龔`,ㄍㄨㄥˇ:`廾拱拲栱汞珙輁鞏`,ㄍㄨㄥˋ:`共羾貢`,ㄎㄚ:`咖喀擖`,ㄎㄚˇ:`佧卡鉲`,ㄎㄜ:`匼嗑嵙搕柯棵榼樖牁犐珂瞌砢磕科稞窠苛薖蝌趷軻鈳顆髁`,ㄎㄜˇ:`可坷岢嵑嶱敤渴`,ㄎㄜˊ:`殼翗`,ㄎㄜˋ:`克刻勀堁客恪氪溘緙艐課騍`,"ㄎㄜ˙ㄧ":`剋`,ㄎㄞ:`揩開`,ㄎㄞˇ:`凱剴塏愷慨暟楷輆鍇鎧闓颽`,ㄎㄞˋ:`勓愒愾欬烗鎎`,ㄎㄠ:`尻`,ㄎㄠˇ:`拷攷栲洘烤考`,ㄎㄠˋ:`犒銬靠`,ㄎㄡ:`彄摳芤`,ㄎㄡˇ:`口`,ㄎㄡˋ:`叩寇扣滱瞉筘簆蔻釦鷇`,ㄎㄢ:`刊勘堪嵁戡龕`,ㄎㄢˇ:`侃坎埳檻欿歁砍竷莰轗顑`,ㄎㄢˋ:`墈崁看瞰矙磡衎闞`,ㄎㄣˇ:`啃墾懇肯豤錹齦`,ㄎㄣˋ:`掯裉`,ㄎㄤ:`嫝康慷漮糠鏮`,ㄎㄤˊ:`扛摃`,ㄎㄤˋ:`亢伉匟囥抗炕犺邟鈧閌`,ㄎㄥ:`吭坑挳牼硜硻誙銵鍞鏗阬`,ㄎㄨ:`刳哭堀枯桍矻窟跍骷`,ㄎㄨˇ:`狜苦`,ㄎㄨˋ:`嚳庫瘔褲趶酷`,ㄎㄨㄚ:`夸姱舿誇`,ㄎㄨㄚˇ:`侉垮銙`,ㄎㄨㄚˋ:`挎胯跨骻`,ㄎㄨㄛˋ:`廓懖括擴筈萿葀蛞闊霩鞹韕髺鬠`,ㄎㄨㄞˇ:`蒯`,ㄎㄨㄞˋ:`儈噲塊廥快旝獪筷膾鄶鱠`,ㄎㄨㄟ:`刲巋悝盔窺聧蘬虧闚顝`,ㄎㄨㄟˇ:`傀煃跬蹞頍`,ㄎㄨㄟˊ:`夔奎戣揆暌楏楑櫆犪睽葵藈躨逵鄈鍷頄頯馗騤魁`,ㄎㄨㄟˋ:`喟嘳媿嬇愧憒樻欳潰簣聵腃蕢鐀餽饋`,ㄎㄨㄢ:`寬臗髖`,ㄎㄨㄢˇ:`款窾`,ㄎㄨㄣ:`坤崑昆晜焜猑琨菎褌錕騉髡鯤鶤`,ㄎㄨㄣˇ:`壼悃捆梱硱稛綑裍閫`,ㄎㄨㄣˋ:`困涃睏`,ㄎㄨㄤ:`劻匡恇洭筐誆`,ㄎㄨㄤˇ:`夼懭`,ㄎㄨㄤˊ:`狂狅誑軠鵟`,ㄎㄨㄤˋ:`壙曠框況爌眶矌礦穬絖纊貺軦鄺`,ㄎㄨㄥ:`崆悾涳硿空箜錓`,ㄎㄨㄥˇ:`倥孔恐`,ㄎㄨㄥˋ:`控鞚`,"ㄏㄇ˙":`噷`,ㄏㄚ:`哈`,ㄏㄚˊ:`蛤`,ㄏㄜ:`呵喝欱訶`,ㄏㄜˊ:`何劾合和姀峆敆曷核楁毼河涸渮澕熆盉盍盒礉禾篕籺紇翮荷菏蚵螛覈郃鉌鑉闔鞨頜魺鶡麧齕龢`,ㄏㄜˋ:`佫嗃壑煂熇翯褐謞賀赫鶴`,ㄏㄞ:`咍咳嗨`,ㄏㄞˇ:`海烸胲醢`,ㄏㄞˊ:`孩還頦骸`,ㄏㄞˋ:`亥嗐妎害氦餀駭駴`,ㄏㄟ:`嘿潶黑`,ㄏㄠ:`嚆茠蒿薅薧`,ㄏㄠˇ:`好郝`,ㄏㄠˊ:`嗥嚎壕毫濠籇蚝蠔諕譹豪貉`,ㄏㄠˋ:`哠悎昊昦浩淏滈澔灝皓皜皞秏耗薃號鄗鎬顥鰝`,ㄏㄡ:`齁`,ㄏㄡˇ:`吼`,ㄏㄡˊ:`侯喉猴瘊篌翭翵葔鄇鍭餱鯸`,ㄏㄡˋ:`候厚后垕堠後洉逅郈鱟`,ㄏㄢ:`哻嫨憨歛蚶谽酣頇鼾`,ㄏㄢˇ:`喊罕蔊豃鬫`,ㄏㄢˊ:`函含咁唅寒嵅梒涵焓琀甝肣虷蜬邗邯鋡韓魽`,ㄏㄢˋ:`悍憾扞捍撖撼旱暵汗涆漢瀚焊熯睅翰菡蜭螒譀釬銲鋎閈雗頷顄馯駻鶾`,ㄏㄣˇ:`佷很狠`,ㄏㄣˊ:`拫痕鞎`,ㄏㄣˋ:`恨`,ㄏㄤ:`夯`,ㄏㄤˊ:`斻杭笐絎航苀蚢貥迒頏魧`,ㄏㄤˋ:`沆`,ㄏㄥ:`亨哼啈脝`,ㄏㄥˊ:`姮恆桁橫烆珩胻蘅衡鑅`,ㄏㄨ:`乎匢呼垀寣幠忽惚昒曶歑淴滹膴虍虖謼`,ㄏㄨˇ:`唬汻滸琥虎`,ㄏㄨˊ:`嘝囫壺媩弧抇搰斛楜槲湖瀫焀狐猢瑚糊縠胡葫蝴螜衚觳醐餬鬍魱鰗鵠鶘鶦`,ㄏㄨˋ:`互冱嗀婟嫭嫮岵怙戶戽扈昈枑楛槴沍滬熩瓠祜笏綔芐蔰護鄠鍙雽韄頀`,ㄏㄨㄚ:`嘩砉花蘤錵`,ㄏㄨㄚˊ:`姡搳滑猾華螖譁釪釫鋘鏵驊鷨`,ㄏㄨㄚˋ:`划劃化嫿嬅崋摦杹槬樺澅畫繣觟話諙`,ㄏㄨㄛ:`吙嚄攉豁騞`,ㄏㄨㄛˇ:`伙夥漷火鈥`,ㄏㄨㄛˊ:`佸活秮`,ㄏㄨㄛˋ:`惑或捇掝曤檴沎湱濩瀖獲眓矐禍穫臛藿蠖謋貨鑊霍靃`,ㄏㄨㄞˊ:`徊怀懷槐櫰淮瀤蘹褢褱踝`,ㄏㄨㄞˋ:`咶坏壞蘾`,ㄏㄨㄟ:`噅徽恢拻揮撝暉楎洃灰煇禈翬蘳褘詼豗輝隓隳鰴麾`,ㄏㄨㄟˇ:`悔檓毀毇燬虺譭`,ㄏㄨㄟˊ:`佪回恛洄烠痐茴蚘蛔迴`,ㄏㄨㄟˋ:`匯卉喙嘒噦圚孈彗彙徻恚惠慧憓晦會槥橞檅潓澮濊燴獩璯瘣瞺硊穢篲繢繪翽芔蔧蕙薈薉藱蟪誨諱譓譿賄鏸鐬闠顪餯`,ㄏㄨㄢ:`嚾懽歡犿獾讙酄驩鴅`,ㄏㄨㄢˇ:`攌緩`,ㄏㄨㄢˊ:`圜嬛寰峘桓洹澴狟環瓛綄繯羦荁萑豲貆轘郇鍰鐶闤雈鬟`,ㄏㄨㄢˋ:`喚奐宦幻患換擐浣渙漶澣煥瑍瘓睆肒豢逭鯇`,ㄏㄨㄣ:`婚惛昏棔殙涽睧睯葷閽`,ㄏㄨㄣˊ:`梡渾琿繉轋餛魂鼲`,ㄏㄨㄣˋ:`倱圂慁掍混溷觨諢`,ㄏㄨㄤ:`巟慌肓荒衁`,ㄏㄨㄤˇ:`幌怳恍晃炾熀謊`,ㄏㄨㄤˊ:`偟凰喤堭媓崲徨惶楻湟潢煌熿獚璜皇磺穔篁篊簧艎葟蝗蟥諻趪遑鍠隍韹餭騜鰉鷬黃`,ㄏㄨㄤˋ:`榥滉皝鎤`,ㄏㄨㄥ:`吽哄嚝揈渹灴烘焢薨訇谾輷轟鍧`,ㄏㄨㄥˇ:`嗊`,ㄏㄨㄥˊ:`仜吰妅宏弘彋汯泓洪浤渱玒竑竤紅紘翃耾苰葒蕻虹谹谼鈜鋐閎霐霟鞃魟鴻黌`,ㄏㄨㄥˋ:`澋澒訌闀鬨`,ㄐㄧ:`丌乩刉剞勣咭唧嘰圾基墼姬屐嵇敧机枅機櫅毄激犄璣畸畿癪磯禨稘稽積笄箕簊緝績羇羈肌芨虀觭譏跡蹟躋鄿銈錤鐖鑇隮雞鞿飢饑鸄齎齏`,ㄐㄧˇ:`丮几妀己幾戟掎撠擠泲穖脊虮蟣魕麂`,ㄐㄧˊ:`亟伋佶偮即及吉堲塉姞嫉岌嶯庴彶忣急戢揤擊极棘楫極槉橶殛汲湒潗濈狤疾瘠笈籍級耤膌蒺蕀蕺藉螏襋觙谻趌踖蹐躤輯轚銡鏶集霵鶺鷑`,ㄐㄧˋ:`伎偈冀劑嚌塈妓季寂寄徛忌悸惎懻技旡既暨暩檕洎漃漈濟瀱痵癠祭稷穄穊穧紀紒繼罽臮芰茍茤蔇薊薺蘮蘻裚覬計記誋諅跽際霽驥髻鬾鯚鰶鰿鱀鱭鵋齌`,ㄐㄧㄚ:`伽佳傢加嘉夾家抸枷梜毠泇浹犌猳珈痂笳耞茄葭袈豭貑跏迦鉿鎵麚`,ㄐㄧㄚˇ:`假婽岬徦斝椵榎檟玾甲瘕胛賈鉀`,ㄐㄧㄚˊ:`唊恝戛扴莢蛺裌跲郟鋏頰鴶鵊`,ㄐㄧㄚˋ:`价價嫁幏架稼駕`,ㄐㄧㄝ:`喈嗟接揭椄湝痎癤皆秸菨蝔街謯階鞂鶛`,ㄐㄧㄝˇ:`姐媎檞解`,ㄐㄧㄝˊ:`倢傑劫劼婕孑尐岊崨嵥巀幯截拮捷昅杰桀桔楬楶榤洁滐潔疌睫碣竭節結絜羯蝍蠽衱袺訐詰踕迼鉣鍻鞊鮚`,ㄐㄧㄝˋ:`介借吤屆岕悈戒犗玠界疥砎芥蚧蛶褯誡骱`,ㄐㄧㄠ:`交僬嘄姣嬌嶕憍椒澆焦燋礁穚簥膠膲艽茭蕉蛟蟭跤轇郊鐎驕鮫鵁鷦鷮`,ㄐㄧㄠˇ:`佼僥儌剿劋恔憿捁摷撟攪敿曒湫灚煍狡皎皦矯笅絞繳腳蟜角譑鉸餃鱎`,ㄐㄧㄠˋ:`叫嘂噭嬓嶠徼挍教斠滘潐獥珓皭窌窖譥趭較轎酵醮釂`,ㄐㄧㄡ:`勼啾揂揪揫摎朻樛牞糾萛赳鬮鳩`,ㄐㄧㄡˇ:`久九氿灸玖酒韭`,ㄐㄧㄡˋ:`僦咎就廄慦捄救柩殧疚究臼舅舊鯦鷲麔`,ㄐㄧㄢ:`兼堅奸姦尖幵惤戔搛椷櫼殲湔瀸煎熞熸牋犍猏瑊監礛箋緘縑肩艱菅菺葌蒹蕑虃豜鑯間鞬韉餰鰹鳽鵳鶼麉`,ㄐㄧㄢˇ:`儉剪劗囝堿戩挸揀揃撿暕柬檢減湕瑐瞼筧簡籛繭翦茧藆襉襺謇譾趼蹇鬋鰎鹼`,ㄐㄧㄢˋ:`件俴健僭劍寋建栫楗榗毽洊漸澗濺瀳牮珔瞷箭糋腱艦荐葥蔪薦螹袸見諓諫賤踐轞鋻鍵鐱鑑鑒鑳餞`,ㄐㄧㄣ:`今埐堻嶜巾惍斤津珒矜筋紟衿襟觔金釿`,ㄐㄧㄣˇ:`僅儘堇巹廑槿瑾盡緊菫蓳謹錦饉`,ㄐㄧㄣˋ:`伒僸勁噤嚍墐妗嬧寖搢晉枃殣浸溍濜煡燼璡璶祲禁縉藎覲賮贐近進靳`,ㄐㄧㄤ:`僵姜將橿殭江漿疆礓翞茳薑螿豇韁`,ㄐㄧㄤˇ:`傋槳獎耩膙蔣講顜`,ㄐㄧㄤˋ:`匠嵹弶彊洚糨絳袶謽醬降`,ㄐㄧㄥ:`京兢婛巠惊旌旍晶涇睛粳精經荊莖菁驚鯨鵛鶁鶄麠鼱`,ㄐㄧㄥˇ:`丼井儆剄幜憬憼景暻汫璟璥蟼警阱頸`,ㄐㄧㄥˋ:`俓倞凈境婧弳徑敬桱淨獍痙竟竫競脛逕鏡靖靚靜`,ㄐㄩ:`匊娵居崌拘挶掬梮椐泃涺狙琚疽痀砠罝腒苴蜛裾趄踘鋦陱雎鞠鞫駒鮈鶋`,ㄐㄩˇ:`咀椇櫸沮矩筥舉莒蒟踽齟`,ㄐㄩˊ:`侷僪局椈橘淗湨焗犑狊菊蘜趜跼輂郹閰駶驧鵙鵴鶪鼰鼳`,ㄐㄩˋ:`俱倨具劇句埧壉姖寠屨岠巨怐怚懅懼拒据據洰澽炬犋秬窶粔耟聚苣虡蚷袓詎豦貗跙距踞躆遽醵鉅鋸鐻颶駏`,ㄐㄩㄝ:`噘屩撅蹻`,ㄐㄩㄝˊ:`倔傕劂匷厥嚼孓崛彏憰戄抉捔掘攫桷橛殌決泬爝爵獗玃玦玨瘚矍絕臄芵蕝蕨虳蚗蟨覺觖觼訣譎貜赽趉趹蹶躩鈌鐍钁駃鴃鶌鷢`,ㄐㄩㄢ:`娟捐涓焆脧蠲裐鐫鵑`,ㄐㄩㄢˇ:`卷帣捲臇菤錈`,ㄐㄩㄢˋ:`倦狷獧眷睊睠絭絹縳罥蔨鄄雋`,ㄐㄩㄣ:`君均桾皸碅莙菌蚐袀軍鈞鍕鮶麇`,ㄐㄩㄣˋ:`俊呁寯峻捃晙棞浚濬焌燇珺畯竣箘葰蜠郡餕駿鵔鵘`,ㄐㄩㄥ:`坰扃絅駉`,ㄐㄩㄥˇ:`冏囧泂浻炅炯煚熲燛窘褧迥`,ㄑㄧ:`七倛僛凄嘁妻娸悽慼戚攲柒栖桼棲榿欹欺沏淒漆緀萋蛣諆諿蹊迉郪鏚霋魌鶈`,ㄑㄧˇ:`乞啟婍屺杞棨綺芑豈起邔`,ㄑㄧˊ:`亓俟其圻埼奇岐岓崎忯懠掑旂旗期棋歧淇濝玂琦琪畦疧碕祁祇祈祺綦耆肵臍艩萁藄蘄蚑蚔蚚蜞蠐跂踑軝釮錡頎騎騏騹鬐鬿鯕鰭鵸鶀麒麡齊`,ㄑㄧˋ:`企咠唭器契忔憩栔棄槭气氣汔汽泣湆湇甈盵砌磧磩罊芞葺蟿訖迄鼜`,ㄑㄧㄚ:`掐袷`,ㄑㄧㄚˇ:`酠`,ㄑㄧㄚˋ:`冾帢恰愘殎洽硈髂`,ㄑㄧㄝˇ:`且`,ㄑㄧㄝˋ:`切厒妾怯愜挈朅洯竊篋緁藒蛪踥鍥鐑鯜`,ㄑㄧㄠ:`劁墝墽幧悄敲橇毃燆磽繑趬踍蹺郻鄡鍬鐰頝骹`,ㄑㄧㄠˇ:`巧愀髜`,ㄑㄧㄠˊ:`僑喬嘺嫶憔樵橋犞瞧礄荍菬蕎趫`,ㄑㄧㄠˋ:`俏峭帩撬撽竅翹誚譙躈鞘`,ㄑㄧㄡ:`丘坵媝恘楸秋緧萩蓲蚯蝵蟗蠤趥邱鞦鰍鶖`,ㄑㄧㄡˇ:`糗`,ㄑㄧㄡˊ:`俅唒囚崷巰梂殏毬求泅煪犰球璆盚紌絿莍虯蛷蝤裘觓觩訄賕逑遒酋釚銶鮂鯄鰽鼽`,ㄑㄧㄢ:`仟僉千奷婜岍愆慳扦掔搴攐攓檶櫏汧牽簽籤粁芊褰謙遷鈆鉛阡雃韆顅騫`,ㄑㄧㄢˇ:`凵嗛槏淺繾脥蜸譴遣`,ㄑㄧㄢˊ:`乾仱前墘媊岒忴扲拑掮揵榩潛灊箝羬蕁虔軡鈐鉗錢靬騚騝鰬黔黚`,ㄑㄧㄢˋ:`俔倩傔塹嵌慊棈槧欠歉篟綪縴芡茜蒨輤鰜`,ㄑㄧㄣ:`侵嶔欽綅衾親顉駸`,ㄑㄧㄣˇ:`坅寑寢昑梫笉螼鋟`,ㄑㄧㄣˊ:`勤噙埁嫀庈慬懃擒斳檎溱澿琴瘽禽秦耹芩芹菳蚙螓鈙雂靲鬵鳹`,ㄑㄧㄣˋ:`唚撳沁瀙菣藽`,ㄑㄧㄤ:`嗆嶈戕戧斨椌槍牄瑲羌腔蜣謒蹌蹡錆鎗鏘`,ㄑㄧㄤˇ:`墏搶繈羥襁鏹`,ㄑㄧㄤˊ:`嬙廧強檣漒牆薔蘠`,ㄑㄧㄤˋ:`唴熗羻`,ㄑㄧㄥ:`傾卿圊埥氫清蜻輕郬鑋青`,ㄑㄧㄥˇ:`廎漀請頃`,ㄑㄧㄥˊ:`勍情擎擏晴樈檠殑氰葝黥`,ㄑㄧㄥˋ:`凊慶掅碃磬箐綮罄謦靘`,ㄑㄩ:`佉區屈岨嶇抾敺曲浀祛紶胠蛆蛐袪詘趨軀镼阹驅髷魼鱋麴`,ㄑㄩˇ:`取娶竘蝺齲`,ㄑㄩˊ:`佢劬斪朐欋氍淭渠灈璩瞿磲籧絇翑胊臞菃葋蕖蘧螶蟝蠷蠼衢躣軥鴝鼩`,ㄑㄩˋ:`刞去呿覷趣闃麮鼁`,ㄑㄩㄝ:`炔缺蒛`,ㄑㄩㄝˊ:`瘸`,ㄑㄩㄝˋ:`卻埆塙愨搉榷皵硞确碏確碻礐礭闋闕雀鵲`,ㄑㄩㄢ:`圈弮恮悛棬鐉駩`,ㄑㄩㄢˇ:`汱烇犬畎綣虇`,ㄑㄩㄢˊ:`佺全埢姾婘巏惓拳權泉牷犈瑔痊筌絟縓荃蜷蠸觠詮跧踡輇醛銓顴鬈齤`,ㄑㄩㄢˋ:`券勸牶韏`,ㄑㄩㄣ:`囷峮逡`,ㄑㄩㄣˊ:`宭群裙`,ㄑㄩㄥˊ:`惸憌桏橩煢璚瓊瓗瞏穹窮笻筇舼藑藭蛩蛬赹跫邛銎`,ㄒㄧ:`俙傒僖兮凞吸唏嘻夕奚嬉屖嶲巇希徆徯恓悉悕惁扱晞晰曦析桸榽樨橀欷氥汐浠淅溪潝烯焟熄熙熹燨爔犀犧狶琋瘜皙睎硒磎礂稀穸窸粞緆羲翕肸膝莃菥蒠蜥螅螇蟋蠵西觿譆谿豨豯貕郗鄎酅醯釐釸鑴雟鵗鸂鼷`,ㄒㄧˇ:`喜囍屣徙枲歖洗漇璽禧縰葸蓰蟢諰謑蹝`,ㄒㄧˊ:`媳嶍席息惜昔槢檄習蓆薂襲覡謵郋錫鎴隰霫飁騱騽驨鰼`,ㄒㄧˋ:`係卌呬咥屭忥怬恄慀戲欯滊潟熂盻矽禊系細綌繫舄蕮虩衋覤赩郤釳闟隙餼鬩黖`,ㄒㄧㄚ:`呷煆瞎蝦颬`,ㄒㄧㄚˇ:`閜`,ㄒㄧㄚˊ:`俠匣峽暇柙烚狎狹珨瑕硤碬磍祫縖舝舺蕸赮轄遐鍜陜霞騢魻鶷黠`,ㄒㄧㄚˋ:`下嚇夏罅鏬`,ㄒㄧㄝ:`些揳楔歇猲蝎蠍`,ㄒㄧㄝˇ:`寫`,ㄒㄧㄝˊ:`偕劦勰協嗋垥奊愶拹挾擷攜斜熁燲瑎緳纈脅蝢襭諧邪鞋頡龤`,ㄒㄧㄝˋ:`伳偞偰僁卸媟屑屧嶰廨懈械榍榭泄洩渫澥瀉瀣灺焎燮獬祄紲絏繲薢薤蟹褉褻謝躞邂鞢韰齂齘齛齥`,ㄒㄧㄠ:`呺嘐嘵囂宵庨憢揱枵梟櫹歊毊消瀟灱猇獢痚痟硝穘窙簫綃翛膮萷蕭藃虈虓蟂蠨踃逍銷霄驍髇髐魈鴞鷍`,ㄒㄧㄠˇ:`小曉皛筱篠謏`,ㄒㄧㄠˊ:`崤殽洨淆筊郩`,ㄒㄧㄠˋ:`傚哮嘯孝效校涍熽笑肖詨`,ㄒㄧㄡ:`休修咻庥樇烋羞脙脩臹貅銝鎀饈髹鵂`,ㄒㄧㄡˇ:`朽滫潃糔`,ㄒㄧㄡˊ:`苬`,ㄒㄧㄡˋ:`嗅岫溴珛琇秀繡螑袖褎鏽`,ㄒㄧㄢ:`仙仚佡僊先嘕奾嬐孅屳廯忺憸掀攕暹杴枮氙珗祆秈纖薟褼襳躚銛韱馦鮮鶱`,ㄒㄧㄢˇ:`冼尟嶮幰搟攇毨灦烍燹獫獮玁禒筅蘚譣赻跣銑鍌險韅顯`,ㄒㄧㄢˊ:`伭咸唌啣妶娹嫌嫻弦憪撏涎澖癇礥絃胘舷蚿蛝誸諴賢銜閑閒鷳鷴鹹麙`,ㄒㄧㄢˋ:`僩壏姭娊峴憲撊晛涀瀗獻現睍粯糮線縣羡羨腺莧蜆豏鋧錎限陷霰餡鼸`,ㄒㄧㄣ:`妡廞心忻新昕杺欣歆炘盺芯薪訢辛鈊鋅鑫馨馫`,ㄒㄧㄣˇ:`伈`,ㄒㄧㄣˊ:`枔襑鐔`,ㄒㄧㄣˋ:`信囟焮舋釁阠`,ㄒㄧㄤ:`廂忀欀湘瓖相箱緗膷葙薌襄鄉鑲香驤`,ㄒㄧㄤˇ:`享想晑曏蠁響餉饗饟鯗`,ㄒㄧㄤˊ:`庠瓨祥翔詳`,ㄒㄧㄤˋ:`像向嚮姠巷橡缿萫蟓衖襐象銗鐌項鱌`,ㄒㄧㄥ:`垶惺星煋猩瑆箵腥蛵觲騂`,ㄒㄧㄥˇ:`擤醒`,ㄒㄧㄥˊ:`侀刑型娙形洐滎硎行邢鈃鉶鋞陘`,ㄒㄧㄥˋ:`倖姓婞幸性悻杏涬興荇莕`,ㄒㄩ:`吁噓墟嬃幁戌揟旴晇楈欨欻歔湑盱窢縃繻胥蕦虛蝑訏諝鑐需須頊驉鬚魆魖`,ㄒㄩˇ:`冔呴姁暊栩珝稰糈許詡鄦醑`,ㄒㄩˊ:`徐`,ㄒㄩˋ:`侐勖勗卹喣垿婿序怴恤慉敘旭昫殈沀洫漵烅烼煦獝瞁瞲絮緒續芧蓄藇藚訹酗銊鱮`,"ㄒㄩ˙":`蓿`,ㄒㄩㄝ:`削疶蒆薛靴`,ㄒㄩㄝˇ:`雪鱈`,ㄒㄩㄝˊ:`噱壆學岤嶨澩燢穴袕觷踅鷽`,ㄒㄩㄝˋ:`吷狘血謔趐`,ㄒㄩㄢ:`儇喧媗宣愃愋懁揎昍暄梋瑄矎禤翾萱萲蓒蝖蠉諠諼軒鋗鍹駽`,ㄒㄩㄢˇ:`咺晅烜癬選顈`,ㄒㄩㄢˊ:`嫙懸旋漩玄玹琁璇璿蜁`,ㄒㄩㄢˋ:`昡楥楦泫渲炫琄眩眴絢縼蔙衒袨讂贙鉉鏇鞙`,ㄒㄩㄣ:`勛勳塤壎曛焄熏燻獯矄纁臐蔒薰醺`,ㄒㄩㄣˊ:`噚尋峋巡循恂揗攳旬栒洵潯灥燅燖珣璕紃荀蟳詢鄩馴鱘`,ㄒㄩㄣˋ:`侚噀巽徇愻殉汛潠稄蕈訊訓迅迿遜`,ㄒㄩㄥ:`兄兇凶匈哅忷恟洶胸芎`,ㄒㄩㄥˊ:`熊雄`,ㄒㄩㄥˋ:`敻詗`,ㄓ:`之卮吱戠搘支枝梔椥榰汁汥泜知祗禔秖秪稙織肢胑胝脂臸芝蘵蜘衼隻鳷`,ㄓˇ:`只咫址坁徵恉扺指旨枳止汦沚淽疻祉紙芷藢衹趾軹酯阯黹`,ㄓˊ:`侄值埴執姪嬂慹摭植樴殖淔犆瓡直縶職膱蟙質跖蹠躑馽`,ㄓˋ:`乿偫傂制厔墆寘峙帙幟庢庤廌彘志忮懥懫扻挃摯擲擳晊智柣桎楖櫍櫛治洷滍滯瀄炙狾猘畤疐痔痣礩祑秩秷稚窒紩緻置翐膣至致蛭螲袟製覟觶誌豸贄跱躓輊迣郅銍鋕鑕阤陟雉駤騭騺鴙鷙`,ㄓㄚ:`吒哳喳奓扎抯挓柤楂樝渣皻觰譇齇`,ㄓㄚˇ:`厏眨砟苲鮓`,ㄓㄚˊ:`劄札煠蚻譗鍘閘`,ㄓㄚˋ:`乍搾柞榨溠炸痄蚱詐醡霅`,ㄓㄜ:`嫬蜇遮`,ㄓㄜˇ:`者褶赭鍺`,ㄓㄜˊ:`哲悊折摺晢矺砓磔粍虴蟄謫謺讋輒轍馲鮿`,ㄓㄜˋ:`柘浙淛潪蔗蟅這鷓`,ㄓㄞ:`捚摘齋`,ㄓㄞˇ:`窄`,ㄓㄞˊ:`宅檡`,ㄓㄞˋ:`債寨瘵砦`,ㄓㄠ:`啁妱招昭皽盄釗鉊鍣駋`,ㄓㄠˇ:`找沼爪瑵`,ㄓㄠˋ:`兆召垗旐曌棹櫂炤照狣笊罩肇詔趙鮡`,ㄓㄡ:`侜周喌婤州徟掫洲淍珘盩粥舟謅譸賙輈輖週銂騆鵃`,ㄓㄡˇ:`帚睭肘鯞`,ㄓㄡˊ:`妯碡軸`,ㄓㄡˋ:`僽冑咒咮噣宙晝甃皺籀紂縐胄詶酎駎驟`,ㄓㄢ:`惉旃栴氈沾瞻粘薝蛅詀詹譫邅霑饘驙魙鱣鸇`,ㄓㄢˇ:`嫸展嶄搌斬榐橏琖盞輾醆颭黵`,ㄓㄢˋ:`佔偡占戰棧湛站綻蘸虥譧輚轏驏`,ㄓㄣ:`偵寊斟桭楨榛樼潧獉珍瑧甄真砧碪禎禛箴籈胗臻葴蓁薽貞轃遉針鍼鱵`,ㄓㄣˇ:`抮枕畛疹眕稹紾縥袗裖診軫駗鬒黰`,ㄓㄣˋ:`侲挋振揕敶朕栚甽眹紖絼誫賑酖鎮陣震鴆`,ㄓㄤ:`傽嫜張彰慞暲樟漳獐璋章粻蟑遧鄣騿鱆`,ㄓㄤˇ:`仉掌漲長`,ㄓㄤˋ:`丈仗墇嶂帳幛扙杖瘴瞕粀脹賬障`,ㄓㄥ:`埩姃媜崝崢征怔掙炡烝爭猙癥眐睜箏篜聇蒸鉦錚鯖`,ㄓㄥˇ:`拯掟撜整晸氶糽`,ㄓㄥˋ:`塣幀政正症証諍證鄭`,ㄓㄨ:`侏朱株櫧櫫洙瀦珠硃絑茱蛛蝫蠩袾誅諸豬跦邾銖鮢鴸`,ㄓㄨˇ:`主囑拄斸渚煮矚罜陼麈`,ㄓㄨˊ:`孎欘泏灟燭瘃窋竹竺笁舳茿蠋蠾躅逐钃鱁`,ㄓㄨˋ:`佇住助壴嵀杼柱柷樦殶注炷疰眝砫祝祩筑箸築篫紵紸羜翥莇著蛀註貯跓軴鉒鑄馵駐麆`,ㄓㄨㄚ:`抓檛簻膼髽`,ㄓㄨㄛ:`倬拙捉桌棳涿穛穱蠿`,ㄓㄨㄛˊ:`卓啄啅圴彴擢斀斫斲梲椓櫡汋浞濁濯灂灼禚篧籗罬茁蠗諑謶酌鐲鵫鷟`,ㄓㄨㄞˇ:`跩`,ㄓㄨㄞˋ:`拽`,ㄓㄨㄟ:`椎追錐隹騅鵻`,ㄓㄨㄟˇ:`沝`,ㄓㄨㄟˋ:`墜娷惴甀畷硾綴縋膇諈贅轛醊錣鑆餟`,ㄓㄨㄢ:`塼嫥專瑼磚膞蟤諯鄟顓鱄`,ㄓㄨㄢˇ:`轉`,ㄓㄨㄢˋ:`僎囀撰瑑篆篹腞譔賺饌`,ㄓㄨㄣ:`宒窀肫諄迍`,ㄓㄨㄣˇ:`准埻準綧`,ㄓㄨㄣˋ:`稕訰`,ㄓㄨㄤ:`妝庄梉樁湷莊裝`,ㄓㄨㄤˋ:`壯戇撞焋狀`,ㄓㄨㄥ:`中伀妐彸忠柊炂盅籦終舯蔠螤螽衷鍾鐘鼨`,ㄓㄨㄥˇ:`冢塚尰煄种種腫踵`,ㄓㄨㄥˋ:`仲偅堹狆眾祌衶重`,ㄔ:`吃哧喫嗤媸摛攡瓻痴癡眵瞝笞絺胵蚩螭誺魑鴟黐齝`,ㄔˇ:`侈呎尺恥欼胣蚇袲褫豉鉹齒`,ㄔˊ:`墀弛持歭池漦箎篪茌荎蚳謘貾趍踟遲馳`,ㄔˋ:`傺叱啻彳懘抶敕斥湁熾痸瘈瘛翅翨赤跮遫鉓飭饎鶒鷘`,"ㄔ˙":`麶`,ㄔㄚ:`偛叉嗏扠插杈疀臿艖鍤`,ㄔㄚˇ:`衩蹅`,ㄔㄚˊ:`垞察搽查槎碴秅茬茶`,ㄔㄚˋ:`侘奼岔差汊紁詫`,ㄔㄜ:`硨莗車`,ㄔㄜˇ:`扯撦`,ㄔㄜˋ:`坼屮徹掣撤澈烢硩迠`,ㄔㄞ:`拆釵`,ㄔㄞˊ:`儕喍柴祡豺齜`,ㄔㄞˋ:`囆瘥蠆袃`,ㄔㄠ:`勦弨怊抄焯訬超鈔`,ㄔㄠˇ:`吵炒焣眧`,ㄔㄠˊ:`嘲巢晁朝樔漅潮牊窲罺轈鄛`,ㄔㄠˋ:`耖`,ㄔㄡ:`抽搊犨瘳篘`,ㄔㄡˇ:`丑偢吜杻杽瞅醜`,ㄔㄡˊ:`仇儔嬦幬怞惆愁懤栦椆燽疇稠籌紬絒綢菗薵裯讎躊酬雔`,ㄔㄡˋ:`殠臭`,ㄔㄢ:`幨攙梴裧襜覘辿鉆鋓`,ㄔㄢˇ:`丳剷嘽囅嵼幝旵滻灛燀產簅繟蕆諂譂辴鏟闡`,ㄔㄢˊ:`僝儃儳劖嚵嬋孱巉廛棎欃毚湹潺澶瀍瀺煘獑磛禪纏艬蟬蟾讒躔酁鋋鑱饞`,ㄔㄢˋ:`忏懺摲羼顫`,ㄔㄣ:`嗔抻捵琛瞋綝縝諃謓賝郴`,ㄔㄣˇ:`墋磣贂踸鍖`,ㄔㄣˊ:`塵宸忱愖揨晨梣樄沉煁臣茞莐蔯螴諶辰鈂陳鷐麎`,ㄔㄣˋ:`儭嚫櫬疢襯讖趁齔`,ㄔㄤ:`倀娼昌淐猖琩菖裮錩閶鯧鼚`,ㄔㄤˇ:`厂場廠惝敞昶氅鋹`,ㄔㄤˊ:`仩償嘗嚐嫦常徜腸萇鋿鱨`,ㄔㄤˋ:`倡唱悵暢瑒韔鬯`,ㄔㄥ:`偁撐棦橕檉浾湞琤瞠稱竀蟶赬鏿饓`,ㄔㄥˇ:`庱悜逞騁`,ㄔㄥˊ:`丞乘呈城埕塍宬峸懲成承掁晟朾棖橙溗澂澄珵碀程脀脭荿裎誠郕酲鋮騬`,ㄔㄥˋ:`牚秤`,ㄔㄨ:`出初摴樗貙齣`,ㄔㄨˇ:`儲杵楚楮檚濋礎褚`,ㄔㄨˊ:`媰幮廚櫥滁犓篨耡芻蒢藸蜍趎躇躕鉏鋤除雛鶵`,ㄔㄨˋ:`亍俶儊埱怵搐敊斶歜滀珿琡畜矗絀臅蓫處触觸諔豖踀鄐黜`,ㄔㄨㄛ:`戳踔逴`,ㄔㄨㄛˋ:`嚽娕娖婥惙擉歠磭綽腏趠輟齪`,ㄔㄨㄞ:`揣搋`,ㄔㄨㄞˊ:`膗`,ㄔㄨㄞˋ:`啜踹`,ㄔㄨㄟ:`吹炊`,ㄔㄨㄟˊ:`倕圌垂捶搥棰槌箠腄菙錘鎚陲`,ㄔㄨㄢ:`川氚猭瑏穿`,ㄔㄨㄢˇ:`喘歂舛荈踳`,ㄔㄨㄢˊ:`傳暷椽舡船輲遄`,ㄔㄨㄢˋ:`串汌玔賗釧鶨`,ㄔㄨㄣ:`媋春暙杶椿槆橁輴鰆鶞`,ㄔㄨㄣˇ:`偆惷萶蠢賰`,ㄔㄨㄣˊ:`唇淳漘犉純脣蓴醇錞鯙鶉`,ㄔㄨㄤ:`摐瘡窗`,ㄔㄨㄤˇ:`傸磢闖`,ㄔㄨㄤˊ:`幢床`,ㄔㄨㄤˋ:`凔刱創愴`,ㄔㄨㄥ:`充忡憃憧沖浺珫罿翀舂艟茺衝蹖`,ㄔㄨㄥˇ:`寵`,ㄔㄨㄥˊ:`崇爞緟虫蝩蟲隀`,ㄔㄨㄥˋ:`揰銃`,ㄕ:`失尸屍師施湤溮溼濕獅絁葹蓍虱蝨褷襹詩邿鉈鰤鳲鶳`,ㄕˇ:`使史始屎矢豕駛`,ㄕˊ:`十塒姼寔實拾時榯湜溡石祏蒔蝕鉐食鰣鼫鼭`,ㄕˋ:`世事仕侍勢嗜噬士奭媞室崼市式弒徥忕恀恃戺拭揓是柿栻氏澨烒示筮簭舐螫襫視觢試誓諟諡謚識貰軾适逝適遾釋鈰鉽銴飾`,"ㄕ˙":`匙`,ㄕㄚ:`剎唦樧殺沙煞猀痧砂硰紗莎蔱裟鎩魦鯊`,ㄕㄚˇ:`傻`,ㄕㄚˊ:`啥`,ㄕㄚˋ:`唼啑喢嗄廈歃箑翜翣萐霎`,"ㄕㄚ˙":`繌`,ㄕㄜ:`奢檨猞畬賒輋`,ㄕㄜˇ:`捨舍`,ㄕㄜˊ:`佘舌蛇`,ㄕㄜˋ:`厙射慴懾摵攝歙涉涻灄社蔎蠂設赦韘騇麝`,ㄕㄞ:`篩簁釃`,ㄕㄞˇ:`繺`,ㄕㄞˋ:`晒曬閷`,ㄕㄠ:`弰捎旓梢燒稍筲艄莦蕱蛸輎髾鮹`,ㄕㄠˇ:`少`,ㄕㄠˊ:`勺玿芍苕韶`,ㄕㄠˋ:`劭卲哨潲睄紹袑邵`,ㄕㄡ:`收`,ㄕㄡˇ:`守手艏首`,ㄕㄡˋ:`受售壽授狩獸瘦綬`,ㄕㄢ:`刪剼埏姍山幓挻搧杉柵潸煽狦珊痁笘縿羶膻舢芟苫衫跚`,ㄕㄢˇ:`晱煔睒覢閃陝`,ㄕㄢˋ:`剡善墠墡嬗扇擅樿汕潬灗疝繕膳蟺訕謆贍赸鄯釤騸鱔`,ㄕㄣ:`伸侁兟呻堔妽姺娠屾峷柛棽氠深燊珅甡申眒砷籸紳莘葠蔘詵身駪鯓`,ㄕㄣˇ:`哂嬸審曋沈瀋瞫矧覾諗讅邥`,ㄕㄣˊ:`什神`,ㄕㄣˋ:`侺慎椹滲甚祳罧胂脤腎蜃蜄鋠`,ㄕㄤ:`傷商殤漡熵蔏螪觴謪鬺`,ㄕㄤˇ:`晌賞`,ㄕㄤˋ:`上尚恦鞝`,"ㄕㄤ˙":`裳`,ㄕㄥ:`升呏昇泩湦焺牲狌生甥笙聲鉎陞鵿鼪`,ㄕㄥˇ:`偗渻省眚`,ㄕㄥˊ:`憴繩譝`,ㄕㄥˋ:`剩勝圣嵊盛聖胜貹賸`,ㄕㄨ:`倏儵姝抒攄書杸梳樞橾殊殳毹焂瑹疏紓綀舒菽蔬跾軗輸鄃陎鮛鵨`,ㄕㄨˇ:`屬暑曙潻癙糬署薯藷蜀襡襩鸀黍鼠`,ㄕㄨˊ:`叔塾婌孰淑熟秫贖`,ㄕㄨˋ:`咰墅尌庶怷恕戍數朮束樹沭漱澍腧虪術裋豎述鉥鏣隃鶐`,ㄕㄨㄚ:`刷唰`,ㄕㄨㄚˇ:`耍`,ㄕㄨㄛ:`說`,ㄕㄨㄛˋ:`妁搠朔槊欶爍獡碩箾蒴鎙鑠`,ㄕㄨㄞ:`摔衰`,ㄕㄨㄞˇ:`甩`,ㄕㄨㄞˋ:`帥蟀`,ㄕㄨㄟˇ:`水`,ㄕㄨㄟˊ:`脽誰`,ㄕㄨㄟˋ:`帨涗睡稅裞`,ㄕㄨㄢ:`拴栓閂`,ㄕㄨㄢˋ:`涮`,ㄕㄨㄣˇ:`吮`,ㄕㄨㄣˋ:`瞚瞬舜蕣順鬊`,ㄕㄨㄤ:`孀孇礵艭雙霜驦鷞`,ㄕㄨㄤˇ:`塽慡樉漺爽縔`,ㄕㄨㄤˋ:`灀`,ㄖˋ:`日鈤馹`,ㄖㄜˇ:`惹`,ㄖㄜˋ:`熱`,ㄖㄠˇ:`扰擾隢`,ㄖㄠˊ:`嬈橈蕘襓饒`,ㄖㄠˋ:`繞遶`,ㄖㄡˇ:`楺韖`,ㄖㄡˊ:`厹媃揉柔煣禸粈糅葇蝚蹂輮鍒鞣騥鰇鶔`,ㄖㄡˋ:`肉`,ㄖㄢˇ:`冉姌染橪珃苒`,ㄖㄢˊ:`呥然燃蚺袡髯`,ㄖㄣˇ:`忍栠棯稔荏荵`,ㄖㄣˊ:`人仁壬芢銋鵀`,ㄖㄣˋ:`仞任刃妊屻牣紉紝肕腍葚衽訒認軔韌飪`,ㄖㄤˇ:`嚷壤攘爙纕`,ㄖㄤˊ:`儴勷瀼獽瓤禳穰蘘躟鬤`,ㄖㄤˋ:`懹讓`,ㄖㄥ:`扔`,ㄖㄥˊ:`仍礽陾`,ㄖㄨˇ:`乳擩汝辱鄏`,ㄖㄨˊ:`侞儒嚅如嬬孺帤曘濡燸筎茹蒘蕠薷蝡蠕袽襦醹銣鴽`,ㄖㄨˋ:`入嗕媷洳溽縟蓐褥`,"ㄖㄨ˙ㄚˊ":`挼`,ㄖㄨㄛˊ:`捼`,ㄖㄨㄛˋ:`偌婼弱楉渃爇箬篛若蒻鄀鶸`,ㄖㄨㄟˇ:`橤繠蕊`,ㄖㄨㄟˊ:`婑桵緌蕤`,ㄖㄨㄟˋ:`叡枘汭瑞睿芮蚋銳`,ㄖㄨㄢˇ:`朊瓀礝緛耎軟阮`,ㄖㄨㄢˊ:`堧壖撋`,ㄖㄨㄣˋ:`橍潤閏`,ㄖㄨㄥˇ:`傇冗氄軵`,ㄖㄨㄥˊ:`媶嫆容嶸巆戎榕榮榵毧溶瀜烿熔爃狨瑢絨羢肜茙茸蓉融蠑褣鎔駥髶`,ㄗ:`咨姿孜孳崰嵫栥椔淄滋澬玆璾秶粢紎緇茲觜諮貲資趑輜鄑鈭錙鎡髭鯔鶅鼒齍`,ㄗˇ:`仔吇呰姊子杍梓滓矷秭笫籽紫耔胏訾訿釨`,ㄗˊ:`蓻`,ㄗˋ:`倳剚字恣漬牸眥胔胾自芓`,ㄗㄚ:`匝咂拶紮臢鉔`,ㄗㄚˇ:`咋`,ㄗㄚˊ:`偺喒囋砸磼雜雥`,ㄗㄜˊ:`則唶嘖幘擇樍澤矠笮簀舴蠌襗謮責賾迮鸅齰`,ㄗㄜˋ:`仄崱庂捑昃`,"ㄗㄜ˙":`伬`,ㄗㄞ:`哉栽渽災甾菑賳`,ㄗㄞˇ:`宰崽`,ㄗㄞˋ:`再在縡載酨`,ㄗㄟˊ:`蠈賊鯽`,ㄗㄠ:`傮糟蹧遭`,ㄗㄠˇ:`早棗澡璪繰藻蚤`,ㄗㄠˊ:`鑿`,ㄗㄠˋ:`喿噪慥灶煰燥皁皂簉譟趮躁造`,ㄗㄡ:`棷棸緅菆諏郰鄒鄹陬騶鯫黀齱齺`,ㄗㄡˇ:`走`,ㄗㄡˋ:`奏揍楱`,ㄗㄢ:`簪糌鐕`,ㄗㄢˇ:`儹噆寁揝攢昝趲`,ㄗㄢˊ:`咱`,ㄗㄢˋ:`暫灒瓚禶讚贊蹔酇鏨饡`,ㄗㄣˇ:`怎`,ㄗㄣˋ:`譖`,ㄗㄤ:`牂臧贓髒`,ㄗㄤˇ:`駔`,ㄗㄤˋ:`奘臟葬`,ㄗㄥ:`增憎橧璔矰磳繒罾鄫`,ㄗㄥˋ:`甑贈`,ㄗㄨ:`租菹葅蒩`,ㄗㄨˇ:`俎珇祖組詛阻靻`,ㄗㄨˊ:`傶卒哫崒族箤足踤踿鏃`,ㄗㄨㄛ:`嘬`,ㄗㄨㄛˇ:`佐左繓`,ㄗㄨㄛˊ:`捽昨椊琢稓筰莋`,ㄗㄨㄛˋ:`作侳做唑坐岝座怍祚胙葃葄酢阼`,ㄗㄨㄟ:`厜嗺朘纗`,ㄗㄨㄟˇ:`嘴噿嶊嶵璻`,ㄗㄨㄟˋ:`晬最檇檌祽絊罪蕞醉鋷`,ㄗㄨㄢ:`鑽`,ㄗㄨㄢˇ:`籫纂纘`,ㄗㄨㄢˋ:`攥`,ㄗㄨㄣ:`墫壿尊嶟樽繜遵鐏鱒鷷`,ㄗㄨㄣˇ:`僔噂撙譐`,ㄗㄨㄣˋ:`圳捘銌`,ㄗㄨㄥ:`倧宗嵕惾朡棕熧猣稯綜翪蝬豵蹤鍐騣鬃鬷`,ㄗㄨㄥˇ:`傯摠總蓗`,ㄗㄨㄥˋ:`昮瘲粽縱錝`,ㄘ:`偨呲疵縒蠀趀跐骴髊齹`,ㄘˇ:`佌此泚玼皉鮆`,ㄘˊ:`嬨慈柌濨瓷磁祠茈茨薋詞辭雌飺餈鶿`,ㄘˋ:`伺佽刺庛朿栨次絘茦莿蛓賜`,ㄘㄚ:`嚓擦攃`,ㄘㄚˇ:`礤礸`,ㄘㄚˋ:`囃`,ㄘㄜˋ:`側冊廁惻憡拺測畟策筴簎粣萴蓛`,ㄘㄞ:`偲猜`,ㄘㄞˇ:`啋婇寀彩採睬綵跴踩采`,ㄘㄞˊ:`才材纔裁財`,ㄘㄞˋ:`埰棌縩菜蔡`,ㄘㄠ:`操糙`,ㄘㄠˇ:`懆艸草騲`,ㄘㄠˊ:`嘈嶆曹槽漕艚螬`,ㄘㄠˋ:`肏襙鄵`,ㄘㄡˋ:`湊腠輳`,ㄘㄢ:`參嬠餐驂`,ㄘㄢˇ:`慘憯朁穇篸黲`,ㄘㄢˊ:`慚殘蚕蠶`,ㄘㄢˋ:`摻澯燦璨粲`,ㄘㄣ:`嵾`,ㄘㄣˊ:`岑涔笒`,ㄘㄤ:`倉傖嵢滄獊艙蒼鶬`,ㄘㄤˊ:`藏鑶`,ㄘㄥ:`噌`,ㄘㄥˊ:`層嶒曾驓`,ㄘㄥˋ:`蹭`,ㄘㄨ:`粗觕麤`,ㄘㄨˊ:`徂殂`,ㄘㄨˋ:`促噈憱猝瘯簇蔟踧蹙蹴醋顣鼀`,ㄘㄨㄛ:`搓撮瑳磋蹉遳醝`,ㄘㄨㄛˇ:`脞`,ㄘㄨㄛˊ:`嵯痤矬蒫蔖躦鹺`,ㄘㄨㄛˋ:`剉剒厝夎挫措斮棤莝蓌銼錯`,ㄘㄨㄟ:`催凗墔崔嶉慛摧榱磪縗鏙`,ㄘㄨㄟˇ:`漼璀趡`,ㄘㄨㄟˋ:`倅啐悴毳淬濢焠瘁竁粹綷翠脆脺膬膵萃`,ㄘㄨㄢ:`攛汆躥鋑`,ㄘㄨㄢˊ:`巑欑`,ㄘㄨㄢˋ:`爨竄篡`,ㄘㄨㄣ:`村皴踆`,ㄘㄨㄣˇ:`刌忖`,ㄘㄨㄣˊ:`存拵`,ㄘㄨㄣˋ:`吋寸籿`,ㄘㄨㄥ:`匆囪暰棇樅熜瑽璁瞛聰蓯蔥蟌鏦驄`,ㄘㄨㄥˊ:`叢婃孮徖從悰慒欉淙漎潀琮藂賨`,ㄘㄨㄥˋ:`謥`,ㄙ:`俬凘司嘶廝思撕斯楒榹泀澌磃禗禠私絲緦罳蕬虒蜤螄蟴鉰颸鷥鼶`,ㄙˇ:`死`,ㄙˋ:`似儩兕嗣四姒寺巳柶汜泗洍涘祀笥耜肂肆蕼覗貄鈶飼駟`,ㄙㄚ:`仨挲撒`,ㄙㄚˇ:`洒灑躠靸`,ㄙㄚˋ:`卅摋泧薩鈒隡颯馺`,ㄙㄜˋ:`嗇栜澀濇濏瑟璱穡色譅轖銫鏼飋`,ㄙㄞ:`塞揌毢毸腮鰓`,ㄙㄞˋ:`僿賽`,ㄙㄠ:`慅搔溞繅臊騷鱢`,ㄙㄠˇ:`嫂掃`,ㄙㄠˋ:`埽氉瘙矂`,ㄙㄡ:`嗖廋搜溲獀艘蒐鄋醙鎪颼颾餿騪`,ㄙㄡˇ:`叟嗾擻瞍籔藪`,ㄙㄡˋ:`嗽`,ㄙㄢ:`三毿鬖`,ㄙㄢˇ:`傘糝繖鏒鏾`,ㄙㄢˋ:`帴散閐`,ㄙㄣ:`森槮襂`,ㄙㄤ:`桑`,ㄙㄤˇ:`嗓搡磉褬鎟顙`,ㄙㄤˋ:`喪`,ㄙㄥ:`僧鬙`,ㄙㄨ:`囌櫯甦穌窣蘇酥`,ㄙㄨˊ:`俗`,ㄙㄨˋ:`傃僳嗉塑夙嫊宿愫愬憟梀榡樕橚泝洬涑溯潚玊簌粟素縤肅膆莤蔌藗觫訴謖蹜速鋉餗驌鱐鷫`,ㄙㄨㄛ:`傞唆嗍嗦娑摍桫梭簑縮羧莏蓑趖`,ㄙㄨㄛˇ:`嗩惢所溹瑣璅索鎈鎍鎖`,ㄙㄨㄛˋ:`逤`,ㄙㄨㄟ:`倠哸浽滖濉眭睢綏荽荾雖`,ㄙㄨㄟˇ:`瀡髓`,ㄙㄨㄟˊ:`隋隨`,ㄙㄨㄟˋ:`埣旞檖歲燧璲睟碎祟禭穗穟繀繐繸襚誶賥遂邃鐆鐩隧`,ㄙㄨㄢ:`狻痠酸`,ㄙㄨㄢˇ:`匴`,ㄙㄨㄢˋ:`筭算蒜`,ㄙㄨㄣ:`孫搎槂猻蓀蕵薞飧`,ㄙㄨㄣˇ:`損榫筍簨鎨隼`,ㄙㄨㄥ:`倯娀崧嵩忪松淞濍硹菘蜙鍶鬆`,ㄙㄨㄥˇ:`傱嵷悚愯慫竦聳駷`,ㄙㄨㄥˋ:`宋訟誦送頌`,ㄚ:`錒阿`,"ㄚ˙":`啊`,ㄛ:`喔噢`,ㄛˊ:`哦`,ㄜ:`婀屙痾`,ㄜˇ:`噁枙`,ㄜˊ:`俄吪囮娥峨涐珴皒睋莪蛾訛迗鋨額魤鵝`,ㄜˋ:`匎厄呃咢噩堊堨堮姶岋峉崿廅惡愕扼搤搹櫮歞砐砨萼蚅蝁詻諤豟軛軶遏遻鄂鍔鑩閼阨頞顎餓餩鱷鶚齃齶`,ㄞ:`哀哎唉噯埃娭挨溾`,ㄞˇ:`娾昹欸毐濭矮藹譪靄`,ㄞˊ:`啀捱敳溰癌皚騃`,ㄞˋ:`僾嗌壒嬡愛曖璦礙艾薆譺鑀閡隘靉餲鴱`,ㄟˊ:`誒`,ㄠ:`凹柪爊`,ㄠˇ:`媼芺襖镺`,ㄠˊ:`嗷廒摮敖滶熬獒璈磝翱聱蔜螯謷遨鏖隞鰲鼇`,ㄠˋ:`傲坳墺奡奧岰嶴懊扷拗擙澳薁鏊隩驁`,ㄡ:`櫙歐毆漚熰甌藲謳鏂鷗`,ㄡˇ:`偶吘嘔耦腢蕅藕`,ㄡˊ:`齵`,ㄡˋ:`慪`,ㄢ:`侒垵媕安峖庵桉氨痷盦腤菴萻諳鞍韽馣鵪`,ㄢˇ:`俺唵銨`,ㄢˊ:`儑啽玵雸`,ㄢˋ:`婩岸按晻暗案洝犴胺荌豻錌闇黯`,ㄣ:`奀恩`,ㄣˇ:`峎`,ㄣˋ:`摁`,ㄤ:`肮骯`,ㄤˊ:`卬昂`,ㄤˋ:`盎醠`,ㄥ:`鞥`,ㄦˇ:`尒栮毦洱爾珥耳薾邇餌駬`,ㄦˊ:`侕儿兒唲峏栭洏而聏胹荋輀陑鮞鴯`,ㄦˋ:`二刵咡樲衈貳鉺`,ㄧ:`一伊依咿噫壹嫛揖檹毉洢漪猗瑿禕稦繄蛜衣郼醫銥鷖黟黳`,ㄧˇ:`乙以佁倚偯崺已扆敼旖椅檥矣礒艤苡螘蟻踦轙酏釔鉯顗鳦齮`,ㄧˊ:`侇儀匜咦圯夷姨媐宜宧寲峓嶬嶷彝怡恞拸暆柂栘桋椸沂沶熪狋珆瓵疑痍眙移箷簃羠耛胰萓蛦螔衪袘觺訑詑詒誃謻貤貽跠迆迤迻遺鏔頤顊飴鸃`,ㄧˋ:`乂亄亦伿佚佾俋億刈劓劮勩唈囈圛垼埶埸墿奕嫕寱屹嶧帟帠廙异弈弋役悒意憶懌懿抑挹掜斁易晹曀杙枍枻栺槸檍欥欭殔殪毅泆浂浥溢潩澺瀷焲熠熤熼燚燡燱玴異疫瘞瘱益睪縊繶繹羛義羿翊翌翳翼耴肄肊膉臆艗芅蓺薏藙藝蘙蜴衵裔裛襼詍詣誼譯議豷賹贀跇軼逸邑醳醷釴鎰鐿陭隿霬靾饐驛鮨鶂鷁鷊鷾黓齸`,ㄧㄚ:`丫埡壓孲押枒椏錏鴉鴨`,ㄧㄚˇ:`厊啞庌蕥雅`,ㄧㄚˊ:`伢堐岈涯牙玡琊睚芽蚜衙齖`,ㄧㄚˋ:`亞圔圠婭掗揠氬犽猰砑窫聐襾訝軋迓齾`,"ㄧㄚ˙":`呀`,ㄧㄛ:`唷喲`,ㄧㄝ:`噎掖暍椰蠮`,ㄧㄝˇ:`也冶埜漜野`,ㄧㄝˊ:`揶擨爺耶`,ㄧㄝˋ:`夜嶪抴捙擛擫曄曳業歋殗液澲燁瞱腋葉謁鄴鍱鎑鐷靨頁饁`,ㄧㄞˊ:`崖`,ㄧㄠ:`吆喓夭妖殀祅腰葽訞邀`,ㄧㄠˇ:`偠咬宎岆抭杳柼榚溔眑窅窈舀苭蓔騕鴢鷕`,ㄧㄠˊ:`傜嗂垚堯姚媱嶢徭愮搖摿榣烑爻猺珧瑤窯繇肴謠軺遙銚顤颻餚鰩`,ㄧㄠˋ:`曜燿獟穾窔筄耀艞葯藥袎要覞詏鑰靿鷂`,ㄧㄡ:`优優呦嚘幽怮悠憂攸櫌泑瀀纋耰逌鄾麀`,ㄧㄡˇ:`卣友庮懮有栯槱牖羑聈苃莠酉銪黝`,ㄧㄡˊ:`偤尤斿楢沋油浟游猶猷由疣秞蕕蚰蝣訧輶遊郵鈾魷`,ㄧㄡˋ:`佑侑又右囿姷宥峟幼柚牰狖祐蚴誘貁迶釉鼬`,"ㄧㄡ˙":`蒏`,ㄧㄢ:`偣嫣嬮崦懨淊淹湮漹焉煙珚胭腌臙菸鄢醃閹黫`,ㄧㄢˇ:`偃儼兗匽厴噞奄嵃巘弇愝戭扊抁掩揜曮棪椼沇渰演琰甗眼縯罨萒蝘衍裺褗躽郾酓隒顩魘鰋鶠黤黭黶鼴齞齴龑`,ㄧㄢˊ:`嚴壛壧妍娮孍岩嵒巖延揅楌檐沿炎狿研碞礹筵簷綖芫莚虤蜒言郔閆閻顏鹽`,ㄧㄢˋ:`傿厭咽唁喭嚥堰姲嬿宴彥掞敥晏曣椻溎灩烻焰焱燄燕爓牪猒硯艷觾諺讌讞豔贗酀醼釅雁饜騴驗驠鬳鴈鴳鷃鷰`,ㄧㄣ:`凐喑噾因垔堙姻愔慇歅殷氤洇瘖禋絪茵蒑蔭裀諲銦闉陰霒霠音韾駰`,ㄧㄣˇ:`尹引朄檃濦癮蘟蚓螾讔趛輑鈏隱靷飲`,ㄧㄣˊ:`冘吟嚚圁垠夤婬寅崟檭殥淫烎狺硍苂荶蔩蟫誾鄞銀霪鷣齗`,ㄧㄣˋ:`印垽堷廕憖湚猌窨胤酳`,"ㄧㄣ˙":`粌`,ㄧㄤ:`央姎抰殃泱秧胦鉠雵鞅鴦`,ㄧㄤˇ:`仰佒坱岟懩攁柍氧炴痒癢紻蝆軮養`,ㄧㄤˊ:`佯垟崵崸徉揚昜暘楊洋烊煬珜瘍眻禓羊蛘鍚鐊陽颺鸉`,ㄧㄤˋ:`怏恙樣漾瀁羕`,ㄧㄥ:`偀嚶嫈嬰應攖朠櫻渶煐瑛瓔甇甖碤礯纓罃罌膺英蘡蝧蠳褮譻賏霙韺鶧鶯鷹鸚`,ㄧㄥˇ:`廮影摬梬浧潁癭矨穎郢`,ㄧㄥˊ:`塋嬴攍楹濴瀅瀛瀠瀯瀴熒營瑩盈籯縈藀螢蠅覮謍贏迎鎣`,ㄧㄥˋ:`媵映硬鱦`,ㄨ:`剭嗚圬屋巫杇歍汙污洿烏窏螐誣鄔鎢鴮`,ㄨˇ:`五仵伍侮俉倵午啎嫵廡忤憮捂摀橆武潕牾玝甒碔舞躌迕鵡`,ㄨˊ:`吳吾唔峿梧毋洖浯無珸莁蕪蜈譕郚鯃鷡鼯`,ㄨˋ:`兀務勿卼塢婺寤屼岉嵨悟戊扤晤杌焐物痦矹粅芴蘁誤逜鋈阢雺霧靰騖鶩齀`,ㄨㄚ:`媧挖洼溛漥穵窊窪蛙`,ㄨㄚˇ:`佤瓦`,ㄨㄚˊ:`娃`,ㄨㄚˋ:`嗢膃襪`,"ㄨㄚ˙":`哇`,ㄨㄛ:`倭撾渦猧窩萵踒`,ㄨㄛˇ:`婐我捰`,ㄨㄛˋ:`仴偓幄握擭斡沃涴渥濣焥瓁瞃硪腛臒臥雘齷`,ㄨㄞ:`喎歪`,ㄨㄞˇ:`崴`,ㄨㄞˋ:`外`,ㄨㄟ:`偎威巍愄揋椳渨溦烓煨燰葨葳薇蜲蝛覣詴逶隇隈`,ㄨㄟˇ:`亹偉偽儰壝委娓寪尾崣廆徫撱斖暐椲洧浘濻瀢煒猥瑋痏痿磈緯腲艉芛萎葦蒍薳諉踓鍡隗韙韡頠骫鮪`,ㄨㄟˊ:`危唯喡囗圍圩峗峞嵬帷幃微惟桅欈洈湋溈潿濰犩癓磑維蓶覹違鄬醀鍏闈霺韋鮠`,ㄨㄟˋ:`位味喂媦尉慰未渭為煟犚畏碨罻胃菋蔚藯蘶蜼蝟衛褽謂讆躗鏏霨餧餵饖魏鮇`,ㄨㄢ:`剜婠彎潫灣蜿豌`,ㄨㄢˇ:`倇婉宛惋挽晚晥晼琬畹皖睕碗綩綰脘菀踠輓`,ㄨㄢˊ:`丸刓完岏抏捖汍烷玩紈翫芄頑`,ㄨㄢˋ:`万卍忨捥澫瞣脕腕萬薍蟃輐鋄`,ㄨㄣ:`塭殟溫瘟豱轀`,ㄨㄣˇ:`刎吻呡抆桽穩紊`,ㄨㄣˊ:`文炆玟紋聞芠蚊閺閿闅雯駇魰鳼鼤`,ㄨㄣˋ:`問妏搵汶璺顐`,ㄨㄤ:`尢尪汪`,ㄨㄤˇ:`往惘暀枉瀇網网罔菵輞魍`,ㄨㄤˊ:`亡王莣`,ㄨㄤˋ:`妄忘旺望朢盳迋`,ㄨㄥ:`嗡滃翁螉鶲`,ㄨㄥˇ:`塕暡瞈聬蓊`,ㄨㄥˋ:`瓮甕罋蕹齆`,ㄩ:`唹扜淤瘀盓穻箊紆迂陓`,ㄩˇ:`与予俁偊傴噳圄圉宇寙嶼庾敔斔斞楀瑀瘐祤禹窳羽與萭蘌語貐鄅鋙雨頨麌齬`,ㄩˊ:`于余俞堣堬妤娛崳嵎愉愚揄於旟杅楰榆歈歟歶渝湡漁澞牏狳玗瑜璵盂睮硢禺窬竽籅羭腴臾舁艅萸蕍蘛虞蝓螸衧褕覦諛謣踰輿逾邘隅雓雩餘魚鮽鰅鸆`,ㄩˋ:`儥喻噊域堉嫗寓峪彧御悆愈慾戫昱棜棫欲毓浴淢淯潏澦灪煜燏燠爩獄玉瘉癒矞砡礜禦稢篽籲緎繘罭聿育芋蒮蓹蕷蜮袬裕諭譽豫軉輍轝遇遹郁醧鈺鋊錥閾預飫饇馭驈鬱鬻魊鱊鳿鴥鵒鷸鸒`,ㄩㄝ:`曰矱箹約`,ㄩㄝˋ:`刖岳嶽悅戉抈月樾瀹爚玥礿禴籥粵蘥蚎越躍軏鈅鉞閱鸑鸙黦龠`,ㄩㄢ:`冤嬽悁惌棩淵灁眢葾蒬蜎蜵裷駌鳶鴛鵷鼘`,ㄩㄢˇ:`遠鋺`,ㄩㄢˊ:`元原員園圓垣妧媴嫄援杬榞榬櫞沅湲源溒爰猿獂笎緣羱蒝蚖蝝蝯螈袁謜轅邍邧鎱騵鶢黿`,ㄩㄢˋ:`噮垸夗妴媛怨愿掾瑗禐肙苑裫褑院願`,ㄩㄣ:`奫暈氳蝹贇頵馧`,ㄩㄣˇ:`允抎殞狁荺褞賱鈗阭隕霣馻齫`,ㄩㄣˊ:`云伝勻妘昀沄溳澐熉畇眃筠篔紜縜耘芸蕓鄖鋆雲`,ㄩㄣˋ:`孕惲慍枟熅熨緷縕薀蘊運鄆醞韗韞韻餫`,ㄩㄥ:`佣傭嗈噰墉壅嫞庸廱慵擁槦滽澭灉癰臃邕郺鄘鏞雍雝饔鷛`,ㄩㄥˇ:`俑傛勇埇塎嵱恿悀永泳涌湧甬禜蛹詠踊踴`,ㄩㄥˊ:`喁揘顒鰫`,ㄩㄥˋ:`用醟`},$n={五柳先生傳:`ㄨˇ ㄌㄧㄡˇ ㄒㄧㄢ ㄕㄥ ㄓㄨㄢˋ`,史傳:`ㄕˇ ㄓㄨㄢˋ`,立傳:`ㄌㄧˋ ㄓㄨㄢˋ`,傳記:`ㄓㄨㄢˋ ㄐㄧˋ`,自傳:`ㄗˋ ㄓㄨㄢˋ`,好讀書:`ㄏㄠˋ ㄉㄨˊ ㄕㄨ`,嗜好:`ㄕˋ ㄏㄠˋ`,愛好:`ㄞˋ ㄏㄠˋ`,好奇:`ㄏㄠˋ ㄑㄧˊ`,不求甚解:`ㄅㄨˋ ㄑㄧㄡˊ ㄕㄣˋ ㄐㄧㄝˇ`,曾不吝情:`ㄗㄥ ㄅㄨˋ ㄌㄧㄣˋ ㄑㄧㄥˊ`,帶月荷鋤歸:`ㄉㄞˋ ㄩㄝˋ ㄏㄜˋ ㄔㄨˊ ㄍㄨㄟ`,荷鋤:`ㄏㄜˋ ㄔㄨˊ`,脈脈不得語:`ㄇㄛˋ ㄇㄛˋ ㄅㄨˋ ㄉㄜˊ ㄩˇ`,音樂:`ㄧㄣ ㄩㄝˋ`,樂器:`ㄩㄝˋ ㄑㄧˋ`,樂曲:`ㄩㄝˋ ㄑㄩˇ`,快樂:`ㄎㄨㄞˋ ㄌㄜˋ`,安貧樂道:`ㄢ ㄆㄧㄣˊ ㄌㄜˋ ㄉㄠˋ`,以樂其志:`ㄧˇ ㄌㄜˋ ㄑㄧˊ ㄓˋ`,銀行:`ㄧㄣˊ ㄏㄤˊ`,行業:`ㄏㄤˊ ㄧㄝˋ`,同行:`ㄊㄨㄥˊ ㄏㄤˊ`,行走:`ㄒㄧㄥˊ ㄗㄡˇ`,進行:`ㄐㄧㄣˋ ㄒㄧㄥˊ`,睡覺:`ㄕㄨㄟˋ ㄐㄧㄠˋ`,午覺:`ㄨˇ ㄐㄧㄠˋ`,發覺:`ㄈㄚ ㄐㄩㄝˊ`,感覺:`ㄍㄢˇ ㄐㄩㄝˊ`,視覺:`ㄕˋ ㄐㄩㄝˊ`,聽覺:`ㄊㄧㄥ ㄐㄩㄝˊ`,長大:`ㄓㄤˇ ㄉㄚˋ`,成長:`ㄔㄥˊ ㄓㄤˇ`,生長:`ㄕㄥ ㄓㄤˇ`,師長:`ㄕ ㄓㄤˇ`,校長:`ㄒㄧㄠˋ ㄓㄤˇ`,村長:`ㄘㄨㄣ ㄓㄤˇ`,長度:`ㄔㄤˊ ㄉㄨˋ`,長短:`ㄔㄤˊ ㄉㄨㄢˇ`,漫長:`ㄇㄢˋ ㄔㄤˊ`,長城:`ㄔㄤˊ ㄔㄥˊ`,長江:`ㄔㄤˊ ㄐㄧㄤ`,看著:`ㄎㄢˋ ㄓㄜ˙`,聽著:`ㄊㄧㄥ ㄓㄜ˙`,走著:`ㄗㄡˇ ㄓㄜ˙`,順著:`ㄕㄨㄣˋ ㄓㄜ˙`,沿著:`ㄧㄢˊ ㄓㄜ˙`,隨著:`ㄙㄨㄟˊ ㄓㄜ˙`,代表著:`ㄉㄞˋ ㄅㄧㄠˇ ㄓㄜ˙`,藏著:`ㄘㄤˊ ㄓㄜ˙`,連著:`ㄌㄧㄢˊ ㄓㄜ˙`,過著:`ㄍㄨㄛˋ ㄓㄜ˙`,拿著:`ㄋㄚˊ ㄓㄜ˙`,帶著:`ㄉㄞˋ ㄓㄜ˙`,笑著:`ㄒㄧㄠˋ ㄓㄜ˙`,站著:`ㄓㄢˋ ㄓㄜ˙`,坐著:`ㄗㄨㄛˋ ㄓㄜ˙`,著急:`ㄓㄠˊ ㄐㄧˊ`,睡著:`ㄕㄨㄟˋ ㄓㄠˊ`,著作:`ㄓㄨˋ ㄗㄨㄛˋ`,著名:`ㄓㄨˋ ㄇㄧㄥˊ`,常著文章:`ㄔㄤˊ ㄓㄨˋ ㄨㄣˊ ㄓㄤ`,了解:`ㄌㄧㄠˇ ㄐㄧㄝˇ`,明瞭:`ㄇㄧㄥˊ ㄌㄧㄠˇ`,受不了:`ㄕㄡˋ ㄅㄨˋ ㄌㄧㄠˇ`,還給:`ㄏㄨㄢˊ ㄍㄟˇ`,歸還:`ㄍㄨㄟ ㄏㄨㄢˊ`,返還:`ㄈㄢˇ ㄏㄨㄢˊ`,生還:`ㄕㄥ ㄏㄨㄢˊ`,還有:`ㄏㄞˊ ㄧㄡˇ`,還是:`ㄏㄞˊ ㄕˋ`,數星星:`ㄕㄨˇ ㄒㄧㄥ ㄒㄧㄥ`,數一數:`ㄕㄨˇ ㄧ ㄕㄨˇ`,數不清:`ㄕㄨˇ ㄅㄨˋ ㄑㄧㄥ`,數量:`ㄕㄨˋ ㄌㄧㄤˋ`,數學:`ㄕㄨˋ ㄒㄩㄝˊ`,數字:`ㄕㄨˋ ㄗˋ`,重要:`ㄓㄨㄥˋ ㄧㄠˋ`,重量:`ㄓㄨㄥˋ ㄌㄧㄤˋ`,重點:`ㄓㄨㄥˋ ㄉㄧㄢˇ`,重複:`ㄔㄨㄥˊ ㄈㄨˋ`,重新:`ㄔㄨㄥˊ ㄒㄧㄣ`,重疊:`ㄔㄨㄥˊ ㄉㄧㄝˊ`,重陽:`ㄔㄨㄥˊ ㄧㄤˊ`,方便:`ㄈㄤ ㄅㄧㄢˋ`,便宜:`ㄆㄧㄢˊ ㄧˊ`,大便:`ㄉㄚˋ ㄅㄧㄢˋ`,小便:`ㄒㄧㄠˇ ㄅㄧㄢˋ`,便欣然忘食:`ㄅㄧㄢˋ ㄒㄧㄣ ㄖㄢˊ ㄨㄤˋ ㄕˊ`,垃圾:`ㄌㄜˋ ㄙㄜˋ`},er=null;function tr(){if(er)return er;er=new Map;for(let[e,t]of Object.entries(Qn))for(let n of t)er.set(n,e);return er}var nr=Object.keys($n).sort((e,t)=>t.length-e.length);function rr(e){return tr().get(e)}function ir(e){let t=Array(e.length),n=tr(),r=0;for(;r<e.length;){let i=!1;for(let a of nr)if(e.startsWith(a,r)){let e=$n[a].split(/\s+/);for(let i=0;i<a.length;i++)t[r+i]=e[i]??n.get(a[i]);r+=a.length,i=!0;break}i||(t[r]=n.get(e[r]),r+=1)}return t}var ar=e=>e.map(e=>e.text).join(``),or=e=>ar(e).length,sr=e=>!e.text&&!!e.footnoteRef;function cr(e,t){return e.ruby||t.ruby?!1:!!e.bold==!!t.bold&&!!e.underline==!!t.underline&&!!e.strike==!!t.strike&&!!e.overline==!!t.overline&&!!e.keyword==!!t.keyword&&lr(e.color)===lr(t.color)&&(e.fontFamily??void 0)===(t.fontFamily??void 0)&&(e.popupId??void 0)===(t.popupId??void 0)&&(e.noteId??void 0)===(t.noteId??void 0)&&e.href===t.href&&e.footnoteRef===t.footnoteRef}var lr=e=>e&&e!=="default"?e:void 0;function ur(e,t,n,r){return t>=n?e:hr(e,t,n,mr(e,t,n).map(e=>{let t={...e};for(let e of Object.keys(r)){let n=r[e];n===void 0||n===!1||n==="default"||n===``?delete t[e]:t[e]=n}return t}))}function dr(e){let t=!1;for(let n of e)if(!(sr(n)||!n.text)){if(n.ruby){t=!0;continue}for(let e of n.text)if(rr(e))return!1}return t}function fr(e,t,n){if(t>=n)return e;let r=mr(e,t,n);if(dr(r))return ur(e,t,n,{ruby:void 0});let i=ir(ar(e)),a=[],o=t,s=!1;for(let e of r){if(sr(e)){a.push({...e});continue}if(e.ruby){a.push({...e}),o+=e.text.length;continue}for(let t=0;t<e.text.length;t++){let n=e.text[t],r=i[o+t],c=t===e.text.length-1,l={...e,text:n};!c&&l.footnoteRef&&delete l.footnoteRef,r&&(l.ruby=r,s=!0),a.push(l)}o+=e.text.length}return s?hr(e,t,n,a):e}function pr(e){let t=[];for(let n of e){if(sr(n)){t.push({...n});continue}if(!n.text)continue;let e=t[t.length-1];e&&cr(e,n)?e.text+=n.text:t.push({...n})}return t}function mr(e,t,n){let r=[],i=0;for(let a of e){let e=i,o=i+a.text.length;if(i=o,sr(a)){e>t&&e<=n&&r.push({...a});continue}if(o<=t)continue;if(e>=n)break;let s=Math.max(t,e)-e,c=Math.min(n,o)-e,l=a.text.slice(s,c);if(!l)continue;if(s===0&&c===a.text.length){r.push({...a,text:l});continue}let u={...a,text:l};a.ruby&&(u.ruby=void 0),a.footnoteRef&&c!==a.text.length&&(u.footnoteRef=void 0),r.push(u)}return pr(r)}function hr(e,t,n,r){let i=or(e),a=mr(e,0,t),o=mr(e,n,i),s=pr([...a,...r,...o]);return s.length>0?s:[{text:``}]}function gr(e,t=100){return{id:V(`col`),widthPct:t,blocks:e}}function _r(e,t=!1){return{id:V(`row`),columns:[gr(e)],breakBefore:t}}function vr(e,t=`body`){return{id:V(`blk`),type:`text`,role:t,popups:[],spans:[{text:e}]}}function yr(e){return e.spans.map(e=>e.text).join(``)}function br(e=`未命名教材`){return{id:V(`doc`),title:e,settings:{writingMode:`horizontal`,aspectRatio:`4:3`,textScale:`md`},meta:{},rows:[_r([vr(``,`lessonTitle`)])],footnotes:[],bookId:null,unitId:null}}function*xr(e){for(let t of e.rows)for(let e of t.columns)for(let n of e.blocks)yield{row:t,column:e,block:n}}function Sr(e,t){for(let n of xr(e))if(n.block.id===t)return n;return null}function Cr(e){let t=new Set,n=!1,r=e.rows.map(e=>{let r=e.id;t.has(r)&&(r=V(`row`),n=!0),t.add(r);let i=!1,a=e.columns.map(e=>{let r=e.id;t.has(r)&&(r=V(`col`),n=!0,i=!0),t.add(r);let a=!1,o=e.blocks.map(e=>{let r=e.id;t.has(r)&&(r=V(`blk`),n=!0,a=!0),t.add(r);let i=!1,o=new Map,s=e.popups.map(e=>{let r=e.id;return t.has(r)&&(r=V(`pop`),o.set(e.id,r),n=!0,i=!0),t.add(r),r===e.id?e:{...e,id:r}}),c=e=>e&&o.get(e)||e,l=o.size?s.map(e=>e.wordGroup?{...e,wordGroup:c(e.wordGroup)}:e):s,u=o.size&&e.type===`text`?{spans:e.spans.map(e=>e.popupId&&o.has(e.popupId)?{...e,popupId:c(e.popupId)}:e)}:{};return r!==e.id||i?{...e,...u,id:r,popups:l}:e});return r!==e.id||a?(i=!0,{...e,id:r,blocks:o}):e});return r!==e.id||i?{...e,id:r,columns:a}:e});return n?{...e,rows:r}:e}function wr(e){let t=e.rows.map(e=>({...e,columns:e.columns.map(e=>({...e,blocks:e.blocks.filter(e=>e.type!==`module`)})).filter(e=>e.blocks.length>0)})).filter(e=>e.columns.length>0);return{...e,rows:t}}function Tr(e){let t=!1,n=e.rows.map(e=>e.columns.every(e=>e.blocks.length<=1)?e:(t=!0,{...e,columns:e.columns.flatMap(e=>e.blocks.length<=1?[e]:e.blocks.map((t,n)=>({id:n===0?e.id:V(`col`),widthPct:e.widthPct/e.blocks.length,blocks:[t]})))}));return t?{...e,rows:n}:e}var Er={text:{label:`文字`,icon:`file-text`,action:`閱讀`},rich:{label:`大彈窗`,icon:`popup`,action:`開啟`},image:{label:`圖片`,icon:`image`,action:`看大圖`},video:{label:`影片`,icon:`video`,action:`播放`},audio:{label:`聲音`,icon:`music`,action:`播放`},web:{label:`網頁`,icon:`globe`,action:`開啟`},jump:{label:`跳轉`,icon:`arrow-up-right`,action:`前往`}},Dr=[`text`,`rich`,`image`,`video`,`audio`,`web`,`jump`];function Or(e){let t=V(`pop`);switch(e){case`text`:return{id:t,kind:e,title:``,body:``};case`image`:return{id:t,kind:e,title:``,assetId:null};case`video`:return{id:t,kind:e,title:``,source:`youtube`,ref:``};case`audio`:return{id:t,kind:e,title:``,assetId:null};case`web`:return{id:t,kind:e,title:``,url:``,embeddable:!1};case`jump`:return{id:t,kind:e,title:``,targetRowId:null};case`rich`:return{id:t,kind:e,title:``,blocks:[],pages:[[]]}}}function kr(e){switch(e.kind){case`text`:return e.body.trim()||e.title.trim()?null:`還沒填標題或內容`;case`image`:case`audio`:return e.assetId?null:`還沒選檔案`;case`video`:return e.ref.trim()?null:`還沒填影片來源`;case`web`:return e.url.trim()?null:`還沒填網址`;case`jump`:return e.targetRowId?null:`還沒選要跳到哪裡`;case`rich`:return jr(e).some(Ar)?null:`還沒放內容`}}function Ar(e){return e.some(e=>e.type===`text`?e.spans.some(e=>e.text.trim()):e.type===`image`?e.assetId!==null:e.type===`video`?!!e.ref.trim():e.type===`audio`?e.assetId!==null:e.type!==`web`||!!e.url.trim())}function jr(e){return e.pages&&e.pages.length>0?e.pages:[e.blocks]}function Mr(e,t){let n=t.length>0?t:[[]];return{...e,pages:n,blocks:n[0]}}var Nr=e=>e.title.trim()||Er[e.kind].label;function Pr(e){return e.popups.filter(e=>!kr(e))}var Fr=e=>e.wordGroup??e.id;function Ir(e){return new Set((e.spans??[]).map(e=>e.popupId).filter(e=>!!e))}var Lr=(e,t)=>e.popups.filter(e=>Fr(e)===t);function Rr(e){let t=Ir(e);return e.popups.filter(e=>!t.has(Fr(e)))}var zr=e=>Rr(e).filter(e=>!kr(e)),Br=[{key:`zhi`,btn:`旨`,name:`段旨`},{key:`xiu`,btn:`修`,name:`修辭`},{key:`ju`,btn:`句`,name:`句型`},{key:`wen`,btn:`問`,name:`提問`}];function Vr(e){let t=new Map,n=0;for(let r of e)for(let e of r.columns)for(let r of e.blocks)r.type!==`text`||!r.paragraph||(n+=1,t.set(r.id,{no:n,startId:r.id}));return t}var Hr=`〇一二三四五六七八九`;function Ur(e){if(e<10)return Hr[e];let t=Math.floor(e/10),n=e%10;return(t===1?``:Hr[t])+`十`+(n?Hr[n]:``)}var Wr=(e,t)=>t?Ur(e):String(e);function Gr(e){let t=Br.filter(t=>e.paraNotes?.[t.key]?.trim());return zr(e).length>0?[...t,{key:`bu`,btn:`補`,name:`補充`}]:t}var Kr=[{key:`word`,dot:`註`,name:`生字詞`,note:`註釋`},{key:`sentence`,dot:`句`,name:`句子`,note:`句子`}],qr=e=>Br.some(t=>t.key===e),Jr=e=>qr(e.kind)||e.kind===`sentence`?`sentence`:`word`;function Yr(e){return qr(e.kind)?{[e.kind]:e.body}:e.notes??{}}function Xr(e){return Jr(e)===`sentence`?Object.values(Yr(e)).some(e=>e?.trim()):!!e.body.trim()}function Zr(e,t){let n=new Set(e.spans.filter(e=>e.noteId===t&&e.popupId).map(e=>e.popupId));return e.popups.filter(e=>n.has(Fr(e))&&!kr(e))}var Qr=(e,t)=>Xr(t)||Zr(e,t.id).length>0;function $r(e,t){let n=0,r=-1,i=-1;for(let a of e)a.noteId===t&&(r<0&&(r=n),i=n+a.text.length),n+=a.text.length;return r<0?null:{start:r,end:i}}function ei(e){let t=new Map(e.footnotes.map(e=>[e.id,e]));if(t.size===0)return e;let n=new Set,r=e=>{if(e.type!==`text`||!e.spans.some(e=>e.footnoteRef))return e;let r=e.spans,i=[...e.rangeNotes??[]],a=[],o=0;for(let t of e.spans)o+=t.text.length,t.footnoteRef&&a.push({ref:t.footnoteRef,at:o});let s=ar(e.spans);for(let{ref:o,at:c}of a){let a=t.get(o);if(!a)continue;let l=a.term,u=s.slice(c-l.length,c)===l?c-l.length:s.lastIndexOf(l,c-l.length);if(u<0)continue;let d=`fn-${e.id}-${o}`;r=ur(r,u,u+l.length,{noteId:d}),i.push({id:d,kind:`word`,body:a.body}),n.add(o)}return r=r.map(e=>e.footnoteRef&&n.has(e.footnoteRef)?{...e,footnoteRef:void 0}:e).filter(e=>e.text||e.footnoteRef),{...e,spans:r,rangeNotes:i}},i=e.rows.map(e=>({...e,columns:e.columns.map(e=>({...e,blocks:e.blocks.map(r)}))}));return{...e,rows:i,footnotes:e.footnotes.filter(e=>!n.has(e.id))}}function ti(e){let t=new Map;for(let n of e)for(let e of n.columns)for(let n of e.blocks){if(n.type!==`text`||!n.rangeNotes?.length)continue;let e=new Set(n.rangeNotes.filter(e=>Jr(e)===`word`).map(e=>e.id));for(let r of n.spans)r.noteId&&e.has(r.noteId)&&!t.has(r.noteId)&&t.set(r.noteId,t.size+1)}return t}function ni(e){return e>=1&&e<=20?String.fromCodePoint(9312+e-1):e>=21&&e<=35?String.fromCodePoint(12881+e-21):e>=36&&e<=50?String.fromCodePoint(12977+e-36):`(${e})`}var ri={1:`lessonTitle`,2:`sectionTitle`,3:`itemTitle`,4:`subItemTitle`};function ii(e){let t=/^---\n([\s\S]*?)\n---\n?/.exec(e);if(!t)return{meta:{},settings:{},title:``,rest:e};let n={};for(let e of t[1].split(`
`)){let t=/^([a-zA-Z_]+):\s*(.*)$/.exec(e);t&&(n[t[1]]=t[2].replace(/\s+#.*$/,``).trim())}let r=/\[\s*(\d+)\s*,\s*(\d+)\s*\]/.exec(n.page??``);return{title:n.title??``,settings:{...n.direction===`直排`?{writingMode:`vertical`}:{},...n.direction===`橫排`?{writingMode:`horizontal`}:{},...n.layout===`自動切頁`?{layout:`paged`}:{},...n.layout===`流式排版`?{layout:`flow`}:{}},meta:{sourceId:n.id,publisher:n.publisher,stage:n.stage,grade:n.grade,term:n.term,subject:n.subject,unit:n.unit,printPageRange:r?[Number(r[1]),Number(r[2])]:void 0},rest:e.slice(t[0].length),...n.pagebreak?{breakAt:new Set(n.pagebreak.split(/[,，、]/).map(e=>e.trim()).filter(Boolean))}:{}}}var H={heading:/^(#{1,4})\s+(.*)$/,image:/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,dialogue:/@對話\[([^\]]*)\]\{([^}]*)\}/g,printPage:/^@頁\[(\d+)\]$/,reference:/^@參照\[([^\]]*)\]\{([^}]*)\}$/,link:/^@連結\[([^\]]*)\]\(([^)]+)\)(\{QR\})?$/,audio:/^@音檔\[([^\]]*)\]\(([^)]+)\)$/,video:/^@影片\[([^\]]*)\]\(([^)]+)\)(?:\{字幕=([^}]+)\})?$/,label:/^@題型\[([^\]]*)\]$/,module:/^@模組\[([^\]]*)\]\(([^)]+)\)(?:\{([^}]*)\})?$/,questionStem:/^(\d+)\.\s*(?:@題型\[([^\]]*)\]\s*)?(.*)$/,questionOption:/^\s*-\s*[（(]([A-Za-z])[）)]\s*(.*)$/,writingOverride:/^@排版\[([^\]]*)\]$/,footnoteDef:/^\[\^([^\]]+)\]:\s*(\S+)\s+([\s\S]*)$/,tableRow:/^\|(.+)\|$/,tableSep:/^\|[\s:|-]+\|$/},ai=e=>e.replace(/^[　\s]+/,``);function oi(e){if(!e)return;let t={};for(let n of e.split(`,`)){let e=n.indexOf(`=`);e>0&&(t[n.slice(0,e).trim()]=n.slice(e+1).trim())}return Object.keys(t).length>0?t:void 0}var si=e=>e.slice(1,-1).split(`|`).map(e=>e.trim());function ci(e,t){let{meta:n,settings:r,title:i,rest:a,breakAt:o}=ii(e),s=[],c=[],l=[],u=[],d,f,p,m=(e,t=!1)=>{e.length!==0&&(f&&=(e[0]={...e[0],label:f},void 0),s.push({id:V(`row`),breakBefore:t,printPage:d,columns:[{id:V(`col`),widthPct:100,blocks:e}]}),d=void 0)},h=(e,t)=>{let n=p;return p=void 0,{id:V(`blk`),type:`text`,role:t,...n?{writingMode:n}:{},popups:[],spans:Zn(e)}},g=a.replace(/\r\n?/g,`
`).split(/\n{2,}/);for(let e of g){let n=e.trim();if(!n)continue;let r=n.split(`
`).map(e=>e.trim()).filter(Boolean);if(r.length>=2&&r.every(e=>H.tableRow.test(e))){let e=r.filter(e=>!H.tableSep.test(e)).map(si);m([{id:V(`blk`),type:`table`,rows:e.length,cols:Math.max(...e.map(e=>e.length)),cells:e,hasHeader:r.some(e=>H.tableSep.test(e)),popups:[]}]);continue}if(r.every(e=>H.footnoteDef.test(e))){for(let e of r){let t=H.footnoteDef.exec(e);c.push({id:t[1],term:t[2],body:t[3].trim()})}continue}if(r.every(e=>e.startsWith(`@對話[`))){let e=[];for(let t of n.matchAll(H.dialogue))e.push({id:V(`blk`),type:`dialogue`,speaker:t[1],text:t[2],popups:[]});for(let t of e)m([t]);continue}if(H.questionStem.test(r[0])&&r.some(e=>H.questionOption.test(e))){let e=H.questionStem.exec(r[0]),t=[];for(let e of r.slice(1)){let n=H.questionOption.exec(e);n&&t.push({key:n[1].toUpperCase(),text:Zn(n[2])})}let n=e[3];m([{id:V(`blk`),type:`question`,number:e[1],questionType:e[2]||f,stem:Zn(n),options:t,multiple:/多選/.test(n),popups:[]}]),f=void 0;continue}let i=r.join(``),a;if(a=H.heading.exec(i)){let e=ri[a[1].length];m([h(a[2],e)],t.autoPageBreak&&e===`sectionTitle`&&(!o||o.has(a[2].trim())));continue}if(a=H.printPage.exec(i)){d=Number(a[1]);continue}if(a=H.label.exec(i)){f=a[1];continue}if(a=H.writingOverride.exec(i)){a[1]===`橫排`?p=`horizontal`:a[1]===`直排`?p=`vertical`:u.push(i);continue}if(a=H.image.exec(i)){let e=a[3]??``;m([{id:V(`blk`),type:`image`,assetId:a[2],alt:a[1],caption:e,hasCaption:!!e.trim(),aspectRatio:1.5,popups:[]}]);continue}if(a=H.reference.exec(i)){m([{id:V(`blk`),type:`reference`,target:a[1],pages:a[2],popups:[]}]);continue}if(a=H.link.exec(i)){m([{id:V(`blk`),type:`web`,url:a[2],title:a[1],presentation:a[3]?`qr`:`bookmark`,popups:[]}]);continue}if(a=H.audio.exec(i)){m([{id:V(`blk`),type:`audio`,assetId:a[2],title:a[1],popups:[]}]);continue}if(a=H.video.exec(i)){m([{id:V(`blk`),type:`video`,source:`upload`,ref:a[2],title:a[1],captionsRef:a[3],popups:[]}]);continue}if(a=H.module.exec(i)){m([{id:V(`blk`),type:`module`,moduleKind:a[2],title:a[1],params:oi(a[3]),popups:[]}]);continue}if(i.startsWith(`>`)){m([h(r.map(e=>e.replace(/^>\s?/,``)).join(``),`annotation`)]);continue}if(i.startsWith(`@`)){l.push(i);continue}let g=ai(r.map(ai).join(``)),_=s[s.length-1],v=_?.columns.length===1&&_.columns[0].blocks.length===1?_.columns[0].blocks[0]:null;if(d!==void 0&&!/^[　\s]/.test(e)&&v?.type===`text`&&v.role===`body`){_.columns[0].blocks[0]={...v,spans:pr([...v.spans,...Zn(g)])},_.printPage??(s[s.length-1]={..._,printPage:d}),d=void 0;continue}m([h(g,`body`)])}return s.length>0&&(s[0]={...s[0],breakBefore:!1}),{rows:s,meta:n,settings:r,footnotes:c,title:i,unrecognized:l,skipped:u}}function li(e,t){return ei(wr(Cr({...e,title:t.title||e.title,settings:{...e.settings,...t.settings},meta:{...e.meta,...t.meta},rows:t.rows,footnotes:t.footnotes})))}var ui={"4:3":{width:1024,height:768},"16:9":{width:1280,height:720}};function di(e){let t=ui[e.aspectRatio];return{width:t.width-96,height:t.height-96}}var fi={text:{label:`文字`,splittable:!0,canHavePopup:!0,boxLike:!1},image:{label:`圖片`,splittable:!1,canHavePopup:!0,boxLike:!0},video:{label:`影片`,splittable:!1,canHavePopup:!1,boxLike:!0},audio:{label:`聲音`,splittable:!1,canHavePopup:!1,boxLike:!0},shape:{label:`圖形`,splittable:!1,canHavePopup:!0,boxLike:!0},line:{label:`線段`,splittable:!1,canHavePopup:!1,boxLike:!0},table:{label:`表格`,splittable:!1,canHavePopup:!0,boxLike:!0},web:{label:`網頁`,splittable:!1,canHavePopup:!1,boxLike:!0},pdf:{label:`PDF`,splittable:!1,canHavePopup:!0,boxLike:!0},dialogue:{label:`對話框`,splittable:!1,canHavePopup:!1,boxLike:!0},reference:{label:`參照`,splittable:!1,canHavePopup:!1,boxLike:!1},module:{label:`模組`,splittable:!1,canHavePopup:!0,boxLike:!0},question:{label:`題目`,splittable:!1,canHavePopup:!0,boxLike:!0}},pi=e=>fi[e].canHavePopup,mi=e=>fi[e].splittable,hi=e=>fi[e].boxLike,gi={lessonTitle:`章`,sectionTitle:`節`,itemTitle:`標題`,subItemTitle:`小標`,lead:`導言`,body:`內文`,supplement:`補充`,annotation:`注釋`,caption:`圖說`},_i=[`lessonTitle`,`sectionTitle`,`body`,`supplement`],vi=[`lessonTitle`,`sectionTitle`,`itemTitle`,`subItemTitle`],yi={tight:20,attached:16,continuous:28,module:48,pageBreak:48,section:80},bi={lessonTitle:40,sectionTitle:32,itemTitle:24,subItemTitle:yi.tight},xi=e=>e.columns[0]?.blocks[0]??null,Si=e=>{let t=e.columns[e.columns.length-1];return t?.blocks[t.blocks.length-1]??null},Ci=e=>e&&e.type===`text`?e.role:null,wi=e=>e.columns.some(e=>e.blocks.some(e=>hi(e.type)));function Ti(e,t){if(!e)return 0;let n=Ci(xi(t)),r=Ci(Si(e));return n===`sectionTitle`||n===`itemTitle`?yi.section:n===`caption`||n===`annotation`?yi.attached:wi(t)||wi(e)?yi.module:r&&vi.includes(r)?bi[r]??yi.tight:yi.continuous}var Ei=.45;function Di(e){let t=e.crop;return t&&t.w>0&&t.h>0?e.aspectRatio*t.w/t.h:e.aspectRatio}var Oi={audio:64,shape:120,line:80,web:112,pdf:480,dialogue:88,reference:40,module:200,question:220};function ki(e){let t=e.colWidths;if(t&&t.length===e.cols&&t.every(e=>e>0)){let e=t.reduce((e,t)=>e+t,0);return t.map(t=>t/e*100)}return Array.from({length:e.cols},()=>100/e.cols)}function Ai(e){return Array.from({length:e.rows},(t,n)=>e.rowHeights?.[n]||36)}function U(e){let t=e.borderWidth??1;return Ai(e).reduce((e,t)=>e+t,0)+t*(e.rows+1)}function ji(e,t){if(e.reduce((e,t)=>e+t,0)<=t)return null;let n=t-32,r=0,i=0;for(let t of e){if(r+t>n)break;r+=t,i+=1}return i=Math.max(1,i),{shown:i,hidden:e.length-i}}function Mi(e,t,n=!1){let r=t.vertical?t.inlineSize*e:t.inlineSize/e,i=n?t.maxBlockSize:t.maxBlockSize*Ei;return Math.min(r,i)}function Ni(e,t){if(e.type===`text`)return null;let n=e.widthPct!=null,r=t.inlineSize*(e.widthPct??100)/100;if(e.type===`image`||e.type===`video`){let i=e.type===`image`?Di(e):16/9,a=Mi(i,{...t,inlineSize:r},n),o=t.vertical?a/i:a*i;return{inlineSize:Math.min(o,r),blockSize:a}}if(e.type===`table`){let n=U(e);if(t.vertical){let n=e.cols*160;return{inlineSize:r,blockSize:Math.min(n,t.maxBlockSize)}}return{inlineSize:r,blockSize:Math.min(n,t.maxBlockSize)}}if(e.type===`pdf`&&e.blockSize==null){let e=16/9,i=Mi(e,{...t,inlineSize:r},n),a=t.vertical?i/e:i*e;return{inlineSize:Math.min(a,r),blockSize:i}}if(e.type===`web`){let n=t.inlineSize*(e.widthPct??50)/100;if(e.chosen===!1){if(e.blockSize!=null)return{inlineSize:n,blockSize:Math.min(e.blockSize,t.maxBlockSize)};let r=16/9,i=Mi(r,{...t,inlineSize:n},e.widthPct!=null),a=t.vertical?i/r:i*r;return{inlineSize:Math.min(a,n),blockSize:i}}let r=e.presentation===`embed`?t.maxBlockSize:e.presentation===`qr`?88:68;return{inlineSize:n,blockSize:Math.min(e.blockSize??r,t.maxBlockSize)}}if(e.type===`shape`){if(e.shape===`circle`){let n=Math.min(e.blockSize??(e.widthPct==null?Oi.shape:r),t.inlineSize,t.maxBlockSize),i=e.widthPct==null?n:r;return{inlineSize:i,blockSize:Math.min(e.blockSize??i,t.maxBlockSize)}}return{inlineSize:t.inlineSize*(e.widthPct??25)/100,blockSize:Math.min(e.blockSize??Oi.shape,t.maxBlockSize)}}let i=e.type===`audio`?50:100;return{inlineSize:t.inlineSize*(e.widthPct??i)/100,blockSize:Math.min(e.blockSize??Oi[e.type]??120,t.maxBlockSize)}}var Pi=112;function Fi(e,t){let n;if(e.type===`image`)n=Di(e);else if(e.type===`video`)n=16/9;else if(e.type===`web`&&e.chosen===!1)n=16/9;else if(e.type===`pdf`&&e.blockSize==null)n=16/9;else return e;if(e.widthPct==null)return e;let r=di(t),i=t.writingMode===`vertical`,a=i?r.height:r.width,o=((i?r.width:r.height)-yi.module-Pi)/2,s=i?o/n:o*n,c=Math.floor(Math.min(e.widthPct,s/a*100));return c===e.widthPct?e:{...e,widthPct:c}}var Ii={lessonTitle:`heading-1`,sectionTitle:`heading-2`,itemTitle:`heading-3`,subItemTitle:`heading-4`,lead:`lead`,body:`body-lg`,supplement:`body`,annotation:`body-sm`,caption:`body-sm`},Li={sm:.875,md:1,lg:1.125};function Ri(e,t=1,n,r,i=!1){let a=Vi(e,t,n,i);return r&&r>0?{...a,lineHeight:String(r)}:a}var zi=e=>Math.round(Ui(Ii[e])*10)/10,Bi=[1,1.2,1.5,1.8,2,2.5];function Vi(e,t,n,r=!1){let i=Ii[e],a=e=>t===1?`var(--ds-typography-${i}-${e})`:`calc(var(--ds-typography-${i}-${e}) * ${t})`,o=`var(--ds-typography-${i}-weight)`,s=r&&Gi[e]||Wi[e];return!(n&&n>0)&&s?{fontSize:`${s*t}px`,lineHeight:String(Ui(i)),fontWeight:o,fontFamily:`var(--ds-typography-font-sans)`}:n&&n>0?{fontSize:`${n}px`,lineHeight:String(Ui(i)),fontWeight:o,fontFamily:`var(--ds-typography-font-sans)`}:{fontSize:a(`size`),lineHeight:a(`line-height`),fontWeight:o,fontFamily:`var(--ds-typography-font-sans)`}}var Hi=new Map;function Ui(e){let t=Hi.get(e);if(t!==void 0)return t;let n=1.5;if(typeof document<`u`){let t=getComputedStyle(document.documentElement),r=parseFloat(t.getPropertyValue(`--ds-typography-${e}-size`)),i=parseFloat(t.getPropertyValue(`--ds-typography-${e}-line-height`));if(r>0&&i>0)n=i/r;else return n}return Hi.set(e,n),n}var Wi={sectionTitle:32,body:20},Gi={body:24},Ki=(e,t=!1)=>t&&Gi[e]||qi[e],qi={lessonTitle:48,sectionTitle:32,itemTitle:28,subItemTitle:24,lead:20,body:20,supplement:16,annotation:14,caption:14},Ji=[12,14,16,18,20,24,28,32,36,48,56,64,72,96],Yi=[{label:`黑體`,value:null},{label:`楷體`,value:`"Kaiti TC", "BiauKai", "TW-MOE-Std-Kai", "DFKai-SB", "TW-Kai", "Noto Serif TC", serif`},{label:`圓體`,value:`"GenSenRounded TW", "Yuanti TC", "YuanTi TC", "Hiragino Maru Gothic ProN", "jf-openhuninn", "Noto Sans TC", sans-serif`}];function Xi(e,t){let n=e.writingMode?e.writingMode===`vertical`:t.vertical,r=n!==t.vertical;if(!r)return{vertical:n,flipped:r,style:{}};let i=Math.min(e.blockSize??t.maxBlockSize*.45,t.maxBlockSize);return{vertical:n,flipped:r,style:{writingMode:n?`vertical-rl`:`horizontal-tb`,overflow:`hidden`,...t.vertical?{width:`${i}px`,height:`auto`,maxHeight:`${t.inlineSize}px`}:{height:`${i}px`,width:`auto`,maxWidth:`${t.inlineSize}px`,marginLeft:`auto`}}}}var W=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),Zi=e=>`<sup data-fn="${W(e)}" contenteditable="false">${W(e)}</sup>`,Qi=new Set([`accent`,`secondary`]),$i=e=>/^(#[0-9a-f]{3,8}|[a-z]+|rgba?\([\d\s.,%/]+\)|hsla?\([\d\s.,%/deg]+\))$/i.test(e),ea=e=>/^[^;{}<>\\]+$/.test(e),ta=`ˊˇˋ`;function na(e){let t=e.includes(`˙`),n=e.replace(`˙`,``),r=n.slice(-1),i=ta.includes(r)?r:``,a=i?n.slice(0,-1):n,o=(t?`˙`:``)+a;return`<rt${Array.from(a).length===1?` data-one`:``}><span data-zy>${W(o)}</span>${i?`<span data-tone>${W(i)}</span>`:``}</rt>`}var ra=e=>e.text&&(e.noteId||e.popupId)?`${e.noteId??``}|${e.popupId??``}`:``;function ia(e){let t=``;for(let n=0;n<e.length;){let r=ra(e[n]);if(!r){t+=aa(e[n]),n+=1;continue}let i=n;for(;i<e.length&&ra(e[i])===r;)i+=1;let a=e[n],o=[];a.popupId&&o.push(`data-pop="${W(a.popupId)}"`),a.noteId&&o.push(`data-note="${W(a.noteId)}"`),a.fontFamily&&ea(a.fontFamily)&&o.push(`data-font="${W(a.fontFamily)}"`,`style="${W(`font-family:${a.fontFamily}`)}"`),t+=`<span ${o.join(` `)}>${e.slice(n,i).map(e=>aa(e,!1)).join(``)}</span>`,n=i}return t}function aa(e,t=!0){let n=e.footnoteRef?Zi(e.footnoteRef):``;if(!e.text)return n;let r=[],i=[];if(e.keyword&&r.push(`data-kw="1"`),e.bold&&r.push(`data-bold="1"`),e.underline&&r.push(`data-u="1"`),e.strike&&r.push(`data-s="1"`),e.overline&&r.push(`data-o="1"`),e.color&&e.color!=="default"&&$i(e.color)&&(r.push(`data-color="${W(e.color)}"`),Qi.has(e.color)||i.push(`color:${e.color}`)),e.fontFamily&&ea(e.fontFamily)&&(r.push(`data-font="${W(e.fontFamily)}"`),i.push(`font-family:${e.fontFamily}`)),t&&e.popupId&&r.push(`data-pop="${W(e.popupId)}"`),t&&e.noteId&&r.push(`data-note="${W(e.noteId)}"`),e.href&&r.push(`data-href="${W(e.href)}"`),i.length>0&&r.push(`style="${W(i.join(`;`))}"`),e.ruby){let t=r.length>0?` ${r.join(` `)}`:``;return`<ruby data-ruby="${W(e.ruby)}" contenteditable="false"${t}>${W(e.text)}${na(e.ruby)}</ruby>${n}`}let a=W(e.text);return(r.length>0?`<span ${r.join(` `)}>${a}</span>`:a)+n}function oa(e){let t=[],n=e=>{if(!e.text)return;let n=t[t.length-1];if(n&&cr(n,e)){n.text+=e.text;return}t.push(e)},r=(e,n)=>{let r=t[t.length-1];r&&r.text&&!r.footnoteRef&&!r.ruby?r.footnoteRef=e:t.push({...n,text:``,footnoteRef:e})},i=(e,t)=>{if(e.nodeType===Node.TEXT_NODE){n({...t,text:e.textContent??``});return}if(e.nodeType!==Node.ELEMENT_NODE)return;let a=e;if(a.dataset.fn){r(a.dataset.fn,t);return}if(a.tagName===`RUBY`){let e=a.dataset.ruby??a.querySelector(`rt`)?.textContent??``,r=Array.from(a.childNodes).filter(e=>e.nodeName!==`RT`).map(e=>e.textContent??``).join(``),i={...t};a.dataset.kw&&(i.keyword=!0),a.dataset.bold&&(i.bold=!0),a.dataset.u&&(i.underline=!0),a.dataset.s&&(i.strike=!0),a.dataset.o&&(i.overline=!0),a.dataset.color&&(i.color=a.dataset.color),a.dataset.font&&(i.fontFamily=a.dataset.font),a.dataset.pop&&(i.popupId=a.dataset.pop),a.dataset.note&&(i.noteId=a.dataset.note),a.dataset.href&&(i.href=a.dataset.href),n({...i,text:r,ruby:e});return}if(a.tagName===`RT`)return;let o={...t};a.dataset.kw&&(o.keyword=!0),(a.dataset.bold||a.tagName===`B`||a.tagName===`STRONG`)&&(o.bold=!0),(a.dataset.u||a.tagName===`U`)&&(o.underline=!0),(a.dataset.s||a.tagName===`S`||a.tagName===`STRIKE`||a.tagName===`DEL`)&&(o.strike=!0),a.dataset.o&&(o.overline=!0),a.dataset.color&&(o.color=a.dataset.color),a.dataset.font&&(o.fontFamily=a.dataset.font),a.dataset.pop&&(o.popupId=a.dataset.pop),a.dataset.note&&(o.noteId=a.dataset.note),a.dataset.href&&(o.href=a.dataset.href);for(let e of Array.from(a.childNodes))i(e,o)};for(let t of Array.from(e.childNodes))i(t,{});return t.length>0?t:[{text:``}]}var G=m(),sa={"alert-circle":`<circle cx="12" cy="12" r="10" /> <line x1="12" x2="12" y1="8" y2="12" /> <line x1="12" x2="12.01" y1="16" y2="16" />`,"align-center":`<path d="M21 6H3" /> <path d="M17 12H7" /> <path d="M19 18H5" />`,"align-justify":`<path d="M3 6h18" /> <path d="M3 12h18" /> <path d="M3 18h18" />`,"align-left":`<path d="M21 6H3" /> <path d="M15 12H3" /> <path d="M17 18H3" />`,"align-right":`<path d="M21 6H3" /> <path d="M21 12H9" /> <path d="M21 18H7" />`,archive:`<rect width="20" height="5" x="2" y="3" rx="1" /> <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /> <path d="M10 12h4" />`,"arrow-down":`<path d="M12 5v14" /> <path d="m19 12-7 7-7-7" />`,"arrow-left":`<path d="m12 19-7-7 7-7" /> <path d="M19 12H5" />`,"arrow-right":`<path d="M5 12h14" /> <path d="m12 5 7 7-7 7" />`,"arrow-up-right":`<path d="M7 7h10v10" /> <path d="M7 17 17 7" />`,"arrow-up":`<path d="m5 12 7-7 7 7" /> <path d="M12 19V5" />`,asterisk:`<path d="M12 6v12" /> <path d="M17.196 9 6.804 15" /> <path d="m6.804 9 10.392 6" />`,blocks:`<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" /> <rect x="14" y="2" width="8" height="8" rx="1" />`,bold:`<path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />`,book:`<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />`,bookmark:`<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />`,bot:`<path d="M12 8V4H8" /> <rect width="16" height="12" x="4" y="8" rx="2" /> <path d="M2 14h2" /> <path d="M20 14h2" /> <path d="M15 13v2" /> <path d="M9 13v2" />`,check:`<path d="M20 6 9 17l-5-5" />`,"chevron-down":`<path d="m6 9 6 6 6-6" />`,"chevron-left":`<path d="m15 18-6-6 6-6" />`,"chevron-right":`<path d="m9 18 6-6-6-6" />`,"chevron-up":`<path d="m18 15-6-6-6 6" />`,"circle-x":`<circle cx="12" cy="12" r="10" /> <path d="m15 9-6 6" /> <path d="m9 9 6 6" />`,compass:`<circle cx="12" cy="12" r="10" /> <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z" />`,copy:`<rect width="14" height="14" x="8" y="8" rx="2" ry="2" /> <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />`,"corner-up-left":`<path d="M9 14 4 9l5-5" /> <path d="M20 20v-7a4 4 0 0 0-4-4H4" />`,"corner-up-right":`<path d="m15 14 5-5-5-5" /> <path d="M4 20v-7a4 4 0 0 1 4-4h12" />`,crop:`<path d="M6 2v14a2 2 0 0 0 2 2h14" /> <path d="M18 22V8a2 2 0 0 0-2-2H2" />`,diff:`<path d="M12 3v14" /> <path d="M5 10h14" /> <path d="M5 21h14" />`,eraser:`<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" /> <path d="M22 21H7" /> <path d="m5 11 9 9" />`,"external-link":`<path d="M15 3h6v6" /> <path d="M10 14 21 3" /> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />`,"eye-off":`<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /> <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /> <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /> <path d="m2 2 20 20" />`,eye:`<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /> <circle cx="12" cy="12" r="3" />`,"file-text":`<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /> <path d="M14 2v5a1 1 0 0 0 1 1h5" /> <path d="M10 9H8" /> <path d="M16 13H8" /> <path d="M16 17H8" />`,globe:`<circle cx="12" cy="12" r="10" /> <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /> <path d="M2 12h20" />`,grip:`<circle cx="9" cy="12" r="1" /> <circle cx="9" cy="5" r="1" /> <circle cx="9" cy="19" r="1" /> <circle cx="15" cy="12" r="1" /> <circle cx="15" cy="5" r="1" /> <circle cx="15" cy="19" r="1" />`,highlighter:`<path d="m9 11-6 6v3h9l3-3" /> <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />`,home:`<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /> <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />`,image:`<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /> <circle cx="9" cy="9" r="2" /> <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />`,info:`<circle cx="12" cy="12" r="10" /> <path d="M12 16v-4" /> <path d="M12 8h.01" />`,library:`<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16" /> <path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2" /> <circle cx="13" cy="7" r="1" fill="currentColor" /> <rect x="8" y="2" width="14" height="14" rx="2" />`,"line-height-vertical":`<path d="M6 18h12" /> <path d="m8 16-2 2 2 2" /> <path d="m16 16 2 2-2 2" /> <path d="M7 4v8" /> <path d="M12 4v8" /> <path d="M17 4v8" />`,"line-height":`<path d="M6 6v12" /> <path d="m4 8 2-2 2 2" /> <path d="m4 16 2 2 2-2" /> <path d="M12 7h8" /> <path d="M12 12h8" /> <path d="M12 17h8" />`,link:`<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /> <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />`,"list-checks":`<path d="m3 17 2 2 4-4" /> <path d="m3 7 2 2 4-4" /> <path d="M13 6h8" /> <path d="M13 12h8" /> <path d="M13 18h8" />`,loader:`<path d="M21 12a9 9 0 1 1-6.219-8.56" />`,maximize:`<path d="M8 3H5a2 2 0 0 0-2 2v3" /> <path d="M21 8V5a2 2 0 0 0-2-2h-3" /> <path d="M3 16v3a2 2 0 0 0 2 2h3" /> <path d="M16 21h3a2 2 0 0 0 2-2v-3" />`,menu:`<path d="M4 5h16" /> <path d="M4 12h16" /> <path d="M4 19h16" />`,minus:`<path d="M5 12h14" />`,"more-vertical":`<circle cx="12" cy="12" r="1" /> <circle cx="12" cy="5" r="1" /> <circle cx="12" cy="19" r="1" />`,music:`<path d="M9 18V5l12-2v13" /> <circle cx="6" cy="18" r="3" /> <circle cx="18" cy="16" r="3" />`,orbit:`<circle cx="12" cy="12" r="3" /> <circle cx="19" cy="5" r="2" /> <circle cx="5" cy="19" r="2" /> <path d="M10.4 21.9a10 10 0 0 0 9.941-15.416" /> <path d="M13.5 2.1a10 10 0 0 0-9.841 15.416" />`,overline:`<line x1="3" x2="21" y1="4" y2="4" /> <path d="M3 20 7 8l4 12" /> <path d="M4.5 16h5" /> <path d="M14 8v12h3.75a3.25 3.25 0 0 0 0-6.5H14" /> <path d="M14 13.5h3a2.75 2.75 0 0 0 0-5.5h-3" />`,"page-break":`<path d="m16 16-4 4-4-4" /> <path d="M3 12h18" /> <path d="m8 8 4-4 4 4" />`,palette:`<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /> <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /> <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /> <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /> <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />`,pause:`<rect x="14" y="4" width="4" height="16" rx="1" /> <rect x="6" y="4" width="4" height="16" rx="1" />`,pencil:`<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /> <path d="m15 5 4 4" />`,play:`<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />`,plus:`<path d="M5 12h14" /> <path d="M12 5v14" />`,popup:`<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />`,presentation:`<path d="M2 3h20" /> <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /> <path d="m7 21 5-5 5 5" />`,puzzle:`<path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z" />`,redo:`<path d="m15 14 5-5-5-5" /> <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />`,save:`<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /> <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" /> <path d="M7 3v4a1 1 0 0 0 1 1h7" />`,search:`<path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" />`,send:`<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /> <path d="m21.854 2.147-10.94 10.939" />`,settings:`<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" /> <circle cx="12" cy="12" r="3" />`,shapes:`<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" /> <rect x="3" y="14" width="7" height="7" rx="1" /> <circle cx="17.5" cy="17.5" r="3.5" />`,share:`<circle cx="18" cy="5" r="3" /> <circle cx="6" cy="12" r="3" /> <circle cx="18" cy="19" r="3" /> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />`,sparkles:`<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /> <path d="M20 3v4" /> <path d="M22 5h-4" /> <path d="M4 17v2" /> <path d="M5 18H3" />`,sticker:`<path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" /> <path d="M14 3v4a2 2 0 0 0 2 2h4" /> <path d="M8 13h.01" /> <path d="M16 13h.01" /> <path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1" />`,"sticky-note":`<path d="M16 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V9Z" /> <path d="M15 3v4a2 2 0 0 0 2 2h4" />`,strikethrough:`<path d="M16 4H9a3 3 0 0 0-2.83 4" /> <path d="M14 12a4 4 0 0 1 0 8H6" /> <line x1="4" x2="20" y1="12" y2="12" />`,table:`<path d="M12 3v18" /> <rect width="18" height="18" x="3" y="3" rx="2" /> <path d="M3 9h18" /> <path d="M3 15h18" />`,trash:`<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /> <path d="M3 6h18" /> <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />`,type:`<path d="M12 4v16" /> <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" /> <path d="M9 20h6" />`,underline:`<path d="M6 4v6a6 6 0 0 0 12 0V4" /> <line x1="4" x2="20" y1="20" y2="20" />`,undo:`<path d="M9 14 4 9l5-5" /> <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />`,upload:`<path d="M12 3v12" /> <path d="m17 8-5-5-5 5" /> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />`,video:`<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /> <rect x="2" y="6" width="14" height="12" rx="2" />`,"volume-x":`<path d="M11 4.7a1 1 0 0 0-1.6-.8L5.9 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.9l3.5 3.1a1 1 0 0 0 1.6-.8Z" /> <line x1="22" x2="16" y1="9" y2="15" /> <line x1="16" x2="22" y1="9" y2="15" />`,volume:`<path d="M11 4.7a1 1 0 0 0-1.6-.8L5.9 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.9l3.5 3.1a1 1 0 0 0 1.6-.8Z" /> <path d="M16 9a5 5 0 0 1 0 6" /> <path d="M19.4 5.5a9 9 0 0 1 0 13" />`,"writing-horizontal":`<path d="M4 6V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /> <path d="M10 4v10" /> <path d="M7 14h6" /> <path d="M4 19h16" /> <path d="m17 16 3 3-3 3" />`,"writing-vertical":`<path d="M3 7V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2" /> <path d="M9 4v16" /> <path d="M6 20h6" /> <path d="M19 4v16" /> <path d="m16 17 3 3 3-3" />`,x:`<path d="M18 6 6 18" /> <path d="m6 6 12 12" />`,"zoom-in":`<circle cx="11" cy="11" r="8" /> <line x1="21" x2="16.65" y1="21" y2="16.65" /> <line x1="11" x2="11" y1="8" y2="14" /> <line x1="8" x2="14" y1="11" y2="11" />`,"zoom-out":`<circle cx="11" cy="11" r="8" /> <line x1="21" x2="16.65" y1="21" y2="16.65" /> <line x1="8" x2="14" y1="11" y2="11" />`};Object.keys(sa);var ca=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),K=o(((e,t)=>{t.exports=ca()}))();function q({name:e,size:t=24,label:n,className:r}){return(0,K.jsx)(`svg`,{className:r,width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`var(--ds-border-width-icon)`,strokeLinecap:`round`,strokeLinejoin:`round`,role:n?`img`:void 0,"aria-label":n,"aria-hidden":!n||void 0,focusable:`false`,dangerouslySetInnerHTML:{__html:sa[e]}})}var la=.3,ua=.01,da=.15,fa=24,pa=.6,ma=4;function ha(e){let t=e.getBoundingClientRect(),n=e.offsetWidth||t.width,r=e.offsetHeight||t.height,i=t.width/n,a=e.cloneNode(!0);a.removeAttribute(`data-row-id`),a.removeAttribute(`data-row-index`),a.querySelectorAll(`[data-row-id], [data-col-id]`).forEach(e=>{e.removeAttribute(`data-row-id`),e.removeAttribute(`data-col-id`)}),a.querySelectorAll(`[contenteditable]`).forEach(e=>{e.contentEditable=`false`});let o=getComputedStyle(e).writingMode.startsWith(`vertical`);return Object.assign(a.style,{position:`fixed`,left:`0`,top:`0`,width:`${n}px`,...o?{height:`${r}px`}:{},margin:`0`,pointerEvents:`none`,zIndex:`9999`,opacity:`0.92`,background:`var(--ds-surface-raised)`,borderRadius:`8px`,boxShadow:`0 0 0 1.5px var(--ds-border-hover), 0 18px 40px rgba(26, 25, 23, 0.18)`,transformOrigin:`top left`,writingMode:getComputedStyle(e).writingMode}),document.body.appendChild(a),{ghost:a,scale:i}}function ga(e,t){let n=e.querySelectorAll(`[data-col-id]`);if(n.length!==1)return{};let r=n[0],i=r.querySelectorAll(`[data-block-id]`);if(i.length!==1)return{};let a=r.getBoundingClientRect(),o=i[0].getBoundingClientRect(),s=t?a.height:a.width,c=t?o.top-a.top:o.left-a.left,l=t?o.bottom-a.top:o.right-a.left;return s<=0||Math.abs(c)>2||l/s>.85?{}:{keepPct:l/(s-48*(r.offsetWidth?a.width/r.offsetWidth:1))*100,fitPct:100}}function _a(e,t,n){let r=(0,R.useRef)(null),i=(0,R.useRef)(null);return{startDrag:(0,R.useCallback)((a,o)=>{let s=a.currentTarget,c=o.columnId?a.target.closest(`[data-row-id]`)?.querySelector(`[data-col-id="${o.columnId}"]`)??null:a.target.closest(`[data-row-id]`),l=a.clientX,u=a.clientY,d=c?.closest(`[data-row-id]`)?.getBoundingClientRect()??null,f=o.columnId?1:c?.querySelectorAll(`[data-col-id]`).length||1,p=d?u-d.top:null,m=!1,h=null,g=0,_=0,v=1,y=0,b=0,x=(e,t)=>{let n=[...document.querySelectorAll(`main [data-page-index]`)],r=null,a=1/0;for(let i of n){let n=i.getBoundingClientRect(),o=t<n.top?n.top-t:t>n.bottom?t-n.bottom:0,s=e<n.left?n.left-e:e>n.right?e-n.right:0,c=Math.hypot(s,o);c<a&&(a=c,r=i)}if(r){let t=[...r.querySelectorAll(`[data-flow-panel]`)];if(t.length>0){let n=1/0,i=null;for(let r of t){let t=r.getBoundingClientRect(),a=e<t.left?t.left-e:e>t.right?e-t.right:0;a<n&&(n=a,i=r)}i&&(r=i)}}let o=[...(r??document).querySelectorAll(`[data-row-id]`)],s=o.some(e=>e.dataset.rowId!==i.current?.rowId||i.current?.columnId);if((o.length===0||!s)&&(o=[...document.querySelectorAll(`main [data-row-id]`)]),o.length===0)return null;let c=o[0].closest(`[data-vertical]`)!==null||getComputedStyle(o[0]).writingMode.startsWith(`vertical`),l=((e,t)=>c?-e:t)(e,t),u=e-g+y/2,d=t-_+b/2,m=c?d:u,h=null;for(let n of o){if(n.dataset.rowId===i.current?.rowId&&!i.current?.columnId)continue;let r=n.getBoundingClientRect(),a=c?-r.right:r.top,o=c?-r.left:r.bottom,s=l<a?a-l:l>o?l-o:0,u=c?r.top:r.left,d=c?r.bottom:r.right,f=c?t:e,p=f<u?u-f:f>d?f-d:0,m=Math.hypot(s,p);(!h||m<h.dist)&&(h={frame:n,r,dist:m})}if(!h)return null;let{frame:v,r:x}=h,S=Number(v.dataset.rowIndex),C=v.dataset.rowId,w=C===i.current?.rowId,T=v.querySelectorAll(`[data-col-id]`).length||1;if(c&&!w&&T+f<=3&&p!==null){let n=v.closest(`[data-page-index]`)?.getBoundingClientRect(),r=e>=x.left-fa&&e<=x.right+fa;if(n&&n.height>0&&r){let e=(t-(x.top+p))/n.height,r=da*n.height,i=t>x.top-r&&t<x.bottom+r,a=(t-x.top)/x.height;if(i&&a<la&&e<-.01)return{mode:`column`,rowId:C,side:`left`,...ga(v,!0)};if(i&&a>pa&&e>ua)return{mode:`column`,rowId:C,side:`right`,...ga(v,!0)}}}let E=h.dist===0,D=c?x.top:x.left,O=c?x.height:x.width,k=(m-D)/O;if(!c&&E&&!w&&T+f<=5){if(k<la)return{mode:`column`,rowId:C,side:`left`,...ga(v,!1)};if(k>.7)return{mode:`column`,rowId:C,side:`right`,...ga(v,!1)}}return{mode:`row`,index:l>(c?-(x.left+x.width/2):x.top+x.height/2)?S+1:S}},S=n=>{if(!m){if(Math.hypot(n.clientX-l,n.clientY-u)<ma)return;if(m=!0,i.current=o,e(o.rowId),c){let e=c.getBoundingClientRect();g=l-e.left,_=u-e.top,y=e.width,b=e.height,{ghost:h,scale:v}=ha(c)}}h&&(h.style.transform=`translate(${n.clientX-g}px, ${n.clientY-_}px) scale(${v})`);let a=x(n.clientX,n.clientY);h&&(h.style.opacity=a?.mode===`column`?`0.4`:`0.92`),r.current=a,t(a)},C=a=>{window.removeEventListener(`pointermove`,S),window.removeEventListener(`pointerup`,C),window.removeEventListener(`pointercancel`,C);try{s?.releasePointerCapture?.(a.pointerId)}catch{}let o=m?x(a.clientX,a.clientY)??r.current:null,c=i.current;h?.remove(),h=null,i.current=null,r.current=null,e(null),t(null),c&&o&&n(c,o)};try{s?.setPointerCapture?.(a.pointerId)}catch{}window.addEventListener(`pointermove`,S),window.addEventListener(`pointerup`,C),window.addEventListener(`pointercancel`,C),a.preventDefault()},[e,t,n])}}function va(e){let t=structuredClone(e);return t.id=V(`blk`),t.popups=t.popups.map(e=>({...e,id:V(`pop`)})),t}var ya=null,ba=e=>{ya=structuredClone(e)},xa=()=>ya?va(ya):null,Sa=()=>ya!==null,Ca=`/textbook-editor/assets/mulan-loom-Beu-FwvS.jpg`,wa=`/textbook-editor/assets/mulan-portrait-DfALosp2.jpg`,Ta=`/textbook-editor/assets/mulan-silk-painting-Bam35q3R.jpg`,Ea=`/textbook-editor/assets/mulan-weaver-BYkZYHJ5.jpg`,Da=`/textbook-editor/assets/mulan-yanshan-BVZnMOjV.jpg`,Oa=`/textbook-editor/assets/mulan-yellow-river-nXsO3mqh.jpg`,ka=`/textbook-editor/assets/orion-lines-ZQZf8xXR.jpg`,Aa=`/textbook-editor/assets/star-chart-BdKTogOW.jpg`,ja=`/textbook-editor/assets/star-trails-IsCLAFTk.jpg`,Ma=`/textbook-editor/assets/summer-triangle-aaFPeENU.jpg`,Na={"summer-triangle.jpg":{width:1200,height:938,title:`Summer Triangle2`,author:`Giuseppe Donatiello, Giovanni Vincenzo Donatiello`,license:`CC0`,licenseUrl:`https://creativecommons.org/publicdomain/zero/1.0/`,source:`https://commons.wikimedia.org/wiki/File:Summer_Triangle2.jpg`},"star-trails.jpg":{width:1200,height:901,title:`Star stack Star trail`,author:`Youniverse Multiverse`,license:`CC0`,licenseUrl:`https://creativecommons.org/publicdomain/zero/1.0/`,source:`https://commons.wikimedia.org/wiki/File:Star_stack_Star_trail.jpg`},"orion-lines.jpg":{width:1200,height:800,title:`Orion constellation explained`,author:`Taavi Niittee (Nielander)`,license:`CC0`,licenseUrl:`https://creativecommons.org/publicdomain/zero/1.0/`,source:`https://commons.wikimedia.org/wiki/File:Orion_constellation_explained.jpg`},"star-chart.jpg":{width:1200,height:1725,title:`Sidney Hall - Urania's Mirror - Orion (1824)`,author:`Sidney Hall（雕版，1824）；數位修復 Adam Cuerden`,license:`Public domain`,licenseUrl:null,source:`https://commons.wikimedia.org/wiki/File:Sidney_Hall_-_Urania%27s_Mirror_-_Orion_(best_currently_available_version_-_2014).jpg`},"mulan-portrait.jpg":{width:699,height:1200,title:`Mulan（《歷朝名媛詩詞》木刻版畫，1772）`,author:`陸昶編《歷朝名媛詩詞》；Harvard-Yenching Library 藏`,license:`Public domain`,licenseUrl:null,source:`https://commons.wikimedia.org/wiki/File:Mulan.jpg`},"mulan-silk-painting.jpg":{width:699,height:1200,title:`Mulan, 18th century, ink and colors on silk`,author:`款署「實父仇英製」；大英博物館藏`,license:`Public domain`,licenseUrl:null,source:`https://commons.wikimedia.org/wiki/File:Mulan,_18th_century,_ink_and_colors_on_silk.jpg`},"mulan-loom.jpg":{width:1200,height:800,title:`Jizhu - Chinese Loom & Shuttle, Hangzhou National Archives 38`,author:`CatOnMars`,license:`CC BY 4.0`,licenseUrl:`https://creativecommons.org/licenses/by/4.0`,source:`https://commons.wikimedia.org/wiki/File:Jizhu_-_Chinese_Loom_%26_Shuttle,_Hangzhou_National_Archives_38.jpg`},"mulan-weaver.jpg":{width:1200,height:800,title:`Lijiang Yunnan China-Woman-with-weaving-loom-01`,author:`CEphoto, Uwe Aranas`,license:`CC BY-SA 3.0`,licenseUrl:`https://creativecommons.org/licenses/by-sa/3.0`,source:`https://commons.wikimedia.org/wiki/File:Lijiang_Yunnan_China-Woman-with-weaving-loom-01.jpg`},"mulan-yellow-river.jpg":{width:1200,height:675,title:`Hukou Waterfalls, Shaanxi 3`,author:`H2v5o68z`,license:`CC0`,licenseUrl:`https://creativecommons.org/publicdomain/zero/1.0/`,source:`https://commons.wikimedia.org/wiki/File:Hukou_Waterfalls,_Shaanxi_3.jpg`},"mulan-yanshan.jpg":{width:1200,height:507,title:`Yan Mountain in Qinhuangdao`,author:`PQ77wd`,license:`CC BY-SA 4.0`,licenseUrl:`https://creativecommons.org/licenses/by-sa/4.0`,source:`https://commons.wikimedia.org/wiki/File:Yan_Mountain_in_Qinhuangdao.jpg`}},Pa=Object.assign({"../../design/media/mulan-loom.jpg":Ca,"../../design/media/mulan-portrait.jpg":wa,"../../design/media/mulan-silk-painting.jpg":Ta,"../../design/media/mulan-weaver.jpg":Ea,"../../design/media/mulan-yanshan.jpg":Da,"../../design/media/mulan-yellow-river.jpg":Oa,"../../design/media/orion-lines.jpg":ka,"../../design/media/star-chart.jpg":Aa,"../../design/media/star-trails.jpg":ja,"../../design/media/summer-triangle.jpg":Ma}),Fa=e=>(e.split(`/`).pop()??e).replace(/\.[^.]+$/,``),Ia=new Map(Object.entries(Pa).map(([e,t])=>[Fa(e),t])),La=new Map(Object.entries(Na).map(([e,t])=>[Fa(e),t])),Ra=e=>e?La.get(Fa(e)):void 0,za=e=>Ia.get(Fa(e));function Ba(e){let t=e=>{if(e.type!==`image`||!e.assetId)return e;let t=La.get(Fa(e.assetId));return t?{...e,aspectRatio:t.width/t.height}:e},n=e.rows.map(e=>({...e,columns:e.columns.map(e=>({...e,blocks:e.blocks.map(t)}))}));return{...e,rows:n}}var Va=new Map,Ha=0,Ua=[],Wa=new Set,Ga=0,Ka=()=>Ga;function qa(){Ga+=1,Wa.forEach(e=>e())}var Ja=e=>Ua.filter(t=>!e||t.kind===e).slice().reverse();function Ya(e){return Wa.add(e),()=>Wa.delete(e)}var Xa=e=>{let t=e.type;return t.startsWith(`image/`)?`image`:t.startsWith(`video/`)?`video`:t.startsWith(`audio/`)?`audio`:t===`application/pdf`||/\.pdf$/i.test(e.name)?`pdf`:`file`},Za=Xa,Qa=e=>Ua.find(t=>t.assetId===e),$a=e=>e?Va.get(e)??za(e):void 0;function eo(e){let t=`asset-${Ha+=1}`,n=Xa(e);return Va.set(t,URL.createObjectURL(e)),Ua.push({assetId:t,kind:n,name:e.name,addedAt:Date.now(),...n===`video`?{source:`upload`}:{}}),qa(),t}function to(e){let t=Ua.find(t=>t.assetId===e);t&&(t.favorite=!t.favorite,qa())}function no(e){let t=Ua.findIndex(t=>t.assetId===e);t<0||(Ua.splice(t,1),qa())}function ro(e){let t=`asset-${Ha+=1}`;return Va.set(t,URL.createObjectURL(e)),t}function io(e,t){let n={assetId:`asset-${Ha+=1}`,kind:`web`,name:t?.trim()||ao(e),addedAt:Date.now(),url:e};return Ua.push(n),qa(),n}function J(e){let t=lo(e.trim());if(!t)return null;let n={assetId:`asset-${Ha+=1}`,kind:`video`,source:`youtube`,name:`YouTube 影片 ${t}`,addedAt:Date.now(),url:e.trim()};return Ua.push(n),qa(),n}var ao=e=>{try{return new URL(e).hostname||e}catch{return e}};function oo(e,t){let n=Ua.find(t=>t.assetId===e);n&&Object.assign(n,t),qa()}function so(e){return new Promise((t,n)=>{let r=eo(e),i=Va.get(r),a=new Image;a.onload=()=>{let e=a.naturalHeight>0?a.naturalWidth/a.naturalHeight:1.5;oo(r,{kind:`image`,aspectRatio:e}),t({assetId:r,aspectRatio:e})},a.onerror=()=>{Va.delete(r);let e=Ua.findIndex(e=>e.assetId===r);e>=0&&Ua.splice(e,1),URL.revokeObjectURL(i),n(Error(`讀不到這張圖`))},a.src=i})}function co(e){return new Promise(t=>{let n=document.createElement(`input`);n.type=`file`,n.accept=e,n.oncancel=()=>t(null),n.onchange=()=>t(n.files?.[0]??null),n.click()})}function lo(e){if(/^[\w-]{11}$/.test(e))return e;let t=e.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);return t?t[1]:null}var uo=(e,t,n)=>Math.min(Math.max(e,t),Math.max(t,n)),fo=(e,t)=>e.left<t.left+t.width&&e.left+e.width>t.left&&e.top<t.top+t.height&&e.top+e.height>t.top;function po(e,t,n,r){let{width:i,height:a}=n,o=e=>uo(e-i/2,12,r.width-12-i),s=(e,t)=>uo(e-t,16,i-16),c=e.left+e.width/2,l=o(c),u=e.top-12-8-a,d={top:u,left:l,width:i,height:a+8};if(u>=12&&!fo(d,t))return{top:u,left:l,side:`above`,arrow:s(c,l)};let f=e.top+e.height+12+8,p={top:f-8,left:l,width:i,height:a+8};if(f+a<=r.height-12&&!fo(p,t))return{top:f,left:l,side:`below`,arrow:s(c,l)};let m=t.left+t.width/2,h=o(m);return{top:uo(t.top+t.height+12+8,12,r.height-12-a),left:h,side:`below`,arrow:s(m,h)}}function mo(e,t,n,r){let{width:i,height:a}=n,o=e.top+e.height/2,s=uo(o-a/2,12,r.height-12-a),c=uo(o-s,16,a-16),l=Math.min(e.left,t.left)-12-8-i;if(l>=12)return{top:s,left:l,side:`left`,arrow:c};let u=Math.max(e.left+e.width,t.left+t.width)+12+8;return u+i<=r.width-12?{top:s,left:u,side:`right`,arrow:c}:po(e,t,n,r)}function ho({item:e}){if(e.source===`youtube`){let t=lo(e.ref);return t?(0,K.jsx)(_o,{src:`https://www.youtube-nocookie.com/embed/${t}`,title:e.title||`影片`,allow:`accelerometer; clipboard-write; encrypted-media; picture-in-picture`,allowFullScreen:!0}):(0,K.jsx)(go,{children:`影片網址無法辨識`})}let t=$a(e.ref||null);return t?(0,K.jsx)(bo,{src:t,title:e.title}):(0,K.jsx)(go,{children:`影片還沒上傳`})}var go=B.span`
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.feedback.warningDefault};
`,_o=B.iframe`
  display: block;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
`,vo=3500,yo=e=>{(!Number.isFinite(e)||e<0)&&(e=0);let t=Math.floor(e/60),n=Math.floor(e%60);return`${String(t).padStart(2,`0`)}:${String(n).padStart(2,`0`)}`};function bo({src:e,title:t,style:n,autoPlay:r}){let i=(0,R.useRef)(null),a=(0,R.useRef)(null),o=(0,R.useRef)(null),[s,c]=(0,R.useState)(!1),[l,u]=(0,R.useState)(0),[d,f]=(0,R.useState)(0),[p,m]=(0,R.useState)(1),[h,g]=(0,R.useState)(!1),[_,v]=(0,R.useState)(!0),[y,b]=(0,R.useState)(!0),[x,S]=(0,R.useState)(!1),C=()=>{v(!0),b(!0),o.current&&window.clearTimeout(o.current),o.current=window.setTimeout(()=>{b(!1),a.current&&!a.current.paused&&v(!1)},vo)};(0,R.useEffect)(()=>(o.current=window.setTimeout(()=>{b(!1),a.current&&!a.current.paused&&v(!1)},vo),()=>{o.current&&window.clearTimeout(o.current)}),[]);let w=()=>{let e=a.current;e&&(e.paused?e.play().catch(()=>{}):e.pause())};return(0,K.jsxs)(Co,{ref:i,style:n,$idle:!_&&!y,onPointerEnter:C,onPointerMove:C,onPointerLeave:()=>{b(!1),s&&v(!1)},children:[(0,K.jsx)(wo,{ref:a,src:e,title:t,playsInline:!0,autoPlay:r,onClick:w,onPlay:()=>{c(!0),C()},onPause:()=>{c(!1),C()},onTimeUpdate:e=>u(e.currentTarget.currentTime),onDurationChange:e=>f(e.currentTarget.duration),onLoadedMetadata:e=>f(e.currentTarget.duration),onVolumeChange:e=>{m(e.currentTarget.volume),g(e.currentTarget.muted)}}),t&&(0,K.jsx)(To,{$visible:y,children:(0,K.jsx)(Eo,{children:t})}),(0,K.jsxs)(Do,{$visible:_,onPointerDown:e=>e.stopPropagation(),children:[(0,K.jsxs)(Oo,{children:[(0,K.jsx)(ko,{type:`button`,onClick:w,"aria-label":s?`暫停`:`播放`,children:(0,K.jsx)(So,{name:s?`pause`:`play`})}),(0,K.jsxs)(Ao,{children:[yo(l),` / `,yo(d)]}),(0,K.jsx)(xo,{"aria-label":`播放進度`,value:d>0?l/d:0,onChange:e=>{let t=a.current;!t||!Number.isFinite(t.duration)||(t.currentTime=Math.max(0,Math.min(1,e))*t.duration,u(t.currentTime))}})]}),(0,K.jsxs)(Oo,{$compact:!0,onPointerEnter:()=>S(!0),onPointerLeave:()=>S(!1),children:[(0,K.jsx)(ko,{type:`button`,onClick:()=>{let e=a.current;e&&(e.muted=!e.muted,g(e.muted))},"aria-label":h?`取消靜音`:`靜音`,children:(0,K.jsx)(So,{name:h||p===0?`volume-x`:`volume`})}),(0,K.jsx)(jo,{$open:x,children:(0,K.jsx)(xo,{"aria-label":`音量`,value:h?0:p,onChange:e=>{let t=a.current;if(!t)return;let n=Math.max(0,Math.min(1,e));t.volume=n,t.muted=n===0,m(n),g(t.muted)}})}),(0,K.jsx)(ko,{type:`button`,onClick:()=>{let e=i.current;e&&(document.fullscreenElement?document.exitFullscreen():e.requestFullscreen?.())},"aria-label":`全螢幕`,children:(0,K.jsx)(So,{name:`maximize`})})]})]})]})}function xo({value:e,onChange:t,"aria-label":n}){let r=Math.round(Math.max(0,Math.min(1,e))*1e3)/10;return(0,K.jsx)(Mo,{type:`range`,min:0,max:1e3,value:Math.round(e*1e3),"aria-label":n,style:{"--fill":`${r}%`},onChange:e=>t(Number(e.target.value)/1e3)})}function So({name:e,size:t=20}){return(0,K.jsx)(q,{name:e,size:t})}var Co=B.div`
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
`,wo=B.video`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
`,To=B.div`
  position: absolute;
  inset-inline: 12px;
  inset-block-start: 12px;
  display: flex;
  align-items: center;
  opacity: ${e=>+!!e.$visible};
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 2;
`,Eo=B.span`
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
`,Do=B.div`
  position: absolute;
  inset-inline: 12px;
  inset-block-end: 12px;
  display: flex;
  gap: 8px;
  opacity: ${e=>+!!e.$visible};
  pointer-events: ${e=>e.$visible?`auto`:`none`};
  transition: opacity 0.3s ease;
  z-index: 2;
`,Oo=B.div`
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
`,ko=B.button`
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
`,Ao=B.span`
  flex: none;
  font-size: var(--ds-typography-caption-size);
  font-variant-numeric: tabular-nums;
  color: ${e=>e.theme.text.secondary};
  white-space: nowrap;
`,jo=B.div`
  inline-size: ${e=>e.$open?`96px`:`0`};
  overflow: hidden;
  transition: inline-size 0.16s;
  display: flex;
  align-items: center;
`,Mo=B.input`
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
`,No=e=>e instanceof Element?e.getBoundingClientRect():e,Po=e=>e instanceof Element&&e.parentElement?e.parentElement.getBoundingClientRect():No(e),Fo=(e,t)=>e.top===t.top&&e.left===t.left&&e.side===t.side&&e.arrow===t.arrow,Io=e=>e instanceof Element&&(getComputedStyle(e).writingMode.startsWith(`vertical`)||!e.closest(`[data-horizontal]`)&&!!e.closest(`[data-vertical]`));function Lo({block:e,item:t,anchor:n,onClose:r,onJump:i,onEdit:a,items:o,onPick:s,lead:c}){let l=(0,R.useRef)(null),[u,d]=(0,R.useState)(null),f=Io(n);(0,R.useLayoutEffect)(()=>{let e=l.current;if(!e)return;let t=()=>{if(n instanceof Element&&!n.isConnected){r();return}let t=e.getBoundingClientRect(),i=(f?mo:po)(No(n),Po(n),{width:t.width,height:t.height},{width:window.innerWidth,height:window.innerHeight});d(e=>e&&Fo(e,i)?e:i)};t(),window.addEventListener(`scroll`,t,!0),window.addEventListener(`resize`,t);let i=typeof ResizeObserver>`u`?null:new ResizeObserver(t);return i?.observe(e),()=>{window.removeEventListener(`scroll`,t,!0),window.removeEventListener(`resize`,t),i?.disconnect()}},[n,r,f]),(0,R.useEffect)(()=>{let e=e=>{l.current?.contains(e.target)||r()};return document.addEventListener(`pointerdown`,e,!0),()=>document.removeEventListener(`pointerdown`,e,!0)},[r]);let p=kr(t),m=u?.side??`above`,h=u?{top:u.top,left:u.left}:{top:0,left:0,visibility:`hidden`};if(!o&&t.kind===`audio`&&!kr(t))return(0,G.createPortal)((0,K.jsxs)(Vo,{ref:l,role:`dialog`,"aria-label":`補充內容：${Nr(t)}`,style:h,$wide:!0,$vertical:f,children:[(0,K.jsx)(Ho,{$side:m,$at:u?.arrow??0}),(0,K.jsx)(Ro,{items:[t],autoPlay:!0})]}),document.body);if(!o&&t.kind===`jump`&&!kr(t))return(0,G.createPortal)((0,K.jsxs)(Vo,{ref:l,role:`dialog`,"aria-label":`補充內容：${Nr(t)}`,style:h,$wide:!0,$vertical:f,children:[(0,K.jsx)(Ho,{$side:m,$at:u?.arrow??0}),(0,K.jsx)(es,{$bare:!0,children:(0,K.jsxs)(as,{type:`button`,$bare:!0,onClick:()=>{r(),t.targetRowId&&i?.(t.targetRowId)},children:[(0,K.jsx)(ss,{children:(0,K.jsx)(cs,{children:t.title.trim()||`前往`})}),(0,K.jsx)(os,{$vertical:f,name:`arrow-up-right`,size:20})]})})]}),document.body);if(o&&s){let e=o.every(e=>e.kind===`text`||e.kind===`jump`||e.kind===`audio`);return(0,G.createPortal)((0,K.jsxs)(Vo,{ref:l,role:`dialog`,"aria-label":`補充內容 ${o.length} 項`,style:h,$wide:!0,$vertical:f&&(e||!!c),children:[(0,K.jsx)(Ho,{$side:m,$at:u?.arrow??0}),c&&(0,K.jsxs)(qo,{children:[c.title.trim()&&(0,K.jsx)(Jo,{children:c.title}),(0,K.jsx)(Yo,{children:c.body})]}),o.every(e=>e.kind===`audio`)?(0,K.jsx)(Ro,{items:o}):o.every(e=>e.kind===`jump`)?(0,K.jsx)(es,{children:o.map(e=>(0,K.jsxs)(as,{type:`button`,onClick:()=>s(e),children:[(0,K.jsx)(ss,{children:(0,K.jsx)(cs,{children:e.title.trim()||`前往`})}),(0,K.jsx)(os,{$vertical:f,name:`arrow-up-right`,size:20})]},e.id))}):o.every(e=>e.kind===`text`)?(0,K.jsx)(es,{children:o.map(e=>(0,K.jsxs)(as,{type:`button`,onClick:()=>s(e),children:[(0,K.jsx)(ss,{children:e.title.trim()?(0,K.jsx)(cs,{children:e.title}):e.kind===`text`&&(0,K.jsx)(ls,{$lines:2,children:e.body})}),(0,K.jsx)(q,{name:f?`chevron-down`:`chevron-right`,size:20})]},e.id))}):(0,K.jsx)(Xo,{$vertical:f,children:o.map(e=>(0,K.jsxs)(Zo,{type:`button`,onClick:()=>s(e),children:[(0,K.jsx)(zo,{item:e}),e.title.trim()&&(0,K.jsx)($o,{children:e.title})]},e.id))})]}),document.body)}return(0,G.createPortal)((0,K.jsxs)(Vo,{ref:l,role:`dialog`,"aria-label":`補充內容：${Nr(t)}`,style:h,$vertical:f,children:[(0,K.jsx)(Ho,{$side:m,$at:u?.arrow??0}),(0,K.jsxs)(Uo,{$float:!t.title.trim(),children:[(0,K.jsx)(Wo,{children:t.title.trim()}),a&&(0,K.jsx)(Go,{onClick:()=>{r(),a(e.id)},"aria-label":`編輯補充內容`,title:`編輯補充內容`,children:(0,K.jsx)(q,{name:`pencil`,size:16})}),!f&&(0,K.jsx)(Go,{onClick:r,"aria-label":`關閉`,children:(0,K.jsx)(q,{name:`x`,size:16,label:`關閉`})})]}),(0,K.jsx)(Ko,{$top:!t.title.trim()&&(!f||!!a),$vertical:f,children:p?(0,K.jsx)(go,{children:p}):(0,K.jsx)(Bo,{item:t})})]}),document.body)}function Ro({items:e,autoPlay:t=!1}){let n=e.length===1,r=(0,R.useRef)(null),[i,a]=(0,R.useState)(null),[o,s]=(0,R.useState)(0);(0,R.useEffect)(()=>()=>r.current?.pause(),[]),(0,R.useEffect)(()=>{t&&e[0]&&c(e[0])},[]);let c=e=>{if(i===e.id){r.current?.pause(),a(null);return}r.current?.pause();let t=new Audio($a(e.assetId));t.ontimeupdate=()=>s(t.duration?t.currentTime/t.duration:0),t.onended=()=>{a(null),s(0)},r.current=t,s(0),a(e.id),t.play().catch(()=>{})};return(0,K.jsx)(es,{$bare:n,children:e.map(e=>{let t=i===e.id;return(0,K.jsxs)(ts,{$bare:n,children:[(0,K.jsxs)(ns,{type:`button`,$on:t,onClick:()=>c(e),"aria-label":t?`暫停 ${Nr(e)}`:`播放 ${Nr(e)}`,children:[t&&(0,K.jsx)(rs,{viewBox:`0 0 36 36`,"aria-hidden":!0,children:(0,K.jsx)(`circle`,{cx:`18`,cy:`18`,r:`17`,pathLength:1,strokeDasharray:`${o} 1`})}),(0,K.jsx)(q,{name:t?`pause`:`play`,size:16})]}),(0,K.jsx)(is,{children:e.title.trim()||e.assetId&&Qa(e.assetId)?.name||``})]},e.id)})})}function zo({item:e}){if(e.kind===`image`&&e.assetId)return(0,K.jsx)(Qo,{children:(0,K.jsx)(`img`,{src:$a(e.assetId),alt:``})});if(e.kind===`video`){let t=e.source===`youtube`?lo(e.ref):null;if(t)return(0,K.jsx)(Qo,{children:(0,K.jsx)(`img`,{src:`https://img.youtube.com/vi/${t}/hqdefault.jpg`,alt:``})});let n=$a(e.ref);if(n)return(0,K.jsx)(Qo,{children:(0,K.jsx)(`video`,{src:`${n}#t=0.1`,muted:!0,preload:`metadata`,playsInline:!0})})}return(0,K.jsx)(Qo,{$icon:!0,children:(0,K.jsx)(q,{name:Er[e.kind].icon,size:24})})}function Bo({item:e}){switch(e.kind){case`text`:return(0,K.jsx)(Yo,{children:e.body});case`image`:case`video`:case`web`:case`rich`:case`audio`:case`jump`:return null}}var Vo=B.div`
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
`,Ho=B.span`
  position: absolute;
  width: 12px;
  height: 12px;
  background: ${e=>e.theme.surface.raised};
  ${e=>{switch(e.$side){case`above`:return`bottom: -6px; left: ${e.$at}px; transform: translateX(-50%) rotate(45deg);`;case`below`:return`top: -6px; left: ${e.$at}px; transform: translateX(-50%) rotate(45deg);`;case`left`:return`right: -6px; top: ${e.$at}px; transform: translateY(-50%) rotate(45deg);`;case`right`:return`left: -6px; top: ${e.$at}px; transform: translateY(-50%) rotate(45deg);`}}}
  pointer-events: none;
`,Uo=B.header`
  ${e=>e.$float&&`position: absolute; top: 0; right: 0; z-index: 1;`}
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetXs} ${e=>e.theme.space.insetXs} 0 ${e=>e.theme.space.insetMd};
`,Wo=B.strong`
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
`,Go=B.button`
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
`,Ko=B.div`
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
`,qo=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapXs};
  padding: ${e=>e.theme.space.insetMd};
  /* 跟下面的清單之間不重複留白；直排時 block-end 是左邊，照樣成立 */
  padding-block-end: 0;
  max-inline-size: 360px;
`,Jo=B.strong`
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
`,Yo=B.p`
  margin: 0;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${e=>e.theme.text.primary};
  white-space: pre-wrap;
  /* 一長串沒有空格的英數字（網址、測試字）也要能折行，不然直排時整串衝出泡泡 */
  overflow-wrap: anywhere;
`,Xo=B.div`
  /* 縮圖卡本身維持橫的（圖與標題不轉向）；泡泡直排時它是排在註釋左邊的一欄 */
  writing-mode: horizontal-tb;
  display: flex;
  ${e=>e.$vertical&&`flex-direction: column; max-height: min(70vh, 560px);`}
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetMd};
  overflow: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`,Zo=B.button`
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
`,Qo=B.span`
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
`,$o=B.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,es=B.div`
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
`,ts=B.div`
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
`,ns=B.button`
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
`,rs=B.svg`
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
`,is=B.span`
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.primary};
`,as=B.button`
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
`,os=B(q)`
  flex: none;
  ${e=>e.$vertical&&`transform: rotate(180deg);`}
`,ss=B.span`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,cs=B.strong`
  font-size: var(--ds-typography-body-size);
  font-weight: 500;
  color: ${e=>e.theme.text.primary};
`,ls=B.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${e=>e.$lines};
  overflow: hidden;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${e=>e.theme.text.primary};
`;function us(e){try{let t=new URL(e.trim());return t.protocol===`http:`||t.protocol===`https:`?t.href:null}catch{return null}}function ds(e){let t=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,{acceptNode:e=>e.parentElement?.closest(`rt, [data-fn]`)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}),n=[],r=t.nextNode();for(;r;)n.push(r),r=t.nextNode();return n}function fs(e){if(e.nodeType===Node.TEXT_NODE)return e.parentElement?.closest(`rt, [data-fn]`)?0:e.textContent?.length??0;if(e.nodeType===Node.ELEMENT_NODE){let t=e;if(t.closest(`rt, [data-fn]`))return 0;let n=0;for(let e of Array.from(t.childNodes))n+=fs(e);return n}return 0}function ps(e,t,n){let r=0;for(let i of ds(e)){if(i===t)return r+n;r+=i.length}if(t===e){let t=0;for(let r=0;r<n&&r<e.childNodes.length;r+=1)t+=fs(e.childNodes[r]);return t}if(e.contains(t)){let r=0;for(let e=0;e<n&&e<t.childNodes.length;e+=1)r+=fs(t.childNodes[e]);let i=0;for(let n of ds(e)){if(t.contains(n))break;if(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING)i+=n.length;else break}return i+r}return r}function ms(e,t){let n=t,r=ds(e);for(let e of r){if(n<=e.length)return{node:e,offset:n};n-=e.length}let i=r[r.length-1];return i?{node:i,offset:i.length}:{node:e,offset:0}}function hs(e){let t=document.getSelection();if(!t||t.rangeCount===0)return null;let n=t.getRangeAt(0);return e.contains(n.startContainer)?ps(e,n.startContainer,n.startOffset):null}function gs(e,t){let n=document.getSelection();if(!n)return;let{node:r,offset:i}=ms(e,t),a=document.createRange();a.setStart(r,i),a.collapse(!0),n.removeAllRanges(),n.addRange(a)}function _s(e,t,n){let r=document.getSelection();if(!r)return;let i=ms(e,t),a=ms(e,n),o=document.createRange();o.setStart(i.node,i.offset),o.setEnd(a.node,a.offset),r.removeAllRanges(),r.addRange(o)}function vs(e){let t=document.getSelection();if(!t||t.rangeCount===0||t.isCollapsed)return null;let n=t.getRangeAt(0);if(!e.contains(n.startContainer)||!e.contains(n.endContainer))return null;let r=ps(e,n.startContainer,n.startOffset),i=ps(e,n.endContainer,n.endOffset);return r===i?null:{start:Math.min(r,i),end:Math.max(r,i)}}function ys({spans:e,onChange:t,onSelect:n,className:r,style:i,placeholder:a,onFocus:o,...s}){let c=(0,R.useRef)(null),l=(0,R.useRef)(null);(0,R.useEffect)(()=>{let t=c.current;if(!t)return;let n=ia(e);if(n===l.current)return;let r=document.activeElement===t,i=r?vs(t):null,a=r?hs(t):null;t.innerHTML=n,l.current=n,i?_s(t,i.start,i.end):a!==null&&gs(t,a)},[e]);let u=(0,R.useRef)(!1),d=(0,R.useCallback)(()=>{let e=c.current;if(!e||!n)return;let t=document.getSelection();if(t&&t.rangeCount>0&&e.contains(t.getRangeAt(0).startContainer)){let t=vs(e);u.current=t!==null,n(t)}else if(u.current){if(document.activeElement?.closest(`[data-text-popover]`))return;u.current=!1,n(null)}},[n]);return(0,R.useEffect)(()=>{if(n)return document.addEventListener(`selectionchange`,d),()=>document.removeEventListener(`selectionchange`,d)},[n,d]),(0,K.jsx)(`div`,{ref:c,className:r,style:i,contentEditable:!0,suppressContentEditableWarning:!0,role:`textbox`,"aria-multiline":`true`,"data-placeholder":a,...s,onFocus:o,onClick:e=>{let t=c.current,n=e.target.closest(`ruby`);if(!t||!n||!t.contains(n))return;let r=Array.from(n.childNodes).find(e=>e.nodeType===Node.TEXT_NODE);if(!r)return;let i=document.createRange();i.selectNodeContents(r);let a=document.getSelection();a&&(a.removeAllRanges(),a.addRange(i))},onInput:e=>{let n=oa(e.currentTarget);l.current=ia(n),t(n)},onPaste:e=>{e.preventDefault();let t=e.clipboardData.getData(`text/plain`);document.execCommand(`insertText`,!1,t)}})}var bs=z`
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
`,xs=z`
  container-type: size;
  & > [data-compact] {
    display: none;
  }
  @container (max-width: 200px) or (max-height: 150px) {
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
`;function Ss({label:e,action:t,kind:n,primary:r=!0,...i}){return(0,K.jsxs)(Cs,{"data-compact":!0,type:`button`,title:e,"aria-label":e,$primary:r,...i,children:[(0,K.jsx)(`span`,{"data-label":!0,children:e}),(0,K.jsx)(`span`,{"data-action":!0,children:(0,K.jsx)(q,{name:t,size:16})}),(0,K.jsx)(`span`,{"data-kind":!0,children:(0,K.jsx)(q,{name:n,size:20})})]})}var Cs=B.button`
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
  ${e=>!e.$primary&&z`
      &:hover {
        background: ${e.theme.surface.sunken};
        color: ${e.theme.text.primary};
      }
    `}
  &:disabled { cursor: default; }
`,ws=2e3,Ts=new Set;function Es(e){Ts.forEach(t=>t(e))}function Ds(){let[e,t]=(0,R.useState)(null),[n,r]=(0,R.useState)(0);return(0,R.useEffect)(()=>{let e=e=>{t(e),r(e=>e+1)};return Ts.add(e),()=>{Ts.delete(e)}},[]),(0,R.useEffect)(()=>{if(e===null)return;let n=setTimeout(()=>t(null),ws);return()=>clearTimeout(n)},[e,n]),e===null?null:(0,G.createPortal)((0,K.jsx)(ks,{role:`status`,"aria-live":`polite`,children:e},n),document.body)}var Os=Wn`
  from { opacity: 0; transform: translate(-50%, 8px); }
  to   { opacity: 1; transform: translate(-50%, 0); }
`,ks=B.div`
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
  animation: ${Os} 0.18s ease-out;
`,As={x:0,y:0,w:1,h:1},js=null,Ms=new Set;function Ns(e){js=e,Ms.forEach(e=>e())}function Ps(){return(0,R.useSyncExternalStore)(e=>(Ms.add(e),()=>Ms.delete(e)),()=>js)}var Fs=[`nw`,`n`,`ne`,`e`,`se`,`s`,`sw`,`w`],Is=.05;function Ls({src:e,crop:t,boxW:n,boxH:r,onDone:i,onCancel:a}){let o=t??As,s=n/o.w,c=r/o.h,[l,u]=(0,R.useState)(o),d=(0,R.useRef)(null);(0,R.useEffect)(()=>{let e=e=>{e.key===`Escape`?(e.preventDefault(),e.stopPropagation(),a()):e.key===`Enter`&&(e.preventDefault(),f())};return window.addEventListener(`keydown`,e,!0),()=>window.removeEventListener(`keydown`,e,!0)});let f=()=>{i(l.x<=.001&&l.y<=.001&&l.w>=.999&&l.h>=.999?void 0:l)},p=e=>t=>{t.preventDefault(),t.stopPropagation();let n=d.current;if(!n)return;let r=n.getBoundingClientRect().width/(n.offsetWidth||1),i=t.clientX,a=t.clientY,o=l,f=t=>{let n=(t.clientX-i)/r/s,l=(t.clientY-a)/r/c,{x:d,y:f,w:p,h:m}=o;e===`move`?(d=Rs(o.x+n,0,1-o.w),f=Rs(o.y+l,0,1-o.h)):(e.includes(`w`)&&(d=Rs(o.x+n,0,o.x+o.w-Is),p=o.w+(o.x-d)),e.includes(`e`)&&(p=Rs(o.w+n,Is,1-o.x)),e.includes(`n`)&&(f=Rs(o.y+l,0,o.y+o.h-Is),m=o.h+(o.y-f)),e.includes(`s`)&&(m=Rs(o.h+l,Is,1-o.y))),u({x:d,y:f,w:p,h:m})},p=()=>{window.removeEventListener(`pointermove`,f),window.removeEventListener(`pointerup`,p)};window.addEventListener(`pointermove`,f),window.addEventListener(`pointerup`,p)};return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(zs,{}),(0,K.jsxs)(Bs,{ref:d,"data-cropper":!0,style:{left:-o.x*s,top:-o.y*c,width:s,height:c},onPointerDown:e=>e.stopPropagation(),children:[(0,K.jsx)(`img`,{src:e,alt:``,draggable:!1}),(0,K.jsx)(Vs,{style:{left:l.x*s,top:l.y*c,width:l.w*s,height:l.h*c},onPointerDown:p(`move`),children:Fs.map(e=>(0,K.jsx)(Us,{$h:e,onPointerDown:p(e)},e))}),(0,K.jsxs)(Ws,{style:{left:l.x*s,top:(l.y+l.h)*c+10,width:l.w*s},children:[(0,K.jsx)(Gs,{type:`button`,onClick:a,children:`取消`}),(0,K.jsx)(Gs,{type:`button`,onClick:()=>u(As),children:`整張`}),(0,K.jsx)(Ks,{type:`button`,onClick:f,children:`完成`})]})]})]})}var Rs=(e,t,n)=>Math.max(t,Math.min(n,e)),zs=Vn`
  body * { pointer-events: none !important; }
  [data-cropper], [data-cropper] * { pointer-events: auto !important; }
  [data-cropper] img { pointer-events: none !important; }
`,Bs=B.div`
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
`,Vs=B.div`
  position: absolute;
  box-sizing: border-box;
  border: 2px solid ${e=>e.theme.surface.raised};
  box-shadow: 0 0 0 9999px rgba(26, 25, 23, 0.5);
  cursor: move;
  touch-action: none;
`,Hs={nw:`left: -7px; top: -7px; cursor: nwse-resize;`,ne:`right: -7px; top: -7px; cursor: nesw-resize;`,se:`right: -7px; bottom: -7px; cursor: nwse-resize;`,sw:`left: -7px; bottom: -7px; cursor: nesw-resize;`,n:`left: calc(50% - 12px); top: -5px; width: 24px; height: 8px; cursor: ns-resize;`,s:`left: calc(50% - 12px); bottom: -5px; width: 24px; height: 8px; cursor: ns-resize;`,e:`right: -5px; top: calc(50% - 12px); width: 8px; height: 24px; cursor: ew-resize;`,w:`left: -5px; top: calc(50% - 12px); width: 8px; height: 24px; cursor: ew-resize;`},Us=B.span`
  position: absolute;
  inline-size: 14px;
  block-size: 14px;
  border-radius: 999px;
  background: ${e=>e.theme.surface.raised};
  box-shadow: 0 0 0 1px ${e=>e.theme.border.default};
  touch-action: none;
  ${e=>e.$h===`move`?``:Hs[e.$h]}
`,Ws=B.div`
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 6px;
  min-inline-size: 200px;
  writing-mode: horizontal-tb;
`,Gs=B.button`
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
`,Ks=B.button`
  ${bs}
  min-block-size: 32px;
  padding: 0 16px;
`;function qs({block:e,boxStyle:t,onPatch:n,onSelect:r}){let[i,a]=(0,R.useState)(!1),[o,s]=(0,R.useState)(e.aiPrompt??``),c=$a(e.assetId),l=Ra(e.assetId),u=Ps()===e.id&&!!n,d=async()=>{if(!n||i)return;let t=await co(`image/*`);if(t){a(!0);try{let{assetId:r,aspectRatio:i}=await so(t);n({assetId:r,aspectRatio:i,alt:e.alt||t.name})}finally{a(!1)}}},f=()=>{if(!n)return;let e=o.trim();if(!e){Es(`請先輸入要生成的圖片描述`);return}n({aiPrompt:e}),Es(`原型還沒接上生成模型`)};return(0,K.jsxs)(Js,{onPointerDown:r,children:[c?(0,K.jsxs)(Ys,{style:t,$cropping:u,children:[(0,K.jsx)(Xs,{src:c,alt:e.alt,style:e.crop?{position:`absolute`,width:`${100/e.crop.w}%`,height:`${100/e.crop.h}%`,left:`${-e.crop.x/e.crop.w*100}%`,top:`${-e.crop.y/e.crop.h*100}%`,maxWidth:`none`,objectFit:`fill`,borderRadius:0}:void 0}),u&&n&&typeof t?.width==`number`&&typeof t?.height==`number`&&(0,K.jsx)(Ls,{src:c,crop:e.crop,boxW:t.width,boxH:t.height,onCancel:()=>Ns(null),onDone:e=>{n({crop:e}),Ns(null)}}),l&&(0,K.jsxs)(oc,{href:l.source,target:`_blank`,rel:`noreferrer`,onPointerDown:e=>e.stopPropagation(),title:`${l.author}｜${l.license}`,children:[l.author,` · `,l.license]})]}):(0,K.jsxs)(Zs,{style:t,children:[n?(0,K.jsxs)(Qs,{"data-full":!0,onPointerDown:e=>{r?.(),e.stopPropagation()},children:[(0,K.jsxs)($s,{children:[(0,K.jsx)(ec,{value:o,placeholder:`描述要生成的圖片`,"aria-label":`描述要生成的圖片`,onChange:e=>s(e.target.value),onBlur:()=>{let t=o.trim();t!==(e.aiPrompt??``)&&n({aiPrompt:t||void 0})},onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),f())}}),(0,K.jsx)(tc,{type:`button`,onClick:f,children:`生成`})]}),(0,K.jsx)(nc,{children:`或`}),(0,K.jsxs)(rc,{type:`button`,onClick:d,disabled:i,children:[i?`讀取中…`:`上傳圖片`,(0,K.jsx)(q,{name:i?`loader`:`upload`,size:16})]})]}):null,n?(0,K.jsx)(Ss,{label:i?`讀取中…`:`上傳圖片`,action:i?`loader`:`upload`,kind:`image`,onPointerDown:e=>{r?.(),e.stopPropagation()},onClick:d,disabled:i}):(0,K.jsx)(ic,{"data-alt":!0,children:e.alt||`還沒設定圖片來源`}),n&&e.alt&&!i&&(0,K.jsx)(ic,{"data-alt":!0,children:e.alt})]}),(e.hasCaption??e.caption.trim().length>0)&&(n||e.caption)&&(0,K.jsx)(ac,{contentEditable:!!n,suppressContentEditableWarning:!0,"data-placeholder":`圖說`,onBlur:e=>n?.({caption:e.currentTarget.textContent??``}),children:e.caption})]})}var Js=B.figure`
  margin: 0;
  display: table;
  inline-size: auto;
`,Ys=B.div`
  position: relative;
  overflow: ${e=>e.$cropping?`visible`:`hidden`};
  border-radius: ${e=>e.theme.radius.field};
`,Xs=B.img`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.media};
`,Zs=B.div`
  position: relative;
  display: grid;
  place-items: center;
  ${xs}
  border-radius: ${e=>e.theme.radius.field};
  border: ${e=>e.theme.border.widthDefault} dashed ${e=>e.theme.border.default};
  background: ${e=>e.theme.surface.page};
  overflow: hidden;
`,Qs=B.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
  inline-size: 100%;
  box-sizing: border-box;
  /* 直排時這一組控制項要正著看 */
  writing-mode: horizontal-tb;
`,$s=B.div`
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
`,ec=B.input`
  flex: 1;
  min-inline-size: 0;
  font: inherit;
  font-size: var(--ds-typography-body-size);
  border: none;
  background: transparent;
  color: ${e=>e.theme.text.primary};
  outline: none;
  &::placeholder { color: ${e=>e.theme.text.tertiary}; }
`,tc=B.button`
  ${bs}
  flex: none;
  min-block-size: 32px;
  padding: 0 14px;
`,nc=B.span`
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.tertiary};
`,rc=B.button`
  ${bs}
`,ic=B.span`
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
`,ac=B.figcaption`
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
`,oc=B.a`
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
`,sc=null;function cc(e,t){let n=(0,R.useRef)(t);n.current=t;let r=(0,R.useRef)({}).current;(0,R.useEffect)(()=>{if(e)return sc&&sc.id!==r&&sc.close(),sc={id:r,close:()=>n.current()},()=>{sc?.id===r&&(sc=null)}},[e,r])}var lc=B.aside`
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
`,uc=B.header`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetMd} ${e=>e.theme.space.insetSm} 0 20px;
  flex-shrink: 0;
`,dc=B.strong`
  flex: 1;
  white-space: nowrap;
  font-size: ${e=>e.theme.typography.bodySize};
  line-height: ${e=>e.theme.typography.bodyLineHeight};
  font-weight: 500;
  color: ${e=>e.theme.text.primary};
`,fc=B.button`
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
`,pc=B.div`
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
`,mc=B.div`
  display: flex;
  justify-content: space-between;
  padding: ${e=>e.theme.space.gapMd} 20px 0;
  flex-shrink: 0;
`,hc=B.button`
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
`,gc=z`
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
`,_c=z`
  ${gc}
  padding: 10px 12px;
  border-radius: ${e=>e.theme.radius.card};
  resize: vertical;
`;function vc({block:e,boxStyle:t,onPatch:n,onSelect:r}){let i=e.source===`youtube`?lo(e.ref):null,a=i?`https://i.ytimg.com/vi/${i}/hqdefault.jpg`:null,o=e.source===`upload`?$a(e.ref):void 0,s=!!a||!!o,c=Eu(),[l,u]=(0,R.useState)(!1),d=(0,R.useRef)(null);return(0,R.useEffect)(()=>{if(!l)return;let e=d.current?.closest(`[data-block-id]`)??d.current,t=t=>{e?.contains(t.target)||u(!1)};return window.addEventListener(`pointerdown`,t,!0),()=>window.removeEventListener(`pointerdown`,t,!0)},[l]),!n&&c&&i?(0,K.jsx)(yc,{children:(0,K.jsx)(Cc,{style:t,src:`https://www.youtube-nocookie.com/embed/${i}`,title:e.title||`YouTube 影片`,allow:`encrypted-media; picture-in-picture`,allowFullScreen:!0})}):!n&&o&&c?(0,K.jsx)(yc,{children:(0,K.jsx)(bo,{src:o,title:e.title,style:t})}):n&&l&&s?(0,K.jsx)(yc,{ref:d,onPointerDown:r,children:o?(0,K.jsx)(bo,{src:o,title:e.title,style:t,autoPlay:!0}):(0,K.jsx)(Cc,{style:t,src:`https://www.youtube-nocookie.com/embed/${i}?autoplay=1`,title:e.title||`YouTube 影片`,allow:`autoplay; encrypted-media; picture-in-picture`,allowFullScreen:!0})}):(0,K.jsx)(yc,{ref:d,onPointerDown:r,children:(0,K.jsxs)(xc,{style:t,$poster:a,$empty:!s&&!a,children:[s?(0,K.jsx)(Sc,{as:n?`button`:`span`,type:n?`button`:void 0,"aria-label":n?`在這裡播放`:void 0,title:n?`在這裡播放`:void 0,$live:!!n,onClick:n?()=>u(!0):void 0,children:(0,K.jsx)(q,{name:`play`,size:24})}):n&&(0,K.jsx)(bc,{block:e,onPatch:n,onSelect:r}),!s&&!n&&(0,K.jsx)(wc,{children:`還沒設定影片來源`})]})})}var yc=B.figure`
  margin: 0;
  display: table;
  inline-size: auto;
`;function bc({block:e,onPatch:t,onSelect:n}){let r=async()=>{let n=await co(`video/*`);n&&t({source:`upload`,ref:eo(n),title:e.title||n.name})},i=e=>{n?.(),e.stopPropagation()};return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(Tc,{"data-full":!0,onPointerDown:i,children:[(0,K.jsx)(Ec,{defaultValue:e.source===`youtube`?e.ref:``,placeholder:`貼上 YouTube 網址`,onBlur:e=>{let n=e.target.value.trim();n&&t({source:`youtube`,ref:n})},onKeyDown:e=>{e.key===`Enter`&&e.currentTarget.blur()}}),(0,K.jsx)(Dc,{children:`或`}),(0,K.jsxs)(Oc,{onClick:r,children:[`上傳影片`,(0,K.jsx)(q,{name:`upload`,size:16})]})]}),(0,K.jsx)(Ss,{label:`上傳影片`,action:`upload`,kind:`video`,onPointerDown:i,onClick:r})]})}var xc=B.div`
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
  ${e=>e.$empty&&xs}
`,Sc=B.span`
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
`,Cc=B.iframe`
  display: block;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.inverse};
`,wc=B.span`
  position: absolute;
  inset-block-end: 8px;
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.secondary};
`,Tc=B.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px;
  inline-size: 100%;
  /* 直排時這一組控制項要正著看 */
  writing-mode: horizontal-tb;
`,Ec=B.input`
  ${gc}
  font-size: var(--ds-typography-body-size);
  /* 跟圖片的「描述要生成的圖片」同一款灰膠囊：平常無框，打字時白底加灰框，不疊瀏覽器的焦點外圈 */
  inline-size: min(280px, 100%);
  min-block-size: 40px;
  padding: 0 16px;
  box-sizing: border-box;
  &:focus-visible { outline: none; }
`,Dc=B.span`
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.tertiary};
`,Oc=B.button`
  ${bs}
`;async function kc(e){try{let t=await fetch(`/api/site-title?url=${encodeURIComponent(e)}`);if(!t.ok)return null;let{title:n}=await t.json();return n?.trim()||null}catch{return null}}function Ac(e){return e.trim().replace(/^https?:\/\//i,``).replace(/\/$/,``)}var jc=null,Mc=new Set,Nc=()=>Mc.forEach(e=>e()),Pc=e=>(Mc.add(e),()=>Mc.delete(e));function Fc(){return(0,R.useSyncExternalStore)(Pc,()=>jc)}function Ic(e){jc!==e&&(jc=e,Nc())}function Lc({block:e,boxStyle:t,onPatch:n,onSelect:r}){let i=$u(),a=Fc(),o=!!(n&&a===e.id),s=(0,R.useRef)(null),[c,l]=(0,R.useState)(``),u=Rc(e.url),d=us(e.url),f=e.chosen!==!1;(0,R.useEffect)(()=>{o&&s.current&&(s.current.focus(),s.current.select())},[o]);let p=t=>{if(!n)return;let r=t.trim();if(r){let t=Ac(r),i=e.title&&e.url&&r===e.url;n({url:r,chosen:!0,...i?{}:{title:t}}),i||kc(r).then(e=>{e&&n({title:e})})}else e.url&&o&&n({url:``});Ic(null)};if(n&&!f){let i=t=>{r?.();let i=c.trim();n({presentation:t,chosen:!0,widthPct:t===`bookmark`?100/3:100,blockSize:void 0,...i?{url:i,...e.title?{}:{title:Rc(i)||`連結標題`}}:{}})};return(0,K.jsxs)(zc,{style:t,onPointerDown:r,children:[(0,K.jsx)(Ss,{label:`貼上網址`,action:`link`,kind:`globe`,primary:!1,title:`把框拉大就能貼網址`}),(0,K.jsx)(Bc,{"data-full":!0,onPointerDown:e=>{r?.(),e.stopPropagation()},children:(0,K.jsxs)(Vc,{children:[(0,K.jsx)(Wc,{value:c,placeholder:`貼上網址（https://…）`,"aria-label":`貼上網址`,onChange:e=>l(e.target.value)}),(0,K.jsxs)(Hc,{role:`group`,"aria-label":`選擇呈現的方式`,children:[(0,K.jsx)(Uc,{type:`button`,onClick:()=>i(`bookmark`),title:`以小卡片連到網頁`,children:`插入標籤`}),(0,K.jsx)(Uc,{type:`button`,onClick:()=>i(`embed`),title:`把網頁直接放在頁面裡，佔滿一頁`,children:`內嵌網頁`})]})]})})]})}if(e.presentation===`qr`)return(0,K.jsxs)(el,{style:t,onPointerDown:r,children:[(0,K.jsx)(tl,{children:(0,K.jsx)(q,{name:`zoom-in`,size:24})}),(0,K.jsxs)(`div`,{children:[(0,K.jsx)(`strong`,{children:e.title||`掃描開啟`}),(0,K.jsx)(Jc,{children:u})]})]});if(e.presentation===`embed`){let a=e.title||u||`網頁名稱`,c=!!(n&&(!e.url||o));return(0,K.jsxs)(Xc,{style:t,$empty:c||!d,onPointerDown:r,children:[c?(0,K.jsxs)(Qc,{onPointerDown:e=>{r?.(),e.stopPropagation()},children:[(0,K.jsx)(q,{name:`globe`,size:24}),(0,K.jsx)(Wc,{ref:s,defaultValue:e.url,placeholder:`貼上網址（https://…）`,"aria-label":`貼上網址`,onPaste:t=>{let n=t.clipboardData.getData(`text`).trim();n&&(!e.url||o)&&(t.preventDefault(),p(n))},onBlur:e=>p(e.currentTarget.value),onKeyDown:e=>{e.key===`Enter`?(e.preventDefault(),p(e.currentTarget.value)):e.key===`Escape`&&(e.preventDefault(),Ic(null))}})]}):d?(0,K.jsx)(Zc,{src:d,title:a,referrerPolicy:`no-referrer`,$interactive:!n}):(0,K.jsxs)(Qc,{children:[(0,K.jsx)(q,{name:`globe`,size:24}),(0,K.jsx)(`span`,{children:`尚未設定網址`})]}),n&&i&&(0,K.jsx)($c,{type:`button`,"aria-label":`刪除內嵌網頁`,title:`刪除`,onPointerDown:e=>e.stopPropagation(),onClick:t=>{t.stopPropagation(),i.dispatch({type:`deleteBlock`,blockId:e.id}),i.select(null)},children:(0,K.jsx)(q,{name:`x`,size:16,label:`刪除`})}),!c&&!!e.url&&(0,K.jsx)(Yc,{contentEditable:!!n,suppressContentEditableWarning:!0,"data-placeholder":u||`網頁名稱`,onPointerDown:e=>{n&&e.stopPropagation()},onBlur:e=>n?.({title:e.currentTarget.textContent??``}),onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),e.currentTarget.blur())},children:n?e.title:a})]})}if(n&&(!e.url||o))return(0,K.jsxs)(zc,{style:t,onPointerDown:r,children:[(0,K.jsx)(Ss,{label:`貼上網址`,action:`link`,kind:`globe`,primary:!1,title:`把框拉大就能貼網址`}),(0,K.jsx)(Bc,{"data-full":!0,onPointerDown:e=>{r?.(),e.stopPropagation()},children:(0,K.jsx)(Wc,{ref:s,defaultValue:e.url,placeholder:`貼上網址（https://…）`,"aria-label":`貼上網址`,onPaste:t=>{let n=t.clipboardData.getData(`text`).trim();n&&(!e.url||o)&&(t.preventDefault(),p(n))},onBlur:e=>p(e.currentTarget.value),onKeyDown:e=>{e.key===`Enter`?(e.preventDefault(),p(e.currentTarget.value)):e.key===`Escape`&&(e.preventDefault(),Ic(null))}})})]});let m=e.blockSize?Math.max(.6,Math.min(2.2,e.blockSize/68)):1,h=Math.round(50*m),g=Math.round(h*4/3),_=Math.round(15*m);return(0,K.jsxs)(Gc,{style:t,$clickable:!!d,onPointerDown:r,onClick:()=>{!n&&d&&window.open(d,`_blank`,`noopener,noreferrer`)},onDoubleClick:()=>{n&&d&&window.open(d,`_blank`,`noopener,noreferrer`)},title:n&&d?`點兩下開啟連結`:void 0,children:[(0,K.jsx)(qc,{style:{inlineSize:`${g}px`,blockSize:`${h}px`},children:(0,K.jsx)(q,{name:`globe`,size:24})}),(0,K.jsx)(Kc,{style:{fontSize:`${_}px`},children:e.title||Ac(e.url)||`連結標題`})]})}function Rc(e){try{return new URL(e).host}catch{return e}}var zc=B.div`
  position: relative;
  display: grid;
  place-items: center;
  ${xs}
  border-radius: ${e=>e.theme.radius.field};
  border: ${e=>e.theme.border.widthDefault} dashed ${e=>e.theme.border.default};
  background: ${e=>e.theme.surface.page};
  box-sizing: border-box;
  overflow: hidden;
`,Bc=B.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  inline-size: 100%;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`,Vc=B.div`
  display: grid;
  gap: ${e=>e.theme.space.gapSm};
  inline-size: min(360px, calc(100% - 48px));
`,Hc=B.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space.gapSm};
`,Uc=B.button`
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
`,Wc=B.input`
  ${gc}
  font-size: var(--ds-typography-body-size);
  /* 跟圖片的「描述要生成的圖片」同一款灰膠囊：平常無框，打字時白底加灰框，不疊瀏覽器的焦點外圈 */
  /* 膠囊幾乎撐滿框寬（左右只留框本身的內距），不要離兩側太遠 */
  inline-size: 100%;
  min-block-size: 40px;
  padding: 0 16px;
  box-sizing: border-box;
  &:focus-visible { outline: none; }
`,Gc=B.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  border-radius: ${e=>e.theme.radius.tile};
  background: ${e=>e.theme.surface.raised};
  padding: 8px 16px 8px 8px;
  color: ${e=>e.theme.text.secondary};
  box-sizing: border-box;
  writing-mode: horizontal-tb;
  cursor: ${e=>e.$clickable?`pointer`:`default`};
`,Kc=B.div`
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
`,qc=B.div`
  flex: none;
  display: grid;
  place-items: center;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.icon.secondary};
`,Jc=B.div`
  color: ${e=>e.theme.text.tertiary};
  font-family: ${e=>e.theme.typography.fontDisplay};
  font-size: var(--ds-typography-label-size);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Yc=B.div`
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
`,Xc=B.div`
  position: relative;
  border: ${e=>e.theme.border.widthDefault} ${e=>e.$empty?`dashed`:`solid`}
    ${e=>e.$empty?e.theme.border.default:e.theme.border.subtle};
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.$empty?e.theme.surface.page:e.theme.surface.sunken};
  box-sizing: border-box;
  writing-mode: horizontal-tb;

  &:hover > ${Yc},
  &:focus-within > ${Yc} {
    opacity: 1;
    visibility: visible;
  }
`,Zc=B.iframe`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.raised};
  pointer-events: ${e=>e.$interactive?`auto`:`none`};
`,Qc=B.div`
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
`,$c=B.button`
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
`,el=B.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${e=>e.theme.text.secondary};
  box-sizing: border-box;
`,tl=B.div`
  display: grid;
  place-items: center;
  inline-size: 72px;
  block-size: 72px;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.sunken};
  flex: none;
`;function nl({block:e,boxStyle:t,onPatch:n,onSelect:r}){let[i,a]=(0,R.useState)(!1),o=$a(e.assetId),s=e.page??1,[c,l]=(0,R.useState)(s),u=Eu();(0,R.useEffect)(()=>l(s),[s]);let d=e=>{let t=Math.max(1,Math.floor(e)||1);l(t),n&&t!==s&&n({page:t})},f=async()=>{if(!n||i)return;let t=await co(`application/pdf`);if(t){a(!0);try{n({assetId:eo(t),title:e.title||t.name})}finally{a(!1)}}},p;return p=o?(0,K.jsxs)(ll,{style:t,children:[(0,K.jsx)(ml,{src:`${o}#page=${c}&toolbar=0&navpanes=0&view=FitH`,title:e.title||`PDF`},c),!n&&u&&(0,K.jsxs)(ul,{onPointerDown:e=>e.stopPropagation(),children:[(0,K.jsx)(dl,{type:`button`,onClick:()=>d(c-1),disabled:c<=1,"aria-label":`上一頁`,children:(0,K.jsx)(q,{name:`chevron-left`,size:16})}),(0,K.jsxs)(sl,{children:[`第`,(0,K.jsx)(cl,{type:`number`,min:1,defaultValue:c,"aria-label":n?`起始頁`:`頁碼`,onBlur:e=>d(Number(e.target.value)),onKeyDown:e=>{e.key===`Enter`&&e.currentTarget.blur()}},c),`頁`]}),(0,K.jsx)(dl,{type:`button`,onClick:()=>d(c+1),"aria-label":`下一頁`,children:(0,K.jsx)(q,{name:`chevron-right`,size:16})}),n&&(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(fl,{}),(0,K.jsxs)(pl,{type:`button`,onClick:f,title:`更換 PDF 檔案`,children:[`更換`,(0,K.jsx)(q,{name:`upload`,size:16})]})]})]})]}):(0,K.jsx)(il,{style:t,children:n?(0,K.jsxs)(ol,{type:`button`,onClick:f,disabled:i,children:[i?`讀取中…`:`上傳 PDF`,(0,K.jsx)(q,{name:i?`loader`:`upload`,size:16})]}):(0,K.jsx)(al,{children:`還沒上傳 PDF`})}),(0,K.jsx)(rl,{onPointerDown:r,children:p})}var rl=B.figure`
  margin: 0;
  display: table;
  inline-size: auto;
`,il=B.div`
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
`,al=B.span`
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,ol=B.button`
  ${bs}
`,sl=B.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,cl=B.input`
  ${gc}
  inline-size: 44px;
  min-block-size: 30px;
  padding: 0 4px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
`,ll=B.div`
  position: relative;
  overflow: hidden;
  border-radius: ${e=>e.theme.radius.field};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.media};
  box-sizing: border-box;
`,ul=B.div`
  position: absolute;
  inset-block-end: 12px;
  inset-inline-start: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  box-shadow: ${e=>e.theme.shadow.card};
  z-index: 2;
  white-space: nowrap;
  writing-mode: horizontal-tb;
`,dl=B.button`
  display: grid;
  place-items: center;
  inline-size: 30px;
  block-size: 30px;
  padding: 0;
  border: none;
  border-radius: ${e=>e.theme.radius.control};
  background: transparent;
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
  &:hover:not(:disabled) { background: ${e=>e.theme.surface.sunken}; }
  &:disabled { color: ${e=>e.theme.icon.disabled}; cursor: default; }
`,fl=B.span`
  inline-size: 1px;
  block-size: 18px;
  margin-inline: 2px;
  background: ${e=>e.theme.border.subtle};
`,pl=B.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-block-size: 30px;
  padding: 0 10px;
  border: none;
  background: transparent;
  color: ${e=>e.theme.text.secondary};
  border-radius: ${e=>e.theme.radius.control};
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  cursor: pointer;
  &:hover { background: ${e=>e.theme.surface.sunken}; color: ${e=>e.theme.text.primary}; }
`,ml=B.iframe`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  border: none;
`;function hl({block:e,boxStyle:t,onPatch:n,onSelect:r}){let i=!!$a(e.assetId),a=!!n&&!e.assetId,o=async t=>{t.stopPropagation();let r=await co(`audio/*`);!r||!n||n({assetId:eo(r),title:e.title||r.name})};return(0,K.jsxs)(gl,{style:t,onPointerDown:r,$empty:a,children:[a&&(0,K.jsx)(Ss,{label:`上傳音檔`,action:`upload`,kind:`music`,onClick:o}),(0,K.jsx)(_l,{"data-full":!0,$ready:i,children:(0,K.jsx)(q,{name:`play`,size:16})}),(0,K.jsx)(vl,{"data-full":!0,children:e.title&&(0,K.jsx)(yl,{children:e.title})}),n&&!e.assetId&&(0,K.jsxs)(bl,{"data-full":!0,onClick:o,children:[`上傳音檔`,(0,K.jsx)(q,{name:`upload`,size:16})]})]})}var gl=B.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  border: ${e=>e.theme.border.widthDefault} ${e=>e.$empty?`dashed`:`solid`}
    ${e=>e.$empty?e.theme.border.default:e.theme.border.subtle};
  border-radius: 999px;
  background: ${e=>e.$empty?e.theme.surface.page:e.theme.surface.sunken};
  ${e=>e.$empty&&xs}
  /* 只剩一顆（小框）時置中 */
  ${e=>e.$empty&&`@container (max-width: 200px) or (max-height: 150px) { justify-content: center; padding: 0; }`}
  writing-mode: horizontal-tb;
`,_l=B.span`
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  flex: none;
  border-radius: 999px;
  background: ${e=>e.theme.surface.raised};
  box-shadow: ${e=>e.$ready?e.theme.shadow.card:`none`};
  color: ${e=>e.$ready?e.theme.icon.default:e.theme.icon.disabled};
`,vl=B.div`
  flex: 1;
  min-inline-size: 0;
`,yl=B.div`
  font-size: var(--ds-typography-body-sm-size);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,bl=B.button`
  ${bs}
  flex: none;
`;function xl({block:e,boxStyle:t,onSelect:n}){let r=Object.entries(e.params??{});return(0,K.jsxs)(Sl,{style:t,onPointerDown:n,children:[(0,K.jsxs)(Cl,{children:[(0,K.jsx)(q,{name:`puzzle`,size:20}),(0,K.jsx)(`strong`,{children:e.title||`互動模組`}),e.moduleKind&&(0,K.jsx)(wl,{children:e.moduleKind})]}),r.length>0&&(0,K.jsx)(Tl,{children:r.map(([e,t])=>(0,K.jsxs)(El,{children:[e,(0,K.jsx)(`b`,{children:t})]},e))})]})}var Sl=B.div`
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
`,Cl=B.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${e=>e.theme.text.secondary};
  font-size: var(--ds-typography-body-sm-size);
`,wl=B.span`
  font-family: ${e=>e.theme.typography.fontDisplay};
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.text.tertiary};
`,Tl=B.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,El=B.span`
  display: inline-flex;
  gap: 6px;
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.text.tertiary};
  background: ${e=>e.theme.surface.raised};
  border-radius: ${e=>e.theme.radius.control};
  padding: 3px 10px;

  b { color: ${e=>e.theme.text.secondary}; }
`,Dl={rect:4,roundedRect:20,callout:8},Ol={x:1.12,y:.75};function kl(e,t,n){let r=Math.max(0,Math.min(n,e/2,t/2));return[`M ${r},0`,`H ${e-r}`,`A ${r},${r} 0 0 1 ${e},${r}`,`V ${t-r}`,`A ${r},${r} 0 0 1 ${e-r},${t}`,`H ${r}`,`A ${r},${r} 0 0 1 0,${t-r}`,`V ${r}`,`A ${r},${r} 0 0 1 ${r},0`,`Z`].join(` `)}function Al(e,t,n,r){let i=Math.max(0,Math.min(n,e/2,t/2)),a=r.x*e,o=r.y*t,s=e/2,c=t/2,l=a-s,u=o-c,d=l/(e/2||1),f=u/(t/2||1),p=Math.abs(d)>=Math.abs(f)?d<0?`left`:`right`:f<0?`top`:`bottom`,m=`${a},${o}`;if(p===`left`||p===`right`){let n=t-2*i,r=Math.min(28,Math.max(8,n*.35)),a=l===0?c:c+u*(((p===`left`?0:e)-s)/l),o=Math.min(t-i-r/2,Math.max(i+r/2,a)),d=o-r/2,f=o+r/2;return[`M ${i},0`,`H ${e-i}`,`A ${i},${i} 0 0 1 ${e},${i}`,p===`right`?`V ${d} L ${m} L ${e},${f}`:``,`V ${t-i}`,`A ${i},${i} 0 0 1 ${e-i},${t}`,`H ${i}`,`A ${i},${i} 0 0 1 0,${t-i}`,p===`left`?`V ${f} L ${m} L 0,${d}`:``,`V ${i}`,`A ${i},${i} 0 0 1 ${i},0`,`Z`].filter(Boolean).join(` `)}let h=e-2*i,g=Math.min(28,Math.max(8,h*.35)),_=u===0?s:s+l*(((p===`top`?0:t)-c)/u),v=Math.min(e-i-g/2,Math.max(i+g/2,_)),y=v-g/2,b=v+g/2;return[`M ${i},0`,p===`top`?`H ${y} L ${m} L ${b},0`:``,`H ${e-i}`,`A ${i},${i} 0 0 1 ${e},${i}`,`V ${t-i}`,`A ${i},${i} 0 0 1 ${e-i},${t}`,p===`bottom`?`H ${b} L ${m} L ${y},${t}`:``,`H ${i}`,`A ${i},${i} 0 0 1 0,${t-i}`,`V ${i}`,`A ${i},${i} 0 0 1 ${i},0`,`Z`].filter(Boolean).join(` `)}function jl(e,t){let n=e/2,r=t/2,i=[];for(let e=0;e<10;e++){let t=e%2==0,a=-Math.PI/2+e*Math.PI/5,o=t?1:.4;i.push(`${n+Math.cos(a)*n*o},${r+Math.sin(a)*r*o}`)}return`M ${i.join(` L `)} Z`}function Ml(e,t,n,r=Ol){switch(e){case`circle`:{let e=t/2,r=n/2;return`M ${e},0 A ${e},${r} 0 1 1 ${e},${n} A ${e},${r} 0 1 1 ${e},0 Z`}case`callout`:return Al(t,n,Dl.callout??8,r);case`triangle`:return`M ${t/2},0 L ${t},${n} L 0,${n} Z`;case`star`:return jl(t,n);default:return kl(t,n,Dl[e]??4)}}var Nl=e=>e.spans??(e.label?[{text:e.label}]:[]);function Pl(e){if(!e)return!1;let t=/^#([0-9a-f]{6})$/i.exec(e.trim());if(!t)return!1;let n=parseInt(t[1],16),r=n>>16&255,i=n>>8&255,a=n&255;return(.2126*r+.7152*i+.0722*a)/255<.5}function Fl({block:e,boxStyle:t,onPatch:n,onSelect:r}){let i=kn(),a=$u(),o=!!a&&a.selectedBlockId===e.id,s=(0,R.useRef)(null),[c,l]=(0,R.useState)(!1),[u,d]=(0,R.useState)(null),f=typeof t?.width==`number`?t.width:0,p=typeof t?.height==`number`?t.height:0,m=e.strokeWidth??1,h=u??e.tail??Ol,g={w:Math.max(0,f-m),h:Math.max(0,p-m)},_=Ml(e.shape,g.w,g.h,h),v=Nl(e),y=Pl(e.fill)?i.text.onInverse:i.text.primary;(0,R.useEffect)(()=>{o||l(!1)},[o]),(0,R.useEffect)(()=>{if(!c)return;let e=s.current?.querySelector(`[contenteditable]`);e&&(e.focus(),gs(e,or(v)))},[c]);let b=e=>{e.preventDefault(),e.stopPropagation();let t=s.current;if(!t||!n)return;let r=t.getBoundingClientRect(),i=t.closest(`[data-layout]`)?.getBoundingClientRect(),a=r.width/(t.offsetWidth||1),o=h,c=e=>{let t=i?Math.max(i.left+8,Math.min(i.right-8,e.clientX)):e.clientX,n=i?Math.max(i.top+8,Math.min(i.bottom-8,e.clientY)):e.clientY,s=(t-r.left)/a/(f||1),c=(n-r.top)/a/(p||1);o={x:Math.max(-1.5,Math.min(2.5,s)),y:Math.max(-1.5,Math.min(2.5,c))},d(o)},l=()=>{window.removeEventListener(`pointermove`,c),window.removeEventListener(`pointerup`,l),window.removeEventListener(`pointercancel`,l),d(null),n({tail:o})};window.addEventListener(`pointermove`,c),window.addEventListener(`pointerup`,l),window.addEventListener(`pointercancel`,l)};return(0,K.jsxs)(Y,{ref:s,style:{...t,opacity:e.opacity??1},onPointerDown:r,onDoubleClick:()=>{n&&l(!0)},children:[(0,K.jsx)(Il,{width:f,height:p,"aria-hidden":`true`,children:(0,K.jsx)(`g`,{transform:`translate(${m/2} ${m/2})`,children:(0,K.jsx)(`path`,{d:_,style:{fill:e.fill??i.surface.raised,stroke:e.stroke??i.text.primary,strokeWidth:m,strokeLinejoin:`round`}})})}),(0,K.jsx)(X,{$editing:c,$vertical:!!e.textVertical,style:{color:y},children:n?(0,K.jsx)(Z,{className:`ds-rich`,spans:v,placeholder:c?`輸入文字…`:``,onChange:e=>n({spans:e}),onFocus:()=>{r?.(),l(!0)}}):v.length>0&&(0,K.jsx)(Ll,{className:`ds-rich`,dangerouslySetInnerHTML:{__html:ia(v)}})}),o&&n&&e.shape===`callout`&&(0,K.jsx)(Rl,{"data-ui":!0,style:{left:h.x*f,top:h.y*p},onPointerDown:b,"aria-label":`拖曳改變尖角方向`,title:`拖曳改變尖角方向`})]})}var Y=B.div`
  position: relative;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`,Il=B.svg`
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  display: block;
`,X=B.div`
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
`,Z=B(ys)`
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
`,Ll=B.div`
  max-inline-size: 100%;
  max-block-size: 100%;
  overflow: hidden;
`,Rl=B.div`
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
`,zl={none:`無`,arrow:`線箭頭`,arrowFilled:`實心箭頭`,dot:`圓點`},Bl=e=>({x:Math.max(0,Math.min(1,e.x)),y:Math.max(0,Math.min(1,e.y))});function Vl({id:e,cap:t,color:n}){if(t===`none`)return null;let r={id:e,markerWidth:10,markerHeight:10,refY:5,markerUnits:`strokeWidth`,orient:`auto-start-reverse`};switch(t){case`arrow`:return(0,K.jsx)(`marker`,{...r,refX:8,children:(0,K.jsx)(`path`,{d:`M1,1 L8,5 L1,9`,style:{fill:`none`,stroke:n,strokeWidth:1.5,strokeLinecap:`round`,strokeLinejoin:`round`}})});case`arrowFilled`:return(0,K.jsx)(`marker`,{...r,refX:9,children:(0,K.jsx)(`path`,{d:`M0,0.5 L9,5 L0,9.5 Z`,style:{fill:n,stroke:`none`}})});case`dot`:return(0,K.jsx)(`marker`,{...r,refX:5,children:(0,K.jsx)(`circle`,{cx:5,cy:5,r:3.5,style:{fill:n,stroke:`none`}})})}}function Hl({block:e,boxStyle:t,onPatch:n,onSelect:r}){let i=kn(),a=$u(),o=!!a&&a.selectedBlockId===e.id,s=(0,R.useRef)(null),[c,l]=(0,R.useState)(null),u=typeof t?.width==`number`?t.width:0,d=typeof t?.height==`number`?t.height:0,f=e.strokeWidth??2,p=e.stroke??i.text.primary,m=c?.end===`from`?c.p:e.from,h=c?.end===`to`?c.p:e.to,g=e.startCap??`none`,_=e.endCap??`none`,v=`${e.id}-cap-start`,y=`${e.id}-cap-end`,b=t=>r=>{r.preventDefault(),r.stopPropagation();let i=s.current;if(!i||!n)return;let a=i.getBoundingClientRect(),o=a.width/(i.offsetWidth||1),c=t===`from`?e.from:e.to,f=e=>{c=Bl({x:(e.clientX-a.left)/o/(u||1),y:(e.clientY-a.top)/o/(d||1)}),l({end:t,p:c})},p=()=>{window.removeEventListener(`pointermove`,f),window.removeEventListener(`pointerup`,p),window.removeEventListener(`pointercancel`,p),l(null),n({[t]:c})};window.addEventListener(`pointermove`,f),window.addEventListener(`pointerup`,p),window.addEventListener(`pointercancel`,p)};return(0,K.jsxs)(Ul,{ref:s,style:{...t,opacity:e.opacity??1},onPointerDown:r,children:[(0,K.jsxs)(Wl,{width:u,height:d,"aria-hidden":`true`,children:[(0,K.jsxs)(`defs`,{children:[(0,K.jsx)(Vl,{id:v,cap:g,color:p}),(0,K.jsx)(Vl,{id:y,cap:_,color:p})]}),(0,K.jsx)(`line`,{x1:m.x*u,y1:m.y*d,x2:h.x*u,y2:h.y*d,markerStart:g===`none`?void 0:`url(#${v})`,markerEnd:_===`none`?void 0:`url(#${y})`,style:{stroke:p,strokeWidth:f,strokeLinecap:`round`,strokeDasharray:e.dashed?`${f*3} ${f*2}`:void 0}})]}),o&&n&&(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(Gl,{"data-ui":!0,style:{left:m.x*u,top:m.y*d},onPointerDown:b(`from`),"aria-label":`拖曳線段起點`,title:`拖曳線段起點`}),(0,K.jsx)(Gl,{"data-ui":!0,style:{left:h.x*u,top:h.y*d},onPointerDown:b(`to`),"aria-label":`拖曳線段終點`,title:`拖曳線段終點`})]})]})}var Ul=B.div`
  position: relative;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`,Wl=B.svg`
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  display: block;
`,Gl=B.div`
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
`,Kl=(0,R.createContext)(new Map);function ql({rows:e,children:t}){let n=(0,R.useMemo)(()=>Vr(e),[e]),r=(0,R.useMemo)(()=>ti(e),[e]);return(0,K.jsx)(Kl.Provider,{value:n,children:(0,K.jsx)(Yl.Provider,{value:r,children:t})})}var Jl=()=>(0,R.useContext)(Kl),Yl=(0,R.createContext)(new Map);function Xl(){let e=(0,R.useContext)(Yl);return(0,R.useCallback)(t=>{let n=e.get(t);return n?ni(n):void 0},[e])}var Zl=(0,R.createContext)(null),Ql=()=>(0,R.useContext)(Zl);function $l({block:e,settings:t,sizing:n,onEditSpans:r,onPatch:i,onSelectRange:a,onSelect:o,paraLabel:s,paraOn:c}){let l=Li[t.textScale],u=Eu(),d=Xl(),f=e.type===`text`?ia(e.spans):``,p=(0,R.useMemo)(()=>({__html:f}),[f]),m=Ni(e,n),h=m?n.vertical?{width:m.blockSize,height:m.inlineSize}:{width:m.inlineSize,height:m.blockSize}:void 0;switch(e.type){case`text`:{let t=Xi(e,n),i={...Ri(e.role,l,e.fontSize,e.lineHeight,t.vertical),textAlign:e.align,...t.style},f={...t.flipped?t.vertical?{"data-vertical":`true`}:{"data-horizontal":`true`}:{},...s?{"data-pno":s}:{},...s&&c?{"data-pno-on":`true`}:{}};return r?(0,K.jsx)(tu,{className:`ds-rich`,style:i,...f,spans:e.spans,onFocus:o,onChange:r,onSelect:a,placeholder:e.role===`lessonTitle`?`輸入標題…`:`輸入內容…`}):(0,K.jsx)(eu,{className:`ds-rich`,style:i,...f,dangerouslySetInnerHTML:p,onClick:u?t=>{let n=t.target.closest(`[data-note]`),r=n&&e.rangeNotes?.find(e=>e.id===n.dataset.note);if(n&&r&&Jr(r)===`sentence`)return;if(n&&r&&Qr(e,r)){t.stopPropagation();let i=e.spans.filter(e=>e.noteId===r.id).map(e=>e.text).join(``),a=[d(r.id),i].filter(Boolean).join(` `),o=Zr(e,r.id),s=r.body.trim();o.length===0?u.open({...e,popups:[{id:`note-${r.id}`,kind:`text`,title:a,body:s}]},n):u.open({...e,popups:o},n,s?{title:a,body:s}:void 0);return}let i=t.target.closest(`[data-pop]`),a=i?.dataset.pop?Lr(e,i.dataset.pop).filter(e=>!kr(e)):[];!i||a.length===0||(t.stopPropagation(),u.open({...e,popups:a},i))}:void 0})}case`image`:return(0,K.jsx)(qs,{block:e,boxStyle:h,onPatch:i,onSelect:o});case`video`:return(0,K.jsx)(vc,{block:e,boxStyle:h,onPatch:i,onSelect:o});case`web`:return(0,K.jsx)(Lc,{block:e,boxStyle:h,onPatch:i,onSelect:o});case`pdf`:return(0,K.jsx)(nl,{block:e,boxStyle:h,onPatch:i,onSelect:o});case`dialogue`:return(0,K.jsxs)(nu,{onPointerDown:o,children:[(0,K.jsx)(ru,{children:e.speaker}),e.text]});case`question`:return(0,K.jsxs)(iu,{onPointerDown:o,children:[e.questionType&&(0,K.jsx)(au,{children:e.questionType}),(0,K.jsxs)(`strong`,{children:[e.number,`. `,e.stem.map(e=>e.text).join(``)]}),(0,K.jsx)(ou,{children:e.options.map(e=>(0,K.jsxs)(`li`,{children:[`(`,e.key,`) `,e.text.map(e=>e.text).join(``)]},e.key))})]});case`table`:return(0,K.jsx)(bf,{block:e,boxStyle:h,sizing:n,scale:l,onSelect:o});case`audio`:return(0,K.jsx)(hl,{block:e,boxStyle:h,onPatch:i,onSelect:o});case`module`:return(0,K.jsx)(xl,{block:e,boxStyle:h,onSelect:o});case`shape`:return(0,K.jsx)(Fl,{block:e,boxStyle:h,onPatch:i,onSelect:o});case`line`:return(0,K.jsx)(Hl,{block:e,boxStyle:h,onPatch:i,onSelect:o});case`reference`:return(0,K.jsxs)(su,{onPointerDown:o,children:[`配合`,e.target,`第 `,e.pages,` 頁`]});default:return e}}var eu=B.p`
  margin: 0;
  color: ${e=>e.theme.text.primary};
`,tu=B(ys)`
  margin: 0;
  color: ${e=>e.theme.text.primary};
  outline: none;

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:empty::before {
    content: attr(data-placeholder);
    color: ${e=>e.theme.text.tertiary};
    pointer-events: none;
  }
`,nu=B.div`
  background: ${e=>e.theme.surface.sunken};
  border-radius: ${e=>e.theme.radius.card};
  padding: 12px 16px;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
`,ru=B.span`
  display: block;
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.text.tertiary};
  margin-block-end: 4px;
`,iu=B.div`
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  border-radius: ${e=>e.theme.radius.card};
  padding: 16px;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  display: flex;
  flex-direction: column;
  gap: 8px;
`,au=B.span`
  align-self: flex-start;
  background: ${e=>e.theme.brand.primaryTint};
  color: ${e=>e.theme.text.primary};
  border-radius: ${e=>e.theme.radius.control};
  padding: 2px 10px;
  font-size: var(--ds-typography-label-size);
`,ou=B.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${e=>e.theme.text.secondary};
`,su=B.div`
  align-self: flex-start;
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.text.tertiary};
`,cu={writingMode:`horizontal`,aspectRatio:`4:3`,textScale:`md`},lu={width:1280,height:720},uu=48,du={inlineSize:lu.width-uu*2,maxBlockSize:lu.height-uu*2,vertical:!1};function fu(e){let[t,n]=(0,R.useState)(0);return(0,R.useLayoutEffect)(()=>{let t=e.current;if(!t)return;let r=()=>n(Math.min(t.clientWidth/lu.width,t.clientHeight/lu.height));r();let i=typeof ResizeObserver>`u`?null:new ResizeObserver(r);return i?.observe(t),()=>i?.disconnect()},[e]),t}function pu({item:e}){let t=(0,R.useRef)(null),n=fu(t),r=jr(e),[i,a]=(0,R.useState)(0),o=r[Math.min(i,r.length-1)]??[];return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(vu,{ref:t,children:n>0&&(0,K.jsxs)(xu,{style:{transform:`scale(${n})`},children:[o.map(e=>(0,K.jsx)(Su,{$fit:e.type!==`text`,$float:e.float,children:(0,K.jsx)($l,{block:e,settings:cu,sizing:du})},e.id)),o.length===0&&(0,K.jsx)(Cu,{children:`這個大彈窗還沒有內容`})]})}),r.length>1&&(0,K.jsxs)(mu,{children:[(0,K.jsx)(hu,{type:`button`,onClick:()=>a(e=>Math.max(0,e-1)),disabled:i===0,"aria-label":`上一頁`,children:(0,K.jsx)(q,{name:`chevron-left`,size:20})}),(0,K.jsx)(gu,{"aria-label":`第 ${i+1} 頁，共 ${r.length} 頁`,children:r.map((e,t)=>(0,K.jsx)(_u,{type:`button`,$on:t===i,"aria-label":`第 ${t+1} 頁`,onClick:()=>a(t)},t))}),(0,K.jsx)(hu,{type:`button`,onClick:()=>a(e=>Math.min(r.length-1,e+1)),disabled:i===r.length-1,"aria-label":`下一頁`,children:(0,K.jsx)(q,{name:`chevron-right`,size:20})})]})]})}var mu=B.div`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.space.gapMd};
  padding: 0 0 ${e=>e.theme.space.insetMd};
  writing-mode: horizontal-tb;
`,hu=B.button`
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
`,gu=B.div`
  display: flex;
  gap: 6px;
`,_u=B.button`
  inline-size: ${e=>e.$on?`20px`:`8px`};
  block-size: 8px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${e=>e.$on?e.theme.text.primary:e.theme.border.default};
  cursor: pointer;
  transition: inline-size 0.15s;
`,vu=B.div`
  position: relative;
  flex: none;
  /* 一頁 16:9；視窗太矮就讓它矮一點，頁再等比縮小置中 */
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  max-block-size: calc(100vh - 200px);
  overflow: hidden;
  /* 不管教材是直排還是橫排，大彈窗都橫著讀 */
  writing-mode: horizontal-tb;
`,yu=`
  box-sizing: border-box;
  inline-size: ${lu.width}px;
  block-size: ${lu.height}px;
  padding: 48px;
  /* 一般區塊排版（不用 flex）：元件可以靠左／靠右，後面的內容排在旁邊 */
  display: flow-root;
  overflow: hidden;
  writing-mode: horizontal-tb;
`,bu=e=>`
  margin-block-end: 16px;
  ${e===`left`?`float: left; margin-inline-end: 16px;`:e===`right`?`float: right; margin-inline-start: 16px;`:``}
`,xu=B.div`
  ${yu}
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -${lu.width/2}px;
  margin-top: -${lu.height/2}px;
  transform-origin: center;
  background: ${e=>e.theme.surface.raised};
`,Su=B.div`
  min-inline-size: 0;
  ${e=>bu(e.$float)}
  ${e=>e.$fit&&`inline-size: fit-content; max-inline-size: 100%;`}
`,Cu=B.p`
  margin: 0;
  text-align: center;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.tertiary};
`,wu=`rgba(26, 25, 23, 0.45)`,Tu=(0,R.createContext)(null),Eu=()=>(0,R.useContext)(Tu);function Du({children:e}){return(0,K.jsx)(Tu.Provider,{value:null,children:e})}function Ou({children:e,onJump:t}){let[n,r]=(0,R.useState)(null),[i,a]=(0,R.useState)(null),[o,s]=(0,R.useState)(null),[c,l]=(0,R.useState)(null),[u,d]=(0,R.useState)(null),[f,p]=(0,R.useState)(null),m=(0,R.useCallback)((e,t,n)=>{let i=e.popups.length===1&&!n?e.popups[0]:null;s(i?.kind===`image`?i:null),l(null),p(null),d(i?.kind===`web`||i?.kind===`video`?i:null),r({block:e,anchor:t??null,lead:n??null})},[]),h=(0,R.useCallback)(()=>{s(null),l(null),d(null),p(null),r(null)},[]),g=(0,R.useCallback)(e=>a(()=>e),[]),_=(0,R.useMemo)(()=>({open:m,registerEdit:g}),[m,g]),v=n?.block??null,y=n&&n.anchor&&!n.lead&&n.block.popups.length===1?n.block.popups[0]:f,b=!f&&!!(n&&n.anchor&&(n.block.popups.length>1||n.lead&&n.block.popups.length>0)),x=n&&!n.lead&&n.block.popups.length===1?n.block.popups[0]:null,S=x?.kind===`rich`?x:null,C=c??S,w=!!(n?.anchor&&Io(n.anchor)&&u?.kind===`text`&&!o&&!C);return(0,R.useEffect)(()=>{if(!v)return;let e=e=>{e.key===`Escape`&&(e.stopPropagation(),h())};return window.addEventListener(`keydown`,e,!0),()=>window.removeEventListener(`keydown`,e,!0)},[v,o,c,u,f,h]),(0,K.jsxs)(Tu.Provider,{value:_,children:[e,n&&b&&n.anchor&&!o&&!c&&!u&&(0,K.jsx)(Lo,{block:n.block,item:n.block.popups[0],items:n.block.popups,lead:n.lead??void 0,anchor:n.anchor,onClose:h,onPick:e=>{e.kind===`jump`?(h(),e.targetRowId&&t?.(e.targetRowId)):e.kind===`text`?p(e):e.kind===`image`?s(e):e.kind===`rich`?l(e):d(e)}}),n&&y&&!S&&n.anchor&&!o&&!u&&(0,K.jsx)(Lo,{block:n.block,item:y,anchor:n.anchor,onClose:h,onJump:t,onEdit:i??void 0}),v&&(o||C||u||!y&&!b)&&(0,G.createPortal)((0,K.jsx)(Au,{onClick:h,children:(0,K.jsx)(ju,{role:`dialog`,"aria-modal":`true`,"aria-label":C?`補充內容：${Nr(C)}`:`補充內容`,$zoom:!1,$vertical:w,$rich:!!C&&!o||!!o||!!u&&(u.kind===`web`||u.kind===`video`),onClick:e=>e.stopPropagation(),children:C&&!o?(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(Mu,{children:[C.title.trim()&&(0,K.jsx)(`strong`,{children:C.title}),(0,K.jsx)(Nu,{}),i&&(0,K.jsxs)(Fu,{onClick:()=>{h(),i(v.id)},children:[`編輯`,(0,K.jsx)(q,{name:`pencil`,size:16})]}),(0,K.jsx)(Fu,{onClick:h,"aria-label":`關閉`,children:(0,K.jsx)(q,{name:`x`,size:20,label:`關閉`})})]}),(0,K.jsx)(pu,{item:C})]}):o?(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(Mu,{$float:!o.title.trim(),children:[o.title.trim()&&(0,K.jsx)(`strong`,{children:o.title}),(0,K.jsx)(Nu,{}),(0,K.jsx)(Fu,{onClick:h,"aria-label":`關閉`,children:(0,K.jsx)(q,{name:`x`,size:20,label:`關閉`})})]}),(0,K.jsx)(Uu,{$full:!o.title.trim(),children:(0,K.jsx)(Vu,{src:$a(o.assetId),alt:o.title})})]}):u?(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(Mu,{children:[u.title.trim()&&(0,K.jsx)(`strong`,{children:u.title}),(0,K.jsx)(Nu,{}),u.kind===`web`&&us(u.url)&&(0,K.jsxs)(Ju,{$primary:!u.embeddable,onClick:()=>window.open(us(u.url),`_blank`,`noopener,noreferrer`),children:[`以新視窗開啟`,(0,K.jsx)(q,{name:`external-link`,size:16})]}),(0,K.jsx)(Fu,{onClick:h,"aria-label":`關閉`,children:(0,K.jsx)(q,{name:`x`,size:20,label:`關閉`})})]}),(0,K.jsxs)(Wu,{$big:u.kind!==`text`,children:[u.kind===`text`&&(0,K.jsx)(Yu,{children:u.body}),u.kind===`video`&&(0,K.jsx)(ho,{item:u}),u.kind===`audio`&&(0,K.jsx)(`audio`,{controls:!0,autoPlay:!0,src:$a(u.assetId),style:{width:`100%`}}),u.kind===`web`&&(u.embeddable&&us(u.url)?(0,K.jsx)(Gu,{src:us(u.url),title:u.title||u.url,referrerPolicy:`no-referrer`}):(0,K.jsxs)(Ku,{children:[(0,K.jsx)(qu,{children:(0,K.jsx)(q,{name:`eye-off`,size:24})}),(0,K.jsx)(`strong`,{children:us(u.url)?`此網頁不支援預覽`:`網址不完整`}),(0,K.jsx)(`span`,{children:us(u.url)?`以新視窗開啟網頁吧！`:`要以 http:// 或 https:// 開頭才能開啟`})]}))]})]}):(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(Mu,{children:[(0,K.jsx)(`strong`,{children:`補充內容`}),(0,K.jsxs)(Pu,{children:[v.popups.length,` 項`]}),(0,K.jsx)(Nu,{}),i&&(0,K.jsxs)(Fu,{onClick:()=>{h(),i(v.id)},children:[`編輯`,(0,K.jsx)(q,{name:`pencil`,size:16})]}),(0,K.jsx)(Fu,{onClick:h,"aria-label":`關閉`,children:(0,K.jsx)(q,{name:`x`,size:20,label:`關閉`})})]}),(0,K.jsx)(Iu,{children:v.popups.map(e=>(0,K.jsx)(ku,{item:e,onJump:t,onClose:h,onZoom:s,onRich:l,onDetail:d},e.id))})]})})}),document.body)]})}function ku({item:e,onJump:t,onClose:n,onZoom:r,onRich:i,onDetail:a}){let o=Er[e.kind],s=kr(e);return(0,K.jsxs)(Lu,{children:[(0,K.jsx)(Ru,{children:(0,K.jsx)(q,{name:o.icon,size:20})}),(0,K.jsxs)(zu,{children:[(0,K.jsx)(Bu,{children:Nr(e)}),s&&(0,K.jsx)(go,{children:s})]}),!s&&(0,K.jsx)(Xu,{onClick:()=>{if(e.kind===`jump`){n(),e.targetRowId&&t?.(e.targetRowId);return}if(e.kind===`image`)return r(e);if(e.kind===`rich`)return i(e);a(e)},children:o.action})]})}var Au=B.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: ${wu};
  display: grid;
  place-items: center;
  padding: ${e=>e.theme.space.insetLg};
`,ju=B.div`
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
`,Mu=B.header`
  ${e=>e.$float&&`position: absolute; top: 0; right: 0; z-index: 1;
     button { background: ${e.theme.surface.raised}; border-radius: 999px; }`}
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetMd} ${e=>e.theme.space.insetLg};
`,Nu=B.span`
  flex: 1;
`,Pu=B.span`
  color: ${e=>e.theme.text.tertiary};
  font-size: var(--ds-typography-label-size);
`,Fu=B.button`
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
`,Iu=B.ul`
  margin: 0;
  padding: ${e=>e.theme.space.insetSm} 0;
  list-style: none;
  overflow-y: auto;
`,Lu=B.li`
  display: flex;
  align-items: flex-start;
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetSm} ${e=>e.theme.space.insetLg};
`,Ru=B.span`
  display: grid;
  place-items: center;
  inline-size: 44px;
  block-size: 44px;
  flex: none;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.text.secondary};
`,zu=B.div`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-block-start: 2px;
`,Bu=B.div`
  min-block-size: 44px;
  display: flex;
  align-items: center;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 600;
`;function Vu({src:e,alt:t}){let[n,r]=(0,R.useState)(!1);return!e||n?(0,K.jsx)(Hu,{children:`這張圖片讀不到了，請回編輯模式重新上傳`}):(0,K.jsx)(`img`,{src:e,alt:t,onError:()=>r(!0)})}var Hu=B.p`
  margin: 0;
  padding: 48px 24px;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,Uu=B.div`
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
`,Wu=B.div`
  padding: 0 ${e=>e.theme.space.insetLg} ${e=>e.theme.space.insetLg};
  overflow-y: auto;
  ${e=>e.$big&&`flex: 1; min-block-size: 0; display: flex; flex-direction: column;`}
`,Gu=B.iframe`
  inline-size: 100%;
  block-size: calc(100vh - 48px - 72px - 24px);
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.raised};
`,Ku=B.div`
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
`,qu=B.span`
  display: grid;
  place-items: center;
  inline-size: 80px;
  block-size: 80px;
  border-radius: 999px;
  background: ${e=>e.theme.surface.muted};
  color: ${e=>e.theme.icon.secondary};
`,Ju=B.button`
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
`,Yu=B.p`
  margin: 0;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${e=>e.theme.text.secondary};
  white-space: pre-wrap;
`,Xu=B.button`
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
`,Zu=(0,R.createContext)(null);function Qu({editor:e,children:t}){let[n,r]=(0,R.useState)(null),[i,a]=(0,R.useState)(null),[o,s]=(0,R.useState)(null),[c,l]=(0,R.useState)(null),[u,d]=(0,R.useState)(null),[f,p]=(0,R.useState)(null),[m,h]=(0,R.useState)(null),[g,_]=(0,R.useState)(null),[v,y]=(0,R.useState)(null),b=Eu(),x=(0,R.useCallback)(e=>b?.open(e),[b]),S=(0,R.useCallback)(e=>{a(e),e!==null&&s(t=>t===null?t:e)},[]),C=(0,R.useCallback)(t=>{h(null);let n=document.activeElement;if(n&&n!==document.body&&n.closest(`main`)&&(!t||!n.closest(`[data-block-id="${CSS.escape(t)}"]`))&&n.blur(),r(t),t!==null){let n=Sr(e.doc,t);if(n){let t=e.doc.rows.findIndex(e=>e.id===n.row.id);t>=0&&s(e=>e===null?e:t+1)}}},[e.doc]);(0,R.useEffect)(()=>(b?.registerEdit(_),()=>b?.registerEdit(null)),[b]);let{startDrag:w}=_a(d,p,(0,R.useCallback)((t,n)=>e.dispatch(t.columnId?{type:`moveColumn`,rowId:t.rowId,columnId:t.columnId,target:n}:{type:`moveRow`,rowId:t.rowId,target:n}),[e])),T=(0,R.useCallback)(()=>{let e=document.activeElement;e&&e!==document.body&&e.closest(`main`)&&e.blur(),r(null),h(null)},[]),E=(0,R.useCallback)(()=>{let t=xa();if(!t)return null;let i=n?Sr(e.doc,n):null,a=i?e.doc.rows.findIndex(e=>e.id===i.row.id)+1:e.doc.rows.length;return e.dispatch({type:`insertRow`,index:a,blocks:[t]}),r(t.id),t.id},[e,n]);(0,R.useEffect)(()=>{let t=t=>{let i=t.target,a=!!i&&(i.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(i.tagName)),o=t.metaKey||t.ctrlKey;if(t.key===`Escape`){(n||m||a)&&(t.preventDefault(),T());return}if(a)return;if(o&&t.key.toLowerCase()===`z`){t.preventDefault(),t.shiftKey?e.redo():e.undo();return}if(o&&t.key.toLowerCase()===`y`){t.preventDefault(),e.redo();return}if(o&&t.key.toLowerCase()===`v`){if(!Sa())return;t.preventDefault(),E();return}if(!n)return;let s=Sr(e.doc,n);s&&(o&&t.key.toLowerCase()===`c`?(t.preventDefault(),ba(s.block)):o&&t.key.toLowerCase()===`x`?(t.preventDefault(),ba(s.block),e.dispatch({type:`deleteBlock`,blockId:s.block.id}),r(null)):o&&t.key.toLowerCase()===`d`?(t.preventDefault(),ba(s.block),E()):(t.key===`Delete`||t.key===`Backspace`)&&(t.preventDefault(),e.dispatch({type:`deleteBlock`,blockId:s.block.id}),r(null)))};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e,n,m,T,E]);let D=(0,R.useMemo)(()=>({...e,selectedBlockId:n,select:C,deselect:T,paste:E,insertAt:i,openInsert:S,libraryAt:o,openLibrary:s,hoverGap:c,setHoverGap:l,draggingRowId:u,setDraggingRowId:d,dropTarget:f,setDropTarget:p,inlineSelection:m,setInlineSelection:h,popupFor:g,openPopupPanel:_,popupPick:v,setPopupPick:y,previewPopups:x,startDrag:w}),[e,n,C,T,E,i,S,o,c,u,f,m,g,v,x,w]);return(0,K.jsx)(Zu.Provider,{value:D,children:t})}function $u(){return(0,R.useContext)(Zu)}var ed=`data:image/svg+xml,%3csvg%20width='72'%20height='48'%20viewBox='0%200%2072%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='tablePreview'%3e%3cg%20clip-path='url(%23clip0_0_64)'%3e%3crect%20width='72'%20height='48'%20rx='8'%20fill='white'/%3e%3cpath%20id='Vector'%20d='M72%200H0V12H72V0Z'%20fill='%23F0FF62'/%3e%3cg%20id='Vector_2'%3e%3c/g%3e%3cg%20id='Vector_3'%3e%3c/g%3e%3cpath%20id='Vector_4'%20d='M24%200V48'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_5'%20d='M48%200V48'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_6'%20d='M0%2012H72'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_7'%20d='M0%2024H72'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_8'%20d='M0%2036H72'%20stroke='%239D9C9A'/%3e%3c/g%3e%3crect%20x='0.5'%20y='0.5'%20width='71'%20height='47'%20rx='7.5'%20stroke='%239D9C9A'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_0_64'%3e%3crect%20width='72'%20height='48'%20rx='8'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,td=`data:image/svg+xml,%3csvg%20width='72'%20height='48'%20viewBox='0%200%2072%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='tablePreview'%3e%3cg%20clip-path='url(%23clip0_0_47)'%3e%3crect%20width='72'%20height='48'%20rx='8'%20fill='white'/%3e%3cpath%20id='Vector'%20d='M72%200H0V12H72V0Z'%20fill='%23FBFFD0'/%3e%3cpath%20id='Vector_2'%20d='M72%2024H0V36H72V24Z'%20fill='%23FBFFD0'/%3e%3cpath%20id='Vector_3'%20d='M24%200V48'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_4'%20d='M48%200V48'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_5'%20d='M0%2012H72'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_6'%20d='M0%2024H72'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_7'%20d='M0%2036H72'%20stroke='%239D9C9A'/%3e%3c/g%3e%3crect%20x='0.5'%20y='0.5'%20width='71'%20height='47'%20rx='7.5'%20stroke='%239D9C9A'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_0_47'%3e%3crect%20width='72'%20height='48'%20rx='8'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,nd=`data:image/svg+xml,%3csvg%20width='72'%20height='48'%20viewBox='0%200%2072%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='tablePreview'%3e%3cg%20clip-path='url(%23clip0_0_73)'%3e%3crect%20width='72'%20height='48'%20rx='8'%20fill='white'/%3e%3cpath%20id='Vector'%20d='M72%200H0V12H72V0Z'%20fill='%23F0FF62'/%3e%3cpath%20id='Vector_2'%20d='M72%2012H0V24H72V12Z'%20fill='%23FBFFD0'/%3e%3cpath%20id='Vector_3'%20d='M72%2036H0V48H72V36Z'%20fill='%23FBFFD0'/%3e%3cpath%20id='Vector_4'%20d='M24%200V48'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_5'%20d='M48%200V48'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_6'%20d='M0%2012H72'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_7'%20d='M0%2024H72'%20stroke='%239D9C9A'/%3e%3cpath%20id='Vector_8'%20d='M0%2036H72'%20stroke='%239D9C9A'/%3e%3c/g%3e%3crect%20x='0.5'%20y='0.5'%20width='71'%20height='47'%20rx='7.5'%20stroke='%239D9C9A'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_0_73'%3e%3crect%20width='72'%20height='48'%20rx='8'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,rd=z`
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
`,id=z`
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
`,ad=z`
  display: grid;
  grid-template-columns: repeat(5, 28px);
  gap: 10px;
  padding: 4px;
`,od={rows:3,cols:4};function sd(e=od.rows,t=od.cols){return{id:V(`blk`),type:`table`,rows:e,cols:t,cells:Array.from({length:e},()=>Array.from({length:t},()=>``)),hasHeader:!1,preset:`plain`,popups:[]}}var cd=(e,t)=>`${e},${t}`,ld=e=>{let[t,n]=e.split(`,`).map(Number);return[t,n]};function ud(e,t){if(!e)return;let n={};for(let[r,i]of Object.entries(e)){let[e,a]=ld(r),o=t(e,a);o&&(n[cd(o[0],o[1])]=i)}return Object.keys(n).length>0?n:void 0}function dd(e){return Array.from({length:e.rows},(t,n)=>Array.from({length:e.cols},(t,r)=>e.cells[n]?.[r]??``))}function fd(e,t,n,r){let i=dd(e);return i[t][n]===r?e:(i[t]=i[t].slice(),i[t][n]=r,{...e,cells:i})}function pd(e,t){let n=dd(e).map(e=>[...e.slice(0,t),``,...e.slice(t)]),r=ki(e),i=100/(e.cols+1),a=r.map(e=>e*(100-i)/100),o=[...a.slice(0,t),i,...a.slice(t)];return{...e,cols:e.cols+1,cells:n,colWidths:o,cellBg:ud(e.cellBg,(e,n)=>[e,n>=t?n+1:n])}}function md(e,t){if(e.cols<=1)return e;let n=dd(e).map(e=>e.filter((e,n)=>n!==t)),r=ki(e).filter((e,n)=>n!==t);return{...e,cols:e.cols-1,cells:n,colWidths:r,cellBg:ud(e.cellBg,(e,n)=>n===t?null:[e,n>t?n-1:n])}}function hd(e,t,n){if(t===n||t<0||n<0||t>=e.cols||n>=e.cols)return e;let r=Array.from({length:e.cols},(e,t)=>t);r.splice(t,1),r.splice(n,0,t);let i=dd(e).map(e=>r.map(t=>e[t])),a=ki(e),o=new Map(r.map((e,t)=>[e,t]));return{...e,cells:i,colWidths:r.map(e=>a[e]),cellBg:ud(e.cellBg,(e,t)=>[e,o.get(t)])}}function gd(e,t){let n=dd(e);n.splice(t,0,Array.from({length:e.cols},()=>``));let r=e.rowHeights?yd([...e.rowHeights.slice(0,t),0,...e.rowHeights.slice(t)],e.rows+1):void 0;return{...e,rows:e.rows+1,cells:n,rowHeights:r,cellBg:ud(e.cellBg,(e,n)=>[e>=t?e+1:e,n])}}function _d(e,t){if(e.rows<=1)return e;let n=dd(e).filter((e,n)=>n!==t),r=e.rowHeights?.filter((e,n)=>n!==t);return{...e,rows:e.rows-1,cells:n,rowHeights:r,cellBg:ud(e.cellBg,(e,n)=>e===t?null:[e>t?e-1:e,n])}}function vd(e,t,n){if(t===n||t<0||n<0||t>=e.rows||n>=e.rows)return e;let r=Array.from({length:e.rows},(e,t)=>t);r.splice(t,1),r.splice(n,0,t);let i=dd(e),a=new Map(r.map((e,t)=>[e,t]));return{...e,cells:r.map(e=>i[e]),rowHeights:e.rowHeights?r.map(t=>e.rowHeights[t]):void 0,cellBg:ud(e.cellBg,(e,t)=>[a.get(e),t])}}function yd(e,t){let n=Array.from({length:t},(t,n)=>e[n]||0);return n.some(e=>e>0)?n:void 0}function Q(e,t,n){let r=Array.from({length:e.rows},(t,n)=>e.rowHeights?.[n]??0);return r[t]=Math.max(0,Math.round(n)),{...e,rowHeights:yd(r,e.rows)}}function bd(e,t){return{...e,colWidths:t}}function xd(e,t,n,r){let i={...e.cellBg};return r?i[cd(t,n)]=r:delete i[cd(t,n)],{...e,cellBg:Object.keys(i).length>0?i:void 0}}function Sd(e,t){return{...e,preset:t,cellBg:void 0,borderColor:void 0,borderWidth:t===`borderless`?0:void 0}}function Cd(e,t,n){let r=Math.max(1,t),i=Math.max(1,n),a=e;for(;a.rows<r;)a=gd(a,a.rows);for(;a.rows>r;)a=_d(a,a.rows-1);for(;a.cols<i;)a=pd(a,a.cols);for(;a.cols>i;)a=md(a,a.cols-1);return a}var wd={cell:null,panel:!1,insertAt:null},Td=new Set,Ed=()=>Td.forEach(e=>e()),Dd=e=>(Td.add(e),()=>Td.delete(e));function Od(){return(0,R.useSyncExternalStore)(Dd,()=>wd)}function kd(e){wd.cell!==e&&(wd={...wd,cell:e},Ed())}function Ad(e){wd.panel!==e&&(wd={...wd,panel:e},Ed())}function jd(e){wd.insertAt!==e&&(wd={...wd,insertAt:e},Ed())}var Md=[{label:`白`,color:`#FFFFFF`},{label:`淡黃`,color:`#F4FBA2`},{label:`米黃`,color:`#FDF3D1`},{label:`粉紅`,color:`#F8BBD0`},{label:`水藍`,color:`#80DEEA`}],$=[{label:`墨黑`,color:`#1A1917`},{label:`深灰`,color:`#4A4947`},{label:`中灰`,color:`#787672`},{label:`淺灰`,color:`#CCCCCC`},{label:`橄欖綠`,color:`#4D581A`}],Nd=6,Pd=9,Fd=6;function Id({blockId:e}={}){let t=$u(),n=Od(),r=n.insertAt!==null,i=n.panel,a=e||(i&&t?.selectedBlockId?t.selectedBlockId:null),o=t&&a?Sr(t.doc,a):null,s=o&&o.block.type===`table`?o.block:null;return(0,R.useEffect)(()=>{let e=e=>{e.key===`Escape`&&(n.insertAt!==null&&jd(null),n.panel&&Ad(!1))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[n.insertAt,n.panel]),!t||!r&&(!i||!s)?null:(0,G.createPortal)((0,K.jsx)(Ld,{isInsertMode:r,editingBlock:s,insertAt:n.insertAt,onClose:()=>{r&&jd(null),i&&Ad(!1)}}),document.body)}function Ld({isInsertMode:e,editingBlock:t,insertAt:n,onClose:r}){let i=$u(),a=Od();cc(!0,r);let o=(0,R.useRef)(null),[s,c]=(0,R.useState)(!1),l=()=>{let e=o.current;e&&c(e.scrollTop+e.clientHeight<e.scrollHeight-2)};(0,R.useEffect)(()=>{let e=o.current;if(!e)return;l();let t=new ResizeObserver(l);return t.observe(e),()=>t.disconnect()},[]);let[u,d]=(0,R.useState)(t?t.rows:od.rows),[f,p]=(0,R.useState)(t?t.cols:od.cols),[m,h]=(0,R.useState)(null),[g,_]=(0,R.useState)(t?.preset??`header`),[v,y]=(0,R.useState)(null),[b,x]=(0,R.useState)(t?.borderColor??`#1A1917`),[S,C]=(0,R.useState)(t?.borderWidth??1),w=(0,R.useRef)(null),T=(0,R.useRef)(null);(0,R.useEffect)(()=>{t&&(d(t.rows),p(t.cols),_(t.preset??`plain`),x(t.borderColor??`#1A1917`),C(t.borderWidth??1))},[t?.id,t?.rows,t?.cols,t?.preset,t?.borderColor,t?.borderWidth]);let E=e=>{t&&i.dispatch({type:`patchBlock`,blockId:t.id,blockType:`table`,patch:e})},D=e=>{if(_(e),t){let{id:n,type:r,popups:i,...a}=Sd(t,e);E(a)}},O=(e,n)=>{let r=Math.max(1,Math.min(30,e)),i=Math.max(1,Math.min(12,n));if(d(r),p(i),t){let{id:e,type:n,popups:a,...o}=Cd(t,r,i);E(o)}},k=a.cell&&t&&a.cell.blockId===t.id?a.cell:null,A=t&&k?t.cellBg?.[`${k.r},${k.c}`]??null:v,ee=e=>{if(y(e),t){if(k){let n=xd(t,k.r,k.c,e);E({cellBg:n.cellBg})}else{let n={};if(e)for(let r=0;r<t.rows;r++)for(let i=0;i<t.cols;i++)n[`${r},${i}`]=e;E({cellBg:e?n:void 0})}}},te=e=>{x(e),t&&E({borderColor:e})},j=e=>{let n=Math.max(0,Math.min(Nd,e));C(n),t&&E({borderWidth:n})},M=()=>{if(e&&n!==null){let e=sd(u,f);if(e.preset=g,e.borderColor=b,e.borderWidth=S,v){let t={};for(let e=0;e<u;e++)for(let n=0;n<f;n++)t[`${e},${n}`]=v;e.cellBg=t}i.dispatch({type:`insertRow`,index:n,blocks:[e]}),jd(null),i.select(e.id)}else r()},N=e=>pf.test(e)?e:null,P=m?m.r:u,F=m?m.c:f;return(0,K.jsxs)(Rd,{role:`dialog`,"aria-label":`表格設定`,"data-ui":!0,onClick:e=>e.stopPropagation(),onPointerDown:e=>e.stopPropagation(),children:[(0,K.jsxs)(zd,{children:[(0,K.jsx)(Bd,{children:`表格`}),(0,K.jsx)(Vd,{type:`button`,onClick:r,"aria-label":`關閉`,children:(0,K.jsx)(q,{name:`x`,size:24,label:`關閉`})})]}),(0,K.jsxs)(Hd,{ref:o,onScroll:l,$more:s,children:[(0,K.jsxs)(Ud,{children:[(0,K.jsx)(Wd,{children:`快速樣式`}),(0,K.jsx)(Gd,{children:(0,K.jsxs)(Kd,{children:[(0,K.jsx)(qd,{type:`button`,$active:g===`header`,onClick:()=>D(`header`),title:`表頭強調`,children:(0,K.jsx)(Jd,{src:ed,alt:``})}),(0,K.jsx)(qd,{type:`button`,$active:g===`zebra`,onClick:()=>D(`zebra`),title:`斑馬紋`,children:(0,K.jsx)(Jd,{src:td,alt:``})}),(0,K.jsx)(qd,{type:`button`,$active:g===`plain`||g===`borderless`,onClick:()=>D(`plain`),title:`簡約白底`,children:(0,K.jsx)(Jd,{src:nd,alt:``})})]})})]}),(0,K.jsxs)(Ud,{children:[(0,K.jsx)(Wd,{children:`尺寸`}),(0,K.jsxs)(Gd,{children:[(0,K.jsx)(Yd,{onPointerLeave:()=>h(null),children:Array.from({length:Fd},(e,t)=>{let n=t+1;return(0,K.jsx)(Xd,{children:Array.from({length:Pd},(e,t)=>{let r=t+1;return(0,K.jsx)(Zd,{type:`button`,$highlighted:n<=P&&r<=F,"aria-label":`${n} 行 ${r} 列`,onPointerEnter:e=>{h({r:n,c:r}),e.buttons===1&&O(n,r)},onPointerDown:()=>O(n,r)},r)})},n)})}),(0,K.jsxs)(Qd,{children:[(0,K.jsx)($d,{children:(0,K.jsx)(tf,{type:`number`,min:1,max:30,value:u,"aria-label":`行數`,onChange:e=>O(Number(e.target.value),f)})}),(0,K.jsx)(nf,{children:`行`}),(0,K.jsx)($d,{children:(0,K.jsx)(tf,{type:`number`,min:1,max:12,value:f,"aria-label":`列數`,onChange:e=>O(u,Number(e.target.value))})}),(0,K.jsx)(nf,{children:`列`})]})]})]}),(0,K.jsxs)(Ud,{children:[(0,K.jsx)(Wd,{children:`儲存格背景`}),(0,K.jsx)(Gd,{children:(0,K.jsxs)(of,{children:[Md.map(e=>{let t=A===e.color||!A&&e.color===`#FFFFFF`;return(0,K.jsx)(sf,{type:`button`,title:e.label,style:{background:e.color},$on:t,onClick:()=>ee(e.color)},e.label)}),(0,K.jsxs)(cf,{type:`button`,title:`自訂儲存格背景`,$on:!!A&&!Md.some(e=>e.color===A),style:A&&!Md.some(e=>e.color===A)?{background:A}:void 0,onClick:()=>w.current?.click(),children:[(0,K.jsx)(q,{name:`plus`,size:16}),(0,K.jsx)(`input`,{ref:w,type:`color`,value:A??`#ffffff`,onChange:e=>{let t=N(e.target.value);t&&ee(t)},tabIndex:-1,"aria-label":`自訂儲存格背景`})]})]})})]}),(0,K.jsxs)(Ud,{children:[(0,K.jsx)(Wd,{children:`框線顏色`}),(0,K.jsx)(Gd,{children:(0,K.jsxs)(of,{children:[$.map(e=>{let t=b===e.color;return(0,K.jsx)(sf,{type:`button`,title:e.label,style:{background:e.color},$on:t,onClick:()=>te(e.color)},e.label)}),(0,K.jsxs)(cf,{type:`button`,title:`自訂框線顏色`,$on:!$.some(e=>e.color===b),style:$.some(e=>e.color===b)?void 0:{background:b},onClick:()=>T.current?.click(),children:[(0,K.jsx)(q,{name:`plus`,size:16}),(0,K.jsx)(`input`,{ref:T,type:`color`,value:b,onChange:e=>{let t=N(e.target.value);t&&te(t)},tabIndex:-1,"aria-label":`自訂框線顏色`})]})]})})]}),(0,K.jsxs)(Ud,{children:[(0,K.jsx)(Wd,{children:`線條粗細`}),(0,K.jsx)(Gd,{children:(0,K.jsxs)(rf,{children:[(0,K.jsx)(af,{type:`number`,min:0,max:Nd,value:S,"aria-label":`線條粗細`,onChange:e=>j(Number(e.target.value))}),(0,K.jsx)(`span`,{children:`px`})]})})]})]}),(0,K.jsx)(lf,{children:(0,K.jsx)(uf,{type:`button`,onClick:M,children:e?`新增表格`:`完成`})})]})}var Rd=lc,zd=uc,Bd=dc,Vd=fc,Hd=B(pc)`
  ${e=>e.$more?`&::-webkit-scrollbar-thumb { background: ${e.theme.border.default}; }`:``}
`,Ud=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
`,Wd=B.span`
  font-size: var(--ds-typography-label-size);
  font-weight: var(--ds-typography-label-weight);
  color: ${e=>e.theme.text.secondary};
`,Gd=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetXs};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.sunken};
`,Kd=B.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${e=>e.theme.space.gapSm};
`,qd=B.button`
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
`,Jd=B.img`
  display: block;
  inline-size: 60px;
  block-size: 40px;
`,Yd=B.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`,Xd=B.div`
  display: grid;
  grid-template-columns: repeat(${Pd}, 1fr);
  gap: 3px;
`,Zd=B.button`
  block-size: 20px;
  padding: 0;
  border-radius: 4px;
  cursor: pointer;
  border: 1.5px solid ${e=>e.$highlighted?e.theme.brand.primaryHover:`transparent`};
  background: ${e=>e.$highlighted?e.theme.brand.primaryTint:e.theme.surface.raised};
  transition: background 0.08s, border-color 0.08s;
`,Qd=B.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr auto;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
`,$d=B.div`
  display: contents;
`,ef=z`
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
`,tf=B.input`
  ${ef}
  &:focus { box-shadow: inset 0 0 0 1px ${e=>e.theme.border.hover}; background: ${e=>e.theme.surface.raised}; }
`,nf=B.span`
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,rf=B.label`
  ${ef}
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  &:focus-within { box-shadow: inset 0 0 0 1px ${e=>e.theme.border.hover}; background: ${e=>e.theme.surface.raised}; }
`,af=B.input`
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
`,of=B.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
`,sf=B.button`
  ${rd}
`,cf=B(sf)`
  ${id}
`,lf=B.footer`
  position: relative;
  padding: ${e=>e.theme.space.gapMd} 20px 20px;
  flex-shrink: 0;
  /* 不畫陰影或分隔線（看起來像一條硬線）；下面還有內容時，捲動區的捲軸會露出來提示 */
`,uf=B.button`
  ${bs}
  inline-size: 100%;
`;function df(e,t,n=1,r){let i=Ri(`supplement`,n),a=e.borderWidth??1,o=mf(e.borderColor,`var(--ds-text-primary)`),s=a>0?`${a}px solid ${o}`:`none`,c=e.preset??`plain`,l=e.hasHeader||c===`header`,u=r?.colWidths??ki(e),d=r?.rowMins??Ai(e),f=(t,n)=>mf(e.cellBg?.[`${t},${n}`],``)||(l&&t===0||c===`zebra`&&t%2==1?`var(--ds-surface-sunken)`:`transparent`);return{table:{width:`${t}px`,"border-collapse":`collapse`,"table-layout":`fixed`,"font-size":i.fontSize,"line-height":i.lineHeight,"font-weight":i.fontWeight,"font-family":i.fontFamily,color:`var(--ds-text-primary)`,"writing-mode":`horizontal-tb`},colWidths:u,rowMins:d,cell:(e,t)=>({border:s,padding:`6px 10px`,"box-sizing":`border-box`,"vertical-align":`top`,"text-align":`start`,"white-space":`pre-wrap`,"word-break":`break-word`,overflow:`hidden`,"font-weight":l&&e===0?`600`:`inherit`,background:f(e,t)})}}var ff=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),pf=/^(#[0-9a-f]{3,8}|var\(--[a-z0-9-]+\)|transparent|rgba?\([\d\s.,%]+\))$/i,mf=(e,t)=>e&&pf.test(e)?e:t,hf=(e,t)=>{for(let[n,r]of Object.entries(t))e.style.setProperty(n,r)};function gf(e,t,n=1){let r=df(e,t,n),i=document.createElement(`table`);hf(i,r.table);let a=document.createElement(`colgroup`);for(let e of r.colWidths){let t=document.createElement(`col`);t.style.width=`${e}%`,a.appendChild(t)}i.appendChild(a);let o=document.createElement(`tbody`);for(let t=0;t<e.rows;t++){let n=document.createElement(`tr`);n.style.height=`${r.rowMins[t]}px`;for(let i=0;i<e.cols;i++){let a=document.createElement(`td`);hf(a,r.cell(t,i)),a.textContent=e.cells[t]?.[i]||`​`,n.appendChild(a)}o.appendChild(n)}return i.appendChild(o),i}var _f=e=>{let t={};for(let[n,r]of Object.entries(e))t[n.replace(/-([a-z])/g,(e,t)=>t.toUpperCase())]=r;return t};function vf(){let[e,t]=(0,R.useState)({}),n=(0,R.useRef)(new Map),r=(0,R.useRef)(new WeakMap),i=(0,R.useRef)(null);return{ref:e=>{let a=n.current.get(e);return a||(a=n=>{if(n)return!i.current&&typeof ResizeObserver<`u`&&(i.current=new ResizeObserver(e=>{t(t=>{let n=t;for(let i of e){let e=r.current.get(i.target),a=i.target.offsetHeight;e&&t[e]!==a&&(n={...n,[e]:a})}return n})})),r.current.set(n,e),i.current?.observe(n),()=>i.current?.unobserve(n)},n.current.set(e,a)),a},frame:(t,n,r=!1)=>e[t]?r?{...n,inlineSize:e[t]}:{...n,blockSize:e[t]}:n}}var yf=4;function bf({block:e,boxStyle:t,sizing:n,scale:r=1,onSelect:i}){let a=$u(),o=!!a,s=!!a&&a.selectedBlockId===e.id,c=n.vertical,l=typeof t?.width==`number`?t.width:n.inlineSize,u=c?n.inlineSize:n.maxBlockSize,d=(0,R.useRef)(null),f=(0,R.useRef)(null),[p,m]=(0,R.useState)(null),h=df(e,l,r,p??void 0),[g,_]=(0,R.useState)([]);(0,R.useLayoutEffect)(()=>{let e=f.current;if(!e)return;let t=Array.from(e.rows,e=>({top:e.offsetTop,height:e.offsetHeight}));_(e=>e.length===t.length&&e.every((e,n)=>e.top===t[n].top&&e.height===t[n].height)?e:t)});let v=ji(g.map(e=>e.height),u),y=Od(),b=s&&y.cell?.blockId===e.id?y.cell:null,[x,S]=(0,R.useState)(!1),[C,w]=(0,R.useState)(null),[T,E]=(0,R.useState)(null),[D,O]=(0,R.useState)(null);(0,R.useEffect)(()=>{!o||s||(S(!1),w(null),E(null),y.cell?.blockId===e.id&&kd(null))},[o,s,y.cell,e.id]),(0,R.useEffect)(()=>{if(!b||x)return;let e=f.current?.rows[b.r]?.cells[b.c];e&&document.activeElement!==e&&e.focus({preventScroll:!0})},[b,x]);let k=t=>{if(!a||t===e)return;let{id:n,type:r,popups:i,...o}=t;a.dispatch({type:`patchBlock`,blockId:e.id,blockType:`table`,patch:o})},A=(e,t)=>{if(e.contentEditable=`true`,t!==void 0&&(e.textContent=t,e.blur()),e.focus({preventScroll:!0}),t!==void 0){let t=document.createRange();t.selectNodeContents(e),t.collapse(!1);let n=window.getSelection();n?.removeAllRanges(),n?.addRange(t)}S(!0)},ee=(t,n,r)=>{let i=t.innerText.replace(/\n$/,``);t.contentEditable=`false`,S(!1),k(fd(e,n,r,i))},te=()=>{let e=d.current;return e?e.getBoundingClientRect().width/(e.offsetWidth||1):1},j=t=>n=>{n.preventDefault(),n.stopPropagation();let r=te(),i=n.clientX,a=ki(e),o=a,s=e=>{let n=(e.clientX-i)/r/l*100,s=a[t]+a[t+1],c=Math.max(5,Math.min(s-5,a[t]+n));o=a.slice(),o[t]=c,o[t+1]=s-c,m({colWidths:o})},c=()=>{window.removeEventListener(`pointermove`,s),window.removeEventListener(`pointerup`,c),m(null),o!==a&&k(bd(e,o))};window.addEventListener(`pointermove`,s),window.addEventListener(`pointerup`,c)},M=t=>n=>{n.preventDefault(),n.stopPropagation();let r=te(),i=n.clientY,a=g[t]?.height??h.rowMins[t],o=null,s=n=>{o=Math.max(20,Math.round(a+(n.clientY-i)/r));let s=Ai(e).slice();s[t]=o,m({rowMins:s})},c=()=>{window.removeEventListener(`pointermove`,s),window.removeEventListener(`pointerup`,c),m(null),o!==null&&k(Q(e,t,o))};window.addEventListener(`pointermove`,s),window.addEventListener(`pointerup`,c)},N=(t,n)=>r=>{r.preventDefault(),r.stopPropagation();let i=r.currentTarget,a=te(),o=r.clientX,s=r.clientY,c=!1,u=n,f=()=>{if(t===`col`){let e=0;return h.colWidths.map(t=>{let n=(e+t/2)/100*l;return e+=t,n})}return g.map(e=>e.top+e.height/2)},p=e=>{if(!c&&Math.hypot(e.clientX-o,e.clientY-s)<yf)return;c=!0,E(null);let n=d.current.getBoundingClientRect(),r=t===`col`?(e.clientX-n.left)/a:(e.clientY-n.top)/a;u=f().filter(e=>e<r).length,O({kind:t,index:u})},m=()=>{if(window.removeEventListener(`pointermove`,p),window.removeEventListener(`pointerup`,m),O(null),!c){w({kind:t,index:n}),kd(null),S(!1),E({kind:t,index:n,rect:i.getBoundingClientRect()});return}let r=u>n?u-1:u;r!==n&&(k(t===`col`?hd(e,n,r):vd(e,n,r)),w({kind:t,index:r}))};window.addEventListener(`pointermove`,p),window.addEventListener(`pointerup`,m)};(0,R.useEffect)(()=>{if(!T)return;let e=e=>{e.target.closest(`[data-table-menu]`)||E(null)},t=e=>e.key===`Escape`&&E(null);return window.addEventListener(`pointerdown`,e,!0),window.addEventListener(`keydown`,t,!0),()=>{window.removeEventListener(`pointerdown`,e,!0),window.removeEventListener(`keydown`,t,!0)}},[T]);let P=t=>{if(!T)return;let{kind:n,index:r}=T;E(null),w(null),k(n===`col`?t===`insert`?pd(e,r+1):md(e,r):t===`insert`?gd(e,r+1):_d(e,r))},F=(t,n)=>r=>{if(!o||(w(null),!s))return;let i=r.currentTarget;if(b&&b.r===t&&b.c===n){x||A(i);return}r.preventDefault(),kd({blockId:e.id,r:t,c:n}),S(!1)},ne=(t,n)=>r=>{let i=r.currentTarget;if(!(!b||b.r!==t||b.c!==n)){if(x){if(r.key===`Enter`&&!r.shiftKey)r.preventDefault(),r.stopPropagation(),i.blur();else if(r.key===`Escape`)r.preventDefault(),r.stopPropagation(),i.blur();else if(r.key===`Tab`){r.preventDefault(),r.stopPropagation(),i.blur();let a=r.shiftKey?t*e.cols+n-1:t*e.cols+n+1;a>=0&&a<e.rows*e.cols&&kd({blockId:e.id,r:Math.floor(a/e.cols),c:a%e.cols})}return}r.key===`Enter`?(r.preventDefault(),r.stopPropagation(),A(i)):r.key===`Escape`?(r.preventDefault(),r.stopPropagation(),kd(null)):r.key===`Backspace`||r.key===`Delete`?(r.preventDefault(),r.stopPropagation(),k(fd(e,t,n,``))):r.key.length===1&&!r.metaKey&&!r.ctrlKey&&!r.altKey&&(r.preventDefault(),r.stopPropagation(),A(i,r.key))}},re=(0,R.useRef)(new Map),ie=e=>{let t=re.current.get(e);return t||(t={__html:ff(e)||`&#8203;`},re.current.set(e,t)),t},ae=e=>h.colWidths.slice(0,e).reduce((e,t)=>e+t,0),oe=s&&!c;return(0,K.jsxs)(xf,{ref:d,style:c?{width:t?.width}:{width:l},onPointerDown:i,"data-table-block":!0,children:[(0,K.jsxs)(Sf,{style:{maxHeight:u},children:[(0,K.jsxs)(`table`,{ref:f,style:_f(h.table),children:[(0,K.jsx)(`colgroup`,{children:h.colWidths.map((e,t)=>(0,K.jsx)(`col`,{style:{width:`${e}%`}},t))}),(0,K.jsx)(`tbody`,{children:Array.from({length:e.rows},(t,n)=>(0,K.jsx)(`tr`,{style:{height:h.rowMins[n]},children:Array.from({length:e.cols},(t,r)=>{let i=e.cells[n]?.[r]??``,a=!!b&&b.r===n&&b.c===r;return(0,K.jsx)(Cf,{style:_f(h.cell(n,r)),$selected:a,$editing:a&&x,tabIndex:o&&s?-1:void 0,contentEditable:a&&x?`true`:void 0,suppressContentEditableWarning:!0,onPointerDown:F(n,r),onKeyDown:o?ne(n,r):void 0,onBlur:a&&x?e=>ee(e.currentTarget,n,r):void 0,dangerouslySetInnerHTML:ie(i)},r)})},n))})]}),v&&(0,K.jsxs)(wf,{"data-ui":!0,children:[`還有 `,v.hidden,` 列放不下這一頁。表格不能跨頁，請拆成兩個表格。`]})]}),oe&&(0,K.jsxs)(K.Fragment,{children:[C&&C.kind===`col`&&(0,K.jsx)(Tf,{style:{left:`${ae(C.index)}%`,width:`${h.colWidths[C.index]}%`,top:0,height:Math.min(g.reduce((e,t)=>e+t.height,0),u)}}),C&&C.kind===`row`&&g[C.index]&&(0,K.jsx)(Tf,{style:{left:0,width:`100%`,top:g[C.index].top,height:g[C.index].height}}),D&&D.kind===`col`&&(0,K.jsx)(Ef,{$vertical:!0,style:{left:`${ae(D.index)}%`}}),D&&D.kind===`row`&&(0,K.jsx)(Ef,{style:{top:D.index<g.length?g[D.index].top:g.reduce((e,t)=>e+t.height,0)}}),h.colWidths.slice(0,-1).map((e,t)=>(0,K.jsx)(Df,{"data-ui":!0,style:{left:`${ae(t+1)}%`},onPointerDown:j(t),"aria-label":`調整欄寬`},`c${t}`)),g.map((e,t)=>(0,K.jsx)(Of,{"data-ui":!0,style:{top:e.top+e.height},onPointerDown:M(t),"aria-label":`調整列高`},`r${t}`)),h.colWidths.map((e,t)=>(0,K.jsx)(kf,{"data-ui":!0,$on:C?.kind===`col`&&C.index===t||T?.kind===`col`&&T.index===t,style:{left:`${ae(t)+e/2}%`},onPointerDown:N(`col`,t),title:`拖曳調整順序，點一下開選單`,"aria-label":`第 ${t+1} 欄`,children:(0,K.jsx)(jf,{})},`h${t}`)),g.map((e,t)=>(0,K.jsx)(Af,{"data-ui":!0,$on:C?.kind===`row`&&C.index===t||T?.kind===`row`&&T.index===t,style:{top:e.top+e.height/2},onPointerDown:N(`row`,t),title:`拖曳調整順序，點一下開選單`,"aria-label":`第 ${t+1} 列`,children:(0,K.jsx)(jf,{$vertical:!0})},`rh${t}`)),(0,K.jsx)(Nf,{"data-ui":!0,type:`button`,title:`新增一欄`,"aria-label":`新增一欄`,onPointerDown:e=>e.stopPropagation(),onClick:()=>k(pd(e,e.cols)),children:(0,K.jsx)(q,{name:`plus`,size:16})}),(0,K.jsx)(Pf,{"data-ui":!0,type:`button`,title:`新增一列`,"aria-label":`新增一列`,onPointerDown:e=>e.stopPropagation(),onClick:()=>k(gd(e,e.rows)),children:(0,K.jsx)(q,{name:`plus`,size:16})})]}),T&&(0,G.createPortal)((0,K.jsxs)(Ff,{"data-table-menu":!0,"data-ui":!0,role:`menu`,style:T.kind===`col`?{top:T.rect.bottom+6,left:T.rect.left+T.rect.width/2,transform:`translateX(-50%)`}:{top:T.rect.top+T.rect.height/2,left:T.rect.left-6,transform:`translate(-100%, -50%)`},children:[(0,K.jsx)(If,{type:`button`,role:`menuitem`,onClick:()=>P(`insert`),children:T.kind===`col`?`向右新增一欄`:`向下新增一列`}),(0,K.jsx)(If,{type:`button`,role:`menuitem`,disabled:T.kind===`col`?e.cols<=1:e.rows<=1,onClick:()=>P(`delete`),children:T.kind===`col`?`刪除此欄`:`刪除此列`})]}),document.body)]})}var xf=B.div`
  position: relative;
  box-sizing: border-box;
  writing-mode: horizontal-tb;
`,Sf=B.div`
  position: relative;
  overflow: hidden;
  overflow: clip;
`,Cf=B.td`
  /*
   * 選取框用內縮的 box-shadow 畫：不改尺寸（量測端看不到它是對的），
   * 也不會被全域的「滑鼠點的焦點不畫框」規則蓋掉——outline 會。
   * 打字中換成淡一點的框，表示現在框裡的是游標不是整格。
   */
  box-shadow: ${e=>e.$editing?`inset 0 0 0 2px ${e.theme.tool.borderSubtle}`:e.$selected?`inset 0 0 0 2px ${e.theme.tool.border}`:`none`};
  cursor: ${e=>e.$editing?`text`:`default`};
  &:focus,
  &:focus-visible { outline: none; }
`,wf=B.div`
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
`,Tf=B.div`
  position: absolute;
  pointer-events: none;
  z-index: 7;
  outline: ${e=>e.theme.border.widthSelected} solid ${e=>e.theme.tool.border};
  outline-offset: -1px;
  background: ${e=>e.theme.tool.surfaceSubtle};
  opacity: 0.6;
`,Ef=B.div`
  position: absolute;
  pointer-events: none;
  z-index: 9;
  background: ${e=>e.theme.text.primary};
  ${e=>e.$vertical?`top: 0; bottom: 0; width: 3px; transform: translateX(-50%);`:`left: 0; right: 0; height: 3px; transform: translateY(-50%);`}
`,Df=B.div`
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
`,Of=B.div`
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
`,kf=B.div`
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
`,Af=B(kf)`
  top: auto;
  left: -10px;
  transform: translate(-100%, -50%);
  inline-size: 16px;
  block-size: 28px;
`,jf=B.span`
  display: inline-block;
  inline-size: ${e=>e.$vertical?`3px`:`11px`};
  block-size: ${e=>e.$vertical?`11px`:`3px`};
  background: radial-gradient(circle, currentColor 1.2px, transparent 1.4px) 0 0 / 4px 4px;
`,Mf=B.button`
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
`,Nf=B(Mf)`
  top: 50%;
  right: -8px;
  transform: translate(100%, -50%);
`,Pf=B(Mf)`
  left: 50%;
  bottom: -8px;
  transform: translate(-50%, 100%);
`,Ff=B.div`
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
`,If=B.button`
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
`;function Lf(e){let t=e.settings.writingMode===`vertical`,n=Li[e.settings.textScale],r=e.host??document.body,i=document.createElement(`div`);i.setAttribute(`aria-hidden`,`true`),i.style.cssText=[`position:absolute`,`top:0`,`left:-99999px`,`visibility:hidden`,`pointer-events:none`,`contain:strict`].join(`;`),r.appendChild(i);let a=()=>{i.isConnected||r.appendChild(i)},o=document.createElement(`div`);o.className=`ds-rich`,i.appendChild(o);let s=e=>t?e.width:e.height;function c(e,r,i){a();let s=Xi(e,{inlineSize:r,maxBlockSize:i,vertical:t}),c=Ri(e.role,n,e.fontSize,e.lineHeight,s.vertical);return o.style.fontSize=c.fontSize,o.style.lineHeight=c.lineHeight,o.style.fontWeight=c.fontWeight,o.style.fontFamily=c.fontFamily,o.style.textAlign=e.align??``,o.style.writingMode=s.vertical?`vertical-rl`:`horizontal-tb`,s.vertical?o.dataset.vertical=`true`:delete o.dataset.vertical,s.flipped&&!s.vertical?o.dataset.horizontal=`true`:delete o.dataset.horizontal,e.paragraph?o.dataset.pno=`一`:delete o.dataset.pno,o.style.maxWidth=``,o.style.maxHeight=``,o.style.overflow=``,s.flipped?Object.assign(o.style,s.style):t?(o.style.height=`${r}px`,o.style.width=`max-content`):(o.style.width=`${r}px`,o.style.height=`auto`),o.innerHTML=ia(e.spans)||`&#8203;`,o}return{blockSize(e,r,i){if(e.type===`text`){let t=c(e,r,i);return s(t.getBoundingClientRect())}a();let l=Ni(e,{inlineSize:r,maxBlockSize:i,vertical:t});if(!l)return 0;if(e.type===`table`&&!t){o.style.width=`${r}px`,o.style.height=`auto`,o.replaceChildren(gf(e,l.inlineSize,n));let t=o.firstElementChild,a=t?t.getBoundingClientRect().height:l.blockSize;return Math.min(a,i)}let u=e.type===`image`&&(e.hasCaption??e.caption.trim().length>0)?e.caption||`圖說`:e.type===`pdf`?e.title:``;if(u){let t=c({...e,type:`text`,role:`caption`,spans:[{text:u}],blockSize:void 0},r,i),n=s(t.getBoundingClientRect());return l.blockSize+yi.attached+n}return l.blockSize},textLineSizes(e,t){let n=c(e,t,1/0);if(!n.firstChild)return[];let r=document.createRange();r.selectNodeContents(n);let i=Array.from(r.getClientRects()).filter(e=>e.width>0&&e.height>0);return r.detach?.(),i.length===0?[s(n.getBoundingClientRect())]:i.map(s)},dispose(){i.remove()}}}function Rf(e){if(e.type===`text`){let t=e;return`${t.role} ${t.fontSize??``} ${t.lineHeight??``} ${t.writingMode??``} ${t.blockSize??``} ${t.paragraph?`p`:``} ${ia(t.spans)}`}let t=`${e.widthPct??``}/${e.blockSize??``}`;switch(e.type){case`image`:let n=e.crop?`${e.crop.x},${e.crop.y},${e.crop.w},${e.crop.h}`:``;return`${e.assetId} ${e.aspectRatio} ${n} ${t} ${e.hasCaption??``} ${e.caption}`;case`table`:return`${e.rows}x${e.cols} ${t} ${e.hasHeader} ${e.preset??``} ${e.borderWidth??``} ${(e.colWidths??[]).join(`,`)}/${(e.rowHeights??[]).join(`,`)} ${JSON.stringify(e.cells)}`;case`question`:return`${e.stem.map(e=>e.text).join(``)} ${e.options.length}`;case`pdf`:return`${e.id} ${t} ${e.title}`;case`video`:return`${e.id} ${t}`;case`web`:return`${e.id} ${e.presentation} ${e.chosen!==!1} ${t}`;case`shape`:return`${e.id} ${e.shape} ${t}`;default:return`${e.id} ${t}`}}var zf=4e3;function Bf(e){let t=new Map,n=new Map,r={hits:0,misses:0},i=e=>{if(e.size<=zf)return;let t=e.size-zf,n=0;for(let r of e.keys())if(e.delete(r),++n>=t)break};return{stats:r,blockSize(n,a,o){let s=`${Rf(n)}|${a}|${o}`,c=t.get(s);if(c!==void 0)return r.hits+=1,c;r.misses+=1;let l=e.blockSize(n,a,o);return t.set(s,l),i(t),l},textLineSizes(t,a){let o=`${Rf(t)}|${a}`,s=n.get(o);if(s!==void 0)return r.hits+=1,s;r.misses+=1;let c=e.textLineSizes(t,a);return n.set(o,c),i(n),c},clear(){t.clear(),n.clear(),r.hits=0,r.misses=0},size(){return t.size+n.size}}}function Vf(e,t,n){let r=e.writingMode===`vertical`;return{contentInlineSize:r?t.height:t.width,contentBlockSize:r?t.width:t.height,columnGap:n,...e.layout===`flow`?{layout:`flow`,vertical:r}:{}}}var Hf=(e,t)=>{let n=t.columnGap*(e.columns.length-1),r=t.contentInlineSize-n;return e.columns.map(e=>r*e.widthPct/100)};function Uf(e,t,n){let r=Hf(e,t);return Math.max(0,...e.columns.map((e,i)=>e.blocks.reduce((e,a)=>e+n.blockSize(a,r[i],t.contentBlockSize),0)))}function Wf(e){if(e.columns.length!==1)return null;let t=e.columns[0].blocks;if(t.length!==1)return null;let n=t[0];return n.type!==`text`||!mi(n.type)||n.writingMode?null:n}function Gf(e,t,n,r,i){let a=Hf(e,r)[0],o=i.textLineSizes(t,a);if(o.length<2)return null;let s=0,c=0;for(let e of o){if(s+e>n)break;s+=e,c+=1}if(c<1||c>=o.length)return null;let l=c/o.length,u=or(t.spans),d=Math.max(1,Math.round(u*l)),f={...t,spans:mr(t.spans,0,d)},p={...t,spans:mr(t.spans,d,u)};return{head:{...e,columns:[{...e.columns[0],blocks:[f]}]},headBlockSize:s,tail:{...e,breakBefore:!1,columns:[{...e.columns[0],blocks:[p]}]},cut:d}}function Kf(e,t,n){let r=[],i=[],a=0,o=`first`,s=e=>{r.push({index:r.length,items:i,startedBy:o,usedBlockSize:a}),i=[],a=0,o=e};if(t.layout===`flow`&&t.vertical){for(let r of e){r.breakBefore&&i.length>0&&s(`manual`);let e=i.length>0?i[i.length-1].row:null,o=i.length===0?0:Ti(e,r),c=Uf(r,t,n);i.push({row:r,gapBefore:o,blockSize:c,continuedFromPrev:!1,continuesOnNext:!1}),a+=o+c}return s(`auto`),r}let c=e.map(e=>({row:e,continued:!1,offset:0})),l=(e,t,n)=>{if(t===0&&!n)return;let r=Wf(e);if(r)return{start:t,end:t+or(r.spans)}};for(;c.length>0;){let{row:e,continued:r,offset:o}=c.shift();e.breakBefore&&i.length>0&&s(`manual`);let u=i.length>0?i[i.length-1].row:null,d=i.length===0?0:Ti(u,e),f=Uf(e,t,n),p=t.contentBlockSize-a-d;if(f<=p){i.push({row:e,gapBefore:d,blockSize:f,continuedFromPrev:r,continuesOnNext:!1,textSlice:l(e,o,!1)}),a+=d+f;continue}let m=Wf(e);if(m&&p>0){let l=Gf(e,m,p,t,n);if(l){i.push({row:l.head,gapBefore:d,blockSize:l.headBlockSize,continuedFromPrev:r,continuesOnNext:!0,textSlice:{start:o,end:o+l.cut}}),a+=d+l.headBlockSize,s(`auto`),c.unshift({row:l.tail,continued:!0,offset:o+l.cut});continue}}if(i.length>0){s(`auto`),c.unshift({row:e,continued:r,offset:o});continue}i.push({row:e,gapBefore:0,blockSize:f,continuedFromPrev:r,continuesOnNext:!1,textSlice:l(e,o,!1)}),a+=f}if(s(`auto`),t.layout===`flow`&&!t.vertical){let e=[];for(let t of r)if(e.length===0||t.startedBy===`manual`)e.push({index:e.length,items:[...t.items],startedBy:e.length===0?`first`:`manual`,usedBlockSize:t.usedBlockSize,panels:[t.items]});else{let n=e[e.length-1];n.items.push(...t.items),n.usedBlockSize+=t.usedBlockSize,n.panels.push(t.items)}return e}return r}function qf(e){let{writingMode:t,textScale:n,aspectRatio:r,layout:i}=e.settings,[a,o]=(0,R.useState)(()=>!document.fonts||document.fonts.status===`loaded`);(0,R.useEffect)(()=>{if(a||!document.fonts)return;let e=!0;return document.fonts.ready.then(()=>e&&o(!0)),()=>{e=!1}},[a]);let s=(0,R.useMemo)(()=>{let e=Lf({settings:{writingMode:t,textScale:n}});return{cached:Bf(e),dispose:e.dispose}},[t,n,a]),c=(0,R.useRef)(s);return(0,R.useEffect)(()=>{c.current!==s&&(c.current.dispose(),c.current=s)},[s]),{pages:(0,R.useMemo)(()=>{let n=di({aspectRatio:r}),a=Vf({writingMode:t,layout:i},n,48);return Kf(e.rows,a,s.cached)},[e.rows,r,t,i,s]),stats:s.cached.stats}}var Jf=[`setMeta`,`setText`,`setSpans`,`setTitle`,`setColumnWidths`,`resizeBlock`],Yf=(e,t)=>e.find(e=>e.id===t)??null,Xf=e=>Math.max(10,Math.min(100,e));function Zf(e){let t=e.reduce((e,t)=>e+t.widthPct,0)||1;return e.map(e=>({...e,widthPct:e.widthPct/t*100}))}function Qf(e,t,n){let r=!1,i=e.rows.map(e=>({...e,columns:e.columns.map(e=>({...e,blocks:e.blocks.map(e=>{if(e.id!==t)return e;let i=n(e);return i===e?e:(r=!0,i)})}))}));return r?{...e,rows:i}:e}function $f(e,t){let n=e.find(e=>e.id===t)??null;return{rest:e.filter(e=>e.id!==t),taken:n}}function ep(e,t,n){if(n.mode===`row`){let r=Math.max(0,Math.min(n.index,e.length)),i=e.slice();return i.splice(r,0,{...t,columns:Zf(t.columns)}),i}return e.map(e=>{if(e.id!==n.rowId)return e;if(t.columns.length>1){let r=n.side===`left`?[...t.columns,...e.columns]:[...e.columns,...t.columns];return{...e,columns:Zf(r.map(e=>({...e,widthPct:100/r.length})))}}let r={id:V(`col`),widthPct:100/(e.columns.length+1),blocks:t.columns.flatMap(e=>e.blocks)};if(e.columns.length===1&&n.keepPct!==void 0){let t=Math.max(10,Math.min(90,n.keepPct)),i=n.fitPct,a=e.columns[0],o={...a,widthPct:t,blocks:i===void 0?a.blocks:a.blocks.map(e=>e.type===`text`?e:{...e,widthPct:Xf(i)})},s={...r,widthPct:100-t};return{...e,columns:Zf(n.side===`left`?[s,o]:[o,s])}}let i=n.side===`left`?[r,...e.columns]:[...e.columns,r],a=i.map(e=>({...e,widthPct:100/i.length}));return{...e,columns:Zf(a)}})}function tp(e){return e.map(e=>{let t=e.columns.filter(e=>e.blocks.length>0);return t.length===e.columns.length?e:{...e,columns:Zf(t)}}).filter(e=>e.columns.length>0)}function np(e,t){switch(t.type){case`setTitle`:return{...e,title:t.title};case`setSettings`:return{...e,settings:{...e.settings,...t.patch}};case`setMeta`:return{...e,meta:{...e.meta,...t.patch}};case`insertRow`:{let n=Math.max(0,Math.min(t.index,e.rows.length)),r=e.rows.slice();return r.splice(n,0,{id:V(`row`),breakBefore:!1,columns:[{id:V(`col`),widthPct:100,blocks:t.blocks}]}),{...e,rows:r}}case`insertRows`:{if(t.rows.length===0)return e;let n=Math.max(0,Math.min(t.index,e.rows.length)),r=e.rows.slice();return r.splice(n,0,...t.rows.map(e=>({id:V(`row`),breakBefore:!1,columns:[{id:V(`col`),widthPct:100,blocks:e}]}))),{...e,rows:r}}case`deleteRow`:{let n=e.rows.filter(e=>e.id!==t.rowId);return n.length===e.rows.length?e:{...e,rows:n}}case`deleteRows`:{let n=new Set(t.rowIds),r=e.rows.filter(e=>!n.has(e.id));return r.length===e.rows.length?e:{...e,rows:r.length>0?r:[_r([vr(``,`lessonTitle`)])]}}case`moveRows`:{let n=new Set(t.rowIds),r=e.rows.filter(e=>n.has(e.id));if(r.length===0||t.beforeRowId!==null&&(n.has(t.beforeRowId)||!e.rows.some(e=>e.id===t.beforeRowId)))return e;let i=e.rows.filter(e=>!n.has(e.id)),a=t.beforeRowId===null?i.length:i.findIndex(e=>e.id===t.beforeRowId),o=[...i.slice(0,a),...r,...i.slice(a)];return o.every((t,n)=>t===e.rows[n])?e:{...e,rows:o}}case`deleteBlock`:{let n=!1,r=e.rows.map(e=>({...e,columns:e.columns.map(e=>{let r=e.blocks.filter(e=>e.id!==t.blockId);return r.length===e.blocks.length?e:(n=!0,{...e,blocks:r})})}));return n?{...e,rows:tp(r)}:e}case`moveColumn`:{let n=e.rows.find(e=>e.id===t.rowId);if(!n||n.columns.length<2)return e;let r=n.columns.find(e=>e.id===t.columnId);if(!r)return e;let i={...n,columns:Zf(n.columns.filter(e=>e.id!==r.id))},a=e.rows.map(e=>e.id===n.id?i:e),o={id:V(`row`),breakBefore:!1,columns:[r]};return{...e,rows:tp(ep(a,o,t.target))}}case`moveRow`:{let n=e.rows.findIndex(e=>e.id===t.rowId);if(n<0)return e;let{rest:r,taken:i}=$f(e.rows,t.rowId);if(!i)return e;let a=tp(ep(r,i,t.target.mode===`row`&&t.target.index>n?{...t.target,index:t.target.index-1}:t.target));return a.length===e.rows.length&&a.every((t,n)=>t.id===e.rows[n].id&&t.columns.length===e.rows[n].columns.length)?e:{...e,rows:a}}case`setColumnWidths`:return{...e,rows:e.rows.map(e=>e.id===t.rowId&&t.widths.length===e.columns.length?{...e,columns:Zf(e.columns.map((e,n)=>({...e,widthPct:t.widths[n]})))}:e)};case`setBreakBefore`:{let n=e.rows.find(e=>e.id===t.rowId);return!n||n.breakBefore===t.value?e:{...e,rows:e.rows.map(e=>e.id===t.rowId?{...e,breakBefore:t.value}:e)}}case`setPageBackground`:{let n=e.rows.find(e=>e.id===t.rowId);return!n||(n.pageBackground?.color??null)===(t.background?.color??null)&&(n.pageBackground?.assetId??null)===(t.background?.assetId??null)?e:{...e,rows:e.rows.map(e=>{if(e.id!==t.rowId)return e;if(!t.background){let{pageBackground:t,...n}=e;return n}return{...e,pageBackground:t.background}})}}case`resizeBlock`:return Qf(e,t.blockId,e=>{if(e.type===`text`)return e;let n=t.widthPct===void 0?void 0:Xf(t.widthPct),r=t.blockSize===void 0?void 0:Math.max(24,t.blockSize);if(e.widthPct===n&&e.blockSize===r)return e;let{widthPct:i,blockSize:a,...o}=e;return{...o,...n===void 0?{}:{widthPct:n},...r===void 0?{}:{blockSize:r}}});case`importDoc`:return li(e,t.result);case`setText`:return Qf(e,t.blockId,e=>e.type===`text`?{...e,spans:[{text:t.text}]}:e);case`setSpans`:return Qf(e,t.blockId,e=>e.type===`text`?{...e,spans:pr(t.spans)}:e);case`toggleMark`:return Qf(e,t.blockId,e=>{if(e.type!==`text`||t.start>=t.end)return e;let n=mr(e.spans,t.start,t.end).map(e=>({...e,[t.mark]:t.on?!0:void 0}));return{...e,spans:hr(e.spans,t.start,t.end,n)}});case`setTextRole`:return Qf(e,t.blockId,e=>e.type===`text`?{...e,role:t.role,fontSize:void 0}:e);case`patchBlock`:return Qf(e,t.blockId,e=>e.type===t.blockType?{...e,...t.patch}:e);case`addPopup`:return Qf(e,t.blockId,e=>{if(!pi(e.type))return e;if(t.forWords)return{...e,popups:[...e.popups,t.item]};let n=Rr(e);return n.length===0||n[0].kind===t.item.kind&&t.item.kind!==`rich`?{...e,popups:[...e.popups,t.item]}:e});case`updatePopup`:return Qf(e,t.blockId,e=>({...e,popups:e.popups.map(e=>e.id===t.item.id?t.item:e)}));case`removePopup`:return Qf(e,t.blockId,e=>{let n=e.popups.find(e=>e.id===t.popupId),r={...e,popups:e.popups.filter(e=>e.id!==t.popupId)},i=n?Fr(n):t.popupId;return r.type===`text`&&!r.popups.some(e=>Fr(e)===i)&&r.spans.some(e=>e.popupId===i)&&(r.spans=pr(r.spans.map(e=>e.popupId===i?{...e,popupId:void 0}:e))),r});case`reorderPopups`:return Qf(e,t.blockId,e=>{let n=e.popups.slice(),[r]=n.splice(t.from,1);if(!r)return e;let i=Math.max(0,Math.min(t.to,n.length));return i===t.from?e:(n.splice(i,0,r),{...e,popups:n})});default:return t}}function rp(e){return{past:[],present:e,future:[],lastMark:null,lastAt:0}}var ip=e=>{if(!Jf.includes(e.type))return null;let t=`blockId`in e?e.blockId:`rowId`in e?e.rowId:`doc`;return`${e.type}:${t}`};function ap(e,t,n=Date.now()){let r=np(e.present,t);if(r===e.present)return e;let i=ip(t);return{past:i!==null&&i===e.lastMark&&n-e.lastAt<800?e.past:[...e.past,e.present].slice(-200),present:r,future:[],lastMark:i,lastAt:n}}var op=e=>e.past.length>0,sp=e=>e.future.length>0;function cp(e){if(!op(e))return e;let t=e.past.slice();return{past:t,present:t.pop(),future:[e.present,...e.future],lastMark:null,lastAt:0}}function lp(e){if(!sp(e))return e;let[t,...n]=e.future;return{past:[...e.past,e.present],present:t,future:n,lastMark:null,lastAt:0}}function up(e){let[t,n]=(0,R.useState)(()=>rp(e)),r=(0,R.useCallback)(e=>{n(t=>ap(t,e))},[]),i=(0,R.useCallback)((e,t,r)=>{n(n=>{let i=Sr(n.present,e);if(!i||i.block.type!==`text`)return n;let a=i.block.spans;return ap(n,{type:`setSpans`,blockId:e,spans:r?hr(a,r.start,r.end,t):t})})},[]),a=(0,R.useCallback)((e,t,n,i,a)=>{let o=a?.start??0;r({type:`toggleMark`,blockId:e,start:t.start+o,end:t.end+o,mark:n,on:i})},[r]),o=(0,R.useCallback)(e=>n(rp(e)),[]);return(0,R.useMemo)(()=>({doc:t.present,dispatch:r,editSpans:i,toggleMark:a,replaceDoc:o,undo:()=>n(cp),redo:()=>n(lp),canUndo:op(t),canRedo:sp(t)}),[t,r,i,a,o])}var dp=class extends R.Component{state={error:null};static getDerivedStateFromError(e){return{error:e}}componentDidUpdate(e){e.children!==this.props.children&&this.state.error&&this.setState({error:null})}render(){return this.state.error?(0,K.jsxs)(fp,{role:`alert`,children:[(0,K.jsxs)(`strong`,{children:[this.props.label??`這個元件`,`暫時畫不出來`]}),(0,K.jsx)(`span`,{children:this.state.error.message})]}):this.props.children}},fp=B.div`
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
`;function pp({open:e,onOpen:t,vertical:n,where:r=`start`,hinted:i=!1}){return(0,K.jsx)(mp,{$open:e||i,$vertical:n,$where:r,children:(0,K.jsxs)(hp,{type:`button`,onClick:t,"aria-label":`新增元件`,$vertical:n,children:[(0,K.jsx)(gp,{$vertical:n}),(0,K.jsx)(_p,{"data-insert-pill":e?`open`:void 0,children:(0,K.jsx)(q,{name:`plus`,size:16})}),(0,K.jsx)(gp,{$vertical:n})]})})}var mp=B.div`
  position: absolute;
  z-index: 5;
  display: flex;
  align-items: center;
  /* 提示本身永遠正著看，不跟著課文轉 */
  writing-mode: horizontal-tb;

  ${e=>e.$vertical?z`
          top: 0;
          bottom: 0;
          width: 20px;
          /* 直排由右往左流：列的開頭在右邊。兩種都離內容 16px */
          ${e.$where===`start`?`right: -26px;`:`left: -26px;`}
        `:z`
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
`,hp=B.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapXs};
  inline-size: 100%;
  block-size: 100%;
  flex-direction: ${e=>e.$vertical?`column`:`row`};
`,gp=B.span`
  flex: 1;
  ${e=>e.$vertical?z`
          width: 0;
          border-left: ${e.theme.border.widthSelected} solid ${e.theme.border.hover};
        `:z`
          height: 0;
          border-top: ${e.theme.border.widthSelected} solid ${e.theme.border.hover};
        `}
`,_p=B.span`
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
`,vp=z`
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
`,yp=30,bp=12;function xp({onBack:e,onInsert:t}){let[n,r]=(0,R.useState)(od),[i,a]=(0,R.useState)(null),o=(e,t)=>Math.max(1,Math.min(t,Math.floor(e)||1)),s=()=>t(n);return(0,K.jsxs)(Sp,{children:[(0,K.jsxs)(Cp,{type:`button`,onClick:e,"aria-label":`返回`,children:[(0,K.jsx)(q,{name:`chevron-left`,size:16}),`表格`]}),(0,K.jsxs)(wp,{children:[(0,K.jsx)(Tp,{role:`grid`,"aria-label":`表格大小`,onPointerLeave:()=>a(null),children:Array.from({length:64},(e,t)=>{let o=Math.floor(t/8)+1,c=t%8+1,l=o<=n.rows&&c<=n.cols,u=i!==null&&o<=i.rows&&c<=i.cols;return(0,K.jsx)(Ep,{type:`button`,$selected:l,$preview:u,$dimming:i!==null&&l&&!u,"aria-label":`${c} 欄 × ${o} 列`,"aria-pressed":l,onPointerEnter:e=>{a({rows:o,cols:c}),e.buttons===1&&r({rows:o,cols:c})},onPointerDown:()=>r({rows:o,cols:c}),onDoubleClick:s},t)})}),(0,K.jsxs)(Dp,{children:[(0,K.jsxs)(Op,{children:[(0,K.jsx)(kp,{type:`number`,min:1,max:bp,value:n.cols,"aria-label":`欄數`,onChange:e=>r(t=>({...t,cols:o(Number(e.target.value),bp)}))}),(0,K.jsx)(Ap,{children:`欄`})]}),(0,K.jsxs)(Op,{children:[(0,K.jsx)(kp,{type:`number`,min:1,max:yp,value:n.rows,"aria-label":`列數`,onChange:e=>r(t=>({...t,rows:o(Number(e.target.value),yp)}))}),(0,K.jsx)(Ap,{children:`列`})]})]})]}),(0,K.jsx)(jp,{type:`button`,onClick:s,children:`插入表格`})]})}var Sp=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
`,Cp=B.button`
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
`,wp=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetSm};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.sunken};
`,Tp=B.div`
  display: grid;
  grid-template-columns: repeat(${8}, 1fr);
  gap: 4px;
  touch-action: none;
`,Ep=B.button`
  aspect-ratio: 1;
  padding: 0;
  border-radius: 6px;
  cursor: pointer;
  border: 1.5px
    ${e=>e.$preview&&!e.$selected?`dashed`:`solid`}
    ${e=>e.$selected&&!e.$dimming?e.theme.brand.accentOnLight:e.$preview||e.$dimming?e.theme.brand.primaryActive:e.theme.border.subtle};
  background: ${e=>e.$selected&&!e.$dimming?e.theme.brand.primary:e.$preview?e.theme.brand.primaryTintSubtle:e.$dimming?e.theme.brand.primaryTint:e.theme.surface.raised};
  transition: background 0.08s, border-color 0.08s;
`,Dp=B.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space.gapMd};
  align-items: center;
`,Op=B.label`
  display: flex;
  align-items: center;
  gap: 8px;
  min-inline-size: 0;
`,kp=B.input`
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
`,Ap=B.span`
  flex: none;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,jp=B.button`
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
`,Mp=[{key:`shape`,label:`矩形`,glyph:`rect`},{key:`shape-circle`,label:`圓形`,glyph:`circle`},{key:`shape-rounded`,label:`圓角矩形`,glyph:`rounded`},{key:`shape-callout`,label:`對話框`,glyph:`callout`},{key:`line`,label:`線段`,glyph:`line`}];function Np({glyph:e}){let t={fill:`currentColor`,stroke:`none`};return(0,K.jsxs)(`svg`,{width:20,height:20,viewBox:`0 0 24 24`,"aria-hidden":`true`,children:[e===`rect`&&(0,K.jsx)(`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`2`,...t}),e===`circle`&&(0,K.jsx)(`circle`,{cx:`12`,cy:`12`,r:`9`,...t}),e===`rounded`&&(0,K.jsx)(`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`6`,...t}),e===`callout`&&(0,K.jsx)(`path`,{d:`M5 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-1-1.7V5a2 2 0 0 1 2-2z`,...t}),e===`line`&&(0,K.jsx)(`path`,{d:`M3 12h18`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`})]})}var Pp=[{key:`text`,icon:`type`,label:fi.text.label},{key:`image`,icon:`image`,label:fi.image.label},{key:`video`,icon:`video`,label:fi.video.label},{key:`audio`,icon:`music`,label:fi.audio.label},{key:`shape`,icon:`shapes`,label:fi.shape.label},{key:`web`,icon:`globe`,label:fi.web.label},{key:`table`,icon:`table`,label:fi.table.label},{key:`pdf`,icon:`file-text`,label:fi.pdf.label},{key:`library`,icon:`library`,label:`媒體庫`}],Fp=252,Ip=12;function Lp(e,t,n){let r=(document.querySelector(`header`)?.getBoundingClientRect().bottom??0)+Ip,i=(e,t)=>Math.min(Math.max(e,t+Ip),window.innerWidth-t-Ip),a=(e,t)=>Math.min(Math.max(e,t+r),window.innerHeight-t-Ip);if(n){let n=a(e.top+e.height/2,t.height/2),r=e.left>t.width+24;return{top:n,left:r?e.left-Ip:e.right+Ip,transform:r?`translate(-100%, -50%)`:`translate(0, -50%)`}}let o=i(e.left+e.width/2,t.width/2);return e.bottom+t.height+Ip<window.innerHeight?{left:o,top:e.bottom+Ip,transform:`translate(-50%, 0)`}:e.top-Ip-t.height>=r?{left:o,top:e.top-Ip,transform:`translate(-50%, -100%)`}:{left:o,top:window.innerHeight-Ip,transform:`translate(-50%, -100%)`}}function Rp({onPick:e,onClose:t,anchorRef:n,vertical:r}){let i=(0,R.useRef)(null),[a,o]=(0,R.useState)(!1),[s,c]=(0,R.useState)(!1),[l,u]=(0,R.useState)({visibility:`hidden`,top:0,left:0});return(0,R.useLayoutEffect)(()=>{let e=()=>{let e=document.querySelector(`[data-insert-pill="open"]`)??n.current,t=i.current;e&&t&&u(Lp(e.getBoundingClientRect(),t.getBoundingClientRect(),r))};return e(),window.addEventListener(`scroll`,e,!0),window.addEventListener(`resize`,e),()=>{window.removeEventListener(`scroll`,e,!0),window.removeEventListener(`resize`,e)}},[n,r,s,a]),(0,G.createPortal)((0,K.jsx)(zp,{ref:i,role:`dialog`,"aria-label":`插入元件`,style:l,onKeyDown:e=>e.key===`Escape`&&t(),children:a?(0,K.jsx)(xp,{onBack:()=>o(!1),onInsert:t=>e(`table`,t)}):s?(0,K.jsx)(Bp,{children:Mp.map(t=>(0,K.jsxs)(Vp,{type:`button`,onClick:()=>e(t.key),children:[(0,K.jsx)(Np,{glyph:t.glyph}),(0,K.jsx)(`span`,{children:t.label})]},t.key))}):(0,K.jsx)(Bp,{children:Pp.map(t=>(0,K.jsxs)(Vp,{type:`button`,onClick:()=>t.key===`shape`?c(!0):e(t.key),children:[(0,K.jsx)(q,{name:t.icon,size:20}),(0,K.jsx)(`span`,{children:t.label})]},t.key))})}),document.body)}var zp=B.div`
  position: fixed;
  z-index: 900;
  inline-size: ${Fp}px;
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${e=>e.theme.surface.page};
  /* 跟其他選單、彈窗同一款：白底圓角、只靠陰影，不畫框 */
  border-radius: ${e=>e.theme.radius.panel};
  box-shadow: ${e=>e.theme.shadow.card};
  padding: ${e=>e.theme.space.gapSm};
  writing-mode: horizontal-tb;
`,Bp=B.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${e=>e.theme.space.gapXs};
`,Vp=B.button`
  ${vp}
`,Hp=[25,100/3,50,200/3,75,100];function Up(e,t=Hp){let n=e,r=3;for(let i of t){let t=Math.abs(e-i);t<r&&(r=t,n=i)}return n}function Wp(e){switch(e.type){case`image`:case`video`:return`aspect`;case`audio`:case`table`:return`inline`;case`web`:return e.presentation===`embed`?`free`:`inline`;case`shape`:case`line`:case`module`:case`pdf`:return`free`;default:return null}}var Gp=[`ne`,`nw`,`se`,`sw`];function Kp({mode:e,box:t,columnInline:n,vertical:r,onResize:i}){let a=(0,R.useRef)(null),o=r?t.blockSize:t.inlineSize,s=r?t.inlineSize:t.blockSize,c=!r,l=e===`inline`?c?[`e`,`w`,...Gp]:[`n`,`s`,...Gp]:[`n`,`s`,`e`,`w`,...Gp],u=t=>l=>{l.preventDefault(),l.stopPropagation();let u=a.current;if(!u)return;let d=u.getBoundingClientRect().width/(u.offsetWidth||1),f=l.clientX,p=l.clientY,m=o/s,h=a=>{let l=(a.clientX-f)/d,u=(a.clientY-p)/d,h=o,g=s;t.includes(`e`)&&(h=o+l),t.includes(`w`)&&(h=o-l),t.includes(`s`)&&(g=s+u),t.includes(`n`)&&(g=s-u);let _=Gp.includes(t),v=c?t===`n`||t===`s`:t===`e`||t===`w`;if(e===`aspect`)t===`n`||t===`s`?h=g*m:g=h/m;else if(_){let e=Math.max(.05,h/o);g=s*e}else e===`inline`&&(c?g=s:h=o);let y=r?g:h,b=r?h:g,x=Math.max(10,Math.min(100,y/n*100)),S=e===`free`&&v?x:Up(x);if((e===`free`||e===`inline`)&&_){let e=r?s:o,t=r?o:s,i=S/100*n;b=t*Math.max(.05,i/(e||1))}i(e===`free`||e===`inline`&&_?{widthPct:S,blockSize:Math.max(24,Math.round(b))}:{widthPct:S})},g=()=>{window.removeEventListener(`pointermove`,h),window.removeEventListener(`pointerup`,g),window.removeEventListener(`pointercancel`,g)};window.addEventListener(`pointermove`,h),window.addEventListener(`pointerup`,g),window.addEventListener(`pointercancel`,g)};return(0,K.jsx)(qp,{ref:a,style:{width:o,height:s},"data-ui":!0,children:(0,K.jsx)(Jp,{children:l.map(e=>(0,K.jsx)(em,{$h:e,onPointerDown:u(e),"aria-label":`調整尺寸`},e))})})}var qp=B.div`
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  pointer-events: none;
  z-index: 6;
`,Jp=B.div`
  position: relative;
  inline-size: 100%;
  block-size: 100%;
  writing-mode: horizontal-tb;
  outline: ${e=>e.theme.border.widthSelected} solid ${e=>e.theme.tool.border};
  outline-offset: -1px;
`,Yp=14,Xp=24,Zp=8,Qp=e=>Gp.includes(e)?z`width: ${Yp}px; height: ${Yp}px;`:e===`n`||e===`s`?z`width: ${Xp}px; height: ${Zp}px;`:z`width: ${Zp}px; height: ${Xp}px;`,$p=e=>z`
    ${e.includes(`n`)?`top: 0`:e.includes(`s`)?`bottom: 0`:`top: 50%`};
    ${e.includes(`w`)?`left: 0`:e.includes(`e`)?`right: 0`:`left: 50%`};
    transform: translate(${e.includes(`w`)?`-50%`:e.includes(`e`)?`50%`:`-50%`}, ${e.includes(`n`)?`-50%`:e.includes(`s`)?`50%`:`-50%`});
    cursor: ${e===`n`||e===`s`?`ns-resize`:e===`e`||e===`w`?`ew-resize`:e===`ne`||e===`sw`?`nesw-resize`:`nwse-resize`};
  `,em=B.div`
  position: absolute;
  pointer-events: auto;
  touch-action: none;
  box-sizing: border-box;
  ${e=>Qp(e.$h)}
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.18);
  ${e=>$p(e.$h)}

  &::after {
    content: '';
    position: absolute;
    inset: -8px;
  }
  &:hover {
    border-color: ${e=>e.theme.border.hover};
  }
`;function tm({size:e,max:t,vertical:n,onResize:r}){return(0,K.jsx)(nm,{$vertical:n,onPointerDown:i=>{i.preventDefault(),i.stopPropagation();let a=i.currentTarget.parentElement,o=a?a.getBoundingClientRect().width/(a.offsetWidth||1):1,s=i.clientX,c=i.clientY,l=i=>{let a=n?-(i.clientX-s)/o:(i.clientY-c)/o;r(Math.round(Math.max(24,Math.min(t,e+a))))},u=()=>{window.removeEventListener(`pointermove`,l),window.removeEventListener(`pointerup`,u),window.removeEventListener(`pointercancel`,u)};window.addEventListener(`pointermove`,l),window.addEventListener(`pointerup`,u),window.addEventListener(`pointercancel`,u)},"aria-label":`拖曳調整框的大小`,"data-ui":!0,children:(0,K.jsx)(rm,{$vertical:n})})}var nm=B.div`
  position: absolute;
  z-index: 6;
  touch-action: none;
  ${e=>e.$vertical?z`top: 0; bottom: 0; left: -10px; width: 12px; cursor: ew-resize;`:z`left: 0; right: 0; bottom: -10px; height: 12px; cursor: ns-resize;`}
`,rm=B.span`
  position: absolute;
  box-sizing: border-box;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.18);
  writing-mode: horizontal-tb;
  ${e=>e.$vertical?z`width: ${Zp}px; height: ${Xp}px; top: 50%; left: 2px; transform: translateY(-50%);`:z`width: ${Xp}px; height: ${Zp}px; left: 50%; top: 2px; transform: translateX(-50%);`}
`;function im({count:e,onClick:t,vertical:n=!1,side:r=`end`}){return t?(0,K.jsxs)(cm,{$vertical:n,$side:r,onPointerDown:e=>e.stopPropagation(),onClick:e=>{e.stopPropagation(),t(e.currentTarget)},"aria-label":`補充內容 ${e} 項`,title:`補充內容 ${e} 項`,children:[(0,K.jsx)(q,{name:`blocks`,size:16}),e>1&&(0,K.jsx)(lm,{children:e})]}):(0,K.jsxs)(cm,{as:`span`,"aria-hidden":!0,$vertical:n,$side:r,children:[(0,K.jsx)(q,{name:`blocks`,size:16}),e>1&&(0,K.jsx)(lm,{children:e})]})}var am=`calc(100% + 8px)`,om=`36px`,sm=(e,t)=>e?t===`end`?`top: ${am}; right: 0;`:`bottom: ${am}; right: ${om};`:t===`end`?`left: ${am}; top: 0;`:`right: ${am}; top: ${om};`,cm=B.button`
  position: absolute;
  z-index: 3;
  ${e=>sm(e.$vertical,e.$side)}

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
`,lm=B.span`
  font-size: var(--ds-typography-label-size);
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
`;function um(e,t){let n=new Set;for(let r of e.split(/[,，、\s]+/)){let e=r.trim();if(!e)continue;let i=e.match(/^(\d+)\s*[-–—~～－]\s*(\d+)$/);if(i){let e=Number(i[1]),r=Number(i[2]);e>r&&([e,r]=[r,e]);for(let i=Math.max(1,e);i<=Math.min(t,r);i++)n.add(i)}else if(/^\d+$/.test(e)){let r=Number(e);r>=1&&r<=t&&n.add(r)}}return[...n].sort((e,t)=>e-t)}function dm(e){let t=[...new Set(e)].sort((e,t)=>e-t),n=[],r=0;for(;r<t.length;){let e=r;for(;e+1<t.length&&t[e+1]===t[e]+1;)e++;if(e-r>=2)n.push(`${t[r]}-${t[e]}`);else for(let i=r;i<=e;i++)n.push(String(t[i]));r=e+1}return n.join(`, `)}var fm=`modulepreload`,pm=function(e){return`/textbook-editor/`+e},mm={},hm=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=pm(t,n),t=s(t),t in mm)return;mm[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:fm,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},gm=null;function _m(){return gm||=Promise.all([hm(()=>import(`./pdf-DnchY4lm.js`),[]),hm(()=>import(`./pdf.worker.min-BiZbdNJm.js`),[])]).then(([e,t])=>(e.GlobalWorkerOptions.workerSrc=t.default,e)),gm}var vm=new Map;function ym(e){let t=vm.get(e);return t||(t=_m().then(t=>t.getDocument(e).promise),vm.set(e,t)),t}async function bm(e,t,n,r=`image/png`){let i=await e.getPage(t),a=i.getViewport({scale:1}),o=i.getViewport({scale:n/a.width}),s=document.createElement(`canvas`);s.width=Math.round(o.width),s.height=Math.round(o.height);let c=s.getContext(`2d`);return c.fillStyle=`#fff`,c.fillRect(0,0,s.width,s.height),await i.render({canvasContext:c,viewport:o}).promise,{blob:await new Promise((e,t)=>s.toBlob(n=>n?e(n):t(Error(`畫不出這一頁`)),r,.9)),aspectRatio:a.width/a.height}}var xm=new Map,Sm=Promise.resolve(),Cm=()=>new Promise(e=>requestAnimationFrame(()=>e()));function wm(e,t,n=200){let r=`${e}#${t}@${n}`,i=xm.get(r);if(!i){let a=Sm.then(async()=>{let{blob:r}=await bm(await ym(e),t,n,`image/jpeg`);return await Cm(),URL.createObjectURL(r)});Sm=a.catch(()=>{}),i=a,xm.set(r,i)}return i}var Tm=1800;function Em({asset:e,onBack:t,onClose:n,onImport:r,onEmbed:i}){let a=$a(e.assetId),[o,s]=(0,R.useState)(0),[c,l]=(0,R.useState)([]),[u,d]=(0,R.useState)(``),[f,p]=(0,R.useState)(null);(0,R.useEffect)(()=>{if(!a)return;let e=!0;return ym(a).then(t=>e&&s(t.numPages)).catch(()=>e&&Es(`讀不出這份 PDF`)),()=>{e=!1}},[a]);let m=(0,R.useMemo)(()=>Array.from({length:o},(e,t)=>t+1),[o]),h=o>0&&c.length===o,g=e=>{l(e),d(dm(e))},_=e=>g(c.includes(e)?c.filter(t=>t!==e):[...c,e].sort((e,t)=>e-t));return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(Om,{children:[(0,K.jsx)(Am,{onClick:t,"aria-label":`回到 PDF 清單`,children:(0,K.jsx)(q,{name:`chevron-left`,size:24,label:`返回`})}),(0,K.jsx)(km,{title:e.name,children:e.name.replace(/\.pdf$/i,``)}),(0,K.jsx)(Am,{onClick:n,"aria-label":`關閉`,children:(0,K.jsx)(q,{name:`x`,size:24,label:`關閉`})})]}),(0,K.jsxs)(jm,{children:[(0,K.jsxs)(Mm,{children:[(0,K.jsx)(Nm,{children:`選取範圍`}),(0,K.jsx)(Pm,{children:o>0?`共 ${o} 頁`:`讀取中…`})]}),(0,K.jsxs)(Fm,{children:[(0,K.jsxs)(Im,{children:[(0,K.jsx)(Lm,{value:u,placeholder:`1, 3, 5-7`,"aria-label":`要匯入的頁碼`,onChange:e=>{d(e.target.value),l(um(e.target.value,o))},onBlur:()=>d(dm(c))}),(0,K.jsx)(Rm,{children:`頁`})]}),(0,K.jsxs)(zm,{children:[(0,K.jsx)(`input`,{type:`checkbox`,checked:h,disabled:o===0,onChange:()=>g(h?[]:m)}),`全選`]}),(0,K.jsx)(Bm,{children:m.map(e=>(0,K.jsxs)(Vm,{type:`button`,$on:c.includes(e),"aria-pressed":c.includes(e),"aria-label":`第 ${e} 頁`,onClick:()=>_(e),children:[(0,K.jsx)(Dm,{url:a,page:e}),(0,K.jsx)(Um,{children:e})]},e))})]})]}),(0,K.jsxs)(Wm,{children:[(0,K.jsx)(Km,{type:`button`,onClick:i,disabled:!!f,title:`不拆頁，整份放進頁面，用翻頁膠囊翻`,children:`嵌入整份`}),(0,K.jsx)(Gm,{type:`button`,onClick:async()=>{if(!(!a||c.length===0||f))try{let e=await ym(a),t=[];for(let[n,r]of c.entries()){p(`匯入中 ${n+1} / ${c.length}`);let{blob:i,aspectRatio:a}=await bm(e,r,Tm);t.push({assetId:ro(i),aspectRatio:a,page:r})}r(t)}catch{Es(`有一頁畫不出來，請再試一次`)}finally{p(null)}},disabled:c.length===0||!!f,children:f??`匯入圖片`})]})]})}function Dm({url:e,page:t}){let[n,r]=(0,R.useState)(null);return(0,R.useEffect)(()=>{let n=!0;return wm(e,t).then(e=>n&&r(e)).catch(()=>{}),()=>{n=!1}},[e,t]),(0,K.jsx)(Hm,{children:n&&(0,K.jsx)(`img`,{src:n,alt:``})})}var Om=B(uc)`
  padding-inline-start: ${e=>e.theme.space.insetXs};
`,km=B(dc)`
  overflow: hidden;
  text-overflow: ellipsis;
`,Am=fc,jm=B(pc)`
  gap: ${e=>e.theme.space.gapSm};
`,Mm=B.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`,Nm=B.span`
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  color: ${e=>e.theme.text.secondary};
`,Pm=B.span`
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.tertiary};
  font-variant-numeric: tabular-nums;
`,Fm=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetXs};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.sunken};
`,Im=B.label`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
`,Lm=B.input`
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
`,Rm=B.span`
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.secondary};
`,zm=B.label`
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
`,Bm=B.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space.gapSm};
`,Vm=B.button`
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
`,Hm=B.span`
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
`,Um=B.span`
  font-size: var(--ds-typography-caption-size);
  line-height: 16px;
  color: ${e=>e.theme.text.secondary};
  font-variant-numeric: tabular-nums;
  text-align: center;
`,Wm=B.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.gapMd} 20px 20px;
  flex-shrink: 0;
`,Gm=B.button`
  ${bs}
  flex: 1 1 0;
  min-inline-size: 0;
  box-sizing: border-box;
`,Km=B.button`
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
`,qm={image:{label:`圖片`,accept:`image/jpeg,image/png,image/gif`,formats:`.jpg .png .gif`,limitMb:5},video:{label:`影片`,accept:`video/mp4,video/webm`,formats:`.mp4 .webm`,limitMb:100},audio:{label:`聲音`,accept:`audio/mpeg,audio/wav,audio/x-wav`,formats:`.mp3 .wav`,limitMb:20},pdf:{label:`PDF`,accept:`application/pdf`,formats:`.pdf`,limitMb:50}},Jm=`支援 ${qm.image.formats} 圖片、${qm.video.formats} 影片、${qm.audio.formats} 聲音與 PDF`;async function Ym(e){let t=Za(e);if(t===`file`||t===`web`)return{error:`不支援這種檔案。${Jm}`};let n=qm[t];if(t!==`pdf`&&!n.accept.split(`,`).includes(e.type))return{error:`不支援這種格式，${n.label}支援 ${n.formats}`};if(e.size>n.limitMb*1024*1024)return{error:`${n.label}請在 ${n.limitMb}MB 以內`};try{let n=Qa(t===`image`?(await so(e)).assetId:eo(e));return n?{asset:n}:{error:`讀不到這個檔案`}}catch{return{error:`讀不到這個檔案`}}}var Xm=[{kind:`image`,label:`圖片`},{kind:`video`,label:`影片`},{kind:`audio`,label:`聲音`},{kind:`web`,label:`網頁`},{kind:`pdf`,label:`PDF`}],Zm=null,Qm=new Set;function $m(e){Zm=e,Qm.forEach(e=>e())}function eh({onChoose:e,onGenerate:t,onImportPdf:n,onClose:r}){cc(!0,r);let[i,a]=(0,R.useState)(()=>{let e=Zm??`image`;return Zm=null,e}),[o,s]=(0,R.useState)(null);(0,R.useEffect)(()=>{let e=()=>{Zm&&=(a(Zm),s(null),null)};return Qm.add(e),()=>{Qm.delete(e)}},[]),(0,R.useSyncExternalStore)(Ya,Ka);let c=Ja(i),l=ch();(0,R.useEffect)(()=>{let e=e=>{e.key===`Escape`&&r()};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[r]);let u=l.stop;(0,R.useEffect)(()=>()=>u(),[u]);let d=t=>{u(),e(t)};return(0,G.createPortal)((0,K.jsx)(lh,{role:`dialog`,"aria-label":`媒體庫`,"data-ui":!0,onClick:e=>e.stopPropagation(),onPointerDown:e=>e.stopPropagation(),onPointerMove:e=>e.stopPropagation(),onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation()},children:o?(0,K.jsx)(Em,{asset:o,onBack:()=>s(null),onClose:r,onImport:e=>{n?.(o,e),s(null)},onEmbed:()=>{d(o),s(null)}}):(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(uh,{children:[(0,K.jsx)(dh,{children:`媒體庫`}),(0,K.jsx)(fh,{onClick:r,"aria-label":`關閉`,children:(0,K.jsx)(q,{name:`x`,size:24,label:`關閉`})})]}),(0,K.jsx)(mh,{role:`tablist`,"aria-label":`素材種類`,children:Xm.map(e=>(0,K.jsx)(hh,{type:`button`,role:`tab`,"aria-selected":e.kind===i,$on:e.kind===i,onClick:()=>a(e.kind),children:e.label},e.kind))}),(0,K.jsxs)(ph,{children:[i===`web`?(0,K.jsx)(ah,{placeholder:`貼上網址`,onAdd:e=>{let t=us(e);return t?(io(t),!0):(Es(`請貼完整的網址，要含 https://`),!1)}}):(0,K.jsx)(ih,{kind:i,onUploaded:e=>e.kind===`pdf`&&s(e)}),i===`video`&&(0,K.jsx)(ah,{placeholder:`貼上 YouTube 連結`,onAdd:e=>J(e)?!0:(Es(`認不出這個 YouTube 網址`),!1)}),i===`image`&&(0,K.jsx)(oh,{onGenerate:e=>{u(),Es(`原型還沒接上生成模型`),t?.(e)}}),c.length>0&&(()=>{let e=c.filter(e=>e.favorite),t=c.filter(e=>!e.favorite),n=i===`image`?`tile`:`row`,r=e=>{let t=e.map(e=>(0,K.jsx)(rh,{asset:e,layout:n,selected:!1,onActivate:()=>e.kind===`pdf`?s(e):d(e),preview:e.kind===`audio`?l:void 0},e.assetId));return n===`tile`?(0,K.jsx)(Th,{children:t}):(0,K.jsx)(Eh,{children:t})},a=i===`pdf`?`已上傳 PDF`:e.length>0?`全部`:null;return(0,K.jsxs)(K.Fragment,{children:[e.length>0&&(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(gh,{children:`收藏`}),r(e)]}),t.length>0&&(0,K.jsxs)(K.Fragment,{children:[a&&(0,K.jsx)(gh,{children:a}),r(t)]})]})})()]})]})}),document.body)}function th({asset:e}){if(e.kind===`image`)return(0,K.jsx)(Dh,{style:{backgroundImage:`url(${$a(e.assetId)})`}});if(e.kind===`video`){if(e.source===`youtube`){let t=lo(e.url??``);return(0,K.jsx)(Dh,{style:t?{backgroundImage:`url(https://i.ytimg.com/vi/${t}/mqdefault.jpg)`}:void 0,children:(0,K.jsx)(Oh,{children:(0,K.jsx)(So,{name:`play`,size:16})})})}let t=$a(e.assetId);return(0,K.jsx)(Dh,{children:t&&(0,K.jsx)(`video`,{src:`${t}#t=0.1`,preload:`metadata`,muted:!0,playsInline:!0})})}return e.kind===`pdf`?(0,K.jsx)(nh,{asset:e}):(0,K.jsx)(Dh,{$icon:!0,children:(0,K.jsx)(q,{name:e.kind===`audio`?`music`:e.kind===`web`?`globe`:`file-text`,size:24})})}function nh({asset:e}){let[t,n]=(0,R.useState)(null),r=$a(e.assetId);return(0,R.useEffect)(()=>{if(!r)return;let e=!0;return wm(r,1,160).then(t=>e&&n(t)).catch(()=>{}),()=>{e=!1}},[r]),(0,K.jsx)(Dh,{$icon:!0,children:t?(0,K.jsx)(`img`,{src:t,alt:``}):(0,K.jsx)(q,{name:`file-text`,size:24})})}function rh({asset:e,layout:t,selected:n,onActivate:r,preview:i}){let[a,o]=(0,R.useState)(!1),s=(0,R.useRef)(null);(0,R.useEffect)(()=>{if(!a)return;let e=e=>{s.current?.contains(e.target)||o(!1)};return window.addEventListener(`pointerdown`,e,!0),()=>window.removeEventListener(`pointerdown`,e,!0)},[a]);let c=e.kind===`pdf`?e.name.replace(/\.pdf$/i,``):e.name,l=!!i&&i.current===e.assetId&&i.playing,u=!!i&&i.current===e.assetId;return(0,K.jsxs)(kh,{ref:s,$layout:t,$selected:n,children:[(0,K.jsxs)(Ah,{type:`button`,$layout:t,onClick:r,title:e.url??e.name,children:[e.kind===`audio`?(0,K.jsx)(Lh,{}):(0,K.jsx)(th,{asset:e}),(0,K.jsxs)(jh,{children:[(0,K.jsx)(Mh,{$layout:t,children:c}),u&&i&&(0,K.jsxs)(Rh,{children:[sh(i.time),` / `,sh(i.duration)]})]})]}),i&&(0,K.jsxs)(Ih,{type:`button`,$layout:t,$on:l,onClick:()=>i.toggle(e.assetId,$a(e.assetId)),"aria-label":l?`暫停試聽`:`試聽`,title:`試聽`,children:[u&&(0,K.jsxs)(zh,{viewBox:`0 0 36 36`,"aria-hidden":`true`,children:[(0,K.jsx)(`circle`,{cx:`18`,cy:`18`,r:`16`,pathLength:`100`}),(0,K.jsx)(`circle`,{cx:`18`,cy:`18`,r:`16`,pathLength:`100`,strokeDasharray:`${i.duration>0?i.time/i.duration*100:0} 100`})]}),(0,K.jsx)(So,{name:l?`pause`:`play`,size:16})]}),(0,K.jsx)(Nh,{type:`button`,$layout:t,"aria-label":`更多`,"aria-expanded":a,onClick:()=>o(e=>!e),children:(0,K.jsx)(q,{name:`more-vertical`,size:16})}),a&&(0,K.jsxs)(Ph,{role:`menu`,$layout:t,children:[(0,K.jsxs)(Fh,{type:`button`,role:`menuitem`,onClick:()=>{to(e.assetId),o(!1)},children:[(0,K.jsx)(q,{name:`bookmark`,size:16}),e.favorite?`取消收藏`:`收藏`]}),(0,K.jsxs)(Fh,{type:`button`,role:`menuitem`,$danger:!0,onClick:()=>{u&&i?.stop(),no(e.assetId)},children:[(0,K.jsx)(q,{name:`trash`,size:16}),`刪除`]})]})]})}function ih({kind:e,onUploaded:t}){let n=qm[e],[r,i]=(0,R.useState)(!1),[a,o]=(0,R.useState)(!1),s=async n=>{if(n){i(!0);try{let r=await Ym(n);`error`in r?Es(r.error):t?.(r.asset),!(`error`in r)&&r.asset.kind!==e&&Es(`這是${qm[r.asset.kind]?.label??`別種檔案`}，已放進對應的分頁`)}finally{i(!1)}}};return(0,K.jsxs)(_h,{$over:a,onDragOver:e=>{e.dataTransfer.types.includes(`Files`)&&(e.preventDefault(),o(!0))},onDragLeave:()=>o(!1),onDrop:e=>{e.preventDefault(),o(!1),s(e.dataTransfer.files[0]??null)},children:[(0,K.jsxs)(yh,{type:`button`,disabled:r,onClick:async()=>s(await co(n.accept)),children:[r?`讀取中…`:`上傳${n.label}`,(0,K.jsx)(q,{name:r?`loader`:`upload`,size:16})]}),(0,K.jsxs)(vh,{children:[n.formats,`，`,n.limitMb,` MB 以內`]})]})}function ah({placeholder:e,onAdd:t}){let[n,r]=(0,R.useState)(``),i=()=>{let e=n.trim();e&&t(e)&&r(``)};return(0,K.jsxs)(bh,{children:[(0,K.jsx)(xh,{value:n,placeholder:e,"aria-label":e,onChange:e=>r(e.target.value),onKeyDown:e=>{e.key===`Enter`&&i()}}),(0,K.jsx)(yh,{type:`button`,onClick:i,disabled:!n.trim(),children:`加入`})]})}function oh({onGenerate:e}){let[t,n]=(0,R.useState)(``),r=()=>{let r=t.trim();r&&(e(r),n(``))};return(0,K.jsxs)(Sh,{children:[(0,K.jsx)(Ch,{value:t,placeholder:`描述要生成的圖片`,"aria-label":`描述要生成的圖片`,rows:3,onChange:e=>n(e.target.value),onKeyDown:e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),r())}}),(0,K.jsx)(wh,{children:(0,K.jsx)(yh,{type:`button`,onClick:r,disabled:!t.trim(),children:`生成`})})]})}var sh=e=>((!Number.isFinite(e)||e<0)&&(e=0),`${String(Math.floor(e/60)).padStart(2,`0`)}:${String(Math.floor(e%60)).padStart(2,`0`)}`);function ch(){let e=(0,R.useRef)(null),[t,n]=(0,R.useState)(null),[r,i]=(0,R.useState)(!1),[a,o]=(0,R.useState)(0),[s,c]=(0,R.useState)(0),l=()=>{if(e.current)return e.current;let t=new Audio;return t.addEventListener(`play`,()=>i(!0)),t.addEventListener(`pause`,()=>i(!1)),t.addEventListener(`ended`,()=>i(!1)),t.addEventListener(`timeupdate`,()=>o(t.currentTime)),t.addEventListener(`loadedmetadata`,()=>c(t.duration)),t.addEventListener(`durationchange`,()=>c(t.duration)),e.current=t,t};return{current:t,playing:r,time:a,duration:s,toggle(e,r){if(!r)return;let i=l();if(t===e){i.paused?i.play().catch(()=>{}):i.pause();return}i.src=r,n(e),o(0),c(0),i.play().catch(()=>{})},seek(t){let n=e.current;!n||!Number.isFinite(n.duration)||(n.currentTime=Math.max(0,Math.min(1,t))*n.duration,o(n.currentTime))},stop:(0,R.useRef)(()=>{let t=e.current;t&&(t.pause(),t.removeAttribute(`src`),t.load())}).current}}var lh=lc,uh=uc,dh=dc,fh=fc,ph=pc,mh=mc,hh=hc,gh=B.span`
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  color: ${e=>e.theme.text.secondary};
`,_h=B.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetMd};
  border: ${e=>e.theme.border.widthDefault} dashed
    ${e=>e.$over?e.theme.border.hover:e.theme.border.default};
  border-radius: ${e=>e.theme.radius.card};
  /* 跟下面的「描述要生成的圖片」框同高、同圓角，上下兩塊對齊 */
  block-size: 128px;
  box-sizing: border-box;
  justify-content: center;
  background: ${e=>e.$over?e.theme.surface.sunken:e.theme.surface.raised};
  text-align: center;
`,vh=B.span`
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.tertiary};
`,yh=B.button`
  ${bs}
  flex: none;
  min-block-size: 32px;
  padding: 0 14px;
  font-weight: 400;
`,bh=B.div`
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

  ${yh} { margin: 0; }
`,xh=B.input`
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
`,Sh=B.div`
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
`,Ch=B.textarea`
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
`,wh=B.div`
  display: flex;
  justify-content: flex-end;
  ${yh} { margin: 0; }
`,Th=B.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space.gapSm};
`,Eh=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
`,Dh=B.div`
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
`,Oh=B.span`
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 20px;
  border-radius: 6px;
  background: ${`#FF0033`};
  color: #fff;
  svg path, svg polygon { fill: currentColor; }
`,kh=B.div`
  position: relative;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: ${e=>e.$layout===`row`?e.theme.space.insetXs:`6px`};
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.raised};
  outline: 2px solid ${e=>e.$selected?e.theme.brand.accentOnLight:`transparent`};
  transition: background 0.12s, outline-color 0.12s;

  &:hover { background: ${e=>e.theme.surface.sunken}; }
  &:has(> button:first-child:active) { outline-color: ${e=>e.theme.brand.accentOnLight}; }
`,Ah=B.button`
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
`,jh=B.span`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-inline-end: 24px;
`,Mh=B.span`
  font-size: var(--ds-typography-caption-size);
  font-weight: 500;
  line-height: 18px;
  color: ${e=>e.theme.text.primary};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${e=>e.$layout===`row`?2:1};
  word-break: break-all;
`,Nh=B.button`
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

  ${kh}:hover &, &[aria-expanded='true'], &:focus-visible { opacity: 1; outline: none; }
  &:hover { background: ${e=>e.theme.surface.muted}; color: ${e=>e.theme.icon.default}; }
`,Ph=B.div`
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
  box-shadow: ${e=>e.theme.shadow.card};
`,Fh=B.button`
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
`,Ih=B.button`
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
`,Lh=B.span`
  flex: none;
  inline-size: 36px;
  block-size: 48px;
`,Rh=B.span`
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.tertiary};
  font-variant-numeric: tabular-nums;
`,zh=B.svg`
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
`;function Bh(e,t){let n=V(`blk`);switch(e){case`text`:return vr(``,`body`);case`image`:return{id:n,type:`image`,assetId:null,alt:``,caption:``,hasCaption:!1,aspectRatio:16/9,widthPct:50,popups:[]};case`image-ai`:return{id:n,type:`image`,assetId:null,alt:``,caption:``,hasCaption:!1,aspectRatio:16/9,widthPct:50,popups:[],aiPrompt:``};case`video`:return{id:n,type:`video`,source:`upload`,ref:``,title:``,widthPct:50,popups:[]};case`audio`:return{id:n,type:`audio`,assetId:null,title:``,widthPct:200/9,popups:[]};case`shape`:return{id:n,type:`shape`,shape:`rect`,label:``,spans:[],popups:[]};case`shape-circle`:return{id:n,type:`shape`,shape:`circle`,label:``,spans:[],popups:[]};case`shape-rounded`:return{id:n,type:`shape`,shape:`roundedRect`,label:``,spans:[],popups:[]};case`shape-callout`:return{id:n,type:`shape`,shape:`callout`,label:``,spans:[],tail:Ol,popups:[]};case`line`:return{id:n,type:`line`,from:{x:0,y:.5},to:{x:1,y:.5},widthPct:50,popups:[]};case`table`:return{...sd(t?.rows,t?.cols),widthPct:50};case`web`:return{id:n,type:`web`,url:``,title:``,presentation:`bookmark`,widthPct:50,popups:[],chosen:!1};case`pdf`:return{id:n,type:`pdf`,assetId:null,title:``,widthPct:50,popups:[]}}}function Vh(e,t=`bookmark`){let n=V(`blk`);switch(e.kind){case`image`:return{id:n,type:`image`,assetId:e.assetId,alt:e.name,caption:``,hasCaption:!1,aspectRatio:e.aspectRatio??1.5,widthPct:50,popups:[]};case`video`:return e.source===`youtube`?{id:n,type:`video`,source:`youtube`,ref:e.url??``,title:``,widthPct:50,popups:[]}:{id:n,type:`video`,source:`upload`,ref:e.assetId,title:e.name,widthPct:50,popups:[]};case`audio`:return{id:n,type:`audio`,assetId:e.assetId,title:e.name,widthPct:200/9,popups:[]};case`web`:return t===`embed`?{id:n,type:`web`,url:e.url??``,title:e.name,presentation:`embed`,widthPct:100,popups:[]}:{id:n,type:`web`,url:e.url??``,title:e.name,presentation:`bookmark`,widthPct:50,popups:[]};default:return{id:n,type:`pdf`,assetId:e.assetId,title:e.name,widthPct:50,popups:[]}}}function Hh({item:e,settings:t,contentInline:n,contentBlock:r,rowIndex:i}){let a=$u(),o=Eu(),s=Jl(),c=Ql(),l=t.writingMode===`vertical`,u=(0,R.useRef)(null),d=(0,R.useRef)(null),f=(0,R.useRef)(null),p=(0,R.useRef)(null),m=e=>(n,r)=>{if(a?.openInsert(null),n===`library`){a?.openLibrary(e);return}if(n===`pdf`){$m(`pdf`),a?.openLibrary(e);return}if(n===`table`){jd(e);return}let i=Fi(Bh(n,r),t);if(a?.dispatch({type:`insertRow`,index:e,blocks:[i]}),i.type===`text`&&a){a.select(i.id);let e=30,t=()=>{let n=document.querySelector(`[data-block-id="${i.id}"] [contenteditable="true"]`);if(n){n.focus();return}--e>0&&requestAnimationFrame(t)};requestAnimationFrame(t)}},h=vf(),g=e.row,_=a?.selectedBlockId?g.columns.some(e=>e.blocks.some(e=>e.id===a.selectedBlockId)):!1,v=a?.dropTarget?.mode===`column`&&a.dropTarget.rowId===g.id?a.dropTarget.side:null,y=a?.dropTarget?.mode===`column`&&a.dropTarget.rowId===g.id&&a.dropTarget.side===`right`?a.dropTarget.keepPct:void 0,b=!e.continuedFromPrev,x=!e.continuesOnNext,S=b&&a?.dropTarget?.mode===`row`&&a.dropTarget.index===i,C=x&&a?.dropTarget?.mode===`row`&&a.dropTarget.index===i+1,w=a?.draggingRowId===g.id;return(0,K.jsxs)(Wh,{ref:u,$dragging:w,children:[S&&(0,K.jsx)(Jh,{$where:`start`,$vertical:l}),C&&(0,K.jsx)(Jh,{$where:`end`,$vertical:l}),a&&b&&i===0&&!a.draggingRowId&&(0,K.jsx)(pp,{vertical:l,open:a.insertAt===0,hinted:a.hoverGap===0,onOpen:()=>a.openInsert(a.insertAt===0?null:0)}),(0,K.jsx)(Gh,{ref:f}),a?.insertAt===0&&b&&i===0&&(0,K.jsx)(Rp,{anchorRef:f,vertical:l,onClose:()=>a.openInsert(null),onPick:m(0)}),(0,K.jsxs)(Kh,{ref:d,"data-row-id":a?g.id:void 0,"data-row-index":a?i:void 0,$selected:_,style:{marginBlockStart:e.gapBefore},children:[a&&g.columns.length<2&&(0,K.jsx)(qh,{"data-ui":!0,$vertical:l,onPointerDown:e=>{e.preventDefault(),a.startDrag(e.nativeEvent,{rowId:g.id})},"aria-label":`拖曳搬移`,title:`拖曳搬移這一列`,children:(0,K.jsx)(q,{name:`grip`,size:16})}),v&&(0,K.jsx)(Yh,{$side:v===`left`?`start`:`end`,$vertical:l,$at:y,children:(0,K.jsxs)(`span`,{children:[`併成`,`零一二三四五`[g.columns.length+1],`欄`]})}),(0,K.jsx)(Xh,{"data-columns":!0,children:g.columns.map((i,u)=>{let d=(n-48*(g.columns.length-1))*i.widthPct/100;return(0,K.jsxs)(Qh,{"data-col-id":a?i.id:void 0,style:{flexBasis:`${i.widthPct}%`},children:[a&&g.columns.length>1&&(0,K.jsx)(Zh,{"data-ui":!0,$vertical:l,onPointerDown:e=>{e.preventDefault(),e.stopPropagation(),a.startDrag(e.nativeEvent,{rowId:g.id,columnId:i.id})},"aria-label":`拖曳搬移這一欄`,title:`拖曳搬移這一欄。往上或往下放可以拆回獨立的一列`,children:(0,K.jsx)(q,{name:`grip`,size:16})}),i.blocks.map(n=>{let i={inlineSize:d,maxBlockSize:r,vertical:l},f=a?.selectedBlockId===n.id,p=a&&f?Wp(n):null,m=p?Ni(n,i):null,_=m&&n.type===`table`?h.frame(n.id,m,l):m,v=zr(n),y=n.type===`text`?s.get(n.id):void 0,x=!a&&o&&v.length>0&&!y?e=>o.open({...n,popups:v},e):null,S=!!c?.focusId&&y?.startId!==c.focusId,C=y&&b&&(a||c)?e=>{a?(a.select(n.id),a.openPopupPanel(n.id)):c?.toggle(y.startId,e)}:null;return(0,K.jsxs)(eg,{$tap:!!x,role:x?`button`:void 0,tabIndex:x?0:void 0,"aria-label":x?`打開補充內容`:void 0,onPointerDown:C?e=>{let t=e.currentTarget;tg(t,e.clientX,e.clientY)?t.dataset.paraHit=`1`:delete t.dataset.paraHit}:void 0,onPointerMove:C?e=>{let t=e.currentTarget;t.style.cursor=tg(t,e.clientX,e.clientY)?`pointer`:``}:void 0,onClick:C?e=>{tg(e.currentTarget,e.clientX,e.clientY)&&C(e.currentTarget)}:x?e=>{e.target.closest(`button, a, input, video, audio, iframe, sup[data-fn]`)||x(e.currentTarget)}:void 0,onKeyDown:x?e=>{e.target!==e.currentTarget||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),x(e.currentTarget))}:void 0,ref:n.type===`table`&&a?h.ref(n.id):void 0,"data-block-id":a?n.id:void 0,"data-para":!a&&y?y.startId:void 0,$selected:f,$framed:!!p,$fit:n.type!==`text`,$dim:S,children:[y&&b&&(a||c)&&(0,K.jsx)(ng,{type:`button`,onClick:e=>{let t=e.currentTarget.parentElement;a?(a.select(n.id),a.openPopupPanel(n.id)):c?.toggle(y.startId,t)},children:a?`第 ${y.no} 段：編輯段落說明`:`第 ${y.no} 段`}),a&&p&&_&&(0,K.jsx)(Kp,{mode:p,box:_,columnInline:d,vertical:l,onResize:e=>a.dispatch({type:`resizeBlock`,blockId:n.id,...e})}),a&&f&&n.type===`text`&&Xi(n,i).flipped&&(0,K.jsx)(tm,{size:Math.min(n.blockSize??r*.45,r),max:r,vertical:l,onResize:e=>a.dispatch({type:`patchBlock`,blockId:n.id,blockType:`text`,patch:{blockSize:e}})}),a&&Pr(n).length>0&&(0,K.jsx)(im,{count:Pr(n).length,onClick:a?()=>{a.select(n.id),a.openPopupPanel(n.id)}:void 0,vertical:l,side:g.columns.length>1&&u===0?`start`:`end`}),(0,K.jsx)(dp,{label:fi[n.type]?.label,children:(0,K.jsx)($l,{block:n,settings:t,sizing:i,onEditSpans:a?t=>a.editSpans(n.id,t,e.textSlice):void 0,onPatch:a?e=>a.dispatch({type:`patchBlock`,blockId:n.id,blockType:n.type,patch:e}):void 0,onSelectRange:a?t=>a.setInlineSelection(t?{blockId:n.id,range:t,slice:e.textSlice}:null):void 0,onSelect:a?()=>a.select(n.id):void 0,paraLabel:y&&b?Wr(y.no,l):void 0,paraOn:!!y&&c?.focusId===y.startId})})]},n.id)}),a&&u<g.columns.length-1&&!g.columns[u+1].blocks.some(e=>e.id===a.selectedBlockId)&&(0,K.jsx)(Uh,{rowId:g.id,widths:g.columns.map(e=>e.widthPct),index:u,vertical:l,shown:i.blocks.some(e=>e.id===a.selectedBlockId)?`end`:null,onChange:e=>a.dispatch({type:`setColumnWidths`,rowId:g.id,widths:e})}),a&&u>0&&i.blocks.some(e=>e.id===a.selectedBlockId)&&(0,K.jsx)(Uh,{rowId:g.id,widths:g.columns.map(e=>e.widthPct),index:u-1,vertical:l,shown:`start`,onChange:e=>a.dispatch({type:`setColumnWidths`,rowId:g.id,widths:e})})]},i.id)})})]}),a&&x&&!a.draggingRowId&&(0,K.jsx)(pp,{vertical:l,where:`end`,open:a.insertAt===i+1,hinted:a.hoverGap===i+1,onOpen:()=>a.openInsert(a.insertAt===i+1?null:i+1)}),(0,K.jsx)(Gh,{ref:p}),a?.insertAt===i+1&&x&&(0,K.jsx)(Rp,{anchorRef:p,vertical:l,onClose:()=>a.openInsert(null),onPick:m(i+1)})]})}function Uh({widths:e,index:t,vertical:n,shown:r,onChange:i}){let a=(0,R.useRef)(null),o=e=>n?e.clientY:e.clientX;return(0,K.jsx)($h,{role:`separator`,"aria-label":`調整欄寬`,"data-ui":!0,$vertical:n,$shown:r,onPointerDown:r=>{let i=r.currentTarget.closest(`[data-columns]`)?.getBoundingClientRect(),s=(n?i?.height:i?.width)??0;if(!(s<=0)){a.current={pos:o(r),a:e[t],b:e[t+1],span:s};try{r.currentTarget.setPointerCapture(r.pointerId)}catch{}}},onPointerMove:n=>{let r=a.current;if(!r)return;let s=(o(n)-r.pos)/r.span*100,c=r.a+r.b,l=Up(Math.max(10,Math.min(c-10,r.a+s))/c*100)*c/100,u=e.slice();u[t]=l,u[t+1]=r.a+r.b-l,i(u)},onPointerUp:()=>{a.current=null},onPointerCancel:()=>{a.current=null}})}var Wh=B.div`
  position: relative;
  flex: none;
  inline-size: 100%;
  opacity: ${e=>e.$dragging?.4:1};
`,Gh=B.div`
  inline-size: 0;
  block-size: 0;
`,Kh=B.div`
  position: relative;
  inline-size: 100%;
  display: flex;
  flex-direction: column;
`,qh=B.div`
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

  ${Kh}:hover & {
    opacity: 1;
  }
  &:hover {
    border-color: ${e=>e.theme.border.hover};
    color: ${e=>e.theme.text.primary};
  }
  &:active {
    cursor: grabbing;
  }
`,Jh=B.div`
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
`,Yh=B.div`
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
`,Xh=B.div`
  display: flex;
  inline-size: 100%;
  gap: ${48}px;
  align-items: flex-start;
`,Zh=B.div`
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

  ${Kh}:hover & {
    opacity: 1;
  }
  &:hover {
    opacity: 1;
    border-color: ${e=>e.theme.border.hover};
    color: ${e=>e.theme.text.primary};
  }
  &:active { cursor: grabbing; }
`,Qh=B.div`
  position: relative;
  min-inline-size: 0;
`,$h=B.div`
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
`,eg=B.div`
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
`;function tg(e,t,n){let r=e.querySelector(`.ds-rich[data-pno]`);if(!r)return!1;let i=r.getBoundingClientRect(),a=getComputedStyle(r),o=parseFloat(a.fontSize),s=parseFloat(a.lineHeight)||o*1.6,c=a.writingMode.startsWith(`vertical`),l=c?r.offsetHeight?i.height/r.offsetHeight:1:r.offsetWidth?i.width/r.offsetWidth:1,u=o*l;return c?t>=i.right-s*l&&t<=i.right&&n>=i.top&&n<=i.top+u:t>=i.left&&t<=i.left+u&&n>=i.top&&n<=i.top+s*l}var ng=B.button`
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
`;function rg(e){let t=e.items[0];if(!(!t||t.continuedFromPrev))return t.row.pageBackground}function ig(e){if(!e)return{};let t=e.assetId?$a(e.assetId):void 0;return{...e.color?{backgroundColor:e.color}:{},...t?{backgroundImage:`url(${t})`,backgroundSize:`cover`,backgroundPosition:`center`}:{}}}function ag({page:e,settings:t,scale:n,rowIndexOf:r,rowCount:i=0,thumbnail:a=!1}){let o=ui[t.aspectRatio],s=t.writingMode===`vertical`,c=t.layout===`flow`,l=di(t),u=s?l.height:l.width,d=s?l.width:l.height,f=c&&!s&&(e.panels?.length??0)>1;return(0,K.jsx)(og,{"data-page-index":r?e.index:void 0,style:{width:o.width*n,height:o.height*n},children:(0,K.jsx)(sg,{$vertical:s,$flow:c,$horizontalPanels:f,$thumbnail:a,"data-vertical":s||void 0,"data-layout":c?`flow`:`paged`,onWheel:e=>{if(!c||a||Math.abs(e.deltaY)<=Math.abs(e.deltaX))return;let t=e.currentTarget;if(t.scrollWidth<=t.clientWidth+2)return;let n=t.scrollLeft;t.scrollLeft+=s?-e.deltaY:e.deltaY,t.scrollLeft!==n&&e.stopPropagation()},style:{width:o.width,height:o.height,transform:`scale(${n})`,...ig(rg(e))},children:f?e.panels.map((e,n)=>(0,K.jsx)(cg,{"data-flow-panel":n,style:{width:u,height:d},children:e.map(e=>(0,K.jsx)(Hh,{item:e,settings:t,contentInline:u,contentBlock:d,rowIndex:r?r(e.row.id):-1,rowCount:i},`${e.row.id}-${e.textSlice?.start??0}`))},n)):e.items.map(e=>(0,K.jsx)(Hh,{item:e,settings:t,contentInline:u,contentBlock:d,rowIndex:r?r(e.row.id):-1,rowCount:i},`${e.row.id}-${e.textSlice?.start??0}`))})})}var og=B.div`
  position: relative;
  flex: none;
`,sg=B.div`
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
  overflow-x: ${e=>e.$flow&&!e.$thumbnail?`auto`:`hidden`};
  overflow-y: hidden;
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
`,cg=B.div`
  flex: none;
  display: flex;
  flex-direction: column;
  position: relative;

  & + & {
    padding-inline-start: ${48}px;
    border-inline-start: 1px dashed ${e=>e.theme.border.subtle};
  }
`;function lg({startedBy:e,onMerge:t}){let n=e===`manual`;return t?(0,K.jsxs)(ug,{children:[(0,K.jsx)(dg,{$dashed:n}),(0,K.jsx)(pg,{type:`button`,onClick:t,title:`把這一頁併回上一頁`,children:`可合併`}),(0,K.jsx)(dg,{$dashed:n})]}):(0,K.jsx)(fg,{$dashed:n})}var ug=B.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapMd};
  width: 100%;
  max-width: 1024px;
  margin-block: ${e=>e.theme.space.gapSm};
`,dg=B.div`
  flex: 1;
  height: 0;
  border-block-start: 1.5px ${e=>e.$dashed?`dashed`:`solid`} ${e=>e.theme.border.default};
`,fg=B(dg)`
  flex: none;
  width: 100%;
  max-width: 1024px;
  margin-block: ${e=>e.theme.space.gapSm};
`,pg=B.button`
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
`;function mg({value:e,options:t,onChange:n,placeholder:r=`請選擇`,"aria-label":i,variant:a=`field`,title:o,icon:s}){let[c,l]=(0,R.useState)(!1),u=(0,R.useRef)(null),d=(0,R.useRef)(null),[f,p]=(0,R.useState)(null),m=t.find(t=>t.value===e);(0,R.useLayoutEffect)(()=>{if(!c)return;let e=()=>{let e=u.current?.getBoundingClientRect();if(!e)return;let n=window.innerHeight-e.bottom,r=Math.min(t.length*38+16,320);p(n>=r+8||n>=e.top?{left:e.left,width:e.width,top:e.bottom+6}:{left:e.left,width:e.width,bottom:window.innerHeight-e.top+6})};return e(),window.addEventListener(`scroll`,e,!0),window.addEventListener(`resize`,e),()=>{window.removeEventListener(`scroll`,e,!0),window.removeEventListener(`resize`,e)}},[c,t.length]),(0,R.useEffect)(()=>{if(!c)return;let e=e=>{let t=e.target;d.current?.contains(t)||u.current?.contains(t)||l(!1)},t=e=>{e.key===`Escape`&&(e.stopPropagation(),l(!1),u.current?.focus())};return window.addEventListener(`pointerdown`,e,!0),window.addEventListener(`keydown`,t,!0),()=>{window.removeEventListener(`pointerdown`,e,!0),window.removeEventListener(`keydown`,t,!0)}},[c]),(0,R.useEffect)(()=>{if(!c||!f)return;let n=d.current?.querySelectorAll(`[role="option"]`);n?.length&&n[Math.max(0,t.findIndex(t=>t.value===e))]?.focus()},[c,f,t,e]);let h=e=>{if(e.key!==`ArrowDown`&&e.key!==`ArrowUp`)return;e.preventDefault();let t=Array.from(d.current?.querySelectorAll(`[role="option"]`)??[]),n=t.indexOf(document.activeElement);t[e.key===`ArrowDown`?Math.min(t.length-1,n+1):Math.max(0,n-1)]?.focus()};return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(hg,{ref:u,type:`button`,"aria-label":i,title:o,"aria-haspopup":`listbox`,"aria-expanded":c,$empty:!m,$tool:a===`tool`,onClick:()=>l(e=>!e),children:[s&&(0,K.jsx)(gg,{name:s,size:20}),(0,K.jsx)(_g,{children:m?.short??m?.label??r}),(0,K.jsx)(q,{name:`chevron-down`,size:16})]}),c&&f&&(0,G.createPortal)((0,K.jsx)(vg,{ref:d,role:`listbox`,"aria-label":i,style:a===`tool`?{...f,width:void 0,minWidth:f.width,maxWidth:window.innerWidth-f.left-8}:f,onKeyDown:h,"data-ui":!0,onPointerDown:e=>e.preventDefault(),children:t.map(t=>(0,K.jsx)(yg,{type:`button`,role:`option`,"aria-selected":t.value===e,$on:t.value===e,onClick:()=>{n(t.value),l(!1),u.current?.focus()},children:t.label},t.value))}),document.body)]})}var hg=B.button`
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
`,gg=B(q)`
  flex: none;
  margin-inline-end: 4px;
`,_g=B.span`
  flex: 1 1 auto;
  min-inline-size: 0;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,vg=B.div`
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
  box-shadow: ${e=>e.theme.shadow.card};
`,yg=B.button`
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
`,bg=[{label:`白`,color:`#FFFFFF`},{label:`墨`,color:`#1A1917`},{label:`橘`,color:`#FF854A`},{label:`藍`,color:`#1A66C2`}],xg=`#FFFFFF`,Sg=`#1A1917`,Cg=[`none`,`arrow`,`arrowFilled`,`dot`],wg={none:`—`,arrow:`←`,arrowFilled:`◀`,dot:`●`},Tg={none:`—`,arrow:`→`,arrowFilled:`▶`,dot:`●`};function Eg({block:e,blockId:t}){let n=$u(),[r,i]=(0,R.useState)(null),a=(0,R.useRef)(null),o=(0,R.useRef)(null),s=(0,R.useRef)(null),c=e.fill??xg,l=e.stroke??Sg,u=e.strokeWidth??1,d=Math.round((e.opacity??1)*100),f=e=>n.dispatch({type:`patchBlock`,blockId:t,blockType:`shape`,patch:e});return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(mg,{variant:`tool`,value:e.shape,"aria-label":`形狀`,title:`形狀`,options:[{value:`rect`,label:`矩形`},{value:`circle`,label:`圓形`},{value:`roundedRect`,label:`圓角矩形`},{value:`callout`,label:`對話框`}],onChange:t=>{let n=t;if(n!==e.shape){if(n===`circle`)f({shape:`circle`,widthPct:void 0,blockSize:void 0});else if(n===`callout`){let t=e.shape===`circle`?{widthPct:void 0,blockSize:void 0}:{};f({shape:`callout`,tail:e.tail??Ol,...t})}else{let t=e.shape===`circle`?{widthPct:void 0,blockSize:void 0}:{};f({shape:n,...t})}}}}),(0,K.jsxs)(jg,{ref:a,$open:r===`fill`,onClick:()=>i(r===`fill`?null:`fill`),title:`填色`,"aria-label":`填色`,children:[`填色`,(0,K.jsx)(Mg,{style:{background:c}})]}),r===`fill`&&(0,K.jsx)(Og,{anchor:a.current,label:`填色`,onClose:()=>i(null),children:(0,K.jsx)(kg,{value:c,label:`填色`,onChange:e=>f({fill:e}),onClose:()=>i(null)})}),(0,K.jsxs)(jg,{ref:o,$open:r===`stroke`,onClick:()=>i(r===`stroke`?null:`stroke`),title:`邊框顏色`,"aria-label":`邊框顏色`,children:[`邊框`,(0,K.jsx)(Mg,{style:{background:l}})]}),r===`stroke`&&(0,K.jsx)(Og,{anchor:o.current,label:`邊框顏色`,onClose:()=>i(null),children:(0,K.jsx)(kg,{value:l,label:`邊框顏色`,onChange:e=>f({stroke:e}),onClose:()=>i(null)})}),(0,K.jsxs)(Ng,{title:`邊框粗細`,children:[(0,K.jsx)(Pg,{type:`number`,min:0,max:24,step:1,value:u,onChange:e=>{let t=Number(e.target.value);Number.isFinite(t)&&f({strokeWidth:Math.max(0,Math.min(24,t))})},"aria-label":`邊框粗細`}),(0,K.jsx)(Fg,{children:`px`})]}),(0,K.jsxs)(jg,{ref:s,$open:r===`opacity`,onClick:()=>i(r===`opacity`?null:`opacity`),title:`透明度`,"aria-label":`透明度`,children:[d,`%`]}),r===`opacity`&&(0,K.jsx)(Og,{anchor:s.current,label:`透明度`,onClose:()=>i(null),children:(0,K.jsx)(Ag,{value:d,onChange:e=>f({opacity:e/100})})}),(0,K.jsx)(jg,{$on:!!e.textVertical,onClick:()=>f({textVertical:!e.textVertical||void 0}),title:e.textVertical?`文字改回橫排`:`文字改成直排`,"aria-label":e.textVertical?`文字改回橫排`:`文字改成直排`,style:{padding:0,inlineSize:36},children:(0,K.jsx)(q,{name:`writing-vertical`,size:20})})]})}function Dg({block:e,blockId:t}){let n=$u(),[r,i]=(0,R.useState)(null),a=(0,R.useRef)(null),o=(0,R.useRef)(null),s=e.stroke??Sg,c=e.strokeWidth??2,l=Math.round((e.opacity??1)*100),u=e=>n.dispatch({type:`patchBlock`,blockId:t,blockType:`line`,patch:e});return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(jg,{ref:a,$open:r===`stroke`,onClick:()=>i(r===`stroke`?null:`stroke`),title:`線條顏色`,"aria-label":`線條顏色`,children:(0,K.jsx)(Mg,{style:{background:s}})}),r===`stroke`&&(0,K.jsx)(Og,{anchor:a.current,label:`線條顏色`,onClose:()=>i(null),children:(0,K.jsx)(kg,{value:s,label:`線條顏色`,onChange:e=>u({stroke:e}),onClose:()=>i(null)})}),(0,K.jsxs)(Ng,{title:`線條粗細`,children:[(0,K.jsx)(Pg,{type:`number`,min:.5,max:24,step:.5,value:c,onChange:e=>{let t=Number(e.target.value);Number.isFinite(t)&&u({strokeWidth:Math.max(.5,Math.min(24,t))})},"aria-label":`線條粗細`}),(0,K.jsx)(Fg,{children:`px`})]}),(0,K.jsx)(jg,{$on:!!e.dashed,onClick:()=>u({dashed:!e.dashed}),title:e.dashed?`切換為實線`:`切換為虛線`,children:e.dashed?`虛線`:`實線`}),(0,K.jsx)(mg,{variant:`tool`,value:e.startCap??`none`,"aria-label":`起點樣式`,title:`起點`,options:Cg.map(e=>({value:e,label:`${wg[e]}  ${zl[e]}`,short:wg[e]})),onChange:e=>u({startCap:e})}),(0,K.jsx)(mg,{variant:`tool`,value:e.endCap??`none`,"aria-label":`終點樣式`,title:`終點`,options:Cg.map(e=>({value:e,label:`${Tg[e]}  ${zl[e]}`,short:Tg[e]})),onChange:e=>u({endCap:e})}),(0,K.jsxs)(jg,{ref:o,$open:r===`opacity`,onClick:()=>i(r===`opacity`?null:`opacity`),title:`透明度`,"aria-label":`透明度`,children:[l,`%`]}),r===`opacity`&&(0,K.jsx)(Og,{anchor:o.current,label:`透明度`,onClose:()=>i(null),children:(0,K.jsx)(Ag,{value:l,onChange:e=>u({opacity:e/100})})})]})}function Og({anchor:e,label:t,onClose:n,children:r}){let[i,a]=(0,R.useState)(null);return(0,R.useEffect)(()=>{let t=()=>{let t=e?.getBoundingClientRect();t&&a({top:t.bottom+8,left:Math.max(8,Math.min(t.left,window.innerWidth-220))})};t();let r=t=>{let r=t.target;r.closest(`[data-shape-popover]`)||e&&e.contains(r)||n()},i=e=>{e.key===`Escape`&&(e.stopPropagation(),n())};return window.addEventListener(`pointerdown`,r,!0),window.addEventListener(`keydown`,i,!0),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`pointerdown`,r,!0),window.removeEventListener(`keydown`,i,!0),window.removeEventListener(`scroll`,t,!0)}},[e,n]),i?(0,G.createPortal)((0,K.jsx)(Ig,{"data-shape-popover":!0,"data-ui":!0,role:`dialog`,"aria-label":t,style:i,onPointerDown:e=>{e.target.closest(`input`)?e.stopPropagation():e.preventDefault()},children:r}),document.body):null}function kg({value:e,label:t,onChange:n,onClose:r}){let i=(0,R.useRef)(null),a=e.toUpperCase(),o=bg.some(e=>e.color===a)?null:e;return(0,K.jsxs)(Lg,{children:[bg.map(e=>(0,K.jsx)(Rg,{type:`button`,title:e.label,$on:a===e.color,style:{background:e.color},onClick:()=>{n(e.color),r()}},e.label)),(0,K.jsxs)(zg,{type:`button`,title:`自訂顏色`,$on:!!o,style:o?{background:o}:void 0,onClick:()=>i.current?.click(),children:[!o&&(0,K.jsx)(q,{name:`plus`,size:16}),(0,K.jsx)(`input`,{ref:i,type:`color`,value:o??`#ffffff`,onChange:e=>{n(e.target.value.toUpperCase())},"aria-label":`自訂${t}`,tabIndex:-1})]})]})}function Ag({value:e,onChange:t}){return(0,K.jsxs)(Bg,{children:[(0,K.jsx)(Hg,{children:`透明度`}),(0,K.jsx)(Vg,{type:`range`,min:0,max:100,step:5,value:e,style:{"--fill":`${e}%`},"aria-label":`透明度`,onChange:e=>t(Number(e.target.value))}),(0,K.jsxs)(Ug,{children:[e,`%`]})]})}var jg=B.button`
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
`,Mg=B.span`
  display: inline-block;
  inline-size: 18px;
  block-size: 18px;
  border-radius: 999px;
  border: 1.5px solid ${e=>e.theme.border.default};
  box-shadow: inset 0 0 0 1.5px ${e=>e.theme.surface.raised};
  flex-shrink: 0;
`,Ng=B.div`
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
`,Pg=B.input`
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
`,Fg=B.span`
  color: ${e=>e.theme.text.secondary};
  margin-inline-start: 2px;
  user-select: none;
`,Ig=B.div`
  position: fixed;
  z-index: 950;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: ${e=>e.theme.radius.panel};
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${e=>e.theme.surface.page};
  box-shadow: ${e=>e.theme.shadow.card};
  writing-mode: horizontal-tb;
  /* 跟工具列同字級 */
  font-size: ${e=>e.theme.typography.bodySmSize};
`,Lg=B.div`
  ${ad}
`,Rg=B.button`
  ${rd}
`,zg=B(Rg)`
  ${id}
`,Bg=B.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-inline-size: 220px;
  padding: 4px 4px 4px 8px;
`,Vg=B.input`
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
`,Hg=B.span`
  flex: none;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,Ug=B.span`
  min-inline-size: 3em;
  text-align: end;
  font-size: ${e=>e.theme.typography.bodySmSize};
  font-variant-numeric: tabular-nums;
  color: ${e=>e.theme.text.primary};
`;function Wg({block:e,blockId:t,start:n,end:r,afterFont:i}){let a=$u(),o=mr(e.spans,n,r),[s,c]=(0,R.useState)(null),l=e=>o.length>0&&o.every(t=>t[e]),u=e=>{let t=o[0]?.[e];return o.length>0&&o.every(n=>n[e]===t)?t:void 0},d=i=>{a.dispatch({type:`setSpans`,blockId:t,spans:ur(e.spans,n,r,i)})},f=e=>d({[e]:!l(e)}),p=u(`color`),m=u(`fontFamily`),h=u(`popupId`),g=u(`noteId`),_=g?e.rangeNotes?.find(e=>e.id===g)??null:null,v=_?Kr.find(e=>e.key===Jr(_)):void 0,y=dr(o),b=h?Lr(e,h).length>0:!1,x=(0,R.useRef)(null),S=(0,R.useRef)(null),C=(0,R.useRef)(null),w=(0,R.useRef)(null),T=n=>{let r=e.rangeNotes??[];if(_)a.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:r.map(e=>e.id===_.id?{...e,kind:n}:e)}});else{let e=V(`note`);a.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:[...r,{id:e,kind:n,body:``}]}}),d({noteId:e})}c(null)},E=()=>{_&&(a.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:(e.rangeNotes??[]).filter(e=>e.id!==_.id)}}),a.dispatch({type:`setSpans`,blockId:t,spans:e.spans.map(e=>e.noteId===_.id?{...e,noteId:void 0}:e)}),c(null))},D=p&&!Gg.some(e=>e.value===p)?p:null;return(0,K.jsxs)(K.Fragment,{children:[e.paragraph&&(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(Zg,{ref:w,$open:s===`kind`,onClick:()=>c(s===`kind`?null:`kind`),title:`標記成生字詞或句子`,children:[v?v.name:`標記`,(0,K.jsx)(q,{name:`chevron-down`,size:16})]}),s===`kind`&&(0,K.jsx)(Xg,{anchor:w.current,label:`標記`,onClose:()=>c(null),children:(0,K.jsxs)(r_,{children:[Kr.map(e=>(0,K.jsx)(i_,{type:`button`,$on:v?.key===e.key,onClick:()=>T(e.key),children:e.name},e.key)),_&&(0,K.jsxs)(i_,{type:`button`,onClick:E,children:[`取消標記`,(0,K.jsx)(q,{name:`x`,size:16})]})]})})]}),(0,K.jsxs)(Zg,{ref:S,$open:s===`font`,onClick:()=>c(s===`font`?null:`font`),title:`字體`,children:[Yi.find(e=>e.value===(m??null))?.label??`字體`,(0,K.jsx)(q,{name:`chevron-down`,size:16})]}),s===`font`&&(0,K.jsx)(Xg,{anchor:S.current,label:`字體`,onClose:()=>c(null),children:(0,K.jsx)(r_,{children:Yi.map(e=>(0,K.jsx)(i_,{type:`button`,$on:(m??null)===e.value,style:e.value?{fontFamily:e.value}:void 0,onClick:()=>{d({fontFamily:e.value??void 0}),c(null)},children:e.label},e.label))})}),i,(0,K.jsx)(Zg,{$on:y,onClick:()=>a.dispatch({type:`setSpans`,blockId:t,spans:fr(e.spans,n,r)}),title:y?`取消注音`:`加上注音`,children:`注`}),(0,K.jsx)(Zg,{$iconOnly:!0,$on:l(`underline`),onClick:()=>f(`underline`),title:`底線`,children:(0,K.jsx)(q,{name:`underline`,size:20,label:`底線`})}),(0,K.jsx)(Zg,{$iconOnly:!0,$on:l(`strike`),onClick:()=>f(`strike`),title:`刪除線`,children:(0,K.jsx)(q,{name:`strikethrough`,size:20,label:`刪除線`})}),(0,K.jsx)(Zg,{$iconOnly:!0,$on:l(`overline`),onClick:()=>f(`overline`),title:`上線（線段 AB）`,children:(0,K.jsx)(q,{name:`overline`,size:20,label:`上線`})}),(0,K.jsx)(Zg,{ref:x,$iconOnly:!0,$open:s===`color`,onClick:()=>c(s===`color`?null:`color`),title:`文字顏色`,"aria-label":`文字顏色`,children:(0,K.jsx)(Qg,{style:{background:p?Kg(p):`var(--ds-text-primary)`}})}),s===`color`&&(0,K.jsx)(Xg,{anchor:x.current,label:`文字顏色`,onClose:()=>c(null),children:(0,K.jsxs)(e_,{children:[Gg.map(e=>(0,K.jsx)(t_,{type:`button`,title:e.label,$on:(p??null)===e.value,style:{background:e.value?Kg(e.value):`var(--ds-surface-raised)`},onClick:()=>d({color:e.value??void 0}),children:!e.value&&(0,K.jsx)(q,{name:`x`,size:16})},e.label)),(0,K.jsxs)(n_,{type:`button`,title:`自訂顏色`,$on:!!D,style:D?{background:D}:void 0,onClick:()=>C.current?.click(),children:[!D&&(0,K.jsx)(q,{name:`plus`,size:16}),(0,K.jsx)(`input`,{ref:C,type:`color`,value:D??`#1a1917`,onChange:e=>d({color:e.target.value}),"aria-label":`自訂顏色`,tabIndex:-1})]})]})}),(0,K.jsx)(Zg,{$iconOnly:!0,$on:b,onClick:()=>{a.setPopupPick({blockId:t,start:n,end:r}),a.openPopupPanel(t)},title:b?`編輯這幾個字的補充`:`讓這幾個字點了會開補充`,children:(0,K.jsx)(q,{name:`blocks`,size:20,label:`補充`})})]})}var Gg=[{label:`預設`,value:null},{label:`強調`,value:`accent`},{label:`次要`,value:`secondary`},{label:`藍`,value:`#1A66C2`},{label:`橘`,value:`#FF854A`},{label:`森林`,value:`#00A36E`},{label:`紫`,value:`#7F6CDF`},{label:`赭`,value:`#93663C`}],Kg=e=>e===`accent`?`var(--ds-text-accent)`:e===`secondary`?`var(--ds-text-secondary)`:e,qg=[{value:`start`,horizontal:`靠左`,vertical:`靠上`},{value:`center`,horizontal:`置中`,vertical:`置中`},{value:`end`,horizontal:`靠右`,vertical:`靠下`},{value:`justify`,horizontal:`左右對齊`,vertical:`上下對齊`}],Jg={start:`align-left`,center:`align-center`,end:`align-right`,justify:`align-justify`};function Yg({block:e,blockId:t,settings:n}){let r=$u(),i=e=>r.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:e}),a=dr(e.spans),[o,s]=(0,R.useState)(!1),c=(0,R.useRef)(null),[l,u]=(0,R.useState)(!1),d=(0,R.useRef)(null),f=new Set(e.spans.filter(e=>e.text).map(e=>e.fontFamily??null)),p=f.size<=1?[...f][0]??null:void 0,m=n=>r.dispatch({type:`setSpans`,blockId:t,spans:e.spans.map(({fontFamily:e,...t})=>n?{...t,fontFamily:n}:t)}),h=(e.writingMode??n.writingMode)===`vertical`,g=!!e.writingMode&&e.writingMode!==n.writingMode,_=h?`horizontal`:`vertical`,v=Ki(e.role,h),y=e.fontSize??v,b=Ji.includes(y)?Ji:[...Ji,y].sort((e,t)=>e-t),x=e.align??`start`,S=zi(e.role),C=e.lineHeight??S,w=[...new Set([...Bi,C,S])].sort((e,t)=>e-t);return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(Zg,{ref:d,$open:l,onClick:()=>u(e=>!e),title:`字型`,"aria-label":`字型`,children:[p===void 0?`字型`:Yi.find(e=>e.value===p)?.label??`字型`,(0,K.jsx)(q,{name:`chevron-down`,size:16})]}),l&&(0,K.jsx)(Xg,{anchor:d.current,label:`字型`,onClose:()=>u(!1),children:(0,K.jsx)(r_,{children:Yi.map(e=>(0,K.jsxs)(i_,{type:`button`,$on:p===e.value,style:e.value?{fontFamily:e.value}:void 0,onClick:()=>{m(e.value),u(!1)},children:[e.label,(0,K.jsx)(a_,{style:e.value?{fontFamily:e.value}:void 0,children:`永字八法`})]},e.label))})}),(0,K.jsx)(mg,{variant:`tool`,value:String(y),"aria-label":`字級（px）`,title:`字級`,options:b.map(e=>({value:String(e),label:String(e)})),onChange:e=>{let t=Number(e);i({fontSize:t===v?void 0:t})}}),(0,K.jsx)(mg,{variant:`tool`,icon:h?`line-height-vertical`:`line-height`,value:String(C),"aria-label":`行距（倍）`,title:`行距`,options:w.map(e=>({value:String(e),label:String(e)})),onChange:e=>{let t=Number(e);i({lineHeight:t===S?void 0:t})}}),(0,K.jsxs)(Zg,{ref:c,$value:!0,$open:o,onClick:()=>s(e=>!e),title:`對齊`,"aria-label":`對齊`,"aria-haspopup":`listbox`,"aria-expanded":o,children:[(0,K.jsx)(q,{name:Jg[x],size:20}),(0,K.jsx)(q,{name:`chevron-down`,size:16})]}),o&&(0,K.jsx)(Xg,{anchor:c.current,label:`對齊`,onClose:()=>s(!1),children:(0,K.jsx)(r_,{$compact:!0,children:qg.map(e=>(0,K.jsxs)(i_,{type:`button`,$on:x===e.value,onClick:()=>{i({align:e.value===`start`?void 0:e.value}),s(!1)},children:[h?e.vertical:e.horizontal,(0,K.jsx)(q,{name:Jg[e.value],size:16})]},e.value))})}),(0,K.jsx)(Zg,{$on:a,onClick:()=>r.dispatch({type:`setSpans`,blockId:t,spans:fr(e.spans,0,or(e.spans))}),title:a?`取消這一段的注音`:`為這一段加上注音`,children:`注`}),(0,K.jsx)(Zg,{$iconOnly:!0,$on:g,onClick:()=>i({writingMode:_===n.writingMode?void 0:_}),title:g?`轉回${n.writingMode===`vertical`?`直排`:`橫排`}`:`切換為${_===`vertical`?`直排`:`橫排`}`,"aria-label":g?`轉回${n.writingMode===`vertical`?`直排`:`橫排`}`:`切換為${_===`vertical`?`直排`:`橫排`}`,children:(0,K.jsx)(q,{name:n.writingMode===`vertical`?`writing-horizontal`:`writing-vertical`,size:20})})]})}function Xg({anchor:e,label:t,onClose:n,children:r}){let[i,a]=(0,R.useState)(null);return(0,R.useEffect)(()=>{let t=()=>{let t=e?.getBoundingClientRect();t&&a({top:t.bottom+8,left:Math.max(8,Math.min(t.left,window.innerWidth-248))})};t();let r=t=>{let r=t.target;r.closest(`[data-text-popover]`)||e&&e.contains(r)||n()},i=e=>{e.key===`Escape`&&(e.stopPropagation(),n())};return window.addEventListener(`pointerdown`,r,!0),window.addEventListener(`keydown`,i,!0),window.addEventListener(`scroll`,t,!0),()=>{window.removeEventListener(`pointerdown`,r,!0),window.removeEventListener(`keydown`,i,!0),window.removeEventListener(`scroll`,t,!0)}},[e,n]),i?(0,G.createPortal)((0,K.jsx)($g,{"data-text-popover":!0,"data-ui":!0,role:`dialog`,"aria-label":t,style:i,onPointerDown:e=>{e.target.closest(`input`)?e.stopPropagation():e.preventDefault()},children:r}),document.body):null}var Zg=B.button`
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
`,Qg=B.span`
  display: inline-block;
  inline-size: 20px;
  block-size: 20px;
  border-radius: 999px;
  border: 1.5px solid ${e=>e.theme.border.default};
  box-shadow: inset 0 0 0 1.5px ${e=>e.theme.surface.raised};
  flex-shrink: 0;
`,$g=B.div`
  position: fixed;
  z-index: 950;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.gapSm};
  border-radius: ${e=>e.theme.radius.panel};
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${e=>e.theme.surface.page};
  /* 跟 Dropdown 的選單同一款：白底圓角、只靠陰影，不畫框 */
  box-shadow: ${e=>e.theme.shadow.card};
  writing-mode: horizontal-tb;
  /* 跟工具列同字級 */
  font-size: ${e=>e.theme.typography.bodySmSize};
`,e_=B.div`
  ${ad}
`,t_=B.button`
  ${rd}
`,n_=B(t_)`
  ${id}
`,r_=B.div`
  display: flex;
  flex-direction: column;
  min-inline-size: ${e=>e.$compact?`132px`:`200px`};
`,i_=B.button`
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
`,a_=B.span`
  color: ${e=>e.theme.text.tertiary};
`;function o_(){let e=$u(),t=e?.inlineSelection??null,n=e?.selectedBlockId??null;return e?t?(0,K.jsx)(s_,{},`inline`):n?(0,K.jsx)(c_,{},n):null:null}function s_(){let e=$u(),t=e.inlineSelection,n=l_(),r=Sr(e.doc,t.blockId);if(!r||r.block.type!==`text`||!n)return null;let i=t.slice?.start??0,a=t.range.start+i,o=t.range.end+i,s=mr(r.block.spans,a,o),c=s.length>0&&s.every(e=>e.bold);return(0,K.jsx)(f_,{style:d_(n),onPointerDown:e=>e.preventDefault(),children:(0,K.jsx)(Wg,{block:r.block,blockId:t.blockId,start:a,end:o,afterFont:(0,K.jsx)(m_,{$on:c,onClick:()=>e.toggleMark(t.blockId,t.range,`bold`,!c,t.slice),title:`粗體`,children:(0,K.jsx)(q,{name:`bold`,size:20,label:`粗體`})})})})}function c_(){let e=$u(),t=e.selectedBlockId,n=u_(`[data-block-id="${CSS.escape(t)}"]`,e.doc),r=Od(),i=Ps(),a=Fc(),o=Jl(),s=Sr(e.doc,t);if(!s||!n)return null;let{block:c,row:l}=s,u=o.get(t)?.no??null;return(0,K.jsxs)(f_,{style:d_(n),onPointerDown:e=>{e.target.closest(`select, input`)||e.preventDefault()},children:[c.type===`text`&&(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(mg,{variant:`tool`,value:c.paragraph?`para`:_i.includes(c.role)?c.role:c.role===`itemTitle`||c.role===`subItemTitle`?`sectionTitle`:c.role===`lead`?`body`:`supplement`,"aria-label":`內容層級`,options:[..._i.filter(e=>e!==`supplement`).map(e=>({value:e,label:gi[e]})),{value:`para`,label:`段落`,short:u?`第 ${u} 段`:`段落`},..._i.includes(`supplement`)?[{value:`supplement`,label:gi.supplement}]:[]],onChange:n=>{let r=n===`para`?`start`:void 0,i=r?`body`:n;i!==c.role&&e.dispatch({type:`setTextRole`,blockId:t,role:i}),r!==c.paragraph&&e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{paragraph:r}})}}),(0,K.jsx)(Yg,{block:c,blockId:t,settings:e.doc.settings}),(0,K.jsx)(g_,{})]}),c.type===`shape`&&(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(Eg,{block:c,blockId:t}),(0,K.jsx)(g_,{})]}),c.type===`line`&&(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(Dg,{block:c,blockId:t}),(0,K.jsx)(g_,{})]}),c.type===`image`&&c.assetId&&(0,K.jsx)(m_,{$on:i===t,onClick:()=>Ns(i===t?null:t),$icon:!0,title:`裁切圖片`,children:(0,K.jsx)(q,{name:`crop`,size:20,label:`裁切`})}),c.type===`image`&&(0,K.jsx)(m_,{$on:c.hasCaption??c.caption.trim().length>0,onClick:()=>{let n=c.hasCaption??c.caption.trim().length>0;if(e.dispatch({type:`patchBlock`,blockId:t,blockType:`image`,patch:{hasCaption:!n}}),!n){let e=0,n=()=>{let r=document.querySelector(`[data-block-id="${t}"] figcaption[contenteditable="true"]`);if(r){r.focus();let e=window.getSelection();e?.selectAllChildren(r),e?.collapseToEnd()}else++e<10&&requestAnimationFrame(n)};requestAnimationFrame(n)}},title:c.hasCaption??c.caption.trim().length>0?`關閉圖說`:`開啟圖說`,$icon:!0,children:(0,K.jsx)(q,{name:`file-text`,size:20,label:`圖說`})}),c.type===`table`&&(0,K.jsxs)(m_,{$open:r.panel,onClick:()=>Ad(!r.panel),title:`表格樣式`,children:[`表格`,(0,K.jsx)(q,{name:`table`,size:20})]}),c.type===`pdf`&&c.assetId&&(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(m_,{onClick:()=>e.dispatch({type:`patchBlock`,blockId:t,blockType:`pdf`,patch:{page:Math.max(1,(c.page??1)-1)}}),disabled:(c.page??1)<=1,title:`上一頁`,"aria-label":`上一頁`,children:(0,K.jsx)(q,{name:`chevron-left`,size:20})}),(0,K.jsxs)(h_,{children:[`第 `,c.page??1,` 頁`]}),(0,K.jsx)(m_,{onClick:()=>e.dispatch({type:`patchBlock`,blockId:t,blockType:`pdf`,patch:{page:(c.page??1)+1}}),title:`下一頁`,"aria-label":`下一頁`,children:(0,K.jsx)(q,{name:`chevron-right`,size:20})}),(0,K.jsxs)(m_,{onClick:async()=>{let n=await co(`application/pdf`);n&&e.dispatch({type:`patchBlock`,blockId:t,blockType:`pdf`,patch:{assetId:eo(n),title:n.name,page:1}})},title:`更換 PDF 檔案`,children:[`更換`,(0,K.jsx)(q,{name:`upload`,size:20})]})]}),c.type===`audio`&&c.assetId&&(0,K.jsxs)(m_,{onClick:async()=>{let n=await co(`audio/*`);n&&e.dispatch({type:`patchBlock`,blockId:t,blockType:`audio`,patch:{assetId:eo(n),title:n.name}})},title:`更換音檔`,children:[`更換`,(0,K.jsx)(q,{name:`upload`,size:20})]}),c.type===`web`&&(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(m_,{$on:a===t,onClick:()=>{c.chosen===!1&&e.dispatch({type:`patchBlock`,blockId:t,blockType:`web`,patch:{chosen:!0}}),Ic(a===t?null:t)},title:`更改網址`,children:`更改網址`}),(0,K.jsx)(m_,{$on:c.chosen!==!1&&c.presentation===`bookmark`,onClick:()=>{Ic(null),e.dispatch({type:`patchBlock`,blockId:t,blockType:`web`,patch:{presentation:`bookmark`,chosen:!0,widthPct:100/3,blockSize:void 0}})},title:`以插入標籤呈現`,children:`標籤`}),(0,K.jsx)(m_,{$on:c.chosen!==!1&&c.presentation===`embed`,onClick:()=>{Ic(null),e.dispatch({type:`patchBlock`,blockId:t,blockType:`web`,patch:{presentation:`embed`,chosen:!0,widthPct:100,blockSize:void 0}})},title:`以內嵌網頁呈現`,children:`內嵌`})]}),pi(c.type)&&(0,K.jsx)(m_,{$on:c.popups.length>0,onClick:()=>e.openPopupPanel(t),title:`掛補充內容`,$icon:!0,children:(0,K.jsx)(q,{name:`blocks`,size:20,label:`補充`})}),(0,K.jsx)(m_,{$on:l.breakBefore,onClick:()=>e.dispatch({type:`setBreakBefore`,rowId:l.id,value:!l.breakBefore}),title:l.breakBefore?`取消這裡的換頁`:`從這一列開始換到新的一頁`,$icon:!0,children:(0,K.jsx)(q,{name:`page-break`,size:20,label:l.breakBefore?`取消換頁`:`換頁`})}),(0,K.jsx)(m_,{onClick:()=>{e.dispatch({type:`deleteBlock`,blockId:t}),e.select(null)},title:`刪除（Delete）`,$icon:!0,children:(0,K.jsx)(q,{name:`trash`,size:20,label:`刪除`})})]})}function l_(){let[e,t]=(0,R.useState)(null);return(0,R.useLayoutEffect)(()=>{let e=()=>{if(document.activeElement?.closest(`[data-text-popover]`))return;let e=document.getSelection();!e||e.rangeCount===0||e.isCollapsed||t(e.getRangeAt(0).getBoundingClientRect())};return e(),document.addEventListener(`selectionchange`,e),window.addEventListener(`scroll`,e,!0),window.addEventListener(`resize`,e),()=>{document.removeEventListener(`selectionchange`,e),window.removeEventListener(`scroll`,e,!0),window.removeEventListener(`resize`,e)}},[]),e}function u_(e,t){let[n,r]=(0,R.useState)(null),i=(0,R.useRef)(0);return(0,R.useLayoutEffect)(()=>{let t=()=>{let t=document.querySelector(e);t&&r(t.getBoundingClientRect())};return t(),i.current=requestAnimationFrame(t),window.addEventListener(`scroll`,t,!0),window.addEventListener(`resize`,t),()=>{cancelAnimationFrame(i.current),window.removeEventListener(`scroll`,t,!0),window.removeEventListener(`resize`,t)}},[e,t]),n}function d_(e){let t=Math.min(Math.max(e.left+e.width/2,168),window.innerWidth-160-8),n=e.top>72;return{left:t,top:n?e.top-12:e.bottom+12,transform:n?`translate(-50%, -100%)`:`translate(-50%, 0)`}}function f_({children:e,...t}){let[n]=(0,R.useState)(()=>document.body),r=(0,R.useRef)(null);return(0,R.useLayoutEffect)(()=>{let e=r.current;if(!e)return;e.style.marginLeft=`0px`;let t=e.getBoundingClientRect(),n=t.right>window.innerWidth-8?window.innerWidth-8-t.right:t.left<8?8-t.left:0;e.style.marginLeft=`${n}px`}),(0,G.createPortal)((0,K.jsx)(p_,{ref:r,...t,children:e}),n)}var p_=B.div`
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
`,m_=B.button`
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
`,h_=B.span`
  flex: none;
  padding: 0 2px;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: ${e=>e.theme.text.secondary};
`,g_=B.span`
  inline-size: 1px;
  block-size: 20px;
  margin-inline: 4px;
  flex-shrink: 0;
  background: ${e=>e.theme.border.subtle};
`,__=[{label:`H1`,role:`lessonTitle`,size:17,weight:700,title:`大標題（章）`},{label:`H2`,role:`sectionTitle`,size:15,weight:700,title:`中標題（節）`},{label:`H3`,role:`itemTitle`,size:13,weight:700,title:`小標題`},{label:`內文`,role:`body`,size:13,weight:400,title:`內文（一般段落）`}],v_=()=>vr(``,`body`),y_=16,b_=32,x_=96;function S_({pages:e,onSave:t,onClose:n}){let[r,i]=(0,R.useState)(()=>e.map(e=>e.length>0?e:[v_()])),[a,o]=(0,R.useState)(0),[s,c]=(0,R.useState)(null),l=(0,R.useRef)(null),u=(0,R.useRef)(null);(0,R.useEffect)(()=>{u.current?.querySelector(`[data-on]`)?.scrollIntoView({block:`nearest`,inline:`nearest`})},[a,r.length]);let d=(0,R.useRef)(null),f=fu(d),p=du,m=r[a]??[],[h,g]=(0,R.useState)(null),[_,v]=(0,R.useState)(null),[y,b]=(0,R.useState)(!1),x=(0,R.useRef)(null);(0,R.useEffect)(()=>{let e=e=>{e.key===`Escape`&&(e.stopPropagation(),n())};return window.addEventListener(`keydown`,e,!0),()=>window.removeEventListener(`keydown`,e,!0)},[n]);let S=(e,t=!0)=>{let n=20,r=()=>{let i=l.current?.querySelector(`[data-rich-id="${e}"] [contenteditable="true"]`);if(!i){--n>0&&requestAnimationFrame(r);return}i.focus();let a=window.getSelection();a&&(a.selectAllChildren(i),t?a.collapseToEnd():a.collapseToStart())};requestAnimationFrame(r)},C=e=>i(t=>t.map((t,n)=>n===a?e:t)),w=e=>{x.current=m,C(e)};(0,R.useLayoutEffect)(()=>{let e=l.current;if(!e)return;let t=[...e.querySelectorAll(`[data-rich-id]`)];if((t.length?Math.max(...t.map(e=>e.offsetTop+e.offsetHeight)):0)>lu.height-uu+1&&x.current){let e=x.current;x.current=null,C(e),b(!0);return}x.current=null}),(0,R.useEffect)(()=>{if(!y)return;let e=setTimeout(()=>b(!1),2400);return()=>clearTimeout(e)},[y]),(0,R.useEffect)(()=>g(null),[a]);let T=(e,t)=>C(m.map(n=>n.id===e?t:n)),E=(e,t)=>{let n=m.findIndex(t=>t.id===e),r=m.slice();r.splice(n+1,0,t),w(r)},D=()=>[...l.current?.querySelectorAll(`[data-rich-id]`)??[]],O=e=>{let t=D(),n=t.findIndex(t=>{let n=t.getBoundingClientRect();return e<n.top+n.height/2});return n<0?t.length:n},k=(e,t)=>{if(e.target.closest(`button, input, textarea, a, iframe, video, audio, [aria-label="調整尺寸"]`)){g(t);return}e.preventDefault(),g(t),document.activeElement?.blur?.();let n=e.clientX,r=e.clientY,i=!1,a=(e,n)=>{let r=D();for(let i=0;i<r.length;i++){let a=r[i];if(a.dataset.richId===t)continue;let o=a.getBoundingClientRect();if(n<o.top||n>o.bottom)continue;let s=(e-o.left)/(o.width||1);return s<.25&&e>=o.left-24?{index:i,side:`left`}:s>.75&&e<=o.right+24?{index:i,side:`right`}:{index:n<o.top+o.height/2?i:i+1}}return{index:O(n)}},o=e=>{let t=D();if(t.length===0)return v(null);if(e.side){let n=t[e.index],r=e.side===`left`?n.offsetLeft-9:n.offsetLeft+n.offsetWidth+7;return v({top:n.offsetTop,left:r,width:2,height:n.offsetHeight})}let n=e.index<t.length?t[e.index].offsetTop-9:t[t.length-1].offsetTop+t[t.length-1].offsetHeight+7;v({top:n,left:uu,width:lu.width-uu*2,height:2})},s=e=>{!i&&Math.hypot(e.clientX-n,e.clientY-r)<5||(i=!0,o(a(e.clientX,e.clientY)))},c=e=>{if(window.removeEventListener(`pointermove`,s),window.removeEventListener(`pointerup`,c),v(null),!i)return;let n=a(e.clientX,e.clientY),r=m.findIndex(e=>e.id===t);if(r<0)return;let o=m.slice(),[l]=o.splice(r,1),u=n.index>r?n.index-1:n.index;o.splice(u,0,{...l,float:n.side}),w(o)};window.addEventListener(`pointermove`,s),window.addEventListener(`pointerup`,c)},A=e=>{let t=m.filter(t=>t.id!==e);C(t.some(e=>e.type===`text`)?t:[...t,v_()])},ee=e=>{let t=l.current;if(!t)return 0;let n=[...t.querySelectorAll(`[data-rich-id]`)],r=n.length?Math.max(...n.map(e=>e.offsetTop+e.offsetHeight)):uu,i=m.find(t=>t.id===e),a=t.querySelector(`[data-rich-id="${e}"]`),o=i&&i.type===`text`&&!i.spans.some(e=>e.text.trim())&&a?a.offsetHeight:-16;return lu.height-uu-r+o-y_-b_},te=(e,t)=>{let n=Math.min(e,du.maxBlockSize/2);return n<x_?null:Math.max(10,Math.min(100,Math.floor(n*t/du.inlineSize*100)))},j=async e=>{let t=await co(`image/*`);if(!t)return;let{assetId:n,aspectRatio:r}=await so(t),i=te(ee(e),r);if(i===null)return b(!0);let a={id:V(`blk`),type:`image`,assetId:n,alt:t.name,caption:``,hasCaption:!1,aspectRatio:r,widthPct:i,popups:[]},o=m.findIndex(t=>t.id===e),s=m[o],l=m.slice();s&&s.type===`text`&&!s.spans.some(e=>e.text.trim())?l.splice(o,1,a):l.splice(o+1,0,a);let u=l.indexOf(a)+1;if(!l[u]||l[u].type!==`text`){let e=v_();l.splice(u,0,e),c(e.id),S(e.id)}w(l)},M=async(e,t)=>{let n=t===`audio`?ee(e)>=64?50:null:te(ee(e),16/9);if(n===null)return b(!0);let r={...Bh(t),widthPct:n};if(t===`audio`){let e=await co(`audio/*`);if(!e)return;r={...r,assetId:eo(e),title:e.name}}let i=m.findIndex(t=>t.id===e),a=m[i],o=m.slice();a&&a.type===`text`&&!a.spans.some(e=>e.text.trim())?o.splice(i,1,r):o.splice(i+1,0,r);let s=o.indexOf(r)+1;(!o[s]||o[s].type!==`text`)&&o.splice(s,0,v_()),w(o);let l=o[s];l&&(c(l.id),S(l.id))},N=(e,t)=>{if(!(t.type!==`text`||e.nativeEvent.isComposing)){if(e.key===`Enter`&&!e.shiftKey){e.preventDefault();let n=v_();E(t.id,n),c(n.id),S(n.id)}else if(e.key===`Backspace`&&!t.spans.some(e=>e.text)){let n=m.findIndex(e=>e.id===t.id);if(n<=0||m.length===1)return;e.preventDefault();let r=m[n-1];A(t.id),r.type===`text`&&(c(r.id),S(r.id))}}};(0,R.useEffect)(()=>{let e=(r[a]??[]).find(e=>e.type===`text`);e&&S(e.id)},[a,r.length]);let P=()=>{i(e=>[...e,[v_()]]),o(r.length)},F=e=>{r.length<=1||(i(t=>t.filter((t,n)=>n!==e)),o(t=>Math.max(0,t>e||t===r.length-1?t-1:t)))};return(0,G.createPortal)((0,K.jsx)(C_,{onPointerDown:e=>e.target===e.currentTarget&&n(),children:(0,K.jsxs)(w_,{role:`dialog`,"aria-label":`編輯大彈窗`,children:[(0,K.jsxs)(T_,{children:[(0,K.jsx)(D_,{role:`tablist`,"aria-label":`頁面`,ref:u,children:r.map((e,t)=>(0,K.jsxs)(O_,{type:`button`,role:`tab`,"aria-selected":t===a,"data-on":t===a||void 0,$on:t===a,onClick:()=>o(t),children:[`第 `,t+1,` 頁`,t===a&&r.length>1&&(0,K.jsx)(k_,{role:`button`,"aria-label":`刪除第 ${t+1} 頁`,onClick:e=>{e.stopPropagation(),F(t)},children:(0,K.jsx)(q,{name:`x`,size:16})})]},t))}),(0,K.jsxs)(A_,{type:`button`,onClick:P,children:[`新增頁面`,(0,K.jsx)(q,{name:`plus`,size:16})]}),(0,K.jsxs)(H_,{children:[(0,K.jsx)(U_,{type:`button`,onClick:()=>t(r.map(e=>e.filter((t,n)=>!(t.type===`text`&&!t.spans.some(e=>e.text.trim())&&n===e.length-1&&e.length>1))).filter((e,t,n)=>n.length===1||e.some(e=>e.type!==`text`||e.spans.some(e=>e.text.trim())))),children:`儲存`}),(0,K.jsx)(E_,{type:`button`,onClick:n,"aria-label":`關閉（不儲存）`,children:(0,K.jsx)(q,{name:`x`,size:24})})]})]}),(0,K.jsx)(j_,{ref:d,children:(0,K.jsxs)(M_,{ref:l,style:{transform:`scale(${f||1})`,visibility:f>0?void 0:`hidden`},onPointerDown:e=>{if(e.target!==e.currentTarget)return;e.preventDefault(),g(null);let t=m[m.length-1];if(t&&t.type===`text`)return S(t.id);let n=v_();C([...m,n]),S(n.id)},children:[f>0&&m.map(e=>(0,K.jsxs)(N_,{$hint:m.length===1||s===e.id,$fit:e.type!==`text`,"data-rich-id":e.id,$movable:h===e.id,$float:e.float,onFocusCapture:()=>{c(e.id),e.type===`text`&&g(null)},onKeyDownCapture:t=>N(t,e),onPointerDownCapture:e.type===`text`?void 0:t=>k(t,e.id),children:[h===e.id&&Wp(e)&&Ni(e,p)&&(0,K.jsx)(Kp,{mode:Wp(e),box:Ni(e,p),columnInline:p.inlineSize,vertical:!1,onResize:t=>{let n=e.type===`audio`?Math.ceil(360/Math.max(1,p.inlineSize)*100):0,r={...t,widthPct:Math.max(n,t.widthPct)};w(m.map(t=>t.id===e.id?{...t,...r}:t))}}),(0,K.jsx)($l,{block:e,settings:cu,sizing:p,onEditSpans:e.type===`text`?t=>w(m.map(n=>n.id===e.id?{...e,spans:t}:n)):void 0,onPatch:t=>T(e.id,{...e,...t})}),s===e.id&&e.type===`text`&&(0,K.jsxs)(z_,{onPointerDown:e=>e.preventDefault(),children:[__.map(t=>(0,K.jsx)(V_,{type:`button`,$on:e.role===t.role,title:t.title,"aria-pressed":e.role===t.role,style:{fontSize:t.size,fontWeight:t.weight},onClick:()=>T(e.id,{...e,role:t.role,fontSize:void 0}),children:t.label},t.role)),(0,K.jsx)(B_,{}),(0,K.jsx)(V_,{type:`button`,$on:!1,title:`插入圖片`,"aria-label":`插入圖片`,onClick:()=>void j(e.id),children:(0,K.jsx)(q,{name:`image`,size:20})}),(0,K.jsx)(V_,{type:`button`,$on:!1,title:`插入影片`,"aria-label":`插入影片`,onClick:()=>M(e.id,`video`),children:(0,K.jsx)(q,{name:`video`,size:20})}),(0,K.jsx)(V_,{type:`button`,$on:!1,title:`插入聲音`,"aria-label":`插入聲音`,onClick:()=>void M(e.id,`audio`),children:(0,K.jsx)(q,{name:`music`,size:20})}),(0,K.jsx)(V_,{type:`button`,$on:!1,title:`插入網頁`,"aria-label":`插入網頁`,onClick:()=>M(e.id,`web`),children:(0,K.jsx)(q,{name:`globe`,size:20})})]})]},e.id)),_&&(0,K.jsx)(P_,{style:_}),y&&(0,K.jsx)(F_,{role:`status`,children:`這一頁放不下了，請新增頁面`})]})}),h&&m.some(e=>e.id===h)&&(0,K.jsx)(I_,{anchorId:h,areaRef:l,onDelete:()=>{A(h),g(null)}})]})}),document.body)}var C_=B.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: grid;
  place-items: center;
  padding: 24px;
  background: ${wu};
`,w_=B.div`
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
`,T_=B.header`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
`,E_=B.button`
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
`,D_=B.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  min-inline-size: 0;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  > * { flex: none; }
`,O_=B.button`
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
`,k_=B.span`
  display: grid;
  place-items: center;
  margin-inline-end: -6px;
  inline-size: 20px;
  block-size: 20px;
  border-radius: 999px;
  &:hover { background: ${e=>e.theme.border.subtle}; }
`,A_=B.button`
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
`,j_=B.div`
  position: relative;
  flex: 0 1 auto;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  min-block-size: 0;
`,M_=B.div`
  ${yu}
  flex: none;
  /* 把手、浮出的小工具要能超出頁緣一點 */
  overflow: visible;
  /* 絕對定位置中：頁本身不參與版面，Stage 多大由彈窗決定，頁再縮放進去（不然 768 高的頁會把彈窗撐破） */
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -${lu.width/2}px;
  margin-top: -${lu.height/2}px;
  transform-origin: center;
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.raised};
  cursor: text;
`,N_=B.div`
  position: relative;
  ${e=>bu(e.$float)}
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
`,P_=B.div`
  position: absolute;
  border-radius: 999px;
  background: ${e=>e.theme.tool.border};
  pointer-events: none;
  z-index: 7;
`,F_=B.div`
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
`;function I_({anchorId:e,areaRef:t,onDelete:n}){let[r,i]=(0,R.useState)(null);return(0,R.useLayoutEffect)(()=>{let n=t.current?.querySelector(`[data-rich-id="${e}"]`),r=t.current?.getBoundingClientRect();if(!n||!r)return i(null);let a=n.getBoundingClientRect(),o={top:a.height<80?a.top+(a.height-40)/2:a.top,left:a.right+12};i(e=>e&&e.top===o.top&&e.left===o.left?e:o)}),r?(0,G.createPortal)((0,K.jsx)(L_,{style:r,onPointerDown:e=>e.stopPropagation(),children:(0,K.jsx)(R_,{type:`button`,"aria-label":`刪除這個元件`,title:`刪除`,onClick:n,children:(0,K.jsx)(q,{name:`trash`,size:20})})}),document.body):null}var L_=B.div`
  position: fixed;
  z-index: 1200;
  display: flex;
  padding: 2px;
  border-radius: 999px;
  background: ${e=>e.theme.surface.page};
  box-shadow: ${e=>e.theme.shadow.card};
`,R_=B.button`
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
`,z_=B.div`
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
`,B_=B.span`
  inline-size: 1px;
  block-size: 18px;
  margin-inline: 2px;
  background: ${e=>e.theme.border.subtle};
`,V_=B.button`
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
`,H_=B.div`
  flex: none;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
`,U_=B.button`
  ${bs}
`;function W_({title:e,message:t,confirmLabel:n=`確認`,onConfirm:r,onCancel:i}){let a=(0,R.useRef)(null);return(0,R.useEffect)(()=>{a.current?.focus();let e=e=>{e.key===`Escape`&&(e.preventDefault(),i())};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[i]),(0,G.createPortal)((0,K.jsx)(G_,{onClick:i,children:(0,K.jsxs)(K_,{role:`dialog`,"aria-modal":`true`,"aria-label":e,onClick:e=>e.stopPropagation(),children:[(0,K.jsx)(q_,{children:e}),t&&(0,K.jsx)(J_,{children:t}),(0,K.jsxs)(Y_,{children:[(0,K.jsx)(X_,{type:`button`,onClick:i,children:`取消`}),(0,K.jsx)(Z_,{ref:a,type:`button`,onClick:r,children:n})]})]})}),document.body)}var G_=B.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: ${wu};
  display: grid;
  place-items: center;
  padding: ${e=>e.theme.space.insetLg};
`,K_=B.div`
  inline-size: min(400px, 100%);
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  padding: ${e=>e.theme.space.insetLg};
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${e=>e.theme.surface.page};
  border-radius: ${e=>e.theme.radius.panel};
  box-shadow: ${e=>e.theme.shadow.float};
`,q_=B.strong`
  font-size: var(--ds-typography-body-lg-size);
  font-weight: 700;
  color: ${e=>e.theme.text.primary};
`,J_=B.p`
  margin: 0;
  font-size: var(--ds-typography-body-sm-size);
  line-height: var(--ds-typography-body-sm-line-height);
  color: ${e=>e.theme.text.secondary};
`,Y_=B.footer`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.space.gapSm};
  margin-block-start: ${e=>e.theme.space.gapMd};
`,X_=B.button`
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
`,Z_=B.button`
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
`;function Q_(){let e=$u(),t=e?.popupFor??null;cc(!!t,()=>e?.openPopupPanel(null));let n=(0,R.useRef)(e);n.current=e,(0,R.useEffect)(()=>{if(t)return()=>{let e=n.current;if(!e)return;let r=Sr(e.doc,t);if(!r)return;for(let n of r.block.popups)kr(n)&&e.dispatch({type:`removePopup`,blockId:t,popupId:n.id});let i=r.block;if(i.type===`text`&&i.rangeNotes?.some(e=>!Xr(e))){let n=new Set(i.rangeNotes.filter(e=>!Xr(e)).map(e=>e.id));e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:i.rangeNotes.filter(e=>!n.has(e.id))}}),e.dispatch({type:`setSpans`,blockId:t,spans:i.spans.map(e=>e.noteId&&n.has(e.noteId)?{...e,noteId:void 0}:e)})}}},[t]),(0,R.useEffect)(()=>{e?.popupPick&&e.popupPick.blockId!==t&&e.setPopupPick(null)},[t,e]);let[r,i]=(0,R.useState)(()=>new Set),a=e=>i(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n}),[o,s]=(0,R.useState)(null),[c,l]=(0,R.useState)(null),[u,d]=(0,R.useState)(null),f=(0,R.useRef)(null),[p,m]=(0,R.useState)(!1),h=Jl(),[g,_]=(0,R.useState)(null),v=e?.popupPick?`${e.popupPick.start}-${e.popupPick.end}`:``;if((0,R.useEffect)(()=>_(null),[t,v]),(0,R.useEffect)(()=>{if(!t)return;let n=t=>{t.key===`Escape`&&e?.openPopupPanel(null)};return window.addEventListener(`keydown`,n),()=>window.removeEventListener(`keydown`,n)},[t,e]),!e||!t)return null;let y=Sr(e.doc,t);if(!y||!pi(y.block.type))return null;let{block:b}=y,x=()=>e.openPopupPanel(null),S=b.type===`text`&&b.paragraph?h.get(b.id)?.no??null:null,C=b.type===`text`&&S!=null?b:null,w=n=>e.dispatch({type:`updatePopup`,blockId:t,item:n}),T=b.type===`text`&&e.popupPick?.blockId===t&&e.popupPick.end<=or(b.spans)&&e.popupPick.end>e.popupPick.start?e.popupPick:null,E=T&&b.type===`text`?mr(b.spans,T.start,T.end):[],D=ar(E),O=e=>{let t=E[0]?.[e];return E.length>0&&E.every(n=>n[e]===t)?t:void 0},k=O(`noteId`),A=k&&b.type===`text`?b.rangeNotes?.find(e=>e.id===k)??null:null,ee=new Set(E.map(e=>e.popupId).filter(Boolean)),te=O(`popupId`),j=new Set(Rr(b).map(e=>e.id)),M=T?b.popups.filter(e=>ee.has(Fr(e))):b.popups.filter(e=>j.has(e.id)),N=e=>T?ee.has(Fr(e)):j.has(e.id),P=n=>{!T||b.type!==`text`||e.dispatch({type:`setSpans`,blockId:t,spans:ur(b.spans,T.start,T.end,n)})},F=A?Jr(A):null,ne=!!C&&(!T||F===`sentence`),re=[...Br.map(e=>e.key),`bu`],ie=e=>(T&&A?Yr(A)[e]:C?.paraNotes?.[e])??``,ae=e=>e===`bu`?M.length>0:!!ie(e).trim(),oe=g??re.find(e=>!ae(e))??`zhi`,I=!ne||oe===`bu`,se=n=>{b.type!==`text`||!A||e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:(b.rangeNotes??[]).map(e=>e.id===A.id?{...e,...n}:e)}})},ce=(e,t)=>A&&se({kind:`sentence`,body:``,notes:{...Yr(A),[e]:t}}),L=()=>{for(let n of M)e.dispatch({type:`removePopup`,blockId:t,popupId:n.id});m(!1)},le=n=>{let r=Or(n),a=T&&te?{...r,wordGroup:te}:r;e.dispatch({type:`addPopup`,blockId:t,item:a,forWords:!!T}),T&&!te&&P({popupId:a.id}),i(e=>new Set(e).add(a.id)),a.kind===`image`||a.kind===`audio`?tv(a,w):nv(a.id)};return(0,G.createPortal)((0,K.jsxs)(lc,{role:`dialog`,"aria-label":`補充內容設定`,children:[(0,K.jsxs)(uc,{children:[(0,K.jsx)(dc,{title:T?D:void 0,style:{minInlineSize:0,overflow:`hidden`,textOverflow:`ellipsis`},children:T?`「${D}」`:C?`第 ${S} 段`:`補充內容`}),(0,K.jsx)(fc,{onClick:x,"aria-label":`關閉`,children:(0,K.jsx)(q,{name:`x`,size:24,label:`關閉`})})]}),(0,K.jsxs)(pc,{children:[C&&(0,K.jsxs)(K.Fragment,{children:[T&&A&&F!==`sentence`&&(0,K.jsx)(lv,{children:(0,K.jsxs)(Bv,{"data-popup-id":`rnote-${A.id}`,$open:!0,children:[(0,K.jsxs)(qv,{children:[(0,K.jsx)(Uv,{"aria-hidden":!0,$filled:!!A.body.trim(),children:Kr.find(e=>e.key===F).dot}),(0,K.jsx)(Wv,{children:Kr.find(e=>e.key===F).note})]}),(0,K.jsx)(Kv,{value:A.body,placeholder:`例：音ㄕˋ，愛好。`,"aria-label":`「${D}」的註釋`,onChange:e=>se({body:e.target.value})})]})}),ne&&(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(Vv,{role:`tablist`,"aria-label":T?`「${D}」的說明`:`第 ${S} 段的說明`,children:re.map(e=>{let t=e===`bu`?null:Br.find(t=>t.key===e),n=t?t.name:`補充`;return(0,K.jsx)(Hv,{type:`button`,role:`tab`,"aria-selected":oe===e,"aria-label":`${n}${ae(e)?``:`（還沒填）`}`,title:n,$filled:ae(e),$on:oe===e,onClick:()=>{_(e),e!==`bu`&&nv(`note-${e}`)},children:t?t.btn:(0,K.jsx)(q,{name:`blocks`,size:20})},e)})}),oe!==`bu`&&(()=>{let n=Br.find(e=>e.key===oe);return(0,K.jsx)(lv,{children:(0,K.jsxs)(Bv,{"data-popup-id":`note-${n.key}`,$open:!0,children:[(0,K.jsx)(qv,{children:(0,K.jsx)(Wv,{children:n.name})}),(0,K.jsx)(Kv,{value:ie(n.key),placeholder:`輸入${n.name}`,"aria-label":T?`「${D}」的${n.name}`:n.name,onChange:r=>T?ce(n.key,r.target.value):e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{paraNotes:{...C.paraNotes,[n.key]:r.target.value}}})})]})},n.key)})()]}),T&&A&&F!==`sentence`&&(0,K.jsxs)(Yv,{children:[(0,K.jsx)(Uv,{"aria-hidden":!0,$filled:M.length>0,children:(0,K.jsx)(q,{name:`blocks`,size:16})}),(0,K.jsx)(Wv,{children:`補充`})]})]}),I&&(0,K.jsxs)(K.Fragment,{children:[M.length>0&&(0,K.jsxs)(dv,{children:[(0,K.jsx)(q,{name:Er[M[0].kind].icon,size:20}),(0,K.jsx)(fv,{children:Er[M[0].kind].label}),(0,K.jsx)(pv,{type:`button`,onClick:()=>{M.some(e=>!kr(e))?m(!0):L()},children:`更換`})]}),M.length>0&&(0,K.jsx)(lv,{children:b.popups.map((n,i)=>{if(!N(n))return null;let f=n.kind===`rich`,p=f||r.has(n.id),m=kr(n);return(0,K.jsxs)(uv,{"data-popup-id":n.id,$single:f,draggable:o===n.id,$dragging:c===i,$dropBefore:u===i&&c!==null&&c!==i&&c!==i-1,$dropAfter:u===i+1&&i===b.popups.length-1&&c!==null&&c!==i,onDragStart:e=>{e.dataTransfer.effectAllowed=`move`,l(i)},onDragOver:e=>{if(c===null)return;e.preventDefault();let t=e.currentTarget.getBoundingClientRect();d(e.clientY<t.top+t.height/2?i:i+1)},onDrop:n=>{if(n.preventDefault(),c!==null&&u!==null){let n=u>c?u-1:u;n!==c&&e.dispatch({type:`reorderPopups`,blockId:t,from:c,to:n})}l(null),d(null),s(null)},onDragEnd:()=>{l(null),d(null),s(null)},children:[(0,K.jsxs)(mv,{children:[M.length>1&&(0,K.jsx)(hv,{"data-hover-only":!0,"aria-label":`拖曳排序`,title:`拖曳排序`,onPointerDown:()=>s(n.id),onPointerUp:()=>s(null),children:(0,K.jsx)(q,{name:`grip`,size:16})}),f?(0,K.jsx)(_v,{"aria-expanded":!0}):(0,K.jsxs)(vv,{type:`button`,onClick:()=>a(n.id),"aria-expanded":p,"aria-label":p?`收合`:m?`${Er[n.kind].label}，${m}`:void 0,$compact:p&&n.kind!==`web`,children:[(0,K.jsx)(yv,{children:(0,K.jsx)(q,{name:p?`chevron-down`:`chevron-right`,size:16})}),!(p&&n.kind!==`web`)&&(0,K.jsx)(bv,{$empty:!iv(n,null),children:iv(n,null)||`未命名`})]}),p&&n.kind!==`web`&&(0,K.jsx)(gv,{value:n.title,placeholder:`標題（選填）`,"aria-label":`標題（選填）`,onChange:e=>w({...n,title:e.target.value})}),m&&!p&&(0,K.jsx)(xv,{title:m,children:`未完成`}),(0,K.jsx)(Sv,{"data-faint":!p||void 0,onClick:()=>e.dispatch({type:`removePopup`,blockId:t,popupId:n.id}),"aria-label":`刪除這一項`,children:(0,K.jsx)(q,{name:`trash`,size:16,label:`刪除`})})]}),p&&(0,K.jsx)(K.Fragment,{children:(0,K.jsx)($_,{item:n,onChange:w})})]},n.id)})}),(0,K.jsx)(Nv,{ref:f,$open:!1,children:M.length>0&&M[0].kind===`rich`?null:M.length>0?(0,K.jsxs)(Pv,{type:`button`,$open:!1,onClick:()=>le(M[0].kind),children:[`新增`,rv[M[0].kind],(0,K.jsx)(q,{name:`plus`,size:16})]}):(0,K.jsx)(Fv,{role:`menu`,children:Dr.map(e=>(0,K.jsxs)(Iv,{type:`button`,role:`menuitem`,onClick:()=>le(e),children:[(0,K.jsx)(q,{name:Er[e].icon,size:20}),(0,K.jsx)(`span`,{children:Er[e].label})]},e))})})]}),C&&!T&&(C.rangeNotes?.length??0)>0&&(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(Lv,{}),(0,K.jsx)(Rv,{children:(0,K.jsx)(zv,{children:`標記的字詞與句子`})}),(0,K.jsx)(lv,{children:C.rangeNotes.map(n=>{let r=Kr.find(e=>e.key===Jr(n)),i=C.spans.filter(e=>e.noteId===n.id).map(e=>e.text).join(``),a=r.key===`sentence`;return(0,K.jsxs)(Bv,{"data-popup-id":`rnote-${n.id}`,$open:!0,children:[(0,K.jsxs)(qv,{children:[(0,K.jsx)(Uv,{"aria-hidden":!0,$filled:Xr(n),children:r.dot}),(0,K.jsxs)(Jv,{title:i,children:[`「`,i,`」`]}),(0,K.jsx)(Sv,{onClick:()=>{e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:C.rangeNotes.filter(e=>e.id!==n.id)}}),e.dispatch({type:`setSpans`,blockId:t,spans:C.spans.map(e=>e.noteId===n.id?{...e,noteId:void 0}:e)})},"aria-label":`刪除這則${r.note}`,children:(0,K.jsx)(q,{name:`trash`,size:16,label:`刪除`})})]}),a?(0,K.jsx)(Gv,{as:`p`,style:{whiteSpace:`normal`},children:Br.filter(e=>Yr(n)[e.key]?.trim()).map(e=>`${e.name}：${Yr(n)[e.key].trim()}`).join(`　`)||`還沒填`}):(0,K.jsx)(Kv,{value:n.body,"aria-label":`「${i}」的${r.note}`,onChange:r=>e.dispatch({type:`patchBlock`,blockId:t,blockType:`text`,patch:{rangeNotes:C.rangeNotes.map(e=>e.id===n.id?{...e,body:r.target.value}:e)}})})]},n.id)})})]})]}),p&&M.length>0&&(0,K.jsx)(W_,{title:`要更換類型嗎？`,message:`已加入的${M.length>1?` ${M.length} ${rv[M[0].kind].slice(1)}`:``}${Er[M[0].kind].label}會一併刪除。`,confirmLabel:`更換`,onConfirm:L,onCancel:()=>m(!1)})]}),document.body)}function $_({item:e,onChange:t}){let n=$u();switch(e.kind){case`text`:return(0,K.jsxs)(Cv,{children:[(0,K.jsxs)(`span`,{children:[`內容`,(0,K.jsx)(Av,{children:`（選填）`})]}),(0,K.jsx)(Tv,{value:e.body,rows:3,onChange:n=>t({...e,body:n.target.value})})]});case`image`:return(0,K.jsx)(cv,{done:!!e.assetId,label:e.assetId?`更換圖片`:`上傳圖片`,preview:$a(e.assetId),onPick:()=>void tv(e,t)});case`audio`:return(0,K.jsx)(cv,{done:!!e.assetId,label:e.assetId?`更換音檔`:`上傳音檔`,onPick:()=>void tv(e,t)});case`video`:{let n=e.source===`upload`&&!!e.ref;return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(sv,{label:`YouTube 網址`,value:e.source===`youtube`?e.ref:``,placeholder:`貼上 YouTube 網址`,onChange:n=>t({...e,ref:n,source:`youtube`})}),(0,K.jsx)(Ev,{children:`或`}),(0,K.jsx)(cv,{done:n,label:n?`更換影片`:`上傳影片`,onPick:async()=>{let n=await co(`video/*`);n&&t({...e,source:`upload`,ref:eo(n)})}})]})}case`web`:return(0,K.jsx)(sv,{label:`網址`,value:e.url,placeholder:`貼上網址（https://…）`,onChange:n=>{let r={...e,url:n,title:Ac(n)};t(r),clearTimeout(ev),ev=window.setTimeout(()=>{kc(n).then(e=>{e&&t({...r,title:e})})},600)}});case`rich`:return(0,K.jsx)(ov,{item:e,onChange:t});case`jump`:return(0,K.jsxs)(Cv,{children:[`目標段落`,(0,K.jsx)(mg,{value:e.targetRowId??``,"aria-label":`跳到哪一段`,placeholder:`還沒選`,options:(n?.doc.rows??[]).map((e,t)=>({value:e.id,label:`第 ${t+1} 段 · ${av(e)}`})),onChange:n=>t({...e,targetRowId:n||null})})]})}}var ev=0;async function tv(e,t){if(e.kind===`image`){let n=await co(`image/*`);if(!n)return;let{assetId:r}=await so(n);t({...e,assetId:r})}else if(e.kind===`audio`){let n=await co(`audio/*`);if(!n)return;t({...e,assetId:eo(n)})}}function nv(e){let t=20,n=()=>{let r=document.querySelector(`[data-popup-id="${e}"] input:not([type="file"]), [data-popup-id="${e}"] textarea`);r?r.focus():--t>0&&requestAnimationFrame(n)};requestAnimationFrame(n)}var rv={text:`一則`,rich:`一個`,image:`一張`,video:`一支`,audio:`一段`,web:`一個`,jump:`一個`};function iv(e,t){if(t)return t;switch(e.kind){case`text`:return e.title||e.body;case`web`:return e.title||e.url;case`video`:return e.title||(e.source===`upload`?Qa(e.ref)?.name??``:e.ref);case`image`:case`audio`:return e.title||(e.assetId?Qa(e.assetId)?.name??``:``);default:return e.title}}function av(e){let t=e.columns[0]?.blocks[0];return t?t.type===`text`?yr(t).slice(0,16)||`空白文字`:t.type:`空的`}function ov({item:e,onChange:t}){let[n,r]=(0,R.useState)(!1),i=jr(e);return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(Dv,{children:[(0,K.jsxs)(Ov,{type:`button`,onClick:()=>r(!0),children:[`編輯內容`,(0,K.jsx)(q,{name:`pencil`,size:16})]}),(0,K.jsxs)(kv,{children:[`共 `,i.length,` 頁`]})]}),n&&(0,K.jsx)(S_,{title:e.title,pages:i,onClose:()=>r(!1),onSave:n=>{t(Mr(e,n)),r(!1)}})]})}function sv({label:e,value:t,placeholder:n,onChange:r}){return(0,K.jsx)(wv,{"aria-label":e,value:t,placeholder:n,onChange:e=>r(e.target.value)})}function cv({done:e,label:t,onPick:n,preview:r}){return(0,K.jsxs)(K.Fragment,{children:[r&&(0,K.jsx)(Mv,{src:r,alt:``}),(0,K.jsxs)(jv,{$done:e,onClick:n,children:[t,!e&&(0,K.jsx)(q,{name:`upload`,size:16})]})]})}var lv=B.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,uv=B.div`
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
`,dv=B.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
  padding: 0 4px 0 ${e=>e.theme.space.insetSm};
  min-block-size: 40px;
  border-radius: ${e=>e.theme.radius.tile};
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.icon.default};
`,fv=B.span`
  flex: 1;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  color: ${e=>e.theme.text.primary};
`,pv=B.button`
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
`,mv=B.div`
  position: relative;
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${e=>e.theme.text.secondary};
`,hv=B.span`
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
`,gv=B.input`
  ${gc}
  flex: 1;
  min-inline-size: 0;
  min-block-size: 32px;
  font-size: var(--ds-typography-caption-size);
  &::placeholder { color: ${e=>e.theme.text.placeholder}; }
  padding-inline: 8px 12px;
`,_v=B.span`
  display: none;
`,vv=B.button`
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
`,yv=B.span`
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 24px;
  block-size: 24px;
  border-radius: 999px;
  button:hover > &, button:focus-visible > & { background: ${e=>e.theme.surface.muted}; }
`,bv=B.span`
  flex: 1;
  padding-inline-start: 8px;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  /* 沒有標題時「未命名」用淡灰——是提示，不是內容 */
  color: ${e=>e.$empty?e.theme.text.tertiary:e.theme.text.primary};
`,xv=B.span`
  flex: none;
  padding: 1px 8px;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.feedback.warningSurface};
  color: ${e=>e.theme.feedback.warningDefault};
  font-size: var(--ds-typography-label-size);
  line-height: 18px;
`,Sv=B(fc)`
  flex: none;
  justify-content: center;
  inline-size: 32px;
  block-size: 32px;
  min-block-size: 0;
  padding: 0;
  transition: opacity 0.12s;
`,Cv=B.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.text.secondary};
`,wv=B.input`
  ${gc}
  min-block-size: 32px;
  font-size: var(--ds-typography-caption-size);
`,Tv=B.textarea`
  ${_c}
  font-size: var(--ds-typography-caption-size);
`,Ev=B.span`
  align-self: center;
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.tertiary};
`,Dv=B.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapSm};
`,Ov=B.button`
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
`,kv=B.span`
  flex: none;
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.tertiary};
`,Av=B.span`
  color: ${e=>e.theme.text.tertiary};
`,jv=B.button`
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
`,Mv=B.img`
  display: block;
  align-self: stretch;
  block-size: 140px;
  object-fit: contain;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.theme.surface.sunken};
`,Nv=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  border-radius: ${e=>e.theme.radius.panel};
  ${e=>e.$open&&`
    padding: ${e.theme.space.insetXs};
    background: ${e.theme.surface.raised};
  `}
`,Pv=B.button`
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
`,Fv=B.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${e=>e.theme.space.gapSm};
`,Iv=B.button`
  ${vp}
  block-size: auto;
  aspect-ratio: 1;
  background: ${e=>e.theme.surface.raised};
  ${Nv}[data-open] & { background: ${e=>e.theme.surface.sunken}; }
  ${Nv}[data-open] &:hover { background: ${e=>e.theme.surface.muted}; }
`,Lv=B.hr`
  margin: ${e=>e.theme.space.gapSm} 0 0;
  border: none;
  border-block-start: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
`,Rv=B.div`
  display: flex;
  align-items: baseline;
  gap: ${e=>e.theme.space.gapSm};
  padding-inline: ${e=>e.theme.space.insetXs};
`,zv=B.span`
  font-size: var(--ds-typography-label-size);
  font-weight: 500;
  color: ${e=>e.theme.text.secondary};
`,Bv=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  padding: 4px ${e=>e.theme.space.insetXs};
  border-radius: ${e=>e.theme.radius.tile};
  ${e=>e.$open?`background: ${e.theme.surface.raised}; padding-block-end: ${e.theme.space.insetXs}; box-shadow: ${e.theme.shadow.card};`:`&:hover { background: ${e.theme.surface.sunken}; }`}
`,Vv=B.div`
  display: flex;
  justify-content: space-between;
  padding: 4px ${e=>e.theme.space.insetXs} ${e=>e.theme.space.gapSm};
`,Hv=B.button`
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
`,Uv=B.span`
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
`,Wv=B.span`
  flex: none;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  color: ${e=>e.theme.text.primary};
`,Gv=B.span`
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,Kv=B.textarea`
  ${_c}
  field-sizing: content;
  min-block-size: 56px;
  font-size: var(--ds-typography-body-sm-size);
  resize: none;
`,qv=B.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-block-size: 36px;
`,Jv=B.span`
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  color: ${e=>e.theme.text.primary};
`,Yv=B(qv)`
  padding-inline: ${e=>e.theme.space.insetXs};
`;function Xv(e){let t=[];for(let n of e.rows)for(let e of n.columns)for(let r of e.blocks){if(r.type!==`text`)continue;let e=vi.indexOf(r.role);if(e<0)continue;let i=yr(r).trim();i&&t.push({rowId:n.id,role:r.role,depth:e,text:i})}return t}function Zv(e,t){return e.findIndex(e=>e.items.some(e=>e.row.id===t))}var Qv=new Set([`。`,`！`,`？`,`；`,`…`,`!`,`?`,`;`]),$v=new Set([`」`,`』`,`）`,`】`,`〕`,`》`,`〉`,`"`,`'`,`)`,`]`]);function ey(e){let t=[],n=Array.from(e),r=0,i=0,a=0,o=n=>{e.slice(i,n).trim().length>0&&t.push({start:i,end:n})};for(;a<n.length;){let e=n[a],t=e.length;if(e===`
`){o(r),r+=t,i=r,a+=1;continue}if(Qv.has(e)){let e=a+1,s=r+t;for(;e<n.length&&(Qv.has(n[e])||$v.has(n[e]));)s+=n[e].length,e+=1;o(s),r=s,i=r,a=e;continue}r+=t,a+=1}return o(r),t}function ty(e,t){if(e.length===0)return-1;for(let n=0;n<e.length;n+=1)if(t<e[n].end)return n;return e.length-1}function ny(e,t,n){let{para:r,index:i}=t;for(i+=n;i<0||i>=(e[r]??0);){if(r+=n,r<0||r>=e.length)return null;i=n>0?0:e[r]-1}return{para:r,index:i}}function ry(e){return ds(e).map(e=>e.data).join(``)}function iy(e,t){let n=ms(e,t.start),r=ms(e,t.end),i=document.createRange();return i.setStart(n.node,n.offset),i.setEnd(r.node,r.offset),i}function ay(e,t){let n=0;for(let r of ds(e)){if(t.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_FOLLOWING)break;n+=r.length}return n}function oy(e){return!!e&&e.classList.contains(`ds-rich`)&&!e.isContentEditable}function sy(e){return Array.from(e.querySelectorAll(`.ds-rich`)).filter(e=>oy(e)&&ry(e).trim().length>0)}function cy(e,t,n){let r=document.elementFromPoint(t,n)?.closest(`.ds-rich`)??null;if(!oy(r)||!e.contains(r))return null;let i=null,a=0;if(typeof document.caretPositionFromPoint==`function`){let e=document.caretPositionFromPoint(t,n);if(!e)return null;i=e.offsetNode,a=e.offset}else if(typeof document.caretRangeFromPoint==`function`){let e=document.caretRangeFromPoint(t,n);if(!e)return null;i=e.startContainer,a=e.startOffset}if(!i||!e.contains(i))return null;let o=i.nodeType===Node.TEXT_NODE?i.parentElement:i,s=o?.closest(`.ds-rich`)??null;if(!oy(s)||s!==r)return null;let c=o?.closest(`rt, [data-fn]`);if(c)return{rich:s,offset:ay(s,c)};if(i.nodeType===Node.ELEMENT_NODE&&i!==s){let e=i.childNodes[a];return e?{rich:s,offset:ay(s,e)}:{rich:s,offset:ay(s,i)+ry(i).length}}return{rich:s,offset:ps(s,i,a)}}var ly=`sentence-focus`,uy=`sentence-mark`,dy=`sentence-dimmed`;function fy(){return typeof CSS<`u`&&`highlights`in CSS&&typeof Highlight==`function`}function py({active:e,root:t,decide:n,onBlank:r,onMove:i}){let a=(0,R.useRef)({decide:n,onBlank:r,onMove:i});return a.current={decide:n,onBlank:r,onMove:i},(0,R.useEffect)(()=>{let n=t.current;if(!e||!n)return;if(!fy()){console.info(`逐句聚焦需要 CSS Custom Highlight API，這個瀏覽器不支援，功能未啟用。`);return}let r=null,i=!1,o=()=>{if(!r)return;let e=iy(r.rich,r.span);CSS.highlights.set(ly,new Highlight(e)),i?CSS.highlights.set(uy,new Highlight(e)):CSS.highlights.delete(uy),n.classList.add(dy),(e.startContainer.parentElement??r.rich).scrollIntoView({block:`nearest`,inline:`nearest`}),a.current.onMove?.({rich:r.rich,start:r.span.start,end:r.span.end})},s=()=>{let e=!!r;r=null,i=!1,CSS.highlights.delete(ly),CSS.highlights.delete(uy),n.classList.remove(dy),e&&a.current.onMove?.(null)},c=(e,t)=>{let n=ey(ry(e));t.end<=t.start||((r?.rich!==e||r.span.start!==t.start||r.span.end!==t.end)&&(i=!1),r={rich:e,sentences:n,index:Math.max(0,ty(n,t.start)),span:t},o())},l=(e,t)=>{let n=ey(ry(e));t<0||t>=n.length||c(e,n[t])},u=e=>e.defaultPrevented||!!e.target?.closest?.(`button, a, [role="button"]`),d=e=>{if(u(e))return;let t=cy(n,e.clientX,e.clientY);if(!t){s(),a.current.onBlank?.();return}let r=a.current.decide?.(t.rich,t.offset,e.target,e)??{kind:`sentence`};if(r.kind===`stop`)return s();if(r.kind===`range`)return c(t.rich,{start:r.start,end:r.end});let i=ty(ey(ry(t.rich)),t.offset);if(i<0)return s();l(t.rich,i)},f=e=>{if(u(e))return;let t=cy(n,e.clientX,e.clientY);!t||!r||t.rich!==r.rich||t.offset<r.span.start||t.offset>r.span.end||(i=!i,o(),document.getSelection()?.removeAllRanges())},p=e=>{if(!r)return;let t=sy(n),i=t.indexOf(r.rich);if(i<0)return s();let a=ny(t.map(e=>ey(ry(e)).length),{para:i,index:r.index},e);a&&l(t[a.para],a.index)},m=e=>{if(!r)return;if(e.key===`Escape`){s(),a.current.onBlank?.(),e.stopPropagation();return}let t=!!n.querySelector(`[data-vertical]`),i=t?`ArrowDown`:`ArrowRight`,o=t?`ArrowUp`:`ArrowLeft`;(e.key===i||e.key===o)&&(e.preventDefault(),e.stopPropagation(),p(e.key===i?1:-1))},h=new MutationObserver(()=>{r&&!r.rich.isConnected&&s()});return h.observe(n,{childList:!0,subtree:!0}),n.addEventListener(`click`,d),n.addEventListener(`dblclick`,f),document.addEventListener(`keydown`,m,!0),()=>{h.disconnect(),n.removeEventListener(`click`,d),n.removeEventListener(`dblclick`,f),document.removeEventListener(`keydown`,m,!0),s()}},[e,t]),null}var my=(e,t)=>{for(let n of e.columns)for(let e of n.blocks)if(e.type===`text`&&e.role===t){let t=yr(e).trim();if(t)return t}return null};function hy(e){let t=new Set,n=[];for(let r of e.items)for(let e of r.row.columns)for(let r of e.blocks)Pr(r).length===0||t.has(r.id)||(t.add(r.id),n.push(r));return n}function gy(e,t,n){let r=new Map;t.forEach(e=>e.items.forEach(t=>r.has(t.row.id)||r.set(t.row.id,e.index)));let i=t[n]?.items[0]?.row.id,a=e.rows.findIndex(e=>e.id===i);if(a<0)return{};let o=-1,s=-1;for(let t=a;t>=0;t--)if(s<0&&my(e.rows[t],`sectionTitle`)&&(s=t),my(e.rows[t],`lessonTitle`)){o=t;break}s<o&&(s=-1);let c=(t,n)=>{let i=[];for(let a=t;a<e.rows.length;a++){let o=e.rows[a];if(a>t&&n(o))break;for(let e of o.columns)for(let t of e.blocks)Pr(t).length>0&&i.push({block:t,page:r.get(o.id)??0,rowId:o.id})}return i},l=e=>!!my(e,`lessonTitle`),u={};return o>=0&&(u.chapter={kind:`chapter`,title:my(e.rows[o],`lessonTitle`),entries:c(o,l)}),s>=0&&(u.section={kind:`section`,title:my(e.rows[s],`sectionTitle`),entries:c(s,e=>l(e)||!!my(e,`sectionTitle`))}),u}function _y(e,t){if(e.type===`text`){let n=yr(e).trim();return n?n.length>t?`${n.slice(0,t)}…`:n:`空白文字`}if(e.type===`image`)return`圖：${e.caption.trim()||e.alt.trim()||`未命名`}`;let n=fi[e.type].label;return e.label?`${n}：${e.label}`:n}var vy=[`text`,`image`,`video`,`audio`,`web`,`jump`],yy=e=>e===`rich`?`text`:e;function by({doc:e,pages:t,current:n,open:r,onClose:i,onOpen:a,onGoRow:o}){let[s,c]=(0,R.useState)(`page`),[l,u]=(0,R.useState)(`text`);(0,R.useEffect)(()=>{r&&c(`page`)},[r]);let d=e.settings.writingMode===`vertical`,f=t[n],p=(0,R.useMemo)(()=>gy(e,t,n),[e,t,n]),m=(0,R.useMemo)(()=>f?hy(f):[],[f]),h=(0,R.useMemo)(()=>Vr(e.rows),[e.rows]),g=Sy(r),_=s===`page`?null:p[s]??null,v=_?s:`page`,y=(_?.entries??[]).flatMap(e=>Pr(e.block).map(t=>({...e,item:t}))),b=vy.filter(e=>y.some(t=>yy(t.item.kind)===e)),x=b.includes(l)?l:b[0],S=[...p.chapter?[{value:`chapter`,label:`本章：${p.chapter.title}`}]:[],...p.section?[{value:`section`,label:`本節：${p.section.title}`}]:[],{value:`page`,label:`第 ${n+1} 頁`}],C=(e,t,n)=>(0,K.jsx)(Cy,{item:t,icon:n,playing:g.playing===t.id,progress:g.playing===t.id?g.progress:0,onOpen:()=>t.kind===`audio`?g.toggle(t):a(e,t)},t.id);return r?(0,G.createPortal)((0,K.jsxs)(ky,{id:`supplement-panel`,role:`dialog`,"aria-label":`補充資源`,$side:d?`left`:`right`,children:[(0,K.jsxs)(uc,{children:[(0,K.jsx)(dc,{children:`補充資源`}),(0,K.jsx)(fc,{type:`button`,onClick:i,"aria-label":`關閉`,title:`關閉`,children:(0,K.jsx)(q,{name:`x`,size:24,label:`關閉`})})]}),(0,K.jsx)(Ay,{children:S.length>1?(0,K.jsx)(mg,{variant:`tool`,"aria-label":`範圍`,value:v,options:S,onChange:e=>c(e)}):(0,K.jsx)(jy,{children:S[S.length-1].label})}),v!==`page`&&b.length>0&&(0,K.jsx)(My,{role:`tablist`,"aria-label":`資源類別`,$few:b.length<4,children:b.map(e=>(0,K.jsx)(hc,{type:`button`,role:`tab`,"aria-selected":e===x,$on:e===x,onClick:()=>u(e),children:Er[e].label},e))}),(0,K.jsx)(Ny,{children:v===`page`?m.length===0?(0,K.jsx)(Ty,{title:`這一頁沒有補充資源`,action:p.section||p.chapter?{label:p.section?`看本節的資源`:`看本章的資源`,onClick:()=>c(p.section?`section`:`chapter`)}:void 0}):m.map(e=>{let t=h.get(e.id);return(0,K.jsxs)(Py,{children:[(0,K.jsxs)(Fy,{children:[t&&(0,K.jsx)(Iy,{children:Wr(t.no,d)}),(0,K.jsx)(`span`,{children:_y(e,t?8:16)})]}),(0,K.jsx)(Ly,{children:Pr(e).map(t=>C(e,t,!0))})]},e.id)}):y.length===0?(0,K.jsx)(Ty,{title:v===`section`?`這一節沒有補充資源`:`這一章沒有補充資源`}):xy(y.filter(e=>yy(e.item.kind)===x)).map(([e,t])=>{let r=e===n;return(0,K.jsxs)(Py,{children:[(0,K.jsxs)(Ky,{type:`button`,$here:r,onClick:()=>o(t[0].rowId),"aria-current":r?`page`:void 0,title:r?`就在這一頁`:`翻到第 ${e+1} 頁`,children:[`第 `,e+1,` 頁`,r?`・目前這頁`:(0,K.jsx)(q,{name:`arrow-right`,size:16})]}),(0,K.jsx)(Ly,{children:t.map(e=>C(e.block,e.item,!1))})]},e)})},`${v}-${v===`page`?n:x}`)]}),document.body):null}function xy(e){let t=new Map;for(let n of e)t.set(n.page,[...t.get(n.page)??[],n]);return[...t.entries()].sort((e,t)=>e[0]-t[0])}function Sy(e){let t=(0,R.useRef)(null),[n,r]=(0,R.useState)(null),[i,a]=(0,R.useState)(0),o=()=>{t.current?.pause(),t.current=null,r(null),a(0)};return(0,R.useEffect)(()=>{e||o()},[e]),(0,R.useEffect)(()=>()=>t.current?.pause(),[]),{playing:n,progress:i,toggle:e=>{if(n===e.id)return o();t.current?.pause();let i=new Audio($a(e.assetId));i.ontimeupdate=()=>a(i.duration?i.currentTime/i.duration:0),i.onended=o,t.current=i,a(0),r(e.id),i.play().catch(()=>{})}}}function Cy({item:e,icon:t,playing:n,progress:r,onOpen:i}){let a=Nr(e)||e.kind===`audio`&&e.assetId&&Qa(e.assetId)?.name||``,o=e.kind===`image`||e.kind===`video`?(0,K.jsx)(wy,{item:e}):e.kind===`audio`?(0,K.jsxs)(Uy,{$on:n,"aria-hidden":!0,children:[n&&(0,K.jsx)(Wy,{viewBox:`0 0 36 36`,children:(0,K.jsx)(`circle`,{cx:`18`,cy:`18`,r:`17`,pathLength:1,strokeDasharray:`${r} 1`})}),(0,K.jsx)(q,{name:n?`pause`:`play`,size:16})]}):t?(0,K.jsx)(By,{children:(0,K.jsx)(q,{name:Er[e.kind].icon,size:20})}):null;return(0,K.jsxs)(Ry,{type:`button`,onClick:i,$lead:!!o,"aria-label":e.kind===`audio`?`${n?`暫停`:`播放`} ${a}`:void 0,children:[o,(0,K.jsx)(Gy,{children:a})]})}function wy({item:e}){let t=null;if(e.kind===`image`){let n=$a(e.assetId);n&&(t=(0,K.jsx)(`img`,{src:n,alt:``}))}else{let n=e.source===`youtube`?lo(e.ref):null,r=n?null:$a(e.ref);n?t=(0,K.jsx)(`img`,{src:`https://img.youtube.com/vi/${n}/mqdefault.jpg`,alt:``}):r&&(t=(0,K.jsx)(`video`,{src:`${r}#t=0.1`,muted:!0,preload:`metadata`,playsInline:!0}))}return(0,K.jsxs)(Vy,{children:[t??(0,K.jsx)(q,{name:Er[e.kind].icon,size:20}),e.kind===`video`&&t&&(0,K.jsx)(Hy,{children:(0,K.jsx)(q,{name:`play`,size:16})})]})}function Ty({title:e,action:t}){return(0,K.jsxs)(qy,{children:[(0,K.jsx)(`strong`,{children:e}),t&&(0,K.jsxs)(Jy,{type:`button`,onClick:t.onClick,children:[t.label,(0,K.jsx)(q,{name:`blocks`,size:16})]})]})}var Ey=e=>Wn`
  from { opacity: 0; transform: translateX(${e}px); }
  to { opacity: 1; transform: none; }
`,Dy=Wn`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
`,Oy=`cubic-bezier(0.2, 0.8, 0.2, 1)`,ky=B(lc)`
  z-index: 940;
  /* 跟頁面卡片上下切齊（閱讀畫面四周留 12）；靠左時貼著左欄，跟工具箱、目次同一個位置 */
  top: 12px;
  bottom: 12px;
  right: 12px;
  ${e=>e.$side===`left`&&`right: auto; left: var(--reader-rail, 104px);`}
  animation: ${e=>Ey(e.$side===`left`?-16:16)} 0.22s ${Oy};
  @media (prefers-reduced-motion: reduce) { animation: none; }
`,Ay=B.div`
  display: flex;
  padding: 2px 20px 0 8px;
  flex-shrink: 0;
`,jy=B.span`
  padding: 6px 12px;
  font-size: var(--ds-typography-body-sm-size);
  color: ${e=>e.theme.text.secondary};
`,My=B(mc)`
  ${e=>e.$few&&`justify-content: flex-start; gap: 24px;`}
`,Ny=B(pc)`
  padding-top: ${e=>e.theme.space.insetSm};
  gap: ${e=>e.theme.space.stackMd};
  animation: ${Dy} 0.18s ${Oy};
  @media (prefers-reduced-motion: reduce) { animation: none; }
`,Py=B.section`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
`,Fy=B.h3`
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
`,Iy=B.span`
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
`,Ly=B.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.raised};
`,Ry=B.button`
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
`,zy=z`
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  block-size: 36px;
  border-radius: 10px;
  background: ${e=>e.theme.surface.sunken};
  color: ${e=>e.theme.icon.default};
`,By=B.span`
  ${zy}
  inline-size: 36px;
  transition: background 0.12s;
  /* 滑過時整列變灰，圖示格也是灰的就糊成一塊：圖示格改成白底，跟著那一列浮出來 */
  ${Ry}:hover & { background: ${e=>e.theme.surface.raised}; }
  ${Ry}:active & { background: ${e=>e.theme.surface.raised}; }
`,Vy=B.span`
  ${zy}
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
    transition: transform 0.2s ${Oy};
  }
`,Hy=B.span`
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
`,Uy=B.span`
  ${zy}
  inline-size: 36px;
  border-radius: 999px;
  background: ${e=>e.$on?e.theme.surface.raised:e.theme.surface.sunken};
  box-shadow: ${e=>e.$on?e.theme.shadow.card:`none`};
  transition: background 0.15s, box-shadow 0.15s;
`,Wy=B.svg`
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
`,Gy=B.span`
  flex: 1;
  min-inline-size: 0;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  line-height: 20px;
  color: ${e=>e.theme.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Ky=B.button`
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
  svg { transition: transform 0.15s ${Oy}; }
  &:hover {
    ${e=>!e.$here&&`background: ${e.theme.surface.muted}; color: ${e.theme.text.primary};`}
    svg { transform: translateX(2px); }
  }
`,qy=B.div`
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
`,Jy=B.button`
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
`,Yy={pen:2.5,highlighter:16},Xy=1.2;function Zy(e,t){return`ds-reader:ink:${e}:${t}`}function Qy(e){try{let t=localStorage.getItem(e);if(!t)return[];let n=JSON.parse(t);return Array.isArray(n)?n:[]}catch{return[]}}function $y(e,t){try{t.length===0?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(t))}catch{}}function eb(e,t){let n=e[e.length-1];return n&&Math.hypot(t[0]-n[0],t[1]-n[1])<Xy?e:[...e,t]}function tb(e){if(e.length===0)return``;let[t,n]=e[0];if(e.length===1)return`M${t} ${n} L${t+.01} ${n}`;let r=`M${t} ${n}`;for(let t=1;t<e.length;t+=1)r+=` L${e[t][0]} ${e[t][1]}`;return r}function nb(e,t,n){let r=n[0]-t[0],i=n[1]-t[1],a=r*r+i*i;if(a===0)return Math.hypot(e[0]-t[0],e[1]-t[1]);let o=((e[0]-t[0])*r+(e[1]-t[1])*i)/a;return o=Math.max(0,Math.min(1,o)),Math.hypot(e[0]-(t[0]+o*r),e[1]-(t[1]+o*i))}function rb(e,t,n=8){let r=new Set;for(let i of e){let e=n+Yy[i.tool]/2;if(i.points.length===1){Math.hypot(t[0]-i.points[0][0],t[1]-i.points[0][1])<=e&&r.add(i.id);continue}for(let n=1;n<i.points.length;n+=1)if(nb(t,i.points[n-1],i.points[n])<=e){r.add(i.id);break}}return r}var ib=50,ab=()=>({past:[],future:[]});function ob(e,t){let n=[...e.past,t];return n.length>ib&&n.shift(),{past:n,future:[]}}function sb(e,t){let n=e.past[e.past.length-1];return n?{history:{past:e.past.slice(0,-1),future:[...e.future,t]},strokes:n}:null}function cb(e,t){let n=e.future[e.future.length-1];return n?{history:{past:[...e.past,t],future:e.future.slice(0,-1)},strokes:n}:null}function lb({ink:e,tool:t,pageWidth:n,pageHeight:r,scale:i}){let a=(0,R.useRef)(null),o=(0,R.useRef)(null),s=t!==null,c=e=>{let t=a.current.getBoundingClientRect();return[(e.clientX-t.left)/i,(e.clientY-t.top)/i]};return(0,R.useEffect)(()=>{let e=a.current;if(!e||!s)return;let t=e=>e.stopPropagation();return e.addEventListener(`click`,t),e.addEventListener(`dblclick`,t),()=>{e.removeEventListener(`click`,t),e.removeEventListener(`dblclick`,t)}},[s]),(0,K.jsxs)(db,{ref:a,"data-ink-layer":!0,$active:s,$tool:t,viewBox:`0 0 ${n} ${r}`,preserveAspectRatio:`none`,"aria-hidden":!0,onPointerDown:n=>{if(!t||n.button!==0)return;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}o.current=n.pointerId;let r=c(n);t===`eraser`?e.beginErase(r):e.beginStroke(t,r)},onPointerMove:n=>{if(!t||o.current!==n.pointerId)return;let r=c(n);t===`eraser`?e.eraseAt(r):e.extendStroke(e=>eb(e,r))},onPointerUp:n=>{!t||o.current!==n.pointerId||(o.current=null,n.currentTarget.hasPointerCapture(n.pointerId)&&n.currentTarget.releasePointerCapture(n.pointerId),t===`eraser`?e.endErase():e.endStroke())},onPointerCancel:()=>{o.current=null,t===`eraser`?e.endErase():e.cancelStroke()},onContextMenu:e=>s&&e.preventDefault(),children:[e.strokes.map(e=>(0,K.jsx)(ub,{stroke:e},e.id)),e.draft&&(0,K.jsx)(ub,{stroke:e.draft})]})}function ub({stroke:e}){return(0,K.jsx)(fb,{$tool:e.tool,d:tb(e.points),strokeWidth:Yy[e.tool]})}var db=B.svg`
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
`,fb=B.path`
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: ${e=>e.$tool===`highlighter`?e.theme.brand.primary:e.theme.text.primary};
  opacity: ${e=>e.$tool===`highlighter`?.85:1};
`,pb=`#F0FF62`,mb=`M 11.2 3.0 C 12.66 2.81, 14.21 2.81, 15.72 3.0 C 17.23 3.19, 18.73 3.38, 20.24 4.13 C 21.75 4.88, 23.54 6.2, 24.76 7.52 C 25.99 8.84, 26.98 10.53, 27.59 12.04 C 28.2 13.55, 28.62 15.02, 28.43 16.57 C 28.24 18.12, 27.4 19.82, 26.46 21.37 C 25.52 22.92, 24.15 24.62, 22.78 25.89 C 21.41 27.16, 19.77 28.58, 18.26 29.0 C 16.75 29.42, 15.25 28.85, 13.74 28.43 C 12.23 28.01, 10.73 27.5, 9.22 26.46 C 7.71 25.43, 5.64 23.68, 4.7 22.22 C 3.76 20.76, 3.71 19.21, 3.57 17.7 C 3.43 16.19, 3.71 14.72, 3.85 13.17 C 3.99 11.62, 3.89 9.88, 4.41 8.37 C 4.93 6.86, 5.83 5.02, 6.96 4.13 C 8.09 3.23, 9.74 3.19, 11.2 3.0 Z`,hb=[`國語`,`英語`,`國文`,`英文`],gb=[`數學`,`自然`],_b=[`社會`,`歷史`,`地理`];function vb(e){return e?hb.includes(e)?`language`:gb.includes(e)?`stem`:_b.includes(e)?`social`:`other`:`other`}var yb={other:{d:mb,fill:pb},language:{d:`M 11.75 4 C 14.12 2.88, 16.96 2.46, 19.25 3.00 C 21.54 3.54, 24.04 5.42, 25.50 7.25 C 26.96 9.08, 27.92 11.50, 28.00 14.00 C 28.08 16.50, 27.04 19.92, 26.00 22.25 C 24.96 24.58, 23.83 26.88, 21.75 28.00 C 19.67 29.12, 16.00 29.42, 13.50 29.00 C 11.00 28.58, 8.42 27.25, 6.75 25.50 C 5.08 23.75, 3.79 21.12, 3.50 18.50 C 3.21 15.88, 3.62 12.17, 5.00 9.75 C 6.38 7.33, 9.38 5.12, 11.75 4.00 Z`,fill:`#F8DA9A`},stem:{d:`M 22.35 3 L 27.35 11.9 L 28.85 20.2 L 20.35 29 L 13.35 24.1 L 3.15 21.1 L 6.45 12.7 L 11.45 6.6 Z`,fill:`#8AE2A0`},social:{d:`M 6.84 7.2 Q 11 8.2 13.12 4.75 L 23.24 3.35 L 29 12.95 L 27.6 23.94 L 18 28.65 Q 12.6 24.3 7.54 24.29 L 3 17.3 Z`,fill:`#9AE1F3`}};function bb({shape:e}){let{d:t,fill:n}=yb[e];return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(`path`,{className:`halo`,d:t,fill:`none`,strokeWidth:4,strokeLinejoin:`round`}),(0,K.jsx)(`path`,{d:t,fill:n})]})}function xb({subject:e,onClick:t,title:n,large:r}){let i=n??`回首頁`,a=r?56:40;return(0,K.jsx)(Sb,{type:`button`,title:i,"aria-label":i,$large:!!r,onClick:t??(()=>Es(`原型沒有書櫃，先留在這裡`)),children:(0,K.jsx)(`svg`,{width:a,height:a,viewBox:`0 0 32 32`,"aria-hidden":`true`,focusable:`false`,children:(0,K.jsx)(bb,{shape:vb(e)})})})}var Sb=B.button`
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
`,Cb=[`pen`,`highlighter`,`eraser`,`clear`],wb=[`exit`,`supplements`],Tb=[...Cb,...wb],Eb={pen:{label:`畫筆`,icon:`pencil`},highlighter:{label:`螢光筆`,icon:`highlighter`},eraser:{label:`橡皮擦`,icon:`eraser`},clear:{label:`清除`,icon:`trash`},exit:{label:`返回編輯`,icon:`arrow-left`},supplements:{label:`補充資源`,icon:`blocks`}},Db=[{title:`系統工具`,items:[{id:`settings`,label:`設定`,icon:`settings`},{id:`exit`,label:`返回編輯`,icon:`arrow-left`,rail:`exit`},{id:`supplements`,label:`補充資源`,icon:`blocks`,rail:`supplements`}]},{title:`編輯工具`,items:[{id:`pen`,label:`畫筆`,icon:`pencil`,rail:`pen`},{id:`highlighter`,label:`螢光筆`,icon:`highlighter`,rail:`highlighter`},{id:`eraser`,label:`橡皮擦`,icon:`eraser`,rail:`eraser`},{id:`clear`,label:`清除`,icon:`trash`,rail:`clear`},{id:`sticky`,label:`便利貼`,icon:`sticky-note`}]},{title:`教學工具`,items:[{id:`board`,label:`白板`,icon:`presentation`},{id:`sticker`,label:`貼紙`,icon:`sticker`}]},{title:`科目工具`,items:[{id:`quiz`,label:`考數院`,icon:`list-checks`},{id:`explore`,label:`探索`,icon:`compass`},{id:`orbit`,label:`星際巡航`,icon:`orbit`},{id:`ruler`,label:`直尺`,icon:`diff`},{id:`compass`,label:`圓規`,icon:`diff`},{id:`protractor`,label:`量角器`,icon:`diff`},{id:`interactive`,label:`互動學習`,icon:`diff`}]}],Ob=`ds-reader:rail`;function kb(){try{let e=localStorage.getItem(Ob);if(!e)return Tb;let t=JSON.parse(e),n=Array.isArray(t)?[...t,...wb]:t&&typeof t==`object`&&Array.isArray(t.list)?t.list:null;return n?Tb.filter(e=>n.includes(e)):Tb}catch{return Tb}}function Ab(e){try{localStorage.setItem(Ob,JSON.stringify({v:2,list:e}))}catch{}}function jb({subject:e,onExit:t,supplementCount:n,supplementOpen:r,onSupplements:i,pageNumber:a,pageCount:o,onPrevPage:s,onNextPage:c,onGoPage:l,toolboxOpen:u,onToolbox:d,pinned:f,onUnpin:p,tool:m,onTool:h,onClear:g,canClear:_,undo:v,redo:y,canUndo:b,canRedo:x}){return(0,K.jsxs)(Nb,{"aria-label":`閱讀工具`,children:[(0,K.jsx)(xb,{subject:e,large:!0}),(0,K.jsxs)(Pb,{title:`第 ${a} 頁，共 ${o} 頁`,children:[s&&(0,K.jsx)(Ib,{type:`button`,onClick:s,disabled:a<=1,"aria-label":`上一頁`,title:`上一頁`,children:(0,K.jsx)(q,{name:`chevron-up`,size:16})}),(0,K.jsx)(Fb,{defaultValue:a,inputMode:`numeric`,"aria-label":`第 ${a} 頁，共 ${o} 頁，輸入頁碼跳頁`,onFocus:e=>e.currentTarget.select(),onKeyDown:e=>{e.key===`Enter`&&e.currentTarget.blur(),e.key===`Escape`&&(e.currentTarget.value=String(a),e.currentTarget.blur())},onBlur:e=>{let t=parseInt(e.currentTarget.value.replace(/[^0-9]/g,``),10);if(!Number.isFinite(t)){e.currentTarget.value=String(a);return}let n=Math.min(Math.max(t,1),o);e.currentTarget.value=String(n),n!==a&&l?.(n)}},a),c&&(0,K.jsx)(Ib,{type:`button`,onClick:c,disabled:a>=o,"aria-label":`下一頁`,title:`下一頁`,children:(0,K.jsx)(q,{name:`chevron-down`,size:16})})]}),f.filter(e=>Cb.includes(e)).map(e=>{let t=Eb[e],n=e===`clear`;return(0,K.jsxs)(zb,{children:[(0,K.jsxs)(Lb,{type:`button`,$active:!n&&m===e,$editing:u,tabIndex:u?-1:void 0,"aria-disabled":u||void 0,"aria-pressed":n?void 0:m===e,disabled:n&&!_,title:n?`清掉這一頁的筆跡`:t.label,onClick:()=>{if(n)return g();h(m===e?null:e)},children:[(0,K.jsx)(q,{name:t.icon,size:20}),(0,K.jsx)(`span`,{children:t.label})]}),u&&(0,K.jsx)(Mb,{tool:e,onUnpin:p})]},e)}),(0,K.jsxs)(Lb,{type:`button`,title:`復原筆跡`,disabled:!b,onClick:v,children:[(0,K.jsx)(q,{name:`corner-up-left`,size:20}),(0,K.jsx)(`span`,{children:`復原`})]}),(0,K.jsxs)(Lb,{type:`button`,title:`取消復原筆跡`,disabled:!x,onClick:y,children:[(0,K.jsx)(q,{name:`corner-up-right`,size:20}),(0,K.jsx)(`span`,{children:`取消復原`})]}),(0,K.jsx)(Rb,{}),f.includes(`exit`)&&(0,K.jsxs)(zb,{children:[(0,K.jsxs)(Lb,{type:`button`,$editing:u,tabIndex:u?-1:void 0,"aria-disabled":u||void 0,onClick:t,title:`返回編輯`,children:[(0,K.jsx)(q,{name:Eb.exit.icon,size:20}),(0,K.jsx)(`span`,{children:Eb.exit.label})]}),u&&(0,K.jsx)(Mb,{tool:`exit`,onUnpin:p})]}),(0,K.jsxs)(Lb,{type:`button`,$active:u,"aria-expanded":u,"aria-controls":`reader-toolbox`,onClick:d,children:[(0,K.jsx)(q,{name:`archive`,size:20}),(0,K.jsx)(`span`,{children:`工具箱`})]}),f.includes(`supplements`)&&(0,K.jsxs)(zb,{children:[(0,K.jsxs)(Lb,{type:`button`,$boxed:n>0&&!u,$editing:u,tabIndex:u?-1:void 0,"aria-disabled":u||void 0,$active:r&&!u,"aria-expanded":r,onClick:i,title:`這一頁的補充資源`,children:[(0,K.jsx)(q,{name:Eb.supplements.icon,size:20}),(0,K.jsx)(`span`,{children:Eb.supplements.label})]}),u?(0,K.jsx)(Mb,{tool:`supplements`,onUnpin:p}):n>0&&(0,K.jsx)(Bb,{"aria-label":`${n} 項`,children:n})]})]})}function Mb({tool:e,onUnpin:t}){let{label:n}=Eb[e];return(0,K.jsx)(Vb,{type:`button`,title:`把「${n}」收回工具箱`,onClick:()=>t(e),children:(0,K.jsx)(q,{name:`x`,size:16,label:`收回${n}`})})}var Nb=B.nav`
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
`,Pb=B.div`
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
`,Fb=B.input`
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
`,Ib=B.button`
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
`,Lb=B.button`
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
`,Rb=B.hr`
  inline-size: 40px;
  block-size: 0;
  margin: 4px 0;
  border: none;
  border-block-start: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.default};
`,zb=B.div`
  position: relative;
`,Bb=B.span`
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
  /* 數字要看筆畫置中，不是看行框：Outfit 的數字落在行框下半部，不裁的話會比圓心低約 4px。
     text-box 把行框裁到數字的頂（cap）與底（alphabetic），grid 置中的就是筆畫本身 */
  line-height: 1;
  text-box: trim-both cap alphabetic;
  pointer-events: none;
`,Vb=B.button`
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
`;function Hb({pinned:e,onTogglePin:t,onClose:n}){return(0,K.jsxs)(Ub,{id:`reader-toolbox`,role:`dialog`,"aria-label":`工具箱`,children:[(0,K.jsxs)(Wb,{children:[(0,K.jsx)(`strong`,{children:`工具箱`}),(0,K.jsx)(Gb,{type:`button`,title:`關閉工具箱`,onClick:n,children:(0,K.jsx)(q,{name:`x`,size:16,label:`關閉`})})]}),Db.map(n=>(0,K.jsxs)(Kb,{children:[(0,K.jsx)(qb,{children:n.title}),(0,K.jsx)(Jb,{children:n.items.map(n=>{let r=n.rail?e.includes(n.rail):!1;return(0,K.jsxs)(Yb,{type:`button`,"aria-pressed":n.rail?r:void 0,title:n.rail?r?`從左欄收回「${n.label}」`:`把「${n.label}」釘到左欄`:`${n.label}：原型還沒做`,onClick:()=>{if(n.rail)return t(n.rail);Es(`${n.label}：原型還沒做`)},children:[(0,K.jsx)(q,{name:n.icon,size:24}),(0,K.jsx)(`span`,{children:n.label})]},n.id)})})]},n.title))]})}var Ub=B.aside`
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
`,Wb=B.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1.8px;
  color: ${e=>e.theme.text.primary};
`,Gb=B.button`
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
`,Kb=B.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,qb=B.h3`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.2px;
  color: ${e=>e.theme.text.secondary};
`,Jb=B.div`
  padding: 12px;
  border-radius: ${e=>e.theme.radius.card};
  background: ${e=>e.theme.surface.sunken};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`,Yb=B.button`
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
`;function Xb(e,t){let n=Zy(e,t),[,r]=(0,R.useReducer)(e=>e+1,0),i=(0,R.useRef)({key:n,strokes:Qy(n),draft:null});i.current.key!==n&&(i.current={key:n,strokes:Qy(n),draft:null});let a=(0,R.useRef)(new Map),o=e=>a.current.get(e)??ab(),s=e=>{i.current.strokes=e,r()},c=(0,R.useCallback)((e,t)=>{let n=i.current.key;a.current.set(n,ob(o(n),e)),$y(n,t),s(t)},[]),l=(0,R.useCallback)((e,t)=>{i.current.draft={id:`s_${Date.now().toString(36)}${Math.random().toString(36).slice(2,6)}`,tool:e,points:[t]},r()},[]),u=(0,R.useCallback)(e=>{let t=i.current.draft;if(!t)return;let n=e(t.points);n!==t.points&&(i.current.draft={...t,points:n},r())},[]),d=(0,R.useCallback)(()=>{let e=i.current.draft;e&&(i.current.draft=null,c(i.current.strokes,[...i.current.strokes,e]))},[c]),f=(0,R.useCallback)(()=>{i.current.draft=null,r()},[]),p=(0,R.useRef)(null),m=(0,R.useCallback)(e=>{if(!p.current)return;let{strokes:t}=i.current,n=rb(t,e);n.size&&s(t.filter(e=>!n.has(e.id)))},[]),h=(0,R.useCallback)(e=>{p.current=i.current.strokes,m(e)},[m]),g=(0,R.useCallback)(()=>{let e=p.current;p.current=null,!(!e||e.length===i.current.strokes.length)&&c(e,i.current.strokes)},[c]),_=(0,R.useCallback)(()=>{i.current.strokes.length!==0&&c(i.current.strokes,[])},[c]),v=(0,R.useCallback)(()=>{let e=i.current.key,t=sb(o(e),i.current.strokes);t&&(a.current.set(e,t.history),$y(e,t.strokes),s(t.strokes))},[]),y=(0,R.useCallback)(()=>{let e=i.current.key,t=cb(o(e),i.current.strokes);t&&(a.current.set(e,t.history),$y(e,t.strokes),s(t.strokes))},[]),b=o(n);return{strokes:i.current.strokes,draft:i.current.draft,beginStroke:l,extendStroke:u,endStroke:d,cancelStroke:f,beginErase:h,eraseAt:m,endErase:g,clear:_,undo:v,redo:y,canUndo:b.past.length>0,canRedo:b.future.length>0,hasInk:i.current.strokes.length>0}}function Zb(e){let t=Eu();return t?(0,K.jsx)(by,{...e,onOpen:(n,r)=>{if(r.kind===`jump`){r.targetRowId&&e.onGoRow(r.targetRowId);return}t.open({...n,popups:[r]})}}):null}function Qb({doc:e,pages:t,current:n,go:r,scale:i,stageRef:a,onExit:o,onGoRow:s}){let c=t[Math.min(n,t.length-1)],l=ui[e.settings.aspectRatio],[u,d]=(0,R.useState)(null),[f,p]=(0,R.useState)(!1),[m,h]=(0,R.useState)(!1),[g,_]=(0,R.useState)(!1),v=(0,R.useMemo)(()=>c?hy(c).reduce((e,t)=>e+Pr(t).length,0):0,[c]),y=(0,R.useMemo)(()=>Xv(e).filter(e=>e.depth<=1),[e]),[b,x]=(0,R.useState)(kb),S=Xb(e.id,c?.index??0),[C,w]=(0,R.useState)(null),[T,E]=(0,R.useState)(null);(0,R.useEffect)(()=>w(null),[n]),(0,R.useEffect)(()=>E(null),[C?.id]);let D=(t,n,r,i)=>{let a=t.closest(`[data-para]`);if(!a)return w(null),r.closest(`[data-pop]`)?{kind:`stop`}:{kind:`sentence`};if(a.dataset.paraHit)return{kind:`stop`};let o=a.dataset.para;if(C?.id!==o)return i.stopPropagation(),w({id:o,el:a}),{kind:`stop`};let s=Sr(e,o)?.block;if(s?.type!==`text`)return{kind:`sentence`};let c=r.closest(`[data-note]`),l=c?s.rangeNotes?.find(e=>e.id===c.dataset.note):void 0;if(l&&Qr(s,l)){if(Jr(l)===`word`)return{kind:`stop`};let e=$r(s.spans,l.id);if(e&&n>=e.start&&n<=e.end)return{kind:`range`,...e}}return r.closest(`[data-pop]`)?{kind:`stop`}:{kind:`sentence`}},O=t=>{if(!t)return E(null);let n=t.rich.closest(`[data-para]`);if(!n)return w(null),E(null);let r=n.dataset.para;C?.id!==r&&w({id:r,el:n});let i=Sr(e,r)?.block,a=i?.type===`text`?i.rangeNotes?.find(e=>{if(Jr(e)!==`sentence`||!Qr(i,e))return!1;let n=$r(i.spans,e.id);return!!n&&n.start<t.end&&n.end>t.start}):void 0;E(a?.id??null)},k=(0,R.useMemo)(()=>({focusId:C?.id??null,toggle:(e,t)=>w(n=>n?.id===e?null:{id:e,el:t})}),[C]);(0,R.useEffect)(()=>{if(!f)return;let e=e=>{e.target?.closest(`#reader-toolbox, nav[aria-label="閱讀工具"]`)||(e.stopPropagation(),p(!1))};return document.addEventListener(`pointerdown`,e,!0),()=>document.removeEventListener(`pointerdown`,e,!0)},[f]);let A=(0,R.useCallback)(e=>{x(t=>{let n=t.includes(e)?t.filter(t=>t!==e):Tb.filter(n=>n===e||t.includes(n));return Ab(n),n}),u===e&&d(null)},[u]),ee=(0,R.useCallback)(()=>{S.clear(),Es(`已清掉這一頁的筆跡`)},[S]);return(0,R.useEffect)(()=>{let e=e=>{if(e.key===`Escape`){if(f||m){p(!1),h(!1),e.stopPropagation();return}if(u){d(null),e.stopPropagation();return}C&&w(null);return}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`z`){if(e.shiftKey?!S.canRedo:!S.canUndo)return;e.preventDefault(),e.stopPropagation(),e.shiftKey?S.redo():S.undo()}};return document.addEventListener(`keydown`,e,!0),()=>document.removeEventListener(`keydown`,e,!0)},[u,f,m,S,C]),(0,K.jsxs)(rx,{children:[(0,K.jsx)(ux,{}),(0,K.jsx)(jb,{subject:e.meta.subject,onExit:o,outlineOpen:m,onOutline:()=>{h(e=>!e),p(!1)},supplementCount:v,supplementOpen:g,onSupplements:()=>_(e=>!e),pageNumber:n+1,pageCount:t.length,onPrevPage:()=>r(-1),onNextPage:()=>r(1),onGoPage:e=>r(e-1-n),toolboxOpen:f,onToolbox:()=>{p(e=>!e),h(!1),d(null)},pinned:b,onUnpin:A,tool:u,onTool:d,onClear:ee,canClear:S.hasInk,undo:S.undo,redo:S.redo,canUndo:S.canUndo,canRedo:S.canRedo}),(0,K.jsx)(ix,{children:(0,K.jsx)(Zl.Provider,{value:k,children:(0,K.jsxs)(ax,{ref:a,children:[(0,K.jsx)(py,{active:!0,root:a,decide:D,onBlank:()=>w(null),onMove:O}),c&&(0,K.jsxs)(lx,{style:{width:(l.width-64)*i,height:(l.height-64)*i},children:[(0,K.jsxs)(dx,{style:{margin:-32*i},children:[(0,K.jsx)(ag,{page:c,settings:e.settings,scale:i}),(0,K.jsx)(lb,{ink:S,tool:u,pageWidth:l.width,pageHeight:l.height,scale:i})]}),C&&(0,K.jsx)($b,{doc:e,focus:C,sentenceId:T}),e.settings.layout===`flow`&&(0,K.jsx)(ox,{vertical:e.settings.writingMode===`vertical`,pageKey:c.index})]}),c&&(0,K.jsx)(Zb,{doc:e,pages:t,current:c.index,open:g,onClose:()=>_(!1),onGoRow:s})]})})}),m&&(0,K.jsxs)(fx,{id:`reader-outline`,role:`dialog`,"aria-label":`目次`,children:[(0,K.jsx)(px,{children:`目次`}),y.length===0&&(0,K.jsx)(mx,{children:`這份教材還沒有章節標題`}),y.map(e=>{let r=Zv(t,e.rowId);return(0,K.jsxs)(hx,{type:`button`,$depth:e.depth,$on:r===n,onClick:()=>{s(e.rowId),h(!1)},children:[(0,K.jsx)(`span`,{children:e.text}),r>=0&&(0,K.jsx)(`small`,{children:r+1})]},e.rowId)})]}),f&&(0,K.jsx)(Hb,{pinned:b,onTogglePin:A,onClose:()=>p(!1)})]})}function $b({doc:e,focus:t,sentenceId:n}){let r=Eu(),i=Sr(e,t.id),a=i?.block.type===`text`?i.block:null;if(!a||!r)return null;let o=n?a.rangeNotes?.find(e=>e.id===n)??null:null,s=o?ex(a,o):Gr(a);if(s.length===0)return null;let c=Vr(e.rows).get(a.id)?.no,l=o&&t.el.querySelector(`[data-note="${o.id}"]`)||t.el,u=o?Yr(o):a.paraNotes,d=o?Zr(a,o.id):zr(a);return(0,K.jsx)(tx,{"data-para-hit":!0,"aria-label":o?`這一句的說明`:c?`第 ${c} 段的說明`:`這一段的說明`,children:s.map(e=>(0,K.jsx)(nx,{type:`button`,"aria-label":e.name,onClick:()=>{if(e.key===`bu`){r.open({...a,popups:d},l);return}let t=u?.[e.key]??``;r.open({...a,popups:[{id:`para-${e.key}`,kind:`text`,title:e.name,body:t}]},l)},children:e.key===`bu`?(0,K.jsx)(q,{name:`blocks`,size:20}):e.btn},e.key))})}function ex(e,t){let n=Yr(t),r=Br.filter(e=>n[e.key]?.trim());return Zr(e,t.id).length>0&&r.push({key:`bu`,btn:`補`,name:`補充`}),r}var tx=B.nav`
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
`,nx=B.button`
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
`,rx=B.div`
  flex: 1;
  min-inline-size: 0;
  display: flex;
  position: relative;
  /* 整個閱讀畫面是淡灰底：白色圓角的頁面浮在上面，左欄的工具直接放在灰底上 */
  background: ${e=>e.theme.surface.sunken};
`,ix=B.div`
  flex: 1;
  min-inline-size: 0;
  position: relative;
  display: flex;
  padding: ${e=>e.theme.space.insetSm} ${e=>e.theme.space.insetSm}
    ${e=>e.theme.space.insetSm} 0;
`,ax=B.main`
  flex: 1;
  min-inline-size: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 不再多包一層灰色卡片：頁面本身就是那張卡片 */
  overflow: hidden;
`;function ox({vertical:e,pageKey:t}){let n=(0,R.useRef)(null),[r,i]=(0,R.useState)(null),[a,o]=(0,R.useState)(!1);return(0,R.useEffect)(()=>{let e=n.current?.parentElement?.querySelector(`[data-layout="flow"]`);if(!e)return;let t=0,r=()=>{let t=e.scrollWidth-e.clientWidth,n=t<=1?null:{size:e.clientWidth/e.scrollWidth,at:Math.min(1,Math.abs(e.scrollLeft)/t)};i(e=>e===n||e&&n&&e.size===n.size&&e.at===n.at?e:n)},a=()=>{r(),o(!0),window.clearTimeout(t),t=window.setTimeout(()=>o(!1),800)};return r(),e.addEventListener(`scroll`,a,{passive:!0}),()=>{e.removeEventListener(`scroll`,a),window.clearTimeout(t)}},[t]),(0,K.jsx)(sx,{ref:n,"aria-hidden":!0,"data-flow-scrollbar":!0,$shown:a&&!!r,children:r&&(0,K.jsx)(cx,{style:{width:`${r.size*100}%`,[e?`right`:`left`]:`${r.at*(1-r.size)*100}%`}})})}var sx=B.div`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 6px;
  height: 6px;
  pointer-events: none;
  z-index: 14;
  opacity: ${e=>+!!e.$shown};
  transition: opacity 0.2s;
`,cx=B.div`
  position: absolute;
  top: 0;
  bottom: 0;
  border-radius: 3px;
  background: ${e=>e.theme.border.default};
`,lx=B.div`
  position: relative;
  flex: none;
  border-radius: ${e=>e.theme.radius.panel};
  overflow: hidden;
  /*
   * 不畫陰影也不畫框：白色的頁直接放在灰底上就分得出來。
   * 陰影會被畫布區（Stage 會裁掉超出去的東西）切成一條直線；框線看起來髒
   */
`,ux=Vn`
  :root {
    --reader-rail: 104px;
    /* 工具格一律正方形 */
    --reader-tile-w: 56px;
    --reader-tile-h: 56px;
    --reader-label: var(--ds-typography-label-size);
  }
  @media (max-height: 820px), (max-width: 1100px) {
    :root {
      --reader-rail: 80px;
      --reader-tile-w: 52px;
      --reader-tile-h: 52px;
      --reader-label: 10px;
    }
  }
`,dx=B.div`
  position: relative;
`,fx=B.div`
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
`,px=B.strong`
  padding: 8px 10px;
  font-size: ${e=>e.theme.typography.bodySmSize};
`,mx=B.p`
  margin: 0;
  padding: 8px 10px;
  font-size: var(--ds-typography-label-size);
  color: ${e=>e.theme.text.tertiary};
`,hx=B.button`
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
`,gx=e=>{let t=t=>{t.key===`Escape`&&e()};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)};function _x({onClose:e,onUpload:t}){return(0,R.useEffect)(()=>gx(e),[e]),(0,G.createPortal)((0,K.jsx)(xx,{onClick:e,children:(0,K.jsxs)(Sx,{role:`dialog`,"aria-modal":`true`,"aria-label":`自編教材已共享`,$narrow:!0,onClick:e=>e.stopPropagation(),children:[(0,K.jsx)(Cx,{children:`自編教材已共享`}),(0,K.jsx)(wx,{children:`放上一張封面，讓教材變完整吧！`}),(0,K.jsxs)(Dx,{children:[(0,K.jsx)(Ox,{type:`button`,onClick:e,children:`關閉`}),(0,K.jsx)(kx,{type:`button`,onClick:t,children:`前往上傳`})]})]})}),document.body)}var vx=5242880,yx=[`image/jpeg`,`image/png`,`image/gif`];function bx({onCancel:e,onConfirm:t}){let[n,r]=(0,R.useState)(null),[i,a]=(0,R.useState)(!1),[o,s]=(0,R.useState)(null);(0,R.useEffect)(()=>gx(e),[e]);let c=async e=>{if(e){if(!yx.includes(e.type))return s(`只支援 JPG、PNG、GIF`);if(e.size>vx)return s(`檔案不可超過 5MB`);try{let{assetId:t}=await so(e);r(t),s(null)}catch{s(`讀不到這張圖`)}}},l=e=>{e.preventDefault(),a(!1),c(e.dataTransfer.files?.[0]??null)},u=$a(n);return(0,G.createPortal)((0,K.jsx)(xx,{onClick:e,children:(0,K.jsxs)(Sx,{role:`dialog`,"aria-modal":`true`,"aria-label":`課本封面`,onClick:e=>e.stopPropagation(),children:[(0,K.jsxs)(Tx,{children:[(0,K.jsx)(`span`,{children:`課本封面`}),(0,K.jsx)(Ex,{type:`button`,onClick:e,"aria-label":`關閉`,title:`關閉`,children:(0,K.jsx)(q,{name:`x`,size:24,label:`關閉`})})]}),(0,K.jsx)(Ax,{type:`button`,$dragging:i,$hasCover:!!u,title:`上傳檔案`,onClick:()=>void co(yx.join(`,`)).then(c),onDragOver:e=>{e.preventDefault(),a(!0)},onDragLeave:()=>a(!1),onDrop:l,children:u?(0,K.jsx)(Mx,{src:u,alt:`封面預覽`}):(0,K.jsxs)(jx,{children:[(0,K.jsx)(q,{name:`upload`,size:24}),(0,K.jsx)(`span`,{children:`上傳檔案`})]})}),(0,K.jsx)(Nx,{$bad:!!o,children:o??`支援 JPG、PNG、GIF 格式，檔案大小不超過 5MB`}),(0,K.jsxs)(Dx,{children:[(0,K.jsx)(Ox,{type:`button`,onClick:e,children:`取消`}),(0,K.jsx)(Ox,{type:`button`,disabled:!n,onClick:()=>n&&t(n),$primary:!0,children:`確認上傳`})]})]})}),document.body)}var xx=B.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  /* Figma 的 backdrop 是 10% 黑；設計系統沒有遮罩 token，從 inverse 面色調出來 */
  background: color-mix(in srgb, ${e=>e.theme.surface.inverse} 10%, transparent);
  display: grid;
  place-items: center;
  padding: ${e=>e.theme.space.insetLg};
`,Sx=B.div`
  inline-size: min(${e=>e.$narrow?`500px`:`400px`}, 100%);
  display: flex;
  flex-direction: column;
  gap: ${e=>e.$narrow?`24px`:`20px`};
  align-items: ${e=>e.$narrow?`center`:`stretch`};
  padding: ${e=>e.theme.space.insetLg};
  background: ${e=>e.theme.surface.page};
  border-radius: ${e=>e.theme.radius.panel};
  box-shadow: ${e=>e.theme.shadow.float};
`,Cx=B.p`
  margin: 0;
  padding-block: ${e=>e.theme.space.insetXs};
  font-size: ${e=>e.theme.typography.bodyLgSize};
  line-height: ${e=>e.theme.typography.bodyLgLineHeight};
  font-weight: 600;
  text-align: center;
`,wx=B.p`
  margin: 0;
  padding-block: ${e=>e.theme.space.insetLg};
  font-size: ${e=>e.theme.typography.bodySize};
  line-height: ${e=>e.theme.typography.bodyLineHeight};
  text-align: center;
`,Tx=B.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${e=>e.theme.typography.bodyLgSize};
  line-height: ${e=>e.theme.typography.bodyLgLineHeight};
`,Ex=B.button`
  display: grid;
  place-items: center;
  inline-size: 24px;
  block-size: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
`,Dx=B.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`,Ox=B.button`
  block-size: ${e=>e.theme.control.heightLg};
  padding: 0 ${e=>e.theme.space.insetXl};
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.action.secondaryBorder};
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.action.secondaryBg};
  color: ${e=>e.theme.action.secondaryText};
  font-size: ${e=>e.theme.typography.bodySize};
  font-weight: 500;
  cursor: pointer;

  &:hover:not(:disabled) { background: ${e=>e.theme.action.secondaryBgHover}; }
  &:disabled {
    background: ${e=>e.theme.action.disabledBg};
    border-color: ${e=>e.theme.action.disabledBorder};
    color: ${e=>e.theme.action.disabledText};
    cursor: default;
  }
`,kx=B(Ox)`
  border-color: transparent;
  background: ${e=>e.theme.action.accentBg};
  color: ${e=>e.theme.action.accentText};
  &:hover:not(:disabled) { background: ${e=>e.theme.action.accentBgHover}; }
`,Ax=B.button`
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
`,jx=B.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 17px;
  svg { inline-size: 60px; block-size: 60px; }
`,Mx=B.img`
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  display: block;
`,Nx=B.p`
  margin: -8px 0 0;
  text-align: center;
  font-size: ${e=>e.theme.typography.labelSize};
  line-height: ${e=>e.theme.typography.labelLineHeight};
  letter-spacing: 0.5px;
  font-weight: 500;
  color: ${e=>e.$bad?e.theme.feedback.errorDefault:e.theme.text.tertiary};
`,Px=`ds-editor:doc:v2`,Fx=`ds-editor:share`,Ix=1e3;function Lx(e){try{localStorage.setItem(Px,JSON.stringify(e))}catch{}}function Rx(){try{let e=localStorage.getItem(Px);if(!e)return null;let t=JSON.parse(e);return!t||typeof t!=`object`||!Array.isArray(t.rows)?null:Tr(ei(wr(Cr({...t,footnotes:t.footnotes??[]}))))}catch{return null}}function zx(e){let t=(0,R.useRef)(e);t.current=e;let[n,r]=(0,R.useState)(!1),i=(0,R.useRef)(!0);(0,R.useEffect)(()=>{if(i.current){i.current=!1;return}r(!0);let e=setTimeout(()=>{Lx(t.current),r(!1)},Ix);return()=>clearTimeout(e)},[e]);let a=(0,R.useCallback)(()=>{Lx(t.current),r(!1)},[]);return(0,R.useEffect)(()=>()=>Lx(t.current),[]),{pending:n,flush:a}}function Bx(){try{let e=localStorage.getItem(Fx);if(e){let t=JSON.parse(e);return{shared:t.shared===!0,coverAssetId:t.coverAssetId??null}}}catch{}return{shared:!1,coverAssetId:null}}function Vx(e){try{localStorage.setItem(Fx,JSON.stringify(e))}catch{}}var Hx=1200;function Ux({doc:e,onTitle:t,undo:n,redo:r,canUndo:i,canRedo:a,importing:o,settingsOpen:s,onSettings:c,reading:l,onReading:u}){let d=zx(e),[f,p]=(0,R.useState)(`none`),[m,h]=(0,R.useState)(Bx),[g,_]=(0,R.useState)(!1),v=(0,R.useRef)(0);(0,R.useEffect)(()=>()=>clearTimeout(v.current),[]);let y=()=>{d.flush(),_(!0),clearTimeout(v.current),v.current=window.setTimeout(()=>_(!1),Hx)},b=(0,R.useCallback)(e=>{h(e),Vx(e)},[]);return(0,K.jsxs)(Yx,{children:[(0,K.jsx)(xb,{subject:e.meta.subject}),(0,K.jsx)(Wx,{value:e.title,onChange:t}),(0,K.jsxs)(Xx,{children:[(0,K.jsxs)(Zx,{children:[(0,K.jsx)(qx,{icon:`undo`,label:`復原`,title:`復原（Cmd+Z）`,disabled:!i,onClick:n}),(0,K.jsx)(qx,{icon:`redo`,label:`重做`,title:`重做（Shift+Cmd+Z）`,disabled:!a,onClick:r})]}),(0,K.jsx)(Qx,{}),(0,K.jsxs)(Zx,{children:[(0,K.jsx)(qx,{icon:`settings`,label:`設定`,title:`教材設定、匯入`,$focus:s||o,onClick:c}),(0,K.jsx)(qx,{icon:`save`,label:d.pending?`儲存`:`已儲存`,title:d.pending?`有尚未儲存的改動，按一下立刻儲存`:`已自動儲存到這台電腦，按一下再存一次`,$on:g,onClick:y}),(0,K.jsx)(qx,{icon:`share`,label:m.shared?`已共享`:`共享`,title:m.shared?`再按一次取消共享`:`共享教材`,$on:m.shared,"aria-pressed":m.shared,onClick:()=>{if(m.shared){b({...m,shared:!1}),Es(`已取消共享`);return}b({...m,shared:!0}),p(`shared`)}}),(0,K.jsx)(qx,{icon:`eye`,label:l?`回到編輯`:`閱讀模式`,title:l?`回到編輯`:`用學生看到的樣子翻閱`,$on:l,"aria-pressed":l,onClick:u})]})]}),f===`shared`&&(0,K.jsx)(_x,{onClose:()=>p(`none`),onUpload:()=>p(`cover`)}),f===`cover`&&(0,K.jsx)(bx,{onCancel:()=>p(`none`),onConfirm:e=>{b({...m,shared:!0,coverAssetId:e}),p(`none`),Es(`封面已更新`)}}),(0,K.jsx)(Ds,{})]})}function Wx({value:e,onChange:t}){return(0,K.jsx)(Gx,{"data-value":e||`未命名教材`,children:(0,K.jsx)(Kx,{size:1,value:e,onChange:e=>t(e.target.value),onKeyDown:e=>{(e.key===`Enter`||e.key===`Escape`)&&e.currentTarget.blur()},placeholder:`未命名教材`,"aria-label":`教材名稱`,title:`教材名稱，點一下就能改`})})}var Gx=B.div`
  display: inline-grid;
  flex: 0 1 auto;
  min-inline-size: 0;

  &::after,
  & > input {
    grid-area: 1 / 1;
    font: inherit;
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
`,Kx=B.input`
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
`;function qx({icon:e,label:t,title:n,disabled:r,$focus:i=!1,$on:a=!1,onClick:o,...s}){return(0,K.jsxs)(Jx,{type:`button`,title:n,disabled:r,$active:a||i,onClick:o,...s,children:[(0,K.jsx)(q,{name:e,size:20}),(0,K.jsx)(`span`,{children:t})]})}var Jx=B.button`
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
`,Yx=B.header`
  display: flex;
  align-items: center;
  flex: none;
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetXs} ${e=>e.theme.space.insetLg};
  background: ${e=>e.theme.surface.raised};
`,Xx=B.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.space.gapLg};
  flex: none;
  margin-inline-start: auto;
`,Zx=B.div`
  display: flex;
  gap: ${e=>e.theme.space.gapSm};
  align-items: center;
`,Qx=B.span`
  inline-size: 1px;
  block-size: 24px;
  background: ${e=>e.theme.border.subtle};
`;function $x({options:e,value:t,onChange:n,compact:r,"aria-label":i}){let a=e.findIndex(e=>e.value===t),o=r?2:4;return(0,K.jsxs)(tS,{role:`tablist`,"aria-label":i,$n:e.length,$gap:o,children:[a>=0&&(0,K.jsx)(nS,{"aria-hidden":!0,$n:e.length,$gap:o,style:{transform:`translateX(calc(${a} * (100% + ${o}px)))`}}),e.map(e=>(0,K.jsx)(rS,{type:`button`,role:`tab`,"aria-selected":e.value===t,$on:e.value===t,$compact:!!r,onClick:()=>n(e.value),children:e.label},e.value))]})}var eS=4,tS=B.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${e=>e.$n}, minmax(0, 1fr));
  gap: ${e=>e.$gap}px;
  padding: ${eS}px;
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.sunken};
  writing-mode: horizontal-tb;
`,nS=B.span`
  position: absolute;
  top: ${eS}px;
  bottom: ${eS}px;
  left: ${eS}px;
  width: calc((100% - ${8}px - ${e=>(e.$n-1)*e.$gap}px) / ${e=>e.$n});
  border-radius: ${e=>e.theme.radius.control};
  background: ${e=>e.theme.surface.raised};
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.14);
  transition: transform 0.28s cubic-bezier(0.3, 0.7, 0.4, 1);
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`,rS=B.button`
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
`,iS=8,aS=4,oS=40,sS=10;function cS(e){return e.items.filter(e=>!e.continuedFromPrev).map(e=>e.row.id)}function lS(e,t){let n=cS(t);return n.length===0?`這一頁是上一段的接續，要刪請刪上一頁的那一段`:n.length>=e.rows.length?`這是教材僅有的內容，不能整頁刪掉`:null}function uS(e,t,n){if(n===t||n===t+1)return null;let r=cS(e[t]);if(r.length===0)return null;let i=null;for(let r=n;r<e.length;r++){if(r===t)continue;let n=cS(e[r]);if(n.length>0){i=n[0];break}}return{type:`moveRows`,rowIds:r,beforeRowId:i}}function dS({doc:e,pages:t,current:n,thumbInline:r,onGoPage:i,dispatch:a}){let o=ui[e.settings.aspectRatio],s=r/o.width,c=(0,R.useRef)(null),[l,u]=(0,R.useState)(null),[d,f]=(0,R.useState)(null),[p,m]=(0,R.useState)(null),h=(0,R.useRef)(!1);(0,R.useEffect)(()=>{l===null&&c.current?.querySelector(`[data-thumb="${n}"]`)?.scrollIntoView({block:`nearest`})},[n,l]);let g=n=>{let r=t[n];if(!a||!r||lS(e,r))return;let i=cS(r);m({title:`刪除第 ${n+1} 頁？`,run:()=>a({type:`deleteRows`,rowIds:i})})},_=()=>[...c.current?.querySelectorAll(`[data-thumb]`)??[]].map(e=>({i:Number(e.dataset.thumb),r:e.getBoundingClientRect()})),v=e=>{let t=c.current,n=_();if(!t||n.length===0)return null;let r=t.getBoundingClientRect(),i=e=>e-r.top+t.scrollTop;for(let t of n)if(e<t.r.top+t.r.height/2)return{slot:t.i,top:i(t.r.top)-iS/2};let a=n[n.length-1];return{slot:a.i+1,top:i(a.r.bottom)+iS/2}},y=(e,n)=>{let r=e.target.closest(`[data-thumb]`),i=c.current;if(!r||!i)return;let o=e.clientX,s=e.clientY,l=!1,d=null,p=0,m=0,g=s,_=null,y=0,b=0,x=()=>{let e=v(g);_=e?.slot??null,f(e?.top??null)},S=()=>{y=0,b&&(i.scrollTop+=b,x(),y=requestAnimationFrame(S))},C=e=>{let t=i.getBoundingClientRect();b=e<t.top+oS?-10:e>t.bottom-oS?sS:0,b&&!y&&(y=requestAnimationFrame(S))},w=e=>{if(!l){if(Math.hypot(e.clientX-o,e.clientY-s)<aS)return;l=!0,u(n);let t=r.getBoundingClientRect();p=o-t.left,m=s-t.top,d=r.cloneNode(!0),d.removeAttribute(`data-thumb`),Object.assign(d.style,{position:`fixed`,left:`0`,top:`0`,width:`${t.width}px`,margin:`0`,pointerEvents:`none`,zIndex:`9999`,opacity:`0.9`,background:`var(--ds-surface-raised)`,boxShadow:`var(--ds-shadow-float)`}),document.body.appendChild(d)}g=e.clientY,d&&(d.style.transform=`translate(${e.clientX-p}px, ${e.clientY-m}px)`),x(),C(e.clientY)},T=()=>{if(window.removeEventListener(`pointermove`,w),window.removeEventListener(`pointerup`,T),window.removeEventListener(`pointercancel`,T),b=0,cancelAnimationFrame(y),d?.remove(),!l||(h.current=!0,setTimeout(()=>h.current=!1,0),u(null),f(null),_===null||!a))return;let e=uS(t,n,_);e&&a(e)};window.addEventListener(`pointermove`,w),window.addEventListener(`pointerup`,T),window.addEventListener(`pointercancel`,T),e.preventDefault()},b=(e,t)=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),i(t))};return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(fS,{ref:c,role:`list`,"aria-label":`頁面縮圖`,children:[t.map((t,r)=>{let c=r===n,u=a?lS(e,t):null,d=!!a&&cS(t).length>0;return(0,K.jsxs)(hS,{"data-thumb":r,role:`listitem`,tabIndex:0,"aria-current":c?`page`:void 0,"aria-label":`第 ${r+1} 頁`,$on:c,$dragging:l===r,$draggable:d,onPointerDown:e=>{e.button!==0||!d||e.target.closest(`[data-trash]`)||y(e,r)},onClick:()=>{h.current||i(r)},onKeyDown:e=>b(e,r),children:[(0,K.jsx)(gS,{$on:c,children:r+1}),(0,K.jsxs)(_S,{children:[(0,K.jsx)(vS,{$on:c,style:{width:o.width*s,height:o.height*s},children:(0,K.jsx)(Du,{children:(0,K.jsx)(ag,{page:t,settings:e.settings,scale:s,thumbnail:!0})})}),a&&(0,K.jsx)(yS,{"data-trash":!0,title:u??`刪除第 ${r+1} 頁`,children:(0,K.jsx)(bS,{type:`button`,disabled:!!u,"aria-label":`刪除第 ${r+1} 頁`,onClick:e=>{e.stopPropagation(),g(r)},children:(0,K.jsx)(q,{name:`trash`,size:16})})})]})]},t.index)}),d!==null&&(0,K.jsx)(xS,{style:{top:d}})]}),p&&(0,K.jsx)(W_,{title:p.title,confirmLabel:`刪除`,onConfirm:()=>{p.run(),m(null)},onCancel:()=>m(null)})]})}var fS=B.div`
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
  gap: ${iS}px;
`,pS=4,mS=6,hS=B.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  /* 縮圖上、右、下三邊跟灰底等距，灰底圓角＝縮圖圓角＋這段距離，內外兩層的弧線才是同心的 */
  padding: ${mS}px ${mS}px ${mS}px 2px;
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
`,gS=B.span`
  flex: none;
  inline-size: 16px;
  padding-block-start: 2px;
  text-align: end;
  font-size: var(--ds-typography-label-size);
  line-height: var(--ds-typography-label-line-height);
  font-weight: ${e=>e.$on?700:500};
  font-variant-numeric: tabular-nums;
  color: ${e=>e.$on?e.theme.text.primary:e.theme.text.tertiary};
`,_S=B.span`
  position: relative;
  flex: none;
  display: block;
`,vS=B.div`
  overflow: hidden;
  border-radius: ${pS}px;
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
`,yS=B.span`
  position: absolute;
  inset-block-start: 4px;
  inset-inline-end: 4px;
  opacity: 0;
  transition: opacity 0.12s;

  ${hS}:hover &,
  ${hS}:focus-within & { opacity: 1; }
`,bS=B.button`
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
`,xS=B.div`
  position: absolute;
  inset-inline: ${e=>e.theme.space.insetSm} ${e=>e.theme.space.gapXs};
  block-size: 3px;
  margin-block-start: -1.5px;
  border-radius: 2px;
  background: ${e=>e.theme.text.primary};
  pointer-events: none;
`,SS=e=>e.depth===0?`章`:`節`;function CS(e,t){let n=Yf(e.rows,t.rowId);if(!n)return null;let r=n.columns.flatMap(e=>e.blocks).filter(e=>e.type===`text`);return r.find(e=>e.role===t.role)??r[0]??null}function wS(e,t,n){let r=t.findIndex(e=>e.rowId===n.rowId&&e.role===n.role),i=t.slice(r+1).find(e=>e.depth<=n.depth),a=e.rows.map(e=>e.id),o=a.indexOf(n.rowId),s=i?a.indexOf(i.rowId):a.length;return o<0?[]:a.slice(o,s)}function TS({doc:e,pages:t,current:n,onGoRow:r,dispatch:i}){let[a,o]=(0,R.useState)(null),[s,c]=(0,R.useState)(``),[l,u]=(0,R.useState)(null),d=Xv(e),f=d.filter(e=>e.depth<=1),p=f.map(e=>Zv(t,e.rowId)),m=p.reduce((e,t,r)=>t>=0&&t<=n?r:e,-1),h=(0,R.useRef)(null);(0,R.useEffect)(()=>{h.current?.scrollIntoView({block:`nearest`})},[n]);let g=e=>{i&&(o(e.rowId),c(e.text))},_=t=>{o(null);let n=s.trim();if(!i||!n||n===t.text)return;let r=CS(e,t);r&&i({type:`setText`,blockId:r.id,text:n})},v=t=>wS(e,d,t).length===0?`找不到這一段的範圍`:null,y=t=>{if(!i||v(t))return;let n=wS(e,d,t);u({title:`刪除「${t.text}」整${SS(t)}？`,run:()=>i({type:`deleteRows`,rowIds:n})})};return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(ES,{children:[f.length===0&&(0,K.jsx)(PS,{children:`尚無標題`}),f.map((e,t)=>{let n=p[t],l=t===m,u=i?v(e):null;return(0,K.jsxs)(DS,{ref:l?h:void 0,$on:l,$depth:e.depth,children:[a===e.rowId?(0,K.jsx)(jS,{autoFocus:!0,value:s,"aria-label":`重新命名`,onChange:e=>c(e.target.value),onFocus:e=>e.target.select(),onBlur:()=>_(e),onKeyDown:t=>{t.key===`Enter`?(t.preventDefault(),_(e)):t.key===`Escape`&&(t.preventDefault(),o(null))}}):(0,K.jsxs)(OS,{type:`button`,$on:l,$depth:e.depth,"aria-current":l?`location`:void 0,onClick:()=>r(e.rowId),onDoubleClick:()=>g(e),title:i?`點一下跳過去，點兩下改名`:void 0,children:[(0,K.jsx)(kS,{children:e.text}),n>=0&&(0,K.jsx)(AS,{$on:l,children:n+1})]}),i&&a!==e.rowId&&(0,K.jsx)(MS,{title:u??`刪除整${SS(e)}`,children:(0,K.jsx)(NS,{type:`button`,disabled:!!u,"aria-label":`刪除「${e.text}」整${SS(e)}`,onClick:()=>y(e),children:(0,K.jsx)(q,{name:`trash`,size:16})})})]},e.rowId)})]}),l&&(0,K.jsx)(W_,{title:l.title,confirmLabel:`刪除`,onConfirm:()=>{l.run(),u(null)},onCancel:()=>u(null)})]})}var ES=B.div`
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
`,DS=B.div`
  position: relative;
  display: flex;
  align-items: center;
  /* 縮排就是標題層級，不必再標「章／節」。縮在整列上，灰底才會跟著縮進去 */
  margin-inline-start: ${e=>e.$depth*12}px;
  border-radius: ${e=>e.theme.radius.field};
  background: ${e=>e.$on?e.theme.surface.sunken:`transparent`};
  transition: background 0.12s;

  &:hover { background: ${e=>e.theme.surface.sunken}; }
`,OS=B.button`
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
  ${DS}:hover & { padding-inline-end: 36px; }
  min-block-size: 36px;
  cursor: pointer;
  border: none;
  border-radius: ${e=>e.theme.radius.field};
  background: transparent;
  color: ${e=>e.$depth===0||e.$on?e.theme.text.primary:e.theme.text.secondary};
  font-weight: ${e=>e.$depth===0?600:e.$on?500:400};
`,kS=B.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,AS=B.span`
  flex: none;
  color: ${e=>e.$on?e.theme.text.primary:e.theme.text.tertiary};
  font-size: var(--ds-typography-label-size);
  font-variant-numeric: tabular-nums;
  /* 滑過時讓位給垃圾桶 */
  ${DS}:hover & { visibility: hidden; }
`,jS=B.input`
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
`,MS=B.span`
  position: absolute;
  inset-inline-end: 4px;
  inset-block-start: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.12s;

  ${DS}:hover &,
  ${DS}:focus-within & { opacity: 1; }
`,NS=B.button`
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
`,PS=B.p`
  margin: 0;
  padding: ${e=>e.theme.space.insetSm};
  font-size: var(--ds-typography-label-size);
  line-height: 1.6;
  color: ${e=>e.theme.text.tertiary};
`,FS=.25,IS=10,LS=e=>Math.max(FS,Math.min(3,e)),RS=e=>Math.round(e*100);function zS(e,{pageWidth:t,pageHeight:n,reserveX:r,reserveY:i,watch:a}){let[o,s]=(0,R.useState)(1),[c,l]=(0,R.useState)(1);(0,R.useEffect)(()=>{let a=e.current;if(!a)return;let o=0,c=()=>{let e=a.clientWidth-r,l=a.clientHeight-i;if(e<=0||l<=0){o=requestAnimationFrame(c);return}s(Math.min(e/t,l/n))};c(),window.addEventListener(`resize`,c),document.addEventListener(`visibilitychange`,c);let l=typeof ResizeObserver>`u`?null:new ResizeObserver(c);return l?.observe(a),()=>{cancelAnimationFrame(o),window.removeEventListener(`resize`,c),document.removeEventListener(`visibilitychange`,c),l?.disconnect()}},[e,t,n,r,i,a]);let u=(0,R.useCallback)(e=>l(LS(Math.round(e*100)/100)),[]),d=(0,R.useCallback)(()=>l(e=>LS((Math.floor(RS(e)/IS)*IS+IS)/100)),[]),f=(0,R.useCallback)(()=>l(e=>LS((Math.ceil(RS(e)/IS)*IS-IS)/100)),[]),p=(0,R.useCallback)(()=>l(1),[]);return{scale:o*c,zoom:c,percent:RS(c),setZoom:u,zoomIn:d,zoomOut:f,resetZoom:p}}var BS=100,VS=e=>e<=BS?(e-FS*100)/(BS-FS*100)*50:50+(e-BS)/(300-BS)*50,HS=e=>e<=50?FS*100+e/50*(BS-FS*100):BS+(e-50)/50*(300-BS);function US({percent:e,onZoom:t}){return(0,K.jsxs)(WS,{"aria-label":`縮放`,"data-ui":!0,children:[(0,K.jsx)(GS,{type:`range`,min:0,max:100,step:.5,value:VS(e),style:{"--fill":`${VS(e)}%`},onChange:e=>t(Math.round(HS(Number(e.target.value)))/100),"aria-label":`縮放倍率`,"aria-valuetext":`${e}%`}),(0,K.jsxs)(KS,{type:`button`,onClick:()=>t(1),title:`回到 100%`,children:[e,`%`]})]})}var WS=B.div`
  flex: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: ${e=>e.theme.surface.raised};
  writing-mode: horizontal-tb;
`,GS=B.input`
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
`,KS=B.button`
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
`,qS=50,JS=120,YS=320,XS=28,ZS=8;function QS({doc:e,pages:t,current:n,onGoPage:r,onGoRow:i,dispatch:a,zoom:o}){let[s,c]=(0,R.useState)(`pages`),[l,u]=(0,R.useState)(!0),[d,f]=(0,R.useState)(152),p=(0,R.useRef)(null),m=e=>{p.current={x:e.clientX,w:l?d:XS};let t=e.currentTarget;try{t.setPointerCapture(e.pointerId)}catch{}let n=e=>{let t=p.current;if(!t)return;let n=t.w+(e.clientX-t.x);if(n<96){u(!1);return}u(!0),f(Math.max(JS,Math.min(YS,n)))},r=()=>{p.current=null,window.removeEventListener(`pointermove`,n),window.removeEventListener(`pointerup`,r),window.removeEventListener(`pointercancel`,r)};window.addEventListener(`pointermove`,n),window.addEventListener(`pointerup`,r),window.addEventListener(`pointercancel`,r),e.preventDefault()},h=Xv(e).filter(e=>e.depth<=1).length;return l?(0,K.jsxs)($S,{"data-page-rail":!0,$inline:d,style:{paddingInlineEnd:ZS},children:[(0,K.jsx)(eC,{children:(0,K.jsx)($x,{compact:!0,"aria-label":`側欄內容`,value:s,options:[{value:`pages`,label:`頁面 ${t.length}`},{value:`outline`,label:`目次 ${h}`}],onChange:c})}),s===`pages`?(0,K.jsx)(dS,{doc:e,pages:t,current:n,thumbInline:d-qS,onGoPage:r,dispatch:a}):(0,K.jsx)(TS,{doc:e,pages:t,current:n,onGoRow:i,dispatch:a}),o&&(0,K.jsx)(US,{...o}),(0,K.jsx)(tC,{role:`separator`,"aria-label":`調整側欄寬度`,title:`拖曳調整寬度，拖到底收合`,onPointerDown:m})]}):(0,K.jsx)($S,{"data-page-rail":!0,$inline:XS,children:(0,K.jsx)(tC,{role:`separator`,"aria-label":`展開側欄`,title:`往右拖或點一下展開`,$vertical:!0,onPointerDown:m,onClick:()=>u(!0),children:(0,K.jsx)(q,{name:`chevron-right`,size:16})})})}var $S=B.nav`
  position: relative;
  inline-size: ${e=>e.$inline}px;
  flex: none;
  display: flex;
  flex-direction: column;
  background: ${e=>e.theme.surface.raised};
  /* 縮圖列永遠橫排，即使教材是直排——它是介面不是內容 */
  writing-mode: horizontal-tb;
`,eC=B.div`
  /* 切換鈕撐滿整欄寬 */
  display: grid;
  /* 上緣不留白：切換鈕的頂端跟右邊編輯區的灰卡切齊 */
  padding: 0 6px;
`,tC=B.div`
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  inline-size: ${e=>e.$vertical?`100%`:`${ZS}px`};
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
`;function nC({samples:e,onApply:t,onClose:n}){let[r,i]=(0,R.useState)(null),[a,o]=(0,R.useState)(null),[s,c]=(0,R.useState)(null),[l,u]=(0,R.useState)(!1);(0,R.useEffect)(()=>{let e=e=>e.key===`Escape`&&n();return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[n]);let d=(e,t)=>{try{o(ci(t,{autoPageBreak:!0})),i(e),c(null)}catch{c(`這個檔案讀不進來，請確認是教材的 md 格式`),o(null),i(null)}},f=()=>{i(null),o(null),c(null)},p=async e=>{e&&d(e.name,await e.text())},m=()=>{let e=document.createElement(`input`);e.type=`file`,e.accept=`.md,text/markdown,text/plain`,e.onchange=()=>void p(e.files?.[0]),e.click()},h=a?.unrecognized.length??0,g=s??(h>0?`有 ${h} 行沒辨識出來，會當成內文`:null),_=!!r&&r in e;return(0,G.createPortal)((0,K.jsx)(rC,{onClick:n,children:(0,K.jsxs)(iC,{role:`dialog`,"aria-modal":`true`,"aria-label":`匯入 .md 檔`,onClick:e=>e.stopPropagation(),children:[(0,K.jsxs)(aC,{children:[(0,K.jsx)(`span`,{children:`匯入 .md 檔`}),(0,K.jsx)(oC,{type:`button`,onClick:n,"aria-label":`關閉`,title:`關閉`,children:(0,K.jsx)(q,{name:`x`,size:24,label:`關閉`})})]}),(0,K.jsxs)(sC,{$over:l,onDragOver:e=>{e.dataTransfer.types.includes(`Files`)&&(e.preventDefault(),u(!0))},onDragLeave:()=>u(!1),onDrop:e=>{e.preventDefault(),u(!1),p(e.dataTransfer.files[0])},children:[(0,K.jsxs)(cC,{type:`button`,onClick:m,children:[`上傳 md 檔`,(0,K.jsx)(q,{name:`upload`,size:16})]}),r&&!_&&(0,K.jsx)(lC,{children:r})]}),(0,K.jsx)(uC,{role:`group`,"aria-label":`內建範例`,children:Object.keys(e).map(t=>(0,K.jsx)(dC,{type:`button`,$on:r===t,"aria-pressed":r===t,onClick:()=>r===t?f():d(t,e[t]),children:t},t))}),g&&(0,K.jsx)(fC,{role:`alert`,children:g}),(0,K.jsxs)(pC,{children:[(0,K.jsx)(mC,{type:`button`,onClick:n,children:`取消`}),(0,K.jsx)(hC,{type:`button`,disabled:!a,onClick:()=>a&&t(a),children:`匯入`})]})]})}),document.body)}var rC=B.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: ${wu};
  display: grid;
  place-items: center;
  padding: ${e=>e.theme.space.insetLg};
`,iC=B.div`
  inline-size: min(480px, 100%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${e=>e.theme.space.insetLg};
  background: ${e=>e.theme.surface.page};
  border-radius: ${e=>e.theme.radius.panel};
  box-shadow: ${e=>e.theme.shadow.float};
`,aC=B.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${e=>e.theme.typography.bodyLgSize};
  line-height: ${e=>e.theme.typography.bodyLgLineHeight};
`,oC=B.button`
  display: grid;
  place-items: center;
  inline-size: 24px;
  block-size: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${e=>e.theme.icon.default};
  cursor: pointer;
`,sC=B.div`
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
`,cC=B.button`
  ${bs}
  flex: none;
`,lC=B.span`
  max-inline-size: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-caption-size);
  color: ${e=>e.theme.text.tertiary};
`,uC=B.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.space.gapSm};
`,dC=B.button`
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
`,fC=B.p`
  margin: -8px 0 0;
  text-align: center;
  font-size: ${e=>e.theme.typography.labelSize};
  line-height: ${e=>e.theme.typography.labelLineHeight};
  font-weight: 500;
  color: ${e=>e.theme.feedback.errorDefault};
`,pC=B.footer`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.space.gapSm};
`,mC=B.button`
  border: none;
  background: transparent;
  color: ${e=>e.theme.action.ghostText};
  font-size: var(--ds-typography-label-size);
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.control};
  padding: 0 20px;
  min-block-size: ${e=>e.theme.control.heightMd};
  &:hover { background: ${e=>e.theme.action.ghostBgHover}; }
`,hC=B.button`
  ${bs}
  min-block-size: ${e=>e.theme.control.heightMd};
  font-size: var(--ds-typography-label-size);
`;function gC({doc:e,onPatch:t,onMeta:n,onClose:r,onImport:i}){cc(!0,r),(0,R.useEffect)(()=>{let e=e=>{e.key===`Escape`&&r()};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[r]);let a=e.settings,o=e.meta,s=o.stage===`國中`?[`1`,`2`,`3`]:[`1`,`2`,`3`,`4`,`5`,`6`],c=_C[o.stage===`國中`?`國中`:`國小`],l=o.subject&&!c.includes(o.subject)?[o.subject,...c]:c;return(0,G.createPortal)((0,K.jsxs)(lc,{role:`dialog`,"aria-label":`教材設定`,children:[(0,K.jsxs)(uc,{children:[(0,K.jsx)(dc,{children:`設定`}),(0,K.jsx)(fc,{onClick:r,"aria-label":`關閉`,children:(0,K.jsx)(q,{name:`x`,size:24,label:`關閉`})})]}),(0,K.jsxs)(pc,{children:[(0,K.jsxs)(bC,{children:[(0,K.jsx)(xC,{children:`版型`}),(0,K.jsx)($x,{"aria-label":`版型`,value:a.layout??`paged`,options:[{value:`paged`,label:`自動切頁`},{value:`flow`,label:`流式排版`}],onChange:e=>t({layout:e})})]}),(0,K.jsxs)(bC,{children:[(0,K.jsx)(xC,{children:`排版`}),(0,K.jsx)($x,{"aria-label":`排版`,value:a.writingMode,options:[{value:`horizontal`,label:`橫排`},{value:`vertical`,label:`直排`}],onChange:e=>t({writingMode:e})})]}),(0,K.jsxs)(bC,{children:[(0,K.jsxs)(xC,{children:[`頁面比例`,(0,K.jsxs)(SC,{type:`button`,"aria-label":`頁面比例怎麼選`,"aria-describedby":`ratio-hint`,children:[(0,K.jsx)(q,{name:`info`,size:16}),(0,K.jsx)(CC,{id:`ratio-hint`,role:`tooltip`,children:`學生使用 iPad 選 4:3，Chromebook 選 16:9。`})]})]}),(0,K.jsx)($x,{"aria-label":`頁面比例`,value:a.aspectRatio,options:[`4:3`,`16:9`].map(e=>({value:e,label:e})),onChange:e=>t({aspectRatio:e})})]}),(0,K.jsxs)(bC,{children:[(0,K.jsxs)(yC,{children:[`出版社`,(0,K.jsx)(vC,{value:o.publisher??``,onChange:e=>n({publisher:e.target.value}),placeholder:`出版社名稱`})]}),(0,K.jsxs)(yC,{as:`div`,children:[`適用年級`,(0,K.jsxs)(wC,{children:[(0,K.jsx)(mg,{"aria-label":`教育階段`,placeholder:`階段`,value:o.stage??``,options:[`國小`,`國中`].map(e=>({value:e,label:e})),onChange:e=>n({stage:e||void 0,grade:void 0,subject:o.subject&&_C[e===`國中`?`國中`:`國小`].includes(o.subject)?o.subject:void 0})}),(0,K.jsx)(mg,{"aria-label":`年級`,placeholder:`年級`,value:o.grade??``,options:s.map(e=>({value:e,label:`${e} 年級`})),onChange:e=>n({grade:e||void 0})}),(0,K.jsx)(mg,{"aria-label":`學期`,placeholder:`學期`,value:o.term??``,options:[{value:`上`,label:`上學期`},{value:`下`,label:`下學期`}],onChange:e=>n({term:e||void 0})})]})]}),(0,K.jsxs)(yC,{as:`div`,children:[`科目`,(0,K.jsx)(mg,{"aria-label":`科目`,placeholder:`選擇科目`,value:o.subject??``,options:l.map(e=>({value:e,label:e})),onChange:e=>n({subject:e||void 0})})]})]}),i&&(0,K.jsxs)(bC,{children:[(0,K.jsx)(xC,{children:`匯入教材`}),(0,K.jsxs)(TC,{type:`button`,onClick:i,children:[`匯入 .md 檔`,(0,K.jsx)(q,{name:`upload`,size:16})]})]})]})]}),document.body)}var _C={國小:[`國語`,`英語`,`數學`,`自然`,`社會`],國中:[`國文`,`英文`,`數學`,`歷史`,`地理`]},vC=B.input`
  ${gc}
`,yC=B.label`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
  font-size: var(--ds-typography-label-size);
  font-weight: var(--ds-typography-label-weight);
  color: ${e=>e.theme.text.secondary};
`,bC=B.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapSm};
`,xC=B.span`
  display: inline-flex;
  align-items: center;
  font-size: var(--ds-typography-label-size);
  font-weight: var(--ds-typography-label-weight);
  color: ${e=>e.theme.text.secondary};
`,SC=B.button`
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
`,CC=B.span`
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

  ${SC}:hover &,
  ${SC}:focus & { opacity: 1; }
`,wC=B.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${e=>e.theme.space.gapXs};
`,TC=B.button`
  ${bs}
`,EC=4,DC=(0,R.forwardRef)(function({children:e},t){let n=$u(),r=(0,R.useRef)(null),[i,a]=(0,R.useState)(!1),o=(0,R.useRef)(null),s=e=>{o.current!==e&&(o.current=e,n?.setHoverGap(e))},c=async(e,t,r)=>{if(!n)return;let i=OC(t,r);for(let t of e){let e=await Ym(t);if(`error`in e){Es(e.error);continue}n.dispatch({type:`insertRow`,index:i,blocks:[Fi(Vh(e.asset),n.doc.settings)]}),i+=1}};return(0,K.jsx)(kC,{ref:t,$dragOver:i,onDragOver:e=>{e.dataTransfer.types.includes(`Files`)&&(e.preventDefault(),e.dataTransfer.dropEffect=`copy`,i||a(!0))},onDragLeave:e=>{e.currentTarget.contains(e.relatedTarget)||a(!1)},onDrop:e=>{e.dataTransfer.types.includes(`Files`)&&(e.preventDefault(),a(!1),c([...e.dataTransfer.files],e.clientX,e.clientY))},style:n?.hoverGap!==null&&n?.hoverGap!==void 0?{cursor:`pointer`}:void 0,onPointerMove:e=>{if(!(!n||e.pointerType===`touch`)){if(n.insertAt!==null||n.draggingRowId||e.target.closest(`[data-block-id], button, input, select, textarea, [contenteditable], [data-ui], a`))return s(null);s(OC(e.clientX,e.clientY))}},onPointerLeave:()=>s(null),onPointerDown:e=>{if(!n)return;let t=document.activeElement?.isContentEditable??!1;r.current={x:e.clientX,y:e.clientY,wasOpen:n.insertAt!==null,wasSelected:!!n.selectedBlockId||!!n.inlineSelection||t}},onClick:e=>{let t=r.current;if(r.current=null,!n||!t||Math.hypot(e.clientX-t.x,e.clientY-t.y)>EC)return;let i=e.target;if(!i.closest(`button, input, select, textarea, [contenteditable], [data-ui], a`)){if(i.closest(`[data-block-id]`)){t.wasOpen&&n.openInsert(null);return}if(t.wasOpen){n.openInsert(null);return}if(t.wasSelected){n.deselect();return}s(null),n.openInsert(OC(e.clientX,e.clientY))}},children:e})});function OC(e,t){let n=[...document.querySelectorAll(`main [data-page-index]`)],r=null,i=1/0;for(let a of n){let n=a.getBoundingClientRect(),o=t<n.top?n.top-t:t>n.bottom?t-n.bottom:0,s=e<n.left?n.left-e:e>n.right?e-n.right:0,c=Math.hypot(s,o);c<i&&(i=c,r=a)}if(r){let t=[...r.querySelectorAll(`[data-flow-panel]`)];if(t.length>0){let n=1/0,i=null;for(let r of t){let t=r.getBoundingClientRect(),a=e<t.left?t.left-e:e>t.right?e-t.right:0;a<n&&(n=a,i=r)}i&&(r=i)}}let a=[...(r??document).querySelectorAll(`[data-row-id]`)];if(a.length===0)return 0;let o=getComputedStyle(a[0]).writingMode.startsWith(`vertical`),s=o?-e:t,c=null;for(let e of a){let t=e.getBoundingClientRect(),n=o?-t.right:t.top,r=o?-t.left:t.bottom,i=s<n?n-s:s>r?s-r:0,a=Number(e.dataset.rowIndex);(!c||i<c.dist)&&(c={r:t,index:a,dist:i})}if(!c)return 0;let l=s>(o?-(c.r.left+c.r.width/2):c.r.top+c.r.height/2)?c.index+1:c.index,u=Number(a[0].dataset.rowIndex);return r?.closest(`[data-page-index]`)?.getAttribute(`data-page-index`)===`0`?l:Math.max(u+1,l)}var kC=B.main`
  flex: 1;
  min-block-size: 0;
  overflow: auto;
  /* 左右的 56px 留白不放這裡，放在 App 的 PageSlot 上：可捲動的 flex 容器捲到最右時
     不算自己右側的 padding，放大後頁面右緣會直接貼到編輯區邊界、看起來捲不過去 */
  padding: ${e=>e.theme.space.insetXl} 0;
  background: ${e=>e.$dragOver?e.theme.surface.muted:e.theme.surface.sunken};
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
`,AC=[{label:`白`,color:null},{label:`灰`,color:`#F5F5F5`},{label:`米`,color:`#FBF7EE`},{label:`萊姆`,color:`#F9FFCF`},{label:`琥珀`,color:`#FDF3D1`},{label:`橘`,color:`#FFE7DA`},{label:`森林`,color:`#D9F3E8`},{label:`天藍`,color:`#D6F5FB`},{label:`紫`,color:`#E6E2F8`}];function jC({value:e,disabled:t,onChange:n}){let[r,i]=(0,R.useState)(!1),a=(0,R.useRef)(null),[o,s]=(0,R.useState)(null);(0,R.useEffect)(()=>{if(!r)return;let e=()=>{let e=a.current?.getBoundingClientRect();e&&s({top:e.bottom+8,left:e.left})};e();let t=e=>{let t=e.target;t.closest(`[data-bg-popover]`)||t===a.current||i(!1)},n=e=>e.key===`Escape`&&i(!1);return window.addEventListener(`pointerdown`,t,!0),window.addEventListener(`keydown`,n),window.addEventListener(`scroll`,e,!0),()=>{window.removeEventListener(`pointerdown`,t,!0),window.removeEventListener(`keydown`,n),window.removeEventListener(`scroll`,e,!0)}},[r]);let c=!!(e?.color||e?.assetId),l=e?.color&&!AC.some(t=>t.color===e.color)?e.color:null,u=(0,R.useRef)(null);return(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(MC,{ref:a,type:`button`,"data-ui":!0,disabled:t,$open:r,$has:c,onClick:()=>i(e=>!e),title:t?`這一頁接續上一段，背景跟著上一頁`:`當頁背景`,"aria-label":`當頁背景`,children:[(0,K.jsx)(q,{name:`palette`,size:16}),c&&(0,K.jsx)(NC,{style:{background:e?.assetId?`center / cover url(${$a(e.assetId)})`:e?.color}})]}),r&&o&&(0,G.createPortal)((0,K.jsxs)(PC,{"data-bg-popover":!0,"data-ui":!0,style:o,role:`dialog`,"aria-label":`當頁背景`,children:[(0,K.jsxs)(FC,{children:[AC.map(t=>(0,K.jsx)(IC,{type:`button`,title:t.label,$on:(e?.color??null)===t.color&&!e?.assetId,style:{background:t.color??`#fff`},onClick:()=>n(t.color?{color:t.color}:null)},t.label)),(0,K.jsxs)(LC,{type:`button`,title:`自訂顏色`,$on:!!l&&!e?.assetId,style:l?{background:l}:void 0,onClick:()=>u.current?.click(),children:[!l&&(0,K.jsx)(q,{name:`plus`,size:16}),(0,K.jsx)(`input`,{ref:u,type:`color`,value:l??`#ffffff`,onChange:e=>n({color:e.target.value}),"aria-label":`自訂顏色`,tabIndex:-1})]})]}),(0,K.jsxs)(BC,{children:[(0,K.jsxs)(zC,{type:`button`,onClick:async()=>{let t=await co(`image/*`);if(!t)return;let{assetId:r}=await so(t);n({...e?.color?{color:e.color}:{},assetId:r})},children:[`上傳圖片`,(0,K.jsx)(q,{name:`upload`,size:16})]}),c&&(0,K.jsxs)(VC,{type:`button`,onClick:()=>n(null),children:[`清除`,(0,K.jsx)(q,{name:`x`,size:16})]})]})]}),document.body)]})}var MC=B.button`
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
`,NC=B.span`
  position: absolute;
  inset-inline-end: -4px;
  inset-block-end: -4px;
  inline-size: 12px;
  block-size: 12px;
  border-radius: 999px;
  border: 2px solid ${e=>e.theme.surface.raised};
  box-shadow: 0 0 0 1px ${e=>e.theme.border.subtle};
`,PC=B.div`
  position: fixed;
  z-index: 900;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.space.gapMd};
  padding: ${e=>e.theme.space.insetSm};
  border-radius: ${e=>e.theme.radius.panel};
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${e=>e.theme.surface.page};
  /* 跟其他選單（Dropdown、文字工具的彈窗）同一款：白底圓角、只靠陰影，不畫框 */
  box-shadow: ${e=>e.theme.shadow.card};
  writing-mode: horizontal-tb;
`,FC=B.div`
  ${ad}
`,IC=B.button`
  ${rd}
`,LC=B(IC)`
  ${id}
`,RC=z`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: inherit;
  font-size: var(--ds-typography-label-size);
  min-block-size: ${e=>e.theme.control.heightSm};
  padding: 0 10px;
  cursor: pointer;
  border-radius: ${e=>e.theme.radius.control};
`,zC=B.button`
  ${RC}
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.action.primaryBg};
  background: ${e=>e.theme.action.primaryBg};
  color: ${e=>e.theme.action.primaryText};
  &:hover {
    background: ${e=>e.theme.action.primaryBgHover};
    border-color: ${e=>e.theme.action.primaryBgHover};
  }
`,BC=B.div`
  display: flex;
  gap: 6px;

  & > * { flex: 1; justify-content: center; }
`,VC=B.button`
  ${RC}
  border: ${e=>e.theme.border.widthDefault} solid ${e=>e.theme.border.subtle};
  background: ${e=>e.theme.surface.raised};
  color: ${e=>e.theme.text.secondary};
  /* 次要按鈕的滑過：品牌深綠的框與字（跟「新增補充」「插入標籤」同一款） */
  &:hover { border-color: ${e=>e.theme.border.accent}; color: ${e=>e.theme.text.accent}; }
`;function HC(e){let t=e=>e.type===`text`&&e.spans.some(e=>e.keyword&&e.text.includes(`星座`)),n=e.rows.find(e=>e.columns.some(e=>e.blocks.some(e=>e.type===`text`&&yr(e).includes(`用星圖找星座`))))?.id??null,r=[{id:`star-pop-1`,kind:`text`,title:`什麼是星座？`,body:`國際天文聯合會把整片天空劃分成 88 個星座，天上的每一顆星都屬於其中一個。同一個星座裡的星星看起來靠在一起，其實離我們的距離可能差很多。`},{id:`star-pop-1b`,kind:`text`,title:`星座和星等不一樣`,body:`星座是天空的分區，星等是星星有多亮。數字越小越亮，最亮的星甚至是負的星等。`}],i=[{id:`star-pop-2`,kind:`image`,title:`把星星連起來：獵戶座`,assetId:`images/orion-lines.jpg`},{id:`star-pop-3`,kind:`image`,title:`古人畫的星座圖（1824 年）`,assetId:`images/star-chart.jpg`}],a=[{id:`star-pop-4`,kind:`web`,title:`臺北市立天文科學教育館`,url:`https://www.tam.gov.taipei/`,embeddable:!1},{id:`star-pop-4b`,kind:`web`,title:`維基百科：夏季大三角`,url:`https://zh.wikipedia.org/zh-tw/夏季大三角`,embeddable:!0}],o=n?[{id:`star-pop-5`,kind:`jump`,title:`怎麼用星圖找星座`,targetRowId:n}]:[],s=[{id:`star-pop-6`,kind:`video`,title:`星軌縮時`,source:`upload`,ref:`sample-video-star-trails`},{id:`star-pop-6b`,kind:`video`,title:`星軌縮時（再看一次）`,source:`upload`,ref:`sample-video-star-trails`}],c=[{id:`star-pop-10`,kind:`audio`,title:`三顆主角星`,assetId:`sample-audio-vega`}],l=[{id:`star-pop-7`,kind:`audio`,title:`夏季大三角旁白`,assetId:`sample-audio-narration`},{id:`star-pop-8`,kind:`audio`,title:`三顆主角星`,assetId:`sample-audio-vega`}],u=(e,t,n=`body`)=>({...vr(t,n),id:e}),d=[[u(`rich-1-h`,`夏季大三角怎麼找`,`sectionTitle`),{id:`rich-1-img`,type:`image`,assetId:`images/orion-lines.jpg`,alt:`把星星連成圖案`,caption:``,hasCaption:!1,aspectRatio:3/2,widthPct:40,float:`left`,popups:[]},u(`rich-1-p`,`夏天晚上八、九點往東方天空看，先找最亮的織女星，再往下找牛郎星，最後在兩顆星的左邊找到天津四。把三顆星連起來，就是一個大大的三角形。這三顆星分別屬於天琴座、天鷹座和天鵝座。`)],[u(`rich-2-h`,`看看星星怎麼移動`,`sectionTitle`),{id:`rich-2-v`,type:`video`,source:`upload`,ref:`sample-video-star-trails`,title:`星軌縮時`,widthPct:55,float:`right`,popups:[]},u(`rich-2-p`,`把相機對著天空連續拍一整晚，星星會畫出一圈一圈的弧線。這是因為地球在自轉，星星看起來就繞著北極星轉。`),{id:`rich-2-a`,type:`audio`,assetId:`sample-audio-narration`,title:`夏季大三角旁白`,widthPct:40,popups:[]}],[u(`rich-3-h`,`想知道更多`,`sectionTitle`),u(`rich-3-p`,`到天文館看看星象儀，或上網查夏季大三角的資料。`),{id:`rich-3-w`,type:`web`,url:`https://www.tam.gov.taipei/`,title:`臺北市立天文科學教育館`,presentation:`bookmark`,chosen:!0,widthPct:60,popups:[]}]],f=[{id:`star-pop-9`,kind:`rich`,title:`夏季大三角小百科`,blocks:d[0],pages:d}],p=e=>e.slice(0,1),m=[{id:`star-pop-11`,kind:`text`,title:``,body:`沒寫標題的文字補充：泡泡裡直接是內文，不補「文字」兩個字。`}],h=[{id:`star-pop-12`,kind:`image`,title:`夏季大三角`,assetId:`images/summer-triangle.jpg`}],g=[...i,{id:`star-pop-13`,kind:`image`,title:``,assetId:`images/star-trails.jpg`}],_=n?[...o,{id:`star-pop-14`,kind:`jump`,title:`回到課文開頭`,targetRowId:e.rows[0]?.id??null}]:[],v=[r,g,a,o,s,l,f,c,m,h,p(s).map(e=>({...e,id:`star-pop-15`})),p(a).map(e=>({...e,id:`star-pop-16`})),_].filter(e=>e.length>0),y=e.rows.flatMap(e=>e.columns.flatMap(e=>e.blocks)),b=y.findIndex(t);if(b<0)return UC(e);let x=new Map,S=y.slice(b).filter(e=>e.type===`text`||e.type===`image`);v.forEach((e,t)=>{S[t]&&x.set(S[t].id,e)});let C=e.rows.map(e=>({...e,columns:e.columns.map(e=>({...e,blocks:e.blocks.map(e=>x.has(e.id)?{...e,popups:x.get(e.id)}:e)}))}));return{...e,rows:C}}function UC(e){let t=e.rows.flatMap(e=>e.columns.flatMap(e=>e.blocks)),n=e=>t.find(t=>t.type===`text`&&yr(t).replace(/^\s+/,``).startsWith(e)),r=t=>e.rows.find(e=>e.columns.some(e=>e.blocks.some(e=>e===n(t))))?.id??null,i=new Map,a=(e,t)=>{let r=n(e);r&&t.length>0&&i.set(r.id,t)},o=(e,t,n=`body`)=>({...vr(t,n),id:e}),s=(e,t,n,r)=>({id:e,type:`image`,assetId:t,alt:n,caption:``,hasCaption:!1,aspectRatio:r,widthPct:45,float:`right`,popups:[]}),c=[[o(`ml-rich-1-h`,`換回女裝的木蘭`,`sectionTitle`),s(`ml-rich-1-img`,`images/mulan-silk-painting.jpg`,`清代絹本設色的木蘭像`,699/1200),o(`ml-rich-1-p`,`「脫我戰時袍，著我舊時裳。當窗理雲鬢，對鏡貼花黃。」這幅清代的絹畫裡，木蘭穿著女裝，身上仍背著弓箭。`)],[o(`ml-rich-2-h`,`木蘭當戶織`,`sectionTitle`),s(`ml-rich-2-img`,`images/mulan-loom.jpg`,`明清時期的木織機`,1200/800),o(`ml-rich-2-p`,`詩一開頭的「唧唧」是織布機的聲音。照片是杭州國家版本館展出的木織機。`)]];a(`題解`,[{id:`ml-pop-img-1`,kind:`image`,title:`木蘭像（1772 年木刻版畫）`,assetId:`images/mulan-portrait.jpg`}]),a(`本詩選自`,[{id:`ml-pop-text-1`,kind:`text`,title:`什麼是樂府`,body:`樂府原本是漢代掌管音樂的官署，負責採集各地民歌配樂演唱。後來把這些可以入樂的詩歌也稱為「樂府」。`},{id:`ml-pop-text-2`,kind:`text`,title:`樂府雙璧`,body:`〈木蘭詩〉與〈孔雀東南飛〉都是長篇的樂府敘事詩，一北一南，後人合稱「樂府雙璧」。`}]),a(`萬里赴戎機`,[{id:`ml-pop-video-1`,kind:`video`,title:`敦煌的漢代長城`,source:`upload`,ref:`sample-video-mulan-wall`},{id:`ml-pop-video-2`,kind:`video`,title:`草原上的馬群`,source:`upload`,ref:`sample-video-mulan-horses`}]),a(`爺孃聞女來`,[{id:`ml-pop-rich-1`,kind:`rich`,title:`木蘭的樣子`,blocks:c[0],pages:c}]);let l=r(`唧唧復唧唧`);l&&a(`雄兔腳撲朔`,[{id:`ml-pop-jump-1`,kind:`jump`,title:`回到課文開頭`,targetRowId:l}]),a(`語文小視窗`,[{id:`ml-pop-web-1`,kind:`web`,title:`維基百科：木蘭辭`,url:`https://zh.wikipedia.org/zh-tw/木蘭辭`,embeddable:!0},{id:`ml-pop-web-2`,kind:`web`,title:`維基文庫：木蘭詩全文`,url:`https://zh.wikisource.org/zh-hant/木蘭詩`,embeddable:!1}]);let u=r(`東市買駿馬`),d=r(`萬里赴戎機`),f=[];u&&f.push({id:`ml-pop-jump-2`,kind:`jump`,title:`回到「東市買駿馬」`,targetRowId:u}),d&&f.push({id:`ml-pop-jump-3`,kind:`jump`,title:`回到「將軍百戰死」`,targetRowId:d}),a(`互文是`,f);let p=new Map,m=(e,t)=>{let r=n(e);r&&p.set(r.id,{paragraph:`start`,paraNotes:t})};m(`唧唧復唧唧`,{zhi:`木蘭停下織布嘆息，因為父親被徵召，決定代父從軍。`,xiu:`設問：「問女何所思？問女何所憶？」先提出疑問，再由木蘭自己回答。`,wen:`一、木蘭為什麼停下織布嘆息？
二、她最後做了什麼決定？`}),m(`東市買駿馬`,{zhi:`木蘭備齊鞍馬出征，一路上思念爹娘。`,xiu:`互文：東、西、南、北四市各買一樣，意思是跑遍各處市集把裝備買齊。`,ju:`「不聞……，但聞……」：聽不到爹娘的呼喚，只聽得到水聲、馬鳴，寫出離家越來越遠的思念。`}),m(`萬里赴戎機`,{zhi:`木蘭在邊塞征戰多年。`,xiu:`誇飾：「萬里赴戎機，關山度若飛」，寫行軍又遠又快。
對偶：「朔氣傳金柝，寒光照鐵衣」。`}),m(`歸來見天子`,{zhi:`木蘭立功歸來，不要官位，只想回到故鄉。`,wen:`木蘭為什麼不接受尚書郎的官位？從這裡可以看出她是怎樣的人？`}),m(`爺孃聞女來`,{zhi:`家人歡迎木蘭回家，木蘭換回女裝，同袍大為驚訝。`,xiu:`排比：「爺孃聞女來」「阿姊聞妹來」「小弟聞姊來」，依序寫家人的歡迎。`,ju:`「開我……，坐我……」「脫我……，著我……」：一連串的「我」，寫木蘭回到自己家的熟悉與歡喜。`,wen:`同袍為什麼「皆驚惶」？`}),m(`雄兔腳撲朔`,{zhi:`用雙兔並跑難辨雄雌作比，收束全詩。`,xiu:`譬喻：以雙兔並跑比喻男女在戰場上難以分辨。
設問：「安能辨我是雄雌？」答案在問題的反面。`});let h=[{id:`ml-note-loom`,phrase:`唧唧復唧唧，木蘭當戶織`,note:{kind:`sentence`,body:``,notes:{xiu:`摹寫：「唧唧」摹寫織布機的聲音。`}},popups:[{id:`ml-pop-audio-1`,kind:`audio`,title:`織布機的聲音`,assetId:`sample-audio-mulan-loom`}]},{id:`ml-note-zhu`,phrase:`機杼`,note:{kind:`word`,body:`織布機。杼，織布的梭子。`},popups:[{id:`ml-pop-img-loom`,kind:`image`,title:`明清時期的木織機`,assetId:`images/mulan-loom.jpg`},{id:`ml-pop-img-weaver`,kind:`image`,title:`雲南麗江，在織機前織布的婦女`,assetId:`images/mulan-weaver.jpg`}]},{id:`ml-note-jian`,phrase:`鞍韉`,note:{kind:`word`,body:`馬鞍和馬鞍下的墊子。`}},{id:`ml-word-river`,phrase:`黃河`,popups:[{id:`ml-pop-img-2`,kind:`image`,title:`黃河（壺口瀑布）`,assetId:`images/mulan-yellow-river.jpg`}]},{id:`ml-note-neigh`,phrase:`但聞燕山胡騎鳴啾啾`,note:{kind:`sentence`,body:``,notes:{}},popups:[{id:`ml-pop-audio-2`,kind:`audio`,title:`馬的嘶鳴`,assetId:`sample-audio-mulan-neigh`}]},{id:`ml-note-dan`,phrase:`旦辭黃河去，暮至黑山頭`,note:{kind:`sentence`,body:``,notes:{ju:`「旦……，暮……」：早晚兩個時間對舉，寫出行軍的迅速。`}}},{id:`ml-note-yuan`,phrase:`願為市鞍馬，從此替爺征`,note:{kind:`sentence`,body:``,notes:{wen:`木蘭可以不去，為什麼還是決定替父親從軍？`}}},{id:`ml-note-1`,phrase:`將軍百戰死，壯士十年歸`,note:{kind:`sentence`,body:``,notes:{xiu:`互文：將軍和壯士都身經百戰，有的戰死，有的多年後才歸來。`}}},{id:`ml-note-xun`,phrase:`策勳十二轉`,note:{kind:`word`,body:`記功時勳位連升了很多級。「十二」和詩中的「軍書十二卷」「同行十二年」一樣，是表示多的虛數，不是實際的數目。`}}],g=e=>{let t=e;for(let e of h){let n=ar(t.spans).indexOf(e.phrase);if(n<0)continue;let r=n+e.phrase.length,i=t.spans;e.note&&(i=ur(i,n,r,{noteId:e.id}));let a=e.popups?.[0]?.id;a&&(i=ur(i,n,r,{popupId:a}));let o=(e.popups??[]).map((e,t)=>t===0?e:{...e,wordGroup:a});t={...t,spans:i,rangeNotes:e.note?[...t.rangeNotes??[],{id:e.id,...e.note}]:t.rangeNotes,popups:[...t.popups,...o]}}return t};if(i.size===0&&p.size===0)return e;let _=e.rows.map(e=>({...e,columns:e.columns.map(e=>({...e,blocks:e.blocks.map(e=>{let t=i.has(e.id)?{...e,popups:i.get(e.id)}:e;return t.type===`text`&&p.has(e.id)&&(t={...t,...p.get(e.id)}),t.type===`text`&&t.paragraph&&(t=g(t)),t})}))})),v=_.findIndex(e=>e.columns.some(e=>e.blocks.some(e=>e.type===`text`&&yr(e).trim()===`題解`))),y=_[v+1],b=y?.columns.length===1?y.columns[0].blocks[0]:void 0;if(v>=0&&y&&b?.type===`text`&&yr(b).trim().startsWith(`本詩選自`)){let e=_[v],t={...e,columns:[{...e.columns[0],widthPct:12},{...y.columns[0],widthPct:88}]};_.splice(v,2,t)}return{...e,rows:_}}var WC=Object.assign({"../design/sample-demo.md":qn,"../design/sample-mulan.md":Jn}),GC=Object.fromEntries([[`sample-mulan`,`國文（範例・直排）`],[`sample-demo`,`自然（範例・橫排）`]].flatMap(([e,t])=>{let n=WC[`../design/${e}.md`];return n?[[t,n]]:[]})),KC=()=>Rx()??li(br(),HC(Ba(ci(`---
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
`,{autoPageBreak:!0}))));function qC(){let[e,t]=(0,R.useState)(!1),[n,r]=(0,R.useState)(0),[i,a]=(0,R.useState)(!1),[o,s]=(0,R.useState)(!1),[c]=(0,R.useState)(KC),l=up(c),{doc:u,dispatch:d,undo:f,redo:p,canUndo:m,canRedo:h}=l,g=(0,R.useCallback)(e=>u.rows.findIndex(t=>t.id===e),[u.rows]),{pages:_}=qf(u),v=e=>d({type:`setSettings`,patch:e}),y=(0,R.useRef)(null),b=ui[u.settings.aspectRatio],{scale:x,percent:S,setZoom:C,zoomIn:w,zoomOut:T,resetZoom:E}=zS(y,{pageWidth:e?b.width-64:b.width,pageHeight:e?b.height-64:b.height,reserveX:e?0:112,reserveY:e?0:64,watch:e});(0,R.useEffect)(()=>{E()},[e,E]);let D=u.settings.writingMode===`vertical`,O=(0,R.useCallback)(e=>r(t=>Math.max(0,Math.min(_.length-1,t+e))),[_.length]);(0,R.useEffect)(()=>{if(!e)return;let n=e=>{if(e.key===`Escape`)return t(!1);e.key===`ArrowRight`&&O(D?-1:1),e.key===`ArrowLeft`&&O(D?1:-1)};return window.addEventListener(`keydown`,n),()=>window.removeEventListener(`keydown`,n)},[e,D,O]),(0,R.useEffect)(()=>{n>_.length-1&&r(Math.max(0,_.length-1))},[_.length,n]);let k=(0,R.useCallback)(t=>{let n=_.findIndex(e=>e.items.some(e=>e.row.id===t));if(!(n<0)){if(e){r(n);return}document.querySelector(`[data-page-index="${n}"]`)?.scrollIntoView({block:`start`,behavior:`smooth`})}},[_,e]),A=(e,t)=>{let n=e.items[0];if(!(!n||!t||e.startedBy!==`manual`)){if(u.settings.layout!==`flow`){let e=t.items[t.items.length-1]?.row??null,r=di(u.settings),i=D?r.width:r.height;if(t.usedBlockSize+Ti(e,n.row)+n.blockSize>i)return}return()=>d({type:`setBreakBefore`,rowId:n.row.id,value:!1})}},[ee,te]=(0,R.useState)(0);(0,R.useEffect)(()=>{let t=y.current;if(e||!t)return;let n=0,r=()=>{n=0;let e=t.getBoundingClientRect().top+t.clientHeight/3,r=0;t.querySelectorAll(`[data-page-index]`).forEach(t=>{t.getBoundingClientRect().top<=e&&(r=Number(t.dataset.pageIndex))}),te(r)},i=()=>{n||=requestAnimationFrame(r)};return r(),t.addEventListener(`scroll`,i,{passive:!0}),()=>{cancelAnimationFrame(n),t.removeEventListener(`scroll`,i)}},[e,_.length]);let j=(0,R.useCallback)(e=>{document.querySelector(`[data-page-index="${e}"]`)?.scrollIntoView({block:`start`,behavior:`smooth`})},[]);return(0,K.jsxs)(XC,{children:[!e&&(0,K.jsx)(Ux,{doc:u,onTitle:e=>d({type:`setTitle`,title:e}),undo:f,redo:p,canUndo:m,canRedo:h,importing:i,settingsOpen:o,onSettings:()=>s(e=>!e),reading:e,onReading:()=>t(e=>!e)}),(0,K.jsx)(Ou,{onJump:k,children:(0,K.jsx)(ql,{rows:u.rows,children:(0,K.jsxs)(ZC,{children:[!e&&(0,K.jsx)(QS,{doc:u,pages:_,current:e?n:ee,onGoPage:t=>e?r(t):j(t),onGoRow:k,dispatch:e?void 0:d,zoom:e?void 0:{percent:S,onZoom:C,onZoomIn:w,onZoomOut:T}}),e?(0,K.jsx)(Qb,{doc:u,pages:_,current:n,go:O,scale:x,stageRef:y,onExit:()=>t(!1),onGoRow:k}):(0,K.jsxs)(Qu,{editor:l,children:[(0,K.jsx)(DC,{ref:y,children:_.map((e,t)=>{let n=e.items[0],r=n&&!n.continuedFromPrev?n.row:null;return(0,K.jsxs)($C,{children:[t>0&&(0,K.jsx)(lg,{startedBy:e.startedBy,onMerge:A(e,_[t-1])}),(0,K.jsxs)(QC,{children:[(0,K.jsx)(jC,{value:r?.pageBackground,disabled:!r,onChange:e=>r&&d({type:`setPageBackground`,rowId:r.id,background:e})}),(0,K.jsx)(ag,{page:e,settings:u.settings,scale:x,rowIndexOf:g,rowCount:u.rows.length})]})]},e.index)})}),(0,K.jsx)(o_,{}),(0,K.jsx)(Q_,{}),(0,K.jsx)(YC,{pages:_,editPage:ee,rowIndexOf:g,stageRef:y}),(0,K.jsx)(Id,{})]})]})})}),i&&(0,K.jsx)(nC,{samples:GC,onClose:()=>a(!1),onApply:e=>{d({type:`importDoc`,result:HC(Ba(e))}),r(0),a(!1)}}),o&&(0,K.jsx)(gC,{doc:u,onPatch:v,onMeta:e=>d({type:`setMeta`,patch:e}),onTitle:e=>d({type:`setTitle`,title:e}),onClose:()=>s(!1),onImport:()=>{s(!1),a(!0)}})]})}function JC(e){let t=30,n=()=>{let r=document.querySelector(`[data-block-id="${e}"]`);r?r.scrollIntoView({block:`nearest`,behavior:`smooth`}):--t>0&&requestAnimationFrame(n)};requestAnimationFrame(n)}function YC({pages:e,editPage:t,rowIndexOf:n,stageRef:r}){let i=$u(),a=i?.libraryAt??null,o=(0,R.useCallback)(t=>{if(!i||t<=0||i.doc.rows.length===0)return 0;let n=i.doc.rows[Math.min(t-1,i.doc.rows.length-1)];if(!n)return 0;for(let t of e)if(t.items.some(e=>e.row.id===n.id&&!e.continuesOnNext))return t.index;for(let t of e)if(t.items.some(e=>e.row.id===n.id))return t.index;return 0},[i,e]),s=(0,R.useCallback)(t=>{if(!i)return 0;let r=e[t];if(!r||r.items.length===0)return i.doc.rows.length;let a=r.items[r.items.length-1],o=n(a.row.id);return o>=0?o+1:i.doc.rows.length},[i,e,n]),c=(0,R.useRef)(t);if((0,R.useEffect)(()=>{c.current!==t&&(c.current=t,!(!i||i.libraryAt===null)&&o(i.libraryAt)!==t&&i.openLibrary(s(t)))},[t,i,o,s]),!i||a===null)return null;let l=()=>{let e=o(a),n=r.current;if(n){let r=n.querySelector(`[data-page-index="${e}"]`);if(r){let i=r.getBoundingClientRect(),a=n.getBoundingClientRect();if(!(i.bottom>a.top+30&&i.top<a.bottom-30)&&e!==t)return s(t)}}return a};return(0,K.jsx)(eh,{onClose:()=>i.openLibrary(null),onChoose:e=>{let t=l();i.openInsert(null);let n=Fi(Vh(e),i.doc.settings);i.dispatch({type:`insertRow`,index:t,blocks:[n]}),JC(n.id),i.openLibrary(t+1)},onImportPdf:(e,t)=>{let n=l();i.openInsert(null);let r=e.name.replace(/\.pdf$/i,``),a=t.map(()=>V(`blk`));i.dispatch({type:`insertRows`,index:n,rows:t.map((e,t)=>[{id:a[t],type:`image`,assetId:e.assetId,alt:`${r} 第 ${e.page} 頁`,caption:``,hasCaption:!1,aspectRatio:e.aspectRatio,widthPct:100,popups:[]}])}),a[0]&&JC(a[0]),i.openLibrary(n+t.length)},onGenerate:e=>{let t=l(),n=Bh(`image-ai`);n.type===`image`&&e&&(n.aiPrompt=e),i.openInsert(null),i.dispatch({type:`insertRow`,index:t,blocks:[n]}),i.openLibrary(t+1)}})}var XC=B.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`,ZC=B.div`
  flex: 1;
  min-block-size: 0;
  display: flex;
  /* 白底襯著，編輯區的圓角灰卡才浮得出來（body 是灰底） */
  background: ${e=>e.theme.surface.raised};
`,QC=B.div`
  position: relative;
`,$C=B.div`
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
`,ew=800;function tw(){let e=new WeakMap;window.addEventListener(`scroll`,t=>{let n=t.target instanceof Element?t.target:document.scrollingElement;if(!n)return;n.setAttribute(`data-scrolling`,``);let r=e.get(n);r&&window.clearTimeout(r),e.set(n,window.setTimeout(()=>n.removeAttribute(`data-scrolling`),ew))},{capture:!0,passive:!0})}tw(),(0,ze.createRoot)(document.getElementById(`root`)).render((0,K.jsx)(R.StrictMode,{children:(0,K.jsxs)(An,{theme:Gn,children:[(0,K.jsx)(Kn,{}),(0,K.jsx)(qC,{})]})}));export{hm as t};