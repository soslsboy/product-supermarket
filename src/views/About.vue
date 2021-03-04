<template>
  <div class="about">
    <h1>This is an about page1</h1>
    <slide-verify
      :l="42"
      :r="10"
      :w="310"
      :h="155"
      slider-text="向右滑动"
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
      msg: ""
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
