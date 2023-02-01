import './css/fonts.css'
import './css/style.css'
import './css/mobile.css'

import $ from 'jquery';
window.$ = $;

import { createApp } from 'vue'
import App from './App.vue'
import LanguageToggle from './components/LanguageToggle.vue'

const app = createApp(App)
app.component('LanguageToggle', LanguageToggle)
app.mount('#app')

import Helper from './js/helper.js'
import projects from './js/projects.js'
Helper.render(projects)
