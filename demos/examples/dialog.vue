<template>
  <Dialog
    :display="show"
    theme="#4fc08d"
    cancelButtonText="未签约"
    confirmButtonText="已签约"
    :onCancel="onConfirm.bind(null, false)"
    :onConfirm="onConfirm.bind(null, true)"
    >是否已完成签约 ？</Dialog
  >
</template>

<script>
import { Dialog } from '../../src/components/dialog';
export default {
  components: { Dialog },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    onConfirm() {
      this.show = false;
    },
  },
};
</script>

<style></style>
