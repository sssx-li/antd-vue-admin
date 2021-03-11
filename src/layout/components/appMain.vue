<template>
  <div>
    <a-layout-header style="background: #fff; padding: 0">
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

            <!-- avatar -->
            <span style="display: inline-block; border-right: 1px solid #ccc;height: 40px;margin: 0 10px 0 30px;" />
            <a-avatar style="backgroundColor:#87d068;margin: 0 10px;" icon="user" />
            <a-cascader :options="options" popup-placement="bottomRight" @change="onChange" @click="isUnfold = !isUnfold">
              <a href="#">
                <span class="handle-signout">
                  Antd-Admin
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
      isUnfold: false
    }
  },
  watch: {
    collapsed: {
      handler: function(val) {
        this.isCollapsed = val
      }
    }
  },
  mounted() {
    this.isCollapsed = this.collapsed
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
    }
  }
}
</script>

<style lang="less" scoped>
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
    color: #606266;
    &:hover {
      // text-decoration: underline;
      color: #4cd480;
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
  /deep/ .ant-breadcrumb {
    line-height: 64px;
    height: 64px;
  }
</style>
