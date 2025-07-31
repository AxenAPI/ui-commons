import { ReactNode, useState } from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import dayjs from 'dayjs';

import { NDateTime } from '../../_common/models';
import { NRangePicker, RangePicker } from '../../range-picker';
import { ARG_TYPES, DEFAULT_ARGS } from './consts';

const meta: Meta<NRangePicker.TProps> = {
  title: 'Axenix UI/Datetime/RangePicker',
  component: RangePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: ARG_TYPES,
  args: DEFAULT_ARGS,
} satisfies Meta<typeof RangePicker>;

export default meta;

const Template: StoryFn<NRangePicker.TProps> = args => <RangePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  isAllowClear: true,
  autoFocus: false,
  className: '',
  format: 'MM/DD/YYYY',
  popupClassName: '',
  preserveInvalidOnBlur: false,
  isDisabled: false,
  isDisabledDate: () => false,
  isReadonly: false,
  minDate: undefined,
  maxDate: undefined,
  needConfirm: false,
  nextIcon: '',
  panelRender: (node: ReactNode) => node,
  picker: NDateTime.EPicker.Date,
  placeholder: ['', ''],
  placement: 'bottomLeft',
  prevIcon: '',
  size: 'middle',
  status: 'error',
  suffixIcon: '',
  superNextIcon: '',
  superPrevIcon: '',
  allowEmpty: [true, true],
  defaultPickerValue: undefined,
  pickerValue: undefined,
  renderExtraFooter: () => null,
};

export const WithOpen = Template.bind({});
WithOpen.args = {
  ...Default.args,
  isOpen: true,
};

export const WithDisabled = Template.bind({});
WithDisabled.args = {
  ...Default.args,
  isDisabled: true,
};

export const WithReadonly = Template.bind({});
WithReadonly.args = {
  ...Default.args,
  isReadonly: true,
};

export const WithAutoFocus = Template.bind({});
WithAutoFocus.args = {
  ...Default.args,
  autoFocus: true,
};

export const WithMinDate = Template.bind({});
WithMinDate.args = {
  ...Default.args,
  minDate: dayjs(),
};

export const WithMaxDate = Template.bind({});
WithMaxDate.args = {
  ...Default.args,
  maxDate: dayjs(),
};

export const WithCustomFormatMask = Template.bind({});
WithCustomFormatMask.args = {
  ...Default.args,
  format: 'DD/MM/YYYY',
  mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
};

export const WithTimeAndSeparator = Template.bind({});
WithTimeAndSeparator.args = {
  ...Default.args,
  showTime: true,
  format: 'MM/DD/YYYY HH:mm',
  separator: 'до',
};

export const WithMode = Template.bind({});
WithMode.args = {
  ...Default.args,
  mode: ['month', 'month'],
};

export const WithTimeAndMaskMode = Template.bind({});
WithTimeAndMaskMode.args = {
  ...Default.args,
  showTime: true,
  format: 'DD.MM.YYYY HH:mm',
  mask: [
    /[0-3]/,
    /[0-9]/,
    '.',
    /[0-1]/,
    /[0-9]/,
    '.',
    /[1-2]/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /[0-2]/,
    /[0-9]/,
    ':',
    /[0-5]/,
    /[0-9]/,
  ],
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Default.args,
  status: undefined,
  isReadonly: true,
  defaultValue: [dayjs('01-01-2000'), dayjs('02-01-2000')],
};

export const FloatingLabelRangePicker: StoryFn<NRangePicker.TProps> = () => {
  const [value, setValue] = useState<NRangePicker.TProps['value']>(undefined);

  return <RangePicker {...Default.args} title="период" floatLabel onChange={val => setValue(val)} value={value} />;
};
