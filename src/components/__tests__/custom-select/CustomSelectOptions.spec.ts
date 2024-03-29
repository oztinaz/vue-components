import CustomSelectOptions from '@/components/custom-select/CustomSelectOptions.vue'
import type { CustomSelectOption } from '@/types/CustomSelect'
import { ArrayUtils } from '@/utils/ArrayUtils'
import { faker } from '@faker-js/faker'
import { flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi, type Mock } from 'vitest'
import { ref, type Ref } from 'vue'

describe('@/components/custom-select/CustomSelectOptions.vue', () => {
  const options: CustomSelectOption[] = ArrayUtils.createRange(1).map((): CustomSelectOption => {
    return {
      label: faker.lorem.word(),
      value: faker.lorem.word()
    }
  })
  const selection: Ref<boolean | Date | number | string | null> = ref(null)
  let close: Mock
  let wrapper: VueWrapper

  beforeEach(() => {
    close = vi.fn()
    selection.value = null
    wrapper = shallowMount(CustomSelectOptions, {
      props: {
        close: close,
        modelValue: selection.value,
        'onUpdate:modelValue': (e: any): void => {
          selection.value = e
        },
        options: options,
        searchable: false
      }
    })
  })

  test('CustomSelectOptionSearch is shown when props.searchable is true', async () => {
    await wrapper.setProps({
      searchable: true
    })
    const search = wrapper.find('[data-test="option-search"]')
    expect(search.exists()).toBeTruthy()
  })

  test('CustomSelectOptionSearch not shown when props.searchable is false', () => {
    const search = wrapper.find('[data-test="option-search"]')
    expect(search.exists()).toBeFalsy()
  })

  test('checks options when props.searchable is false', async () => {
    expect(wrapper.vm.options).toStrictEqual(options)
  })

  test('checks options when props.searchable is true and searchQuery is empty', async () => {
    await wrapper.setProps({
      searchable: true
    })
    expect(wrapper.vm.options).toStrictEqual(options)
  })

  test('checks options when props.searchable is true and searchQuery is not empty', async () => {
    await wrapper.setProps({
      options: [
        {
          label: 'a',
          value: 'a'
        },
        {
          label: 'b',
          value: 'b'
        }
      ],
      searchable: true
    })
    wrapper.vm.searchQuery = 'a'
    expect(wrapper.vm.options).toStrictEqual([
      {
        label: 'a',
        value: 'a'
      }
    ])
  })

  test('checks displayed options', async () => {
    await wrapper.setProps({
      options: [
        {
          label: 'a',
          value: 'a'
        },
        {
          label: 'b',
          value: 'b'
        }
      ],
      searchable: true
    })
    wrapper.vm.searchQuery = 'a'
    await flushPromises()
    const optionComponents = wrapper.findAll('[data-test="option"]')
    expect(optionComponents).toHaveLength(1)
  })
})
