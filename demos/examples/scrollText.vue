<template>
  <ScrollText :scrollData="scrollData" class="roll" :time="1">></ScrollText>
</template>

<script>
import { ScrollText } from '../../src/components/scrollText';

const list = new Array(
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'X',
  'Y',
  'Z',
).map((v) => v + ' - 我是一个没有感情的滚动弹幕');
export default {
  components: { ScrollText },
  data() {
    return {
      scrollData: list,
    };
  },
};
</script>

<style lang="scss">
.roll {
  position: absolute;
  top: 20%;
  left: 30%;
  z-index: 10;
}
p {
  background: #07c160 !important;
  color: #333 !important;
  opacity: 1 !important;
  padding-left: 0.23rem;
  display: inline-block;
  padding-right: 0.13rem;
  -webkit-border-top-left-radius: 0.2rem;
  border-top-left-radius: 0.2rem;
  -webkit-border-bottom-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
}
</style>
