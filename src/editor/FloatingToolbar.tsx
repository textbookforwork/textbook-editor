import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Dropdown } from './Dropdown';
import { Icon } from '../components/Icon';
import { useEditorCtx } from './EditorContext';
import { ShapeTools, LineTools } from './ShapeTools';
import { findBlock } from '../model/document';
import { sliceSpans } from '../model/spans';
import { PICKABLE_ROLES, ROLE_LABEL, canHavePopup } from '../model/registry';
import { BlockTextTools, InlineTextTools } from './TextPanel';
import { setTablePanel, useTableSelection } from './TablePanel';
import { useEditingWebBlockId, setEditingWebBlockId } from '../components/blocks/WebBlockView';
import type { TextRole } from '../model/types';
import { useParagraphIndex } from '../components/ParagraphContext';
import { pickFile, putFile } from './assets';
import { setCroppingId, useCroppingId } from '../components/blocks/ImageCropper';

/**
 * 浮動膠囊。
 *
 * 兩種狀態，永遠只出現一個：
 *   選了字   → 行內標記（標記、字體、粗體、注音、底線、刪除線、上線、顏色、掛補充）
 *   選了元件 → 這個元件能改的事（文字角色與字級對齊方向、圖片尺寸、換頁、刪除）
 * 文字那幾顆的實作在 TextPanel.tsx。
 *
 * 用 portal 掛到 body：頁面本身是被 transform: scale() 縮放過的，
 * 膠囊留在裡面會跟著縮，字會變小、觸控目標會不夠大。
 */
export function FloatingToolbar() {
  const ed = useEditorCtx();
  const inline = ed?.inlineSelection ?? null;
  const blockId = ed?.selectedBlockId ?? null;

  if (!ed) return null;
  if (inline) return <InlineCapsule key="inline" />;
  if (blockId) return <BlockCapsule key={blockId} />;
  return null;
}

/** 行內標記。位置跟著選取範圍，選取一動就要重算。 */
function InlineCapsule() {
  const ed = useEditorCtx()!;
  const sel = ed.inlineSelection!;
  const rect = useSelectionRect();

  const hit = findBlock(ed.doc, sel.blockId);
  if (!hit || hit.block.type !== 'text' || !rect) return null;

  const offset = sel.slice?.start ?? 0;
  const start = sel.range.start + offset;
  const end = sel.range.end + offset;
  const picked = sliceSpans(hit.block.spans, start, end);
  // 「整段都已經是」才算開著——半段是的時候按下去應該是全部套上
  const allBold = picked.length > 0 && picked.every((s) => s.bold);

  return (
    <Capsule
      style={anchor(rect)}
      /* 按膠囊時不要讓編輯區失去游標，否則選取一消失膠囊就收掉。
         色票、字體、補充的選單是 portal，pointer 事件仍會沿 React 樹冒上來，
         選單裡真的要焦點的控制項會自己 stopPropagation（見 TextPanel 的 Popover） */
      onPointerDown={(e) => e.preventDefault()}
    >
      {/* 標記（課文段落才有）、字體，接著粗體、注音、底線、刪除線、上線、顏色、掛補充 */}
      <InlineTextTools
        block={hit.block}
        blockId={sel.blockId}
        start={start}
        end={end}
        afterFont={
          <Btn
            $on={allBold}
            onClick={() => ed.toggleMark(sel.blockId, sel.range, 'bold', !allBold, sel.slice)}
            title="粗體"
          >
            <Icon name="bold" size={20} label="粗體" />
          </Btn>
        }
      />
    </Capsule>
  );
}

