import type { Meta, StoryFn } from '@storybook/react';

import { ARG_TYPES } from './consts';
import {BurgerMenu} from "@/ui";
import {NBurgerMenu} from "@/ui/burger-menu/models.ts";

const meta: Meta<NBurgerMenu.TProps> = {
  title: 'Axenix UI/BurgerMenu/BurgerMenu',
  component: BurgerMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: ARG_TYPES,
} satisfies Meta<typeof BurgerMenu>;

export default meta;

const Template: StoryFn<NBurgerMenu.TProps> = args => <BurgerMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      text: 'Save',
      action: () => {},
    },
    {
      text: 'Export',
      action: () => {},
    }],
  color: 'black',
  children: 'Your content',
  className: 'custom-burger-menu',
  menuButtonClassName: '',
  style: {},
};