<template>
  <LoginHeadFoot name="登录">
    <div class="login">
      <div class="width-1280">
        <div class="wrapper">
          <el-form :model="form" :rules="rules" ref="ruleForm" label-width="0">
            <div class="login-title">账号登录</div>
            <el-form-item class="login-account" prop="account">
              <span class="login-account-label">+86（中国大陆）</span>
              <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item class="login-password" prop="password">
              <el-input type="password" maxlength="25" v-model="form.password" placeholder="请输入您的密码"></el-input>
            </el-form-item>
            <div class="login-smscode">
              <el-form-item class="login-smscode-input" prop="smsCode">
                <el-input v-model="form.smsCode" placeholder="请输入验证码"></el-input>
              </el-form-item>
              <img src="@/assets/logo.png" alt="code">
            </div>
            <div class="login-submit">
              <el-button type="primary" class="btn-primary" @click="handleLogin">登录</el-button>
            </div>
            <div class="login-bottom">
              <router-link class="forget" to="/findPassword">忘记密码</router-link>
              <div>
                <span>还没有账号？ </span>
                <router-link class="register" to="/register">注册</router-link>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </LoginHeadFoot>
</template>

<script>
import LoginHeadFoot from '@/components/LoginHeadFoot';

export default {
  name: 'Login',
  components: {
    LoginHeadFoot
  },
  data() {
    return {
      form: {
        account: '',
        password: '',
        smsCode: ''
      },
      rules: {
        account: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        smsCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleLogin() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          
        }
      });
    }
  },
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.login {
  height: calc(100vh - 280px);
  min-height: 600px;
  background: url('~@/assets/login-bg.png') no-repeat 100% 100%;
  background-size: cover;
  .width-1280 {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .wrapper {
    width: 500px;
    min-height: 400px;
    padding: 40px 70px 55px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 12px rgba(0,0,0,0.16);
    .login-title {
      color: #333;
      font-size: 20px;
      line-height: 26px;
      margin-bottom: 30px;
    }
    .login-account {
      /deep/ .el-input__inner {
        padding-left: 122px;
      }
    }
    .login-account-label {
      position: absolute;
      color: #333;
      left: 12px;
      z-index: 1;
      width: 110px;
    }
    .login-smscode {
      display: flex;
      .login-smscode-input {
        width: 240px;
      }
      img {
        width: 112px;
        height: 40px;
        margin-left: 9px;
        cursor: pointer;
      }
    }
    .login-submit {
      padding-top: 5px;
      margin-bottom: 20px;
    }
    .login-bottom {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      line-height: 20px;
      color: #333;
      .forget {
        color: #333;
      }
      .register {
        color: #f90;
      }
    }
  }
}
</style>