<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "Home",
  components: {
    HelloWorld
  },
  mounted() {
    this.$store.commit('add');
    this.$api.apiGet()
      .then(res => {
        console.log('success',res)
      })
      .catch(err => {
        console.log('fail',err)
      })
    this.$api.apiPost()
      .then(res => {
        console.log('Psuccess',res)
      })
      .catch(err => {
        console.log('Pfail',err)
      })
    this.$api.apiPost()
      .then(res => {
        console.log('Psuccess',res)
      })
      .catch(err => {
        console.log('Pfail',err)
      })
  }
};
</script>
