import { useEffect, useState, type ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { primaryButtonCss } from '../components/buttonStyles';
import { Icon } from '../components/Icon';
import { SegmentedControl } from '../components/SegmentedControl';
import { Dropdown } from '../editor/Dropdown';
import { ConfirmDialog } from '../editor/ConfirmDialog';
import { Toaster, toast } from '../editor/Toast';
import { ReaderRail } from '../reader/ReaderRail';
import { ReadSettings } from '../reader/ReadSettings';
import { RAIL_TOOLS } from '../reader/tools';
import { DEFAULT_PREFS } from '../reader/readerPrefs';
import { useClassroom } from './ClassReader';
import { Sprite } from './ShelfParts';
import * as L from './legacy.js';
import { html } from './h.js';

/**
 * 元件對照頁（開發用，網址加 ?specimen）：自編器原本的元件與課堂模組的元件並排，
 * 給 Figma「不一致的元件」那一區截圖。每一組的外框有 data-shot，截圖腳本照它拍。
 */
export function Specimen() {
  useClassroom();
  useEffect(() => {
    const S = L.getS();
    S.t.page = 0;
    if (new URLSearchParams(location.search).get('specimen') === 'toast-ed') toast('已刪除');
  }, []);
  const only = new URLSearchParams(location.search).get('specimen');
  // 蓋在整頁上的（對話框、提示）各自一頁拍
  if (only === 'dialog-ed') return <ConfirmDialog title="刪除「自然 5下」？" message="刪除後無法復原。" confirmLabel="刪除" onCancel={() => {}} onConfirm={() => {}} />;
  if (only === 'dialog-cr') return <CrStageLite>{html`<div class="scrim"><div class="dialog" role="alertdialog" style="width:440px"><div class="pop-h"><h4>要下課嗎？</h4></div><div class="pop-b"><div class="dialog-foot"><button class="btn sec sm">繼續上課</button><button class="btn sm">下課</button></div></div></div></div>`}</CrStageLite>;
  if (only === 'toast-ed') return <Toaster />;
  if (only === 'toast-cr') return <CrStageLite>{html`<div class="toasts"><div class="toast"><span class="t-ic ok"><svg class="i" width="15" height="15" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></span>已刪除</div></div>`}</CrStageLite>;
  return (
    <Page>
      <h1>元件對照（自編器原本 ↔ 課堂模組）</h1>
      <Pair id="button" title="主要／次要按鈕">
        <div style={{ display: 'flex', gap: 12 }}>
          <EdBtn type="button">開始上課</EdBtn>
          <EdBtnSec type="button">取消</EdBtnSec>
        </div>
        <Cr>{html`<div style="display:flex;gap:12px;padding:4px"><button class="btn">開始上課</button><button class="btn sec">取消</button><button class="btn sm">小按鈕</button></div>`}</Cr>
      </Pair>
      <Pair id="segment" title="分段切換">
        <SegmentedControl aria-label="示範" value="free" onChange={() => {}} options={[{ value: 'free', label: '自由閱讀' }, { value: 'lock', label: '鎖定螢幕' }]} />
        <Cr>{html`<div class="seg"><button aria-pressed="true">自由閱讀</button><button aria-pressed="false">鎖定螢幕</button></div>`}</Cr>
      </Pair>
      <Pair id="dropdown" title="下拉選單（收起）">
        <div style={{ width: 280 }}>
          <Dropdown aria-label="班級" value="501" onChange={() => {}} options={[{ value: '501', label: '501 · 自然（30 人）' }, { value: '502', label: '502 · 自然（30 人）' }]} />
        </div>
        <Cr>{html`<div style="width:280px"><div class="dd"><button type="button" class="dd-trigger"><span>501 · 自然（30 人）</span><svg class="i" width="16" height="16" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg></button></div></div>`}</Cr>
      </Pair>
      <Pair id="rail" title="閱讀畫面左欄（工具格、頁碼位置、補充資源數量）">
        <RailBox>
          <ReaderRail
            subject="自然科學"
            onExit={() => {}}
            outlineOpen={false}
            onOutline={() => {}}
            supplementCount={3}
            supplementOpen={false}
            onSupplements={() => {}}
            pageNumber={2}
            pageCount={12}
            onPrevPage={() => {}}
            onNextPage={() => {}}
            onGoPage={() => {}}
            toolboxOpen={false}
            settingsOpen={false}
            onSettings={() => {}}
            onToolbox={() => {}}
            pinned={RAIL_TOOLS}
            onUnpin={() => {}}
            tool="pen"
            onTool={() => {}}
            onClear={() => {}}
            canClear
            undo={() => {}}
            redo={() => {}}
            canUndo
            canRedo={false}
          />
        </RailBox>
        <RailBox>
          <Cr>
            <div className="reader" style={{ position: 'relative', height: 820, width: 104 }}>
              <L.Rail side="teacher" />
            </div>
          </Cr>
        </RailBox>
      </Pair>
      <Pair id="readsettings" title="閱讀設定面板">
        <Contain style={{ height: 300 }}>
          <ReadSettings prefs={{ ...DEFAULT_PREFS }} onChange={() => {}} baseSize={20} baseLineHeight={1.6} />
        </Contain>
        <Contain style={{ height: 300 }}>
          <Cr><div style={{ position: 'relative' }}><LegacySettings /></div></Cr>
        </Contain>
      </Pair>
      <Pair id="empty" title="空狀態">
        <EdEmpty>
          <span className="ic"><Icon name="ghost" size={24} /></span>
          <b>這裡還沒有自編教材</b>
        </EdEmpty>
        <EdEmpty>
          <Sprite size={96} />
          <b>這裡還沒有自編教材</b>
        </EdEmpty>
      </Pair>
    </Page>
  );
}

function LegacySettings() {
  const [v, setV] = useState(0);
  void v;
  void setV;
  const S = L.getS();
  S.t.prefs = S.t.prefs || { ...DEFAULT_PREFS, ruby: false };
  return html`<div class="pop rs-pop" style="position:static" role="dialog">${['文字大小', '行距'].map((l) => html`<div class="rs-row"><span>${l}</span><div class="stepper"><button>−</button><b>${l === '行距' ? '1.6' : '20'}</b><button>+</button></div></div>`)}<div class="rs-row"><span>字體</span><div class="pill-seg"><button class="on">預設</button><button>楷體</button><button>黑體</button></div></div><div class="rs-row"><span>顯示注音</span><button class="switch"><i></i></button></div></div>`;
}

function Pair({ id, title, children }: { id: string; title: string; children: ReactNode[] }) {
  return (
    <Row data-shot={id}>
      <h2>{title}</h2>
      <Cols>
        <Col data-shot-side="ed">
          <small>自編器原本</small>
          {children[0]}
        </Col>
        <Col data-shot-side="cr">
          <small>課堂模組（師生同步）</small>
          {children[1]}
        </Col>
      </Cols>
    </Row>
  );
}

const CrStageLite = ({ children }: { children: ReactNode }) => <div className="cr cr-fixed"><div className="stage" style={{ width: '100%', height: '100%' }}>{children}</div></div>;
const Cr = ({ children }: { children: ReactNode }) => <div className="cr cr-inline">{children}</div>;

const Page = styled.div`
  padding: 32px;
  background: ${(p) => p.theme.surface.raised};
  min-height: 100vh;
  overflow: auto;
  height: 100vh;
  h1 { font-size: 24px; margin: 0 0 24px; }
  h2 { font-size: 16px; margin: 0 0 12px; }
`;
const Row = styled.section`
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid ${(p) => p.theme.border.subtle};
  border-radius: 16px;
`;
const Cols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  small { color: ${(p) => p.theme.text.tertiary}; }
`;
const Contain = styled.div`
  position: relative;
  transform: translateZ(0);
  width: 560px;
  height: 260px;
  overflow: hidden;
  border-radius: 12px;
  background: ${(p) => p.theme.surface.backdrop};
`;
const RailBox = styled.div`
  position: relative;
  transform: translateZ(0);
  width: 120px;
  height: 820px;
  display: flex;
  background: ${(p) => p.theme.surface.backdrop};
  border-radius: 12px;
`;
const EdBtn = styled.button`${primaryButtonCss}`;
const EdBtnSec = styled.button`
  ${primaryButtonCss};
  background: ${(p) => p.theme.action.secondaryBg};
  color: ${(p) => p.theme.action.secondaryText};
  ${css`border: 1px solid ${(p) => p.theme.action.secondaryBorder};`}
`;
const EdEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  .ic { width: 96px; height: 96px; border-radius: 50%; background: ${(p) => p.theme.surface.sunken}; color: ${(p) => p.theme.text.tertiary}; display: grid; place-items: center; }
`;
