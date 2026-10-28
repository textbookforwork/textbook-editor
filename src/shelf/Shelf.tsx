import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { LIME, PEBBLE_PATH, SubjectMark } from '../editor/HomeButton';
import { FramedCover, PlainCover, PublisherCover } from './ShelfCover';
import { SAMPLE_BOOKS, isSample, openSample, openedSample } from './samples';
import { ConfirmDialog } from '../editor/ConfirmDialog';
import { CoverDialog } from '../editor/ShareDialog';
import { Toaster, toast } from '../editor/Toast';
import { CreateDialog } from './CreateDialog';
import { TEXTBOOKS } from './catalog';
import { findSource, sourceDoc, type Source } from './sources';
import { ROLE_NAME, setRole, useRole, type Role } from './role';
import { BlankDialog, SUBJECTS } from './BlankDialog';
import { emptyDoc } from '../model/document';
import { adoptedFrom, adoptTextbook, createBook, deleteBook, findBook, hiddenTextbooks, hideTextbook, isOriginal, listBooks, nextFrame, subscribeLibrary, updateBook, type MyBook } from './library';
import { goEdit, goRead, goReadTextbook, goShelf, type ShelfTab } from './nav';
import { signOut } from './session';

const TABS: { key: ShelfTab; label: string }[] = [
  { key: 'textbook', label: '數位教科書' },
  { key: 'shared', label: '共享教材' },
  { key: 'mine', label: '自編教材' },
];

/**
 * 書櫃首頁，照 Figma「書櫃首頁」（node 3:2022）。
 *
 * 三個分頁是同一份教材的三個階段：數位教科書（原本）→ 建立自編（副本）→ 自編教材 → 共享 → 共享教材。
 * 每個分頁依科目分區，一區只排一列；放不下一列時該區右上才出現「查看全部」，進到那一科的子頁看全部（設計稿「展開更多教科書」3:2021；乙練 2026-10-22 定：一列放得下就不出現）。
 * 自編教材：未共享的排前面、已共享的排後面（乙練 2026-10-28 改回），同一組裡最近改過的在前。
 *
 * 兩種身分（右上角頭像切換，見 role.ts）：
 *   老師       在數位教科書按鉛筆＝建立自編（副本），出版社不能改
 *   系統管理員 多一顆「建立教材」從空白本開始，建的是數位教科書（原本），出版社自己填；
 *              只有已發布的數位教科書能建立自編，老師和管理員都可以（管理員自己建的，從「更多」選單建）；
 *              已發布的原本不能刪（老師可能已經在用，由後端刪，避免手殘）；未發布的草稿可以刪
 */
