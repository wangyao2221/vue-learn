<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    <h1>模板语法</h1>
    <hr>
    <h2>插值</h2>
    <div v-html="message"></div>
    <label for="r1">checkbox:</label><input type="checkbox" v-model="use" id="r1">
    <br><br>
    <div v-bind:class="{'class1': use}"></div>

    <h2>表达式</h2>
    5 + 5 ：{{5 + 5}} <br>
    {{ok ? 'YES' : 'NO'}} <br>
    {{message1.split('').reverse().join('')}}
    <div v-bind:id="'list-' + id">菜鸟教程</div>

    <h2>指令</h2>
    <p v-if="seen">现在你看到我了</p>

    <h2>参数</h2>
    <pre><a v-bind:href="url">菜鸟教程</a></pre>

    <h2>用户输入</h2>
    <p>{{message2}}</p>
    <input v-model="message2">
    <button v-on:click="reverseMessgae">反转字符串</button>

    <h2>过滤器</h2>
    {{message3 | capitalize}}
<!--    <div v-bind:id="message3 | capitalize"></div>-->

    <h2>缩写</h2>
    <a v-bind:href="url"></a>
    <a :href="url"></a>

    <a v-on:click="doSomething"></a>
    <a @click="doSomething"></a>
    <hr>
  </div>
</template>

<script>

export default {
  name: 'TemplateSyntax',
  data () {
    return {
      message: '<h1>欢迎来到爱奇艺！</h1>',
      use: true,
      ok: true,
      message1: 'RUNOOB',
      id: 1,
      seen: true,
      url: 'http://www.runoob.com',
      message2: 'Runoob!',
      message3: 'runoob'
    }
  },
  methods: {
    reverseMessgae: function () {
      this.message2 = this.message2.split('').reverse().join('')
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style>

</style>
