# rainbow-common

[![NPM version](https://img.shields.io/npm/v/rainbow-common.svg?style=flat)](https://www.npmjs.com/package/rainbow-common) [![Build Status](https://travis-ci.org/rainbow-design/rainbow-common.svg?branch=master)](https://travis-ci.org/rainbow-design/rainbow-common) [![codecov](https://codecov.io/gh/rainbow-design/rainbow-common/branch/master/graph/badge.svg)](https://codecov.io/gh/rainbow-design/rainbow-common)

English | [中文](https://github.com/rainbow-design/rainbow-common/blob/master/README_zh.md)

Rainbow's modern JavaScript utility and components library.

## Usage

**npm:**

Recommended:

```bash
$ npm install rainbow-common -S
```

**nuxt 项目**

```js
{
  ...,
  build: {
    ...,
    transpile: [/rainbow-common/],
    ...
  },
  ...
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
                exclude: function(path){ // 修改后
                    return /(node_modules)/.test(path) && path.indexOf('rainbow-common') === -1;
                },
                ...,
            }]
   }
}

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
