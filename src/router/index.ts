import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authGuard, authGuardLayout } from '../_helpers/navigationGuards'

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
				component: () =>
					import(/* webpackChunkName: "home" */ './../views/user/User.vue')
			},
			{
				path: '/clients',
				name: 'Clients',
				beforeEnter: authGuard,
				component: () =>
					import(
						/* webpackChunkName: "home" */ './../views/clients/Clients.vue'
					)
			},
			{
				path: '/projects',
				name: 'Projects',
				beforeEnter: authGuard,
				component: () =>
					import(
						/* webpackChunkName: "home" */ './../views/projects/Projects.vue'
					)
			},
			{
				path: '/activities',
				name: 'Activities',
				beforeEnter: authGuard,
				component: () =>
					import(
						/* webpackChunkName: "home" */ './../views/activities/Activities.vue'
					)
			}
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
