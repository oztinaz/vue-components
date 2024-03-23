import DragDrop from "@/components/DragDrop.vue"
import { ArrayUtils } from "@/utils/ArrayUtils"
import { faker } from "@faker-js/faker"
import { shallowMount, type VueWrapper } from "@vue/test-utils"
import { beforeEach, describe, expect, test, vi } from "vitest"
import { ref, type Ref } from "vue"

describe('@/components/DragDrop.vue', () => {
  const items: Ref<number[]> = ref(ArrayUtils.createRange(5).map((index: number): number => index))
  const tag: string = 'div'
  let wrapper: VueWrapper
  
  beforeEach(() => {
    wrapper = shallowMount(DragDrop, {
      props: {
        modelValue: items.value,
        'onUpdate:modelValue': (e: number[]): void => {
          items.value = e
        },
        tag: tag
      }
    })
  })

  test('addOverClass uses event.target.classList.add method with over', () => {
    const event = {
      target: {
        classList: {
          add: vi.fn().mockImplementationOnce(() => {})
        }
      }
    }
    wrapper.vm.addOverClass(event)
    expect(event.target.classList.add).toHaveBeenCalledOnce()
    expect(event.target.classList.add).toHaveBeenCalledWith('over')
  })

  test('dragOver uses event.preventDefault', () => {
    const event = {
      preventDefault: vi.fn().mockImplementationOnce(() => {})
    }
    wrapper.vm.dragOver(event)
    expect(event.preventDefault).toHaveBeenCalledOnce()
  })

  test('dragStart sets startIndex to -1 when getClosestDataIndex returns null', () => {
    const event = {
      target: {
        closest: vi.fn().mockImplementationOnce((): null => null)
      }
    }
    wrapper.vm.dragStart(event)
    expect(wrapper.vm.startIndex).toBe(-1)
  })

  test('dragStart sets startIndex to passed value that getClosestDataIndex returns', () => {
    const event = {
      target: {
        closest: vi.fn().mockImplementationOnce(() => {
          return {
            getAttribute: vi.fn().mockImplementationOnce(() => '1')
          }
        })
      }
    }
    wrapper.vm.dragStart(event)
    expect(wrapper.vm.startIndex).toBe(1)
  })

  test('checks getClosest', () => {
    const event = {
      target: {
        closest: vi.fn().mockImplementationOnce((): null => null)
      }
    }
    wrapper.vm.getClosest(event)
    expect(event.target.closest).toHaveBeenCalledOnce()
    expect(event.target.closest).toHaveBeenCalledWith('[draggable=true]')
  })

  test('getClosestDataIndex returns null when closest is null', () => {
    const event = {
      target: {
        closest: vi.fn().mockImplementationOnce((): null => null)
      }
    }
    vi.spyOn(wrapper.vm, 'getClosest').mockReturnValueOnce(null)
    const result = wrapper.vm.getClosestDataIndex(event)
    expect(result).toBeNull()
  })

  test('getClosestDataIndex returns null when dataIndex is null', () => {
    const event = {
      target: {
        closest: vi.fn().mockImplementationOnce(() => {
          return {
            getAttribute: vi.fn().mockImplementationOnce((): null => null)
          }
        })
      }
    }
    vi.spyOn(wrapper.vm, 'getDataIndex').mockReturnValueOnce(null)
    const result = wrapper.vm.getClosestDataIndex(event)
    expect(result).toBeNull()
  })

  test('getClosestDataIndex returns the closest dataIndex', () => {
    const event = {
      target: {
        closest: vi.fn().mockReturnValue({
          getAttribute: vi.fn().mockReturnValueOnce('1')
        })
      }
    }
    const result = wrapper.vm.getClosestDataIndex(event)
    expect(result).toBe(1)
  })

  test('checks getDataIndex', () => {
    const element = {
      getAttribute: vi.fn().mockImplementationOnce((): null => null)
    }
    wrapper.vm.getDataIndex(element)
    expect(element.getAttribute).toHaveBeenCalledOnce()
    expect(element.getAttribute).toHaveBeenCalledWith('data-index')
  })

  test('removeOverClass uses event.target.classList.remove method with over', () => {
    const event = {
      target: {
        classList: {
          remove: vi.fn().mockImplementationOnce(() => {})
        }
      }
    }
    wrapper.vm.removeOverClass(event)
    expect(event.target.classList.remove).toHaveBeenCalledOnce()
    expect(event.target.classList.remove).toHaveBeenCalledWith('over')
  })
  
  test('setEndIndex sets endIndex', () => {
    const index: number = faker.number.int({
      min: 1,
      max: 10
    })
    wrapper.vm.setEndIndex(index)
    expect(wrapper.vm.endIndex).toBe(index)
  })
  
  test('setStartIndex sets startIndex', () => {
    const index: number = faker.number.int({
      min: 1,
      max: 10
    })
    wrapper.vm.setStartIndex(index)
    expect(wrapper.vm.startIndex).toBe(index)
  })
  
  test('swapItems uses ArrayUtils.replace', () => {
    const spy = vi.spyOn(ArrayUtils, 'replace')
    wrapper.vm.swapItems()
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(items.value, wrapper.vm.startIndex, wrapper.vm.endIndex)
  })
})