<template>
  <div class="layout-container">
    <a-layout id="components-layout-demo-custom-trigger">
      <!-- 左侧导航 -->
      <side-bar v-if="hideSideBar" id="sideBar" :collapsed="collapsed" :routers="routers" :parent-node-list="parentNodeList" />
      <!-- 右侧布局 -->
      <a-layout>
        <!-- 面包屑 -->
        <app-main :collapsed="collapsed" @changecollapsed="changecollapsed" />
        <!-- 内容 : 路由出口 -->
        <a-layout-content class="main-container">
          <!-- 国际化测试组件 -->
          <!-- <a-pagination :default-current="1" :total="50" show-size-changer /> -->
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import SideBar from './components/sideBar'
import AppMain from './components/appMain'
export default {
  components: {
    SideBar,
    AppMain
  },
  data() {
    return {
      collapsed: false,
      parentNodeList: [],
      device: 'desktop',
      hideSideBar: true
    }
  },
  computed: {
    routers() {
      return this.$router.options.routes
    }
  },
  watch: {
    device(val) {
      this.hideSideBar = val !== 'mobile'
    }
  },
  mounted() {
    this.resizeHandle()
    window.addEventListener('resize', this.resizeHandle)
    this.$router.options.routes.forEach(item => {
      if (item.path !== '/') this.parentNodeList.push(item.path)
    })
  },
  methods: {
    changecollapsed() {
      this.collapsed = !this.collapsed
      this.hideSideBar = this.device === 'desktop' ? true : !this.hideSideBar
    },
    resizeHandle() {
      const WIDTH = document.body.clientWidth
      this.device = WIDTH - 1 < 992 ? 'mobile' : 'desktop'
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  height: 100%;
  /deep/ .ant-layout {
    &.ant-layout-has-sider {
      height: 100%;
    }
    .ant-layout-sider {
      height: 100%;
    }
    .ant-layout-content {
      padding: 20px;
    }
  }
}
</style>
