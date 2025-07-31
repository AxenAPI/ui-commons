import { FC } from 'react';

import { Tooltip as AntdTooltip } from 'antd';

import { useTheme } from '@/providers';

import { TooltipCombinedTitle } from './components/TooltipCombinedTitle';
import { NTooltip } from './models';

export const Tooltip: FC<NTooltip.TProps> = ({
  isDefaultOpen,
  isOpen,
  isDisabled,
  shouldDestroyTooltipOnHide,
  title,
  combined,
  overlayStyle,
  width,
  ...restProps
}) => {
  const tooltipTitle = combined ? <TooltipCombinedTitle {...combined} /> : title;

  const { theme } = useTheme();

  const minWidth = theme?.components?.Tooltip?.contentMinWidth;

  const overlayStyleTooltip = { ...overlayStyle, maxWidth: width, width, minWidth: `${minWidth}px` };

  return (
    <AntdTooltip
      {...restProps}
      overlayStyle={overlayStyleTooltip}
      title={tooltipTitle}
      defaultOpen={isDefaultOpen}
      destroyTooltipOnHide={shouldDestroyTooltipOnHide}
      open={isDisabled ? false : isOpen}
    />
  );
};
