<template></template>

<script>
export default {
  async mounted() {
    await this.delay(3000);
  },
  methods: {
    // 延时处理
    delay(time, loading = true) {
      return new Promise((resolve) => {
        if (loading) {
          this.$showLoading();
        }
        setTimeout(() => {
          if (loading) {
            this.$hideLoading();
            this.$toast({text:'<p>Hello world!</p>'});
          }
          resolve(true);
        }, time);
      });
    },
  },
};
</script>

<style></style>
