import { FieldValues, UseControllerProps } from 'react-hook-form';

import { NFormItem, NSelect } from '@/ui';

/**
 * Неймспейс с типизацией MultipleSelectField
 */
export namespace NMultipleSelectField {
  /**
   * @see {@link NFormItem.TProps}
   * @see {@link NSelect.TMultipleSelectProps}
   * @see {@link UseControllerProps}
   * */
  export type TProps<T extends FieldValues> = Omit<NSelect.TMultipleProps, 'defaultValue'> &
    Pick<NFormItem.TProps, 'isRequired' | 'tooltip' | 'label'> &
    Omit<UseControllerProps<T>, 'disabled' | 'name'> & {
      /**
       * Имя поля
       */
      fieldName: UseControllerProps<T>['name'];
      /**
       * Отображения лейбла и поля в одну строку c gjktv
       */
      isHorizontal?: boolean;
      /**
       * Изменения значения селекта
       */
      onChange?: (value: string[], options: NSelect.TOption[]) => void;
    };
}
