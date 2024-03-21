import CustomTooltipBalloon from '@/components/custom-tooltip/CustomTooltipBalloon.vue'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, test } from 'vitest'

describe('@/components/custom-tooltip/CustomTooltipBalloon.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(CustomTooltipBalloon, {
      props: {
        attribute: 'height',
        isPositive: true,
        isVertical: false,
        position: 'top',
        togglerSize: 10
      },
      slots: {
        content: 'Hello, World!'
      }
    })
  })

  test('checks slot', () => {
    const expected: string = 'Hello, World!'
    expect(wrapper.html()).toContain(expected)
  })

  test('checks axis when isVertical is true', async () => {
    const isVertical: boolean = true
    await wrapper.setProps({
      isVertical: isVertical
    })
    const expected: string = 'Y'
    expect(wrapper.vm.axis).toBe(expected)
  })

  test('checks axis when isVertical is false', async () => {
    const isVertical: boolean = false
    await wrapper.setProps({
      isVertical: isVertical
    })
    const expected: string = 'X'
    expect(wrapper.vm.axis).toBe(expected)
  })

  test('checks balloonFlexDirection when isVertical and isPositive are true', async () => {
    const isPositive: boolean = true
    const isVertical: boolean = true
    await wrapper.setProps({
      isPositive: isPositive,
      isVertical: isVertical
    })
    const expected: string = 'column'
    expect(wrapper.vm.balloonFlexDirection).toBe(expected)
  })

  test('checks balloonFlexDirection when isVertical is true but isPositive is false', async () => {
    const isPositive: boolean = false
    const isVertical: boolean = true
    await wrapper.setProps({
      isPositive: isPositive,
      isVertical: isVertical
    })
    const expected: string = 'column-reverse'
    expect(wrapper.vm.balloonFlexDirection).toBe(expected)
  })

  test('checks balloonFlexDirection when isVertical and isPositive are false', async () => {
    const isPositive: boolean = false
    const isVertical: boolean = false
    await wrapper.setProps({
      isPositive: isPositive,
      isVertical: isVertical
    })
    const expected: string = 'row-reverse'
    expect(wrapper.vm.balloonFlexDirection).toBe(expected)
  })

  test('checks balloonFlexDirection when isVertical is false but isPositive is true', async () => {
    const isPositive: boolean = true
    const isVertical: boolean = false
    await wrapper.setProps({
      isPositive: isPositive,
      isVertical: isVertical
    })
    const expected: string = 'row'
    expect(wrapper.vm.balloonFlexDirection).toBe(expected)
  })

  test('checks balloonSize when balloon ref is null', async () => {
    wrapper.vm.balloon = null
    const expected: number = 0
    expect(wrapper.vm.balloonSize).toBe(expected)
  })

  test('checks balloonSize when balloon ref is not null', async () => {
    await wrapper.setProps({
      attribute: 'height'
    })
    wrapper.vm.balloon = {
      getBoundingClientRect: () => {
        return {
          height: 10
        }
      }
    }
    const expected: number = 5
    expect(wrapper.vm.balloonSize).toBe(expected)
  })

  test('checks multiplier when isPositive is true', async () => {
    await wrapper.setProps({
      isPositive: true
    })
    const expected: number = 1
    expect(wrapper.vm.multiplier).toBe(expected)
  })

  test('checks multiplier when isPositive is false', async () => {
    await wrapper.setProps({
      isPositive: false
    })
    const expected: number = -1
    expect(wrapper.vm.multiplier).toBe(expected)
  })
})
