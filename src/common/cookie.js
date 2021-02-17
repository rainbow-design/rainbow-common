// TODO: 像 Storage 一样封装
export function setCookie(key, value) {
  document.cookie = key + '=' + escape(value) + ';path=/;';
  document.cookie = key + '=' + escape(value) + ';path=/;domain=tk.cn';
}
export function getCookie(key) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(key + '=');
    if (c_start != -1) {
      c_start = c_start + key.length + 1;
      let c_end = document.cookie.indexOf(';', c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return '';
}
export function clearCookie(key) {
  if (key) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(key);
    if (cval != null) {
      document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString();
    }
  }
}

export function setCookieShare(name, value) {
  document.cookie = name + '=' + escape(value) + ';path=/;expires=' + ';';
}
export function getCookieShare(name) {
  var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
  if (arr != null) return unescape(arr[2]);
  return null;
}
