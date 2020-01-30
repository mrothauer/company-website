<template>
  <div id="app">
    <Content/>
  </div>
</template>

<script>
import Content from './components/Content.vue'

export default {
  name: 'app',
  components: {
    Content
  }
}
</script>

<style>
  @import './assets/css/fonts.css';
  @import './assets/css/mobile.css';
  @import './assets/css/style.css';
</style>
