export const inBrowser = typeof window !== 'undefined';

/*判断是否是微信内置浏览器*/
export function isWeixin() {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  }
  return false;
}
/*判断是否是微信小程序环境*/
export function isMiniProgram() {
  let ua = window.navigator.userAgent.toLowerCase();
  return (
    isWeixin() &&
    (window.__wxjs_environment === 'miniprogram' ||
      ua.match(/miniprogram/i) === 'miniprogram')
  );
}
/* 判断是否在app中 */
export function isApp() {
  return (
    window.hasOwnProperty('android') ||
    (window.hasOwnProperty('webkit') &&
      window.webkit.messageHandlers.hasOwnProperty('iphone'))
  );
}
/* 判断是否在wap中 */
export function isWap() {
  return !(isWeixin() || isMiniProgram() || isApp());
}
/**
 * 判断当前页面是否在android平台内
 * @return {bool}  如果是，返回true;否则返回false
 */
export function isAndroid() {
  return window.hasOwnProperty('android');
}
/**
 * 判断当前页面是否在iOS平台内
 * @return {bool}  如果是，返回true;否则返回false
 */
export function isIOS() {
  return (
    window.hasOwnProperty('webkit') &&
    window.webkit.messageHandlers.hasOwnProperty('iphone')
  );
}

export function isPC() {
  return !/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
}
