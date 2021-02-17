import { Event } from '../../src/common/modules/event';

test('"Event"', () => {
  // 先订阅
  Event.$on('add', (res) => {
    expect(res).toEqual({ num: 1 });
  });
  Event.$emit('add', { num: 1 });
  Event.$off('add');
  expect(Event._cache).toEqual({ add: null });

  // once
  Event._cache = {}; // reset
  Event.$once('once', (res) => {
    expect(res).toEqual({ num: 2 });
  });

  Event.$emit('once', { num: 2 });
  Event.$emit('once', { num: 2 });
  expect(Event._cache).toEqual({ once: [] });

  // $off 不传参
  Event.$off();
  expect(Event._cache).toEqual({});

  // 先发布
  Event.$pub('less', { num: 3 });
  Event.$sub('less', (res) => {
    expect(res).toEqual({ num: 3 });
  });
  Event.$remove('less');
  expect(Event._cache__reverse).toEqual({ less: null });
  Event._cache__reverse = {}; // reset

  // 先发布多个
  Event.$pub('many', { num: 4 });
  Event.$pub('many', { num: 5 });
  Event.$pub('many', { num: 6 });
  expect(Event._cache__reverse).toEqual({
    many: [{ num: 4 }, { num: 5 }, { num: 6 }],
  });
});
