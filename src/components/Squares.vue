<script setup>
import { computed } from 'vue'
import { state, setPage, toggleTheme, toggleLang } from '../store.js'

const emit = defineEmits(['navigate'])

/*
 * Grid areas are [column, row, columnSpan?, rowSpan?] (1-based).
 * desktop: 7 columns (half, 5 full, half) x 5 rows (half, 3 full, half)
 * mobile:  5 columns (half, 3 full, half) x 6 rows (half, 3 full, half, half)
 */
const GRID = {
    desktop: { cols: 7, rows: 5, prefix: 'd' },
    mobile: { cols: 5, rows: 6, prefix: 'm' },
}

// the logo overlays the desktop grid at its original position (see .logo) and only takes an area on mobile
const LOGO = { mobile: [2, 2, 3, 1] }
const CONTROLS = { desktop: [7, 1], mobile: [3, 1, 2, 1] }

const PROJECTS = [
    { href: 'https://www.dorfladen-online.at', lines: ['dorfladen-', 'online.at'], img: '/thumbs/small/dorfladen-online.png', desktop: [3, 3], mobile: [2, 3] },
    { href: 'https://www.foodcoopshop.com', lines: ['foodcoop', 'shop.com'], img: '/thumbs/small/foodcoopshop.png', desktop: [4, 3], mobile: [3, 3] },
    { href: 'https://www.hofladen-online.at', lines: ['hofladen-', 'online.at'], img: '/thumbs/small/hofladen-online.jpg', desktop: [5, 3], mobile: [4, 3] },
    { href: 'https://github.com/mrothauer', lines: ['open source', 'github'], img: '/thumbs/small/github.png', desktop: [4, 4], mobile: [3, 4] },
]

const PAGES = [
    { key: 'projects', de: 'projekte', en: 'projects', desktop: [2, 5], mobile: [2, 5] },
    { key: 'contact', de: 'kontakt', en: 'contact', desktop: [3, 5], mobile: [3, 5] },
    { key: 'about', de: 'über mich', en: 'about', desktop: [4, 5], mobile: [4, 5] },
    { key: 'imprint', de: 'impressum', en: 'imprint', desktop: [5, 5], mobile: [2, 6] },
    { key: 'privacy', de: 'datenschutz', en: 'privacy', desktop: [6, 5], mobile: [3, 6] },
]

const TEXT = {
    de: { nav: 'Hauptnavigation', lang: 'Switch to English', dark: 'Dunkles Design aktivieren', light: 'Helles Design aktivieren' },
    en: { nav: 'Main navigation', lang: 'Auf Deutsch umschalten', dark: 'Switch to dark mode', light: 'Switch to light mode' },
}

// CSS custom properties that place an element in both layouts (see .cell)
function area({ desktop, mobile }) {
    const style = {}
    for (const [layout, pos] of [['desktop', desktop], ['mobile', mobile]]) {
        if (!pos) continue
        const [c, r, cs = 1, rs = 1] = pos
        const p = GRID[layout].prefix
        Object.assign(style, { [`--${p}c`]: c, [`--${p}r`]: r, [`--${p}cs`]: cs, [`--${p}rs`]: rs })
    }
    return style
}

// every cell no tile covers becomes an empty square
function freeCells(layout) {
    const { cols, rows } = GRID[layout]
    const taken = new Set()
    for (const item of [LOGO, CONTROLS, ...PROJECTS, ...PAGES]) {
        const pos = item[layout]
        if (!pos) continue
        const [c, r, cs = 1, rs = 1] = pos
        for (let x = c; x < c + cs; x++) {
            for (let y = r; y < r + rs; y++) taken.add(`${x}/${y}`)
        }
    }
    const cells = []
    for (let y = 1; y <= rows; y++) {
        for (let x = 1; x <= cols; x++) {
            if (!taken.has(`${x}/${y}`)) cells.push([x, y])
        }
    }
    return cells
}

// one element serves a free cell in each layout, so the DOM holds max(desktop, mobile) empties
const desktopFree = freeCells('desktop')
const mobileFree = freeCells('mobile')
const empties = Array.from({ length: Math.max(desktopFree.length, mobileFree.length) }, (_, i) => {
    const desktop = desktopFree[i]
    const mobile = mobileFree[i]
    return {
        style: area({ desktop, mobile }),
        only: !mobile ? 'only-desktop' : !desktop ? 'only-mobile' : null,
    }
})

const logoStyle = area(LOGO)
const controlsStyle = area(CONTROLS)
const projects = PROJECTS.map(p => ({ ...p, style: area(p) }))
const pages = PAGES.map(p => ({ ...p, style: area(p) }))

const t = computed(() => TEXT[state.lang])
const isDark = computed(() => state.theme === 'dark')
const themeLabel = computed(() => isDark.value ? t.value.light : t.value.dark)

function navigate(page) {
    setPage(page)
    emit('navigate')
}
</script>

