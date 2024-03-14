export class StringUtils {
  public static firstLetterUpperCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}
