import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { LIME, PEBBLE_PATH, SubjectCover, SubjectMark } from '../editor/HomeButton';
import { ConfirmDialog } from '../editor/ConfirmDialog';
import { CoverDialog } from '../editor/ShareDialog';
import { Toaster, toast } from '../editor/Toast';
import { CreateDialog } from './CreateDialog';
import { TEXTBOOKS } from './catalog';
import { findSource, sourceDoc, type Source } from './sources';
import { ROLE_NAME, setRole, useRole, type Role } from './role';
import { BlankDialog, SUBJECTS } from './BlankDialog';
import { emptyDoc } from '../model/document';
import { createBook, deleteBook, findBook, isOriginal, listBooks, subscribeLibrary, updateBook, type MyBook } from './library';
import { goEdit, goRead, goReadTextbook, goShelf, type ShelfTab } from './nav';

const TABS: { key: ShelfTab; label: string }[] = [
  { key: 'textbook', label: '數位教科書' },
  { key: 'shared', label: '共享教材' },
  { key: 'mine', label: '自編教材' },
];

/**
 * 書櫃首頁，照 Figma「書櫃首頁」（node 3:2022）。
 *
 * 三個分頁是同一份教材的三個階段：數位教科書（原本）→ 建立自編（副本）→ 自編教材 → 共享 → 共享教材。
 * 每個分頁依科目分區，一區一排卡片。
 *
 * 兩種身分（右上角頭像切換，見 role.ts）：
 *   老師       在數位教科書按鉛筆＝建立自編（副本），出版社不能改
 *   系統管理員 多一顆「建立教材」從空白本開始，建的是數位教科書（原本），出版社自己填；
 *              已發布的原本不能刪（老師可能已經在用，由後端刪，避免手殘）；未發布的草稿可以刪
 */
