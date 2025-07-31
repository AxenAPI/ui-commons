import { fn } from '@storybook/test';

export const ARG_TYPES = {
  style: { control: 'object' },
  isAllowClear: { control: 'boolean' },
  children: { control: 'object' },
  isDefaultOpen: { control: 'boolean' },
  defaultValue: { control: 'text' },
  isDisabled: { control: 'boolean' },
  popupClassName: { control: 'text' },
  dropdownMatchSelectWidth: { control: 'object' },
  notFoundContent: { control: 'object' },
  isOpen: { control: 'boolean' },
  placeholder: { control: 'text' },
  status: { control: 'select', options: ['error', 'warning', ''] },
  variant: { control: 'select', options: ['outlined', 'borderless', 'filled'] },
} as const;

export const DEFAULT_ARGS = {
  onBlur: fn(),
  onFocus: fn(),
  onChange: fn(),
  onSelect: fn(),
  onSearch: fn(),
  onDropdownVisibleChange: fn(),
};
