<template>
  <!-- 系统签约更新失败提示 -->
  <div class="Mask" v-if="showDialog">
    <div class="contentBox">
      <div class="toastText">
        <slot></slot>
      </div>
      <div class="btnGroup">
        <div
          v-if="showCancelButton"
          class="cancelBtn"
          :style="{ color: theme, borderColor: theme }"
          @click="cancel"
        >
          {{ cancelButtonText }}
        </div>
        <div
          :class="showCancelButton ? 'confirmBtn' : 'confirmBtn w100'"
          :style="{ background: theme }"
          @click="confirm"
        >
          {{ confirmButtonText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    display: {
      type: Boolean,
      default: false,
      required: true
    },
    cancelButtonText: {
      type: String,
      default: "取消"
    },
    confirmButtonText: {
      type: String,
      default: "确定"
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    // 按钮主题色 #4fc08d
    theme: {
      type: String,
      default: "#ff6600"
    },
    onConfirm: {
      type: Function,
      default: function() {},
      required: true
    },
    onCancel: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      showDialog: this.display
    };
  },
  watch: {
    display(newVal) {
      this.showDialog = newVal;
    }
  },
  methods: {
    confirm() {
      this.onConfirm();
    },
    cancel() {
      this.onCancel();
    }
  }
};
</script>

<style lang="scss" scoped>
.Mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  .w100 {
    width: 100% !important;
  }
  .contentBox {
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    width: 6rem;
    height: 3.04rem;
    background: #fff;
    border-radius: 0.14rem;
    .toastText {
      position: absolute;
      top: 0.8rem;
      width: 100%;
      text-align: center;
      color: #000;
      font-size: 0.32rem;
      height: 0.42rem;
      line-height: 0.42rem;
      font-weight: 500;
    }
    .btnGroup {
      position: absolute;
      left: 0.3rem;
      bottom: 0.3rem;
      display: flex;
      justify-content: space-between;
      width: 5.4rem;
      height: 0.8rem;
      border-radius: 0.1rem;
      color: #fff;
      font-size: 0.32rem;
      .confirmBtn {
        width: 2.6rem;
        height: 0.8rem;
        border-radius: 0.1rem;
        color: #fff;
        font-size: 0.32rem;
        line-height: 0.8rem;
        text-align: center;
      }
      .cancelBtn {
        width: 2.6rem;
        height: 0.8rem;
        background: #fff;
        border-radius: 0.1rem;
        border: 1px solid #ff6600;
        color: #ff6600;
        font-size: 0.32rem;
        line-height: 0.8rem;
        text-align: center;
      }
    }
  }
}
</style>
