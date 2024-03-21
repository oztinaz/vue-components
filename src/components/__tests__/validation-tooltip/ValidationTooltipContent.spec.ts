import ValidationTooltipContent from '@/components/validation-tooltip/ValidationTooltipContent.vue'
import type { Validation } from '@/types/Validation'
import { ArrayUtils } from '@/utils/ArrayUtils'
import { faker } from '@faker-js/faker'
import { mount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, test } from 'vitest'

describe('@/components/validation-tooltip/ValidationTooltipContent', () => {
  let wrapper: VueWrapper
  const input: string = faker.lorem.word()
  const validations: Validation[] = ArrayUtils.createRange(5).map((): Validation => {
    return {
      explanation: faker.lorem.sentence(),
      validator: (): boolean => {
        return true
      }
    }
  })

  beforeEach(() => {
    wrapper = mount(ValidationTooltipContent, {
      props: {
        input: input,
        validations: validations
      }
    })
  })

  test('checks validations counts', () => {
    const validations = wrapper.findAll('[data-test="validation"]')
    expect(validations).toHaveLength(5)
  })
})