export function Shelf({ tab = 'textbook' }: { tab?: ShelfTab }) {
  const books = useSyncExternalStore(subscribeLibrary, listBooks);
  const role = useRole();
  const admin = role === 'admin';
  const [creating, setCreating] = useState<Source | null>(null);
  // 管理員按了哪一區的「建立教材」：科目先帶入那一區
  const [blank, setBlank] = useState<string | null>(null);
  const [covering, setCovering] = useState<MyBook | null>(null);
  const [deleting, setDeleting] = useState<MyBook | null>(null);

  // 數位教科書＝內建的原本＋管理員建立的原本；自編與共享只列副本
  const sources: Source[] = [
    ...TEXTBOOKS.map((t) => findSource(t.id)!),
    // 管理員建立的原本：發布了（shared）才上架給老師；管理員看得到全部
    ...books.filter((b) => isOriginal(b) && (admin || b.shared)).map((b) => findSource(b.id)!),
  ];
  const copies = books.filter((b) => !isOriginal(b));
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
    .filter((s) => (shown ? s.books.length > 0 : s.sources.length > 0));

  return (
    <Page>
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

      {/* 地球大廳、啟航探索是平台的兩個主要區域；這次只做書櫃（地球大廳），另一個先不能點 */}
      <Nav>
        <NavPill $on aria-current="page">
          <Icon name="book" size={20} />
          地球大廳
        </NavPill>
        <NavPill as="span" title="還沒開放">
          <Icon name="globe" size={20} />
          啟航探索
        </NavPill>
      </Nav>

      <Panel>
        <TabRow>
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
        </TabRow>

        {sections.length === 0 && (
          <Empty>
            {tab === 'shared'
              ? '還沒有共享的教材。在自編教材裡按「共享」，就會出現在這裡。'
              : '還沒有自編教材。到「數位教科書」按課本右下角的鉛筆，就能建立一份。'}
          </Empty>
        )}

        {sections.map((s) => (
          <Section key={s.subject}>
            <SectionHead>
              <SubjectMark subject={s.subject} />
              <h2>{s.subject}</h2>
            </SectionHead>
            <Grid>
              {shown
                ? s.books.map((b) => (
                    <BookCard
                      key={b.id}
                      book={b}
                      source={findSource(b.sourceId)}
                      showTeacher
                      onCover={() => setCovering(b)}
                      onDelete={() => setDeleting(b)}
                    />
                  ))
                : s.sources.map((t) =>
                    // 管理員建立的原本：可以直接編、換封面；已發布的不能刪（老師可能已經在用，由後端刪），未發布的草稿可以刪
                    !t.builtIn && admin ? (
                      <BookCard
                        key={t.id}
                        book={findBook(t.id)!}
                        source={t}
                        showTeacher={false}
                        onCover={() => setCovering(findBook(t.id))}
                        onDelete={findBook(t.id)?.shared ? undefined : () => setDeleting(findBook(t.id))}
                      />
                    ) : (
                      // 內建的原本一律是已發布；只有管理員需要看到發布狀態
                      <SourceCard key={t.id} source={t} status={admin ? 'published' : undefined} onCreate={() => setCreating(t)} />
                    )
                  )}
            </Grid>
          </Section>
        ))}
      </Panel>

      {creating && (
        <CreateDialog
          source={sourceDoc(creating.id)!}
          onCancel={() => setCreating(null)}
          onCreate={(_, doc) => {
            // 副本的出版社沿用原本（版本管理：副本不能改出版社）
            const book = createBook(creating.id, { ...doc, meta: { ...doc.meta, publisher: creating.publisher } });
            setCreating(null);
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
      {deleting && (
        <ConfirmDialog
          title={`刪除「${deleting.title}」？`}
          message={isOriginal(deleting) ? '這本還沒發布，老師看不到。刪除後無法復原。' : '刪除後無法復原。'}
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

/** 右上角：名字＋頭像，點了切換身分。 */
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
      <User type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} title="切換身分">
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
        </Menu>
      )}
    </UserWrap>
  );
}

/** 數位教科書的預設封面：管理員剛建立、還沒放封面時，用科目記號加書名。 */
function CoverImage({ src, subject }: { src: string | null | undefined; title: string; subject: string }) {
  if (src) return <img src={src} alt="" />;
  // 預設封面：科目淺色底、中間鏤空科目形狀（見 HomeButton 的 SubjectCover）
  return (
    <Placeholder>
      <SubjectCover subject={subject} />
    </Placeholder>
  );
}

function SourceCard({ source, status, onCreate }: { source: Source; status?: Status; onCreate: () => void }) {
  return (
    <Card>
      <Cover>
        <CoverImage src={source.cover} title={source.title} subject={source.subject} />
        {status && <StatusTag status={status} />}
      </Cover>
      <Body>
        <Meta>{source.edition}</Meta>
        <Title title={source.title}>{source.title}</Title>
        <Actions>
          <ReadBtn type="button" onClick={() => (source.builtIn ? goReadTextbook(source.id) : goRead(source.id))}>
            閱讀課本
            <Icon name="arrow-up-right" size={16} />
          </ReadBtn>
          <EditBtn type="button" onClick={onCreate} title="建立自編" aria-label={`用「${source.title}」建立自編`}>
            <Icon name="pencil" size={16} />
          </EditBtn>
        </Actions>
      </Body>
    </Card>
  );
}

type Status = 'published' | 'shared';
const STATUS_LABEL: Record<Status, string> = { published: '已發布', shared: '已共享' };

/**
 * 封面左上的狀態徽章：白色霧面膠囊＋一顆綠色狀態點，跟一般介面的「上線中」標示同一種語言。
 * 只標成立的狀態（已發布、已共享）；未發布的不掛，已發布的在同一科裡排前面。
 */
function StatusTag({ status }: { status: Status }) {
  return (
    <Tag>
      <Dot aria-hidden="true" />
      {STATUS_LABEL[status]}
    </Tag>
  );
}

function BookCard({
  book,
  source,
  showTeacher,
  onCover,
  onDelete,
}: {
  book: MyBook;
  source: Source | null;
  /** 在共享教材分頁：顯示老師名字、不掛「已共享」標籤。 */
  showTeacher: boolean;
  onCover: () => void;
  /** 不給就沒有「刪除」：數位教科書（原本）在前台不能刪，只能由後端刪。 */
  onDelete?: () => void;
}) {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menu) return;
    const close = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    window.addEventListener('pointerdown', close, true);
    return () => window.removeEventListener('pointerdown', close, true);
  }, [menu]);

  return (
    <Card>
      <Cover $hover $menu={menu}>
        <CoverImage src={book.cover ?? source?.cover} title={book.title} subject={source?.subject ?? ''} />
        {/* 只標已發布／已共享；未發布不掛標籤。「已共享」是在自編教材分頁裡區分用的，共享教材分頁每本都是，不標 */}
        {book.shared && !showTeacher && <StatusTag status={isOriginal(book) ? 'published' : 'shared'} />}
        {/* 滑過封面：調暗、右上角出現「更多」；點開是編輯封面與刪除（設計稿：維持目前的設計） */}
        <More ref={menuRef}>
          <MoreBtn type="button" aria-label="更多" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
            <Icon name="more-horizontal" size={20} />
          </MoreBtn>
          {menu && (
            <Menu role="menu">
              <MenuItem role="menuitem" type="button" onClick={() => (setMenu(false), onCover())}>
                <Icon name="pencil" size={16} />
                編輯封面
              </MenuItem>
              {onDelete && (
                <MenuItem role="menuitem" type="button" $danger onClick={() => (setMenu(false), onDelete())}>
                  <Icon name="trash" size={16} />
                  刪除
                </MenuItem>
              )}
            </Menu>
          )}
        </More>
      </Cover>
      <Body>
        <Meta>{source?.edition}</Meta>
        <Title title={book.title}>{book.title}</Title>
        {showTeacher && (
          <Teacher>
            <TeacherAvatar>
              <Icon name="user" size={16} />
            </TeacherAvatar>
            <span>{ROLE_NAME.teacher}老師</span>
          </Teacher>
        )}
        <Actions>
          <ReadBtn type="button" onClick={() => goRead(book.id)}>
            閱讀課本
            <Icon name="arrow-up-right" size={16} />
          </ReadBtn>
          <EditBtn type="button" onClick={() => goEdit(book.id)} title="編輯" aria-label={`編輯「${book.title}」`}>
            <Icon name="pencil" size={16} />
          </EditBtn>
        </Actions>
      </Body>
    </Card>
  );
}

