import { FC, useMemo } from 'react';

import { IconChevronRight } from '@tabler/icons-react';

import { Dropdown as AntdDropdown } from 'antd';

import { useTheme } from '@/providers';
import { Badge } from '@/ui/badge';
import { Space } from '@/ui/utility';

import { NDropdown } from './models';

export const Dropdown: FC<NDropdown.TProps> = ({
  countBadge,
  children,
  isArrow,
  isAutoAdjustOverflow,
  isDisabled,
  isOpen,
  shouldDestroyPopupOnHide,
  menu,
  ...rest
}) => {
  const { theme } = useTheme();
  const iconSize = theme?.components?.Dropdown?.fontSizeIcon;

  const menuItems = useMemo(() => {
    //единственный способ поменять иконку для выпадающего меню
    return (
      menu?.items?.map(item => {
        if (item && 'children' in item) {
          return {
            ...item,
            label: (
              <>
                <span>{item.label}</span>

                <IconChevronRight
                  stroke={1}
                  width={iconSize}
                  height={iconSize}
                  style={{ position: 'absolute', insetInlineEnd: '8px' }}
                />
              </>
            ),
            expandIcon: <></>,
          };
        }

        return item;
      }) ?? []
    );
  }, [iconSize, menu?.items]);

  return (
    <AntdDropdown
      {...rest}
      arrow={isArrow}
      autoAdjustOverflow={isAutoAdjustOverflow}
      destroyPopupOnHide={shouldDestroyPopupOnHide}
      disabled={isDisabled}
      open={isOpen}
      menu={{
        ...menu,
        items: menuItems,
      }}
    >
      <Space>
        {children}
        {countBadge && <Badge type={'default'} count={countBadge} />}
      </Space>
    </AntdDropdown>
  );
};
