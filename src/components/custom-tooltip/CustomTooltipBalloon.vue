<script setup lang="ts">
import CustomTooltipArrow from './CustomTooltipArrow.vue'
import CustomTooltipContent from './CustomTooltipContent.vue'
import { computed, ref, type ComputedRef, type Ref, type StyleValue } from 'vue'

type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse'

const props = defineProps<{
  attribute: 'height' | 'width'
  isPositive: boolean
  isVertical: boolean
  position: 'bottom' | 'left' | 'right' | 'top'
  togglerSize: number
}>()

const balloon: Ref<HTMLElement | null> = ref(null)

const axis: ComputedRef<'X' | 'Y'> = computed((): 'X' | 'Y' => {
  return props.isVertical ? 'Y' : 'X'
})

const balloonFlexDirection: ComputedRef<FlexDirection> = computed((): FlexDirection => {
  const direction: 'column' | 'row' = props.isVertical ? 'column' : 'row'
  if (props.isPositive) {
    return direction
  }
  return `${direction}-reverse`
})

const balloonSize: ComputedRef<number> = computed((): number => {
  if (balloon.value) {
    return balloon.value.getBoundingClientRect()[props.attribute] / 2
  }
  return 0
})

const multiplier: ComputedRef<1 | -1> = computed((): 1 | -1 => {
  return props.isPositive ? 1 : -1
})

const balloonStyle: ComputedRef<StyleValue> = computed((): StyleValue => {
  return {
    transform: makeTransformValue(
      axis.value,
      multiplier.value,
      balloonSize.value,
      props.togglerSize
    ),
    flexDirection: balloonFlexDirection.value
  }
})

const makeTransformValue = (
  axis: 'X' | 'Y',
  multiplier: 1 | -1,
  balloonSize: number,
  togglerSize: number
): string => {
  const result: number = multiplier * (balloonSize + togglerSize + 5)
  return `translate${axis}(${result}px)`
}
</script>

<template>
  <div class="balloon" ref="balloon" :style="balloonStyle">
    <CustomTooltipArrow :position="props.position" />
    <CustomTooltipContent>
      <slot name="content"></slot>
    </CustomTooltipContent>
  </div>
</template>

<style scoped>
.balloon {
  align-items: center;
  display: flex;
  position: absolute;
  z-index: 1000;
}
</style>
