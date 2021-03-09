<template>
  <slide-verify
    :l="42"
    :r="10"
    :w="310"
    :h="155"
    :imgs="picArray"
    :show="false"
    slider-text="向右滑动完成验证"
    ref="slideverify"
    @success="onSuccess"
    @fail="onFail"
    @refresh="onRefresh"
  ></slide-verify>
</template>

<script>
export default {
  name: 'SliderVerify',
  data() {
    return {
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
    }
  },
  methods: {
    onSuccess() {
      this.$emit('success');
    },
    onReset() {
      this.$refs.slideverify.reset();
    },
    onFail() {},
    onRefresh() {}
  }
}
</script>