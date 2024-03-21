<script setup lang="ts">
import BaseImage from './BaseImage.vue'
import ImageUpload from './ImageUpload.vue'
import { ref, type Ref } from 'vue'

const src = defineModel<string>({
  required: true
})

const props = withDefaults(
  defineProps<{
    height: number
    width: number
    alt?: string
    borderColor?: string
    borderRadiusSize?: number
    borderSize?: number
    updatable?: boolean
    title?: string
  }>(),
  {
    alt: 'Custom Select',
    updatable: false
  }
)

const isImageUploadOpen: Ref<boolean> = ref(false)

const closeImageUpload = (): void => {
  isImageUploadOpen.value = false
}

const openImageUpload = (): void => {
  isImageUploadOpen.value = true
}
</script>

<template>
  <div
    class="custom-image"
    data-test="custom-image"
    @mouseenter="openImageUpload()"
    @mouseleave="closeImageUpload()"
  >
    <ImageUpload
      :height="props.height"
      :is-open="isImageUploadOpen"
      data-test="image-upload"
      v-model="src"
      v-if="props.updatable"
    />
    <BaseImage
      :alt="props.alt"
      :border-color="props.borderColor"
      :border-radius-size="props.borderRadiusSize"
      :border-size="props.borderSize"
      :height="props.height"
      :src="src"
      :title="props.title"
      :width="props.width"
    />
  </div>
</template>

<style scoped>
.custom-image {
  box-sizing: 'border-box';
  display: inline-block;
  position: relative;
}
</style>
