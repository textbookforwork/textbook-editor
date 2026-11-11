import { useEffect } from 'react';
import { App } from './App';
import { loadDoc } from './editor/persist';
import { Shelf } from './shelf/Shelf';
import { findTextbook, textbookDoc } from './shelf/catalog';
import { adoptTextbook, findBook } from './shelf/library';
import { sourceDoc } from './shelf/sources';
import { goEdit, goRead, goReadTextbook, goShelf, useRoute, type Route } from './shelf/nav';
import { useRole } from './shelf/role';
import { Login } from './shelf/Login';
import { useSignedIn } from './shelf/session';
import { CrStage, useClassroom } from './classroom/ClassReader';
import { BRIDGE } from './classroom/bridgeSlot.js';
import * as L from './classroom/legacy.js';

/**
 * 最外層：沒登入一律先到登入頁（見 shelf/session.ts）；登入後依身分與網址決定畫面（見 shelf/nav.ts）。
 * 編輯器以那一本的 id 當 key，換一本就整個重開，不會帶著上一本的復原紀錄與選取。
 *
 * 學生（右上角頭像切成學生）另外走課堂模組的流程：第一次先選形狀夥伴、老師開課時跳出邀請、
 * 加入後打開老師上課的那一本、下課換成下課畫面（見 classroom/）。
 */
export function Root() {
  const route = useRoute();
  const signedIn = useSignedIn();
  const role = useRole();
  useClassroom();
  const admin = role === 'admin';
  const student = role === 'student';
  const S = L.getS();

  // 從閱讀畫面回書櫃（左欄最上面那顆、上課中按回首頁→下課）
  BRIDGE.onShelf = () => {
    const ps = student ? S.s : S.t;
    ps.screen = 'shelf';
    ps.pop = null;
    ps.tool = null;
    L.act(() => {})();
    goShelf(student || route.page === 'readTextbook' ? 'textbook' : 'mine');
  };

  const book = route.page === 'edit' || route.page === 'read' ? findBook(route.id) : null;
  const textbook = route.page === 'readTextbook' ? findTextbook(route.id) : null;
  const missing = (route.page === 'edit' || route.page === 'read') && !book;
  const missingTextbook = route.page === 'readTextbook' && !textbook;

  // 找不到那一本（被刪了、換了瀏覽器）就回書櫃，不要停在空白的編輯器
  useEffect(() => {
    if (signedIn && (missing || missingTextbook)) goShelf(missing ? 'mine' : 'textbook');
  }, [signedIn, missing, missingTextbook]);

  // 學生：登入後先看要不要選夥伴；上課中一律在老師上課的那一本
  const sScreen = S.s.screen;
  const classRoute = student && S.s.inClass && S.cls.live && S.cls.book ? routeOfBook(S.cls.book) : null;
  useEffect(() => {
    if (!signedIn || !student) return;
    if (sScreen === 'login') {
      L.studentLogin();
      L.act(() => {})();
      return;
    }
    if (sScreen === 'reader' && classRoute && !sameRoute(route, classRoute.route)) classRoute.go();
    // 不在課堂、也不在讀書，網址卻停在閱讀：回書櫃
    if (sScreen === 'shelf' && (route.page === 'read' || route.page === 'readTextbook') && S.s.inClass) goShelf('textbook');
    // 學生不能編輯，也沒有班級星艦等區域
    if (route.page === 'edit' || route.page === 'area') goShelf('textbook');
  });

  if (!signedIn) return <Login />;

  // 補給站的「插進自編」：課堂模組自己的編輯畫面
  if (!student && S.t.screen === 'editor') return <CrStage side="teacher"><L.StnEditor /></CrStage>;
  if (student) {
    if (sScreen === 'pick') return <CrStage side="student"><L.Pick /></CrStage>;
    if (sScreen === 'end') return <CrStage side="student"><L.EndScreen /></CrStage>;
  }

  const side = student ? 'student' : 'teacher';
  if (book) {
    const doc = loadDoc(book.id) ?? sourceDoc(book.sourceId);
    if (!doc) return null;
    return (
      <App
        key={`${route.page}-${book.id}-${role}`}
        bookId={book.id}
        initialDoc={doc}
        startReading={route.page === 'read' || student}
        readOnly={student}
        bookKey={`mine:${book.id}`}
        side={side}
      />
    );
  }
  if (textbook) {
    const doc = textbookDoc(textbook);
    // 管理員讀數位教科書，左欄多一顆「進入自編」：接手成自己的原本再進編輯（同書櫃「⋯」的進入編輯）
    const enterEdit = admin
      ? () => goEdit(adoptTextbook(textbook.id, doc, { subject: textbook.subject, publisher: textbook.publisher, cover: textbook.art ?? textbook.cover }).id)
      : undefined;
    return (
      <App
        key={`book-${textbook.id}-${role}`}
        bookId={null}
        initialDoc={doc}
        readOnly
        onEnterEdit={enterEdit}
        bookKey={`textbook:${textbook.id}`}
        side={side}
      />
    );
  }
  if (route.page === 'area') return <Shelf area={route.area} />;
  if (route.page !== 'shelf') return null;
  return <Shelf tab={route.tab} subject={route.subject} />;
}

function routeOfBook(key: string): { route: Route; go: () => void } | null {
  const [kind, id] = key.split(':');
  if (!id) return null;
  if (kind === 'textbook') return { route: { page: 'readTextbook', id }, go: () => goReadTextbook(id) };
  return { route: { page: 'read', id }, go: () => goRead(id) };
}

function sameRoute(a: Route, b: Route) {
  return a.page === b.page && 'id' in a && 'id' in b && a.id === b.id;
}
