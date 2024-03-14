<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import BaseTimeInput from './BaseTimeInput.vue'
import { ref, type Ref } from 'vue'
import type { Validation } from '@/types/Validation'

const time = defineModel({
  required: true,
  type: String
})

const props = defineProps<{
  placeholder?: string
  validations?: Validation[]
}>()

const inputClass: Ref<string> = ref('')
</script>

<template>
  <BaseInput :input="time" :validations="props.validations" v-model:input-class="inputClass">
    <BaseTimeInput :input-class="inputClass" :placeholder="props.placeholder" v-model="time" />
  </BaseInput>
</template>

<style scoped></style>
