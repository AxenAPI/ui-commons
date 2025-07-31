import { forwardRef } from 'react';

import { IconX } from '@tabler/icons-react';

import { AutoComplete as AntdAutoComplete } from 'antd';
import type { BaseSelectRef } from 'rc-select';

import { useTheme } from '@/providers';

import { NAutoComplete } from './models';

const AutoCompleteComponent = (
  { isAllowClear = false, isDisabled, isDefaultOpen, isOpen, ...restProps }: NAutoComplete.TProps,
  ref: React.ForwardedRef<BaseSelectRef>
) => {
  const { theme } = useTheme();

  const iconSize = theme?.components?.AutoComplete?.fontSizeIcon;
  const customClearIcon = typeof isAllowClear !== 'boolean' ? { clearIcon: isAllowClear?.clearIcon } : {};

  return (
    <AntdAutoComplete
      {...restProps}
      ref={ref}
      allowClear={
        isAllowClear && {
          clearIcon: <IconX width={iconSize} height={iconSize} stroke={1.5} />,
          ...customClearIcon,
        }
      }
      disabled={isDisabled}
      defaultOpen={isDefaultOpen}
      open={isOpen}
    />
  );
};

export const AutoComplete = forwardRef(AutoCompleteComponent);
