<template>
  <div>
    <h1>条件与循环</h1>
    <hr>
    <h2>条件判断</h2>
    <p v-if="seen">现在你看到我了</p>
    <template v-if="ok">
      <h3>菜鸟教程</h3>
      <p>学的不仅是技术，更是梦想！</p>
    </template>
<!--    <div v-html="ifstatement"></div>-->

    <div v-if="Math.random() > 0.5">
      Sorry
    </div>
    <div v-else>
      Not sorry
    </div>

    <div id="app">
      <div v-if="type === 'A'">
        A
      </div>
      <div v-else-if="type === 'B'">
        B
      </div>
      <div v-else-if="type === 'C'">
        C
      </div>
      <div v-else>
        Not A/B/C
      </div>
    </div>

    <h3 v-show="ok">Hello!</h3>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'IfAndLoop',
  data () {
    return {
      seen: true,
      ok: true,
      type: 'C'
      // ifstatement: "{{#if ok}}\n" +
      //   "  <h1>Yes</h1>\n" +
      //   "{{/if}}"
    }
  }
}
</script>

<style>
</style>
