/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { Project } from '../models/Project'
import GenericService from '../services/generic.service'
import Page from '../models/Page'

const service = new GenericService<Project>('project')

export const useProjectStore = defineStore('project', {
	state: () => ({
		projects: [] as unknown as Page<Project>,
		totalItens: 0
	}),
	getters: {
		getProjectsList: (state) => {
			return state.projects.content
		},
		getTotalItens: (state) => {
			return state.totalItens
		}
	},
	actions: {
		async fetchProjects(params: any): Promise<void> {
			await service.list(params).then((res) => {
				this.projects = res.data
				this.totalItens = this.projects.totalElements
			})
		},
		async fetchProject(id: any): Promise<Project> {
			return await service.findById(id).then((res) => {
				return res.data
			})
		},
		async fetchSaveProject(project: Project): Promise<void> {
			await service.save(project).then((res) => {
				return res.data
			})
		},
		async fetchUpdateProject(project: Project): Promise<void> {
			await service.update(project).then((res) => {
				return res.data
			})
		},
		async fetchDeleteProject(id: any): Promise<void> {
			await service.delete(id).then((res) => {
				return res.data
			})
		}
	}
})
