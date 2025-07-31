import { FieldValues, UseControllerProps } from 'react-hook-form';

import { NFormItem, NInput } from '@/ui';

/**
 * Неймспейс с типизацией InputField
 */
export namespace NInputField {
  /**
   * @see {@link NFormItem.TProps}
   * @see {@link NInput.TProps}
   * @see {@link UseControllerProps}
   */
  export type TProps<T extends FieldValues> = Omit<NInput.TProps, 'defaultValue' | 'onChange'> &
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
      /**
       * Очищаемость
       */
      isNumberInputClearable?: boolean;
      /**
       * Изменение значения
       */
      onChange?: (value: string) => void;
    };
}
