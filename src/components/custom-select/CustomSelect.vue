<script setup lang="ts">
import CustomSelectOptions from './CustomSelectOptions.vue'
import CustomSelectToggler from './CustomSelectToggler.vue'
import { ref, type Ref } from 'vue';
import type { CustomSelectOption } from '@/types/CustomSelect';

const selection = defineModel<boolean | Date | number | string | null>({
  required: true
})

const props = withDefaults(defineProps<{
  options: CustomSelectOption[]
  searchable?: boolean
  title?: string
}>(), {
  searchable: false
})

const isOpen: Ref<boolean> = ref(false)

const close = (): void => {
  isOpen.value = false
}

const open = (): void => {
  isOpen.value = true
}
</script>

<template>
  <div class="select">
    <CustomSelectToggler
      :close="close"
      :is-open="isOpen"
      :open="open"
      :options="props.options"
      :selection="selection"
      :title="props.title"
    />
    <CustomSelectOptions
      :close="close"
      :options="props.options"
      :searchable="props.searchable"
      data-test="options"
      v-model="selection"
      v-if="isOpen"
    />
  </div>
</template>

<style scoped>
.select {
  border: 1px solid var(--c-grey);
  border-radius: 2px;
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  height: 32px;
  width: 100%;
}
</style>