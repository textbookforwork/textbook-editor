import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { PanelBody as Body, PanelClose as Ghost, PanelDrawer as Drawer, PanelHead as Head, PanelTitle as Title, fieldAreaCss, fieldCss, useExclusivePanel } from './SidePanel';
import { tileCss } from '../components/tileButton';
import { primaryButtonCss } from '../components/buttonStyles';
import styled from 'styled-components';
import { Dropdown } from './Dropdown';
import { Icon } from '../components/Icon';
import { useEditorCtx } from './EditorContext';
import { findBlock } from '../model/document';
import { textOf } from '../model/document';
import { fetchSiteTitle, linkLabel } from './siteTitle';
import { POPUP_KIND, POPUP_KINDS, elementPopups, missingOf, newPopup, richPagesOf, withRichPages } from '../model/popups';
import { getAsset, pickFile, putFile, putImage, urlOf } from './assets';
import { canHavePopup } from '../model/registry';
import { RichPopupModal } from './RichPopupModal';
import { ConfirmDialog } from './ConfirmDialog';
import type { ParaNoteKind, PopupItem, RangeNote } from '../model/types';
import { PARA_NOTE_KINDS, RANGE_KINDS, rangeKindOf, rangeNoteFilled, sentenceNotesOf } from '../model/paragraphs';
import { useParagraphIndex } from '../components/ParagraphContext';
import { lengthOf, markSpans, plainOf, sliceSpans } from '../model/spans';

/**
 * 掛補充的設定面板。
 *
 * 一個元件可以掛多個，順序可調——順序就是學生在檢視器裡看到的順序。
 * 排序用上下按鈕不用拖曳：這是一份三五項的短清單，在平板上按鈕比
 * 拖曳準得多，而且拖曳已經用在版面編排上了，同一個手勢兩種意思會混淆。
 */
