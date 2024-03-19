<script setup lang="ts">
import CustomImage from '@/components/custom-image/CustomImage.vue'
import { ref, type Ref } from 'vue'

const props = defineProps<{
  height: number
  width: number
}>()

const alt: Ref<string> = ref('Loading')
const src: Ref<string> = ref('/src/assets/loading.gif')
const title: Ref<string> = ref('Loading')
</script>

<template>
  <CustomImage
    :alt="alt"
    :height="props.height"
    :title="title"
    :width="props.width"
    v-model="src"
  />
</template>

<style scoped></style>