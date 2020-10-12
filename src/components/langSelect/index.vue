<template>
  <div class="lange-container">
    <a-cascader :options="options" popup-placement="bottomRight" @change="onChange">
      <a href="#">
        <svg-icon icon-class="language" class="select-language" />
      </a>
    </a-cascader>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      language: '',
      options: [
        { value: 'en', label: 'English' },
        { value: 'zh-cn', label: '中文' }
      ]
    }
  },
  methods: {
    onChange(val) {
      this.$i18n.locale = val[0]
      this.language = val[0]
      this.$store.dispatch('user/setLanguage', val[0])
      this.$message.success(this.$t('language.toggleLanguage'))
      this.$bus.$emit('change-language')
    }
  },
  mounted() {
    this.language = this.$store.getters.language
  },
  watch: {
    language: {
      handler: function(val, oldval) {
        this.options.forEach(item => {
          item.value === this.language ? item.disabled = true : item.disabled = false
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.lange-container {
  text-align: right;
  margin-bottom: 5px;
}
.ant-cascader-menu {
  min-height: 40px;
}
.select-language {
  fill: #fff;
  font-size: 26px;
  &:hover {
    fill: #4cd480;
  }
}
</style>
