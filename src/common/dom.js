import { isFunction, isObject } from './core';
export function loadJs(url, callback, attr) {
  if (!isFunction(callback)) {
    attr = callback;
    callback = null;
  }
  return new Promise((resolve, reject) => {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (isObject(attr)) {
      Object.keys(attr).forEach((key) => {
        if (attr.hasOwnProperty(key)) {
          script.setAttribute(key, attr[key]);
        }
      });
    }
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          isFunction(callback) && callback();
          resolve();
        }
      };
    } else {
      script.onload = function () {
        isFunction(callback) && callback();
        resolve();
      };
    }
    script.onerror = function () {
      reject();
    };
    script.src = url;
    document.head.appendChild(script);
  });
}

export function getClickImgPos(e) {
  const getPosition = (w, img) => {
    let width = img.naturalWidth || 750;
    return (num * width) / img.width;
  };
  let x = getPosition(e.offsetX, e.target);
  let y = getPosition(e.offsetY, e.target);
  return [x, y];
}

export function checkInView(el) {
  let rect = el.getBoundingClientRect();
  const options = {
    preLoad: 1.3, // 1.3的距离是 还未展示的dom距离视口顶部的高度小于视口高度的1.3 倍时就开始加载图片了
    preLoadTop: 0, //  dom的底部距离页面顶部多少距离还是加载
  };
  return (
    rect.top < window.innerHeight * options.preLoad &&
    rect.bottom > options.preLoadTop &&
    rect.left < window.innerWidth * options.preLoad &&
    rect.right > 0
  );
}

export function saveTextToClipBoard(text) {
  let copyInput = document.createElement('input');
  copyInput.type = 'text';
  copyInput.value = text;
  document.body.appendChild(copyInput);
  copyInput.select();
  // 执行浏览器复制命令
  document.execCommand('Copy');
  document.body.removeChild(copyInput);
}

/**
 *
 * @param {*} file input.files[0]
 * @returns 本地缓存 blob 路径
 */
export function getFileURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

/**
 * 获取图片以 base64 的格式读取
 *
 * @param {*} img
 * @param {*} callback
 */
export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.onabort = () => console.log('file reading was aborted');
  reader.onerror = () => console.log('file reading has failed');
  // 也可以直接指定  reader.onload
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

/**
 * 通过 formData 的形式获取 file 文件
 * @param {*} file
 * @param {*} key 传递 forData 的 参数 键
 * @returns
 */
export function getFileByFormData(file, key) {
  var formdata = new FormData();
  formData.append(key, file[0]);
  return formdata;
}

export function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    console.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    console.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
