<template>
  <div class="sidebar-container">
    <a-layout-sider v-model="isCollapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
export default {
  props: {
    collapsed: [Boolean]
  },
  data() {
    return {
      isCollapsed: false
    }
  },
  watch: {
    collapsed: {
      handler: function(val) {
        this.isCollapsed = val
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
