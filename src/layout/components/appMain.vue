<template>
  <div>
    <a-layout-header>
      <div class="crumbs">
        <a-icon
          class="trigger"
          :type="isCollapsed ? 'menu-unfold' : 'menu-fold'"
          @click="changecollapsed"
        />
        <div class="curmb-content">
          <bread-crumb />
          <div class="lang-select-avator">
            <!-- select language -->
            <select-language class="select-language-box" />

            <!-- select theme -->
            <a-select :default-value="curTheme" style="width: 120px" class="select-element" @change="selectTheme">
              <a-select-option v-for="item in themeList" :key="item.value" :value="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>

            <!-- avatar -->
            <span style="display: inline-block; border-right: 1px solid #ccc;height: 40px;margin: 0 10px 0 30px;" />
            <a-avatar style="backgroundColor:#87d068;margin: 0 10px;" icon="user" />
            <a-cascader :options="options" popup-placement="bottomRight" @change="onChange" @click="isUnfold = !isUnfold">
              <a href="#">
                <span class="handle-signout">
                  Antd
                  <a-icon style="font-size: 12px" :type="isUnfold ? 'up' : 'down'" />
                </span>
              </a>
            </a-cascader>
          </div>
        </div>
      </div>
    </a-layout-header>
  </div>
</template>

<script>
import BreadCrumb from './breadcrumb/index.vue'
import SelectLanguage from '@/components/langSelect/index'
export default {
  components: {
    SelectLanguage,
    BreadCrumb
  },
  props: {
    collapsed: [Boolean]
  },
  data() {
    return {
      options: [
        { value: 'setting', label: 'Setting' },
        { value: 'about', label: 'About' },
        { value: 'signout', label: 'Sign out' }
      ],
      isCollapsed: false,
      isUnfold: false,
      curTheme: 'default',
      themeList: [
        { value: 'default', label: '默认主题' },
        { value: 'dark', label: '深色主题' },
        { value: 'light', label: '浅色主题' }
      ],
      colorList: {
        default: {
          '@primary-color': '#485DFC',
          '@btn-primary-bg': '#485DFC',
          '@layout-header-background': '#485DFC',
          '@menu-dark-submenu-bg': '#222e8b'
        },
        dark: {
          '@primary-color': '#4217D4',
          '@btn-primary-bg': '#4217D4',
          '@layout-header-background': '#4217D4',
          '@menu-dark-submenu-bg': '#2f1097'
        },
        light: {
          '@primary-color': '#c0ad89',
          '@btn-primary-bg': '#c0ad89',
          '@layout-header-background': '#c0ad89',
          '@menu-dark-submenu-bg': '#66522c'
        }
      }
    }
  },
  watch: {
    collapsed: {
      handler: function(val) {
        this.isCollapsed = val
      }
    }
  },
  created() {
    this.isCollapsed = this.collapsed
    const theme = window.localStorage.getItem('antd-vue-theme')
    document.querySelector('body').className = 'theme-' + (theme || 'default')
    if (theme) {
      this.curTheme = theme
      window.less.modifyVars(this.colorList[theme])
    }
  },
  methods: {
    changecollapsed() {
      this.$emit('changecollapsed')
    },
    onChange(val) {
      if (val[0] === 'about') {
        this.$message.success('about')
      } else if (val[0] === 'setting') {
        this.$message.success('setting')
      } else if (val[0] === 'signout') {
        this.$store
          .dispatch('user/logout')
          .then(() => {
            this.$router.push({ path: '/login' })
          })
          .catch(() => {})
      }
      this.isUnfold = !this.isUnfold
    },
    selectTheme(val) {
      this.curTheme = val
      window.localStorage.setItem('antd-vue-theme', val)
      document.querySelector('body').className = 'theme-' + val
      window.less.modifyVars(this.colorList[val]).then(() => {
        this.$message.success(this.$t('common.success'))
      }).catch((error) => {
        this.$message.success(this.$t('common.error'))
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-layout-header {
  padding: 0;
  .select-element {
    margin-left: 20px;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  .handle-signout {
      // cursor: pointer;
      color: #fff;
      &:hover {
        // text-decoration: underline;
        color: #a5aaca;
      }
    }
  .crumbs {
    display: flex;
    .curmb-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
    }
    .lang-select-avator {
      margin-top: -4px;
      align-items: center;
      margin-right: 24px;
      display: flex;
      .select-language-box {
        margin-top: 5px;
      }
    }
  }
  .ant-breadcrumb {
    line-height: 64px;
    height: 64px;
  }
}
</style>
