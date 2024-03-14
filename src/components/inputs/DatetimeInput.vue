<script setup lang="ts">
import BaseDateInput from './BaseDateInput.vue'
import BaseInput from './BaseInput.vue'
import BaseTimeInput from './BaseTimeInput.vue'
import { ref, watch, type PropType, type Ref } from 'vue'
import type { Validation } from '@/types/Validation'

const datetime = defineModel({
  required: true,
  type: [Date, null] as PropType<Date | null>
})

const props = defineProps<{
  placeholder?: string
  validations?: Validation[]
}>()

const inputClass: Ref<string> = ref('')

const date: Ref<Date | null> = ref(datetime.value ?? null)

const time: Ref<string> = ref(
  datetime.value ? `${datetime.value.getHours()}:${datetime.value.getMinutes()}` : ''
)

const seperateTime = (time: string): number[] => {
  return time.split(':').map((str: string): number => parseInt(str))
}

const createDatetime = (date: Date, time: string): Date => {
  const timeParts: number[] = seperateTime(time)
  const datetime: Date = date
  datetime.setHours(timeParts[0])
  datetime.setMinutes(timeParts[1])
  return datetime
}

const setDatetime = (dt: Date | null): void => {
  datetime.value = dt
}

watch([date, time], () => {
  if (date.value !== null && time.value !== '') {
    setDatetime(createDatetime(date.value, time.value))
  } else {
    setDatetime(null)
  }
})
</script>

<template>
  <BaseInput :input="datetime" :validations="props.validations" v-model:input-class="inputClass">
    <BaseDateInput
      :input-class="inputClass"
      :placeholder="props.placeholder"
      :validations="props.validations"
      v-model="date"
    />
    <BaseTimeInput
      :input-class="inputClass"
      :placeholder="props.placeholder"
      :validations="props.validations"
      v-model="time"
    />
  </BaseInput>
</template>

<style scoped></style>
