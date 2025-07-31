/* eslint-disable react/display-name */
import { FC } from 'react';

import { Meta } from '@storybook/react';

import { GlobalNotificationProvider, useNotificationsApi } from '@/providers';
import { Button } from '@/ui';

type TNotificationType = 'success' | 'info' | 'warning' | 'error' | 'open';

export default {
  title: 'Axenix UI/Notification/useNotificationsApi',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showBtnTitleOnTheSameLine: { control: 'boolean' },
  },
} as Meta<typeof useNotificationsApi>;

const withContext = (Component: FC) => () => (
  <GlobalNotificationProvider>
    <Component />
  </GlobalNotificationProvider>
);

export const Default = withContext(() => {
  const api = useNotificationsApi();

  const openNotification = (type: TNotificationType) => {
    api[type]({
      message: 'Notification title',
      description: 'This is the content of the notification',
      btn: (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button type="text" onClick={() => api.destroy()}>
            Button
          </Button>
          <Button type="primary" onClick={() => api.destroy()}>
            Button
          </Button>
        </div>
      ),
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Button onClick={() => openNotification('open')}>open</Button>
      <Button onClick={() => openNotification('info')}>info</Button>
      <Button onClick={() => openNotification('success')}>success</Button>
      <Button onClick={() => openNotification('warning')}>warning</Button>
      <Button onClick={() => openNotification('error')}>error</Button>
    </div>
  );
});

export const BtnOnTheSameLineWithTitle = withContext(() => {
  const api = useNotificationsApi();

  const btnAndTitleOnTheSameLevel = (type: TNotificationType) => {
    api[type]({
      message: 'Notification title',
      btn: (
        <Button type="link" onClick={() => api.destroy()}>
          Button
        </Button>
      ),
      showBtnTitleOnTheSameLine: true,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Button onClick={() => btnAndTitleOnTheSameLevel('open')}>open</Button>
      <Button onClick={() => btnAndTitleOnTheSameLevel('info')}>info</Button>
      <Button onClick={() => btnAndTitleOnTheSameLevel('success')}>success</Button>
      <Button onClick={() => btnAndTitleOnTheSameLevel('warning')}>warning</Button>
      <Button onClick={() => btnAndTitleOnTheSameLevel('error')}>error</Button>
    </div>
  );
});
