/* eslint-disable */
// 課堂模組：原「師生同步」demo（projects/V1/師生同步網站）2026-11-10 併進編輯器。
// 模板維持 htm 寫法，靠 ./h.js 轉給 React；畫面接編輯器的書櫃、閱讀與真的課本內容（見 ./bridge.ts）。
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import qrcode from 'qrcode-generator';
import { h, html as _html } from './h.js';
import { BRIDGE } from './bridgeSlot.js';
import { readSheet, downloadRows } from './sheet.js';
import './classroom.css';
window.qrcode = qrcode;

const ICONS={"arrow-left":"<path d=\"m12 19-7-7 7-7\" /> <path d=\"M19 12H5\" />","blocks":"<path d=\"M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2\" /> <rect x=\"14\" y=\"2\" width=\"8\" height=\"8\" rx=\"1\" />","chevron-up": "<path d=\"m18 15-6-6-6 6\" />", "chevron-down": "<path d=\"m6 9 6 6 6-6\" />", "chevron-left": "<path d=\"m15 18-6-6 6-6\" />", "chevron-right": "<path d=\"m9 18 6-6-6-6\" />", "pencil": "<path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\" /> <path d=\"m15 5 4 4\" />", "highlighter": "<path d=\"m9 11-6 6v3h9l3-3\" /> <path d=\"m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4\" />", "eraser": "<path d=\"m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21\" /> <path d=\"M22 21H7\" /> <path d=\"m5 11 9 9\" />", "trash": "<path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\" /> <path d=\"M3 6h18\" /> <path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\" />", "corner-up-left": "<path d=\"M9 14 4 9l5-5\" /> <path d=\"M20 20v-7a4 4 0 0 0-4-4H4\" />", "corner-up-right": "<path d=\"m15 14 5-5-5-5\" /> <path d=\"M4 20v-7a4 4 0 0 1 4-4h12\" />", "archive": "<rect width=\"20\" height=\"5\" x=\"2\" y=\"3\" rx=\"1\" /> <path d=\"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8\" /> <path d=\"M10 12h4\" />", "send": "<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\" /> <path d=\"m21.854 2.147-10.94 10.939\" />", "menu": "<path d=\"M4 5h16\" /> <path d=\"M4 12h16\" /> <path d=\"M4 19h16\" />", "x": "<path d=\"M18 6 6 18\" /> <path d=\"m6 6 12 12\" />", "arrow-up-right": "<path d=\"M7 7h10v10\" /> <path d=\"M7 17 17 7\" />", "arrow-right": "<path d=\"M5 12h14\" /> <path d=\"m12 5 7 7-7 7\" />", "book": "<path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\" />", "globe": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" /> <path d=\"M2 12h20\" />", "settings": "<path d=\"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915\" /> <circle cx=\"12\" cy=\"12\" r=\"3\" />", "sticky-note": "<path d=\"M16 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V9Z\" /> <path d=\"M15 3v4a2 2 0 0 0 2 2h4\" />", "presentation": "<path d=\"M2 3h20\" /> <path d=\"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3\" /> <path d=\"m7 21 5-5 5 5\" />", "sticker": "<path d=\"M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z\" /> <path d=\"M14 3v4a2 2 0 0 0 2 2h4\" /> <path d=\"M8 13h.01\" /> <path d=\"M16 13h.01\" /> <path d=\"M10 16s.8 1 2 1c1.3 0 2-1 2-1\" />", "list-checks": "<path d=\"m3 17 2 2 4-4\" /> <path d=\"m3 7 2 2 4-4\" /> <path d=\"M13 6h8\" /> <path d=\"M13 12h8\" /> <path d=\"M13 18h8\" />", "compass": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z\" />", "orbit": "<circle cx=\"12\" cy=\"12\" r=\"3\" /> <circle cx=\"19\" cy=\"5\" r=\"2\" /> <circle cx=\"5\" cy=\"19\" r=\"2\" /> <path d=\"M10.4 21.9a10 10 0 0 0 9.941-15.416\" /> <path d=\"M13.5 2.1a10 10 0 0 0-9.841 15.416\" />", "check": "<path d=\"M20 6 9 17l-5-5\" />", "eye": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" /> <circle cx=\"12\" cy=\"12\" r=\"3\" />", "sparkles": "<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\" /> <path d=\"M20 3v4\" /> <path d=\"M22 5h-4\" /> <path d=\"M4 17v2\" /> <path d=\"M5 18H3\" />", "zoom-in": "<circle cx=\"11\" cy=\"11\" r=\"8\" /> <line x1=\"21\" x2=\"16.65\" y1=\"21\" y2=\"16.65\" /> <line x1=\"11\" x2=\"11\" y1=\"8\" y2=\"14\" /> <line x1=\"8\" x2=\"14\" y1=\"11\" y2=\"11\" />", "lock": "<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /><path d=\"M7 11V7a5 5 0 0 1 10 0v4\" />", "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" /><circle cx=\"9\" cy=\"7\" r=\"4\" /><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\" /><path d=\"M16 3.13a4 4 0 0 1 0 7.75\" />", "star": "<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\" />", "cast": "<path d=\"M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6\" /><path d=\"M2 12a9 9 0 0 1 8 8\" /><path d=\"M2 16a5 5 0 0 1 4 4\" /><line x1=\"2\" x2=\"2.01\" y1=\"20\" y2=\"20\" />", "rotate-ccw": "<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\" /><path d=\"M3 3v5h5\" />", "panel-right": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" /><path d=\"M15 3v18\" />", "party": "<path d=\"M5.8 11.3 2 22l10.7-3.79\" /><path d=\"M4 3h.01\" /><path d=\"M22 8h.01\" /><path d=\"M15 2h.01\" /><path d=\"M22 20h.01\" /><path d=\"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10\" /><path d=\"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17\" /><path d=\"m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7\" /><path d=\"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z\" />", "play": "<polygon points=\"6 3 20 12 6 21 6 3\" />"};
Object.assign(ICONS, {
  n123: '<path d="M3 10l2 -2v8" /><path d="M9 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3" /><path d="M17 8h2.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-2.5" />',
  /* 貼紙：Tabler sticker（圓形、一角翻起）；電子白板：照乙練給的樣式畫（圓角板子、下緣中間一個板擦槽） */
  'sticker2': '<path d="M20 12l-2 .5a6 6 0 0 1 -6.5 -6.5l.5 -2l8 8" /><path d="M20 12a8 8 0 1 1 -8 -8" />',
  whiteboard: '<path d="M8.5 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-3.5" /><rect x="9.5" y="16.5" width="5" height="3.5" rx="1" />',
  sun: '<circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />',
  /* 數學與科目工具圖示：Tabler（planet、ruler-measure、angle、plus-minus）、Lucide（drafting-compass），2026-10-30 */
  planet: '<path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" /><circle cx="12" cy="12" r="7" />',
  'ruler-measure': '<path d="M19.875 12c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857a1 1 0 0 1 1 -1h15.875z" /><path d="M9 12v2" /><path d="M6 12v3" /><path d="M12 12v3" /><path d="M18 12v3" /><path d="M15 12v2" /><path d="M3 3v4" /><path d="M3 5h18" /><path d="M21 3v4" />',
  angle: '<path d="M21 19h-18l9 -15" /><path d="M20.615 15.171h.015" /><path d="M19.515 11.771h.015" /><path d="M17.715 8.671h.015" /><path d="M15.415 5.971h.015" />',
  'plus-minus': '<path d="M4 7h6" /><path d="M7 4v6" /><path d="M20 18h-6" /><path d="M5 19l14 -14" />',
  'drafting-compass': '<path d="m12.99 6.74 1.93 3.44" /><path d="M19.136 12a10 10 0 0 1-14.271 0" /><path d="m21 21-2.16-3.84" /><path d="m3 21 8.02-14.26" /><circle cx="12" cy="5" r="2" />',
  'eye-off': '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" />',
  mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" />',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />',
  shapes: '<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" /><rect x="3" y="14" width="7" height="7" rx="1" /><circle cx="17.5" cy="17.5" r="3.5" />',
  'users-round': '<path d="M18 21a8 8 0 0 0-16 0" /><circle cx="10" cy="8" r="5" /><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />',
  square: '<rect x="5" y="5" width="14" height="14" rx="2" />',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />',
  cell: '<circle cx="12" cy="12" r="9" /><circle cx="10" cy="10" r="2.5" /><path d="M15 15h.01" /><path d="M16 9h.01" />',
  ghost: '<path d="M9 10h.01" /><path d="M15 10h.01" /><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />',
  search: '<circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />',
  timer: '<circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2" /><path d="M5 3 2 6" /><path d="m22 6-3-3" /><path d="M10 2h4" />',
  plus: '<path d="M5 12h14" /><path d="M12 5v14" />',
  minus: '<path d="M5 12h14" />',
  upload: '<path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" />',
  'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" />',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />',
  dice: '<rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8 8h.01" /><path d="M16 8h.01" /><path d="M12 12h.01" /><path d="M8 16h.01" /><path d="M16 16h.01" />',
  'thumbs-up': '<path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />',
  type: '<path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" />',
  image: '<rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />',
  list: '<path d="M3 12h.01" /><path d="M3 18h.01" /><path d="M3 6h.01" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M8 6h13" />',
  protractor: '<path d="M2 18a10 10 0 0 1 20 0Z" /><path d="M12 18V12" /><path d="m7 13 1.5 1.5" /><path d="m17 13-1.5 1.5" />',
  'book-a': '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /><path d="m8 13 4-7 4 7" /><path d="M9.1 11h5.7" />',
  school: '<path d="M14 22v-4a2 2 0 1 0-4 0v4" /><path d="m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10" /><path d="M18 5v17" /><path d="m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6" /><path d="M6 5v17" /><circle cx="12" cy="9" r="2" />',
  pencil2: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />',
});
Object.assign(ICONS, {
  bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />',
  'package-open': '<path d="M12 22v-9" /><path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" /><path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" /><path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z" />',
  library: '<path d="m16 6 4 14" /><path d="M12 6v14" /><path d="M8 8v12" /><path d="M4 4v16" />',
  save: '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" /><path d="M7 3v4a1 1 0 0 0 1 1h7" />',
  share: '<circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />',
  table: '<path d="M12 3v18" /><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" />',
});
const html = _html;

/* ───────── 資料 ───────── */
/* 頁：閱讀畫面依真的課本分頁結果設定（bridge.setPages）。id 含書的 id，換書時筆跡不會串到別本 */
let PAGES = [
  { id: 'p0', nums: [1], title: '', label: '', r: 16 / 9 },
  { id: 'p1', nums: [2], title: '', label: '', r: 16 / 9 },
];
export function setPages(list) { if (list && list.length) PAGES = list; }
export const getPages = () => PAGES;
/* 範例筆跡的位置（頁寬 1000 的座標）*/
/* 2026-10-28 照新版頁面重量：h2＝標題圈（中心、半徑），kw＝第一段「星座」底線，tri＝照片上三顆亮星，kw3＝第二段「夏季大三角」底線，kw2＝第 5 頁「地球自轉」底線 */
const INK = { h2: [98, 38, 92, 26], kw: [68, 101, 148], tri: [[95, 210], [231, 286], [55, 317]], kw3: [283, 371, 478], kw2: [570, 637, 184] }; // 2026-10-30 改 16:9 版面後量的
const ph = (p) => 1000 / ((PAGES[p] || PAGES[0]).r);
/* 一頁一份的清單（筆跡、便利貼、貼紙），用到才建 */
const pgl = (o, id) => (o[id] || (o[id] = [])); // 筆跡座標：頁寬固定 1000
const SCHOOL = '星光示範國小';
const SUBJECTS = ['國語', '英文', '數學', '自然', '社會'];
/* 學制決定能任教的科目；測試推廣單位不限學制，國小國中的科目都能選（2026-11-03） */
const SUBJ_BY_STAGE = { 國小: ['國語', '英語', '數學', '自然', '社會'], 國中: ['國文', '英語', '數學', '理化', '生物', '地科', '歷史', '地理', '公民'] };
const subjectsOf = (school) => { const sc = S.admin.schools.find((x) => x.name === school); if (!sc || sc.type !== '學校') return [...new Set([...SUBJ_BY_STAGE.國小, ...SUBJ_BY_STAGE.國中])]; return SUBJ_BY_STAGE[sc.stage] || SUBJ_BY_STAGE.國小; };
const NAMES = ['王大明','陳怡君','林品妤','張家豪','李宜庭','黃柏翰','吳承恩','劉子晴','蔡佳穎','楊宗翰','許雅婷','陳小宇','鄭宇軒','謝欣妤','郭冠廷','洪詩涵','曾柏宇','邱若瑜','廖品睿','賴芷涵','周彥廷','徐巧芸','蘇俊宏','葉思妤','呂承翰','江語彤','何宥辰','羅以晴','高子豪','潘語涵'];
const pad = (n) => String(n).padStart(2, '0');
/* 示範名單的隨機密碼：跟 genPw 同規則（8 碼英文大小寫＋數字），用座號當種子才固定 */
/* 隨機密碼：8 碼，大寫、小寫、數字至少各一，避開 I l O o 0 1（2026-11-03） */
const mkPw = (rnd) => { const U = 'ABCDEFGHJKLMNPQRSTUVWXYZ', Lw = 'abcdefghijkmnpqrstuvwxyz', D = '23456789', all = U + Lw + D, pick = (a) => a[Math.floor(rnd() * a.length)];
  const c = [pick(U), pick(Lw), pick(D), ...Array.from({ length: 5 }, () => pick(all))];
  for (let i = c.length - 1; i > 0; i--) { const k = Math.floor(rnd() * (i + 1)); [c[i], c[k]] = [c[k], c[i]]; } return c.join(''); };
const seedPw = (seed) => { let x = seed * 9301 + 49297; return mkPw(() => { x = (x * 233280 + 1013904223) % 2147483647; return x / 2147483647; }); };
const STUDENTS = NAMES.map((name, i) => ({ seat: i + 1, name, acct: 'xg501' + pad(i + 1), pw: seedPw(501 * 100 + i + 1) }));
const ME = 12;            // 示範用的學生：12 號陳小宇
const LATE = 30;          // 這次示範一直沒登入的人
const ABSENT = [];        // 請假（目前示範沒有人請假）
const NO_SUBMIT = [4, 9, 17, 23, 27];
const TEACHER = '方小明';
const TS = '方老師';
const OTHER_CLASSES = { '502': 30, '503': 29 };
/* 502、503 的名單：管理員一開始就建好的班（示範的上課流程用 501） */
const OTHER_NAMES = {
  '502': ['黃小晴','張小宇','林子涵','陳柏睿','李品萱','王冠霖','吳宜蓁','劉承翰','蔡昀臻','楊子傑','許恩綺','鄭宇恩','謝沛妤','郭彥廷','洪芷晴','曾子睿','邱語彤','廖冠宇','賴品妍','周承恩','徐郁婷','蘇柏宇','葉芷涵','呂宥辰','江姿穎','何宇翔','羅心妍','高子晴','潘柏廷','簡宜庭'],
  '503': ['林小安','陳品叡','黃筱涵','張宸瑋','李沛恩','王語晨','吳承翰','劉芷妍','蔡宇倫','楊芯瑜','許柏宏','鄭可欣','謝宇辰','郭詠晴','洪睿哲','曾雅涵','邱柏均','廖芊妤','賴冠廷','周芷安','徐子恩','蘇映彤','葉承佑','呂若瑜','江宥廷','何羽彤','羅品辰','高語萱','潘思妤'],
};
const OTHER_ROSTER = Object.fromEntries(Object.entries(OTHER_NAMES).map(([c, ns]) => [c, ns.map((name, i) => ({ seat: i + 1, name, acct: `xg${c}${pad(i + 1)}`, pw: seedPw(+c * 100 + i + 1), cls: c }))]));
const nameOf = (seat) => { const r = typeof S !== 'undefined' && S && S.cls ? classRoster(S.cls.live ? S.cls.cid : '501').find((x) => x.seat === seat) : null; return (r || STUDENTS[seat - 1] || { name: `${seat} 號` }).name; };
const COLORS = { teacher: '#D63020', student: '#C2187A', answer: '#5B3FD1', note: '#1A66C2', hi: 'rgba(240,255,98,.55)' };
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
/* 是非題就是只有 O、X 兩個選項的選擇題：作答、分布、公布答案、答對加分都同一套 */
const optLetters = (t) => (t.tf ? ['O', 'X'] : LETTERS.slice(0, t.n || 0));
const typeName = (t) => (t.tf ? '是非題' : TYPE_NAME[t.type]);
const LIMITS = [[0, '不限'], [60, '1 分'], [120, '2 分'], [180, '3 分'], [300, '5 分'], [600, '10 分']]; // 最多 10 分鐘
/* 手寫題「畫在哪」：課本這一頁，或白紙、方格、四線格（底跟白板同一套）。畫畫、寫字都算 */
const PAPERS = [['page', '課本這一頁'], ['blank', '白紙'], ['grid', '方格'], ['en', '四線格']];
const onPaper = (t) => !!(t && t.bg && t.bg !== 'page');
const paperName = (t) => (PAPERS.find(([k]) => k === t.bg) || PAPERS[0])[1];
const whereOf = (t) => (onPaper(t) ? paperName(t) : `p.${PAGES[t.page].nums[0]}`);

/* 科目造型：同編輯器 HomeButton（2026-10-22 五科）。書櫃的科目標題、預設封面用深色，閱讀頁回首頁鈕用淺色 */
const PEBBLE_D = 'M 11.2 3.0 C 12.66 2.81, 14.21 2.81, 15.72 3.0 C 17.23 3.19, 18.73 3.38, 20.24 4.13 C 21.75 4.88, 23.54 6.2, 24.76 7.52 C 25.99 8.84, 26.98 10.53, 27.59 12.04 C 28.2 13.55, 28.62 15.02, 28.43 16.57 C 28.24 18.12, 27.4 19.82, 26.46 21.37 C 25.52 22.92, 24.15 24.62, 22.78 25.89 C 21.41 27.16, 19.77 28.58, 18.26 29.0 C 16.75 29.42, 15.25 28.85, 13.74 28.43 C 12.23 28.01, 10.73 27.5, 9.22 26.46 C 7.71 25.43, 5.64 23.68, 4.7 22.22 C 3.76 20.76, 3.71 19.21, 3.57 17.7 C 3.43 16.19, 3.71 14.72, 3.85 13.17 C 3.99 11.62, 3.89 9.88, 4.41 8.37 C 4.93 6.86, 5.83 5.02, 6.96 4.13 C 8.09 3.23, 9.74 3.19, 11.2 3.0 Z';
const SHAPES = {
  other: { d: PEBBLE_D, w: 32, h: 32, light: '#F0FF62', dark: '#F0FF62' },
  chinese: { d: 'M72.05 77.02C50.63 73.57 26.63 72.79 0 74.69L6.88 0L74.61 0L72.05 77.02Z', w: 74.61, h: 77.02, light: '#FFC2A5', dark: '#FF854A' },
  english: { d: 'M20.02 0.0032267C29.02 0.143227 45.63 9.14323 52.58 16.8832C59.07 23.7732 75.62 30.8532 74.9501 39.9932C74.16 47.4732 56.88 59.5232 46.69 64.0832C37.89 68.5932 27.63 74.5432 22.27 72.5632C14.79 70.7032 5.59005 64.4832 1.55005 53.4332C-0.499952 44.8232 -0.959953 27.0832 2.94005 15.5632C5.13005 8.94323 12.67 -0.196773 20.02 0.0032267Z', w: 74.97, h: 72.95, light: '#FCDD9D', dark: '#F3C11B' },
  science: { d: 'M36.2 0L69.89 12.18L85.32 42.7L67.64 65.74L46.26 80.76L18.93 75.47L0 52.1L9.6 13.77L36.2 0Z', w: 85.32, h: 80.76, light: '#66E497', dark: '#00A36E' },
  social: { d: 'M7.94 60.9C6.13 54.77 3.48 45.25 0 32.37C13.54 19.83 22.73 9.04 27.53 0C38.08 7.32 52.53 10.72 70.89 10.19C71.55 21.14 70.75 34.42 68.5 50.05L42.03 71.5C27.6 67.26 16.24 63.72 7.94 60.9Z', w: 71.11, h: 71.5, light: '#CEA8FF', dark: '#7F6CDF' },
  math: { d: 'M0 29.72L67.64 0L87.9 55.54L41.96 97.11L0 29.72Z', w: 87.9, h: 97.11, light: '#82E6F8', dark: '#03C5E9' },
};
const SUBJECT_SHAPE = { 國語: 'chinese', 國文: 'chinese', 英文: 'english', 英語: 'english', 自然: 'science', 數學: 'math', 國語文: 'chinese', 社會: 'social', 理化: 'science', 生物: 'science', 地科: 'science', 歷史: 'social', 地理: 'social', 公民: 'social', 英語文: 'english', 自然科學: 'science', 數學: 'math', stem: 'science', language: 'chinese' };
const fitShape = (def) => { if (def.w === 32) return ''; const k = 26 / Math.max(def.w, def.h); return `translate(${(32 - def.w * k) / 2} ${(32 - def.h * k) / 2}) scale(${k})`; };
const Pebble = ({ shape = 'other', size = 32, dark }) => { const def = SHAPES[SUBJECT_SHAPE[shape] || shape] || SHAPES.other;
  return html`<svg width=${size} height=${size} viewBox="0 0 32 32" aria-hidden="true"><g transform=${fitShape(def) || undefined}><path d=${def.d} fill=${dark ? def.dark : def.light} /></g></svg>`; };
const subjDef = (subj) => SHAPES[SUBJECT_SHAPE[subj]] || SHAPES.other;
/* 科目標籤：科目淺色底、深色造型，跟書櫃、回首頁鈕同一套科目色 */
const SubjChip = ({ subj }) => { const d = subjDef(subj); return html`<span class="subj-chip" style=${{ '--sc-l': d.light, '--sc-d': d.dark }}>${subj}</span>`; };
/* 沒有封面時：整張鋪科目深色，中間挖出科目形狀透白 */
const SubjectCover = ({ subject }) => { const def = SHAPES[SUBJECT_SHAPE[subject]] || SHAPES.other; const W = 228, H = 283, k = 120 / Math.max(def.w, def.h);
  const t = `translate(${(W - def.w * k) / 2} ${(H - def.h * k) / 2}) scale(${k})`; const id = 'cv-' + (SUBJECT_SHAPE[subject] || 'other');
  return html`<svg width="100%" height="100%" viewBox=${`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><mask id=${id}><rect width=${W} height=${H} fill="white" /><path d=${def.d} transform=${t} fill="black" /></mask></defs><rect width=${W} height=${H} fill="#FFFFFF" /><rect width=${W} height=${H} fill=${def.dark} mask=${`url(#${id})`} /></svg>`; };
const Icon = ({ n, s = 20 }) => html`<svg class="i" width=${s} height=${s} viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML=${{ __html: ICONS[n] || '' }}></svg>`;

/* ───────── 形狀夥伴（取自 Rong 的「形狀夥伴」原型：8 種形狀 × 10 種眼睛） ───────── */
const SH = {
  lime: { name: '叮咚', color: '#E9FF45', w: 165, h: 112, fx: 92, fy: 46, d: 'M10 8 C40 0 140 -4 160 6 C166 30 166 52 160 66 C148 90 132 108 112 108 C92 108 76 92 56 86 C36 80 14 62 6 44 C0 30 2 14 10 8Z' },
  purple: { name: '好奇星', color: '#7A60DE', w: 165, h: 140, fx: 86, fy: 62, d: 'M18 22 C40 6 70 -2 96 2 C124 8 156 12 162 26 C166 38 158 60 150 88 C140 106 126 118 108 124 C90 130 70 140 50 138 C36 136 24 120 14 102 C2 80 -2 40 18 22Z' },
  pink: { name: '抱抱', color: '#FF78C2', w: 144, h: 138, fx: 72, fy: 64, d: 'M35 1 L98 0 L144 41 L130 90 L105 128 L55 138 L9 112 L0 42Z' },
  brown: { name: '樹洞', color: '#8D5A32', w: 125, h: 130, fx: 66, fy: 66, dark: true, d: 'M30 30 C42 10 52 0 68 2 C92 6 120 18 124 36 C128 60 120 84 106 104 C92 120 70 128 46 130 C28 130 20 118 14 100 C6 80 -2 64 4 52 C10 42 22 40 30 30Z' },
  orange: { name: '火花', color: '#FF7738', w: 212, h: 218, fx: 110, fy: 96, d: 'M42 34 C60 4 90 -4 120 4 C150 12 176 24 188 36 C210 54 214 82 210 104 C200 140 150 190 112 214 C80 222 56 200 40 184 C20 164 2 140 0 112 C-2 80 26 60 42 34Z' },
  amber: { name: '小暖', color: '#F8B800', w: 183, h: 160, fx: 94, fy: 72, d: 'M10 30 C30 4 90 -2 128 2 C160 6 172 28 182 70 C190 104 176 126 140 146 C110 162 60 160 36 146 C14 134 6 104 2 80 C-2 56 0 42 10 30Z' },
  cyan: { name: '慢慢', color: '#00BEE6', w: 180, h: 176, fx: 94, fy: 78, d: 'M28 20 C46 6 90 0 112 2 C130 4 142 18 152 28 C172 48 182 90 178 120 C176 150 160 166 132 174 C96 182 50 176 20 158 C0 146 -2 126 4 106 C12 80 14 40 28 20Z' },
  green: { name: '芽芽', color: '#009A5E', w: 104, h: 116, fx: 54, fy: 54, dark: true, d: 'M8 22 C20 4 46 -2 66 6 C88 14 102 32 104 56 C106 80 98 100 78 110 C56 120 30 116 20 98 C8 80 -2 60 0 42 C2 32 4 28 8 22Z' },
};
const ORDER = ['lime', 'purple', 'pink', 'brown', 'orange', 'amber', 'cyan', 'green'];
/* 眼睛照 Rong 原型新版（2026-10-30）：個性跟著形狀走，眼睛只決定長相 */
const EYES = [
  { id: 'big', name: '圓圓眼', desc: '圓滾滾的眼睛，看什麼都新鮮。' },
  { id: 'calm', name: '安心眼', desc: '眼睛彎成兩道小弧線，一臉滿足。' },
  { id: 'half', name: '睏睏眼', desc: '眼皮重重的，好像隨時要睡著。' },
  { id: 'angry', name: '認真眼', desc: '眉頭一壓就很有氣勢。' },
  { id: 'peek', name: '偷瞄眼', desc: '半個眼睛偷偷往旁邊瞄。' },
  { id: 'skeptic', name: '疑問眼', desc: '一眼高一眼低，好像隨時在問「真的嗎？」。' },
  { id: 'focus', name: '專注眼', desc: '眼睛瞇成一條縫，盯著前方不放。' },
  { id: 'happy', name: '笑笑眼', desc: '整天笑咪咪的。' },
  { id: 'tiny', name: '驚訝眼', desc: '小小的瞳孔，好像剛看到什麼大事。' },
  { id: 'flat', name: '慵懶眼', desc: '看起來懶洋洋、隨時想打盹。' },
  { id: 'squint', name: '用力眼', desc: '眼睛擠成 > <，一副用盡全力的樣子。' },
  { id: 'cute', name: '水汪汪眼', desc: '黑眼珠大大的，看起來好無辜。' },
  { id: 'sad', name: '委屈眼', desc: '眼角垂垂的，有點小委屈。' },
  { id: 'xx', name: '暈暈眼', desc: '轉到頭暈，眼睛都變成 ×。' },
  { id: 'side', name: '張望眼', desc: '眼珠溜到一邊，正在東張西望。' },
];
/* 形狀的個性、夥伴在各個時刻說的話，取自 Rong 原型（p.6 改成這本的 p.5） */
const PERSONA = {"amber": {"tag": "默默照亮你的陪伴者", "core": "溫暖鼓勵", "style": "默默鼓勵・溫柔陪伴", "quote": "嘿，你已經很努力了。我們再一起看看吧。"}, "purple": {"tag": "腦袋裡永遠有問號", "core": "好奇探索", "style": "主動提問・愛追問", "quote": "等等！你有沒有想過，為什麼會這樣？"}, "brown": {"tag": "什麼都可以跟我說", "core": "接納與傾聽", "style": "安靜傾聽・溫柔接住", "quote": "沒關係，我們不用急著解決全部。先看看眼前這一步。"}, "pink": {"tag": "肢體語言比話還多", "core": "情感連結", "style": "用動作表達・直接鼓勵", "quote": "先給自己一個大大的抱抱！準備好我們再繼續。"}, "cyan": {"tag": "永遠有自己的節奏", "core": "從容與專注", "style": "安靜等待・慢慢說", "quote": "不用急，我們先做好這一步就好。"}, "green": {"tag": "每天都長出一點新東西", "core": "成長與嘗試", "style": "鼓勵嘗試・陪你長大", "quote": "耶！又多學會一點點了！"}, "orange": {"tag": "想到就先試試看！", "core": "行動與突破", "style": "先試再說・直接鼓勵", "quote": "走！先試一次，遇到問題再想辦法！"}, "lime": {"tag": "靈感隨時突然冒出來", "core": "創意與聯想", "style": "聯想連結・愛舉例子", "quote": "叮咚！我想到一個有趣的連結！你看，它們是不是有點像？"}};
const TALK = {"amber": {"meet": "很高興認識你，我是小暖。我會一直亮著陪你。", "hello": ["celebrating", "你回來啦，今天也慢慢來就好。"], "away": "Zzz… 我幫你留著燈喔", "newBook": "有新書來了，想看的時候我陪你。", "wake": ["celebrating", "你回來了！燈一直都亮著喔。"], "poke": [["idle", "嘿，你已經很努力了。"], ["reading", "上次讀到 p.5，我們再一起看看吧。"], ["encouraging", "有一點點進步，我都看到了。"], ["idle", "看書一陣子了，記得讓眼睛休息一下。"]], "brk": ["下課囉，眼睛休息一下，我在這等你～", "辛苦了，喝口溫水吧。", "今天的你，比昨天多亮了一點點。"]}, "purple": {"meet": "嗨！我是好奇星！你有沒有想過，形狀為什麼長這樣？", "hello": ["celebrating", "你回來了！今天要發現什麼新東西？"], "away": "Zzz… 夢裡還在想問題…", "newBook": "新書耶！你猜裡面藏了什麼？", "wake": ["celebrating", "等等！我剛剛夢到一個問題！"], "poke": [["thinking", "等等！你有沒有想過，為什麼窗戶大多是方的？"], ["reading", "上次的 p.5，你注意到圖片裡的形狀了嗎？"], ["thinking", "如果三角形多一個角，會變成什麼？"], ["celebrating", "我們一起去找答案吧！"]], "brk": ["下課囉！找找看教室裡有幾個圓形？", "休息一下，順便看看窗外有什麼形狀～", "下課了！想到問題記得先存起來喔。"]}, "brown": {"meet": "我是樹洞。什麼都可以跟我說，我會好好聽。", "hello": ["idle", "你回來了。今天想從哪裡開始都可以。"], "away": "Zzz…（樹葉沙沙）", "newBook": "有新書了。不急，想看再看。", "wake": ["idle", "我在這裡，一直都在。"], "poke": [["idle", "沒關係，我們不用急著解決全部。"], ["reading", "上次停在 p.5，先看看眼前這一步。"], ["encouraging", "今天心情還好嗎？不想說也沒關係。"], ["idle", "慢慢來，我陪你。"]], "brk": ["下課了，安靜休息一下吧。", "辛苦了。今天學到的，我都幫你收好了。", "下課囉，讓眼睛和心都放鬆一下。"]}, "pink": {"meet": "我是抱抱！先給你一個大大的抱抱！", "hello": ["celebrating", "你回來了！抱抱～"], "away": "Zzz… 抱著枕頭睡著了", "newBook": "新書！開心到想抱住它！", "wake": ["celebrating", "哇你回來了！先抱一下！"], "poke": [["celebrating", "嘿嘿，被你戳到了～再戳一下！"], ["encouraging", "先給自己一個大大的抱抱！"], ["celebrating", "我最喜歡陪你讀書了！"], ["idle", "準備好了嗎？我們一起加油！"]], "brk": ["下課囉！起來伸個懶腰，像我這樣～", "辛苦了！給你一個下課抱抱！", "下課了，跟同學擊個掌吧！"]}, "cyan": {"meet": "我是慢慢…不用急，我們一步一步來。", "hello": ["idle", "你回來啦…今天也照自己的步調就好。"], "away": "Zzz…（慢慢飄著）", "newBook": "有新書了…想看的時候再說。", "wake": ["idle", "嗯…你回來了…"], "poke": [["idle", "不用急，我們先做好這一步就好。"], ["reading", "上次讀到 p.5…我們慢慢接著看。"], ["idle", "看書累了就停一下，沒關係的。"], ["celebrating", "一點一點來，也會到的。"]], "brk": ["下課了…慢慢休息一下吧。", "深呼吸…吸…吐…", "下課囉，看看遠方的雲吧。"]}, "green": {"meet": "我是芽芽！我們一起每天長大一點點！", "hello": ["celebrating", "你回來了！今天要長出什麼新葉子？"], "away": "Zzz… 在曬太陽", "newBook": "新書來了，又有新的養分了！", "wake": ["celebrating", "醒來啦！又長高了一點點！"], "poke": [["celebrating", "耶！你又多學會一點點了！"], ["reading", "上次讀到 p.5，我們繼續長大吧！"], ["encouraging", "錯了也沒關係，那是養分喔。"], ["idle", "試試看！不試怎麼知道呢？"]], "brk": ["下課囉！去曬曬太陽、喝喝水吧～", "下課了！今天你長出好幾片新葉子喔。", "休息一下，葉子也需要放鬆～"]}, "orange": {"meet": "我是火花！走！先試一次再說！", "hello": ["celebrating", "你回來了！走，今天要挑戰什麼？"], "away": "Zzz… 在充電中", "newBook": "新書！衝啊，先翻開看看！", "wake": ["celebrating", "充電完畢！準備出發！"], "poke": [["celebrating", "走！先試一次，遇到問題再想辦法！"], ["reading", "p.5 還沒結束！衝衝衝！"], ["celebrating", "錯了就再來一次，沒在怕的！"], ["idle", "準備好了嗎？3、2、1！"]], "brk": ["下課囉！起來跳一跳，把電充滿！", "下課了！跑去喝水，衝第一！", "休息一下，等等繼續衝！"]}, "lime": {"meet": "叮咚！我是叮咚，腦袋裡裝滿奇怪的點子！", "hello": ["celebrating", "叮咚！你回來了，我剛好想到一個點子！"], "away": "Zzz… 燈泡關機中", "newBook": "叮咚！新書到了，好多新點子！", "wake": ["celebrating", "叮！燈泡亮了，我醒了！"], "poke": [["celebrating", "叮咚！我想到一個有趣的連結！"], ["thinking", "圓形的窗戶，是不是有點像月亮？"], ["reading", "p.5 的星軌，是不是有點像漩渦？"], ["celebrating", "你看，它們是不是有點像？"]], "brk": ["下課囉！叮咚，休息時間到～", "下課了！想想看，下課鈴聲像什麼形狀？", "叮！眼睛休息模式啟動～"]}};
const RTALK = {"amber": {"right": "答對了，有進步喔。", "wrong": "沒關係，我們再一起看一次。", "draw": "這裡很重要，記起來。", "bonusUp": "這份努力值得被看見。", "task": "有新的任務來囉。", "submit": "交出去了，辛苦了。", "poke": "嘿，你已經很努力了。", "endStart": "下課囉，今天辛苦了。", "moods": {"happy": "你開心，我也暖暖的。", "learned": "每一點進步，我都看見了。", "okay": "還好也很好，今天就到這裡。", "hard": "覺得難沒關係，下次我們再一起看看。", "tired": "辛苦了，好好休息，我幫你留著燈。", "sad": "不開心的時候，我會一直陪著你。"}}, "purple": {"right": "答對了！那你知道為什麼嗎？", "wrong": "等等，你有注意到圖片裡的線索嗎？", "draw": "這句好像藏著答案！", "bonusUp": "哇！發生什麼好事了？", "task": "咦？有新任務！去看看是什麼吧。", "submit": "交出去了！好奇老師會怎麼說？", "poke": "你有沒有想過，為什麼書是長方形的？", "endStart": "下課囉！今天你最想知道的是什麼？", "moods": {"happy": "開心的祕密是什麼？明天告訴我！", "learned": "學到很多！那明天要問什麼新問題？", "okay": "還好嗎？說不定明天會發現好玩的事！", "hard": "難的地方，就是最值得好奇的地方！", "tired": "累了就休息，問題會等我們的。", "sad": "不開心也沒關係，想說的時候我都在。"}}, "brown": {"right": "嗯，答對了。", "wrong": "沒關係。我們先看看眼前這一步。", "draw": "好，我幫你收著。", "bonusUp": "這份肯定，先好好收下。", "task": "有新任務了。", "submit": "交出去了，辛苦了。", "poke": "我在這裡。", "endStart": "下課了。今天過得怎麼樣？", "moods": {"happy": "嗯，開心的事我幫你收好了。", "learned": "學到的，都會留在這裡。", "okay": "還好，也是一種好。", "hard": "難的地方，我們下次一起慢慢看。", "tired": "累了就好好休息，我會在。", "sad": "不開心也沒關係，什麼都可以跟我說。"}}, "pink": {"right": "答對了！來抱抱！", "wrong": "先抱抱自己！再試一次！", "draw": "畫得好！給你一個讚！", "bonusUp": "耶！加分了！", "task": "一起來看看新任務！", "submit": "交出去了！擊個掌！", "poke": "一起加油！", "endStart": "下課囉！今天辛苦了，抱抱！", "moods": {"happy": "太好了！開心到想抱住你！", "learned": "學到好多！給你一個超大抱抱！", "okay": "還好也很棒！抱一下再走！", "hard": "有點難對吧？先抱抱，下次一起加油！", "tired": "累了吧？給你一個軟軟的抱抱。", "sad": "過來，給你一個大大的抱抱。"}}, "cyan": {"right": "嗯…答對了，很好。", "wrong": "沒關係…再看一次就好。", "draw": "嗯…這裡記起來。", "bonusUp": "一步一步來，累積也很棒。", "task": "有新任務…準備好再看就好。", "submit": "交出去了…辛苦了。", "poke": "不用急，我們先做好這一步就好。", "endStart": "下課了…慢慢休息吧。", "moods": {"happy": "開心呀…慢慢享受這種感覺。", "learned": "學到很多呢…慢慢消化就好。", "okay": "還好…就是剛剛好。", "hard": "難的話…下次再慢慢來。", "tired": "累了…那就好好休息吧。", "sad": "不開心的話…我們慢慢來，不急。"}}, "green": {"right": "耶！又長出一片新葉子！", "wrong": "錯了也是養分！再試一次！", "draw": "記下來，就會長大！", "bonusUp": "開花了！你又長大了一點。", "task": "又有新的事情可以探索了。", "submit": "交出去了！種子種下去囉！", "poke": "耶！又多學會一點點了！", "endStart": "下課囉！今天你長大了一點點！", "moods": {"happy": "開心的時候，葉子都亮亮的！", "learned": "哇，今天長出好多新葉子！", "okay": "還好也在長大喔，只是慢一點。", "hard": "難的地方，就是會長最多的地方！", "tired": "累了就曬曬太陽，休息一下。", "sad": "不開心的時候，我們先慢慢澆點水。"}}, "orange": {"right": "耶！一次就中！", "wrong": "沒在怕的！再來一次！", "draw": "畫下去！衝！", "bonusUp": "耶！加分！", "task": "新任務來了！準備好就出發。", "submit": "交出去了！速度第一！", "poke": "走！先試一次！", "endStart": "下課囉！今天衝得很棒！", "moods": {"happy": "太讚了！明天繼續衝！", "learned": "學到超多！火力全開！", "okay": "還好？明天再加把火！", "hard": "有點難？那就是挑戰啊，下次再衝！", "tired": "累了就充電，明天再出發！", "sad": "不開心的時候先停一下，我等你再出發。"}}, "lime": {"right": "叮咚！答對了！還有一個有趣的連結喔！", "wrong": "叮！換個角度想想看？", "draw": "叮！這個跟上一頁有點像！", "bonusUp": "叮咚！解鎖一個彩蛋！", "task": "叮咚！新任務 ♪", "submit": "叮！送出去了！", "poke": "叮咚！我想到一個有趣的連結！", "endStart": "叮咚！下課鈴響囉！", "moods": {"happy": "叮咚！開心就像燈泡一直亮著！", "learned": "叮叮叮！腦袋裝滿新點子了！", "okay": "叮…還好，明天也許會有驚喜！", "hard": "難的東西，換個比喻就簡單了！", "tired": "叮…燈泡要關機充電了。", "sad": "不開心的時候，我幫你想個好玩的事。"}}};
const MOODS = [{"id": "happy", "label": "很開心", "eye": "happy"}, {"id": "learned", "label": "學到很多", "eye": "cute"}, {"id": "okay", "label": "還好", "eye": "flat"}, {"id": "hard", "label": "有點難", "eye": "squint"}, {"id": "tired", "label": "有點累", "eye": "half"}, {"id": "sad", "label": "不開心", "eye": "sad"}];
function eyeEls(type, k, ink, bodyCol) {
  const W = '#fff', B = '#1A1A1A', R = 6.2 * k, gap = 7.4 * k, E = R * 1.18, out = [];
  const L = { stroke: ink, 'stroke-width': 2.6 * k, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none' };
  const poly = (pts) => html`<path d=${'M' + pts.map((q) => q[0].toFixed(2) + ' ' + q[1].toFixed(2)).join(' L') + 'Z'} fill=${bodyCol} />`;
  [-1, 1].forEach((s, i) => {
    const x = s * gap;
    const eye = (cy, pr, px, py, covers) => html`<g><circle cx=${x} cy=${cy} r=${R} fill=${W} /><circle cx=${px} cy=${py} r=${pr} fill=${B} />${covers || null}</g>`;
    const above = (y) => poly([[x - E, y], [x + E, y], [x + E, -E * 2], [x - E, -E * 2]]);
    const below = (y) => poly([[x - E, y], [x + E, y], [x + E, E * 2], [x - E, E * 2]]);
    switch (type) {
      case 'happy': out.push(html`<path d=${`M${x - 4.4 * k} ${2.2 * k} A${4.4 * k} ${4.4 * k} 0 0 1 ${x + 4.4 * k} ${2.2 * k}`} ...${L} />`); break;
      case 'calm': out.push(html`<path d=${`M${x - 4.4 * k} ${-2.2 * k} A${4.4 * k} ${4.4 * k} 0 0 0 ${x + 4.4 * k} ${-2.2 * k}`} ...${L} />`); break;
      case 'flat': out.push(html`<path d=${`M${x - 4.8 * k} 0 L${x + 4.8 * k} 0`} ...${L} stroke-width=${2.8 * k} />`); break;
      case 'squint': out.push(html`<path d=${`M${x + s * 4.4 * k} ${-3.4 * k} L${x - s * 4.4 * k} 0 L${x + s * 4.4 * k} ${3.4 * k}`} ...${L} />`); break;
      case 'xx': out.push(html`<path d=${`M${x - 3.6 * k} ${-3.6 * k} L${x + 3.6 * k} ${3.6 * k} M${x + 3.6 * k} ${-3.6 * k} L${x - 3.6 * k} ${3.6 * k}`} ...${L} />`); break;
      case 'cute': out.push(eye(0, 3.9 * k, x, 0)); break;
      case 'tiny': out.push(eye(0, 2 * k, x, 0)); break;
      case 'side': out.push(eye(0, 3 * k, x - 2.9 * k, .3 * k)); break;
      case 'half': out.push(eye(0, 3 * k, x, -.8 * k, above(-.8 * k))); break;
      case 'peek': out.push(eye(.6 * k, 3 * k, x + 2.2 * k, 2 * k, below(2 * k))); break;
      case 'focus': out.push(eye(0, 3.4 * k, x, 0, [above(-3.2 * k), below(3.2 * k)])); break;
      case 'skeptic': out.push(i === 0 ? eye(1.6 * k, 3 * k, x + k, -.2 * k, above(-.2 * k)) : eye(-1.2 * k, 3 * k, x - 1.6 * k, .5 * k, below(.6 * k))); break;
      case 'angry': out.push(eye(0, 3.1 * k, x - s * .6 * k, .9 * k, poly([[x + s * E, -R * .95], [x - s * E, -R * .12], [x - s * E, -E * 2], [x + s * E, -E * 2]]))); break;
      case 'sad': out.push(eye(0, 3 * k, x, 1.5 * k, poly([[x - s * E, -R * .95], [x + s * E, -R * .12], [x + s * E, -E * 2], [x - s * E, -E * 2]]))); break;
      default: out.push(eye(0, 3.1 * k, x, 0));
    }
  });
  return out;
}
/* 一顆夥伴：box 是外框邊長，形狀依長寬比縮進去 */
function Companion({ shape = 'pink', eye = 'big', box = 60, cls = 'bob', mood }) {
  const S = SH[shape];
  const w = box * S.w / Math.max(S.w, S.h), hgt = w * S.h / S.w;
  const k = Math.min(S.w, S.h) / 62, ink = S.dark ? '#FFFDF6' : '#1A1A1A';
  return html`<svg class=${'comp ' + cls} width=${w} height=${hgt} viewBox=${`0 0 ${S.w} ${S.h}`} aria-hidden="true">
    <path d=${S.d} fill=${S.color} />
    <g transform=${`translate(${S.fx} ${S.fy})`}>${eyeEls(mood || eye, k, ink, S.color)}</g>
  </svg>`;
}
const avatarOf = (seat) => (seat === ME && S.s.avatar ? S.s.avatar : { shape: ORDER[(seat * 5 + 1) % 8], eye: EYES[(seat * 3) % 10].id });
/* 夥伴的反應：說一句話、換眼睛、換動作（照 Rong 原型的開心、安慰、寫筆記、看到新任務） */
const REACT = { celebrating: ['happy', 'jump'], encouraging: ['calm', 'sway'], noting: ['focus', 'nod'], task: ['tiny', 'jump'], idle: [null, 'bob'] };
const line = (k) => RTALK[(S.s.avatar || { shape: 'pink' }).shape][k];
function say(msg, kind = 'celebrating', ms = 2800) {
  if (!S.s.avatar) return;
  const id = Date.now() + Math.random();
  S.s.rx = { msg, kind: REACT[kind] ? kind : 'idle', id };
  later(ms, () => { if (S.s.rx && S.s.rx.id === id) S.s.rx = null; });
}
const Kid = ({ seat, box = 34, cls = '', mood }) => { const a = avatarOf(seat); return html`<${Companion} shape=${a.shape} eye=${a.eye} box=${box} cls=${cls} mood=${mood} />`; };

/* ───────── 種子資料：之前幾堂課的加分、任務 ───────── */
function rng(seed) { let x = seed * 9301 + 49297; return () => { x = (x * 9301 + 49297) % 233280; return x / 233280; }; }
function seedScores(seed) {
  const R = rng(seed), out = {};
  STUDENTS.forEach((s) => { const v = R(); out[s.seat] = v > .78 ? 2 + Math.floor(R() * 2) : v > .45 ? 1 : 0; });
  return out;
}
const TEXT_POOL = ['先找到北斗七星，把勺口兩顆星連起來延長五倍。', '看北邊最亮的那顆星。', '用星座盤對時間和方位。', '找仙后座的 W，再往中間找。', '晚上面向北方，找幾乎不會移動的那顆星。', '先用指北針找到北方，再往天空上面找。', '北斗七星的勺口指向的那顆星就是北極星。', '問爸爸媽媽，或用觀星 App 找。'];
function seedChoice(seed, correct, missing = 3) {
  const R = rng(seed), ans = {};
  STUDENTS.forEach((s) => { if (ABSENT.includes(s.seat) || R() < missing / 29) return; const v = R(); ans[s.seat] = v < .5 ? correct : LETTERS[Math.floor(R() * 4)]; });
  return ans;
}
function seedTexts(seed) {
  const R = rng(seed), out = {};
  STUDENTS.forEach((s) => { if (ABSENT.includes(s.seat) || R() < .12) return; out[s.seat] = TEXT_POOL[Math.floor(R() * TEXT_POOL.length)]; });
  return out;
}

/* ───────── 狀態 ───────── */
const TOOLS = [
  { k: 'pen', label: '畫筆', icon: 'pencil' },
  { k: 'highlighter', label: '螢光筆', icon: 'highlighter' },
  { k: 'laser', label: '雷射筆', icon: 'sun' },
  { k: 'eraser', label: '橡皮擦', icon: 'eraser' },
  { k: 'undo', label: '復原', icon: 'corner-up-left' },
  { k: 'redo', label: '取消復原', icon: 'corner-up-right' }, // 復原、取消復原各自獨立（2026-11-04 乙練）
  { k: 'clear', label: '清除', icon: 'trash' },
  { k: 'board', label: '電子白板', icon: 'presentation' },
  { k: 'compass', label: '圓規', icon: 'drafting-compass' },
  { k: 'protractor', label: '量角器', icon: 'angle' },
  { k: 'sticky', label: '便利貼', icon: 'sticky-note' },
];
const TOOL_CAP = 6;
/* 畫筆用教室和書寫的深色；螢光筆、雷射筆用 Lime 和較亮的淺色。粗細 1–10 px，預設 4 */
/* 畫筆：黑、白，加品牌輔色的深色那一排（Figma 色彩與形狀 7:2：Sun 橘、Forest 綠、Sky 藍、Violet 紫、Russet 咖），最後一格色輪自選 */
const PEN_C = ['#1A1A1A', '#FFFFFF', '#FF854A', '#00A36E', '#03C5E9']; // 咖啡色、紫色拿掉（乙練 2026-10-30）
const hslHex = (h, s, l) => { s /= 100; l /= 100; const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l), f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); return '#' + [f(0), f(8), f(4)].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase(); };
/* 色輪：角度是色相（紅在正上方、順時針），離圓心越遠越鮮豔，圓心是白。按著拖可以一路換 */
function ColorWheel({ onPick }) {
  const pick = (e) => { const r = e.currentTarget.getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2, d = Math.min(1, Math.hypot(x, y) / (r.width / 2));
    onPick(hslHex((Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360, d * 100, 100 - d * 50)); };
  return html`<div class="cw" role="slider" aria-label="色輪" onPointerDown=${(e) => { e.stopPropagation(); e.currentTarget.setPointerCapture(e.pointerId); pick(e); }} onPointerMove=${(e) => { if (e.buttons) pick(e); }}></div>`;
}
const HI_C = ['#F0FF62', '#66E497', '#82E6F8', '#CEA8FF', '#FFB6D3', '#FFC2A5']; // 品牌淺色那一排（Figma 色彩與形狀 7:2） // 照色相排：黃綠→綠→藍→紫→粉→橘
const brushDef = () => ({ pen: { c: PEN_C[0], w: 4 }, highlighter: { c: HI_C[0], w: 4 }, laser: { c: HI_C[0], w: 4 } });
const BRUSHES = ['pen', 'highlighter', 'laser'];
const RAIL_RM = ['laser', 'pen', 'highlighter', 'eraser', 'clear', 'undo', 'redo', 'back', 'task', 'sync', 'supp', 'settings'];
/* 左欄分隔線下面那一段：返回編輯、派任務、補充資源、設定（工具箱固定在最前面，不能拿掉）。都可以收進工具箱再放回來 */
const RAIL_BOTTOM = ['back', 'task', 'sync', 'supp', 'settings'];
const RAIL_ORDER = ['pen', 'highlighter', 'laser', 'eraser', 'clear', 'undo', 'redo', 'back', 'task', 'sync', 'supp', 'settings']; // 計時器只放工具箱，一點就開，不放進左欄（乙練 2026-10-30） // 打開工具箱時可以從左欄拿掉、也可以從工具箱加回來
const toolOf = (k) => TOOLS.find((t) => t.k === k);
function fresh(prevView) {
  const now = new Date();
  return {
    view: prevView || 'admin', chapter: 1, guide: true, // 一打開就在管理員：第一章是管理員的導覽
    admin: {
      shelfTab: 'hall', tab: 'schools', madeSchool: false, madeTeacher: false, made501: false, mode: 'multi', modal: null, filter: '全部', menu: null, q: { schools: '', teachers: '', students: '' },
      pw: '12345678', deleted: [], off: {}, single: { name: '', cls: '', seat: '', acct: '', pw: '' }, // 501 示範學生被刪除、停用的記在這；單筆建立的草稿
      // 假資料：只留兩組，其他讓測試的人自己新建（2026-11-03 乙練：資料要假的）
      schools: [
        { name: '月光示範國中', stage: '國中', type: '學校', students: 0, teachers: 1 },
        { name: '出版社測試帳號', stage: '不限', type: '測試推廣', students: 0, teachers: 1 },
      ],
      teachers: [
        { name: '林志明', email: 'lin@moon.example', school: '月光示範國中', classes: ['701 · 數學'] },
        { name: '測試老師 A', email: 'test-a@test.example', school: '出版社測試帳號', classes: ['501 · 自然'] },
      ],
      others: [],
      draft: { cls: '501', count: 30, prefix: 'xg501', pwMode: 'same', pw: '' }, // 預設全班相同（2026-11-03 乙練定）
    },
    t: { screen: 'shelf', shelfTab: 'hall', menu: false, classes: [], classView: null, page: 0, tool: null, ink: {}, redo: [], rail: ['pen', 'highlighter', 'eraser', 'clear', 'undo', 'redo', 'back', 'task', 'sync', 'supp', 'settings'], brush: brushDef(), inkPop: false, inkY: 260, notes: {}, stickers: {}, sticker: 'star', stickerPop: false, editNote: null, board: null, pop: null, modal: null, scoreMode: 'plus' },
    cls: { live: false, everLive: false, cid: '501', subj: '自然', mode: 'free', joined: [], modeChanged: false, startAt: 0 },
    s: { screen: 'login', pickStep: 1, draft: { shape: null, eye: 'big' }, avatar: null, page: 0, follow: false, toggled: false, inClass: false, invite: false, tool: null, ink: {}, redo: [], rail: ['pen', 'highlighter', 'eraser', 'clear', 'undo', 'redo', 'supp', 'settings'], brush: brushDef(), inkPop: false, inkY: 260, notes: {}, stickers: {}, sticker: 'star', stickerPop: false, editNote: null, board: null, pop: null, modal: null, notice: null, menu: false },
    removed: [],
    ratio: {},
    toolbar: { '501·自然': ['pen', 'highlighter', 'eraser', 'undo', 'redo', 'clear'] }, // 學生預設沒有目次，老師有
    tbDraft: null,
    anonShare: false, // 分享時顯示座號姓名（乙練 2026-10-30）
    sessions: [
      { id: 's4', date: '10/7（三）', time: '10:12', name: '第3課 星星的世界', scores: seedScores(4) },
      { id: 's3', date: '10/5（一）', time: '08:05', name: '', sec: '認識四季星空', secs: ['認識四季星空', '夏季大三角'], scores: seedScores(3) },
      { id: 's2', date: '10/3（五）', time: '13:20', name: '預習 單元一', scores: seedScores(2) },
      { id: 's1', date: '9/30（二）', time: '10:15', name: '', sec: '夜空裡的星座', scores: seedScores(1) },
    ],
    session: null, flash: {}, cheer: null, focus: null, bonusPop: null, profile: null,
    taskLog: [
      { id: 'k5', when: '10/7 10:25', type: 'shot', q: '圈出北斗七星', page: 0, status: 'stopped', subs: Object.fromEntries(STUDENTS.filter((s) => !ABSENT.includes(s.seat) && !NO_SUBMIT.includes(s.seat)).map((s) => [s.seat, { ink: genInk(s.seat, 0), notes: [] }])) },
      { id: 'k4', when: '10/7 10:12', type: 'choice', q: '', n: 4, opts: ['', '', '', ''], correct: 'B', status: 'stopped', answers: seedChoice(7, 'B') },
      { id: 'k3', when: '10/5 08:05', type: 'text', q: '怎麼找北極星', status: 'stopped', texts: seedTexts(5) },
      { id: 'k2', when: '10/3 13:20', type: 'choice', q: '', n: 4, opts: ['', '', '', ''], correct: 'C', status: 'stopped', answers: seedChoice(3, 'C', 1) },
      { id: 'k1', when: '9/30 10:15', type: 'choice', q: '月亮為什麼會有圓缺？', n: 3, opts: ['地球的影子', '太陽照到的部分不同', '月亮自己會發光'], correct: 'B', status: 'stopped', answers: seedChoice(9, 'B', 2) },
    ],
    task: null, compose: null, timer: null, shared: null, drawn: null,
    stn: freshStn(),
    flags: {},
    toasts: { teacher: [], student: [], admin: [] },
    today: `${now.getMonth() + 1}/${now.getDate()}（${'日一二三四五六'[now.getDay()]}）`,
  };
}
let S = fresh();
let timers = [];
let refresh = () => {};
function later(ms, fn) { const id = setTimeout(() => { fn(); refresh(); }, ms); timers.push(id); return id; }
function act(fn) { return (...a) => { fn(...a); refresh(); }; }
let toastSeq = 0;
function toast(side, text, icon) {
  const id = ++toastSeq;
  S.toasts[side] = [...S.toasts[side].slice(-1), { id, text, icon }];
  later(2800, () => { S.toasts[side] = S.toasts[side].filter((t) => t.id !== id); });
}
const clock = () => { const d = new Date(); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
const mmss = (sec) => `${pad(Math.floor(Math.max(0, sec) / 60))}:${pad(Math.max(0, sec) % 60)}`;

/* 班級 */
const roster = () => classRoster(S.cls.live ? S.cls.cid : '501');
const present = () => roster().filter((s) => !ABSENT.includes(s.seat));
const builtRoster = (c) => (S.admin.others || []).filter((o) => o.cls === c && !o.removed).map((o) => ({ seat: o.seat, name: o.name, acct: o.acct, pw: o.pw, cls: c, other: o })).sort((a, b) => a.seat - b.seat);
const classRoster = (c) => (c === '501' ? (S.admin.made501 ? STUDENTS.filter((s) => !S.removed.includes(s.seat) && !S.admin.deleted.includes(s.seat)) : []) : [...(OTHER_ROSTER[c] || []), ...builtRoster(c)]);
const classSize = (c) => classRoster(c).length;
/* 老師能加入的班：501（示範）、502、503（管理員一開始建好的），加上管理員之後建的班（2026-11-11：不再只開放 501） */
const availableClasses = () => [...(S.admin.made501 ? ['501'] : []), ...Object.keys(OTHER_ROSTER), ...[...new Set((S.admin.others || []).map((o) => o.cls).filter(Boolean))].filter((c) => c !== '501' && !OTHER_ROSTER[c])];
const ckey = () => `${S.cls.cid}·${S.cls.subj}`;
const studentTools = () => S.toolbar[ckey()] || S.toolbar['501·自然'];

/* 學生看到哪一頁：跟隨時只跟頁碼，不帶老師的畫記 */
const locked = () => S.s.inClass && S.cls.live && S.cls.mode === 'lock';
const following = () => S.s.inClass && S.cls.live && (S.cls.mode === 'lock' || S.s.follow);
const sPage = () => (following() ? S.t.page : S.s.page);
const answering = (page) => !!(S.s.inClass && S.task && S.task.type === 'shot' && S.task.status === 'collecting' && !onPaper(S.task) && page === S.task.page);
const answeringPaper = () => !!(S.s.inClass && S.task && S.task.type === 'shot' && S.task.status === 'collecting' && onPaper(S.task));
const inkOf = (side, page) => (side === 'student' && answering(page) ? S.task.mine : pgl((side === 'teacher' ? S.t : S.s).ink, (PAGES[page] || PAGES[0]).id));
const myFeedback = () => { const t = S.task; const sub = t && t.type === 'shot' && t.subs[ME]; return sub && sub.notes.length ? sub : null; };

/* ───────── 動作：帳號與班級 ───────── */
const mySchool = () => S.admin.schools.find((x) => x.name === SCHOOL);
function makeSchool() {
  const A = S.admin; if (A.madeSchool) return;
  A.madeSchool = true; A.schools.forEach((x) => { x.fresh = false; });
  A.schools.unshift({ name: SCHOOL, type: '學校', stage: '國小', students: 0, teachers: 0, fresh: true });
  toast('admin', `已建立學校：${SCHOOL}`, 'check');
}
function makeTeacher() {
  const A = S.admin; if (A.madeTeacher) return;
  makeSchool();
  A.madeTeacher = true; A.teachers.forEach((t) => { t.fresh = false; });
  A.teachers.unshift({ name: TEACHER, email: 'fang@star.example', school: SCHOOL, me: true, fresh: true });
  mySchool().teachers += 1;
  toast('admin', `已建立${TS}的帳號`, 'check');
}
function make501() {
  if (S.admin.made501) return;
  makeTeacher();
  S.admin.made501 = true; S.admin.justMade = true;
  const d = S.admin.draft, pw = (d.pw || '').trim(); if (d.pwMode === 'same' && pw) STUDENTS.forEach((x) => { x.pw = pw; }); // 全班相同才換；隨機用名單本來的
  mySchool().students += 30;
  toast('admin', '已建立 501 的 30 個學生帳號', 'check');
}
function joinClass(c, subj) {
  if (S.t.classes.some((x) => x.c === c && x.subj === subj)) return toast('teacher', `已在 ${c} · ${subj}`);
  S.t.classes.push({ c, subj }); S.t.modal = null;
  toast('teacher', `已新增 ${c} · ${subj}`, 'check');
}
function openClass(c, subj, tab = 'students') {
  S.t.screen = 'shelf'; S.t.shelfTab = 'classes';
  S.t.classView = { c, subj, tab, rec: { view: 'index' }, menu: null };
  BRIDGE.goArea('classes');
  if (c === '501') S.flags.classSeen = true;
}
function ensureTeacher() { make501(); S.admin.justMade = false; if (!S.t.classes.some((x) => x.c === '501' && x.subj === '自然')) S.t.classes.push({ c: '501', subj: '自然' }); }
function ensureSetup() {
  make501(); S.admin.justMade = false;
  if (!S.t.classes.some((x) => x.c === '501' && x.subj === '自然')) S.t.classes.push({ c: '501', subj: '自然' });
  if (!S.s.avatar) S.s.avatar = { shape: 'pink', eye: 'happy' };
  if (S.s.screen === 'login' || S.s.screen === 'pick') S.s.screen = 'shelf';
}

/* ───────── 動作：上課 ───────── */
function openBook() { S.t.screen = 'reader'; S.t.page = 0; S.flags.opened = true; S.t.classView = null; BRIDGE.openClassBook(); }
function startClass({ cid, subj, mode }) {
  if (S.t.screen !== 'reader') openBook();
  Object.assign(S.cls, { live: true, everLive: true, cid, subj, mode, joined: [], startAt: Date.now(), book: BRIDGE.bookKey() });
  S.t.modal = null; S.t.barOpen = true; S.t.pop = BAR === 'toolbox' ? 'roster' : null; S.t.scoreMode = 'plus'; // 一開課就展開上課膠囊，名單也預設打開，看得到學生一個個加入（2026-11-03 乙練）
  S.session = { id: 'now', date: S.today, time: clock(), name: '', sec: PAGES[S.t.page].title, scores: {}, live: true, hist: [], seen: {} };
  S.sessions.unshift(S.session);
  toast('teacher', `${cid} · ${subj} 開始上課`);
  present().map((s) => s.seat).filter((n) => n !== ME && n !== LATE).forEach((seat, i) => later(250 + i * 85 + Math.random() * 120, () => { if (S.cls.live && !S.cls.joined.includes(seat)) S.cls.joined.push(seat); }));
  if (S.s.screen !== 'login' && S.s.screen !== 'pick' && !S.s.inClass && cid === '501' && roster().some((x) => x.seat === ME)) S.s.invite = true;
}
function joinStudent() {
  if (!S.cls.live || S.cls.cid !== '501' || !roster().some((x) => x.seat === ME)) return;
  S.s.screen = 'reader'; S.s.inClass = true; S.s.invite = false; S.s.follow = true; S.s.page = S.t.page; S.s.pop = null;
  S.s.rail = [...studentTools(), 'supp', 'settings'];
  if (!S.cls.joined.includes(ME)) S.cls.joined.push(ME);
  toast('student', '已加入課堂', 'check');
}
function studentLogin() {
  if (S.s.screen !== 'login') return;
  if (!S.s.avatar) { S.s.screen = 'pick'; S.s.pickStep = 1; return; }
  if (S.cls.live) joinStudent(); else S.s.screen = 'shelf';
}
function finishPick() {
  S.s.avatar = { shape: S.s.draft.shape || 'pink', eye: S.s.draft.eye || 'big' };
  if (S.cls.live) joinStudent(); else S.s.screen = 'shelf';
  say(TALK[S.s.avatar.shape].meet, 'celebrating', 3400);
}
function setMode(m) {
  if (m === 'lock' && liveT()) return; // 學生作答中不能鎖定
  if (S.cls.mode === m) return;
  S.cls.mode = m; S.cls.modeChanged = true;
  toast('teacher', m === 'lock' ? '已鎖定螢幕' : '已切換自由閱讀');
  if (S.s.inClass) {
    if (m === 'lock') { S.s.pop = null; S.s.tool = null; if (S.s.supp && !S.s.supp.byTeacher) S.s.supp = null; toast('student', '老師鎖定了螢幕', 'lock'); }
    else { S.s.page = S.t.page; toast('student', '可以自由閱讀了', 'check'); }
  }
}
function setFollow(v) {
  if (locked()) return;
  if (!v) S.s.page = S.t.page;
  S.s.follow = v; S.s.toggled = true;
}
/* 下課時整理學生這堂課做了什麼（在 session 收掉之前算） */
function endStats() {
  const live = S.taskLog.filter((t) => t.live);
  return {
    marks: PAGES.reduce((n, pg) => n + pgl(S.s.ink, pg.id).length, 0),
    right: live.filter((t) => t.type === 'choice' && t.correct && t.answers[ME] === t.correct).length,
    sent: live.filter((t) => (t.texts && t.texts[ME]) || (t.subs && t.subs[ME]) || (t.voices && t.voices[ME])).length,
    bonus: S.session ? S.session.scores[ME] || 0 : 0,
  };
}
function toEnd(stats) {
  const s = S.s;
  Object.assign(s, { screen: 'end', end: { ...stats, msgI: 0 }, mood: null, todayBonus: stats.bonus, pop: null, tool: null, supp: null, rx: null });
}
function endToShelf() {
  const s = S.s; s.screen = 'shelf'; s.end = null; S.flags.endBack = true;
  const B = TALK[s.avatar.shape].brk; later(350, () => say(B[Math.floor(Math.random() * B.length)], 'celebrating', 3600));
}
function endClass() {
  const stats = endStats();
  if (S.task && S.task.status !== 'stopped') S.task.status = 'stopped';
  S.cls.live = false; S.shared = null; S.t.pop = null; S.t.barOpen = false; S.timer = null; S.focus = null; S.flags.ended = true;
  if (S.session) { S.session.live = false; S.session = null; }
  toast('teacher', '已下課');
  S.s.invite = false;
  // 學生畫面整頁換成下課回饋（Rong 原型的「下課囉！」）
  if (S.s.inClass) { S.s.inClass = false; S.s.follow = false; S.s.page = S.t.page; S.s.notice = null; S.s.modal = null; toEnd(stats); }
  S.t.supp = null;
}
function ensureLive() {
  ensureSetup();
  if (!S.cls.live) {
    if (S.t.screen !== 'reader') openBook();
    startClass({ cid: '501', subj: '自然', mode: 'free' });
    present().forEach((s) => { if (!S.cls.joined.includes(s.seat) && s.seat !== ME && s.seat !== LATE) S.cls.joined.push(s.seat); });
  }
  if (!S.s.inClass) joinStudent();
}
function turn(side, d) {
  const P = side === 'teacher' ? S.t : S.s;
  if (side === 'student' && following()) { if (locked()) return; S.s.page = S.t.page; S.s.follow = false; S.s.toggled = true; toast('student', '已停止跟隨'); }
  P.page = Math.max(0, Math.min(PAGES.length - 1, P.page + d)); P.redo = [];
  if (side === 'teacher') { S.focus = null; if (S.session && S.cls.live) { const sec = PAGES[P.page].title; S.session.secs = S.session.secs || [S.session.sec]; if (!S.session.secs.includes(sec)) S.session.secs.push(sec); } }
}

/* 計時器 */
function startTimer(sec) {
  S.timer = { total: sec, endAt: Date.now() + sec * 1000, done: false, paused: false, left: sec };
  S.flags.timerUsed = true;
}
const timeLeft = () => { const T = S.timer; if (!T || T.done) return 0; return T.paused ? T.left : Math.max(0, Math.ceil((T.endAt - Date.now()) / 1000)); };
function pauseTimer() { const T = S.timer; if (!T || T.done) return; if (T.paused) { T.endAt = Date.now() + T.left * 1000; T.paused = false; } else { T.left = timeLeft(); T.paused = true; } }
function stopTimer() { S.timer = null; }
function bumpTimer(d) { const T = S.timer; if (!T || T.done) return; const now = timeLeft(); if (now + d < 1) return; T.total = Math.max(T.total + d, now + d); if (T.paused) T.left = now + d; else T.endAt += d * 1000; }
function tickTimer() {
  const T = S.timer; if (!T || T.done || T.paused) return;
  if (Date.now() >= T.endAt) {
    T.done = true; beep(); // 時間到：卡片停在「時間到」，老師按「關閉」才收掉（2026-11-04 乙練選 A）
    const k = S.task;
    if (T.taskId && k && k.id === T.taskId && k.status === 'collecting') {
      if (k.type === 'choice') closeAnswer(); else stopTask();
      S.t.pop = 'task'; S.t.tool = null; S.timer = null; // 時間到直接打開任務彈窗看結果（2026-11-03 乙練）；任務的倒數跟著收掉
      toast('teacher', '時間到');
    }
  }
}
/* 時間到的提示音：三聲泡泡「啵啵啵」再一聲「叮咚」（乙練選 音效/C_泡泡叮咚，要大聲一點；2026-11-04） */
function beep() {
  try { const A = new (window.AudioContext || window.webkitAudioContext)(), out = A.createGain(); out.gain.value = .9; out.connect(A.destination);
    [[0, 400, 1200], [.15, 500, 1500], [.3, 600, 1800]].forEach(([t, f0, f1]) => { const o = A.createOscillator(), g = A.createGain(), at = A.currentTime + t;
      o.type = 'sine'; o.frequency.setValueAtTime(f0, at); o.frequency.linearRampToValueAtTime(f1, at + .12); g.gain.setValueAtTime(.0001, at); g.gain.exponentialRampToValueAtTime(.8, at + .004); g.gain.exponentialRampToValueAtTime(.0001, at + .14);
      o.connect(g); g.connect(out); o.start(at); o.stop(at + .16); });
    [[2093, 5], [1568, 6]].forEach(([f, dk]) => [[1, .5], [4, .12], [10, .03]].forEach(([k, v]) => { const o = A.createOscillator(), g = A.createGain(), at = A.currentTime + .5, len = 4.6 / dk;
      o.type = 'sine'; o.frequency.value = f * k; g.gain.setValueAtTime(.0001, at); g.gain.exponentialRampToValueAtTime(v, at + .004); g.gain.exponentialRampToValueAtTime(.0001, at + len);
      o.connect(g); g.connect(out); o.start(at); o.stop(at + len + .05); })); } catch (e) {}
}

/* ───────── 補充資源（同編輯器閱讀模式的補充資源面板，內容照《自然科學 5下》第 2、5 頁） ─────────
   同步規則（2026-10-28 定）：鎖定螢幕時老師打開哪一則，學生畫面跟著打開；自由閱讀各看各的，學生自己點開的老師看不到。聲音不同步 */
const SUPP = {
  p108: [
    { g: '晴朗的夜晚抬頭往天空看，可以看到…', items: [
      { id: 'what', k: 'text', t: '什麼是星座？', body: '國際天文聯合會把整片天空劃分成 88 個星座，天上的每一顆星都屬於其中一個。同一個星座裡的星星看起來靠在一起，其實離我們的距離可能差很多。' },
      { id: 'mag', k: 'text', t: '星座和星等不一樣', body: '星座是天空的分區，星等是星星有多亮。數字越小越亮，最亮的星甚至是負的星等。' }] },
    { g: '圖：圖 1 夏季大三角', items: [
      { id: 'orion', k: 'image', t: '把星星連起來：獵戶座', src: 'assets/orion-lines.jpg' },
      { id: 'chart', k: 'image', t: '古人畫的星座圖（1824 年）', src: 'assets/star-chart.jpg' }] },
    { g: '夏天的夜晚，我們可以找到明亮的「…', items: [
      { id: 'tam', k: 'web', t: '臺北市立天文科學教育館', url: 'https://www.tam.gov.taipei/' },
      /* 維基百科可以內嵌、天文館不行（同編輯器的示範）。Artifact 不能內嵌別的網站，這裡用網頁截圖代替 */
      { id: 'wiki', k: 'web', t: '維基百科：夏季大三角', url: 'https://zh.wikipedia.org/zh-tw/夏季大三角', embed: true, shot: 'assets/wiki-summer-triangle.jpg' }] },
  ],
  p110: [
    { g: '星星為什麼會動', items: [{ id: 'vega', k: 'audio', t: '三顆主角星', src: 'assets/vega.mp3' }] },
    { g: '同一個晚上，星星的位置會慢慢由東…', items: [{ id: 'tri', k: 'image', t: '夏季大三角', src: 'assets/summer-triangle.jpg' }] },
    { g: '圖：圖 2 北方天空的星軌', items: [{ id: 'trails', k: 'video', t: '星軌縮時', src: 'assets/star-trails.jpg' }] },
  ],
};
/* 每一組補充資源掛在課文的哪一塊（熊熊給的資料：哪一頁、掛在哪個元件上） */
/* 課文裡直接掛資源的詞：點了直接打開，同時聚焦它所在的段落（乙練選 A） */
const KW_RES = { 星座: 'what', 地球自轉: 'tri' };
const SUPP_BLK = { p108: ['p1', 'fig', 'p2'], p110: ['h', 'p1', 'fig'] };
const blkRes = (page, blk) => { const pid = PAGES[page] && PAGES[page].id, i = (SUPP_BLK[pid] || []).indexOf(blk); return i < 0 ? [] : SUPP[pid][i].items; };
const RES_IC = { text: 'file-text', image: 'image', audio: 'play', video: 'play', web: 'globe' };
const suppItems = (page) => SUPP[PAGES[page].id].flatMap((g) => g.items);
const suppById = (id) => Object.values(SUPP).flat().flatMap((g) => g.items).find((x) => x.id === id);
let suppAudio = null;
function openSupp(side, it) {
  const P = side === 'teacher' ? S.t : S.s;
  if (it.k === 'audio') {
    if (suppAudio) suppAudio.pause();
    if (P.playing === it.id) { P.playing = null; suppAudio = null; return; }
    S.t.playing = null; S.s.playing = null; P.playing = it.id;
    suppAudio = new Audio(it.src); suppAudio.onended = () => { P.playing = null; refresh(); }; suppAudio.play().catch(() => {});
    return;
  }
  P.supp = it;
  if (side === 'teacher' && S.cls.live && S.cls.mode === 'lock' && S.s.inClass) { S.s.supp = { ...it, byTeacher: true }; S.flags.suppSynced = true; }
  if (side === 'student') S.flags.sSuppOpened = true;
}
function closeSupp(side) {
  const P = side === 'teacher' ? S.t : S.s;
  P.supp = null;
  if (side === 'teacher' && S.s.supp && S.s.supp.byTeacher) S.s.supp = null;
}

/* 加分：模式切換＋連點頭像，每點一下自動存進這一堂 */
/* 加分的小煙火：從按的地方噴出幾顆品牌色的幾何形狀（圓、三角、方、鵝卵石），飛一下就淡掉 */
const BURST_C = ['#F0FF62', '#FF854A', '#00A36E', '#03C5E9', '#7F6CDF', '#FF87C7', '#F3C11B'];
function burst(el) {
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const stage = el.closest('.stage'); if (!stage) return;
  const sr = stage.getBoundingClientRect(), r = el.getBoundingClientRect(), k = 1440 / sr.width;
  const cx = (r.left + r.width / 2 - sr.left) * k, cy = (r.top + r.height / 2 - sr.top) * k;
  const kinds = ['c', 'tri', 'sq', 'peb'];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + Math.random() * .4, d = 46 + Math.random() * 46, sz = 9 + Math.random() * 9;
    const b = document.createElement('i');
    b.className = 'bz ' + kinds[i % 4];
    b.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;background:${BURST_C[i % BURST_C.length]};--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d - 18}px;--r:${(Math.random() - .5) * 360}deg`;
    stage.appendChild(b); setTimeout(() => b.remove(), 800);
  }
}
/* 整組加分：每一位的格子依序彈一下、噴形狀 */
function burstSeats(list) {
  list.forEach((x, i) => setTimeout(() => document.querySelectorAll(`[data-seat="${x}"]`).forEach((el) => { burst(el); el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }), 60 + i * 45));
}
function bonus(seat, d, rec = true) {
  if (!S.session) return false;
  const cur = S.session.scores[seat] || 0;
  S.session.scores[seat] = cur + d;
  if (d > 0) S.session.seen[seat] = true;
  if (rec) S.session.hist.push([[seat, d]]);
  S.flash[seat] = { d, id: Date.now() + Math.random() };
  const f = S.flash[seat]; later(1000, () => { if (S.flash[seat] === f) delete S.flash[seat]; });
  if (seat === ME) S.flags.meScored = true;
  if (d < 0) S.flags.minusUsed = true;
  // 扣分時學生端不跳提示
  if (seat === ME && d > 0 && S.s.inClass) {
    const id = Date.now(); S.bonusPop = { d, id };
    later(2600, () => { if (S.bonusPop && S.bonusPop.id === id) S.bonusPop = null; });
    say(line('bonusUp'), 'celebrating', 3200);
  }
  return true;
}
function classBonus(d) {
  S.t.scoreMode = d > 0 ? 'plus' : 'minus';
  const got = S.cls.joined.filter((x) => bonus(x, d, false));
  S.session.hist.push(got.map((x) => [x, d]));
  S.bonusPop = null; // 全班加分只放大家聚集的動畫，不再跳個人提示
  if (d > 0) S.flags.classBonus = true;
  const id = Date.now(); S.cheer = { d, id };
  later(3200, () => { if (S.cheer && S.cheer.id === id) S.cheer = null; });
}
function undoScore() {
  const last = S.session && S.session.hist.pop();
  if (!last) return;
  last.forEach(([seat, d]) => { S.session.scores[seat] = (S.session.scores[seat] || 0) - d; });
  S.bonusPop = null; S.cheer = null;
  S.flags.undoUsed = true;
}
const scoreOf = (seat) => (S.session ? S.session.scores[seat] || 0 : 0);

/* ───────── 任務：選擇題、文字題、手寫題 ───────── */
function sendTask(type, draft = {}) {
  if (S.task && S.task.status !== 'stopped') S.task.status = 'stopped';
  const d = new Date();
  const task = {
    id: 't' + Date.now(), when: `${d.getMonth() + 1}/${d.getDate()} ${clock()}`, type, q: draft.q || '', status: 'collecting', at: Date.now(), view: null,
    bg: type === 'shot' ? draft.bg || 'page' : undefined, withPage: type === 'shot' && (draft.bg || 'page') !== 'page' && draft.withPage !== false, voices: {}, tf: !!draft.tf, n: draft.tf ? 2 : draft.n || 4, opts: (draft.opts || ['', '', '', '', '', '']).slice(0, draft.n || 4), correct: null, answers: {}, texts: {}, subs: {}, mine: [], page: S.t.page, plusDone: false, live: true,
  };
  if (S.cls.mode === 'lock') setMode('free'); // 派任務時學生要能作答：一律解除鎖定（2026-11-03 乙練）
  S.task = task; S.taskLog.unshift(task); S.compose = null; S.t.pop = 'task'; S.drawn = null;
  // 時限＝計時器：同一時間只有一個倒數。有時限就開計時器並綁這一題；沒時限時，上一題留下的倒數收掉
  task.limit = draft.limit || 0;
  if (task.limit) { startTimer(task.limit); S.timer.taskId = task.id; } else if (S.timer && S.timer.taskId) S.timer = null;
  toast('teacher', `已派出${type === 'choice' ? typeName(task) : type === 'text' ? '文字題' : type === 'voice' ? '聲音題' : `手寫題（${whereOf(task)}）`}`);
  // 畫在紙上的手寫題：紙直接打開（跟選擇題的作答視窗一樣），不另外跳通知
  // 派出就直接送到學生畫面：選擇／文字／聲音題打開作答視窗；手寫題直接翻到那一頁、拿起畫筆（或打開紙），不另外跳通知要學生按
  if (S.s.inClass) {
    S.s.notice = null; S.s.paperHidden = false; S.s.peekQ = false; S.s.pop = null;
    if (type !== 'shot') S.s.modal = type;
    else { if (!onPaper(task) && !locked()) { S.s.page = task.page; } S.s.tool = 'pen'; }
  }
  S.flags[type + 'Sent'] = true;
  const pool = present().map((s) => s.seat).filter((n) => n !== ME && !NO_SUBMIT.includes(n)).sort(() => Math.random() - 0.5);
  pool.forEach((seat, i) => later((type === 'choice' ? 500 + i * 180 : 1400 + i * 520) + Math.random() * 400, () => {
    if (S.task !== task || task.status !== 'collecting') return;
    if (type === 'choice') { const L = optLetters(task), v = Math.random(); task.answers[seat] = v < .5 ? L[task.tf ? 0 : 1] : L[Math.floor(Math.random() * L.length)]; }
    else if (type === 'text') task.texts[seat] = TEXT_POOL[Math.floor(Math.random() * TEXT_POOL.length)];
    else if (type === 'voice') task.voices[seat] = { sec: 4 + Math.floor(Math.random() * 14), at: Date.now() };
    else task.subs[seat] = { ink: genInk(seat, task.page), notes: [], at: Date.now() };
    task.lastAt = Date.now();
  }));
}
function answerChoice(letter) {
  const t = S.task; if (!t || t.type !== 'choice' || t.status !== 'collecting') return;
  t.answers[ME] = letter; S.s.notice = null; S.flags.choiceAnswered = true;
  toast('teacher', '12 陳小宇已作答');
}
function closeAnswer() {
  const t = S.task; if (!t || t.status !== 'collecting') return;
  t.status = 'closed'; S.flags.choiceClosed = true;
  if (S.timer && S.timer.taskId === t.id && !S.timer.done) S.timer = null;
  toast('teacher', '已結束作答');
  if (S.s.inClass && S.s.modal === 'choice') S.s.modal = null;
}
function reveal(letter) {
  const t = S.task; if (!t) return;
  t.correct = letter; t.status = 'revealed'; S.flags.revealed = true; t.tab = 'dist';
  toast('teacher', `已公布答案 ${letter}`);
  if (S.s.inClass) { S.s.modal = 'result'; S.s.notice = null; }
}
/* 公布答案後，給目前這組（答對／答錯／沒作答）每人 +1；每組只能加一次 */
function plusGroup(t, key, seats, d = 1) {
  if (!t.plused) t.plused = {};
  if (!seats.length) return; // 可以加很多次
  seats.forEach((seat) => bonus(seat, d, false));
  S.session && S.session.hist.push(seats.map((x) => [x, d]));
  t.plused[key] = (t.plused[key] || 0) + 1;
  t.gave = { ...(t.gave || {}) }; seats.forEach((x) => { t.gave[x] = (t.gave[x] || 0) + d; }); // 這一題每個人加減了幾分（含整組）
  if (key === 'right' && d > 0) { t.plusDone = seats.length; S.flags.plusRight = true; }
  toast('teacher', `${{ right: '答對', wrong: '答錯', none: '沒作答', answered: '有作答' }[key]} ${seats.length} 人 ${d > 0 ? '+1' : '−1'}`);
}
/* 檢討時幫一個人加減分：跟名單同一個「加分／扣分」模式（S.t.scoreMode），老師先選模式再點座號（2026-11-03 乙練） */
function rvScore(t, seat, el, force) {
  const d = force || (S.t.scoreMode === 'minus' ? -1 : 1);
  if (d > 0) burst(el);
  bonus(seat, d); t.gave = { ...(t.gave || {}), [seat]: ((t.gave || {})[seat] || 0) + d };
}
/* 座號圓圈＋這一題的分數徽章，徽章樣式跟名單的頭像一樣（平常黃底黑字、剛加黑底黃字、扣分紅） */
function SeatSc({ t, seat }) {
  const n = (t.gave || {})[seat] || 0, f = S.flash[seat], sad = f && f.d < 0;
  if (!n && !f) return null;
  return html`<b class=${'sk-sc' + (n < 0 ? ' down' : '') + (f ? ' bump' + (sad ? ' minus' : '') : '')} key=${f ? 'f' + f.id : 'n'}>${f ? (sad ? '−1' : '+1') : n > 0 ? '+' + n : '−' + -n}</b>`;
}
/* 被加減過分就露出形狀夥伴（跟名單一樣）：加分跳一下、扣分沉一下 */
const kidCls = (t, seat) => (((t.gave || {})[seat] || 0) !== 0 ? ' has-kid' : '');
function SeatFace({ t, seat, box }) {
  if (!kidCls(t, seat)) return pad(seat);
  const f = S.flash[seat], sad = f && f.d < 0, n = (t.gave || {})[seat] || 0;
  return html`<span class="kid-in" key="kid"><${Kid} seat=${seat} box=${box} cls=${f ? (sad ? 'sink' : 'jump') : ''} mood=${sad || n < 0 ? 'sad' : undefined} key=${f ? 'k' + f.id : 'k'} /></span>`;
}
const gotCls = (t, seat) => { const n = (t.gave || {})[seat] || 0; return n > 0 ? ' got' : n < 0 ? ' lost' : ''; };
/* 可以點的座號：點了照目前模式加減一分（放在卡片裡時不打開作品） */
function SeatBtn({ t, seat, cls = 'seat' }) {
  return html`<span role="button" tabindex="0" class=${cls + ' sk-seat' + gotCls(t, seat) + kidCls(t, seat) + (S.t.scoreMode === 'minus' ? ' m' : '')} title=${`幫 ${nameOf(seat)} ${S.t.scoreMode === 'minus' ? '扣' : '加'} 1 分`} onClick=${act((e) => { e.stopPropagation(); rvScore(t, seat, e.currentTarget); })}><${SeatFace} t=${t} seat=${seat} box=${cls === 'shot-no' ? 42 : 36} /><${SeatSc} t=${t} seat=${seat} /></span>`;
}
/* 加分／扣分切換：名單和檢討共用同一顆 */
function ScoreMode() {
  const hint = useHint(), minus = S.t.scoreMode === 'minus';
  return html`<div class="pill-seg rv-mode" role="group" aria-label="加分或扣分">
    <button class=${(!minus ? 'on ' : '') + hint('t-plus')} aria-pressed=${!minus} onClick=${act(() => { S.t.scoreMode = 'plus'; })}>加分</button>
    <button class=${(minus ? 'on ' : '') + hint('t-minus')} aria-pressed=${minus} onClick=${act(() => { S.t.scoreMode = 'minus'; })}>扣分</button></div>`;
}
/* 放大看一份作答時的「這是誰」：‹ 座號 名字 3/3 › 合成一顆，座號點了就加減分（2026-11-03 乙練：這條要更簡潔） */
/* 放大看一份作答的下方列（2026-11-04 乙練選 A）：「這是誰」（夥伴＋名字，加過分掛小黃章）｜換人 ‹ 5/25 ›｜右邊才是動作（+1 框線、分享畫面）。
   黃色只代表「已經加的分」，按鈕用框線，才不會以為已經加過 */
function WhoNav({ t, seat, idx, n, go, score = true }) {
  const g = (t.gave || {})[seat] || 0;
  return html`<span class="vsep dt-sep"></span><span class="who-id"><span class=${'who-face' + kidCls(t, seat)}><${SeatFace} t=${t} seat=${seat} box=${34} /></span><b>${nameOf(seat)}</b>${score && g !== 0 && html`<span class=${'who-got' + (g < 0 ? ' neg' : '')} key=${'g' + g}>${g > 0 ? '+' + g : '−' + -g}</span>`}</span>
    <span class="who-nav"><button aria-label="上一位" disabled=${idx <= 0} onClick=${act(() => go(idx - 1))}><${Icon} n="chevron-left" s=${18} /></button><small>${idx + 1} / ${n}</small><button aria-label="下一位" disabled=${idx >= n - 1} onClick=${act(() => go(idx + 1))}><${Icon} n="chevron-right" s=${18} /></button></span>`;
}
const WhoPlus = ({ t, seat }) => html`<button class="btn sm who-plus" aria-label=${`幫 ${nameOf(seat)} 加 1 分`} onClick=${act((e) => rvScore(t, seat, e.currentTarget, 1))}>+1</button>`;
function plusRight() {
  const t = S.task; if (!t || t.plusDone) return;
  const right = Object.entries(t.answers).filter(([, v]) => v === t.correct).map(([k]) => +k);
  right.forEach((seat) => bonus(seat, 1));
  t.gave = { ...(t.gave || {}) }; right.forEach((x) => { t.gave[x] = (t.gave[x] || 0) + 1; });
  t.plusDone = right.length; S.flags.plusRight = true;
  toast('teacher', `答對 ${right.length} 人 +1`);
}
function submitText(txt) {
  const t = S.task; if (!t || t.type !== 'text' || t.status !== 'collecting') return;
  const again = !!t.texts[ME];
  t.texts[ME] = txt; S.s.notice = null; S.flags.textAnswered = true; say(line('submit'), 'celebrating', 2600);
  toast('teacher', `12 陳小宇${again ? '重新' : '已'}回傳文字`);
}
/* 聲音題：示範不開麥克風，錄音是模擬的（只記秒數，播放用示範音檔） */
function submitVoice(sec) {
  const t = S.task; if (!t || t.type !== 'voice' || t.status !== 'collecting') return;
  const again = !!t.voices[ME];
  t.voices[ME] = { sec, at: Date.now(), mine: true }; S.s.notice = null; S.s.modal = null; S.flags.voiceAnswered = true;
  toast('teacher', `12 陳小宇${again ? '重新' : '已'}送出錄音`);
  say(line('submit'), 'celebrating', 2600);
}
let voiceAudio = null;
/* 播放進度 0～1：示範錄音檔長度和題目寫的秒數不同，用比例換算，進度條和秒數才會一起走完 */
const voiceFrac = () => { const a = voiceAudio; return a && a.duration ? Math.min(1, a.currentTime / a.duration) : 0; };
function playVoice(key) {
  if (voiceAudio) voiceAudio.pause();
  if (S.playingVoice === key) { S.playingVoice = null; voiceAudio = null; return; }
  S.playingVoice = key; voiceAudio = new Audio('assets/vega.mp3');
  voiceAudio.ontimeupdate = () => refresh(); // 播放膠囊裡的進度條跟著跑
  voiceAudio.onended = () => { S.playingVoice = null; refresh(); }; voiceAudio.play().catch(() => {});
}
function submit() {
  const t = S.task; if (!t || t.type !== 'shot' || t.status !== 'collecting') return;
  const prev = t.subs[ME];
  // 交出去的是這一頁的整個畫面：學生原本在這頁的畫記＋這次作答畫的（畫在紙上就只有紙上那些）
  const pageInk = onPaper(t) ? [] : pgl(S.s.ink, PAGES[t.page].id);
  t.subs[ME] = { ink: JSON.parse(JSON.stringify([...pageInk, ...t.mine])), notes: prev?.notes || [], at: Date.now(), mine: true }; S.flags.shotSubmitted = true;
  S.s.modal = null; S.s.notice = null; say(line('submit'), 'celebrating', 2600);
  toast('teacher', `12 陳小宇${prev ? '重新' : '已'}送出畫面`);
}
function stopTask() {
  const t = S.task; if (!t) return;
  t.status = 'stopped'; S.shared = null; S.flags[t.type + 'Stopped'] = true;
  if (S.timer && S.timer.taskId === t.id && !S.timer.done) S.timer = null;
  toast('teacher', '已結束作答');
  if (S.s.inClass) {
    S.s.modal = null;
    S.s.notice = null; // 作答結束、有回饋都只顯示在上方任務列，不跳通知
  }
}
function endTask() { if (S.task && S.task.status !== 'stopped') S.task.status = 'stopped'; S.task = null; S.t.pop = 'task'; S.compose = null; S.drawn = null; if (S.s.modal !== 'feedback') S.s.modal = null; S.s.notice = null; }
function openDetail(seat) { if (!S.task) return; S.task.view = seat; S.flags.detailSeen = true; S.t.tool = null; }
function share(seat) {
  S.shared = { seat, anon: S.anonShare }; S.flags.sharedOnce = true;
  toast('teacher', '已分享畫面');
}
function unshare() { S.shared = null; toast('teacher', '已停止分享'); }
/* 抽籤：先在名單上快速跳幾下、越跳越慢，停下來那位彈一下、亮 Lime（像輪盤） */
function draw(pool, side = 'teacher') {
  if (!pool.length) return toast(side, '這一組沒有人可以抽');
  if (S.drawing) return;
  const seat = pool[Math.floor(Math.random() * pool.length)];
  S.drawing = true; S.drawDone = false; S.drawn = null;
  // 跳動只換 DOM 上的 class，不整個重畫（手寫題一格一張課本縮圖，重畫 14 次會卡）；停下來才更新狀態
  const hop = (x) => { document.querySelectorAll('[data-seat].hop').forEach((el) => el.classList.remove('hop')); if (x != null) document.querySelectorAll(`[data-seat="${x}"]`).forEach((el) => { el.classList.add('hop'); el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }); };
  let t = 0, prev = null;
  for (let i = 0; i < 14; i++) {
    t += 50 + i * i * 2.2;
    const last = i === 13;
    const pick = last ? seat : (() => { let x; do { x = pool[Math.floor(Math.random() * pool.length)]; } while (pool.length > 1 && x === prev); prev = x; return x; })();
    const id = setTimeout(() => { if (!last) return hop(pick); hop(null); S.drawn = seat; S.drawing = false; S.drawDone = true; toast(side, `抽到 ${pad(seat)} ${nameOf(seat)}`, 'dice'); refresh(); setTimeout(() => document.querySelector(`[data-seat="${seat}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 30); }, t);
    timers.push(id);
  }
  refresh();
}
const drawnCls = (x) => (S.drawn === x ? ' drawn' + (S.drawDone ? ' final' : '') : '');
function autoAnswer() {
  const t = S.task; if (!t) return;
  if (S.s.inClass && !locked() && !onPaper(t)) { S.s.page = t.page; S.s.follow = false; }
  t.mine.push(...genInk(ME, t.page, true));
}

/* 範例筆跡：每位同學在跨頁上圈標題、畫底線、連出北斗七星、標出星星移動方向 */
/* 範例筆跡的位置（頁寬 1000 的座標）：標題、重點詞、照片上的三顆星、表格每一列 */
function genInk(seat, page, mine) {
  const R = rng(seat * 7 + page * 13 + (mine ? 5 : 0));
  const j = (v, a) => v + (R() - 0.5) * a;
  const color = COLORS.student;
  const out = [];
  if (page === 0) {
    const kinds = mine ? [0, 2] : [0, 1, 2, 3].filter(() => R() > 0.4);
    if (!kinds.length) kinds.push(Math.floor(R() * 4));
    for (const k of kinds) {
      if (k === 0) { const cx = j(INK.h2[0], 4), cy = j(INK.h2[1], 3), rx = j(INK.h2[2], 6), ry = j(INK.h2[3], 3); const pts = [];
        for (let a = -0.3; a < Math.PI * 2.15; a += 0.18) pts.push([cx + Math.cos(a) * rx * (1 + (R() - .5) * .04), cy + Math.sin(a) * ry * (1 + (R() - .5) * .06)]);
        out.push({ c: color, w: 4, pts }); }
      if (k === 1) { const [x0, x1, y] = INK.kw; const pts = []; for (let x = x0; x <= x1; x += 6) pts.push([x, j(y, 1.5)]); out.push({ c: color, w: 4, pts }); }
      if (k === 2) { const tri = INK.tri.map(([x, y]) => [j(x, 6), j(y, 6)]); const pts = []; [0, 1, 2].forEach((i) => { const [a, b] = [tri[i], tri[(i + 1) % 3]]; for (let t = 0; t < 1; t += .1) pts.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); }); pts.push(tri[0]); out.push({ c: '#FFF04D', w: 4, pts }); }
      if (k === 3) { const [x0, x1, y] = INK.kw3; const pts = []; for (let x = x0; x <= x1; x += 6) pts.push([x, j(y, 1.5)]); out.push({ c: color, w: 4, pts }); }
    }
  } else { const [x0, x1, y] = INK.kw2; const pts = []; for (let x = x0; x <= x1; x += 6) pts.push([x, j(y, 1.5)]); out.push({ c: color, w: 4, pts }); }
  return out;
}

/* ───────── 筆跡 ───────── */
function pathD(pts) {
  if (!pts.length) return '';
  if (pts.length < 3) return 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) { const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2; d += ` Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`; }
  const L = pts[pts.length - 1]; d += ` L${L[0].toFixed(1)} ${L[1].toFixed(1)}`;
  return d;
}
const Strokes = ({ list = [] }) => list.map((s) => html`<path d=${pathD(s.pts)} stroke=${s.c} stroke-width=${s.w} fill="none" stroke-linecap="round" stroke-linejoin="round" />`);
function InkSvg({ page, layers }) { return html`<svg class="ink" viewBox=${`0 0 1000 ${ph(page)}`} preserveAspectRatio="xMinYMin meet">${layers.map((l) => html`<${Strokes} list=${l} />`)}</svg>`; }
const hexA = (h, a) => `rgba(${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)},${a})`;
const circlePts = (c, r) => Array.from({ length: 73 }, (_, i) => [c[0] + r * Math.cos((i / 72) * Math.PI * 2), c[1] + r * Math.sin((i / 72) * Math.PI * 2)]);
const strokeOf = (tool, brush, color, pts) => (tool === 'highlighter' ? { c: hexA(brush.c, .5), w: brush.w * 4, pts } : { c: color || brush.c, w: brush.w * (tool === 'laser' ? 1.5 : 1), pts });
const ERASER_CUR = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" fill="#fff"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>')}") 4 20, crosshair`; // 跟左欄「橡皮擦」同一個圖示（Lucide eraser），比例不變
/* 畫的那一層：筆的顏色粗細照設定；橡皮擦拉框，框裡碰到的筆跡清掉（點一下只擦一筆）；雷射筆畫完 1.4 秒淡掉，不留下來 */
function DrawLayer({ page, tool, brush, color, onStroke, onErase, onEraseRect, onPlace, vbh }) {
  const [cur, setCur] = useState(null);
  const [lasers, setLasers] = useState([]);
  const ref = useRef();
  const pt = (e) => { const r = ref.current.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 1000, (e.clientY - r.top) / r.width * 1000]; };
  if (!tool && !lasers.length) return null;
  const b = brush || { c: '#1A1A1A', w: 4 };
  const down = (e) => { e.preventDefault(); const p = pt(e); if (tool === 'sticker') { onPlace && onPlace(p); return; } ref.current.setPointerCapture(e.pointerId); if (tool === 'compass') { setCur({ c: p, r: 0 }); return; } if (tool === 'eraser') setCur({ rect: [p[0], p[1], p[0], p[1]] }); else setCur({ pts: [p] }); };
  const move = (e) => { if (!cur) return; const p = pt(e); if (cur.c) { setCur({ c: cur.c, r: Math.hypot(p[0] - cur.c[0], p[1] - cur.c[1]) }); return; } if (cur.rect) { setCur({ rect: [cur.rect[0], cur.rect[1], p[0], p[1]] }); return; } const last = cur.pts[cur.pts.length - 1]; if (Math.hypot(p[0] - last[0], p[1] - last[1]) > 2.5) setCur({ pts: [...cur.pts, p] }); };
  const up = () => {
    if (cur && cur.c) { if (cur.r > 4) onStroke({ c: (brush || { c: '#1A1A1A' }).c, w: (brush || { w: 4 }).w, pts: circlePts(cur.c, cur.r) }); setCur(null); return; }
    if (cur && cur.rect) { const r = cur.rect; if (Math.abs(r[2] - r[0]) < 6 && Math.abs(r[3] - r[1]) < 6) onErase([r[0], r[1]]); else onEraseRect(r); }
    else if (cur && cur.pts && cur.pts.length > 1) {
      if (tool === 'laser') { const id = Date.now() + Math.random(); setLasers((l) => [...l, { id, s: strokeOf('laser', b, null, cur.pts) }]); setTimeout(() => setLasers((l) => l.filter((x) => x.id !== id)), 1400); }
      else onStroke(strokeOf(tool, b, color, cur.pts));
    }
    setCur(null);
  };
  const vb = `0 0 1000 ${vbh || ph(page)}`;
  const rect = cur && cur.rect && { x: Math.min(cur.rect[0], cur.rect[2]), y: Math.min(cur.rect[1], cur.rect[3]), w: Math.abs(cur.rect[2] - cur.rect[0]), h: Math.abs(cur.rect[3] - cur.rect[1]) };
  return html`<div class=${'draw' + (tool ? '' : ' idle')} ref=${ref} style=${{ cursor: tool === 'eraser' ? ERASER_CUR : tool === 'sticker' ? 'copy' : 'crosshair' }} onPointerDown=${tool ? down : undefined} onPointerMove=${move} onPointerUp=${up} onPointerCancel=${up}>
    ${lasers.map((l) => html`<svg class="ink laser" key=${l.id} viewBox=${vb} preserveAspectRatio="xMinYMin meet"><${Strokes} list=${[l.s]} /></svg>`)}
    ${cur && cur.pts && html`<svg class=${'ink' + (tool === 'laser' ? ' laser live' : '')} viewBox=${vb} preserveAspectRatio="xMinYMin meet"><${Strokes} list=${[strokeOf(tool, b, color, cur.pts)]} /></svg>`}
    ${cur && cur.c && html`<svg class="ink" viewBox=${vb} preserveAspectRatio="xMinYMin meet"><circle cx=${cur.c[0]} cy=${cur.c[1]} r=${cur.r} fill="none" stroke=${(brush || { c: '#1A1A1A' }).c} stroke-width=${(brush || { w: 4 }).w} /><line x1=${cur.c[0]} y1=${cur.c[1]} x2=${cur.c[0] + cur.r} y2=${cur.c[1]} stroke="#6A6A6A" stroke-width="1.5" stroke-dasharray="4 4" /><circle cx=${cur.c[0]} cy=${cur.c[1]} r="4" fill="#1A1A1A" /><text x=${cur.c[0] + cur.r / 2} y=${cur.c[1] - 8} font-size="16" text-anchor="middle" fill="#1A1A1A">${(cur.r / 40).toFixed(1)} 公分</text></svg>`}
    ${rect && html`<svg class="ink" viewBox=${vb} preserveAspectRatio="xMinYMin meet"><rect x=${rect.x} y=${rect.y} width=${rect.w} height=${rect.h} fill="rgba(240,255,98,.16)" stroke="#9BA440" stroke-width="2" stroke-dasharray="5 4" /></svg>`}
  </div>`;
}
/* 便利貼：點工具箱的「便利貼」就在畫面中間出現一張，直接打字（編輯模式）。
   點空白處收起；按著任何一處可以拖；再點一下回到編輯，垃圾桶只在編輯時出現。寬高跟著字長，最大 320px，超過就捲動 */
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
function addNote(P, page) { if (P === S.t) S.flags.noteUsed = true; const pid = PAGES[page].id; const n = { id: uid(), x: 260, y: 170, text: '' }; pgl(P.notes, pid).push(n); P.editNote = n.id; P.pop = null; P.tool = null; P.inkPop = false; }
function Notes({ P, page }) {
  const pid = PAGES[page].id, list = pgl(P.notes, pid);
  return list.map((n) => html`<${Note} key=${n.id} n=${n} P=${P} list=${list} />`);
}
function Note({ n, P, list }) {
  const editing = P.editNote === n.id;
  const ta = useRef(); const drag = useRef(null);
  useEffect(() => { if (editing && ta.current) ta.current.focus(); }, [editing]);
  const remove = () => { const i = list.indexOf(n); if (i >= 0) list.splice(i, 1); P.editNote = null; };
  const down = (e) => { if (editing) return; e.preventDefault(); const sh = e.currentTarget.closest('.sheet').getBoundingClientRect(); drag.current = { sx: e.clientX, sy: e.clientY, x: n.x, y: n.y, k: 1000 / sh.width, moved: false }; e.currentTarget.setPointerCapture(e.pointerId); };
  const move = (e) => { const d = drag.current; if (!d) return; const dx = e.clientX - d.sx, dy = e.clientY - d.sy; if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true; if (d.moved) { n.x = Math.max(0, d.x + dx * d.k); n.y = Math.max(0, d.y + dy * d.k); refresh(); } };
  const up = () => { const d = drag.current; drag.current = null; if (d && !d.moved) { P.editNote = n.id; refresh(); } };
  return html`<div class=${'note' + (editing ? ' editing' : '') + (!(n.text || '').trim() ? ' empty' : '')} style=${{ left: n.x / 10 + '%', top: `calc(var(--sw) * ${n.y / 1000})` }} onPointerDown=${down} onPointerMove=${move} onPointerUp=${up}>
    ${editing && html`<button class="note-del" aria-label="刪除便利貼" onPointerDown=${(e) => e.preventDefault()} onClick=${act(remove)}><${Icon} n="trash" s=${16} /></button>`}
    ${editing ? html`<textarea ref=${ta} class="note-t" placeholder="輸入文字…" aria-label="便利貼內容" value=${n.text} onInput=${(e) => { n.text = e.target.value; }} onBlur=${act(() => { if (P.editNote === n.id) P.editNote = null; })}></textarea>`
      : html`<div class="note-t">${n.text}</div>`}
  </div>`;
}
/* 貼紙：先選一個，再點畫面就貼上去 */
/* 貼紙：自己畫的品牌色小貼紙（不用 emoji）。每張有白色描邊（像割好的貼紙）、上亮下暗的漸層和一小塊高光，看起來微微鼓起來 */
const STK = {
  star: ['#FFE066', '#F3C11B', 'M50 8l12 26 28 3-21 19 6 28-25-14-25 14 6-28-21-19 28-3z'],
  heart: ['#FFA3D6', '#FF6FB5', 'M50 86C20 66 8 50 8 33a20 20 0 0 1 42-10 20 20 0 0 1 42 10c0 17-12 33-42 53z'],
  check: ['#5FE0A8', '#00A36E', 'M50 6a44 44 0 1 1 0 88 44 44 0 0 1 0-88z'],
  smile: ['#FFE066', '#F3C11B', 'M50 6a44 44 0 1 1 0 88 44 44 0 0 1 0-88z'],
  bulb: ['#FFF3A8', '#FFD84D', 'M50 6c18 0 30 13 30 29 0 12-7 19-12 25-3 4-4 7-4 11H36c0-4-1-7-4-11-5-6-12-13-12-25C20 19 32 6 50 6zM36 78h28v6a8 8 0 0 1-8 8H44a8 8 0 0 1-8-8z'],
  thumb: ['#8FDBFF', '#03C5E9', 'M14 44h14v44H14a6 6 0 0 1-6-6V50a6 6 0 0 1 6-6zM34 44l14-30c8 0 12 6 11 14l-3 14h22a9 9 0 0 1 9 11l-6 26a10 10 0 0 1-10 9H34z'],
  rocket: ['#B9A9FF', '#7F6CDF', 'M50 4C64 14 70 32 66 58L80 72V84L64 78H36L20 84V72L34 58C30 32 36 14 50 4Z'],
  fire: ['#FFB38A', '#FF854A', 'M50 6c4 18 26 26 26 50a26 26 0 0 1-52 0c0-14 8-22 12-30 2 8 6 12 10 12 0-12 0-22 4-32z'],
  q: ['#FF8A80', '#E5484D', 'M50 6a44 44 0 1 1 0 88 44 44 0 0 1 0-88z'],
};
const STK_EXTRA = {
  check: '<path d="M30 52l13 13 28-30" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>',
  smile: '<ellipse cx="37" cy="44" rx="4.5" ry="6" fill="#4A3200"/><ellipse cx="63" cy="44" rx="4.5" ry="6" fill="#4A3200"/><path d="M38 60q12 10 24 0" fill="none" stroke="#4A3200" stroke-width="5" stroke-linecap="round"/><ellipse cx="27" cy="57" rx="6" ry="4" fill="#FF8FB8" opacity=".55"/><ellipse cx="73" cy="57" rx="6" ry="4" fill="#FF8FB8" opacity=".55"/>',
  q: '<path d="M38 38a12 12 0 1 1 18 10c-5 3-6 6-6 10" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/><circle cx="50" cy="74" r="6" fill="#fff"/>',
  rocket: '<circle cx="50" cy="36" r="9" fill="#fff"/><circle cx="50" cy="36" r="5" fill="#8FDBFF"/><path d="M42 82q8 14 16 0" fill="#FF854A"/><path d="M46 82q4 8 8 0" fill="#FFE066"/>',
  bulb: '<path d="M42 50q8-8 16 0M50 50v16" fill="none" stroke="#C99A00" stroke-width="3.5" stroke-linecap="round" opacity=".7"/><path d="M38 80h24M40 86h20" stroke="#B9B3A2" stroke-width="3" stroke-linecap="round"/>',
};
const STICKERS = Object.keys(STK);
function StickerArt({ k, size = 40 }) {
  const [hi, lo, d] = STK[k], id = 'sg-' + k;
  return html`<svg width=${size} height=${size} viewBox="0 0 100 100" aria-hidden="true" style="overflow:visible" dangerouslySetInnerHTML=${{ __html:
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset="1" stop-color="${lo}"/></linearGradient></defs>` +
    `<path d="${d}" fill="#fff" stroke="#fff" stroke-width="12" stroke-linejoin="round" style="filter:drop-shadow(0 3px 3px rgba(26,25,23,.22))"/>` +
    `<path d="${d}" fill="url(#${id})"/>` + (STK_EXTRA[k] || '') +
    `<ellipse cx="36" cy="24" rx="12" ry="6" fill="#fff" opacity=".55" transform="rotate(-20 36 24)"/>` }}></svg>`;
}
function Stickers({ P, page }) {
  return pgl(P.stickers, PAGES[page].id).map((k) => html`<span class="stk" key=${k.id} style=${{ left: k.x / 10 + '%', top: `calc(var(--sw) * ${k.y / 1000})` }}>${STK[k.e] ? html`<${StickerArt} k=${k.e} size=${52} />` : k.e}</span>`);
}
function StickerPop({ side }) {
  const P = side === 'teacher' ? S.t : S.s;
  if (!STK[P.sticker]) P.sticker = 'star';
  return html`<div class="pop stk-pop" role="dialog" aria-label="貼紙">
    <div class="pop-h"><h4>貼紙</h4><button class="x-btn" aria-label="關閉" onClick=${act(() => { P.stickerPop = false; P.tool = null; })}><${Icon} n="x" /></button></div>
    <div class="pop-b"><div class="stk-grid" role="radiogroup" aria-label="選貼紙">${STICKERS.map((e) => html`<button role="radio" aria-checked=${P.sticker === e} class=${P.sticker === e ? 'on' : ''} onClick=${act(() => { P.sticker = e; P.tool = 'sticker'; })}><${StickerArt} k=${e} size=${34} /></button>`)}</div></div>
  </div>`;
}
/* 白板：蓋在頁面上的一塊寫字區，左下角換底：空白、方格、英文四線格（基準線綠色實線、小寫字母上緣虛線） */
const BOARD_H = 1000 * 480 / 792;
function BoardBg({ bg }) {
  if (bg === 'grid') { const st = 1000 / 33, ls = []; for (let x = st; x < 1000; x += st) ls.push(html`<line x1=${x} y1="0" x2=${x} y2=${BOARD_H} />`); for (let y = st; y < BOARD_H; y += st) ls.push(html`<line x1="0" y1=${y} x2="1000" y2=${y} />`);
    return html`<svg class="bd-bg" viewBox=${`0 0 1000 ${BOARD_H}`} preserveAspectRatio="none"><g stroke="#D9D9D9" stroke-width="1">${ls}</g></svg>`; }
  if (bg === 'en') { const k = 1000 / 792, rows = []; for (let g = 0; g < 6; g++) { const y0 = (16 + g * 80) * k, d = 16 * k;
      rows.push(html`<line x1="0" x2="1000" y1=${y0} y2=${y0} stroke="#8C8C8C" stroke-width="1.2" />`, html`<line x1="0" x2="1000" y1=${y0 + d} y2=${y0 + d} stroke="#A6A6A6" stroke-width="1.2" stroke-dasharray="7 6" />`,
        html`<line x1="0" x2="1000" y1=${y0 + 2 * d} y2=${y0 + 2 * d} stroke="#8DB22A" stroke-width="2" />`, html`<line x1="0" x2="1000" y1=${y0 + 3 * d} y2=${y0 + 3 * d} stroke="#8C8C8C" stroke-width="1.2" />`); }
    return html`<svg class="bd-bg" viewBox=${`0 0 1000 ${BOARD_H}`} preserveAspectRatio="none">${rows}</svg>`; }
  return null;
}
/* 一份手寫題作品：畫在課本上就是那一頁；畫在紙上就是白紙／方格／四線格（跟白板同一個比例） */
function Work({ t, w, layers, draw }) {
  if (!onPaper(t)) return html`<${Sheet} page=${t.page} w=${w} layers=${layers} draw=${draw} />`;
  return html`<div class="paper" style=${{ width: w + 'px', height: w * BOARD_H / 1000 + 'px' }}><${BoardBg} bg=${t.bg} />
    <svg class="ink" viewBox=${`0 0 1000 ${BOARD_H}`} preserveAspectRatio="xMinYMin meet">${layers.map((l) => html`<${Strokes} list=${l} />`)}</svg>${draw}</div>`;
}
function MiniWork({ t, layers }) {
  if (!onPaper(t)) return html`<${MiniPage} page=${t.page} /><${InkSvg} page=${t.page} layers=${layers} />`;
  return html`<div class="paper mini"><${BoardBg} bg=${t.bg} /><svg class="ink" viewBox=${`0 0 1000 ${BOARD_H}`} preserveAspectRatio="xMinYMid meet">${layers.map((l) => html`<${Strokes} list=${l} />`)}</svg></div>`;
}
/* 學生畫在紙上的手寫題：紙浮在課本上，可以收起來，上方任務列再叫回來 */
/* 學生寫在紙上的手寫題：紙整個蓋住課本（乙練 2026-10-30：不要「收起來」）。
   老師派題時附上當頁，左上就有「看題目」，點了在紙上疊一張那一頁的畫面對照 */
/* 課本頁縮放到剛好塞滿外框（量外框的寬高，照頁的比例取較小的那邊） */
function FitSheet({ page }) {
  const ref = useRef(); const [w, setW] = useState(800);
  useLayoutEffect(() => { const el = ref.current; const fit = () => setW(Math.max(200, Math.min(el.clientWidth - 24, (el.clientHeight - 24) * PAGES[page].r))); fit(); const ro = new ResizeObserver(fit); ro.observe(el); return () => ro.disconnect(); }, [page]);
  return html`<div class="fit-wrap" ref=${ref}><${Sheet} page=${page} w=${w} /></div>`;
}
function PaperAnswer() {
  const s = S.s, t = S.task; const hint = useHint();
  return html`<div class="board-wrap paper-wrap"><div class="board paper-ans" role="dialog" aria-label=${'在' + paperName(t) + '上作答'}>
    ${(t.q || t.withPage) && html`<div class="pa-h">${t.q && html`<b class="pa-q">${t.q}</b>`}<span class="spacer"></span>
      ${t.withPage && html`<button class=${'btn xs sec' + (s.peekQ ? ' on' : '')} aria-pressed=${!!s.peekQ} onClick=${act(() => { s.peekQ = !s.peekQ; })}><${Icon} n="book" s=${14} />看課本 p.${PAGES[t.page].nums[0]}</button>`}</div>`}
    <div class="bd-area"><${Work} t=${t} w=${1000} layers=${[t.mine]} draw=${html`<${DrawLayer} page=${0} vbh=${BOARD_H} tool=${s.tool === 'eraser' ? 'eraser' : 'pen'} brush=${s.brush.pen} color=${COLORS.answer}
      onStroke=${act((st) => t.mine.push(st))} onErase=${act((pt) => eraseAt(t.mine, pt))} onEraseRect=${act((r) => eraseRect(t.mine, r))} />`} />
      ${s.peekQ && t.withPage && html`<div class="peek-q" role="dialog" aria-label=${'課本 p.' + PAGES[t.page].nums[0]}><${FitSheet} page=${t.page} />
        <button class="x-btn pq-x" aria-label="關閉課本" onClick=${act(() => { s.peekQ = false; })}><${Icon} n="x" s=${18} /></button></div>`}
    </div>
  </div></div>`;
}
function Board({ side }) {
  const P = side === 'teacher' ? S.t : S.s; const B = P.board;
  const opts = [['blank', '空白'], ['grid', '方格'], ['en', '英文四線格']];
  return html`<div class="board-wrap"><div class="board" role="dialog" aria-label="白板">
    <div class="bd-area">
      <${BoardBg} bg=${B.bg} />
      <svg class="ink" viewBox=${`0 0 1000 ${BOARD_H}`} preserveAspectRatio="xMinYMin meet"><${Strokes} list=${B.ink} /></svg>
      <${DrawLayer} page=${0} vbh=${BOARD_H} tool=${P.tool === 'sticker' ? 'pen' : P.tool || 'pen'} brush=${P.brush[BRUSHES.includes(P.tool) ? P.tool : 'pen']}
        onStroke=${act((st) => B.ink.push(st))} onErase=${act((pt) => eraseAt(B.ink, pt))} onEraseRect=${act((r) => eraseRect(B.ink, r))} />
      <button class="x-btn bd-x" aria-label="關閉白板" onClick=${act(() => { P.board.open = false; })}><${Icon} n="x" s=${18} /></button>
      <div class="bd-bgs" role="radiogroup" aria-label="白板底">${opts.map(([k, l]) => html`<button role="radio" aria-checked=${B.bg === k} aria-label=${l} title=${l} class=${'bd-b ' + k + (B.bg === k ? ' on' : '')} onClick=${act(() => { B.bg = k; })}></button>`)}</div>
    </div>
  </div></div>`;
}
function openBoard(P) { if (P === S.t) S.flags.boardUsed = true; if (!P.board) P.board = { bg: 'blank', ink: [] }; P.board.open = true; P.pop = null; if (!BRUSHES.includes(P.tool) && P.tool !== 'eraser') P.tool = 'pen'; }
/* 分組：填總人數、選分組方式和數字，下面先說會分成幾組；按「開始分組」後列出每組座號。結果寬固定 280px，一列最多 5 個座號 */
function makeGroups(g) {
  const N = +g.total || 0, k = +g.n || 0, count = g.by === 'groups' ? k : (k ? Math.ceil(N / k) : 0);
  if (!N || !count) return;
  const seats = (S.cls.live && N === S.cls.joined.length ? [...S.cls.joined] : Array.from({ length: N }, (_, i) => i + 1)).sort(() => Math.random() - .5);
  const res = Array.from({ length: count }, () => []); seats.forEach((x, i) => res[i % count].push(x)); res.forEach((r) => r.sort((a, b) => a - b));
  g.res = res; g.busy = false; S.flags.grouped = true;
}
/* 分組卡片：每組一個品牌輔色（淡底＋組號色塊），組員用自己的形狀夥伴，不像表格那麼制式（2026-11-04 乙練） */
const GROUP_C = ['#F3C11B', '#FF854A', '#00A36E', '#FF87C7', '#03C5E9', '#7F6CDF', '#93663C', '#9DB000'];
const ZH_N = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五'];
function GroupPop() {
  const t = S.t;
  if (!t.grp) t.grp = { total: String(S.cls.live ? S.cls.joined.length : 30), by: 'groups', n: '', busy: false, res: null };
  const g = t.grp, N = +g.total || 0, k = +g.n || 0;
  const count = g.by === 'groups' ? k : (k ? Math.ceil(N / k) : 0);
  const ok = N > 0 && k > 0 && count > 0 && count <= N;
  const helper = ok ? `共 ${count} 組，每組約 ${Math.round(N / count)} 人` : '';
  const run = act(() => { g.busy = true; later(700, () => makeGroups(g)); });
  const close = act(() => { t.pop = null; });
  const cols = g.res ? (g.res.length <= 3 ? g.res.length : g.res.length <= 6 ? 3 : g.res.length <= 8 ? 4 : 5) : 0;
  const total = g.res ? g.res.reduce((n, r) => n + r.length, 0) : 0;
  return html`<div class=${'pop grp-pop' + (g.res ? ' wide' : '')} style=${g.res ? { width: cols * 178 + 36 + 'px' } : null}>
    <div class="pop-h"><h4>分組${g.res && html`<small class="grp-sum">${total} 人・${g.res.length} 組</small>`}</h4><span class="spacer"></span>${g.res && html`<button class="btn sm sec" onClick=${act(() => { g.res = null; })}>重新分組</button>`}<button class="x-btn" aria-label="關閉" onClick=${close}><${Icon} n="x" /></button></div>
    <div class="pop-b">
      ${g.res ? html`<div class="gcards" style=${{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>${g.res.map((r, i) => html`<div class="gcard" style=${{ '--gc': GROUP_C[i % GROUP_C.length] }}>
          <div class="gcard-h"><span class="gnum" aria-hidden="true"></span><b>第${ZH_N[i] || i + 1}組</b><small>${r.length} 人</small></div>
          ${r.map((x) => html`<div class="gm"><${Kid} seat=${x} box=${26} /><span>${nameOf(x)}</span><em>${pad(x)}</em></div>`)}</div>`)}</div>`
      : html`<label class="field-l" for="g-total">總人數</label><input class="inp" id="g-total" inputmode="numeric" placeholder="請輸入總人數" value=${g.total} onInput=${act((e) => { g.total = toHalf(e.target.value).replace(/\D/g, ''); })} />
        <p class="field-l" style="margin-top:14px">分組方式</p>
        <div class="seg grp-seg" role="group" aria-label="分組方式"><button aria-pressed=${g.by === 'groups'} onClick=${act(() => { g.by = 'groups'; })}>依組別數</button><button aria-pressed=${g.by === 'size'} onClick=${act(() => { g.by = 'size'; })}>依每組人數</button></div>
        <label class="field-l" for="g-n" style="margin-top:14px;display:block">${g.by === 'groups' ? '組別數' : '每組人數'}</label><input class="inp" id="g-n" inputmode="numeric" placeholder=${g.by === 'groups' ? '請輸入組別數' : '請輸入每組人數'} value=${g.n} onInput=${act((e) => { g.n = toHalf(e.target.value).replace(/\D/g, ''); })} />
        <p class="grp-help">${helper}</p>
        <button class="btn sm grp-go" disabled=${!ok} aria-busy=${g.busy} onClick=${g.busy ? undefined : run}>${g.busy ? html`<span class="spin"></span>` : '開始分組'}</button>`}
    </div>
  </div>`;
}
/* 筆的設定：貼著左欄的直式小窗，選顏色和粗細 */
function InkPop({ side }) {
  const P = side === 'teacher' ? S.t : S.s;
  const k = P.tool, b = P.brush[k], cs = k === 'pen' ? PEN_C : HI_C;
  const name = { pen: '畫筆', highlighter: '螢光筆', laser: '雷射筆' }[k];
  // 預設在畫面高度置中、貼著左欄；拖小窗空白處可以移動，位置記在 P.inkPos（乙練 2026-10-30）
  const pos = P.inkPos;
  const down = (e) => {
    if (e.target.closest('button, input, .ip-wheel')) return;
    const el = e.currentTarget, r = el.getBoundingClientRect(), stage = el.closest('.stage'), sr = stage.getBoundingClientRect(), k = 1440 / sr.width;
    const sx = e.clientX, sy = e.clientY, x0 = (r.left - sr.left) * k, y0 = (r.top - sr.top) * k;
    el.setPointerCapture(e.pointerId);
    const move = (ev) => { P.inkPos = { x: Math.max(0, Math.min(1440 - 70, x0 + (ev.clientX - sx) * k)), y: Math.max(0, Math.min(900 - r.height * k, y0 + (ev.clientY - sy) * k)) }; refresh(); };
    const up = () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); };
    el.addEventListener('pointermove', move); el.addEventListener('pointerup', up);
  };
  const custom = k === 'pen' && !cs.includes(b.c);
  return html`<div class=${'ink-pop' + (pos ? ' moved' : '')} style=${pos ? { left: pos.x + 'px', top: pos.y + 'px' } : null} onPointerDown=${down} role="dialog" aria-label=${name + '設定'}>
    <span class="ip-grip" aria-hidden="true" title="拖曳移動">${Array.from({ length: 6 }, () => html`<i></i>`)}</span>
    <div class="ip-dots" role="radiogroup" aria-label="顏色">${cs.map((c) => html`<button role="radio" aria-checked=${b.c === c} aria-label=${c} class=${'ip-dot' + (b.c === c ? ' on' : '') + (c === '#FFFFFF' ? ' white' : '')} style=${{ '--c': c }} onClick=${act(() => { b.c = c; P.wheel = false; if (P === S.t) S.flags.penSet = true; })}></button>`)}
      ${k === 'pen' && html`<button role="radio" aria-checked=${custom} aria-label="自選顏色" title="自選顏色" class=${'ip-dot wheel' + (custom ? ' on' : '') + (P.wheel ? ' open' : '')} style=${custom ? { '--c': b.c } : null} onClick=${act(() => { P.wheel = !P.wheel; })}></button>`}</div>
    ${k === 'pen' && P.wheel && html`<div class="ip-wheel" role="dialog" aria-label="自選顏色"><${ColorWheel} onPick=${act((c) => { b.c = c; if (P === S.t) S.flags.penSet = true; })} />
      <div class="cw-foot"><span class="cw-cur" style=${{ background: b.c }}></span><button class="btn xs sec" onClick=${act(() => { P.wheel = false; })}>好</button></div></div>`}
    <i class="ip-sep"></i>
    <input class="ip-range" type="range" min="1" max="15" step="1" value=${b.w} style=${{ '--p': ((b.w - 1) / 14 * 100) + '%' }} aria-label="粗細" onInput=${act((e) => { b.w = +e.target.value; })} />
    <span class="ip-w">${b.w}px</span>
    <i class="ip-sep"></i>
    <button class="x-btn sm" aria-label="收起" onClick=${act(() => { P.inkPop = false; P.wheel = false; })}><${Icon} n="x" s=${18} /></button>
  </div>`;
}
function eraseStickers(list, r) {
  const x0 = Math.min(r[0], r[2]), x1 = Math.max(r[0], r[2]), y0 = Math.min(r[1], r[3]), y1 = Math.max(r[1], r[3]);
  for (let i = list.length - 1; i >= 0; i--) if (list[i].x >= x0 && list[i].x <= x1 && list[i].y >= y0 && list[i].y <= y1) list.splice(i, 1);
}
function eraseRect(list, r) {
  const x0 = Math.min(r[0], r[2]), x1 = Math.max(r[0], r[2]), y0 = Math.min(r[1], r[3]), y1 = Math.max(r[1], r[3]);
  for (let i = list.length - 1; i >= 0; i--) if (list[i].pts.some(([x, y]) => x >= x0 && x <= x1 && y >= y0 && y <= y1)) list.splice(i, 1);
}
function eraseAt(list, p) { const i = list.findIndex((s) => s.pts.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 14)); if (i >= 0) list.splice(i, 1); }
/* 注音：示範只標這幾個詞（正式版由編輯器的行內注音來） */
const ZY = { 星: 'ㄒㄧㄥ', 座: 'ㄗㄨㄛˋ', 織: 'ㄓ', 女: 'ㄋㄩˇ', 牛: 'ㄋㄧㄡˊ', 郎: 'ㄌㄤˊ', 天: 'ㄊㄧㄢ', 津: 'ㄐㄧㄣ', 四: 'ㄙˋ', 光: 'ㄍㄨㄤ', 度: 'ㄉㄨˋ', 北: 'ㄅㄟˇ', 極: 'ㄐㄧˊ', 曝: 'ㄆㄨˋ', 自: 'ㄗˋ', 地: 'ㄉㄧˋ', 球: 'ㄑㄧㄡˊ', 轉: 'ㄓㄨㄢˇ', 公: 'ㄍㄨㄥ', 距: 'ㄐㄩˋ', 離: 'ㄌㄧˊ', 軌: 'ㄍㄨㄟˇ', 跡: 'ㄐㄧ', 獵: 'ㄌㄧㄝˋ', 戶: 'ㄏㄨˋ' };
/* 句子裡用 {詞} 標要注音的詞、[詞] 標重點詞 */
const T = (str) => str.split(/(\{[^}]+\}|\[[^\]]+\])/).map((part) => {
  if (part[0] === '{') return [...part.slice(1, -1)].map((ch) => ZY[ch] ? html`<span class="zy">${ch}<span class="zy-r" aria-hidden="true">${ZY[ch]}</span></span>` : ch);
  if (part[0] === '[') { const w = part.slice(1, -1).replace(/[{}]/g, ''), rid = KW_RES[w]; return rid ? html`<b class="kw kw-res" data-res=${rid} title="點了打開補充資源">${T(part.slice(1, -1))}</b>` : html`<b class="kw">${T(part.slice(1, -1))}</b>`; }
  return part;
});
/* 聚焦：第一下點段落，那一段留著、其他調暗；第二下點段裡的句子，只留那一句是黑的。
   上課中學生跟隨老師時，學生畫面同步聚焦同一段、同一句（老師筆跡不同步）。規則照自編編輯器的逐句聚焦 */
const SENT = (str) => str.match(/[^。！？；]+[。！？；]*[」』）]*/g) || [str];
function PageArt({ page, f, tap }) {
  const hint = useHint();
  const fb = (id) => 'fb' + (f && f.blk === id ? ' on' : '') + (tap && id === 'p1' && page === 0 ? ' ' + hint('t-focus') : '');
  const sn = (id, str) => SENT(str).map((x, i) => html`<span class=${'sn' + (f && f.blk === id && f.sn === i ? ' on' + '' : '')} data-sn=${i}>${T(x)}</span>`);
  /* 課文掛補充資源（2026-11-04 乙練選 A）：有掛的段落尾巴一個小記號；老師點這段＝聚焦（學生同步），段落下方浮出這段的資源膠囊，再點一項才打開 */
  const res = (id) => blkRes(page, id);
  const mk = (id) => res(id).length > 0 && html`<span class="res-mk" aria-label=${`這段有 ${res(id).length} 個補充資源`}><${Icon} n="blocks" s=${13} />${res(id).length}</span>`;
  const cap = (id) => tap && f && f.blk === id && res(id).length > 0 && html`<span class="blk-cap" role="group" aria-label="這段的補充資源">${res(id).map((it) => html`<button class=${'bc-it' + ((S.t.supp && S.t.supp.id === it.id) || S.t.playing === it.id ? ' on' : '')} onClick=${act((e) => { e.stopPropagation(); openSupp('teacher', it); })}><${Icon} n=${RES_IC[it.k] || 'file-text'} s=${15} />${it.t}</button>`)}</span>`;
  const P_ = (id, str, gap) => html`<p class=${fb(id) + (res(id).length ? ' has-res' : '')} data-blk=${id} style=${{ '--gap': gap }}>${sn(id, str)}${mk(id)}${cap(id)}</p>`;
  /* 內容、圖、間距照編輯器閱讀模式的第 2、5 頁（--gap 是跟上一塊的距離，頁寬 1195 的 px） */
  const cap2 = cap;
  const Fig = (src, alt, w, credit, cap, gap, ratio) => html`<figure class=${fb('fig') + (res('fig').length ? ' has-res' : '')} data-blk="fig" style=${{ '--gap': gap, '--fw': w, '--cy': Math.round(w / ratio - 32) }}><img src=${src} alt=${alt} draggable="false" /><span class="credit">${credit}</span><figcaption>${cap}${mk('fig')}</figcaption>${cap2('fig')}</figure>`;
  if (page === 0) return html`<div class="pg-in">
    <h2 class=${fb('h')} data-blk="h">${sn('h', '夜空裡的{星座}')}</h2>
    ${P_('p1', '晴朗的夜晚抬頭往天空看，可以看到許多一閃一閃的星星。古時候的人把亮度接近、位置相鄰的星星連起來想像成圖案，這些圖案就叫做[{星座}]。', 40)}
    ${Fig('assets/summer-triangle.jpg', '銀河與夏季夜空的亮星', 300, 'Giuseppe Donatiello, Giovanni Vincenzo Donatiello · CC0', '圖 1 夏季大三角', 36, 900 / 704)}
    ${P_('p2', '夏天的夜晚，我們可以找到明亮的「夏季大三角」。它由三顆分別屬於不同星座的亮星組成，是初學觀星的人最容易認出的目標。', 36)}
  </div>`;
  return html`<div class="pg-in">
    <h2 class=${fb('h') + (res('h').length ? ' has-res' : '')} data-blk="h">${sn('h', '{星星}為什麼會動')}${mk('h')}${cap('h')}</h2>
    <h3 class=${fb('h3a')} data-blk="h3a" style="--gap:40">${sn('h3a', '一個晚上之內的移動')}</h3>
    ${P_('p1', '同一個晚上，星星的位置會慢慢由東往西移動。這不是星星自己在跑，而是[{地球自轉}]造成的。', 30)}
    ${Fig('assets/star-trails.jpg', '長時間曝光拍下的星星軌跡，形成一圈一圈的同心圓', 340, 'Youniverse Multiverse · CC0', '圖 2 北方天空的星軌', 36, 900 / 676)}
  </div>`;
}
/* 老師點課文：第一下選段，第二下選句；點空白處取消 */
function focusTap(page, e, dbl) {
  const tgt = e.target;
  if (tgt.closest('.note, .stk, button, .draw')) return;
  const blk = tgt.closest('[data-blk]'), snEl = tgt.closest('[data-sn]'), F = S.focus;
  const kw = tgt.closest('[data-res]'); if (kw && blk) { S.focus = { page, blk: blk.dataset.blk, sn: null, mark: false }; S.flags.focusSent = true; const it = suppById(kw.dataset.res); if (it) openSupp('teacher', it); return refresh(); }
  if (!blk) { S.focus = null; return refresh(); }
  const id = blk.dataset.blk;
  if (!F || F.page !== page || F.blk !== id) S.focus = { page, blk: id, sn: null, mark: false };
  else if (snEl) { const i = +snEl.dataset.sn; if (dbl) { if (F.sn === i) F.mark = !F.mark; } else if (F.sn !== i) { F.sn = i; F.mark = false; } }
  S.flags.focusSent = true;
  if (dbl) document.getSelection()?.removeAllRanges();
  refresh();
}
const focusOn = (page) => (S.focus && S.focus.page === page ? S.focus : null);
/* 字體 auto＝預設：照課本本身的字體（同編輯器閱讀模式，這本是黑體）；字大、行距預設也照編輯器（20px、約 1.6） */
const DEFAULT_RS = { fs: 20, lh: 1.6, font: 'auto', zy: false, ar: '4:3' };
/* 頁的寬固定比例縮放；字大、行距、字體、注音跟著閱讀設定，字變大時頁往下長 */
function Sheet({ page, w, layers = [], draw, cls = '', children, rs, f, tap }) {
  const r = rs || DEFAULT_RS;
  return html`<div class=${'sheet pg ' + (r.font === 'kai' ? 'kai ' : '') + (r.zy ? '' : 'nozy ') + (f ? 'fx ' + (f.sn != null ? 'fx-sn ' : '') : '') + (tap ? 'tappable ' : '') + cls} style=${{ width: w + 'px', minHeight: w / pr(page, r) + 'px', '--fs': r.fs, '--lh': r.lh, '--sw': w + 'px' }}>
    <${BRIDGE.BookPage} page=${page} w=${w} f=${f} tap=${tap} rs=${r} />
    <${InkSvg} page=${page} layers=${layers} />${draw}${children}
  </div>`;
}
function Thumb({ page, w, layers = [] }) { return html`<div class="thumb" style=${{ width: w + 'px', height: w / PAGES[page].r + 'px' }}><div style="position:absolute;inset:0;overflow:hidden"><${BRIDGE.BookPage} page=${page} w=${w} thumb=${true} /></div><${InkSvg} page=${page} layers=${layers} /></div>`; }
const MiniPage = ({ page }) => html`<div class="mini-book"><${BRIDGE.BookPage} page=${page} w=${1000} thumb=${true} /></div>`;
/* 頁面比例跟著整本書，在編輯時定（4:3 或 16:9）；閱讀時不能切，不然老師和學生的頁碼會對不上 */
const pr = (page, rs) => (rs && rs.ar === '16:9' ? 16 / 9 : PAGES[page].r);
const fitW = (page, rs) => Math.min(STAGE.w - 120, (STAGE.h - 94) * pr(page, rs)); // 頁框上緣對齊左欄的換頁鈕（78），撐到右、下各留 16

/* ───────── 導覽提示 ───────── */
let HINT = null;
const useHint = () => (key) => (key && HINT === key ? 'hint' : '');

/* ───────── 左欄 ───────── */
function Rail({ side, preview, edit }) { // preview：學生工具列設定的預覽，直接畫真的左欄；edit：在預覽上直接 × 拿掉、拖曳排序、空格＋加入（2026-11-03 乙練）
  const teacher = side === 'teacher';
  const P = preview ? { ...S.s, pop: null, tool: null, rail: preview } : teacher ? S.t : S.s;
  const lock = !teacher && !preview && locked();
  const page = teacher ? S.t.page : sPage();
  const hint = useHint();
  const ink = inkOf(side, page);
  const canUndo = ink.length > 0;
  // 使用中的工具（筆、橡皮擦）＝白底橄欖綠框；打開中的面板（目次、工具箱⋯）＝淡 Lime。照 Figma 宇容 V1 Design System
  const tile = (k, label, icon, on, onClick, dis, extra = '') => html`<button class=${'tile' + (on ? (['toc', 'box'].includes(k) ? ' sel' : ' on') : '') + ' ' + extra} aria-pressed=${on || undefined} disabled=${dis} onClick=${act(onClick)}><${Icon} n=${icon} /><span>${label}</span></button>`;
  const inkTool = (k) => { const t = toolOf(k); return tile(k, t.label, t.icon, P.tool === k, (e) => {
    if (teacher && k === 'eraser') S.flags.eraserPicked = true;
    P.pop = null; P.inkY = e.currentTarget.offsetTop;
    if (k === 'eraser') { P.tool = P.tool === k ? null : k; P.inkPop = false; return; }
    if (P.tool !== k) { P.tool = k; P.inkPop = true; } else P.inkPop = !P.inkPop;
  }, lock, hint((teacher ? 't-' : 's-') + k)); };
  const render1 = (k) => {
    if (k === 'toc') return tile(k, '目次', 'menu', P.pop === 'toc', () => { P.pop = P.pop === 'toc' ? null : 'toc'; }, lock);
    if (k === 'pen' || k === 'highlighter' || k === 'eraser' || k === 'laser') return inkTool(k);
    if (k === 'timer') return teacher ? html`<button class=${'tile ' + (S.t.pop === 'timer' ? 'sel ' : '') + hint('t-timer')} onClick=${act(() => { S.t.pop = S.t.pop === 'timer' ? null : 'timer'; })}><${Icon} n="timer" /><span>計時器</span>${S.timer && html`<i class="badge"></i>`}</button>` : null;
    if (k === 'clear') return tile(k, '清除', 'trash', false, () => { ink.splice(0); P.redo = []; }, lock || !canUndo);
    if (k === 'undo') return tile('u1', '復原', 'corner-up-left', false, () => { P.redo.push(ink.pop()); }, lock || !canUndo);
    if (k === 'redo') return tile('u2', '取消復原', 'corner-up-right', false, () => { ink.push(P.redo.pop()); }, lock || !P.redo.length);
    const t = toolOf(k);
    if (k === 'sticky') return tile(k, t.label, t.icon, false, () => addNote(P, page), lock);
    if (k === 'board') return tile(k, '白板', t.icon, !!(P.board && P.board.open), () => openBoard(P), lock);
    return tile(k, t.label.length > 4 ? t.label.slice(0, 4) : t.label, t.icon, k === 'compass' ? P.tool === 'compass' : !!(P.mtools && P.mtools[k]), () => mathTool(P, k), lock);
  };
  const custom = true; // 學生的左欄也能自己增減（上課時從老師設定的學生工具列開始），邏輯跟老師一樣
  const list = preview || (custom ? P.rail : studentTools());
  const editing = !preview && custom && P.pop === 'toolbox';
  const wrap = (k, el) => (!el ? null : editing && RAIL_RM.includes(k) ? html`<span class="rail-rm" key=${k}>${el}<button class="rm-x" aria-label=${'從左欄拿掉' + ((toolOf(k) || {}).label || { undo: '復原', back: '返回編輯', task: '派任務', supp: '補充資源', settings: '設定', timer: '計時器' }[k])} onClick=${act(() => { P.rail = P.rail.filter((x) => x !== k); if (P.tool === k) { P.tool = null; P.inkPop = false; } if (teacher) S.flags.railEdited = true; })}><${Icon} n="x" s=${12} /></button></span>` : el);
  const bottom1 = (k) => {
    if (k === 'sync') return null; // 上課同步不在工具中間，放在左欄最下面的同步區（見下方 syncZone）
    if (k === 'back') return teacher && BRIDGE.canExit() ? html`<button class="tile" onClick=${act(() => BRIDGE.exit())}><${Icon} n="arrow-left" /><span>${BRIDGE.exitLabel()}</span></button>` : null;
    if (k === 'task') return teacher && S.cls.live && BAR !== 'toolbox' ? html`<button class=${'tile ' + (S.t.pop === 'task' ? 'sel ' : '') + hint('t-task')} onClick=${act(() => { S.t.pop = S.t.pop === 'task' ? null : 'task'; S.t.tool = null; })}><${Icon} n="send" /><span>派任務</span>${S.task && S.task.status !== 'stopped' && html`<i class="badge"></i>`}</button>` : null;
    if (k === 'supp') return html`<button class=${'tile ' + (P.pop === 'supp' ? 'sel ' : '') + hint((teacher ? 't-' : 's-') + 'supp')} aria-pressed=${P.pop === 'supp'} disabled=${lock} onClick=${act(() => { P.pop = P.pop === 'supp' ? null : 'supp'; P.suppScope = 'page'; P.tool = null; P.inkPop = false; })}><${Icon} n="blocks" /><span>補充資源</span></button>`; // 跟其他工具一樣素樸：不加框、不顯示數量（2026-11-03 乙練：減少老師負擔）
    if (k === 'settings') return html`<button class=${'tile ' + (P.pop === 'settings' ? 'sel' : '') + (teacher ? '' : ' ' + hint('s-settings'))} aria-expanded=${P.pop === 'settings'} title="閱讀設定" onClick=${act(() => { P.pop = P.pop === 'settings' ? null : 'settings'; })}><${Icon} n="settings" /><span>設定</span></button>`;
    return null;
  };
  const pagerEl = html`<div class="pager">
      <button aria-label="上一頁" disabled=${lock || page === 0} onClick=${act(() => turn(side, -1))}><${Icon} n="chevron-up" s=${16} /></button>
      <input class="n" key=${'pg' + page} inputmode="numeric" aria-label=${`第 ${PAGES[page].nums[0]} 頁，輸入頁碼跳頁`} disabled=${lock}
        value=${PAGES[page].nums[0]} onFocus=${(e) => e.currentTarget.select()}
        onKeyDown=${(e) => { if (e.key === 'Enter') e.currentTarget.blur(); if (e.key === 'Escape') { e.currentTarget.value = PAGES[page].nums[0]; e.currentTarget.blur(); } }}
        onBlur=${act((e) => { const n = parseInt(String(e.currentTarget.value).replace(/[^0-9]/g, ''), 10); const to = PAGES.findIndex((pg) => pg.nums.includes(n));
          if (to < 0) { e.currentTarget.value = PAGES[page].nums[0]; if (Number.isFinite(n)) toast(side, `這本課本沒有 p.${n}`); return; } if (to !== page) turn(side, to - page); })} />
      <button aria-label="下一頁" disabled=${lock || page === PAGES.length - 1} onClick=${act(() => turn(side, 1))}><${Icon} n="chevron-down" s=${16} /></button>
    </div>`;
  /* 同步區（2026-11-03 乙練選 A）：左欄最下面，上課格＋頁數框成一組，跟上面的工具分開。
     沒上課＝黑底「開始上課」；上課中＝淡黃底「● 上課中／501」，按了在畫布下方展開名單、鎖定、下課 */
  const syncTile = html`<button class=${'tile sync-tile' + (S.cls.live ? ' live' : '') + (S.t.barOpen ? ' sel' : '') + ' ' + hint(S.cls.live ? 't-sync' : 't-start')} onClick=${act(() => { if (!S.cls.live) { S.t.modal = 'start'; S.t.draft = { ci: Math.max(0, S.t.classes.findIndex((x) => x.c === '501')), mode: 'free' }; return; } S.t.barOpen = !S.t.barOpen; /* 只有再按這一格才收起；按膠囊裡的功能不會收（2026-11-03 乙練） */ })}>
    ${S.cls.live ? html`<span class="sync-ic"><${Icon} n="cast" /><i class="live-dot"></i></span><span>上課中</span>` : html`<${Icon} n="cast" /><span>開始上課</span>`}</button>`;
  return html`<nav class=${'rail' + (editing ? ' editing' : '')} aria-label="閱讀工具">
    <button class="pebble-btn" title="回書櫃" onClick=${act(() => {
      if (teacher && S.cls.live) { S.t.modal = 'leave'; return; } // 上課中回首頁：先問要不要結束上課
      if (!teacher && S.s.inClass) return toast('student', '下課後才能回書櫃');
      P.pop = null; P.tool = null; BRIDGE.goShelf();
    })}><${Pebble} shape=${BRIDGE.subject()} size=${56} /></button>
    ${teacher && PAGER_POS === 'top' && pagerEl}
    ${edit ? list.filter((k) => !RAIL_BOTTOM.includes(k)).map((k) => html`<span class=${'rail-rm rail-drag' + (edit.dragging === k ? ' dragging' : '')} key=${k} draggable="true"
        onDragStart=${(e) => { e.dataTransfer.effectAllowed = 'move'; edit.setDragging(k); }} onDragEnd=${() => edit.setDragging(null)}
        onDragOver=${(e) => { e.preventDefault(); if (edit.dragging && edit.dragging !== k) edit.move(edit.dragging, k); }}>
        ${render1(k)}<button class="rm-x" aria-label=${'拿掉' + ((toolOf(k) || {}).label || '')} onClick=${act(() => edit.remove(k))}><${Icon} n="x" s=${12} /></button></span>`)
      : list.filter((k) => !RAIL_BOTTOM.includes(k)).map((k) => wrap(k, render1(k)))}
    ${edit && edit.canAdd && html`<span class="rail-slot"><button class=${'tile add-slot' + (edit.open ? ' on' : '') + ' ' + hint('t-slot')} aria-label="加工具" aria-expanded=${edit.open} onClick=${act(() => edit.toggle())}><${Icon} n="plus" s=${22} /></button>
</span>`}
    <hr />
    ${(() => { const bk = (preview ? preview.filter((k) => RAIL_BOTTOM.includes(k)) : custom ? P.rail.filter((k) => RAIL_BOTTOM.includes(k)) : ['supp', 'settings']).sort((a, b) => RAIL_ORDER.indexOf(a) - RAIL_ORDER.indexOf(b));
      // 順序：返回編輯、工具箱、派任務、補充資源、設定（工具箱固定，不能拿掉）
      return [...bk.filter((k) => k === 'back').map((k) => wrap(k, bottom1(k))),
        tile('box', '工具箱', 'archive', P.pop === 'toolbox', () => { P.pop = P.pop === 'toolbox' ? null : 'toolbox'; P.inkPop = false; }, lock, teacher ? hint('t-box') : ''),
        ...bk.filter((k) => k !== 'back').map((k) => wrap(k, bottom1(k))),
        teacher && BAR === 'rail' && !preview ? html`<button class=${'tile cls-tile' + (S.t.barOpen ? ' sel' : '') + ' ' + hint(S.cls.live ? 't-roster' : 't-start')} onClick=${act(() => { if (!S.cls.live) { S.t.modal = 'start'; S.t.draft = { ci: Math.max(0, S.t.classes.findIndex((x) => x.c === '501')), mode: 'free' }; return; } S.t.barOpen = !S.t.barOpen; /* 只有再按這一格才收起；按膠囊裡的功能不會收（2026-11-03 乙練） */ })}>
          ${S.cls.live ? html`<span class="cls-n"><i class="live-dot"></i>${S.cls.cid}</span><span>${S.cls.joined.length}/${present().length}</span>` : html`<${Icon} n="presentation" /><span>開始上課</span>`}</button>` : null]; })()}
    ${teacher && !preview && (BAR === 'toolbox' || PAGER_POS === 'rail') && html`<div class="sync-zone">${BAR === 'toolbox' && syncTile}${PAGER_POS === 'rail' && pagerEl}</div>`}
    ${!teacher && html`<div class="spill-wrap">${(() => {
      // 預覽：點一下切換「跟隨中」和「自己翻頁」兩種樣子給老師看（2026-11-03 乙練）
      if (preview) return S.tbFollow !== false ? html`<button class="spill on" title="這是學生「跟隨老師」時的頁數鈕（藍色，頁碼跟著老師）。點一下，看學生自己翻頁時的樣子" onClick=${act(() => { S.tbFollow = false; })}><span class="sav">方</span><b>${PAGES[page].nums[0]}</b></button>`
        : html`<button class="sfollow" title="這是學生「自己翻頁」時的樣子：這顆是跟回老師的按鈕，下面可以自己翻頁。點一下，看學生跟隨老師時的樣子" onClick=${act(() => { S.tbFollow = true; })}>方</button>${pagerEl}`; // 學生工具列預覽：同步鈕是左欄固定的一格，畫上課中跟隨的樣子（2026-11-03 乙練）
      const live = S.s.inClass && S.cls.live, lk = live && locked(), on = live && following();
      /* 鎖定：深色、只有頁碼，不能按 */
      if (lk) return html`<div class="spill lock" aria-label="老師鎖定中"><span class="sav"><${Icon} n="lock" s=${14} /></span><b>${PAGES[page].nums[0]}</b></div>`;
      /* 跟隨中：藍色一整顆，沒有箭頭，不會誤觸翻頁；點一下才變回自己翻 */
      if (on) return html`<button class=${'spill on ' + hint('s-follow')} aria-label="跟隨老師中，點一下改成自己翻頁" onClick=${act(() => setFollow(false))}><span class="sav">方</span><b>${PAGES[page].nums[0]}</b></button>`;
      /* 自己翻：一般頁數；上課中上方多一顆老師頭像，按了跟回去 */
      if (!live) return pagerEl;
      /* 自己翻：同一顆白色膠囊，頂端老師頭像（按了跟回去），下面才是箭頭和頁碼，外框只有一層 */
      /* 「跟老師」獨立一顆、有字、跟箭頭隔開，避免想翻頁卻按到（2026-11-03 乙練） */
      return html`<button class=${'sfollow ' + hint('s-follow')} aria-label="跟隨老師" title="跟老師" onClick=${act(() => setFollow(true))}>方</button>${pagerEl}`;
    })()}</div>`}
  </nav>`;
}
/* 下拉選單：同編輯器 Dropdown。欄位款是灰底膠囊，展開時淡白浮層 */
function Dd({ id, value, options, onChange, small, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => { if (!open) return; const f = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; window.addEventListener('pointerdown', f, true); return () => window.removeEventListener('pointerdown', f, true); }, [open]);
  const cur = options.find(([v]) => String(v) === String(value)) || options[0];
  return html`<div class=${'dd' + (small ? ' sm' : '')} ref=${ref}>
    <button id=${id} type="button" class="dd-trigger" aria-haspopup="listbox" aria-expanded=${open} aria-label=${label || undefined} onClick=${() => setOpen(!open)}><span>${cur[1]}</span><${Icon} n="chevron-down" s=${16} /></button>
    ${open && html`<div class="dd-menu" role="listbox">${options.map(([v, l]) => html`<button type="button" role="option" aria-selected=${String(v) === String(value)} class=${String(v) === String(value) ? 'on' : ''} onClick=${act(() => { onChange(v); setOpen(false); })}>${l}</button>`)}</div>`}
  </div>`;
}
/* 閱讀設定：文字大小、行距、字體、注音。每個人自己的，不同步給別人 */
function ReadSettings({ side }) {
  const P = side === 'teacher' ? S.t : S.s;
  const r = P.rs || (P.rs = { ...DEFAULT_RS });
  const step = (k, d, min, max, dec) => { r[k] = Math.round(Math.min(max, Math.max(min, r[k] + d)) * 10) / 10; };
  const row = (label, k, d, min, max) => html`<div class="rs-row"><span>${label}</span><div class="stepper">
    <button aria-label=${label + '減少'} disabled=${r[k] <= min} onClick=${act(() => step(k, -d, min, max))}>−</button><b>${k === 'lh' ? r[k].toFixed(1) : r[k]}</b>
    <button aria-label=${label + '增加'} disabled=${r[k] >= max} onClick=${act(() => step(k, d, min, max))}>+</button></div></div>`;
  return html`<div class="pop rs-pop" role="dialog" aria-label="閱讀設定">
    ${row('文字大小', 'fs', 2, 16, 40)}
    ${row('行距', 'lh', .2, 1, 3)}
    <div class="rs-row"><span>字體</span><div class="pill-seg" role="radiogroup" aria-label="字體">${[['auto', '預設'], ['kai', '楷體'], ['hei', '黑體']].map(([k, l]) => html`<button role="radio" aria-checked=${r.font === k} class=${r.font === k ? 'on' : ''} onClick=${act(() => { r.font = k; })}>${l}</button>`)}</div></div>
    <div class="rs-row"><span>顯示注音</span><button class=${'switch' + (r.zy ? ' on' : '')} role="switch" aria-checked=${r.zy} aria-label="顯示注音" onClick=${act(() => { r.zy = !r.zy; })}><i></i></button></div>
  </div>`;
}
/* 目次：照 Figma「美感與數位教科書（品樂）」1695:20179。貼著左欄的整條面板，兩個分頁：
   切換章節（單元可以收合，目前這節亮淡 Lime）、縮圖預覽（兩欄縮圖，目前這頁橄欖綠框） */
const tocOf = () => BRIDGE.outline();
function Toc({ side }) {
  const P = side === 'teacher' ? S.t : S.s;
  const cur = side === 'teacher' ? S.t.page : sPage();
  const tab = P.tocTab || 'ch', shut = P.tocShut || {};
  const go = (i) => { if (side === 'student' && following()) S.s.follow = false; P.page = i; if (side === 'teacher') S.focus = null; P.pop = null; };
  return html`<div class="pop toc-pop" role="dialog" aria-label="目次">
    <div class="pop-h"><h4>目次</h4><button class="x-btn" aria-label="關閉" onClick=${act(() => { P.pop = null; })}><${Icon} n="x" /></button></div>
    <div class="toc-tabs" role="tablist">${[['ch', '切換章節'], ['thumb', '縮圖預覽']].map(([k, l]) => html`<button role="tab" aria-selected=${tab === k} class=${tab === k ? 'on' : ''} onClick=${act(() => { P.tocTab = k; })}>${l}</button>`)}</div>
    <div class="toc-b" key=${tab}>${tab === 'ch'
      ? tocOf().map((c, ci) => html`<section class=${'toc-ch' + (shut[ci] ? '' : ' open')}>
          <button class="toc-chh" aria-expanded=${!shut[ci]} onClick=${act(() => { P.tocShut = { ...shut, [ci]: !shut[ci] }; })}><span class="chev"><${Icon} n="chevron-down" s=${16} /></span><b>${c.ch}</b></button>
          ${!shut[ci] && html`<div class="toc-items">${c.items.map((it) => html`<button class=${'toc-it' + (it.page === cur ? ' on' : '')} aria-current=${it.page === cur ? 'page' : undefined} onClick=${act(() => go(it.page))}>${it.t}</button>`)}</div>`}
        </section>`)
      : html`<div class="toc-thumbs">${PAGES.map((p, i) => html`<button class=${'toc-th' + (i === cur ? ' on' : '')} aria-current=${i === cur ? 'page' : undefined} aria-label=${`第 ${p.nums[0]} 頁`} onClick=${act(() => go(i))}>
          <span class="shot"><${Thumb} page=${i} w=${124} /></span><span class="cap"><b>${p.nums[0]}</b>${p.title}</span></button>`)}</div>`}</div>
  </div>`;
}
/* 數學小工具：直尺、量角器、圓規、互動學習收在工具箱的「數學」裡，點了打開這一格（樣式同工具箱） */
function MathPop({ side }) {
  const P = side === 'teacher' ? S.t : S.s;
  const tl = (icon, label, k) => html`<button class=${'tile' + ((k === 'compass' ? P.tool === 'compass' : P.mtools && P.mtools[k]) ? ' on' : '')} onClick=${act(() => mathTool(P, k))}><${Icon} n=${icon} /><span>${label}</span></button>`;
  return html`<div class="pop tb-pop math-pop" role="dialog" aria-label="數學小工具">
    <div class="pop-h"><h4>數學小工具</h4><button class="x-btn" aria-label="關閉" onClick=${act(() => { P.pop = null; })}><${Icon} n="x" /></button></div>
    <div class="pop-b"><div class="toolgrid" style="margin-bottom:0">${tl('ruler-measure', '直尺', 'ruler')}${tl('angle', '量角器', 'protractor')}${tl('drafting-compass', '圓規', 'compass')}${tl('shapes', '互動學習', 'shapes')}</div></div>
  </div>`;
}
/* 數學小工具（2026-11-11 補做）：直尺、量角器是浮在課本上的透明尺，按著拖曳移動、拖右邊的圓點轉角度；
   圓規是畫圓：在課本上按住當圓心、拖出半徑，放開就畫好（算筆跡，可以復原、擦掉）；互動學習是幾何拼板 */
function mathTool(P, k) {
  if (k === 'compass') { P.tool = P.tool === 'compass' ? null : 'compass'; P.pop = null; P.inkPop = false; return; }
  P.mtools = P.mtools || {};
  if (P.mtools[k]) delete P.mtools[k];
  else P.mtools[k] = { x: k === 'shapes' ? 360 : 300 + Object.keys(P.mtools).length * 40, y: k === 'protractor' ? 320 : 220, a: 0 };
  P.pop = null;
}
const CM = 40; // 一公分畫多寬（課本上看起來的大小，不是實際尺寸）
function dragTool(e, st, mode) {
  e.preventDefault(); e.stopPropagation();
  const el = e.currentTarget.closest('.mtool'); const box = el.getBoundingClientRect();
  const cx = box.left + box.width / 2, cy = box.top + box.height / 2;
  const sx = e.clientX, sy = e.clientY, ox = st.x, oy = st.y, oa = st.a;
  const a0 = Math.atan2(sy - cy, sx - cx) * 180 / Math.PI;
  const mv = (ev) => { if (mode === 'rotate') { st.a = Math.round(oa + Math.atan2(ev.clientY - cy, ev.clientX - cx) * 180 / Math.PI - a0); } else { st.x = ox + ev.clientX - sx; st.y = oy + ev.clientY - sy; } refresh(); };
  const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
  window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up);
}
function MathTools({ side }) {
  const P = side === 'teacher' ? S.t : S.s, M = P.mtools || {};
  const close = (k) => act(() => { delete M[k]; });
  const wrap = (k, w, h, body, label) => { const st = M[k]; return html`<div class=${'mtool ' + k} key=${k} style=${{ left: st.x + 'px', top: st.y + 'px', width: w + 'px', height: h + 'px', transform: `rotate(${st.a}deg)` }} role="group" aria-label=${label}>
      <div class="mt-body" onPointerDown=${(e) => dragTool(e, st, 'move')}>${body}</div>
      <button class="mt-rot" aria-label="轉角度" title=${`${((st.a % 360) + 360) % 360}°，按著轉`} onPointerDown=${(e) => dragTool(e, st, 'rotate')}></button>
      <button class="x-btn mt-x" aria-label=${'收起' + label} onClick=${close(k)}><${Icon} n="x" s=${14} /></button></div>`; };
  const out = [];
  if (M.ruler) { const n = 15; out.push(wrap('ruler', n * CM + 32, 64, html`<svg width=${n * CM + 32} height="64" aria-hidden="true">${Array.from({ length: n * 10 + 1 }, (_, i) => html`<line x1=${16 + i * CM / 10} y1="0" x2=${16 + i * CM / 10} y2=${i % 10 === 0 ? 22 : i % 5 === 0 ? 15 : 9} stroke="#1A1A1A" stroke-width=${i % 10 === 0 ? 1.4 : 0.8} />`)}${Array.from({ length: n + 1 }, (_, i) => html`<text x=${16 + i * CM} y="38" font-size="12" text-anchor="middle" fill="#1A1A1A">${i}</text>`)}<text x=${n * CM + 18} y="56" font-size="10" text-anchor="end" fill="#6A6A6A">公分</text></svg>`, '直尺')); }
  if (M.protractor) { const R = 160; out.push(wrap('protractor', R * 2 + 24, R + 30, html`<svg width=${R * 2 + 24} height=${R + 30} aria-hidden="true"><path d=${`M12 ${R + 12} A${R} ${R} 0 0 1 ${R * 2 + 12} ${R + 12} Z`} fill="rgba(240,255,98,.28)" stroke="#5A6E00" stroke-width="1.2" />${Array.from({ length: 181 }, (_, d) => { const r1 = d % 10 === 0 ? R - 18 : d % 5 === 0 ? R - 12 : R - 7, a = Math.PI - d * Math.PI / 180, x = R + 12, y = R + 12; return html`<line x1=${x + R * Math.cos(a)} y1=${y - R * Math.sin(a)} x2=${x + r1 * Math.cos(a)} y2=${y - r1 * Math.sin(a)} stroke="#1A1A1A" stroke-width=${d % 10 === 0 ? 1.2 : 0.6} />`; })}${Array.from({ length: 19 }, (_, i) => { const d = i * 10, a = Math.PI - d * Math.PI / 180; return html`<text x=${R + 12 + (R - 32) * Math.cos(a)} y=${R + 16 - (R - 32) * Math.sin(a)} font-size="11" text-anchor="middle" fill="#1A1A1A">${d}</text>`; })}<circle cx=${R + 12} cy=${R + 12} r="3" fill="#1A1A1A" /><line x1="12" y1=${R + 12} x2=${R * 2 + 12} y2=${R + 12} stroke="#1A1A1A" stroke-width="1" /></svg>`, '量角器')); }
  if (M.shapes) out.push(html`<${ShapeBoard} key="shapes" st=${M.shapes} onClose=${close('shapes')} />`);
  return html`<div class="mtools">${out}</div>`;
}
/* 互動學習：幾何拼板。品牌的幾何形狀可以拖出來排、點一下轉 45 度，拼出圖案；「重排」放回原位 */
const BOARD_SHAPES = [['chinese', 0, 0], ['english', 110, 0], ['science', 220, 0], ['social', 0, 110], ['math', 110, 110], ['other', 220, 110]];
function ShapeBoard({ st, onClose }) {
  st.pcs = st.pcs || BOARD_SHAPES.map(([k, x, y]) => ({ k, x, y, a: 0 }));
  const drag = (e, pc) => { e.preventDefault(); e.stopPropagation(); const sx = e.clientX, sy = e.clientY, ox = pc.x, oy = pc.y; let moved = false;
    const mv = (ev) => { if (Math.hypot(ev.clientX - sx, ev.clientY - sy) > 3) moved = true; pc.x = ox + ev.clientX - sx; pc.y = oy + ev.clientY - sy; refresh(); };
    const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); if (!moved) { pc.a = (pc.a + 45) % 360; refresh(); } };
    window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); };
  return html`<div class="mtool shapes" style=${{ left: st.x + 'px', top: st.y + 'px' }} role="dialog" aria-label="幾何拼板">
    <div class="pop-h mt-head" onPointerDown=${(e) => dragTool(e, st, 'move')}><h4>幾何拼板</h4><span class="sb-hint">拖曳移動，點一下轉 45°</span><button class="btn sec xs" onClick=${act(() => { st.pcs = null; })}>重排</button><button class="x-btn" aria-label="關閉" onClick=${onClose}><${Icon} n="x" /></button></div>
    <div class="sb-area">${st.pcs.map((pc, i) => html`<span class="sb-pc" key=${i} style=${{ left: pc.x + 'px', top: pc.y + 'px', transform: `rotate(${pc.a}deg)` }} onPointerDown=${(e) => drag(e, pc)}><${Pebble} shape=${pc.k} size=${96} dark=${true} /></span>`)}</div>
  </div>`;
}
/* 科目亮點：依課本科目（數學考數院、英語探索、自然星際巡航，Notion「工具列 功能需求」）。
   掛在平台裡用 iframe 打開，網址帶上平台的身分（角色、學校、班級、座號），亮點不用再登入（Notion「科目亮點連動師生帳號」） */
const HIGHLIGHTS = {
  math: { name: '考數院', icon: 'list-checks', url: '' },
  english: { name: '探索', icon: 'compass', url: '' },
  science: { name: '星際巡航', icon: 'planet', url: 'https://tw-digitaltextbook.org/?textbookId=696f4931ca45af89c5578175&pageId=696f4931ca45af89c5578187' },
};
function HighlightView({ side }) {
  const P = side === 'teacher' ? S.t : S.s, hl = HIGHLIGHTS[P.hl];
  if (!hl) return null;
  const who = side === 'teacher' ? { role: 'teacher', name: TEACHER } : { role: 'student', name: nameOf(ME), seat: ME };
  const q = new URLSearchParams({ platformRole: who.role, school: SCHOOL, class: S.cls.cid || '501', ...(who.seat ? { seat: String(who.seat) } : {}) });
  const src = hl.url ? hl.url + (hl.url.includes('?') ? '&' : '?') + q : '';
  return html`<div class="scrim" style="z-index:35" onClick=${act((e) => { if (e.target === e.currentTarget) P.hl = null; })}>
    <div class="supp-view big hl-view" role="dialog" aria-label=${hl.name}>
      <div class="pop-h"><h4>${hl.name}</h4><span class="hl-who">以${who.name}的身分開啟</span>${src && html`<a class="btn sm sec open-win" href=${src} target="_blank" rel="noopener">以新視窗開啟<${Icon} n="arrow-up-right" s=${16} /></a>`}<button class="x-btn" aria-label="關閉" onClick=${act(() => { P.hl = null; })}><${Icon} n="x" /></button></div>
      <div class="pop-b">${src ? html`<iframe class="hl-frame" src=${src} title=${hl.name} allow="fullscreen; autoplay" onLoad=${(e) => { /* 前端接口示範：載入後用 postMessage 把平台身分交給亮點（正式欄位與驗證方式由熊熊與 BE 定） */ try { e.currentTarget.contentWindow.postMessage({ type: 'platform-identity', role: who.role, name: who.name, school: SCHOOL, class: S.cls.cid || '501', seat: who.seat || null }, new URL(src).origin); } catch {} }}></iframe>`
        : html`<div class="sv-nopv"><span class="ic"><${Icon} n="link" s=${24} /></span><b>${hl.name}的網址還沒設定</b><span>科目亮點清單確認後，在 classroom/legacy.js 的 HIGHLIGHTS 填上網址，這裡就會直接打開。</span></div>`}</div>
    </div></div>`;
}
/* 隨機抽籤：一個大大的科目形狀（這本是自然），抽的時候座號在形狀裡跳、越跳越慢；停下來顯示座號姓名，點形狀就幫他 +1（形狀跳一下、冒出 +1） */
function LotteryPop() {
  const L = S.lot || (S.lot = { seat: null, rolling: false, plus: 0, fx: 0 });
  const pool = S.cls.live ? S.cls.joined.slice() : present().map((x) => x.seat);
  const numRef = useRef(), nameRef = useRef();
  const roll = () => {
    if (L.rolling || !pool.length) return;
    S.flags.lotterySeen = true;
    const seat = pool[Math.floor(Math.random() * pool.length)];
    L.rolling = true; L.seat = null; L.plus = 0; refresh();
    let t = 0;
    for (let i = 0; i < 16; i++) {
      t += 45 + i * i * 2;
      const last = i === 15, show = last ? seat : pool[Math.floor(Math.random() * pool.length)];
      timers.push(setTimeout(() => {
        if (numRef.current) numRef.current.textContent = pad(show);
        if (last) { L.seat = seat; L.rolling = false; refresh(); }
      }, t));
    }
  };
  const give = (e) => { if (L.seat == null || L.rolling) return; burst(e && e.currentTarget); bonus(L.seat, 1); L.plus += 1; L.fx = Date.now(); toast('teacher', `${pad(L.seat)} ${nameOf(L.seat)} +1`); };
  return html`<div class="pop lot-pop" role="dialog" aria-label="隨機抽籤">
    <div class="pop-h"><h4>隨機抽籤</h4><button class="x-btn" aria-label="關閉" onClick=${act(() => { S.t.pop = null; })}><${Icon} n="x" /></button></div>
    <div class="pop-b">
      <button class=${'lot-shape' + (L.rolling ? ' rolling' : '') + (L.seat != null ? ' ready' : '')} key=${'s' + L.fx} disabled=${L.seat == null || L.rolling} aria-label=${L.seat != null ? `幫 ${nameOf(L.seat)} 加 1 分` : '抽籤'} onClick=${act(give)}>
        <${Pebble} shape="science" size=${200} dark=${true} />
        <span class="lot-num" ref=${numRef}>${L.seat != null ? pad(L.seat) : '?'}</span>
        ${L.seat != null && !L.rolling && html`<span class=${'lot-plus ' + (L.plus > 0 ? 'got' : 'todo')} key=${'p' + L.fx}>+${L.plus || 1}</span>`}
      </button>
      <div class="lot-name" ref=${nameRef}>${L.seat != null ? nameOf(L.seat) : ' '}</div>
      <button class="btn sm lot-go" disabled=${L.rolling} onClick=${act(roll)}>${L.rolling ? html`<span class="dice-spin"><${Icon} n="dice" s=${18} /></span>` : L.seat != null ? '再抽一次' : '抽籤'}</button>
    </div></div>`;
}
function Toolbox({ side }) {
  const P = side === 'teacher' ? S.t : S.s;
  const page = side === 'teacher' ? S.t.page : sPage();
  const custom = true;
  const ink = inkOf(side, page);
  const DO = {
    back: () => (BRIDGE.canExit() ? BRIDGE.exit() : toast(side, '這本課本不能編輯')),
    task: () => { if (!S.cls.live) return toast('teacher', '開始上課後才能派任務'); S.t.pop = 'task'; S.t.tool = null; },
    supp: () => { P.pop = 'supp'; P.suppScope = 'page'; }, settings: () => { P.pop = 'settings'; },
    lottery: () => { P.pop = 'lottery'; S.lot = null; },
    toc: () => { P.pop = 'toc'; S.flags.tocSeen = true; }, math: () => { P.pop = 'math'; }, note: () => addNote(P, page), board: () => openBoard(P), group: () => { P.pop = 'group'; },
    sync: () => { if (!S.cls.live) { S.t.modal = 'start'; S.t.draft = { ci: Math.max(0, S.t.classes.findIndex((x) => x.c === '501')), mode: 'free' }; P.pop = null; } else { S.t.barOpen = true; P.pop = null; } },
    sticker: () => { P.stickerPop = true; P.tool = 'sticker'; P.pop = null; P.inkPop = false; },
    clear: () => { ink.splice(0); P.redo = []; },
    undo: () => { if (ink.length) P.redo.push(ink.pop()); }, redo: () => { if (P.redo.length) ink.push(P.redo.pop()); },
    timer: () => { P.pop = 'timer'; }, // 一點就開，不必先放進左欄、也不必先開始上課
    hl: () => { P.pop = null; P.hl = HIGHLIGHTS[SUBJECT_SHAPE[BRIDGE.subject()] || 'other'] ? (SUBJECT_SHAPE[BRIDGE.subject()]) : null; },
  };
  const t = (icon, label, k) => {
    const rk = k;
    const canAdd = custom && RAIL_RM.includes(rk) && !P.rail.includes(rk);
    const hint = useHint();
    // 已經放在左欄的工具，在工具箱裡是停用的（照 Figma：用左欄那顆就好）
    const inRail = custom && RAIL_RM.includes(rk) && P.rail.includes(rk) && !(rk === 'task' && BAR === 'toolbox'); // 派任務在上課膠囊裡，不在左欄，工具箱裡要能按
    return html`<span class="tb-cell"><button class=${'tile' + (k && P.tool === k ? ' on' : '') + (side === 'teacher' && k ? ' ' + hint('t-tb-' + k) : '')} disabled=${inRail || (k === 'clear' && !ink.length)} title=${inRail ? '已經在左欄' : undefined} onClick=${act(() => { if (side === 'teacher' && k === 'laser') S.flags.laserUsed = true; if (DO[k]) DO[k](); else if (k) { P.tool = P.tool === k ? null : k; P.pop = null; P.inkPop = BRUSHES.includes(k) && P.tool === k; P.inkY = 640; } else toast(side, '示範沒有做'); })}><${Icon} n=${icon} /><span>${label}</span></button>
      ${canAdd && html`<button class="add-x" aria-label=${'把' + label + '放回左欄'} title="放回左欄" onClick=${act(() => { P.rail = RAIL_ORDER.filter((x) => x === k || P.rail.includes(x)); if (side === 'teacher') S.flags.railEdited = true; })}><${Icon} n="plus" s=${12} /></button>`}</span>`;
  };
  return html`<div class="pop tb-pop">
    <div class="pop-h"><h4>工具箱</h4><button class="x-btn" aria-label="關閉" onClick=${act(() => { P.pop = null; })}><${Icon} n="x" /></button></div>
    <div class="pop-b">
      <p class="grp-label">系統工具</p><div class="toolgrid">${t('menu', '目次', 'toc')}${side === 'teacher' ? t('arrow-left', '返回編輯', 'back') : ''}${side === 'teacher' && BAR === 'toolbox' ? t('presentation', '上課同步', 'sync') : ''}${t('blocks', '補充資源', 'supp')}${t('settings', '設定', 'settings')}</div>
      <p class="grp-label">編輯工具</p><div class="toolgrid">${t('pencil', '畫筆', 'pen')}${t('highlighter', '螢光筆', 'highlighter')}${t('eraser', '橡皮擦', 'eraser')}${t('trash', '清除', 'clear')}${t('sun', '雷射筆', 'laser')}${t('sticky-note', '便利貼', 'note')}${t('corner-up-left', '復原', 'undo')}${t('corner-up-right', '取消復原', 'redo')}</div>
      <p class="grp-label">${side === 'teacher' ? '教學工具' : '學習工具'}</p><div class="toolgrid">${side === 'teacher' ? t('send', '派任務', 'task') : ''}${t('whiteboard', '電子白板', 'board')}${side === 'teacher' ? t('sticker2', '貼紙', 'sticker') : ''}${side === 'teacher' ? t('users-round', '分組', 'group') : ''}${side === 'teacher' ? t('n123', '隨機抽籤', 'lottery') : ''}${side === 'teacher' ? t('timer', '計時器', 'timer') : ''}</div>
      <p class="grp-label">科目工具</p>${(() => { const sk = SUBJECT_SHAPE[BRIDGE.subject()] || 'other'; const hl = HIGHLIGHTS[sk];
        const cells = [hl && t(hl.icon, hl.name, 'hl'), sk === 'math' && t('plus-minus', '數學小工具', 'math')].filter(Boolean);
        return cells.length ? html`<div class="toolgrid" style="margin-bottom:0">${cells}</div>` : html`<p class="note-line" style="margin:0">這一科還沒有科目工具</p>`; })()}
    </div>
  </div>`;
}

/* ───────── 書櫃：同編輯器 src/shelf（2026-10-22），另外加老師的「班級星艦」、管理員的「帳號管理」 ───────── */
/* 同編輯器 src/shelf/catalog.ts（2026-10-28）：五科各一本；封面用去掉出版社字的那張（*-art.jpg） */
const TEXTBOOKS = [
  { id: 'mulan', subject: '國語文', edition: '115 國中', title: '國文 2下', cover: 'assets/covers/guowen-2b-art.jpg' },
  { id: 'social-5b', subject: '社會', edition: '115 國小', title: '社會 5下', cover: 'assets/covers/social-5b-art.jpg' },
  { id: 'english-6', subject: '英語文', edition: '114 國小', title: 'Wonder World 6', cover: 'assets/covers/english-6-art.jpg' },
  { id: 'demo', subject: '自然科學', edition: '114 國小', title: '自然科學 5下', cover: 'assets/covers/science-5b-art.jpg', live: true },
  { id: 'math-2b', subject: '數學', edition: '114 國中', title: '數學 2下', cover: 'assets/covers/math-2b-art.jpg' },
];
const BOOK_TITLE = '自然科學 5下';
const SHELF_TABS = [['textbook', '數位教科書'], ['shared', '共享教材'], ['mine', '自編教材']];
function AvatarMenu({ side }) {
  const teacher = side === 'teacher', admin = side === 'admin';
  const P = admin ? S.admin : teacher ? S.t : S.s;
  const name = admin ? '系統管理員' : teacher ? TEACHER : '陳小宇';
  const hint = useHint();
  return html`<button class=${'who-me ' + (side === 'student' ? hint('s-avatar') : '')} aria-expanded=${!!P.menu} onClick=${act((e) => { e.stopPropagation(); P.menu = !P.menu; if (side === 'student' && P.menu) S.flags.palSeen = true; })}>
    <span>${name}</span>
    <span class="avatar">${admin ? '管' : teacher ? '方' : pad(ME)}</span>
    ${P.menu && html`<div class="menu" onClick=${(e) => e.stopPropagation()}>
      <div class="mh"><b>${name}</b>${admin ? '' : teacher ? SCHOOL : `${SCHOOL} 501`}</div>
      ${side === 'student' && S.s.avatar && html`<div class="pal-card"><${Companion} shape=${S.s.avatar.shape} eye=${S.s.avatar.eye} box=${52} cls="" /><div><b>${SH[S.s.avatar.shape].name}</b></div></div>`}
      ${side === 'student' && html`<button onClick=${act(() => { P.menu = false; S.s.screen = 'pick'; S.s.pickStep = 1; S.s.draft = { ...(S.s.avatar || { shape: null, eye: 'big' }) }; })}><${Icon} n="sparkles" s=${18} />換學習夥伴</button>`}
      <button onClick=${act(() => { P.menu = false; if (side === 'student') S.flags.profileSeen = true; S.profile = { side, show: false, pw: null }; })}><${Icon} n="user" s=${18} />個人資料</button>
      <button onClick=${act(() => { P.menu = false; toast(side, '示範不登出'); })}><${Icon} n="log-out" s=${18} />登出</button>
    </div>`}
  </button>`;
}
function Shelf({ side }) {
  const teacher = side === 'teacher', admin = side === 'admin', student = side === 'student';
  const hint = useHint();
  const P = admin ? S.admin : teacher ? S.t : S.s;
  const tab = teacher ? S.t.shelfTab : admin ? S.admin.shelfTab : 'hall';
  const bt = P.bookTab || 'textbook';
  const ref = useRef();
  // 導覽要按的那本書在畫面下方時，捲過去
  useEffect(() => { const el = ref.current && ref.current.querySelector('.bk.hint'); if (el) el.scrollIntoView({ block: 'center' }); }, [HINT, tab, bt]);
  const subjects = [...new Set(TEXTBOOKS.map((b) => b.subject))];
  const open = (b) => {
    if (!b.live) return toast(side, `示範只開放《${BOOK_TITLE}》`);
    if (admin) return toast('admin', '示範不開放');
    if (teacher) openBook(); else { S.s.screen = 'reader'; S.s.page = 0; }
  };
  const card = (b) => html`<article class=${'bk ' + (b.live ? hint(teacher ? 't-open' : '') : '')}>
    <div class="bk-cover" role="button" tabindex="0" aria-label=${`閱讀「${b.title}」`} onClick=${act(() => open(b))} onKeyDown=${(e) => { if (e.key === 'Enter') { open(b); refresh(); } }}>
      ${b.cover ? html`<img src=${b.cover} alt="" draggable="false" />` : html`<${SubjectCover} subject=${b.subject} />`}<span class="bk-scrim"></span>
      <div class="bk-meta2"><small>${b.edition}</small><b>${b.title}</b></div>
      ${!student && html`<button class="bk-more" aria-label="更多" title="建立自編" onClick=${act((e) => { e.stopPropagation(); toast(side, '示範不包含建立自編'); })}><span>⋯</span></button>`}
    </div>
    <div class="bk-below">${admin && html`<span class="bk-status">已發布</span>`}</div></article>`;
  const tabs = student ? [SHELF_TABS[0]] : SHELF_TABS;
  return html`<div class="shelf" ref=${ref}>
    <header class="shelf-head">
      <div class="logo"><${Pebble} size=${48} /><div><div class="t1">數位教科書</div><div class="t2">Digital Textbook</div></div></div>
      <div class="head-right"><${AvatarMenu} side=${side} /></div>
    </header>
    <nav class="nav">
      <button class=${(tab === 'hall' ? 'on ' : '') + hint('t-hall')} onClick=${act(() => { if (teacher) { S.t.shelfTab = 'hall'; S.t.classView = null; } if (admin) S.admin.shelfTab = 'hall'; })}><${Icon} n="book" s=${20} />地球大廳</button>
      ${teacher && html`<button class=${(tab === 'classes' ? 'on ' : '') + hint('t-classes')} onClick=${act(() => { S.t.shelfTab = 'classes'; S.t.classView = null; })}><${Icon} n="users" s=${20} />班級星艦</button>`}
      ${teacher && html`<button class=${(tab === 'space' ? 'on ' : '') + hint('t-space')} onClick=${act(() => goSpace())}><${Icon} n="rocket" s=${20} />${NAME}</button>`}
      ${admin && html`<button class=${(tab === 'accounts' ? 'on ' : '') + hint('a-nav')} onClick=${act(() => { S.admin.shelfTab = 'accounts'; })}><${Icon} n="shield" s=${20} />帳號管理</button>`}
      ${side === 'student' && html`<${ShelfBuddy} />`}
    </nav>
    <section class="shelf-panel">
      ${tab === 'space' ? html`<${Space} />` : tab === 'accounts' ? html`<${Accounts} />` : tab === 'classes' ? (S.t.classView ? html`<${ClassPage} />` : html`<${MyClasses} />`) : html`
        ${tabs.length > 1 && html`<div class="tab-row"><div class="tabs" role="tablist" aria-label="教材種類">${tabs.map(([k, l]) => html`<button role="tab" aria-selected=${bt === k} class=${(bt === k ? 'on' : '') + (k === 'mine' ? ' ' + hint('t-minetab') : '')} onClick=${act(() => { P.bookTab = k; })}>${l}</button>`)}</div>
          ${admin && bt === 'textbook' && html`<button class="new-btn" onClick=${act(() => toast('admin', '示範不包含建立教材'))}><${Icon} n="plus" s=${16} />建立教材</button>`}</div>`}
        ${bt === 'textbook' ? subjects.map((sj) => html`<section class="sec"><div class="sec-h"><${Pebble} shape=${sj} size=${24} dark=${true} /><h2>${sj}</h2></div>
            <div class="bk-grid">${TEXTBOOKS.filter((b) => b.subject === sj).map(card)}</div></section>`)
          : bt === 'mine' && teacher ? html`<section class="sec"><div class="sec-h"><${Pebble} shape="自然科學" size=${24} dark=${true} /><h2>自然科學</h2></div>
            <div class="bk-grid"><article class=${'bk ' + hint('t-myedit')}><div class="bk-cover" role="button" tabindex="0" aria-label="編輯我的自編" onClick=${act(() => { S.t.screen = 'editor'; })}>
              <img src="assets/covers/science-5b-art.jpg" alt="" draggable="false" /><span class="bk-scrim"></span><div class="bk-meta2"><small>114 國小</small><b>自然 5下 · ${TEACHER}的自編</b></div></div>
              <div class="bk-below"><span class="bk-status">已共享</span></div></article></div></section>`
          : html`<div class="shelf-empty"><span class="ic sprite"><${Companion} shape="lime" eye="big" box=${88} cls="bob" /></span><p class="t">這裡還沒有${bt === 'shared' ? '共享教材' : '自編教材'}</p>
            <p class="h">${bt === 'shared' ? '在自編教材按「共享」，就會出現在這裡' : '到數位教科書，按課本卡片的「⋯」選「建立自編」就能建立一份'}</p></div>`}`}
    </section>
    ${teacher && S.stn.modal && S.stn.modal.detail && html`<${StnDetail} r=${S.stn.modal.detail} />`}
    ${admin && html`<${AdminModals} />`}
    ${S.profile && S.profile.side === side && html`<${ProfileDialog} />`}
    ${teacher && S.t.modal === 'join' && html`<${JoinDialog} />`}
    ${teacher && S.t.modal && S.t.modal.edit && html`<${StudentEdit} />`}
    ${teacher && S.t.modal && S.t.modal.remove && html`<${RemoveConfirm} />`}
    ${teacher && S.t.modal && S.t.modal.cards && html`<${AccountCards} />`}
    ${teacher && S.t.modal === 'apply' && html`<${ApplyDialog} />`}
  </div>`;
}

/* 個人資料：帳號、密碼同一列；老師、管理員可以直接改密碼，學生只能看（學生不能改密碼，2026-11-03） */
function ProfileDialog() {
  const pr = S.profile, side = pr.side;
  const me = side === 'admin' ? { name: '系統管理員', acct: 'admin@textbook.example', get pw() { return S.admin.pw; }, set pw(v) { S.admin.pw = v; } }
    : side === 'teacher' ? (() => { const t = S.admin.teachers.find((x) => x.me) || { pw: '12345678' }; return { name: TEACHER, acct: 'fang@star.example', get pw() { return t.pw || '12345678'; }, set pw(v) { t.pw = v; } }; })()
    : { name: STUDENTS[ME - 1].name, acct: STUDENTS[ME - 1].acct, get pw() { return STUDENTS[ME - 1].pw; }, set pw(v) { STUDENTS[ME - 1].pw = v; } };
  const cur = pr.pw == null ? me.pw : pr.pw, changed = pr.pw != null && pr.pw !== me.pw;
  const close = () => { S.profile = null; };
  return dlg('個人資料', html`<div class="pop-h"><h4>個人資料</h4><button class="x-btn" aria-label="關閉" onClick=${act(close)}><${Icon} n="x" /></button></div>
    <div class="pop-b"><div class="form-grid">
      <div class="fld full"><label for="pf-n">姓名</label><input class="inp" id="pf-n" value=${me.name} readonly /></div>
      <div class="fld"><label for="pf-a">帳號</label><input class="inp" id="pf-a" value=${me.acct} readonly /></div>
      <div class="fld"><label for="pf-p">密碼</label><input class="inp" id="pf-p" autocomplete="off" value=${cur} readonly=${side === 'student'} onInput=${act((e) => { pr.pw = e.target.value; })} /></div>
    </div>
    <div class="dialog-foot">${changed && html`<button class="btn sm" disabled=${!pr.pw.trim()} onClick=${act(() => { me.pw = pr.pw.trim(); close(); toast(side, '密碼已更新', 'check'); })}>儲存</button>`}</div></div>`, act(close));
}

/* 班級星艦 */
function MyClasses() {
  const hint = useHint();
  const cs = S.t.classes;
  return html`<div>
    <div class="page-h"><h2>班級星艦</h2><span class="spacer"></span>
      <button class=${'btn sm ' + hint('t-join')} onClick=${act(() => { S.t.modal = 'join'; S.t.joinDraft = { c: availableClasses()[0], subj: '自然' }; })}><${Icon} n="plus" s=${16} />新增班級</button></div>
    ${!cs.length ? html`<div class="empty-state"><${Companion} shape="lime" eye="big" box=${96} cls="bob" /><div>還沒有班級，按「新增班級」開始吧。</div></div>`
      : html`<div class="class-cards">${cs.map((x, i) => html`<div class=${'class-card ' + (x.c === '501' ? hint('t-classcard') : '')} role="button" tabindex="0" onClick=${act(() => openClass(x.c, x.subj))}>
          <svg class="cc-shape" viewBox="0 0 32 32" aria-hidden="true"><g transform=${fitShape(subjDef(x.subj)) || undefined}><path d=${subjDef(x.subj).d} fill=${subjDef(x.subj).light} /></g></svg>
          <span class="cn">${x.c}</span><${SubjChip} subj=${x.subj} />
          <div class="meta2">${x.c === '501' && html`<span class="faces">${roster().slice(0, 5).map((s) => html`<span class="av-circle" style="width:28px;height:28px;background:var(--raised);box-shadow:0 0 0 2px var(--raised)"><${Kid} seat=${s.seat} box=${22} cls="" /></span>`)}</span>`}${classSize(x.c)} 位學生</div>
          <button class="dots" aria-label="更多" onClick=${act((e) => { e.stopPropagation(); S.t.cardMenu = S.t.cardMenu === i ? null : i; })}>⋯</button>
          ${S.t.cardMenu === i && html`<div class="mini-menu" style="top:46px" onClick=${(e) => e.stopPropagation()}><button class="danger" onClick=${act(() => { S.t.classes.splice(i, 1); S.t.cardMenu = null; toast('teacher', `已退出 ${x.c} · ${x.subj}`); })}>退出班級</button></div>`}
        </div>`)}</div>`}
  </div>`;
}
function JoinDialog() {
  const d = S.t.joinDraft; const hint = useHint();
  const list = availableClasses();
  return html`<div class="scrim" onClick=${act((e) => { if (e.target === e.currentTarget) S.t.modal = null; })}>
    <div class="dialog" role="dialog" aria-label="新增班級">
      <div class="pop-h"><h4>新增班級</h4></div>
      <div class="pop-b">
        <div><div class="field-l">班級</div><${Dd} id="join-c" value=${d.c} options=${list.map((c) => [c, `${c}（${classSize(c)} 位學生）`])} onChange=${(v) => { d.c = v; }} />
          ${!list.length && html`<p class="note-line">還沒有班級，請管理員先建立學生帳號。</p>`}</div>
        <div><div class="field-l">任教科目</div><${Dd} id="join-s" value=${d.subj} options=${subjectsOf(SCHOOL).map((x) => [x, x])} onChange=${(v) => { d.subj = v; }} />
</div>
        <div class="dialog-foot"><button class="btn sec sm" onClick=${act(() => { S.t.modal = null; })}>取消</button><button class=${'btn sm ' + hint('t-join-go')} onClick=${act(() => (d.c ? joinClass(d.c, d.subj) : toast('teacher', '還沒有可以加入的班級')))}>新增</button></div>
      </div>
    </div>
  </div>`;
}

/* 班級頁：學生／老師／學生工具列／學習紀錄 */
function ClassPage() {
  const v = S.t.classView; const hint = useHint();
  const is501 = v.c === '501';
  const tab = (k, label, n) => html`<button class=${(v.tab === k ? 'on ' : '') + hint(k === 'toolbar' ? 't-tooltab' : k === 'records' ? 't-records' : '')} onClick=${act(() => { v.tab = k; v.menu = null; v.rec = { view: 'index' }; if (k === 'toolbar') S.tbDraft = [...(S.toolbar[`${v.c}·${v.subj}`] || S.toolbar['501·自然'])]; })}>${label}${n != null && html` <b>${n}</b>`}</button>`;
  return html`<div>
    <div class="cls-head"><button class="back" onClick=${act(() => { S.t.classView = null; })}><${Icon} n="chevron-left" s=${24} />${v.c}</button><${SubjChip} subj=${v.subj} /></div>
    <div class="ctabs">${tab('students', '學生', classSize(v.c))}${tab('teachers', '老師', 2)}${tab('toolbar', '學生工具列')}${tab('records', '學習紀錄')}
      ${v.tab === 'students' && html`<button class="ghost end" onClick=${act(() => { S.t.modal = { cards: v.c }; S.flags.cardsSeen = true; })}><${Icon} n="download" s=${16} />帳號小卡</button>`}</div>
    ${v.tab === 'students' && (is501 ? html`<div class="tbl-wrap"><table class="tbl"><thead><tr><th style="width:70px">座號</th><th>姓名</th><th>帳號</th><th></th></tr></thead><tbody>
        ${classRoster(v.c).map((s) => html`<tr><td class="num">${pad(s.seat)}</td><td><span class="namecell"><span class="av-circle" style="width:34px;height:34px"><${Kid} seat=${s.seat} box=${26} cls="" /></span>${s.name}</span></td><td class="num">${s.acct}</td>
          <td class="r"><button class="dots" aria-label="更多" onClick=${act(() => { v.menu = v.menu === s.seat ? null : s.seat; })}>⋯</button>
            ${v.menu === s.seat && html`<div class="mini-menu"><button onClick=${act(() => { v.menu = null; S.t.modal = { edit: s.seat, d: { ...s } }; })}>學生資料</button><button onClick=${act(() => { v.menu = null; v.tab = 'records'; v.rec = { view: 'total', person: s.seat }; })}>學習紀錄</button><button class="danger" onClick=${act(() => { v.menu = null; S.t.modal = { remove: s.seat }; })}>移出班級</button></div>`}</td></tr>`)}
      </tbody></table></div>`
      : html`<div class="tbl-wrap"><table class="tbl"><thead><tr><th style="width:70px">座號</th><th>姓名</th><th>帳號</th><th></th></tr></thead><tbody>
        ${classRoster(v.c).map((s) => html`<tr><td class="num">${pad(s.seat)}</td><td><span class="namecell"><span class="av-circle" style="width:34px;height:34px"><${Companion} shape=${ORDER[(s.seat * 3 + +v.c) % 8]} eye=${EYES[(s.seat * 7 + +v.c) % 10].id} box=${26} cls="" /></span>${s.name}</span></td><td class="num">${s.acct}</td>
          <td class="r"><button class="dots" aria-label="更多" onClick=${act(() => { v.menu = v.menu === s.seat ? null : s.seat; })}>⋯</button>
            ${v.menu === s.seat && html`<div class="mini-menu"><button onClick=${act(() => { v.menu = null; S.t.modal = { cards: v.c, only: s.seat }; })}>帳號小卡</button><button class="danger" onClick=${act(() => { v.menu = null; if (s.other) s.other.removed = true; else { const list = OTHER_ROSTER[v.c]; const i = list.findIndex((x) => x.seat === s.seat); if (i >= 0) list.splice(i, 1); } toast('teacher', `已將 ${s.name} 移出 ${v.c}`); })}>移出班級</button></div>`}</td></tr>`)}
      </tbody></table></div>`)}
    ${v.tab === 'teachers' && html`<table class="tbl"><thead><tr><th>姓名</th><th>帳號（信箱）</th><th>任教科目</th></tr></thead><tbody>
        <tr><td><span class="namecell"><span class="avatar" style="width:32px;height:32px;font-size:13px">方</span>${TEACHER}（你）</span></td><td class="num">fang@star.example</td><td><${SubjChip} subj=${v.subj} /></td></tr>
        <tr><td><span class="namecell"><span class="avatar" style="width:32px;height:32px;font-size:13px;background:var(--muted);color:var(--ink)">陳</span>陳怡芳</span></td><td class="num">chen@star.example</td><td><${SubjChip} subj="國語" /></td></tr>
      </tbody></table>`}
    ${v.tab === 'toolbar' && html`<${ToolbarSettings} />`}
    ${v.tab === 'records' && html`<${Records} />`}
  </div>`;
}
function StudentEdit() {
  const m = S.t.modal, d = m.d;
  return html`<div class="scrim" onClick=${act((e) => { if (e.target === e.currentTarget) S.t.modal = null; })}>
    <div class="dialog" role="dialog" aria-label="學生資料">
      <div class="pop-h"><h4>學生資料</h4></div>
      <div class="pop-b">
        <div class="form-grid">
          <div class="fld"><label for="e-name">姓名</label><input class="inp" id="e-name" value=${d.name} onInput=${(e) => { d.name = e.target.value; }} /></div>
          <div class="fld"><label for="e-seat">座號</label><input class="inp" id="e-seat" value=${pad(d.seat)} readonly /></div>
          <div class="fld"><label for="e-acct">帳號（只有管理員能改）</label><input class="inp" id="e-acct" value=${d.acct} readonly /></div>
          <div class="fld"><label for="e-pw">密碼</label><input class="inp" id="e-pw" value=${d.pw} onInput=${(e) => { d.pw = e.target.value; }} /></div>
          <div class="fld full"><label for="e-cls">班級（要換班請管理員改）</label><input class="inp" id="e-cls" value="501" readonly /></div>
        </div>
        <div class="dialog-foot"><button class="btn sec sm" onClick=${act(() => { S.t.modal = null; })}>取消</button><button class="btn sm" onClick=${act(() => { Object.assign(STUDENTS[m.edit - 1], { name: d.name.trim() || STUDENTS[m.edit - 1].name, pw: d.pw }); S.t.modal = null; toast('teacher', '已儲存'); })}>儲存</button></div>
      </div>
    </div>
  </div>`;
}
/* 帳號小卡：印出來剪開發給學生，掃 QR code 或打帳密都能登入 */
const qrSvg = (text) => { if (!window.qrcode) return ''; const q = window.qrcode(0, 'M'); q.addData(text); q.make(); return q.createSvgTag({ cellSize: 3, margin: 0, scalable: true }); };
function AccountCards() {
  const c = S.t.modal.cards; const close = () => { S.t.modal = null; };
  return html`<div class="scrim" onClick=${act((e) => { if (e.target === e.currentTarget) close(); })}>
    <div class="dialog cards-dlg" role="dialog" aria-label="帳號小卡">
      <div class="pop-h"><h4>${c} 帳號小卡</h4><button class="x-btn" aria-label="關閉" onClick=${act(close)}><${Icon} n="x" /></button></div>
      <div class="pop-b">
        <div class="acards">${classRoster(c).filter((x) => !S.t.modal.only || x.seat === S.t.modal.only).map((x) => html`<div class="acard">
          <span class="qr" dangerouslySetInnerHTML=${{ __html: qrSvg(`https://textbookforwork.github.io/q/${x.acct}`) }}></span>
          <div><b>${pad(x.seat)} ${x.name}</b><p><small>帳號</small><span class="num">${x.acct}</span></p><p><small>密碼</small><span class="num">${x.pw}</span></p></div></div>`)}</div>
        <div class="dialog-foot"><button class="btn sec sm" onClick=${act(() => { downloadCsv('teacher', `${c}_帳密清單.csv`, ['班級', '座號', '姓名', '帳號', '密碼'], classRoster(c).map((x) => [c, pad(x.seat), x.name, x.acct, x.pw || '12345678']), `已下載 ${c} 的帳密清單`); })}><${Icon} n="download" s=${16} />下載帳密清單</button><button class="btn sm" onClick=${() => window.print()}>列印小卡</button></div>
      </div>
    </div>
  </div>`;
}
function RemoveConfirm() {
  const seat = S.t.modal.remove;
  return html`<div class="scrim"><div class="dialog" role="dialog" aria-label="移出班級">
    <div class="pop-h"><h4>把 ${pad(seat)} ${nameOf(seat)} 移出 501？</h4></div>
    <div class="pop-b"><p style="margin:0;color:var(--text-2);line-height:1.7">帳號不會刪除，只是拿掉 501 這個班級。後台學生列表裡，他的班級欄會變成空白，管理員填回班級就會加回來。</p>
      <div class="dialog-foot"><button class="btn sec sm" onClick=${act(() => { S.t.modal = null; })}>取消</button><button class="btn sm danger" onClick=${act(() => {
        S.removed.push(seat); S.t.modal = null; toast('teacher', `已移出 ${nameOf(seat)}`);
      })}>移出班級</button></div></div>
  </div></div>`;
}
/* 左欄放得下幾格：學生平板高度扣掉固定的（夥伴、頁數、分隔線、工具箱、補充資源、設定），一格 52＋間距 4。
   4:3 以 1024×768、16:9 以 1280×720 估（2026-11-03）。*/
const RAIL_FIXED = 360, TILE_STEP = 56;
const DEVICE = { '4:3': [1024, 768], '16:9': [1280, 720] };
const railCap = (r) => Math.floor((DEVICE[r][1] - RAIL_FIXED) / TILE_STEP);
const slotsOf = (list) => list.length;
/* 學生工具列：預覽就是編輯器（2026-11-03 乙練）。左欄長什麼樣學生就看到什麼樣；× 拿掉、拖曳排序、最後一格空位按＋加入，滿 6 個就沒有空位 */
/* 按左欄的＋：打開跟閱讀時一樣的工具箱面板，工具分類排；點了就放進左欄，面板不關，可以連續加（2026-11-03 乙練） */
const TOOL_GROUPS = [['編輯工具', ['pen', 'highlighter', 'laser', 'eraser', 'undo', 'redo', 'clear', 'sticky']], ['學習工具', ['board']], ['科目工具', ['compass', 'protractor']]];
function SlotBox({ sel, add, close }) {
  const full = sel.length >= TOOL_CAP;
  return html`<div class="pop tb-pop slot-box">
    <div class="pop-h"><h4>工具箱</h4><button class="x-btn" aria-label="關閉" onClick=${act(close)}><${Icon} n="x" /></button></div>
    <div class="pop-b">${TOOL_GROUPS.map(([g, ks], gi) => html`<p class="grp-label">${g}</p><div class="toolgrid" style=${gi === TOOL_GROUPS.length - 1 ? { marginBottom: 0 } : null}>${ks.map((k) => { const t = toolOf(k), on = sel.includes(k);
      return html`<span class="tb-cell"><button class="tile" disabled=${on || full} title=${on ? '已經在左欄' : full ? '左欄滿了' : '放進左欄'} onClick=${act(() => add(k))}><${Icon} n=${t.icon} /><span>${t.label.length > 4 ? t.label.slice(0, 2) : t.label}</span></button>${!on && !full && html`<span class="add-x" aria-hidden="true"><${Icon} n="plus" s=${12} /></span>`}</span>`; })}</div>`)}</div>
  </div>`;
}
function ToolbarSettings() {
  const v = S.t.classView; const hint = useHint();
  if (!S.tbDraft) S.tbDraft = [...(S.toolbar[`${v.c}·${v.subj}`] || S.toolbar['501·自然'])];
  const sel = S.tbDraft;
  const open = !!S.tbOpen, setOpen = (x) => { S.tbOpen = x; refresh(); }; const [dragging, setDragging] = useState(null);
  const key = `${v.c}·${v.subj}`;
  if (!S.ratioDraft || S.ratioDraft.key !== key) S.ratioDraft = { key, r: S.ratio[key] || '4:3' };
  const r = S.ratioDraft.r, wide = r === '16:9';
  // 預覽撐滿整個內容寬，標題列、按鈕跟著對齊左右兩邊（2026-11-03 乙練：整塊靠左、右邊空一大塊很不協調）
  const boxRef = useRef(); const [cw, setCw] = useState(840);
  useLayoutEffect(() => { const el = boxRef.current; if (!el) return; const fit = () => setCw(el.clientWidth); fit(); const ro = new ResizeObserver(fit); ro.observe(el); return () => ro.disconnect(); }, []);
  const [VW, VH] = DEVICE[r], sc = Math.min(cw / VW, 560 / VH), left = TOOL_CAP - sel.length; // 高度也要放得進一個畫面，不用捲 // 依載具算格數先不做（2026-11-03 乙練：之後實測再說），上限維持 6
  const edit = { dragging, setDragging, open, canAdd: left >= 1, over: left < 0, options: TOOLS.filter((t) => !sel.includes(t.k)),
    toggle: () => setOpen(!open),
    add: (k) => { if (sel.length >= TOOL_CAP || sel.includes(k)) return; sel.push(k); if (k === 'sticky') S.flags.stickyAdded = true; }, // 加完不關，連續加
    remove: (k) => { sel.splice(sel.indexOf(k), 1); },
    move: (from, to) => { const i = sel.indexOf(from), j = sel.indexOf(to); if (i < 0 || j < 0) return; sel.splice(i, 1); sel.splice(j, 0, from); refresh(); } };
  return html`<div class="tb2-out" ref=${boxRef}><div class="tb2" style=${{ width: Math.round(VW * sc) + 'px' }}>
    <div class="tb2-h"><b>學生看到的樣子</b><div class="seg" role="radiogroup" aria-label="學生閱讀載具">${['4:3', '16:9'].map((x) => html`<button role="radio" aria-pressed=${r === x} onClick=${act(() => { S.ratioDraft.r = x; })}>${x}</button>`)}</div><span class="tb2-sp"></span><button class="btn sec sm" onClick=${act(() => { S.t.modal = 'apply'; })}>套用到其他班</button><button class=${'btn sm ' + hint('t-toolsave')} onClick=${act(() => { S.toolbar[key] = [...sel]; S.ratio[key] = r; S.flags.toolbarSaved = true; toast('teacher', '已儲存'); })}>儲存</button></div>
    <p class="tb2-note">在這裡設定學生側欄的預設工具列，最多可以放 6 個；其他工具，學生可以在工具箱中自行選取。</p>
    <div class="tb2-screen" style=${{ width: Math.round(VW * sc) + 'px', height: Math.round(VH * sc) + 'px' }}><div class="tb-preview" style=${{ width: VW + 'px', height: VH + 'px', transform: `scale(${sc})` }}>
      <div class="reader tb-reader"><${Rail} side="student" preview=${[...sel, 'supp', 'settings']} edit=${edit} />
        ${open && html`<${SlotBox} sel=${sel} add=${edit.add} close=${() => setOpen(false)} />`}
        <div class="pageframe" inert><${Sheet} page=${sPage()} w=${Math.min(VW - 104 - 24, (VH - 94) * pr(sPage(), S.s.rs))} rs=${S.s.rs} /></div></div></div></div>
  </div></div>`;
}
function ApplyDialog() {
  const v = S.t.classView;
  const others = S.t.classes.filter((x) => x.subj === v.subj && x.c !== v.c);
  return html`<div class="scrim" onClick=${act((e) => { if (e.target === e.currentTarget) S.t.modal = null; })}>
    <div class="dialog" role="dialog" aria-label="套用到其他班">
      <div class="pop-h"><h4>把「${v.c}」的工具列也套用到…</h4></div>
      <div class="pop-b">${others.length ? others.map((x) => html`<label class="chk"><input type="checkbox" checked />${x.c} · ${x.subj}</label>`) : html`<p class="muted" style="margin:0">你目前只任教 ${v.c} 的${v.subj}。加入其他班之後，可以在這裡一次套用。</p>`}
        <div class="dialog-foot"><button class="btn sec sm" onClick=${act(() => { S.t.modal = null; })}>取消</button><button class="btn sm" disabled=${!others.length} onClick=${act(() => { others.forEach((x) => { S.toolbar[`${x.c}·${x.subj}`] = [...S.tbDraft]; }); S.t.modal = null; toast('teacher', '已套用'); })}>套用</button></div></div>
    </div>
  </div>`;
}

/* ───────── 學習紀錄（班級頁的分頁） ───────── */
const secLabel = (s) => (s.sec ? s.sec + ((s.secs || []).length > 1 ? ' 等' : '') : ''); // 上過好幾節：開始那一節＋「等」（2026-11-03 乙練）
const sessName = (s) => s.name || secLabel(s) || `${s.date} ${s.time}`; // 沒取名就用開課時那一節的名稱（2026-11-03）
const totalOf = (seat) => S.sessions.reduce((a, s) => a + (s.scores[seat] || 0), 0);
function Records() {
  const v = S.t.classView, r = v.rec; const hint = useHint();
  const back = (to) => html`<button class=${'back ' + hint('t-rec-back')} onClick=${act(() => { v.rec = to; })}><${Icon} n="chevron-left" s=${18} /></button>`;
  const fmt = (n) => (n > 0 ? '+' + n : String(n));
  // 學習紀錄入口：跟班級星艦的班級卡同一套卡片（2026-11-03 乙練：原本的長條列表跟其他頁不協調）
  if (r.view === 'index') return html`<div class="rec-cards">
    <button class=${'class-card rec-card ' + hint('t-rec-score')} onClick=${act(() => { v.rec = { view: 'sessions' }; })}><span class="rc-ic"><${Icon} n="star" s=${22} /></span><b>加分紀錄</b></button>
    <button class=${'class-card rec-card ' + hint('t-rec-task')} onClick=${act(() => { v.rec = { view: 'tasks' }; })}><span class="rc-ic"><${Icon} n="send" s=${22} /></span><b>任務紀錄</b></button></div>`;
  if (r.view === 'sessions') return html`<div>
    <div class="rec-h">${back({ view: 'index' })}<b style="font-size:18px">加分紀錄</b></div>
    <div class="rec-list">
      <button class=${'rec-row total ' + hint('t-rec-total')} onClick=${act(() => { v.rec = { view: 'total' }; })}><span>累計總分（本學期）</span><span class="spacer"></span><${Icon} n="chevron-right" /></button>
      ${S.sessions.map((s, i) => html`<div class=${'rec-row ' + (i === 0 ? hint('t-rec-session') : '')} role="button" tabindex="0" onClick=${act(() => { v.rec = { view: 'session', id: s.id, sort: 'seat' }; S.flags.sessionSeen = true; })}>
        <span class="when">${s.date} ${s.time}</span>
        ${r.edit === s.id ? html`<input class="inp nm-edit" id=${'nm-' + s.id} value=${s.name || secLabel(s)} placeholder="幫這堂課取個名字" ref=${(el) => { if (el && !el.dataset.f) { el.dataset.f = 1; el.focus(); el.select(); } }} onClick=${(e) => e.stopPropagation()} onInput=${(e) => { s.name = e.target.value; }} onKeyDown=${act((e) => { if (e.key === 'Enter' || e.key === 'Escape') r.edit = null; })} onBlur=${act(() => { if (r.edit === s.id) r.edit = null; })} />`
          : html`<span class="sess-nm">${s.name || secLabel(s)}</span>`}
        ${s.live && html`<span class="chip">上課中</span>`}
        <span class="spacer"></span>
        <button class="pencil" aria-label="改名" onClick=${act((e) => { S.flags.renameSeen = true; e.stopPropagation(); r.edit = r.edit === s.id ? null : s.id; })}><${Icon} n=${r.edit === s.id ? 'check' : 'pencil2'} s=${16} /></button><${Icon} n="chevron-right" /></div>`)}
    </div></div>`;
  /* 2026-11-03 乙練：30 格一樣重、看不出重點 → 上方一行先講重點；0 分變淡、有分的才有分數膠囊；排序改成兩顆切換 */
  const scoreRow = (x, n, top, extra = {}) => html`<${extra.onClick ? 'button' : 'div'} class=${'pt2' + (n === 0 ? ' zero' : '') + (extra.sel ? ' sel' : '') + (extra.cls ? ' ' + extra.cls : '')} onClick=${extra.onClick}>
    <span class="sn">${pad(x.seat)}</span><span class="nm">${x.name}</span>
    ${n !== 0 && html`<b class=${'sc' + (n < 0 ? ' neg' : '')}>${fmt(n)}</b>`}</${extra.onClick ? 'button' : 'div'}>`;
  const sortSeg = html`<div class="seg" role="radiogroup" aria-label="排序">${[['seat', '座號'], ['score', '分數']].map(([k, l]) => html`<button role="radio" aria-pressed=${(r.sort || 'seat') === k} onClick=${act(() => { r.sort = k; })}>${l}</button>`)}</div>`;
  const exportBtn = html`<button class="ghost" onClick=${act(() => toast('teacher', '已匯出 Excel'))}><${Icon} n="download" s=${15} />匯出 Excel</button>`;
  const sorted = (get) => [...roster()].sort((a, b) => (r.sort === 'score' ? get(b.seat) - get(a.seat) || a.seat - b.seat : a.seat - b.seat));
  if (r.view === 'session') {
    const s = S.sessions.find((x) => x.id === r.id) || S.sessions[0];
    const get = (seat) => s.scores[seat] || 0;
    const got = roster().filter((x) => get(x.seat) > 0), sum = roster().reduce((a, x) => a + get(x.seat), 0);
    const top = Math.max(0, ...roster().map((x) => get(x.seat))), tops = top > 0 ? roster().filter((x) => get(x.seat) === top) : [];
    return html`<div>
      <div class="rec-h">${back({ view: 'sessions' })}<b style="font-size:18px">${sessName(s)}</b><small>${s.date} ${s.time}</small><span class="spacer"></span>${sortSeg}${exportBtn}</div>
      <div class="pts2">${sorted(get).map((x) => scoreRow(x, get(x.seat), top))}</div></div>`;
  }
  if (r.view === 'total') {
    const person = r.person;
    const top = Math.max(0, ...roster().map((x) => totalOf(x.seat)));
    const avg = Math.round(roster().reduce((a, x) => a + totalOf(x.seat), 0) / Math.max(1, roster().length) * 10) / 10;
    const never = roster().filter((x) => !S.sessions.some((ss) => (ss.scores[x.seat] || 0) > 0)).length;
    return html`<div class="rec-wrap">
      <div class="rec-h">${back({ view: 'sessions' })}<b style="font-size:18px">累計總分（本學期）</b><span class="spacer"></span>${sortSeg}${exportBtn}</div>
      <div class="pts2" style=${{ paddingRight: person ? '340px' : 0 }}>${sorted(totalOf).map((x) => scoreRow(x, totalOf(x.seat), top, { onClick: act(() => { r.person = r.person === x.seat ? null : x.seat; S.flags.personSeen = true; }), sel: person === x.seat, cls: x.seat === ME ? hint('t-rec-person') : '' }))}</div>
      ${person && html`<aside class="side-panel"><div style="display:flex;align-items:center;gap:10px"><span class="av-circle" style="width:44px;height:44px"><${Kid} seat=${person} box=${34} /></span><h4>${pad(person)} ${nameOf(person)}<small>累計 ${totalOf(person)} 分</small></h4>
          <button class="x-btn" style="margin-left:auto" aria-label="收起" onClick=${act(() => { r.person = null; })}><${Icon} n="x" /></button></div>
        <ul>${S.sessions.map((s) => { const n = s.scores[person] || 0; return html`<li><small>${s.date}</small>${s.name || s.time}<b class=${n === 0 ? 'zero' : ''}>${fmt(n)}</b></li>`; })}</ul>
</aside>`}
    </div>`;
  }
  if (r.view === 'tasks') return html`<div>
    <div class="rec-h">${back({ view: 'index' })}<b style="font-size:18px">任務紀錄</b></div>
    <table class="tbl"><thead><tr><th>日期時間</th><th>題型</th><th>題目</th><th>作答人數</th><th></th></tr></thead><tbody>
      ${S.taskLog.map((t, i) => html`<tr style="cursor:pointer" class=${i === 0 ? hint('t-rec-taskrow') : ''} onClick=${act(() => { v.rec = { view: 'task', id: t.id }; S.flags.taskRecSeen = true; })}>
        <td class="num">${t.when}</td><td>${typeName(t)}</td><td>${t.q || html`<span class="muted">未填題目</span>`}</td><td class="num">${answeredCount(t)}／${present().length}</td><td class="r"><${Icon} n="chevron-right" s=${18} /></td></tr>`)}
    </tbody></table></div>`;
  if (r.view === 'task') {
    const t = S.taskLog.find((x) => x.id === r.id) || S.taskLog[0];
    return html`<div>
      <div class="rec-h">${back({ view: 'tasks' })}<b style="font-size:18px">${t.q || '未填題目'}</b><small>${t.when} · ${typeName(t)}</small><span class="spacer"></span>
        ${!r.editQ && html`<button class="ghost" onClick=${act(() => { r.editQ = true; })}><${Icon} n="pencil2" s=${15} />${t.q ? '編輯題目' : '補上題目'}</button>`}</div>
      ${r.editQ && html`<${QEdit} t=${t} opts=${t.type === 'choice'} onDone=${act(() => { r.editQ = false; })} />`}
      ${t.type === 'choice' ? html`<${ChoiceResult} t=${t} records=${true} />` : html`<${ReturnResult} t=${t} records=${true} />`}
    </div>`;
  }
  return null;
}
const TYPE_NAME = { choice: '選擇題', text: '文字題', shot: '手寫題', voice: '聲音題' };
const answeredCount = (t) => Object.keys(t.type === 'choice' ? t.answers : t.type === 'text' ? t.texts : t.type === 'voice' ? t.voices || {} : t.subs).length;

/* 課後補題目：平常只讀（題目、選項文字），按「編輯」才變成輸入欄，按「完成」收回（2026-11-03 乙練：不要一打開就能改） */
function QEdit({ t, opts, onDone }) {
  const letters = optLetters(t);
  return html`<div class="q-edit q-box">
    <input class="inp" aria-label="題目" value=${t.q} placeholder="輸入題目" ref=${(el) => el && !el.dataset.f && (el.dataset.f = 1, el.focus())} onInput=${act((e) => { t.q = e.target.value; })} />
    ${opts && html`<div class="opt-rows cp-field">${letters.map((L, i) => html`<label>${L}<input class="inp" value=${(t.opts || [])[i] || ''} placeholder=${'選項 ' + L} onInput=${act((e) => { t.opts = t.opts || []; t.opts[i] = e.target.value; })} /></label>`)}</div>`}
    <div class="q-done"><button class="btn sm" onClick=${onDone}>完成</button></div>
  </div>`;
}
/* 學習紀錄裡的選擇題：跟上課時「已公布答案」同一個畫面，只是不能加分 */
function ChoiceResult({ t }) {
  const [grp, setGrp] = useState('right');
  const letters = optLetters(t);
  const seats = present().map((x) => x.seat);
  const answered = Object.keys(t.answers).length;
  const counts = letters.map((L) => Object.values(t.answers).filter((v) => v === L).length);
  const max = Math.max(1, ...counts);
  const right = seats.filter((x) => t.answers[x] && t.answers[x] === t.correct);
  const wrong = seats.filter((x) => t.answers[x] && t.answers[x] !== t.correct);
  const none = seats.filter((x) => !t.answers[x]);
  const groups = { right, wrong, none };
  return html`<div class="ch-pop">
    <div class="bars-h"><b>答對 ${right.length}／${answered} 人</b><span class="muted">${answered ? Math.round(right.length / answered * 100) : 0}%</span></div>
    <div class="bars">${letters.map((L, i) => html`<button class=${'cbar' + (L === t.correct ? ' ok' : '')} disabled><span>${counts[i]} 人</span><i style=${{ height: (counts[i] / max) * 180 + 'px' }}></i></button>`)}</div>
    <div class="bar-l">${letters.map((L, i) => html`<span class=${L === t.correct ? 'ok' : ''}>${L === t.correct ? '✓ ' : ''}${L}${t.opts[i] ? html`<small>${t.opts[i]}</small>` : ''}</span>`)}</div>
    <div class="grp">${[['right', '答對'], ['wrong', '答錯'], ['none', '沒作答']].map(([k, l]) => html`<button class=${grp === k ? 'on' : ''} onClick=${() => setGrp(k)}>${l} ${groups[k].length}</button>`)}</div>
    <div class="who-chose">${groups[grp].map((x) => html`<span>${pad(x)} ${nameOf(x)}</span>`)}${!groups[grp].length && '沒有人'}</div>
  </div>`;
}
function ReturnResult({ t, records }) {
  const [big, setBig] = useState(null);
  const seats = present().map((s) => s.seat);
  if (big) return html`<${TextBig} t=${t} seat=${big} onBack=${() => setBig(null)} records=${records} />`;
  return html`<div>
    <div class="rec-sum"><span><b>${answeredCount(t)}</b>／${seats.length} 回傳</span></div>
    ${t.type !== 'voice' && (() => { const miss = seats.filter((x) => !(t.type === 'text' ? t.texts[x] : t.subs[x])); return miss.length > 0 && html`<div class="miss-line">沒交 ${miss.length} 人：${miss.map((x) => html`<span>${pad(x)} ${nameOf(x)}</span>`)}</div>`; })()}
    ${t.type === 'voice' ? html`<div class="vs-grid">${seats.filter((x) => (t.voices || {})[x]).map((seat) => html`<${VoiceSeat} t=${t} seat=${seat} readonly />`)}</div>
      ${seats.some((x) => !(t.voices || {})[x]) && html`<div class="v-none"><b>未作答</b>${seats.filter((x) => !(t.voices || {})[x]).map((x) => html`<span>${pad(x)} ${nameOf(x)}</span>`)}</div>`}`
      : t.type === 'text'
      ? html`<div class="text-cards">${seats.map((seat) => t.texts[seat] ? html`<button class="tcard" onClick=${() => setBig(seat)}><span class="who2"><span class="seat">${pad(seat)}</span>${nameOf(seat)}</span>${t.texts[seat]}</button>` : '')}</div>`
      : html`<div class="subs">${seats.map((seat) => { const sub = t.subs[seat]; return sub ? html`<div class="sub"><div class="box"><${MiniWork} t=${t} layers=${[sub.ink, sub.notes]} /></div><div class="nm"><span class="seat">${pad(seat)}</span>${nameOf(seat)}</div></div>` : ''; })}</div>`}
  </div>`;
}
function TextBig({ t, seat, onBack, records }) {
  const hint = useHint();
  const seats = present().map((s) => s.seat).filter((s) => t.texts[s]);
  const [cur, setCurRaw] = useState(seat);
  const shared = !records && S.shared && S.shared.type === 'text';
  const setCur = (x) => { setCurRaw(x); if (shared) { S.shared = { ...S.shared, seat: x }; refresh(); } }; // 分享中換人，全班跟著換
  const idx = seats.indexOf(cur), got = (t.gave || {})[cur] || 0;
  const back = () => { if (shared) unshare(); onBack(); };
  return html`<div class="tb-full">
    <div class="text-big">${t.texts[cur]}</div>
    <div class="detail-top">
      <button class=${'btn sm sec dt-back ' + hint('t-detail-back')} onClick=${act(back)}><${Icon} n="arrow-left" s=${18} />返回</button>
      <${WhoNav} t=${t} seat=${cur} idx=${idx} n=${seats.length} go=${(i) => setCur(seats[i])} score=${!records} />
      <span class="spacer"></span>${!records && html`<${WhoPlus} t=${t} seat=${cur} />`}
      ${!records && (shared ? html`<button class="btn sm sec" onClick=${act(unshare)}>停止分享</button>` : html`<button class="btn sm" onClick=${act(() => { S.shared = { seat: cur, type: 'text', anon: false }; toast('teacher', '已分享畫面'); })}><${Icon} n="cast" s=${16} />分享畫面</button>`)}
    </div>
  </div>`;
}

/* ───────── 登入（學生） ───────── */
function Login() {
  const hint = useHint();
  return html`<div class="login">
    <div class="l">
      <div class="logo"><${Pebble} size=${56} /><div><div class="t1">數位教科書</div><div class="t2">Digital Textbook</div></div></div>
      <h1>WELCOME !</h1>
      <form onSubmit=${(e) => { e.preventDefault(); studentLogin(); refresh(); }}>
        <label for="acc">帳號</label><input id="acc" value="xg50112" readonly />
        <label for="pw">密碼</label><input id="pw" type="password" value=${STUDENTS[ME - 1].pw} readonly />
        <button class=${'go ' + hint('s-login')} type="submit"><span>進入數位教科書</span><span class="arrow"><${Icon} n="arrow-right" s=${20} /></span></button>

      </form>
    </div>
    <div class="r"><div class="shapes" aria-hidden="true"></div></div>
  </div>`;
}
/* 學生第一次登入：先選一位形狀夥伴（個性跟著形狀走），再幫它選一雙眼睛（只改長相）——照 Rong 原型新版 */
function Pick() {
  const s = S.s, d = s.draft; const hint = useHint();
  const shape = d.shape, P = shape && PERSONA[shape], E = EYES.find((e) => e.id === d.eye) || EYES[0];
  return html`<div class="pick">
    <div class="l">
      <div class="logo"><${Pebble} size=${44} /><div><div class="t1" style="font-size:20px">數位教科書</div></div></div>
      <span class="stepno">第一次來 · ${s.pickStep} / 2</span>
      <h1>${s.pickStep === 1 ? '選一位學習夥伴' : `幫${SH[shape || 'pink'].name}選一雙眼睛`}</h1>
      <p>${s.pickStep === 1 ? '每個形狀天生有自己的個性。點右邊的形狀認識牠們。' : '眼睛決定它看起來的樣子，但不會改變它是誰。'}</p>
      <div class="you">${!shape ? html`<span class="muted">點右邊的形狀，看看牠是怎樣的夥伴 →</span>`
        : s.pickStep === 1 ? html`<${Companion} shape=${shape} eye="big" box=${140} key=${shape} cls="jump" /><div class="persona"><b>${SH[shape].name}</b><span class="tag">${P.tag}</span><small>${P.core}・${P.style}</small><q>${P.quote}</q></div>`
        : html`<${Companion} shape=${shape} eye=${d.eye} box=${140} key=${d.eye} cls="jump" /><div class="persona"><b>${SH[shape].name} × ${E.name}</b><small>原廠個性：${P.core}</small><span class="tag">${E.desc}</span></div>`}</div>
      <div class="acts">${s.pickStep === 1
        ? html`<button class=${'btn ' + hint('s-shape-next')} disabled=${!shape} onClick=${act(() => { s.pickStep = 2; })}>${shape ? `和${SH[shape].name}一起出發` : '下一步：選眼睛'}<${Icon} n="arrow-right" s=${18} /></button>`
        : html`<button class="btn sec" onClick=${act(() => { s.pickStep = 1; })}>上一步</button><button class=${'btn ' + hint('s-pick-done')} onClick=${act(finishPick)}>完成，去書櫃</button>`}</div>
    </div>
    <div class="r">${s.pickStep === 1
      ? html`<div class="shape-grid">${ORDER.map((k) => html`<button class=${'shape-opt' + (shape === k ? ' on' : '') + ' ' + (k === 'pink' ? hint('s-shape') : '')} onClick=${act(() => { d.shape = k; })}><${Companion} shape=${k} eye="big" box=${96} cls="" />${SH[k].name}<small>${PERSONA[k].core}</small></button>`)}</div>`
      : html`<div class="eye-grid">${EYES.map((e) => html`<button class=${'eye-opt' + (d.eye === e.id ? ' on' : '') + ' ' + (e.id === 'happy' ? hint('s-eye') : '')} onClick=${act(() => { d.eye = e.id; })}><${Companion} shape=${shape || 'pink'} eye=${e.id} box=${70} cls="" /><b>${e.name}</b></button>`)}</div>`}</div>
  </div>`;
}

/* ───────── 老師端 ───────── */
function TeacherApp() {
  const t = S.t;
  const live = S.cls.live;
  const [, tick] = useState(0);
  useEffect(() => { if (!live) return; const id = setInterval(() => tick((x) => x + 1), 1000); return () => clearInterval(id); }, [live]);
  // 併進編輯器後：這裡只畫閱讀畫面，書櫃與補給站的編輯畫面由編輯器的網址決定（Root.tsx）
  const hint = useHint();
  const page = t.page, pid = PAGES[page].id;
  const w = fitW(page, t.rs);
  const assigning = t.pop === 'task' && S.compose === 'shot' && (!S.draft || (S.draft.bg || 'page') === 'page');
  const left = timeLeft();
  const openStart = () => { t.modal = 'start'; t.draft = { ci: Math.max(0, t.classes.findIndex((x) => x.c === '501')), mode: 'free' }; t.pop = null; };
  return html`<div class=${'reader' + (BAR !== 'top' ? ' bar-' + BAR : '') + (BAR === 'toolbox' && live && t.barOpen ? ' cb-open' : '')}>
    <${Rail} side="teacher" />
    ${BAR === 'toolbox' || BAR === 'rail' ? (live && S.t.barOpen && html`<${ClassBar} />`) : BAR !== 'top' && (live ? html`<${ClassBar} />` : html`<div class=${'class-bar ' + BAR}>${PAGER_POS === 'capsule' && html`<${HPager} /><span class="cb-sep"></span>`}<button class=${'btn ' + hint('t-start')} onClick=${act(openStart)}>開始上課</button></div>`)}
    ${BAR !== 'top' && S.timer && t.pop !== 'timer' && html`<div class="timer-pin" title="按住拖曳" style=${t.timerPos ? { left: t.timerPos.x + 'px', top: t.timerPos.y + 'px' } : null} onPointerDown=${dragPin}><${TimerPop} pinned /></div>`}
    <div class="topbar" style=${BAR !== 'top' ? { display: 'none' } : null}>
      ${live ? html`<span class="title">${S.cls.cid}</span>
        <button class=${'pill ' + hint('t-roster')} style="cursor:pointer;border:0" onClick=${act(() => { t.pop = t.pop === 'roster' ? null : 'roster'; t.scoreMode = 'plus'; S.flags.rosterSeen = true; S.flags.scoreOpened = true; })}><i class="live-dot"></i>上課中<span style="color:var(--line)">｜</span><${Icon} n="users" s=${16} /><b style="font-variant-numeric:tabular-nums">${S.cls.joined.length}</b><span style="color:var(--text-2)">/ ${present().length + ABSENT.length}</span><${Icon} n="chevron-down" s=${14} /></button>
        ${S.timer && html`<button class=${'pill timer-pill' + (S.timer.done ? ' done' : '')} onClick=${act(() => { t.pop = 'timer'; })}><${Icon} n="timer" s=${16} />${S.timer.done ? '時間到' : (S.timer.paused ? '暫停 ' : '') + mmss(timeLeft())}</button>`}`
        : html`${S.timer && html`<button class=${'pill timer-pill' + (S.timer.done ? ' done' : '')} onClick=${act(() => { t.pop = 'timer'; })}><${Icon} n="timer" s=${16} />${S.timer.done ? '時間到' : (S.timer.paused ? '暫停 ' : '') + mmss(timeLeft())}</button>`}`}
      <span class="spacer"></span>
      ${live ? html`
        <div class=${'seg ' + hint('t-mode')} role="group" aria-label="同步模式">
          <button aria-pressed=${S.cls.mode === 'free'} onClick=${act(() => setMode('free'))}>自由閱讀</button>
          <button aria-pressed=${S.cls.mode === 'lock'} disabled=${liveT()} onClick=${act(() => setMode('lock'))}><${Icon} n="lock" s=${15} />鎖定螢幕</button>
        </div>
        <button class=${'btn sec ' + hint('t-end')} onClick=${act(endClass)}>下課</button>`
        : BAR === 'top' ? html`<button class=${'btn ' + hint('t-start')} onClick=${act(openStart)}>開始上課</button>` : ''}
    </div>
    <div class="pageframe">
      ${S.shared && S.t.pop !== 'task' && html`<div class="page-flag lime"><${Icon} n="cast" />全班正在看${S.shared.anon ? '一位同學' : ` ${pad(S.shared.seat)} ${nameOf(S.shared.seat)} `}的作品</div>`}
      <${Sheet} page=${page} w=${w} rs=${t.rs} cls=${assigning ? 'assigning' : ''} layers=${[pgl(t.ink, pid)]} f=${focusOn(page)} tap=${!t.tool}
        draw=${html`<${DrawLayer} page=${page} tool=${t.tool} brush=${t.brush[t.tool === 'compass' ? 'pen' : t.tool]}
          onStroke=${act((s) => { pgl(t.ink, pid).push(s); t.redo = []; if (t.tool === 'pen') S.flags.penSet = true; })} onErase=${act((p) => eraseAt(pgl(t.ink, pid), p))} onEraseRect=${act((r) => { eraseRect(pgl(t.ink, pid), r); eraseStickers(pgl(t.stickers, pid), r); S.flags.boxErased = true; })}
          onPlace=${act((p) => { pgl(t.stickers, pid).push({ id: uid(), x: p[0], y: p[1], e: t.sticker }); S.flags.noteUsed = true; })} />`}>
        <${Stickers} P=${t} page=${page} /><${Notes} P=${t} page=${page} />
      </${Sheet}>
    ${t.stickerPop && html`<${StickerPop} side="teacher" />`}
    </div>
    ${t.board && t.board.open && html`<${Board} side="teacher" />`}
    ${t.mtools && Object.keys(t.mtools).length > 0 && html`<${MathTools} side="teacher" />`}
    ${t.hl && html`<${HighlightView} side="teacher" />`}
    ${t.inkPop && BRUSHES.includes(t.tool) && html`<${InkPop} side="teacher" />`}
    ${t.pop === 'supp' && html`<${BRIDGE.Supplements} side="teacher" />`}
    ${t.pop && t.pop !== 'supp' && html`<${Layer} P=${t} center=${t.pop !== 'settings' && t.pop !== 'toc' && !(BAR === 'toolbox' && t.barOpen && ((t.pop === 'task' && !S.task) || t.pop === 'roster'))}>
      ${t.pop === 'toc' && html`<${Toc} side="teacher" />`}
      ${t.pop === 'toolbox' && html`<${Toolbox} side="teacher" />`}
      ${t.pop === 'settings' && html`<${BRIDGE.ReadSettings} side="teacher" />`}
      ${t.pop === 'roster' && html`<${ClassPanel} />`}
      ${t.pop === 'task' && html`<${TaskPanel} />`}
      ${t.pop === 'timer' && html`<${TimerPop} />`}
      ${t.pop === 'group' && html`<${GroupPop} />`}
      ${t.pop === 'lottery' && html`<${LotteryPop} />`}
      ${t.pop === 'math' && html`<${MathPop} side="teacher" />`}
      </${Layer}>`}
    ${t.modal === 'start' && html`<${StartDialog} />`}
    ${t.modal === 'leave' && html`<${LeaveDialog} />`}
  </div>`;
}
/* 上課中按回首頁：結束上課就照「結束上課」處理再回書櫃；繼續上課就留在原頁 */
function LeaveDialog() {
  const t = S.t;
  const stay = act(() => { t.modal = null; });
  return html`<div class="scrim" onClick=${(e) => { if (e.target === e.currentTarget) stay(); }}>
    <div class="dialog" role="alertdialog" aria-label="要下課嗎？" style="width:440px">
      <div class="pop-h"><h4>要下課嗎？</h4></div>
      <div class="pop-b">
        <div class="dialog-foot"><button class="btn sec sm" onClick=${stay}>繼續上課</button><button class="btn sm" onClick=${act(() => { t.modal = null; endClass(); t.screen = 'shelf'; t.pop = null; t.tool = null; BRIDGE.goShelf(); })}>下課</button></div>
      </div>
    </div>
  </div>`;
}
/* 上課控制列（2026-11-03 乙練要比較）：BAR = 'top' 原本上方一列｜'dock' 固定在下緣正中間｜'float' 浮動、可拖曳
   三樣東西：班級＋到課人數（點開名單）、鎖定開關（預設自由閱讀，按下去變鎖定）、結束上課 */
let BAR = 'toolbox', BARPOS = null; // 預設收進工具箱（2026-11-03 乙練：比較喜歡收到工具箱）
let OPTS_OPEN = false;
let PAGER_POS = 'rail'; // 老師頁數：'top' 左欄上方｜'rail' 左欄最下面、設定底下（2026-11-03 乙練要試）｜'capsule' 左下膠囊最前面
function HPager() {
  const page = S.t.page;
  return html`<span class="hpager"><button aria-label="上一頁" disabled=${page === 0} onClick=${act(() => turn('teacher', -1))}><${Icon} n="chevron-left" s=${18} /></button><b>${PAGES[page].nums[0]}</b><button aria-label="下一頁" disabled=${page === PAGES.length - 1} onClick=${act(() => turn('teacher', 1))}><${Icon} n="chevron-right" s=${18} /></button></span>`;
}
function ClassBar() {
  const t = S.t; const hint = useHint(); const lock = S.cls.mode === 'lock';
  const drag = (e) => {
    const bar = e.currentTarget.closest('.class-bar'), stage = bar.closest('.stage'); if (!stage) return;
    const k = stage.getBoundingClientRect().width / stage.offsetWidth, r = bar.getBoundingClientRect(), sr = stage.getBoundingClientRect();
    const ox = (e.clientX - r.left) / k, oy = (e.clientY - r.top) / k; e.preventDefault();
    const mv = (ev) => { BARPOS = { x: Math.max(8, Math.min(stage.offsetWidth - r.width / k - 8, (ev.clientX - sr.left) / k - ox)), y: Math.max(8, Math.min(stage.offsetHeight - r.height / k - 8, (ev.clientY - sr.top) / k - oy)) }; refresh(); };
    const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up);
  };
  // 左欄「上課同步」展開的膠囊：中線對齊那一格（2026-11-03）
  if (BAR === 'toolbox') { return html`<div class="class-bar under" ref=${(el) => { if (!el) return; const r = el.closest('.reader'), sh = r && r.querySelector('.pageframe .sheet'); if (!sh) return; const top = Math.min(sh.getBoundingClientRect().bottom - r.getBoundingClientRect().top, r.getBoundingClientRect().height) / (r.getBoundingClientRect().height / r.offsetHeight) + 10; const y = Math.min(top, r.offsetHeight - el.offsetHeight - 12); el.style.top = y + 'px'; el.style.bottom = 'auto'; r.style.setProperty('--cb-top', y + 'px'); }}>${PAGER_POS === 'capsule' && html`<${HPager} /><span class="cb-sep"></span>`}<button class=${'cb-cls' + (t.pop === 'roster' ? ' on' : '') + ' ' + hint('t-roster')} aria-label="名單與加分" onClick=${act(() => { t.pop = t.pop === 'roster' ? null : 'roster'; t.scoreMode = 'plus'; S.flags.rosterSeen = true; S.flags.scoreOpened = true; })}>${S.cls.cid}<span class="n">${S.cls.joined.length}/${present().length}</span><${Icon} n="chevron-up" s=${15} /></button><span class="cb-sep"></span><button class=${'cb-lock cb-task' + (t.pop === 'task' ? ' on' : S.task && S.task.status !== 'stopped' ? ' busy' : '') + ' ' + hint('t-task')} aria-pressed=${t.pop === 'task'} aria-label="派任務" title="派任務" onClick=${act(() => { t.pop = t.pop === 'task' ? null : 'task'; t.tool = null; })}><${Icon} n="send" s=${18} />${S.task && S.task.status !== 'stopped' && html`<i class="badge"></i>`}</button><button class=${'cb-lock' + (S.cls.mode === 'lock' ? ' on' : '') + ' ' + hint('t-mode')} aria-pressed=${S.cls.mode === 'lock'} aria-label=${S.cls.mode === 'lock' ? '解除鎖定' : '鎖定螢幕'} title=${liveT() ? '學生作答中，不能鎖定' : undefined} disabled=${liveT() && S.cls.mode !== 'lock'} onClick=${act(() => setMode(S.cls.mode === 'lock' ? 'free' : 'lock'))}><${Icon} n="lock" s=${18} /></button><button class=${'btn sec ' + hint('t-end')} onClick=${act(() => { endClass(); })}>下課</button></div>`; }
  const pos = BAR === 'float' && BARPOS ? { left: BARPOS.x + 'px', top: BARPOS.y + 'px', bottom: 'auto', transform: 'none' } : null;
  if (S.t.barMin && BAR !== 'rail' && BAR !== 'toolbox') return html`<div class=${'class-bar cb-mini ' + BAR} style=${pos}>${PAGER_POS === 'capsule' && html`<${HPager} /><span class="cb-sep"></span>`}<button class=${'cb-cls ' + hint('t-roster')} aria-label="展開上課控制" onClick=${act(() => { S.t.barMin = false; })}><i class="live-dot"></i>${S.cls.cid}<${Icon} n="chevron-right" s=${16} /></button></div>`;
  return html`<div class=${'class-bar ' + (BAR === 'rail' || BAR === 'toolbox' ? 'inrail' : BAR)} style=${pos}>
    ${PAGER_POS === 'capsule' && html`<${HPager} /><span class="cb-sep"></span>`}
    ${BAR === 'float' && html`<span class="cb-grip" aria-label="拖曳移動" title="拖曳移動" onPointerDown=${drag}><i></i><i></i><i></i><i></i><i></i><i></i></span>`}
    <button class=${'cb-cls ' + hint('t-roster')} onClick=${act(() => { t.pop = t.pop === 'roster' ? null : 'roster'; t.scoreMode = 'plus'; S.flags.rosterSeen = true; S.flags.scoreOpened = true; })}><i class="live-dot"></i>${S.cls.cid}<span class="n">${S.cls.joined.length}/${present().length}</span><${Icon} n="chevron-down" s=${16} /></button>
    ${S.timer && html`<button class=${'cb-cls' + (S.timer.done ? ' done' : '')} onClick=${act(() => { t.pop = 'timer'; })}><${Icon} n="timer" s=${16} />${S.timer.done ? '時間到' : mmss(timeLeft())}</button>`}
    <button class=${'cb-lock' + (lock ? ' on' : '') + ' ' + hint('t-mode')} aria-pressed=${lock} aria-label=${lock ? '解除鎖定' : '鎖定螢幕'} title=${lock ? '解除鎖定' : '鎖定螢幕'} onClick=${act(() => setMode(lock ? 'free' : 'lock'))}><${Icon} n="lock" s=${18} /></button>
    <button class=${'btn sec ' + hint('t-end')} onClick=${act(endClass)}>下課</button>
    ${BAR !== 'rail' && BAR !== 'toolbox' && html`<button class="cb-min" aria-label="收起" title="收起" onClick=${act(() => { S.t.barMin = true; S.t.pop = S.t.pop === 'roster' ? null : S.t.pop; })}><${Icon} n="chevron-left" s=${18} /></button>`}
  </div>`;
}
function StartDialog() {
  const t = S.t, d = t.draft; const hint = useHint();
  const cs = t.classes;
  return html`<div class="scrim" onClick=${act((e) => { if (e.target === e.currentTarget) t.modal = null; })}>
    <div class="dialog" role="dialog" aria-label="開始上課">
      <div class="pop-h"><h4>開始上課</h4></div>
      <div class="pop-b">
        ${!cs.length ? html`<p style="margin:0;line-height:1.7;color:var(--text-2)">還沒有班級，先到「班級星艦」按「新增班級」。</p>
          <div class="dialog-foot"><button class="btn sm" onClick=${act(() => { t.modal = null; t.screen = 'shelf'; t.shelfTab = 'classes'; t.classView = null; BRIDGE.goArea('classes'); })}>到班級星艦</button></div>` : html`
        <div><div class="field-l">授課班級</div>
          <${Dd} id="cls-select" value=${d.ci} options=${cs.map((x, i) => [i, `${x.c} · ${x.subj}（${classSize(x.c)} 人）`])} onChange=${(v) => { d.ci = +v; }} /></div>
        <div><div class="field-l">同步模式</div>
          <div class="opts">
            <button class=${'opt' + (d.mode === 'free' ? ' on' : '')} aria-pressed=${d.mode === 'free'} onClick=${act(() => { d.mode = 'free'; })}><b>自由閱讀</b><span>學生可以自己翻頁、畫記</span></button>
            <button class=${'opt' + (d.mode === 'lock' ? ' on' : '')} aria-pressed=${d.mode === 'lock'} onClick=${act(() => { d.mode = 'lock'; })}><b>鎖定螢幕</b><span>學生跟著老師翻頁，不能畫記</span></button>
          </div></div>
        <div class="dialog-foot"><button class="btn sec sm" onClick=${act(() => { t.modal = null; })}>取消</button><button class=${'btn sm ' + hint('t-start-go')} onClick=${act(() => { startClass({ cid: cs[d.ci].c, subj: cs[d.ci].subj, mode: d.mode }); })}>開始上課</button></div>`}
      </div>
    </div>
  </div>`;
}
/* 全班加分：幾何形狀撒花加一句「全班加分！」，不放全班的形狀夥伴（乙練 2026-10-22：比較乾淨）
   全班扣分：同一套，但形狀是灰的、少一點、慢慢往下沉，標籤是淡紅底「全班扣 1 分」 */
const CONF_C = ['#F0FF62', '#FF854A', '#F3C11B', '#00A36E', '#FF87C7', '#03C5E9', '#7F6CDF'];
const CONF_S = ['c', 'sq', 'tri', 'peb'];
function Cheer() {
  const R = rng(7), minus = S.cheer && S.cheer.d < 0;
  const crew = [ME, ...present().map((x) => x.seat).filter((x) => x !== ME)].slice(0, 9);
  const order = [4, 3, 5, 2, 6, 1, 7, 0, 8]; // 陳小宇在正中間
  return html`<div class=${'cheer2' + (minus ? ' minus' : '')} aria-live="polite">
    ${minus ? html`<div class="rain-cloud" aria-hidden="true"><svg viewBox="0 0 160 70" width="200"><path d="M40 62h86a26 26 0 0 0 0-52 34 34 0 0 0-62-4A26 26 0 0 0 40 62Z" fill="#B9BEC4" /></svg>${Array.from({ length: 12 }, (_, i) => html`<i style=${{ left: 22 + i * 13 + '%', '--d': (i % 4) * .18 + .9 + 's' }}></i>`)}</div>`
      : Array.from({ length: 44 }, (_, i) => html`<i class=${'cf ' + CONF_S[i % 4]} style=${{ left: (R() * 100) + '%', '--c': CONF_C[i % 7], '--d': (R() * .6) + 's', '--r': (R() * 720 - 360) + 'deg', '--x': (R() * 160 - 80) + 'px', '--s': (10 + R() * 12) + 'px' }}></i>`)}
    <div class="crew">${crew.map((seat, i) => { const a = (i / crew.length) * Math.PI * 2;
      return html`<span class="mate" style=${{ order: order[i], '--fx': Math.cos(a) * 640 + 'px', '--fy': Math.sin(a) * 420 + 'px', '--i': i }}><${Kid} seat=${seat} box=${seat === ME ? 96 : 72} mood=${minus ? 'sad' : undefined} /></span>`; })}</div>
    <div class="cheer-label">${minus ? '全班扣 1 分' : '全班加分！'}</div>
  </div>`;
}
/* 左側彈窗的底層：透明、點空白處關掉；center 時彈窗在左側垂直置中 */
function Layer({ P, center, children }) {
  return html`<div class=${'pop-layer' + (center ? ' center' : '')} onClick=${(e) => { if (e.target === e.currentTarget) { P.pop = null; refresh(); } }}>${children}</div>`;
}
/* 圓環倒數：沒開始時「開始計時」；倒數中下方暫停、停止兩顆；時間到只剩「停止」（或 3 秒後自己回到預設） */
function Ring({ size, frac, children, done }) {
  const r = size / 2 - 7, C = 2 * Math.PI * r;
  return html`<div class=${'tm-ring' + (done ? ' done' : '')} style=${{ width: size + 'px', height: size + 'px' }}>
    <svg width=${size} height=${size}><circle cx=${size / 2} cy=${size / 2} r=${r} fill="none" stroke="var(--line-subtle)" stroke-width="7" />
      <circle cx=${size / 2} cy=${size / 2} r=${r} fill="none" stroke="var(--timer)" stroke-width="7" stroke-linecap="round" stroke-dasharray=${C} stroke-dashoffset=${C * (1 - frac)} transform=${`rotate(-90 ${size / 2} ${size / 2})`} style="transition: stroke-dashoffset .5s linear" /></svg>
    <div class="tm-in">${children}</div></div>`;
}
/* 作答中面板右上的時間：有時限是倒數（可以再加 1 分鐘），沒有就是已經過多久 */
function taskClock(t) {
  const T = S.timer, linked = T && T.taskId === t.id && !T.done;
  if (!linked) return html`<span class="clock">${mmss(Math.floor((Date.now() - t.at) / 1000))}</span>`;
  // 延長鈕跟倒數包在同一顆膠囊裡，寫「分鐘」，不會被看成加 1 分
  return html`<span class="clock limit"><span class="cl-t"><${Icon} n="timer" s=${15} />剩 ${mmss(timeLeft())}</span><button class="cl-add" aria-label="時間延長 1 分鐘" onClick=${act(() => bumpTimer(60))}>＋1 分鐘</button></span>`;
}
/* 作答中（各題型同一款，照選擇題）：大大的已作答人數、進度條、座號點點。
   有時限：右邊一個倒數圓環（剩 10 秒變紅、輕輕晃），下面「＋1 分鐘」；沒時限：數字下面一行小字「已過 mm:ss」 */
function Collecting({ t, answered, tot, seats, has, onStop, stopHint }) {
  const T = S.timer, linked = T && T.taskId === t.id && !T.done, left = linked ? timeLeft() : 0;
  return html`<div class="collect">
    <!-- 倒數和作答人數合成一個圓環（2026-11-03 乙練選 B）：有時限＝外圈是剩下的時間；沒時限＝外圈是作答進度 -->
    <div class=${'col-ring' + (linked && left <= 10 ? ' hurry' : '')}><${Ring} size=${260} frac=${linked ? left / T.total : answered / Math.max(1, tot)}>
      <b class="cr-n">${answered}</b><span class="cr-of">／${tot} 人已作答</span>
      ${linked ? html`<span class="cr-tm"><button aria-label="少 1 分鐘" disabled=${left <= 60} onClick=${act(() => bumpTimer(-60))}>−</button><b>${mmss(left)}</b><button aria-label="多 1 分鐘" onClick=${act(() => bumpTimer(60))}>＋</button></span>`
        : html`<span class="cr-tm el">已過 ${mmss(Math.floor((Date.now() - t.at) / 1000))}</span>`}
    </${Ring}></div>
    <div class="seat-dots">${seats.map((x) => html`<i class=${has(x) ? 'on' : ''}>${pad(x)}</i>`)}</div>
    <div class="ch-foot"><span class="spacer"></span><button class=${'btn sm ' + (stopHint || '')} onClick=${act(onStop)}>結束作答</button></div>
  </div>`;
}
/* 「02:30」「2:30」「90」「1分30秒」都讀得懂，回傳秒數 */
/* 全形數字、全形冒號也讀得懂（老師用注音輸入法常打成全形；2026-11-04 乙練） */
const toHalf = (v) => String(v).replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).replace(/：/g, ':');
function parseTime(v) {
  v = toHalf(v).trim().replace(/[秒\\s]/g, '').replace(/分/g, ':');
  if (!v) return null;
  if (v.includes(':')) { const [m, sec] = v.split(':'); const n = (+m || 0) * 60 + (+sec || 0); return Number.isFinite(n) ? n : null; }
  const n = +v; return Number.isFinite(n) ? n : null;
}
/* 計時器：設定好按開始，就釘在畫面左上角倒數（取代右上角的時間膠囊，2026-11-03 乙練）；釘住時不放 ×，按停止才消失 */
// 派任務帶的時限：只能 −／＋ 時間，跟作答彈窗同一個計時，不能暫停或停止（2026-11-03 乙練）
/* 釘住的計時器可以拖：按把手或卡片空白處拖，放開就停在那裡（位置記在 S.t.timerPos，下次打開也在那裡；2026-11-04 乙練選 A） */
function dragPin(e) {
  if (e.button || e.target.closest('button, input')) return;
  const el = e.currentTarget, par = el.offsetParent; if (!par) return;
  const k = par.getBoundingClientRect().width / par.offsetWidth, sx = e.clientX, sy = e.clientY, ox = el.offsetLeft, oy = el.offsetTop;
  el.setPointerCapture(e.pointerId); el.classList.add('dragging');
  const mv = (ev) => { const x = Math.max(0, Math.min(par.offsetWidth - el.offsetWidth, ox + (ev.clientX - sx) / k)), y = Math.max(0, Math.min(par.offsetHeight - el.offsetHeight, oy + (ev.clientY - sy) / k));
    el.style.left = x + 'px'; el.style.top = y + 'px'; S.t.timerPos = { x, y }; };
  const up = () => { el.classList.remove('dragging'); el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); };
  el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up);
}
function TimerPop({ pinned }) {
  const T = S.timer; const hint = useHint(); const t = S.t;
  if (t.timerSec == null) t.timerSec = (t.timerMin || 5) * 60;
  const [edit, setEdit] = useState(null); // 改時間：分、秒各一格，冒號固定在中間（2026-11-04 乙練）
  const mRef = useRef(), sRef = useRef();
  const close = act(() => { t.pop = null; });
  const left = T ? timeLeft() : t.timerSec;
  const frac = T ? (T.done ? 1 : left / T.total) : 1; // 時間到：整圈變紅
  const bump = (d) => act(() => { if (T) bumpTimer(d * 60); else t.timerSec = Math.max(10, Math.min(3600, t.timerSec + d * 60)); });
  // 點時間就能直接打：例如改成 0:30
  const commit = (v) => { const sec = parseTime(v); setEdit(null); if (sec == null || sec < 1) return;
    const n = Math.min(3600, Math.round(sec));
    if (!T) t.timerSec = n;
    else if (T.paused) { T.left = n; T.total = Math.max(T.total, n); }
    else if (!T.done) { T.endAt = Date.now() + n * 1000; T.total = Math.max(T.total, n); }
    refresh(); };
  return html`<div class=${'pop timer-pop' + (pinned ? ' pinned' : '') + (T && T.done ? ' done' : T && !T.paused && left <= 10 ? ' hurry' : '')}>
    ${!pinned && html`<div class="pop-h"><h4>計時器</h4><button class="x-btn" aria-label="關閉" onClick=${close}><${Icon} n="x" /></button></div>`}
    <div class="pop-b">
      ${pinned && html`<span class="tm-grip" aria-hidden="true"></span>`}
      <${Ring} size=${pinned ? 150 : 184} frac=${frac} done=${T && T.done}>
        ${edit ? (() => { const save = () => commit(`${mRef.current.value || 0}:${sRef.current.value || 0}`);
            const key = (e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEdit(null); };
            const blur = () => setTimeout(() => { if (![mRef.current, sRef.current].includes(document.activeElement)) save(); }, 0);
            const num = (e) => { const raw = e.currentTarget.value, v = toHalf(raw).replace(/\D/g, '').slice(0, 2); e.currentTarget.value = v; if (e.currentTarget === mRef.current && (v.length === 2 || /[:：.\s]/.test(raw))) { sRef.current.focus(); sRef.current.select(); } }; // 分鐘打一位數也行；打兩位或打冒號就跳到秒
            const field = (ref, k, v, label) => html`<input class="tm-in-edit" ref=${(el) => { ref.current = el; if (el && edit === k && !el.dataset.f) { el.dataset.f = 1; el.focus(); el.select(); } }} inputmode="numeric" aria-label=${label} value=${String(v).padStart(2, '0')} onInput=${num} onKeyDown=${key} onBlur=${blur} onFocus=${(e) => e.currentTarget.select()} />`;
            return html`<span class="tm-in2">${field(mRef, 'm', Math.floor(left / 60), '分')}<b>:</b>${field(sRef, 's', left % 60, '秒')}</span>`; })()
          : T && T.done ? html`<span class="tm-t">時間到</span>`
          : html`<span class="tm-t tm-split"><button class="tm-edit" aria-label="改分鐘" onClick=${() => setEdit('m')}>${String(Math.floor(left / 60)).padStart(2, '0')}</button>:<button class="tm-edit" aria-label="改秒數" onClick=${() => setEdit('s')}>${String(left % 60).padStart(2, '0')}</button></span>`}
        ${T && T.done && html`<small class="tm-was">${mmss(T.total)}</small>`}
        ${!(T && T.done) && html`<span class="tm-adj"><button aria-label="少 1 分鐘" disabled=${T ? left <= 60 : t.timerSec <= 60} onClick=${bump(-1)}><${Icon} n="minus" s=${14} /></button>1 分鐘<button aria-label="多 1 分鐘" onClick=${bump(1)}><${Icon} n="plus" s=${14} /></button></span>`}
      </${Ring}>
      ${!(T && T.taskId) && html`<div class="tm-acts">
        ${!T ? html`<button class=${'btn sm tm-go ' + hint('t-timer-go')} onClick=${act(() => { startTimer(t.timerSec); t.pop = null; })}>開始計時</button>`
        : T.done ? html`<button class="btn sm tm-go" onClick=${act(stopTimer)}>關閉</button>`
        : html`<button class="tm-c gray" aria-label=${T.paused ? '繼續' : '暫停'} onClick=${act(pauseTimer)}><${Icon} n=${T.paused ? 'play' : 'pause'} s=${20} /></button>
               <button class="tm-c" aria-label="停止" onClick=${act(stopTimer)}><${Icon} n="square" s=${18} /></button>`}
      </div>`}
    </div>
  </div>`;
}
/* 到課與加分同一張表：打開時是座號（看誰到了），選「加分」或「扣分」後，有來的人變成各自的形狀夥伴，點誰就幫誰加減一分。
   還沒登入、請假的一直是虛線座號，不能點 */
function ClassPanel() {
  const t = S.t; const hint = useHint();
  const joined = S.cls.joined, mode = t.scoreMode, minus = mode === 'minus';
  const waiting = present().length - joined.length;
  return html`<div class=${'pop score-pop' + (minus ? ' minus' : '') + (S.cheer ? ' quiet' : '')}>
    <div class="pop-h"><div><h4>${S.cls.cid} ${S.cls.subj}</h4>
        <div class="att-line"><b>${joined.length}</b> 已加入<i></i><b>${waiting}</b> 還沒登入</div></div>
      <div class="score-top">
        <${ScoreMode} />
        <button class=${'btn xs class-btn ' + (minus ? 'minus-btn ' + hint('t-class-minus') : mode ? 'lime ' + hint('t-class') : 'sec')} disabled=${!mode} onClick=${act(() => classBonus(minus ? -1 : 1))}>${minus ? '全班 −1' : '全班 +1'}</button>
        <span class="vsep"></span>
        <button class=${'x-btn ' + hint('t-undo')} aria-label="上一步" title="上一步" disabled=${!(S.session && S.session.hist.length)} onClick=${act(undoScore)}><${Icon} n="corner-up-left" /></button>
        <button class="x-btn" aria-label="關閉" onClick=${act(() => { t.pop = null; })}><${Icon} n="x" /></button>
      </div></div>
    <div class="pop-b">
      <div class="kid-grid">${roster().map((s) => {
        const n = scoreOf(s.seat), f = S.flash[s.seat], ab = ABSENT.includes(s.seat), on = joined.includes(s.seat);
        const shown = on && n !== 0, sad = f && f.d < 0;
        return html`<button class=${'kid' + (on ? '' : ' away') + (sad ? ' down' : '') + (s.seat === ME ? ' ' + hint('t-me') : '')} style=${{ '--i': s.seat % 8 }} disabled=${!on} aria-disabled=${!mode} onClick=${act((e) => { if (!mode) return; if (!minus) burst(e.currentTarget.querySelector('.face') || e.currentTarget); bonus(s.seat, minus ? -1 : 1); })}>
          ${shown ? html`<span class="face morph" key=${'m' + s.seat}><${Kid} seat=${s.seat} box=${56} cls=${f ? (sad ? 'sink' : 'jump') : ''} mood=${sad ? 'sad' : undefined} key=${'k' + s.seat} /><span class=${'sc ' + (n > 0 ? 'up' : 'down') + (f ? ' bump' + (sad ? ' minus' : '') : '')} key=${f ? 'f' + f.id : 'sc'}>${f ? (sad ? '−1' : '+1') : n > 0 ? '+' + n : '−' + -n}</span></span>`
            : html`<span class="face" key=${'d' + s.seat}><span class="seat-dot">${pad(s.seat)}</span>${f && html`<span class=${'sc bump' + (sad ? ' minus' : '')} key=${'f' + f.id}>${sad ? '−1' : '+1'}</span>`}</span>`}
          <span class="nm2">${s.name}</span>${!on && html`<em class="att">還沒加入</em>`}</button>`; })}</div>
    </div>
  </div>`;
}

/* 派任務：選題型 → 設定（題目都可以只用口頭說）→ 派出 */
/* 課堂上的選擇題：一個畫面只做一件事
   作答中：只看幾人答完 →「結束作答」→ 長條圖出來，點正確的選項 →「公布答案」→ 答對的人 +1、下一題 */
function ChoiceLive({ t }) {
  const hint = useHint();
  const [grp, setGrp] = useState('right');
  const barsRef = useRef(); const [bh, setBh] = useState(150); // 公布後長條圖佔上半，最高那條照實際高度畫
  useLayoutEffect(() => { const el = barsRef.current; if (!el || t.status !== 'revealed') return; const fit = () => setBh(Math.max(60, el.clientHeight - 34)); fit(); const ro = new ResizeObserver(fit); ro.observe(el); return () => ro.disconnect(); }, [t.status]);
  const close = act(() => { S.t.pop = null; });
  const st = t.status, letters = optLetters(t);
  const seats = present().map((x) => x.seat), tot = seats.length;
  const answered = Object.keys(t.answers).length;
  const counts = letters.map((L) => Object.values(t.answers).filter((v) => v === L).length);
  const max = Math.max(1, ...counts);
  const mark = st === 'revealed' ? t.correct : t.pick;
  const right = seats.filter((x) => t.answers[x] && t.answers[x] === t.correct);
  const wrong = seats.filter((x) => t.answers[x] && t.answers[x] !== t.correct);
  const att = S.cls.live ? seats.filter((x) => S.cls.joined.includes(x)) : seats; // 比率以出席人數為分母
  const none = att.filter((x) => !t.answers[x]);
  const groups = { right, wrong, none };
  const nm = typeName(t), rateOf = { right: '答對率', wrong: '答錯率', none: '沒作答' }, title = st === 'closed' ? nm + '・公布答案' : st === 'revealed' ? html`${nm}<span class="hd-n">${rateOf[grp]} <b>${(() => { const d = grp === 'none' ? att.length : right.length + wrong.length; return d ? Math.round(groups[grp].length / d * 100) : 0; })()}%</b></span>` : nm; // 比率跟著分頁換；答對／答錯以作答人數為分母，跟長條一致（2026-11-03 乙練）
  return html`<div class=${'pop ch-pop task-pop review'}>
    <div class="pop-h"><h4>${title}</h4><button class="x-btn" aria-label="收合" onClick=${close}><${Icon} n="x" /></button></div>
    <div class="pop-b">
      ${t.q && html`<div class="qline">${t.q}</div>`}
      ${st === 'collecting' ? html`
        <${Collecting} t=${t} answered=${answered} tot=${tot} seats=${seats} has=${(x) => !!t.answers[x]} onStop=${closeAnswer} stopHint=${hint('t-close')} />`
      : html`
        ${st === 'closed' && !t.pick ? html`
        <div class=${'pick-opts' + (letters.length === 2 ? ' two' : '')}>${letters.map((L, i) => html`<button class=${'popt ' + (L === (t.tf ? 'O' : 'B') ? hint('t-correct') : '')} onClick=${act(() => reveal(L))}>${L}${t.opts[i] ? html`<small>${t.opts[i]}</small>` : ''}</button>`)}</div>
        `
      : html`
        ${st === 'closed' && html`<div class="bars-h"><b>正確答案：${t.pick}</b></div>`}
        <div class=${st === 'revealed' ? 'ch-half' : 'ch-flat'}>
        <div ref=${barsRef} class=${'bars' + (st === 'closed' ? ' pickable' : '') + (st === 'revealed' ? ' compact' : '')}>${letters.map((L, i) => html`<button class=${'cbar' + (L === mark ? ' ok' : '') + (st === 'closed' && L === 'B' ? ' ' + hint('t-correct') : '')} disabled=${st !== 'closed'} aria-pressed=${L === mark} onClick=${act(() => { t.pick = L; })}><span>${st === 'revealed' && answered ? Math.round(counts[i] / answered * 100) + '%' : counts[i] + ' 人'}</span><i style=${{ height: (counts[i] / max) * (st === 'revealed' ? bh : 180) + 'px' }}></i></button>`)}</div>
        <div class="bar-l">${letters.map((L, i) => html`<span class=${L === mark ? 'ok' : ''}>${L === mark ? '✓ ' : ''}${L}${t.opts[i] ? html`<small>${t.opts[i]}</small>` : ''}</span>`)}</div></div>
        ${st === 'closed' ? html`<div class="ch-foot"><span class="muted"></span><button class=${'btn sm ' + hint('t-reveal')} disabled=${!t.pick} onClick=${act(() => reveal(t.pick))}>公布答案</button></div>`
          : html`
            <div class="ch-half bot"><${RvHead} tabs=${[['right', '答對', groups.right.length], ['wrong', '答錯', groups.wrong.length], ['none', '沒作答', groups.none.length]]} cur=${grp} onTab=${(k) => setGrp(k)} list=${groups[grp]} label=${{ right: '答對', wrong: '答錯', none: '沒作答' }[grp]} d=${{ right: 1, wrong: 0, none: -1 }[grp]} plusHint=${hint('t-plusright')} onPlus=${(d) => plusGroup(t, grp, groups[grp], d)} />
            <div class="who-chose fixed">${groups[grp].map((x) => { const got = (t.gave || {})[x] || 0;
              return html`<button data-seat=${x} class=${'nm-chip sk' + drawnCls(x) + gotCls(t, x) + (S.t.scoreMode === 'minus' ? ' m' : '')} aria-label=${`${nameOf(x)}，點一下${S.t.scoreMode === 'minus' ? '扣' : '加'} 1 分`} onClick=${act((e) => rvScore(t, x, e.currentTarget.querySelector('.sk-dot')))}><span class=${'sk-dot' + kidCls(t, x)}><${SeatFace} t=${t} seat=${x} box=${52} /><${SeatSc} t=${t} seat=${x} /></span><span class="sk-nm">${nameOf(x)}</span></button>`; })}${!groups[grp].length && '沒有人'}</div>
            <${RvFoot} list=${groups[grp]} label=${{ right: '答對', wrong: '答錯', none: '沒作答' }[grp]} d=${{ right: 1, wrong: 0, none: -1 }[grp]} plusHint=${hint('t-plusright')} onPlus=${(d) => plusGroup(t, grp, groups[grp], d)} /></div>`}`}`}
    </div></div>`;
}
function TaskPanel() {
  const task = S.task; const hint = useHint();
  const close = act(() => { S.t.pop = null; });
  const head = (title, extra) => html`<div class="pop-h"><h4>${title}</h4>${extra || ''}<button class="x-btn" aria-label="收合" onClick=${close}><${Icon} n="x" /></button></div>`;
  if (!task) {
    const c = S.compose;
    if (!c) return html`<div class="pop task-pop narrow">
      ${head(`派任務給 ${S.cls.cid} · ${S.cls.subj}（${present().length} 人）`)}
      <div class="pop-b"><div class="type-cards">
        ${[['choice', '選擇題', 'A–D 選項', 'list'], ['tf', '是非題', 'O／X', 'check'], ['text', '文字題', '打字回答', 'type'], ['shot', '手寫題', '寫在課本或紙上', 'pencil'], ['voice', '聲音題', '錄音回答', 'mic']].map(([k, n, d, ic]) => html`<button class=${'type-card ' + hint('t-type-' + k)} onClick=${act(() => { S.compose = k; S.draft = { q: '', showQ: false, showOpt: false, n: 4, opts: ['', '', '', '', '', ''], bg: 'page' }; })}><span class="ti"><${Icon} n=${ic} s=${24} /></span>${n}<small>${d}</small></button>`)}
      </div></div></div>`;
    const d = S.draft;
    const back = html`<button class="back" style="font-size:18px;font-weight:600" onClick=${act(() => { S.compose = null; })}><${Icon} n="chevron-left" s=${18} />${c === 'tf' ? '是非題' : TYPE_NAME[c]}</button>`;
    /* 選項數、時限用 −／＋ 調（同閱讀設定的步進器），選項 2–5 個、預設 4 */
    const li = Math.max(0, LIMITS.findIndex(([v]) => v === (d.limit || 0)));
    const stepper = (label, val, dec, inc, decOff, incOff) => html`<div class="stepper cp-step" role="group" aria-label=${label}>
      <button aria-label=${label + '減少'} disabled=${decOff} onClick=${act(dec)}>−</button><b>${val}</b><button aria-label=${label + '增加'} disabled=${incOff} onClick=${act(inc)}>+</button></div>`;
    return html`<div class="pop compose task-pop narrow">
      <div class="pop-h">${back}<button class="x-btn" aria-label="收合" onClick=${close}><${Icon} n="x" /></button></div>
      <div class="pop-b">
        ${c === 'choice' && html`<div class="cp-main"><span class="cp-l">選項數</span>${stepper('選項數', d.n, () => { d.n -= 1; }, () => { d.n += 1; }, d.n <= 2, d.n >= 5)}</div>`}
        ${c === 'shot' && html`<div class="cp-main"><span class="cp-l">寫在</span>
          <div class="pill-seg paper-seg" role="radiogroup" aria-label="寫在哪">${PAPERS.map(([k, l]) => html`<button role="radio" aria-checked=${(d.bg || 'page') === k} class=${(d.bg || 'page') === k ? 'on ' : ''} onClick=${act(() => { d.bg = k; })}>${k === 'page' ? '課本' : l}</button>`)}</div></div>
          ${(d.bg || 'page') === 'page' && html`<p class="cp-hint">學生在課本 p.${PAGES[S.t.page].nums[0]} 上作答</p>`}
          ${(d.bg || 'page') !== 'page' && html`<label class="cp-check"><input type="checkbox" checked=${d.withPage !== false} onChange=${act((e) => { d.withPage = e.target.checked; })} />附上 p.${PAGES[S.t.page].nums[0]} 當題目</label>`}`}
        <div class="cp-main"><span class="cp-l">時限</span>${stepper('時限', LIMITS[li][1], () => { d.limit = LIMITS[li - 1][0]; }, () => { d.limit = LIMITS[li + 1][0]; }, li <= 0, li >= LIMITS.length - 1)}</div>
        ${d.showQ && html`<div class="cp-fold"><input class="inp cp-field" id="task-q" placeholder="題目" value=${d.q} onInput=${(e) => { d.q = e.target.value; }} /><button class="x-btn fold-x" aria-label="收起題目" onClick=${act(() => { d.showQ = false; d.q = ''; })}><${Icon} n="x" s=${16} /></button></div>`}
        ${c === 'choice' && d.showOpt && html`<div class="cp-fold top"><div class="opt-h">選項文字</div><div class="opt-rows cp-field">${LETTERS.slice(0, d.n).map((L, i) => html`<label>${L}<input class="inp" value=${d.opts[i]} placeholder=${'選項 ' + L} onInput=${(e) => { d.opts[i] = e.target.value; }} /></label>`)}</div><button class="x-btn fold-x" aria-label="收起選項文字" onClick=${act(() => { d.showOpt = false; d.opts = ['', '', '', '', '', '']; })}><${Icon} n="x" s=${16} /></button></div>`}
        <div class="foot2">
          ${!d.showQ && html`<button class="cp-more" onClick=${act(() => { d.showQ = true; })}><${Icon} n="plus" s=${14} />題目</button>`}
          ${c === 'choice' && !d.showOpt && html`<button class="cp-more" onClick=${act(() => { d.showOpt = true; })}><${Icon} n="plus" s=${14} />選項文字</button>`}
          <span class="spacer"></span>
          <button class=${'btn sm ' + hint('t-send')} onClick=${act(() => (c === 'tf' ? sendTask('choice', { ...d, tf: true }) : sendTask(c, d)))}><${Icon} n="send" s=${16} />派出</button></div>
      </div></div>`;
  }
  if (task.type === 'choice') return html`<${ChoiceLive} t=${task} />`;
  // 文字、聲音、手寫題：作答中只看誰交了；結束後撐滿畫面檢討，最下面一列分「有作答／沒作答」、抽籤、加分、再派一題
  const att = S.cls.live ? present().map((x) => x.seat).filter((x) => S.cls.joined.includes(x)) : present().map((x) => x.seat);
  const has = task.type === 'text' ? (x) => !!task.texts[x] : task.type === 'voice' ? (x) => !!task.voices[x] : (x) => !!task.subs[x];
  const doneL = att.filter(has), noneL = att.filter((x) => !has(x));
  const live = task.status === 'collecting', tab = task.tab || 'done';
  const name = { text: '文字題', voice: '聲音題', shot: '手寫題' }[task.type];
  if (task.type === 'text' && task.view) return html`<div class="pop task-pop review"><div class="pop-b"><${TextBig} t=${task} seat=${task.view} onBack=${act(() => { task.view = null; })} /></div></div>`;
  if (task.type === 'shot' && task.view) return html`<${Detail} />`;
  const body = () => {
    if (tab === 'none') return html`<${NameChips} t=${task} list=${noneL} />`;
    if (task.type === 'text') return html`<div class="text-cards">${doneL.map((seat) => html`<button data-seat=${seat} class=${'tcard' + drawnCls(seat) + (seat === ME ? ' ' + hint('t-textcard') : '')} onClick=${act(() => { task.view = seat; S.flags.textViewed = true; })}><span class="who2"><${SeatBtn} t=${task} seat=${seat} />${nameOf(seat)}</span><span class="tc-t">${task.texts[seat]}</span></button>`)}</div>`;
    if (task.type === 'voice') return html`<div class="vs-grid">${doneL.map((seat) => html`<${VoiceSeat} t=${task} seat=${seat} />`)}</div>`;
    return html`<div class="vs-grid">${doneL.map((seat) => html`<${ShotSeat} t=${task} seat=${seat} />`)}</div>`; // 手寫題檢討跟聲音題同一套：座號圈＋名字，下面「看作品」（2026-11-04 乙練選 A2）
  };
  return html`<div class=${'pop task-pop review'}>
    ${head(live ? name : html`${name}<span class="hd-n"><b>${doneL.length}</b>／${att.length}</span>`)}
    <div class="pop-b">
      ${task.q && html`<div class="qline">${task.q}</div>`}
      ${live ? html`<${Collecting} t=${task} answered=${doneL.length} tot=${att.length} seats=${att} has=${has} onStop=${stopTask} stopHint=${hint(task.type === 'shot' ? 't-stop' : task.type === 'text' ? 't-stop-text' : 't-stop-voice')} />`
        : html`<${RvHead} tabs=${[['done', '有作答', doneL.length], ['none', '沒作答', noneL.length]]} cur=${tab} onTab=${(k) => { task.tab = k; }} list=${tab === 'done' ? doneL : noneL} label=${tab === 'done' ? '有作答' : '沒作答'} d=${tab === 'done' ? 1 : -1} onPlus=${(d) => plusGroup(task, tab === 'done' ? 'answered' : 'none', tab === 'done' ? doneL : noneL, d)} /><div class="rv-body">${body()}</div><${RvFoot} list=${tab === 'done' ? doneL : noneL} label=${tab === 'done' ? '有作答' : '沒作答'} d=${tab === 'done' ? 1 : -1} onPlus=${(d) => plusGroup(task, tab === 'done' ? 'answered' : 'none', tab === 'done' ? doneL : noneL, d)} />`}
    </div>
  </div>`;
}
/* 作品放到最大：量外框寬高，照作品比例（課本頁或紙）撐滿 */
function FitWork({ t, layers, draw }) {
  const ref = useRef(); const [w, setW] = useState(800);
  const r = onPaper(t) ? 1000 / BOARD_H : PAGES[t.page].r;
  useLayoutEffect(() => { const el = ref.current; const fit = () => setW(Math.max(200, Math.min(el.clientWidth, el.clientHeight * r))); fit(); const ro = new ResizeObserver(fit); ro.observe(el); return () => ro.disconnect(); }, [r]);
  return html`<div class="fit-work" ref=${ref}><div class="big-work" style=${{ width: w + 'px' }}><${Work} t=${t} w=${w} layers=${layers} draw=${draw} /></div></div>`;
}
/* 檢討一份作品：整個畫面那麼大；一打開就能直接用筆批註，旁邊橡皮擦、清除（只清老師的批註） */
function Detail() {
  const task = S.task; const hint = useHint();
  const seats = present().filter((s) => task.subs[s.seat]).map((s) => s.seat);
  const seat = task.view, sub = task.subs[seat];
  const idx = seats.indexOf(seat);
  const [tool, setTool] = useState('pen');
  const isShared = !!S.shared; // 分享中切到下一位，全班畫面跟著換，直到按停止分享或返回
  return html`<div class="pop task-pop review">
    <div class="pop-b">
      <div class="detail-top">
        <button class=${'btn sm sec dt-back ' + hint('t-detail-back')} onClick=${act(() => { task.view = null; if (S.shared) unshare(); })}><${Icon} n="arrow-left" s=${18} />返回</button>
        <${WhoNav} t=${task} seat=${seat} idx=${idx} n=${seats.length} go=${(i) => { task.view = seats[i]; if (isShared) S.shared = { ...S.shared, seat: task.view }; }} />
        <span class="spacer"></span><${WhoPlus} t=${task} seat=${seat} />
        ${isShared ? html`<button class="btn sm sec" onClick=${act(unshare)}>停止分享</button>` : html`<button class=${'btn sm ' + hint('t-share')} onClick=${act(() => share(seat))}><${Icon} n="cast" s=${16} />分享畫面</button>`}
      </div>
      <div class="dt-stage">
      <${FitWork} t=${task} layers=${[sub.ink, sub.notes]}
        draw=${html`<${DrawLayer} page=${task.page} vbh=${onPaper(task) ? BOARD_H : undefined} tool=${tool} brush=${{ c: COLORS.note, w: 4 }} color=${COLORS.note}
          onStroke=${act((st) => { sub.notes.push(st); })} onErase=${act((pt) => eraseAt(sub.notes, pt))} onEraseRect=${act((r) => eraseRect(sub.notes, r))} />`} />
        <div class="rv-tools dt-tools" role="group" aria-label="批註工具">
          <button class=${'rv-t' + (tool === 'pen' ? ' on' : '')} aria-pressed=${tool === 'pen'} title="畫筆" onClick=${() => setTool('pen')}><${Icon} n="pencil" s=${18} /></button>
          <button class=${'rv-t' + (tool === 'eraser' ? ' on' : '')} aria-pressed=${tool === 'eraser'} title="橡皮擦" onClick=${() => setTool('eraser')}><${Icon} n="eraser" s=${18} /></button>
          <button class="rv-t" title="清除批註" disabled=${!sub.notes.length} onClick=${act(() => { sub.notes.splice(0); })}><${Icon} n="trash" s=${18} /></button>
        </div>
      </div>
    </div>
  </div>`;
}

/* 補充資源面板：同編輯器（橫排書從右邊出來）。這一頁照課文順序分組，圖片放縮圖、聲音直接在列上播 */
const SUPP_KINDS = [['text', '文字'], ['image', '圖片'], ['video', '影片'], ['audio', '聲音'], ['web', '網頁']];
function SuppPanel({ side }) {
  const P = side === 'teacher' ? S.t : S.s, page = side === 'teacher' ? S.t.page : sPage(); const hint = useHint();
  const [menu, setMenu] = useState(false);
  const scope = P.suppScope || 'page';
  const row = (it, lead) => { const on = P.playing === it.id; return html`<button class=${'sr ' + hint(side[0] + '-supp-' + it.id)} onClick=${act(() => openSupp(side, it))} aria-label=${it.k === 'audio' ? (on ? '暫停 ' : '播放 ') + it.t : undefined}>
    ${it.k === 'image' || it.k === 'video' ? html`<span class="sth"><img src=${it.src} alt="" />${it.k === 'video' && html`<i class="vm"><${Icon} n="play" s=${10} /></i>`}</span>`
      : it.k === 'audio' ? html`<span class=${'spl' + (on ? ' on' : '')}><${Icon} n=${on ? 'pause' : 'play'} s=${16} /></span>`
      : lead ? html`<span class="sk"><${Icon} n=${it.k === 'web' ? 'globe' : 'file-text'} /></span>` : ''}
    <span class="sn">${it.t}</span></button>`; };
  // 整章：依類別分頁籤，再依頁分組，點頁碼書就翻過去（同編輯器）
  const all = PAGES.map((pg, i) => ({ i, items: suppItems(i) }));
  const kinds = SUPP_KINDS.filter(([k]) => all.some((x) => x.items.some((it) => it.k === k)));
  const tab = kinds.some(([k]) => k === P.suppTab) ? P.suppTab : kinds[0][0];
  const opts = [['chapter', `本章：${PAGES[0].label}`], ['page', `第 ${PAGES[page].nums[0]} 頁`]];
  return html`<aside class="supp" role="dialog" aria-label="補充資源">
    <div class="supp-h"><h4>補充資源</h4><button class="x-btn" aria-label="關閉" onClick=${act(() => { P.pop = null; })}><${Icon} n="x" s=${24} /></button></div>
    <div class="supp-scope-wrap"><button class="supp-scope" aria-haspopup="listbox" aria-expanded=${menu} onClick=${() => setMenu(!menu)}>${opts.find(([k]) => k === scope)[1]}<${Icon} n="chevron-down" s=${16} /></button>
      ${menu && html`<div class="supp-menu" role="listbox">${opts.map(([k, l]) => html`<button role="option" aria-selected=${k === scope} class=${k === scope ? 'on' : ''} onClick=${act(() => { P.suppScope = k; setMenu(false); })}>${l}</button>`)}</div>`}</div>
    ${scope === 'chapter' && html`<div class="supp-tabs" role="tablist">${kinds.map(([k, l]) => html`<button role="tab" aria-selected=${k === tab} class=${k === tab ? 'on' : ''} onClick=${act(() => { P.suppTab = k; })}>${l}</button>`)}</div>`}
    <div class="supp-b" key=${scope + page + tab}>${scope === 'page'
      ? SUPP[PAGES[page].id].map((g) => html`<section class="sg"><h5>${g.g}</h5><div class="sg-rows">${g.items.map((it) => row(it, true))}</div></section>`)
      : all.filter((x) => x.items.some((it) => it.k === tab)).map((x) => html`<section class="sg">
          <button class=${'pglink' + (x.i === page ? ' here' : '')} disabled=${x.i === page} onClick=${act(() => { turn(side, x.i - page); })}>第 ${PAGES[x.i].nums[0]} 頁${x.i === page ? '・目前這頁' : html`<${Icon} n="arrow-right" s=${14} />`}</button>
          <div class="sg-rows">${x.items.filter((it) => it.k === tab).map((it) => row(it, false))}</div></section>`)}</div>
  </aside>`;
}
/* 打開的那一則。老師打開的（鎖定螢幕）學生不能自己關，老師關了就關；畫面上不另外寫提示（2026-11-03） */
function SuppView({ side }) {
  const P = side === 'teacher' ? S.t : S.s, it = P.supp;
  const byT = side === 'student' && it.byTeacher, canClose = !(byT && locked());
  const close = act(() => closeSupp(side));
  const body = it.k === 'image' ? html`<img class="sv-img" src=${it.src} alt=${it.t} />`
    : it.k === 'video' ? html`<div class="sv-video"><img class="sv-img" src=${it.src} alt="" /><span class="vm2"><${Icon} n="play" s=${28} /></span></div>`
    : it.k === 'web' ? (it.embed ? html`<div class="sv-web"><img src=${it.shot} alt=${it.t + '網頁畫面'} /></div>`
      : html`<div class="sv-nopv"><span class="ic"><${Icon} n="eye-off" s=${24} /></span><b>此網頁不支援預覽</b><span>以新視窗開啟網頁吧！</span></div>`)
    : html`<p class="sv-text">${it.body}</p>`;
  return html`<div class="scrim" style="z-index:30" onClick=${(e) => { if (canClose && e.target === e.currentTarget) close(); }}>
    <div class=${'supp-view ' + it.k + (it.k === 'text' ? '' : ' big')} role="dialog" aria-label=${it.t}>
      <div class="pop-h"><h4>${it.t}</h4>${it.k === 'web' && html`<a class=${'btn sm open-win' + (it.embed ? ' sec' : '')} href=${it.url} target="_blank" rel="noopener">以新視窗開啟<${Icon} n="arrow-up-right" s=${16} /></a>`}${canClose ? html`<button class="x-btn" aria-label="關閉" onClick=${close}><${Icon} n="x" /></button>` : ''}</div>
      <div class="pop-b">${body}</div>
    </div></div>`;
}
/* 閱讀畫面的形狀夥伴：上課時躲起來讓學生專心，只在被加分、答對答錯、交出作答、第一次見面時從右下角冒出來說一句話，說完再躲回去（乙練 2026-10-30） */
function Buddy() {
  const s = S.s, rx = s.rx;
  if (!rx || !rx.msg) return null;
  const [eye, cls] = REACT[rx.kind];
  return html`<div class="buddy pop-up" key=${rx.id} aria-live="polite">
    <span class="say">${rx.msg}</span>
    <${Companion} shape=${s.avatar.shape} eye=${s.avatar.eye} mood=${eye} box=${84} cls=${cls} /></div>`;
}
/* 書櫃右下角探出頭的夥伴：點了輪流說話（提到今天被加幾分）；很久沒來會睡著，點一下叫醒；有新書會提醒 */
function pokeShelf() {
  const s = S.s, T = TALK[s.avatar.shape];
  if (s.shelfMood === 'away') { s.shelfMood = 'idle'; S.flags.woke = true; return say(T.wake[1], 'celebrating', 2800); }
  const L = T.poke.slice();
  if (s.todayBonus > 0) L.unshift(['celebrating', `今天老師幫你加了 ${s.todayBonus} 分，好厲害！`]);
  s.pokeI = ((s.pokeI ?? -1) + 1) % L.length;
  S.flags.shelfPoked = true; say(L[s.pokeI][1], L[s.pokeI][0], 3200);
}
function ShelfBuddy() {
  const s = S.s; const hint = useHint();
  if (!s.avatar) return null;
  const T = TALK[s.avatar.shape], away = s.shelfMood === 'away' && !s.rx, rx = s.rx;
  const msg = rx ? rx.msg : away ? T.away : null;
  const [eye, cls] = away ? ['flat', 'sleep'] : REACT[rx ? rx.kind : 'idle'];
  return html`<button class=${'shelf-buddy' + (msg ? ' out' : '') + ' ' + hint('s-buddy')} title="點我聊聊天" onClick=${act(pokeShelf)}>
    <span class=${'say' + (msg ? '' : ' peek')} key=${rx ? 'm' + rx.id : away ? 'zz' : 'pk'}>${msg || '點我聊聊天'}</span>
    <${Companion} shape=${s.avatar.shape} eye=${s.avatar.eye} mood=${eye} box=${132} cls=${cls} key=${rx ? rx.id : away ? 'zz' : 'idle'} /></button>`;
}
/* 下課：老師按「結束上課」後學生畫面整頁換成這裡（Rong 原型）。心情只能選一次，點夥伴換一句下課的話 */
const END_CF = Array.from({ length: 18 }, (_, i) => ({ left: (i * 37) % 100, d: (i % 6) * .35, x: ((i * 53) % 160) - 80, r: (i * 97) % 540, s: 10 + (i % 4) * 5, c: ['#F0FF62', '#FF87C7', '#03C5E9', '#00A36E', '#FF854A', '#7F6CDF', '#F3C11B'][i % 7], k: ['c', 'sq', 'tri', 'peb'][i % 4] }));
/* 下課畫面精簡（2026-11-03）：拿掉英文小標、心情選項上的小夥伴、沒有內容時的鼓勵句，夥伴的話已經在泡泡裡 */
function EndScreen() {
  const s = S.s, a = s.avatar || { shape: 'pink', eye: 'happy' }, e = s.end || { marks: 0, right: 0, sent: 0, bonus: 0, msgI: 0 }; const hint = useHint();
  const md = s.mood && MOODS.find((m) => m.id === s.mood), R = RTALK[a.shape], B = TALK[a.shape].brk;
  const msg = e.msgI ? B[(e.msgI - 1) % B.length] : md ? R.moods[md.id] : R.endStart;
  const parts = [e.marks && `畫了 ${e.marks} 筆重點`, e.right && `答對 ${e.right} 題`, e.sent && `交了 ${e.sent} 次作答`].filter(Boolean);
  const sum = (parts.length ? `今天你${parts.join('、')}。` : '') + (e.bonus > 0 ? `老師幫你加了 ${e.bonus} 分。` : ''); // 加分是老師做的，另起一句（原本會變成「今天你老師加了 1 分」）
  return html`<div class="endscr" style=${{ '--sc': SH[a.shape].color }}>
    <div class="end-cf" aria-hidden="true">${END_CF.map((c) => html`<i class=${'cf ' + c.k} style=${{ left: c.left + '%', '--x': c.x + 'px', '--r': c.r + 'deg', '--d': c.d + 's', '--s': c.s + 'px', '--c': c.c }}></i>`)}</div>
    <div class="end-in">
      <h1>下課囉！</h1>
      <div class="end-say" key=${msg}>${msg}</div>
      <button class="end-pal" title="點我換一句" onClick=${act(() => { e.msgI = (e.msgI || 0) + 1; })}><${Companion} shape=${a.shape} eye=${md ? md.eye : a.eye} box=${190} cls="jump" key=${(s.mood || '') + e.msgI} /></button>
      <p class="end-q">今天上課的心情是？</p>
      <div class="moods" role="radiogroup" aria-label="今天上課的心情">${MOODS.map((m) => html`<button role="radio" aria-checked=${s.mood === m.id} class=${'mood' + (s.mood === m.id ? ' on' : '') + ' ' + (m.id === 'learned' ? hint('s-mood') : '')} disabled=${!!s.mood && s.mood !== m.id} onClick=${act(() => { if (!s.mood) { s.mood = m.id; e.msgI = 0; } })}>${m.label}</button>`)}</div>
      ${sum ? html`<p class="end-sum">${sum}</p>` : ''}
      <button class=${'btn ' + hint('s-end-shelf')} onClick=${act(endToShelf)}>回書櫃<${Icon} n="arrow-right" s=${18} /></button>
    </div>
  </div>`;
}

/* ───────── 學生端 ───────── */
/* 試做（2026-10-28）：跟隨老師時，除了頁碼，也跟「老師聚焦的段落」——學生這頁比畫面長（字調大、行距調寬）時，自動捲到那一段，段落放在畫面中間。
   只同步聚焦哪一段，不同步捲動位置；取消跟隨就不捲 */
function FollowScroll({ f }) {
  const ref = useRef();
  const key = f ? `${f.page}|${f.blk}` : '';
  useEffect(() => {
    if (!f || !ref.current) return;
    const frame = ref.current.closest('.pageframe');
    const blk = frame && frame.querySelector(`.sheet [data-para="${f.blk}"], .sheet [data-block-id="${f.blk}"]`);
    if (!blk) return;
    const fr = frame.getBoundingClientRect(), br = blk.getBoundingClientRect();
    const k = fr.height / frame.clientHeight || 1; // 裝置畫面有縮放，換回頁面本身的 px
    const top = frame.scrollTop + (br.top - fr.top + br.height / 2 - fr.height / 2) / k;
    const max = frame.scrollHeight - frame.clientHeight;
    const to = Math.max(0, Math.min(max, top));
    if (Math.abs(to - frame.scrollTop) > 2) {
      frame.scrollTo({ top: to, behavior: 'smooth' });
      if (S.s.rs && S.s.rs.fs > DEFAULT_RS.fs && f.blk === 'p2') { S.flags.followScrolled = true; refresh(); }
    }
  }, [key]);
  return html`<span ref=${ref} hidden></span>`;
}
function TeacherChip({ tile }) {
  const hint = useHint();
  const lock = locked(), on = following();
  const tp = PAGES[S.t.page].nums[0];
  return html`<button class=${(tile ? 'tile tchip-tile' : 'tchip') + (on ? ' on' : '') + (lock ? ' locked' : '') + ' ' + hint('s-follow')} aria-pressed=${on} disabled=${lock} aria-label=${lock ? '老師鎖定中' : on ? '跟隨老師中' : '跟隨老師'}
    title=${lock ? '老師鎖定螢幕中，畫面一定跟著老師' : on ? '再點一次，或自己翻頁，就停止跟隨' : `點一下，跟著${TS}翻頁`} onClick=${act(() => setFollow(!on))}>
    <span class="tav">${lock ? html`<${Icon} n="lock" s=${14} />` : '方'}</span><span class="pgn">p.${tp}</span></button>`; // 只留頭像＋頁碼：藍底＝跟隨中、白底＝沒跟、深色鎖頭＝鎖定（2026-11-03）
}
function StudentApp() {
  const s = S.s;
  if (s.screen === 'login') return html`<${Login} />`;
  if (s.screen === 'pick') return html`<${Pick} />`;
  if (s.screen === 'end') return html`<${EndScreen} />`;
  const page = sPage(), pid = PAGES[page].id;
  const myInk = inkOf('student', page);
  const task = S.task;
  const taskLayer = task && task.type === 'shot' && !onPaper(task) && page === task.page && !answering(page) && S.s.inClass ? (task.subs[ME] ? task.subs[ME].ink : task.mine) : [];
  const live = s.inClass && S.cls.live;
  const lock = locked(), on = following();
  const w = fitW(page, s.rs);
  const left = timeLeft();
  return html`<div class="reader">
    <${Rail} side="student" />
    <div class="topbar">
      ${live ? ''
        : ''}
      ${live && html`<${TaskBar} />`}
      <span class="spacer"></span>
    </div>
    <div class="pageframe">
      <${FollowScroll} f=${following() ? focusOn(page) : null} />
      <div style="position:relative">
        <${Sheet} page=${page} w=${w - 16} rs=${s.rs} f=${following() ? focusOn(page) : null} cls=${answering(page) ? 'answering' : ''} layers=${[pgl(s.ink, pid), taskLayer, answering(page) ? task.mine : []]}
          draw=${!lock && html`<${DrawLayer} page=${page} tool=${s.tool} brush=${s.brush[s.tool === 'compass' ? 'pen' : s.tool]} color=${answering(page) ? COLORS.answer : null}
            onStroke=${act((st) => { myInk.push(st); s.redo = []; })} onErase=${act((p) => eraseAt(myInk, p))} onEraseRect=${act((r) => { eraseRect(myInk, r); eraseStickers(pgl(s.stickers, pid), r); })}
            onPlace=${act((p) => pgl(s.stickers, pid).push({ id: uid(), x: p[0], y: p[1], e: s.sticker }))} />`}>
          <${Stickers} P=${s} page=${page} /><${Notes} P=${s} page=${page} />
          ${lock && html`<div class="lockcover" onClick=${act(() => toast('student', '老師鎖定了螢幕'))}></div>`}
        </${Sheet}>
      </div>
    </div>
    ${S.timer && live && html`<div class=${'timer-card' + (S.timer.done ? ' done' : !S.timer.paused && timeLeft() <= 10 ? ' hurry' : '')} role="timer" aria-label="老師的計時器">
      <${Ring} size=${104} frac=${S.timer.done ? 1 : timeLeft() / S.timer.total} done=${S.timer.done}>
        <b class="tm-t sm">${S.timer.done ? '時間到' : mmss(timeLeft())}</b>${S.timer.paused && html`<small>暫停中</small>`}
      </${Ring}></div>`}
    ${'' /* 加分提示只留右下角夥伴說話，右上角的卡片拿掉（2026-11-03 乙練） */}
    ${s.avatar && html`<${Buddy} />`}
    ${s.pop === 'supp' && !lock && html`<${BRIDGE.Supplements} side="student" />`}
    ${s.pop && s.pop !== 'supp' && html`<${Layer} P=${s} center=${s.pop !== 'settings' && s.pop !== 'toc'}>
      ${s.pop === 'toc' && html`<${Toc} side="student" />`}
      ${s.pop === 'toolbox' && html`<${Toolbox} side="student" />`}
      ${s.pop === 'math' && html`<${MathPop} side="student" />`}
      ${s.pop === 'settings' && html`<${BRIDGE.ReadSettings} side="student" />`}
    </${Layer}>`}
    ${s.board && s.board.open && !lock && html`<${Board} side="student" />`}
    ${s.mtools && Object.keys(s.mtools).length > 0 && !lock && html`<${MathTools} side="student" />`}
    ${s.hl && !lock && html`<${HighlightView} side="student" />`}
    ${answeringPaper() && !s.paperHidden && s.modal !== 'submit' && html`<${PaperAnswer} />`}
    ${s.stickerPop && !lock && html`<${StickerPop} side="student" />`}
    ${s.notice && !s.modal && !S.shared && html`<${Notice} />`}
    ${s.modal === 'submit' && html`<${SubmitDialog} />`}
    ${s.modal === 'feedback' && html`<${FeedbackDialog} />`}
    ${s.modal === 'choice' && html`<${ChoiceDialog} />`}
    ${s.modal === 'text' && html`<${TextDialog} />`}
    ${s.modal === 'voice' && html`<${VoiceDialog} />`}
    ${s.modal === 'result' && html`<${ResultDialog} />`}
    ${s.invite && html`<${Invite} />`}
    ${S.shared && s.inClass && html`<${SharedView} />`}
  </div>`;
}
function Notice() {
  const s = S.s, task = S.task, n = s.notice; const hint = useHint();
  const close = act(() => { s.notice = null; });
  const x = html`<button class="x-btn close" aria-label="關閉" onClick=${close}><${Icon} n="x" s=${16} /></button>`;
  if (n.kind === 'over') return html`<div class="notice over"><span class="ic"><${Icon} n="check" /></span><div><h5>作答結束了</h5><p>老師已經結束作答，這次的任務不能再送出。</p></div>${x}</div>`;
  if (!task) return null;
  if (n.kind === 'feedback') return html`<div class="notice done"><span class="ic"><${Icon} n="pencil" /></span><div><h5>老師回饋了你的作答</h5><p>任務結束了。老師在你的答案上畫了批註，點開看看。</p>
    <div class="row"><button class=${'btn xs ' + hint('s-feedback')} onClick=${act(() => { s.modal = 'feedback'; s.notice = null; S.flags.feedbackSeen = true; })}>查看回饋</button></div></div>${x}</div>`;
  if (n.kind === 'done') return html`<div class="notice done"><span class="ic"><${Icon} n="party" /></span><div><h5>已送出這一頁給老師！</h5><p>畫筆、便利貼的作答留在課本上。想改的話，再按一次「送出畫面」就會蓋掉前一次。</p></div>${x}</div>`;
  if (task.type !== 'shot') return null;
  const onTaskPage = onPaper(task) || sPage() === task.page;
  if (onPaper(task)) return html`<div class="notice"><span class="ic"><${Icon} n="send" /></span><div><h5>老師派了手寫題！</h5>
    <p>這題畫在${paperName(task)}上，畫好按「送出畫面」。</p>
    <div class="row"><button class="btn xs" onClick=${act(() => { s.paperHidden = false; s.notice = null; })}>開始畫</button></div></div>${x}</div>`;
  return html`<div class="notice"><span class="ic"><${Icon} n="send" /></span><div><h5>老師派了手寫題！</h5>
    <p>請在 p.${PAGES[task.page].nums[0]} 作答，完成後按上方的「送出畫面」。</p>
    <div class="row">${onTaskPage ? html`<button class=${'btn xs ' + hint('s-submit')} onClick=${act(() => { s.tool = 'pen'; s.notice = null; })}>拿起畫筆作答</button>`
      : html`<button class=${'btn xs ' + hint('s-goto')} onClick=${act(() => { if (following() && !locked()) setFollow(false); if (!locked()) s.page = task.page; s.tool = 'pen'; s.notice = null; })}>前往 p.${PAGES[task.page].nums[0]} 作答</button>`}</div></div>${x}</div>`;
}
/* 學生端頁面上方的任務列：只要有任務就一直在，關掉視窗也找得到 */
function TaskBar() {
  const s = S.s, task = S.task; const hint = useHint();
  if (!task) return null;
  if (task.type === 'choice') {
    const mine = task.answers[ME];
    if (task.status === 'collecting') return html`<span class="taskbar">${typeName(task)}<button class=${'btn xs ' + hint('s-choice-open')} onClick=${act(() => { s.modal = 'choice'; })}>${mine ? '查看' : '作答'}</button></span>`;
    if (task.status === 'closed') return html`<span class="taskbar done">作答結束</span>`;
    return html`<span class="taskbar done">已公布答案<button class="btn xs" onClick=${act(() => { s.modal = 'result'; })}>看結果</button></span>`;
  }
  if (task.type === 'text') {
    const mine = task.texts[ME];
    if (task.status === 'collecting') return html`<span class="taskbar">文字題<button class="btn xs" onClick=${act(() => { s.modal = 'text'; })}>${mine ? '查看' : '作答'}</button></span>`;
    return html`<span class="taskbar done">作答結束</span>`;
  }
  if (task.type === 'voice') {
    const mine = task.voices[ME];
    if (task.status === 'collecting') return html`<span class="taskbar">聲音題<button class=${'btn xs ' + hint('s-rec-open')} onClick=${act(() => { s.modal = 'voice'; })}>${mine ? '查看' : '錄音'}</button></span>`;
    return html`<span class="taskbar done">作答結束</span>`;
  }
  const tp = task.page, onPage = onPaper(task) || sPage() === tp, sub = task.subs[ME];
  if (task.status === 'stopped') {
    const fb = myFeedback();
    return html`<span class="taskbar done">作答結束${fb ? html`<button class=${'btn xs ' + hint('s-feedback')} onClick=${act(() => { s.modal = 'feedback'; s.notice = null; S.flags.feedbackSeen = true; })}>查看回饋</button>` : ''}</span>`;
  }
  return html`<span class="taskbar">手寫題${onPaper(task) ? '' : ` p.${PAGES[task.page].nums[0]}`}
    ${onPage ? html`<button class=${'btn xs ' + hint('s-submit')} onClick=${act(() => { s.modal = 'submit'; s.tool = null; s.notice = null; })}>${sub ? '再送一次' : '送出畫面'}</button>`
      : html`<button class=${'btn xs ' + hint('s-goto')} onClick=${act(() => { if (following() && !locked()) setFollow(false); if (!locked()) s.page = tp; s.tool = 'pen'; s.notice = null; })}>前往作答</button>`}</span>`;
}
/* 上課邀請：學生畫面正中央彈窗，只有「加入課堂」一個按鈕，不能關掉（2026-11-03） */
function Invite() {
  const hint = useHint();
  return html`<div class="scrim"><div class="dialog invite-dlg" role="dialog" aria-label="老師開始上課了">
    <span class="ic"><${Pebble} shape=${S.cls.subj} size=${80} dark=${true} /></span>
    <h4>老師開始上課了</h4>
    <p>${S.cls.cid} ${S.cls.subj}　${TS}</p>
    <button class=${'btn ' + hint('s-join')} onClick=${act(joinStudent)}>加入課堂</button></div></div>`;
}
const dlg = (label, body, onClose, cls = '') => html`<div class="scrim" onClick=${act((e) => { if (e.target === e.currentTarget) onClose(); })}><div class=${'dialog ' + cls} role="dialog" aria-label=${label}>${body}</div></div>`;
function ChoiceDialog() {
  const s = S.s, t = S.task; const hint = useHint();
  const [sel, setSel] = useState(t ? t.answers[ME] || null : null);
  if (!t) return null;
  const mine = t.answers[ME], open = t.status === 'collecting';
  const close = () => { s.modal = null; };
  // 時間到（結束作答）之前都可以改，再按一次送出就換掉
  return dlg(typeName(t), html`
    <div class="pop-h"><h4>${typeName(t)}</h4><button class="x-btn" aria-label="縮小" onClick=${act(close)}><${Icon} n="x" /></button></div>
    <div class="pop-b">
      ${t.q && html`<div class="qline">${t.q}</div>`}
      <div class=${'abtns' + (t.tf ? ' tf' : '')}>${optLetters(t).map((L, i) => html`<button disabled=${!open} class=${'abtn' + (sel === L ? ' on' : '') + (mine === L ? ' sent' : '') + ' ' + (L === 'B' ? hint('s-pickB') : '')} onClick=${() => setSel(L)}>${L}${t.opts[i] && html`<span>${t.opts[i]}</span>`}</button>`)}</div>
      ${open && html`<div class="dialog-foot"><button class=${'btn sm ' + hint('s-choice-send')} disabled=${!sel || sel === mine} onClick=${act(() => answerChoice(sel))}>${mine ? '改成這個' : '送出'}</button></div>`}
    </div>`, act(close), 'ans-dlg');
}
function TextDialog() {
  const s = S.s, t = S.task; const hint = useHint();
  const [txt, setTxt] = useState(t ? t.texts[ME] || '' : '');
  const [editing, setEditing] = useState(!(t && t.texts[ME]));
  if (!t) return null;
  const close = () => { s.modal = null; };
  return dlg('文字題', html`
    <div class="pop-h"><h4>文字題</h4><button class="x-btn" aria-label="縮小" onClick=${act(close)}><${Icon} n="x" /></button></div>
    <div class="pop-b">
      ${t.q && html`<div class="qline">${t.q}</div>`}
      ${editing ? html`<textarea class="inp" id="text-ans" placeholder="在這裡打字回答" value=${txt} onInput=${(e) => setTxt(e.target.value)}></textarea>
        <div class="dialog-foot"><button class=${'btn sm ' + hint('s-text-send')} disabled=${!txt.trim()} onClick=${act(() => { submitText(txt.trim()); setEditing(false); })}>送出</button></div>`
        : html`<div class="text-big" style="font-size:20px;min-height:120px;padding:20px 24px">${t.texts[ME]}</div>
          ${t.status === 'collecting' && html`<div class="dialog-foot"><button class="btn sm sec" onClick=${() => setEditing(true)}>修改</button></div>`}`}
    </div>`, act(close), 'ans-dlg');
}
/* 檢討時的名字膠囊（沒作答那一頁等）：點一下就 +1，右邊顯示 +N，跟選擇題同一款 */
function NameChips({ t, list }) {
  return html`<div class="who-chose names-big">${list.map((x) => { const got = (t.gave || {})[x] || 0;
    return html`<button data-seat=${x} class=${'nm-chip sk' + drawnCls(x) + gotCls(t, x) + (S.t.scoreMode === 'minus' ? ' m' : '')} aria-label=${`${nameOf(x)}，點一下${S.t.scoreMode === 'minus' ? '扣' : '加'} 1 分`} onClick=${act((e) => rvScore(t, x, e.currentTarget.querySelector('.sk-dot')))}><span class=${'sk-dot' + kidCls(t, x)}><${SeatFace} t=${t} seat=${x} box=${52} /><${SeatSc} t=${t} seat=${x} /></span><span class="sk-nm">${nameOf(x)}</span></button>`; })}${!list.length && html`<span class="muted">沒有人</span>`}</div>`;
}
/* 檢討的最下面一列（大屏上老師好按）：有作答／沒作答分頁、抽籤、有作答 +1、再派一題 */
/* 檢討：名單上方一排「看哪群人」（底線分頁）＋右邊加分／扣分（管點名字）；最下面一排只放動作（2026-11-03 乙練選 C） */
function RvHead({ tabs, cur, onTab, list, label, plusHint = '', onPlus, d = 1 }) { // 加減分都在這一排右邊：模式切換＋整組 ±1（2026-11-03 乙練）；d = 0：這組沒有整組加減分（答錯）
  return html`<div class="rv-head"><div class="rv-tabs" role="tablist">${tabs.map(([k, l, n]) => html`<button role="tab" aria-selected=${cur === k} class=${cur === k ? 'on' : ''} onClick=${act(() => { onTab(k); S.drawn = null; })}>${l} ${n}</button>`)}</div>
    <span class="rv-score"><${ScoreMode} />${d !== 0 && html`<button class=${'btn xs ' + (d > 0 ? 'lime ' + plusHint : 'red')} disabled=${!list.length} onClick=${act(() => { onPlus(d); if (d > 0) burstSeats(list); })}>${label} ${d > 0 ? '+1' : '−1'}</button>`}</span></div>`;
}
function RvFoot({ list }) {
  const hint = useHint();
  return html`<div class="rv-foot">
    <button class="btn xs sec" disabled=${!list.length} onClick=${act(() => draw(list))}>${S.drawing ? html`<span class="dice-spin"><${Icon} n="dice" s=${16} /></span>` : '抽籤'}</button>
    <button class=${'btn xs sec ' + hint('t-next-task')} onClick=${act(endTask)}>再派一題</button></div>`;
}
/* 聲音題檢討（2026-11-04 乙練）：座號圈＝照上方「加分｜扣分」加減分（跟名單、其他題型同一套，滑過先預告 +1／−1）；名字下面「▶ 0:04」小膠囊＝播放 */
function ShotSeat({ t, seat }) {
  const hint = useHint(), minus = S.t.scoreMode === 'minus';
  return html`<div data-seat=${seat} class=${'vs' + drawnCls(seat)}>
    <button class=${'vs-c' + kidCls(t, seat) + (minus ? ' m' : '')} aria-label=${`幫 ${nameOf(seat)} ${minus ? '扣' : '加'} 1 分`} onClick=${act((e) => rvScore(t, seat, e.currentTarget))}>
      <span class="vs-face"><${SeatFace} t=${t} seat=${seat} box=${50} /></span><i class="vs-hv">${minus ? '−1' : '+1'}</i><${SeatSc} t=${t} seat=${seat} /></button>
    <span class="vs-nm">${nameOf(seat)}</span>
    <button class=${'vs-pl' + (seat === ME ? ' ' + hint('t-detail') : '')} aria-label=${`看 ${nameOf(seat)} 的作品`} onClick=${act(() => openDetail(seat))}><${Icon} n="eye" s=${13} /><em>看作品</em></button>
  </div>`;
}
function VoiceSeat({ t, seat, readonly }) { // readonly：學習紀錄裡回看，座號圈不能加減分
  const v = t.voices[seat], key = 'v' + t.id + seat, on = S.playingVoice === key, hint = useHint(), minus = S.t.scoreMode === 'minus';
  return html`<div data-seat=${seat} class=${'vs' + drawnCls(seat) + (on ? ' on' : '')}>
    <button class=${'vs-c' + kidCls(t, seat) + (minus ? ' m' : '') + (readonly ? ' ro' : '')} disabled=${readonly} aria-label=${readonly ? `${pad(seat)} ${nameOf(seat)}` : `幫 ${nameOf(seat)} ${minus ? '扣' : '加'} 1 分`} onClick=${readonly ? undefined : act((e) => rvScore(t, seat, e.currentTarget))}>
      <span class="vs-face"><${SeatFace} t=${t} seat=${seat} box=${50} /></span><i class="vs-hv">${minus ? '−1' : '+1'}</i><${SeatSc} t=${t} seat=${seat} /></button>
    <span class="vs-nm">${nameOf(seat)}</span>
    <button class=${'vs-pl' + (on ? ' on' : '') + (seat === ME ? ' ' + hint('t-voice-play') : '')} style=${on ? `--p:${Math.round(voiceFrac() * 100)}%` : ''} aria-label=${(on ? '暫停 ' : '播放 ') + nameOf(seat)} onClick=${act(() => { playVoice(key); S.flags.voicePlayed = true; })}><${Icon} n=${on ? 'pause' : 'play'} s=${12} /><em>${on ? mmss(Math.floor(voiceFrac() * v.sec)) : mmss(v.sec)}</em></button>
  </div>`;
}
/* 聲音題的一份回答：一格一位，上面座號名字，中間播放鍵和長度，右上角 +1（點了直接加分） */
function VoiceTile({ t, seat, live }) {
  const v = (t.voices || {})[seat], key = 'v' + t.id + seat, on = S.playingVoice === key, got = (t.gave || {})[seat] || 0; const hint = useHint();
  if (!v) return html`<div class="vt empty"><div class="vt-h"><span class="seat off">${pad(seat)}</span>${nameOf(seat)}</div><span class="vt-none">未作答</span></div>`;
  return html`<div data-seat=${seat} class=${'vt' + drawnCls(seat) + (on ? ' on' : '')}>
    <div class="vt-h">${live !== false ? html`<${SeatBtn} t=${t} seat=${seat} />` : html`<span class="seat">${pad(seat)}</span>`}${nameOf(seat)}</div>
    <button class=${'vt-play ' + (seat === ME ? hint('t-voice-play') : '')} aria-label=${(on ? '暫停 ' : '播放 ') + nameOf(seat)} onClick=${act(() => { playVoice(key); S.flags.voicePlayed = true; })}>
      <span class="vplay"><${Icon} n=${on ? 'pause' : 'play'} s=${14} /></span><span class="vt-wave" aria-hidden="true">${[6, 10, 14, 9, 12, 7, 11, 8].map((h) => html`<i style=${{ height: h + 'px' }}></i>`)}</span><span class="vsec">${mmss(v.sec)}</span></button>
  </div>`;
}
/* 聲音題作答：開始錄音 → 停止 → 先聽一次 → 送出。示範不開麥克風：波形是假的，播放用示範音檔 */
function VoiceDialog() {
  const s = S.s, t = S.task; const hint = useHint();
  const mine = t && t.voices[ME];
  const [ph, setPh] = useState(mine ? 'sent' : 'idle');
  const [sec, setSec] = useState(mine ? mine.sec : 0);
  useEffect(() => { if (ph !== 'rec') return; const id = setInterval(() => setSec((x) => x + 1), 1000); return () => clearInterval(id); }, [ph]);
  if (!t) return null;
  const close = () => { s.modal = null; };
  const bars = Array.from({ length: 28 }, (_, i) => 6 + ((i * 37 + sec * 13) % 26));
  return dlg('聲音題', html`
    <div class="pop-h"><h4>聲音題</h4><button class="x-btn" aria-label="縮小" onClick=${act(close)}><${Icon} n="x" /></button></div>
    <div class="pop-b">
      ${t.q && html`<div class="qline">${t.q}</div>`}
      <div class=${'rec ' + ph}>
        <div class="rec-wave" aria-hidden="true">${bars.map((h, i) => html`<i style=${{ height: (ph === 'rec' ? h : ph === 'idle' ? 4 : 6 + ((i * 29) % 20)) + 'px' }}></i>`)}</div>
        <b class="rec-t">${mmss(sec)}</b>
        ${ph === 'idle' && html`<button class=${'rec-btn ' + hint('s-rec')} aria-label="開始錄音" onClick=${() => { setSec(0); setPh('rec'); }}><${Icon} n="mic" s=${28} /></button>`}
        ${ph === 'rec' && html`<button class="rec-btn on" aria-label="停止錄音" onClick=${() => setPh('done')}><${Icon} n="square" s=${24} /></button>`}
        ${(ph === 'done' || ph === 'sent') && html`<button class=${'rec-btn play' + (S.playingVoice === 'me' ? ' on' : '')} aria-label=${S.playingVoice === 'me' ? '暫停' : '播放'} onClick=${act(() => playVoice('me'))}><${Icon} n=${S.playingVoice === 'me' ? 'pause' : 'play'} s=${26} /></button>`}
      </div>
      ${(ph === 'done' || (ph === 'sent' && t.status === 'collecting')) && html`<div class="dialog-foot">
        <button class="btn sm sec" onClick=${() => { setSec(0); setPh('idle'); }}>重錄</button>
        ${ph === 'done' && html`<button class=${'btn sm ' + hint('s-rec-send')} onClick=${act(() => submitVoice(sec || 1))}>送出</button>`}
      </div>`}
    </div>`, act(close), 'ans-dlg');
}
/* 學生看答題結果：夥伴開口跟學生說（第一句就是結果，接夥伴的話），下面灰底卡片放答案；
   老師有打題目或選項文字就列出來，沒有就只排字母。正確＝綠框打勾，你選的＝灰框，不用紅色（2026-11-04 乙練） */
function ResultDialog() {
  const s = S.s, t = S.task;
  if (!t || t.type !== 'choice' || !t.correct) return null;
  const mine = t.answers[ME], L = optLetters(t), txt = (x) => (t.opts || [])[L.indexOf(x)] || '';
  const kind = !mine ? 'none' : mine === t.correct ? 'ok' : 'bad';
  const close = () => { s.modal = null; S.flags.resultSeen = true; };
  const a = s.avatar || { shape: 'pink', eye: 'happy' };
  const nm = (x) => txt(x) || ` ${x}`, say = (k) => line(k).replace(/^答對了[！!，,。]?\s*/, ''), hasText = !!(t.q || L.some((x) => txt(x)));
  const head = { ok: '答對了！', bad: '差一點點', none: '這題你沒有作答' }[kind];
  const body = kind === 'ok' ? `${txt(t.correct) ? `就是${txt(t.correct)}` : `答案就是 ${t.correct}`}，${say('right')}`
    : kind === 'bad' ? `答案是${nm(t.correct)}，你選了${nm(mine)}。${say('wrong')}` : `答案是${nm(t.correct)}，下次一起試試看。`;
  return dlg('答題結果', html`<div class="pop-b" style="padding-top:24px">
    <div class="rs-talk"><span class="rs-pal"><${Companion} shape=${a.shape} eye=${kind === 'ok' ? 'happy' : 'calm'} box=${84} cls=${kind === 'ok' ? 'jump' : 'sway'} /></span>
      <div class=${'rs-bub ' + kind}><b>${head}</b>${body}</div></div>
    <div class="rs-card">${hasText ? html`${t.q && html`<p class="rs-q">${t.q}</p>`}${L.map((x) => html`<div class=${'rs-opt' + (x === t.correct ? ' right' : x === mine ? ' mine' : '')}><i>${x}</i>${txt(x)}<small>${x === t.correct ? (x === mine ? '✓ 正確答案・你選的' : '✓ 正確答案') : x === mine ? '你選的' : ''}</small></div>`)}`
      : html`<div class="rs-letters">${L.map((x) => html`<span class=${x === t.correct ? 'right' : x === mine ? 'mine' : ''}>${x}${x === t.correct ? html`<em>✓ 正確答案</em>` : x === mine ? html`<em>你選的</em>` : ''}</span>`)}</div>`}</div>
    <div class="dialog-foot" style="justify-content:center"><button class="btn sm" onClick=${act(close)}>知道了</button></div></div>`, act(close), 'ans-dlg');
}
function FeedbackDialog() {
  const s = S.s, sub = myFeedback();
  if (!sub) return null;
  return dlg('老師回饋', html`
    <div class="pop-h"><div><h4>老師的回饋</h4><p class="sub2">${onPaper(S.task) ? paperName(S.task) : `p.${PAGES[S.task.page].nums[0]} · ${PAGES[S.task.page].title}`}</p></div><button class="x-btn" aria-label="關閉" onClick=${act(() => { s.modal = null; })}><${Icon} n="x" /></button></div>
    <div class="pop-b"><div class="big-work"><${Work} t=${S.task} w=${552} layers=${[sub.ink, sub.notes]} /></div>
      <div class="dialog-foot"><button class="btn sm" onClick=${act(() => { s.modal = null; })}>知道了</button></div></div>`, act(() => { s.modal = null; }), 'submit-dlg');
}
function SubmitDialog() {
  const s = S.s, task = S.task; const hint = useHint();
  if (!task) return null;
  const pageInk = onPaper(task) ? [] : pgl(s.ink, PAGES[task.page].id);
  return dlg('送出畫面', html`
    <div class="pop-h"><h4>送出畫面</h4></div>
    <div class="pop-b">
      <div class="big-work"><${Work} t=${task} w=${552} layers=${[pageInk, task.mine]} /></div>
      <div class="dialog-foot"><button class="btn sec sm" onClick=${act(() => { s.modal = null; s.tool = 'pen'; })}>再改一下</button><button class=${'btn sm ' + hint('s-confirm')} onClick=${act(submit)}>送出</button></div>
    </div>`, act(() => { s.modal = null; }), 'submit-dlg');
}
function SharedView() {
  const seat = S.shared.seat, t = S.task;
  if (!t) return null;
  const text = t.type === 'text', sub = !text && t.subs && t.subs[seat];
  if (text ? !t.texts[seat] : !sub) return null;
  return html`<div class="scrim" style="z-index:45">
    <div class="shared-view" role="dialog" aria-label="老師分享的作品">
      <div class="h"><${Icon} n="cast" /><span class="seat">${pad(seat)}</span><b>${nameOf(seat)}</b></div>
      ${text ? html`<div class="text-big shared-text">${t.texts[seat]}</div>` : html`<${FitWork} t=${t} layers=${[sub.ink, sub.notes]} />`}
    </div>
  </div>`;
}

/* ───────── 管理員：書櫃的「帳號管理」分頁 ───────── */
function AdminApp() { return html`<${Shelf} side="admin" />`; }
const hit = (q, ...xs) => !q.trim() || xs.some((x) => String(x || '').toLowerCase().includes(q.trim().toLowerCase()));
function Accounts() {
  const A = S.admin; const hint = useHint();
  const tab = (k, label, n) => html`<button class=${(A.tab === k ? 'on ' : '') + hint('a-tab-' + k)} onClick=${act(() => { A.tab = k; A.rowMenu = null; })}>${label} <span class="muted" style="font-weight:400">${n}</span></button>`;
  const studentCount = (A.made501 ? STUDENTS.length : 0) + A.others.length;
  const add = { schools: ['新增學校', () => { A.modal = { school: { name: A.madeSchool ? '' : SCHOOL, type: '學校', stage: '國小' } }; }], teachers: ['新增老師', () => { A.modal = { teacher: A.madeTeacher ? { school: A.madeSchool ? SCHOOL : A.schools[0].name, email: '', pw: genPw(), last: '', first: '' } : { school: A.madeSchool ? SCHOOL : A.schools[0].name, email: 'fang@star.example', pw: genPw(), last: '方', first: '小明' } }; }], students: ['新增學生', () => { A.modal = { student: true }; A.justMade = false; }] }[A.tab];
  const ph = { schools: '搜尋學校', teachers: '搜尋教師', students: '搜尋學生' }[A.tab];
  return html`<div class="acc">
    <div class="tabs">${tab('schools', '學校', A.schools.length)}${tab('teachers', '教師', A.teachers.length)}${tab('students', '學生', studentCount)}</div>
    <div class="acc-bar">
      <label class="search"><${Icon} n="search" s=${18} /><input id=${'q-' + A.tab} placeholder=${ph} value=${A.q[A.tab]} onInput=${act((e) => { A.q[A.tab] = e.target.value; })} />${A.q[A.tab] && html`<button class="x-btn" aria-label="清除搜尋" style="width:28px;height:28px" onClick=${act(() => { A.q[A.tab] = ''; })}><${Icon} n="x" s=${14} /></button>`}</label>
      <span class="spacer"></span>
      <button class=${'btn sm ' + hint('a-create')} onClick=${act(add[1])}><${Icon} n="plus" s=${16} />${add[0]}</button>
    </div>
    <${ScrollArea} cls="acc-list" key=${A.tab}>
      ${A.tab === 'schools' && html`<${AdminSchools} />`}
      ${A.tab === 'teachers' && html`<${AdminTeachers} />`}
      ${A.tab === 'students' && html`<${AdminStudents} />`}
    </${ScrollArea}>
  </div>`;
}
/* 清單可以往下捲時，底部一道淡出、右邊細捲軸，看得出還沒完（2026-11-03） */
function ScrollArea({ cls, children }) {
  const ref = useRef(); const [more, setMore] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return;
    const chk = () => setMore(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
    chk(); el.addEventListener('scroll', chk, { passive: true }); const ro = new ResizeObserver(chk); ro.observe(el); const mo = new MutationObserver(chk); mo.observe(el, { childList: true, subtree: true });
    return () => { el.removeEventListener('scroll', chk); ro.disconnect(); mo.disconnect(); }; }, []);
  return html`<div class=${'scroll-wrap' + (more ? ' more' : '')}><div class=${cls} ref=${ref}>${children}</div></div>`;
}
const Empty = ({ cols }) => html`<tr><td colspan=${cols} style="text-align:center;padding:40px 0;color:var(--text-3)">找不到符合的資料</td></tr>`;
/* 列選單（2026-11-03）：「編輯資料」一個入口（基本資料、班級、重設密碼都在裡面），分隔線下面才是停用、刪除。
   items：[文字, 動作, 是否紅字] 或 '-' 分隔線 */
/* 列的「⋯」選單：用自己的 rowMenu，不跟右上角頭像選單（A.menu）共用，按了才不會連頭像選單一起跳出來；
   靠近清單底部就往上開，不被捲動區切掉（2026-11-03 乙練抓到） */
const rowMenu = (A, id, items) => html`<td class="r"><button class="dots" aria-label="更多" aria-expanded=${A.rowMenu === id} onClick=${act((e) => { e.stopPropagation(); A.menu = false;
    const box = e.currentTarget.closest('.acc-list'), r = e.currentTarget.getBoundingClientRect(), br = box ? box.getBoundingClientRect() : null;
    A.rowUp = !!br && br.bottom - r.bottom < 200 && r.top - br.top > br.bottom - r.bottom; /* 上面空間比較多才往上開 */ A.rowMenu = A.rowMenu === id ? null : id; })}>⋯</button>
  ${A.rowMenu === id && html`<div class=${'mini-menu' + (A.rowUp ? ' up' : '')} onClick=${(e) => e.stopPropagation()}>${items.map((it) => (it === '-' ? html`<i class="sep"></i>` : html`<button class=${it[2] ? 'danger' : ''} onClick=${act(() => { A.rowMenu = null; it[1](); })}>${it[0]}</button>`))}</div>`}</td>`;
const OFF = () => html` <span class="chip gray">已停用</span>`;
/* 臨時密碼：8 碼、去掉容易看錯的 0 o 1 l */
const genPw = () => mkPw(Math.random);
const teacherClasses = (t) => (t.me ? S.t.classes.map((x) => ({ c: x.c, subj: x.subj })) : (t.classes || []).map((s) => { const [c, subj] = s.split(' · '); return { c, subj: subj || '自然' }; }));
const setTeacherClasses = (t, list) => { if (t.me) { S.t.classes = list.map((x) => ({ c: x.c, subj: x.subj })); if (S.t.classView && !list.some((x) => x.c === S.t.classView.c && x.subj === S.t.classView.subj)) S.t.classView = null; } else t.classes = list.map((x) => `${x.c} · ${x.subj}`); };
/* 示範版的下載只跳提示：claude.ai 裡真的存檔會先跳「允許此成品下載檔案？」，乙練嫌怪（2026-11-03）。正式網站直接下載 */
function downloadCsv(side, name, header, rows, msg) { downloadRows(name, [header, ...rows]); toast(side, msg, 'download'); }
/* 一所學校的帳密清單：老師一段、學生依班級排 */
function schoolAccountRows(school) {
  const A = S.admin, rows = [];
  A.teachers.filter((t) => t.school === school).forEach((t) => rows.push(['老師', school, teacherClasses(t).map((x) => `${x.c} ${x.subj}`).join('、'), '', t.name, t.email, t.pw || '12345678']));
  if (school === SCHOOL) {
    const st = [...(A.made501 ? STUDENTS.filter((x) => !A.deleted.includes(x.seat)).map((x) => ({ cls: S.removed.includes(x.seat) ? '' : '501', seat: x.seat, name: x.name, acct: x.acct, pw: x.pw })) : []), ...A.others]
      .sort((a, b) => (a.cls || 'zz').localeCompare(b.cls || 'zz') || a.seat - b.seat);
    st.forEach((x) => rows.push(['學生', school, x.cls || '未分班', pad(x.seat), x.name, x.acct, x.pw || '12345678']));
  }
  return rows;
}
const ACCT_HEADER = ['身分', '學校', '班級', '座號', '姓名', '帳號', '密碼'];
const schoolOf = (name) => S.admin.schools.find((x) => x.name === name);
/* 管理員後台目前有的班級（示範建的 501、單筆建的其他班） */
const adminClasses = () => [...new Set([...(S.admin.made501 ? ['501'] : []), ...S.admin.others.map((o) => o.cls).filter(Boolean)])];
function AdminSchools() {
  const A = S.admin;
  const rows = A.schools.filter((x) => hit(A.q.schools, x.name, x.stage, x.type));
  const menu = (s) => [
    ['編輯資料', () => { A.modal = { editSchool: s, d: { name: s.name, type: s.type, stage: s.stage } }; }],
    ['下載帳密清單', () => { const rows = schoolAccountRows(s.name); if (!rows.length) return toast('admin', `${s.name}還沒有任何帳號`); downloadCsv('admin', `${s.name}_帳密清單.csv`, ACCT_HEADER, rows, `已下載 ${s.name} 的帳密清單（${rows.filter((r) => r[0] === '老師').length} 位老師、${rows.filter((r) => r[0] === '學生').length} 位學生）`); }],
    '-',
    [s.off ? '啟用' : '停用', () => { s.off = !s.off; toast('admin', s.off ? `已停用 ${s.name}` : `已啟用 ${s.name}`, s.off ? undefined : 'check'); }],
    ['刪除', () => { A.modal = s.students + s.teachers ? { notice: { title: `還不能刪除 ${s.name}`, body: `還有 ${s.teachers} 位老師、${s.students} 位學生。先刪除或轉走帳號，或改用「停用」。` } }
      : { confirm: { title: `刪除 ${s.name}？`, body: '刪除後無法復原。', label: '刪除學校', onOk: () => { A.schools.splice(A.schools.indexOf(s), 1); toast('admin', `已刪除 ${s.name}`); } } }; }, true],
  ];
  return html`<table class="tbl"><thead><tr><th>學校名稱</th><th>學制</th><th>類型</th><th>學生</th><th>老師</th><th></th></tr></thead><tbody>
    ${!rows.length && html`<${Empty} cols=${6} />`}${rows.map((s, i) => html`<tr class=${(s.fresh ? 'fresh' : '') + (s.off ? ' off' : '')}><td>${s.name}${s.off && OFF()}</td><td>${s.stage}</td><td><span class=${'chip' + (s.type === '學校' ? '' : ' gray')}>${s.type}</span></td><td class="num">${s.students}</td><td class="num">${s.teachers}</td>${rowMenu(A, 'sc' + i, menu(s))}</tr>`)}
  </tbody></table>${A.q.schools.trim() && html`<p class="note-line">找到 ${rows.length} 所</p>`}`; // 總數在上面分頁已經有，這裡只在搜尋時說找到幾筆
}
function AdminTeachers() {
  const A = S.admin;
  /* 關鍵字對姓名、信箱、學校、班級、科目都找（2026-11-03） */
  const rows = A.teachers.filter((t) => { const cs = teacherClasses(t); return hit(A.q.teachers, t.name, t.email, t.school, ...cs.map((x) => x.c), ...cs.map((x) => x.subj)); });
  const menu = (t) => [
    ['編輯資料', () => { S.flags.editTeacherSeen = true; A.modal = { editTeacher: t, d: { name: t.name, email: t.email, school: t.school, classes: teacherClasses(t), pw: null } }; }],
    '-',
    [t.off ? '啟用' : '停用', () => { t.off = !t.off; toast('admin', t.off ? `已停用 ${t.name}` : `已啟用 ${t.name}`, t.off ? undefined : 'check'); }],
    ['刪除', () => { const cs = teacherClasses(t);
      A.modal = { confirm: { title: `刪除 ${t.name} 的帳號？`, body: `${cs.length ? `會一起解除 ${cs.map((x) => `${x.c} · ${x.subj}`).join('、')}。` : ''}暫時不用請改用「停用」。`, label: '刪除帳號', onOk: () => { A.teachers.splice(A.teachers.indexOf(t), 1); const sc = schoolOf(t.school); if (sc) sc.teachers = Math.max(0, sc.teachers - 1); toast('admin', `已刪除 ${t.name} 的帳號`); } } }; }, true],
  ];
  return html`<table class="tbl"><thead><tr><th>學校</th><th>姓名</th><th>帳號（信箱）</th><th>班級</th><th>科目</th><th></th></tr></thead><tbody>
    ${!rows.length && html`<${Empty} cols=${6} />`}${rows.map((t, i) => { const cs = teacherClasses(t); const none = html`<span class="muted">—</span>`;
      return html`<tr class=${(t.fresh ? 'fresh' : '') + (t.off ? ' off' : '')}><td>${t.school}</td><td>${t.name}${t.off && OFF()}</td><td class="num">${t.email}</td><td class="num">${cs.length ? cs.map((x) => x.c).join('、') : none}</td><td>${cs.length ? [...new Set(cs.map((x) => x.subj))].join('、') : none}</td>${rowMenu(A, 'tc' + i, menu(t))}</tr>`; })}
  </tbody></table>${A.q.teachers.trim() && html`<p class="note-line">找到 ${rows.length} 位</p>`}`;
}
function AdminStudents() {
  const A = S.admin;
  /* 501 的 30 位是示範資料（STUDENTS），班級用 S.removed、停用用 A.off、刪除用 A.deleted 記；單筆建的學生放 A.others，直接改物件 */
  const rows = [
    ...A.others.map((o) => ({ ...o, k: 'o' + o.id, school: SCHOOL, src: o, other: true })), // 單筆建的在最上面，剛建好的看得到
    ...(A.made501 ? STUDENTS.filter((s) => !A.deleted.includes(s.seat)).map((s) => ({ k: 's' + s.seat, cls: S.removed.includes(s.seat) ? '' : '501', seat: s.seat, name: s.name, acct: s.acct, school: SCHOOL, off: !!A.off[s.seat], fresh: A.justMade, src: s })) : []),
  ].filter((r) => (A.filter === '全部' || (A.filter === '未分班' ? !r.cls : r.cls === A.filter)) && hit(A.q.students, r.school, r.cls || '未分班', r.name, r.acct)); // 沒有班級的打「未分班」也找得到
  const demo = () => false; // 2026-11-11：示範學生也能改
  const menu = (r) => [
    ['編輯資料', () => { A.modal = { editStudent: r, d: { name: r.name, seat: r.other ? String(r.seat) : pad(r.seat), cls: r.cls, pw: null } }; }],
    '-',
    [r.off ? '啟用' : '停用', () => { if (demo(r)) return; const v = !r.off; if (r.other) r.src.off = v; else A.off[r.seat] = v; toast('admin', v ? `已停用 ${r.name}` : `已啟用 ${r.name}`, v ? undefined : 'check'); }],
    ['刪除', () => { if (demo(r)) return; A.modal = { confirm: { title: `刪除 ${r.name}（${r.acct}）？`, body: '學習紀錄會一起刪除。暫時不用請改用「停用」。', label: '刪除帳號', onOk: () => { if (r.other) A.others.splice(A.others.indexOf(r.src), 1); else A.deleted.push(r.seat); const sc = schoolOf(SCHOOL); if (sc) sc.students = Math.max(0, sc.students - 1); toast('admin', `已刪除 ${r.name} 的帳號`); } } }; }, true],
  ];
  return html`<div>
    <table class="tbl"><thead><tr><th>學校</th><th>班級</th><th>座號</th><th>姓名</th><th>帳號</th><th></th></tr></thead><tbody>
      ${!rows.length && html`<${Empty} cols=${6} />`}${rows.map((r) => html`<tr key=${r.k} class=${(r.fresh ? 'fresh' : '') + (r.off ? ' off' : '')}><td>${r.school}</td><td>${r.cls || html`<span class="muted">—</span>`}</td><td class="num">${pad(r.seat)}</td><td>${r.name}${r.off && OFF()}</td><td class="num">${r.acct}</td>${rowMenu(A, r.k, menu(r))}</tr>`)}
    </tbody></table>
    ${A.q.students.trim() && html`<p class="note-line">找到 ${rows.length} 位</p>`}</div>`;
}
/* 管理員的編輯視窗：學校、老師、學生各一個，班級和重設密碼都收在同一個視窗裡；另有確認、提示兩種小視窗 */
function AdminModals() {
  const A = S.admin, m = A.modal; if (!m) return null;
  if (m.school) return html`<${SchoolDialog} />`;
  if (m.teacher) return html`<${TeacherDialog} />`;
  if (m.student) return html`<${StudentCreateDialog} />`;
  const close = () => { A.modal = null; };
  const head = (t) => html`<div class="pop-h"><h4>${t}</h4></div>`; // 下面有「取消」就不放 ×，關掉只有一種方式（2026-11-03）
  const foot = (label, onOk, danger, disabled) => html`<div class="dialog-foot"><button class="btn sec sm" onClick=${act(close)}>取消</button><button class=${'btn sm' + (danger ? ' danger' : '')} disabled=${disabled} onClick=${act(() => { onOk(); close(); })}>${label}</button></div>`;
  const fld = (id, label, v, set, extra) => html`<div class="fld"><label for=${id}>${label}</label><input class="inp" id=${id} value=${v} onInput=${(e) => set(e.target.value)} ...${extra || {}} /></div>`;
  /* 密碼跟帳號並排在同一列：直接輸入新密碼，留空就不動；「隨機」幫忙生一組。儲存時才生效（2026-11-03） */
  const pwFld = (d) => html`<div class="fld"><label for="pw-new">密碼</label><input class="inp" id="pw-new" autocomplete="new-password" placeholder="輸入密碼" value=${d.pw || ''} onInput=${act((e) => { d.pw = e.target.value; })} /></div>`;
  const pwNote = (d) => d.pw && html`<p class="note-line full" style="margin:-6px 0 0">新密碼按「儲存」才生效，記得交給本人。</p>`;
  if (m.editSchool) { const s = m.editSchool, d = m.d;
    return dlg('編輯學校', html`${head('編輯學校')}<div class="pop-b">
      ${fld('es-n', '學校名稱', d.name, (v) => { d.name = v; })}
      <div class="fld"><label>類型</label><div class="seg" style="align-self:flex-start">${['學校', '測試推廣'].map((x) => html`<button aria-pressed=${d.type === x} onClick=${act(() => { d.type = x; d.stage = x === '學校' ? (d.stage === '不限' ? '國小' : d.stage) : '不限'; })}>${x}</button>`)}</div></div>
      ${d.type === '學校' && html`<div class="fld"><label>學制</label><div class="seg" style="align-self:flex-start">${['國小', '國中'].map((x) => html`<button aria-pressed=${d.stage === x} onClick=${act(() => { d.stage = x; })}>${x}</button>`)}</div></div>`}
      ${foot('儲存', () => { const nm = d.name.trim() || s.name; if (nm !== s.name) { A.teachers.forEach((t) => { if (t.school === s.name) t.school = nm; }); } Object.assign(s, { name: nm, type: d.type, stage: d.stage }); toast('admin', '已儲存', 'check'); }, false, !d.name.trim())}
    </div>`, act(close)); }
  if (m.editTeacher) { const t = m.editTeacher, d = m.d;
    /* 已任教的班級是膠囊（× 拿掉）；下面一列對齊上面欄位：班級｜科目＋加入（2026-11-03） */
    if (!d.add) d.add = { c: '', subj: '' }; // 科目一選下去就加入，所以先空著
    const addCls = () => { const c = d.add.c.trim(); if (!c) { d.add.subj = ''; return toast('admin', '先輸入班級'); } if (d.classes.some((x) => x.c === c && x.subj === d.add.subj)) return toast('admin', `已經有 ${c} ${d.add.subj}`); d.classes.push({ c, subj: d.add.subj }); d.add.c = ''; d.add.subj = ''; d.adding = false; };
    return dlg('編輯老師', html`${head(`編輯 ${t.name} 的資料`)}<div class="pop-b"><div class="form-grid">
      ${fld('et-n', '姓名', d.name, (v) => { d.name = v; })}
      <div class="fld"><label for="et-s">學校</label><${Combo} id="et-s" value=${d.school} options=${A.schools.map((x) => x.name)} onChange=${(v) => { d.school = v; }} placeholder="輸入或展開搜尋" /></div>
      ${fld('et-e', '帳號（信箱）', d.email, (v) => { d.email = v; })}
      ${pwFld(d)}
      <div class="fld full"><label>任教班級</label><div class="cls-chips">${d.classes.map((x, i) => html`<span class="cls-chip" key=${x.c + x.subj}>${x.c}<small>${x.subj}</small><button class="x-btn" aria-label=${`拿掉 ${x.c} ${x.subj}`} onClick=${act(() => { d.classes.splice(i, 1); })}><${Icon} n="x" s=${14} /></button></span>`)}
        ${d.adding ? html`<span class="cls-new"><input class="inp" aria-label="班級" placeholder="輸入班級" value=${d.add.c} ref=${(el) => el && !el.dataset.f && (el.dataset.f = 1, el.focus())} onInput=${act((e) => { d.add.c = e.target.value; })} /><${Dd} id="et-as" small=${true} value=${d.add.subj} options=${[['', '選科目'], ...subjectsOf(d.school).map((x) => [x, x])]} onChange=${(v) => { if (!v) return; d.add.subj = v; addCls(); }} /></span>`
          : html`<button class="cls-plus" onClick=${act(() => { d.adding = true; })}><${Icon} n="plus" s=${14} />新增班級</button>`}</div>
        </div>
    </div>${foot('儲存', () => {
      const nm = d.name.trim() || t.name; if (d.school !== t.school) { const a = schoolOf(t.school), b = schoolOf(d.school); if (a) a.teachers = Math.max(0, a.teachers - 1); if (b) b.teachers += 1; }
      Object.assign(t, { name: nm, email: d.email.trim() || t.email, school: d.school }); setTeacherClasses(t, d.classes.map((x) => ({ c: x.c, subj: x.subj }))); if (d.pw) t.pw = d.pw;
      toast('admin', d.pw ? '已儲存，密碼已重設' : '已儲存', 'check'); })}</div>`, act(close), 'submit-dlg'); }
  if (m.editStudent) { const r = m.editStudent, d = m.d, fixed = !r.other;
    const clsOpts = [...adminClasses().map((c) => [c, c]), ['', '未分班']];
    return dlg('編輯學生', html`${head(`編輯 ${r.name} 的資料`)}<div class="pop-b"><div class="form-grid">
      ${fld('ed-n', '姓名', d.name, (v) => { d.name = v; })}
      ${fld('ed-s', fixed ? '座號（示範班 501 固定）' : '座號', d.seat, (v) => { d.seat = toHalf(v).replace(/\D/g, ''); }, { readonly: fixed, inputmode: 'numeric' })}
      <div class="fld full"><label for="ed-c">班級</label><${Dd} id="ed-c" value=${d.cls} options=${fixed ? [['501', '501'], ['', '未分班']] : clsOpts} onChange=${(v) => { d.cls = v; }} />
        </div>
      ${fld('ed-a', '帳號', r.acct, () => {}, { readonly: true })}
      ${pwFld(d)}
    </div>${foot('儲存', () => {
      const nm = d.name.trim() || r.name;
      if (r.other) Object.assign(r.src, { name: nm, seat: +d.seat || r.seat, cls: d.cls });
      else { r.src.name = nm; const i = S.removed.indexOf(r.seat); if (d.cls === '' && i < 0) S.removed.push(r.seat); if (d.cls && i >= 0) S.removed.splice(i, 1); }
      if (d.pw) r.src.pw = d.pw;
      toast('admin', d.pw ? '已儲存，密碼已重設' : '已儲存', 'check'); }, false, !d.name.trim() || (!fixed && !d.seat))}</div>`, act(close), 'submit-dlg'); }
  if (m.confirm) { const c = m.confirm;
    return html`<div class="scrim" onClick=${act((e) => { if (e.target === e.currentTarget) close(); })}><div class="dialog" role="alertdialog" aria-label=${c.title}>
      <div class="pop-h"><h4>${c.title}</h4></div><div class="pop-b"><p class="dlg-p">${c.body}</p>${foot(c.label, c.onOk, true)}</div></div></div>`; }
  if (m.notice) { const n = m.notice;
    return html`<div class="scrim" onClick=${act((e) => { if (e.target === e.currentTarget) close(); })}><div class="dialog" role="alertdialog" aria-label=${n.title}>
      <div class="pop-h"><h4>${n.title}</h4></div><div class="pop-b"><p class="dlg-p">${n.body}</p><div class="dialog-foot"><button class="btn sm" onClick=${act(close)}>知道了</button></div></div></div></div>`; }
  return null;
}
/* 可以打字搜尋、也可以展開整份清單的選單（學校這種項目多、名字長的用這個；2026-11-03） */
function Combo({ id, value, options, onChange, placeholder }) {
  const [open, setOpen] = useState(false); const [q, setQ] = useState(null); const ref = useRef();
  useEffect(() => { if (!open) return; const f = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setQ(null); } }; window.addEventListener('pointerdown', f, true); return () => window.removeEventListener('pointerdown', f, true); }, [open]);
  const shown = q == null || !q.trim() ? options : options.filter((o) => o.toLowerCase().includes(q.trim().toLowerCase()));
  const pick = (o) => { onChange(o); setQ(null); setOpen(false); refresh(); };
  return html`<div class="dd combo" ref=${ref}>
    <input class="inp" id=${id} role="combobox" aria-expanded=${open} aria-autocomplete="list" autocomplete="off" placeholder=${placeholder} value=${q == null ? value : q}
      onFocus=${() => setOpen(true)} onInput=${(e) => { setQ(e.target.value); setOpen(true); }}
      onKeyDown=${(e) => { if (e.key === 'Enter') { e.preventDefault(); if (shown.length) pick(shown[0]); } if (e.key === 'Escape') { setQ(null); setOpen(false); } }} />
    <button type="button" class="combo-chev" aria-label="展開選單" onClick=${() => { setQ(null); setOpen(!open); }}><${Icon} n="chevron-down" s=${16} /></button>
    ${open && html`<div class="dd-menu" role="listbox">${shown.map((o) => html`<button type="button" role="option" aria-selected=${o === value} class=${o === value ? 'on' : ''} onClick=${() => pick(o)}>${o}</button>`)}
      ${!shown.length && html`<span class="muted" style="padding:8px 12px;font-size:13px">找不到「${q}」</span>`}</div>`}
  </div>`;
}
function StudentCreateDialog() {
  const A = S.admin; const close = () => { A.modal = null; A.justMade = false; };
  return dlg('新增學生', html`<div class="pop-h"><h4>新增學生帳號</h4></div>
    <div class="pop-b"><${AdminCreate} /></div>`, act(close), 'create-dlg');
}
function AdminCreate() {
  const A = S.admin, d = A.draft; const hint = useHint();
  const mode = A.mode;
  const cancel = html`<button class="btn sec" onClick=${act(() => { A.modal = null; A.justMade = false; })}>取消</button>`; // 取消放下面，不放右上角 ×（2026-11-03）；建好後也還是「取消」（2026-11-04 乙練）
  return html`<div>
    <div class="seg" role="group" aria-label="建立方式">${[['single', '單筆'], ['multi', '多筆'], ['excel', 'Excel 匯入']].map(([k, l]) => html`<button aria-pressed=${mode === k} onClick=${act(() => { A.mode = k; if (k === 'excel') S.flags.excelSeen = true; })}>${l}</button>`)}</div>
    ${mode === 'excel' && html`<div class="form-grid" style="margin-bottom:18px"><div class="fld"><label for="ac-school">學校</label><${Combo} id="ac-school" value=${A.school || (A.madeSchool ? SCHOOL : S.admin.schools[0].name)} options=${S.admin.schools.map((x) => x.name)} onChange=${act((v) => { A.school = v; })} placeholder="輸入或展開搜尋" /></div></div>`}
    ${mode === 'multi' && html`<div class="form-grid">
      <div class="fld"><label for="ac-school">學校</label><${Combo} id="ac-school" value=${A.school || (A.madeSchool ? SCHOOL : S.admin.schools[0].name)} options=${S.admin.schools.map((x) => x.name)} onChange=${act((v) => { A.school = v; })} placeholder="輸入或展開搜尋" /></div>
      <div class="fld"><label for="ac-cls">班級</label><input class="inp" id="ac-cls" value=${d.cls} onInput=${act((e) => { d.cls = e.target.value; A.justMade = false; })} /></div>
      <div class="fld"><label for="ac-n">學生人數</label><input class="inp" id="ac-n" value=${d.count} onInput=${act((e) => { d.count = toHalf(e.target.value).replace(/\D/g, ''); A.justMade = false; })} /></div>
      <div class="fld"><label for="ac-pre">帳號前綴</label><input class="inp" id="ac-pre" value=${d.prefix} onInput=${act((e) => { d.prefix = e.target.value; A.justMade = false; })} /></div>
      <div class="fld"><label>密碼</label><div class="seg" style="align-self:flex-start">${[['same', '全班相同'], ['random', '隨機']].map(([k, l]) => html`<button aria-pressed=${(d.pwMode || 'same') === k} onClick=${act(() => { if (d.pwMode !== k) A.justMade = false; d.pwMode = k; })}>${l}</button>`)}</div></div>
      ${d.pwMode === 'same' ? html`<div class="fld"><label for="ac-pw">全班密碼</label><input class="inp" id="ac-pw" placeholder="輸入密碼" value=${d.pw || ''} onInput=${act((e) => { d.pw = e.target.value; A.justMade = false; })} /></div>` : html`<div></div>`}
      <div class="fld full"><div class="preview-line">預覽：${d.prefix}01、${d.prefix}02、${d.prefix}03 … ${d.prefix}${pad(d.count)}（共 ${d.count} 個）<br />密碼：${d.pwMode === 'same' ? ((d.pw || '').trim() ? `全班都是 ${d.pw.trim()}` : '全班同一組') : '每人一組隨機密碼'}</div></div>
      ${A.justMade && html`<div class="fld full"><div class="done-card"><${Icon} n="check" s=${24} /><b>已建立 ${A.lastMade ? A.lastMade.cls : '501'} 的 ${A.lastMade ? A.lastMade.n : 30} 個學生帳號</b><span class="spacer"></span><button class="btn sm sec" onClick=${act(() => { downloadCsv('admin', '501_帳密清單.csv', ACCT_HEADER, schoolAccountRows(SCHOOL).filter((r) => r[0] === '學生' && r[2] === '501'), '已下載 501 的帳密清單'); })}><${Icon} n="download" s=${16} />下載帳密清單</button></div></div>`}
      <div class="fld full dialog-foot">${cancel}<button class=${'btn ' + hint('a-go')} disabled=${(d.pwMode === 'same' && !(d.pw || '').trim()) || A.justMade} onClick=${act(() => { if (!A.madeSchool) return toast('admin', `請先在「學校」建立${SCHOOL}`); const school = A.school || SCHOOL; if (d.cls === '501' && school === SCHOOL) { if (A.made501) return toast('admin', '501 已經建立過了'); make501(); A.filter = '全部'; return; }
            const cls = String(d.cls || '').trim(), n = Math.min(60, +d.count || 0); if (!cls || !n) return toast('admin', '請填班級和人數'); if (classSize(cls)) return toast('admin', `${cls} 已經有學生了`);
            A.others.forEach((o) => { o.fresh = false; }); const pool = [...OTHER_NAMES['502'], ...OTHER_NAMES['503']];
            for (let i = 1; i <= n; i++) A.others.push({ id: uid(), name: pool[(i * 7 + cls.length) % pool.length], cls, seat: i, acct: `${d.prefix || 'st' + cls}${pad(i)}`, pw: d.pwMode === 'same' ? d.pw.trim() : genPw(), school, fresh: true });
            const sc = schoolOf(school); if (sc) sc.students += n; A.justMade = true; A.lastMade = { cls, n }; A.filter = '全部';
            toast('admin', `已建立 ${cls} 的 ${n} 個學生帳號`, 'check'); })}>建立 ${d.count} 個帳號</button></div>
    </div>`}
    ${mode === 'single' && (() => { const s = A.single; if (!s.pw) s.pw = genPw();
      const ok = s.cls.trim() && s.seat && s.name.trim() && s.acct.trim() && s.pw.trim();
      const f = (id, label, k, ph, extra) => html`<div class="fld"><label for=${id}>${label}</label><input class="inp" id=${id} placeholder=${ph} value=${s[k]} onInput=${act((e) => { s[k] = k === 'seat' ? toHalf(e.target.value).replace(/\D/g, '') : e.target.value; })} ...${extra || {}} /></div>`;
      return html`<div class="form-grid">
      <div class="fld"><label for="ac-school">學校</label><${Combo} id="ac-school" value=${A.school || (A.madeSchool ? SCHOOL : S.admin.schools[0].name)} options=${S.admin.schools.map((x) => x.name)} onChange=${act((v) => { A.school = v; })} placeholder="輸入或展開搜尋" /></div>
      ${f('as-c', '班級', 'cls', '輸入班級')}
      ${f('as-n', '姓名', 'name', '輸入姓名')}
      ${f('as-s', '座號', 'seat', '輸入座號', { inputmode: 'numeric' })}
      ${f('as-a', '帳號', 'acct', '輸入帳號')}
      ${f('as-p', '密碼', 'pw', '輸入密碼')}
      <div class="fld full dialog-foot">${cancel}<button class="btn" disabled=${!ok} onClick=${act(() => {
        if (!A.madeSchool) return toast('admin', `請先在「學校」建立${SCHOOL}`);
        const cls = s.cls.trim(), seat = +s.seat;
        A.others.forEach((o) => { o.fresh = false; }); A.justMade = false;
        A.others.unshift({ id: uid(), name: s.name.trim(), cls, seat, acct: s.acct.trim(), pw: s.pw.trim(), school: A.school || SCHOOL, fresh: true });
        const sc = schoolOf(A.school || SCHOOL); if (sc) sc.students += 1;
        A.single = { name: '', cls, seat: '', acct: '', pw: '' }; A.modal = null; A.filter = '全部'; A.q.students = '';
        toast('admin', `已建立 ${s.name.trim()} 的帳號`, 'check'); })}>建立帳號</button></div></div>`; })()}
    ${mode === 'excel' && html`<${ExcelDrop} /><div class="dialog-foot xl-foot"><button class="btn sec" onClick=${act(() => downloadCsv('admin', '學生帳號範本.csv', ['班級', '座號', '姓名', '帳號', '密碼'], [['601', '1', '王小明', 'xg60101', 'Ab3xYz7k'], ['601', '2', '李小華', 'xg60102', 'Kp8sTq2m']], '已下載學生帳號範本'))}><${Icon} n="download" s=${16} />下載範本</button><span class="spacer"></span>${cancel}</div>`}
  </div>`;
}
/* 整塊都是按鈕：點一下選檔，拖檔進來也行（同自編器媒體庫） */
function ExcelDrop() {
  const [over, setOver] = useState(false);
  const fileRef = useRef();
  const take = async (file) => {
    if (!file) return;
    try {
      const rows = await readSheet(file);
      const head = (rows[0] || []).map((x) => String(x).trim());
      const col = (k) => head.indexOf(k);
      const ci = col('班級'), si = col('座號'), ni = col('姓名'), ai = col('帳號'), pi = col('密碼');
      if (ci < 0 || ni < 0) { toast('admin', '找不到「班級」「姓名」欄，請用範本的欄位'); refresh(); return; }
      const A = S.admin, school = A.school || SCHOOL; let n = 0;
      A.others.forEach((o) => { o.fresh = false; });
      for (const r of rows.slice(1)) {
        const name = String(r[ni] || '').trim(), cls = String(r[ci] || '').trim(); if (!name || !cls) continue;
        const seat = +String(r[si] || '').replace(/\D/g, '') || classSize(cls) + 1;
        A.others.push({ id: uid(), name, cls, seat, acct: String(r[ai] || '').trim() || `st${cls}${pad(seat)}`, pw: String(r[pi] || '').trim() || genPw(), school, fresh: true }); n++;
      }
      const sc = schoolOf(school); if (sc) sc.students += n;
      A.modal = null; A.filter = '全部';
      toast('admin', n ? `已從「${file.name}」建立 ${n} 個學生帳號` : '檔案裡沒有學生資料', n ? 'check' : undefined);
    } catch (e) { toast('admin', `讀不了這個檔案：${e.message}`); }
    refresh();
  };
  return html`<div><input type="file" ref=${fileRef} accept=".xlsx,.csv" hidden onChange=${(e) => { take(e.target.files[0]); e.target.value = ''; }} /><button type="button" class=${'drop' + (over ? ' over' : '')} aria-label="上傳 Excel：拖曳或選取檔案" onClick=${() => fileRef.current && fileRef.current.click()}
    onDragOver=${(e) => { if (!e.dataTransfer.types.includes('Files')) return; e.preventDefault(); setOver(true); }}
    onDragLeave=${() => setOver(false)} onDrop=${(e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files[0]); }}>
    <span class="tile-up"><${Icon} n="upload" s=${20} /></span>
    <b>${over ? '放開就上傳' : '拖曳或選取 Excel 檔'}</b>
    <span class="xl-cols">${['班級', '座號', '姓名', '帳號', '密碼'].map((x) => html`<i>${x}</i>`)}</span>
  </button></div>`;
}
function SchoolDialog() {
  const A = S.admin, d = A.modal.school; const hint = useHint();
  const close = () => { A.modal = null; };
  const sch = d.type === '學校', title = sch ? '建立學校' : '建立測試推廣帳號'; // 類型放第一個，標題、名稱欄跟著類型變（2026-11-03）
  return dlg(title, html`<div class="pop-h"><h4>${title}</h4></div>
    <div class="pop-b">
      <div class="fld"><label>類型</label><div class="seg" style="align-self:flex-start">${['學校', '測試推廣'].map((x) => html`<button aria-pressed=${d.type === x} onClick=${act(() => { d.type = x; d.stage = x === '學校' ? (d.stage === '不限' ? '國小' : d.stage) : '不限'; })}>${x}</button>`)}</div></div>
      <div class="fld"><label for="sc-n">${sch ? '學校名稱' : '單位名稱'}</label><input class="inp" id="sc-n" placeholder=${sch ? '請輸入學校名稱' : '例：出版社測試帳號、專家諮詢'} value=${d.name} onInput=${act((e) => { d.name = e.target.value; })} /></div>
      ${d.type === '學校' && html`<div class="fld"><label>學制</label><div class="seg" style="align-self:flex-start">${['國小', '國中'].map((x) => html`<button aria-pressed=${d.stage === x} onClick=${act(() => { d.stage = x; })}>${x}</button>`)}</div></div>`}
      <div class="dialog-foot"><button class="btn sec sm" onClick=${act(close)}>取消</button><button class=${'btn sm ' + hint('a-school-go')} disabled=${!d.name.trim()} onClick=${act(() => { const nm = d.name.trim(); if (!nm) return; A.q.schools = ''; close(); if (nm === SCHOOL) { if (A.madeSchool) return toast('admin', `${SCHOOL}已經建立過了`); return makeSchool(); } A.schools.forEach((s) => { s.fresh = false; }); A.schools.unshift({ name: nm, type: d.type, stage: d.stage, students: 0, teachers: 0, fresh: true }); toast('admin', '已建立學校'); })}>建立</button></div>
    </div>`, act(close));
}
function TeacherDialog() {
  const A = S.admin, d = A.modal.teacher; const hint = useHint();
  if (d.name == null) d.name = (d.last || '') + (d.first || ''); // 姓名一個欄位就好，跟編輯老師、學生一致（2026-11-03）
  const close = () => { A.modal = null; };
  return dlg('建立老師帳號', html`<div class="pop-h"><h4>建立新教師帳號</h4></div>
    <div class="pop-b"><div class="form-grid">
      <div class="fld full"><label for="tc-s">學校</label><${Combo} id="tc-s" value=${d.school} options=${A.schools.map((x) => x.name)} onChange=${(v) => { d.school = v; }} placeholder="輸入或展開搜尋" /></div>
      <div class="fld"><label for="tc-n">姓名</label><input class="inp" id="tc-n" value=${d.name} onInput=${act((e) => { d.name = e.target.value; })} placeholder="輸入姓名" /></div>
      <div class="fld"><label for="tc-no">教師編號（選填）</label><input class="inp" id="tc-no" placeholder="選填" /></div>
      <div class="fld"><label for="tc-e">帳號（信箱）</label><input class="inp" id="tc-e" value=${d.email} onInput=${(e) => { d.email = e.target.value; }} placeholder="輸入信箱" /></div>
      <div class="fld"><label for="tc-p">密碼</label><input class="inp" id="tc-p" value=${d.pw} onInput=${(e) => { d.pw = e.target.value; }} placeholder="輸入密碼" /></div></div>
      <div class="dialog-foot"><button class="btn sec sm" onClick=${act(close)}>取消</button><button class=${'btn sm ' + hint('a-teacher-go')} disabled=${!d.name.trim()} onClick=${act(() => { const nm = d.name.trim(); if (!nm) return; A.q.teachers = ''; close(); if (nm === TEACHER && d.school === SCHOOL && !A.madeTeacher) return makeTeacher(); A.teachers.forEach((t) => { t.fresh = false; }); A.teachers.unshift({ name: nm, email: d.email || 'wang@star.example', school: d.school, classes: [], fresh: true }); const sc = A.schools.find((x) => x.name === d.school); if (sc) sc.teachers += 1; toast('admin', '已建立老師帳號'); })}>建立帳號</button></div>
    </div>`, act(close), 'submit-dlg');
}

/* ───────── 補給站（2026-11-05，老師補充 demo 併進來，原檔 projects/V1/資源共享demo/） ─────────
   老師在自己的自編裡掛的補充（網站、影片、圖片、聲音、文字），自編共享後，其他老師在「補給站」看得到、收藏、掛進自己的自編。
   跟出版社原本掛的分開；只收已共享的自編。「N 人收藏」是自動算的。
   書櫃：上方導覽多一個「補給站」（乙練 11-05 選 B 新區域）。
   自編器：上方列多一顆「補給站」打開右側面板（乙練 11-05）；收藏直接進媒體庫的「收藏」，不另外做一份。 */
const NAME = '補給站';
const STN_BOOKS = [
  { id: 'mulan', subject: '國語文', stage: '國中二下', title: '國文 2下' },
  { id: 'social', subject: '社會', stage: '國小五下', title: '社會 5下' },
  { id: 'eng', subject: '英語文', stage: '國小六年級', title: 'Wonder World 6' },
  { id: 'sci', subject: '自然科學', stage: '國小五下', title: '自然科學 5下' },
  { id: 'math', subject: '數學', stage: '國中二下', title: '數學 2下' },
];
const stnBook = (id) => STN_BOOKS.find((b) => b.id === id);
/* 自編器畫布上的第一課課文；補充掛在這些段落上 */
const BLOCKS = [
  { id: 'h', kind: 'h1', text: '星星的世界' },
  { id: 'p1', text: '晴朗的夜晚抬頭往天空看，可以看到許多閃閃發亮的星星。古人把看起來靠得近的星星連起來，想像成人、動物或器具的樣子，這就是星座。' },
  { id: 'fig', kind: 'fig', img: 'assets/summer-triangle.jpg', cap: '圖 1　夏季大三角', text: '夏天的夜晚，我們可以找到明亮的「夏季大三角」：織女星、牛郎星和天津四。這三顆星分別屬於天琴座、天鷹座和天鵝座。' },
  { id: 'p2', text: '同一個晚上，星星的位置會慢慢由東向西移動；到了不同的季節，看到的星座也不一樣。這是因為地球一邊自轉、一邊繞著太陽公轉。' },
  { id: 'p3', text: '觀測星星時，先用指北針找出方位，再對照星座盤，就能找出今晚天空中有哪些星座。' },
];
/* 一則補充：book 哪本、lesson 第幾課、blk 掛在第一課哪一段、k 類型、ar 縮圖長寬比、embed 網站能不能內嵌、by 誰加的（第一位最早）、adopt 幾人收藏 */
const ALL_RES = [
  { id: 'tam', book: 'sci', lesson: 1, lt: '美麗的星空', blk: 'p1', k: 'web', t: '臺北市立天文科學教育館', url: 'https://www.tam.gov.taipei/', dom: 'tam.gov.taipei', shot: 'assets/star-chart.jpg', ar: 1.6, embed: false, tags: ['星座', '校外教學'], by: ['林志明', '陳怡君', '周彥廷'], adopt: 6 },
  { id: 'stell', book: 'sci', lesson: 1, lt: '美麗的星空', blk: 'p1', k: 'web', t: 'Stellarium 線上星空，輸入日期就能看當晚的星座', url: 'https://stellarium-web.org/', dom: 'stellarium-web.org', shot: 'assets/star-trails.jpg', ar: 1.5, embed: true, tags: ['星座', '互動'], by: [TEACHER, '黃柏翰'], adopt: 4 },
  { id: 'chart', book: 'sci', lesson: 1, lt: '美麗的星空', blk: 'p1', k: 'image', t: '古人畫的星座圖（1824 年）', src: 'assets/star-chart.jpg', ar: 0.85, tags: ['星座', '歷史'], by: ['陳怡君'], adopt: 2 },
  { id: 'what', book: 'sci', lesson: 1, lt: '美麗的星空', blk: 'p1', k: 'text', t: '什麼是星座？', body: '國際天文聯合會把整片天空劃分成 88 個星座，天上的每一顆星都屬於其中一個。同一個星座裡的星星看起來靠在一起，其實離我們的距離可能差很多。', tags: ['星座', '補充知識'], by: ['許雅婷'], adopt: 3 },
  { id: 'orion', book: 'sci', lesson: 1, lt: '美麗的星空', blk: 'fig', k: 'image', t: '把星星連起來：獵戶座', src: 'assets/orion-lines.jpg', ar: 1.4, tags: ['星座', '圖解'], by: [TEACHER, '林志明'], adopt: 3 },
  { id: 'wiki', book: 'sci', lesson: 1, lt: '美麗的星空', blk: 'fig', k: 'web', t: '維基百科：夏季大三角', url: 'https://zh.wikipedia.org/zh-tw/夏季大三角', dom: 'zh.wikipedia.org', shot: 'assets/wiki-summer-triangle.jpg', ar: 1.3, embed: true, tags: ['夏季大三角'], by: ['高子豪'], adopt: 1 },
  { id: 'vega', book: 'sci', lesson: 1, lt: '美麗的星空', blk: 'fig', k: 'audio', t: '三顆主角星：織女、牛郎、天津四', dur: '2:40', tags: ['夏季大三角', '故事'], by: ['陳怡君'], adopt: 2 },
  { id: 'trails', book: 'sci', lesson: 1, lt: '美麗的星空', blk: 'p2', k: 'video', t: '星軌縮時：一個晚上星星怎麼轉', src: 'assets/star-trails.jpg', ar: 1.78, dur: '1:12', tags: ['地球自轉', '縮時'], by: ['林志明', '蔡佳穎', '黃柏翰'], adopt: 5 },
  { id: 'season', book: 'sci', lesson: 1, lt: '美麗的星空', blk: 'p2', k: 'video', t: '四季星空為什麼不一樣（3 分鐘動畫）', src: 'assets/summer-triangle.jpg', ar: 1.78, dur: '3:05', tags: ['公轉', '動畫'], by: ['周彥廷'], adopt: 2 },
  { id: 'mag', book: 'sci', lesson: 1, lt: '美麗的星空', blk: 'p2', k: 'text', t: '星座和星等不一樣', body: '星座是天空的分區，星等是星星有多亮。數字越小越亮，最亮的星甚至是負的星等。', tags: ['星等', '補充知識'], by: [TEACHER], adopt: 1 },
  { id: 'disk', book: 'sci', lesson: 1, lt: '美麗的星空', blk: 'p3', k: 'web', t: '星座盤怎麼轉：互動教學', url: 'https://example.edu/planisphere', dom: 'example.edu', shot: 'assets/orion-lines.jpg', ar: 1.4, embed: true, tags: ['星座盤', '互動'], by: ['蔡佳穎'], adopt: 2 },
  { id: 'sheet', book: 'sci', lesson: 1, lt: '美麗的星空', blk: 'p3', k: 'image', t: '觀星紀錄單（可列印）', src: 'assets/star-chart.jpg', ar: 0.75, tags: ['學習單', '觀測'], by: ['許雅婷', '高子豪'], adopt: 4 },
  { id: 'l2a', book: 'sci', lesson: 2, lt: '植物的構造與功能', k: 'video', t: '根的向水性縮時攝影', src: 'assets/summer-triangle.jpg', ar: 1.78, dur: '0:48', tags: ['根', '縮時'], by: ['林志明'], adopt: 2 },
  { id: 'l2b', book: 'sci', lesson: 2, lt: '植物的構造與功能', k: 'web', t: '葉綠素萃取實驗步驟', url: 'https://example.edu/chlorophyll', dom: 'example.edu', shot: 'assets/star-chart.jpg', ar: 1.5, embed: true, tags: ['實驗', '葉'], by: ['陳怡君'], adopt: 1 },
  { id: 'l2c', book: 'sci', lesson: 2, lt: '植物的構造與功能', k: 'image', t: '校園植物葉形對照圖', src: 'assets/orion-lines.jpg', ar: 1.2, tags: ['葉', '校園'], by: [TEACHER], adopt: 3 },
  { id: 'l3a', book: 'sci', lesson: 3, lt: '動物的構造與功能', k: 'video', t: '鰓蓋開合慢動作', src: 'assets/star-trails.jpg', ar: 1.78, dur: '0:30', tags: ['呼吸', '慢動作'], by: ['黃柏翰'], adopt: 2 },
  { id: 'l3c', book: 'sci', lesson: 3, lt: '動物的構造與功能', k: 'web', t: '臺灣鳥類圖鑑', url: 'https://example.gov/birds', dom: 'example.gov', shot: 'assets/wiki-summer-triangle.jpg', ar: 1.3, embed: false, tags: ['鳥', '圖鑑'], by: ['林志明', '蔡佳穎'], adopt: 3 },
  { id: 'l4b', book: 'sci', lesson: 4, lt: '水溶液', k: 'web', t: '紫色高麗菜汁酸鹼指示劑', url: 'https://example.edu/cabbage', dom: 'example.edu', shot: 'assets/star-chart.jpg', ar: 1.5, embed: true, tags: ['酸鹼', '實驗'], by: ['高子豪', '許雅婷'], adopt: 4 },
  { id: 'l4d', book: 'sci', lesson: 4, lt: '水溶液', k: 'text', t: '溶解和融化差在哪', body: '溶解是一種東西散到另一種東西裡（糖散在水裡）；融化是固體變液體（冰變水）。', tags: ['溶解', '補充知識'], by: [TEACHER], adopt: 2 },
  { id: 'm1', book: 'mulan', lesson: 3, lt: '木蘭詩', k: 'audio', t: '木蘭詩吟誦（河洛語）', dur: '3:20', tags: ['吟誦', '樂府'], by: ['吳承恩'], adopt: 7 },
  { id: 'm2', book: 'mulan', lesson: 3, lt: '木蘭詩', k: 'image', t: '北朝騎兵裝備圖解', src: 'assets/star-chart.jpg', ar: 0.8, tags: ['歷史', '圖解'], by: ['劉子晴', '吳承恩'], adopt: 3 },
  { id: 'm3', book: 'mulan', lesson: 3, lt: '木蘭詩', k: 'web', t: '故宮：北朝文物線上展', url: 'https://example.gov/npm', dom: 'example.gov', shot: 'assets/wiki-summer-triangle.jpg', ar: 1.4, embed: false, tags: ['歷史', '博物館'], by: ['劉子晴'], adopt: 2 },
  { id: 'm4', book: 'mulan', lesson: 3, lt: '木蘭詩', k: 'text', t: '「撲朔迷離」的由來', body: '這個成語就是從木蘭詩最後四句來的：雄兔雌兔跑起來分不出公母，比喻事情錯綜複雜、看不清楚。', tags: ['成語', '補充知識'], by: ['吳承恩'], adopt: 5 },
  { id: 'e1', book: 'eng', lesson: 2, lt: 'Unit 2 Transportation', k: 'video', t: 'Transportation Song', src: 'assets/summer-triangle.jpg', ar: 1.78, dur: '2:15', tags: ['歌曲', 'transportation'], by: ['葉怡美'], adopt: 4 },
  { id: 'e2', book: 'eng', lesson: 2, lt: 'Unit 2 Transportation', k: 'web', t: '臺北捷運路線圖（英文版）', url: 'https://example.gov/metro', dom: 'example.gov', shot: 'assets/star-trails.jpg', ar: 1.5, embed: true, tags: ['生活', 'map'], by: ['葉怡美', '林淑儀'], adopt: 2 },
  { id: 's1', book: 'social', lesson: 1, lt: '日本統治下的臺灣', k: 'image', t: '總督府老照片對照今日', src: 'assets/orion-lines.jpg', ar: 1.33, tags: ['歷史', '照片'], by: ['王大明'], adopt: 3 },
  { id: 'k1', book: 'math', lesson: 2, lt: '三角形', k: 'web', t: 'GeoGebra：拖拖看內角和', url: 'https://example.org/ggb', dom: 'geogebra.org', shot: 'assets/star-chart.jpg', ar: 1.4, embed: true, tags: ['互動', '幾何'], by: ['張家豪'], adopt: 6 },
];
/* 補給站只收連結型：網站、YouTube 影片。老師上傳的圖片、聲音、影片檔和自己打的文字只留在自己的自編，不進補給站（著作權，乙練 2026-11-05 定 A 案） */
const RES = ALL_RES.filter((r) => r.k === 'web' || r.k === 'video').map((r) => (r.k === 'video' ? { ...r, dom: 'youtube.com' } : r));
const KIND = { web: ['globe', '網站'], video: ['play', '影片'], image: ['image', '圖片'], audio: ['mic', '聲音'], text: ['file-text', '文字'] };
const STN_KINDS = ['web', 'video'];
const STN_SUBJECTS = ['國語文', '英語文', '自然科學', '社會', '數學'];
const quoteOf = (r) => (BLOCKS.find((b) => b.id === r.blk) || {}).text || '';
const blockRes = (blkId) => RES.filter((r) => r.blk === blkId);
const whereShort = (r) => `${stnBook(r.book).title} · 第 ${r.lesson} 課 ${r.lt}`;
function freshStn() {
  return {
    sp: { q: '', subj: 'all', kind: 'all', sort: 'adopt', book: null, tag: null, saved: false }, menu: null, modal: null,
    saved: ['k1'], added: ['stell'], mine: ['stell'],
    ed: { sel: null, supp: false, add: false, ins: null, lib: false, libTab: 'web', station: false, q: '' },
  };
}
const shint = (k) => (HINT === k ? ' hint' : '');
const isSaved = (id) => S.stn.saved.includes(id);
const isAdded = (id) => S.stn.added.includes(id);
function toggleSave(r) {
  if (isSaved(r.id)) { S.stn.saved = S.stn.saved.filter((x) => x !== r.id); toast('teacher', '已取消收藏'); }
  else { S.stn.saved = [...S.stn.saved, r.id]; S.flags.stnSaved = true; toast('teacher', '已收藏，自編時在媒體庫找得到', 'check'); }
}
function goSpace(filter = {}) { S.stn.sp = { ...freshStn().sp, ...filter }; S.t.screen = 'shelf'; S.t.shelfTab = 'space'; S.t.classView = null; S.flags.stnIn = true; BRIDGE.goArea('space'); }
/* 掛進某一段：掛上去的同時也進媒體庫的收藏 */
function addToBlock(r, blkId) {
  if (isAdded(r.id)) return;
  S.stn.added = [...S.stn.added, r.id];
  S.stn.addedTo = { ...(S.stn.addedTo || {}), [r.id]: blkId };
  if (!S.stn.saved.includes(r.id)) S.stn.saved = [...S.stn.saved, r.id];
  S.flags.stnAdded = true;
  if (BRIDGE.stationAttach) BRIDGE.stationAttach(r, blkId);
  toast('teacher', `已掛上「${r.t.slice(0, 12)}」，也放進媒體庫的收藏`, 'check');
}
function insertHere(r) { S.flags.stnInserted = true; S.stn.ed.ins = null; S.stn.ed.lib = false; if (BRIDGE.stationInsert) BRIDGE.stationInsert(r); toast('teacher', `已插入「${r.t}」`, 'check'); }

/* 補給站：一面牆。分頁（全部／我的收藏）、搜尋、科目一排、類型與排序兩個下拉；卡片只有縮圖、標題、哪本哪課 */
function StnDropdown({ id, name, label, value, options, onPick }) {
  const open = S.stn.menu === id;
  return html`<div class="ddw" onClick=${(e) => e.stopPropagation()}>
    <button class=${'fchip dd-btn' + (open ? ' open' : '')} aria-expanded=${open} onClick=${act(() => { S.stn.menu = open ? null : id; })}><span class="dd-name">${name}</span>${label}<${Icon} n="chevron-down" s=${14} /></button>
    ${open && html`<div class="ddm" role="menu">${options.map(([k, l, ic]) => html`<button role="menuitemradio" aria-checked=${value === k} class=${value === k ? 'on' : ''} onClick=${act(() => { onPick(k); S.stn.menu = null; })}>${ic && html`<${Icon} n=${ic} s=${15} />`}${l}${value === k && html`<${Icon} n="check" s=${14} />`}</button>`)}</div>`}
  </div>`;
}
function Space() {
  const sp = S.stn.sp;
  const q = sp.q.trim();
  let list = RES.filter((r) => (!sp.book || r.book === sp.book) && (sp.subj === 'all' || stnBook(r.book).subject === sp.subj) && (!sp.tag || r.tags.includes(sp.tag)) && (sp.kind === 'all' || r.k === sp.kind) && (!sp.saved || isSaved(r.id)));
  list = list.filter((r) => !q || (r.t + (r.body || '') + r.tags.join('') + stnBook(r.book).title + r.lt + stnBook(r.book).subject).includes(q));
  list.sort((a, b) => (sp.sort === 'adopt' ? b.adopt - a.adopt : RES.indexOf(b) - RES.indexOf(a)));
  const book = sp.book && stnBook(sp.book);
  const kindOpts = [['all', '全部'], ...STN_KINDS.map((k) => [k, KIND[k][1], KIND[k][0]])];
  const sortOpts = [['adopt', '最多收藏'], ['new', '最新']];
  return html`<div class="space" onClick=${act(() => { S.stn.menu = null; })}>
    <div class="tab-row"><div class="tabs" role="tablist" aria-label=${NAME}>
      <button role="tab" aria-selected=${!sp.saved} class=${!sp.saved ? 'on' : ''} onClick=${act(() => { sp.saved = false; })}>資源補給</button>
      <button role="tab" aria-selected=${sp.saved} class=${(sp.saved ? 'on' : '') + shint('savedtab')} onClick=${act(() => { sp.saved = true; sp.subj = 'all'; sp.book = null; S.flags.stnSawSaved = true; })}>我的收藏<span class="tn">${S.stn.saved.length}</span></button>
    </div></div>
    <div class="sp-top">
      <div class="srch"><${Icon} n="search" s=${18} /><input class="inp" placeholder="搜尋：科目、課名或概念" value=${sp.q} onInput=${act((e) => { sp.q = e.target.value; })} />${q && html`<button class="x-btn clr" aria-label="清除" onClick=${act(() => { sp.q = ''; })}><${Icon} n="x" s=${14} /></button>`}</div>
      <div class="sp-dd">
        <${StnDropdown} id="kind" name="類型" label=${kindOpts.find((o) => o[0] === sp.kind)[1]} value=${sp.kind} options=${kindOpts} onPick=${(k) => { sp.kind = k; }} />
        <${StnDropdown} id="sort" name="排序" label=${sortOpts.find((o) => o[0] === sp.sort)[1]} value=${sp.sort} options=${sortOpts} onPick=${(k) => { sp.sort = k; }} />
      </div>
    </div>
    <div class="chips">
      <span class=${'chips-l' + shint('subj')}>
        <button class=${'fchip' + (sp.subj === 'all' ? ' on' : '')} onClick=${act(() => { sp.subj = 'all'; sp.book = null; })}>全部</button>
        ${STN_SUBJECTS.map((s) => html`<button class=${'fchip fsubj' + (sp.subj === s ? ' on' : '')} onClick=${act(() => { sp.subj = s; sp.book = null; S.flags.stnFiltered = true; })}><${Pebble} shape=${s} size=${18} dark=${true} />${s}</button>`)}
      </span>
    </div>
    ${(book || sp.tag) && html`<div class="sp-count">
      ${book && html`<button class="fchip x" onClick=${act(() => { sp.book = null; })}>《${book.title}》<${Icon} n="x" /></button>`}
      ${sp.tag && html`<button class="fchip x" onClick=${act(() => { sp.tag = null; })}>#${sp.tag}<${Icon} n="x" /></button>`}
    </div>`}
    ${list.length === 0 ? html`<div class="shelf-empty"><span class="ic sprite"><${Companion} shape="lime" eye="big" box=${88} cls="bob" /></span><p class="t">${sp.saved ? '還沒有收藏' : q ? `沒有老師掛過「${q}」` : '這裡還沒有補充'}</p><p class="h">${sp.saved ? '點一張卡，大視窗裡按「收藏」' : '老師開啟共享的教學資源，會出現在這裡'}</p></div>`
    : html`<div class="wall">${list.map((r, i) => html`<${PinCard} r=${r} key=${r.id} first=${i === 0} />`)}</div>`}
  </div>`;
}
const Wave = ({ n = 12, big, played = -1, onSeek }) => html`<span class=${'swave' + (onSeek ? ' seek' : '')} onClick=${onSeek ? (e) => { const r = e.currentTarget.getBoundingClientRect(); onSeek((e.clientX - r.left) / r.width); } : undefined}>${Array.from({ length: n }, (_, i) => html`<i class=${played >= 0 && i / n < played ? 'on' : ''} style=${{ '--h': (big ? 2 : 1) * [14, 26, 38, 22, 34, 18, 30, 40, 24, 16, 28, 20, 32, 18, 26, 36, 20, 30, 16, 28, 34, 22, 38, 18][i % 24] + 'px' }}></i>`)}</span>`;
const PinThumb = ({ r }) => {
  const [ic, label] = KIND[r.k];
  if (r.k === 'text') return html`<div class="pc-th kt"><span class="kind"><${Icon} n=${ic} s=${13} />${label}</span><p>${r.body}</p></div>`;
  if (r.k === 'audio') return html`<div class="pc-th audio"><span class="kind"><${Icon} n=${ic} s=${13} />${label}</span><${Wave} /></div>`;
  return html`<div class="pc-th" style=${{ aspectRatio: String(r.ar || 1.5) }}><img src=${r.k === 'web' ? r.shot : r.src} alt="" />
    <span class="kind"><${Icon} n=${ic} s=${13} />${label}</span>
    ${r.k === 'video' && html`<span class="splay"><${Icon} n="play" s=${18} /></span>`}
    ${r.dom && html`<span class="site">${r.dom}</span>`}</div>`;
};
function PinCard({ r, first }) {
  const mine = r.by[0] === TEACHER;
  return html`<article class=${'pc' + (first ? shint('card') : '')} onClick=${act(() => { S.stn.modal = { detail: r }; S.flags.stnDetail = true; })}>
    <${PinThumb} r=${r} />
    ${!mine && html`<button class=${'pc-save' + (isSaved(r.id) ? ' on' : '')} aria-pressed=${isSaved(r.id)} title=${isSaved(r.id) ? '取消收藏' : '收藏'} onClick=${act((e) => { e.stopPropagation(); toggleSave(r); })}><${Icon} n="bookmark" s=${15} /></button>`}
    <div class="pc-b"><div class="pc-ttl">${r.t}</div><div class="pc-where">${whereShort(r)}</div></div>
  </article>`;
}
/* 一則補充的大視窗：補給站和自編器共用。能內嵌的網站直接預覽、不能的連出去；影片聲音直接播。在自編器選著一段時多一顆「加進這一段」 */
function StnDetail({ r }) {
  const close = () => { S.stn.modal = null; };
  const b = stnBook(r.book);
  const mine = r.by[0] === TEACHER;
  const sel = BRIDGE.stationSel && BRIDGE.stationSel() ? BRIDGE.stationSel().id : null;
  const inEditor = !!BRIDGE.stationInsert && !!S.stn.ed.station;
  const [ic, label] = KIND[r.k];
  const cnt = r.adopt + (isSaved(r.id) && !mine ? 1 : 0); // 收藏數放在收藏鈕裡，不另外一行
  const [playing, setPlaying] = useState(false);
  let body;
  if (r.k === 'text') body = html`<div class="dv kt">${r.body}</div>`;
  else if (r.k === 'audio') body = html`<div class="dv audio"><${Wave} n=${24} big=${true} played=${playing ? 0.3 : 0} onSeek=${() => setPlaying(true)} /><div class="arow"><button class="play-big" aria-label="播放" onClick=${() => setPlaying(!playing)}><${Icon} n=${playing ? 'pause' : 'play'} s=${26} /></button><span class="dur">${playing ? '0:48' : '0:00'}<small> / ${r.dur}</small></span></div></div>`;
  else if (r.k === 'video') body = html`<div class="dv video"><img src=${r.src} alt="" />${!playing && html`<button class="play-big" aria-label="播放" onClick=${() => setPlaying(true)}><${Icon} n="play" s=${28} /></button>`}
    <div class="vbar"><button class="vb" onClick=${() => setPlaying(!playing)}><${Icon} n=${playing ? 'pause' : 'play'} s=${16} /></button><span class="vtrack"><i style=${{ width: playing ? '38%' : '0%' }}></i></span><span class="vtime">${playing ? '0:27' : '0:00'} / ${r.dur}</span></div></div>`;
  else if (r.k === 'web' && r.embed) body = html`<div class="dv kw"><div class="browser"><div class="bbar"><span></span><span></span><span></span><span class="url">${r.url}</span></div><img src=${r.shot} alt="" /></div></div>`;
  else if (r.k === 'web') body = html`<div class="dv kw noembed"><img src=${r.shot} alt="" /><div class="noembed-m"><p>這個網站不允許放在別的網頁裡預覽</p><a class="btn" href=${r.url} target="_blank" rel="noopener">在新分頁打開<${Icon} n="arrow-up-right" s=${16} /></a></div></div>`;
  else body = html`<div class="dv"><img src=${r.src} alt="" /></div>`;
  return dlg(r.t, html`${body}
    <div class="di">
      <div class="hd"><h4>${r.t}</h4><button class="x-btn" aria-label="關閉" onClick=${act(close)}><${Icon} n="x" /></button></div>
      <div class="meta-line"><${Icon} n=${ic} s=${14} />${label}${r.dom ? ` · ${r.dom}` : ''}${mine && html`<span class="tagme">你加的</span>`}</div>
      <div class="d-where"><${Pebble} shape=${b.subject} size=${30} dark=${true} /><div><span class="l1">${b.subject} · ${b.stage}</span><b class="l2">第 ${r.lesson} 課　${r.lt}</b></div></div>
      <div class="tags">${r.tags.map((t) => html`<button class="tag" onClick=${act(() => { close(); goSpace({ tag: t }); })}>#${t}</button>`)}</div>
      <div class="acts">
        <div class="row">
          ${sel && !mine && html`<button class=${'btn sec ico' + (isSaved(r.id) ? ' lime' : '')} aria-pressed=${isSaved(r.id)} title=${(isSaved(r.id) ? '取消收藏' : '收藏') + `，${cnt} 人收藏`} onClick=${act(() => toggleSave(r))}><${Icon} n="bookmark" s=${18} /><span class="n">${cnt}</span></button>`}
          <a class="btn sec" href=${r.url || 'https://www.youtube.com/'} target="_blank" rel="noopener">${r.k === 'video' ? '在 YouTube 打開' : '打開網站'}<${Icon} n="arrow-up-right" s=${16} /></a>
          ${inEditor ? html`<button class="btn sec" onClick=${act(() => { insertHere(r); close(); })}><${Icon} n="plus" s=${16} />插進課文</button>` : ''}${sel ? (isAdded(r.id) ? html`<span class="tagin"><${Icon} n="check" s=${16} />${mine ? '在你的自編裡' : '已掛上這個元件'}</span>` : html`<button class=${'btn' + shint('addblk')} onClick=${act(() => { addToBlock(r, sel); close(); })}><${Icon} n="plus" s=${16} />掛上這個元件</button>`)
          : !mine ? html`<button class=${'btn' + (isSaved(r.id) ? ' lime' : '') + shint('dsave')} aria-pressed=${isSaved(r.id)} title=${`${cnt} 人收藏`} onClick=${act(() => toggleSave(r))}><${Icon} n="bookmark" s=${16} />${isSaved(r.id) ? '已收藏' : '收藏'}<span class="n">${cnt}</span></button>`
          : html`<span class="tagin"><${Icon} n="check" s=${16} />你掛的，已共享</span>`}
        </div>
      </div>
    </div>`, close, 'detail');
}

/* ───────── 自編器（照底層改造的編輯器：頂部列 Tool Tile、左欄頁縮圖、灰畫布白紙、浮動膠囊、右側面板與媒體庫） ───────── */
const INS_TILES = [['text', 'type', '文字'], ['image', 'image', '圖片'], ['video', 'play', '影片'], ['audio', 'mic', '聲音'], ['shape', 'shapes', '圖形'], ['web', 'globe', '網頁'], ['table', 'table', '表格'], ['pdf', 'file-text', 'PDF'], ['library', 'library', '媒體庫']];
const POP_TILES = [['text', 'file-text', '文字'], ['rich', 'presentation', '大彈窗'], ['image', 'image', '圖片'], ['video', 'play', '影片'], ['audio', 'mic', '聲音'], ['web', 'globe', '網頁'], ['jump', 'arrow-right', '跳轉']];
function StnEditor() {
  const ed = S.stn.ed;
  const sel = ed.sel;
  const addedOn = (id) => blockRes(id).filter((r) => isAdded(r.id)).length;
  const tiles = [
    { ic: 'undo', l: '復原', dis: true }, { ic: 'redo', l: '重做', dis: true }, 'div',
    { ic: 'rocket', l: '找補充', on: ed.station, k: 'tile', run: () => { ed.station = !ed.station; ed.supp = false; ed.add = false; ed.lib = false; } },
    { ic: 'settings', l: '設定' }, { ic: 'save', l: '已儲存' }, { ic: 'share', l: '已共享', on: true }, { ic: 'eye', l: '閱讀模式' },
  ];
  const closeAll = () => { ed.sel = null; ed.supp = false; ed.add = false; ed.ins = null; };
  const capsule = html`<div class="capsule" onClick=${(e) => e.stopPropagation()}>
    <button class="dim" onClick=${act(() => toast('teacher', '示範只做「補充」'))}>內文<${Icon} n="chevron-down" s=${12} /></button>
    <button class="dim" onClick=${act(() => toast('teacher', '示範只做「補充」'))}>20<${Icon} n="chevron-down" s=${12} /></button>
    <button class="dim" onClick=${act(() => toast('teacher', '示範只做「補充」'))}>注</button>
    <span class="ssep"></span>
    <button class=${'ico' + (ed.supp ? ' on' : '')} title="補充" onClick=${act(() => { ed.supp = !ed.supp; ed.add = false; ed.station = false; ed.lib = false; })}><${Icon} n="blocks" s=${18} /></button>
    <button class="ico dim" title="對學生隱藏" onClick=${act(() => toast('teacher', '示範只做「補充」'))}><${Icon} n="eye-off" s=${18} /></button>
    <button class="ico dim" title="刪除" onClick=${act(() => toast('teacher', '示範只做「補充」'))}><${Icon} n="trash" s=${18} /></button>
  </div>`;
  /* 插入點：兩列之間滑過浮現；按下展開插入面板（九宮格＋媒體庫） */
  const gap = (i) => html`<div class=${'gap' + (ed.ins === i ? ' open' : '') + (i >= 2 ? ' gup' : '') + (i === 3 ? shint('gap') : '')} onClick=${(e) => e.stopPropagation()}>
    <button class="gap-btn" aria-label="在這裡插入" onClick=${act(() => { ed.ins = ed.ins === i ? null : i; ed.sel = null; ed.supp = false; })}><${Icon} n="plus" s=${14} /></button>
    ${ed.ins === i && html`<div class="ins-panel" role="dialog" aria-label="插入元件">
      ${INS_TILES.map(([k, ic, l]) => html`<button class=${'ins-t' + (k === 'library' ? shint('lib') : '')} onClick=${act(() => { if (k === 'library') { ed.lib = true; ed.libTab = 'web'; ed.station = false; ed.supp = false; ed.add = false; } else toast('teacher', '示範只做媒體庫'); })}><${Icon} n=${ic} s=${20} />${l}</button>`)}
    </div>`}
  </div>`;
  return html`<div class="editor">
    <header class="ed-top">
      <button class="home" title="回書櫃" onClick=${act(() => { S.t.screen = 'shelf'; })}><${Pebble} shape="自然科學" size=${40} /></button>
      <div class="ed-title" title="教材名稱，點一下就能改">自然 5下 · ${TEACHER}的自編</div>
      <div class="ed-right">
        ${[tiles.slice(0, 2), tiles.slice(3)].map((grp, gi) => html`${gi > 0 && html`<span class="ed-div"></span>`}<div class="ed-grp">${grp.map((t) => html`<button class=${'etile' + (t.on ? ' on' : '') + (t.k ? shint(t.k) : '')} disabled=${t.dis} title=${t.l} onClick=${act(() => (t.run ? t.run() : toast('teacher', '示範只做補充與插入')))}><${Icon} n=${t.ic} s=${20} />${t.l}</button>`)}</div>`)}
      </div>
    </header>
    <div class=${'ed-main' + (ed.supp || ed.station || ed.lib ? ' drawer-open' : '')}>
      <aside class="ed-rail">
        <div class="pill-seg"><button class="on">頁面 6</button><button onClick=${act(() => toast('teacher', '示範不切目次'))}>目次 5</button></div>
        <div class="thumbs">${[1, 2, 3, 4, 5].map((n) => html`<div class=${'ethumb' + (n === 1 ? ' on' : '')} onClick=${act(() => { if (n !== 1) toast('teacher', '示範只畫第 1 頁'); })}><span class="no">${n}</span><div class="sh"><b></b><i></i><i></i><i class="s"></i>${n % 2 === 0 && html`<span class="im"></span>`}<i></i></div></div>`)}</div>
      </aside>
      ${ed.lib && html`<${StnLibrary} />`}
      <div class="ed-canvas" onClick=${act(closeAll)}>
        <div class="esheet" onClick=${(e) => e.stopPropagation()}>
          ${BLOCKS.flatMap((b, i) => { const n = addedOn(b.id); const on = sel === b.id; const cls = 'blk' + (b.kind ? ' ' + b.kind : '') + (on ? ' esel' : '') + (b.id === 'p3' ? shint('blk') : '');
            const corner = n > 0 && html`<span class="corner" title=${`這一段掛了 ${n} 則補充`}><${Icon} n="blocks" s=${12} />${n}</span>`;
            const pick = act(() => { ed.sel = b.id; ed.ins = null; S.flags.stnSelected = true; });
            const el = b.kind === 'fig' ? html`<figure class=${cls} key=${b.id} onClick=${pick}>${on && capsule}<span class="grip">⋮⋮</span><div><img src=${b.img} alt="" /><figcaption>${b.cap}</figcaption></div><p class="enote">${b.text}</p>${corner}</figure>`
              : html`<div class=${cls} key=${b.id} onClick=${pick}>${on && capsule}<span class="grip">⋮⋮</span>${b.text}${corner}</div>`;
            return [el, gap(i)]; })}
        </div>
      </div>
      ${ed.supp && sel && html`<${StnSuppPanel} />`}
      ${ed.station && html`<${StnStation} />`}
    </div>
    ${S.stn.modal && S.stn.modal.detail && html`<${StnDetail} r=${S.stn.modal.detail} />`}
  </div>`;
}
/* 右側「補充內容」面板（照編輯器 PopupPanel）：這一段掛了什麼、「新增一則」展開種類方塊 */
function StnSuppPanel() {
  const ed = S.stn.ed;
  const b = BLOCKS.find((x) => x.id === ed.sel);
  const mine = blockRes(b.id).filter((r) => isAdded(r.id));
  return html`<aside class="drawer suppl" aria-label="補充內容">
    <div class="dr-h"><h4>補充內容</h4><button class="x-btn" aria-label="關閉" onClick=${act(() => { ed.supp = false; })}><${Icon} n="x" /></button></div>
    <div class="dr-b">
      ${mine.length > 0 && html`<div class="sp-kind"><${Icon} n=${KIND[mine[0].k][0]} s=${18} />${KIND[mine[0].k][1]}<button class="lnk2" onClick=${act(() => toast('teacher', '示範不更換種類'))}>更換</button></div>
        <ul class="sp-list">${mine.map((r) => html`<li key=${r.id}><${Icon} n="chevron-right" s=${16} /><span class="t">${r.t}</span><button class="x-btn" aria-label="刪除" onClick=${act(() => toast('teacher', '示範不刪除'))}><${Icon} n="trash" s=${16} /></button></li>`)}</ul>`}
      <div class=${'add-wrap' + (ed.add ? ' open' : '')}>
        <button class="add-btn" onClick=${act(() => { ed.add = !ed.add; })}><${Icon} n="plus" s=${16} />新增一則</button>
        ${ed.add && html`<div class="add-menu">${POP_TILES.map(([k, ic, l]) => html`<button class="add-it" onClick=${act(() => toast('teacher', `示範只做從${NAME}挑`))}><${Icon} n=${ic} s=${20} />${l}</button>`)}</div>`}
      </div>
      ${mine.length === 0 && !ed.add && html`<div class="dr-hint">這一段還沒掛補充。「新增一則」自己加，或上方列的「找補充」挑其他老師掛過的。</div>`}
    </div>
  </aside>`;
}
/* 媒體庫（照編輯器 MediaLibrary：右側面板、依種類分頁、最上面永遠是新增方式、收藏排最前面）。在補給站收藏或掛進課文的，就在這裡的「收藏」 */
function StnLibrary() {
  const ed = S.stn.ed;
  const tabs = [['image', '圖片'], ['video', '影片'], ['audio', '聲音'], ['web', '網頁'], ['pdf', 'PDF']];
  const k = ed.libTab;
  const favs = RES.filter((r) => isSaved(r.id) && r.k === k);
  const ownItems = { image: ['校園植物葉形對照圖', '夏季大三角（課本圖）'], video: ['觀星教室錄影'], audio: ['老師朗讀：星星的世界'], web: ['Stellarium 線上星空'], pdf: ['觀星紀錄單.pdf'] }[k] || [];
  const addLabel = { image: '上傳圖片', video: '上傳影片或貼 YouTube', audio: '上傳聲音', web: '貼上網址', pdf: '上傳 PDF' }[k];
  return html`<aside class="drawer lib" aria-label="媒體庫" onClick=${(e) => e.stopPropagation()}>
    <div class="dr-h"><h4>媒體庫</h4><button class="x-btn" aria-label="關閉" onClick=${act(() => { ed.lib = false; })}><${Icon} n="x" /></button></div>
    <div class="lib-tabs">${tabs.map(([kk, l]) => html`<button class=${k === kk ? 'on' : ''} onClick=${act(() => { ed.libTab = kk; })}>${l}</button>`)}</div>
    <div class="lib-b">
      <button class="lib-add" onClick=${act(() => toast('teacher', '示範不上傳'))}><${Icon} n="plus" s=${16} />${addLabel}</button>
      ${favs.length > 0 && html`<div class="lib-sec"><h5>收藏<span class="n">${favs.length}</span></h5>
        <div class="lib-grid">${favs.map((r, i) => html`<button class=${'lib-it' + (i === 0 ? shint('libfav') : '')} key=${r.id} title="插進課文" onClick=${act(() => insertHere(r))}>${r.k === 'audio' ? html`<span class="lib-ic audio"><${Icon} n="mic" s=${18} /></span>` : html`<img src=${r.k === 'web' ? r.shot : r.src} alt="" />`}<span class="lib-t">${r.t}</span><span class="lib-star"><${Icon} n="bookmark" s=${12} /></span></button>`)}</div></div>`}
      <div class="lib-sec"><h5>${favs.length ? '全部' : ''}</h5>
        <div class="lib-grid">${ownItems.map((t, i) => html`<button class="lib-it" key=${t} onClick=${act(() => toast('teacher', `已插入「${t}」`, 'check'))}>${k === 'audio' ? html`<span class="lib-ic audio"><${Icon} n="mic" s=${18} /></span>` : k === 'pdf' ? html`<span class="lib-ic"><${Icon} n="file-text" s=${18} /></span>` : html`<img src=${['assets/orion-lines.jpg', 'assets/summer-triangle.jpg'][i % 2]} alt="" />`}<span class="lib-t">${t}</span></button>`)}</div></div>
    </div>
  </aside>`;
}
/* 自編器裡的補給站：右側面板，一條搜尋、建議字、縮圖格子。點一格開大視窗，在那裡預覽、收藏或掛進選著的那一段 */
function StnStation() {
  const ed = S.stn.ed;
  const q = ed.q.trim();
  const sel = BRIDGE.stationSel ? BRIDGE.stationSel() : null;
  const match = (r) => !q || (r.t + (r.body || '') + r.tags.join('') + stnBook(r.book).title + r.lt).includes(q);
  const here = sel ? ALL_RES.filter((r) => (S.stn.addedTo || {})[r.id] === sel.id).filter(match) : [];
  // 預設列這一科（這本書的科目）；選著一個元件時先列掛在它上面的；搜尋才跨科目
  const subj = BRIDGE.stationSubject ? BRIDGE.stationSubject() : stnBook('sci').subject;
  const lesson = ALL_RES.filter((r) => stnBook(r.book).subject === subj && !here.includes(r) && match(r));
  const rest = [];
  const other = q ? RES.filter((r) => stnBook(r.book).subject !== subj && match(r)) : [];
  const tile = (r, first) => html`<button class=${'dt' + (first ? shint('eye') : '')} key=${r.id} onClick=${act(() => { S.stn.modal = { detail: r }; S.flags.stnPreviewed = true; })}>
    <span class=${'dt-th ' + r.k}>${r.k === 'image' || r.k === 'video' || r.k === 'web' ? html`<img src=${r.k === 'web' ? r.shot : r.src} alt="" />` : html`<${Icon} n=${KIND[r.k][0]} s=${22} />`}${r.k === 'video' && html`<span class="dt-play"><${Icon} n="play" s=${12} /></span>`}${isAdded(r.id) && html`<span class="dt-ok"><${Icon} n="check" s=${12} /></span>`}</span>
    <span class="dt-t">${r.t}</span></button>`;
  const grid = (list, first) => html`<div class="dt-grid">${list.map((r, i) => tile(r, first && i === 0))}</div>`;
  return html`<aside class="drawer" aria-label=${NAME}>
    <div class="dr-h"><h4>找補充</h4><button class="x-btn" aria-label="關閉" onClick=${act(() => { ed.station = false; BRIDGE.stationClose && BRIDGE.stationClose(); })}><${Icon} n="x" /></button></div>
    <div class="dr-tools">
      <div class="srch"><${Icon} n="search" s=${16} /><input class="inp" placeholder="搜尋：課名或概念" value=${ed.q} onInput=${act((e) => { ed.q = e.target.value; })} />${q && html`<button class="x-btn clr" aria-label="清除" onClick=${act(() => { ed.q = ''; })}><${Icon} n="x" s=${14} /></button>`}</div>
    </div>
    <div class="dr-b">
      ${q ? html`${here.length + lesson.length + rest.length + other.length === 0 ? html`<div class="dr-hint">沒有老師掛過「${q}」。</div>` : grid([...here, ...lesson, ...rest, ...other], true)}`
      : html`
        ${sel && here.length > 0 && html`<section class="dr-sec"><h5>這一段</h5>${grid(here, true)}</section>`}
        ${sel && here.length === 0 && html`<div class="dr-hint">這一段還沒有老師掛補充。</div>`}
        ${sel ? '' : html`<div class="dr-hint">先在課文裡點一個元件，就能把補充掛上去；也可以直接插進課文。</div>`}
        <section class="dr-sec"><h5>${subj}</h5>${lesson.length ? grid(lesson, !sel || here.length === 0) : html`<div class="dr-hint">這一科還沒有老師分享補充。</div>`}</section>`}
    </div>
    <div class="dr-foot">在這裡收藏或掛進課文的，都在媒體庫的「收藏」。</div>
  </aside>`;
}

/* ───────── 導覽 ───────── */
const firstSub = () => (S.task && (S.task.subs[ME] ? ME : +Object.keys(S.task.subs)[0])) || null;
const goTeacherReaderLive = () => { ensureLive(); S.t.screen = 'reader'; };
const CHAPTERS = [
  { n: 1, title: '帳號與班級', lede: '管理員在內部後台依序建學校、老師、學生的帳號，老師登入後自己加入任教的班級，在班級頁管理學生和學生的工具列。學生第一次登入先選一位形狀夥伴：個性跟著形狀走，眼睛只決定長相。' },
  { n: 2, title: '開課與同步', lede: '老師選班級開始上課，學生進課堂就自動跟隨老師：跟頁碼，也跟老師聚焦的段落和句子，不帶老師的畫記。能不能取消跟隨、自己翻頁，看老師選自由閱讀還是鎖定螢幕。' },
  { n: 3, title: '到課與加分', lede: '按左欄最下面的「上課中」，點「501 29/30」打開全班名單：一開始大家都是 0 分，只看到座號，看得出誰還沒登入。預設是加分模式，被加分或扣分的人才變成自己的形狀夥伴。週期是「開始上課」到「下課」。' },
  { n: 4, title: '教學工具', lede: '畫筆和螢光筆可以選顏色、粗細，橡皮擦拉框清除，雷射筆畫完就淡掉。計時器同步到學生畫面。分組、白板、便利貼、貼紙收在工具箱，左欄的工具可以自己增減。' },
  { n: 5, title: '任務', lede: '題目用口頭說，老師選題型就派出。選擇題作答時只顯示幾人答完，結束作答後看分布、點出正確答案再公布，一鍵幫答對的人加分；文字題、手寫題、聲音題即時回收；手寫題可以畫在課本上，也可以畫在白紙、方格、四線格。' },
  { n: 6, title: '下課', lede: '老師按「下課」，這堂課的加分自動存成一筆紀錄。學生畫面整頁換成下課回饋，形狀夥伴陪學生收尾。下課的畫面和夥伴說的話取自 Rong 的形狀夥伴原型。' },
  { n: 7, title: '學習紀錄', lede: '每次上課的加分、派過的任務都留在班級頁的「學習紀錄」。老師課後回看、補題目，只看得到自己科目的紀錄。' },
  { n: 8, title: '書櫃互動', lede: '學生的書櫃上，形狀夥伴會依情境出現、說話。取自 Rong 的形狀夥伴原型。' },
  { n: 9, title: NAME, lede: `老師在自己的自編裡掛的網站、YouTube 影片，自編共享後其他老師在「${NAME}」看得到（只收連結，上傳的圖片、聲音、影片檔不進來，避開著作權問題）：一面牆，搜尋、科目、類型找，點一張預覽、收藏。自編器上方列的「找補充」找的是同一批東西，選著一段就能直接掛進去；收藏的都在媒體庫。` },
];
/* 「幫我做這一步」一次只往前走一個畫面：到帳號管理 → 切分頁 → 打開新增視窗 → 建立，讓看的人看得到每一步 */
function adminStep(tab, modal, finish) {
  const A = S.admin;
  if (A.shelfTab !== 'accounts') { A.shelfTab = 'accounts'; return; }
  if (A.tab !== tab) { A.tab = tab; A.modal = null; return; }
  const key = Object.keys(modal)[0];
  if (!(A.modal && A.modal[key])) { A.modal = modal; if (key === 'student') A.justMade = false; return; }
  finish();
}
const liveT = () => !!(S.task && S.task.status === 'collecting');
// 要按「再派一題」之前，先把回收面板帶回到看得到那顆按鈕的地方
const toNext = () => (S.t.pop !== 'task' ? 't-task' : liveT() ? (S.task.type === 'text' ? 't-stop-text' : S.task.type === 'shot' ? 't-stop' : 't-stop-voice') : S.task.view ? 't-detail-back' : 't-next-task'); // 作答中回收面板只顯示進度，要先結束作答才看得到每份作答（2026-11-03）
const STEPS = {
  1: [
    { side: 'admin', hint: () => (S.admin.shelfTab !== 'accounts' ? 'a-nav' : S.admin.tab !== 'schools' ? 'a-tab-schools' : !(S.admin.modal && S.admin.modal.school) ? 'a-create' : 'a-school-go'), text: `管理員在書櫃點「帳號管理」→「學校」→「新增學校」，建立${SCHOOL}`, done: () => S.admin.madeSchool, run: () => adminStep('schools', { school: { name: SCHOOL, type: '學校', stage: '國小' } }, () => { S.admin.modal = null; makeSchool(); }) },
    { side: 'admin', hint: () => (S.admin.shelfTab !== 'accounts' ? 'a-nav' : S.admin.tab !== 'teachers' ? 'a-tab-teachers' : !(S.admin.modal && S.admin.modal.teacher) ? 'a-create' : 'a-teacher-go'), text: `到「教師」→「新增老師」，建${TS}的帳號（不指定班級，老師登入後自己加入）`, done: () => S.admin.madeTeacher, run: () => { makeSchool(); adminStep('teachers', { teacher: { school: SCHOOL, email: 'fang@star.example', pw: genPw(), last: '方', first: '小明' } }, () => { S.admin.modal = null; makeTeacher(); }); } },
    { side: 'admin', hint: () => (S.admin.shelfTab !== 'accounts' ? 'a-nav' : S.admin.tab !== 'students' ? 'a-tab-students' : !(S.admin.modal && S.admin.modal.student) ? 'a-create' : 'a-go'), text: '到「學生」→「新增學生」，用多筆一次建好 501 的 30 個帳號', done: () => S.admin.made501, run: () => { makeTeacher(); S.admin.mode = 'multi'; adminStep('students', { student: true }, () => { make501(); }); } },
    { side: 'teacher', hint: () => (S.t.shelfTab !== 'classes' ? 't-classes' : S.t.modal !== 'join' ? 't-join' : 't-join-go'), text: '老師到書櫃的「班級星艦」，按「新增班級」選 501 和自然', done: () => S.t.classes.some((x) => x.c === '501'), run: () => { make501(); S.t.screen = 'shelf'; S.t.classView = null;
      if (S.t.shelfTab !== 'classes') { S.t.shelfTab = 'classes'; return; }
      if (S.t.modal !== 'join') { S.t.modal = 'join'; S.t.joinDraft = { c: '501', subj: '自然' }; return; }
      joinClass('501', '自然'); } },
    { side: 'teacher', hint: 't-classcard', text: '點開 501 班級卡：學生依座號排列，「⋯」可以改學生資料、移出班級', done: () => !!S.flags.classSeen, run: () => { ensureTeacher(); openClass('501', '自然'); later(900, () => { if (S.t.classView) S.t.classView.menu = 3; }); later(2600, () => { if (S.t.classView) S.t.classView.menu = null; S.flags.classSeen = true; }); } },
    { side: 'teacher', hint: () => (S.t.classView && S.t.classView.tab === 'toolbar' ? (S.tbDraft && S.tbDraft.includes('sticky') ? 't-toolsave' : 't-slot') : 't-tooltab'), text: '到「學生工具列」：預覽的左欄就是學生看到的樣子。按最後一格的＋加入便利貼，拖曳可以換順序、按 × 拿掉，存起來；點左下的同步鈕看跟隨老師／自己翻頁兩種樣子', done: () => !!S.flags.toolbarSaved, run: () => { ensureTeacher(); openClass('501', '自然', 'toolbar'); S.tbDraft = S.tbDraft || [...S.toolbar['501·自然']]; later(700, () => { S.tbOpen = true; }); later(1700, () => { S.tbOpen = false; if (!S.tbDraft.includes('sticky')) S.tbDraft.push('sticky'); }); later(2700, () => { const i = S.tbDraft.indexOf('sticky'); S.tbDraft.splice(i, 1); S.tbDraft.splice(Math.max(0, i - 2), 0, 'sticky'); }); later(3700, () => { S.toolbar['501·自然'] = [...S.tbDraft]; S.flags.toolbarSaved = true; toast('teacher', '已儲存'); }); } },
    { side: 'student', hint: () => (S.s.screen === 'login' ? 's-login' : S.s.pickStep === 1 ? (S.s.draft.shape ? 's-shape-next' : 's-shape') : S.s.draft.eye === 'happy' ? 's-pick-done' : 's-eye'), text: '學生第一次登入，先選一位形狀夥伴（每個形狀有自己的個性和口頭禪），再幫它選一雙眼睛', done: () => !!S.s.avatar, run: () => { if (S.s.screen === 'login') studentLogin(); S.s.pickStep = 1; later(800, () => { S.s.draft = { shape: 'pink', eye: 'big' }; }); later(1800, () => { S.s.pickStep = 2; }); later(2800, () => { S.s.draft.eye = 'happy'; }); later(3800, () => finishPick()); } },
    { side: 'admin', hint: null, text: '學生名單也可以用 Excel 一次匯入：「新增學生」切到「Excel 匯入」，下載範本照欄位填好再上傳', done: () => !!S.flags.excelSeen, run: () => { S.view = 'admin'; adminStep('students', { student: true }, () => { S.admin.mode = 'excel'; S.flags.excelSeen = true; }); } },
    { side: 'admin', hint: null, text: '老師換班、多教一班時，管理員在「教師」那一列按「⋯ → 編輯資料」改任教班級，老師的班級星艦會跟著變', done: () => !!S.flags.editTeacherSeen, run: () => { S.view = 'admin'; const A = S.admin; if (A.shelfTab !== 'accounts') { A.shelfTab = 'accounts'; return; } if (A.tab !== 'teachers') { A.tab = 'teachers'; return; } const t = A.teachers.find((x) => x.me) || A.teachers[0]; A.modal = { editTeacher: t, d: { name: t.name, email: t.email, school: t.school, classes: teacherClasses(t), pw: null } }; S.flags.editTeacherSeen = true; } },
    { side: 'teacher', hint: null, text: '老師在 501 班級頁按「帳號小卡」，印出每位學生的帳號、密碼和 QR code，剪開發給學生', done: () => !!S.flags.cardsSeen, run: () => { if (S.view === 'admin') S.view = 'split'; ensureTeacher(); openClass('501', '自然'); S.t.modal = { cards: '501' }; S.flags.cardsSeen = true; } },
  ],
  2: [
    { side: 'teacher', hint: () => (S.t.shelfTab === 'hall' ? 't-open' : null), text: `老師回「地球大廳」，打開《${BOOK_TITLE}》`, done: () => S.t.screen === 'reader' || S.cls.everLive, run: () => { S.t.shelfTab = 'hall'; S.t.classView = null; openBook(); } },
    { side: 'teacher', hint: () => (S.t.modal ? 't-start-go' : 't-start'), text: '按「開始上課」，選 501 · 自然和同步模式，從這一頁開始', done: () => S.cls.everLive, run: () => { if (S.t.screen !== 'reader') openBook(); S.t.modal = 'start'; S.t.draft = { ci: Math.max(0, S.t.classes.findIndex((x) => x.c === '501')), mode: 'free' }; later(1500, () => { S.t.modal = null; startClass({ cid: '501', subj: '自然', mode: 'free' }); }); } },
    { side: 'student', hint: () => (S.s.screen === 'login' ? 's-login' : 's-join'), text: '學生收到「老師開始上課了」，按加入就自動跟隨老師的頁面', done: () => S.s.inClass, run: () => { if (S.s.screen === 'login') studentLogin(); if (S.s.screen === 'pick') finishPick(); if (!S.s.inClass) { S.s.invite = true; later(1500, () => joinStudent()); } } },
    { side: 'teacher', hint: 't-mode', text: '按左欄最下面的「上課中」再按「鎖定」：學生跟著老師翻頁，不能畫記；再按一次回到自由閱讀', done: () => S.cls.modeChanged, run: () => { goTeacherReaderLive(); setMode('lock'); later(2200, () => setMode('free')); } },
    { side: 'teacher', hint: () => (S.t.supp ? null : S.t.pop === 'supp' ? 't-supp-orion' : 't-supp'), text: '鎖定螢幕時，老師從左欄「補充資源」打開「把星星連起來：獵戶座」，學生畫面跟著打開同一張；老師關掉，學生的也一起關掉', done: () => !!S.flags.suppSynced, run: () => { goTeacherReaderLive(); if (S.cls.mode !== 'lock') setMode('lock'); S.t.page = 0; S.t.pop = 'supp'; later(900, () => openSupp('teacher', suppById('orion'))); later(3400, () => { closeSupp('teacher'); S.t.pop = null; }); } },
    { side: 'teacher', hint: 't-focus', text: '老師點課文的一段，那一段留著、其他調暗，學生畫面同步聚焦同一段；再點一下段裡的一句，只留那一句', done: () => !!S.flags.focusSent, run: () => { goTeacherReaderLive(); S.t.tool = null; S.focus = { page: S.t.page, blk: 'p1', sn: null, mark: false }; S.flags.focusSent = true; later(1400, () => { S.focus = { ...S.focus, sn: 1 }; }); later(2800, () => { S.focus = { ...S.focus, mark: true }; }); } },
    { side: 'student', hint: () => (S.s.rs && S.s.rs.fs > DEFAULT_RS.fs ? null : 's-settings'), text: '（試做）學生在「設定」把字調大，這一頁變長、要往下捲才看得完。老師點這頁最下面那段，跟隨中的學生畫面會自己捲到那一段', done: () => !!S.flags.followScrolled, run: () => {
      goTeacherReaderLive(); S.t.tool = null; S.t.pop = null; S.s.pop = null;
      if (!locked() && !S.s.follow) setFollow(true);
      S.s.rs = { ...(S.s.rs || DEFAULT_RS), fs: 32, lh: 2 };
      if (S.t.page !== 0) S.t.page = 0;
      later(450, () => { S.focus = { page: 0, blk: 'p2', sn: null, mark: false }; S.flags.focusSent = true; });
      later(1600, () => { S.flags.followScrolled = true; });
    } },
    { side: 'student', hint: 's-follow', text: '回到自由閱讀，學生還在跟隨中；跟隨中，左欄最下面的頁數是藍色、只有老師頭像和頁碼，沒有箭頭，不會誤觸翻頁。點一下就變回自己翻頁；按上方的老師頭像又跟回來', done: () => S.s.toggled, run: () => { if (S.cls.mode === 'lock') setMode('free'); setFollow(false); later(1800, () => setFollow(true)); } },
    { side: 'student', hint: () => (S.s.pop === 'supp' ? 's-supp-chart' : 's-supp'), text: '自由閱讀時，學生自己打開「補充資源」看這一頁有什麼。自己點開的只有自己看得到，老師那邊不會出現', done: () => !!S.flags.sSuppOpened, run: () => { goTeacherReaderLive(); if (S.cls.mode === 'lock') setMode('free'); closeSupp('teacher'); S.t.pop = null; S.s.pop = 'supp'; openSupp('student', suppById(sPage() === 0 ? 'chart' : 'tri')); } },
  ],
  3: [
    { side: 'teacher', hint: 't-roster', text: '按左欄最下面的「上課中」，點「501 29/30」打開全班名單：一開始大家都是 0 分，只看到座號，看得出誰還沒登入', done: () => !!S.flags.rosterSeen, run: () => { S.t.pop = 'roster'; S.flags.rosterSeen = true; S.flags.scoreOpened = true; S.t.scoreMode = 'plus'; } },
    { side: 'teacher', hint: () => (S.t.pop !== 'roster' ? 't-roster' : 't-me'), text: '預設就是加分模式，點誰就幫誰 +1，加過分的會變成自己的形狀夥伴。點 12 號陳小宇，學生端會跳提示', done: () => !!S.flags.meScored, run: () => { goTeacherReaderLive(); S.t.pop = 'roster'; S.t.scoreMode = 'plus'; bonus(ME, 1); [3, 8, 21].forEach((x) => bonus(x, 1)); } },
    { side: 'student', hint: null, text: '學生被加分時，形狀夥伴從右下角冒出來開心地說一句話，說完又躲回去', done: () => !!S.flags.buddyBonus, run: () => { if (!S.flags.meScored) { goTeacherReaderLive(); bonus(ME, 1); } S.flags.buddyBonus = true; } },
    { side: 'teacher', hint: 't-class', text: '大家都很投入，按「全班 +1」', done: () => !!S.flags.classBonus, run: () => { goTeacherReaderLive(); S.t.pop = 'roster'; S.t.scoreMode = 'plus'; classBonus(1); } },
    { side: 'teacher', hint: 't-minus', text: '切到「扣分」再點形狀夥伴就是扣一分，「全班 −1」一次扣全班；點錯了按「上一步」', done: () => !!S.flags.minusUsed, run: () => { goTeacherReaderLive(); S.t.pop = 'roster'; S.t.scoreMode = 'minus'; later(900, () => bonus(5, -1)); later(2200, () => undoScore()); later(3000, () => { S.t.scoreMode = 'plus'; }); } },
    { side: 'teacher', hint: null, text: '工具箱的「隨機抽籤」：從已加入的學生抽一位發表，抽到的可以直接 +1', done: () => !!S.flags.lotterySeen, run: () => { goTeacherReaderLive(); S.t.pop = 'lottery'; const pool = S.cls.joined.length ? S.cls.joined : [ME]; S.lot = { seat: pool[Math.floor(Math.random() * pool.length)], rolling: false, plus: 0, fx: 0 }; S.flags.lotterySeen = true; } },
  ],
  4: [
    { side: 'teacher', hint: 't-pen', text: '點左欄「畫筆」，旁邊跳出顏色和粗細，挑一個顏色在課本上畫', done: () => !!S.flags.penSet, run: () => { goTeacherReaderLive(); S.t.pop = null; S.t.tool = 'pen'; S.t.inkPop = true; S.t.brush.pen.c = PEN_C[1]; S.t.brush.pen.w = 6; pgl(S.t.ink, PAGES[S.t.page].id).push({ c: PEN_C[1], w: 6, pts: [[120, 300], [180, 296], [260, 302], [330, 298]] }); S.flags.penSet = true; } },
    { side: 'teacher', hint: 't-eraser', text: '換「橡皮擦」拉一個框，框到的筆跡一次清掉', done: () => !!S.flags.boxErased, run: () => { goTeacherReaderLive(); const ink = pgl(S.t.ink, PAGES[S.t.page].id); if (!ink.length) ink.push({ c: PEN_C[1], w: 6, pts: [[140, 300], [220, 296], [300, 304]] }); S.t.tool = 'eraser'; S.t.inkPop = false; later(1200, () => { eraseRect(ink, [100, 260, 360, 340]); S.flags.boxErased = true; }); } },
    { side: 'teacher', hint: () => (S.t.pop === 'toolbox' ? 't-tb-laser' : 't-box'), text: '工具箱裡的「雷射筆」畫完一下子就淡掉，適合邊講邊指', done: () => !!S.flags.laserUsed, run: () => { goTeacherReaderLive(); S.t.pop = null; S.t.tool = 'laser'; S.t.inkPop = true; S.flags.laserUsed = true; } },
    { side: 'teacher', hint: () => (S.t.pop === 'timer' ? 't-timer-go' : S.t.pop === 'toolbox' ? 't-tb-timer' : 't-box'), text: '「工具箱」裡的「計時器」倒數，學生畫面同步顯示，時間到 3 秒後消失', done: () => !!S.flags.timerUsed, run: () => { goTeacherReaderLive(); startTimer(8); } },
    { side: 'teacher', hint: () => (S.t.pop === 'toolbox' ? 't-tb-group' : S.t.pop === 'group' ? null : 't-box'), text: '工具箱的「分組」：總人數自動帶已加入的人數，填組別數就能分', done: () => !!S.flags.grouped, run: () => { goTeacherReaderLive(); S.t.tool = null; S.t.inkPop = false; S.t.pop = 'group'; S.t.grp = { total: String(S.cls.joined.length), by: 'groups', n: '5', busy: false, res: null }; makeGroups(S.t.grp); } },
    { side: 'teacher', hint: () => (S.t.pop === 'toolbox' ? 't-tb-board' : 't-box'), text: '「白板」浮在課本上，左下角可以換方格或英文四線格', done: () => !!S.flags.boardUsed, run: () => { goTeacherReaderLive(); S.t.pop = null; openBoard(S.t); S.t.board.bg = 'en'; } },
    { side: 'teacher', hint: () => (S.t.pop === 'toolbox' ? 't-tb-note' : 't-box'), text: '「便利貼」直接打字、可以拖著走；「貼紙」選好點一下頁面就貼上', done: () => !!S.flags.noteUsed, run: () => { goTeacherReaderLive(); if (S.t.board) S.t.board.open = false; addNote(S.t, S.t.page); const ns = pgl(S.t.notes, PAGES[S.t.page].id); ns[ns.length - 1].text = '下課前提醒大家看北斗七星'; S.t.editNote = null; pgl(S.t.stickers, PAGES[S.t.page].id).push({ id: uid(), x: 720, y: 120, e: 'star' }); } },
    { side: 'teacher', hint: () => (S.t.pop === 'toolbox' ? null : 't-box'), text: '打開工具箱時，左欄工具右上角出現 ×，不常用的可以拿掉；拿掉的在工具箱按 ＋ 放回去', done: () => !!S.flags.railEdited, run: () => { goTeacherReaderLive(); S.t.tool = null; S.t.inkPop = false; S.t.pop = 'toolbox'; later(1200, () => { S.t.rail = S.t.rail.filter((k) => k !== 'clear'); S.flags.railEdited = true; }); later(2800, () => { if (!S.t.rail.includes('clear')) S.t.rail.splice(4, 0, 'clear'); }); } },
    { side: 'teacher', hint: null, text: '工具箱「系統工具」的「目次」：點了直接打開，看整本的章節、跳到任何一頁', done: () => !!S.flags.tocSeen, run: () => { goTeacherReaderLive(); S.t.pop = 'toc'; S.flags.tocSeen = true; } },
  ],
  5: [
    { side: 'teacher', hint: () => (S.t.pop !== 'task' ? 't-task' : !S.compose ? 't-type-choice' : 't-send'), text: '口頭出題「北極星在哪一個星座裡？」，點「派任務 → 選擇題 → 派出」', done: () => !!S.flags.choiceSent, run: () => { goTeacherReaderLive(); sendTask('choice', { n: 4 }); } },
    { side: 'student', hint: () => (S.s.modal === 'choice' ? 's-pickB' : 's-choice-open'), text: '學生跳出 A–D 大按鈕，選一個送出；送出後不能改', done: () => !!S.flags.choiceAnswered || !!S.flags.revealed, run: () => { if (!S.task || S.task.type !== 'choice') { goTeacherReaderLive(); sendTask('choice', { n: 4 }); } S.s.modal = 'choice'; later(1600, () => answerChoice('B')); } },
    { side: 'teacher', hint: 't-close', text: '作答中只看到幾人答完。大家都答了，按「結束作答」', done: () => !!S.flags.choiceClosed || !!S.flags.revealed, run: () => { if (S.task && S.task.type === 'choice') { S.t.pop = 'task'; closeAnswer(); } } },
    { side: 'teacher', hint: 't-correct', text: '點選正確選項 B：直接公布答案，每個選項的人數長出來', done: () => !!S.flags.revealed, run: () => { if (S.task && S.task.type === 'choice') { S.t.pop = 'task'; closeAnswer(); reveal('B'); } } },
    { side: 'teacher', hint: 't-plusright', text: '名單分答對、答錯、沒作答。在「答對」這組按「答對 +1」一鍵加分；旁邊的「抽籤」可以請一位發表', done: () => !!S.flags.plusRight, run: () => { if (S.task && S.task.type === 'choice') { S.t.pop = 'task'; plusRight(); } } },
    { side: 'student', hint: null, text: '學生收到答對或答錯，夥伴跟著反應：答對開心、答錯安慰；答對的人同時收到加分', done: () => !!S.flags.resultSeen, run: () => { S.s.modal = null; S.flags.resultSeen = true; } },
    { side: 'teacher', hint: () => (S.task ? 't-next-task' : !S.compose ? 't-type-text' : 't-send'), text: '按「再派一題」，改派文字題', done: () => !!S.flags.textSent, run: () => { goTeacherReaderLive(); sendTask('text', {}); } },
    { side: 'student', hint: 's-text-send', text: '學生在跳出的視窗打字回答、送出', done: () => !!S.flags.textAnswered, run: () => { if (!S.task || S.task.type !== 'text') { goTeacherReaderLive(); sendTask('text', {}); } submitText('先找到北斗七星，把勺口兩顆星連起來，往外延長五倍就是北極星。'); S.s.modal = null; } },
    { side: 'teacher', hint: () => (S.t.pop !== 'task' ? 't-task' : liveT() ? 't-stop-text' : 't-textcard'), text: '按「結束作答」，回收面板列出每個人寫的字。點一張卡放大，可以投影、加分', done: () => !!S.flags.textViewed, run: () => { if (S.task && S.task.type === 'text') { S.t.pop = 'task'; if (liveT()) stopTask(); later(1400, () => { S.task.view = ME; S.flags.textViewed = true; }); } } },
    { side: 'teacher', hint: () => (S.task && S.task.type !== 'shot' ? toNext() : !S.compose ? 't-type-shot' : 't-send'), text: '再派手寫題：「畫在」選課本這一頁（也可以選白紙、方格、四線格）', done: () => !!S.flags.shotSent, run: () => { goTeacherReaderLive(); sendTask('shot', {}); } },
    { side: 'student', hint: () => (S.s.modal === 'submit' ? 's-confirm' : 's-submit'), text: '學生直接在課本上作答（畫在另一層），按「送出畫面」，夥伴說一句「交出去了」', done: () => !!S.flags.shotSubmitted, run: () => { if (!S.task || S.task.type !== 'shot') { goTeacherReaderLive(); sendTask('shot', {}); } if (!S.task.mine.length) autoAnswer(); submit(); } },
    { side: 'teacher', hint: () => (S.t.pop !== 'task' ? 't-task' : 't-stop'), text: '按「結束作答」：學生端不能再送出', done: () => !!S.flags.shotStopped, run: () => { if (S.task) { S.task.view = null; S.shared = null; S.t.pop = 'task'; stopTask(); } } },
    { side: 'teacher', hint: () => (S.t.pop !== 'task' ? 't-task' : S.task && S.task.view ? 't-share' : 't-detail'), text: '點一份作品放到整個畫面：直接用筆批註（旁邊有橡皮擦、清除），批註送回學生；按 +1 加分，「分享畫面」給全班看（顯示座號姓名）', done: () => !!S.flags.sharedOnce, run: () => { if (liveT()) stopTask(); const f = firstSub(); if (f) { S.t.pop = 'task'; openDetail(f); const sub = S.task.subs[f]; if (!sub.notes.length) sub.notes.push({ c: COLORS.note, w: 4, pts: [[600, 60], [700, 40], [790, 70]] }); share(f); } } },
    { side: 'teacher', hint: () => (S.task && S.task.type !== 'voice' ? toNext() : !S.compose ? 't-type-voice' : 't-send'), text: '再派聲音題：學生錄音回答，例如念一段課文、用英文回答', done: () => !!S.flags.voiceSent, run: () => { goTeacherReaderLive(); sendTask('voice', {}); } },
    { side: 'student', hint: () => (S.s.modal === 'voice' ? 's-rec' : 's-rec-open'), text: '學生按錄音、說完按停止，同一顆鈕變成播放可以先聽，不滿意就重錄，再送出（示範的錄音是模擬的）', done: () => !!S.flags.voiceAnswered, run: () => { if (!S.task || S.task.type !== 'voice') { goTeacherReaderLive(); sendTask('voice', {}); } submitVoice(9); } },
    { side: 'teacher', hint: () => (S.t.pop !== 'task' ? 't-task' : liveT() ? 't-stop-voice' : 't-voice-play'), text: '按「結束作答」，回收面板一格一位，點播放鍵聽；可以抽籤、幫有作答的全部 +1，或點某一格的 +1 單獨加分', done: () => !!S.flags.voicePlayed, run: () => { if (S.task && S.task.type === 'voice') { S.t.pop = 'task'; if (liveT()) stopTask(); later(1400, () => { playVoice('v' + S.task.id + ME); S.flags.voicePlayed = true; }); } } },
  ],
  6: [
    { side: 'teacher', hint: 't-end', text: '按「下課」：這堂課的加分自動存成一筆紀錄；學生畫面整頁換成「下課囉！」，夥伴說一句下課的話，點夥伴換下一句', done: () => !!S.flags.ended, run: () => { if (!S.cls.live) { ensureLive(); bonus(ME, 1); } endClass(); later(2200, () => { if (S.s.end) S.s.end.msgI = (S.s.end.msgI || 0) + 1; }); } },
    { side: 'student', hint: 's-mood', text: '學生選今天上課的心情（很開心、學到很多、還好、有點難、有點累、不開心），夥伴回一句話；只能選一次', done: () => !!S.s.mood, run: () => { if (S.s.screen !== 'end') { if (S.cls.live) endClass(); else toEnd(endStats()); } S.s.mood = 'learned'; if (S.s.end) S.s.end.msgI = 0; } },
    { side: 'student', hint: 's-end-shelf', text: '下面整理今天做了什麼（畫了幾筆重點、答對幾題、老師加了幾分），按「回書櫃」離開，夥伴在書櫃說一句下課的話', done: () => !!S.flags.endBack, run: () => { if (S.s.screen !== 'end') toEnd(endStats()); endToShelf(); } },
  ],
  7: [
    { side: 'teacher', hint: () => (S.t.screen !== 'shelf' ? null : S.t.shelfTab !== 'classes' ? 't-classes' : !S.t.classView ? 't-classcard' : 't-records'), text: '回書櫃 →「班級星艦」→ 501 →「學習紀錄」', done: () => !!(S.t.classView && S.t.classView.tab === 'records'), run: () => { if (S.cls.live) endClass(); openClass('501', '自然', 'records'); } },
    { side: 'teacher', hint: () => (S.t.classView && S.t.classView.rec.view === 'index' ? 't-rec-score' : 't-rec-session'), text: '加分紀錄：每次上課一筆，可以取名。點進去看全班那一堂各加幾分', done: () => !!S.flags.sessionSeen, run: () => { openClass('501', '自然', 'records'); S.t.classView.rec = { view: 'session', id: S.sessions[0].id, sort: 'seat' }; S.flags.sessionSeen = true; } },
    { side: 'teacher', hint: () => (S.t.classView && S.t.classView.rec.view === 'total' ? 't-rec-person' : S.t.classView && S.t.classView.rec.view !== 'index' ? 't-rec-back' : 't-rec-total'), text: '累計總分：點一位學生，右邊滑出他每次上課的紀錄', done: () => !!S.flags.personSeen, run: () => { openClass('501', '自然', 'records'); S.t.classView.rec = { view: 'total' }; later(1300, () => { S.t.classView.rec = { view: 'total', person: ME }; S.flags.personSeen = true; }); } },
    { side: 'teacher', hint: () => (S.t.classView && S.t.classView.rec.view === 'tasks' ? 't-rec-taskrow' : S.t.classView && S.t.classView.rec.view !== 'index' ? 't-rec-back' : 't-rec-task'), text: '任務紀錄：點一題看結果，課後補上題目', done: () => !!S.flags.taskRecSeen, run: () => { openClass('501', '自然', 'records'); S.t.classView.rec = { view: 'tasks' }; later(1300, () => { S.t.classView.rec = { view: 'task', id: S.taskLog[0].id }; S.flags.taskRecSeen = true; }); } },
    { side: 'teacher', hint: null, text: '加分紀錄每一堂可以取名：沒取名時自動帶上課的那一節；按鉛筆改名，右上角「匯出 Excel」可以下載分數', done: () => !!S.flags.renameSeen, run: () => { openClass('501', '自然', 'records'); S.t.classView.rec = { view: 'sessions', edit: S.sessions[0].id }; S.flags.renameSeen = true; } },
  ],
  8: [
    { side: 'student', hint: 's-buddy', text: '學生的書櫃右側，夥伴躲在書櫃後面探出頭，點一下才整個跳出來。點它輪流說話，會提到今天老師加了幾分', done: () => !!S.flags.shelfPoked, run: () => { S.s.screen = 'shelf'; pokeShelf(); } },
    { side: 'student', hint: null, text: '書櫃上有新書時，夥伴開心地提示', done: () => !!S.flags.newBook, run: () => { S.s.screen = 'shelf'; S.s.shelfMood = 'new'; S.flags.newBook = true; say(TALK[S.s.avatar.shape].newBook, 'celebrating', 3600); } },
    { side: 'student', hint: () => (S.s.shelfMood === 'away' ? 's-buddy' : null), text: '很久沒登入時，夥伴在書櫃睡著了，點一下叫醒它', done: () => !!S.flags.woke, run: () => { S.s.screen = 'shelf'; if (S.s.shelfMood !== 'away') { S.s.shelfMood = 'away'; S.s.rx = null; } else pokeShelf(); } },
    { side: 'student', hint: 's-avatar', text: '右上角座號頭像的選單看自己的學習夥伴；按「換學習夥伴」可以重選', done: () => !!S.flags.palSeen, run: () => { S.s.screen = 'shelf'; S.s.menu = true; S.flags.palSeen = true; } },
    { side: 'student', hint: null, text: '頭像選單的「個人資料」看自己的帳號和密碼（學生不能改密碼，忘了請老師重設）', done: () => !!S.flags.profileSeen, run: () => { S.s.screen = 'shelf'; S.s.menu = false; S.profile = { side: 'student', show: false, pw: null }; S.flags.profileSeen = true; } },
  ],
  9: [
    { side: 'teacher', hint: 't-space', text: `老師書櫃的上方導覽多了「${NAME}」，點進去`, done: () => !!S.flags.stnIn, run: () => { S.t.screen = 'shelf'; goSpace(); } },
    { side: 'teacher', hint: 'subj', text: '搜尋靠左，跟類型（網站／影片）、排序兩個下拉同一列；下面科目一排。點「自然科學」', done: () => !!S.flags.stnFiltered, run: () => { goSpace({ subj: '自然科學' }); S.flags.stnFiltered = true; } },
    { side: 'teacher', hint: 'card', text: '點一張卡開大視窗：能內嵌的網站直接預覽、不能的連出去；YouTube 直接播。只寫科目、年段、課次和幾人收藏', done: () => !!S.flags.stnDetail, run: () => { S.stn.modal = { detail: RES[0] }; S.flags.stnDetail = true; } },
    { side: 'teacher', hint: 'dsave', text: '喜歡就收藏。收藏的會進自編器的媒體庫', done: () => !!S.flags.stnSaved, run: () => { const r = RES.find((x) => !isSaved(x.id) && x.by[0] !== TEACHER); toggleSave(r); S.stn.modal = null; } },
    { side: 'teacher', hint: 'savedtab', text: '上面的分頁「資源補給｜我的收藏」，切到「我的收藏」', done: () => !!S.flags.stnSawSaved, run: () => { S.stn.modal = null; goSpace({ saved: true }); S.flags.stnSawSaved = true; } },
    { side: 'teacher', hint: () => (S.t.screen === 'editor' ? null : S.t.shelfTab !== 'hall' ? 't-hall' : (S.t.bookTab || 'textbook') !== 'mine' ? 't-minetab' : 't-myedit'), text: '回「地球大廳」→「自編教材」，打開自己的自編', done: () => S.t.screen === 'editor', run: () => { S.stn.modal = null; if (S.t.shelfTab !== 'hall') { S.t.shelfTab = 'hall'; S.t.classView = null; return; } if ((S.t.bookTab || 'textbook') !== 'mine') { S.t.bookTab = 'mine'; return; } S.t.screen = 'editor'; } },
    { side: 'teacher', hint: 'tile', text: '上方列按「找補充」，右邊打開面板：一條搜尋，下面是這一科其他老師掛過的縮圖', done: () => !!S.stn.ed.station, run: () => { S.t.screen = 'editor'; S.stn.ed.station = true; S.stn.ed.supp = false; } },
    { side: 'teacher', hint: 'blk', text: '點課文「觀測星星時…」那一段，面板最上面先列「這一段」其他老師掛了什麼', done: () => !!S.flags.stnSelected, run: () => { S.t.screen = 'editor'; S.stn.ed.station = true; S.stn.ed.sel = 'p3'; S.flags.stnSelected = true; } },
    { side: 'teacher', hint: 'eye', text: '點一格開大視窗預覽', done: () => !!S.flags.stnPreviewed, run: () => { S.t.screen = 'editor'; S.stn.ed.station = true; if (!S.stn.ed.sel) S.stn.ed.sel = 'p3'; S.stn.modal = { detail: blockRes(S.stn.ed.sel)[0] }; S.flags.stnPreviewed = true; } },
    { side: 'teacher', hint: 'addblk', text: '按「加進這一段」：掛上去、段落右上角出現角標，同時也進了媒體庫的收藏', done: () => !!S.flags.stnAdded, run: () => { S.t.screen = 'editor'; if (!S.stn.ed.sel) S.stn.ed.sel = 'p3'; const r = blockRes(S.stn.ed.sel).find((x) => !isAdded(x.id)); if (r) addToBlock(r, S.stn.ed.sel); S.stn.modal = null; } },
    { side: 'teacher', hint: () => (!S.stn.ed.lib ? (S.stn.ed.ins == null ? 'gap' : 'lib') : 'libfav'), text: '另一條路：兩段之間的「＋」→ 插入面板 →「媒體庫」。收藏排最上面，點一下就插進課文', done: () => !!S.flags.stnInserted, run: () => { S.t.screen = 'editor'; S.stn.modal = null; const ed = S.stn.ed; if (!ed.lib) { if (ed.ins == null) { ed.sel = null; ed.supp = false; ed.station = false; ed.ins = 3; return; } ed.lib = true; ed.libTab = 'web'; ed.station = false; ed.supp = false; ed.add = false; return; } const r = RES.find((x) => isSaved(x.id) && x.k === 'web'); if (r) insertHere(r); } },
  ],
};
const WHO = { teacher: '老師', student: '學生', admin: '管理員' };
function currentStep() { return STEPS[S.chapter].findIndex((st) => !st.done()); }
const visible = (side) => S.view === side || (S.view === 'split' && side !== 'admin');
function Guide() {
  const list = STEPS[S.chapter], ch = CHAPTERS[S.chapter - 1];
  const cur = currentStep();
  const next = CHAPTERS[S.chapter] && html`<div class="acts"><button class="mini-primary" onClick=${act(() => goChapter(S.chapter + 1))}>接著看「${CHAPTERS[S.chapter].title}」<${Icon} n="arrow-right" s=${12} /></button></div>`;
  if (ch.planned) return html`<aside class="guide" aria-label="流程導覽">
    <div><h2>${ch.title}<span class="plan-tag">規劃中</span></h2><p class="lede">${ch.lede}</p></div>
    <ul class="plan-list">${ch.items.map((x) => html`<li>${x}</li>`)}</ul>
    <a class="plan-link" href="https://claude.ai/artifact/Ljj14sY4eGjfmbM9Tfrjfa" target="_blank" rel="noopener">看形狀夥伴原型<${Icon} n="arrow-up-right" s=${14} /></a>
    <div class="step now" style="grid-template-columns:1fr"><div>${next || html`流程都看完了。<div class="acts"><button class="ghost" onClick=${act(() => resetAll())}><${Icon} n="rotate-ccw" s=${14} />從頭再來</button></div>`}</div></div>
  </aside>`;
  return html`<aside class="guide" aria-label="流程導覽">
    <div><h2>${ch.title}</h2><p class="lede">${ch.lede}</p></div>
    <ol class="steps">${list.map((st, i) => {
      const done = st.done(); const now = i === cur;
      return html`<li class=${'step' + (done ? ' done' : '') + (now ? ' now' : '')}>
        <span class="dot">${done ? html`<${Icon} n="check" s=${13} />` : i + 1}</span>
        <div class="txt"><span class=${'who ' + st.side}>${WHO[st.side]}</span>${st.text}
          ${now && html`<div class="acts">
            ${!visible(st.side) && html`<button class="ghost" onClick=${act(() => { S.view = st.side === 'admin' ? 'admin' : 'split'; })}>切到${st.side === 'admin' ? '管理員' : '老師與學生'}</button>`}
            <button class="mini-primary" onClick=${act(() => { if (!visible(st.side)) S.view = st.side === 'admin' ? 'admin' : 'split'; st.run(); })}><${Icon} n="play" s=${12} />幫我做這一步</button>
          </div>`}
        </div></li>`;
    })}</ol>
    ${cur === -1 && html`<div class="step now" style="grid-template-columns:1fr"><div>${next
      ? html`這段走完了。${next}`
      : html`流程都走完了。<div class="acts"><button class="ghost" onClick=${act(() => resetAll())}><${Icon} n="rotate-ccw" s=${14} />從頭再來</button></div>`}</div></div>`}
    <p class="foot">老師、學生、管理員共用同一份資料：管理員建的帳號、老師的班級設定、上課中的同步，都會即時反映在另一端。除了 12 號陳小宇，其他同學的動作是模擬的。</p>
  </aside>`;
}
function resetAll() { timers.forEach(clearTimeout); timers = []; S = fresh(S.view); }
function goChapter(n) {
  S.chapter = n; S.t.modal = null; S.profile = null; S.admin.modal = null; // 換章收掉上一章開著的視窗
  // 換章時收掉上一章打開的補充資源，不要蓋住下一章的畫面
  S.t.supp = null; S.s.supp = null; if (S.t.pop === 'supp') S.t.pop = null; if (S.s.pop === 'supp') S.s.pop = null;
  if (n === 1 && S.view === 'split' && !S.admin.made501) S.view = 'admin';
  if (n >= 2) { ensureSetup(); if (S.view === 'admin') S.view = 'split'; }
  if (n >= 3 && n <= 5) { if (!S.cls.live) { ensureLive(); toast('teacher', '已開始上課'); } S.t.screen = 'reader'; }
  if (n === 6 && !S.flags.ended) { if (!S.cls.live) { ensureLive(); bonus(ME, 1); toast('teacher', '已開始上課'); } S.t.screen = 'reader'; }
  if (n === 8) { if (S.cls.live) endClass(); S.s.screen = 'shelf'; S.s.end = null; S.s.pop = null; S.view = 'split'; }
  if (n === 9) { if (S.cls.live) endClass(); S.view = 'teacher'; S.t.screen = 'shelf'; S.t.shelfTab = 'hall'; S.t.classView = null; S.t.pop = null; S.stn.modal = null; }
}

/* ───────── 裝置與外框 ───────── */
const DEV = { teacher: ['老師端', `${TEACHER}老師的筆電`], student: ['學生端', '12 號陳小宇的平板'], admin: ['內部後台', '教科書團隊的電腦'] };
function Device({ side }) {
  const ref = useRef();
  const [sc, setSc] = useState(0.5);
  const [hgt, setHgt] = useState(900);
  const [w, setW] = useState(1440);
  useLayoutEffect(() => {
    const el = ref.current;
    const fit = () => { const w = el.clientWidth, hgt = el.clientHeight || 99999; setSc(ROLE ? 1 : Math.max(0.15, Math.min(w / 1440, hgt / 900))); if (ROLE) { STAGE.w = w; STAGE.h = hgt; setW(w); setHgt(hgt); } };
    fit(); const ro = new ResizeObserver(fit); ro.observe(el); return () => ro.disconnect();
  }, []);
  const toasts = S.toasts[side];
  return html`<div class="dev-slot">
    <div class="dev-label"><b>${DEV[side][0]}</b><span>${DEV[side][1]}</span>
      ${side === 'admin' && html`<span class="tag admin">管理員</span>`}
      ${side === 'student' && S.s.inClass && S.cls.live && html`<span class="tag">${locked() ? '被鎖定' : following() ? '跟隨老師' : '自己翻頁'}</span>`}</div>
    <div class="dev-fit" ref=${ref}>
      <div class="dev" style=${{ width: 1440 * sc + 'px', height: 900 * sc + 'px' }}>
        <div class="stage" style=${{ transform: `scale(${sc})`, width: ROLE ? w + 'px' : '1440px', height: ROLE ? hgt + 'px' : '900px' }} onClick=${() => { const P = side === 'admin' ? S.admin : side === 'teacher' ? S.t : S.s; if (P.menu || S.t.cardMenu != null || S.admin.rowMenu) { P.menu = false; S.t.cardMenu = null; S.admin.rowMenu = null; refresh(); } }}>
          ${side === 'teacher' ? html`<${TeacherApp} />` : side === 'student' ? html`<${StudentApp} />` : html`<${AdminApp} />`}
          ${S.cheer && (side === 'teacher' || (side === 'student' && S.s.inClass)) && html`<${Cheer} key=${S.cheer.id} />`}
          <div class="toasts" aria-live="polite">${toasts.map((t) => html`<div class="toast" key=${t.id}>${t.icon && html`<span class=${'t-ic' + (t.icon === 'check' ? ' ok' : '')}><${Icon} n=${t.icon} s=${15} /></span>`}${t.text}</div>`)}</div>
        </div>
      </div>
    </div>
  </div>`;
}
/* ───────── 接上編輯器：狀態存在這台瀏覽器、同一台電腦的視窗互相同步 ─────────
   原本 demo 一個畫面放三端；併進編輯器後每個分頁只當一個人（右上角頭像切換），
   S 仍是全班共用的一份：老師開課、學生加入、派任務都寫在 S，用 BroadcastChannel 傳給其他分頁，
   也存進 localStorage，重新整理不會不見。跨裝置要等正式後端（Ben/Ethan）。 */
const STAGE = { w: typeof window !== 'undefined' ? window.innerWidth : 1440, h: typeof window !== 'undefined' ? window.innerHeight : 900 };
export const setStage = (w, h) => { STAGE.w = w; STAGE.h = h; };

const SAVE_KEY = 'ds-classroom:state';
const chan = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('ds-classroom') : null;
let REMOTE = false;
let version = 0;
const listeners = new Set();
const post = (msg) => { if (!chan) return; try { chan.postMessage(msg); } catch { try { chan.postMessage(JSON.parse(JSON.stringify(msg))); } catch {} } };
let saveTimer = 0;
const save = () => { clearTimeout(saveTimer); saveTimer = setTimeout(() => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch {} }, 300); };
let restored = false;
try {
  const raw = localStorage.getItem(SAVE_KEY);
  if (raw) { const saved = JSON.parse(raw); if (saved && saved.t && saved.s && saved.cls) { S = { ...fresh(), ...saved, toasts: { teacher: [], student: [], admin: [] } }; restored = true; } }
} catch {}
/* 第一次打開：管理員已經建好示範學校、方老師與 501 的學生帳號（demo 的第一章），老師可以直接新增班級 */
if (!restored) { make501(); S.admin.justMade = false; S.admin.schools.forEach((x) => { x.fresh = false; }); S.admin.teachers.forEach((x) => { x.fresh = false; }); S.toasts = { teacher: [], student: [], admin: [] }; }
refresh = () => {
  version += 1;
  listeners.forEach((fn) => fn());
  if (REMOTE) REMOTE = false; else post({ type: 'state', S });
  save();
};
if (chan) {
  chan.onmessage = (e) => {
    const d = e.data;
    if (d && d.type === 'hello') return post({ type: 'state', S });
    if (d && d.type === 'state') { S = { ...d.S, toasts: S.toasts }; REMOTE = true; refresh(); }
  };
  post({ type: 'hello' });
}
if (typeof window !== 'undefined') {
  setInterval(() => { tickTimer(); if (S.timer || (S.task && S.task.status === 'collecting')) { version += 1; listeners.forEach((fn) => fn()); } }, 500);
  window.classroom = { get S() { return S; }, get v() { return version; }, refresh: () => refresh() }; // 測試同步用
}
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
export const getVersion = () => version;
export const getS = () => S;
export function resetClassroom() { timers.forEach(clearTimeout); timers = []; S = fresh(); refresh(); }

/* 頁面上的小提示（toast）：每個分頁只看自己那一端的 */
export function Toasts({ side }) {
  const list = (S.toasts && S.toasts[side]) || [];
  return html`<div class="toasts" aria-live="polite">${list.map((t) => html`<div class="toast" key=${t.id}>${t.icon && html`<span class=${'t-ic' + (t.icon === 'check' ? ' ok' : '')}><${Icon} n=${t.icon} s=${15} /></span>`}${t.text}</div>`)}</div>`;
}

export {
  S as _S, act, toast, later, fresh, pad, ME, TEACHER, TS, SCHOOL, STUDENTS, nameOf,
  TeacherApp, StudentApp, Shelf, AvatarMenu, ProfileDialog, MyClasses, ClassPage, JoinDialog, StudentEdit, RemoveConfirm, AccountCards, ApplyDialog,
  Space, StnDetail, StnEditor, StnStation, ALL_RES, insertHere, isAdded, Accounts, AdminModals, Login, Pick, EndScreen, Invite, ShelfBuddy, Cheer, Companion, Pebble, Icon, ICONS,
  SH, ORDER, EYES, studentLogin, finishPick, ensureSetup, openBook, joinStudent, endToShelf, turn, following, locked, sPage, focusOn, setFollow,
  openSupp, closeSupp, Layer, Toc, ReadSettings, DEFAULT_RS, Rail, Sheet, PAGES as _PAGES_INITIAL, roster, present, scoreOf, timeLeft, TALK, say,
};
