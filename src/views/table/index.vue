<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser']
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ],
      columns: [
        {
          title: 'Name', // 列头显示文字
          dataIndex: 'name', // 列数据在数据项中对应的 key
          key: 'name', // Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
          scopedSlots: { customRender: 'name' } // 使用 columns 时，可以通过该属性配置支持 slot-scope 的属性
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: 80 // 列宽度
        },
        {
          title: 'Address', //
          dataIndex: 'address',
          key: 'address 1',
          ellipsis: true // 超过宽度自动省略
        },
        {
          title: 'Long',
          dataIndex: 'address',
          key: 'address 2',
          ellipsis: true
        },
        {
          title: 'Long Column Long Column',
          dataIndex: 'address',
          key: 'address 3',
          ellipsis: true
        },
        {
          title: 'Long Column',
          dataIndex: 'address',
          key: 'address 4',
          ellipsis: true
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
