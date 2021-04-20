<template>
  <div class="c-drawer-layout" @click="onHide" v-show="showMask" :style="myMaskStyle">
    <transition
      @before-enter="beforeEnter"
      @before-leave="beforeLeave"
      @after-leave="afterLeave"
      name="drawer-bottom"
    >
      <div v-if="show" @click.stop class="wrap" :class="direction" :style="wrapStyle">
        <div v-if="!notitlebar" class="header" :style="{'border-bottom': noBorder ? 'none' : ''}">
          <span @click="onBack" class="c-break" :class="{hidden: stack.length <= 0}"></span>
          <h3 class="title">{{showTitle}}</h3>
          <span @click="onClose" class="c-close"></span>
        </div>
        <div ref="content" class="content">
          <div
            ref="defwrap"
            class="content-wrap mask-content-needscroll"
            :class="{'opacity': stack.length == 1}"
            :style="{backgroundColor: this.contentBgColor}"
          >
            <slot></slot>
          </div>
          <transition-group name="group">
            <div
              class="content-wrap mask-content-needscroll"
              ref="wrap"
              v-for="(component, index) in stack"
              :key="'__' + index"
            >
              <component :key="index" :is="component" />
            </div>
          </transition-group>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import MaskMixin from "../mask/mixin";
let vm;

export default {
  mixins: [MaskMixin],
  model: {
    prop: "show",
    event: "change"
  },
  provide: {
    $drawer: {
      // 跳到下一个状态
      push(component) {
        vm && vm.push(component);
      },
      // 替换当前状态
      replace() {},
      back() {
        vm && vm.onBack();
      },
      setTitle(title) {
        vm && vm.setTitle(title);
      },
      close() {
        vm && vm.onClose();
      },
      //滚动至顶部
      resetTop(){
        vm && vm.resetTop();
      }
    }
  },
  props: {
    contentBgColor: {
      type: String,
      default: "#fff"
    },
    notitlebar: {
      type: Boolean,
      default: false
    },
    // 布局方向 支持 bottom， left, right, top
    direction: {
      type: String,
      default: "bottom"
    },
    //标题是否没有下边框
    noBorder: {
      type: Boolean,
      default: false
    },

    // 设置 wrap的高度或宽度
    size: {
      type: [String, Number],
      default() {
        return (
          {
            bottom: "9.92rem",
            top: "9.92rem",
            left: "5rem",
            right: "5rem"
          }[this.direction] || "auto"
        );
      }
    },

    title: String
  },
  data() {
    return {
      showTitle: this.title,
      maskOpacity: 0.75,
      selfTitle: {},
      showMask: false,
      // title: '保险条款',
      index: 0,
      // 页面状态
      stack: []
    };
  },
  computed: {
    myMaskStyle() {
      return {
        ...this.maskStyle,
        backgroundColor: `rgba(0,0,0, ${this.maskOpacity})`
      };
    },
    wrapStyle() {
      return ["left", "right"].indexOf(this.direction) > -1
        ? { width: this.size, backgroundColor: this.contentBgColor }
        : { height: this.size, backgroundColor: this.contentBgColor };
    },
    currendIndex() {
      return this.stack.length - 1;
    }
  },
  watch: {
    show(val) {
      if (val) {
        vm = this;
        this.showMask = true;
        this.$nextTick(() =>{
          this.$refs.defwrap.scrollTop =  0;
        })
      }
    },
    currendIndex() {
      this.updateShowTitle();
    },
    title() {
      this.updateShowTitle();
    }
  },
  created() {
    if (this.show) {
      vm = this;
      this.showMask = true;
    }
  },
  activated() {
    let arr = this.scrollTopArr || [];
    let { defwrap, wrap } = this.$refs;
    if (defwrap) {
      [defwrap, ...(wrap || [])].forEach((item, index) => {
        item.scrollTop = arr[index] || 0;
      });
    }
  },
  deactivated() {
    let { defwrap, wrap } = this.$refs;
    if (defwrap) {
      this.scrollTopArr = [defwrap, ...(wrap || [])].map(item => {
        return item.scrollTop;
      });
    }
  },
  methods: {
    async updateShowTitle() {
      let comp = this.stack[this.currendIndex];
      if (this.currendIndex >= 0) {
        if (typeof comp === "function") {
          comp = await comp().then(({ default: comp }) => comp);
        }
      }
      this.showTitle = (comp && comp.title) || this.selfTitle[this.currendIndex] || this.title;
    },
    beforeEnter() {
      this.maskOpacity = 0;
      setTimeout(() => {
        this.maskOpacity = this.opacity;
      }, 10);
    },
    beforeLeave() {
      this.maskOpacity = 0;
    },
    afterLeave() {
      this.showMask = false;
    },
    setTitle(titie) {
      this.selfTitle[this.currendIndex] = titie;
    },
    onShow() {
      this.$emit("change", true);
    },
    onHide() {
      this.stack = [];
      // 关闭弹窗并清空状态
      this.$emit("change", false);
    },
    onBack() {
      // 1. 如果有上一个状态， 返回到上一个状态， 否则关闭弹窗
      this.stack.length > 0 ? this.back() : this.onHide();
    },
    onClose() {
      this.$emit('close', this.showTitle);
      this.stack = [];
      this.onHide();
    },
    push(component) {
      this.stack.push(component);
    },
    back() {
      this.$emit('back', this.showTitle);
      delete this.selfTitle[this.currendIndex];
      this.stack.pop();
      this.updateShowTitle();
    },
    resetTop(){
      this.$nextTick(() =>{
        this.$refs.defwrap.scrollTop =  0;
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes slideInRight {
  0% {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideOutLeft {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  100% {
    visibility: hidden;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes slideInUp {
  0% {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slideOutRight {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  100% {
    visibility: hidden;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}
@keyframes slideOutDown {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  100% {
    visibility: hidden;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
}

.hidden {
  visibility: hidden;
}

.c-drawer-layout {
  transition: all 0.5s;
  touch-action: none;
  ::v-deep {
    .drawer-bottom-enter-active {
      animation: slideInUp 0.5s;
    }
    .drawer-bottom-leave-active {
      animation: slideOutDown 0.5s;
    }

    .group-bottom-enter-active {
      animation: slideInRight 0.5s;
    }
    .group-bottom-leave-active {
      animation: slideOutRight 0.5s;
    }
  }

  .wrap {
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 10px 10px 0 0;

    &.bottom {
      bottom: 0;
      width: 100%;
    }
    &.top {
      top: 0;
      width: 100%;
    }
    &.left {
      left: 0;
      height: 100%;
    }
    &.right {
      right: 0;
      height: 100%;
    }
  }

  .header {
    display: flex;
    align-items: center;
    padding: 0 0.4rem;
    height: 1rem;
    border-bottom: 1Px solid #e7e7e7;
    h3 {
      flex: 1;
      font-size: 0.32rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333;
      text-align: center;
      width: 5.42rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 20px;
    }
    .c-break {
      background: url("./img/break.png") no-repeat center;
      background-size: 100% 100%;
      width: 0.44rem;
      height: 0.44rem;
    }

    .c-close {
      background: url("./img/close.png") no-repeat center;
      background-size: 100% 100%;
      width: 0.44rem;
      height: 0.44rem;
    }
  }

  .content {
    flex: 1;
    position: relative;

    .content-wrap {
      position: absolute;
      height: 100%;
      width: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      top: 0;
      left: 0;
      &.opacity {
        opacity: 0;
      } 
    }
  }
}
</style>