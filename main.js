import './css/fonts.css'
import './css/style.css'
import './css/mobile.css'

import { createApp } from 'vue'
import App from './App.vue'
import LanguageToggle from './components/LanguageToggle.vue'

const app = createApp(App)
app.component('LanguageToggle', LanguageToggle)
app.mount('#app')
