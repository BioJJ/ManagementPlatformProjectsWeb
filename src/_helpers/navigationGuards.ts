import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from './../stores/auth.store'
import { AuthService } from '../services/auth.service'
import { decodeToken } from './utils'

export function authGuard(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) {
	const service = new AuthService()
	const store = useAuthStore()
	if (store.user === null) {
		if (localStorage.getItem('accessToken')) {
			const token = JSON.stringify(localStorage.getItem('accessToken'))
			if (decodeToken(token).exp < Math.round(new Date().getTime() / 1000)) {
				if (to.path == '/login') return next()
				return next('/login')
			}
			store.setToken(JSON.parse(token))

			if (localStorage.getItem('userName')) {
				store.userName = JSON.parse(localStorage.getItem('userName') as string)
				return service
					.checkToken(store.userName)
					.then((payload) => {
						caches.delete('check')
						store.userChecked(payload.data)
						if (to.path == '/login') return next('/home')
						return next()
					})
					.catch(() => {
						return next('/login')
					})
			}
		} else {
			// Não tem token
			if (to.path == '/login') return next()
			return next('/login')
		}
	} else {
		if (to.path == '/login') {
			return next(from.path)
		}
		return next()
	}
}

export function authGuardLayout(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) {
	const store = useAuthStore()

	if (to.path === '/login') {
		if (store.isAuthenticated) {
			return next('/home')
		}
		return next()
	}

	if (!store.isAuthenticated) {
		return next('/login')
	}

	return next()
}
