import { newId } from './ids';
import type { Block } from './types';

/**
 * 複製貼上的元件。
 *
 * 貼上的是一份**帶著樣式的複本**：圖片的尺寸、文字的角色與行內標記、
 * 掛著的補充全部跟著走——這就是「格式刷」要的效果：調好一個，
 * 複製貼上，不必每個重設。
 *
 * 位置不在複本裡：版面沒有座標，貼上的落點是「目前選取的那一段之後」，
 * 由呼叫端決定。
 */
export function cloneBlock(block: Block): Block {
  const copy = structuredClone(block);
  copy.id = newId('blk');
  copy.popups = copy.popups.map((p) => ({ ...p, id: newId('pop') }));
  return copy;
}

/**
 * 剪貼簿只活在這一次的分頁裡。
 *
 * 不走系統剪貼簿：那裡放的是文字，元件會被壓成純文字，貼回來樣式就沒了。
 * 跨分頁複製是之後接儲存才有意義的事。
 */
let held: Block | null = null;

export const copyBlock = (block: Block) => {
  held = structuredClone(block);
};

export const pasteBlock = (): Block | null => (held ? cloneBlock(held) : null);

export const hasClipboard = () => held !== null;

