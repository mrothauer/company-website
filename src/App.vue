<script setup>
import { nextTick, ref } from 'vue'
import { state } from './store.js'
import Squares from './components/Squares.vue'

import Projects from './components/pages/Projects.vue'
import About from './components/pages/About.vue'
import Contact from './components/pages/Contact.vue'
import Privacy from './components/pages/Privacy.vue'
import Imprint from './components/pages/Imprint.vue'

const content = ref(null)

async function scrollToContent() {
  await nextTick()
  content.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div :class="['site', 'lang-' + state.lang]">

    <div class="grid-wrap">
      <Squares @navigate="scrollToContent" />
    </div>

    <main id="desc" ref="content" class="content">
      <Projects v-if="state.page === 'projects'" />
      <About v-else-if="state.page === 'about'" />
      <Contact v-else-if="state.page === 'contact'" />
      <Privacy v-else-if="state.page === 'privacy'" />
      <Imprint v-else-if="state.page === 'imprint'" />
    </main>

    <footer class="site-footer">
      © 2009–{{ new Date().getFullYear() }} Mag. (FH) Mario Rothauer ·
      <span class="lang de">Programmier-Dienstleistungen aus dem Almtal</span>
      <span class="lang en">Programming services from the Almtal valley</span>
    </footer>

  </div>
</template>

<style>
.grid-wrap { container-type: inline-size; }
</style>
