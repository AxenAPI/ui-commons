import { InputNumberProps } from 'antd';

/**
 * Неймспейс с типизацией NInputNumber
 */

export namespace NInputNumber {
  export type TProps = Omit<InputNumberProps, 'disabled' | 'readOnly'> & {
    isDisabled?: boolean;
    isReadOnly?: boolean;
  };
}

export type TInputNumberProps = Omit<InputNumberProps, 'prefix' | 'suffix'> & {
  /**
   * Валюта для отображения
   */
  currency?: 'RUB' | 'USD' | 'EUR';
  /**
   * Положение символа валюты
   * @default 'suffix'
   */
  currencyPosition?: 'prefix' | 'suffix';
  /**
   * Количество знаков после запятой
   * @default 2
   */
  decimalPlaces?: number;
  /**
   * Разделитель тысяч
   * @default ' '
   */
  thousandSeparator?: string;
  /**
   * Разделитель десятичных знаков
   * @default '.'
   */
  decimalSeparator?: string;
  /**
   * Показывать ли стрелки управления (controls)
   * @default true
   */
  controlArrows?: boolean;
  /**
   * Заголовок для floating label
   */
  title?: string;
  /**
   * Включить floating label поведение
   * @default false
   */
  floatLabel?: boolean;
};