/** 元件能改的事。位置跟著元件的外框。 */
function BlockCapsule() {
  const ed = useEditorCtx()!;
  const id = ed.selectedBlockId!;
  const rect = useAnchorRect(`[data-block-id="${CSS.escape(id)}"]`, ed.doc);
  const tableUi = useTableSelection();
  const croppingId = useCroppingId();
  const editingWebId = useEditingWebBlockId();
  const paraIndex = useParagraphIndex();

  const hit = findBlock(ed.doc, id);
  if (!hit || !rect) return null;
  const { block, row } = hit;
  const paraNo = paraIndex.get(id)?.no ?? null;

  return (
    <Capsule
      style={anchor(rect)}
      /*
        按膠囊時不要讓編輯區失去游標——但下拉選單要例外。
        preventDefault 會一併擋掉原生 <select> 的展開（它是靠
        pointerdown 的預設行為打開的），結果整個角色選單點不開。
      */
      onPointerDown={(e) => {
        // 字級欄要打字，跟下拉一樣不能擋
        if (!(e.target as HTMLElement).closest('select, input')) e.preventDefault();
      }}
    >
      {block.type === 'text' && (
        <>
          {/*
            層級：章、節、內文、段落、補充。段落就是內文再加上「這是課文的第幾段」，
            編號依標成段落的順序自動算（第 N 段）
          */}
          <Dropdown
            variant="tool"
            value={
              block.paragraph
                ? 'para'
                : PICKABLE_ROLES.includes(block.role)
                  ? block.role
                  : block.role === 'itemTitle' || block.role === 'subItemTitle'
                    ? 'sectionTitle'
                    : block.role === 'lead'
                      ? 'body'
                      : 'supplement'
            }
            aria-label="內容層級"
            options={[
              ...PICKABLE_ROLES.filter((r) => r !== 'supplement').map((r) => ({ value: r, label: ROLE_LABEL[r] })),
              { value: 'para', label: '段落', short: paraNo ? `第 ${paraNo} 段` : '段落' },
              ...(PICKABLE_ROLES.includes('supplement') ? [{ value: 'supplement', label: ROLE_LABEL.supplement }] : []),
            ]}
            onChange={(v) => {
              const para = v === 'para' ? ('start' as const) : undefined;
              const role = (para ? 'body' : v) as TextRole;
              if (role !== block.role) ed.dispatch({ type: 'setTextRole', blockId: id, role });
              if (para !== block.paragraph)
                ed.dispatch({ type: 'patchBlock', blockId: id, blockType: 'text', patch: { paragraph: para } });
            }}
          />
          <BlockTextTools block={block} blockId={id} settings={ed.doc.settings} />
          <Divider />
        </>
      )}

      {/* 圖形樣式（形狀、填色、邊框、粗細、透明度）直接在膠囊上控制 */}
      {block.type === 'shape' && (
        <>
          <ShapeTools block={block} blockId={id} />
          <Divider />
        </>
      )}

      {/* 線段樣式（顏色、粗細、實線/虛線、起終點端點、透明度）直接在膠囊上控制 */}
      {block.type === 'line' && (
        <>
          <LineTools block={block} blockId={id} />
          <Divider />
        </>
      )}

      {/* 圖片：裁切（有圖才有） */}
      {block.type === 'image' && block.assetId && (
        <Btn $on={croppingId === id} onClick={() => setCroppingId(croppingId === id ? null : id)} $icon title="裁切圖片">
          <Icon name="crop" size={20} label="裁切" />
        </Btn>
      )}

      {/* 圖片：在浮動上方列選擇要不要圖說 */}
      {block.type === 'image' && (
        <Btn
          $on={block.hasCaption ?? (block.caption.trim().length > 0)}
          onClick={() => {
            const current = block.hasCaption ?? (block.caption.trim().length > 0);
            ed.dispatch({
              type: 'patchBlock',
              blockId: id,
              blockType: 'image',
              patch: { hasCaption: !current },
            });
            // 打開圖說就直接進入輸入：等圖說那一行畫出來再把游標放進去
            if (!current) {
              let tries = 0;
              const focus = () => {
                const el = document.querySelector<HTMLElement>(
                  `[data-block-id="${id}"] figcaption[contenteditable="true"]`
                );
                if (el) {
                  el.focus();
                  const sel = window.getSelection();
                  sel?.selectAllChildren(el);
                  sel?.collapseToEnd();
                } else if (++tries < 10) requestAnimationFrame(focus);
              };
              requestAnimationFrame(focus);
            }
          }}
          title={block.hasCaption ?? (block.caption.trim().length > 0) ? '關閉圖說' : '開啟圖說'}
          $icon
        >
          <Icon name="file-text" size={20} label="圖說" />
        </Btn>
      )}

      {/* 尺寸只靠拖外框調，膠囊上不放「回到預設尺寸」 */}

      {/* 表格的樣式（快速樣式、格子底色、框線）在側邊面板，膠囊上只留開關 */}
      {block.type === 'table' && (
        <Btn $open={tableUi.panel} onClick={() => setTablePanel(!tableUi.panel)} title="表格樣式">
          表格
          <Icon name="table" size={20} />
        </Btn>
      )}

      {/* PDF：翻到要給學生看的那一頁（就是學生打開時的起始頁），與更換檔案 */}
      {block.type === 'pdf' && block.assetId && (
        <>
          <Btn
            onClick={() =>
              ed.dispatch({ type: 'patchBlock', blockId: id, blockType: 'pdf', patch: { page: Math.max(1, (block.page ?? 1) - 1) } })
            }
            disabled={(block.page ?? 1) <= 1}
            title="上一頁"
            aria-label="上一頁"
          >
            <Icon name="chevron-left" size={20} />
          </Btn>
          <PageNum>第 {block.page ?? 1} 頁</PageNum>
          <Btn
            onClick={() =>
              ed.dispatch({ type: 'patchBlock', blockId: id, blockType: 'pdf', patch: { page: (block.page ?? 1) + 1 } })
            }
            title="下一頁"
            aria-label="下一頁"
          >
            <Icon name="chevron-right" size={20} />
          </Btn>
          <Btn
            onClick={async () => {
              const file = await pickFile('application/pdf');
              if (!file) return;
              ed.dispatch({ type: 'patchBlock', blockId: id, blockType: 'pdf', patch: { assetId: putFile(file), title: file.name, page: 1 } });
            }}
            title="更換 PDF 檔案"
            $icon
          >
            <Icon name="upload" size={20} label="更換 PDF 檔案" />
          </Btn>
        </>
      )}

      {/* 聲音：已經有檔案時，換檔在這裡（元件本身只放播放鍵與檔名） */}
      {block.type === 'audio' && block.assetId && (
        <Btn
          onClick={async () => {
            const file = await pickFile('audio/*');
            if (!file) return;
            ed.dispatch({ type: 'patchBlock', blockId: id, blockType: 'audio', patch: { assetId: putFile(file), title: file.name } });
          }}
          title="更換音檔"
          $icon
        >
          <Icon name="upload" size={20} label="更換音檔" />
        </Btn>
      )}

      {/* 網頁：「更改網址」只放圖示（跟 PDF、聲音的換檔一樣，膠囊上換內容的動作都是一顆圖示），後接「標籤」與「內嵌」 */}
      {block.type === 'web' && (
        <>
          <Btn
            $on={editingWebId === id}
            onClick={() => {
              if (block.chosen === false) {
                ed.dispatch({
                  type: 'patchBlock',
                  blockId: id,
                  blockType: 'web',
                  patch: { chosen: true },
                });
              }
              setEditingWebBlockId(editingWebId === id ? null : id);
            }}
            title="更改網址"
            $icon
          >
            <Icon name="link" size={20} label="更改網址" />
          </Btn>
          <Btn
            $on={block.chosen !== false && block.presentation === 'bookmark'}
            onClick={() => {
              setEditingWebBlockId(null);
              ed.dispatch({
                type: 'patchBlock',
                blockId: id,
                blockType: 'web',
                // 直排不給比例：標籤卡片是橫的，比例套在直的那一軸會變細條（見 blockSizing）
                patch: {
                  presentation: 'bookmark',
                  chosen: true,
                  widthPct: ed.doc.settings.writingMode === 'vertical' ? undefined : 100 / 3,
                  blockSize: undefined,
                },
              });
            }}
            title="以插入標籤呈現"
          >
            標籤
          </Btn>
          <Btn
            $on={block.chosen !== false && block.presentation === 'embed'}
            onClick={() => {
              setEditingWebBlockId(null);
              ed.dispatch({
                type: 'patchBlock',
                blockId: id,
                blockType: 'web',
                patch: { presentation: 'embed', chosen: true, widthPct: 100, blockSize: undefined },
              });
            }}
            title="以內嵌網頁呈現"
          >
            內嵌
          </Btn>
        </>
      )}

      {/* 前面有這種元件自己的工具時，跟後面的補充、遮住、換頁、刪除用一條線隔開（文字、圖形、線段在自己那段後面已經畫了） */}
      {(block.type === 'image' ||
        block.type === 'table' ||
        block.type === 'web' ||
        ((block.type === 'pdf' || block.type === 'audio') && !!block.assetId)) && <Divider />}

      {/* Pop-up 是元件的屬性不是另一種元件，所以入口在元件的膠囊上，
          不在插入選單裡。影片／聲音／網頁本身就有互動，不能再掛 */}
      {canHavePopup(block.type) && (
        <Btn
          $on={block.popups.length > 0}
          onClick={() => ed.openPopupPanel(id)}
          title="新增補充資源"
          $icon
        >
          <Icon name="blocks" size={20} label="新增補充資源" />
        </Btn>
      )}

      {/* 遮住：閱讀時原地蓋住，點了才顯示（取代現行網站的「點擊後消失／出現」） */}
      <Btn
        $on={!!block.masked}
        onClick={() =>
          ed.dispatch({
            type: 'patchBlock',
            blockId: id,
            blockType: block.type,
            patch: { masked: block.masked ? undefined : true },
          })
        }
        title="遮住：點擊後出現"
        aria-pressed={!!block.masked}
        $icon
      >
        <Icon name="eye-off" size={20} label="遮住：點擊後出現" />
      </Btn>

      {/* 手動換頁線的位置固定，不隨內容移動——這是老師的決定 */}
      <Btn
        $on={row.breakBefore}
        onClick={() =>
          ed.dispatch({ type: 'setBreakBefore', rowId: row.id, value: !row.breakBefore })
        }
        title={row.breakBefore ? '取消這裡的換頁' : '從這一列開始換到新的一頁'}
        $icon
      >
        {/* 只留圖示（跟補充鈕一樣）；換過頁靠按鈕的啟用色看出來 */}
        <Icon name="page-break" size={20} label={row.breakBefore ? '取消換頁' : '換頁'} />
      </Btn>

      {/* 刪的是這個元件。它是這一列唯一的東西時列會一起消失，不留空殼 */}
      <Btn
        onClick={() => {
          ed.dispatch({ type: 'deleteBlock', blockId: id });
          ed.select(null);
        }}
        title="刪除"
        $icon
      >
        <Icon name="trash" size={20} label="刪除" />
      </Btn>
    </Capsule>
  );
}

