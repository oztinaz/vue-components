import BaseDateInput from '@/components/inputs/BaseDateInput.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { ref, type Ref } from 'vue'

describe('@/components/inputs/BaseDateInput.vue', () => {
  const date: Ref<Date | null> = ref(null)
  const inputClass: Ref<string> = ref('')
  let wrapper: VueWrapper

  afterEach(() => {
    date.value = null
  })

  beforeEach(() => {
    wrapper = mount(BaseDateInput, {
      props: {
        inputClass: inputClass.value,
        'onUpdate:inputClass': (e: string) => {
          inputClass.value = e
        },
        modelValue: date.value,
        'onUpdate:modelValue': (e: Date | null) => {
          date.value = e
        }
      }
    })
  })

  test('checks setDate', () => {
    const expected: Date = new Date()
    wrapper.vm.setDate(expected)
    expect(date.value).toBe(expected)
  })

  test('properDate is null when dateString is empty', () => {
    wrapper.vm.dateString = ''
    expect(wrapper.vm.properDate).toBe(null)
  })

  test('properDate is the date generated from dateString when it is not empty', async () => {
    const dateString: string = '2024-02-29'
    wrapper.vm.dateString = dateString
    expect(wrapper.vm.properDate).toStrictEqual(new Date(dateString))
  })

  test('dateString is an empty string initially when model date is null', () => {
    expect(wrapper.vm.dateString).toBe('')
  })
})
