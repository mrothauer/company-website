import { reactive, watch } from 'vue'

export const PAGES = ['projects', 'contact', 'about', 'imprint', 'privacy']

function read(key) {
    try { return localStorage.getItem(key) } catch { return null }
}

function write(key, value) {
    try { localStorage.setItem(key, value) } catch { /* storage unavailable */ }
}

function pageFromHash() {
    const hash = window.location.hash.slice(1)
    return PAGES.includes(hash) ? hash : 'about'
}

const systemDark = window.matchMedia('(prefers-color-scheme: dark)')

export const state = reactive({
    lang: read('lang') === 'en' ? 'en' : 'de',
    page: pageFromHash(),
    theme: document.documentElement.dataset.theme || (systemDark.matches ? 'dark' : 'light'),
})

watch(() => state.lang, lang => {
    document.documentElement.lang = lang
    write('lang', lang)
}, { immediate: true })

watch(() => state.theme, theme => {
    document.documentElement.dataset.theme = theme
}, { immediate: true })

// follow the OS setting as long as the visitor has not picked a theme
systemDark.addEventListener('change', e => {
    if (!read('theme')) {
        state.theme = e.matches ? 'dark' : 'light'
    }
})

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1)
    if (PAGES.includes(hash)) {
        state.page = hash
    }
})

export function setPage(page) {
    state.page = page
    history.replaceState(null, '', '#' + page)
}

export function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark'
    write('theme', state.theme)
}

export function toggleLang() {
    state.lang = state.lang === 'de' ? 'en' : 'de'
}
