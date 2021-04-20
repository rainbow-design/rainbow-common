import { encrypt, decrypt } from './encrypt';
import { stringify } from './core';

/**
 * 是否为空
 * @param {any} o 待判断对象
 */
export function isEmpty(o) {
  return (
    !o ||
    o == undefined ||
    0 == 'undefined' ||
    (o.constructor == Object && JSON.stringify(o) == '{}')
  );
}

/**
 * ajax请求
 * @param {string} 请求链接
 * @param {string} 方法名，post|get
 * @param {object} 请求头
 * @param {params} 参数
 */
export function ajax({
  url = '',
  method = 'GET',
  headers = {},
  params = {},
} = {}) {
  return new Promise((resolve, reject) => {
    try {
      let xhr = new XMLHttpRequest();
      url =
        method == 'GET' && !isEmpty(params)
          ? url + '?' + stringify(params)
          : url;
      xhr.open(method, url, false);
      for (const key of Object.keys(headers)) {
        xhr.setRequestHeader(key, headers[key]);
      }
      if (isEmpty(headers)) {
        if (method === 'GET') {
          xhr.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded',
          );
        } else {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
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
  });
}

/**
 * 设置localStorage缓存
 * @param {string} key 缓存名称
 * @param {string} value 缓存值
 * @param {number} expires 超时时间，单位小时
 */
export function setStorage(key, value, expires = 2) {
  value = encrypt(value);
  const deadline = new Date().getTime() + expires * 60 * 60 * 1000;
  localStorage.setItem(key, [value, deadline].join('___'));
}

/**
 * 获取缓存
 * @param {string} key 缓存键名
 */
export function getStorage(key) {
  let item = localStorage.getItem(key);
  if (!item) return '';
  let [value, deadline] = item.split('___');
  if (deadline && new Date().getTime() > deadline) {
    localStorage.removeItem(key);
    return '';
  }
  return decrypt(value);
}
