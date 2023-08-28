<script lang="ts">
export default {
	components: { RegisterEditActivityForm },
	name: 'RegisterActivityDialog'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import RegisterEditActivityForm from './RegisterEditActivityForm.vue'
import { reactive } from 'vue'

const dialog = ref(false)
const button = ref<HTMLElement>(null as any)

/* const { saveTask } = defineProps({
	saveTask: Function,
}) */

function save() {
	//saveTask?.()
	console.log(form)
	fetch('local', { body: JSON.stringify(form), method: 'post' })
}

const form = reactive({
	status: '',
	client: { id: 0, name: '' },
	project: { id: 0, name: '' },
	startDate: null,
	expectedEndDate: null
})
</script>

<template>
	<VLayoutItem model-value position="bottom" class="text-end" size="88">
		<div class="ma-4">
			<v-btn icon="mdi-plus" size="large" elevation="8" ref="button" />
			<v-dialog v-model="dialog" :activator="button" width="50%">
				<v-card>
					<v-card-title>Registrar Atividade</v-card-title>
					<v-card-text wi>
						<register-edit-activity-form :form="form" />
					</v-card-text>
					<v-card-actions>
						<v-btn color="primary" variant="flat" block @click="save"
							>Salvar</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</VLayoutItem>
</template>
