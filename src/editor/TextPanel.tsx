import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { customSwatchCss, swatchCss, swatchRowCss } from './swatch';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { useEditorCtx } from './EditorContext';
import { Dropdown } from './Dropdown';
import { hasAllRuby, lengthOf, markSpans, sliceSpans, toggleRubySpans, type SpanMarks } from '../model/spans';
import { wordGroupPopups } from '../model/popups';
import { RANGE_KINDS, rangeKindOf } from '../model/paragraphs';
import { newId } from '../model/ids';
import type { RangeKind } from '../model/types';
import { defaultLineHeight, defaultSizeOf, FONT_SIZES, INLINE_FONTS, LINE_HEIGHTS } from '../styles/roles';
import type { DocSettings, InlineSpan, TextBlock } from '../model/types';

/**
 * 文字的工具。兩組，分別掛在浮動膠囊的兩種狀態裡（見 FloatingToolbar）：
 *
 *   InlineTextTools  選了幾個字 → 注音、底線、刪除線、上線、顏色、字體、掛補充
 *   BlockTextTools   選了整段   → 字級、對齊、注音、直排／橫排切換、框高
 *
 * 行內樣式走 setSpans：把選取區間切出來、套上標記、再接回原文（markSpans），
 * 跟打字寫回原文是同一條路。段落屬性走 patchBlock。
 *
 * 色票與字體的選單用 portal 掛到 body（跟當頁背景同一套做法）：
 * 膠囊本身已經在頁面之外，選單再往外一層，才不會被頁面的縮放與裁切吃掉。
 */

type InlineProps = {
  block: TextBlock;
  blockId: string;
  /** 選取範圍在原文裡的字元位置（跨頁的片段已經加回起點）。 */
  start: number;
  end: number;
  /** 接在字體後面的按鈕（粗體）。粗體走編輯器的 toggleMark，不在這裡。 */
  afterFont?: ReactNode;
};

