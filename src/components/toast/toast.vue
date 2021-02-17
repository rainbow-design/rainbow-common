<template>
  <div class="app-toast-wrap" v-if="isShow">
    <div class="app-toast">
      <p v-html="text"></p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.app-toast-wrap {
  .app-toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(51, 51, 51, 0.9);
    padding: 0.23rem 0.2rem;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 0.28rem;
    z-index: 999;
    max-width: 5.4rem;
    p {
      text-align: center;
    }
  }
}
</style>
