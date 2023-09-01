import api from '../_helpers/axios'
import Page from '../models/Page'

export class EntityBase {
	id: number | undefined
}

export default class GenericService<T extends EntityBase> {
	endpoint: string = ''

	constructor(recurse: string) {
		this.endpoint = recurse
	}

	save(item: T) {
		return api.post<T>(`/api/${this.endpoint}`, item)
	}

	update(item: T) {
		return api.put<T>(`/api/${this.endpoint}/${item.id}`, item)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	list(params: any) {
		if (params.limit < 0) params.limit = 0
		return api.get<Page<T>>(`/api/${this.endpoint}`, { params })
	}

	delete(id: number) {
		return api.delete(`api/${this.endpoint}/${id}`)
	}

	findById(id: number) {
		return api.get<T>(`/api/${this.endpoint}/${id}`)
	}
}
