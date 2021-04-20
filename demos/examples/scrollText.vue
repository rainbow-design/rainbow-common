<template>
  <ScrollText :scrollData="scrollData" class="roll" :time="0.5">></ScrollText>
</template>

<script>
import { ScrollText } from '../../src/components/scrollText';
export default {
  components: { ScrollText },
  data() {
    return {
      scrollData: [
        '*丽刚刚为自己投保',
        '**燕刚刚为父母投保',
        '**强刚刚为子女投保',
        '**斌刚刚为自己投保',
        '*彪刚刚为配偶投保',
        '*飞刚刚为父母投保',
        '**花刚刚为父母投保',
        '*晶刚刚为子女投保',
        '**佳刚刚为配偶投保',
        '**妍刚刚为自己投保',
        '**明刚刚为自己投保',
        '*敏刚刚为自己投保',
        '*瑾刚刚为父母投保',
        '**欢刚刚为子女投保',
        '*婉刚刚为自己投保',
        '**志刚刚为配偶投保',
        '**强刚刚为父母投保',
        '**哲刚刚为父母投保',
        '*雪刚刚为子女投保',
        '*睿刚刚为配偶投保',
        '**凡刚刚为自己投保',
        '*昊刚刚为自己投保',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.roll {
  position: absolute;
  top: 20%;
  left: 30%;
  z-index: 10;
}
</style>
