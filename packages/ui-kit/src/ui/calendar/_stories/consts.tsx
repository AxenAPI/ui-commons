export const ARG_TYPES = {
  defaultValue: { control: 'object' },
  isFullscreen: { control: 'boolean' },
  headerRender: { control: 'object' },
  locale: { control: 'object' },
  mode: { control: 'select', options: ['date', 'month', 'year'] },
  validRange: { control: 'object' },
  value: { control: 'object' },
} as const;
