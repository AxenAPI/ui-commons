export const ARG_TYPES = {
  children: { control: 'object' },
  items: {
    control: 'object',
    fields: {
      text: {
        control: 'text',
      },
      action: {
        control: {
          type: 'function',
        },
      },
    },
  },
  className: { control: 'text' },
  menuButtonClassName: { control: 'text' },
  style: { control: 'object' },
  'data-*': { control: 'object' },
} as const;