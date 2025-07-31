import { FieldValues, UseControllerProps } from 'react-hook-form';

import { NFormItem, NTimePicker } from '@/ui';

export namespace NTimePickerField {
  /**
   * @see {@link NTimePicker.TProps}
   * @see {@link NFormItem.TProps}
   * @see {@link UseControllerProps}
   */
  export type TProps<T extends FieldValues> = Omit<NTimePicker.TProps, 'defaultValue' | 'onChange'> &
    Pick<NFormItem.TProps, 'tooltip' | 'isRequired' | 'label'> &
    Omit<UseControllerProps<T>, 'name' | 'disabled'> & {
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
