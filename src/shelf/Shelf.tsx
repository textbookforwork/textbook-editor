import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import styled from 'styled-components';
import { Icon } from '../components/Icon';
import { LIME, PEBBLE_PATH, SubjectMark } from '../editor/HomeButton';
import { ConfirmDialog } from '../editor/ConfirmDialog';
import { CoverDialog } from '../editor/ShareDialog';
import { Toaster, toast } from '../editor/Toast';
import { CreateDialog } from './CreateDialog';
import { TEXTBOOKS, findTextbook, textbookDoc, type Textbook } from './catalog';
import { createBook, deleteBook, listBooks, subscribeLibrary, updateBook, type MyBook } from './library';
import { goEdit, goRead, goReadTextbook, goShelf, type ShelfTab } from './nav';

/** 原型沒有帳號，老師名字照 Figma 寫死。 */
const TEACHER = '方小明';

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
 */
export function Shelf({ tab = 'textbook' }: { tab?: ShelfTab }) {
  const books = useSyncExternalStore(subscribeLibrary, listBooks);
  const [creating, setCreating] = useState<Textbook | null>(null);
  const [covering, setCovering] = useState<MyBook | null>(null);
  const [deleting, setDeleting] = useState<MyBook | null>(null);

  const shown = tab === 'textbook' ? null : tab === 'shared' ? books.filter((b) => b.shared) : books;

  // 依科目分區，順序照數位教科書的順序
  const sections = TEXTBOOKS.map((t) => t.subject)
    .filter((s, i, all) => all.indexOf(s) === i)
    .map((subject) => ({
      subject,
      textbooks: TEXTBOOKS.filter((t) => t.subject === subject),
      books: (shown ?? []).filter((b) => findTextbook(b.sourceId)?.subject === subject),
    }))
    .filter((s) => (shown ? s.books.length > 0 : s.textbooks.length > 0));

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
        <User>
          {TEACHER}
          <Avatar aria-hidden="true">{TEACHER.slice(0, 1)}</Avatar>
        </User>
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
        <Tabs role="tablist" aria-label="教材種類">
          {TABS.map((t) => (
            <TabBtn key={t.key} role="tab" aria-selected={tab === t.key} $on={tab === t.key} onClick={() => goShelf(t.key)}>
              {t.label}
            </TabBtn>
          ))}
        </Tabs>

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
                      showTeacher={tab === 'shared'}
                      onCover={() => setCovering(b)}
                      onDelete={() => setDeleting(b)}
                    />
                  ))
                : s.textbooks.map((t) => <TextbookCard key={t.id} textbook={t} onCreate={() => setCreating(t)} />)}
            </Grid>
          </Section>
        ))}
      </Panel>

      {creating && (
        <CreateDialog
          source={textbookDoc(creating)}
          onCancel={() => setCreating(null)}
          onCreate={(_, doc) => {
            const book = createBook(creating.id, doc);
            setCreating(null);
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
          message="刪除後無法復原。"
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

function TextbookCard({ textbook, onCreate }: { textbook: Textbook; onCreate: () => void }) {
  return (
    <Card>
      <Cover>
        <img src={textbook.cover} alt="" />
      </Cover>
      <Body>
        <Meta>{textbook.edition}</Meta>
        <Title title={textbook.title}>{textbook.title}</Title>
        <Actions>
          <ReadBtn type="button" onClick={() => goReadTextbook(textbook.id)}>
            閱讀課本
            <Icon name="arrow-up-right" size={16} />
          </ReadBtn>
          <EditBtn type="button" onClick={onCreate} title="建立自編" aria-label={`用「${textbook.title}」建立自編`}>
            <Icon name="pencil" size={16} />
          </EditBtn>
        </Actions>
      </Body>
    </Card>
  );
}

function BookCard({
  book,
  showTeacher,
  onCover,
  onDelete,
}: {
  book: MyBook;
  showTeacher: boolean;
  onCover: () => void;
  onDelete: () => void;
}) {
  const source = findTextbook(book.sourceId);
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
        <img src={book.cover ?? source?.cover} alt="" />
        {book.shared && <Tag>已共享</Tag>}
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
              <MenuItem role="menuitem" type="button" $danger onClick={() => (setMenu(false), onDelete())}>
                <Icon name="trash" size={16} />
                刪除
              </MenuItem>
            </Menu>
          )}
        </More>
      </Cover>
      <Body>
        <Meta>{source?.edition}</Meta>
        <Title title={book.title}>{book.title}</Title>
        {showTeacher && (
          <Teacher>
            <Icon name="user" size={16} />
            {TEACHER}老師
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
  padding: 32px 32px 48px;
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

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: ${(p) => p.theme.typography.bodySmSize};
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
  margin: 44px 0 20px;
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
  padding: 24px clamp(24px, 6vw, 94px) 48px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-block-end: 36px;
`;

const TabBtn = styled.button<{ $on: boolean }>`
  padding: 6px 0;
  border: none;
  border-block-end: 2px solid ${(p) => (p.$on ? p.theme.brand.accentOnLight : 'transparent')};
  background: none;
  font: inherit;
  font-size: ${(p) => p.theme.typography.bodySize};
  font-weight: ${(p) => (p.$on ? 600 : 400)};
  color: ${(p) => (p.$on ? p.theme.text.accent : p.theme.text.secondary)};
  cursor: pointer;

  &:hover { color: ${(p) => (p.$on ? p.theme.text.accent : p.theme.text.primary)}; }
  &:focus-visible { outline-offset: 4px; border-radius: 8px; }
`;

const Empty = styled.p`
  margin: 64px 0;
  text-align: center;
  color: ${(p) => p.theme.text.tertiary};
  font-size: ${(p) => p.theme.typography.bodySmSize};
`;

const Section = styled.section`
  & + & { margin-block-start: 48px; }
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-block-end: 24px;

  h2 {
    margin: 0;
    font-size: 24px;
    line-height: 35px;
    font-weight: 700;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 228px);
  gap: 24px;
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  border: ${(p) => p.theme.border.widthDefault} solid ${(p) => p.theme.border.subtle};
  border-radius: 12px;
  background: ${(p) => p.theme.surface.raised};
  overflow: visible;
`;

const Tag = styled.span`
  position: absolute;
  inset-block-start: 10px;
  inset-inline-start: 10px;
  padding: 2px 10px;
  border-radius: 999px;
  background: ${(p) => p.theme.surface.raised};
  font-size: ${(p) => p.theme.typography.captionSize};
  font-weight: 500;
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
  border-radius: 12px 12px 0 0;

  img {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
  }

  ${(p) =>
    p.$hover &&
    `
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 12px 12px 0 0;
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

const Teacher = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${(p) => p.theme.typography.captionSize};
  color: ${(p) => p.theme.text.secondary};
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
