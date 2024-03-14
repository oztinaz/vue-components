export class ArrayUtils {
  public static createRange(size: number, startAt: number = 0): number[] {
    return [...Array(size).keys()].map((i) => i + startAt)
  }
}
