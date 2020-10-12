<template>
  <a-locale-provider :locale="locale">
    <div id="app">
        <router-view />
    </div>
  </a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('en')
export default {
  data() {
    return {
      locale: null, // 默认为 en
      zhCN
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  watch: {
    language: {
      handler: function(val, oldval) {
        moment.locale(val)
      },
      deep: true
    }
  },
  mounted() {
    if (this.language === 'zh-cn') this.locale = this.zhCN
    else this.locale = null
    moment.locale(this.language)
    this.$bus.$on('change-language', async() => {
      var language = await this.$store.getters.language
      if (language === 'zh-cn') this.locale = this.zhCN
      else this.locale = null
      const languageList = ['en', 'zh-cn']
      if (languageList.includes) {
        moment.locale(language)
      }
    })
  },
  methods: {
    moment
  }
}
</script>
<style lang="less">
#nprogress .bar {
  background: red !important; //自定义颜色
}
/deep/ .ant-message-notice-content {
  min-width: 440px!important;
  text-align: left!important;
}
</style>
