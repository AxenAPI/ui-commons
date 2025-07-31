import type { Meta, StoryFn } from '@storybook/react';

import { Dayjs } from 'dayjs';

import { ARG_TYPES } from '@/ui/calendar/_stories/consts.tsx';

import { Calendar, NCalendar } from '../index.ts';

const meta: Meta<NCalendar.TProps<Dayjs>> = {
  title: 'Axenix UI/Calendar/Calendar',
  component: Calendar,
  argTypes: ARG_TYPES,
} satisfies Meta<typeof Calendar>;

export default meta;

const Template: StoryFn<NCalendar.TProps<Dayjs>> = (args: NCalendar.TProps<Dayjs>) => <Calendar {...args} />;

export const Default = Template.bind({});
export const NotFullScreen = Template.bind({});
NotFullScreen.args = {
  isFullscreen: false,
};
