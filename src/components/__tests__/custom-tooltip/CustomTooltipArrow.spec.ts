import CustomTooltipArrow from '@/components/custom-tooltip/CustomTooltipArrow.vue'
import { beforeEach, describe, expect, test } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import type { StyleValue } from 'vue'

describe('@/components/custom-tooltip/CustomTooltipArrow.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(CustomTooltipArrow, {
      props: {
        position: 'top'
      }
    })
  })

  test('checks borderColorProperty', () => {
    const expected: string = 'borderTopColor'
    expect(wrapper.vm.borderColorProperty).toBe(expected)
  })

  test('checks arrowStyle', () => {
    const expected: StyleValue = {
      borderTopColor: 'var(--c-grey)'
    }
    expect(wrapper.vm.arrowStyle).toStrictEqual(expected)
  })
})
