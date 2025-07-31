import reactDocgen from '@joshwooding/vite-plugin-react-docgen-typescript';
import type { StorybookConfig } from '@storybook/react-vite';

import { dirname, join } from 'path';
import * as path from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

export const viteFinal = config => {
  return {
    ...config,
    resolve: {
      alias: {
        'axenix/ui-kit': path.resolve(__dirname, '../ui-kit/src'),
      },
    },
    plugins: [...config.plugins.filter(plugin => plugin.name !== 'storybook:react-docgen-plugin'), reactDocgen()],
  };
};

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../hooks/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../hooks//src/**/*.mdx',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/blocks'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  typescript: {
    reactDocgen: false,
  },
};
export default config;
