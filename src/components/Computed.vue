<template>
  <div>
    <h1>计算属性</h1>
    <hr>
<!--    {{ message.split('').reverse().join('') }}-->
    {{ message}}
    <br>
    {{name}}
    <br>
    {{url}}
    <br>
    <button @click="changeName">set</button>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'Computed',
  data () {
    return {
      message: 'Runoob!',
      name: 'Google',
      url: 'http://www.google.com'
    }
  },
  computed: {
    reverseMessage: function () {
      return this.message.split('').reverse().join('')
    },
    site: {
      get: function () {
        return this.name + ' ' + this.url
      },
      set: function (newValue) {
        var names = newValue.split(' ')
        this.name = names[0]
        this.url = names[names.length - 1]
      }
    }
  },
  methods: {
    changeName: function () {
      this.name = '菜鸟教程 http://www.runoob.com'
    }
  }
}
</script>

<style>
</style>
