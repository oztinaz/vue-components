import BaseFaIcon from '@/components/icons/fa/BaseFaIcon.vue'
import { faker } from '@faker-js/faker'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, test } from 'vitest'

describe('@/components/icons/fa/BaseFaIcon', () => {
  const iconClass: string = faker.lorem.word()
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(BaseFaIcon, {
      props: {
        iconClass: iconClass
      }
    })
  })

  test('checks color', () => {
    expect(wrapper.vm.color).toBe('var(--c-black)')
  })

  test('checks fontSize', () => {
    expect(wrapper.vm.fontSize).toBe('15px')
  })

  test('checks iconClass', () => {
    expect(wrapper.vm.iconClass).toBe(`fa-solid fa-${iconClass}`)
  })

  test('checks iconStyle', () => {
    expect(wrapper.vm.iconStyle).toStrictEqual({
      color: 'var(--c-black)',
      fontSize: '15px'
    })
  })
})
