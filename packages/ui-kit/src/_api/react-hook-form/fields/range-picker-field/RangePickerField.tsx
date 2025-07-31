import { FieldValues, useController } from 'react-hook-form';

import { FormItem, NRangePicker, RangePicker } from '@/ui';

import { NRangePickerField } from './models';

export function RangePickerField<T extends FieldValues>({
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
}: NRangePickerField.TProps<T>) {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    name: fieldName,
    rules,
    shouldUnregister,
  });

  const handleChange: NRangePicker.TProps['onChange'] = (_date, dateString) => {
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
      <RangePicker
        {...rest}
        {...field}
        onChange={handleChange}
        status={fieldState.invalid ? 'error' : undefined}
        value={undefined}
      />
    </FormItem>
  );
}
