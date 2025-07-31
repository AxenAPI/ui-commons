import { FieldValues, UseControllerProps } from 'react-hook-form';

import { NFormItem, NRangePicker } from '@/ui';

/**
 * Неймспейс с типизацией RangePickerField
 */
export namespace NRangePickerField {
  /**
   * @see {@link NRangePicker.TProps}
   * @see {@link NFormItem.TProps}
   * @see {@link UseControllerProps}
   */
  export type TProps<T extends FieldValues> = Omit<NRangePicker.TProps, 'defaultValue' | 'onChange'> &
    Pick<NFormItem.TProps, 'isRequired' | 'tooltip' | 'label'> &
    Omit<UseControllerProps<T>, 'name'> & {
      /**
       * Имя поля
       */
      fieldName: UseControllerProps<T>['name'];
      /**
       * Отображения лейбла и поля в одну строку c gjktv
       */
      isHorizontal?: boolean;
      /**
       * Изменения значения пикера
       */
      onChange?: (value: string | string[]) => void;
    };
}
