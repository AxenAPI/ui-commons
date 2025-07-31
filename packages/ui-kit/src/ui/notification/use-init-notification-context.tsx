import { cloneElement, ReactElement, useCallback, useMemo } from 'react';

import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconInfoCircleFilled,
  IconX,
} from '@tabler/icons-react';

import { notification } from 'antd';

import { useTheme } from '@/providers/theme-provider';

import { NNotification } from './models';

import styles from './style.module.css';

/**
 * Хук инициализации апи уведомлений. Используется в @/providers/global-notification-provider
 */
export function useInitNotificationContext(baseConfig: Partial<NNotification.TProps> | undefined = {}) {
  const [api, contextHolder] = notification.useNotification();
  const { theme } = useTheme();
  const closeIconSize = theme?.components?.Notification?.fontSize;

  const baseNotificationConfig = useMemo<Partial<NNotification.TProps>>(() => {
    return {
      ...baseConfig,
    };
  }, [baseConfig]);

  const getNotificationArgs = useCallback(
    (args: NNotification.TProps, color?: string) => {
      const { message, btn, showBtnTitleOnTheSameLine, closeIcon, icon, ...otherProps } = args;
      if (showBtnTitleOnTheSameLine) {
        const messageWithButton = (
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            {message}
            {btn
              ? cloneElement(btn as ReactElement, {
                  style: {
                    height: 24,
                  },
                })
              : null}
          </span>
        );
        return {
          color,
          icon,
          ...baseNotificationConfig,
          ...otherProps,
          description: null,
          className: styles.removeMargin,
          message: messageWithButton,
        };
      }

      return {
        color,
        icon,
        closeIcon: closeIcon ?? <IconX width={closeIconSize} height={closeIconSize} />,
        ...baseNotificationConfig,
        ...args,
      };
    },
    [baseNotificationConfig, closeIconSize]
  );

  const notificationApi: NNotification.TNotificationInstance = {
    open: (args: NNotification.TProps) => {
      return api.open(getNotificationArgs(args));
    },
    info: (args: NNotification.TProps) => {
      return api.info({
        ...getNotificationArgs(args),
        icon: args.icon ?? <IconInfoCircleFilled color={theme?.components?.Notification?.colorInfo} />,
      });
    },
    success: (args: NNotification.TProps) => {
      return api.success({
        ...getNotificationArgs(args),
        icon: args.icon ?? <IconCircleCheckFilled color={theme?.components?.Notification?.colorSuccess} />,
      });
    },
    warning: (args: NNotification.TProps) => {
      return api.warning({
        ...getNotificationArgs(args),
        icon: args.icon ?? <IconAlertCircleFilled color={theme?.components?.Notification?.colorWarning} />,
      });
    },
    error: (args: NNotification.TProps) => {
      return api.error({
        ...getNotificationArgs(args),
        icon: args.icon ?? <IconCircleXFilled color={theme?.components?.Notification?.colorError} />,
      });
    },
    // eslint-disable-next-line @typescript-eslint/unbound-method
    destroy: api.destroy,
  };

  return [notificationApi, contextHolder] as const;
}
