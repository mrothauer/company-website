import './css/fonts.css'
import './css/style.css'

import $ from 'jquery';
window.$ = $;

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
