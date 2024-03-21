import CustomImage from '@/components/custom-image/CustomImage.vue'
import { faker } from '@faker-js/faker'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ref, type Ref } from 'vue'

describe('@/components/custom-image/CustomImage.vue', () => {
  const height: number = faker.number.int({ max: 10, min: 1 })
  const src: Ref<string> = ref('')
  const width: number = faker.number.int({ max: 10, min: 1 })
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(CustomImage, {
      props: {
        height: height,
        modelValue: src.value,
        'onUpdate:modelValue': (e: string): void => {
          src.value = e
        },
        updatable: false,
        width: width
      }
    })
  })

  test('closeImageUpload makes isImageUploadOpen false', () => {
    wrapper.vm.isImageUploadOpen = true
    expect(wrapper.vm.isImageUploadOpen).toBeTruthy()
    wrapper.vm.closeImageUpload()
    expect(wrapper.vm.isImageUploadOpen).toBeFalsy()
  })

  test('openImageUpload makes isImageUploadOpen true', () => {
    wrapper.vm.openImageUpload()
    expect(wrapper.vm.isImageUploadOpen).toBeTruthy()
  })

  test('mouseenter event calls openImageUpload method', async () => {
    const spy = vi.spyOn(wrapper.vm, 'openImageUpload')
    const div = wrapper.find('[data-test="custom-image"]')
    await div.trigger('mouseenter')
    expect(spy).toHaveBeenCalledOnce()
  })

  test('mouseleave event calls closeImageUpload method', async () => {
    const spy = vi.spyOn(wrapper.vm, 'closeImageUpload')
    const div = wrapper.find('[data-test="custom-image"]')
    await div.trigger('mouseleave')
    expect(spy).toHaveBeenCalledOnce()
  })

  test('ImageUpload is shown when props.updatable is true', async () => {
    await wrapper.setProps({
      updatable: true
    })
    const imageUploadComponent = wrapper.find('[data-test="image-upload"]')
    expect(imageUploadComponent.exists()).toBeTruthy()
  })

  test('ImageUpload is not shown when props.updatable is false', () => {
    const imageUploadComponent = wrapper.find('[data-test="image-upload"]')
    expect(imageUploadComponent.exists()).toBeFalsy()
  })
})
