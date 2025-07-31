import { FC, useCallback, useMemo } from 'react';

import { IconBell, IconLogout, IconUser } from '@tabler/icons-react';

import { Badge, Button } from '@/ui';

import { NDefaultHeaderIcons } from './model';

/**
 * Компонент с набором дефолтных кнопок для Layout.Header
 */
export const DefaultHeaderIcons: FC<NDefaultHeaderIcons.TProps> = ({
  isNotificationButtonHidden,
  isNotificationButtonDisabled,
  isUserButtonHidden,
  isUserButtonDisabled,
  isLogoutButtonHidden,
  isLogoutButtonDisabled,
  onNotificationButtonClick,
  onUserButtonClick,
  onLogoutButtonClick,
  customButtons,
  badgeCount,
  size = 'large',
}) => {
  const renderButtons = useCallback(
    (config: NDefaultHeaderIcons.TButtonConfig[]) => {
      return config.map((btn, index) => {
        if (btn.isHidden) return null;

        return (
          <Badge key={index} count={btn.badgeCount}>
            <Button
              key={index}
              type="text"
              icon={btn.icon}
              size={size}
              isDisabled={btn.isDisabled}
              onClick={btn.onClick}
            />
          </Badge>
        );
      });
    },
    [size]
  );

  const memoizedButtons = useMemo(() => {
    const buttonsConfig: NDefaultHeaderIcons.TButtonConfig[] = [
      {
        icon: <IconBell stroke={1.5} />,
        onClick: onNotificationButtonClick,
        isHidden: isNotificationButtonHidden,
        isDisabled: isNotificationButtonDisabled,
        badgeCount,
      },
      {
        icon: <IconUser stroke={1.5} />,
        onClick: onUserButtonClick,
        isHidden: isUserButtonHidden,
        isDisabled: isUserButtonDisabled,
      },
      {
        icon: <IconLogout stroke={1.5} />,
        onClick: onLogoutButtonClick,
        isHidden: isLogoutButtonHidden,
        isDisabled: isLogoutButtonDisabled,
      },
    ];

    return renderButtons(buttonsConfig);
  }, [
    isNotificationButtonHidden,
    isNotificationButtonDisabled,
    onNotificationButtonClick,
    isUserButtonHidden,
    isUserButtonDisabled,
    onUserButtonClick,
    isLogoutButtonHidden,
    isLogoutButtonDisabled,
    onLogoutButtonClick,
    badgeCount,
    renderButtons,
  ]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      {customButtons ?? memoizedButtons}
    </div>
  );
};
