<script setup lang="ts">
import { ref } from 'vue'
import { toPattern } from 'vanilla-masker'
import dayjs from 'dayjs'
import parseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(parseFormat)

const textField = ref<HTMLInputElement>(null as any)
const valueHere = ref('')

const { label } = defineProps<{ modelValue: Date | null; label?: string }>()
const emit = defineEmits(['update:modelValue'])

function onChangeDate(e: any) {
	console.log(e)
	const date = toPattern(e, '99/99/9999')
	valueHere.value = date

	if (dayjs(dayjs(date, 'DD/MM/YYYY').toDate()).isValid()) {
		const newDate = dayjs(date, 'DD/MM/YYYY').toDate()
		console.log('valor para fora:', newDate)
		emit('update:modelValue', newDate)
	}
}

//watch(textField, createDatePicker)
</script>

<template>
	<v-text-field
		placeholder="DD/MM/YYYY"
		:label="label"
		v-model="valueHere"
		@update:model-value="onChangeDate"
		ref="textField"
		append-inner-icon="mdi-calendar"
	/>
</template>
