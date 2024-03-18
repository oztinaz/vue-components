<script setup lang="ts">
const props = defineProps<{
  label: string
  title: string
}>()
</script>

<template>
  <div class="label">
    <div class="title">{{ props.title }}</div>
    <div>
      {{ props.label }}
    </div>
  </div>
</template>

<style scoped>
.label {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

.title {
  color: var(--c-blue);
  font-size: 80%;
}
</style>