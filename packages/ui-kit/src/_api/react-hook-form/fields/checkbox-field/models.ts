import { FieldValues, UseControllerProps } from 'react-hook-form';

import { NCheckbox, NFormItem } from '@/ui';

/**
 * Неймспейс с типизацией CheckboxField
 */
export namespace NCheckboxField {
  /**
   * @see {@link NFormItem.TProps}
   * @see {@link NCheckbox.TProps}
   * @see {@link UseControllerProps}
   */
  export type TProps<T extends FieldValues> = Omit<NCheckbox.TProps, 'name' | 'onChange'> &
    Pick<NFormItem.TProps, 'label' | 'tooltip' | 'isRequired'> &
    Omit<UseControllerProps<T>, 'disabled' | 'name'> & {
      /**
       * Имя поля
       */
      fieldName: UseControllerProps<T>['name'];
      /**
       * Изменение значения чекбокса
       */
      onChange?: (value: boolean) => void;
    };
}
