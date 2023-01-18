<script lang="ts">
  export default {
    methods: {
      toggle(event) {
        let currentLang = event.target.parentElement.className.replace(/button-/, '')
        document.querySelectorAll('#app .lang').forEach(e => e.style.display = 'none');
        document.querySelectorAll('#app .lang.' + currentLang).forEach(e => e.style.display = 'block');
      },
    }
  }
</script>

<template>
  <div id="lang-box">
    <a @click="toggle" data-lang="de" class="button-de" title="Deutsch" href="javascript:void(0);"><img src="/img/flag-de.gif" width="16" height="11" /></a>
    <a @click="toggle" data-lang="en" class="button-en" title="English" href="javascript:void(0);"><img src="/img/flag-en.gif" width="16" height="11" /></a>
  </div>
</template>

<style>
  #lang-box {
      position: absolute;
      top: 38px;
      right: 14px;
      z-index: 100;
  }
  #lang-box a {
      float: left;
      margin-left: 5px;
  }
</style>