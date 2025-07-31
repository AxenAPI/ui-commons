import { FieldPathValue, FieldValues, Path, useController } from 'react-hook-form';

import dayjs, { Dayjs } from 'dayjs';

import { DatePicker, FormItem, NDatePicker } from '@/ui';

import { NDatePickerField } from './models';
import styles from './styles.module.scss';

const defaultFormatter = dayjs;
const defaultParser = (date: Dayjs) => date?.toISOString() ?? '';

export const DatePickerField = <T extends FieldValues>({
  className,
  control,
  defaultValue,
  fieldName,
  formatter = defaultFormatter,
  isHorizontal,
  isReadonly,
  isRequired,
  label = '',
  onChange: propsOnChange,
  // @ts-expect-error - NOTE: поведение по умолчанию
  parser = defaultParser,
  readonlyFormatter,
  rules,
  shouldUnregister,
  tooltip,
  ...rest
}: NDatePickerField.TProps<T>) => {
  const {
    field: { onChange, value, ...restField },
    fieldState,
  } = useController({
    control,
    defaultValue,
    name: fieldName,
    rules,
    shouldUnregister,
  });

  const handleChange: NDatePicker.TProps['onChange'] = (date, dateString) => {
    // NOTE: возможность включения multiple режима отключена
    const onlyString = dateString as string;
    const parsed = parser(date, onlyString);

    onChange(parsed as FieldPathValue<T, Path<T>>);
    propsOnChange?.(date, onlyString);
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
        (readonlyFormatter?.(value) ?? value?.toLocalDateString?.() ?? value)
      ) : (
        <DatePicker
          {...rest}
          {...restField}
          className={styles.datePicker}
          onChange={handleChange}
          status={fieldState.invalid ? 'error' : undefined}
          value={value && formatter(value)}
        />
      )}
    </FormItem>
  );
};
