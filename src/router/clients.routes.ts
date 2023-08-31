import { authGuard } from '../_helpers/navigationGuards'

const clientSRoutes = [
	{
		path: '/clients',
		name: 'Clients',
		beforeEnter: authGuard,
		meta: {
			title: 'Clients'
		},
		component: () =>
			import(/* webpackChunkName: "home" */ './../views/clients/Clients.vue')
	},
	{
		path: '/clients/create',
		name: 'ClientsForm',
		beforeEnter: authGuard,
		meta: {
			title: 'Clients'
		},
		component: () => import('../views/clients/ClientsForm.vue')
	},
	{
		path: '/clients/edit/:id',
		name: 'ClientsEdit',
		beforeEnter: authGuard,
		meta: {
			title: 'Clients'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/clients/ClientsForm.vue')
	},
	{
		path: '/clients/view/:id',
		name: 'ClientsView',
		beforeEnter: authGuard,
		meta: {
			title: 'Clients'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/clients/ClientsView.vue')
	}
]

export default clientSRoutes
