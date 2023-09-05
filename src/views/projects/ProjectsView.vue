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
							<h2>Project View</h2>
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
									v-model="project.id"
									label="ID"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="8">
								<v-text-field
									v-model="project.projectName"
									label="Name"
									readonly
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-text-field
									v-model="project.startDate"
									readonly
									label="start-Date"
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-text-field
									v-model="project.projectStatus"
									readonly
									label="Status"
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-text-field
									v-model="client"
									readonly
									label="Client"
									dense
								></v-text-field>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-10">
						<v-btn
							to="/projects"
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

import { Project } from '../../models/Project'
import { useToast } from 'vue-toastification'
import { useProjectStore } from '../../stores/project.store'

export default defineComponent({
	name: 'ProjectsView',
	data: () => ({
		project: new Project(),
		client: '' as string | undefined,
		toast: useToast(),
		store: useProjectStore()
	}),

	async mounted(): Promise<void> {
		this.$route.params.id && (await this.getProject())
	},
	methods: {
		async getProject() {
			try {
				this.project = await this.store.fetchProject(this.$route.params.id)
				this.client = this.project.client?.name ?? ''
			} catch (error) {
				this.toast.error('Project not found')
			}
		}
	}
})
</script>
