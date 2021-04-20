<template>
  <div>
    <form-row title="手机号">
      <form-input
        id="applicantPhone_input"
        v-model="applicantPhone"
        modal="tel"
        max-length="11"
        @blur="onBlur('applicantPhone', $event)"
        @focus="onFocus('applicantPhone')"
        placeholder="请输入手机号码"
        :warning="formWarning === 'applicantPhone'"
      />
    </form-row>
    <form-row title="验证码">
      <form-input
        id="applicantCaptcha_input"
        v-model="captcha"
        modal="tel"
        max-length="6"
        @blur="onBlur('captcha', $event)"
        :warning="formWarning === 'captcha'"
        @focus="onFocus('captcha')"
        placeholder="请输入验证码"
      />
      <span class="sms-btn" @click="getCaptcha">{{
        captchaEnable ? '获取验证码' : `${seconds}s后重发`
      }}</span>
    </form-row>
    <form-row noborder>
      <form-radio-group
        id="insuredRelation_radio_group"
        class="relation-radio-group"
        v-model="insureType"
      >
        <form-radio
          :id="`insuredRelation_radio_${item.key}`"
          class="relation-radio"
          :value="item.key"
          :key="index"
          v-for="(item, index) in relations"
          >
          {{item.value}}
          <!-- <span slot-scope="scope">{{item.value }} {{scope}}</span> -->
          </form-radio
        >
      </form-radio-group>
    </form-row>
  </div>
</template>

<script>
import formRow from '../../src/components/form/form-row.vue';
import formInput from '../../src/components/form/input.vue';
import { FormRadioGroup, FormRadio } from '../../src/components/form/radio.vue';

export default {
  components: {
    formRow,
    formInput,
    FormRadioGroup,
    FormRadio,
  },
  data() {
    return {
      formWarning: '',
      name: '13312341234',
      insureType__init: '01',
      //获取验证码间隔时间
      seconds: 60,
      vcode: '',
      //是否可以获取验证码
      captchaEnable: true,
      relations: [
        {
          key: '01',
          value: '本人',
        },
        {
          key: '10',
          value: '配偶',
        },
        {
          key: '50',
          value: '父母',
        },
        {
          key: '40',
          value: '子女',
        },
      ],
    };
  },
  computed: {
    applicantPhone: {
      get() {
        return this.name;
      },
      set(val) {
        this.name = val;
      },
    },
    captcha: {
      get() {
        return this.vcode;
      },
      set(val) {
        this.vcode = val;
      },
    },
    insureType: {
      get() {
        return this.insureType__init;
      },
      set(val) {
        this.insureType__init = val;
      },
    },
  },
  methods: {
    onBlur(key, val) {
      if (val && /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(val) === false) {
        this.formWarning = key;
      } else {
        this.formWarning = '';
      }
    },
    onFocus(type) {
      if (type === this.formWarning) {
        this.formWarning = '';
      }
    },
    getCaptcha() {
      alert('请求获取验证码接口...');
    },
  },
};
</script>

<style lang="scss" scoped>
.sms-btn {
  width: 1.9rem;
  height: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #246de2;
  font-size: 0.28rem;
  box-sizing: border-box;
  padding-left: 0.3rem;
  border-left: 1px solid #e7e7e7;
  margin-left: 0.3rem;
}
.sms-btn-gray {
  color: #999;
}
</style>
