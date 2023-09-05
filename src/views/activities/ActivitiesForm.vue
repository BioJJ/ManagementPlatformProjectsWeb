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
							<h2>Activity Form</h2>
							<v-progress-linear
								value="8"
								color="primary"
								background-color="#DDD"
								height="2"
							/>
						</div>
						<v-row class="pgc-form-row">
							<v-col cols="12">
								<v-text-field
									:rules="validators.description"
									v-model="activity.description"
									label="Description"
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-autocomplete
									v-model="activity.status"
									:rules="validators.status"
									dense
									label="Status"
									:items="['Em andamento', 'Pausado', 'Concluído', 'Suspenso']"
								></v-autocomplete>
							</v-col>

							<v-col cols="4">
								<v-text-field
									:rules="validators.startDate"
									v-model="activity.startDate"
									label="startDate"
									dense
								></v-text-field>

								<!-- <v-date-picker label="startDate" dense></v-date-picker> -->
							</v-col>

							<v-col cols="4">
								<v-text-field
									:rules="validators.expectedEndDate"
									v-model="activity.expectedEndDate"
									label="expected End Date"
									dense
								></v-text-field>
							</v-col>

							<v-col cols="6">
								<v-autocomplete
									v-model="activity.client"
									:rules="validators.client"
									dense
									label="Client"
									:items="clients"
									item-title="name"
									return-object
								></v-autocomplete>
							</v-col>

							<v-col cols="6">
								<v-autocomplete
									v-model="activity.project"
									:rules="validators.project"
									dense
									label="Project"
									:items="projects"
									item-title="projectName"
									return-object
								></v-autocomplete>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-15">
						<v-btn
							to="/activities"
							color="red"
							outlined
							class="ml-5 pgc-btn-form"
						>
							Cancel
						</v-btn>
						<v-btn
							@click="resetForm"
							color="warning"
							outlined
							class="ml-5 pgc-btn-form"
						>
							Clean
						</v-btn>
						<v-btn
							@click="submitForm"
							:loading="formLoading"
							color="primary"
							class="ml-5 pgc-btn-form"
						>
							<v-icon small class="mr-1">mdi-content-save</v-icon> Save
						</v-btn>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Validator } from '../../_helpers/validators'
import { useToast } from 'vue-toastification'
import Pagination from '../../models/Pagination'
import { useProjectStore } from '../../stores/project.store'
import { useClientStore } from './../../stores/client.store'
import { useActivityStore } from './../../stores/activity.store'
import { Activity } from '../../models/Activity'

// import { VDatePicker } from 'vuetify/labs/VDatePicker'

export default defineComponent({
	name: 'ProjectsForm',
	components: {
		// VDatePicker
	},
	data: () => ({
		formLoading: false,
		validators: {
			description: [Validator.required(), Validator.max(100), Validator.min(4)],
			startDate: [Validator.required()],
			expectedEndDate: [Validator.required()],
			status: [Validator.required()],
			client: [Validator.required()],
			project: [Validator.required()]
		},
		activity: new Activity(),
		toast: useToast(),
		store: useActivityStore(),
		storeClient: useClientStore(),
		storeProject: useProjectStore(),
		pagination: Pagination.build(),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		clients: [] as any[],
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		projects: [] as any[]
	}),

	mounted(): void {
		this.getClients()
		this.getProjects()

		this.$route.params.id && this.getActivity()
	},
	methods: {
		async getActivity() {
			try {
				this.activity = await this.store.fetchActivity(this.$route.params.id)
			} catch (error) {
				this.toast.error('Activity not found')
			}
		},
		async getClients() {
			await this.storeClient.fetchClients(this.pagination)
			this.clients = this.storeClient.getClientsList
		},
		async getProjects() {
			await this.storeProject.fetchProjects(this.pagination)
			this.projects = this.storeProject.getProjectsList
		},
		async submitForm(): Promise<void> {
			this.formLoading = true
			try {
				if (this.$route.params.id) {
					await this.store.fetchUpdateActivity(this.activity)
					this.toast.info('Activity Updated successfully')
				} else {
					await this.store.fetchSaveActivity(this.activity)
					this.toast.success('Activity Saved successfully')
				}
				this.formLoading = false
				this.$router.push({ name: 'Activity' })

				this.formLoading = false
			} catch (error) {
				this.formLoading = false
			}
		},
		cancel(): void {
			this.resetForm()
			this.$router.push({ name: 'Activity' })
		},
		resetForm() {
			if (this.activity) {
				this.getActivity()
			} else {
				this.activity = new Activity()
			}
		}
	}
})
</script>
