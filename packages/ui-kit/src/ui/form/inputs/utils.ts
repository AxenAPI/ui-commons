import { conformToMask, Mask } from 'react-text-mask';

/**
 * Конвертирует переданное значение согласно маске.
 * @param {string} value Значение.
 * @param {Mask | ((value: string) => Mask)} mask Маска.
 * @returns {string}
 */
export const conversionMaskedValue = (value: string = '', mask: Mask | ((value: string) => Mask)): string =>
  conformToMask(value, mask, {
    guide: false,
  }).conformedValue;
