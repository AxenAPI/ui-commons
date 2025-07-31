import { Meta, StoryFn } from '@storybook/react';
import { IconArrowLeft } from '@tabler/icons-react';

import { Space } from 'antd';

import { Icon, TIconProps } from '../Icon';

const meta: Meta<TIconProps> = {
  title: 'Axenix UI/Icons/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: { control: 'select', options: ['default', 'primary'] },
    size: { control: 'number' },
    icon: { control: 'object' },
    style: { control: 'object' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Icon>;

export default meta;

const Template: StoryFn<TIconProps> = (args: TIconProps) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <IconArrowLeft />,
};

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  icon: <IconArrowLeft />,
};

export const Sizes: StoryFn<TIconProps> = (args: TIconProps) => {
  return (
    <Space>
      <Icon {...args} size={16} icon={<IconArrowLeft />} />
      <Icon {...args} size={24} icon={<IconArrowLeft />} />
      <Icon {...args} size={32} icon={<IconArrowLeft />} />
    </Space>
  );
};

export const CustomStyles: StoryFn<TIconProps> = (args: TIconProps) => {
  return (
    <Space>
      <Icon {...args} style={{ color: 'red', backgroundColor: 'beige' }} icon={<IconArrowLeft />} />
      <Icon
        {...args}
        style={{ color: 'blue', border: '1px blue solid', borderRadius: '50%' }}
        icon={<IconArrowLeft />}
      />
      <Icon {...args} style={{ color: 'green' }} icon={<IconArrowLeft />} />
    </Space>
  );
};
