import { useContext } from 'react';

import { useInitNotificationContext } from '@/ui/notification/use-init-notification-context';

import { GlobalNotificationContext } from './GlobalNotificationContext';

/**
 * @deprecated - используй useNotificationsApi вместе с GlobalNotificationsProvider
 * !!! - реэкспорт оставлен для совместимости
 */
export const useNotification = useInitNotificationContext;

export const useNotificationsApi = () => useContext(GlobalNotificationContext)?.notificationApi;
