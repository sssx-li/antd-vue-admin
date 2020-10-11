<template>
  <div>
    <!-- test代码 -->
    <!-- <button v-show="loginIn">logout</button> -->
    <!-- svg icon -->
    <!-- <svg-icon icon-class="device" /> -->
    username: <input v-model="loginForm.username" type="text"> <br>
    password: <input v-model="loginForm.password" type="password">
    <br>
    <button type="button" @click="login">submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // loginIn: false,
      // admin or editor
      loginForm: {
        username: 'admin',
        password: 'admin'
      }
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          this.$router.push({ path: '/home' })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
