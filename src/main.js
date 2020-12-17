import Vue from 'vue';
import shortkey from 'vue-shortkey';
import Vue2TouchEvents from 'vue2-touch-events';
import App from './App.vue';
import router from './router';
import store from './store';

import './registerServiceWorker';

Vue.use(shortkey);
Vue.use(Vue2TouchEvents);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
