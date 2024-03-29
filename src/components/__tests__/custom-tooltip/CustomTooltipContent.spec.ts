import CustomTooltipContent from '@/components/custom-tooltip/CustomTooltipContent.vue'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test } from 'vitest'

describe('@/components/custom-tooltip/CustomTooltipContent.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(CustomTooltipContent, {
      slots: {
        default: 'Hello, World!'
      }
    })
  })

  test('checks slot', () => {
    const expected: string = 'Hello, World!'
    expect(wrapper.html()).toContain(expected)
  })
})
