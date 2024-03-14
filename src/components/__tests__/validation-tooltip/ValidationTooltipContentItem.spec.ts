import ValidationTooltipContentItem from '@/components/validation-tooltip/ValidationTooltipContentItem.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import type { Validation } from '@/types/Validation'

describe('@/components/validation-tooltip/ValidationTooltipContentItem', () => {
  let wrapper: VueWrapper
  const input: string = faker.lorem.word()
  const validation: Validation = {
    explanation: faker.lorem.sentence(),
    validator: () => {
      return true
    }
  }
  beforeEach(() => {
    wrapper = mount(ValidationTooltipContentItem, {
      props: {
        input: input,
        validation: validation
      }
    })
  })

  test('validationClass is valid when isValid is true', async () => {
    expect(wrapper.vm.isValid).toBeTruthy()
  })

  test('validationClass is invalid when isValid is false', async () => {
    await wrapper.setProps({
      validation: {
        explanation: faker.lorem.sentence(),
        validator: (): boolean => {
          return false
        }
      }
    })
    expect(wrapper.vm.isValid).toBeFalsy()
  })

  test('displays FaCheckIcon not FaTimesIcon when isValid is true', async () => {
    const faCheckIcon = wrapper.find('[data-test="valid"]')
    const faTimesIcon = wrapper.find('[data-test="invalid"]')
    expect(faCheckIcon.exists()).toBeTruthy()
    expect(faTimesIcon.exists()).toBeFalsy()
  })

  test('displays FaTimesIcon not FaCheckIcon when isValid is false', async () => {
    await wrapper.setProps({
      validation: {
        explanation: faker.lorem.sentence(),
        validator: (): boolean => {
          return false
        }
      }
    })
    const faCheckIcon = wrapper.find('[data-test="valid"]')
    const faTimesIcon = wrapper.find('[data-test="invalid"]')
    expect(faCheckIcon.exists()).toBeFalsy()
    expect(faTimesIcon.exists()).toBeTruthy()
  })
})
