<template>
	<v-container id="project" class="pa-6" fluid>
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
							<h2>Activity View</h2>
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
									v-model="activity.id"
									label="ID"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="8">
								<v-text-field
									v-model="activity.description"
									label="Description"
									readonly
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-text-field
									v-model="activity.startDate"
									readonly
									label="start-Date"
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-text-field
									v-model="activity.expectedEndDate"
									readonly
									label="expected End Date"
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-text-field
									v-model="activity.status"
									readonly
									label="Status"
									dense
								></v-text-field>
							</v-col>

							<v-col cols="6">
								<v-text-field
									v-model="client"
									label="Client"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-text-field
									v-model="project"
									label="Project"
									readonly
									dense
								></v-text-field>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-10">
						<v-btn
							to="/activities"
							color="red"
							outlined
							class="ml-5 pgc-btn-form"
						>
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

import { useToast } from 'vue-toastification'
import { Activity } from '../../models/Activity'
import { useActivityStore } from '../../stores/activity.store'

export default defineComponent({
	name: 'ProjectsView',
	data: () => ({
		project: '' as string | undefined,
		client: '' as string | undefined,
		activity: new Activity(),
		toast: useToast(),
		store: useActivityStore()
	}),

	async mounted(): Promise<void> {
		this.$route.params.id && (await this.getActivity())
	},
	methods: {
		async getActivity() {
			try {
				this.activity = await this.store.fetchActivity(this.$route.params.id)
				this.client = this.activity.client?.name ?? ''
				this.project = this.activity.project?.projectName ?? ''
			} catch (error) {
				this.toast.error('Activity not found')
			}
		}
	}
})
</script>
