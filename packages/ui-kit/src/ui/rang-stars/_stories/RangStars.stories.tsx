import { ReactNode } from 'react';

import { useArgs } from '@storybook/preview-api';
import { Meta } from '@storybook/react';

import { NRangStars } from '../models';
import { RangStars } from '../RangStars';

export default {
  title: 'Axenix UI/RangStars/RangStars',
  component: RangStars,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'number' },
    max: { control: 'number' },
    readOnly: { control: 'boolean' },
    lockAfterSelect: { control: 'boolean' },
  },
  args: {
    value: 0,
    max: 5,
    readOnly: false,
    lockAfterSelect: false,
  },
} as Meta<typeof RangStars>;

export const Default = (): ReactNode => {
  const [{ value, ...args }, updateArgs] = useArgs<NRangStars.TProps>();
  return <RangStars {...args} value={value} onChange={v => updateArgs({ value: v })} />;
};

export const ReadOnly = (): ReactNode => {
  const [{ value, ...args }, updateArgs] = useArgs();
  return <RangStars {...args} value={value} onChange={v => updateArgs({ value: v })} />;
};

export const LockAfterSelect = (): ReactNode => {
  const [{ value, ...args }, updateArgs] = useArgs<NRangStars.TProps>();
  return <RangStars {...args} value={value} onChange={v => updateArgs({ value: v })} />;
};

export const CustomMax = (): ReactNode => {
  const [{ value, max, ...args }, updateArgs] = useArgs<NRangStars.TProps>();
  return <RangStars {...args} value={value} max={max} onChange={v => updateArgs({ value: v })} />;
};

Default.args = {
  value: 0,
  max: 5,
  readOnly: false,
  lockAfterSelect: false,
};

ReadOnly.args = {
  value: 3,
  max: 5,
  readOnly: true,
  lockAfterSelect: false,
};

LockAfterSelect.args = {
  value: 0,
  max: 5,
  readOnly: false,
  lockAfterSelect: true,
};

CustomMax.args = {
  value: 0,
  max: 10,
  readOnly: false,
  lockAfterSelect: false,
};
