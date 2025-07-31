import { FieldValues, useController } from 'react-hook-form';

import { Checkbox, FormItem, NCheckbox } from '@/ui';

import { NCheckboxField } from './models';

export const CheckboxField = <T extends FieldValues>({
  className,
  children = null,
  control,
  defaultValue,
  fieldName,
  isRequired,
  label = '',
  onChange,
  rules,
  shouldUnregister,
  style,
  tooltip,
  ...rest
}: NCheckboxField.TProps<T>) => {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    name: fieldName,
    rules,
    shouldUnregister,
  });

  const handleChange: NCheckbox.TProps['onChange'] = e => {
    const value = e.target.checked;

    field.onChange(value === undefined ? null : value);
    onChange?.(value);
  };

  return (
    <FormItem
      className={className}
      help={fieldState.error?.message}
      isRequired={isRequired || !!rules?.required}
      label={label}
      style={{ ...style, userSelect: 'none' }}
      tooltip={tooltip}
    >
      <Checkbox {...rest} isChecked={field.value} onChange={handleChange} value={field.value}>
        {children}
      </Checkbox>
    </FormItem>
  );
};
