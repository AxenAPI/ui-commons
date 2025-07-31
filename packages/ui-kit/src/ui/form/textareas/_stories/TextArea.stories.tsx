import { ComponentProps, ReactNode, useState } from 'react';

import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { Col, Input, Row } from '@/ui';
import { NTextArea } from '@/ui/form/textareas/models.ts';

import { TextArea } from '../TextArea';

export default {
  title: 'Axenix UI/Form/TextAreas/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: fn(),
    readOnly: { control: 'boolean' },
  },
  args: { onChange: fn() },
} as Meta<typeof TextArea>;

export const DefaultTextArea = (argTypes: NTextArea.TProps): ReactNode => {
  return <TextArea {...argTypes} />;
};

export const AutoSizeTextArea = (argTypes: NTextArea.TProps): ReactNode => {
  return <TextArea {...argTypes} />;
};

export const CountingTextArea = (argTypes: NTextArea.TProps): ReactNode => {
  return <TextArea {...argTypes} />;
};

export const NoStretchTextArea = (argTypes: NTextArea.TProps): ReactNode => {
  return (
    <div style={{ width: 700, border: '2px solid', padding: 8 }}>
      <Row justify={'center'}>
        <Col span={8} style={{ paddingRight: 8 }}>
          <Input />
        </Col>
        <Col span={8}>
          <TextArea {...argTypes} />
        </Col>
      </Row>
    </div>
  );
};

export const ControlledTextArea = (argTypes: NTextArea.TProps): ReactNode => {
  const [value, setValue] = useState('');

  const handleChange: ComponentProps<typeof TextArea>['onChange'] = e => setValue(e.target.value);

  return (
    <>
      <TextArea {...argTypes} onChange={handleChange} value={value} />
      <br />
      Состояние: <span style={{ color: 'blue' }}>{value}</span>
    </>
  );
};

export const ReadonlyTextArea = (argTypes: NTextArea.TProps): ReactNode => {
  return <TextArea {...argTypes} />;
};

export const FloatingLabelTextArea = (argTypes: NTextArea.TProps): ReactNode => {
  const [value, setValue] = useState<string>('');

  return <TextArea {...argTypes} floatLabel title="текст" value={value} onChange={e => setValue(e.target.value)} />;
};

DefaultTextArea.args = {
  autoSize: true,
  height: 'auto',
  onChange: fn(),
};

AutoSizeTextArea.args = {
  autoSize: { minRows: 2, maxRows: 6 },
  onChange: fn(),
  isAllowClear: true,
};

CountingTextArea.args = {
  maxLength: 100,
  onChange: fn(),
  showCount: true,
};

NoStretchTextArea.args = {
  autoSize: { maxRows: 6 },
  isTopContent: true,
};

ControlledTextArea.args = {};

ReadonlyTextArea.args = {
  defaultValue: 'Введенное значение',
  readOnly: true,
};
