import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { Button, Text } from '@/ui';

import { NPageSpinner } from '../models';
import { PageSpinner } from '../PageSpinner';

import styles from './styles.module.css';

const withWrapper = (Story: any) => <div className={styles.wrapper}>{Story()}</div>;

export default {
  title: 'Axenix UI/Loading/PageSpinner',
  component: PageSpinner,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isFullscreen: { control: 'boolean' },
    delay: { control: 'number' },
    size: { control: 'text' },
  },
} as Meta<typeof PageSpinner>;

export const DefaultSpinner = (argTypes: NPageSpinner.TProps): ReactNode => {
  return <PageSpinner {...argTypes} />;
};
DefaultSpinner.storyName = 'Default spinner';

export const SmallSpinner = (argTypes: NPageSpinner.TProps): ReactNode => {
  return <PageSpinner {...argTypes} />;
};
SmallSpinner.storyName = 'Small spinner';
SmallSpinner.args = {
  size: 'small',
};

export const LargeSpinner = (argTypes: NPageSpinner.TProps): ReactNode => {
  return <PageSpinner {...argTypes} />;
};
LargeSpinner.storyName = 'Large spinner';
LargeSpinner.args = {
  size: 'large',
};

export const DelaySpinner = (argTypes: NPageSpinner.TProps): ReactNode => {
  return <PageSpinner {...argTypes} />;
};
DelaySpinner.storyName = 'Delay spinner';
DelaySpinner.args = {
  delay: 1000,
};

export const FullscreenSpinner = (argTypes: NPageSpinner.TProps): ReactNode => {
  return <PageSpinner {...argTypes} />;
};
FullscreenSpinner.storyName = 'Fullscreen spinner';
FullscreenSpinner.args = {
  isFullscreen: true,
};
FullscreenSpinner.parameters = {
  layout: 'fullscreen',
};
FullscreenSpinner.decorators = [withWrapper];

export const FullContent = (argTypes: NPageSpinner.TProps): ReactNode => {
  return (
    <>
      <Button onClick={() => alert('Доступно для нажатия')}>Доступный контент для взаимодействия</Button>
      <div style={{ width: 300, height: 300, marginTop: 24, padding: 12, border: '1px solid', position: 'relative' }}>
        <PageSpinner {...argTypes} />
        <Button onClick={() => alert('Не доступно для нажатия')}>Кнопка</Button>
        <Text>Заблокированный контнет</Text>
      </div>
    </>
  );
};

FullContent.storyName = 'Full content spinner';
FullContent.args = {
  isFullContent: true,
};
