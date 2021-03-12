<template>
  <div class="dashboard-container">
    <!-- 按钮 -->
    <div class="item">
      <a-space :size="size" :direction="direction" :align="align">
        <a-button type="primary">
          Primary
        </a-button>
        <a-button>Default</a-button>
        <a-button type="dashed">
          Dashed
        </a-button>
        <a-button type="danger">
          Danger
        </a-button>
        <!-- 在同一操作区域最多出现一次 -->
        <a-config-provider :auto-insert-space-in-button="false">
          <a-button type="primary">
            按钮
          </a-button>
          <a-button type="primary">
            按钮
          </a-button>
        </a-config-provider>
        <a-button type="link">
          Link
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 'large', // small | middle | large | number
      direction: 'vertical', // horizontal(default) | vertical
      align: 'center' // start | end | center | baseline,
    }
  }
}
</script>

<style lang="less" scoped>
</style>
