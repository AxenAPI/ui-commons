import { fn } from '@storybook/test';

import { NDateTime } from '../../_common/models';

export const ARG_TYPES = {
  isLoading: { control: 'boolean' },
  isAllowClear: { control: 'boolean' },
  autoFocus: { control: 'boolean' },
  className: { control: 'text' },
  format: { control: 'text' },
  isDisabled: { control: 'boolean' },
  isDisabledDate: { control: false },
  isOpen: { control: 'boolean' },
  isReadonly: { control: 'boolean' },
  locale: { control: 'select', options: ['en', 'ru', 'es', 'fr', 'de'] },
  minDate: { control: 'date' },
  maxDate: { control: 'date' },
  mode: { control: 'select', options: ['date', 'month', 'year'] },
  needConfirm: { control: 'boolean' },
  picker: { control: 'select', options: ['date', 'week', 'month', 'quarter', 'year'] as NDateTime.EPicker[] },
  placeholder: { control: 'text' },
  placement: { control: 'select', options: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'] },
  size: { control: 'select', options: ['small', 'middle', 'large'] },
  status: { control: 'select', options: ['error', 'warning', 'success', 'info'] },
  variant: { control: 'select', options: ['outlined', 'filled', 'standard'] },
} as const;

export const DEFAULT_ARGS = {
  onChange: fn(),
  onOk: fn(),
};