export function PopupPanel() {
  const ed = useEditorCtx();
  const blockId = ed?.popupFor ?? null;
  useExclusivePanel(!!blockId, () => ed?.openPopupPanel(null));

  // 面板關掉（或換到別的元件）時，把還沒填完的項目拿掉：沒加成功的補充不該留下角標，
  // 學生點下去只看到「還沒填網址」。用 ref 拿關掉當下最新的文件
  const edRef = useRef(ed);
  edRef.current = ed;
  useEffect(() => {
    if (!blockId) return;
    return () => {
      const cur = edRef.current;
      if (!cur) return;
      const hit = findBlock(cur.doc, blockId);
      if (!hit) return;
      for (const item of hit.block.popups) {
        if (missingOf(item)) cur.dispatch({ type: 'removePopup', blockId, popupId: item.id });
      }
      // 框選的字標了生字、語詞、句子卻沒填內容的：連字上的標記一起拿掉，學生不會看到點了沒東西的點點線
      const b = hit.block;
      if (b.type === 'text' && b.rangeNotes?.some((n) => !rangeNoteFilled(n))) {
        const empty = new Set(b.rangeNotes.filter((n) => !rangeNoteFilled(n)).map((n) => n.id));
        cur.dispatch({
          type: 'patchBlock',
          blockId,
          blockType: 'text',
          patch: { rangeNotes: b.rangeNotes.filter((n) => !empty.has(n.id)) },
        });
        cur.dispatch({
          type: 'setSpans',
          blockId,
          spans: b.spans.map((s) => (s.noteId && empty.has(s.noteId) ? { ...s, noteId: undefined } : s)),
        });
      }
    };
  }, [blockId]);
  // 選起來的字只屬於開面板的那一次：面板關掉或換到別的元件就丟掉
  useEffect(() => {
    if (ed?.popupPick && ed.popupPick.blockId !== blockId) ed.setPopupPick(null);
  }, [blockId, ed]);
  // 展開中的卡片。預設全部收合，一眼看完掛了哪些東西；新增的那一項自動展開
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  // 拖曳排序：只有按住握把才能拖（armed），避免在輸入框裡選字時整張卡被拖走
  const [armed, setArmed] = useState<string | null>(null);
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dropAt, setDropAt] = useState<number | null>(null);
  const addRef = useRef<HTMLDivElement>(null);
  const [confirmChange, setConfirmChange] = useState(false);
  const paraIndex = useParagraphIndex();
  // 段落說明哪幾格展開著。預設收合，一眼看完填了哪些
  const [openNotes, setOpenNotes] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (!blockId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') ed?.openPopupPanel(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [blockId, ed]);

  if (!ed || !blockId) return null;
  const hit = findBlock(ed.doc, blockId);
  if (!hit || !canHavePopup(hit.block.type)) return null;

  const { block } = hit;
  const close = () => ed.openPopupPanel(null);
  // 課文段落的第一塊：面板多出旨修句問四格，原本的補充歸在「補」底下——跟閱讀時那排圓形按鈕同一個順序
  const paraNo = block.type === 'text' && block.paragraph ? paraIndex.get(block.id)?.no ?? null : null;
  const paraBlock = block.type === 'text' && paraNo != null ? block : null;
  const patch = (item: PopupItem) => ed.dispatch({ type: 'updatePopup', blockId, item });
  // 文字改過（長度變了）位置就不準，不再顯示，免得標到別的字上
  const pick =
    block.type === 'text' && ed.popupPick?.blockId === blockId && ed.popupPick.end <= lengthOf(block.spans) && ed.popupPick.end > ed.popupPick.start
      ? ed.popupPick
      : null;

  // 框選的字：面板跟整段長得一樣（四張卡＋補充），只是改的是這幾個字
  const picked = pick && block.type === 'text' ? sliceSpans(block.spans, pick.start, pick.end) : [];
  const quote = plainOf(picked);
  const same = (key: 'noteId' | 'popupId') => {
    const first = picked[0]?.[key];
    return picked.length > 0 && picked.every((x) => x[key] === first) ? first : undefined;
  };
  const pickNoteId = same('noteId');
  const pickNote = pickNoteId && block.type === 'text' ? block.rangeNotes?.find((n) => n.id === pickNoteId) ?? null : null;
  // 框選的字：補充區只列連到這幾個字的，新增的會自動連過來——其餘長得跟整段一樣
  const pickPopups = new Set(picked.map((x) => x.popupId).filter(Boolean));
  // 整段（或整個元件）只列沒連到字上的；框選的字只列連到它們的。兩組各自一種類型
  const elementIds = new Set(elementPopups(block).map((p) => p.id));
  const shown = pick ? block.popups.filter((p) => pickPopups.has(p.id)) : block.popups.filter((p) => elementIds.has(p.id));
  const inGroup = (id: string) => (pick ? pickPopups.has(id) : elementIds.has(id));
  const markPick = (m: { noteId?: string; popupId?: string }) => {
    if (!pick || block.type !== 'text') return;
    ed.dispatch({ type: 'setSpans', blockId, spans: markSpans(block.spans, pick.start, pick.end, m) });
  };
  const pickKind = pickNote ? rangeKindOf(pickNote) : null;
  const patchPickNote = (patch: Partial<RangeNote>) => {
    if (block.type !== 'text' || !pickNote) return;
    ed.dispatch({
      type: 'patchBlock',
      blockId,
      blockType: 'text',
      patch: { rangeNotes: (block.rangeNotes ?? []).map((n) => (n.id === pickNote.id ? { ...n, ...patch } : n)) },
    });
  };
  /** 句子底下的旨修句問（舊資料一併換成新的存法） */
  const writePickSentence = (kind: ParaNoteKind, value: string) =>
    pickNote && patchPickNote({ kind: 'sentence', body: '', notes: { ...sentenceNotesOf(pickNote), [kind]: value } });

  /** 更換種類：清掉這個元件所有補充，回到種類選單 */
  const clearAll = () => {
    for (const p of shown) ed.dispatch({ type: 'removePopup', blockId, popupId: p.id });
    setConfirmChange(false);
  };

  const addKind = (k: PopupItem['kind']) => {
    const item = newPopup(k);
    ed.dispatch({ type: 'addPopup', blockId, item, forWords: !!pick });
    // 從框選的字進來新增的，順手連到這幾個字
    if (pick) markPick({ popupId: item.id });
    setOpen((prev) => new Set(prev).add(item.id));
    // 只能上傳的種類（圖片、聲音）直接打開選檔視窗；要打字的就把游標放進第一格
    if (item.kind === 'image' || item.kind === 'audio') void uploadInto(item, patch);
    else focusFirstField(item.id);
  };

  return createPortal(
    <Drawer role="dialog" aria-label="補充內容設定">
      <Head>
        <Title title={pick ? quote : undefined} style={{ minInlineSize: 0, overflow: "hidden", textOverflow: "ellipsis" }}>{pick ? `「${quote}」` : paraBlock ? `第 ${paraNo} 段` : '補充內容'}</Title>
        <Ghost onClick={close} aria-label="關閉">
          <Icon name="x" size={24} label="關閉" />
        </Ghost>
      </Head>

      <Body>
        {paraBlock && (
          <>
            {/* 框選的字標成生字詞：一則註釋，一行說明，一張卡填完 */}
            {pick && pickNote && pickKind !== 'sentence' && (
              <List>
                <NoteCard data-popup-id={`rnote-${pickNote.id}`} $open>
                  <NoteRowHead>
                    <NoteDot aria-hidden $filled={!!pickNote.body.trim()}>{RANGE_KINDS.find((k) => k.key === pickKind)!.dot}</NoteDot>
                    <NoteName>{RANGE_KINDS.find((k) => k.key === pickKind)!.note}</NoteName>
                  </NoteRowHead>
                  <NoteArea
                    value={pickNote.body}
                    placeholder="例：音ㄕˋ，愛好。"
                    aria-label={`「${quote}」的註釋`}
                    onChange={(e) => patchPickNote({ body: e.target.value })}
                  />
                </NoteCard>
              </List>
            )}
            {/* 整段的旨修句問；框選的字標成句子時，是那個句子的旨修句問。沒標的字只管補充 */}
            {(!pick || pickKind === 'sentence') && <List>
              {PARA_NOTE_KINDS.map((k) => {
                const value = pick && pickNote ? sentenceNotesOf(pickNote)[k.key] ?? '' : paraBlock.paraNotes?.[k.key] ?? '';
                const filled = !!value.trim();
                const isOpen = openNotes.has(k.key);
                return (
                  <NoteCard key={k.key} data-popup-id={`note-${k.key}`} $open={isOpen}>
                    <NoteToggle
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => {
                        setOpenNotes((prev) => {
                          const next = new Set(prev);
                          if (next.has(k.key)) next.delete(k.key);
                          else next.add(k.key);
                          return next;
                        });
                        if (!isOpen) focusFirstField(`note-${k.key}`);
                      }}
                    >
                      <NoteDot aria-hidden $filled={filled}>{k.btn}</NoteDot>
                      <NoteName>{k.name}</NoteName>
                      {/* 收合時：填過的接一行摘要，沒填的只有右邊一個 ＋ */}
                      {!isOpen && filled && <NoteSummary>{value.replace(/\s+/g, ' ')}</NoteSummary>}
                      {!isOpen && !filled && (
                        <NotePlus>
                          <Icon name="plus" size={16} />
                        </NotePlus>
                      )}
                    </NoteToggle>
                    {isOpen && (
                      <NoteArea
                        value={value}
                        aria-label={pick ? `「${quote}」的${k.name}` : k.name}
                        onChange={(e) =>
                          pick
                            ? writePickSentence(k.key, e.target.value)
                            : ed.dispatch({
                                type: 'patchBlock',
                                blockId,
                                blockType: 'text',
                                patch: { paraNotes: { ...paraBlock.paraNotes, [k.key]: e.target.value } },
                              })
                        }
                      />
                    )}
                  </NoteCard>
                );
              })}
            </List>}
            {/* 框選幾個字標的說明：引出那幾個字，下面直接填 */}
            {/* 已經標過的框選字：整段的時候才列，框選字的時候上面四張卡就是它們 */}
            {!pick && (paraBlock.rangeNotes?.length ?? 0) > 0 && (
              <>
                <Section>
                  <SectionLabel>框選的字</SectionLabel>
                </Section>
                <List>
                  {paraBlock.rangeNotes!.map((n) => {
                    const kind = RANGE_KINDS.find((k) => k.key === rangeKindOf(n))!;
                    const quote = paraBlock.spans.filter((s) => s.noteId === n.id).map((s) => s.text).join('');
                    const sentence = kind.key === 'sentence';
                    return (
                      <NoteCard key={n.id} data-popup-id={`rnote-${n.id}`} $open>
                        <NoteRowHead>
                          <NoteDot aria-hidden $filled={rangeNoteFilled(n)}>{kind.dot}</NoteDot>
                          <NoteQuote title={quote}>「{quote}」</NoteQuote>
                          <Trash
                            onClick={() => {
                              ed.dispatch({
                                type: 'patchBlock',
                                blockId,
                                blockType: 'text',
                                patch: { rangeNotes: paraBlock.rangeNotes!.filter((x) => x.id !== n.id) },
                              });
                              ed.dispatch({
                                type: 'setSpans',
                                blockId,
                                spans: paraBlock.spans.map((s) => (s.noteId === n.id ? { ...s, noteId: undefined } : s)),
                              });
                            }}
                            aria-label={`刪除這則${kind.note}`}
                          >
                            <Icon name="trash" size={16} label="刪除" />
                          </Trash>
                        </NoteRowHead>
                        {/* 句子底下的旨修句問要在課文裡選那幾個字、按補充再改；這裡只列填了哪些 */}
                        {sentence ? (
                          <NoteSummary as="p" style={{ whiteSpace: 'normal' }}>
                            {PARA_NOTE_KINDS.filter((k) => sentenceNotesOf(n)[k.key]?.trim())
                              .map((k) => `${k.name}：${sentenceNotesOf(n)[k.key]!.trim()}`)
                              .join('　') || '還沒填'}
                          </NoteSummary>
                        ) : (
                          <NoteArea
                            value={n.body}
                            aria-label={`「${quote}」的${kind.note}`}
                            onChange={(e) =>
                              ed.dispatch({
                                type: 'patchBlock',
                                blockId,
                                blockType: 'text',
                                patch: {
                                  rangeNotes: paraBlock.rangeNotes!.map((x) => (x.id === n.id ? { ...x, body: e.target.value } : x)),
                                },
                              })
                            }
                          />
                        )}
                      </NoteCard>
                    );
                  })}
                </List>
              </>
            )}
            {/* 跟上面四張卡同一種列頭：圓圈「補」＋名稱，不另外畫分隔線 */}
            {/* 沒標成生字詞或句子的字，面板只有補充：不放列頭，直接是新增的按鈕 */}
            {!(pick && !pickNote) && <BuHead>
              {/* 跟閱讀模式左欄「補充資源」同一個圖示 */}
              <NoteDot aria-hidden $filled={shown.length > 0}><Icon name="blocks" size={16} /></NoteDot>
              <NoteName>補充</NoteName>
            </BuHead>}
          </>
        )}
        {/* 這個元件放的是哪一種（一個元件只能一種）：只在這裡寫一次，旁邊「更換」 */}
        {shown.length > 0 && (
          <KindRow>
            <Icon name={POPUP_KIND[shown[0].kind].icon} size={20} />
            <KindLabel>{POPUP_KIND[shown[0].kind].label}</KindLabel>
            <ChangeKind
              type="button"
              onClick={() => {
                // 都還沒填就直接換；填過東西先確認，免得按錯把內容弄丟
                if (shown.some((p) => !missingOf(p))) setConfirmChange(true);
                else clearAll();
              }}
            >
              更換
            </ChangeKind>
          </KindRow>
        )}
        {shown.length > 0 && <List>
          {block.popups.map((item, i) => {
            if (!inGroup(item.id)) return null;
            // 大彈窗只能有一個，不必收合：一直展開、沒有箭頭
            const single = item.kind === 'rich';
            const isOpen = single || open.has(item.id);
            const missing = missingOf(item);
            return (
            <Card
              key={item.id}
              data-popup-id={item.id}
              $single={single}
              draggable={armed === item.id}
              $dragging={dragFrom === i}
              $dropBefore={dropAt === i && dragFrom !== null && dragFrom !== i && dragFrom !== i - 1}
              $dropAfter={dropAt === i + 1 && i === block.popups.length - 1 && dragFrom !== null && dragFrom !== i}
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move';
                setDragFrom(i);
              }}
              onDragOver={(e) => {
                if (dragFrom === null) return;
                e.preventDefault();
                const r = e.currentTarget.getBoundingClientRect();
                setDropAt(e.clientY < r.top + r.height / 2 ? i : i + 1);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragFrom !== null && dropAt !== null) {
                  // 放在自己後面＝往下移，目標位置要扣掉自己原本佔的那一格
                  const to = dropAt > dragFrom ? dropAt - 1 : dropAt;
                  if (to !== dragFrom) ed.dispatch({ type: 'reorderPopups', blockId, from: dragFrom, to });
                }
                setDragFrom(null);
                setDropAt(null);
                setArmed(null);
              }}
              onDragEnd={() => {
                setDragFrom(null);
                setDropAt(null);
                setArmed(null);
              }}
            >
              <CardHead>
                {shown.length > 1 && (
                  <Grip
                    data-hover-only
                    aria-label="拖曳排序"
                    title="拖曳排序"
                    onPointerDown={() => setArmed(item.id)}
                    onPointerUp={() => setArmed(null)}
                  >
                    <Icon name="grip" size={16} />
                  </Grip>
                )}
                {/* 收合時整列是展開開關，顯示內容摘要。展開時標題列本身就是標題欄（直接在這裡打），
                    不另外放一個「標題」欄位；網頁沒有標題，顯示網址摘要 */}
                {single ? (
                  <OpenMark aria-expanded />
                ) : (
                <Toggle
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? '收合' : missing ? `${POPUP_KIND[item.kind].label}，${missing}` : undefined}
                    $compact={isOpen && item.kind !== 'web'}
                  >
                    <Chev>
                      <Icon name={isOpen ? 'chevron-down' : 'chevron-right'} size={16} />
                    </Chev>
                    {!(isOpen && item.kind !== 'web') && (
                      <Summary $empty={!summaryOf(item, null)}>{summaryOf(item, null) || '未命名'}</Summary>
                    )}
                  </Toggle>
                )}
                {isOpen && item.kind !== 'web' && (
                  <HeadTitle
                    value={item.title}
                    placeholder="標題（選填）"
                    aria-label="標題（選填）"
                    onChange={(e) => patch({ ...item, title: e.target.value })}
                  />
                )}
                {/* 還沒填完：收合時右邊一個小標籤「未完成」；展開時哪格空著一看就知道，不再標 */}
                {missing && !isOpen && <Todo title={missing}>未完成</Todo>}
                <Trash
                  data-faint={isOpen ? undefined : true}
                  onClick={() => ed.dispatch({ type: 'removePopup', blockId, popupId: item.id })}
                  aria-label="刪除這一項"
                >
                  <Icon name="trash" size={16} label="刪除" />
                </Trash>
              </CardHead>

              {isOpen && (
                <>

                  <Detail item={item} onChange={patch} />

                </>
              )}
            </Card>
            );
          })}
        </List>}

        {/* 一個元件只掛一種類型、可以多個：還沒掛時列出所有種類讓老師挑；
            掛了之後只剩一顆「新增○○」，加的是同一種 */}
        <AddWrap ref={addRef} $open={false}>
          {shown.length > 0 && shown[0].kind === 'rich' ? null : shown.length > 0 ? (
            <AddBtn type="button" $open={false} onClick={() => addKind(shown[0].kind)}>
              新增{MEASURE[shown[0].kind]}
              <Icon name="plus" size={16} />
            </AddBtn>
          ) : (
            <AddMenu role="menu">
              {POPUP_KINDS.map((k) => (
                <AddItem key={k} type="button" role="menuitem" onClick={() => addKind(k)}>
                  <Icon name={POPUP_KIND[k].icon} size={20} />
                  <span>{POPUP_KIND[k].label}</span>
                </AddItem>
              ))}
            </AddMenu>
          )}
        </AddWrap>
      </Body>

      {confirmChange && shown.length > 0 && (
        <ConfirmDialog
          title="要更換類型嗎？"
          /* 只有一項就不寫「1 個」 */
          message={`已加入的${
            shown.length > 1 ? ` ${shown.length} ${MEASURE[shown[0].kind].slice(1)}` : ''
          }${POPUP_KIND[shown[0].kind].label}會一併刪除。`}
          confirmLabel="更換"
          onConfirm={clearAll}
          onCancel={() => setConfirmChange(false)}
        />
      )}
    </Drawer>,
    document.body
  );
}


