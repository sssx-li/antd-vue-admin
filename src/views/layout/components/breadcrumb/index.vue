<template>
  <div>
    <a-breadcrumb style="background: #fff; padding: 0">
      <a-breadcrumb-item v-for="(item, index) in crumbList" :key="item.path">
        <span v-if="item.redirect==='undefined' || index == crumbList.length - 1" class="no-redirect">{{ generateTitle(item.name) }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ generateTitle(item.meta.title) }}</a>
        <!-- {{generateTitle(item.name)}} -->
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
import { generateTitle } from './index'
// 将路径字符串（如/ user /：name）转换为正则表达式。
// import pathToRegexp from 'path-to-regexp'
const pathToRegexp = require('path-to-regexp')
export default {
  data() {
    return {
      crumbList: []
    }
  },
  watch: {
    $route: {
      handler: function(val) {
        this.getBreadCrumb()
      }
    }
  },
  mounted() {
    this.getBreadCrumb()
  },
  methods: {
    generateTitle,
    getBreadCrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }, name: 'Dashboard' }].concat(matched)
      }
      this.crumbList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      console.log(this.crumbList)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    handleLink(item) {
      console.log('item', item)
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      console.log(path)
      const { params } = this.$route
      console.log(pathToRegexp)
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    }
  }
}
</script>

<style lang="less" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>
