<template>
  <LoginHeadFoot name="注册">
    <div class="register" @click="closeSlide">
      <div class="width-1280">
        <div class="wrapper">
          <el-form :model="form" :rules="rules" ref="ruleForm" label-width="0">
            <div class="register-title">欢迎注册捷配工业品超市</div>
            <el-form-item class="register-account" prop="account">
              <span class="register-account-label">+86（中国大陆）</span>
              <el-input v-model="form.account"></el-input>
            </el-form-item>
            <div class="register-smscode">
              <el-form-item class="register-smscode-input" prop="smsCode">
                <el-input v-model="form.smsCode" placeholder="请输入短信验证码"></el-input>
              </el-form-item>
              <el-button class="smscode-btn" @click.stop="showSlide">{{smscodeText}}</el-button>
            </div>
            <el-form-item class="register-password" prop="password">
              <el-input type="password" maxlength="25" v-model="form.password" placeholder="请设置您的密码"></el-input>
            </el-form-item>
            <el-form-item class="register-password" prop="password2">
              <el-input type="password" maxlength="25" v-model="form.password2" placeholder="请再次设置您的密码"></el-input>
            </el-form-item>
            <el-checkbox class="agreement" v-model="isAgree">我已阅读并同意 </el-checkbox>
            <router-link class="agreement-text" to="/">《捷配用户注册协议》</router-link>
            <div class="register-submit">
              <el-button type="primary" class="register-submit-btn" :class="{'disabled': isDisabled}" @click="handleRegister">同意协议并注册</el-button>
            </div>
            <div class="register-bottom">
              <div>
                <span>已有账号？ 请</span>
                <router-link class="register-login" to="/login">登录</router-link>
              </div>
            </div>
          </el-form>
          <div class="slideverify" v-show="isShowSlide" @mouseleave="hideSlide">
            <SlideVerify ref="slideblock" @success="sendSmsCode"></SlideVerify>
          </div>
        </div>
      </div>
    </div>
  </LoginHeadFoot>
</template>

<script>
import LoginHeadFoot from '@/components/LoginHeadFoot';
import SlideVerify from '@/components/SlideVerify';
import { isPhoneNum } from '@/utils/validate';

export default {
  name: 'Redister',
  components: {
    LoginHeadFoot,
    SlideVerify
  },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!isPhoneNum(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入您的密码'));
      } else if (value.length < 6 || value.length > 25) {
        callback(new Error('由6-25位 数字 或 英文字母 或 符号组成'));
      } else {
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入您的密码'));
      } else if (value != this.form.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      form: {
        account: '',
        smsCode: '',
        password: '',
        password2: ''
      },
      rules: {
        account: [{ validator: validatePhone, trigger: 'blur' }],
        smsCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        password2: [{ validator: validatePassword2, trigger: 'blur' }]
      },
      isShowSlide: false,
      isAgree: false,
      smscodeText: '获取短信验证码',
      isDisabled: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    showSlide() {
      this.isShowSlide = true;
      this.$refs.slideblock.onReset();
    },
    hideSlide() {
      setTimeout(()=>{
        this.isShowSlide = false;
      }, 500)
    },
    closeSlide() {
      this.isShowSlide = false;
    },
    sendSmsCode() {
      console.log('验证成功');
      setTimeout(()=>{
        this.isShowSlide = false;
      }, 500)
    },
    checkDisabled() {
      console.log(this.form)
      console.log(this.isDisabled)
      if (this.form.account && this.form.smsCode && this.form.password && this.form.password2 && this.isAgree) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    handleRegister() {
      if (this.isDisabled) return;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          
        }
      });
    }
  },
  watch: {
    form: {
      handler(n,o){
        this.checkDisabled();
      },
      deep: true
    },
    isAgree: {
      handler(n,o){
        this.checkDisabled();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  height: calc(100vh - 280px);
  min-height: 600px;
  background: url('~@/assets/login-bg.png') no-repeat 100% 100%;
  background-size: cover;
  .width-1280 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapper {
    width: 500px;
    min-height: 480px;
    padding: 40px 70px 20px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 12px rgba(0,0,0,0.16);
    position: relative;
    .register-title {
      color: #333;
      font-size: 20px;
      line-height: 26px;
      margin-bottom: 30px;
    }
    .register-account {
      /deep/ .el-input__inner {
        padding-left: 122px;
      }
    }
    .register-account-label {
      position: absolute;
      color: #333;
      left: 12px;
      z-index: 1;
      width: 110px;
    }
    .register-smscode {
      display: flex;
      .register-smscode-input {
        flex: 1;
      }
      .smscode-btn {
        width: 150px;
        height: 40px;
        margin-left: 10px;
        border-radius: 4px;
        border-color: #f90;
        color: #f90;
        background-color: #fff;
      }
    }
    .agreement {
      margin: 5px 0 10px;
      /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
        border-color: #f90;
        background-color: #f90;
      }
      /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: #f90;
      }
      /deep/ .el-checkbox__inner:hover {
        border-color: #f90;
      }
      /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #333;
      }
    }
    .agreement-text {
      color: #f90;
    }
    .register-submit {
      margin-bottom: 20px;
      .register-submit-btn {
        width: 100%;
        height: 40px;
        border-radius: 0;
        background-color: #F90;
        border-color: #F90;
        text-align: center;
        font-size: 16px;
        color: #fff;
        &:focus, &:hover {
          background-color: rgba(255, 153, 0, 0.5);
          border-color: rgba(255, 153, 0, 0.5);
        }
        &.is-active, &:active {
          background-color: #f19000;
          border-color: #f19000;
        }
      }
      .register-submit-btn.disabled {
        background-color: #f7f7f7;
        border-color: #ddd;
        color: #999;
        &:focus, &:hover {
          background-color: #f7f7f7;
          border-color: #ddd;
        }
        &.is-active, &:active {
          background-color: #f7f7f7;
          border-color: #ddd;
        }
      }
    }
    .register-bottom {
      display: flex;
      justify-content: flex-end;
      font-size: 14px;
      line-height: 20px;
      color: #333;
      .register-login {
        color: #f90;
        background-color: #fff;
      }
    }
    .slideverify {
      background-color: #f2ece1;
      padding: 10px;
      border-radius: 5px;
      position: absolute;
      bottom: 40px;
      left: 70px;
      z-index: 1;
    }
  }
}
</style>