/** 每一種 kind 各自需要填的東西。 */
function Detail({
  item,
  onChange,
}: {
  item: PopupItem;
  onChange: (next: PopupItem) => void;
}) {
  const ed = useEditorCtx();

  switch (item.kind) {
    case 'text':
      return (
        <Label>
          <span>
            內容<Optional>（選填）</Optional>
          </span>
          <Area
            value={item.body}
            rows={3}
            onChange={(e) => onChange({ ...item, body: e.target.value })}
          />
        </Label>
      );

    case 'image':
      return (
        <Upload
          done={!!item.assetId}
          label={item.assetId ? '更換圖片' : '上傳圖片'}
          preview={urlOf(item.assetId)}
          onPick={() => void uploadInto(item, onChange)}
        />
      );

    case 'audio':
      return (
        <Upload
          done={!!item.assetId}
          label={item.assetId ? '更換音檔' : '上傳音檔'}
          onPick={() => void uploadInto(item, onChange)}
        />
      );

    case 'video': {
      // 兩種來源：貼 YouTube 網址，或上傳影片檔（跟頁面上的影片元件一樣）
      const uploaded = item.source === 'upload' && !!item.ref;
      return (
        <>
          <Field
            label="YouTube 網址"
            value={item.source === 'youtube' ? item.ref : ''}
            placeholder="貼上 YouTube 網址"
            onChange={(v) => onChange({ ...item, ref: v, source: 'youtube' })}
          />
          <Or>或</Or>
          <Upload
            done={uploaded}
            label={uploaded ? '更換影片' : '上傳影片'}
            onPick={async () => {
              const file = await pickFile('video/*');
              if (!file) return;
              onChange({ ...item, source: 'upload', ref: putFile(file) });
            }}
          />
        </>
      );
    }

    case 'web':
      return (
        <Field
          label="網址"
          value={item.url}
          placeholder="貼上網址（https://…）"
          onChange={(v) => {
            // 先顯示連結；停手 0.6 秒後去抓網站標題，抓到就換上（打字途中不抓）
            const next = { ...item, url: v, title: linkLabel(v) };
            onChange(next);
            clearTimeout(titleTimer);
            titleTimer = window.setTimeout(() => {
              void fetchSiteTitle(v).then((t) => {
                if (t) onChange({ ...next, title: t });
              });
            }, 600);
          }}
        />
      );

    case 'rich':
      // 內容在接近全螢幕的「彈出頁面」裡編（見 RichPopupModal）；這裡只放入口與頁數
      return <RichEntry item={item} onChange={onChange} />;

    case 'jump':
      return (
        <Label>
          目標段落
          <Dropdown
            value={item.targetRowId ?? ''}
            aria-label="跳到哪一段"
            placeholder="還沒選"
            options={(ed?.doc.rows ?? []).map((r, i) => ({ value: r.id, label: `第 ${i + 1} 段 · ${rowSummary(r)}` }))}
            onChange={(v) => onChange({ ...item, targetRowId: v || null })}
          />
        </Label>
      );
  }
}

