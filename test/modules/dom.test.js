import { Dom } from '../../src';

test('"$"', () => {
  document.body.innerHTML = `<div><button></button></div>`;
  // $
  let button = Dom.$('button');
  expect(button).not.toBe(null);

  // index
  expect(Dom.index(button)).toBe(0);

  // remove
  Dom.remove(button);

  // $$
  let button__again = Dom.$$('button');
  expect(button__again).toEqual([]);
});
