<script>
export const FormRadioGroup = {
  name: 'FormRadioGroup',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: null,
  },
  watch: {
    value(val) {
      this.$forceUpdate();
    },
  },
  methods: {
    setValue(val) {
      this.$emit('change', val);
    },
  },
  render() {
    return <div class="form-radio-group">{this.$slots.default}</div>;
  },
};

export const FormRadio = {
  name: 'FormRadio',
  props: {
    checked: null,
    disabled: false,
    value: null,
    activeClass: {
      type: [String, Array, Object],
      default: 'active',
    },
  },
  data() {
    return {};
  },
  created() {
    if (this.checked && this.value !== this.$parent.value) {
      this.$parent.setValue(this.value);
    }
  },
  render() {
    var checked = this.$parent.value === this.value;
    return (
      <div
        onClick={this.onChoose}
        class={[
          'c-form-radio',
          'flex-c-c',
          checked ? this.activeClass : '',
          this.disabled ? 'disabled' : '',
        ]}
      >
       {this.$scopedSlots.default(checked)}
      </div>
    );
    // 使用this.$scopedSlots可以支持插槽作用域，this.$scopedSlots.default 是一个函数，通过传递参数可以将参数传送给作用域对象
    // 替代 this.$slots.default
  },
  methods: {
    onChoose() {
      if (this.disabled) return;
      this.$parent.setValue(this.value);
    },
  },
};

export default {
  FormRadioGroup,
  FormRadio,
};
</script>

<style lang="scss">
.form-radio-group {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .flex-c-c {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .disabled {
    color: #ffae70 !important;
    border-color: #ffd1b3 !important;
    background-size: 0.71rem 0.71rem !important;
  }
  .c-form-radio {
    font-size: 0.28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333;
    border: 0.02rem solid #ccc;
    height: 0.72rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.06rem;
    padding: 0 0.3rem;
    box-sizing: border-box;

    &.active {
      color: #ff6600;
      border-color: #ff6600;
      background: url('./img/active.png') right top no-repeat;
      background-size: 0.29rem 0.29rem;
    }
  }
}
</style>
