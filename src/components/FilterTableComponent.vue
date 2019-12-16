<template lang="pug">
  FilterTable(
    :list="list"
    :filters="filters"
    :tableList="tableList"
    :pageNum="pageNum"
    :pageSize="pageSize"
    :total="total"
    @listenHandleClickFilterButton="handleClickFilterButton"
    @listenHandleClickTableColumnHref="handleClickTableColumnHref"
    @listenHandleChangePaginationSize="handleChangePaginationSize"
    @listenHandleChangePaginationNum="handleChangePaginationNum"
  )
</template>

<script>
  import CFilterTable from './search/CFilterTable'
  import List from './search/List'

  export default {
    name: 'FilterTableComponent',
    components: {
      CFilterTable,
      List
    },
    created() {},
    data() {
      return {
        pageNum: 1,
        pageSize: 20,
        total: 0,
        tableList: [],
        list,
        filters: list.filterList.reduce((obj, item) => {
          if (item.type !== 'button') {
            obj[item.key] = ''
          }
          return obj
        }, {}),
      }
    },
    methods: {
      handleClickFilterButton(buttonKey) {
        if (buttonKey === 'search') {
          this.handleClickSearch()
        }
        if (buttonKey === 'reset') {
          this.handleClickReset()
        }
        if (buttonKey === 'export') {
          this.handleClickExport()
        }
        if (buttonKey === 'add') {
          this.handleClickAdd()
        }
      },
      handleClickTableColumnHref(columnKey, row) {
        if (columnKey === 'edit') {
          console.log('click column edit')
        }
      },
      handleChangePaginationSize(size) {
        this.pageNum = 1
        this.pageSize = size
        this.handleClickSearch()
      },
      handleChangePaginationNum(num) {
        this.pageNum = num
        this.handleClickSearch()
      },
      async handleClickSearch() {
      },
      handleClickAdd() {
      },
      async handleClickReset() {
        this.filters = list.filterList.reduce((obj, item) => {
          if (item.type !== 'button') {
            obj[item.key] = ''
          }
          return obj
        }, {})
      }
    }
  }
</script>

<style scoped>

</style>