export function InlineTextTools({ block, blockId, start, end, afterFont }: InlineProps) {
  const ed = useEditorCtx()!;
  const picked = sliceSpans(block.spans, start, end);
  const [open, setOpen] = useState<'color' | 'font' | 'kind' | null>(null);

  // 「整段都已經是」才算開著——半段是的時候按下去應該是全部套上
  const all = (f: 'underline' | 'strike' | 'overline') =>
    picked.length > 0 && picked.every((s) => s[f]);
  // 整段同一個值才顯示在按鈕上；混著的時候不顯示，免得誤導
  const uniform = <K extends keyof InlineSpan>(key: K): InlineSpan[K] | undefined => {
    const first = picked[0]?.[key];
    return picked.length > 0 && picked.every((s) => s[key] === first) ? first : undefined;
  };

  const apply = (patch: Partial<SpanMarks>) => {
    ed.dispatch({ type: 'setSpans', blockId, spans: markSpans(block.spans, start, end, patch) });
  };
  const toggle = (mark: 'underline' | 'strike' | 'overline') => apply({ [mark]: !all(mark) });

  const color = uniform('color');
  const font = uniform('fontFamily');
  const popupId = uniform('popupId');
  const noteId = uniform('noteId');
  const note = noteId ? block.rangeNotes?.find((n) => n.id === noteId) ?? null : null;
  const rangeKind = note ? RANGE_KINDS.find((k) => k.key === rangeKindOf(note)) : undefined;
  const rubyOn = hasAllRuby(picked);
  // 這幾個字有沒有掛補充：有就跟注音一樣亮灰底，不在按鈕上寫掛了什麼
  const linked = popupId ? wordGroupPopups(block, popupId).length > 0 : false;

  const colorRef = useRef<HTMLButtonElement>(null);
  const fontRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLInputElement>(null);

  const kindRef = useRef<HTMLButtonElement>(null);
  /** 標成某一種：還沒標就新開一則；標過就換種類 */
  const markKind = (k: RangeKind) => {
    const notes = block.rangeNotes ?? [];
    if (note) {
      ed.dispatch({
        type: 'patchBlock',
        blockId,
        blockType: 'text',
        patch: { rangeNotes: notes.map((n) => (n.id === note.id ? { ...n, kind: k } : n)) },
      });
    } else {
      const id = newId('note');
      ed.dispatch({ type: 'patchBlock', blockId, blockType: 'text', patch: { rangeNotes: [...notes, { id, kind: k, body: '' }] } });
      apply({ noteId: id });
    }
    setOpen(null);
  };
  /** 取消標記：字上的標記與說明內容一起清 */
  const unmark = () => {
    if (!note) return;
    ed.dispatch({
      type: 'patchBlock',
      blockId,
      blockType: 'text',
      patch: { rangeNotes: (block.rangeNotes ?? []).filter((n) => n.id !== note.id) },
    });
    ed.dispatch({ type: 'setSpans', blockId, spans: block.spans.map((x) => (x.noteId === note.id ? { ...x, noteId: undefined } : x)) });
    setOpen(null);
  };

  const customColor = color && !SWATCHES.some((s) => s.value === color) ? color : null;

  return (
    <>
      {/* 課文段落裡選的字：先標成生字詞或句子，再按補充填內容。標了的字閱讀時側邊有點點線 */}
      {block.paragraph && (
        <>
          <ToolBtn ref={kindRef} $open={open === 'kind'} onClick={() => setOpen(open === 'kind' ? null : 'kind')} title="標記成生字詞或句子">
            {rangeKind ? rangeKind.name : '標記'}
            <Icon name="chevron-down" size={16} />
          </ToolBtn>
          {open === 'kind' && (
            <Popover anchor={kindRef.current} label="標記" onClose={() => setOpen(null)}>
              <Menu>
                {RANGE_KINDS.map((k) => (
                  <MenuItem key={k.key} type="button" $on={rangeKind?.key === k.key} onClick={() => markKind(k.key)}>
                    {k.name}
                  </MenuItem>
                ))}
                {note && (
                  <MenuItem type="button" onClick={unmark}>
                    取消標記
                    <Icon name="x" size={16} />
                  </MenuItem>
                )}
              </Menu>
            </Popover>
          )}
        </>
      )}


      <ToolBtn
        ref={fontRef}
        $open={open === 'font'}
        onClick={() => setOpen(open === 'font' ? null : 'font')}
        title="字體"
      >
        {INLINE_FONTS.find((f) => f.value === (font ?? null))?.label ?? '字體'}
        <Icon name="chevron-down" size={16} />
      </ToolBtn>
      {open === 'font' && (
        <Popover anchor={fontRef.current} label="字體" onClose={() => setOpen(null)}>
          <Menu>
            {INLINE_FONTS.map((f) => (
              <MenuItem
                key={f.label}
                type="button"
                $on={(font ?? null) === f.value}
                style={f.value ? { fontFamily: f.value } : undefined}
                onClick={() => {
                  apply({ fontFamily: f.value ?? undefined });
                  setOpen(null);
                }}
              >
                {f.label}
              </MenuItem>
            ))}
          </Menu>
        </Popover>
      )}

      {afterFont}

      {/* 注音：按下去直接轉換並標上注音，不需彈出輸入框；全部有注音時再按一次清除 */}
      <ToolBtn
        $on={rubyOn}
        onClick={() =>
          ed.dispatch({
            type: 'setSpans',
            blockId,
            spans: toggleRubySpans(block.spans, start, end),
          })
        }
        title={rubyOn ? '取消注音' : '加上注音'}
      >
        注
      </ToolBtn>

      <ToolBtn $iconOnly $on={all('underline')} onClick={() => toggle('underline')} title="底線">
        <Icon name="underline" size={20} label="底線" />
      </ToolBtn>
      <ToolBtn $iconOnly $on={all('strike')} onClick={() => toggle('strike')} title="刪除線">
        <Icon name="strikethrough" size={20} label="刪除線" />
      </ToolBtn>
      <ToolBtn $iconOnly $on={all('overline')} onClick={() => toggle('overline')} title="上線（線段 AB）">
        <Icon name="overline" size={20} label="上線" />
      </ToolBtn>

      <ToolBtn
        ref={colorRef}
        $iconOnly
        $open={open === 'color'}
        onClick={() => setOpen(open === 'color' ? null : 'color')}
        title="文字顏色"
        aria-label="文字顏色"
      >
        <ColorCircle style={{ background: color ? cssColor(color) : 'var(--ds-text-primary)' }} />
      </ToolBtn>
      {open === 'color' && (
        <Popover anchor={colorRef.current} label="文字顏色" onClose={() => setOpen(null)}>
          <SwatchRow>
            {SWATCHES.map((s) => (
              <Swatch
                key={s.label}
                type="button"
                title={s.label}
                $on={(color ?? null) === s.value}
                style={{ background: s.value ? cssColor(s.value) : 'var(--ds-surface-raised)' }}
                onClick={() => apply({ color: s.value ?? undefined })}
              >
                {!s.value && <Icon name="x" size={16} />}
              </Swatch>
            ))}
            {/* 最後一格是選色器（跟當頁背景同一套）。選過的自訂色就留在這一格上 */}
            <Custom
              type="button"
              title="自訂顏色"
              $on={!!customColor}
              style={customColor ? { background: customColor } : undefined}
              onClick={() => pickerRef.current?.click()}
            >
              {!customColor && <Icon name="plus" size={16} />}
              <input
                ref={pickerRef}
                type="color"
                value={customColor ?? '#1a1917'}
                onChange={(e) => apply({ color: e.target.value })}
                aria-label="自訂顏色"
                tabIndex={-1}
              />
            </Custom>
          </SwatchRow>
        </Popover>
      )}


      {/* 補充：直接開右側面板，選起來的字記在 popupPick，面板照標成的種類給欄位 */}
      <ToolBtn
        $iconOnly
        $on={linked}
        onClick={() => {
          ed.setPopupPick({ blockId, start, end });
          ed.openPopupPanel(blockId);
        }}
        title={linked ? '編輯這幾個字的補充' : '讓這幾個字點了會開補充'}
      >
        {/* 只留圖示（跟元件膠囊的補充鈕一樣）；掛了補充的亮灰底，跟注音、底線同一種「開著」 */}
        <Icon name="blocks" size={20} label="補充" />
      </ToolBtn>
    </>
  );
}

