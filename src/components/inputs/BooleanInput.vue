<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import { ref, type Ref } from 'vue'
import type { Validation } from '@/types/Validation'

const boolean = defineModel({
  required: true,
  type: Boolean
})

const props = defineProps<{
  label?: string
  validations?: Validation[]
}>()

const inputClass: Ref<string> = ref('')
</script>

<template>
  <div class="checkbox-container">
    <BaseInput :input="boolean" :validations="props.validations" v-model:input-class="inputClass">
      <input type="checkbox" v-model="boolean" />
    </BaseInput>
    <div class="label" v-if="props.label">
      {{ props.label }}
    </div>
  </div>
</template>

<style scoped>
.checkbox-container {
  align-items: center;
  display: flex;
  gap: 5px;
}

.label {
  align-items: center;
  display: flex;
}

input {
  cursor: pointer;
}
</style>
