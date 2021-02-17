import { isDef } from './core';
import qs from 'querystring';

export function isUrl(url) {
  return /^htt(p|ps):\/\//.test(url);
}

export function addParamsToUrl(url = '', params = {}, addToHash = false) {
  let hashpos = url.indexOf('#');
  let hash = '';
  let path = url;
  let search = '';
  if (hashpos >= 0) {
    hash = url.slice(hashpos);
    path = url.slice(0, hashpos);
  }
  let str = addToHash ? hash : path;
  let cururlparams = (str && getQueryJson(str)) || {};
  params = {
    ...cururlparams,
    ...params,
  };
  let serachPos = path.indexOf('?');
  if (serachPos >= 0) {
    search = path.slice(serachPos);
    path = path.slice(0, serachPos);
  }

  addToHash ? (hash = hash.split('?')[0]) : (search = '');
  str = '';
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      str += '&' + key + '=' + params[key];
    }
  });
  if (str) {
    str = '?' + str.slice(1);
    if (addToHash) {
      hash = hash + str;
    } else {
      search = str;
    }
  }
  return path + search + hash;
}

/**
 * 拼接参数字符串给当前链接
 * @param {object} params 参数集
 * @param {string} url 源链接，默认取location.href
 * @param {string} exclude 要屏蔽的属性，用逗号分隔，例如分享他人时需要传入 'openid,unionId,userInfo'
 */
export function reputUrl({ params = {}, url, exclude = 'exclude' }) {
  if (!url) {
    url = location.href;
  }
  let options = {
    addQueryPrefix: true,
    sort: (a, b) => a.localeCompare(b),
    skipNulls: true,
  };
  if (exclude) {
    exclude = exclude.toLowerCase();
    options.filter = (key, value) => {
      if (key && exclude.includes(key.toLowerCase())) {
        return '';
      } else {
        return value;
      }
    };
  }
  const paramsStr = qs.stringify(params, options);
  return url.split('?')[0] + paramsStr;
}

/**
 * getQueryString  从url中拿参数值param
 * @param {str} param 要拿的参数名  字符
 * @param {str} url  要从什么链接上面拿参数  字符  支持密文  可选填
 * @return {str} 参数值
 */
export function getQueryString(param, url) {
  var searchUrl = window.location.href;
  if (url) {
    searchUrl = url.indexOf('?') ? url.substr(url.indexOf('?')) : searchUrl;
  }
  var reg = new RegExp('(^|&|\\?)' + param + '=([^&]*)(&|$)', 'i');
  var r = searchUrl.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]) || '';
  }
  return '';
}

/**
 * 从页面url中获取json（url是未被编码的明文格式）
 * <pre>url格式：http://www.baidu.com?action=1&toobar=0
 * @param {str} url  页面的url, 选传, 默认当前页面地址（url是未被编码的明文格式）
 * @returns {obj} json    json对象
 */
export function getQueryJson(url) {
  var json = {};
  var urlStr = isDef(url) ? url : location.href;
  var splits = urlStr.split('?');
  if (splits && splits.length >= 2) {
    var array = splits[1].split('&');
    if (array && array.length > 0) {
      for (var i = 0; i < array.length; i++) {
        var params = array[i].split('='); // 拆分形式为key=value形式的参数
        json[params[0]] = params[1]; // 第一个参数表示key，第二个参数表示value
      }
    }
  }
  return json;
}
