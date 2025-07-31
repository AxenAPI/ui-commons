import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/ui';

import { NSpace, Space } from '../index';

import styles from './styles.module.css';

const meta: Meta<NSpace.TProps> = {
  title: 'Axenix UI/Space/Space',
  component: Space,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
    wrap: { control: 'boolean' },
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    align: { control: 'select', options: ['center', 'start', 'end', 'baseline'] },
  },
} satisfies Meta<typeof Space>;

export default meta;

const Template: StoryFn<NSpace.TProps> = (args: NSpace.TProps) => {
  return (
    <div className={styles.spaceAlignDefaultBlock}>
      <Space {...args}>
        <span>Space</span>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Space>
    </div>
  );
};

export const Default = Template.bind({});

export const Align: StoryFn<NSpace.TProps> = (args: NSpace.TProps) => {
  return (
    <div className={styles.spaceAlignContainer}>
      <div className={styles.spaceAlignBlock}>
        <Space align="center" {...args}>
          center
          <Button type="primary">Primary</Button>
          <span className={styles.mockBlock}>Block</span>
        </Space>
      </div>
      <div className={styles.spaceAlignBlock}>
        <Space align="start" {...args}>
          start
          <Button type="primary">Primary</Button>
          <span className={styles.mockBlock}>Block</span>
        </Space>
      </div>
      <div className={styles.spaceAlignBlock}>
        <Space align="end" {...args}>
          end
          <Button type="primary">Primary</Button>
          <span className={styles.mockBlock}>Block</span>
        </Space>
      </div>
      <div className={styles.spaceAlignBlock}>
        <Space align="baseline" {...args}>
          baseline
          <Button type="primary">Primary</Button>
          <span className={styles.mockBlock}>Block</span>
        </Space>
      </div>
    </div>
  );
};
