import { createContext } from 'react';

import { NNotification } from '@/ui/notification';

const noop = () => {};

export const GlobalNotificationContext = createContext<{
  notificationApi: NNotification.TNotificationInstance;
}>({
  notificationApi: {
    success: noop,
    error: noop,
    warning: noop,
    info: noop,
    open: noop,
    destroy: noop,
  },
});