<template>
    <nav class="grid" :aria-label="t.nav">

        <div v-for="(cell, i) in empties" :key="i" :class="['cell', 'empty', cell.only]" :style="cell.style"
            aria-hidden="true"></div>

        <a href="#contact" class="logo" :style="logoStyle" @click.prevent="navigate('contact')">
            <img :src="isDark ? '/img/rothauer-it.com-dark.png' : '/img/rothauer-it.com.jpg'" width="273" height="81"
                alt="rothauer-it.com – Programmier-Dienstleistungen aus dem Almtal" />
        </a>

        <div class="cell controls" :style="controlsStyle">
            <button type="button" class="control" :aria-label="t.lang" @click="toggleLang">
                <span :class="{ active: state.lang === 'de' }">DE</span>
                <span class="sep">/</span>
                <span :class="{ active: state.lang === 'en' }">EN</span>
            </button>
            <button type="button" class="control" :aria-label="themeLabel" :title="themeLabel" @click="toggleTheme">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <template v-if="isDark">
                        <circle cx="12" cy="12" r="4.5" />
                        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
                    </template>
                    <path v-else d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
                </svg>
            </button>
        </div>

        <a v-for="p in projects" :key="p.href" :href="p.href" target="_blank" rel="noopener"
            class="cell tile has-image" :style="p.style">
            <span class="heading">{{ p.lines[0] }}<br>{{ p.lines[1] }}</span>
            <img :src="p.img" alt="" loading="lazy" />
        </a>

        <a v-for="p in pages" :key="p.key" :href="'#' + p.key"
            :class="['cell', 'tile', 'nav', { selected: state.page === p.key }]"
            :aria-current="state.page === p.key ? 'page' : null" :style="p.style"
            @click.prevent="navigate(p.key)">
            <span class="heading">{{ p[state.lang] }}</span>
        </a>

    </nav>
</template>

<style scoped>
.grid {
    /* u = size of one full square */
    --u: calc((100cqi - 6px) / 6);
    position: relative;
    display: grid;
    /* the last column takes the remaining width so no rounding gap is left at the right edge */
    grid-template-columns: calc(var(--u) / 2) repeat(5, var(--u)) minmax(0, 1fr);
    grid-template-rows: calc(var(--u) / 2) repeat(3, var(--u)) calc(var(--u) / 2);
    gap: 1px;
    /* the gaps show the line color; it stops 2px before the right edge so no outer line appears */
    background-image: linear-gradient(var(--line), var(--line));
    background-repeat: no-repeat;
    background-size: calc(100% - 2px) 100%;
}

.cell {
    grid-column: var(--dc) / span var(--dcs);
    grid-row: var(--dr) / span var(--drs);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    color: var(--text);
    text-decoration: none;
    overflow: hidden;
    transition: background-color .3s, color .3s;
}
.only-mobile { display: none; }
.cell:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; z-index: 2; }

/* empty squares light up when the pointer passes, then fade slowly */
@media (hover: hover) {
    .empty { transition: background-color 1.2s ease; }
    .empty:hover { background: var(--accent-soft); transition-duration: .1s; }
}

/*
 * logo: the original image, placed exactly as in the old layout
 * (787px wide grid: left 448px, top -16px, 273px wide), scaled with the grid
 */
.logo {
    position: absolute;
    left: calc(100cqi * 448 / 787);
    top: calc(100cqi * -16 / 787);
    width: calc(100cqi * 273 / 787);
    z-index: 3;
    line-height: 0;
}
.logo img { display: block; width: 100%; height: auto; }

/* language / theme controls */
.controls { flex-direction: column; align-items: stretch; }
.control {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    border: 0;
    margin: 0;
    padding: 0;
    background: transparent;
    font: inherit;
    font-size: 12px;
    letter-spacing: .04em;
    color: var(--muted);
    cursor: pointer;
    transition: background-color .2s, color .2s;
}
.control .active { color: var(--text); font-weight: 700; }
.control .sep { opacity: .4; }
.control:hover { color: var(--accent); background: var(--accent-soft); }
.control:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }

/* project and page tiles */
.tile { text-align: center; font-size: 15px; line-height: 1.3; }
.tile .heading { position: relative; z-index: 1; transition: opacity .3s; padding: 0 4px; }

.has-image img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.06);
    transition: opacity .5s ease, transform .6s ease;
}
.has-image:hover { background: var(--surface); }
.has-image:is(:hover, :focus-visible) img { opacity: 1; transform: none; }
.has-image:is(:hover, :focus-visible) .heading { opacity: 0; }

.nav:hover { background: var(--accent-soft); color: var(--text); }
.nav.selected { background: var(--accent); color: var(--accent-ink); font-weight: 700; }

@media (max-width: 719px) {
    .grid {
        --u: calc((100cqi - 4px) / 4);
        grid-template-columns: calc(var(--u) / 2) repeat(3, var(--u)) minmax(0, 1fr);
        grid-template-rows: calc(var(--u) / 2) repeat(3, var(--u)) repeat(2, calc(var(--u) / 2));
    }
    .cell,
    .logo {
        grid-column: var(--mc) / span var(--mcs);
        grid-row: var(--mr) / span var(--mrs);
    }
    .only-desktop { display: none; }
    .only-mobile { display: flex; }
    .logo {
        position: static;
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg);
    }
    .controls { flex-direction: row; }
    .controls .control + .control { border-left: 1px solid var(--line); }
    .control { font-size: 13px; }
    /* scale with the square so labels like "open source" stay on one line */
    .tile { font-size: clamp(10px, calc(var(--u) * .145), 13px); letter-spacing: -.01em; }
    .tile .heading { padding: 0 2px; }
}
</style>
