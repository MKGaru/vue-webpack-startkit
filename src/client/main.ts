import * as Vue from 'vue'
import app from '../components/app'

// avoid hmr bug
self['cssModules'] = void 0;

new Vue({
	el: 'app',
	...app
})