// router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authGuard } from '../_helpers/navigationGuards'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'Login',
		beforeEnter: authGuard,
		component: () =>
			import(/* webpackChunkName: "home" */ './../views/login/Login.vue')
	},
	{
		path: '/register',
		name: 'Register',
		component: () =>
			import(/* webpackChunkName: "home" */ './../views/login/RegisterView.vue')
	},
	{
		path: '/home',
		name: 'Home',
		beforeEnter: authGuard,
		component: () =>
			import(/* webpackChunkName: "home" */ './../views/home/Home.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
