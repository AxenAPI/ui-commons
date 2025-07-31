import { Meta, StoryFn } from '@storybook/react';

import { Text } from '@/ui/typography/text/Text';

import { NTypography } from '../models';

export default {
  title: 'Axenix UI/Typography/Text',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    style: { control: 'object' },
    isEditable: { control: 'boolean' },
    isCopyable: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isCode: { control: 'boolean' },
    isMark: { control: 'boolean' },
    isDelete: { control: 'boolean' },
    isUnderline: { control: 'boolean' },
    isKeyboard: { control: 'boolean' },
    isStrong: { control: 'boolean' },
    isItalic: { control: 'boolean' },
  },
  component: Text,
  tags: ['autodocs'],
} as Meta<typeof Text>;

const Template: StoryFn<NTypography.TTextProps> = argTypes => {
  return <Text {...argTypes}>This is a text</Text>;
};

export const DefaultText = Template.bind({});
export const CodeText = Template.bind({});
export const KeyboardText = Template.bind({});
export const MarkText = Template.bind({});
export const DeleteText = Template.bind({});

CodeText.args = {
  isCode: true,
};

KeyboardText.args = {
  isKeyboard: true,
};

MarkText.args = {
  isMark: true,
};

DeleteText.args = {
  isDelete: true,
};
