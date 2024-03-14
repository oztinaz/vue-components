import CustomTooltip from '@/components/custom-tooltip/CustomTooltip.vue'
import { beforeEach, describe, expect, test } from 'vitest'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'

describe('@/components/custom-tooltip/CustomTooltip.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(CustomTooltip)
  })

  test('attribute is height when isVertical is true', async () => {
    const expected = 'height'
    await wrapper.setProps({
      position: 'top'
    })
    expect(wrapper.vm.attribute).toBe(expected)
  })

  test('attribute is width when isVertical is false', async () => {
    const expected = 'width'
    await wrapper.setProps({
      position: 'left'
    })
    expect(wrapper.vm.attribute).toBe(expected)
  })

  test('isPositive is true when position is bottom or right', async () => {
    const expected: boolean = true
    await wrapper.setProps({
      position: 'bottom'
    })
    expect(wrapper.vm.isPositive).toBe(expected)
  })

  test('isPositive is false when position is top or left', async () => {
    const expected: boolean = false
    await wrapper.setProps({
      position: 'top'
    })
    expect(wrapper.vm.isPositive).toBe(expected)
  })

  test('isVertical is true when position is top or bottom', async () => {
    const expected: boolean = true
    await wrapper.setProps({
      position: 'top'
    })
    expect(wrapper.vm.isVertical).toBe(expected)
  })

  test('isVertical is false when position is left or right', async () => {
    const expected: boolean = false
    await wrapper.setProps({
      position: 'left'
    })
    expect(wrapper.vm.isVertical).toBe(expected)
  })

  test('balloon not shown when isOpen is false', async () => {
    wrapper.vm.isOpen = false
    await flushPromises()
    const balloon = wrapper.find('[data-test="balloon"]')
    expect(balloon.exists()).toBeFalsy()
  })

  test('balloon shown when isOpen is false', async () => {
    wrapper.vm.isOpen = true
    await flushPromises()
    const balloon = wrapper.find('[data-test="balloon"]')
    expect(balloon.exists()).toBeTruthy()
  })
})
