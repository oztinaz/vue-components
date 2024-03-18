export class ArrayUtils {
  public static createRange(size: number, startAt: number = 0): number[] {
    return [...Array(size).keys()].map((i) => i + startAt)
  }

  public static filter<T>(
    array: T[],
    callback: Function,
    value: boolean | Date | number | string | null
  ): T[] {
    return array.filter((element: T) => callback(element, value))
  }

  public static has<T>(
    array: T[],
    callback: Function,
    value: boolean | Date | number | string | null
  ): boolean {
    return this.filter(array, callback, value).length > 0
  }
}
