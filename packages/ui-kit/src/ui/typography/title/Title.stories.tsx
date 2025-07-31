import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { Title } from '@/ui/typography/title/Title';

import { BASE_COLORS, TitleSizeVariations } from '../consts';
import { NTypography } from '../models';

export default {
  title: 'Axenix UI/Typography/Title',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    level: { control: 'number' },
    style: { control: 'object' },
    isEditable: { control: 'boolean' },
    isCopyable: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isCode: { control: 'boolean' },
    isMark: { control: 'boolean' },
    isDelete: { control: 'boolean' },
    isUnderline: { control: 'boolean' },
    isKeyboard: { control: 'boolean' },
    isItalic: { control: 'boolean' },
    isRemoveAllMargins: { control: 'boolean' },
  },
  component: Title,
  tags: ['autodocs'],
} as Meta<typeof Title>;

export const DefaultTitle = (argTypes: NTypography.TTitleProps): ReactNode => {
  return <Title {...argTypes}> Title </Title>;
};

export const ColorfulTitle = (argTypes: NTypography.TTitleProps): ReactNode => {
  return BASE_COLORS.map(color => (
    <Title key={color} {...argTypes} type={color}>
      This is a title
    </Title>
  ));
};

export const SizeVariationsTitle = (argTypes: NTypography.TTitleProps): ReactNode => {
  return TitleSizeVariations.map(size => (
    <Title key={size} {...argTypes} level={size}>
      This is a title
    </Title>
  ));
};

export const TitleWithoutMargins = (argTypes: NTypography.TTitleProps): ReactNode => {
  return <Title {...argTypes}> Title </Title>;
};

DefaultTitle.args = {
  level: 1,
  style: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
};

ColorfulTitle.args = {
  ...DefaultTitle.args,
};

SizeVariationsTitle.args = {
  ...DefaultTitle.args,
};

TitleWithoutMargins.args = {
  ...DefaultTitle.args,
  isRemoveAllMargins: true,
};
