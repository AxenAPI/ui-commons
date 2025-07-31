import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { Divider } from '../Divider';
import { NDivider } from '../models';
import { DIVIDER_ORIENTATION } from './consts';

import styles from './styles.module.css';

const withWrapper = (Story: any) => <div className={styles.wrapper}>{Story()}</div>;

export default {
  title: 'Axenix UI/Dividers/Divider',
  component: Divider,
  decorators: [withWrapper],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: { control: { type: 'select', options: ['horizontal', 'vertical'] } },
    orientation: { control: { type: 'select', options: ['left', 'right', 'center'] } },
    isDashed: { control: 'boolean' },
    isPlain: { control: 'boolean' },
    children: { control: 'text' },
  },
} as Meta<typeof Divider>;

export const DefaultDivider = (argTypes: NDivider.TProps): ReactNode => {
  return <Divider {...argTypes} />;
};
DefaultDivider.args = {
  type: 'horizontal',
  isPlain: true,
};

export const DividerOrientation = (argTypes: NDivider.TProps): ReactNode => {
  return DIVIDER_ORIENTATION.map(type => <Divider {...argTypes} key={type} orientation={type} />);
};
DividerOrientation.args = {
  ...DefaultDivider.args,
  children: `Divider`,
};

export const VerticalDivider = (argTypes: NDivider.TProps): ReactNode => {
  return (
    <>
      <span>Link1</span>
      <Divider {...argTypes} />
      <span>Link2</span>
      <Divider {...argTypes} />
      <span>Link3</span>
      <Divider {...argTypes} />
    </>
  );
};
VerticalDivider.args = {
  type: 'vertical',
  isPlain: true,
  children: `Divider`,
};

export const DashedDivider = (argTypes: NDivider.TProps): ReactNode => {
  return <Divider {...argTypes} />;
};
DashedDivider.args = {
  ...DefaultDivider.args,
  isDashed: true,
  children: `Dashed Divider`,
};
