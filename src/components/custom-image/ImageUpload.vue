<script setup lang="ts">
import FaCameraIcon from '@/components/icons/fa/FaCameraIcon.vue'
import { computed, type ComputedRef } from 'vue'

const src = defineModel<string>({
  required: true
})

const props = defineProps<{
  height: number
  isOpen: boolean
}>()

const imageUploadIconSize: ComputedRef<number> = computed((): number => {
  return props.height / 10
})

// TODO: add type
const upload = (e) => {
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    src.value = fileReader.result?.toString() as string
  })
  fileReader.readAsDataURL(e.target.files[0])
}
</script>

<template>
  <div
    class="image-upload-container"
    data-test="image-upload-container"
    @change="upload"
    v-if="props.isOpen"
  >
    <label for="image-upload">
      <FaCameraIcon :font-size="imageUploadIconSize" />
      Choose an image
    </label>
    <input id="image-upload" type="file" />
  </div>
</template>

<style scoped>
@keyframes image-upload-open {
  from {
    opacity: 0;
  }
  to {
    opacity: 85%;
  }
}

.image-upload-container {
  animation-duration: 0.5s;
  animation-name: image-upload-open;
  background: var(--c-extra-light-blue);
  box-sizing: 'border-box';
  bottom: 0;
  height: 100%;
  opacity: 85%;
  position: absolute;
  width: 100%;
  z-index: 1;
}

label {
  align-items: center;
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 5px;
  height: 100%;
  justify-content: center;
  width: 100%;
}

input {
  display: none;
}
</style>
