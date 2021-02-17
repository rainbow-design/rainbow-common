// TODO: 待导出
const http = (
  url,
  data = {},
  method,
  contentType = 'application/x-www-form-urlencoded',
  custom_post = false,
) => {};

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

// 参数拼接
const _post__qs = (url, param = {}) => {
  return http(url, param, 'POST', 'application/x-www-form-urlencoded', true);
};

export { _get, _post, _put, _delete, _post__qs, RootUrl };
