<template>
<!--  <div v-html="template">-->
<!--  </div>-->
  <div>
    <child v-bind:test="test"></child>
  </div>
</template>

<script>

export default {
  name: 'SearchComponent',
  components: {
    'child': {
      props: ['test'],
      template: '<span>{{ test }}</span>',
      render (h) {
        return h('el-select')
      }
    }
  },
  data () {
    return {
      data: [],
      template: '',
      test: '<el-select></el-select>',
      config: [
        {
          key: 'id',
          label: '标识符',
          type: 'string',
          method: 'equal',
          selector: true
        },
        {
          key: 'disk',
          label: '磁盘',
          type: 'number',
          method: 'range'
        },
        {
          key: 'date',
          label: '时间',
          type: 'date',
          method: 'range'
        }
      ]
    }
  },
  methods: {
    render () {
      for (let i in this.config) {
        let conf = this.config[i]
        if (conf.type === 'string') {
          this.renderStringSearch(conf)
        } else if (conf.type === 'number') {
          this.renderNumberSearch(conf)
        } else if (conf.type === 'date') {
          this.renderDateSearch(conf)
        }
      }
      // let vm = new Vue({
      //   render (h) {
      //     return h('div',this)
      //   }
      // })
      // let compileTemplate = Vue.compile(this.template)
      // console.log(compileTemplate)
    },
    renderStringSearch (conf) {
      if (conf.method === 'contain') {
        let template = '<el-input placeholder="请输入模糊关键字"></el-input>\n'
        this.template += template
      } else if (conf.method === 'equal' && conf.selector === true) {
        let template = '<el-select placeholder="请选择关键字"></el-select>\n'
        this.template += template
      } else if (conf.method === 'equal' && conf.selector === false) {
        let template = '<el-input placeholder="请输入精确关键字"></el-input>\n'
        this.template += template
      }
    },
    renderNumberSearch (conf) {
      if (conf.method === 'range') {
        let template =
          '<div class="el-input el-input--mini pull-right input-range"  style="width: 145px">\n' +
          '<div class="range-label">磁盘:</div>\n' +
          '<div style="width: 50px;" class="pull-right"><el-input v-model="listSelect.diskSize.fieldValue" placeholder="min"></el-input></div>\n' +
          '<div style="width: 50px" class="pull-right"><el-input v-model="listSelect.diskSize.endValue" placeholder="max"></el-input></div>\n' +
          '</div>'
        this.template += template
      } else if (conf.method === 'equal') {
        let template =
          '<div class="el-input el-input--mini pull-right input-range"  style="width: 145px">\n' +
          '<div class="range-label">磁盘:</div>\n' +
          '<div style="width: 50px;" class="pull-right"><el-input v-model="listSelect.diskSize.fieldValue" placeholder="min"></el-input></div>\n' +
          '</div>\n'
        this.template += template
      }
    },
    renderDateSearch (conf) {

    }
  },
  created () {
    this.render()
  }
}
</script>

<style>

</style>
