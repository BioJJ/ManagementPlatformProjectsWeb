<template>
	<v-container id="activities" class="pa-6" fluid>
		<delete-modal @delete="deleted" ref="DeleteModal" :table="'activities'" />

		<v-row class="mb-3">
			<v-col cols="6">
				<v-breadcrumbs divider="|" class="pa-0 breadcrumbs-title">
					{{ $route.meta.title }}
				</v-breadcrumbs>
			</v-col>
			<v-col cols="6">
				<v-btn to="/activities/create" elevation="1" class="btn-create-title">
					<v-icon class="mr-1">mdi-plus</v-icon>
					Create Activity
				</v-btn>
			</v-col>

			<v-col cols="12">
				<v-card class="pt-10 pb-7 px-6 pgc-card-box">
					<v-row>
						<v-col cols="6">
							<v-text-field
								v-model="search"
								append-icon="mdi-magnify"
								label="Search"
								single-line
								hide-details
							></v-text-field>
						</v-col>

						<v-col cols="3">
							<v-btn
								elevation="1"
								color="bluesky"
								style="color: #000; transform: translateY(6px)"
								large
								@click="performSearch"
							>
								Search
							</v-btn>
						</v-col>
					</v-row>
				</v-card>
			</v-col>

			<v-col cols="12">
				<v-card class="py-3 px-6 pgc-card-box">
					<v-data-table
						:headers="headers"
						:items="activities"
						class="pgc-table"
						:search="search"
						v-model:page="page"
						:items-per-page="itemsPerPage"
						:total-items="pageCount * itemsPerPage"
					>
						<template v-slot:item.actions="{ item }">
							<table-action
								@delete="deleteModal(item.columns.name, item.columns.id)"
								route="activities"
								:item="item.columns"
							/>
						</template>
					</v-data-table>
					<v-spacer></v-spacer>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TableAction from './../../components/TableAction.vue'
import DeleteModal from './../../components/DeleteModal.vue'

import { VDataTable } from 'vuetify/labs/VDataTable'
import { useToast } from 'vue-toastification'

import Pagination from '../../models/Pagination'
import { useActivityStore } from '../../stores/activity.store'

export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Activities',
	components: {
		TableAction,
		DeleteModal,
		VDataTable
	},
	data() {
		return {
			toast: useToast(),
			store: useActivityStore(),
			pagination: Pagination.build(),
			search: '',
			page: 1,
			pageCount: 0,
			itemsPerPage: 10,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			activities: [] as any[],
			headers: [
				{ title: 'Id', align: 'start', value: 'id', key: 'id' },
				{
					title: 'Description',
					align: 'start',
					value: 'description',
					key: 'description'
				},
				{
					title: 'Status',
					align: 'start',
					value: 'status',
					key: 'status'
				},
				{
					title: 'Client',
					align: 'start',
					value: 'client.name',
					key: 'client.name'
				},
				{
					title: 'Project',
					align: 'start',
					value: 'project.projectName',
					key: 'project.projectName'
				},
				{ title: 'Actions', key: 'actions', sortable: false }
			]
		}
	},
	mounted() {
		this.getActivities()
	},
	methods: {
		async getActivities() {
			await this.store.fetchActivities(this.pagination)
			this.activities = this.store.getActivitiesList
			this.itemsPerPage = this.store.getTotalItens
		},
		deleteModal(name: string, id: string) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const deleteModal = this.$refs.DeleteModal as any
			deleteModal.showModal(name, id)
		},
		deleted() {
			this.toast.success('Project deleted successfully')
			this.getActivities()
		},
		performSearch() {}
	}
})
</script>
