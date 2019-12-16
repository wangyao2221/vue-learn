<template>
  <div>
  <h1>组件</h1>
  <hr>
  <runoob></runoob>

  <child message="hello!"></child>
  <br>

  <input v-model="parentMsg">
  <br>
  <child v-bind:message="parentMsg"></child>

  <ol>
    <todo-item v-for="item in sites" :key="item" v-bind:todo="item"></todo-item>
  </ol>

  <my-component propA="abc" propF="aa"></my-component>

  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>

  <button-counter2></button-counter2>
  <button-counter2></button-counter2>
  <button-counter2></button-counter2>
  <hr>
    <el-table :data="sites">
      <el-table-column prop="text" label="text"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'VComponennt',
  data () {
    return {
      parentMsg: '父组件内容',
      sites: [
        {text: 'Runoob'},
        {text: 'Google'},
        {text: 'Taobao'}
      ],
      total: 0
    }
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  },
  components: {
    'runoob': {
      template: '<h3>自定义组件!</h3>'
    },
    'child': {
      props: ['message'],
      template: '<span>{{ message }}</span>'
    },
    'todo-item': {
      props: ['todo'],
      template: '<li>{{ todo.text }}</li>'
    },
    'my-component': {
      template: '<p>{{ propA }} {{ propD }} {{ propF }}</p>',
      props: {
        propA: Number,
        propB: [String, Number],
        propC: {
          type: String,
          required: true
        },
        propD: {
          type: Number,
          default: 100
        },
        propE: {
          type: Object,
          default: function () {
            return { message: 'hello' }
          }
        },
        propF: {
          validator: function (value) {
            return ['success', 'warning', 'danger'].indexOf(value) !== -1
          }
        }
      }
    },
    'button-counter': {
      template: '<button v-on:click="incrementHandler">{{ counter }}</button>',
      data () {
        return {
          counter: 0
        }
      },
      methods: {
        incrementHandler: function () {
          this.counter += 1
          this.$emit('increment')
        }
      }
    },
    'button-counter2': {
      data: function () {
        // data 选项是一个函数，组件不相互影响
        return {
          count: 0
        }
      },
      // data: function () {
      //   // data 选项是一个对象，会影响到其他实例
      //   return buttonCounter2Data
      // },
      template: '<button v-on:click="count++">点击了 {{ count }} 次。</button>'
    }
  }
}
</script>

<style>

</style>
