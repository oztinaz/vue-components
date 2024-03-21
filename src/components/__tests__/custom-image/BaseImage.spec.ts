import BaseImage from '@/components/custom-image/BaseImage.vue'
import { faker } from '@faker-js/faker'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, test } from 'vitest'

describe('@/components/custom-image/BaseImage.vue', () => {
  const alt: string = faker.lorem.word()
  const height: number = faker.number.int({ max: 10, min: 1 })
  const src: string = faker.internet.url()
  const width: number = faker.number.int({ max: 10, min: 1 })
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(BaseImage, {
      props: {
        alt: alt,
        height: height,
        src: src,
        width: width
      }
    })
  })

  test('style returns border and borderColor when props.borderSize is defined', async () => {
    const borderSize: number = faker.number.int({ max: 10, min: 1 })
    await wrapper.setProps({
      borderSize: borderSize
    })
    expect(wrapper.vm.style).toStrictEqual({
      border: `${borderSize}px solid var(--c-grey)`
    })
  })

  test('style returns border and borderRadius when props.borderSize and props.borderRadius are both defined', async () => {
    const borderRadiusSize: number = faker.number.int({ max: 10, min: 1 })
    const borderSize: number = faker.number.int({ max: 10, min: 1 })
    await wrapper.setProps({
      borderRadiusSize: borderRadiusSize,
      borderSize: borderSize
    })
    expect(wrapper.vm.style).toStrictEqual({
      border: `${borderSize}px solid var(--c-grey)`,
      borderRadius: `${borderRadiusSize}px`
    })
  })

  test('title returns props.src when props.title is undefined', () => {
    expect(wrapper.vm.title).toBe(src)
  })

  test('title returns props.title when props.title is defined', async () => {
    const title: string = faker.lorem.word()
    await wrapper.setProps({
      title: title
    })
    expect(wrapper.vm.title).toBe(title)
  })
})
