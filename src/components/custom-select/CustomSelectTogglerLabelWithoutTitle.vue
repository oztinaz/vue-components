<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>

<template>
  <div class="label">
    {{ props.label }}
  </div>
</template>

<style scoped>
.label {
  align-items: center;
  display: flex;
  height: 100%;
}
</style>