export function Shelf({ tab = 'textbook', subject }: { tab?: ShelfTab; subject?: string }) {
  const books = useSyncExternalStore(subscribeLibrary, listBooks);
  const role = useRole();
  const admin = role === 'admin';
  const [creating, setCreating] = useState<Source | null>(null);
  // 從共享教材建立自編：內容複製那一份共享教材，不是原本
  const [copyFrom, setCopyFrom] = useState<string | null>(null);
  // 管理員按了哪一區的「建立教材」：科目先帶入那一區
  const [blank, setBlank] = useState<string | null>(null);
  const [covering, setCovering] = useState<MyBook | null>(null);
  const [deleting, setDeleting] = useState<MyBook | null>(null);
  const [deletingTextbook, setDeletingTextbook] = useState<Source | null>(null);
  /** 管理員接手內建課本：複製一份成自己的原本（已發布），之後照一般原本編輯、換封面、刪除 */
  const adopt = (t: Source) => adoptTextbook(t.id, sourceDoc(t.id)!, { subject: t.subject, publisher: t.publisher, cover: t.art ?? t.cover });

  // 數位教科書＝內建的原本＋管理員建立的原本；自編與共享只列副本
  const sources: Source[] = [
    // 管理員接手或刪掉的內建課本不再列（接手後那份在下面「管理員建立的原本」裡）
    ...TEXTBOOKS.filter((t) => !hiddenTextbooks().includes(t.id)).map((t) => findSource(t.id)!),
    // 管理員建立的原本：發布了（shared）才上架給老師；管理員看得到全部
    ...books.filter((b) => isOriginal(b) && (admin || b.shared)).map((b) => findSource(b.id)!),
  ];
  // 未共享的排前面、已共享的排後面，同一組裡最近改過的在前
  // 示範教材進過編輯就換成那份真的自編，不再重複列（共享分頁照列，那是別的老師的）
  const copies = [...books.filter((b) => !isOriginal(b)), ...SAMPLE_BOOKS.filter((b) => tab === 'shared' || !openedSample(b.id))]
    .sort((a, b) => Number(a.shared) - Number(b.shared) || b.updatedAt - a.updatedAt);
  const [measureRef, columns] = useGridColumns();
  const shown = tab === 'textbook' ? null : tab === 'shared' ? copies.filter((b) => b.shared) : copies;

  const published = (t: Source) => t.builtIn || !!findBook(t.id)?.shared;
  // 依科目分區，順序照 SUBJECTS（國語文置頂）；不在清單裡的科目排最後
  const rank = (subject: string) => (SUBJECTS.indexOf(subject) + SUBJECTS.length + 1) % (SUBJECTS.length + 1);
  const sections = sources
    .map((t) => t.subject)
    .filter((s, i, all) => all.indexOf(s) === i)
    .sort((a, b) => rank(a) - rank(b))
    .map((subject) => ({
      subject,
      // 已發布的排前面：內建的原本一律算已發布，管理員建立的看 shared
      sources: sources
        .filter((t) => t.subject === subject)
        .sort((a, b) => Number(!published(a)) - Number(!published(b))),
      books: (shown ?? []).filter((b) => findSource(b.sourceId)?.subject === subject),
    }))
    .filter((s) => (shown ? s.books.length > 0 : s.sources.length > 0))
    .filter((s) => !subject || s.subject === subject);
  // 主頁每科只排一列、最多 5 本；子頁（查看全部）不限
  const limit = subject ? Infinity : columns;

  const zoom = usePageZoom();

  return (
    <Page style={{ '--z': zoom } as React.CSSProperties}>
      <Top>
        <Brand>
          <svg width={52} height={54} viewBox="0 0 32 32" aria-hidden="true">
            <path d={PEBBLE_PATH} fill={LIME} />
          </svg>
          <span>
            <BrandZh>數位教科書</BrandZh>
            <BrandEn>Digital Textbook</BrandEn>
          </span>
        </Brand>
        <UserMenu role={role} />
      </Top>

      {/* 地球大廳、班級星艦是平台的兩個主要區域；這次只做書櫃（地球大廳），另一個先不能點（啟航探索留給 V2） */}
      <Nav>
        <NavPill $on aria-current="page">
          <Icon name="book" size={20} />
          地球大廳
        </NavPill>
        <NavPill as="span" title="還沒開放">
          <Icon name="users" size={20} />
          班級星艦
        </NavPill>
      </Nav>

      <Panel>
        {/* 子頁（查看全部）照設計稿：不放分頁列，只有左上的返回鈕 */}
        {!subject && <TabRow>
          <Tabs role="tablist" aria-label="教材種類">
            {TABS.map((t) => (
              <TabBtn key={t.key} role="tab" aria-selected={tab === t.key} $on={tab === t.key} onClick={() => goShelf(t.key)}>
                {t.label}
              </TabBtn>
            ))}
          </Tabs>
          {admin && tab === 'textbook' && (
            <NewBtn type="button" onClick={() => setBlank('')}>
              建立教材
              <Icon name="plus" size={16} />
            </NewBtn>
          )}
        </TabRow>}

        {sections.length === 0 && (
          <Empty>
            <EmptyIcon>
              <Icon name="ghost" size={24} />
            </EmptyIcon>
            <EmptyTitle>
              這裡還沒有{tab === 'shared' ? '共享教材' : '自編教材'}
            </EmptyTitle>
            <EmptyHint>
              {tab === 'shared'
                ? '在自編教材按「共享」，就會出現在這裡'
                : '到數位教科書，按課本右下角的鉛筆就能建立一份'}
            </EmptyHint>
          </Empty>
        )}

        <Grid ref={measureRef} aria-hidden="true" style={{ blockSize: 0, overflow: 'hidden' }} />
        {subject && (
          <Back type="button" aria-label="回書櫃" title="回書櫃" onClick={() => goShelf(tab)}>
            <Icon name="arrow-left" size={24} />
          </Back>
        )}
        {sections.map((s) => (
          <Section key={s.subject}>
            <SectionHead>
              <SubjectMark subject={s.subject} />
              <h2>{s.subject}</h2>
              {!subject && (shown ? s.books.length : s.sources.length) > limit && (shown ? s.books.length : s.sources.length) > limit && (
                <SeeAll type="button" onClick={() => goShelf(tab, s.subject)}>
                  查看全部
                  <Icon name="chevron-right" size={24} />
                </SeeAll>
              )}
            </SectionHead>
            <Grid style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
              {shown
                ? s.books.slice(0, limit).map((b) => (
                    <BookCard
                      key={b.id}
                      book={b}
                      source={findSource(b.sourceId)}
                      inSharedTab={tab === 'shared'}
                      onCover={() => setCovering(b)}
                      onCopy={(tab === 'shared' || isSample(b)) && findSource(b.sourceId) ? () => (setCopyFrom(isSample(b) ? null : b.id), setCreating(findSource(b.sourceId))) : undefined}
                      onDelete={() => setDeleting(b)}
                    />
                  ))
                : s.sources.slice(0, limit).map((t) =>
                    // 管理員建立的原本：可以直接編、換封面；已發布的不能刪（老師可能已經在用，由後端刪），未發布的草稿可以刪
                    !t.builtIn && admin ? (
                      <BookCard
                        key={t.id}
                        book={findBook(t.id)!}
                        source={t}
                        onCover={() => setCovering(findBook(t.id))}
                        onCopy={findBook(t.id)?.shared ? () => setCreating(t) : undefined}
                        onDelete={() => setDeleting(findBook(t.id))}
                      />
                    ) : (
                      // 內建的原本一律是已發布；只有管理員需要看到發布狀態
                      <SourceCard
                        key={t.id}
                        source={t}
                        published={admin}
                        onCreate={() => setCreating(t)}
                        admin={admin ? {
                          edit: () => goEdit(adopt(t).id),
                          cover: () => setCovering(adopt(t)),
                          remove: () => setDeletingTextbook(t),
                        } : undefined}
                      />
                    )
                  )}
            </Grid>
          </Section>
        ))}
      </Panel>

      {creating && (
        <CreateDialog
          source={sourceDoc(copyFrom ?? creating.id)!}
          defaultName={(copyFrom && findBook(copyFrom)?.title) || creating.title}
          onCancel={() => (setCreating(null), setCopyFrom(null))}
          onCreate={(_, doc) => {
            // 副本的出版社沿用原本（版本管理：副本不能改出版社）
            // 形狀框接在這本原書已用掉的款後面（示範副本先占了前幾款）
            const used = SAMPLE_BOOKS.filter((s) => s.sourceId === creating.id).length;
            const book = createBook(creating.id, { ...doc, meta: { ...doc.meta, publisher: creating.publisher } }, undefined, nextFrame(creating.id, used));
            setCreating(null);
            setCopyFrom(null);
            goEdit(book.id);
          }}
        />
      )}
      {blank !== null && (
        <BlankDialog
          subject={blank || undefined}
          onCancel={() => setBlank(null)}
          onCreate={({ name, subject, publisher }) => {
            const doc = emptyDoc(name);
            const first = doc.rows[0].columns[0].blocks[0];
            if (first.type === 'text') first.spans = [{ text: name }];
            const book = createBook('', { ...doc, meta: { publisher, subject: metaSubject(subject) } }, { subject, publisher });
            setBlank(null);
            goEdit(book.id);
          }}
        />
      )}
      {covering && (
        <CoverDialog
          onCancel={() => setCovering(null)}
          onConfirm={(cover) => {
            updateBook(covering.id, { cover });
            setCovering(null);
            toast('封面已更新');
          }}
        />
      )}
      {deletingTextbook && (
        <ConfirmDialog
          title={`刪除「${deletingTextbook.title}」？`}
          message="這本已經發布，老師可能正在用；老師建好的自編會留著。刪除後無法復原。"
          confirmLabel="刪除"
          onCancel={() => setDeletingTextbook(null)}
          onConfirm={() => {
            hideTextbook(deletingTextbook.id);
            setDeletingTextbook(null);
            toast('已刪除');
          }}
        />
      )}
      {deleting && (
        <ConfirmDialog
          title={`刪除「${deleting.title}」？`}
          message={isOriginal(deleting) ? (deleting.shared ? '這本已經發布，老師可能正在用；老師建好的自編會留著。刪除後無法復原。' : '這本還沒發布，老師看不到。刪除後無法復原。') : '刪除後無法復原。'}
          confirmLabel="刪除"
          onCancel={() => setDeleting(null)}
          onConfirm={() => {
            deleteBook(deleting.id);
            setDeleting(null);
            toast('已刪除');
          }}
        />
      )}
      <Toaster />
    </Page>
  );
}

