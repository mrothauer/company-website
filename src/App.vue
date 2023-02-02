<script setup lang="ts">

  import { onMounted } from 'vue'
  import init from './assets/js/helper.js'
  import LanguageToggle from './components/LanguageToggle.vue'
  import Squares from './components/Squares.vue'
  
  import Projects from './components/pages/Projects.vue'
  import About from './components/pages/About.vue'
  import Contact from './components/pages/Contact.vue'
  import Privacy from './components/pages/Privacy.vue'
  import Imprint from './components/pages/Imprint.vue'

  onMounted(() => {
    init()
  })

</script>

<template>

  <a id="head" href="javascript:void(0);"></a>
  
  <LanguageToggle />

  <div class="squares">

    <Squares />

    <div id="desc" class="description square">
      
      <Projects />
      <About />
      <Contact />
      <Privacy />
      <Imprint />
    
    </div>

  </div>

</template>