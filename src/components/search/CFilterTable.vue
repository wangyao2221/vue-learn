<template lang="pug">
  .c-table-container
    el-form.search-box
      el-row(:gutter="20")
        template(v-for="item in list.filterList")
          el-col(
            v-if="item.type==='button'"
            :span="item.span"
            :key="item.key")
            el-button(:type="item.config.type" @click="handleClickFilterButton(item.key)") {{ item.label }}
          el-col(
            v-else
            :span="item.span"
            :key="item.key")
            el-form-item(
              :label="item.label"
              :prop="item.key"
              label-width="110px")
              el-input(
                v-if="item.type==='input'"
                v-model="filters[item.key]")
              el-select(
                v-if="item.type==='select'"
                v-model="filters[item.key]")
                el-option(
                  v-for="option in item.options"
                  :key="option.key"
                  :value="option.val"
                  :label="option.label")
              el-select(
                v-if="item.type==='select-filterable'"
                v-model="filters[item.key]"
                filterable placeholder="请选择")
                el-option(
                  v-for="option in item.options"
                  :key="option.key"
                  :value="option.val"
                  :label="option.label")
              el-date-picker(
                v-if="item.type==='datePicker'"
                v-model="filters[item.key]"
                :type="item.config.type"
                :range-separator="item.config.rangeSeparator"
                :start-placeholder="item.config.startPlaceholder"
                :end-placeholder="item.config.endPlaceholder")

    el-table(:data="tableList" border)
      el-table-column(
        type="index"
        label="序号"
        align="center")
      el-table-column(
        v-for="item in list.tableColumns"
        :key="item.key"
        :label="item.label"
        :prop="item.key"
        align="center")
        template(slot-scope="scope")
          a(
            v-if="item.type === 'href'"
            class="blue"
            @click="handleClickTableColumnHref(item.key, scope.row)"
          ) {{ item.filter(scope.row) }}

          span(v-else) {{ item.filter ? item.filter(scope.row) : scope.row[item.key] }}
    el-pagination(
      @size-change="handleChangePaginationSize"
      @current-change="handleChangePaginationNum"
      :page-sizes="[10, 20, 50, 100]"
      :current-page.sync="selfPageNum"
      :page-size="selfPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total")
</template>

<script>
  export default {
    props: [
      'list',
      'tableList',
      'total',
      'pageNum',
      'pageSize',
      'filters',
      'listenHandleClickFilterButton',
      'listenHandleClickTableColumnHref',
      'listenHandleChangePaginationSize',
      'listenHandleChangePaginationNum'
    ],
    data() {
      return {
        selfPageNum: this.pageNum,
        selfPageSize: this.pageSize
      }
    },
    methods: {
      handleClickFilterButton(filterKey) {
        this.$emit('listenHandleClickFilterButton', filterKey)
      },
      handleClickTableColumnHref(columnKey, row) {
        this.$emit('listenHandleClickTableColumnHref', columnKey, row)
      },
      handleChangePaginationSize(val) {
        this.selfPageNum = 1
        this.selfPageSize = val
        this.$emit('listenHandleChangePaginationSize', val)
      },
      handleChangePaginationNum(val) {
        this.selfPageNum = val
        this.$emit('listenHandleChangePaginationNum', val)
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .blue {
    color: #409eff;
  }
  .c-table-container {
    padding: 15px;
    min-height: 500px;
    .search-box.el-form {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        .el-input {
          width: 160px;
        }
      }
    }
    .extand {
      .el-form-item {
        width: 25%;
      }
    }
    .el-pagination {
      text-align: right;
      padding: 10px;
    }
  }
</style>
