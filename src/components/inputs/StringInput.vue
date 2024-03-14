<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import { ref, type Ref } from 'vue'
import type { Validation } from '@/types/Validation'

const input = defineModel({
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
  <BaseInput :input="input" :validations="props.validations" v-model:input-class="inputClass">
    <input type="text" :class="inputClass" :placeholder="props.placeholder" v-model="input" />
  </BaseInput>
</template>

<style scoped></style>
