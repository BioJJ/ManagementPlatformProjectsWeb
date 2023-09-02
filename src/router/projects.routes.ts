import { authGuard } from '../_helpers/navigationGuards'

const projectSRoutes = [
	{
		path: '/projects',
		name: 'Projects',
		beforeEnter: authGuard,
		meta: {
			title: 'Projects'
		},
		component: () =>
			import(/* webpackChunkName: "home" */ './../views/projects/Projects.vue')
	},
	{
		path: '/projects/create',
		name: 'ProjectsForm',
		beforeEnter: authGuard,
		meta: {
			title: 'Projects'
		},
		component: () => import('../views/projects/ProjectsForm.vue')
	},
	{
		path: '/projects/edit/:id',
		name: 'ProjectsEdit',
		beforeEnter: authGuard,
		meta: {
			title: 'Projects'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/projects/ProjectsForm.vue')
	},
	{
		path: '/projects/view/:id',
		name: 'ProjectsView',
		beforeEnter: authGuard,
		meta: {
			title: 'Projects'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/projects/ProjectsView.vue')
	}
]

export default projectSRoutes
