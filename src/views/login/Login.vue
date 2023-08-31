<template>
	<div class="container">
		<v-form @submit.prevent="login" v-model="formIsValid">
			<h2 class="mb-5">Login</h2>
			<div class="input">
				<v-text-field
					v-model="dadosLogin.username"
					label="UserName"
					:rules="validators.userName"
					type="txt"
				></v-text-field>
			</div>
			<div class="input">
				<v-text-field
					v-model="dadosLogin.password"
					label="password"
					:rules="validators.password"
					type="password"
				></v-text-field>
			</div>
			<div class="alternative-option mt-4">
				You don't have an account? <span @click="moveToRegister">Register</span>
			</div>
			<v-btn
				:disabled="!formIsValid"
				type="submit"
				class="mt-4 btn-pers"
				id="login_button"
			>
				Login
			</v-btn>
		</v-form>
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
			formIsValid: false,
			validators: {
				userName: [Validator.required()],
				senha: [Validator.required()]
			}
		}
	},
	methods: {
		async login() {
			await this.store.login(this.dadosLogin)

			if (this.store.getIsAuthenticated) {
				this.$router.push({ name: 'Home' })
			}
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
