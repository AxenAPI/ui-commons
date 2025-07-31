import { FieldValues, UseControllerProps } from 'react-hook-form';

import { NFormItem, NInputNumber } from '@/ui';

export namespace NInputNumberField {
  /**
   * @see {@link NFormItem.TProps}
   * @see {@link NInputNumber.TProps}
   * @see {@link UseControllerProps}
   */
  export type TProps<T extends FieldValues> = Omit<NInputNumber.TProps, 'defaultValue'> &
    Pick<NFormItem.TProps, 'isRequired' | 'tooltip' | 'label'> &
    Omit<UseControllerProps<T>, 'name' | 'disabled'> & {
      /**
       * Имя поля
       */
      fieldName: UseControllerProps<T>['name'];
      /**
       * Отображения лейбла и поля в одну строку
       */
      isHorizontal?: boolean;
    };
}
