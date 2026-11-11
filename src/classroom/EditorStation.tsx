import { useEffect } from 'react';
import { useEditorCtx } from '../editor/EditorContext';
import { findBlock } from '../model/document';
import { areaOf } from '../model/subjects';
import { newId } from '../model/ids';
import { putFile, putLink } from '../editor/assets';
import type { Block, PopupItem } from '../model/types';
import { CrStage, useClassroom } from './ClassReader';
import { BRIDGE } from './bridgeSlot.js';
import * as L from './legacy.js';

/* 補給站的一則資源（legacy 的 ALL_RES） */
type Res = { id: string; k: 'web' | 'video' | 'image' | 'audio' | 'text'; t: string; url?: string; src?: string; body?: string; embed?: boolean };

/** 資源的圖、聲音檔抓下來放進媒體庫，拿到 assetId 才能掛成補充 */
async function toAsset(src: string, name: string): Promise<string | null> {
  try {
    const res = await fetch(src);
    const blob = await res.blob();
    return putFile(new File([blob], name, { type: blob.type }));
  } catch {
    return null;
  }
}

async function popupOf(r: Res): Promise<PopupItem | null> {
  const id = newId('pop');
  if (r.k === 'web') return { id, kind: 'web', title: r.t, url: r.url ?? '', embeddable: !!r.embed } as PopupItem;
  if (r.k === 'text') return { id, kind: 'text', title: r.t, body: r.body ?? '' };
  if (r.k === 'audio') return { id, kind: 'audio', title: r.t, assetId: await toAsset(r.src ?? 'assets/vega.mp3', `${r.t}.mp3`) };
  // 圖片、影片（補給站的影片示範只有封面圖）：掛成圖片
  return { id, kind: 'image', title: r.t, assetId: r.src ? await toAsset(r.src, `${r.t}.jpg`) : null };
}

async function blockOf(r: Res): Promise<Block> {
  const id = newId('blk');
  if (r.k === 'web') {
    putLink(r.url ?? '', r.t);
    return { id, type: 'web', url: r.url ?? '', title: r.t, presentation: 'bookmark', widthPct: 50, popups: [] } as Block;
  }
  if (r.k === 'audio') return { id, type: 'audio', assetId: await toAsset(r.src ?? 'assets/vega.mp3', `${r.t}.mp3`), title: r.t, widthPct: 200 / 9, popups: [] } as Block;
  if (r.k === 'text') return { id, type: 'text', role: 'body', spans: [{ text: r.body ?? r.t }], popups: [] } as unknown as Block;
  const assetId = r.src ? await toAsset(r.src, `${r.t}.jpg`) : null;
  return { id, type: 'image', assetId, alt: r.t, caption: r.t, hasCaption: true, aspectRatio: 1.5, widthPct: 50, popups: [] } as Block;
}

/**
 * 編輯器的「找補充」：補給站（其他老師分享的補充資源）在右側面板，
 * 點一張開大視窗預覽；選著一個元件時可以「掛上這個元件」（變成那個元件的補充），也可以「插進課文」。
 * 原本是課堂 demo 裡的假編輯器做的，2026-11-11 接到真的編輯器。
 */
export function EditorStation({ open, onClose }: { open: boolean; onClose: () => void }) {
  useClassroom();
  const ed = useEditorCtx();
  const S = L.getS();

  useEffect(() => {
    S.stn.ed.station = open;
    L.act(() => {})();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!ed) return null;
  BRIDGE.stationSel = () => {
    const id = ed.selectedBlockId;
    if (!id) return null;
    const hit = findBlock(ed.doc, id);
    return hit ? { id, text: hit.block.type === 'text' ? hit.block.spans.map((s) => s.text).join('') : '' } : null;
  };
  BRIDGE.stationClose = onClose;
  BRIDGE.stationAttach = async (r: Res, blockId: string) => {
    const item = await popupOf(r);
    if (item) ed.dispatch({ type: 'addPopup', blockId, item });
  };
  BRIDGE.stationInsert = async (r: Res) => {
    const block = await blockOf(r);
    const sel = ed.selectedBlockId;
    const at = sel ? ed.doc.rows.findIndex((row) => row.columns.some((c) => c.blocks.some((b) => b.id === sel))) + 1 : ed.doc.rows.length;
    ed.dispatch({ type: 'insertRow', index: Math.max(0, at), blocks: [block] });
    ed.select(block.id);
  };
  BRIDGE.stationSubject = () => areaOf(ed.doc.meta.subject) ?? ed.doc.meta.subject;

  if (!open && !(S.stn.modal && S.stn.modal.detail)) return null;
  return (
    <div className="cr cr-overlay cr-station">
      <div className="stage">
        {open && <L.StnStation />}
        {S.stn.modal && S.stn.modal.detail && <L.StnDetail r={S.stn.modal.detail} />}
        <L.Toasts side="teacher" />
      </div>
    </div>
  );
}

export { CrStage };
