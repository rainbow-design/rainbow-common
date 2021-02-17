import { Dom } from '../../src/common/modules/dom';

test('"Dom"', () => {
  document.body.innerHTML = `<div id="app">
   <ul>
   <li class="first">1</li>
   <li class="second">2</li>
   <li class="third">3</li>
   </ul>
  </div>`;

  // $
  let UL = Dom.$('#app ul');
  expect(UL).not.toBe(null);

  // $$
  let LI = Dom.$$('#app ul li');
  expect(LI.length).toEqual(3);

  // index
  let LI__first = Dom.$('#app .first');
  expect(Dom.index(LI__first)).toBe(0);

  // siblings
  expect(Dom.siblings(LI__first).length).toBe(2);

  // every & getStyle
  Dom.every(LI, (dom) =>
    Dom.css(dom, { color: '#ff0000', 'font-size': '18px' }),
  );

  // create & (append || prepend)
  let LI_fourth = Dom.create(' <li class="fourth">4</li>');
  Dom.append(Dom.$('#app ul'), [LI_fourth]);
  expect(Dom.$$('#app ul li').length).toEqual(4);

  let LI_Zero = Dom.create(' <li class="fourth">5</li>');
  Dom.prepend(Dom.$('#app ul'), [LI_Zero]);
  expect(Dom.$$('#app ul li').length).toEqual(5);

  // remove
  Dom.remove(Dom.$$('#app ul li'));
  expect(Dom.$$('li').length).toEqual(0);
});
