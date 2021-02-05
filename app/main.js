// import Vue from "vue"
import Vue from 'vue/dist/vue.esm.js'
import App from "./App.vue"
import VueRouter from 'vue-router';
// var VueRouter = require("")
Vue.use(VueRouter)
// 路由要在element-ui后引入，保证自己的样式能优先覆盖
Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
	el: "#app",
	template: "<App/>",
	components: { App }
});
globalThis.vv1 = vm;