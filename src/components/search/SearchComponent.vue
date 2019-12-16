<template>
  <div id="searchComponent">
    <el-row style="margin: 5px 0px;">
      <el-col v-if="searchComponentVisible" :span="24">
        <div v-if="searchConfig && data">
          <el-row>
            <el-col
              v-for="(item,index) in searchConfig.items"
              :key="index"
              :span="6"
              v-if="index < (searchConfig.defaultShowCount ? searchConfig.defaultShowCount : 3) || moreSearchVisible">
              <el-input
                :size="searchConfig.size"
                v-if="item.type === 'input' && (item.method === 'equals' || item.method === 'contains')"
                class="pull-right search-item"
                v-model="item.value"
                :label="item.label"
                :placeholder="item.placeholder == null || item.placeholder === '' ? (item.label == null ? '' : item.label) : item.placeholder"
                @keyup.enter.native="handleSearch">
              </el-input>
              <div class="el-input el-input--mini pull-right input-range search-item" v-if="item.type === 'input' && (item.method === 'range')">
                <div class="range-label">{{ (item.label == null ? '' : item.label) + ':' }}</div>
                <div class="pull-left range-value"><el-input v-model="item.min" class="no-border" placeholder="min" @keyup.enter.native="handleSearch"></el-input></div>
                <div class="pull-left range-value"><el-input v-model="item.max" placeholder="max" @keyup.enter.native="handleSearch"></el-input></div>
              </div>
              <el-date-picker
                style="width: 90%;"
                :size="searchConfig.size"
                class="pull-right search-item"
                v-if="item.type === 'date' && (item.method === 'range')"
                v-model="item.value"
                type="daterange"
                range-separator="至"
                :start-placeholder="item.startPlaceholder == null || item.startPlaceholder === '' ? '请选择开始时间(' + (item.label == null ? '' : item.label) + ')' : item.startPlaceholder"
                :end-placeholder="item.endPlaceholder == null || item.endPlaceholder === '' ? '请选择结束时间(' + (item.label == null ? '' : item.label) + ')' : item.endPlaceholder"
                @change="handleSearch">
              </el-date-picker>
              <el-date-picker
                style="width: 90%;"
                :size="searchConfig.size"
                class="pull-right search-item"
                v-if="item.type === 'date' && (item.method === 'equals')"
                v-model="item.value"
                :placeholder="item.placeholder == null || item.placeholder === '' ? '请选择时间(' + (item.label == null ? '' : item.label) + ')' : item.placeholder"
                @change="handleSearch">
              </el-date-picker>
              <el-select
                @visible-change="loadSelectOptions()"
                :loading="selectOptionLoading"
                :size="searchConfig.size"
                class="input-size pull-right search-item"
                v-model="item.value"
                :placeholder="item.placeholder == null || item.placeholder === '' ? (item.label == null ? '' : item.label) : item.placeholder"
                clearable
                @change="handleSearch"
                v-if="item.type === 'select'">
                <el-option
                  v-for="option in item.options"
                  :key="option"
                  :value="option"
                  :label="option">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-button
                :size="searchConfig.size"
                v-if="searchComponentVisible"
                type="primary"
                class="pull-right search-item"
                icon="el-icon-circle-plus-outline"
                @click="showDialog">
                增加搜索项
              </el-button>
            </el-col>
          </el-row>
          <div class="pull-left">

          </div>
          <!--   没有这一行渲染会出问题？   -->
          <div hidden="true">{{ this.searchData.length }}</div>
        </div>
        <div v-if="!searchConfig">搜索组件配置信息未给定</div>
        <div v-if="!data">搜索组件数据源未给定</div>
      </el-col>
      <el-col style="margin: 5px 0px" :span="24">
        <el-button :icon="!moreSearchVisible ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" style="float: left;" @click="moreSearchVisible = !moreSearchVisible">{{ moreSearchVisible ? '常用搜索项' : '更多搜索项' }}</el-button>
        <el-button :size="searchConfig.size" v-if="searchComponentVisible" type="primary" class="pull-left" icon="el-icon-search" @click="handleSearch">查询</el-button>
      </el-col>
    </el-row>

    <el-dialog
      title="增加搜索项"
      :visible.sync="dialogVisible"
      width="250px"
      center>
      <el-select class="search-item-select" v-model="addSearchItemKey" placeholder="数据字段">
        <el-option v-for="key in searchKeys" :key="key" :value="key" :label="key"></el-option>
      </el-select>
      <el-input v-model="addSearchItemLabel" class="search-item-select" placeholder="字段标签"></el-input>
      <el-select :disabled="addSearchItemKey === '' || addSearchItemKey == null" class="search-item-select" v-model="addSearchItemType" @change="handleAddSearchItemTypeChange" placeholder="类型">
        <el-option value="input" label="输入框"></el-option>
        <el-option value="select" label="选择器"></el-option>
        <el-option value="date" label="日期选择器"></el-option>
      </el-select>
      <el-select :disabled="addSearchItemType === null || addSearchItemType === ''" class="search-item-select" v-model="addSearchItemMethod" placeholder="匹配方式">
        <el-option value="equals" label="相等"></el-option>
        <el-option :disabled="addSearchItemType !== 'input'" value="contains" label="包含"></el-option>
        <el-option :disabled="addSearchItemType == null || addSearchItemType === '' || addSearchItemType === 'select'" value="range" label="范围"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddSearchItem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'SearchComponent',
  props: ['config', 'data'],
  data () {
    return {
      configSessionKey: 'searchComponentConfig:' + this.$route.path,
      searchConfig: {},
      searchComponentVisible: true,
      dialogVisible: false,
      moreSearchVisible: false,
      selectOptionLoading: true,
      searchData: [],
      searchKeys: [],
      addSearchItemKey: null,
      addSearchItemLabel: null,
      addSearchItemType: null,
      addSearchItemMethod: null
    }
  },
  watch: {
    searchConfig: {
      handler() {
        this.updateSelectOptions();
        // localStorage.setItem(this.configSessionKey, JSON.stringify(this.searchConfig)); 本地缓存，关闭浏览器重新打开也能保留增加的搜索项
        // 只在刷新页面时才会保留增加的搜索项
        sessionStorage.setItem(this.configSessionKey, JSON.stringify(this.searchConfig));
      },
      deep: true
    }
  },
  created () {
    window.vue = this;
    if (sessionStorage.getItem(this.configSessionKey)) {
      this.searchConfig = JSON.parse(sessionStorage.getItem(this.configSessionKey));
    } else {
      this.searchConfig = this.config;
      sessionStorage.setItem(this.configSessionKey, JSON.stringify(this.searchConfig));
    }
  },
  methods: {
    search () {
      this.searchData = [];

      for (let i in this.data) {
        let dataItem = this.data[i];
        let isSearchItem = true;

        for (let j in this.searchConfig.items) {
          let searchItem = this.searchConfig.items[j];
          let searchMethod = searchItem.type + '-' + searchItem.method;
          let searchColData = dataItem[searchItem.key];

          if (searchMethod === 'input-range') {
            searchItem.value = [searchItem.min, searchItem.max];
          } else if (searchMethod.indexOf('date') > -1) {
            searchColData = searchColData == null ? null : new Date(searchColData + ' ');
          }

          let searchContent = searchItem.value;

          if (searchContent != null) {
            if (searchMethod.indexOf('equals') > -1) {
              isSearchItem = this.equals(searchColData, searchContent);
            } else if (searchMethod.indexOf('contains') > -1) {
              isSearchItem = this.contains(searchColData, searchContent);
            } else if (searchMethod.indexOf('range') > -1) {
              isSearchItem = this.range(searchColData, searchContent);
            } else {
              isSearchItem = this.equals(searchColData, searchContent);
            }
          }

          if (isSearchItem === false) {
            break;
          }
        }

        if (isSearchItem) {
          this.searchData.push(dataItem);
        }
      }
    },
    handleSearch () {
      this.search();
      this.$emit('searchResult', this.searchData);
    },
    equals (data, searchContent) {
      return searchContent === '' || searchContent == null || data + '' === searchContent + '';
    },
    contains (data, searchContent) {
      return searchContent === '' || searchContent == null || (data + '').indexOf(searchContent + '') > -1;
    },
    range (data, searchContent) {
      return searchContent == null ||
        (searchContent[0] === '' || searchContent[0] == null) ||
        (searchContent[1] === '' || searchContent[1] == null) ||
        (searchContent[0] <= data && data <= searchContent[1]);
    },
    handleAddSearchItemTypeChange(type) {
      if (type === 'input' || type === 'date') {
        this.addSearchItemMethod = '';
      } else if (type === 'select') {
        this.addSearchItemMethod = 'equals';
      }
    },
    confirmAddSearchItem() {
      let configItem = {
        key: this.addSearchItemKey,
        label: this.addSearchItemLabel,
        type: this.addSearchItemType,
        method: this.addSearchItemMethod
      };

      this.searchConfig.items.push(configItem);
      this.dialogVisible = false;
    },
    showDialog() {
      if (this.searchKeys == null || this.searchKeys.length == 0) {
        this.updateSearchKeys();
      }

      this.addSearchItemKey = null;
      this.addSearchItemLabel = null;
      this.addSearchItemType = null;
      this.addSearchItemMethod = null;
      this.dialogVisible = true;
    },
    updateSelectOptions() {
      // 将数据源中对应select的数据放入到select的option中
      this.selectLoading = true;

      for (let i in this.data) {
        let dataItem = this.data[i];

        for (let j in this.searchConfig.items) {
          if (this.searchConfig.items[j].type === 'select') {
            if (this.searchConfig.items[j].options == null) {
              this.$set(this.searchConfig.items[j], 'options', [])
              // this.config.items[j].options = [];
            }
            if(dataItem[this.searchConfig.items[j].key] !== '' && this.searchConfig.items[j].options.indexOf(dataItem[this.searchConfig.items[j].key]) == -1) {
              this.searchConfig.items[j].options.push(dataItem[this.searchConfig.items[j].key]);
            }
          }
        }
      }

      this.selectLoading = false;
    },
    updateSearchKeys() {
      if (this.data.length > 0) {
        for(let key in this.data[0]) {
          this.searchKeys.push(key);
        }
      }
    },
    loadSelectOptions() {
      if (this.selectOptionLoading) {
        this.updateSelectOptions();
        this.selectOptionLoading = false;
      }
    }
  }
}
</script>

<style>
.search-item {
  margin: 5px 0px;
  float: left;
  width: 90%;
}

.search-button {
  margin: 10px 0px;
  width: 100px;
}

.pull-left {
  float: left;
}

.range-label {
  width: auto;
  float: left;
  margin-top: 4px;
  margin-left: 5px;
  color: #909399;
}

.range-value {
  width: calc(50% - 25px);
}

.input-range {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background-color: #FFFFFF;
}

.input-range > div > .el-input > input {
  border: 0 !important;
  height: 26px !important;
  padding-left: 3px !important;
  padding-right: 3px !important;
}

.search-item-select {
  margin-top: 10px;
}
</style>
