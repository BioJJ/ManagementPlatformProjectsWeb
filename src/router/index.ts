import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authGuard, authGuardLayout } from '../_helpers/navigationGuards'
import clientSRoutes from './clients.routes'
import projectSRoutes from './projects.routes'
import activitiesRoutes from './activities.routes'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () => import('./../layouts/default/Default.vue'),
		beforeEnter: authGuardLayout,
		children: [
			{
				path: '/home',
				name: 'Home',
				beforeEnter: authGuard,
				component: () =>
					import(/* webpackChunkName: "home" */ './../views/home/Home.vue')
			},
			{
				path: '/user',
				name: 'User',
				beforeEnter: authGuard,
				meta: {
					title: 'User'
				},
				component: () =>
					import(/* webpackChunkName: "home" */ './../views/user/User.vue')
			},
			...clientSRoutes,
			...projectSRoutes,
			...activitiesRoutes
		]
	},
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
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
