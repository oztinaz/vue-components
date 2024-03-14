import DatetimeInput from '@/components/inputs/DatetimeInput.vue'
import { beforeEach, describe, expect, test } from 'vitest'
import { ref, type Ref } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'

describe('@/components/inputs/DatetimeInput.vue', () => {
  const datetime: Ref<Date | null> = ref(null)
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(DatetimeInput, {
      props: {
        modelValue: datetime.value,
        'onUpdate:modelValue': (e: Date | null) => {
          datetime.value = e
        }
      }
    })
  })

  test('date is null initially when datetime is null', () => {
    expect(wrapper.vm.date).toBe(null)
  })

  test('date is initially the value datetime has', async () => {
    const date = new Date()
    wrapper = mount(DatetimeInput, {
      props: {
        modelValue: date
      }
    })
    expect(wrapper.vm.date).toStrictEqual(date)
  })

  test('time is empty string initially when datetime is null', () => {
    expect(wrapper.vm.time).toBe('')
  })

  test('time is initially the value datetime has', async () => {
    const date = new Date()
    wrapper = mount(DatetimeInput, {
      props: {
        modelValue: date
      }
    })
    expect(wrapper.vm.time).toStrictEqual(`${date.getHours()}:${date.getMinutes()}`)
  })
})
