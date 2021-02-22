import Vue from 'vue/dist/vue.esm.js'
import App from "./card.vue"
import VueRouter from 'vue-router';

Vue.use(VueRouter)
Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
	el: "#app",
	template: "<App/>",
	components: { App }
});
// globalThis.vv1 = vm;