/**
 * 色票。前兩格是設計系統的語意色（會跟著配色變），其餘是品牌輔色裡
 * 深到能當字色的那幾個。淡色（Lime、Sky、Pink）不列——在白紙上讀不到。
 */
const SWATCHES: { label: string; value: string | null }[] = [
  { label: '預設', value: null },
  { label: '強調', value: 'accent' },
  { label: '次要', value: 'secondary' },
  { label: '藍', value: '#1A66C2' },
  { label: '橘', value: '#FF854A' },
  { label: '森林', value: '#00A36E' },
  { label: '紫', value: '#7F6CDF' },
  { label: '赭', value: '#93663C' },
];

/** 語意色在按鈕上也要看得到顏色，換成 token 的變數。 */
const cssColor = (c: string) =>
  c === 'accent' ? 'var(--ds-text-accent)' : c === 'secondary' ? 'var(--ds-text-secondary)' : c;

// ── 整段 ─────────────────────────────────────────────────

type Align = NonNullable<TextBlock['align']>;
const ALIGNS: { value: Align; horizontal: string; vertical: string }[] = [
  { value: 'start', horizontal: '靠左', vertical: '靠上' },
  { value: 'center', horizontal: '置中', vertical: '置中' },
  { value: 'end', horizontal: '靠右', vertical: '靠下' },
  { value: 'justify', horizontal: '左右對齊', vertical: '上下對齊' },
];
const ALIGN_ICON = {
  start: 'align-left',
  center: 'align-center',
  end: 'align-right',
  justify: 'align-justify',
} as const;

type BlockProps = {
  block: TextBlock;
  blockId: string;
  settings: DocSettings;
};

