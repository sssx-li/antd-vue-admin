<template>
  <div class="lanage-container">
    <a-popover class="lanage-select-box" placement="bottomRight" trigger="click" :visible="showModel" @visibleChange="showModel =! showModel">
      <template slot="content" class="lange-content">
        <input v-for="item in options" :key="item.value" type="text" readonly :value="item.value" :class="['lange-change',item.isDefault ? 'is-select': '']" @click="handleClick(item.value)">
      </template>
      <span>
        <svg-icon icon-class="language" class="select-language" />
      </span>
    </a-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      language: 'en',
      options: [
        { value: 'en', label: 'English', isDefault: true },
        { value: 'zh-cn', label: '中文', isDefault: false }
      ],
      showModel: false
    }
  },
  watch: {
    language: {
      handler: function(val, oldval) {
        this.options.forEach(item => {
          item.isDefault = item.value === val
        })
      }
    }
  },
  mounted() {
    this.language = this.$store.getters.language
  },
  methods: {
    handleClick(lang) {
      if (this.language === lang) return
      this.showModel = false
      this.$i18n.locale = lang
      this.language = lang
      this.$store.dispatch('user/setLanguage', lang)
      this.$message.success(this.$t('language.toggleLanguage'))
      this.$bus.$emit('change-language')
    }
  }
}
</script>

<style lang="less" scoped>
.lanage-container {
  text-align: right;
}
.lange-change {
  padding: 5px 12px;
  display: block;
  cursor: pointer;
  width: 150px;
  border: 0;
  &:hover {
    background:#F0FFF3;
  }
  &:focus {
    outline: none;
  }
}
.is-select {
  cursor: auto;
  background: rgb(243, 245, 240);
  &:hover {
    outline: none;
    background: rgb(243, 245, 240);
  }
}
.select-language {
  color: #ccc;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    fill: #4cd480;
  }
}
</style>
