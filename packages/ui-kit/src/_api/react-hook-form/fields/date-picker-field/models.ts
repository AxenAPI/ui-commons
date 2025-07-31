import { FieldPathValue, FieldValues, Path, UseControllerProps } from 'react-hook-form';

import { Dayjs } from 'dayjs';

import { NDatePicker, NFormItem } from '@/ui';

/**
 * Неймспейс с типизацией DatePickerField
 */
export namespace NDatePickerField {
  /**
   * @see {@link NFormItem.TProps}
   * @see {@link NDatePicker.TProps}
   * @see {@link UseControllerProps}
   */
  export type TProps<T extends FieldValues> = Omit<NDatePicker.TProps, 'defaultValue' | 'onChange' | 'multiple'> &
    Pick<NFormItem.TProps, 'label' | 'isRequired' | 'tooltip'> &
    Omit<UseControllerProps<T>, 'name' | 'disabled'> & {
      /**
       * Имя поля
       */
      fieldName: Path<T>;
      /**
       * Ф-я форматирования значения с формы к Dayjs, если форматирование по умолчанию работает с ошибками
       */
      formatter?: (date: FieldPathValue<T, Path<T>>) => Dayjs;
      /**
       * Настройка лейаута
       */
      isHorizontal?: boolean;
      /**
       * Изменение значения пикера
       */
      onChange?: (date: Dayjs, dateString: string) => void;
      /**
       * Ф-я форматирования значения филда для прокидывания в форму
       * По умолчанию преобразуется в ISO
       */
      parser?: (value: Dayjs, stringValue: string) => FieldPathValue<T, Path<T>>;
      /**
       * Форматтер для режима readonly
       */
      readonlyFormatter?: (value: FieldPathValue<T, Path<T>>) => string;
    };
}
