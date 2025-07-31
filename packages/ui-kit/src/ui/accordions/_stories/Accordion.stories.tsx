import { ReactNode } from 'react';

import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { Accordion, NAccordion } from '../accordion';
import { ITEMS, SIZE_TYPE } from '../consts';

const newItems = structuredClone(ITEMS);
newItems[0].showArrow = false;

export default {
  title: 'Axenix UI/Accordions/Accordion',
  args: {
    onChange: fn(),
  },
  argTypes: {
    isGhost: { control: 'boolean' },
    collapsible: { control: 'select', options: ['header', 'icon', 'disabled'] },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    showArrow: { control: 'boolean' },
    defaultActiveKey: { control: 'object' },
    onChange: fn(),
  },
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Accordion>;

export const Default = (argTypes: NAccordion.TProps): ReactNode => {
  return <Accordion {...argTypes} items={ITEMS} style={{ width: 350 }} />;
};

export const SizeVariants = (argTypes: NAccordion.TProps): ReactNode => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {SIZE_TYPE.map(size => (
        <Accordion {...argTypes} key={size} items={ITEMS} size={size} style={{ width: 350 }} />
      ))}
    </div>
  );
};

export const IsGhost = (argTypes: NAccordion.TProps): ReactNode => {
  return <Accordion {...argTypes} items={ITEMS} style={{ width: 350 }} />;
};

export const Collapsible = (argTypes: NAccordion.TProps): ReactNode => {
  return <Accordion {...argTypes} items={ITEMS} style={{ width: 350 }} />;
};

export const ShowArrow = (argTypes: NAccordion.TProps): ReactNode => {
  return <Accordion {...argTypes} items={newItems} style={{ width: 350 }} />;
};

Default.args = {
  defaultActiveKey: ['2'],
};

SizeVariants.args = {
  ...Default.args,
};

IsGhost.args = {
  ...Default.args,
  isGhost: true,
};

Collapsible.args = {
  ...Default.args,
  collapsible: 'icon',
};

ShowArrow.args = {
  ...Default.args,
};
