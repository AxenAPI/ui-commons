import { Meta, StoryFn } from '@storybook/react';

import { NBreadcrumb } from '@/ui';

import { Breadcrumbs } from '../Breadcrumbs';
import {
  DEFAULT_ITEMS,
  INDEPENDENT_SEPARATOR,
  LAST_CRUMB_TITLE_WITH_ICON_ITEMS,
  WITH_ICON_ITEMS,
  WITH_MENU_ITEMS,
} from './consts';

const meta: Meta<NBreadcrumb.TProps> = {
  title: 'Axenix UI/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<NBreadcrumb.TProps> = (args: NBreadcrumb.TProps) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});

export const WithIcon = Template.bind({});

export const Separator = Template.bind({});

export const WithMenu = Template.bind({});

export const IndependentSeparator = Template.bind({});

export const LastCrumbBold = Template.bind({});

export const LastCrumbBoldWithIcon = Template.bind({});

Default.args = {
  items: DEFAULT_ITEMS,
};

WithIcon.args = {
  items: WITH_ICON_ITEMS,
};

Separator.args = {
  ...Default.args,
  separator: '>',
};

WithMenu.args = {
  items: WITH_MENU_ITEMS,
};

IndependentSeparator.args = {
  separator: '',
  items: INDEPENDENT_SEPARATOR,
};

LastCrumbBold.args = {
  ...Default.args,
  isLastCrumbBold: true,
};

LastCrumbBoldWithIcon.args = {
  items: LAST_CRUMB_TITLE_WITH_ICON_ITEMS,
  isLastCrumbBold: true,
};
