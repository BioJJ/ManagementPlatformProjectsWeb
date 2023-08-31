<template>
	<div class="container">
		<form @submit.prevent="login">
			<h2 class="mb-3">Login</h2>
			<div class="input">
				<label for="email">UserName</label>
				<input
					class="form-control"
					type="text"
					name="text"
					placeholder="UserName"
					v-model="userName"
				/>
			</div>
			<div class="input">
				<label for="password">Password</label>
				<input
					class="form-control"
					type="password"
					name="password"
					placeholder="password123"
					v-model="password"
				/>
			</div>
			<div class="alternative-option mt-4">
				You don't have an account? <span @click="moveToRegister">Register</span>
			</div>
			<button type="submit" class="mt-4 btn-pers" id="login_button">
				Login
			</button>
			<div
				class="alert alert-warning alert-dismissible fade show mt-5 d-none"
				role="alert"
				id="alert_1"
			>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit.
				<button
					type="button"
					class="btn-close"
					data-bs-dismiss="alert"
					aria-label="Close"
				></button>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserLogin } from '../../models/userLogin'
import { Validator } from '../../_helpers/validators'
import { useAuthStore } from './../../stores/auth.store'

export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Login',
	data() {
		return {
			store: useAuthStore(),
			dadosLogin: new UserLogin(),
			userName: '',
			password: '',
			formIsValid: false,
			validadores: {
				email: [Validator.required()],
				senha: [Validator.required()]
			}
		}
	},
	methods: {
		async login() {
			this.dadosLogin.username = this.userName
			this.dadosLogin.password = this.password
			await this.store.login(this.dadosLogin)

			// if(this.store.getIsAuthenticated){
			// 	this.$router.push({ name: 'Home' })
			// }
		},
		moveToRegister() {
			this.$router.push('/register')
		}
	}
})
</script>

<style lang="css">
.container {
	width: 400px;
	max-width: 95%;
}
.input {
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
}

.alternative-option {
	text-align: center;
}

.alternative-option > span {
	color: #0d6efd;
	cursor: pointer;
}

#sign_out {
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}
</style>
