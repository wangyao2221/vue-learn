<template>

</template>

<script>
  export default {
    name: 'List.vue'
  }

  const list = {
    filterList: [
      {
        label: '座位号',
        key: 'id',
        type: 'input',
        span: 6
      },
      {
        label: '班级',
        key: 'class',
        type: 'select',
        options: [
          {
            key: '1',
            label: '一班',
            val: '1'
          },
          {
            key: '2',
            label: '二班',
            val: '2'
          }
        ],
        span: 6
      },
      {
        label: '入学日期',
        key: 'statPeriod',
        type: 'datePicker',
        span: 6,
        config: {
          type: 'date',
          placeholder: '选择日期'
        }
      },
      {
        label: '入校时长',
        key: 'backDate',
        type: 'datePicker',
        config: {
          type: 'daterange',
          rangeSeparator: '至',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期'
        },
        span: 12
      },
      {
        label: '查询',
        key: 'search',
        type: 'button',
        config: {
          type: 'primary'
        },
        span: 2
      },
      {
        label: '重置',
        key: 'reset',
        type: 'button',
        config: {
          type: ''
        },
        span: 2
      },
      {
        label: '导出',
        key: 'export',
        type: 'button',
        config: {
          type: 'success'
        },
        span: 2
      }
    ],
    tableColumns: [
      {
        label: '状态',
        key: 'stateName'
      },
      {
        label: '编号',
        key: 'code'
      },
      {
        label: '姓名',
        key: 'name'
      },
      {
        label: '年龄',
        key: 'remark'
      },
      {
        label: '操作',
        key: 'edit',
        type: 'href',
        filter: () => '编辑'
      }
    ]
  }
</script>

<style>

</style>
