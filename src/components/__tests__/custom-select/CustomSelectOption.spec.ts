import CustomSelectOption from '@/components/custom-select/CustomSelectOption.vue'
import type { CustomSelectOption as TCustomSelectOption } from '@/types/CustomSelect'
import { faker } from '@faker-js/faker'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi, type Mock } from 'vitest'
import { ref, type Ref } from 'vue'

describe('@/components/custom-select/CustomSelectOption.vue', () => {
  const option: TCustomSelectOption = {
    label: faker.lorem.word(),
    value: faker.lorem.word()
  }
  const selection: Ref<boolean | Date | number | string | null> = ref(null)
  let close: Mock
  let wrapper: VueWrapper

  beforeEach(() => {
    close = vi.fn()
    selection.value = null
    wrapper = shallowMount(CustomSelectOption, {
      props: {
        close: close,
        modelValue: selection.value,
        'onUpdate:modelValue': (e: any): void => {
          selection.value = e
        },
        option: option
      }
    })
  })

  test('setSelection sets value and uses props.close', () => {
    const mockSelection: string = faker.lorem.word()
    wrapper.vm.setSelection(mockSelection)
    expect(selection.value).toBe(mockSelection)
    expect(close).toHaveBeenCalledOnce()
  })

  test('setSelection is called when option div is clicked', async () => {
    const spy = vi.spyOn(wrapper.vm, 'setSelection')
    const optionDiv = wrapper.get('[data-test="option"]')
    await optionDiv.trigger('click')
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(option.value)
  })
})
