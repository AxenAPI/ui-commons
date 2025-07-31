/**
 * Неймспейс с типизацией NCodeBlock
 */

export namespace NCodeBlock {
  /**
   * @see https://prismjs.com/index.html#basic-usage
   */
  export type TProps = {
    /**
     * Текст для вывода в блок кода
     */
    code: string;
    /**
     * Язык, для которого блок кода необходимо вывести
     */
    language?: string;
  };
}
