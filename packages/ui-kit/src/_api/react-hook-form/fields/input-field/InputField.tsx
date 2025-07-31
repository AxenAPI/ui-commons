import { FieldValues, useController } from 'react-hook-form';

import { FormItem, Input, NInput } from '@/ui';

import { NInputField } from './models';

export const InputField = <T extends FieldValues>({
  className,
  control,
  defaultValue,
  fieldName,
  isHorizontal,
  isNumberInputClearable = true,
  isRequired,
  label = '',
  onChange,
  onPressEnter,
  rules,
  shouldUnregister,
  style,
  tooltip,
  type = 'text',
  ...rest
}: NInputField.TProps<T>) => {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    name: fieldName,
    rules,
    shouldUnregister,
  });

  const handleChange: NInput.TProps['onChange'] = e => {
    let value = e.target.value;

    if (!isNumberInputClearable) {
      if (value === '') {
        value = '0';
      }
    }

    field.onChange(value === undefined ? null : value);
    onChange?.(value);
  };

  const handleKeyDown: NInput.TProps['onPressEnter'] = e => {
    if (e.key === 'Enter' && onPressEnter) {
      onPressEnter(e);
    }
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
      <Input
        {...rest}
        {...field}
        onChange={handleChange}
        onPressEnter={handleKeyDown}
        status={fieldState.invalid ? 'error' : ''}
        type={type}
        value={field.value ?? ''}
      />
    </FormItem>
  );
};
