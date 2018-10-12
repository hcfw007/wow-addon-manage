import Vue from 'vue'
import App from './App.vue'
import ToastPlugin from 'nw-vue-toast'

Vue.use(ToastPlugin)

new Vue({
    render(h) {
        return h('App')
    },
    components: {
        App,
    },
    el: '#app',
})