// router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from './../views/login/Login.vue'
import RegisterView from './../views/login/RegisterView.vue'
import { authGuard } from '../_helpers/navigationGuards'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'Login',
		beforeEnter: authGuard,
		component: Login
	},
	{
		path: '/register',
		name: 'Register',
		component: RegisterView
	},
	{
		path: '/home',
		name: 'Home',
		component: () =>
			import(/* webpackChunkName: "home" */ './../views/home/Home.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