let titleTimer = 0;


/**
 * 圖片、聲音補充的上傳：選檔、存起來（標題選填，不自動填檔名）。新增當下與卡片裡的上傳鈕共用。
 * 選檔視窗要在按下的那一刻打開（瀏覽器只允許使用者動作直接觸發），所以呼叫端不能先 await 別的東西。
 */
async function uploadInto(item: PopupItem, onChange: (next: PopupItem) => void) {
  if (item.kind === 'image') {
    const file = await pickFile('image/*');
    if (!file) return;
    const { assetId } = await putImage(file);
    onChange({ ...item, assetId });
  } else if (item.kind === 'audio') {
    const file = await pickFile('audio/*');
    if (!file) return;
    // 聲音不必量尺寸，走不探測的那條——用 putImage 會因為拿 <img> 去讀音檔而永遠失敗
    onChange({ ...item, assetId: putFile(file) });
  }
}

/**
 * 新增一項之後，有要打字的欄位（標題、網址）就直接把游標放進第一格。
 * 卡片要等下一次畫面更新才出現，所以接下來幾幀內找它。圖片、聲音只有上傳鈕，不搶焦點。
 */
function focusFirstField(id: string) {
  let tries = 20;
  const run = () => {
    const el = document.querySelector<HTMLElement>(
      `[data-popup-id="${id}"] input:not([type="file"]), [data-popup-id="${id}"] textarea`
    );
    if (el) el.focus();
    else if (--tries > 0) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}

/** 新增鈕用的量詞：一則文字、一張圖片、一支影片、一段聲音、一個網頁 */
const MEASURE: Record<PopupItem['kind'], string> = {
  text: '一則',
  rich: '一個',
  image: '一張',
  video: '一支',
  audio: '一段',
  web: '一個',
  jump: '一個',
};

/** 收合時卡片上的那一行：有內容就顯示內容，缺東西就顯示缺什麼 */
function summaryOf(item: PopupItem, missing: string | null): string {
  if (missing) return missing;
  switch (item.kind) {
    case 'text':
      return item.title || item.body;
    case 'web':
      return item.title || item.url;
    case 'video':
      // 上傳的 ref 是內部編號，顯示標題或檔名；YouTube 顯示網址
      return item.title || (item.source === 'upload' ? getAsset(item.ref)?.name ?? '' : item.ref);
    case 'image':
    case 'audio':
      // 標題選填：沒打就用檔名，老師在清單上認得出是哪一個
      return item.title || (item.assetId ? getAsset(item.assetId)?.name ?? '' : '');
    default:
      return item.title;
  }
}

function rowSummary(row: { columns: { blocks: { type: string }[] }[] }): string {
  const b = row.columns[0]?.blocks[0];
  if (!b) return '空的';
  if (b.type === 'text') return textOf(b as never).slice(0, 16) || '空白文字';
  return b.type;
}

/** 大彈窗的入口：一顆「編輯內容」，旁邊寫有幾頁。按了開「彈出頁面」編輯器 */
function RichEntry({
  item,
  onChange,
}: {
  item: Extract<PopupItem, { kind: 'rich' }>;
  onChange: (next: PopupItem) => void;
}) {
  const [editing, setEditing] = useState(false);
  const pages = richPagesOf(item);
  return (
    <>
      <EntryRow>
        <EditBtn type="button" onClick={() => setEditing(true)}>
          編輯內容
          <Icon name="pencil" size={16} />
        </EditBtn>
        <PageCount>共 {pages.length} 頁</PageCount>
      </EntryRow>
      {editing && (
        <RichPopupModal
          title={item.title}
          pages={pages}
          onClose={() => setEditing(false)}
          onSave={(next) => {
            onChange(withRichPages(item, next));
            setEditing(false);
          }}
        />
      )}
    </>
  );
}

function Field({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  // 卡片頭的圖示已經說明是網頁或影片，欄位上不再寫一次「網址」；名稱只留給螢幕報讀
  return <Input aria-label={label} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
}

function Upload({
  done,
  label,
  onPick,
  preview,
}: {
  done: boolean;
  label: string;
  onPick: () => void;
  /** 圖片的網址。有的話先讓老師看到現在是哪一張，再決定要不要換。 */
  preview?: string;
}) {
  return (
    <>
      {preview && <Shot src={preview} alt="" />}
      <Pick $done={done} onClick={onPick}>
        {label}
        <Icon name={done ? 'check' : 'upload'} size={16} />
      </Pick>
    </>
  );
}

/* 列與列固定留 6，展開的白卡也不會黏在一起（展開前後間距一樣，列不會跳） */
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

/*
 * 收合時是一般的清單列（透明底、滑過淡灰），跟目次、選單列同一種樣子；
 * 展開時才變成白卡、把欄位包起來。拖曳時被拖的那列變淡，要放的位置畫一條深色線。
 */
const Card = styled.div<{ $dragging: boolean; $dropBefore: boolean; $dropAfter: boolean; $single?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  border-radius: ${(p) => p.theme.radius.tile};
  opacity: ${(p) => (p.$dragging ? 0.4 : 1)};

  /*
   * 對齊：收合、展開兩種狀態都用同一組欄——左右各留 8；箭頭佔 24 寬；
   * 箭頭後面隔 4 是文字欄：收合時摘要的字、展開時標題膠囊裡的字，都從同一條線（左起 44）開始，
   * 展開切換時字不會左右跳；展開後下面的欄位跟標題膠囊左緣切齊。
   * 垃圾桶那一欄一直佔著位置（平常淡、滑過才清楚），「未完成」才會固定靠右、不會跳。
   */
  padding: 4px ${(p) => p.theme.space.insetXs};
  &:hover:not(:has([aria-expanded='true'])) { background: ${(p) => p.theme.surface.sunken}; }
  &:has([aria-expanded='true']) {
    background: ${(p) => p.theme.surface.raised};
    /* 上下留白一樣（12），標題列到欄位、欄位到底部也都是 12 */
    padding-block: ${(p) => p.theme.space.insetSm};
    gap: ${(p) => p.theme.space.gapMd};
    > :not(:first-child) { margin-inline: ${(p) => (p.$single ? '0' : '28px 0')}; }
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
    background: ${(p) => p.theme.text.primary};
    display: none;
  }
  &::before { inset-block-start: -4px; ${(p) => p.$dropBefore && 'display: block;'} }
  &::after { inset-block-end: -4px; ${(p) => p.$dropAfter && 'display: block;'} }
`;

/** 種類列：圖示＋種類名，右邊「更換」 */
const KindRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
  padding: 0 4px 0 ${(p) => p.theme.space.insetSm};
  min-block-size: 40px;
  border-radius: ${(p) => p.theme.radius.tile};
  background: ${(p) => p.theme.surface.sunken};
  color: ${(p) => p.theme.icon.default};
`;

const KindLabel = styled.span`
  flex: 1;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  color: ${(p) => p.theme.text.primary};
`;

const ChangeKind = styled.button`
  min-block-size: 32px;
  padding: 0 12px;
  border: none;
  border-radius: ${(p) => p.theme.radius.control};
  background: transparent;
  font: inherit;
  font-size: var(--ds-typography-caption-size);
  color: ${(p) => p.theme.text.secondary};
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.surface.muted}; color: ${(p) => p.theme.text.primary}; }
`;

const CardHead = styled.div`
  position: relative;
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${(p) => p.theme.text.secondary};
`;

/** 握把浮在列的左邊外側，不佔位置——收起來時字不會空一格 */
const Grip = styled.span`
  position: absolute;
  inset-inline-start: -18px;
  inset-block: 0;
  display: grid;
  place-items: center;
  inline-size: 16px;
  color: ${(p) => p.theme.icon.secondary};
  cursor: grab;
  touch-action: none;
  transition: opacity 0.12s;
  &:active { cursor: grabbing; }
`;

/** 展開時的標題欄：放在標題列上，跟其他輸入框同一款灰膠囊 */
const HeadTitle = styled.input`
  ${fieldCss}
  flex: 1;
  min-inline-size: 0;
  min-block-size: 32px;
  font-size: var(--ds-typography-caption-size);
  &::placeholder { color: ${(p) => p.theme.text.placeholder}; }
  padding-inline: 8px 12px;
`

/** 大彈窗沒有箭頭：放一個不佔位置的標記，讓卡片照「展開」的樣子排（白底、欄位） */
const OpenMark = styled.span`
  display: none;
`;

const Toggle = styled.button<{ $compact?: boolean }>`
  flex: ${(p) => (p.$compact ? 'none' : 1)};
  min-inline-size: 0;
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
  min-block-size: 32px;
  padding: 0;
  border: none;
  background: transparent;
  font: inherit;
  color: ${(p) => p.theme.icon.default};
  text-align: start;
  cursor: pointer;
  border-radius: ${(p) => p.theme.radius.tile};
  &:focus-visible { outline: none; }
`;

/** 箭頭：32 的圓，展開時滑過是圓形淡灰底 */
const Chev = styled.span`
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 24px;
  block-size: 24px;
  border-radius: 999px;
  button:hover > &, button:focus-visible > & { background: ${(p) => p.theme.surface.muted}; }
`;

/** 一行字：填好了是內容（深字）；還沒填是種類名（淡灰）——灰字本身就表示還沒完成 */
/** 一行字：一律深色——淡灰會被看成停用。填好了是內容，還沒填是種類名加右邊的「未完成」 */
const Summary = styled.span<{ $empty: boolean }>`
  flex: 1;
  padding-inline-start: 8px;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  /* 沒有標題時「未命名」用淡灰——是提示，不是內容 */
  color: ${(p) => (p.$empty ? p.theme.text.tertiary : p.theme.text.primary)};
`;

/** 「未完成」小標籤：淡橘底、橘字，提醒還要填，不搶眼 */
const Todo = styled.span`
  flex: none;
  padding: 1px 8px;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.feedback.warningSurface};
  color: ${(p) => p.theme.feedback.warningDefault};
  font-size: var(--ds-typography-label-size);
  line-height: 18px;
`

/** 刪除鈕：32 的正圓 */
const Trash = styled(Ghost)`
  flex: none;
  justify-content: center;
  inline-size: 32px;
  block-size: 32px;
  min-block-size: 0;
  padding: 0;
  transition: opacity 0.12s;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: var(--ds-typography-label-size);
  color: ${(p) => p.theme.text.secondary};
`;

/** 補充卡片裡的欄位比設定面板小一號（32 高、12 字）：卡片本身已經在面板裡，再大就太擠 */
const Input = styled.input`
  ${fieldCss}
  min-block-size: 32px;
  font-size: var(--ds-typography-caption-size);
`;

const Area = styled.textarea`
  ${fieldAreaCss}
  font-size: var(--ds-typography-caption-size);
`;

/** 上傳鈕：跟媒體庫的小號黑鈕同一款（32 高、一般字重） */
const Or = styled.span`
  align-self: center;
  font-size: var(--ds-typography-caption-size);
  color: ${(p) => p.theme.text.tertiary};
`;

const EntryRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space.gapSm};
`;

/** 「編輯內容」：白底淡框，滑過換品牌深綠（跟「新增補充」同一款） */
const EditBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  min-block-size: 36px;
  padding: 0 12px;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  border-radius: ${(p) => p.theme.radius.control};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.secondary};
  cursor: pointer;
  &:hover { border-color: ${(p) => p.theme.border.accent}; color: ${(p) => p.theme.text.accent}; }
`;

const PageCount = styled.span`
  flex: none;
  font-size: var(--ds-typography-caption-size);
  color: ${(p) => p.theme.text.tertiary};
`;

const Optional = styled.span`
  color: ${(p) => p.theme.text.tertiary};
`;

/** 卡片裡的上傳鈕：黑色主要按鈕（上傳是這張卡要做的事） */
const Pick = styled.button<{ $done: boolean }>`
  ${primaryButtonCss}
`;

/**
 * 新增區。收合時只有一顆黑色「新增補充」；按下去後整塊變成一張白卡，
 * 按鈕退成淡灰（不再是主要動作），種類方塊從它下面長出來——看得出是同一個東西展開的。
 */
/** 補充圖片的縮圖：固定高度、等比縮放，看得出是哪一張就好。 */
const Shot = styled.img`
  display: block;
  align-self: stretch;
  block-size: 140px;
  object-fit: contain;
  border-radius: ${(p) => p.theme.radius.field};
  background: ${(p) => p.theme.surface.sunken};
`;

/** 新增區（見下方說明） */
const AddWrap = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  border-radius: ${(p) => p.theme.radius.panel};
  ${(p) =>
    p.$open &&
    `
    padding: ${p.theme.space.insetXs};
    background: ${p.theme.surface.raised};
  `}
`;

/** 新增鈕：跟網頁元件的「插入標籤／內嵌網頁」同一款——白底淡框灰字，滑過換品牌深綠的框與字 */
const AddBtn = styled.button<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  inline-size: 100%;
  min-block-size: 40px;
  padding: 0 12px;
  font: inherit;
  font-size: var(--ds-typography-body-sm-size);
  border-radius: ${(p) => p.theme.radius.control};
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.secondary};
  cursor: pointer;
  transition: border-color 0.12s, color 0.12s;

  &:hover,
  &:focus-visible {
    outline: none;
    border-color: ${(p) => p.theme.border.accent};
    color: ${(p) => p.theme.text.accent};
  }
`

/** 種類方塊：三欄正方形，直接出現（不加動畫） */
const AddMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(p) => p.theme.space.gapSm};
`;

/** 正方形方塊；白卡裡用淡灰底才看得出是按鈕（還沒掛東西、沒有白卡時用白底） */
const AddItem = styled.button`
  ${tileCss}
  block-size: auto;
  aspect-ratio: 1;
  background: ${(p) => p.theme.surface.raised};
  ${AddWrap}[data-open] & { background: ${(p) => p.theme.surface.sunken}; }
  ${AddWrap}[data-open] &:hover { background: ${(p) => p.theme.surface.muted}; }
`


/** 面板裡的小標：「段落說明」「補充」。右邊一行淡字補充說明 */
const Section = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${(p) => p.theme.space.gapSm};
  padding-inline: ${(p) => p.theme.space.insetXs};
`;

const SectionLabel = styled.span`
  font-size: var(--ds-typography-label-size);
  font-weight: 500;
  color: ${(p) => p.theme.text.secondary};
`;

/** 一種說明一列：收合時是透明的清單列（滑過淡灰），展開時變白卡把文字框包起來——跟補充卡片同一種樣子 */
const NoteCard = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.gapSm};
  padding: 4px ${(p) => p.theme.space.insetXs};
  border-radius: ${(p) => p.theme.radius.tile};
  ${(p) =>
    p.$open
      ? `background: ${p.theme.surface.raised}; padding-block-end: ${p.theme.space.insetXs}; box-shadow: ${p.theme.shadow.card};`
      : `&:hover { background: ${p.theme.surface.sunken}; }`}
