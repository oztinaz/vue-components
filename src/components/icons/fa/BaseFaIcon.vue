<script setup lang="ts">
import { computed, type ComputedRef, type StyleValue } from 'vue'

const props = withDefaults(
  defineProps<{
    iconClass: string
    color?: string
    fontSize?: number
  }>(),
  {
    color: 'black',
    fontSize: 15
  }
)

const color: ComputedRef<string> = computed((): string => {
  return `var(--c-${props.color})`
})

const fontSize: ComputedRef<string> = computed((): string => {
  return `${props.fontSize}px`
})

const iconClass: ComputedRef<string> = computed((): string => {
  return `fa-solid fa-${props.iconClass}`
})

const iconStyle: ComputedRef<StyleValue> = computed((): StyleValue => {
  return {
    color: color.value,
    fontSize: fontSize.value
  }
})
</script>

<template>
  <i :class="iconClass" :style="iconStyle"></i>
</template>

<style scoped></style>
