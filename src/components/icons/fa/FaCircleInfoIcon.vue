<script setup lang="ts">
import BaseFaIcon from './BaseFaIcon.vue'
import { ref, type Ref } from 'vue'

const props = defineProps<{
  color?: string
  fontSize?: number
}>()

const iconClass: Ref<string> = ref('circle-info')
</script>

<template>
  <BaseFaIcon :icon-class="iconClass" :color="props.color" :font-size="props.fontSize" />
</template>

<style scoped></style>
