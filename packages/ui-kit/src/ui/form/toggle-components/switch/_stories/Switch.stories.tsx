import { CSSProperties, ReactNode } from 'react';

import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { NSwitch } from '@/ui/form/toggle-components/switch/models';

import { Switch } from '../Switch';

const box: CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
};

export default {
  title: 'Axenix UI/Form/Toggle Components/Switch/Switch',
  argTypes: {
    onChange: () => {},
    onClick: () => {},
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    isChecked: { control: 'boolean' },
    title: { control: 'text' },
  },
  component: Switch,
  args: { onChange: fn() },
} as Meta<typeof Switch>;

export const Default = (argTypes: NSwitch.TProps): ReactNode => {
  return (
    <div style={box}>
      <Switch {...argTypes} />
    </div>
  );
};

export const Disabled = (argTypes: NSwitch.TProps): ReactNode => {
  return (
    <div style={box}>
      <Switch {...argTypes} />
    </div>
  );
};

export const WithLabel = (argTypes: NSwitch.TProps): ReactNode => {
  return (
    <div style={box}>
      <Switch {...argTypes} title="Неактивный Switch" isChecked={false} />
      <Switch {...argTypes} title="Активный Switch" isChecked={true} />
      <Switch {...argTypes} title="Заблокированный Switch" isDisabled={true} />
    </div>
  );
};

Disabled.args = {
  isDisabled: true,
};
