import type { Meta, StoryFn } from '@storybook/react';
import { IconAlertCircle } from '@tabler/icons-react';

import { Tooltip } from 'antd';

import { Col, Icon, Row } from '@/ui/utility';

import { Input } from '../../inputs';
import { FormItem } from '../FormItem';
import { NFormItem } from '../models';
import { ARG_TYPES } from './consts';

import styles from './styles.module.css';

const meta = {
  title: 'Axenix UI/Forms/FormItem',
  component: FormItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: ARG_TYPES,
} satisfies Meta<typeof FormItem>;

export default meta;

const Template: StoryFn<NFormItem.TProps> = (args: NFormItem.TProps) => <FormItem {...args} />;

export const Default = Template.bind({});

export const WithCustomLabel = Template.bind({});

export const WithTooltip = Template.bind({});

export const WithRequired = Template.bind({});

export const WithOverflowLabel = (args: NFormItem.TProps) => (
  <div style={{ width: 200 }}>
    <Row>
      <Col span={24}>
        <FormItem {...args}>
          <Input />
        </FormItem>
      </Col>
    </Row>
  </div>
);

Default.args = {
  style: { width: 200 },
  label: 'Отображение текста',
  requiredMarkPosition: 'right',
};

WithCustomLabel.args = {
  ...Default.args,
  label: (
    <div className={styles.label}>
      Важная информация
      <Tooltip title="Очень важная информация при ховере или клике">
        <Icon icon={<IconAlertCircle />} size={16} />
      </Tooltip>
    </div>
  ),
};

WithTooltip.args = {
  ...Default.args,
  tooltip: 'Подсказка',
};

WithRequired.args = {
  ...Default.args,
  isRequired: true,
};

WithOverflowLabel.args = {
  isRequired: true,
  label: 'Длинный текст который не помещается в одну строку',
  layout: 'vertical',
};
