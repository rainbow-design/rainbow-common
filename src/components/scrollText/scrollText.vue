<template>
  <div id="box">
    <ul
      id="con1"
      ref="con1"
      :style="[
        { transition: animate == true ? 'all ' + time * 0.5 + 's' : '' },
        { marginTop: animate == true ? '-0.3rem' : 0 },
      ]"
    >
      <li
        v-for="(item, index) in showList"
        :key="index"
        :style="[
          {
            transition:
              animate == true && index == 1 ? 'all ' + time * 0.5 + 's' : '',
          },
        ]"
      >
        <p>{{ item }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    scrollData: {
      type: Array,
      default: [],
    },
    time: {
      type: Number,
      default: 1,
    },
    gap: {
      type: String,
      default: '0px',
    },
    num: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      timer: null,
      animate: false,
      showList: [],
      data: this.scrollData,
    };
  },
  mounted() {
    let showList = [];
    for (let index = 0; index < 5; index++) {
      showList.push(this.getShowItem());
    }
    this.showList = showList;
    this.timer = setInterval(this.scroll, this.time * 2000);
  },
  methods: {
    scroll() {
      this.animate = true; // 添加css3过渡动画，需要设置true
      setTimeout(() => {
        this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        this.showList.push(this.getShowItem()); // 随机生成一个添加到数组的
        this.showList.shift(); // 删除数组的第一个元素
      }, this.time * 1000);
    },
    getShowItem() {
      let newArr = this.shuffle(this.data);
      let randomIndex = Math.floor(Math.random() * this.data.length);
      return this.data[randomIndex];
    },
    shuffle(arr) {
      var i = arr.length,
        t,
        j;
      while (i) {
        j = Math.floor(Math.random() * i--);
        t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
      }
      return arr;
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
#box {
  text-align: right;
  height: 0.6rem;
  overflow: hidden;
  font-size: 0.22rem;
}
#con1 li {
  height: 0.3rem;
  list-style: none;
  p {
    display: inline-block;
    list-style: none;
    line-height: 0.3rem;
    height: 0.3rem;
    background: #fff;
    color: #333;
    // opacity: 0.6;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.22rem;
    margin: 0;
  }
  &:first-child {
    // opacity: 0.3;
    margin-top: 0;
  }
}
</style>
