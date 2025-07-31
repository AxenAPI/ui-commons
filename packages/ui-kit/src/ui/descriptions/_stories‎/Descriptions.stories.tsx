import { Meta, StoryFn } from '@storybook/react';

import { Descriptions, NDescriptions } from '@/ui';

import { ITEMS, STATUS_ITEMS } from './consts.tsx';

const meta: Meta<NDescriptions.TDescriptionsProps> = {
  title: 'Axenix UI/Descriptions/Descriptions',
  component: Descriptions,
  argTypes: {
    title: { control: 'text' },
    isBordered: { control: 'boolean' },
    isWithColon: { control: 'boolean' },
    layout: { control: 'radio', options: ['vertical', 'horizontal'] },
    size: { control: 'radio', options: ['default', 'small', 'middle'] },
  },
} satisfies Meta<typeof Descriptions>;
export default meta;

const Template: StoryFn<NDescriptions.TDescriptionsProps> = args => {
  return (
    <div>
      <Descriptions items={ITEMS} {...args} />
    </div>
  );
};
export const Default = Template.bind({});
export const MiddleSize = Template.bind({});

MiddleSize.args = { size: 'middle' };
export const SmallSize = Template.bind({});
SmallSize.args = { size: 'small' };
export const Vertical = Template.bind({});

Vertical.args = { layout: 'vertical' };
export const WithStatus = Template.bind({});
WithStatus.args = { items: STATUS_ITEMS };
