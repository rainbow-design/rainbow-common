# rainbow-utils

[![NPM version](https://img.shields.io/npm/v/rainbow-utils.svg?style=flat)](https://www.npmjs.com/package/rainbow-utils) [![Build Status](https://travis-ci.org/rainbow-design/rainbow-utils.svg?branch=master)](https://travis-ci.org/rainbow-design/rainbow-utils) [![codecov](https://codecov.io/gh/rainbow-design/rainbow-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/rainbow-design/rainbow-utils)

English | [中文](https://github.com/rainbow-design/rainbow-utils/blob/master/README_zh.md)

Rainbow's JavaScript utility library

## Usage

**npm:**

Recommended:

```bash
$ npm install rainbow-utils -S
```

```js
const R = require('rainbow-utils');

// use core:
const { omit } = R;

// use feat:
new Date().formate('yyyy-MM-dd'); //  2020-07-07

// wxport module:
const { Storage } = R;

// use:
Storage.setItem('like', 'code', new Date(Date.now() + 1000));

setTimeout(() => {
  Storage.getItem('like'); // null
}, 1000);
```

**CDN:**

You can also get the latest version of resources through [unpkg.com/rainbow-utils](https://unpkg.com/rainbow-utils), and use the `script` tag on the page to import it and start using it.

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

> New features of the prototype extension

- Promise.every
- Date.formate

### Modules

**Dom**

- \$
- \$\$
- index
- siblings
- every
- getStyle
- css
- create
- append
- prepend
- remove

**Storage**

> LocalStorage new feature expiration time function

- setItem
- getItem
- removeItem
- clear

**Event**

> Subscribe before publish

- \$on
- \$emit
- \$off
- \$once

> Publish before subscribe

- \$pub
- \$sub
- \$remove

## License

[MIT](LICENSE) © [yanyue404](https://github.com/yanyue404)
