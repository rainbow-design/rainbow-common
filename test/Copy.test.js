import { deepCopy, shallowCopy } from '../src';

const obj = {
  id: '1',
  name: 'yue',
  friend: 'heizi',
  like: ['song', 'basketball'],
};

const tree = [
  { id: 1, children: [{ id: 'child11' }, { id: 'child12' }] },
  { id: 2 },
  {
    id: 3,
    children: [{ id: 'child31' }, { id: 'child32', children: [{ id: '999' }] }],
  },
  { id: 4 },
];

describe('deepCopy', () => {
  test(`The result is obj.`, () => {
    expect(deepCopy(obj)).toEqual(obj);
  });

  const obj2 = deepCopy(obj);
  obj2['like'] = [];
  test(`The result is another obj.`, () => {
    expect(obj2).not.toEqual(obj);
  });

  test(`The result is tree.`, () => {
    expect(deepCopy(tree)).toEqual(tree);
  });
  const temp = deepCopy(tree);
  temp[0].id = 123;
  test(`The result is another tree.`, () => {
    expect(temp).not.toEqual(tree);
  });
});

describe('shallowCopy', () => {
  const obj2 = shallowCopy(obj);
  obj2['like'][0] = 'swim'; // 引用类型变更
  obj2['friend'] = 'joe'; // 基本类型变更
  test(`The result is another obj.`, () => {
    expect(obj['like']).toEqual(['swim', 'basketball']); // 原对象发生指针变化
    expect(obj['friend']).toEqual('heizi'); // 没有发生改变
  });
});
