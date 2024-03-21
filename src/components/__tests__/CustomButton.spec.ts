import CustomButton from "@/components/CustomButton.vue";
import { beforeEach, describe, expect, test } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import { faker } from "@faker-js/faker";

describe('@/components/CustomButton.vue', () => {
  const slot: string = faker.lorem.word()
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(CustomButton, {
      slots: {
        default: slot
      }
    })
  })

  test('style returns according to props.color', () => {
    expect(wrapper.vm.style).toStrictEqual({
      '--c-main': `var(--c-grey)`,
      '--c-hover': `var(--c-light-grey)`,
      '--c-active': `var(--c-dark-grey)`
    })
  })

  test('checks loadingSize when props.size is big', async () => {
    await wrapper.setProps({
      size: 'big'
    })
    expect(wrapper.vm.loadingSize).toBe(28)
  })

  test('checks loadingSize when props.size is normal', () => {
    expect(wrapper.vm.loadingSize).toBe(20)
  })

  test('checks loadingSize when props.size is small', async () => {
    await wrapper.setProps({
      size: 'small'
    })
    expect(wrapper.vm.loadingSize).toBe(12)
  })

  test('isDisabled is true when props.disabled or props.loading is true', async () => {
    await wrapper.setProps({
      disabled: true
    })
    expect(wrapper.vm.isDisabled).toBeTruthy()
  })

  test('isDisabled is false when props.disabled and props.loading are both false', () => {
    expect(wrapper.vm.isDisabled).toBeFalsy()
  })

  test('LoadingImage is shown when props.loading is true', async () => {
    await wrapper.setProps({
      loading: true
    })
    const loadingImageComponent = wrapper.find('[data-test="loading"]')
    const span = wrapper.find('[data-test="span"]')
    expect(loadingImageComponent.exists()).toBeTruthy()
    expect(span.exists()).toBeFalsy()
  })

  test('LoadingImage is not shown when props.loading is false', () => {
    const loadingImageComponent = wrapper.find('[data-test="loading"]')
    const span = wrapper.find('[data-test="span"]')
    expect(loadingImageComponent.exists()).toBeFalsy()
    expect(span.exists()).toBeTruthy()
  })
})