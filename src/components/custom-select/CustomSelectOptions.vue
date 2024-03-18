<script setup lang="ts">
import CustomSelectOption from './CustomSelectOption.vue'
import CustomSelectOptionSearch from './CustomSelectOptionSearch.vue'
import { ref, type ComputedRef, type Ref, computed } from 'vue'
import type { CustomSelectOption as TCustomSelectOption } from '@/types/CustomSelect'
import { ArrayUtils } from '@/utils/ArrayUtils'

const selection = defineModel<boolean | Date | number | string | null>({
  required: true
})

const props = defineProps<{
  close: Function
  options: TCustomSelectOption[]
  searchable: boolean
}>()

const searchQuery: Ref<string> = ref('')

const filterOptionsBySearchQuery = (option: TCustomSelectOption, query: string): boolean => {
  return option.label.toLowerCase().includes(query.toLowerCase())
}

const options: ComputedRef<TCustomSelectOption[]> = computed((): TCustomSelectOption[] => {
  if (!props.searchable || searchQuery.value === '') {
    return props.options
  }
  return ArrayUtils.has(props.options, filterOptionsBySearchQuery, searchQuery.value)
    ? ArrayUtils.filter(props.options, filterOptionsBySearchQuery, searchQuery.value)
    : []
})
</script>

<template>
  <div class="options">
    <CustomSelectOptionSearch
      data-test="option-search"
      v-model="searchQuery"
      v-if="props.searchable"
    />
    <CustomSelectOption
      :close="props.close"
      :key="option.label"
      :option="option"
      data-test="option"
      v-model="selection"
      v-for="option in options"
    />
  </div>
</template>

<style scoped>
.options {
  border: 1px solid var(--c-grey);
  border-radius: 2px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.19);
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  z-index: 2;
}
</style>
