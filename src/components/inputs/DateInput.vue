<script setup lang="ts">
import BaseDateInput from './BaseDateInput.vue'
import BaseInput from './BaseInput.vue'
import { ref, type PropType, type Ref } from 'vue'
import type { Validation } from '@/types/Validation'

const date = defineModel({
  required: true,
  type: [Date, null] as PropType<Date | null>
})

const props = defineProps<{
  placeholder?: string
  validations?: Validation[]
}>()

const inputClass: Ref<string> = ref('')
</script>

<template>
  <BaseInput :input="date" :validations="props.validations" v-model:input-class="inputClass">
    <BaseDateInput :input-class="inputClass" :placeholder="props.placeholder" v-model="date" />
  </BaseInput>
</template>

<style scoped></style>
