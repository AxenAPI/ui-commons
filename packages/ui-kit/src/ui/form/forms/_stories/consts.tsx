import { NFormItem } from '../models';

export const ARG_TYPES = {
  className: { control: 'text' },
  children: { control: 'text' },
  layout: { control: 'select', options: ['horizontal', 'vertical'] as NFormItem.TProps[] },
  label: { control: 'text' },
  isRequired: { control: 'boolean' },
  requiredMarkPosition: { control: 'select', options: ['left', 'right'] as NFormItem.TProps[] },
  help: { control: 'text' },
  tooltip: { control: 'text' },
} as const;
