<template>
  <div class="sidebar-container">
    <a-layout-sider v-model="isCollapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="activeMenu" :open-keys="openKeys" @click="menuClick" @openChange="onOpenChange">
        <template v-for="item in routers">
          <template v-if="!item.hidden && item.children">
            <!-- menu -->
            <a-menu-item v-if="item.children.length === 1" :key="'/' + item.children[0].path">
              <a-icon :type="item.children[0] && item.children[0].meta && item.children[0].meta.icon" />
              <router-link style="display: inline-block" :to="{path: item.path}">
                {{ generateTitle(item.children[0].meta.title) }} {{ item.children[0].path }}
              </router-link>
            </a-menu-item>
            <!-- submenu -->
            <a-sub-menu v-else :key="item.path">
              <span slot="title">
                <a-icon :type="item.meta && item.meta.icon" />
                <span v-if="item.meta">{{ generateTitle(item.meta.title) }} {{ item.path }}</span>
              </span>
              <template v-for="subItem in item.children">
                <a-menu-item v-if="!subItem.children" :key="subItem.path">
                  <a-icon v-if="subItem.meta.icon" :type="subItem.meta && subItem.meta.icon" />
                  <router-link style="display: inline-block" :to="item.path + '/' + subItem.path">
                    {{ generateTitle(subItem.meta.title) }} {{ subItem.path }}
                  </router-link>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
import { generateTitle } from './breadcrumb/index.js'
export default {
  name: 'SubMenu',
  props: {
    collapsed: [Boolean],
    routers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isCollapsed: false,
      onlyOneChild: null,
      openKeys: [''],
      rootSubmenuKeys: ['/form', '/about'],
      latestOpenKey: ''
    }
  },
  computed: {
    activeMenu() {
      console.log(this.$route.matched)
      return [this.$route.path]
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
    console.log('0', this.activeMenu)
    const openKeys = window.sessionStorage.getItem('open-menu-key')
    if (openKeys) {
      // 存在即赋值
      this.openKeys = [openKeys]
    }
  },
  methods: {
    generateTitle,
    // 点击菜单事件
    menuClick({ item, key, keyPath }) {
      console.log('key', key)
      /* if (keyPath.length === 1) {
        console.log(0)
      } else {
        console.log(1)
      }
      this.openKeys = keyPath.includes(this.latestOpenKey) ? [this.latestOpenKey] : [] */
    },
    // 子菜单展开/关闭的回调
    onOpenChange(openKeys) {
      console.log('openKeys', openKeys)
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      window.sessionStorage.setItem('open-menu-key', latestOpenKey)
      console.log(latestOpenKey)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
