<script setup lang="ts"></script>

<template>
	<v-app>
		<v-main>
			<router-view id="content" />
		</v-main>
	</v-app>
</template>

<style>
#content {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 1px solid lightgray;
	padding: 4rem 4rem;
	border-radius: 5px;
	background: #fefefe;
}
</style>
