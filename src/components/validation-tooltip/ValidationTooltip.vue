<script setup lang="ts">
import ValidationTooltipToggler from './ValidationTooltipToggler.vue'
import ValidationTooltipContent from './ValidationTooltipContent.vue'
import CustomTooltip from '@/components/custom-tooltip/CustomTooltip.vue'
import type { Validation } from '@/types/Validation'

const props = defineProps<{
  input: any
  validations: Validation[]
  position?: 'bottom' | 'left' | 'right' | 'top'
}>()
</script>

<template>
  <CustomTooltip :position="props.position">
    <template #toggler>
      <ValidationTooltipToggler :input="props.input" :validations="props.validations" />
    </template>
    <template #content>
      <ValidationTooltipContent :input="props.input" :validations="props.validations" />
    </template>
  </CustomTooltip>
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
