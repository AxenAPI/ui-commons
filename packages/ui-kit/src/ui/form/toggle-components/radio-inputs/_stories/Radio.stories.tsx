import { ReactNode, useState } from 'react';

import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { NRadio } from '../models';
import { Radio } from '../Radio';

export default {
  title: 'Axenix UI/Form/Toggle Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isChecked: { control: 'boolean' },
    isReadonly: { control: 'boolean' },
    onChange: fn(),
  },
  args: { onChange: fn() },
} as Meta<typeof Radio>;

export const Default = (argTypes: NRadio.TProps): ReactNode => {
  const [checked, setChecked] = useState<boolean>(false);

  function handleOnChange(event: NRadio.TRadioChangeEvent) {
    setChecked(!checked);
    if (typeof argTypes.onChange === 'function') {
      argTypes.onChange(event);
    }
  }

  return <Radio {...argTypes} isChecked={checked} onChange={handleOnChange} />;
};

export const Disabled = (argTypes: NRadio.TProps) => {
  return <Radio {...argTypes} />;
};

export const Readonly = (argTypes: NRadio.TProps) => {
  return <Radio {...argTypes} />;
};

Default.args = {
  children: 'Radio',
  isChecked: false,
};

Disabled.args = {
  children: 'Disabled radio',
  isChecked: false,
  isDisabled: true,
};

Readonly.args = {
  children: 'Radio',
  isChecked: true,
  isReadonly: true,
};