/** 選取範圍的位置。選取變動與捲動都要重算。 */
function useSelectionRect(): DOMRect | null {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    const read = () => {
      if (document.activeElement?.closest('[data-text-popover]')) return;
      const s = document.getSelection();
      if (!s || s.rangeCount === 0 || s.isCollapsed) return;
      setRect(s.getRangeAt(0).getBoundingClientRect());
    };
    read();
    document.addEventListener('selectionchange', read);
    window.addEventListener('scroll', read, true);
    window.addEventListener('resize', read);
    return () => {
      document.removeEventListener('selectionchange', read);
      window.removeEventListener('scroll', read, true);
      window.removeEventListener('resize', read);
    };
  }, []);

  return rect;
}

/**
 * 某個元素的位置。
 *
 * doc 進相依是因為改了設定或內容之後版面會重排，元件位置跟著變，
 * 膠囊若不重量就會停在舊的地方。
 */
function useAnchorRect(selector: string, dep: unknown): DOMRect | null {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const raf = useRef(0);

  useLayoutEffect(() => {
    const read = () => {
      const el = document.querySelector(selector);
      // 重排還沒完成時量到的是舊位置，下一幀再量一次
      if (el) setRect(el.getBoundingClientRect());
    };
    read();
    raf.current = requestAnimationFrame(read);
    window.addEventListener('scroll', read, true);
    window.addEventListener('resize', read);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('scroll', read, true);
      window.removeEventListener('resize', read);
    };
  }, [selector, dep]);

  return rect;
}

