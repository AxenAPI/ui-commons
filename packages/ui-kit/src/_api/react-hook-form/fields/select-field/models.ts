import { FieldValues, UseControllerProps } from 'react-hook-form';

import { NFormItem, NSelect } from '@/ui';

/**
 * Неймспейс с типизацией SelectField
 */
export namespace NSelectField {
  /**
   * @see {@link NSelect.TProps}
   * @see {@link NFormItem.TProps}
   * @see {@link UseControllerProps}
   */
  export type TProps<T extends FieldValues> = Omit<NSelect.TProps, 'defaultValue'> &
    Pick<NFormItem.TProps, 'tooltip' | 'isRequired' | 'label'> &
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
       * Read-mode
       */
      isReadonly?: boolean;
      /**
       * Изменения значения селекта
       */
      onChange?: (value: string, option: NSelect.TOption) => void;
    };
}
