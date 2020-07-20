import { parse } from '../src';

let url =
  'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled';

test(`The result  is "{user: 'anonymous',
      id: [123, 456],
      city: '北京',
      enabled: true,}".`, () => {
  expect(parse(url.split('?')[1])).toEqual({
    user: 'anonymous',
    id: ['123', '456'], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
    city: '北京', // 中文
    enabled: true,
    d: true,
  });
});
