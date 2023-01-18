import './css/fonts.css'
import './css/style.css'
import './css/mobile.css'

import $ from 'jquery';
window.$ = $;

import Helper from './js/helper.js'
import Projects from './js/projects.js'

let projects = Projects.getAll()
Helper.render(projects)