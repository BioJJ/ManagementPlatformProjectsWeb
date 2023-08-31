export class User {
	id: number
	username: string
	password: string
	name: string
	roles: string[]

	constructor(
		id: number,
		username: string,
		password: string,
		name: string,
		roles: string[]
	) {
		this.id = id
		this.username = username
		this.password = password
		this.name = name
		this.roles = roles
	}
}
