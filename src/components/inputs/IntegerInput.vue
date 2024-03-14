<script setup lang="ts">
import BaseNumberInput from './BaseNumberInput.vue'
import { ref, type PropType, type Ref } from 'vue'
import type { Validation } from '@/types/Validation'

const integer = defineModel({
  required: true,
  type: [Number, null] as PropType<number | null>
})

const props = defineProps<{
  placeholder?: string
  validations?: Validation[]
}>()

const step: Ref<number> = ref(1)
</script>

<template>
  <BaseNumberInput
    :parser="parseInt"
    :placeholder="props.placeholder"
    :step="step"
    :validations="props.validations"
    v-model="integer"
  />
</template>

<style scoped></style>
