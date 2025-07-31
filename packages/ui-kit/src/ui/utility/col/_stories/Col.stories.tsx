import { Meta, StoryFn } from '@storybook/react';

import { Row } from '@/ui';

import { Col, TColProps } from '../index';

import styles from './styles.module.css';

const meta: Meta<TColProps> = {
  title: 'Axenix UI/Col/Col',
  component: Col,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
    span: { control: 'text' },
    flex: { control: 'text' },
    offset: { control: 'text' },
    order: { control: 'text' },
    pull: { control: 'text' },
  },
} satisfies Meta<typeof Col>;

export default meta;

const Template: StoryFn<TColProps> = (args: TColProps) => (
  <Row className={styles.rowStyles}>
    <Col {...args} span={24} className={styles.colStyles}>
      {'Col'}
    </Col>
  </Row>
);

export const Default = Template.bind({});
export const Sizes: StoryFn<TColProps> = (args: TColProps) => {
  return (
    <>
      <Row className={styles.rowStyles}>
        <Col span={24} {...args} className={styles.colStyles}>
          col-24
        </Col>
      </Row>
      <Row className={styles.rowStyles}>
        <Col span={12} {...args} className={styles.colStyles}>
          col-12
        </Col>
        <Col span={12} {...args} className={styles.colStyles}>
          col-12
        </Col>
      </Row>
      <Row className={styles.rowStyles}>
        <Col span={8} {...args} className={styles.colStyles}>
          col-8
        </Col>
        <Col span={8} {...args} className={styles.colStyles}>
          col-8
        </Col>
        <Col span={8} {...args} className={styles.colStyles}>
          col-8
        </Col>
      </Row>
      <Row className={styles.rowStyles}>
        <Col span={6} {...args} className={styles.colStyles}>
          col-6
        </Col>
        <Col span={6} {...args} className={styles.colStyles}>
          col-6
        </Col>
        <Col span={6} {...args} className={styles.colStyles}>
          col-6
        </Col>
        <Col span={6} {...args} className={styles.colStyles}>
          col-6
        </Col>
      </Row>
    </>
  );
};

export const Offset: StoryFn<TColProps> = (args: TColProps) => {
  return (
    <>
      <Row className={styles.rowStyles}>
        <Col span={6} {...args} className={styles.colStyles}>
          col-6
        </Col>
        <Col span={6} {...args} className={styles.colOffset} offset={6}>
          col-6
        </Col>
      </Row>
      <Row className={styles.rowStyles}>
        <Col span={8} {...args} className={styles.colStyles}>
          col-8
        </Col>
        <Col span={8} {...args} className={styles.colStyles} offset={8}>
          col-8
        </Col>
        <Col span={8} {...args} className={styles.colOffset} offset={8}>
          col-8
        </Col>
      </Row>
    </>
  );
};
