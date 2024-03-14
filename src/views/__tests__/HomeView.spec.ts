import HomeViewVue from '@/views/HomeView.vue'
import { beforeEach, describe, expect, test } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'

describe('@/views/HomeView.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(HomeViewVue)
  })

  test('displays message', () => {
    const div = wrapper.get('[data-test="home"]')
    expect(div.text()).toBe('Home View')
  })
})
