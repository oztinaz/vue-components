<script setup lang="ts">
import CustomSelectTogglerLabelWithoutTitle from './CustomSelectTogglerLabelWithoutTitle.vue';
import CustomSelectTogglerLabelWithTitle from './CustomSelectTogglerLabelWithTitle.vue';
import FaCaretDownIcon from '@/components/icons/fa/FaCaretDownIcon.vue';
import FaCaretLeftIcon from '@/components/icons/fa/FaCaretLeftIcon.vue';
import { computed, type ComputedRef } from 'vue';
import type { CustomSelectOption } from '@/types/CustomSelect';

const props = defineProps<{
  close: Function
  isOpen: boolean
  open: Function
  options: CustomSelectOption[]
  selection: boolean | Date | number | string | null
  title?: string
}>()

const className: ComputedRef<string> = computed((): string => {
  const cls: string = 'toggler'
  return props.isOpen ? `${cls} open` : cls
})

const emptySelectionLabel: ComputedRef<string> = computed((): string => {
  const label: string = 'Select'
  return props.title === undefined ? label : `${label} ${props.title}`
})

const label: ComputedRef<string> = computed((): string => {
  return props.selection === null ? emptySelectionLabel.value : props.options.filter((option: CustomSelectOption) => option.value === props.selection)[0].label
})

const isTitleDefined = (title: string | undefined): title is string => {
  return title !== undefined
} 

const toggle = (): void => {
  if (props.isOpen) {
    props.close()
    return
  }
  return props.open()
}
</script>

<template>
  <div :class="className" data-test="toggler" @click="toggle()">
    <CustomSelectTogglerLabelWithTitle
      :label="label"
      :title="props.title"
      data-test="label-with-title"
      v-if="isTitleDefined(props.title)"
    />
    <CustomSelectTogglerLabelWithoutTitle
      :label="label"
      data-test="label-without-title"
      v-else
    />
    <FaCaretDownIcon color="grey" data-test="down-icon" v-if="isOpen" />
    <FaCaretLeftIcon color="grey" data-test="left-icon" v-else />
  </div>
</template>

<style scoped>
.toggler {
  align-items: center;
  border-radius: 2px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
}

.toggler.open {
  outline: 2px solid var(--c-blue);
}
</style>