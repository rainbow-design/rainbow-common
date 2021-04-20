<template>
  <div v-show="show" id="progress">
    <div id="bar" :style="progressStyle">
      <div class="peg"></div>
    </div>
    <div class="spinner">
      <div class="spinner-icon"></div>
    </div>
  </div>
</template>

<script>
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

/**
 * 简单的执行缓动函数的方法
 * @param {number} startValue - 初始值
 * @param {number} endValue - 最终值
 * @param {number} during - 持续时间
 * @param {function} easingFunc - 缓动函数
 * @param {function} stepCb - 每次更新动画状态后执行的函数
 * @return {Promise}
 */
function tween(startValue, endValue, during, easingFunc, stepCb) {
  const updateTime = 1000 / 60;
  const rAF =
    window.requestAnimationFrame ||
    function(cb) {
      setTimeout(cb, updateTime);
    };
  const changeValue = endValue - startValue; // 缓动总长度
  const updateCount = during / updateTime; // 更新次数
  const perUpdateDistance = 1 / updateCount;
  let position = 0;

  return new Promise(resolve => {
    function step() {
      const state = startValue + changeValue * easingFunc(position);
      stepCb(state);
      position += perUpdateDistance;
      if (position < 1) {
        rAF(step);
      } else {
        resolve();
      }
    }
    step();
  });
}
export default {
  name: "Nprogress",
  data() {
    return {
      show: false,
      loadingTime: 7,
      progress: 0,
      start: 70
    };
  },
  computed: {
    progressStyle() {
      let progress = this.progress - 100;
      return {
        transform: "translate3d(" + progress + `%, 0px, 0px)`
      };
    }
  },
  mounted() {
    this.show = true;
    if (!this.show) return;
    this.updateProgressWidth();
  },
  methods: {
    updateProgressWidth() {
      tween(this.start, 750, this.loadingTime * 1000, easeOutCubic, width => {
        this.progress = (width / 750) * 100;
        if (width >= 750) {
          this.show = false;
        }
      });
    },
    done() {
      console.log("结束");
    }
  }
};
</script>

<style lang="scss" scoped>
$base-color: #09bb07; // 蓝色：#29d；绿色：#09BB07
#progress {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  width: 100%;
  height: 10px;
  z-index: 1024;

  #bar {
    transition: all 1000/60ms ease 0s;
    background: $base-color;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 3px;
    .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px $base-color, 0 0 5px $base-color;
      opacity: 1;
      -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
      transform: rotate(3deg) translate(0px, -4px);
    }
  }
  .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: $base-color;
    border-left-color: $base-color;
    border-radius: 50%;
    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }
  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
