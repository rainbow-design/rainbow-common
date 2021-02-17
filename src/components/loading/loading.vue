<template>
  <Overlay :noScrollingPage="false" :opacity="0" :show="isShow">
    <div
      class="rainbow-loading-wrap"
      :noScrollingPage="false"
      :opacity="0"
      :show="isShow"
    >
      <div class="app-toast" v-if="isShow">
        <img src="./loading.gif" alt />
        <span>加载中</span>
      </div>
    </div>
  </Overlay>
</template>
<script>
import { Overlay } from '../overlay';
export default {
  name: 'Loading',
  components: { Overlay },
};
</script>
<style lang="scss" scoped>
.rainbow-loading-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.app-toast {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(51, 51, 51, 0.9);
  padding: 0.43rem 0.78rem 0.44rem 0.74rem;
  border-radius: 5px;
  color: #fff;
  img {
    width: 0.88rem;
    height: 0.88rem;
  }
  span {
    padding-top: 0.19rem;
    font-size: 0.28rem;
    color: #fff;
  }
}
</style>