/** 書櫃分區的科目名稱 → 教材設定裡的科目（決定左上角回首頁鈕的形狀）。 */
const metaSubject = (subject: string) => ({ 國語文: '國語', 英語文: '英語', 自然科學: '自然' })[subject] ?? subject;

/** 右上角：名字＋頭像，點了切換身分或登出。 */
function UserMenu({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('pointerdown', close, true);
    return () => window.removeEventListener('pointerdown', close, true);
  }, [open]);
  const name = ROLE_NAME[role];
  return (
    <UserWrap ref={ref}>
      <User type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} title="切換身分、登出">
        {name}
        <Avatar aria-hidden="true">{role === 'admin' ? '管' : name.slice(0, 1)}</Avatar>
      </User>
      {open && (
        <Menu role="menu" style={{ insetBlockStart: 52 }}>
          <MenuHint>切換身分（原型用）</MenuHint>
          {(['teacher', 'admin'] as Role[]).map((r) => (
            <MenuItem
              key={r}
              role="menuitemradio"
              aria-checked={role === r}
              type="button"
              onClick={() => {
                setRole(r);
                setOpen(false);
              }}
            >
              {r === 'teacher' ? '老師' : '系統管理員'}
              {role === r && <Icon name="check" size={16} />}
            </MenuItem>
          ))}
          <MenuDivider />
          <MenuItem
            role="menuitem"
            type="button"
            onClick={() => {
              setOpen(false);
              signOut();
              window.location.hash = '#/';
            }}
          >
            登出
          </MenuItem>
        </Menu>
      )}
    </UserWrap>
  );
}

