import { ReactNode, useState } from 'react';

import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { Col, Row } from '@/index.ts';

import { commonOptions } from '../consts';
import { NSelect } from '../models.ts';
import { MultipleSelect } from '../MultiSelect';

export default {
  title: 'Axenix UI/Form/Selects/MultiSelect',
  component: MultipleSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isAllowClear: { control: 'boolean' },
    isReadonly: { control: 'boolean' },
    options: { control: 'object' },
    isDisabled: { control: 'boolean' },
    maxTagCount: { control: 'number' },
    maxTagTextLength: { control: 'number' },
    mode: { control: 'select', options: ['tags', 'multiple'] },
    onSelect: fn(),
  },
  args: {
    onSelect: fn(),
  },
} as Meta<typeof MultipleSelect>;

export const DefaultMultiSelect = (argTypes: NSelect.TMultipleProps): ReactNode => {
  return (
    <div style={{ minWidth: '250px' }}>
      <MultipleSelect {...argTypes} />
    </div>
  );
};

export const DisabledMultiSelect = (argTypes: NSelect.TMultipleProps): ReactNode => {
  return <MultipleSelect {...argTypes} />;
};

export const VariantsMultiSelect = (argTypes: NSelect.TMultipleProps): ReactNode => {
  return (
    <div style={{ width: 600 }}>
      <MultipleSelect {...argTypes} placeholder="Outlined" />
      <MultipleSelect {...argTypes} placeholder="Filled" variant="filled" />
      <MultipleSelect {...argTypes} placeholder="Borderless" variant="borderless" />
    </div>
  );
};

export const ResponsiveMultiSelect = (argTypes: NSelect.TMultipleProps): ReactNode => {
  return (
    <div style={{ width: 600 }}>
      <Row justify={'center'}>
        <Col span={12}>
          <MultipleSelect {...argTypes} />
        </Col>
      </Row>
    </div>
  );
};

export const NoStretchMultiSelect = (argTypes: NSelect.TMultipleProps): ReactNode => {
  return (
    <div style={{ width: 700, border: '2px solid', padding: 8 }}>
      <Row justify={'center'}>
        <Col span={8} style={{ paddingRight: 8 }}>
          <MultipleSelect options={[]} />
        </Col>
        <Col span={8}>
          <MultipleSelect {...argTypes} />
        </Col>
      </Row>
    </div>
  );
};

export const LimitInputHeight = (argTypes: NSelect.TMultipleProps): ReactNode => {
  return (
    <div style={{ width: 700 }}>
      <Row justify={'center'}>
        <Col span={8}>
          <MultipleSelect {...argTypes} />
        </Col>
      </Row>
    </div>
  );
};

export const TagFormatNumberMode = (argTypes: NSelect.TMultipleProps): ReactNode => {
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (value: any) => {
    const formattedValue = value.map((item: any) => {
      return item.replace(/\.(?!\d)/g, '');
    });
    setTags(formattedValue);
  };
  return <MultipleSelect {...argTypes} value={tags} onChange={handleChange} />;
};

export const WithGetPopupContainer = (argTypes: NSelect.TMultipleProps) => {
  return (
    <div style={{ height: '250px', overflow: 'scroll' }}>
      <div style={{ minWidth: '250px', height: '400px', paddingTop: '200px', position: 'relative' }} id="area">
        <MultipleSelect {...argTypes} />
      </div>
    </div>
  );
};

export const ReadonlyMultiSelect = (argTypes: NSelect.TMultipleProps): ReactNode => {
  return <MultipleSelect {...argTypes} />;
};

export const GroupedMultiSelect = (argTypes: NSelect.TMultipleProps): ReactNode => {
  const groupedOptions: NSelect.TSelectOption[] = [
    {
      label: 'Группа 1',
      options: [
        { label: 'Опция 1', value: '1' },
        { label: 'Опция 2', value: '2' },
      ],
    },
    {
      label: 'Группа 2',
      options: [
        { label: 'Опция 3', value: '3' },
        { label: 'Опция 4', value: '4' },
      ],
    },
    { label: 'Без группы', value: '5' },
  ];
  return <MultipleSelect {...argTypes} options={groupedOptions} style={{ minWidth: 250 }} />;
};

DefaultMultiSelect.args = {
  options: [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
    },
    {
      label: 'Option 3',
      value: '3',
    },
    {
      label: 'Option 4',
      value: '4',
    },
  ],
  defaultValue: ['1', '4'],
  mode: 'multiple',
  maxTagTextLength: 10,
  isAllowClear: true,
};

DisabledMultiSelect.args = {
  ...DefaultMultiSelect.args,
  isDisabled: true,
};

VariantsMultiSelect.args = {
  defaultValue: ['lucy'],
  style: { margin: 8 },
  options: [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
  ],
};

ResponsiveMultiSelect.args = {
  maxTagCount: 'responsive',
  options: commonOptions,
};

NoStretchMultiSelect.args = {
  isAllowClear: true,
  isTopContent: true,
  options: [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
    },
    {
      label: 'Option 3',
      value: '3',
    },
    {
      label: 'Option 4',
      value: '4',
    },
  ],
};

LimitInputHeight.args = {
  isAllowClear: true,
  isLimitInputHeight: true,
  options: commonOptions,
};

TagFormatNumberMode.args = {
  mode: 'tags',
  showSearch: true,
  style: { width: 700 },
  onSearchFormat: (value: string) => value.replace(/[,]|[^.\d]+|[' ']|[+-]|^\./g, '').replace(/^([^.]*\.)|\./g, '$1'),
};

WithGetPopupContainer.args = {
  ...DefaultMultiSelect.args,
  getPopupContainer: () => document.getElementById('area'),
};

ReadonlyMultiSelect.args = {
  options: [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
    },
    {
      label: 'Option 3',
      value: '3',
    },
    {
      label: 'Option 4',
      value: '4',
    },
  ],
  defaultValue: ['1', '2', '3', '4'],
  mode: 'multiple',
  maxTagCount: 2,
  isReadonly: true,
};
