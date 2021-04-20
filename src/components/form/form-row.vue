<template>
  <div class="c-form-row">
    <div class="row flex-sb-c" :class="{ noborder }">
      <slot name="title"></slot>
      <label v-if="title">{{ title }}</label>
      <slot></slot>
    </div>
    <slot name="tips"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    noborder: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.c-form-row {
  padding-left: 0.3rem;
  .flex-sb-c {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flex--c {
    display: flex;
    align-items: center;
  }
  .row {
    min-height: 0.9rem;
    flex-wrap: wrap;
    border-bottom: 1px solid #e7e7e7;
    padding-right: 0.3rem;

    &.noborder {
      border-bottom-color: transparent;
    }
    label {
      height: 0.36rem;
      width: 2.08rem;
      font-size: 0.28rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.36rem;
    }
  }
}
</style>
