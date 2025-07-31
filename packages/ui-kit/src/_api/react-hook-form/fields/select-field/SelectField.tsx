import { FieldValues, useController } from 'react-hook-form';

import { FormItem, Select } from '@/ui';
import { NSelect } from '@/ui/form/selects/models';

import { NSelectField } from './models';

import styles from './styles.module.scss';

const DEFAULT_READONLY_STUB = '-';

const findLabelByValue = <T,>(options: NSelect.TSelectOption[] | undefined, value: T): React.ReactNode => {
  if (!options || !value) return DEFAULT_READONLY_STUB;
  for (const option of options) {
    if (NSelect.isOptionGroup(option)) {
      const found = option.options.find((opt: NSelect.TOption) => opt.value === value);
      if (found) return found.label;
    } else {
      if (option.value === value) {
        return option.label;
      }
    }
  }
  return DEFAULT_READONLY_STUB;
};

export const SelectField = <T extends FieldValues>({
  className,
  control,
  defaultValue,
  fieldName,
  isHorizontal,
  isReadonly,
  isRequired,
  label = '',
  onChange: propsOnChange,
  options,
  rules,
  shouldUnregister,
  tooltip,
  ...rest
}: NSelectField.TProps<T>) => {
  const {
    field: { onChange, value, ...restField },
    fieldState,
  } = useController<T>({
    control,
    defaultValue,
    name: fieldName,
    rules,
    shouldUnregister,
  });

  const handleChange: NSelect.TProps['onChange'] = (valueChange, option) => {
    const newValue = valueChange === undefined ? null : valueChange;

    onChange(newValue);
    propsOnChange?.(newValue, option);
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
      {isReadonly ? (
        findLabelByValue(options, value)
      ) : (
        <Select
          {...rest}
          {...restField}
          className={styles.select}
          onChange={handleChange}
          options={options}
          status={fieldState.invalid ? 'error' : undefined}
          value={value}
        />
      )}
    </FormItem>
  );
};
