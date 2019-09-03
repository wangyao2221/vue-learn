<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <h1>样式绑定</h1>
    <hr>
    <div class="static" v-bind:class="{active : isActive, 'text-danger': hasError}"></div>
    <br>
    <div v-bind:class="classObject1"></div>
    <br>
    <div v-bind:class="classObject2"></div>
    <br>
    <div v-bind:class="[activeClass, errorClass]"></div>
    <br>
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">菜鸟教程</div>
    <br>
    <div v-bind:style="styleObject">菜鸟教程</div>
    <br>
    <div v-bind:style="[baseStyles, overridingStyles]">菜鸟教程</div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'Watch',
  data () {
    return {
      isActive: true,
      hasError: true,
      classObject1: {
        active: true,
        'text-danger': false
      },
      error: {
        value: true,
        type: 'fatal'
      },
      activeClass: 'active',
      errorClass: 'text-danger',
      activeColor: 'green',
      fontSize: 30,
      styleObject: {
        color: 'green',
        fontSize: '30px'
      },
      baseStyles: {
        color: 'green',
        fontSize: '30px'
      },
      overridingStyles: {
        'font-weight': 'bold'
      }
    }
  },
  computed: {
    classObject2: function () {
      return {
        base: true,
        active: this.isActive && !this.error.value,
        'text-danger': this.error.value && this.error.type === 'fatal'
      }
    }
  }
}
</script>

<style>
.base {
  width: 100px;
  height: 100px;
}

.active {
  width: 100px;
  height: 100px;
  background: green;
}

.text-danger {
  background: red;
}
</style>
