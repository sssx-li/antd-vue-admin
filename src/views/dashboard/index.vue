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
    <div class="item">
      <a-pagination
        :default-current="defaultCurrentPage"
        :current="currentPage"
        :total="total"
        :page-size="pageSize"
        :page-size-options="pageSizeOptions"
        show-size-changer
        :show-total="showTotalData"
        @change="changeCurrentPage"
        @showSizeChange="changePageSize"
      />
    </div>
    <div class="item">
      <a-space size="large" direction="vertical" align="center">
        <a-input-search size="large" placeholder="input search text" style="width: 300px" @search="onSearch" />

        <a-input ref="userNameInput" v-model="userName" placeholder="Basic usage" style="width: 220px">
          <a-icon slot="prefix" type="user" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>

        <a-input-group compact>
          <a-select style="width: 30%" default-value="Home">
            <a-select-option value="Home">
              Home
            </a-select-option>
            <a-select-option value="Company">
              Company
            </a-select-option>
          </a-select>
          <a-cascader style="width: 70%" :options="options" placeholder="Select Address" />
        </a-input-group>
      </a-space>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 'middle', // small | middle | large | number
      direction: 'horizontal', // horizontal(default) | vertical
      align: 'start', // start | end | center | baseline,
      defaultCurrentPage: 6, // 默认的当前页
      currentPage: 6, // 当前页
      total: 666, // 每页条数
      pageSize: 10, // 每页条数
      pageSizeOptions: ['5', '10', '30', '50', '100'], // 指定每页可显示多少条，需配合 showSizeChanger (是否可以改变pageSize)
      userName: '',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 用于显示数据总量和当前数据顺序
    showTotalData(total, range) {
      return `total ${total}`
    },
    // 页码改变的回调
    changeCurrentPage(page, pageSize) {
      this.currentPage = page
    },
    // pageSize变化的回调
    changePageSize(current, size) {
      this.pageSize = size
    },
    onSearch(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard-container {
  .item {
    margin-bottom: 20px;
  }
}
</style>
