<script setup lang="ts">

  import { onMounted } from 'vue'
  import projects from './js/projects.js'
  import render from './js/helper.js'
  import LanguageToggle from './components/LanguageToggle.vue'
  import Squares from './components/Squares.vue'
  
  import FoodCoopShop from './components/projects/FoodCoopShop.vue'
  import DorfladenOnline from './components/projects/DorfladenOnline.vue'
  import HofladenOnline from './components/projects/HofladenOnline.vue'
  import ReparaturInitiativen from './components/projects/ReparaturInitiativen.vue'
  import Wildniscamps from './components/projects/Wildniscamps.vue'
  import Fairteiler from './components/projects/Fairteiler.vue'
  import OffeneWerkstaetten from './components/projects/OffeneWerkstaetten.vue'
  import Motorsagla from './components/projects/Motorsagla.vue'

  import About from './components/pages/About.vue'
  import Contact from './components/pages/Contact.vue'
  import Privacy from './components/pages/Privacy.vue'
  import Imprint from './components/pages/Imprint.vue'

  onMounted(() => {
    render(projects)
  })

</script>

<template>

  <a id="head" href="javascript:void(0);"></a>
  
  <LanguageToggle />

  <div class="squares">

    <Squares />

    <div id="desc" class="description square">
      
      <div class="desc" id="projects"></div>
      
      <FoodCoopShop />
      <DorfladenOnline />
      <HofladenOnline />
      <ReparaturInitiativen />
      <Wildniscamps />
      <Fairteiler />
      <OffeneWerkstaetten />
      <Motorsagla />

      <About />
      <Contact />
      <Privacy />
      <Imprint />
    
    </div>

  </div>

</template>