/** 「⋯」：滑過封面才出現；點開是這一本能做的事 */
function MoreMenu({ items }: { items: { label: string; icon: string; danger?: boolean; run: () => void }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('pointerdown', close, true);
    return () => window.removeEventListener('pointerdown', close, true);
  }, [open]);
  if (!items.length) return null;
  return (
    <More ref={ref} $open={open} onClick={(e) => e.stopPropagation()}>
      <MoreBtn type="button" aria-label="更多" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span><Icon name="more-horizontal" size={20} /></span>
      </MoreBtn>
      {open && (
        <Menu role="menu">
          {items.map((it) => (
            <MenuItem key={it.label} role="menuitem" type="button" $danger={it.danger} onClick={() => (setOpen(false), it.run())}>
              <Icon name={it.icon as never} size={16} />
              {it.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </More>
  );
}

/**
 * 數位教科書（原本）：出版社封面去字＋白字課名；沒有封面的範例書用科目色平塗＋課名。數位教科書一律不套形狀框。
 * 點封面閱讀；「⋯」裡是建立自編。管理員多「進入編輯」「更換封面」「刪除」，下方標「已發布」。
 */
function SourceCard({ source, published, onCreate, admin }: { source: Source; published?: boolean; onCreate: () => void; admin?: { edit: () => void; cover: () => void; remove: () => void } }) {
  const art = source.art ?? source.cover;
  return (
    <Card>
      <Cover role="button" tabIndex={0} aria-label={`閱讀「${source.title}」`} onClick={() => (source.builtIn ? goReadTextbook(source.id) : goRead(source.id))}>
        {art ? (
          <PublisherCover art={art} edition={source.edition} title={source.title} />
        ) : (
          <PlainCover subject={source.subject} edition={source.edition} title={source.title} />
        )}
        <MoreMenu items={admin ? [
          { label: '進入編輯', icon: 'pencil', run: admin.edit },
          { label: '更換封面', icon: 'image', run: admin.cover },
          { label: '建立自編', icon: 'copy', run: onCreate },
          { label: '刪除', icon: 'trash', danger: true, run: admin.remove },
        ] : [{ label: '建立自編', icon: 'copy', run: onCreate }]} />
      </Cover>
      <Below>{published && <Status>已發布</Status>}</Below>
    </Card>
  );
}

/**
 * 自編、共享教材（副本），以及管理員自己建立的原本。
 *   自編：科目形狀框露出原書封面；「⋯」＝進入編輯、更換封面、刪除；下方標「已共享」
 *   共享：同上的封面；「⋯」＝建立自編；下方是分享的老師
 *   管理員的原本：同數位教科書的封面；「⋯」＝更換封面、建立自編（已發布才有）、刪除（草稿才有）
 * 點封面一律是閱讀。
 */
function BookCard({
  book,
  source,
  inSharedTab = false,
  onCover,
  onCopy,
  onDelete,
}: {
  book: MyBook;
  source: Source | null;
  inSharedTab?: boolean;
  onCover: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
}) {
  const original = isOriginal(book);
  const art = book.cover ?? source?.art ?? source?.cover;
  // 接手的內建課本沿用原本的版次（含國小／國中）
  const from = original ? adoptedFrom(book.id) : null;
  const edition = (from && findSource(from)?.edition) || (source?.edition ?? '');
  const items = original
    ? [
        { label: '進入編輯', icon: 'pencil', run: () => goEdit(book.id) },
        { label: '更換封面', icon: 'image', run: onCover },
        ...(onCopy ? [{ label: '建立自編', icon: 'copy', run: onCopy }] : []),
        ...(onDelete ? [{ label: '刪除', icon: 'trash', danger: true, run: onDelete }] : []),
      ]
    : inSharedTab
      ? onCopy ? [{ label: '建立自編', icon: 'copy', run: onCopy }] : []
      : [
          { label: '進入編輯', icon: 'pencil', run: () => {
            const id = isSample(book) ? openSample(book) : book.id;
            if (id) goEdit(id);
          } },
          { label: '更換封面', icon: 'image', run: isSample(book) ? () => toast('示範教材不能更換封面') : onCover },
          ...(onDelete ? [{ label: '刪除', icon: 'trash', danger: true, run: isSample(book) ? () => toast('示範教材不能刪除') : onDelete }] : []),
        ];
  return (
    <Card>
      <Cover role="button" tabIndex={0} aria-label={`閱讀「${book.title}」`} onClick={() => (isSample(book) ? goReadTextbook(book.sourceId) : goRead(book.id))}>
        {/* 原本有封面圖、或老師自己上傳了封面：整張鋪滿完整顯示，不套科目形狀框（形狀框只用在沒上傳封面的自編、共享，2026-10-28 乙練） */}
        {original || book.cover ? (
          art ? <PublisherCover art={art} edition={edition} title={book.title} /> : <PlainCover subject={source?.subject ?? ''} edition={edition} title={book.title} />
        ) : (
          <FramedCover subject={source?.subject ?? ''} art={art} edition={edition} title={book.title} seed={book.id} frame={book.frame} />
        )}
        <MoreMenu items={items} />
      </Cover>
      <Below>
        {inSharedTab ? (
          <>
            <TeacherAvatar aria-hidden="true">{(isSample(book) ? book.teacher : ROLE_NAME.teacher).slice(0, 1)}</TeacherAvatar>
            <span>{isSample(book) ? book.teacher : ROLE_NAME.teacher}老師</span>
          </>
        ) : (
          book.shared && <Status>{original ? '已發布' : '已共享'}</Status>
        )}
      </Below>
    </Card>
  );
}

// ── 樣式 ─────────────────────────────────────────────

/**
 * 書櫃整頁依視窗等比縮放（zoom），標題、分頁、卡片一起變大變小，比例不會跑掉。只縮卡片的話，頁首和卡片會一大一小。
 * 基準是 1440 寬、可視高 790（1440×900 的螢幕扣掉瀏覽器網址列）。2026-10-22 乙練定：
 *   電腦：整頁 90%，一排 6 本
 *   教室大屏：不再放大（最多 100%），一排 7 本
 *   平板（觸控裝置，不看寬度）：不多縮 90%，一排 5 本，字才不會太小
 *   電腦（2026-10-27 改）：固定 90%，一排放得下幾本就幾本、最多 6 本（大屏 7 本），視窗收窄時往下流動；平板看觸控不看寬度
 */
const BASE_W = 1440;
const BASE_H = 790;
/** 視窗這麼寬以上算教室大屏：不縮放、一排最多 7 本 */
const WIDE = 1700;

function usePageZoom() {
  const read = () => {
    const w = document.documentElement.clientWidth;
    // 平板看的是「觸控裝置」不是視窗寬度：電腦視窗開不滿（側欄、沒全螢幕）也還是電腦，一排 6 本（2026-10-27 乙練）
    const tablet = window.matchMedia('(pointer: coarse)').matches;
    if (tablet) return Math.min(w / BASE_W, window.innerHeight / BASE_H);
    // 電腦：固定 90%（教室大屏 100%），書的大小不跟著視窗變；一排放得下幾本就幾本，最多 6 本（大屏 7 本），收窄時往下流動
    return w >= WIDE ? 1 : 0.9;
  };
  const [zoom, setZoom] = useState(read);
  useEffect(() => {
    const onResize = () => setZoom(read());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return zoom;
}

const Page = styled.div`
  zoom: var(--z, 1);
  min-block-size: calc(100vh / var(--z, 1));
  background: ${(p) => p.theme.surface.backdrop};
  padding: 24px 32px 48px;
  /* 一排最少要放得下的書寬：筆電視窗沒開滿（約 1200）也能一排 6 本（2026-10-27 乙練） */
  --card-w: 176px;
  box-sizing: border-box;
`;

const Top = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

/** logo 的「數位教科書」用品牌字繁 Think 黑；品牌字只用在 logo */
const BrandZh = styled.span`
  display: block;
  font-family: 'FanThinkGrotesk', var(--ds-typography-font-sans);
  font-weight: 700;
  font-size: 26px;
  letter-spacing: 0.2em;
  line-height: 1.2;
`;

const BrandEn = styled.span`
  display: block;
  font-family: ${(p) => p.theme.typography.fontDisplay};
  font-size: 18px;
  line-height: 1.3;
`;

const UserWrap = styled.div`
  position: relative;
  z-index: 10;
`;

const User = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 0 0 12px;
  border: none;
  border-radius: 999px;
  background: none;
  font: inherit;
  font-size: ${(p) => p.theme.typography.bodySmSize};
  color: ${(p) => p.theme.text.primary};
  cursor: pointer;
`;

const MenuDivider = styled.hr`
  margin: 4px 6px;
  border: none;
  border-block-start: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
`;

const MenuHint = styled.span`
  padding: 4px 10px 2px;
  font-size: ${(p) => p.theme.typography.captionSize};
  color: ${(p) => p.theme.text.tertiary};
  white-space: nowrap;
`;

/** 分頁置中，「建立教材」靠右，兩者同一列 */
const TabRow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block-end: 24px;
`;

/** 管理員的「建立教材」：分頁列右上角的黑色主要按鈕 */
const NewBtn = styled.button`
  position: absolute;
  inset-inline-end: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  block-size: 40px;
  padding: 0 18px 0 20px;
  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.action.primaryBg};
  color: ${(p) => p.theme.action.primaryText};
  font: inherit;
  font-size: ${(p) => p.theme.typography.bodySmSize};
  font-weight: 500;
  cursor: pointer;

  &:hover { background: ${(p) => p.theme.action.primaryBgHover}; }
`;

const Avatar = styled.span`
  display: grid;
  place-items: center;
  inline-size: 44px;
  block-size: 44px;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.inverse};
  color: ${(p) => p.theme.text.onInverse};
  font-size: ${(p) => p.theme.typography.bodySize};
`;

const Nav = styled.nav`
  display: flex;
  gap: 8px;
  margin: 28px 0 16px;
`;

const NavPill = styled.button<{ $on?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  block-size: 44px;
  padding: 0 16px;
  border: none;
  border-radius: 999px;
  background: ${(p) => (p.$on ? p.theme.surface.raised : 'transparent')};
  color: ${(p) => (p.$on ? p.theme.text.primary : p.theme.text.secondary)};
  font: inherit;
  font-size: ${(p) => p.theme.typography.bodySmSize};
  font-weight: ${(p) => (p.$on ? 500 : 400)};
  cursor: ${(p) => (p.$on ? 'default' : 'not-allowed')};
`;

const Panel = styled.main`
  background: ${(p) => p.theme.surface.raised};
  border-radius: 24px;
  padding: 20px 64px 48px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

/** 分頁：選中的品牌深綠加底線（底線另外畫，不用框線，圓角才不會把線兩端彎起來），跟媒體庫的分頁同一款 */
const TabBtn = styled.button<{ $on: boolean }>`
  position: relative;
  padding: 6px 8px 10px;
  border: none;
  border-radius: 8px;
  background: none;
  font: inherit;
  font-size: ${(p) => p.theme.typography.bodySize};
  font-weight: ${(p) => (p.$on ? 600 : 400)};
  color: ${(p) => (p.$on ? p.theme.text.accent : p.theme.text.secondary)};
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    inset: auto 8px 0;
    block-size: 2px;
    border-radius: 2px;
    background: ${(p) => p.theme.brand.accentOnLight};
    transform: scaleX(${(p) => (p.$on ? 1 : 0)});
    transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  &:hover { color: ${(p) => (p.$on ? p.theme.text.accent : p.theme.text.primary)}; }
  /* 鍵盤選到：不畫框，字底下鋪一塊淡灰圓角 */
  &:focus-visible { outline: none; background: ${(p) => p.theme.surface.sunken}; }
`;

/** 書櫃分頁沒有教材時：灰圓裡一個小幽靈、一句主句、一行提示。 */
const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin: 80px 0;
  text-align: center;
`;

const EmptyIcon = styled.span`
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  margin-block-end: 8px;
  border-radius: 50%;
  background: ${(p) => p.theme.surface.sunken};
  color: ${(p) => p.theme.text.tertiary};
  svg { width: 40px; height: 40px; }
`;

const EmptyTitle = styled.p`
  margin: 0;
  color: ${(p) => p.theme.text.secondary};
  font-size: ${(p) => p.theme.typography.bodySize};
  font-weight: 500;
`;

const EmptyHint = styled.p`
  margin: 0;
  color: ${(p) => p.theme.text.tertiary};
  font-size: ${(p) => p.theme.typography.bodySmSize};
`;

const Section = styled.section`
  & + & { margin-block-start: 40px; }
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-block-end: 16px;

  h2 {
    margin: 0;
    font-size: 24px;
    line-height: 35px;
    font-weight: 700;
  }
`;

/**
 * 一列放得下幾張卡：直接讀格線算出來的欄數（auto-fill 沒放東西也會保留空欄），
 * 卡片寬度跟著視窗高度縮放，所以視窗大小一變就重讀。
 */
function useGridColumns() {
  const ref = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(5);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 放得下幾本就幾本，但電腦最多 6 本、教室大屏最多 7 本（多出來的寬度讓書平均變寬）
    const read = () => setColumns(Math.min(document.documentElement.clientWidth >= WIDE ? 7 : 6, Math.max(1, getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length)));
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    window.addEventListener('resize', read);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', read);
    };
  }, []);
  return [ref, columns] as const;
}

const SeeAll = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-inline-start: auto;
  block-size: 44px;
  padding: 0 12px 0 16px;
  border: none;
  border-radius: 999px;
  background: none;
  color: ${(p) => p.theme.text.primary};
  font: inherit;
  font-size: ${(p) => p.theme.typography.bodySize};
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.action.ghostBgHover}; }
`;

const Back = styled.button`
  display: grid;
  place-items: center;
  inline-size: 44px;
  block-size: 44px;
  margin-block-end: 24px;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.default};
  border-radius: 50%;
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.text.primary};
  cursor: pointer;
  &:hover { background: ${(p) => p.theme.action.ghostBgHover}; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--card-w));
  gap: 24px;
`;

/**
 * 書卡：圓角由卡片統一裁切（封面不另外畫圓角，才不會跟框線錯開露出縫）。
 * 滑過時整張書往上浮起一點、陰影加深，像把書從書櫃抽出來。
 */
/** 「⋯」選單：從按鈕那個角往下、往左展開（淡入＋從小放大），不是突然跳出 */
const Menu = styled.div`
  position: absolute;
  inset-block-start: 49px;
  inset-inline-end: 9px;
  transform-origin: top right;
  animation: shelf-menu-in 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
  @keyframes shelf-menu-in {
    from { opacity: 0; transform: translateY(-4px) scale(0.92); }
    to { opacity: 1; transform: none; }
  }
  @media (prefers-reduced-motion: reduce) { animation: none; }
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-inline-size: 132px;
  padding: 6px;
  border-radius: 16px;
  background: ${(p) => p.theme.surface.page};
  box-shadow: ${(p) => p.theme.shadow.popover};
`;

const MenuItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  min-block-size: 36px;
  padding: 0 10px;
  border: none;
  border-radius: 10px;
  background: transparent;
  font: inherit;
  font-size: ${(p) => p.theme.typography.bodySmSize};
  color: ${(p) => (p.$danger ? p.theme.feedback.errorDefault : p.theme.text.primary)};
  cursor: pointer;

  &:hover { background: ${(p) => p.theme.surface.muted}; }
`;

/**
 * 書卡：沒有白色外框，只有封面＋下方一行狀態。
 * 滑過時整本往上浮起、微微放大，陰影只落在封面上（下方那行字跟著浮起，但不包進陰影）。
 */
const Card = styled.article`
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
  transition: transform 0.35s cubic-bezier(0.34, 1.8, 0.64, 1);

  &:hover,
  &:focus-within {
    transform: translateY(-14px) scale(1.03);
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover, &:focus-within { transform: none; }
  }
`;

const More = styled.div<{ $open?: boolean }>`
  position: absolute;
  /* 可點範圍比圓鈕大一圈（52px），點偏一點也不會落到封面變成閱讀 */
  inset-block-start: -1px;
  inset-inline-end: -1px;
  z-index: 2;
  opacity: ${(p) => (p.$open ? 1 : 0)};
  transition: opacity 0.15s;
  @media (hover: none) { opacity: 1; }
`;

const MoreBtn = styled.button`
  display: grid;
  place-items: center;
  inline-size: 52px;
  block-size: 52px;
  padding: 0;
  border: none;
  background: none;
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
  & > span {
    display: grid;
    place-items: center;
    inline-size: 34px;
    block-size: 34px;
    border-radius: 999px;
    background: ${(p) => p.theme.surface.raised};
    box-shadow: 0 2px 8px rgba(26, 25, 23, 0.14);
  }
`;

/** 封面 4:5；點封面閱讀，滑過才出現「⋯」 */
const Cover = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(26, 25, 23, 0.08);
  transition: box-shadow 0.35s ease;

  ${Card}:hover &, ${Card}:focus-within & { box-shadow: 0 22px 40px rgba(26, 25, 23, 0.22); }
  &:hover ${More}, &:focus-within ${More} { opacity: 1; }
`;

/** 封面下方一行：自編標「已共享」、共享放分享的老師、管理員看數位教科書標「已發布」；沒有狀態就空著 */
const Below = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-block-size: 24px;
  margin-block-start: 10px;
  font-size: 15px;
  color: ${(p) => p.theme.text.primary};
  min-inline-size: 0;

  span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;

/** 「已發布」「已共享」：萊姆膠囊（品牌主色 #F0FF62；試過淺萊姆，乙練 2026-10-28 定回亮的）、深色字（品牌主色；不用科目色，免得被看成科目，2026-10-27 乙練） */
const Status = styled.span`
  display: inline-flex;
  align-items: center;
  block-size: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: ${(p) => p.theme.brand.primary};
  color: ${(p) => p.theme.text.primary};
  font-size: 13px;
  font-weight: 500;
`;

/** 分享的老師：黑底白字頭像（同右上角使用者頭像） */
const TeacherAvatar = styled.span`
  display: grid;
  place-items: center;
  flex: none;
  inline-size: 24px;
  block-size: 24px;
  border-radius: 999px;
  background: #1A1A1A;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 500;
  /* 行高收成 1，中文字才會在圓的正中間（沿用外層行高會往下掉） */
  line-height: 1;
`;
