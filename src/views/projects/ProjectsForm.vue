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
							<h2>Project</h2>
							<v-progress-linear
								value="8"
								color="primary"
								background-color="#DDD"
								height="2"
							/>
						</div>
						<v-row class="pgc-form-row">
							<v-col cols="8">
								<v-text-field
									:rules="validators.projectName"
									v-model="project.projectName"
									label="Name"
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-autocomplete
									v-model="project.projectStatus"
									:rules="validators.projectStatus"
									dense
									label="Status"
									:items="['Em andamento', 'Pausado', 'Concluído', 'Suspenso']"
								></v-autocomplete>
							</v-col>

							<v-col cols="4">
								<v-text-field
									:rules="validators.startDate"
									v-model="project.startDate"
									label="startDate"
									dense
								></v-text-field>

								<!-- <v-date-picker label="startDate" dense></v-date-picker> -->
							</v-col>

							<v-col cols="4">
								<v-text-field
									:rules="validators.expectedEndDate"
									v-model="project.expectedEndDate"
									label="expected End Date"
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-autocomplete
									v-model="project.client"
									:rules="validators.client"
									dense
									label="Client"
									:items="clients"
									item-title="name"
									return-object
								></v-autocomplete>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-15">
						<v-btn
							to="/projects"
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
import { Project } from '../../models/Project'
import Pagination from '../../models/Pagination'
import { useProjectStore } from '../../stores/project.store'
import { useClientStore } from './../../stores/client.store'

// import { VDatePicker } from 'vuetify/labs/VDatePicker'

export default defineComponent({
	name: 'ProjectsForm',
	components: {
		// VDatePicker
	},
	data: () => ({
		formLoading: false,
		validators: {
			projectName: [Validator.required(), Validator.max(100), Validator.min(4)],
			startDate: [Validator.required()],
			expectedEndDate: [Validator.required()],
			projectStatus: [Validator.required()],
			client: [Validator.required()]
		},
		project: new Project(),
		toast: useToast(),
		store: useProjectStore(),
		storeClient: useClientStore(),
		pagination: Pagination.build(),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		clients: [] as any[]
	}),

	mounted(): void {
		this.getClients()
		this.$route.params.id && this.getProject()
	},
	methods: {
		async getProject() {
			try {
				this.project = await this.store.fetchProject(this.$route.params.id)
			} catch (error) {
				this.toast.error('Project not found')
			}
		},
		async getClients() {
			await this.storeClient.fetchClients(this.pagination)
			this.clients = this.storeClient.getClientsList
		},
		async submitForm(): Promise<void> {
			this.formLoading = true
			try {
				if (this.$route.params.id) {
					await this.store.fetchUpdateProject(this.project)
					this.toast.info('Project Updated successfully')
				} else {
					await this.store.fetchSaveProject(this.project)
					this.toast.success('Project Saved successfully')
				}
				this.formLoading = false
				this.$router.push({ name: 'Projects' })

				this.formLoading = false
			} catch (error) {
				this.formLoading = false
			}
		},
		cancel(): void {
			this.resetForm()
			this.$router.push({ name: 'Projects' })
		},
		resetForm() {
			if (this.project) {
				this.getProject()
			} else {
				this.project = new Project()
			}
		}
	}
})
</script>
