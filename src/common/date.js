
/**
 * 时间格式化方法
 * @param {String} 格式 yyyyMMdd hhmmssqqS
 * 将 Date 转化为指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2
 * 个占位符， 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子：
 * dateFormat("yyyy-MM-dd")            ==>  2018-07-18
 * dateFormat("yyyy-MM-dd hh:mm:ss")   ==>  2018-07-18 10:01:49
 * dateFormat("yyyy-MM-dd hh:mm:ss.S") ==>  2018-07-18 10:10:01.956
 * dateFormat("yyyy-M-d h:m:s.S")      ==>  2018-7-18 10:11:9.724
 * @param {Date} date 
 */
export function dateFormat(fmt,date) {
  date = date || new Date();
 var o = { 
  "M+" : date.getMonth()+1,     //月份 
  "d+" : date.getDate(),     //日 
  "h+" : date.getHours(),     //小时 
  "m+" : date.getMinutes(),     //分 
  "s+" : date.getSeconds(),     //秒 
  "q+" : Math.floor((date.getMonth()+3)/3), //季度 
  "S" : date.getMilliseconds()    //毫秒 
 }; 
 if(/([yY]+)/.test(fmt)) {
  fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
 }
 for(var k in o) {
  if(new RegExp("("+ k +")").test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  }
 }
 return fmt; 
}