import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { Link } from '@/ui/typography/link/Link';

import { NTypography } from '../models';

export default {
  title: 'Axenix UI/Typography/Link',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    style: { control: 'object' },
    isEditable: { control: 'boolean' },
    isCopyable: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isEllipsis: { control: 'boolean' },
    isCode: { control: 'boolean' },
    isMark: { control: 'boolean' },
    isDelete: { control: 'boolean' },
    isUnderline: { control: 'boolean' },
    isKeyboard: { control: 'boolean' },
    isStrong: { control: 'boolean' },
    isItalic: { control: 'boolean' },
  },
  component: Link,
  tags: ['autodocs'],
} as Meta<typeof Link>;

export const DefaultLink = (argTypes: NTypography.TLinkProps): ReactNode => {
  return <Link {...argTypes}>This is a link</Link>;
};

export const DisabledLink = (argTypes: NTypography.TLinkProps): ReactNode => {
  return <Link {...argTypes}>This is a link</Link>;
};

export const DeleteLink = (argTypes: NTypography.TLinkProps): ReactNode => {
  return <Link {...argTypes}>This is a link</Link>;
};

DisabledLink.args = { isDisabled: true };

DeleteLink.args = { isDelete: true };
