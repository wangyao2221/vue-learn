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
  <hr>
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
      ]
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
    }
  }
}
</script>

<style>

</style>
