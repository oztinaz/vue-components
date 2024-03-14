<script setup lang="ts">
import { computed, type ComputedRef, type StyleValue } from 'vue'
import { StringUtils } from '@/utils/StringUtils'

const props = defineProps<{
  position: 'bottom' | 'left' | 'right' | 'top'
}>()

const borderColorProperty: ComputedRef<string> = computed((): string => {
  return `border${StringUtils.firstLetterUpperCase(props.position)}Color`
})

const arrowStyle: ComputedRef<StyleValue> = computed((): StyleValue => {
  return {
    [borderColorProperty.value]: 'var(--c-grey)'
  }
})
</script>

<template>
  <div class="arrow" :style="arrowStyle"></div>
</template>

<style scoped>
.arrow {
  border: 5px solid transparent;
}
</style>
