import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { Paragraph } from '@/ui/typography/paragraph/Paragraph';

import { NTypography } from '../models';

export default {
  title: 'Axenix UI/Typography/Paragraph',
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
  component: Paragraph,
  tags: ['autodocs'],
} as Meta<typeof Paragraph>;

export const DefaultParagraph = (argTypes: NTypography.TParagraphProps): ReactNode => {
  return <Paragraph {...argTypes}>This is a paragraph</Paragraph>;
};
