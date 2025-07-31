import { FieldValues, UseControllerProps } from 'react-hook-form';

import { NFormItem, NTextArea } from '@/ui';

/**
 * Неймспейс с типизацией TextAreaField
 */
export namespace NTextAreaField {
  /**
   * @see {@link NTextArea['TProps']}
   * @see {@link NFormItem['TProps']}
   * @see {@link UseControllerProps}
   */
  export type TProps<T extends FieldValues> = Omit<NTextArea.TProps, 'defaultValue' | 'name' | 'onChange'> &
    Pick<NFormItem.TProps, 'isRequired' | 'label' | 'tooltip'> &
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
       * Изменения значения инпута
       */
      onChange?: (value: string) => void;
    };
}
