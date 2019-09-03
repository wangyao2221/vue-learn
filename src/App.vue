<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
<!--    <helloWorld></helloWorld>-->
    <templateSyntax></templateSyntax>
    <ifAndLoop></ifAndLoop>
    <loopStatement></loopStatement>
    <computed></computed>
    <watch></watch>
    <styleBind></styleBind>
    <eventHandler></eventHandler>
    <formComponent></formComponent>
    <vComponent></vComponent>
  </div>
</template>

<script>

import TemplateSyntax from './components/TemplateSyntax'
import HelloWorld from './components/HelloWorld'
import IfAndLoop from './components/IfAndLoop'
import LoopStatement from './components/LoopStatement'
import Computed from './components/Computed'
import Watch from './components/Watch'
import StyleBind from './components/StyleBind'
import EventHandler from './components/EventHandler'
import FormComponent from './components/FormComponent'
import VComponent from './components/VComponent'

export default {
  name: 'App',
  components: {
    TemplateSyntax,
    HelloWorld,
    IfAndLoop,
    LoopStatement,
    Computed,
    Watch,
    StyleBind,
    EventHandler,
    FormComponent,
    VComponent
  }
}
</script>

<style>
  /*#app {*/
  /*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*  -webkit-font-smoothing: antialiased;*/
  /*  -moz-osx-font-smoothing: grayscale;*/
  /*  text-align: center;*/
  /*  color: #2c3e50;*/
  /*  margin-top: 60px;*/
  /*}*/
</style>
