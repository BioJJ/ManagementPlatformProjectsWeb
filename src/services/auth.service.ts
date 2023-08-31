import api from '../_helpers/axios'
import { User } from '../models/User'
import { AccessTokenResponse } from '../models/accessTokenResponse'
import { UserLogin } from '../models/userLogin'
import { UserRegistry } from '../models/userRegistry'

export class AuthService {
	registerPath: string = 'register'
	loginPath: string = 'token'

	login(item: UserLogin) {
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

	register(item: UserRegistry) {
		return api.post<User>(`api/users/${this.registerPath}`, item)
	}

	checkToken(userName: string) {
		return api.get<User>(`api/users/${userName}`)
	}
}
