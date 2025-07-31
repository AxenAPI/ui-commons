import { SearchOutlined } from '@ant-design/icons';

import { NButton } from '../models';

export const ARG_TYPES = {
  children: { control: 'text' },
  type: { control: 'select', options: ['default', 'primary', 'dashed', 'link', 'text'] as NButton.TButtonType[] },
  icon: { control: 'select', options: ['none', 'icon'], mapping: { none: null, icon: <SearchOutlined /> } },
  size: { control: 'select', options: ['small', 'middle', 'large'] as NButton.TSize[] },
  shape: { control: 'select', options: ['default', 'circle', 'round'] as NButton.TButtonShape[] },
  isDisabled: { control: 'boolean' },
  isLoading: { control: 'boolean' },
  className: { control: 'text' },
  title: { control: 'text' },
  tooltip: { control: 'text' },
  isBlock: { control: 'boolean' },
  iconPosition: { control: 'select', options: ['start', 'end'] as NButton.TIconPosition[] },
  style: { control: 'object' },
  'data-*': { control: 'object' },
} as const;
