import { ReactNode } from 'react';

import { Dayjs } from 'dayjs';

import { NTextArea } from '@/ui/form/textareas';

import { NDateTime } from '../_common/models.ts';

/**
 * Неймспейс с типизацией NDatePicker
 */
export namespace NDatePicker {
  export type TCommonProps = NDateTime.TCommonProps;
  export type TFormatC = NDateTime.TFormat;
  export type TModeC = NDateTime.TMode;
  export type TPanelMode = NDateTime.TPanelMode;
  export type TDateValue = Dayjs | Dayjs[];

  type TRenderExtraFooter = (mode: TPanelMode) => ReactNode;

  export type TProps<T extends TDateValue = Dayjs> = TCommonProps & {
    /**
     * Инпут даты, расширяется и распологается поверх контейнера
     */
    isTopContent?: boolean;
    /**
     * Колличество строчек, которое можно отобразить, если используется isTopContent
     */
    autoSize?: boolean | NTextArea.TAutoSize;
    /**
     * Значение по умолчанию для выбора даты
     */
    defaultPickerValue?: Dayjs;
    /**
     * Значение по умолчанию
     */
    defaultValue?: T | null;
    /**
     * Режим компонента (например, "date", "time", "datetime")
     */
    mode?: TModeC;
    multiple?: boolean;
    pickerValue?: Dayjs;
    placeholder?: string;
    /**
     * Функция для отображения дополнительного содержимого подвала
     */
    renderExtraFooter?: TRenderExtraFooter;
    /**
     * Определяет, видна ли кнопка "Сейчас"
     */
    showNow?: boolean;
    /**
     * Определяет, виден ли номер недели.
     */
    showWeek?: boolean;
    value?: T | null;
    onChange?: (date: T, dateString: string | string[]) => void;
    /**
     * Функция обратного вызова при нажатии кнопки "ОК"
     */
    onOk?: (date: T) => void;
    /**
     * Состояние режима чтения
     */
    isReadonly?: boolean;
    /**
     * Для floating label
     */
    title?: string;
    /**
     * Для рендера элемента
     * с floating label
     */
    floatLabel?: boolean;
  };
}
