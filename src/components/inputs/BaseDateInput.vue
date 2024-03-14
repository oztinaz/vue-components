<script setup lang="ts">
import { computed, ref, type PropType, type Ref, type ComputedRef, watch } from 'vue'

const date = defineModel({
  required: true,
  type: [Date, null] as PropType<Date | null>
})

const props = defineProps<{
  inputClass: string
  placeholder?: string
}>()

const dateString: Ref<string> = ref(date.value !== null ? date.value.toISOString() : '')

const properDate: ComputedRef<Date | null> = computed((): Date | null => {
  return dateString.value === '' ? null : new Date(dateString.value)
})

const setDate = (d: Date | null): void => {
  date.value = d
}

watch(properDate, () => {
  setDate(properDate.value)
})

watch(date, () => {
  if (date.value === null) {
    dateString.value = ''
  }
})
</script>

<template>
  <input
    type="date"
    :class="props.inputClass"
    :placeholder="props.placeholder"
    v-model="dateString"
  />
</template>

<style scoped></style>
