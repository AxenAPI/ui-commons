import { ReactNode, useState } from 'react';

import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import dayjs, { Dayjs } from 'dayjs';

import { NTimePicker, TimePicker } from '../../time-picker/index';
import { INPUT_STATUS, SIZE_TIME_PICKER, TYPE_TIME_PICKER } from './consts.ts';

import styles from './styles.module.css';

const withWrapper = (Story: any) => <div className={styles.wrapper}>{Story()}</div>;

export default {
  title: 'Axenix UI/Datetime/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  decorators: [withWrapper],
  argTypes: {
    isAllowClear: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    format: { control: 'text' },
    value: { control: 'object' },
    placeholder: { control: 'text' },
    placement: {
      control: 'select',
      options: ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight', 'top', 'bottom'],
    },
    size: { control: 'select', options: ['large', 'middle', 'small'] },
    status: { control: 'select', options: ['warning', 'error', ''] },
    shouldUse12Hours: { control: 'boolean' },
    variant: { control: 'select', options: ['outlined', 'borderless', 'filled'] },
    onChange: fn(),
    isReadonly: { control: 'boolean' },
    components: {
      control: 'object',
      description: 'Custom component TimePicker',
    },
  },
  args: { onChange: fn() },
} as Meta<typeof TimePicker>;

export const DefaultTimePicker = (argTypes: NTimePicker.TProps): ReactNode => {
  const [state, setState] = useState(dayjs());

  const handleStateChange = (value: Dayjs, dateString: string | string[]) => {
    setState(value);
    if (argTypes.onChange) {
      argTypes.onChange(value, dateString);
    }
  };

  return <TimePicker {...argTypes} onChange={handleStateChange} value={state} />;
};

export const DisabledTimePicker = (argTypes: NTimePicker.TProps): ReactNode => {
  return <TimePicker {...argTypes} onChange={argTypes.onChange} />;
};

export const TimePickerSizes = (argTypes: NTimePicker.TProps): ReactNode => {
  return SIZE_TIME_PICKER.map(size => {
    return <TimePicker key={size} {...argTypes} size={size} onChange={argTypes.onChange} />;
  });
};

export const TwelveHoursTimePicker = (argTypes: NTimePicker.TProps): ReactNode => {
  return <TimePicker {...argTypes} onChange={argTypes.onChange} />;
};

export const TimePickerStatuses = (argTypes: NTimePicker.TProps): ReactNode => {
  return INPUT_STATUS.map(status => (
    <TimePicker key={status} {...argTypes} status={status} onChange={argTypes.onChange} />
  ));
};

export const ChangeOnScroll = (argTypes: NTimePicker.TProps): ReactNode => {
  return <TimePicker {...argTypes} onChange={argTypes.onChange} />;
};

export const VariantsOfTimePicker = (argTypes: NTimePicker.TProps): ReactNode => {
  return TYPE_TIME_PICKER.map(type => (
    <TimePicker key={type} onChange={argTypes.onChange} {...argTypes} variant={type} />
  ));
};

export const Readonly = (argTypes: NTimePicker.TProps): ReactNode => {
  return <TimePicker {...argTypes} />;
};

export const FloatingLabelTimePicker = (argTypes: NTimePicker.TProps): ReactNode => {
  const [value, setValue] = useState<NTimePicker.TProps['value']>(undefined);

  return (
    <TimePicker
      {...argTypes}
      title="дата"
      floatLabel
      onChange={val => setValue(val)}
      value={value}
      placeholder="Выберите время"
    />
  );
};

export const WithCustomComponents = (argTypes: NTimePicker.TProps): ReactNode => {
  const [state, setState] = useState(dayjs());

  const handleStateChange = (value: Dayjs, dateString: string | string[]) => {
    setState(value);
    if (argTypes.onChange) {
      argTypes.onChange(value, dateString);
    }
  };

  return (
    <TimePicker
      {...argTypes}
      onChange={handleStateChange}
      value={state}
      components={{
        input: ({ value, onChange }) => (
          <input value={value} onChange={onChange} style={{ border: '2px solid red', borderRadius: '4px' }} />
        ),
      }}
    />
  );
};

DefaultTimePicker.args = {
  isAllowClear: true,
};

DisabledTimePicker.args = {
  isAllowClear: true,
  isDisabled: true,
};

TimePickerSizes.args = {
  isAllowClear: true,
};

TwelveHoursTimePicker.args = {
  isAllowClear: true,
  shouldUse12Hours: true,
};

TimePickerStatuses.args = {
  isAllowClear: true,
};

ChangeOnScroll.args = {
  isAllowClear: true,
  isChangeOnScroll: true,
  needConfirm: false,
};

VariantsOfTimePicker.args = {
  isAllowClear: true,
};

Readonly.args = {
  isReadonly: true,
  defaultValue: dayjs('12:12:00', 'HH:mm:ss'),
};

WithCustomComponents.args = {
  isAllowClear: true,
  placeholder: 'Выберите время',
};
