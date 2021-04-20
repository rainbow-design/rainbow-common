## drawer-layout 抽屉布局组件

从屏幕底部弹出弹窗

### 使用方法

1. 基础使用方法

```js
import DrawerLayout from '@/components/common/drawer-layout';

export default {
  components: {
    DrawerLayout,
  },
  data() {
    return {
      showDrawer: false,
    };
  },
  render() {
    return (
      <div>
        页面内容{' '}
        <button onClick={() => (this.showDrawer = true)}>显示弹窗</button>
        <DrawerLayout
          show={this.showDrawer}
          onChange={(show) => (this.showDrawer = show)}
        >
          弹窗中显示的内容
        </DrawerLayout>
      </div>
    );
  },
};
```

2. 使用 $drawer 操作弹窗状态

```js
import DrawerLayout from '@/components/common/drawer-layout';

const DrawerLayoutChild2 = {
  inject: ['$drawer'],
  head() {
    return {
      title: '第二个页面',
    };
  },
  render() {
    return (
      <div>
        我是弹窗里面的 第二个页面
        <button onClick={() => this.$drawer.back()}>点我返回第一个页面</button>
      </div>
    );
  },
};

const DrawerLayoutChild1 = {
  inject: ['$drawer'],
  render() {
    return (
      <div>
        我是弹窗里面的 第一个页面
        <button onClick={() => this.$drawer.push(DrawerLayoutChild2)}>
          点我打开第二个页面
        </button>
      </div>
    );
  },
};

export default {
  components: {
    DrawerLayout,
    DrawerLayoutChild1,
  },
  data() {
    return {
      showDrawer: false,
    };
  },
  render() {
    return (
      <div>
        页面内容{' '}
        <button onClick={() => (this.showDrawer = true)}>显示弹窗</button>
        <DrawerLayout
          show={this.showDrawer}
          onChange={(show) => (this.showDrawer = show)}
          title="第一个页面"
        >
          <DrawerLayoutChild1 />
        </DrawerLayout>
      </div>
    );
  },
};
```

### props

| name      | 类型             | 默认值                                                          | 说明                                    |
| --------- | ---------------- | --------------------------------------------------------------- | --------------------------------------- |
| direction | String           | bottom                                                          | 布局方向 支持 bottom， left, right, top |
| size      | [String, Number] | 布局方向 bottom 和 top：9.92rem, left 和 top:5rem，其它值：auto | 指定弹窗的高度（含标题栏）              |
| title     | String           | -                                                               | 弹窗的标题                              |

### Mask 的 props

| name            | 类型    | 默认值 | 说明                                                 |
| --------------- | ------- | ------ | ---------------------------------------------------- |
| show            | Boolean | false  | 是否显示弹窗                                         |
| position        | String  | fixed  | mask 的 css 属性 position 的值                       |
| opacity         | Number  | 0.56   | mask 的透明度                                        |
| noScrollingPage | Boolean | ture   | 设置在 mask 上面滑动能不能滚动页面, 默认不能滚动页面 |

### event

| name   | 参数         | 说明                                                                                 |
| ------ | ------------ | ------------------------------------------------------------------------------------ |
| change | isShowDrawer | 要更新的显示状态（触发时，弹窗的状态并不会发生变化，需要由父组件控制弹窗的显示状态） |

### provide

| name             | 类型                | 说明                                                       |
| ---------------- | ------------------- | ---------------------------------------------------------- |
| $drawer          | Object              | 提供操作处于显示状态的 drawer 弹窗的方法                   |
| $drawer.push     | function(component) | 向弹窗中增加一个状态（页面）                               |
| $drawer.break    | function()          | 返回弹窗的上一个状态（页面）如果没有上一个状态，将关闭弹窗 |
| $drawer.setTitle | function(title)     | 设置弹窗的 title                                           |

### 其他

- title 的显示说明

component.head().title || $drawer.setTitle() || props.title

- component.haed 沿用 nuxt 的 head 配置中的 title 属性