/** 貼在目標上方置中，並且夾在視窗裡——貼齊頁緣的元件不能把膠囊推出畫面。 */
function anchor(rect: DOMRect): React.CSSProperties {
  const GAP = 12;
  const HALF = 160;
  const left = Math.min(
    Math.max(rect.left + rect.width / 2, HALF + 8),
    window.innerWidth - HALF - 8
  );
  // 上面塞不下就翻到下面
  const above = rect.top > 72;
  return {
    left,
    top: above ? rect.top - GAP : rect.bottom + GAP,
    transform: above ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
  };
}

/** 膠囊本體。掛在 body，所以不受頁面縮放影響。 */
function Capsule({ children, ...rest }: React.ComponentProps<typeof Shell>) {
  const [host] = useState(() => document.body);
  const ref = useRef<HTMLDivElement>(null);
  // 膠囊寬度依元件種類從三百多到九百多，anchor() 只能用估的。畫出來之後量真的寬度，
  // 超出視窗左右就往內推（直排時元件常貼在頁面右緣，整條膠囊會被切掉一半）
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.marginLeft = '0px';
    const r = el.getBoundingClientRect();
    const EDGE = 8;
    const shift =
      r.right > window.innerWidth - EDGE
        ? window.innerWidth - EDGE - r.right
        : r.left < EDGE
          ? EDGE - r.left
          : 0;
    el.style.marginLeft = `${shift}px`;
  });
  return createPortal(<Shell ref={ref} {...rest}>{children}</Shell>, host);
}

