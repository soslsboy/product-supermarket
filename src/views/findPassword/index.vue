<template>
  <LoginHeadFoot name="找回密码">
    <div class="find-password" @click="closeSlide">
      <div class="width-1280">
        <div class="wrapper">
          <div class="find-password-step">
            <div class="find-password-step-item" :class="{
              'current-item': currentStep == item.value,
              'actived-item': currentStep > item.value
            }" v-for="item in stepArray" :key="item.value">
              <div class="find-password-step-text">
                <span class="find-password-step-label">{{item.value}}</span>
                <div class="find-password-step-value">{{item.label}}</div>
              </div>
              <div class="find-password-step-line" v-if="item.value != stepArray.length"></div>
            </div>
          </div>
          <el-form :model="form" :rules="rules" class="find-form" ref="ruleForm" label-width="0">
            <!-- 第一步 -->
            <template v-if="currentStep == 1">
              <div class="find-title">手机找回密码</div>
              <el-form-item prop="account" class="find-phone">
                <el-input v-model="form.account" placeholder="请输入注册时的手机号"></el-input>
              </el-form-item>
              <div class="find-smscode">
                <el-form-item class="find-smscode-input" prop="account">
                  <el-input v-model="form.smsCode" placeholder="请输入验证码"></el-input>
                </el-form-item>
                <img src="@/assets/logo.png" alt="code">
              </div>
              <div class="btn-next">
                <el-button type="primary" class="btn-primary" @click="handleNext">下一步</el-button>
              </div>
            </template>
            <!-- 第二步 -->
            <template v-if="currentStep == 2">
              <div class="find-title">手机找回密码</div>
              <p class="step-phone-label">验证码将通过短信发送到您绑定的手机号：</p>
              <h5 class="step-phone-phone">{{bindPhone}}</h5>
              <div class="find-smscode">
                <el-form-item class="find-smscode-input" prop="smsCodeShort">
                  <el-input v-model="form.smsCodeShort" placeholder="请输入短信验证码"></el-input>
                </el-form-item>
                <el-button class="smscode-btn" @click.stop="showSlide">{{smscodeText}}</el-button>
              </div>
              <el-form-item prop="password">
                <el-input type="password" maxlength="25" v-model="form.password" placeholder="设置新密码"></el-input>
              </el-form-item>
              <div class="btn-next step-btn">
                <el-button type="primary" class="btn-primary" @click="handleNext">下一步</el-button>
              </div>
            </template>
            <!-- 修改完成 -->
            <div class="find-step3" v-if="currentStep == 3">
              <img src="@/assets/success.png" alt="success">
              <h5>恭喜密码修改成功！</h5>
              <p>{{countDown}}秒后将自动跳转到登录页面</p>
              <div class="btn-next">
                <el-button type="primary" class="btn-primary" @click="handleLogin">立即登录</el-button>
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
        callback(new Error('请输入注册时的手机号'));
      } else if (!isPhoneNum(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (value.length < 6 || value.length > 25) {
        callback(new Error('由6-25位 数字 或 英文字母 或 符号组成'));
      } else {
        callback();
      }
    };
    return {
      form: {
        account: '',
        smsCode: '',
        smsCodeShort: '',
        password: ''
      },
      bindPhone: '186 **** 1193',
      rules: {
        account: [{ validator: validatePhone, trigger: 'blur' }],
        smsCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        smsCodeShort: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      },
      isAgree: false,
      isShowSlide: false,
      smscodeText: '获取短信验证码',
      isDisabled: true,
      stepArray: [
        { label: '填写账号', value: 1 },
        { label: '验证并设置新密码', value: 2 },
        { label: '设置成功', value: 3 }
      ],
      currentStep: 1,
      countDown: 5,
      timer: null
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleNext() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.currentStep < 3) {
            this.currentStep++;
          }
        }
      });
    },
    handleLogin() {
      if (this.timer) clearInterval(this.timer);
      this.$router.push({
        path: '/login'
      })
    },
    handleTimer() {
      this.timer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
        } else {
          clearInterval(this.timer);
          this.handleLogin();
        }
      }, 1000)
    },
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
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.find-password {
  height: calc(100vh - 280px);
  min-height: 600px;
  background-color: #F2F2F2;
  .width-1280 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapper {
    width: 100%;
    height: 500px;
    padding: 85px 0;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
    .slideverify {
      background-color: #f2ece1;
      padding: 10px;
      border-radius: 5px;
      position: absolute;
      top: 2px;
      left: 460px;
      z-index: 2;
    }
    .step-phone-label {
      margin: 5px 0;
      font-size: 14px;
      color: #999;
    }
    .step-phone-phone {
      font-size: 16px;
      color: #333;
      margin-bottom: 12px;
    }
    .btn-next {
      padding-top: 25px;
    }
    .step-btn {
      padding-top: 15px;
    }
    .find-step3 {
      text-align: center;
      padding-top: 36px;
      img {
        width: 60px;
        height: 60px;
        display: block;
        margin: 0 auto 31px;
      }
      h5 {
        font-size: 20px;
        color: #333;
        margin-bottom: 6px;
      }
      p {
        font-size: 14px;
        color: #999;
        margin-bottom: 10px;
      }
    }
  }
  .find-password-step {
    width: 488px;
    margin: 0 auto 39px;
    display: flex;
    justify-content: space-between;
    .find-password-step-item {
      position: relative;
      flex: 1;
      text-align: center;
      .find-password-step-text {
        position: relative;
        z-index: 2;
        font-size: 14px;
        color: #999;
      }
      .find-password-step-label {
        display: inline-block;
        width: 24px;
        height: 24px;
        box-sizing: border-box;
        border: 1px solid #9A9A9A;
        background-color: #F1F1F5;
        border-radius: 12px;
        line-height: 22px;
        text-align: center;
        margin-bottom: 7px;
      }
      .find-password-step-line {
        width: 170px;
        height: 2px;
        background-color: #D3D3D3;
        position: absolute;
        top: 11px;
        left: 80px;
        z-index: 1;
      }
    }
    .current-item {
      .find-password-step-label {
        border-color: #f90;
        background-color: #f90;
        color: #fff;
      }
      .find-password-step-text {
        color: #f90;
      }
    }
    .actived-item {
      .find-password-step-label {
        border-color: #f90;
        background-color: #fff;
        color: #f90;
      }
      .find-password-step-text {
        color: #666;
      }
      .find-password-step-line {
        background-color: #f90;
      }
    }
  }
  .find-form {
    width: 360px;
    margin: 0 auto;
  }
  .find-title {
    color: #333;
    font-size: 20px;
    line-height: 26px;
  }
  .find-phone {
    margin-top: 30px;
  }
  .find-smscode {
    display: flex;
    .find-smscode-input {
      width: 240px;
    }
    img {
      width: 112px;
      height: 40px;
      margin-left: 9px;
      cursor: pointer;
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
}
</style>