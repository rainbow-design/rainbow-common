/**
 * 判断数据类型
 *
 * @param {*} a
 * @returns Boolean String Array Object Function Number Undefined Null
 */
export const getType = (a) => {
  return Object.prototype.toString.call(a).slice(8, -1);
};

export const isNumber = (obj) => {
  return typeof obj === 'number';
};

export function isFunction(value) {
  return typeof value === 'function';
}

// 是否已定义
export const isDef = (value) => {
  if (
    value == null ||
    value == '' ||
    value == 'undefined' ||
    value == undefined ||
    value == 'null' ||
    value == '(null)' ||
    value == 'NULL' ||
    typeof value == 'undefined'
  ) {
    return false;
  } else {
    value = value + '';
    value = value.replace(/\s/g, '');
    if (value == '') {
      return false;
    }
    return true;
  }
};

export const isUndef = (v) => {
  return !isDef(v);
};

/**
 * 对象扩展
 *
 * @param {*} target
 * arguments obj ...
 * @returns obj
 */
export function extend(target) {
  for (var i = 1, len = arguments.length; i < len; i++) {
    for (var prop in arguments[i]) {
      if (arguments[i].hasOwnProperty(prop)) {
        target[prop] = arguments[i][prop];
      }
    }
  }
  return target;
}

/**
 * 四舍五入 格式化数字
 *
 * @param {*} number 8440.55
 * @param {*} fractionDigits 1 小数位数
 * @returns 8440.6
 */
export function toFixed(number, fractionDigits) {
  var times = Math.pow(10, fractionDigits);
  var roundNum = Math.round(number * times) / times;
  return roundNum.toFixed(fractionDigits);
}

export const sleep = (second) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, second * 1000);
  });
};

export const trim = (str) => {
  if (typeof str !== 'string') {
    throw new Error('trim 参数需要为 String 类型');
  }
  return str.replace(/(^\s*)|(\s*$)/g, '');
};

export function throttle(fn, wait = 1500) {
  let _lastTime = null;
  return function () {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > wait || !_lastTime) {
      fn.apply(this, arguments);
      _lastTime = _nowTime;
    }
  };
}

/**
 * 防抖 一定时间内连续调用只允许执行一次
 *
 * @param {*} func
 * @param {*} wait 等待时间
 * @param {*} immediate 传 true，首次调用即立即执行
 * @returns
 */
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var canApply = !timeout;
      timeout = setTimeout(function () {
        timeout = null; // 在 wait 时间后防抖函数才可以再次被触发
      }, wait);
      if (canApply) func.apply(context, args); // 第一次 !undefined 执行
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

export function once(fn) {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

// loadJs(location.origin + '/xxx.cdn/a.js').then(() => {})
export function loadJs(url, callback, attr) {
  if (!isFunction(callback)) {
    attr = callback;
    callback = null;
  }
  return new Promise((resolve, reject) => {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (isObject(attr)) {
      Object.keys(attr).forEach((key) => {
        if (attr.hasOwnProperty(key)) {
          script.setAttribute(key, attr[key]);
        }
      });
    }
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          isFunction(callback) && callback();
          resolve();
        }
      };
    } else {
      script.onload = function () {
        isFunction(callback) && callback();
        resolve();
      };
    }
    script.onerror = function () {
      reject();
    };
    script.src = url;
    document.head.appendChild(script);
  });
}
