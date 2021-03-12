<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['language', 'locale'])
  }
}
</script>
<style lang="less">
#nprogress .bar {
  background: #c2f0d3 !important; //自定义进度条颜色
}
</style>
