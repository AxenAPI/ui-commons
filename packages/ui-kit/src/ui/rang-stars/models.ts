import { CSSProperties } from 'react';

export namespace NRangStars {
  export type TProps = {
    /** Текущее значение рейтинга */
    value?: number;
    /** Максимальное количество звёзд */
    max?: number;
    /** Callback при изменении значения */
    onChange?: (value: number) => void;
    /** Только просмотр, нельзя менять рейтинг */
    readOnly?: boolean;
    /** Класс для корневого элемента */
    className?: string;
    /** Стили для корневого элемента */
    style?: CSSProperties;
    /** После первого выбора нельзя изменить */
    lockAfterSelect?: boolean;
  };
}
