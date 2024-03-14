import { ArrayUtils } from '@/utils/ArrayUtils'
import { describe, expect, test } from 'vitest'

describe('@/utils/ArrayUtils.ts', () => {
  test('checks createRange result', () => {
    const expected: number = 5
    const result: number[] = ArrayUtils.createRange(expected)

    expect(result).toHaveLength(expected)
  })
})
