<script setup>
import { computed } from 'vue'
import { state, setPage, toggleTheme, toggleLang } from '../store.js'

const emit = defineEmits(['navigate'])

/*
 * Grid positions: [column, row, columnSpan, rowSpan] (1-based).
 * desktop: 7 columns (half, 5 full, half) x 5 rows (half, 3 full, half)
 * mobile:  5 columns (half, 3 full, half) x 6 rows (half, 3 full, half, half)
 */
const GRID = {
    desktop: { cols: 7, rows: 5 },
    mobile: { cols: 5, rows: 6 },
}

const tiles = [
    // desktop: the logo overlays the grid at its original position (see .logo), mobile: grid area
    { key: 'logo', type: 'logo', mobile: [2, 2, 3, 1] },
    { key: 'controls', type: 'controls', desktop: [7, 1], mobile: [3, 1, 2, 1] },

    { key: 'dorfladen', type: 'link', href: 'https://www.dorfladen-online.at', lines: ['dorfladen-', 'online.at'], img: '/thumbs/small/dorfladen-online.png', desktop: [3, 3], mobile: [2, 3] },
    { key: 'foodcoopshop', type: 'link', href: 'https://www.foodcoopshop.com', lines: ['foodcoop', 'shop.com'], img: '/thumbs/small/foodcoopshop.png', desktop: [4, 3], mobile: [3, 3] },
    { key: 'hofladen', type: 'link', href: 'https://www.hofladen-online.at', lines: ['hofladen-', 'online.at'], img: '/thumbs/small/hofladen-online.jpg', desktop: [5, 3], mobile: [4, 3] },
    { key: 'github', type: 'link', href: 'https://github.com/mrothauer', lines: ['open source', 'github'], img: '/thumbs/small/github.png', desktop: [4, 4], mobile: [3, 4] },

    { key: 'projects', type: 'nav', de: 'projekte', en: 'projects', desktop: [2, 5], mobile: [2, 5] },
    { key: 'contact', type: 'nav', de: 'kontakt', en: 'contact', desktop: [3, 5], mobile: [3, 5] },
    { key: 'about', type: 'nav', de: 'über mich', en: 'about', desktop: [4, 5], mobile: [4, 5] },
    { key: 'imprint', type: 'nav', de: 'impressum', en: 'imprint', desktop: [5, 5], mobile: [2, 6] },
    { key: 'privacy', type: 'nav', de: 'datenschutz', en: 'privacy', desktop: [6, 5], mobile: [3, 6] },
]

function placement(desktop, mobile) {
    const style = {}
    if (desktop) {
        const [c, r, cs = 1, rs = 1] = desktop
        Object.assign(style, { '--dc': c, '--dr': r, '--dcs': cs, '--drs': rs })
    }
    if (mobile) {
        const [c, r, cs = 1, rs = 1] = mobile
        Object.assign(style, { '--mc': c, '--mr': r, '--mcs': cs, '--mrs': rs })
    }
    return style
}

// every grid cell that is not covered by a tile becomes an empty square
function emptyCells(layout) {
    const { cols, rows } = GRID[layout]
    const taken = new Set()
    tiles.forEach(tile => {
        if (!tile[layout]) return
        const [c, r, cs = 1, rs = 1] = tile[layout]
        for (let x = c; x < c + cs; x++) {
            for (let y = r; y < r + rs; y++) taken.add(`${x}/${y}`)
        }
    })
    const cells = []
    for (let y = 1; y <= rows; y++) {
        for (let x = 1; x <= cols; x++) {
            if (!taken.has(`${x}/${y}`)) cells.push({ key: `${layout}-${x}-${y}`, layout, pos: [x, y] })
        }
    }
    return cells
}

const empties = [...emptyCells('desktop'), ...emptyCells('mobile')]

const themeLabel = computed(() => {
    const toDark = state.theme !== 'dark'
    return state.lang === 'de'
        ? (toDark ? 'Dunkles Design aktivieren' : 'Helles Design aktivieren')
        : (toDark ? 'Switch to dark mode' : 'Switch to light mode')
})

function navigate(page) {
    setPage(page)
    emit('navigate')
}
</script>

