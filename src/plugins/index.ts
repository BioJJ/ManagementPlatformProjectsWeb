import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import { setupPinia } from '../stores'
import router from '../router'

// Types
import type { App } from 'vue'

const pinia = setupPinia()

export function registerPlugins(app: App) {
	loadFonts()
	app.use(vuetify).use(router).use(pinia)
}
