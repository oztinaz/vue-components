import BaseInput from '@/components/inputs/BaseInput.vue'
import { beforeEach, describe, expect, test } from 'vitest'
import { ref, type Ref } from 'vue'
import { ArrayUtils } from '@/utils/ArrayUtils'
import { faker } from '@faker-js/faker'
import { mount, type VueWrapper } from '@vue/test-utils'
import type { Validation } from '@/types/Validation'

describe('@/components/inputs/BaseInput.vue', () => {
  const slot: string = 'Hello, World!'
  const inputClass: Ref<string> = ref('')
  const input: any = null
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(BaseInput, {
      props: {
        inputClass: inputClass.value,
        'onUpdate:inputClass': (e: string) => {
          inputClass.value = e
        },
        input: input
      },
      slots: {
        default: slot
      }
    })
  })

  test('inputClassName is input when isValidationEnabled is false', () => {
    expect(inputClass.value).toBe('input')
  })

  test('inputClassName contains valid when isValidationEnabled and isValid are both true', async () => {
    await wrapper.setProps({
      validations: []
    })
    expect(inputClass.value).toContain('valid')
  })

  test('inputClassName contains invalid when isValidationEnabled is true but isValid is false', async () => {
    await wrapper.setProps({
      validations: ArrayUtils.createRange(1).map(() => {
        return {
          explanation: faker.lorem.sentence(),
          validator: (): boolean => {
            return false
          }
        }
      })
    })
    expect(inputClass.value).toContain('invalid')
  })

  test('isValidationEnabled is false when props.validations is undefined', () => {
    expect(wrapper.vm.isValidationEnabled).toBeFalsy()
  })

  test('isValidationEnabled is true when props.validations is defined', async () => {
    await wrapper.setProps({
      validations: []
    })
    expect(wrapper.vm.isValidationEnabled).toBeTruthy()
  })

  test('validations is an empty array when props.validations is undefined', () => {
    expect(wrapper.vm.validations).toStrictEqual([])
  })

  test('validations are equal to props.validations when it is defined', async () => {
    const validations: Validation[] = ArrayUtils.createRange(1).map((): Validation => {
      return {
        explanation: faker.lorem.sentence(),
        validator: (): boolean => true
      }
    })
    await wrapper.setProps({
      validations: validations
    })
    expect(wrapper.vm.validations).toStrictEqual(validations)
  })

  test('isValid is true when all validators return true', async () => {
    const validations: Validation[] = ArrayUtils.createRange(1).map((): Validation => {
      return {
        explanation: faker.lorem.sentence(),
        validator: (): boolean => true
      }
    })
    await wrapper.setProps({
      validations: validations
    })
    expect(wrapper.vm.isValid).toBeTruthy()
  })

  test('isValid is false when a validator returns false', async () => {
    const validations: Validation[] = ArrayUtils.createRange(1).map((): Validation => {
      return {
        explanation: faker.lorem.sentence(),
        validator: (): boolean => false
      }
    })
    await wrapper.setProps({
      validations: validations
    })
    expect(wrapper.vm.isValid).toBeFalsy()
  })

  test('displays slot', () => {
    const field = wrapper.get('[data-test="input-container"]')
    expect(field.text()).toBe(slot)
  })

  test('ValidationTooltip not shown when isValidationEnabled is false', () => {
    const validationTooltipArea = wrapper.find('[data-test="validation-tooltip"]')
    expect(validationTooltipArea.exists()).toBeFalsy()
  })

  test('ValidationTooltip shown when isValidationEnabled is true', async () => {
    await wrapper.setProps({
      validations: []
    })
    const validationTooltipArea = wrapper.find('[data-test="validation-tooltip"]')
    expect(validationTooltipArea.exists()).toBeTruthy()
  })
})
