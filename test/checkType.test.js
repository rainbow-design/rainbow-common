import { checkType } from '../src';

test('null is empty type.', () => {
  expect(checkType(null, 'empty')).toBe(true);
});

test('"13312345678" is phone type.', () => {
  expect(checkType('13312345678', 'phone')).toBe(true);
});

test('"1331234@qq.com" is email type.', () => {
  expect(checkType('1331234@qq.com', 'email')).toBe(true);
});

test('"123" is number type.', () => {
  expect(checkType('123', 'number')).toBe(true);
});

test('"ooz" is number type.', () => {
  expect(checkType('ooz', 'english')).toBe(true);
});

test('"中山" is allChinese type.', () => {
  expect(checkType('中山', 'allChinese')).toBe(true);
});

test('"中山1" is hasChinese type.', () => {
  expect(checkType('中山1', 'hasChinese')).toBe(true);
});

test('"123456" is pwd_normal type.', () => {
  expect(checkType('123456', 'pwd_normal')).toBe(false);
});

test('"123456" is IDCard type.', () => {
  expect(checkType('123456', 'IDCard')).toBe(false);
});
