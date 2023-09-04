/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import GenericService from '../services/generic.service'
import Page from '../models/Page'
import { Activity } from '../models/Activity'

const service = new GenericService<Activity>('activity')

export const useActivityStore = defineStore('activity', {
	state: () => ({
		activities: [] as unknown as Page<Activity>,
		totalItens: 0
	}),
	getters: {
		getActivitiesList: (state) => {
			return state.activities.content
		},
		getTotalItens: (state) => {
			return state.totalItens
		}
	},
	actions: {
		async fetchActivities(params: any): Promise<void> {
			await service.list(params).then((res) => {
				this.activities = res.data
				this.totalItens = this.activities.totalElements
			})
		},
		async fetchActivity(id: any): Promise<Activity> {
			return await service.findById(id).then((res) => {
				return res.data
			})
		},
		async fetchSaveActivity(activity: Activity): Promise<void> {
			await service.save(activity).then((res) => {
				return res.data
			})
		},
		async fetchUpdateActivity(activity: Activity): Promise<void> {
			await service.update(activity).then((res) => {
				return res.data
			})
		},
		async fetchDeleteActivity(id: any): Promise<void> {
			await service.delete(id).then((res) => {
				return res.data
			})
		}
	}
})
