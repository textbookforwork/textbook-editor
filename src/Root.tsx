import { useEffect } from 'react';
import { App } from './App';
import { loadDoc } from './editor/persist';
import { Shelf } from './shelf/Shelf';
import { findTextbook, textbookDoc } from './shelf/catalog';
import { findBook } from './shelf/library';
import { sourceDoc } from './shelf/sources';
import { goShelf, useRoute } from './shelf/nav';
import { Login } from './shelf/Login';
import { useSignedIn } from './shelf/session';

/**
 * 最外層：沒登入一律先到登入頁（見 shelf/session.ts）；登入後依網址決定是書櫃還是編輯器（見 shelf/nav.ts）。
 * 編輯器以那一本的 id 當 key，換一本就整個重開，不會帶著上一本的復原紀錄與選取。
 */
export function Root() {
  const route = useRoute();
  const signedIn = useSignedIn();

  const book = route.page === 'edit' || route.page === 'read' ? findBook(route.id) : null;
  const textbook = route.page === 'readTextbook' ? findTextbook(route.id) : null;
  const missing = (route.page === 'edit' || route.page === 'read') && !book;
  const missingTextbook = route.page === 'readTextbook' && !textbook;

  // 找不到那一本（被刪了、換了瀏覽器）就回書櫃，不要停在空白的編輯器
  useEffect(() => {
    if (signedIn && (missing || missingTextbook)) goShelf(missing ? 'mine' : 'textbook');
  }, [signedIn, missing, missingTextbook]);

  if (!signedIn) return <Login />;

  if (book) {
    const doc = loadDoc(book.id) ?? sourceDoc(book.sourceId);
    if (!doc) return null;
    return <App key={`${route.page}-${book.id}`} bookId={book.id} initialDoc={doc} startReading={route.page === 'read'} />;
  }
  if (textbook) {
    return <App key={`book-${textbook.id}`} bookId={null} initialDoc={textbookDoc(textbook)} readOnly />;
  }
  if (route.page !== 'shelf') return null;
  return <Shelf tab={route.tab} subject={route.subject} />;
}
