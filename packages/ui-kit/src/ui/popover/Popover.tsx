import { useEffect, useState } from 'react';

import { Popover as AntdPopover } from 'antd';

import { useTheme } from '@/providers';
import { NPopover, PopoverTitle } from '@/ui/popover';

export function Popover({
  title,
  headerButton,
  maxWidth,
  minWidth,
  maxHeight,
  showHeaderButtons,
  showCloseIcon,
  content,
  isOpen: isOpenProp,
  onOpenChange,
  trigger,
  isArrow,
  ...restProps
}: NPopover.TProps) {
  const { theme } = useTheme();
  const tokenPopover = theme?.components?.Popover;

  const effectiveMaxWidth = maxWidth ?? tokenPopover?.maxWidth;
  const effectiveMinWidth = minWidth ?? tokenPopover?.titleMinWidth;
  const effectiveMaxHeight = maxHeight ?? tokenPopover?.maxHeight;

  const isControlled = isOpenProp !== undefined;
  const [isOpen, setIsOpen] = useState(isOpenProp ?? false);

  useEffect(() => {
    if (isControlled) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp, isControlled]);

  const handleClose = () => {
    if (!isControlled) setIsOpen(false);
    onOpenChange?.(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) setIsOpen(open);
    onOpenChange?.(open);
  };

  const effectiveTrigger = showCloseIcon || showHeaderButtons ? (isOpen ? [] : trigger) : trigger;

  const renderTitle = () => {
    if (!title && !headerButton && !showCloseIcon) return null;
    return (
      <PopoverTitle
        title={title}
        headerButton={headerButton}
        showHeaderButtons={showHeaderButtons}
        showCloseIcon={showCloseIcon}
        handleClose={handleClose}
      />
    );
  };

  return (
    <AntdPopover
      {...restProps}
      open={isOpen}
      arrow={isArrow}
      overlayStyle={{ maxWidth: effectiveMaxWidth, minWidth: effectiveMinWidth, ...restProps.style }}
      title={renderTitle()}
      content={
        <span
          className="uiKitPopoverContent"
          style={{ maxHeight: effectiveMaxHeight, display: 'block', overflow: 'auto' }}
        >
          {typeof content === 'function' ? content() : content}
        </span>
      }
      trigger={effectiveTrigger}
      onOpenChange={handleOpenChange}
    />
  );
}
