<script setup lang="ts">
import { computed, onMounted, ref, watch, type ComputedRef, type Ref } from 'vue'

const isOpen = defineModel('isOpen', {
  required: true,
  type: Boolean
})

const size = defineModel('size', {
  required: true,
  type: Number
})

const props = defineProps<{
  attribute: 'height' | 'width'
}>()

const toggler: Ref<HTMLElement | null> = ref(null)

const togglerSize: ComputedRef<number> = computed((): number => {
  if (toggler.value) {
    return toggler.value.getBoundingClientRect()[props.attribute] / 2
  }
  return 0
})

const close = (): void => {
  isOpen.value = false
}

const open = (): void => {
  isOpen.value = true
}

const setSize = (s: number): void => {
  size.value = s
}

watch(togglerSize, () => {
  setSize(togglerSize.value)
})

onMounted(() => {
  if (toggler.value) {
    toggler.value.addEventListener('mouseenter', open)
    toggler.value.addEventListener('mouseleave', close)
  }
})
</script>

<template>
  <div class="toggler" ref="toggler" data-test="toggler">
    <slot></slot>
  </div>
</template>

<style scoped>
.toggler {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: relative;
}
</style>
