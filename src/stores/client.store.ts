/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { Client } from '../models/Client'
import GenericService from '../services/generic.service'
import Page from '../models/Page'

const service = new GenericService<Client>('client')

export const useClientStore = defineStore('client', {
	state: () => ({
		clients: [] as unknown as Page<Client>,
		totalItens: 0
	}),
	getters: {
		getClientsList: (state) => {
			return state.clients.content
		},
		getTotalItens: (state) => {
			return state.totalItens
		}
	},
	actions: {
		async fetchClients(params: any): Promise<void> {
			await service.list(params).then((res) => {
				this.clients = res.data
				this.totalItens = this.clients.totalElements
			})
		},
		async fetchClient(id: any): Promise<Client> {
			return await service.findById(id).then((res) => {
				return res.data
			})
		},
		async fetchSaveClient(client: Client): Promise<void> {
			await service.save(client).then((res) => {
				return res.data
			})
		},
		async fetchUpdateClient(client: Client): Promise<void> {
			await service.update(client).then((res) => {
				return res.data
			})
		},
		async fetchDeleteClient(id: any): Promise<void> {
			await service.delete(id).then((res) => {
				return res.data
			})
		}
	}
})
