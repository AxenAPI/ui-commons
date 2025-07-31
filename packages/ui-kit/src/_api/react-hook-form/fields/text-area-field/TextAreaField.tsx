import { FieldValues, useController } from 'react-hook-form';

import { FormItem, NTextArea, TextArea } from '@/ui';

import { NTextAreaField } from './models';

export const TextAreaField = <T extends FieldValues>({
  className,
  control,
  defaultValue,
  fieldName,
  isHorizontal,
  isRequired,
  label = '',
  onChange,
  rows = 4,
  rules,
  shouldUnregister,
  style,
  tooltip,
  ...rest
}: NTextAreaField.TProps<T>) => {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    name: fieldName,
    rules,
    shouldUnregister,
  });

  const handleChange: NTextArea.TProps['onChange'] = e => {
    const value = e.target.value;

    field.onChange(value);
    onChange?.(value);
  };

  return (
    <FormItem
      className={className}
      help={fieldState.error?.message}
      label={label}
      layout={isHorizontal ? 'horizontal' : 'vertical'}
      isRequired={isRequired || !!rules?.required}
      style={style}
      tooltip={tooltip}
    >
      <TextArea
        {...rest}
        {...field}
        onChange={handleChange}
        rows={rows}
        status={fieldState.invalid ? 'error' : ''}
        value={field.value ?? ''}
      />
    </FormItem>
  );
};
