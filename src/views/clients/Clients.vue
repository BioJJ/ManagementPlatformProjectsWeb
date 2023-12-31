<template>
	<v-container id="clients" class="pa-6" fluid>
		<delete-modal @delete="deleteClient" ref="DeleteModal" :table="'clients'" />

		<v-row class="mb-3">
			<v-col cols="6">
				<v-breadcrumbs divider="|" class="pa-0 breadcrumbs-title">
					{{ $route.meta.title }}
				</v-breadcrumbs>
			</v-col>
			<v-col cols="6">
				<v-btn to="/clients/create" elevation="1" class="btn-create-title">
					<v-icon class="mr-1">mdi-plus</v-icon>
					Create Clients
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
						:items="clients"
						class="pgc-table"
						:search="search"
						v-model:page="page"
						:items-per-page="itemsPerPage"
						:total-items="pageCount * itemsPerPage"
					>
						<template v-slot:item.actions="{ item }">
							<table-action
								@delete="deleteModal(item.columns.name, item.columns.id)"
								route="clients"
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

import { useClientStore } from './../../stores/client.store'
import Pagination from '../../models/Pagination'

export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Clients',
	components: {
		TableAction,
		DeleteModal,
		VDataTable
	},
	data() {
		return {
			toast: useToast(),
			store: useClientStore(),
			pagination: Pagination.build(),
			search: '',
			page: 1,
			pageCount: 0,
			itemsPerPage: 10,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			clients: [] as any[],
			headers: [
				{ title: 'Id', align: 'start', value: 'id', key: 'id' },
				{ title: 'Name', align: 'start', value: 'name', key: 'name' },
				{ title: 'Email', align: 'start', value: 'email', key: 'email' },
				{ title: 'Actions', key: 'actions', sortable: false }
			]
		}
	},
	mounted() {
		this.getClients()
	},
	methods: {
		async getClients() {
			await this.store.fetchClients(this.pagination)
			this.clients = this.store.getClientsList
			this.itemsPerPage = this.store.getTotalItens
		},
		deleteModal(name: string, id: string) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const deleteModal = this.$refs.DeleteModal as any
			deleteModal.showModal(name, id)
		},
		deleteClient() {
			this.toast.success('Client deleted successfully')
			this.getClients()
		},
		performSearch() {}
	}
})
</script>
