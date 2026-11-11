import type { Area } from '../shelf/nav';
import type { Role } from '../shelf/role';
import { CrStage, useClassroom } from './ClassReader';
import * as L from './legacy.js';

/** 書櫃白色面板裡的課堂區域：班級星艦（老師）、補給站（老師）、帳號管理（管理員） */
export function ShelfArea({ area }: { area: Area }) {
  useClassroom();
  const S = L.getS();
  return (
    <div className="cr cr-inline">
      <div className="shelf-panel cr-area">
        {area === 'classes' ? S.t.classView ? <L.ClassPage /> : <L.MyClasses /> : area === 'space' ? <L.Space /> : <L.Accounts />}
      </div>
    </div>
  );
}

/** 書櫃上的課堂浮層：班級、帳號的對話框，學生的上課邀請與形狀夥伴，課堂的提示 */
export function ShelfOverlay({ side }: { side: Role }) {
  useClassroom();
  const S = L.getS();
  const t = S.t;
  return (
    <div className="cr cr-overlay">
      <div className="stage">
        {side === 'teacher' && S.stn.modal && S.stn.modal.detail && <L.StnDetail r={S.stn.modal.detail} />}
        {side === 'teacher' && t.modal === 'join' && <L.JoinDialog />}
        {side === 'teacher' && t.modal && t.modal.edit && <L.StudentEdit />}
        {side === 'teacher' && t.modal && t.modal.remove && <L.RemoveConfirm />}
        {side === 'teacher' && t.modal && t.modal.cards && <L.AccountCards />}
        {side === 'teacher' && t.modal === 'apply' && <L.ApplyDialog />}
        {side === 'admin' && <L.AdminModals />}
        {S.profile && S.profile.side === side && <L.ProfileDialog />}
        {side === 'student' && S.s.avatar && <div className="cr-buddy"><L.ShelfBuddy /></div>}
        {side === 'student' && S.s.invite && S.cls.live && <L.Invite />}
        <L.Toasts side={side} />
      </div>
    </div>
  );
}

/** 小精靈：形狀夥伴（幾何形狀加眼睛），空狀態用 */
export function Sprite({ size = 96, shape = 'lime', eye = 'big' }: { size?: number; shape?: string; eye?: string }) {
  return (
    <span className="cr cr-inline" style={{ display: 'inline-grid' }}>
      <L.Companion shape={shape} eye={eye} box={size} cls="bob" />
    </span>
  );
}

export { CrStage };
