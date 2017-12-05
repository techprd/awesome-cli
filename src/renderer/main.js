import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import 'jquery/dist/jquery.min'
import 'xterm/dist/xterm.js'
import 'xterm/dist/xterm.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    store,
    template: '<App/>'
}).$mount('#app')
