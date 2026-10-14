import type { IconName } from '../assets/icons.generated';

/**
 * 閱讀模式的工具清單。左欄與工具箱面板共用這一份，兩邊的名字與圖示才不會漂移。
 *
 * 只有四個「編輯工具」是真的：畫筆、螢光筆、橡皮擦、清除。
 * 其餘是 Figma 上有、原型還沒做的入口，點了只會提示。
 */

/** 會在頁面上畫東西的工具。null 表示沒選工具，點頁面是逐句聚焦與補充。 */
export type InkTool = 'pen' | 'highlighter' | 'eraser';

/** 可以釘在左欄上的工具。清除不是「模式」，按一下就做完，但它跟筆放在同一組。 */
export type RailTool = InkTool | 'clear';

export const RAIL_TOOLS: RailTool[] = ['pen', 'highlighter', 'eraser', 'clear'];

export const RAIL_TOOL_META: Record<RailTool, { label: string; icon: IconName }> = {
  pen: { label: '畫筆', icon: 'pencil' },
  highlighter: { label: '螢光筆', icon: 'highlighter' },
  eraser: { label: '橡皮擦', icon: 'eraser' },
  clear: { label: '清除', icon: 'trash' },
};

export type ToolboxItem = {
  id: string;
  label: string;
  icon: IconName;
  /** 對應到左欄的真工具；沒有的就是還沒做的殼 */
  rail?: RailTool;
};

export type ToolboxSection = { title: string; items: ToolboxItem[] };

/** 照 Figma「品樂_學生版閱讀模式」的分組與順序。Figma 裡藏起來的（放大、選號器、AI 搜尋）不放。 */
export const TOOLBOX_SECTIONS: ToolboxSection[] = [
  { title: '系統工具', items: [{ id: 'settings', label: '設定', icon: 'settings' }] },
  {
    title: '編輯工具',
    items: [
      { id: 'pen', label: '畫筆', icon: 'pencil', rail: 'pen' },
      { id: 'highlighter', label: '螢光筆', icon: 'highlighter', rail: 'highlighter' },
      { id: 'eraser', label: '橡皮擦', icon: 'eraser', rail: 'eraser' },
      { id: 'clear', label: '清除', icon: 'trash', rail: 'clear' },
      { id: 'sticky', label: '便利貼', icon: 'sticky-note' },
    ],
  },
  {
    title: '教學工具',
    items: [
      { id: 'board', label: '白板', icon: 'presentation' },
      { id: 'sticker', label: '貼紙', icon: 'sticker' },
    ],
  },
  {
    title: '科目工具',
    items: [
      { id: 'quiz', label: '考數院', icon: 'list-checks' },
      { id: 'explore', label: '探索', icon: 'compass' },
      { id: 'orbit', label: '星際巡航', icon: 'orbit' },
      // Figma 這四顆都還是 plus-minus 的佔位圖示，照放
      { id: 'ruler', label: '直尺', icon: 'diff' },
      { id: 'compass', label: '圓規', icon: 'diff' },
      { id: 'protractor', label: '量角器', icon: 'diff' },
      { id: 'interactive', label: '互動學習', icon: 'diff' },
    ],
  },
];

const RAIL_KEY = 'ds-reader:rail';

/** 左欄釘了哪些工具。預設四個都在；學生從工具箱拿掉或加回來會記住。 */
export function loadPinned(): RailTool[] {
  try {
    const raw = localStorage.getItem(RAIL_KEY);
    if (!raw) return RAIL_TOOLS;
    const list = JSON.parse(raw) as unknown;
    if (!Array.isArray(list)) return RAIL_TOOLS;
    // 照固定順序排，不照學生加回來的順序，左欄的位置才穩定
    return RAIL_TOOLS.filter((t) => list.includes(t));
  } catch {
    return RAIL_TOOLS;
  }
}

export function savePinned(list: RailTool[]): void {
  try {
    localStorage.setItem(RAIL_KEY, JSON.stringify(list));
  } catch {
    // 隱私模式或空間滿了：記不住就算了，不影響使用
  }
}
