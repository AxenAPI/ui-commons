import { FieldValues, useController } from 'react-hook-form';

import { FormItem, InputNumber, NInputNumber } from '@/ui';

import { NInputNumberField } from './models';
import styles from './styles.module.scss';

export const InputNumberField = <T extends FieldValues>({
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
  style,
  tooltip,
  ...rest
}: NInputNumberField.TProps<T>) => {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    name: fieldName,
    rules,
    shouldUnregister,
  });

  const handleChange: NInputNumber.TProps['onChange'] = value => {
    const newValue = value === undefined ? null : value;
    field.onChange(newValue);
    onChange?.(newValue);
  };

  return (
    <FormItem
      className={className}
      help={fieldState.error?.message}
      isRequired={isRequired || !!rules?.required}
      label={label}
      layout={isHorizontal ? 'horizontal' : 'vertical'}
      style={style}
      tooltip={tooltip}
    >
      <InputNumber
        {...rest}
        {...field}
        className={styles.input}
        onChange={handleChange}
        status={fieldState.invalid ? 'error' : ''}
        value={field.value ?? null}
      />
    </FormItem>
  );
};
