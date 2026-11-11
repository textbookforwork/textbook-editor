import { createElement } from 'react';
import htm from 'htm';

/**
 * 課堂模組（原「師生同步」demo）是用 Preact＋htm 寫的。搬進編輯器時不重寫模板，
 * 改用這個轉接的 h 讓 React 吃得下 Preact 的寫法：
 *   class → className、for → htmlFor、style 字串 → 物件、
 *   SVG 的 stroke-width 這類連字號屬性 → 駝峰、onInput 補成 onChange（React 的受控輸入要 onChange）。
 */
const RENAME = {
  class: 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  autofocus: 'autoFocus',
  maxlength: 'maxLength',
  readonly: 'readOnly',
  inputmode: 'inputMode',
  autocomplete: 'autoComplete',
  spellcheck: 'spellCheck',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  srcset: 'srcSet',
  enterkeyhint: 'enterKeyHint',
  'xlink:href': 'xlinkHref',
  ondblclick: 'onDoubleClick',
  onDblClick: 'onDoubleClick',
};

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function styleObject(str) {
  const out = {};
  for (const decl of String(str).split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    const v = decl.slice(i + 1).trim();
    if (!k) continue;
    out[k.startsWith('--') ? k : camel(k)] = v;
  }
  return out;
}

function fixStyle(style) {
  if (style == null || style === false || style === '') return undefined;
  if (typeof style === 'string') return styleObject(style);
  // Preact 會把數字自動加 px，React 也會（自訂屬性除外），兩邊一樣，不用處理
  return style;
}

function fixProps(type, props) {
  if (!props) return props;
  const out = {};
  for (const key in props) {
    let v = props[key];
    let k = RENAME[key] ?? key;
    if (typeof type === 'string' && k.includes('-') && !k.startsWith('data-') && !k.startsWith('aria-')) k = camel(k);
    if (k === 'style') v = fixStyle(v);
    out[k] = v;
  }
  if (typeof type === 'string') {
    // Preact 的 onInput 等於 React 的 onChange；兩個都給時保留 onChange
    if (out.onInput && !out.onChange && (type === 'input' || type === 'textarea' || type === 'select')) {
      out.onChange = out.onInput;
      delete out.onInput;
    }
    // 有 value 卻沒有 onChange（例：頁碼框只在 blur 時讀值）：Preact 是照樣能打字的，
    // React 會把它鎖死，所以改成 defaultValue（原本就靠 key 換值）
    if ('value' in out && !out.onChange && !out.readOnly && (type === 'input' || type === 'textarea' || type === 'select')) {
      if (out.value !== undefined) out.defaultValue = out.value;
      delete out.value;
    }
    if ('checked' in out && !out.onChange) out.onChange = () => {};
    // React 不接受 disabled={false} 以外的假值寫法以外的怪值；undefined/false 都照常
    if (out.className === false || out.className == null) delete out.className;
  }
  return out;
}

/* htm 的 ${list.map(...)} 會給一個陣列；Preact 不要求 key，React 會一直警告。
   攤平成一個個子節點（有寫 key 的照樣用 key 對位） */
const flat = (children) => (children.some(Array.isArray) ? children.flat(Infinity) : children);

export function h(type, props, ...children) {
  return createElement(type, fixProps(type, props), ...flat(children));
}

export const html = htm.bind(h);
