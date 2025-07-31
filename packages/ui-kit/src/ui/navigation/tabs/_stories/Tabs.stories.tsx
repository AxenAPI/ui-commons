import { ReactNode } from 'react';

import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { Tabs } from '@/ui';
import {
  DEFAULT_ITEMS,
  DRAGGABLE_TABS_ITEMS,
  WITH_BADGE_ITEMS,
  WITH_EXTRA_ELEMENT_ITEMS,
  WITH_ICON_ITEMS,
} from '@/ui/navigation/tabs/_mock';

import { NTab } from '../models';
import TabsDraggable from '../TabsDraggable';

export default {
  title: 'Axenix UI/Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    items: { control: 'object' },
    activeKey: { control: 'text' },
    defaultActiveKey: { control: 'text' },
    direction: { control: { type: 'radio', options: ['ltr', 'rtl'] } },
    isAnimated: { control: 'boolean' },
    tabPosition: { control: { type: 'select', options: ['top', 'right', 'bottom', 'left'] } },
    type: { control: { type: 'select', options: ['line', 'card', 'editable-card'] } },
    size: { control: { type: 'select', options: ['small', 'middle', 'large'] } },
    isCentered: { control: 'boolean' },
    children: { control: 'object' },
    onChange: fn(),
    indicator: { control: 'object' },
    tabBarStyle: { control: 'object' },
  },
} as Meta<typeof Tabs>;

export const Default = (argTypes: NTab.TProps): ReactNode => {
  return <Tabs {...argTypes} />;
};
Default.args = {
  defaultActiveKey: '1',
  direction: 'ltr',
  isAnimated: true,
  tabBarStyle: { width: '250px' },
  isCentered: true, // Do not use with long tabs names or in compact mode
  items: DEFAULT_ITEMS,
};

export const WithBadge = (argTypes: NTab.TProps): ReactNode => {
  return <Tabs {...argTypes} />;
};
WithBadge.args = {
  ...Default.args,
  items: WITH_BADGE_ITEMS,
};

export const WithIndicatorCenter = (argTypes: NTab.TProps): ReactNode => {
  return <Tabs {...argTypes} />;
};
WithIndicatorCenter.args = {
  ...Default.args,
  indicator: { size: (origin: number) => origin - 20, align: 'center' },
};

export const WithCardType = (argTypes: NTab.TProps): ReactNode => {
  return <Tabs {...argTypes} />;
};
WithCardType.args = {
  ...Default.args,
  type: 'card',
};

export const WithIcon = (argTypes: NTab.TProps): ReactNode => {
  return <Tabs {...argTypes} />;
};
WithIcon.args = {
  ...Default.args,
  items: WITH_ICON_ITEMS,
};

export const WithExtraElement = (argTypes: NTab.TProps): ReactNode => {
  return (
    <div style={{ width: '100px' }}>
      <Tabs {...argTypes} />
    </div>
  );
};

WithExtraElement.args = {
  ...Default.args,
  isCentered: false,
  items: WITH_EXTRA_ELEMENT_ITEMS,
};

export const DraggableTabs = (argTypes: NTab.TProps): ReactNode => {
  return <TabsDraggable {...argTypes} />;
};

DraggableTabs.args = {
  ...Default.args,
  items: DRAGGABLE_TABS_ITEMS,
};
