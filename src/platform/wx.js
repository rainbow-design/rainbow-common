import { isFunction } from './core';
import http from "../common/http/http";
import { loadJs } from '../common/dom';
class Wechat {
  constructor() {
    this.wechatUrl = "/wechat_item/rest/platform/wx/";
    this.isWeixin() && this.loadWeixinJS();
  }
  loadWeixinJS() {
    return this._weixinjs = window.jWeixin ? Promise.resolve() : new Promise((resolve, reject) => {
      loadJs('https://res2.wx.qq.com/open/js/jweixin-1.6.0.js', function () {
        resolve();
      })
    })
  }

  isWeixin() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    }
    return false;
  }

  //初始化微信
async wxInit(noShare, fn) {
    let data = {
      url: location.href
    };
    this._weixinjs = this._weixinjs || this.loadWeixinJS();
    this._wxInit = this._wxInit || this._weixinjs.then(() => {
      return http.post(`${location.origin}/wechat_item/rest/platform/wx/signiture`, data, { loading: false }).then(res => {
        // http.post(`${location.origin}/wechat_hera_v4/rest/platform/wx/signiture`, data, { loading: false }).then(res => {
        res = res.data.data;
        var t = res.timestamp;
        var n = res.noncestr;
        var s = res.signature;
        this.wxConfig(t, n, s);
        noShare && this.wxMenuInit();
      });
    });
    await this._wxInit;
    fn && fn();
  }

  //配置微信
  wxConfig(t, n, s) {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端 alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: "", // 必填，公众号的唯一标识
      timestamp: t, // 必填，生成签名的时间戳
      nonceStr: "" + n + "", // 必填，生成签名的随机串
      signature: "" + s + "", // 必填，签名
      jsApiList: [
        "checkJsApi",
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "hideMenuItems",
        "showMenuItems",
        "hideAllNonBaseMenuItem",
        "showAllNonBaseMenuItem",
        "translateVoice",
        "startRecord",
        "stopRecord",
        "onRecordEnd",
        "playVoice",
        "pauseVoice",
        "stopVoice",
        "uploadVoice",
        "downloadVoice",
        "chooseImage",
        "previewImage",
        "uploadImage",
        "downloadImage",
        "getNetworkType",
        "openLocation",
        "getLocation",
        "hideOptionMenu",
        "showOptionMenu",
        "closeWindow",
        "scanQRCode",
        "chooseWXPay",
        "openProductSpecificView",
        "addCard",
        "chooseCard",
        "openCard"
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
  }
  //隐藏所有非基础按钮
  wxMenuInit() {
    wx.ready(function () {
      wx.hideAllNonBaseMenuItem(); // 复制链接用, 先打开, 上线时放开!!!!!
    });
  }
  /**
     * 微信分享
     * @param {*} options 
     * wxShare({
            title: "",分享标题
            title1: "",分享朋友圈标题
            desc: "",分享描述
            link: "",分享链接
            imgUrl: ""分享图标,
            success：function（）{} 用户确认分享后执行的回调函数
            cancel：function（）{}用户取消分享后执行的回调函数
        })
    */
  wxShare(options) {
    wx.ready(function () {
      // wx.hideAllNonBaseMenuItem(); // 复制链接用, 上线前打开
      var menuList = ["menuItem:share:appMessage", "menuItem:share:timeline"];
      if (options.hideTimeline) {
        var menuList = ["menuItem:share:appMessage"];
      }
      wx.showMenuItems({
        menuList: menuList
      });
      wx.onMenuShareAppMessage({
        title: options.title,
        desc: options.desc,
        link: options.link,
        imgUrl: options.imgUrl,
        success: options.success || function () { },
        cancel: options.cancel || function () { }
      });

      if (!options.hideTimeline) {
        wx.onMenuShareTimeline({
          title: options.title,
          link: options.link,
          imgUrl: options.imgUrl,
          success: options.success || function () { },
          cancel: options.cancel || function () { }
        });
      }
    });
    wx.error(res => {
      console.log(res);
    });
  }

  //扫一扫
  wxScanQRCode(cb) {
    let _this = this;
    wx.ready(function () {
      wx.scanQRCode({
        desc: "scanQRCode desc",
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var b = res;
          if (isFunction(cb)) {
            cb(b);
          } else {
            return;
          }
        },
        error: function (res) {
          if (res.errMsg.indexOf("function_not_exist") > 0) {
            // alert("版本过低请升级");
          }
        }
      });
    });
    wx.error(res => {
      console.log(res);
    });
  }

  //选择图片
  chooseimg(cb) {
    let _this = this;
    wx.ready(function () {
      wx.chooseImage({
        count: 1, //默认9
        sizeType: ["original"], //可以指定是原图还是压缩图 original原图，compressed 压缩图
        sourceType: ["album", "camera"], //可以指定来源是相册还是相机
        success: function (res) {
          var b = res.localIds; //返回照片的本地id列表 localid可以作为img的src使用
          if (isFunction(cb)) {
            cb(b);
          } else {
            return b;
          }
        }
      });
    });
  }
  //上传图片
  uploadimg(locimgs, cb) {
    var loc = locimgs; //需要上传的图片的本地id
    var serverId = [];
    let _this = this;
    wx.ready(function () {
      if (loc.length == 0) {
        // alert("请先使用 chooseImage 接口选择图片");
        return;
      }
      var i = 0,
        length = loc.length;

      function upload() {
        wx.uploadImage({
          localId: loc[i], //需要上传的图片的本地id 有chooseimages获取
          success: function (res) {
            i++;
            serverId.push(res.serverId); //res.serverId返回退片的服务器端ID
            if (i < length) {
              upload();
            } else {
              if (isFunction(cb)) {
                cb(serverId);
              } else {
                return;
              }
            }
          },
          fail: function (res) { }
        });
      }
      upload();
    });
  }
  //定义隐藏不用的按钮
  wxHideMenuInit() {
    let url = location.origin + this.wechatUrl + "signiture";
    let data = {
      url: location.href
    };
    http.post(url, data).then(({data}) => {
      var t = data.timestamp;
      var n = data.noncestr;
      var s = data.signature;
      // try {
      this.wxConfig(t, n, s);
      wx.ready(() => {
        wx.hideMenuItems({
          menuList: [
            "menuItem:share:qq",
            "menuItem:share:weiboApp",
            "menuItem:share:facebook",
            "menuItem:share:QZone",
            "menuItem:share:appMessage",
          ]
        });
      });
    });
  }
  //批量隐藏功能按钮
  hideAllNonBaseMenuItem(cb) {
    let _this = this;
    wx.hideAllNonBaseMenuItem({
      success: function (cb) {
        // alert("已隐藏所有非基本接口");
        if (isFunction(cb)) {
          cb();
        } else { }
      }
    });
  }
  //批量显示功能按钮
  showAllNonBaseMenuItem(cb) {
    let _this = this;
    wx.showAllNonBaseMenuItem({
      success: function () {
        if (isFunction(cb)) {
          cb();
        } else {
          return;
        }
      }
    });
  }
  //关闭当前网页窗口
  closeWindow(cb) {
    let _this = this;
    wx.closeWindow();
    if (isFunction(cb)) {
      cb();
    } else {
      return;
    }
  }
  //隐藏右上角菜单
  hideOptionMenu() {
    wx.hideOptionMenu();
  }
  //显示右上角带单
  showOptionMenu() {
    wx.showOptionMenu();
  }
  /*
   *获取oauth链接 
   */
  async getOauth(curUrl, type = "getUnionId") {
    let params = {
      platform_id: "wx",
      url: curUrl
    };
    let url = `${location.origin}/wechat_item/rest/platform/wx/${type === "getUnionId" ? "authorUrl" : "shareUrl"}`;
    let {data: res} = await http.post(url, params, { loading: false });
    if (res.error_code == "0") {
      location.replace(res.data.authorUrl || res.data.oathUrl);
      return true;
    }
    return false;
  }

  changeFont() {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
      this.handleFontSize();
    } else {
      if (document.addEventListener) {
        document.addEventListener(
          "WeixinJSBridgeReady",
          this.handleFontSize,
          false
        );
      } else if (document.attachEvent) {
        //IE浏览器，非W3C规范
        document.attachEvent("onWeixinJSBridgeReady", this.handleFontSize);
      }
    }
  }

  handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on('menu:setfont', function () {
      WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
    });
  }

}
export default new Wechat();
