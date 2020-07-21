export const Dom = {
  $: function (selector, el) {
    if (!el) {
      el = document;
    }
    return el.querySelector(selector);
  },

  $$: function (selector, el) {
    if (!el) {
      el = document;
    }
    return Array.prototype.slice.call(el.querySelectorAll(selector));
  },

  index: function (element) {
    var siblings = element.parentNode.children;
    for (var index = 0; index < siblings.length; index++) {
      if (siblings[index] === element) {
        return index;
      }
    }
    return -1;
  },

  every: function (nodeList, fn) {
    for (var i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i], i);
    }
    return nodeList;
  },

  siblings: function (obj) {
    var a = [];
    var p = obj.previousSibling;
    while (p) {
      //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
      if (p.nodeType === 1) {
        a.push(p);
      }
      p = p.previousSibling; //最后把上一个节点赋给p
    }
    a.reverse(); //把顺序反转一下 这样元素的顺序就是按先后的了
    var n = obj.nextSibling; //再取o的弟弟
    while (n) {
      //判断有没有下一个弟弟结点 n是nextSibling的意思
      if (n.nodeType === 1) {
        a.push(n);
      }
      n = n.nextSibling;
    }
    return a;
  },

  getStyle: function (ele, attr) {
    if (ele.currentStyle !== undefined) {
      return ele.currentStyle[attr];
    } else {
      return window.getComputedStyle(ele, null)[attr]
        ? window.getComputedStyle(ele, null)[attr]
        : ele.getAttribute(attr);
    }
  },

  css: function (target, cssObj) {
    for (var prop in cssObj) {
      target.style[prop] = cssObj[prop];
    }
    return target;
  },
  // http://stackoverflow.com/a/35385518/1262580
  create: function (html, children) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    var node = template.content.firstChild;
    if (children) {
      dom.append(node, children);
    }
    return node;
  },

  append: function (parent, children) {
    if (children.length === undefined) {
      children = [children];
    }
    for (var i = 0; i < children.length; i++) {
      parent.appendChild(children[i]);
    }
    return parent;
  },

  prepend: function (parent, children) {
    if (children.length === undefined) {
      children = [children];
    }
    for (var i = children.length - 1; i >= 0; i--) {
      if (parent.firstChild) {
        parent.insertBefore(children[i], parent.firstChild);
      } else {
        parent.appendChild(children[i]);
      }
    }
    return parent;
  },

  // el can be an Element, NodeList or query string
  remove: function (el) {
    if (typeof el === 'string') {
      [].forEach.call(document.querySelectorAll(el), (node) => {
        node.parentNode.removeChild(node);
      });
    } else if (el.parentNode) {
      // it's an Element
      el.parentNode.removeChild(el);
    } else if (el instanceof NodeList) {
      // it's an array of elements
      [].forEach.call(el, (node) => {
        node.parentNode.removeChild(node);
      });
    } else {
      throw new Error(
        'you can only pass Element, array of Elements or query string as argument',
      );
    }
  },
  /**
   *
   * @param {*} a dom 元素
   * @param {*} b 事件类型 click change scroll
   * @param {*} c function
   * @param {*} d  参数默认false=》冒泡，true为捕获
   */
  addEvent: function (a, b, c, d) {
    a.addEventListener
      ? a.addEventListener(b, c, d)
      : a.attachEvent('on' + b, c);
  },
  // removeEvent(dom, 'click', eMsgClose)
  removeEvent: function (a, b, c, d) {
    a.removeEventListener
      ? a.removeEventListener(b, c, d)
      : a.detachEvent('on' + b, c);
  },
  //获得事件元素
  //event.target--非IE
  //event.srcElement--IE
  getTarget: function (event) {
    return event.target || event.srcElement;
  },
};
