# rainbow-utils

[![NPM version](https://img.shields.io/npm/v/rainbow-utils.svg?style=flat)](https://www.npmjs.com/package/rainbow-utils) [![Build Status](https://travis-ci.org/rainbow-design/rainbow-utils.svg?branch=master)](https://travis-ci.org/rainbow-design/rainbow-utils) [![codecov](https://codecov.io/gh/rainbow-design/rainbow-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/rainbow-design/rainbow-utils)

Rainbow 的前端业务代码工具库

## 使用

**npm:**

推荐使用方法

```bash
$ npm install rainbow-utils -S
```

```js
const R = Rainbow;

// core 使用方法:
const { omit } = R;

// feat 使用方式:
new Date().formate('yyyy-MM-dd'); //  2020-07-07

// modules 使用方法 (先导出):
const { Storage } = R;

// 使用:
Storage.setItem('like', 'code', new Date(Date.now() + 1000));

setTimeout(() => {
  Storage.getItem('like'); // null
}, 1000);
```

**CDN:**

还可以通过 [unpkg.com/rainbow-utils](https://unpkg.com/rainbow-utils) 获取到最新版本的资源，在页面上使用 `script` 标签引入后即可开始使用.

```html
<script src="https://unpkg.com/rainbow-utils"></script>
```

## API

**Core**

- getType
- isDef
- isUndef
- extend
- toFixed
- checkType
- hasOwn
- shallowCopy
- deepCopy
- omit
- only
- sortBy
- uniqueArrayObj
- stringify
- parse
- throttle
- debounce
- once

**Feat**

> 原型扩展的新特性

- Promise.every
- Date.formate

### Modules

**Storage**

> localStorage 实现过期时间功能

- setItem
- getItem
- removeItem
- clear

**Event**

> 先订阅后发布

- \$on
- \$emit
- \$off
- \$once

> 先发布后订阅

- \$pub
- \$sub
- \$remove

### License

Copyright © 2020, [yanyue404](https://github.com/yanyue404).
Released under the [MIT License](LICENSE).
