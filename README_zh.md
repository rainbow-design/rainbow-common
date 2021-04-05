# rainbow-common

[![NPM version](https://img.shields.io/npm/v/rainbow-common.svg?style=flat)](https://www.npmjs.com/package/rainbow-common) [![Build Status](https://travis-ci.org/rainbow-design/rainbow-common.svg?branch=master)](https://travis-ci.org/rainbow-design/rainbow-common) [![codecov](https://codecov.io/gh/rainbow-design/rainbow-common/branch/master/graph/badge.svg)](https://codecov.io/gh/rainbow-design/rainbow-common)

[English](https://github.com/rainbow-design/rainbow-common/blob/master/README_zh.md) | 中文

Rainbow 的 JavaScript 实用工具和组件库

## 使用

**npm:**

推荐使用方法

```bash
$ npm install rainbow-common -S
```

**nuxt 项目**

```js
{
  build: {
    transpile: [/rainbow-common/],
  },
}
```

**webpack 项目**

```js
// 修改js配置
{
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /(node_modules)/ // 修改前
        exclude: function (path) {
          // 修改后
          return (
            /(node_modules)/.test(path) && path.indexOf('rainbow-common') === -1
          );
        },
      },
    ];
  }
}
```

```js
//  使用方法 (先导出):
import { Storage} 'rainbow-common';

// 使用:
Storage.setItem('like', 'code', new Date(Date.now() + 1000));

setTimeout(() => {
  Storage.getItem('like'); // null
}, 1000);
0);
```

## License

[MIT](LICENSE) © [yanyue404](https://github.com/yanyue404)
