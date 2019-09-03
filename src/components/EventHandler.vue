<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    <h1>事件处理器</h1>
    <hr>
    <button v-on:click="counter += 1">增加1</button>
    <p>这个按钮被点击了{{ counter }} 次</p>

    <button v-on:click="greet">Greet</button>

    <button v-on:click="say('hi')">Say hi</button>
    <button v-on:click="say('what')">Say what</button>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'EventHandler',
  data () {
    return {
      counter: 0,
      name: 'Vue.js'
    }
  },
  methods: {
    greet: function (event) {
      alert('Hello ' + this.name + '!')
      if (event) {
        alert(event.target.tagName)
      }
    },
    say: function (message) {
      alert(message)
    }
  }
}
</script>

<style>

</style>
