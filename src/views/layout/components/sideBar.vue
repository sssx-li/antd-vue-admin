<template>
  <div class="sidebar-container">
    <a-layout-sider v-model="isCollapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :selected-keys="activeMenu" :open-keys="openKeys" @click="menuClick" @openChange="onOpenChange">
        <template v-for="item in routers">
          <template v-if="!item.hidden && item.children">
            <!-- menu -->
            <a-menu-item v-if="item.children.length === 1" :key="item.path === '/' ? `${item.path}${item.children[0].path}`: `${item.path}/${item.children[0].path}`">
              <a-icon :type="item.children[0] && item.children[0].meta && item.children[0].meta.icon" />
              <router-link style="display: inline-block" :to="{path: item.path === '/' ? `${item.path}${item.children[0].path}` : `${item.path}/${item.children[0].path}`}">
                {{ generateTitle(item.children[0].meta.title) }}
              </router-link>
            </a-menu-item>
            <!-- submenu -->
            <a-sub-menu v-else :key="item.path">
              <span slot="title">
                <a-icon :type="item.meta && item.meta.icon" />
                <span v-if="item.meta">{{ generateTitle(item.meta.title) }}</span>
              </span>
              <template v-for="subItem in item.children">
                <a-menu-item v-if="!subItem.children" :key="item.path + '/' + subItem.path">
                  <a-icon v-if="subItem.meta.icon" :type="subItem.meta && subItem.meta.icon" />
                  <router-link style="display: inline-block" :to="item.path + '/' + subItem.path">
                    {{ generateTitle(subItem.meta.title) }}
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
      rootSubmenuKeys: ['/form', '/about'] // submenu数组
    }
  },
  computed: {
    activeMenu() {
      return [this.$route.path]
    },
    router() {
      return this.$route.path
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
    const openKeys = window.sessionStorage.getItem('open-menu-key')
    if (openKeys) this.openKeys = [openKeys]
  },
  methods: {
    generateTitle,
    // 点击菜单触发事件
    menuClick({ item, key, keyPath }) {
      // length为1则说明没有子菜单
      if (keyPath.length === 1) {
        this.openKeys = []
        window.sessionStorage.clear()
      } else window.sessionStorage.setItem('open-menu-key', keyPath.pop()) // 将他们的副路由存入sessionStorage，张开激活submenu菜单
    },
    // 子菜单展开/关闭的回调
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      this.openKeys = this.rootSubmenuKeys.indexOf(latestOpenKey) === -1 ? openKeys : latestOpenKey ? [latestOpenKey] : []
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
