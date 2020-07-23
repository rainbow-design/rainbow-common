import { Storage } from '../../src';

test('"Storage"', () => {
  Storage.setItem('name', 'rainbow');
  Storage.setItem('friend', 'rainbow');
  Storage.setItem('age', '26');

  expect(Storage.getItem('name')).toBe('rainbow');
  expect(Storage.getItem('joe')).toBe(null);
  expect(Storage.getItem()).toBe(null);

  Storage.removeItem('name');
  expect(Storage.getItem('name')).toBe(null);

  Storage.clear();
  expect(Storage.getItem('friend')).toBe(null);
  expect(Storage.getItem('age')).toBe(null);

  // 时效

  Storage.setItem('like', 'code', new Date(Date.now() + 1000));

  expect(Storage.getItem('like_expires')).not.toBe(null);
  // 1 秒后 过期获取不到
  setTimeout(() => {
    expect(Storage.getItem('like')).toBe(null);
    expect(Storage.getItem('like_expires')).toBe(null);
  }, 1500);
});
