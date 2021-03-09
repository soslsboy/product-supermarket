<template>
  <div class="login_head_foot">
    <div class="login_head">
      <div class="width_1280">
        <div class="login_head_left">
          <img class="login_head_logo" src="@/assets/logo.png" alt="logo">
          <div class="login_head_title">
            <h4>工业品超市</h4>
            <p>一站式PCB原材料服务平台</p>
          </div>
          <div class="login_head_page">{{name}}</div>
        </div>
        <div class="login_head_right">
          <span>如有疑问？</span>
          <img src="@/assets/icon-serve.png" alt="serve">
          <router-link to="/onlineServe">在线咨询</router-link>
          <span class="line">|</span>
          <router-link to="/helpCenter">帮助中心</router-link>
        </div>
      </div>
    </div>
    <slot></slot>
    <div class="login_foot">
      <div class="width_1280">
        <p>
          <router-link to="/">关于我们</router-link>
          <span>|</span>
          <router-link to="/">投资者关系</router-link>
          <span>|</span>
          <router-link to="/">人才招聘</router-link>
          <span>|</span>
          <router-link to="/">帮助中心</router-link>
          <span>|</span>
          <router-link to="/">友情链接</router-link>
          <span>|</span>
          <router-link to="/">联系我们</router-link>
        </p>
        <p>Copyright © 2020 Jiepei.com Inc. All Rights Reserved.  版权所有：杭州捷配信息科技有限公司 浙ICP备10014259号-119</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginHeadFoot',
  props: {
    name: String
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.login_head {
  height: 80px;
  background-color: #7B5822;
  .width_1280 {
    display: flex;
    justify-content: space-between;
  }
  .login_head_left {
    height: 80px;
    display: flex;
    align-items: center;
    .login_head_logo {
      width: 50px;
      height: 50px;
      margin-right: 20px;
    }
    .login_head_title {
      margin-right: 29px;
      h4 {
        font-size: 30px;
        font-weight: bold;
        line-height: 40px;
        color: #fff;
        margin-bottom: 2px;
      }
      p {
        font-size: 12px;
        line-height: 16px;
        color: #fff;
      }
    }
    .login_head_page {
      font-size: 20px;
      color: #fff;
    }
  }
  .login_head_right {
    height: 80px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #fff;
    span {
      margin-right: 6px;
    }
    img {
      margin-right: 3px;
      width: 24px;
      line-height: 24px;
    }
    a {
      color: #fff;
    }
    .line {
      color: #907245;
      margin: 0 14px;
    }
  }
}
.login_foot {
  height: 200px;
  padding-top: 30px;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  color: #333;
  a {
    color: #333;
  }
  span {
    margin: 0 5px;
  }
}
</style>