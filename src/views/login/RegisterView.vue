<template>
	<div class="container">
		<v-form @submit.prevent="register" v-model="formIsValid">
			<h2 class="mb-5">Register</h2>
			<div class="input">
				<v-text-field
					v-model="userRegistry.username"
					label="UserName"
					:rules="validators.userName"
					type="txt"
				></v-text-field>
			</div>

			<div class="input">
				<v-text-field
					v-model="userRegistry.name"
					label="Name"
					:rules="validators.name"
					type="txt"
				></v-text-field>
			</div>
			<div class="input">
				<v-text-field
					v-model="userRegistry.password"
					label="Senha"
					:rules="validators.password"
					type="password"
				></v-text-field>
			</div>

			<div class="alternative-option mt-4">
				Already have an account? <span @click="moveToLogin">Login</span>
			</div>

			<v-btn
				:disabled="!formIsValid"
				type="submit"
				id="register_button"
				class="mt-4 btn-pers"
			>
				Register
			</v-btn>
		</v-form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserRegistry } from '../../models/userRegistry'
import { Validator } from '../../_helpers/validators'
import { useAuthStore } from './../../stores/auth.store'

export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Register',

	data() {
		return {
			store: useAuthStore(),
			userRegistry: new UserRegistry(),
			formIsValid: false,
			validators: {
				userName: [Validator.required()],
				password: [Validator.required()],
				name: [Validator.required()]
			}
		}
	},
	methods: {
		async register() {
			await this.store.registry(this.userRegistry)

			this.$router.push('/login')
		},
		moveToLogin() {
			this.$router.push('/login')
		}
	}
})
</script>
