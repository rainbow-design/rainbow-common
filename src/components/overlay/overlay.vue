<template>
  <div
    class="c-mask"
    :style="maskStyle"
    v-show="show"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </div>
</template>
<script>
const getZIndex = (function (index) {
  return () => index++;
})(1000);
export default {
  name: 'Overlay',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    /**
     * 定义 mask的定位方式， 默认 fixed
     */
    position: {
      type: String,
      default: 'fixed',
    },
    /**
     * 定义蒙层的透明度， 取值范围 0 - 1, 默认值 0.56
     */
    opacity: {
      type: Number,
      default: 0.56,
    },

    /**
     * 设置在mask上面滑动能不能滚动页面, 默认不能滚动页面
     */
    noScrollingPage: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    maskStyle() {
      return {
        position: this.position,
        backgroundColor: `rgba(0,0,0, ${this.opacity})`,
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: getZIndex(),
      };
    },
  },
  watch: {
    noScrollingPage(val) {
      val ? this.disableScrollPage() : this.enableScrollpage();
    },
    show(val) {
      val && this.noScrollingPage
        ? this.disableScrollPage()
        : this.enableScrollpage();
    },
  },
  mounted() {
    this.$el.addEventListener('touchmove', this.scrollHander, true);
    this.show && this.noScrollingPage && this.disableScrollPage();
  },
  destroyed() {
    this.enableScrollpage();
    this.$el.removeEventListener('touchmove', this.scrollHander);
  },
  methods: {
    disableScrollPage() {
      document.documentElement.style.overflow = 'hidden';
      // document.body.style.overflow = 'hidden';
    },
    enableScrollpage() {
      document.documentElement.style.overflow = '';
      // document.body.style.overflow = '';
    },
    scrollHander(e) {
      const getNeed = (el) => {
        if (el == this.$el || !el || !el.parentElement) {
          return false;
        }
        if (el.className.indexOf('mask-content-needscroll') >= 0) {
          return true;
        }
        return getNeed(el.parentElement);
      };
      if (this.noScrollingPage && this.show && !getNeed(e.target)) {
        e.preventDefault();
      }
    },
  },
};
</script>
