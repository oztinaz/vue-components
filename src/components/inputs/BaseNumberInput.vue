<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import { computed, ref, watch, type ComputedRef, type PropType, type Ref } from 'vue'
import type { Validation } from '@/types/Validation'

const number = defineModel({
  required: true,
  type: [Number, null] as PropType<number | null>
})

const props = defineProps<{
  parser: Function
  placeholder?: string
  step?: number
  validations?: Validation[]
}>()

const inputClass: Ref<string> = ref('')

const numberString: Ref<string> = ref(number.value !== null ? number.value.toString() : '')

const properNumber: ComputedRef<number | null> = computed((): number | null => {
  return numberString.value === '' ? null : parseNumberString(numberString.value)
})

const parseNumberString = (numberString: string): number => {
  return props.parser(numberString)
}

const setNumber = (n: number | null): void => {
  number.value = n
}

watch(properNumber, () => {
  setNumber(properNumber.value)
})

watch(number, () => {
  if (number.value === null) {
    numberString.value = ''
  }
})
</script>

<template>
  <BaseInput :input="number" :validations="validations" v-model:input-class="inputClass">
    <input
      type="number"
      :class="inputClass"
      :placeholder="props.placeholder"
      :step="props.step"
      v-model="numberString"
    />
  </BaseInput>
</template>

<style scoped></style>
