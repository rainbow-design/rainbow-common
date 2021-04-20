<template>
  <div class="container">
    <h1>@Rainbow-common</h1>
    <!-- <DialogWrap></DialogWrap> -->
    <!-- <LoadingWrap></LoadingWrap> -->
    <!-- <ToastWrap></ToastWrap> -->
    <!-- <OverlayWrap></OverlayWrap> -->
    <!-- <ScrollTextWrap></ScrollTextWrap> -->
    <FormWrap></FormWrap>
  </div>
</template>

<script>
import DialogWrap from './examples/dialog.vue';
import LoadingWrap from './examples/loading.vue';
import ToastWrap from './examples/toast.vue';
import OverlayWrap from './examples/overlay.vue';
import ScrollTextWrap from './examples/scrollText.vue';
import FormWrap from './examples/form.vue';
export default {
  components: {
    DialogWrap,
    LoadingWrap,
    ToastWrap,
    OverlayWrap,
    ScrollTextWrap,
    FormWrap
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  background: #fff;
  padding: 0.3rem;
  h1 {
    font-size: 0.36rem;
    margin-bottom: 0.3rem;
  }
}
</style>
