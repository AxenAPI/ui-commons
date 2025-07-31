import { cloneElement, FC, ReactElement } from 'react';

import { Button as AntdButton } from 'antd';
import cn from 'classnames';

import { useTheme } from '@/providers/theme-provider';

import { Badge, NBadge } from '../badge';
import { Tooltip } from '../tooltip/Tooltip';
import { Space } from '../utility/space';
import { NButton } from './models';
import { getPaddingInlineClassName } from './utils';

import './styles.module.css';

export const Button: FC<NButton.TProps> = ({
  children,
  countBadge,
  icon,
  isBlock,
  isDanger,
  isDisabled,
  isGhost,
  isLoading,
  size,
  tooltip,
  placementTooltip,
  isDisabledTooltip,
  color,
  className,
  ...rest
}) => {
  const { theme } = useTheme();
  const tokenButton = theme?.components?.Button;
  const paddingClass = getPaddingInlineClassName(size, Boolean(icon) && !children);

  let badgeType: NBadge.TBageType = rest.type || 'default';
  let styleIcon = {
    width: tokenButton?.iconSize,
    height: tokenButton?.iconSize,
    fontSize: tokenButton?.iconSize,
  };

  if (isGhost) {
    badgeType = 'link';
  }

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
    <Tooltip title={tooltip} isDisabled={isDisabledTooltip ? isDisabled : false} placement={placementTooltip}>
      <AntdButton
        {...rest}
        size={size}
        disabled={isDisabled}
        loading={isLoading}
        block={isBlock}
        danger={isDanger}
        ghost={isGhost}
        icon={icon ? cloneElement(icon as ReactElement, { style: styleIcon }) : null}
        color={color === 'primary' && rest.variant === 'outlined' ? 'default' : color}
        className={cn(className, 'ant-btn-icon', paddingClass)}
      >
        {(children || countBadge) && (
          <Space>
            {children}
            {countBadge && <Badge type={badgeType} count={countBadge} />}
          </Space>
        )}
      </AntdButton>
    </Tooltip>
  );
};
