<script setup lang="ts">
import type { CustomSelectOption } from '@/types/CustomSelect'

const selection = defineModel<boolean | Date | number | string | null>()

const props = defineProps<{
  close: Function
  option: CustomSelectOption
}>()

const setSelection = (value: boolean | Date | number | string | null): void => {
  selection.value = value
  props.close()
}
</script>

<template>
  <div class="option" data-test="option" @click="setSelection(props.option.value)">
    {{ props.option.label }}
  </div>
</template>

<style scoped>
.option {
  cursor: pointer;
  padding: 10px;
}

.option:hover {
  background: var(--c-extra-light-grey);
}
</style>