// ── 樣式 ─────────────────────────────────────────────

const Page = styled.div`
  min-block-size: 100vh;
  background: ${(p) => p.theme.surface.backdrop};
  /* 尺寸跟著視窗走：Figma 稿是 1440 寬的長頁，照抄固定像素的話，矮的視窗連一整張卡片都看不完 */
  padding: clamp(16px, 3vh, 32px) clamp(16px, 2.2vw, 32px) 48px;
  /* 卡片寬：卡片高＝封面（寬×1.24）＋下方約 130px；扣掉上方標題、分頁約 300px，讓一整排卡片放得進一個畫面 */
  --card-w: clamp(150px, calc((100vh - 430px) / 1.24), 228px);
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

/** 品牌的位置用品牌字繁 Think 黑 */
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
  margin-block-end: clamp(16px, 3vh, 36px);
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

const Placeholder = styled.div`
  inline-size: 100%;
  block-size: 100%;
  border-radius: 0;
  overflow: hidden;

  svg { display: block; }
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
  margin: clamp(12px, 3.5vh, 44px) 0 clamp(10px, 2vh, 20px);
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
  padding: clamp(14px, 2.4vh, 24px) clamp(20px, 5vw, 94px) 48px;
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

const Empty = styled.p`
  margin: 64px 0;
  text-align: center;
  color: ${(p) => p.theme.text.tertiary};
  font-size: ${(p) => p.theme.typography.bodySmSize};
`;

const Section = styled.section`
  & + & { margin-block-start: clamp(28px, 5vh, 48px); }
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-block-end: clamp(12px, 2.2vh, 24px);

  h2 {
    margin: 0;
    font-size: 24px;
    line-height: 35px;
    font-weight: 700;
  }
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
const Card = styled.article`
  display: flex;
  flex-direction: column;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  border-radius: 12px;
  background: ${(p) => p.theme.surface.raised};
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(0.34, 1.8, 0.64, 1), box-shadow 0.35s ease;

  /* 選書：往上跳一截、微微放大，落下時帶一點回彈；陰影拉長，像書離開書架 */
  &:hover,
  &:focus-within {
    transform: translateY(-14px) scale(1.03);
    box-shadow: 0 22px 40px rgba(26, 25, 23, 0.2);
  }
  @media (prefers-reduced-motion: reduce) {
    transition: box-shadow 0.25s ease;
    &:hover, &:focus-within { transform: none; }
  }
