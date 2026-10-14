import { Component, type ReactNode } from 'react';
import styled from 'styled-components';

type Props = { children: ReactNode; label?: string };
type State = { error: Error | null };

/**
 * 一個元件畫壞了，不要把整本教材拉下水。
 *
 * 老師的一課有幾十個元件；某一種元件的呈現出錯（通常是資料對不上新的欄位），
 * 沒有這一層的話整個畫面會變成空白，老師連其他段落都看不到、也救不回來。
 * 有了它，壞掉的那一格顯示一個說明框，其餘照常，復原或刪掉它就好。
 */
export class BlockErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidUpdate(prev: Props) {
    // 內容換了就再試一次畫：復原之後不該還停在錯誤框
    if (prev.children !== this.props.children && this.state.error) this.setState({ error: null });
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <Broken role="alert">
        <strong>{this.props.label ?? '這個元件'}暫時畫不出來</strong>
        <span>{this.state.error.message}</span>
      </Broken>
    );
  }
}

const Broken = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border: ${(p) => p.theme.border.widthDefault} dashed ${(p) => p.theme.feedback.errorDefault};
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.feedback.errorSurface};
  color: ${(p) => p.theme.feedback.errorDefault};
  font-size: var(--ds-typography-label-size);
  writing-mode: horizontal-tb;
  word-break: break-word;
`;
