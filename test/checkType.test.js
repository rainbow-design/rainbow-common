import { checkType } from '../src/common';

test('null is empty type.', () => {
  expect(checkType(null, 'empty')).toBe(true);
});

test('undefined is empty type.', () => {
  expect(checkType(undefined, 'empty')).toBe(true);
});

test('"" is empty type.', () => {
  expect(checkType('', 'empty')).toBe(true);
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

test('"123" is money type.', () => {
  expect(checkType('123', 'money')).toBe(true);
});

test('"-0.99" is money type.', () => {
  expect(checkType('-0.99', 'money')).toBe(true);
});

test('"235.09" is money type.', () => {
  expect(checkType('235.09', 'money')).toBe(true);
});

test('"-1,900" is money type.', () => {
  expect(checkType('-1,900', 'money')).toBe(true);
});

test('"ooz" is number type.', () => {
  expect(checkType('ooz', 'english')).toBe(true);
});

test('"中山" is allChinese type.', () => {
  expect(checkType('中山', 'chinese')).toBe(true);
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

test('"14012213331119987x" is IDCard type.', () => {
  expect(checkType('230227198302151067', 'IDCard')).toBe(true);
});
