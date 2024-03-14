<script setup lang="ts">
import BaseNumberInput from './BaseNumberInput.vue'
import type { PropType } from 'vue'
import type { Validation } from '@/types/Validation'

const float = defineModel({
  required: true,
  type: [Number, null] as PropType<number | null>
})

const props = defineProps<{
  placeholder?: string
  step?: number
  validations?: Validation[]
}>()
</script>

<template>
  <BaseNumberInput
    :parser="parseFloat"
    :placeholder="props.placeholder"
    :step="step"
    :validations="props.validations"
    v-model="float"
  />
</template>

<style scoped></style>
