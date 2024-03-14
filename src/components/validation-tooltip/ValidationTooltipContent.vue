<script setup lang="ts">
import ValidationTooltipContentItem from './ValidationTooltipContentItem.vue'
import type { Validation } from '@/types/Validation'

const props = defineProps<{
  input: any
  validations: Validation[]
}>()
</script>

<template>
  <div class="validation-tooltip-content">
    <ValidationTooltipContentItem
      v-for="validation in props.validations"
      :key="validation.explanation"
      :input="props.input"
      :validation="validation"
      data-test="validation"
    />
  </div>
</template>

<style scoped>
.validation-tooltip-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
