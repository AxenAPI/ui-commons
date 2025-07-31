import { FieldValues, useController } from 'react-hook-form';

import { FormItem, MultipleSelect, NSelect } from '@/ui';

import { NMultipleSelectField } from './models';
import styles from './styles.module.scss';

export const MultipleSelectField = <T extends FieldValues>({
  className,
  control,
  defaultValue,
  fieldName,
  isHorizontal,
  isRequired,
  label = '',
  onChange,
  rules,
  shouldUnregister,
  tooltip,
  ...rest
}: NMultipleSelectField.TProps<T>) => {
  const { field, fieldState } = useController<T>({
    control,
    defaultValue,
    name: fieldName,
    rules,
    shouldUnregister,
  });

  const handleChange: NSelect.TMultipleProps['onChange'] = (value, options) => {
    const newValue = value === undefined ? null : value;

    field.onChange(newValue);
    onChange?.(newValue, options);
  };

  return (
    <FormItem
      className={className}
      help={fieldState.error?.message}
      isRequired={isRequired || !!rules?.required}
      label={label}
      layout={isHorizontal ? 'horizontal' : 'vertical'}
      tooltip={tooltip}
    >
      <MultipleSelect
        {...rest}
        {...field}
        className={styles.select}
        onChange={handleChange}
        status={fieldState.invalid ? 'error' : undefined}
      />
    </FormItem>
  );
};
