import { describe, expect, it } from 'vitest';
import { parseRoute } from './nav';

describe('parseRoute', () => {
  it('各種網址對到畫面', () => {
    expect(parseRoute('')).toEqual({ page: 'shelf', tab: undefined });
    expect(parseRoute('#/shelf/mine')).toEqual({ page: 'shelf', tab: 'mine' });
    expect(parseRoute('#/edit/book-1')).toEqual({ page: 'edit', id: 'book-1' });
    expect(parseRoute('#/read/book/mulan')).toEqual({ page: 'readTextbook', id: 'mulan' });
    expect(parseRoute('#/read/book-1')).toEqual({ page: 'read', id: 'book-1' });
    expect(parseRoute('#/shelf/亂寫')).toEqual({ page: 'shelf', tab: undefined });
    expect(parseRoute('#/shelf/mine/%E7%A4%BE%E6%9C%83')).toEqual({ page: 'shelf', tab: 'mine', subject: '社會' });
  });
});
