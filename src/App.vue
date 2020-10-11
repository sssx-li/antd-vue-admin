<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#nprogress .bar {
  background: red !important; //自定义颜色
}
/deep/ .ant-message-notice-content {
  min-width: 440px!important;
  text-align: left!important;
}
</style>
