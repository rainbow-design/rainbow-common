import { reputUrl, getQueryJson } from '../src/common';

let href =
  'https://baidu.com/#/confirm?tkProductId=S20200359&applicationId=1381794509213245440&applicationToken=c4abc6798b354f72f7fa60f3d2f56500&proposal_id=1381794509213245440&prepay_id=0D58F876B7';

let urlStr = 'http://www.baidu.com?action=1&toobar=0';

test(`reputUrl`, () => {
  expect(
    reputUrl({
      url: href,
      params: { location: 'beijing', sexCode: 1 },
      exclude: ['proposal_id', 'prepay_id'],
    }),
  ).toEqual(
    'https://baidu.com/#/confirm?tkProductId=S20200359&applicationId=1381794509213245440&applicationToken=c4abc6798b354f72f7fa60f3d2f56500&location=beijing&sexCode=1',
  );
});

test(`getQueryJson`, () => {
  expect(getQueryJson(urlStr)).toEqual({ action: '1', toobar: '0' });
});