<template>
    <nav class="grid" :aria-label="state.lang === 'de' ? 'Hauptnavigation' : 'Main navigation'">

        <div v-for="cell in empties" :key="cell.key"
            :class="['cell', 'empty', 'only-' + cell.layout]"
            :style="cell.layout === 'desktop' ? placement(cell.pos, null) : placement(null, cell.pos)"
            aria-hidden="true"></div>

        <template v-for="tile in tiles" :key="tile.key">

            <a v-if="tile.type === 'logo'" href="#contact" class="logo"
                :style="placement(null, tile.mobile)"
                @click.prevent="navigate('contact')">
                <img :src="state.theme === 'dark' ? '/img/rothauer-it.com-dark.png' : '/img/rothauer-it.com.jpg'" width="273" height="81"
                    alt="rothauer-it.com – Programmier-Dienstleistungen aus dem Almtal" />
            </a>

            <div v-else-if="tile.type === 'controls'" class="cell controls"
                :style="placement(tile.desktop, tile.mobile)">
                <button type="button" class="control"
                    :aria-label="state.lang === 'de' ? 'Switch to English' : 'Auf Deutsch umschalten'"
                    @click="toggleLang">
                    <span :class="{ active: state.lang === 'de' }">DE</span>
                    <span class="sep">/</span>
                    <span :class="{ active: state.lang === 'en' }">EN</span>
                </button>
                <button type="button" class="control"
                    :aria-label="themeLabel" :title="themeLabel"
                    @click="toggleTheme">
                    <svg v-if="state.theme === 'dark'" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                        <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.8" />
                        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"
                            stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                    </svg>
                    <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor"
                            stroke-width="1.8" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <a v-else-if="tile.type === 'link'" :href="tile.href" target="_blank" rel="noopener"
                class="cell tile has-image" :style="placement(tile.desktop, tile.mobile)">
                <span class="heading">{{ tile.lines[0] }}<br>{{ tile.lines[1] }}</span>
                <img :src="tile.img" alt="" loading="lazy" />
            </a>

            <a v-else-if="tile.type === 'nav'" :href="'#' + tile.key"
                :class="['cell', 'tile', 'nav', { selected: state.page === tile.key }]"
                :aria-current="state.page === tile.key ? 'page' : null"
                :style="placement(tile.desktop, tile.mobile)"
                @click.prevent="navigate(tile.key)">
                <span class="heading">{{ tile[state.lang] }}</span>
            </a>

        </template>
    </nav>
</template>

<style scoped>
.grid {
    /* u = size of one full square */
    --u: calc((100cqi - 6px) / 6);
    display: grid;
    /* the last column takes the remaining width so no rounding gap shows the line color at the right edge */
    grid-template-columns: calc(var(--u) / 2) repeat(5, var(--u)) minmax(0, 1fr);
    grid-template-rows: calc(var(--u) / 2) repeat(3, var(--u)) calc(var(--u) / 2);
    gap: 1px;
    /* line color everywhere except the outermost pixel on the right */
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

/* empty squares light up when the pointer passes, then fade slowly */
@media (hover: hover) {
    .empty { transition: background-color 1.2s ease; }
    .empty:hover { background: var(--accent-soft); transition-duration: .1s; }
}

/*
 * logo: the original image, placed exactly as in the old layout
 * (787px wide grid: left 448px, top -16px, 273px wide), scaled with the grid
 */
.grid { position: relative; }
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

/* content tiles */
.tile { text-align: center; font-size: 15px; line-height: 1.3; }
.tile .heading { position: relative; z-index: 1; transition: opacity .3s; padding: 0 4px; }

.tile.has-image img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.06);
    transition: opacity .5s ease, transform .6s ease;
}
.tile.has-image:hover img,
.tile.has-image:focus-visible img { opacity: 1; transform: none; }
.tile.has-image:hover .heading,
.tile.has-image:focus-visible .heading { opacity: 0; }
.tile.has-image:hover { background: var(--surface); }

.tile.nav:hover { background: var(--accent-soft); color: var(--text); }
.tile.nav.selected { background: var(--accent); color: var(--accent-ink); font-weight: 700; }

.cell:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; z-index: 2; }

@media (max-width: 719px) {
    .grid {
        --u: calc((100cqi - 4px) / 4);
        grid-template-columns: calc(var(--u) / 2) repeat(3, var(--u)) minmax(0, 1fr);
        grid-template-rows: calc(var(--u) / 2) repeat(3, var(--u)) repeat(2, calc(var(--u) / 2));
    }
    .cell {
        grid-column: var(--mc) / span var(--mcs);
        grid-row: var(--mr) / span var(--mrs);
    }
    .only-desktop { display: none; }
    .only-mobile { display: flex; }
    .logo {
        position: static;
        width: auto;
        grid-column: var(--mc) / span var(--mcs);
        grid-row: var(--mr) / span var(--mrs);
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg);
    }
    .controls { flex-direction: row; }
    .controls .control + .control { border-left: 1px solid var(--line); }
    .control { font-size: 13px; }
    .tile { font-size: 13px; }
}

@media (max-width: 359px) {
    .tile { font-size: 12px; }
}
</style>
