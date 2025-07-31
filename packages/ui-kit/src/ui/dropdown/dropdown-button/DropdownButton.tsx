import { cloneElement, FC, ReactElement } from 'react';

import { IconDots } from '@tabler/icons-react';

import { Dropdown as AntdDropdown } from 'antd';

import { useTheme } from '@/providers/theme-provider';
import { Badge, NBadge } from '@/ui/badge';

import { NDropdownButton } from './models';

export const DropdownButton: FC<NDropdownButton.TProps> = ({
  children,
  countBadge,
  icon,
  iconBtn,
  isArrow,
  isAutoAdjustOverflow,
  isDanger,
  isDisabled,
  isLoading,
  isOpen,
  shouldDestroyPopupOnHide,
  size,
  ...rest
}) => {
  const { theme } = useTheme();
  const tokenButton = theme?.components?.Button;

  let badgeType: NBadge.TBageType = 'default';
  let styleIcon = {
    width: tokenButton?.iconSize,
    height: tokenButton?.iconSize,
    fontSize: tokenButton?.iconSize,
  };

  if (isDanger) {
    badgeType = 'danger';
  }

  if (size === 'small') {
    styleIcon = {
      width: tokenButton?.iconSizeSM,
      height: tokenButton?.iconSizeSM,
      fontSize: tokenButton?.iconSizeSM,
    };
  }

  if (size === 'large') {
    styleIcon = {
      width: tokenButton?.iconSizeLG,
      height: tokenButton?.iconSizeLG,
      fontSize: tokenButton?.iconSizeLG,
    };
  }

  return (
    <AntdDropdown.Button
      {...rest}
      arrow={isArrow}
      autoAdjustOverflow={isAutoAdjustOverflow}
      danger={isDanger}
      destroyPopupOnHide={shouldDestroyPopupOnHide}
      disabled={isDisabled}
      icon={
        icon ? (
          cloneElement(icon as ReactElement, { style: styleIcon })
        ) : (
          <span style={{ display: 'flex' }}>
            <IconDots width={styleIcon.width} height={styleIcon.height} stroke={1.5} />
          </span>
        )
      }
      loading={isLoading}
      open={isOpen}
    >
      {iconBtn && cloneElement(iconBtn as ReactElement, { style: styleIcon })}
      {children}
      {countBadge && <Badge type={badgeType} count={countBadge} />}
    </AntdDropdown.Button>
  );
};
