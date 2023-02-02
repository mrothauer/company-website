import './assets/css/fonts.css'
import './assets/css/style.css'

import $ from 'jquery';
window.$ = $;

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
