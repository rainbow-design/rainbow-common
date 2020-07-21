import { stringify } from '../core';
const RootUrl = ''; // dev

const http = (
  url,
  data = {},
  method,
  contentType = 'application/x-www-form-urlencoded',
  custom_post = false,
) => {
  const config__header = {
    'x-tenant-header': 'web-spcloud-sales',
    'Content-Type': contentType,
  };
  const token = localStorage.getItem('ACCESS_TOKEN') || '';
  // 设置参数 {token: false},可以不设置授权 header 头
  if (token && data.token === undefined) {
    config__header['Authorization'] = 'Bearer ' + token;
  }
  if (data.token === false) {
    delete data.token;
  }

  if (custom_post) {
    data = stringify(data);
  }

  return new Promise(function (resolve, reject) {
    axios({
      url: RootUrl + url,
      data: data,
      method: method,
      header: config__header,
      success: (res) => {
        if (res.statusCode == 200) {
          // wx.showLoading({
          //   title: '加载中',
          // })
          console.log('Request Successful', {
            url,
            params: data,
            result: res,
          });
          resolve(res);
        } else {
          console.log('Request Error', {
            url,
            params: data,
            result: res,
          });
          reject(res);
        }
      },
      complete: () => {},
      fail: (err) => {
        reject(err);
        console.log('failed --- 网络出错');
      },
    });
  });
};

const _get = (url, param = {}) => {
  return http(url, param, 'GET');
};

const _post = (url, param = {}, contentType = 'application/json') => {
  return http(url, param, 'POST', contentType);
};

const _put = (url, param = {}) => {
  return http(url, param, 'PUT');
};

const _delete = (url, param = {}) => {
  return http(url, param, 'DELETE');
};

const _post__qs = (url, param = {}) => {
  return http(url, param, 'POST', 'application/x-www-form-urlencoded', true);
};

export { _get, _post, _put, _delete, _post__qs, RootUrl };
