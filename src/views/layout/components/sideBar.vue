<template>
  <div class="sidebar-container">
    <a-layout-sider v-model="isCollapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['/']">
        <template v-for="item in routers">
          <template v-if="!item.hidden && item.children">
            <!-- menu -->
            <a-menu-item v-if="item.children.length === 1" :key="item.path">
              <a-icon :type="item.children[0].meta.icon" />
              <router-link style="display: inline-block" :to="{path: item.path}">
                {{ generateTitle(item.children[0].meta.title) }}
              </router-link>
            </a-menu-item>
            <!-- submenu -->
            <a-sub-menu v-else :key="item.path || item.name">
              <span slot="title">
                <a-icon :type="item.meta.icon" />
                <span>{{ generateTitle(item.meta.title) }}</span>
              </span>
              <template v-for="subItem in item.children">
                <a-menu-item v-if="!subItem.children" :key="subItem.path">
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
      onlyOneChild: null
    }
  },
  watch: {
    collapsed: {
      handler: function(val) {
        this.isCollapsed = val
      }
    }
  },
  methods: {
    generateTitle
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
