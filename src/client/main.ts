import * as Vue from 'vue'
import app from '../components/app/app'

// avoid hmr bug
self['cssModules'] = void 0;

new (Vue['default'] || Vue)({
	el: 'app',
	...app
})