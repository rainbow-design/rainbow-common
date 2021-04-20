window.wxAuth = window.wxAuth || (function () {
  //openid缓存键名
  const OPEN_ID_KEY = "__OPEN_ID";
  //unionid缓存键名
  const UNION_ID_KEY = "__UNION_ID";
  //授权标识位
  const AUTH_KEY = '__AUTH_FLAG';

  //初始化
  (function initWxInfo() {
    try {
      //仅微信环境走缓存逻辑
      if (!isWeixin() || isMiniProgram()) return;
      const openId = getOpenId();
      const unionId = getUnionId();
      const reauth = getLinkParam('reauth');
      const authed = sessionStorage.getItem(AUTH_KEY) === 'Y';
      // reauth参数用于解决特殊情况下,本地缓存非当前微信openId和unionId的情况
      // 清空已有缓存，走授权逻辑
      if (reauth === 'Y') {
        localStorage.removeItem(OPEN_ID_KEY);
        localStorage.removeItem(UNION_ID_KEY);
        //重置reauth为N，避免循环授权
        location.href = location.href.replace(/reauth\=Y/ig, 'reauth=N');
      } else if (authed) {
        //仅授权标识位为Y或者小程序环境下重新缓存数据
        openId && setStorage(OPEN_ID_KEY, openId);
        openId && unionId && setStorage(UNION_ID_KEY, unionId);
        sessionStorage.removeItem(AUTH_KEY);
      }
    } catch (err) {
      console.log(err);
    }
  })();

  /**
   * 获取openid
   * 小程序环境会传入mpOpenId,仅从链接获取
   */
  function getOpenId() {
    return (isMiniProgram() ? getLinkParam('mpOpenId') : (getLinkParam('openid') || getStorage(OPEN_ID_KEY))) || '';
  }
  /**
   * 获取unionid
   */
  function getUnionId() {
    let userInfo = getLinkParam('userInfo');
    try {
      userInfo && (userInfo = JSON.parse(decodeURIComponent(userInfo)));
    } catch (err) {
      console.log(err);
    }
    return userInfo.unionId || getLinkParam('unionid') || getStorage(UNION_ID_KEY) || '';
  }

  /**
   * 将参数对象转换为a=1&b=2字符串格式
   * @param {object} params 待转换的参数对象
   */
  function stringify(params = {}) {
    let str = '';
    for (const key of Object.keys(params)) {
      str += `&${key}=${params[key]}`
    }
    return str.substring(1);
  }

  /**
   * 是否为空
   * @param {any} o 待判断对象 
   */
  function isEmpty(o) {
    return !o || o == undefined || 0 == 'undefined' || (o.constructor == Object && JSON.stringify(o) == '{}')
  }

  /**
   * 从链接中获取参数值
   * @param {string} key 参数key 
   * @param {string} str 链接，默认取当前链接
   */
  function getLinkParam(key, str = location.href) {
    if (!key) return '';
    let result = '';
    const regex = new RegExp(`[\?&]${key}=([^&#]+)`, 'i');
    if (regex.test(str)) {
      result = str.match(regex)[1];
    }
    return result;
  }

  /**
   * 是否微信环境
   */
  function isWeixin() {
    return /MicroMessenger/i.test(window.navigator.userAgent);
  }
  /**
   * 是否微信小程序环境
   */
  function isMiniProgram() {
    return isWeixin() && (window.__wxjs_environment === 'miniprogram' || /miniprogram/i.test(window.navigator.userAgent));
  }

  /**
   * ajax请求
   * @param {string} 请求链接 
   * @param {string} 方法名，post|get 
   * @param {object} 请求头 
   * @param {params} 参数 
   */
  function ajax({
    url = '',
    method = 'GET',
    headers = {},
    params = {}
  } = {}) {
    return new Promise((resolve, reject) => {
      try {
        let xhr = new XMLHttpRequest();
        url = method == 'GET' && !isEmpty(params) ? url + '?' + stringify(params) : url;
        xhr.open(method, url, false);
        for (const key of Object.keys(headers)) {
          xhr.setRequestHeader(key, headers[key]);
        }
        //同步请求需要在send前注册
        xhr.onreadystatechange = function () {
          // 这步为判断服务器是否正确响应
          if (xhr.readyState == 4 && xhr.status == 200) {
            let ret = xhr.response;
            try {
              ret = JSON.parse(ret);
            } catch (err) {
              console.log(err);
            }
            resolve(ret);
          } else if (xhr.readyState == 4 && xhr.status != 200) {
            reject(xhr.response);
          }
        };
        xhr.send(method == 'POST' ? JSON.stringify(params) : '');
      } catch (err) {
        reject(err);
      }
    })
  }

  /**
   * 设置localStorage缓存
   * @param {string} key 缓存名称
   * @param {string} value 缓存值
   * @param {number} expires 超时时间，单位小时 
   */
  function setStorage(key, value, expires = 2) {
    value = encrypt(value);
    const deadline = new Date().getTime() + expires * 60 * 60 * 1000;
    localStorage.setItem(key, [value, deadline].join('___'));
  }

  /**
   * 获取缓存
   * @param {string} key 缓存键名 
   */
  function getStorage(key) {
    let item = localStorage.getItem(key);
    if (!item) return '';
    let [value, deadline] = item.split('___');
    if (deadline && new Date().getTime() > deadline) {
      localStorage.removeItem(key);
      return '';
    }
    return decrypt(value);
  }

  /**
   * 数据移位加密
   * @param {string} str 明文
   */
  function encrypt(str) {
    let newArray = [];
    str = encodeURIComponent(str);
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      //偶数位+1 奇数位-1
      newArray[i] = String.fromCharCode(i % 2 == 0 ? code + 1 : code - 1);
    }
    return newArray.join('');

  }

  /**
   * 解密
   * @param {string} str 密文 
   */
  function decrypt(str) {
    let newArray = [];
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      newArray[i] = String.fromCharCode(i % 2 == 0 ? code - 1 : code + 1);
    }
    return decodeURIComponent(newArray.join(''));
  }

  return {
    /**
     * 微信OAuth授权
     * @param {boolean} insensible 是否无感知的（仅获取openid，获取userInfo传入false）
     * @param {string} redirectUrl 授权完成后重定向链接
     */
    getOauth: function (insensible = false, redirectUrl = location.href) {
      if (isWeixin() && !isMiniProgram() && ((insensible && !getOpenId()) || (!insensible && (!getOpenId() || !getUnionId())))) {
        ajax({
          url: `${location.origin}/wechat_item/rest/platform/wx/${insensible ? 'shareUrl' : 'authorUrl'}`,
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          params: {
            url: redirectUrl,
            platform_id: 'wx'
          }
        }).then(res => {
          if (res.error_code === '0') {
            //设置授权标示位
            sessionStorage.setItem(AUTH_KEY, 'Y')
            location.replace(res.data[insensible ? 'oathUrl' : 'authorUrl']);
          }
        }).catch(err => {
          console.log(err);
        })
      }
    },
    getOpenId,
    getUnionId
  }
})()