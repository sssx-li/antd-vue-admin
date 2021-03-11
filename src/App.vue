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
  background: #4cd480 !important; //自定义进度条颜色
}
</style>
