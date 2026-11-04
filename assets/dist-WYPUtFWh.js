import{a as e,i as t,o as n,s as r}from"./index-CF48DMvm.js";var i=r(n(),1),a=e(),o=t(),s=[`data-feedback-toolbar`,`data-annotation-popup`,`data-annotation-marker`],c=s.flatMap(e=>[`:not([${e}])`,`:not([${e}] *)`]).join(``),l=`feedback-freeze-styles`,u=`__agentation_freeze`;function d(){return typeof window>`u`?{frozen:!1,installed:!0,origSetTimeout:setTimeout,origSetInterval:setInterval,origRAF:e=>0,pausedAnimations:[],frozenTimeoutQueue:[],frozenRAFQueue:[]}:window[u]??{frozen:!1,installed:!1,origSetTimeout:window.setTimeout.bind(window),origSetInterval:window.setInterval.bind(window),origRAF:window.requestAnimationFrame.bind(window),pausedAnimations:[],frozenTimeoutQueue:[],frozenRAFQueue:[]}}var f=d();function p(){if(typeof window>`u`)return;let e=window;f=e[u]??(e[u]=f),!f.installed&&(window.setTimeout=(e,t,...n)=>typeof e==`string`?f.origSetTimeout(e,t):f.origSetTimeout((...t)=>{f.frozen?f.frozenTimeoutQueue.push(()=>e(...t)):e(...t)},t,...n),window.setInterval=(e,t,...n)=>typeof e==`string`?f.origSetInterval(e,t):f.origSetInterval((...t)=>{f.frozen||e(...t)},t,...n),window.requestAnimationFrame=e=>f.origRAF(t=>{f.frozen?f.frozenRAFQueue.push(e):e(t)}),f.installed=!0)}var m=f.origSetTimeout,h=f.origSetInterval,g=f.origRAF;function _(e){return e?s.some(t=>!!e.closest?.(`[${t}]`)):!1}function v(){if(typeof document>`u`||(p(),f.frozen))return;f.frozen=!0,f.frozenTimeoutQueue=[],f.frozenRAFQueue=[];let e=document.getElementById(l);e||(e=document.createElement(`style`),e.id=l),e.textContent=`
    *${c},
    *${c}::before,
    *${c}::after {
      animation-play-state: paused !important;
      transition: none !important;
    }
  `,document.head.appendChild(e),f.pausedAnimations=[];try{document.getAnimations().forEach(e=>{if(e.playState!==`running`)return;let t=e.effect?.target;_(t)||(e.pause(),f.pausedAnimations.push(e))})}catch{}document.querySelectorAll(`video`).forEach(e=>{e.paused||(e.dataset.wasPaused=`false`,e.pause())})}function y(){if(typeof document>`u`||!f.frozen)return;f.frozen=!1;let e=f.frozenTimeoutQueue;f.frozenTimeoutQueue=[];for(let t of e)f.origSetTimeout(()=>{if(f.frozen){f.frozenTimeoutQueue.push(t);return}try{t()}catch(e){console.warn(`[agentation] Error replaying queued timeout:`,e)}},0);let t=f.frozenRAFQueue;f.frozenRAFQueue=[];for(let e of t)f.origRAF(t=>{if(f.frozen){f.frozenRAFQueue.push(e);return}e(t)});for(let e of f.pausedAnimations)try{e.play()}catch(e){console.warn(`[agentation] Error resuming animation:`,e)}f.pausedAnimations=[],document.getElementById(l)?.remove(),document.querySelectorAll(`video`).forEach(e=>{e.dataset.wasPaused===`false`&&(e.play().catch(()=>{}),delete e.dataset.wasPaused)})}function b(){let e=(0,i.useMemo)(()=>{let e=0,t=new Set,n=()=>(t.forEach(clearTimeout),t.clear(),++e),r=t=>t===e;return{start:n,isCurrent:r,schedule:(e,n,i)=>{if(!r(e))return;let a=m(()=>{t.delete(a),r(e)&&n()},i);t.add(a)}}},[]);return(0,i.useEffect)(()=>()=>{e.start()},[e]),e}function x(e,t,n,r){let i=e=>r.get(e.id)??e.id,a=new Map(e.map(e=>[i(e),e])),o=new Map(t.map(e=>[i(e),e])),s=new Set(n.map(e=>e.id)),c=[];for(let e of n){let t=a.get(e.id),n=o.get(e.id);if(t&&!n)continue;let r=n&&t&&n.comment!==t.comment;c.push(r?{...e,comment:n.comment}:e)}for(let[e,t]of o)!a.has(e)&&!s.has(e)&&c.push(t);return c}function S(e){if(e.tagName!==`IFRAME`)return null;try{return e.contentDocument}catch{return null}}function C(e,t=document){if(e===t)return null;try{return e.defaultView?.frameElement}catch{return null}}function w(e){return e.nodeType===11&&`host`in e}function T(e){let t=e.getBoundingClientRect(),n=e.offsetWidth?t.width/e.offsetWidth:1,r=e.offsetHeight?t.height/e.offsetHeight:1,i=e.ownerDocument.defaultView?.getComputedStyle(e),a=e=>parseFloat(e||`0`)||0,o=a(i?.paddingLeft),s=a(i?.paddingTop),c=e.clientWidth-o-a(i?.paddingRight),l=e.clientHeight-s-a(i?.paddingBottom);return{x:t.left+(e.clientLeft+o)*n,y:t.top+(e.clientTop+s)*r,sx:n,sy:r,width:c*n,height:l*r}}function E(e){try{let t=new URL(e);return t.origin+t.pathname}catch{return e}}function ee(e,t,n,r=document){let i=C(e,r);for(;i;){let e=T(i);t=e.x+t*e.sx,n=e.y+n*e.sy,i=C(i.ownerDocument,r)}return{x:t,y:n}}function D(e,t=document){let n=e.getBoundingClientRect();return O(e.ownerDocument,n,t)}function O(e,t,n){if(!C(e,n))return t;let r=t.left,i=t.top,a=t.right,o=t.bottom,s=C(e,n);for(;s;){let e=T(s);r=Math.max(e.x,e.x+r*e.sx),i=Math.max(e.y,e.y+i*e.sy),a=Math.min(e.x+e.width,e.x+a*e.sx),o=Math.min(e.y+e.height,e.y+o*e.sy),s=C(s.ownerDocument,n)}return new DOMRect(r,i,Math.max(0,a-r),Math.max(0,o-i))}function k(e){let t=[];for(let n of e.querySelectorAll(`*`))n.tagName===`IFRAME`&&t.push(n),n.shadowRoot&&n.tagName!==`AGENTATION-TOOLBAR`&&t.push(...k(n.shadowRoot));return t}function te(e,t,n,r=document){let i=[];for(let t=C(e.ownerDocument,r);t;t=C(t.ownerDocument,r))i.unshift(t);if(!i.length)return;let a=i.map(e=>{let r=T(e);return t=(t-r.x)/r.sx,n=(n-r.y)/r.sy,{index:k(e.ownerDocument).indexOf(e),id:e.id||void 0,url:S(e)?.URL??``}}),o=e.ownerDocument.defaultView,s=!1;for(let t=e;t;t=t.parentElement)if([`fixed`,`sticky`].includes(o.getComputedStyle(t).position)){s=!0;break}let c=s?0:o.scrollX,l=s?0:o.scrollY,u=e.getBoundingClientRect();return{path:a,x:t+c,y:n+l,fixed:s,boundingBox:{x:u.left+c,y:u.top+l,width:u.width,height:u.height}}}function ne(e=document){let t=new Map,n=e=>{let n=t.get(e);return n||(n=k(e),t.set(e,n)),n};return t=>A(t,e,n)}function A(e,t=document,n=k){let r=e.frame;if(!r)return e;let i=t;for(let e of r.path){let t=n(i),r=e.id?t.find(t=>t.id===e.id):t[e.index],a=r&&S(r);if(!a||E(a.URL)!==E(e.url))return null;i=a}let a=i.defaultView,o=r.fixed?0:a.scrollX,s=r.fixed?0:a.scrollY,c=r.x-o,l=r.y-s;for(let e=i,n=C(i,t);n;n=C(e,t)){let t=e.defaultView;if(c<0||l<0||c>t.innerWidth||l>t.innerHeight)return null;let r=T(n);if(r.width<=0||r.height<=0)return null;c=r.x+c*r.sx,l=r.y+l*r.sy,e=n.ownerDocument}let u=r.boundingBox,d=O(i,new DOMRect(u.x-o,u.y-s,u.width,u.height),t),f=t.defaultView;return{...e,x:c/f.innerWidth*100,y:l+(e.isFixed?0:f.scrollY),boundingBox:{x:d.x,y:d.y+(e.isFixed?0:f.scrollY),width:d.width,height:d.height}}}function re(e,t,n){if(!(`clientX`in e)||t===n)return e;let r=ee(t,e.clientX,e.clientY,n);return new Proxy(e,{get(e,t){if(t===`clientX`)return r.x;if(t===`clientY`)return r.y;let n=Reflect.get(e,t,e);return typeof n==`function`?n.bind(e):n}})}function ie(e,t){let n=new Set([e]),r=new Set,i=[],a=new Set,o=!1,s=!1,c,l=(t,n)=>{let r=r=>t.listener(re(r,n,e));t.handlers.set(n,r),n.addEventListener(t.type,r,t.options)},u=()=>{if(o=!1,!s)return;let d=new Set,f=new Set,p=[],m=e=>{p.push(e);for(let t of e.querySelectorAll(`*`))if(!t.matches(`agentation-toolbar, [data-agentation-portal]`)&&(t.shadowRoot&&m(t.shadowRoot),t.tagName===`IFRAME`)){f.add(t);let e=S(t);e&&!d.has(e)&&(d.add(e),m(e))}};d.add(e),m(e);for(let e of n)if(!d.has(e)){for(let t of r){let n=t.handlers.get(e);n&&e.removeEventListener(t.type,n,t.options),t.handlers.delete(e)}n.delete(e)}for(let e of d)if(!n.has(e)){n.add(e);for(let t of r)l(t,e)}for(let e of a)f.has(e)||e.removeEventListener(`load`,u);for(let e of f)a.has(e)||e.addEventListener(`load`,u);a=f,c?.disconnect(),a.forEach(e=>c?.observe(e)),i.forEach(e=>e.disconnect()),i=p.map(e=>{let t=new MutationObserver(e=>{e.some(e=>[...e.addedNodes,...e.removedNodes].some(e=>e.nodeType===1&&!e.closest(`agentation-toolbar, [data-agentation-portal]`)&&(e.tagName===`IFRAME`||!!e.shadowRoot||!!e.querySelector(`iframe`))))&&!o&&(o=!0,queueMicrotask(u))});return t.observe(e,{childList:!0,subtree:!0}),t}),t?.()};return{start(){s||(s=!0,typeof ResizeObserver==`function`&&(c=new ResizeObserver(()=>t?.())),u())},stop(){s=!1,c?.disconnect(),c=void 0,i.forEach(e=>e.disconnect()),i=[];for(let e of a)e.removeEventListener(`load`,u);a.clear();for(let e of r)for(let[t,n]of e.handlers)t.removeEventListener(e.type,n,e.options);r.clear(),n.clear(),n.add(e)},addEventListener(e,t,i){let a={type:e,listener:t,options:i,handlers:new Map};r.add(a);for(let e of n)l(a,e)},removeEventListener(e,t,n){for(let n of r)if(n.type===e&&n.listener===t){for(let[t,r]of n.handlers)t.removeEventListener(e,r,n.options);r.delete(n)}},querySelectorAll(e){return[...n].flatMap(t=>[...t.querySelectorAll(e)])}}}var ae=[`data-testid`,`data-test`,`data-qa`,`data-cy`,`data-component`];function oe(e,t=ae){let n={};for(let r of[...new Set(t)].slice(0,16)){if(!/^[a-zA-Z_][\w:.-]*$/.test(r))continue;let t=e.getAttribute(r);t!=null&&t.length<=500&&Object.defineProperty(n,r,{value:t,enumerable:!0})}return n}function se(e,t=ae){return Object.entries(oe(e,t)).filter(([e,t])=>/^data-[a-z0-9_-]+$/.test(e)&&t.length<=120).slice(0,2).map(([e,t])=>`[${e}="${t.replace(/[\\"\n\r\f\0]/g,e=>e===`\\`||e===`"`?`\\${e}`:`\\${e.charCodeAt(0).toString(16)} `)}"]`).join(``)}function ce(e){if(e.parentElement)return e.parentElement;let t=e.getRootNode();return w(t)?t.host:null}function j(e,t){let n=e;for(;n;){if(n.matches(t))return n;n=ce(n)}return null}function le(e,t=4,n){let r=[],i=e,a=0;for(;i&&a<t;){let e=i.tagName.toLowerCase();if(e===`html`||e===`body`){r.length===0&&r.push(e);break}let t=e;if(i.id)t=`#${i.id}`;else if(i.className&&typeof i.className==`string`){let e=i.className.split(/\s+/).find(e=>e.length>2&&!e.match(/^[a-z]{1,2}$/)&&!e.match(/[A-Z0-9]{5,}/));e&&(t=`.${e.split(`_`)[0]}`)}t+=se(i,n);let o=ce(i);!i.parentElement&&o&&(t=`\u27E8shadow\u27E9 ${t}`),r.unshift(t),i=o,a++}let o=C(e.ownerDocument);return(o?le(o,2)+` > ⟨iframe⟩ `:``)+r.join(` > `)}function M(e){let t=``;for(let n of e.childNodes)if(n.nodeType===Node.TEXT_NODE){let e=n.textContent?.trim();e&&(t+=(t?` `:``)+e)}return t}function ue(e,t){let n=le(e,4,t);if(e.dataset.element)return{name:e.dataset.element,path:n};let r=e.tagName.toLowerCase();if([`path`,`circle`,`rect`,`line`,`g`].includes(r)){let t=j(e,`svg`);if(t){let e=ce(t);if(e?.namespaceURI===`http://www.w3.org/1999/xhtml`)return{name:`graphic in ${ue(e).name}`,path:n}}return{name:`graphic element`,path:n}}if(r===`svg`){let t=ce(e);if(t?.tagName.toLowerCase()===`button`){let e=t.textContent?.trim();return{name:e?`icon in "${e}" button`:`button icon`,path:n}}return{name:`icon`,path:n}}if(r===`button`){let t=e.textContent?.trim(),r=e.getAttribute(`aria-label`);return r?{name:`button [${r}]`,path:n}:{name:t?`button "${t.slice(0,25)}"`:`button`,path:n}}if(r===`a`){let t=e.textContent?.trim(),r=e.getAttribute(`href`);return t?{name:`link "${t.slice(0,25)}"`,path:n}:r?{name:`link to ${r.slice(0,30)}`,path:n}:{name:`link`,path:n}}if(r===`input`){let t=e.getAttribute(`type`)||`text`,r=e.getAttribute(`placeholder`),i=e.getAttribute(`name`);return r?{name:`input "${r}"`,path:n}:i?{name:`input [${i}]`,path:n}:{name:`${t} input`,path:n}}if([`h1`,`h2`,`h3`,`h4`,`h5`,`h6`].includes(r)){let t=e.textContent?.trim();return{name:t?`${r} "${t.slice(0,35)}"`:r,path:n}}if(r===`p`){let t=e.textContent?.trim();return t?{name:`paragraph: "${t.slice(0,40)}${t.length>40?`...`:``}"`,path:n}:{name:`paragraph`,path:n}}if(r===`span`||r===`label`){let t=e.textContent?.trim();return t&&t.length<40?{name:`"${t}"`,path:n}:{name:r,path:n}}if(r===`li`){let t=e.textContent?.trim();return t&&t.length<40?{name:`list item: "${t.slice(0,35)}"`,path:n}:{name:`list item`,path:n}}if(r===`blockquote`)return{name:`blockquote`,path:n};if(r===`code`){let t=e.textContent?.trim();return t&&t.length<30?{name:`code: \`${t}\``,path:n}:{name:`code`,path:n}}if(r===`pre`)return{name:`code block`,path:n};if(r===`img`){let t=e.getAttribute(`alt`);return{name:t?`image "${t.slice(0,30)}"`:`image`,path:n}}if(r===`video`)return{name:`video`,path:n};if([`div`,`section`,`article`,`nav`,`header`,`footer`,`aside`,`main`].includes(r)){let t=e.className,i=e.getAttribute(`role`),a=e.getAttribute(`aria-label`);if(a)return{name:`${r} [${a}]`,path:n};if(i)return{name:`${i}`,path:n};let o=M(e);if(o&&o.length<50)return{name:`"${o}"`,path:n};if(typeof t==`string`&&t){let e=t.split(/[\s_-]+/).map(e=>e.replace(/[A-Z0-9]{5,}.*$/,``)).filter(e=>e.length>2&&!/^[a-z]{1,2}$/.test(e)).slice(0,2);if(e.length>0)return{name:e.join(` `),path:n}}return{name:r===`div`?`container`:r,path:n}}return{name:r,path:n}}function de(e){let t=[],n=e.textContent?.trim();n&&n.length<100&&t.push(n);let r=e.previousElementSibling;if(r){let e=r.textContent?.trim();e&&e.length<50&&t.unshift(`[before: "${e.slice(0,40)}"]`)}let i=e.nextElementSibling;if(i){let e=i.textContent?.trim();e&&e.length<50&&t.push(`[after: "${e.slice(0,40)}"]`)}return t.join(` `)}function fe(e){let t=ce(e);if(!t)return``;let n=(w(e.getRootNode())&&e.parentElement?Array.from(e.parentElement.children):Array.from(t.children)).filter(t=>t!==e&&t.namespaceURI===`http://www.w3.org/1999/xhtml`);if(n.length===0)return``;let r=n.slice(0,4).map(e=>{let t=e.tagName.toLowerCase(),n=e.className,r=``;if(typeof n==`string`&&n){let e=n.split(/\s+/).map(e=>e.replace(/[_][a-zA-Z0-9]{5,}.*$/,``)).find(e=>e.length>2&&!/^[a-z]{1,2}$/.test(e));e&&(r=`.${e}`)}if(t===`button`||t===`a`){let n=e.textContent?.trim().slice(0,15);if(n)return`${t}${r} "${n}"`}return`${t}${r}`}),i=t.tagName.toLowerCase();if(typeof t.className==`string`&&t.className){let e=t.className.split(/\s+/).map(e=>e.replace(/[_][a-zA-Z0-9]{5,}.*$/,``)).find(e=>e.length>2&&!/^[a-z]{1,2}$/.test(e));e&&(i=`.${e}`)}let a=t.children.length,o=a>r.length+1?` (${a} total in ${i})`:``;return r.join(`, `)+o}function pe(e){let t=e.className;return typeof t!=`string`||!t?``:t.split(/\s+/).filter(e=>e.length>0).map(e=>{let t=e.match(/^([a-zA-Z][a-zA-Z0-9_-]*?)(?:_[a-zA-Z0-9]{5,})?$/);return t?t[1]:e}).filter((e,t,n)=>n.indexOf(e)===t).join(`, `)}var me=new Set([`none`,`normal`,`auto`,`0px`,`rgba(0, 0, 0, 0)`,`transparent`,`static`,`visible`]),he=new Set(`p.span.h1.h2.h3.h4.h5.h6.label.li.td.th.blockquote.figcaption.caption.legend.dt.dd.pre.code.em.strong.b.i.a.time.cite.q`.split(`.`)),N=new Set([`input`,`textarea`,`select`]),ge=new Set([`img`,`video`,`canvas`,`svg`]),_e=new Set([`div`,`section`,`article`,`nav`,`header`,`footer`,`aside`,`main`,`ul`,`ol`,`form`,`fieldset`]);function ve(e){if(typeof window>`u`)return{};let t=(e.ownerDocument.defaultView??window).getComputedStyle(e),n={},r=e.tagName.toLowerCase(),i;i=he.has(r)?[`color`,`fontSize`,`fontWeight`,`fontFamily`,`lineHeight`]:r===`button`||r===`a`&&e.getAttribute(`role`)===`button`||N.has(r)?[`backgroundColor`,`color`,`padding`,`borderRadius`,`fontSize`]:ge.has(r)?[`width`,`height`,`objectFit`,`borderRadius`]:_e.has(r)?[`display`,`padding`,`margin`,`gap`,`backgroundColor`]:[`color`,`fontSize`,`margin`,`padding`,`backgroundColor`];for(let e of i){let r=e.replace(/([A-Z])/g,`-$1`).toLowerCase(),i=t.getPropertyValue(r);i&&!me.has(i)&&(n[e]=i)}return n}var ye=`color.backgroundColor.borderColor.fontSize.fontWeight.fontFamily.lineHeight.letterSpacing.textAlign.width.height.padding.margin.border.borderRadius.display.position.top.right.bottom.left.zIndex.flexDirection.justifyContent.alignItems.gap.opacity.visibility.overflow.boxShadow.transform`.split(`.`);function be(e){if(typeof window>`u`)return``;let t=(e.ownerDocument.defaultView??window).getComputedStyle(e),n=[];for(let e of ye){let r=e.replace(/([A-Z])/g,`-$1`).toLowerCase(),i=t.getPropertyValue(r);i&&!me.has(i)&&n.push(`${r}: ${i}`)}return n.join(`; `)}function xe(e){if(!e)return;let t={},n=e.split(`;`).map(e=>e.trim()).filter(Boolean);for(let e of n){let n=e.indexOf(`:`);if(n>0){let r=e.slice(0,n).trim(),i=e.slice(n+1).trim();r&&i&&(t[r]=i)}}return Object.keys(t).length>0?t:void 0}function Se(e){let t=[],n=e.getAttribute(`role`),r=e.getAttribute(`aria-label`),i=e.getAttribute(`aria-describedby`),a=e.getAttribute(`tabindex`),o=e.getAttribute(`aria-hidden`);return n&&t.push(`role="${n}"`),r&&t.push(`aria-label="${r}"`),i&&t.push(`aria-describedby="${i}"`),a&&t.push(`tabindex=${a}`),o===`true`&&t.push(`aria-hidden`),e.matches(`a, button, input, select, textarea, [tabindex]`)&&t.push(`focusable`),t.join(`, `)}function Ce(e){let t=[],n=e;for(;n&&n.tagName.toLowerCase()!==`html`;){let e=n.tagName.toLowerCase(),r=e;if(n.id)r=`${e}#${n.id}`;else if(n.className&&typeof n.className==`string`){let t=n.className.split(/\s+/).map(e=>e.replace(/[_][a-zA-Z0-9]{5,}.*$/,``)).find(e=>e.length>2);t&&(r=`${e}.${t}`)}let i=ce(n);!n.parentElement&&i&&(r=`\u27E8shadow\u27E9 ${r}`),t.unshift(r),n=i}let r=C(e.ownerDocument);return(r?Ce(r)+` > ⟨iframe⟩ `:``)+t.join(` > `)}var we=`agentation-toolbar, [data-agentation-root], [data-feedback-toolbar], [data-annotation-popup], [data-annotation-marker]`,Te=new Set([`DIV`,`SPAN`,`SECTION`,`ARTICLE`,`MAIN`,`ASIDE`,`HEADER`,`FOOTER`,`NAV`]);function Ee(e,t){let n=document.elementFromPoint(e,t),r=new Set;for(;n&&!r.has(n);){r.add(n);let i=S(n),a;if(i){let r=T(n);e=(e-r.x)/r.sx,t=(t-r.y)/r.sy,a=i.elementFromPoint?.(e,t)}else a=n.shadowRoot?.elementFromPoint?.(e,t);if(!a||a===n)break;n=a}return n}function De(e){if(typeof e.checkVisibility==`function`)return e.checkVisibility({checkOpacity:!0,checkVisibilityCSS:!0});let t=getComputedStyle(e);if(t.visibility===`hidden`||t.visibility===`collapse`)return!1;let n=e;for(;n;){let e=getComputedStyle(n);if(e.opacity===`0`||e.display===`none`||e.contentVisibility===`hidden`)return!1;let t=n.getRootNode();n=n.parentElement||(w(t)?t.host:null)}return!0}function Oe(e,t){let n=[],r=new Set,i=(e,t,a)=>{for(let o of e){if(r.has(o))continue;if(r.add(o),o.shadowRoot){let e=o.shadowRoot,n=e.elementsFromPoint?.(t,a)??[];i(n.length?n:[e.elementFromPoint?.(t,a)].filter(Boolean),t,a)}let e=S(o);if(e){let n=T(o),r=(t-n.x)/n.sx,s=(a-n.y)/n.sy;i(e.elementsFromPoint?.(r,s)??[e.elementFromPoint?.(r,s)].filter(Boolean),r,s)}o!==o.ownerDocument.body&&o!==o.ownerDocument.documentElement&&!j(o,we)&&De(o)&&n.push(o)}};return i(document.elementsFromPoint?.(e,t)??[document.elementFromPoint(e,t)].filter(Boolean),e,t),n}function ke(e,t,n){if(n.width<=0||n.height<=0)return null;let r=null,i=1/0;for(let a of Oe(e,t)){let e=D(a),t=e.width/n.width,o=e.height/n.height;if(t<.5||t>2||o<.5||o>2)continue;let s=Math.abs(Math.log(t))+Math.abs(Math.log(o));s<i&&(r=a,i=s)}return r}function Ae(e,t){let n=Ee(e,t);if(!n||j(n,we))return null;let r=Oe(e,t);for(let e of r)if(!Te.has(e.tagName)&&!e.shadowRoot||Array.from(e.childNodes).some(e=>e.nodeType===Node.TEXT_NODE&&e.textContent?.trim()))return e;let i=null,a=1/0;for(let e of r){let t=D(e),n=t.width*t.height;n>0&&n<a&&(i=e,a=n)}return i}function je(e){let t=(0,i.useCallback)(t=>e?(window.addEventListener(`hashchange`,t),window.addEventListener(`popstate`,t),()=>{window.removeEventListener(`hashchange`,t),window.removeEventListener(`popstate`,t)}):()=>{},[e]);return(0,i.useSyncExternalStore)(t,()=>window.location.pathname+(e?window.location.hash:``),()=>`/`)}var Me=new Map;function Ne(e,t){let n=(Me.get(e)??Promise.resolve()).then(t),r=n.then(()=>{},()=>{});return Me.set(e,r),r.then(()=>{Me.get(e)===r&&Me.delete(e)}),n}function Pe(e,t,n){try{let r=new URL(e,n);return r.origin===n&&r.pathname+r.hash===t}catch{return!1}}var Fe=typeof window>`u`?i.useEffect:i.useLayoutEffect;function Ie(e){let[t,n]=(0,i.useState)(null);return Fe(()=>{let e=document.createElement(`div`);return e.setAttribute(`data-agentation-portal`,``),e.style.display=`contents`,n(e),()=>e.remove()},[]),Fe(()=>{if(!t)return;let n=e??document.body;if(n.ownerDocument!==document){console.warn(`[Agentation] portalContainer belongs to another document; the toolbar will not render.`);return}let r=document.activeElement;for(;r?.shadowRoot?.activeElement;)r=r.shadowRoot.activeElement;let i=r&&t.contains(document.activeElement)?r:null;typeof t.hidePopover==`function`&&t.matches(`:popover-open`)&&t.hidePopover(),n.appendChild(t),e&&typeof t.showPopover==`function`?(t.setAttribute(`popover`,`manual`),t.style.cssText=`position:fixed;inset:0 auto auto 0;margin:0;padding:0;border:0;background:transparent;width:0;height:0;overflow:visible;pointer-events:none`,t.showPopover()):(t.removeAttribute(`popover`),t.style.cssText=`display:contents`),i?.focus({preventScroll:!0})},[t,e]),t}var Le=({mode:e=`open`,delegatesFocus:t,slotAssignment:n,host:r=`div`,children:s,className:c,...l})=>{let u=(0,i.useRef)(null),[d,f]=(0,i.useState)(null);return(0,i.useLayoutEffect)(()=>{let r=u.current;if(!r||r.shadowRoot)return;let i=r.attachShadow({mode:e,delegatesFocus:t,slotAssignment:n});f(i)},[]),(0,o.jsx)(r,{ref:u,...l,...r.includes(`-`)?{class:c}:{className:c},children:d&&(0,a.createPortal)(s,d)})};function P(e,t,n){let r=(0,i.useRef)(n);(0,i.useLayoutEffect)(()=>{r.current=n},[n]),(0,i.useLayoutEffect)(()=>{let n=e.current;if(!t||!n)return;let i=!1,a=n.getAnimations?.()??[];return Promise.allSettled(a.map(e=>e.finished)).then(()=>{i||r.current()}),()=>{i=!0}},[e,t])}var Re=`@charset "UTF-8";
.styles-module__popup___IhzrD svg[fill=none] {
  fill: none !important;
}
.styles-module__popup___IhzrD svg[fill=none] :not([fill]) {
  fill: none !important;
}

@keyframes styles-module__popupEnter___AuQDN {
  from {
    opacity: 0;
    transform: translateX(-50%) scale(0.95) translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
}
@keyframes styles-module__popupExit___JJKQX {
  from {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) scale(0.95) translateY(4px);
  }
}
@keyframes styles-module__shake___jdbWe {
  0%, 100% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(0);
  }
  20% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(-3px);
  }
  40% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(3px);
  }
  60% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(-2px);
  }
  80% {
    transform: translateX(-50%) scale(1) translateY(0) translateX(2px);
  }
}
.styles-module__popup___IhzrD {
  position: fixed;
  transform: translateX(-50%);
  width: 280px;
  padding: 0.75rem 1rem;
  background: #1a1a1a;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  z-index: 100001;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  will-change: transform, opacity;
  opacity: 0;
}
.styles-module__popup___IhzrD.styles-module__enter___L7U7N {
  animation: styles-module__popupEnter___AuQDN 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.styles-module__popup___IhzrD.styles-module__entered___COX-w {
  opacity: 1;
  transform: translateX(-50%) scale(1) translateY(0);
}
.styles-module__popup___IhzrD.styles-module__exit___5eGjE {
  pointer-events: none;
  animation: styles-module__popupExit___JJKQX 0.15s ease-in forwards;
}
.styles-module__popup___IhzrD.styles-module__entered___COX-w.styles-module__shake___jdbWe {
  animation: styles-module__shake___jdbWe 0.25s ease-out;
}

.styles-module__header___wWsSi {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5625rem;
}

.styles-module__element___fTV2z {
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.styles-module__headerToggle___WpW0b {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  flex: 1;
  min-width: 0;
  text-align: left;
}
.styles-module__headerToggle___WpW0b .styles-module__element___fTV2z {
  flex: 1;
}

.styles-module__chevron___ZZJlR {
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}
.styles-module__chevron___ZZJlR.styles-module__expanded___2Hxgv {
  transform: rotate(90deg);
}

.styles-module__stylesWrapper___pnHgy {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.styles-module__stylesWrapper___pnHgy.styles-module__expanded___2Hxgv {
  grid-template-rows: 1fr;
}

.styles-module__stylesInner___YYZe2 {
  overflow: hidden;
}

.styles-module__stylesBlock___VfQKn {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.375rem;
  padding: 0.5rem 0.625rem;
  margin-bottom: 0.5rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 0.6875rem;
  line-height: 1.5;
}

.styles-module__styleLine___1YQiD {
  color: rgba(255, 255, 255, 0.85);
  word-break: break-word;
}

.styles-module__styleProperty___84L1i {
  color: #c792ea;
}

.styles-module__styleValue___q51-h {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__timestamp___Dtpsv {
  font-size: 0.625rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
  font-variant-numeric: tabular-nums;
  margin-left: 0.5rem;
  flex-shrink: 0;
}

.styles-module__quote___mcMmQ {
  font-size: 12px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
  padding: 0.4rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.25rem;
  line-height: 1.45;
}

.styles-module__textarea___jrSae {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0.625rem;
  font-size: 0.8125rem;
  font-family: inherit;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  resize: none;
  outline: none;
  transition: border-color 0.15s ease;
}
.styles-module__textarea___jrSae:focus {
  border-color: var(--agentation-color-blue);
}
.styles-module__textarea___jrSae.styles-module__green___99l3h:focus {
  border-color: var(--agentation-color-green);
}
.styles-module__textarea___jrSae::placeholder {
  color: rgba(255, 255, 255, 0.35);
}
.styles-module__textarea___jrSae::-webkit-scrollbar {
  width: 6px;
}
.styles-module__textarea___jrSae::-webkit-scrollbar-track {
  background: transparent;
}
.styles-module__textarea___jrSae::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.styles-module__actions___D6x3f {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.375rem;
  margin-top: 0.75rem;
}

.styles-module__sourceAction___EabJb {
  display: block;
  max-width: 100%;
  margin: -2px 0 8px;
  padding: 2px 0;
  background: transparent;
  color: #fff;
  font: inherit;
  font-size: 11px;
  border: 0;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.15s ease;
}
.styles-module__sourceAction___EabJb:hover, .styles-module__sourceAction___EabJb:focus-visible {
  opacity: 1;
}
.styles-module__sourceAction___EabJb:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.styles-module__light___6AaSQ .styles-module__sourceAction___EabJb {
  color: #111;
}

.styles-module__cancel___hRjnL,
.styles-module__submit___K-mIR,
.styles-module__deleteButton___4VuAE {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 1.875rem;
  padding: 0.375rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;
}

.styles-module__cancel___hRjnL {
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
}
.styles-module__cancel___hRjnL:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.styles-module__submit___K-mIR {
  color: white;
}
.styles-module__submit___K-mIR:hover:not(:disabled) {
  filter: brightness(0.9);
}
.styles-module__submit___K-mIR:disabled {
  cursor: not-allowed;
}

.styles-module__deleteWrapper___oSjdo {
  display: flex;
  margin-right: auto;
}

.styles-module__deleteButton___4VuAE {
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease;
}
.styles-module__deleteButton___4VuAE:hover {
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
  color: var(--agentation-color-red);
}
.styles-module__deleteButton___4VuAE:active {
  transform: scale(0.92);
}

.styles-module__light___6AaSQ.styles-module__popup___IhzrD {
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
}
.styles-module__light___6AaSQ .styles-module__element___fTV2z {
  color: rgba(0, 0, 0, 0.6);
}
.styles-module__light___6AaSQ .styles-module__timestamp___Dtpsv {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__chevron___ZZJlR {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__stylesBlock___VfQKn {
  background: rgba(0, 0, 0, 0.03);
}
.styles-module__light___6AaSQ .styles-module__styleLine___1YQiD {
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__styleProperty___84L1i {
  color: #7c3aed;
}
.styles-module__light___6AaSQ .styles-module__styleValue___q51-h {
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__quote___mcMmQ {
  color: rgba(0, 0, 0, 0.55);
  background: rgba(0, 0, 0, 0.04);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae {
  background: rgba(0, 0, 0, 0.03);
  color: #1a1a1a;
  border-color: rgba(0, 0, 0, 0.12);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae::placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__textarea___jrSae::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
}
.styles-module__light___6AaSQ .styles-module__cancel___hRjnL {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___6AaSQ .styles-module__cancel___hRjnL:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.75);
}
.styles-module__light___6AaSQ .styles-module__deleteButton___4VuAE {
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___6AaSQ .styles-module__deleteButton___4VuAE:hover {
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
  color: var(--agentation-color-red);
}

@media (prefers-reduced-motion: reduce) {
  .styles-module__popup___IhzrD.styles-module__enter___L7U7N, .styles-module__popup___IhzrD.styles-module__exit___5eGjE {
    animation-duration: 1ms;
    animation-delay: 0ms !important;
  }
}
.styles-module__sharedForm___8GvQl {
  --card-motion: 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
  padding: 0.75rem 1rem;
  transition: padding var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__header___wWsSi {
  transition: margin-bottom var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__element___fTV2z {
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
}
.styles-module__sharedForm___8GvQl .styles-module__previewExcerpt___DCOIL {
  display: none;
}
.styles-module__sharedForm___8GvQl .styles-module__headerToggle___WpW0b .styles-module__chevron___ZZJlR {
  opacity: 1;
  margin-left: 0;
  transition: margin-left var(--card-motion), opacity 100ms ease-out, transform var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__sharedNote___OYVi5 {
  position: relative;
  height: var(--editor-field-height, 57px);
  border-radius: 8px;
  overflow: clip;
  transition: height var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__sharedNote___OYVi5::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid var(--field-border, rgba(255, 255, 255, 0.15));
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.05);
  pointer-events: none;
  transition: opacity var(--card-motion), border-color var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__sharedNoteContent___6q3KD {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: clip;
  transition: width var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__sharedNote___OYVi5[data-truncated]::after {
  content: "…";
  position: absolute;
  right: 0;
  top: 0;
  color: #fff;
  font-size: 13px;
  line-height: 1.4;
  opacity: 0;
  pointer-events: none;
  transition: opacity 80ms ease-out;
}
.styles-module__sharedForm___8GvQl .styles-module__textarea___jrSae {
  display: block;
  width: calc(280px - 2rem);
  max-width: calc(100vw - 24px - 2rem);
  margin: 0;
  background: transparent !important;
  border-color: transparent !important;
  transform: translate(0, 0);
  transition: transform var(--card-motion), color var(--card-motion);
}
.styles-module__sharedForm___8GvQl .styles-module__sharedExtra___RUBKC, .styles-module__sharedForm___8GvQl .styles-module__sharedActions___6Glpl {
  display: grid;
  grid-template-rows: 1fr;
  opacity: 1;
  transition: grid-template-rows var(--card-motion), opacity 80ms ease-out;
}
.styles-module__sharedForm___8GvQl .styles-module__sharedActions___6Glpl {
  transition-delay: 0ms, 120ms;
}
.styles-module__sharedForm___8GvQl .styles-module__sharedExtraInner___EuUh4 {
  min-height: 0;
  overflow: hidden;
}
.styles-module__sharedForm___8GvQl .styles-module__actions___D6x3f {
  min-height: 0;
  overflow: hidden;
  transition: margin-top var(--card-motion);
}
.styles-module__sharedForm___8GvQl[data-preview] {
  padding: 8px 12px;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__header___wWsSi {
  margin-bottom: 5px;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__previewExcerpt___DCOIL {
  display: inline;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__element___fTV2z {
  line-height: 1.4;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__chevron___ZZJlR {
  opacity: 0;
  margin-left: -18px;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedNote___OYVi5 {
  height: 20.2px;
  border-radius: 0;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedNote___OYVi5::before {
  opacity: 0;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__textarea___jrSae {
  transform: translate(-11px, calc(-9px + (1.4em - 1lh) / 2));
  color: #fff;
  overflow: hidden;
  cursor: default;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedExtra___RUBKC, .styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedActions___6Glpl {
  grid-template-rows: 0fr;
  opacity: 0;
  transition-delay: 0ms;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__actions___D6x3f {
  margin-top: 0;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__stylesWrapper___pnHgy {
  grid-template-rows: 0fr;
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedNote___OYVi5[data-truncated] .styles-module__sharedNoteContent___6q3KD {
  width: calc(100% - 12px);
}
.styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedNote___OYVi5[data-truncated]::after {
  opacity: 1;
}

.styles-module__light___6AaSQ .styles-module__sharedForm___8GvQl .styles-module__sharedNote___OYVi5::before {
  border-color: var(--field-border, rgba(0, 0, 0, 0.12));
  background: rgba(0, 0, 0, 0.03);
}

.styles-module__light___6AaSQ .styles-module__sharedForm___8GvQl .styles-module__element___fTV2z {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__light___6AaSQ .styles-module__sharedForm___8GvQl[data-preview] .styles-module__textarea___jrSae, .styles-module__light___6AaSQ .styles-module__sharedForm___8GvQl[data-preview] .styles-module__sharedNote___OYVi5::after {
  color: rgba(0, 0, 0, 0.85);
}

@media (prefers-reduced-motion: reduce) {
  .styles-module__sharedForm___8GvQl {
    --card-motion: 1ms linear;
  }
  .styles-module__sharedForm___8GvQl .styles-module__sharedActions___6Glpl, .styles-module__sharedForm___8GvQl .styles-module__headerToggle___WpW0b .styles-module__chevron___ZZJlR {
    transition: opacity 100ms ease-out;
    transition-delay: 0ms;
  }
}`,F={popup:`styles-module__popup___IhzrD`,enter:`styles-module__enter___L7U7N`,popupEnter:`styles-module__popupEnter___AuQDN`,entered:`styles-module__entered___COX-w`,exit:`styles-module__exit___5eGjE`,popupExit:`styles-module__popupExit___JJKQX`,shake:`styles-module__shake___jdbWe`,header:`styles-module__header___wWsSi`,element:`styles-module__element___fTV2z`,headerToggle:`styles-module__headerToggle___WpW0b`,chevron:`styles-module__chevron___ZZJlR`,expanded:`styles-module__expanded___2Hxgv`,stylesWrapper:`styles-module__stylesWrapper___pnHgy`,stylesInner:`styles-module__stylesInner___YYZe2`,stylesBlock:`styles-module__stylesBlock___VfQKn`,styleLine:`styles-module__styleLine___1YQiD`,styleProperty:`styles-module__styleProperty___84L1i`,styleValue:`styles-module__styleValue___q51-h`,timestamp:`styles-module__timestamp___Dtpsv`,quote:`styles-module__quote___mcMmQ`,textarea:`styles-module__textarea___jrSae`,green:`styles-module__green___99l3h`,actions:`styles-module__actions___D6x3f`,sourceAction:`styles-module__sourceAction___EabJb`,light:`styles-module__light___6AaSQ`,cancel:`styles-module__cancel___hRjnL`,submit:`styles-module__submit___K-mIR`,deleteButton:`styles-module__deleteButton___4VuAE`,deleteWrapper:`styles-module__deleteWrapper___oSjdo`,sharedForm:`styles-module__sharedForm___8GvQl`,previewExcerpt:`styles-module__previewExcerpt___DCOIL`,sharedNote:`styles-module__sharedNote___OYVi5`,sharedNoteContent:`styles-module__sharedNoteContent___6q3KD`,sharedExtra:`styles-module__sharedExtra___RUBKC`,sharedActions:`styles-module__sharedActions___6Glpl`,sharedExtraInner:`styles-module__sharedExtraInner___EuUh4`},ze=`data-agentation-styles`;function Be(e,t,n){if(!n||!e)return;let r=e.nodeType===9?e.head:e.nodeType===11?e:null;if(!r||typeof r.querySelector!=`function`||r.querySelector(`style[${ze}~="toolbar"], style[${ze}~="${t}"]`))return;let i=(e.nodeType===9?e:e.ownerDocument).createElement(`style`);i.setAttribute(ze,t),i.textContent=n,r.appendChild(i)}function Ve(e,t){return(0,i.useCallback)(n=>{n&&Be(n.getRootNode(),e,t)},[e,t])}function He(e){if(!e)return;let t=e=>e.stopImmediatePropagation();document.addEventListener(`focusin`,t,!0),document.addEventListener(`focusout`,t,!0);try{e.focus({preventScroll:!0})}finally{document.removeEventListener(`focusin`,t,!0),document.removeEventListener(`focusout`,t,!0)}}var Ue=(0,i.forwardRef)(function({element:e,timestamp:t,selectedText:n,placeholder:r=`What should change?`,initialValue:a=``,submitLabel:s=`Add`,onSubmit:c,onCancel:l,onDelete:u,onOpenSource:d,allowEmpty:f=!1,accentColor:p=`#3c82f7`,computedStyles:h,disabled:g=!1,preview:_=!1,resetOnPreview:v=!0,variant:y=`popup`},b){let x=y===`card`,[S,C]=(0,i.useState)(a),[w,T]=(0,i.useState)(!1),[E,ee]=(0,i.useState)(!1),D=(0,i.useRef)(null),O=(0,i.useRef)(null),k=n?` "${n.slice(0,30)}${n.length>30?`...`:``}"`:``;(0,i.useLayoutEffect)(()=>{let t=O.current,n=D.current;if(!x||!t||!n)return;let r=()=>{t.style.setProperty(`--editor-field-height`,`${n.offsetHeight}px`)};if(r(),`CanvasRenderingContext2D`in window){let r=document.createElement(`canvas`).getContext(`2d`);if(r){let i=getComputedStyle(n).fontFamily;r.font=`13px ${i}`;let o=r.measureText(a.replace(/\s+/g,` `)).width;r.font=`italic 12px ${i}`;let s=r.measureText(e+k).width,c=Math.min(200,Math.max(120,Math.ceil(Math.max(o,s))+24));t.closest(`[data-annotation-card]`)?.style.setProperty(`--preview-width`,`${c}px`);let l=t.querySelector(`[data-shared-note]`);l&&l.toggleAttribute(`data-truncated`,o>c-24)}}let i=typeof ResizeObserver<`u`?new ResizeObserver(r):null;return i?.observe(n),()=>i?.disconnect()},[x,e,a,k]),(0,i.useLayoutEffect)(()=>{_&&v&&(C(a),ee(!1),D.current&&(D.current.scrollTop=0,D.current.scrollLeft=0))},[_,v,a]),(0,i.useImperativeHandle)(b,()=>({focus(){let e=D.current;He(e),e&&(e.selectionStart=e.selectionEnd=e.value.length,e.scrollTop=x?0:e.scrollHeight)}}),[x]);let te=(0,i.useCallback)(()=>{g||!S.trim()&&!f||c(S.trim())},[g,S,f,c]);return(0,o.jsxs)(`div`,{ref:O,className:x?F.sharedForm:void 0,style:x?void 0:{display:`contents`},"data-annotation-editor":!0,"data-preview":_||void 0,children:[(0,o.jsxs)(`div`,{className:F.header,"data-editor-heading":!0,children:[h&&Object.keys(h).length>0?(0,o.jsxs)(`button`,{className:F.headerToggle,onClick:()=>{let e=E;ee(!E),e&&m(()=>He(D.current),0)},type:`button`,children:[(0,o.jsx)(`svg`,{className:`${F.chevron} ${E?F.expanded:``}`,width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:(0,o.jsx)(`path`,{d:`M5.5 10.25L9 7.25L5.75 4`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})}),(0,o.jsxs)(`span`,{className:F.element,children:[e,x&&k&&(0,o.jsx)(`span`,{className:F.previewExcerpt,children:k})]})]}):(0,o.jsxs)(`span`,{className:F.element,children:[e,x&&k&&(0,o.jsx)(`span`,{className:F.previewExcerpt,children:k})]}),t&&(0,o.jsx)(`span`,{className:F.timestamp,children:t})]}),d&&(0,o.jsx)(`div`,{className:x?F.sharedExtra:void 0,style:x?void 0:{display:`contents`},children:(0,o.jsx)(`div`,{className:x?F.sharedExtraInner:void 0,style:x?void 0:{display:`contents`},children:(0,o.jsx)(`button`,{type:`button`,className:F.sourceAction,onClick:d,children:`Open in editor`})})}),h&&Object.keys(h).length>0&&(0,o.jsx)(`div`,{className:`${F.stylesWrapper} ${E?F.expanded:``}`,children:(0,o.jsx)(`div`,{className:F.stylesInner,children:(0,o.jsx)(`div`,{className:F.stylesBlock,children:Object.entries(h).map(([e,t])=>(0,o.jsxs)(`div`,{className:F.styleLine,children:[(0,o.jsx)(`span`,{className:F.styleProperty,children:e.replace(/([A-Z])/g,`-$1`).toLowerCase()}),`: `,(0,o.jsx)(`span`,{className:F.styleValue,children:t}),`;`]},e))})})}),n&&(0,o.jsx)(`div`,{className:x?F.sharedExtra:void 0,style:x?void 0:{display:`contents`},children:(0,o.jsx)(`div`,{className:x?F.sharedExtraInner:void 0,style:x?void 0:{display:`contents`},children:(0,o.jsxs)(`div`,{className:F.quote,children:[`“`,n.slice(0,80),n.length>80?`...`:``,`”`]})})}),(0,o.jsx)(`div`,{"data-shared-note":!0,className:x?F.sharedNote:void 0,style:x?{"--field-border":w?p:void 0}:{display:`contents`},children:(0,o.jsx)(`div`,{className:x?F.sharedNoteContent:void 0,style:x?void 0:{display:`contents`},children:(0,o.jsx)(`textarea`,{ref:D,className:F.textarea,readOnly:_,"aria-hidden":_,style:x?void 0:{borderColor:w?p:void 0},placeholder:r,value:_?S.replace(/\s+/g,` `):S,onChange:e=>C(e.target.value),onFocus:()=>T(!0),onBlur:()=>T(!1),rows:2,onKeyDown:e=>{e.stopPropagation(),!e.nativeEvent.isComposing&&(e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),te()),e.key===`Escape`&&l())}})})}),(0,o.jsx)(`div`,{"data-editor-actions":!0,className:x?F.sharedActions:void 0,style:x?void 0:{display:`contents`},children:(0,o.jsxs)(`div`,{className:F.actions,children:[u&&(0,o.jsx)(`div`,{className:F.deleteWrapper,children:(0,o.jsx)(`button`,{className:F.deleteButton,onClick:u,type:`button`,"aria-label":`Delete annotation`,children:`Delete`})}),(0,o.jsx)(`button`,{className:F.cancel,onClick:l,children:`Cancel`}),(0,o.jsx)(`button`,{className:F.submit,style:{backgroundColor:p,opacity:S.trim()||f?1:.4},onClick:te,disabled:g||!S.trim()&&!f,children:s})]})})]})}),We=(0,i.forwardRef)(function({element:e,timestamp:t,selectedText:n,placeholder:r=`What should change?`,initialValue:a=``,submitLabel:s=`Add`,onSubmit:c,onCancel:l,onDelete:u,onOpenSource:d,allowEmpty:f=!1,style:p,accentColor:h=`#3c82f7`,isExiting:g=!1,onExitComplete:_,lightMode:v=!1,computedStyles:y},b){let[x,S]=(0,i.useState)(!1),[C,w]=(0,i.useState)(`initial`),T=(0,i.useRef)(null),E=(0,i.useRef)(null);(0,i.useEffect)(()=>{Be(E.current?.getRootNode(),`annotation-popup`,Re)},[]);let ee=(0,i.useRef)(null);(0,i.useEffect)(()=>{let e=m(()=>{w(e=>e===`initial`?`enter`:e)},0);return()=>{clearTimeout(e),ee.current&&clearTimeout(ee.current)}},[]),(0,i.useEffect)(()=>{if(g)return;let e=m(()=>T.current?.focus(),50);return()=>clearTimeout(e)},[g]);let D=(0,i.useCallback)(()=>{ee.current&&clearTimeout(ee.current),S(!0),ee.current=m(()=>{S(!1),T.current?.focus()},250)},[]);(0,i.useImperativeHandle)(b,()=>({shake:D}),[D]);let O=(0,i.useCallback)(()=>{if(_){l();return}w(`exit`)},[l,_]),k=g?`exit`:C;P(E,k===`exit`,()=>{g?_?.():l()});let te=[F.popup,v?F.light:``,k===`enter`?F.enter:``,k===`entered`?F.entered:``,k===`exit`?F.exit:``,x&&k!==`exit`?F.shake:``].filter(Boolean).join(` `);return(0,o.jsx)(`div`,{ref:E,className:te,"data-annotation-popup":!0,style:p,onAnimationEnd:e=>{e.target===e.currentTarget&&e.animationName.includes(`popupEnter`)&&!g&&w(`entered`)},onKeyDownCapture:e=>{e.key!==`Escape`||e.nativeEvent.isComposing||(e.preventDefault(),e.stopPropagation(),O())},onClick:e=>e.stopPropagation(),children:(0,o.jsx)(Ue,{ref:T,element:e,timestamp:t,selectedText:n,placeholder:r,initialValue:a,submitLabel:s,onSubmit:c,onCancel:O,onDelete:u,onOpenSource:d,allowEmpty:f,accentColor:h,computedStyles:y,disabled:k===`exit`})})}),Ge=`.icon-transitions-module__iconState___uqK9J {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: center;
}

.icon-transitions-module__iconStateFast___HxlMm {
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform-origin: center;
}

.icon-transitions-module__iconFade___nPwXg {
  transition: opacity 0.2s ease;
}

.icon-transitions-module__iconFadeFast___Ofb2t {
  transition: opacity 0.15s ease;
}

.icon-transitions-module__visible___PlHsU {
  opacity: 1 !important;
}

.icon-transitions-module__visibleScaled___8Qog- {
  opacity: 1 !important;
  transform: scale(1);
}

.icon-transitions-module__hidden___ETykt {
  opacity: 0 !important;
}

.icon-transitions-module__hiddenScaled___JXn-m {
  opacity: 0 !important;
  transform: scale(0.8);
}

.icon-transitions-module__sending___uaLN- {
  opacity: 0.5 !important;
  transform: scale(0.8);
}`,I={iconState:`icon-transitions-module__iconState___uqK9J`,iconStateFast:`icon-transitions-module__iconStateFast___HxlMm`,iconFade:`icon-transitions-module__iconFade___nPwXg`,iconFadeFast:`icon-transitions-module__iconFadeFast___Ofb2t`,visible:`icon-transitions-module__visible___PlHsU`,visibleScaled:`icon-transitions-module__visibleScaled___8Qog-`,hidden:`icon-transitions-module__hidden___ETykt`,hiddenScaled:`icon-transitions-module__hiddenScaled___JXn-m`,sending:`icon-transitions-module__sending___uaLN-`},Ke=({size:e=16})=>(0,o.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 16 16`,fill:`none`,children:(0,o.jsx)(`path`,{d:`M8 3v10M3 8h10`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`})}),qe=({size:e=20,...t})=>(0,o.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,...t,children:[(0,o.jsx)(`circle`,{cx:`10`,cy:`10`,r:`5.375`,stroke:`currentColor`,strokeWidth:`1.25`}),(0,o.jsx)(`path`,{d:`M8.5 8.5C8.73 7.85 9.31 7.49 10 7.5C10.86 7.51 11.5 8.13 11.5 9C11.5 10.08 10 10.5 10 10.5V10.75`,stroke:`currentColor`,strokeWidth:`1.25`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`circle`,{cx:`10`,cy:`12.625`,r:`0.625`,fill:`currentColor`})]}),Je=({size:e=24,copied:t=!1,tint:n})=>(0,o.jsxs)(`svg`,{ref:Ve(`icon-transitions`,Ge),width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,style:n?{color:n,transition:`color 0.3s ease`}:void 0,children:[(0,o.jsxs)(`g`,{className:`${I.iconState} ${t?I.hiddenScaled:I.visibleScaled}`,children:[(0,o.jsx)(`path`,{d:`M4.75 11.25C4.75 10.4216 5.42157 9.75 6.25 9.75H12.75C13.5784 9.75 14.25 10.4216 14.25 11.25V17.75C14.25 18.5784 13.5784 19.25 12.75 19.25H6.25C5.42157 19.25 4.75 18.5784 4.75 17.75V11.25Z`,stroke:`currentColor`,strokeWidth:`1.5`}),(0,o.jsx)(`path`,{d:`M17.25 14.25H17.75C18.5784 14.25 19.25 13.5784 19.25 12.75V6.25C19.25 5.42157 18.5784 4.75 17.75 4.75H11.25C10.4216 4.75 9.75 5.42157 9.75 6.25V6.75`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`})]}),(0,o.jsxs)(`g`,{className:`${I.iconState} ${t?I.visibleScaled:I.hiddenScaled}`,children:[(0,o.jsx)(`path`,{d:`M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z`,stroke:`var(--agentation-color-green)`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M15 10L11 14.25L9.25 12.25`,stroke:`var(--agentation-color-green)`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})]})]}),Ye=({size:e=24,state:t=`idle`})=>{let n=t===`idle`,r=t===`sent`,i=t===`failed`,a=t===`sending`;return(0,o.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,children:[(0,o.jsx)(`g`,{className:`${I.iconStateFast} ${n?I.visibleScaled:a?I.sending:I.hiddenScaled}`,children:(0,o.jsx)(`path`,{d:`M9.875 14.125L12.3506 19.6951C12.7184 20.5227 13.9091 20.4741 14.2083 19.6193L18.8139 6.46032C19.0907 5.6695 18.3305 4.90933 17.5397 5.18611L4.38072 9.79174C3.52589 10.0909 3.47731 11.2816 4.30494 11.6494L9.875 14.125ZM9.875 14.125L13.375 10.625`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})}),(0,o.jsxs)(`g`,{className:`${I.iconStateFast} ${r?I.visibleScaled:I.hiddenScaled}`,children:[(0,o.jsx)(`path`,{d:`M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z`,stroke:`var(--agentation-color-green)`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M15 10L11 14.25L9.25 12.25`,stroke:`var(--agentation-color-green)`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})]}),(0,o.jsxs)(`g`,{className:`${I.iconStateFast} ${i?I.visibleScaled:I.hiddenScaled}`,children:[(0,o.jsx)(`path`,{d:`M12 20C7.58172 20 4 16.4182 4 12C4 7.58172 7.58172 4 12 4C16.4182 4 20 7.58172 20 12C20 16.4182 16.4182 20 12 20Z`,stroke:`var(--agentation-color-red)`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M12 8V12`,stroke:`var(--agentation-color-red)`,strokeWidth:`1.5`,strokeLinecap:`round`}),(0,o.jsx)(`circle`,{cx:`12`,cy:`15`,r:`0.5`,fill:`var(--agentation-color-red)`,stroke:`var(--agentation-color-red)`,strokeWidth:`1`})]})]})},Xe=({size:e=24,isOpen:t=!0})=>(0,o.jsxs)(`svg`,{ref:Ve(`icon-transitions`,Ge),width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,children:[(0,o.jsxs)(`g`,{className:`${I.iconFade} ${t?I.visible:I.hidden}`,children:[(0,o.jsx)(`path`,{d:`M3.91752 12.7539C3.65127 12.2996 3.65037 11.7515 3.9149 11.2962C4.9042 9.59346 7.72688 5.49994 12 5.49994C16.2731 5.49994 19.0958 9.59346 20.0851 11.2962C20.3496 11.7515 20.3487 12.2996 20.0825 12.7539C19.0908 14.4459 16.2694 18.4999 12 18.4999C7.73064 18.4999 4.90918 14.4459 3.91752 12.7539Z`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M12 14.8261C13.5608 14.8261 14.8261 13.5608 14.8261 12C14.8261 10.4392 13.5608 9.17392 12 9.17392C10.4392 9.17392 9.17391 10.4392 9.17391 12C9.17391 13.5608 10.4392 14.8261 12 14.8261Z`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})]}),(0,o.jsxs)(`g`,{className:`${I.iconFade} ${t?I.hidden:I.visible}`,children:[(0,o.jsx)(`path`,{d:`M18.6025 9.28503C18.9174 8.9701 19.4364 8.99481 19.7015 9.35271C20.1484 9.95606 20.4943 10.507 20.7342 10.9199C21.134 11.6086 21.1329 12.4454 20.7303 13.1328C20.2144 14.013 19.2151 15.5225 17.7723 16.8193C16.3293 18.1162 14.3852 19.2497 12.0008 19.25C11.4192 19.25 10.8638 19.1823 10.3355 19.0613C9.77966 18.934 9.63498 18.2525 10.0382 17.8493C10.2412 17.6463 10.5374 17.573 10.8188 17.6302C11.1993 17.7076 11.5935 17.75 12.0008 17.75C13.8848 17.7497 15.4867 16.8568 16.7693 15.7041C18.0522 14.5511 18.9606 13.1867 19.4363 12.375C19.5656 12.1543 19.5659 11.8943 19.4373 11.6729C19.2235 11.3049 18.921 10.8242 18.5364 10.3003C18.3085 9.98991 18.3302 9.5573 18.6025 9.28503ZM12.0008 4.75C12.5814 4.75006 13.1358 4.81803 13.6632 4.93953C14.2182 5.06741 14.362 5.74812 13.9593 6.15091C13.7558 6.35435 13.4589 6.42748 13.1771 6.36984C12.7983 6.29239 12.4061 6.25006 12.0008 6.25C10.1167 6.25 8.51415 7.15145 7.23028 8.31543C5.94678 9.47919 5.03918 10.8555 4.56426 11.6729C4.43551 11.8945 4.43582 12.1542 4.56524 12.375C4.77587 12.7343 5.07189 13.2012 5.44718 13.7105C5.67623 14.0213 5.65493 14.4552 5.38193 14.7282C5.0671 15.0431 4.54833 15.0189 4.28292 14.6614C3.84652 14.0736 3.50813 13.5369 3.27129 13.1328C2.86831 12.4451 2.86717 11.6088 3.26739 10.9199C3.78185 10.0345 4.77959 8.51239 6.22247 7.2041C7.66547 5.89584 9.61202 4.75 12.0008 4.75Z`,fill:`currentColor`}),(0,o.jsx)(`path`,{d:`M5 19L19 5`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`})]})]}),Ze=({size:e=24,isPaused:t=!1})=>(0,o.jsxs)(`svg`,{ref:Ve(`icon-transitions`,Ge),width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,children:[(0,o.jsxs)(`g`,{className:`${I.iconFadeFast} ${t?I.hidden:I.visible}`,children:[(0,o.jsx)(`path`,{d:`M8 6L8 18`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`}),(0,o.jsx)(`path`,{d:`M16 18L16 6`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`})]}),(0,o.jsx)(`path`,{className:`${I.iconFadeFast} ${t?I.visible:I.hidden}`,d:`M17.75 10.701C18.75 11.2783 18.75 12.7217 17.75 13.299L8.75 18.4952C7.75 19.0725 6.5 18.3509 6.5 17.1962L6.5 6.80384C6.5 5.64914 7.75 4.92746 8.75 5.50481L17.75 10.701Z`,stroke:`currentColor`,strokeWidth:`1.5`})]}),Qe=({size:e=16})=>(0,o.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,children:[(0,o.jsx)(`path`,{d:`M10.6504 5.81117C10.9939 4.39628 13.0061 4.39628 13.3496 5.81117C13.5715 6.72517 14.6187 7.15891 15.4219 6.66952C16.6652 5.91193 18.0881 7.33479 17.3305 8.57815C16.8411 9.38134 17.2748 10.4285 18.1888 10.6504C19.6037 10.9939 19.6037 13.0061 18.1888 13.3496C17.2748 13.5715 16.8411 14.6187 17.3305 15.4219C18.0881 16.6652 16.6652 18.0881 15.4219 17.3305C14.6187 16.8411 13.5715 17.2748 13.3496 18.1888C13.0061 19.6037 10.9939 19.6037 10.6504 18.1888C10.4285 17.2748 9.38135 16.8411 8.57815 17.3305C7.33479 18.0881 5.91193 16.6652 6.66952 15.4219C7.15891 14.6187 6.72517 13.5715 5.81117 13.3496C4.39628 13.0061 4.39628 10.9939 5.81117 10.6504C6.72517 10.4285 7.15891 9.38134 6.66952 8.57815C5.91193 7.33479 7.33479 5.91192 8.57815 6.66952C9.38135 7.15891 10.4285 6.72517 10.6504 5.81117Z`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`circle`,{cx:`12`,cy:`12`,r:`2.5`,stroke:`currentColor`,strokeWidth:`1.5`})]}),$e=({size:e=16})=>(0,o.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,children:(0,o.jsx)(`path`,{d:`M13.5 4C14.7426 4 15.75 5.00736 15.75 6.25V7H18.5C18.9142 7 19.25 7.33579 19.25 7.75C19.25 8.16421 18.9142 8.5 18.5 8.5H17.9678L17.6328 16.2217C17.61 16.7475 17.5912 17.1861 17.5469 17.543C17.5015 17.9087 17.4225 18.2506 17.2461 18.5723C16.9747 19.0671 16.5579 19.4671 16.0518 19.7168C15.7227 19.8791 15.3772 19.9422 15.0098 19.9717C14.6514 20.0004 14.2126 20 13.6865 20H10.3135C9.78735 20 9.34856 20.0004 8.99023 19.9717C8.62278 19.9422 8.27729 19.8791 7.94824 19.7168C7.44205 19.4671 7.02532 19.0671 6.75391 18.5723C6.57751 18.2506 6.49853 17.9087 6.45312 17.543C6.40883 17.1861 6.39005 16.7475 6.36719 16.2217L6.03223 8.5H5.5C5.08579 8.5 4.75 8.16421 4.75 7.75C4.75 7.33579 5.08579 7 5.5 7H8.25V6.25C8.25 5.00736 9.25736 4 10.5 4H13.5ZM7.86621 16.1562C7.89013 16.7063 7.90624 17.0751 7.94141 17.3584C7.97545 17.6326 8.02151 17.7644 8.06934 17.8516C8.19271 18.0763 8.38239 18.2577 8.6123 18.3711C8.70153 18.4151 8.83504 18.4545 9.11035 18.4766C9.39482 18.4994 9.76335 18.5 10.3135 18.5H13.6865C14.2367 18.5 14.6052 18.4994 14.8896 18.4766C15.165 18.4545 15.2985 18.4151 15.3877 18.3711C15.6176 18.2577 15.8073 18.0763 15.9307 17.8516C15.9785 17.7644 16.0245 17.6326 16.0586 17.3584C16.0938 17.0751 16.1099 16.7063 16.1338 16.1562L16.4668 8.5H7.5332L7.86621 16.1562ZM9.97656 10.75C10.3906 10.7371 10.7371 11.0626 10.75 11.4766L10.875 15.4766C10.8879 15.8906 10.5624 16.2371 10.1484 16.25C9.73443 16.2629 9.38794 15.9374 9.375 15.5234L9.25 11.5234C9.23706 11.1094 9.56255 10.7629 9.97656 10.75ZM14.0244 10.75C14.4384 10.7635 14.7635 11.1105 14.75 11.5244L14.6201 15.5244C14.6066 15.9384 14.2596 16.2634 13.8457 16.25C13.4317 16.2365 13.1067 15.8896 13.1201 15.4756L13.251 11.4756C13.2645 11.0617 13.6105 10.7366 14.0244 10.75ZM10.5 5.5C10.0858 5.5 9.75 5.83579 9.75 6.25V7H14.25V6.25C14.25 5.83579 13.9142 5.5 13.5 5.5H10.5Z`,fill:`currentColor`})}),et=({size:e=16})=>(0,o.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,children:[(0,o.jsxs)(`g`,{clipPath:`url(#clip0_2_53)`,children:[(0,o.jsx)(`path`,{d:`M16.25 16.25L7.75 7.75`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M7.75 16.25L16.25 7.75`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})]}),(0,o.jsx)(`defs`,{children:(0,o.jsx)(`clipPath`,{id:`clip0_2_53`,children:(0,o.jsx)(`rect`,{width:`24`,height:`24`,fill:`white`})})})]}),tt=({size:e=16})=>(0,o.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:`none`,children:[(0,o.jsx)(`path`,{d:`M9.99999 12.7082C11.4958 12.7082 12.7083 11.4956 12.7083 9.99984C12.7083 8.50407 11.4958 7.2915 9.99999 7.2915C8.50422 7.2915 7.29166 8.50407 7.29166 9.99984C7.29166 11.4956 8.50422 12.7082 9.99999 12.7082Z`,stroke:`currentColor`,strokeWidth:`1.25`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M10 3.9585V5.05698`,stroke:`currentColor`,strokeWidth:`1.25`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M10 14.9429V16.0414`,stroke:`currentColor`,strokeWidth:`1.25`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M5.7269 5.72656L6.50682 6.50649`,stroke:`currentColor`,strokeWidth:`1.25`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M13.4932 13.4932L14.2731 14.2731`,stroke:`currentColor`,strokeWidth:`1.25`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M3.95834 10H5.05683`,stroke:`currentColor`,strokeWidth:`1.25`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M14.9432 10H16.0417`,stroke:`currentColor`,strokeWidth:`1.25`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M5.7269 14.2731L6.50682 13.4932`,stroke:`currentColor`,strokeWidth:`1.25`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,o.jsx)(`path`,{d:`M13.4932 6.50649L14.2731 5.72656`,stroke:`currentColor`,strokeWidth:`1.25`,strokeLinecap:`round`,strokeLinejoin:`round`})]}),nt=({size:e=16})=>(0,o.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:`none`,children:(0,o.jsx)(`path`,{d:`M15.5 10.4955C15.4037 11.5379 15.0124 12.5314 14.3721 13.3596C13.7317 14.1878 12.8688 14.8165 11.8841 15.1722C10.8995 15.5278 9.83397 15.5957 8.81217 15.3679C7.79038 15.1401 6.8546 14.6259 6.11434 13.8857C5.37408 13.1454 4.85995 12.2096 4.63211 11.1878C4.40427 10.166 4.47215 9.10048 4.82781 8.11585C5.18346 7.13123 5.81218 6.26825 6.64039 5.62791C7.4686 4.98756 8.46206 4.59634 9.5045 4.5C8.89418 5.32569 8.60049 6.34302 8.67685 7.36695C8.75321 8.39087 9.19454 9.35339 9.92058 10.0794C10.6466 10.8055 11.6091 11.2468 12.6331 11.3231C13.657 11.3995 14.6743 11.1058 15.5 10.4955Z`,stroke:`currentColor`,strokeWidth:`1.13793`,strokeLinecap:`round`,strokeLinejoin:`round`})}),rt=({size:e=16})=>(0,o.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:(0,o.jsx)(`path`,{d:`M11.3799 6.9572L9.05645 4.63375M11.3799 6.9572L6.74949 11.5699C6.61925 11.6996 6.45577 11.791 6.277 11.8339L4.29549 12.3092C3.93194 12.3964 3.60478 12.0683 3.69297 11.705L4.16585 9.75693C4.20893 9.57947 4.29978 9.4172 4.42854 9.28771L9.05645 4.63375M11.3799 6.9572L12.3455 5.98759C12.9839 5.34655 12.9839 4.31002 12.3455 3.66897C11.7033 3.02415 10.6594 3.02415 10.0172 3.66897L9.06126 4.62892L9.05645 4.63375`,stroke:`currentColor`,strokeWidth:`0.9`,strokeLinecap:`round`,strokeLinejoin:`round`})}),it=({size:e=16})=>(0,o.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:(0,o.jsx)(`path`,{d:`M8.5 3.5L4 8L8.5 12.5`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})}),at=({size:e=24})=>(0,o.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`2`,stroke:`currentColor`,strokeWidth:`1.5`}),(0,o.jsx)(`line`,{x1:`3`,y1:`9`,x2:`21`,y2:`9`,stroke:`currentColor`,strokeWidth:`1.5`}),(0,o.jsx)(`line`,{x1:`9`,y1:`9`,x2:`9`,y2:`21`,stroke:`currentColor`,strokeWidth:`1.5`})]}),ot=({content:e,children:t,...n})=>{let[r,s]=(0,i.useState)(!1),[c,l]=(0,i.useState)(!1),[u,d]=(0,i.useState)({top:0,right:0}),f=(0,i.useRef)(null),p=(0,i.useRef)(null),h=(0,i.useRef)(null),g=()=>{if(f.current){let e=f.current.getBoundingClientRect();d({top:e.top+e.height/2,right:window.innerWidth-e.left+8})}};return(0,i.useEffect)(()=>()=>{p.current&&clearTimeout(p.current),h.current&&clearTimeout(h.current)},[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`span`,{ref:f,onMouseEnter:()=>{l(!0),h.current&&=(clearTimeout(h.current),null),g(),p.current=m(()=>{s(!0)},500)},onMouseLeave:()=>{p.current&&=(clearTimeout(p.current),null),s(!1),h.current=m(()=>{l(!1)},150)},...n,children:t}),c&&(0,a.createPortal)((0,o.jsx)(`div`,{"data-feedback-toolbar":!0,style:{position:`fixed`,top:u.top,right:u.right,transform:`translateY(-50%)`,padding:`6px 10px`,background:`#383838`,color:`rgba(255, 255, 255, 0.7)`,fontSize:`11px`,fontWeight:400,lineHeight:`14px`,borderRadius:`10px`,width:`180px`,textAlign:`left`,zIndex:100020,pointerEvents:`none`,boxShadow:`0px 1px 8px rgba(0, 0, 0, 0.28)`,opacity:+!!r,transition:`opacity 0.15s ease`},children:e}),document.body)]})},st=`.styles-module__tooltip___mcXL2 {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: help;
}

.styles-module__tooltipIcon___Nq2nD {
  transform: translateY(0.5px);
  color: #fff;
  opacity: 0.2;
  transition: opacity 0.15s ease;
  will-change: transform;
}
.styles-module__tooltip___mcXL2:hover .styles-module__tooltipIcon___Nq2nD {
  opacity: 0.5;
}
[data-agentation-theme=light] .styles-module__tooltipIcon___Nq2nD {
  color: #000;
}`,ct={tooltip:`styles-module__tooltip___mcXL2`,tooltipIcon:`styles-module__tooltipIcon___Nq2nD`},lt=({content:e})=>(0,o.jsx)(ot,{className:ct.tooltip,content:e,children:(0,o.jsx)(qe,{className:ct.tooltipIcon})}),ut=`.styles-module__toolbar___wNsdK svg[fill=none],
.styles-module__markersLayer___-25j1 svg[fill=none],
.styles-module__fixedMarkersLayer___ffyX6 svg[fill=none] {
  fill: none !important;
}
.styles-module__toolbar___wNsdK svg[fill=none] :not([fill]),
.styles-module__markersLayer___-25j1 svg[fill=none] :not([fill]),
.styles-module__fixedMarkersLayer___ffyX6 svg[fill=none] :not([fill]) {
  fill: none !important;
}

.styles-module__controlsContent___9GJWU :where(button, input, select, textarea, label) {
  background: unset;
  border: unset;
  border-radius: unset;
  padding: unset;
  margin: unset;
  color: unset;
  font-family: unset;
  font-weight: unset;
  font-style: unset;
  line-height: unset;
  letter-spacing: unset;
  text-transform: unset;
  text-decoration: unset;
  box-shadow: unset;
  outline: unset;
}

@keyframes styles-module__toolbarEnter___u8RRu {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(90deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
@keyframes styles-module__toolbarHide___y8kaT {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}
@keyframes styles-module__badgeEnter___mVQLj {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__scaleIn___c-r1K {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__scaleOut___Wctwz {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.85);
  }
}
@keyframes styles-module__slideUp___kgD36 {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes styles-module__slideDown___zcdje {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.85) translateY(8px);
  }
}
@keyframes styles-module__fadeIn___b9qmf {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__fadeOut___6Ut6- {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes styles-module__hoverHighlightIn___6WYHY {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__hoverTooltipIn___FYGQx {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.styles-module__disableTransitions___EopxO :is(*, *::before, *::after) {
  transition: none !important;
}

:host {
  /* Set here rather than inline so a consumer className rule can still hide the toolbar. */
  display: contents;
  position: fixed;
  top: auto;
  left: auto;
  bottom: 1.25rem;
  right: 1.25rem;
  z-index: 100000;
}

.styles-module__positionContext___AZFHE,
.styles-module__toolbar___wNsdK {
  position: inherit;
  top: inherit;
  left: inherit;
  bottom: inherit;
  right: inherit;
  z-index: inherit;
}

.styles-module__toolbar___wNsdK {
  width: 337px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  pointer-events: none;
  transition: left 0.36s cubic-bezier(0.19, 1, 0.22, 1), top 0s, right 0s, bottom 0s;
}
.styles-module__toolbar___wNsdK[data-dragging=true] {
  transition: none;
}

.styles-module__toolbarContainer___dIhma {
  position: relative;
  -webkit-user-select: none;
  user-select: none;
  margin-left: auto;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  transition: width 0.36s cubic-bezier(0.19, 1, 0.22, 1), transform 0.36s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__toolbarContainer___dIhma.styles-module__entrance___sgHd8 {
  animation: styles-module__toolbarEnter___u8RRu 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
}
.styles-module__toolbarContainer___dIhma.styles-module__hiding___1td44 {
  animation: styles-module__toolbarHide___y8kaT 0.4s cubic-bezier(0.4, 0, 1, 1) forwards;
  pointer-events: none;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn {
  width: 44px;
  height: 44px;
  border-radius: 22px;
  padding: 0;
  cursor: pointer;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:hover {
  background: #2a2a2a;
}
.styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:active {
  transform: scale(0.95);
}
.styles-module__toolbarContainer___dIhma.styles-module__expanded___ofKPx {
  height: 44px;
  border-radius: 22px;
  padding: 5px;
  width: 297px;
}
.styles-module__toolbarContainer___dIhma.styles-module__expanded___ofKPx.styles-module__serverConnected___Gfbou {
  width: 337px;
}

@media (prefers-reduced-motion: reduce) {
  .styles-module__toolbar___wNsdK,
  .styles-module__toolbarContainer___dIhma {
    transition: none;
  }
}
.styles-module__buttonWrapper___rBcdv.styles-module__toggleWrapper___7N0-q {
  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
}

.styles-module__togglePlaceholder___wnqrL {
  width: 34px;
  flex: 0 0 34px;
  height: 34px;
}

.styles-module__toggleContent___0yfyP {
  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  padding: 0;
  margin: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: color 0.15s ease;
}
.styles-module__toggleContent___0yfyP::before {
  content: "";
  position: absolute;
  inset: 5px;
  border-radius: 50%;
  pointer-events: none;
  background: transparent;
  transition: background-color 0.15s ease, transform 0.1s ease;
}
.styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN {
  color: rgba(255, 255, 255, 0.85);
}
.styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN:hover {
  color: #fff;
}
.styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN:hover::before {
  background: rgba(255, 255, 255, 0.12);
}
.styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN:active::before, .styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN:active .styles-module__toggleGlyph___R7Oom {
  transform: scale(0.92);
}

.styles-module__toggleIcon___Jbtus {
  transform: translateY(-0.5px);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.styles-module__expandedToggle___F7SRN .styles-module__toggleIcon___Jbtus {
  transform: none;
}

.styles-module__toggleGlyph___R7Oom {
  overflow: visible;
  transition: transform 0.1s ease;
}
.styles-module__toggleGlyph___R7Oom path {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.16s ease;
}

.styles-module__toggleTopLine___hQaCm,
.styles-module__toggleMiddleLine___sFFVe {
  vector-effect: non-scaling-stroke;
}

.styles-module__toggleBottomLine___V-jX3 {
  transform-origin: left center;
}

.styles-module__toggleGlyph___R7Oom[data-active=true] .styles-module__toggleTopLine___hQaCm {
  transform: translateY(5.25px) rotate(45deg) scaleX(1.1422494);
}
.styles-module__toggleGlyph___R7Oom[data-active=true] .styles-module__toggleMiddleLine___sFFVe {
  transform: translateX(3.5px) rotate(-45deg) scaleX(2.4748737);
}
.styles-module__toggleGlyph___R7Oom[data-active=true] .styles-module__toggleBottomLine___V-jX3 {
  transform: scaleX(0);
  opacity: 0;
}
.styles-module__toggleGlyph___R7Oom[data-active=true] .styles-module__toggleSparkle___eeF99 {
  transform: scale(0);
  opacity: 0;
}

.styles-module__toggleContent___0yfyP:focus-visible,
.styles-module__controlButton___8Q0jc:focus-visible {
  outline: 2px solid var(--agentation-color-accent);
  outline-offset: 3px;
}

.styles-module__controlsContent___9GJWU {
  display: flex;
  align-items: center;
  gap: 6px;
  transition: filter 0.14s ease-out, opacity 0.14s ease-out, transform 0.36s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__controlsContent___9GJWU.styles-module__visible___KHwEW {
  transition: filter 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.24s ease-out, transform 0.42s cubic-bezier(0.19, 1, 0.22, 1);
  opacity: 1;
  filter: blur(0px);
  transform: scale(1);
  visibility: visible;
  pointer-events: auto;
}
.styles-module__controlsContent___9GJWU.styles-module__hidden___Ae8H4 {
  pointer-events: none;
  opacity: 0;
  filter: blur(6px);
  transform: scale(0.4);
}

@media (prefers-reduced-motion: reduce) {
  .styles-module__controlsContent___9GJWU,
  .styles-module__controlsContent___9GJWU.styles-module__visible___KHwEW,
  .styles-module__toggleContent___0yfyP,
  .styles-module__toggleContent___0yfyP::before,
  .styles-module__toggleGlyph___R7Oom,
  .styles-module__toggleIcon___Jbtus,
  .styles-module__toggleGlyph___R7Oom path {
    transition: none;
  }
  .styles-module__controlsContent___9GJWU.styles-module__hidden___Ae8H4 {
    filter: none;
    transform: none;
  }
}
.styles-module__badge___2XsgF {
  position: absolute;
  top: -13px;
  right: -13px;
  -webkit-user-select: none;
  user-select: none;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background-color: var(--agentation-color-accent);
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  opacity: 1;
  transition: transform 0.3s ease, opacity 0.2s ease;
  transform: scale(1);
}
.styles-module__badge___2XsgF.styles-module__fadeOut___6Ut6- {
  opacity: 0;
  transform: scale(0);
  pointer-events: none;
}
.styles-module__badge___2XsgF.styles-module__entrance___sgHd8 {
  animation: styles-module__badgeEnter___mVQLj 0.3s cubic-bezier(0.34, 1.2, 0.64, 1) 0.4s both;
}

.styles-module__controlButton___8Q0jc {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease, opacity 0.2s ease;
}
.styles-module__controlButton___8Q0jc:hover:not(:disabled):not([data-active=true]):not([data-failed=true]):not([data-auto-sync=true]):not([data-error=true]):not([data-no-hover=true]) {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}
.styles-module__controlButton___8Q0jc:active:not(:disabled) {
  transform: scale(0.92);
}
.styles-module__controlButton___8Q0jc:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.styles-module__controlButton___8Q0jc[data-active=true] {
  color: var(--agentation-color-blue);
  background-color: color-mix(in srgb, var(--agentation-color-blue) 25%, transparent);
}
.styles-module__controlButton___8Q0jc[data-error=true] {
  color: var(--agentation-color-red);
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
}
.styles-module__controlButton___8Q0jc[data-danger]:hover:not(:disabled):not([data-active=true]):not([data-failed=true]) {
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
  color: var(--agentation-color-red);
}
.styles-module__controlButton___8Q0jc[data-no-hover=true], .styles-module__controlButton___8Q0jc.styles-module__statusShowing___te6iu {
  cursor: default;
  pointer-events: none;
  background: transparent !important;
}
.styles-module__controlButton___8Q0jc[data-auto-sync=true] {
  color: var(--agentation-color-green);
  background: transparent;
  cursor: default;
}
.styles-module__controlButton___8Q0jc[data-failed=true] {
  color: var(--agentation-color-red);
  background-color: color-mix(in srgb, var(--agentation-color-red) 25%, transparent);
}

.styles-module__buttonBadge___NeFWb {
  position: absolute;
  top: 0px;
  right: 0px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background-color: var(--agentation-color-accent);
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px #1a1a1a, 0 1px 3px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}
[data-agentation-theme=light] .styles-module__buttonBadge___NeFWb {
  box-shadow: 0 0 0 2px #fff, 0 1px 3px rgba(0, 0, 0, 0.2);
}

@keyframes styles-module__mcpIndicatorPulseConnected___EDodZ {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  }
  50% {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
}
@keyframes styles-module__mcpIndicatorPulseConnecting___cCYte {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-yellow) 50%, transparent);
  }
  50% {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--agentation-color-yellow) 0%, transparent);
  }
}
.styles-module__mcpIndicator___zGJeL {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
  transition: background-color 0.3s ease, opacity 0.15s ease, transform 0.15s ease;
  opacity: 1;
  transform: scale(1);
}
.styles-module__mcpIndicator___zGJeL.styles-module__connected___7c28g {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpIndicatorPulseConnected___EDodZ 2.5s ease-in-out infinite;
}
.styles-module__mcpIndicator___zGJeL.styles-module__connecting___uo-CW {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpIndicatorPulseConnecting___cCYte 1.5s ease-in-out infinite;
}
.styles-module__mcpIndicator___zGJeL.styles-module__hidden___Ae8H4 {
  opacity: 0;
  transform: scale(0);
  animation: none;
}

@keyframes styles-module__connectionPulse___-Zycw {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.9);
  }
}
.styles-module__connectionIndicatorWrapper___L-e-3 {
  width: 8px;
  height: 34px;
  margin-left: 6px;
  margin-right: 6px;
}

.styles-module__connectionIndicator___afk9p {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  cursor: default;
}

.styles-module__connectionIndicatorVisible___C-i5B {
  opacity: 1;
}

.styles-module__connectionIndicatorConnected___IY8pR {
  background-color: var(--agentation-color-green);
  animation: styles-module__connectionPulse___-Zycw 2.5s ease-in-out infinite;
}

.styles-module__connectionIndicatorDisconnected___kmpaZ {
  background-color: var(--agentation-color-red);
  animation: none;
}

.styles-module__connectionIndicatorConnecting___QmSLH {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__connectionPulse___-Zycw 1s ease-in-out infinite;
}

.styles-module__buttonWrapper___rBcdv {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1);
  transition-delay: 0.85s;
}
.styles-module__buttonWrapper___rBcdv:has(.styles-module__controlButton___8Q0jc:disabled):hover .styles-module__buttonTooltip___Burd9 {
  opacity: 0;
  visibility: hidden;
}

.styles-module__tooltipsInSession___-0lHH .styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  transition-delay: 0s;
}

.styles-module__sendButtonWrapper___UUxG6 {
  width: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  margin-left: -6px;
  transition: width 0.36s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.2s cubic-bezier(0.19, 1, 0.22, 1), margin 0.36s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__sendButtonWrapper___UUxG6 .styles-module__controlButton___8Q0jc {
  transform: scale(0.8);
  transition: transform 0.36s cubic-bezier(0.19, 1, 0.22, 1);
}
.styles-module__sendButtonWrapper___UUxG6.styles-module__sendButtonVisible___WPSQU {
  width: 34px;
  opacity: 1;
  overflow: visible;
  pointer-events: auto;
  margin-left: 0;
}
.styles-module__sendButtonWrapper___UUxG6.styles-module__sendButtonVisible___WPSQU .styles-module__controlButton___8Q0jc {
  transform: scale(1);
}

.styles-module__buttonTooltip___Burd9 {
  position: absolute;
  bottom: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%) scale(0.95);
  padding: 6px 10px;
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 100001;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: opacity 0.135s ease, transform 0.135s ease, visibility 0.135s ease;
}
.styles-module__buttonTooltip___Burd9::after {
  content: "";
  position: absolute;
  top: calc(100% - 4px);
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background: #1a1a1a;
  border-radius: 0 0 2px 0;
}

.styles-module__shortcut___lEAQk {
  margin-left: 4px;
  opacity: 0.5;
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonTooltip___Burd9 {
  bottom: auto;
  top: calc(100% + 14px);
  transform: translateX(-50%) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonTooltip___Burd9::after {
  top: -4px;
  bottom: auto;
  border-radius: 2px 0 0 0;
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapper___rBcdv:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-50%) scale(1);
}

.styles-module__tooltipsHidden___VtLJG .styles-module__buttonTooltip___Burd9 {
  opacity: 0 !important;
  visibility: hidden !important;
  transition: none !important;
}

.styles-module__tooltipVisible___0jcCv,
.styles-module__tooltipsHidden___VtLJG .styles-module__tooltipVisible___0jcCv {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateX(-50%) scale(1) !important;
  transition-delay: 0s !important;
}

.styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9 {
  left: 50%;
  transform: translateX(-12px) scale(0.95);
}
.styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9::after {
  left: 16px;
}
.styles-module__buttonWrapperAlignLeft___myzIp:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(1);
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignLeft___myzIp .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignLeft___myzIp:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(-12px) scale(1);
}

.styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9 {
  left: 50%;
  transform: translateX(calc(-100% + 12px)) scale(0.95);
}
.styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9::after {
  left: auto;
  right: 8px;
}
.styles-module__buttonWrapperAlignRight___HCQFR:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(1);
}

.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignRight___HCQFR .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(0.95);
}
.styles-module__tooltipBelow___m6ats .styles-module__buttonWrapperAlignRight___HCQFR:hover .styles-module__buttonTooltip___Burd9 {
  transform: translateX(calc(-100% + 12px)) scale(1);
}

.styles-module__divider___c--s1 {
  width: 1px;
  height: 12px;
  background: rgba(255, 255, 255, 0.15);
  margin: 0 3px;
}

.styles-module__overlay___Q1O9y {
  position: fixed;
  inset: 0;
  z-index: 99997;
  pointer-events: none;
}
.styles-module__overlay___Q1O9y > * {
  pointer-events: auto;
}

.styles-module__hoverHighlight___ogakW {
  position: fixed;
  border: 2px solid color-mix(in srgb, var(--agentation-color-accent) 50%, transparent);
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--agentation-color-accent) 4%, transparent);
  pointer-events: none !important;
  box-sizing: border-box;
  will-change: opacity;
  contain: layout style;
}
.styles-module__hoverHighlight___ogakW.styles-module__enter___WFIki {
  animation: styles-module__hoverHighlightIn___6WYHY 0.12s ease-out forwards;
}

.styles-module__multiSelectOutline___cSJ-m {
  position: fixed;
  border: 2px dashed color-mix(in srgb, var(--agentation-color-green) 60%, transparent);
  border-radius: 4px;
  pointer-events: none !important;
  background-color: color-mix(in srgb, var(--agentation-color-green) 5%, transparent);
  box-sizing: border-box;
  will-change: opacity;
}
.styles-module__multiSelectOutline___cSJ-m.styles-module__enter___WFIki {
  animation: styles-module__fadeIn___b9qmf 0.15s ease-out forwards;
}
.styles-module__multiSelectOutline___cSJ-m.styles-module__exit___fyOJ0 {
  animation: styles-module__fadeOut___6Ut6- 0.15s ease-out forwards;
}

.styles-module__singleSelectOutline___QhX-O {
  position: fixed;
  border: 2px solid color-mix(in srgb, var(--agentation-color-blue) 60%, transparent);
  border-radius: 4px;
  pointer-events: none !important;
  background-color: color-mix(in srgb, var(--agentation-color-blue) 5%, transparent);
  box-sizing: border-box;
  will-change: opacity;
}
.styles-module__singleSelectOutline___QhX-O.styles-module__enter___WFIki {
  animation: styles-module__fadeIn___b9qmf 0.15s ease-out forwards;
}
.styles-module__singleSelectOutline___QhX-O.styles-module__exit___fyOJ0 {
  animation: styles-module__fadeOut___6Ut6- 0.15s ease-out forwards;
}

.styles-module__hoverTooltip___bvLk7 {
  position: fixed;
  z-index: 99999;
  font-size: 0.6875rem;
  font-weight: 500;
  color: #fff;
  background: rgba(0, 0, 0, 0.85);
  padding: 0.35rem 0.6rem;
  border-radius: 0.375rem;
  pointer-events: none !important;
  white-space: nowrap;
  max-width: min(280px, 100vw - 16px - 1.2rem);
  overflow: hidden;
  text-overflow: ellipsis;
}
.styles-module__hoverTooltip___bvLk7.styles-module__enter___WFIki {
  animation: styles-module__hoverTooltipIn___FYGQx 0.1s ease-out forwards;
}

.styles-module__hoverReactPath___gx1IJ {
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.15rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__hoverElementName___QMLMl {
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__markersLayer___-25j1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  z-index: 99998;
  pointer-events: none;
}
.styles-module__markersLayer___-25j1 > * {
  pointer-events: auto;
}

.styles-module__fixedMarkersLayer___ffyX6 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99998;
  pointer-events: none;
}
.styles-module__fixedMarkersLayer___ffyX6 > * {
  pointer-events: auto;
}

.styles-module__marker___6sQrs {
  position: absolute;
  width: 22px;
  height: 22px;
  background: var(--agentation-color-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  -webkit-user-select: none;
  user-select: none;
  will-change: transform, opacity;
  contain: layout style;
  z-index: 1;
}
.styles-module__marker___6sQrs:hover {
  z-index: 2;
}
.styles-module__marker___6sQrs:not(.styles-module__enter___WFIki):not(.styles-module__exit___fyOJ0):not(.styles-module__clearing___FQ--7) {
  transition: background-color 0.15s ease, transform 0.1s ease;
}
.styles-module__marker___6sQrs.styles-module__enter___WFIki {
  animation: styles-module__markerIn___5FaAP 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.styles-module__marker___6sQrs.styles-module__exit___fyOJ0 {
  animation: styles-module__markerOut___GU5jX 0.2s ease-out both;
  pointer-events: none;
}
.styles-module__marker___6sQrs.styles-module__clearing___FQ--7 {
  animation: styles-module__markerOut___GU5jX 0.15s ease-out both;
  pointer-events: none;
}
.styles-module__marker___6sQrs:not(.styles-module__enter___WFIki):not(.styles-module__exit___fyOJ0):not(.styles-module__clearing___FQ--7):hover {
  transform: translate(-50%, -50%) scale(1.1);
}
.styles-module__marker___6sQrs.styles-module__pending___2IHLC {
  position: fixed;
  background-color: var(--agentation-color-blue);
  cursor: default;
}
.styles-module__marker___6sQrs.styles-module__fixed___dBMHC {
  position: fixed;
}
.styles-module__marker___6sQrs.styles-module__multiSelect___YWiuz {
  background-color: var(--agentation-color-green);
  width: 26px;
  height: 26px;
  border-radius: 6px;
  font-size: 0.75rem;
}
.styles-module__marker___6sQrs.styles-module__multiSelect___YWiuz.styles-module__pending___2IHLC {
  background-color: var(--agentation-color-green);
}
.styles-module__marker___6sQrs.styles-module__hovered___ZgXIy {
  background-color: var(--agentation-color-red);
}

.styles-module__renumber___nCTxD {
  display: block;
  animation: styles-module__renumberRoll___Wgbq3 0.2s ease-out;
}

@keyframes styles-module__renumberRoll___Wgbq3 {
  0% {
    transform: translateX(-40%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.styles-module__markerTooltip___aLJID {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) scale(0.909);
  z-index: 100002;
  background: #1a1a1a;
  padding: 8px 0.75rem;
  border-radius: 0.75rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 400;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
  min-width: 120px;
  max-width: 200px;
  pointer-events: none;
  cursor: default;
}
.styles-module__markerTooltip___aLJID.styles-module__enter___WFIki {
  animation: styles-module__tooltipIn___0N31w 0.1s ease-out forwards;
}

.styles-module__markerQuote___FHmrz {
  display: block;
  font-size: 12px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.3125rem;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__markerNote___QkrrS {
  display: block;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 2px;
}

.styles-module__markerHint___2iF-6 {
  display: block;
  font-size: 0.625rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.375rem;
  white-space: nowrap;
}

.styles-module__settingsPanel___OxX3Y {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  z-index: 1;
  overflow: hidden;
  background: #1c1c1c;
  border-radius: 1rem;
  padding: 13px 0 16px;
  min-width: 205px;
  cursor: default;
  opacity: 1;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}
.styles-module__settingsPanel___OxX3Y::before, .styles-module__settingsPanel___OxX3Y::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16px;
  z-index: 2;
  pointer-events: none;
}
.styles-module__settingsPanel___OxX3Y::before {
  left: 0;
  background: linear-gradient(to right, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___OxX3Y::after {
  right: 0;
  background: linear-gradient(to left, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___OxX3Y .styles-module__settingsHeader___pwDY9,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrand___0gJeM,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsBrandSlash___uTG18,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsVersion___TUcFq,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsSection___m-YM2,
.styles-module__settingsPanel___OxX3Y .styles-module__settingsLabel___8UjfX,
.styles-module__settingsPanel___OxX3Y .styles-module__cycleButton___FMKfw,
.styles-module__settingsPanel___OxX3Y .styles-module__cycleDot___nPgLY,
.styles-module__settingsPanel___OxX3Y .styles-module__dropdownButton___16NPz,
.styles-module__settingsPanel___OxX3Y .styles-module__toggleLabel___Xm8Aa,
.styles-module__settingsPanel___OxX3Y .styles-module__customCheckbox___U39ax,
.styles-module__settingsPanel___OxX3Y .styles-module__sliderLabel___U8sPr,
.styles-module__settingsPanel___OxX3Y .styles-module__slider___GLdxp,
.styles-module__settingsPanel___OxX3Y .styles-module__themeToggle___2rUjA {
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__settingsPanel___OxX3Y.styles-module__enter___WFIki {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0px);
  transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
.styles-module__settingsPanel___OxX3Y.styles-module__exit___fyOJ0 {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
  filter: blur(5px);
  pointer-events: none;
  transition: opacity 0.1s ease, transform 0.1s ease, filter 0.1s ease;
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y {
  background: #1a1a1a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsLabel___8UjfX {
  color: rgba(255, 255, 255, 0.6);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12 {
  color: rgba(255, 255, 255, 0.85);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12:hover {
  background: rgba(255, 255, 255, 0.1);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__settingsOption___UNa12.styles-module__selected___OwRqP {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
[data-agentation-theme=dark] .styles-module__settingsPanel___OxX3Y .styles-module__toggleLabel___Xm8Aa {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__settingsPanelContainer___Xksv8 {
  overflow: visible;
  position: relative;
  display: flex;
  padding: 0 1rem;
}

.styles-module__settingsPage___6YfHH {
  min-width: 100%;
  flex-shrink: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
  transition-delay: 0s;
  opacity: 1;
}

.styles-module__settingsPage___6YfHH.styles-module__slideLeft___Ps01J {
  transform: translateX(-24px);
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___uvCq6 {
  position: absolute;
  top: 0;
  left: 24px;
  width: 100%;
  height: 100%;
  padding: 3px 1rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___uvCq6.styles-module__slideIn___4-qXe {
  transform: translateX(-24px);
  opacity: 1;
  pointer-events: auto;
}

.styles-module__settingsNavLink___wCzJt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___wCzJt:hover {
  color: rgba(255, 255, 255, 0.9);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt:hover {
  color: rgba(0, 0, 0, 0.8);
}
.styles-module__settingsNavLink___wCzJt svg {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___wCzJt:hover svg {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt svg {
  color: rgba(0, 0, 0, 0.25);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___wCzJt:hover svg {
  color: rgba(0, 0, 0, 0.8);
}

.styles-module__settingsNavLinkRight___ZWwhj {
  display: flex;
  align-items: center;
  gap: 6px;
}

.styles-module__mcpNavIndicator___cl9pO {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpNavIndicator___cl9pO.styles-module__connected___7c28g {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___uNggr 2.5s ease-in-out infinite;
}
.styles-module__mcpNavIndicator___cl9pO.styles-module__connecting___uo-CW {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___uNggr 1.5s ease-in-out infinite;
}

.styles-module__settingsBackButton___bIe2j {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 0 12px 0;
  margin: -6px 0 0.5rem 0;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 0;
  background: transparent;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: -0.15px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.12s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___bIe2j svg {
  opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___bIe2j:hover {
  border-bottom-color: rgba(255, 255, 255, 0.07);
}
.styles-module__settingsBackButton___bIe2j:hover svg {
  opacity: 1;
}
[data-agentation-theme=light] .styles-module__settingsBackButton___bIe2j {
  color: rgba(0, 0, 0, 0.85);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}
[data-agentation-theme=light] .styles-module__settingsBackButton___bIe2j:hover {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.styles-module__automationHeader___InP0r {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #fff;
}
[data-agentation-theme=light] .styles-module__automationHeader___InP0r {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__automationDescription___NKlmo {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  line-height: 14px;
}
[data-agentation-theme=light] .styles-module__automationDescription___NKlmo {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__learnMoreLink___8xv-x {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__learnMoreLink___8xv-x:hover {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__learnMoreLink___8xv-x {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__learnMoreLink___8xv-x:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__autoSendRow___UblX5 {
  display: flex;
  align-items: center;
  gap: 8px;
}

.styles-module__autoSendLabel___icDc2 {
  font-size: 0.6875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__autoSendLabel___icDc2.styles-module__active___-zoN6 {
  color: #66b8ff;
  color: color(display-p3 0.4 0.72 1);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___icDc2 {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___icDc2.styles-module__active___-zoN6 {
  color: var(--agentation-color-blue);
}

.styles-module__webhookUrlInput___2375C {
  display: block;
  width: 100%;
  flex: 1;
  min-height: 60px;
  box-sizing: border-box;
  margin-top: 11px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 400;
  color: #fff;
  outline: none;
  resize: none;
  user-select: text;
  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
}
.styles-module__webhookUrlInput___2375C::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__webhookUrlInput___2375C:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C {
  border-color: rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___2375C:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__settingsHeader___pwDY9 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
  margin-bottom: 0.5rem;
  padding-bottom: 9px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.styles-module__settingsBrand___0gJeM {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.0094em;
  color: #fff;
  text-decoration: none;
}

.styles-module__settingsBrandSlash___uTG18 {
  color: var(--agentation-color-accent);
  transition: color 0.2s ease;
}

.styles-module__settingsVersion___TUcFq {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  margin-left: auto;
  letter-spacing: -0.0094em;
}

.styles-module__settingsSection___m-YM2 + .styles-module__settingsSection___m-YM2 {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__settingsSection___m-YM2.styles-module__settingsSectionExtraPadding___jdhFV {
  padding-top: calc(0.5rem + 4px);
}

.styles-module__settingsSectionGrow___h-5HZ {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.styles-module__settingsRow___3sdhc {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
}
.styles-module__settingsRow___3sdhc.styles-module__settingsRowMarginTop___zA0Sp {
  margin-top: 8px;
}

.styles-module__dropdownContainer___BVnxe {
  position: relative;
}

.styles-module__dropdownButton___16NPz {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__dropdownButton___16NPz:hover {
  background: rgba(255, 255, 255, 0.08);
}
.styles-module__dropdownButton___16NPz svg {
  opacity: 0.6;
}

.styles-module__cycleButton___FMKfw {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  letter-spacing: -0.0094em;
}
[data-agentation-theme=light] .styles-module__cycleButton___FMKfw {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__cycleButton___FMKfw:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.styles-module__settingsRowDisabled___EgS0V .styles-module__settingsLabel___8UjfX {
  color: rgba(255, 255, 255, 0.2);
}
[data-agentation-theme=light] .styles-module__settingsRowDisabled___EgS0V .styles-module__settingsLabel___8UjfX {
  color: rgba(0, 0, 0, 0.2);
}
.styles-module__settingsRowDisabled___EgS0V .styles-module__toggleSwitch___l4Ygm {
  opacity: 0.4;
  cursor: not-allowed;
}

@keyframes styles-module__cycleTextIn___Q6zJf {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.styles-module__cycleButtonText___fD1LR {
  display: inline-block;
  animation: styles-module__cycleTextIn___Q6zJf 0.2s ease-out;
}

.styles-module__cycleDots___LWuoQ {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.styles-module__cycleDot___nPgLY {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.667);
  transition: background-color 0.25s ease-out, transform 0.25s ease-out;
}
.styles-module__cycleDot___nPgLY.styles-module__active___-zoN6 {
  background: #fff;
  transform: scale(1);
}
[data-agentation-theme=light] .styles-module__cycleDot___nPgLY {
  background: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__cycleDot___nPgLY.styles-module__active___-zoN6 {
  background: rgba(0, 0, 0, 0.7);
}

.styles-module__dropdownMenu___k73ER {
  position: absolute;
  right: 0;
  top: calc(100% + 0.25rem);
  background: #1a1a1a;
  border-radius: 0.5rem;
  padding: 0.25rem;
  min-width: 120px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
  z-index: 10;
  animation: styles-module__scaleIn___c-r1K 0.15s ease-out;
}

.styles-module__dropdownItem___ylsLj {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.625rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  text-align: left;
  transition: background-color 0.15s ease, color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__dropdownItem___ylsLj:hover {
  background: rgba(255, 255, 255, 0.08);
}
.styles-module__dropdownItem___ylsLj.styles-module__selected___OwRqP {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-weight: 600;
}

.styles-module__settingsLabel___8UjfX {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 0.125rem;
}
[data-agentation-theme=light] .styles-module__settingsLabel___8UjfX {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__settingsLabelMarker___ewdtV {
  padding-top: 3px;
  margin-bottom: 10px;
}

.styles-module__settingsOptions___LyrBA {
  display: flex;
  gap: 0.25rem;
}

.styles-module__settingsOption___UNa12 {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.375rem 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.styles-module__settingsOption___UNa12:hover {
  background: rgba(0, 0, 0, 0.05);
}
.styles-module__settingsOption___UNa12.styles-module__selected___OwRqP {
  background: color-mix(in srgb, var(--agentation-color-blue) 15%, transparent);
  color: var(--agentation-color-blue);
}

.styles-module__sliderContainer___ducXj {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.styles-module__slider___GLdxp {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.styles-module__slider___GLdxp::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.styles-module__slider___GLdxp::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.styles-module__slider___GLdxp:hover::-webkit-slider-thumb {
  transform: scale(1.15);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}
.styles-module__slider___GLdxp:hover::-moz-range-thumb {
  transform: scale(1.15);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.styles-module__sliderLabels___FhLDB {
  display: flex;
  justify-content: space-between;
}

.styles-module__sliderLabel___U8sPr {
  font-size: 0.625rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: color 0.15s ease;
}
.styles-module__sliderLabel___U8sPr:hover {
  color: rgba(255, 255, 255, 0.7);
}
.styles-module__sliderLabel___U8sPr.styles-module__active___-zoN6 {
  color: rgba(255, 255, 255, 0.9);
}

.styles-module__colorOptions___iHCNX {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.375rem;
  margin-bottom: 1px;
}

.styles-module__colorOption___IodiY {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
  background-color: var(--swatch);
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}
@supports (color: color(display-p3 0 0 0)) {
  .styles-module__colorOption___IodiY {
    background-color: var(--swatch-p3);
  }
}
.styles-module__colorOption___IodiY:hover {
  transform: scale(1.15);
}
.styles-module__colorOption___IodiY.styles-module__selected___OwRqP {
  transform: scale(0.83);
}

.styles-module__colorOptionRing___U2xpo {
  display: flex;
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-radius: 50%;
  transition: border-color 0.3s ease;
}
.styles-module__colorOptionRing___U2xpo.styles-module__selected___OwRqP {
  border-color: var(--swatch);
}
@supports (color: color(display-p3 0 0 0)) {
  .styles-module__colorOptionRing___U2xpo.styles-module__selected___OwRqP {
    border-color: var(--swatch-p3);
  }
}

.styles-module__settingsToggle___fBrFn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.styles-module__settingsToggle___fBrFn + .styles-module__settingsToggle___fBrFn {
  margin-top: calc(0.5rem + 6px);
}
.styles-module__settingsToggle___fBrFn input[type=checkbox] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.styles-module__settingsToggle___fBrFn.styles-module__settingsToggleMarginBottom___MZUyF {
  margin-bottom: calc(0.5rem + 6px);
}

@keyframes styles-module__mcpPulse___uNggr {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
}
@keyframes styles-module__mcpPulseError___fov9B {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
}
.styles-module__mcpStatusDot___ibgkc {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__connecting___uo-CW {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___uNggr 1.5s infinite;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__connected___7c28g {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___uNggr 2.5s ease-in-out infinite;
}
.styles-module__mcpStatusDot___ibgkc.styles-module__disconnected___cHPxR {
  background-color: var(--agentation-color-red);
  animation: styles-module__mcpPulseError___fov9B 2s infinite;
}

.styles-module__drawCanvas___7cG9U {
  position: fixed;
  inset: 0;
  z-index: 99996;
  pointer-events: none !important;
}
.styles-module__drawCanvas___7cG9U.styles-module__active___-zoN6 {
  pointer-events: auto !important;
  cursor: crosshair !important;
}
.styles-module__drawCanvas___7cG9U.styles-module__active___-zoN6[data-stroke-hover] {
  cursor: pointer !important;
}

.styles-module__dragSelection___kZLq2 {
  position: fixed;
  top: 0;
  left: 0;
  border: 2px solid color-mix(in srgb, var(--agentation-color-green) 60%, transparent);
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--agentation-color-green) 8%, transparent);
  pointer-events: none;
  z-index: 99997;
  will-change: transform, width, height;
  contain: layout style;
}

.styles-module__dragCount___KM90j {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--agentation-color-green);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  min-width: 1.5rem;
  text-align: center;
}

.styles-module__highlightsContainer___-0xzG {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99996;
}

.styles-module__selectedElementHighlight___fyVlI {
  position: fixed;
  top: 0;
  left: 0;
  border: 2px solid color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  border-radius: 4px;
  background: color-mix(in srgb, var(--agentation-color-green) 6%, transparent);
  pointer-events: none;
  will-change: transform, width, height;
  contain: layout style;
}

[data-agentation-theme=light] .styles-module__toolbarContainer___dIhma {
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
[data-agentation-theme=light] .styles-module__toolbarContainer___dIhma.styles-module__collapsed___Rydsn:hover {
  background: #f5f5f5;
}
[data-agentation-theme=light] .styles-module__toggleContent___0yfyP {
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN:hover {
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__toggleContent___0yfyP.styles-module__expandedToggle___F7SRN:hover::before {
  background: rgba(0, 0, 0, 0.06);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc:hover:not(:disabled):not([data-active=true]):not([data-failed=true]):not([data-auto-sync=true]):not([data-error=true]):not([data-no-hover=true]) {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-active=true] {
  color: var(--agentation-color-blue);
  background: color-mix(in srgb, var(--agentation-color-blue) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-error=true] {
  color: var(--agentation-color-red);
  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-danger]:hover:not(:disabled):not([data-active=true]):not([data-failed=true]) {
  color: var(--agentation-color-red);
  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-auto-sync=true] {
  color: var(--agentation-color-green);
  background: transparent;
}
[data-agentation-theme=light] .styles-module__controlButton___8Q0jc[data-failed=true] {
  color: var(--agentation-color-red);
  background: color-mix(in srgb, var(--agentation-color-red) 15%, transparent);
}
[data-agentation-theme=light] .styles-module__buttonTooltip___Burd9 {
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
[data-agentation-theme=light] .styles-module__buttonTooltip___Burd9::after {
  background: #fff;
}
[data-agentation-theme=light] .styles-module__divider___c--s1 {
  background: rgba(0, 0, 0, 0.1);
}`,L={toolbar:`styles-module__toolbar___wNsdK`,markersLayer:`styles-module__markersLayer___-25j1`,fixedMarkersLayer:`styles-module__fixedMarkersLayer___ffyX6`,controlsContent:`styles-module__controlsContent___9GJWU`,disableTransitions:`styles-module__disableTransitions___EopxO`,positionContext:`styles-module__positionContext___AZFHE`,toolbarContainer:`styles-module__toolbarContainer___dIhma`,entrance:`styles-module__entrance___sgHd8`,toolbarEnter:`styles-module__toolbarEnter___u8RRu`,hiding:`styles-module__hiding___1td44`,toolbarHide:`styles-module__toolbarHide___y8kaT`,collapsed:`styles-module__collapsed___Rydsn`,expanded:`styles-module__expanded___ofKPx`,serverConnected:`styles-module__serverConnected___Gfbou`,buttonWrapper:`styles-module__buttonWrapper___rBcdv`,toggleWrapper:`styles-module__toggleWrapper___7N0-q`,togglePlaceholder:`styles-module__togglePlaceholder___wnqrL`,toggleContent:`styles-module__toggleContent___0yfyP`,expandedToggle:`styles-module__expandedToggle___F7SRN`,toggleGlyph:`styles-module__toggleGlyph___R7Oom`,toggleIcon:`styles-module__toggleIcon___Jbtus`,toggleTopLine:`styles-module__toggleTopLine___hQaCm`,toggleMiddleLine:`styles-module__toggleMiddleLine___sFFVe`,toggleBottomLine:`styles-module__toggleBottomLine___V-jX3`,toggleSparkle:`styles-module__toggleSparkle___eeF99`,controlButton:`styles-module__controlButton___8Q0jc`,visible:`styles-module__visible___KHwEW`,hidden:`styles-module__hidden___Ae8H4`,badge:`styles-module__badge___2XsgF`,fadeOut:`styles-module__fadeOut___6Ut6-`,badgeEnter:`styles-module__badgeEnter___mVQLj`,statusShowing:`styles-module__statusShowing___te6iu`,buttonBadge:`styles-module__buttonBadge___NeFWb`,mcpIndicator:`styles-module__mcpIndicator___zGJeL`,connected:`styles-module__connected___7c28g`,mcpIndicatorPulseConnected:`styles-module__mcpIndicatorPulseConnected___EDodZ`,connecting:`styles-module__connecting___uo-CW`,mcpIndicatorPulseConnecting:`styles-module__mcpIndicatorPulseConnecting___cCYte`,connectionIndicatorWrapper:`styles-module__connectionIndicatorWrapper___L-e-3`,connectionIndicator:`styles-module__connectionIndicator___afk9p`,connectionIndicatorVisible:`styles-module__connectionIndicatorVisible___C-i5B`,connectionIndicatorConnected:`styles-module__connectionIndicatorConnected___IY8pR`,connectionPulse:`styles-module__connectionPulse___-Zycw`,connectionIndicatorDisconnected:`styles-module__connectionIndicatorDisconnected___kmpaZ`,connectionIndicatorConnecting:`styles-module__connectionIndicatorConnecting___QmSLH`,buttonTooltip:`styles-module__buttonTooltip___Burd9`,tooltipsInSession:`styles-module__tooltipsInSession___-0lHH`,sendButtonWrapper:`styles-module__sendButtonWrapper___UUxG6`,sendButtonVisible:`styles-module__sendButtonVisible___WPSQU`,shortcut:`styles-module__shortcut___lEAQk`,tooltipBelow:`styles-module__tooltipBelow___m6ats`,tooltipsHidden:`styles-module__tooltipsHidden___VtLJG`,tooltipVisible:`styles-module__tooltipVisible___0jcCv`,buttonWrapperAlignLeft:`styles-module__buttonWrapperAlignLeft___myzIp`,buttonWrapperAlignRight:`styles-module__buttonWrapperAlignRight___HCQFR`,divider:`styles-module__divider___c--s1`,overlay:`styles-module__overlay___Q1O9y`,hoverHighlight:`styles-module__hoverHighlight___ogakW`,enter:`styles-module__enter___WFIki`,hoverHighlightIn:`styles-module__hoverHighlightIn___6WYHY`,multiSelectOutline:`styles-module__multiSelectOutline___cSJ-m`,fadeIn:`styles-module__fadeIn___b9qmf`,exit:`styles-module__exit___fyOJ0`,singleSelectOutline:`styles-module__singleSelectOutline___QhX-O`,hoverTooltip:`styles-module__hoverTooltip___bvLk7`,hoverTooltipIn:`styles-module__hoverTooltipIn___FYGQx`,hoverReactPath:`styles-module__hoverReactPath___gx1IJ`,hoverElementName:`styles-module__hoverElementName___QMLMl`,marker:`styles-module__marker___6sQrs`,clearing:`styles-module__clearing___FQ--7`,markerIn:`styles-module__markerIn___5FaAP`,markerOut:`styles-module__markerOut___GU5jX`,pending:`styles-module__pending___2IHLC`,fixed:`styles-module__fixed___dBMHC`,multiSelect:`styles-module__multiSelect___YWiuz`,hovered:`styles-module__hovered___ZgXIy`,renumber:`styles-module__renumber___nCTxD`,renumberRoll:`styles-module__renumberRoll___Wgbq3`,markerTooltip:`styles-module__markerTooltip___aLJID`,tooltipIn:`styles-module__tooltipIn___0N31w`,markerQuote:`styles-module__markerQuote___FHmrz`,markerNote:`styles-module__markerNote___QkrrS`,markerHint:`styles-module__markerHint___2iF-6`,settingsPanel:`styles-module__settingsPanel___OxX3Y`,settingsHeader:`styles-module__settingsHeader___pwDY9`,settingsBrand:`styles-module__settingsBrand___0gJeM`,settingsBrandSlash:`styles-module__settingsBrandSlash___uTG18`,settingsVersion:`styles-module__settingsVersion___TUcFq`,settingsSection:`styles-module__settingsSection___m-YM2`,settingsLabel:`styles-module__settingsLabel___8UjfX`,cycleButton:`styles-module__cycleButton___FMKfw`,cycleDot:`styles-module__cycleDot___nPgLY`,dropdownButton:`styles-module__dropdownButton___16NPz`,toggleLabel:`styles-module__toggleLabel___Xm8Aa`,customCheckbox:`styles-module__customCheckbox___U39ax`,sliderLabel:`styles-module__sliderLabel___U8sPr`,slider:`styles-module__slider___GLdxp`,themeToggle:`styles-module__themeToggle___2rUjA`,settingsOption:`styles-module__settingsOption___UNa12`,selected:`styles-module__selected___OwRqP`,settingsPanelContainer:`styles-module__settingsPanelContainer___Xksv8`,settingsPage:`styles-module__settingsPage___6YfHH`,slideLeft:`styles-module__slideLeft___Ps01J`,automationsPage:`styles-module__automationsPage___uvCq6`,slideIn:`styles-module__slideIn___4-qXe`,settingsNavLink:`styles-module__settingsNavLink___wCzJt`,settingsNavLinkRight:`styles-module__settingsNavLinkRight___ZWwhj`,mcpNavIndicator:`styles-module__mcpNavIndicator___cl9pO`,mcpPulse:`styles-module__mcpPulse___uNggr`,settingsBackButton:`styles-module__settingsBackButton___bIe2j`,automationHeader:`styles-module__automationHeader___InP0r`,automationDescription:`styles-module__automationDescription___NKlmo`,learnMoreLink:`styles-module__learnMoreLink___8xv-x`,autoSendRow:`styles-module__autoSendRow___UblX5`,autoSendLabel:`styles-module__autoSendLabel___icDc2`,active:`styles-module__active___-zoN6`,webhookUrlInput:`styles-module__webhookUrlInput___2375C`,settingsSectionExtraPadding:`styles-module__settingsSectionExtraPadding___jdhFV`,settingsSectionGrow:`styles-module__settingsSectionGrow___h-5HZ`,settingsRow:`styles-module__settingsRow___3sdhc`,settingsRowMarginTop:`styles-module__settingsRowMarginTop___zA0Sp`,dropdownContainer:`styles-module__dropdownContainer___BVnxe`,settingsRowDisabled:`styles-module__settingsRowDisabled___EgS0V`,toggleSwitch:`styles-module__toggleSwitch___l4Ygm`,cycleButtonText:`styles-module__cycleButtonText___fD1LR`,cycleTextIn:`styles-module__cycleTextIn___Q6zJf`,cycleDots:`styles-module__cycleDots___LWuoQ`,dropdownMenu:`styles-module__dropdownMenu___k73ER`,scaleIn:`styles-module__scaleIn___c-r1K`,dropdownItem:`styles-module__dropdownItem___ylsLj`,settingsLabelMarker:`styles-module__settingsLabelMarker___ewdtV`,settingsOptions:`styles-module__settingsOptions___LyrBA`,sliderContainer:`styles-module__sliderContainer___ducXj`,sliderLabels:`styles-module__sliderLabels___FhLDB`,colorOptions:`styles-module__colorOptions___iHCNX`,colorOption:`styles-module__colorOption___IodiY`,colorOptionRing:`styles-module__colorOptionRing___U2xpo`,settingsToggle:`styles-module__settingsToggle___fBrFn`,settingsToggleMarginBottom:`styles-module__settingsToggleMarginBottom___MZUyF`,mcpStatusDot:`styles-module__mcpStatusDot___ibgkc`,disconnected:`styles-module__disconnected___cHPxR`,mcpPulseError:`styles-module__mcpPulseError___fov9B`,drawCanvas:`styles-module__drawCanvas___7cG9U`,dragSelection:`styles-module__dragSelection___kZLq2`,dragCount:`styles-module__dragCount___KM90j`,highlightsContainer:`styles-module__highlightsContainer___-0xzG`,selectedElementHighlight:`styles-module__selectedElementHighlight___fyVlI`,scaleOut:`styles-module__scaleOut___Wctwz`,slideUp:`styles-module__slideUp___kgD36`,slideDown:`styles-module__slideDown___zcdje`};function dt({active:e}){return(0,o.jsxs)(`svg`,{className:L.toggleGlyph,"data-active":e,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:[(0,o.jsx)(`path`,{className:L.toggleTopLine,d:`M5.5 6.75H18.5`}),(0,o.jsx)(`path`,{className:L.toggleMiddleLine,d:`M5.5 12H11.5`}),(0,o.jsx)(`path`,{className:L.toggleBottomLine,d:`M5.5 17.25H9.25`}),(0,o.jsx)(`path`,{className:L.toggleSparkle,d:`M16 12.75L16.5179 13.9677C16.8078 14.6494 17.3506 15.1922 18.0323 15.4821L19.25 16L18.0323 16.5179C17.3506 16.8078 16.8078 17.3506 16.5179 18.0323L16 19.25L15.4821 18.0323C15.1922 17.3506 14.6494 16.8078 13.9677 16.5179L12.75 16L13.9677 15.4821C14.6494 15.1922 15.1922 14.6494 15.4821 13.9677L16 12.75Z`})]})}var R={navigation:{width:800,height:56},hero:{width:800,height:320},header:{width:800,height:80},section:{width:800,height:400},sidebar:{width:240,height:400},footer:{width:800,height:160},modal:{width:480,height:300},card:{width:280,height:240},text:{width:400,height:120},image:{width:320,height:200},video:{width:480,height:270},table:{width:560,height:220},grid:{width:600,height:300},list:{width:300,height:180},chart:{width:400,height:240},button:{width:140,height:40},input:{width:280,height:56},form:{width:360,height:320},tabs:{width:480,height:240},dropdown:{width:200,height:200},toggle:{width:44,height:24},search:{width:320,height:44},avatar:{width:48,height:48},badge:{width:80,height:28},breadcrumb:{width:300,height:24},pagination:{width:300,height:36},progress:{width:240,height:8},divider:{width:600,height:1},accordion:{width:400,height:200},carousel:{width:600,height:300},toast:{width:320,height:64},tooltip:{width:180,height:40},pricing:{width:300,height:360},testimonial:{width:360,height:200},cta:{width:600,height:160},alert:{width:400,height:56},banner:{width:800,height:48},stat:{width:200,height:120},stepper:{width:480,height:48},tag:{width:72,height:28},rating:{width:160,height:28},map:{width:480,height:300},timeline:{width:360,height:320},fileUpload:{width:360,height:180},codeBlock:{width:480,height:200},calendar:{width:300,height:300},notification:{width:360,height:72},productCard:{width:280,height:360},profile:{width:280,height:200},drawer:{width:320,height:400},popover:{width:240,height:160},logo:{width:120,height:40},faq:{width:560,height:320},gallery:{width:560,height:360},checkbox:{width:20,height:20},radio:{width:20,height:20},slider:{width:240,height:32},datePicker:{width:300,height:320},skeleton:{width:320,height:120},chip:{width:96,height:32},icon:{width:24,height:24},spinner:{width:32,height:32},feature:{width:360,height:200},team:{width:560,height:280},login:{width:360,height:360},contact:{width:400,height:320}},ft=[{section:`Layout`,items:[{type:`navigation`,label:`Navigation`,...R.navigation},{type:`header`,label:`Header`,...R.header},{type:`hero`,label:`Hero`,...R.hero},{type:`section`,label:`Section`,...R.section},{type:`sidebar`,label:`Sidebar`,...R.sidebar},{type:`footer`,label:`Footer`,...R.footer},{type:`modal`,label:`Modal`,...R.modal},{type:`banner`,label:`Banner`,...R.banner},{type:`drawer`,label:`Drawer`,...R.drawer},{type:`popover`,label:`Popover`,...R.popover},{type:`divider`,label:`Divider`,...R.divider}]},{section:`Content`,items:[{type:`card`,label:`Card`,...R.card},{type:`text`,label:`Text`,...R.text},{type:`image`,label:`Image`,...R.image},{type:`video`,label:`Video`,...R.video},{type:`table`,label:`Table`,...R.table},{type:`grid`,label:`Grid`,...R.grid},{type:`list`,label:`List`,...R.list},{type:`chart`,label:`Chart`,...R.chart},{type:`codeBlock`,label:`Code Block`,...R.codeBlock},{type:`map`,label:`Map`,...R.map},{type:`timeline`,label:`Timeline`,...R.timeline},{type:`calendar`,label:`Calendar`,...R.calendar},{type:`accordion`,label:`Accordion`,...R.accordion},{type:`carousel`,label:`Carousel`,...R.carousel},{type:`logo`,label:`Logo`,...R.logo},{type:`faq`,label:`FAQ`,...R.faq},{type:`gallery`,label:`Gallery`,...R.gallery}]},{section:`Controls`,items:[{type:`button`,label:`Button`,...R.button},{type:`input`,label:`Input`,...R.input},{type:`search`,label:`Search`,...R.search},{type:`form`,label:`Form`,...R.form},{type:`tabs`,label:`Tabs`,...R.tabs},{type:`dropdown`,label:`Dropdown`,...R.dropdown},{type:`toggle`,label:`Toggle`,...R.toggle},{type:`stepper`,label:`Stepper`,...R.stepper},{type:`rating`,label:`Rating`,...R.rating},{type:`fileUpload`,label:`File Upload`,...R.fileUpload},{type:`checkbox`,label:`Checkbox`,...R.checkbox},{type:`radio`,label:`Radio`,...R.radio},{type:`slider`,label:`Slider`,...R.slider},{type:`datePicker`,label:`Date Picker`,...R.datePicker}]},{section:`Elements`,items:[{type:`avatar`,label:`Avatar`,...R.avatar},{type:`badge`,label:`Badge`,...R.badge},{type:`tag`,label:`Tag`,...R.tag},{type:`breadcrumb`,label:`Breadcrumb`,...R.breadcrumb},{type:`pagination`,label:`Pagination`,...R.pagination},{type:`progress`,label:`Progress`,...R.progress},{type:`alert`,label:`Alert`,...R.alert},{type:`toast`,label:`Toast`,...R.toast},{type:`notification`,label:`Notification`,...R.notification},{type:`tooltip`,label:`Tooltip`,...R.tooltip},{type:`stat`,label:`Stat`,...R.stat},{type:`skeleton`,label:`Skeleton`,...R.skeleton},{type:`chip`,label:`Chip`,...R.chip},{type:`icon`,label:`Icon`,...R.icon},{type:`spinner`,label:`Spinner`,...R.spinner}]},{section:`Blocks`,items:[{type:`pricing`,label:`Pricing`,...R.pricing},{type:`testimonial`,label:`Testimonial`,...R.testimonial},{type:`cta`,label:`CTA`,...R.cta},{type:`productCard`,label:`Product Card`,...R.productCard},{type:`profile`,label:`Profile`,...R.profile},{type:`feature`,label:`Feature`,...R.feature},{type:`team`,label:`Team`,...R.team},{type:`login`,label:`Login`,...R.login},{type:`contact`,label:`Contact`,...R.contact}]}],pt={};for(let e of ft)for(let t of e.items)pt[t.type]=t;function z({w:e,h:t=3,strong:n}){return(0,o.jsx)(`div`,{style:{width:typeof e==`number`?`${e}px`:e,height:t,borderRadius:2,background:n?`var(--agd-bar-strong)`:`var(--agd-bar)`,flexShrink:0}})}function B({w:e,h:t,radius:n=3,style:r}){return(0,o.jsx)(`div`,{style:{width:typeof e==`number`?`${e}px`:e,height:typeof t==`number`?`${t}px`:t,borderRadius:n,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,flexShrink:0,...r}})}function mt({size:e}){return(0,o.jsx)(`div`,{style:{width:e,height:e,borderRadius:`50%`,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,flexShrink:0}})}function ht({width:e,height:t}){let n=Math.max(8,t*.2);return(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,height:`100%`,padding:`0 ${n}px`,gap:e*.02},children:[(0,o.jsx)(B,{w:Math.max(20,t*.5),h:Math.max(12,t*.4),radius:2}),(0,o.jsxs)(`div`,{style:{flex:1,display:`flex`,gap:e*.03,marginLeft:e*.04},children:[(0,o.jsx)(z,{w:e*.06}),(0,o.jsx)(z,{w:e*.07}),(0,o.jsx)(z,{w:e*.05}),(0,o.jsx)(z,{w:e*.06})]}),(0,o.jsx)(B,{w:e*.1,h:Math.min(28,t*.5),radius:4})]})}function gt({width:e,height:t,text:n}){return(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,height:`100%`,gap:t*.05},children:[n?(0,o.jsx)(`span`,{style:{fontSize:Math.min(20,t*.08),fontWeight:600,color:`var(--agd-text-3)`,textAlign:`center`,maxWidth:`80%`},children:n}):(0,o.jsx)(z,{w:e*.5,h:Math.max(6,t*.04),strong:!0}),(0,o.jsx)(z,{w:e*.6}),(0,o.jsx)(z,{w:e*.4}),(0,o.jsx)(B,{w:Math.min(140,e*.2),h:Math.min(36,t*.12),radius:6,style:{marginTop:t*.06}})]})}function _t({width:e,height:t}){let n=Math.max(3,Math.floor(t/36));return(0,o.jsxs)(`div`,{style:{padding:e*.08,display:`flex`,flexDirection:`column`,gap:t*.03},children:[(0,o.jsx)(z,{w:e*.6,h:4,strong:!0}),Array.from({length:n},(t,n)=>(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6},children:[(0,o.jsx)(B,{w:10,h:10,radius:2}),(0,o.jsx)(z,{w:e*(.4+n*17%30/100)})]},n))]})}function vt({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(e/160)));return(0,o.jsx)(`div`,{style:{display:`flex`,padding:`${t*.12}px ${e*.03}px`,gap:e*.05},children:Array.from({length:n},(e,t)=>(0,o.jsxs)(`div`,{style:{flex:1,display:`flex`,flexDirection:`column`,gap:4},children:[(0,o.jsx)(z,{w:`60%`,h:3,strong:!0}),(0,o.jsx)(z,{w:`80%`,h:2}),(0,o.jsx)(z,{w:`70%`,h:2}),(0,o.jsx)(z,{w:`60%`,h:2})]},t))})}function yt({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`},children:[(0,o.jsxs)(`div`,{style:{padding:`10px 12px`,borderBottom:`1px solid var(--agd-stroke)`,display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,o.jsx)(z,{w:e*.3,h:4,strong:!0}),(0,o.jsx)(`div`,{style:{width:14,height:14,border:`1px solid var(--agd-stroke)`,borderRadius:3}})]}),(0,o.jsxs)(`div`,{style:{flex:1,padding:12,display:`flex`,flexDirection:`column`,gap:6},children:[(0,o.jsx)(z,{w:`90%`}),(0,o.jsx)(z,{w:`70%`}),(0,o.jsx)(z,{w:`80%`})]}),(0,o.jsxs)(`div`,{style:{padding:`10px 12px`,borderTop:`1px solid var(--agd-stroke)`,display:`flex`,justifyContent:`flex-end`,gap:8},children:[(0,o.jsx)(B,{w:70,h:26,radius:4}),(0,o.jsx)(B,{w:70,h:26,radius:4,style:{background:`var(--agd-bar)`}})]})]})}function bt({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`},children:[(0,o.jsx)(`div`,{style:{height:`40%`,background:`var(--agd-fill)`,borderBottom:`1px dashed var(--agd-stroke)`}}),(0,o.jsxs)(`div`,{style:{flex:1,padding:10,display:`flex`,flexDirection:`column`,gap:5},children:[(0,o.jsx)(z,{w:`70%`,h:4,strong:!0}),(0,o.jsx)(z,{w:`95%`,h:2}),(0,o.jsx)(z,{w:`85%`,h:2}),(0,o.jsx)(z,{w:`50%`,h:2})]})]})}function xt({width:e,height:t,text:n}){if(n)return(0,o.jsx)(`div`,{style:{padding:4,fontSize:Math.min(14,t*.3),lineHeight:1.5,color:`var(--agd-text-3)`,wordBreak:`break-word`,overflow:`hidden`},children:n});let r=Math.max(2,Math.floor(t/18));return(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:6,padding:4},children:[(0,o.jsx)(z,{w:e*.6,h:5,strong:!0}),Array.from({length:r},(e,t)=>(0,o.jsx)(z,{w:`${70+t*13%25}%`,h:2},t))]})}function St({width:e,height:t}){return(0,o.jsx)(`div`,{style:{height:`100%`,position:`relative`},children:(0,o.jsxs)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 ${e} ${t}`,preserveAspectRatio:`none`,fill:`none`,children:[(0,o.jsx)(`line`,{x1:`0`,y1:`0`,x2:e,y2:t,stroke:`var(--agd-stroke)`,strokeWidth:`1`}),(0,o.jsx)(`line`,{x1:e,y1:`0`,x2:`0`,y2:t,stroke:`var(--agd-stroke)`,strokeWidth:`1`}),(0,o.jsx)(`circle`,{cx:e*.3,cy:t*.3,r:Math.min(e,t)*.08,fill:`var(--agd-fill)`,stroke:`var(--agd-stroke)`,strokeWidth:`0.8`})]})})}function Ct({width:e,height:t}){let n=Math.max(2,Math.min(5,Math.floor(e/100))),r=Math.max(2,Math.min(6,Math.floor(t/32)));return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`},children:[(0,o.jsx)(`div`,{style:{display:`flex`,borderBottom:`1px solid var(--agd-stroke)`,padding:`6px 0`},children:Array.from({length:n},(e,t)=>(0,o.jsx)(`div`,{style:{flex:1,padding:`0 8px`},children:(0,o.jsx)(z,{w:`70%`,h:3,strong:!0})},t))}),Array.from({length:r},(e,t)=>(0,o.jsx)(`div`,{style:{display:`flex`,borderBottom:`1px solid rgba(255,255,255,0.03)`,padding:`6px 0`},children:Array.from({length:n},(e,n)=>(0,o.jsx)(`div`,{style:{flex:1,padding:`0 8px`},children:(0,o.jsx)(z,{w:`${50+(t*7+n*13)%40}%`,h:2})},n))},t))]})}function wt({width:e,height:t}){let n=Math.max(2,Math.floor(t/28));return(0,o.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:4,padding:4},children:Array.from({length:n},(e,t)=>(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8,padding:`4px 0`},children:[(0,o.jsx)(mt,{size:8}),(0,o.jsx)(z,{w:`${55+t*17%35}%`,h:2})]},t))})}function Tt({width:e,height:t,text:n}){return(0,o.jsx)(`div`,{style:{height:`100%`,borderRadius:Math.min(8,t/3),border:`1px solid var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:n?(0,o.jsx)(`span`,{style:{fontSize:Math.min(13,t*.4),fontWeight:500,color:`var(--agd-text-3)`,letterSpacing:`-0.01em`},children:n}):(0,o.jsx)(z,{w:Math.max(20,e*.5),h:3,strong:!0})})}function Et({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:4,height:`100%`,justifyContent:`center`},children:[(0,o.jsx)(z,{w:Math.min(80,e*.3),h:2}),(0,o.jsx)(`div`,{style:{height:Math.min(36,t*.6),borderRadius:4,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,paddingLeft:8},children:(0,o.jsx)(z,{w:`40%`,h:2})})]})}function Dt({width:e,height:t}){let n=Math.max(2,Math.min(5,Math.floor(t/56)));return(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:t*.04,padding:8},children:[Array.from({length:n},(e,t)=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,o.jsx)(z,{w:60+t*17%30,h:2}),(0,o.jsx)(B,{w:`100%`,h:28,radius:4})]},t)),(0,o.jsx)(B,{w:Math.min(120,e*.35),h:30,radius:6,style:{marginTop:8,alignSelf:`flex-end`,background:`var(--agd-bar)`}})]})}function Ot({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(e/120)));return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`},children:[(0,o.jsx)(`div`,{style:{display:`flex`,gap:2,borderBottom:`1px solid var(--agd-stroke)`},children:Array.from({length:n},(e,t)=>(0,o.jsx)(`div`,{style:{padding:`8px 12px`,borderBottom:t===0?`2px solid var(--agd-bar-strong)`:`none`},children:(0,o.jsx)(z,{w:60,h:3,strong:t===0})},t))}),(0,o.jsxs)(`div`,{style:{flex:1,padding:12,display:`flex`,flexDirection:`column`,gap:6},children:[(0,o.jsx)(z,{w:`80%`,h:2}),(0,o.jsx)(z,{w:`65%`,h:2}),(0,o.jsx)(z,{w:`75%`,h:2})]})]})}function kt({width:e,height:t}){let n=Math.min(e,t)/2;return(0,o.jsxs)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 ${e} ${t}`,fill:`none`,children:[(0,o.jsx)(`circle`,{cx:e/2,cy:t/2,r:n-1,stroke:`var(--agd-stroke)`,fill:`var(--agd-fill)`,strokeWidth:`1.5`,strokeDasharray:`3 2`}),(0,o.jsx)(`circle`,{cx:e/2,cy:t*.38,r:n*.28,stroke:`var(--agd-stroke)`,fill:`var(--agd-fill)`,strokeWidth:`0.8`}),(0,o.jsx)(`path`,{d:`M${e/2-n*.55} ${t*.78} C${e/2-n*.55} ${t*.55} ${e/2+n*.55} ${t*.55} ${e/2+n*.55} ${t*.78}`,stroke:`var(--agd-stroke)`,fill:`var(--agd-fill)`,strokeWidth:`0.8`})]})}function At({width:e,height:t}){return(0,o.jsx)(`div`,{style:{height:`100%`,borderRadius:t/2,border:`1px solid var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,o.jsx)(z,{w:Math.max(16,e*.5),h:2,strong:!0})})}function jt({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,height:`100%`,gap:t*.08},children:[(0,o.jsx)(z,{w:e*.5,h:Math.max(5,t*.06),strong:!0}),(0,o.jsx)(z,{w:e*.35})]})}function Mt({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,height:`100%`,gap:t*.04,padding:e*.04},children:[(0,o.jsx)(z,{w:e*.3,h:4,strong:!0}),(0,o.jsx)(z,{w:e*.7}),(0,o.jsx)(z,{w:e*.5}),(0,o.jsxs)(`div`,{style:{flex:1,display:`flex`,gap:e*.03,marginTop:t*.06},children:[(0,o.jsx)(B,{w:`33%`,h:`100%`,radius:4}),(0,o.jsx)(B,{w:`33%`,h:`100%`,radius:4}),(0,o.jsx)(B,{w:`33%`,h:`100%`,radius:4})]})]})}function Nt({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(e/140))),r=Math.max(1,Math.min(3,Math.floor(t/120)));return(0,o.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(${n}, 1fr)`,gridTemplateRows:`repeat(${r}, 1fr)`,gap:6,height:`100%`},children:Array.from({length:n*r},(e,t)=>(0,o.jsx)(B,{w:`100%`,h:`100%`,radius:4},t))})}function Pt({width:e,height:t}){let n=Math.max(2,Math.floor((t-32)/28));return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`},children:[(0,o.jsx)(`div`,{style:{padding:`6px 8px`,borderBottom:`1px solid var(--agd-stroke)`},children:(0,o.jsx)(z,{w:e*.5,h:3,strong:!0})}),(0,o.jsx)(`div`,{style:{flex:1,padding:4,display:`flex`,flexDirection:`column`,gap:2},children:Array.from({length:n},(e,t)=>(0,o.jsx)(`div`,{style:{padding:`4px 6px`,borderRadius:3,background:t===0?`var(--agd-fill)`:`transparent`},children:(0,o.jsx)(z,{w:`${50+t*17%35}%`,h:2,strong:t===0})},t))})]})}function V({width:e,height:t}){let n=Math.min(e,t)/2;return(0,o.jsxs)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 ${e} ${t}`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:`1`,width:e-2,height:t-2,rx:n,stroke:`var(--agd-stroke)`,strokeWidth:`1`}),(0,o.jsx)(`circle`,{cx:e-n,cy:t/2,r:n*.7,fill:`var(--agd-bar)`})]})}function Ft({width:e,height:t}){let n=Math.min(t/2,20);return(0,o.jsxs)(`div`,{style:{height:`100%`,borderRadius:n,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,padding:`0 ${n*.6}px`,gap:6},children:[(0,o.jsx)(mt,{size:Math.min(14,t*.4)}),(0,o.jsx)(z,{w:`50%`,h:2})]})}function It({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,borderRadius:8,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,padding:`0 10px`,gap:8},children:[(0,o.jsx)(mt,{size:Math.min(20,t*.5)}),(0,o.jsxs)(`div`,{style:{flex:1,display:`flex`,flexDirection:`column`,gap:3},children:[(0,o.jsx)(z,{w:`60%`,h:3,strong:!0}),(0,o.jsx)(z,{w:`80%`,h:2})]}),(0,o.jsx)(`div`,{style:{width:14,height:14,border:`1px solid var(--agd-stroke)`,borderRadius:3,flexShrink:0}})]})}function Lt({width:e,height:t}){return(0,o.jsxs)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 ${e} ${t}`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`0`,y:`0`,width:e,height:t,rx:t/2,stroke:`var(--agd-stroke)`,strokeWidth:`0.8`}),(0,o.jsx)(`rect`,{x:`1`,y:`1`,width:e*.65,height:t-2,rx:(t-2)/2,fill:`var(--agd-bar)`})]})}function Rt({width:e,height:t}){let n=Math.max(3,Math.min(7,Math.floor(e/50))),r=e/(n*2);return(0,o.jsx)(`div`,{style:{height:`100%`,display:`flex`,alignItems:`flex-end`,justifyContent:`space-around`,padding:`0 4px`,borderBottom:`1px solid var(--agd-stroke)`},children:Array.from({length:n},(e,t)=>{let n=30+(t*37+17)%55;return(0,o.jsx)(B,{w:r,h:`${n}%`,radius:2},t)})})}function zt({width:e,height:t}){let n=Math.min(e,t)*.12;return(0,o.jsxs)(`div`,{style:{height:`100%`,position:`relative`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:[(0,o.jsx)(B,{w:`100%`,h:`100%`,radius:4}),(0,o.jsx)(`div`,{style:{position:`absolute`,width:n*2,height:n*2,borderRadius:`50%`,border:`1.5px solid var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,o.jsx)(`div`,{style:{width:0,height:0,borderLeft:`${n*.6}px solid var(--agd-bar-strong)`,borderTop:`${n*.4}px solid transparent`,borderBottom:`${n*.4}px solid transparent`,marginLeft:n*.15}})})]})}function Bt({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`,alignItems:`center`},children:[(0,o.jsx)(`div`,{style:{flex:1,width:`100%`,borderRadius:6,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,o.jsx)(z,{w:`60%`,h:2})}),(0,o.jsx)(`div`,{style:{width:8,height:8,background:`var(--agd-fill)`,border:`1px dashed var(--agd-stroke)`,borderTop:`none`,borderLeft:`none`,transform:`rotate(45deg)`,marginTop:-5}})]})}function Vt({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(e/80)));return(0,o.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,height:`100%`,gap:4},children:Array.from({length:n},(e,t)=>(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:4},children:[t>0&&(0,o.jsx)(`span`,{style:{color:`var(--agd-stroke)`,fontSize:10},children:`/`}),(0,o.jsx)(z,{w:40+t*13%20,h:2,strong:t===n-1})]},t))})}function Ht({width:e,height:t}){let n=Math.max(3,Math.min(5,Math.floor(e/40))),r=Math.min(28,t*.8);return(0,o.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,height:`100%`,gap:4},children:Array.from({length:n},(e,t)=>(0,o.jsx)(B,{w:r,h:r,radius:4,style:t===1?{background:`var(--agd-bar)`}:void 0},t))})}function Ut({width:e}){return(0,o.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,height:`100%`},children:(0,o.jsx)(`div`,{style:{width:`100%`,height:1,background:`var(--agd-stroke)`}})})}function Wt({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(t/40)));return(0,o.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,height:`100%`},children:Array.from({length:n},(e,t)=>(0,o.jsxs)(`div`,{style:{borderBottom:`1px solid var(--agd-stroke)`,padding:`8px 6px`,display:`flex`,alignItems:`center`,justifyContent:`space-between`,flex:t===0?2:1},children:[(0,o.jsx)(z,{w:`${40+t*17%25}%`,h:3,strong:!0}),(0,o.jsx)(`span`,{style:{fontSize:8,color:`var(--agd-stroke)`},children:t===0?`▼`:`▶`})]},t))})}function Gt({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`,gap:6},children:[(0,o.jsxs)(`div`,{style:{flex:1,display:`flex`,gap:6,alignItems:`center`},children:[(0,o.jsx)(`span`,{style:{fontSize:12,color:`var(--agd-stroke)`},children:`‹`}),(0,o.jsx)(B,{w:`100%`,h:`100%`,radius:4}),(0,o.jsx)(`span`,{style:{fontSize:12,color:`var(--agd-stroke)`},children:`›`})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:4},children:[(0,o.jsx)(mt,{size:5}),(0,o.jsx)(mt,{size:5}),(0,o.jsx)(mt,{size:5})]})]})}function Kt({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`,alignItems:`center`,padding:10,gap:t*.04},children:[(0,o.jsx)(z,{w:e*.4,h:3,strong:!0}),(0,o.jsx)(z,{w:e*.3,h:6,strong:!0}),(0,o.jsx)(`div`,{style:{flex:1,display:`flex`,flexDirection:`column`,gap:4,width:`100%`,padding:`8px 0`},children:Array.from({length:4},(e,t)=>(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:4},children:[(0,o.jsx)(mt,{size:5}),(0,o.jsx)(z,{w:`${50+t*17%35}%`,h:2})]},t))}),(0,o.jsx)(B,{w:e*.7,h:Math.min(32,t*.1),radius:6,style:{background:`var(--agd-bar)`}})]})}function qt({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`,padding:10,gap:8},children:[(0,o.jsx)(`span`,{style:{fontSize:18,lineHeight:1,color:`var(--agd-stroke)`,fontFamily:`serif`},children:`“`}),(0,o.jsxs)(`div`,{style:{flex:1,display:`flex`,flexDirection:`column`,gap:4},children:[(0,o.jsx)(z,{w:`90%`,h:2}),(0,o.jsx)(z,{w:`75%`,h:2}),(0,o.jsx)(z,{w:`60%`,h:2})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6},children:[(0,o.jsx)(mt,{size:20}),(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:2},children:[(0,o.jsx)(z,{w:60,h:3,strong:!0}),(0,o.jsx)(z,{w:40,h:2})]})]})]})}function H({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,height:`100%`,gap:t*.08},children:[(0,o.jsx)(z,{w:e*.5,h:Math.max(4,t*.05),strong:!0}),(0,o.jsx)(z,{w:e*.35}),(0,o.jsx)(B,{w:Math.min(140,e*.25),h:Math.min(32,t*.15),radius:6,style:{marginTop:t*.04,background:`var(--agd-bar)`}})]})}function Jt({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,borderRadius:6,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,padding:`0 10px`,gap:8},children:[(0,o.jsx)(`div`,{style:{width:16,height:16,borderRadius:`50%`,border:`1.5px solid var(--agd-bar-strong)`,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0},children:(0,o.jsx)(`div`,{style:{width:2,height:6,background:`var(--agd-bar-strong)`,borderRadius:1}})}),(0,o.jsxs)(`div`,{style:{flex:1,display:`flex`,flexDirection:`column`,gap:3},children:[(0,o.jsx)(z,{w:`40%`,h:3,strong:!0}),(0,o.jsx)(z,{w:`70%`,h:2})]})]})}function Yt({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:8,padding:`0 12px`},children:[(0,o.jsx)(z,{w:e*.4,h:3,strong:!0}),(0,o.jsx)(B,{w:60,h:Math.min(24,t*.6),radius:4})]})}function Xt({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,gap:t*.06},children:[(0,o.jsx)(z,{w:e*.5,h:2}),(0,o.jsx)(z,{w:e*.4,h:Math.max(8,t*.18),strong:!0}),(0,o.jsx)(z,{w:e*.3,h:2})]})}function Zt({width:e,height:t}){let n=Math.max(3,Math.min(5,Math.floor(e/100))),r=Math.min(12,t*.35);return(0,o.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,height:`100%`,padding:`0 8px`},children:Array.from({length:n},(e,t)=>(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:0,flex:1},children:[(0,o.jsx)(`div`,{style:{width:r,height:r,borderRadius:`50%`,border:`1.5px solid var(--agd-stroke)`,background:t===0?`var(--agd-bar)`:`transparent`,flexShrink:0}}),t<n-1&&(0,o.jsx)(`div`,{style:{flex:1,height:1,background:`var(--agd-stroke)`,margin:`0 4px`}})]},t))})}function Qt({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,borderRadius:4,border:`1px solid var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:4,padding:`0 6px`},children:[(0,o.jsx)(z,{w:Math.max(16,e*.5),h:2,strong:!0}),(0,o.jsx)(`div`,{style:{width:8,height:8,borderRadius:`50%`,border:`1px solid var(--agd-stroke)`,flexShrink:0}})]})}function $t({width:e,height:t}){let n=Math.min(t*.7,e/7.5);return(0,o.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,height:`100%`,gap:n*.2},children:Array.from({length:5},(e,t)=>(0,o.jsx)(`svg`,{width:n,height:n,viewBox:`0 0 16 16`,fill:`none`,children:(0,o.jsx)(`path`,{d:`M8 1.5l2 4 4.5.7-3.25 3.1.75 4.5L8 11.4l-4 2.4.75-4.5L1.5 6.2 6 5.5z`,stroke:`var(--agd-stroke)`,strokeWidth:`0.8`,fill:t<3?`var(--agd-bar)`:`none`})},t))})}function en({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,position:`relative`,borderRadius:4,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,overflow:`hidden`},children:[(0,o.jsxs)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 ${e} ${t}`,fill:`none`,style:{position:`absolute`,inset:0},children:[(0,o.jsx)(`line`,{x1:0,y1:t*.3,x2:e,y2:t*.7,stroke:`var(--agd-stroke)`,strokeWidth:`0.5`,opacity:`.2`}),(0,o.jsx)(`line`,{x1:0,y1:t*.6,x2:e,y2:t*.2,stroke:`var(--agd-stroke)`,strokeWidth:`0.5`,opacity:`.15`}),(0,o.jsx)(`line`,{x1:e*.4,y1:0,x2:e*.6,y2:t,stroke:`var(--agd-stroke)`,strokeWidth:`0.5`,opacity:`.15`})]}),(0,o.jsx)(`div`,{style:{position:`absolute`,left:`50%`,top:`40%`,transform:`translate(-50%, -100%)`},children:(0,o.jsxs)(`svg`,{width:`16`,height:`22`,viewBox:`0 0 16 22`,fill:`none`,children:[(0,o.jsx)(`path`,{d:`M8 0C3.6 0 0 3.6 0 8c0 6 8 14 8 14s8-8 8-14c0-4.4-3.6-8-8-8z`,fill:`var(--agd-bar)`,opacity:`.4`}),(0,o.jsx)(`circle`,{cx:`8`,cy:`8`,r:`3`,fill:`var(--agd-fill)`})]})})]})}function tn({width:e,height:t}){let n=Math.max(3,Math.min(5,Math.floor(t/60)));return(0,o.jsxs)(`div`,{style:{display:`flex`,height:`100%`,padding:`8px 0`},children:[(0,o.jsx)(`div`,{style:{width:16,display:`flex`,flexDirection:`column`,alignItems:`center`},children:Array.from({length:n},(e,t)=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,flex:1},children:[(0,o.jsx)(mt,{size:8}),t<n-1&&(0,o.jsx)(`div`,{style:{flex:1,width:1,background:`var(--agd-stroke)`}})]},t))}),(0,o.jsx)(`div`,{style:{flex:1,display:`flex`,flexDirection:`column`,justifyContent:`space-around`,paddingLeft:8},children:Array.from({length:n},(e,t)=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:3},children:[(0,o.jsx)(z,{w:`${35+t*13%25}%`,h:3,strong:!0}),(0,o.jsx)(z,{w:`${50+t*17%30}%`,h:2})]},t))})]})}function nn({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,borderRadius:8,border:`2px dashed var(--agd-stroke)`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,gap:t*.06},children:[(0,o.jsxs)(`svg`,{width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,children:[(0,o.jsx)(`path`,{d:`M12 16V4m0 0l-4 4m4-4l4 4`,stroke:`var(--agd-stroke)`,strokeWidth:`1.5`}),(0,o.jsx)(`path`,{d:`M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2`,stroke:`var(--agd-stroke)`,strokeWidth:`1.5`})]}),(0,o.jsx)(z,{w:e*.4,h:2}),(0,o.jsx)(z,{w:e*.25,h:2})]})}function U({width:e,height:t}){let n=Math.max(3,Math.min(8,Math.floor(t/20)));return(0,o.jsxs)(`div`,{style:{height:`100%`,borderRadius:6,background:`var(--agd-fill)`,border:`1px solid var(--agd-stroke)`,padding:8,display:`flex`,flexDirection:`column`,gap:4},children:[(0,o.jsxs)(`div`,{style:{display:`flex`,gap:3,marginBottom:4},children:[(0,o.jsx)(mt,{size:6}),(0,o.jsx)(mt,{size:6}),(0,o.jsx)(mt,{size:6})]}),Array.from({length:n},(e,t)=>(0,o.jsx)(`div`,{style:{display:`flex`,gap:6,paddingLeft:t>0&&t<n-1?12:0},children:(0,o.jsx)(z,{w:`${25+t*23%50}%`,h:2,strong:t===0})},t))]})}function rn({width:e,height:t}){let n=Math.min((e-16)/7,(t-40)/6);return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`},children:[(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,padding:`6px 8px`},children:[(0,o.jsx)(`span`,{style:{fontSize:8,color:`var(--agd-stroke)`},children:`‹`}),(0,o.jsx)(z,{w:e*.3,h:3,strong:!0}),(0,o.jsx)(`span`,{style:{fontSize:8,color:`var(--agd-stroke)`},children:`›`})]}),(0,o.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(7, 1fr)`,gap:2,padding:`0 4px`,flex:1},children:[Array.from({length:7},(e,t)=>(0,o.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,height:n*.6},children:(0,o.jsx)(z,{w:n*.5,h:2})},`h${t}`)),Array.from({length:35},(e,t)=>(0,o.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,height:n},children:(0,o.jsx)(`div`,{style:{width:n*.6,height:n*.6,borderRadius:`50%`,background:t===12?`var(--agd-bar)`:`transparent`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,o.jsx)(`div`,{style:{width:2,height:2,borderRadius:1,background:`var(--agd-bar-strong)`,opacity:t===12?1:.3}})})},t))]})]})}function an({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,borderRadius:8,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,padding:`0 10px`,gap:8},children:[(0,o.jsx)(mt,{size:Math.min(32,t*.55)}),(0,o.jsxs)(`div`,{style:{flex:1,display:`flex`,flexDirection:`column`,gap:3},children:[(0,o.jsx)(z,{w:`50%`,h:3,strong:!0}),(0,o.jsx)(z,{w:`75%`,h:2})]}),(0,o.jsx)(z,{w:30,h:2})]})}function on({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`},children:[(0,o.jsx)(`div`,{style:{height:`50%`,background:`var(--agd-fill)`,borderBottom:`1px dashed var(--agd-stroke)`}}),(0,o.jsxs)(`div`,{style:{flex:1,padding:10,display:`flex`,flexDirection:`column`,gap:5},children:[(0,o.jsx)(z,{w:`65%`,h:4,strong:!0}),(0,o.jsx)(z,{w:`40%`,h:3}),(0,o.jsx)(`div`,{style:{flex:1}}),(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,o.jsx)(z,{w:`30%`,h:5,strong:!0}),(0,o.jsx)(B,{w:Math.min(70,e*.3),h:26,radius:4,style:{background:`var(--agd-bar)`}})]})]})]})}function W({width:e,height:t}){let n=Math.min(48,t*.3);return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,gap:t*.06},children:[(0,o.jsx)(mt,{size:n}),(0,o.jsx)(z,{w:e*.45,h:4,strong:!0}),(0,o.jsx)(z,{w:e*.3,h:2}),(0,o.jsxs)(`div`,{style:{display:`flex`,gap:e*.08,marginTop:t*.04},children:[(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:2},children:[(0,o.jsx)(z,{w:20,h:3,strong:!0}),(0,o.jsx)(z,{w:28,h:2})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:2},children:[(0,o.jsx)(z,{w:20,h:3,strong:!0}),(0,o.jsx)(z,{w:28,h:2})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:2},children:[(0,o.jsx)(z,{w:20,h:3,strong:!0}),(0,o.jsx)(z,{w:28,h:2})]})]})]})}function sn({width:e,height:t}){let n=Math.max(e*.6,80),r=Math.max(3,Math.floor(t/40));return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`},children:[(0,o.jsx)(`div`,{style:{width:e-n,background:`var(--agd-fill)`,opacity:.3}}),(0,o.jsxs)(`div`,{style:{flex:1,borderLeft:`1px solid var(--agd-stroke)`,display:`flex`,flexDirection:`column`,padding:e*.04},children:[(0,o.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:t*.06},children:[(0,o.jsx)(z,{w:n*.4,h:4,strong:!0}),(0,o.jsx)(`div`,{style:{width:12,height:12,border:`1px solid var(--agd-stroke)`,borderRadius:3}})]}),Array.from({length:r},(e,t)=>(0,o.jsx)(`div`,{style:{padding:`6px 0`},children:(0,o.jsx)(z,{w:`${50+t*17%35}%`,h:2,strong:t===0})},t))]})]})}function cn({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`,alignItems:`center`},children:[(0,o.jsxs)(`div`,{style:{flex:1,width:`100%`,borderRadius:8,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,padding:10,display:`flex`,flexDirection:`column`,gap:5},children:[(0,o.jsx)(z,{w:`70%`,h:3,strong:!0}),(0,o.jsx)(z,{w:`90%`,h:2}),(0,o.jsx)(z,{w:`60%`,h:2})]}),(0,o.jsx)(`div`,{style:{width:10,height:10,background:`var(--agd-fill)`,border:`1px dashed var(--agd-stroke)`,borderTop:`none`,borderLeft:`none`,transform:`rotate(45deg)`,marginTop:-6}})]})}function ln({width:e,height:t}){let n=Math.min(t*.7,e*.3);return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,alignItems:`center`,gap:e*.08},children:[(0,o.jsx)(B,{w:n,h:n,radius:n*.25}),(0,o.jsx)(z,{w:e*.45,h:Math.max(4,t*.2),strong:!0})]})}function un({width:e,height:t}){let n=Math.max(2,Math.min(5,Math.floor(t/56)));return(0,o.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,height:`100%`},children:Array.from({length:n},(t,n)=>(0,o.jsxs)(`div`,{style:{borderBottom:`1px solid var(--agd-stroke)`,padding:`8px 6px`,display:`flex`,alignItems:`center`,justifyContent:`space-between`,flex:n===0?2:1},children:[(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6},children:[(0,o.jsx)(`span`,{style:{fontSize:9,fontWeight:700,color:`var(--agd-stroke)`},children:`Q`}),(0,o.jsx)(z,{w:e*(.3+n*13%25/100),h:3,strong:!0})]}),(0,o.jsx)(`span`,{style:{fontSize:8,color:`var(--agd-stroke)`},children:n===0?`▼`:`▶`})]},n))})}function G({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(e/120))),r=Math.max(1,Math.min(3,Math.floor(t/120)));return(0,o.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(${n}, 1fr)`,gridTemplateRows:`repeat(${r}, 1fr)`,gap:4,height:`100%`},children:Array.from({length:n*r},(e,t)=>(0,o.jsx)(`div`,{style:{borderRadius:4,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,position:`relative`,overflow:`hidden`},children:(0,o.jsxs)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 100 100`,preserveAspectRatio:`none`,fill:`none`,children:[(0,o.jsx)(`line`,{x1:`0`,y1:`0`,x2:`100`,y2:`100`,stroke:`var(--agd-stroke)`,strokeWidth:`0.5`}),(0,o.jsx)(`line`,{x1:`100`,y1:`0`,x2:`0`,y2:`100`,stroke:`var(--agd-stroke)`,strokeWidth:`0.5`})]})},t))})}function dn({width:e,height:t}){let n=Math.min(e,t);return(0,o.jsxs)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 ${e} ${t}`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:(t-n+2)/2,width:n-2,height:n-2,rx:n*.15,stroke:`var(--agd-stroke)`,strokeWidth:`1.5`}),(0,o.jsx)(`path`,{d:`M${n*.25} ${t/2}l${n*.2} ${n*.2} ${n*.3}-${n*.35}`,stroke:`var(--agd-bar)`,strokeWidth:`1.5`,fill:`none`,strokeLinecap:`round`,strokeLinejoin:`round`})]})}function fn({width:e,height:t}){let n=Math.min(e,t)/2-1;return(0,o.jsxs)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 ${e} ${t}`,fill:`none`,children:[(0,o.jsx)(`circle`,{cx:e/2,cy:t/2,r:n,stroke:`var(--agd-stroke)`,strokeWidth:`1.5`}),(0,o.jsx)(`circle`,{cx:e/2,cy:t/2,r:n*.45,fill:`var(--agd-bar)`})]})}function pn({width:e,height:t}){let n=Math.max(2,t*.12),r=Math.min(t*.35,10),i=e*.55;return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,alignItems:`center`,position:`relative`},children:[(0,o.jsx)(`div`,{style:{width:`100%`,height:n,borderRadius:n/2,background:`var(--agd-fill)`,border:`1px solid var(--agd-stroke)`,position:`relative`},children:(0,o.jsx)(`div`,{style:{width:i,height:`100%`,borderRadius:n/2,background:`var(--agd-bar)`}})}),(0,o.jsx)(`div`,{style:{position:`absolute`,left:i-r,width:r*2,height:r*2,borderRadius:`50%`,border:`1.5px solid var(--agd-stroke)`,background:`var(--agd-fill)`}})]})}function mn({width:e,height:t}){let n=Math.min(36,t*.15),r=Math.min((e-16)/7,(t-n-40)/5);return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`,gap:4},children:[(0,o.jsxs)(`div`,{style:{height:n,borderRadius:4,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,padding:`0 8px`,justifyContent:`space-between`},children:[(0,o.jsx)(z,{w:`40%`,h:2}),(0,o.jsxs)(`svg`,{width:`12`,height:`12`,viewBox:`0 0 16 16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`3`,width:`12`,height:`11`,rx:`1`,stroke:`var(--agd-stroke)`,strokeWidth:`1`}),(0,o.jsx)(`line`,{x1:`2`,y1:`6`,x2:`14`,y2:`6`,stroke:`var(--agd-stroke)`,strokeWidth:`0.5`})]})]}),(0,o.jsxs)(`div`,{style:{flex:1,borderRadius:6,border:`1px dashed var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,flexDirection:`column`},children:[(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,padding:`4px 6px`},children:[(0,o.jsx)(`span`,{style:{fontSize:7,color:`var(--agd-stroke)`},children:`‹`}),(0,o.jsx)(z,{w:e*.25,h:2,strong:!0}),(0,o.jsx)(`span`,{style:{fontSize:7,color:`var(--agd-stroke)`},children:`›`})]}),(0,o.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(7, 1fr)`,gap:1,padding:`0 4px`,flex:1},children:Array.from({length:28},(e,t)=>(0,o.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`center`,height:r},children:(0,o.jsx)(`div`,{style:{width:r*.5,height:r*.5,borderRadius:`50%`,background:t===10?`var(--agd-bar)`:`transparent`},children:(0,o.jsx)(`div`,{style:{width:`100%`,height:`100%`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,o.jsx)(`div`,{style:{width:1.5,height:1.5,borderRadius:1,background:`var(--agd-bar-strong)`,opacity:t===10?1:.25}})})})},t))})]})]})}function hn({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`,gap:t*.08,padding:4},children:[(0,o.jsx)(`div`,{style:{width:`100%`,height:t*.2,borderRadius:4,background:`var(--agd-fill)`}}),(0,o.jsx)(`div`,{style:{width:`70%`,height:Math.max(6,t*.1),borderRadius:3,background:`var(--agd-fill)`}}),(0,o.jsx)(`div`,{style:{width:`90%`,height:Math.max(4,t*.06),borderRadius:3,background:`var(--agd-fill)`}}),(0,o.jsx)(`div`,{style:{width:`50%`,height:Math.max(4,t*.06),borderRadius:3,background:`var(--agd-fill)`}})]})}function gn({width:e,height:t}){return(0,o.jsx)(`div`,{style:{height:`100%`,display:`flex`,alignItems:`center`,gap:6},children:(0,o.jsxs)(`div`,{style:{height:`100%`,flex:1,borderRadius:t/2,border:`1px solid var(--agd-stroke)`,background:`var(--agd-fill)`,display:`flex`,alignItems:`center`,padding:`0 ${t*.3}px`,gap:4},children:[(0,o.jsx)(z,{w:`60%`,h:2,strong:!0}),(0,o.jsx)(`div`,{style:{width:Math.max(6,t*.3),height:Math.max(6,t*.3),borderRadius:`50%`,border:`1px solid var(--agd-stroke)`,flexShrink:0,marginLeft:`auto`}})]})})}function _n({width:e,height:t}){let n=Math.min(e,t);return(0,o.jsx)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 ${e} ${t}`,fill:`none`,children:(0,o.jsx)(`path`,{d:`M${e/2} ${(t-n)/2+n*.1}l${n*.12} ${n*.25} ${n*.28} ${n*.04}-${n*.2} ${n*.2} ${n*.05} ${n*.28}-${n*.25}-${n*.12}-${n*.25} ${n*.12} ${n*.05}-${n*.28}-${n*.2}-${n*.2} ${n*.28}-${n*.04}z`,stroke:`var(--agd-stroke)`,strokeWidth:`1`,fill:`var(--agd-fill)`})})}function vn({width:e,height:t}){let n=Math.min(e,t)/2-2;return(0,o.jsxs)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 ${e} ${t}`,fill:`none`,children:[(0,o.jsx)(`circle`,{cx:e/2,cy:t/2,r:n,stroke:`var(--agd-stroke)`,strokeWidth:`1.5`,opacity:`.2`}),(0,o.jsx)(`path`,{d:`M${e/2} ${t/2-n}a${n} ${n} 0 0 1 ${n} ${n}`,stroke:`var(--agd-bar-strong)`,strokeWidth:`1.5`,strokeLinecap:`round`})]})}function yn({width:e,height:t}){let n=Math.min(36,t*.25,e*.12),r=Math.max(1,Math.min(3,Math.floor(t/80)));return(0,o.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,height:`100%`,justifyContent:`space-around`,padding:8},children:Array.from({length:r},(t,r)=>(0,o.jsxs)(`div`,{style:{display:`flex`,gap:e*.04,alignItems:`flex-start`},children:[(0,o.jsx)(B,{w:n,h:n,radius:n*.25}),(0,o.jsxs)(`div`,{style:{flex:1,display:`flex`,flexDirection:`column`,gap:4},children:[(0,o.jsx)(z,{w:`${40+r*13%20}%`,h:3,strong:!0}),(0,o.jsx)(z,{w:`${60+r*17%25}%`,h:2})]})]},r))})}function bn({width:e,height:t}){let n=Math.max(2,Math.min(4,Math.floor(e/120))),r=Math.min(36,t*.25);return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`,alignItems:`center`,gap:t*.06,padding:t*.06},children:[(0,o.jsx)(z,{w:e*.3,h:4,strong:!0}),(0,o.jsx)(`div`,{style:{display:`flex`,gap:e*.06,justifyContent:`center`,flex:1,alignItems:`center`},children:Array.from({length:n},(t,n)=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:6},children:[(0,o.jsx)(mt,{size:r}),(0,o.jsx)(z,{w:e*.12,h:3,strong:!0}),(0,o.jsx)(z,{w:e*.08,h:2})]},n))})]})}function xn({width:e,height:t}){let n=Math.max(2,Math.min(3,Math.floor(t/80)));return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`,alignItems:`center`,padding:e*.06,gap:t*.04},children:[(0,o.jsx)(z,{w:e*.5,h:Math.max(5,t*.04),strong:!0}),(0,o.jsx)(z,{w:e*.35,h:2}),(0,o.jsx)(`div`,{style:{width:`100%`,display:`flex`,flexDirection:`column`,gap:t*.03,marginTop:t*.04},children:Array.from({length:n},(n,r)=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:3},children:[(0,o.jsx)(z,{w:Math.min(60,e*.2),h:2}),(0,o.jsx)(B,{w:`100%`,h:Math.min(32,t*.1),radius:4})]},r))}),(0,o.jsx)(B,{w:`100%`,h:Math.min(36,t*.12),radius:6,style:{marginTop:t*.03,background:`var(--agd-bar)`}}),(0,o.jsx)(z,{w:e*.4,h:2})]})}function K({width:e,height:t}){return(0,o.jsxs)(`div`,{style:{height:`100%`,display:`flex`,flexDirection:`column`,padding:e*.04,gap:t*.03},children:[(0,o.jsx)(z,{w:e*.4,h:4,strong:!0}),(0,o.jsx)(z,{w:e*.6,h:2}),(0,o.jsxs)(`div`,{style:{display:`flex`,gap:6,marginTop:t*.03},children:[(0,o.jsxs)(`div`,{style:{flex:1,display:`flex`,flexDirection:`column`,gap:3},children:[(0,o.jsx)(z,{w:50,h:2}),(0,o.jsx)(B,{w:`100%`,h:Math.min(28,t*.1),radius:4})]}),(0,o.jsxs)(`div`,{style:{flex:1,display:`flex`,flexDirection:`column`,gap:3},children:[(0,o.jsx)(z,{w:40,h:2}),(0,o.jsx)(B,{w:`100%`,h:Math.min(28,t*.1),radius:4})]})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:3},children:[(0,o.jsx)(z,{w:50,h:2}),(0,o.jsx)(B,{w:`100%`,h:Math.min(28,t*.1),radius:4})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:3,flex:1},children:[(0,o.jsx)(z,{w:60,h:2}),(0,o.jsx)(B,{w:`100%`,h:`100%`,radius:4})]}),(0,o.jsx)(B,{w:Math.min(120,e*.3),h:Math.min(30,t*.1),radius:6,style:{alignSelf:`flex-end`,background:`var(--agd-bar)`}})]})}var Sn={navigation:ht,hero:gt,sidebar:_t,footer:vt,modal:yt,card:bt,text:xt,image:St,table:Ct,list:wt,button:Tt,input:Et,form:Dt,tabs:Ot,avatar:kt,badge:At,header:jt,section:Mt,grid:Nt,dropdown:Pt,toggle:V,search:Ft,toast:It,progress:Lt,chart:Rt,video:zt,tooltip:Bt,breadcrumb:Vt,pagination:Ht,divider:Ut,accordion:Wt,carousel:Gt,pricing:Kt,testimonial:qt,cta:H,alert:Jt,banner:Yt,stat:Xt,stepper:Zt,tag:Qt,rating:$t,map:en,timeline:tn,fileUpload:nn,codeBlock:U,calendar:rn,notification:an,productCard:on,profile:W,drawer:sn,popover:cn,logo:ln,faq:un,gallery:G,checkbox:dn,radio:fn,slider:pn,datePicker:mn,skeleton:hn,chip:gn,icon:_n,spinner:vn,feature:yn,team:bn,login:xn,contact:K};function Cn({type:e,width:t,height:n,text:r}){let i=Sn[e];return i?(0,o.jsx)(`div`,{style:{width:`100%`,height:`100%`,padding:8,position:`relative`,pointerEvents:`none`},children:(0,o.jsx)(i,{width:t,height:n,text:r})}):(0,o.jsx)(`div`,{style:{width:`100%`,height:`100%`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,o.jsx)(`span`,{style:{fontSize:10,fontWeight:600,color:`var(--agd-text-3)`,textTransform:`uppercase`,letterSpacing:`0.06em`,opacity:.5},children:e})})}var wn=`.styles-module__overlay___aWh-q svg[fill=none],
.styles-module__rearrangeOverlay___-3R3t svg[fill=none] {
  fill: none !important;
}
.styles-module__overlay___aWh-q svg[fill=none] :not([fill]),
.styles-module__rearrangeOverlay___-3R3t svg[fill=none] :not([fill]) {
  fill: none !important;
}

.styles-module__overlayExiting___iEmYr {
  opacity: 0 !important;
  transition: opacity 0.25s ease !important;
  pointer-events: none !important;
}

.styles-module__overlay___aWh-q {
  position: fixed;
  inset: 0;
  z-index: 99995;
  pointer-events: auto;
  cursor: default;
  animation: styles-module__overlayFadeIn___aECVy 0.15s ease;
  --agd-stroke: rgba(59, 130, 246, 0.35);
  --agd-fill: rgba(59, 130, 246, 0.06);
  --agd-bar: rgba(59, 130, 246, 0.18);
  --agd-bar-strong: rgba(59, 130, 246, 0.28);
  --agd-text-3: rgba(255, 255, 255, 0.6);
  --agd-surface: #fff;
}
.styles-module__overlay___aWh-q.styles-module__light___ORIft {
  --agd-surface: #fff;
}
.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) {
  --agd-surface: #141414;
}
.styles-module__overlay___aWh-q.styles-module__wireframe___itvQU {
  --agd-stroke: rgba(249, 115, 22, 0.35);
  --agd-fill: rgba(249, 115, 22, 0.06);
  --agd-bar: rgba(249, 115, 22, 0.18);
  --agd-bar-strong: rgba(249, 115, 22, 0.28);
}
.styles-module__overlay___aWh-q.styles-module__placing___45yD8 {
  cursor: crosshair;
}
.styles-module__overlay___aWh-q.styles-module__passthrough___xaFeE {
  pointer-events: none;
}

.styles-module__blankCanvas___t2Eue {
  position: fixed;
  inset: 0;
  z-index: 99994;
  background: #fff;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}
.styles-module__blankCanvas___t2Eue.styles-module__visible___OKKqX {
  opacity: var(--canvas-opacity, 1);
  pointer-events: auto;
}
.styles-module__blankCanvas___t2Eue::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: 12px 12px;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.styles-module__blankCanvas___t2Eue.styles-module__gridActive___OZ-cf::after {
  opacity: 1;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.22) 1px, transparent 1px);
}

.styles-module__paletteHeader___-Q5gQ {
  padding: 0 1rem 0.375rem;
}

.styles-module__paletteHeaderTitle___oHqZC {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  letter-spacing: -0.0094em;
}
.styles-module__light___ORIft .styles-module__paletteHeaderTitle___oHqZC {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__paletteHeaderDesc___6i74T {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 2px;
  line-height: 14px;
}
.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T {
  color: rgba(0, 0, 0, 0.45);
}
.styles-module__paletteHeaderDesc___6i74T a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__paletteHeaderDesc___6i74T a:hover {
  color: #fff;
}
.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T a {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
.styles-module__light___ORIft .styles-module__paletteHeaderDesc___6i74T a:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__wireframePurposeWrap___To-tS {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.2s ease, opacity 0.15s ease;
  opacity: 1;
}
.styles-module__wireframePurposeWrap___To-tS.styles-module__collapsed___Ms9vS {
  grid-template-rows: 0fr;
  opacity: 0;
}

.styles-module__wireframePurposeInner___Lrahs {
  overflow: hidden;
}

.styles-module__wireframePurposeInput___7EtBN {
  display: block;
  width: calc(100% - 2rem);
  margin: 0.25rem 1rem 0.375rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.8125rem;
  font-family: inherit;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
  resize: none;
  outline: none;
  transition: border-color 0.15s ease;
  letter-spacing: -0.0094em;
}
.styles-module__wireframePurposeInput___7EtBN::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__wireframePurposeInput___7EtBN:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
}
.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN {
  color: rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.1);
}
.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
.styles-module__light___ORIft .styles-module__wireframePurposeInput___7EtBN:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__canvasToggle___-QqSy {
  width: calc(100% - 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  margin: 0.25rem 1rem 0.25rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  background: transparent;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.styles-module__canvasToggle___-QqSy:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
}
.styles-module__canvasToggle___-QqSy.styles-module__active___hosp7 {
  background: #f97316;
  border-color: transparent;
  border-style: solid;
  box-shadow: none;
}
.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy {
  border-color: rgba(0, 0, 0, 0.08);
}
.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy:hover {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.12);
}
.styles-module__light___ORIft .styles-module__canvasToggle___-QqSy.styles-module__active___hosp7 {
  background: #f97316;
  border-color: transparent;
  border-style: solid;
  box-shadow: none;
}

.styles-module__canvasToggleIcon___7pJ82 {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.35);
}
.styles-module__active___hosp7 .styles-module__canvasToggleIcon___7pJ82 {
  color: rgba(255, 255, 255, 0.85);
}
.styles-module__light___ORIft .styles-module__canvasToggleIcon___7pJ82 {
  color: rgba(0, 0, 0, 0.25);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__canvasToggleIcon___7pJ82 {
  color: rgba(255, 255, 255, 0.85);
}

.styles-module__canvasToggleLabel___OanpY {
  font-size: 0.8125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: -0.0094em;
}
.styles-module__active___hosp7 .styles-module__canvasToggleLabel___OanpY {
  color: #fff;
}
.styles-module__light___ORIft .styles-module__canvasToggleLabel___OanpY {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__canvasToggleLabel___OanpY {
  color: #fff;
}

.styles-module__placement___zcxv8 {
  position: absolute;
  border: 1.5px dashed rgba(59, 130, 246, 0.4);
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.08);
  cursor: grab;
  transition: box-shadow 0.15s, border-color 0.15s, opacity 0.15s ease, transform 0.15s ease;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: auto;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  animation: styles-module__placementEnter___TdRhf 0.25s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.styles-module__placement___zcxv8:active {
  cursor: grabbing;
}
.styles-module__placement___zcxv8:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.12);
}
.styles-module__placement___zcxv8.styles-module__selected___6yrp6 {
  border-color: #3c82f7;
  border-style: solid;
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__placement___zcxv8.styles-module__selected___6yrp6:hover {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8 {
  border-color: rgba(249, 115, 22, 0.4);
  background: rgba(249, 115, 22, 0.08);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8:hover {
  border-color: rgba(249, 115, 22, 0.5);
  background: rgba(249, 115, 22, 0.1);
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.12);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8.styles-module__selected___6yrp6 {
  border-color: #f97316;
  background: rgba(249, 115, 22, 0.1);
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15), 0 2px 8px rgba(249, 115, 22, 0.15);
}
.styles-module__wireframe___itvQU .styles-module__placement___zcxv8.styles-module__selected___6yrp6:hover {
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15), 0 2px 8px rgba(249, 115, 22, 0.15);
}
.styles-module__placement___zcxv8.styles-module__dragging___le6KZ {
  opacity: 0.85;
  z-index: 50;
}
.styles-module__placement___zcxv8.styles-module__exiting___YrM8F {
  opacity: 0;
  transform: scale(0.97);
  pointer-events: none;
  animation: none;
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.styles-module__placementContent___f64A4 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.styles-module__placementLabel___0KvWl {
  position: absolute;
  top: -18px;
  left: 0;
  font-size: 10px;
  font-weight: 600;
  color: rgba(59, 130, 246, 0.7);
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(255, 255, 255, 0.5);
}
.styles-module__selected___6yrp6 .styles-module__placementLabel___0KvWl {
  color: #3c82f7;
}
.styles-module__wireframe___itvQU .styles-module__placementLabel___0KvWl {
  color: rgba(249, 115, 22, 0.7);
}
.styles-module__wireframe___itvQU .styles-module__selected___6yrp6 .styles-module__placementLabel___0KvWl {
  color: #f97316;
}

.styles-module__placementAnnotation___78pTr {
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
  font-weight: 450;
  color: rgba(0, 0, 0, 0.5);
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.6);
  opacity: 0;
  transform: translateY(-2px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.styles-module__placementAnnotation___78pTr.styles-module__annotationVisible___mrUyA {
  opacity: 1;
  transform: translateY(0);
}

.styles-module__sectionAnnotation___aUIs0 {
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
  font-weight: 450;
  color: rgba(59, 130, 246, 0.6);
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.6);
  opacity: 0;
  transform: translateY(-2px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.styles-module__sectionAnnotation___aUIs0.styles-module__annotationVisible___mrUyA {
  opacity: 1;
  transform: translateY(0);
}

.styles-module__handle___Ikbxm {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #fff;
  border: 1.5px solid #3c82f7;
  border-radius: 2px;
  z-index: 12;
  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.12);
  opacity: 0;
  transform: scale(0.3);
  pointer-events: none;
  will-change: opacity, transform;
  transition: opacity 0.2s ease-out, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.styles-module__placement___zcxv8:hover .styles-module__handle___Ikbxm, .styles-module__sectionOutline___s0hy-:hover .styles-module__handle___Ikbxm, .styles-module__ghostOutline___po-kO:hover .styles-module__handle___Ikbxm, .styles-module__placement___zcxv8:active .styles-module__handle___Ikbxm, .styles-module__sectionOutline___s0hy-:active .styles-module__handle___Ikbxm, .styles-module__ghostOutline___po-kO:active .styles-module__handle___Ikbxm, .styles-module__selected___6yrp6 .styles-module__handle___Ikbxm {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.styles-module__sectionOutline___s0hy- .styles-module__handle___Ikbxm {
  border-color: inherit;
}
.styles-module__wireframe___itvQU .styles-module__handle___Ikbxm {
  border-color: #f97316;
}

.styles-module__handleNw___4TMIj {
  top: -4px;
  left: -4px;
  cursor: nw-resize;
}

.styles-module__handleNe___mnsTh {
  top: -4px;
  right: -4px;
  cursor: ne-resize;
}

.styles-module__handleSe___oSFnk {
  bottom: -4px;
  right: -4px;
  cursor: se-resize;
}

.styles-module__handleSw___pi--Z {
  bottom: -4px;
  left: -4px;
  cursor: sw-resize;
}

.styles-module__handleN___aBA-Q,
.styles-module__handleE___0hM5u,
.styles-module__handleS___JjDRv,
.styles-module__handleW___ERWGQ {
  opacity: 0 !important;
  pointer-events: none !important;
}

.styles-module__edgeHandle___XxXdT {
  position: absolute;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
}
.styles-module__edgeHandle___XxXdT::after {
  content: "";
  position: absolute;
  border-radius: 4px;
  background: #3c82f7;
}
.styles-module__wireframe___itvQU .styles-module__edgeHandle___XxXdT::after {
  background: #f97316;
}
.styles-module__edgeHandle___XxXdT::after {
  opacity: 0;
  transition: opacity 0.1s ease, transform 0.1s ease;
  transform: scale(0.8);
}
.styles-module__edgeHandle___XxXdT:hover::after {
  opacity: 0.85;
  transform: scale(1);
}
.styles-module__edgeHandle___XxXdT svg {
  position: relative;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.1s ease;
  filter: drop-shadow(0 0 2px var(--agd-surface));
}
.styles-module__edgeHandle___XxXdT:hover svg {
  opacity: 1;
}

.styles-module__edgeN___-JJDj,
.styles-module__edgeS___66lMX {
  left: 12px;
  right: 12px;
  height: 12px;
  cursor: n-resize;
}
.styles-module__edgeN___-JJDj::after,
.styles-module__edgeS___66lMX::after {
  width: 24px;
  height: 4px;
}

.styles-module__edgeN___-JJDj {
  top: -6px;
}

.styles-module__edgeS___66lMX {
  bottom: -6px;
  cursor: s-resize;
}

.styles-module__edgeE___1bGDa,
.styles-module__edgeW___lHQNo {
  top: 12px;
  bottom: 12px;
  width: 12px;
  cursor: e-resize;
}
.styles-module__edgeE___1bGDa::after,
.styles-module__edgeW___lHQNo::after {
  width: 4px;
  height: 24px;
}

.styles-module__edgeE___1bGDa {
  right: -6px;
}

.styles-module__edgeW___lHQNo {
  left: -6px;
  cursor: w-resize;
}

.styles-module__deleteButton___LkGCb {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  line-height: 1;
  z-index: 15;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.8);
  will-change: opacity, transform;
  transition: opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.12s ease, color 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
}
.styles-module__placement___zcxv8:hover .styles-module__deleteButton___LkGCb, .styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb, .styles-module__sectionOutline___s0hy-:hover .styles-module__deleteButton___LkGCb, .styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb, .styles-module__ghostOutline___po-kO:hover .styles-module__deleteButton___LkGCb, .styles-module__ghostOutline___po-kO.styles-module__selected___6yrp6 .styles-module__deleteButton___LkGCb {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.styles-module__deleteButton___LkGCb:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
  box-shadow: 0 1px 4px rgba(239, 68, 68, 0.3);
  transform: scale(1.1);
}
.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb, .styles-module__rearrangeOverlay___-3R3t:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb {
  background: rgba(40, 40, 40, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}
.styles-module__overlay___aWh-q:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb:hover, .styles-module__rearrangeOverlay___-3R3t:not(.styles-module__light___ORIft) .styles-module__deleteButton___LkGCb:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

.styles-module__drawBox___BrVAa {
  position: fixed;
  pointer-events: none;
  z-index: 99996;
  border: 2px solid #3c82f7;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.15);
}

.styles-module__selectBox___Iu8kB {
  position: fixed;
  pointer-events: none;
  z-index: 99996;
  border: 1px dashed #3c82f7;
  background: rgba(59, 130, 246, 0.08);
  border-radius: 2px;
}

.styles-module__sizeIndicator___7zJ4y {
  position: fixed;
  pointer-events: none;
  z-index: 100001;
  font-size: 10px;
  color: #fff;
  background: #3c82f7;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.styles-module__guideLine___DUQY2 {
  pointer-events: none;
  z-index: 100001;
  background: #f0f;
  opacity: 0.5;
}

.styles-module__dragPreview___onPbU {
  position: fixed;
  z-index: 100002;
  pointer-events: none;
  border: 1.5px dashed #3c82f7;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 600;
  color: #3c82f7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
  transition: width 0.08s ease, height 0.08s ease, opacity 0.08s ease;
}

.styles-module__dragPreviewWireframe___jsg0G {
  border-color: #f97316;
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
  box-shadow: 0 4px 16px rgba(249, 115, 22, 0.15);
}

.styles-module__palette___C7iSH {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  width: 256px;
  overflow: hidden;
  background: #1c1c1c;
  border: none;
  border-radius: 1rem;
  padding: 13px 0 16px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  z-index: 100001;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  cursor: default;
  opacity: 0;
  filter: blur(5px);
}
.styles-module__palette___C7iSH .styles-module__paletteItem___6TlnA,
.styles-module__palette___C7iSH .styles-module__paletteItemLabel___6ncO4,
.styles-module__palette___C7iSH .styles-module__paletteSectionTitle___PqnjX,
.styles-module__palette___C7iSH .styles-module__paletteFooter___QYnAG {
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__palette___C7iSH {
  opacity: 0;
  transform: translateY(var(--panel-offset-y, 4px)) scale(0.98);
  transform-origin: var(--panel-origin, bottom right);
  filter: blur(2px);
  pointer-events: none;
  visibility: hidden;
  transition: opacity 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.styles-module__palette___C7iSH[data-panel-present=true] {
  visibility: visible;
}
.styles-module__palette___C7iSH[data-panel-open=true] {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
  pointer-events: auto;
  transition-duration: 160ms;
}
@media (prefers-reduced-motion: reduce) {
  .styles-module__palette___C7iSH {
    transition: none;
    transform: none;
    filter: none;
  }
}
.styles-module__palette___C7iSH.styles-module__light___ORIft {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.styles-module__paletteSection___V8DEA {
  padding: 0 1rem;
}
.styles-module__paletteSection___V8DEA + .styles-module__paletteSection___V8DEA {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__light___ORIft .styles-module__paletteSection___V8DEA + .styles-module__paletteSection___V8DEA {
  border-top-color: rgba(0, 0, 0, 0.07);
}

.styles-module__paletteSectionTitle___PqnjX {
  font-size: 0.6875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: -0.0094em;
  padding: 0 0 3px 3px;
}
.styles-module__light___ORIft .styles-module__paletteSectionTitle___PqnjX {
  color: rgba(0, 0, 0, 0.4);
}

.styles-module__paletteItem___6TlnA {
  width: 100%;
  text-align: left;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.25rem;
  margin-bottom: 1px;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
  border: 1px solid transparent;
  -webkit-user-select: none;
  user-select: none;
  min-height: 24px;
}
.styles-module__paletteItem___6TlnA:hover {
  background: rgba(255, 255, 255, 0.1);
}
.styles-module__paletteItem___6TlnA.styles-module__active___hosp7 {
  background: #3c82f7;
  border-color: transparent;
}
.styles-module__paletteItem___6TlnA.styles-module__wireframe___itvQU.styles-module__active___hosp7 {
  background: #f97316;
}
.styles-module__light___ORIft .styles-module__paletteItem___6TlnA:hover {
  background: rgba(0, 0, 0, 0.05);
}
.styles-module__light___ORIft .styles-module__paletteItem___6TlnA.styles-module__active___hosp7 {
  background: #3c82f7;
  border-color: transparent;
}
.styles-module__light___ORIft .styles-module__paletteItem___6TlnA.styles-module__wireframe___itvQU.styles-module__active___hosp7 {
  background: #f97316;
}

.styles-module__paletteItemIcon___0NPQK {
  width: 20px;
  height: 16px;
  border-radius: 2px;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.45);
}
.styles-module__paletteItemIcon___0NPQK svg {
  display: block;
  width: 20px;
  height: 16px;
}
.styles-module__active___hosp7 .styles-module__paletteItemIcon___0NPQK {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
.styles-module__light___ORIft .styles-module__paletteItemIcon___0NPQK {
  border-color: rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.02);
  color: rgba(0, 0, 0, 0.4);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__paletteItemIcon___0NPQK {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.styles-module__paletteItemLabel___6ncO4 {
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: -0.0094em;
  line-height: 1;
  min-width: 0;
}
.styles-module__active___hosp7 .styles-module__paletteItemLabel___6ncO4 {
  color: #fff;
  font-weight: 600;
}
.styles-module__light___ORIft .styles-module__paletteItemLabel___6ncO4 {
  color: rgba(0, 0, 0, 0.7);
}
.styles-module__light___ORIft .styles-module__active___hosp7 .styles-module__paletteItemLabel___6ncO4 {
  color: #fff;
  font-weight: 600;
}

.styles-module__placeScroll___7sClM {
  max-height: 240px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 0.25rem;
}
.styles-module__placeScroll___7sClM.styles-module__fadeTop___KT9tF {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 32px);
  mask-image: linear-gradient(to bottom, transparent 0, black 32px);
}
.styles-module__placeScroll___7sClM.styles-module__fadeBottom___x3ShT {
  -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);
  mask-image: linear-gradient(to bottom, black calc(100% - 32px), transparent 100%);
}
.styles-module__placeScroll___7sClM.styles-module__fadeTop___KT9tF.styles-module__fadeBottom___x3ShT {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 32px, black calc(100% - 32px), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, black 32px, black calc(100% - 32px), transparent 100%);
}
.styles-module__placeScroll___7sClM::-webkit-scrollbar {
  width: 3px;
}
.styles-module__placeScroll___7sClM::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
}
.styles-module__light___ORIft .styles-module__placeScroll___7sClM::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
}

.styles-module__paletteFooterWrap___71-fI {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.25s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__paletteFooterWrap___71-fI.styles-module__footerHidden___fJUik {
  grid-template-rows: 0fr;
}

.styles-module__paletteFooterInnerContent___VC26h {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.styles-module__footerHidden___fJUik .styles-module__paletteFooterInnerContent___VC26h {
  opacity: 0;
  transform: translateY(4px);
}

.styles-module__paletteFooterInner___dfylY {
  overflow: hidden;
}

.styles-module__paletteFooter___QYnAG {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
  padding: 0 1rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}
.styles-module__light___ORIft .styles-module__paletteFooter___QYnAG {
  border-top-color: rgba(0, 0, 0, 0.07);
}

.styles-module__paletteFooterCount___D3Fia {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
}
.styles-module__light___ORIft .styles-module__paletteFooterCount___D3Fia {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__paletteFooterClear___ybBoa {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: -0.0094em;
  color: rgba(255, 255, 255, 0.5);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  transition: color 0.15s ease;
}
.styles-module__paletteFooterClear___ybBoa:hover {
  color: rgba(255, 255, 255, 0.7);
}
.styles-module__light___ORIft .styles-module__paletteFooterClear___ybBoa {
  color: rgba(0, 0, 0, 0.5);
}
.styles-module__light___ORIft .styles-module__paletteFooterClear___ybBoa:hover {
  color: rgba(0, 0, 0, 0.6);
}

.styles-module__paletteFooterActions___fLzv8 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.styles-module__rollingWrap___S75jM {
  display: inline-block;
  overflow: hidden;
  height: 1.15em;
  position: relative;
  vertical-align: bottom;
}

.styles-module__rollingNum___1RKDx {
  position: absolute;
  left: 0;
  top: 0;
}

.styles-module__exitUp___AFDRW {
  animation: styles-module__numExitUp___FRQqx 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.styles-module__enterUp___CPlXb {
  animation: styles-module__numEnterUp___2Yd-w 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.styles-module__exitDown___-1yAy {
  animation: styles-module__numExitDown___xm5by 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

.styles-module__enterDown___DDuFR {
  animation: styles-module__numEnterDown___hpxBk 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}

@keyframes styles-module__numExitUp___FRQqx {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-110%);
    opacity: 0;
  }
}
@keyframes styles-module__numEnterUp___2Yd-w {
  from {
    transform: translateY(110%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes styles-module__numExitDown___xm5by {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(110%);
    opacity: 0;
  }
}
@keyframes styles-module__numEnterDown___hpxBk {
  from {
    transform: translateY(-110%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.styles-module__rearrangeOverlay___-3R3t {
  position: fixed;
  inset: 0;
  z-index: 99995;
  pointer-events: none;
  cursor: default;
  -webkit-user-select: none;
  user-select: none;
  animation: styles-module__overlayFadeIn___aECVy 0.15s ease;
}

.styles-module__hoverHighlight___8eT-v {
  position: fixed;
  pointer-events: none;
  z-index: 99994;
  border: 2px dashed rgba(59, 130, 246, 0.5);
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.06);
  animation: styles-module__highlightFadeIn___Lg7KY 0.12s ease;
}

.styles-module__sectionOutline___s0hy- {
  position: fixed;
  border: 2px solid;
  border-radius: 4px;
  cursor: grab;
}
.styles-module__sectionOutline___s0hy-:active {
  cursor: grabbing;
}
.styles-module__sectionOutline___s0hy- {
  transition: box-shadow 0.15s, border-color 0.3s, background-color 0.3s, border-style 0s;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: auto;
  animation: styles-module__sectionEnter___-8BXT 0.2s ease;
}
.styles-module__sectionOutline___s0hy-:hover {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.15);
}
.styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6 {
  border-style: solid;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__sectionOutline___s0hy-.styles-module__selected___6yrp6:hover {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) {
  border: 1.5px dashed rgba(150, 150, 150, 0.35);
  background-color: transparent !important;
  box-shadow: none;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover {
  border-color: rgba(150, 150, 150, 0.6);
  box-shadow: none;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__sectionLabel___F80HQ {
  opacity: 0;
  transition: opacity 0.15s ease;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover .styles-module__sectionLabel___F80HQ {
  opacity: 1;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__movedBadge___s8z-q,
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6) .styles-module__sectionDimensions___RcJSL {
  opacity: 0;
  transition: opacity 0.15s ease;
}
.styles-module__sectionOutline___s0hy-.styles-module__settled___b5U5o:not(.styles-module__selected___6yrp6):hover .styles-module__sectionDimensions___RcJSL {
  opacity: 1;
}
.styles-module__sectionOutline___s0hy-.styles-module__exiting___YrM8F {
  opacity: 0;
  transform: scale(0.97);
  pointer-events: none;
  animation: none;
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.styles-module__sectionLabel___F80HQ {
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  max-width: calc(100% - 8px);
  overflow: hidden;
  text-overflow: ellipsis;
}

.styles-module__movedBadge___s8z-q {
  position: absolute;
  bottom: 22px;
  right: 4px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: #22c55e;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.styles-module__movedBadge___s8z-q.styles-module__badgeVisible___npbdS {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.2s cubic-bezier(0.34, 1.2, 0.64, 1), transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.styles-module__resizedBadge___u51V8 {
  background: #3c82f7;
  bottom: 40px;
}

.styles-module__sectionDimensions___RcJSL {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 9px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.5);
  padding: 1px 5px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.styles-module__light___ORIft .styles-module__sectionDimensions___RcJSL {
  color: rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 0.7);
}

.styles-module__wireframeNotice___4GJyB {
  position: fixed;
  bottom: 16px;
  left: 24px;
  z-index: 99995;
  font-size: 9.5px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  pointer-events: auto;
  animation: styles-module__overlayFadeIn___aECVy 0.3s ease;
  line-height: 1.5;
  max-width: 280px;
}

.styles-module__wireframeOpacityRow___CJXzi {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.styles-module__wireframeOpacityLabel___afkfT {
  font-size: 9px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.32);
  letter-spacing: 0.02em;
  white-space: nowrap;
  -webkit-user-select: none;
  user-select: none;
}

.styles-module__wireframeOpacitySlider___YcoEs {
  -webkit-appearance: none;
  appearance: none;
  width: 56px;
  height: 4px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s ease;
}
.styles-module__wireframeOpacitySlider___YcoEs:hover {
  background: rgba(0, 0, 0, 0.13);
}
.styles-module__wireframeOpacitySlider___YcoEs::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f97316;
  cursor: pointer;
  transition: background 0.15s ease;
}
.styles-module__wireframeOpacitySlider___YcoEs::-webkit-slider-thumb:hover {
  background: rgb(88.0082041185%, 37.39404381%, 2.2663056855%);
}
.styles-module__wireframeOpacitySlider___YcoEs::-moz-range-thumb {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f97316;
  border: none;
  cursor: pointer;
}
.styles-module__wireframeOpacitySlider___YcoEs::-moz-range-track {
  background: rgba(0, 0, 0, 0.08);
  height: 4px;
  border-radius: 2px;
}

.styles-module__wireframeNoticeTitleRow___PJqyG {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 2px;
}

.styles-module__wireframeNoticeTitle___okr08 {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.55);
}

.styles-module__wireframeNoticeDivider___PNKQ6 {
  width: 1px;
  height: 8px;
  background: rgba(0, 0, 0, 0.12);
  margin: 0 8px;
  flex-shrink: 0;
}

.styles-module__wireframeStartOver___YFk-I {
  font-size: 9.5px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  text-decoration: none;
  transition: color 0.12s ease;
  white-space: nowrap;
}
.styles-module__wireframeStartOver___YFk-I:hover {
  color: rgba(0, 0, 0, 0.6);
}

.styles-module__ghostOutline___po-kO {
  position: fixed;
  border: 1.5px dashed rgba(59, 130, 246, 0.4);
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.04);
  cursor: grab;
  opacity: 0.5;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: auto;
  animation: styles-module__ghostEnter___EC3Mb 0.25s ease;
  transition: box-shadow 0.15s, border-color 0.3s, opacity 0.25s;
}
.styles-module__ghostOutline___po-kO:active {
  cursor: grabbing;
}
.styles-module__ghostOutline___po-kO:hover {
  opacity: 0.7;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08);
}
.styles-module__ghostOutline___po-kO.styles-module__selected___6yrp6 {
  opacity: 1;
  border-style: solid;
  border-width: 2px;
  border-color: #3c82f7;
  background: rgba(59, 130, 246, 0.08);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.15);
}
.styles-module__ghostOutline___po-kO.styles-module__exiting___YrM8F {
  opacity: 0;
  transform: scale(0.97);
  pointer-events: none;
  animation: none;
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.styles-module__ghostBadge___tsQUK {
  position: absolute;
  bottom: calc(100% + 4px);
  left: -1px;
  font-size: 9px;
  font-weight: 600;
  color: rgba(59, 130, 246, 0.9);
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 1px 5px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  letter-spacing: 0.02em;
  line-height: 1.2;
  animation: styles-module__badgeSlideIn___typJ7 0.2s ease both;
}

@keyframes styles-module__badgeSlideIn___typJ7 {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.styles-module__ghostBadgeExtra___6CVoD {
  display: inline;
  animation: styles-module__badgeExtraIn___i4W8F 0.2s ease both;
}

@keyframes styles-module__badgeExtraIn___i4W8F {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.styles-module__originalOutline___Y6DD1 {
  position: fixed;
  border: 1.5px dashed rgba(150, 150, 150, 0.3);
  border-radius: 4px;
  background: transparent;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
  animation: styles-module__sectionEnter___-8BXT 0.2s ease;
}

.styles-module__originalLabel___HqI9g {
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 9px;
  font-weight: 500;
  color: rgba(150, 150, 150, 0.5);
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: rgba(150, 150, 150, 0.08);
}

.styles-module__connectorSvg___Lovld {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 99996;
}

.styles-module__connectorLine___XeWh- {
  transition: opacity 0.2s ease;
  animation: styles-module__connectorDraw___8sK5I 0.3s ease both;
}

.styles-module__connectorDot___yvf7C {
  transform-box: fill-box;
  transform-origin: center;
  animation: styles-module__connectorDotIn___NwTUq 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
}

@keyframes styles-module__connectorDraw___8sK5I {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__connectorDotIn___NwTUq {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.styles-module__connectorExiting___2lLOs {
  animation: styles-module__connectorOut___5QoPl 0.2s ease forwards;
}
.styles-module__connectorExiting___2lLOs .styles-module__connectorDot___yvf7C {
  animation: styles-module__connectorDotOut___FEq7e 0.2s ease forwards;
}

@keyframes styles-module__connectorOut___5QoPl {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes styles-module__connectorDotOut___FEq7e {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0);
    opacity: 0;
  }
}
@keyframes styles-module__placementEnter___TdRhf {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__sectionEnter___-8BXT {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__highlightFadeIn___Lg7KY {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__overlayFadeIn___aECVy {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes styles-module__ghostEnter___EC3Mb {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 0.6;
    transform: scale(1);
  }
}
.styles-module__canvasToggle___-QqSy:focus-visible,
.styles-module__paletteItem___6TlnA:focus-visible {
  outline: 2px solid var(--agentation-color-accent);
  outline-offset: -2px;
}`,q={overlay:`styles-module__overlay___aWh-q`,rearrangeOverlay:`styles-module__rearrangeOverlay___-3R3t`,overlayExiting:`styles-module__overlayExiting___iEmYr`,overlayFadeIn:`styles-module__overlayFadeIn___aECVy`,light:`styles-module__light___ORIft`,wireframe:`styles-module__wireframe___itvQU`,placing:`styles-module__placing___45yD8`,passthrough:`styles-module__passthrough___xaFeE`,blankCanvas:`styles-module__blankCanvas___t2Eue`,visible:`styles-module__visible___OKKqX`,gridActive:`styles-module__gridActive___OZ-cf`,paletteHeader:`styles-module__paletteHeader___-Q5gQ`,paletteHeaderTitle:`styles-module__paletteHeaderTitle___oHqZC`,paletteHeaderDesc:`styles-module__paletteHeaderDesc___6i74T`,wireframePurposeWrap:`styles-module__wireframePurposeWrap___To-tS`,collapsed:`styles-module__collapsed___Ms9vS`,wireframePurposeInner:`styles-module__wireframePurposeInner___Lrahs`,wireframePurposeInput:`styles-module__wireframePurposeInput___7EtBN`,canvasToggle:`styles-module__canvasToggle___-QqSy`,active:`styles-module__active___hosp7`,canvasToggleIcon:`styles-module__canvasToggleIcon___7pJ82`,canvasToggleLabel:`styles-module__canvasToggleLabel___OanpY`,placement:`styles-module__placement___zcxv8`,placementEnter:`styles-module__placementEnter___TdRhf`,selected:`styles-module__selected___6yrp6`,dragging:`styles-module__dragging___le6KZ`,exiting:`styles-module__exiting___YrM8F`,placementContent:`styles-module__placementContent___f64A4`,placementLabel:`styles-module__placementLabel___0KvWl`,placementAnnotation:`styles-module__placementAnnotation___78pTr`,annotationVisible:`styles-module__annotationVisible___mrUyA`,sectionAnnotation:`styles-module__sectionAnnotation___aUIs0`,handle:`styles-module__handle___Ikbxm`,sectionOutline:`styles-module__sectionOutline___s0hy-`,ghostOutline:`styles-module__ghostOutline___po-kO`,handleNw:`styles-module__handleNw___4TMIj`,handleNe:`styles-module__handleNe___mnsTh`,handleSe:`styles-module__handleSe___oSFnk`,handleSw:`styles-module__handleSw___pi--Z`,handleN:`styles-module__handleN___aBA-Q`,handleE:`styles-module__handleE___0hM5u`,handleS:`styles-module__handleS___JjDRv`,handleW:`styles-module__handleW___ERWGQ`,edgeHandle:`styles-module__edgeHandle___XxXdT`,edgeN:`styles-module__edgeN___-JJDj`,edgeS:`styles-module__edgeS___66lMX`,edgeE:`styles-module__edgeE___1bGDa`,edgeW:`styles-module__edgeW___lHQNo`,deleteButton:`styles-module__deleteButton___LkGCb`,drawBox:`styles-module__drawBox___BrVAa`,selectBox:`styles-module__selectBox___Iu8kB`,sizeIndicator:`styles-module__sizeIndicator___7zJ4y`,guideLine:`styles-module__guideLine___DUQY2`,dragPreview:`styles-module__dragPreview___onPbU`,dragPreviewWireframe:`styles-module__dragPreviewWireframe___jsg0G`,palette:`styles-module__palette___C7iSH`,paletteItem:`styles-module__paletteItem___6TlnA`,paletteItemLabel:`styles-module__paletteItemLabel___6ncO4`,paletteSectionTitle:`styles-module__paletteSectionTitle___PqnjX`,paletteFooter:`styles-module__paletteFooter___QYnAG`,paletteSection:`styles-module__paletteSection___V8DEA`,paletteItemIcon:`styles-module__paletteItemIcon___0NPQK`,placeScroll:`styles-module__placeScroll___7sClM`,fadeTop:`styles-module__fadeTop___KT9tF`,fadeBottom:`styles-module__fadeBottom___x3ShT`,paletteFooterWrap:`styles-module__paletteFooterWrap___71-fI`,footerHidden:`styles-module__footerHidden___fJUik`,paletteFooterInnerContent:`styles-module__paletteFooterInnerContent___VC26h`,paletteFooterInner:`styles-module__paletteFooterInner___dfylY`,paletteFooterCount:`styles-module__paletteFooterCount___D3Fia`,paletteFooterClear:`styles-module__paletteFooterClear___ybBoa`,paletteFooterActions:`styles-module__paletteFooterActions___fLzv8`,rollingWrap:`styles-module__rollingWrap___S75jM`,rollingNum:`styles-module__rollingNum___1RKDx`,exitUp:`styles-module__exitUp___AFDRW`,numExitUp:`styles-module__numExitUp___FRQqx`,enterUp:`styles-module__enterUp___CPlXb`,numEnterUp:`styles-module__numEnterUp___2Yd-w`,exitDown:`styles-module__exitDown___-1yAy`,numExitDown:`styles-module__numExitDown___xm5by`,enterDown:`styles-module__enterDown___DDuFR`,numEnterDown:`styles-module__numEnterDown___hpxBk`,hoverHighlight:`styles-module__hoverHighlight___8eT-v`,highlightFadeIn:`styles-module__highlightFadeIn___Lg7KY`,sectionEnter:`styles-module__sectionEnter___-8BXT`,settled:`styles-module__settled___b5U5o`,sectionLabel:`styles-module__sectionLabel___F80HQ`,movedBadge:`styles-module__movedBadge___s8z-q`,sectionDimensions:`styles-module__sectionDimensions___RcJSL`,badgeVisible:`styles-module__badgeVisible___npbdS`,resizedBadge:`styles-module__resizedBadge___u51V8`,wireframeNotice:`styles-module__wireframeNotice___4GJyB`,wireframeOpacityRow:`styles-module__wireframeOpacityRow___CJXzi`,wireframeOpacityLabel:`styles-module__wireframeOpacityLabel___afkfT`,wireframeOpacitySlider:`styles-module__wireframeOpacitySlider___YcoEs`,wireframeNoticeTitleRow:`styles-module__wireframeNoticeTitleRow___PJqyG`,wireframeNoticeTitle:`styles-module__wireframeNoticeTitle___okr08`,wireframeNoticeDivider:`styles-module__wireframeNoticeDivider___PNKQ6`,wireframeStartOver:`styles-module__wireframeStartOver___YFk-I`,ghostEnter:`styles-module__ghostEnter___EC3Mb`,ghostBadge:`styles-module__ghostBadge___tsQUK`,badgeSlideIn:`styles-module__badgeSlideIn___typJ7`,ghostBadgeExtra:`styles-module__ghostBadgeExtra___6CVoD`,badgeExtraIn:`styles-module__badgeExtraIn___i4W8F`,originalOutline:`styles-module__originalOutline___Y6DD1`,originalLabel:`styles-module__originalLabel___HqI9g`,connectorSvg:`styles-module__connectorSvg___Lovld`,connectorLine:`styles-module__connectorLine___XeWh-`,connectorDraw:`styles-module__connectorDraw___8sK5I`,connectorDot:`styles-module__connectorDot___yvf7C`,connectorDotIn:`styles-module__connectorDotIn___NwTUq`,connectorExiting:`styles-module__connectorExiting___2lLOs`,connectorOut:`styles-module__connectorOut___5QoPl`,connectorDotOut:`styles-module__connectorDotOut___FEq7e`},Tn=24,En=5;function Dn(e,t,n,r,i){let a=1/0,o=1/0,s=e.x,c=e.x+e.width,l=e.x+e.width/2,u=e.y,d=e.y+e.height,f=e.y+e.height/2,p=!r,m=p?[s,c,l]:[...r.left?[s]:[],...r.right?[c]:[]],h=p?[u,d,f]:[...r.top?[u]:[],...r.bottom?[d]:[]],g=[];for(let e of t)n.has(e.id)||g.push(e);i&&g.push(...i);for(let e of g){let t=e.x,n=e.x+e.width,r=e.x+e.width/2,i=e.y,s=e.y+e.height,c=e.y+e.height/2;for(let e of m)for(let i of[t,n,r]){let t=i-e;Math.abs(t)<En&&Math.abs(t)<Math.abs(a)&&(a=t)}for(let e of h)for(let t of[i,s,c]){let n=t-e;Math.abs(n)<En&&Math.abs(n)<Math.abs(o)&&(o=n)}}let _=Math.abs(a)<En?a:0,v=Math.abs(o)<En?o:0,y=[],b=new Set,x=s+_,S=c+_,C=l+_,w=u+v,T=d+v,E=f+v;for(let e of g){let t=e.x,n=e.x+e.width,r=e.x+e.width/2,i=e.y,a=e.y+e.height,o=e.y+e.height/2;for(let e of[t,r,n])for(let t of[x,C,S])if(Math.abs(t-e)<.5){let t=`x:${Math.round(e)}`;b.has(t)||(b.add(t),y.push({axis:`x`,pos:e}))}for(let e of[i,o,a])for(let t of[w,E,T])if(Math.abs(t-e)<.5){let t=`y:${Math.round(e)}`;b.has(t)||(b.add(t),y.push({axis:`y`,pos:e}))}}return{dx:_,dy:v,guides:y}}function On(){return`dp-${Date.now()}-${Math.random().toString(36).slice(2,7)}`}function kn({placements:e,onChange:t,activeComponent:n,onActiveComponentChange:r,isDarkMode:a,exiting:s,onInteractionChange:c,className:l,passthrough:u,extraSnapRects:d,onSelectionChange:f,deselectSignal:p,onDragMove:h,onDragEnd:g,clearingPlacements:_,wireframe:v}){let[y,b]=(0,i.useState)(new Set),[x,S]=(0,i.useState)(null),[C,w]=(0,i.useState)(null),[T,E]=(0,i.useState)(null),[ee,D]=(0,i.useState)([]),[O,k]=(0,i.useState)(null),[te,ne]=(0,i.useState)(!1),A=(0,i.useRef)(!1),[re,ie]=(0,i.useState)(new Set),ae=(0,i.useRef)(new Map),oe=(0,i.useRef)(null),se=(0,i.useRef)(null),ce=(0,i.useRef)(e);ce.current=e;let j=(0,i.useRef)(f);j.current=f;let le=(0,i.useRef)(h);le.current=h;let M=(0,i.useRef)(g);M.current=g;let ue=(0,i.useRef)(p);(0,i.useEffect)(()=>{p!==ue.current&&(ue.current=p,b(new Set))},[p]),(0,i.useEffect)(()=>{_?.length&&(b(e=>new Set([...e].filter(e=>!_.some(t=>t.id===e)))),se.current=null)},[_]),(0,i.useEffect)(()=>{let i=i=>{let a=i.composedPath()[0]||i.target;if(!(a.tagName===`INPUT`||a.tagName===`TEXTAREA`||a.isContentEditable)){if((i.key===`Backspace`||i.key===`Delete`)&&y.size>0){i.preventDefault();let e=new Set(y);ie(e),b(new Set),m(()=>{t(ce.current.filter(t=>!e.has(t.id))),ie(new Set)},180);return}if([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`].includes(i.key)&&y.size>0){i.preventDefault();let n=i.shiftKey?20:1,r=i.key===`ArrowLeft`?-n:i.key===`ArrowRight`?n:0,a=i.key===`ArrowUp`?-n:i.key===`ArrowDown`?n:0;t(e.map(e=>y.has(e.id)?{...e,x:Math.max(0,e.x+r),y:Math.max(0,e.y+a)}:e));return}if(i.key===`Escape`){n?r(null):y.size>0&&b(new Set);return}}};return document.addEventListener(`keydown`,i),()=>document.removeEventListener(`keydown`,i)},[y,n,e,t,r]);let de=(0,i.useCallback)(i=>{if(i.button!==0||u||i.target.closest(`.${q.placement}`))return;i.preventDefault(),i.stopPropagation();let a=window.scrollY,o=i.clientX,s=i.clientY;if(n){se.current=`place`,c?.(!0);let i=!1,l=o,u=s,d=e=>{l=e.clientX,u=e.clientY;let t=Math.abs(l-o),n=Math.abs(u-s);if((t>5||n>5)&&(i=!0),i){let t=Math.min(o,l),n=Math.min(s,u),r=Math.abs(l-o),i=Math.abs(u-s);S({x:t,y:n,w:r,h:i}),E({x:e.clientX+12,y:e.clientY+12,text:`${Math.round(r)} \xD7 ${Math.round(i)}`})}},f=p=>{window.removeEventListener(`mousemove`,d),window.removeEventListener(`mouseup`,f),S(null),E(null),se.current=null,c?.(!1);let m=R[n],h,g,_,v;i?(h=Math.min(o,l),g=Math.min(s,u)+a,_=Math.max(Tn,Math.abs(l-o)),v=Math.max(Tn,Math.abs(u-s))):(_=m.width,v=m.height,h=o-_/2,g=s+a-v/2),h=Math.max(0,h),g=Math.max(0,g);let y={id:On(),type:n,x:h,y:g,width:_,height:v,scrollY:a,timestamp:Date.now()};t([...e,y]),b(new Set([y.id])),r(null)};window.addEventListener(`mousemove`,d),window.addEventListener(`mouseup`,f)}else{i.shiftKey||b(new Set),se.current=`select`;let t=!1,n=e=>{let n=Math.abs(e.clientX-o),r=Math.abs(e.clientY-s);if((n>4||r>4)&&(t=!0),t){let t=Math.min(o,e.clientX),n=Math.min(s,e.clientY);w({x:t,y:n,w:Math.abs(e.clientX-o),h:Math.abs(e.clientY-s)})}},r=c=>{if(window.removeEventListener(`mousemove`,n),window.removeEventListener(`mouseup`,r),se.current=null,t){let t=Math.min(o,c.clientX),n=Math.min(s,c.clientY)+a,r=Math.abs(c.clientX-o),l=Math.abs(c.clientY-s),u=new Set(i.shiftKey?y:new Set);for(let i of e)i.y-a,i.x+i.width>t&&i.x<t+r&&i.y+i.height>n&&i.y<n+l&&u.add(i.id);b(u)}w(null)};window.addEventListener(`mousemove`,n),window.addEventListener(`mouseup`,r)}},[n,u,e,t,y]),fe=(0,i.useCallback)((n,r)=>{if(n.button!==0)return;let i=n.target;if(i.closest(`.${q.handle}`)||i.closest(`.${q.deleteButton}`))return;n.preventDefault(),n.stopPropagation();let a;n.shiftKey?(a=new Set(y),a.has(r)?a.delete(r):a.add(r)):a=y.has(r)?new Set(y):new Set([r]),b(a),(a.size!==y.size||[...a].some(e=>!y.has(e)))&&j.current?.(a,n.shiftKey),window.scrollY;let o=n.clientX,s=n.clientY,l=new Map;for(let t of e)a.has(t.id)&&l.set(t.id,{x:t.x,y:t.y});se.current=`move`,c?.(!0);let u=!1,f=!1,p=e,m=0,h=0,g=new Map;for(let t of e)l.has(t.id)&&g.set(t.id,{w:t.width,h:t.height});let _=n=>{let r=n.clientX-o,i=n.clientY-s;if((Math.abs(r)>2||Math.abs(i)>2)&&(u=!0),!u)return;if(n.altKey&&!f){f=!0;let t=[];for(let n of e)l.has(n.id)&&t.push({...n,id:On(),timestamp:Date.now()});p=[...e,...t]}let a=1/0,c=1/0,_=-1/0,v=-1/0;for(let[e,t]of l){let n=g.get(e);n&&(a=Math.min(a,t.x+r),c=Math.min(c,t.y+i),_=Math.max(_,t.x+r+n.w),v=Math.max(v,t.y+i+n.h))}let{dx:y,dy:b,guides:x}=Dn({x:a,y:c,width:_-a,height:v-c},p,new Set(l.keys()),void 0,d);D(x);let S=r+y,C=i+b;m=S,h=C,t(p.map(e=>{let t=l.get(e.id);return t?{...e,x:Math.max(0,t.x+S),y:Math.max(0,t.y+C)}:e})),le.current?.(S,C)},v=()=>{window.removeEventListener(`mousemove`,_),window.removeEventListener(`mouseup`,v),se.current=null,c?.(!1),D([]),M.current?.(m,h,u)};window.addEventListener(`mousemove`,_),window.addEventListener(`mouseup`,v)},[y,e,t,c]),pe=(0,i.useCallback)((n,r,i)=>{n.preventDefault(),n.stopPropagation();let a=e.find(e=>e.id===r);if(!a)return;b(new Set([r])),se.current=`resize`,c?.(!0);let o=n.clientX,s=n.clientY,l=a.width,u=a.height,f=a.x,p=a.y,m={left:i.includes(`w`),right:i.includes(`e`),top:i.includes(`n`),bottom:i.includes(`s`)},h=e=>{let n=e.clientX-o,a=e.clientY-s,c=l,h=u,g=f,_=p;i.includes(`e`)&&(c=Math.max(Tn,l+n)),i.includes(`w`)&&(c=Math.max(Tn,l-n),g=f+l-c),i.includes(`s`)&&(h=Math.max(Tn,u+a)),i.includes(`n`)&&(h=Math.max(Tn,u-a),_=p+u-h);let{dx:v,dy:y,guides:b}=Dn({x:g,y:_,width:c,height:h},ce.current,new Set([r]),m,d);D(b),v!==0&&(m.right?c+=v:m.left&&(g+=v,c-=v)),y!==0&&(m.bottom?h+=y:m.top&&(_+=y,h-=y)),t(ce.current.map(e=>e.id===r?{...e,x:g,y:_,width:c,height:h}:e)),E({x:e.clientX+12,y:e.clientY+12,text:`${Math.round(c)} \xD7 ${Math.round(h)}`})},g=()=>{window.removeEventListener(`mousemove`,h),window.removeEventListener(`mouseup`,g),E(null),se.current=null,c?.(!1),D([])};window.addEventListener(`mousemove`,h),window.addEventListener(`mouseup`,g)},[e,t,c]),me=(0,i.useCallback)(e=>{se.current=null,ie(t=>{let n=new Set(t);return n.add(e),n}),b(t=>{let n=new Set(t);return n.delete(e),n}),m(()=>{t(ce.current.filter(t=>t.id!==e)),ie(t=>{let n=new Set(t);return n.delete(e),n})},180)},[t]),he={hero:`Headline text`,button:`Button label`,badge:`Badge label`,cta:`Call to action text`,toast:`Notification message`,modal:`Dialog title`,card:`Card title`,navigation:`Brand / nav items`,tabs:`Tab labels`,input:`Placeholder text`,search:`Search placeholder`,pricing:`Plan name or price`,testimonial:`Quote text`,alert:`Alert message`,banner:`Banner text`,tag:`Tag label`,notification:`Notification message`,stat:`Metric value`,productCard:`Product name`},N=(0,i.useCallback)(t=>{let n=e.find(e=>e.id===t);n&&(A.current=!!n.text,k(t),ne(!1))},[e]),ge=(0,i.useCallback)(()=>{O&&(ne(!0),m(()=>{k(null),ne(!1)},150))},[O]);(0,i.useEffect)(()=>{s&&O&&ge()},[s]);let _e=(0,i.useCallback)(n=>{O&&(t(e.map(e=>e.id===O?{...e,text:n.trim()||void 0}:e)),ge())},[O,e,t,ge]),ve=typeof window<`u`?window.scrollY:0,ye=[`nw`,`ne`,`se`,`sw`],be=v?`#f97316`:`#3c82f7`,xe=[{dir:`n`,cls:q.edgeN,arrow:(0,o.jsx)(`svg`,{width:`8`,height:`6`,viewBox:`0 0 8 6`,fill:`none`,children:(0,o.jsx)(`path`,{d:`M4 0.5L1 4.5h6z`,fill:be})})},{dir:`e`,cls:q.edgeE,arrow:(0,o.jsx)(`svg`,{width:`6`,height:`8`,viewBox:`0 0 6 8`,fill:`none`,children:(0,o.jsx)(`path`,{d:`M5.5 4L1.5 1v6z`,fill:be})})},{dir:`s`,cls:q.edgeS,arrow:(0,o.jsx)(`svg`,{width:`8`,height:`6`,viewBox:`0 0 8 6`,fill:`none`,children:(0,o.jsx)(`path`,{d:`M4 5.5L1 1.5h6z`,fill:be})})},{dir:`w`,cls:q.edgeW,arrow:(0,o.jsx)(`svg`,{width:`6`,height:`8`,viewBox:`0 0 6 8`,fill:`none`,children:(0,o.jsx)(`path`,{d:`M0.5 4L4.5 1v6z`,fill:be})})}];return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`div`,{ref:oe,className:`${q.overlay} ${a?``:q.light} ${n?q.placing:``} ${u?q.passthrough:``} ${s?q.overlayExiting:``} ${v?q.wireframe:``}${l?` ${l}`:``}`,"data-feedback-toolbar":!0,onMouseDown:de,children:e.map(e=>{let t=y.has(e.id),n=pt[e.type]?.label||e.type,r=e.y-ve;return(0,o.jsxs)(`div`,{"data-design-placement":e.id,className:`${q.placement} ${t?q.selected:``} ${re.has(e.id)||_?.includes(e)?q.exiting:``}`,style:{left:e.x,top:r,width:e.width,height:e.height,position:`fixed`},onMouseDown:t=>fe(t,e.id),onDoubleClick:()=>N(e.id),children:[(0,o.jsx)(`span`,{className:q.placementLabel,children:n}),(0,o.jsx)(`span`,{className:`${q.placementAnnotation} ${e.text?q.annotationVisible:``}`,children:(e.text&&ae.current.set(e.id,e.text),e.text||ae.current.get(e.id)||``)}),(0,o.jsx)(`div`,{className:q.placementContent,children:(0,o.jsx)(Cn,{type:e.type,width:e.width,height:e.height,text:e.text})}),(0,o.jsx)(`div`,{className:q.deleteButton,onMouseDown:e=>e.stopPropagation(),onClick:()=>me(e.id),children:`✕`}),ye.map(t=>(0,o.jsx)(`div`,{className:`${q.handle} ${q[`handle${t.charAt(0).toUpperCase()}${t.slice(1)}`]}`,onMouseDown:n=>pe(n,e.id,t)},t)),xe.map(({dir:t,cls:n,arrow:r})=>(0,o.jsx)(`div`,{className:`${q.edgeHandle} ${n}`,onMouseDown:n=>pe(n,e.id,t),children:r},t))]},e.id)})}),O&&(()=>{let t=e.find(e=>e.id===O);if(!t)return null;let n=t.y-ve,r=t.x+t.width/2,i=n-8,s=n+t.height+8,c=i>200,l=s<window.innerHeight-100,u=Math.max(160,Math.min(window.innerWidth-160,r)),d;return d=c?{left:u,bottom:window.innerHeight-i}:l?{left:u,top:s}:{left:u,top:Math.max(80,window.innerHeight/2-80)},(0,o.jsx)(We,{element:pt[t.type]?.label||t.type,placeholder:he[t.type]||`Label or content text`,initialValue:t.text??``,submitLabel:A.current?`Save`:`Set`,onSubmit:_e,onCancel:ge,onDelete:A.current?()=>{_e(``)}:void 0,isExiting:te,lightMode:!a,style:d})})(),x&&(0,o.jsx)(`div`,{className:q.drawBox,style:{left:x.x,top:x.y,width:x.w,height:x.h},"data-feedback-toolbar":!0}),C&&(0,o.jsx)(`div`,{className:q.selectBox,style:{left:C.x,top:C.y,width:C.w,height:C.h},"data-feedback-toolbar":!0}),T&&(0,o.jsx)(`div`,{className:q.sizeIndicator,style:{left:T.x,top:T.y},"data-feedback-toolbar":!0,children:T.text}),ee.map((e,t)=>(0,o.jsx)(`div`,{className:q.guideLine,style:e.axis===`x`?{position:`fixed`,left:e.pos,top:0,width:1,bottom:0}:{position:`fixed`,left:0,top:e.pos-ve,right:0,height:1},"data-feedback-toolbar":!0},`${e.axis}-${e.pos}-${t}`))]})}function An(e,{keepMounted:t=!1,onExited:n}={}){let[r,a]=(0,i.useState)(t||e),o=(0,i.useRef)(null),s=(0,i.useRef)(n);return e&&!r&&a(!0),(0,i.useLayoutEffect)(()=>{s.current=n},[n]),(0,i.useLayoutEffect)(()=>{let n=o.current;if(!n||n.dataset.panelOpen===`true`===e)return;getComputedStyle(n).opacity,n.dataset.panelPresent=`true`,n.dataset.panelOpen=String(e);let r=!1,i=n.getAnimations?.()??[];return Promise.allSettled(i.map(e=>e.finished)).then(()=>{r||e||(delete n.dataset.panelPresent,t||a(!1),s.current?.())}),()=>{r=!0}},[e,r,t]),{ref:o,mounted:r}}function jn(e){if(!e)return``;let t=e.scrollTop>2,n=e.scrollTop+e.clientHeight<e.scrollHeight-2;return`${t?q.fadeTop:``} ${n?q.fadeBottom:``}`}var J=`currentColor`,Y=`0.5`;function Mn({type:e}){switch(e){case`navigation`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:`4`,width:`18`,height:`8`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`2.5`,y:`7`,width:`3`,height:`1.5`,rx:`.5`,fill:J,opacity:`.4`}),(0,o.jsx)(`rect`,{x:`7`,y:`7`,width:`2.5`,height:`1.5`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`11`,y:`7`,width:`2.5`,height:`1.5`,rx:`.5`,fill:J,opacity:`.25`})]});case`header`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:`2`,width:`18`,height:`12`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`3`,y:`5.5`,width:`8`,height:`2`,rx:`.5`,fill:J,opacity:`.35`}),(0,o.jsx)(`rect`,{x:`3`,y:`9`,width:`12`,height:`1`,rx:`.5`,fill:J,opacity:`.15`})]});case`hero`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:`1`,width:`18`,height:`14`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`5`,y:`5`,width:`10`,height:`1.5`,rx:`.5`,fill:J,opacity:`.35`}),(0,o.jsx)(`rect`,{x:`7`,y:`8`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`7.5`,y:`10.5`,width:`5`,height:`2.5`,rx:`1`,stroke:J,strokeWidth:Y})]});case`section`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:`1`,width:`18`,height:`14`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`3`,y:`4`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`3`,y:`6.5`,width:`14`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`3`,y:`9`,width:`10`,height:`1`,rx:`.5`,fill:J,opacity:`.15`})]});case`sidebar`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:`1`,width:`7`,height:`14`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`2.5`,y:`4`,width:`4`,height:`1`,rx:`.5`,fill:J,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`2.5`,y:`6.5`,width:`3.5`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`2.5`,y:`9`,width:`4`,height:`1`,rx:`.5`,fill:J,opacity:`.15`})]});case`footer`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:`7`,width:`18`,height:`8`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`3`,y:`9.5`,width:`4`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`9`,y:`9.5`,width:`4`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`15`,y:`9.5`,width:`3`,height:`1`,rx:`.5`,fill:J,opacity:`.2`})]});case`modal`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`2`,width:`14`,height:`12`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`5`,y:`4.5`,width:`7`,height:`1`,rx:`.5`,fill:J,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`5`,y:`7`,width:`10`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`11`,y:`11`,width:`5`,height:`2`,rx:`.75`,stroke:J,strokeWidth:Y})]});case`divider`:return(0,o.jsx)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:(0,o.jsx)(`line`,{x1:`2`,y1:`8`,x2:`18`,y2:`8`,stroke:J,strokeWidth:`0.5`,opacity:`.3`})});case`card`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`1`,width:`16`,height:`14`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`2`,y:`1`,width:`16`,height:`5.5`,rx:`1`,fill:J,opacity:`.04`}),(0,o.jsx)(`rect`,{x:`4`,y:`8.5`,width:`8`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`4`,y:`11`,width:`11`,height:`1`,rx:`.5`,fill:J,opacity:`.12`})]});case`text`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`4`,width:`14`,height:`1.5`,rx:`.5`,fill:J,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`2`,y:`7`,width:`11`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`2`,y:`9.5`,width:`13`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`2`,y:`12`,width:`8`,height:`1`,rx:`.5`,fill:J,opacity:`.12`})]});case`image`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`2`,width:`16`,height:`12`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`line`,{x1:`2`,y1:`2`,x2:`18`,y2:`14`,stroke:J,strokeWidth:`.3`,opacity:`.25`}),(0,o.jsx)(`line`,{x1:`18`,y1:`2`,x2:`2`,y2:`14`,stroke:J,strokeWidth:`.3`,opacity:`.25`})]});case`video`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`2`,width:`16`,height:`12`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`path`,{d:`M8.5 5.5v5l4.5-2.5z`,stroke:J,strokeWidth:Y,fill:J,opacity:`.15`})]});case`table`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:`2`,width:`18`,height:`12`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`line`,{x1:`1`,y1:`5.5`,x2:`19`,y2:`5.5`,stroke:J,strokeWidth:`.3`,opacity:`.25`}),(0,o.jsx)(`line`,{x1:`1`,y1:`9`,x2:`19`,y2:`9`,stroke:J,strokeWidth:`.3`,opacity:`.25`}),(0,o.jsx)(`line`,{x1:`7`,y1:`2`,x2:`7`,y2:`14`,stroke:J,strokeWidth:`.3`,opacity:`.25`}),(0,o.jsx)(`line`,{x1:`13`,y1:`2`,x2:`13`,y2:`14`,stroke:J,strokeWidth:`.3`,opacity:`.25`})]});case`grid`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1.5`,y:`2`,width:`7`,height:`5.5`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`11.5`,y:`2`,width:`7`,height:`5.5`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`1.5`,y:`9.5`,width:`7`,height:`5.5`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`11.5`,y:`9.5`,width:`7`,height:`5.5`,rx:`1`,stroke:J,strokeWidth:Y})]});case`list`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`circle`,{cx:`3.5`,cy:`4.5`,r:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`6.5`,y:`4`,width:`10`,height:`1`,rx:`.5`,fill:J,opacity:`.2`}),(0,o.jsx)(`circle`,{cx:`3.5`,cy:`8`,r:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`6.5`,y:`7.5`,width:`8`,height:`1`,rx:`.5`,fill:J,opacity:`.2`}),(0,o.jsx)(`circle`,{cx:`3.5`,cy:`11.5`,r:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`6.5`,y:`11`,width:`11`,height:`1`,rx:`.5`,fill:J,opacity:`.2`})]});case`chart`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`9`,width:`2.5`,height:`4`,rx:`.5`,fill:J,opacity:`.2`}),(0,o.jsx)(`rect`,{x:`7`,y:`6`,width:`2.5`,height:`7`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`11`,y:`3`,width:`2.5`,height:`10`,rx:`.5`,fill:J,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`15`,y:`5`,width:`2.5`,height:`8`,rx:`.5`,fill:J,opacity:`.2`})]});case`accordion`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1.5`,y:`2`,width:`17`,height:`4`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`3`,y:`3.5`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`1.5`,y:`7.5`,width:`17`,height:`3`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`1.5`,y:`12`,width:`17`,height:`3`,rx:`1`,stroke:J,strokeWidth:Y})]});case`carousel`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`2`,width:`14`,height:`10`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`path`,{d:`M1.5 7L3 8.5 1.5 10`,stroke:J,strokeWidth:Y,opacity:`.35`}),(0,o.jsx)(`path`,{d:`M18.5 7L17 8.5 18.5 10`,stroke:J,strokeWidth:Y,opacity:`.35`}),(0,o.jsx)(`circle`,{cx:`8.5`,cy:`14`,r:`.6`,fill:J,opacity:`.35`}),(0,o.jsx)(`circle`,{cx:`10`,cy:`14`,r:`.6`,fill:J,opacity:`.15`}),(0,o.jsx)(`circle`,{cx:`11.5`,cy:`14`,r:`.6`,fill:J,opacity:`.15`})]});case`button`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`5`,width:`14`,height:`6`,rx:`2`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`6.5`,y:`7.5`,width:`7`,height:`1`,rx:`.5`,fill:J,opacity:`.25`})]});case`input`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`4`,width:`5.5`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`2`,y:`6.5`,width:`16`,height:`5.5`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`3.5`,y:`8.5`,width:`7`,height:`1`,rx:`.5`,fill:J,opacity:`.12`})]});case`search`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`4.5`,width:`16`,height:`7`,rx:`3.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`circle`,{cx:`6`,cy:`8`,r:`2`,stroke:J,strokeWidth:Y,opacity:`.3`}),(0,o.jsx)(`line`,{x1:`7.5`,y1:`9.5`,x2:`9`,y2:`11`,stroke:J,strokeWidth:Y,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`9.5`,y:`7.5`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.12`})]});case`form`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`1.5`,width:`5.5`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`2`,y:`3.5`,width:`16`,height:`3`,rx:`.75`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`2`,y:`8`,width:`7`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`2`,y:`10`,width:`16`,height:`3`,rx:`.75`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`12`,y:`14`,width:`6`,height:`2`,rx:`.75`,stroke:J,strokeWidth:Y})]});case`tabs`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:`5`,width:`18`,height:`10`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`1`,y:`2`,width:`6`,height:`3.5`,rx:`.75`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`2.5`,y:`3.25`,width:`3`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`7`,y:`2`,width:`6`,height:`3.5`,rx:`.75`,stroke:J,strokeWidth:Y})]});case`dropdown`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`2`,width:`16`,height:`4`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`3.5`,y:`3.5`,width:`7`,height:`1`,rx:`.5`,fill:J,opacity:`.2`}),(0,o.jsx)(`path`,{d:`M15 3.5l1.5 1.5L18 3.5`,stroke:J,strokeWidth:Y,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`2`,y:`7`,width:`16`,height:`7`,rx:`1`,stroke:J,strokeWidth:Y,strokeDasharray:`2 1`,opacity:`.3`})]});case`toggle`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`4`,y:`5`,width:`12`,height:`6`,rx:`3`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`circle`,{cx:`13`,cy:`8`,r:`2`,fill:J,opacity:`.3`})]});case`avatar`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`circle`,{cx:`10`,cy:`8`,r:`6`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`circle`,{cx:`10`,cy:`6.5`,r:`2`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`path`,{d:`M6.5 13c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5`,stroke:J,strokeWidth:Y})]});case`badge`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`5`,width:`14`,height:`6`,rx:`3`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`6`,y:`7.5`,width:`8`,height:`1`,rx:`.5`,fill:J,opacity:`.25`})]});case`breadcrumb`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1.5`,y:`7`,width:`3.5`,height:`1`,rx:`.5`,fill:J,opacity:`.3`}),(0,o.jsx)(`path`,{d:`M6.5 7l1 1-1 1`,stroke:J,strokeWidth:Y,opacity:`.2`}),(0,o.jsx)(`rect`,{x:`9`,y:`7`,width:`3.5`,height:`1`,rx:`.5`,fill:J,opacity:`.2`}),(0,o.jsx)(`path`,{d:`M14 7l1 1-1 1`,stroke:J,strokeWidth:Y,opacity:`.2`}),(0,o.jsx)(`rect`,{x:`16.5`,y:`7`,width:`2`,height:`1`,rx:`.5`,fill:J,opacity:`.15`})]});case`pagination`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`5.5`,width:`3.5`,height:`5`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`6.5`,y:`5.5`,width:`3.5`,height:`5`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`11`,y:`5.5`,width:`3.5`,height:`5`,rx:`1`,fill:J,opacity:`.15`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`15.5`,y:`5.5`,width:`3.5`,height:`5`,rx:`1`,stroke:J,strokeWidth:Y})]});case`progress`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`7`,width:`16`,height:`2`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`2`,y:`7`,width:`10`,height:`2`,rx:`1`,fill:J,opacity:`.2`})]});case`toast`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`4`,width:`16`,height:`8`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`circle`,{cx:`5`,cy:`8`,r:`1.5`,stroke:J,strokeWidth:Y,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`8`,y:`6.5`,width:`7`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`8`,y:`9`,width:`5`,height:`1`,rx:`.5`,fill:J,opacity:`.12`})]});case`tooltip`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`3`,width:`14`,height:`7`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`5.5`,y:`5.5`,width:`9`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`path`,{d:`M9 10l1 2.5 1-2.5`,stroke:J,strokeWidth:Y})]});case`pricing`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`1`,width:`16`,height:`14`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`6`,y:`3`,width:`8`,height:`1.5`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`7`,y:`5.5`,width:`6`,height:`2`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`5`,y:`9`,width:`10`,height:`1`,rx:`.5`,fill:J,opacity:`.1`}),(0,o.jsx)(`rect`,{x:`5`,y:`11`,width:`10`,height:`1`,rx:`.5`,fill:J,opacity:`.1`}),(0,o.jsx)(`rect`,{x:`6`,y:`13`,width:`8`,height:`1.5`,rx:`.5`,fill:J,opacity:`.2`})]});case`testimonial`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`1`,width:`16`,height:`14`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`text`,{x:`4`,y:`5.5`,fontSize:`4`,fill:J,opacity:`.2`,fontFamily:`serif`,children:`“`}),(0,o.jsx)(`rect`,{x:`4`,y:`7`,width:`12`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`4`,y:`9`,width:`9`,height:`1`,rx:`.5`,fill:J,opacity:`.12`}),(0,o.jsx)(`circle`,{cx:`5.5`,cy:`12.5`,r:`1.5`,stroke:J,strokeWidth:Y,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`8`,y:`12`,width:`5`,height:`1`,rx:`.5`,fill:J,opacity:`.15`})]});case`cta`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:`2`,width:`18`,height:`12`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`5`,y:`4.5`,width:`10`,height:`1.5`,rx:`.5`,fill:J,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`6`,y:`7.5`,width:`8`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`7`,y:`10`,width:`6`,height:`2.5`,rx:`1`,stroke:J,strokeWidth:Y})]});case`alert`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`4`,width:`16`,height:`8`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`circle`,{cx:`6`,cy:`8`,r:`2`,stroke:J,strokeWidth:Y,opacity:`.3`}),(0,o.jsx)(`line`,{x1:`6`,y1:`7`,x2:`6`,y2:`8.5`,stroke:J,strokeWidth:`0.6`,opacity:`.5`}),(0,o.jsx)(`circle`,{cx:`6`,cy:`9.3`,r:`.3`,fill:J,opacity:`.5`}),(0,o.jsx)(`rect`,{x:`9.5`,y:`7`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.2`})]});case`banner`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:`5`,width:`18`,height:`6`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`4`,y:`7.5`,width:`8`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`14`,y:`7`,width:`3.5`,height:`2`,rx:`.75`,stroke:J,strokeWidth:Y})]});case`stat`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`2`,width:`14`,height:`12`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`6`,y:`4.5`,width:`8`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`5`,y:`7`,width:`10`,height:`2.5`,rx:`.5`,fill:J,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`7`,y:`11`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.12`})]});case`stepper`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`circle`,{cx:`4`,cy:`8`,r:`2`,fill:J,opacity:`.2`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`line`,{x1:`6`,y1:`8`,x2:`8`,y2:`8`,stroke:J,strokeWidth:`.4`,opacity:`.3`}),(0,o.jsx)(`circle`,{cx:`10`,cy:`8`,r:`2`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`line`,{x1:`12`,y1:`8`,x2:`14`,y2:`8`,stroke:J,strokeWidth:`.4`,opacity:`.3`}),(0,o.jsx)(`circle`,{cx:`16`,cy:`8`,r:`2`,stroke:J,strokeWidth:Y})]});case`tag`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`5`,width:`14`,height:`6`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`5.5`,y:`7.5`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`line`,{x1:`14`,y1:`6.5`,x2:`15.5`,y2:`9.5`,stroke:J,strokeWidth:Y,opacity:`.2`}),(0,o.jsx)(`line`,{x1:`15.5`,y1:`6.5`,x2:`14`,y2:`9.5`,stroke:J,strokeWidth:Y,opacity:`.2`})]});case`rating`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`path`,{d:`M4 5.5l1 2 2.2.3-1.6 1.5.4 2.2L4 10.3l-2 1.2.4-2.2L.8 7.8 3 7.5z`,fill:J,opacity:`.25`}),(0,o.jsx)(`path`,{d:`M10 5.5l1 2 2.2.3-1.6 1.5.4 2.2L10 10.3l-2 1.2.4-2.2L6.8 7.8 9 7.5z`,fill:J,opacity:`.25`}),(0,o.jsx)(`path`,{d:`M16 5.5l1 2 2.2.3-1.6 1.5.4 2.2L16 10.3l-2 1.2.4-2.2-1.6-1.5 2.2-.3z`,stroke:J,strokeWidth:Y,opacity:`.25`})]});case`map`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`2`,width:`16`,height:`12`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`line`,{x1:`2`,y1:`6`,x2:`18`,y2:`10`,stroke:J,strokeWidth:`.3`,opacity:`.15`}),(0,o.jsx)(`line`,{x1:`7`,y1:`2`,x2:`11`,y2:`14`,stroke:J,strokeWidth:`.3`,opacity:`.15`}),(0,o.jsx)(`path`,{d:`M10 5c-1.7 0-3 1.3-3 3 0 2.5 3 5 3 5s3-2.5 3-5c0-1.7-1.3-3-3-3z`,fill:J,opacity:`.15`,stroke:J,strokeWidth:Y})]});case`timeline`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`line`,{x1:`5`,y1:`2`,x2:`5`,y2:`14`,stroke:J,strokeWidth:`.4`,opacity:`.25`}),(0,o.jsx)(`circle`,{cx:`5`,cy:`4`,r:`1.5`,fill:J,opacity:`.2`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`8`,y:`3`,width:`8`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`circle`,{cx:`5`,cy:`8.5`,r:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`8`,y:`7.5`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`circle`,{cx:`5`,cy:`13`,r:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`8`,y:`12`,width:`7`,height:`1`,rx:`.5`,fill:J,opacity:`.15`})]});case`fileUpload`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`2`,width:`14`,height:`12`,rx:`1.5`,stroke:J,strokeWidth:Y,strokeDasharray:`2 1`}),(0,o.jsx)(`path`,{d:`M10 10V5.5m0 0L7.5 8m2.5-2.5L12.5 8`,stroke:J,strokeWidth:Y,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`7`,y:`11.5`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.15`})]});case`codeBlock`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`2`,width:`16`,height:`12`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`circle`,{cx:`4`,cy:`4`,r:`.6`,fill:J,opacity:`.3`}),(0,o.jsx)(`circle`,{cx:`5.5`,cy:`4`,r:`.6`,fill:J,opacity:`.3`}),(0,o.jsx)(`circle`,{cx:`7`,cy:`4`,r:`.6`,fill:J,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`4`,y:`7`,width:`7`,height:`1`,rx:`.5`,fill:J,opacity:`.2`}),(0,o.jsx)(`rect`,{x:`6`,y:`9`,width:`5`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`4`,y:`11`,width:`8`,height:`1`,rx:`.5`,fill:J,opacity:`.12`})]});case`calendar`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`3`,width:`16`,height:`12`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`line`,{x1:`2`,y1:`6.5`,x2:`18`,y2:`6.5`,stroke:J,strokeWidth:`.4`,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`5`,y:`4`,width:`1`,height:`1.5`,rx:`.3`,fill:J,opacity:`.2`}),(0,o.jsx)(`rect`,{x:`14`,y:`4`,width:`1`,height:`1.5`,rx:`.3`,fill:J,opacity:`.2`}),(0,o.jsx)(`circle`,{cx:`7`,cy:`9`,r:`.6`,fill:J,opacity:`.2`}),(0,o.jsx)(`circle`,{cx:`10`,cy:`9`,r:`.6`,fill:J,opacity:`.2`}),(0,o.jsx)(`circle`,{cx:`13`,cy:`9`,r:`.6`,fill:J,opacity:`.3`}),(0,o.jsx)(`circle`,{cx:`7`,cy:`12`,r:`.6`,fill:J,opacity:`.2`}),(0,o.jsx)(`circle`,{cx:`10`,cy:`12`,r:`.6`,fill:J,opacity:`.2`})]});case`notification`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`3`,width:`16`,height:`10`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`circle`,{cx:`5.5`,cy:`8`,r:`2`,stroke:J,strokeWidth:Y,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`9`,y:`6`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`9`,y:`8.5`,width:`4.5`,height:`1`,rx:`.5`,fill:J,opacity:`.12`}),(0,o.jsx)(`circle`,{cx:`16.5`,cy:`4.5`,r:`1.5`,fill:J,opacity:`.25`})]});case`productCard`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`1`,width:`14`,height:`14`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`3`,y:`1`,width:`14`,height:`6`,rx:`1`,fill:J,opacity:`.04`}),(0,o.jsx)(`rect`,{x:`5`,y:`8.5`,width:`7`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`5`,y:`10.5`,width:`4`,height:`1.5`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`12`,y:`12`,width:`4`,height:`2`,rx:`.75`,stroke:J,strokeWidth:Y})]});case`profile`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`circle`,{cx:`10`,cy:`5`,r:`3`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`5`,y:`10`,width:`10`,height:`1.5`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`7`,y:`12.5`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.12`})]});case`drawer`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`9`,y:`1`,width:`10`,height:`14`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`10.5`,y:`4`,width:`5`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`10.5`,y:`6.5`,width:`7`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`10.5`,y:`9`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`1`,y:`1`,width:`7`,height:`14`,rx:`1`,stroke:J,strokeWidth:Y,opacity:`.15`})]});case`popover`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`2`,width:`14`,height:`9`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`5`,y:`4.5`,width:`8`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`5`,y:`7`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`path`,{d:`M9 11l1 2.5 1-2.5`,stroke:J,strokeWidth:Y})]});case`logo`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`3`,width:`10`,height:`10`,rx:`2`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`path`,{d:`M5 9.5l2-4 2 4`,stroke:J,strokeWidth:Y,opacity:`.3`}),(0,o.jsx)(`rect`,{x:`14`,y:`6`,width:`4`,height:`1`,rx:`.5`,fill:J,opacity:`.2`}),(0,o.jsx)(`rect`,{x:`14`,y:`8.5`,width:`3`,height:`1`,rx:`.5`,fill:J,opacity:`.12`})]});case`faq`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`text`,{x:`2.5`,y:`5.5`,fontSize:`4`,fill:J,opacity:`.3`,fontWeight:`bold`,children:`?`}),(0,o.jsx)(`rect`,{x:`7`,y:`3`,width:`10`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`7`,y:`5.5`,width:`8`,height:`1`,rx:`.5`,fill:J,opacity:`.12`}),(0,o.jsx)(`text`,{x:`2.5`,y:`11.5`,fontSize:`4`,fill:J,opacity:`.3`,fontWeight:`bold`,children:`?`}),(0,o.jsx)(`rect`,{x:`7`,y:`9`,width:`9`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`7`,y:`11.5`,width:`7`,height:`1`,rx:`.5`,fill:J,opacity:`.12`})]});case`gallery`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1.5`,y:`1.5`,width:`5`,height:`5`,rx:`.75`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`7.5`,y:`1.5`,width:`5`,height:`5`,rx:`.75`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`13.5`,y:`1.5`,width:`5`,height:`5`,rx:`.75`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`1.5`,y:`9.5`,width:`5`,height:`5`,rx:`.75`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`7.5`,y:`9.5`,width:`5`,height:`5`,rx:`.75`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`13.5`,y:`9.5`,width:`5`,height:`5`,rx:`.75`,stroke:J,strokeWidth:Y})]});case`checkbox`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`5`,y:`4`,width:`8`,height:`8`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`path`,{d:`M7.5 8l1.5 1.5 3-3`,stroke:J,strokeWidth:Y,opacity:`.35`})]});case`radio`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`circle`,{cx:`10`,cy:`8`,r:`4`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`circle`,{cx:`10`,cy:`8`,r:`2`,fill:J,opacity:`.3`})]});case`slider`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`7.5`,width:`16`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`2`,y:`7.5`,width:`10`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`circle`,{cx:`12`,cy:`8`,r:`2.5`,stroke:J,strokeWidth:Y})]});case`datePicker`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`1`,width:`16`,height:`5`,rx:`1`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`3.5`,y:`3`,width:`5`,height:`1`,rx:`.5`,fill:J,opacity:`.2`}),(0,o.jsx)(`rect`,{x:`14`,y:`2.5`,width:`2.5`,height:`2`,rx:`.5`,fill:J,opacity:`.12`}),(0,o.jsx)(`rect`,{x:`2`,y:`7`,width:`16`,height:`8`,rx:`1`,stroke:J,strokeWidth:Y,strokeDasharray:`2 1`,opacity:`.3`}),(0,o.jsx)(`circle`,{cx:`6`,cy:`10`,r:`.6`,fill:J,opacity:`.2`}),(0,o.jsx)(`circle`,{cx:`10`,cy:`10`,r:`.6`,fill:J,opacity:`.3`}),(0,o.jsx)(`circle`,{cx:`14`,cy:`10`,r:`.6`,fill:J,opacity:`.2`}),(0,o.jsx)(`circle`,{cx:`6`,cy:`13`,r:`.6`,fill:J,opacity:`.2`}),(0,o.jsx)(`circle`,{cx:`10`,cy:`13`,r:`.6`,fill:J,opacity:`.2`})]});case`skeleton`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`2`,width:`16`,height:`3`,rx:`1`,fill:J,opacity:`.08`}),(0,o.jsx)(`rect`,{x:`2`,y:`7`,width:`10`,height:`2`,rx:`.75`,fill:J,opacity:`.08`}),(0,o.jsx)(`rect`,{x:`2`,y:`11`,width:`13`,height:`2`,rx:`.75`,fill:J,opacity:`.08`})]});case`chip`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1.5`,y:`5`,width:`10`,height:`6`,rx:`3`,fill:J,opacity:`.08`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`4`,y:`7.5`,width:`4`,height:`1`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`line`,{x1:`9.5`,y1:`6.5`,x2:`10.5`,y2:`9.5`,stroke:J,strokeWidth:Y,opacity:`.2`}),(0,o.jsx)(`line`,{x1:`10.5`,y1:`6.5`,x2:`9.5`,y2:`9.5`,stroke:J,strokeWidth:Y,opacity:`.2`}),(0,o.jsx)(`rect`,{x:`13`,y:`5`,width:`5.5`,height:`6`,rx:`3`,stroke:J,strokeWidth:Y,opacity:`.25`})]});case`icon`:return(0,o.jsx)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:(0,o.jsx)(`path`,{d:`M10 3l1.5 3 3.5.5-2.5 2.5.5 3.5L10 11l-3 1.5.5-3.5L5 6.5l3.5-.5z`,stroke:J,strokeWidth:Y,opacity:`.3`})});case`spinner`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`circle`,{cx:`10`,cy:`8`,r:`5`,stroke:J,strokeWidth:Y,opacity:`.12`}),(0,o.jsx)(`path`,{d:`M10 3a5 5 0 0 1 5 5`,stroke:J,strokeWidth:Y,opacity:`.35`,strokeLinecap:`round`})]});case`feature`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`2`,width:`5`,height:`5`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`path`,{d:`M4.5 3.5v3m-1.5-1.5h3`,stroke:J,strokeWidth:Y,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`9`,y:`2.5`,width:`8`,height:`1.5`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`9`,y:`5.5`,width:`6`,height:`1`,rx:`.5`,fill:J,opacity:`.12`}),(0,o.jsx)(`rect`,{x:`2`,y:`10`,width:`5`,height:`5`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`9`,y:`10.5`,width:`7`,height:`1.5`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`9`,y:`13.5`,width:`5`,height:`1`,rx:`.5`,fill:J,opacity:`.12`})]});case`team`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`circle`,{cx:`5`,cy:`5`,r:`2.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`2.5`,y:`9`,width:`5`,height:`1`,rx:`.5`,fill:J,opacity:`.2`}),(0,o.jsx)(`circle`,{cx:`15`,cy:`5`,r:`2.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`12.5`,y:`9`,width:`5`,height:`1`,rx:`.5`,fill:J,opacity:`.2`}),(0,o.jsx)(`circle`,{cx:`10`,cy:`5`,r:`2.5`,stroke:J,strokeWidth:Y,opacity:`.5`}),(0,o.jsx)(`rect`,{x:`7.5`,y:`9`,width:`5`,height:`1`,rx:`.5`,fill:J,opacity:`.15`}),(0,o.jsx)(`rect`,{x:`4`,y:`12`,width:`12`,height:`1`,rx:`.5`,fill:J,opacity:`.1`})]});case`login`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`3`,y:`1`,width:`14`,height:`14`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`6`,y:`3`,width:`8`,height:`1.5`,rx:`.5`,fill:J,opacity:`.25`}),(0,o.jsx)(`rect`,{x:`5`,y:`5.5`,width:`10`,height:`3`,rx:`.75`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`5`,y:`9.5`,width:`10`,height:`3`,rx:`.75`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`6.5`,y:`13.5`,width:`7`,height:`2`,rx:`.75`,fill:J,opacity:`.2`})]});case`contact`:return(0,o.jsxs)(`svg`,{viewBox:`0 0 20 16`,width:`20`,height:`16`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`2`,y:`1`,width:`16`,height:`14`,rx:`1.5`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`4`,y:`3`,width:`5`,height:`1`,rx:`.5`,fill:J,opacity:`.2`}),(0,o.jsx)(`rect`,{x:`4`,y:`5`,width:`12`,height:`2.5`,rx:`.75`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`4`,y:`8.5`,width:`12`,height:`4`,rx:`.75`,stroke:J,strokeWidth:Y}),(0,o.jsx)(`rect`,{x:`11`,y:`13.5`,width:`5`,height:`1.5`,rx:`.5`,fill:J,opacity:`.2`})]});default:return null}}function Nn({activeType:e,onSelect:t,onDragStart:n,scrollRef:r,fadeClass:i,blankCanvas:a}){return(0,o.jsx)(`div`,{ref:r,className:`${q.placeScroll} ${i||``}`,children:ft.map(r=>(0,o.jsxs)(`div`,{className:q.paletteSection,children:[(0,o.jsx)(`div`,{className:q.paletteSectionTitle,children:r.section}),r.items.map(r=>(0,o.jsxs)(`button`,{type:`button`,"aria-pressed":e===r.type,className:`${q.paletteItem} ${e===r.type?q.active:``} ${a?q.wireframe:``}`,onClick:()=>t(r.type),onMouseDown:e=>{e.button===0&&n(r.type,e)},children:[(0,o.jsx)(`span`,{className:q.paletteItemIcon,"aria-hidden":`true`,children:(0,o.jsx)(Mn,{type:r.type})}),(0,o.jsx)(`span`,{className:q.paletteItemLabel,children:r.label})]},r.type))]},r.section))})}function Pn({value:e,suffix:t}){let[n,r]=(0,i.useState)(null),[a,s]=(0,i.useState)(t),[c,l]=(0,i.useState)(`up`),u=(0,i.useRef)(e),d=(0,i.useRef)(t),f=(0,i.useRef)(),p=n!==null&&a!==t;return(0,i.useEffect)(()=>{if(e!==u.current){if(e===0){u.current=e,d.current=t,r(null);return}l(e>u.current?`up`:`down`),r(u.current),s(d.current),u.current=e,d.current=t,clearTimeout(f.current),f.current=m(()=>r(null),250)}else d.current=t},[e,t]),n===null?(0,o.jsxs)(o.Fragment,{children:[e,t?` ${t}`:``]}):p?(0,o.jsxs)(`span`,{className:q.rollingWrap,children:[(0,o.jsxs)(`span`,{style:{visibility:`hidden`},children:[e,` `,t]}),(0,o.jsxs)(`span`,{className:`${q.rollingNum} ${c===`up`?q.exitUp:q.exitDown}`,children:[n,` `,a]},`o${n}-${e}`),(0,o.jsxs)(`span`,{className:`${q.rollingNum} ${c===`up`?q.enterUp:q.enterDown}`,children:[e,` `,t]},`n${e}`)]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(`span`,{className:q.rollingWrap,children:[(0,o.jsx)(`span`,{style:{visibility:`hidden`},children:e}),(0,o.jsx)(`span`,{className:`${q.rollingNum} ${c===`up`?q.exitUp:q.exitDown}`,children:n},`o${n}-${e}`),(0,o.jsx)(`span`,{className:`${q.rollingNum} ${c===`up`?q.enterUp:q.enterDown}`,children:e},`n${e}`)]}),t?` ${t}`:``]})}function Fn({activeType:e,onSelect:t,isDarkMode:n,sectionCount:r,onDetectSections:a,visible:s,onExited:c,placementCount:l,onClearPlacements:u,onDragStart:d,blankCanvas:f,onBlankCanvasChange:p,wireframePurpose:h,onWireframePurposeChange:_,Tooltip:v}){let{ref:y,mounted:b}=An(s,{onExited:c}),[x,S]=(0,i.useState)(!1),[C,w]=(0,i.useState)(!0),T=(0,i.useRef)(0),E=(0,i.useRef)(``),ee=(0,i.useRef)(null),[D,O]=(0,i.useState)(``),k=l>0||r>0,te=l+r;if(te>0&&(T.current=te,E.current=f?te===1?`Component`:`Components`:te===1?`Change`:`Changes`),(0,i.useEffect)(()=>{if(k)x?w(!1):(w(!0),S(!0),g(()=>{g(()=>{w(!1)})}));else{w(!0);let e=m(()=>S(!1),300);return()=>clearTimeout(e)}},[k]),(0,i.useEffect)(()=>{if(!s)return;let e=ee.current;if(!e)return;let t=()=>O(jn(e));e.addEventListener(`scroll`,t,{passive:!0});let n=new ResizeObserver(t);return n.observe(e),()=>{e.removeEventListener(`scroll`,t),n.disconnect()}},[s]),!b)return null;let ne=[];return l>0&&ne.push(`placed`),r>0&&ne.push(`captured`),(0,o.jsxs)(`div`,{className:`${q.palette} ${n?``:q.light}`,ref:e=>{y.current=e,e?.toggleAttribute(`inert`,!s)},"aria-hidden":!s,"data-feedback-toolbar":!0,"data-agentation-palette":!0,onClick:e=>e.stopPropagation(),onMouseDown:e=>e.stopPropagation(),children:[(0,o.jsxs)(`div`,{className:q.paletteHeader,children:[(0,o.jsx)(`div`,{className:q.paletteHeaderTitle,children:`Layout Mode`}),(0,o.jsxs)(`div`,{className:q.paletteHeaderDesc,children:[`Rearrange and resize existing elements, add new components, and explore layout ideas. Agent results may vary.`,` `,(0,o.jsx)(`a`,{href:`https://agentation.com/features#layout-mode`,target:`_blank`,rel:`noopener noreferrer`,children:`Learn more.`})]})]}),(0,o.jsxs)(`button`,{type:`button`,"aria-pressed":f,className:`${q.canvasToggle} ${f?q.active:``}`,onClick:()=>p(!f),children:[(0,o.jsx)(`span`,{className:q.canvasToggleIcon,"aria-hidden":`true`,children:(0,o.jsxs)(`svg`,{viewBox:`0 0 14 14`,width:`14`,height:`14`,fill:`none`,children:[(0,o.jsx)(`rect`,{x:`1`,y:`1`,width:`12`,height:`12`,rx:`2`,stroke:`currentColor`,strokeWidth:`1`}),(0,o.jsx)(`circle`,{cx:`4.5`,cy:`4.5`,r:`0.8`,fill:`currentColor`,opacity:`.6`}),(0,o.jsx)(`circle`,{cx:`7`,cy:`4.5`,r:`0.8`,fill:`currentColor`,opacity:`.6`}),(0,o.jsx)(`circle`,{cx:`9.5`,cy:`4.5`,r:`0.8`,fill:`currentColor`,opacity:`.6`}),(0,o.jsx)(`circle`,{cx:`4.5`,cy:`7`,r:`0.8`,fill:`currentColor`,opacity:`.6`}),(0,o.jsx)(`circle`,{cx:`7`,cy:`7`,r:`0.8`,fill:`currentColor`,opacity:`.6`}),(0,o.jsx)(`circle`,{cx:`9.5`,cy:`7`,r:`0.8`,fill:`currentColor`,opacity:`.6`}),(0,o.jsx)(`circle`,{cx:`4.5`,cy:`9.5`,r:`0.8`,fill:`currentColor`,opacity:`.6`}),(0,o.jsx)(`circle`,{cx:`7`,cy:`9.5`,r:`0.8`,fill:`currentColor`,opacity:`.6`}),(0,o.jsx)(`circle`,{cx:`9.5`,cy:`9.5`,r:`0.8`,fill:`currentColor`,opacity:`.6`})]})}),(0,o.jsx)(`span`,{className:q.canvasToggleLabel,children:`Wireframe New Page`})]}),(0,o.jsx)(`div`,{className:`${q.wireframePurposeWrap} ${f?``:q.collapsed}`,"aria-hidden":!f,ref:e=>{e?.toggleAttribute(`inert`,!f)},children:(0,o.jsx)(`div`,{className:q.wireframePurposeInner,children:(0,o.jsx)(`textarea`,{className:q.wireframePurposeInput,placeholder:`Describe this page to provide additional context for your agent.`,value:h,onChange:e=>_(e.target.value),rows:2})})}),(0,o.jsx)(Nn,{activeType:e,onSelect:t,onDragStart:d,scrollRef:ee,fadeClass:D,blankCanvas:f}),x&&(0,o.jsx)(`div`,{className:`${q.paletteFooterWrap} ${C?q.footerHidden:``}`,children:(0,o.jsx)(`div`,{className:q.paletteFooterInner,children:(0,o.jsx)(`div`,{className:q.paletteFooterInnerContent,children:(0,o.jsxs)(`div`,{className:q.paletteFooter,children:[(0,o.jsx)(`span`,{className:q.paletteFooterCount,children:(0,o.jsx)(Pn,{value:T.current,suffix:E.current})}),(0,o.jsx)(`button`,{className:q.paletteFooterClear,onClick:u,children:`Clear`})]})})})})]})}var In=new Set([`nav`,`header`,`main`,`section`,`article`,`footer`,`aside`]),Ln={banner:`Header`,navigation:`Navigation`,main:`Main Content`,contentinfo:`Footer`,complementary:`Sidebar`,region:`Section`},Rn={nav:`Navigation`,header:`Header`,main:`Main Content`,section:`Section`,article:`Article`,footer:`Footer`,aside:`Sidebar`},zn=new Set([`script`,`style`,`noscript`,`link`,`meta`]),Bn=40;function Vn(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){let e=window.getComputedStyle(t).position;if(e===`fixed`||e===`sticky`)return!0;t=t.parentElement}return!1}function Hn(e){let t=e.tagName.toLowerCase();if([`nav`,`header`,`footer`,`main`].includes(t)&&document.querySelectorAll(t).length===1)return t;if(e.id)return`#${CSS.escape(e.id)}`;if(e.className&&typeof e.className==`string`){let n=e.className.split(/\s+/).filter(e=>e.length>0).find(e=>e.length>2&&!/^[a-zA-Z0-9]{6,}$/.test(e)&&!/^[a-z]{1,2}$/.test(e));if(n){let e=`${t}.${CSS.escape(n)}`;if(document.querySelectorAll(e).length===1)return e}}let n=e.parentElement;if(n){let r=Array.from(n.children).indexOf(e)+1;return`${n===document.body?`body`:Hn(n)} > ${t}:nth-child(${r})`}return t}function Un(e){let t=e.tagName.toLowerCase(),n=e.getAttribute(`aria-label`);if(n)return n;let r=e.getAttribute(`role`);if(r&&Ln[r])return Ln[r];if(Rn[t])return Rn[t];let i=e.querySelector(`h1, h2, h3, h4, h5, h6`);if(i){let e=i.textContent?.trim();if(e&&e.length<=50)return e;if(e)return e.slice(0,47)+`...`}let{name:a}=ue(e);return a.charAt(0).toUpperCase()+a.slice(1)}function Wn(e){let t=e.className;return typeof t!=`string`||!t?null:t.split(/\s+/).map(e=>e.replace(/[_][a-zA-Z0-9]{5,}.*$/,``)).find(e=>e.length>2&&!/^[a-z]{1,2}$/.test(e))||null}function Gn(e){let t=e.textContent?.trim();if(!t)return null;let n=t.replace(/\s+/g,` `);return n.length<=30?n:n.slice(0,30)+`…`}function Kn(){let e=document.querySelector(`main`)||document.body,t=Array.from(e.children),n=t;e!==document.body&&t.length<3&&(n=Array.from(document.body.children));let r=[];return n.forEach((e,t)=>{if(!(e instanceof HTMLElement))return;let n=e.tagName.toLowerCase();if(zn.has(n)||e.hasAttribute(`data-feedback-toolbar`)||e.closest(`[data-feedback-toolbar]`))return;let i=window.getComputedStyle(e);if(i.display===`none`||i.visibility===`hidden`)return;let a=e.getBoundingClientRect();if(a.height<Bn)return;let o=In.has(n),s=e.getAttribute(`role`)&&Ln[e.getAttribute(`role`)],c=n===`div`&&a.height>=60;if(!o&&!s&&!c)return;let l=window.scrollY,u=Vn(e),d={x:a.x,y:u?a.y:a.y+l,width:a.width,height:a.height};r.push({id:`rs-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,label:Un(e),tagName:n,selector:Hn(e),role:e.getAttribute(`role`),className:Wn(e),textSnippet:Gn(e),originalRect:d,currentRect:{...d},originalIndex:t,isFixed:u})}),r}function qn(e){let t=window.scrollY,n=e.getBoundingClientRect(),r=Vn(e),i={x:n.x,y:r?n.y:n.y+t,width:n.width,height:n.height},a=e.parentElement,o=0;return a&&(o=Array.from(a.children).indexOf(e)),{id:`rs-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,label:Un(e),tagName:e.tagName.toLowerCase(),selector:Hn(e),role:e.getAttribute(`role`),className:Wn(e),textSnippet:Gn(e),originalRect:i,currentRect:{...i},originalIndex:o,isFixed:r}}var Jn={bg:`rgba(59, 130, 246, 0.08)`,border:`rgba(59, 130, 246, 0.5)`,pill:`#3b82f6`},Yn=[`nw`,`n`,`ne`,`e`,`se`,`s`,`sw`,`w`],Xn=24,Zn=16,Qn=5;function $n(e,t,n,r){let i=1/0,a=1/0,o=e.x,s=e.x+e.width,c=e.x+e.width/2,l=e.y,u=e.y+e.height,d=e.y+e.height/2,f=[];for(let e of t)n.has(e.id)||f.push(e.currentRect);r&&f.push(...r);for(let e of f){let t=e.x,n=e.x+e.width,r=e.x+e.width/2,f=e.y,p=e.y+e.height,m=e.y+e.height/2;for(let e of[o,s,c])for(let a of[t,n,r]){let t=a-e;Math.abs(t)<Qn&&Math.abs(t)<Math.abs(i)&&(i=t)}for(let e of[l,u,d])for(let t of[f,p,m]){let n=t-e;Math.abs(n)<Qn&&Math.abs(n)<Math.abs(a)&&(a=n)}}let p=Math.abs(i)<Qn?i:0,m=Math.abs(a)<Qn?a:0,h=[],g=new Set,_=o+p,v=s+p,y=c+p,b=l+m,x=u+m,S=d+m;for(let e of f){let t=e.x,n=e.x+e.width,r=e.x+e.width/2,i=e.y,a=e.y+e.height,o=e.y+e.height/2;for(let e of[t,r,n])for(let t of[_,y,v])if(Math.abs(t-e)<.5){let t=`x:${Math.round(e)}`;g.has(t)||(g.add(t),h.push({axis:`x`,pos:e}))}for(let e of[i,o,a])for(let t of[b,S,x])if(Math.abs(t-e)<.5){let t=`y:${Math.round(e)}`;g.has(t)||(g.add(t),h.push({axis:`y`,pos:e}))}}return{dx:p,dy:m,guides:h}}var er=new Set([`script`,`style`,`noscript`,`link`,`meta`,`br`,`hr`]);function tr(e){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){if(t.closest(`[data-feedback-toolbar]`))return null;if(er.has(t.tagName.toLowerCase())){t=t.parentElement;continue}let e=t.getBoundingClientRect();if(e.width>=Zn&&e.height>=Zn)return t;t=t.parentElement}return null}function nr({rearrangeState:e,onChange:t,isDarkMode:n,exiting:r,className:a,blankCanvas:s,extraSnapRects:c,onSelectionChange:l,deselectSignal:u,onDragMove:d,onDragEnd:f,clearing:p}){let{sections:h}=e,g=(0,i.useRef)(e);g.current=e;let[_,v]=(0,i.useState)(new Set);(0,i.useEffect)(()=>{p&&v(new Set)},[p]);let y=(0,i.useRef)(u);(0,i.useEffect)(()=>{u!==y.current&&(y.current=u,v(new Set))},[u]);let[b,x]=(0,i.useState)(null),[S,C]=(0,i.useState)(!1),w=(0,i.useRef)(!1),T=(0,i.useCallback)(e=>{let t=h.find(t=>t.id===e);t&&(w.current=!!t.note,x(e),C(!1))},[h]),E=(0,i.useCallback)(()=>{b&&(C(!0),m(()=>{x(null),C(!1)},150))},[b]),ee=(0,i.useCallback)(n=>{b&&(t({...e,sections:h.map(e=>e.id===b?{...e,note:n.trim()||void 0}:e)}),E())},[b,h,e,t,E]);(0,i.useEffect)(()=>{r&&b&&E()},[r]);let[D,O]=(0,i.useState)(new Set),k=(0,i.useRef)(new Map),[te,ne]=(0,i.useState)(null),[A,re]=(0,i.useState)(null),[ie,ae]=(0,i.useState)([]),[oe,se]=(0,i.useState)(0),ce=(0,i.useRef)(null),j=(0,i.useRef)(new Set),le=(0,i.useRef)(new Map),[M,ue]=(0,i.useState)(new Map),[de,fe]=(0,i.useState)(new Map),pe=(0,i.useRef)(new Set),me=(0,i.useRef)(new Map),he=(0,i.useRef)(l);he.current=l;let N=(0,i.useRef)(d);N.current=d;let ge=(0,i.useRef)(f);ge.current=f,(0,i.useEffect)(()=>{s&&v(new Set)},[s]);let[_e,ve]=(0,i.useState)(()=>!e.sections.some(e=>{let t=e.originalRect,n=e.currentRect;return Math.abs(t.x-n.x)>1||Math.abs(t.y-n.y)>1||Math.abs(t.width-n.width)>1||Math.abs(t.height-n.height)>1}));(0,i.useEffect)(()=>{if(!_e){let e=m(()=>ve(!0),380);return()=>clearTimeout(e)}},[]);let ye=(0,i.useRef)(new Set);(0,i.useEffect)(()=>{ye.current=new Set(h.map(e=>e.selector))},[h]),(0,i.useEffect)(()=>{let e=()=>se(window.scrollY);return e(),window.addEventListener(`scroll`,e,{passive:!0}),window.addEventListener(`resize`,e,{passive:!0}),()=>{window.removeEventListener(`scroll`,e),window.removeEventListener(`resize`,e)}},[]),(0,i.useEffect)(()=>{let e=e=>{if(ce.current){ne(null);return}let t=document.elementFromPoint(e.clientX,e.clientY);if(!t){ne(null);return}if(t.closest(`[data-feedback-toolbar]`)){ne(null);return}if(t.closest(`[data-design-placement]`)){ne(null);return}if(t.closest(`[data-annotation-popup]`)){ne(null);return}let n=tr(t);if(!n){ne(null);return}for(let e of ye.current)try{let t=document.querySelector(e);if(t&&(t===n||n.contains(t))){ne(null);return}}catch{}let r=n.getBoundingClientRect();ne({x:r.x,y:r.y,w:r.width,h:r.height})};return document.addEventListener(`mousemove`,e,{passive:!0}),()=>document.removeEventListener(`mousemove`,e)},[h]),(0,i.useEffect)(()=>{let e=document.body.style.userSelect;return document.body.style.webkitUserSelect=`none`,document.body.style.userSelect=`none`,()=>{document.body.style.webkitUserSelect=e,document.body.style.userSelect=e}},[]),(0,i.useEffect)(()=>{let n=n=>{if(ce.current||n.button!==0)return;let r=n.composedPath()[0]??n.target;if(!r||r.closest(`[data-feedback-toolbar]`)||r.closest(`[data-design-placement]`)||r.closest(`[data-annotation-popup]`))return;let i=tr(r),a=!1;if(i)for(let e of ye.current)try{let t=document.querySelector(e);if(t&&(t===i||i.contains(t))){a=!0;break}}catch{}let o=!!(n.shiftKey||n.metaKey||n.ctrlKey);if(i&&!a){n.preventDefault(),n.stopPropagation();let r=qn(i),a=[...h,r],s=[...e.originalOrder,r.id];t({...e,sections:a,originalOrder:s});let l=new Set([r.id]);v(l),he.current?.(l,o),ne(null);let u=n.clientX,d=n.clientY,f={x:r.currentRect.x,y:r.currentRect.y};r.originalRect;let p=!1,m=0,g=0;ce.current=`move`;let _=e=>{let t=e.clientX-u,n=e.clientY-d;if(!p&&(Math.abs(t)>2||Math.abs(n)>2)&&(p=!0),!p)return;let i=$n({x:f.x+t,y:f.y+n,width:r.currentRect.width,height:r.currentRect.height},a,new Set([r.id]),c);ae(i.guides);let o=t+i.dx,s=n+i.dy;m=o,g=s;let l=Me().querySelector(`[data-rearrange-section="${r.id}"]`);l&&(l.style.transform=`translate(${o}px, ${s}px)`),ue(new Map([[r.id,{x:f.x+o,y:f.y+s,width:r.currentRect.width,height:r.currentRect.height}]])),N.current?.(o,s)},y=()=>{window.removeEventListener(`mousemove`,_),window.removeEventListener(`mouseup`,y),ce.current=null,ae([]),ue(new Map);let n=Me().querySelector(`[data-rearrange-section="${r.id}"]`);n&&(n.style.transform=``),p&&t({...e,sections:a.map(e=>e.id===r.id?{...e,currentRect:{...e.currentRect,x:Math.max(0,f.x+m),y:Math.max(0,f.y+g)}}:e),originalOrder:s}),ge.current?.(m,g,p)};window.addEventListener(`mousemove`,_),window.addEventListener(`mouseup`,y)}else if(a&&i){n.preventDefault();for(let e of h)try{let t=document.querySelector(e.selector);if(t&&t===i){let t=new Set([e.id]);v(t),he.current?.(t,o);return}}catch{}o||(v(new Set),he.current?.(new Set,!1))}else o||(v(new Set),he.current?.(new Set,!1))};return document.addEventListener(`mousedown`,n,!0),()=>document.removeEventListener(`mousedown`,n,!0)},[h,e,t]),(0,i.useEffect)(()=>{let n=n=>{let r=n.composedPath()[0]||n.target;if(!(r.tagName===`INPUT`||r.tagName===`TEXTAREA`||r.isContentEditable)){if((n.key===`Backspace`||n.key===`Delete`)&&_.size>0){n.preventDefault();let e=new Set(_);O(t=>{let n=new Set(t);for(let t of e)n.add(t);return n}),v(new Set),m(()=>{let n=g.current;t({...n,sections:n.sections.filter(t=>!e.has(t.id)),originalOrder:n.originalOrder.filter(t=>!e.has(t))}),O(t=>{let n=new Set(t);for(let t of e)n.delete(t);return n})},180);return}if([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`].includes(n.key)&&_.size>0){n.preventDefault();let r=n.shiftKey?20:1,i=n.key===`ArrowLeft`?-r:n.key===`ArrowRight`?r:0,a=n.key===`ArrowUp`?-r:n.key===`ArrowDown`?r:0;t({...e,sections:h.map(e=>_.has(e.id)?{...e,currentRect:{...e.currentRect,x:Math.max(0,e.currentRect.x+i),y:Math.max(0,e.currentRect.y+a)}}:e)});return}n.key===`Escape`&&_.size>0&&v(new Set)}};return document.addEventListener(`keydown`,n),()=>document.removeEventListener(`keydown`,n)},[_,h,e,t]);let be=(0,i.useCallback)((n,r)=>{if(n.button!==0)return;let i=n.target;if(i.closest(`.${q.handle}`)||i.closest(`.${q.deleteButton}`))return;n.preventDefault(),n.stopPropagation();let a;n.shiftKey||n.metaKey||n.ctrlKey?(a=new Set(_),a.has(r)?a.delete(r):a.add(r)):a=_.has(r)?new Set(_):new Set([r]),v(a),(a.size!==_.size||[...a].some(e=>!_.has(e)))&&he.current?.(a,!!(n.shiftKey||n.metaKey||n.ctrlKey));let o=n.clientX,s=n.clientY,l=new Map;for(let e of h)a.has(e.id)&&l.set(e.id,{x:e.currentRect.x,y:e.currentRect.y});ce.current=`move`;let u=!1,d=0,f=0,p=new Map;for(let e of h)if(a.has(e.id)){let t=Me().querySelector(`[data-rearrange-section="${e.id}"]`);p.set(e.id,{outlineEl:t,curW:e.currentRect.width,curH:e.currentRect.height})}let m=e=>{let t=e.clientX-o,n=e.clientY-s;if(t===0&&n===0)return;u=!0;let r=1/0,i=1/0,m=-1/0,g=-1/0;for(let[e,{curW:a,curH:o}]of p){let s=l.get(e);if(!s)continue;let c=s.x+t,u=s.y+n;r=Math.min(r,c),i=Math.min(i,u),m=Math.max(m,c+a),g=Math.max(g,u+o)}let _=$n({x:r,y:i,width:m-r,height:g-i},h,a,c),v=t+_.dx,y=n+_.dy;d=v,f=y,ae(_.guides);for(let[,{outlineEl:e}]of p)e&&(e.style.transform=`translate(${v}px, ${y}px)`);let b=new Map;for(let[e,{curW:t,curH:n}]of p){let r=l.get(e);if(r){let i={x:Math.max(0,r.x+v),y:Math.max(0,r.y+y),width:t,height:n};b.set(e,i)}}ue(b),N.current?.(v,y)},g=n=>{window.removeEventListener(`mousemove`,m),window.removeEventListener(`mouseup`,g),ce.current=null,ae([]),ue(new Map);for(let[,{outlineEl:e}]of p)e&&(e.style.transform=``);if(u){let r=n.clientX-o,i=n.clientY-s;if(Math.abs(r)<5&&Math.abs(i)<5)t({...e,sections:h.map(e=>{let t=l.get(e.id);return t?{...e,currentRect:{...e.currentRect,x:t.x,y:t.y}}:e})});else{t({...e,sections:h.map(e=>{let t=l.get(e.id);return t?{...e,currentRect:{...e.currentRect,x:Math.max(0,t.x+d),y:Math.max(0,t.y+f)}}:e})}),ge.current?.(d,f,!0);return}}ge.current?.(0,0,!1)};window.addEventListener(`mousemove`,m),window.addEventListener(`mouseup`,g)},[_,h,e,t]),xe=(0,i.useCallback)((n,r,i)=>{n.preventDefault(),n.stopPropagation();let a=h.find(e=>e.id===r);if(!a)return;v(new Set([r])),ce.current=`resize`;let o=n.clientX,s=n.clientY,c={...a.currentRect};a.originalRect;let l=c.width/c.height,u={...c},d=Me().querySelector(`[data-rearrange-section="${r}"]`),f=e=>{let t=e.clientX-o,n=e.clientY-s,a=c.x,f=c.y,p=c.width,m=c.height;i.includes(`e`)&&(p=Math.max(Xn,c.width+t)),i.includes(`w`)&&(p=Math.max(Xn,c.width-t),a=c.x+c.width-p),i.includes(`s`)&&(m=Math.max(Xn,c.height+n)),i.includes(`n`)&&(m=Math.max(Xn,c.height-n),f=c.y+c.height-m),e.shiftKey&&(i.length===2?(Math.abs(p-c.width)>Math.abs(m-c.height)?m=p/l:p=m*l,i.includes(`w`)&&(a=c.x+c.width-p),i.includes(`n`)&&(f=c.y+c.height-m)):(i===`e`||i===`w`?m=p/l:p=m*l,i===`w`&&(a=c.x+c.width-p),i===`n`&&(f=c.y+c.height-m))),u={x:a,y:f,width:p,height:m},d&&(d.style.left=`${a}px`,d.style.top=`${f-oe}px`,d.style.width=`${p}px`,d.style.height=`${m}px`),re({x:e.clientX+12,y:e.clientY+12,text:`${Math.round(p)} \xD7 ${Math.round(m)}`}),ue(new Map([[r,u]]))},p=()=>{window.removeEventListener(`mousemove`,f),window.removeEventListener(`mouseup`,p),re(null),ce.current=null,ue(new Map),t({...e,sections:h.map(e=>e.id===r?{...e,currentRect:u}:e)})};window.addEventListener(`mousemove`,f),window.addEventListener(`mouseup`,p)},[h,e,t,oe]),Se=(0,i.useCallback)(e=>{O(t=>{let n=new Set(t);return n.add(e),n}),v(t=>{let n=new Set(t);return n.delete(e),n}),m(()=>{let n=g.current;t({...n,sections:n.sections.filter(t=>t.id!==e),originalOrder:n.originalOrder.filter(t=>t!==e)}),O(t=>{let n=new Set(t);return n.delete(e),n})},180)},[t]),Ce=e=>{let t=e.originalRect,n=e.currentRect;return Math.abs(t.x-n.x)>1||Math.abs(t.y-n.y)>1||Math.abs(t.width-n.width)>1||Math.abs(t.height-n.height)>1},we=e=>{let t=e.originalRect,n=e.currentRect;return Math.abs(t.x-n.x)>1||Math.abs(t.y-n.y)>1},Te=e=>{let t=e.originalRect,n=e.currentRect;return Math.abs(t.width-n.width)>1||Math.abs(t.height-n.height)>1};for(let e of h)le.current.has(e.id)||(we(e)?le.current.set(e.id,`move`):Te(e)&&le.current.set(e.id,`resize`));for(let e of le.current.keys())h.some(t=>t.id===e)||le.current.delete(e);let Ee=h.filter(e=>{try{if(D.has(e.id)||_.has(e.id))return!0;let t=document.querySelector(e.selector);if(!t)return!1;let n=t.getBoundingClientRect(),r=e.originalRect;return Math.abs(n.width-r.width)+Math.abs(n.height-r.height)<200}catch{return!1}}),De=Ee.filter(e=>Ce(e)),Oe=Ee.filter(e=>!Ce(e)),ke=new Set(De.map(e=>e.id));for(let e of j.current)ke.has(e)||j.current.delete(e);let Ae=[...ke].sort().join(`,`);for(let e of De)me.current.set(e.id,{currentRect:e.currentRect,originalRect:e.originalRect,isFixed:e.isFixed});(0,i.useEffect)(()=>{let e=pe.current;pe.current=ke;let t=new Map;for(let n of e)if(!ke.has(n)){if(!h.some(e=>e.id===n))continue;let e=me.current.get(n);e&&(t.set(n,{orig:e.originalRect,target:e.currentRect,isFixed:e.isFixed}),me.current.delete(n))}if(t.size>0){fe(e=>{let n=new Map(e);for(let[e,r]of t)n.set(e,r);return n});let e=m(()=>{fe(e=>{let n=new Map(e);for(let e of t.keys())n.delete(e);return n})},250);return()=>clearTimeout(e)}},[Ae,h]);let je=(0,i.useRef)(null),Me=()=>je.current?.getRootNode()??document;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(`div`,{ref:je,className:`${q.rearrangeOverlay} ${n?``:q.light} ${r?q.overlayExiting:``}${a?` ${a}`:``}`,"data-feedback-toolbar":!0,children:[te&&(0,o.jsx)(`div`,{className:q.hoverHighlight,style:{left:te.x,top:te.y,width:te.w,height:te.h}}),Oe.map(e=>{let t=e.currentRect,n=e.isFixed?t.y:t.y-oe,i=Jn,a=_.has(e.id);return(0,o.jsxs)(`div`,{"data-rearrange-section":e.id,className:`${q.sectionOutline} ${a?q.selected:``} ${p||r||D.has(e.id)?q.exiting:``}`,style:{left:t.x,top:n,width:t.width,height:t.height,borderColor:i.border,backgroundColor:i.bg,..._e?{}:{opacity:0,animation:`none`,transition:`none`}},onMouseDown:t=>be(t,e.id),onDoubleClick:()=>T(e.id),children:[(0,o.jsx)(`span`,{className:q.sectionLabel,style:{backgroundColor:i.pill},children:e.label}),(0,o.jsx)(`span`,{className:`${q.sectionAnnotation} ${e.note?q.annotationVisible:``}`,children:(e.note&&k.current.set(e.id,e.note),e.note||k.current.get(e.id)||``)}),(0,o.jsxs)(`span`,{className:q.sectionDimensions,children:[Math.round(t.width),` × `,Math.round(t.height)]}),(0,o.jsx)(`div`,{className:q.deleteButton,onMouseDown:e=>e.stopPropagation(),onClick:()=>Se(e.id),children:`✕`}),Yn.map(t=>(0,o.jsx)(`div`,{className:`${q.handle} ${q[`handle${t.charAt(0).toUpperCase()}${t.slice(1)}`]}`,onMouseDown:n=>xe(n,e.id,t)},t))]},e.id)}),De.map(e=>{let t=e.currentRect,n=e.isFixed?t.y:t.y-oe,i=_.has(e.id),a=we(e),c=Te(e);if(s&&!i)return null;let l=!j.current.has(e.id);return l&&j.current.add(e.id),(0,o.jsxs)(`div`,{"data-rearrange-section":e.id,className:`${q.ghostOutline} ${i?q.selected:``} ${p||r||D.has(e.id)?q.exiting:``}`,style:{left:t.x,top:n,width:t.width,height:t.height,..._e?{}:{opacity:0,animation:`none`,transition:`none`},...l?{}:{animation:`none`}},onMouseDown:t=>be(t,e.id),onDoubleClick:()=>T(e.id),children:[(0,o.jsx)(`span`,{className:q.sectionLabel,style:{backgroundColor:Jn.pill},children:e.label}),(0,o.jsx)(`span`,{className:`${q.sectionAnnotation} ${e.note?q.annotationVisible:``}`,children:(e.note&&k.current.set(e.id,e.note),e.note||k.current.get(e.id)||``)}),(0,o.jsxs)(`span`,{className:q.sectionDimensions,children:[Math.round(t.width),` × `,Math.round(t.height)]}),(0,o.jsx)(`div`,{className:q.deleteButton,onMouseDown:e=>e.stopPropagation(),onClick:()=>Se(e.id),children:`✕`}),Yn.map(t=>(0,o.jsx)(`div`,{className:`${q.handle} ${q[`handle${t.charAt(0).toUpperCase()}${t.slice(1)}`]}`,onMouseDown:n=>xe(n,e.id,t)},t)),(0,o.jsx)(`span`,{className:q.ghostBadge,children:(()=>{let t=le.current.get(e.id);if(a&&c){let[e,n]=t===`resize`?[`Resize`,`Move`]:[`Move`,`Resize`];return(0,o.jsxs)(o.Fragment,{children:[`Suggested `,e,` `,(0,o.jsxs)(`span`,{className:q.ghostBadgeExtra,children:[`& `,n]})]})}return`Suggested ${c?`Resize`:`Move`}`})()})]},e.id)})]}),!s&&(()=>{let e=[];for(let t of De){let n=M.get(t.id);e.push({id:t.id,orig:t.originalRect,target:n||t.currentRect,isFixed:t.isFixed,isSelected:_.has(t.id),isExiting:D.has(t.id)})}for(let[t,n]of M)if(!e.some(e=>e.id===t)){let r=h.find(e=>e.id===t);r&&e.push({id:t,orig:r.originalRect,target:n,isFixed:r.isFixed,isSelected:_.has(t)})}for(let[t,n]of de)e.some(e=>e.id===t)||e.push({id:t,orig:n.orig,target:n.target,isFixed:n.isFixed,isSelected:!1,isExiting:!0});return e.length===0?null:(0,o.jsxs)(`svg`,{className:`${q.connectorSvg} ${p||r?q.connectorExiting:``}`,children:[e.map(({id:e,orig:t,target:n,isFixed:r,isSelected:i,isExiting:a})=>{let s=t.x+t.width/2,c=(r?t.y:t.y-oe)+t.height/2,l=n.x+n.width/2,u=(r?n.y:n.y-oe)+n.height/2,d=l-s,f=u-c,p=Math.sqrt(d*d+f*f);if(p<2)return null;let m=Math.min(1,p/40),h=Math.min(p*.3,60),g=p>0?-f/p:0,_=p>0?d/p:0,v=(s+l)/2+g*h,y=(c+u)/2+_*h,b=M.has(e),x=b||i?1:.4,S=b||i?1:.5;return(0,o.jsxs)(`g`,{className:a?q.connectorExiting:``,children:[(0,o.jsx)(`path`,{className:q.connectorLine,d:`M ${s} ${c} Q ${v} ${y} ${l} ${u}`,fill:`none`,stroke:`rgba(59, 130, 246, 0.45)`,strokeWidth:`1.5`,opacity:x*m}),(0,o.jsx)(`circle`,{className:q.connectorDot,cx:s,cy:c,r:4*m,fill:`rgba(59, 130, 246, 0.8)`,stroke:`#fff`,strokeWidth:`1.5`,opacity:S*m,filter:`url(#connDotShadow)`}),(0,o.jsx)(`circle`,{className:q.connectorDot,cx:l,cy:u,r:4*m,fill:`rgba(59, 130, 246, 0.8)`,stroke:`#fff`,strokeWidth:`1.5`,opacity:S*m,filter:`url(#connDotShadow)`})]},`conn-${e}`)}),(0,o.jsx)(`defs`,{children:(0,o.jsx)(`filter`,{id:`connDotShadow`,x:`-50%`,y:`-50%`,width:`200%`,height:`200%`,children:(0,o.jsx)(`feDropShadow`,{dx:`0`,dy:`0.5`,stdDeviation:`1`,floodOpacity:`0.15`})})})]})})(),b&&(()=>{let e=h.find(e=>e.id===b);if(!e)return null;let t=e.currentRect,r=e.isFixed?t.y:t.y-oe,i=t.x+t.width/2,a=r-8,s=r+t.height+8,c=a>200,l=s<window.innerHeight-100,u=Math.max(160,Math.min(window.innerWidth-160,i)),d;return d=c?{left:u,bottom:window.innerHeight-a}:l?{left:u,top:s}:{left:u,top:Math.max(80,window.innerHeight/2-80)},(0,o.jsx)(We,{element:e.label,placeholder:`Add a note about this section`,initialValue:e.note??``,submitLabel:w.current?`Save`:`Set`,onSubmit:ee,onCancel:E,onDelete:w.current?()=>{ee(``)}:void 0,isExiting:S,lightMode:!n,style:d})})(),A&&(0,o.jsx)(`div`,{className:q.sizeIndicator,style:{left:A.x,top:A.y},"data-feedback-toolbar":!0,children:A.text}),ie.map((e,t)=>(0,o.jsx)(`div`,{className:q.guideLine,style:e.axis===`x`?{position:`fixed`,left:e.pos,top:0,width:1,height:`100vh`}:{position:`fixed`,left:0,top:e.pos-oe,width:`100vw`,height:1}},`${e.axis}-${e.pos}-${t}`))]})}var rr=new Set([`script`,`style`,`noscript`,`link`,`meta`,`br`,`hr`]);function ir(){let e=document.querySelector(`main`)||document.body,t=[],n=Array.from(e.children),r=e!==document.body&&n.length<3?Array.from(document.body.children):n;for(let e of r){if(!(e instanceof HTMLElement)||rr.has(e.tagName.toLowerCase())||e.hasAttribute(`data-feedback-toolbar`))continue;let n=window.getComputedStyle(e);if(n.display===`none`||n.visibility===`hidden`)continue;let r=e.getBoundingClientRect();if(!(r.height<10||r.width<10)){t.push({label:Un(e),selector:Hn(e),top:r.top,bottom:r.bottom,left:r.left,right:r.right,area:r.width*r.height});for(let n of Array.from(e.children)){if(!(n instanceof HTMLElement)||rr.has(n.tagName.toLowerCase())||n.hasAttribute(`data-feedback-toolbar`))continue;let e=window.getComputedStyle(n);if(e.display===`none`||e.visibility===`hidden`)continue;let r=n.getBoundingClientRect();r.height<10||r.width<10||t.push({label:Un(n),selector:Hn(n),top:r.top,bottom:r.bottom,left:r.left,right:r.right,area:r.width*r.height})}}}return t}function ar(e){let t=window.scrollY;return e.map(({label:e,selector:n,rect:r})=>{let i=r.y-t;return{label:e,selector:n,top:i,bottom:i+r.height,left:r.x,right:r.x+r.width,area:r.width*r.height}})}function or(e){let t=window.scrollY,n=e.y-t,r=e.x;return{top:n,bottom:n+e.height,left:r,right:r+e.width,area:e.width*e.height}}function sr(e,t){let n=t?ar(t):ir(),r=or(e),i=null,a=null,o=null,s=null,c=null;for(let t of n){if(Math.abs(t.left-r.left)<2&&Math.abs(t.top-r.top)<2&&Math.abs(t.right-t.left-e.width)<2&&Math.abs(t.bottom-t.top-e.height)<2)continue;t.left<=r.left+2&&t.right>=r.right-2&&t.top<=r.top+2&&t.bottom>=r.bottom-2&&t.area>r.area*1.5&&(!c||t.area<c._area)&&(c={label:t.label,selector:t.selector,_area:t.area});let n=r.right>t.left+5&&r.left<t.right-5,l=r.bottom>t.top+5&&r.top<t.bottom-5;if(n&&t.bottom<=r.top+5){let e=Math.round(r.top-t.bottom);(!i||e<i._dist)&&(i={label:t.label,selector:t.selector,gap:Math.max(0,e),_dist:e})}if(n&&t.top>=r.bottom-5){let e=Math.round(t.top-r.bottom);(!a||e<a._dist)&&(a={label:t.label,selector:t.selector,gap:Math.max(0,e),_dist:e})}if(l&&t.right<=r.left+5){let e=Math.round(r.left-t.right);(!o||e<o._dist)&&(o={label:t.label,selector:t.selector,gap:Math.max(0,e),_dist:e})}if(l&&t.left>=r.right-5){let e=Math.round(t.left-r.right);(!s||e<s._dist)&&(s={label:t.label,selector:t.selector,gap:Math.max(0,e),_dist:e})}}let l=window.innerWidth,u=window.innerHeight,d=lr(e,l),f=e=>e?{label:e.label,selector:e.selector,gap:e.gap}:null,p=cr(r,e,l,u,c?{label:c.label,selector:c.selector,_area:c._area}:null,n);return{above:f(i),below:f(a),left:f(o),right:f(s),alignment:d,containedIn:c?{label:c.label,selector:c.selector}:null,outOfBounds:p}}function cr(e,t,n,r,i,a){let o={},s=!1,c=[];if(e.left<-2&&c.push(`left`),e.right>n+2&&c.push(`right`),e.top<-2&&c.push(`top`),e.bottom>r+2&&c.push(`bottom`),c.length>0&&(o.viewport=c,s=!0),i){let t=a.find(e=>e.label===i.label&&e.selector===i.selector&&Math.abs(e.area-i._area)<10);if(t){let n=[];e.left<t.left-2&&n.push(`left`),e.right>t.right+2&&n.push(`right`),e.top<t.top-2&&n.push(`top`),e.bottom>t.bottom+2&&n.push(`bottom`),n.length>0&&(o.container={label:i.label,edges:n},s=!0)}}return s?o:null}function lr(e,t){if(e.width/t>.85)return`full-width`;let n=e.x+e.width/2-t/2,r=t*.08;return Math.abs(n)<r?`center`:n<0?`left`:`right`}function ur(e){switch(e){case`full-width`:return`full-width`;case`center`:return`centered`;case`left`:return`left-aligned`;case`right`:return`right-aligned`}}function X(e,t={}){let n=[];e.above&&n.push(`Below \`${e.above.label}\`${e.above.gap>0?` (${e.above.gap}px gap)`:``}`),e.below&&n.push(`Above \`${e.below.label}\`${e.below.gap>0?` (${e.below.gap}px gap)`:``}`),t.includeLeftRight&&(e.left&&n.push(`Right of \`${e.left.label}\`${e.left.gap>0?` (${e.left.gap}px gap)`:``}`),e.right&&n.push(`Left of \`${e.right.label}\`${e.right.gap>0?` (${e.right.gap}px gap)`:``}`));let r=ur(e.alignment);return e.containedIn?n.push(`${r.charAt(0).toUpperCase()+r.slice(1)} in \`${e.containedIn.label}\``):n.push(`${r.charAt(0).toUpperCase()+r.slice(1)} in page`),t.includePixelRef&&t.pixelRef&&n.push(`Pixel ref: \`${t.pixelRef}\``),e.outOfBounds&&(e.outOfBounds.viewport&&n.push(`**Outside viewport** (${e.outOfBounds.viewport.join(`, `)} edge${e.outOfBounds.viewport.length>1?`s`:``})`),e.outOfBounds.container&&n.push(`**Outside \`${e.outOfBounds.container.label}\`** (${e.outOfBounds.container.edges.join(`, `)} edge${e.outOfBounds.container.edges.length>1?`s`:``})`)),n}function dr(e,t,n){let r=[];e.above&&r.push(`below \`${e.above.label}\``),e.below&&r.push(`above \`${e.below.label}\``),e.left&&r.push(`right of \`${e.left.label}\``),e.right&&r.push(`left of \`${e.right.label}\``),e.containedIn&&r.push(`inside \`${e.containedIn.label}\``),r.push(ur(e.alignment)),e.outOfBounds?.viewport&&r.push(`**outside viewport** (${e.outOfBounds.viewport.join(`, `)})`),e.outOfBounds?.container&&r.push(`**outside \`${e.outOfBounds.container.label}\`** (${e.outOfBounds.container.edges.join(`, `)})`);let i=n?`, ${Math.round(n.width)}\xD7${Math.round(n.height)}px`:``;return`at (${Math.round(t.x)}, ${Math.round(t.y)})${i}: ${r.join(`, `)}`}var fr=15;function pr(e){if(e.length<2)return[];let t=[],n=new Set;for(let r=0;r<e.length;r++){if(n.has(r))continue;let i=[r];for(let t=r+1;t<e.length;t++)n.has(t)||Math.abs(e[r].rect.y-e[t].rect.y)<fr&&i.push(t);if(i.length>=2){let r=i.map(t=>e[t]);r.sort((e,t)=>e.rect.x-t.rect.x);let a=[];for(let e=0;e<r.length-1;e++)a.push(Math.round(r[e+1].rect.x-(r[e].rect.x+r[e].rect.width)));let o=Math.round(r.reduce((e,t)=>e+t.rect.y,0)/r.length);t.push({labels:r.map(e=>e.label),type:`row`,sharedEdge:o,gaps:a,avgGap:a.length?Math.round(a.reduce((e,t)=>e+t,0)/a.length):0}),i.forEach(e=>n.add(e))}}for(let r=0;r<e.length;r++){if(n.has(r))continue;let i=[r];for(let t=r+1;t<e.length;t++)n.has(t)||Math.abs(e[r].rect.x-e[t].rect.x)<fr&&i.push(t);if(i.length>=2){let r=i.map(t=>e[t]);r.sort((e,t)=>e.rect.y-t.rect.y);let a=[];for(let e=0;e<r.length-1;e++)a.push(Math.round(r[e+1].rect.y-(r[e].rect.y+r[e].rect.height)));let o=Math.round(r.reduce((e,t)=>e+t.rect.x,0)/r.length);t.push({labels:r.map(e=>e.label),type:`column`,sharedEdge:o,gaps:a,avgGap:a.length?Math.round(a.reduce((e,t)=>e+t,0)/a.length):0}),i.forEach(e=>n.add(e))}}return t}function mr(e){if(e.length<2)return[];let t=pr(e.map(e=>({label:e.label,rect:e.originalRect}))),n=pr(e.map(e=>({label:e.label,rect:e.currentRect}))),r=[],i=new Set;for(let e of t){let t=new Set(e.labels),a=null,o=0;for(let e of n){let n=e.labels.filter(e=>t.has(e)).length;n>=2&&n>o&&(a=e,o=n)}if(a){let n=a.labels.filter(e=>t.has(e)),o=n.join(`, `);if(a.type!==e.type){let t=e.type===`row`?`y`:`x`,n=a.type===`row`?`y`:`x`;r.push(`**${o}**: ${e.type} (${t}\u2248${e.sharedEdge}, ${e.avgGap}px gaps) \u2192 ${a.type} (${n}\u2248${a.sharedEdge}, ${a.avgGap}px gaps)`)}else if(Math.abs(e.sharedEdge-a.sharedEdge)>20||Math.abs(e.avgGap-a.avgGap)>5){let t=e.type===`row`?`y`:`x`,n=Math.abs(e.sharedEdge-a.sharedEdge)>20?` ${t}: ${e.sharedEdge} \u2192 ${a.sharedEdge}`:``,i=Math.abs(e.avgGap-a.avgGap)>5?` gaps: ${e.avgGap}px \u2192 ${a.avgGap}px`:``;r.push(`**${o}**: ${e.type} shifted \u2014${n}${i}`)}n.forEach(e=>i.add(e))}else{let t=e.labels.join(`, `),n=e.type===`row`?`y`:`x`;r.push(`**${t}**: ${e.type} (${n}\u2248${e.sharedEdge}) dissolved`),e.labels.forEach(e=>i.add(e))}}for(let e of n)if(!e.labels.every(e=>i.has(e))&&!(e.labels.filter(e=>!i.has(e)).length<2)&&!t.some(t=>t.labels.filter(t=>e.labels.includes(t)).length>=2)){let t=e.type===`row`?`y`:`x`;r.push(`**${e.labels.join(`, `)}**: new ${e.type} (${t}\u2248${e.sharedEdge}, ${e.avgGap}px gaps)`),e.labels.forEach(e=>i.add(e))}let a=e.filter(e=>!i.has(e.label));if(a.length>=2){let e={};for(let t of a){let n=Math.round(t.currentRect.x/5)*5;(e[n]??(e[n]=[])).push(t.label)}for(let[t,n]of Object.entries(e))n.length>=2&&r.push(`**${n.join(`, `)}**: shared left edge at x\u2248${t}`)}return r}function hr(e){if(typeof document>`u`)return{viewport:e,contentArea:null};let t=[],n=new Set,r=e=>{n.has(e)||e instanceof HTMLElement&&(e.hasAttribute(`data-feedback-toolbar`)||rr.has(e.tagName.toLowerCase())||(n.add(e),t.push(e)))},i=document.querySelector(`main`);i&&r(i);let a=document.querySelector(`[role='main']`);a&&r(a);for(let e of Array.from(document.body.children))if(r(e),e.children){for(let t of Array.from(e.children))if(r(t),t.children)for(let e of Array.from(t.children))r(e)}let o=null;for(let n of t){let t=n.getBoundingClientRect();if(t.height<50)continue;let r=getComputedStyle(n);if(r.maxWidth&&r.maxWidth!==`none`&&r.maxWidth!==`0px`){(!o||t.width<o.rect.width)&&(o={el:n,rect:t});continue}!o&&t.width<e.width-20&&t.width>100&&(o={el:n,rect:t})}if(o){let{el:t,rect:n}=o;return{viewport:e,contentArea:{width:Math.round(n.width),left:Math.round(n.left),right:Math.round(n.right),centerX:Math.round(n.left+n.width/2),selector:Hn(t)}}}return{viewport:e,contentArea:null}}function gr(e){if(typeof document>`u`)return null;let t=document.querySelector(e);if(!t?.parentElement)return null;let n=getComputedStyle(t.parentElement),r={parentDisplay:n.display,parentSelector:Hn(t.parentElement)};return n.display.includes(`flex`)&&(r.flexDirection=n.flexDirection),n.display.includes(`grid`)&&n.gridTemplateColumns!==`none`&&(r.gridCols=n.gridTemplateColumns),n.gap&&n.gap!==`normal`&&n.gap!==`0px`&&(r.gap=n.gap),r}function _r(e,t){let n=t.contentArea,r=n?n.width:t.viewport.width,i=n?n.left:0,a=n?n.centerX:Math.round(t.viewport.width/2),o=Math.round(e.x-i),s=Math.round(i+r-(e.x+e.width)),c=(e.width/r*100).toFixed(1),l=e.x+e.width/2,u=Math.abs(l-a)<20,d=e.width/r>.95,f=[];return d?f.push("`width: 100%` of container"):f.push(`left \`${o}px\` in container, right \`${s}px\`, width \`${c}%\` (\`${Math.round(e.width)}px\`)`),u&&!d&&f.push("centered — `margin-inline: auto`"),f.join(` — `)}function vr(e){let{viewport:t,contentArea:n}=e,r=`### Reference Frame
`;if(r+=`- Viewport: \`${t.width}\xD7${t.height}px\`
`,n){let e=n;r+=`- Content area: \`${e.width}px\` wide, left edge at \`x=${e.left}\`, right at \`x=${e.right}\` (\`${e.selector}\`)
`,r+=`- Pixel → CSS translation:
`,r+=`  - **Horizontal position in container**: \`element.x - ${e.left}\` \u2192 use as \`margin-left\` or \`left\`
`,r+=`  - **Width as % of container**: \`element.width / ${e.width} \xD7 100\` \u2192 use as \`width: X%\`
`,r+="  - **Vertical gap between elements**: `nextElement.y - (prevElement.y + prevElement.height)` → use as `margin-top` or `gap`\n",r+=`  - **Centered**: if \`|element.centerX - ${e.centerX}| < 20px\` \u2192 use \`margin-inline: auto\`
`}else r+=`- No distinct content container — elements positioned relative to full viewport
`,r+=`- Pixel → CSS translation:
`,r+=`  - **Width as % of viewport**: \`element.width / ${t.width} \xD7 100\` \u2192 use as \`width: X%\`
`,r+=`  - **Centered**: if \`|(element.x + element.width/2) - ${Math.round(t.width/2)}| < 20px\` \u2192 use \`margin-inline: auto\`
`;return r+=`
`,r}function yr(e){let t=gr(e);if(!t)return null;let n=`\`${t.parentDisplay}\``;return t.flexDirection&&(n+=`, flex-direction: \`${t.flexDirection}\``),t.gridCols&&(n+=`, grid-template-columns: \`${t.gridCols}\``),t.gap&&(n+=`, gap: \`${t.gap}\``),`Parent: ${n} (\`${t.parentSelector}\`)`}function br(e,t,n,r=`standard`){if(e.length===0)return``;let i=[...e].sort((e,t)=>Math.abs(e.y-t.y)<20?e.x-t.x:e.y-t.y),a=``;if(n?.blankCanvas?(a+=`## Wireframe: New Page

`,n.wireframePurpose&&(a+=`> **Purpose:** ${n.wireframePurpose}
>
`),a+=`> ${e.length} component${e.length===1?``:`s`} placed \u2014 this is a standalone wireframe, not related to the current page.
>
> This wireframe is a rough sketch for exploring ideas.

`):a+=`## Design Layout

> ${e.length} component${e.length===1?``:`s`} placed

`,r===`compact`)return a+=`### Components
`,i.forEach((e,t)=>{let n=pt[e.type]?.label||e.type;a+=`${t+1}. **${n}** \u2014 \`${Math.round(e.width)}\xD7${Math.round(e.height)}px\` at \`(${Math.round(e.x)}, ${Math.round(e.y)})\`
`,e.text&&(a+=`   - Note: "${e.text}"
`)}),a;let o=hr(t);a+=vr(o),a+=`### Components
`,i.forEach((e,t)=>{let n=pt[e.type]?.label||e.type,i={x:e.x,y:e.y,width:e.width,height:e.height};a+=`${t+1}. **${n}** \u2014 \`${Math.round(e.width)}\xD7${Math.round(e.height)}px\` at \`(${Math.round(e.x)}, ${Math.round(e.y)})\`
`,e.text&&(a+=`   - Note: "${e.text}"
`);let s=X(sr(i),{includeLeftRight:r===`detailed`||r===`forensic`});for(let e of s)a+=`   - ${e}
`;let c=_r(i,o);c&&(a+=`   - CSS: ${c}
`)}),a+=`
### Layout Analysis
`;let s=[];for(let e of i){let t=s.find(t=>Math.abs(t.y-e.y)<30);t?t.items.push(e):s.push({y:e.y,items:[e]})}if(s.sort((e,t)=>e.y-t.y),s.forEach((e,n)=>{e.items.sort((e,t)=>e.x-t.x);let r=e.items.map(e=>pt[e.type]?.label||e.type);if(e.items.length===1){let i=e.items[0].width>t.width*.8;a+=`- Row ${n+1} (y\u2248${Math.round(e.y)}): ${r[0]}${i?` — full width`:``}
`}else a+=`- Row ${n+1} (y\u2248${Math.round(e.y)}): ${r.join(` | `)} \u2014 ${e.items.length} items side by side
`}),r===`detailed`||r===`forensic`){a+=`
### Spacing & Gaps
`;for(let e=0;e<i.length-1;e++){let t=i[e],n=i[e+1],r=pt[t.type]?.label||t.type,o=pt[n.type]?.label||n.type,s=Math.round(n.y-(t.y+t.height)),c=Math.round(n.x-(t.x+t.width));Math.abs(t.y-n.y)<30?a+=`- ${r} \u2192 ${o}: \`${c}px\` horizontal gap
`:a+=`- ${r} \u2192 ${o}: \`${s}px\` vertical gap
`}if(r===`forensic`&&i.length>2){a+=`
### All Pairwise Gaps
`;for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++){let n=i[e],r=i[t],o=pt[n.type]?.label||n.type,s=pt[r.type]?.label||r.type,c=Math.round(r.y-(n.y+n.height)),l=Math.round(r.x-(n.x+n.width));a+=`- ${o} \u2194 ${s}: h=\`${l}px\` v=\`${c}px\`
`}}r===`forensic`&&(a+=`
### Z-Order (placement order)
`,e.forEach((e,t)=>{let n=pt[e.type]?.label||e.type;a+=`${t}. ${n} at \`(${Math.round(e.x)}, ${Math.round(e.y)})\`
`}))}a+=`
### Suggested Implementation
`;let c=i.some(e=>e.type===`navigation`),l=i.some(e=>e.type===`hero`),u=i.some(e=>e.type===`sidebar`),d=i.some(e=>e.type===`footer`),f=i.filter(e=>e.type===`card`),p=i.filter(e=>e.type===`form`),m=i.filter(e=>e.type===`table`),h=i.filter(e=>e.type===`modal`);if(c&&(a+=`- Top navigation bar with logo + nav links + CTA
`),l&&(a+=`- Hero section with heading, subtext, and call-to-action
`),u&&(a+=`- Sidebar layout — use CSS Grid with sidebar + main content area
`),f.length>1?a+=`- ${f.length}-column card grid \u2014 use CSS Grid or Flexbox
`:f.length===1&&(a+=`- Card component with image + content area
`),p.length>0&&(a+=`- ${p.length} form${p.length>1?`s`:``} \u2014 add proper labels, validation, and submit handling
`),m.length>0&&(a+=`- Data table — consider sortable columns and pagination
`),h.length>0&&(a+=`- Modal dialog — add overlay backdrop and focus trapping
`),d&&(a+=`- Multi-column footer with links
`),r===`detailed`||r===`forensic`){if(a+=`
### CSS Suggestions
`,u){let e=i.find(e=>e.type===`sidebar`);a+=`- \`display: grid; grid-template-columns: ${Math.round(e.width)}px 1fr;\`
`}if(f.length>1){let e=Math.round(f[0].width);a+=`- \`display: grid; grid-template-columns: repeat(${f.length}, ${e}px); gap: 16px;\`
`}c&&(a+="- Navigation: `position: sticky; top: 0; z-index: 50;`\n")}return a}function xr(e,t=`standard`,n){let{sections:r}=e,i=[];for(let e of r){let n=e.originalRect,r=e.currentRect,a=Math.abs(n.x-r.x)>1||Math.abs(n.y-r.y)>1,o=Math.abs(n.width-r.width)>1||Math.abs(n.height-r.height)>1,s=!!e.note;if(!a&&!o&&!s){t===`forensic`&&i.push({section:e,posMoved:!1,sizeChanged:!1});continue}i.push({section:e,posMoved:a,sizeChanged:o})}if(i.length===0||t!==`forensic`&&i.every(e=>!e.posMoved&&!e.sizeChanged&&!e.section.note))return``;let a=`## Suggested Layout Changes

`,o=hr({width:n?n.width:typeof window<`u`?window.innerWidth:0,height:n?n.height:typeof window<`u`?window.innerHeight:0});t!==`compact`&&(a+=vr(o)),t===`forensic`&&(a+=`> Detected at: \`${new Date(e.detectedAt).toISOString()}\`
`,a+=`> Total sections: ${r.length}

`);let s=e=>r.map(t=>({label:t.label,selector:t.selector,rect:e===`original`?t.originalRect:t.currentRect}));a+=`**Changes:**
`;for(let{section:e,posMoved:n,sizeChanged:r}of i){let i=e.originalRect,c=e.currentRect;if(!n&&!r){e.note?(a+=`- **${e.label}** \u2014 note only
`,a+=`  - Note: "${e.note}"
`):a+=`- ${e.label} \u2014 unchanged at (${Math.round(c.x)}, ${Math.round(c.y)}) ${Math.round(c.width)}\xD7${Math.round(c.height)}px
`;continue}if(t===`compact`){a+=n&&r?`- Suggested: move **${e.label}** to (${Math.round(c.x)}, ${Math.round(c.y)}) ${Math.round(c.width)}\xD7${Math.round(c.height)}px
`:n?`- Suggested: move **${e.label}** to (${Math.round(c.x)}, ${Math.round(c.y)})
`:`- Suggested: resize **${e.label}** to ${Math.round(c.width)}\xD7${Math.round(c.height)}px
`,e.note&&(a+=`  - Note: "${e.note}"
`);continue}if(a+=n&&r?`- Suggested: move and resize **${e.label}**
`:n?`- Suggested: move **${e.label}**
`:`- Suggested: resize **${e.label}** from ${Math.round(i.width)}\xD7${Math.round(i.height)}px to ${Math.round(c.width)}\xD7${Math.round(c.height)}px
`,e.note&&(a+=`  - Note: "${e.note}"
`),n){let e=sr(i,s(`original`)),n=sr(c,s(`current`)),l=r?{width:i.width,height:i.height}:void 0;a+=`  - Currently ${dr(e,{x:i.x,y:i.y},l)}
`;let u=r?{width:c.width,height:c.height}:void 0,d=`at (${Math.round(c.x)}, ${Math.round(c.y)})`,f=u?`, ${Math.round(u.width)}\xD7${Math.round(u.height)}px`:``,p=X(n,{includeLeftRight:t===`detailed`||t===`forensic`});if(p.length>0){a+=`  - Suggested position ${d}${f}: ${p[0]}
`;for(let e=1;e<p.length;e++)a+=`    ${p[e]}
`}else a+=`  - Suggested position ${d}${f}
`;let m=_r(c,o);m&&(a+=`  - CSS: ${m}
`)}let l=yr(e.selector);if(l&&(a+=`  - ${l}
`),a+=`  - Selector: \`${e.selector}\`
`,t===`detailed`||t===`forensic`){let n=e.className?`${e.tagName}.${e.className.split(` `)[0]}`:e.tagName;n!==e.selector&&(a+=`  - Element: \`${n}\`
`),e.role&&(a+=`  - Role: \`${e.role}\`
`),t===`forensic`&&e.textSnippet&&(a+=`  - Text: "${e.textSnippet}"
`)}t===`forensic`&&(a+=`  - Original rect: \`{ x: ${Math.round(i.x)}, y: ${Math.round(i.y)}, w: ${Math.round(i.width)}, h: ${Math.round(i.height)} }\`
`,a+=`  - Current rect: \`{ x: ${Math.round(c.x)}, y: ${Math.round(c.y)}, w: ${Math.round(c.width)}, h: ${Math.round(c.height)} }\`
`)}if(t!==`compact`){let e=mr(i.filter(e=>e.posMoved).map(e=>({label:e.section.label,originalRect:e.section.originalRect,currentRect:e.section.currentRect})));if(e.length>0){a+=`
### Layout Summary
`;for(let t of e)a+=`- ${t}
`}}if(t!==`compact`&&r.length>1){a+=`
### All Sections (current positions)
`;let e=[...r].sort((e,t)=>Math.abs(e.currentRect.y-t.currentRect.y)<20?e.currentRect.x-t.currentRect.x:e.currentRect.y-t.currentRect.y);for(let t of e){let e=t.currentRect,n=Math.abs(e.x-t.originalRect.x)>1||Math.abs(e.y-t.originalRect.y)>1||Math.abs(e.width-t.originalRect.width)>1||Math.abs(e.height-t.originalRect.height)>1;a+=`- ${t.label}: \`${Math.round(e.width)}\xD7${Math.round(e.height)}px\` at \`(${Math.round(e.x)}, ${Math.round(e.y)})\`${n?` ← suggested`:``}
`}}return a}var Sr=`feedback-annotations-`,Cr=7;function wr(e){return`${Sr}${e}`}function Tr(e){if(typeof window>`u`)return[];try{let t=localStorage.getItem(wr(e));if(!t)return[];let n=JSON.parse(t),r=Date.now()-Cr*24*60*60*1e3;return n.filter(e=>!e.timestamp||e.timestamp>r)}catch{return[]}}function Er(e,t){if(!(typeof window>`u`))try{localStorage.setItem(wr(e),JSON.stringify(t))}catch{}}function Dr(){let e=new Map;if(typeof window>`u`)return e;try{let t=Date.now()-Cr*24*60*60*1e3;for(let n=0;n<localStorage.length;n++){let r=localStorage.key(n);if(r?.startsWith(Sr)){let n=r.slice(Sr.length),i=localStorage.getItem(r);if(i){let r=JSON.parse(i).filter(e=>!e.timestamp||e.timestamp>t);r.length>0&&e.set(n,r)}}}}catch{}return e}function Or(e,t,n){Er(e,t.map(e=>({...e,_syncedTo:n})))}var kr=`agentation-design-`;function Ar(e){if(typeof window>`u`)return[];try{let t=localStorage.getItem(`${kr}${e}`);return t?JSON.parse(t):[]}catch{return[]}}function jr(e,t){if(!(typeof window>`u`))try{localStorage.setItem(`${kr}${e}`,JSON.stringify(t))}catch{}}function Mr(e){if(!(typeof window>`u`))try{localStorage.removeItem(`${kr}${e}`)}catch{}}var Z=`agentation-rearrange-`;function Nr(e){if(typeof window>`u`)return null;try{let t=localStorage.getItem(`${Z}${e}`);return t?JSON.parse(t):null}catch{return null}}function Pr(e,t){if(!(typeof window>`u`))try{localStorage.setItem(`${Z}${e}`,JSON.stringify(t))}catch{}}function Fr(e){if(!(typeof window>`u`))try{localStorage.removeItem(`${Z}${e}`)}catch{}}var Ir=`agentation-wireframe-`;function Lr(e){if(typeof window>`u`)return null;try{let t=localStorage.getItem(`${Ir}${e}`);return t?JSON.parse(t):null}catch{return null}}function Rr(e,t){if(!(typeof window>`u`))try{localStorage.setItem(`${Ir}${e}`,JSON.stringify(t))}catch{}}function zr(e){if(!(typeof window>`u`))try{localStorage.removeItem(`${Ir}${e}`)}catch{}}var Br=`agentation-session-`;function Vr(e){return`${Br}${e}`}function Hr(e){if(typeof window>`u`)return null;try{return localStorage.getItem(Vr(e))}catch{return null}}function Ur(e,t){if(!(typeof window>`u`))try{localStorage.setItem(Vr(e),t)}catch{}}function Wr(e){if(!(typeof window>`u`))try{localStorage.removeItem(Vr(e))}catch{}}var Gr=`${Br}toolbar-hidden`;function Kr(){if(typeof window>`u`)return!1;try{return sessionStorage.getItem(Gr)===`1`}catch{return!1}}function qr(e){if(!(typeof window>`u`))try{e?sessionStorage.setItem(Gr,`1`):sessionStorage.removeItem(Gr)}catch{}}async function Jr(e,t){let n=await fetch(`${e}/sessions`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({url:t})});if(!n.ok)throw Error(`Failed to create session: ${n.status}`);return n.json()}async function Yr(e,t){let n=await fetch(`${e}/sessions/${t}`);if(!n.ok)throw Error(`Failed to get session: ${n.status}`);return n.json()}async function Xr(e,t,n){!n.elementPath&&(n.element===`body`||n.element===`html`)&&(n={...n,elementPath:n.element});let r=await fetch(`${e}/sessions/${t}/annotations`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(n)});if(!r.ok)throw Error(`Failed to sync annotation: ${r.status}`);return r.json()}async function Zr(e,t,n){let r=await fetch(`${e}/annotations/${t}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(n)});if(!r.ok)throw Error(`Failed to update annotation: ${r.status}`);return r.json()}async function Qr(e,t){let n=await fetch(`${e}/annotations/${t}`,{method:`DELETE`});if(!n.ok)throw Error(`Failed to delete annotation: ${n.status}`)}var Q={FunctionComponent:0,ClassComponent:1,IndeterminateComponent:2,HostRoot:3,HostPortal:4,HostComponent:5,HostText:6,Fragment:7,Mode:8,ContextConsumer:9,ContextProvider:10,ForwardRef:11,Profiler:12,SuspenseComponent:13,MemoComponent:14,SimpleMemoComponent:15,LazyComponent:16,IncompleteClassComponent:17,DehydratedFragment:18,SuspenseListComponent:19,ScopeComponent:21,OffscreenComponent:22,LegacyHiddenComponent:23,CacheComponent:24,TracingMarkerComponent:25,HostHoistable:26,HostSingleton:27,IncompleteFunctionComponent:28,Throw:29,ViewTransitionComponent:30,ActivityComponent:31},$r=new Set([`Component`,`PureComponent`,`Fragment`,`Suspense`,`Profiler`,`StrictMode`,`Routes`,`Route`,`Outlet`,`Root`,`ErrorBoundaryHandler`,`HotReload`,`Hot`]),ei=[/Boundary$/,/BoundaryHandler$/,/Provider$/,/Consumer$/,/^(Inner|Outer)/,/Router$/,/^Client(Page|Segment|Root)/,/^Segment(ViewNode|Node)$/,/^LayoutSegment/,/^Server(Root|Component|Render)/,/^RSC/,/Context$/,/^Hot(Reload)?$/,/^(Dev|React)(Overlay|Tools|Root)/,/Overlay$/,/Handler$/,/^With[A-Z]/,/Wrapper$/,/^Root$/],ti=[/Page$/,/View$/,/Screen$/,/Section$/,/Card$/,/List$/,/Item$/,/Form$/,/Modal$/,/Dialog$/,/Button$/,/Nav$/,/Header$/,/Footer$/,/Layout$/,/Panel$/,/Tab$/,/Menu$/];function ni(e){let t=e?.mode??`filtered`,n=$r;if(e?.skipExact){let t=e.skipExact instanceof Set?e.skipExact:new Set(e.skipExact);n=new Set([...$r,...t])}return{maxComponents:e?.maxComponents??6,maxDepth:e?.maxDepth??30,mode:t,skipExact:n,skipPatterns:e?.skipPatterns?[...ei,...e.skipPatterns]:ei,userPatterns:e?.userPatterns??ti,filter:e?.filter}}function ri(e){return e.replace(/([a-z])([A-Z])/g,`$1-$2`).replace(/([A-Z])([A-Z][a-z])/g,`$1-$2`).toLowerCase()}function ii(e,t=10){let n=new Set,r=e,i=0;for(;r&&i<t;)r.className&&typeof r.className==`string`&&r.className.split(/\s+/).forEach(e=>{if(e.length>1){let t=e.replace(/[_][a-zA-Z0-9]{5,}.*$/,``).toLowerCase();t.length>1&&n.add(t)}}),r=r.parentElement,i++;return n}function ai(e,t){let n=ri(e);for(let e of t){if(e===n)return!0;let t=n.split(`-`).filter(e=>e.length>2),r=e.split(`-`).filter(e=>e.length>2);for(let e of t)for(let t of r)if(e===t||e.includes(t)||t.includes(e))return!0}return!1}function oi(e,t,n,r){if(n.filter)return n.filter(e,t);switch(n.mode){case`all`:return!0;case`filtered`:return!(n.skipExact.has(e)||n.skipPatterns.some(t=>t.test(e)));case`smart`:return n.skipExact.has(e)||n.skipPatterns.some(t=>t.test(e))?!1:!!(r&&ai(e,r)||n.userPatterns.some(t=>t.test(e)));default:return!0}}var si=null,ci=new WeakMap;function li(e){return Object.keys(e).some(e=>e.startsWith(`__reactFiber$`)||e.startsWith(`__reactInternalInstance$`)||e.startsWith(`__reactProps$`))}function ui(){if(si!==null)return si;if(typeof document>`u`)return!1;if(document.body&&li(document.body))return si=!0,!0;for(let e of[`#root`,`#app`,`#__next`,`[data-reactroot]`]){let t=document.querySelector(e);if(t&&li(t))return si=!0,!0}if(document.body){for(let e of document.body.children)if(li(e))return si=!0,!0}return si=!1,!1}var di={map:ci};function fi(e){return Object.keys(e).find(e=>e.startsWith(`__reactFiber$`)||e.startsWith(`__reactInternalInstance$`))||null}function pi(e){let t=fi(e);return t?e[t]:null}function mi(e){return e?e.displayName?e.displayName:e.name?e.name:null:null}function hi(e){let{tag:t,type:n,elementType:r}=e;if(t===Q.HostComponent||t===Q.HostText||t===Q.HostHoistable||t===Q.HostSingleton||t===Q.Fragment||t===Q.Mode||t===Q.Profiler||t===Q.DehydratedFragment||t===Q.HostRoot||t===Q.HostPortal||t===Q.ScopeComponent||t===Q.OffscreenComponent||t===Q.LegacyHiddenComponent||t===Q.CacheComponent||t===Q.TracingMarkerComponent||t===Q.Throw||t===Q.ViewTransitionComponent||t===Q.ActivityComponent)return null;if(t===Q.ForwardRef){let e=r;if(e?.render){let t=mi(e.render);if(t)return t}return e?.displayName?e.displayName:mi(n)}if(t===Q.MemoComponent||t===Q.SimpleMemoComponent){let e=r;if(e?.type){let t=mi(e.type);if(t)return t}return e?.displayName?e.displayName:mi(n)}if(t===Q.ContextProvider){let e=n;return e?._context?.displayName?`${e._context.displayName}.Provider`:null}if(t===Q.ContextConsumer){let e=n;return e?.displayName?`${e.displayName}.Consumer`:null}if(t===Q.LazyComponent){let e=r;return e?._status===1&&e._result?mi(e._result):null}return t===Q.SuspenseComponent||t===Q.SuspenseListComponent?null:t===Q.IncompleteClassComponent||t===Q.IncompleteFunctionComponent||t===Q.FunctionComponent||t===Q.ClassComponent||t===Q.IndeterminateComponent?mi(n):null}function gi(e){return e.length<=2||e.length<=3&&e===e.toLowerCase()}function _i(e,t){let n=ni(t),r=n.mode===`all`;if(r){let t=di.map.get(e);if(t!==void 0)return t}if(!ui()){let t={path:null,components:[]};return r&&di.map.set(e,t),t}let i=n.mode===`smart`?ii(e):void 0,a=[];try{let t=pi(e),r=0;for(;t&&r<n.maxDepth&&a.length<n.maxComponents;){let e=hi(t);e&&!gi(e)&&oi(e,r,n,i)&&a.push(e),t=t.return,r++}}catch{let t={path:null,components:[]};return r&&di.map.set(e,t),t}if(a.length===0){let t={path:null,components:[]};return r&&di.map.set(e,t),t}let o={path:a.slice().reverse().map(e=>`<${e}>`).join(` `),components:a};return r&&di.map.set(e,o),o}var vi={FunctionComponent:0,ClassComponent:1,IndeterminateComponent:2,HostRoot:3,HostPortal:4,HostComponent:5,HostText:6,Fragment:7,Mode:8,ContextConsumer:9,ContextProvider:10,ForwardRef:11,Profiler:12,SuspenseComponent:13,MemoComponent:14,SimpleMemoComponent:15,LazyComponent:16};function yi(e){if(!e||typeof e!=`object`)return null;let t=Object.keys(e),n=t.find(e=>e.startsWith(`__reactFiber$`));if(n)return e[n]||null;let r=t.find(e=>e.startsWith(`__reactInternalInstance$`));if(r)return e[r]||null;let i=t.find(t=>{if(!t.startsWith(`__react`))return!1;let n=e[t];return n&&typeof n==`object`&&`_debugSource`in n});return i&&e[i]||null}function bi(e){if(!e.type||typeof e.type==`string`)return null;if(typeof e.type==`object`||typeof e.type==`function`){let t=e.type;if(t.displayName)return t.displayName;if(t.name)return t.name}return null}function xi(e,t=50){let n=e,r=0;for(;n&&r<t;){if(n._debugSource)return{source:n._debugSource,componentName:bi(n)};if(n._debugOwner?._debugSource)return{source:n._debugOwner._debugSource,componentName:bi(n._debugOwner)};n=n.return,r++}return null}function Si(e){let t=e,n=0;for(;t&&n<50;){let e=t;for(let n of[`_debugSource`,`__source`,`_source`,`debugSource`]){let r=e[n];if(r&&typeof r==`object`&&`fileName`in r)return{source:r,componentName:bi(t)}}if(t.memoizedProps){let e=t.memoizedProps;if(e.__source&&typeof e.__source==`object`){let n=e.__source;if(n.fileName&&n.lineNumber)return{source:{fileName:n.fileName,lineNumber:n.lineNumber,columnNumber:n.columnNumber},componentName:bi(t)}}}t=t.return,n++}return null}var Ci=new Map;function wi(e){let t=e.tag,n=e.type,r=e.elementType;if(typeof n==`string`||n==null||typeof n==`function`&&n.prototype?.isReactComponent)return null;if((t===vi.FunctionComponent||t===vi.IndeterminateComponent)&&typeof n==`function`)return n;if(t===vi.ForwardRef&&r){let e=r.render;if(typeof e==`function`)return e}if((t===vi.MemoComponent||t===vi.SimpleMemoComponent)&&r){let e=r.type;if(typeof e==`function`)return e}return typeof n==`function`?n:null}function Ti(){let e=i,t=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;if(t&&`H`in t)return{get:()=>t.H,set:e=>{t.H=e}};let n=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;if(n){let e=n.ReactCurrentDispatcher;if(e&&`current`in e)return{get:()=>e.current,set:t=>{e.current=t}}}return null}function Ei(e,t){let n=e.split(`
`),r=[/source-location/,/\/dist\/index\./,/node_modules\//,/react-dom/,/react\.development/,/react\.production/,/chunk-[A-Z0-9]+/i,/\/_next\/static\/chunks\//,/\/\.vite\/deps\//,/\/_astro\//,/\/assets\/[^\s/]+[-.][\w-]{8,}\.m?js(?:[?:]|$)/,/react-stack-bottom-frame/,/react-reconciler/,/scheduler/,/<anonymous>/],i=/^\s*at\s+(?:.*?\s+\()?(.+?):(\d+):(\d+)\)?$/,a=/^[^@]*@(.+?):(\d+):(\d+)$/;for(let e of n){let n=e.trim();if(!n||r.some(e=>e.test(n)))continue;if(t){let e=t.replace(/^bound /,``).replace(/[.*+?^${}()|[\]\\]/g,`\\$&`);if(!RegExp(`(?:at (?:Object\\.)?|^)${e}(?: \\(|@| \\[)`).test(n))continue}let o=i.exec(n)||a.exec(n);if(o)return{fileName:o[1],line:parseInt(o[2],10),column:parseInt(o[3],10)}}return null}function Di(e){let t=e;return t=t.replace(/[?#].*$/,``),t=t.replace(/^turbopack:\/\/\/\[project\]\//,``),t=t.replace(/^webpack-internal:\/\/\/\.\//,``),t=t.replace(/^webpack-internal:\/\/\//,``),t=t.replace(/^webpack:\/\/\/\.\//,``),t=t.replace(/^webpack:\/\/\//,``),t=t.replace(/^turbopack:\/\/\//,``),t=t.replace(/^https?:\/\/[^/]+\//,``),t=t.replace(/^file:\/\/\//,`/`),t=t.replace(/^\([^)]+\)\/\.\//,``),t=t.replace(/^\.\//,``),t}function Oi(e){let t=wi(e);if(!t)return null;if(Ci.has(t))return Ci.get(t);let n=Ti();if(!n)return Ci.set(t,null),null;let r=n.get(),i=null;try{let r=new Proxy({},{get(){throw Error(`probe`)}});n.set(r);try{t({})}catch(n){if(n instanceof Error&&n.message===`probe`&&n.stack){let r=Ei(n.stack,t.name);r&&(i={fileName:Di(r.fileName),lineNumber:r.line,columnNumber:r.column,componentName:bi(e)||void 0})}}}finally{n.set(r)}return Ci.set(t,i),i}function ki(e,t=15){let n=e,r=0;for(;n&&r<t;){let e=Oi(n);if(e)return e;n=n.return,r++}return null}function Ai(e){let t=yi(e);if(!t)return{found:!1,reason:`no-fiber`,isReactApp:!1,isProduction:!1};let n=xi(t);if(n||=Si(t),n?.source)return{found:!0,source:{fileName:n.source.fileName,lineNumber:n.source.lineNumber,columnNumber:n.source.columnNumber,componentName:n.componentName||void 0},isReactApp:!0,isProduction:!1};let r=ki(t);return r?{found:!0,source:r,isReactApp:!0,isProduction:!1}:{found:!1,reason:`no-debug-source`,isReactApp:!0,isProduction:!1}}function ji(e,t=`path`){let{fileName:n,lineNumber:r,columnNumber:i}=e,a=`${n}:${r}`;return i!==void 0&&(a+=`:${i}`),t===`vscode`?`vscode://file${n.startsWith(`/`)?``:`/`}${a}`:a}function Mi(e,t=10){let n=e,r=0;for(;n&&r<t;){let e=Ai(n);if(e.found)return e;n=n.parentElement,r++}return Ai(e)}var Ni=[{value:`compact`,label:`Compact`},{value:`standard`,label:`Standard`},{value:`detailed`,label:`Detailed`},{value:`forensic`,label:`Forensic`}];function Pi(e,t){let n=`## Page Feedback: ${e}
`,r=t?.replace(/[\r\n\t]+/g,` `).trim();return r&&(n+=`**App:** ${r.replace(/[\\`*_\[\]<>]/g,`\\$&`)}
`),n}function Fi(e,t,n=`standard`,r={}){if(e.length===0)return``;let i=typeof window<`u`?`${window.innerWidth}\xD7${window.innerHeight}`:`unknown`,a=Pi(t,r.appName);return n===`forensic`?(a+=`
**Environment:**
`,a+=`- Viewport: ${i}
`,typeof window<`u`&&(a+=`- URL: ${window.location.href}
`,a+=`- User Agent: ${navigator.userAgent}
`,a+=`- Timestamp: ${new Date().toISOString()}
`,a+=`- Device Pixel Ratio: ${window.devicePixelRatio}
`),a+=`
---
`):n!==`compact`&&(a+=`**Viewport:** ${i}
`),a+=`
`,e.forEach((e,t)=>{n===`compact`?(a+=`${t+1}. **${e.element}**${e.sourceFile?` (${e.sourceFile})`:``}: ${e.comment}`,e.selectedText&&(a+=` (re: "${e.selectedText.slice(0,30)}${e.selectedText.length>30?`...`:``}")`),a+=`
`):n===`forensic`?(a+=`### ${t+1}. ${e.element}
`,e.isMultiSelect&&e.fullPath&&(a+=`*Forensic data shown for first element of selection*
`),e.fullPath&&(a+=`**Full DOM Path:** ${e.fullPath}
`),e.cssClasses&&(a+=`**CSS Classes:** ${e.cssClasses}
`),e.boundingBox&&(a+=`**Position:** x:${Math.round(e.boundingBox.x)}, y:${Math.round(e.boundingBox.y)} (${Math.round(e.boundingBox.width)}\xD7${Math.round(e.boundingBox.height)}px)
`),a+=`**Annotation at:** ${e.x.toFixed(1)}% from left, ${Math.round(e.y)}px from top
`,e.selectedText&&(a+=`**Selected text:** "${e.selectedText}"
`),e.nearbyText&&!e.selectedText&&(a+=`**Context:** ${e.nearbyText.slice(0,100)}
`),e.computedStyles&&(a+=`**Computed Styles:** ${e.computedStyles}
`),e.accessibility&&(a+=`**Accessibility:** ${e.accessibility}
`),e.nearbyElements&&(a+=`**Nearby Elements:** ${e.nearbyElements}
`),e.sourceFile&&(a+=`**Source:** ${e.sourceFile}
`),e.reactComponents&&(a+=`**React:** ${e.reactComponents}
`),a+=`**Feedback:** ${e.comment}

`):(a+=`### ${t+1}. ${e.element}
`,a+=`**Location:** ${e.elementPath}
`,e.sourceFile&&(a+=`**Source:** ${e.sourceFile}
`),e.reactComponents&&(a+=`**React:** ${e.reactComponents}
`),n===`detailed`&&(e.cssClasses&&(a+=`**Classes:** ${e.cssClasses}
`),e.boundingBox&&(a+=`**Position:** ${Math.round(e.boundingBox.x)}px, ${Math.round(e.boundingBox.y)}px (${Math.round(e.boundingBox.width)}\xD7${Math.round(e.boundingBox.height)}px)
`)),e.selectedText&&(a+=`**Selected text:** "${e.selectedText}"
`),n===`detailed`&&e.nearbyText&&!e.selectedText&&(a+=`**Context:** ${e.nearbyText.slice(0,100)}
`),a+=`**Feedback:** ${e.comment}

`)}),a.trim()}function Ii(e,t,n=`markdown`){return n===`markdown`?t:[...new Set(e.map(e=>n===`source`?e.sourceFile:n===`classes`?e.cssClasses:e.attributes?.[n.attribute]).filter(e=>typeof e==`string`&&e.length>0))].join(`
`)}async function Li(e){if(typeof window>`u`)return!1;try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}return Ri(e)}function Ri(e){let t=document.createElement(`textarea`),n=document.activeElement;for(;n?.shadowRoot?.activeElement;)n=n.shadowRoot.activeElement;let r=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement?n:null,i=r&&r.selectionStart!==null?{start:r.selectionStart,end:r.selectionEnd,direction:r.selectionDirection}:null,a=document.getSelection(),o=a?Array.from({length:a.rangeCount},(e,t)=>a.getRangeAt(t).cloneRange()):[];try{return t.value=e,t.setAttribute(`readonly`,``),t.style.cssText=`position:fixed;left:-9999px;top:0;opacity:0;pointer-events:none;`,document.body.appendChild(t),t.focus({preventScroll:!0}),t.select(),t.setSelectionRange(0,e.length),document.execCommand(`copy`)}catch{return!1}finally{if(t.remove(),n instanceof HTMLElement&&n.isConnected&&(n.focus({preventScroll:!0}),r&&i&&r.setSelectionRange(i.start,i.end,i.direction)),a){a.removeAllRanges();for(let e of o)a.addRange(e)}}}function zi(e){if(!e)return e;try{let t=new URL(e,`http://agentation.invalid`);return t.pathname+t.search+t.hash}catch{return e}}function Bi(e,t,n=[]){let r=new Map,i=new Map(n.map(e=>[e.id,e])),a=!1;async function o(n,i){if(a||i.running||i.timer)return;let s=i.desired,c=t.get(n);if(!s&&!c){r.delete(n),t.delete(n);return}let l=s?JSON.stringify(s):void 0;if(!(s&&c&&i.synced===l)){i.running=!0;try{if(!s)await e.remove(c),t.delete(n),i.synced=void 0;else if(c)await e.update(c,s),i.synced=l;else{t.set(n,``);let r=await e.create(s);t.set(n,r.id),i.synced=l}i.retries=0,i.running=!1,!a&&r.get(n)===i&&o(n,i)}catch(e){i.running=!1,!a&&r.get(n)===i&&(console.warn(`[Agentation] Failed to sync layout feedback:`,e),t.get(n)&&i.retries<3&&(i.timer=m(()=>{i.timer=void 0,o(n,i)},500*2**i.retries++)))}}}return{replace(e){let n=new Map(e.map(e=>[e.id,e]));for(let[e,a]of n){let n=r.get(e);if(!n){n={running:!1,retries:0},r.set(e,n);let o=[...i.values()].find(e=>e.kind===a.kind&&zi(e.url)===zi(a.url)&&(a.kind===`placement`?e.timestamp===a.timestamp&&e.element===a.element:e.element===a.element));o&&(t.set(e,o.id),i.delete(o.id))}JSON.stringify(n.desired)!==JSON.stringify(a)&&(n.retries=0,n.timer&&clearTimeout(n.timer),n.timer=void 0),n.desired=a}for(let[e,t]of r)n.has(e)||(t.desired=void 0),o(e,t)},forget(e){let n=r.get(e);n?.timer&&clearTimeout(n.timer),r.delete(e),t.delete(e)},dispose(){a=!0;for(let e of r.values())e.timer&&clearTimeout(e.timer)}}}function Vi(e,t,n,r){let i=!1,a,o,s=1e3,c,l=e=>{!i&&(e?.status===`resolved`||e?.status===`dismissed`)&&r(e)},u=async()=>{if(i||c||!n())return;let r=new AbortController;c=r;let a=m(()=>r.abort(),5e3);try{let n=await fetch(`${e}/sessions/${t}`,{signal:r.signal});if(!n.ok)return;let a=await n.json();!i&&!r.signal.aborted&&Array.isArray(a.annotations)&&a.annotations.forEach(l)}catch{}finally{clearTimeout(a),c===r&&(c=void 0)}},d=()=>{if(i)return;let n=new EventSource(`${e}/sessions/${t}/events`),r=()=>{s=1e3,u()},c=e=>{try{l(JSON.parse(e.data).payload)}catch{}},f=()=>{n.readyState!==EventSource.CLOSED||i||o!==void 0||(a?.(),o=m(()=>{o=void 0,d()},s),s=Math.min(s*2,1e4))};n.addEventListener(`open`,r),n.addEventListener(`annotation.updated`,c),n.addEventListener(`error`,f),a=()=>{n.removeEventListener(`open`,r),n.removeEventListener(`annotation.updated`,c),n.removeEventListener(`error`,f),n.close()}};d();let f=h(()=>{u()},1e4);return()=>{i=!0,a?.(),o!==void 0&&clearTimeout(o),clearInterval(f),c?.abort()}}var Hi=`.styles-module__surface___7qnpJ {
  padding: 0;
  width: var(--preview-width, 200px);
  max-width: calc(100vw - 24px);
  overflow: auto;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  border-radius: 12px;
  z-index: inherit;
  will-change: auto;
  transform: translateX(-50%);
  transition: left 200ms cubic-bezier(0.2, 0.8, 0.2, 1), top 200ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1), width 200ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 100ms ease-out, visibility 0s 200ms;
}
.styles-module__surface___7qnpJ[data-positioning] {
  transition: none;
}
.styles-module__surface___7qnpJ[data-direct-entry] *, .styles-module__surface___7qnpJ[data-direct-entry] *::before, .styles-module__surface___7qnpJ[data-direct-entry] *::after {
  transition: none !important;
}
.styles-module__surface___7qnpJ[data-state=preview], .styles-module__surface___7qnpJ[data-state=edit] {
  opacity: 1;
  visibility: visible;
  transition-delay: 0s;
}
.styles-module__surface___7qnpJ[data-state=edit], .styles-module__surface___7qnpJ[data-annotation-popup][data-state=hidden] {
  width: 280px;
  border-radius: 16px;
}
.styles-module__surface___7qnpJ[data-state=edit] {
  pointer-events: auto;
}
.styles-module__surface___7qnpJ[data-state=preview] {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=light] .styles-module__surface___7qnpJ[data-state=preview] {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
}

@media (prefers-reduced-motion: reduce) {
  .styles-module__surface___7qnpJ {
    transition: opacity 100ms ease-out, visibility 0s 100ms;
  }
}`,Ui={surface:`styles-module__surface___7qnpJ`},Wi=(0,i.forwardRef)(function({annotation:e,editing:t,exiting:n,restorePreview:r,editorProps:a,lightMode:s,scrollY:c,onExited:l},u){let d=(0,i.useRef)({annotation:e,editorProps:a}),f=e??d.current.annotation,p=e?a:d.current.editorProps,m=(0,i.useRef)(null),h=(0,i.useRef)(null),g=(0,i.useRef)(),_=(0,i.useRef)(c),v=t&&!n?`edit`:e&&(!t||r)?`preview`:`hidden`,y=v===`preview`||!t;return(0,i.useLayoutEffect)(()=>{e&&(d.current={annotation:e,editorProps:a})},[e,a]),(0,i.useLayoutEffect)(()=>{let e=m.current;if(!e||!f)return;let n=v===`edit`&&(g.current!==f.id||e.dataset.state===`hidden`&&getComputedStyle(e).opacity===`0`);n&&(e.dataset.directEntry=`true`);let r=()=>{let n=f.x/100*window.innerWidth,r=f.isFixed?f.y:f.y-c,i=v===`preview`||!t,a=parseFloat(e.style.getPropertyValue(`--preview-width`))||200,o=Math.min(a,window.innerWidth-24),s=Math.max(12,Math.min(window.innerWidth-o-12,n-o/2)),l=i?o:Math.min(280,window.innerWidth-24),u=Math.min(i?12:20,(window.innerWidth-l)/2),d=r>window.innerHeight-(i?101:290);e.style.left=`${Math.max(u,Math.min(window.innerWidth-l-u,s))}px`,e.style.right=`auto`,e.style.top=`${Math.max(12,Math.min(window.innerHeight-12,r+(d?-21:21)))}px`,e.style.bottom=`auto`,e.style.transform=d?`translateY(-100%)`:`translateY(0)`,e.style.maxHeight=`${Math.max(100,d?r-33:window.innerHeight-r-33)}px`},i=g.current!==f.id||_.current!==c||e.dataset.state===`hidden`;i&&(e.dataset.positioning=`true`),r(),(i||n)&&e.getBoundingClientRect(),delete e.dataset.positioning,delete e.dataset.directEntry,e.dataset.state=v,e.inert=v!==`edit`,g.current=f.id,_.current=c;let a=()=>{e.dataset.positioning=`true`,r(),e.getBoundingClientRect(),delete e.dataset.positioning};return window.addEventListener(`resize`,a),()=>window.removeEventListener(`resize`,a)},[f?.id,f?.x,f?.y,f?.isFixed,v,t,c,f?.comment]),(0,i.useLayoutEffect)(()=>{t&&!n&&h.current?.focus()},[t,n,f?.id]),P(m,n,l),(0,i.useImperativeHandle)(u,()=>({shake(){m.current?.animate?.([{translate:`0px`},{translate:`-3px`},{translate:`3px`},{translate:`-2px`},{translate:`2px`},{translate:`0px`}],{duration:250}),h.current?.focus()}}),[]),!f||!p?null:(0,o.jsx)(`div`,{ref:m,className:`${F.popup} ${Ui.surface} ${s?F.light:``}`,"data-feedback-toolbar":!0,"data-annotation-card":!0,"data-annotation-popup":t?``:void 0,"data-state":`hidden`,"aria-hidden":v===`hidden`,onClick:e=>e.stopPropagation(),onKeyDownCapture:e=>{e.key!==`Escape`||e.nativeEvent.isComposing||!t||(e.preventDefault(),e.stopPropagation(),p.onCancel())},children:(0,o.jsx)(Ue,{ref:h,...p,variant:`card`,preview:y,resetOnPreview:!t,disabled:!t||n},f.id)})}),Gi=`@keyframes styles-module__markerIn___x4G8D {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes styles-module__markerOut___6VhQN {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
}
@keyframes styles-module__renumberRoll___akV9B {
  0% {
    transform: translateX(-40%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.styles-module__marker___9CKF7 {
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-family: inherit;
  line-height: 1;
  text-align: center;
  appearance: none;
  position: absolute;
  width: 22px;
  height: 22px;
  background: var(--agentation-color-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  -webkit-user-select: none;
  user-select: none;
  will-change: transform, opacity;
  contain: layout style;
  z-index: 1;
}
.styles-module__marker___9CKF7 > * {
  pointer-events: none;
}
.styles-module__marker___9CKF7:focus-visible {
  outline: 2px solid var(--agentation-color-accent);
  outline-offset: 3px;
}
.styles-module__marker___9CKF7:hover, .styles-module__marker___9CKF7:focus-visible, .styles-module__marker___9CKF7.styles-module__previewVisible___imMag {
  z-index: 2;
}
.styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):not(.styles-module__confirm___BtMvq) {
  transition: background-color 0.15s ease, transform 0.1s ease, z-index 0s 0.1s;
}
.styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):not(.styles-module__confirm___BtMvq):hover, .styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):not(.styles-module__confirm___BtMvq):focus-visible, .styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):not(.styles-module__confirm___BtMvq).styles-module__previewVisible___imMag {
  transition-delay: 0s;
}
.styles-module__marker___9CKF7.styles-module__enter___8kI3q {
  animation: styles-module__markerIn___x4G8D 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.styles-module__marker___9CKF7.styles-module__confirm___BtMvq {
  animation: styles-module__markerConfirm___RT4Sk 220ms ease-out both;
}
.styles-module__marker___9CKF7.styles-module__exit___KBdR3 {
  animation: styles-module__markerOut___6VhQN 0.2s ease-out both;
  pointer-events: none;
}
.styles-module__marker___9CKF7.styles-module__clearing___8rM7K {
  animation: styles-module__markerOut___6VhQN 0.15s ease-out both;
  pointer-events: none;
}
.styles-module__marker___9CKF7:not(.styles-module__enter___8kI3q):not(.styles-module__exit___KBdR3):not(.styles-module__clearing___8rM7K):not(.styles-module__confirm___BtMvq):hover {
  transform: translate(-50%, -50%) scale(1.1);
}
.styles-module__marker___9CKF7.styles-module__pending___BiY-U {
  background-color: var(--agentation-color-blue);
  cursor: default;
}
.styles-module__marker___9CKF7.styles-module__pending___BiY-U.styles-module__exit___KBdR3 {
  animation-duration: 150ms;
}
.styles-module__marker___9CKF7.styles-module__multiSelect___CPfTC {
  background-color: var(--agentation-color-green);
  width: 26px;
  height: 26px;
  border-radius: 6px;
  font-size: 0.75rem;
}
.styles-module__marker___9CKF7.styles-module__multiSelect___CPfTC.styles-module__pending___BiY-U {
  background-color: var(--agentation-color-green);
}
.styles-module__marker___9CKF7.styles-module__hovered___-mg2N {
  background-color: var(--agentation-color-red);
}

.styles-module__renumber___16lvD {
  display: block;
  animation: styles-module__renumberRoll___akV9B 0.2s ease-out;
}

@keyframes styles-module__markerConfirm___RT4Sk {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  25% {
    transform: translate(-50%, -50%) scale(0.94);
  }
  65% {
    transform: translate(-50%, -50%) scale(1.06);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
.styles-module__number___1JFu9 {
  display: block;
}

.styles-module__numberGlyph___qchdk {
  display: block;
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
  transition: opacity 140ms ease-out, transform 180ms cubic-bezier(0.22, 1, 0.36, 1), filter 140ms ease-out;
}

.styles-module__actionGlyph___AFRt0 {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  opacity: 0;
  transform: translateY(2px) scale(0.8) rotate(-12deg);
  filter: blur(1px);
  transition: opacity 120ms ease-out, transform 160ms cubic-bezier(0.22, 1, 0.36, 1), filter 120ms ease-out;
}

.styles-module__actionVisible___Kb--l .styles-module__numberGlyph___qchdk {
  opacity: 0;
  transform: translateY(-2px) scale(0.8);
  filter: blur(1px);
}
.styles-module__actionVisible___Kb--l .styles-module__actionGlyph___AFRt0 {
  opacity: 1;
  transform: translateY(0) scale(1) rotate(0);
  filter: blur(0);
}

.styles-module__plus___xslMP {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
  filter: blur(1px);
  transition: opacity 100ms ease-out, transform 140ms ease-out, filter 100ms ease-out;
  pointer-events: none;
}

.styles-module__pending___BiY-U .styles-module__numberGlyph___qchdk {
  opacity: 0;
  transform: translateY(5px);
  filter: blur(2px);
}
.styles-module__pending___BiY-U .styles-module__plus___xslMP {
  opacity: 1;
  transform: rotate(0) scale(1);
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .styles-module__marker___9CKF7.styles-module__enter___8kI3q, .styles-module__marker___9CKF7.styles-module__exit___KBdR3, .styles-module__marker___9CKF7.styles-module__clearing___8rM7K, .styles-module__marker___9CKF7.styles-module__confirm___BtMvq {
    animation-duration: 1ms;
    animation-delay: 0ms !important;
  }
  .styles-module__numberGlyph___qchdk, .styles-module__actionGlyph___AFRt0, .styles-module__plus___xslMP {
    transition: opacity 100ms ease-out;
    transform: none;
    filter: none;
  }
  .styles-module__pending___BiY-U .styles-module__numberGlyph___qchdk, .styles-module__pending___BiY-U .styles-module__plus___xslMP,
  .styles-module__actionVisible___Kb--l .styles-module__numberGlyph___qchdk, .styles-module__actionVisible___Kb--l .styles-module__actionGlyph___AFRt0 {
    transform: none;
    filter: none;
  }
}`,Ki={marker:`styles-module__marker___9CKF7`,previewVisible:`styles-module__previewVisible___imMag`,enter:`styles-module__enter___8kI3q`,exit:`styles-module__exit___KBdR3`,clearing:`styles-module__clearing___8rM7K`,confirm:`styles-module__confirm___BtMvq`,markerIn:`styles-module__markerIn___x4G8D`,markerConfirm:`styles-module__markerConfirm___RT4Sk`,markerOut:`styles-module__markerOut___6VhQN`,pending:`styles-module__pending___BiY-U`,multiSelect:`styles-module__multiSelect___CPfTC`,hovered:`styles-module__hovered___-mg2N`,renumber:`styles-module__renumber___16lvD`,renumberRoll:`styles-module__renumberRoll___akV9B`,number:`styles-module__number___1JFu9`,numberGlyph:`styles-module__numberGlyph___qchdk`,actionGlyph:`styles-module__actionGlyph___AFRt0`,actionVisible:`styles-module__actionVisible___Kb--l`,plus:`styles-module__plus___xslMP`},qi=(0,i.memo)(function({annotation:e,pending:t=!1,globalIndex:n,layerIndex:r,layerSize:a,isExiting:s,isClearing:c,isAnimated:l,isNew:u,isHovered:d,isRemoving:f,onRemoveComplete:p,isEditingAny:m,renumberFrom:h,markerClickBehavior:g,onHoverEnter:_,onEnterComplete:v,onHoverLeave:y,onClick:b,onContextMenu:x}){let[S,C]=(0,i.useState)(l),w=(0,i.useRef)(t),[T,E]=(0,i.useState)(!1),ee=w.current&&!t&&S&&!T;(0,i.useLayoutEffect)(()=>{s&&C(!1)},[s]);let D=(0,i.useRef)(null),O=(0,i.useRef)({action:!1,delete:!1}),k=d&&!m,te=k&&g===`delete`;(0,i.useLayoutEffect)(()=>{f||(O.current={action:k,delete:te})},[f,k,te]);let ne=f?O.current.action:k,A=f?O.current.delete:te;P(D,f,()=>p(e.id));let re=e.isMultiSelect,ie=re?`var(--agentation-color-green)`:`var(--agentation-color-accent)`,ae=c?Ki.clearing:s||f?Ki.exit:ee?Ki.confirm:!l&&!S?Ki.enter:``,oe=c?`${Math.min(r*20,120)}ms`:f||t||ee?`0ms`:s?`${(a-1-r)*20}ms`:`${u?0:r*20}ms`;return(0,o.jsxs)(`button`,{ref:D,type:`button`,"aria-label":t?`Pending annotation`:`${g===`delete`?`Delete`:`Edit`} annotation ${n+1}: ${e.element}`,disabled:t||s||f||c,tabIndex:t||m?-1:0,className:`${Ki.marker} ${t?Ki.pending:``} ${re?Ki.multiSelect:``} ${ae} ${!t&&ne?Ki.actionVisible:``} ${A?Ki.hovered:``} ${d&&!m&&!f?Ki.previewVisible:``}`,"data-annotation-marker":t?void 0:``,"data-annotation-pending":t?``:void 0,style:{left:`${e.x}%`,top:e.y,backgroundColor:A?void 0:ie,animationDelay:oe},onAnimationEnd:n=>{n.target===n.currentTarget&&(ae===Ki.enter||ae===Ki.confirm)&&(C(!0),t||E(!0),t||v(e.id))},onMouseOver:()=>{t||_(e)},onMouseOut:t=>{let n=t.relatedTarget;(!(n instanceof Node)||!t.currentTarget.contains(n))&&y(e.id)},onFocus:n=>{!t&&n.currentTarget.matches(`:focus-visible`)&&_(e)},onBlur:()=>y(e.id),onClick:n=>{n.stopPropagation(),!t&&!s&&!f&&b(e,n.currentTarget)},onContextMenu:x?n=>{g===`delete`&&(n.preventDefault(),n.stopPropagation(),!t&&!s&&!f&&x(e,n.currentTarget))}:void 0,children:[(0,o.jsx)(`span`,{className:`${Ki.number} ${h!==null&&n>=h?Ki.renumber:``}`,"aria-hidden":`true`,children:(0,o.jsx)(`span`,{className:Ki.numberGlyph,children:n+1})},n),(0,o.jsx)(`span`,{className:Ki.actionGlyph,"aria-hidden":`true`,children:g===`delete`?(0,o.jsx)(et,{size:re?18:16}):(0,o.jsx)(rt,{size:16})}),w.current&&(0,o.jsx)(`span`,{className:Ki.plus,"aria-hidden":`true`,children:(0,o.jsx)(Ke,{size:12})})]})}),Ji=`.styles-module__switchContainer___Ka-AB {
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px;
  width: 24px;
  height: 16px;
  border-radius: 8px;
  background-color: #cdcdcd;
  transition: background-color 0.15s, opacity 0.15s;
}
[data-agentation-theme=dark] .styles-module__switchContainer___Ka-AB {
  background-color: #484848;
}
.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:checked) {
  background-color: var(--agentation-color-blue);
}
.styles-module__switchContainer___Ka-AB:has(.styles-module__switchInput___kYDSD:disabled) {
  opacity: 0.3;
}

.styles-module__switchInput___kYDSD {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  cursor: pointer;
}
.styles-module__switchInput___kYDSD:disabled {
  cursor: not-allowed;
}

.styles-module__switchThumb___4sCPH {
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background-color: #fff;
  transition: transform 0.15s;
}
.styles-module__switchContainer___Ka-AB[data-checked] .styles-module__switchThumb___4sCPH {
  transform: translateX(8px);
}`,Yi={switchContainer:`styles-module__switchContainer___Ka-AB`,switchInput:`styles-module__switchInput___kYDSD`,switchThumb:`styles-module__switchThumb___4sCPH`},Xi=({className:e=``,checked:t,onChange:n,...r})=>(0,o.jsxs)(`div`,{className:`${Yi.switchContainer} ${e}`,"data-checked":t?``:void 0,children:[(0,o.jsx)(`input`,{className:Yi.switchInput,checked:t,onChange:n,type:`checkbox`,...r}),(0,o.jsx)(`div`,{className:Yi.switchThumb})]}),Zi=`.styles-module__checkboxContainer___joqZk {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid rgba(26, 26, 26, 0.2);
  border-radius: 4px;
  width: 14px;
  height: 14px;
  background-color: #fff;
  transition: background-color 0.2s ease;
}
[data-agentation-theme=dark] .styles-module__checkboxContainer___joqZk {
  border-color: rgba(255, 255, 255, 0.2);
  background-color: #252525;
}
.styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) {
  background-color: #1a1a1a;
}
[data-agentation-theme=dark] .styles-module__checkboxContainer___joqZk:has(.styles-module__checkboxInput___ECzzO:checked) {
  background-color: #fff;
}

.styles-module__checkboxInput___ECzzO {
  position: absolute;
  z-index: 1;
  inset: -1px;
  border-radius: inherit;
  opacity: 0;
  cursor: pointer;
}

.styles-module__checkboxCheck___fUXpr {
  color: #fafafa;
}
[data-agentation-theme=dark] .styles-module__checkboxCheck___fUXpr {
  color: #1a1a1a;
}

.styles-module__checkboxCheckPath___cDyh8 {
  stroke-dasharray: 9.29px;
  stroke-dashoffset: 9.29px;
  color: #fafafa;
  transition: stroke-dashoffset 0.1s ease;
}
[data-agentation-theme=dark] .styles-module__checkboxCheckPath___cDyh8 {
  color: #1a1a1a;
}
.styles-module__checkboxContainer___joqZk[data-checked] .styles-module__checkboxCheckPath___cDyh8 {
  transition-duration: 0.2s;
  stroke-dashoffset: 0;
}`,Qi={checkboxContainer:`styles-module__checkboxContainer___joqZk`,checkboxInput:`styles-module__checkboxInput___ECzzO`,checkboxCheck:`styles-module__checkboxCheck___fUXpr`,checkboxCheckPath:`styles-module__checkboxCheckPath___cDyh8`},$i=({className:e=``,checked:t,onChange:n,...r})=>(0,o.jsxs)(`div`,{className:`${Qi.checkboxContainer} ${e}`,"data-checked":t?``:void 0,children:[(0,o.jsx)(`input`,{className:Qi.checkboxInput,type:`checkbox`,checked:t,onChange:n,...r}),(0,o.jsx)(`svg`,{className:Qi.checkboxCheck,width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,children:(0,o.jsx)(`path`,{className:Qi.checkboxCheckPath,d:`M3.94 7L6.13 9.19L10.5 4.81`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})})]}),ea=`.styles-module__container___w8eAF {
  display: flex;
  align-items: center;
  height: 24px;
}

.styles-module__label___J5mxE {
  padding-inline: 8px 2px;
  line-height: 20px;
  font-size: 13px;
  letter-spacing: -0.15px;
  color: rgba(26, 26, 26, 0.5);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
}
[data-agentation-theme=dark] .styles-module__label___J5mxE {
  color: rgba(255, 255, 255, 0.5);
}`,ta={container:`styles-module__container___w8eAF`,label:`styles-module__label___J5mxE`},na=({className:e=``,label:t,tooltip:n,checked:r,onChange:a,...s})=>{let c=(0,i.useId)();return(0,o.jsxs)(`div`,{className:`${ta.container} ${e}`,...s,children:[(0,o.jsx)($i,{id:c,onChange:a,checked:r}),(0,o.jsx)(`label`,{className:ta.label,htmlFor:c,children:t}),n&&(0,o.jsx)(lt,{content:n})]})},ra=`@keyframes styles-module__cycleTextIn___VBNTi {
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes styles-module__scaleIn___QpQ8E {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes styles-module__mcpPulse___5Q3Jj {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-green) 0%, transparent);
  }
}
@keyframes styles-module__mcpPulseError___VHxhx {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 50%, transparent);
  }
  70% {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--agentation-color-red) 0%, transparent);
  }
}
@keyframes styles-module__themeIconIn___qUWMV {
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-30deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
.styles-module__settingsPanel___qNkn- :where(button, a, input, select, textarea):focus-visible {
  outline: 2px solid var(--agentation-color-accent);
  outline-offset: 2px;
}
.styles-module__settingsPanel___qNkn- {
  position: absolute;
  right: 5px;
  bottom: calc(100% + 0.5rem);
  z-index: 1;
  overflow: hidden;
  background: #1c1c1c;
  border-radius: 16px;
  padding: 12px 0;
  width: 253px;
  max-width: calc(100vw - 20px);
  cursor: default;
  opacity: 1;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}
.styles-module__settingsPanel___qNkn-::before, .styles-module__settingsPanel___qNkn-::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16px;
  z-index: 2;
  pointer-events: none;
}
.styles-module__settingsPanel___qNkn-::before {
  left: 0;
  background: linear-gradient(to right, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___qNkn-::after {
  right: 0;
  background: linear-gradient(to left, #1c1c1c 0%, transparent 100%);
}
.styles-module__settingsPanel___qNkn- .styles-module__settingsHeader___Fn1DP,
.styles-module__settingsPanel___qNkn- .styles-module__settingsBrand___OoKlM,
.styles-module__settingsPanel___qNkn- .styles-module__settingsVersion___rXmL9,
.styles-module__settingsPanel___qNkn- .styles-module__settingsSection___n5V-4,
.styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ,
.styles-module__settingsPanel___qNkn- .styles-module__cycleButton___XMBx3,
.styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY,
.styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8,
.styles-module__settingsPanel___qNkn- .styles-module__sliderLabel___6K5v1,
.styles-module__settingsPanel___qNkn- .styles-module__slider___v5z-c,
.styles-module__settingsPanel___qNkn- .styles-module__themeToggle___3imlT {
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.styles-module__settingsPanel___qNkn- {
  opacity: 0;
  transform: translateY(var(--panel-offset-y, 4px)) scale(0.98);
  transform-origin: var(--panel-origin, bottom right);
  filter: blur(2px);
  pointer-events: none;
  visibility: hidden;
  transition: opacity 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.styles-module__settingsPanel___qNkn-[data-panel-present=true] {
  visibility: visible;
}
.styles-module__settingsPanel___qNkn-[data-panel-open=true] {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
  pointer-events: auto;
  transition-duration: 160ms;
}
@media (prefers-reduced-motion: reduce) {
  .styles-module__settingsPanel___qNkn- {
    transition: none;
    transform: none;
    filter: none;
  }
}
.styles-module__settingsPanel___qNkn-.styles-module__below___Vpv-k {
  --panel-offset-y: -4px;
  --panel-origin: top right;
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- {
  background: #1a1a1a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ {
  color: rgba(255, 255, 255, 0.6);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH- {
  color: rgba(255, 255, 255, 0.85);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH-:hover {
  background: rgba(255, 255, 255, 0.1);
}
[data-agentation-theme=dark] .styles-module__settingsPanel___qNkn- .styles-module__settingsOption___JoyH-.styles-module__selected___k1-Vq {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.styles-module__settingsPanelContainer___5it-H {
  overflow: visible;
  position: relative;
  display: flex;
  padding: 0 16px;
}

.styles-module__settingsPage___BMn-3 {
  min-width: 100%;
  flex-basis: 0;
  flex-shrink: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
  transition-delay: 0s;
  opacity: 1;
}

.styles-module__settingsPage___BMn-3.styles-module__slideLeft___qUvW4 {
  transform: translateX(-24px);
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___N7By0 {
  position: absolute;
  top: 0;
  left: 24px;
  width: 100%;
  height: 100%;
  padding: 0 16px 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0;
  pointer-events: none;
}

.styles-module__automationsPage___N7By0.styles-module__slideIn___uXDSu {
  transform: translateX(-24px);
  opacity: 1;
  pointer-events: auto;
}

.styles-module__settingsHeader___Fn1DP {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
}

.styles-module__settingsBrand___OoKlM {
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: -0.0094em;
  color: #bbb;
  text-decoration: none;
}

.styles-module__settingsVersion___rXmL9 {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  margin-left: 6px;
  letter-spacing: -0.0094em;
}

.styles-module__themeToggle___3imlT {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-left: auto;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.15s ease, color 0.15s ease;
  cursor: pointer;
}
.styles-module__themeToggle___3imlT:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}
[data-agentation-theme=light] .styles-module__themeToggle___3imlT {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__themeToggle___3imlT:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.7);
}

.styles-module__themeIconWrapper___pyaYa {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 20px;
  height: 20px;
}

.styles-module__themeIcon___w7lAm {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: styles-module__themeIconIn___qUWMV 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.styles-module__settingsSectionGrow___eZTRw {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.styles-module__settingsRow___y-tDE {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
}
.styles-module__settingsRow___y-tDE.styles-module__settingsRowMarginTop___uLpGb {
  margin-top: 8px;
}

.styles-module__settingsRowDisabled___ydl3Q .styles-module__settingsLabel___VCVOQ {
  color: rgba(255, 255, 255, 0.2);
}
[data-agentation-theme=light] .styles-module__settingsRowDisabled___ydl3Q .styles-module__settingsLabel___VCVOQ {
  color: rgba(0, 0, 0, 0.2);
}

.styles-module__settingsLabel___VCVOQ {
  display: flex;
  align-items: center;
  column-gap: 2px;
  line-height: 20px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: -0.15px;
  color: rgba(255, 255, 255, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsLabel___VCVOQ {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__cycleButton___XMBx3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  letter-spacing: -0.0094em;
}
[data-agentation-theme=light] .styles-module__cycleButton___XMBx3 {
  color: rgba(0, 0, 0, 0.85);
}
.styles-module__cycleButton___XMBx3:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.styles-module__cycleButtonText___mbbnD {
  display: inline-block;
  animation: styles-module__cycleTextIn___VBNTi 0.2s ease-out;
}

.styles-module__cycleDots___ehp6i {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.styles-module__cycleDot___zgSXY {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.667);
  transition: background-color 0.25s ease-out, transform 0.25s ease-out;
}
.styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {
  background: #fff;
  transform: scale(1);
}
[data-agentation-theme=light] .styles-module__cycleDot___zgSXY {
  background: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {
  background: rgba(0, 0, 0, 0.7);
}

.styles-module__colorOptions___pbxZx {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  height: 26px;
}

.styles-module__colorOption___Co955 {
  padding: 0;
  position: relative;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: #fff;
  cursor: pointer;
}
[data-agentation-theme=dark] .styles-module__colorOption___Co955 {
  background-color: #1a1a1a;
}
.styles-module__colorOption___Co955::before, .styles-module__colorOption___Co955::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background-color: var(--swatch);
  transition: opacity 0.2s, transform 0.2s;
}
@supports (color: color(display-p3 0 0 0)) {
  .styles-module__colorOption___Co955::before, .styles-module__colorOption___Co955::after {
    --color: var(--swatch-p3);
  }
}
.styles-module__colorOption___Co955::after {
  z-index: -1;
  transform: scale(1.2);
  opacity: 0;
}
.styles-module__colorOption___Co955.styles-module__selected___k1-Vq::before {
  transform: scale(0.8);
}
.styles-module__colorOption___Co955.styles-module__selected___k1-Vq::after {
  opacity: 1;
}

.styles-module__settingsNavLink___uYIwM {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  line-height: 20px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.15s ease;
  cursor: pointer;
}
.styles-module__settingsNavLink___uYIwM:hover {
  color: rgba(255, 255, 255, 0.9);
}
.styles-module__settingsNavLink___uYIwM svg {
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s ease;
}
.styles-module__settingsNavLink___uYIwM:hover svg {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM:hover {
  color: rgba(0, 0, 0, 0.8);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM svg {
  color: rgba(0, 0, 0, 0.25);
}
[data-agentation-theme=light] .styles-module__settingsNavLink___uYIwM:hover svg {
  color: rgba(0, 0, 0, 0.8);
}

.styles-module__settingsNavLinkRight___XBUzC {
  display: flex;
  align-items: center;
  gap: 6px;
}

.styles-module__settingsBackButton___fflll {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  border: none;
  background: transparent;
  font-family: inherit;
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.15px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.12s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___fflll svg {
  opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.32, 0.72, 0, 1);
}
.styles-module__settingsBackButton___fflll:hover svg {
  opacity: 1;
}
[data-agentation-theme=light] .styles-module__settingsBackButton___fflll {
  color: rgba(0, 0, 0, 0.85);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.styles-module__automationHeader___Avra9 {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #fff;
}
[data-agentation-theme=light] .styles-module__automationHeader___Avra9 {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__automationDescription___vFTmJ {
  font-size: 0.6875rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  line-height: 14px;
}
[data-agentation-theme=light] .styles-module__automationDescription___vFTmJ {
  color: rgba(0, 0, 0, 0.5);
}

.styles-module__learnMoreLink___cG7OI {
  color: rgba(255, 255, 255, 0.8);
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-decoration-color: rgba(255, 255, 255, 0.2);
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.styles-module__learnMoreLink___cG7OI:hover {
  color: #fff;
}
[data-agentation-theme=light] .styles-module__learnMoreLink___cG7OI {
  color: rgba(0, 0, 0, 0.6);
  text-decoration-color: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__learnMoreLink___cG7OI:hover {
  color: rgba(0, 0, 0, 0.85);
}

.styles-module__autoSendContainer___VpkXk {
  display: flex;
  align-items: center;
}

.styles-module__autoSendLabel___ngNdC {
  padding-inline-end: 8px;
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.15s, opacity 0.15s;
  cursor: pointer;
}
.styles-module__autoSendLabel___ngNdC.styles-module__active___dpAhM {
  color: #66b8ff;
  color: color(display-p3 0.4 0.72 1);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___ngNdC {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__autoSendLabel___ngNdC.styles-module__active___dpAhM {
  color: var(--agentation-color-blue);
}
.styles-module__autoSendLabel___ngNdC.styles-module__disabled___9AZYS {
  opacity: 0.3;
  cursor: not-allowed;
}

.styles-module__mcpStatusDot___8AMxP {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpStatusDot___8AMxP.styles-module__connecting___QEO1r {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___5Q3Jj 1.5s infinite;
}
.styles-module__mcpStatusDot___8AMxP.styles-module__connected___WyFkx {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___5Q3Jj 2.5s ease-in-out infinite;
}
.styles-module__mcpStatusDot___8AMxP.styles-module__disconnected___mvmvQ {
  background-color: var(--agentation-color-red);
  animation: styles-module__mcpPulseError___VHxhx 2s infinite;
}

.styles-module__mcpNavIndicator___auBHI {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.styles-module__mcpNavIndicator___auBHI.styles-module__connected___WyFkx {
  background-color: var(--agentation-color-green);
  animation: styles-module__mcpPulse___5Q3Jj 2.5s ease-in-out infinite;
}
.styles-module__mcpNavIndicator___auBHI.styles-module__connecting___QEO1r {
  background-color: var(--agentation-color-yellow);
  animation: styles-module__mcpPulse___5Q3Jj 1.5s ease-in-out infinite;
}

.styles-module__webhookUrlInput___WDDDC {
  display: block;
  width: 100%;
  flex: 1;
  min-height: 60px;
  box-sizing: border-box;
  margin-top: 11px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 400;
  color: #fff;
  outline: none;
  resize: none;
  user-select: text;
  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
}
.styles-module__webhookUrlInput___WDDDC::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.styles-module__webhookUrlInput___WDDDC:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC {
  border-color: rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
[data-agentation-theme=light] .styles-module__webhookUrlInput___WDDDC:focus {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.05);
}

[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn-::before {
  background: linear-gradient(to right, #fff 0%, transparent 100%);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn-::after {
  background: linear-gradient(to left, #fff 0%, transparent 100%);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsHeader___Fn1DP {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsBrand___OoKlM {
  color: #333;
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsVersion___rXmL9 {
  color: rgba(0, 0, 0, 0.4);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsSection___n5V-4 {
  border-top-color: rgba(0, 0, 0, 0.08);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__settingsLabel___VCVOQ {
  color: rgba(0, 0, 0, 0.5);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleButton___XMBx3 {
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY {
  background: rgba(0, 0, 0, 0.2);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__cycleDot___zgSXY.styles-module__active___dpAhM {
  background: rgba(0, 0, 0, 0.7);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8 {
  color: rgba(0, 0, 0, 0.85);
}
[data-agentation-theme=light] .styles-module__settingsPanel___qNkn- .styles-module__dropdownButton___mKHe8:hover {
  background: rgba(0, 0, 0, 0.05);
}

.styles-module__checkboxField___ZrSqv:not(:first-child) {
  margin-top: 8px;
}

.styles-module__divider___h6Yux {
  margin-block: 8px;
  width: 100%;
  height: 1px;
  background-color: rgba(26, 26, 26, 0.07);
}
[data-agentation-theme=dark] .styles-module__divider___h6Yux {
  background-color: rgba(255, 255, 255, 0.07);
}`,$={settingsPanel:`styles-module__settingsPanel___qNkn-`,settingsHeader:`styles-module__settingsHeader___Fn1DP`,settingsBrand:`styles-module__settingsBrand___OoKlM`,settingsVersion:`styles-module__settingsVersion___rXmL9`,settingsSection:`styles-module__settingsSection___n5V-4`,settingsLabel:`styles-module__settingsLabel___VCVOQ`,cycleButton:`styles-module__cycleButton___XMBx3`,cycleDot:`styles-module__cycleDot___zgSXY`,dropdownButton:`styles-module__dropdownButton___mKHe8`,sliderLabel:`styles-module__sliderLabel___6K5v1`,slider:`styles-module__slider___v5z-c`,themeToggle:`styles-module__themeToggle___3imlT`,below:`styles-module__below___Vpv-k`,settingsOption:`styles-module__settingsOption___JoyH-`,selected:`styles-module__selected___k1-Vq`,settingsPanelContainer:`styles-module__settingsPanelContainer___5it-H`,settingsPage:`styles-module__settingsPage___BMn-3`,slideLeft:`styles-module__slideLeft___qUvW4`,automationsPage:`styles-module__automationsPage___N7By0`,slideIn:`styles-module__slideIn___uXDSu`,themeIconWrapper:`styles-module__themeIconWrapper___pyaYa`,themeIcon:`styles-module__themeIcon___w7lAm`,themeIconIn:`styles-module__themeIconIn___qUWMV`,settingsSectionGrow:`styles-module__settingsSectionGrow___eZTRw`,settingsRow:`styles-module__settingsRow___y-tDE`,settingsRowMarginTop:`styles-module__settingsRowMarginTop___uLpGb`,settingsRowDisabled:`styles-module__settingsRowDisabled___ydl3Q`,cycleButtonText:`styles-module__cycleButtonText___mbbnD`,cycleTextIn:`styles-module__cycleTextIn___VBNTi`,cycleDots:`styles-module__cycleDots___ehp6i`,active:`styles-module__active___dpAhM`,colorOptions:`styles-module__colorOptions___pbxZx`,colorOption:`styles-module__colorOption___Co955`,settingsNavLink:`styles-module__settingsNavLink___uYIwM`,settingsNavLinkRight:`styles-module__settingsNavLinkRight___XBUzC`,settingsBackButton:`styles-module__settingsBackButton___fflll`,automationHeader:`styles-module__automationHeader___Avra9`,automationDescription:`styles-module__automationDescription___vFTmJ`,learnMoreLink:`styles-module__learnMoreLink___cG7OI`,autoSendContainer:`styles-module__autoSendContainer___VpkXk`,autoSendLabel:`styles-module__autoSendLabel___ngNdC`,disabled:`styles-module__disabled___9AZYS`,mcpStatusDot:`styles-module__mcpStatusDot___8AMxP`,connecting:`styles-module__connecting___QEO1r`,mcpPulse:`styles-module__mcpPulse___5Q3Jj`,connected:`styles-module__connected___WyFkx`,disconnected:`styles-module__disconnected___mvmvQ`,mcpPulseError:`styles-module__mcpPulseError___VHxhx`,mcpNavIndicator:`styles-module__mcpNavIndicator___auBHI`,webhookUrlInput:`styles-module__webhookUrlInput___WDDDC`,checkboxField:`styles-module__checkboxField___ZrSqv`,divider:`styles-module__divider___h6Yux`,scaleIn:`styles-module__scaleIn___QpQ8E`},ia=(0,i.memo)(function({settings:e,onSettingsChange:t,isDarkMode:n,onToggleTheme:r,isDevMode:a,connectionStatus:s,endpoint:c,onExited:l,isOpen:u,toolbarNearBottom:d,settingsPage:f,onSettingsPageChange:p,onHideToolbar:m}){let{ref:h}=An(u,{keepMounted:!0,onExited:l}),g=(0,i.useRef)(null),_=(0,i.useRef)(null),v=(0,i.useRef)(!1);(0,i.useLayoutEffect)(()=>{!u||!v.current||(v.current=!1,(f===`automations`?_:g).current?.focus())},[u,f]);let y=n?`Switch to light mode`:`Switch to dark mode`;return(0,o.jsx)(`div`,{className:`${$.settingsPanel} ${d?$.below:``}`,style:d?{bottom:`auto`,top:`calc(100% + 0.5rem)`}:void 0,"data-agentation-settings-panel":!0,ref:e=>{h.current=e,e?.toggleAttribute(`inert`,!u)},role:`group`,"aria-label":`Feedback settings`,"aria-hidden":!u,children:(0,o.jsxs)(`div`,{className:$.settingsPanelContainer,children:[(0,o.jsxs)(`div`,{className:`${$.settingsPage} ${f===`automations`?$.slideLeft:``}`,ref:e=>{e?.toggleAttribute(`inert`,f!==`main`)},"aria-hidden":f!==`main`,children:[(0,o.jsxs)(`div`,{className:$.settingsHeader,children:[(0,o.jsx)(`a`,{className:$.settingsBrand,href:`https://agentation.com`,target:`_blank`,rel:`noopener noreferrer`,"aria-label":`Agentation`,children:`Agentation`}),(0,o.jsxs)(`p`,{className:$.settingsVersion,children:[`v`,`3.1.2`]}),(0,o.jsx)(`button`,{className:$.themeToggle,onClick:r,title:y,"aria-label":y,children:(0,o.jsx)(`span`,{className:$.themeIconWrapper,children:(0,o.jsx)(`span`,{className:$.themeIcon,children:n?(0,o.jsx)(tt,{size:20}):(0,o.jsx)(nt,{size:20})},n?`sun`:`moon`)})})]}),(0,o.jsx)(`div`,{className:$.divider}),(0,o.jsxs)(`div`,{className:$.settingsSection,children:[(0,o.jsxs)(`div`,{className:$.settingsRow,children:[(0,o.jsxs)(`div`,{className:$.settingsLabel,children:[`Output Detail`,(0,o.jsx)(lt,{content:`Controls how much detail is included in the copied output`})]}),(0,o.jsxs)(`button`,{className:$.cycleButton,onClick:()=>{t({outputDetail:Ni[(Ni.findIndex(t=>t.value===e.outputDetail)+1)%Ni.length].value})},children:[(0,o.jsx)(`span`,{className:$.cycleButtonText,children:Ni.find(t=>t.value===e.outputDetail)?.label},e.outputDetail),(0,o.jsx)(`span`,{className:$.cycleDots,children:Ni.map(t=>(0,o.jsx)(`span`,{className:`${$.cycleDot} ${e.outputDetail===t.value?$.active:``}`},t.value))})]})]}),(0,o.jsxs)(`div`,{className:`${$.settingsRow} ${$.settingsRowMarginTop} ${a?``:$.settingsRowDisabled}`,children:[(0,o.jsxs)(`div`,{className:$.settingsLabel,children:[`React Components`,(0,o.jsx)(lt,{content:a?`Include React component names in annotations`:`Disabled — production builds minify component names, making detection unreliable. Use in development mode.`})]}),(0,o.jsx)(Xi,{"aria-label":`React Components`,checked:a&&e.reactEnabled,onChange:e=>t({reactEnabled:e.target.checked}),disabled:!a})]}),(0,o.jsxs)(`div`,{className:`${$.settingsRow} ${$.settingsRowMarginTop}`,children:[(0,o.jsxs)(`div`,{className:$.settingsLabel,children:[`Hide Until Restart`,(0,o.jsx)(lt,{content:`Hides the toolbar until you open a new tab`})]}),(0,o.jsx)(Xi,{"aria-label":`Hide Until Restart`,checked:!1,onChange:e=>{e.target.checked&&m()}})]})]}),(0,o.jsx)(`div`,{className:$.divider}),(0,o.jsxs)(`div`,{className:$.settingsSection,children:[(0,o.jsx)(`div`,{className:`${$.settingsLabel} ${$.settingsLabelMarker}`,children:`Marker Color`}),(0,o.jsx)(`div`,{className:$.colorOptions,children:fa.map(n=>(0,o.jsx)(`button`,{className:`${$.colorOption} ${e.annotationColorId===n.id?$.selected:``}`,style:{"--swatch":n.srgb,"--swatch-p3":n.p3},onClick:()=>t({annotationColorId:n.id}),title:n.label,"aria-label":n.label,type:`button`},n.id))})]}),(0,o.jsx)(`div`,{className:$.divider}),(0,o.jsxs)(`div`,{className:$.settingsSection,children:[(0,o.jsx)(na,{className:`checkbox-field`,label:`Clear on copy/send`,checked:e.autoClearAfterCopy,onChange:e=>t({autoClearAfterCopy:e.target.checked}),tooltip:`Automatically clear annotations after copying`}),(0,o.jsx)(na,{className:$.checkboxField,label:`Block page interactions`,checked:e.blockInteractions,onChange:e=>t({blockInteractions:e.target.checked})})]}),(0,o.jsx)(`div`,{className:$.divider}),(0,o.jsxs)(`button`,{className:$.settingsNavLink,ref:g,onClick:e=>{v.current=e.detail===0,e.currentTarget.blur(),p(`automations`)},children:[(0,o.jsx)(`span`,{children:`Manage MCP & Webhooks`}),(0,o.jsxs)(`span`,{className:$.settingsNavLinkRight,children:[c&&s!==`disconnected`&&(0,o.jsx)(`span`,{className:`${$.mcpNavIndicator} ${$[s]}`}),(0,o.jsx)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:(0,o.jsx)(`path`,{d:`M7.5 12.5L12 8L7.5 3.5`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})})]})]})]}),(0,o.jsxs)(`div`,{className:`${$.settingsPage} ${$.automationsPage} ${f===`automations`?$.slideIn:``}`,ref:e=>{e?.toggleAttribute(`inert`,f!==`automations`)},"aria-hidden":f!==`automations`,children:[(0,o.jsxs)(`button`,{className:$.settingsBackButton,ref:_,"aria-label":`Back to settings`,onClick:e=>{v.current=e.detail===0,e.currentTarget.blur(),p(`main`)},children:[(0,o.jsx)(it,{size:16}),(0,o.jsx)(`span`,{children:`Manage MCP & Webhooks`})]}),(0,o.jsx)(`div`,{className:$.divider}),(0,o.jsxs)(`div`,{className:$.settingsSection,children:[(0,o.jsxs)(`div`,{className:$.settingsRow,children:[(0,o.jsxs)(`span`,{className:$.automationHeader,children:[`MCP Connection`,(0,o.jsx)(lt,{content:`Connect via Model Context Protocol to let AI agents like Claude Code receive annotations in real-time.`})]}),c&&(0,o.jsx)(`div`,{className:`${$.mcpStatusDot} ${$[s]}`,title:s===`connected`?`Connected`:s===`connecting`?`Connecting...`:`Disconnected`})]}),(0,o.jsxs)(`p`,{className:$.automationDescription,style:{paddingBottom:6},children:[`MCP connection allows agents to receive and act on annotations.`,` `,(0,o.jsx)(`a`,{href:`https://agentation.com/mcp`,target:`_blank`,rel:`noopener noreferrer`,className:$.learnMoreLink,children:`Learn more`})]})]}),(0,o.jsx)(`div`,{className:$.divider}),(0,o.jsxs)(`div`,{className:`${$.settingsSection} ${$.settingsSectionGrow}`,children:[(0,o.jsxs)(`div`,{className:$.settingsRow,children:[(0,o.jsxs)(`span`,{className:$.automationHeader,children:[`Webhooks`,(0,o.jsx)(lt,{content:`Send annotation data to any URL endpoint when annotations change. Useful for custom integrations.`})]}),(0,o.jsxs)(`div`,{className:$.autoSendContainer,children:[(0,o.jsx)(`label`,{htmlFor:`agentation-auto-send`,className:`${$.autoSendLabel} ${e.webhooksEnabled?$.active:``} ${e.webhookUrl?``:$.disabled}`,children:`Auto-Send`}),(0,o.jsx)(Xi,{id:`agentation-auto-send`,checked:e.webhooksEnabled,onChange:e=>t({webhooksEnabled:e.target.checked}),disabled:!e.webhookUrl})]})]}),(0,o.jsx)(`p`,{className:$.automationDescription,children:`The webhook URL will receive live annotation changes and annotation data.`}),(0,o.jsx)(`textarea`,{className:$.webhookUrlInput,placeholder:`Webhook URL`,"aria-label":`Webhook URL`,value:e.webhookUrl,onKeyDown:e=>e.stopPropagation(),onChange:e=>t({webhookUrl:e.target.value})})]})]})]})})});function aa({x:e,y:t,elementName:n,reactComponents:r}){let a=(0,i.useRef)(null);return(0,i.useLayoutEffect)(()=>{let n=a.current;if(!n)return;let r=()=>{let r=n.offsetWidth,i=n.offsetHeight;n.style.left=`${Math.max(8,Math.min(e,window.innerWidth-r-8))}px`;let a=t-i-8;n.style.top=`${Math.max(8,Math.min(a,window.innerHeight-i-8))}px`};return r(),window.addEventListener(`resize`,r),()=>window.removeEventListener(`resize`,r)},[e,t,n,r]),(0,o.jsxs)(`div`,{ref:a,className:`${L.hoverTooltip} ${L.enter}`,children:[r&&(0,o.jsx)(`div`,{className:L.hoverReactPath,children:r}),(0,o.jsx)(`div`,{className:L.hoverElementName,children:n})]})}var oa=[`@charset "UTF-8";
/* Reset box-model and set borders */
/* ============================================ */
*,
::before,
::after {
  border-width: 0;
  border-style: solid;
  box-sizing: border-box;
}

/* Document */
/* ============================================ */
/**
 * 1. Correct line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 * 3. Remove gray overlay on links for iOS.
 * 4. Render kerning consistently in all browsers.
 * 5. Correct font smoothing for macOS.
 */
:host {
  /* Inherited properties cross the shadow boundary, so a host page's
     text-transform, letter-spacing or font would otherwise restyle the UI. */
  font: 400 16px/1.5 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-variant: normal;
  color: initial;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-align: start;
  text-indent: 0;
  text-shadow: none;
  white-space: normal;
  direction: ltr;
  writing-mode: horizontal-tb;
  hyphens: manual;
  word-break: normal;
  overflow-wrap: normal;
  tab-size: 8;
  list-style: none;
  quotes: initial;
  caret-color: auto;
  user-select: auto;
  -webkit-text-fill-color: initial;
  -webkit-text-stroke: 0;
  text-rendering: auto;
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-tap-highlight-color: transparent; /* 3 */
  font-feature-settings: "kern"; /* 4 */
  -webkit-font-feature-settings: "kern"; /* 5 */
  -moz-font-feature-settings: "kern"; /* 5 */
  -webkit-font-smoothing: antialiased; /* 5 */
  -moz-osx-font-smoothing: grayscale; /* 5 */
}

/* Vertical rhythm */
/* ============================================ */
p,
table,
blockquote,
address,
pre,
iframe,
form,
figure,
dl {
  margin: 0;
}

/* Headings */
/* ============================================ */
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}

/* Lists (enumeration) */
/* ============================================ */
ul,
ol,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Lists (definition) */
/* ============================================ */
dd {
  margin-left: 0;
}

/* Grouping content */
/* ============================================ */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  clear: both;
  margin: 0;
  border-top-width: 1px;
  height: 0; /* 1 */
  box-sizing: content-box; /* 1 */
  overflow: visible; /* 2 */
  color: inherit;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 * 3. Wrap lines by default instead of overflow.
 */
pre {
  font-family: inherit; /* 1 */
  font-size: inherit; /* 2 */
  white-space: pre-line; /* 3 */
}

address {
  font-style: inherit;
}

/* Text-level semantics */
/* ============================================ */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: none; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: "Menlo", "Monaco", "Consolas", "Courier New", monospace; /* 1 */
  font-size: inherit; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
 */
sub,
sup {
  position: relative;
  vertical-align: baseline;
  line-height: 0;
  font-size: 75%;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Replaced content */
/* ============================================ */
/**
 * Prevent vertical alignment issues.
 */
svg,
img,
embed,
object,
iframe {
  vertical-align: bottom;
}

/*
 * 1. Remove image default bottom space.
 * 2. Prevent image from overflowing the container.
 */
img {
  display: block;
  max-width: 100%;
}

/**
 * Prevent alignment issues on Safari.
 */
@supports (background: -webkit-named-image(i)) {
  svg {
    will-change: transform;
  }
}
/* Forms */
/* ============================================ */
/**
 * Reset form fields to make them styleable.
 * 1. Make form elements stylable across systems iOS especially.
 * 2. Inherit text-transform from parent.
 */
button,
input,
optgroup,
select,
textarea {
  -webkit-appearance: none; /* 1 */
  appearance: none;
  border-radius: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  vertical-align: middle;
  text-align: inherit;
  text-transform: inherit; /* 2 */
  font: inherit;
  color: inherit;
}

/**
 * Correct cursors for clickable elements.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  cursor: pointer;
}

button:disabled,
[type=button]:disabled,
[type=reset]:disabled,
[type=submit]:disabled {
  cursor: default;
}

/**
 * Clickable labels and selects.
 */
select,
label {
  cursor: pointer;
}

/**
 * Improve outlines for Firefox and unify style with input elements & buttons.
 */
:-moz-focusring {
  outline: auto;
}

select:disabled {
  opacity: inherit;
}

/**
 * 1. Remove padding.
 */
option {
  padding: 0; /* 1 */
}

/**
 * Reset to invisible
 */
fieldset {
  margin: 0;
  padding: 0;
  min-width: 0;
}

legend {
  display: contents;
  padding: 0;
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * Remove increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

/**
 * Correct the outline style in Safari.
 */
[type=search] {
  outline-offset: -2px;
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
 * Remove the ‘X’ from Chrome and Safari.
 */
[type=search]::-webkit-search-decoration,
[type=search]::-webkit-search-cancel-button,
[type=search]::-webkit-search-results-button,
[type=search]::-webkit-search-results-decoration {
  display: none;
}

/**
 * 1. Hide file input completely.
 * 2. Remove selected file text.
 * 3. Set cursor to pointer for all browsers.
 */
[type=file] {
  opacity: 0; /* 1 */
  font-size: 0; /* 2 */
  cursor: pointer; /* 3 */
}

/**
	* Fix appearance for Firefox
	*/
[type=number] {
  -moz-appearance: textfield;
}

/**
 * Set cursor to pointer for all browsers.
 */
[type=range] {
  cursor: pointer;
}

/**
 * Reset slider thumbs to make them styleable.
 */
[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
}

[type=range]::-moz-range-thumb {
  -moz-appearance: none;
  appearance: none;
  border-width: 0;
  border-radius: 0;
  background-color: transparent;
}

/* Interactive */
/* ============================================ */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/*
 * Remove outline for editable content.
 */
[contenteditable]:focus {
  outline: auto;
}

/* Tables */
/* ============================================ */
/**
1. Correct table border color inheritance in all Chrome and Safari.
*/
table {
  border-color: inherit; /* 1 */
  border-collapse: collapse;
}

caption {
  text-align: left;
}

td,
th {
  vertical-align: top;
  padding: 0;
}

th {
  text-align: left;
  font-weight: inherit;
}

/* Misc */
/* ============================================ */
/*
 * Make placeholder style consistent across all browsers.
 */
::placeholder {
  color: #999;
  opacity: 1;
}

/*
 * Hide focus outline but keep it visible for Windows High Contrast Mode.
 */
:focus {
  outline-style: solid;
  outline-color: transparent;
}

/*
 * Hide input arrow when used with datalist.
 */
::-webkit-calendar-picker-indicator {
  display: none !important;
}`,ut,Re,Zi,wn,st,Ge,Gi,Hi,ea,ra,Ji].join(`
`);function sa(e,t=`filtered`,n){let{name:r,path:i}=ue(e,n);if(t===`off`)return{name:r,elementName:r,path:i,reactComponents:null};let a=_i(e,{mode:t});return{name:a.path?`${a.path} ${r}`:r,elementName:r,path:i,reactComponents:a.path}}var ca=!1,la={outputDetail:`standard`,autoClearAfterCopy:!1,annotationColorId:`blue`,blockInteractions:!0,reactEnabled:!0,markerClickBehavior:`edit`,webhookUrl:``,webhooksEnabled:!0},ua=e=>{if(!e||!e.trim())return!1;try{let t=new URL(e.trim());return t.protocol===`http:`||t.protocol===`https:`}catch{return!1}},da=e=>e.metaKey||e.ctrlKey,fa=[{id:`indigo`,label:`Indigo`,srgb:`#6155F5`,p3:`color(display-p3 0.38 0.33 0.96)`},{id:`blue`,label:`Blue`,srgb:`#0088FF`,p3:`color(display-p3 0.00 0.53 1.00)`},{id:`cyan`,label:`Cyan`,srgb:`#00C3D0`,p3:`color(display-p3 0.00 0.76 0.82)`},{id:`green`,label:`Green`,srgb:`#34C759`,p3:`color(display-p3 0.20 0.78 0.35)`},{id:`yellow`,label:`Yellow`,srgb:`#FFCC00`,p3:`color(display-p3 1.00 0.80 0.00)`},{id:`orange`,label:`Orange`,srgb:`#FF8D28`,p3:`color(display-p3 1.00 0.55 0.16)`},{id:`red`,label:`Red`,srgb:`#FF383C`,p3:`color(display-p3 1.00 0.22 0.24)`}],pa=[...fa.map(e=>`
    [data-agentation-accent="${e.id}"] {
      --agentation-color-accent: ${e.srgb};
    }
    @supports (color: color(display-p3 0 0 0)) {
      [data-agentation-accent="${e.id}"] {
        --agentation-color-accent: ${e.p3};
      }
    }
  `),`:host {
    ${fa.map(e=>`--agentation-color-${e.id}: ${e.srgb};`).join(`
`)}
  }`,`@supports (color: color(display-p3 0 0 0)) {
    :host {
      ${fa.map(e=>`--agentation-color-${e.id}: ${e.p3};`).join(`
`)}
    }
  }`].join(``);function ma(e){let t=e;for(let e=C(t.ownerDocument);e;e=C(t.ownerDocument))t=e;let n=t;for(;n&&n!==document.body;){let e=window.getComputedStyle(n).position;if(e===`fixed`||e===`sticky`)return!0;n=n.parentElement}return!1}function ha(e){return e.kind!==`placement`&&e.kind!==`rearrange`&&e.status!==`resolved`&&e.status!==`dismissed`}function ga(e){let t=Ai(e),n=t.found?t:Mi(e);if(n.found&&n.source)return ji(n.source,`path`)}function _a(e={}){let t=je(e.useHashLocation??!1),n=(0,i.useState)(!1),r=Ie(e.portalContainer);return r?(0,a.createPortal)((0,i.createElement)(va,{...e,key:e.useHashLocation?t:void 0,pathname:t,activeState:n,portalHost:r}),r):null}function va({pathname:e,activeState:t,portalHost:n,useHashLocation:r=!1,appName:a,enableKeyboardShortcuts:s=!0,identifyingAttributes:c=ae,copyFormat:l=`markdown`,onOpenSource:u,portalContainer:d,demoAnnotations:f,demoDelay:_=1e3,enableDemoMode:S=!1,onAnnotationAdd:C,onAnnotationDelete:w,onAnnotationUpdate:T,onAnnotationsClear:E,onCopy:ee,onSubmit:O,copyToClipboard:k=!0,endpoint:A,sessionId:re,onSessionCreated:se,webhookUrl:ce,className:le}){let[M,me]=t,[,he]=(0,i.useState)(0),[N]=(0,i.useState)(()=>ie(document,()=>he(e=>e+1)));(0,i.useEffect)(()=>(N.start(),()=>N.stop()),[N]);let ge=typeof l==`object`?l.attribute:void 0,_e=(0,i.useMemo)(()=>ge?[...c,ge]:c,[c,ge]),ye=(0,i.useRef)(!0);(0,i.useLayoutEffect)(()=>(ye.current=!0,()=>{ye.current=!1}),[]);let we=(0,i.useCallback)(t=>r?Ne(JSON.stringify([A,e]),t):t(),[A,e,r]),Te=(0,i.useRef)(new Map),De=(0,i.useRef)(new Set),Oe=e=>ha(e)&&!De.current.has(e.id),je=async(...e)=>{let t=await Xr(...e),n=e[2],i=n.id;if(i&&(Te.current.set(i,t.id),De.current.has(i)&&De.current.add(t.id)),!r){let r=new URL(n.url||window.location.href).pathname,a=Tr(r).find(e=>e.id===i);try{if(De.current.has(i))await Qr(e[0],t.id);else if(a&&a.comment!==n.comment)return await Zr(e[0],t.id,{comment:a.comment}),{...t,comment:a.comment}}catch(e){console.warn(`[Agentation] Failed to apply changes made during sync:`,e)}}return t},Me=t=>r?{...t,annotations:t.annotations.filter(n=>!De.current.has(n.id)&&Pe(n.url||t.url,e,window.location.origin))}:t,Fe=(0,i.useRef)(e);Fe.current=e;let Ie=(t,n,r,i=e)=>{let a=x(t,Tr(i),n,Te.current).filter(Oe);i===Fe.current&&ye.current&&Re(a),Or(i,a,r)},[P,Re]=(0,i.useState)([]),[F,ze]=(0,i.useState)(!0),[Be,Ve]=(0,i.useState)(()=>Kr()),[He,Ue]=(0,i.useState)(!1);(0,i.useLayoutEffect)(()=>{p()},[]);let Ge=(0,i.useRef)(null),I=(0,i.useRef)(null),Ke=(0,i.useRef)(null),qe=(0,i.useRef)(null),et=(0,i.useRef)(!1),tt=(0,i.useRef)(!1),nt=(0,i.useRef)(!1);(0,i.useLayoutEffect)(()=>{M&&et.current?(et.current=!1,Ke.current?.querySelector(`button:not(:disabled)`)?.focus()):!M&&tt.current&&(tt.current=!1,I.current?.focus())},[M]),(0,i.useEffect)(()=>{let e=e=>{let t=Ge.current;t&&e.composedPath().includes(t)&&e.stopPropagation()},t=[`mousedown`,`click`,`pointerdown`];return t.forEach(t=>n.addEventListener(t,e)),()=>{t.forEach(t=>n.removeEventListener(t,e))}},[n]);let[rt,it]=(0,i.useState)(!1),[ot,st]=(0,i.useState)(!1),[ct,ut]=(0,i.useState)(null),[ft,pt]=(0,i.useState)({x:0,y:0}),[z,B]=(0,i.useState)(null),[mt,ht]=(0,i.useState)(!1),gt=b(),_t=b(),[vt,yt]=(0,i.useState)(`idle`),[bt,xt]=(0,i.useState)(!1),St=(0,i.useRef)(new Set),Ct=(0,i.useRef)(new Set),wt=(0,i.useRef)(),Tt=(0,i.useCallback)(()=>{!St.current.size&&!wt.current&&xt(!1)},[]);(0,i.useEffect)(()=>()=>clearTimeout(wt.current),[]);let[Et,Dt]=(0,i.useState)(null),[Ot,kt]=(0,i.useState)(null),[At,jt]=(0,i.useState)([]),[Mt,Nt]=(0,i.useState)(null),Pt=(0,i.useRef)(null);(0,i.useEffect)(()=>()=>{Pt.current&&clearTimeout(Pt.current)},[]);let[V,Ft]=(0,i.useState)(null),It=(0,i.useRef)(null),Lt=(0,i.useRef)(!1),[Rt,zt]=(0,i.useState)(!1);(0,i.useLayoutEffect)(()=>{if(V||!It.current)return;let e=It.current;It.current=null,!z&&(M&&e.isConnected&&!e.disabled?e:I.current)?.focus({preventScroll:!0})},[V,M,z]);let[Bt,Vt]=(0,i.useState)(null),[Ht,Ut]=(0,i.useState)([]),[Wt,Gt]=(0,i.useState)(0),[Kt,qt]=(0,i.useState)(!1),[H,Jt]=(0,i.useState)(!1),[Yt,Xt]=(0,i.useState)(!1),[Zt,Qt]=(0,i.useState)(!1),[$t,en]=(0,i.useState)(`main`),[tn,nn]=(0,i.useState)(!1),[U,rn]=(0,i.useState)(!1),[an,on]=(0,i.useState)(!1),[W,sn]=(0,i.useState)([]),[cn,ln]=(0,i.useState)(null),un=(0,i.useRef)(!1),[G,dn]=(0,i.useState)(!1),[fn,pn]=(0,i.useState)(!1),[mn,hn]=(0,i.useState)(1),[gn,_n]=(0,i.useState)(`new-page`),[vn,yn]=(0,i.useState)(``),[bn,xn]=(0,i.useState)(!1),[K,Sn]=(0,i.useState)(null),Cn=(0,i.useRef)(!1),wn=(0,i.useRef)({rearrange:null,placements:[]}),Tn=(0,i.useRef)({rearrange:null,placements:[]}),[En,Dn]=(0,i.useState)(0),[On,An]=(0,i.useState)(0),[jn,J]=(0,i.useState)([]),[Y,Mn]=(0,i.useState)(null),Nn=(0,i.useRef)({designPlacements:W,rearrangeState:K,blankCanvas:G,wireframePurpose:vn});Nn.current={designPlacements:W,rearrangeState:K,blankCanvas:G,wireframePurpose:vn};let Pn=(0,i.useRef)({placements:jn,rearrange:Y}),In=(0,i.useRef)(new Set),Ln=(0,i.useRef)(new Set),Rn=(0,i.useRef)(null),zn=(0,i.useRef)(),Bn=U&&M&&!an&&G;(0,i.useEffect)(()=>{if(Bn){pn(!1);let e=g(()=>{pn(!0)});return()=>cancelAnimationFrame(e)}pn(!1)},[Bn]);let Vn=(0,i.useRef)(new Map),Hn=(0,i.useRef)([]),Un=(0,i.useRef)(new Map),Wn=(0,i.useRef)(null),[Gn,qn]=(0,i.useState)(!1),[Jn,Yn]=(0,i.useState)([]),Xn=(0,i.useRef)(Jn);Xn.current=Jn;let[Zn,Qn]=(0,i.useState)(null),$n=(0,i.useRef)(null);(0,i.useRef)(!1),(0,i.useRef)([]),(0,i.useRef)(0),(0,i.useRef)(null),(0,i.useRef)(null),(0,i.useRef)(1);let[er,tr]=(0,i.useState)(!1),rr=(0,i.useRef)(null),[ir,ar]=(0,i.useState)([]),or=(0,i.useRef)(!1),sr=()=>{nn(!0)},cr=()=>{nn(!1)},lr=()=>{er||(rr.current=m(()=>tr(!0),850))},ur=()=>{rr.current&&=(clearTimeout(rr.current),null),tr(!1),cr()};(0,i.useEffect)(()=>()=>{rr.current&&clearTimeout(rr.current)},[]);let[X,dr]=(0,i.useState)(()=>{try{let e=JSON.parse(localStorage.getItem(`feedback-toolbar-settings`)??``);return{...la,...e,annotationColorId:fa.find(t=>t.id===e.annotationColorId)?e.annotationColorId:la.annotationColorId}}catch{return la}}),[fr,pr]=(0,i.useState)(!0),[mr,hr]=(0,i.useState)(!1),gr=(0,i.useCallback)(e=>{dr(t=>({...t,...e}))},[]),_r=(0,i.useCallback)(()=>{Ge.current?.classList.add(L.disableTransitions),pr(e=>!e),g(()=>{Ge.current?.classList.remove(L.disableTransitions)})},[]),[vr,yr]=(0,i.useState)(r?null:re??null),Sr=(0,i.useRef)(!1),[Cr,kr]=(0,i.useState)(A?`connecting`:`disconnected`),[Z,Ir]=(0,i.useState)(null),[Br,Vr]=(0,i.useState)(!1),Gr=(0,i.useRef)(null),Q=(0,i.useRef)(!1),$r=(0,i.useRef)(new Set),ei=(0,i.useRef)(new Map),ti=(0,i.useCallback)(e=>{$r.current.add(e),gi.current===e&&(gi.current=null)},[]),[ni,ri]=(0,i.useState)(new Set),[ii,ai]=(0,i.useState)(!1),[oi,si]=(0,i.useState)(!1),[ci,li]=(0,i.useState)(!1),ui=(0,i.useRef)(null),di=(0,i.useRef)(null),fi=(0,i.useRef)(null),pi=(0,i.useRef)(null),mi=(0,i.useRef)(!1),hi=(0,i.useRef)(0),gi=(0,i.useRef)(null),_i=(0,i.useRef)(null),vi=(0,i.useRef)(null),yi=(0,i.useRef)(null),bi=(0,i.useRef)(null),xi=(0,i.useCallback)(()=>en(`main`),[]);(0,i.useEffect)(()=>{Zt||nn(!1)},[Zt]),(0,i.useLayoutEffect)(()=>{Zt&&nt.current&&(nt.current=!1,Ge.current?.querySelector(`[data-agentation-settings-panel] button`)?.focus())},[Zt]);let Si=M&&F&&!U;(0,i.useEffect)(()=>{if(Si)st(!1),it(!0),$r.current.clear();else if(rt){st(!0);let e=m(()=>{it(!1),st(!1)},250);return()=>clearTimeout(e)}},[Si]),(0,i.useEffect)(()=>{Jt(!0),Gt(window.scrollY);let t=Tr(e);Re(t.filter(ha)),ca||(hr(!0),ca=!0,m(()=>hr(!1),750));try{let e=localStorage.getItem(`feedback-toolbar-theme`);e!==null&&pr(e===`dark`)}catch{}try{let e=localStorage.getItem(`feedback-toolbar-position`);if(e){let t=JSON.parse(e);typeof t.x==`number`&&typeof t.y==`number`&&Ir(t)}}catch{}},[e]),(0,i.useEffect)(()=>{H&&localStorage.setItem(`feedback-toolbar-settings`,JSON.stringify(X))},[X,H]),(0,i.useEffect)(()=>{H&&localStorage.setItem(`feedback-toolbar-theme`,fr?`dark`:`light`)},[fr,H]);let Ci=(0,i.useRef)(!1);(0,i.useEffect)(()=>{let e=Ci.current;Ci.current=Br,e&&!Br&&Z&&H&&localStorage.setItem(`feedback-toolbar-position`,JSON.stringify(Z))},[Br,Z,H]),(0,i.useEffect)(()=>{if(!A||!H||Sr.current)return;Sr.current=!0,kr(`connecting`);let t=window.location.href;we(async()=>{try{let n=Hr(e),i=re||n,a=!1;if(i)try{let t=Tr(e),n=Me(await Yr(A,i));Hn.current=n.annotations.filter(e=>e.kind===`placement`||e.kind===`rearrange`),ye.current&&(yr(n.id),kr(`connected`)),Ur(e,n.id),a=!0;let r=Tr(e).filter(ha),o=new Set(n.annotations.map(e=>e.id)),s=r.filter(e=>!o.has(e.id));if(s.length>0){let r=`${typeof window<`u`?window.location.origin:``}${e}`,i=(await Promise.allSettled(s.map(e=>je(A,n.id,{...e,sessionId:n.id,url:r})))).map((e,t)=>e.status===`fulfilled`?e.value:(console.warn(`[Agentation] Failed to sync annotation:`,e.reason),s[t])),a=[...n.annotations,...i];Ie(t,a,n.id)}else Ie(t,n.annotations,n.id)}catch(t){console.warn(`[Agentation] Could not join session, creating new:`,t),Wr(e)}if(!a){let n=await Jr(A,t);Ur(e,n.id),ye.current&&(yr(n.id),kr(`connected`),se?.(n.id));let i=r?new Map([[e,Tr(e)]]):Dr(),a=typeof window<`u`?window.location.origin:``,o=[];for(let[t,r]of i){let i=r.filter(e=>ha(e)&&!e._syncedTo);if(i.length===0)continue;let s=`${a}${t}`,c=t===e;o.push((async()=>{try{let e=c?n:await Jr(A,s),r=(await Promise.allSettled(i.map(t=>je(A,e.id,{...t,sessionId:e.id,url:s})))).map((e,t)=>e.status===`fulfilled`?e.value:(console.warn(`[Agentation] Failed to sync annotation:`,e.reason),i[t]));Ie(i,r,e.id,t)}catch(e){console.warn(`[Agentation] Failed to sync annotations for ${t}:`,e)}})())}await Promise.allSettled(o)}}catch(e){ye.current&&kr(`disconnected`),console.warn(`[Agentation] Failed to initialize session, using local storage:`,e)}})},[A,re,H,se,e,we]),(0,i.useEffect)(()=>{if(!A||!H)return;let e=async()=>{try{(await fetch(`${A}/health`)).ok?kr(`connected`):kr(`disconnected`)}catch{kr(`disconnected`)}};e();let t=h(e,1e4);return()=>clearInterval(t)},[A,H]);let wi=(0,i.useRef)(P),Ti=(0,i.useRef)(!1);(0,i.useLayoutEffect)(()=>{wi.current=P,Ti.current=P.length>0||W.length>0||(K?.sections.length??0)>0},[P,W.length,K?.sections.length]);let Ei=(0,i.useCallback)(e=>{let t=St.current.has(e);if(t&&(Ct.current.delete(e),Ct.current.size))return;let n=t?new Set(St.current):new Set([e]);t&&(St.current.clear(),Tt());for(let e of n)ei.current.delete(e),$r.current.delete(e);Re(e=>e.filter(e=>!n.has(e.id))),ri(e=>new Set([...e].filter(e=>!n.has(e))));let r=t?[]:wi.current.filter(e=>e.kind!==`placement`&&e.kind!==`rearrange`),i=r.findIndex(t=>t.id===e);i>=0&&i<r.length-1&&(Nt(e=>e===null?i:Math.min(e,i)),Pt.current&&clearTimeout(Pt.current),Pt.current=m(()=>Nt(null),200))},[Tt]);(0,i.useEffect)(()=>!A||!H||!vr?void 0:Vi(A,vr,()=>Ti.current,e=>{let{id:t,kind:n}=e;if(n===`placement`){for(let[e,n]of Vn.current)if(n===t){Wn.current?.placements.forget(e),sn(t=>t.filter(t=>t.id!==e));break}}else if(n===`rearrange`){for(let[e,n]of Un.current)if(n===t){Wn.current?.rearrange.forget(e),Sn(t=>{if(!t)return null;let n=t.sections.filter(t=>t.id!==e);return n.length===0?null:{...t,sections:n}});break}}else{if(!wi.current.some(e=>e.id===t))return;ri(e=>new Set(e).add(t))}}),[A,H,vr]),(0,i.useEffect)(()=>{if(!A||!H)return;let t=_i.current===`disconnected`,n=Cr===`connected`;_i.current=Cr,t&&n&&we(async()=>{try{let t=Tr(e).filter(ha);if(t.length===0)return;let n=`${typeof window<`u`?window.location.origin:``}${e}`,r=vr,i=[];if(r)try{i=Me(await Yr(A,r)).annotations}catch{r=null}r||(r=(await Jr(A,n)).id,ye.current&&yr(r),Ur(e,r));let a=new Set(i.map(e=>e.id)),o=t.filter(e=>!a.has(e.id));if(o.length>0){let e=(await Promise.allSettled(o.map(e=>je(A,r,{...e,sessionId:r,url:n})))).map((e,t)=>e.status===`fulfilled`?e.value:(console.warn(`[Agentation] Failed to sync annotation on reconnect:`,e.reason),o[t])),a=[...i,...e];Ie(t,a,r)}}catch(e){console.warn(`[Agentation] Failed to sync on reconnect:`,e)}})},[Cr,A,H,vr,e,we]);let Di=(0,i.useCallback)(()=>{He||(Ue(!0),Qt(!1),me(!1),m(()=>{qr(!0),Ve(!0),Ue(!1)},400))},[He]);(0,i.useEffect)(()=>{if(!S||!H||!f||f.length===0||P.length>0)return;let e=[];return e.push(m(()=>{me(!0)},_-200)),f.forEach((t,n)=>{let r=_+n*300;e.push(m(()=>{let e=document.querySelector(t.selector);if(!e)return;let r=D(e),{name:i,path:a}=ue(e),o={id:`demo-${Date.now()}-${n}`,x:(r.left+r.width/2)/window.innerWidth*100,y:r.top+r.height/2+window.scrollY,comment:t.comment,element:i,elementPath:a,timestamp:Date.now(),selectedText:t.selectedText,boundingBox:{x:r.left,y:r.top+window.scrollY,width:r.width,height:r.height},nearbyText:de(e),cssClasses:pe(e)};Re(e=>[...e,o])},r))}),()=>{e.forEach(clearTimeout)}},[S,H,f,_]),(0,i.useEffect)(()=>{let e=()=>{Gt(window.scrollY),he(e=>e+1),qt(!0),bi.current&&clearTimeout(bi.current),bi.current=m(()=>{qt(!1)},150)};return N.addEventListener(`scroll`,e,{passive:!0,capture:!0}),()=>{N.removeEventListener(`scroll`,e,!0),bi.current&&clearTimeout(bi.current)}},[N]),(0,i.useEffect)(()=>{if(!H)return;let t=P.filter(e=>!ni.has(e.id));t.length>0?vr?Or(e,t,vr):Er(e,t):localStorage.removeItem(wr(e))},[P,e,H,vr,bt,ni]),(0,i.useEffect)(()=>{if(H&&!un.current){un.current=!0;let t=Ar(e);t.length>0&&sn(t)}},[H,e]),(0,i.useEffect)(()=>{if(H&&un.current&&!G){let t=W.filter(e=>!jn.includes(e));t.length>0?jr(e,t):Mr(e)}},[W,e,H,G,jn]),(0,i.useEffect)(()=>{if(H&&!Cn.current){Cn.current=!0;let t=Nr(e);if(t){let e={...t,sections:t.sections.map(e=>({...e,currentRect:e.currentRect??{...e.originalRect}}))};Sn(e)}}},[H,e]),(0,i.useEffect)(()=>{H&&Cn.current&&!G&&(K&&K!==Y?Pr(e,K):Fr(e))},[K,e,H,G,Y]);let Oi=(0,i.useRef)(!1);(0,i.useEffect)(()=>{if(H&&!Oi.current){Oi.current=!0;let t=Lr(e);t&&(Tn.current={rearrange:t.rearrange,placements:t.placements||[]},t.purpose&&yn(t.purpose))}},[H,e]),(0,i.useEffect)(()=>{if(!H||!Oi.current||bt)return;let t=Tn.current;G?(K?.sections?.length??0)>0||W.length>0||vn?Rr(e,{rearrange:K,placements:W,purpose:vn}):zr(e):(t.rearrange?.sections?.length??0)>0||t.placements.length>0||vn?Rr(e,{rearrange:t.rearrange,placements:t.placements,purpose:vn}):zr(e)},[K,W,vn,G,e,H,bt]),(0,i.useEffect)(()=>{U&&!K&&Sn({sections:[],originalOrder:[],detectedAt:Date.now()})},[U,K]),(0,i.useEffect)(()=>{if(!A||!vr)return;let e={create:e=>we(()=>Xr(A,vr,e)),update:(e,t)=>we(()=>Zr(A,e,t)),remove:e=>we(()=>Qr(A,e))};Vn.current=new Map,Un.current=new Map;let t={placements:Bi(e,Vn.current,Hn.current.filter(e=>e.kind===`placement`)),rearrange:Bi(e,Un.current,Hn.current.filter(e=>e.kind===`rearrange`))};return Wn.current=t,()=>{t.placements.dispose(),t.rearrange.dispose(),Wn.current===t&&(Wn.current=null)}},[A,vr,e,we]),(0,i.useEffect)(()=>{let e=window.location.pathname+window.location.search+window.location.hash;Wn.current?.placements.replace(W.filter(e=>!jn.includes(e)).map(t=>({id:t.id,x:t.x/window.innerWidth*100,y:t.y,comment:`Place ${t.type} at (${Math.round(t.x)}, ${Math.round(t.y)}), ${t.width}\xD7${t.height}px${t.text?` \u2014 "${t.text}"`:``}`,element:`[design:${t.type}]`,elementPath:`[placement]`,timestamp:t.timestamp,url:e,intent:`change`,severity:`important`,kind:`placement`,placement:{componentType:t.type,width:t.width,height:t.height,scrollY:t.scrollY,text:t.text}})))},[W,A,vr,e,jn]),(0,i.useEffect)(()=>{let e=Wn.current;if(!e)return;if(K===Y){e.rearrange.replace([]);return}let t=m(()=>{let t=window.location.pathname+window.location.search+window.location.hash,n=[];for(let e of K?.sections??[]){let r=e.originalRect,i=e.currentRect,a=Math.abs(r.x-i.x)>1||Math.abs(r.y-i.y)>1||Math.abs(r.width-i.width)>1||Math.abs(r.height-i.height)>1;if(!a&&!e.note)continue;let o=e.note?` \u2014 "${e.note}"`:``;n.push({id:e.id,x:i.x/window.innerWidth*100,y:i.y,comment:a?`Move ${e.label} section (${e.tagName}) \u2014 from (${Math.round(r.x)},${Math.round(r.y)}) ${Math.round(r.width)}\xD7${Math.round(r.height)} to (${Math.round(i.x)},${Math.round(i.y)}) ${Math.round(i.width)}\xD7${Math.round(i.height)}${o}`:`Note on ${e.label} section (${e.tagName})${o}`,element:e.selector,elementPath:`[rearrange]`,timestamp:K.detectedAt,url:t,intent:`change`,severity:`important`,kind:`rearrange`,rearrange:{selector:e.selector,label:e.label,tagName:e.tagName,originalRect:r,currentRect:i}})}e.rearrange.replace(n)},300);return()=>clearTimeout(t)},[K,A,vr,e,Y]);let ki=(0,i.useCallback)(()=>{clearTimeout(zn.current),on(!1),rn(!0)},[]);(0,i.useEffect)(()=>()=>clearTimeout(zn.current),[]);let Ai=(0,i.useCallback)(()=>{on(!0),rn(!1),ln(null),clearTimeout(zn.current),zn.current=m(()=>{on(!1)},300)},[]),ji=(0,i.useCallback)(()=>{let e=I.current?.getRootNode();tt.current=!!e?.activeElement&&!!Ge.current?.contains(e.activeElement),tt.current&&e?.activeElement?.blur(),Qt(!1),U&&(on(!0),rn(!1),ln(null),clearTimeout(zn.current),zn.current=m(()=>{on(!1)},300)),me(!1)},[U]),Mi=(0,i.useCallback)(()=>{Yt||(v(),Xt(!0))},[Yt]),Ni=(0,i.useCallback)(()=>{Yt&&(y(),Xt(!1))},[Yt]),Ri=(0,i.useCallback)(()=>{Yt?Ni():Mi()},[Yt,Mi,Ni]),zi=(0,i.useCallback)((e=ir)=>{let t=e.filter(e=>e.element.isConnected);if(t.length===0){ar([]);return}let n=t[0],r=n.element,i=t.length>1,a=t.map(e=>D(e.element));if(i){let e={left:Math.min(...a.map(e=>e.left)),top:Math.min(...a.map(e=>e.top)),right:Math.max(...a.map(e=>e.right)),bottom:Math.max(...a.map(e=>e.bottom))},n=t.slice(0,5).map(e=>e.name).join(`, `),i=t.length>5?` +${t.length-5} more`:``,o=a.map(e=>({x:e.left,y:e.top+window.scrollY,width:e.width,height:e.height})),s=t[t.length-1].element,c=a[a.length-1],l=c.left+c.width/2,u=c.top+c.height/2,d=ma(s);B({id:Date.now().toString(),x:l/window.innerWidth*100,y:d?u:u+window.scrollY,clientY:u,element:`${t.length} elements: ${n}${i}`,elementPath:`multi-select`,boundingBox:{x:e.left,y:e.top+window.scrollY,width:e.right-e.left,height:e.bottom-e.top},isMultiSelect:!0,isFixed:d,elementBoundingBoxes:o,multiSelectElements:t.map(e=>e.element),targetElement:s,fullPath:Ce(r),accessibility:Se(r),computedStyles:be(r),computedStylesObj:ve(r),nearbyElements:fe(r),cssClasses:pe(r),nearbyText:de(r),sourceFile:ga(r),attributes:oe(r,_e)})}else{let e=a[0],t=ma(r);B({id:Date.now().toString(),x:e.left/window.innerWidth*100,y:t?e.top:e.top+window.scrollY,clientY:e.top,element:n.name,elementPath:n.path,boundingBox:{x:e.left,y:t?e.top:e.top+window.scrollY,width:e.width,height:e.height},isFixed:t,fullPath:Ce(r),accessibility:Se(r),computedStyles:be(r),computedStylesObj:ve(r),nearbyElements:fe(r),cssClasses:pe(r),nearbyText:de(r),reactComponents:n.reactComponents,targetElement:r,sourceFile:ga(r),attributes:oe(r,_e)})}ar([]),ut(null)},[ir,_e]);(0,i.useEffect)(()=>{M||(B(null),Ft(null),Vt(null),Ut([]),ut(null),Qt(!1),ar([]),or.current=!1,Yt&&Ni())},[M,Yt,Ni]),(0,i.useEffect)(()=>()=>{y()},[]),(0,i.useEffect)(()=>{if(!M)return;let e=`p.span.h1.h2.h3.h4.h5.h6.li.td.th.label.blockquote.figcaption.caption.legend.dt.dd.pre.code.em.strong.b.i.u.s.a.time.address.cite.q.abbr.dfn.mark.small.sub.sup.[contenteditable]`.split(`.`).join(`, `),t=document.createElement(`style`);return t.id=`agentation-cursor`,t.textContent=`
      body { cursor: crosshair !important; }
      body :is(${e}) { cursor: text !important; }
    `,document.head.appendChild(t),()=>{let e=document.getElementById(`agentation-cursor`);e&&e.remove()}},[M]),(0,i.useEffect)(()=>{if(Zn!==null&&M)return document.documentElement.setAttribute(`data-drawing-hover`,``),()=>document.documentElement.removeAttribute(`data-drawing-hover`)},[Zn,M]),(0,i.useEffect)(()=>{if(!M||z||V||Gn||U)return;let e=null,t=(e,t,n)=>{let r=Ee(e,t),i=n?Ae(e,t):r;if(!i||j(i,`[data-feedback-toolbar], [data-annotation-popup], [data-annotation-marker]`)){ut(null);return}let{name:a,elementName:o,path:s,reactComponents:c}=sa(i,`off`,_e);ut({element:a,elementName:o,elementPath:s,rect:D(i),reactComponents:c,isPiercing:n&&i!==r}),pt({x:e,y:t})},n=n=>{if(j(n.composedPath()[0]||n.target,`[data-feedback-toolbar], [data-annotation-popup], [data-annotation-marker]`)){e=null,ut(null);return}e={x:n.clientX,y:n.clientY},t(n.clientX,n.clientY,da(n))},r=n=>{(n.key===`Meta`||n.key===`Control`)&&e&&t(e.x,e.y,da(n))},i=()=>{e=null,ut(null)};return N.addEventListener(`mousemove`,n),N.addEventListener(`keydown`,r),N.addEventListener(`keyup`,r),N.addEventListener(`mouseleave`,i),window.addEventListener(`blur`,i),()=>{N.removeEventListener(`mousemove`,n),N.removeEventListener(`keydown`,r),N.removeEventListener(`keyup`,r),N.removeEventListener(`mouseleave`,i),window.removeEventListener(`blur`,i)}},[M,z,V,Gn,U,`off`,_e]);let Hi=(0,i.useCallback)((e,t)=>{if(V&&!oi){yi.current?.shake();return}if(z&&!ii){if((Ge.current?.querySelector(`[data-annotation-popup]:not([data-annotation-card]) textarea`))?.value.trim()){vi.current?.shake();return}ai(!0)}if(It.current=t??null,Lt.current=t?.matches(`:focus-visible`)??!1,zt(!1),si(!1),Ft(e),Dt(null),kt(null),jt([]),e.elementBoundingBoxes?.length){let t=[];for(let n of e.elementBoundingBoxes){let e=ke(n.x+n.width/2,n.y+n.height/2-window.scrollY,n);e&&t.push(e)}Ut(t),Vt(null)}else if(e.boundingBox){let t=e.boundingBox,n=ke(t.x+t.width/2,e.isFixed?t.y+t.height/2:t.y+t.height/2-window.scrollY,t);if(n){let e=D(n),r=e.width/t.width,i=e.height/t.height;Vt(r<.5||i<.5?null:n)}else Vt(null);Ut([])}else Vt(null),Ut([])},[z,ii,V,oi]);(0,i.useEffect)(()=>{if(!M||Gn||U)return;let e=e=>{if(mi.current){mi.current=!1,e.preventDefault(),e.stopPropagation();return}let t=e.composedPath()[0]||e.target;if(j(t,`[data-feedback-toolbar]`)||j(t,`[data-annotation-popup]`)||j(t,`[data-annotation-marker]`))return;if(da(e)&&!z&&!V){e.preventDefault(),e.stopPropagation(),or.current=e.shiftKey;let t=Ae(e.clientX,e.clientY);if(!t)return;let n=D(t),{name:r,path:i,reactComponents:a}=sa(t,`off`,_e),o=ir.findIndex(e=>e.element===t);ar(o>=0?e=>e.filter((e,t)=>t!==o):e=>[...e,{element:t,rect:n,name:r,path:i,reactComponents:a??void 0}]);return}let n=j(t,`button, a, input, select, textarea, [role='button'], [onclick]`);if(X.blockInteractions&&(e.preventDefault(),e.stopPropagation()),z&&!ii){if(n&&!X.blockInteractions)return;e.preventDefault(),vi.current?.shake();return}if(V&&!oi){if(n&&!X.blockInteractions)return;e.preventDefault(),yi.current?.shake();return}e.preventDefault();let r=Ee(e.clientX,e.clientY);if(!r)return;let{name:i,path:a,reactComponents:o}=sa(r,`off`,_e),s=D(r),c=e.clientX/window.innerWidth*100,l=ma(r),u=l?e.clientY:e.clientY+window.scrollY,d=r.ownerDocument.defaultView?.getSelection(),f;d&&d.toString().trim().length>0&&(f=d.toString().trim().slice(0,500));let p=ve(r),m=be(r);ai(!1),B({id:Date.now().toString(),x:c,y:u,clientY:e.clientY,element:i,elementPath:a,selectedText:f,boundingBox:{x:s.left,y:l?s.top:s.top+window.scrollY,width:s.width,height:s.height},nearbyText:de(r),cssClasses:pe(r),isFixed:l,fullPath:Ce(r),accessibility:Se(r),computedStyles:m,computedStylesObj:p,nearbyElements:fe(r),reactComponents:o??void 0,sourceFile:ga(r),attributes:oe(r,_e),frame:te(r,e.clientX,e.clientY),targetElement:r}),ut(null)};return N.addEventListener(`click`,e,!0),()=>N.removeEventListener(`click`,e,!0)},[M,Gn,U,z,ii,V,oi,X.blockInteractions,`off`,_e,ir]),(0,i.useEffect)(()=>{if(!M)return;let e=e=>{let t=(e.key===`Meta`||e.key===`Control`)&&!da(e),n=e.key===`Shift`&&or.current;(t||n)&&!di.current&&ir.length>0&&zi()},t=()=>{or.current=!1,ar([]),ut(null),ui.current=null,di.current=null,li(!1),pi.current?.replaceChildren()};return N.addEventListener(`keyup`,e),window.addEventListener(`blur`,t),()=>{N.removeEventListener(`keyup`,e),window.removeEventListener(`blur`,t)}},[M,ir,zi]),(0,i.useEffect)(()=>{if(!M||z||Gn||U)return;let e=e=>{if(e.button!==0)return;mi.current=!1;let t=e.composedPath()[0]||e.target;if(j(t,`[data-feedback-toolbar]`)||j(t,`[data-annotation-marker]`)||j(t,`[data-annotation-popup]`))return;let n=new Set(`P.SPAN.H1.H2.H3.H4.H5.H6.LI.TD.TH.LABEL.BLOCKQUOTE.FIGCAPTION.CAPTION.LEGEND.DT.DD.PRE.CODE.EM.STRONG.B.I.U.S.A.TIME.ADDRESS.CITE.Q.ABBR.DFN.MARK.SMALL.SUB.SUP`.split(`.`));!da(e)&&(n.has(t.tagName)||t.isContentEditable)||(e.preventDefault(),ui.current={x:e.clientX,y:e.clientY})};return N.addEventListener(`mousedown`,e),()=>N.removeEventListener(`mousedown`,e)},[M,z,Gn,U]),(0,i.useEffect)(()=>{if(!M||z)return;let e=e=>{if(!ui.current)return;let t=e.clientX-ui.current.x,n=e.clientY-ui.current.y,r=t*t+n*n;if(!ci&&r>=64&&(di.current=ui.current,li(!0),e.preventDefault()),(ci||r>=64)&&di.current){if(fi.current){let t=Math.min(di.current.x,e.clientX),n=Math.min(di.current.y,e.clientY),r=Math.abs(e.clientX-di.current.x),i=Math.abs(e.clientY-di.current.y);fi.current.style.transform=`translate(${t}px, ${n}px)`,fi.current.style.width=`${r}px`,fi.current.style.height=`${i}px`}let t=Date.now();if(t-hi.current<50)return;hi.current=t;let n=di.current.x,r=di.current.y,i=Math.min(n,e.clientX),a=Math.min(r,e.clientY),o=Math.max(n,e.clientX),s=Math.max(r,e.clientY),c=(i+o)/2,l=(a+s)/2,u=new Set,d=[[i,a],[o,a],[i,s],[o,s],[c,l],[c,a],[c,s],[i,l],[o,l]];for(let[e,t]of d){let n=document.elementsFromPoint(e,t);for(let e of n)e instanceof HTMLElement&&u.add(e)}let f=N.querySelectorAll(`button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th, div, span, section, article, aside, nav`);for(let e of f)if(e instanceof HTMLElement){let t=D(e),n=t.left+t.width/2,r=t.top+t.height/2,c=n>=i&&n<=o&&r>=a&&r<=s,l=Math.min(t.right,o)-Math.max(t.left,i),d=Math.min(t.bottom,s)-Math.max(t.top,a),f=l>0&&d>0?l*d:0,p=t.width*t.height,m=p>0?f/p:0;(c||m>.5)&&u.add(e)}let p=[],m=new Set([`BUTTON`,`A`,`INPUT`,`IMG`,`P`,`H1`,`H2`,`H3`,`H4`,`H5`,`H6`,`LI`,`LABEL`,`TD`,`TH`,`SECTION`,`ARTICLE`,`ASIDE`,`NAV`]);for(let e of u){if(j(e,`[data-feedback-toolbar]`)||j(e,`[data-annotation-marker]`))continue;let t=D(e);if(!(t.width>window.innerWidth*.8&&t.height>window.innerHeight*.5)&&!(t.width<10||t.height<10)&&t.left<o&&t.right>i&&t.top<s&&t.bottom>a){let n=e.tagName,r=m.has(n);if(!r&&(n===`DIV`||n===`SPAN`)){let t=e.textContent&&e.textContent.trim().length>0,n=e.onclick!==null||e.getAttribute(`role`)===`button`||e.getAttribute(`role`)===`link`||e.classList.contains(`clickable`)||e.hasAttribute(`data-clickable`);(t||n)&&!e.querySelector(`p, h1, h2, h3, h4, h5, h6, button, a`)&&(r=!0)}if(r){let e=!1;for(let n of p)if(n.left<=t.left&&n.right>=t.right&&n.top<=t.top&&n.bottom>=t.bottom){e=!0;break}e||p.push(t)}}}if(pi.current){let e=pi.current;for(;e.children.length>p.length;)e.removeChild(e.lastChild);p.forEach((t,n)=>{let r=e.children[n];r||(r=document.createElement(`div`),r.className=L.selectedElementHighlight,e.appendChild(r)),r.style.transform=`translate(${t.left}px, ${t.top}px)`,r.style.width=`${t.width}px`,r.style.height=`${t.height}px`})}}};return N.addEventListener(`mousemove`,e,{passive:!0}),()=>N.removeEventListener(`mousemove`,e)},[M,z,ci,8]),(0,i.useEffect)(()=>{if(!M)return;let e=e=>{let t=ci,n=di.current;if(ci&&n){mi.current=!0;let t=Math.min(n.x,e.clientX),r=Math.min(n.y,e.clientY),i=Math.max(n.x,e.clientX),a=Math.max(n.y,e.clientY),o=[];N.querySelectorAll(`button, a, input, img, p, h1, h2, h3, h4, h5, h6, li, label, td, th`).forEach(e=>{if(!(e instanceof HTMLElement)||j(e,`[data-feedback-toolbar]`)||j(e,`[data-annotation-marker]`))return;let n=D(e);n.width>window.innerWidth*.8&&n.height>window.innerHeight*.5||n.width<10||n.height<10||n.left<i&&n.right>t&&n.top<a&&n.bottom>r&&o.push({element:e,rect:n})});let s=o.filter(({element:e})=>!o.some(({element:t})=>t!==e&&e.contains(t))),c=e.clientX/window.innerWidth*100,l=e.clientY+window.scrollY,u=(da(e)||ir.length>0)&&!z&&!V;if(s.length>0){if(u){let t=[...ir];for(let{element:e,rect:n}of s){if(t.some(t=>t.element===e))continue;let{name:r,path:i,reactComponents:a}=sa(e,`off`,_e);t.push({element:e,rect:n,name:r,path:i,reactComponents:a??void 0})}or.current=e.shiftKey,da(e)?ar(t):zi(t)}else{let t=s.reduce((e,{rect:t})=>({left:Math.min(e.left,t.left),top:Math.min(e.top,t.top),right:Math.max(e.right,t.right),bottom:Math.max(e.bottom,t.bottom)}),{left:1/0,top:1/0,right:-1/0,bottom:-1/0}),n=s.slice(0,5).map(({element:e})=>ue(e).name).join(`, `),r=s.length>5?` +${s.length-5} more`:``,i=s[0].element,a=ve(i),o=be(i);B({id:Date.now().toString(),x:c,y:l,clientY:e.clientY,element:`${s.length} elements: ${n}${r}`,elementPath:`multi-select`,boundingBox:{x:t.left,y:t.top+window.scrollY,width:t.right-t.left,height:t.bottom-t.top},isMultiSelect:!0,fullPath:Ce(i),accessibility:Se(i),computedStyles:o,computedStylesObj:a,nearbyElements:fe(i),cssClasses:pe(i),nearbyText:de(i),sourceFile:ga(i),attributes:oe(i,_e)})}}else if(u&&!da(e))zi();else if(!u){let n=Math.abs(i-t),o=Math.abs(a-r);n>20&&o>20&&B({id:Date.now().toString(),x:c,y:l,clientY:e.clientY,element:`Area selection`,elementPath:`region at (${Math.round(t)}, ${Math.round(r)})`,boundingBox:{x:t,y:r+window.scrollY,width:n,height:o},isMultiSelect:!0})}ut(null)}else t&&(mi.current=!0);ui.current=null,di.current=null,li(!1),pi.current&&(pi.current.innerHTML=``)};return N.addEventListener(`mouseup`,e),()=>N.removeEventListener(`mouseup`,e)},[M,ci,z,V,`off`,_e,ir,zi]);let Ui=(0,i.useCallback)(async(e,t,n)=>{let r=X.webhookUrl||ce;if(!r||!X.webhooksEnabled&&!n)return!1;try{return(await fetch(r,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({event:e,timestamp:Date.now(),url:typeof window<`u`?window.location.href:void 0,...t})})).ok}catch(e){return console.warn(`[Agentation] Webhook failed:`,e),!1}},[ce,X.webhookUrl,X.webhooksEnabled]),Gi=(0,i.useCallback)(t=>{if(!z||z.isSubmitted)return;let n={id:z.id,x:z.x,y:z.y,comment:t,element:z.element,elementPath:z.elementPath,timestamp:Date.now(),selectedText:z.selectedText,boundingBox:z.boundingBox,nearbyText:z.nearbyText,cssClasses:z.cssClasses,isMultiSelect:z.isMultiSelect,isFixed:z.isFixed,fullPath:z.fullPath,accessibility:z.accessibility,computedStyles:z.computedStyles,nearbyElements:z.nearbyElements,reactComponents:z.reactComponents,sourceFile:z.sourceFile,attributes:z.attributes,frame:z.frame,elementBoundingBoxes:z.elementBoundingBoxes,...A&&vr?{sessionId:vr,url:typeof window<`u`?window.location.href:void 0,status:`pending`}:{}};Re(e=>[...e,n]),B({...z,isSubmitted:!0}),gi.current=n.id,C?.(n),Ui(`annotation.add`,{annotation:n}),ai(!0),window.getSelection()?.removeAllRanges(),A&&vr&&we(async()=>{let t=await je(A,vr,n);r&&Or(e,Tr(e).map(e=>e.id===n.id?{...e,id:t.id}:e),vr),!(!ye.current||De.current.has(n.id))&&t.id!==n.id&&(ei.current.set(t.id,n.id),gi.current===n.id&&(gi.current=t.id),Re(e=>e.map(e=>e.id===n.id?{...e,id:t.id}:e)),$r.current.delete(n.id)&&$r.current.add(t.id))}).catch(e=>{console.warn(`[Agentation] Failed to sync annotation:`,e)})},[z,C,Ui,A,vr,we,e,r]),Ki=(0,i.useCallback)(()=>{ai(!0)},[]),Ji=(0,i.useCallback)(()=>{B(null),ai(!1)},[]),Yi=(0,i.useCallback)(e=>{if(De.current.has(e))return;De.current.add(e);let t=P.find(t=>t.id===e);V?.id===e&&(zt(!1),si(!0)),ri(t=>new Set(t).add(e)),t&&(w?.(t),Ui(`annotation.delete`,{annotation:t})),A&&we(()=>Qr(A,Te.current.get(e)??e)).catch(e=>{console.warn(`[Agentation] Failed to delete annotation from server:`,e)})},[P,V,w,Ui,A,we]),Xi=(0,i.useCallback)(e=>{if(!e){Dt(null),kt(null),jt([]);return}if(Dt(e.id),e.elementBoundingBoxes?.length){let t=[];for(let n of e.elementBoundingBoxes){let e=ke(n.x+n.width/2,n.y+n.height/2-window.scrollY,n);e&&t.push(e)}jt(t),kt(null)}else if(e.boundingBox){let t=e.boundingBox,n=ke(t.x+t.width/2,e.isFixed?t.y+t.height/2:t.y+t.height/2-window.scrollY,t);if(n){let e=D(n),r=e.width/t.width,i=e.height/t.height;kt(r<.5||i<.5?null:n)}else kt(null);jt([])}else kt(null),jt([])},[]),Zi=(0,i.useCallback)(e=>{if(!V)return;let t={...V,comment:e};Ft(t),Re(e=>e.map(e=>e.id===V.id?t:e)),T?.(t),Ui(`annotation.update`,{annotation:t}),A&&we(()=>Zr(A,Te.current.get(V.id)??V.id,{comment:e})).catch(e=>{console.warn(`[Agentation] Failed to update annotation on server:`,e)}),zt(Lt.current||!!It.current?.matches(`:hover`)),si(!0)},[V,T,Ui,A,we]),Qi=(0,i.useCallback)(()=>{zt(Lt.current||!!It.current?.matches(`:hover`)),si(!0)},[]),$i=(0,i.useCallback)(()=>{Rt&&V&&!z&&Dt(V.id),Ft(null),Vt(null),Ut([]),si(!1)},[Rt,V,z]),ea=(0,i.useCallback)((e,t)=>{if(!e.length&&!t)return;xt(!0);let n={placements:[...Pn.current.placements,...e],rearrange:t??Pn.current.rearrange};Pn.current=n,J(n.placements),Mn(n.rearrange),clearTimeout(wt.current),wt.current=m(()=>{sn(e=>e.filter(e=>!n.placements.includes(e))),Sn(e=>e===n.rearrange?null:e),Pn.current={placements:[],rearrange:null},J([]),Mn(null),wt.current=void 0,Tt()},200)},[Tt]),ta=(0,i.useCallback)(()=>{if(!ye.current)return;let t=new Map(wi.current.map(e=>[e.id,e])),n=[];for(let e of P){let r=t.get(Te.current.get(e.id)??e.id)??t.get(e.id);r&&r.comment===e.comment&&!De.current.has(r.id)&&!n.includes(r)&&n.push(r)}let r=n.length,i=Nn.current,a=W.filter(e=>i.designPlacements.includes(e)&&!Pn.current.placements.includes(e)),o=K===i.rearrangeState&&K!==Pn.current.rearrange?K:null,s=Jn.filter(e=>Xn.current.includes(e));if(!(r===0&&s.length===0&&a.length===0&&!o)){for(let e of n)De.current.add(e.id),St.current.add(e.id),Ct.current.add(e.id);if(ri(e=>new Set([...e,...n.map(e=>e.id)])),E?.(n),Ui(`annotations.clear`,{annotations:n}),A&&Promise.all(n.map(e=>we(()=>Qr(A,Te.current.get(e.id)??e.id)).catch(e=>{console.warn(`[Agentation] Failed to delete annotation from server:`,e)}))),xt(!0),Yn(e=>e.filter(e=>!s.includes(e))),s.length>0&&s.length===Xn.current.length){let e=$n.current;e?.getContext(`2d`)?.clearRect(0,0,e.width,e.height)}ea(a,o),G===i.blankCanvas&&vn===i.wireframePurpose&&W===i.designPlacements&&K===i.rearrangeState&&(G&&dn(!1),vn&&yn(``),Tn.current={rearrange:null,placements:[]},zr(e)),Tt()}},[e,P,Jn,W,K,G,vn,E,Ui,A,we,Tt,ea]),na=(0,i.useCallback)(async()=>{let t=gt.start(),n=typeof window<`u`?window.location.pathname+window.location.search+window.location.hash:e,r=U&&G,i;if(r){if(W.length===0&&!K&&!vn)return;i=a?Pi(n,a):``}else{if(i=Fi(P,n,X.outputDetail,{appName:a}),!i&&Jn.length===0&&W.length===0&&!K)return;i||=Pi(n,a)}if(!r&&Jn.length>0){let e=new Set;for(let t of P)t.drawingIndex!=null&&e.add(t.drawingIndex);let t=$n.current;t&&(t.style.visibility=`hidden`);let n=[],r=window.scrollY;for(let t=0;t<Jn.length;t++){if(e.has(t))continue;let i=Jn[t];if(i.points.length<2)continue;let a=i.fixed?i.points:i.points.map(e=>({x:e.x,y:e.y-r})),o=1/0,s=1/0,c=-1/0,l=-1/0;for(let e of a)o=Math.min(o,e.x),s=Math.min(s,e.y),c=Math.max(c,e.x),l=Math.max(l,e.y);let u=c-o,d=l-s,f=Math.hypot(u,d),p=a[0],m=a[a.length-1],h=Math.hypot(m.x-p.x,m.y-p.y),g,_=h<f*.35,v=u/Math.max(d,1);if(_&&f>20){let e=Math.max(u,d)*.15,t=0;for(let n of a){let r=n.x-o<e,i=c-n.x<e,a=n.y-s<e,u=l-n.y<e;(r||i)&&(a||u)&&t++}g=t>a.length*.15?`box`:`circle`}else g=v>3&&d<40?`underline`:h>f*.5?`arrow`:`drawing`;let y=Math.min(10,a.length),b=Math.max(1,Math.floor(a.length/y)),x=new Set,S=[],C=[p];for(let e=b;e<a.length-1;e+=b)C.push(a[e]);C.push(m);for(let e of C){let t=Ee(e.x,e.y);if(!t||x.has(t)||j(t,`[data-feedback-toolbar]`))continue;x.add(t);let{name:n}=ue(t);S.includes(n)||S.push(n)}let w=`${Math.round(o)},${Math.round(s)} \u2192 ${Math.round(c)},${Math.round(l)}`,T;T=(g===`circle`||g===`box`)&&S.length>0?`${g===`box`?`Boxed`:`Circled`} **${S[0]}**${S.length>1?` (and ${S.slice(1).join(`, `)})`:``} (region: ${w})`:g===`underline`&&S.length>0?`Underlined **${S[0]}** (${w})`:g===`arrow`&&S.length>=2?`Arrow from **${S[0]}** to **${S[S.length-1]}** (${Math.round(p.x)},${Math.round(p.y)} \u2192 ${Math.round(m.x)},${Math.round(m.y)})`:S.length>0?`${g===`arrow`?`Arrow`:`Drawing`} near **${S.join(`**, **`)}** (region: ${w})`:`Drawing at ${w}`,n.push(T)}t&&(t.style.visibility=``),n.length>0&&(i+=`
**Drawings:**
`,n.forEach((e,t)=>{i+=`${t+1}. ${e}
`}))}if((W.length>0||r&&vn)&&(i+=`
`+br(W,{width:window.innerWidth,height:window.innerHeight},{blankCanvas:G,wireframePurpose:vn||void 0},X.outputDetail)),K){let e=xr(K,X.outputDetail,{width:window.innerWidth,height:window.innerHeight});e&&(i+=`
`+e)}if(i=Ii(P,i,l),!i){ht(!1);return}let o=!k||await Li(i);ee?.(i),gt.isCurrent(t)&&(ht(o),o&&(gt.schedule(t,()=>ht(!1),2e3),X.autoClearAfterCopy&&gt.schedule(t,ta,500)))},[P,Jn,W,K,G,U,gn,vn,e,X.outputDetail,`off`,_e,X.autoClearAfterCopy,ta,gt,k,l,a,ee]),ra=ua(X.webhookUrl)||ua(ce||``),$=O!=null||ra&&!X.webhooksEnabled,_a=M?$?337:297:44,va=(0,i.useCallback)(async()=>{let t=_t.start(),n=typeof window<`u`?window.location.href:e,r=typeof window<`u`?window.location.pathname+window.location.search+window.location.hash:e,i=Fi(P,r,X.outputDetail,{appName:a});if(!i&&W.length===0&&!K)return;if(i||=Pi(r,a),W.length>0&&(i+=`
`+br(W,{width:window.innerWidth,height:window.innerHeight},{blankCanvas:G,wireframePurpose:vn||void 0},X.outputDetail)),K){let e=xr(K,X.outputDetail,{width:window.innerWidth,height:window.innerHeight});e&&(i+=`
`+e)}yt(`sending`);let o=!0;try{await O?.(i,P)}catch(e){console.warn(`[Agentation] Submit callback failed:`,e),o=!1}if(!_t.isCurrent(t))return;let s=!ra||await Ui(`submit`,{output:i,annotations:P,url:n},!0),c=o&&s&&$;_t.isCurrent(t)&&(yt(c?`sent`:`failed`),_t.schedule(t,()=>yt(`idle`),2500),c&&X.autoClearAfterCopy&&_t.schedule(t,ta,500))},[O,a,Ui,P,W,K,G,gn,e,X.outputDetail,`off`,_e,X.autoClearAfterCopy,ta,ra,$,_t]);(0,i.useEffect)(()=>{let e=(e=!1)=>{Gr.current?.dragging&&(Q.current=e,Vr(!1)),Gr.current=null},t=t=>{let n=Gr.current;if(!n)return;if(!(t.buttons&1)){e();return}let r=t.clientX-n.x,i=t.clientY-n.y,a=Math.sqrt(r*r+i*i);if(!n.dragging&&a>10&&(n.dragging=!0,Vr(!0)),n.dragging){let e=n.toolbarX+r,t=n.toolbarY+i,a=20-(337-_a),o=window.innerWidth-20-337;e=Math.max(a,Math.min(o,e)),t=Math.max(20,Math.min(window.innerHeight-44-20,t)),Ir({x:e,y:t})}},n=()=>e(!0),r=()=>e();return N.addEventListener(`mousemove`,t),N.addEventListener(`mouseup`,n,!0),window.addEventListener(`blur`,r),()=>{N.removeEventListener(`mousemove`,t),N.removeEventListener(`mouseup`,n,!0),window.removeEventListener(`blur`,r)}},[_a]);let ya=(0,i.useCallback)(e=>{if(Q.current=!1,Gr.current=null,e.button!==0||e.target.closest(`button`)&&(e.target.closest(`button`)!==I.current||M)||e.target.closest(`[data-agentation-settings-panel]`))return;let t=e.currentTarget.parentElement;if(!t)return;let n=D(t);Gr.current={x:e.clientX,y:e.clientY,toolbarX:n.left,toolbarY:n.top,dragging:!1}},[M]);(0,i.useLayoutEffect)(()=>{if(!Z)return;let e=()=>{let e=Z.x,t=Z.y,n=20-(337-_a),r=window.innerWidth-20-337;e=Math.max(n,Math.min(r,e)),t=Math.max(20,Math.min(window.innerHeight-44-20,t)),(e!==Z.x||t!==Z.y)&&Ir({x:e,y:t})};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[Z,_a]),(0,i.useEffect)(()=>{if(!s)return;let e=e=>{if(e.defaultPrevented||e.isComposing||e.altKey)return;let t=e.composedPath()[0]||e.target,n=t.tagName===`INPUT`||t.tagName===`TEXTAREA`||t.tagName===`SELECT`||t.isContentEditable;if(e.key===`Escape`){if(d&&!z&&!V&&(M||Zt||U||Gn||ir.length)&&(e.preventDefault(),e.stopPropagation()),Zt){e.preventDefault(),Qt(!1),qe.current?.focus();return}if(U){cn?ln(null):Ai();return}if(Gn){qn(!1);return}if(ir.length>0){ar([]);return}z||V||M&&(sr(),ji())}if((e.metaKey||e.ctrlKey)&&e.shiftKey&&(e.key===`f`||e.key===`F`)){e.preventDefault(),sr(),M?ji():(I.current?.blur(),et.current=!0,me(!0));return}!M||n||e.metaKey||e.ctrlKey||e.repeat||((e.key===`p`||e.key===`P`)&&(e.preventDefault(),sr(),Ri()),(e.key===`l`||e.key===`L`)&&(e.preventDefault(),sr(),Gn&&qn(!1),Zt&&Qt(!1),z&&Ki(),U?Ai():ki()),(e.key===`h`||e.key===`H`)&&P.length>0&&(e.preventDefault(),sr(),ze(e=>!e)),(e.key===`c`||e.key===`C`)&&(P.length>0||W.length>0||K)&&(e.preventDefault(),sr(),na()),(e.key===`x`||e.key===`X`)&&(P.length>0||W.length>0||K)&&(e.preventDefault(),sr(),ta(),W.length>0&&sn([]),K&&Sn(null)),(e.key===`s`||e.key===`S`)&&P.length>0&&$&&vt===`idle`&&(e.preventDefault(),sr(),va()))},t=!!d;return N.addEventListener(`keydown`,e,t),()=>N.removeEventListener(`keydown`,e,t)},[s,d,V,M,Gn,U,cn,W,K,z,P.length,$,vt,va,Ri,na,ta,ir,Zt,ji,ki,Ai]);let ba=P.length>0,xa=ne(),Sa=P.filter(e=>e.kind!==`placement`&&e.kind!==`rearrange`),Ca=Sa.flatMap((e,t)=>{let n=xa(e);return n?[{annotation:n,index:t}]:[]}),wa=z&&!z.isSubmitted?xa({...z,comment:``,timestamp:0}):null,Ta=[...rt?Ca.map(e=>({...e,pending:!1})):[],...wa?[{annotation:wa,index:Sa.length,pending:!0}]:[]];(0,i.useEffect)(()=>{let e=new Set(rt&&!Be?Ca.map(({annotation:e})=>e.id):[]);gi.current&&!e.has(gi.current)&&(gi.current=null);for(let t of ni)e.has(t)||Ei(t)}),(0,i.useEffect)(()=>{V&&ni.has(V.id)&&(zt(!1),si(!0))},[V,ni]);let Ea=(0,i.useCallback)(e=>{!ot&&e.id!==gi.current&&Xi(e)},[ot,Xi]),Da=(0,i.useCallback)(e=>{Et===e&&Xi(null)},[Et,Xi]),Oa=(0,i.useCallback)((e,t)=>{if(V&&!oi){yi.current?.shake();return}ii&&Ji(),X.markerClickBehavior===`delete`?Yi(e.id):Hi(e,t)},[X.markerClickBehavior,Yi,Hi,ii,Ji,V,oi]),ka=V??(Si&&!z&&!bt?P.find(e=>e.id===Et&&!ni.has(e.id)):null),Aa=Yt?`Resume animations`:`Pause animations`,ja=U?`Exit layout mode`:`Layout mode`,Ma=F?`Hide markers`:`Show markers`,Na=l!==`markdown`&&!Ii(P,``,l),Pa=typeof l==`object`?`Copy ${l.attribute}`:l===`source`?`Copy source paths`:l===`classes`?`Copy classes`:U&&G?`Copy layout`:`Copy feedback`,Fa=M?0:-1;return!H||Be?null:(0,o.jsxs)(Le,{host:`agentation-toolbar`,className:le,children:[(0,o.jsxs)(`style`,{"data-agentation-styles":`toolbar`,children:[oa,pa]}),(0,o.jsxs)(`div`,{ref:Ge,className:L.positionContext,style:{display:`contents`},"data-agentation-theme":fr?`dark`:`light`,"data-agentation-accent":X.annotationColorId,"data-agentation-root":``,children:[(0,o.jsx)(`div`,{className:L.toolbar,"data-feedback-toolbar":!0,"data-agentation-toolbar":!0,"data-dragging":Br||void 0,style:Z?{left:Z.x,top:Z.y,right:`auto`,bottom:`auto`}:void 0,children:(0,o.jsxs)(`div`,{className:`${L.toolbarContainer} ${M?L.expanded:L.collapsed} ${mr?L.entrance:``} ${He?L.hiding:``} ${$?L.serverConnected:``}`,onMouseDown:ya,children:[(0,o.jsxs)(`div`,{className:`${L.controlsContent} ${M?L.visible:L.hidden} ${Z&&Z.y<100?L.tooltipBelow:``} ${tn||Zt?L.tooltipsHidden:``} ${er?L.tooltipsInSession:``}`,ref:e=>{Ke.current=e,e?.toggleAttribute(`inert`,!M)},role:`group`,"aria-label":`Feedback controls`,"aria-hidden":!M,onMouseEnter:lr,onMouseLeave:ur,children:[(0,o.jsxs)(`div`,{className:`${L.buttonWrapper} ${Z&&Z.x<120?L.buttonWrapperAlignLeft:``}`,children:[(0,o.jsx)(`button`,{className:L.controlButton,onClick:e=>{e.stopPropagation(),sr(),Ri()},"data-active":Yt,"aria-label":Aa,"aria-pressed":Yt,tabIndex:Fa,children:(0,o.jsx)(Ze,{size:24,isPaused:Yt})}),(0,o.jsxs)(`span`,{className:L.buttonTooltip,children:[Aa,s&&(0,o.jsx)(`span`,{className:L.shortcut,children:`P`})]})]}),(0,o.jsxs)(`div`,{className:L.buttonWrapper,children:[(0,o.jsx)(`button`,{className:`${L.controlButton} ${fr?``:L.light}`,onClick:e=>{e.stopPropagation(),sr(),Gn&&qn(!1),Zt&&Qt(!1),z&&Ki(),U?Ai():ki()},"data-active":U,"aria-label":ja,"aria-pressed":U,tabIndex:Fa,style:U&&G?{color:`#f97316`,background:`rgba(249, 115, 22, 0.25)`}:void 0,children:(0,o.jsx)(at,{size:21})}),(0,o.jsxs)(`span`,{className:L.buttonTooltip,children:[ja,s&&(0,o.jsx)(`span`,{className:L.shortcut,children:`L`})]})]}),(0,o.jsxs)(`div`,{className:L.buttonWrapper,children:[(0,o.jsx)(`button`,{className:L.controlButton,onClick:e=>{e.stopPropagation(),sr(),ze(!F)},disabled:!ba||U,"aria-label":Ma,tabIndex:Fa,children:(0,o.jsx)(Xe,{size:24,isOpen:F})}),(0,o.jsxs)(`span`,{className:L.buttonTooltip,children:[Ma,s&&(0,o.jsx)(`span`,{className:L.shortcut,children:`H`})]})]}),(0,o.jsxs)(`div`,{className:L.buttonWrapper,children:[(0,o.jsx)(`button`,{className:`${L.controlButton} ${mt?L.statusShowing:``}`,onClick:e=>{e.stopPropagation(),sr(),na()},disabled:Na||(U&&G?W.length===0&&!K?.sections?.length:!ba&&Jn.length===0&&W.length===0&&!K?.sections?.length),"data-active":mt,"aria-label":Pa,tabIndex:Fa,children:(0,o.jsx)(Je,{size:24,copied:mt,tint:U&&G&&(W.length>0||K?.sections?.length)?`#f97316`:void 0})}),(0,o.jsxs)(`span`,{className:L.buttonTooltip,children:[Na?`No matching metadata`:Pa,s&&(0,o.jsx)(`span`,{className:L.shortcut,children:`C`})]})]}),(0,o.jsxs)(`div`,{className:`${L.buttonWrapper} ${L.sendButtonWrapper} ${M&&$?L.sendButtonVisible:``}`,children:[(0,o.jsxs)(`button`,{className:`${L.controlButton} ${vt===`sent`||vt===`failed`?L.statusShowing:``}`,onClick:e=>{e.stopPropagation(),sr(),va()},disabled:!ba||!$||vt===`sending`,"data-no-hover":vt===`sent`||vt===`failed`,tabIndex:M&&$?0:-1,"aria-label":`Send Annotations`,"aria-hidden":!$,children:[(0,o.jsx)(Ye,{size:24,state:vt}),ba&&vt===`idle`&&(0,o.jsx)(`span`,{className:L.buttonBadge,children:P.length})]}),(0,o.jsxs)(`span`,{className:L.buttonTooltip,children:[`Send Annotations`,s&&(0,o.jsx)(`span`,{className:L.shortcut,children:`S`})]})]}),(0,o.jsxs)(`div`,{className:L.buttonWrapper,children:[(0,o.jsx)(`button`,{className:L.controlButton,onClick:e=>{e.stopPropagation(),sr(),ta()},disabled:!ba&&Jn.length===0&&W.length===0&&!K?.sections?.length,"data-danger":!0,"aria-label":`Clear all`,tabIndex:Fa,children:(0,o.jsx)($e,{size:24})}),(0,o.jsxs)(`span`,{className:L.buttonTooltip,children:[`Clear all`,s&&(0,o.jsx)(`span`,{className:L.shortcut,children:`X`})]})]}),(0,o.jsxs)(`div`,{className:L.buttonWrapper,children:[(0,o.jsx)(`button`,{ref:qe,"aria-label":`Settings`,"aria-expanded":Zt,tabIndex:Fa,className:L.controlButton,onClick:e=>{e.stopPropagation(),sr(),U&&Ai(),nt.current=!Zt&&e.detail===0,Qt(!Zt)},children:(0,o.jsx)(Qe,{size:24})}),A&&Cr!==`disconnected`&&(0,o.jsx)(`span`,{className:`${L.mcpIndicator} ${L[Cr]} ${Zt?L.hidden:``}`,title:Cr===`connected`?`MCP Connected`:`MCP Connecting...`}),(0,o.jsx)(`span`,{className:L.buttonTooltip,children:`Settings`})]}),(0,o.jsx)(`div`,{className:L.divider}),(0,o.jsx)(`div`,{className:L.togglePlaceholder,"aria-hidden":`true`})]}),(0,o.jsxs)(`div`,{className:`${L.buttonWrapper} ${L.toggleWrapper} ${Z&&Z.y<100?L.tooltipBelow:``} ${!M||tn||Zt?L.tooltipsHidden:``} ${er?L.tooltipsInSession:``} ${Z&&typeof window<`u`&&Z.x>window.innerWidth-120?L.buttonWrapperAlignRight:``}`,onMouseEnter:lr,onMouseLeave:ur,children:[(0,o.jsx)(`button`,{ref:I,type:`button`,className:`${L.toggleContent} ${M?L.expandedToggle:``}`,"aria-label":M?`Exit`:`Start feedback mode`,"aria-expanded":M,"aria-keyshortcuts":s?`Meta+Shift+F Control+Shift+F`:void 0,title:M?void 0:s?`Start feedback mode (⌘⇧F / Ctrl+Shift+F)`:`Start feedback mode`,onClick:e=>{if(Q.current){Q.current=!1,e.preventDefault();return}e.stopPropagation(),M?(sr(),ji()):(e.currentTarget.blur(),et.current=e.detail===0,me(!0))},children:(0,o.jsxs)(`span`,{className:L.toggleIcon,children:[(0,o.jsx)(dt,{active:M}),Sa.length>0&&(0,o.jsx)(`span`,{className:`${L.badge} ${M?L.fadeOut:``} ${mr?L.entrance:``}`,children:Sa.length})]})}),(0,o.jsxs)(`span`,{className:L.buttonTooltip,"aria-hidden":!M,children:[`Exit`,s&&(0,o.jsx)(`span`,{className:L.shortcut,children:`Esc`})]})]}),(0,o.jsx)(Fn,{visible:U&&M,activeType:cn,onSelect:e=>{ln(cn===e?null:e)},isDarkMode:fr,sectionCount:K?.sections.length??0,onDetectSections:()=>{let e=Kn(),t=K?.sections??[],n=new Set(t.map(e=>e.selector)),r=e.filter(e=>!n.has(e.selector)),i=[...t,...r],a=[...K?.originalOrder??[],...r.map(e=>e.id)];Sn({sections:i,originalOrder:a,detectedAt:Date.now()})},placementCount:W.length,onClearPlacements:()=>{ea(W,K)},blankCanvas:G,onBlankCanvasChange:e=>{let t={sections:[],originalOrder:[],detectedAt:Date.now()};e?(wn.current={rearrange:K,placements:W},Sn(Tn.current.rearrange||t),sn(Tn.current.placements),ln(null)):(Tn.current={rearrange:K,placements:W},Sn(wn.current.rearrange||t),sn(wn.current.placements)),dn(e)},wireframePurpose:vn,onWireframePurposeChange:yn,Tooltip:lt,onDragStart:(e,t)=>{t.preventDefault();let n=R[e],r=null,i=!1,a=t.clientX,o=t.clientY,s=t.target.closest(`[data-feedback-toolbar]`)?.getBoundingClientRect().top??window.innerHeight,c=t=>{let c=t.clientX-a,l=t.clientY-o;if(!i&&(Math.abs(c)>4||Math.abs(l)>4)&&(i=!0,r=document.createElement(`div`),r.className=`${q.dragPreview}${G?` ${q.dragPreviewWireframe}`:``}`,Ge.current?.appendChild(r)),!r)return;let u=Math.max(0,s-t.clientY),d=1-(1-Math.min(1,u/180))**2,f=Math.min(140,n.width*.18),p=Math.min(90,n.height*.18),m=28+(f-28)*d,h=20+(p-20)*d;r.style.width=`${m}px`,r.style.height=`${h}px`,r.style.left=`${t.clientX-m/2}px`,r.style.top=`${t.clientY-h/2}px`,r.style.opacity=`${.5+.5*d}`,r.textContent=d>.25?e:``},l=t=>{if(window.removeEventListener(`mousemove`,c),window.removeEventListener(`mouseup`,l),r&&r.remove(),i){let r=n.width,i=n.height,a=window.scrollY,o=Math.max(0,t.clientX-r/2),s=Math.max(0,t.clientY+a-i/2),c={id:`dp-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,type:e,x:o,y:s,width:r,height:i,scrollY:a,timestamp:Date.now()};sn(e=>[...e,c]),ln(null),In.current=new Set,Dn(e=>e+1)}};window.addEventListener(`mousemove`,c),window.addEventListener(`mouseup`,l)}}),(0,o.jsx)(ia,{settings:X,onSettingsChange:gr,isDarkMode:fr,onToggleTheme:_r,isDevMode:!1,connectionStatus:Cr,endpoint:A,onExited:xi,isOpen:M&&Zt,toolbarNearBottom:!!Z&&Z.y<230,settingsPage:$t,onSettingsPageChange:en,onHideToolbar:Di})]})}),(U||an)&&(0,o.jsx)(`div`,{className:`${q.blankCanvas} ${fn?q.visible:``} ${bn?q.gridActive:``}`,style:{"--canvas-opacity":mn},"data-feedback-toolbar":!0}),U&&G&&fn&&(0,o.jsxs)(`div`,{className:q.wireframeNotice,"data-feedback-toolbar":!0,children:[(0,o.jsxs)(`div`,{className:q.wireframeOpacityRow,children:[(0,o.jsx)(`span`,{className:q.wireframeOpacityLabel,children:`Toggle Opacity`}),(0,o.jsx)(`input`,{type:`range`,className:q.wireframeOpacitySlider,min:0,max:1,step:.01,value:mn,onChange:e=>hn(Number(e.target.value))})]}),(0,o.jsxs)(`div`,{className:q.wireframeNoticeTitleRow,children:[(0,o.jsx)(`span`,{className:q.wireframeNoticeTitle,children:`Wireframe Mode`}),(0,o.jsx)(`span`,{className:q.wireframeNoticeDivider}),(0,o.jsx)(`button`,{className:q.wireframeStartOver,onClick:()=>{ea(W,K),Tn.current={rearrange:null,placements:[]},yn(``),zr(e)},children:`Start Over`})]}),`Drag components onto the canvas.`,(0,o.jsx)(`br`,{}),`Copied output will only include the wireframed layout.`]}),(U||an)&&(0,o.jsx)(kn,{placements:W,onChange:sn,activeComponent:an?null:cn,onActiveComponentChange:ln,isDarkMode:fr,exiting:an,onInteractionChange:xn,passthrough:!cn,extraSnapRects:K?.sections.map(e=>e.currentRect),deselectSignal:En,clearingPlacements:jn,wireframe:G,onSelectionChange:(e,t)=>{In.current=e,t||(Ln.current=new Set,An(e=>e+1))},onDragMove:(e,t)=>{let n=Ln.current;if(!(!n.size||!K)){if(!Rn.current){Rn.current=new Map;for(let e of K.sections)n.has(e.id)&&Rn.current.set(e.id,{x:e.currentRect.x,y:e.currentRect.y})}for(let r of K.sections){if(!n.has(r.id)||!Rn.current.get(r.id))continue;let i=Ge.current?.querySelector(`[data-rearrange-section="${r.id}"]`);i&&(i.style.transform=`translate(${e}px, ${t}px)`)}}},onDragEnd:(e,t,n)=>{let r=Ln.current,i=Rn.current;if(Rn.current=null,!(!r.size||!K||!i)){for(let e of r){let t=Ge.current?.querySelector(`[data-rearrange-section="${e}"]`);t&&(t.style.transform=``)}n&&Sn(n=>n&&{...n,sections:n.sections.map(n=>{let r=i.get(n.id);return r?{...n,currentRect:{...n.currentRect,x:Math.max(0,r.x+e),y:Math.max(0,r.y+t)}}:n})})}}}),(U||an)&&K&&(0,o.jsx)(nr,{rearrangeState:K,onChange:Sn,isDarkMode:fr,exiting:an,blankCanvas:G,extraSnapRects:W.map(e=>({x:e.x,y:e.y,width:e.width,height:e.height})),clearing:K===Y,deselectSignal:On,onSelectionChange:(e,t)=>{Ln.current=e,t||(In.current=new Set,Dn(e=>e+1))},onDragMove:(e,t)=>{let n=In.current;if(n.size){if(!Rn.current){Rn.current=new Map;for(let e of W)n.has(e.id)&&Rn.current.set(e.id,{x:e.x,y:e.y})}for(let r of n){let n=Ge.current?.querySelector(`[data-design-placement="${r}"]`);n&&(n.style.transform=`translate(${e}px, ${t}px)`)}}},onDragEnd:(e,t,n)=>{let r=In.current,i=Rn.current;if(Rn.current=null,!(!r.size||!i)){for(let e of r){let t=Ge.current?.querySelector(`[data-design-placement="${e}"]`);t&&(t.style.transform=``)}n&&sn(n=>n.map(n=>{let r=i.get(n.id);return r?{...n,x:Math.max(0,r.x+e),y:Math.max(0,r.y+t)}:n}))}}}),(0,o.jsx)(`canvas`,{ref:$n,className:`${L.drawCanvas} ${Gn?L.active:``}`,"aria-hidden":`true`,style:{opacity:+!!Si,transition:`opacity 0.15s ease`},"data-feedback-toolbar":!0}),(0,o.jsx)(`div`,{className:L.markersLayer,"data-feedback-toolbar":!0,children:Ta.filter(({annotation:e})=>!e.isFixed).map(({annotation:e,index:t,pending:n},r,i)=>(0,o.jsx)(qi,{annotation:e,pending:n,globalIndex:t,layerIndex:r,layerSize:i.length,isExiting:n?ii:ot,isClearing:St.current.has(e.id),isAnimated:$r.current.has(e.id),isNew:gi.current===e.id,onEnterComplete:ti,isHovered:!ot&&Et===e.id,isRemoving:ni.has(e.id),onRemoveComplete:Ei,isEditingAny:!!V,renumberFrom:Mt,markerClickBehavior:X.markerClickBehavior,onHoverEnter:Ea,onHoverLeave:Da,onClick:Oa,onContextMenu:Hi},ei.current.get(e.id)??e.id))}),(0,o.jsx)(`div`,{className:L.fixedMarkersLayer,"data-feedback-toolbar":!0,children:Ta.filter(({annotation:e})=>e.isFixed).map(({annotation:e,index:t,pending:n},r,i)=>(0,o.jsx)(qi,{annotation:e,pending:n,globalIndex:t,layerIndex:r,layerSize:i.length,isExiting:n?ii:ot,isClearing:St.current.has(e.id),isAnimated:$r.current.has(e.id),isNew:gi.current===e.id,onEnterComplete:ti,isHovered:!ot&&Et===e.id,isRemoving:ni.has(e.id),onRemoveComplete:Ei,isEditingAny:!!V,renumberFrom:Mt,markerClickBehavior:X.markerClickBehavior,onHoverEnter:Ea,onHoverLeave:Da,onClick:Oa,onContextMenu:Hi},ei.current.get(e.id)??e.id))}),M&&ct&&!z&&!V&&!Kt&&!ci&&(0,o.jsx)(aa,{x:ft.x,y:ft.y,elementName:ct.elementName,reactComponents:ct.reactComponents}),M&&(0,o.jsxs)(`div`,{className:L.overlay,"data-feedback-toolbar":!0,style:z||V?{zIndex:`inherit`}:void 0,children:[ct?.rect&&!z&&!Kt&&!ci&&(0,o.jsx)(`div`,{className:`${L.hoverHighlight} ${L.enter}`,style:{left:ct.rect.left,top:ct.rect.top,width:ct.rect.width,height:ct.rect.height,borderColor:`color-mix(in srgb, var(--agentation-color-accent) 50%, transparent)`,backgroundColor:`color-mix(in srgb, var(--agentation-color-accent) 4%, transparent)`,...ct.isPiercing?{borderStyle:`dashed`}:{}}}),ir.filter(e=>e.element.isConnected).map((e,t)=>{let n=D(e.element),r=ir.length>1;return(0,o.jsx)(`div`,{className:r?L.multiSelectOutline:L.singleSelectOutline,style:{position:`fixed`,left:n.left,top:n.top,width:n.width,height:n.height,...r?{}:{borderColor:`color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)`,backgroundColor:`color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)`}}},t)}),Et&&!z&&(()=>{let e=P.find(e=>e.id===Et);if(!e?.boundingBox)return null;if(e.elementBoundingBoxes?.length)return At.length>0?At.filter(e=>e.isConnected).map((e,t)=>{let n=D(e);return(0,o.jsx)(`div`,{className:`${L.multiSelectOutline} ${L.enter}`,style:{left:n.left,top:n.top,width:n.width,height:n.height}},`hover-outline-live-${t}`)}):e.elementBoundingBoxes.map((e,t)=>(0,o.jsx)(`div`,{className:`${L.multiSelectOutline} ${L.enter}`,style:{left:e.x,top:e.y-Wt,width:e.width,height:e.height}},`hover-outline-${t}`));let t=Ot&&Ot.isConnected?D(Ot):null,n=t?{x:t.left,y:t.top,width:t.width,height:t.height}:{x:e.boundingBox.x,y:e.isFixed?e.boundingBox.y:e.boundingBox.y-Wt,width:e.boundingBox.width,height:e.boundingBox.height},r=e.isMultiSelect;return(0,o.jsx)(`div`,{className:`${r?L.multiSelectOutline:L.singleSelectOutline} ${L.enter}`,style:{left:n.x,top:n.y,width:n.width,height:n.height,...r?{}:{borderColor:`color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)`,backgroundColor:`color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)`}}})})(),z&&(0,o.jsxs)(o.Fragment,{children:[z.multiSelectElements?.length?z.multiSelectElements.filter(e=>e.isConnected).map((e,t)=>{let n=D(e);return(0,o.jsx)(`div`,{className:`${L.multiSelectOutline} ${ii?L.exit:L.enter}`,style:{left:n.left,top:n.top,width:n.width,height:n.height}},`pending-multi-${t}`)}):z.targetElement&&z.targetElement.isConnected?(()=>{let e=D(z.targetElement);return(0,o.jsx)(`div`,{className:`${L.singleSelectOutline} ${ii?L.exit:L.enter}`,style:{left:e.left,top:e.top,width:e.width,height:e.height,borderColor:`color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)`,backgroundColor:`color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)`}})})():z.boundingBox&&(0,o.jsx)(`div`,{className:`${z.isMultiSelect?L.multiSelectOutline:L.singleSelectOutline} ${ii?L.exit:L.enter}`,style:{left:z.boundingBox.x,top:z.boundingBox.y-Wt,width:z.boundingBox.width,height:z.boundingBox.height,...z.isMultiSelect?{}:{borderColor:`color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)`,backgroundColor:`color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)`}}}),(()=>{let e=xa(z)??z,t=e.x,n=e.isFixed?e.y:e.y-Wt;return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(We,{ref:vi,element:z.element,selectedText:z.selectedText,allowEmpty:typeof l==`object`&&!!z.attributes?.[l.attribute],onOpenSource:u&&z.sourceFile?()=>u(z.sourceFile):void 0,computedStyles:z.computedStylesObj,placeholder:typeof l==`object`&&z.attributes?.[l.attribute]?`Add a note (optional)`:z.element===`Area selection`?`What should change in this area?`:z.isMultiSelect?`Feedback for this group of elements...`:`What should change?`,onSubmit:Gi,onExitComplete:Ji,onCancel:Ki,isExiting:ii,lightMode:!fr,accentColor:z.isMultiSelect?`var(--agentation-color-green)`:`var(--agentation-color-accent)`,style:{left:Math.max(160,Math.min(window.innerWidth-160,t/100*window.innerWidth)),...n>window.innerHeight-290?{bottom:window.innerHeight-n+20}:{top:n+20}}},z.id)})})()]}),V&&(0,o.jsx)(o.Fragment,{children:V.elementBoundingBoxes?.length?Ht.length>0?Ht.filter(e=>e.isConnected).map((e,t)=>{let n=D(e);return(0,o.jsx)(`div`,{className:`${L.multiSelectOutline} ${L.enter}`,style:{left:n.left,top:n.top,width:n.width,height:n.height}},`edit-multi-live-${t}`)}):V.elementBoundingBoxes.map((e,t)=>(0,o.jsx)(`div`,{className:`${L.multiSelectOutline} ${L.enter}`,style:{left:e.x,top:e.y-Wt,width:e.width,height:e.height}},`edit-multi-${t}`)):(()=>{let e=Bt&&Bt.isConnected?D(Bt):null,t=e?{x:e.left,y:e.top,width:e.width,height:e.height}:V.boundingBox?{x:V.boundingBox.x,y:V.isFixed?V.boundingBox.y:V.boundingBox.y-Wt,width:V.boundingBox.width,height:V.boundingBox.height}:null;return t?(0,o.jsx)(`div`,{className:`${V.isMultiSelect?L.multiSelectOutline:L.singleSelectOutline} ${L.enter}`,style:{left:t.x,top:t.y,width:t.width,height:t.height,...V.isMultiSelect?{}:{borderColor:`color-mix(in srgb, var(--agentation-color-accent) 60%, transparent)`,backgroundColor:`color-mix(in srgb, var(--agentation-color-accent) 5%, transparent)`}}}):null})()}),ci&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`div`,{ref:fi,className:L.dragSelection}),(0,o.jsx)(`div`,{ref:pi,className:L.highlightsContainer})]})]}),(0,o.jsx)(Wi,{ref:yi,annotation:ka?xa(ka)??V:null,editing:!!V,exiting:oi,restorePreview:Rt,scrollY:Wt,lightMode:!fr,onExited:$i,editorProps:ka?{element:ka.element,selectedText:ka.selectedText,allowEmpty:typeof l==`object`&&!!ka.attributes?.[l.attribute],onOpenSource:u&&ka.sourceFile?()=>u(ka.sourceFile):void 0,computedStyles:xe(ka.computedStyles),placeholder:`Edit your feedback...`,initialValue:ka.comment,submitLabel:`Save`,onSubmit:Zi,onCancel:Qi,onDelete:()=>Yi(ka.id),accentColor:ka.isMultiSelect?`var(--agentation-color-green)`:`var(--agentation-color-accent)`}:void 0})]})]})}export{_a as Agentation,_a as PageFeedbackToolbarCSS};