<template>
	<v-container id="client" class="pa-6" fluid>
		<v-row>
			<v-col cols="6">
				<v-breadcrumbs divider="|" class="pa-0 breadcrumbs-title">
					{{ $route.meta.title }}
				</v-breadcrumbs>
			</v-col>
			<v-col cols="6"></v-col>
			<v-col cols="12">
				<v-card class="pa-10 pgc-card-box pgc-card-crud">
					<v-form ref="form" lazy-validation>
						<div class="pgc-crud-header">
							<h2>Client View</h2>
							<v-progress-linear
								value="8"
								color="primary"
								background-color="#DDD"
								height="2"
							/>
						</div>
						<v-row class="pgc-form-row">
							<v-col cols="4">
								<v-text-field
									v-model="client.id"
									label="ID"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field
									v-model="client.name"
									label="Name"
									readonly
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-text-field
									v-model="client.email"
									readonly
									label="Email"
									dense
								></v-text-field>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-10">
						<v-btn to="/clients" color="red" outlined class="ml-5 pgc-btn-form">
							Voltar
						</v-btn>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Client } from '../../models/Client'
import { useToast } from 'vue-toastification'
import { useClientStore } from '../../stores/client.store'

export default defineComponent({
	name: 'ClientsView',
	data: () => ({
		client: new Client(),
		toast: useToast(),
		store: useClientStore()
	}),

	mounted(): void {
		this.$route.params.id && this.getClient()
	},
	methods: {
		async getClient() {
			try {
				this.client = await this.store.fetchClient(this.$route.params.id)
			} catch (error) {
				this.toast.error('Client not found')
			}
		}
	}
})
</script>
