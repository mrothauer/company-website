<template>
    <p>Mag. (FH) Mario Rothauer<br />
        Am Birkenweg 3<br />
        A-4644 Scharnstein / <span class="lang en">Austria</span><span class="lang de">Österreich</span>
    </p>
    <p>
        <b>Büro-Adresse:</b><br />
        Grubbachstraße 71<br />
        A-4644 Grünau im Almtal
    </p>
    <p>+43 680 217 89 39<br />
        <a :href="mailHref" @click="revealMail" @mouseover="revealMail" @focus="revealMail">
            <span v-html="mailText"></span>
        </a><br />
        UID-Nr. ATU71726279<br />
    </p>
</template>

<script setup>
import { ref } from 'vue'

const user = 'office'
const domain = 'rothauer-it.com'
const obfuscated = `${user}&#64;${domain.replace('.', '&#46;')}`
const mailText = ref(obfuscated)
const mailHref = ref('#')

function revealMail() {
    mailHref.value = `mailto:${user}@${domain}`
    mailText.value = `${user}@${domain}`
}
</script>