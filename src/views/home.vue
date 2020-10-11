<template>
  <div>
    <button @click="checkLogout">登出</button>
    恭喜你 登录成功
  </div>
</template>

<script>
export default {
  methods: {
    checkLogout() {
      this.$store
        .dispatch('user/logout')
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped></style>
