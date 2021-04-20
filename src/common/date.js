
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

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

/**
 * 不规则的时间格式 补 0
 * @param {*} str "2019-5-21" "5"
 * @returns "2019-05-21"  "05"
 */
function dateAddZero(str) {
  return str.replace(/(?=\b\d\b)/g, '0');
}

export const getDateFormISO8601 = (dateStr) => {
  // 修改 new Date(ISO 8601 时间,eg: 2020-07-22T10:54:14.000+0000)为 ios 支持的 2020/07/22 10:54:14
  const replace = (str) => {
    let date = str.slice(0, 10).replace(/-/g, '/');
    let time = str.slice(11, 19);
    let res = date + ' ' + time;
    return res;
  };
  let timeStr = replace(dateStr);
  let date = new Date(timeStr);
  // 修正时间偏移量 8 小时 2020/07/22 18:54:14
  date.setHours(date.getHours() + 8);
  return date;
};

/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */
export function formatPassTime(startTime) {
  var currentTime = Date.parse(new Date()),
    time = currentTime - startTime,
    day = parseInt(time / (1000 * 60 * 60 * 24)),
    hour = parseInt(time / (1000 * 60 * 60)),
    min = parseInt(time / (1000 * 60)),
    month = parseInt(day / 30),
    year = parseInt(month / 12);

  if (year) return;
  year + '年前';

  if (month) return;
  month + '个月前';

  if (day) return;
  day + '天前';

  if (hour) return;
  hour + '小时前';

  if (min) return;
  min + '分钟前';

  return '刚刚';
}

/**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
export function formatRemainTime(endTime) {
  var startDate = new Date();
  //开始时间

  var endDate = new Date(endTime);
  //结束时间

  var t = endDate.getTime() - startDate.getTime();
  //时间差

  var d = 0,
    h = 0,
    m = 0,
    s = 0;

  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor((t / 1000 / 60 / 60) % 24);
    m = Math.floor((t / 1000 / 60) % 60);
    s = Math.floor((t / 1000) % 60);
  }

  return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒';
}

export const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

export const formatTime_zh = (timespan, flag = 1) => {
  var dateTime = getDateFormISO8601(timespan);
  timespan = dateTime.getTime();
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  /* var hour = dateTime.getHours()
   var minute = dateTime.getMinutes() */
  var now = new Date().getTime();
  var milliseconds = 0;
  var timeSpanStr;
  milliseconds = now - timespan;
  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚';
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60)) + '分钟前';
  } else if (
    1000 * 60 * 60 * 1 < milliseconds &&
    milliseconds <= 1000 * 60 * 60 * 24
  ) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  } else if (
    1000 * 60 * 60 * 24 < milliseconds &&
    milliseconds <= 1000 * 60 * 60 * 24 * 15
  ) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  } else {
    if (flag === 1) {
      timeSpanStr = year + '年' + month + '月' + day + '日';
    } else if (flag === 2) {
      timeSpanStr = month + '月' + day + '日';
    }
  }
  return timeSpanStr;
};

/* 在某时间之前 */
// isBeforeDate(new Date(2010, 10, 20), new Date(2010, 10, 21)); // true
export const isBeforeDate = (dateA, dateB) => dateA < dateB;
/* 在某时间之后 */
// isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)); // true
export const isAfterDate = (dateA, dateB) => dateA > dateB;

/**
 * 判断当前的操作是否在 允许的时间范围内
 * @param {*} begin_time "2019/04/26"
 * @param {*} end_time "2019-05-05"
 * @returns Boolean
 */
export function belongTimeRange(begin_time, end_time) {
  var timeStr = new Date().getTime();
  var start = new Date(begin_time).getTime();
  var end = new Date(end_time).getTime();
  return timeStr >= start && timeStr <= end;
}