`;

const NoteToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  min-block-size: 36px;
  padding: 0;
  border: none;
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
`;

/** 跟閱讀時那顆圓形按鈕同款的小圓。填過的實心，一眼看得出哪幾顆學生會看到 */
const NoteDot = styled.span<{ $filled: boolean }>`
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 28px;
  border-radius: 999px;
  border: ${(p) => p.theme.border.widthDefault} solid
    ${(p) => (p.$filled ? p.theme.text.primary : p.theme.border.default)};
  background: ${(p) => (p.$filled ? p.theme.text.primary : p.theme.surface.raised)};
  color: ${(p) => (p.$filled ? p.theme.surface.raised : p.theme.text.secondary)};
  font-size: var(--ds-typography-caption-size);
`;

const NoteName = styled.span`
  flex: none;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  color: ${(p) => p.theme.text.primary};
`;

const NoteSummary = styled.span`
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  color: ${(p) => p.theme.text.secondary};
`;

const NotePlus = styled.span`
  margin-inline-start: auto;
  display: grid;
  place-items: center;
  color: ${(p) => p.theme.icon.secondary};
`;

/** 文字框跟著字數長高（最少兩行），不先撐出一大塊灰底 */
const NoteArea = styled.textarea`
  ${fieldAreaCss}
  field-sizing: content;
  min-block-size: 56px;
  font-size: var(--ds-typography-body-sm-size);
  resize: none;
`;

const NoteRowHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-block-size: 36px;
`;

/** 被標的那幾個字，用課文的樣子引出來 */
const NoteQuote = styled.span`
  flex: 1;
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--ds-typography-body-sm-size);
  font-weight: 500;
  color: ${(p) => p.theme.text.primary};
`;

/** 補充區的列頭：跟四張說明卡收合時對齊 */
const BuHead = styled(NoteRowHead)`
  padding-inline: ${(p) => p.theme.space.insetXs};
`;
