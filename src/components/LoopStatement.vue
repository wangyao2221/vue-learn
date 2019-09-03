<template>
  <div>
    <h1>条件与循环</h1>
    <hr>
    <h2>循环语句</h2>
    <ol>
      <li v-for="site in sites" :key="site">
        {{ site.name}}
      </li>
    </ol>

    <ul>
      <template v-for="site in sites">
        <li :key="site">{{ site.name }}</li>
        <li :key="site">--------------</li>
      </template>
    </ul>

    <ul>
      <li v-for="(value,key, index) in object" :key="value">
        {{ index }}. {{ key }} : {{ value }}
      </li>
    </ul>

    <ul>
      <li v-for="n in 10" :key="n">
        {{ n }}
      </li>
    </ul>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'LoopStatement',
  data () {
    return {
      sites: [
        {name: 'Runboob'},
        {name: 'Google'},
        {name: 'Taobao'}
      ],
      object: {
        name: '菜鸟教程',
        url: 'http://www.runoob.com',
        slogan: '学的不仅是技术，更是梦想！'
      }
    }
  }
}
</script>

<style>
</style>
