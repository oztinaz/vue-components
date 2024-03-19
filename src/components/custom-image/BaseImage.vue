<script setup lang="ts">
import { computed, type ComputedRef, type StyleValue } from 'vue';

const props =  withDefaults(defineProps<{
  alt: string
  height: number
  src: string
  width: number
  borderColor?: string
  borderRadiusSize?: number
  borderSize?: number
  title?: string
}>(), {
  borderColor: 'var(--c-grey)'
})

const style: ComputedRef<StyleValue> = computed((): StyleValue => {
  const style: StyleValue = {}

  if (props.borderSize) {
    style.border = `${props.borderSize}px solid ${props.borderColor}`
    if (props.borderRadiusSize) {
      style.borderRadius = `${props.borderRadiusSize}px`
    }
  }

  return style
})

const title: ComputedRef<string> = computed((): string => {
  return props.title === undefined ? props.src : props.title
})
</script>

<template>
  <img
    :alt="props.alt"
    :height="props.height"
    :width="props.height"
    :src="props.src"
    :style="style"
    :title="title"
  />
</template>

<style scoped>
img {
  display: block;
}
</style>