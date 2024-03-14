<script setup lang="ts">
import FaCircleInfoIcon from '@/components/icons/fa/FaCircleInfoIcon.vue'
import { computed, type ComputedRef } from 'vue'
import type { Validation } from '@/types/Validation'

const props = defineProps<{
  input: any
  validations: Validation[]
}>()

const allValidationsAreValid: ComputedRef<boolean> = computed((): boolean => {
  for (let i = 0; i < props.validations.length; i++) {
    if (!props.validations[i].validator(props.input)) {
      return false
    }
  }
  return true
})

const togglerColor: ComputedRef<'green' | 'red'> = computed((): 'green' | 'red' => {
  return allValidationsAreValid.value ? 'green' : 'red'
})
</script>

<template>
  <FaCircleInfoIcon :color="togglerColor" />
</template>

<style scoped>
.validation {
  align-items: center;
  display: flex;
  gap: 5px;
}

.explanation.valid {
  color: var(--c-green);
}

.explanation.invalid {
  color: var(--c-red);
}
</style>
