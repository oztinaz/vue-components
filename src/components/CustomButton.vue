<script setup lang="ts">
import LoadingImage from '@/components/LoadingImage.vue';
import { computed, type ComputedRef, type StyleValue } from 'vue';

const props = withDefaults(defineProps<{
  color?: 'blue' | 'green' | 'grey' | 'red'
  disabled?: boolean
  loading?: boolean
  size?: 'big' | 'normal' | 'small'
}>(), {
  color: 'grey',
  disabled: false,
  loading: false,
  size: 'normal'
})

const isDisabled: ComputedRef<boolean> = computed((): boolean => {
  return props.disabled || props.loading
})

const loadingSize: ComputedRef<number> = computed((): number => {
  if (props.size === 'big') {
    return 28
  } else if (props.size === 'normal') {
    return 20
  }
  return 12
})

const style: ComputedRef<StyleValue> = computed((): StyleValue => {
  return {
    '--c-main': `var(--c-${props.color})`,
    '--c-hover': `var(--c-light-${props.color})`,
    '--c-active': `var(--c-dark-${props.color})`
  }
})
</script>

<template>
  <button :class="props.size" :disabled="isDisabled" :style="style">
    <LoadingImage :height="loadingSize" :width="loadingSize" data-test="loading" v-if="props.loading" />
    <span data-test="span" v-else>
      <slot></slot>
    </span>    
  </button>
</template>

<style scoped>
button {
  --c-main: '';
  --c-hover: '';
  --c-active: '';
}

button {
  align-items: center;
  background: var(--c-main);
  border: none;
  border-radius: 2px;
  color: white;
  display: flex;
  justify-content: center;
  outline: none;
  width: 100%;
}

button[disabled] {
  opacity: 60%;
  cursor: not-allowed;
}

button:not([disabled]):hover {
  background: var(--c-hover);
  cursor: pointer;
}

button:not([disabled]):active {
  background: var(--c-active);
}

.big {
  height: 40px;
}

.normal {
  height: 32px;
}

.small {
  height: 24px;
}
</style>