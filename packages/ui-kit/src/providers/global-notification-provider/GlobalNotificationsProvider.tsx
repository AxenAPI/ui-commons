import { PropsWithChildren } from 'react';

import { useInitNotificationContext } from '@/ui/notification/use-init-notification-context';

import { GlobalNotificationContext } from './GlobalNotificationContext';

export function GlobalNotificationProvider({ children }: PropsWithChildren) {
  const [notificationApi, notificationContext] = useInitNotificationContext();

  return (
    <GlobalNotificationContext.Provider value={{ notificationApi }}>
      {notificationContext}
      {children}
    </GlobalNotificationContext.Provider>
  );
}
