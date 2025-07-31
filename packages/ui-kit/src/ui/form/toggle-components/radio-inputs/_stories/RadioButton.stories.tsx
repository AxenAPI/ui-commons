import { ReactNode, useEffect, useState } from 'react';

import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { NRadio } from '../models';
import { RadioButton } from '../RadioButton';

export default {
  title: 'Axenix UI/Form/Toggle Components/Radio/Radio Button',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isChecked: { control: 'boolean' },
    onChange: fn(),
  },
  args: { onChange: fn() },
} as Meta<typeof RadioButton>;

export const Default = (argTypes: NRadio.TProps): ReactNode => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (argTypes.isChecked !== isChecked) {
      setIsChecked(argTypes.isChecked || false);
    }
  }, [argTypes.isChecked, isChecked]);

  function handleOnChange(event: NRadio.TRadioChangeEvent) {
    setIsChecked(!isChecked);
    if (typeof argTypes.onChange === 'function') {
      argTypes.onChange(event);
    }
  }

  return <RadioButton {...argTypes} isChecked={isChecked} onChange={handleOnChange} />;
};

export const Disabled = (argTypes: NRadio.TProps) => {
  return <RadioButton {...argTypes} />;
};

Default.args = {
  children: 'Radio Button',
  isChecked: false,
};

Disabled.args = {
  children: 'Radio Button',
  isDisabled: true,
};