/** 找出段落裡所有已標注音的片段與字元區間。 */
export function BlockTextTools({ block, blockId, settings }: BlockProps) {
  const ed = useEditorCtx()!;
  const patch = (p: { fontSize?: number; lineHeight?: number; align?: TextBlock['align']; writingMode?: TextBlock['writingMode']; blockSize?: number }) =>
    ed.dispatch({ type: 'patchBlock', blockId, blockType: 'text', patch: p });

  const rubyOn = hasAllRuby(block.spans);
  const [alignOpen, setAlignOpen] = useState(false);
  const alignRef = useRef<HTMLButtonElement>(null);
  const [fontOpen, setFontOpen] = useState(false);
  const fontRef = useRef<HTMLButtonElement>(null);
  // 整段的字型：每個字都同一種才算有值；混用時按鈕顯示「字型」
  const fonts = new Set(block.spans.filter((x) => x.text).map((x) => x.fontFamily ?? null));
  const blockFont = fonts.size <= 1 ? ([...fonts][0] ?? null) : undefined;
  const setBlockFont = (value: string | null) =>
    ed.dispatch({
      type: 'setSpans',
      blockId,
      spans: block.spans.map(({ fontFamily: _drop, ...rest }) => (value ? { ...rest, fontFamily: value } : rest)),
    });

  // 這一段實際的方向：自己有設就照自己的，沒設跟整本
  const effective = block.writingMode ?? settings.writingMode;
  const vertical = effective === 'vertical';
  const flipped = !!block.writingMode && block.writingMode !== settings.writingMode;
  const other: TextBlock['writingMode'] = vertical ? 'horizontal' : 'vertical';

  const defaultSize = defaultSizeOf(block.role, vertical);
  const currentSize = block.fontSize ?? defaultSize;
  const sizeOptions = FONT_SIZES.includes(currentSize)
    ? FONT_SIZES
    : [...FONT_SIZES, currentSize].sort((a, b) => a - b);
  const currentAlign = block.align ?? 'start';

  const defaultLh = defaultLineHeight(block.role);
  const currentLh = block.lineHeight ?? defaultLh;
  const lhOptions = [...new Set([...LINE_HEIGHTS, currentLh, defaultLh])].sort((a, b) => a - b);

  return (
    <>
      {/* 整段的字型：跟選字時的字體選單同一份清單，套到這一段每個字 */}
      <ToolBtn
        ref={fontRef}
        $open={fontOpen}
        onClick={() => setFontOpen((o) => !o)}
        title="字型"
        aria-label="字型"
      >
        {blockFont === undefined ? '字型' : INLINE_FONTS.find((f) => f.value === blockFont)?.label ?? '字型'}
        <Icon name="chevron-down" size={16} />
      </ToolBtn>
      {fontOpen && (
        <Popover anchor={fontRef.current} label="字型" onClose={() => setFontOpen(false)}>
          <Menu $compact>
            {INLINE_FONTS.map((f) => (
              <MenuItem
                key={f.label}
                type="button"
                $on={blockFont === f.value}
                style={f.value ? { fontFamily: f.value } : undefined}
                onClick={() => {
                  setBlockFont(f.value);
                  setFontOpen(false);
                }}
              >
                {f.label}
              </MenuItem>
            ))}
          </Menu>
        </Popover>
      )}

      {/* 字級：直接顯示目前字級數字，用下拉選單調整 */}
      <Dropdown
        variant="tool"
        value={String(currentSize)}
        aria-label="字級（px）"
        title="字級"
        options={sizeOptions.map((n) => ({ value: String(n), label: String(n) }))}
        onChange={(v) => {
          const n = Number(v);
          patch({ fontSize: n === defaultSize ? undefined : n });
        }}
      />

      {/* 行距：圖示加倍數，圖示讓它跟旁邊的字級數字分得開；選回預設值就清掉欄位 */}
      {/* 直排時行與行是左右排的，圖示跟著轉成左右箭頭、直的行 */}
      <Dropdown
        variant="tool"
        icon={vertical ? 'line-height-vertical' : 'line-height'}
        value={String(currentLh)}
        aria-label="行距（倍）"
        title="行距"
        options={lhOptions.map((n) => ({ value: String(n), label: String(n) }))}
        onChange={(v) => {
          const n = Number(v);
          patch({ lineHeight: n === defaultLh ? undefined : n });
        }}
      />

      {/* 對齊：一顆下拉，四種（直排時為靠上、置中、靠下、上下對齊）。按鈕顯示目前的對齊方式 */}
      <ToolBtn
        ref={alignRef}
        $value
        $open={alignOpen}
        onClick={() => setAlignOpen((o) => !o)}
        title="對齊"
        aria-label="對齊"
        aria-haspopup="listbox"
        aria-expanded={alignOpen}
      >
        <Icon name={ALIGN_ICON[currentAlign]} size={20} />
        <Icon name="chevron-down" size={16} />
      </ToolBtn>
      {alignOpen && (
        <Popover anchor={alignRef.current} label="對齊" onClose={() => setAlignOpen(false)}>
          <Menu $compact>
            {ALIGNS.map((a) => (
              <MenuItem
                key={a.value}
                type="button"
                $on={currentAlign === a.value}
                onClick={() => {
                  // 靠左（靠上）是預設，存成沒設定
                  patch({ align: a.value === 'start' ? undefined : a.value });
                  setAlignOpen(false);
                }}
              >
                {vertical ? a.vertical : a.horizontal}
                <Icon name={ALIGN_ICON[a.value]} size={16} />
              </MenuItem>
            ))}
          </Menu>
        </Popover>
      )}

      {/* 文字元件上方列的注音入口：按下去直接整段補上或取消注音，不需手動輸入 */}
      <ToolBtn
        $on={rubyOn}
        onClick={() =>
          ed.dispatch({
            type: 'setSpans',
            blockId,
            spans: toggleRubySpans(block.spans, 0, lengthOf(block.spans)),
          })
        }
        title={rubyOn ? '取消這一段的注音' : '為這一段加上注音'}
      >
        注
      </ToolBtn>

      {/*
        直排／橫排切換：使用 icon 按鈕（T↓ / T→）切換。
        跟整本同向就是「沒有覆寫」，所以轉回去是把欄位清掉，不是寫成相反值——
        否則整本一換方向，這一段會留在舊方向上。
      */}
      <ToolBtn
        $iconOnly
        $on={flipped}
        onClick={() =>
          patch({ writingMode: other === settings.writingMode ? undefined : other })
        }
        title={flipped ? `轉回${settings.writingMode === 'vertical' ? '直排' : '橫排'}` : `切換為${other === 'vertical' ? '直排' : '橫排'}`}
        aria-label={flipped ? `轉回${settings.writingMode === 'vertical' ? '直排' : '橫排'}` : `切換為${other === 'vertical' ? '直排' : '橫排'}`}
      >
        {/* 圖示固定是「換成跟整本相反的方向」，按下去不換圖，只靠底色表示已轉向 */}
        <Icon name={settings.writingMode === 'vertical' ? 'writing-horizontal' : 'writing-vertical'} size={20} />
      </ToolBtn>

    </>
  );
}

