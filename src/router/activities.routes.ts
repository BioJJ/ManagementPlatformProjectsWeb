import { authGuard } from '../_helpers/navigationGuards'

const activitiesRoutes = [
	{
		path: '/activities',
		name: 'Activity',
		beforeEnter: authGuard,
		meta: {
			title: 'Activity'
		},
		component: () =>
			import(
				/* webpackChunkName: "home" */ './../views/activities/Activities.vue'
			)
	},
	{
		path: '/activities/create',
		name: 'ActivitiesForm',
		beforeEnter: authGuard,
		meta: {
			title: 'Activity'
		},
		component: () => import('../views/activities/ActivitiesForm.vue')
	},
	{
		path: '/activities/edit/:id',
		name: 'ActivitiesEdit',
		beforeEnter: authGuard,
		meta: {
			title: 'Activity'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/activities/ActivitiesForm.vue')
	},
	{
		path: '/activities/view/:id',
		name: 'ActivitiesView',
		beforeEnter: authGuard,
		meta: {
			title: 'Activity'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/activities/ActivitiesView.vue')
	}
]

export default activitiesRoutes
