import { FieldValues, useController } from 'react-hook-form';

import { FormItem, NTimePicker, TimePicker } from '@/ui';

import { NTimePickerField } from './models';

export const TimePickerField = <T extends FieldValues>({
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
}: NTimePickerField.TProps<T>) => {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    name: fieldName,
    rules,
    shouldUnregister,
  });

  const handleChange: NTimePicker.TProps['onChange'] = (_date, dateString) => {
    field.onChange(dateString);
    onChange?.(dateString);
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
      <TimePicker
        {...rest}
        {...field}
        onChange={handleChange}
        status={fieldState.invalid ? 'error' : undefined}
        value={undefined}
      />
    </FormItem>
  );
};
