import React from 'react';

import type { Preview } from '@storybook/react';

import { ThemeProvider } from '../src/providers/theme-provider';
import '../src/styles';
import theme from './themes/Axenix';

import './style.css';

const preview: Preview = {
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme,
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
};

export default preview;
