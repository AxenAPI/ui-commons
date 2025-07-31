import { Meta, StoryFn } from '@storybook/react';

import { Col, RowProps } from 'antd';

import { Row } from '../';

import styles from './Row.module.css';

export default {
  title: 'Axenix UI/Row/Row',
  component: Row,
  args: {
    wrap: true,
    gutter: [16, 16],
    justify: 'start',
    align: 'top',
  },
  argTypes: {
    wrap: { control: 'boolean' },
    gutter: { control: 'object' },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'],
    },
    align: {
      control: 'select',
      options: ['top', 'middle', 'bottom', 'stretch'],
    },
    className: { control: 'text' },
    style: { control: 'object' },
  },
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Row>;

const Template: StoryFn<RowProps> = args => (
  <Row {...args}>
    <Col span={6} className={styles.col}>
      Column 1
    </Col>
    <Col span={6} className={styles.col}>
      Column 2
    </Col>
    <Col span={6} className={styles.col}>
      Column 3
    </Col>
  </Row>
);

export const Default = Template.bind({});
Default.args = {
  wrap: true,
  gutter: [16, 16],
  justify: 'start',
  align: 'top',
};

export const JustifyCenter = Template.bind({});
JustifyCenter.args = {
  ...Default.args,
  justify: 'center',
};

export const AlignMiddle = Template.bind({});
AlignMiddle.args = {
  ...Default.args,
  align: 'middle',
};
