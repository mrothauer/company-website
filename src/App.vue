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

function showContact() {
  let projectId = 'contact'
  const descriptions = document.querySelectorAll('.desc');
  descriptions.forEach(element => { element.style.display = 'none' });
  const squares = document.querySelectorAll('.square');
  squares.forEach(element => { element.classList.remove('selected') });
  const divider = document.getElementById('desc')
  const currentPage = document.getElementById(projectId)
  currentPage.style.display = 'block';
  const contactButton = document.getElementById('square-30')
  contactButton.classList.add('selected')
  divider.style.display = 'block';
}

</script>

<template>

  <a id="head" href="javascript:void(0);" @click="showContact()"></a>
  
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