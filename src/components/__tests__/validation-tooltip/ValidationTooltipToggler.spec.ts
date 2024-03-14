import ValidationTooltipToggler from '@/components/validation-tooltip/ValidationTooltipToggler.vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, test } from 'vitest'
import { faker } from '@faker-js/faker'
import type { Validation } from '@/types/Validation'

describe('@/components/validation-tooltip/ValidationTooltipToggler', () => {
  let wrapper: VueWrapper
  const input: string = faker.lorem.word()
  const validations: Validation[] = []

  beforeEach(() => {
    wrapper = mount(ValidationTooltipToggler, {
      props: {
        input: input,
        validations: validations
      }
    })
  })

  test('allValidationsAreValid is true when all validations are true', async () => {
    await wrapper.setProps({
      validations: [
        {
          explanation: faker.lorem.sentence(),
          validator: (): boolean => {
            return true
          }
        }
      ]
    })
    expect(wrapper.vm.allValidationsAreValid).toBeTruthy()
  })

  test('allValidationsAreValid is false when a validation is false', async () => {
    await wrapper.setProps({
      validations: [
        {
          explanation: faker.lorem.sentence(),
          validator: (): boolean => {
            return false
          }
        }
      ]
    })
    expect(wrapper.vm.allValidationsAreValid).toBeFalsy()
  })

  test('togglerColor is green when a allValidationsAreValid is true', async () => {
    await wrapper.setProps({
      validations: [
        {
          explanation: faker.lorem.sentence(),
          validator: (): boolean => {
            return true
          }
        }
      ]
    })
    expect(wrapper.vm.togglerColor).toBe('green')
  })

  test('togglerColor is red when a allValidationsAreValid is false', async () => {
    await wrapper.setProps({
      validations: [
        {
          explanation: faker.lorem.sentence(),
          validator: (): boolean => {
            return false
          }
        }
      ]
    })
    expect(wrapper.vm.togglerColor).toBe('red')
  })
})
