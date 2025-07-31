import { FieldValues, useController } from 'react-hook-form';

import { FormItem, MaskedInput, NInput } from '@/ui';

import { NMaskedInputField } from './models';

export const MaskedInputField = <T extends FieldValues>({
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
  type = 'text',
  ...rest
}: NMaskedInputField.TProps<T>) => {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    name: fieldName,
    rules,
    shouldUnregister,
  });

  const handleChange: NInput.TMaskedProps['onChange'] = (_e, maskedValue) => {
    field.onChange(maskedValue);
    onChange?.(maskedValue);
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
      <MaskedInput
        {...rest}
        {...field}
        onChange={handleChange}
        status={fieldState.invalid ? 'error' : ''}
        type={type}
        value={field.value ?? ''}
      />
    </FormItem>
  );
};
