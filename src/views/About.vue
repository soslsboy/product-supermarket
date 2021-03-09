<template>
  <div class="about">
    <h1>This is an about page1</h1>
    <slide-verify
      :l="42"
      :r="10"
      :w="310"
      :h="155"
      :imgs="picArray"
      :show="false"
      slider-text="向右滑动完成验证"
      @success="onSuccess"
      @fail="onFail"
      @refresh="onRefresh"
    ></slide-verify>
    <div>{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "",
      picArray: [
        require('@/assets/verify/1.jpg'),
        require('@/assets/verify/2.jpg'),
        require('@/assets/verify/3.jpg'),
        require('@/assets/verify/4.jpg'),
        require('@/assets/verify/5.jpg'),
        require('@/assets/verify/6.jpg'),
        require('@/assets/verify/7.jpg'),
        require('@/assets/verify/8.jpg')
      ]
    };
  },
  mounted() {
    console.log(123123);
  },
  methods: {
    onSuccess() {
      this.msg = "login success";
    },
    onFail() {
      this.msg = "";
    },
    onRefresh() {
      this.msg = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  .b {
    font-size: 16px;
  }
}
</style>
