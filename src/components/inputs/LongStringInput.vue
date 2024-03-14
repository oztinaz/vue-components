<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import { ref, type Ref } from 'vue'
import type { Validation } from '@/types/Validation'

const string = defineModel({
  required: true,
  type: String
})

const props = defineProps<{
  placeholder?: string
  validations?: Validation[]
}>()

const inputClass: Ref<string> = ref('')
</script>

<template>
  <BaseInput :input="string" :validations="props.validations" v-model:input-class="inputClass">
    <textarea :class="inputClass" :placeholder="props.placeholder" v-model="string"> </textarea>
  </BaseInput>
</template>

<style scoped>
textarea {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
