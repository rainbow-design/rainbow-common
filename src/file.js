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
export function getFileBase64(img, callback) {
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
export function getFileFormData(file, key) {
  var formdata = new FormData();
  formData.append(key, file[0]);
  return formdata;
}