const Shell = styled.div`
  position: fixed;
  z-index: 900;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  box-shadow: ${(p) => p.theme.shadow.card};
  /* 整條工具列一個字級：跟「內文」「18」那幾顆下拉（Dropdown）同為 14px，裡面的按鈕都繼承這裡 */
  font-size: ${(p) => p.theme.typography.bodySmSize};
  white-space: nowrap;
  width: max-content;
`;

const Btn = styled.button<{ $on?: boolean; $open?: boolean; $icon?: boolean }>`
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
  ${(p) => p.$icon && 'justify-content: center; inline-size: 36px; padding: 0;'}
  /* $on＝開／關切換已開啟（灰，比滑過深一階；不用黃，黃色在畫面上太多）；$open＝這顆打開的選單還開著（淡灰，跟下拉一致） */
  background: ${(p) => (p.$on ? p.theme.surface.muted : p.$open ? p.theme.surface.sunken : 'transparent')};
  color: ${(p) => (p.$on || p.$open ? p.theme.text.primary : p.theme.text.secondary)};

  &:hover {
    background: ${(p) => (p.$on ? p.theme.surface.muted : p.theme.surface.sunken)};
  }
`;

const PageNum = styled.span`
  flex: none;
  padding: 0 2px;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: ${(p) => p.theme.text.secondary};
`;

const Divider = styled.span`
  inline-size: 1px;
  block-size: 20px;
  margin-inline: 4px;
  flex-shrink: 0;
  background: ${(p) => p.theme.border.subtle};
`;
