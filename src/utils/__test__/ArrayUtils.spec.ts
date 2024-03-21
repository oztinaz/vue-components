import { ArrayUtils } from '@/utils/ArrayUtils'
import { describe, expect, test, vi } from 'vitest'

describe('@/utils/ArrayUtils.ts', () => {
  test('checks createRange result', () => {
    const expected: number = 5
    const result: number[] = ArrayUtils.createRange(expected)

    expect(result).toHaveLength(expected)
  })

  test('filter filters array', () => {
    const spy = vi.fn().mockImplementation((element: string, value: string): boolean => {
      return element === value
    })
    const array: string[] = ['a', 'b']
    const result: string[] = ArrayUtils.filter(array, spy, 'a')
    expect(result).toStrictEqual(['a'])
  })

  test('has checks if array has the element', () => {
    const spy = vi.fn().mockImplementation((element: string, value: string): boolean => {
      return element === value
    })
    const array: string[] = ['a']
    const hasA: boolean = ArrayUtils.has(array, spy, 'a')
    const hasB: boolean = ArrayUtils.has(array, spy, 'b')
    expect(hasA).toBeTruthy()
    expect(hasB).toBeFalsy()
  })
})
