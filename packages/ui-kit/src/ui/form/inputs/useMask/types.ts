export type TMaskProps = (string | RegExp)[];

/**
 * Неймспейс с типизацией UseMaskOptions
 */
export namespace NUseMask {
  export type TMaskProps = (string | RegExp)[];

  export type TUseMaskOptions = {
    mask: TMaskProps | ((value: string) => TMaskProps);
    initValue?: string;
  };
}
