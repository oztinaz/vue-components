import CustomSelectToggler from '@/components/custom-select/CustomSelectToggler.vue'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import type { CustomSelectOption } from '@/types/CustomSelect'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { ArrayUtils } from '@/utils/ArrayUtils'
import { faker } from '@faker-js/faker'

describe('@/components/custom-select/CustomSelectToggler.vue', () => {
  const close = vi.fn()
  const open = vi.fn()
  const options: CustomSelectOption[] = ArrayUtils.createRange(1).map(() => {
    return {
      label: faker.lorem.word(),
      value: faker.lorem.word()
    }
  })
  const selection: boolean | Date | number | string | null = null
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(CustomSelectToggler, {
      props: {
        close: close,
        isOpen: false,
        open: open,
        options: options,
        selection: selection
      }
    })
  })

  test("className is 'toggler open' when isOpen is true", async () => {
    await wrapper.setProps({
      isOpen: true
    })
    expect(wrapper.vm.className).toBe('toggler open')
  })

  test("className is 'toggler' when isOpen is false", () => {
    expect(wrapper.vm.className).toBe('toggler')
  })

  test("emptySelectionLabel is 'Select' when props.title is undefined", () => {
    expect(wrapper.vm.emptySelectionLabel).toBe('Select')
  })

  test("emptySelectionLabel is 'Select' when props.title is undefined", async () => {
    const title: string = faker.lorem.word()
    await wrapper.setProps({
      title: title
    })
    expect(wrapper.vm.emptySelectionLabel).toBe(`Select ${title}`)
  })

  test('label is equals to emptySelectionLabel value when props.selection is null', () => {
    expect(wrapper.vm.label).toBe(wrapper.vm.emptySelectionLabel)
  })

  test('label is equals to selected option when props.selection is not null', async () => {
    await wrapper.setProps({
      selection: options[0].value
    })
    expect(wrapper.vm.label).toBe(wrapper.vm.options[0].label)
  })

  test('isTitleDefined returns true when parameter title is defined', () => {
    const title: string = faker.lorem.word()
    const result: boolean = wrapper.vm.isTitleDefined(title)
    expect(result).toBeTruthy()
  })

  test('isTitleDefined returns true when parameter title is defined', () => {
    const title: undefined = undefined
    const result: boolean = wrapper.vm.isTitleDefined(title)
    expect(result).toBeFalsy()
  })

  test('close is called once while props.isOpen is true when toggle is called', async () => {
    await wrapper.setProps({
      isOpen: true
    })
    wrapper.vm.toggle()
    expect(close).toHaveBeenCalledOnce()
  })

  test('open is called once while props.isOpen is false when toggle is called', () => {
    wrapper.vm.toggle()
    expect(open).toHaveBeenCalledOnce()
  })

  test('open is called once while props.isOpen is false when toggle is called', async () => {
    const toggler = wrapper.get('[data-test="toggler"]')
    const spy = vi.spyOn(wrapper.vm, 'toggle')
    await toggler.trigger('click')
    expect(spy).toHaveBeenCalledOnce()
  })

  test('CustomSelectTogglerLabelWithTitle is shown when props.title is defined', async () => {
    await wrapper.setProps({
      title: faker.lorem.word()
    })
    await flushPromises()
    const labelWithTitleComponent = wrapper.find('[data-test="label-with-title"]')
    const labelWithoutTitleComponent = wrapper.find('[data-test="label-without-title"]')

    expect(labelWithTitleComponent.exists()).toBeTruthy()
    expect(labelWithoutTitleComponent.exists()).toBeFalsy()
  })

  test('CustomSelectTogglerLabelWithoutTitle is shown when props.title is undefined', () => {
    const labelWithTitleComponent = wrapper.find('[data-test="label-with-title"]')
    const labelWithoutTitleComponent = wrapper.find('[data-test="label-without-title"]')

    expect(labelWithTitleComponent.exists()).toBeFalsy()
    expect(labelWithoutTitleComponent.exists()).toBeTruthy()
  })

  test('FaCaretDownIcon is shown when props.isOpen is true', async () => {
    await wrapper.setProps({
      isOpen: true
    })
    await flushPromises()
    const downIconComponent = wrapper.find('[data-test="down-icon"]')
    const leftIconComponent = wrapper.find('[data-test="left-icon"]')

    expect(downIconComponent.exists()).toBeTruthy()
    expect(leftIconComponent.exists()).toBeFalsy()
  })

  test('FaCaretLeftIcon is shown when props.isOpen is false', () => {
    const downIconComponent = wrapper.find('[data-test="down-icon"]')
    const leftIconComponent = wrapper.find('[data-test="left-icon"]')

    expect(downIconComponent.exists()).toBeFalsy()
    expect(leftIconComponent.exists()).toBeTruthy()
  })
})
