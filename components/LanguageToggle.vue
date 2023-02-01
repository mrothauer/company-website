<script setup lang="ts">

  function toggle(event: any) {
      let currentLang = event.target.parentElement.className.replace(/button-/, '')
      // @ts-ignore
      document.querySelectorAll('#app .lang').forEach(e => e.style.display = 'none');
      // @ts-ignore
      document.querySelectorAll('#app .lang.' + currentLang).forEach(e => e.style.display = 'block');
      // @ts-ignore
      document.querySelectorAll('#app span.lang.' + currentLang).forEach(e => e.style.display = 'inline');
  }

  const locales = [
    {key: 'en', label: 'English'},
    {key: 'de', label: 'Deutsch'}
  ]

</script>

<template>
  <div id="lang-box">
      <a v-for="locale in locales"
        @click="toggle"
        :class="'button-' + locale.key"
        :data-lang="locale.key"
        :title="locale.label"
        href="javascript:void(0);">
        <img :src="'/img/flag-' + locale.key + '.gif'" width="16" height="11" />
      </a>
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