// ── 選單 ─────────────────────────────────────────────────

/**
 * 掛在按鈕下方的小選單。
 *
 * 按選單裡的東西不能讓編輯區失去游標（否則選取一消失，膠囊連同選單一起收掉），
 * 所以 pointerdown 一律 preventDefault；只有真的要焦點的控制項（選色器）例外，
 * 它們改用 stopPropagation 擋掉膠囊那一層的 preventDefault。
 */
function Popover({
  anchor,
  label,
  onClose,
  children,
}: {
  anchor: HTMLElement | null;
  label: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    const place = () => {
      const r = anchor?.getBoundingClientRect();
      if (r) setPos({ top: r.bottom + 8, left: Math.max(8, Math.min(r.left, window.innerWidth - 248)) });
    };
    place();
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('[data-text-popover]') || (anchor && anchor.contains(t))) return;
      onClose();
    };
    // Esc 只收選單，不要連選取一起放掉——所以在捕獲階段先接走，
    // 編輯器那層的 Esc（deselect）就不會再跑到
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      onClose();
    };
    window.addEventListener('pointerdown', onDown, true);
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('scroll', place, true);
    };
  }, [anchor, onClose]);

  if (!pos) return null;
  return createPortal(
    <Pop
      data-text-popover
      data-ui
      role="dialog"
      aria-label={label}
      style={pos}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('input')) e.stopPropagation();
        else e.preventDefault();
      }}
    >
      {children}
    </Pop>,
    document.body
  );
}

