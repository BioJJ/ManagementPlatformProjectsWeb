<script setup lang="ts">
import { watch } from 'vue'
import TextfieldDatepicker from './TextfieldDatepicker.vue'

type Form = {
	status: string
	client: { id: number; name: string }
	project: { id: number; name: string }
	startDate: Date | null
	expectedEndDate: Date | null
}
const { form } = defineProps<{ form: Form }>()

function clearProject() {
	form.project = null as any
}

watch(() => form.client, clearProject, { deep: true })
</script>

<template>
	<div>
		<textfield-datepicker
			label="Data início"
			v-model="form.startDate as Date"
		/>

		<textfield-datepicker
			label="Data Fim"
			v-model="form.expectedEndDate as Date"
		/>

		<v-select
			v-model="form.status"
			label="Status"
			:items="['Em aberto', 'Em execução', 'Concluído']"
		></v-select>

		<v-select
			v-model="form.client"
			label="Cliente"
			return-object
			item-title="name"
			:items="[
				{ name: 'Stefanini', id: 1 },
				{ name: 'Accenture', id: 2 },
				{ name: 'Itaú', id: 3 }
			]"
		></v-select>

		<v-select
			v-model="form.project as any"
			label="Projeto"
			:disabled="!form.client?.id"
			return-object
			item-title="name"
			:items="[
				{ name: 'Reconhecimento facial', id: 1 },
				{ name: 'Pagamento Pix', id: 2 },
				{ name: 'CIGS', id: 3 }
			]"
		></v-select>

		<v-textarea label="Descrição" />
	</div>
</template>
