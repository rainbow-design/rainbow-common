<template>
  <div>
    <button @click="show = true">显示遮罩层</button>
    <Overlay :show="show" :opacity="0.75" @click="show = false">
      <div class="wrapper">
        <div class="block">内部文字</div>
      </div>
    </Overlay>
  </div>
</template>

<script>
import { Overlay } from '../../src/components/overlay';
export default {
  components: { Overlay },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    width: 2.4rem;
    height: 2.4rem;
    background: #fff;
    font-size: 0.28rem;
    border-radius: 0.08rem;
  }
}
</style>
