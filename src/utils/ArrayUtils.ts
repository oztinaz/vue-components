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

  public static insert<T>(array: T[], element: T, index: number): void {
    array.splice(index, 0, element)
  }
  
  public static replace<T>(array: T[], index1: number, index2: number): void {
    const element1: T = array[index1]
    const element2: T = array[index2]

    this.update(array, element2, index1)
    this.update(array, element1, index2)
  }

  public static update<T>(array: T[], element: T, index: number): void {
    array.splice(index, 1)
    this.insert(array, element, index)
  }
}
