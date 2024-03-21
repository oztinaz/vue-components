import BaseNumberInput from '@/components/inputs/BaseNumberInput.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ref, type Ref } from 'vue'

describe('@/components/inputs/BaseNumberInput.vue', () => {
  const number: Ref<number | null> = ref(null)
  let wrapper: VueWrapper

  afterEach(() => {
    number.value = null
  })

  beforeEach(() => {
    wrapper = mount(BaseNumberInput, {
      props: {
        modelValue: number.value,
        'onUpdate:modelValue': (e: number | null) => {
          number.value = e
        },
        parser: vi.fn()
      }
    })
  })

  test('checks setNumber', () => {
    const expected: number = 5
    wrapper.vm.setNumber(expected)
    expect(number.value).toBe(expected)
  })

  test('properNumber is null when numberString is empty', () => {
    wrapper.vm.numberString = ''
    expect(wrapper.vm.properNumber).toBe(null)
  })

  test('properNumber is the number that parser returns', async () => {
    await wrapper.setProps({
      parser: parseInt
    })
    wrapper.vm.numberString = '5'
    expect(wrapper.vm.properNumber).toBe(5)
  })

  test('numberString is an empty string initially when model number is null', () => {
    expect(wrapper.vm.numberString).toBe('')
  })
})
