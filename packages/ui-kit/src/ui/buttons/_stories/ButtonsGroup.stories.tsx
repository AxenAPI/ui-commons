import type { Meta, StoryFn } from '@storybook/react';
import { IconSearch } from '@tabler/icons-react';

import { ButtonsGroup, TProps } from '../ButtonsGroup';

const meta: Meta<TProps> = {
  title: 'Axenix UI/ButtonsGroup/ButtonsGroup',
  component: ButtonsGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    buttonsConfig: [{ control: 'object' }],
  },
} satisfies Meta<typeof ButtonsGroup>;

export default meta;

const TemplateButtonsGroup: StoryFn<TProps> = (args: any) => <ButtonsGroup {...args} />;
export const DefaultButtonsGroup = TemplateButtonsGroup.bind({});
DefaultButtonsGroup.args = {
  buttonsConfig: [
    {
      isDisabled: false,
      isLoading: false,
      isBlock: false,
      icon: <IconSearch stroke={1.5} />,
      style: {},
      buttonKey: 'firstButton',
      onClick: () => {},
    },
    {
      isDisabled: false,
      isLoading: false,
      isBlock: false,
      icon: <IconSearch stroke={1.5} />,
      style: {},
      buttonKey: 'secondButton',
      onClick: () => {},
    },
    {
      children: 'Click me',
      type: 'primary',
      size: 'middle',
      shape: 'default',
      isDisabled: false,
      isLoading: false,
      className: 'custom-button',
      title: 'Button Title',
      tooltip: 'Button Tooltip',
      isBlock: false,
      icon: <IconSearch stroke={1.5} />,
      iconPosition: 'start',
      style: {},
      buttonKey: 'thirdButton',
      onClick: () => {},
    },
  ],
  style: { border: '2px solid green' },
};
