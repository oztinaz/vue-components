import CustomSelect from '@/components/custom-select/CustomSelect.vue'
import type { CustomSelectOption } from '@/types/CustomSelect'
import { ArrayUtils } from '@/utils/ArrayUtils'
import { faker } from '@faker-js/faker'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, test } from 'vitest'
import { ref, type Ref } from 'vue'

describe('@/components/custom-select/CustomSelect.vue', () => {
  const options: CustomSelectOption[] = ArrayUtils.createRange(1).map((): CustomSelectOption => {
    return {
      label: faker.lorem.word(),
      value: faker.lorem.word()
    }
  })
  const selection: Ref<boolean | Date | number | string | null> = ref(null)
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(CustomSelect, {
      props: {
        modelValue: selection.value,
        'onUpdate:modelValue': (e: any): void => {
          selection.value = e
        },
        options: options
      }
    })
  })

  test('close makes isOpen false', () => {
    wrapper.vm.isOpen = true
    expect(wrapper.vm.isOpen).toBeTruthy()
    wrapper.vm.close()
    expect(wrapper.vm.isOpen).toBeFalsy()
  })

  test('open makes isOpen true', () => {
    wrapper.vm.open()
    expect(wrapper.vm.isOpen).toBeTruthy()
  })

  test('options is shown when isOpen is true', async () => {
    wrapper.vm.isOpen = true
    await flushPromises()
    const options = wrapper.find('[data-test="options"]')
    expect(options.exists()).toBeTruthy()
  })

  test('options not shown when isOpen is false', () => {
    wrapper.vm.isOpen = true
    const options = wrapper.find('[data-test="options"]')
    expect(options.exists()).toBeFalsy()
  })
})
