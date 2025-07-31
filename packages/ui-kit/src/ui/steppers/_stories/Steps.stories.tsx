import { ReactNode } from 'react';

import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { NSteppers } from '../models';
import { Steps } from '../Steps';

export default {
  title: 'Axenix UI/Steps/Steps',
  args: {
    current: 1,
    onChange: fn(),
  },
  argTypes: {
    current: { control: 'number' },
    status: { control: 'radio', options: ['wait', 'process', 'finish', 'error'] },
    direction: { control: 'radio', options: ['horizontal', 'vertical'] },
    progressDot: { control: 'boolean' },
    percent: { control: 'number' },
    items: { control: 'object' },
    onChange: fn(),
  },
  component: Steps,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Steps>;

export const Default = (argTypes: NSteppers.TProps): ReactNode => {
  return <Steps {...argTypes} />;
};

export const Vertical = (argTypes: NSteppers.TProps): ReactNode => {
  return <Steps {...argTypes} direction="vertical" />;
};

export const WithProgressDot = (argTypes: NSteppers.TProps): ReactNode => {
  return <Steps {...argTypes} progressDot />;
};

export const CustomStatus = (argTypes: NSteppers.TProps): ReactNode => {
  return <Steps {...argTypes} status="error" />;
};

Default.args = {
  items: [
    { title: 'Step 1', description: 'Description 1' },
    { title: 'Step 2', description: 'Description 2' },
    { title: 'Step 3', description: 'Description 3' },
  ],
};

Vertical.args = {
  ...Default.args,
  direction: 'vertical',
};

WithProgressDot.args = {
  ...Default.args,
  progressDot: true,
};

CustomStatus.args = {
  ...Default.args,
  status: 'error',
};
