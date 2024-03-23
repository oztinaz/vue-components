<script setup lang="ts">
import { onMounted, onUpdated, ref, type Ref } from 'vue';
import { ArrayUtils } from '@/utils/ArrayUtils';

interface DraggableEvent extends Event {
  target: Element
}

const items = defineModel({
  required: true,
  type: Array
})

const props = defineProps<{
  tag: string
}>()

const component: Ref<HTMLElement | null> = ref(null)
const endIndex: Ref<number> = ref(-1)
const startIndex: Ref<number> = ref(-1)

const addOverClass = (event: DraggableEvent): void => {
  event.target.classList.add('over')
}

const dragEnter = (event: DraggableEvent): void => {
  addOverClass(event)
}

const dragLeave = (event: DraggableEvent): void => {
  removeOverClass(event)
}

const dragOver = (event: DraggableEvent): void => {
  event.preventDefault()
}

const dragStart = (event: DraggableEvent): void => {
  setStartIndex(getClosestDataIndex(event) ?? -1)
}

const drop = (event: DraggableEvent): void => {
  setEndIndex(getClosestDataIndex(event) ?? -1)
  swapItems()
  removeOverClass(event)
}

const getClosest = (event: DraggableEvent): Element | null => {
  return event.target.closest('[draggable=true]')
}

const getClosestDataIndex = (event: DraggableEvent): number | null => {
  const closest: Element | null = getClosest(event)
  if (closest === null) {
    return null
  }

  const dataIndex: string | null = getDataIndex(closest)
  if (dataIndex === null) {
    return null
  }

  return parseInt(dataIndex)
}

const getDataIndex = (element: Element): string | null => {
  return element.getAttribute('data-index')
}

const getSlotElements = (component: HTMLElement): NodeListOf<Element> | undefined => {
  return component.querySelectorAll('[draggable=true]')
}

const makeElementDraggable = (element: Element): void => {
  element.addEventListener('dragstart', dragStart as EventListener)
  element.addEventListener('dragover', dragOver as EventListener)
  element.addEventListener('drop', drop as EventListener)
  element.addEventListener('dragenter', dragEnter as EventListener)
  element.addEventListener('dragleave', dragLeave as EventListener)
}

const makeElementsDraggable = (component: HTMLElement | null): void => {
  if (component === null) {
    return
  }

  const elements: NodeListOf<Element> | undefined = getSlotElements(component)
  if (elements === undefined) {
    return
  }

  elements.forEach((element: Element) => {
    makeElementDraggable(element)
  })
}

const removeOverClass = (event: DraggableEvent): void => {
  event.target.classList.remove('over')
}

const setEndIndex = (index: number): void => {
  endIndex.value = index
}

const setStartIndex = (index: number): void => {
  startIndex.value = index
}

const swapItems = (): void => {
  ArrayUtils.replace(items.value, startIndex.value, endIndex.value)
}

onMounted(() => {
  makeElementsDraggable(component.value)
})

onUpdated(() => {
  makeElementsDraggable(component.value)
})
</script>

<template>
  <component :is="props.tag" ref="component">
    <slot></slot>
  </component>
</template>

<style scoped>
:slotted([draggable='true']) {
  cursor: pointer;
}
</style>