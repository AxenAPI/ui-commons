import { useState } from 'react';

import type { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { Col, Input, Row } from '@/ui';

import { NDateTime } from '../../_common/models.ts';
import { DatePicker, NDatePicker } from '../../date-picker';
import { ARG_TYPES, DEFAULT_ARGS } from './consts';

const meta = {
  title: 'Axenix UI/Datetime/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: ARG_TYPES,
  args: DEFAULT_ARGS,
} satisfies Meta<typeof DatePicker>;

export default meta;

const Template: StoryFn<NDatePicker.TProps> = args => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  isAllowClear: true,
  autoFocus: false,
  format: 'DD-MM-YYYY',
  isDisabled: false,
  isDisabledDate: (currentDate: Dayjs) => currentDate.isAfter(dayjs()),
  isReadonly: false,
  minDate: dayjs().subtract(1, 'year'),
  maxDate: dayjs().add(1, 'year'),
  mode: 'date',
  needConfirm: false,
  picker: NDateTime.EPicker.Date,
  placement: 'bottomLeft',
  size: 'middle',
  variant: 'outlined',
  onOpenChange: fn(),
  onPanelChange: fn(),
  onChange: fn(),
  onOk: fn(),
};

export const WithAllowClear = Template.bind({});
WithAllowClear.args = {
  ...Default.args,
  isAllowClear: true,
};

export const WithAutoFocus = Template.bind({});
WithAutoFocus.args = {
  ...Default.args,
  autoFocus: true,
};

export const WithClassName = Template.bind({});
WithClassName.args = {
  ...Default.args,
  className: 'custom-class',
};

export const WithDisabledDate = Template.bind({});
WithDisabledDate.args = {
  ...Default.args,
  isDisabledDate: (currentDate: Dayjs) => currentDate.isAfter(dayjs()),
};

export const WithLocale = Template.bind({});
WithLocale.args = {
  ...Default.args,
};

export const WithMinAndMaxDate = Template.bind({});
WithMinAndMaxDate.args = {
  ...Default.args,
  minDate: dayjs().subtract(1, 'year'),
  maxDate: dayjs().add(1, 'year'),
};

export const WithMode = Template.bind({});
WithMode.args = {
  ...Default.args,
  mode: 'month',
};

export const WithMaskDate: StoryFn<NDatePicker.TProps> = args => {
  return <DatePicker {...args} />;
};
WithMaskDate.args = {
  format: 'DD.MM.YYYY',
  mask: [/[0-3]/, /[0-9]/, '.', /[0-1]/, /[0-9]/, '.', /[1-2]/, /\d/, /\d/, /\d/],
};

export const WithMultipleDate: StoryFn<NDatePicker.TProps> = args => {
  return <DatePicker {...args} />;
};
WithMultipleDate.args = {
  multiple: true,
  style: { width: 500 },
  format: 'DD.MM.YYYY',
};

export const WithTimeDate: StoryFn<NDatePicker.TProps> = args => {
  return <DatePicker {...args} />;
};
WithTimeDate.args = { showTime: true };

export const WithTimeDateAndMask: StoryFn<NDatePicker.TProps> = args => {
  return <DatePicker {...args} />;
};
WithTimeDateAndMask.args = {
  format: 'DD.MM.YYYY HH:mm:ss',
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
    ':',
    /[0-5]/,
    /[0-9]/,
  ],
  showTime: true,
};

export const MaskTopContentDate: StoryFn<NDatePicker.TProps> = args => {
  return (
    <div style={{ width: 700, border: '2px solid', padding: 8 }}>
      <Row justify={'center'}>
        <Col span={8} style={{ paddingRight: 8 }}>
          <Input />
        </Col>
        <Col span={3}>
          <DatePicker {...args} />
        </Col>
      </Row>
    </div>
  );
};
MaskTopContentDate.args = {
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
  isTopContent: true,
  showTime: true,
  autoSize: { maxRows: 6 },
};

export const Readonly: StoryFn<NDatePicker.TProps> = args => {
  return <DatePicker {...args} />;
};

Readonly.args = {
  ...Default.args,
  isReadonly: true,
  value: dayjs('01-01-2000'),
};

export const ReadonlyMultiple: StoryFn<NDatePicker.TProps<Dayjs[]>> = args => {
  return <DatePicker {...args} />;
};

ReadonlyMultiple.args = {
  isReadonly: true,
  multiple: true,
  value: [dayjs('01-01-2000'), dayjs('02-01-2000')],
};

export const FloatingLabelDatePicker: StoryFn<NDatePicker.TProps> = args => {
  const [value, setValue] = useState<NDatePicker.TProps['value']>(undefined);

  return (
    <DatePicker
      {...args}
      title="дата"
      floatLabel
      onChange={val => setValue(val)}
      value={value}
      placeholder="Выберите дату"
    />
  );
};
