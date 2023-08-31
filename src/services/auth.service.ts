import api from '../_helpers/axios'
import { User } from '../models/User'
import { AccessTokenResponse } from '../models/accessTokenResponse'
import { UserLogin } from '../models/userLogin'

export class AuthService {
	registerPath: string = 'register'
	loginPath: string = 'token'

	constructor() {}

	login(item: UserLogin) {
		console.log('dadosLogin =>', item)

		const authHeader = `Basic ${btoa('management-platform-projects:@321')}`

		const formData = new URLSearchParams()
		formData.append('username', item.username)
		formData.append('password', item.password)
		formData.append('grant_type', 'password')

		const requestOptions = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: authHeader
			}
		}

		return api.post<AccessTokenResponse>(
			`/oauth/${this.loginPath}`,
			formData.toString(),
			requestOptions
		)
	}

	// registrar(item: UsuarioCadastro) {
	// 	return api.post<UsuarioCadastro>(`/auth/${this.registerPath}`, item)
	// }

	checkToken(userName: string) {
		return api.post<User>(`api/users/${userName}`)
	}
}
