<script setup lang="ts">
import FaCheckIcon from '@/components/icons/fa/FaCheckIcon.vue'
import FaTimesIcon from '@/components/icons/fa/FaTimesIcon.vue'
import { computed, type ComputedRef } from 'vue'
import type { Validation } from '@/types/Validation'

const props = defineProps<{
  input: any
  validation: Validation
}>()

const explanation: ComputedRef<string> = computed((): string => {
  return props.validation.explanation
})

const isValid: ComputedRef<boolean> = computed((): boolean => {
  return props.validation.validator(props.input)
})

const validationClass: ComputedRef<'valid' | 'invalid'> = computed((): 'valid' | 'invalid' => {
  return isValid.value ? 'valid' : 'invalid'
})
</script>

<template>
  <div class="validation-tooltip-content-item">
    <FaCheckIcon color="green" data-test="valid" v-if="isValid" />
    <FaTimesIcon color="red" data-test="invalid" v-else />
    <div class="explanation" data-test="explanation" :class="validationClass">
      {{ explanation }}
    </div>
  </div>
</template>

<style scoped>
.validation-tooltip-content-item {
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
