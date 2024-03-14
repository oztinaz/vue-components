<script setup lang="ts">
const time = defineModel({
  required: true,
  type: String
})

const props = defineProps<{
  inputClass: string
  placeholder?: string
}>()
</script>

<template>
  <input type="time" :class="inputClass" :placeholder="props.placeholder" v-model="time" />
</template>

<style scoped></style>
