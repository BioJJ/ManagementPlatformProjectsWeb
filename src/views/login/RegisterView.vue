<template>
	<div class="container">
		<form @submit.prevent="register">
			<h2 class="mb-3">Register</h2>
			<div class="input">
				<label for="email">Email address</label>
				<input
					class="form-control"
					v-model="email"
					type="text"
					name="email"
					placeholder="email@address.com"
				/>
			</div>
			<div class="input">
				<label for="password">Password</label>
				<input
					class="form-control"
					v-model="password"
					type="password"
					name="password"
					placeholder="password123"
				/>
			</div>

			<div class="alternative-option mt-4">
				Already have an account? <span @click="moveToLogin">Login</span>
			</div>

			<button type="submit" id="register_button" class="mt-4 btn-pers">
				Register
			</button>
			<div
				class="alert alert-warning alert-dismissible fade show mt-5 d-none"
				role="alert"
				id="alert_2"
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
export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Register',

	data() {
		return {
			email: '',
			password: '123456'
		}
	},
	methods: {
		register() {
			// data update
		},
		moveToLogin() {
			this.$router.push('/')
		}
	}
})
</script>
