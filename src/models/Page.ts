export default class Page<T> {
	content!: T[]
	pageable!: Pageable
	totalElements!: number
	last!: boolean
	totalPages!: number
	size!: number
	number!: number
	sort!: {
		empty: boolean
		sorted: boolean
		unsorted: boolean
	}
	numberOfElements!: number
	first!: boolean
	empty!: boolean

	// 	static build(): Page<any> {
	// 		return {
	// 			items: [],
	// 			itemCount: 0,
	// 			totalItems: 0,
	// 			pageCount: 0,
	// 			next: '',
	// 			previous: ''
	// 		}
	// 	}
	// }
}
interface Pageable {
	sort: {
		empty: boolean
		sorted: boolean
		unsorted: boolean
	}
	offset: number
	pageSize: number
	pageNumber: number
	paged: boolean
	unpaged: boolean
}