`;

const Tag = styled.span`
  position: absolute;
  inset-block-start: 10px;
  inset-inline-start: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  block-size: 24px;
  padding-inline: 8px 10px;
  border-radius: ${(p) => p.theme.radius.control};
  background: color-mix(in srgb, ${(p) => p.theme.surface.raised} 88%, transparent);
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 3px rgba(26, 25, 23, 0.12);
  color: ${(p) => p.theme.text.primary};
  font-size: ${(p) => p.theme.typography.captionSize};
  line-height: ${(p) => p.theme.typography.captionLineHeight};
  font-weight: 500;
  white-space: nowrap;
`;

const Dot = styled.span`
  inline-size: 8px;
  block-size: 8px;
  border-radius: 999px;
  background: ${(p) => p.theme.feedback.successDefault};
`;

const MoreBtn = styled.button`
  display: grid;
  place-items: center;
  inline-size: 32px;
  block-size: 32px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;
`;

const More = styled.div`
  position: absolute;
  inset-block-start: 10px;
  inset-inline-end: 10px;
  opacity: 0;
  transition: opacity 0.15s;
`;

/** 封面 228×283；自編教材的封面滑過時調暗並出現「更多」 */
const Cover = styled.div<{ $hover?: boolean; $menu?: boolean }>`
  position: relative;
  aspect-ratio: 228 / 283;
  border-radius: 0;

  img {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    border-radius: 0;
  }

  ${(p) =>
    p.$hover &&
    `
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 0;
      background: rgba(26, 25, 23, 0.35);
      opacity: ${p.$menu ? 1 : 0};
      transition: opacity 0.15s;
      pointer-events: none;
    }
    &:hover::after, &:focus-within::after { opacity: 1; }
    &:hover ${More}, &:focus-within ${More} { opacity: 1; }
    ${p.$menu ? `& ${More} { opacity: 1; }` : ''}
  `}

  & > * { z-index: 1; }
`;

const Menu = styled.div`
  position: absolute;
  inset-block-start: 38px;
  inset-inline-end: 0;
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

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  flex: 1;
`;

const Meta = styled.span`
  font-size: ${(p) => p.theme.typography.captionSize};
  color: ${(p) => p.theme.text.secondary};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  line-height: 28px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// 發布者：自編與共享分頁都顯示（Figma 3:1909）
const Teacher = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  min-inline-size: 0;
  font-size: ${(p) => p.theme.typography.captionSize};
  line-height: ${(p) => p.theme.typography.captionLineHeight};
  font-weight: 500;
  color: ${(p) => p.theme.text.secondary};

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const TeacherAvatar = styled.span`
  display: grid;
  place-items: center;
  flex: none;
  inline-size: 20px;
  block-size: 20px;
  border-radius: ${(p) => p.theme.radius.control};
  background: ${(p) => p.theme.surface.sunken};

  /* Figma 這裡的頭像圖示是 12px，比設計系統最小的 16 還小，只在這裡縮 */
  svg {
    inline-size: 12px;
    block-size: 12px;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-block-start: auto;
  padding-block-start: 8px;
`;

const ReadBtn = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  block-size: 36px;
  padding: 0 14px 0 16px;
  border: none;
  border-radius: 999px;
  background: ${(p) => p.theme.action.primaryBg};
  color: ${(p) => p.theme.action.primaryText};
  font: inherit;
  font-size: ${(p) => p.theme.typography.captionSize};
  cursor: pointer;

  &:hover { background: ${(p) => p.theme.action.primaryBgHover}; }
`;

const EditBtn = styled.button`
  flex: none;
  display: grid;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  padding: 0;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.default};
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  color: ${(p) => p.theme.icon.default};
  cursor: pointer;

  &:hover { background: ${(p) => p.theme.surface.sunken}; }
`;
