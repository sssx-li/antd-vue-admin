<template>
  <div class="layout-container">
    <div class="layout-bar" />
    <div class="layout-right">
      <div class="layout-top" />
      <div class="layout-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layout-container {
  height: 100%;
  display: flex;
  .layout-bar {
    flex: 0 0 100px;
    border: 1px solid #f60;
  }
  .layout-right {
    flex: 1;
    border: 1px solid #f00;
    display: flex;
    flex-direction: column;
    .layout-top {
      flex: 0 0 60px;
      border-bottom: 5px solid #0f0;
    }
    .layout-content {
      flex: 1;
      background-color: #ccc;
    }
  }
}
</style>
