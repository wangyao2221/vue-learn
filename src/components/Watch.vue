<template>
  <div>
    <h1>监听属性</h1>
    <hr>
    <p style = "font-size:25px;">计数器: {{ counter }}</p>
    <button @click = "counter++" style = "font-size:25px;">点我</button>

    千米 : <input type = "text" v-model = "kilometers">
    米 : <input type = "text" v-model = "meters">
    <hr>
  </div>
</template>

<script>
export default {
  name: 'Watch',
  data () {
    return {
      counter: 1,
      kilometers: 0,
      meters: 0
    }
  },
  watch: {
    counter: function (nval, oval) {
      alert('计数器值的变化 :' + oval + ' 变为 ' + nval + '!')
    },
    kilometers: function (val) {
      this.kilometers = val
      this.meters = this.kilometers * 1000
    },
    meters: function (val) {
      this.kilometers = val / 1000
      this.meters = val
    }
  }
}
</script>

<style>
</style>
