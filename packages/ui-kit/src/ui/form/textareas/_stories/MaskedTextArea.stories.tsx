import { ReactNode } from 'react';

import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { Col, Input, Row } from '@/ui';
import { NTextArea } from '@/ui/form/textareas/models.ts';

import { MaskedTextArea } from '../MaskedTextArea';

export default {
  title: 'Axenix UI/Form/TextAreas/MaskedTextArea',
  component: MaskedTextArea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: fn(),
  },
  args: { onChange: fn() },
} as Meta<typeof MaskedTextArea>;

export const DefaultTextArea = (argTypes: NTextArea.TMaskedProps): ReactNode => {
  return <MaskedTextArea {...argTypes} />;
};

export const AutoSizeTextArea = (argTypes: NTextArea.TMaskedProps): ReactNode => {
  return <MaskedTextArea {...argTypes} />;
};

export const NoStretchTextArea = (argTypes: NTextArea.TMaskedProps): ReactNode => {
  return (
    <div style={{ width: 700, border: '2px solid', padding: 8 }}>
      <Row justify={'center'}>
        <Col span={8} style={{ paddingRight: 8 }}>
          <Input />
        </Col>
        <Col span={3}>
          <MaskedTextArea {...argTypes} />
        </Col>
      </Row>
    </div>
  );
};

DefaultTextArea.args = {
  autoSize: true,
  height: 'auto',
  onChange: fn(),
  mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  placeholder: 'Введите индекс',
};

AutoSizeTextArea.args = {
  autoSize: { minRows: 2, maxRows: 3 },
  onChange: fn(),
  mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  placeholder: 'Введите индекс',
  isAllowClear: true,
};

NoStretchTextArea.args = {
  autoSize: { maxRows: 6 },
  isTopContent: true,
  mask: ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  placeholder: 'Введите номер телефона',
};
