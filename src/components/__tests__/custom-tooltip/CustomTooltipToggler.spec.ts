import CustomTooltipToggler from '@/components/custom-tooltip/CustomTooltipToggler.vue'
import { beforeEach, describe, expect, test } from 'vitest'
import { ref, type Ref } from 'vue'
import { shallowMount, type VueWrapper } from '@vue/test-utils'

describe('@/components/custom-tooltip/CustomTooltipToggler.vue', () => {
  let wrapper: VueWrapper
  const isOpen: Ref<boolean> = ref(false)
  const size: Ref<number> = ref(0)

  beforeEach(() => {
    wrapper = shallowMount(CustomTooltipToggler, {
      props: {
        attribute: 'height',
        isOpen: isOpen.value,
        'onUpdate:isOpen': (e: boolean) => {
          isOpen.value = e
        },
        size: size.value,
        'onUpdate:size': (e: number) => {
          size.value = e
        }
      },
      slots: {
        default: '<div>Hello, World!</div>'
      }
    })
  })

  test('updates isOpen when enters and leaves toggler', async () => {
    const toggler = wrapper.get('[data-test="toggler"]')
    await toggler.trigger('mouseenter')
    expect(isOpen.value).toBeTruthy()
    await toggler.trigger('mouseleave')
    expect(isOpen.value).toBeFalsy()
  })

  test('checks setSize', () => {
    const given: number = 10
    wrapper.vm.setSize(given)
    expect(size.value).toBe(given)
  })

  test('close makes isOpen false', () => {
    wrapper.setValue({
      isOpen: true
    })
    wrapper.vm.close()
    expect(isOpen.value).toBeFalsy()
  })

  test('open makes isOpen true', () => {
    wrapper.setValue({
      isOpen: false
    })
    wrapper.vm.open()
    expect(isOpen.value).toBeTruthy()
  })
})