// ── 樣式 ─────────────────────────────────────────────────

/** 跟 FloatingToolbar 的按鈕同一個長相，膠囊裡的東西要看起來是一家的。 */
export const ToolBtn = styled.button<{ $on?: boolean; $open?: boolean; $value?: boolean; $iconOnly?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  padding: ${(p) => (p.$iconOnly ? '6px 8px' : '6px 12px')};
  min-block-size: 36px;
  font: inherit;
  white-space: nowrap;
  flex-shrink: 0;
  /* $on＝開／關切換已開啟（灰，比滑過深一階；不用黃，黃色在畫面上太多）；$open＝這顆打開的選單還開著（淡灰，跟下拉一致） */
  background: ${(p) => (p.$on ? p.theme.surface.muted : p.$open ? p.theme.surface.sunken : 'transparent')};
  /* $value：按鈕上顯示的是目前的值（對齊），跟「內文」「18」那幾顆下拉一樣用深色 */
  color: ${(p) => (p.$on || p.$open || p.$value ? p.theme.text.primary : p.theme.text.secondary)};

  &:hover {
    background: ${(p) => (p.$on ? p.theme.surface.muted : p.theme.surface.sunken)};
  }
`;

/** 直接以圓圈呈現目前選取文字的顏色（取代調色盤圖示）。 */
const ColorCircle = styled.span`
  display: inline-block;
  inline-size: 20px;
  block-size: 20px;
  border-radius: 999px;
  border: 1.5px solid ${(p) => p.theme.border.default};
  box-shadow: inset 0 0 0 1.5px ${(p) => p.theme.surface.raised};
  flex-shrink: 0;
`;

const Pop = styled.div`
  position: fixed;
  z-index: 950;
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  padding: ${(p) => p.theme.space.gapSm};
  border-radius: ${(p) => p.theme.radius.panel};
  /* 浮層一律用淡白底（#FAFAFA），跟設定面板、共享對話框同一色 */
  background: ${(p) => p.theme.surface.page};
  /* 跟 Dropdown 的選單同一款：白底圓角、用選單共用的浮層陰影（細線＋兩層陰影） */
  box-shadow: ${(p) => p.theme.shadow.popover};
  writing-mode: horizontal-tb;
  /* 跟工具列同字級 */
  font-size: ${(p) => p.theme.typography.bodySmSize};
`;

const SwatchRow = styled.div`
  ${swatchRowCss}
`;

const Swatch = styled.button<{ $on: boolean }>`
  ${swatchCss}
`;

const Custom = styled(Swatch)`
  ${customSwatchCss}
`;

/** $compact：選項短的小選單（對齊），不必撐到 200 寬 */
const Menu = styled.div<{ $compact?: boolean }>`
  display: flex;
  flex-direction: column;
  min-inline-size: ${(p) => (p.$compact ? '132px' : '200px')};
`;

const MenuItem = styled.button<{ $on?: boolean }>`
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
  border-radius: ${(p) => p.theme.radius.card};
  background: transparent;
  color: ${(p) => (p.$on ? p.theme.brand.accentOnLight : p.theme.text.primary)};
  font-weight: ${(p) => (p.$on ? 700 : 400)};

  /* 選單是淡白底（#FAFAFA），滑過要深一階才看得出 */
  &:hover { background: ${(p) => p.theme.surface.muted}; }
`;

